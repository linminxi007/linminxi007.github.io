---
title: "When Chiral Water SFG Meets DNA Electron Transfer and Self-Assembled Systems"
lang: en
format:
  html:
    toc: true
    toc-depth: 4
    html-math-method: mathjax
---

---

### 9.2 When Chiral Water SFG Meets DNA Electron Transfer and Self-Assembled Systems

In the first eight chapters, the chiral hydration layers we discussed were all in a **static state of thermodynamic equilibrium**. DNA simply sat at an interface while we measured the chiral arrangement and vibrational coupling of the water molecules around it.

But in real biological processes and molecular electronics, DNA is not just a stationary, insulating plastic rod. It can also act as a **biomolecular wire** that transports charge. This brings us to a much more intriguing question: **When an electron or hole moves along the DNA double helix, does the chiral hydration layer tucked inside its grooves simply watch from the sidelines, or does it actively participate? And could we use the chiral SFG probe** $\Delta\operatorname{Im}\chi_{ZYX}^{(2)}(\omega,t)$ **to actually watch chiral water change during electron transfer?**

---

#### 9.2.1 The Experimental Background: From Wasielewski's $\mathrm{D\text{-}DNA\text{-}A}$ Hairpins to Self-Assembled DNA and the CISS Effect

To understand this question, let's first look at two major experimental platforms researchers use to study charge transport through DNA.

1. **Photoinduced electron transfer in donor–DNA–acceptor ($\mathrm{D\text{-}DNA\text{-}A}$) systems**, represented by the work of Wasielewski, Lewis, Barton, and others.

   To measure how fast charge moves through DNA, **Michael R. Wasielewski** and Frederick D. Lewis at Northwestern University, among others, developed a clever kind of **molecular stopwatch**: synthetic DNA hairpins or double-stranded $\mathrm{D\text{-}DNA\text{-}A}$ constructs.

   They attach a photosensitive electron donor (**D**, or a hole donor), such as a stilbene derivative or perylene diimide (PDI), to one end of a DNA duplex with a precisely controlled sequence. An electron acceptor (**A**), or a guanine (**G**) site acting as a hole trap, is placed at the other end. During the experiment, a femtosecond laser pulse excites the donor D and initiates charge injection into the DNA base stack. Femtosecond/picosecond transient absorption spectroscopy is then used to follow the charge as it travels through DNA toward the acceptor A.

2. **Self-assembled DNA monolayers and chiral-induced spin selectivity (CISS)**, represented by the work of Naaman, Waldeck, and others.

   Another approach is to assemble densely packed DNA double helices upright on a solid substrate, such as a gold electrode or quartz, forming a **self-assembled DNA monolayer (SAM)**. Ron Naaman, David Waldeck, and others found something remarkable: when electrons pass through a monolayer of right-handed B-DNA, one spin orientation can be transmitted more readily than the other, producing spin polarizations of tens of percent. This is the well-known **chiral-induced spin selectivity (CISS)** effect.

   More importantly, an increasing body of experimental evidence suggests that the conductivity and spin-filtering efficiency of self-assembled DNA films depend strongly on the **degree of hydration (humidity) and the surrounding counterion environment**.

These two areas of research bring our attention back to the thin **first hydration shell** surrounding DNA.

---

#### 9.2.2 Two Main Mechanisms of DNA Electron Transfer: Tunneling vs. Slow Hopping

After more than two decades of debate and experimental tests, a common picture has emerged for charge transport along the DNA double helix: there are **two main mechanisms, and which one matters more depends strongly on the transport distance**.

- **Mechanism 1: One-step superexchange tunneling over short distances (Superexchange / Coherent Tunneling)**

  - **When does it apply?** When donor D and acceptor A are separated by only $1\text{–}3$ base pairs, corresponding to a distance of $<10\text{–}15\ \mathrm{\AA}$.
  - **Physical picture:** Through quantum tunneling, charge can move directly from D to A in one step, **without actually stopping on an intermediate DNA base**. This can be extremely fast, from femtoseconds to a few picoseconds. But the transfer rate falls exponentially with distance, $k_{\mathrm{ET}}\propto e^{-\beta R}$, so extending the bridge soon makes this pathway inefficient.

