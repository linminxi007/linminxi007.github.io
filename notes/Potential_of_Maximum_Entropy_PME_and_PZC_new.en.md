---
title: "Potential of Maximum Entropy(PME) and Potential of Zero Charge(PZC)"

date: 2026-09-15

description: "For a while, I thought using PME to measure PZC was an extremely cool idea."

categories:
  - dynamics
  - Spectroscopy

lang: en

translation-key: Potential of Maximum Entropy(PME) and Potential of Zero Charge(PZC)

status: working

draft: false
---

Let us start with an obituary.

The first figure is from Manos Mavrikakis & Jin Suntivich, *Nature Materials* 2023. They used SFG to measure the PZC at a metal-water interface. This almost completely announced the death of using the maximum-entropy method to measure PZC. Maybe we will still see it in future studies of metal-water interfacial dynamics or heat transfer.

![](images/paste-27.png)

But the maximum-entropy method is still an experiment that gives us a lot to think about. So let us first introduce what PZC is, then look at the relation between PZC and interfacial water, and finally discuss how the maximum-entropy method measures it.

::: {style="text-align: center;"}
<img src="images/paste-13.png" width="500"/>
:::

Because the metal lattice ends at the surface, electron spill-out naturally occurs. So metal surfaces often naturally carry charge.

::: {style="text-align: center;"}
<img src="images/paste-20.png" width="409"/>
:::

## So let us start with a few definitions

::: {style="text-align: center;"}
<img src="images/paste-17.png" width="558"/>
:::

