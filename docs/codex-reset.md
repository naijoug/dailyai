# Codex 额度重置（`/codex-reset/`）

非官方页面：根据 [@thsottiaux](https://x.com/thsottiaux) 的公开帖，估计下一次 **Codex 全球用量重置**。不读取、也不预测个人的 5 小时窗口和每周窗口；那两套数在 Codex 里用 `/status` 看。

导航在「产品」后面，文案键是 `nav.reset`。界面其余文字也在 `src/lib/i18n.ts`（`cr.*`），英文为默认，中文随右上角 EN / 中 切换。时间用浏览器时区（可在顶栏改），并标出 `UTC±N`。

## 预测规则

实现在 `src/lib/codex-reset.ts` 的 `predict(events, now, challenge?)`。`events` 里 `at` 晚于 `now` 的帖不参与。

1. **已宣布**：最近一条带 `statedAt`（帖子里写了具体钟点）的 `announce`，并且在它之后、`now` 之前还没有 `global`。估计时刻就是 `statedAt`，徽章为 Announced / 已宣布。点过了还没看到 global，倒计时停在 `0:00:00:00`，并显示「随时可能」，不把宣布的钟点改成别的时间。
2. **挑战期**：`challenge.start` 起的 `challenge.days` 天之内（数据里是 2026-10-05 起 28 天）。用最近一次 `global`，加上最近至多 5 个 **global 与 global 之间**间隔的中位数，再把钟点靠向最近的 **UTC 05:00**（距离相同取更晚的那个）。徽章为 Medium / 中等。`banked` 不计入间隔。
3. **其余时间**：全部历史 global 间隔的中位数，不靠向 05:00。徽章为 Low / 较低。

倒计时格式是 `天:时:分:秒`，在浏览器里每秒走一格，不会出现负数。估计时刻若已过去不超过 6 小时，显示「随时可能」；更久则按同一个间隔向前滚，直到落在将来（挑战期内滚动时仍靠向 UTC 05:00）。

`statedAt` 目前只有 2026-10-02 那条：「tomorrow 10am PST」。帖子时刻在太平洋时区仍是 10 月 1 日晚上，所以「明天上午 10 点」是 10 月 2 日。10 月美国太平洋是夏令时（UTC−7），按 `America/Los_Angeles` 的 10:00 记为 `2026-10-02T17:00:00.000Z`。只写了「周二」而没有钟点的预告不填 `statedAt`。

## 数据

`src/data/codex-resets.json`：

- `source`：帖子作者。
- `challenge.start` / `challenge.days`：挑战窗口，UTC，含起始时刻、不含结束时刻。
- `events[]`：`id`（帖子 id）、`at`（ISO UTC）、`kind`（`global` | `banked` | `announce` | `denied` | `fix`）、`url`、`quote.en` / `quote.zh`。可选 `statedAt`、`day`（帖子自标的挑战日）、`confirm`（同一轮重置的推送确认帖）。
- `sites[]`：相关站点。`desc` 与 `tags` 都是 `{ en, zh }`。

事件按 `at` 升序放。页面上倒序展示。时间用帖子的 `created_at`，和请求里写的整分钟一致。

## 合并新事件

```bash
node scripts/codex-reset-refresh.mjs path/to/incoming.json
node scripts/codex-reset-refresh.mjs path/to/incoming.json --dry
```

`incoming.json` 可以是事件数组，也可以是下面这种对象（字段都可选，至少要有 `events`、`sites`、`challenge` 之一）：

```json
{
  "events": [
    {
      "id": "123",
      "at": "2026-10-27T05:00:00.000Z",
      "kind": "global",
      "url": "https://x.com/thsottiaux/status/123",
      "quote": { "en": "Day 22/ Reset", "zh": "第 22 天 / 重置" }
    }
  ]
}
```

- 同一个 `id` 再导入会更新，不会多出一条。新事件必须有 `at`、`kind`、`url`、`quote.en`；更新时没给的字段保留原值，空的 `quote` 不会把已有译文擦掉。
- 站点按 URL 合并（忽略末尾斜杠）。已有站点不会被删。
- `kind` 不在五种之内、时间解析失败、文件读不了：打印警告，**不改**已有数据，退出码 0。
- 无法识别的参数：退出码 1。
- `--dry` 只打印将要新增和更新的数量。
- 同一份输入连续跑两次，第二次打印「无变化」，不写文件。
