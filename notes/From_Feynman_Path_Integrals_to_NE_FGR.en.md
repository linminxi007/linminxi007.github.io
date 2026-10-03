---
title: "From Path Integrals to Non-Equilibrium Fermi Golden Rule"
date: 2026-09-14
description: "From Feynman path integrals to the non-equilibrium Fermi Golden Rule."

categories:
  - Electron transfer
  - Electrochemistry

lang: en
translation-key: Path-Integrals-Fermi-Golden
status: working
draft: false
---

# 1. Starting from the propagator: how does a particle move from one nuclear configuration to another?

Consider a simple nuclear degree of freedom:

$$
R
$$

It can represent all the nuclear coordinates in a molecule:

$$
R=(R_1,R_2,\cdots,R_N)
$$

In quantum mechanics, a state evolves with time:

$$
|\Psi(t)\rangle
=
e^{-\frac{i}{\hbar}\hat H(t-t_0)}
|\Psi(t_0)\rangle
$$

where

$$
\hat U(t,t_0)
=
e^{-\frac{i}{\hbar}\hat H(t-t_0)}
$$

is called the **time-evolution operator (propagator)**.

If we care about an initial nuclear position

$$
R_i
$$

and ask for the amplitude to reach

$$
R_f
$$

after a time $t$, then the propagation amplitude is

$$
K(R_f,t;R_i,0)
=
\langle R_f|
e^{-\frac{i}{\hbar}\hat Ht}
|R_i\rangle
$$

This is the propagator.

Notice that this is a **probability amplitude**, not a probability.

The final probability is

$$
P(R_i\rightarrow R_f)
=
|K|^2
$$

***

## Physical picture

For a classical particle, we usually think:

> From the starting point to the ending point, which path did it take?

For a quantum particle, we have to think about it differently:

> It does not choose just one path. Instead, all possible paths contribute to the final amplitude at the same time.

So the propagator is not describing one single

$$
R_i\rightarrow R_f
$$

path. It contains the contributions from every possible path:

$$
\sum_{\text{all paths}}
(\text{path contribution})
$$

Feynman’s path integral is basically the mathematical way of expressing this idea.

***

# 2. From the propagator to the path integral

To include all possible paths, we divide the total time into many small pieces:

$$
t=N\epsilon
$$

Then

$$
e^{-\frac{i}{\hbar}Ht}
=
\left(
e^{-\frac{i}{\hbar}H\epsilon}
\right)^N
$$

Therefore

$$
K
=
\langle x_N|
(e^{-iH\epsilon/\hbar})^N
|x_0\rangle
$$

where

$$
x_0=x_i,
\qquad
x_N=x_f
$$

Now insert the completeness relation in the position basis:

$$
1
=
\int dx_n\,|x_n\rangle\langle x_n|
$$

For example, when $N=3$,

$$
\begin{aligned}
K
=
\int dx_1dx_2\,
&\langle x_3|
e^{-iH\epsilon/\hbar}
|x_2\rangle \\
\times\,
&\langle x_2|
e^{-iH\epsilon/\hbar}
|x_1\rangle \\
\times\,
&\langle x_1|
e^{-iH\epsilon/\hbar}
|x_0\rangle
\end{aligned}
$$

So

$$
\boxed{
K
=
\int
\prod_{n=1}^{N-1}dx_n
\prod_{n=0}^{N-1}
\langle x_{n+1}|
e^{-iH\epsilon/\hbar}
|x_n\rangle
}
$$

At this point, this equation is simply a mathematical identity.

Its physical meaning is straightforward:

we split one long-time propagation into

$$
x_0
\rightarrow
x_1
\rightarrow
x_2
\rightarrow
\cdots
\rightarrow
x_N
$$

and then integrate over every possible intermediate position.

***

# 3. Finding a short-time propagator

Now let us look at one short-time propagator:

$$
K_\epsilon
=
\langle x_{n+1}|
e^{-iH\epsilon/\hbar}
|x_n\rangle
$$

Because

$$
H=T+V
$$

that is,

$$
H
=
\frac{p^2}{2m}
+
V(x)
$$

the problem is that the kinetic and potential energy operators generally do not commute:

$$
[T,V]\neq 0
$$

So we cannot strictly write

$$
e^{-i(T+V)\epsilon/\hbar}
=
e^{-iT\epsilon/\hbar}
e^{-iV\epsilon/\hbar}
$$

But when

$$
\epsilon\rightarrow0
$$

we can use the Trotter expansion:

$$
e^{-iH\epsilon/\hbar}
\approx
e^{-iT\epsilon/\hbar}
e^{-iV\epsilon/\hbar}
+
O(\epsilon^2)
$$

In other words,

$$
e^{-\frac{i}{\hbar}H\epsilon}
\approx
e^{-\frac{i}{\hbar}\frac{\hat p^2}{2m}\epsilon}
e^{-\frac{i}{\hbar}V(\hat x)\epsilon}
$$

Let us see why this works.

Expand the left-hand side:

$$
1
-
\frac{i\epsilon}{\hbar}(T+V)
+
O(\epsilon^2)
$$

Expand the right-hand side:

$$
\left(
1-\frac{i\epsilon T}{\hbar}
\right)
\left(
1-\frac{i\epsilon V}{\hbar}
\right)
$$

which gives

