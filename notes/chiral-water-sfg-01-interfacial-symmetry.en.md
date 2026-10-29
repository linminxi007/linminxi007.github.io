---
title: 'Chiral SFG: Chapter 1. Macroscopic Symmetry: Why Can Chiral Interfaces Have Additional Second-Order Susceptibility Components?'
date: 2026-10-29
description: 'Chiral water SFG: interfacial symmetry, hydration structure, vibrational response, and connections to DNA electron transfer.'
categories:
  - Electron transfer
  - Spectroscopy
lang: en
translation-key: chiral-water-sfg-01-interfacial-symmetry
status: working
draft: false
format:
  html:
    toc: true
    toc-depth: 4
    html-math-method: mathjax
---

# Chapter 1. Macroscopic Symmetry: Why Can Chiral Interfaces Have Additional Second-Order Susceptibility Components?

**The question we want to answer:** The second-order susceptibility tensor $\chi_{IJK}^{(2)}$ has 27 Cartesian components. Which of them can actually be nonzero at an interface? More importantly, why does $\chi_{ZYX}^{(2)}$ tell us something special about macroscopic chirality?

Suppose we want to use sum-frequency generation (SFG) to study the water surrounding DNA or proteins. Before worrying about quantum mechanics or the vibrations of individual molecules, we have to answer a simpler question: **Does the symmetry of the interface even allow the optical signal we want to measure?**

Think of symmetry as a **gatekeeper**. A molecule may vibrate as strongly as it likes, but if the macroscopic symmetry forbids the corresponding nonlinear optical response, the signal cancels out to zero.

We can understand this without going through pages of rotation matrices. Using the symmetry arguments developed in Simpson's work on chiral nonlinear optics and discussed in Elsa Yan's 2014 *Chemical Reviews* review, we only need **two spatial transformations**.

#### 1. First, Define the Coordinates and the Second-Order Polarization

Picture a visible (VIS) pulse and an infrared (IR) pulse arriving at an interface. Together, they generate light at the sum frequency,

$$
\omega_{\mathrm{SFG}}=\omega_{\mathrm{VIS}}+\omega_{\mathrm{IR}}.
$$

Let us set up our laboratory axes:

- $Z$ points along the surface normal, perpendicular to the interface.
- $X$ lies along the interface and inside the optical plane of incidence, which is the $XZ$ plane.
- $Y$ also lies along the interface, but is perpendicular to the plane of incidence. It is the direction of $s$ polarization.

In the electric-dipole approximation, the second-order polarization is

$$
P_I^{(2)}(\omega_{\mathrm{SFG}})
=
\varepsilon_0\sum_{J,K\in\{X,Y,Z\}}
\chi_{IJK}^{(2)}E_J^{\mathrm{VIS}}E_K^{\mathrm{IR}}.
$$

The indices $I$, $J$, and $K$ describe the SFG, VIS, and IR field directions, respectively. Each can be $X$, $Y$, or $Z$, so there are $3\times3\times3=27$ possible tensor components.

*One useful side question: why do we see electric-dipole SFG at an interface rather than in isotropic bulk water?* Bulk water has inversion symmetry, $(X,Y,Z)\to(-X,-Y,-Z)$. A third-rank polar tensor changes sign under this operation:

$$
\chi_{IJK}^{(2)}\to(-1)^3\chi_{IJK}^{(2)}=-\chi_{IJK}^{(2)}.
$$

Since the bulk must remain unchanged by inversion, its electric-dipole second-order susceptibility is zero. At an air/water interface, however, the two sides are different. That broken inversion symmetry is what makes interfacial SFG possible.

#### 2. The First Test: In-Plane Rotational Symmetry ($C_\infty$)

At many liquid interfaces and biomembranes, molecules may have a preferred orientation along $Z$, but there is no preferred direction within the $XY$ plane. Rotate the interface around its normal and the macroscopic response does not change. We call this **in-plane rotational isotropy**, or $C_\infty$ symmetry.

So which of the 27 components can survive?

Instead of doing a full tensor transformation, try rotating the coordinates by $180^\circ$ around $Z$:

$$
Z\to+Z,\qquad X\to-X,\qquad Y\to-Y.
$$

Every $X$ or $Y$ index contributes a minus sign. For a component to survive, its sign after rotation must be the same as before. Therefore the total number of $X$ and $Y$ indices must be even—either zero or two. Equivalently, the number of $Z$ indices must be odd—either one or three.

That is our **count-the-indices rule**. It immediately eliminates 14 of the 27 components: those with no $Z$ or with two $Z$ indices. We are left with **13 components that may be nonzero**.

They fall into two groups.

**Group A: Seven components with paired horizontal directions.**

One component contains three $Z$ indices: $\chi_{ZZZ}$. Six more contain one $Z$ and two identical horizontal indices:

