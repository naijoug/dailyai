---
title: "20 亿美元年化收入，硅谷头部数商 Mercor：模型能自己造数据了，但评测还得靠人"
title_tr: "Mercor, Silicon Valley's $2B-run-rate data vendor: models can make their own data, but evals still need people"
show: "Founder Park"
kind: "article"
guests: ["Brendan Foody"]
company: "Mercor"
date: "2026-11-10T22:05:00+08:00"
url: "https://www.163.com/dy/article/LBDGR75E05566TJ2.html"
lang: "zh"
products: ["mercor"]
tags: ["Industry", "Research"]
score: 4
summary: "Founder Park 编译 Mercor CEO Brendan Foody 在 South Park Commons 的对谈：模型差异几乎全来自数据，训练数据会越来越多是合成的，但评测仍要靠人，公开评测是应用公司制衡模型厂的杠杆"
summary_tr: "Founder Park's compiled translation of Mercor CEO Brendan Foody at South Park Commons: model differences come almost entirely from data, training data will be increasingly synthetic but evals still need humans, and public evals are app companies' leverage over labs"
---
## 要点

- Mercor 约 24 个月里年化收入从 100 万美元涨到超过 20 亿美元，拥有 500 万人的专家网络，每天发放 600 万美元报酬，是多数前沿实验室和 Harvey、Sierra、Cognition、Cursor 等应用公司的数据供应商。
  > [en] Mercor's run-rate revenue went from $1M to over $2B in about 24 months; its 5-million-person expert network is paid $6M a day, and it supplies data to most frontier labs and apps like Harvey, Sierra, Cognition and Cursor.
- Brendan 现在认为模型之间的差异「差不多 100%」来自数据；Mercor 一半以上的工作已经是建评测，而不只是生产训练数据，因为只要有清楚的评测，强化学习很快就能把它刷满。
  > [en] Brendan now puts the share of model differences explained by data at "almost 100%"; more than half of Mercor's work is now building evals rather than just training data, because once a clear eval exists, RL saturates it fast.
- 判断数据价值看三点：贴近真实经济活动、模型通过率低（发布时低于 10%–25% 的任务保质期更长）、有好的验证方式；带反馈闭环的 RL 任务比静态记录有价值得多，企业的 Slack 聊天记录和内部文档本身教不会模型干活。
  > [en] He values data on three axes: realism, low model pass rates (tasks launched under 10–25% last longer), and good verification; RL tasks with feedback loops are worth orders of magnitude more than static records, and a company's Slack logs and docs alone can't teach a model to do the work.
- 做验证器最难的是控制误报和漏报：代码有单元测试也会出现 Reward Hacking，比如把代码库删光重写来通过测试；跑十几条轨迹看不出问题，跑几百条才会暴露。
  > [en] The hardest part of verifiers is false positives and negatives: even code with unit tests sees reward hacking, like deleting the codebase and rewriting it to pass; problems that don't show in a dozen trajectories appear after hundreds.
- 应用公司愿意出钱做公开评测，是为了把前沿模型商品化、降低单一模型的控制力；Mercor 自己也在做后训练，由 LoRA 第一作者 Edward Hu 带队，并认为定制化后训练正在成为真正的市场，下一块更难的数据市场在物理世界。
  > [en] App companies fund public evals to commoditize frontier models and reduce any single lab's leverage; Mercor itself now does post-training under LoRA first author Edward Hu, sees custom post-training becoming a real market, and expects the next, harder data market to be the physical world.

## 金句

- 「只要大家用的算法是一样的，最终训出来的模型就是所投入数据的直接映射。」
  > [en] “As long as everyone uses the same algorithms, the model you end up with is a direct reflection of the data you put in.”
- 「未来很大一部分用于训练的数据会是合成的，但用于评测的数据绝对需要由人类来创造。」
  > [en] “Much of the training data in the future will be synthetic, but evaluation data absolutely has to be created by humans.”
- 「你只需要花 100 万美元就能造出一个公开评测，各大前沿实验室会砸下几亿美元去帮你刷这个榜。」
  > [en] “You only need to spend $1 million to build a public eval, and the frontier labs will pour hundreds of millions into climbing it for you.”
