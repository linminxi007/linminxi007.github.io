# 本地实现与验收记录

日期：2026-11-18。仓库：`D:\linminxi007.github.io`。
实现分支：`feature/inline-academic-comments`。原版基线：`ab62805`。
旧版备份分支：`backup/before-inline-comments-20261118`。

## 构建与测试结果

| 检查 | 结果 |
| --- | --- |
| `quarto render` | 完整构建成功，59 个输入文件；其中一个草稿被排除，58 个公开页面。 |
| 原有 `tests/analytics.test.cjs` | 16 / 16 通过。 |
| `comment-service/test/service.test.mjs` | 5 / 5 通过。 |
| `comment-service/test/browser.mjs` | 19 个场景通过，使用真实 Edge/Chromium 浏览器。 |
| `comment-service/test/rendered.mjs` | 51 篇研究笔记按需加载批注资源，非笔记页不加载；输出资源与源文件一致。 |
| 原有 `tests/check-analytics-html.py` | 58 个公开页面检查通过，现有统计脚本及资源路径保持正常。 |
| JavaScript 语法检查与 `git diff --check` | 通过。 |
| `npm audit --omit=dev` | 本次查询未报告生产依赖的已知漏洞。 |

后端测试运行真正的 **PGlite PostgreSQL 引擎**和生产 HTTP handler / Store，
不是浏览器数组或 localStorage 数据库。磁盘持久化测试关闭并重新打开数据库和
HTTP 服务，确认同一评论 ID、引文、审核状态和回复仍可读取。

Turnstile 的浏览器组件和测试 HTTP 验证在测试 harness 中替换为测试实现；生产
入口没有 CAPTCHA 绕过开关。生产验证函数的 hostname/action 拒绝逻辑另有测试。

## 浏览器验收场景

1. 原生鼠标拖选保留选区，并显示 `Comments`。
2. 英文选区入口默认透明度 0.8；不会改变文章高度或文字流。
3. 桌面面板位于正文右侧，无正文覆盖或页面横向滚动。
4. 匿名发布通过真实本地 API 落库，两处视图使用同一 ID，HTML 注入保持为文字。
5. 另一匿名访客看不到待审内容。
6. 重载后恢复评论与锚点，底部引文可返回原文，内联标记可打开回复线程。
7. 邻近段落变化仍能定位；删除原文后保留讨论并标为未定位。
8. 中文跨行选区的引文与末尾按钮位置正确。
9. 不划选、点击段落旁图标，可评论整个段落。
10. 代码选区不会触发；数学选区采用完整段落回退，MathML 内容未被改写。
11. 正文普通链接保持原有跳转。
12. 1024、820、390px 视口，深色模式、较大字号、收起目录均无横向溢出。
13. 多段选区可以定位；重复且没有可区分上下文的引文不进行猜测。
14. 删除重复段落的一份，不会错误挂接到另一份。
15. 折叠和纯空白选区不显示入口；快捷键和 Escape 可用。
16. 模拟“服务器已保存、浏览器丢响应”，保留草稿；重试复用 ID，数据库只保存一条。
17. 后端未配置时明确说明，并禁用提交。
18. 后端不可用时保留文章可读性，不声称提交成功。
19. 在真实中英文 Quarto 笔记页检查主题、字号、目录和搜索，并生成桌面/手机截图。

服务端另外验证了：昵称/内容/锚点限制、请求大小限制、研究笔记白名单、跨来源拒绝、
管理员接口隔离、跨页面和未授权待审回复拒绝、共享数据库限流、验证 token 重放拒绝、
审核父评论后子线程的可见性，以及公开 JSON 不泄露访客哈希或原始网络信息。

## 实现范围

新增文件：

- `assets/inline-comments.js`
- `assets/inline-comments-anchors.js`
- `assets/inline-comments.css`
- `assets/inline-comments-config.json`
- `comment-service/`：生产 API、SQL schema、迁移/审核 CLI、Dockerfile、锁文件、白名单、测试和部署说明。
- `.github/workflows/comment-tests.yml`

已有文件只修改了 `_theme/page.html` 的 5 行条件资源引用，以及 `.gitignore`。
原有 `site.js`、`site.css`、`site.lua`、Quarto 配置、网站导航、关于页和笔记正文未修改。

## 仍需真实部署后验证

- 尚未创建公网 API、托管 PostgreSQL、Turnstile 生产 widget 或管理员密钥。
- 尚未验证真实 Cloudflare challenge、托管数据库的网络连接/TLS、反向代理、自动备份与恢复。
- 当前数据库测试使用嵌入式 PostgreSQL 引擎；生产 `pg` 网络适配器应在选定服务上做上线冒烟测试。
- 新 GitHub Actions 测试工作流尚未在 GitHub 执行；当前报告是本地测试结果。
- 浏览器验证为 Edge/Chromium，未覆盖 Safari/Firefox 和所有屏幕阅读器。
- 评论按纯文本安全呈现，不执行 HTML 或渲染评论中的 Markdown/LaTeX。
- 定位采用保守策略：无法可靠区分的重复引文或变化过大的公式会保留在讨论区，显示未定位。
- 清除 sessionStorage / 结束浏览器会话后，访客不能再查看属于原匿名凭据的私人待审评论；已审核评论不受影响。

构建中原有的中文语言包警告，以及 `planar_Au_HfO2_SFG_proposal` 中 `\rm` 公式回退
警告仍存在；相关内容未在这次改动中修改。

按照用户“先完成可部署代码和本地验证”的选择，`main` 和线上网站保留旧版。
接入后端前，`assets/inline-comments-config.json` 保持 `apiBase` 为空。
部署步骤、所需环境变量、管理审核方式及回滚方法见同目录 `README.md`。
