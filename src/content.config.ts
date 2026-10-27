import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const TAGS = ['Models', 'Agents', 'Dev Tools', 'Open Source', 'Products', 'Research', 'Industry', 'Security', 'Chinese Community'] as const;
export const tagSlug = (t: string) => t.toLowerCase().replace(/\s+/g, '-');

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['x-ai', 'tech']),
    tags: z.array(z.enum(TAGS)).default([]),
    summary: z.string(),
    coverage: z.string().optional(),
    scores: z.array(z.number().int().min(0).max(5)).default([]),
    daySummary: z.string().optional(),
    daySummaryEn: z.string().optional(),
    products: z.array(z.string()).default([]),
    // 'index:articleId'，条目链接到 /article/<id>/ 详情页（docs/articles.md）
    articles: z.array(z.string()).default([]),
  }),
});
const ranking = z.object({
  source: z.string(), list: z.string(), badge: z.string().optional(), rank: z.number().int().optional(),
  metric: z.string().optional(), value: z.string().optional(), mom: z.string().optional(),
  date: z.string(), url: z.string(), snap: z.string().optional(),
});
export const PRODUCT_CATEGORIES = ['对话助手', '编程/Agent', '办公', '图像', '视频', '音频', '搜索', '研究', '开发者平台', '其他'] as const;
const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    id: z.string(), name: z.string(), aliases: z.array(z.string()).default([]), url: z.string().url(),
    domains: z.array(z.string()).default([]), category: z.enum(PRODUCT_CATEGORIES), region: z.enum(['cn', 'global']),
    maker: z.string().optional(), oneLiner: z.string(), oneLinerEn: z.string().optional(), score: z.number().int().min(1).max(5).optional(),
    growth: z.number().optional(), growthNote: z.string().optional(), growthDate: z.string().optional(),
    firstSeen: z.string(), updated: z.string(), tags: z.array(z.enum(TAGS)).default([]),
    mentionExclude: z.array(z.string()).default([]), matchNames: z.array(z.string()).optional(), rankings: z.array(ranking).default([]),
  }),
});
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(), author: z.string(), handle: z.string().optional(), source_url: z.string().url(),
    published: z.coerce.date(), lang: z.enum(['en', 'zh']), day: z.string(), item: z.string().optional(),
    title_tr: z.string().optional(),
  }),
});
// 访谈与播客（docs/interviews.md）：只存摘要要点 + 少量原话引用 + 原文链接，绝不转载全文
const interviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/interviews' }),
  schema: z.object({
    title: z.string(), title_tr: z.string().optional(), show: z.string(), kind: z.enum(['article', 'podcast']),
    guests: z.array(z.string()).default([]), company: z.string().optional(), date: z.coerce.date(), url: z.string().url(),
    duration: z.string().optional(), lang: z.enum(['en', 'zh']), products: z.array(z.string()).default([]),
    tags: z.array(z.enum(TAGS)).default([]), score: z.number().int().min(1).max(5).optional(),
    summary: z.string(), summary_tr: z.string().optional(),
  }),
});
export const collections = { posts, products, articles, interviews };
