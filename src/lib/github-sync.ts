// 可选的 GitHub 登录。token 在 localStorage；已读/收藏同步到一个 secret Gist 的 dailyai-sync.json。
// 网络或 API 失败时保持本地数据，不弹错误。
import { githubClientId, githubSyncConfigured, githubWorkerUrl } from '../config';
import { load, merge, normalize, save, serialize, type Store } from './store';

const TOKEN_KEY = 'dailyai:gh';
const GIST_KEY = 'dailyai:gh-gist';
const STATE_KEY = 'dailyai:gh-state';
const FILE = 'dailyai-sync.json';
const PUSH_MS = 4000;
export const configured = githubSyncConfigured;

export type GhSession = { token: string; login: string; avatar: string };

type Hooks = { onChange?: () => void; signIn?: HTMLElement | null; signOut?: HTMLElement | null };
let hooks: Hooks = {};
let timer = 0;
let chain: Promise<void> = Promise.resolve();

export function getSession(): GhSession | null {
  try {
    const s = JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null');
    if (!s || typeof s.token !== 'string' || !s.token) return null;
    return { token: s.token, login: typeof s.login === 'string' ? s.login : '', avatar: safeAvatar(s.avatar) };
  } catch { return null; }
}
function safeAvatar(v: unknown) {
  return typeof v === 'string' && /^https:\/\/avatars\.githubusercontent\.com\//.test(v) ? v : '';
}
function writeSession(s: GhSession | null) {
  if (!s) localStorage.removeItem(TOKEN_KEY);
  else localStorage.setItem(TOKEN_KEY, JSON.stringify({ token: s.token, login: s.login, avatar: s.avatar }));
  hooks.onChange?.();
}
function dropToken() {
  writeSession(null);
  localStorage.removeItem(GIST_KEY);
}
export function signOut() {
  dropToken();
}

function enqueue(fn: () => Promise<void>) {
  chain = chain.then(fn).catch(() => {});
  return chain;
}
function schedulePush() {
  if (!getSession()) return;
  window.clearTimeout(timer);
  timer = window.setTimeout(() => { void enqueue(push); }, PUSH_MS);
}

async function gh(token: string, path: string, init: RequestInit = {}) {
  const res = await fetch('https://api.github.com' + path, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'dailyai',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.headers || {}),
    },
  });
  if (res.status === 401) { dropToken(); return null; }
  return res;
}
function scopeOk(res: Response) {
  const raw = res.headers.get('x-oauth-scopes');
  if (raw == null) return true;
  const scopes = raw.split(',').map((s) => s.trim()).filter(Boolean);
  return scopes.length === 1 && scopes[0] === 'gist';
}
async function fetchUser(token: string): Promise<{ login: string; avatar: string } | null> {
  const res = await gh(token, '/user');
  if (!res) return null;
  if (res.status === 401) return null;
  if (!res.ok || !scopeOk(res)) { if (res.ok && !scopeOk(res)) dropToken(); return null; }
  const u = await res.json();
  if (!u || typeof u.login !== 'string') return null;
  return { login: u.login, avatar: safeAvatar(u.avatar_url) };
}

