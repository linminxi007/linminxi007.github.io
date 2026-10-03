---
title: "From Path Integrals to Non-Equilibrium Fermi Golden Rule"
date: 2026-09-14
description: "从费曼路径积分到非平衡费米黄金法则。"

categories:
  - Electron transfer
  - Electrochemistry

lang: zh-CN
translation-key: Path-Integrals-Fermi-Golden
status: working
draft: false
---

# 1. 从传播子开始：粒子如何从一个核构型到另一个核构型？

考虑一个简单的核自由度：

$$
R
$$

它可以代表分子中所有核坐标：

$$
R=(R_1,R_2,\cdots,R_N)
$$

量子力学中，一个状态随时间演化：

$$
|\Psi(t)\rangle
=
e^{-\frac{i}{\hbar}\hat H(t-t_0)}
|\Psi(t_0)\rangle
$$

其中

$$
\hat U(t,t_0)
=
e^{-\frac{i}{\hbar}\hat H(t-t_0)}
$$

叫做**时间演化算符（propagator）**。

如果我们关心初始核位置

$$
R_i
$$

经过时间 $t$ 后到达

$$
R_f
$$

那么传播概率振幅为

$$
K(R_f,t;R_i,0)
=
\langle R_f|
e^{-\frac{i}{\hbar}\hat Ht}
|R_i\rangle
$$

这就是传播子。

注意这里是**概率振幅**，而不是概率。

最终概率为

$$
P(R_i\rightarrow R_f)
=
|K|^2
$$

---

## 物理图像

对经典粒子我们一般会想：

> 从 $R_i$ 到 $R_f$，它走哪一条轨迹？

对量子的情况我们应该想：

> 它不是选择一条轨迹，而是所有可能路径同时对最终振幅作贡献。

因此传播子不是一条简单的

$$
R_i\rightarrow R_f
$$

路径，而是

$$
\sum_{\text{all paths}}
(\text{path contribution})
$$

费曼路径积分就是把这个思想数学化。

---

# 2. 从传播子到路径积分

为了得到所有路径，我们把时间切成很多小段：

$$
t=N\epsilon
$$

于是

$$
e^{-\frac{i}{\hbar}Ht}
=
\left(
e^{-\frac{i}{\hbar}H\epsilon}
\right)^N
$$

因此

$$
K
=
\langle x_N|
(e^{-iH\epsilon/\hbar})^N
|x_0\rangle
$$

其中

$$
x_0=x_i,
\qquad
x_N=x_f
$$

现在插入位置完备关系：

$$
1
=
\int dx_n\,|x_n\rangle\langle x_n|
$$

例如当 $N=3$ 时，

$$
\begin{aligned}
K
=
\int dx_1dx_2\,
&\langle x_3|
e^{-iH\epsilon/\hbar}
|x_2\rangle \\
\times\,
&\langle x_2|
e^{-iH\epsilon/\hbar}
|x_1\rangle \\
\times\,
&\langle x_1|
e^{-iH\epsilon/\hbar}
|x_0\rangle
\end{aligned}
$$

所以

$$
\boxed{
K
=
\int
\prod_{n=1}^{N-1}dx_n
\prod_{n=0}^{N-1}
\langle x_{n+1}|
e^{-iH\epsilon/\hbar}
|x_n\rangle
}
$$

这一式首先只是数学上的恒等变换。

它的物理意义是：

我们把一个长时间传播拆成

$$
x_0
\rightarrow
x_1
\rightarrow
x_2
\rightarrow
\cdots
\rightarrow
x_N
$$

然后对所有可能的中间位置全部积分。

---

# 3. 求一个短时间传播子

现在研究单个短时间传播子：

$$
K_\epsilon
=
\langle x_{n+1}|
e^{-iH\epsilon/\hbar}
|x_n\rangle
$$

因为

$$
H=T+V
$$

即

$$
H
=
\frac{p^2}{2m}
+
V(x)
$$

问题在于动能和势能一般不对易：

$$
[T,V]\neq 0
$$

所以不能严格写成

$$
e^{-i(T+V)\epsilon/\hbar}
=
e^{-iT\epsilon/\hbar}
e^{-iV\epsilon/\hbar}
$$

但是当

$$
\epsilon\rightarrow0
$$

时，可以使用 Trotter 展开：

$$
e^{-iH\epsilon/\hbar}
\approx
e^{-iT\epsilon/\hbar}
e^{-iV\epsilon/\hbar}
+
O(\epsilon^2)
$$

也就是

$$
e^{-\frac{i}{\hbar}H\epsilon}
\approx
e^{-\frac{i}{\hbar}\frac{\hat p^2}{2m}\epsilon}
e^{-\frac{i}{\hbar}V(\hat x)\epsilon}
$$

我们来看看为什么可以这样处理

左边展开：

$$
1
-
\frac{i\epsilon}{\hbar}(T+V)
+
O(\epsilon^2)
$$

右边展开：

$$
\left(
1-\frac{i\epsilon T}{\hbar}
\right)
\left(
1-\frac{i\epsilon V}{\hbar}
\right)
$$

得到

$$
1
-
\frac{i\epsilon(T+V)}{\hbar}
-
\frac{\epsilon^2TV}{\hbar^2}
+
O(\epsilon^3)
$$

