---
title: 'Microscopic Symmetry of a Single O–H Bond: Why Can a Chiral Arrangement Still Give Zero SFG Signal?'
date: 2026-10-29
description: 'Chiral water SFG: interfacial symmetry, hydration structure, vibrational response, and connections to DNA electron transfer.'
categories:
  - Electron transfer
  - Spectroscopy
lang: en
translation-key: chiral-water-sfg-04-single-oh-symmetry
status: working
draft: false
format:
  html:
    toc: true
    toc-depth: 4
    html-math-method: mathjax
---

# Chapter 4. Microscopic Symmetry of a Single O–H Bond: Why Can a Chiral Arrangement Still Give Zero SFG Signal?

**The question we want to answer:** Chapter 1 tells us that macroscopic symmetry allows $\chi_{ZYX}^{(2)}$ to be nonzero. Chapter 3 shows how DNA can organize nearby water into a chiral helical structure. So why, when we treat the hydration layer as a collection of independent O–H oscillators, does the calculated chiral response turn out to be exactly zero?

This is one of the most interesting turning points in our discussion of chiral water SFG.

Over the first three chapters, everything seemed to point in the same direction. Macroscopic $C_\infty$ symmetry opened the door for $\chi_{ZYX}^{(2)}$. The psp polarization combination gave us a way to detect it. And the helical grooves of DNA seemed to arrange achiral water molecules into a chiral supramolecular structure, much like the bricks of a spiral staircase.

Now, as physical chemists, we naturally want to move from the macroscopic picture to a microscopic calculation. We take a pen and paper, calculate the molecular hyperpolarizability $\beta_{ZYX}^{(2)}$ of each O–H bond in the hydration layer, and add up the contributions. But after a few lines of straightforward algebra, we run into a surprising result: **the sum is exactly zero.**

The chirality is clearly present in the structure. So why can't this optical model see it? In this chapter, we will work through the answer in three simple algebraic steps, without introducing complicated group-theory notation.

## 4.1 From a Whole $\mathrm{H_2O}$ Molecule to One O–H Bond: The Cylindrical-Rod Model

To connect the macroscopic susceptibility $\chi_{ZYX}^{(2)}$ with individual water molecules, we first define two coordinate systems:

- **Laboratory coordinate system** $(X,Y,Z)$: This is the frame in which we observe the experiment. The $Z$ axis is normal to the interface, and the $XZ$ plane is the plane of incidence.
- **Local coordinate system** $(a,b,c)$ **of a single O–H bond**: This frame moves with the bond. Its principal axis $c$ points along the O–H bond, whose direction we describe with a unit vector $\mathbf{u}$.

A complete water molecule ($\mathrm{H_2O}$) has $C_{2v}$ symmetry and contains two O–H bonds separated by an angle of approximately $104.5^\circ$. But when building our first microscopic model, the simplest approach is to divide the problem into smaller pieces: **assume that each O–H bond vibrates independently, without interacting with the others.**

What does the stretching vibration of a single O–H bond look like optically? We can picture it as a thin, cylindrically symmetric rod pointing along $\mathbf{u}$.

1. **How does the IR dipole change?** When the O–H bond stretches or contracts along $\mathbf{u}$, we assume that the change in its dipole moment also points along the bond axis:

   $$
   \boldsymbol{\mu}'=\mu'\mathbf{u}
   \qquad
   (\text{so its }K\text{ component is }\mu'_K=\mu'u_K)
   $$

2. **How does the Raman polarizability change?** For a cylindrically symmetric rod, the polarizability derivative along the bond is $\alpha'_\parallel$, while the derivative perpendicular to the bond is $\alpha'_\perp$. In the laboratory frame $(X,Y,Z)$, we can write this cylindrically symmetric tensor as the sum of an isotropic part and an anisotropic part pointing along $\mathbf{u}$. The detailed tensor algebra is not essential for now, so we will use the result directly:

   $$
   \alpha'_{IJ}=a\delta_{IJ}+bu_Iu_J
   $$

   Here, $a=\alpha'_\perp$, and the anisotropy coefficient is

   $$
   b=\alpha'_\parallel-\alpha'_\perp.
   $$

   In physical terms, $b$ measures how differently the O–H bond responds to polarization **along** its axis compared with polarization **perpendicular** to it.

