---
title: "Tabbit 万字复盘：做了一年半 Browser Use，我们学到的苦涩教训"
title_tr: "Tabbit's long retrospective: the bitter lesson from 18 months of building Browser Use"
show: "Founder Park"
kind: "article"
guests: ["Tabbit 团队"]
company: "Tabbit"
date: "2026-11-20T16:08:21+08:00"
url: "https://www.163.com/dy/article/LC6KC2LB05566TJ2.html"
lang: "zh"
products: ["tabbit", "codex", "browser-use"]
tags: ["Agents", "Dev Tools", "Chinese Community"]
score: 4
summary: "AI 浏览器 Tabbit 复盘一年半的 Browser Use：GUI 仿人路线成功率卡在六成左右，直到 Codex 用代码和循环两分钟灌完 200 多条后台配置，团队转向以 Playwright 为首选的 Coding-first 方案，推出 Tabbit CLI，并给出与 Codex Chrome、Agent Browser 的对比数据"
summary_tr: "AI browser Tabbit looks back on 18 months of Browser Use: the human-like GUI approach stalled at around 60% success until Codex pushed 200-plus backend configs in two minutes with code and a loop, prompting a Coding-first, Playwright-first rebuild, the Tabbit CLI, and benchmarks against Codex Chrome and Agent Browser"
---
## 要点

- GUI 路线的天花板：团队压缩 DOM、测了几百种模型 + Harness 组合，「看网页→决策→执行」的循环仍慢且点不准，成功率只有 60% 左右，飞书多维表格等画布页面只能盲猜坐标；Seed 1.8 的 GUI 点击一度胜过 Claude，但 Seed 2.0 退步，谷歌 GLIC/APC 方案下的 Gemini Flash 内部成绩平平。
  > [en] The GUI ceiling: despite DOM compression and hundreds of model-plus-harness combinations, the "look, decide, act" loop stayed slow and imprecise at around 60% success, and canvas pages like Feishu Bitable left only guessed coordinates; Seed 1.8 once beat Claude at GUI clicks but Seed 2.0 regressed, and Gemini Flash under Google's GLIC/APC stack scored only middling internally.
- 转折点：先发现让模型直接在页面写 JS（eval_javascript）明显更快更稳；后来 Codex 的 Chrome 扩展不到半小时做完一个多小时的后台配置。拆开插件发现它分层抽象：Playwright 优先，其次 DOM-CUA、视觉 CUA，最后才是原始 CDP。
  > [en] The turning point: letting the model write JS in the page (eval_javascript) was clearly faster and steadier; then Codex's Chrome extension finished an hour-plus back-office configuration in under 30 minutes. Its plugin layers interfaces: Playwright first, then DOM-CUA, visual CUA, and raw CDP last.
- Tabbit CLI（2026 年 8 月）以 Playwright 为首选、保留 CDP 兜底，理由是 Agent 常主动安装 Playwright，模型最熟悉它；CLI 复用登录态、在后台工作不抢窗口。BU Bench V1 对比中 Tabbit 正确率最高，每个正确答案的输入 token 比 Codex Chrome 少约 49%、比 Agent Browser 少约 61%。
  > [en] Tabbit CLI (August 2026) is Playwright-first with CDP as fallback, since agents often install Playwright unprompted and models know it best; it reuses logins and works in the background. On BU Bench V1 Tabbit had the highest accuracy, using about 49% fewer input tokens per correct answer than Codex Chrome and about 61% fewer than Agent Browser.
- Browser Use 也走到同一结论，11 月发布 1.0.0 全面转向 CDP；文章认为两者只是取舍不同。端侧小模型 Jev 判断页面状态准确率 95.2%、延迟 0.76 秒，但长程任务 118 步里只决定了 2 步，目前只用于验证过的环节；下一步团队想试 WebMCP。
  > [en] Browser Use reached the same conclusion and went all-in on CDP with 1.0.0 in November; the article calls it a difference of taste. The small on-device model Jev judged page state at 95.2% accuracy with 0.76-second latency, but made only 2 of 118 steps on long tasks, so it is used only for verified sub-steps; WebMCP is the team's next experiment.

## 金句

- 「一个 for 循环带上变量和状态，就在两分钟内把 200 多条配置无声无息地灌进了后台系统。」
  > [en] "A single for loop, carrying variables and state, quietly poured more than 200 configurations into the back-office system in two minutes."
- 「一旦模型能用代码观察、操作和验证一个环境，它就可以把整个浏览器交互当成一个纯粹的编程问题来解决。」
  > [en] "Once a model can observe, operate and verify an environment through code, it can treat the whole browser interaction as a pure programming problem."
- 「单步判断准，不等于长程任务可行。」
  > [en] "Getting single steps right doesn't mean long-horizon tasks are feasible."