因此两者的差别从

$$
O(\epsilon^2)
$$

开始。

在极限

$$
N\rightarrow\infty,
\qquad
\epsilon=\frac{t}{N}\rightarrow0
$$

下，可以构造出精确的连续时间传播子。

---

# 4. 插入动量完备关系

现在有

$$
K_\epsilon
=
\langle x_{n+1}|
e^{-i\hat p^2\epsilon/(2m\hbar)}
e^{-iV(\hat x)\epsilon/\hbar}
|x_n\rangle
$$

插入动量完备关系：

$$
1
=
\int dp\,|p\rangle\langle p|
$$

得到

$$
\begin{aligned}
K_\epsilon
=
\int dp\,
&\langle x_{n+1}|p\rangle \\
&\times
\langle p|
e^{-i\hat p^2\epsilon/(2m\hbar)}
|p\rangle \\
&\times
e^{-iV(x_n)\epsilon/\hbar}
\langle p|x_n\rangle
\end{aligned}
$$

利用

$$
\langle x|p\rangle
=
\frac{1}{\sqrt{2\pi\hbar}}
e^{ipx/\hbar}
$$

得到

$$
\begin{aligned}
K_\epsilon
=
\int
\frac{dp}{2\pi\hbar}
&\exp
\left[
\frac{i}{\hbar}px_{n+1}
\right] \\
\times\,
&\exp
\left[
-\frac{i}{\hbar}
\frac{p^2}{2m}\epsilon
\right] \\
\times\,
&\exp
\left[
-\frac{i}{\hbar}
V(x_n)\epsilon
\right] \\
\times\,
&\exp
\left[
-\frac{i}{\hbar}px_n
\right]
\end{aligned}
$$

合并指数：

$$
K_\epsilon
=
\int
\frac{dp}{2\pi\hbar}
\exp
\left[
\frac{i}{\hbar}
\left(
p(x_{n+1}-x_n)
-
\frac{p^2}{2m}\epsilon
-
V(x_n)\epsilon
\right)
\right]
$$

---

# 5. 对动量积分

这是一个 Gaussian 积分。

令

$$
\Delta x
=
x_{n+1}-x_n
$$

指数中与 $p$ 有关的部分为

$$
\frac{i}{\hbar}
\left(
p\Delta x
-
\frac{p^2}{2m}\epsilon
\right)
$$

用点数学技巧 配平方：

$$
-\frac{i\epsilon}{2m\hbar}
\left(
p-\frac{m\Delta x}{\epsilon}
\right)^2
+
\frac{i}{\hbar}
\frac{m(\Delta x)^2}{2\epsilon}
$$

因此积分得到,我们就是想把势能剥离出来

$$
K_\epsilon
=
\sqrt{
\frac{m}{2\pi i\hbar\epsilon}
}
\exp
\left[
\frac{i}{\hbar}
\epsilon
\left(
\frac{m}{2}
\left(
\frac{x_{n+1}-x_n}{\epsilon}
\right)^2
-
V(x_n)
\right)
\right]
$$

这一步是从 Hamiltonian 形式转到 Lagrangian 形式的核心。

---

# 6. 为什么会出现 Lagrangian？

注意在指数中的

$$
\epsilon
\left[
\frac{m}{2}
\left(
\frac{x_{n+1}-x_n}{\epsilon}
\right)^2
-
V(x_n)
\right]
$$

其中

$$
\frac{x_{n+1}-x_n}{\epsilon}
$$

在连续极限中变成速度

$$
\dot x
$$

因此上式变成

$$
\epsilon
\left[
\frac12m\dot x^2
-
V(x)
\right]
$$

定义 Lagrangian：

$$
L(x,\dot x)
=
T-V
$$

于是短时间传播子可以写成

$$
K_\epsilon
=
C
\exp
\left[
\frac{i}{\hbar}L\epsilon
\right]
$$

其中 $C$ 是来自 Gaussian 动量积分的归一化因子。

---

# 7. 回到完整传播子

把所有短时间传播子相乘：

$$
K
=
\int
\prod_n dx_n
\prod_n
K_\epsilon
$$

指数部分为

$$
\prod_n
e^{\frac{i}{\hbar}L_n\epsilon}
$$

指数相乘等价于指数中的作用量相加：

$$
e^{
\frac{i}{\hbar}
\sum_nL_n\epsilon
}
$$

当

$$
N\rightarrow\infty
$$

时，

$$
\sum_nL_n\epsilon
\rightarrow
\int_0^T L\,dt
$$

定义作用量

$$
S[x(t)]
=
\int_0^T
L(x,\dot x)\,dt
$$

因此得到**<u>费曼路径积分</u>**：

$$
\boxed{
K(x_f,t_f;x_i,t_i)
=
\int\mathcal{D}x(t)\,
e^{\frac{i}{\hbar}S[x(t)]}
}
$$

它表示：

> 从初态到末态的量子传播振幅，是所有可能路径振幅的相干叠加。也就是说量子是同时走所有的路.
> 
> 这有一个很好看的视频可以参考:
> 
> How Can Light Travel Everywhere at Once? Feynman’s Path Integral Explained
> https://www.youtube.com/watch?v=ss0HABVUkeQ

