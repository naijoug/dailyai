// 双语内容随 UI 语言切换：主文（.blp）显示 UI 语言版本，另一种语言放进地球图标折叠块（details.itr > .itr-body）。
// 单元 = 带 data-ol（原文语言）的元素；data-cur = 主文当前语言。服务端按英文 UI 预排，中文 UI 由 applyBL 在显示前交换。
import { t, getLang, type Lang } from './i18n';
// 原文：引号图标；译文：翻译（文/A）图标
export const ICON_O = '<svg class="ic ic-or" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M5 6.5h5v5c0 3.2-1.6 5.3-4.6 6"/><path d="M14 6.5h5v5c0 3.2-1.6 5.3-4.6 6"/></svg>';
export const ICON_T = '<svg class="ic ic-tr" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M3 5.5h9M7.5 3.5v2"/><path d="M5 5.5c.6 3.2 2.6 5.8 5.5 7"/><path d="M10 5.5c-.6 3.2-2.6 5.8-5.5 7"/><path d="M12.5 21l4-9.5 4 9.5"/><path d="M14 17.5h5"/></svg>';
export const licTitle = (k: 'o' | 't', l: Lang, ui: Lang = getLang()) => `${t(k === 'o' ? 'bl.orig' : 'bl.tr', {}, ui)} · ${t('bl.l.' + l, {}, ui)}`;
export const licHtml = (k: 'o' | 't', l: Lang, ui?: Lang) => { const t = licTitle(k, l, ui); return `<span class="lic" data-k="${k}" data-ll="${l}" role="img" title="${t}" aria-label="${t}">${k === 'o' ? ICON_O : ICON_T}</span>`; };
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g;
export const guessLang = (text: string): Lang => { const t = text.replace(/https?:\/\/\S+/g, ' '); const c = (t.match(CJK) || []).length; const l = (t.match(/[A-Za-z]{2,}/g) || []).length; return c >= Math.max(4, l * 0.6) ? 'zh' : 'en'; };
const other = (l: string): Lang => (l === 'zh' ? 'en' : 'zh');
const setLangAttr = (el: Element, l: string) => { if (l === 'zh') el.setAttribute('lang', 'zh-CN'); else el.setAttribute('lang', 'en'); };
const parts = (u: HTMLElement) => {
  const pri = u.querySelector<HTMLElement>('.blp'); const d = u.querySelector<HTMLDetailsElement>('details.itr'); const sec = d?.querySelector<HTMLElement>('.itr-body') || null;
  return { pri, d, sec };
};
const ensureLic = (slot: HTMLElement, k: 'o' | 't', l: Lang) => {
  let s = slot.querySelector<HTMLElement>(':scope > .lic');
  if (!s) { slot.insertAdjacentHTML('afterbegin', licHtml(k, l)); s = slot.querySelector<HTMLElement>(':scope > .lic')!; }
  if (s.dataset.k !== k || s.dataset.ll !== l) { s.dataset.k = k; s.dataset.ll = l; s.innerHTML = k === 'o' ? ICON_O : ICON_T; }
  const t = licTitle(k, l); s.title = t; s.setAttribute('aria-label', t);
};
/** 去掉图标后的内容 HTML */
export const slotHtml = (slot: Element) => { const c = slot.cloneNode(true) as HTMLElement; c.querySelectorAll(':scope > .lic').forEach((x) => x.remove()); return c.innerHTML; };
/** 按原文方向取单元内容（收藏存储用） */
export function origParts(u: HTMLElement) {
  const { pri, d, sec } = parts(u); const ol = (u.dataset.ol || 'en') as Lang; const cur = u.dataset.cur || ol;
  const a = pri ? slotHtml(pri) : ''; const b = sec ? slotHtml(sec) : '';
  const swapped = !!(d && sec) && cur !== ol;
  const html = swapped ? b : a; const text = (() => { const x = document.createElement('div'); x.innerHTML = html; return (x.textContent || '').trim(); })();
  return { html, text, tr: d && sec ? { lang: other(ol), html: swapped ? a : b } : undefined };
}
export function applyBL(root: ParentNode = document) {
  const ui = getLang();
  root.querySelectorAll<HTMLElement>('[data-ol]').forEach((u) => {
    const { pri, d, sec } = parts(u); if (!pri) return;
    const ol = (u.dataset.ol === 'zh' ? 'zh' : 'en') as Lang;
    let cur = (u.dataset.cur || ol) as Lang;
    if (d && sec) {
      const want: Lang = ui; // 有译文时主文跟随 UI 语言
      if (cur !== want) {
        const mv = (from: HTMLElement) => [...from.childNodes].filter((n) => !(n instanceof HTMLElement && n.classList.contains('lic')));
        const a = mv(pri), b = mv(sec);
        a.forEach((n) => sec.appendChild(n)); b.forEach((n) => pri.appendChild(n));
        cur = want; u.dataset.cur = cur; d.dataset.tlang = other(cur);
      }
      setLangAttr(pri, cur); setLangAttr(sec, other(cur));
      ensureLic(sec, other(cur) === ol ? 'o' : 't', other(cur));
    }
    ensureLic(pri, cur === ol ? 'o' : 't', cur);
  });
  // CSS 驱动的双语块（BL 组件）：只同步地球按钮的目标语言
  root.querySelectorAll<HTMLElement>('details.blx-d').forEach((d) => { d.dataset.tlang = other(ui); });
}
