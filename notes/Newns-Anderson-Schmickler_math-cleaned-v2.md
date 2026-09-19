---
title: "Newns-Anderson-Schmickler"

date: 2026-09-14

description: "这是一个电子转移理论,我更愿意称之为电子共享理论.从电子结构的角度了解金属是如何与表面吸附的分子分享电子,也能帮助我们了解金属的电子结构如何影响双电层的形成."

categories:
  - 电子转移
  - 电化学

lang: zh-CN

translation-key: Newns-Anderson-Schmickler

status: working

draft: false

format:
  html:
    html-math-method: mathjax

---

# Newns-Anderson-Schmickler

那么金属是如何与分子相互作用的呢? 电子转移是如何发生的呢? 溶剂又能起到什么作用呢?

还有一个好玩的发现,其实我们是用谐振子和中心极限定理来描述几乎溶液的一切.

## 本文主线

这篇文章的主线可以压缩成三步：从 **Anderson模型** 出发，先用 **Green函数** 把局域电子态和连续金属能带的耦合写成 **态密度（DOS）**；然后进入 **Newns–Anderson模型**，看吸附物能级怎样发生移动、展宽以及成键/反键分裂；最后进入 **Schmickler模型**，把电极电势、溶剂的**快变量和慢变量**以及**重组能**加入电子共享图像。中间那段关于谐振子、**中心极限定理**和 **Einstein 涨落理论**，其实是在解释为什么溶剂自由度经常可以被压缩成一个近似二次的自由能面。

![](images/paste-14.png){fig-align="center" width="723"}

**我们先不废话,上来直接看图片理解Newns–Anderson, 从图中b从右向左看起,孤立的气体分子有分子轨道2px,y,z,当他们靠近表面的时候就会与金属的d轨道相互作用,于是根据分子轨道和金属的d轨道波函数对称性匹配的情况,2pz耦合的更好能量更低,形成了成键轨道和反键轨道,而2px,py轨道波函数重合部分较少形成非键轨道(nb).在最左图中DOS也就是金属如何安排它的电子在不同的离散能级,这里连续的画只是一个数学处理. a图红色的是Cu 3d轨道,也可以看到只有费米能级一下填充了电子,填充到成键电子越多吸附相对越强,防止反键轨道填充越多吸附越弱.**Free-atom-like d states in single-atom alloy catalysts Nature Chemistry 2018 M. T. Greiner \[记得添加这个图片的引用\]

## 1. anderson

### Anderson 模型的问题来源

为什么把极少量的磁性过渡金属原子（如 Fe）作为杂质掺入到非磁性金属（如 Cu）中时，有些杂质能保持磁性，而有些却失去了磁性？“孤立定域态与连续能带相互作用”的数学框架，完美地契合了表面化学吸附的物理图像，从而在8年后被 D. M. Newns 借用，演变成了描述吸附的基石。\[1,2\]

在这里我们先介绍一下格林函数,我数学不好,这次不太能理解这玩意的几何图像或物理意义.管他啥函数我们当个工具先耍耍.我们先来看看Green函数与态密度的关系,

### Green函数与态密度的关系

量子物理/固体物理中，Green函数可以通过与态密度相联系，以诠释其物理意义。态密度（Density of States, DOS）可被定义为

$$
\rho(E)=\sum_j\delta(E-E_j)
\tag{1}
$$

态密度就是看电子在不同能量下是怎么排布的,$\delta$不是普通的0或1函数；当$E\neq E_j$时它为0，在$E=E_j$处以积分意义表示一个态.

为了表达方便，接下来的表述都将采用 Dirac 符号。由于同一个哈密顿量作用在不同的本征矢上会得到不同的本征能量，因此我们可以定义

$$
\hat{H}\psi_j=E_j\psi_j
\tag{2}
$$

咱先别管Green函数怎么来的,因为我就先把它当工具,咱们不是搞数学的.你就当你无聊乱试试看什么算符对$\psi_j$做投影能得到态密度. 人们就发现了一个算符Green函数，其可以作用在态矢上得到