每一条路径的权重不是概率，而是复数相位因子

$$
e^{iS/\hbar}
$$

---

# 8. 从单一势能面推广到电子转移

目前我们已经得到

$$
K(R_f,t;R_i,0)
=
\int\mathcal{D}R(t)
\exp
\left[
\frac{i}{\hbar}S[R(t)]
\right]
$$

它描述核自由度在一个给定势能面上的量子传播。

现在考虑电子转移：

$$
D\rightarrow A
$$

此时核不再只在一个势能面上传播，而对应两个不同电子态：

$$
V_D(R)
$$

和

$$
V_A(R)
$$

因此需要在核传播框架中加入两个电子态之间的耦合。

---

# 9. 两电子态 Hamiltonian

引入两个 diabatic 电子态：

$$
|D\rangle,
\qquad
|A\rangle
$$

总波函数写成

$$
|\Psi(t)\rangle
=
\psi_D(R,t)|D\rangle
+
\psi_A(R,t)|A\rangle
$$

Hamiltonian 为

$$
\hat H
=
\begin{pmatrix}
\hat H_D & \Gamma_{DA} \\
\Gamma_{AD} & \hat H_A
\end{pmatrix}
$$

其中

$$
\hat H_D
=
\frac{\hat P^2}{2M}
+
V_D(\hat R)
$$

以及

$$
\hat H_A
=
\frac{\hat P^2}{2M}
+
V_A(\hat R)
$$

而 $\Gamma_{DA}$ 和 $\Gamma_{AD}$ 描述两个电子态之间的电子耦合。

因此可以把总 Hamiltonian 分解为

$$
\boxed{
\hat H
=
\hat H_0+\hat H_I
}
$$

其中

$$
\hat H_0
=
\hat H_D|D\rangle\langle D|
+
\hat H_A|A\rangle\langle A|
$$

描述电子处于固定 diabatic 态时，核在各自势能面上的运动。

相互作用项为

$$
\boxed{
\hat H_I
=
\Gamma_{DA}|D\rangle\langle A|
+
\Gamma_{AD}|A\rangle\langle D|
}
$$

它负责连接两个电子态。

对于封闭的 Hermitian 量子系统，必须满足

$$
\Gamma_{AD}
=
\Gamma_{DA}^{*}
$$

因此一般有

$$
|\Gamma_{AD}|
=
|\Gamma_{DA}|
$$

但二者本身不一定是同一个实数；只有在选取适当相位约定并且耦合可以取实时，才常写成

$$
\Gamma_{AD}
=
\Gamma_{DA}
=
\Gamma
$$

---

# 10. Fermi Golden Rule 的弱电子耦合极限

Fermi Golden Rule 讨论的是**弱电子耦合极限（weak electronic coupling limit）**。

我们可以定义电子转移时间尺度

$$
\tau_{\mathrm{ET}}
$$

它表示一次成功的 $D\rightarrow A$ 转移所对应的平均等待时间尺度。往往可以认为和态之间耦合强度有关系.

因为环境会产生各种涨落，例如：

- 溶剂运动；
- 分子振动；
- 热涨落；
- 局域电场涨落；
- 核坐标涨落。

这些涨落会使电子能隙和相位不断变化，因此我们引入一个相关或退相干时间尺度

$$
\tau_c
$$

在 Golden Rule 极限中通常要求

$$
\boxed{
\tau_{\mathrm{ET}}
\gg
\tau_c
}
$$

也就是说，环境相关性已经衰减很多次之后，才偶尔发生一次真正的电子转移。

因此电子在绝大部分时间中处于

$$
D
$$

或者

$$
A
$$

态，只以较低概率发生跃迁。

需要注意，弱耦合条件不应简单理解为

$$
|\Gamma_{DA}|
\ll
|E_D-E_A|
$$

因为在电子转移真正发生的位置附近，体系恰恰可能满足

$$
E_D\approx E_A
$$

更准确的说法是：

> 电子耦合足够弱，使得态间转移可以作为低阶微扰处理，电子布居变化比环境相关函数的衰减慢。

---

# 11. 引入二阶微扰

定义系统的总 Hamiltonian：

$$
\hat H
=
\hat H_0+\hat H_I
$$

其中

$$
\hat H_0
=
\hat H_D|D\rangle\langle D|
+
\hat H_A|A\rangle\langle A|
$$

以及

$$
\hat H_I
=
\Gamma_{DA}|D\rangle\langle A|
+
\Gamma_{AD}|A\rangle\langle D|
$$

设 $t=0$ 时系统处于 donor 态。

核自由度，例如溶剂构型，其初始密度矩阵记为

$$
\hat\rho_0
$$

因此全系统的初始密度矩阵为

$$
\boxed{
\hat\rho_{\mathrm{tot}}(0)
=
\hat\rho_0
\otimes
|D\rangle\langle D|
}
$$

---

# 12. 转换到相互作用绘景

为了把零阶传播和电子跃迁分离，引入 interaction picture。

密度矩阵满足

