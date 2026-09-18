---
title: "electrostatics-and-Outer-sphere-reorganization-energy"

date: 2026-09-14

description: "在1950年用静电学描述溶剂是合适的,但是现在有SHS和AIMD之后我们需要更多的细节.无论怎么样,让我们先跟着马库斯先生一起推导吧"

categories:
  - 电化学
  - 电子转移

lang: zh-CN

translation-key: electrostatics-and-Outer-sphere-reorganization-energy

status: working

draft: false
---

# Electrostatics and Outer-sphere Reorganization Energy

## 开头总结

这一部分想从最基础的介质静电学出发，先理解自由电荷、介质极化、电位移矢量、电场和电势之间的关系，再把这些结果放进 Marcus 的连续介质图像中。核心问题是：当电子发生转移时，为什么溶剂的“快极化”和“慢极化”不能同时响应，以及这种时间尺度分离为什么最终会给出外层重组能中的 $\left(1/\varepsilon_{op}-1/\varepsilon_s\right)$。

## 1. 从 $\mathbf{D}$、$\mathbf{E}$ 和 $\mathbf{P}$ 开始

我们也跟着马库斯学点静电学,我最讨厌这个了.一堆在中文互联网上的大学物理视频教这个就是堆符号,完全不利于我这个ADHD,搞的比我学量子力学还难,我要谢谢樱井纯他的量子力学书真优美阿!

大家赏脸看看下面这个逻辑是不是能帮助你理解:

$$
\mathbf{E}
=
\frac{\mathbf{D}}{\varepsilon_0}
-
\frac{\mathbf{P}}{\varepsilon_0}
\tag{1}
$$

我们先从这个大家都熟悉的电场公式来,真实电场 $\mathbf{E}$的大小,可以被看成是外部电荷带来的“原始场$D$”，**减去**介质极化后拼命“抵抗$P$”所消耗掉的场。其中$D$的物理意义是**一条起点只能是正的自由电荷，终点只能是负的自由电荷的线。**国际单位是 **库仑/平方米 ($C/m^2$)**。[1]

$\varepsilon_0$ 是**真空介电常数（vacuum permittivity）**，在 SI 单位制中确定电荷、电场与电位移之间的尺度关系。[1]

然后我们改写一下,

$$
\mathbf{D}
=
\varepsilon_0\mathbf{E}
+
\mathbf{P}
\tag{2}
$$

在各向同性电解质中比如水,因为极化强度 $\mathbf{P}$ 与真实电场 $\mathbf{E}$ 成正比,所以他们的关系可以被简化为

$$
\mathbf{D}
=
\varepsilon_0\varepsilon_s\mathbf{E}
\tag{3}
$$

$\varepsilon_0$ 是真空电容率，$\varepsilon_s$ 是溶剂的相对静介电常数.[1]

### 1.1 从介电常数看介质极化

再改写一下

$$
\mathbf{E}
=
\frac{\mathbf{D}}{\varepsilon_s\varepsilon_0}
\tag{4}
$$

现在把 $\mathbf{E}$ 代回$\mathbf{D} = \varepsilon_0 \mathbf{E} + \mathbf{P}$普遍定义式中：

$$
\mathbf{D}
=
\varepsilon_0
\left(
\frac{\mathbf{D}}{\varepsilon_s\varepsilon_0}
\right)
+
\mathbf{P}
\tag{5}
$$

做点简单数学变化就能得到,

$$
\mathbf{P}
=
\left(
1-\frac{1}{\varepsilon_s}
\right)
\mathbf{D}
\tag{6}
$$

- 如果在真空中（$\varepsilon_s=1$），那么 $\mathbf{P}=0$，意味着没有极化。

- 如果介电常数很大（比如水，$\varepsilon_s \approx 80$），那么括号里的值接近于 1，这意味着极化强度 $\mathbf{P}$ 几乎等同于自由电场 $\mathbf{D}$ 的强度——外加场几乎全被用来极化介质了。

## 2. 一个带自由电荷的小球能产生多大的 $\mathbf{D}$

那我们现在来看一个带有自由电荷 $q$ 的孤立小球能产生多少电位移矢量$D$.

如果想衡量一个曲面一共被多少根“电位移线”穿透。

$$
\Phi_D
=
\iint_A
\mathbf{D}\cdot d\mathbf{A}
\tag{7}
$$

这时候数学家给我提供了电场的**高斯定理**,

