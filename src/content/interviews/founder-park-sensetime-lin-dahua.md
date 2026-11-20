---
title: "商汤林达华：拿 20% 资源做没有产品的研究，商汤如何押注模型竞争？"
title_tr: "SenseTime's Lin Dahua: spending 20% of resources on research with no product attached, and how SenseTime bets on the model race"
show: "Founder Park"
kind: "article"
guests: ["林达华"]
company: "商汤科技"
date: "2026-11-19T22:01:10+08:00"
url: "https://www.163.com/dy/article/LC4M5BRL05566TJ2.html"
lang: "zh"
products: ["seko", "sensetime-raccoon"]
tags: ["Models", "Agents", "Industry", "Chinese Community"]
score: 4
summary: "商汤联合创始人、首席科学家林达华复盘两轮 AI 周期的取舍：选几百 B 而非 2 万亿参数、放弃通用聊天转向办公（小浣熊）和视频创作（Seko），Agentic 长轨迹一条已要几千元、蒸馏时代已过，并仍留 20% 资源做没有产品出口的预研"
summary_tr: "SenseTime co-founder and chief scientist Lin Dahua reviews the trade-offs across two AI cycles: models of a few hundred billion parameters rather than 2 trillion, dropping general chat for office work (Raccoon) and video creation (Seko), agentic training trajectories now costing thousands of yuan each so the distillation era is over, and 20% of resources still reserved for research with no product outlet"
---
## 要点

- 训练成本降不下来，不是因为模型不够好，而是「你不继续训下一个，别人就会超过你」。他认为成本、通用性、专业性构成不可能三角：很多日常工作 8B、32B 模型就能做好，牺牲部分通用性换低成本的模型会有长期空间。商汤内部讨论过 2 万亿参数，最终选了迭代效率更高的几百 B 体量。
  > [en] Training costs don't come down not because models are bad but because "if you don't train the next one, someone else will overtake you." He sees an impossible triangle of cost, generality and specialization: many everyday jobs are handled well by 8B or 32B models, so cheaper models that trade away some generality have lasting room. SenseTime debated a 2-trillion-parameter model internally and chose a few hundred billion parameters for faster iteration.
- 2023 年底判断通用聊天不是战略重点（缺搜索和本地生活数据），转向「内容与交互」：办公方向做小浣熊，视频创作做 Seko。Seedance 2.0 发布后一度迷茫，后来把 Seedance 等模型只当「视频 generator」，Seko 专注剧本、分镜、人物一致性等完整创作流程，今年用户增长 7 到 8 倍并开始赚钱。
  > [en] At the end of 2023 SenseTime decided general chat wasn't a priority (it lacked search and local-services data) and moved to "content and interaction": Raccoon for office work and Seko for video creation. After Seedance 2.0 launched the team was briefly lost, then decided to treat Seedance and other models merely as "video generators" while Seko owns the full creative process (scripts, storyboards, consistent characters across episodes); Seko users grew 7–8x this year and it now makes real money.
- 对办公 AI：不和大厂拼流量，处理文书、写 PPT 只是浅层工具价值；关键是以最终价值为依归形成闭环，让「认知成长的速度比基模能力成长的速度更快」。
  > [en] On office AI: SenseTime won't fight big platforms for traffic; drafting documents and slides is shallow tool value, and the key is a closed loop around end value so that "your understanding grows faster than base-model capability."
- 关于蒸馏：训练 Agentic 模型需要几十万到几百万 token 的长轨迹，只能借助多个模型（国外、国内、自家）组合构造；复杂任务一条轨迹的成本已到几千元，「相当于请一位律师工作两个小时」。他认为蒸馏时代已经过去，下一步瓶颈是构造成千上万个真实工作环境让模型自己探索，而瓶颈在人力不在算力，中国工程师资源是潜在优势。
  > [en] On distillation: agentic models need trajectories of hundreds of thousands to millions of tokens, built with a mix of foreign, domestic and in-house models; one long trajectory for a complex task now costs thousands of yuan, "like hiring a lawyer for two hours." He says the distillation era is over; the next bottleneck is building thousands of real work environments for models to explore, limited by people rather than compute, where China's engineering workforce could be an edge.
- 跟在美国后面「拼手速」没有复利：开源加速了技术流通（训出最终模型只占研发成本约 1/10），但长期竞争力要靠在一条路上扎得够深。商汤仍保留 20% 资源做没有产品出口的预研，比如空间智能，并在其中撞见「反 Scaling Law」：缺少空间联系的数据越加，模型越依赖语义先验、表现越差。
  > [en] Racing to copy the US "on hand speed" doesn't compound: open source speeds diffusion (the final training run is only about a tenth of R&D cost), but lasting advantage comes from going deep on one path. SenseTime still keeps 20% of resources for research with no product outlet, such as spatial intelligence, where it hit an "anti-scaling law": adding data without spatial grounding makes models lean harder on semantic priors and perform worse.

## 金句

- 「所有事情都需要有闭环，才能有效地迭代，否则只有刷榜，是很危险的。」
  > [en] "Everything needs a closed loop to iterate effectively; otherwise all you have is leaderboard-chasing, which is very dangerous."
- 「说实话，我觉得已经过了所谓蒸馏的时代。」
  > [en] "Honestly, I think the so-called era of distillation is over."
- 「创作要比生成大得多，空间也大得多。」
  > [en] "Creation is much bigger than generation, with far more room."