$$
1
-
\frac{i\epsilon(T+V)}{\hbar}
-
\frac{\epsilon^2TV}{\hbar^2}
+
O(\epsilon^3)
$$

So the difference between the two sides starts at

$$
O(\epsilon^2)
$$

In the limit

$$
N\rightarrow\infty,
\qquad
\epsilon=\frac{t}{N}\rightarrow0
$$

we can build the exact continuous-time propagator.

***

# 4. Insert the momentum completeness relation

Now we have

$$
K_\epsilon
=
\langle x_{n+1}|
e^{-i\hat p^2\epsilon/(2m\hbar)}
e^{-iV(\hat x)\epsilon/\hbar}
|x_n\rangle
$$

Insert the momentum completeness relation:

$$
1
=
\int dp\,|p\rangle\langle p|
$$

Then

$$
\begin{aligned}
K_\epsilon
=
\int dp\,
&\langle x_{n+1}|p\rangle \\
&\times
\langle p|
e^{-i\hat p^2\epsilon/(2m\hbar)}
|p\rangle \\
&\times
e^{-iV(x_n)\epsilon/\hbar}
\langle p|x_n\rangle
\end{aligned}
$$

Using

$$
\langle x|p\rangle
=
\frac{1}{\sqrt{2\pi\hbar}}
e^{ipx/\hbar}
$$

we get

$$
\begin{aligned}
K_\epsilon
=
\int
\frac{dp}{2\pi\hbar}
&\exp
\left[
\frac{i}{\hbar}px_{n+1}
\right] \\
\times\,
&\exp
\left[
-\frac{i}{\hbar}
\frac{p^2}{2m}\epsilon
\right] \\
\times\,
&\exp
\left[
-\frac{i}{\hbar}
V(x_n)\epsilon
\right] \\
\times\,
&\exp
\left[
-\frac{i}{\hbar}px_n
\right]
\end{aligned}
$$

Combining the exponentials gives

$$
K_\epsilon
=
\int
\frac{dp}{2\pi\hbar}
\exp
\left[
\frac{i}{\hbar}
\left(
p(x_{n+1}-x_n)
-
\frac{p^2}{2m}\epsilon
-
V(x_n)\epsilon
\right)
\right]
$$

***

# 5. Integrating over momentum

This is a Gaussian integral.

Let

$$
\Delta x
=
x_{n+1}-x_n
$$

The part of the exponent involving $p$ is

$$
\frac{i}{\hbar}
\left(
p\Delta x
-
\frac{p^2}{2m}\epsilon
\right)
$$

With a little algebra, complete the square:

$$
-\frac{i\epsilon}{2m\hbar}
\left(
p-\frac{m\Delta x}{\epsilon}
\right)^2
+
\frac{i}{\hbar}
\frac{m(\Delta x)^2}{2\epsilon}
$$

So the integral gives the following. What we are really doing here is separating out the potential-energy part:

$$
K_\epsilon
=
\sqrt{
\frac{m}{2\pi i\hbar\epsilon}
}
\exp
\left[
\frac{i}{\hbar}
\epsilon
\left(
\frac{m}{2}
\left(
\frac{x_{n+1}-x_n}{\epsilon}
\right)^2
-
V(x_n)
\right)
\right]
$$

This is the key step that takes us from the Hamiltonian form to the Lagrangian form.

***

# 6. Why does the Lagrangian appear?

Look at the expression inside the exponent:

$$
\epsilon
\left[
\frac{m}{2}
\left(
\frac{x_{n+1}-x_n}{\epsilon}
\right)^2
-
V(x_n)
\right]
$$

Here,

$$
\frac{x_{n+1}-x_n}{\epsilon}
$$

becomes the velocity in the continuous limit:

$$
\dot x
$$

So the expression becomes

$$
\epsilon
\left[
\frac12m\dot x^2
-
V(x)
\right]
$$

Define the Lagrangian:

$$
L(x,\dot x)
=
T-V
$$

Then the short-time propagator can be written as

$$
K_\epsilon
=
C
\exp
\left[
\frac{i}{\hbar}L\epsilon
\right]
$$

where $C$ is the normalization factor that comes from the Gaussian momentum integral.

***

# 7. Back to the full propagator

Multiply all the short-time propagators together:

$$
K
=
\int
\prod_n dx_n
\prod_n
K_\epsilon
$$

The exponential part is

$$
\prod_n
e^{\frac{i}{\hbar}L_n\epsilon}
$$

Multiplying exponentials is the same as adding the actions in the exponent:

$$
e^{
\frac{i}{\hbar}
\sum_nL_n\epsilon
}
$$

When

$$
N\rightarrow\infty
$$

we have

$$
\sum_nL_n\epsilon
\rightarrow
\int_0^T L\,dt
$$

Define the action

$$
S[x(t)]
=
\int_0^T
L(x,\dot x)\,dt
$$

Then we get the **<u>Feynman path integral</u>**:

$$
\boxed{
K(x_f,t_f;x_i,t_i)
=
\int\mathcal{D}x(t)\,
e^{\frac{i}{\hbar}S[x(t)]}
}
$$

It means:

> The quantum propagation amplitude from the initial state to the final state is the coherent sum of the amplitudes from all possible paths. In other words, the quantum particle takes all possible paths at the same time.
> 
> There is a really nice video that explains this idea:
> 
> How Can Light Travel Everywhere at Once? Feynman’s Path Integral Explained
> https://www.youtube.com/watch?v=ss0HABVUkeQ

