#!/usr/bin/env node
// 把新的 Codex 重置事件合并进 src/data/codex-resets.json。
// 用法：node scripts/codex-reset-refresh.mjs <events.json> [--dry]
//       node scripts/codex-reset-refresh.mjs --in <events.json> [--dry]
// 输入可以是事件数组，或带 events / sites / challenge 的对象。
// 安全：按 id（站点按 url）合并；从不删除已有事件或站点；缺字段不覆盖已有正文；
//       输入读失败、JSON 不合法、没有可合并的数组时只打印警告并以 0 退出。
//       参数无法识别时退出码为 1。同一份输入再跑一次不会改文件。
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(root, 'src/data/codex-resets.json');
const KINDS = new Set(['global', 'banked', 'announce', 'denied', 'fix']);

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
let inPath = '';
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--dry') continue;
  if (a === '--help' || a === '-h') {
    console.log('用法：node scripts/codex-reset-refresh.mjs <events.json> [--dry]');
    process.exit(0);
  }
  if (a === '--in' || a === '--file') {
    inPath = args[++i] || '';
    if (!args[i]) { console.warn('! --in 需要文件路径'); process.exit(1); }
    continue;
  }
  if (a.startsWith('-')) { console.warn(`! 未知参数 ${a}`); process.exit(1); }
  if (!inPath) inPath = a;
  else { console.warn(`! 多余参数 ${a}`); process.exit(1); }
}

const soft = (msg) => { console.warn(`! ${msg}（跳过，不影响已有数据）`); process.exit(0); };
if (!inPath) soft('没有输入文件。用法：node scripts/codex-reset-refresh.mjs <events.json> [--dry]');

let incoming;
try { incoming = JSON.parse(readFileSync(inPath, 'utf8')); }
catch (e) { soft(`读入失败：${e.message}`); }

const incomingEvents = Array.isArray(incoming) ? incoming : incoming?.events;
const incomingSites = Array.isArray(incoming) ? null : incoming?.sites;
const incomingChallenge = Array.isArray(incoming) ? null : incoming?.challenge;
if (!Array.isArray(incomingEvents) && !Array.isArray(incomingSites) && !incomingChallenge) soft('输入里没有 events、sites 或 challenge');

let data;
try { data = JSON.parse(readFileSync(DATA, 'utf8')); }
catch (e) { soft(`现有数据读不了：${e.message}`); }
if (!Array.isArray(data.events)) data.events = [];
if (!Array.isArray(data.sites)) data.sites = [];

const normUrl = (u) => String(u || '').trim().replace(/\/+$/, '');
let added = 0, updated = 0, skipped = 0;

function changed(prev, next) {
  return JSON.stringify(prev) !== JSON.stringify(next);
}

if (Array.isArray(incomingEvents)) {
  const byId = new Map(data.events.map((e) => [e.id, e]));
  for (const raw of incomingEvents) {
    if (!raw || typeof raw !== 'object') { skipped++; console.warn('! 跳过非对象事件'); continue; }
    const id = String(raw.id || '').trim();
    if (!id) { skipped++; console.warn('! 跳过无 id 的事件'); continue; }
    if (raw.kind && !KINDS.has(raw.kind)) { skipped++; console.warn(`! ${id}: 未知 kind ${raw.kind}`); continue; }
    if (raw.at && Number.isNaN(Date.parse(raw.at))) { skipped++; console.warn(`! ${id}: at 无法解析`); continue; }
    if (raw.statedAt && Number.isNaN(Date.parse(raw.statedAt))) { skipped++; console.warn(`! ${id}: statedAt 无法解析`); continue; }
    const prev = byId.get(id);
    if (!prev) {
      if (!raw.at || !raw.kind || !raw.url || !raw.quote?.en) {
        skipped++; console.warn(`! ${id}: 新事件缺少 at、kind、url 或 quote.en`); continue;
      }
      const fresh = { id, at: raw.at, kind: raw.kind, url: raw.url, quote: { en: raw.quote.en, zh: raw.quote.zh || raw.quote.en } };
      if (raw.statedAt) fresh.statedAt = raw.statedAt;
      if (Number.isInteger(raw.day) && raw.day > 0) fresh.day = raw.day;
      if (raw.confirm?.url) fresh.confirm = cleanConfirm(raw.confirm);
      data.events.push(fresh);
      byId.set(id, fresh);
      added++;
      continue;
    }
    const next = { ...prev, quote: { ...(prev.quote || {}) } };
    if (prev.confirm) next.confirm = { ...prev.confirm, quote: prev.confirm.quote ? { ...prev.confirm.quote } : undefined };
    if (raw.at) next.at = raw.at;
    if (raw.kind) next.kind = raw.kind;
    if (raw.url) next.url = raw.url;
    if (raw.statedAt) next.statedAt = raw.statedAt;
    if (Number.isInteger(raw.day) && raw.day > 0) next.day = raw.day;
    if (raw.quote?.en) next.quote.en = raw.quote.en;
    if (raw.quote?.zh) next.quote.zh = raw.quote.zh;
    if (!next.quote.zh) next.quote.zh = next.quote.en;
    if (raw.confirm?.url) next.confirm = cleanConfirm({ ...(prev.confirm || {}), ...raw.confirm, quote: { ...(prev.confirm?.quote || {}), ...(raw.confirm.quote || {}) } });
    if (changed(prev, next)) { Object.assign(byId.get(id), next); updated++; }
  }
}

