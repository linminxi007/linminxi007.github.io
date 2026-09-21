---
title: "The Seventh Starling and Scaling Law"
date: 2026-09-14
description: "我曾经一直拿它和大语言模型中的 scaling law，还有水的 H-bond network 比较。"
categories:
  - dynamics
lang: zh-CN
translation-key: The Seventh Starling and Scaling Law
status: working
draft: false
---

# The Seventh Starling and Scale-free

![](images/paste-26.png)

哈哈，你可能问我：你个搞化学的为什么到处惹？

我的回答是：难道你不好奇吗？

这次我们看看鸟群的**scale-free** 和大预言模型的 **scaling law** **scale-free** **[SO(3)-Equivariant Graph Neural Network](SO(3)-Equivariant Graph Neural Networks_new.en.md)** 。我先说一下，下面的文字只是我的胡思乱想，主要是想给后续讨论 H-bond network和水溶液中的 long-range interaction 引入一个角度,或许利用通过不同极化组合SHS的信号解算的correlated vibrational spectroscopy能进一步找到一些有趣的东西,谁知道呢?

------------------------------------------------------------------------

## The Seventh Starling：local interaction 怎么变成 global correlation？

先从椋鸟开始。

Parisi 等人在 *Scale-free correlations in starling flocks* 中，用多台相机重建空中椋鸟群的三维位置、速度和方向，再比较一只鸟的速度涨落与其他鸟之间的相关性。\[1\]

他们发现一个很有意思的现象：椋鸟并不是固定半径内的所有鸟互动，而是大约跟固定数量的邻居——约 7-11 只 ,他们称之为是一种**topological interaction**. 换句话说，单只鸟获得的信息是很少的，但是整个鸟群却可以出现非常大尺度的集体运动。

他们在不同大小的鸟群中发现，速度涨落的关联长度会随着鸟群的线性尺寸一起增加。鸟群越大，每一只鸟能影响的鸟也跟着变多：

$$
\xi \propto L
$$

这里 $L$ 是鸟群尺寸，$\xi$ 是 correlation length。这个现象就是 **scale-free correlation** 的重要特征之一：系统里没有一个固定的内禀相关长度。

$$
\text{local interaction}
\rightarrow
\text{long-range correlation}
\rightarrow
\text{collective behavior}
$$

当然，这是一个活性动物系统。那么在 H-bond network 中，有没有可能出现类似的事情？

![](images/paste-31.png){width="468"}

![](images/paste-32.png){width="461"}

------------------------------------------------------------------------

## Scaling law：为什么我会把它和 scale-free 放在一起？

我曾经一直拿它和神经网络里的 scaling law 比较。\[2–4\]

![](images/paste-30.png)

LLM (大语言模型)中 scaling law 就是：**算力、数据和参数量增加时，loss 会以相当稳定的规律下降，而且在很大的尺度范围内常常近似表现为 power law。**

例Kaplan 等人发现：

$$
L(N)-L_\infty \propto N^{-\alpha}
$$

这和统计物理中常见的 scale-free correlation：

$$
C(r)\propto r^{-\gamma}
$$

在数学形式上很像。它们都具有一种 scaling structure：尺度变化以后，函数的形式不变，只多出一个幂次因子。

但这里一定要区分：**LLM 的 scaling law 并不能证明神经网络内部就是一个 scale-free critical system。** Kaplan 的 $N$ 是不同模型之间的 system size，而椋鸟中的 $r$ 是同一个系统内部的空间距离。两者目前首先是数学形式上的相似，而不是已经证明具有相同的物理机制。

顺便说一句，在大语言模型中普通 Transformer 的 full attention 并不完全适合拿来类比椋鸟的 local interaction，因为一个 token 在一层 attention 中原则上可以直接读取整个 context，是 all-to-all 的；local/sparse attention 才更接近“只和邻居相互作用”的图像。所以这里我更想比较的是“局域规则如何产生宏观 collective behavior”，而不是把 attention 和椋鸟的七个邻居一一对应。

这是 LLM 中 scaling law 的大致研究历史：