The weight of each path is not a probability. It is a complex phase factor:

$$
e^{iS/\hbar}
$$

***

# 8. From a single potential-energy surface to electron transfer

So far, we have obtained

$$
K(R_f,t;R_i,0)
=
\int\mathcal{D}R(t)
\exp
\left[
\frac{i}{\hbar}S[R(t)]
\right]
$$

This describes the quantum propagation of the nuclear degrees of freedom on one given potential-energy surface.

Now consider electron transfer:

$$
D\rightarrow A
$$

The nuclei are no longer propagating on just one potential-energy surface. Instead, we now have two different electronic states, with

$$
V_D(R)
$$

and

$$
V_A(R)
$$

So we need to add the coupling between the two electronic states into the nuclear propagation picture.

***
# 9. Two-state Hamiltonian

Introduce two diabatic electronic states:

$$
|D\rangle,
\qquad
|A\rangle
$$

The total wavefunction can be written as

$$
|\Psi(t)\rangle
=
\psi_D(R,t)|D\rangle
+
\psi_A(R,t)|A\rangle
$$

The Hamiltonian is

$$
\hat H
=
\begin{pmatrix}
\hat H_D & \Gamma_{DA} \\
\Gamma_{AD} & \hat H_A
\end{pmatrix}
$$

where

$$
\hat H_D
=
\frac{\hat P^2}{2M}
+
V_D(\hat R)
$$

and

$$
\hat H_A
=
\frac{\hat P^2}{2M}
+
V_A(\hat R)
$$

Here, $\Gamma_{DA}$ and $\Gamma_{AD}$ describe the electronic coupling between the two electronic states.

So the total Hamiltonian can be separated into

$$
\boxed{
\hat H
=
\hat H_0+\hat H_I
}
$$

where

$$
\hat H_0
=
\hat H_D|D\rangle\langle D|
+
\hat H_A|A\rangle\langle A|
$$

describes the nuclear motion on each potential-energy surface while the electron stays in a fixed diabatic state.

The interaction term is

$$
\boxed{
\hat H_I
=
\Gamma_{DA}|D\rangle\langle A|
+
\Gamma_{AD}|A\rangle\langle D|
}
$$

It connects the two electronic states.

For a closed Hermitian quantum system, we must have

$$
\Gamma_{AD}
=
\Gamma_{DA}^{*}
$$

so in general

$$
|\Gamma_{AD}|
=
|\Gamma_{DA}|
$$

But the two quantities themselves do not have to be the same real number. Only when we choose a suitable phase convention and the coupling can be taken as real do we usually write

$$
\Gamma_{AD}
=
\Gamma_{DA}
=
\Gamma
$$

***

# 10. The weak electronic-coupling limit of the Fermi Golden Rule

The Fermi Golden Rule describes the **weak electronic-coupling limit**.

We can define an electron-transfer timescale

$$
\tau_{\mathrm{ET}}
$$

which represents the average waiting timescale for one successful $D\rightarrow A$ transfer. We can usually think of it as being related to the coupling strength between the two states.

The environment also produces many kinds of fluctuations, for example:

- solvent motion;
- molecular vibrations;
- thermal fluctuations;
- local electric-field fluctuations;
- nuclear-coordinate fluctuations.

These fluctuations continuously change the electronic energy gap and phase, so we introduce a correlation or decoherence timescale

$$
\tau_c
$$

In the Golden Rule limit, we usually require

$$
\boxed{
\tau_{\mathrm{ET}}
\gg
\tau_c
}
$$

In other words, the environmental correlation has already decayed many times before a real electron-transfer event occasionally happens.

So most of the time, the electron remains in either

$$
D
$$

or

$$
A
$$

and only makes a transition with a relatively low probability.

One thing to keep in mind is that the weak-coupling condition should not simply be understood as

$$
|\Gamma_{DA}|
\ll
|E_D-E_A|
$$

because near the configuration where electron transfer actually happens, the system may instead satisfy

$$
E_D\approx E_A
$$

A more accurate way to say it is:

> The electronic coupling is weak enough that transitions between the states can be treated as a low-order perturbation, while the electronic population changes more slowly than the environmental correlation function decays.

***

# 11. Introducing second-order perturbation theory

Define the total Hamiltonian of the system:

$$
\hat H
=
\hat H_0+\hat H_I
$$

where

$$
\hat H_0
=
\hat H_D|D\rangle\langle D|
+
\hat H_A|A\rangle\langle A|
$$

and

$$
\hat H_I
=
\Gamma_{DA}|D\rangle\langle A|
+
\Gamma_{AD}|A\rangle\langle D|
$$

Suppose the system is in the donor state at $t=0$.

For the nuclear degrees of freedom, such as the solvent configuration, let the initial density matrix be

$$
\hat\rho_0
$$

Then the initial density matrix of the full system is

$$
\boxed{
\hat\rho_{\mathrm{tot}}(0)
=
\hat\rho_0
\otimes
|D\rangle\langle D|
}
$$

***

# 12. Moving to the interaction picture

To separate the zeroth-order propagation from the electronic transition, we introduce the interaction picture.

The density matrix satisfies

