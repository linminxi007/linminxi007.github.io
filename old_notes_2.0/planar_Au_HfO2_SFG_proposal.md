---
title: "非对称Au/HfO₂ 平面纳米流道中的增强 SFG 与 DNA–水合层耦合振动识别"

date: 2026-09-16

description: "想通过SFG加上Au等离子激元达到商业 DNA 纳米孔测序的性能大概是不可能的"

categories:
  - Electrochemistry  
  - Spectroscopy

lang: zh-CN

translation-key: DNA

status: working

draft: false
---

# 结论

想通过SFG加上Au等离子激元达到商业 DNA 纳米孔测序的性能大概是不可能的，主要是SFG在短时间内信噪比太低。

![](images/paste-45.png)

# 摘要

商业 DNA 纳米孔测序常以每孔约 400–450 nt/s 读取核苷酸，即每个碱基约 2.2–2.5 ms \[1\]。传统离子电流能够支持长读长，但不能将 DNA 的化学振动和水合环境单独读出。我想讨论能否利用**半导体工艺制造的平面流道**，在流动的 DNA 与 HfO₂/水界面之间构建局域、非对称的 Au 等离激元 SFG 探测区。

器件的设计层次为：**CaF₂（或蓝宝石）红外窗口 / 图案化 Au 天线 / HfO₂ 钝化层 / 水、DNA、离子构成的平面流道 / HfO₂ 钝化层 / 可选不对称 Au 天线 / 上方芯片盖板**。**DNA、水和离子只与 HfO₂ 接触；Au 不直接暴露于流道**。IR（3000–3700 cm⁻¹）与 VIS（例如 800 nm）优先从 IR 透明的固体侧耦合，SFG（约 630 nm）经优化的反射或透射模式收集。主要目标是测量碱基 N–H、周围水 O–H 及 HfO₂ 表面水共同形成的振动复振幅，而不仅仅检测几十个分子的孤立振动峰。

我们通过几何水分子计数、Boyd–Hamm 振动超极化率参考模型、三频近场耦合以及热学/散粒噪声模型，计算有效光子预算和辨识条件。

我们想验证四项目标有没有机会达成：局部实际温升不超过 5 K、单事件 SNR 不低于 5、最难区分碱基对的有效光学对比度至少 10%、目标读出窗口不超过 3 ms。**这些是尚待验证的性能要求，不是平面流道已达到的结果**。此外，普通平面流道无法像 3 nm 纳米孔一样天然使 DNA 伸直并逐碱基通过热点，因此将**固定或位置受控 DNA 的序列相关光谱**作为第一阶段成果，把真正的单条 DNA 连续测序作为更高风险的长期目标。

# 1. 研究动机：SFG加上Au等离子激元能不能比肩商业纳米孔

## 1.1 商业速度与研究目标

在 400 nt/s 的条件下，一条 100 kb DNA 的理想转运时间约 250 s。若光学读出时间为 3 ms/nt，则等效为 333 nt/s、100 kb 约 300 s；因此 3 ms 是**接近但没有严格打平**商业单孔读速的目标 \[1\]。平面流道可以让多个 DNA、多个光学热点和样品连续流动，因此其未来优势可能是并行、多参数检测，而不是自动增加单条 DNA 的读取速度。

SERS 已经在纳米狭缝中识别单碱基振动 \[2\]；Khabarov 等 2025 年在可渗透等离激元薄膜中获得游离核苷酸约 20 μs 的时间分辨和约 89% 的单事件四类分类准确率 \[3\]。不过，两项工作都不构成未知长 DNA 的完整连续测序。它们说明**单分子振动识别具有实验依据，同时设置了 SFG 必须认真面对的 Raman 基准**。

SFG 的可能独特价值，是同时读取碱基自身的 N–H 与 HfO₂/水合层的 O–H 振动，并利用对取向与相干相位敏感的界面响应，探测 DNA–水–材料相互作用。

## 1.2 四项期待的指标

在空气水界面的SFG测量大家都需要匹配液面控制系统就是因为温度升高比较快，液面蒸发。

信噪比 SNR 就不用解释了，然后就是需要能区分碱基。也要保证测量速度不要太慢，也就是积分时间要短。

| 指标 | 初期挑战目标 | 需要说明的限制 |
|:-----------------------|-----------------------:|:-----------------------|
| 局部温升 $\Delta T_{\max}$ | $\le 5\ \mathrm K$ | 检查 Au、液体与 DNA 附近的稳态/瞬态温度 |
| 信噪比SNR | $\ge 5$ | 单次事件，不是多次平均后的 SNR |
| A/T/G/C 对比度或者可区分度 $\delta_{\min}$ | $\ge 10\%$ | 包括表面水与金属背景 |
| 单位置积分时间 $\tau$ | $\le 3\ \mathrm{ms}$ | 不能把流道内 DNA 总通过时间等同于单碱基时间 |

**我们**首先证明平面界面水与 DNA 的振动差分，再证明单个受控 DNA 位点的可区分性，最后才检验连续的动态碱基读出。

# 2. 平面微流道器件设计及简单验证

## 2.1 器件设计与制造逻辑

