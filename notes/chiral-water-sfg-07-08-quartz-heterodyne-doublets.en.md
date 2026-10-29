---
title: 'From Quartz Heterodyne Detection to Opposite-Sign Doublets: Measuring and Understanding Chiral Water SFG'
date: 2026-10-29
description: 'Chiral water SFG: interfacial symmetry, hydration structure, vibrational response, and connections to DNA electron transfer.'
categories:
  - Electron transfer
  - Spectroscopy
lang: en
translation-key: chiral-water-sfg-07-08-quartz-heterodyne-doublets
status: working
draft: false
format:
  html:
    toc: true
    toc-depth: 4
    html-math-method: mathjax
---

# Chapter 7 (Combining the Original Chapters 7 and 8). From Quartz Heterodyne Detection to Opposite-Sign Doublets: How Can We Measure and Understand $\operatorname{Im}\chi_{ZYX}^{(2)}(\omega)$ of Chiral Water?

**The question we want to answer:** An ordinary optical detector measures intensity, $I\propto|\chi^{(2)}|^2$, which loses the sign of the susceptibility. How can we use right-handed quartz to extract the imaginary part of the very weak chiral water response, $\operatorname{Im}\chi_{ZYX}^{(2)}(\omega)$? And once we have a spectrum with positive and negative signs, why do two O–H stretching modes of the same water molecule appear as an **opposite-sign doublet**, with one positive peak and one negative peak?

Over the first six chapters, we worked our way from macroscopic symmetry to microscopic vibrational coupling in the first hydration shell. But before we can connect that picture to an experimental spectrum, we need to cross a gap between theory and measurement.

In Chapter 6, we said that the chiral water responses from different DNA grooves could partially cancel because they have opposite signs. We are also about to discuss why two vibrational modes can give a positive and a negative peak. **But with an ordinary SFG intensity measurement, how would we even know which peak is positive and which one is negative?**

The reason is simple. A CCD camera or photomultiplier measures light intensity (photon counts), not the sign of an optical field. The intensity is proportional to the **squared magnitude** of the complex susceptibility:

$$
I_{\mathrm{SFG}}(\omega)
\propto
\left|\chi_{ZYX}^{(2)}(\omega)\right|^2
$$

Once we take the squared magnitude, $+A$ and $-A$ both give the same $|A|^2$. This creates two serious problems:

1. **We lose the phase information.** An intensity spectrum alone cannot tell us whether the hydration responses of right-handed D-DNA and left-handed L-DNA have opposite signs. It also cannot tell us whether two nearby O–H resonances contribute with the same sign or form an opposite-sign doublet.
2. **A weak chiral signal becomes even harder to detect.** Suppose the chiral hydration-water field amplitude $E_s$ is only $10^{-2}$ of a reference achiral field. In a direct intensity measurement, its squared contribution scales as $|E_s|^2\sim10^{-4}$, making it very difficult to distinguish from the detector background.

To recover the sign and make a weak signal easier to detect, Elsa Yan used a clever approach that is also widely used in SFG spectroscopy: **phase-resolved (heterodyne) chiral SFG based on right-handed $z$-cut $\alpha$-quartz**.

We will follow three steps: **first, measure $\operatorname{Im}\chi_{ZYX}^{(2)}$; second, understand the opposite-sign doublet; and finally, establish that the signal really comes from water.** That will connect the microscopic theory to the experiment.

---

## Part I. Quartz Heterodyne Detection: How Can We Turn a Very Weak Chiral Response into a Signed $\operatorname{Im}\chi_{ZYX}^{(2)}$ Spectrum?

### 7.1 Why Use Right-Handed $z$-Cut $\alpha$-Quartz as the Substrate?

If we want to preserve the sign of the sample field $E_s$, we need **optical interference**. The idea is to find a reference light field with a known amplitude and stable phase—a **local oscillator (LO)**—and let it interfere with the chiral field $E_s$ before both reach the detector.

But where should that reference field come from?

We could bring in a separate laser beam and use it for interference. The difficulty is that even a path-length fluctuation of a few hundred nanometers, about half an optical wavelength, could reverse the interference phase. Keeping everything stable would be challenging.