$$
\frac{\partial}{\partial t}
\hat\rho_I(t)
=
-\frac{i}{\hbar}
[
\hat H_I(t),
\hat\rho_I(t)
]
$$

where the interaction-picture Hamiltonian is

$$
\boxed{
\hat H_I(t)
=
e^{i\hat H_0t/\hbar}
\hat H_I
e^{-i\hat H_0t/\hbar}
}
$$

Because $\hat H_0$ is diagonal in the electronic-state space, we can expand it as

$$
\hat H_I(t)
=
\tilde V_{DA}(t)
|D\rangle\langle A|
+
\tilde V_{AD}(t)
|A\rangle\langle D|
$$

where

$$
\boxed{
\tilde V_{DA}(t)
=
\Gamma_{DA}
e^{i\hat H_Dt/\hbar}
e^{-i\hat H_At/\hbar}
}
$$

and

$$
\boxed{
\tilde V_{AD}(t)
=
\Gamma_{AD}
e^{i\hat H_At/\hbar}
e^{-i\hat H_Dt/\hbar}
}
$$

For a Hermitian Hamiltonian,

$$
\tilde V_{AD}(t)
=
\tilde V_{DA}^{\dagger}(t)
$$

***

# 13. Second-order Dyson expansion of the density matrix

Starting from

$$
\frac{\partial}{\partial t}
\hat\rho_I(t)
=
-\frac{i}{\hbar}
[
\hat H_I(t),
\hat\rho_I(t)
]
$$

integrate once:

$$
\hat\rho_I(t)
=
\hat\rho_{\mathrm{tot}}(0)
-
\frac{i}{\hbar}
\int_0^t
dt_1\,
[
\hat H_I(t_1),
\hat\rho_I(t_1)
]
$$

Now substitute the same equation once more for $\hat\rho_I(t_1)$ on the right-hand side, and keep terms up to $\hat H_I^2$. Then we get

$$
\begin{aligned}
\hat\rho_I(t)
=
&\hat\rho_{\mathrm{tot}}(0) \\
&-
\frac{i}{\hbar}
\int_0^t
dt_1\,
[
\hat H_I(t_1),
\hat\rho_{\mathrm{tot}}(0)
] \\
&-
\frac{1}{\hbar^2}
\int_0^t
dt_1
\int_0^{t_1}
dt_2\,
[
\hat H_I(t_1),
[
\hat H_I(t_2),
\hat\rho_{\mathrm{tot}}(0)
]
]
+
O(\Gamma^3)
\end{aligned}
$$

***

# 14. Defining the acceptor-state population

The acceptor-state population is

$$
P_A(t)
=
\mathrm{Tr}
\left[
\hat\rho_I(t)
|A\rangle\langle A|
\right]
$$

So we define the instantaneous transfer rate as

$$
k(t)
=
\frac{dP_A(t)}{dt}
$$

or equivalently

$$
k(t)
=
\mathrm{Tr}
\left[
\frac{\partial\hat\rho_I(t)}{\partial t}
|A\rangle\langle A|
\right]
$$

Now differentiate the second-order expansion.

Using

$$
\frac{d}{dt}
\int_0^t dt_1
\int_0^{t_1}dt_2\,F(t_1,t_2)
=
\int_0^t
dt_2\,
F(t,t_2)
$$

we get

$$
\boxed{
k(t)
=
-\frac{1}{\hbar^2}
\int_0^t
dt_2\,
\mathrm{Tr}
\left\{
[
\hat H_I(t),
[
\hat H_I(t_2),
\hat\rho_0|D\rangle\langle D|
]
]
|A\rangle\langle A|
\right\}
}
$$

The first-order term does not produce any acceptor-state population.

The reason is that $\hat H_I$ contains only off-diagonal terms in the electronic-state basis:

$$
|D\rangle\langle A|,
\qquad
|A\rangle\langle D|
$$

while $P_A$ is a diagonal electronic-state element.

So the population change first appears at

$$
O(\Gamma^2)
$$

order.

***
# 15. Expanding the double commutator

Using

$$
[X,[Y,Z]]
=
XYZ-XZY-YZX+ZYX
$$

let

$$
X=\hat H_I(t),
\qquad
Y=\hat H_I(t_2),
\qquad
Z=\hat\rho_0|D\rangle\langle D|
$$

This gives four terms.

Because the initial electronic state is $|D\rangle$ and we finally project onto $|A\rangle$, only the terms containing

$$
D\rightarrow A
$$

and its conjugate path can contribute to $P_A$.

Finally, we get

$$
\begin{aligned}
k(t)
=
\frac{1}{\hbar^2}
\int_0^t dt_2\,
\mathrm{Tr}_n
\Big[
&
\tilde V_{AD}(t)
\hat\rho_0
\tilde V_{DA}(t_2)
\\
+
&
\tilde V_{AD}(t_2)
\hat\rho_0
\tilde V_{DA}(t)
\Big]
\end{aligned}
$$

Here,

$$
\mathrm{Tr}_n
$$

means that the trace is taken only over the nuclear degrees of freedom.

***

# 16. Using the cyclic property of the trace

Using

$$
\mathrm{Tr}[ABC]
=
\mathrm{Tr}[CAB]
$$

we can rewrite the rate as

