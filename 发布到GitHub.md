# 发布到 GitHub Pages

这版已经包含 `.github/workflows/publish.yml`，采用直接上传 Pages artifact 的工作流，不使用 `gh-pages` 分支。

## 1. 本机先检查

在 `_quarto.yml` 所在目录运行：

```powershell
quarto render
```

确认完整构建成功。不要在错误还未修复时直接指望服务器自动解决。

## 2. 确认账户和地址

如果 GitHub 用户名确实是 `linminxi007`，个人主页仓库命名为 `linminxi007.github.io`，网站地址为：

```text
https://linminxi007.github.io/
```

这只是配置目标，不表示本项目包已经替你验证账户所有权或创建网站。
如果用户名不同，需要改 `_quarto.yml` 的 `website.site-url`，并使用你自己的 GitHub 用户名和仓库地址。
界面名字仍然可以保留 `linminxi007`，它与 GitHub 账户名不是同一个设置。

## 3. 创建 / 使用仓库

### 全新空仓库

在 GitHub 新建 Public 仓库，不自动生成 README、.gitignore 或许可证，以免和本地已有文件冲突。
在项目根目录执行：

```powershell
git init
git add .
git commit -m "Create Reading Room website"
git branch -M main
git remote add origin https://github.com/linminxi007/linminxi007.github.io.git
git push -u origin main
```

最后两行的用户名要与你自己的账户对应。`git add .` 会暂存项目里的公开文件，提交前用 `git status` 检查不要包含隐私内容。
如果 Git 提示缺少 user.name 或 user.email，使用你自己的 GitHub 提交身份配置；不要直接复制别人的姓名或邮箱。需要隐私时可以使用 GitHub 为你提供的 noreply 邮箱。

### 已经存在内容的远程仓库

不要在另一个全新的本地 Git 历史上强推覆盖远程，也不要删除旧笔记。
推荐先克隆现有仓库到一个新的工作目录，再把本包的源码复制进去，保留原仓库的 `.git` 和你的真实内容。

本包里的 `.github/workflows/publish.yml` 取代旧版同名发布脚本。如果以前另有不同文件名的发布工作流，要停用重复的旧流程，避免两个工作流同时发布。
检查 `git diff` 后再提交和推送。

## 4. 设置 Pages 来源 —— 这一步与旧版不同

GitHub 仓库中：

```text
Settings → Pages → Build and deployment
Source: GitHub Actions
```

不是“Deploy from a branch”，也不是选择 `gh-pages`。
新工作流不需要先在本机运行 `quarto publish gh-pages`。

如 Pages 原来使用 gh-pages，可保留历史分支，但切换来源到 GitHub Actions。本工作流只读取 main 源码并部署构建产物，不向 main 或 gh-pages 写入网站输出。

工作流已显式申请 `contents: read`、`pages: write`、`id-token: write`，无需为了这版工作流把整个仓库的默认权限放宽到 contents write。如果组织禁用了 Actions 或设置了部署审批，则仍需按照相应权限要求处理。

## 5. 发布与查看

第一次可以在仓库 `Actions → Publish Reading Room → Run workflow` 手动触发，或者推送一次 main 提交。
工作流会安装固定版本 Quarto、执行 `quarto render`、上传 `_site/`，再部署 GitHub Pages。
等待 build 和 deploy 两个任务完成后，在 Settings → Pages 中查看实际网站链接。

如果失败，打开失败的步骤，复制最前面的实质错误及其上下文。未取得成功状态前，不要把“源码上传成功”等同于“网站上线成功”。

## 以后怎么更新

```powershell
quarto render
git status
git add .
git commit -m "Update notes"
git push
```

也可通过 VS Code 的 Source Control 暂存、提交与同步。
GitHub 收到 main 分支更新后会执行完整构建，因此网页列表和反向链接会一起刷新。

公网发布需要网络、你的 GitHub 账户授权以及相应仓库权限。本项目包本身不会代替你完成这些授权。

## 官方依据

- Quarto GitHub Pages： https://quarto.org/docs/publishing/github-pages.html
- GitHub 自定义 Pages 工作流： https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Quarto 的自定义 HTML 模板： https://quarto.org/docs/reference/formats/html.html
- Quarto Lua 文档及项目路径接口： https://quarto.org/docs/extensions/lua-api.html
- Quarto 官方版本信息： https://quarto.org/docs/download/_download.json

文档核对日期：2026-09-13。GitHub 托管环境的实际部署尚未在你的账户中执行。