$$
\frac{\partial}{\partial t}
\hat\rho_I(t)
=
-\frac{i}{\hbar}
[
\hat H_I(t),
\hat\rho_I(t)
]
$$

其中 interaction-picture Hamiltonian 为

$$
\boxed{
\hat H_I(t)
=
e^{i\hat H_0t/\hbar}
\hat H_I
e^{-i\hat H_0t/\hbar}
}
$$

由于 $\hat H_0$ 在电子态空间中是对角的，可以把它展开为

$$
\hat H_I(t)
=
\tilde V_{DA}(t)
|D\rangle\langle A|
+
\tilde V_{AD}(t)
|A\rangle\langle D|
$$

其中

$$
\boxed{
\tilde V_{DA}(t)
=
\Gamma_{DA}
e^{i\hat H_Dt/\hbar}
e^{-i\hat H_At/\hbar}
}
$$

以及

$$
\boxed{
\tilde V_{AD}(t)
=
\Gamma_{AD}
e^{i\hat H_At/\hbar}
e^{-i\hat H_Dt/\hbar}
}
$$

对于 Hermitian Hamiltonian，

$$
\tilde V_{AD}(t)
=
\tilde V_{DA}^{\dagger}(t)
$$

---

# 13. 对密度矩阵进行二阶 Dyson 展开

从

$$
\frac{\partial}{\partial t}
\hat\rho_I(t)
=
-\frac{i}{\hbar}
[
\hat H_I(t),
\hat\rho_I(t)
]
$$

积分一次：

$$
\hat\rho_I(t)
=
\hat\rho_{\mathrm{tot}}(0)
-
\frac{i}{\hbar}
\int_0^t
dt_1\,
[
\hat H_I(t_1),
\hat\rho_I(t_1)
]
$$

再把右边的 $\hat\rho_I(t_1)$ 用同一方程迭代一次，并保留到 $\hat H_I^2$，得到

$$
\begin{aligned}
\hat\rho_I(t)
=
&\hat\rho_{\mathrm{tot}}(0) \\
&-
\frac{i}{\hbar}
\int_0^t
dt_1\,
[
\hat H_I(t_1),
\hat\rho_{\mathrm{tot}}(0)
] \\
&-
\frac{1}{\hbar^2}
\int_0^t
dt_1
\int_0^{t_1}
dt_2\,
[
\hat H_I(t_1),
[
\hat H_I(t_2),
\hat\rho_{\mathrm{tot}}(0)
]
]
+
O(\Gamma^3)
\end{aligned}
$$

---

# 14. 定义受体态布居

受体态布居为

$$
P_A(t)
=
\mathrm{Tr}
\left[
\hat\rho_I(t)
|A\rangle\langle A|
\right]
$$

因此定义瞬时转移速率

$$
k(t)
=
\frac{dP_A(t)}{dt}
$$

也就是

$$
k(t)
=
\mathrm{Tr}
\left[
\frac{\partial\hat\rho_I(t)}{\partial t}
|A\rangle\langle A|
\right]
$$

对二阶展开求导。

利用

$$
\frac{d}{dt}
\int_0^t dt_1
\int_0^{t_1}dt_2\,F(t_1,t_2)
=
\int_0^t
dt_2\,
F(t,t_2)
$$

得到

$$
\boxed{
k(t)
=
-\frac{1}{\hbar^2}
\int_0^t
dt_2\,
\mathrm{Tr}
\left\{
[
\hat H_I(t),
[
\hat H_I(t_2),
\hat\rho_0|D\rangle\langle D|
]
]
|A\rangle\langle A|
\right\}
}
$$

一阶项不会产生受体态布居。

原因是 $\hat H_I$ 只包含电子态的非对角项：

$$
|D\rangle\langle A|,
\qquad
|A\rangle\langle D|
$$

而 $P_A$ 是电子态对角元。

因此布居变化最早出现在

$$
O(\Gamma^2)
$$

阶。

---

# 15. 展开双重对易子

利用

$$
[X,[Y,Z]]
=
XYZ-XZY-YZX+ZYX
$$

令

$$
X=\hat H_I(t),
\qquad
Y=\hat H_I(t_2),
\qquad
Z=\hat\rho_0|D\rangle\langle D|
$$

得到四项。

由于初始电子态是 $|D\rangle$，最后又投影到 $|A\rangle$，只有包含

$$
D\rightarrow A
$$

以及其共轭路径的项能够对 $P_A$ 产生贡献。

最终得到

$$
\begin{aligned}
k(t)
=
\frac{1}{\hbar^2}
\int_0^t dt_2\,
\mathrm{Tr}_n
\Big[
&
\tilde V_{AD}(t)
\hat\rho_0
\tilde V_{DA}(t_2)
\\
+
&
\tilde V_{AD}(t_2)
\hat\rho_0
\tilde V_{DA}(t)
\Big]
\end{aligned}
$$

这里

$$
\mathrm{Tr}_n
$$

表示只对核自由度取迹。

---

# 16. 利用迹的循环性质

利用

$$
\mathrm{Tr}[ABC]
=
\mathrm{Tr}[CAB]
$$

可以改写为

