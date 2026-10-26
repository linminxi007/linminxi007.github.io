---
title: "Can Exciting Interfacial Water Vibrations Speed Up Electron Transfer? — A Simple Model for SFG Experiments (Short Version)"
date: 2026-10-14
description: "Can we use light to excite molecular vibrations and thereby affect electron transfer? And can we actually observe this effect experimentally?"
categories: [电子转移与电化学, 光谱与界面]
lang: en
---

# Can Exciting Interfacial Water Vibrations Speed Up Electron Transfer?

*A simple model and order-of-magnitude estimates for SFG experiments*

![Introductory figure on interfacial spectroscopy](images/paste-43.png)

## The Question and Our Main Result

What happens if we use an infrared pump to excite the **free OH stretch (around 3700 cm⁻¹)** or the **HOH bending mode (around 1650 cm⁻¹)** at the air/water interface? Can we speed up electron transfer (ET) without directly exciting the electron donor or acceptor?

Our simple model shows that **this could work for some reactions, but only under certain conditions.** The instantaneous ET rate may increase significantly. However, water vibrations relax very quickly. As a result, the amount of additional ET product may be very small and could be difficult to detect directly with SFG.

These calculations are only **order-of-magnitude estimates**, not experimental evidence that light has already been used to control ET through interfacial water. Our model builds on theories of vibration-coupled ET and SFG studies of interfacial water. Previous experiments have shown that selectively exciting vibrations within donor–acceptor molecules can affect ET. However, this does not directly prove that exciting interfacial water can speed up ET. [1](https://doi.org/10.1126/science.1259995), [2](https://doi.org/10.1021/jp0133438), [3](https://doi.org/10.1063/1.473037), [7](https://doi.org/10.1021/jp105223j), [8](https://doi.org/10.1016/j.cplett.2012.05.054)

## 1. Three Key Relations from Our Model

**(1) Connecting HD-SFG to ET energy-gap fluctuations.** Suppose the same water vibration coordinate $q$ affects both the resonant SFG response and the donor–acceptor energy gap, $X=X_0-gq$. Under several simplifying assumptions, we obtain:

$$
\boxed{
K_{XX}^{\mathrm{sym}}(t)=\frac{\hbar g^2}{\pi}\int_0^\infty\!d\omega\;
\operatorname{Im}\!\left[\frac{\chi_{\mathrm{SFG}}^{(2),\mathrm{res}}(\omega)}{\mathcal N ab}\right]
\coth\!\left(\frac{\beta\hbar\omega}{2}\right)\cos(\omega t)
}
$$

$K_{XX}^{\mathrm{sym}}(t)$ describes **how solvent vibrations cause the ET energy gap to fluctuate over time**. It is not an ET rate directly measured by SFG. The physical picture is simple: a water vibration that produces an SFG signal can also keep “pushing” the energy of the ET center up and down.

$\chi_{\mathrm{SFG}}^{(2),\mathrm{res}}$ is the complex resonant response measured by HD-SFG. The parameter $a$ describes how the vibration changes the polarizability (**Raman activity**), while $b$ describes how it changes the dipole moment (**IR activity**). $\mathcal N$ includes factors related to molecular orientation at the interface and optical normalization. Finally, $g=-\partial X/\partial q$ tells us how strongly this vibration changes the ET energy gap.

For a single vibrational mode, we can also estimate its reorganization energy:

$$
\boxed{
\lambda_\alpha=\frac{g_\alpha^2}{\pi}\int_0^\infty\frac{d\omega}{\omega}\;
\operatorname{Im}\!\left[\frac{\chi_{\mathrm{SFG},\alpha}^{(2),\mathrm{res}}(\omega)}{\mathcal N_\alpha a_\alpha b_\alpha}\right],\qquad
S_\alpha=\frac{\lambda_\alpha}{\hbar\omega_\alpha}
}
$$

This means that the **vibrational frequencies, line shapes, and phase information** from SFG can help constrain an ET model. **However, SFG alone cannot give us** $g$. We still need AIMD calculations for the specific reaction or additional experimental information. [2](https://doi.org/10.1021/jp0133438), [4](https://doi.org/10.1146/annurev-physchem-040412-110110)

**(2) How infrared excitation can change the ET rate.** In the weak-electronic-coupling limit, we use the Fermi Golden Rule approximation:

$$
\boxed{
k_{\mathrm{ET}}^{\mathrm{pump}}=\frac{2|V_{if}|^2}{\hbar^2}
\operatorname{Re}\int_0^\infty C_{if}^{\mathrm{pump}}(t)\,dt
}
$$

For ET to occur, the surrounding solvent must help the initial and final states match in energy. When an infrared pump excites OH or HOH vibrations, it changes the populations of the solvent's vibrational quantum states. This changes which vibrational transitions are available for ET and how much each transition contributes. As a result, **ET may become faster or slower**, depending on the reaction.

We can separate the correlation function into three parts, each with a clear physical meaning:

$$
\boxed{
\begin{aligned}
C_{if}^{\mathrm{pump}}(t)
={}&
\underbrace{C_s(t)}_{\text{Low-frequency solvent bath}}\\
&\times
\prod_\alpha
\underbrace{C_\alpha^{(0)}(t)}_{\text{High-frequency quantum vibrations}}
\underbrace{F_\alpha^{\mathrm{pump}}(t)}_{\text{Pump-induced change}}
\end{aligned}
}
$$

Here, $V_{if}$ is the electronic coupling between donor and acceptor. The correlation function $C_{if}$ includes contributions from low-frequency, classical Gaussian solvent motions and independent high-frequency quantum vibrations. We assume that the pump moves a fraction $f_\alpha$ of each relevant vibrational mode from its ground state to $v=1$. Then we can write:

$$
\boxed{
\begin{aligned}
C_{if}^{\mathrm{pump}}(t)={}&
\exp\!\left[\frac{i(\Delta G^0+\lambda_s)t}{\hbar}-\frac{\lambda_s k_BTt^2}{\hbar^2}\right]\\
&\times\prod_{\alpha=\mathrm{OH,HOH}}
\exp\!\left[S_\alpha(e^{i\omega_\alpha t}-1)\right]
\left[1-2f_\alpha S_\alpha(1-\cos\omega_\alpha t)\right].
\end{aligned}
}
$$

Here, $\Delta G^0$ is the free-energy change of the ET reaction, and $\lambda_s$ is the low-frequency solvent reorganization energy. $S_\alpha$ describes how strongly a high-frequency vibration couples to the ET energy gap. $f_\alpha$ is the excited-state population of the **local vibrational modes involved in the ET reaction**. It is not the average fraction of excited OH groups across the entire interface.

In simple terms, the pump changes the initial vibrational populations. This changes the available Franck–Condon transition pathways and, in turn, the ET rate. [3](https://doi.org/10.1063/1.473037), [5](https://doi.org/10.1063/1.432142)

**(3) Why the pump–probe delay matters.** Suppose we excite only one mode, and its excited-state population decays with a lifetime $T_1$. Let $k_0$ and $k_1$ be the ET rates when that vibration starts in $v=0$ and $v=1$, respectively. Then:

$$
\boxed{
k_{\mathrm{ET}}(t_d)=k_0+f_0e^{-t_d/T_1}(k_1-k_0)
}
$$

If an experiment collects the ET signal over a time window from $0$ to $t$, the **average effective rate** is more relevant:

$$
\boxed{
\frac{\overline{k}(t)}{k_0}
=1+(R_0-1)\frac{T_1}{t}\left(1-e^{-t/T_1}\right),\qquad
R_0\equiv\frac{k_{\mathrm{ET}}(0)}{k_0}
}
$$

This is an **instantaneous-rate and population-kinetics approximation**. It is not an exact description of every ultrafast, nonequilibrium ET process. [6](https://doi.org/10.1038/s41467-024-45388-8)

## 2. How Much Can the ET Rate Increase?

We use a rough set of parameters: $T=300$ K, $\lambda_s=0.40$ eV, free OH at 3700 cm⁻¹, HOH bending at 1650 cm⁻¹, $S_{\mathrm{OH}}=0.03$, and $S_{\mathrm{HOH}}=0.10$. The corresponding reorganization energies for these two modes are about **0.0127 eV** and **0.0205 eV**, respectively.

These $S$ values and the assumed excited-state populations are **chosen for illustration**. They were not measured by SFG or calculated from AIMD.

First, consider **a single free OH mode at 3700 cm⁻¹**. We assume that the pump excites $f_0=1.5\%$ of the local OH modes involved in the reaction and that $T_1=0.84$ ps.

| ET reaction free energy | Instantaneous rate ratio after the pump, $R_0$ | Average rate ratio over the first 1 ps | Additional ET probability in the first 1 ps |
|:-----------------|-----------------:|-----------------:|-----------------:|
| $\Delta G^0=+0.1$ eV | 1.186 | 1.108 | $5.98\times10^{-6}$ |
| $\Delta G^0=+0.2$ eV | 2.687 | 1.986 | $3.81\times10^{-6}$ |

In the same model, when $\Delta G^0=-0.4$ eV, the initial rate ratio is about **0.999**. In other words, there is almost no enhancement. **Exciting a vibration is not a universal way to speed up ET.** Whether it works depends strongly on the reaction free energy, the coupling between vibrations and the electronic energy gap, and which vibrational transitions can help bridge the energy difference.

For example, when $\Delta G^0=+0.2$ eV, the predicted ET probability during the first 1 ps increases from $3.86\times10^{-6}$ to $7.67\times10^{-6}$. Although the average rate nearly doubles, this corresponds to only about **4 additional ET events per million molecules initially in the reactant state**.

Now consider another case with **two high-frequency modes, OH and HOH**. Suppose each mode has a 5% excited-state population and $\Delta G^0=+0.2$ eV. The predicted rate ratios are **5.205** when only OH is excited, **1.678** when only HOH is excited, and **5.886** when both are excited. This example assumes a stronger pump. We should not compare it directly with the 1.5% single-mode case as though they were the same experimental conditions.

## 3. Can SFG Detect This Increase?

**For the low-yield examples above, it would probably be very difficult to prove faster ET from the SFG changes caused by the products.** However, we cannot say that the effect is always impossible to detect. There are three main reasons:

1.  **Water vibrations relax quickly.** Time-resolved HD-VSFG studies suggest that free OH excitation can transfer to hydrogen-bonded OH through reorientation on a timescale of about 0.9 ps. Hydrogen-bonded OH vibrations relax in about 0.2–0.4 ps. This leaves only a short window for the pump to affect ET. [6](https://doi.org/10.1038/s41467-024-45388-8)
2.  **A large rate increase does not always mean many more products.** In the $+0.2$ eV example, the average rate nearly doubles, but the additional product fraction is only about $4\times10^{-6}$. The **vibrational response of water to the pump** may be much stronger than the SFG difference signal caused by the new ET products.
3.  **The signal also depends on spectral contrast.** Our kinetic model does not include the surface densities and orientations of reactants and products, their $\chi^{(2)}$ contrast, the pump-induced background, or instrument noise. We therefore cannot predict the actual detection limit from the additional ET probability alone.

A more practical way to test this idea is to **use TR-HD-SFG to follow the excitation, relaxation, and orientation changes of interfacial water**, while **transient absorption (TA) or another product-sensitive method tracks the ET products and electronic-state dynamics**. The experiment should compare an OH-resonant pump with an off-resonant pump. It should also rule out direct excitation of the solute and effects from pump-induced heating.

## 4. What Kind of System Should We Look For?

The best system is not necessarily the one with the strongest SFG peak. Instead, we should look for a donor–acceptor system where **the reaction center is close to the excited water vibrations**, the coupling $g$ between those vibrations and the ET energy gap is strong enough, and vibration-assisted pathways can significantly increase the ET rate. The reaction should also produce enough ET products within a sub-picosecond window, with spectral features that can be clearly distinguished.

The main value of this model is that it connects **the vibrational information from HD-SFG** with the ET parameters $\lambda_\alpha$ and $S_\alpha$. It also gives us an order-of-magnitude estimate that we can test experimentally: **exciting interfacial OH vibrations could, in theory, speed up certain ET reactions. But to actually observe the effect, we need strong enough vibrational–electronic coupling, a high enough product yield, and a clear enough spectral contrast.**

## References (Selected from the Original Draft)

1.  Delor, M. *et al.* Toward control of electron transfer in donor-acceptor molecules by bond-specific infrared excitation. *Science* **2014**, *346*, 1492–1495. [DOI](https://doi.org/10.1126/science.1259995).
2.  Morita, A.; Hynes, J. T. A theoretical analysis of the sum frequency generation spectrum of the water surface. II. Time-dependent approach. *J. Phys. Chem. B* **2002**, *106*, 673–685. [DOI](https://doi.org/10.1021/jp0133438).
3.  Ando, K. Quantum energy gap law of outer-sphere electron transfer reactions: A molecular dynamics study on aqueous solution. *J. Chem. Phys.* **1997**, *106*, 116–126. [DOI](https://doi.org/10.1063/1.473037).
4.  Shen, Y. R. Phase-sensitive sum-frequency spectroscopy. *Annu. Rev. Phys. Chem.* **2013**, *64*, 129–150. [DOI](https://doi.org/10.1146/annurev-physchem-040412-110110).
5.  Jortner, J. Temperature dependent activation energy for electron transfer between biological molecules. *J. Chem. Phys.* **1976**, *64*, 4860–4867. [DOI](https://doi.org/10.1063/1.432142).
6.  Sung, W.; Inoue, K.; Nihonyanagi, S.; Tahara, T. Unified picture of vibrational relaxation of OH stretch at the air/water interface. *Nat. Commun.* **2024**, *15*, 1258. [DOI](https://doi.org/10.1038/s41467-024-45388-8).
7.  Rao, Y.; Turro, N. J.; Eisenthal, K. B. Solvation Dynamics at the Air/Water Interface with Time-Resolved Sum-Frequency Generation. J. Phys. Chem. C 2010, 114, 17703–17708. [DOI](https://doi.org/10.1021/jp1052367).
8.  Rao, Y.; Xu, M.; Jockusch, S.; Turro, N. J.; Eisenthal, K. B. Dynamics of Excited State Electron Transfer at a Liquid Interface Using Time-Resolved Sum Frequency Generation. Chem. Phys. Lett. 2012, 544, 1–6. [DOI](https://doi.org/10.1016/j.cplett.2012.05.054).