---
title: "SFG光谱的量子力学原理"

date: 2026-09-14

description: "从樱井纯的量子力学到hamm的非线性光学,再到阿金斯物理化学中的群论,最后尝试给出SFG/SHS光谱的选择定则推导全过程"

categories:
  - 光谱

lang: zh-CN

translation-key: from QM-hamm-sfg to selection rule

status: working

draft: false

---

#从樱井纯的量子力学到hamm的SFG

#### 我们大概的路径是先定义旋转和角动量的数学符号,引入Wigner-Eckart定理和对称性,判断hamm推导出的SFG二阶极化率是否为0.不为0的分量如何用DFT计算它,分子坐标系如何转发到实验室坐标系.到这一步我们基本上就可以解释SFG的信号了.

我们使用到的书有樱井纯的现代量子力学,阿金斯物理化学 分子对称性群论部分 ,Principles of Nonlinear Optical Spectroscopy: A Practical Approach or: Mukamel for Dummies Peter Hamm

## 旋转生成元与 SO(3) 对易关系

我们先来定义一些讨厌的数学，比如怎么旋转一个东西。我们需要引入最小的旋转操作. 

为了大家好接受我们在开始先从平移说起,我们可以认为平移是一种操作可以用算符来表示,我们想知道小的平移,那就是做一下泰勒展开吧,对 $U(\epsilon)$ 在 $\epsilon = 0$ 处进行一阶泰勒展开，最一般的数学形式为 $U(\epsilon) \approx I + A\epsilon$，其中 $A = \left. \frac{\partial U}{\partial \epsilon} \right\vert{}_{\epsilon=0}$。又因为量子力学要求系统在变换前后总概率守恒，即变换算符必须满足幺正性条件 $U^\dagger U = I$。所以推导出$U(\epsilon) = I - i G \epsilon$

"很自然"我们用动量来表示G,无穷小平移算符就是：

$T(dx) = 1 - i \frac{p_x}{\hbar} dx$

果要进行一个有限距离 $a$ 的平移，可以将这个操作无限切分为 $N$ 个微小步骤（每个步骤位移为 $a/N$），连续作用 $N$ 次：

$T(a) = \lim_{N \to \infty} \left( 1 - i \frac{p_x}{\hbar} \frac{a}{N} \right)^N$

利用微积分中的经典极限公式 $\lim_{N \to \infty}(1 + \frac{x}{N})^N = e^x$，立刻可以得到有限空间平移算符的指数形式：

$T(a) = \exp\left(-i \frac{p_x a}{\hbar}\right)$

我们可以把这一套方法放到旋转上,动量是平移的生成元,那么很自然**角动量 $\mathbf{J}$ 就是空间旋转的生成元**。$D(\mathbf{\hat{n}}, \phi) = \left[ D\left(\mathbf{\hat{n}}, \frac{\phi}{N}\right) \right]^N = \lim_{N \to \infty} \left[ 1 - i \left(\frac{\mathbf{J} \cdot \mathbf{\hat{n}}}{\hbar}\right) \frac{\phi}{N} \right]^N$

在连续三维空间中，角动量算符 $\mathbf{J}$ 的物理本质是**无穷小空间旋转操作的生成元**。只要把角动量放在指数上，它就能变成一个真实的旋转算符：

$D(\mathbf{\hat{n}}, \phi) = \exp\left(-i \frac{\mathbf{J} \cdot \mathbf{\hat{n}}}{\hbar} \phi\right)$

把它当成一个“旋转发生器”：给定旋转轴 $\mathbf{\hat{n}}$ 和旋转角度 $\phi$，角动量 $\mathbf{J}$ 就会“咔哒”一下把系统转过去。

有了这个算符，我们就能旋转物体了。比如转一个东西时我们遵循 ZYZ 规定，也就是先沿着 z 轴转 $45^\circ$，然后 y 轴转 $5^\circ$，最后 z 轴再转 $5^\circ$。写成连乘公式就是：

$D(\alpha, \beta, \gamma) = \exp\left(-i \frac{J_z}{\hbar} 5^\circ\right) \exp\left(-i \frac{J_y}{\hbar} 5^\circ\right) \exp\left(-i \frac{J_z}{\hbar} 45^\circ\right)$

注意量子力学算符是从右往左作用在物体上的，所以第一步动作必须写在最右边。你可能会问为什么不是 XYZ 规定？你可以试试看，沿着固定的 XYZ 轴转并不能无死角地表示任意一个旋转（这就牵扯到万向锁的问题，不过那只是数学坐标系上的缺陷，在物理真实的连续空间中是不存在的）。

至于 SO(3) 只是一个数学上群的写法，你可以认为我们摆弄一个矿泉水瓶的过程——向上转、向左转——就是一个 SO(3) 过程。SU(2) 就是电子的自旋了，它和真实世界看起来有点不一样（转 $360^\circ$ 不会复原，会多一个负号）。不管它，这就是一个符号，费曼说如果你只是知道一个符号或者它的名字，那你根本不了解它。所以别怕。

