---
title: "Potential of Maximum Entropy(PME) and Potential of Zero Charge(PZC)"

date: 2026-09-15

description: "我一度觉得PME测量PZC的方法太酷了"

categories:
  - 动力学
  - 光谱

lang: zh-CN

translation-key: Potential of Maximum Entropy(PME) and Potential of Zero Charge(PZC)

status: working

draft: false
---

#PME是古早时代我们测PZC唯一的办法了

这篇也是我没时间写了...

这是一个启发性的实验,我们先介绍什么是PZC,然后在介绍PZC和表面水的关系,最后我们再介绍怎么测量它.

pzfc和pH的关系

<img title="" src="file:///C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-17-12-38-16-image.png" alt="" width="298" data-align="center">

所以我们先介绍一些定义

PZC PZFC PZTC

PZC (零电荷电势)：是指电极表面没有净电荷或过剩电荷时的电势。
PZFC (零自由电荷电势)：是指电极表面真正的过剩自由电荷密度为零的电势。自由电荷代表了界面两侧真正的电荷过剩量。PZFC对应的自由电荷是电极上的真实电子电荷，它是双电层界面电场的主要物理来源。水分子偶极子会与这个由自由电荷产生的电场发生直接的静电相互作用。所以人们主要关心这一项.
PZTC (零总电荷电势)：是指总表面电荷密度为零的电势。总电荷不仅包含表面的自由电荷，还包括参与吸附过程并跨越界面的电荷。

PME 最大熵 表面水分子处于最混乱的时候,我们姑且认为这就是PZC吧. 或者严格点我们可以说:在纯静电主导的双电层物理图像中，PME所处的位置应等同于PZFC。

总之PZC就是在一个"干净的"不带电表面时候的电极电势

而根据我们之前的文章<什么是电极电势>,我们可以得到不同的电极电势表达公式,也就是不同的PZC表达式,我在这里就不写了.

Trasatti先把PZC和金属的电子结构(功函数)联系在一起.

<img title="" src="file:///C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-15-15-57-50-image.png" alt="" data-align="center">

Trasatti 在1960年代,注意到金属的电化学性能与其本身电子结构之间的关联,他发现金属的功涵（WF）和零电荷电位(PZC)之间存在线性关联。在1971年的文章中，他提出一组著名的关系式：

PZC = WF – 4.61 – 0.666*(2.10-X)

对于除铂和钯族之外的过渡态金属，以及锌铝镓，X= 0.5*WF – 0.55

对于碱金属、碱土金属、sp金属以及铂和钯族金属， X = 0.5*WF-0.29

他筛选了一系列金属的WF和PZC数据，发现并不存在一个统一的规律，而是过渡金属和sp金属符合不同的规律。

他进一步去分析过渡金属和sp金属为什么符合不同的规律。他发现其中的奥秘是金属表面水分子极化。过渡金属对界面水分子有很强的化学吸附作用，而sp金属仅是通过静电作用调整界面水分子的取向。把sp金属上水分子的取向极化与金属元素的电负性关联起来。

Trasatti, S.. "The absolute electrode potential: an explanatory note (Recommendations 1986)" *Pure and Applied Chemistry*, vol. 58, no. 7, 1986, pp. 955-966. https://doi.org/10.1351/pac198658070955

http://www.cailiaoniu.com/?p=235685



再到后来人们把表面水的取向和PZC也关联在一起.提出了不同的模型.

Watts-Tobin / BDM 双态水模型：该经典模型假设界面水分子主要以氢端朝上和氢端朝下两种离散状态存在。水分子的净取向会在界面处产生一个偶极电势降，其翻转行为直接响应界面静电场的变化，构成了双电层电容中溶剂贡献的微观基础。

Huang 2016/2018 均场铂模型：该模型突破了纯静电极化的传统观念，引入了水分子重排与表面化学吸附偶极子的耦合。模型指出在高电势下，强烈的化学吸附物（如Pt-O偶极子）会产生反向电势降，局部逆转双电层的电场，迫使水分子重新取向，从而导致电极表面出现反常的非单调充电行为。

