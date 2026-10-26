---
title: "How I work with Agents"
title_tr: "我如何与 Agent 协作"
author: "Thorsten Ball"
handle: "thorstenball"
source_url: "https://x.com/i/article/2114385531811319808"
published: "2026-10-25T15:58:12Z"
lang: "en"
day: "2026-10-26"
item: "x-ai-2026-10-26-0915-5"
---
... as of October 2026.

> [zh] ……截至 2026 年 10 月。

Use the latest and greatest models. Everything else is potentially a waste of time. If a model is wrong 10% of the time, you don't know which 10%, so you end up making multiple attempts. When do you really want to hire a generalist who's 50% cheaper but also randomly 20% dumber? Who's still using Opus 4.5? Exactly.

> [zh] 用最新最强的模型。其他的都可能是在浪费时间。如果一个模型有 10% 的时候会出错，你并不知道是哪 10%，结果就得反复尝试好几次。你什么时候真的会想雇一个便宜 50%、却会随机笨 20% 的通才？现在还有谁在用 Opus 4.5？就是这个道理。

Stop worrying about accumulating slop. "It'll turn your codebase into an unmaintainable mess." Maybe that was true six months ago. Now? I'm not convinced it adds slop. And even if it does, I'm not convinced the result is unmaintainable.

> [zh] 别再担心垃圾代码越积越多。“它会把你的代码库变成一团无法维护的烂摊子。”六个月前也许是这样。现在？我不认为它会添加垃圾代码。就算会，我也不认为结果就无法维护。

Prompt the What, not the How. Describe What you want, now How you'd do it. You'll often get better results. "Make the bytecode compiler and VM AS FAST AS YOU CAN. Do not stop until it's 2x faster." "Here's how it should work in the end"

> [zh] 提示词里说“要什么”，而不是“怎么做”。描述你想要什么，而不是你会怎么做。这样往往效果更好。“把字节码编译器和虚拟机做得越快越好。不快到 2 倍不许停。”“最终它应该是这样工作的”

Make the whole SDLC legible to the agent. What stopped hallucinations? Tool calls. They let agents touch our reality. If the agent can't see something, it makes it up. So let it run what it builds end to end, let it read production logs, deploy, watch the rollout, cut the release, flip the flag, triage the bug report and email the customer. Anything you can see, the agent should see too.

> [zh] 让 Agent 能看清整个软件开发生命周期（SDLC）。是什么止住了幻觉？工具调用。工具让 Agent 能触碰到我们的现实。Agent 看不到的东西，它就会编出来。所以让它端到端地运行自己构建的东西，让它读生产日志、部署、盯着发布过程、切版本、打开功能开关、分诊 bug 报告、给客户发邮件。凡是你能看到的，Agent 也应该能看到。

Give it tools for the SDLC. We have custom plugins for bug reports, emailing users, "Is our system healthy?" and granting featuer flags.

> [zh] 给它配上覆盖 SDLC 的工具。我们有自定义插件，用来处理 bug 报告、给用户发邮件、查询“我们的系统健康吗？”以及授予功能开关。

Eval agentic knowledge. Knowledge piles up in the codebase: AGENTS.md files, skills, scripts, docs. But do agents actually use it? Spawn five blind agents, control vs. treatment, and find out. Agents are really, really good at running experiments.

> [zh] 评估面向 Agent 的知识。知识会在代码库里不断堆积：AGENTS.md 文件、技能（skills）、脚本、文档。但 Agent 真的会用吗？起五个盲测 Agent，分对照组和实验组，一试便知。Agent 非常、非常擅长做实验。

Local dev feels yucky now. Each agent should be able to install and run whatever it needs to get job done. Easy in remote machines, yucky in local dev. Hard to not run into resource conflicts locally when you want agents testing stuff end to end.

> [zh] 本地开发现在感觉很别扭。每个 Agent 都应该能安装并运行完成任务所需的任何东西。在远程机器上很容易，在本地开发里就很别扭。想让 Agent 端到端测试东西时，在本地很难不碰上资源冲突。

