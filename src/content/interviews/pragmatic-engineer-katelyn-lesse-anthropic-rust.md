---
title: "How Anthropic builds software in 2026 with Katelyn Lesse"
title_tr: "Katelyn Lesse：2026 年 Anthropic 如何做软件"
show: "The Pragmatic Engineer"
kind: "podcast"
guests: ["Katelyn Lesse"]
company: "Anthropic"
date: "2026-11-26T01:31:32+08:00"
url: "https://newsletter.pragmaticengineer.com/p/how-anthropic-builds-software-in"
duration: "1:48:12"
lang: "en"
products: ["claude-managed-agents", "claude-code"]
tags: ["Agents", "Dev Tools", "Industry"]
score: 5
summary: "Anthropic's head of platform engineering explains how a few engineers with no Rust experts rewrote the Messages API from Python to Rust in about five months by shadowing production traffic, plus how AI code review, oncall, onboarding, hiring and promotions are changing inside the company."
summary_tr: "Anthropic 平台工程负责人讲述几位没有 Rust 专家的工程师如何靠回放线上流量，在约五个月里把 Messages API 从 Python 重写成 Rust，以及公司内部 AI 代码审查、值班、入职、招聘和晋升正在怎么变。"
---
## 要点

- The Messages API serves every external Claude token plus Claude Code and Claude Desktop. It began as a Python monolith in 2023, and after optimizing Python hit its limits, a few engineers with no Rust experts rebuilt it in Rust in about five months.
  > [zh] Messages API 为所有对外的 Claude token 以及 Claude Code、Claude Desktop 服务。它 2023 年起步时是 Python 单体，优化 Python 到极限后，几位没有 Rust 专家的工程师用约五个月把它重建成 Rust。
- The key was verification, not review: the old Python API was a perfect test harness, so the Rust service shadowed production traffic until responses matched. Engineers looked closely at only about 20% of the generated code, and Claude helped them learn Rust.
  > [zh] 关键是验证而不是评审：旧的 Python API 就是完美的测试夹具，Rust 服务旁路跟随线上流量，直到响应一致。工程师只仔细看了约 20% 的生成代码，Claude 还帮他们学 Rust。
- A Claude classifier reviews every pull request and decides whether a human is needed, how many, and which team; mechanical changes like an SDK bump can be reviewed by another Claude, merged and deployed. For API oncall, a Claude agent triages alerts before a human is paged, and new hires onboard by asking Claude.
  > [zh] 每个 PR 都由 Claude 分类器评审，决定是否需要人、要几个人、交给哪个团队；SDK 升级这类机械改动可由另一个 Claude 评审、合并并部署。API 值班时，Claude Agent 先于真人对告警分类，新员工入职就是「问 Claude」。
- Unchanged: planning and alignment take as long as pre-AI, and teams are still two-pizza teams of 5–8 who own systems and get paged; changed: engineers spend far more time building their own tooling, and Claude Managed Agents was rebuilt before launch.
  > [zh] 没变的：规划和对齐耗时与 AI 之前相当，团队仍是 5–8 人、负责并值守系统的两个披萨团队；变了的：工程师花在给自己造工具上的时间多得多，Claude Managed Agents 也在发布前被重建。
- Hiring and promotion are being rewired: the coding interview was phased out because strong candidates kept failing it, with agent-assisted interviews being tried, and promotions now weigh impact (CPU saved, latency cut, incidents avoided) instead of project duration.
  > [zh] 招聘和晋升正在被改写：编码面试因强候选人总在这关失败而取消，正在试验有 Agent 参与的面试；晋升改看影响（省了多少 CPU、降了多少延迟、避免了多少故障），而不是项目耗时。

## 金句

- “As long as you can really boil something down to make it verifiable in some way, then you don’t have to look at every single line of Rust code that’s getting written.”
  > [zh] 「只要你能把事情真正化简到某种可验证的形式，就不必去看每一行正在写出来的 Rust 代码。」
