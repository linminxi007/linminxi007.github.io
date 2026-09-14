# linminxi007 · Reading Room V3.1

单一完整项目：以 V3 的笔记、阅读布局与 AA 设置为基础，合入房子导航、V2 按钮与修订后的明暗配色。

解压后，用 VS Code 打开直接含 `_quarto.yml` 的文件夹：

```powershell
quarto render
quarto preview
```

第一次使用先读 `00-先读这个.md`；内容维护见 `维护说明.md`，发布见 `发布到GitHub.md`，测试范围见 `验证说明.md`。

`notes/` 为笔记，`files/` 为公开附件，`assets/` 为主题与图片，`_theme/` 为模板与索引过滤器。
`_preview/` 是本版 Pandoc 静态快照，正式 Quarto 输出目录仍为 `_site/`。

保留已有文件再迁移：本包只有之前 V3 的演示内容，不包含你电脑上新写的文稿。没有自动翻译任何科研正文。
