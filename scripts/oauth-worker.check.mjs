import { authorizeUrl, corsHeaders, siteReturnUrl, validState } from '../worker/oauth.js';

let failed = 0;
const eq = (name, got, want) => {
  const a = JSON.stringify(got), b = JSON.stringify(want);
  if (a === b) console.log('PASS', name);
  else { failed++; console.log('FAIL', name, a, b); }
};
const ok = (name, cond) => { if (cond) console.log('PASS', name); else { failed++; console.log('FAIL', name); } };

eq('state length', validState('a'.repeat(15)), false);
eq('state ok', validState('abcDEF123_-xyz0000'), true);
eq('cors other', corsHeaders('https://evil.example'), { Vary: 'Origin' });
ok('cors site', corsHeaders('https://naijoug.github.io')['Access-Control-Allow-Origin'] === 'https://naijoug.github.io');

const auth = new URL(authorizeUrl({ workerOrigin: 'https://dailyai.example.workers.dev', clientId: 'Iv1.abcdefg', state: 'abcDEF123_-xyz0000' }));
eq('scope gist', auth.searchParams.get('scope'), 'gist');
eq('client', auth.searchParams.get('client_id'), 'Iv1.abcdefg');
eq('redirect', auth.searchParams.get('redirect_uri'), 'https://dailyai.example.workers.dev/callback');
ok('no secret in authorize', !auth.toString().includes('secret'));

const back = new URL(siteReturnUrl('gho_testtoken', 'abcDEF123_-xyz0000'));
eq('return origin', back.origin, 'https://naijoug.github.io');
eq('return path', back.pathname, '/dailyai/');
eq('token not in query', back.search, '');
ok('token in hash', back.hash.includes('gh_token=gho_testtoken') && back.hash.includes('state=abcDEF123_-xyz0000'));

console.log(failed ? `FAILED ${failed}` : 'ALL PASS');
process.exit(failed ? 1 : 0);