$$
\langle\psi_j|G|\psi_j\rangle
=
\langle\psi_j|(E-\hat{H})^{-1}|\psi_j\rangle
=
(E-E_j)^{-1}\langle\psi_j|\psi_j\rangle
\tag{3}
$$

由本征态的正交归一性有

$$
\langle\psi_i|\psi_j\rangle=\delta_{ij}
\tag{4}
$$

于是

$$
\langle\psi_j|G|\psi_j\rangle=(E-E_j)^{-1}
\tag{5}
$$

以上公式对 $j$ 进行求和有

$$
\sum_j\langle\psi_j|G|\psi_j\rangle
=
\sum_j(E-E_j)^{-1}
\tag{6}
$$

在量子力学中，一个算符可以被用一个矩阵表示。上式可以认为是对该矩阵对角线元素求和（其他元素如 $\langle\psi_1|G|\psi_2\rangle$、$\langle\psi_3|G|\psi_2\rangle$ 都不是对角线上的元素），即求矩阵的迹（Trace）。于是上式也可以写成

$$
\operatorname{Tr}G(E)=\sum_j(E-E_j)^{-1}
\tag{7}
$$

这时候对比上式与态密度的定义

$$
\rho(E)=\sum_j\delta(E-E_j)
\tag{8}
$$

已经可以发现 Green 函数和态密度之间可以存在联系，只不过相差了一个 $\delta$ 函数。接下来的工作就是要在 Green 函数中添加一个 $\delta$ 函数。

### 从 Plemelj 公式到DOS –— 别怕,只是一个数学技巧

为了避免分母为零，引入复数能量

$$
E\rightarrow E+is
\tag{9}
$$

再令

$$
\xi_j=E-E_j
\tag{10}
$$

于是上式可以写为

$$
\sum_j\langle\psi_j|G|\psi_j\rangle
=
\sum_j(\xi_j+is)^{-1}
\tag{11}
$$

这时候数学家又给我了一个**Plemelj 公式**, \[3\]

$$
\frac{1}{\xi+i0^+}
=
\mathcal{P}\frac{1}{\xi}
-i\pi\delta(\xi)
\tag{12}
$$

因此

$$
\sum_j(\xi_j+i0^+)^{-1}
=
\sum_j
\left[
\mathcal{P}\left(\frac{1}{\xi_j}\right)
-i\pi\delta(\xi_j)
\right]
\tag{13}
$$

我们所在意的仅仅是 $\delta$ 函数部分，因此只取上述复数的虚部（Imaginary），有

$$
\operatorname{Im}\sum_j(\xi_j+i0^+)^{-1}
=
-\pi\sum_j\delta(\xi_j)
=
-\pi\sum_j\delta(E-E_j)
\tag{14}
$$

回到态密度的定义，得到 Green 函数与态密度的关系

$$
\operatorname{Im}\sum_j
\langle\psi_j|G(E)|\psi_j\rangle
=
-\pi\rho(E)
\tag{15}
$$

由于

$$
\operatorname{Tr}G(E)
=
\sum_j\langle\psi_j|G(E)|\psi_j\rangle
\tag{16}
$$

因此更常见的写法是

$$
\rho(E)
=
-\frac{1}{\pi}
\operatorname{Im}\operatorname{Tr}G^R(E)
\tag{17}
$$

### 局域态密度与 retarded Green function

其中 $G^R(E)$ 是 **retarded Green function**：

$$
G^R(E)
=
\frac{1}{E-\hat H+i0^+}
\tag{18}
$$

对于单独的一个态 $a$，定义**局域态密度（local density of states）**为 $\rho_a(E)$，则

$$
\rho_a(E)
=
-\frac{1}{\pi}
\operatorname{Im}G_{aa}^R(E)
\tag{19}
$$

其中

$$
G_{aa}^R(E)
=
\langle a|G^R(E)|a\rangle
\tag{20}
$$

