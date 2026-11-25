---
title: "OpenClaw at one: its chief architect on a year of explosive growth, wooing the enterprise, and being Meta's muse"
title_tr: "OpenClaw 一周年：首席架构师谈爆发式增长的一年、进军企业市场，以及成为 Meta 的灵感来源"
show: "The New Stack"
kind: "article"
guests: ["Vincent Koc"]
company: "OpenClaw Foundation"
date: "2026-11-24T20:39:00+08:00"
url: "https://thenewstack.io/openclaw-vincent-koc-interview/"
lang: "en"
products: ["openclaw", "muse"]
tags: ["Agents", "Open Source", "Products"]
score: 4
summary: "On OpenClaw's first anniversary, chief architect Vincent Koc explains how the project moved into an independent foundation, why Microsoft and Nvidia build on it, how OpenClaw Enterprise and ClawScan target security, and why it won't simply become a Muse-style consumer product."
summary_tr: "在 OpenClaw 一周年之际，首席架构师 Vincent Koc 讲述项目如何转入独立基金会、微软和英伟达为何基于它做产品、OpenClaw Enterprise 与 ClawScan 如何应对安全问题，以及它为何不会简单变成 Muse 那样的消费级产品。"
---
## 要点

- The first commit came on Nov. 24, 2025 as Warelay, a WhatsApp relay; after the Clawd and Moltbot names it became OpenClaw in January. OpenAI hired Peter Steinberger in February and the project moved into an independent foundation in July, sponsored by OpenAI, GitHub and Nvidia, with maintainers from Microsoft, Tencent, Atlassian and others; Koc, who started as a security maintainer, is now chief architect.
  > [zh] 2025 年 11 月 24 日的第一次提交叫 Warelay，是个 WhatsApp 中继；先后叫过 Clawd 和 Moltbot，1 月定名 OpenClaw。2 月 OpenAI 聘用 Peter Steinberger，7 月项目转入独立基金会，由 OpenAI、GitHub、英伟达赞助，维护者来自微软、腾讯、Atlassian 等；最初做安全维护的 Koc 现任首席架构师。
- Big companies build on it: Microsoft's Scout (renamed Autopilot in September) is an always-on Microsoft 365 agent powered by OpenClaw and contributed policy-conformance checks upstream; Nvidia's NemoClaw adds security and policy controls via OpenShell. Meta's Nat Friedman said Muse was built "from scratch" but "heavily inspired as a product by openclaw," down to the same workspace file names.
  > [zh] 大公司纷纷基于它构建：微软的 Scout（9 月更名 Autopilot）是基于 OpenClaw 的 Microsoft 365 常驻 Agent，并向上游贡献了策略合规检查；英伟达的 NemoClaw 通过 OpenShell 加上安全与策略控制。Meta 的 Nat Friedman 说 Muse 是「从零开发」的，但「作为产品深受 OpenClaw 启发」，连工作区文件名都一样。
- For enterprises, OpenClaw Enterprise (open source, self-hostable, still pre-1.0 for internal pilots) adds a control plane with multi-tenancy, permissions and audit. A skill-scanning study across tens of thousands of public skill versions found only 0.69% flagged by all three scanners (VirusTotal, OpenClaw's static analysis, Nvidia's SkillSpector) and 81.9% of flagged skills caught by just one, which led to ClawScan.
  > [zh] 面向企业，OpenClaw Enterprise（开源、可自托管，仍处 1.0 前的内部试点阶段）加入多租户、权限和审计的控制平面。一项覆盖数万个公开 Skill 版本的扫描研究发现，只有 0.69% 被三种扫描器（VirusTotal、OpenClaw 静态分析、英伟达 SkillSpector）同时标记，81.9% 的问题 Skill 只被其中一种发现，由此诞生了 ClawScan。
- OpenClaw 2.0 (end of August) focused on removing friction, followed by native installers and simpler onboarding; OpenClaw Multiplayer lets several people steer the same agent with shared context, and about 50 people at the Foundation already work in one shared environment. Koc says it is used by Fortune 100 companies and governments, and frames it as a different proposition from Muse: Meta can hide infrastructure from users, while OpenClaw tries to get easier while keeping users' choice of where it runs and which models it uses.
  > [zh] 8 月底的 OpenClaw 2.0 重点是降低使用门槛，之后又推出原生安装包和更简单的上手流程；OpenClaw Multiplayer 让多人共享上下文、共同指挥同一个 Agent，基金会约 50 人已在同一个共享环境里工作。Koc 说它已被财富 100 强企业和政府使用，并认为它和 Muse 是不同的定位：Meta 可以替用户托管底层设施，OpenClaw 则在变简单的同时保留用户选择运行位置和模型的自由。

## 金句

- “From our perspective, I think it’s nice that the hype has died down, the spotlight’s off of us, and we can get focused on actually building a good product without everyone having ‘lobster fever’.”
  > [zh] 「在我们看来，热度退了、聚光灯移开了挺好，我们可以专心把产品真正做好，不用大家都在发『龙虾热』。」
- “There’s not one way to make everything absolutely safe and secure,”
  > [zh] 「没有哪一种办法能让一切绝对安全。」