Yan's solution was to generate the reference field right where it was needed: **place the DNA or protein solution directly on a single-crystal substrate of right-handed $z$-cut $\alpha$-quartz.**

Why quartz? There are three reasons.

1. **It provides a strong local oscillator.** $\alpha$-Quartz belongs to the chiral $D_3$ crystal point group and lacks inversion symmetry. When visible and IR light illuminate it, the **bulk crystal** generates a strong, nonresonant SFG field $E_q$, which is nearly flat across the IR vibrational region of interest.
2. **The reference and sample signals share nearly the same optical path.** The hydration layer sits directly on the quartz surface and is only a few nanometers thick. The quartz reference field $E_q$ and sample field $E_s$ are generated close together and travel along essentially the same optical path. This makes their relative phase much more stable against external vibrations.
3. **The bulk reference has a natural $90^\circ$ phase shift in this geometry.** The sample response comes from a two-dimensional interface, while the quartz field includes coherent contributions integrated through a three-dimensional bulk crystal. The phase-mismatch factor, written here as $1/(-i|\Delta k_z|)$, introduces a $90^\circ$ shift in the appropriate phase convention. We can therefore represent the quartz reference field using an extra factor of $i$.

### 7.2 The Quartz $\boldsymbol{+Y/-Y}$ Rotation Trick: Why Does Subtracting Two Measurements Reveal $\operatorname{Im}\chi^{(2)}$?

Once we have a quartz local oscillator $iE_q$, how do we isolate the imaginary part of the sample field, $\operatorname{Im}(E_s)$?

The key is a difference between **the symmetry of the crystal** and **the symmetry of the hydration layer**.

For chiral SFG in `psp` polarization, Yan uses two crystallographic azimuths with strong quartz bulk-reference responses. We call them the $+Y$ and $-Y$ orientations. They are separated by a **$180^\circ$ rotation of the quartz and sample around the surface normal $Z$**.

Now recall our symmetry argument from Chapter 1. What happens to $E_s$ and $E_q$ when we rotate the entire sample stage by $180^\circ$ around $Z$?

- **For the chiral hydration layer ($E_s$):** The macroscopic hydration layer is rotationally isotropic within the interfacial plane, with $C_\infty$ symmetry. As we established in Chapter 1, rotating such a sample around $Z$ does not change its macroscopic $\chi_{ZYX}^{(2)}$. The sample field therefore stays the same: $E_s\rightarrow+E_s$.
- **For the single-crystal quartz ($E_q$):** Quartz has $D_3$ crystal symmetry, rather than continuous in-plane rotational symmetry. In the `psp` configuration described here, the relevant bulk reference involves the fully in-plane tensor component $\chi_{XYX}^{(2)}$. All three indices are horizontal. Under a $180^\circ$ rotation about $Z$, each horizontal component changes sign, giving $(-1)^3=-1$. The quartz reference field therefore reverses sign: $+iE_q\rightarrow-iE_q$.

**The sample field stays the same, while the quartz field changes sign.** That is exactly what we need.

At the two quartz orientations, the total fields arriving at the detector are

$$
E_+ = E_s + iE_q
$$

$$
E_- = E_s - iE_q
$$

Write the complex sample field as $E_s=\operatorname{Re}(E_s)+i\operatorname{Im}(E_s)$. The two measured intensities, $I_\pm=|E_\pm|^2$, become

$$
\begin{aligned}
I_{+Y}
&=\left|\operatorname{Re}(E_s)+i\big(\operatorname{Im}(E_s)+E_q\big)\right|^2
=|E_s|^2+E_q^2+2E_q\operatorname{Im}(E_s)\\[4pt]
I_{-Y}
&=\left|\operatorname{Re}(E_s)+i\big(\operatorname{Im}(E_s)-E_q\big)\right|^2
=|E_s|^2+E_q^2-2E_q\operatorname{Im}(E_s)
\end{aligned}
$$

Now subtract the two spectra, $I_{+Y}-I_{-Y}$. The terms $|E_s|^2$ and $E_q^2$, which are the same in both measurements, disappear. Only the interference cross term remains:

$$
I_{+Y}-I_{-Y}
=
4E_q\operatorname{Im}(E_s)
$$

After normalizing to the pure-quartz reference intensity so that $E_q=1$, we arrive at the central expression used in Yan's measurements, in the corresponding normalized field and susceptibility convention:

