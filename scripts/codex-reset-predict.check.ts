// 锁定 predict() 的三条规则，以及倒计时不为负。node --experimental-strip-types scripts/codex-reset-predict.check.ts
import { readFileSync } from 'node:fs';
import {
  predict, lastReset, challengeProgress, buildHeatmap, utcYmd,
  formatCountdown, snapToward0500Utc, GRACE_MS,
} from '../src/lib/codex-reset.ts';
import type { CodexData } from '../src/lib/codex-reset.ts';

const codex = JSON.parse(readFileSync(new URL('../src/data/codex-resets.json', import.meta.url), 'utf8')) as CodexData;
const { events, challenge } = codex;
let failed = 0;
const eq = (name: string, got: unknown, want: unknown) => {
  if (got !== want) { failed++; console.error(`✗ ${name}\n  got  ${got}\n  want ${want}`); }
};

const stated = Date.parse('2026-10-02T17:00:00.000Z');
const la = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(stated));
const part = (t: string) => la.find((p) => p.type === t)?.value;
eq('10am Pacific hour', part('hour'), '10');
eq('10am Pacific minute', part('minute'), '00');
eq('10am Pacific day', part('day'), '02');

const announced = predict(events, Date.parse('2026-10-02T12:00:00Z'), challenge);
eq('announce confidence', announced.confidence, 'announced');
eq('announce basis', announced.basis, 'announce');
eq('announce at', announced.at, stated);
eq('announce not imminent', announced.imminent, false);

const lateAnnounce = predict(events, Date.parse('2026-10-02T18:00:00Z'), challenge);
eq('past announce imminent', lateAnnounce.imminent, true);
eq('past announce keeps stated time', lateAnnounce.at, stated);
eq('past announce confidence', lateAnnounce.confidence, 'announced');

const resolved = predict(events, Date.parse('2026-10-02T22:00:00Z'), challenge);
eq('resolved is not announced', resolved.confidence === 'announced', false);
eq('resolved basis history', resolved.basis, 'history');
eq('resolved confidence low', resolved.confidence, 'low');

const beforeChallenge = predict(events, Date.parse('2026-10-04T12:00:00Z'), challenge);
eq('before challenge basis', beforeChallenge.basis, 'history');
eq('before challenge future', beforeChallenge.at > Date.parse('2026-10-04T12:00:00Z'), true);

const oct26 = Date.parse('2026-10-26T02:44:00Z');
const mid = predict(events, oct26, challenge);
eq('challenge confidence', mid.confidence, 'medium');
eq('challenge basis', mid.basis, 'challenge');
eq('challenge future', mid.at > oct26, true);
eq('snapped hour', new Date(mid.at).getUTCHours(), 5);
eq('snapped minute', new Date(mid.at).getUTCMinutes(), 0);

const justAfter = predict(events, mid.at + 60_000, challenge);
eq('grace imminent', justAfter.imminent, true);
eq('grace clock', formatCountdown(justAfter.imminent ? 0 : justAfter.at - (mid.at + 60_000)), '0:00:00:00');

const rolled = predict(events, mid.at + GRACE_MS + 60_000, challenge);
eq('rolled not imminent', rolled.imminent, false);
eq('rolled future', rolled.at > mid.at + GRACE_MS + 60_000, true);
eq('rolled still medium', rolled.confidence, 'medium');

const after = predict(events, Date.parse('2026-12-15T00:00:00Z'), challenge);
eq('after challenge low', after.confidence, 'low');
eq('after challenge history', after.basis, 'history');
eq('after challenge future or imminent non-negative', after.imminent || after.at > Date.parse('2026-12-15T00:00:00Z'), true);

const empty = predict([], oct26, challenge);
eq('empty imminent', empty.imminent, true);
eq('empty low', empty.confidence, 'low');

eq('last reset id', lastReset(events, oct26)?.id, '2114200152701575656');
eq('day 22', challengeProgress(challenge, Date.parse('2026-10-26T12:00:00Z')).day, 22);
eq('before window', challengeProgress(challenge, Date.parse('2026-10-04T23:00:00Z')).active, false);
eq('last day', challengeProgress(challenge, Date.parse('2026-11-01T23:00:00Z')).day, 28);
eq('window closed', challengeProgress(challenge, Date.parse('2026-11-02T00:00:00Z')).active, false);

const heat = buildHeatmap(events, Date.parse('2026-10-26T12:00:00Z'), utcYmd);
eq('heat length', heat.cells.length, 30);
eq('oct 25 global', heat.cells.find((c) => c.m === 10 && c.d === 25)?.kind, 'global');
eq('oct 7 banked', heat.cells.find((c) => c.m === 10 && c.d === 7)?.kind, 'banked');
eq('countdown', formatCountdown((2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000), '2:03:04:05');
eq('countdown clamp', formatCountdown(-5000), '0:00:00:00');
eq('snap 04:01', snapToward0500Utc(Date.parse('2026-10-27T04:01:00Z')), Date.parse('2026-10-27T05:00:00Z'));
eq('snap tie later', snapToward0500Utc(Date.parse('2026-10-27T17:00:00Z')), Date.parse('2026-10-28T05:00:00Z'));

for (let t = Date.parse('2026-09-01T00:00:00Z'); t < Date.parse('2026-12-31T00:00:00Z'); t += 3600_000) {
  const p = predict(events, t, challenge);
  const ms = p.imminent ? 0 : p.at - t;
  if (ms < 0 || (!p.imminent && !(p.at > t)) || !['announced', 'medium', 'low'].includes(p.confidence)) {
    failed++;
    console.error('✗ sweep', new Date(t).toISOString(), p);
    break;
  }
}

if (failed) { console.error(`${failed} failed`); process.exit(1); }
console.log('ok', new Date(mid.at).toISOString(), mid.confidence);