## 4.2 Calculating $\beta_{ZYX}^{(2)}$ for a Single O–H Bond: A Product of Three Direction Cosines

We now have the IR response $\mu'_K$ and the Raman response $\alpha'_{IJ}$ for one O–H bond. From Chapter 2, recall the microscopic relation: the SFG hyperpolarizability is proportional to the product of the Raman response (the first two indices, $I,J$) and the IR response (the third index, $K$):

$$
\beta_{IJK}^{(2)}\propto\alpha'_{IJ}\mu'_K.
$$

Let's substitute the chiral index combination we care about most: $(I,J,K)=(Z,Y,X)$.

Start with the Raman term $\alpha'_{ZY}$. Since the laboratory $Z$ and $Y$ axes are perpendicular, the Kronecker delta is $\delta_{ZY}=0$. The isotropic term $a\delta_{IJ}$ therefore makes no contribution to this tensor component. Only the directional part remains:

$$
\alpha'_{ZY}=bu_Zu_Y.
$$

Multiply this by the IR term $\mu'_X=\mu'u_X$, and the expression immediately reduces to

$$
\beta_{ZYX}^{(2)}\propto u_Zu_Yu_X.
$$

So, within this single-bond model, **the chiral hyperpolarizability component is simply proportional to the product of the O–H bond's projections onto the $Z$, $Y$, and $X$ axes.**

To make the angular dependence explicit, write the unit vector $\mathbf{u}$ in spherical coordinates. Let $\theta$ be the angle between the O–H bond and the surface normal $Z$ (the polar or tilt angle), and let $\phi$ be the angle between its projection onto the $XY$ plane and the $X$ axis (the azimuthal angle). Then

$$
\mathbf{u}=(\sin\theta\cos\phi,\ \sin\theta\sin\phi,\ \cos\theta).
$$

Substituting these three components into $u_Zu_Yu_X$ gives the response of a single independent O–H oscillator:

$$
\boxed{\beta_{ZYX}^{(2)}\propto\cos\theta\sin^2\theta\sin\phi\cos\phi}
$$

Look closely at this expression. It separates neatly into two factors: $\cos\theta\sin^2\theta$, which depends on the bond's tilt relative to the interface, and $\sin\phi\cos\phi$, which depends on its direction within the interfacial plane.

## 4.3 Why Does the Signal Vanish After Orientational Averaging?

Now imagine placing this O–H bond in a DNA hydration layer that is macroscopically isotropic within the interfacial plane—that is, a sample with $C_\infty$ symmetry.

A natural question is: *If the water molecules around DNA form a helix, and different O–H bonds point in different directions, why should adding all their contributions give zero?*

The key is to follow what happens to an **independent oscillator** under macroscopic orientational averaging. Because we have assumed that the O–H bonds respond independently, the total response is a simple sum of their individual responses. And because averaging is a linear operation, averaging the sum is equivalent to averaging each bond first and then adding the results.

Pick any O–H bond in the DNA hydration layer—for example, one particular bond in the minor groove. Suppose it has a tilt angle $\theta$ relative to the surface normal. As we discussed in Chapter 3, a real experimental spot can contain many DNA molecules with random orientations in the $XY$ plane. If we rotate the entire DNA molecule around $Z$, the bond's tilt angle $\theta$ stays the same, but its azimuthal angle $\phi$ sweeps uniformly through every direction from $0$ to $2\pi$, with probability density $p(\phi)=\frac{1}{2\pi}$.

So let's average over $\phi$:

$$
\left\langle\sin\phi\cos\phi\right\rangle
=\frac1{2\pi}\int_0^{2\pi}\sin\phi\cos\phi\,d\phi=0.
$$

In fact, we do not even need to evaluate the integral. We can use the same symmetry argument as in Chapter 1. Rotate the bond by $90^\circ$ about $Z$. Its horizontal projections $(u_X,u_Y)$ become $(-u_Y,u_X)$, so their product changes sign: $u_Yu_X\to-u_Yu_X$. Over a full rotation, contributions from the different quadrants cancel pairwise. The average must be zero.

Once the azimuthal factor averages to zero, it does not matter how complicated the distribution of the tilt-dependent factor $\cos\theta\sin^2\theta$ may be. Multiplying it by the vanishing azimuthal average still gives zero:

