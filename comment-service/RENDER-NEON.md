# Render / Neon：修复连接串导致的 EINVAL

## 原因与修复

`pg-connection-string` 将以 `/` 开头的输入视为 Unix socket 路径。因此，若从 Neon
复制连接串时漏掉 `postgresql:`，剩余的 `//...` 就不会按正常 TCP URL 处理。
旧代码直接把环境变量交给 `pg.Pool`，既没有检查协议，也没有阻止 socket/主机覆盖参数。
这与日志中连接 `.s.PGSQL.5432` 并抛出 `EINVAL` 的现象一致。
实际 Render 环境值未被本次工作读取，仍需在控制台确认。

现在会在创建连接池、解析证书或访问网络之前校验协议、主机、端口、数据库、
用户名/密码是否存在，以及是否含有歧义参数。无效输入只会产生固定、可操作的说明，
不会输出 URL、用户名、密码、证书路径、原始错误详情或堆栈。

校验通过只证明格式正确，不证明密码有效或数据库可达。

连接池继续使用 `pg`，保留提供者的 CA / 客户端证书参数；在 URL 中将 `require`
升级为 `verify-full`，完成解析后显式开启证书校验，并避免连接串再次覆盖该选项。
没有关闭 TLS 验证。`channel_binding=require/prefer` 会开启 `pg` 的
`enableChannelBinding`，在服务器提供时使用 SCRAM-SHA-256-PLUS；这并不宣称实现
libpq 对 `require` 的严格“服务器不提供即拒绝”语义。

## 你需要在 Neon 完成的操作

1. 在 Neon Console 选择正确项目、分支和数据库角色。将之前暴露的数据库密码重置；
   旧密码按已泄露处理，不应继续使用或仅仅从日志中隐藏。
2. 点击 **Connect**，确认分支、数据库和角色都正确。
3. 关闭 **Connection pooling**，复制 **Direct connection** 的完整连接串。
   本 Docker 容器启动时会先迁移，因此此处推荐使用 Direct URL；不要只复制 `//` 后的部分，
   也不要复制整个 `psql '...'` 命令。保留 `postgresql://` 或 `postgres://` 前缀。
4. 保留 SSL 参数。若手动更改密码中的特殊字符，必须正确进行 URL 百分号编码；
   优先直接复制 Neon 生成的新连接串，避免手动拼接或重复编码。
5. 将同一旧密码的其他使用方也更新。不要把新连接串粘贴到 Git、工单、聊天或公开日志中。
   如果历史公开日志仍显示旧凭据，删除/限制其访问；这不能代替密码轮换。

Neon 官方说明：[复制完整连接串](https://neon.com/docs/connect/connect-from-any-app)、
[迁移推荐使用 Direct 连接](https://neon.com/docs/connect/connection-pooling)、
[角色和密码管理](https://neon.com/docs/manage/roles)。

## 你需要在 Render 完成的操作

打开已能成功构建 Docker 镜像的服务，保留当前已工作的构建目录/上下文配置。
在 **Environment** 中逐项配置以下内容。尖括号是说明占位符，不能原样使用：

```text
DATABASE_URL=<full Neon connection string, including postgresql://>
TURNSTILE_SITE_KEY=<Cloudflare public key>
TURNSTILE_SECRET=<Cloudflare private key>
ALLOWED_ORIGINS=https://linminxi007.github.io
ADMIN_TOKEN=<random secret of at least 32 characters>
RATE_SECRET=<different random secret of at least 32 characters>
PORT=8080
TRUST_PROXY=off
```

- `DATABASE_URL` 的 **Value** 里只放完整 URL，不要再写 `DATABASE_URL=`，不要加包裹引号，
  不要遗漏前缀，不要换行。用户名、密码、主机和数据库名均须来自你当前的 Neon 连接信息。
- 使用刚轮换的新密码；`ADMIN_TOKEN` 和 `RATE_SECRET` 使用不同的随机值。
  已在用的 `RATE_SECRET` 不要无故轮换，以免使匿名访客的私人待审凭据失效。
- 在服务设置里清空 **Docker Command** 覆盖项，让 Dockerfile 的 `CMD` 生效。
  它必须是：

  ```dockerfile
  CMD ["sh", "-c", "node src/migrate.mjs && exec node src/main.mjs"]
  ```

- 保存环境变量，选择 **Manual Deploy → Deploy latest commit**（或等待已开启的自动部署）。
  迁移失败会以非零状态退出，不会继续启动 API。迁移是幂等的，现有 schema 和用户数据保留。
- 成功日志应依次出现 `Annotation schema ready.`、
  `Annotation service listening. Moderation is required.`，然后 Render 服务变为健康。
- 访问 Render 提供的 HTTPS 服务地址加 `/health`，应返回 `{"ok":true}`。
  `/v1/config` 应返回公开 Turnstile site key；不要把私钥放到前端配置。
- 后端健康后，再将网站 `assets/inline-comments-config.json` 的 `apiBase` 设为该 HTTPS 地址，
  另行发布并测试真实的匿名提交、审核和回复。本次数据库修复不修改前端或网站 UI。

启动覆盖项依据：[Render Docker 文档](https://render.com/docs/docker)。
SSL 配置依据：[node-postgres SSL 文档](https://node-postgres.com/features/ssl)。

## 安全错误分类

| category | 常见安全代码 | 排查方向 |
| --- | --- | --- |
| `malformed-connection-string` | `DATABASE_URL_INVALID`, `EINVAL` | 完整协议、主机、端口、数据库、凭据和 URL 编码。 |
| `dns-resolution` | `ENOTFOUND`, `EAI_AGAIN` | Neon 主机名是否正确、DNS 与网络是否可用。 |
| `connection-timeout` | `ETIMEDOUT`, `UNKNOWN` | Neon compute 状态、网络、`connect_timeout`（1–120 秒）。 |
| `authentication` | `28P01`, `28000` | 密码轮换后 Render 是否已更新，是否选择了正确角色。 |
| `tls-certificate` | `ERR_TLS_CERT_ALTNAME_INVALID`, `CERT_HAS_EXPIRED` | 主机、CA/证书、运行时信任链；保持校验开启。 |
| `database-unavailable` | `ECONNREFUSED`, `57P03`, `3D000` | 选定数据库是否存在、compute、连接限制与网络。 |
| `missing-schema` | `42P01`, `42703` | 确认迁移先于主进程成功执行，连接的是同一数据库。 |
| `permissions` | `42501` | 数据库角色能否创建/访问 `academic_*` 表。 |

日志只包含允许列表中的分类和错误代码。未知上游代码显示为 `UNKNOWN`。
不要通过打印 `process.env`、完整 error 对象或连接池配置来排障。

## 本次验证的边界

不需要也未使用真实 Neon 凭据。本地测试覆盖虚构 URL 校验、连接池创建前拒绝、
TLS 参数、防泄露、错误分类、迁移重复执行且保留既有评论、迁移后启动真实 HTTP API，
以及原有评论服务测试。数据库集成测试使用真实 PGlite PostgreSQL 引擎；不是对你在
Neon 的数据库、Render 网络/TLS 或生产容器成功启动的证明。

本机没有 Docker 可执行文件，因此通过 Node 子进程运行同样的迁移/启动入口验证失败退出，
并检查 Dockerfile 精确命令；没有声称执行过 Docker 镜像启动测试。
只有你轮换密码、更新环境并确认上述日志与 `/health` 后，才能认定生产部署成功。
