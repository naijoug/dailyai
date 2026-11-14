---
title: "How to Build an AI Customer Research Agent in Claude Code"
title_tr: "如何用 Claude Code 做一个 AI 客户调研 Agent"
show: "The Growth Podcast"
kind: "article"
guests: ["Greg Greiner"]
company: "Woven"
date: "2026-11-14T07:56:59+08:00"
url: "https://www.news.aakashg.com/p/ai-customer-research"
duration: "58:53"
lang: "en"
products: ["claude-code", "woven"]
tags: ["Agents", "Dev Tools", "Products"]
score: 4
summary: "Greg Greiner (Woven CEO, former Bolt CPO) shows how an email-based research agent can talk to every drop-off, with Ancestry.com reply data, a 30–40 minute Claude Code build (CSV + CLAUDE.md + guardrails + Gmail MCP), and an eval loop that email latency makes practical."
summary_tr: "Woven CEO、前 Bolt CPO Greg Greiner 讲解如何用邮件调研 Agent 覆盖每一位流失用户：Ancestry.com 的回复与转化数据、用 Claude Code 在 30–40 分钟搭出可用循环（CSV、CLAUDE.md、护栏、Gmail MCP），以及邮件时延如何让评测回环跑得起来。"
---
## 要点

- At Bolt, Greiner was happy talking to 7 or 8 customers a month; with an AI agent he now reaches every drop-off. A Woven deployment for Ancestry.com got 3,470 replies after people abandoned a DNA-kit purchase: 42.1% mentioned privacy / unexpected DNA discoveries, 38.6% gifting vs personal-use timing, 31.2% subscription and hidden-fee concerns.
  > [zh] Greiner 在 Bolt 担任 CPO 时，一个月能聊上 7、8 位用户就满意了；现在靠 AI Agent 可以覆盖每一位流失用户。Woven 与 Ancestry.com 的合作里，弃购 DNA 试剂盒的用户有 3,470 人回复：42.1% 提到隐私和意外亲缘发现，38.6% 提到送礼与自用的时机，31.2% 提到订阅和隐性费用。
- The conversion lever was shipping and delivery timing: 41% of people who raised it went on to buy, versus 28% waiting for a promotion and 20% confused by the subscription. People who asked about shipping got an answer from the AI and converted; the subscription issue was harder to resolve in-thread.
  > [zh] 真正拉动转化的是物流时效：提到这一点的人有 41% 随后购买，等待促销的是 28%，被订阅搞糊涂的是 20%。询问配送时间的用户在得到 AI 答复后完成了转化；订阅问题则更难在对话里解决。
- Email beats in-app chat for this job because the people you most want have already left the app; response rates are only 20–40%, but still better than a site chat bubble, and outreach should go out right after churn. He lists six moments (including signup abandoned, trial ended without purchase, upsell not converted, usage drop) and says each email should be plain text with one question so the customer can lead.
  > [zh] 这类调研更适合用邮件而不是站内聊天，因为最想见的人已经离开应用；回复率只有 20–40%，仍好过网站聊天气泡，而且要在流失后立刻触达。他列出六个时机（含注册未完成、试用结束未购买、upsell 未转化、使用下降等），并强调每封邮件应是纯文本、只问一个问题，让用户主导对话。
- For teams that will not buy Woven, Greiner rebuilt the loop in Claude Code in about 30–40 minutes: a CSV of drop-offs, a CLAUDE.md for tone and format, written policies on what the agent may do, and Gmail MCP from his inbox (move to a proper sender like Postmark at volume). The exact project is on GitHub.
  > [zh] 不想单独采购 Woven 的团队，Greiner 用 Claude Code 在约 30–40 分钟重搭了同一套循环：流失用户 CSV、规定语气与格式的 CLAUDE.md、Agent 权限政策，以及从自己邮箱发出的 Gmail MCP（放量后再换 Postmark 一类正式发信服务）。当期项目已放到 GitHub。
- Add an LLM-judge eval on groundedness after replies are queued to auto-send; if it fails, rerun generation and do not paste the eval note back as exact instructions (that overfits). Chat leaves the user waiting for minutes, but over email the retry is invisible — “Email buys your evals time.”
  > [zh] 在准备自动发出的回复之后加一道基于文档的 groundedness 评测（LLM judge）；失败就重生成，不要把评测批注原样当作指令（会过拟合）。聊天里用户会干等几分钟，邮件里重跑则不容易被察觉——邮件给了评测回环时间。

## 金句

- “When he was CPO of Bolt, he was happy if he talked to 7 or 8 customers in a month.”
  > [zh] 「他还在 Bolt 做 CPO 的时候，一个月能和 7、8 位客户聊聊，他就满意了。」
- “The people you most want to hear from have already left your app. So an email is a great way to get to them.”
  > [zh] 「你最想听到声音的那些人，已经离开了你的应用。所以邮件是接触到他们的好办法。」
- “In a chat, the same loop means someone sitting there waiting for minutes. Over email, the eval can fail and rerun without the customer ever noticing. Email buys your evals time.”
  > [zh] 「在聊天里，同一套回环意味着有人会干等好几分钟。用邮件的话，评测失败再重跑，客户甚至不会察觉。邮件给了评测时间。」
