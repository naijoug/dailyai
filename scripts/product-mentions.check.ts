import assert from 'node:assert/strict';
import { mentionKind } from '../src/lib/product-mention-kind.ts';
import { t } from '../src/lib/i18n.ts';
for (const section of ['新产品', 'New Products']) {
  assert.equal(mentionKind(section, true, 'tech'), 'discovery');
  assert.equal(mentionKind(section, false, 'tech'), 'news');
  assert.equal(mentionKind(section, false, 'x-ai'), 'x');
}
assert.equal(mentionKind('科技新闻', true, 'tech'), 'news');
assert.equal(mentionKind('AI 热点', true, 'x-ai'), 'x');
assert.equal(t('tl.discovery', {}, 'en'), 'Product introduction');
assert.equal(t('tl.discovery', {}, 'zh'), '产品介绍');
assert.equal(t('p.first', { d: '2026-11-07' }, 'en'), 'Cataloged 2026-11-07');
assert.equal(t('p.first', { d: '2026-11-07' }, 'zh'), '本站收录于 2026-11-07');
for (const lang of ['en', 'zh'] as const) {
  for (const key of ['gallery.new', 'gallery.newTitle', 'p.fresh', 'p.fresh.sub', 'p.s.new', 'tl.dateNote']) {
    assert.notEqual(t(key, { d: '2026-11-01' }, lang), key);
    assert.match(t(key, { d: '2026-11-01' }, lang), lang === 'en' ? /catalog|not necessarily/ : /本站/);
  }
}
console.log('PASS product mention semantics and bilingual catalog labels');
