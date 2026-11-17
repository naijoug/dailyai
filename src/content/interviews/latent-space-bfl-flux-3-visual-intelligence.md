---
title: "Building Visual Intelligence — Andreas Blattmann & Dustin Podell, Black Forest Labs"
title_tr: "构建视觉智能——Black Forest Labs 的 Andreas Blattmann 与 Dustin Podell"
show: "Latent Space"
kind: "podcast"
guests: ["Andreas Blattmann", "Dustin Podell"]
company: "Black Forest Labs"
date: "2026-11-17T05:38:00+08:00"
url: "https://latent.space/p/bfl"
duration: "1:38:23"
lang: "en"
products: ["flux"]
tags: ["Models", "Research"]
score: 4
summary: "Based on the show notes, Latent Diffusion co-inventor Andreas Blattmann and FLUX Kontext lead Dustin Podell explain why Black Forest Labs trains FLUX 3 on images, video and sound together and is moving toward video and world models."
summary_tr: "据节目说明，Latent Diffusion 共同发明人 Andreas Blattmann 和 FLUX Kontext 负责人 Dustin Podell 解释 Black Forest Labs 为什么让 FLUX 3 同时学图像、视频和声音，并走向视频与世界模型。"
---
## 要点

- Per the show notes, “visual intelligence” means the kind of knowledge that lets your hand start moving before a tossed ball arrives, without being able to write down the trajectory; that is BFL’s argument for training FLUX 3 on three signals together: stills show where things are, video shows how they got there, and sound marks when something hit, even if the camera missed the contact.
  > [zh] 据节目说明，所谓「视觉智能」，指的是有人抛来一个球、你写不出轨迹，手却已经提前动起来的那种知识；这正是 BFL 让 FLUX 3 同时学三种信号的理由：静态图像告诉你东西在哪，视频告诉你它怎么到那儿，声音则标出撞击发生的时刻，哪怕镜头没拍到接触瞬间。
- Andreas argues ordinary 2D video carries a lot of evidence about what objects look like from other angles: if a camera pans around a person, the model eventually “owes you” the back of their head. The hosts note this doesn’t settle whether a model understands physics, but it is a better test than whether a single frame looks convincing.
  > [zh] Andreas 认为普通二维视频里有大量关于物体从其他角度看是什么样的证据：镜头绕着一个人转，模型迟早得把后脑勺画出来。主持人指出这并不能证明模型「懂物理」，但比只看单帧是否逼真要好得多。
- An engineering example: sharpening each frame of a clip independently can look great frame by frame but shimmer on playback because the upscaler decides slightly differently each time, so BFL derives its video upscaler from the same FLUX 3 backbone to keep temporal consistency.
  > [zh] 一个工程例子：逐帧单独锐化，每帧看都很好，播放起来却会闪烁，因为放大器每次的判断略有不同；所以 BFL 的视频放大器也从同一个 FLUX 3 主干派生，以保证时间一致性。
- On autoregression vs. diffusion, Andreas gives both sides their due: autoregressive models learn from every token in a training example at once, while diffusion can be distilled from a long sampling process down to a handful of steps; which matters depends on whether you are paying for training or waiting for the image.
  > [zh] 谈自回归和扩散之争，Andreas 承认两边各有优势：自回归模型能一次从训练样本的所有 token 中学习，扩散模型则能把很长的采样过程蒸馏到寥寥几步；哪个更重要，取决于你是为训练买单，还是在等图生成出来。
- FLUX Kontext began as Dustin’s small experiment: a few hours of training on a handful of photos labeled with relationships got the model to put a logo on a shirt, enough to bring to an offsite before months of work on data and model. His favorite unexpected use: people restoring old, degraded family photos with FLUX and showing them to their families. The episode also covers world action models and robotics in 2027.
  > [zh] FLUX Kontext 起源于 Dustin 的一个小实验：用少量标注了关系的照片训练几个小时，模型就能把 logo 印到衬衫上，足以拿到团队外出会上讨论，之后才在数据和模型上投入了几个月。他最喜欢的意外用法是：有人用 FLUX 修复破旧的老家庭照片，再拿给家人看。节目还谈到世界动作模型和 2027 年的机器人。