三维空间中不同方向的旋转操作是不可交换的，这个很好想象。你先把矿泉水瓶上下颠倒，然后再把标签转到后面去；如果你把这两个动作反过来，却绝对得不到相同的初始状态。

上面这些几何非对易性，直接决定了微观算符的代数结构，导出 SO(3) 群的核心对易关系：$[J_i, J_j] = i\hbar \epsilon_{ijk} J_k$。也就是把“旋转操作是不可交换的”按照数学语言再写一遍。有了这个公式，只是方便我们底下的计算罢了。

## 寻找“好基底”与总角动量算符 $J^2$

- 我们总是喜欢在一个好基底里描述物理过程（就像描述物体位置需要 XYZ 坐标）。为了完整描述系统状态，我们现在去找一个好基底，构建总角动量平方算符：$J^2 = J_x^2 + J_y^2 + J_z^2$。

- 作为一个标量算符，$J^2$ 在空间整体旋转下不变，因此它与任何单一方向的投影算符均严格对易：$[J^2, J_z] = 0$。

- 根据量子力学公理，相互对易的算符拥有共同的本征态。我们将 $J^2$ 和 $J_z$ 的共同本征态 $\vert{}j, m\rangle$ 选定为描述物理演化的完备“好基底”（Good Basis）。也就是说，它们俩互相独立，可以作为完美的坐标系来描述一个分子的角动量状态。

## 升降算符技巧（代数的加加减减）

- 这里遵循樱井纯的操作，我不在这里讨论太多。为了绕开求解复杂的薛定谔微分方程，引入极其优美的数学工具——升降算符：$J_{\pm} = J_x \pm i J_y$。

- 利用对易关系 $[J_z, J_{\pm}] = \pm \hbar J_{\pm}$，可以通过纯代数的“加加减减”推导出 $J_+$ 能强制将态的 z 轴投影拉高一个 $\hbar$，而 $J_-$ 能将其降低一个 $\hbar$。

- 结合物理边界条件（投影大小绝不可能超过总向量长度，即 $J^2 - J_z^2 \ge 0$），这个升降阶梯必须在两端被严格截断，从而完美地纯代数逼近出 $j$ 和 $m$ 的量子化条件。我们也就顺理成章地知道了 $j$ 和 $m$ 的取值范围。

## 本征值谱与各向同性

- **$J^2$（总角动量）**：本征值为 $j(j+1)\hbar^2$，其中 $j$ 为总角动量量子数。
  
   $J^2 \vert{}j, m\rangle = j(j+1)\hbar^2 \vert{}j, m\rangle$

- **$J_z$（z轴投影）**：本征值为 $m\hbar$。$m$ 就是磁量子数，取值受限于 $-j \le m \le j$。

- $J_z \vert{}j, m\rangle = m\hbar \vert{}j, m\rangle$

- **$J_x$ 与 $J_y$ 的平权性**：三维绝对空间是各向同性的，z 轴只是人为选定的投影轴。因此，$J_x$ 和 $J_y$ 必然拥有与 $J_z$ 完全一模一样的本征值谱（即 $m_x\hbar$ 和 $m_y\hbar$），尽管它们各自的本征态是由 $\vert{}j, m\rangle$ 混合而成的复杂线性叠加态。

### Wigner-Eckart的定律推导可以直接看樱井纯的,极其优美.我们这里不推导了,我看完一次推导就忘记一次. Wigner把群论引入量子力学一开始也让很多物理学家头痛,没人知道Wigner在做啥.所以我们搞不明白也不算我们很笨.

## 不可约球张量算符：把直角坐标扔进垃圾桶

- 我们在算极化率 $\beta$ 时，光电场是用实验室的 $x, y, z$ 直角坐标系描述的，比如写成偶极算符 $\mu_x, \mu_y, \mu_z$。

- 但是直角坐标系处理“旋转”极其笨拙。因为光子打进分子本质上是角动量的传递，我们必须换成跟角动量（$j, m$）说同一种语言的数学工具，这就是**不可约球张量算符 $T_q^{(k)}$**。

- **它的简单表达**：对于我们关心的偶极跃迁（吸收或发射一个单光子），算符的“秩”就是 $k=1$。它的三个分量 $q \in \{-1, 0, 1\}$ 完美对应了光子携带的自旋角动量投影。我们可以直接把直角坐标“翻译”成球张量：
  
  - $z = T_0^{(1)}$ （对应 $q=0$，不改变分子的 $z$ 轴角动量投影）
  
  - $x = \frac{1}{\sqrt{2}}\left(T_{-1}^{(1)} - T_1^{(1)}\right)$ （包含 $q=\pm 1$ 两个方向角动量的组合）
  
  - $y = \frac{i}{\sqrt{2}}\left(T_{-1}^{(1)} + T_1^{(1)}\right)$ （同样包含 $q=\pm 1$ 的组合，但带有虚数相位）

- **物理意义**：就是XYZ换个形式表达.

## Wigner-Eckart (WE) 定理：拿了诺奖

