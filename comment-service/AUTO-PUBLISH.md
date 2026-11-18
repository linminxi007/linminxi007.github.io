# Render：启用匿名评论自动发表

本次修改默认仍使用人工审核。生产环境只需设置服务端变量并部署新代码：

1. 打开现有 Render 评论服务，确认连接仓库为 `linminxi007/linminxi007.github.io`、部署分支为 `main`。
2. 在 **Environment** 新增或更新 `COMMENT_MODERATION`，Value 填 **auto**（不加引号）。保存。
3. 选择 **Manual Deploy → Deploy latest commit**；若保存变量已触发部署，等待该次部署完成即可。保留当前已工作的 Docker 配置、Neon 连接、Turnstile 密钥及其他环境变量。
4. 查看启动日志，确认出现 `Annotation service listening. Comment moderation: auto.`，服务健康。
5. 访问 [健康检查](https://linminxi007-github-io.onrender.com/health)，应返回 `{"ok":true}`；访问 [公开配置](https://linminxi007-github-io.onrender.com/v1/config)，确认 `"moderation":"auto"`。
6. 刷新任意笔记页，完成真实 Turnstile 验证并提交一条正常评论，应显示 **Comment published.**。在另一个浏览器或无痕窗口刷新同一页面，确认评论和回复均公开可见。

## 行为与历史数据

| 服务端变量 | 新评论和回复 | 历史评论 |
| --- | --- | --- |
| 未设置或 `manual` | 写入 pending，等待管理员审核 | 原状态不变 |
| `auto` | 通过校验、限流和 Turnstile 后写入 approved，立即公开 | 原状态不变 |

只有服务器决定状态。前端传来的 status 或 moderation 不参与批准。输入长度、每 IP/访客限流、一次性验证、CORS、安全响应头及纯文本 XSS 防护继续生效。

没有数据库重建、schema 修改或批量状态更新；已有 pending 不会自动批准，也不会删除。重试原提交仍返回原 ID 和原状态。自动模式下向旧 pending 线程回复会返回 409，先通过保留的管理员 API 批准祖先评论后才能公开回复，不会暗中批准旧评论。

管理员 API/CLI 保持原样，仍可将垃圾评论设为 rejected；没有新增管理员网页。评论 ID、原文锚点、右侧卡片、文末讨论和回复继续共用同一条数据库记录。

## 验证及回退

本地服务端测试使用真实 PGlite PostgreSQL 引擎，覆盖 auto/manual、伪造状态、失败验证、限流、匿名回复、跨访客读取、重启和历史数据保持。浏览器测试覆盖立即公开提示、刷新及跨浏览器回复同步、XSS 文本、双向原生拖选和图标跨留白点击。Turnstile 使用测试替身，因此上线后第 6 步用于验证真实 Cloudflare 配置。

回退审核策略：将 Render 变量改为 `COMMENT_MODERATION=manual` 并重新部署，只影响后续提交。已有 approved 不会自动转为 pending。修改前的代码保存在 `backup/before-auto-comments-20261118` 分支（`5f8bcff`），并另有源码 ZIP。源码备份不等于数据库备份；本次没有读取或改写生产评论。
