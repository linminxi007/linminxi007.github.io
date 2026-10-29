---
title: 'Polarization Selection Rules in Chiral SFG: Why Did Yan Choose the ZYX Component?'
date: 2026-10-29
description: 'Chiral water SFG: interfacial symmetry, hydration structure, vibrational response, and connections to DNA electron transfer.'
categories:
  - Electron transfer
  - Spectroscopy
lang: en
translation-key: chiral-water-sfg-02-polarization-selection-rules
status: working
draft: false
format:
  html:
    toc: true
    toc-depth: 4
    html-math-method: mathjax
---

# Chapter 2. Polarization Selection Rules: Why Did Yan Choose $\chi_{ZYX}^{(2)}$?

**The question we want to answer:** If a macroscopically chiral interface ($C_\infty$) allows six tensor components with three different Cartesian indices, why do we focus on $\chi_{ZYX}^{(2)}$ in experiments on chiral hydration water?

In Chapter 1, we used a simple **count-the-indices rule** to understand how symmetry determines which tensor components can survive. Once vertical mirror symmetry is broken, an interface can have six additional chiral components, each containing $X$, $Y$, and $Z$ exactly once:

$$
\chi_{XYZ}^{(2)},\quad \chi_{YXZ}^{(2)},\quad
\chi_{ZXY}^{(2)},\quad \chi_{ZYX}^{(2)},\quad
\chi_{XZY}^{(2)},\quad \chi_{YZX}^{(2)}.
$$

But knowing that these components are *allowed by symmetry* does not yet tell us how to measure them. For an experimentalist, there are two practical questions:

1. How can we use the polarization of the laser beams to isolate these components from the much stronger achiral background?
2. Why does $\chi_{ZYX}^{(2)}$, rather than $\chi_{XYZ}^{(2)}$ or one of the others, turn out to be the main component used in Elsa Yan's chiral SFG measurements?

## 1. The Polarization Code: Why Are psp, spp, and pps Sensitive to Chirality?

In reflection SFG, each beam has two basic polarization options, defined relative to the plane of incidence ($XZ$):

- **$s$ polarization** (*senkrecht*, German for perpendicular): the electric field points along $Y$, perpendicular to the plane of incidence. It contributes only a $Y$ index.
- **$p$ polarization** (*parallel*): the electric field lies in the $XZ$ plane, so it has both a horizontal $X$ component (proportional to $\cos\beta$) and a normal $Z$ component (proportional to $\sin\beta$), where $\beta$ is the angle between the beam and the surface normal $Z$.

By convention, we write the three polarization letters in the order **outgoing SFG — incoming visible (VIS) — incoming infrared (IR)**. This is the same order as the indices $I$, $J$, and $K$ in $\chi_{IJK}^{(2)}$.

Now recall the result from Chapter 1. Each of the six chiral tensor components contains $X$, $Y$, and $Z$ exactly once. In particular, **$Y$ appears once**. In the seven achiral components, by contrast, $Y$ appears either zero times or twice.

Since only $s$-polarized light contributes a $Y$ field, we immediately get a remarkably simple polarization selection rule:

- **Achiral combinations:** $s$ appears zero or two times — **ssp, ppp, sps, pss**. These probe tensor components allowed under $C_{\infty v}$ symmetry.
- **Chirality-sensitive combinations:** $s$ appears exactly once — **psp, spp, pps**. These can probe the three-index chiral components allowed under $C_\infty$ symmetry.

## 2. Start with psp: From Electric-Field Projections to the First Symmetry Test

Let us take a closer look at **psp**, one of the most commonly used polarization combinations. Reading the letters in order:

- The first **p** (SFG) lies in the $XZ$ plane, giving an $X$ or $Z$ index.
- The second **s** (VIS) points along $Y$, giving a $Y$ index.
- The third **p** (IR) lies in the $XZ$ plane, again giving an $X$ or $Z$ index.

Combine the possible indices, $\{X,Z\}\times\{Y\}\times\{X,Z\}$, and we find $2\times1\times2=4$ possible tensor components:

$$
\chi_{XYX}^{(2)},\qquad \chi_{XYZ}^{(2)},\qquad
\chi_{ZYX}^{(2)},\qquad \chi_{ZYZ}^{(2)}.
$$

