---
title: "用 Manus 改造 Manus，AI Native 组织改造的实践和思考"
title_tr: "Using Manus to Rebuild Manus: Practice and Lessons from an AI-Native Org Overhaul"
show: "潜云思绪（Founder Park 转载）"
kind: "article"
guests: ["张涛"]
company: "Manus"
date: "2026-10-27T18:45:00+08:00"
url: "https://mp.weixin.qq.com/s/I_hNNAf7LFBf5nJ0rEJHig"
lang: "zh"
products: ["manus"]
tags: ["Agents", "Industry"]
score: 4
summary: "Manus 联合创始人张涛复盘研发、产品、市场三个团队如何用 Agent 改造自己：一人同时推进十几个需求，产品经理直接提交代码，人均月 AI 开销超 1 万美元"
summary_tr: "Manus co-founder Zhang Tao on how R&D, product and marketing rebuilt themselves around agents: engineers run a dozen-plus tasks at once, PMs ship code, and AI spend topped $10K per person a month"
---
## 要点

- 研发做了 Manus-mono：不合并代码，而是统一入口加一本给 AI 看的说明书，配合 Git worktree、本地完整运行、受控读线上日志和端到端测试账号验证，审批权仍在人手里。
  > [en] R&D built Manus-mono: not a merged monorepo but one entry point plus a manual written for AI, with Git worktrees, the full stack running locally, permissioned access to production logs and end-to-end checks with test accounts; humans still approve releases.
- 工程师把 Slack 需求原文直接丢给一排 Codex 和 Manus Session，一人同时推进十几、二十个需求已成常态；移动端 7 人负责 2 个产品、4 个 App。
  > [en] Engineers paste Slack requests verbatim into rows of Codex and Manus sessions and routinely juggle 10–20 tasks; a 7-person mobile team covers 2 products and 4 apps.
- 约一半产品经理能独立把需求做到上线，所有产品经理都提交过代码；部分需求用视频（PRV）代替传统 PRD，自建代码审核机器人把关。
  > [en] About half the PMs ship features end to end and all have committed code; some requirements now arrive as videos instead of PRDs, gated by an in-house code-review bot.
- 市场团队的“数字同事”在 Slack 里自己判断要不要被打断、主动提醒项目进度，还能通过反馈接口触发 Manus Automations 给自己加功能。
  > [en] Marketing's "digital colleague" triages Slack interruptions on its own, proactively flags project status, and can file feature requests that trigger Manus Automations to extend its own tools.
- 9 月人均 AI 开销超 1 万美元，张涛认为买的是时间和注意力，用最好的模型也是摸清能力边界的方法，成本会通过产品优化下降。
  > [en] September AI spend topped $10K per person; Zhang argues it buys time and attention, that using the best models is how you learn their limits, and that costs will fall as the product improves.

## 金句

- 「一个需求，一个人可以写完所有端。」
  > [en] “One person can build every platform for a single requirement.”
- 「第一，这笔钱买的不是人力，而是时间和注意力。」
  > [en] “First, this money doesn't buy labor; it buys time and attention.”
- 「在 AI Native 组织里，人的角色没有变小，而是更集中了。」
  > [en] “In an AI-native organization, people's role hasn't shrunk; it has become more concentrated.”
