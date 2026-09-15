---
title: "什么是电极电势"

date: 2026-09-14

description: "电极电势的发展史,也是人们从金属电极进入溶液的发展史。当我们在测量电极电势的时候,我们到底在测的是什么?如果你了解电化学你会知道这绝不是一件简单的事情。"

categories:
  - 电化学

lang: zh-CN

translation-key: electrode-potential

status: working

draft: false

---

#什么是电极电势
这一期是关于一个很简单但是却非常深奥的科学问题,什么是电极电势?

你可能觉得这个问题非常简单两个电极插到溶液中,电压表一打那就是电极电势.或者你会觉得这不就是一个选择参考点的问题我选真空或者H电极作为参考点把它作为0,其他的电极电势和它组成一个系统看看其他相对于它的电极电势是多少就好了.

但实际上,这个简单的问题电化学家从苏联科学院A.N. Frumkin院士再到Sergio Trasatti (http://www.cailiaoniu.com/?p=235685) ,再到现在人们用计算化学手段去计算电极电势和理解电极电势在电化学电催化中的作用,以及最近人们的SFG光谱直接测量表面电场或者PZC零电荷电势.大概从1960年走到了2021年.一共60年.

我对这个问题一开始毫不感兴趣,感觉这就是一个高中学生会遇到的问题,无聊的考试. 让我介绍一下我是如何走进这个问题的.一开始我对Nørskov的d ban center感兴趣. (https://www.pnas.org/doi/10.1073/pnas.1006652108) , 它描述了金属d 轨道...哈哈,因为也就是d(l=2)⟷rank-2 球张量,2l+1=5,分别是dz2​,dxz​,dyz​,dx2−y2​,dxy​五个,我不是在罗列,我只想说这正是我们之前SO3神经网络和Wigner–Eckart theorem描述的相同的球坐标系下表达世界的方法,跑题了...

话说回来，Nørskov 的 d band center模型，它描述可以用金属 d 轨道的积分中心位置来衡量分子在表面吸附的强弱。**实际上，这并不是因为金属的 d 轨道和分子的轨道相互作用最强。分子首先会和金属宽广的 sp 带发生极强的相互作用，但因为不同过渡金属的 sp 带非常宽且特征相似，这种相互作用在不同金属上贡献的吸附能差不多是一个常数。**

这个时候，真正决定不同金属吸附强度差异（趋势）的，就是狭窄的 d 轨道了。**d 轨道与分子的作用不仅包含共价吸引，还包含轨道正交化带来的泡利排斥。正如Hongliang Xin(J. Chem. Phys. 2010, 132, 221101)指出的，当吸附物轨道与拥有几乎满 d 轨道的金属（如后期过渡金属）作用时，排斥作用甚至会占据主导。**但综合起来看，d band center确实是衡量这部分能量变化、描述气相分子吸附的一个简单且极其伟大的描述符。于是我就好奇 Nørskov 是怎么推导出来这个理论的，这就带我进入了美妙的量子力学世界，让我们从 Newns-Anderson 理论开始吧。

Fundamental Concepts in Heterogeneous Catalysis

写的有点累,这部分先不太仔细的介绍Newns-Anderson的推导, 总之是Anderson先...,然后Newns,Hongliang Xin总结基本上这就是d ban center的全部了.

这部分大概

1. anderson

为什么把极少量的磁性过渡金属原子（如 Fe）作为杂质掺入到非磁性金属（如 Cu）中时，有些杂质能保持磁性，而有些却失去了磁性？孤立定域态与连续能带相互作用”的数学框架，完美地契合了表面化学吸附的物理图像，从而在8年后被 D. M. Newns 借用，演变成了描述吸附的基石。

在这里我们先介绍一下格林函数,我数学不好,这次不太能理解这玩意的几何图像或物理意义.管他啥函数我们当个工具先耍耍.我们先来看看Green函数与态密度的关系,

## Green函数与态密度的关系

量子物理/固体物理中，Green函数可以通过与态密度相联系，以诠释其物理意义。态密度（Density of States, DOS）可被定义为

$$
\rho(E)=\sum_j\delta(E-E_j)
$$

态密度就是看电子在不同能量下是怎么排布的,$\delta$不是0就是1,在E=Ej的时候如果$\delta$取1就有一个电子排在这里.

为了表达方便，接下来的表述都将采用 Dirac 符号。由于同一个哈密顿量作用在不同的本征矢上会得到不同的本征能量，因此我们可以定义

$$
\hat{H}\psi_j=E_j\psi_j
$$

咱先别管Green函数怎么来的,因为我就先把它当工具,咱们不是搞数学的.你就当你无聊乱试试看什么算符对$\psi_j$做投影能得到态密度. 人们就发现了一个算符Green函数，其可以作用在态矢上得到

$$
\langle\psi_j|G|\psi_j\rangle
=
\langle\psi_j|(E-\hat{H})^{-1}|\psi_j\rangle
=
(E-E_j)^{-1}\langle\psi_j|\psi_j\rangle
$$

由基态的正交性有

$$
\langle\psi_i|\psi_j\rangle=\delta_{ij}
$$

于是

$$
\langle\psi_j|G|\psi_j\rangle=(E-E_j)^{-1}
$$

以上公式对 $j$ 进行求和有

$$
\sum_j\langle\psi_j|G|\psi_j\rangle
=
\sum_j(E-E_j)^{-1}
$$

在量子力学中，一个算符可以被用一个矩阵表示。上式可以认为是对该矩阵对角线元素求和（其他元素如 $\langle\psi_1|G|\psi_2\rangle$、$\langle\psi_3|G|\psi_2\rangle$ 都不是对角线上的元素），即求矩阵的迹（Trace）。于是上式也可以写成

$$
\operatorname{Tr}G(E)=\sum_j(E-E_j)^{-1}
$$

这时候对比上式与态密度的定义

$$
\rho(E)=\sum_j\delta(E-E_j)
$$

已经可以发现 Green 函数和态密度之间可以存在联系，只不过相差了一个 $\delta$ 函数。接下来的工作就是要在 Green 函数中添加一个 $\delta$ 函数。

为了避免分母为零，引入复数能量

$$
E\rightarrow E+is
$$

再令

$$
\xi_j=E-E_j
$$

于是上式可以写为

$$
\sum_j\langle\psi_j|G|\psi_j\rangle
=
\sum_j(\xi_j+is)^{-1}
$$

这时候数学家又给我了一个Plemelj 公式, [1]

$$
\frac{1}{\xi+i0^+}
=
\mathcal{P}\frac{1}{\xi}
-i\pi\delta(\xi)
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
$$

我们所在意的仅仅是 $\delta$ 函数部分，因此只取上述复数的虚部（Imaginary），有

$$
\operatorname{Im}\sum_j(\xi_j+i0^+)^{-1}
=
-\pi\sum_j\delta(\xi_j)
=
-\pi\sum_j\delta(E-E_j)
$$

回到态密度的定义，得到 Green 函数与态密度的关系

$$
\operatorname{Im}\sum_j
\langle\psi_j|G(E)|\psi_j\rangle
=
-\pi\rho(E)
$$

由于

$$
\operatorname{Tr}G(E)
=
\sum_j\langle\psi_j|G(E)|\psi_j\rangle
$$

因此更常见的写法是

$$
\boxed{
\rho(E)
=
-\frac{1}{\pi}
\operatorname{Im}\operatorname{Tr}G^R(E)
}
$$

其中 $G^R(E)$ 是 retarded Green function：

$$
G^R(E)
=
\frac{1}{E-\hat H+i0^+}
$$

对于单独的一个态 $a$，定义局域态密度（local density of states）为 $\rho_a(E)$，则

$$
\rho_a(E)
=
-\frac{1}{\pi}
\operatorname{Im}G_{aa}^R(E)
$$

其中

$$
G_{aa}^R(E)
=
\langle a|G^R(E)|a\rangle
$$

也就是说，

$$
\operatorname{Im}G_{aa}^R(E)
=
-\pi\rho_a(E)
$$

##### 所以阿,你想知道态密度DOS,那你就要先去找到格林函数Gaa的虚部.

[1] Davison S. G., Sulston K. W. *Green-Function Theory of Chemisorption*. Springer Science & Business Media, 2006.

https://www.mozheyang.top/2018/01/15/QMGreenFunction/

或者你也可以按照Jens Nørskov在他的Fundamental Concepts in
Heterogeneous Catalysis THE NEWNS–ANDERSON MODEL P185页,从矩阵里面看出Gaa.

或者你也可以从更线性代数一点,更Two level形成分子轨道的角度出发,你可以看下面这个视频.

如果你真的不熟悉格林函数,你也可以直接用久期方程,对行列式做一些处理,最后得到一条吸附物的直线和一系列金属电子态的交点,你会发现两者分享电子形成的新的态,会更稳定也就是向着低能量方向位移. 后续再用回路积分算出来. 在下面视频43分左右.

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-15-17-15-52-image.png)

https://www.koushare.com/video/details/70117

好了,总之你可以得到adsorbate-projected DOS或者说吸附物和金属表面耦合在一起的DOS

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
\tag{12.31}
$$

这里$\varepsilon_k$表示金属的电子能级,$\varepsilon_a$表示分子的电子能级, $\varepsilon$ 就是你要画的态密度DOS的x轴.

Multiplying the argument by its complex conjugate in the numerator and denominator and extracting the imaginary part, we get that

$$
n_a(\varepsilon)
=
\frac{1}{\pi}
\frac{\Delta(\varepsilon)}
{\left(\varepsilon-\varepsilon_a-\Lambda(\varepsilon)\right)^2+\Delta(\varepsilon)^2}
\tag{12.32} 
$$

其中分子

$$
\Delta(\varepsilon)
=
\pi \sum_k V_{ak}^2 \, \delta(\varepsilon-\varepsilon_k)
$$

的物理意义是金属的每一个态和分子直接有多强的耦合,耦合强度主要取决于他们波函数重叠的程度,突然这里又可以用Wigner–Eckart theorem定理或者群论搞一通了哈哈.

分子的$\Lambda(\varepsilon)$,代表吸附质轨道的“能级偏移函数”（Energy Shift Function）。在物理上，它描述了孤立原子的能级在与金属表面发生杂化后，其**共振中心位置所发生的移动**。也就是刚刚黑板上的图片直线和众多函数交线相对于原始位置的偏移量. 在数学上,也是我们刚刚用Plemelj公式的实部, 

$\Lambda(\varepsilon) = \mathcal{P} \sum_k \frac{\vert{}V_{ak}\vert{}^2}{\varepsilon - \varepsilon_k}$

其中 $\mathcal{P}$ 代表**柯西主值（Cauchy Principal Value）**，意味着在积分或求和时，要巧妙地扣除 $\varepsilon = \varepsilon_k$ 那个导致分母为零的奇点。在实际计算或者写代码的时候,是$\Delta(\varepsilon)$的希尔伯特变换（Hilbert Transform）.

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-15-20-00-01-image.png)

