// 构建期公开配置。Client Secret 不在这里，只在 Cloudflare Worker 的 secret 里。
const id = (import.meta.env.PUBLIC_GITHUB_CLIENT_ID || '').trim();
const worker = (import.meta.env.PUBLIC_GITHUB_WORKER_URL || '').trim().replace(/\/$/, '');
export const githubClientId = /^[A-Za-z0-9._-]{8,100}$/.test(id) ? id : '';
export const githubWorkerUrl = /^https:\/\/\S+$/.test(worker) ? worker : '';
/** 两个都有值才显示「使用 GitHub 登录」。缺一则站点保持纯 localStorage。 */
export const githubSyncConfigured = Boolean(githubClientId && githubWorkerUrl);