也就是说，

$$
\operatorname{Im}G_{aa}^R(E)
=
-\pi\rho_a(E)
\tag{21}
$$

##### 所以阿,你想知道态密度DOS,那你就要先去找到格林函数Gaa的虚部.

### 其他理解路径和资料

https://www.mozheyang.top/2018/01/15/QMGreenFunction/ 中文 \[4\]

这里也有*Jülich* 的Jun Huang的视频 34:00左右介绍格林函数用于anderson模型的推到细节.\[5\]

https://www.koushare.com/video/details/33369?series_id=2063 中文,slides 英文.

或者你也可以按照Jens Nørskov在他的Fundamental Concepts in Heterogeneous Catalysis THE NEWNS–ANDERSON MODEL P185页,从矩阵里面看出Gaa.\[6\]

或者你也可以从更线性代数一点,更Two level形成分子轨道的角度出发,你可以看下面这个视频.

如果你真的不熟悉格林函数,你也可以直接用久期方程,对行列式做一些处理,最后得到一条吸附物的直线和一系列金属电子态的交点,你会发现两者分享电子形成的新的态,会更稳定也就是向着低能量方向位移. 后续再用回路积分算出来. 在下面视频43分左右.

![](images/paste-5.png){fig-align="center" width="541"}

https://www.koushare.com/video/details/70117 \[7\]

如果你仔细的推导你就会发现,free-d state那篇Nat. Chem.工作居然是有问题的.\[8\]

## 2. Newns–Anderson：吸附物与金属的电子共享

### **adsorbate-projected DOS**

好了,总之你可以得到adsorbate-projected DOS或者说吸附物和金属表面耦合在一起的DOS\[2,6\]

$$
n_a(\varepsilon)
=
-\frac{1}{\pi}\operatorname{Im}G_{aa}(\varepsilon)
=
-\frac{1}{\pi}\operatorname{Im}
\left(
\frac{1}
{\varepsilon-\varepsilon_a-\Lambda(\varepsilon)+i\Delta(\varepsilon)}
\right)
\tag{22}
$$

这里$\varepsilon_k$表示金属的电子能级,$\varepsilon_a$表示分子的电子能级, $\varepsilon$ 就是你要画的态密度DOS的x轴.

Multiplying the argument by its complex conjugate in the numerator and denominator and extracting the imaginary part, we get that

$$
n_a(\varepsilon)
=
\frac{1}{\pi}
\frac{\Delta(\varepsilon)}
{\left(\varepsilon-\varepsilon_a-\Lambda(\varepsilon)\right)^2+\Delta(\varepsilon)^2}
\tag{23}
$$

### 耦合展宽 $\Delta(\varepsilon)$ 与能级偏移 $\Lambda(\varepsilon)$

其中分子

$$
\Delta(\varepsilon)
=
\pi \sum_k V_{ak}^2 \, \delta(\varepsilon-\varepsilon_k)
\tag{24}
$$

的物理意义是金属的每一个态和分子直接有多强的耦合,耦合强度主要取决于他们波函数重叠的程度,也就是把一个波函数投影到另一个波函数上,突然这里又可以用类似Wigner–Eckart theorem定理的思维或者群论搞一通了哈哈.

分子的$\Lambda(\varepsilon)$,代表吸附质轨道的“**能级偏移函数（Energy Shift Function）**”。在物理上，它描述了孤立原子的能级在与金属表面发生杂化后，其**共振中心位置所发生的移动**。也就是刚刚黑板上的图片直线和众多函数交线相对于原始位置的偏移量. 在数学上,也是我们刚刚用Plemelj公式的实部,

$$
\Lambda(\varepsilon) = \mathcal{P} \sum_k \frac{\vert{}V_{ak}\vert{}^2}{\varepsilon - \varepsilon_k}
\tag{25}
$$