图中的na(ε)就是分子吸附后分子的DOS, $\Delta(\varepsilon)$ 选取了宽大的sp electrons,所以很宽从-10eV到15eV.红线和橙色线的交点就是分子的单一轨道吸附到金属表面被轻微移动并且展宽了,电子被共享了,这个展宽还有个说法叫Electron Lifetime,在物理图像中，**共振峰越宽（“越肥大”），电子在吸附质上的寿命是越短的。** 也往往说明$V_{ak}$ 很小. 在量子力学中，能量与时间满足**海森堡不确定性原理**：

$\Delta E \cdot \Delta t \ge \frac{\hbar}{2}$

在表面吸附的格林函数图像中：

- **能量不确定度 ($\Delta E$)**：正是投影态密度 $n_a(\varepsilon)$ 中洛伦兹峰的半高全宽，即**展宽 $\Delta$**。

- **时间不确定度 ($\Delta t$)**：对应于电子在吸附质轨道（$\vert{}a\rangle$ 态）上停留的特征时间，也就是**电子寿命 $\tau$**。

因此，它们的关系是严密的**反比关系.**

$\tau \approx \frac{\hbar}{2\Delta}$

从电子转移的角度来说,也就是说sp 电子会将吸附质能级展宽成一个**极宽的背景（宽度可达数个 eV）**，此时电子在吸附质上的寿命极短。相比之下，d 轨道是高度定域的。吸附质与 d 带的耦合相对较弱，电子的跨边界跃迁没有那么频繁。因此，d 电子带来的相互作用往往表现为态密度上**较窄的共振峰（宽度通常 < 1 eV）**，此时电子的定域性更强，寿命相对较长。