- 量子力学里最让人头疼的就是算积分,因为你波函数和态再精巧没有测量(<>框号一加紧做积分)也没用阿，WE可以帮助计算跃迁矩阵元 $\langle j_f, m_f \vert T_q^{(k)} \vert j_i, m_i \rangle$。如果你要手算，每次分子转一下姿态、你换一个偏振光，都要重新算一遍三维积分。

- WE 定理直接大手一挥，告诉我们：别算了！这个矩阵元可以被完美地切成两半：
  
  $\langle j_f, m_f \vert T_q^{(k)} \vert j_i, m_i \rangle = \langle j_i, k; m_i, q \vert j_f, m_f \rangle \frac{\langle j_f \vert\vert T^{(k)} \vert\vert j_i \rangle}{\sqrt{2j_f+1}}$

- **等号右边的第一项（CG系数）**：纯纯的外部几何投影。它只关心三维空间的旋转对称性，也就是角动量守恒。不管你算的是水分子还是什么复杂的配合物，只要角动量量子数对不上，这一项直接是 0。你不用算任何积分，直接查表就能得到它。

- **等号右边的第二项（约化矩阵元，带双竖线的那一项）**：纯纯的内部物理动力学。它包含了分子波函数的径向积分、内部结构的振子强度。注意看，它里面既没有 $m$ 也没有 $q$！这意味着它**与分子在空间中怎么摆、光子从哪个方向打过来毫无关系**。

## WE 定理解决了什么问题？

- **降维打击与偷懒不算**：在宏观非线性光学极化率计算中，如果没有 WE 定理，面对 $\beta_{zxy}$ 展开出的多条积分路径将是计算量的地狱。

- **直接判定选择定则**：WE 定理把复杂矩阵元的死活，直接转化为 CG 系数的查表操作。CG 系数为 0，跃迁直接死刑，物理上禁戒。我们在分析分子 $\beta_{zxy}=0$ 时，纯粹是在玩这几个 CG 系数的加减法干涉，根本不需要去管分子内部电子云到底长什么样。

- **分离变量提取常数**：它让我们在推导 SFG/SHS 时，能够把分子内部动力学（也就是约化矩阵元）当成一个未知但绝对固定的常数提出来，把全部精力集中在处理空间角度、光子偏振和坐标系投影上。

- 我研究生时候偷学量子力学,去蹭本科生的课,在上课的老师说起来一件事情,他学生的时候问过给他上课的老师傅里叶变化有什么用,他的老师回答你别管会算就行. 于是历史重演我也问了他这个问题,群论有什么用,他和我说"你可以少算很多东西",进一步想给我解释的时候,看我还是听不懂,于是我们停下了对话,我记得是在冬天. 虽然我一直没学和没用群论,但是这句话我记了很久,我相信这些无用的东西是很美的! 于是现在群论和WE的作用这就来了!

现在我们直接来看看非线性光学SFG SHS 的量子力学基础,Peter Hamm 与 Mukamel 的含时微扰密度矩阵理论通过非线性响应函数的推导，将外部宏观光场与分子内部的微观偶极跃迁矩阵元建立了严格的解析联系。

## 第一步：Liouville 空间内的嵌套对易子展开

这一步很简单你只要看他的书,从二态系统的密度矩阵到含时微扰你就可以得到下面的方程.

二阶密度矩阵在相互作用绘景（Interaction Picture）下的含时演化受制于 Liouville-von Neumann 方程的双重积分：

$\rho^{(2)}(t) = \left(\frac{-i}{\hbar}\right)^2 \int_{-\infty}^{t} dt_2 \int_{-\infty}^{t_2} dt_1 \left[ \tilde{V}(t_2), \left[ \tilde{V}(t_1), \rho^{(0)} \right] \right]$

假设系统初始完全处于热力学基态 $\rho^{(0)} = \vert{}a\rangle\langle a\vert{}$。将内层对易子展开，再展开外层对易子，会产生 4 项代数式：

$\left[ \tilde{V}(t_2), \left[ \tilde{V}(t_1), \rho^{(0)} \right] \right] = \tilde{V}(t_2)\tilde{V}(t_1)\rho^{(0)} - \tilde{V}(t_2)\rho^{(0)}\tilde{V}(t_1) - \tilde{V}(t_1)\rho^{(0)}\tilde{V}(t_2) + \rho^{(0)}\tilde{V}(t_1)\tilde{V}(t_2)$

为了推导和频产生（SFG）中连续吸收两个光子的响应，我们必须在双侧费曼图中锁定纯 Ket 侧激发路径（即状态 $\vert{}a\rangle \xrightarrow{\omega_1} \vert{}b\rangle \xrightarrow{\omega_2} \vert{}c\rangle$）。这唯一对应于两个相互作用算符都作用在密度矩阵左侧的第一项：$\tilde{V}(t_2)\tilde{V}(t_1)\rho^{(0)}$。
提取到达末态 $\vert{}c\rangle$ 的非对角元 $\rho_{ca}^{(2)}(t) = \langle c \vert{} \rho^{(2)}(t) \vert{} a \rangle$：