\[add a citation\] Jun Cheng, *Science Advances* 2020 [DOI: 10.1126/sciadv.abb1219](https://doi.org/10.1126/sciadv.abb1219)

### PZC **PZFC** **PZTC**

Before going into these concepts, you may first want to understand what electrode potential is. When we measure an electrode potential, what are we actually measuring? **[what is electrode potential](what is electrode potential.en.md)**

PZC (**potential of zero charge**) is the electrode potential at which the electrode surface has no net charge or excess charge. In the middle panel of the figure above, the PZC means that the surface has no charge.

PZFC (**potential of zero free charge**) is the potential at which the real excess free-charge density on the electrode surface is zero. Free charge means the real excess charge on the two sides of the interface. At the PZFC, the free charge on the electrode is the real electronic charge. It is the main physical source of the electric field across the electric double layer. Water dipoles interact directly with this electric field. This is why people mainly care about this term.

PZTC (**potential of zero total charge**) is the potential at which the total surface-charge density is zero. Total charge includes not only free charge at the surface, but also charge involved in adsorption and transferred across the interface.

PME, the **potential of maximum entropy**, is the point where interfacial water is most disordered. For now, we can roughly treat this as the PZC. More strictly, in a simple electric-double-layer picture dominated by electrostatics, the PME should correspond to the PZFC.

In short, the PZC is the electrode potential of a "clean" surface with no net charge.

From our earlier note *What Is Electrode Potential*, we know that electrode potential can be written in different ways. That also gives different expressions for PZC. I will not repeat those equations here.

## The orientation of interfacial water is related to the PZC

::: {style="text-align: center;"}
<img src="images/paste-18.png" width="178"/>
:::

**Watts-Tobin / BDM two-state water model**: this classic model assumes that interfacial water mainly has two discrete orientations, with the hydrogen side pointing either up or down. The net orientation of water creates a dipole potential drop at the interface. When the interfacial electric field changes, the preferred orientation can flip. This gives a microscopic picture for the solvent contribution to electric-double-layer capacitance.\[3,4\]

**Huang 2016/2018 mean-field model for Pt**: this model goes beyond the traditional picture of pure electrostatic polarization. It includes coupling between water reorientation, surface chemisorption, and different contributions to surface charging. The model suggests that at high potential, strongly chemisorbed species, such as Pt-O dipoles, can create an opposite potential drop. This can locally reverse the electric field in the double layer and force water molecules to reorient. The result is an unusual non-monotonic charging behavior at the electrode surface.\[5,6\]

<img src="https://acs.silverchair-cdn.com/acs/content_public/journal/jpccck/120/25/10.1021_acs.jpcc.6b03930/5/m_jp-2016-03930x_0001.png?Expires=1792719268&amp;Signature=fB2-rJCTCi9W-gAHpwYJs6G3aLgGPToKBRJF5IjAj663GwdhWZEhF54kGDTsT7dKcDDfqt~fnoJZ5J4l5-eRE96SlmVzd3k7kEs3KXPc-PH9q1FAlT5tImuOGBOFv3491TyXh~IvCrhuQl8L3-Rwp9O5yWkG-Fk7ME54vtxr6jCQ6s6zMISg5yDmnCKrnM-eP2ysVk7Uk93W49WX45QDKZXmGZZuLi4Jm1~9IAjQC~OTp8cn10QrY4oh1Vs~xkgOZ5VwrdC~ImHbLNevpdIbr838BeN3Q7TqgOET-5yWPNxEJnNpmzmQllgsARci~aBDqc015YwbcQSPXcRJC4apuQ__&amp;Key-Pair-Id=APKAIE5G5CRDK6RD3PGA" alt="Figure 3. Refer to the image caption for details." data-align="center" fig-align="center" width="284"/>

By the standard physics definition, the dipole moment of a water molecule points from the center of negative charge to the center of positive charge, that is, from O− toward H+.

**Le/Cheng 2017 AIMD microscopic picture**: first-principles molecular dynamics showed that at interfaces of metals such as Pt, Pd, Ag, and Au, the contribution of water orientation alone to the outer-potential difference can actually be very small. The dominant contribution to the surface potential difference comes from the redistribution of electrons caused by chemisorption between water molecules and the metal surface.\[7\]

We know that the orientation of interfacial water dipoles can create a potential drop from the metal surface into the solution. In other words, the arrangement of interfacial water dipoles contributes to the electrode potential.

Jun Huang gave the following expression directly in a 2023 **JACS Au** paper:\[8\]

$$
E_{\mathrm{pzc,SHE}}
=
E_{\mathrm{pzc,SHE}}^0
+
\underbrace{\frac{N_{\mathrm{ad}}\theta_w\mu_w}{\epsilon_{\mathrm{IHP}}}}_{\text{how large the dipole potential would be if all water molecules were fully oriented}}
\underbrace{\left[
\coth(\delta\tilde{\mu})
-\frac{1}{\delta\tilde{\mu}}
\right]}_{\text{how much net orientation is actually present}}
\tag{4}
$$

So the idea is:

PZC = the reference PZC when water has no net orientation + the net dipole potential from the first layer of water.

I spent a long time deriving the equation above. It is an annoying equation.

## PME / PZFC measured by a laser-induced temperature jump

At the PZC, or more accurately at the PZFC, the electrode surface has no net free charge. So the first layer of interfacial water should have the most disordered orientation. The randomness is strongest and the entropy is at its maximum.

Now we send a laser pulse to the water-metal interface. The laser energy becomes heat and creates a small vapor bubble in the water. The first layer of interfacial water temporarily leaves the surface. After some time, water slowly diffuses back.

During this process, we can measure changes in electrode potential or current.

At the PZFC, the water dipoles are randomly oriented both before and after the temperature jump. Their contribution to the electrode potential is therefore small. So when we measure the electrode potential or current, we should see very little change.

But if the applied electrode potential is far away from the PZFC, the situation is different.

For example, suppose the potential is more negative than the PZFC. The H side of the water may then point downward, producing a surface potential drop. I need to check the sign here; I may have said it the wrong way around.

If we now apply the laser pulse, the water layer is disturbed and then forms again. During this recovery, the electrode potential or current changes. From this response, we can tell when we are close to the PZFC.\[9\]

::: {style="text-align: center;"}
<img src="images/paste-21.png"/>
:::

Laser-induced potential transients for Pt(111) in (0.1-x)M NaF + xM HClO4 at mainly low applied potentials: D) pH=5.70 (6): a) 150mV, b) 500mV, c) 550mV, d) 600mV, e) 640mV, f) 650mV, g) 700mV and h) 750mV.\[9\]

By disturbing the interfacial water and then letting it return to equilibrium, we can obtain a plot like this.

Near $\Delta E=0$, there is a line almost parallel to the time axis. This means that the electrode potential changes very little before and after the laser pulse.

The idea is that the system was already near the PZFC, where interfacial water was disordered. Going from one disordered state to another does not perturb the electrode potential very much.

## 3. Relation between PZFC and pH

https://pubs.acs.org/jpccck/article/125/9/5020/467069/The-Potential-of-Zero-Charge-and-the \[10\]

