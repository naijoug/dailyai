# 访谈与播客（interviews）

站点收录与 AI / Agent 相关的**访谈文章与播客单集**：每条一个文件 `src/content/interviews/<id>.md`，生成详情页 `/interview/<id>/`，并自动出现在：

- 当天的日报页（「访谈与播客 / Interviews & Podcasts」小节，按北京时间日期归属；当天没有 digest 也会生成日页）和首页卡片计数；
- 关联产品详情页的**时间线**（与 digest 里的新闻 / X 热点 / 产品发布合并，倒序）；
- 站内搜索（Pagefind）、RSS（每条单独一项）、`daily/` Markdown 导出（索引 + 当天文件）。

## 版权红线（必须遵守）

- **绝不转载全文**，也不要大段改写复述全文。只写：一句话摘要 + 3–5 条要点 + 至多 3 条**简短**原话引用 + 原文链接。
- 引用必须是**这次实际抓到的原文**里逐字存在的句子（中文 ≤80 字、英文 ≤200 字符）。不得编造或"润色"引用。
- 播客：只有 show notes 或官方文字稿（如 latent.space/p/…、lennysnewsletter.com/p/…）里出现的原话才能当引用；没有文字稿就**不写「金句」小节**。
- `scripts/interviews-check.mjs` 会卡住过长的引用和正文。

## 文件格式

`<id>` 用小写字母、数字、短横线，建议 `<栏目>-<嘉宾或主题>`，如 `founder-park-k2-lab-wang-ming-moras`。

```markdown
---
title: "对话K2 Lab王铭：Muse帮人省钱，Moras帮人赚钱，这才是垂直赛道Personal AI的刚需"
title_tr: "K2 Lab's Wang Ming: ..."            # 可选：标题的另一语言译文
show: "Founder Park"                        # 栏目 / 节目名
kind: "article"                             # article（访谈文章）| podcast（播客单集）
guests: ["王铭"]
company: "K2 Lab（攀峰智能）"                # 可选
date: "2026-10-27T14:32:29+08:00"           # 发布时间；只知道日期就写 "2026-10-12"（按北京时间归日）
url: "https://mp.weixin.qq.com/s/..."       # 原文 / 单集页（小宇宙去掉 ?utm_source=rss）
duration: "1:26:18"                         # 播客时长，可选
lang: "zh"                                  # 原文语言 zh | en
products: ["moras"]                         # 关联产品 slug（必须已存在于 src/content/products/）
tags: ["Agents", "Industry"]                # 取值同 digest 标签：Models/Agents/Dev Tools/Open Source/Products/Research/Industry/Security/Chinese Community
score: 5                                    # 1–5，对读者的价值（同 [AI:N] 口径）
summary: "一句话摘要（原文语言）"
summary_tr: "One-line summary in the other language"
---
## 要点

- 原文语言写的要点一
  > [en] English translation of point one
- 要点二
  > [en] ...

## 金句

- 「逐字引用的原话」
  > [en] “Translation”
```

- 双语规则与 digest 一致：原文语言为主文，另一语言写在**紧跟的缩进** `> [zh]` / `> [en]` 行；英文源写 `> [zh]`，中文源写 `> [en]`。页面上主文随 UI 语言切换，地球图标展开另一语言。
- 小节标题固定用 `## 要点` 和 `## 金句`（站点会按 UI 语言显示为 Key points / Quotes）。

## 产品关联

1. 先在 `src/content/products/` 里找（按名称、别名、官网域名，见 `src/data/product-aliases.json`）。
2. 不存在、但访谈的主角产品**有官网**：新建 `src/content/products/<slug>.json`（字段同其他产品：id/name/aliases/url/category/region/maker/oneLiner/oneLinerEn/firstSeen/updated/tags/rankings: []），并在 `product-aliases.json` 加别名。
3. 找不到官网（只有公众号、X 账号等）就**不要关联**，`products` 里不写它。
4. 只关联访谈里实质讨论的产品，顺带提到的不算。

## 评分（score）

- 5：一线创始人 / 核心研究者的深度长访谈，有新数据或新判断，和本站主题强相关；
- 4：信息密度高、AI/Agent 强相关；
- 3：值得一看，但部分内容与 AI 关系一般；
- ≤2：不建议收录。

## 信息源与导入流程（给定时任务）

信息源登记表在 box 上：`/workspace/sources/interviews.md`（不进仓库），列出每个源的抓取方式（RSS 优先；Apple Podcasts lookup；小宇宙；微信公众号走 X/搜狗发现 + WebFetch 取正文）、评分、last_hit、连续失败次数和状态（活跃/观察中/已移除），以及升降级规则。

每次运行：

1. 按登记表抓 `活跃` 与 `观察中` 的源，挑出上次运行之后发布的 AI / Agent 相关单集或文章（每次 0–5 条，宁缺毋滥）。
2. 读 show notes / 文字稿 / 原文，写 `src/content/interviews/<id>.md`（只写摘要要点 + 短引用）。
3. 处理产品关联（见上）。
4. 更新登记表的 last_hit / misses / status。
5. 校验、构建、提交、推送：

```bash
cd /workspace/dailyai
export PATH=~/.local/node22/bin:$PATH
node scripts/interviews-check.mjs && npm run build \
  && git add src/content/interviews src/content/products src/data/product-aliases.json \
  && git commit -m "interviews: <简述>" \
  && git pull --rebase && git push origin main
```

`daily/` 由 `.github/workflows/export-md.yml` 在推送后自动重新生成，不要手改。
