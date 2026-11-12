---
id: "tin-hieu-he-thong.william-hamilton-1805-1865"
doc_id: "tin-hieu-he-thong"
title: "William Hamilton 1805\u20131865"
level: 2
heading_path: ["Sampling Methods", "William Hamilton 1805\u20131865"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-5-1-dynamical-systems"
next_id: "tin-hieu-he-thong.11-5-2-hybrid-monte-carlo"
block_ids: ["b6035", "b6036", "b6037", "b6038", "b6039", "b6040", "b6041", "b6042", "b6043", "b6044", "b6045", "b6046", "b6047", "b6048", "b6049", "b6050", "b6051", "b6052", "b6053", "b6054", "b6055", "b6056", "b6057"]
---

## William Hamilton 1805–1865

William Rowan Hamilton was an Irish mathematician and physicist, and child prodigy, who was appointed Professor of Astronomy at Trinity College, Dublin, in 1827, before he had even graduated. One of Hamilton’s most important contributions was a new formulation of dynamics, which played a significant role in the later development of quantum mechanics.

His other great achievement was the development of , which generalize the concept of complex numbers by introducing three distinct square roots of minus one, which satisfy $i ^ { 2 } = j ^ { 2 } = k ^ { 2 } \stackrel { \cdot } { = } i j k = - 1 .$ It is said that these equations occurred to him while walking along the Royal Canal in Dublin with his wife, on 16 October 1843, and he promptly carved the equations into the side of Broome bridge. Although there is no longer any evidence of the carving, there is now a stone plaque on the bridge commemorating the discovery and displaying the quaternion equations.

During the evolution of this dynamical system, the value of the Hamiltonian H is constant, as is easily seen by differentiation

\begin{array}{r c l} \frac {\mathrm{d} H}{\mathrm{d} \tau} & = & \sum_ {i} \left\{\frac {\partial H}{\partial z _ {i}} \frac {\mathrm{d} z _ {i}}{\mathrm{d} \tau} + \frac {\partial H}{\partial r _ {i}} \frac {\mathrm{d} r _ {i}}{\mathrm{d} \tau} \right\} \\ & = & \sum_ {i} \left\{\frac {\partial H}{\partial z _ {i}} \frac {\partial H}{\partial r _ {i}} - \frac {\partial H}{\partial r _ {i}} \frac {\partial H}{\partial z _ {i}} \right\} = 0. \end{array}\tag{11.60}

A second important property of Hamiltonian dynamical systems, known as $L i -$ ouville’s Theorem, is that they preserve volume in phase space. In other words, if we consider a region within the space of variables $( \mathbf { z } , \mathbf { r } )$ , then as this region evolves under the equations of Hamiltonian dynamics, its shape may change but its volume will not. This can be seen by noting that the flow field (rate of change of location in phase space) is given by

\mathbf {V} = \left(\frac {\mathrm{d} \mathbf {z}}{\mathrm{d} \tau}, \frac {\mathrm{d} \mathbf {r}}{\mathrm{d} \tau}\right)\tag{11.61}

and that the divergence of this field vanishes

\begin{array}{r c l} \operatorname{div} \mathbf {V} & = & \sum_ {i} \left\{\frac {\partial}{\partial z _ {i}} \frac {\mathrm{d} z _ {i}}{\mathrm{d} \tau} + \frac {\partial}{\partial r _ {i}} \frac {\mathrm{d} r _ {i}}{\mathrm{d} \tau} \right\} \\ & = & \sum_ {i} \left\{- \frac {\partial}{\partial z _ {i}} \frac {\partial H}{\partial r _ {i}} + \frac {\partial}{\partial r _ {i}} \frac {\partial H}{\partial z _ {i}} \right\} = 0. \end{array}\tag{11.62}

Now consider the joint distribution over phase space whose total energy is the Hamiltonian, i.e., the distribution given by

p (\mathbf {z}, \mathbf {r}) = \frac {1}{Z _ {H}} \exp (- H (\mathbf {z}, \mathbf {r})).\tag{11.63}

Using the two results of conservation of volume and conservation of H, it follows that the Hamiltonian dynamics will leave $p ( \mathbf { z } , \mathbf { r } )$ invariant. This can be seen by considering a small region of phase space over which H is approximately constant. If we follow the evolution of the Hamiltonian equations for a finite time, then the volume of this region will remain unchanged as will the value of H in this region, and hence the probability density, which is a function only of H, will also be unchanged.

Although H is invariant, the values of z and r will vary, and so by integrating the Hamiltonian dynamics over a finite time duration it becomes possible to make large changes to z in a systematic way that avoids random walk behaviour.

Evolution under the Hamiltonian dynamics will not, however, sample ergodically from $p ( \mathbf { z } , \mathbf { r } )$ because the value of H is constant. In order to arrive at an ergodic sampling scheme, we can introduce additional moves in phase space that change the value of H while also leaving the distribution $p ( \mathbf { z } , \mathbf { r } )$ invariant. The simplest way to achieve this is to replace the value of r with one drawn from its distribution conditioned on z. This can be regarded as a Gibbs sampling step, and hence from

Exercise 11.16

Section 11.3 we see that this also leaves the desired distribution invariant. Noting that z and r are independent in the distribution $p ( \mathbf { z } , \mathbf { r } )$ , we see that the conditional distribution $p ( \mathbf { r } | \mathbf { z } )$ is a Gaussian from which it is straightforward to sample.

In a practical application of this approach, we have to address the problem of performing a numerical integration of the Hamiltonian equations. This will necessarily introduce numerical errors and so we should devise a scheme that minimizes the impact of such errors. In fact, it turns out that integration schemes can be devised for which Liouville’s theorem still holds exactly. This property will be important in the hybrid Monte Carlo algorithm, which is discussed in Section 11.5.2. One scheme for achieving this is called the leapfrog discretization and involves alternately updating discrete-time approximations $\widehat { \mathbf { z } }$ and $\widehat { \mathbf { r } }$ to the position and momentum variables using

\widehat {r} _ {i} (\tau + \epsilon / 2) = \widehat {r} _ {i} (\tau) - \frac {\epsilon}{2} \frac {\partial E}{\partial z _ {i}} (\widehat {\mathbf {z}} (\tau))\tag{11.64}

\widehat {z} _ {i} (\tau + \epsilon) = \widehat {z} _ {i} (\tau) + \epsilon \widehat {r} _ {i} (\tau + \epsilon / 2)\tag{11.65}

\widehat {r} _ {i} (\tau + \epsilon) = \widehat {r} _ {i} (\tau + \epsilon / 2) - \frac {\epsilon}{2} \frac {\partial E}{\partial z _ {i}} (\widehat {\mathbf {z}} (\tau + \epsilon)).\tag{11.66}

We see that this takes the form of a half-step update of the momentum variables with step size $\epsilon / 2$ , followed by a full-step update of the position variables with step size , followed by a second half-step update of the momentum variables. If several leapfrog steps are applied in succession, it can be seen that half-step updates to the momentum variables can be combined into full-step updates with step size $\epsilon .$ The successive updates to position and momentum variables then leapfrog over each other. In order to advance the dynamics by a time interval $\tau _ { \ast }$ , we need to take $\tau / \epsilon$ steps. The error involved in the discretized approximation to the continuous time dynamics will go to zero, assuming a smooth function $E ( \mathbf { z } )$ , in the limit $\epsilon \to 0$ . However, for a nonzero  as used in practice, some residual error will remain. We shall see in Section 11.5.2 how the effects of such errors can be eliminated in the hybrid Monte Carlo algorithm.

In summary then, the Hamiltonian dynamical approach involves alternating between a series of leapfrog updates and a resampling of the momentum variables from their marginal distribution.

Note that the Hamiltonian dynamics method, unlike the basic Metropolis algorithm, is able to make use of information about the gradient of the log probability distribution as well as about the distribution itself. An analogous situation is familiar from the domain of function optimization. In most cases where gradient information is available, it is highly advantageous to make use of it. Informally, this follows from the fact that in a space of dimension D, the additional computational cost of evaluating a gradient compared with evaluating the function itself will typically be a fixed factor independent of $D _ { : }$ , whereas the D-dimensional gradient vector conveys D pieces of information compared with the one piece of information given by the function itself.
