---
title: "The Seventh Starling and Scaling Law"

date: 2026-09-14

description: "我曾经一直拿它和大语言模型中的scaling law还有水的H bond network比较."

categories:
  - 动力学

lang: zh-CN

translation-key: The Seventh Starling and Scaling Law

status: working

draft: false
---

#The Seventh Starling and Scale-free

哈哈,你可能问我,你个搞化学的为什么到处看?

我的回答是: 难道你不好奇吗? 

这次我们看看来Scale-free和scaling Law. 我先说一下,我对这两个不太理解,想给我后续的H bond和水溶液Long range interaction引入一个角度.

没时间写了...





Scale-free correlations in starling flocks [引用]https://www.pnas.org/doi/10.1073/pnas.1005766107, 这里有一个视频https://www.carmin.tv/en/video/the-seventh-starling-the-wonders-of-collective-animal-behaviour

他们用3D相机捕捉空中的椋鸟获取他们的速度和方向(图1A的B),如何把其中一只鸟的的速度大小和方向和他们的邻居比较,看看有没有什么相关性.他们发现在某个鸟群规模下,椋鸟并不是和固定半径内的所有鸟互动，而是大约跟固定数量的邻居——约 7 只(图中是11只)——发生 topological interaction。随后他们尝试了不同鸟群规模的数据,发现了一条**线性关系**,鸟群的规模越大,每一只鸟能影响的距离越远. 

也就是local interaction，能变成 global correlation. 那神经网络里面的神经元通过attention也算是local interaction吗?

当然了,这是在活性动物系统,在H Bond网络中也可能出现吗?或者说我加入离子或者在特定温度下,能不能让H Bond也出现某种scale-free correlation.SHS的CVS分析能不能帮助我做到这一点?如果真的找到了这么长程的相互作用,我想试试在这样的长程相互作用下发生电子转移反应或者自组装和没那么长程相互作用的溶剂有什么区别?

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-15-09-14-04-image.png)

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-15-09-13-41-image.png)



我曾经一直拿它和神经网络里的scaling law[引用]Kaplan, J., et al. (2020). Scaling Laws for Neural Language Models. arXiv:2001.08361[引用] Chinchilla 2022

![](C:/Users/linqiao/AppData/Roaming/marktext/images/2026-09-17-10-53-06-image.png)

这张图可以总结为算力,数据,参数量越大损失越低,当然了现在随着MoE,强化学习,后训练,持续学习的出现,这些关系有一些不同. 

这是LLM中scaling law的大致研究历史.

| 论文                               | 核心问题                      | 最重要结论                                                         |
| -------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Hestness et al. 2017             | 深度学习整体有没有可预测的规模规律？        | **有。误差随数据/模型规模呈近似幂律下降**                                       |
| Kaplan et al. 2020               | 语言模型的参数、数据、算力如何影响 loss？   | **Loss 对参数 N、数据 D、计算 C 都近似遵循 power law**                      |
| Hoffmann et al. 2022, Chinchilla | 固定算力下，应该把算力花在参数还是数据上？     | **Kaplan 太偏向增大模型；参数量和训练 token 应近似同比例增长**                      |
| Wei et al. 2022                  | 如果 loss 平滑下降，为什么某些能力突然出现？ | **某些 downstream ability 看起来存在 threshold / emergence，而不是平滑增长** |