function cleanConfirm(c) {
  const out = {};
  if (c.id) out.id = String(c.id);
  if (c.at && !Number.isNaN(Date.parse(c.at))) out.at = c.at;
  out.url = c.url;
  if (c.quote?.en) out.quote = { en: c.quote.en, zh: c.quote.zh || c.quote.en };
  return out;
}

if (Array.isArray(incomingSites)) {
  const byUrl = new Map(data.sites.map((s) => [normUrl(s.url), s]));
  for (const raw of incomingSites) {
    if (!raw?.url || !raw?.name) { skipped++; console.warn('! 跳过缺少 name 或 url 的站点'); continue; }
    const prev = byUrl.get(normUrl(raw.url));
    if (!prev) {
      const fresh = {
        name: raw.name,
        url: raw.url,
        desc: { en: raw.desc?.en || raw.desc?.zh || '', zh: raw.desc?.zh || raw.desc?.en || '' },
        tags: Array.isArray(raw.tags) ? raw.tags : [],
      };
      if (!fresh.desc.en) { skipped++; console.warn(`! ${raw.url}: 新站点缺少 desc`); continue; }
      data.sites.push(fresh);
      byUrl.set(normUrl(raw.url), fresh);
      added++;
      continue;
    }
    const next = { ...prev, desc: { ...(prev.desc || {}) }, tags: prev.tags };
    next.name = raw.name || next.name;
    next.url = raw.url || next.url;
    if (raw.desc?.en) next.desc.en = raw.desc.en;
    if (raw.desc?.zh) next.desc.zh = raw.desc.zh;
    if (Array.isArray(raw.tags) && raw.tags.length) next.tags = raw.tags;
    if (changed(prev, next)) {
      const i = data.sites.indexOf(prev);
      data.sites[i] = next;
      byUrl.set(normUrl(next.url), next);
      updated++;
    }
  }
}

if (incomingChallenge && typeof incomingChallenge === 'object') {
  data.challenge = { ...(data.challenge || {}) };
  if (incomingChallenge.start && !Number.isNaN(Date.parse(incomingChallenge.start))) data.challenge.start = incomingChallenge.start;
  if (Number.isInteger(incomingChallenge.days) && incomingChallenge.days > 0) data.challenge.days = incomingChallenge.days;
}

data.events.sort((a, b) => Date.parse(a.at) - Date.parse(b.at) || String(a.id).localeCompare(String(b.id)));
const text = JSON.stringify(data, null, 2) + '\n';
let prevText = '';
try { prevText = readFileSync(DATA, 'utf8'); } catch { prevText = ''; }
if (text === prevText) { console.log(`无变化。跳过 ${skipped}。`); process.exit(0); }
console.log(`${DRY ? '--dry：将' : '已'}合并：新增 ${added}，更新 ${updated}，跳过 ${skipped}。`);
if (DRY) process.exit(0);
writeFileSync(DATA, text);
