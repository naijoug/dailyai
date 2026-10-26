---
title: "How the Claude Code team does code review"
title_tr: "Claude Code 团队如何做代码评审"
author: "Addy Osmani"
handle: "addyosmani"
source_url: "https://x.com/addyosmani/status/2114604912520921136"
published: "2026-10-26T06:27:53Z"
lang: "en"
day: "2026-10-26"
item: "x-ai-2026-10-26-2115-4"
---
We previously mentioned that Claude writes about 90 percent of the code for Claude Code. So how do we do code review at this scale? Who reads code anyway? What happens if code goes wrong?

> [zh] 我们之前提到过，Claude Code 大约 90% 的代码是 Claude 写的。那么在这种规模下我们怎么做代码评审？到底谁在读代码？代码出错了怎么办？

This post describes our team's code review process at Claude Code and how we have improved it. Between June and September, we saw more than double the number of pull requests that were merged to the codebase for Claude Code, while the share of pull requests that had to be reverted fell by more than 40 percent.

> [zh] 本文介绍 Claude Code 团队的代码评审流程以及我们如何改进它。从 6 月到 9 月，合并进 Claude Code 代码库的 PR 数量翻了一倍多，而需要回滚的 PR 占比下降了 40% 以上。

We didn't stop doing code review. Instead, we've automated the majority of reading and tuned it to optimize for human time and effort. We've also made significant investments into improving the speed and ease of reverting mistakes.

> [zh] 我们并没有停止代码评审。相反，我们把大部分“读代码”的工作自动化了，并针对人的时间和精力做了优化。我们还在让回滚错误变得更快、更容易这件事上投入了大量精力。

## Rethinking the goal of code review

> [zh] 重新思考代码评审的目标

With agents writing code, the volume of changes increases rapidly. In our monorepo, we went from approximately 2,500 changes merging each day in May to over 30,000 in September of this year.

> [zh] Agent 写代码之后，变更量迅速增长。在我们的 monorepo 里，每天合并的变更从 5 月的约 2,500 个增长到今年 9 月的 30,000 多个。

While Claude Code is not in our monorepo, it has a lot of pressure on it as well. When you're moving fast like that, it becomes increasingly hard, if not impossible, to do code review manually, line by line.

> [zh] 虽然 Claude Code 不在 monorepo 里，它承受的压力同样很大。节奏这么快的时候，逐行人工评审越来越难，甚至根本不可能。

Code review serves two purposes:

> [zh] 代码评审有两个目的：

Detect and correct bugs before they ship

> [zh] 在上线前发现并修正 bug

Develop a shared understanding of the codebase

> [zh] 建立对代码库的共同理解

While this article focuses primarily on the first goal, we'll discuss the second goal toward the end of the post.

> [zh] 本文主要讨论第一个目标，第二个目标会在文末讨论。

We view "did someone read the code?" as an imprecise measure of "what could go wrong with this change, and what check - automated or human - is the right one to catch it?"

> [zh] 我们认为，“有没有人读过这段代码？”只是对“这个变更可能出什么问题，用哪种检查（自动的还是人工的）最适合发现它？”的一种不精确衡量。

This question also changed the timing of code review. Traditionally, code review was a check performed after the fact, when the code was written, the PR was filed, and someone waited for someone else to take a look. Instead, we've integrated code review into the workflow. It's more like a spellcheck that you continuously do while writing.

> [zh] 这个问题也改变了代码评审的时机。传统上，代码评审是事后检查：代码写完、PR 提交，然后等别人来看。而我们把代码评审融入了工作流，更像是边写边持续运行的拼写检查。

The majority of changes have already been reviewed and corrected by Claude, at least once, before a human is asked to take a look. In this way, we catch most of the routine bugs and reserve human attention for more high-level considerations.

> [zh] 大多数变更在请人看之前，已经至少被 Claude 评审并修正过一次。这样我们能发现大部分常规 bug，把人的注意力留给更高层面的考量。

## Human time and attention

> [zh] 人的时间和注意力

We want to reserve human time and attention for things only humans can handle, while making sure we have enough automation to cover the rest. Even at our current pace, there is still an incredible amount of work for humans to do, and our team is encountering new and novel challenges almost every day.

> [zh] 我们希望把人的时间和注意力留给只有人能处理的事，同时确保有足够的自动化覆盖其余部分。即使以我们现在的节奏，人要做的事仍然非常多，团队几乎每天都会遇到新的挑战。

