---
title: "Vibrational Coupling: How Can the Relative Twist Between O–H Bonds Produce Chiral SFG?"
lang: en
format:
  html:
    toc: true
    toc-depth: 4
    html-math-method: mathjax
---

# Chapter 5. Vibrational Coupling: How Can the Relative Twist Between O–H Bonds Produce Chiral SFG?

**The question we want to answer:** In Chapter 4, we found that the response of an independent O–H bond vanishes exactly after macroscopic rotational averaging. What if we connect two O–H bonds through *vibrational coupling*? Could this bring back the chiral signal that was previously canceled out?

At the end of Chapter 4, we identified the problem with the independent-bond model. The chirality of a helical structure lies in the **relative twist between different O–H bonds**, but the independent-oscillator model looks at only one bond at a time. Once we average its azimuthal factor, $\langle\sin\phi\cos\phi\rangle$, over a full rotation, the result must be zero.

How can we get around this problem? The idea is straightforward: **we need two different O–H bonds to participate in the same SFG optical process.** One bond should contribute to the IR transition, while the other contributes to the visible-light/Raman process.

What microscopic mechanism could connect two otherwise independent chemical bonds and make them participate in the same process? The answer is **vibrational coupling**. In this chapter, we will follow the basic theoretical picture developed in a 2021 *Journal of Physical Chemistry B* study by the groups of Elsa Yan and Sharon Hammes-Schiffer. Using just two coupled O–H bonds, we will work through how this seemingly impossible chiral signal can appear.

---

## 5.1 From Two Independent Oscillators to Two Coupled Oscillators: Two Pendulums Connected by a Spring

We do not need to begin with a huge matrix describing hundreds or thousands of water molecules. Let's start with **two local O–H bonds** in the hydration layer. We call them bond 1 and bond 2, and use $q_1$ and $q_2$ for their local stretching coordinates.

- **Without coupling (the world of Chapter 4):** Picture two pendulums hanging on a wall, completely unaware of one another. Each oscillates on its own. The vibrational Hamiltonian is a diagonal matrix:

  $$
  H_0=\begin{pmatrix}\hbar\omega_1&0\\0&\hbar\omega_2\end{pmatrix}
  $$

  The off-diagonal elements in the upper-right and lower-left corners are zero. Whatever bond 1 does, bond 2 does not respond to it.

- **With vibrational coupling (the world of real hydration water):** In a single water molecule, two O–H bonds share the same oxygen atom. Bonds on neighboring water molecules can also interact through hydrogen bonding and dipolar electric fields. When bond 1 stretches or contracts, it can influence bond 2, almost as if an invisible spring connected them. In the Hamiltonian, this interaction appears as a nonzero **vibrational coupling energy** $J_{12}$ in the off-diagonal elements:

  $$
  \boxed{H_{\mathrm{vib}}=\begin{pmatrix}\hbar\omega_1&J_{12}\\J_{12}&\hbar\omega_2\end{pmatrix}}
  $$

  Here, $\omega_1$ and $\omega_2$ are the original local stretching frequencies of the two O–H bonds, and $J_{12}$ measures the strength of their vibrational coupling.

As soon as $J_{12}\ne0$, the two bonds can no longer be treated as completely independent oscillators. Their motions are connected.

---

## 5.2 Why Can IR and Raman Probe Different O–H Bonds Once They Are Coupled?

In quantum mechanics, once the Hamiltonian contains a nonzero off-diagonal coupling $J_{12}$, the system's true vibrational eigenmodes (normal modes), $Q_\nu$, are no longer simply $q_1$ or $q_2$. Instead, each normal mode is a collective vibration formed by mixing the two local bond motions:

$$
Q_\nu=c_{\nu1}q_1+c_{\nu2}q_2
$$

The coefficients $c_{\nu1}$ and $c_{\nu2}$ tell us how much of bond 1 and bond 2, respectively, is present in the collective mode $\nu$.

Once the vibrational modes are mixed, the IR dipole-moment derivative $\mu'_\nu$ and the Raman polarizability derivative $\alpha'_\nu$ of each collective mode also become combinations of the contributions from the two bonds:

$$
{\mu}_\nu'=c_{\nu1}{\mu}_1'+c_{\nu2}{\mu}_2'
$$