| 论文                               | 核心问题                      | 最重要结论                                                              |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| Hestness et al. 2017             | 深度学习整体有没有可预测的规模规律？        | **有。误差随数据/模型规模呈近似幂律下降。**                                           |
| Kaplan et al. 2020               | 语言模型的参数、数据、算力如何影响 loss？   | **Loss 对参数** $N$、数据 $D$、计算 $C$ 都近似遵循 power law。                    |
| Hoffmann et al. 2022, Chinchilla | 固定算力下，应该把算力花在参数还是数据上？     | **Kaplan太偏向增大模型参数；Chinchilla说参数量和训练 token 应近似同比例增长。**              |
| Wei et al. 2022                  | 如果 loss 平滑下降，为什么某些能力突然出现？ | **某些 downstream ability 看起来存在突然 threshold / emergence，而不是简单平滑增长。** |

当然，现在随着 MoE、强化学习、后训练、持续学习和 inference-time compute 的出现，“参数、数据、算力”之间的关系已经没有早期 scaling law 那么简单，但 power-law scaling 仍然提供了一个很有用的观察角度。

------------------------------------------------------------------------

## 那 H-bond network 会不会也有 scale-free？

这才是一直想问的问题。

H bond 本身显然是 short-range interaction：一根氢键只连接相邻的几个水分子。但是 **short-range interaction 并不意味着只能产生 short-range correlation**。一个水分子的取向改变，会改变它和邻近水分子的氢键几何；邻近水又继续影响下一层....。再加上水分子之间还存在高阶的 dipole–dipole coupling((对了,那些在做模拟水AIMD的神经网络里面加入Long range,实际上就是加一些东西保证偶极相互作用的表示.)， 以及离子、带电界面产生的电场，所以水的关联函数也可以被这样表达：

$$
C(r)
=
\left\langle
\delta \boldsymbol{\mu}(0)
\cdot
\delta \boldsymbol{\mu}(r)
\right\rangle
$$

也就是两个相距 $r$ 的水分子，它们的取向、极化或者 H-bond fluctuation 到底还能不能彼此相关。

做光谱MD计算的人,就是天天算这个咯.

现在的证据支持：**水确实可以出现 long-range orientational correlation，但这还不能直接叫 scale-free。** 室温 bulk water 中，密度结构主要是 short-range 的，不过模拟和散射工作都发现 dipolar/orientational correlation 可以延伸得更远；Roke 等人的工作也观察到稀电解质可以诱导纳米尺度甚至更远的 collective orientational response。\[5–8\] 但是 long-range 只意味着 $\xi$ 很大。如果

$$
C(r)\sim e^{-r/\xi}
$$

而 $\xi$ 仍然是一个有限常数，那么它依旧存在一个特征尺度，并不是严格的 scale-free。真正的 scale-free 更接近：

$$
C(r)\sim r^{-\eta}
$$

并且需要看到：随着 system size 增大，相关长度也跟着增长，而不是最后固定在某个几纳米的长度上。

所以“加入更多离子是不是就更容易得到 scale-free water？” 低浓度离子可以通过 ion–dipole interaction、water–water cross-correlation 和 H-bond network 产生较远的 collective response；但浓度继续增加以后，不同离子的 ordered domain 会重叠，Debye screening 也会增强，反而可能截断这种长程相关。\[5,6\] 换句话说，真正有意思的参数可能不是“离子越多越好”，而是是否存在某个 **浓度、温度、表面电荷密度或 confinement 条件**，让 correlation length 出现异常增长。

从温度角度来看,普通室温水目前没有被证明是一个 scale-free H-bond system；但在 supercooled water 中，随着温度接近 liquid–liquid critical region，density/H-bond network fluctuation 的 correlation length 会明显增长。\[9\] 更值得注意的是，2026 年 *Science* 报道了 supercooled water 中 liquid–liquid critical point 的直接实验迹象，并观察到约 $210\pm8\,\mathrm{K}$ 附近增强的 critical fluctuation。\[10\] 如果真的处在 critical point 附近，这里反而是最合理寻找近似 scale-free correlation 的地方：$\xi$ 会快速增长，理想临界极限下甚至趋于发散。

我另外很想看的就是 **大分子表面和细胞膜表面的水**。这里情况可能更有意思，因为表面相当于给 H-bond network 加了新的 boundary condition：表面电荷、磷脂头基、蛋白质的 hydrophilic/hydrophobic patch、曲率和 confinement 都可能重新排列水的 H-bond connectivity。已经有模拟工作看到，带电界面附近的 orientational order 可以延伸到数纳米，蛋白 hydration layer 中也可能出现明显的 long-range dipolar cross-correlation；膜附近加入 $\mathrm{H_3O^+}$ 还会进一步延长 interfacial-water perturbation。\[11–13\] 但这些结果仍然只是说明 **long-range / nonlocal response 是可能的**，并没有证明细胞膜表面的水已经是 scale-free。

如果真的要证明一个 H-bond network 是 scale-free，我觉得实验和模拟上至少应该同时看三件事：

1. $C(r)$ 是否在足够大的尺度区间表现为 power law，而不是一个很长但最终仍然 exponential 的 tail；
2. correlation length $\xi$ 是否会随着 system size 增长，而不是固定在某个分子尺度或纳米尺度；
3. 改变温度、离子浓度、界面电荷或膜组成时，是否能看到类似 critical scaling 的系统性变化，而不是只看到某一个条件下“相关变远了”。

这也是我觉得 SHS、SFG、CVS 很有意思的地方。如果最后真的能找到一个条件，让 H-bond network 从普通的 finite-$\xi$ 状态走向非常大的、甚至近似 scale-free 的 correlation，那么下一步就很有意思了：**在这样的 collective solvent environment 中，电子转移、自组装、离子传输或者膜通透过程，会不会和普通短程相关的溶剂出现本质不同的动力学？**

这也是我现在想把 **scaling law、scale-free、H-bond network 和 long-range interaction** 放到一起看的原因。它们目前当然不是同一个理论，但都在问一个相似的问题：

$$
\text{当 microscopic interaction 很局域时，macroscopic behavior 为什么还能跨越很多尺度？}
$$

------------------------------------------------------------------------

## References

1. Cavagna, A. et al. **Scale-free correlations in starling flocks.** *PNAS* **107**, 11865–11870 (2010).\
   https://www.pnas.org/doi/10.1073/pnas.1005766107
   
   Video: *The Seventh Starling: The Wonders of Collective Animal Behaviour*\
   https://www.carmin.tv/en/video/the-seventh-starling-the-wonders-of-collective-animal-behaviour

2. Hestness, J. et al. **Deep Learning Scaling is Predictable, Empirically.** arXiv:1712.00409 (2017).\
   https://arxiv.org/abs/1712.00409

3. Kaplan, J. et al. **Scaling Laws for Neural Language Models.** arXiv:2001.08361 (2020).\
   https://arxiv.org/abs/2001.08361

4. Hoffmann, J. et al. **Training Compute-Optimal Large Language Models.** NeurIPS (2022).\
   https://arxiv.org/abs/2203.15556

5. Chen, Y. et al. **Electrolytes induce long-range orientational order and free energy changes in the H-bond network of bulk water.** *Science Advances* **2**, e1501891 (2016).\
   https://pmc.ncbi.nlm.nih.gov/articles/PMC4846452/

6. Duboué-Dijon, E. & Laage, D. **Size and Origins of Long-Range Orientational Water Correlations in Dilute Aqueous Salt Solutions.** *J. Phys. Chem. B* **121**, 7026–7035 (2017).\
   https://pubmed.ncbi.nlm.nih.gov/28429943/

7. Kanth, J. M. P., Vemparala, S. & Anishetty, R. **Long-distance correlations in molecular orientations of liquid water and shape-dependent hydrophobic force.** *Phys. Rev. E* **81**, 021201 (2010).\
   https://pubmed.ncbi.nlm.nih.gov/20365555/

8. Omelyan, I. P. **Angular resolution and range of dipole-dipole correlations in water.** *J. Chem. Phys.* **120**, 3687–3701 (2004).\
   https://pubmed.ncbi.nlm.nih.gov/15268608/

9. Huang, C. et al. **Increasing correlation length in bulk supercooled H₂O, D₂O, and NaCl solution determined from small angle x-ray scattering.** *J. Chem. Phys.* **133**, 134504 (2010).\
   https://pubmed.ncbi.nlm.nih.gov/20942543/

10. You, S. et al. **Experimental evidence of a liquid-liquid critical point in supercooled water.** *Science* **391**, 1387–1391 (2026).\
    https://doi.org/10.1126/science.aec0018

11. Bandyopadhyay, D. et al. **How Far Is "Bulk Water" from Interfaces? Depends on the Nature of the Surface and What We Measure.** (2022).\
    https://pubmed.ncbi.nlm.nih.gov/35104127/

12. **Dipolar Cross-Correlations in Aqueous Systems: How Surfaces Influence Water's Action at a Distance.** (2025).\
    https://pubmed.ncbi.nlm.nih.gov/40390293/

13. **Effect of H₃O⁺ on the Structure and Dynamics of Water at the Interface with Phospholipid Bilayers.** (2020).\
    https://pubmed.ncbi.nlm.nih.gov/32003220/