$$
\begin{aligned}
k(t)
=
\frac{1}{\hbar^2}
\int_0^t dt_2\,
\mathrm{Tr}_n
\Big[
&
\hat\rho_0
\tilde V_{DA}(t_2)
\tilde V_{AD}(t)
\\
+
&
\hat\rho_0
\tilde V_{DA}(t)
\tilde V_{AD}(t_2)
\Big]
\end{aligned}
$$

对于 Hermitian 系统，这两个项互为复共轭。

因此

$$
z+z^*
=
2\operatorname{Re}z
$$

于是得到

$$
\boxed{
k(t)
=
\frac{2}{\hbar^2}
\operatorname{Re}
\int_0^t
dt_2\,
\mathrm{Tr}_n
\left[
\hat\rho_0
\tilde V_{DA}(t)
\tilde V_{AD}(t_2)
\right]
}
$$

---

# 17. 所以时间关联函数自然的出现

定义

$$
\boxed{
C(t,t_2)
=
\mathrm{Tr}_n
\left[
\hat\rho_0
\tilde V_{DA}(t)
\tilde V_{AD}(t_2)
\right]
}
$$

那么电子转移速率可以写成

$$
\boxed{
k(t)
=
\frac{2}{\hbar^2}
\operatorname{Re}
\int_0^t
dt_2\,
C(t,t_2)
}
$$

这就是二阶微扰理论中时间关联函数自然出现的位置。

它不是额外人为加入的量，而是：

> 两次电子耦合作用在不同时间发生后，对核自由度取量子统计平均的结果。

第一次电子耦合在某个时间建立 $D$ 和 $A$ 之间的量子振幅，

第二次电子耦合在另一个时间把这个振幅转换成可观测的电子布居变化。

因此电子转移速率取决于两个时刻之间的“记忆”：

$$
C(t,t_2)
$$

##### 这就是电子转移理论和环境动力学、退相干、溶剂涨落以及非平衡统计力学开始连接起来的位置。

我们继续还可以进一步简化公式.

### 第一步：显式展开核算符

在相互作用绘景下，给体到受体的非绝热耦合算符定义为：

$$
\tilde{V}_{DA}(t) = \Gamma_{DA} e^{i\hat{H}_D t/\hbar} e^{-i\hat{H}_A t/\hbar}
$$

而受体到给体的算符 $\tilde{V}_{AD}(t_2)$ 是它的厄米共轭（Hermitian conjugate）。考虑到哈密顿量 $\hat{H}_D$ 和 $\hat{H}_A$ 是自伴算符，求共轭时需要将常数取复共轭、算符顺序颠倒并改变指数符号：

$$
\tilde{V}_{AD}(t_2) = \tilde{V}_{DA}^\dagger(t_2) = \Gamma_{DA}^* e^{i\hat{H}_A t_2/\hbar} e^{-i\hat{H}_D t_2/\hbar}
$$

将这两个展开式代入速率公式的迹（Trace）中，并将标量常数 $\vert{}\Gamma_{DA}\vert{}^2 = \Gamma_{DA}\Gamma_{DA}^*$ 提取到迹和积分号的外部：

$$
k(t) = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^t dt_2 \text{Tr}_n \left[ \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} e^{-i\hat{H}_A t/\hbar} e^{i\hat{H}_A t_2/\hbar} e^{-i\hat{H}_D t_2/\hbar} \right]
$$

##### 我在这里插一嘴

在标准的费米黄金法则（FGR）推导中，默认 $\Gamma_{AD} = \Gamma_{DA}$（或写为 $V_{AD} = V_{DA}$、$H_{ab} = H_{ba}$）是基于量子力学的**厄米性（Hermiticity）**。对于孤立、封闭的量子系统，系统的哈密顿量 $\hat{H}$ 必须是厄米算符，因此其矩阵元满足 $V_{AD} = V_{DA}^*$。由于跃迁速率正比于耦合矩阵元的绝对值平方 $\vert{}V_{AD}\vert{}^2$，在数学上，前向和后向的纯电子态本底耦合是严格一致的。

然而，在现实的复杂物理和化学过程中，这一对称性假设经常被打破。实际测量或高级理论计算得出的**有效电子耦合参数（Effective Electronic Coupling）往往是不一致的**。也就是 $\Gamma_{AD} \neq \Gamma_{DA}$

1. **Single-Molecule Junctions对称性破缺机制：** 经典的 Aviram-Ratner 分子二极管模型（D-$\sigma$-A 结构）或电催化剂表面模型中，分子轨道（HOMO/LUMO）与左右两侧环境（电极或催化活性位点）的耦合强度天然不同（$\Gamma_L \neq \Gamma_R$）。在非平衡态或施加偏压时，电极的态密度（DOS）和费米能级发生相对移动，导致前向电子转移时轨道与一侧发生强杂化，而后向转移时发生退杂化，产生巨大的有效耦合差异。

2. **对称性破缺机制：** 当系统强耦合到热浴时，中心系统的有效哈密顿量变为非厄米（Non-Hermitian）形式：$\hat{H}_{eff} = \hat{H}_S - \frac{i}{2} \hat{\Gamma}$。这种耗散项的引入导致有效本征值变为复数，破坏了时间反演对称性。例如，在细菌光合作用反应中心，尽管 A 分支和 B 分支在结构上高度对称，但非厄米演化使得电子几乎 100% 沿着 A 分支发生定向转移，表现出极度不对称的有效传输速率。