$$
\chi_{XXZ},\ \chi_{YYZ},\ \chi_{XZX},\ \chi_{YZY},\ \chi_{ZXX},\ \chi_{ZYY}.
$$

A $90^\circ$ rotation around $Z$ makes the $X$ and $Y$ directions equivalent. For example, $\chi_{XXZ}=\chi_{YYZ}$. The six components therefore form three equal pairs. Together with $\chi_{ZZZ}$, that gives **four independent coefficients**.

**Group B: Six components containing** $X$, $Y$, and $Z$ exactly once.

They are

$$
\chi_{XYZ},\ \chi_{YXZ},\ \chi_{ZXY},\ \chi_{ZYX},\ \chi_{XZY},\ \chi_{YZX}.
$$

Now rotate by $90^\circ$ about $Z$, with $X\to Y$, $Y\to-X$, and $Z\to Z$. This time the components are related by a minus sign:

$$
\chi_{XYZ}=-\chi_{YXZ},\qquad
\chi_{ZXY}=-\chi_{ZYX},\qquad
\chi_{XZY}=-\chi_{YZX}.
$$

These six components provide **three independent coefficients**.

Our first result is therefore simple: with $C_\infty$ symmetry alone, **13 of the original 27 Cartesian components are allowed**, but only **seven are independent**: four from Group A and three from Group B.

#### 3. The Second Test: Vertical Mirror Symmetry ($C_{\infty v}$)

Now compare two interfaces: ordinary water and a surface covered with chiral DNA. Both may be rotationally isotropic in the plane. What makes their symmetry different?

**A mirror.**

For an achiral interface, imagine placing a vertical mirror in the $XZ$ plane. The reflected structure looks the same as the original. In addition to $C_\infty$ rotational symmetry, the interface has a vertical mirror symmetry. Together, these form $C_{\infty v}$.

Under reflection in the $XZ$ plane,

$$
X\to+X,\qquad Z\to+Z,\qquad Y\to-Y.
$$

Only the direction perpendicular to the mirror, $Y$, changes sign. This means **we just need to count how many times** $Y$ appears.

In Group A, $Y$ appears either zero times or twice. The resulting factor is $(-1)^0=(-1)^2=+1$, so these seven components survive the mirror test.

But in Group B, each component contains exactly one $Y$. For example,

$$
\chi_{ZYX}^{(2)}
\xrightarrow{\text{reflection in }XZ}
-\chi_{ZYX}^{(2)}.
$$

If the interface has mirror symmetry, the reflected response must be identical to the original one. That requires

$$
\chi_{ZYX}^{(2)}=-\chi_{ZYX}^{(2)},
$$

which is only possible when $\chi_{ZYX}^{(2)}=0$.

Here is the result of the two symmetry tests:

| Interfacial symmetry | Physical picture | Allowed Cartesian components | Independent coefficients |
|:----------------|:----------------|:-----------------:|:-----------------:|
| **Achiral** $C_{\infty v}$ | Rotational isotropy and vertical mirror symmetry; e.g., an ordinary pure-water interface | **7** | **4** |
| **Chiral** $C_\infty$ | Rotational isotropy without vertical mirror symmetry; e.g., a macroscopically chiral DNA/protein hydration interface | **13** | **7** |

For an ordinary achiral interface,

$$
\chi_{ZYX}^{(2)}=0.
$$

For a macroscopically chiral interface without vertical mirror symmetry,

$$
\boxed{\chi_{ZYX}^{(2)}\ne0\quad\text{is allowed by symmetry}.}
$$

Notice the wording: symmetry **allows** a nonzero component; it does not guarantee that the measured signal will be strong or even detectable.

The sign also carries information. Replacing right-handed helices with their left-handed mirror images is equivalent to a mirror operation. With the same measurement convention, the chiral contribution reverses sign:

$$
\chi_{\mathrm{D}}^{(2)}=-\chi_{\mathrm{L}}^{(2)}.
$$

#### 4. But Water Itself Is Achiral. How Can Its Hydration Layer Be Chiral?

A single water molecule is not chiral. But water does not exist as isolated molecules inside a DNA hydration shell. Water molecules form hydrogen bonds with the DNA grooves or with a protein backbone. The biomolecule becomes a **chiral template**, organizing the surrounding water into a collective structure that no longer has mirror symmetry: a **supramolecular chiral hydration structure**.

Even if thousands of DNA–water complexes are randomly oriented within the interfacial $XY$ plane, their in-plane rotational symmetry can remain intact. Yet **turning a right-handed helix around does not make it left-handed**. Rotation cannot restore a missing mirror symmetry.

This is the physical connection between molecular hydration and a macroscopic chiral optical response: an achiral molecule such as water can be part of a chiral arrangement, allowing the $\chi_{ZYX}^{(2)}$ channel to appear.