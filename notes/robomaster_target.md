---
title: "RoboMaster 坐标变换"
date: 2026-09-14
description: "记录 RoboMaster 坐标系变换与目标追踪。"

categories:
  - RoboMaster的自动瞄准

lang: zh-CN
translation-key: robomaster-target
status: working
draft: false
---

# 相机锁定自动瞄准

在Robomaster机器人比赛中,我们经常用到坐标系变化,锁定某些高速平移旋转的特定目标. 

这也是我本科时候打的一个比赛,我负责机械设计和部分电子工程.我最得意是设计了一个小巧的云台,重心保持的很好,很漂亮很小巧.

我感觉这和在SFG/SHS实验中用光谱去瞄准分子坐标系,再把分子坐标系转化为实验室坐标系有点相似.于是按照矩阵变化的原理写了这个自动瞄准系统的html文件.
这也为后续的球坐标系下的ZYZ顺规下的旋转,D,d Wigner 矩阵,Wigner-Eckart的引入提供了基础理解.
![](../assets/images/robo/1.png)

![](../assets/images/robo/2.png)

这里放置两个视频

https://www.bilibili.com/video/BV1nX9kBxEaN/?spm_id_from=333.337.search-card.all.click&vd_source=d39494fb97a12e0146dd0452b51b53e9

https://www.bilibili.com/video/BV1JconBaEkC/?spm_id_from=333.337.search-card.all.click&vd_source=d39494fb97a12e0146dd0452b51b53e9

如果你想了解这个比赛是什么

https://www.youtube.com/@RoboMaster/featured

# 自动瞄准系统交互效果呈现(请点击)

<a href="../files/robo/robomaster_coordinate_transform_matrix_tracker_latest_version.html"
   target="_blank">
  打开交互式结果 ↗
</a>

<a href="../files/robo/robomaster_coordinate_transform_matrix_tracker_latest_version.html"
   download>
  下载 HTML ↓
</a>