$\rho_{ca}^{(2)}(t) = \left(\frac{-i}{\hbar}\right)^2 \int_{-\infty}^{t} dt_2 \int_{-\infty}^{t_2} dt_1 \langle c \vert{} \tilde{V}(t_2)\tilde{V}(t_1) \vert{} a \rangle \langle a \vert{} a \rangle$

## 第二步：相互作用哈密顿量与时间演化积分

在 $\tilde{V}(t_2)$ 和 $\tilde{V}(t_1)$ 之间插入一组完备的能量本征基底 $I = \sum_b \vert{}b\rangle\langle b\vert{}$，因为 $\langle a \vert{} a \rangle = 1$，表达式变为：

$\langle c \vert{} \tilde{V}(t_2)\tilde{V}(t_1) \vert{} a \rangle = \sum_b \langle c \vert{} \tilde{V}(t_2) \vert{} b \rangle \langle b \vert{} \tilde{V}(t_1) \vert{} a \rangle$

在相互作用绘景中，算符自带未微扰系统 $H_0$ 的时间演化相位：$\tilde{V}(t) = e^{iH_0 t/\hbar} (-\mu \cdot E(t)) e^{-iH_0 t/\hbar}$。因此，矩阵元解析为：

$\langle n \vert{} \tilde{V}(t) \vert{} m \rangle = -\mu_{nm} e^{i\omega_{nm}t} E(t)$

其中 $\omega_{nm} = (E_n - E_m)/\hbar$ 是 Bohr 频率。假设入射光场为 $E(t_1) = E(\omega_1)e^{-i\omega_1 t_1}$ 与 $E(t_2) = E(\omega_2)e^{-i\omega_2 t_2}$，代入两个矩阵元：

$\langle b \vert{} \tilde{V}(t_1) \vert{} a \rangle = -\mu_{ba} E(\omega_1) e^{i(\omega_{ba} - \omega_1)t_1}$

$\langle c \vert{} \tilde{V}(t_2) \vert{} b \rangle = -\mu_{cb} E(\omega_2) e^{i(\omega_{cb} - \omega_2)t_2}$

先对 $t_1$ 积分。为了保证从 $-\infty$ 积分的物理收敛性，人为引入相干失相率（Dephasing）$+i\Gamma_{ba}$：

$I_1 = \int_{-\infty}^{t_2} dt_1 e^{i(\omega_{ba} - \omega_1 - i\Gamma_{ba})t_1} = \frac{e^{i(\omega_{ba} - \omega_1 - i\Gamma_{ba})t_2}}{i(\omega_{ba} - \omega_1 - i\Gamma_{ba})}$

将 $I_1$ 结果代入 $t_2$ 积分，同样引入整体失相率 $+i\Gamma_{ca}$，并合并指数项 $i(\omega_{cb} + \omega_{ba} \dots) = i(\omega_{ca} \dots)$：

$I_2 = \int_{-\infty}^{t} dt_2 e^{i(\omega_{cb} - \omega_2)t_2} \cdot \frac{e^{i(\omega_{ba} - \omega_1 - i\Gamma_{ba})t_2}}{i(\omega_{ba} - \omega_1 - i\Gamma_{ba})} = \frac{e^{i(\omega_{ca} - \omega_1 - \omega_2 - i\Gamma_{ca})t}}{i^2(\omega_{ca} - \omega_1 - \omega_2 - i\Gamma_{ca})(\omega_{ba} - \omega_1 - i\Gamma_{ba})}$

合并所有常数，包含前面提取的 $(-i/\hbar)^2$ 与偶极负号 $(-1)^2$，它们与积分产生的 $i^2$ 完美抵消，得到频域下的密度矩阵振幅：

$\rho_{ca}^{(2)}(\omega_1 + \omega_2) \propto \sum_b \frac{\mu_{cb} E(\omega_2) \mu_{ba} E(\omega_1)}{(\omega_{ca} - \omega_1 - \omega_2 - i\Gamma_{ca})(\omega_{ba} - \omega_1 - i\Gamma_{ba})} \rho_{aa}^{(0)}$

## 第三步：求迹操作 (Trace) 与宏观极化闭环

实验室观测到的二阶宏观极化率 $P^{(2)}$ 是偶极算符的量子力学期望值，需要通过求迹（Trace）操作完成量子状态的缝合闭环：

$P^{(2)}(t) = \text{Tr}\left( \mu \rho^{(2)}(t) \right) = \sum_n \langle n \vert{} \mu \rho^{(2)}(t) \vert{} n \rangle$

在 $\mu$ 和 $\rho^{(2)}$ 之间插入另一组完备基底 $\sum_m \vert{}m\rangle\langle m\vert{}$，展开为：

$P^{(2)} = \sum_{n,m} \langle n \vert{} \mu \vert{} m \rangle \langle m \vert{} \rho^{(2)} \vert{} n \rangle$

因为我们的 SFG 路径终止于 $\vert{}c\rangle$ 态，要形成闭合循环辐射光子回到初态，必须指定 $m = c$ 且 $n = a$：

