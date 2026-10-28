---
title: "How Anthropic ships Claude with Claude: Separating the Brain from the Hands"
title_tr: "Anthropic 如何用 Claude 发布 Claude：把“大脑”和“双手”分开"
show: "Latent Space"
kind: "podcast"
guests: ["Katelyn Lesse", "Angela Jiang"]
company: "Anthropic"
date: "2026-10-28T02:40:19+08:00"
url: "https://www.latent.space/p/opus55"
duration: "1:46:40"
lang: "en"
products: ["claude-managed-agents", "claude"]
tags: ["Agents", "Dev Tools", "Security"]
score: 5
summary: "Anthropic's heads of Claude Platform engineering and product on the Opus 5.5 launch, anti-distillation trade-offs and why Managed Agents splits the agent's brain from its hands"
summary_tr: "Anthropic Claude 平台的工程与产品负责人谈 Opus 5.5 发布、防蒸馏的取舍，以及 Managed Agents 为何把 Agent 的“大脑”和“双手”拆开"
---
## 要点

- Opus 5.5 was pitched on intelligence per dollar: less verbose and cheaper to run than its predecessor, with savings depending on workload and cached context.
  > [zh] Opus 5.5 主打“每美元智能”：比上一代更简洁、运行成本更低，具体能省多少取决于负载和缓存上下文的使用。
- A model launch is also an API launch: protections against chain-of-thought extraction for distillation (such as preserving thinking blocks across turns) can break customers' existing harnesses, a trade-off the team weighs every release.
  > [zh] 发模型也是发 API：为防止通过思维链提取来蒸馏而加的保护（如跨轮保留 thinking blocks）可能弄坏客户现有的 harness，团队每次发布都要权衡。
- Managed Agents runs the harness ("brain") on a durable server and executes code in a separate sandbox ("hands"); a failed sandbox no longer kills the session, and latency drops versus booting a whole agent in a box.
  > [zh] Managed Agents 把 harness（“大脑”）放在持久服务器上，代码在独立沙箱（“双手”）里执行；沙箱挂了不再拖垮整个会话，延迟也比把整个 Agent 塞进容器启动更低。
- Credentials live in a separate vault; the agent only sees placeholders and an egress proxy injects the real secret, so generated code never shares a box with credentials.
  > [zh] 凭据存放在独立的保险库里，Agent 只看到占位符，由出口代理注入真实密钥，生成的代码永远不和凭据处在同一环境。
- Dreaming is built from the same primitives: one managed agent inspects another's prior work and writes memories back; near-term focus has shifted toward safety while keeping the base harness simple.
  > [zh] Dreaming 用同一套原语搭成：一个托管 Agent 检查另一个的历史工作并写回记忆；近期重心更多转向安全，同时保持基础 harness 简单。

## 金句

- “We, we've known for a long time that chain of thought extraction is one of the most powerful ways that you can distill models.”
  > [zh] “我们很早就知道，提取思维链是蒸馏模型最有效的方法之一。”
- “And so what's interesting about that is, like, the agent is never, like, in the same place where the credentials are, right?”
  > [zh] “有意思的地方在于，Agent 永远不会和凭据处在同一个地方。”
- “we spin up another managed agent that then can expect the previous managed agent and then write, uh, memories to that managed agent.”
  > [zh] “我们会再启动一个托管 Agent，让它检查前一个托管 Agent，然后把记忆写回给它。”