其中 $\mathcal{P}$ 代表柯西主值（Cauchy Principal Value），意味着在积分或求和时，要巧妙地扣除 $\varepsilon = \varepsilon_k$ 那个导致分母为零的奇点。在实际计算或者写代码的时候,是$\Delta(\varepsilon)$的希尔伯特变换（Hilbert Transform）.

![](images/paste-10.png){fig-align="center" width="490"}

### 共振展宽与 Electron Lifetime

图中的na(ε)就是分子吸附后分子的DOS, $\Delta(\varepsilon)$ 选取了宽大的sp electrons,所以很宽从-10eV到15eV.红线和橙色线的交点就是分子的单一轨道吸附到金属表面被轻微移动并且展宽了,电子被共享了,这个展宽还有个说法叫Electron Lifetime,在物理图像中，**共振峰越宽（“越肥大”），电子在吸附质上的寿命是越短的。** 也往往说明$V_{ak}$ 很大. 对具有有限寿命的共振态，能量展宽与衰减时间满足线宽—寿命的傅里叶关系，可以启发式写成：

$$
\Delta E \cdot \Delta t \ge \frac{\hbar}{2}
\tag{26}
$$

在表面吸附的格林函数图像中：

- **能量不确定度 (**$\Delta E$)：正是投影态密度 $n_a(\varepsilon)$ 中洛伦兹峰的半高全宽，即**展宽** $\Delta$。

- **时间尺度 (**$\Delta t$)：对应于电子在吸附质轨道（$\vert{}a\rangle$ 态）上停留的特征时间，也就是**电子寿命** $\tau$。

因此，它们的关系是**反比关系.**

$$
\tau \approx \frac{\hbar}{2\Delta}
\tag{27}
$$

从电子转移的角度来说,也就是说sp 电子会将吸附质能级展宽成一个**极宽的背景（宽度可达数个 eV）**，此时电子在吸附质上的寿命极短。相比之下，d 轨道是高度定域的。吸附质与 d 带的耦合相对较弱，电子的跨边界跃迁没有那么频繁。因此，d 电子带来的相互作用往往表现为态密度上**较窄的共振峰（宽度通常 \< 1 eV）**，此时电子的定域性更强，寿命相对较长。

### d-band、反键态与吸附强度

![](images/paste-11.png){fig-align="center" width="457"}

在Nørskov 的书中他认为反键态的占据是最重要的,所以反键态的占据电子如果被排空了，系统获得巨大的杂化吸引能**。因此：**$\epsilon_d$ 越高，吸附越强。下图就显示了两个na(ε)的小峰,高于0eV那个就是反键轨道.\[6\]

![](images/paste-16.png){fig-align="center" width="353"}

这里图的上半部分表示了金属的d轨道(蓝色的ρd)与分子轨道以及分子金属相互作用强弱(不同颜色的虚线)

表示了金属的d轨道(蓝色的ρd)与分子轨道(不同颜色的虚线表示不同的分子轨道,斜率表示相互作用强弱)作用的数学图像,下半部分表示作用之后的分子的态密度.

Infusing theory into deep learning for interpretable reactivity prediction Nature Communications 2021 Hongliang Xin \[记得添加这个图片的引用\]

### d-band center 的例外与 Pauli 排斥

Hongliang进一步在这个基础上完善,他们OH, F, Cl 吸附在 Pt, Pd 的 skin alloys,d band center出现了问题.当吸附态和金属都是**全满占据**,成键态下移的能量增益被反键态占据带来的能量抵消. 他引入了重叠 $S_{ad}$ 引起的正交化惩罚（Pauli排斥）来解释。这就宣告了金属的sp和d与吸附物的相互作用理论基本上被理解清楚了.\[9\]

## 3. Schmickler：从真空吸附进入电化学

于是我们可以进入电化学的世界.

在Newns-Anderson的基础上,*Schmickler* (PHYSICAL REVIEW B 79, 235436,2009 DOI: 10.1103/PhysRevB.79.235436)引入了溶剂化和电极电势对吸附质的影响,他把溶剂对分子的作用写成一个快量和慢量.\[10\]

