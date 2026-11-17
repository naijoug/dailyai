---
title: "Software engineering after code becomes cheap with Satya Nadella"
title_tr: "Satya Nadella：代码变便宜之后的软件工程"
show: "The Pragmatic Engineer"
kind: "podcast"
guests: ["Satya Nadella"]
company: "Microsoft"
date: "2026-11-16T21:33:48+08:00"
url: "https://newsletter.pragmaticengineer.com/p/software-engineering-after-code-becomes"
duration: "1:02:40"
lang: "en"
products: ["github-copilot"]
tags: ["Dev Tools", "Agents", "Industry"]
score: 5
summary: "Gergely Orosz asks Microsoft CEO Satya Nadella how software engineering changes when generating code is cheap and verifying it is hard: why Copilot fell behind Claude Code, software factories, owning your AI stack, hybrid local+cloud models and junior hiring"
summary_tr: "Gergely Orosz 对话微软 CEO Satya Nadella：生成代码变便宜、验证变难之后软件工程怎么变——Copilot 为何被 Claude Code 赶超、软件工厂、掌控自己的 AI 栈、本地加云端的混合智能，以及初级岗位招聘"
---
## 要点

- Satya admits GitHub Copilot fell behind because Claude Code moved coding from the IDE to the command line and the IDE “faded away” within about six months; his lesson is that a non-linear model jump can change a product’s form factor fast.
  > [zh] Satya 承认 GitHub Copilot 之所以落后，是因为 Claude Code 把编程从 IDE 搬到了命令行，IDE 在约半年内就「淡出」了；他的教训是，模型一旦出现非线性跃升，产品形态可能很快改变。
- Code generation is cheap but verification is still hard: model critiques can game goals (e.g. deleting failing tests), and he expects more verification loops built on production traces, which again depend on models verifying fixes.
  > [zh] 生成代码已经很便宜，验证依然困难：让模型互评可能投机取巧（比如删掉失败的测试）；他预计会出现更多基于生产环境 trace 的验证闭环，但这又回到了模型能否验证修复的问题。
- “Own the intelligence”: keep harness, memory and model decoupled to avoid lock-in, consider open models to protect core IP, build private evals, and treat agents as an “insider risk” with a separate system to verify they behave as expected.
  > [zh] 「掌控智能」：把 harness、记忆和模型解耦以免被单一厂商锁定，考虑用开放模型保护核心知识产权，建立私有评测，并把 Agent 当作「内部风险」，用独立系统验证其行为是否符合预期。
- Microsoft is betting on “hybrid intelligence”: last year’s frontier-level models already run on laptops, so a router would choose between cheap, unmetered local models and expensive cloud ones, supported by its MAI models and Surface hardware.
  > [zh] 微软押注「混合智能」：去年的前沿级模型已能在笔记本上运行，由路由器在便宜、不计量的本地模型和昂贵的云端模型之间选择，背后是 MAI 模型和 Surface 硬件。
- Many Microsoft teams are building their own “software factories”; he attributes the junior hiring slowdown to teams reorganizing roles and token budgets, expects hiring to recover, and describes a PRAISE preceptorship program with CMU for AI-accelerated engineering.
  > [zh] 微软很多团队在搭自己的「软件工厂」；他把初级岗位招聘放缓归因于团队在重新调整角色和 token 预算，预计之后会恢复，并介绍了与卡内基梅隆大学合作的 PRAISE 带教计划，培养 AI 加速下的工程能力。

## 金句

- 「These decision models are kind of like Excel macros.」
  > [zh] 「这些决策模型有点像 Excel 宏。」
- 「Decision models are like the stored procedure of the intelligence era.」
  > [zh] 「决策模型就像智能时代的存储过程。」
- 「If I could change the ratio of my “talk” to “do,” I would. This is the time.」
  > [zh] 「如果能改变我『说』和『做』的比例，我会去改。现在正是时候。」
