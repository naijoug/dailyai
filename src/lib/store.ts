// 本地个人数据。key 仍是 `dailyai:v1`（已有数据不用搬迁），文档版本 v:2。
// v1 → v2：已读并集、收藏按时间最后写入获胜（取消收藏留墓碑）、评分带时间戳。
export type FavItem = { id: string; day: string; html: string; text: string; score?: number; ts: number; tr?: { lang: 'en' | 'zh'; html: string }; del?: boolean };
export type Store = {
  v: 2;
  read: Record<string, number>;
  readDel: Record<string, number>;
  rating: Record<string, number>;
  ratingTs: Record<string, number>;
  ratingDel: Record<string, number>;
  fav: Record<string, FavItem>;
};
const KEY = 'dailyai:v1';
const empty = (): Store => ({ v: 2, read: {}, readDel: {}, rating: {}, ratingTs: {}, ratingDel: {}, fav: {} });

function numMap(v: unknown): Record<string, number> {
  if (!v || typeof v !== 'object') return {};
  const out: Record<string, number> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    if (typeof k === 'string' && typeof val === 'number' && Number.isFinite(val) && val >= 0) out[k] = val;
  }
  return out;
}
function favMap(v: unknown): Record<string, FavItem> {
  if (!v || typeof v !== 'object') return {};
  const out: Record<string, FavItem> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    if (!val || typeof val !== 'object') continue;
    const o = val as Record<string, unknown>;
    const tr = o.tr && typeof o.tr === 'object' ? o.tr as Record<string, unknown> : null;
    const item: FavItem = {
      id: typeof o.id === 'string' ? o.id : k,
      day: typeof o.day === 'string' ? o.day : '',
      html: typeof o.html === 'string' ? o.html : '',
      text: typeof o.text === 'string' ? o.text : '',
      ts: typeof o.ts === 'number' && Number.isFinite(o.ts) ? o.ts : 0,
    };
    if (typeof o.score === 'number' && Number.isFinite(o.score)) item.score = o.score;
    if (o.del === true) item.del = true;
    if (tr && (tr.lang === 'en' || tr.lang === 'zh') && typeof tr.html === 'string') item.tr = { lang: tr.lang, html: tr.html };
    out[k] = item;
  }
  return out;
}
/** 把 v1 或残缺对象收成完整的 v2。不写 localStorage。 */
export function normalize(raw: unknown): Store {
  const o = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {};
  const rating = numMap(o.rating);
  const ratingTs = numMap(o.ratingTs);
  for (const id of Object.keys(rating)) if (ratingTs[id] === undefined) ratingTs[id] = 0;
  for (const id of Object.keys(ratingTs)) if (rating[id] === undefined) delete ratingTs[id];
  return { v: 2, read: numMap(o.read), readDel: numMap(o.readDel), rating, ratingTs, ratingDel: numMap(o.ratingDel), fav: favMap(o.fav) };
}
const sorted = <T>(o: Record<string, T>) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
/** 稳定序列化，用来比较本地和 Gist 是否同一份。 */
export function serialize(s: Store): string {
  const n = normalize(s);
  return JSON.stringify({ v: 2, read: sorted(n.read), readDel: sorted(n.readDel), rating: sorted(n.rating), ratingTs: sorted(n.ratingTs), ratingDel: sorted(n.ratingDel), fav: sorted(n.fav) });
}
export function load(): Store {
  if (typeof localStorage === 'undefined') return empty();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}') as { v?: unknown };
    const s = normalize(raw);
    if (raw?.v !== 2) save(s, { sync: false });
    return s;
  } catch { return empty(); }
}
export function save(s: Store, opts?: { sync?: boolean }) {
  const norm = normalize(s);
  localStorage.setItem(KEY, JSON.stringify(norm));
  if (opts?.sync !== false && typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('dailyaistore'));
  return norm;
}
export const onStore = (fn: () => void) => window.addEventListener('dailyaistore', () => fn());
export const isRead = (s: Store, id: string) => typeof s.read[id] === 'number';
export const isFav = (s: Store, id: string) => { const f = s.fav[id]; return !!f && !f.del; };
export const ratingOf = (s: Store, id: string) => (typeof s.rating[id] === 'number' ? s.rating[id] : 0);
export const activeFavs = (s: Store) => Object.values(s.fav).filter((f) => !f.del);
export function markRead(s: Store, id: string, on: boolean) {
  if (on) { s.read[id] = Date.now(); delete s.readDel[id]; }
  else { delete s.read[id]; s.readDel[id] = Date.now(); }
}
export function markFav(s: Store, id: string, item: Omit<FavItem, 'ts' | 'del'> | null) {
  if (!item) {
    const prev = s.fav[id];
    s.fav[id] = { id, day: prev?.day || '', html: '', text: '', ts: Date.now(), del: true };
    return;
  }
  const next: FavItem = { id, day: item.day, html: item.html, text: item.text, ts: Date.now() };
  if (item.score !== undefined) next.score = item.score;
  if (item.tr) next.tr = item.tr;
  s.fav[id] = next;
}
export function markRating(s: Store, id: string, n: number | null) {
  if (n && n > 0) { s.rating[id] = n; s.ratingTs[id] = Date.now(); delete s.ratingDel[id]; }
  else { delete s.rating[id]; delete s.ratingTs[id]; s.ratingDel[id] = Date.now(); }
}

