// Codex 全球用量重置的估计。只根据公开事件推算下一次，不读个人 5 小时 / 每周窗口。
// predict(events, now, challenge?)：
// 1. 带明确时间、且之后还没有 global 的预告 → 那个时间，confidence 'announced'
// 2. 处于挑战窗口 → 最近一次 global + 最近至多 5 个间隔的中位数，再向 UTC 05:00 靠拢，'medium'
// 3. 否则用全部历史间隔的中位数，'low'
// 预测时间落在过去时：6 小时内显示「随时可能」（imminent，倒计时为 0）；更久则按间隔向前滚，倒计时不为负。
export type Kind = 'global' | 'banked' | 'announce' | 'denied' | 'fix';
export type Confidence = 'announced' | 'medium' | 'low';
export type Basis = 'announce' | 'challenge' | 'history';

export interface Bilingual { en: string; zh: string }

export interface CodexConfirm {
  id?: string;
  at?: string;
  url: string;
  quote?: Bilingual;
}

export interface CodexEvent {
  id: string;
  at: string;
  kind: Kind;
  url: string;
  quote: Bilingual;
  /** 预告里写明的重置时刻（ISO UTC）。没有具体钟点的预告不要填。 */
  statedAt?: string;
  day?: number;
  confirm?: CodexConfirm;
}

export interface CodexSite {
  name: string;
  url: string;
  desc: Bilingual;
  tags: Bilingual[];
}

export interface Challenge { start: string; days: number }

export interface Prediction {
  /** 估计的重置时刻。imminent 时可能已在过去，倒计时按 0 显示。 */
  at: number;
  confidence: Confidence;
  imminent: boolean;
  basis: Basis;
}

export interface ChallengeState {
  active: boolean;
  day: number;
  total: number;
  ratio: number;
  start: number;
  end: number;
}

export interface Ymd { y: number; m: number; d: number }
export interface HeatDay {
  key: string;
  wd: number;
  m: number;
  d: number;
  kind: 'global' | 'banked' | '';
  today: boolean;
}

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
/** 预测时刻刚过去的这一小段仍显示「随时可能」，不立刻跳到下一档。 */
export const GRACE_MS = 6 * HOUR_MS;
/** 挑战期内把估计时刻靠向的 UTC 整点。 */
export const SNAP_HOUR_UTC = 5;

const ts = (iso?: string) => {
  if (!iso) return NaN;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? NaN : t;
};

const finite = (n: number) => Number.isFinite(n);