- **Mechanism 2: Thermally activated, slow hopping over medium and long distances (Slow Hopping — the main long-range mechanism)**

  - **When does it apply?** When the charge must travel across more than four base pairs, over distances from a few nanometers to tens of nanometers.

  - **Physical picture:** Instead of crossing the entire bridge in one jump, the charge **actually resides on intermediate DNA bases**. For example, a hole may localize on guanine, forming the radical cation $\mathrm{G^{\bullet+}}$, or form a localized polaron spread over several neighboring bases. The charge then moves through a series of thermally activated, incoherent hops, **like crossing a river by stepping from one stone to the next**:

    $$
    \begin{aligned}
    &\mathrm{D^*\text{-}G_1\text{-}G_2\text{-}A}\\
    &\longrightarrow \mathrm{D^{\bullet-}\text{-}G_1^{\bullet+}\text{-}G_2\text{-}A}\\
    &\longrightarrow \mathrm{D^{\bullet-}\text{-}G_1\text{-}G_2^{\bullet+}\text{-}A}\\
    &\longrightarrow \mathrm{D^{\bullet-}\text{-}G_1\text{-}G_2\text{-}A^{\bullet+}}
    \end{aligned}
    $$

  - **Time scales and the main physical feature:** In slow hopping, the overall rate decreases much more weakly with distance, and **the time scale for an individual hop is often discussed in the tens-of-picoseconds to nanoseconds range** ($\mathrm{10\ ps\text{-}ns}$). According to Marcus electron-transfer theory, whether the charge can hop from the first stepping stone ($\mathrm{G_1}$) to the next ($\mathrm{G_2}$) depends directly on the **solvent reorganization energy**, $\lambda_s$, and the thermal fluctuations of the surrounding water molecules and counterions as they adapt to the moving charge.

---

#### 9.2.3 The Central Question: Can We Observe Changes in Chiral Water During Slow Hopping Through $\Delta\operatorname{Im}\chi_{ZYX}^{(2)}(\omega,t)$?

Now we arrive at the question that matters most: **If charge moves along DNA through slow hopping, what happens to the chiral water around it? Could we use `psp` polarization to detect a nonzero** $\Delta\operatorname{Im}\chi_{ZYX}^{(2)}(\omega,t)$ **and actually watch this process?**

##### 1. Why Might Slow Hopping Offer Such a Good Opportunity to Observe Chiral Water? (A Natural Match of Time Scales)

Imagine that electron transfer happens through ultrafast tunneling in less than $100\ \mathrm{fs}$. The electron is gone almost immediately. The much heavier water molecules—their oxygen and hydrogen nuclei—have barely had time to turn. To a first approximation, the hydration structure looks almost **frozen** during the transfer.

**Slow hopping is a different story.**

- During slow hopping, a hole, such as $\mathrm{G^{\bullet+}}$, can actually **remain at one base site for tens to hundreds of picoseconds**, around $10\text{–}500\ \mathrm{ps}$.
- Meanwhile, molecular dynamics and time-resolved spectroscopy suggest that although bulk water can reorient rapidly, on the order of $\sim1\text{–}2\ \mathrm{ps}$, the hydrogen-bond rearrangement and orientational relaxation of the **chiral spine of hydration confined inside DNA's narrow minor groove** can occur on a slower time scale of roughly $10\text{–}50\ \mathrm{ps}$.

$$
\boxed{
\begin{gathered}
\text{Charge residence time during slow hopping }\left(10\text{–}500\ \mathrm{ps}\right)\\
\approx\\
\text{Structural relaxation time of minor-groove chiral water }\left(10\text{–}50\ \mathrm{ps}\right)
\end{gathered}
}
$$

**These two time scales overlap remarkably well. This means slow hopping and minor-groove chiral water must be strongly coupled dynamically!** A charge that remains on a base for this long has time to pull, polarize, and possibly twist the surrounding hydration water through a local electric field that can reach $\sim10^7\ \mathrm{V/cm}$. At the same time, fluctuations in the arrangement of minor-groove water can continually change the energy barrier for the hole to make its next hop.

##### 2. If We Measure $\Delta\operatorname{Im}\chi_{ZYX}^{(2)}(\omega,t)\ne0$, What Three Kinds of Physical Information Could the Spectrum Reveal?

