---
title: "A FAANG PM's Guide to Practical AI Evals"
title_tr: "前 FAANG 产品经理的 AI 评测实操指南"
show: "The Growth Podcast"
kind: "podcast"
guests: ["Mahesh Yadav"]
date: "2026-11-24T08:34:06+08:00"
url: "https://www.news.aakashg.com/p/practical-ai-evals"
duration: "2:15:26"
lang: "en"
products: ["microsoft-foundry"]
tags: ["Agents", "Dev Tools", "Products"]
score: 3
summary: "Former Google, Amazon, Meta and Microsoft AI PM Mahesh Yadav walks through building AI evals in four steps inside Microsoft Foundry: define good with yes/no tests, set a bar between your competition and the best model, scale with an LLM judge, and keep humans sampling."
summary_tr: "曾在谷歌、亚马逊、Meta 和微软做 AI 产品经理的 Mahesh Yadav，在 Microsoft Foundry 里演示四步搭建 AI 评测：用是/否题定义「好」、把及格线设在竞品与最强模型之间、用 LLM 评审扩规模、并保留人工抽检。"
---
## 要点

- Step one is defining “good” with three H’s — helpful, honest, harmless — made concrete for the product. For a contract agent, helpful means redacting only the right word or digit, honest means grounded in the documents and the playbook, harmless means never saying things like a competitor’s product is better. Judgment calls should be yes/no; anything code can check should be a code-based pass/fail eval.
  > [zh] 第一步用三个 H——有用、诚实、无害——为具体产品定义「好」。以合同 Agent 为例：有用是只改掉该改的词或数字，诚实是依据文档和操作手册，无害是不说「竞品更好」之类的话。需要判断的项都做成是/否题；代码能检查的就用基于代码的通过/不通过评测。
- Step two is setting the bar: the floor is your competition and the ceiling is roughly the 70–80% where top benchmarks tend to top out. On his contract agent the floor was 45% (plain Cowork), the bar 65% and the ceiling 70% (the best model); if you land under the bar, narrow to the slices you get right about 80% of the time and guardrail the rest.
  > [zh] 第二步是定及格线：下限是竞品水平，上限大约是顶级基准常见的 70–80%。他的合同 Agent 下限 45%（直接用 Cowork）、及格线 65%、上限 70%（最强模型）；达不到及格线，就收窄到正确率约 80% 的那部分场景，其余用护栏挡住。
- Step three scales the suite with an LLM judge after human experts label the first round (he cites about $25,000 of legal experts for a contract agent); he builds it in Microsoft Foundry, noting Bedrock, GCP and even Claude Code can do the same. The target is 70–80% agreement with the expert, not perfect agreement.
  > [zh] 第三步在人类专家标好第一轮后（他举例合同 Agent 请法律专家约花 2.5 万美元），用 LLM 评审扩大规模；他在 Microsoft Foundry 里演示，也提到 Bedrock、GCP 甚至 Claude Code 都能做。目标是与专家一致 70–80%，而不是追求完全一致。
- Step four keeps humans in the loop by sampling judge outputs — for a large contract agent, perhaps 200 to 1,000 outputs a week. On roles, the PM writes the yes/no questions, sets the launch bar and stage gates, checks the judge and decides what ships; engineers build the judges and pipeline and drive eval cost down after launch.
  > [zh] 第四步靠抽检让人留在回路里——大型合同 Agent 每周大约抽查 200 到 1000 条输出。分工上，产品经理写是/否题、定上线门槛和阶段关卡、检查评审模型、决定是否发布；工程师搭评审和流水线，上线后负责压低评测成本。

## 金句

- “An experienced AI PM knows that the floor of your eval is your competition and the ceiling is around the 70 to 80% mark.”
  > [zh] 「有经验的 AI 产品经理知道，评测的下限是你的竞品，上限大约在 70% 到 80%。」
- “Binary scores are faster to verify, and the real decision is binary anyway: you fix it or you don't.”
  > [zh] 「二元评分核对起来更快，而且真正的决定本来就是二选一：要么修，要么不修。」
