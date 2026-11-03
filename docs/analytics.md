# GA4 管理与验证

Stream name: `minxi website`；Stream ID: `16260408262`；Measurement ID: `G-NW39FZTLSN`。共享模板加载 `assets/analytics.js`，访客同意后初始化 GA4。全部 Quarto 页面覆盖，PDF、图片及附件本身不执行统计脚本。

## 首次上线后的后台设置

1. GA4 → Admin（管理）→ Data streams（数据流）→ Web 数据流 → Enhanced measurement（增强型衡量）的齿轮 → Page views（网页浏览）→ Advanced settings（高级设置），**关闭 Page changes based on browser history events（基于浏览器历史记录事件的网页变化）**。保留 Page loads。本站 `site.js` 有时仅用 `history.replaceState` 切换界面语言；这不应计为新一次阅读。真实的中英文文章跳转会加载新页面并正常计数。这个配置保存在 Google 后台，仓库代码不能替你修改。
2. Admin → Custom definitions → Create custom dimension，创建三个 **Event（事件）作用域**维度：`Note path` → 参数 `note_path`；`Note title` → `note_title`；`Scroll percent` → `scroll_percent`。参数区分大小写。阈值是分类维度，不要把 25/50/75/90 相加当成阅读完成率。标准页面路径和标题可用于替代前两个自定义维度，避免重复占用配额。
3. Admin → Data retention 中检查事件数据保留期限；按自己的需要选择，代码未修改此项。Google Signals 与广告相关选项在本站代码中关闭。

官方文档：[page views](https://developers.google.com/analytics/devguides/collection/ga4/views)、[basic consent mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic)、[custom dimensions](https://support.google.com/analytics/answer/14239696)。

## 查看每篇 Note

在 Reports → Engagement → Pages and screens（网页和屏幕）选择页面路径维度，筛选 `/notes/`；查看 Views、Active users 和 Average engagement time。报告菜单可能因属性采用的报表集合不同而变化，可在 GA4 搜索框搜索 Pages and screens。

平均互动时长表示前台互动时间，口径依所选指标而定，并非每次打开文章的平均阅读耗时。UV 是估算用户，不能识别某位教授，也不能排除所有机器人。未同意、被拦截或网络不可达的访问不被采集；历史数据不能回填。

来源、国家、设备分别见 Acquisition、Demographic details、Tech details。代码仅保留来源 origin、移除页面查询参数和片段；不采集站内搜索词，UTM 查询参数也不保留，因此不会按这些参数归因自定义推广活动。

## 阅读深度

自定义事件为 `note_scroll_depth`，参数有 `note_path`、`note_title`、`scroll_percent`。只在 `body.reading-page` 且 URL 属于 `/notes/` 且存在 `.reading-sheet .article-body` 时采集，目录页不采集。

计算定义：`clamp((viewportHeight - bodyRect.top) / bodyRect.height, 0, 1)`。分母只包含正文，排除标题、导航、关联阅读及页脚。阈值是正文被视口下缘触及的位置，不能证明读完；短文可能首屏就达 90%，跳转章节也可能一次跨多个阈值。后台标签页不采集。字体或图片改变正文尺寸时会重新测量。

每个 URL 的每个阈值在当前标签页 sessionStorage 会话内最多发一次，刷新、同标签往返或中英文切回不会重复。新标签页/会话可以重新采集。浏览量本来就会随刷新增加，不与阈值采用同一去重口径。浏览器禁止 sessionStorage 时，只能在当前文档生命周期内去重。

在 Explore → Free form 里选 Event name、Note path、Scroll percent 和 Event count，筛选事件名。注册维度后通常需要 24–48 小时形成报表。事件数是去重的标签页阈值次数，不能直接除以包含刷新/回访的总 Views 作为严格的完成率。使用同一事件里 90% 与 25% 的次数比，可以描述已经到达 25% 的访问中有多少进一步到达 90%；新开文档/标签页和存储限制仍会影响口径。

GA4 原生的 90% `scroll` 与此事件不同；本站不手动发送名为 `scroll` 的事件。保留原生事件也不会合并两者；分析时按事件名筛选。

## Realtime / DebugView

1. 打开线上首页或 Note，点击“允许”，在 Realtime 查看 `page_view`。
2. 给任意线上 Note 加 `?analytics_debug=1`，同意后滚动正文，在 Admin → DebugView 查看 `note_scroll_depth` 的三个参数。可以先用一篇未读过的 Note；同一标签页已达到的阈值不重发。新的独立标签页会话或新浏览器会话可重新验证。
3. 普通访问不设置 `debug_mode`。预览主机默认禁止统计；只有显式加上 `?analytics_debug=1` 并同意，才允许发测试数据。调试访问仍会进入属性，是否排除取决于 GA4 的开发者流量过滤器。
4. 若无数据，检查同意状态、部署完成情况、广告拦截及 Google 域名是否在当前网络可达；不要把前端排队成功当成 GA4 已收到。可使用 Google Tag Assistant 进一步验证。
5. 页脚“统计设置”可撤回，删除本站可访问的 GA Cookie 并刷新；其他标签页会通过 storage 事件同步停止。

## 本地检查与 Windows 同步

```powershell
cd D:\linminxi007.github.io
git status
# 确认没有与本次改动冲突的本地未提交修改后再同步：
git pull --ff-only origin main
node --test tests/analytics.test.cjs
quarto render
python tests/check-analytics-html.py
quarto preview
```

本次远程环境无法访问 Windows D 盘；云端推送不会自动更新 D 盘副本。不要在存在未提交修改时强制覆盖。
