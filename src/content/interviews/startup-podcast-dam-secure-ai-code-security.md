---
title: "Securing code when the bad guys have AI, with Patrick Collins and Simon Harloff"
title_tr: "当攻击者也有 AI：Dam Secure 的 Patrick Collins 和 Simon Harloff 谈代码安全"
show: "The Startup Podcast"
kind: "podcast"
guests: ["Patrick Collins", "Simon Harloff"]
company: "Dam Secure"
date: "2026-11-11T17:50:15+08:00"
url: "https://podcasts.apple.com/us/podcast/securing-code-when-the-bad-guys-have-ai-with/id1612757016?i=1000801184810"
duration: "49:24"
lang: "en"
products: ["dam-secure", "deepseek"]
tags: ["Security", "Agents", "Dev Tools"]
score: 4
summary: "Dam Secure's founders on why open-weight models are essential for code security, typed languages for agent-built code, always-on red teaming and PR gating in automated software pipelines"
summary_tr: "Dam Secure 两位创始人谈为什么开放权重模型是代码安全的必需品、Agent 写的代码为何要用强类型语言、常态化红队测试，以及自动化软件流水线里的 PR 门禁"
---
## 要点

- Frontier models that refuse to help you hack your own software can leave you less safe; open-weight models like DeepSeek will comply with exploit-finding requests, which makes them essential for defense even as they raise attacker capability.
  > [zh] 拒绝帮你攻击自家软件的前沿模型反而可能让你更不安全；DeepSeek 等开放权重模型会配合找漏洞利用，因此对防守方必不可少，尽管它们同样提升了攻击者的能力。
- On Dam Secure's benchmark of 80 repositories, DeepSeek Flash V4.1 outperforms GPT-6 at roughly one-tenth the cost, though it produces more false positives that need a verification step to filter.
  > [zh] 在 Dam Secure 覆盖 80 个仓库的评测里，DeepSeek Flash V4.1 以约十分之一的成本胜过 GPT-6，但误报更多，需要加一道验证来过滤。
- Moving from JavaScript or PHP to TypeScript or any typed language improves both LLM reasoning and security posture; teams now auto-migrate codebases with agents running 40–100 hours unattended.
  > [zh] 从 JavaScript 或 PHP 换到 TypeScript 等强类型语言，能同时提升模型推理质量和安全性；有团队已经让 Agent 无人值守连续跑 40–100 小时自动迁移代码库。
- Annual pen tests no longer match the threat model: they recommend always-on automated red teaming and a chained "security factory" of linting guardrails during implementation, security review at PR time and active exploitation attempts against findings.
  > [zh] 一年一次的渗透测试已经跟不上威胁：他们建议常态化的自动红队测试，把实现阶段的 lint 护栏、PR 阶段的安全审查和针对发现的主动利用尝试串成一条「安全工厂」。
- PR gating is now accepted because it blocks agents rather than humans, and auto-approval of low-risk PRs is emerging, but auditors still want human batch review every one to two weeks; output from tools like Lovable or Base44 should be treated as a prototype until a skilled engineer reviews it.
  > [zh] PR 门禁如今被接受，因为它拦的是 Agent 而不是人，低风险 PR 自动批准也开始出现，但审计方仍要求每一到两周人工批量复核；Lovable、Base44 等工具产出的代码在资深工程师审查前只能当原型。