$$
\boxed{\left\langle\beta_{ZYX}^{(2)}\right\rangle_\phi=0}
$$

As long as the intrinsic response coefficients in this single-bond model ($\mu'$ and $b$) do not change with the overall laboratory azimuthal angle $\phi$, the result is the same for every bond. The first bond averages to zero. So does the second, and so does the $N$th. When we add their contributions, **the total chiral response in this model is zero.**

## 4.4 The DNA Hydration Layer Is Chiral. So Why Is the Independent-Bond Model Blind to It?

This is the central physical point of the chapter. We now have three statements that seem difficult to reconcile:

- DNA organizes nearby water into a chiral helical structure, as discussed in Chapter 3.
- Macroscopic $C_\infty$ symmetry allows $\chi_{ZYX}^{(2)}$ to be nonzero, as we saw in Chapter 1.
- Yet our model of independent, locally cylindrically symmetric O–H bonds gives zero.

**The problem is not that the DNA hydration layer has lost its chirality. The problem is that our independent-bond model is blind to that chirality.**

Look again at the response of a single bond:

$$
\beta_{ZYX}^{(2)}\propto u_Zu_Yu_X.
$$

Notice that all three direction cosines, $u_Z$, $u_Y$, and $u_X$, come from **the same O–H bond**, represented by the same unit vector $\mathbf{u}$.

Now think about the geometry of a single straight cylindrical rod in three-dimensional space. Can that rod, by itself, be left-handed or right-handed? No. Place it at any angle you like. You can always define a vertical mirror plane containing both the surface normal $Z$ and the rod $\mathbf{u}$. The rod lies in that plane and is unchanged by reflection across it.

An isolated rod has a tilt angle $\theta$ and an azimuthal angle $\phi$. **It has no internal degree of freedom describing a twist.**

DNA can arrange water molecules into a helix, but the chirality of that arrangement does not reside in one isolated O–H bond. It resides in the **relative positions and relative orientations of different O–H bonds**, including how one bond is twisted with respect to another.

What have we done by using the independent-bond model? We have required the IR interaction ($\mu'_X$) and the Raman interaction ($\alpha'_{ZY}$) to probe the same O–H bond. We read one bond, then move on and read the next bond independently.

That is like trying to determine whether a staircase is helical by removing one brick at a time and examining each brick in isolation. Every individual brick is achiral. And if we also rotate each brick around $Z$ and average over its orientations, we erase the directional information as well. We are left with zero, even though the original staircase had a definite handedness.

So what have we actually learned? **Not that chiral hydration water cannot produce SFG, but that our independent local-bond model has failed to encode the relative chiral geometry of the hydration structure into its optical response.**

$$
\boxed{\text{The independent local-bond model does not encode the relative chiral geometry of the hydration layer in its response}}
$$

## 4.6 What Have We Learned, and How Does This Lead to the Next Chapter?

We can summarize the argument in one sequence:

$$
\boxed{
\begin{gathered}
\text{DNA hydration has a chiral structure}\\
\Downarrow\\
\text{Treat each O–H bond as an independent cylindrical oscillator}\\
\Downarrow\\
\beta_{ZYX}^{(2)}\propto u_Zu_Yu_X\quad\text{(one bond's direction only)}\\
\Downarrow\\
\left\langle\beta_{ZYX}^{(2)}\right\rangle_\phi=0
\end{gathered}}
$$

Now we can see exactly what is missing. A single O–H bond cannot describe how two bonds are twisted relative to one another. To define a relative helical twist, we need at least two O–H bonds pointing in different directions, $\mathbf{u}_1$ and $\mathbf{u}_2$.

So here is the next question: **Can two O–H bonds participate in the same SFG optical process?**

Imagine that the IR interaction and the Raman interaction are no longer restricted to the same bond. Suppose bond 2 contributes to IR absorption, giving $u_{2X}$, while bond 1 contributes to Raman scattering, giving $u_{1Z}u_{1Y}$. The hyperpolarizability would then contain a cross-bond product, $u_{1Z}u_{1Y}u_{2X}$.

Could the relative twist between these two bonds survive macroscopic rotational averaging and become a measurable chiral SFG signal?

That is the central mechanism we will explore in Chapter 5: **vibrational coupling**.