$P^{(2)}(\omega_1 + \omega_2) = \sum_c \langle a \vert{} \mu \vert{} c \rangle \rho_{ca}^{(2)}(\omega_1 + \omega_2)$

此时，为了对应实验中设定的偏振，将原本标量形式的 $\mu$ 投影到笛卡尔坐标系。令 $\omega_1$ 激发场偏振为 $k$，$\omega_2$ 激发场偏振为 $j$，辐射信号偏振为 $i$：

$P_i^{(2)} = \sum_c \langle a \vert{} \mu_i \vert{} c \rangle \left[ \rho_{ca}^{(2)} \text{ 中用 } \mu_k \text{ 和 } \mu_j \text{ 替换相应项} \right]$

## 第四步：提取微观超极化率与偶极连乘

将第二步得到的 $\rho_{ca}^{(2)}$ 表达式带有笛卡尔下标代入求迹方程，并将与分子内禀动力学无关的宏观光场 $E_j, E_k$ 提取出求和号：

$P_i^{(2)} = \left[ \sum_{b,c} \frac{\langle a \vert{} \mu_i \vert{} c \rangle \langle c \vert{} \mu_j \vert{} b \rangle \langle b \vert{} \mu_k \vert{} a \rangle}{(\omega_{ca} - \omega_1 - \omega_2 - i\Gamma_{ca})(\omega_{ba} - \omega_1 - i\Gamma_{ba})} \rho_{aa}^{(0)} \right] E_j(\omega_2) E_k(\omega_1)$

根据非线性光学的宏观唯象定义 $P_i^{(2)} = \sum_{j,k} \beta_{ijk} E_j E_k$，直接剥离出微观超极化率张量 $\beta_{ijk}$ 的精确解析式：

$\beta_{ijk} \propto \sum_{b,c} \frac{\langle a \vert{} \mu_i \vert{} c \rangle \langle c \vert{} \mu_j \vert{} b \rangle \langle b \vert{} \mu_k \vert{} a \rangle}{(\omega_{ca} - \omega_1 - \omega_2 - i\Gamma_{ca})(\omega_{ba} - \omega_1 - i\Gamma_{ba})} \rho_{aa}^{(0)}$

## H\(_2\)O 为什么会出现 \(A_1,A_2,B_1,B_2\)？

先什么都不要谈振动。

我们只拿一个水分子放在桌子上。

选坐标系：

$$
z=\text{HOH 角平分线，也就是 }C_2\text{ 轴}
$$

并让水分子位于 \(yz\) 平面。

这个水分子有四种“不改变它本身”的操作：

$$
E
$$

什么都不做；

$$
C_2(z)
$$

绕 \(z\) 轴转 \(180^\circ\)，两个 H 互换；

$$
\sigma_v(xz)
$$

关于 \(xz\) 平面镜像，两个 H 互换；

$$
\sigma_v'(yz)
$$

关于分子自身所在的 \(yz\) 平面镜像。

这四个操作组成：

\(C_{2v}\) 这一点阿金斯的物理化学说的很清楚,我们把上面的操作总结为

标准的 \(C_{2v}\) character table 是：