$$
\begin{aligned}
k(t)
=
\frac{1}{\hbar^2}
\int_0^t dt_2\,
\mathrm{Tr}_n
\Big[
&
\hat\rho_0
\tilde V_{DA}(t_2)
\tilde V_{AD}(t)
\\
+
&
\hat\rho_0
\tilde V_{DA}(t)
\tilde V_{AD}(t_2)
\Big]
\end{aligned}
$$

For a Hermitian system, these two terms are complex conjugates of each other.

Therefore

$$
z+z^*
=
2\operatorname{Re}z
$$

and we obtain

$$
\boxed{
k(t)
=
\frac{2}{\hbar^2}
\operatorname{Re}
\int_0^t
dt_2\,
\mathrm{Tr}_n
\left[
\hat\rho_0
\tilde V_{DA}(t)
\tilde V_{AD}(t_2)
\right]
}
$$

***

# 17. So the time-correlation function appears naturally

Define

$$
\boxed{
C(t,t_2)
=
\mathrm{Tr}_n
\left[
\hat\rho_0
\tilde V_{DA}(t)
\tilde V_{AD}(t_2)
\right]
}
$$

Then the electron-transfer rate can be written as

$$
\boxed{
k(t)
=
\frac{2}{\hbar^2}
\operatorname{Re}
\int_0^t
dt_2\,
C(t,t_2)
}
$$

This is where the time-correlation function naturally appears in second-order perturbation theory.

It is not something we add by hand. It comes from

> taking the quantum statistical average over the nuclear degrees of freedom after the electronic coupling acts at two different times.

The first electronic-coupling event creates a quantum amplitude between $D$ and $A$ at one time.

The second electronic-coupling event, at another time, converts that amplitude into an observable change in electronic population.

So the electron-transfer rate depends on the “memory” between these two times:

$$
C(t,t_2)
$$

##### This is exactly where electron-transfer theory starts to connect with environmental dynamics, decoherence, solvent fluctuations, and nonequilibrium statistical mechanics.

We can keep going and simplify the expression further.

### Step 1: Explicitly expand the nuclear operators

In the interaction picture, the donor-to-acceptor nonadiabatic coupling operator is defined as

$$
\tilde{V}_{DA}(t) = \Gamma_{DA} e^{i\hat{H}_D t/\hbar} e^{-i\hat{H}_A t/\hbar}
$$

The acceptor-to-donor operator $\tilde{V}_{AD}(t_2)$ is its Hermitian conjugate. Since the Hamiltonians $\hat{H}_D$ and $\hat{H}_A$ are self-adjoint operators, taking the conjugate means taking the complex conjugate of the scalar coefficient, reversing the operator order, and changing the signs in the exponents:

$$
\tilde{V}_{AD}(t_2) = \tilde{V}_{DA}^\dagger(t_2) = \Gamma_{DA}^* e^{i\hat{H}_A t_2/\hbar} e^{-i\hat{H}_D t_2/\hbar}
$$

Now substitute these two expressions into the trace in the rate equation, and pull the scalar factor $\vert{}\Gamma_{DA}\vert{}^2 = \Gamma_{DA}\Gamma_{DA}^*$ outside both the trace and the integral:

$$
k(t) = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^t dt_2 \text{Tr}_n \left[ \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} e^{-i\hat{H}_A t/\hbar} e^{i\hat{H}_A t_2/\hbar} e^{-i\hat{H}_D t_2/\hbar} \right]
$$

##### Let me add one comment here

In the standard derivation of the Fermi Golden Rule (FGR), the assumption $\Gamma_{AD} = \Gamma_{DA}$ (also written as $V_{AD} = V_{DA}$ or $H_{ab} = H_{ba}$) comes from **Hermiticity** in quantum mechanics. For an isolated, closed quantum system, the Hamiltonian $\hat{H}$ must be Hermitian, so its matrix elements satisfy $V_{AD} = V_{DA}^*$. Since the transition rate is proportional to the absolute square of the coupling matrix element, $\vert{}V_{AD}\vert{}^2$, the underlying purely electronic coupling for the forward and backward directions is mathematically the same.

However, in real and more complicated physical or chemical processes, this symmetry assumption is often broken at the level of an **effective electronic coupling**. Effective coupling parameters obtained from experiments or more advanced theoretical models can be different, meaning $\Gamma_{AD} \neq \Gamma_{DA}$.

1. **Symmetry breaking in single-molecule junctions:** In the classic Aviram-Ratner molecular-diode model with a D-$\sigma$-A structure, or in models of electrocatalytic surfaces, molecular orbitals such as the HOMO and LUMO naturally couple differently to the environments on the left and right sides, such as two electrodes or catalytic sites, so $\Gamma_L \neq \Gamma_R$. Under nonequilibrium conditions or an applied bias, the density of states (DOS) and Fermi levels of the electrodes shift relative to each other. During forward electron transfer, an orbital may strongly hybridize with one side, while during backward transfer it may dehybridize, producing a large difference in the effective coupling.

2. **Another symmetry-breaking mechanism:** When the system is strongly coupled to a thermal bath, the effective Hamiltonian of the central system can become non-Hermitian, for example $\hat{H}_{eff} = \hat{H}_S - \frac{i}{2} \hat{\Gamma}$. Introducing this dissipative term makes the effective eigenvalues complex and breaks time-reversal symmetry. For example, in bacterial photosynthetic reaction centers, although the A and B branches are structurally very similar, non-Hermitian evolution can make electron transfer proceed almost entirely along the A branch, giving highly asymmetric effective transport rates.

