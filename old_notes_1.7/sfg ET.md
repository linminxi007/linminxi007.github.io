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

我们先给出ando的时间关联算符（Quantum energy gap law of outer-sphere electron transfer reactions: A molecular dynamics study on aqueous solution Koji Ando The Journal of Chemical Physics 106, 116 (1997); doi: 10.1063/1.473037），还有马库斯Jono的量子描述，我们只在描述HOH的弯曲震动和O H的高频震动，在量子行为上是如何改变电子转移速率的？我这里不想显示的引入重重人更愿意讨论溶剂本身的振动和相位累积对于电子转移的影响。 我想给出多种时间关联函数对于溶剂的描述 要注意我在这里讨论的是平衡的溶剂对电子效果，我想达成的是用艺术PMP光直接激发某一个界面，空气水或金属水界面的O H震动丛而影响电子转移。 我们需要小心这里的非平衡性，但是无论如何，我们也先从平衡开始讨论，再进到非平衡的阶段，从简单的开始奥卡姆剃刀原则，无必要勿增实体，万一平衡的就可以讨论了呢，或者平衡的时候只需要加一点微小的改动就能得到非平衡上的结果。

由于我们讨论的是电子转移问题，所以我们先给出跃迁振幅和跃迁概率的推导。

我们知道对于相互作用算符我们有：

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

在相互作用表象下，跃迁振幅定义为，意思是i在经过一个扰动随时间变化了一段时间后和f的耦合程度：

$$
A_{fi}^{(I)}(t)
=
\langle f|\hat{U}_I(t)|i\rangle
$$

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

因此，电子从 $i$ 跳到 $f$ 的一阶跃迁振幅算符为：

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

------------------------------------------------------------------------

从跃迁振幅得到跃迁概率

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

因为我们讨论的溶剂的振动如何影响电子转移，所以我们要引入核坐标和电子坐标

## 从简单量子力学到电子转移

在 Sakurai 的普通两能级系统中，如果没有其他自由度：

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

这本质上仍然是振幅平方，只是写成了算符形式。

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

定义：

$$
\tau=t_1-t_2
$$

于是自然可以引入下面的函数。

## 4. Ando 关联函数的出现

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

这个方法也出现在 Koji Ando 1997 年研究溶液外球电子转移的工作中。Tokmakoff 的电子转移教材同样使用了这一关联函数形式，不过采用复共轭的算符顺序。

我们仔细来看这个方程

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

他可以看成是初态在随着被初末态哈密顿量驱动的时间演化算符变化的过程。你可以看到如果初末态哈密顿量（分子自身的哈密顿量+溶剂的哈密顿量）越像电子转移越快。

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

这下看的更清楚了，初末态耦合越强（当然，这里也隐藏了初末态波函数的对称性和选择定则），初末态能量越接近关联函数越大，从而电子转移就越快，很自然的如果是初态到初态到电子转移，也就是自己转移到自己身上那关联函数就是1。

![](images/paste-34.png){fig-align="left" width="205"}

![](images/paste-35.png){width="205"}

蓝线代表不同核构型贡献的单位复振幅，橙线代表平均值。蓝线长度始终为 1，但相位分散后橙线通常缩短。这是示意模型，并非实际溶剂计算。

所以溶剂的贡献的相位之间也可以像费曼路径积分一样叠加在一起。

两个电子态具有相同或不同的振动，分别会怎样？

![](images/paste-36.png){width="389"}

情况 A：两个电子态的振动完全相同

\\\[
\\boxed{\|C\_{if}(t)\|=1}
\\\]

情况 B：频率相同，但振动平衡位置不同

\\\[
\\begin{aligned}
U_f(q)
={}&\\Delta G\^0+
\\frac12m\\omega\^2(q\^2-2dq+d\^2)\\\\
={}&\\Delta G\^0+
\\frac12m\\omega\^2q\^2
-m\\omega\^2dq
+\\frac12m\\omega\^2d\^2
\\end{aligned}
\\\]

两态能量差为：

\\\[
X(q)=U_f(q)-U_i(q)
\\\]

因此：

\\\[
X(q)=\\Delta G\^0+\\frac12m\\omega\^2d\^2-m\\omega\^2dq
\\\]

定义重组能：

\\\[
\\boxed{
\\lambda=\\frac12m\\omega\^2d\^2
}
\\tag{11}
\\\]

就得到：

\\\[
\\boxed{
X(q)=\\Delta G\^0+\\lambda-m\\omega\^2dq
}
\\tag{12}
\\\]

这是非常关键的一步。

虽然两个势能面的振动频率完全相同，但由于它们的平衡位置不同，核坐标 \\(q\\) 会线性调制电子态之间的能量间隙。

定义：

\\\[
\\kappa=m\\omega\^2d
\\\]

则：

\\\[
\\boxed{X(q)=\\Delta G\^0+\\lambda-\\kappa q}
\\tag{13}
\\\]

这里 \\(\\kappa\\) 就是以核坐标表示的能隙耦合强度，量纲为能量除以长度。

注意上图这里的d是两态的平衡核坐标差，\\(d\\) 通过 \\(S\\propto d\^2\\) 控制核波包演化的相干重叠，而\\(\\omega\\) 决定相位振荡和核波包复现的频率。

\\(\\lambda\\) 同时具有两个含义：

一方面，它是两个势能面的几何位移所对应的重组能。

另一方面，它刻画了核坐标与电子态能隙的耦合强度：

\\\[
\\lambda=\\frac{\\kappa\^2}{2m\\omega\^2}
\\\]

位移越大、曲率越高，通常意味着能隙对核坐标越敏感。

#### 从谐振子量子化得到电子–振动耦合

用产生、湮灭算符表示核坐标：

\\\[
\\hat q=
\\sqrt{\\frac{\\hbar}{2m\\omega}}
(\\hat a+\\hat a\^\\dagger)
\\\]

于是初态哈密顿量为：

\\\[
\\hat H_i=
\\hbar\\omega\\left(\\hat a\^\\dagger\\hat a+\\frac12\\right)
\\\]

利用 \\\[
\\boxed{X(q)=\\Delta G\^0+\\lambda-\\kappa q}
\\tag{13}
\\\]：

\\\[
\\hat H_f=
\\hat H_i+\\Delta G\^0+\\lambda
-\\kappa
\\sqrt{\\frac{\\hbar}{2m\\omega}}
(\\hat a+\\hat a\^\\dagger)
\\\]

定义能量量纲的振动耦合常数：

\\\[
\\boxed{
g=\\kappa\\sqrt{\\frac{\\hbar}{2m\\omega}}
}
\\tag{14}
\\\]