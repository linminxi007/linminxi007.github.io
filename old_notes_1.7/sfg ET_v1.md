---
title: "如何测量和影响电子转移"

date: 2026-09-14

description: "能不能用sfg看到电子转移？能不能用光影响分子振动从而影响电子转移"

categories:
  - Electron transfer
  - Electrochemistry

lang: zh-CN

translation-key: electron-transfer-sfg

status: working

draft: false
---

# ![](images/paste-39.png)

<https://www6.slac.stanford.edu/news/2025-12-11-slac-researchers-wield-new-tools-study-waters-enigmatic-surface>

# 引言

我们知道溶剂的对于电子转移是很重要的，能不能用光直接改变溶剂的振动从而加速电子转移呢？尤其是在空气水界面，目前已经有了大量的SFG工作能探测到电子转移前后偶极矩变化，或者间接的通过周围的水分子对偶极矩响应得到溶剂的动力学数据（rao Tahara Eisenthal 引用）。

对于SFG/红外/拉曼光谱的模拟，经常是用水分子的偶极关联函数拟合。所以我这次也希望电子转移也能从关联函数出发，这可能对未来的通过SFG理解溶剂振动对电子转移影响提供帮助。不过与光谱模拟不一样的是我们用的是能量的关联函数（Koji Ando The Journal of Chemical Physics 106, 116 1997），也就是周围溶液如何不断的踢我们的分子，引起分子能量的变化。

我想知道如果我用一束Pump光激发空气水界面的HOH的弯曲振动和OH的高频振动，能不能加速电子转移。或者说泡在界面的分子能不能被一束作用在溶液上的光开启或加速电子转移，特别是界面上有大量的Free-OH,它们会起到什么作用呢？

由于OH振动的频率较高，我们需要做一点的量子化处理。而其他的慢速溶剂振动做经典的处理，这也是电子转移领域常用的思路无论是在溶液（M**arcus–Jortner** ）还是金属溶液界面（**news Anderson 斯米克乐）思路。**

这次我用尽可能简单不跳步的推导，回答这个问题，多用图片和物理图像的解释，且面向实验者。

我们不应该纠结于讨论用什么假设和选什么合适的模型，尽可能精细的描述界面。比如我们用平衡的模型去描述非平衡的过程，对大量的参数都是采用估计值。我不想花大量的时间讨论理论的适用性和严谨性，只想初步的回答电子转移能不能光激发的溶剂振动加速。

（添加引用 Science 2014, 346, 1492 (Delor et al.) ，J. Chem. Theory Comput. 2018, 14, 4041 ，还有Eisenthal和Tahara）

#

![](images/paste-43.png){width="161"}