在Nørskov 的书中他认为反键态的占据是最重要的,所以反键态的占据电子如果被排空了，系统获得巨大的杂化吸引能**。因此：**$\epsilon_d$ 越高，吸附越强。下图就显示了两个na(ε)的小峰,高于0eV那个就是反键轨道.

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-15-20-20-21-image.png)



Hongliang进一步在这个基础上完善,他们OH, F, Cl 吸附在 Pt, Pd 的 skin alloys,d band center出现了问题.当吸附态和金属都是**全满占据**,成键态下移的能量增益被反键态占据带来的能量抵消. 他引入了重叠 $S_{ad}$ 引起的正交化惩罚（Pauli排斥）来解释。这就宣告了金属的sp和d与吸附物的相互作用理论基本上被理解清楚了.

于是我们可以进入电化学的世界.

在Newns-Anderson的基础上,*Schmickler* (PHYSICAL REVIEW B 79, 235436,2009 DOI: 10.1103/PhysRevB.79.235436)引入了溶剂化和电极电势对吸附质的影响,他把溶剂对分子的作用写成一个快量和慢量.

在电子转移过程中，溶剂分子对中心电荷变化的响应并不是同步的：

- **快变量（Fast electronic modes）：** 来源于溶剂分子的电子极化（Electronic polarizability）。由于电子运动极快，其响应时间尺度在 $10^{15}-10^{16}\ \text{s}$。因此，快变量能够**绝热地（adiabatically）**跟上慢变量和电子转移的步伐。它的物理作用是瞬间完成响应，从而**重整化（renormalize）电子能级**，并不构成反应的动力学势垒。