3. Chirality-induced spin selectivity (CISS) may also belong to this kind of situation.

### Back to the derivation — Step 2: Introduce the coherence time and change variables

At this point, the integration variable $t_2$ represents an absolute time in the past. In nonequilibrium statistical mechanics, what we care about more is the **time difference**, meaning how long the system maintains quantum coherence between the two electronic states. So we define the “coherence time” $\tau$ as

$$
\tau = t - t_2
$$

which gives $t_2 = t - \tau$.

When we change the integration variable, the differential becomes $dt_2 = -d\tau$. At the same time, the lower limit $t_2 = 0$ corresponds to $\tau = t$, while the upper limit $t_2 = t$ corresponds to $\tau = 0$. The minus sign from the differential lets us flip the interval $[t,0]$ back to $[0,t]$.

Mathematically, this change of variables is very simple. Physically, it changes the meaning of the integral from “going through all previous absolute times $t_2$” to “going through all possible coherence durations $\tau$.”

Substituting $t_2 = t - \tau$ into the exponential operators gives the rate equation in terms of the coherence time $\tau$:

$$
k(t) = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^t d\tau \text{Tr}_n \left[ \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} \left( e^{-i\hat{H}_A t/\hbar} e^{i\hat{H}_A (t-\tau)/\hbar} \right) e^{-i\hat{H}_D (t-\tau)/\hbar} \right]
$$

### Step 3: Simplify the operators and look at the physical picture

Now we can combine the acceptor evolution operators inside the parentheses. Since $\hat{H}_A$ commutes with itself, we can simply add the exponents: $-t + (t-\tau) = -\tau$. So the acceptor evolution becomes much simpler:

$$
e^{-i\hat{H}_A t/\hbar} e^{i\hat{H}_A (t-\tau)/\hbar} = e^{-i\hat{H}_A \tau/\hbar}
$$

Putting this back into the main equation gives the final expanded analytic form:

$$
k(t) = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^t d\tau \text{Tr}_n \left[ \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} e^{-i\hat{H}_A \tau/\hbar} e^{-i\hat{H}_D (t-\tau)/\hbar} \right]
$$

**A further theoretical step:**

If we use the cyclic property of the trace, $\text{Tr}[ABC] = \text{Tr}[CAB]$, split the rightmost factor $e^{-i\hat{H}_D (t-\tau)/\hbar}$ into $e^{-i\hat{H}_D t/\hbar} e^{i\hat{H}_D \tau/\hbar}$, and move $e^{-i\hat{H}_D t/\hbar}$ cyclically to the far left so that it combines with $\hat{\rho}_0$, the equation takes the standard time-correlation-function form of the non-equilibrium Fermi Golden Rule (NE-FGR).

The physical picture is very direct: the nuclear wavepacket first evolves out of equilibrium on the donor surface for a time $t$, and then during the time interval $\tau$ it experiences quantum interference between the donor and acceptor potential-energy surfaces.

Split the rightmost donor evolution operator as $e^{-i\hat{H}_D (t-\tau)/\hbar} = e^{-i\hat{H}_D t/\hbar} e^{i\hat{H}_D \tau/\hbar}$, and then use the cyclic property of the trace to move $e^{-i\hat{H}_D t/\hbar}$ to the far left:

$$
k(t) = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^t d\tau \text{Tr}_n \left[ e^{-i\hat{H}_D t/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} e^{-i\hat{H}_A \tau/\hbar} e^{i\hat{H}_D \tau/\hbar} \right]
$$

If, at $t=0$, the initial nuclear density matrix $\hat{\rho}_0$ is already in complete thermal equilibrium on the donor potential-energy surface, then $[\hat{\rho}_0, \hat{H}_D] = 0$. In that case, time translation does nothing to the density matrix:

$$
e^{-i\hat{H}_D t/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t/\hbar} = \hat{\rho}_0
$$

##### Let me add another comment here

I am not going to derive the **Dirac $\delta$ function** here.

When Dirac introduced the **Dirac $\delta$ function**, mathematicians were a little crazy about it, haha. Dirac basically defined this strange object that is “zero everywhere except at the origin, infinite at the origin, and integrates to one over the whole space.” Pure mathematicians strongly objected at the time because, in classical measure theory and Lebesgue integration, this is simply not a normal function and looked like an “illegal operation.” In 1932, von Neumann published *Mathematical Foundations of Quantum Mechanics* and, in the preface, more or less directly criticized the lack of mathematical rigor in Dirac’s $\delta$ function and continuous-spectrum expansion. Dirac did not seem bothered by this at all. But in *The Principles of Quantum Mechanics*, Dirac wrote that although the $\delta$ function does not exist in the ordinary sense of a function, if we use it as a symbolic tool inside an integral kernel, it does not create any physical contradiction. It was only later, around 1950, that Schwartz gave it a rigorous mathematical foundation.

Mathematicians invent rules in an ivory tower according to what they think mathematics should look like; physicists see what kind of mathematics nature seems to need, invent it first, and then mathematicians come later to build the foundation. (**1939 lecture to the Royal Society of Edinburgh, *The Relation between Mathematics and Physics***.)

**Nonlinear functions in neural networks are similar.**