$$
{\alpha}_\nu'=c_{\nu1}{\alpha}_1'+c_{\nu2}{\alpha}_2'
$$

Now multiply the two expressions. What do we get when we expand the SFG response of the collective mode, $\alpha'_{\nu,IJ}\mu'_{\nu,K}$?

$$
\alpha'_{\nu,IJ}\mu'_{\nu,K}=\sum_{i,j\in\{1,2\}}c_{\nu i}c_{\nu j}\alpha'_{i,IJ}\mu'_{j,K}
$$

There are four terms in this sum, and they naturally fall into two groups:

$$
\boxed{\underbrace{i=j}_{\text{Same-bond terms}}\qquad\underbrace{i\ne j}_{\text{Cross-bond terms}}}
$$

1. **Same-bond terms** ($i=j$, such as $\alpha'_{1,IJ}\mu'_{1,K}$ and $\alpha'_{2,IJ}\mu'_{2,K}$): The IR and Raman responses still come from the same O–H bond. Chapter 4 has already told us what happens to these terms: for the $\chi_{ZYX}^{(2)}$ component, they vanish under macroscopic rotational averaging.

2. **Cross-bond terms** ($i\ne j$): These are the new contributions that become possible when the two bonds are coupled, so that $c_{\nu1}c_{\nu2}\ne0$. A representative term is

   $$
   \boxed{\alpha'_{1,IJ}\mu'_{2,K}}
   $$

   together with the corresponding term $\alpha'_{2,IJ}\mu'_{1,K}$.

This is the crucial difference. **Within the resonance of the same collective mode** $Q_\nu$, the IR transition can involve the dipole moment of bond 2, $\mu'_{2,K}$, while the Raman process involves the polarizability of bond 1, $\alpha'_{1,IJ}$.

---

## 5.3 How Can a Cross-Bond Term Detect the Relative Twist Between Two O–H Bonds?

Let's substitute the bond-direction expressions from Chapter 4 into the cross-bond term. For bond 1, we have $\alpha'_{1,ZY}\propto u_{1Z}u_{1Y}$; for bond 2, $\mu'_{2,X}\propto u_{2X}$. Can their product survive macroscopic rotational averaging?

The contribution of this cross-bond term to $\beta_{ZYX}^{(2)}$ is proportional to a product of direction cosines from **two different bonds**:

$$
\beta_{ZYX}^{(1,2)}\propto u_{1Z}u_{1Y}u_{2X}
$$

Look closely at the last two factors. The horizontal component $u_{1Y}$ comes from **bond 1** and is proportional to $\sin\phi_1$. Meanwhile, $u_{2X}$ comes from **bond 2** and is proportional to $\cos\phi_2$.

Suppose the two O–H bonds are held within the helical framework of the DNA hydration layer. How should we describe their azimuthal angles? Let $\Phi$ be the laboratory azimuthal angle of bond 1, and let bond 2 be rotated relative to bond 1 by a fixed **relative twist angle** $\Delta$:

$$
\phi_1=\Phi,\qquad\phi_2=\Phi+\Delta
$$

The two angles describe different things:

- $\Phi$ is the overall orientation of the DNA–hydration-layer complex in the laboratory plane. Because the sample is randomly oriented within the interfacial plane, $\Phi$ is uniformly distributed from $0$ to $2\pi$.
- $\Delta$ is the **relative azimuthal angle, or relative twist, between the two O–H bonds**. If they remain fixed within the same helical structure, rotating the entire DNA molecule does not change $\Delta$.

Now let's average over one full rotation of $\Phi$. We do not need any complicated mathematics. Just expand $\cos(\Phi+\Delta)$ using the familiar trigonometric identity:

$$
\begin{aligned}
\left\langle\sin\Phi\cos(\Phi+\Delta)\right\rangle_\Phi
&=\frac1{2\pi}\int_0^{2\pi}\sin\Phi\big(\cos\Phi\cos\Delta-\sin\Phi\sin\Delta\big)\,d\Phi\\[6pt]
&=\cos\Delta\underbrace{\frac1{2\pi}\int_0^{2\pi}\sin\Phi\cos\Phi\,d\Phi}_{=0\text{ (cancels, as in Chapter 4)}}
-\sin\Delta\underbrace{\frac1{2\pi}\int_0^{2\pi}\sin^2\Phi\,d\Phi}_{=1/2\text{ (the squared term is nonnegative)}}\\[6pt]
&=-\frac12\sin\Delta
\end{aligned}
$$