For this reason, human time is a dual-sided cost. Not only do we count the time people spend doing code review, but also the time that they spend fixing bugs that are introduced by bad code. If we reduce the first without reducing the second, we're not really saving human time.

> [zh] 因此，人的时间是双向成本。我们不仅计算人花在代码评审上的时间，还计算他们修复烂代码引入的 bug 所花的时间。如果只减少前者而不减少后者，我们并没有真正节省人的时间。

So, our goal is that the majority of pull requests in our Claude Code repos (the CLI, the desktop and web apps, and the mobile apps) should merge with a maximum of one person in the loop (who could be the author) without an increase in reverts or incidents.

> [zh] 所以我们的目标是：Claude Code 各仓库（CLI、桌面和网页应用、移动应用）的大多数 PR，在最多一个人参与（可以是作者本人）的情况下合并，同时回滚和事故不增加。

We track our human time in terms of median human approvals per PR (along with the 95th percentile), the number of human comments, and how long a PR waits on a person. We use the revert and incident rates as a guardrail: if these metrics increase, we haven't reduced human time, just relocated it.

> [zh] 我们用每个 PR 的人工批准数中位数（以及 95 分位）、人工评论数量、PR 等待人的时长来衡量人的时间，并把回滚率和事故率作为护栏：如果这些指标上升，说明我们并没有减少人的时间，只是把它挪了个地方。

## What's the journey of a change?

> [zh] 一个变更要经历什么？

A typical change, whether it's from an engineer's laptop or a Claude session in Slack, goes through multiple layers of review.

> [zh] 一个典型的变更，无论来自工程师的笔记本还是 Slack 里的一个 Claude 会话，都要经过多层评审。

Above is the typical Claude Code change, from the author's environment to production. Most of this process is automated, with human attention focused on the risky part.

> [zh] 上图是一个典型 Claude Code 变更从作者环境到生产环境的过程。大部分流程是自动化的，人的注意力集中在有风险的部分。

We have six layers of checks with a rollback mechanism to handle any issues that get through.

> [zh] 我们有六层检查，外加一个回滚机制来处理漏过去的问题。

Each layer catches some bugs while missing others. Few bugs get through all of the layers, and if some do, we have a rollback mechanism in place.

> [zh] 每一层都能抓到一些 bug，也会漏掉另一些。很少有 bug 能穿过所有层；即便有，我们也有回滚机制兜底。

## 1.Pre-PR verification:

> [zh] 1. 提 PR 前的验证：

Most of our review is done before we create a PR. We ask Claude to do something runnable, such as running tests, the build, or comparing a screenshot to the design. Instead of saying the task is done, we ask it to show us the result. Then, a subagent reviews the diff with fresh context. Both these strategies are part of our guide to best practices.

> [zh] 我们的大部分评审在创建 PR 之前就完成了。我们要求 Claude 做一些可运行的事，比如跑测试、跑构建、把截图和设计稿对比。不是让它说“任务完成了”，而是让它把结果展示给我们看。然后由一个带全新上下文的子 Agent 评审 diff。这两种做法都写在我们的最佳实践指南里。

Before opening a PR, many of us also run a handful of internal skills -- bug hunting, diff reduction, end-to-end validation, and checking our UI changes against our design guidelines.

> [zh] 提 PR 之前，我们很多人还会跑几个内部 skill——找 bug、精简 diff、端到端验证、对照设计规范检查 UI 改动。

According to Boris Cherny, who created Claude Code, equipping Claude with a verification process is probably the biggest key to higher quality outcomes.

> [zh] Claude Code 的创建者 Boris Cherny 认为，给 Claude 配上验证流程，可能是获得更高质量结果的最大关键。

He estimates that a verification process improves the quality of Claude's output by a factor of two to three.

> [zh] 他估计，验证流程能把 Claude 的输出质量提高两到三倍。

The verification process for any given domain can be very different:

> [zh] 不同领域的验证流程可能差别很大：

Sometimes it's as simple as running a bash command. Sometimes it's running a test suite. Sometimes it's testing the app in a browser or phone simulator.

> [zh] 有时只是跑一条 bash 命令；有时是跑测试套件；有时是在浏览器或手机模拟器里测试应用。

If the automated reviewer is consistently flagging the same issue, we fix it at the source -- via the skill itself, a lint rule, or updating documentation files like:

