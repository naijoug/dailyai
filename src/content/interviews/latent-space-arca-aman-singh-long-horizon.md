---
title: "Agents Prompt People: Using Agents for Long-Horizon Financial Work"
title_tr: "Agent 反过来提醒人：Arca 如何用长期 Agent 做财富管理"
show: "Latent Space"
kind: "podcast"
guests: ["Aman Singh"]
company: "Arca"
date: "2026-11-01T00:00:00+08:00"
url: "https://latent.space/p/arca"
duration: "26:05"
lang: "en"
products: ["arca"]
tags: ["Agents", "Industry"]
score: 4
summary: "Arca head of AI Aman Singh on custom agent harnesses, multi-day stop-start financial workflows, deterministic safety rails, and why agents prompt people more than people prompt agents"
summary_tr: "Arca AI 负责人 Aman Singh 谈自建 Agent harness、跨多天的停启式金融工作流、确定性安全护栏，以及为何 Agent 提醒人比人提示 Agent 更常见"
---
## 要点

- Arca is an AI-native wealth management firm (recently raised $48.5M led by General Catalyst; ~$64M total) where agents do most background work while human advisors keep final decisions on trades and money movement.
  > [zh] Arca 是一家 AI 原生财富管理公司（最近由 General Catalyst 领投 4850 万美元，累计约 6400 万）：Agent 承担大部分后台工作，人类顾问保留交易与资金调动的最终决定权。
- Financial tasks are long-horizon but stop-start—agent work can span up to about ten days across many actors, decision points and handoffs—so Arca built a per-client persistent memory that tracks what happened, what is next, near-term vs long-term items, and who owns each action.
  > [zh] 金融任务是「长时程但断续」的——Agent 工作可跨约十天，中间有大量角色、决策点和交接——因此 Arca 为每位客户建了持久记忆，跟踪已发生事项、下一步、短期与长期跟踪项，以及每项动作的负责人。
- Claude is the primary model among frontier providers; Arca owns a custom harness that routes tasks by internal benchmarks, keeping the option to switch model providers and to improve the harness via a meta-agent that learns from advisor feedback and agent traces.
  > [zh] Claude 是其主要模型；Arca 自建 harness，按内部基准为任务选模型，既保留换模型厂商的空间，也用「元 Agent」从顾问反馈和 Agent 轨迹里改进 harness。
- Safety rails are deterministic: agents analyze and propose, but cannot move money; sandboxes are used for computation, and agent-written query code is rewritten into a strict format with guardrails before hitting the backend.
  > [zh] 安全护栏是确定性的：Agent 只做分析与提案，不能动钱；计算走沙箱，Agent 写出的查询代码会先被改写成严格格式并加上护栏，再触及后端。

## 金句

- "agents prompt people more than people prompt agents."
  > [zh] 「Agent 提醒人，比人去提示 Agent 更常见。」
- "It's very stop-start, there's many actors in between, many decision points, many handoffs,"
  > [zh] 「这是非常断续的：中间有很多参与者、很多决策点、很多交接。」
- "All of our safety restrictions are fully deterministic,"
  > [zh] 「我们所有的安全限制都是完全确定性的。」
