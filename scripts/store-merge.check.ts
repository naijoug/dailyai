import { merge, normalize, serialize } from '../src/lib/store.ts';

let failed = 0;
const eq = (name: string, got: unknown, want: unknown) => {
  const a = JSON.stringify(got), b = JSON.stringify(want);
  if (a === b) console.log('PASS', name);
  else { failed++; console.log('FAIL', name, '\n ', a, '\n ', b); }
};

const v1 = { read: { a: 10 }, rating: { a: 4 }, fav: { a: { id: 'a', day: '2026-10-01', html: '<p>a</p>', text: 'a', ts: 10 } } };
const n = normalize(v1);
eq('migrate v', n.v, 2);
eq('migrate read', n.read.a, 10);
eq('migrate rating ts', n.ratingTs.a, 0);
eq('migrate no tombstone', n.fav.a.del, undefined);
eq('migrate readDel', n.readDel, {});

const local = normalize({ read: { a: 10, b: 20 }, fav: { a: { id: 'a', day: 'd', html: 'L', text: 'L', ts: 10 } } });
const remote = normalize({ read: { b: 15, c: 30 }, fav: { a: { id: 'a', day: 'd', html: 'R', text: 'R', ts: 50 } } });
const m = merge(local, remote);
eq('read union', m.read, { a: 10, b: 20, c: 30 });
eq('fav newer remote', m.fav.a.html, 'R');

const unread = merge(normalize({ read: { a: 100 } }), normalize({ readDel: { a: 50 } }));
eq('older unread keeps read', unread.read.a, 100);
const unread2 = merge(normalize({ read: { a: 100 } }), normalize({ readDel: { a: 200 } }));
eq('newer unread wins', unread2.read.a, undefined);
eq('newer unread tombstone', unread2.readDel.a, 200);

const tomb = merge(
  normalize({ fav: { a: { id: 'a', day: 'd', html: 'L', text: 'L', ts: 10 } } }),
  normalize({ fav: { a: { id: 'a', day: 'd', html: '', text: '', ts: 80, del: true } } }),
);
eq('newer unfav wins', tomb.fav.a.del, true);
const revive = merge(tomb, normalize({ fav: { a: { id: 'a', day: 'd', html: 'N', text: 'N', ts: 90 } } }));
eq('newer fav beats tombstone', revive.fav.a.del, undefined);
eq('newer fav html', revive.fav.a.html, 'N');

const rate = merge(
  normalize({ rating: { a: 2 }, ratingTs: { a: 10 } }),
  normalize({ rating: { a: 5 }, ratingTs: { a: 20 } }),
);
eq('rating lww', rate.rating.a, 5);
const cleared = merge(rate, normalize({ ratingDel: { a: 30 } }));
eq('rating clear', cleared.rating.a, undefined);
eq('rating clear tomb', cleared.ratingDel.a, 30);

eq('serialize stable', serialize(merge(remote, local)) === serialize(merge(local, remote)), true);

console.log(failed ? `FAILED ${failed}` : 'ALL PASS');
process.exit(failed ? 1 : 0);