![https://academic.oup.com/bcsj/article/97/4/uoae012/7636879](images/paste-42.png){width="95"}

# 摘要

我从关联函数的视角尝试描述用激光激发空气水界面的OH，H-O-H振动可能为电子转移带来多少加速。结论是加速可能不足以带来SFG或吸收谱可观测的效应，但是这为我们找到这样的体系提供了思路。

# 正文理论推导部分

## **跃迁振幅**

**由于我们讨论的是电子转移问题，所以我们先给出跃迁振幅和跃迁概率的推导。**

我们知道对于相互作用算符：

$$
i\hbar\frac{d}{dt}\hat{U}_I(t)
=
\hat{V}_I(t)\hat{U}_I(t)
$$

其中：

$$
\hat{V}_I(t)
=
e^{i\hat{H}_0t/\hbar}
\hat{V}
e^{-i\hat{H}_0t/\hbar}
$$

把这个微分方程积分，并迭代一次，就得到Dyson 展开：

$$
\boxed{
\hat{U}_I(t)
=
\hat{I}
-\frac{i}{\hbar}
\int_0^t dt_1\,\hat{V}_I(t_1)
+O(V^2)
}
$$

在相互作用表象下，从i到f的跃迁振幅定义为：

$$
A_{fi}^{(I)}(t)
=
\langle f|\hat{U}_I(t)|i\rangle
$$

意思是i在经过一个扰动随时间变化了一段时间后和f的耦合程度

代入 Dyson 展开：

$$
A_{fi}^{(I)}(t)
=
\underbrace{\langle f|\hat{I}|i\rangle}_{\delta_{fi}}
-\frac{i}{\hbar}
\int_0^t dt_1\,
\langle f|\hat{V}_I(t_1)|i\rangle
+O(V^2)
$$

当 $f\neq i$ 且两态正交时：

$$
\langle f|i\rangle=0
$$

因此：

$$
\boxed{
A_{fi}^{(I,1)}(t)
=
-\frac{i}{\hbar}
\int_0^t dt_1\,
\langle f|\hat{V}_I(t_1)|i\rangle
}
$$

电子从 $i$ 跳到 $f$ 的一阶跃迁振幅算符为：

$$
\boxed{
\hat{A}_{fi}^{(1)}(t)
=
-\frac{iV_{fi}}{\hbar}
\int_0^t dt_1\,
e^{+i\hat{H}_ft_1/\hbar}
e^{-i\hat{H}_it_1/\hbar}
}
$$

于是我们得到了跃迁振幅。

### 从跃迁振幅到跃迁概率

量子力学中，概率等于振幅乘以其复共轭。

核自由度不一定处于单个纯态，因此要使用初态核密度矩阵 $\hat{\rho}_i$：

$$
P_{i\to f}(t)
=
\operatorname{Tr}_n
\left[
\hat{A}_{fi}^{(1)}(t)
\hat{\rho}_i
\hat{A}_{fi}^{(1)\dagger}(t)
\right]
$$

我们最终想知道的是电子有没有从 i 转移到 f，但是电子能否转移，这取决于分子和周围溶剂的核运动。因此，我们必须把电子自由度与核自由度分开处理。

### 从简单量子力学到电子转移

在 Sakurai （现代量子力学 引用）的普通两能级系统中，如果没有其他自由度：

$$
A_{fi}(t)
=
\langle f|\hat{U}(t)|i\rangle
$$

跃迁概率直接是：

$$
\boxed{
P_{i\to f}(t)
=
|A_{fi}(t)|^2
}
$$

但是在溶液中，电子从 $i$ 转移到 $f$ 时，周围水分子的取向、氢键结构和振动状态也可能变化。

所以系统的 Hilbert 空间实际上是：

$$
\mathcal{H}
=
\mathcal{H}_{\mathrm{electron}}
\otimes
\mathcal{H}_{\mathrm{nuclear}}
$$

电子态由 $|i\rangle$、$|f\rangle$ 描述，而核自由度由 $|\nu\rangle$ 描述。

当我们计算：

$$
\hat{A}_{fi}(t)
=
\langle f|\hat{U}(t)|i\rangle
$$

这里仅对电子自由度取了矩阵元，并没有消去核自由度。

因此，$\hat{A}_{fi}$ 仍然是核空间中的算符。

假设初始核态为 $|\nu\rangle$，那么电子转移概率就是：

$$
P_{i\nu\to f}(t)
=
\langle\nu|
\hat{A}_{fi}^{\dagger}(t)
\hat{A}_{fi}(t)
|\nu\rangle
$$

其实就是把核坐标也加上了。

如果溶剂初始处于混合态，用密度算符 $\hat{\rho}_i$ 描述，老老实实的代入展开并且利用Trace 的循环性质就得到：

$$
\boxed{
P_{i\to f}(t)
=
\operatorname{Tr}_n
\left[
\hat{A}_{fi}(t)
\hat{\rho}_i
\hat{A}_{fi}^{\dagger}(t)
\right]
}
$$

把上面的 Dyson 一阶振幅代进去：

$$
\begin{aligned}
P_{i\to f}(t)
=&
\frac{|V_{fi}|^2}{\hbar^2}
\int_0^t dt_1
\int_0^t dt_2 \\
&\times
\operatorname{Tr}_n
\left[
e^{+i\hat{H}_ft_1/\hbar}
e^{-i\hat{H}_it_1/\hbar}
\hat{\rho}_i
e^{+i\hat{H}_it_2/\hbar}
e^{-i\hat{H}_ft_2/\hbar}
\right].
\end{aligned}
$$

把指数合并，可以进一步得到：

$$
\boxed{
\begin{aligned}
P_{i\to f}(t)
=&
\frac{|V_{fi}|^2}{\hbar^2}
\int_0^t dt_1
\int_0^t dt_2 \\
&\times
\operatorname{Tr}_n
\left[
\hat{\rho}_i
e^{-i\hat{H}_i(t_1-t_2)/\hbar}
e^{+i\hat{H}_f(t_1-t_2)/\hbar}
\right].
\end{aligned}
}
$$

观察这个式子：核迹已经只依赖于两个时间的差。

为了方便我们定义：

$$
\tau=t_1-t_2
$$

于是自然可以引入下面的函数。

### Ando 关联函数

于是Ando 关联函数就出现了

令：

$$
\boxed{
\begin{aligned}
C_{if}(\tau)
&=
\operatorname{Tr}_n
\left[
\hat{\rho}_i
e^{-i\hat{H}_i\tau/\hbar}
e^{+i\hat{H}_f\tau/\hbar}
\right] \\
&=
\left\langle
e^{-i\hat{H}_i\tau/\hbar}
e^{+i\hat{H}_f\tau/\hbar}
\right\rangle_i.
\end{aligned}
}
$$

于是跃迁概率可以写为：

$$
\boxed{
P_{i\to f}(t)
=
\frac{|V_{fi}|^2}{\hbar^2}
\int_0^t dt_1
\int_0^t dt_2\,
C_{if}(t_1-t_2)
}
$$

对于平衡初态：

$$
C_{if}(-\tau)
=
C_{if}(\tau)^*
$$

因此，对概率求时间导数就得到：

$$
\boxed{
k(t)
=
\frac{2|V_{fi}|^2}{\hbar^2}
\operatorname{Re}
\int_0^t d\tau\,C_{if}(\tau)
}
$$

如果关联函数衰减得足够快，使积分收敛，并且系统进入可以定义恒定速率的时间区间，那么：

$$
\boxed{
k_{\mathrm{FGR}}
=
\frac{|V_{fi}|^2}{\hbar^2}
\int_{-\infty}^{+\infty}
d\tau\,C_{if}(\tau)
}
$$

这就是电子转移速率的 Fermi Golden Rule 时间关联函数表示。

这个方法也出现在 Koji Ando 1997 年（引用）研究溶液外球电子转移的工作中。Tokmakoff （引用）的电子转移教材同样使用了这一关联函数形式，不过采用复共轭的算符顺序。

我们仔细来看这个几乎不做假设的干净方程

$$
C_{if}(t)
=
\operatorname{Tr}_n
\left[
\hat{\rho}_i
e^{-i\hat{H}_it/\hbar}
e^{i\hat{H}_ft/\hbar}
\right]
$$

他可以看成是初态在随着被初末态哈密顿量驱动的时间演化算符变化的过程。你可以看到如果初末态哈密顿量（分子自身的哈密顿量+溶剂的哈密顿量）越像，电子转移越快。

为了我们进一步理解这个方程，我再做一些变形。

假设两个电子态对应的核哈密顿量具有本征态：

$$
\hat{H}_i|n_i\rangle
=
E_n^i|n_i\rangle
$$

$$
\hat{H}_f|m_f\rangle
=
E_m^f|m_f\rangle
$$

这里 $n,m$ 表示核振动态（对于溶剂，也可以包含集体振动和其他核自由度）。

就得到：

$$
\boxed{
C_{if}(t)
=
\sum_{n,m}p_n
|\langle m_f|n_i\rangle|^2
e^{i(E_m^f-E_n^i)t/\hbar}
}
$$

这个公式在上述平稳初态条件下是严格的量子力学结果，不需要经典近似。

Franck–Condon 因子\<mf\|ni\>2越大，说明初态与终态核振动波函数的重叠越强，对应振动跃迁通道的权重越大。

，初末态能量越接近关联函数越大，从而电子转移就越快，很自然的如果是初态到初态到电子转移，也就是自己转移到自己身上那关联函数就是1。

![](images/paste-34.png){fig-align="left" width="205"}

![](images/paste-35.png){width="205"}

蓝线代表不同核构型贡献的单位复振幅，橙线代表平均值。蓝线长度始终为 1，但相位分散后橙线通常缩短。

溶剂的贡献的相位之间像费曼路径积分一样叠加在一起。

再对相关函数说几句。

## 从相关函数看 SFG 和 电子转移的关系

### 假设 SFG 和 ET 都受到同一个振动坐标 $q(t)$ 的影响

我们还是考虑一个界面水的 OH 伸缩振动能被写成谐振子形式：

$$
H_i
=
\frac{p^2}{2m}
+
\frac12m\omega_0^2q^2
$$

其中$q(t)$ **是**水分子某个振动自由度在时间 $t$ 的位移坐标

电子转移后的势能面为：

$$
H_f
=
\Delta G^0
+
\frac{p^2}{2m}
+
\frac12m\omega_0^2(q-d)^2
$$

我们在这个模型中引入三个耦合常数：

$$
\boxed{
\begin{aligned}
M(q)&=M_0+bq\\
A(q)&=A_0+aq\\
X(q)&=\Delta G^0+\lambda-gq
\end{aligned}
}
$$

其中：

- $b=\partial M/\partial q$：振动引起偶极矩变化的能力，也就是 **IR** 活性。
- $a=\partial A/\partial q$：振动引起极化率变化的能力，也就是 **Raman** 活性。
- $g=-\partial X/\partial q$：振动改变电子转移能隙的能力，也就是我们真正关心的 **电子转移** 耦合。

对于位移谐振子：

$$
g=m\omega_0^2d
$$

$$
\boxed{
\lambda_{\mathrm{OH}}
=
\frac{g^2}{2m\omega_0^2},
\qquad
S_{\mathrm{OH}}
=
\frac{g^2}{2m\hbar\omega_0^3}
}
$$

这里出现了一个重要结果：**如果能从 SFG 测量确定** $q(t)$ **的动力学，再确定** $g$**，就能够计算 OH 振动对 ET 的重组能及 Huang–Rhys 因子。**

### 从 SFG 的响应函数出发

我们考虑经典振动响应。IR 电场作用于振动偶极矩，对 $q$ 产生驱动力：

$$
m\ddot q
+
m\gamma\dot q
+
m\omega_0^2q
=
bE_{\mathrm{IR}}(t)
$$

其中 $\gamma$ 是有效阻尼常数。

变换到频率空间：

$$
q(\omega)
=
\frac{bE_{\mathrm{IR}}(\omega)}
{m(\omega_0^2-\omega^2-i\gamma\omega)}
$$

与此同时，可见光通过振动相关的极化率 $A(q)$ 产生和频响应：

$$
P_{\mathrm{SFG}}
\propto
A(q)E_{\mathrm{vis}}
$$

保留振动诱导部分：

$$
P_{\mathrm{SFG}}^{\mathrm{res}}
\propto
aqE_{\mathrm{vis}}
$$

代入 $q(\omega)$，得到简化的共振 SFG 响应：

$$
\boxed{
\chi_{\mathrm{SFG}}^{(2),\mathrm{res}}(\omega)
=
\frac{\mathcal N ab}
{m(\omega_0^2-\omega^2-i\gamma\omega)}
}
$$

$\mathcal N$ 表示界面分子数密度、取向投影及相关的光学几何因子；实际实验还需要修正 Fresnel 因子。

因此 SFG 光谱包含：

$$
\underbrace{\omega_0,\gamma}_{\text{振动频率、响应时间}}
\qquad
\underbrace{\mathcal Nab}_{\text{光学响应强度}}
$$

现在看 ET。

### 同一振动怎样改变电子转移能隙？

由刚才定义的：

$$
X(q)=X_0-gq
$$

得到能隙涨落：

$$
\delta X(t)=-g\delta q(t)
$$

所以能隙涨落等于轨迹的涨落乘以一个关于能量的系数g：

$$
\boxed{
K_{XX}(t)
=
g^2\langle\delta q(t)\delta q(0)\rangle
}
$$

而 SFG 涉及的偶极矩和极化率涨落是：

$$
\delta M(t)=b\delta q(t)
$$

$$
\delta A(t)=a\delta q(t)
$$

因此：

$$
\langle\delta A(t)\delta M(0)\rangle
=
ab\langle\delta q(t)\delta q(0)\rangle
$$

两式对比：

$$
\boxed{
K_{XX}(t)
=
\frac{g^2}{ab}
\langle\delta A(t)\delta M(0)\rangle
}
$$

这是我们要寻找的第一个桥梁公式。

在这个模型中，两种关联函数共享一个核心：

$$
\boxed{
K_{qq}(t)
=
\langle\delta q(t)\delta q(0)\rangle
}
$$

### 用涨落–耗散定理连接实验 SFG 和 ET

现在暂时只考虑平衡态。在这一条件下，可以使用涨落–耗散定理（FDT）。

定义振动坐标对外力的线性响应：

$$
\chi_{qq}(\omega)
=
\frac{1}
{m(\omega_0^2-\omega^2-i\gamma\omega)}
$$

前面已经得到：

$$
\chi_{\mathrm{SFG}}^{(2),\mathrm{res}}(\omega)
=
\mathcal Nab\,\chi_{qq}(\omega)
$$

如果实验通过相位敏感 HD-SFG 得到了复数 $\chi^{(2)}$，并且我们能够标定光学因子，则：

$$
\boxed{
\chi_{qq}(\omega)
=
\frac{\chi_{\mathrm{SFG}}^{(2),\mathrm{res}}(\omega)}
{\mathcal Nab}
}
$$

量子涨落–耗散定理进一步给出平衡坐标涨落的对称关联函数（这里省略一大堆推导）：

$$
\begin{aligned}
K_{qq}^{\mathrm{sym}}(t)
&=
\frac12
\left\langle
\left\{
\delta q(t),\delta q(0)
\right\}
\right\rangle\\
&=
\frac{\hbar}{\pi}
\int_0^\infty d\omega\,
\operatorname{Im}\chi_{qq}(\omega)
\coth\left(\frac{\beta\hbar\omega}{2}\right)
\cos(\omega t)
\end{aligned}
$$

其中 $\beta=1/(k_BT)$。

由于 $X=X_0-gq$，于是：

$$
\boxed{
\begin{aligned}
K_{XX}^{\mathrm{sym}}(t)
={}&
\frac{\hbar g^2}{\pi}
\int_0^\infty d\omega\\
&\times
\operatorname{Im}
\left[
\frac{\chi_{\mathrm{SFG}}^{(2),\mathrm{res}}(\omega)}
{\mathcal Nab}
\right]\\
&\times
\coth\left(\frac{\beta\hbar\omega}{2}\right)
\cos(\omega t)
\end{aligned}
}
$$

这就是一个明确的、模型依赖的 **SFG → ET 能隙涨落关联函数** 的变换。

它把实验测得的 SFG 谱作为输入，输出 电子转移 所需的能隙涨落动力学。对于高频 OH，保留了量子热占据修正，而没有直接套用经典均分定理。

但仍然需要 $g$ 和光学归一化因子。更重要的是，这一推导只在共同的线性谐振动模式、平衡态以及可用线性响应描述的条件下成立。

### 从 SFG 计算重组能

可以推导出一个更简单的表达式。

对于上述单个谐振子：

$$
\lambda_{\mathrm{OH}}
=
\frac12g^2\chi_{qq}(0)
$$

根据响应函数的 Kramers–Kronig 关系：

$$
\chi_{qq}(0)
=
\frac{2}{\pi}
\int_0^\infty
\frac{\operatorname{Im}\chi_{qq}(\omega)}
{\omega}\,d\omega
$$

所以：

$$
\boxed{
\lambda_{\mathrm{OH}}
=
\frac{g^2}{\pi\mathcal Nab}
\int_0^\infty
\frac{
\operatorname{Im}\chi_{\mathrm{SFG}}^{(2),\mathrm{res}}(\omega)
}{\omega}\,d\omega
}
$$

也就是重组能和SFG信号的关系。

不过，它计算的只是 SFG 可见、且与 ET 能隙耦合的模式贡献，并非完整的溶剂重组能 $\lambda_s$。

而且 $g$ 不能仅从 $a,b$ 推导出来。原因是 SFG 测量的是振动如何改变水分子的光学性质，而 $g$ 描述的是振动如何改变特定电子供受体的能量。这是两种不同的电子结构导数。

比如：两个反应体系具有完全相同的界面水 SFG 光谱，但其中一个的 $g$ 是另一个的两倍。那么它们的振动重组能会相差四倍，而 SFG 光谱可能无法区分。

因此，实验上需要标定的最重要参数不是振动频率，而是 **ET energy-gap coupling** $g$。

这个数值可能只能通过2D-SFG或者AIMD拿到了。

我在这里强调一下，在独立谐振子、线性振电耦合和热平衡假设下，SFG–ET 关系也就是K\_{XX}\^{\mathrm{sym}}(t)可以推导出之前 MLJ 模型中的高频量子关联函数。

好了，我们回到最早的相关函数。

我们拿到了相关函数，那现在来看看如何把低频的转动和高频的OH振动贡献处理一下。

## 溶剂的低频振动

![](images/paste-38.png){width="467"}

- **图中 (a) H-bond pend（氢键悬摆）**：频率通常低于 $100\ \mathrm{cm}^{-1}$。

- **(b) H-bond stretch（氢键伸缩）**：频率约为 $150\text{–}250\ \mathrm{cm}^{-1}$。

- **(c) Rock（旋摆）**

- **(d) Twist（扭摆）**

- **(e) Wag（摇摆）**：属于分子间运动（Intermolecular），是慢运动；其他属于快运动。

  <https://wulixb.iphy.ac.cn/supplement/e5e04400-2592-41e2-b975-2a0dd58945ae>

把核哈密顿量分解为经典低频浴与高频模式：

注意这里的振动是溶液整体的振动，而不是单个分子的振动。

$$
H_i=H_{s,i}+\sum_\alpha H_{\alpha,i}
$$

$$
H_f=\Delta G^0+H_{s,f}
+\sum_\alpha H_{\alpha,f}
$$

假设它们之间可以分离，初态密度矩阵也近似因子化，便得到：

$$
\boxed{
C_{if}(t)=
e^{i\Delta G^0t/\hbar}
C_s(t)\prod_\alpha C_\alpha(t)
}
$$

我们逐项处理。

#### 低频溶剂浴关联函数

假设低频浴是经典 Gaussian 溶剂，其重组能为 $\lambda_s$，并采用短时间静态能隙近似。

#### 引入经典共同轨迹近似

假设溶剂自由度足够低频，可以近似用经典轨迹 $q(\tau)$ 描述。

在该近似下，核对两个电子态之间相对相位的贡献可以写成：

**第一步：从我们之前得到的关联函数出发**

$$
C_{if}(t)=
\operatorname{Tr}_n
\left[
\rho_i e^{-iH_it/\hbar}e^{iH_ft/\hbar}
\right]
$$

定义两个核哈密顿量之间的能隙算符：

$$
\hat X=H_f-H_i=U_f(\hat q)-U_i(\hat q)
$$

其中假定两个电子态具有相同的核动能算符。

**第二步：把传播子的差异表示成相位积累**

利用迹的循环性质及 $[\rho_i,H_i]=0$，可以将关联函数改写为：

$$
C_{if}(t)=
\left\langle
\widetilde{\mathcal T}
\exp\left[
\frac{i}{\hbar}\int_0^t\hat X_I(\tau)d\tau
\right]
\right\rangle_i
$$

其中：

$$
\hat X_I(\tau)=
e^{iH_i\tau/\hbar}\hat X e^{-iH_i\tau/\hbar}
$$

$\widetilde{\mathcal T}$ 表示反时间排序。这一步仍然是精确的。

**第三步：引入经典共同轨迹近似**

用初态势能面上的经典轨迹 $q(\tau)$ 代替核算符的量子演化：

$$
\hat X_I(\tau)\longrightarrow X(q(\tau))
$$

同时忽略不同时间能隙算符的不对易效应，时间排序便可以去掉。

于是，每个很短的时间间隔 $d\tau$ 内，两电子态积累的相对相位为：

$$
d\phi=\frac{X(q(\tau))}{\hbar}d\tau
$$

把这些相位累加：

$$
\phi(t)=\frac{1}{\hbar}\int_0^tX(q(\tau))d\tau
$$

最后对初态溶剂轨迹的统计系综求平均：

$$
\boxed{
C_s(t)\approx
\left\langle
\exp\left[
\frac{i}{\hbar}\int_0^tX(q(\tau))d\tau
\right]
\right\rangle_i
}
$$

其关联函数为：

$$
\boxed{
C_s(t)=
\exp\left[
\frac{i\lambda_st}{\hbar}
-\frac{\lambda_s k_BT}{\hbar^2}t^2
\right]
}
$$

#### 引入短时间静态近似

假设在关联函数所关心的时间窗口内，溶剂的运动非常缓慢，因为当我们用热浴模型把所有溶剂的振动抽象为一些谐振子的时候，往往转动平动相对于OH的振动都是很慢的：

$$
q(\tau)\approx q(0)
\qquad
0\leq\tau\leq t
$$

于是：

$$
X(q(\tau))\approx X(q(0))
$$

因此：

$$
\int_0^tX(q(\tau))\,d\tau
\approx X(q(0))t
$$

关联函数变为：

$$
\boxed{
C_s(t)\approx
\left\langle e^{iXt/\hbar}\right\rangle_i
}
$$

对于经典溶剂，可以把系综平均写成积分：

$$
\boxed{
C_s(t)=
\int_{-\infty}^{+\infty}
P_i(X)e^{iXt/\hbar}\,dX
}
$$

我们知道Marcus 模型中初态的 Gaussian 能隙分布

$$
\boxed{
P_i(X)=
\frac{1}{\sqrt{4\pi\lambda_s k_BT}}
\exp\left[
-\frac{(X-\Delta G^0-\lambda_s)^2}
{4\lambda_s k_BT}
\right]
}
$$

代入

$$
C_s(t)=
\frac{1}{\sqrt{2\pi\sigma_X^2}}
\int_{-\infty}^{+\infty}
\exp\left[
-\frac{(X-\mu_X)^2}{2\sigma_X^2}
+\frac{iXt}{\hbar}
\right]dX
$$

令：

$$
Y=X-\mu_X
$$

则 $X=Y+\mu_X$，所以：

$$
C_s(t)=
e^{i\mu_Xt/\hbar}
\frac{1}{\sqrt{2\pi\sigma_X^2}}
\int_{-\infty}^{+\infty}
\exp\left[
-\frac{Y^2}{2\sigma_X^2}
+\frac{iYt}{\hbar}
\right]dY
$$

利用标准 Gaussian 积分：

$$
\int_{-\infty}^{+\infty}
e^{-aY^2+bY}\,dY
=
\sqrt{\frac{\pi}{a}}
e^{b^2/(4a)}
$$

取：

$$
a=\frac{1}{2\sigma_X^2},
\qquad
b=\frac{it}{\hbar}
$$

由于 $i^2=-1$，积分结果为：

$$
\frac{1}{\sqrt{2\pi\sigma_X^2}}
\int_{-\infty}^{+\infty}
\exp\left[
-\frac{Y^2}{2\sigma_X^2}
+\frac{iYt}{\hbar}
\right]dY
=
\exp\left[
-\frac{\sigma_X^2t^2}{2\hbar^2}
\right]
$$

因此：

$$
\boxed{
C_s(t)=
\exp\left[
\frac{i\mu_Xt}{\hbar}
-
\frac{\sigma_X^2t^2}{2\hbar^2}
\right]
}
$$

最后代入：

$$
\mu_X=\Delta G^0+\lambda_s
$$

以及：

$$
\sigma_X^2=2\lambda_sk_BT
$$

得到：

$$
\boxed{
C_s(t)=
\exp\left[
\frac{i(\Delta G^0+\lambda_s)t}{\hbar}
-
\frac{\lambda_sk_BT}{\hbar^2}t^2
\right]
}
$$

接下来我们处理高频的。

## 高频 OH 或 HOH 振动关联函数

还是从两个位移谐振子出发

假设电子转移前后的核哈密顿量为：

$$
H_i=\frac{p^2}{2m}+\frac12m\omega^2q^2
$$

$$
H_f=\frac{p^2}{2m}+\frac12m\omega^2(q-d)^2+\Delta G^0
$$

其中 $d$ 是两个势能面的平衡位置差。

重组能：

$$
\lambda=\frac12m\omega^2d^2
$$

定义 Huang–Rhys 因子：

$$
\boxed{
S=\frac{\lambda}{\hbar\omega}
=\frac{m\omega d^2}{2\hbar}
}
$$

它衡量两个振动势能面之间的位移相对于量子零点涨落的大小。

### 精确核关联函数出发

之前已经得到：

$$
C_{if}(t)=
\operatorname{Tr}_n
\left[
\rho_i e^{-iH_it/\hbar}e^{iH_ft/\hbar}
\right]
$$

零温时，初态核密度矩阵为：

$$
\rho_i=|0_i\rangle\langle0_i|
$$

因此：

$$
\boxed{
C^{(0)}(t)=
\langle0_i|
e^{-iH_it/\hbar}
e^{iH_ft/\hbar}
|0_i\rangle
}
$$

注意，这一步我们没有使用经典近似。

我们可以在终态振动态上展开，终态振动本征态满足：

$$
H_f|n_f\rangle=E_n^f|n_f\rangle
$$

其中：

$$
E_n^f=\Delta G^0+\hbar\omega(n+1/2)
$$

插入完备关系：

$$
I=\sum_{n=0}^{\infty}|n_f\rangle\langle n_f|
$$

得到：

$$
C^{(0)}(t)=
\sum_n
\langle0_i|e^{-iH_it/\hbar}|n_f\rangle
\langle n_f|e^{iH_ft/\hbar}|0_i\rangle
$$

因为：

$$
H_i|0_i\rangle=\frac12\hbar\omega|0_i\rangle
$$

所以：

$$
C^{(0)}(t)=
\sum_n
|\langle n_f|0_i\rangle|^2
e^{i(E_n^f-E_0^i)t/\hbar}
$$

利用：

$$
E_n^f-E_0^i=\Delta G^0+n\hbar\omega
$$

得到：

$$
\boxed{
C^{(0)}(t)=
e^{i\Delta G^0t/\hbar}
\sum_{n=0}^{\infty}
|\langle n_f|0_i\rangle|^2
e^{in\omega t}
}
$$

这里最重要的是：

$$
|\langle n_f|0_i\rangle|^2
$$

它表示初态振动基态在终态第 $n$ 个振动态上的投影概率。

$$
|\langle n_f|0_i\rangle|^2
$$

下面我们简单的推导一下这个投影概率

### 引入量子位移算符

考虑两个谐振子：

$$
U_i(q)=\frac12m\omega^2q^2
$$

$$
U_f(q)=\frac12m\omega^2(q-d)^2
$$

终态谐振子只是向右平移了距离 $d$。

量子力学中，空间平移算符为：

$$
\boxed{
D(d)=e^{-id\hat p/\hbar}
}
$$

它的作用是把波函数向右移动 $d$：

$$
D(d)\psi(q)=\psi(q-d)
$$

因此：

$$
|n_f\rangle=D(d)|n_i\rangle
$$

使用谐振子的升降算符：

$$
\hat p=i\sqrt{\frac{m\hbar\omega}{2}}
(a^\dagger-a)
$$

代入位移算符：

$$
D(d)=
\exp\left[
d\sqrt{\frac{m\omega}{2\hbar}}
(a^\dagger-a)
\right]
$$

定义：

$$
\alpha=d\sqrt{\frac{m\omega}{2\hbar}}
$$

就有：

$$
\boxed{
D(\alpha)=e^{\alpha(a^\dagger-a)}
}
$$

而 Huang–Rhys 因子：

$$
S=\frac{m\omega d^2}{2\hbar}=\alpha^2
$$

所以 $\alpha=\sqrt S$（取 $d>0$）。

我们要计算：

$$
\langle n_f|0_i\rangle
$$

由于：

$$
|n_f\rangle=D(\alpha)|n_i\rangle
$$

所以：

$$
\langle n_f|0_i\rangle
=
\langle n_i|D(-\alpha)|0_i\rangle
$$

令：

$$
|\psi\rangle=D(-\alpha)|0_i\rangle
$$

现在我们的任务变成：将 $|\psi\rangle$ 展开到初态谐振子的数态基底中。

**第一步：证明它是湮灭算符的本征态**

利用位移算符的性质：

$$
aD(-\alpha)=D(-\alpha)(a-\alpha)
$$

又因为：

$$
a|0_i\rangle=0
$$

因此：

$$
\begin{aligned}
a|\psi\rangle
&=aD(-\alpha)|0_i\rangle\\
&=D(-\alpha)(a-\alpha)|0_i\rangle\\
&=-\alpha|\psi\rangle
\end{aligned}
$$

所以最后我们得到：

$$
\boxed{a|\psi\rangle=-\alpha|\psi\rangle}
$$

**第二步：展开到数态基底**

任何谐振子态都可以写成：

$$
|\psi\rangle=\sum_{n=0}^{\infty}c_n|n_i\rangle
$$

这里 $c_n$ 就是我们要找的投影振幅。

利用：

$$
a|n\rangle=\sqrt n|n-1\rangle
$$

以及：

$$
a|\psi\rangle=-\alpha|\psi\rangle
$$

比较每个 $|n\rangle$ 的系数：

$$
\sqrt{n+1}\,c_{n+1}=-\alpha c_n
$$

于是：

$$
c_1=-\alpha c_0
$$

$$
c_2=\frac{(-\alpha)^2}{\sqrt{2!}}c_0
$$

$$
c_3=\frac{(-\alpha)^3}{\sqrt{3!}}c_0
$$

一般得到：

$$
\boxed{
c_n=\frac{(-\alpha)^n}{\sqrt{n!}}c_0
}
$$

**第三步：利用归一化求** $c_0$

因为：

$$
\sum_{n=0}^{\infty}|c_n|^2=1
$$

所以：

$$
|c_0|^2
\sum_{n=0}^{\infty}\frac{\alpha^{2n}}{n!}=1
$$

利用指数函数：

$$
\sum_{n=0}^{\infty}\frac{\alpha^{2n}}{n!}
=e^{\alpha^2}
$$

得到：

$$
c_0=e^{-\alpha^2/2}
$$

这里取实数正的整体相位约定。

最终：

$$
\boxed{
c_n=e^{-\alpha^2/2}
\frac{(-\alpha)^n}{\sqrt{n!}}
}
$$

因为 $\alpha^2=S$，所以：

$$
\boxed{
|\langle n_f|0_i\rangle|^2
=|c_n|^2
=e^{-S}\frac{S^n}{n!}
}
$$

这就是 Franck–Condon 因子的 Poisson 分布。

### 代回关联函数并求和

将式 (4) 代入式 (3)：

$$
C^{(0)}(t)
=
e^{i\Delta G^0t/\hbar}
\sum_{n=0}^{\infty}
e^{-S}\frac{S^n}{n!}e^{in\omega t}
$$

整理：

$$
C^{(0)}(t)
=
e^{i\Delta G^0t/\hbar}
e^{-S}
\sum_{n=0}^{\infty}
\frac{(Se^{i\omega t})^n}{n!}
$$

根据指数函数的 Taylor 展开：

$$
e^x=\sum_{n=0}^{\infty}\frac{x^n}{n!}
$$

所以：

$$
\sum_{n=0}^{\infty}
\frac{(Se^{i\omega t})^n}{n!}
=
e^{Se^{i\omega t}}
$$

最终：

$$
\boxed{
C^{(0)}(t)
=
e^{i\Delta G^0t/\hbar}
\exp\left[S(e^{i\omega t}-1)\right]
}
$$

如果只考虑振动浴的关联函数，将独立的电子自由能差 $\Delta G^0$ 剥离，就得到：

$$
\boxed{
C_\alpha^{(0)}(t)
=
\exp\left[
S_\alpha(e^{i\omega_\alpha t}-1)
\right]
}
$$

**所以到这里我们的高频低频相关函数都计算出来了**

## Pump光激发改变分子布居

我们进一步考虑当光泵浦之后，关联函数应该如何修改？

假设光泵浦激发了部分直接参与电子转移的水振动模式。泵浦后，相应模式的振动密度矩阵近似为：

$$
\boxed{
\rho_\alpha^{\mathrm{pump}}
=
(1-f_\alpha)|0\rangle\langle0|
+
f_\alpha|1\rangle\langle1|
}
$$

其中：

$$
f_\alpha
$$

是振动第一激发态的布居比例。

例如：

$$
f_\alpha=0.05
$$

表示在这个模型中，5% 的相关振动模式处于 $v=1$，其余 95% 处于 $v=0$。

由于关联函数对密度矩阵是线性的：

$$
C_\alpha^{\mathrm{pump}}(t)
=
(1-f_\alpha)C_\alpha^{(0)}(t)
+
f_\alpha C_\alpha^{(1)}(t)
$$

对于位移谐振子，可以严格求得：

$$
C_\alpha^{(1)}(t)
=
C_\alpha^{(0)}(t)
\left[
1-2S_\alpha(1-\cos\omega_\alpha t)
\right]
$$

所以：

$$
\boxed{
\begin{aligned}
C_\alpha^{\mathrm{pump}}(t)
={}&
e^{S_\alpha(e^{i\omega_\alpha t}-1)}\\
&\times
\left[
1-2f_\alpha S_\alpha
(1-\cos\omega_\alpha t)
\right]
\end{aligned}
}
$$

这就是我们要找的光激发后 OH/HOH 振动关联函数的最简解析表达式。

它非常直观地包含三个因素：

$$
\boxed{
f_\alpha,\quad S_\alpha,\quad\omega_\alpha
}
$$

分别代表激发了多少振动、振动与电子转移能隙耦合多强，以及振动的频率。

## OH/HOH 振动关联函数和电子转移速率

将 OH 和 HOH 都考虑进去：

也就是

$$
\boxed{
\begin{aligned}
C_{\mathrm{pump}}(t)
={}&
\exp\left[
\frac{i(\Delta G^0+\lambda_s)t}{\hbar}
-\frac{\lambda_s k_BT}{\hbar^2}t^2
\right] \\
&\times
\exp\left[
S_{\mathrm{OH}}(e^{i\omega_{\mathrm{OH}}t}-1)
\right] \\
&\times
\left[
1-2f_{\mathrm{OH}}S_{\mathrm{OH}}
(1-\cos\omega_{\mathrm{OH}}t)
\right] \\
&\times
\exp\left[
S_{\mathrm{HOH}}(e^{i\omega_{\mathrm{HOH}}t}-1)
\right] \\
&\times
\left[
1-2f_{\mathrm{HOH}}S_{\mathrm{HOH}}
(1-\cos\omega_{\mathrm{HOH}}t)
\right]
\end{aligned}
}
$$

$$
\boxed{
\begin{aligned}
C_{\mathrm{pump}}(t)
={}&
e^{i(\Delta G^0+\lambda_s)t/\hbar}
e^{-\lambda_s k_BTt^2/\hbar^2}\\
&\times C_{\mathrm{OH}}^{\mathrm{pump}}(t)
C_{\mathrm{HOH}}^{\mathrm{pump}}(t)
\end{aligned}
}
$$

这是在独立模式、对角布居和短时间静态 Gaussian 浴假设下的计算模型。

如果泵浦只激发 OH，就令 $f_{\mathrm{HOH}}=0$；如果只激发 HOH，则令 $f_{\mathrm{OH}}=0$。

我们带回最早的电子转移速率和相关函数关系的表达式计算：

$$
\boxed{
k_{\mathrm{ET}}^{\mathrm{pump}}
=
\frac{2|V_{if}|^2}{\hbar^2}
\operatorname{Re}
\int_0^\infty C_{\mathrm{pump}}(t)\,dt
}
$$

便能比较泵浦前后的速率。

# 模型总结

## **电子转移理论模型的推导框架**

### 1. 二态 Hamiltonian + Dyson 展开

电子耦合 $V_{if}$，核 Hamiltonian $H_i,H_f$。

$$
C_{if}(t)
=
\operatorname{Tr}_n
\left[
\rho_i
e^{-iH_it/\hbar}
e^{iH_ft/\hbar}
\right]
$$

### 2. Fermi Golden Rule

$$
k
=
\frac{2|V_{if}|^2}{\hbar^2}
\operatorname{Re}
\int_0^\infty C_{if}(t)\,dt
$$

### 3. 选择溶剂与振动模型

低频经典 Gaussian 浴 + 高频量子谐振子。

### 4. 标准 Marcus–Levich–Jortner（MLJ）模型

平衡初态的 Franck–Condon 加权速率。

### 5. 我们的扩展模型

非热 OH/HOH 激发布居 + 随泵浦延迟变化的速率。

### 6. SFG与电子转移的关系

并且进一步的我们通过这个关联函数找到了SFG信号与电子转移速率之间的关系。

在独立谐振子、线性振电耦合和热平衡假设下，SFG–ET关系可以推导出之前 MLJ 模型中的高频量子关联函数。

$$
\lambda_{\mathrm{OH}}
=
\frac{g^2}{\pi\mathcal Nab}
\int_0^\infty
\frac{
\operatorname{Im}\chi_{\mathrm{SFG}}^{(2),\mathrm{res}}(\omega)
}{\omega}\,d\omega
$$

# 正文参数分析部分

这里把 $k$ 解释为有效转移速率，还要求振动布居变化和溶剂弛豫与反应的时间尺度允许这种近似。否则需要计算非平衡时间分辨的转移概率，而不是一个恒定速率。

我们给模型一组参数

| 参数 | 假设值 | 说明 |
|----|----|----|
| 温度 $T$ | 300 K | 室温 |
| 低频浴重组能 $\lambda_s$ | 0.40 eV | 示例值 |
| OH 频率 | 3700 cm⁻¹ | Free OH |
| HOH 频率 | 1650 cm⁻¹ | 弯曲振动 |
| OH 的 $S_{\mathrm{OH}}$ | 0.03 | 弱振动耦合示例 |
| HOH 的 $S_{\mathrm{HOH}}$ | 0.10 | 较强耦合示例 |
| 泵浦后布居 $f$ | 5% | 参与反应的局域振动模式中，5% 处于 $v=1$ |

相应的模式重组能为：

$$
\lambda_{\mathrm{OH}}
=S_{\mathrm{OH}}\hbar\omega_{\mathrm{OH}}
\approx0.0127\ \mathrm{eV}
$$

$$
\lambda_{\mathrm{HOH}}
=S_{\mathrm{HOH}}\hbar\omega_{\mathrm{HOH}}
\approx0.0205\ \mathrm{eV}
$$

### 如何计算速率？

代入 Fermi Golden Rule，并对振动态求和：

$$
\boxed{
\begin{aligned}
k_{\mathrm{ET}}
={}&
\frac{2\pi|V_{if}|^2}
{\hbar\sqrt{4\pi\lambda_s k_BT}}\\
&\times
\sum_{n,m}p_n F_{mn}
\exp\left[
-\frac{(\Delta G^0+\lambda_s+(m-n)\hbar\omega)^2}
{4\lambda_s k_BT}
\right]
\end{aligned}
}
$$

这里先写一个高频模式，$F_{mn}$ 是 Franck–Condon 因子：

$$
F_{mn}=|\langle m_f|n_i\rangle|^2
$$

泵浦前：

$$
p_0\approx1,\qquad p_1\approx0
$$

泵浦后：

$$
p_0=1-f,\qquad p_1=f
$$

所以可以将速率分成：

$$
\boxed{
k_{\mathrm{pump}}=(1-f)k_0+fk_1
}
$$

其中 $k_0$ 是初始振动量子数 $n=0$ 对应的速率，$k_1$ 是 $n=1$ 对应的速率。两个速率都包含全部允许的末态振动通道。

### 计算结果

考虑三个不同的电子转移自由能：

$$
\Delta G^0=-0.4,\quad0,\quad+0.2\ \mathrm{eV}
$$

各振动频率下，**光泵浦后的 ET 速率 / 泵浦前 ET 速率**：

| $\Delta G^0$ | 3400 cm⁻¹、5% OH | 3700 cm⁻¹、5% 自由 OH | 3700 cm⁻¹、1.5% 自由 OH |
|------------------|------------------|------------------|------------------|
| −0.4 eV      | 0.997            | 0.997                 | 0.999                   |
| 0 eV         | 1.071            | 1.067                 | 1.020                   |
| +0.1 eV      | 1.551            | 1.618                 | 1.186                   |
| +0.2 eV      | 5.206            | 6.624                 | 2.687                   |

**激发不同 Free OH 光泵浦后的 ET 速率 / 泵浦前 ET 速率**

| $\Delta G^0$ | 仅激发 OH 5% | 仅激发 HOH 5% | 两者均激发 5% |
|--------------|-------------:|--------------:|--------------:|
| −0.4 eV      |        0.997 |         0.994 |         0.991 |
| 0 eV         |        1.071 |         1.086 |         1.156 |
| +0.2 eV      |        5.205 |         1.678 |         5.886 |

数值来自上述双高频模式 + 经典 Gaussian 溶剂浴模型，保留振动通道至数值收敛；$S_{\mathrm{OH}}=0.03$，$S_{\mathrm{HOH}}=0.10$，$\lambda_s=0.4$ eV，$T=300$ K。OH 和 HOH 单独激发时，另一模式仍保留在基态。

## 考虑振动激发态寿命

考虑到OH 振动激发寿命非常短

![](images/paste-40.png){width="364"}

2024 年发表于 Nature Communications 的 Unified picture of vibrational relaxation of OH stretch at the air/water interface 研究，通过时间分辨 HD-VSFG 测得：

氢键 OH 伸缩的振动布居弛豫时间约为 0.2–0.4 ps。

自由 OH 激发向氢键 OH 激发的转换约为 0.9 ps，之后进一步向低频振动弛豫。

因此，一个更接近实验的模型应该把激发布居写成泵浦延迟 $t_d$ 的函数：

$$
\boxed{
f_{\mathrm{OH}}(t_d)
=
f_0e^{-t_d/T_1}
}
\tag{12}
$$

其中 $T_1$ 是振动布居弛豫时间。

在其他参数不改变时，式 (10) 给出：

$$
\boxed{
k_{\mathrm{ET}}(t_d)
=
k_0+
f_0e^{-t_d/T_1}(k_1-k_0)
}
$$

例如，假设：

$$
f_0=0.05,\qquad T_1=0.84\ \mathrm{ps}
$$

### 泵浦后瞬时速率的变化

先取 f0=1.5%，作为未标定的示例布居。

| 泵浦后延迟 | 剩余自由Free OH 激发布居 | +0.1 eV 速率比 | +0.2 eV 速率比 |
|------------|--------------------------|----------------|----------------|
| 0 ps       | 1.50%                    | 1.186          | 2.687          |
| 0.3 ps     | 1.05%                    | 1.130          | 2.180          |
| 0.84 ps    | 0.55%                    | 1.068          | 1.621          |
| 1 ps       | 0.46%                    | 1.056          | 1.513          |
| 2 ps       | 0.14%                    | 1.017          | 1.156          |
| 3 ps       | 0.04%                    | 1.005          | 1.047          |

如果电子转移在 1 ps 内被观测，应该使用平均速率

对实验来说，只比较某一个时刻的 $k(t)$ 不够。我们需要计算观测时间窗口内的平均：

$$
\overline{k}(t)
=
\frac{1}{t}\int_0^t k(t')\,dt'
$$

代入式 (1)：

$$
\boxed{
\frac{\overline{k}(t)}{k_0}
=
1+(R_0-1)\frac{T_1}{t}
\left(1-e^{-t/T_1}\right)
}
$$ {#eq-average-rate}

在初始自由 OH 布居 $f_0=1.5\%$ 时：

| 观测窗口  | +0.1 eV 平均速率比 | +0.2 eV 平均速率比 |
|-----------|-------------------:|-------------------:|
| 0–0.84 ps |              1.117 |              2.066 |
| 0–1 ps    |              1.108 |              1.986 |
| 0–2 ps    |              1.071 |              1.643 |
| 0–5 ps    |              1.031 |              1.283 |

所以，在这些特定模型参数下，3700 cm⁻¹ 自由 OH 激发可使 +0.2 eV 反应在第一个皮秒内的平均有效速率达到未泵浦时的约 2 倍。

但必须再次强调：这个两倍结果不是文献实验测量值，它建立在未经验证的 $S_{\mathrm{free}}=0.03$、$\lambda_s=0.4$ eV 和 $f_0=1.5\%$ 上。

### 电子转移概率

对于一个在 $t=0$ 开始反应的初态群体，如果只存在不可逆 ET，则电子转移概率：

$$
P_{\mathrm{ET}}(t)
=
1-\exp\left[
-\int_0^t k(s)\,ds
\right]
$$

将式 (1) 代入后：

$$
\boxed{
P_{\mathrm{ET}}(t)
=
1-\exp\left[
-k_0t
-k_0(R_0-1)T_1
\left(1-e^{-t/T_1}\right)
\right]
}
$$ {#eq-et-probability}

在 $f_0=1.5\%$ 的示例中，前 1 ps 内：

| 指标           |             +0.1 eV |             +0.2 eV |
|----------------|--------------------:|--------------------:|
| 未泵浦转移概率 | $5.52\times10^{-5}$ | $3.86\times10^{-6}$ |
| 泵浦后转移概率 | $6.12\times10^{-5}$ | $7.67\times10^{-6}$ |
| 额外转移概率   | $5.98\times10^{-6}$ | $3.81\times10^{-6}$ |

也就是每 100 万个反应初态分子中，在这一皮秒窗口里，额外发生大约 6 个或 4 个电子转移事件。

**也就是说由于产物太少，Pump 引起的水振动信号可能远大于 ET 产物引起的 SFG 信号。**

所以想利用光激发Free OH可能是不可行的。但是这也为我们指了一条路，如果某个分子的电子转移中心对OH有很强的耦合，那这个分子可能有可观察的电子转移加速。

但是我这只是随意的选取了一组参数，真实的参数需要靠AIMD和真实的SFG溶剂动力学还有真实的实验拿到，但是这位我们指了一条路我们在一定范围内筛选分子。

$$
C_{if}(t)
=
\operatorname{Tr}_n
\left[
\hat{\rho}_i
e^{-i\hat{H}_it/\hbar}
e^{i\hat{H}_ft/\hbar}
\right]
$$

这个方程是严格的，我们做了一系列假设推导到Marcus–Levich–Jortner（MLJ）的版本，但是还可以根据实际的空气水界面情况调整。

还有一系列问题可能难为我们激光光斑要多大？ 有多少OH能被激发？ pump 时间如何选 10-20 μJ激光升高温度多么？ 由于空气水界面不同深度的水动力学不一样关联函数也是不一样的，分子的电子转移中心是泡在自由OH还是更深的水中？界面的双电层会让电子转移加速多少？通过H Bond的 能量转移可能加速电子转移吗？ （Tahara 2024 告诉我们：自由 OH 被激发后并非立即把能量变成热。

$$
\boxed{
\begin{aligned}
\mathrm{free\ OH}(v=1)
&\xrightarrow{\ \tau_f\approx0.84\ \mathrm{ps}\ }
\mathrm{HB\ OH}(v=1)\\
&\xrightarrow{\ \tau_H\approx0.34\ \mathrm{ps}\ }
\text{弯曲泛频、低频振动等}
\end{aligned}
}
$$