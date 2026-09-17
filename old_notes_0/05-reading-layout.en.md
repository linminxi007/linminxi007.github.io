---
title: "Space for a scientific argument"
date: 2026-09-13
description: "From notation and derivations to connected files: a reading-layout example for long scientific notes."
categories: [版式样例]
lang: en
translation-key: reading-layout
status: working
featured: true
demo: true
---

## Start with the question {#question}

**The question may be complex. Reading it should not be.** This page is a layout demonstration, not a research document supplied by you. It contains no results from files that have not been uploaded. Use it to try paragraphs, equations, tables and links between files.

A long argument benefits from a clear sequence: state the question, define the notation and assumptions, then work through the derivation. **Clarity does not require thin type.** The body starts with larger, medium-weight text; headings and important statements retain a distinct hierarchy.

Use the large **A / small A** control at the upper right to adjust text size and weight independently. The contents panel on the left can be collapsed. The language buttons open a corresponding translated note, not merely a different navigation bar.[^translation]

> White space is not the absence of content. It gives each paragraph and each equation somewhere to settle.

## Keep the notation together {#notation}

The following **constructed-data example** is carried over from the previous website. Let $x_i,y_i\in\mathbb{R}$, let $\theta$ be a scalar, take $n\geq1$, and assume $\sum_{i=1}^{n}x_i^2>0$.

| Symbol | Meaning in this example | Assumptions to state |
|:---|:---|:---|
| $x_i$ | Input at index $i$ | A known real number |
| $y_i$ | Output at index $i$ | A known real number, not a research measurement |
| $\theta$ | Coefficient to estimate | No intercept in this example |
| $\mathcal L$ | Objective function | Used to demonstrate the layout of an argument |

Defining these conventions before the equations saves the reader from searching through earlier paragraphs. Future spectroscopy or electron-transfer notes can use this space to state units, approximations and notation. The website should not infer those conventions on your behalf.

## Give the derivation room {#derivation}

Define a one-parameter linear model with no intercept:

$$
\mathcal{L}(\theta)
=\frac{1}{n}\sum_{i=1}^{n}\left(y_i-\theta x_i\right)^2.
$$

Differentiate with respect to the parameter, retaining the intermediate step:

$$
\begin{aligned}
\frac{\mathrm d\mathcal{L}}{\mathrm d\theta}
&=\frac{1}{n}\sum_{i=1}^{n}2(y_i-\theta x_i)(-x_i)\\
&=-\frac{2}{n}\sum_{i=1}^{n}x_i y_i
+\frac{2\theta}{n}\sum_{i=1}^{n}x_i^2.
\end{aligned}
$$

Set the derivative to zero. Since the denominator is strictly positive, there is a unique stationary point. The second derivative is $\frac{2}{n}\sum_i x_i^2>0$, so the point is the global minimum. Each equality follows directly from expansion; the reasoning need not be hidden inside an accordion.

::: {.equation-highlight}
**Result for this example**

$$
\hat{\theta}=\frac{\sum_{i=1}^{n}x_i y_i}{\sum_{i=1}^{n}x_i^2}.
$$
:::

For the separate derivation, [open the result in another note](02-derivation.en.md#result). The large return button then brings you back to **your reading position in this file**, rather than simply to the homepage.

## Distinguish equations from prose {#equations}

Text size and weight can be adjusted independently. Mathematical symbols are not forced into the body text's bold weight, which could otherwise obscure distinctions between scalar and vector notation. The following are **typesetting test strings**, not an argument about a specific physical system:

$$
\mathbf{A}=\begin{pmatrix}a&b\\c&d\end{pmatrix},
\qquad
\langle\psi\mid\phi\rangle,
\qquad
\frac{\partial f}{\partial t}.
$$

Chemical notation can use upright element symbols, subscripts and superscripts:

$$
\mathrm{H_2O},\qquad \mathrm{Fe^{3+}},\qquad
\mathrm{D+A}\longrightarrow\mathrm{D^{+}+A^{-}}.
$$

**These symbols are included only to test their appearance.** Chemical-equation packages, custom commands and more complex spectroscopy notation must be checked against the actual documents when they arrive. This sample is not a guarantee that every command is supported.

Wide equations and tables scroll inside their own regions instead of widening the whole page. Horizontal scrolling within them does not trigger navigation between notes.

## Follow a file without losing the argument {#materials}

Files and prose remain connected by standard Markdown links. These are demonstration assets from the previous version of the site:

[Open the interactive HTML example](../files/response-surface.html)

[Inspect the corresponding LaTeX source](../files/objective.tex)

[Inspect the constructed CSV data](../files/example-data.csv)

Opening a file retains the common viewer and large return button. HTML scripts run inside a sandboxed frame. Navigation inside the attached file is not recorded as part of the outer note-reading trail.

These links also appear under “Connected files” on the left. Other notes that cite this page appear below the article. Collapsing the contents panel does not remove any relationships.

## Leave unfinished work unfinished {#working-notes}

A research note need not begin as a final manuscript. When adding documents, distinguish a **public working note** from an **unpublished draft**. The former can carry a revision-status label; the latter uses `draft: true` and is excluded from the public catalog and search index.

The site does not invent research conclusions or turn sample data into experimental measurements. No new research documents have been received, so topics such as electron transfer have not been populated with fictional entries.

[Read about organizing Markdown files](04-writing.qmd)

## Continue from here {#next}

Switch to **中** at the upper right to read this sample in Chinese, or enable the “Focus reading” switch in the sidebar. Its track becomes wood-colored when enabled. Navigation and contents are tucked away, while your reading settings remain unchanged.

Now visit [the main note's materials list](01-connected-notes.en.md#materials), then use the return button to check that your position in the long article is restored near where you left off.

[^translation]: This demonstration has a complete English counterpart. A future note without a translation will explicitly say that the English text is not yet available; the Chinese original will not be presented as an English version.