There is a deep structural similarity between the Dirac $\delta$ function and nonlinear activation functions in neural networks, both historically and mathematically: **they are non-regular operations introduced by engineering and physical pragmatism to get around a “representation bottleneck,” and later they helped push the development and acceptance of modern functional analysis and weak-derivative ideas.**

So I have only one sentence about mathematics: if somebody has already invented it, I will use it even if I do not fully understand it; if nobody has invented it, I will just make up something that works.

##### Back to the derivation

Expand the nuclear wavefunctions in the eigenstates of $\hat{H}_D$ and $\hat{H}_A$, where $\hat{H}_D\vert{}\nu\rangle = E_{D\nu}\vert{}\nu\rangle$ and $\hat{H}_A\vert{}\mu\rangle = E_{A\mu}\vert{}\mu\rangle$. The Boltzmann population is $P_\nu = \langle \nu \vert{} \hat{\rho}_0 \vert{} \nu \rangle$. Inserting the acceptor completeness relation $\sum_\mu \vert{}\mu\rangle\langle \mu\vert{} = \hat{I}$, the rate equation becomes

$$
k = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^\infty d\tau \sum_{\nu, \mu} P_\nu \langle \nu \vert{} e^{-i\hat{H}_A \tau/\hbar} \vert{}\mu\rangle \langle \mu \vert{} e^{i\hat{H}_D \tau/\hbar} \vert{}\nu\rangle
$$

### Step 1: Let the operators act on the eigenstates and pull out the pure phase factors

First, look at the part containing the Hamiltonian operators:

$$
\langle \nu \vert{} e^{-i\hat{H}_A \tau/\hbar} \vert{}\mu\rangle \langle \mu \vert{} e^{i\hat{H}_D \tau/\hbar} \vert{}\nu\rangle
$$

Because $\vert{}\nu\rangle$ is an eigenstate of the donor Hamiltonian $\hat{H}_D$ and $\vert{}\mu\rangle$ is an eigenstate of the acceptor Hamiltonian $\hat{H}_A$, the Taylor expansion tells us that when an exponential operator acts on its eigenstate, we can replace the operator by its eigenvalue, which is now just a scalar energy:

- $e^{i\hat{H}_D \tau/\hbar} \vert{}\nu\rangle = e^{i E_{D\nu} \tau/\hbar} \vert{}\nu\rangle$

- Similarly, because the operator is Hermitian, when it acts to the left on the bra, the term $\langle \nu \vert{} e^{-i\hat{H}_A \tau/\hbar}$ picks up the factor $e^{-i E_{A\mu} \tau/\hbar}$ when it acts on $\vert{}\mu\rangle$.

Now $e^{i E_{D\nu} \tau/\hbar}$ and $e^{-i E_{A\mu} \tau/\hbar}$ are just **ordinary complex scalars**, or pure phase factors. We can move them outside the inner products freely. What remains is just the overlap between the two states:

$$
\left( e^{-i E_{A\mu} \tau/\hbar} \langle \nu \vert{}\mu\rangle \right) \left( e^{i E_{D\nu} \tau/\hbar} \langle \mu \vert{}\nu\rangle \right)
$$

Combining the exponential factors and using $\langle \nu \vert{}\mu\rangle \langle \mu \vert{}\nu\rangle = \vert{}\langle \mu \vert{}\nu\rangle\vert{}^2$, which is the familiar **nuclear Franck-Condon factor**, the expression becomes

$$
\vert{}\langle \mu \vert{}\nu\rangle\vert{}^2 e^{i(E_{D\nu} - E_{A\mu})\tau/\hbar}
$$

At this point, all the time evolution in $\tau$ has been collected into this pure phase factor.

Because the time dependence of the integrand now appears only in this pure phase factor, integrating over infinite time directly generates a Dirac $\delta$ function:

$$
\text{Re} \int_0^\infty d\tau e^{i(E_{D\nu} - E_{A\mu})\tau/\hbar} = \pi \hbar \delta(E_{D\nu} - E_{A\mu})
$$

Substituting this back gives the standard Fermi Golden Rule (FGR):

$$
k_{FGR} = \frac{2\pi}{\hbar} \vert{}\Gamma_{DA}\vert{}^2 \sum_{\nu, \mu} P_\nu \vert{}\langle \nu \vert{} \mu \rangle\vert{}^2 \delta(E_{D\nu} - E_{A\mu})
$$

For photoinduced charge transfer, photoexcitation is an approximately instantaneous vertical transition according to the Franck-Condon principle, so the nuclear coordinates remain at the ground-state equilibrium geometry at the instant of excitation. Therefore, the initial nuclear density matrix $\hat{\rho}_0$ does **not commute** with the donor-surface Hamiltonian $\hat{H}_D$:

$$
[\hat{\rho}_0, \hat{H}_D] \neq 0
$$

This means the system is not in a stationary state on the donor surface. The nuclear density matrix therefore evolves out of equilibrium with time:

