---
title: "对话蚂蚁灵波沈宇军：Fable 5.2 都能拧瓶盖了，机器人为什么还需要自己的模型？"
title_tr: "Ant Lingbo's Shen Yujun: if Fable 5.2 can unscrew a bottle cap, why do robots still need their own models?"
show: "Founder Park"
kind: "article"
guests: ["沈宇军"]
company: "蚂蚁灵波（Robbyant）"
date: "2026-11-15T17:15:44+08:00"
url: "https://www.163.com/dy/article/LBPS7RQK05566TJ2.html"
lang: "zh"
products: ["lingbot"]
tags: ["Research", "Industry"]
score: 5
summary: "Founder Park 对话蚂蚁灵波首席科学家沈宇军：通用大模型能演示拧瓶盖，并不等于它是最适合机器人的工具；具身仍需「刚刚好」的原生模型，端侧承担七到八成任务，行业大概还在 GPT-1 阶段，他判断未来一年内技术路线会迎来第一波小的收敛"
summary_tr: "Founder Park talks with Ant Lingbo chief scientist Shen Yujun: a general model unscrewing a bottle cap in a demo does not make it the right tool for robots; embodied AI still needs a 'just-right' native model that handles 70–80% of tasks on-device, the field is still around the GPT-1 stage, and he expects a first small convergence of technical routes within a year"
---
## 要点

- 沈宇军认为，不能说通用大模型「一定做不了」具身任务，真正的问题是成本：把触觉、深度灌进 Fable 再蒸馏，参数量可能还要翻一倍；与其花 1000 个亿做一台通吃的超级模型，不如花两个 100 亿分别做两个模型。
  > [en] Shen argues one cannot say general models will "definitely fail" at embodied tasks; the real issue is cost. Pouring tactile and depth data into Fable, then distilling, may require doubling the parameter count. He would rather spend two 10-billion budgets on two models than 100 billion on one super-model that covers both worlds.
- 现实里时间不会停：杯子一旦打滑，等通用模型推理完已经掉了。所以就算是 Fable 或 Astra，下面也得有一层「刚刚好」的机器人模型——触觉、深度和流式处理不能有短板（他们做了 LingBot-Depth、LingBot-Touch），端侧也不该把算力花在编程、文生图上。
  > [en] Time in the physical world does not stop: if a cup starts to slip, a general model that pauses to reason will be too late. Even Fable or Astra would still need a "just-right" robot-specific layer: no shortfalls in touch, depth, or streaming (hence LingBot-Depth and LingBot-Touch), and no on-device budget wasted on coding or image generation.
- 他把端侧模型比作 System 2 的 Draft Model：现实里 70% 到 80% 的任务可由端侧 Policy 直接执行，解决不了或更长程的才上云，端侧还需能在断网时独立工作。把自家模型当 Tool Call 给通用模型调用仍属实验，他觉得行业更需要先让 System 1 在真实世界里可用。
  > [en] He likens the on-device model to a Draft Model for System 2: 70–80% of real-world tasks can be handled by the on-device policy, with the cloud used only for failures or longer-horizon work. The on-device model must also keep working if the network drops. Using LingBot as a tool call from a general model is still an experiment; he says the industry first needs System 1 to work in the real world.
- 「具身原生」是从机器人作业需求正向做工具，而不是把 VLA 或世界模型当成终局。灵波定位为平台公司：大脑有可能通用，身体不太可能，因为不同场景对速度、负载、轮式或腿足的要求是冲突的。他们用跨平台传感器表征屏蔽差异，并跨多种机械臂采数据，让基座模型可以跨硬件使用。
  > [en] "Embodied-native" means building tools from robot job requirements, not treating VLA or world models as the end state. Lingbo positions itself as a platform company: the brain may become general-purpose, the body probably will not, because scenes conflict on speed, payload, and wheels vs. legs. They abstract away sensor differences with cross-platform representations and collect data across many arms, so the base model can run across hardware.
- 他把当前具身模型比作「GPT-1 阶段」，路线和数据标准都还没有共识；没找到正确的 Scale up 方式之前，谈 Scaling Law 是极大浪费。底座更替时更保值的是物理感知表征与工具链（他们开源了 LingBot-Touch）以及数据流转 Infra。他判断未来一年内，技术路线会迎来第一波小的收敛。
  > [en] He places today's embodied models at a "GPT-1 stage," with no consensus yet on routes or data standards; talking about scaling laws before finding the right way to scale up is a huge waste. What lasts through base-model turnover is physical-perception representations and toolchains (they open-sourced LingBot-Touch) plus data-moving infra. He expects a first small convergence of technical routes within a year.

## 金句

- 「我们到底是为了技术信仰，去花1000个亿做一个既能解决数字世界问题、又能解决具身问题的超级模型，还是花两个100亿，分别做两个模型？」
  > [en] “Are we spending 100 billion, out of technical faith, on a super-model that solves both the digital world and embodiment, or two 10-billion budgets on two separate models?”
- 「在现实场景里，70% 到 80% 的任务不用经过再往上一层的复杂推理了，端侧自己的 Policy 就能直接执行、直接解决」
  > [en] “In real scenes, 70% to 80% of tasks never need the layer of heavier reasoning above; the on-device policy can execute and solve them directly.”
- 「我自己的判断是：在未来一年内，具身智能的技术路线就会迎来第一波小的收敛。」
  > [en] “My own judgment is that within the next year, embodied-AI technical routes will see their first small wave of convergence.”