### 溶剂的快变量和慢变量

在电子转移过程中，溶剂分子对中心电荷变化的响应并不是同步的：

- **快变量（Fast electronic modes）：** 来源于溶剂分子的电子极化（Electronic polarizability）。由于电子运动极快，其响应时间尺度在 $10^{-16}-10^{-15}\ \text{s}$。因此，快变量能够**绝热地（adiabatically）**跟上慢变量和电子转移的步伐。它的物理作用是瞬间完成响应，从而**重整化（renormalize）电子能级**，并不构成反应的动力学势垒。

- **慢变量（Slow solvent modes）：** 来源于溶剂分子整体的取向和结构畸变（如原子的移动），响应时间尺度在 $10^{-14}-10^{-11}\ \text{s}$。慢变量无法瞬间跟上电子跃迁，只能通过热涨落（fluctuations）缓慢演化。正是这种涨落导致了吸附质电子能级的移动，当能级移动到某个特定位置时，才会诱发电子转移。

Schmickler 将这些慢变量显式地写进了哈密顿量中，将其建模为一个**声子浴（Phonon bath）**，一组与反应物电荷发生线性相互作用的谐振子。

### 为什么谐振子这么好用

我们在这里说一点有趣的事情,你有没有想过,为什么谐振子这么好用.一方面是谐振子是一组好的正交基组就像xyz一样,进一步说官方一点,谐振子的本征态（由 Hermite 多项式构成的波函数）构成了一组完备正交基。就像三维空间中的 $(x, y, z)$ 矢量一样，任何复杂的波函数都可以通过这组基进行线性组合（这和傅里叶展开的思路类似）。振动的模也可以被这样抽象,就能组合出我们的SFG SHS 拉曼 IR光谱咯.

另一方面:

### 从二次势能到高斯分布

对于自然界中任何一个处于稳定平衡态的复杂系统，其势能函数 $V(x)$ 在平衡点 $x_0$ 处的泰勒展开为：

$$
V(x) = V(x_0) + V'(x_0)(x-x_0) + \frac{1}{2}V''(x_0)(x-x_0)^2 + \mathcal{O}((x-x_0)^3)
\tag{28}
$$

因为是平衡点，一阶导数（受力）必然为零，即 $V'(x_0) = 0$。如果我们取 $V(x_0) = 0$ 并忽略高阶项，势能就自然退化成了完美的我们在初二学的抛物线：

$$
V(x) \approx \frac{1}{2}V''(x_0)(x-x_0)^2 = \frac{1}{2}k x^2
\tag{29}
$$

进一步的我们把这个势能带入玻尔兹曼分布,

在热力学中，如果一个系统的能量（哈密顿量）是谐振子的形式 $H = \frac{1}{2}kx^2$，那么根据玻尔兹曼分布，系统处于状态 $x$ 的概率密度为：

$$
P(x) \propto \exp\left(-\frac{H}{k_B T}\right) = \exp\left(-\frac{k x^2}{2 k_B T}\right)
\tag{30}
$$

你看，**二次函数的能量，直接在指数上生成了完美的高斯分布。**

### 从中心极限定理到 Einstein 涨落理论

我们知道溶剂分子多的很，是阿伏伽德罗常数数量级（$10^{23}$）个水分子微观偶极矩在波动. 根据中心极限定理，在满足其适用条件时，大量独立（或弱相关）随机变量的叠加，其宏观统计会趋近**高斯分布**。所以我们就可以瞄着靶子射击,构建一个统计上是高斯分布的,那就推导出势能得是二次的,势能是二次的又要保证正交,那就拿谐振子模式来吧.

我们是反过来理解.在1910 年，爱因斯坦正着理解,他通过**涨落理论 (Fluctuation Theory)** 将两者无缝焊接。\[11\]

假设我们观察一个宏观系统（比如包裹着吸附质的一团液态水）。这团水由 $10^{23}$ 个水分子组成，这些水分子之间存在相关性。

