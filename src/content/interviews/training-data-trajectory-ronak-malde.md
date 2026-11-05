---
title: "Bringing Continual Learning to Every Company: Trajectory’s Ronak Malde"
title_tr: "把持续学习带给每家公司：Trajectory 联合创始人 Ronak Malde"
show: "Training Data"
kind: "podcast"
guests: ["Ronak Malde"]
company: "Trajectory"
date: "2026-11-05T18:00:00+08:00"
url: "https://podcasts.apple.com/us/podcast/bringing-continual-learning-to-every-company-trajectorys/id1750736528?i=1000800025483"
duration: "32:00"
lang: "en"
products: ["trajectory"]
tags: ["Agents", "Research", "Products"]
score: 5
summary: "Trajectory co-founder Ronak Malde on closing the continual-learning loop for production agents—Group Size-1 GRPO, meta-graders, and why product builders become gardeners"
summary_tr: "Trajectory 联合创始人 Ronak Malde 谈为生产环境 Agent 闭合持续学习环：Group Size-1 GRPO、元评分器，以及产品人何以变成「园丁」"
---
## 要点

- Malde argues today’s agents are stuck in “pseudo continual learning”: smart, but only updated in offline batches—like a paper road map you can’t reroute mid-trip—and that closing the live loop is the next learning paradigm.
  > [zh] Malde 认为今天的 Agent 仍停在「伪持续学习」：够聪明，却只能离线批量更新，像一张无法中途改道的纸质地图；把在线闭环打通才是下一范式。
- Training your own model used to need a research team, months of work and huge compute; Trajectory aims to make it a few clicks, jointly improving model weights, harness and prompts from real product usage.
  > [zh] 过去自训模型要一支研究团队、数月工作和海量算力；Trajectory 想把它变成几次点击，从真实用量里同时改进权重、harness 和提示词。
- Two research bets: a Group Size-1 GRPO variant that learns from single real-world rollouts (no simulated env of 16 replays), and a meta-grader that can propagate ~100 representative traces across ~10,000.
  > [zh] 两项研究赌注：Group Size-1 版 GRPO，从单次真实 rollout 学习（不必再做 16 次仿真回放）；以及能把约 100 条代表性轨迹推广到约 1 万条的元评分器。
- Show notes cite Harvey training a model six times cheaper than frontier, lifting an open-source baseline from 4% to 18% on its own legal benchmark; Malde distinguishes continual learning (humans stay in the loop) from recursive self-improvement.
  > [zh] Show notes 提到 Harvey 用约六分之一前沿成本训出模型，把开源基线在自家法律基准上从 4% 拉到 18%；Malde 区分持续学习（人仍在环内）与递归自我改进。
- He predicts product builders become gardeners—setting trellises for products that keep growing on their own.
  > [zh] 他预测产品人会变成园丁：搭好架子，让产品自己继续生长。
