---
title: "Designing for Agents — Zeno Rocha, Resend"
title_tr: "为 Agent 而设计：Resend 创始人 Zeno Rocha"
show: "Latent Space"
kind: "podcast"
guests: ["Zeno Rocha"]
company: "Resend"
date: "2026-11-11T04:05:00+08:00"
url: "https://latent.space/p/resend/"
duration: "1:25:52"
lang: "en"
products: ["resend", "resend-inboxes", "claude-code"]
tags: ["Agents", "Dev Tools", "Products"]
score: 5
summary: "Resend co-founder and CEO Zeno Rocha on why coding agents keep recommending Resend, growing an 80-tool MCP server, Markdown pages for LLMs, and the deliverability and abuse work behind an email API"
summary_tr: "Resend 联合创始人兼 CEO Zeno Rocha 谈编程 Agent 为何总推荐 Resend、把 MCP 做到 80 多个工具、给大模型准备 Markdown 页面，以及邮件 API 背后的送达率与反滥用功夫"
---
## 要点

- Agents are now a distribution channel: in an AEO study cited in the show notes, Claude Code picked Resend first in 64 of 102 email recommendations. Zeno says Resend had 4.3 million users and 120,000 paying customers when recorded, and has passed SendGrid in npm SDK downloads.
  > [zh] Agent 已经成了分发渠道：节目引用的一项 AEO 研究显示，在 102 次邮件服务推荐里 Claude Code 有 64 次首选 Resend。Zeno 说录制时 Resend 有 430 万用户、12 万付费客户，npm SDK 下载量已超过 SendGrid。
- Resend's MCP grew from an investor-built open-source local server into an official remote one, which first required building OAuth and RBAC. It went from about 20 tools to 80-plus, against Cloudflare's two-tool approach; Zeno's goal is 100% of what the dashboard can do, including billing and team invites. As a buyer he now picks vendors by whether they ship an official MCP, and dropped Plausible for PostHog because Plausible's only MCP was third-party.
  > [zh] Resend 的 MCP 最早是投资人做的开源本地版，后来改成官方远程版，为此先补了 OAuth 和权限体系（RBAC）。工具从约 20 个加到 80 多个，和 Cloudflare 只给两个工具的思路相反；Zeno 的目标是覆盖控制台 100% 的功能，包括计费和邀请成员。他自己选供应商也看有没有官方 MCP，就因为 Plausible 只有第三方做的 MCP，换成了 PostHog。
- For AEO: FAQs on almost every page, llms.txt and a `.md` version of every marketing page. When a model got Resend's pricing badly wrong because agents can't run the JavaScript calculator, he spelled the numbers out in the pricing page's Markdown, and within days the answers were correct.
  > [zh] AEO 做法：几乎每页都有 FAQ，有 llms.txt，所有营销页面都有 `.md` 版本。有一次模型把 Resend 的价格算得一塌糊涂，原因是 Agent 不会运行页面上的 JavaScript 计算器；他把数字直接写进定价页的 Markdown，几天后再问答案就对了。
- On deliverability: auto-generating a plain-text version of every email raised deliverability a lot; shared click-tracking domains create a noisy-neighbor risk, which is why Resend added custom tracking domains; and they keep the free tier, trusting users by default but blocking fast when bounce or complaint rates spike.
  > [zh] 送达率方面：给每封邮件自动生成纯文本版本，送达率明显提高；共用的点击追踪域名会被别的客户的钓鱼邮件连累，所以 Resend 推出了自定义追踪域名；免费套餐会继续保留，默认信任用户，但退信率或投诉率一飙升就迅速封禁。
- Next: moving the sending path from Node.js to Go, buying and managing their own IP blocks to get closer to the metal, and an API for programmatically creating many inboxes that agents can read, label and reply from.
  > [zh] 接下来：把发信链路从 Node.js 换成 Go，自购并管理 IP 段、更深入底层基础设施，并推出可以批量创建收件箱的 API，让 Agent 能读信、打标签和回复。

## 金句

- "Well, I want my product to be formless."
  > [zh] “我希望我的产品没有固定形态。”
- "So as a consumer, I make decisions now based on, do I have the access to that data or not?"
  > [zh] “作为用户，我现在做决定就看一点：我能不能拿到那份数据？”
- "Getting to one hundred percent coverage of what your dashboard can do is actually very, very difficult."
  > [zh] “让 MCP 覆盖控制台 100% 的功能，其实非常非常难。”