- **从数学（CLT）出发：** 我们观察这团水的宏观极化坐标 $q$（即无数个水分子偶极矩的总和）。根据中心极限定理，在满足其适用条件时，这个宏观量 $q$ 围绕其平衡位置 $q_0$ 的涨落概率，**会趋近一个高斯分布**：

$$
P(q) \propto \exp(-A(q - q_0)^2)
\tag{31}
$$

- **从物理（玻尔兹曼）出发：** 根据玻尔兹曼熵公式，系统处于状态 $q$ 的概率正比于该状态下的微观状态数，即：

$$
P(q) \propto \exp\left(\frac{S(q)}{k_B}\right)
\tag{32}
$$

**奇迹发生的地方：** 我们将这两条公式等号右边对应起来。既然概率近似是高斯分布，那么指数上的物理量也应该具有对应的二次形式！

我们对系统的宏观熵 $S(q)$ 在平衡点 $q_0$ 处进行泰勒展开：

$$
S(q) = S(q_0) + S'(q_0)(q - q_0) + \frac{1}{2}S''(q_0)(q - q_0)^2 + \dots
\tag{33}
$$

因为在平衡点熵最大（或者自由能最低），所以一阶导数 $S'(q_0) = 0$。舍弃高阶项，熵的变化量为：

$$
\Delta S = \frac{1}{2}S''(q_0)(q - q_0)^2
\tag{34}
$$

代入物理公式中：

$$
P(q) \propto \exp\left(\frac{\frac{1}{2}S''(q_0)(q - q_0)^2}{k_B}\right)
\tag{35}
$$

由于 $S''(q_0)$ 是一个负常数（因为是极大值点），你看，**由玻尔兹曼关系推导出的涨落概率，在数学形式上严丝合缝地变成了一个高斯分布！**

### 总结

- **中心极限定理**保证了：在满足其适用条件时，由大量微观自由度组成的宏观变量，其涨落概率会趋近 $\exp(-x^2)$ 的形式。

- **玻尔兹曼关系**保证了：宏观变量的概率由 $\exp(-\frac{\Delta G}{k_B T})$ 决定（$\Delta G$ 为自由能）。

- 两者的交汇意味着：**复杂宏观系统的有效自由能面（或势能面），在平衡点附近可以近似为二次抛物线** $\Delta G \propto x^2$。

### 这里的核心：线性响应近似

当然了,我们把谐振子受到的力是势能的负梯度（导数）：$F = -\frac{dV}{dx}$。认为是线性的这就是线性假设,或者说我们认为势能是抛物线的.也就是忽略了更高次的势能或者力. 有些时候比如在溶液中引入离子或者电场,这样的线性假设就可能被打破,注意哈.Marcus/Schmickler 理论是线性假设的.

### 一点联想：中心极限定理、路径积分与 SHS

另外中心极限定理的推导和数学内核也好有意思. 看看这个\[3blue1brown\]的视频吧\~ https://www.youtube.com/watch?v=zeJD6dqJ5lo \[12\]

不好意思我是ADHD无法关闭我的联想跳跃功能. 突然又想到veritasium说的路径积分,这里面的相位和SHS的相位可能有什么关系呢? SHS论文中经常做的重水同位素实验再次锁定某种振动或者是看看核量子效应显不显著,就是用PIMD把水分子变成一个圈圈去计算.

https://www.youtube.com/watch?v=qJZ1Ez28C-A \[13\]

### 回到 Schmickler 的溶剂模型

好吧,我们回到Schmickler的溶剂模型里来. 都快忘记了主线任务.

我们说回电子转移时候溶剂的快慢.

- **快变量（Fast electronic modes）：** 来源于溶剂分子的电子极化（Electronic polarizability）。由于电子运动极快，其响应时间尺度在 $10^{-16}-10^{-15}\ \text{s}$。因此，快变量能够**绝热地（adiabatically）**跟上慢变量和电子转移的步伐。它的物理作用是瞬间完成响应，从而**重整化（renormalize）电子能级**，并不构成反应的动力学势垒。

