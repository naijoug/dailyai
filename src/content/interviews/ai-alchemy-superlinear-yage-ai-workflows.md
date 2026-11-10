---
title: "啊？？？用 AI 替自己看小姐姐跳舞？？？｜对谈超线性学院鸭哥"
title_tr: "Wait, using AI to watch livestream dancers for you? A conversation with Superlinear Academy's Yage"
show: "AI炼金术"
kind: "podcast"
guests: ["鸭哥"]
company: "Superlinear Academy（超线性学院）"
date: "2026-11-10T12:39:00+08:00"
url: "https://www.ximalaya.com/sound/1031626765"
duration: "1:16:20"
lang: "zh"
products: ["opencode"]
tags: ["Agents", "Dev Tools", "Chinese Community"]
score: 4
summary: "20 年 AI 研发老兵鸭哥分享多 Agent 协作、硬件闭环、文风微调和“只管验收与拍板”的 AI 工作法，以及 AI 用得太好在职场的副作用"
summary_tr: "AI veteran Yage on multi-agent coordination, closed-loop hardware work, style fine-tuning and a 'I only own acceptance and key decisions' workflow — plus the career side effects of being too good with AI"
---
## 要点

- 做硬件先让 AI 写模拟器：用电脑指令触发原本靠物理按键的逻辑、再读 log 判断对错，让 AI 自己闭环，他车库门 ESP32 上的神经网络就是这样做出来的，人只做最后验收。
  > [en] For hardware, first have the AI write a simulator: trigger button-driven logic from the computer and read the logs, so the AI closes the loop itself — that's how the neural net on his garage-door ESP32 was built, with him only doing final acceptance.
- 同时开多个 AI 不乱：给 AI 一个 Skill，教它找到另一个会话并发消息协调，能并行的并行、不能的排队；他把这个 OpenCode 会话互发消息的 Skill 和手机端 OpenCode 客户端都开源了。
  > [en] Running many AIs without chaos: a Skill teaches the AI to find another session and message it to coordinate, parallelizing what it can and queueing the rest; he open-sourced this OpenCode agent-to-agent Skill and mobile OpenCode clients.
- 提示词去不掉 AI 味，就用几百篇旧文在一张 5090 上微调通义千问一两个小时；造数据的办法是先让 AI 把原文改写成 AI 腔，训练时输入 AI 文、输出原文。
  > [en] When prompts couldn't remove the AI tone, he fine-tuned Qwen on a few hundred of his own articles on a single 5090 for an hour or two, building data by having AI rewrite his posts in AI style and training AI-style input to original output.
- 系统靠「看一百次同类错误」进化：context infrastructure 保留全部聊天记录，让 AI 反思时从过往同类错误里总结什么时候该停下问人、什么时候自己推进，而不是一错就矫枉过正。
  > [en] The system improves by reviewing a hundred similar past mistakes: his context infrastructure keeps all chat history so reflection learns when to stop and ask versus proceed, instead of overcorrecting after one slap.
- 他让 AI 分析手表数据做几百变量回归，最能预测失眠的是当晚最后一次用 AI 的时间；照做后两周平均睡眠多了 1.4 小时。
  > [en] A regression over hundreds of smartwatch variables found the best predictor of poor sleep was how late he last used AI; cutting back added 1.4 hours of average sleep within two weeks.

## 金句

- 「如果它能自己点，然后它自己出 log，它就可以完全闭环。」
  > [en] “If it can press the buttons itself and produce its own logs, it can close the loop completely.”
- 「现在要去做一个出题的人，不要再做做题家，做题家一点前途都没有，卷不过的。」
  > [en] “Now you should be the one setting the problems, not the one solving them — problem-solvers have no future; you can't out-grind it.”
- 「你不是他一个大脑，而是一只手。」
  > [en] “You're not a brain to him anymore, just a hand.”