> [zh] 如果自动评审员反复标记同一个问题，我们就从源头修复——通过 skill 本身、一条 lint 规则，或者更新下面这些文档文件：

CLAUDE.md -- The project description file that you can use to give Claude context about the project (technology stack, conventions, goals, non-goals). Claude Code pulls this file in for every single review, so we keep it brief for large codebases and reference the rest of the documentation here. When code breaks a convention in this file, or an update makes something in it out of date, the reviewer flags it.

> [zh] CLAUDE.md——项目描述文件，用来给 Claude 提供项目上下文（技术栈、约定、目标、非目标）。Claude Code 每次评审都会读入这个文件，所以对大型代码库我们会让它保持简短，其余内容通过引用其他文档。当代码违反了这个文件里的约定，或者某个更新让其中内容过时，评审员会标记出来。

REVIEW.md -- The file where code owners tell the reviewer what matters in their part of the code. We separately verify whether the reviewer is actually following these guidelines. Good ones are brief and focus on:

> [zh] REVIEW.md——代码所有者告诉评审员他们那部分代码里什么最重要的文件。我们会单独验证评审员是否真的遵守了这些准则。好的 REVIEW.md 简短，聚焦于：

Defining project failure (the docs should not lie; the config should not misroute) Limiting nitpicking Defining ignored paths Requiring file + line reference, not guessing filenames Requiring top-level summary including count and clear statement of "no issues"

> [zh] 定义项目层面的失败（文档不能说谎；配置不能路由错）、限制吹毛求疵、定义忽略的路径、要求给出文件 + 行号引用而不是猜文件名、要求有顶层总结，包含问题数量并明确说明“没有问题”

## 2. AI review on every pull request

> [zh] 2. 每个 PR 都有 AI 评审

Every PR receives a Claude review before a human review.

> [zh] 每个 PR 在人工评审前都会先经过 Claude 评审。

The diff is analyzed against the entire codebase and the intent of the PR as stated by the PR author. It checks that: the change actually addresses the issue the change fits into the larger system the change does not break other parts of the codebase

> [zh] diff 会对照整个代码库以及 PR 作者陈述的意图进行分析，检查：变更是否真正解决了问题、是否契合整个系统、是否破坏了代码库的其他部分。

When reviewing a bug fix, the bot tries to find the root cause.

> [zh] 评审 bug 修复时，机器人会尝试找出根本原因。

Our public product, Code Review for Claude Code, is now available to all Team and Enterprise customers. There is a lighter version for local use as well -- /code-review.

> [zh] 我们的公开产品 Code Review for Claude Code 现已向所有 Team 和 Enterprise 客户开放，本地也有轻量版——/code-review。

Since we released the research preview, the share of our internal PRs getting substantive review comments has gone from 16% to 54%. Code Review detects issues on the majority of PRs with more than 1,000 lines and returns clean results on most smaller PRs. Repos can be configured by admins to use Quick, Standard, or Deep modes. Deep is useful in cases where the cost of missing a single bug is higher than the time spent reviewing code.

> [zh] 自研究预览发布以来，我们内部获得实质性评审意见的 PR 比例从 16% 升到了 54%。Code Review 能在大多数超过 1,000 行的 PR 上发现问题，而在大多数较小的 PR 上返回干净结果。管理员可以为仓库配置 Quick、Standard 或 Deep 模式。当漏掉一个 bug 的代价高于评审所花时间时，Deep 模式很有用。

Findings are vetted by multiple other agents before human review:

> [zh] 发现的问题在人工评审前会经过其他多个 Agent 审核：

Multiple agents run in parallel to hunt for bugs

> [zh] 多个 Agent 并行找 bug

A separate vote decides if a finding is valid or a false positive, only confirming the findings that have enough votes

> [zh] 单独投票判定一个发现是有效还是误报，只确认得票足够的发现

Findings that are only style/diagnostics/cleanup related are filtered out (we A/B tested these filters on our own PRs before rolling them out)

> [zh] 只涉及风格/诊断/清理的发现会被过滤掉（这些过滤器在推出前先在我们自己的 PR 上做了 A/B 测试）

The remaining findings are presented as inline comments, ordered by severity level and marked as:

> [zh] 剩下的发现以行内评论的形式呈现，按严重程度排序，并标记为：

