---
title: "Coordinate Transformations in Robot Automatic Aiming"
date: 2026-09-14
description: "Notes on coordinate transformations and target tracking in RoboMaster."

categories:
  - Rotate
  - Robot Vision

lang: en
translation-key: Robot-vision-and-automatic-aiming
status: working
draft: false
---

# Camera-Based Automatic Aiming

## Interactive Demo of the Automatic Aiming System (Click to Open)

You can drag the target and see its calculated projection on the camera screen.

<a href="../files/robo/robomaster_coordinate_transform_matrix_tracker_latest_version.html" target="_blank"> Open ↗ </a>

<a href="../files/robo/robomaster_coordinate_transform_matrix_tracker_latest_version.html" download> Download HTML ↓ </a>\[1\]

In **RoboMaster** competitions, we often need to use **coordinate transformations** to identify, locate, and automatically aim at targets that move and rotate at high speed.

This was a robotics competition project that I worked on during my undergraduate studies. I mainly worked on mechanical design and some electronic engineering.

The part I was most satisfied with was a compact **gimbal structure**. By arranging the mass distribution and center of gravity carefully, the system stayed stable while still keeping a small size and good motion performance.

Later, when I studied molecular spectroscopy in **SFG/SHS** experiments, I noticed that some of the ideas are similar to those in a robot automatic aiming system. **[Wigner-Eckart theorem in SFG](SFG_QM math-cleaned-v2.en.md)**

At least in the last step, the similarity is quite direct: in spectroscopy, we transform quantities from the molecular coordinate system to the laboratory coordinate system. In robot automatic aiming, we also transform the target from the camera coordinate system to the reference coordinate system used by the robot controller.

**In experiments, we use spectroscopic information to describe the molecular coordinate system, and then use coordinate transformations to move into the laboratory coordinate system. In RoboMaster automatic aiming, we do something similar: we transform the target position from the camera coordinate system into the reference coordinate system used by the robot control system.**

So I reorganized this automatic aiming system into an interactive HTML file based on the basic idea of **matrix transformations**. It shows coordinate transformations, rotation matrices, and the target-tracking process.

This also gives an intuitive starting point for understanding **ZYZ Euler-angle rotations**, **D matrices**, **Wigner d matrices**, and the **Wigner-Eckart theorem** in spherical coordinates. **[SO(3) Neural Networks](SO(3)-Equivariant Graph Neural Networks_new.en.md)**

If you want to see the related references, jump to the end of this note:

[Go to the references ↓](#references)

![](../assets/images/robo/1.png)

![](../assets/images/robo/2.png)

Two competition videos are placed here.\[3\]\[4\]

------------------------------------------------------------------------

## Connection to SO(3) and Coordinate-System Choices in SHS/SFG

This automatic aiming project can be understood in the following way:

**The camera first sees the position and size of the target in a two-dimensional image. Then, using the camera model and coordinate transformations, the pixel information is converted into a target direction or spatial position in the camera coordinate system. Finally, this result is transformed into the gimbal or robot coordinate system, so we can calculate how much the gimbal needs to rotate to lock onto the target again.**

If the real size of the target is known, its size in the image can also provide distance information.

Under the simplest pinhole-camera approximation, if the real target size is $(L)$, the focal length is $(f)$, and the projected size in the image is $(l)$, then the depth can be approximated as

$$
Z \approx \frac{fL}{l}.
$$

More generally, the projection from three-dimensional coordinates to two-dimensional image coordinates can be written as

$$
s
\begin{pmatrix}
u\\
v\\
1
\end{pmatrix}
=
K
\begin{pmatrix}
R & \mathbf{t}
\end{pmatrix}
\begin{pmatrix}
X\\
Y\\
Z\\
1
\end{pmatrix},
$$

where $(K)$ is the camera intrinsic matrix, $(R)$ is the rotation matrix, and $(\mathbf{t})$ is the translation vector.

When the target position in the camera coordinate system is further transformed into the gimbal or robot reference coordinate system, we can write

$$
\mathbf{r}_{\mathrm{robot}}
=
R_{\mathrm{robot}\leftarrow\mathrm{camera}}
\mathbf{r}_{\mathrm{camera}}
+
\mathbf{t}_{\mathrm{robot}\leftarrow\mathrm{camera}},
$$

where the rotation part satisfies

$$
R_{\mathrm{robot}\leftarrow\mathrm{camera}} \in SO(3),
\qquad
R^{T}R=I,
\qquad
\det R=1.
$$

So the direct connection between automatic aiming and **SO(3)** is simple:

**The changes in direction between the gimbal, camera, and target are all rotations in three-dimensional space. The transformation between different coordinate systems is described by rotation matrices in $SO(3)$.**

This mathematical structure is very similar to the choice of molecular and laboratory coordinate systems in **SHS/SFG**.

For example, when the second-order hyperpolarizability tensor $\beta_{ijk}^{\mathrm{mol}}$ in the molecular coordinate system is transformed into the laboratory coordinate system, we can write

$$
\beta_{IJK}^{\mathrm{lab}}
=
\sum_{ijk}
R_{Ii}R_{Jj}R_{Kk}
\beta_{ijk}^{\mathrm{mol}}.
$$

If we use spherical tensors instead, the same rotation can be written as

$$
T_{m}^{(l),\mathrm{lab}}
=
\sum_{m'}
D_{mm'}^{(l)}(R)
T_{m'}^{(l),\mathrm{mol}},
$$

where $D_{mm'}^{(l)}(R)$ is the **Wigner $D$ matrix**.

So the real similarity is not between "cameras" and "spectroscopy" themselves.

The important point is this:

**We first describe an object in the local coordinate system that is most natural for that object. Then we use an $SO(3)$ rotation to transform the quantities into the coordinate system that is actually used by the laboratory setup or the control system.**

The difference is in what we transform.

In automatic aiming, we mainly transform geometric quantities such as target position and direction, and finally solve for yaw and pitch control values.

In SHS/SFG, we mainly transform tensors such as molecular dipole moments, polarizabilities, and hyperpolarizabilities. We also usually need to average over the molecular orientation distribution.

So coordinate transformations in robotics can be used as a very intuitive classical analogy for understanding the path in SHS/SFG:

**molecular coordinate system → laboratory coordinate system → polarization-dependent observable**

------------------------------------------------------------------------

# References

\[1\] Interactive HTML for the automatic aiming system: `../files/robo/robomaster_coordinate_transform_matrix_tracker_latest_version.html`

\[2\] RoboMaster official channel:\
https://www.youtube.com/@RoboMaster/featured

\[3\] Competition video 1:\
https://www.bilibili.com/video/BV1nX9kBxEaN/

\[4\] Competition video 2:\
https://www.bilibili.com/video/BV1JconBaEkC/
