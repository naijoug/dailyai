---
title: "The Missing Layer for Personal AI | First Person Labs’ Ken Liu"
title_tr: "个人 AI 缺失的一层：First Person Labs 的 Ken Liu 谈 Second"
show: "The a16z Show"
kind: "podcast"
guests: ["Ken Liu"]
company: "First Person Labs"
date: "2026-11-18T19:00:00+08:00"
url: "https://a16z.simplecast.com/episodes/the-missing-layer-for-personal-ai-first-person-labs-ken-liu-wu4i8Q00"
duration: "33:57"
lang: "en"
products: ["second"]
tags: ["Agents", "Products", "Security"]
score: 4
summary: "First Person Labs co-founder Ken Liu tells a16z’s Martin Casado and Joel de la Garza how Second builds a portable, user-owned model of you that any agent can consult, so agents stop re-learning who you are, and why that data needs a different security architecture"
summary_tr: "First Person Labs 联合创始人 Ken Liu 对话 a16z 的 Martin Casado 和 Joel de la Garza：Second 如何构建一个可携带、归用户所有的「个人模型」供任意 Agent 查询，让 Agent 不再一遍遍重新了解你，以及这类数据为何需要不同的安全架构"
---
## 要点

- Second is pitched as a personal context layer: rather than only storing memories, it models a person’s priorities, preferences, goals, values, commitments and intent, and puts that person in control. First Person Labs announced the product, now in early access as a Mac app, together with a $10M seed round led by a16z.
  > [zh] Second 的定位是个人上下文层：不只是存记忆，而是对一个人的优先级、偏好、目标、价值观、承诺和意图建模，并由本人掌控。First Person Labs 在发布产品（目前为 Mac 应用、提前体验阶段）的同时宣布了由 a16z 领投的 1000 万美元种子轮。
- In practice it acts as portable context: you tell GrokBot or Codex to consult “my Second,” and the two agents talk, so a request like “buy me a flight” already knows your seat, airport-arrival and class preferences instead of going through rounds of questions. Casado’s example: switching back to Codex after a while away, it can pick up the work and context he built elsewhere.
  > [zh] 实际用法是「可携带的上下文」：你让 GrokBot 或 Codex 去问「我的 Second」，两个 Agent 自己沟通，于是「帮我订张机票」这类请求已经知道你的座位、提前到机场多久和舱位偏好，不用再来回追问。Casado 举例说，隔了一阵子重新用 Codex，它也能接上他在别处做过的工作和积累的上下文。
- Liu sees the user model as a process: start from a baseline of artifacts (what you did, the people in your life, your preferences), keep analyzing in the background how you talk and present yourself, and over time move from portable context toward a representation of you, possibly partly trained into a model. His analogy is Alfred buying Batman a cheeseburger: the agent states the preference without revealing who it is for.
  > [zh] Ken Liu 把用户模型看作一个渐进过程：先从基础材料（你做过什么、生活中的人、你的偏好）起步，在后台持续分析你说话和表达自己的方式，逐步从可携带的上下文走向对你本人的表示，其中一部分可能训练进模型。他用阿尔弗雷德替蝙蝠侠买芝士汉堡打比方：Agent 只表达偏好，不暴露是替谁买的。
- Because something that sees everything you do triggers an immediate “whoa,” the security design is central: per a16z, Second’s background engine runs on your device by default, the model is inspectable and portable, you choose which intelligence powers it and which apps and agents can access it; Liu adds that if you don’t trust the company, you should be able to bring your own tokens and analyze the data locally on your laptop.
  > [zh] 一个能看到你所做一切的东西会让人本能地警惕，所以安全设计是核心：据 a16z 介绍，Second 的后台引擎默认在你的设备上运行，个人模型可查看、可迁移，由你选择用哪种模型驱动、允许哪些应用和 Agent 访问；Ken Liu 补充说，如果你不信任这家公司，也应该可以自带 token，在自己的笔记本上本地分析数据。