$$
\boxed{
\operatorname{Im}\chi^{(2)}
=
\frac{I_{+Y}-I_{-Y}}{4}
}
$$

### 7.3 Why Does a Heterodyne Local Oscillator Make Weak Signals Easier to Detect?

The quartz local oscillator does more than recover the sign. It also makes a very weak signal easier to measure.

- In an **ordinary intensity (homodyne) measurement**, the sample signal is quadratic in its field amplitude:

  $$
  I_s\propto|E_s|^2
  $$

- In a **heterodyne measurement** with a quartz local oscillator, we detect a cross term between the reference and sample fields:

  $$
  I_{\mathrm{cross}}\propto2E_qE_s
  $$

Here is a simple numerical example. Suppose the quartz field amplitude is $E_q=1$, while the weak chiral water field has amplitude $E_s=0.01$.

If we measure the sample intensity directly, we get only $|E_s|^2=0.0001$, or one part in ten thousand. This tiny contribution can easily be overwhelmed by CCD electronic readout noise. With the quartz reference present, however, the interference cross term becomes $2E_q\operatorname{Im}(E_s)\sim0.02$, or about two percent. **In this example, the measured cross-term amplitude is 200 times larger than the direct sample intensity contribution.**

This was one of the first lessons I took away from Hamm's book.

*There is one important qualification: does this mean that a stronger local oscillator always gives a higher signal-to-noise ratio? No. The local oscillator itself introduces photon-counting fluctuations, or **shot noise**. Its noise amplitude scales as $\sqrt{I_{\mathrm{LO}}}\propto E_q$. Once the local oscillator is strong enough that shot noise dominates over detector dark noise, both the heterodyne signal ($\propto E_q$) and the shot noise ($\propto E_q$) grow at the same rate. The signal-to-noise ratio then approaches a saturation limit.*

---

## Part II. From Vibrational Modes to an Opposite-Sign Doublet: Why Does $\operatorname{Im}\chi_{ZYX}^{(2)}(\omega)$ Have Both Positive and Negative Peaks?

### 7.4 Why Measure the Imaginary Part? What Do We Learn from $\operatorname{Im}\chi_{ZYX}^{(2)}(\omega)$?

We have gone through all this effort to measure $\operatorname{Im}\chi_{ZYX}^{(2)}(\omega)$. But what do we actually gain?

Consider the complex resonant vibrational susceptibility,

$$
\chi_{\mathrm{res}}^{(2)}(\omega)
=\sum_\nu\frac{A_\nu}{\omega-\omega_\nu+i\Gamma_\nu}
$$

The real part has a dispersive line shape: it changes sign on opposite sides of a resonance, making overlapping peaks difficult to interpret. The **imaginary part**, by contrast, has an absorption-like Lorentzian line shape. It tells us where the vibrational resonances lie and, with the chosen phase convention, whether each resonance amplitude $A_\nu$ contributes with a positive or negative sign.

When Yan measured the $\operatorname{Im}\chi_{ZYX}^{(2)}(\omega)$ spectra of protein and DNA hydration layers, an interesting pattern appeared. In a theoretical analysis with Hammes-Schiffer and Simpson published in February 2024 (*Journal of Chemical Physics*, **160**, 055102), the researchers addressed a question that had puzzled the field: **why does the O–H stretching band of chiral water often look like two peaks with opposite signs?**

Let's return to the **intramolecular coupling** $J_{\mathrm{intra}}$ from Chapter 5. We can understand the origin of this pattern with a simple two-mode argument.

Inside one $\mathrm{H_2O}$ molecule, the two local O–H stretching coordinates, $q_1$ and $q_2$, mix to form two normal modes:

1. **Symmetric stretch (the two bonds stretch in phase):**

   $$
   Q_s\sim q_1+q_2
   $$

2. **Antisymmetric stretch (the two bonds stretch out of phase):**

   $$
   Q_a\sim q_1-q_2
   $$

Because of the intramolecular coupling strength $J_{12}$ and the local hydrogen-bond environment, the two modes have different vibrational frequencies:

$$
\omega_s\ne\omega_a\quad(\text{usually }\omega_s<\omega_a)
$$