**Look at the $\sin^2\Phi$ term in the second line.** In Chapter 4, with only one bond, we had $\sin\Phi\cos\Phi$. The positive and negative contributions from different quadrants canceled exactly. But now the relative twist $\Delta$ introduces a new term, $\sin^2\Phi\sin\Delta$. No matter how far we rotate around $Z$, $\sin^2\Phi$ is never negative. It therefore does not cancel when we average over the full rotation. What remains is $-\frac12\sin\Delta$.

Putting the polar-angle factors back in, including $u_{1Z}=\cos\theta_1$, gives the rotationally averaged cross-bond term:

$$
\boxed{\left\langle u_{1Z}u_{1Y}u_{2X}\right\rangle_\Phi=-\frac12\cos\theta_1\sin\theta_1\sin\theta_2\sin\Delta}
$$

If you are familiar with the vector cross product, you may recognize another way to write this result. The factor $\sin\theta_1\sin\theta_2\sin(\phi_2-\phi_1)$ is exactly the $Z$ component of the cross product between the two unit vectors, $(\mathbf u_1\times\mathbf u_2)_Z$. Therefore,

$$
\boxed{\left\langle u_{1Z}u_{1Y}u_{2X}\right\rangle_\Phi=-\frac12u_{1Z}(\mathbf u_1\times\mathbf u_2)_Z}
$$

Put the results of Chapters 4 and 5 next to each other, and the physical difference becomes clear:

$$
\boxed{\begin{aligned}
\text{Independent single bond (Chapter 4):}\quad&\langle\sin\Phi\cos\Phi\rangle=0\\[4pt]
\text{Coupled cross-bond term (Chapter 5):}\quad&\langle\sin\Phi\cos(\Phi+\Delta)\rangle=-\frac12\sin\Delta
\end{aligned}}
$$

**The physical meaning is simple:** macroscopic rotational averaging removes the information about the overall orientation $\Phi$. But the cross-bond coupling allows the response to retain information about the **relative twist between two O–H bonds**, $\Delta$, encoded in the cross product $(\mathbf u_1\times\mathbf u_2)_Z$.

*A note on what this result does—and does not—prove:* The factor $-\frac12\sin\Delta$ shows that **one particular cross-bond term can survive rotational averaging**. To obtain the full macroscopic signal $\chi_{ZYX}^{(2)}(\omega)$, however, we still have to include the other cross-bond term, $\langle u_{2Z}u_{2Y}u_{1X}\rangle_\Phi$, the mode-dependent weights $c_{\nu1}c_{\nu2}$, and the thermal distribution of all molecular configurations. For example, coupling $J_{12}$ can split the two normal-mode frequencies, preventing contributions from different modes from canceling at the same frequency through $c_{11}c_{12}+c_{21}c_{22}=0$. So we should not simply write the total signal as $\chi_{ZYX}^{(2)}\propto\sin\Delta$. The more precise conclusion is that **vibrational coupling opens a cross-bond response channel that can encode the relative chiral geometry of two bonds in the optical signal**.

---

## 5.4 If Ordinary Water Also Has Vibrational Coupling, Why Doesn't It Produce Chiral SFG?

After deriving $-\frac12\sin\Delta$, another natural question comes up:

> Wait a moment. Ordinary pure water also has strong vibrational coupling $J_{12}$, both within individual water molecules and between neighboring molecules. Any two nearby O–H bonds can have a relative angle $\Delta$. So why don't we observe a chiral SFG response from an ordinary pure-water interface?

This question connects our microscopic result directly back to the **mirror symmetry** we discussed in Chapters 1 and 3.

The geometric factor that survives in the cross-bond term is $\sin\Delta=\sin(\phi_2-\phi_1)$. Now reflect the system in a vertical mirror plane, such as the $XZ$ plane. Every azimuthal angle changes sign, $\phi\to-\phi$. A relative counterclockwise twist $+\Delta$ between bonds 1 and 2 becomes a clockwise twist $-\Delta$ in the mirror image:

