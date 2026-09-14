---
title: "From a note to its connected files"
date: 2026-09-13
description: "A reading demonstration connecting a question, a derivation and an interactive result."
categories: [研究记录]
lang: en
translation-key: 01-connected-notes
status: working
demo: true
---

## Keep a question {#question}

This is a **demonstration note**, not your research. It is written in ordinary Markdown to show how text, mathematical derivations, images and HTML files can be connected.

Not everything needs to live in a single document. This note records the question, a second note holds the derivation, and the interactive result remains a separate file. Each item has its own place and a path back to the source.

> Keep the argument in the note and the detail in connected files. You can step away without losing the thread.

[Scroll to this note's materials](#materials), or use the collapsible contents panel on the left. On a phone, ordinary vertical reading remains unchanged.

## A minimal example {#example}

Consider this sample objective function. It is used only to demonstrate mathematical layout and does not represent an experiment.

$$
\mathcal{L}(\theta)
=\frac{1}{n}\sum_{i=1}^{n}(y_i-\theta x_i)^2.
$$

Keep the definition here and put the detailed calculation in another Markdown file:

[Open another note at its derivation result](02-derivation.en.md#result).

The destination has a large **“Back to previous file”** button at the lower right. Press it to return to this page and its saved reading position. Resource loading or a changed window size may cause a small positional difference.

From the derivation, you can open an HTML or LaTeX file and then return one level at a time. The reading trail is kept in the current browser tab's session.

## Keep the context {#context}

A useful record explains why the analysis was needed, what went into it, and where its outputs live. Opening it again should not require reconstructing the connections from memory.

| Content | Location | How to read it |
|:---|:---|:---|
| Question | This Markdown file | Read directly |
| Derivation | `02-derivation.en.md` | Open a specific section |
| Interactive example | `files/response-surface.html` | Preview in the viewer |
| Equation source | `files/objective.tex` | View or download |
| Sample data | `files/example-data.csv` | View text or download |

These are ordinary relative paths. The files remain editable in VS Code; there is no specialized note database.

## Connected materials {#materials}

All the links below work. HTML, images and source files open in a shared viewer so the page's return control remains available.

[Open the interactive HTML example](../files/response-surface.html)

[Read the LaTeX source](../files/objective.tex)

[Read the sample CSV data](../files/example-data.csv)

[View the architectural reference image](../assets/courtyard-reference.png)

[Continue: organizing Markdown and relative links](04-writing.qmd)

[Try the long-form reading layout](05-reading-layout.en.md)

## Return to the question {#next}

Connected files should clarify the text, not create endless detours. After inspecting one, use the large return control before deciding where to go next.

At the bottom is a dedicated **reading gesture area**: swipe right there to go back, or left to open the first connected link in the article. Text, code and tables keep their normal scrolling behavior.

Replace these examples with your own `.md` files in `notes/`, then rebuild the site.
