# 文章详情页（爆款长文）

站点可以为个别**爆款长文**生成详情页 `/article/<id>/`：原文逐段展示，每段后附默认折叠的译文；日报条目上出现一个「文档」小图标链接到详情页。

## 什么时候加（给定时汇总任务）

- 只收**爆款长文**：X Articles（`x.com/i/article/...`）或同等长度的长帖/博客，且互动极高（参考：收藏数数千、点赞数千，明显高于当期其他条目）。
- **每次运行最多 1–2 篇**；拿不到完整原文就不要加（不得凭摘要补写或编造）。
- 该文必须已经是当期 digest 里的一个条目。

## 怎么加

1. 取全文：X 文章用 X 工具按**帖子 id**（不是 article id）读取，`post.fields=article`，返回的 `article.plain_text` / `title` 即全文。保留原文措辞（包括原文中的拼写错误），不删改。
2. 新建 `src/content/articles/<id>.md`，`<id>` 用小写短横线，如 `thorsten-ball-how-i-work-with-agents`：

```markdown
---
title: "How I work with Agents"
title_tr: "我如何与 Agent 协作"        # 可选：标题译文
author: "Thorsten Ball"
handle: "thorstenball"                 # 可选，X 用户名，不带 @
source_url: "https://x.com/i/article/2114385531811319808"
published: "2026-10-25T15:58:12Z"
lang: "en"                             # 原文语言 en | zh
day: "2026-10-26"                      # 所在日报日期（北京时间）
item: "x-ai-2026-10-26-0915-5"         # 可选：条目 id = <post id>-<序号>
---
First original paragraph.

> [zh] 第一段的中文翻译。

## A heading in the original

> [zh] 原文标题的翻译。
```

   - 正文 = 原文**逐段**，每段（含标题、列表、代码块、图片）之后紧跟一个 `> [zh] …`（英文原文）或 `> [en] …`（中文原文）引用块作为译文，与日报条目的双语格式一致。
   - 每个顶层 `>` 引用都会被渲染成折叠译文，所以原文里本来就有的引用请写成普通段落或放进列表/代码里。
   - 忠实翻译，不加评论；链接、代码保留原样。
3. 链接条目：在 digest 的条目行加 `[A:<id>]`（放在 `[AI:N]` 之前），导入脚本会写入 frontmatter `articles: ["<序号>:<id>"]`。已导入的 post 也可以直接在 frontmatter 加这一行。
4. `npm run build` 通过后再提交。

## 注意

- 详情页带 `noindex`，顶部有「原文作者 / original source」署名横幅；不要转载付费墙或明确禁止转载的内容。
- 不要把任何密钥、关注列表或 X List ID 写进站点内容。