$$
\Delta\xrightarrow{\text{Mirror reflection}}-\Delta\implies\sin\Delta\longrightarrow-\sin\Delta
$$

So $\sin\Delta$, or equivalently $(\mathbf u_1\times\mathbf u_2)_Z$, is a **mirror-odd geometric quantity**: it changes sign under reflection.

- **At an ordinary achiral pure-water interface** ($C_{\infty v}$): Two coupled O–H bonds may happen to form a twist $+\Delta$ at a particular instant. But without a chiral template, the statistical distribution also contains the mirror-image configuration with twist $-\Delta$ at equal probability. When we average over the entire water network, their contributions cancel exactly:

  $$
  \boxed{\text{Vibrational coupling}+\text{Mirror-symmetric distribution}\rightarrow\text{Zero net chiral response}}
  $$

- **In a chiral DNA hydration layer** ($C_\infty$): The right-handed DNA double helix acts as a chiral template. It biases the water network so that twists $+\Delta$ and $-\Delta$ no longer occur with equal statistical weights. Once mirror symmetry is broken, the cross-bond contributions involving $-\frac12\sin\Delta$ need not cancel in the ensemble average. A net macroscopic $\chi_{ZYX}^{(2)}$ response can then appear.

We have now connected three pieces of the picture: the macroscopic symmetry of Chapter 1, the spatial transfer of chirality in Chapter 3, and the microscopic vibrational coupling developed here.

---

## 5.5 Intramolecular vs. Intermolecular Coupling: Two Kinds of Springs in the Hydration Network

A real DNA or protein hydration layer contains far more than two O–H bonds. Hundreds or thousands of bonds are linked through the hydrogen-bond network. If we generalize our two-oscillator model to many coupled oscillators, we arrive at the **vibrational exciton Hamiltonian**:

$$
\boxed{\hat H_{\mathrm{vib}}=\sum_i\hbar\omega_i b_i^\dagger b_i+\sum_{i\ne j}J_{ij}b_i^\dagger b_j}
$$

The first term describes the local vibrational energy of each O–H bond. The second describes the network of couplings between different bonds ($i\ne j$, using a consistent summation convention to avoid double counting).

In a hydration layer, we can divide the coupling elements $J_{ij}$ into two main categories, depending on the relationship between the bonds:

1. **Intramolecular coupling** ($J_{\mathrm{intra}}$): This occurs between the two O–H bonds **within the same** $\mathrm{H_2O}$ molecule. Because both bonds share an oxygen atom, their mechanical and electronic interactions can be strong, with coupling strengths on the order of tens of $\mathrm{cm}^{-1}$. These interactions mix the two local O–H stretches into the familiar **symmetric stretching** and **antisymmetric stretching** normal modes of water.

2. **Intermolecular coupling** ($J_{\mathrm{inter}}$): This occurs between O–H bonds on **different water molecules**, mainly through through-space transition-dipole interactions. It allows vibrational motion to extend beyond a single water molecule and become shared with neighboring molecules through the hydrogen-bond network, forming collective vibrations across molecules.

There is an important distinction we should make here:

$$
J_{ij}\ne E_{\mathrm{H-bond}}
$$

**The vibrational coupling strength $J_{ij}$ is not the same thing as the hydrogen-bond binding energy $E_{\mathrm{H-bond}}$.**

- The hydrogen-bond binding energy $E_{\mathrm{H-bond}}$ is the static thermodynamic energy associated with holding two water molecules together. A characteristic scale is $\sim20\ \mathrm{kJ/mol}$, corresponding to approximately $1600\ \mathrm{cm}^{-1}$.
- The vibrational coupling $J_{ij}$ is a dynamical matrix element describing how the two high-frequency stretching vibrations exchange excitation. Its scale is typically only a few to a few tens of $\mathrm{cm}^{-1}$.

Of course, hydrogen bonds still play a central role. Their strengths help determine the orientations of water molecules, shift the local stretching frequencies $\omega_i$ (often to lower frequencies), change the magnitude of transition dipoles $\mu'$, and indirectly influence the couplings $J_{ij}$. But **hydrogen-bond binding energy and vibrational coupling are different physical quantities, with different definitions and energy scales**.

---