- **慢变量（Slow solvent modes）：** 来源于溶剂分子整体的取向和结构畸变（如原子的移动），响应时间尺度在 $10^{-14}-10^{-11}\ \text{s}$。慢变量无法瞬间跟上电子跃迁，只能通过热涨落（fluctuations）缓慢演化。正是这种涨落导致了吸附质电子能级的移动，当能级移动到某个特定位置时，才会诱发电子转移。

### 多维溶剂模式与重组能

对于多维度的溶剂和内层重组，其哈密顿量表示为：

$$
H_{\mathrm{sol}}
=
\sum_i
\left\{
\frac{1}{2}\alpha_i x_i^2
+
\alpha_i x_i g_i(1-n)
\right\}
\tag{36}
$$

- $x_i$ 是第 $i$ 个模式的坐标。

- $\alpha_i$ 是谐振子的力常数（如真实谐振子中 $\alpha_i = m_i \omega_i^2$）。

- $(1-n)$ 是反应物上的电荷状态（$n=1$ 为初态，$n=0$ 为末态）。

- $g_i$ 是电荷与第 $i$ 个溶剂模式的线性相互作用常数。

为了简化数学处理，引入无量纲坐标 $q_i = x_i/g_i$，并定义第 $i$ 个模式对重组能的贡献为 $\lambda_i = \alpha_i g_i^2 / 2$。此时体系的能量曲面（抛物面）可以写成广义形式：

$$
E(q_i) = \epsilon_a n + \sum_i \left\{ \lambda_i q_i^2 + 2\lambda_i q_i(1-n) \right\}
\tag{37}
$$

其中 $\epsilon_a$ 是包含快变量重整化效应后的电子能级。

我在这里说两句,这里的$q_i$ 指的是正则模式的振动并不是红外看到的随意振动, $g_i$ 是一个现在来看越来越重要的参数,描述了这个振动模式对哈密顿量有多少贡献. 在后期我们推导能隙相关函数的重组能,与分子振动之间的关系之间,这个参数是决定性的,目前我们只能通过AIMD先学再套到光谱上拿到重组能数据.不知道Roke的CVS能不能帮助解决这个问题.

接下来就是常规操作了:

### 活化能（Saddle Point）的推导

电子转移发生在这两个多维抛物面（初态 $n=1$ 和末态 $n=0$）的交线上。为了找到反应路径的过渡态，我们需要寻找这个交集上的**鞍点（Saddle point）**，即能量最低的交叉点。

**第一步：确立交线方程**

在交叉处，初态能量等于末态能量（$E_{n=1} = E_{n=0}$）：

$$
\epsilon_a + \sum_i \lambda_i q_i^2 = \sum_i \left\{ \lambda_i q_i^2 + 2\lambda_i q_i \right\}
\tag{38}
$$

化简得到约束条件：

$$
2\sum_i \lambda_i q_i - \epsilon_a = 0
\tag{39}
$$

**第二步：利用拉格朗日乘子法求极值**

引入拉格朗日乘子 $\mu$，我们需要最小化以下函数：

$$
F(q_i) = \epsilon_a + \sum_i \lambda_i q_i^2 + \mu\left(2\sum_i \lambda_i q_i - \epsilon_a\right)
\tag{40}
$$

对 $q_i$ 求偏导并令其为零，得到：

$$
q_i = -\mu
\tag{41}
$$

将 $q_i$ 代回约束条件方程：

$$
2\sum_i \lambda_i (-\mu) - \epsilon_a = 0 \quad \Rightarrow \quad \mu = -\frac{\epsilon_a}{2\lambda}
\tag{42}
$$

其中 $\lambda = \sum_i \lambda_i$ 是总重组能。

**第三步：得出活化能**

将求得的坐标 $q_i = \frac{\epsilon_a}{2\lambda}$ 代回初态能量方程，鞍点的绝对能量为：

