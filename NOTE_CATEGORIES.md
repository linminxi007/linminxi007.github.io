# Notes classification / 笔记分类规范

本网站使用 5 个主分类。文章可跨分类，但通常最多选 2 个，按主要研究问题排序；不再把单独的数学工具或实验关键词当作一级分类。

| 分类（源文件 YAML） | 英文显示 | 范围 |
| --- | --- | --- |
| 电子转移与电化学 | Electron Transfer & Electrochemistry | Marcus / FGR / ET、重组能、电极电势、双电层 |
| 光谱与界面 | Spectroscopy & Interfaces | SFG、SHG、SHS、光学界面探测、纳米孔光谱 |
| 统计物理与动力学 | Statistical Physics & Dynamics | 涨落、关联、复杂系统、溶剂动力学 |
| 人工智能与机器学习 | AI & Machine Learning | GNN、SO(3) 等变网络、Agent 与智能算法 |
| 机器人与自动化 | Robotics & Automation | 机器人视觉、坐标变换、目标追踪与自动控制 |

## 使用规则

1. `notes/*.md` 或 `notes/*.qmd` 的 YAML `categories` 是唯一权威源；不要在网页 HTML 中手工改动分类。
2. 中英译稿使用同样的中文源标签；网站的 `assets/site.js` 中 `topicNames` 负责英文翻译。
3. `Rotate` 按文章主题分别并入光谱、AI 或机器人；`Spectrum` 和 `SFG` 合并到光谱与界面；`agent` 和 `AI` 合并到 AI 与机器学习。
4. `dynamics` 类的跨学科笔记归入统计物理与动力学；ET 溶剂模型可以另外标注电子转移与电化学。
5. 双语内容的文件名和 `translation-key` 保持不变，以保留原 URL、切换语言关系和站内链接。

修改分类后运行 `quarto render` 并检查首页与 Notes 分类菜单的中英文显示。
