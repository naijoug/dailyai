---
title: "How to build a knowledge factory"
title_tr: "如何建一座知识工厂"
author: "Harrison Chase"
handle: "hwchase17"
source_url: "https://www.langchain.com/blog/knowledge-factory"
published: "2026-11-21T16:40:42Z"
lang: "en"
day: "2026-11-22"
item: "x-ai-2026-11-22-1111-6"
---
In order to make AI work for your company, the missing bit is not better models, it’s not just more context - it’s better knowledge. It’s knowledge of how your company works, what standards for operating you have in place, where data is stored and how it’s accessed.

> [zh] 要让 AI 在你的公司里真正起作用，缺的不是更好的模型，也不只是更多上下文——而是更好的知识。也就是关于你的公司如何运转、有哪些运营标准、数据存在哪里以及如何访问的知识。

Your most efficient employees have this knowledge in their head. They know who to talk to, where to go to answer questions, why you do things in a particular way. That knowledge is often tacit, implicit, scattered - sometimes present only in their head, sometimes scattered across a variety of documents.

> [zh] 你最高效的员工把这些知识装在脑子里。他们知道该找谁、去哪里找答案、为什么要按某种方式做事。这些知识往往是隐性的、默会的、零散的——有时只存在于他们脑中，有时散落在各种文档里。

In order to make AI work for your company, you need to collect, curate, and maintain a representation of that knowledge to pass to agents. The system that helps you do that is what we’re calling a knowledge factory.

> [zh] 要让 AI 在你的公司里起作用，你需要收集、整理并维护这些知识的一种表示形式，再交给 Agent。帮你做到这一点的系统，我们称之为「知识工厂」。

We’ve built this at LangChain in a few ways. Our internal GTM and content studio agents are powered by a knowledge factory. LangSmith Engine (our agent that runs over traces and suggests fixes) maintains a knowledge factory per agent as well. This blog shares our learnings.

> [zh] 我们在 LangChain 以几种方式构建了它。我们内部的 GTM Agent 和内容工作室 Agent 由知识工厂驱动。LangSmith Engine（我们那个在运行轨迹上运行并提出修复建议的 Agent）也为每个 Agent 维护一座知识工厂。这篇博客分享我们的心得。

## Context vs knowledge

> [zh] 上下文与知识

Context is what an agent has available when doing a task.

> [zh] 上下文是 Agent 在执行任务时手头可用的东西。

Knowledge is the reusable understanding we maintain so it can do that task correctly: what a metric means, which source to trust, or how we handle a particular situation. Sometimes written down, often not.

> [zh] 知识是我们维护的、可复用的理解，让它能正确完成任务：某个指标是什么意思、该信任哪个来源、某种情况我们怎么处理。有时写了下来，更多时候没有。

A knowledge factory turns scattered documents and experience into knowledge that can become context for future work.

> [zh] 知识工厂把零散的文档和经验变成知识，而这些知识又能成为未来工作的上下文。

So knowledge is a form of context that the agent will get, but it’s often not (and shouldn’t be) the only context the agent gets. Other types of context you already ingest/store reliably, and that can just be provided directly to the agent (see the section on quickly changing data below).

> [zh] 所以知识是 Agent 会得到的一种上下文，但它往往不是（也不应该是）Agent 得到的唯一上下文。其他类型的上下文你已经能可靠地采集和存储，可以直接提供给 Agent（见下文关于快速变化数据的部分）。

## From Software Factory to Knowledge Factory

> [zh] 从软件工厂到知识工厂

The idea of software factories has risen sharply over the past year and a half. The idea is that rather than having your best engineers actually build software, they should build the factory (the systems) to help everyone at the company build software more efficiently. The actual building of the software can be done by agents.

> [zh] 过去一年半里，「软件工厂」的理念迅速兴起。它的意思是：与其让你最好的工程师亲手构建软件，不如让他们构建工厂（也就是系统），帮助公司里每个人更高效地构建软件。真正的软件构建可以交给 Agent。

General knowledge work is now following a similar path. Agents are good enough to make presentations, launch videos, do outbound. You should be leveraging them as much as possible for those tasks. But in order for them to accomplish those tasks they need all that tacit, implicit, scattered knowledge.

> [zh] 一般的知识工作正在走上类似的道路。Agent 已经足以做演示文稿、发布视频、做外联。你应该尽可能在这些任务上利用它们。但要完成这些任务，它们需要所有那些隐性的、默会的、零散的知识。

That is where you should devote resources. You need to build that knowledge, and more importantly a factory to collect, curate and maintain that knowledge. That is what will let you outsource more general knowledge tasks to agents.