3. Chirality-induced spin selectivity (CISS)可能也是这种情况.

### 回到推导第二步：引入相干时间进行变量替换

此时，积分变量 $t_2$ 表示的是一个绝对的历史时刻。在非平衡统计力学中，我们更关心的是**时间差**，即系统在两个电子态之间保持量子相干的时间长度。因此，我们定义“相干时间” $\tau$ 为：

$$
\tau = t - t_2
$$

由此可得 $t_2 = t - \tau$。

对积分变量进行替换时，微分关系为 $dt_2 = -d\tau$。同时，积分的下限 $t_2 = 0$ 对应 $\tau = t$，上限 $t_2 = t$ 对应 $\tau = 0$。利用微分产生的负号，我们可以直接将积分区间 $[t, 0]$ 翻转回 $[0, t]$。这一替换不仅在数学上十分平滑，在物理上也意味着积分从“遍历所有历史时刻 $t_2$”自然地转变为“遍历所有可能的相干持续时间 $\tau$”。

将 $t_2 = t - \tau$ 代入指数算符中，我们得到了包含相干时间 $\tau$ 的速率方程：

$$
k(t) = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^t d\tau \text{Tr}_n \left[ \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} \left( e^{-i\hat{H}_A t/\hbar} e^{i\hat{H}_A (t-\tau)/\hbar} \right) e^{-i\hat{H}_D (t-\tau)/\hbar} \right]
$$

### 第三步：算符化简与物理图像

现在，我们可以对括号内部的受体演化算符进行合并。由于 $\hat{H}_A$ 与自身对易，指数可以直接相加：$-t + (t-\tau) = -\tau$。于是，受体演化部分被极大地简化了：

$$
e^{-i\hat{H}_A t/\hbar} e^{i\hat{H}_A (t-\tau)/\hbar} = e^{-i\hat{H}_A \tau/\hbar}
$$

将其代回主方程，我们就得到了最终展开的解析形式：

$$
k(t) = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^t d\tau \text{Tr}_n \left[ \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} e^{-i\hat{H}_A \tau/\hbar} e^{-i\hat{H}_D (t-\tau)/\hbar} \right]
$$

**进一步的理论延伸：**

如果你利用迹的循环置换性质（$\text{Tr}[ABC] = \text{Tr}[CAB]$），将最右侧的部分 $e^{-i\hat{H}_D (t-\tau)/\hbar}$ 拆分为 $e^{-i\hat{H}_D t/\hbar} e^{i\hat{H}_D \tau/\hbar}$ 并循环移到最左侧与 $\hat{\rho}_0$ 结合，这个公式就会呈现出标准的非平衡费米黄金定则（NE-FGR）时间相关函数形式。它非常直观地描绘了电荷转移的动力学图像：核波包首先在给体面上非平衡演化了 $t$ 时间，然后在 $\tau$ 时间内体验了给体与受体势能面之间的量子干涉效应。

拆分最右侧的给体演化算符 $e^{-i\hat{H}_D (t-\tau)/\hbar} = e^{-i\hat{H}_D t/\hbar} e^{i\hat{H}_D \tau/\hbar}$，并利用迹的循环置换性质将 $e^{-i\hat{H}_D t/\hbar}$ 移动到最左侧：

$$
k(t) = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^t d\tau \text{Tr}_n \left[ e^{-i\hat{H}_D t/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} e^{-i\hat{H}_A \tau/\hbar} e^{i\hat{H}_D \tau/\hbar} \right]
$$

如果在 $t=0$ 时，初始核密度矩阵 $\hat{\rho}_0$ 已经在给体势能面上达到了完全的热力学平衡，即 $[\hat{\rho}_0, \hat{H}_D] = 0$。此时时间平移操作对密度矩阵无效：

$$
e^{-i\hat{H}_D t/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} = \hat{\rho}_0
$$

##### 我在这里再插一嘴

我在这里不给出 **狄拉克 $\delta$ 函数**的推导.

狄拉克创立**狄拉克 $\delta$ 函数** 的时候,数学家有点抓狂,哈哈,因为狄拉克定义了一个“在除原点外处处为 0、原点处无穷大、全空间积分为 1”的怪东西。这引起了纯分析学者当时强烈抗议，认为这在经典测度与勒贝格积分中根本不是函数，属于“非法操作”。1932 年，冯·诺依曼出版《量子力学的数学基础》，在序言中几乎点名批评了狄拉克的 $\delta$ 函数与连续谱展开缺乏严格性.狄拉克完全不为所动，甚至有些冷漠。但是狄拉克在《量子力学原理》中写道：$\delta$ 函数虽然不能在传统函数意义下成立，但只要作为符号操作工具出现在积分核中，就不会产生任何物理悖论。后来1950年才被Schwartz证明是没有问题的.

数学家是在象牙塔里根据自己的喜好发明规则；而物理学家发现大自然需要什么数学，就会先走一步把它‘发明’出来，数学家随后才会赶来补齐地基。(**1939 年爱丁堡皇家学会的演讲《数学与物理的关系》（*The Relation between Mathematics and Physics*）**)

