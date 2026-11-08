import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page = (id) => readFileSync(`dist/products/${id}/index.html`, 'utf8');
for (const [product, post, subject, kind] of [
  ['chatgpt', 'tech-2026-11-04-2015-4', 'Floot', 'news'],
  ['kimi', 'tech-2026-11-03-2355-4', 'One Roof', 'news'],
  ['floot', 'tech-2026-11-04-2015-4', 'Floot', 'discovery'],
  ['one-roof', 'tech-2026-11-03-2355-4', 'One Roof', 'discovery'],
  ['glasshand', 'tech-2026-11-07-2000-1', 'Glasshand', 'discovery'],
]) {
  const html = page(product);
  const item = html.match(/<li class="tln"[^>]*>[\s\S]*?<\/li>/g)?.find((s) => s.includes(`#${post}`));
  assert.ok(item, `${product}: preserves ${subject} related item and route`);
  assert.ok(item.includes(`data-type="${kind}"`), `${product}: ${kind}`);
  assert.ok(item.includes(`data-i18n="tl.${kind}"`));
  assert.ok(!html.includes('data-type="launch"'));
  assert.ok(html.includes('not necessarily product launches'));
}
assert.ok(page('glasshand').includes('Cataloged 2026-11-07'));
assert.ok(readFileSync('dist/day/2026-11-07/index.html', 'utf8').includes('November 5'));
assert.ok(readFileSync('dist/day/2026-11-07/index.html', 'utf8').includes('11 月 5 日'));
assert.ok(readFileSync('dist/index.html', 'utf8').includes('Added to catalog'));
assert.ok(readFileSync('dist/products/index.html', 'utf8').includes('Added to catalog this week'));
console.log('PASS generated product pages: subjects, mentions, dates, filters and catalog labels');