- **慢变量（Slow solvent modes）：** 来源于溶剂分子整体的取向和结构畸变（如原子的移动），响应时间尺度在 $10^{-11}-10^{-14}\ \text{s}$。慢变量无法瞬间跟上电子跃迁，只能通过热涨落（fluctuations）缓慢演化。正是这种涨落导致了吸附质电子能级的移动，当能级移动到某个特定位置时，才会诱发电子转移。

Schmickler 将这些慢变量显式地写进了哈密顿量中，将其建模为一个**声子浴（Phonon bath）**，一组与反应物电荷发生线性相互作用的谐振子。

我们在这里说一点有趣的事情,你有没有想过,为什么谐振子这么好用.一方面是谐振子是一组好的正交基组就像xyz一样,进一步说官方一点,谐振子的本征态（Hermite 多项式）构成了一组完备正交基。就像三维空间中的 $(x, y, z)$ 矢量一样，任何复杂的波函数都可以通过这组基进行线性组合（这就是傅里叶变换的本质）。振动的模也可以被这样抽象,就能组合出我们的SFG SHS 拉曼 IR光谱咯. 

另一方面:

对于自然界中任何一个处于稳定平衡态的复杂系统，其势能函数 $V(x)$ 在平衡点 $x_0$ 处的泰勒展开为：