Important Nit Pre-existing (so we don't unfairly penalize the author for bugs that were not introduced by the PR)

> [zh] 重要、小问题（Nit）、既有问题（这样不会因为不是本 PR 引入的 bug 而不公平地惩罚作者）

All findings must be addressed -- fixed or the thread is resolved with a reason. In many cases, an agent will fix the problem overnight so the author returns to a PR that's already been through another review pass.

> [zh] 所有发现都必须处理——要么修复，要么写明理由后关闭讨论。很多时候，Agent 会在夜里把问题修好，作者回来时 PR 已经又过了一轮评审。

## 3. Security review that can block

> [zh] 3. 可以阻断合并的安全评审

We also run an automated security review. No PR can be merged while there is still an open finding (either from the code review or the security review). The author can either fix the issue or close the thread with a short reason (how we deal with a false positive).

> [zh] 我们还会运行自动安全评审。只要还有未关闭的发现（来自代码评审或安全评审），PR 就不能合并。作者可以修复问题，或者附上简短理由关闭讨论（这是我们处理误报的方式）。

A finding will be auto-closed if a subsequent commit addresses the problem. You can set up the same thing with the open-source security review GitHub Action, or the /security-review command. See automated security reviews in Claude Code for a guide on how to set this up.

> [zh] 如果后续提交解决了问题，该发现会被自动关闭。你可以用开源的 security review GitHub Action 或 /security-review 命令搭建同样的流程。设置方法见 Claude Code 自动安全评审指南。

## 4. Automated checks that block

> [zh] 4. 可以阻断合并的自动检查

Standard checks: lint, type checks, tests on all platforms, build. (We wrote about how we scaled CI here.) A typical CLI PR can have dozens of checks run before anyone looks at it. The PR template has questions about how the change was tested and how to revert it. Claude can answer those for you, but the author is responsible for reviewing them.

> [zh] 标准检查：lint、类型检查、全平台测试、构建。（我们写过如何扩展 CI 的文章。）一个典型的 CLI PR 在有人看之前可能已经跑了几十项检查。PR 模板里有问题询问这个变更是怎么测试的、怎么回滚。Claude 可以替你回答，但作者要负责审阅这些回答。

## 5. Human approval, scaled by risk

> [zh] 5. 按风险分级的人工批准

Some changes are more risky than others (e.g. a docs fix vs. an auto-updater change), so they require different levels of review.

> [zh] 有些变更比其他变更风险更高（比如修文档 vs. 改自动更新器），所以需要不同级别的评审。

The tier is determined by the change, not the author. A classifier determines the risk level based on the change. Another classifier determines if a particular change actually requires another approval, even if the tier does not say it does. Some paths always require another approval -- anything marked as sensitive by owners, and any CI workflow file.

> [zh] 级别由变更本身决定，而不是由作者决定。一个分类器根据变更判定风险级别；另一个分类器判断某个变更是否确实需要额外批准，即使级别没有要求。有些路径总是需要额外批准——任何被所有者标记为敏感的内容，以及任何 CI 工作流文件。

Only authors on the repo's trusted list receive relaxed review requirements, and that's generally the team that owns the repo. All others require a second person to approve. Agent approvals don't count as human approvals. Automated review can clear a low-risk change, but it can't stand in for a human when one is required.

> [zh] 只有仓库可信名单上的作者才能享受宽松的评审要求，通常就是拥有该仓库的团队。其他人都需要第二个人批准。Agent 的批准不算人工批准。自动评审可以放行低风险变更，但在需要人的时候不能替代人。

The author of the change is responsible for it, so if an agent authors a PR the operator of the agent is always counted as one of the required reviewers. A PR approval is only good for one commit. If a new commit lands that can't be trusted (e.g. an agent pushed something, or someone resolved a merge by hand), the PR must be reapproved.

> [zh] 变更的作者对变更负责，所以如果 PR 是 Agent 写的，操作该 Agent 的人总会被算作必需评审人之一。一次 PR 批准只对一个提交有效。如果落下一个不可信的新提交（比如 Agent 推了东西，或者有人手动解决了合并冲突），PR 必须重新批准。

## 6. Merge queue, feature flags and staged rollouts

> [zh] 6. 合并队列、功能开关和分阶段发布

The merge queue ensures that all the checks run on main with the change applied. This prevents merging two successful PRs into a broken main. Typically, new features are rolled out behind a feature flag, with Anthropic employees getting access first. Because we use the product extensively, we often notice regressions before our users do.

> [zh] 合并队列确保所有检查都在应用了该变更的 main 上运行，避免两个各自通过的 PR 合并后把 main 搞坏。新功能通常放在功能开关后面发布，Anthropic 员工最先拿到。因为我们自己大量使用这个产品，经常比用户更早发现回归问题。

When we roll out publicly, changes go to the latest channel first, and the stable channel trails behind.

> [zh] 公开发布时，变更先进入 latest 渠道，stable 渠道随后跟进。

## 7. Fast feedback and rollback

> [zh] 7. 快速反馈与回滚

Some bad merges will inevitably make it through. This is our last line of defense, focused on identifying these as quickly as possible. Changes behind feature flags can be disabled without deploying.

> [zh] 总有一些坏的合并会漏过去。这是我们的最后一道防线，重点是尽快发现它们。功能开关后面的变更无需部署就能关闭。

Claude Code runs a weekly on-call rotation and any incident reviews involve looking back to see what layer should have caught the problem. It's still up to the author and on-call to notice bad merges, in addition to monitoring the revert and incident dashboards. We don't yet have circuit breaker mechanisms that adjust approval requirements based on these, but it's something we're looking into as we're making progress toward less human intervention in merging.

> [zh] Claude Code 有每周轮值的 on-call，每次事故复盘都会回头看本该由哪一层抓住这个问题。注意到坏合并仍然要靠作者和 on-call，同时还要盯着回滚和事故看板。我们还没有根据这些指标自动调整批准要求的熔断机制，但随着我们朝着更少人工干预合并的方向推进，正在研究这件事。

One team member noted that slowing down and reducing output can actually improve accuracy, but that's mostly because the amount of work being done decreases overall. Our priority is really on improving our ability to identify and correct issues quickly.

> [zh] 一位团队成员指出，放慢速度、减少产出确实能提高准确率，但这主要是因为总工作量减少了。我们真正的优先事项是提升快速发现和纠正问题的能力。

## How we make the reviewer better

> [zh] 我们如何让评审员变得更好

Our code review process is an ongoing cycle of improvement:

> [zh] 我们的代码评审流程是一个持续改进的循环：

We use incidents as an evaluation metric. The team collected incident-causing PRs, their fix-forwards and reverts, and had the engineers who understand the codebase verify the location and correctness of each bug. The review system is evaluated daily against this collection.

> [zh] 我们把事故作为评估指标。团队收集了引发事故的 PR、它们的前向修复和回滚，并请熟悉代码库的工程师核实每个 bug 的位置和正确性。评审系统每天都会对照这个集合进行评估。

Every incident adds to the collection and every change to the review system is evaluated against the entire collection.

> [zh] 每次事故都会加入这个集合，评审系统的每次改动都要对照整个集合评估。

To measure noise, we observe how humans react to the review comments. It's easy to improve our bug-finding rate if we're okay with reporting lots of non-bugs, so this needs to be regulated. We categorize each review comment into how the person on the PR handled it: fixed the issue, rejected it, clarified it as intentional, or decided it didn't matter. Additionally, we run the review system on PRs we know to be clean and observe how often the system reports something that would have resulted in a harmful change.

> [zh] 为了衡量噪音，我们观察人们如何回应评审意见。如果能接受报告大量非 bug，提高找 bug 率很容易，所以这一点需要约束。我们把每条评审意见按 PR 上的人如何处理来分类：修复了问题、拒绝了、说明是有意为之、或者认为无关紧要。此外，我们还会在已知干净的 PR 上运行评审系统，观察它多久会报告一个会导致有害改动的问题。

Our stated priorities are first, detecting real bugs, and second, reducing the number of review cycles.

> [zh] 我们明确的优先级是：第一，发现真正的 bug；第二，减少评审轮数。

It's more costly for an author to have to deal with a review comment when they're an agent. It only takes a second for a human to dismiss a nit, but when an agent has to address it, this results in another commit, and another cycle of review.

> [zh] 当作者是 Agent 时，处理一条评审意见的代价更高。人一秒钟就能忽略一个小问题，但 Agent 要处理它，就会产生又一个提交、又一轮评审。

The review process must converge. It's possible for an agent author and an agent reviewer to cycle forever. We observed one PR in our CLI project cycle more than fifty times overnight, due to the back-and-forth between the agent author and the agent reviewer. This cycle was stopped manually, but it could have gone on indefinitely.

> [zh] 评审过程必须收敛。Agent 作者和 Agent 评审员有可能无限循环。我们在 CLI 项目里观察到一个 PR 一夜之间循环了五十多次，原因是 Agent 作者和 Agent 评审员之间来回拉扯。这个循环是被人工叫停的，否则可能会一直持续下去。

When we ran git blame on what the review system kept flagging, ~59% of it was code that had been there since its first pass. Essentially, the review system was rarely finding new bugs, but finding a few more old ones on each cycle.

> [zh] 我们对评审系统反复标记的内容跑了 git blame，约 59% 是从第一轮起就存在的代码。也就是说，评审系统很少发现新 bug，只是每轮多找出几个老 bug。

We made this worse because we had gotten into the habit of running several review cycles by default, because each cycle can find a different bug. While it can be useful to iterate through several review cycles for a high-risk change, it's not needed for every PR. Our team started tracking the number of cycles-to-pass in addition to recall, and updated re-review to:

> [zh] 我们自己让情况更糟了，因为我们养成了默认跑好几轮评审的习惯——每一轮都可能发现不同的 bug。对高风险变更来说，多轮迭代可能有用，但并不是每个 PR 都需要。团队开始在召回率之外追踪“通过所需轮数”，并把重新评审改为：

Limit the number of cycles. The review system asks the author to re-evaluate the approach after three cycles. Limit re-review to just diff after the initial cycles. Specify the class of bugs, so the author can correct all of them, not just one line. Avoid re-reporting issues already observed. The review agents are also run on the current codebase overnight, helping us identify historical bugs before they propagate.

> [zh] 限制轮数：三轮之后，评审系统会要求作者重新评估方案。初始几轮之后只重新评审 diff。指明 bug 的类别，让作者能一次修正所有同类问题，而不只是改一行。避免重复报告已经指出过的问题。评审 Agent 还会在夜间对当前代码库运行，帮助我们在历史 bug 扩散前发现它们。

Reduction in the average number of review rounds per internal pull request after Convergence.

> [zh] 引入收敛机制后，每个内部 PR 平均评审轮数的下降。

## Humans in the loop

> [zh] 人在回路中

Having a senior engineer stop working to review a common error is an expensive process compared to automating that process. Human reviewers are still essential for some tasks:

> [zh] 让资深工程师停下手头工作去评审一个常见错误，比把这个过程自动化要昂贵得多。但有些事仍然离不开人工评审：

Should we even build this? Deciding whether or not to build something, setting the vision, taste, and goals for the product.

> [zh] 我们到底该不该做这个？决定是否构建某样东西，设定产品的愿景、品味和目标。

One team that claims they have solved the bottleneck of code review still performs human review for changes from outside the team to ensure that it is the right thing to build.

> [zh] 一个自称已经解决了代码评审瓶颈的团队，仍然会对来自团队外部的变更做人工评审，以确保这是该做的事。

Auditing dangerous code (billing, auto-updater, CI workflows).

> [zh] 审计危险代码（计费、自动更新器、CI 工作流）。

Architecture review, because those choices set the conventions others follow.

> [zh] 架构评审，因为这些选择决定了其他人要遵循的约定。

Verifying proofs (test output, commands run, screenshots, reviewer comments). If you can't describe what the checks would miss, don't ask for a 👍, you need a real review!

> [zh] 核验证据（测试输出、运行的命令、截图、评审意见）。如果你说不出这些检查会漏掉什么，就别只要一个 👍，你需要一次真正的评审！

Taking responsibility. A person answers for every change that ships, whoever typed it.

> [zh] 承担责任。每一个上线的变更都要有一个人负责，不管是谁敲的代码。

## Team context

> [zh] 团队上下文

Code review has always served the dual purpose of communicating codebase changes. Reading the diff of a colleague's change is how people usually understand what has changed, and how the codebase works. If the bulk of the reading is done by machines, what becomes the way to learn the codebase?

> [zh] 代码评审一直还承担着沟通代码库变化的作用。读同事改动的 diff，通常是人们了解哪里变了、代码库如何运作的方式。如果大部分阅读都由机器完成，那人要怎么了解代码库？

We don't have any formal mechanism for this. No member of the team has a full mental model of Claude Code in their head, nor do we think anyone needs to. Rather, when anyone wants to learn about a piece of the codebase, they ask Claude to generate an explainer about that exact slice. It only takes a few minutes and the explainer is always up to date.

> [zh] 我们对此没有任何正式机制。团队里没有人脑子里装着 Claude Code 的完整心智模型，我们也不认为有人需要。相反，当有人想了解代码库的某一部分时，就让 Claude 针对那一块生成一份讲解。只需要几分钟，而且讲解永远是最新的。

For some of us, we go the extra step and have Claude generate a mini artifact that visualizes this area and teaches it in our preferred style.

> [zh] 我们有些人会更进一步，让 Claude 生成一个小型产物，把这块区域可视化，并按自己喜欢的方式讲解。

This is a better way to focus our human attention than reading trivial diffs line by line, which teaches you very little (e.g. a one-line copy change). Creating an explainer about the module you're going to change teaches you a lot.

> [zh] 比起逐行阅读琐碎的 diff（比如一行文案改动，几乎学不到什么），这是更好地聚焦人类注意力的方式。为你要改的模块生成一份讲解，能让你学到很多。

Plus, we're generally open by default, working in open Slack channels, and seeing what others are building as they build it.

> [zh] 另外，我们通常默认公开，在公开的 Slack 频道里工作，能看到别人边做边在做什么。

## "You land it, you own it"

> [zh] “你合进去的，你负责”

If you merge a small or medium change, and something still goes wrong, the general expectation is that you usually fix it yourself. There are a few reasons why this doesn't spiral out of control:

> [zh] 如果你合并了一个小型或中型变更，结果还是出了问题，通常的预期是你自己去修。这之所以不会失控，有几个原因：

Small changes that are easy to review, debug, and revert.

> [zh] 小变更容易评审、调试和回滚。

Everything can be reverted. Feature flags, reverts, and staged rollouts can reverse most mistakes in minutes.

> [zh] 一切都可以回滚。功能开关、回滚和分阶段发布能在几分钟内撤销大多数错误。

Blast radius sets the bar. More expensive code gets more eyes and validation.

> [zh] 爆炸半径决定门槛。代价更高的代码会得到更多人关注和验证。

Regressions are surfaced quickly by telemetry and internal usage.

> [zh] 遥测和内部使用能快速暴露回归问题。

It's not a blame game. The person who fixes the issue owns it because they have the most context. Incident reviews consider the system.

> [zh] 这不是追责游戏。修复问题的人对它负责，是因为他们掌握的上下文最多。事故复盘考虑的是系统。

Plus, much of the team shares responsibilities by working in open channels. Anyone can see what others are building, join in on the conversation, or have Claude look for gaps. Feedback also comes from non-code owners. That openness is a big part of why quality stays high without a gate on every line.

> [zh] 此外，团队很多人通过在公开频道工作来分担责任。任何人都能看到别人在做什么、加入讨论，或者让 Claude 去找漏洞。反馈也来自非代码所有者。这种开放是在不给每一行设卡的情况下仍能保持高质量的重要原因。

## Changing course

> [zh] 及时转向

With agents, it is cheap to start new work, but sometimes you shouldn't. This typically arises when someone in the channel calls out the proposed change as an invalid path (citing previous decisions or suggesting a better path), and the author either closes the PR or changes the implementation.

> [zh] 有了 Agent，开始新工作很便宜，但有时你不该开始。这通常发生在频道里有人指出提议的改动是一条错误路径（引用以前的决策或建议更好的路径），然后作者要么关闭 PR，要么改变实现方式。

Because it was easy to write the code in the first place, it doesn't feel like a loss to close the PR. The key is to pivot early in the thread, instead of waiting until the end to make a blocking comment on a finalized PR.

> [zh] 因为一开始写代码很容易，关掉 PR 也不觉得是损失。关键是在讨论早期就转向，而不是等到最后在一个已经定型的 PR 上留下阻断性评论。

## How to implement

> [zh] 如何落地

Most of the components of this approach are already available to your team.

> [zh] 这套方法的大部分组成部分，你的团队已经可以用上。

## Before the pull request

> [zh] 提 PR 之前

Give the agent a checklist of checks it can run. List these checks in a short CLAUDE.md file

> [zh] 给 Agent 一份它能运行的检查清单，把这些检查列在简短的 CLAUDE.md 文件里

Set up the agent to call formatters and linters via hooks

> [zh] 设置 Agent 通过 hooks 调用格式化工具和 linter

Run /code-review and /security-review locally or have a new-context subagent review the changes

> [zh] 在本地运行 /code-review 和 /security-review，或者让一个全新上下文的子 Agent 评审改动

Create a REVIEW.md, and use it to track recurring review issues

> [zh] 创建 REVIEW.md，用它追踪反复出现的评审问题

## On every pull request

> [zh] 每个 PR 上

Enforce CI

> [zh] 强制执行 CI

Update your PR template with "Testing", "Risk" and "How to revert"

> [zh] 在 PR 模板里加上“测试”“风险”“如何回滚”

On one repo, add an AI reviewer (Code Review for Claude Code, or the Claude Code GitHub Action), and iterate on your REVIEW.md for a few weeks before rolling it out to more repos.

> [zh] 先在一个仓库加上 AI 评审员（Code Review for Claude Code 或 Claude Code GitHub Action），迭代 REVIEW.md 几周后再推广到更多仓库

Add an automated security review

> [zh] 加上自动安全评审

Require that all review threads be resolved before merging

> [zh] 要求合并前解决所有评审讨论

Apply review rigor according to risk: a quick pass for routine changes, and a thorough review for high-risk areas (where bugs are expensive). Code Review has Quick, Standard and Deep levels.

> [zh] 按风险调整评审力度：常规变更快速过一遍，高风险区域（bug 代价高的地方）彻底评审。Code Review 有 Quick、Standard 和 Deep 三档。

Limit the number of review rounds, and after a few rounds, just review the new diff.

> [zh] 限制评审轮数，几轮之后只评审新的 diff。

## Approval

> [zh] 批准

Define risk levels, which are set based on the change, not the author. Start strict, and progressively relax as you see evidence.

> [zh] 定义风险级别，依据变更而不是作者来设定。先严格，再根据证据逐步放宽。

Reserve lenient approval paths for trusted authors.

> [zh] 宽松的批准通道只留给可信作者。

Bot approvals cannot be used to satisfy a required approval. Dismiss any approvals when new commits are pushed.

> [zh] 机器人批准不能用来满足必需的批准。推送新提交时撤销已有批准。

Designate humans as the approvers for code and policies controlling auth, billing, CI, and release workflows, as well as installers. Use CODEOWNERS and branch protection for this.

> [zh] 指定人类作为控制认证、计费、CI 和发布工作流以及安装程序的代码和策略的批准人。为此使用 CODEOWNERS 和分支保护。

## Merging and post-merge

> [zh] 合并与合并后

Set up a merge queue

> [zh] 设置合并队列

Experiment with feature flags

> [zh] 尝试功能开关

Launch to internal users first

> [zh] 先向内部用户发布

Roll out in stages

> [zh] 分阶段发布

Create a one-step revert mechanism

> [zh] 建立一步回滚机制

Build a set of evals by logging incidents and reverts

> [zh] 通过记录事故和回滚建立一套评估集

Rescore the reviewer any time you change its prompts, tools or model

> [zh] 每次修改评审员的提示词、工具或模型时都重新给它打分

Track human effort, using reverts and incident rates as guardrails

> [zh] 追踪人力投入，用回滚率和事故率作为护栏

## Where this is headed

> [zh] 未来走向

Code Review was announced with the intention that the final approval decision would still be made by a human. All the product does is post its findings. But in our own repos, we are going further: Owners are deciding which low-risk changes can be merged automatically when the automated checks pass. And this boundary will continue to evolve.

> [zh] Code Review 发布时的初衷是最终批准决定仍由人来做，产品只负责发布发现的问题。但在我们自己的仓库里，我们走得更远：代码所有者正在决定哪些低风险变更可以在自动检查通过后自动合并。这条边界还会继续变化。

So whenever our reviewers miss something, we ask ourselves what wasn't in the model's context, and turn that into a CLAUDE.md file, a skill or a new check. And we haven't changed our goal: To reduce the amount of human effort per change while keeping our revert rate no higher than it is now.

> [zh] 所以每当评审员漏掉什么，我们都会问自己：模型的上下文里缺了什么？然后把它变成一个 CLAUDE.md 文件、一个 skill 或一项新检查。我们的目标没有变：在保持回滚率不高于现在的前提下，减少每个变更所需的人力。

So if you also allow agents to create pull requests, please let us know what checks you've automated, what requires a human, and what we're getting wrong.

> [zh] 所以，如果你也允许 Agent 创建 PR，请告诉我们你自动化了哪些检查、哪些需要人、以及我们哪里做错了。

A rewrite of our original article and checked with Pangram.

> [zh] 本文改写自我们的原始文章，并用 Pangram 做过检查。