Now apply the **count-the-indices rule** from Chapter 1. Under $C_\infty$ symmetry, rotating the interface by $180^\circ$ around $Z$ must leave its response unchanged. That means a nonzero third-rank tensor component must contain an **odd number of $Z$ indices**: either one or three.

- **$\chi_{XYX}^{(2)}$:** It contains no $Z$ index. After a $180^\circ$ rotation, it changes sign. So it must be zero.
- **$\chi_{ZYZ}^{(2)}$:** It contains two $Z$ indices. It also changes sign under the same rotation, so it must be zero.

That leaves just two components. Under macroscopic $C_\infty$ symmetry, the psp geometry can contain only

$$
\chi_{XYZ}^{(2)}\quad\text{and}\quad\chi_{ZYX}^{(2)}.
$$

Both are chiral components with three different indices. But we are not finished yet.

## 3. Where Macroscopic Rotation Meets Microscopic Raman Physics: Why Does $\chi_{XYZ}^{(2)}=0$?

We now have two components left in psp: $\chi_{XYZ}^{(2)}$ and $\chi_{ZYX}^{(2)}$. From macroscopic group theory alone, both are allowed. **So why does $\chi_{XYZ}^{(2)}$ disappear in vibrational SFG?**

The answer comes from the microscopic mechanism of vibrational SFG.

To generate a vibrational SFG response, a molecular vibration must be both infrared active and Raman active. The IR interaction is associated with the vibrational transition dipole derivative $\mu'_K$, indexed by the third position $K$. The visible-to-SFG optical interaction is described by the Raman polarizability derivative $\alpha'_{IJ}$, associated with the first two indices $I$ and $J$.

The resulting macroscopic susceptibility contains their product:

$$
\chi_{IJK}^{(2)}(\omega_{\mathrm{SFG}})
\propto
\sum_\nu
\frac{\left\langle\alpha'_{\nu,IJ}\,\mu'_{\nu,K}\right\rangle}
{\omega_{\mathrm{IR}}-\omega_\nu+i\Gamma_\nu}.
$$

Pay attention to the **first two indices**, $I$ and $J$. They come from the Raman polarizability derivative $\alpha'_{IJ}$.

In many vibrational SFG measurements, the visible beam (for example, $800\ \mathrm{nm}$) and the generated SFG light (for example, $630\ \mathrm{nm}$) are far from the ultraviolet electronic absorption bands of water or the biomolecules of interest. Under the non-electronic-resonance Placzek approximation, the Raman tensor is real and symmetric:

$$
\alpha'_{IJ}=\alpha'_{JI}.
$$

At the macroscopic level, this means we can exchange the first two indices of the susceptibility without changing its value:

$$
\chi_{IJK}^{(2)}=\chi_{JIK}^{(2)}.
$$

Now let us see what happens when we combine this **first-two-indices symmetry** with the rotational symmetry we already derived.

### Part I. Why $\chi_{XYZ}^{(2)}$ Disappears

Look at $\chi_{XYZ}^{(2)}$. Its first two indices, $X$ and $Y$, both lie in the interfacial plane.

1. **Macroscopic $C_\infty$ rotation:** Rotate the system by $90^\circ$ around $Z$, so $(X,Y)\to(Y,-X)$. Exchanging the two in-plane directions introduces a minus sign:

   $$
   \chi_{XYZ}^{(2)}=-\chi_{YXZ}^{(2)}.
   $$

2. **Microscopic nonresonant Raman symmetry:** Since $\alpha'_{XY}=\alpha'_{YX}$, exchanging the first two indices must leave the susceptibility unchanged:

   $$
   \chi_{XYZ}^{(2)}=+\chi_{YXZ}^{(2)}.
   $$

The same pair of components is required to be **both equal and opposite**. The only possible solution is

$$
\boxed{\chi_{XYZ}^{(2)}=\chi_{YXZ}^{(2)}=0}.
$$

**A useful side result:** Consider a three-dimensionally isotropic chiral bulk liquid, such as a glucose solution. All three directions, $X$, $Y$, and $Z$, are equivalent. Its electric-dipole chiral second-order response is antisymmetric when any two indices are exchanged, and is therefore proportional to the fully antisymmetric tensor represented by $\chi_{XYZ}^{(2)}$.