$V(x) = V(x_0) + V'(x_0)(x-x_0) + \frac{1}{2}V''(x_0)(x-x_0)^2 + \mathcal{O}((x-x_0)^3)$

因为是平衡点，一阶导数（受力）必然为零，即 $V'(x_0) = 0$。如果我们取 $V(x_0) = 0$ 并忽略高阶项，势能就自然退化成了完美的我们在初二学的抛物线：

$V(x) \approx \frac{1}{2}V''(x_0)(x-x_0)^2 = \frac{1}{2}k x^2$

进一步的我们把这个势能带入玻尔兹曼分布,

在热力学中，如果一个系统的能量（哈密顿量）是谐振子的形式 $H = \frac{1}{2}kx^2$，那么根据玻尔兹曼分布，系统处于状态 $x$ 的概率密度为：

$P(x) \propto \exp\left(-\frac{H}{k_B T}\right) = \exp\left(-\frac{k x^2}{2 k_B T}\right)$

你看，**二次函数的能量，直接在指数上生成了完美的高斯分布。** 



我们知道溶剂分子多的很，是阿伏伽德罗常数数量级（$10^{23}$）个水分子微观偶极矩在波动. 根据中心极限定理，大量独立（或弱相关）随机变量的叠加，其宏观统计必然服从**高斯分布**。所以我们就可以瞄着靶子射击,构建一个统计上是高斯分布的,那就推导出势能得是二次的,势能是二次的又要保证正交,那就拿谐振子模式来吧.

我们是反过来理解.在1910 年，爱因斯坦正着理解,他通过**涨落理论 (Fluctuation Theory)** 将两者无缝焊接。

假设我们观察一个宏观系统（比如包裹着吸附质的一团液态水）。这团水由 $10^{23}$ 个独立的水分子组成。

- **从数学（CLT）出发：** 我们观察这团水的宏观极化坐标 $q$（即无数个水分子偶极矩的总和）。根据中心极限定理，这个宏观量 $q$ 围绕其平衡位置 $q_0$ 的涨落概率，**必然是一个高斯分布**：
  
  $P(q) \propto \exp(-A(q - q_0)^2)$

- **从物理（玻尔兹曼）出发：** 根据玻尔兹曼熵公式，系统处于状态 $q$ 的概率正比于该状态下的微观状态数，即：
  
  $P(q) \propto \exp\left(\frac{S(q)}{k_B}\right)$

**奇迹发生的地方：** 我们将这两条公式等号右边对应起来。既然概率必须是高斯分布，那么指数上的物理量也必须相等！

我们对系统的宏观熵 $S(q)$ 在平衡点 $q_0$ 处进行泰勒展开：

$S(q) = S(q_0) + S'(q_0)(q - q_0) + \frac{1}{2}S''(q_0)(q - q_0)^2 + \dots$

因为在平衡点熵最大（或者自由能最低），所以一阶导数 $S'(q_0) = 0$。舍弃高阶项，熵的变化量为：

$\Delta S = \frac{1}{2}S''(q_0)(q - q_0)^2$

代入物理公式中：

$P(q) \propto \exp\left(\frac{\frac{1}{2}S''(q_0)(q - q_0)^2}{k_B}\right)$

由于 $S''(q_0)$ 是一个负常数（因为是极大值点），你看，**由玻尔兹曼关系推导出的涨落概率，在数学形式上严丝合缝地变成了一个高斯分布！**

### 总结

- **中心极限定理**保证了：由无数微观粒子组成的系统，其宏观变量的涨落概率必然是 $\exp(-x^2)$ 的形式。

- **玻尔兹曼关系**保证了：宏观变量的概率由 $\exp(-\frac{\Delta G}{k_B T})$ 决定（$\Delta G$ 为自由能）。

- 两者的交汇意味着：**复杂宏观系统的有效自由能面（或势能面），在平衡点附近必定是一个完美的二次抛物线 $\Delta G \propto x^2$。**

