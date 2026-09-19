---
title: "机器人自动瞄准中的坐标变换"
date: 2026-09-14
description: "记录 RoboMaster 坐标系变换与目标追踪。"

categories:
  - 坐标系的旋转
  - Robot视觉

lang: zh-CN
translation-key: Robot-vision-and-automatic-aiming
status: working
draft: false
---

# 相机锁定自动瞄准

## 自动瞄准系统交互效果呈现（请点击）

你可以拖动瞄准的目标,看到计算的相机屏幕上目标的投影

<a href="../files/robo/robomaster_coordinate_transform_matrix_tracker_latest_version.html" target="_blank"> 打开 ↗ </a>

<a href="../files/robo/robomaster_coordinate_transform_matrix_tracker_latest_version.html" download> 下载 HTML ↓ </a>\[1\]

在 **RoboMaster** 机器人比赛中，我们经常需要使用**坐标系变换**方法，实现对高速平移、旋转目标的识别、定位与自动瞄准。

这是我本科阶段参与的一个机器人比赛项目，我主要负责机械设计以及部分电子工程工作。其中让我最满意的是设计了一套小巧的**云台结构**，通过合理的质量分布和重心控制，使整个系统保持了良好的稳定性，同时兼顾了体积和运动性能。

后来在学习 **SFG/SHS** 实验中的分子光谱分析时，我发现其中的思想与机器人自动瞄准系统存在一定的相似性：

**实验中，我们通过光谱信息确定分子坐标系，再利用坐标变换将其转换到实验室坐标系；而 RoboMaster 自动瞄准系统中，同样需要通过不同坐标系之间的转换，将目标在相机坐标系中的位置转换到机器人控制系统中的参考坐标系。**

因此，我按照**矩阵变换**的基本原理，将这个自动瞄准系统重新整理为一个交互式 HTML 文件，用于展示坐标变换、旋转矩阵以及目标追踪过程。

这一过程也为后续理解球坐标系中的 **ZYZ 欧拉角旋转**、**D 矩阵**、**d Wigner 矩阵**以及 **Wigner-Eckart 定理**等内容提供了一些直观基础。

如需查看相关参考资料，请跳转至文末：

[跳转到参考链接 ↓](#references)

![](../assets/images/robo/1.png)

![](../assets/images/robo/2.png)

这里放置两个比赛视频。\[3\]\[4\]

------------------------------------------------------------------------

## 与 SO(3)、SHS/SFG 中坐标系选择的关联

这个自动瞄准项目实际上可以理解为：**摄像头首先在二维图像中看到目标的位置和大小，再利用相机模型和坐标变换，把图像中的像素信息解算成相机坐标系中的目标方向或空间位置，最后再转换到云台或机器人坐标系中，计算云台应该转动多少角度才能重新锁定目标。** 如果目标的真实尺寸已知，那么目标在图像中的大小还可以提供距离信息；在最简单的针孔相机近似下，目标实际尺寸为 (L)，焦距为 (f)，图像中的投影尺寸为 (l)，则深度可以近似写成

$$
Z \approx \frac{fL}{l}.
$$

更一般地，相机从三维坐标到二维像素坐标的投影可以写成

$$
s
\begin{pmatrix}
u\\
v\\
1
\end{pmatrix}
=
K
\begin{pmatrix}
R & \mathbf{t}
\end{pmatrix}
\begin{pmatrix}
X\\
Y\\
Z\\
1
\end{pmatrix},
$$

其中 (K) 是相机内参矩阵，(R) 是旋转矩阵，(\mathbf{t}) 是平移向量。相机坐标系中的目标位置进一步转换到云台或机器人参考坐标系时，可以写成

$$
\mathbf{r}_{\mathrm{robot}}
=
R_{\mathrm{robot}\leftarrow\mathrm{camera}}
\mathbf{r}_{\mathrm{camera}}
+
\mathbf{t}_{\mathrm{robot}\leftarrow\mathrm{camera}},
$$

其中旋转部分满足

$$
R_{\mathrm{robot}\leftarrow\mathrm{camera}} \in SO(3),
\qquad
R^{T}R=I,
\qquad
\det R=1.
$$

因此，自动瞄准和 **SO(3)** 的直接联系就是：**云台、相机和目标之间的方向变化，本质上都是三维空间中的旋转；不同坐标系之间的方向变换由 (SO(3)) 的旋转矩阵描述。** 这和 **SHS/SFG** 中选择分子坐标系与实验室坐标系的数学结构非常相似。比如分子坐标系中的二阶超极化率张量 $\beta_{ijk}^{\mathrm{mol}}$ 转换到实验室坐标系时，可以写成

$$
\beta_{IJK}^{\mathrm{lab}}
=
\sum_{ijk}
R_{Ii}R_{Jj}R_{Kk}
\beta_{ijk}^{\mathrm{mol}}.
$$

如果改用球张量表示，同一个旋转则可以写成

$$
T_{m}^{(l),\mathrm{lab}}
=
\sum_{m'}
D_{mm'}^{(l)}(R)
T_{m'}^{(l),\mathrm{mol}},
$$

其中 $D_{mm'}^{(l)}(R)$就是 **Wigner (D) 矩阵**。所以两者真正共同的地方不是“摄像头”和“光谱”本身，而是：**我们首先在一个最自然的局域坐标系中描述对象，然后利用 (SO(3)) 旋转把这些量变换到实验室或控制系统真正使用的坐标系中。** 区别在于，自动瞄准主要变换的是目标位置、方向等几何向量，并最终解算 yaw/pitch 控制量；而 SHS/SFG 中主要变换的是分子偶极矩、极化率、超极化率等张量，并且通常还需要对分子的取向分布进行统计平均。因此，机器人中的坐标变换可以看成理解 SHS/SFG 中“分子坐标系 → 实验室坐标系 → 偏振可观测量”这一过程的一个很直观的经典几何类比。

------------------------------------------------------------------------

# 参考链接

\[1\] 自动瞄准系统交互式 HTML：`../files/robo/robomaster_coordinate_transform_matrix_tracker_latest_version.html`

\[2\] RoboMaster 官方频道：\
https://www.youtube.com/@RoboMaster/featured

\[3\] 比赛相关视频 1：\
https://www.bilibili.com/video/BV1nX9kBxEaN/

\[4\] 比赛相关视频 2：\
https://www.bilibili.com/video/BV1JconBaEkC/