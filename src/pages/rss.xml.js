import rss from '@astrojs/rss';
import { allDays } from '../lib/days';
import { allInterviews } from '../lib/interviews';
export async function GET(context) {
  const days = await allDays();
  const ivs = await allInterviews();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const dayItems = days.filter((d) => d.posts.length).map((d) => ({
    title: d.title,
    pubDate: d.last,
    description: [d.aiHeads.length ? `AI Hot: ${d.aiHeads.join('; ')}` : '', d.techHeads.length ? `Tech: ${d.techHeads.join('; ')}` : '', d.ivCount ? `Interviews: ${d.ivs.map((iv) => iv.data.show).join('; ')}` : ''].filter(Boolean).join('\n'),
    categories: d.tags,
    link: `${base}/day/${d.date}/`,
  }));
  // 访谈与播客：每条单独一项（摘要 + 原文链接，不含全文）
  const ivItems = ivs.map((iv) => ({
    title: `[${iv.data.kind === 'podcast' ? 'Podcast' : 'Interview'}] ${iv.data.show}: ${iv.data.title}`,
    pubDate: iv.data.date,
    description: `${iv.data.summary}${iv.data.summary_tr ? `\n${iv.data.summary_tr}` : ''}\nSource: ${iv.data.url}`,
    categories: ['Interviews & Podcasts', ...iv.data.tags],
    link: `${base}/interview/${iv.id}/`,
  }));
  return rss({
    title: 'Daily AI',
    description: 'One page per day: AI Hot and Tech, plus interviews & podcasts',
    site: new URL(base + '/', context.site).href,
    customData: '<language>zh-cn</language>',
    items: [...dayItems, ...ivItems].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
  });
}
