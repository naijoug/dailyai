---
title: "Software factories and code reviews with Harjot Gill"
title_tr: "Harjot Gill：软件工厂与代码审查"
show: "The Pragmatic Engineer"
kind: "podcast"
guests: ["Harjot Gill"]
company: "CodeRabbit"
date: "2026-11-19T02:08:00+08:00"
url: "https://newsletter.pragmaticengineer.com/p/software-factories-and-code-reviews"
duration: "1:26:37"
lang: "en"
products: ["coderabbit"]
tags: ["Dev Tools", "Agents", "Industry"]
score: 4
summary: "CodeRabbit CEO Harjot Gill on shipping 5,000+ agent-written PRs a month at a personal AI spend of about $250K a month, why he thinks human code review of individual PRs is dying, and the verification layers that let agents check their own work"
summary_tr: "CodeRabbit CEO Harjot Gill 谈每月用 Agent 提交 5000 多个 PR、个人 AI 花费约每月 25 万美元，为什么他认为逐个 PR 的人工代码审查正在消亡，以及让 Agent 自我验证的几层机制"
---
## 要点

- Much of his 5,000+ PRs last month was “janitorial” work run by agents (CI, flaky tests, caching), often kicked off on his commute or at night; bigger builds include a Rust write-ahead log on object storage that an agent worked on for six weeks and is now in production, a weekend migration of all services to Bun, and a new CI system.
  > [zh] 他上个月 5000 多个 PR 里，很大一部分是交给 Agent 的「保洁」工作（CI、不稳定测试、缓存），常在通勤路上或夜里发起；更大的项目包括一个基于对象存储、用 Rust 写的预写日志（Agent 跑了六周，已上线生产）、一个周末把所有服务迁到 Bun，以及一套新的 CI 系统。
- CodeRabbit spends millions a month on AI with about 40 engineers; Harjot puts a PR at roughly $150 on a personal $250–275K monthly spend, and says a $13M/year CI quote pushed them to build their own with agents in a week at about half the cost. Gergely notes this is an outlier versus the $200–2,000 per dev per month he usually hears.
  > [zh] CodeRabbit 约 40 名工程师，每月 AI 花费数百万美元；Harjot 个人每月花 25–27.5 万美元，折合每个 PR 约 150 美元。他说有供应商报出每年 1300 万美元的 CI 方案，于是他们用 Agent 一周自建了一套，成本约为报价一半。Gergely 指出这是特例，他通常听到的是每位开发者每月 200–2000 美元。
- Agents need to “hill climb” on ways to verify their own work: formal models (TLA+ caught race conditions code review missed; Lean experiments), deterministic local simulations that fuzz interleavings, emulated cloud APIs, real dev environments, and staged production rollouts watched by an agent.
  > [zh] Agent 需要能靠自我验证「爬坡」：形式化模型（TLA+ 找出过代码审查漏掉的竞态，也在试 Lean）、对并发交错做模糊测试的确定性本地仿真、模拟的云 API、真实的开发环境，以及由 Agent 盯着指标的分阶段生产发布。
- He expects humans to stop reviewing agent-written code line by line and review plans and releases instead; engineers on a “review exempt list” can ship without review, but each outage traced to them is a strike, and enough strikes put their releases back under review.
  > [zh] 他认为人类会不再逐行审查 Agent 写的代码，转而审查计划和整次发布；在「免审名单」上的工程师可以不经审查直接上线，但每次被追溯到的事故记一次「警告」，攒够了就要恢复同事审查。
- CodeRabbit stopped fine-tuning its review models because frontier models move too fast; in hiring he looks for agency, breadth and systems thinking, even inviting people with 1,000+ non-slop PRs in 30 days or 500+ hours of strategy games like Factorio, which he compares to running dozens of agents.
  > [zh] 由于前沿模型进步太快，CodeRabbit 已停止微调自家的审查模型；招聘时他看重主动性、广度和系统思维，甚至在招聘启事里邀请过去 30 天提交过 1000 多个非垃圾 PR、或玩过 500 小时以上《异星工厂》这类策略游戏的人，他觉得同时调度几十个 Agent 就像玩策略游戏。

## 金句

- 「I shipped roughly 3000 PRs in a month (similar ballpark as @poteto ) and my spend is roughly ~$200K a month in tokens.」
  > [zh] 「我一个月提交了大约 3000 个 PR（和 @poteto 差不多一个量级），token 花费大约每月 20 万美元。」