### 7.5 Why Do the Symmetric and Antisymmetric Modes Have Equal-Magnitude, Opposite-Sign Chiral Responses?

For a normal mode $Q_\nu=c_{\nu1}q_1+c_{\nu2}q_2$, the resonant SFG amplitude depends on the product of its Raman and IR transition factors:

$$
A_{\nu,IJK}\propto\alpha'_{\nu,IJ}\mu'_{\nu,K}
$$

Recall our result from Section 5.2. In the chiral $\chi_{ZYX}^{(2)}$ channel, the same-bond terms (those proportional to $c_{\nu1}^2$ or $c_{\nu2}^2$) vanish after macroscopic rotational averaging. **Only the cross-bond terms survive**, and their amplitudes are proportional to the product $c_{\nu1}c_{\nu2}$:

$$
A_{\nu,ZYX}
\propto
c_{\nu1}c_{\nu2}
\left\langle
\alpha'_{1,ZY}\mu'_{2,X}
+
\alpha'_{2,ZY}\mu'_{1,X}
\right\rangle
$$

Now examine the coefficient product $c_{\nu1}c_{\nu2}$ for the symmetric and antisymmetric normal modes.

- For the **symmetric mode** $Q_s$, choose $c_{s1}=\cos\psi$ and $c_{s2}=\sin\psi$. The two local motions have the same sign, so their coefficient product is **positive**:

  $$
  c_{s1}c_{s2}=+\cos\psi\sin\psi
  $$

- For the **antisymmetric mode** $Q_a$, choose $c_{a1}=-\sin\psi$ and $c_{a2}=\cos\psi$. The two eigenmodes must be **orthogonal**, satisfying $c_{s1}c_{a1}+c_{s2}c_{a2}=0$. The local motions have opposite signs, and the coefficient product is exactly the **negative** of the symmetric-mode product:

  $$
  c_{a1}c_{a2}=-\sin\psi\cos\psi=-c_{s1}c_{s2}
  $$

And there is our result. In this two-oscillator model, the two modes share the same underlying cross-bond geometric factor, but their mixing coefficients have opposite products:

$$
c_{a1}c_{a2}=-c_{s1}c_{s2}
$$

**The symmetric and antisymmetric O–H stretching modes of the same water molecule therefore give chiral SFG amplitudes with equal magnitudes and opposite signs in this model.**

Putting the two contributions into the complex susceptibility gives

$$
\chi_{\mathrm{res}}^{(2)}(\omega)
=
\frac{A_s}{\omega-\omega_s+i\Gamma_s}
-
\frac{A_a}{\omega-\omega_a+i\Gamma_a}
$$

When we use the quartz heterodyne method from Part I to measure $\operatorname{Im}\chi_{ZYX}^{(2)}(\omega)$, the spectrum takes the form of a difference between two oppositely signed line-shape functions, $L_s$ and $L_a$:

$$
\boxed{
\operatorname{Im}\chi_{ZYX}^{(2)}(\omega)
\sim
L_s(\omega)-L_a(\omega)
}
$$

This explains where the opposite-sign doublet comes from. It also tells us which physical factors shape the spectrum we actually see:

1. **The frequency splitting between the symmetric and antisymmetric modes, $|\omega_a-\omega_s|$.** If there is no splitting ($\omega_s=\omega_a$), the positive and negative contributions overlap and cancel in this simplified model. Coupling and the asymmetric local hydrogen-bond environment separate their resonance frequencies, allowing the doublet to appear.
2. **Linewidths $\Gamma_\nu$ and variations in the local environment.** Dynamical fluctuations in the hydration layer broaden otherwise sharp spectral features. The positive and negative peaks can overlap, leading to partial cancellation between them.
3. **Statistical cancellation between different water molecules and vibrational modes.** Even when an individual water molecule contributes an opposite-sign pair, adding the responses from many molecules and modes can change the observed spectrum.

This is why we need to keep the physical roles of $\omega_i$, $J_{ij}$, $\alpha'_{\nu,IJ}$, $\mu'_{\nu,K}$, and $\Gamma_\nu$ separate. Stronger hydrogen bonding can red-shift a local frequency $\omega_i$ and increase an IR transition dipole $\mu'$, but the final chiral SFG signal also depends on mode mixing and cancellation between positive and negative contributions.

