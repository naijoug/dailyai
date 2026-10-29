---
title: "You're probably overprompting Claude"
title_tr: "你大概在给 Claude 写太多提示词"
author: "Addy Osmani"
handle: "addyosmani"
source_url: "https://x.com/i/article/2115682550723313664"
published: "2026-10-29T06:13:39Z"
lang: "en"
day: "2026-10-29"
item: "x-ai-2026-10-29-2115-6"
---

Newer models require less prompting than most of us still do.

> [zh] 比我们多数人仍在做的，新模型其实需要更少的提示词。

For Opus 5.5, try giving Claude a single prompt with a clear goal of what you want to do and how Claude should verify it has achieved it, and let Claude work on it. Start with /effort medium and adjust as needed.

> [zh] 对 Opus 5.5，试着只给 Claude 一条提示：说清你要做什么、以及它该如何验收已经完成，然后让它自己干。从 /effort medium 起步，再按需调整。

If you don't know yet what you're trying to do, ask Claude to interview you until it could write a spec. Then start a new session and use that spec to build what you want.

> [zh] 若你自己还没想清楚要做什么，先让 Claude 采访你，直到它能写出一份规格说明。然后开一个新会话，用那份规格去构建。

Claude will stop on its own when it believes it's done.

> [zh] 当 Claude 认为做完了，它会自己停下来。

If it can execute something that checks in terms of pass/fail or a number to beat, with reports in a way it can read, Claude can keep going without you having to watch.

> [zh] 如果它能跑通某种可按通过/失败或某个目标数值验收、且报告对它可读的检查，Claude 就能在你不盯着的情况下继续干。

For long background tasks, you can use /goal to specify a condition that a separate model to check after every turn.

> [zh] 长后台任务可以用 /goal 指定一个条件，由另一个模型在每轮之后检查。

Recent versions of Claude Code have also adopted auto mode as the default starting mode for interactive terminal sessions. In that mode, a classifier analyzes Claude's actions rather than relying on the usual permission prompts. This is not a guarantee of safe behavior - neither is blindly approving every prompt. When Claude reports back, ask it to show you the command and output or a screenshot.

> [zh] 近期版本的 Claude Code 也把 auto mode 设为交互式终端会话的默认起步模式。该模式下由分类器分析 Claude 的动作，而不再依赖常见的权限弹窗。这并不能保证行为安全——盲目批准每个提示同样不行。Claude 汇报时，让它出示命令与输出，或截图。

For models like Claude Opus 5 and Claude Fable 5, over 80% of the Claude Code system prompt was removed with no measurable degradation of its coding evals.

> [zh] 对 Claude Opus 5、Claude Fable 5 这类模型，Claude Code 系统提示词砍掉了超过 80%，编码评测未见可测下降。

When a new model like Opus 5.5 comes out, you can do the same experiment with your own instructions: remove some, then add back only those that the model misses. The /doctor prompt-audit command flags those written for older models.

> [zh] 每当 Opus 5.5 这类新模型出来，你也可以对自己的指令做同样实验：先删掉一些，再只把模型真缺的加回来。/doctor prompt-audit 命令会标出那些为旧模型写的指令。

Another area to reduce your own work is subagents.

> [zh] 另一个能少干活的地方是 subagent。

Claude delegates to them on its own, so you rarely need to ask. Ask only for substantial, standalone work like long audits or migrations, which Opus 5.5 can split across parallel subagents. For small jobs, subagents multiply cost and latency. Subagents can parallelize work or provide a second opinion, but they don't, by default, make things smarter.

> [zh] Claude 会自己委派，你很少需要主动要求。只给长审计、迁移这类大块独立活，Opus 5.5 可以拆到并行 subagent。小活用 subagent 只会抬高成本和延迟。它们能并行或提供第二意见，但默认并不会让结果更聪明。

For agents you build, a single agent with skills can outperform a subagent design on quality, often at lower cost and latency from what I've seen.

> [zh] 就你自己搭的 Agent 而言，我见过的情况是：带 skills 的单 Agent 在质量上常能胜过 subagent 设计，而且往往更省、更快。

Use Claude cloud sessions when you want to shut your laptop. Start one from claude.ai/code, the Claude app or via claude --cloud. Cloud sessions run in a separate VM with a fresh clone of your repo, so be sure to push any commits before you start. Check in from your phone, address any questions the session posed, then review the diff and open the PR. Keep a session local if the task requires resources that are only available on your machine.

> [zh] 想合上笔记本时用 Claude 云会话。可从 claude.ai/code、Claude 应用或 claude --cloud 启动。云会话在独立虚拟机里用仓库的新鲜克隆跑，开始前务必先 push 提交。可用手机查看、回答会话提出的问题，再审 diff、开 PR。若任务依赖本机独有资源，就留在本地会话。

Parallel sessions only pay off once a single session can finish without you. If you have Projects in Claude Code, I think you'd find them very useful. Without a project, you are the manager of multiple sessions and must track what each session is doing, and which ones have completed.

> [zh] 只有当单个会话能在你不在时跑完，并行会话才划算。如果你有 Claude Code 的 Projects，我觉得会非常有用。没有 Project 时，你就是多会话的管理人，必须盯着每个会话在干什么、哪些已经完成。

A project is one long-running chat that does most of the project management for you: as issues and jobs come up, paste them in, and Claude creates a separate thread (usually a cloud session) for each and runs them in parallel. You provide instructions once, and they are applied to all new threads. And the Overview shows which tasks have completed, which PRs are ready and what's pending your input.

> [zh] Project 是一条长跑会话，替你做大部分项目管理：有问题和任务就贴进去，Claude 为每个建独立线程（通常是云会话）并行跑。指令写一次，会应用到所有新线程。Overview 能看到哪些任务完成了、哪些 PR 就绪、哪些在等你输入。

Projects are in public beta on Pro and Max, so you may not have them yet, but hopefully soon!

> [zh] Projects 在 Pro 和 Max 上处于公开测试，你可能还没有，但希望很快会有！

Review still matters. On the Claude Code team, however, most of the reading has become automated: most changes are reviewed and fixed by Claude at least once before a human is asked to look. You can use Code Review on Team and Enterprise plans or the lighter /code-review, which reviews your diff in a subagent that hasn't seen the conversation. You can also simply start a new session. If you do, give it the spec and tell it to ignore stylistic stuff.

> [zh] 审查仍然重要。不过在 Claude Code 团队，大部分阅读已经自动化：多数改动至少经 Claude 审查并修过一次，才会交给人看。Team / Enterprise 可用 Code Review，或更轻的 /code-review——由未见过对话的 subagent 审你的 diff。也可以直接开新会话；若这样做，把规格给它，并告诉它忽略风格类问题。

Every few months, audit how you work to make sure you aren't building for how older models used to work.

> [zh] 每隔几个月审计一次自己的工作方式，确保你不是还在为旧模型的工作方式做建设。