$$
\hat{\rho}_D(t') = e^{-i\hat{H}_D t'/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t'/\hbar} \neq \hat{\rho}_0
$$

Now replace the time variable $t$ in the transient-rate expression we derived above by the nonequilibrium relaxation time $t'$. From here, we start moving toward the path-integral formulation of the non-equilibrium Fermi Golden Rule (NE-FGR) and the linearized semiclassical (LSC) limit.

### 1. Extract the quantum time-correlation function (TCF)

The current transient-rate equation is

$$
k(t') = \frac{2}{\hbar^2} \vert{}\Gamma_{DA}\vert{}^2 \text{Re} \int_0^{t'} d\tau \text{Tr}_n \left[ e^{-i\hat{H}_D t'/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t'/\hbar} e^{-i\hat{H}_A \tau/\hbar} e^{i\hat{H}_D \tau/\hbar} \right]
$$

Using the cyclic property of the trace, $\text{Tr}[\hat{A}\hat{B}\hat{C}] = \text{Tr}[\hat{C}\hat{A}\hat{B}]$, move the rightmost factor $e^{i\hat{H}_D \tau/\hbar}$ to the far left:

$$
\text{Tr}_n \left[ e^{i\hat{H}_D \tau/\hbar} e^{-i\hat{H}_D t'/\hbar} \hat{\rho}_0 e^{i\hat{H}_D t'/\hbar} e^{-i\hat{H}_A \tau/\hbar} \right]
$$

Combine the two donor evolution operators on the far left, $e^{i\hat{H}_D \tau/\hbar} e^{-i\hat{H}_D t'/\hbar} = e^{-i\hat{H}_D (t'-\tau)/\hbar}$, and then use the cyclic property again to put $\hat{\rho}_0$ on the far left:

$$
C(t', \tau) = \text{Tr}_n \left[ \hat{\rho}_0 e^{i\hat{H}_D t'/\hbar} e^{-i\hat{H}_A \tau/\hbar} e^{-i\hat{H}_D (t'-\tau)/\hbar} \right]
$$

This equation gives us a very clear picture of three separate pieces of coherence-time evolution: **forward propagation, forward propagation on the acceptor, and backward propagation**.

### 2. Insert complete bases and build the path integral

To calculate the trace of this purely nuclear operator, we insert four complete sets of position eigenstates, $\int dx \vert{}x\rangle\langle x\vert{} = \hat{I}$, and turn the operators into matrix elements in coordinate space:

$$
C(t', \tau) = \int dx_0 dy_0 dy_1 dx_1 \langle x_0 \vert{} \hat{\rho}_0 \vert{} y_0 \rangle \langle y_0 \vert{} e^{i\hat{H}_D t'/\hbar} \vert{} y_1 \rangle \langle y_1 \vert{} e^{-i\hat{H}_A \tau/\hbar} \vert{} x_1 \rangle \langle x_1 \vert{} e^{-i\hat{H}_D (t'-\tau)/\hbar} \vert{} x_0 \rangle
$$

where

- **$\vert{}x\rangle$ and $\vert{}y\rangle$:** These are eigenstates of the nuclear position operator, in the position representation. In this context, they represent specific arrangements of **all the nuclei** in the reacting system, including solvent molecules, the molecular framework of the reactant, and so on, in a multidimensional space.

- **$x_0, y_0, x_1, y_1$:** These are the **continuous eigenvalues** of those position operators, meaning actual spatial coordinates. Because we are dealing with a macroscopic or mesoscopic system containing many atoms, $x$ is really a high-dimensional vector, $\vec{x} = (r_1, r_2, \dots, r_N)$, describing the geometry of the whole system.

Let us go through the physical meaning of each piece above.

**$\langle x_0 \vert{} \hat{\rho}_0 \vert{} y_0 \rangle$ (initial nuclear density matrix):** At $t=0$, this tells us how much the nuclear system described by the density operator $\hat{\rho}_0$, after being projected onto the configuration $y_0$, overlaps with $x_0$. If $x_0 = y_0$, it becomes the classical probability of finding the system in that initial configuration.

**$\langle x_1 \vert{} e^{-i\hat{H}_D (t'-\tau)/\hbar} \vert{} x_0 \rangle$ (forward propagation of the ket on the donor):** This is a quantum propagator. It tells us the probability amplitude for the nuclei to start from the initial configuration $x_0$, evolve on the **donor potential-energy surface** for a time $t'-\tau$, and arrive at the intermediate configuration $x_1$.

**$\langle y_0 \vert{} e^{i\hat{H}_D t'/\hbar} \vert{} y_1 \rangle$ (evolution of the bra on the donor):** Notice the positive sign in the exponent. No transition happens here. The system stays on the **donor potential-energy surface** and evolves for the full time $t'$, while the nuclear configuration effectively goes “backward” from $y_1$ to $y_0$.

And with this many paths, it would almost be a waste not to use Feynman path integrals.

Combining the actions of these paths, where the action is $S = \int L dt$, the full time-correlation function can be written as a functional integral over all possible paths $x(t)$ and $y(t)$:

$$
C(t', \tau) = \int \mathcal{D}x \int \mathcal{D}y \langle x_0 \vert{} \hat{\rho}_0 \vert{} y_0 \rangle \exp\left[ \frac{i}{\hbar} \Delta S \right]
$$

The **difference in action** $\Delta S$ between the forward and backward paths is exactly

$$
\Delta S = \int_0^{t'-\tau} L_D(x, \dot{x}) dt + \int_{t'-\tau}^{t'} L_A(x, \dot{x}) dt - \int_0^{t'} L_D(y, \dot{y}) dt
$$

I will stop here for now. I am going to look at the solution for a while—my head is spinning.

I will stop here for now. I am going to look at the solution for a while—my head is spinning.