$$
\oint
\mathbf{D}\cdot d\mathbf{A}
=
q_{\mathrm{free}}
\tag{8}
$$

也就是一个闭合的三维曲面（高斯面）上的电位移通量，恰好等于这个三维面包住的**自由电荷的总代数和**。[1]

那一个带 $q$ 电荷的小球能产生的电位移矢量$D$就可以等于:

取一个恰好贴合小球表面（半径为 $r$）的球面作为高斯面，其表面积为 $4\pi r^2$，那么积分可以简化为：

$$
D\cdot4\pi r^2=q
\qquad\Rightarrow\qquad
D
=
\frac{q}{4\pi r^2}
\tag{9}
$$

## 3. 溶剂极化如何削弱真实电场

那我们考虑点溶剂极化,看看这个小球能辐射出多少电场呢?当小球带电时，周围的溶剂分子（例如极性的水分子）会被电场极化。分子内部的正负电荷中心会发生偏移（或者极性分子直接发生转动取向），在小球表面附近感应出一层**束缚电荷（Bound charge）**。这层束缚电荷的极性与小球恰好相反，从而抵消、削弱了小球原本发出的电场。

把前面的公式$\mathbf{D} = \varepsilon_0 \varepsilon_s \mathbf{E}$拿过来,其中 $\varepsilon_0$ 是真空介电常数，$\varepsilon_s$ 是溶剂的相对静介电常数。带入$D = \frac{q}{4\pi r^2}$,即可求得小球表面真实的电场强度：

$$
E
=
\frac{q}
{4\pi\varepsilon_0\varepsilon_s r^2}
\tag{10}
$$

你可以看到，由于溶剂的极化屏蔽，真实的电场强度变为了真空中的 $1/\varepsilon_s$.

## 4. 沿电场路径积分求电势 $V$

**沿电场路径积分求电势（V）**

电势的物理定义是：将一个单位正电荷从无限远处（电势为零的参考点）缓慢移动到小球表面 $r$ 处，需要克服电场力所做的功。

在球对称场中，电势 $V$ 等于电场强度 $E$ 从无穷远到 $r$ 的线积分（加上负号表示克服电场做功）：

$$
V
=
-\int_{\infty}^{r}
E\,dr'
\tag{11}
$$

将第二步得出的 $E$ 的表达式代入积分式：