$$
E^{\ddagger} = \epsilon_a + \sum_i \lambda_i \left(\frac{\epsilon_a}{2\lambda}\right)^2 = \epsilon_a + \frac{\epsilon_a^2}{4\lambda}
\tag{43}
$$

相对于初态最低点 $E_{i,\min}=\epsilon_a$，得到反应的活化能 $E_{\mathrm{act}}$：

$$
E_{\mathrm{act}}=E^{\ddagger}-\epsilon_a=\frac{\epsilon_a^2}{4\lambda}
\tag{44}
$$

#### **总结：** Schmickler 的推导给出了无论是微观的多维声子浴模型，还是马库斯的宏观的介电极化场模型，其核心都在于剥离出能够跟上电子跃迁的“快变量”（将其吸收入能量基准）以及主导热涨落和过渡态形成的“慢变量”（即 $\lambda_{\mathrm{out}}$ 的来源），从而在数学上殊途同归地给出了电子转移的活化能图像。

![](images/paste-12.png){fig-align="center" width="729"}

https://www.koushare.com/video/details/51995 \[14\]

jun huang在蔻享学术的视频 Schmickler\[14\]

## 参考文献

\[1\] Anderson, P. W. “Localized Magnetic States in Metals.” *Physical Review* **124** (1961): 41–53. https://doi.org/10.1103/PhysRev.124.41

\[2\] Newns, D. M. “Self-Consistent Model of Hydrogen Chemisorption.” *Physical Review* **178** (1969): 1123–1135. https://doi.org/10.1103/PhysRev.178.1123

\[3\] Davison, S. G.; Sulston, K. W. *Green-Function Theory of Chemisorption*. Springer Science & Business Media, 2006.

\[4\] 默者. “量子力学中的 Green Function.” 2018. https://www.mozheyang.top/2018/01/15/QMGreenFunction/

\[5\] Jun Huang. 蔻享学术视频，Jülich 相关课程/报告中关于 Anderson 模型与 Green 函数的讲解，约 34:00. https://www.koushare.com/video/details/33369?series_id=2063

\[6\] Nørskov, J. K.; Studt, F.; Abild-Pedersen, F.; Bligaard, T. *Fundamental Concepts in Heterogeneous Catalysis*. Wiley, 2014. Chapter 12, “The Newns–Anderson Model.” https://doi.org/10.1002/9781118892114

\[7\] 蔻享学术视频：从 Two-level / 久期方程角度理解吸附物—金属电子态耦合. https://www.koushare.com/video/details/70117

\[8\] Greiner, M. T.; Jones, T. E.; Beeg, S.; et al. “Free-atom-like d states in single-atom alloy catalysts.” *Nature Chemistry* **10** (2018): 1008–1015. https://doi.org/10.1038/s41557-018-0125-5

\[9\] Xin, H.; Linic, S. “Exceptions to the d-band model of chemisorption on metal surfaces: The dominant role of repulsion between adsorbate states and metal d-states.” *The Journal of Chemical Physics* **132** (2010): 221101. https://doi.org/10.1063/1.3437609

\[10\] Santos, E.; Lundin, A.; Pötting, K.; Quaino, P.; Schmickler, W. “Model for the electrocatalysis of hydrogen evolution.” *Physical Review B* **79** (2009): 235436. https://doi.org/10.1103/PhysRevB.79.235436

\[11\] Einstein, A. “Theorie der Opaleszenz von homogenen Flüssigkeiten und Flüssigkeitsgemischen in der Nähe des kritischen Zustandes.” *Annalen der Physik* **338** (16) (1910): 1275–1298. https://doi.org/10.1002/andp.19103381612

\[12\] 3Blue1Brown. 中心极限定理相关视频. https://www.youtube.com/watch?v=zeJD6dqJ5lo

\[13\] Veritasium. 路径积分相关视频. https://www.youtube.com/watch?v=qJZ1Ez28C-A

\[14\] Jun Huang. 蔻享学术视频：Schmickler 相关讲解. https://www.koushare.com/video/details/51995