function maxOf(a?: number, b?: number) {
  const xs = [a, b].filter((n): n is number => typeof n === 'number');
  return xs.length ? Math.max(...xs) : 0;
}
/** 合并两份库存。已读取并集（任一侧读过即保留，除非另一侧有更新的「取消已读」墓碑）。收藏和评分按时间最后写入获胜。 */
export function merge(a: Store, b: Partial<Store> | unknown): Store {
  const A = normalize(a), B = normalize(b);
  const read: Record<string, number> = {}, readDel: Record<string, number> = {};
  for (const id of new Set([...Object.keys(A.read), ...Object.keys(B.read), ...Object.keys(A.readDel), ...Object.keys(B.readDel)])) {
    const readTs = maxOf(A.read[id], B.read[id]);
    const delTs = maxOf(A.readDel[id], B.readDel[id]);
    if (readTs === 0 && delTs === 0) continue;
    if (readTs >= delTs) read[id] = readTs; else readDel[id] = delTs;
  }
  const fav: Record<string, FavItem> = {};
  for (const id of new Set([...Object.keys(A.fav), ...Object.keys(B.fav)])) {
    const x = A.fav[id], y = B.fav[id];
    if (!x || !y) { fav[id] = (x || y)!; continue; }
    if (y.ts !== x.ts) { fav[id] = y.ts > x.ts ? y : x; continue; }
    fav[id] = x.del && !y.del ? y : x;
  }
  const rating: Record<string, number> = {}, ratingTs: Record<string, number> = {}, ratingDel: Record<string, number> = {};
  for (const id of new Set([...Object.keys(A.rating), ...Object.keys(B.rating), ...Object.keys(A.ratingDel), ...Object.keys(B.ratingDel), ...Object.keys(A.ratingTs), ...Object.keys(B.ratingTs)])) {
    const aTs = A.rating[id] !== undefined ? (A.ratingTs[id] || 0) : -1;
    const bTs = B.rating[id] !== undefined ? (B.ratingTs[id] || 0) : -1;
    const aDel = A.ratingDel[id] || 0, bDel = B.ratingDel[id] || 0;
    const bestDel = Math.max(aDel, bDel);
    const pickA = aTs > bTs || (aTs === bTs && aTs >= 0);
    const bestTs = Math.max(aTs, bTs);
    if (bestDel > bestTs) ratingDel[id] = bestDel;
    else if (bestTs >= 0) {
      const src = pickA ? A : B;
      rating[id] = src.rating[id];
      ratingTs[id] = src.ratingTs[id] || 0;
    }
  }
  return { v: 2, read, readDel, rating, ratingTs, ratingDel, fav };
}