|         | \(E\) | \(C_2(z)\) | \(\sigma_v(xz)\) | \(\sigma_v'(yz)\) | 常见基函数             |
| ------- | -----:| ----------:| ----------------:| -----------------:| ----------------- |
| \(A_1\) | 1     | 1          | 1                | 1                 | \(z,x^2,y^2,z^2\) |
| \(A_2\) | 1     | 1          | -1               | -1                | \(R_z,xy\)        |
| \(B_1\) | 1     | -1         | 1                | -1                | \(x,R_y,xz\)      |
| \(B_2\) | 1     | -1         | -1               | 1                 | \(y,R_x,yz\)      |

常见基函数的意思是这些函数属于这一行的对称性比如z属于A1,我们可以看到E操作无论对什么函数(或这个函数对应的对称性如A1)都是不变,所以对角线和第一列都是1.
因为光谱实际上是观察分子的振动情况,振动又是一个可能会改变偶极的动作.
水的自由度是3N-6 去掉平移和转动,剩下3个振动：

$ \boxed{ \nu_1(A_1):\text{对称伸缩} } $ $ \boxed{ \nu_2(A_1):\text{HOH 弯曲} } $

$ \boxed{ \nu_3(B_2):\text{反对称伸缩} } $.

也就是说又这三个振动为基,你可以组合成其他更复杂的振动.或者把光谱看到的振动分解到这三个振动去.
好了,现在我们来看二阶极化率的连乘积:

$$
\beta_{ijk} \propto
\sum_{b,c}
\frac{
\langle a \vert \mu_i \vert c \rangle
\langle c \vert \mu_j \vert b \rangle
\langle b \vert \mu_k \vert a \rangle
}{
(\omega_{ca}-\omega_1-\omega_2-i\Gamma_{ca})
(\omega_{ba}-\omega_1-i\Gamma_{ba})
}
\rho_{aa}^{(0)}
$$

假设振动基态是

$$
|0\rangle.
$$

振动基态是全对称的：

$$
\Gamma(|0\rangle)=A_1.
$$

某一个基本振动激发：

$$
|1_q\rangle
$$

的对称性就是这个 normal mode 的对称性：

$$
\Gamma(|1_q\rangle)=\Gamma(Q_q).
$$

IR 跃迁矩阵元：

$$
\langle1_q|\mu_i|0\rangle.
$$

它非零要求：

$$
\Gamma(Q_q) \otimes \Gamma(\mu_i) \otimes A_1 \supset A_1.
$$

因为乘一个 \(A_1\) 什么也不改变，所以：

$$
\boxed{ \Gamma(Q_q) = \Gamma(\mu_i). }
$$

这就是阿特金斯查 character table 的真正原理。

因为：

$$
\mu_x\sim B_1,\qquad \mu_y\sim B_2,\qquad \mu_z\sim A_1,
$$

所以任何属于：

$$
A_1,\ B_1,\ B_2
$$

的振动都有可能 IR active,进一步的回头看我们的偶极连乘积中最右边⟨b∣μk∣a⟩也就不为0了。多说一句Raman 的矩阵元⟨1q∣αij∣0⟩.也是同理.
回到我们的问题,一个分子整体的 \(beta_{ijk}\) 张量分量能不能存在？
    SOS 里面：

$$
\beta_{ijk} \sim \sum_{b,c} \langle a|\mu_i|c\rangle \langle c|\mu_j|b\rangle \langle b|\mu_k|a\rangle.
$$

假设初态最终又回到同一个 \(A_1\) 基态，那么三个偶极算符连乘必须整体是全对称：

$$
\Gamma(\mu_i)\otimes\Gamma(\mu_j)\otimes\Gamma(\mu_k)\supset A_1.
$$

道理很简单因为如果有一个不全对称这个积分<>就会出现I=-I,这样的情况那I就等于0了.
所以我们可以直接用：

$$
\mu_x\sim B_1,\quad \mu_y\sim B_2,\quad \mu_z\sim A_1
$$

判断。

例如：

$$
\beta_{zxx}.
$$

它的算符部分：

$$
\mu_z\mu_x\mu_x.
$$

所以：

$$
A_1\otimes B_1\otimes B_1.
$$

而：

$$
B_1\otimes B_1=A_1.
$$

所以：

$$
A_1\otimes A_1=A_1.
$$

因此：

$$
\boxed{\beta_{zxx}\neq0\text{ 在对称性上允许}.}
$$

而：

$$
\beta_{xxx}
$$

对应：

$$
B_1\otimes B_1\otimes B_1=B_1.
$$

不是 \(A_1\)。

所以：

$ \beta_{xxx}=0 $.当然我们还可以通过<偶?奇?|奇|偶>来判断是不是为0,|偶>一般基态都是对称的,中间的偶极矩算符明显是奇函数,然后就看最左边的态是什么了,其实就是奇函数的对此积分为0,偶函数不为0的道理.
进一步的我们还可以给出更简单的法则,SFG必须有拉曼和红外活性! both !
为什么呢?因为我们可以把 $\beta_{ijk,q}^{(2)}$ 从偶极矩连乘积的形式改写成 $\left(\frac{\partial\alpha_{ij}}{\partial Q_q}\right)\left(\frac{\partial\mu_k}{\partial Q_q}\right)$
证明如下:

$$
|g,0\rangle \xrightarrow{\mu_k,\omega_{\rm IR}} |g,1_q\rangle \xrightarrow{\mu_j,\omega_{\rm vis}} |e,\nu\rangle \xrightarrow{\mu_i,\omega_{\rm SFG}} |g,0\rangle.
$$

### 第一刀：振动共振分母直接变成 \(\omega_q-\omega_{\rm IR}\)

因为

$$
|a\rangle=|g,0\rangle, \qquad |b\rangle=|g,1_q\rangle,
$$

所以：

$$
\omega_{ba}=\omega_q.
$$

于是第二个分母：

$$
\omega_{ba}-\omega_{\rm IR}-i\Gamma_{ba}
$$

直接变成

$$
\boxed{ \omega_q-\omega_{\rm IR}-i\Gamma_q }.
$$

因此：

$$
\beta_{ijk,q} \propto \frac{1}{ \omega_q-\omega_{\rm IR}-i\Gamma_q } \sum_c \frac{ \langle g,0|\mu_i|c\rangle \langle c|\mu_j|g,1_q\rangle \langle g,1_q|\mu_k|g,0\rangle }{ \omega_{ca}-\omega_{\rm SFG}-i\Gamma_c }.
$$

把最后一个矩阵元拿出来：

$$
\beta_{ijk,q} \propto \frac{ \langle g,1_q|\mu_k|g,0\rangle }{ \omega_q-\omega_{\rm IR}-i\Gamma_q } \left[ \sum_c \frac{ \langle g,0|\mu_i|c\rangle \langle c|\mu_j|g,1_q\rangle }{ \omega_{ca}-\omega_{\rm SFG}-i\Gamma_c } \right].
$$

现在左右两块已经非常明显了。

### 第二刀：右边单独的偶极矩阵元变成 \(\partial\mu/\partial Q_q\)

看：

$$
\langle g,1_q|\mu_k|g,0\rangle.
$$

在 Born–Oppenheimer 近似下，电子态仍然是 \(g\)，所以我们可以把它理解成振动波函数之间的积分：

$$
\langle1_q|\mu_k(Q)|0\rangle.
$$

这里最关键的一步来了：

把分子偶极矩看成核坐标的函数：

$$
\mu_k=\mu_k(Q_1,Q_2,\ldots).
$$

在平衡构型 \(Q=0\) 附近 Taylor 展开：

$$
\mu_k(Q) = \mu_k^{(0)} + \sum_r \left( \frac{\partial\mu_k}{\partial Q_r} \right)_0Q_r +\cdots
$$

对于我们正在看的第 \(q\) 个正常模：

$$
\mu_k(Q) \simeq \mu_k^{(0)} + \left( \frac{\partial\mu_k}{\partial Q_q} \right)_0Q_q.
$$

代入矩阵元：

$$
\langle1_q|\mu_k|0\rangle = \mu_k^{(0)} \langle1_q|0\rangle + \left( \frac{\partial\mu_k}{\partial Q_q} \right)_0 \langle1_q|Q_q|0\rangle.
$$

因为振动本征态正交：

$$
\langle1_q|0\rangle=0,
$$

所以常数项直接消失。

剩下：

$$
\boxed{ \langle1_q|\mu_k|0\rangle = \left( \frac{\partial\mu_k}{\partial Q_q} \right)_0 \langle1_q|Q_q|0\rangle }.
$$

因此：

$$
\boxed{ \langle b|\mu_k|a\rangle \longrightarrow \frac{\partial\mu_k}{\partial Q_q}. }
$$

这就是 IR 那一半。

所以 IR active 的真正量子力学含义就是：

$$
\boxed{ \frac{\partial\mu_k}{\partial Q_q}\neq0. }
$$

### 第三刀：两个电子偶极连乘变成 \(\alpha_{ij}\)

现在看括号里面：

$$
\sum_c \frac{ \langle g,0|\mu_i|c\rangle \langle c|\mu_j|g,1_q\rangle }{ \omega_{ca}-\omega_{\rm SFG}-i\Gamma_c }.
$$

这个结构你应该已经很眼熟了：

$$
\boxed{ \sum_{\rm electronic\ states} \frac{\mu_i\mu_j}{\text{electronic energy denominator}} }
$$

它正是极化率 \(\alpha_{ij}\) 的量子力学 SOS 结构。

例如线性极化率本身就具有 Kramers–Heisenberg 型形式：

$$
\alpha_{ij} \sim \sum_e \frac{ \langle g|\mu_i|e\rangle \langle e|\mu_j|g\rangle }{ \omega_{eg}-\omega } +\text{其他时间排序}.
$$

所以我们可以定义一个有效的、频率依赖的电子极化率算符：

$$
\hat\alpha_{ij}(Q;\omega_{\rm vis},\omega_{\rm SFG}),
$$

使得

$$
\boxed{ \langle0|\hat\alpha_{ij}(Q)|1_q\rangle \equiv \sum_c \frac{ \langle g,0|\mu_i|c\rangle \langle c|\mu_j|g,1_q\rangle }{ D_c } +\text{permutations} }.
$$

于是原来的三个偶极：

$$
\mu_i\mu_j\mu_k
$$

现在已经被压缩成：

$$
\boxed{ \alpha_{ij}\mu_k. }
$$

这里很值得强调：

$$
\boxed{ \mu_i\mu_j \quad\stackrel{\sum_c}{\longrightarrow}\quad \alpha_{ij} }
$$

并不是说

$$
\alpha_{ij}=\mu_i\mu_j
$$

这么简单。

而是：

$$
\boxed{ \alpha_{ij} = \text{两个偶极矩阵元} + \text{所有电子虚态求和} + \text{电子能量分母} }
$$

全部打包后的结果。

这就是为什么 DFT response calculation 可以直接算 \(\alpha\)，而不用你真的枚举所有电子态 \(c\)。

### 第四刀：\(\langle0|\alpha_{ij}|1_q\rangle\) 再变成 \(\partial\alpha_{ij}/\partial Q_q\)

现在与刚才偶极的处理完全一样。

极化率也依赖于核坐标：

$$
\alpha_{ij} = \alpha_{ij}(Q_1,Q_2,\ldots).
$$

在平衡位置展开：

$$
\alpha_{ij}(Q) = \alpha_{ij}^{(0)} + \sum_r \left( \frac{\partial\alpha_{ij}}{\partial Q_r} \right)_0Q_r+\cdots
$$

对于模 \(q\)：

$$
\alpha_{ij}(Q) \simeq \alpha_{ij}^{(0)} + \left( \frac{\partial\alpha_{ij}}{\partial Q_q} \right)_0Q_q.
$$

所以：

$$
\langle0|\alpha_{ij}|1_q\rangle = \alpha_{ij}^{(0)} \langle0|1_q\rangle + \left( \frac{\partial\alpha_{ij}}{\partial Q_q} \right)_0 \langle0|Q_q|1_q\rangle.
$$

仍然因为：

$$
\langle0|1_q\rangle=0,
$$

所以：

$$
\boxed{ \langle0|\alpha_{ij}|1_q\rangle = \left( \frac{\partial\alpha_{ij}}{\partial Q_q} \right)_0 \langle0|Q_q|1_q\rangle }.
$$

于是：

$$
\boxed{ \sum_c \frac{ \langle a|\mu_i|c\rangle \langle c|\mu_j|b\rangle }{ D_c } \longrightarrow \frac{\partial\alpha_{ij}}{\partial Q_q}. }
$$

这就是 Raman 那一半。

### 第五步：把两边重新乘起来

我们现在已经有：

$$
\langle1_q|\mu_k|0\rangle = \mu'_{k,q} \langle1_q|Q_q|0\rangle,
$$

以及：

$$
\langle0|\alpha_{ij}|1_q\rangle = \alpha'_{ij,q} \langle0|Q_q|1_q\rangle,
$$

其中为了省字：

$ \mu'_{k,q} \equiv \left( \frac{\partial\mu_k}{\partial Q_q} \right)_0, $ $ \alpha'_{ij,q} \equiv \left( \frac{\partial\alpha_{ij}}{\partial Q_q} \right)_0. $

两者相乘：

$$
\langle0|\alpha_{ij}|1_q\rangle \langle1_q|\mu_k|0\rangle = \alpha'_{ij,q}\mu'_{k,q} \left| \langle0|Q_q|1_q\rangle \right|^2.
$$

所以：

$$
\boxed{ \beta^{(2)}_{ijk,q} \propto \frac{ \alpha'_{ij,q}\mu'_{k,q} \left| \langle0|Q_q|1_q\rangle \right|^2 }{ \omega_q-\omega_{\rm IR}-i\Gamma_q } }.
$$

如果 \(Q_q\) 是质量加权 harmonic normal coordinate，那么：

$$
\langle0|Q_q|1_q\rangle = \sqrt{\frac{\hbar}{2\omega_q}}.
$$

于是：

$$
\left| \langle0|Q_q|1_q\rangle \right|^2 = \frac{\hbar}{2\omega_q}.
$$

因此更完整地：

$$
\boxed{ \beta^{(2)}_{ijk,q} \propto \frac{\hbar}{2\omega_q} \frac{ \left( \frac{\partial\alpha_{ij}}{\partial Q_q} \right)_0 \left( \frac{\partial\mu_k}{\partial Q_q} \right)_0 }{ \omega_q-\omega_{\rm IR}-i\Gamma_q } }.
$$

很多 SFG 文献把

$$
\frac{\hbar}{2\omega_q}
$$

以及单位、normal-coordinate normalization、电子频率因子等全部吸收到常数里面，于是就看到最熟悉的形式：

$$
\beta_{ijk,q}^{(2)} \propto \frac{\left(\frac{\partial\alpha_{ij}}{\partial Q_q}\right)\left(\frac{\partial\mu_k}{\partial Q_q}\right)}{\omega_q-\omega_{\rm IR}-i\Gamma_q}.
$$

这就是我们说的Placzek 近似.
至于没有为0的二阶极化率分量,我们就用WE硬算,或者用我们刚刚得到的关系偶极变化率乘以极化率变化率,我们往往用我的老本行DFT去算,偶极矩就在分子那三个标准的振动模式的方向上,比如比平衡位置多摆动一点和少摆动一点计算偶极的变化,然后做差分.咱们主要看看变化.然后计算极化率的变化率也是推拉一下,然后加个两个方向的X,Y,Z正负电场看看能量变化.

### 极化率同样如此。

在某一个固定核构型下：

$$
\boxed{ \alpha_{ij} = -\frac{\partial^2U} {\partial F_i\partial F_j}. }
$$

所以我们可以给电子云施加：

$$
\pm F_x,\qquad \pm F_y,\qquad \pm F_z
$$

这样的小电场。

看能量或者偶极响应，就可以得到：

$$
\alpha_{xx}, \alpha_{xy}, \alpha_{xz},\ldots
$$

整个 \(3\times3\) polarizability tensor。

然后关键来了：

我们不是只算平衡位置的 \(\alpha\)。

我们要分别在：

$$
Q_q=+\Delta Q
$$

和：

$$
Q_q=-\Delta Q
$$

两个核构型上算：

$$
\alpha_{ij}(+\Delta Q)
$$

和：

$$
\alpha_{ij}(-\Delta Q).
$$

于是：

$$
\boxed{ \frac{\partial\alpha_{ij}}{\partial Q_q} \simeq \frac{ \alpha_{ij}(+\Delta Q) - \alpha_{ij}(-\Delta Q) }{ 2\Delta Q }. }
$$

然后现在我们把分子的坐标系project到lab的坐标系,就是一个矩阵变化比我的机器人自瞄项目简单多了.
