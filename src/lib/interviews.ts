import { getCollection } from 'astro:content';
import { dayKey } from './days';
export async function allInterviews() {
  return (await getCollection('interviews')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
export type Interview = Awaited<ReturnType<typeof allInterviews>>[number];
// 主文语言版本：en/zh 两个字段（原文语言在 lang）
export const ivText = (iv: Interview, f: 'title' | 'summary') => {
  const o = iv.data[f]; const tr = iv.data[`${f}_tr` as 'title_tr' | 'summary_tr'];
  return iv.data.lang === 'zh' ? { zh: o, en: tr } : { en: o, zh: tr };
};
export const ivDay = (iv: Interview) => dayKey(iv.data.date);