当然了,我们把谐振子受到的力是势能的负梯度（导数）：$F = -\frac{dV}{dx}$。认为是线性的这就是线性假设,或者说我们认为势能是抛物线的.也就是忽略了更高次的势能或者力. 有些时候比如在溶液中引入离子或者电场,这样的线性假设就可能被打破,注意哈.Marcus/Schmickler 理论是线性假设的.



另外中心极限定理的推导和数学内核也好有意思. 看看这个[3blue1brown]的视频吧~ https://www.youtube.com/watch?v=zeJD6dqJ5lo



不好意思我是ADHD无法关闭我的联想跳跃功能. 突然又想到veritasium说的路径积分,这里面的相位和SHS的相位可能有什么关系呢? SHS论文中经常做的重水同位素实验再次锁定某种振动或者是看看核量子效应显不显著,就是用PIMD把水分子变成一个圈圈去计算.

https://www.youtube.com/watch?v=qJZ1Ez28C-A



好吧,我们回到Schmickler的溶剂模型里来. 都快忘记了主线任务.

我们说回电子转移时候溶剂的快慢.

- **快变量（Fast electronic modes）：** 来源于溶剂分子的电子极化（Electronic polarizability）。由于电子运动极快，其响应时间尺度在 $10^{15}-10^{16}\ \text{s}$。因此，快变量能够**绝热地（adiabatically）**跟上慢变量和电子转移的步伐。它的物理作用是瞬间完成响应，从而**重整化（renormalize）电子能级**，并不构成反应的动力学势垒。

- **慢变量（Slow solvent modes）：** 来源于溶剂分子整体的取向和结构畸变（如原子的移动），响应时间尺度在 $10^{-11}-10^{-14}\ \text{s}$。慢变量无法瞬间跟上电子跃迁，只能通过热涨落（fluctuations）缓慢演化。正是这种涨落导致了吸附质电子能级的移动，当能级移动到某个特定位置时，才会诱发电子转移。

对于多维度的溶剂和内层重组，其哈密顿量表示为：

$H_{\rm sol} = \sum_i \left\{ \frac{1}{2}\alpha_i x_i^2 + \alpha_i x_i g_i(1-n) \right\}$

- $x_i$ 是第 $i$ 个模式的坐标。

- $\alpha_i$ 是谐振子的力常数（如真实谐振子中 $\alpha_i = m_i \omega_i^2$）。

- $(1-n)$ 是反应物上的电荷状态（$n=1$ 为初态，$n=0$ 为末态）。

- $g_i$ 是电荷与第 $i$ 个溶剂模式的线性相互作用常数。

为了简化数学处理，引入无量纲坐标 $q_i = x_i/g_i$，并定义第 $i$ 个模式对重组能的贡献为 $\lambda_i = \alpha_i g_i^2 / 2$。此时体系的能量曲面（抛物面）可以写成广义形式：

$E(q_i) = \epsilon_a n + \sum_i \left\{ \lambda_i q_i^2 + 2\lambda_i q_i(1-n) \right\}$

其中 $\epsilon_a$ 是包含快变量重整化效应后的电子能级。

我在这里说两句,这里的$q_i$ 指的是正则模式的振动并不是红外看到的随意振动, $g_i$ 是一个现在来看越来越重要的参数,描述了这个振动模式对哈密顿量有多少贡献. 在后期我们推导能隙相关函数的重组能,与分子振动之间的关系之间,这个参数是决定性的,目前我们只能通过AIMD先学再套到光谱上拿到重组能数据.不知道Roke的CVS能不能帮助解决这个问题.

接下来就是常规操作了:

### 3. 活化能（Saddle Point）的推导

电子转移发生在这两个多维抛物面（初态 $n=1$ 和末态 $n=0$）的交线上。为了找到反应路径的过渡态，我们需要寻找这个交集上的**鞍点（Saddle point）**，即能量最低的交叉点。

**第一步：确立交线方程**

在交叉处，初态能量等于末态能量（$E_{n=1} = E_{n=0}$）：

