---
title: "How I fight token fraud as a solo founder"
title_tr: "我作为独立创始人如何对抗 token 欺诈"
show: "How I AI"
kind: "podcast"
guests: ["Claire Vo"]
company: "ChatPRD"
date: "2026-11-16T20:00:00+08:00"
url: "https://podcasts.apple.com/us/podcast/how-i-fight-token-fraud-as-a-solo-founder/id1809663079?i=1000802264251"
duration: "39:46"
lang: "en"
products: ["chatprd"]
tags: ["Security", "Products"]
score: 4
summary: "ChatPRD’s solo founder Claire Vo walks through the token fraud that cost her tens of thousands of dollars in a year: six abuse patterns, the business and technical controls she added, a real-time fraud classifier, and why she killed free trials."
summary_tr: "ChatPRD 独立创始人 Claire Vo 复盘一年里让她损失数万美元的 token 欺诈：六种滥用模式、她加上的业务与技术防线、实时欺诈分类，以及她为什么彻底取消免费试用。"
---
## 要点

- Per the show notes, token fraud has cost bootstrapped ChatPRD tens of thousands of dollars over the past year and eaten almost all of her engineering energy; her framing is that AI SaaS is uniquely exposed because every free seat is paid compute.
  > [zh] 据节目说明，过去一年 token 欺诈让自筹资金的 ChatPRD 损失了数万美元，几乎耗尽了她全部的工程精力；她的看法是，AI SaaS 格外容易被盯上，因为每个免费席位背后都是真金白银的算力。
- Six abuse patterns she has seen: fraudsters farming free trials, reselling promo codes, wrapping the product in relays, and even installing a custom MCP that ran as a 24/7 compute worker; she also warns that an AI support desk can become an attack vector, and jokes that she accidentally funded Roblox and Fortnite maps.
  > [zh] 她遇到过的六种滥用模式包括：批量薅免费试用、倒卖优惠码、给产品套一层中转（relay），甚至装一个自定义 MCP 把产品当成 24 小时运转的算力工人；她还提醒 AI 客服台也可能成为攻击入口，并自嘲曾不小心「资助」了 Roblox 和 Fortnite 地图。
- Controls: business measures (she finally turned off free trials for good) plus technical defenses; tools referenced include Stripe Radar, Vercel AI Gateway, Vercel Bot ID, Vercel Firewall, Clerk and Codex.
  > [zh] 防线分两类：业务层面（她最终彻底关掉了免费试用）和技术层面；节目提到的工具包括 Stripe Radar、Vercel AI Gateway、Vercel Bot ID、Vercel Firewall、Clerk 和 Codex。
- “Bots that watch the bots”: she uses Jev (TypeSafe AI) in a loop that classifies fraud in real time.
  > [zh] 「用机器人盯机器人」：她用 Jev（TypeSafe AI）搭了一个实时判定欺诈的循环。

## 金句

- 「If you sell AI, you sell compute.」
  > [zh] 「卖 AI，就是在卖算力。」
