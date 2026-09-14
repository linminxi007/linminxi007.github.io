---
title: "Deriving an objective function"
date: 2026-09-12
description: "Give the equations their own page, so another note can link directly to a result."
categories: [数学推导]
lang: en
translation-key: 02-derivation
status: working
demo: true
---

## Notation and assumptions {#notation}

This is a demonstration of mathematical typesetting and cross-file anchors. Let $n\geq1$, $x_i,y_i\in\mathbb{R}$, and assume $\sum_{i=1}^{n}x_i^2>0$. The unknown parameter $\theta$ is a scalar.

For a one-parameter linear model with no intercept, define:

$$
\mathcal{L}(\theta)=\frac{1}{n}\sum_{i=1}^{n}(y_i-\theta x_i)^2.
$$

This page extends the [question note](01-connected-notes.en.md#example). The original question, data and discussion remain there; this page contains only the derivation.

## Differentiate with respect to the parameter {#derivation}

Differentiating term by term gives:

$$
\frac{\mathrm{d}\mathcal{L}}{\mathrm{d}\theta}
= -\frac{2}{n}\sum_{i=1}^{n}x_i(y_i-\theta x_i).
$$

Set the derivative to zero and collect the terms containing $\theta$:

$$
\theta\sum_{i=1}^{n}x_i^2
=\sum_{i=1}^{n}x_i y_i.
$$

The denominator is strictly positive by assumption, giving a unique stationary point. The positive second derivative makes this point the strict global minimum:

$$
\frac{\mathrm{d}^2\mathcal{L}}{\mathrm{d}\theta^2}
=\frac{2}{n}\sum_{i=1}^{n}x_i^2>0.
$$

## Result {#result}

The result is:

$$
\hat{\theta}
=\frac{\sum_{i=1}^{n}x_i y_i}{\sum_{i=1}^{n}x_i^2}.
$$

**This section has the stable identifier `#result`.** Another Markdown file can link directly here, instead of making the reader find the section from the top.

```markdown
[View the result](02-derivation.en.md#result)
```

[Adjust the parameter in the interactive HTML file](../files/response-surface.html) to explore this sample objective numerically. The CSV example uses $y_i=2x_i$, so its optimum is $2$. These are constructed data, not research measurements.

## Keep the source {#source}

The equations can also be kept in a separate file: [inspect objective.tex](../files/objective.tex). The viewer shows the source without requiring a complete TeX installation.

The default website build converts its inline mathematics to MathML. Complex LaTeX packages and complete `.tex` documents are different from equations embedded in a webpage and need separate checks.

## Next step {#next}

Visit [the main note's materials section](01-connected-notes.en.md#materials), or press the fixed return button to retrace your actual reading path and position. The first link goes to a predefined section; the second returns to where you came from.
