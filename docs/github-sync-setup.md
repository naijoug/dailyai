# GitHub 登录与 Gist 同步

已读、收藏和评分默认只在这台浏览器的 `localStorage`（`dailyai:v1`）。配好下面几步之后，设置里会出现「使用 GitHub 登录」。登录只用 `gist` 权限，数据写到该账号的一个 **secret Gist**（`public: false`），文件名固定为 `dailyai-sync.json`。

Client Secret 只放在 Cloudflare Worker 里，不要写进前端、不要提交到仓库。

没配 `PUBLIC_GITHUB_CLIENT_ID` 或 `PUBLIC_GITHUB_WORKER_URL` 时，登录按钮不出现，站点仍按本地数据工作。

## 1. 建 GitHub OAuth App

打开 <https://github.com/settings/developers> → **OAuth Apps** → **New OAuth App**。

| 字段 | 值 |
| --- | --- |
| Application name | Daily AI（任意） |
| Homepage URL | `https://naijoug.github.io/dailyai/` |
| Authorization callback URL | Worker 的 `/callback`。先随便填，部署 Worker 后改成真实地址，例如 `https://dailyai-oauth.<你的子域>.workers.dev/callback` |

记下 **Client ID**。再 **Generate a new client secret**，记下 secret。secret 只在创建时显示一次。

Callback URL 必须和 Worker 实际地址逐字一致（含 `https`，路径是 `/callback`，末尾不要多斜杠）。

## 2. 部署 Worker

仓库里是 `worker/oauth.js` 和 `worker/wrangler.toml`。在仓库根目录：

```bash
cd worker
npx wrangler login
npx wrangler deploy
```

`deploy` 结束时会打印 `https://….workers.dev`。把 OAuth App 的 Authorization callback URL 改成：

```text
https://<打印出来的主机>/callback
```

## 3. 设置 Worker secrets

仍在 `worker/` 目录。提示输入时分别粘贴第 1 步的 Client ID 和 secret（不会写进 `wrangler.toml`）：

```bash
npx wrangler secret put CLIENT_ID
npx wrangler secret put CLIENT_SECRET
```

改完 secret 不用重新 deploy。Worker 只接受来自 `https://naijoug.github.io` 的跨域请求，换 token 成功后 302 回 `https://naijoug.github.io/dailyai/#gh_token=…&state=…`（token 在 fragment 里）。

## 4. 前端配置并重新构建

在仓库根目录复制环境变量样例：

```bash
cp .env.example .env
```

编辑 `.env`（这个文件已被 git 忽略）：

```bash
PUBLIC_GITHUB_CLIENT_ID=刚才的 Client ID
PUBLIC_GITHUB_WORKER_URL=https://<Worker 主机>
```

`PUBLIC_GITHUB_WORKER_URL` 不要带路径，不要带末尾斜杠。Client ID 必须和 Worker secret `CLIENT_ID` 是同一个。然后：

```bash
npm run build
```

GitHub Pages 的构建环境里也要有这两个变量，否则线上构建出来的页面不会显示登录按钮。Actions 里把它们加成 **Variables**（不是 Secrets 也行：Client ID 本来就是公开的）。不要把 Client Secret 加进 Pages 的环境。

本地 `npm run dev` / `npm run build` 会读 `.env`。

## 5. 怎么同步

- 未登录：只读写本地，和以前一样。
- 第一次登录：找这个账号下文件名是 `dailyai-sync.json` 的 Gist，没有就新建一个 secret Gist。本地和远端合并后再推上去。
  - 已读：两边的并集。只有某一侧后来「取消已读」且时间更新，才会把它标成未读。
  - 收藏：按每条的时间，最后一次写入获胜。取消收藏会留下墓碑，这样另一台设备上的旧收藏不会把它加回来。
  - 评分：同样按时间最后写入获胜。
- 之后：先写本地，约 4 秒后推到 Gist。打开页面，或从别的标签切回来时再拉一次。
- 请求失败、断网、限流：静默停在本地，不弹窗。
- 下次打开页面会用 token 调 GitHub `/user`。返回 401，或权限不是单独的 `gist`，就丢掉 token。退出登录也丢掉 token，**不删**这台浏览器里的已读和收藏。

token 存在 `localStorage` 的 `dailyai:gh`。Gist id 缓存在 `dailyai:gh-gist`，退出时清掉。

## 6. 自测

1. 打开 <https://naijoug.github.io/dailyai/>，点齿轮。应看到「使用 GitHub 登录」。切到中文，按钮是「使用 GitHub 登录」。
2. 点登录，授权页的权限应只有 Gist。同意后回到本站，齿轮里出现头像和用户名。
3. 在 GitHub → 你的 Gists 里应有一个 secret Gist，文件 `dailyai-sync.json`。
4. 收藏一条，等几秒，刷新 Gist，JSON 里有这条。另一台浏览器登录同一个账号，应看到同一条收藏。
5. 退出后，本机收藏还在；齿轮恢复成登录按钮。
6. 把 `.env` 里两个变量清空再构建，齿轮里不应再出现登录按钮，收藏仍可在本地切换。

不连 GitHub 时，可以在本地跑合并规则和 Worker 的纯函数：

```bash
node --experimental-strip-types scripts/store-merge.check.ts
node scripts/oauth-worker.check.mjs
```