## 5.6 How Did Yan and Collaborators Use Simulations in 2021 to Show That Coupling Is Essential?

A theoretical derivation is useful, but we also need to see how it compares with calculations and experiments. In 2021, Konstantinovsky, Perets, Yan, Hammes-Schiffer, and collaborators published a *Journal of Physical Chemistry B* study of the hydration layer around an antiparallel $\beta$-sheet peptide, $\mathrm{LK_7\beta}$.

Computer simulations give us a useful freedom that experiments do not: **we can keep the three-dimensional arrangement of water molecules in an MD trajectory unchanged while artificially switching the coupling elements $J_{ij}$ in the vibrational Hamiltonian on or off.** The study compared three computational settings:

| Computational setting | Physical question | Simulated spectral result |
|:---|:---|:---|
| **1. Turn off all coupling** ($J_{\mathrm{intra}}=0,\ J_{\mathrm{inter}}=0$) | Can a chiral arrangement of water molecules produce a signal if every O–H bond responds independently? | **The chiral signal vanishes.** Even when water has a chiral arrangement, the independent-bond model cannot read out the relative twist, consistent with the result of Chapter 4. |
| **2. Keep only intramolecular coupling** ($J_{\mathrm{intra}}\ne0,\ J_{\mathrm{inter}}=0$) | Can coupling between the two O–H bonds within a single water molecule produce a chiral response? | **A substantial chiral signal appears.** In a chiral hydration environment, coupling between the two bonds of one water molecule can already capture aspects of the local chiral geometry. |
| **3. Include both types of coupling** ($J_{\mathrm{intra}}\ne0,\ J_{\mathrm{inter}}\ne0$) | What does coupling between different water molecules add? | **The full experimental chiral spectral shape is reproduced.** Intermolecular coupling brings correlations between neighboring water molecules into the response, improving the spectral shape and relative intensities. |

This 2021 work helped establish a microscopic theoretical framework for chiral water SFG. A later theoretical study by the Yan and Hammes-Schiffer teams, published in February 2024 in *The Journal of Chemical Physics* (160, 055102), examined the mechanism in greater detail. For the model they studied, **intramolecular coupling—responsible for splitting the symmetric and antisymmetric stretching modes—dominates the basic positive–negative two-peak structure of the chiral O–H spectrum**, while intermolecular coupling further modifies the complete spectral line shape.

Why do the symmetric and antisymmetric stretches of the same water molecule produce two peaks with opposite signs? We will return to that question in Chapter 7.

---

## 5.7 Chapter Summary and the Question for Chapter 6

Combining Chapters 3, 4, and 5, we can now trace the microscopic path **from spatial chirality to an optical signal**:

$$
\boxed{\begin{gathered}
\text{DNA organizes nearby water into a chiral spatial structure (Chapter 3)}\\
\Downarrow\\
\text{With independent local O–H oscillators:}\ \left\langle\beta_{ZYX}^{(2)}\right\rangle_\phi=0\text{ (Chapter 4)}\\
\Downarrow\\
\text{Introduce O–H vibrational coupling }\left(J_{ij}\ne0\right)\\
\Downarrow\\
\text{Collective modes generate cross-bond IR–Raman terms }\left(\alpha'_{1,ZY}\mu'_{2,X}\right)\\
\Downarrow\\
\text{The relative twist }\Delta\text{ enters }\chi_{ZYX}^{(2)}\text{ through }-\frac12u_{1Z}(\mathbf u_1\times\mathbf u_2)_Z\\
\Downarrow\\
\text{A hydration layer without mirror symmetry can retain a net chiral response after averaging}
\end{gathered}}
$$

Now that we understand how vibrational coupling can make chiral hydration water visible to SFG, another question becomes unavoidable.

Water around DNA is arranged in layers. Some molecules belong to the **first hydration shell**, directly interacting with the minor groove, the major groove, or the phosphate backbone. Others lie farther away, in the second or third hydration shells. DNA's electrostatic field can orient water molecules beyond the first shell. **So why do Yan's experiments and simulations suggest that chiral SFG mainly detects the first hydration shell, almost as though it can selectively see the water closest to DNA while ignoring the more distant molecules? And within that first shell, what distinct roles do minor-groove water, major-groove water, and backbone water play?**

That is the question we will explore in Chapter 6.