function median(xs: number[]): number {
  if (!xs.length) return NaN;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** 离 ms 最近的 UTC 05:00；距离相同取更晚的那个。 */
export function snapToward0500Utc(ms: number): number {
  const utcDay = Math.floor(ms / DAY_MS);
  let best = ms;
  let bestDist = Infinity;
  for (const d of [utcDay - 1, utcDay, utcDay + 1]) {
    const cand = d * DAY_MS + SNAP_HOUR_UTC * HOUR_MS;
    const dist = Math.abs(cand - ms);
    if (dist < bestDist || (dist === bestDist && cand > best)) {
      bestDist = dist;
      best = cand;
    }
  }
  return best;
}

/** 严格晚于 after、又尽量靠近 raw 的 UTC 05:00。 */
function snapAfter(raw: number, after: number): number {
  const utcDay = Math.floor(raw / DAY_MS);
  let best = Infinity;
  let bestDist = Infinity;
  for (let d = utcDay - 1; d <= utcDay + 2; d++) {
    const cand = d * DAY_MS + SNAP_HOUR_UTC * HOUR_MS;
    if (cand <= after) continue;
    const dist = Math.abs(cand - raw);
    if (dist < bestDist || (dist === bestDist && cand < best)) {
      bestDist = dist;
      best = cand;
    }
  }
  return best === Infinity ? Math.max(raw, after + 1) : best;
}

function globalsAtOrBefore(events: readonly CodexEvent[], now: number): CodexEvent[] {
  return events
    .filter((e) => e.kind === 'global' && finite(ts(e.at)) && ts(e.at) <= now)
    .sort((a, b) => ts(a.at) - ts(b.at) || a.id.localeCompare(b.id));
}

function gapsOf(globals: CodexEvent[]): number[] {
  const out: number[] = [];
  for (let i = 1; i < globals.length; i++) {
    const d = ts(globals[i].at) - ts(globals[i - 1].at);
    if (d > 0) out.push(d);
  }
  return out;
}

export function inChallenge(challenge: Challenge | null | undefined, now: number): boolean {
  if (!challenge?.start || !(challenge.days > 0)) return false;
  const start = ts(challenge.start);
  if (!finite(start)) return false;
  return now >= start && now < start + challenge.days * DAY_MS;
}

function unresolvedAnnounce(events: readonly CodexEvent[], now: number): CodexEvent | null {
  let best: CodexEvent | null = null;
  for (const e of events) {
    if (e.kind !== 'announce' || !e.statedAt) continue;
    const at = ts(e.at);
    const stated = ts(e.statedAt);
    if (!finite(at) || !finite(stated) || at > now) continue;
    const resolved = events.some((g) => g.kind === 'global' && finite(ts(g.at)) && ts(g.at) > at && ts(g.at) <= now);
    if (resolved) continue;
    if (!best || at >= ts(best.at)) best = e;
  }
  return best;
}

function finish(at: number, now: number, confidence: Confidence, basis: Basis, step: number, snap: boolean): Prediction {
  const base = { confidence, basis };
  if (!finite(at)) return { ...base, at: now, imminent: true };
  if (at > now) return { ...base, at, imminent: false };
  if (basis === 'announce' || !(step > 0)) return { ...base, at, imminent: true };
  if (now - at <= GRACE_MS) return { ...base, at, imminent: true };
  let t = at;
  for (let i = 0; i < 1000 && t <= now - GRACE_MS; i++) {
    const next = snap ? snapAfter(t + step, t) : t + step;
    if (!(next > t)) break;
    t = next;
  }
  return { ...base, at: t, imminent: t <= now };
}

export function predict(events: readonly CodexEvent[], now: number, challenge?: Challenge | null): Prediction {
  const list = (events ?? []).filter((e) => e && finite(ts(e.at)));
  const announced = unresolvedAnnounce(list, now);
  if (announced) return finish(ts(announced.statedAt), now, 'announced', 'announce', 0, false);

  const globals = globalsAtOrBefore(list, now);
  const allGaps = gapsOf(globals);
  if (inChallenge(challenge, now) && globals.length) {
    const step = median(allGaps.slice(-5));
    if (step > 0) {
      const last = ts(globals[globals.length - 1].at);
      return finish(snapAfter(last + step, last), now, 'medium', 'challenge', step, true);
    }
    return { at: now, confidence: 'medium', imminent: true, basis: 'challenge' };
  }
  const step = median(allGaps);
  if (globals.length && step > 0) return finish(ts(globals[globals.length - 1].at) + step, now, 'low', 'history', step, false);
  return { at: now, confidence: 'low', imminent: true, basis: 'history' };
}

/** 最近一次已经发生的 global 或 banked。 */
export function lastReset(events: readonly CodexEvent[], now: number): CodexEvent | null {
  let best: CodexEvent | null = null;
  for (const e of events ?? []) {
    if (e.kind !== 'global' && e.kind !== 'banked') continue;
    const at = ts(e.at);
    if (!finite(at) || at > now) continue;
    if (!best || at > ts(best.at) || (at === ts(best.at) && e.id > best.id)) best = e;
  }
  return best;
}

export function challengeProgress(challenge: Challenge, now: number): ChallengeState {
  const total = challenge?.days || 0;
  const start = ts(challenge?.start);
  const end = finite(start) ? start + total * DAY_MS : NaN;
  const idle = { active: false, day: 0, total, ratio: 0, start, end };
  if (!finite(start) || !(total > 0) || now < start || now >= end) return idle;
  const day = Math.min(total, Math.floor((now - start) / DAY_MS) + 1);
  return { active: true, day, total, ratio: day / total, start, end };
}

export function utcYmd(epoch: number): Ymd {
  const d = new Date(epoch);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() };
}

/** 以 ymd(now) 为最后一天，向前取 30 个日历日，并用 ymd 把 global/banked 标到格子上。 */
export function buildHeatmap(events: readonly CodexEvent[], now: number, ymd: (epoch: number) => Ymd, days = 30): { pad: number; cells: HeatDay[] } {
  const end = ymd(now);
  const endUtc = Date.UTC(end.y, end.m - 1, end.d);
  const marks = new Map<string, 'global' | 'banked'>();
  for (const e of events ?? []) {
    if (e.kind !== 'global' && e.kind !== 'banked') continue;
    const t = ts(e.at);
    if (!finite(t) || t > now) continue;
    const p = ymd(t);
    const key = `${p.y}-${p.m}-${p.d}`;
    if (marks.get(key) === 'global') continue;
    if (e.kind === 'global' || !marks.has(key)) marks.set(key, e.kind);
  }
  const cells: HeatDay[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const dt = new Date(endUtc - i * DAY_MS);
    const y = dt.getUTCFullYear();
    const m = dt.getUTCMonth() + 1;
    const d = dt.getUTCDate();
    const key = `${y}-${m}-${d}`;
    cells.push({ key, wd: dt.getUTCDay(), m, d, kind: marks.get(key) || '', today: i === 0 });
  }
  return { pad: cells[0]?.wd ?? 0, cells };
}

const p2 = (n: number) => String(n).padStart(2, '0');

/** `d:hh:mm:ss`，负数当 0。 */
export function formatCountdown(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${d}:${p2(h)}:${p2(m)}:${p2(sec)}`;
}

export function agoParts(deltaMs: number): { key: string; n?: number } {
  const s = Math.max(0, Math.floor(deltaMs / 1000));
  if (s < 45) return { key: 'cr.ago.now' };
  const m = Math.floor(s / 60);
  if (m < 60) return { key: 'cr.ago.m', n: m };
  const h = Math.floor(m / 60);
  if (h < 48) return { key: 'cr.ago.h', n: h };
  return { key: 'cr.ago.d', n: Math.floor(h / 24) };
}

export function formatWhenParts(p: { Y: number; M: number; D: number; h: number; m: number }, zoneLabel: string): string {
  return `${p.Y}-${p2(p.M)}-${p2(p.D)} ${p2(p.h)}:${p2(p.m)} ${zoneLabel}`;
}

export function mdLabel(m: number, d: number): string {
  return `${p2(m)}/${p2(d)}`;
}