/** string 找到了；null 确认没有；undefined 网络/权限失败，调用方不要新建。 */
async function gistId(token: string): Promise<string | null | undefined> {
  const cached = localStorage.getItem(GIST_KEY);
  if (cached) {
    const res = await gh(token, `/gists/${cached}`);
    if (!res) return undefined;
    if (res.ok) {
      const g = await res.json();
      if (g.files && g.files[FILE]) return cached;
      localStorage.removeItem(GIST_KEY);
    } else if (res.status === 404) localStorage.removeItem(GIST_KEY);
    else return undefined;
  }
  for (let page = 1; page <= 10; page++) {
    const res = await gh(token, `/gists?per_page=100&page=${page}`);
    if (!res || !res.ok) return undefined;
    const list = await res.json();
    if (!Array.isArray(list) || !list.length) return null;
    const hit = list.find((g) => g.files && g.files[FILE]);
    if (hit) { localStorage.setItem(GIST_KEY, hit.id); return hit.id as string; }
    if (list.length < 100) return null;
  }
  return null;
}
async function readRemote(token: string): Promise<Store | null | undefined> {
  const id = await gistId(token);
  if (id === undefined || !getSession()) return undefined;
  if (id === null) return null;
  const res = await gh(token, `/gists/${id}`);
  if (!res || !res.ok) return undefined;
  const g = await res.json();
  const file = g.files && g.files[FILE];
  if (!file) return null;
  let content = typeof file.content === 'string' ? file.content : '';
  if (file.truncated && typeof file.raw_url === 'string') {
    const raw = await fetch(file.raw_url, { headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'dailyai' } });
    if (raw.status === 401) { dropToken(); return undefined; }
    if (!raw.ok) return undefined;
    content = await raw.text();
  }
  try { return normalize(JSON.parse(content)); } catch { return undefined; }
}
async function writeRemote(token: string, s: Store, retry = true) {
  const body = JSON.stringify({ description: 'dailyai sync', public: false, files: { [FILE]: { content: serialize(s) } } });
  const id = localStorage.getItem(GIST_KEY);
  const res = id
    ? await gh(token, `/gists/${id}`, { method: 'PATCH', body, headers: { 'Content-Type': 'application/json' } })
    : await gh(token, '/gists', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } });
  if (!res) return;
  if (res.status === 404 && id && retry) { localStorage.removeItem(GIST_KEY); return writeRemote(token, s, false); }
  if (!res.ok) return;
  const g = await res.json();
  if (g && typeof g.id === 'string') localStorage.setItem(GIST_KEY, g.id);
}
async function pull() {
  const session = getSession();
  if (!session) return;
  const remote = await readRemote(session.token);
  if (remote === undefined || !getSession()) return;
  if (remote === null) { await writeRemote(session.token, load()); return; }
  const merged = merge(load(), remote);
  save(merged, { sync: false });
  if (serialize(merged) !== serialize(remote)) await writeRemote(session.token, merged);
}
async function push() {
  const session = getSession();
  if (!session) return;
  const remote = await readRemote(session.token);
  if (remote === undefined || !getSession()) return;
  const merged = remote ? merge(load(), remote) : load();
  save(merged, { sync: false });
  await writeRemote(session.token, merged);
}

function randomState() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}
function startLogin() {
  const state = randomState();
  sessionStorage.setItem(STATE_KEY, state);
  const url = `${githubWorkerUrl}/login?state=${state}&client_id=${encodeURIComponent(githubClientId)}`;
  const pop = window.open(url, 'dailyai', 'popup,width=520,height=720');
  if (!pop) location.assign(url);
}
async function accept(token: string, state: string) {
  const expect = sessionStorage.getItem(STATE_KEY);
  sessionStorage.removeItem(STATE_KEY);
  if (!expect || expect !== state || !token) return;
  writeSession({ token, login: '', avatar: '' });
  try {
    const user = await fetchUser(token);
    if (!getSession()) return;
    if (!user) return;
    writeSession({ token, login: user.login, avatar: user.avatar });
    await enqueue(pull);
  } catch { /* 离线：先留着 token，下次加载再验证 */ }
}
function takeHash() {
  const h = location.hash.startsWith('#') ? location.hash.slice(1) : '';
  if (!h.includes('gh_token=')) return;
  const q = new URLSearchParams(h);
  const token = q.get('gh_token') || '';
  const state = q.get('state') || '';
  history.replaceState(null, '', location.pathname + location.search);
  if (window.opener && window.opener !== window) {
    window.opener.postMessage({ type: 'dailyai-gh', token, state }, location.origin);
    window.close();
    return;
  }
  void accept(token, state);
}

export function bootGithub(next: Hooks = {}) {
  hooks = next;
  if (!configured) return;
  next.signIn?.addEventListener('click', () => startLogin());
  next.signOut?.addEventListener('click', () => signOut());
  window.addEventListener('message', (e) => {
    if (e.origin !== location.origin) return;
    const d = e.data;
    if (!d || d.type !== 'dailyai-gh' || typeof d.token !== 'string') return;
    void accept(d.token, typeof d.state === 'string' ? d.state : '');
  });
  window.addEventListener('dailyaistore', () => schedulePush());
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') void enqueue(pull); });
  takeHash();
  const existing = getSession();
  if (!existing) return;
  void (async () => {
    try {
      const user = await fetchUser(existing.token);
      if (!getSession()) return;
      if (!user) return;
      writeSession({ token: existing.token, login: user.login, avatar: user.avatar });
      await enqueue(pull);
    } catch { /* 验证失败但不是 401：继续用本地 */ }
  })();
}