<img title="" src="https://acs.silverchair-cdn.com/acs/content_public/journal/jpccck/120/25/10.1021_acs.jpcc.6b03930/5/m_jp-2016-03930x_0001.png?Expires=1792719268&Signature=fB2-rJCTCi9W-gAHpwYJs6G3aLgGPToKBRJF5IjAj663GwdhWZEhF54kGDTsT7dKcDDfqt~fnoJZ5J4l5-eRE96SlmVzd3k7kEs3KXPc-PH9q1FAlT5tImuOGBOFv3491TyXh~IvCrhuQl8L3-Rwp9O5yWkG-Fk7ME54vtxr6jCQ6s6zMISg5yDmnCKrnM-eP2ysVk7Uk93W49WX45QDKZXmGZZuLi4Jm1~9IAjQC~OTp8cn10QrY4oh1Vs~xkgOZ5VwrdC~ImHbLNevpdIbr838BeN3Q7TqgOET-5yWPNxEJnNpmzmQllgsARci~aBDqc015YwbcQSPXcRJC4apuQ__&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA" alt="Figure 3. Refer to the image caption for details." data-align="center" width="284">

水分子的偶极矩 按物理学标准定义为从负电荷中心指向正电荷中心，也就是O−→H+

Le/Cheng 2020 AIMD 微观图像：第一性原理分子动力学模拟揭示，在Pt、Pd、Ag和Au等金属的界面处，单纯的水分子取向对表面外电势差的贡献其实可以忽略不计。真正在表面电势差中占据主导地位的，是水分子与金属表面发生化学吸附所引起的电子重新分布。

我们知道表面水的偶极朝向会使得从金属表面到溶液出现一个电势降,也就是表面水偶极排列会对电极电势的有一个贡献.

jun huang 在2023 JACS Au 直接给出了：

$\boxed{ E_{\mathrm{pzc,SHE}} = E_{\mathrm{pzc,SHE}}^0 + \underbrace{\frac{N_{\mathrm{ad}}\theta_w\mu_w}{\epsilon_{\mathrm{IHP}}}}_{\text{如果所有水完全定向，能产生多大的偶极电势}} \underbrace{\left[ \coth(\delta\tilde{\mu}) -\frac{1}{\delta\tilde{\mu}} \right]}_{\text{实际有多少净取向}} }$

也就是PZC=无净取向水时的基准 PZC+第一层水的净偶极电势​.



我们知道在PZC的时候,根准确说在PZFC的时候,由于电极表面没有净电荷,表面的第一层水的朝向也就杂乱无章,随机性最强,熵最大.

这时候我们向水和金属界面打一束激光,激光的能量转化为热形成一个水的小空泡.界面第一层水暂时跑走了,过段时间水再慢慢扩散回来,这个时候我们就可以测量电极电势或者电流的变化,由于在PZFC时候前后水偶极随机取向,对电极电势的贡献很少.所以我们测量电极电势或者电流发现不了什么变化.但是如果在远离PZFC的电极电势下,再打激光,比如电势比较负,比PZFC更负,所有水的H都朝下,导致了一个表面电势降(要去确定一下,可能说反了).这时候打一个激光,等水重新回来的过程中就会产生一个电极电势的变化或者电流的变化.我们就能区分什么时候我们测到了PZFC.

<img src="file:///C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-18-11-00-25-image.png" title="" alt="" data-align="center">

Laser-induced potential transients for Pt(111) in (0.1-x)M NaF + xM HClO4 at
mainly low applied potentials: D) pH=5.70 (6): a) 150mV, b) 500mV, c) 550mV, d) 600mV, e) 640mV, f) 650mV, g) 700mV and h) 750mV.

Study of the Pt (111)| electrolyte interface in the region close to neutral pH solutions by the laser induced temperature jump technique Feliu Electrochimica Acta 2016

通过这样的打散水再让它重新回到稳定的测量,我们可以得到这样一个图. 靠近0的$\Delta$E有一条平行与时间轴的线,表示前后电极电势的变化不大,也就是本来就是处于PZFC水就是混乱的,从混乱到混乱并没有给电极电势带来什么扰动.

3.第二个事情是PZFC和pH的关系.

https://pubs.acs.org/jpccck/article/125/9/5020/467069/The-Potential-of-Zero-Charge-and-the

. Juan Feliu  Study of the Pt (111)| electrolyte interface in the region
  close to neutral pH solutions by the laser induced temperature
  jump technique

. Juan Feliu https://www.nature.com/articles/s41598-017-01295-1





4.SFG测量PZC

 SFG测量表面电场,西湖大学王鸿飞和Northwestern University的Franz M. Geiger的杰作阿.

 我们自然也会想SFG测量表面pH,好像UCSD的熊伟老师正在搞. 



真的写不动了 先这样吧.