If the nonresonant Raman symmetry forces $\chi_{XYZ}^{(2)}=0$, that bulk chiral vibrational SFG response vanishes as well. This is why, within these assumptions, chiral vibrational SFG retains its interface selectivity.

### Part II. Why $\chi_{ZYX}^{(2)}$ Survives

What makes $\chi_{ZYX}^{(2)}$ different? **Look at its first two indices: $Z$ and $Y$, not $X$ and $Y$.**

Exchanging those first two indices through the Raman symmetry gives

$$
\chi_{ZYX}^{(2)}=+\chi_{YZX}^{(2)}.
$$

But $C_\infty$ rotational symmetry only requires

$$
\chi_{ZYX}^{(2)}=-\chi_{ZXY}^{(2)},
$$

because exchanging the two in-plane directions $Y$ and $X$ introduces a minus sign. It does **not** forbid $\chi_{ZYX}^{(2)}=+\chi_{YZX}^{(2)}$.

So $\chi_{ZYX}^{(2)}$ survives both symmetry tests.

Once we set $\chi_{XYZ}^{(2)}=0$, the effective susceptibility for psp reduces to a single chiral tensor component:

$$
\boxed{\chi_{\mathrm{eff},psp}^{(2)}\propto F\,\chi_{ZYX}^{(2)}}.
$$

Here,

$$
F=L_{ZZ}(\omega_{\mathrm{SFG}})L_{YY}(\omega_{\mathrm{VIS}})L_{XX}(\omega_{\mathrm{IR}})
\sin\beta_{\mathrm{SFG}}\cos\beta_{\mathrm{IR}}
$$

collects the incidence and reflection geometry together with the Fresnel local-field factors at the interface.

## 4. If spp and pps Are Also Chirality-Sensitive, Why Does Yan Mostly Use psp?

Now that we understand $\alpha'_{IJ}=\alpha'_{JI}$, let us check all six chiral tensor components from Chapter 1.

We already know that $\chi_{XYZ}^{(2)}=\chi_{YXZ}^{(2)}=0$. The other four are related by equality or a minus sign:

$$
\chi_{ZYX}^{(2)}=\chi_{YZX}^{(2)}=-\chi_{ZXY}^{(2)}=-\chi_{XZY}^{(2)}.
$$

In other words, under the non-electronic-resonance approximation, the number of independent chiral tensor components drops from three to **just one**, which we can choose to represent by $\chi_{ZYX}^{(2)}$.

That raises another experimental question. The other two chirality-sensitive polarization combinations, **spp** (probing $\chi_{YZX}^{(2)}$) and **pps** (probing $\chi_{ZXY}^{(2)}$ and $\chi_{XZY}^{(2)}$), are not forbidden by symmetry. At the molecular level, they probe the same underlying chiral tensor response.

**So why do Yan's experiments tend to use psp?**

The answer has to do with how the tensor components are projected onto the actual optical fields, and with the practical design of the experiment.

### 4.1 Why Is pps Usually Ruled Out? Internal Cancellation and a Weak IR Field

For **pps** (p-SFG, p-VIS, s-IR), two tensor components contribute: $\chi_{ZXY}^{(2)}$ and $\chi_{XZY}^{(2)}$. Both are nonzero, and they have the same value.

But in reflection geometry, the horizontal projection of the outgoing p-polarized SFG field and that of the incoming p-polarized visible field have opposite signs. As a result, the two contributions **subtract** in the effective susceptibility:

$$
\begin{aligned}
\chi_{\mathrm{eff},pps}^{(2)}\propto {}&
L_{YY}(\omega_{\mathrm{IR}})\Big[
L_{ZZ}(\omega_{\mathrm{SFG}})L_{XX}(\omega_{\mathrm{VIS}})
\sin\beta_{\mathrm{SFG}}\cos\beta_{\mathrm{VIS}}\\
&-L_{XX}(\omega_{\mathrm{SFG}})L_{ZZ}(\omega_{\mathrm{VIS}})
\cos\beta_{\mathrm{SFG}}\sin\beta_{\mathrm{VIS}}
\Big]\chi_{ZYX}^{(2)}
\end{aligned}
$$

