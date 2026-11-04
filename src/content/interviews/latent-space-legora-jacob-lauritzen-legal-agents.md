---
title: "Building Legal Agents When You Can't See the Data - Jacob Lauritzen, CTO of Legora"
title_tr: "看不到数据时如何构建法律 Agent：Legora CTO Jacob Lauritzen"
show: "Latent Space"
kind: "podcast"
guests: ["Jacob Lauritzen"]
company: "Legora"
date: "2026-11-03T04:50:00+08:00"
url: "https://latent.space/p/building-ai-for-lawyers-jacob-lauritzen-cto-of-legora/"
duration: "1:07:21"
lang: "en"
products: ["legora"]
tags: ["Agents", "Industry"]
score: 5
summary: "Legora CTO Jacob Lauritzen on evaluating legal agents without reading any customer traces, million-cell Tabular Review, legal vs forward deployed engineers, and cracks in the billable hour"
summary_tr: "Legora CTO Jacob Lauritzen 谈不读任何客户轨迹如何评测法律 Agent、百万单元格的 Tabular Review、法律工程师与 FDE 的分工，以及按小时计费模式的松动"
---
## 要点

- Legora passed $100M ARR in April, less than 18 months after launch, has 1,800+ customers, and raised $550M in March ($5.55B valuation) and another $550M in October ($8.8B); Wexler was its fifth acquisition this year.
  > [zh] Legora 上线不到 18 个月，4 月 ARR 突破 1 亿美元，客户超 1,800 家；3 月以 55.5 亿美元估值融资 5.5 亿，10 月再以 88 亿估值融资 5.5 亿；Wexler 是其今年第五笔收购。
- Because almost everything users upload is confidential client data, Legora cannot read any traces; three engineers and three lawyers build RL environments that recreate customer work (e.g. a 10,000-file data room for due diligence), plotting results on a heat map by practice area and task, and production failures are sorted into 10–20 known modes with cheap LLM checks behind feature flags.
  > [zh] 用户上传的几乎都是客户机密，Legora 读不到任何轨迹；三名工程师和三名律师搭建 RL 环境复现客户工作（如 1 万个文件的尽调数据室），按业务领域和任务画热力图；线上失败归入 10–20 种已知模式，用功能开关后的低成本 LLM 检查兜底。
- Jacob estimates models already handle about 60% of legal work really well, so for those tasks it is now a cost and latency problem; complex analysis across million-token contracts still needs more intelligence. Legora post-trains open-weight models for narrow tasks but has no plans for its own frontier model, and finds Fable and Opus too verbose for drafting while Astra is more concise.
  > [zh] 他估计模型已能很好地处理约 60% 的法律工作，这部分如今是成本和延迟问题；跨百万 token 合同的复杂分析仍需更强智能。Legora 会为窄任务后训练开源权重模型，但不打算自研前沿模型；起草时他觉得 Fable 和 Opus 太啰嗦，Astra 更简洁。
- The product is built on a few primitives—projects, the agent, Tabular Review (each row a document, each column a question, up to a million cells, starting with 10 rows) and Notion-style lists with triggers; legal engineers configure products without code while forward deployed engineers ship integrations and push learnings back into the core.
  > [zh] 产品建立在几个基础构件上：项目、Agent、Tabular Review（每行一份文件、每列一个问题，最多百万单元格，先从 10 行起步）以及带触发器的 Notion 式列表；法律工程师无代码配置产品，前置部署工程师写集成并把经验回灌核心产品。
