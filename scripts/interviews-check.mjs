#!/usr/bin/env node
// 校验 src/content/interviews/*.md（规范见 docs/interviews.md）。发布前运行：node scripts/interviews-check.mjs
// 检查：必填字段、kind/lang/score 取值、products 里的 slug 必须存在、要点 3–5 条、金句 ≤3 条且每条足够短、正文总长度上限（防止全文转载）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'src/content/interviews');
const PRODS = new Set(fs.readdirSync(path.join(ROOT, 'src/content/products')).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)));
const len = (s) => [...s.replace(/https?:\/\/\S+/g, '')].length;
let bad = 0;
const err = (f, m) => { bad++; console.error(`✗ ${f}: ${m}`); };
const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith('.md')) : [];
for (const f of files) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(f)) err(f, 'id 只能用小写字母、数字和短横线');
  const raw = fs.readFileSync(path.join(DIR, f), 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/); if (!m) { err(f, '缺少 frontmatter'); continue; }
  const fm = {};
  for (const line of m[1].split('\n')) { const k = line.match(/^([A-Za-z_]+):\s*(.*)$/); if (!k) continue; let v = k[2].trim(); try { v = JSON.parse(v); } catch { v = v.replace(/^["']|["']$/g, ''); } fm[k[1]] = v; }
  for (const k of ['title', 'show', 'kind', 'date', 'url', 'lang', 'summary']) if (!fm[k]) err(f, `缺少 ${k}`);
  if (!['article', 'podcast'].includes(fm.kind)) err(f, 'kind 必须是 article|podcast');
  if (!['zh', 'en'].includes(fm.lang)) err(f, 'lang 必须是 zh|en');
  if (fm.score != null && !(Number.isInteger(fm.score) && fm.score >= 1 && fm.score <= 5)) err(f, 'score 必须是 1–5 的整数');
  if (fm.url && !/^https?:\/\//.test(fm.url)) err(f, 'url 无效');
  if (isNaN(new Date(/^\d{4}-\d\d-\d\d$/.test(fm.date) ? `${fm.date}T12:00:00+08:00` : fm.date))) err(f, 'date 无效');
  if (!fm.summary_tr) console.warn(`! ${f}: 建议补 summary_tr（另一语言的一句话摘要）`);
  for (const p of fm.products || []) if (!PRODS.has(p)) err(f, `products 里的 ${p} 不存在于 src/content/products/（先建产品，没有官网就不要链接）`);
  const body = m[2]; const tl = fm.lang === 'zh' ? 'en' : 'zh';
  const secs = body.split(/^## /m).slice(1).map((s) => ({ h: s.split('\n')[0].trim(), items: s.split('\n').filter((l) => /^[-*]\s/.test(l)) }));
  const pts = secs.find((s) => s.h === '要点'); const qs = secs.find((s) => s.h === '金句');
  if (!pts) err(f, '缺少「## 要点」'); else if (pts.items.length < 3 || pts.items.length > 5) err(f, `要点应 3–5 条，现有 ${pts.items.length}`);
  if (qs && qs.items.length > 3) err(f, `金句最多 3 条，现有 ${qs.items.length}`);
  for (const q of qs?.items || []) { const n = len(q.replace(/^[-*]\s+/, '')); if (n > (fm.lang === 'zh' ? 80 : 200)) err(f, `金句过长（${n} 字符）：引用必须是简短原话`); }
  const items = (body.match(/^[-*]\s/mg) || []).length; const trs = (body.match(new RegExp(`^\\s*>\\s*\\[${tl}\\]`, 'mg')) || []).length;
  if (trs < items) err(f, `每条要点/金句后都要有 > [${tl}] 译文（${trs}/${items}）`);
  const total = len(body.split('\n').filter((l) => !/^\s*>/.test(l)).join('\n'));
  if (total > (fm.lang === 'zh' ? 900 : 2200)) err(f, `正文过长（原文语言 ${total} 字符）：只写要点 + 少量引用，不得转载全文`);
}
console.log(`interviews-check: ${files.length} files, ${bad} error(s)`);
process.exit(bad ? 1 : 0);
