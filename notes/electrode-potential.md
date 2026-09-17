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

我们将从电极的电子结构,再说到带水界面.
这一期是关于一个很简单但是却非常深奥的科学问题,什么是电极电势?

你可能觉得这个问题非常简单两个电极插到溶液中,电压表一打那就是电极电势.或者你会觉得这不就是一个选择参考点的问题我选真空或者H电极作为参考点把它作为0,其他的电极电势和它组成一个系统看看其他相对于它的电极电势是多少就好了.

但实际上,这个简单的问题电化学家从苏联科学院A.N. Frumkin院士再到Sergio Trasatti (http://www.cailiaoniu.com/?p=235685) ,再到现在人们用计算化学手段去计算电极电势和理解电极电势在电化学电催化中的作用,以及最近人们的SFG光谱直接测量表面电场或者PZC零电荷电势.大概从1960年走到了2021年.一共60年.

我对这个问题一开始毫不感兴趣,感觉这就是一个高中学生会遇到的问题,无聊的考试. 让我介绍一下我是如何走进这个问题的.一开始我对Nørskov的d ban center感兴趣. (https://www.pnas.org/doi/10.1073/pnas.1006652108) , (它描述了金属d 轨道...哈哈,因为也就是d(l=2)⟷rank-2 球张量,2l+1=5,分别是dz2​,dxz​,dyz​,dx2−y2​,dxy​五个,我不是在罗列,我只想说这正是我们之前SO3神经网络和Wigner–Eckart theorem描述的相同的球坐标系下表达世界的方法,跑题了...)

话说回来，Nørskov 的 d band center模型，它描述可以用金属 d 轨道的积分中心位置来衡量分子在表面吸附的强弱。**实际上，这并不是因为金属的 d 轨道和分子的轨道相互作用最强。分子首先会和金属宽广的 sp 带发生极强的相互作用，但因为不同过渡金属的 sp 带非常宽且特征相似，这种相互作用在不同金属上贡献的吸附能差不多是一个常数。**

这个时候，真正决定不同金属吸附强度差异（趋势）的，就是狭窄的 d 轨道了。**

1. 你会发现数学结构很像SFG的为什么?

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



我们在这里可以看到不同的参考零点,可以取无穷远的真空,比如我们把一个电子从无穷远真空移动到靠近电极表面的地方,我们称之为表面电势







我们先介绍什么是absolute electrode potential 开始, 从Trasatti和计算化学的角度(***[Atomic-Scale Modelling of Electrochemical Systems](https://onlinelibrary.wiley.com/doi/book/10.1002/9781119605652)*** Jia-Bo Le, Xiao-Hui Yang **Jun Cheng***）（Chapter 5）**),

three reference levels 

首先我们测的电极电势并不是你想的溶液的绝对电极电势减去电极的绝对电极电势,计算化学直到今天都不太清楚自己的计算在什么电极电势下.

SHE It is defined as the potential energy by reducing a solvated H+(aq) to 1/2H2(g) at T = 298.15K in the standard condition (p = 1 bar and pH = 0). 我重复这句话是为了提醒计算化学的人们.reversible hydrogen electrode (RHE) is more popular
for removing the pHeffect for electrochemical reactions involvingH+(aq), andsaturated
calomel electrode (SCE) and Ag/AgCl electrode

the electrochemical
potential of the working electrode U = (𝜇̃Cue − 𝜇̃Cu′e)/−e0,where 𝜇̃Cu
e and 𝜇̃Cu′
e denote the electrochemical potential of electron in Cu and Cu’ wire
connecting to the working electrode and reference electrode

The electrochemical potential of the electron in Cu wire is composed
by two parts𝜇̃Cu
e = 𝜇Cu
e − e0𝜙Cu

the terms 𝜇Cu
e and 𝜙Cu represent the chemical and electrostatic contributions

Note that the working electrode and the reference electrode are terminated with the same
metal (Cu). Therefore, the working electrode potential of the cell can be expressed as
U = 𝜙Cu − 𝜙Cu′
. (5.3)



想这样一个过程把一个正电荷从无限远处的真空移至物质**相内部**,真空中可能还有一些电场我们需要克服,这部分我们叫外电势(从无穷远到距表面约 $10^{-4}$ 厘米).然后我们需要穿过金属的表面,由于金属表面原子被截断,有部分电子溢出,这部分会贡献一个电势变化,我们称之为表面电势$\chi$. 所以最后整个过程需要做的功就是: $\phi = \psi + \chi$, 这个$\phi$叫做内电势 (Inner Potential / Galvani Potential).

Fermi Level, $E_F$我们可以定义为把一个金属最外层电子拿到无穷远真空需要做的功,又称之为金属电子的电化学势,等于电子的化学势+要电子穿过表面电势做的功.











还可以取溶液为参考零点

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-14-20-44-38-image.png)

###### **Fig. 1.** Sketch to put in evidence the components of the electrode potential. Work along path B is expressed by eqn.(10) in the text. Work from M(M₁) to infinity (path A) and work from M(M₁) to S (path C) define the two other *conceptually* possible single electrode potentials.

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-14-20-51-04-image.png)

https://www.koushare.com/video/details/65721?series_id=2064

我们弄清楚这些关系,我们就可以得到不同的表达电极电势的方程.

从而推导出PZC PZFC 

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-15-15-57-50-image.png)

### RHE SHE是什么意思? 内电势、外电势、表面电势与相间电势差

### SHE在实验上参比到哪里 在计算上参比到哪里 计算上的恒电势是什么意思?

### 电子溢出 PZC 如何测量PZC(最大熵,SFG)

计算化学

https://www.bilibili.com/video/BV1pK411k7iq/?spm_id_from=333.1387.favlist.content.click&vd_source=d39494fb97a12e0146dd0452b51b53e9

PZC PME    

https://advanced.onlinelibrary.wiley.com/doi/10.1002/adts.202500958

feliu PME

https://www.nature.com/articles/s41598-017-01295-1