**神经网络中的非线性函数也是.**

狄拉克 $\delta$ 与神经网络非线性激活函数在科学史与数学结构上存在深刻的同构性：**它们都是工程与物理实用主义为了解决“表征瓶颈”而强行发明的非正则操作，且都在后续推动了现代泛函分析与弱导数理论的合法化。**

所以我对数学就一句话,我学不懂有人发明我就用,没人发明我就乱搞一个能用就好.

##### 我们回到推导

将核波函数按 $\hat{H}_D$ 和 $\hat{H}_A$ 的本征态展开（$\hat{H}_D\vert{}\nu\rangle = E_{D\nu}\vert{}\nu\rangle$，$\hat{H}_A\vert{}\mu\rangle = E_{A\mu}\vert{}\mu\rangle$），其中玻尔兹曼分布 $P_\nu = \langle \nu \vert{} \hat{\rho}_0 \vert{} \nu \rangle$。插入受体完备基 $\sum_\mu \vert{}\mu\rangle\langle \mu\vert{} = \hat{I}$，速率方程简化为：

$$
k = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^\infty d\tau \sum_{\nu, \mu} P_\nu \langle \nu \vert{} e^{-i\hat{H}_A \tau/\hbar} \vert{}\mu\rangle \langle \mu \vert{} e^{i\hat{H}_D \tau/\hbar} \vert{}\nu\rangle
$$

### 第一步：算符作用于本征态，提取纯相位因子

我们先看包含哈密顿量算符的这一部分：

$$
\langle \nu \vert{} e^{-i\hat{H}_A \tau/\hbar} \vert{}\mu\rangle \langle \mu \vert{} e^{i\hat{H}_D \tau/\hbar} \vert{}\nu\rangle
$$

由于 $\vert{}\nu\rangle$ 是给体 $\hat{H}_D$ 的本征态，$\vert{}\mu\rangle$ 是受体 $\hat{H}_A$ 的本征态，根据泰勒展开可知，指数算符作用在本征态上，就等于直接把算符替换为它的本征值（标量能量）：

- $e^{i\hat{H}_D \tau/\hbar} \vert{}\nu\rangle = e^{i E_{D\nu} \tau/\hbar} \vert{}\nu\rangle$

- 同理，由于算符是厄米的，向左作用在左矢上：$\langle \nu \vert{} e^{-i\hat{H}_A \tau/\hbar}$ 这一项如果作用在 $\vert{}\mu\rangle$ 上，会提取出 $e^{-i E_{A\mu} \tau/\hbar}$。

因为 $e^{i E_{D\nu} \tau/\hbar}$ 和 $e^{-i E_{A\mu} \tau/\hbar}$ 现在已经是**普通的复数标量**（纯相位因子），它们可以随意移动到内积的外面。提取出来后，剩下的就是两个态的内积：

$$
\left( e^{-i E_{A\mu} \tau/\hbar} \langle \nu \vert{}\mu\rangle \right) \left( e^{i E_{D\nu} \tau/\hbar} \langle \mu \vert{}\nu\rangle \right)
$$

合并指数项，并且利用 $\langle \nu \vert{}\mu\rangle \langle \mu \vert{}\nu\rangle = \vert{}\langle \mu \vert{}\nu\rangle\vert{}^2$（这就是著名的**核波函数弗兰克-康登因子 Franck-Condon factor**），原式就变成了：

$$
\vert{}\langle \mu \vert{}\nu\rangle\vert{}^2 e^{i(E_{D\nu} - E_{A\mu})\tau/\hbar}
$$

到这里，时间 $\tau$ 的演化就已经全部集中在这个纯相位因子里面了。

由于被积函数随时间的演化仅体现在纯相位因子上，无穷时间的积分直接生成狄拉克 $\delta$ 函数：

$$
\text{Re} \int_0^\infty d\tau e^{i(E_{D\nu} - E_{A\mu})\tau/\hbar} = \pi \hbar \delta(E_{D\nu} - E_{A\mu})
$$

代入后得到标准的费米黄金规则（FGR）：

$$
k_{FGR} = \frac{2\pi}{\hbar} \vert{}\Gamma_{DA}\vert{}^2 \sum_{\nu, \mu} P_\nu \vert{}\langle \nu \vert{} \mu \rangle\vert{}^2 \delta(E_{D\nu} - E_{A\mu})
$$

在光致电荷转移中，由于光激发是一个近似瞬时的垂直跃迁过程（弗兰克-康登原理），核坐标在激发瞬间保持在基态的平衡构型。因此，初始核密度矩阵 $\hat{\rho}_0$ 与给体势能面哈密顿量 $\hat{H}_D$ **不对易**：

$$
[\hat{\rho}_0, \hat{H}_D] \neq 0
$$

这意味着系统在给体态上并非处于定态，核密度矩阵会随时间发生非平衡演化：