$\epsilon_a + \sum_i \lambda_i q_i^2 = \sum_i \left\{ \lambda_i q_i^2 + 2\lambda_i q_i \right\}$

化简得到约束条件：

$2\sum_i \lambda_i q_i - \epsilon_a = 0$

**第二步：利用拉格朗日乘子法求极值**

引入拉格朗日乘子 $\mu$，我们需要最小化以下函数：

$F(q_i) = \epsilon_a + \sum_i \lambda_i q_i^2 + \mu\left(2\sum_i \lambda_i q_i - \epsilon_a\right)$

对 $q_i$ 求偏导并令其为零，得到：

$q_i = -\mu$

将 $q_i$ 代回约束条件方程：

$2\sum_i \lambda_i (-\mu) - \epsilon_a = 0 \quad \Rightarrow \quad \mu = -\frac{\epsilon_a}{2\lambda}$

其中 $\lambda = \sum_i \lambda_i$ 是总重组能。

**第三步：得出活化能**

将求得的坐标 $q_i = \frac{\epsilon_a}{2\lambda}$ 代回初态能量方程，得到反应的活化能 $E_{\rm act}$：

$E_{\rm act} = \epsilon_a + \sum_i \lambda_i \left(\frac{\epsilon_a}{2\lambda}\right)^2 = \frac{\epsilon_a^2}{4\lambda}$

我们之前说马库斯老爷子为了推导他的电子转移理论,把学校所有的电磁学书都看完了.

现在也顺便说一下从电场角度来看

### 宏观介电连续模型推导（外层重组能）

对于“外层重组能（Outer sphere reorganization）” $\lambda_{\rm out}$ 的具体数值，Schmickler 采用了 Born 溶剂化模型，再次利用了快量与慢量的分离，但是是在极化场（Polarization field）的宏观电动力学框架下进行的。

B站搜索高子昂 科大电化学 用一个小球能把下面的推导出来

总极化 $\mathbf{P}$ 与电位移矢量 $\mathbf{D}$ 的关系为：

$\mathbf{P} = \left(1-\frac{1}{\epsilon}\right)\mathbf{D}$

根据时间尺度的分离：

1. **快极化（$\mathbf{P}_f$）：** 仅由高频光学介电常数 $\epsilon_\infty$ 决定：
   
   $\mathbf{P}_f = \left(1-\frac{1}{\epsilon_\infty}\right)\mathbf{D}$

2. **慢极化（$\mathbf{P}_s$）：** 由静态介电常数 $\epsilon_s$ 与光学介电常数之差决定：
   
   $\mathbf{P}_s = \mathbf{P} - \mathbf{P}_f = \left(\frac{1}{\epsilon_\infty} - \frac{1}{\epsilon_s}\right)\mathbf{D}$

因为只有慢变量极化在电子转移瞬间是“冻结”的并产生势垒，系统的能量重组仅来自于 $\mathbf{P}_s$。考虑溶剂微元 $\Delta V$ 的相互作用势能 $\Delta U / \Delta V = \frac{1}{2}\alpha \mathbf{P}_s^2 - \mathbf{P}_s \cdot \mathbf{D}/\epsilon_0 + C$，通过最小化能量求得平衡点，即可得出该微元对重组能的贡献：

$\Delta\lambda_{\rm out} = \frac{1}{2\epsilon_0} \left( \frac{1}{\epsilon_\infty} - \frac{1}{\epsilon_s} \right) (\mathbf{D}_{\rm ox} - \mathbf{D}_{\rm red})^2 \Delta V$

对整个溶剂空间积分，就得到了著名的外层重组能经典公式：

$\lambda_{\rm out} = \frac{1}{2\epsilon_0} \left( \frac{1}{\epsilon_\infty} - \frac{1}{\epsilon_s} \right) \int (\mathbf{D}_{\rm ox} - \mathbf{D}_{\rm red})^2 dV$

对于距离金属电极表面 $d$ 处、半径为 $a$ 的球形离子，引入镜像电荷（Image force）修正后，积分结果即为：