$$
V
=
-\int_{\infty}^{r}
\frac{q}
{4\pi\varepsilon_0\varepsilon_s(r')^2}
\,dr'
\tag{12}
$$

将常数项提出积分号，对 $1/(r')^2$ 进行积分：

$$
V
=
-\frac{q}
{4\pi\varepsilon_0\varepsilon_s}
\left[
-\frac{1}{r'}
\right]_{\infty}^{r}
\tag{13}
$$

$$
V
=
-\frac{q}
{4\pi\varepsilon_0\varepsilon_s}
\left(
-\frac{1}{r}
-
\left(-\frac{1}{\infty}\right)
\right)
\tag{14}
$$

因为 $1/\infty = 0$，负负得正，我们最终就得到了孤立小球表面的电势公式：

$$
V
=
\frac{q}
{4\pi\varepsilon_0\varepsilon_s r}
\tag{15}
$$

通过这个推导依旧可以看出，介质对静电作用的改变，在数学形式上极其优雅——仅仅是在真空公式的分母上乘上了一个宏观的介电常数 $\varepsilon_s$。

别着急,马上要到马库斯的推导了.

# 5. Marcus 外层溶剂重组能：把快极化和慢极化拆开

我们来假设一个“充电快，放电慢”的热力学循环（Thermodynamic Cycle），是 **Rudolph Marcus** 当初推导**外层溶剂重组能（Outer-sphere reorganization energy, $\lambda$）**的核心思想。[2,3,4]

这个推导的精髓在于：将溶剂的响应（极化）严格拆分为**慢响应（取向/核极化，对应静介电常数 $\varepsilon_s$）**和**快响应（电子/光学极化，对应光学介电常数 $\varepsilon_{op}$，通常等于折射率的平方 $n^2$）**。[2,3,4]

你可以认为溶剂极化的比较慢,,光(变化的电场)打过去带有偶极的水分子来不及跟着这个电场跳舞,所以这部分$\varepsilon_{op}$可以认为是电子在跳舞. 慢极化就是原子在跳舞,往往是被双电层电场这种静电场驱动

<img title="" src="file:///C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-16-12-07-46-image.png" alt="" data-align="center" width="396">

我们关注的是溶剂如何改变电子转移的自由能。因此比较状态1 A0+B0 和状态2 A0sol​+B0sol​的能量差。在两个状态中保持相同的电子结构A0+B0，只改变溶剂构型，从而得到溶剂极化对电子转移体系能量的贡献。

![](C:\Users\linqiao\Downloads\3%20state%20reoganization%20energy.svg)

## 6. 定义基础变量

- 假设小球 A 和 B 的半径分别为 $a$ 和 $b$，它们之间的距离为 $R$。转移的电荷量为 $e$。

- 真空中将这两个小球分别充电至 $+e$ 和 $-e$ 所需的基础静电能（包含自能和库仑相互作用）定义为 $U_0$：

$$
U_0
=
\frac{e^2}{4\pi\varepsilon_0}
\left(
\frac{1}{2a}
+
\frac{1}{2b}
-
\frac{1}{R}
\right)
\tag{16}
$$

其推导如下:

### 6.1 小球 A 的自能

$U_0$ 代表在真空中，将两个初始不带电的半径为 $a$ 和 $b$ 的小球（相距为 $R$），分别缓慢充电到 $+e$ 和 $-e$ 所需的总做功。它由三部分能量叠加而成：

- **小球 A 的自能 (Self-energy)：** 假设我们要给半径为 $r$ 的孤立小球充电。当它带有电荷 $q$ 时，其表面的电势为 $V = \frac{q}{4\pi\varepsilon_0 r}$。此时再往上增加一个微小电荷 $dq$，克服电场所需的做功为 $dW = V dq$。将电荷从 $0$ 慢慢充到 $e$ 的总做功积分如下：

$$
W_A
=
\int_{0}^{e}
\frac{q}{4\pi\varepsilon_0 a}\,dq
=
\frac{1}{4\pi\varepsilon_0 a}
\left[
\frac{1}{2}q^2
\right]_0^e
=
\frac{e^2}{8\pi\varepsilon_0 a}
=
\frac{e^2}{4\pi\varepsilon_0(2a)}
\tag{17}
$$

### 6.2 小球 B 的自能

- **小球 B 的自能：** 同理，将小球 B 充电到 $-e$ 需要的自能，因为电荷的平方 $(-e)^2 = e^2$，做功同样是正的：

$$
W_B
=
\int_{0}^{-e}
\frac{q}{4\pi\varepsilon_0 b}\,dq
=
\frac{e^2}{8\pi\varepsilon_0 b}
=
\frac{e^2}{4\pi\varepsilon_0(2b)}
\tag{18}
$$

### 6.3 两个小球之间的库仑相互作用

- **库仑相互作用能：** 当两个小球分别带上 $+e$ 和 $-e$ 的电荷，且相距为 $R$（假设 $R$ 远大于 $a$ 和 $b$，小球可视为点电荷）时，它们之间存在静电吸引势能：

$$
W_{AB}
=
\frac{(+e)(-e)}
{4\pi\varepsilon_0R}
=
-\frac{e^2}{4\pi\varepsilon_0R}
\tag{19}
$$

### 6.4 合并得到 $U_0$

- **合并总和：** 将这三项相加，提取公因式 $\frac{e^2}{4\pi\varepsilon_0}$，就是真空中的总静电能 $U_0$：

$$
U_0
=
W_A+W_B+W_{AB}
=
\frac{e^2}{4\pi\varepsilon_0}
\left(
\frac{1}{2a}
+
\frac{1}{2b}
-
\frac{1}{R}
\right)
\tag{20}
$$

## 7. 态 1 到态 3：平衡态的能量（Born 公式）

- **态 1**：真空中不带电的小球 A 和 B。我们定义其静电自由能为 $G_1 = 0$。

- **态 3**：小球带有 $+e$ 和 $-e$ 电荷，且溶剂已经**完全弛豫**（快、慢极化均达到平衡）。

- **过程 1$\rightarrow$3**：相当于把不带电的小球放入溶剂，并在溶剂中极其缓慢地给它们充电到 $e$。此时总介电常数 $\varepsilon_s$ 起作用。利用 **Born 公式**（包含两球库仑项）[5]，该平衡态的静电自由能为：

$$
G_3
=
W_{1\rightarrow3}
=
\frac{U_0}{\varepsilon_s}
\tag{21}
$$

## 8. 态 2 到态 3：快响应过程的做功

- **态 2（你的假想态）**：小球**不带电**，但溶剂的“慢响应（取向）”被冻结在了态 3（带电态）的构型。

- **过程 2$\rightarrow$3**：我们在这种特殊的溶剂构型下，将小球从 0 极速充电到 $e$。

- 因为充电极快，**只有快的光学介电常数** **$\varepsilon_{op}$** **能够跟上电荷的变化**。

- 而溶剂的**慢极化场（取向极化）保持冻结**，它相当于一个预先存在的、恒定的外加电势场。

- **能量积分**：在从电荷 $q=0$ 充到 $q=e$ 的过程中，电荷所感受到的电势包含两部分：(1) 瞬时电荷 $q$ 在快介质 $\varepsilon_{op}$ 中产生的电势；(2) 态 3 冻结下来的慢极化场产生的恒定电势。[2,3]

“快过程”中做功为：

$$
W_{2\rightarrow3}
=
G_3-G_2
=
U_0
\left(
\frac{2}{\varepsilon_s}
-
\frac{1}{\varepsilon_{op}}
\right)
\tag{22}
$$

*(**注：这里 $\frac{2}{\varepsilon_s}$* *的项来源于冻结的平衡态极化场对瞬时电荷所做的功，而 $-\frac{1}{\varepsilon_{op}}$* *来源于快介质自身的屏蔽效应。)*

## 9. 综合过程：求解重组能（态 1 到态 2）

我们真正感兴趣的是**溶剂重组能** **$\lambda$**，也就是在没有发生电子转移时，纯粹为了把溶剂扭曲到产物构型（态 2）所需的能量代价。[2,3,4]

显然：

$$
\lambda
=
G_2-G_1
\tag{23}
$$

利用能量守恒定律，我们可以将这条路径拆解为：

$$
G_2-G_1
=
(G_3-G_1)
-
(G_3-G_2)
\tag{24}
$$

代入上面两步做功的结果：

$$
\lambda
=
W_{1\rightarrow3}
-
W_{2\rightarrow3}
\tag{25}
$$

$$
\lambda
=
\frac{U_0}{\varepsilon_s}
-
U_0
\left(
\frac{2}{\varepsilon_s}
-
\frac{1}{\varepsilon_{op}}
\right)
\tag{26}
$$

$$
\lambda
=
U_0
\left(
\frac{1}{\varepsilon_s}
-
\frac{2}{\varepsilon_s}
+
\frac{1}{\varepsilon_{op}}
\right)
\tag{27}
$$

$$
\lambda
=
U_0
\left(
\frac{1}{\varepsilon_{op}}
-
\frac{1}{\varepsilon_s}
\right)
\tag{28}
$$

## 10. 结论：Marcus 外层溶剂重组能

将 $U_0$ 的表达式代入，我们就得到了大名鼎鼎的 **Marcus 溶剂重组能公式**（也被称为 Pekar factor 分离公式）[2,3,4]：

$$
\lambda
=
\frac{e^2}{4\pi\varepsilon_0}
\left(
\frac{1}{2a}
+
\frac{1}{2b}
-
\frac{1}{R}
\right)
\left(
\frac{1}{\varepsilon_{op}}
-
\frac{1}{\varepsilon_s}
\right)
\tag{29}
$$

## 参考文献

[1] Griffiths, D. J. *Introduction to Electrodynamics*, 4th ed. Pearson, 2013.

[2] Marcus, R. A. “Electrostatic Free Energy and Other Properties of States Having Nonequilibrium Polarization. I.” *The Journal of Chemical Physics* **24** (5) (1956): 979–989. https://doi.org/10.1063/1.1742724

[3] Marcus, R. A. “On the Theory of Oxidation-Reduction Reactions Involving Electron Transfer. I.” *The Journal of Chemical Physics* **24** (5) (1956): 966–978. https://doi.org/10.1063/1.1742723

[4] Marcus, R. A. “Electron transfer reactions in chemistry. Theory and experiment.” *Reviews of Modern Physics* **65** (3) (1993): 599–610. https://doi.org/10.1103/RevModPhys.65.599

[5] Born, M. “Volumen und Hydratationswärme der Ionen.” *Zeitschrift für Physik* **1** (1920): 45–48. https://doi.org/10.1007/BF01881023
