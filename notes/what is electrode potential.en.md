---
title: "What Is Electrode Potential?"

date: 2026-09-16

description: "The history of electrode potential is also a history of how we move from the metal electrode into the solution. When we measure electrode potential, what are we actually measuring? If you know electrochemistry, you know this is not a simple question."

categories:
  - Electrochemistry

lang: en

translation-key: electrode-potential

status: working

draft: false
---

# What Is Electrode Potential?

## Opening Summary

This note asks a question that looks simple but is actually connected to electronic structure, interfacial electrostatics, chemical potential, and reference systems: when we measure **electrode potential**, what are we actually measuring?

The main path starts from the electronic structure of a metal surface. It then moves to the metal-water interface and the electric double layer. From there, we use Trasatti's definition of the absolute electrode potential and ideas from computational chemistry to understand relative electrode potential, absolute electrode potential, SHE, PZC, and the reference problem for electrode potential in AIMD.

## From Electronic Structure to an Interface with Water

We will start from the electronic structure of the electrode, and then move to an interface with water.

This note is about a scientific question that looks very simple but is actually very deep:

What is electrode potential?

### Why "the potential difference between the metal and the solution" is not enough

You may think the answer is simple. Is it not just the potential difference between the metal and the solution?

But this idea is wrong.

Or, when we talk about the **absolute electrode potential**, you may think this is only a problem of choosing a reference point. We could choose vacuum or a hydrogen electrode as the reference, build a system with another electrode, and then see the potential of that electrode relative to the reference.

But different choices of reference can introduce physical quantities that cannot be calculated or measured directly.

So this is not a simple problem.

### From Frumkin and Trasatti to computational electrochemistry

But this simple question has actually been studied for a long time.

In electrochemistry, the story goes back to **A. N. Frumkin** at the Soviet Academy of Sciences, and later to **Sergio Trasatti** [6]. Today, people use computational chemistry to calculate electrode potentials and to understand how electrode potential affects electrochemistry and electrocatalysis. More recently, **SFG** spectroscopy has also been used to directly measure surface electric fields or the **PZC (potential of zero charge)**.

So this apparently simple question has been studied from around 1960 to 2021 — about 60 years.

### How I came to this question from the d-band center

At first, I was not interested in this question at all. It looked like a high school exam problem to me. It seemed simple and boring.

So how did I end up thinking about it?

I first became interested in Nørskov's **[d-band center](Newns-Anderson-Schmickler_math-cleaned-v2.md)**. We gave the full derivation in another note. [1]

The basic idea is that the position of the metal d-band center can be used to describe how strongly a molecule binds to a metal surface.

**But this does not mean that the metal d orbitals have the strongest interaction with the molecular orbitals. A molecule first interacts very strongly with the broad sp band of the metal. The sp bands of different transition metals, however, are very broad and quite similar. Their contribution to the adsorption energy is therefore almost the same from one metal to another. It behaves roughly like a constant.**

### Why the d-band center is no longer enough in electrochemistry

But when the d-band center enters electrochemistry, a larger problem appears.

In solution, molecules are surrounded by water. The interface naturally forms an **electric double layer**. So everything becomes less simple. The simple d-band-center picture gradually stops being enough in solution.

We therefore need to move from the electronic structure of a clean metal surface to the metal-solution interface.

## The Questions I Really Want to Ask

#### So how does the electric double layer form?

#### How is it related to the electronic structure of the metal surface?

#### If we apply the same electrode potential to different metals, how will their electric double-layer structures differ?

#### How do electrons move from the metal into the solvent? How does electron transfer happen? What does the solvent structure near the metal surface look like?

#### Can I use spectroscopy such as SFG or **SHS** to see the solvent structure, or even the reorganization energy?

#### How does this solvent structure affect electron transfer?

## Starting from the Absolute Electrode Potential

We will first introduce the absolute electrode potential from the views of Trasatti and computational chemistry, following *Atomic-Scale Modelling of Electrochemical Systems*, Jia-Bo Le and Jun Cheng, Chapter 5 [2].

First, we need to make one point clear.

The electrode potential that you measure is not simply the potential difference between the metal and the solution. It also contains a chemical contribution, that is, a Gibbs-energy difference.

Even with methods such as **AIMD**, computational electrochemistry still has difficulty knowing exactly what electrode potential a given calculation corresponds to.

We will now introduce electrode potential.

Many quantities appear in the derivation. I often forget their names after some time. So the main goal here is to understand their physical meaning, not to memorize every symbol.

# Theoretical Derivation of Electrode Potential and Absolute Electrode Potential