$\lambda_{\rm out} = \frac{e_0^2}{8\pi\epsilon_0} \left( \frac{1}{\epsilon_\infty} - \frac{1}{\epsilon_s} \right) \left( \frac{1}{a} - \frac{1}{2d} \right)$

**总结：** Schmickler 的推导给出了无论是微观的多维声子浴模型，还是马库斯的宏观的介电极化场模型，其核心都在于剥离出能够跟上电子跃迁的“快变量”（将其吸收入能量基准）以及主导热涨落和过渡态形成的“慢变量”（即 $\lambda_{\rm out}$ 的来源），从而在数学上殊途同归地给出了电子转移的活化能图像。







1. 你会发现数学结构很像SFG的为什么?

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-15-17-06-04-image.png)

https://www.koushare.com/video/details/51995

jun huang在蔻享学术的视频





说到数学结构,我们可以连接到另一篇文章,解释为什么exp这么常见中心极限定理,量子力学lin N区域0,最小平移旋转算符.(插入可跳转连接)

但是当d band center进入电化学却发现遇到了更大的问题,在溶液中的分子周围裹挟着水,界面自然的出现了双电层,所以一切都变得不那么简单,简单的d band center在溶液中渐渐失效.

所以我们需要从纯金属表面的电子结构过渡到金属-溶液界面.

#### 于是我开始接触双电层结构是如何形成的?

#### 这与金属表面的电子结构有什么关系?

#### 如果对不同金属施加同一个大小的电极电势双电层结构会有什么不同?

#### 金属中的电子是怎么向溶剂转移的?电子转移是怎么发生的? 金属表面附近的溶剂结构是怎么样的?

#### 我能不能用光谱(SFG,SHS)看到或者模拟金属表面的溶剂结构?

#### 这样的溶剂结构是怎么影响电子转移的? (这边插入一个可以调到电子转移markdown的链接)

###### 于是我们开始进入电化学的世界,

 Trasatti 在1960年代,注意到金属的电化学性能与其本身电子结构之间的关联,他发现金属的功涵（WF）和零电荷电位(PZC)之间存在线性关联。在1971年的文章中，他提出一组著名的关系式：

PZC = WF – 4.61 – 0.666*(2.10-X)

对于除铂和钯族之外的过渡态金属，以及锌铝镓，X= 0.5*WF – 0.55

对于碱金属、碱土金属、sp金属以及铂和钯族金属， X = 0.5*WF-0.29

他筛选了一系列金属的WF和PZC数据，发现并不存在一个统一的规律，而是过渡金属和sp金属符合不同的规律。

他进一步去分析过渡金属和sp金属为什么符合不同的规律。他发现其中的奥秘是金属表面水分子极化。过渡金属对界面水分子有很强的化学吸附作用，而sp金属仅是通过静电作用调整界面水分子的取向。把sp金属上水分子的取向极化与金属元素的电负性关联起来。

sy







Trasatti, S.. "The absolute electrode potential: an explanatory note (Recommendations 1986)" *Pure and Applied Chemistry*, vol. 58, no. 7, 1986, pp. 955-966. https://doi.org/10.1351/pac198658070955

http://www.cailiaoniu.com/?p=235685

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-14-20-44-38-image.png)

###### **Fig. 1.** Sketch to put in evidence the components of the electrode potential. Work along path B is expressed by eqn.(10) in the text. Work from M(M₁) to infinity (path A) and work from M(M₁) to S (path C) define the two other *conceptually* possible single electrode potentials.

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-14-20-51-04-image.png)

https://www.koushare.com/video/details/65721?series_id=2064

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-15-15-57-50-image.png)

### RHE SHE是什么意思? 内电势、外电势、表面电势与相间电势差

### SHE在实验上参比到哪里 在计算上参比到哪里 计算上的恒电势是什么意思?

### 电子溢出 PZC 如何测量PZC(最大熵,SFG)