Juan Feliu, *Study of the Pt (111) | electrolyte interface in the region close to neutral pH solutions by the laser induced temperature jump technique.* \[9\]

Juan Feliu https://www.nature.com/articles/s41598-017-01295-1 \[11\]

We can talk about this next time.

## 4. Measuring PZC with **SFG**

SFG **[SFG](SFG_QM math-cleaned-v2.en.md)** can measure the surface electric field. The work from Hong-Fei Wang at Westlake University and Franz M. Geiger at Northwestern University is a great example.\[12\]

Naturally, we may also want to use SFG to measure surface pH. It seems that Wei Xiong at UCSD is working on this.

I really cannot keep writing today. We can talk about this next time too.

## References

\[1\] Trasatti, S. “Work function, electronegativity, and electrochemical behaviour of metals: II. Potentials of zero charge and ‘electrochemical’ work functions.” *Journal of Electroanalytical Chemistry and Interfacial Electrochemistry* **33** (1971): 351–378. https://doi.org/10.1016/S0022-0728(71)80123-7

\[2\] Trasatti, S. “The absolute electrode potential: an explanatory note (Recommendations 1986).” *Pure and Applied Chemistry* **58** (7) (1986): 955–966. https://doi.org/10.1351/pac198658070955

\[3\] Watts-Tobin, R. J. “The interface between a metal and an electrolytic solution.” *Philosophical Magazine* **6** (61) (1961): 133–153.

\[4\] Bockris, J. O’M.; Devanathan, M. A. V.; Müller, K. “On the structure of charged interfaces.” *Proceedings of the Royal Society A* **274** (1356) (1963): 55–79. https://doi.org/10.1098/rspa.1963.0114

\[5\] Huang, J.; Malek, A.; Zhang, J.; Eikerling, M. H. “Non-monotonic Surface Charging Behavior of Platinum: A Paradigm Change.” *The Journal of Physical Chemistry C* **120** (25) (2016): 13587–13595. https://doi.org/10.1021/acs.jpcc.6b03930

\[6\] Huang, J.; Zhou, T.; Zhang, J.; Eikerling, M. “Double layer of platinum electrodes: Non-monotonic surface charging phenomena and negative double layer capacitance.” *The Journal of Chemical Physics* **148** (4) (2018): 044704. https://doi.org/10.1063/1.5010999

\[7\] Le, J.; Iannuzzi, M.; Cuesta, A.; Cheng, J. “Determining Potentials of Zero Charge of Metal Electrodes versus the Standard Hydrogen Electrode from Density-Functional-Theory-Based Molecular Dynamics.” *Physical Review Letters* **119** (2017): 016801. https://doi.org/10.1103/PhysRevLett.119.016801

\[8\] Huang, J. “Zooming into the Inner Helmholtz Plane of Pt(111)–Aqueous Solution Interfaces: Chemisorbed Water and Partially Charged Ions.” *JACS Au* **3** (2) (2023): 550–564. https://doi.org/10.1021/jacsau.2c00650

\[9\] Sebastián, P.; Martínez-Hincapié, R.; Climent, V.; Feliu, J. M. “Study of the Pt(111) \| electrolyte interface in the region close to neutral pH solutions by the laser induced temperature jump technique.” *Electrochimica Acta* **228** (2017): 667–676. https://doi.org/10.1016/j.electacta.2017.01.089

\[10\] Auer, A.; Ding, X.; Bandarenka, A. S.; Kunze-Liebhäuser, J. “The Potential of Zero Charge and the Electrochemical Interface Structure of Cu(111) in Alkaline Solutions.” *The Journal of Physical Chemistry C* **125** (9) (2021): 5020–5028. https://doi.org/10.1021/acs.jpcc.0c09289

\[11\] Ganassin, A.; Sebastián, P.; Climent, V.; Schuhmann, W.; Bandarenka, A. S.; Feliu, J. M. “On the pH Dependence of the Potential of Maximum Entropy of Ir(111) Electrodes.” *Scientific Reports* **7** (2017): 1246. https://doi.org/10.1038/s41598-017-01295-1

\[12\] Ohno, P. E.; Wang, H.-F.; Geiger, F. M. “Second-order spectral lineshapes from charged interfaces.” *Nature Communications* **8** (2017): 1032. https://doi.org/10.1038/s41467-017-01088-0
