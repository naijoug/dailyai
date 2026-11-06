# Daily AI

📅 [Markdown 每日索引](daily/README.md) · 🔎 [信息收集指南 Collect.md](Collect.md)

每日 AI 动态静态站：<https://naijoug.github.io/dailyai/>

基于 Astro，内容来自两类中文汇总：

- **X AI 热点**（`type: x-ai`）：「AI 热点」与「有趣用法和干货」
- **科技速递**（`type: tech`）：新产品 / 开源、科技新闻、中文社区

功能：首页按时间倒序（可按类型筛选）、`/x-ai`、`/tech` 分区页、`/tags/<标签>`、文章页、`/rss.xml`、Pagefind 全文搜索（`/search`），浅色 / 深色模式，以及 `/codex-reset`（Codex 全球用量重置的非官方估计，见 `docs/codex-reset.md`）。设置里可以选「使用 GitHub 登录」，把已读和收藏同步到私密 Gist（见 `docs/github-sync-setup.md`）；没配 OAuth 时不显示登录按钮。

## 添加一篇文章

```bash
node scripts/import.mjs <源文件.md>   # 例如 /workspace/x-ai/summaries/2026-10-21-1315.md
git add src/content/posts
git commit -m "post: <id>"
git pull --rebase -q && git push   # main 上可能有 daily/ 的自动提交
```

推送到 `main` 后，GitHub Actions 会自动构建并部署到 Pages（见下方「部署」）。

## Markdown 导出（daily/）

`daily/` 是可直接在 GitHub 阅读的纯 Markdown 版本：[每日索引](daily/README.md)（对应网站首页）、按天 `daily/YYYY/MM/YYYY-MM-DD.md`（中文为主的紧凑条目）、全文 `daily/articles/<id>.md`（双语）。由 `npm run export:md`（`scripts/export-md.mjs`）生成。**自动生成，不要手改、也不要手动提交**：`.github/workflows/export-md.yml` 会在 `src/content/**` 推送到 main 后重新导出并以 `chore(daily): ... [skip ci]` 提交，所以推送前先 `git pull --rebase`。

## 部署

当前由 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 在推送到 `main` 后自动安装依赖、校验 Markdown 导出、构建并通过 `actions/deploy-pages` 部署。发布后核对对应提交的 Actions 结果；不要重新建立工作流或更改 Pages 来源。

`scripts/publish-gh-pages.sh` 是历史手动发布脚本，不是当前常规发布流程。

信息源、核验、去重与维护规则统一见 [Collect.md](Collect.md)。X AI 热点和科技速递两个定时收集任务由 dot 管理，本仓库不承载它们的调度。

### import.mjs 说明

- 源文件名必须是 `YYYY-MM-DD-HHMM.md`（北京时间）。类型按路径判断（路径含 `x-ai` → `x-ai`，含 `tech-digest` → `tech`），也可以加 `--type x-ai|tech`。
- 输出 `src/content/posts/<type>-<YYYY-MM-DD-HHMM>.md`；同一 id 重复导入会直接覆盖（幂等）。可一次传多个文件。
- 自动生成 frontmatter：`title`、`date`（`+08:00`）、`type`、`tags`（按关键词从 模型 / Agent / 编程工具 / 开源 / 产品 / 研究 / 行业 / 安全 / 中文社区 中最多选 4 个）、`summary`（前三条条目标题）、`coverage`（覆盖时段）。
- 发布前会去掉：关注账号 / List 管理相关的行（如「新关注…」「这次没有新关注」）、内部去重笔记，以及抓取失败、限流、补跑等内部说明。`follows.md` 会被拒绝导入。

## 本地开发

需要 Node 22.22+。

```bash
npm ci
npm run dev      # 开发
npm run build    # 构建 + 生成 Pagefind 索引到 dist/
```