$$
\boxed{\mathrm{CaF_2\ /\ Au_{patterned}\ /\ HfO_2\ /\ (DNA+H_2O+ions)\ /\ HfO_2\ /\ Au_{optional}\ /\ cover}}
$$

初步参数：

| 尺度 | 候选范围 | 用途 |
|:-----------------------|:-----------------------|:-----------------------|
| 流道高度 $h$ | 10、30、100 nm | 受限水、DNA 可进入性与制造良率折中 |
| 流道宽度 $W_c$ | 0.1–5 μm | 适于刻蚀、键合与微流控进样 |
| 流道长度 | 10–500 μm | 与宏观液池连通；非整个长度均受光照 |
| HfO₂ 钝化厚度 $t_d$ | 1–3 nm | 使金属与溶液隔离，同时不使热点离水太远 |
| 光学热点平面尺寸 | 5–50 nm（作为模型扫描） | 在局部化与有效振动源之间折中 |
| IR、VIS、SFG | 约 3 μm、800 nm、630 nm | 分别计算实际场重叠与出射效率 |

10 nm 高流道的研究目标是受限水/大分子通过，而不是让 DNA 逐个碱基自动通过。对已知长度的 ssDNA，还需研究通道入口的线性化、壁面粘附、流速及构象分布。

## 2.2 相关制造与光学文献

现有六篇研究分别验证了 CaF₂/蓝宝石与 Au 平面纳流道的制造及增强红外光谱（SEIRA）、受限水振动与表面反应动力学检测，以及 DNA 碱基的 SERS 识别，为本方案提供了工艺和光谱学基础，但尚未实现 Au/HfO₂ 平面微流道中的单分子 SFG 检测。\[2\]–\[7\]

## 2.3 为什么用HfO₂？

HfO₂ 可通过 ALD 覆盖刻蚀流道内壁制造上比较简易，具有合适的SFG VIS IR透光性，以及可以减速DNA运动。与 SiO₂、SiNₓ 等其他主流刻蚀领域常见材料主要比较指标（表面水的 OH-SFG 强度和相位、羟基背景、盐/pH 响应、HfO₂ 保形覆盖后的热点衰减、长期流动中的材料稳定性）对比有一定优势。

## 2.4 从 CaF₂ 侧入射IR和Vis光

使用 CaF₂ 背面入射的主要原因是避免在体相水中传播很长距离的 3 μm IR。这也是大家常用的方案。设 OH 区水吸收系数的参考值为 $\alpha_{\mathrm{IR}}=1.25\ \mu\mathrm m^{-1}$，则一个极简传播模型为：

$$
T_{\mathrm{IR}}(h)=\exp(-\alpha_{\mathrm{IR}}h).
$$

| 水层光程 | IR 强度透过率（参考模型） |
|:---------|--------------------------:|
| 10 nm    |                    98.76% |
| 30 nm    |                    96.32% |
| 100 nm   |                    88.25% |
| 0.6 μm   |                    47.24% |

# 3. DNA–水合层的振动来源及平面几何水分子数

## 3.1 可能提供信号的振动

| IR 频段        | 可能的主导响应            | 对本器件的意义             |
|:---------------|:--------------------------|:---------------------------|
| 3000–3350 cm⁻¹ | DNA N–H、强氢键水 O–H     | 碱基直接响应与水重排重叠   |
| 3350–3500 cm⁻¹ | 氨基 N–H、界面水 O–H      | 主要信号候选               |
| 3500–3650 cm⁻¹ | 较弱氢键水、部分氧化物 OH | 候选水合状态对照           |
| 3650–3700 cm⁻¹ | 较弱氢键水和表面 OH       | 区分羟基化程度，须谨慎归属 |

Yan 等 2024 年已利用**手性 SFG**观察到 DNA 碱基对 N–H 及第一水合层 O–H 振动 \[8\]，注意这里测试的是大量DNA及其附近的水，我们的方案水的数量可能少很多。

## 3.2 平面流道中水的数量

取两块平行 HfO₂ 板之间高度 $h$，局部光学热点的平面面积 $A_{\mathrm{hot}}=w\ell$。水分子数密度取 $\rho_w=33.4\ \mathrm{nm}^{-3}$，单侧靠壁水层厚度 $d_w=0.30$ nm。忽略 DNA 与离子排除体积，得到：

$$
\begin{aligned}
N_{\mathrm{all}}&\simeq\rho_w A_{\mathrm{hot}}h,\\
N_{\mathrm{wall,one}}&\simeq\rho_w A_{\mathrm{hot}}d_w,\\
N_{\mathrm{wall,two}}&\simeq2\rho_w A_{\mathrm{hot}}d_w.
\end{aligned}
$$

**表 1.** 固定 $h=10$ nm、正方形有效热点 $w=\ell=a$ 时的参考计数：

| 热点 $a\times a$ | 流道内水分子总量 | 两侧各 0.3 nm 表面水 | DNA 沿热点长度对应的核苷酸数$^*$ |
|:-----------------|-----------------:|-----------------:|-----------------:|
| 5×5 nm² | 8,350 | 501 | \~9 |
| 10×10 nm² | 33,400 | 2,004 | \~18 |
| 20×20 nm² | 133,600 | 8,016 | \~36 |
| 50×50 nm² | 835,000 | 50,100 | \~91 |

$^*$取沿通道方向的伸展间距为 0.55 nm/nt；

