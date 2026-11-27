---
title: "How Clay Builds GTM Agents — Jeff Barg, Head of AI"
title_tr: "Clay 如何构建 GTM Agent——AI 负责人 Jeff Barg"
show: "Latent Space"
kind: "podcast"
guests: ["Jeff Barg"]
company: "Clay"
date: "2026-11-27T06:44:44+08:00"
url: "https://latent.space/p/how-clay-builds-gtm-agents-jeff-barg-head-of-ai/"
duration: "1:12:23"
lang: "en"
products: ["clay"]
tags: ["Agents", "Products", "Industry"]
score: 4
summary: "Clay's Head of AI Jeff Barg explains why usage is already close to 50/50 between Clay's own agent and outside harnesses like Claude Code, how Sculptor was rebuilt as a coding agent on Pi, why customers hate the model selector, and why agents still can't debug other agents."
summary_tr: "Clay 的 AI 负责人 Jeff Barg 讲述：为什么 Clay 自家 agent 与 Claude Code 等外部 harness 的使用量已接近五五开，Sculptor 如何在 Pi 上重建为编程 agent，客户为何讨厌模型选择器，以及 agent 为什么还调试不了 agent。"
---
## 要点

- Clay's first agent, Sculptor (September 2025), was a tool loop with a heavily tuned system prompt: great at adding columns, terrible at booking ten qualified meetings, and its LLM-judged evals missed how people really used it. Clay rebuilt it as a coding agent on the Pi harness that runs the Clay CLI in a cloud sandbox, with a new Audiences data layer that matches records across the CRM and Gong.
  > [zh] Clay 的第一个 agent Sculptor（2025 年 9 月）是带精调系统提示词的工具循环：加列很强，要它约到十个合格会议却很差，而用 LLM 打分的评测也没覆盖用户的真实用法。Clay 把它重建为基于 Pi harness 的编程 agent，在云端沙箱里运行 Clay CLI，并新增 Audiences 数据层，把 CRM 和 Gong 里的记录对齐。
- Usage is already close to 50/50 between Clay's own agent and outside harnesses. The push came from inside: Clay's GTM team lived in Cursor and asked for a CLI, the MCP team switched to build it, and sales now does deal prep in Codex; Clay plans a sandboxed agent free to use all its tools so results match whether you use Clay's agent or Claude Code.
  > [zh] Clay 自家 agent 与外部 harness 的使用量已接近五五开。推动力来自内部：Clay 的 GTM 团队离不开 Cursor、要一个 CLI，MCP 团队转去做了它，销售团队现在用 Codex 准备谈单；Clay 计划推出可自由调用全部工具的沙箱 agent，让用 Clay 自家 agent 和用 Claude Code 的效果大致相同。
- Qualification is close to solved: by Jeff's napkin math, scoring all ~40 million companies in Clay's database against an ideal customer profile with a classifier like TypeSafe's Jev would cost about $1,500. He puts a good enrichment budget at $1–10 per qualified lead and $10–100 per booked call, and sees frontier models' value in deep research and orchestration.
  > [zh] 线索资质判断已接近解决：按 Jeff 的粗算，用 TypeSafe 的 Jev 这类分类模型，把 Clay 数据库里约 4000 万家公司全部按理想客户画像打分，只需约 1500 美元。他认为合理的数据补全预算是每个合格线索 1–10 美元、每个约成的通话 10–100 美元，前沿模型的价值在深度调研和编排上。
- Clay is about to ship an automatic model router because customers hate picking models, but keeps the selector for agencies and power users. Its agent stack is home-built on BullMQ rather than Temporal or LangGraph, with throttling and pause/resume for provider outages; most companies post-train too early, and Jeff puts the inference-spend threshold for it at $10M–$100M.
  > [zh] 由于客户讨厌自己挑模型，Clay 即将上线自动模型路由，但为代理商和重度用户保留选择器。它的 agent 栈基于 BullMQ 自建，没用 Temporal 或 LangGraph，并做了限流以及在模型服务商故障时暂停/恢复；他认为多数公司做后训练太早，推理开销到 1000 万到 1 亿美元才值得。
- What Jeff wants most is a model that can read a long agent trace and find where the run went wrong; today's models flag whichever step took longest, so Clay still writes many skills by hand. Yet asking the agent how many YC companies use Clay now takes about a minute.
  > [zh] Jeff 最想要的是能读懂长 agent 轨迹、找出哪一步出错的模型；现在的模型只会指出耗时最长的那步，所以 Clay 很多 skill 仍靠手写。不过现在问 agent「有多少 YC 公司在用 Clay」大约一分钟就有答案。

## 金句

- 「our users hate our model selector.」
  > [zh] “我们的用户讨厌我们的模型选择器。”
- 「it's much closer to fifty fifty than I would have thought.」
  > [zh] “（自家 agent 和外部 harness 的占比）比我想象的更接近五五开。”
- 「I don't know if we'll survive another 10 x on BullMQ」
  > [zh] “我不知道再涨 10 倍，我们在 BullMQ 上还能不能撑住。”