So we **cannot** simply conclude that

$$
\text{Stronger hydrogen bonding}
\implies
\text{a stronger chiral SFG signal}
\quad(\text{incorrect!})
$$

---

## Part III. The Final Experimental Check: How Do We Know the Signal Comes from Water, Not DNA Itself?

### 7.7 Four Lines of Evidence for Chiral Hydration Water

We have one final question, and it is exactly the kind of question a reviewer or an audience member should ask:

*“In the high-frequency IR region around $3000\text{–}3600\ \mathrm{cm}^{-1}$, water has O–H stretching vibrations, but the DNA bases also have N–H stretching vibrations. The quartz substrate itself produces a strong reference field. So how can we be sure that the measured $\operatorname{Im}\chi_{ZYX}^{(2)}$ signal comes from the chiral hydration layer, rather than from DNA or quartz?”*

In Yan's series of studies (2019 *Journal of Physical Chemistry Letters*, 2020 *PNAS*, 2022 *Langmuir*, and 2024 *Journal of Chemical Physics*), the assignment was not based simply on using `psp` polarization or a quartz reference. It rested on **four complementary lines of evidence**.

1. **The isotope shift from $\mathrm{H_2^{16}O}$ to $\mathrm{H_2^{18}O}$.** Replace ordinary water ($\mathrm{H_2^{16}O}$) with oxygen-18-enriched water ($\mathrm{H_2^{18}O}$). Unlike replacing hydrogen with deuterium, this does not cause hydrogen/deuterium exchange. The masses of the N–H and C–H bonds in DNA remain unchanged; only the oxygen isotope in the water changes from 16 to 18. By the harmonic-oscillator relation $\omega=\sqrt{k/\mu}$, the O–H reduced mass $\mu$ increases, so the water O–H stretching frequency should shift to lower wavenumbers by about $10\text{–}12\ \mathrm{cm}^{-1}$. The experimentally observed red shift of the chiral O–H band strongly identifies water as the source of the signal.

2. **Opposite signs for the mirror-image D-DNA and L-DNA systems.** Artificially synthesized L-DNA has the mirror-image handedness of D-DNA. Measuring both samples under the same quartz heterodyne conditions gives imaginary spectra that reverse sign, appearing as vertical mirror images of one another. This supports the chiral origin of the response and helps rule out achiral leakage and artifacts associated with the quartz background.

3. **Distinguishing DNA N–H features from water O–H features.** Humidity control, isotope substitution, and constrained fitting of the two bands can help separate the relatively narrow N–H resonances of DNA bases (often near $\sim3300\ \mathrm{cm}^{-1}$ and not shifted by $\mathrm{H_2^{18}O}$) from the broad, coupled O–H band of hydration water that shifts upon oxygen isotope substitution.

4. **Microscopic support from MD simulations and first-principles-based spectral calculations.** As discussed in Chapters 5 and 6, one can start from molecular dynamics trajectories and calculate $\operatorname{Im}\chi_{ZYX}^{(2)}(\omega)$ using only the O–H vibrational degrees of freedom of water. The calculated spectral phase, doublet shape, and dominant contribution from the first hydration shell agree closely with the experimental picture.

---

### 7.8 Chapter Summary: Bringing Theory and Experiment Together

$$
\boxed{
\begin{gathered}
\text{Ordinary SFG measures only }|\chi^{(2)}|^2
\text{ (the sign is lost, making the doublet phase hard to identify)}\\
\Downarrow\\
\text{Heterodyne interference at the }\pm Y\text{ orientations of right-handed quartz:}\\
\operatorname{Im}\chi_{ZYX}^{(2)}=\frac{I_{+Y}-I_{-Y}}{4}\\
\Downarrow\\
\text{A signed chiral O–H spectrum is measured. Mode orthogonality, }\\
c_{s1}c_{s2}=-c_{a1}c_{a2},
\text{ explains the opposite-sign doublet }L_s(\omega)-L_a(\omega)\\
\Downarrow\\
\text{The }\mathrm{H_2^{18}O}\text{ isotope shift, D/L sign reversal, and MD simulations}\\
\text{support the assignment to chiral water in the first hydration shell}
\end{gathered}
}
$$