The visible and SFG wavelengths may be relatively close (for example, $800\ \mathrm{nm}$ and $630\ \mathrm{nm}$), so their refractive indices can also be similar. With the reflected SFG angle approximately matching the visible incidence angle, $\beta_{\mathrm{SFG}}\approx\beta_{\mathrm{VIS}}$, the two terms in brackets can become nearly equal in magnitude but opposite in sign.

The result is **strong destructive interference between the two contributions**. The source argument also notes that the interfacial field factor for s-polarized IR light, $L_{YY}(\omega_{\mathrm{IR}})$, may be weak at oblique incidence, further reducing the pps signal.

### 4.2 Why Might psp Be Preferred over spp?

The **spp** combination (probing $\chi_{YZX}^{(2)}$) does not have the same internal cancellation, so it can also measure chirality. Still, psp may offer some experimental advantages.

I do not yet understand the experimental setup well enough to give a confident explanation for why psp is preferred over spp. One possible reason is its compatibility with quartz-based heterodyne phase measurements:

- **Possible advantage for quartz heterodyne detection:** As we will discuss in Chapter 8, psp may allow the experiment to use a strong bulk tensor component of right-handed z-cut quartz as a local-oscillator reference field, enabling sensitive measurements of $\operatorname{Im}\chi_{ZYX}^{(2)}$.

We can summarize the three chirality-sensitive polarization combinations in one table:

| Chiral polarization | Components after the $C_\infty$ test | Effective response in the nonresonant limit ($\alpha'_{IJ}=\alpha'_{JI}$) | Experimental consequence and choice |
|:--|:--|:--|:--|
| **`pps`** | $\chi_{ZXY}^{(2)},\ \chi_{XZY}^{(2)}$ | Both remain nonzero and equal, but their geometric projections subtract in reflection ($\approx0$). | **Not preferred:** possible internal cancellation and a weak $s$-polarized IR local field. |
| **`spp`** | $\chi_{YZX}^{(2)},\ \cancel{\chi_{YXZ}^{(2)}}$ | $\chi_{YXZ}^{(2)}=0$; only $\chi_{YZX}^{(2)}=\chi_{ZYX}^{(2)}$ remains. | **Alternative:** requires changing the incoming visible polarization; Fresnel factors and grating efficiency may be somewhat less favorable. |
| **`psp`** | $\chi_{ZYX}^{(2)},\ \cancel{\chi_{XYZ}^{(2)}}$ | $\chi_{XYZ}^{(2)}=0$; only $\chi_{\mathrm{eff},psp}^{(2)}\propto F\chi_{ZYX}^{(2)}$ remains. | **Preferred in Yan's work:** no internal cancellation, the same input polarizations as `ssp`, and the strongest signal-to-noise performance in the comparison presented here. |

## 5. One More Question: When Can $\chi_{XYZ}^{(2)}$ Come Back?

Before moving on, there is a useful question to ask. We found that $\chi_{XYZ}^{(2)}=0$ because the Raman tensor is symmetric in the non-electronic-resonance limit:

$$
\alpha'_{IJ}=\alpha'_{JI}.
$$

**Does that mean $\chi_{XYZ}^{(2)}$ is always zero, in every experiment?**

Not necessarily.

If the visible or SFG frequency approaches an electronic absorption band, the nonresonant Placzek approximation may no longer apply. This can happen in electronically and vibrationally doubly resonant SFG, or in systems involving interfacial charge-transfer states or excitonic coupling.

Under such conditions, the Raman response need not remain symmetric: antisymmetric contributions can appear, so $\alpha'_{IJ}\ne\alpha'_{JI}$. The constraint that previously forced $\chi_{XYZ}^{(2)}=+\chi_{YXZ}^{(2)}$ is then lifted. As a result, **$\chi_{XYZ}^{(2)}$ may become nonzero under electronic resonance**:

$$
\boxed{\chi_{XYZ}^{(2)}\ne0\quad\text{can become possible under electronic resonance}.}
$$

This makes $\chi_{XYZ}^{(2)}$ an interesting possible probe of **chiral electronic coupling** in systems involving electron transfer, resonant chiral chromophores, or strong vibronic coupling.

For the DNA and protein hydration layers we will discuss next, however, the visible beam is assumed to be far from electronic resonance. Under that assumption, $\chi_{ZYX}^{(2)}$ remains the central chiral tensor component in our discussion.