If local charge and hydration water interact this strongly, a transient chiral SFG measurement during slow hopping could reveal their interaction through **three different features of the spectrum**:

| Change in $\Delta\operatorname{Im}\chi_{ZYX}^{(2)}(\omega,t)$ | Microscopic parameters (Chapters 4–7) | What it could tell us about slow hopping |
|:---|:---:|:---|
| **1. A shift in the O–H resonance frequency** (a transient redshift or blueshift) | $\omega_1(t),\ \omega_2(t)$ | **The electric field of a localized charge (vibrational Stark effect).** When a base becomes positively charged ($\mathrm{G^{\bullet+}}$), its local electric field polarizes nearby minor-groove water and changes the hydrogen-bond environment. The shift in the O–H resonance could act as a kind of **molecular voltmeter** for the charge. |
| **2. An increase, decrease, or sign reversal of the chiral peak amplitude** | $-\dfrac{1}{2}u_{1Z}(\mathbf{u}_1\times\mathbf{u}_2)_Z\propto\sin\Delta$; $\chi_{\mathrm{minor}}^{(2)}+\chi_{\mathrm{major}}^{(2)}+\chi_{\mathrm{backbone}}^{(2)}$ | **Twisting and reorganization of the chiral hydration spine.** A localized charge may reorient water molecules, changing the relative twist angle $\Delta$ between neighboring O–H bonds, or altering the balance between positive and negative contributions from minor-groove and backbone water. |
| **3. A change in the separation, width, or shape of the opposite-sign doublet** | $L_s(\omega)-L_a(\omega)$; $\Delta\omega_{as}=\sqrt{(\omega_1-\omega_2)^2+4J_{12}^2}$ | **Asymmetric forces on a water molecule and changes in vibrational coupling.** The electric field of a charged base can affect the two O–H bonds of minor-groove water differently. This may change their local frequency difference $|\omega_1-\omega_2|$ and coupling $J_{ij}$, thereby changing the splitting and cancellation of the positive and negative peaks. |

##### 3. Is This Experimentally Feasible? How Could We Actually Detect the Signal?

From the underlying physical picture, a nonzero $\Delta\operatorname{Im}\chi_{ZYX}^{(2)}(\omega,t)$ should in principle exist. But turning that possibility into a measurement brings us to a very real problem: **signal-to-noise ratio (SNR)**. We need an experiment designed carefully enough to reveal such a small change.

- **Where is the difficulty?**

  Suppose we use a relatively long DNA molecule, say 20 base pairs, and a femtosecond laser pulse excites only $1\%\text{–}5\%$ of the molecules into a slow-hopping process. At any given time $t$, a single moving hole may affect only the water near one or two base pairs—less than $10\%$ of the first hydration shell along the entire DNA molecule.

  This suggests that the transient difference signal, $\Delta\operatorname{Im}\chi_{ZYX}^{(2)}$, might be only **a few thousandths of the steady-state signal**, roughly $0.1\%\text{–}0.5\%$. Even that small change could be masked by slight laser-induced heating, which can produce an apparent vibrational frequency shift.

- **How could we design an experiment to capture this effect clearly?**

---

$$
\boxed{
\begin{gathered}
\text{Long-range charge transport in Wasielewski-type }\mathrm{D\text{-}DNA\text{-}A}\text{ systems and self-assembled DNA}\\
\longrightarrow\ \text{Predominantly slow hopping }\left(10\text{–}500\ \mathrm{ps}\right)\\
\Downarrow\\
\text{A natural match with minor-groove chiral-water relaxation }\left(10\text{–}50\ \mathrm{ps}\right),\\
\text{allowing strong local electric-field and hydrogen-bond coupling}\\
\Downarrow\\
\text{Possible signatures in }\Delta\operatorname{Im}\chi_{ZYX}^{(2)}(\omega,t):\\
\text{Stark shifts + redistribution of chiral amplitudes + reshaping of the }L_s-L_a\text{ doublet}\\
\Downarrow\\
\text{Short-bridge }\mathrm{D\text{-}DNA\text{-}A}\text{ with polarization across the whole groove, or}\\
\text{steady-state charge injection combined with ion/minor-groove molecular control}\\
\longrightarrow\ \text{a real chance to observe the effect directly in the laboratory}
\end{gathered}
}
$$
