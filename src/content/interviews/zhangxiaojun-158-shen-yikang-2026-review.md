---
title: "158.【2026年复盘】和沈驿康聊，黄仁勋、xAI内幕、RSI、持续学习、去中心化、预训练白盒、硅谷创业地图"
title_tr: "Ep. 158 (2026 review): Shen Yikang on Jensen Huang, inside xAI, RSI, continual learning, decentralization, white-box pretraining and Silicon Valley's startup map"
show: "张小珺Jùn｜商业访谈录"
kind: "podcast"
guests: ["沈驿康"]
company: "Learning Machine（前 xAI 预训练团队）"
date: "2026-11-25T07:30:00+08:00"
url: "https://www.xiaoyuzhoufm.com/episode/6b05746801b0ab432eddab62"
duration: "3:22:36"
lang: "zh"
products: []
tags: ["Models", "Research", "Industry"]
score: 4
summary: "前 xAI 预训练成员、Learning Machine 创始人沈驿康做 2026 年度复盘：xAI 为何资源和人才都足却没进 T0，RSI 该怎么定义和起步，预训练的关键路径与数值稳定暗礁，以及蒸馏带来的长期代价"
summary_tr: "Former xAI pretraining researcher and Learning Machine founder Shen Yikang reviews 2026: why xAI hasn't reached the top tier despite ample resources and talent, how to define and start on RSI, the critical path and numerical-stability pitfalls of pretraining, and the long-term cost of distillation"
---
## 要点

- 节目录制于黄仁勋辞职后一周（播出前英伟达宣布其复职），沈驿康形容最近两周硅谷氛围偏悲观，并判断 AI 技术进步依旧很大，但对更大范围的实际价值「现在是 loading 的符号」。
  > [en] Recorded a week after Jensen Huang resigned (Nvidia reinstated him just before release), Shen describes Silicon Valley's mood over the past two weeks as gloomy, and says AI's technical progress remains large but its broader real-world value is "still a loading icon."
- 谈 xAI：资源雄厚、人才密度高，模型却至今没跻身 T0，他认为原因是内部缺少有效的产品机制、战略不清晰；大模型的用户反馈和数据飞轮被低估，只是链路比过去长很多。节目还解读了 xAI 解散多模态团队，观点是多模态生成不重要、多模态理解补全智能。
  > [en] On xAI: despite deep resources and dense talent, its models still aren't top tier, which he attributes to the lack of an effective internal product mechanism and an unclear strategy; user feedback and data flywheels for LLMs are underrated, just with a much longer loop. He also reads xAI's disbanding of its multimodal team as a sign that multimodal generation matters less, while multimodal understanding completes intelligence.
- RSI 被定义为让这一代模型参与训练下一代；标志是既能在既定方向线性提升，又能提出新能力、新问题或新方法。Infra 最易起步（吞吐、精度、延迟好衡量），预训练可先在小模型上快速实验再验证外推，后训练目标多、副作用多、最难用单一指标驱动。他把模型竞争比作芯片制程迭代，RSI 会缩短代际间隔、成为淘汰更多人的关口。
  > [en] RSI is defined as having this generation of models help train the next; the sign of it is both steady gains along set directions and new capabilities, problems or methods. Infra is the easiest place to start (throughput, precision and latency are measurable), pretraining can run fast small-model experiments and then check extrapolation, and post-training, with many goals and side effects, is hardest to drive by one metric. He compares model competition to chip process nodes, with RSI shortening generations and becoming the gate that eliminates more players.
- 预训练有关键路径：好数据有时无法描述，数据配比没有现成文献；效果是各部分质量的乘积而非加和；RL 时 rollout 与训练 kernel 不一致造成的数值误差会随规模放大。新团队的配方是几千张卡保底、一年不要求产出、十人左右核心团队，架构保守反而更容易成功。
  > [en] Pretraining has a critical path: good data is sometimes indescribable and there's no literature on data mixtures; results are the product, not the sum, of each part's quality; and numerical mismatches between rollout and training kernels in RL amplify with scale. His recipe for a new team: a guaranteed few thousand GPUs, no output required for a year, and a core team of about ten, where a conservative architecture is more likely to succeed.
- 蒸馏能短期快速提升，但代价是失去迭代底层技术的动力，前沿团队收紧蒸馏时差距就会被拉开；硅谷创业今年资源向头部集中、Agent 创业变少，主题收敛到 RSI、AI for Science 等少数方向。
  > [en] Distillation buys quick short-term gains but removes the incentive to build the underlying stack, so the gap widens once frontier labs tighten access; Silicon Valley startups this year saw resources concentrate at the top, fewer agent startups, and themes converging on a few areas such as RSI and AI for Science.

## 金句

- 「我预感这种动荡可能在今年底到明年开始出现，可能会持续一年甚至两年的时间」
  > [en] "I sense this turbulence may start showing up from the end of this year into next year, and could last a year or even two."
- 「中国的模型公司养活了很多北美公司」
  > [en] "Chinese model companies are keeping a lot of North American companies alive."