> [zh] 这就是你应该投入资源的地方。你需要构建这些知识，更重要的是构建一座收集、整理和维护这些知识的工厂。正是它能让你把更多一般性的知识任务外包给 Agent。

## The pieces of knowledge

> [zh] 知识的组成部分

There are generally a few pieces of knowledge you want to maintain.

> [zh] 通常你需要维护几类知识。

- How to do the work — Skills. Procedures, instructions, and scripts for accomplishing tasks the way your company expects.
- How the business works — Domain knowledge. Definitions, policies, and facts about your products, customers, competitors, and organization.
- Where to get current information — Data access guidance. Which sources to use, what data lives where, and how to query it.

> [zh] 怎么做事——技能（Skills）：按公司期望的方式完成任务的流程、说明和脚本。／ 业务如何运转——领域知识：关于你的产品、客户、竞争对手和组织的定义、政策和事实。／ 去哪里获取最新信息——数据访问指南：用哪些来源、什么数据在哪里、如何查询。

Skills: these are procedures for how to do things “properly” inside your company. Instructions, scripts, for how to accomplish tasks in the particular way that your company requires. Often times, these were never written down before (instead passed coworker to coworker). You should strive to write them down.

> [zh] 技能：这是在你公司内部「正确地」做事的流程。按公司要求的特定方式完成任务的说明和脚本。很多时候这些从未被写下来（而是同事之间口口相传）。你应该努力把它们写下来。

Domain knowledge: this is knowledge that does not go stale frequently. It is often core information about people, products, competitors. This is often information that was written down - but was usually incomplete (or incorrect) just due to the sheer amount of knowledge here.

> [zh] 领域知识：这是不太会频繁过时的知识，往往是关于人、产品、竞争对手的核心信息。这类信息通常有书面记录——但由于知识量太大，往往不完整（或不正确）。

Data access guidance: You should have a good data strategy (Snowflake, Databricks, etc). That’s the foundation of useful agents. If the source of truth of data is there already, and it’s complete and up to date - there’s no need to maintain a separate copy. Rather, the new thing you’ll want to maintain is clear instructions on what data lives where and how to query it.

> [zh] 数据访问指南：你应该有一套好的数据策略（Snowflake、Databricks 等），这是有用的 Agent 的基础。如果数据的权威来源已经存在，而且完整、及时——就没必要再维护一份副本。你需要新维护的，是关于什么数据在哪里、如何查询的清晰说明。

## The pieces of the factory

> [zh] 工厂的组成部分

All of this information is needed for useful agents. Don’t try to maintain it manually - that’s a herculean effort. Rather, you will want to create a system for maintaining it. Generally, the pieces look like:

> [zh] 有用的 Agent 需要所有这些信息。不要试图手工维护——那是一项艰巨无比的工作。你应该建一个系统来维护它。一般来说，组成部分如下：

A way for agents to flag missing knowledge : One of the best ways to learn what pieces of knowledge are missing is to have agents flag it as they are working. If they are asked to do something, and can’t find information, or find information that they discover is wrong - they should flag it! Give the agent a tool to at a minimum report what is wrong, and optionally suggest the correct update.

> [zh] 让 Agent 标记缺失知识的途径：了解缺了哪些知识的最好方法之一，是让 Agent 在工作时标记出来。如果它们被要求做某件事却找不到信息，或者发现找到的信息是错的——就应该标记出来！给 Agent 一个工具，至少能报告哪里错了，并可选地建议正确的更新。

The curator agent: an agent to update, curate, and maintain this knowledge : This knowledge should not be kept up to date manually - too much work. And it should not be kept up to date solely by the agents that use it - they are great at flagging what’s wrong or missing, but fixing it requires deep understanding of the underlying knowledge and other sources of data. Asking agents - who are mainly trying to accomplish their own goals - to properly update and maintain this knowledge will cause it to become unruly and full of contradictions. Rather - you will want a curator agent that runs in the background, on some cadence , to update this knowledge. It should have access to all the raw sources of data (Notion, Slack, etc) where this knowledge may be scattered. It should have access to agent traces , so it can see how people are trying to use agents and codify that into skills. It should have access to the things that agents have flagged as wrong (the above section).

> [zh] 策展 Agent：一个负责更新、整理和维护这些知识的 Agent。这些知识不应该靠手工保持更新——工作量太大。也不应该只靠使用它的 Agent 来更新——它们很擅长标记哪里错了或缺了，但修复需要深入理解底层知识和其他数据来源。让那些主要在完成自己目标的 Agent 去妥善更新和维护这些知识，会让它变得杂乱无章、充满矛盾。你需要的是一个在后台按一定节奏运行的策展 Agent 来更新知识。它应该能访问这些知识可能散落其中的所有原始数据来源（Notion、Slack 等）；应该能访问 Agent 运行轨迹，从而看到人们如何尝试使用 Agent，并把这些固化成技能；还应该能访问 Agent 标记为错误的内容（即上一节）。