![两壁第一水层与全部水体积的几何估算。仅为密度模型，绝非有效 SFG 振动源数量。](figures/water_counts.png){#fig-watercounts width="85%"}

以 20×20 nm² 热点为例，**两侧第一水层已经约有 8000 个水分子**。一个特定碱基周围直接扰动的水可能只有约 6–10 个，并可能诱导额外数十个水重新取向。若只数分子且均匀加权，巨大的静态背景会稀释单碱基差异；但 SFG 权重受分子取向、两壁相消和局域近场影响，不能也不必要把上述 8000 个水直接代入 $N^2$ 强度定律。

为了显示面积稀释的趋势，可用特别理想化的“15 个水完全翻转、其余每个壁水权重相同”模型：

$$
\delta_{\mathrm{water}}^{\mathrm{toy}}\simeq
2\frac{15}{N_{\mathrm{wall,two}}}.
$$

对应 5、10、20、50 nm 方形热点时约为 **6.0%、1.50%、0.37%、0.060%**。这是**示意性上、下界面同相且绝对背景可见的模型**，不是对四种碱基的实验预测；甚至不能把水数量差直接等同于净取向振幅差。

## 3.3 有效复振幅

对单次受控 DNA 状态 $b$：

$$
\begin{aligned}
A_b(\omega)={}&A_{\mathrm{Au,NR}}(\omega)
+A_{\mathrm{HfO_2}}(\omega)
+A_{\mathrm{water,upper},b}(\omega)\\
&+A_{\mathrm{water,lower},b}(\omega)
+A_{\mathrm{DNA},b}(\omega).
\end{aligned}
$$

$A_{\mathrm{DNA},b}$ 包括 N–H 及可能的骨架响应；水贡献还可能包含非局域 $\chi^{(3)}E_{\rm DC}$ 项（这项可以参考王鸿飞 ，*FM Geiger他们俩*研究了好久）。两壁的表面法向相反，特定偏振通道下的 OH 振幅可能部分抵消。**非对称 Au 的作用是调整空间权重，而不是保证两壁分子取向同相**。当然我这里可能还漏掉考虑一些贡献，比如DNA在纳米流道的手性水可能是怎么样的，先这样吧，对不起，我已经头晕了。

在某个选定频率和出射模式下，以参考单个 OH 振子的场为单位定义复数：

$$
\mathcal N_b\equiv A_{\mathrm{molecular},b}/A_{\mathrm{OH,ref}},
\qquad
\Delta\mathcal N_{bb'}=\mathcal N_b-\mathcal N_{b'}.
$$

$|\mathcal N_b|$ 可随热点面积变大；但**能否分辨碱基由** $|\Delta\mathcal N_{bb'}|$ 及其相位投影决定，不能直接用增大的总水分子数判断。

# 4. Au/HfO₂ 的信噪比

本章从热点（等离子激元）中的水和 DNA 振动出发，估算 Au 增强后的 SFG 光子数，再计算不同碱基的光学对比度、SFG能不能在10 ms 与 3 ms 内获取到理想的信噪比。如果不行，那么如果固定DNA不动要多长的积分时间理想的信噪比，能获取到。所有光子预算采用相同的 3400 cm⁻¹ 参考 OH、激光条件和检测效率，计算结果属于器件设计情景。

## 4.1 在信号区多少水、O–H 和 DNA N–H？

沿用第三章的几何模型：平面流道高度为 $h=10\ \mathrm{nm}$，方形热点边长为 $a$。取水分子数密度 $\rho_w=33.4\ \mathrm{nm^{-3}}$，上下 HfO₂ 壁面各有厚度 $d_w=0.30\ \mathrm{nm}$ 的第一水层，则

$$
\begin{aligned}
N_{\mathrm{water}}&=\rho_w a^2h,\\
N_{\mathrm{wall,two}}&=2\rho_w a^2d_w,\\
N_{\mathrm{OH,wall}}&=2N_{\mathrm{wall,two}}=4\rho_w a^2d_w.
\end{aligned}
$$

**表 4-1. 热点内水分子和第一层 O–H 的几何数量。**

| 热点面积 | 全部水分子 | 两壁第一层水 | 两壁第一层 O–H | 沿流向覆盖的 ssDNA 碱基数\* |
|:--------------|--------------:|--------------:|--------------:|--------------:|
| $5\times5\ \mathrm{nm^2}$ | 8,350 | 501 | 1,002 | 约 9 |
| $10\times10\ \mathrm{nm^2}$ | 33,400 | 2,004 | 4,008 | 约 18 |
| $20\times20\ \mathrm{nm^2}$ | 133,600 | 8,016 | 16,032 | 约 36 |
| $50\times50\ \mathrm{nm^2}$ | 835,000 | 50,100 | 100,200 | 约 91 |

\*以伸展 ssDNA 的相邻核苷酸投影间距 $0.55\ \mathrm{nm/nt}$ 估算。此处为体积计数，不表示这些 OH 均可相干产生 SFG。

单个碱基具有的 N–H 键数量约为 A：2、G：3、C：2、T：1。Furmanchuk 等的孤立碱基水合模拟给出 A、G、C、T 第一水合层平均约 6.87、8.52、6.12、6.42 个水分子 \[10\]。因此，要分辨一个碱基，关键不是整个热点附近有多少水，而是**这个碱基能带来多少有效的 O–H/N–H 振动响应**。

## 4.2 单个 O–H 能产生多大 SFG 响应？

按照 Boyd 的受驱动振子模型，IR 激发 O–H 伸缩，VIS 与随键长改变的电子极化率耦合，形成 SFG 偶极矩 \[1,2\]：

$$
p_{\mathrm{SFG},1}=\beta_{\mathrm{OH}}^{(2)}E_{\mathrm{IR}}E_{\mathrm{VIS}}.
$$

共振超极化率为

$$
\left|\beta_{\mathrm{OH}}^{(2)}\right|\simeq\frac{|\alpha'\mu'|}{2m\gamma\omega_0}.
$$

取 $\tilde\nu_0=3400\ \mathrm{cm^{-1}}$、$m=1.56\times10^{-27}\ \mathrm{kg}$、$\mu'=2\ \mathrm{D/\mathring A}$、极化率体积导数 $\alpha'_{\mathrm{vol}}=1\ \mathrm{\mathring A^2}$、阻尼参数 $\gamma/(2\pi c)=100\ \mathrm{cm^{-1}}$，得到

$$
\boxed{|\beta_{\mathrm{OH,ref}}^{(2)}|\simeq1.97\times10^{-51}\ \mathrm{C\,m^3/V^2}.}
$$

氢键或限制性流道或表面双电层可能会改变水的振动跃迁偶极矩、Raman 极化率及振动耦合 \[3,4\]。在其他参数不变时，若偶极矩导数提高 1.5 或 2 倍，因光子率与 $|\beta^{(2)}|^2$ 成正比，可用下列三档进行敏感性计算：

$$
\boxed{q_\beta\equiv\left|\frac{\beta_{\mathrm{eff}}}{\beta_{\mathrm{OH,ref}}}\right|^2=1,\ 2.25,\ 4.}
$$

这里 $q_\beta$ 分别对应参考光子率、参考光子率的 2.25 倍和 4 倍（显然是夸张的）。原始参考已经选在氢键水常见的 $3400\ \mathrm{cm^{-1}}$ 附近，因此后两档只是模型敏感性情景，不能当作实验中必然额外获得的增强。

根据振荡偶极辐射公式 \[1\]：

$$
P_{\mathrm{rad},1}=\frac{\omega_{\mathrm{SFG}}^4|p_{\mathrm{SFG},1}|^2}{12\pi\varepsilon_0c^3},\qquad
n_{\gamma,1}\simeq\frac{P_{\mathrm{rad},1}\tau_p}{\hbar\omega_{\mathrm{SFG}}}.
$$

采用 VIS 800 nm、IR $3400\ \mathrm{cm^{-1}}$、有效脉宽 1 ps、单脉冲 VIS/IR 通量 $0.4/0.6\ \mathrm{mJ\,cm^{-2}}$、重复频率 37.6 MHz、收集与探测总效率 10%，得到原始单振动源检测率

$$
\boxed{K_{0,\mathrm{ref}}=5.62\times10^{-12}\ \mathrm{photons/s}.}
$$

三档实际采用的参考系数为：

| $q_\beta$ | 单振动源参考检测率 $q_\beta K_{0,\mathrm{ref}}$ |
|----------:|------------------------------------------------:|
|         1 |           $5.62\times10^{-12}\ \mathrm{s^{-1}}$ |
|      2.25 |         $1.2645\times10^{-11}\ \mathrm{s^{-1}}$ |
|         4 |          $2.248\times10^{-11}\ \mathrm{s^{-1}}$ |

全文始终以**原始参考 OH** 为振幅单位，避免重复放大有效 OH 数量。

## 4.3 水的取向与上下表面不对称

界面水的 O–H 取向不同，SFG 振幅可能相加，也可能部分抵消。所以我们需要定义 $f_{\mathrm{ori}}$ 为水分子平均取向，$\eta_{\mathrm{asym}}$ 为我们故意设置的不对称等离子激元所带来的上下表面信号强度区别。

SiO₂/水相位分辨 SFG 测到了表面水的取向 \[5\]；TiO₂/水的 SFG 与模拟揭示吸附水结构以及随表面电荷变化的水取向翻转 \[6,7\]；ZrO₂ 相关的稳定氧化锆表面也观测到了吸附水与羟基振动的 VSFG \[8\]。因此，根据上述氧化物，我们大概选取

$$
\boxed{f_{\mathrm{ori}}=0.05}
$$

作为 HfO₂ 第一水层的中心计算情景，同时也可以取 $0.01$–$0.15$。这里的 0.05 是**参考相似氧化物建立的估计**，不是 \[5–8\] 实验测量 HfO₂ 值；

在两侧水响应强度近似相同、但上下表面净 SFG 方向相反的简化情景中，令下壁光学振幅权重为 1，上壁为 $r$，则

$$
\begin{aligned}
|\mathcal N_0|&\simeq N_{\mathrm{OH,wall}}f_{\mathrm{ori}}\eta_{\mathrm{asym}},\\
\eta_{\mathrm{asym}}&\equiv\frac{|1-r|}{2}.
\end{aligned}
$$

取 $\eta_{\mathrm{asym}}=0.25$，意味着HfO₂ 上壁相对下壁的 SFG 振幅 $r=0.50$，即下壁约为上壁的 2 倍；取 $\eta_{\mathrm{asym}}=0.40$ 则意味着 $r=0.20$，即HfO₂ 下壁约为上壁的 5 倍。通过上下 HfO₂ 厚度与 Au 天线的不对称设计，有可能改变这两个壁面的光学权重；具体达到何种比例仍取决于 IR、VIS 和 SFG 三频近场。

**表 4-2. 采用统一** $f_{\mathrm{ori}}=0.05$ 时的有效 OH 等效振幅。

| 热点面积 | 几何第一层 OH | $\eta_{\mathrm{asym}}=0.25$ | $\eta_{\mathrm{asym}}=0.40$ |
|:-----------------|-----------------:|-----------------:|-----------------:|
| $5\times5\ \mathrm{nm^2}$ | 1,002 | 12.53 | 20.04 |
| $10\times10\ \mathrm{nm^2}$ | 4,008 | 50.10 | 80.16 |
| $20\times20\ \mathrm{nm^2}$ | 16,032 | **200.40** | **320.64** |
| $50\times50\ \mathrm{nm^2}$ | 100,200 | 1,252.5 | 2,004 |

因此，我们后面重点是比较**小热点** $5\times5\ \mathrm{nm^2}$、$\eta=0.40$（$\mathcal N_0=20.04$）与**大热点** $20\times20\ \mathrm{nm^2}$、$\eta=0.25$（$\mathcal N_0=200.40$）。小热点具有较好的空间选择性，而大热点拥有更高的总共振信号。上表 50 nm 热点同时覆盖约 91 个碱基，不能用其总光子数直接代表单碱基读出。

单面第一水层的示意性表面二阶非线性极化率也可以估算为

$$
\chi_{s,\mathrm{OH}}^{(2)}\sim\frac{2\rho_wd_wf_{\mathrm{ori}}\beta_{\mathrm{OH,ref}}^{(2)}}{\varepsilon_0}
\simeq(4.46\times10^{-21})f_{\mathrm{ori}}\ \mathrm{m^2/V}.
$$

当 $f_{\mathrm{ori}}=0.05$ 时，参考值为 $|\chi_s^{(2)}|\sim2.23\times10^{-22}\ \mathrm{m^2/V}$。

## 4.4 水 O–H 与 DNA N–H 信号能否共同贡献 SFG？

可以，但实际探测的是**选定 IR 频率下**由不同振动产生的 SFG 光场。O–H 与 N–H 谱带重叠时，两个贡献会按振幅和相位叠加；不重叠时，可通过改变 IR 频率分别测量。Perets 等已利用手性 SFG 测得 DNA 碱基对及第一水合层的振动特征 \[11\]。

用一个参考 OH 的 SFG 场幅度作单位，定义

$$
\mathcal N_b=\mathcal N_{\mathrm{water},b}+\mathcal N_{\mathrm{NH},b}+\mathcal N_{\mathrm{surface},b}.
$$

测序需要的不是总信号尽可能强，而是不同碱基状态 $b$、$b'$ 之间的差分 $\Delta\mathcal N_{bb'}=\mathcal N_{b'}-\mathcal N_b$ 足够大。

## 4.5 Au 增强之后每秒能检测到多少光子？

用三频有效增强表示 Au 对 IR、VIS 局部激发和 SFG 远场耦合的共同作用：

$$
G_{\mathrm{eff}}=|L_{\mathrm{IR}}L_{\mathrm{VIS}}L_{\mathrm{out}}|^2.
$$

碱基状态 $b$ 的共振 SFG 光子率为

$$
\boxed{R_b=K_{0,\mathrm{ref}}\,q_\beta\,G_{\mathrm{eff}}|\mathcal N_b|^2.}
$$

**表 4-3. 大热点** $20\times20\ \mathrm{nm^2}$、$f_{\mathrm{ori}}=0.05$、$\eta_{\mathrm{asym}}=0.25$（$\mathcal N_0=200.4$）的检测计数。

| $G_{\mathrm{eff}}$ | $q_\beta=1$：光子/s | $q_\beta=1$：10 ms 光子 | $q_\beta=2.25$：10 ms 光子 | $q_\beta=4$：10 ms 光子 |
|--------------:|--------------:|--------------:|--------------:|--------------:|
| $10^6$ | 0.226 | 0.00226 | 0.00508 | 0.00903 |
| $10^7$ | 2.26 | 0.0226 | 0.0508 | 0.0903 |
| $10^8$ | 22.57 | **0.2257** | **0.5078** | **0.9028** |

在更强单壁选择性 $\eta_{\mathrm{asym}}=0.40$ 时，大热点 $|\mathcal N_0|=320.64$，当 $G=10^8$ 时 10 ms 光子数依次是 **0.578、1.300、2.311**（$q_\beta=1,2.25,4$）。

**表 4-4. 小热点** $5\times5\ \mathrm{nm^2}$、$\eta_{\mathrm{asym}}=0.40$（$\mathcal N_0=20.04$）的 10 ms 光子数。

| $G_{\mathrm{eff}}$ | $q_\beta=1$ | $q_\beta=2.25$ | $q_\beta=4$ |
|-----------------:|-----------------:|-----------------:|-----------------:|
| $10^6$ | $2.26\times10^{-5}$ | $5.08\times10^{-5}$ | $9.03\times10^{-5}$ |
| $10^7$ | $2.26\times10^{-4}$ | $5.08\times10^{-4}$ | $9.03\times10^{-4}$ |
| $10^8$ | **0.00226** | **0.00508** | **0.00903** |

小热点虽更接近空间选择性检测，但当前情景下每 10 ms 的光子数显著少于一个。对于大热点，最乐观的 $G=10^8$、$q_\beta=4$、$\eta=0.40$ 也仅获得约 2.31 个共振光子。

## 4.6 如何区分不同的碱基？

假设相邻碱基产生的大部分振动响应相同，仅有一小部分不同。将差分 OH 等效幅度设为 $|\Delta\mathcal N|=2,5,10,20$，其中 2 和 5 是较弱、较强的单碱基测试档位，10 和 20 用于更明显的协同水重排或多位点变化。这些档位用于检验光子预算，并非对 A/G/T/C 的直接实验标定。

定义碱基间光学对比度：

$$
\delta_{bb'}=\frac{|R_{b'}-R_b|}{(R_b+R_{b'})/2}.
$$

在最有利的相位关系下取 $\mathcal N_b=\mathcal N_0$、$\mathcal N_{b'}=\mathcal N_0+\Delta\mathcal N$。

**表 4-5. 不同热点尺寸下的光学对比度。**

| $|\Delta\mathcal N|$ | 小热点 $\mathcal N_0=20.04$ | 大热点 $\mathcal N_0=200.40$ |
|-----------------------:|-----------------------:|-----------------------:|
| 2 | 18.97% | 1.99% |
| 5 | 43.83% | 4.93% |
| 10 | 76.81% | 9.73% |
| 20 | 119.87% | 18.97% |

这里采用对称的强度对比度定义，上限为 200%；因此小热点在较大差分下可以出现超过 100% 的对比度，但并不代表容易检测，因为其光子总数很少。较大的 Au 增强 $G$ 或共同倍数 $q_\beta$ 会提高总光子数，却**不会自动提高这张表的相对对比度**。

在参考态已充分标定、只考虑光子散粒噪声的条件下，用

$$
\boxed{\mathrm{SNR}_{bb'}\simeq\delta_{bb'}\sqrt{\bar R\tau},\qquad \bar R=\frac{R_b+R_{b'}}{2}.}
$$

**表 4-6. 大热点** $\mathcal N_0=200.40$、$G=10^8$，10 ms 单次检测的理想 **SNR**。

| $|\Delta\mathcal N|$ | $q_\beta=1$ | $q_\beta=2.25$ | $q_\beta=4$ |
|---------------------:|------------:|---------------:|------------:|
|                    2 |      0.0095 |         0.0142 |      0.0190 |
|                    5 |      0.0237 |         0.0356 |      0.0474 |
|                   10 |      0.0474 |         0.0711 |      0.0948 |
|                   20 |      0.0947 |         0.1421 |  **0.1894** |

若取 $G=10^6$ 或 $10^7$，同表 SNR 分别乘以 0.1 或 $\sqrt{0.1}\approx0.316$。如果取小热点 $\mathcal N_0=20.04$、$G=10^8$、$q_\beta=4$，差分 2、5、10、20 的 10 ms 理想 SNR 依次为 0.0189、0.0471、0.0930、0.1799，仍然远小于 5。

## 4.7 接近商业测序速度时，3 ms 能区分碱基吗？

在其他条件相同的情况下，SNR 随积分时间的平方根变化：

$$
\mathrm{SNR}_{3\mathrm{ms}}=\mathrm{SNR}_{10\mathrm{ms}}\sqrt{\frac{3}{10}}.
$$

**表 4-7. 大热点** $\mathcal N_0=200.40$，$G=10^8$、$q_\beta=4$ 的 10 ms 与 3 ms 对比。

| $|\Delta\mathcal N|$ | 10 ms 理想 SNR | 3 ms 理想 SNR |
|---------------------:|---------------:|--------------:|
|                    2 |         0.0190 |        0.0104 |
|                    5 |         0.0474 |        0.0260 |
|                   10 |         0.0948 |        0.0519 |
|                   20 |         0.1894 |    **0.1038** |

由此可见，在当前指定的 $G\le10^8$ 情景下，不论是 10 ms 还是 3 ms，单次碱基差异的理想 SNR 都明显低于目标 5。

## 4.8 固定 DNA 需要多少积分时间？

当公共背景远强于差分场、且差分振幅以最有利相位改变光强时，可以进一步用

$$
\mathrm{SNR}\simeq2|\Delta\mathcal N|\sqrt{K_{0,\mathrm{ref}}q_\beta G_{\mathrm{eff}}\tau}
$$

作快速估计。使用上一节的完整对比度公式计算 SNR=5 的所需时间，结果为：

**表 4-8. 大热点** $\mathcal N_0=200.40$、$G=10^8$ 时达到 SNR=5 的理想积分时间。

| $|\Delta\mathcal N|$ | $q_\beta=1$ | $q_\beta=2.25$ | $q_\beta=4$ |
|---------------------:|------------:|---------------:|------------:|
|                    2 |    46.3 min |       20.6 min |    11.6 min |
|                    5 |    7.42 min |       3.30 min |   **111 s** |
|                   10 |       111 s |         49.5 s |  **27.8 s** |
|                   20 |      27.9 s |         12.4 s |  **6.97 s** |

相应地，在 10 ms 内达到 SNR=5 所需的有效增强（这里取 $q_\beta=4$）为：

| $|\Delta\mathcal N|$ | 所需 $G_{\mathrm{eff}}$（10 ms） | 所需 $G_{\mathrm{eff}}$（3 ms） |
|-----------------------:|-----------------------:|-----------------------:|
| 2 | $6.95\times10^{12}$ | $2.32\times10^{13}$ |
| 5 | $1.11\times10^{12}$ | $3.71\times10^{12}$ |
| 10 | $2.78\times10^{11}$ | $9.27\times10^{11}$ |
| 20 | $6.97\times10^{10}$ | $2.32\times10^{11}$ |

这里的秒级至分钟级时间适用于固定 DNA、稳定的单一状态或可重复统计的相同样品；流动 DNA 并不会自然在单碱基热点停留这么久。

## 4.9 等离子激元带来的信号增强有多少

Guo 等利用 Au 纳米孔阵列获得约 30 倍的 PE-SFG 增强 \[12\]；Sakurai 等报告了约 $6.3\times10^6$–$1.3\times10^7$ 的 TE-SFG 增强估算 \[13\]；Roelli 等在针尖–NPoM 纳米腔中报告可达 $10^{14}$ 量级的局域 SFG 增强 \[14\]。这些是不同器件和参照体系的结果，不能直接等同于 HfO₂ 接液面上的 $G_{\mathrm{eff}}$。因此本章将 $G=10^6$–$10^8$ 用作待检验的工程情景。

**结论。** 在统一采用 $q_\beta=1,2.25,4$、$f_{\mathrm{ori}}=0.05$、$\eta_{\mathrm{asym}}=0.25$ 或 0.40 后，10 ms 与 3 ms 均未达到单次碱基区分的 SNR=5 目标。减小热点可以显著提高几何选择性与光学对比度，但也大幅减少可探测光子；增大热点可提高总信号，却会同时覆盖多个核苷酸。

## 本章参考文献

\[1\] Boyd, R. W. *Nonlinear Optics*, 4th ed. Academic Press (2020).

\[2\] Hamm, P. & Zanni, M. T. *Concepts and Methods of 2D Infrared Spectroscopy*. Cambridge University Press (2011).

\[3\] Schmidt, J. R., Corcelli, S. A. & Skinner, J. L. Pronounced non-Condon effects in the ultrafast infrared spectroscopy of water. *J. Chem. Phys.* **123**, 044513 (2005). https://doi.org/10.1063/1.1961472

\[4\] Auer, B. M. & Skinner, J. L. IR and Raman spectra of liquid water: Theory and interpretation. *J. Chem. Phys.* **128**, 224511 (2008). https://doi.org/10.1063/1.2925258

\[5\] Urashima, S.-h., Myalitsin, A., Nihonyanagi, S. & Tahara, T. The Topmost Water Structure at a Charged Silica/Aqueous Interface Revealed by Heterodyne-Detected Vibrational Sum Frequency Generation Spectroscopy. *J. Phys. Chem. Lett.* **9**, 4109–4114 (2018). https://doi.org/10.1021/acs.jpclett.8b01650

\[6\] Hosseinpour, S. et al. Chemisorbed and Physisorbed Water at the TiO₂/Water Interface. *J. Phys. Chem. Lett.* **8**, 2195–2199 (2017). https://doi.org/10.1021/acs.jpclett.7b00564

\[7\] Schlegel, S. J. et al. How water flips at charged titanium dioxide: an SFG-study on the water–TiO₂ interface. *Phys. Chem. Chem. Phys.* **21**, 8956–8964 (2019). https://doi.org/10.1039/C9CP01131E

\[8\] Adhikari, N. M., Hou, B. & Allen, H. C. Vibrational sum frequency generation (VSFG) spectroscopy of water adsorption on surfaces of yttria-stabilized cubic zirconia (YSZ). *J. Chem. Phys.* **161**, 194701 (2024). https://doi.org/10.1063/5.0231569

\[9\] Morita, A. & Hynes, J. T. A theoretical analysis of the sum frequency generation spectrum of the water surface. *Chem. Phys.* **258**, 371–390 (2000). https://doi.org/10.1016/S0301-0104(00)00127-0

\[10\] Furmanchuk, A., Isayev, O., Shishkin, O. V., Gorb, L. & Leszczynski, J. Hydration of nucleic acid bases: a Car–Parrinello molecular dynamics approach. *Phys. Chem. Chem. Phys.* **12**, 3363 (2010). https://doi.org/10.1039/B923930H

\[11\] Perets, E. A. et al. Beyond the “spine of hydration”: Chiral SFG spectroscopy detects DNA first hydration shell and base pair structures. *J. Chem. Phys.* **161**, 095104 (2024). https://doi.org/10.1063/5.0220479

\[12\] Guo, W. et al. Plasmonic Gold Nanohole Arrays for Surface-Enhanced Sum Frequency Generation Detection. *Nanomaterials* **10**, 2557 (2020). https://doi.org/10.3390/nano10122557

\[13\] Sakurai, A. et al. Tip-enhanced sum frequency generation spectroscopy using temporally asymmetric pulse for detecting weak vibrational signals. *J. Chem. Phys.* **164**, 074202 (2026). https://doi.org/10.1063/5.0310824

\[14\] Roelli, P. et al. In-operando control of sum-frequency generation in tip-enhanced nanocavities. *Light Sci. Appl.* **14**, 203 (2025). https://doi.org/10.1038/s41377-025-01855-5

## 最终数字审计（计算与适用范围）

1.  **已完成的算术核对：** 几何水量、$\beta_{\mathrm{OH,ref}}^{(2)}$、$K_{0,\mathrm{ref}}$、$q_\beta$、等效振幅、光子数、强度对比度、10 ms/3 ms SNR、所需积分时间均使用统一公式独立复算；完整数据见配套脚本及 CSV。
2.  **明确修正的数字：** 删除 $q_\beta=25,50$；统一 $f_{\mathrm{ori}}=0.05$ 后，小热点 $|\mathcal N_0|=20.04$（而非 40），大热点 $|\mathcal N_0|=200.4$（$\eta=0.25$）或 320.64（$\eta=0.40$）。大热点在 $G=10^8$、10 ms 时三档光子数更新为 0.2257、0.5078、0.9028。
3.  **尚待实验/模拟的系数：** $f_{\mathrm{ori}}=0.05$、$\eta_{\mathrm{asym}}=0.25/0.40$、$G=10^6$–$10^8$、碱基差分幅度 $|\Delta\mathcal N|=2$–20，都不是直接测得的 HfO₂ 单碱基性能。两壁不对称权重已纳入 $\mathcal N_0$，$G$ 只表示约定的下壁三频增强，避免重复计算。
4.  **模型尚未完成的工程约束：** 以上光子率沿用原脉冲通量和 10% 探测效率，**没有证明局部温升** $\Delta T\le5\ \mathrm K$；另外在稀光子区，实际单次碱基分类需要用泊松分布而非仅靠高斯 SNR。流道高度仍沿用第三章的 $h=10$ nm 几何基准；如果改成 20–30 nm 以降低 DNA 卡滞风险，须重新核算场分布、DNA 到底壁的距离及背景。

# 参考文献

\[1\] Oxford Nanopore Technologies. *Continuous Development and Improvement.* <https://nanoporetech.com/about/continuous-development-and-improvement>

\[2\] Chen, C. et al. *High spatial resolution nanoslit SERS for single-molecule nucleobase sensing.* **Nature Communications** **9**, 1733 (2018). <https://doi.org/10.1038/s41467-018-04118-7>

\[3\] Khabarov, K. et al. *Raman identification of single nucleotides flowing through permeable plasmonic films.* **Nature Communications** **16**, 9113 (2025). <https://doi.org/10.1038/s41467-025-64165-9>

\[4\] Le, T. H. H. et al. *Fabrication of Infrared-Compatible Nanofluidic Devices for Plasmon-Enhanced Infrared Absorption Spectroscopy.* **Micromachines** **11**, 1062 (2020). <https://doi.org/10.3390/mi11121062>

\[5\] Le, T. H. H., Morita, A., Mawatari, K., Kitamori, T. & Tanaka, T. *Metamaterials-Enhanced Infrared Spectroscopic Study of Nanoconfined Molecules by Plasmonics–Nanofluidics Hybrid Device.* **ACS Photonics** **5**, 3179–3188 (2018). <https://doi.org/10.1021/acsphotonics.8b00398>

\[6\] Xu, J. et al. *Nanometer-Scale Heterogeneous Interfacial Sapphire Wafer Bonding for Enabling Plasmonic-Enhanced Nanofluidic Mid-Infrared Spectroscopy.* **ACS Nano** **14**, 12159–12172 (2020). <https://doi.org/10.1021/acsnano.0c05794>

\[7\] Duan, C. et al. *Label-Free Electrical Detection of Enzymatic Reactions in Nanochannels.* **ACS Nano** **10**, 7476–7484 (2016). <https://doi.org/10.1021/acsnano.6b02062>

\[8\] Perets, E. A. et al. *Beyond the “spine of hydration”: Chiral SFG spectroscopy detects DNA first hydration shell and base pair structures.* **Journal of Chemical Physics** **161**, 095104 (2024). <https://doi.org/10.1063/5.0220479>

\[9\] Guo, W. et al. *Plasmonic Gold Nanohole Arrays for Surface-Enhanced Sum Frequency Generation Detection.* **Nanomaterials** **10**, 2557 (2020). <https://doi.org/10.3390/nano10122557>

\[10\] Boyd, R. W. *Nonlinear Optics.* Academic Press.

\[11\] Hamm, P. & Zanni, M. T. *Concepts and Methods of 2D Infrared Spectroscopy.* Cambridge University Press.

------------------------------------------------------------------------

# 结论

想通过SFG加上Au等离子激元达到商业 DNA 纳米孔测序的性能大概是不可能的，主要是SFG在短时间内信噪比太低。