$$
\hat{\rho}_D(t') = e^{-i\hat{H}_D t'/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t'/\hbar} \neq \hat{\rho}_0
$$

我们将上一次推导得到的瞬态速率公式中的时间变量 $t$ 替换为非平衡弛豫时间 $t'$，从这里开始向基于路径积分的非平衡费米黄金法则（NE-FGR）和线性化半经典（LSC）极限推进。

### 1. 提取量子时间相关函数（TCF）

当前的瞬态速率方程为：

$$
k(t') = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^{t'} d\tau \text{Tr}_n \left[ e^{-i\hat{H}_D t'/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t'/\hbar} e^{-i\hat{H}_A \tau/\hbar} e^{i\hat{H}_D \tau/\hbar} \right]
$$

利用迹的循环置换性质（$\text{Tr}[\hat{A}\hat{B}\hat{C}] = \text{Tr}[\hat{C}\hat{A}\hat{B}]$），将最右侧的 $e^{i\hat{H}_D \tau/\hbar}$ 移到最左侧：

$$
\text{Tr}_n \left[ e^{i\hat{H}_D \tau/\hbar} e^{-i\hat{H}_D t'/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t'/\hbar} e^{-i\hat{H}_A \tau/\hbar} \right]
$$

合并最左侧的两个给体演化算符 $e^{i\hat{H}_D \tau/\hbar} e^{-i\hat{H}_D t'/\hbar} = e^{-i\hat{H}_D (t'-\tau)/\hbar}$，然后再次进行循环置换，将 $\hat{\rho}_0$ 放在最左侧：

$$
C(t', \tau) = \text{Tr}_n \left[ \hat{\rho}_0 e^{i\hat{H}_D t'/\hbar} e^{-i\hat{H}_A \tau/\hbar} e^{-i\hat{H}_D (t'-\tau)/\hbar} \right]
$$

这个公式完美地定义了相干时间演化的三段独立过程：**前向传播、受体上前向传播、后向传播**。

### 2. 插入完备基与路径积分的构建

为了计算这个纯核算符的迹，我们插入四组位置本征态的完备基 $\int dx \vert{}x\rangle\langle x\vert{} = \hat{I}$，将算符转化为空间坐标上的矩阵元：

$$
C(t', \tau) = \int dx_0 dy_0 dy_1 dx_1 \langle x_0 \vert{} \hat{\rho}_0 \vert{} y_0 \rangle \langle y_0 \vert{} e^{i\hat{H}_D t'/\hbar} \vert{} y_1 \rangle \langle y_1 \vert{} e^{-i\hat{H}_A \tau/\hbar} \vert{} x_1 \rangle \langle x_1 \vert{} e^{-i\hat{H}_D (t'-\tau)/\hbar} \vert{} x_0 \rangle
$$

其中

- **$\vert{}x\rangle$ 和 $\vert{}y\rangle$：** 是核位置算符的本征态（位置表象）。在这个语境下，它们代表了反应体系中**所有原子核**（包括溶剂分子、反应物骨架等）在多维空间中的具体排列方式。

- **$x_0, y_0, x_1, y_1$：** 是这些位置算符的**连续本征值**，也就是**具体的空间坐标**。因为研究的是包含许多原子的宏观/介观体系，这里的 $x$ 实际上是一个高维向量 $\vec{x} = (r_1, r_2, \dots, r_N)$，描述了整个系统的几何构型。

我们讨论一下上面每一个小项目的物理意义

**$\langle x_0 \vert{} \hat{\rho}_0 \vert{} y_0 \rangle$（初始核密度矩阵）：** 表示在 $t=0$ 时刻，密度算符$\hat{\rho}_0$核体系在空间构型和 $y_0$ 投影之后在$x_0$上有多大程度上是重合的.（如果 $x_0 = y_0$，就是系统处于该初始构型的经典概率）。

**$\langle x_1 \vert{} e^{-i\hat{H}_D (t'-\tau)/\hbar} \vert{} x_0 \rangle$（给体上的右矢前向传播）：** 这是一个量子传播子。它表示原子核从初始构型 $x_0$ 出发，在**给体势能面**上经过时间 $t'-\tau$，运动到中间构型 $x_1$ 的几率幅。

**$\langle y_0 \vert{} e^{i\hat{H}_D t'/\hbar} \vert{} y_1 \rangle$（给体上的左矢演化）：** 注意指数上的正号。体系没有发生跃迁，而是在**给体势能面**上一直演化了 $t'$ 的时间，其核构型从 $y_1$ “倒退”回了 $y_0$

然后这么多路径不用费曼路径积分处理可惜了

将这些路径的作用量（Action, $S = \int L dt$）组合起来，总的时间相关函数可以写为对所有可能路径 $x(t)$ 和 $y(t)$ 的泛函积分：

$$
C(t', \tau) = \int \mathcal{D}x \int \mathcal{D}y \langle x_0 \vert{} \hat{\rho}_0 \vert{} y_0 \rangle \exp\left[ \frac{i}{\hbar} \Delta S \right]
$$

其中，前向路径和后向路径的**作用量之差** $\Delta S$ 严格等于：

$$
\Delta S = \int_0^{t'-\tau} L_D(x, \dot{x}) dt + \int_{t'-\tau}^{t'} L_A(x, \dot{x}) dt - \int_0^{t'} L_D(y, \dot{y}) dt
$$

先写到这里,我先去溶液看看,头昏脑胀了

先写到这里,我先去溶液看看,头昏脑胀了