![](images/paste-28.png){width="409"}

In the following part, I combine the treatment of Jun Cheng, a researcher working on modern computational electrode potentials, with the treatment of Trasatti, one of the early researchers on electrode potential. I hope this makes the ideas easier to follow.

## 1. What Does a Voltmeter Actually Measure?

In the electrochemical system shown in Figure 1, the voltmeter is affected not only by the electrostatic field but also by chemical potential.

Therefore, the measured electrode potential is, in essence, the difference in the **electrochemical potential of electrons** in the two leads connected to the voltmeter [2]:

$$
U=
\frac{
\tilde{\mu}_e^{\mathrm{Cu}}
-
\tilde{\mu}_e^{\mathrm{Cu}'}
}{
-e_0
}
\tag{5.1}
$$

### The electrochemical potential of electrons contains chemical and electrostatic parts

Here, $\tilde{\mu}_e^{\mathrm{Cu}}$ and $\tilde{\mu}_e^{\mathrm{Cu}'}$ are the electrochemical potentials of electrons in the Cu wires connected to the working electrode and the reference electrode, respectively. The quantity $-e_0$ is the charge of one electron [2].

The electrochemical potential of electrons in the Cu wire contains a chemical part and an electrostatic part [2]:

$$
\tilde{\mu}_e^{\mathrm{Cu}}
=
\mu_e^{\mathrm{Cu}}
-
e_0\phi^{\mathrm{Cu}}
\tag{5.2}
$$

Here, $\mu_e^{\mathrm{Cu}}$ is the chemical potential of the electrons, while $\phi^{\mathrm{Cu}}$ is the **inner potential (Galvani potential)** of Cu.

Strictly speaking, the inner potential is the electrostatic work needed to move a unit positive charge from vacuum at infinity into the **bulk interior** of the metal.

### Using the same terminal metal cancels the chemical-potential contribution

The terminals connected to the voltmeter from the working electrode and the reference electrode are usually made of the same metal, such as Cu.

Therefore, the working-electrode potential of the cell can be simplified to the difference between the inner potentials of the two terminals [2]:

$$
U
=
\phi^{\mathrm{Cu}}
-
\phi^{\mathrm{Cu}'}
\tag{5.3}
$$

### Breaking the total potential difference into each interface

We can add and subtract the inner potentials of the different phases and expand Eq. (5.3) into the following form [2]:

$$
U
=
(\phi^{\mathrm{Cu}}-\phi^{M})
+
(\phi^{M}-\phi^{S})
+
(\phi^{S}-\phi^{\mathrm{Pt}})
+
(\phi^{\mathrm{Pt}}-\phi^{\mathrm{Cu}'})
\tag{5.4}
$$

Here, $\phi^{\mathrm{Pt}}$, $\phi^{S}$, and $\phi^{M}$ are the inner potentials of Pt in the **standard hydrogen electrode (SHE)**, the electrolyte solution $S$, and the working electrode $M$, respectively [2].

Because metal $M$ and the terminal Cu are in direct contact, they reach electronic thermodynamic equilibrium. Their Fermi levels become aligned:

$$
\tilde{\mu}_e^{M}
=
\tilde{\mu}_e^{\mathrm{Cu}}
\tag{5.5}
$$

### Rewriting the contact term using electronic equilibrium

Therefore, the first term on the right side of Eq. (5.4) can be rewritten as [2]:

$$
\phi^{\mathrm{Cu}}
-
\phi^{M}
=
\frac{1}{e_0}
\left(
\mu_e^{\mathrm{Cu}}
-
\mu_e^{M}
\right)
\tag{5.6}
$$

In the same way, the last term in Eq. (5.4) can be written as [2]:

$$
\phi^{\mathrm{Pt}}
-
\phi^{\mathrm{Cu}'}
=
\frac{1}{e_0}
\left(
\mu_e^{\mathrm{Pt}}
-
\mu_e^{\mathrm{Cu}'}
\right)
\tag{5.7}
$$

### A form that contains only properties of each single electrode

Substituting Eqs. (5.6) and (5.7) into Eq. (5.4), and rearranging the terms, the chemical potentials of the two Cu terminals cancel because the terminals are made of the same metal.

We then obtain:

$$
U
=
\left[
(\phi^M-\phi^S)
-
\frac{\mu_e^M}{e_0}
\right]
-
\left[
(\phi^{\mathrm{Pt}}-\phi^S)
-
\frac{\mu_e^{\mathrm{Pt}}}{e_0}
\right]
\tag{5.7b}
$$

------------------------------------------------------------------------

## 2. Introducing the Absolute Electrode Potential and the Constant $K$

### Reduced single-electrode potential

We now introduce the treatment given by Trasatti in the 1986 IUPAC report *THE ABSOLUTE ELECTRODE POTENTIAL: AN EXPLANATORY NOTE* [3].

Each term in square brackets in Eq. (5.7b) contains only properties of one electrode. It is therefore defined as the **reduced single-electrode potential**, $E^{\mathrm{M}}(r)$ [3]:

$$
E^{\mathrm{M}}(r)
=
(\phi^M-\phi^S)
-
\frac{\mu_e^M}{e_0}
\tag{5.7a}
$$

Note: on a molar scale, $e_0$ in the denominator is replaced by the Faraday constant $F$ [3].

### From the reduced single-electrode potential to the absolute electrode potential

The true absolute electrode potential, $E^{\mathrm{M}}(\mathrm{abs})$, can be related to the reduced single-electrode potential by introducing a reference constant $K$ [3]:

$$
E^{\mathrm{M}}(\mathrm{abs})
=
E^{\mathrm{M}}(r)
+
K
$$

### Physical meaning of the constant $K$

The physical meaning of the constant $K$ is this: it represents the chosen **absolute reference state** when we remove an electron from the system.

From the thermodynamic derivation, the general expression for $K$ is [3]:

$$
K
=
\phi^S
+
\frac{\tilde{\mu}_e^{\mathrm{ref}}}{F}
\tag{5.7d}
$$

Here, $\tilde{\mu}_e^{\mathrm{ref}}$ is the electrochemical potential of the electron in the chosen absolute reference state [3].

Different physical states can be chosen as the reference. Each choice gives a different physical meaning to $K$ [3].

![](images/paste-29.png){width="460"}

Using Figure 2, we can compare three different reference paths, or three different choices of $K$, and see how they affect the definition of a single-electrode potential.

## 3. Three Absolute Reference Paths

### 3.1 Path A: Move the electron to "vacuum at infinity"

- **Physical picture**: As shown by dashed Path A in Figure 2, the electron moves from inside the metal to vacuum infinitely far away from the system [3].
- **Calculation**: At infinity, the electron has no chemical interaction, so its chemical potential is taken as 0. The electrostatic potential is also defined as the absolute zero, $\psi = 0$. Therefore, the electrochemical potential of the reference state is $\tilde{\mu}_e^{\mathrm{ref}} = 0$ [3].

Putting this into the expression for $K$:

$$
K
=
\phi^S
+
\frac{0}{F}
=
\phi^S
$$

- **Conclusion**: If vacuum at infinity is chosen as the reference, $K$ is simply the inner potential of the solution, $\phi^S$ [3]. However, this does not match the usual measurement practice in surface-physics experiments [3].

### 3.2 Path C: Move the electron into the solution (a solvated electron)

- **Physical picture**: As shown by solid Path C in Figure 2, the electron moves directly from inside the metal into solution phase $S$ and becomes a solvated electron [3].

*Explanation of the label in Figure 2*: $\alpha_e^S$ is the **real potential** of the electron in solution. It is defined as the work needed to move one electron from vacuum just outside the solution surface into the bulk solution:

$$
\alpha_e^S
=
\mu_e^S
-
F\chi^S
$$

It describes how much work the solvent network does when it takes in an electron. In a physical sense, it is similar to a "negative work function" for the solution phase [3].

- **Calculation**: The reference state is now a solvated electron inside the solution. Its electrochemical potential in the bulk solution is:

$$
\tilde{\mu}_e^S
=
\mu_e^S
-
F\phi^S
$$

Putting this into the expression for $K$:

$$
K
=
\phi^S
+
\frac{\mu_e^S-F\phi^S}{F}
=
\frac{\mu_e^S}{F}
$$

- **Conclusion**: If the solvated electron is used as the reference, $K$ equals the chemical potential of the electron in solution divided by $F$ [3]. This value strongly depends on the solvent, so it is not universal [3].

### 3.3 Path B: Move the electron to "vacuum close to the solution surface" (strongly recommended by IUPAC)

- **Physical picture**: As shown by solid Path B in Figure 2, the electron is placed in the vacuum gap between the two phase surfaces [3].
- **Calculation**: In this state, the electron is in vacuum very close to the solution surface. It is not affected by the chemical environment inside the solution, so its chemical potential is 0. But it is still inside the electrostatic field produced by the macroscopic charge of the solution. This electrostatic potential is the **outer potential** of the solution, $\psi^S$ [3].

Therefore, the electrochemical potential of the reference state is:

$$
\tilde{\mu}_e^{\mathrm{ref}}
=
-F\psi^S
$$

Putting this into the expression for $K$:

$$
K
=
\phi^S
-
\psi^S
$$

From the electrostatic definition, the inner potential of a phase equals the outer potential plus the surface potential, or dipole potential:

$$
\phi^S
=
\psi^S
+
\chi^S
$$

Therefore:

$$
K
=
(\psi^S+\chi^S)
-
\psi^S
=
\chi^S
$$

- **Conclusion**: If vacuum just outside the solution surface is chosen as the reference, $K$ equals the surface potential of the pure solvent, $\chi^S$ [3].

## 4. Why Does Path B Have Direct Experimental Meaning?

With Path B, close to the interface in vacuum, the measurement can be divided into two steps that can be measured independently [3]:

1. **From inside the metal** $\rightarrow$ vacuum just outside the metal surface: the required energy is the **electron work function** of the metal, $\Phi^M$ [3].
2. **From vacuum just outside the metal surface** $\rightarrow$ vacuum just outside the solution surface: the only energy involved is the electrostatic potential difference between these two points, that is, the **outer-potential difference (contact potential difference)** $\Delta_S^M\psi$ [3].

### Combining the work function and the outer-potential difference

Combining these two steps gives a simple expression for the absolute electrode potential that contains only physical quantities [3]:

$$
E^M(\mathrm{abs})
=
\Phi^M
+
\Delta_S^M\psi
\tag{5.7m}
$$

*(Note: if the potential is written in volts, the work-function term is often written as* $W_e^M/e_0$ or $\Phi^M/e_0$) [2,3].

### At the PZC

At the potential of zero charge, or PZC, the absolute electrode potential becomes [2]:

$$
U_{\mathrm{PZC}}^{\mathrm{abs}}
=
\frac{\Phi^M}{e_0}
+
(\psi^M-\psi^S)
\tag{5.7n}
$$

------------------------------------------------------------------------

## 5. Connecting the Definition to the Standard Hydrogen Electrode (SHE)

### The equilibrium reaction in the SHE

As shown in Figure 1, if the reference electrode on the right side of the cell is the standard hydrogen electrode, SHE, the Pt electrode potential should be in electrochemical equilibrium with the following half reaction [2]:

If an RHE is used instead, the pH effect must be removed using the Nernst equation.

$$
\mathrm{
H^+(aq)
+
e^-(vac)
\rightarrow
\frac{1}{2}H_2(g)
}
\tag{5.7o}
$$

### Thermodynamic relation at equilibrium

Therefore, from equilibrium thermodynamics [2]:

$$
\phi^S
-
\phi^{\mathrm{Pt}}
=
\frac{1}{e_0}
\left(
\frac{1}{2}\mu_{\mathrm{H_2}}^{g,o}
-
\mu_{\mathrm{H^+}}^{S,o}
-
\mu_e^{\mathrm{Pt}}
\right)
\tag{5.8}
$$

Here, $\mu_{\mathrm{H^+}}^{S,o}$ and $\mu_{\mathrm{H_2}}^{g,o}$ are the standard chemical potentials of the solvated proton and hydrogen gas, respectively [2].

### General expression for electrode potential relative to SHE

Combining Eqs. (5.4), (5.6), (5.7), and (5.8), we obtain the **general expression for electrode potential relative to SHE** [2]:

$$
U
=
\frac{1}{e_0}
\left(
\frac{1}{2}\mu_{\mathrm{H_2}}^{g,o}
-
\mu_{\mathrm{H^+}}^{S,o}
-
\mu_e^{M}
\right)
+
(\phi^{M}-\phi^{S})
\tag{5.9}
$$

This is the microscopic thermodynamic meaning of the **relative electrode potential** measured in experiments.

------------------------------------------------------------------------

## 6. Summary Tables: Different Forms of Electrode Potential

### Considering only one electrode

This table considers only one electrode.

| **Reference State** | **Value of Constant K** | **Expanded Form of the Absolute Single-Electrode Potential EM(abs)** |
| --- | --- | --- |
| **1. Vacuum at infinity** | $\phi^S$ | $\phi^M - \frac{\mu_e^M}{F}$ |
| **2. Solvated state in the liquid phase** | $\frac{\mu_e^S}{F}$ | $\Delta_S^M\phi - \frac{\mu_e^M}{F} + \frac{\mu_e^S}{F}$ |
| **3. A point in vacuum close to the solution surface** | $\chi^S$ | $\frac{\Phi^M}{F} + \Delta_S^M\psi$ |

### Combining the electrodes into a cell

This table shows the corresponding quantities after the electrodes are combined into a cell.

| | | | |
| --- | --- | --- | --- |
| SHE reduced potential | Standard $\mathrm{H^+/H_2}$ equilibrium | $U_{\mathrm{SHE}}(r)=[\mu_{\mathrm{H^+}}^{S,o}-\tfrac12\mu_{\mathrm{H_2}}^{g,o}]/e_0$ | Reduced single-electrode potential of the SHE |
| SHE absolute potential | Path-B absolute reference | $U_{\mathrm{SHE}}^{\mathrm{abs}}\approx4.44\ \mathrm{V}$ at 298.15 K | Absolute electronic-energy position of the SHE relative to vacuum outside water |
| Working electrode vs SHE | SHE chosen as relative zero | $U^{\mathrm{SHE}}=U^M(r)-U_{\mathrm{SHE}}(r)=U^M(\mathrm{abs})-U_{\mathrm{SHE}}^{\mathrm{abs}}$ | Experimentally reported electrode potential on the SHE scale |
| Absolute PZC | $\sigma_M=0$ | $U_{\mathrm{PZC}}^{M,\mathrm{abs}}=[\Phi^M/e_0+\Delta_S^M\psi]_{\sigma_M=0}$ | Absolute electrode potential evaluated at zero excess surface charge |
| PZC vs SHE | $\sigma_M=0$, SHE reference | $U_{\mathrm{PZC}}^{\mathrm{SHE}}=U_{\mathrm{PZC}}^{M,\mathrm{abs}}-U_{\mathrm{SHE}}^{\mathrm{abs}}$ | PZC reported on the conventional SHE scale |

## 7. If You Want to Separate the Inner and Outer Potentials Further

If you want to understand the detailed definitions of inner potential, outer potential, and related quantities, you can ask AI about them. There is also a figure in the following video that can help [7].

Once these relations are clear, we can obtain different equations for electrode potential.

## 8. From Experimental References to Potential Calibration in AIMD

Jun Cheng from Xiamen University has two PRL papers that use AIMD to find and calculate the reference quantities discussed above, and then derive PZC and PZFC [4,5].

### Where is the SHE referenced in experiments, and where is it referenced in calculations? How do I know what electrode potential my AIMD simulation is actually at?

## 9. Next Step: Constant-Potential DFT

### What does constant potential mean in DFT calculations? This is another deep problem [8]

## References

[1] Nørskov, J. K.; Abild-Pedersen, F.; Studt, F.; Bligaard, T. “Density Functional Theory in Surface Chemistry and Catalysis.” *Proceedings of the National Academy of Sciences* **108** (3) (2011): 937–943. https://doi.org/10.1073/pnas.1006652108

[2] Le, J.-B.; Yang, X.-H.; Zhuang, Y.-B.; Wang, F.; Cheng, J. “Ab initio modeling of electrochemical interfaces and determination of electrode potentials.” In *Atomic-Scale Modelling of Electrochemical Systems*, Chapter 5, pp. 173–200. Wiley, 2021. https://doi.org/10.1002/9781119605652.ch5

[3] Trasatti, S. “The absolute electrode potential: an explanatory note (Recommendations 1986).” *Pure and Applied Chemistry* **58** (7) (1986): 955–966. https://doi.org/10.1351/pac198658070955

Trasatti, S. "The “absolute” electrode potential—the end of the story" Electrochimica Acta 1990 https://www.sciencedirect.com/science/article/abs/pii/001346869085069Y

[4] Cheng, J.; VandeVondele, J. “Calculation of Electrochemical Energy Levels in Water Using the Random Phase Approximation and a Double Hybrid Functional.” *Physical Review Letters* **116** (2016): 086402. https://doi.org/10.1103/PhysRevLett.116.086402

[5] Le, J.; Iannuzzi, M.; Cuesta, A.; Cheng, J. “Determining Potentials of Zero Charge of Metal Electrodes versus the Standard Hydrogen Electrode from Density-Functional-Theory-Based Molecular Dynamics.” *Physical Review Letters* **119** (2017): 016801. https://doi.org/10.1103/PhysRevLett.119.016801

[6] 材料牛. Sergio Trasatti 相关文章（原文提供链接）. http://www.cailiaoniu.com/?p=235685

[7] 蔻享学术视频（原文提供链接）. https://www.koushare.com/video/details/65721?series_id=2064

[8] Bilibili 视频：DFT计算上的恒电势（原文提供链接）. https://www.bilibili.com/video/BV1pK411k7iq/