Don't iterate with the agent. Let it build tools to iterate. Not "let's try this. ... ah no, let's try that." Instead: "Generate 20 variations and a little page that lets me combine and test them." Not only applies to solution space, but also problem space: "Give me 4 theories on why this is slow, then check all four."

> [zh] 别跟 Agent 一来一回地迭代，让它构建用来迭代的工具。不是“我们试试这个……啊不对，试试那个”，而是：“生成 20 个变体，再做一个小页面让我组合和测试它们。”这不仅适用于解空间，也适用于问题空间：“给我 4 个关于它为什么慢的猜想，然后把四个都验证一遍。”

Ask for irrefutable proof. Biggest game changer. Agents are really good at producing proof: end-to-end walkthroughs, demo videos, before/after numbers. You have to build up trust and an instinct for this. Put "this is not evidence" in your AGENTS.md.

> [zh] 要求无可辩驳的证据。这是最大的改变。Agent 非常擅长拿出证据：端到端演示流程、演示视频、前后对比数据。你得为此建立信任和直觉。在你的 AGENTS.md 里写上“这不算证据”。

Don't wait for your agents. Let them wait on you. If you worry about TTFT, you're probably doing something wrong. Lean into async. Give them bigger tasks, be more ambitous. Batch instead of back and forth.

> [zh] 别等你的 Agent，让它们等你。如果你在担心 TTFT（首 token 延迟），你大概哪里做错了。拥抱异步。给它们更大的任务，更有野心一些。批量处理，而不是来回拉扯。

Automation/schedules/wake-up/heartbeat are killer feature. Didn't realize it, but missed it dearly once it was off. Use it all the time. "Check the logs in 2hrs." "Let me know once this is live" "Check every day at 9am".

> [zh] 自动化 / 定时任务 / 唤醒 / 心跳是杀手级功能。之前没意识到，可一旦关掉就非常想念。我一直在用。“2 小时后看一下日志。”“上线了告诉我”“每天早上 9 点检查一次”。

Stop manually managing context. Every thought you spend wondering about "is it using 300k or 380k tokens?" is wasted time. Compaction works incredibly well. Don't manage context by hand. One thread = one task. Some threads are 46 messages, some are 3,714.

> [zh] 别再手动管理上下文。每花一点心思琢磨“它用了 30 万还是 38 万 token？”都是在浪费时间。上下文压缩（compaction）效果好得惊人。不要手动管理上下文。一个线程 = 一个任务。有的线程 46 条消息，有的有 3,714 条。

Threads are your company memory. (In Amp) "Why did we do this?" The more team uses Amp the more knowledge multiplies. Threads are connected to git commits. Game changer. Avoids duplicate work.

> [zh] 线程就是公司的记忆。（在 Amp 里）“我们当初为什么这么做？”团队用 Amp 越多，知识就成倍增长。线程与 git 提交相关联。这改变了游戏规则，能避免重复劳动。

Don't let agents write for humans. Except: debugging steps, inicident reports, some docs. Mechanical stuff where human on other end doesn't matter that much.

> [zh] 别让 Agent 替你写给人看的东西。例外是：调试步骤、事故报告、部分文档——这类机械性的内容，另一端的读者是谁没那么重要。

Review only code with high blast radius. There are <5 central files -- those I review. Database migrations, yes. Closure vs. class, a neater type, variable names, even duplication: I don't care anymore. Does it work? Do I understand it at the arrows-in-a-diagram level? Did the agent test it end to end? Can I change it in a month? If yes, might review code.

> [zh] 只审查影响范围大的代码。核心文件不到 5 个——这些我会审。数据库迁移，要审。用闭包还是类、类型写得更漂亮、变量命名，甚至重复代码：我已经不在乎了。它能跑吗？我能在“架构图上的箭头”这个层面理解它吗？Agent 端到端测试过吗？一个月后我还能改它吗？如果答案是肯定的，才可能去审代码。
