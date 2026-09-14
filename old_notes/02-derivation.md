---
title: "一个目标函数的推导"
date: 2026-09-12
description: "把公式独立成页，让其他笔记直接链接到某一个结论。"
categories: [数学推导]
demo: true
lang: zh-CN
status: working
translation-key: 02-derivation
---

## 符号与假设 {#notation}

这是数学排版与跨文档定位的演示。设 $n\geq1$，$x_i,y_i\in\mathbb{R}$，并假设 $\sum_{i=1}^{n}x_i^2>0$。参数 $\theta$ 是待确定的标量。

定义一个不带截距的一元线性模型，目标函数为：

$$
\mathcal{L}(\theta)=\frac{1}{n}\sum_{i=1}^{n}(y_i-\theta x_i)^2.
$$

本文从[问题记录](01-connected-notes.md#example)延伸而来。原始问题、数据与讨论保持在那篇笔记里，这里只处理推导。

## 对参数求导 {#derivation}

逐项求导得到：

$$
\frac{\mathrm{d}\mathcal{L}}{\mathrm{d}\theta}
= -\frac{2}{n}\sum_{i=1}^{n}x_i(y_i-\theta x_i).
$$

令导数为零，并将含有 $\theta$ 的项移到一侧：

$$
\theta\sum_{i=1}^{n}x_i^2
=\sum_{i=1}^{n}x_i y_i.
$$

由假设，分母严格大于零，因此可以求得唯一的驻点。二阶导数为正，所以这个驻点同时也是严格的全局最小值点。

$$
\frac{\mathrm{d}^2\mathcal{L}}{\mathrm{d}\theta^2}
=\frac{2}{n}\sum_{i=1}^{n}x_i^2>0.
$$

## 结论 {#result}

最终得到：

$$
\hat{\theta}
=\frac{\sum_{i=1}^{n}x_i y_i}{\sum_{i=1}^{n}x_i^2}.
$$

**你现在看到的这个章节有固定标识 `#result`。** 其他 Markdown 可以直接链接到这里，而不是总让读者从文章顶部重新找。

```markdown
[查看推导结论](02-derivation.md#result)
```

[在交互式 HTML 中调整参数](../files/response-surface.html)，可以查看示例目标函数的数值变化。示例 CSV 中取 $y_i=2x_i$，所以该示例的最优参数为 $2$；这只是构造数据，不是科研测量。

## 保留源码 {#source}

公式也可以保留成独立文件：[查看 objective.tex](../files/objective.tex)。文件阅读器显示源码，不要求你额外安装完整 TeX 环境。

网页正文中的数学公式在构建时转成 MathML。现代浏览器直接排版这些数学元素，不需要运行 Python。复杂的 LaTeX 宏包与完整 `.tex` 文档，不等同于网页内的数学公式。

## 下一步 {#next}

回到[主笔记的关联资料](01-connected-notes.md#materials)，或点击固定的大按钮，返回你实际跳转前的文件和阅读位置。这两种链接的区别是：前者去一个固定章节，后者沿着你的阅读路径返回。
