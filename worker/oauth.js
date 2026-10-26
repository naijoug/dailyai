// GitHub OAuth code → token。CLIENT_ID / CLIENT_SECRET 只放在 Worker secrets 里。
// 回调成功后 302 到站点，token 放在 URL fragment，不会进 Pages 的访问日志。
export const SITE_ORIGIN = 'https://naijoug.github.io';
export const SITE_PATH = '/dailyai/';
export const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize';
export const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token';

export function validState(state) {
  return typeof state === 'string' && /^[A-Za-z0-9_-]{16,128}$/.test(state);
}
export function corsHeaders(origin) {
  const vary = { Vary: 'Origin' };
  if (origin !== SITE_ORIGIN) return vary;
  return {
    'Access-Control-Allow-Origin': SITE_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...vary,
  };
}
export function authorizeUrl({ workerOrigin, clientId, state }) {
  const u = new URL(GITHUB_AUTHORIZE);
  u.searchParams.set('client_id', clientId);
  u.searchParams.set('redirect_uri', new URL('/callback', workerOrigin).toString());
  u.searchParams.set('scope', 'gist');
  u.searchParams.set('state', state);
  return u.toString();
}
/** fragment，而不是 query，避免 token 被Referer 或服务器日志带走。 */
export function siteReturnUrl(token, state) {
  const u = new URL(SITE_PATH, SITE_ORIGIN);
  u.hash = `gh_token=${encodeURIComponent(token)}&state=${encodeURIComponent(state)}`;
  return u.toString();
}

function text(status, message, request) {
  return new Response(message, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', ...corsHeaders(request.headers.get('Origin')) },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store', ...corsHeaders(request.headers.get('Origin')) } });
    }
    if (request.method !== 'GET') return text(405, 'method not allowed', request);
    if (url.pathname === '/login') return login(url, env, request);
    if (url.pathname === '/callback') return callback(url, env, request);
    return text(404, 'not found', request);
  },
};

function login(url, env, request) {
  if (!env.CLIENT_ID || !env.CLIENT_SECRET) return text(500, 'oauth not configured', request);
  const state = url.searchParams.get('state') || '';
  if (!validState(state)) return text(400, 'bad state', request);
  if (url.searchParams.get('client_id') !== env.CLIENT_ID) return text(400, 'client mismatch', request);
  return Response.redirect(authorizeUrl({ workerOrigin: url.origin, clientId: env.CLIENT_ID, state }), 302);
}

async function callback(url, env, request) {
  if (!env.CLIENT_ID || !env.CLIENT_SECRET) return text(500, 'oauth not configured', request);
  const code = url.searchParams.get('code') || '';
  const state = url.searchParams.get('state') || '';
  if (!code || !validState(state)) return text(400, 'bad request', request);
  if (!/^[A-Za-z0-9._-]{8,100}$/.test(env.CLIENT_ID)) return text(500, 'oauth not configured', request);
  const redirectUri = new URL('/callback', url.origin).toString();
  let data;
  try {
    const res = await fetch(GITHUB_TOKEN, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'dailyai' },
      body: new URLSearchParams({ client_id: env.CLIENT_ID, client_secret: env.CLIENT_SECRET, code, redirect_uri: redirectUri }),
    });
    data = await res.json();
  } catch {
    return text(502, 'exchange failed', request);
  }
  const token = data && typeof data.access_token === 'string' ? data.access_token : '';
  if (!token) return text(401, 'exchange failed', request);
  const scopes = String(data.scope || '').split(/[,\s]+/).filter(Boolean);
  if (scopes.some((s) => s !== 'gist')) return text(403, 'scope', request);
  return new Response(null, {
    status: 302,
    headers: { Location: siteReturnUrl(token, state), 'Cache-Control': 'no-store', ...corsHeaders(request.headers.get('Origin')) },
  });
}