Storage for the knowledge : In some ways, this is actually the least important thing. You can store this knowledge in skill format in GitHub. In a single file in Notion. In OKF format in LangSmith Context Hub . In a knowledge graph in Neo4j. The curator agent should know how to interact with all of these formats (not that hard). In other ways, this is the least explored area. How do you represent memory ? As an industry, we’ve converged on skills for “procedural memory”. For more semantic memory, a different standard will likely emerge (OKF?). It is early and no standard has yet emerged - so it’s probably best to not be too prescriptive or overly complicate what this format should look like.

> [zh] 知识的存储：某种意义上，这其实是最不重要的部分。你可以把知识以技能格式存在 GitHub 里，存成 Notion 里的单个文件，以 OKF 格式存在 LangSmith Context Hub 里，或存成 Neo4j 里的知识图谱。策展 Agent 应该知道如何与所有这些格式交互（并不难）。但另一方面，这也是探索最少的领域：你如何表示记忆？作为一个行业，我们已在「程序性记忆」上收敛到技能；对于更偏语义的记忆，很可能会出现另一种标准（OKF？）。现在还早，尚无标准——所以最好不要对格式规定得太死，也别把它搞得过于复杂。

## Putting it all together

> [zh] 把一切串起来

Let’s finish with an end to end example of an agent preparing a revenue report.

> [zh] 最后用一个 Agent 准备营收报告的端到端例子收尾。

There’s base context the agent will need: the raw revenue numbers, stored in BigQuery and Salesforce.

> [zh] Agent 需要的基础上下文：存储在 BigQuery 和 Salesforce 里的原始营收数据。

Then there’s knowledge. It may consist of a few different types:

> [zh] 然后是知识，可能包含几种不同类型：

- Skills: how to create reports in LangChain style. These are stored in GitHub in the standard skills format.
- Long duration knowledge: the way we calculate ARR. This is stored in a company wiki.
- How to access quickly changing knowledge: how to access that raw data in BigQuery/Salesforce. These are also just stored as skills, but this time in Context Hub.

> [zh] 技能：如何按 LangChain 的风格制作报告，以标准技能格式存在 GitHub 里。／ 长期知识：我们计算 ARR 的方式，存在公司 wiki 里。／ 如何访问快速变化的知识：如何访问 BigQuery/Salesforce 里的原始数据，这些同样以技能形式存储，只不过这次存在 Context Hub 里。

The agent runs. Maybe it notices that we renamed a column in BigQuery. It figures out the correct column on the fly. It uses its tool it has to report issues to flag this, and suggest the proper column name.

> [zh] Agent 开始运行。也许它注意到我们在 BigQuery 里重命名了一列。它当场找出了正确的列，并用它报告问题的工具把这一点标记出来，同时建议正确的列名。

After it creates the report, our finance lead works synchronously with the agent to fix a few formatting issues, including telling it to use a new header we now need to use for all LangChain documents.

> [zh] 报告生成后，我们的财务负责人与 Agent 实时协作修正了几处格式问题，包括告诉它使用一个我们现在所有 LangChain 文档都必须使用的新页眉。

That night, the curator agent sees the flagged issue. It also inspects the traces of the agent and notices this back and forth with our finance lead. It updates the relevant skills accordingly (to use the new column when fetching data, and to use the new header when drafting report).

> [zh] 当晚，策展 Agent 看到了被标记的问题。它还检查了该 Agent 的运行轨迹，注意到与财务负责人的这番来回沟通。于是它相应地更新了相关技能（取数时使用新列名，起草报告时使用新页眉）。

## Conclusion

> [zh] 结论

The goal isn’t to document everything before agents can start working. It’s to build a system where doing the work reveals what knowledge is missing, and resolving those gaps makes future work better. Start with one recurring workflow, inspect where agents struggle, and close that loop.

> [zh] 目标不是在 Agent 开始工作之前把一切都写成文档，而是构建这样一个系统：做事的过程会暴露缺了哪些知识，而补上这些缺口会让未来的工作变得更好。从一个重复性的工作流开始，看看 Agent 在哪里吃力，然后把这个闭环跑通。

We’ve built this at LangChain , and are working with a few customers to bring this to their agents (internal and external). If you’re interested in this - please reach out , we can help!

> [zh] 我们已经在 LangChain 构建了它，并正在与几家客户合作，把它带到他们的（内部和外部）Agent 中。如果你感兴趣——欢迎联系我们，我们可以帮忙！
