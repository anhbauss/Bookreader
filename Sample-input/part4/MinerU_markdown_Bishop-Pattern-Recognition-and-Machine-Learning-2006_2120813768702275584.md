During the evolution of this dynamical system, the value of the Hamiltonian H is constant, as is easily seen by differentiation 

$$
\begin{array}{r c l} \frac {\mathrm{d} H}{\mathrm{d} \tau} & = & \sum_ {i} \left\{\frac {\partial H}{\partial z _ {i}} \frac {\mathrm{d} z _ {i}}{\mathrm{d} \tau} + \frac {\partial H}{\partial r _ {i}} \frac {\mathrm{d} r _ {i}}{\mathrm{d} \tau} \right\} \\ & = & \sum_ {i} \left\{\frac {\partial H}{\partial z _ {i}} \frac {\partial H}{\partial r _ {i}} - \frac {\partial H}{\partial r _ {i}} \frac {\partial H}{\partial z _ {i}} \right\} = 0. \end{array}\tag{11.60}
$$

A second important property of Hamiltonian dynamical systems, known as $L i -$ ouville’s Theorem, is that they preserve volume in phase space. In other words, if we consider a region within the space of variables $( \mathbf { z } , \mathbf { r } )$ , then as this region evolves under the equations of Hamiltonian dynamics, its shape may change but its volume will not. This can be seen by noting that the flow field (rate of change of location in phase space) is given by 

$$
\mathbf {V} = \left(\frac {\mathrm{d} \mathbf {z}}{\mathrm{d} \tau}, \frac {\mathrm{d} \mathbf {r}}{\mathrm{d} \tau}\right)\tag{11.61}
$$

and that the divergence of this field vanishes 

$$
\begin{array}{r c l} \operatorname{div} \mathbf {V} & = & \sum_ {i} \left\{\frac {\partial}{\partial z _ {i}} \frac {\mathrm{d} z _ {i}}{\mathrm{d} \tau} + \frac {\partial}{\partial r _ {i}} \frac {\mathrm{d} r _ {i}}{\mathrm{d} \tau} \right\} \\ & = & \sum_ {i} \left\{- \frac {\partial}{\partial z _ {i}} \frac {\partial H}{\partial r _ {i}} + \frac {\partial}{\partial r _ {i}} \frac {\partial H}{\partial z _ {i}} \right\} = 0. \end{array}\tag{11.62}
$$

Now consider the joint distribution over phase space whose total energy is the Hamiltonian, i.e., the distribution given by 

$$
p (\mathbf {z}, \mathbf {r}) = \frac {1}{Z _ {H}} \exp (- H (\mathbf {z}, \mathbf {r})).\tag{11.63}
$$

Using the two results of conservation of volume and conservation of H, it follows that the Hamiltonian dynamics will leave $p ( \mathbf { z } , \mathbf { r } )$ invariant. This can be seen by considering a small region of phase space over which H is approximately constant. If we follow the evolution of the Hamiltonian equations for a finite time, then the volume of this region will remain unchanged as will the value of H in this region, and hence the probability density, which is a function only of H, will also be unchanged. 

Although H is invariant, the values of z and r will vary, and so by integrating the Hamiltonian dynamics over a finite time duration it becomes possible to make large changes to z in a systematic way that avoids random walk behaviour. 

Evolution under the Hamiltonian dynamics will not, however, sample ergodically from $p ( \mathbf { z } , \mathbf { r } )$ because the value of H is constant. In order to arrive at an ergodic sampling scheme, we can introduce additional moves in phase space that change the value of H while also leaving the distribution $p ( \mathbf { z } , \mathbf { r } )$ invariant. The simplest way to achieve this is to replace the value of r with one drawn from its distribution conditioned on z. This can be regarded as a Gibbs sampling step, and hence from 

Exercise 11.16 

Section 11.3 we see that this also leaves the desired distribution invariant. Noting that z and r are independent in the distribution $p ( \mathbf { z } , \mathbf { r } )$ , we see that the conditional distribution $p ( \mathbf { r } | \mathbf { z } )$ is a Gaussian from which it is straightforward to sample. 

In a practical application of this approach, we have to address the problem of performing a numerical integration of the Hamiltonian equations. This will necessarily introduce numerical errors and so we should devise a scheme that minimizes the impact of such errors. In fact, it turns out that integration schemes can be devised for which Liouville’s theorem still holds exactly. This property will be important in the hybrid Monte Carlo algorithm, which is discussed in Section 11.5.2. One scheme for achieving this is called the leapfrog discretization and involves alternately updating discrete-time approximations $\widehat { \mathbf { z } }$ and $\widehat { \mathbf { r } }$ to the position and momentum variables using 

$$
\widehat {r} _ {i} (\tau + \epsilon / 2) = \widehat {r} _ {i} (\tau) - \frac {\epsilon}{2} \frac {\partial E}{\partial z _ {i}} (\widehat {\mathbf {z}} (\tau))\tag{11.64}
$$

$$
\widehat {z} _ {i} (\tau + \epsilon) = \widehat {z} _ {i} (\tau) + \epsilon \widehat {r} _ {i} (\tau + \epsilon / 2)\tag{11.65}
$$

$$
\widehat {r} _ {i} (\tau + \epsilon) = \widehat {r} _ {i} (\tau + \epsilon / 2) - \frac {\epsilon}{2} \frac {\partial E}{\partial z _ {i}} (\widehat {\mathbf {z}} (\tau + \epsilon)).\tag{11.66}
$$

We see that this takes the form of a half-step update of the momentum variables with step size $\epsilon / 2$ , followed by a full-step update of the position variables with step size , followed by a second half-step update of the momentum variables. If several leapfrog steps are applied in succession, it can be seen that half-step updates to the momentum variables can be combined into full-step updates with step size $\epsilon .$ The successive updates to position and momentum variables then leapfrog over each other. In order to advance the dynamics by a time interval $\tau _ { \ast }$ , we need to take $\tau / \epsilon$ steps. The error involved in the discretized approximation to the continuous time dynamics will go to zero, assuming a smooth function $E ( \mathbf { z } )$ , in the limit $\epsilon \to 0$ . However, for a nonzero  as used in practice, some residual error will remain. We shall see in Section 11.5.2 how the effects of such errors can be eliminated in the hybrid Monte Carlo algorithm. 

In summary then, the Hamiltonian dynamical approach involves alternating between a series of leapfrog updates and a resampling of the momentum variables from their marginal distribution. 

Note that the Hamiltonian dynamics method, unlike the basic Metropolis algorithm, is able to make use of information about the gradient of the log probability distribution as well as about the distribution itself. An analogous situation is familiar from the domain of function optimization. In most cases where gradient information is available, it is highly advantageous to make use of it. Informally, this follows from the fact that in a space of dimension D, the additional computational cost of evaluating a gradient compared with evaluating the function itself will typically be a fixed factor independent of $D _ { : }$ , whereas the D-dimensional gradient vector conveys D pieces of information compared with the one piece of information given by the function itself. 

## 11.5.2 Hybrid Monte Carlo

As we discussed in the previous section, for a nonzero step size $\epsilon ,$ the discretization of the leapfrog algorithm will introduce errors into the integration of the Hamiltonian dynamical equations. Hybrid Monte Carlo (Duane et al., 1987; Neal, 1996) combines Hamiltonian dynamics with the Metropolis algorithm and thereby removes any bias associated with the discretization. 

Specifically, the algorithm uses a Markov chain consisting of alternate stochastic updates of the momentum variable r and Hamiltonian dynamical updates using the leapfrog algorithm. After each application of the leapfrog algorithm, the resulting candidate state is accepted or rejected according to the Metropolis criterion based on the value of the Hamiltonian $H$ . Thus if $( \mathbf { z } , \mathbf { r } )$ is the initial state and $\left( \mathbf { z } ^ { \star } , \mathbf { r } ^ { \star } \right)$ is the state after the leapfrog integration, then this candidate state is accepted with probability 

$$
\min \left(1, \exp \{H (\mathbf {z}, \mathbf {r}) - H (\mathbf {z} ^ {\star}, \mathbf {r} ^ {\star}) \}\right).\tag{11.67}
$$

If the leapfrog integration were to simulate the Hamiltonian dynamics perfectly, then every such candidate step would automatically be accepted because the value of H would be unchanged. Due to numerical errors, the value of $H$ may sometimes decrease, and we would like the Metropolis criterion to remove any bias due to this effect and ensure that the resulting samples are indeed drawn from the required distribution. In order for this to be the case, we need to ensure that the update equations corresponding to the leapfrog integration satisfy detailed balance (11.40). This is easily achieved by modifying the leapfrog scheme as follows. 

Before the start of each leapfrog integration sequence, we choose at random, with equal probability, whether to integrate forwards in time (using step size $\epsilon )$ or backwards in time (using step size ). We first note that the leapfrog integration scheme (11.64), (11.65), and (11.66) is time-reversible, so that integration for $L$ steps using step size $- \epsilon$ will exactly undo the effect of integration for $L$ steps using step size $\epsilon .$ Next we show that the leapfrog integration preserves phase-space volume exactly. This follows from the fact that each step in the leapfrog scheme updates either a $z _ { i }$ variable or an $r _ { i }$ variable by an amount that is a function only of the other variable. As shown in Figure 11.14, this has the effect of shearing a region of phase space while not altering its volume. 

Finally, we use these results to show that detailed balance holds. Consider a small region $\mathcal { R }$ of phase space that, under a sequence of $L$ leapfrog iterations of step size $\epsilon ,$ maps to a region $\mathcal { R } ^ { \prime }$ . Using conservation of volume under the leapfrog iteration, we see that if $\mathcal { R }$ has volume $\delta \bar { V }$ then so too will $\mathcal { R } ^ { \prime }$ . If we choose an initial point from the distribution (11.63) and then update it using $L$ leapfrog interactions, the probability of the transition going from $\mathcal { R }$ to $\mathcal { R } ^ { \prime }$ is given by 

$$
\frac {1}{Z _ {H}} \exp (- H (\mathcal {R})) \delta V \frac {1}{2} \min \left\{1, \exp (- H (\mathcal {R}) + H (\mathcal {R} ^ {\prime})) \right\}.\tag{11.68}
$$

where the factor of $1 / 2$ arises from the probability of choosing to integrate with a positive step size rather than a negative one. Similarly, the probability of starting in region $\mathcal { R } ^ { \prime }$ and integrating backwards in time to end up in region $\mathcal { R }$ is given by 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/d4c1f688bc7e9c4de20a819d0672d7e65311268950f3f6f791c29e338b920986.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/39473787f5c529bdd85a8202c5861018d840c55aca6ec085fe66019dc007b388.jpg)



Figure 11.14 Each step of the leapfrog algorithm (11.64)–(11.66) modifies either a position variable $z _ { i }$ or a momentum variable $r _ { i }$ . Because the change to one variable is a function only of the other, any region in phase space will be sheared without change of volume.


$$
\frac {1}{Z _ {H}} \exp (- H (\mathcal {R} ^ {\prime})) \delta V \frac {1}{2} \min \left\{1, \exp (- H (\mathcal {R} ^ {\prime}) + H (\mathcal {R})) \right\}.\tag{11.69}
$$

Exercise 11.17 

It is easily seen that the two probabilities (11.68) and (11.69) are equal, and hence detailed balance holds. Note that this proof ignores any overlap between the regions $\mathcal { R }$ and $\mathcal { R } ^ { \prime }$ but is easily generalized to allow for such overlap. 

It is not difficult to construct examples for which the leapfrog algorithm returns to its starting position after a finite number of iterations. In such cases, the random replacement of the momentum values before each leapfrog integration will not be sufficient to ensure ergodicity because the position variables will never be updated. Such phenomena are easily avoided by choosing the magnitude of the step size at random from some small interval, before each leapfrog integration. 

We can gain some insight into the behaviour of the hybrid Monte Carlo algorithm by considering its application to a multivariate Gaussian. For convenience, consider a Gaussian distribution $p ( \mathbf { z } )$ with independent components, for which the Hamiltonian is given by 

$$
H (\mathbf {z}, \mathbf {r}) = \frac {1}{2} \sum_ {i} \frac {1}{\sigma_ {i} ^ {2}} z _ {i} ^ {2} + \frac {1}{2} \sum_ {i} r _ {i} ^ {2}.\tag{11.70}
$$

Our conclusions will be equally valid for a Gaussian distribution having correlated components because the hybrid Monte Carlo algorithm exhibits rotational isotropy. During the leapfrog integration, each pair of phase-space variables $z _ { i } , r _ { i }$ evolves independently. However, the acceptance or rejection of the candidate point is based on the value of $H _ { \cdot }$ , which depends on the values of all of the variables. Thus, a significant integration error in any one of the variables could lead to a high probability of rejection. In order that the discrete leapfrog integration be a reasonably good approximation to the true continuous-time dynamics, it is necessary for the leapfrog integration scale  to be smaller than the shortest length-scale over which the potential is varying significantly. This is governed by the smallest value of $\sigma _ { i }$ which we denote by $\sigma _ { \mathrm { m i n } }$ . Recall that the goal of the leapfrog integration in hybrid Monte Carlo is to move a substantial distance through phase space to a new state that is relatively independent of the initial state and still achieve a high probability of acceptance. In order to achieve this, the leapfrog integration must be continued for a number of iterations of order ${ \sigma _ { \operatorname* { m a x } } } / { \sigma _ { \operatorname* { m i n } } }$ 

By contrast, consider the behaviour of a simple Metropolis algorithm with an isotropic Gaussian proposal distribution of variance $s ^ { 2 }$ , considered earlier. In order to avoid high rejection rates, the value of s must be of order $\sigma _ { \mathrm { m i n } }$ . The exploration of state space then proceeds by a random walk and takes of order $( \sigma _ { \operatorname* { m a x } } / \sigma _ { \operatorname* { m i n } } ) ^ { 2 }$ steps to arrive at a roughly independent state. 

## 11.6. Estimating the Partition Function

As we have seen, most of the sampling algorithms considered in this chapter require only the functional form of the probability distribution up to a multiplicative constant. Thus if we write 

$$
p _ {E} (\mathbf {z}) = \frac {1}{Z _ {E}} \exp (- E (\mathbf {z}))\tag{11.71}
$$

then the value of the normalization constant $Z _ { E }$ , also known as the partition function, is not needed in order to draw samples from $p ( \mathbf { z } )$ . However, knowledge of the value of $Z _ { E }$ can be useful for Bayesian model comparison since it represents the model evidence (i.e., the probability of the observed data given the model), and so it is of interest to consider how its value might be obtained. We assume that direct evaluation by summing, or integrating, the function $\exp ( - E ( \mathbf { z } ) )$ over the state space of z is intractable. 

For model comparison, it is actually the ratio of the partition functions for two models that is required. Multiplication of this ratio by the ratio of prior probabilities gives the ratio of posterior probabilities, which can then be used for model selection or model averaging. 

One way to estimate a ratio of partition functions is to use importance sampling from a distribution with energy function $G ( \mathbf { z } )$ 

$$
\begin{array}{r c l} \frac {Z _ {E}}{Z _ {G}} & = & \frac {\sum_ {\mathbf {z}} \exp (- E (\mathbf {z}))}{\sum_ {\mathbf {z}} \exp (- G (\mathbf {z}))} \\ & = & \frac {\sum_ {\mathbf {z}} \exp (- E (\mathbf {z}) + G (\mathbf {z})) \exp (- G (\mathbf {z}))}{\sum_ {\mathbf {z}} \exp (- G (\mathbf {z}))} \\ & = & \mathbb {E} _ {G (\mathbf {z})} [ \exp (- E + G) ] \\ & \simeq & \sum_ {l} \exp (- E (\mathbf {z} ^ {(l)}) + G (\mathbf {z} ^ {(l)})) \end{array}\tag{11.72}
$$

where $\{ \mathbf { z } ^ { ( l ) } \}$ are samples drawn from the distribution defined by $p _ { G } ( \mathbf { z } )$ . If the distribution $p _ { G }$ is one for which the partition function can be evaluated analytically, for example a Gaussian, then the absolute value of $Z _ { E }$ can be obtained. 

This approach will only yield accurate results if the importance sampling distribution $p _ { G }$ is closely matched to the distribution $p _ { E }$ , so that the ratio $p _ { E } / p _ { G }$ does not have wide variations. In practice, suitable analytically specified importance sampling distributions cannot readily be found for the kinds of complex models considered in this book. 

An alternative approach is therefore to use the samples obtained from a Markov chain to define the importance-sampling distribution. If the transition probability for the Markov chain is given by $T ( \mathbf { z } , \mathbf { z } ^ { \prime } )$ , and the sample set is given by $\mathbf { \hat { z } } ^ { ( 1 ) } , \ldots , \mathbf { \hat { z } } ^ { ( L ) }$ then the sampling distribution can be written as 

$$
\frac {1}{Z _ {G}} \exp (- G (\mathbf {z})) = \sum_ {l = 1} ^ {L} T (\mathbf {z} ^ {(l)}, \mathbf {z})\tag{11.73}
$$

which can be used directly in (11.72). 

Methods for estimating the ratio of two partition functions require for their success that the two corresponding distributions be reasonably closely matched. This is especially problematic if we wish to find the absolute value of the partition function for a complex distribution because it is only for relatively simple distributions that the partition function can be evaluated directly, and so attempting to estimate the ratio of partition functions directly is unlikely to be successful. This problem can be tackled using a technique known as chaining (Neal, 1993; Barber and Bishop, 1997), which involves introducing a succession of intermediate distributions $p _ { 2 } , \ldots , p _ { M - 1 }$ that interpolate between a simple distribution $p _ { 1 } ( \mathbf { z } )$ for which we can evaluate the normalization coefficient $Z _ { 1 }$ and the desired complex distribution $p _ { M } ( \mathbf { z } )$ . We then have 

$$
\frac {Z _ {M}}{Z _ {1}} = \frac {Z _ {2}}{Z _ {1}} \frac {Z _ {3}}{Z _ {2}} \dots \frac {Z _ {M}}{Z _ {M - 1}}\tag{11.74}
$$

in which the intermediate ratios can be determined using Monte Carlo methods as discussed above. One way to construct such a sequence of intermediate systems is to use an energy function containing a continuous parameter $0 \leqslant \alpha \leqslant 1$ that interpolates between the two distributions 

$$
E _ {\alpha} (\mathbf {z}) = (1 - \alpha) E _ {1} (\mathbf {z}) + \alpha E _ {M} (\mathbf {z}).\tag{11.75}
$$

If the intermediate ratios in (11.74) are to be found using Monte Carlo, it may be more efficient to use a single Markov chain run than to restart the Markov chain for each ratio. In this case, the Markov chain is run initially for the system $p _ { 1 }$ and then after some suitable number of steps moves on to the next distribution in the sequence. Note, however, that the system must remain close to the equilibrium distribution at each stage. 

## Exercises

11.1 () www Show that the finite sample estimator $\widehat { \boldsymbol { f } }$ defined by (11.2) has mean equal to $\overline { { \mathbb { E } [ } } f ]$ and variance given by (11.3). 

11.2 () Suppose that z is a random variable with uniform distribution over $( 0 , 1 )$ and that we transform z using $y = h ^ { - 1 } ( z )$ where $h ( y )$ is given by (11.6). Show that y has the distribution $p ( y )$ . 

11.3 () Given a random variable z that is uniformly distributed over $( 0 , 1 )$ , find a transformation $y = f ( z )$ such that y has a Cauchy distribution given by (11.8). 

11.4 ( ) Suppose that $z _ { 1 }$ and $z _ { 2 }$ are uniformly distributed over the unit circle, as shown in Figure 11.3, and that we make the change of variables given by (11.10) and (11.11). Show that $( y _ { 1 } , y _ { 2 } )$ will be distributed according to (11.12). 

11.5 () www Let z be a D-dimensional random variable having a Gaussian distribution with zero mean and unit covariance matrix, and suppose that the positive definite symmetric matrix Σ has the Cholesky decomposition $\dot { \boldsymbol { \Sigma } } = \mathbf { L } \mathbf { L } ^ { \mathrm { T } }$ where L is a lowertriangular matrix (i.e., one with zeros above the leading diagonal). Show that the variable $\mathbf { y } = \pmb { \mu } + \mathbf { L z }$ has a Gaussian distribution with mean $\pmb { \mu }$ and covariance Σ. This provides a technique for generating samples from a general multivariate Gaussian using samples from a univariate Gaussian having zero mean and unit variance. 

11.6 ( ) www In this exercise, we show more carefully that rejection sampling does indeed draw samples from the desired distribution $p ( \mathbf { z } )$ . Suppose the proposal distribution is $q ( \mathbf { z } )$ and show that the probability of a sample value z being accepted is given by $\widetilde { p } ( \mathbf { z } ) / k q ( \mathbf { z } )$ where $\widetilde { p }$ is any unnormalized distribution that is proportional to $p ( \mathbf { z } )$ , and the constant k is set to the smallest value that ensures $k q ( \mathbf { z } ) \geqslant \widetilde { p } ( \mathbf { z } )$ for all values of $\mathbf { z } .$  Note that the probability of drawing a value z is given by the probability of drawing that value from $q ( \mathbf { z } )$ times the probability of accepting that value given that it has been drawn. Make use of this, along with the sum and product rules of probability, to write down the normalized form for the distribution over z, and show that it equals $p ( \mathbf { z } )$ 

11.7 () Suppose that z has a uniform distribution over the interval $[ 0 , 1 ]$ . Show that the variable $y = b$ tan $z + c$ has a Cauchy distribution given by (11.16). 

11.8 ( ) Determine expressions for the coefficients $k _ { i }$ in the envelope distribution (11.17) for adaptive rejection sampling using the requirements of continuity and normalization. 

11.9 ( ) By making use of the technique discussed in Section 11.1.1 for sampling from a single exponential distribution, devise an algorithm for sampling from the piecewise exponential distribution defined by (11.17). 

11.10 () Show that the simple random walk over the integers defined by (11.34), (11.35), and (11.36) has the property that $\mathbb { E } [ ( z ^ { ( \tau ) } ) ^ { 2 } ] = \mathbb { E } [ ( z ^ { ( \tau - 1 ) } ) ^ { 2 } ] + \bar { 1 } / 2$ and hence by induction that $\mathbb { E } [ ( z ^ { ( \tau ) } ) ^ { 2 } ] = \dot { \tau } / 2$ 

Figure 11.15 A probability distribution over two variables $z _ { 1 }$ and $z _ { 2 }$ that is uniform over the shaded regions and that is zero everywhere else. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/87da60e542a59477287ea2bcfadedb220246ca66c41305889d872f1cba96e218.jpg)


11.11 ( ) www Show that the Gibbs sampling algorithm, discussed in Section 11.3, satisfies detailed balance as defined by (11.40). 

11.12 () Consider the distribution shown in Figure 11.15. Discuss whether the standard Gibbs sampling procedure for this distribution is ergodic, and therefore whether it would sample correctly from this distribution 

11.13 ( ) Consider the simple 3-node graph shown in Figure 11.16 in which the observed node x is given by a Gaussian distribution $\mathcal { N } ( \boldsymbol { x } | \mu , \tau ^ { - 1 } )$ with mean $\mu$ and precision $\tau .$ Suppose that the marginal distributions over the mean and precision are given by $\mathcal { N } ( \mu | \mu _ { 0 } , s _ { 0 } )$ and $\mathrm { G a m } ( \tau | a , b )$ , where $\mathrm { G a m } ( \cdot | \cdot , \cdot )$ denotes a gamma distribution. Write down expressions for the conditional distributions $p ( \mu | x , \tau )$ and $p ( \tau | x , \mu )$ that would be required in order to apply Gibbs sampling to the posterior distribution $p ( \mu , \tau | x )$ 

11.14 () Verify that the over-relaxation update (11.50), in which $z _ { i }$ has mean $\mu _ { i }$ and variance $\sigma _ { i } .$ , and where ν has zero mean and unit variance, gives a value $z _ { i } ^ { \prime }$ with mean $\mu _ { i }$ and variance $\sigma _ { i } ^ { 2 }$ 

11.15 () www Using (11.56) and (11.57), show that the Hamiltonian equation (11.58) is equivalent to (11.53). Similarly, using (11.57) show that (11.59) is equivalent to (11.55). 

11.16 () By making use of (11.56), (11.57), and (11.63), show that the conditional distribution $p ( \mathbf { r } | \mathbf { z } )$ is a Gaussian. 

Figure 11.16 A graph involving an observed Gaussian variable x with prior distributions over its mean $\mu$ and precision $\tau .$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/f20b1940137f5ddd369c61c8184f7f7525ee05a63cd1d0fef91d6b93e2be4613.jpg)


11.17 () www Verify that the two probabilities (11.68) and (11.69) are equal, and hence that detailed balance holds for the hybrid Monte Carlo algorithm. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/6690f0d2876dff81af054bc0baaeba1d4220f93799410197af597f9d8461064e.jpg)


In Chapter 9, we discussed probabilistic models having discrete latent variables, such as the mixture of Gaussians. We now explore models in which some, or all, of the latent variables are continuous. An important motivation for such models is that many data sets have the property that the data points all lie close to a manifold o much lower dimensionality than that of the original data space. To see why this might arise, consider an artificial data set constructed by taking one of the off-line digits, represented by a 64 x 64 pixel grey-level image, and embedding it in a large image of size 100 x 100 by padding with pixels having the value zero (corresponding to white pixels) in which the location and orientation of the digit is varied at random, as illustrated in Figure 12.1. Each of the resulting images is represented by a point in the 100 x 100 = 10, OOO-dimensional data space. However, across a data set of such images, there are only three degrees offreedom of variability, corresponding to the vertical and horizontal translations and the rotations. The data points will therefore live on a subspace of the data space whose intrinsic dimensionality is three. Note 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/2046f66213f80d4b2496da555b49be40f0bfe55c14733ba39e6d1e75ed3425e1.jpg)


Figure 12.1 A synthetic data sel obtained by taking one of the off-line digit images and creating multi ple copies in each of which the digit has undergone a random displacement and rotation within some larger image field. The resulting images each have 100 )( 100 = 10.000 pixels. 

that the manifold will be nonlinear because. for instance. if we translate the digit past a particular pixel, that pixel value will go from zero (white) 10 one (black) and back to zero again. which is clearly a nonlinear function of the digit position. In this example. !.he lranslation and rotation parameters are latent variables because we observe only the image vectors and are not told which values of the translation or rotation variables were used to create them. 

For real digit image data, there will be a funher degree of freedom arising from scaling. Moreover there will be multiple addilional degrees of freedom associaled wilh more complex deformations due to the variability in an individual's wriling 3S well as lhe differences in writing slyles between individuals. evenheless. the number of such degrees of freedom will be small compared to the dimensionality o Ihe data set. 

Another example is provided by the oil flow data set. in which (for a given geometrical configuration of the gas, WOller, and oil phases) there are only two degrees of freedom of variability corresponding to the fraction of oil in the pipe and the fraction of water (the fraction of gas Ihen being determined). Ahhough the data space comprises 12 measuremenlS, a data set of points will lie close to a Iwo-dimensional manifold embedded within this space. In this case, the manifold comprises scveral distinct segments corresponding to different flow regimes. each such segment being a (noisy) continuous two-dimensional manifold. If our goal is data compression. or density modelling, then there can be benefits in exploiling this manifold struclUre. 

In praclice. the data points will not be confined precisely to a smooth lowdimensional manifold, and we can interpret the departures of data points from the manifold as ·noise'. This leads naturally to a generative view of such models in which we first select a poinl within the manifold according to some latent variable distribution and then generate an observed data point by :ldding noise, drawn from some conditional distribution of the data varillbles given the latent varillbles. 

Thc simplest continuous latent variable model assumes Gaussian distributions for both thc latent and observed variables and makes use of a linear,Gaussian dependence of the observed variables on Ihe slate of the latent variables. This leads to a probabilislic fonnulation of the well-known technique of principal component analysis (PeA), as well as 10 a related model called factor analysis. 

In this chapter w will begin wilh a slandard, nonprobabilistic treatment of PeA. and thcn we show how PeA arises naturally as the maximum likelihood solution 10 

P'if>cipal compooont a",,~" seeks" $pace 01 !owe, dimensionality. kt"(>WIl as !he P<lno> pal subSpace "nd denoted I:Jy the magenta line. SUCh Itlet the Grthogonet [jiojectiOh 01 !he data points ('ed doIsl onto tP'Ns """'imizes the varia,..,., of !he proja<:ted points (green doIs). An "It",nati"" ....finilion 01 PCA is based on m..mizing the """,-<>I·squares of !he projection errors. ind'cated by the bfi.>e lines. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/5cd28d50fca576731937e21537a58d87cdb7fa4000e93f2596c8366ad4a564b7.jpg)


a panlcula, fonn of linear-Gau"ian latem "ariable model. This probabilistic reformulation bring~ many ad\'imlag~s, su~h as tl>l: use I)f EM for parameter eslimalion, rrinciple<J c~tensioos 10 Oli~turc, of PeA model" and Ba)'~sian formulat;ons that allow tbe number of rrincipal com[>Oncnts to be detennined aUlOmatically from !be data. Finally'. "c diSl;us< briefly ""'eral gencrali,ation, ofthe latent Yariable concept that g<l be~ood tbe linear-Gaussian assumption including non·Gau"i"n I.tcnt yariabies .....hich lea'" to tbe fr.me....ork of indrl"'mJ.m compon.nl anal,-.;., as ....ell a, models ha"ing a nonlinear rclationship bet ....een latent and oose",e<J ,'lUiable,. 

## 'c2=.~1. Principal Component Analysis

Principal compooem analy,;" or rcA.;s a technique tha! is "'idely u<ed for appli. cations such as dimensionality .-eduction, lossy data comprc"ion, feature e>tracti"". and data v;,ualizatiOll (Jolliffe, 2(02). It;s also kno.... " as tile Karoan.n·I..,;"" tran,· f~. 

lbcrc an: t....o commonly used definitions of PeA that giye rise to the >arne algorithm. PeA can be defined as the unhog<lnal projtttion of the data O/1tO a lo....er dimensionallincar space. kno....n as the pri/lcip.al $uh.•p.aa. soch that the \'ariance of the projttted data i' ma~imi,e<J (1I",.lIing. 1933). Equi"alemly,;t can be defined as tbe linear projection that minimi"'. the average projttlion cost. defined as t~ mean squa.-ed distance !letween the data [>Oint< and tbeir p<ojtttioo, (Pearson, 19(1). The l"J'"OC"s< of onhogonal projection i' illustraled in FiguTe 12.2. We con,ider each of these definitions in tum. 

## 12,1.1 Mllximllm variance lormulation

Con,ider a dala set <If obser"\lations $\{ \mathbf { x } _ { n } \}$ wher $n = 1 , \ldots , N$ , and $\mathbf { x } _ { n }$ i, a Euclidean variable "'ilh dimen,ionality D. Our goal is to project If>/:: data onto a 'pace ha"ing dimen,ionality $M < D$ " hile Ill3Jli",i,illg the "ariallCe ofthe projttted data. For the !noll..nl. we 'hall assume that tbe "alue of M is g;\·en. Latcr in this chapter, we shall consider techniques to determine an appropriate value of IV! from the data. 

To begin with, consider the projection onto a one-dimensional space $( M = 1 )$ We can define the direction of this space using a D-dimensional vector $\mathbf { u } _ { 1 }$ , which for convenience (and without loss of generality) we shall choose to be a unit vector so that ${ \bf u } _ { 1 } ^ { \mathrm { T } } { \bf u } _ { 1 } = 1$ (note that we are only interested in the direction defined by $\mathbf { u } _ { 1 }$ not in the magnitude of $\mathbf { u } _ { 1 }$ itself). Each data point ${ \bf x } _ { n }$ is then projected onto a scalar value ${ \bf u } _ { 1 } ^ { \mathrm { T } } { \bf x } _ { n }$ . The mean of the projected data is $\mathbf { u } _ { 1 } ^ { \mathrm { T } } \overline { { \mathbf { x } } }$ where $\overline { { \mathbf { x } } }$ is the sample set mean given by 

$$
\overline {{\mathbf {x}}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n}\tag{12.1}
$$

and the variance of the projected data is given by 

$$
\frac {1}{N} \sum_ {n = 1} ^ {N} \left\{\mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {x} _ {n} - \mathbf {u} _ {1} ^ {\mathrm{T}} \overline {{\mathbf {x}}} \right\} ^ {2} = \mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {S u} _ {1}\tag{12.2}
$$

where $\mathbf { S }$ is the data covariance matrix defined by 

$$
\mathbf {S} = \frac {1}{N} \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) ^ {\mathrm{T}}.\tag{12.3}
$$

We now maximize the projected variance ${ \bf u } _ { 1 } ^ { \mathrm { T } } { \bf S } { \bf u } _ { 1 }$ with respect to $\mathbf { u } _ { 1 }$ . Clearly, this has to be a constrained maximization to prevent $\| \mathbf { u } _ { 1 } \|  \infty$ . The appropriate constraint comes from the normalization condition $\mathbf { u } _ { 1 } ^ { \mathrm { T } } \mathbf { u } _ { 1 } = 1$ . To enforce this constraint, we introduce a Lagrange multiplier that we shall denote by $\lambda _ { 1 }$ I, and then make an unconstrained maximization o 

$$
\mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {S u} _ {1} + \lambda_ {1} \left(1 - \mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {u} _ {1}\right).\tag{12.4}
$$

By setting the derivative with respect to $\mathbf { u } _ { 1 }$ equal to zero, we see that this quantity will have a stationary point when 

$$
\mathbf {S u} _ {1} = \lambda_ {1} \mathbf {u} _ {1}\tag{12.5}
$$

which says that $\mathbf { u } _ { 1 }$ must be an eigenvector of S. If we left-multiply by ${ \bf u } _ { 1 } ^ { \mathrm { T } }$ and make use of $\mathbf { u } _ { 1 } ^ { \bar { \mathrm { T } } } \mathbf { u } _ { 1 } = 1$ , we see that the variance is given by 

$$
\mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {S u} _ {1} = \lambda_ {1}\tag{12.6}
$$

and so the variance will be a maximum when we set $\mathbf { u } _ { 1 }$ equal to the eigenvecto having the largest eigenvalue $\lambda _ { 1 }$ I. This eigenvector is known as the first principa component. 

We can define additional principal components in an incremental fashion by choosing each new direction to be that which maximizes the projected varianc amongst all possible directions orthogonal to those already considered. If we con sider the general case of an M -dimensional projection space, the optimal linear pro jection for which the variance of the projected data is maximized is now defined by the M eigenvectors $\mathbf { u } _ { 1 } , \dots , \mathbf { u } _ { M }$ of the data covariance matrix S corresponding to the M largest eigenvalue $\lambda _ { 1 } , \dots , \lambda _ { M }$ . This is easily shown using proof by induction 

To summarize, principal component analysis involves evaluating the mean x and the covariance matrix S of the data set and then finding the M eigenvectors of S corresponding to the M largest eigenvalues. Algorithms for finding eigenvectors and eigenvalues, as well as additional theorems related to eigenvector decomposition, can be found in Golub and Van Loan (1996). Note that the computational cost o computing the full eigenvector decomposition for a matrix of size ${ \bf \bar { \cal D } } \times { \cal D } { \bf i s } { \cal O } ( D ^ { 3 } )$ If we plan to project our data onto the first M principal components, then we only need to find the first M eigenvalues and eigenvectors. This can be done with more efficient techniques, such as the power method (Golub and Van Loan, 1996), tha scale like $O ( M D ^ { 2 } )$ ), or alternatively we can make use of the EM algorithm. 

## 12.1.2 Minimum-error formulation

We now discuss an alternative formulation of peA based on projection error minimization. To do this, we introduce a complete orthonormal set ofD-dimensional basis vectors $\left\{ { \bf { u } } _ { i } \right\}$ where $i = 1 , \ldots , D$ that satisfy 

$$
\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j} = \delta_ {i j}.\tag{12.7}
$$

Because this basis is complete, each data point can be represented exactly by a linear combination of the basis vectors 

$$
\mathbf {x} _ {n} = \sum_ {i = 1} ^ {D} \alpha_ {n i} \mathbf {u} _ {i}\tag{12.8}
$$

where the coefficients $\alpha _ { n i }$ will be different for different data points. This simply corresponds to a rotation of the coordinate system to a new system defined by the $\left\{ { \bf { u } } _ { i } \right\}$ , and the original D components $\{ x _ { n 1 } , \ldots , x _ { n D } \}$ are replaced by an equivalent set $\left\{ \alpha _ { n 1 } , \ldots , \alpha _ { n D } \right\}$ . Taking the inner product with $\mathbf { u } _ { j }$ , and making use of the orthonormality property, we obtain $\alpha _ { n j } = \mathbf { x } _ { n } ^ { \mathrm { T } } \mathbf { u } _ { j }$ , and so without loss of generality we can write 

$$
\mathbf {x} _ {n} = \sum_ {i = 1} ^ {D} \left(\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) \mathbf {u} _ {i}.\tag{12.9}
$$

Our goal, however, is to approximate this data point using a representation involving a restricted number $M < D$ of variables corresponding to a projection onto a lower-dimensional subspace. The M -dimensional linear subspace can be represented, without loss of generality, by the first M of the basis vectors, and so we approximate each data point ${ \bf x } _ { n }$ by 

$$
\widetilde {\mathbf {x}} _ {n} = \sum_ {i = 1} ^ {M} z _ {n i} \mathbf {u} _ {i} + \sum_ {i = M + 1} ^ {D} b _ {i} \mathbf {u} _ {i}\tag{12.10}
$$

where the $\left\{ z _ { n i } \right\}$ depend on the particular data point, whereas the $\{ b _ { i } \}$ are constants that are the same for all data points. We are free to choose the $\left\{ { \bf { u } } _ { i } \right\}$ , the $\left\{ z _ { n i } \right\}$ , and the $\{ b _ { i } \}$ so as to minimize the distortion introduced by the reduction in dimensionality. As our distortion measure, we shall use the squared distance between the original data point ${ \bf x } _ { n }$ and its approximation $\widetilde { \mathbf { x } } _ { n }$ , averaged over the data set, so that our goal is to minimize 

$$
J = \frac {1}{N} \sum_ {n = 1} ^ {N} \left\| \mathbf {x} _ {n} - \widetilde {\mathbf {x}} _ {n} \right\| ^ {2}.\tag{12.11}
$$

Consider first of all the minimization with respect to the quantities $\left\{ z _ { n i } \right\}$ . Substituting for $\widetilde { \mathbf { x } } _ { n }$ , setting the derivative with respect to $z _ { n j }$ to zero, and making use of the orthonormality conditions, we obtain 

$$
z _ {n j} = \mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {j}\tag{12.12}
$$

where $j = 1 , \dots , M$ . Similarly, setting the derivative of J with respect to $b _ { i }$ to zero, and again making use of the orthonormality relations, gives 

$$
b _ {j} = \overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {j}\tag{12.13}
$$

where $j = M { + } 1 , \ldots , D$ . If we substitute for $z _ { n i }$ and $b _ { i }$ , and make use of the general expansion (12.9), we obtain 

$$
\mathbf {x} _ {n} - \widetilde {\mathbf {x}} _ {n} = \sum_ {i = M + 1} ^ {D} \left\{\left(\mathbf {x} _ {n} - \overline {{\mathbf {x}}}\right) ^ {\mathrm{T}} \mathbf {u} _ {i} \right\} \mathbf {u} _ {i}\tag{12.14}
$$

from which we see that the displacement vector from $\mathbf { x } _ { n }$ to $\widetilde { \mathbf { x } } _ { n }$ lies in the space orthogonal to the principal subspace, because it is a linear combination of $\left\{ { \bf { u } } _ { i } \right\}$ for $i = M + 1 , \dots , D $ , as illustrated in Figure 12.2. This is to be expected because the projected points $\widetilde { \mathbf { x } } _ { n }$ must lie within the principal subspace, but we can move them freely within that subspace, and so the minimum error is given by the orthogona projection. 

We therefore obtain an expression for the distortion measure $J$ as a function purely of the $\{ \mathbf { u } _ { i } \}$ in the form 

$$
J = \frac {1}{N} \sum_ {n = 1} ^ {N} \sum_ {i = M + 1} ^ {D} \left(\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i} - \overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) ^ {2} = \sum_ {i = M + 1} ^ {D} \mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {S u} _ {i}.\tag{12.15}
$$

There remains the task of minimizing J with respect to the $\left\{ { \bf { u } } _ { i } \right\}$ }, which mus be a constrained minimization otherwise we will obtain the vacuous result $\mathbf { u } _ { i } = 0$ The constraints arise from the orthonormality conditions and, as we shall see, the solution will be expressed in terms of the eigenvector expansion of the covariance matrix. Before considering a formal solution, let us try to obtain some intuition abou the result by considering the case of a two-dimensional data spac $D = 2$ and a one dimensional principal subspace $M = 1$ 1. We have to choose a direction $\mathbf { u } _ { 2 }$ so as to minimize $J = \mathbf { u } _ { 2 } ^ { \mathrm { T } } \mathbf { S } \mathbf { u } _ { 2 }$ ' subject to the normalization constraint $\mathbf { u } _ { 2 } ^ { \mathrm { T } } \mathbf { u } _ { 2 } = 1$ . Using a Lagrange multiplier $\lambda _ { 2 }$ to enforce the constraint, we consider the minimization of 

$$
\widetilde {J} = \mathbf {u} _ {2} ^ {\mathrm{T}} \mathbf {S u} _ {2} + \lambda_ {2} \left(1 - \mathbf {u} _ {2} ^ {\mathrm{T}} \mathbf {u} _ {2}\right).\tag{12.16}
$$

Setting the derivative with respect to $\mathbf { u } _ { 2 }$ to zero, we obtain $\mathbf { S } \mathbf { u } _ { 2 } = \lambda _ { 2 } \mathbf { u } _ { 2 }$ so that $\mathbf { u } _ { 2 }$ is an eigenvector of S with eigenvalue $\lambda _ { 2 }$ . Thus any eigenvector will define a stationary point of the distortion measure. To find the value of J at the minimum, we back-substitute the solution for $\mathbf { u } _ { 2 }$ into the distortion measure to give $J = \lambda _ { 2 }$ . We therefore obtain the minimum value of J by choosing $\mathbf { u } _ { 2 }$ to be the eigenvector corresponding to the smaller of the two eigenvalues. Thus we should choose the principa subspace to be aligned with the eigenvector having the larger eigenvalue. This resul accords with our intuition that, in order to minimize the average squared projection distance, we should choose the principal component subspace to pass through the mean of the data points and to be aligned with the directions of maximum variance. For the case when the eigenvalues are equal, any choice of principal direction wil give rise to the same value of J. 

The general solution to the minimization of J for arbitrary D and arbitrary $M <$ D is obtained by choosing the $\left\{ { { \bf { u } } _ { i } } \right\}$ to be eigenvectors of the covariance matrix given by 

$$
\mathbf {S u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{12.17}
$$

where $i = 1 , \ldots , D$ , and as usual the eigenvectors $\left\{ { { \bf { u } } _ { i } } \right\}$ are chosen to be orthonormal. The corresponding value of the distortion measure is then given by 

$$
J = \sum_ {i = M + 1} ^ {D} \lambda_ {i}\tag{12.18}
$$

which is simply the sum of the eigenvalues of those eigenvectors that are orthogonal to the principal subspace. We therefore obtain the minimum value of J by selecting these eigenvectors to be those having the $D - M$ smallest eigenvalues, and hence the eigenvectors defining the principal subspace are those corresponding to the M largest eigenvalues. 

Although we have considered $M \ < \ D$ , the PCA analysis still holds if $M =$ $D ,$ in which case there is no dimensionality reduction but simply a rotation of the coordinate axes to align with principal components. 

Finally, it is worth noting that there exists a closely related linear dimensionality reduction technique called canonical correlation analysis, or CCA (Hotelling, 1936; Bach and Jordan, 2002). Whereas PCA works with a single random variable, CCA considers two (or more) variables and tries to find a corresponding pair of linear subspaces that have high cross-correlation, so that each component within one of the subspaces is correlated with a single component from the other subspace. Its solution can be expressed in terms of a generalized eigenvector problem. 

## 12.1.3 Applications of peA

We can illustrate the use of PCA for data compression by considering the off line digits data set. Because each eigenvector of the covariance matrix is a vector ;n the OIigi",,1 D-<limensional space. we can represent tho eigenw:cto<s as imago< of tho same silO as ,1>0 data poi",,_ 11,. first Ih'e .ig.n,'occOfS. along wich tl>o corresponding .igen,'slue,. are <IIo"'n in Figure 12,3, A plO! ofll>o complete spect"'m uf oigo",·alue,. sone<! into decreasing order. is shown in Figure 12.4{ai. The di'tortion measure J aSSQCiated wilh choo<ing a particular value of M is gi.'en by tho sum of the eig.n",lues from M + I up to $D$ and is ptO!ted for different ,'aluo< of .\1 in Figure 12,4(b). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/74991f5b7cc98c962987b7012d94b5ce53136e6cbd445b8888e48d43b723712f.jpg)



Figure 12.3 The mean ~'" x aklog with !he II"'t lou' PCA e;gerrvecl<)rll $\mathbf { u } _ { 1 } , \ldots , \mathbf { u } _ { 4 }$ lor the 011-..... cligits data set. t<>getl'ler with !he correspondi~ ~.


If "'e <utlslitut. (12, 12) and (12.13) into (12.10). we can write the I'CA appro~­ imation to a data "eel'" $\mathbf { x } _ { n }$ i" the fonn 

$$
\begin{array}{r c l} \widetilde {\mathbf {x}} _ {n} & = & \sum_ {i = 1} ^ {M} (\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i}) \mathbf {u} _ {i} + \sum_ {i = M + 1} ^ {D} (\overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {i}) \mathbf {u} _ {i} \\ & = & \overline {{\mathbf {x}}} + \sum_ {i = 1} ^ {M} \left(\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i} - \overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) \mathbf {u} _ {i} \end{array}\tag{12.19}
$$

(12.20) 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/af18da62412076f351d4489d78d48a8728e80138a8b705331b46924aca6fe76c.jpg)



(a)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/9c28e068205c72af0c62324c95d383d1de6fd8afe2eb1542cf5bf78880c62543.jpg)



(b)



FIIIUre 12,4 (a) PIol at !he eJoI;nv.loo .".,etrum lor the off·1ine digits data set (b) P10t 01 !he sum at the <:liscarded ."".Ioos, which "'l'fesoots!he s.um-ol·SQ"",es distortlon J i<*~ by projecti<Xl the data onto a p<incipal componenl slll>spaee '" dimensionalitv M.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/bd469ded0de3864b878a71d13226769d50152e9fa717b0b6476707f678df7131.jpg)


FIIIUr. 1:1:.5 An ",>gi",,1 ~mpIe Irom lI>e 011·_ digils data ...ttOll"1her with its PeA re<:onstnxlions oblair...:! by 'e1aio"li!Xl ,If j)<incipal ~n1S 10< various val,," 01 ,If. As ,II increason !tie re<:onst,uctiOfI ~s more ao::urate and woukl portee! when $M = D =$ $2 8 \times 2 8 = 7 8 4$ 

where we ha"e made moe of the relation 

$$
\overline {{\mathbf {x}}} = \sum_ {i = 1} ^ {D} \left(\overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) \mathbf {u} _ {i}\tag{12.21}
$$

which follow. from the completene" of the $\left\{ { \bf { u } } _ { i } \right\}$ , Thi. represent. a contpre"ioo "f the data >ct. Ilttau>e for each data poim we ha,.. repla«d the V·dimensiooal "o<:lor $\mathbf { x } _ { n }$ Wilh an ,I[.din>en,ional "o<:tor having componem, $\left( \mathbf { x } _ { n } ^ { \mathrm { { T } } } \mathbf { u } _ { i } - \overline { { \mathbf { x } } } ^ { \mathrm { { T } } } \mathbf { u } _ { i } \right)$ . 11Ie 'mailer the "alue of M. the greater the degree of comp.-e",ion. Example. of PeA ,""on't""tioos of data points for the digits data set are shown in Figure 12.5 

Anolher application of priocipal compcmenl analy,i. i' to data pre-processing. In thi' case, lhe goal is nO! dimensionality redUC1ion but rather the tmn,formmion o a data sel in or<k' to standa'lli'.e eenain of ilS pmpenies. This can be in'portanl in allowing .ubsequent pallem ,""ognition algorithm. 10 be applied successfully 10 the data >ct. Typically. il is done wilen the original "ariable. are mea,ured in "arioos dif. ferent unil' or !la"e significantly difTerent ,'ariabilil}'. For instance in the Old Faithfu data sel. the time betv.-een eruption. i. typicany an order of magni1Ude greater than lhe dUrali"" of.n erupt;,,". When W'e applied the ".nlCans algorill"" 10 thi< data set, ".-e first made a separ.te linear re-sealing of the individual "anable' socb thm each "ariable had zero mean and unit "ariance. llUs is known as slllNlardiv·.,g the dota. and the cO\'anance matrix for lhe 'lando,di/,ed dala has components 

$$
\rho_ {i j} = \frac {1}{N} \sum_ {n = 1} ^ {N} \frac {\left(x _ {n i} - \overline {{{x}}} _ {i}\right)}{\sigma_ {i}} \frac {\left(x _ {n j} - \overline {{{x}}} _ {j}\right)}{\sigma_ {j}}\tag{12.22}
$$

where $\sigma _ { i }$ is the ,'anaoce of $x _ { i }$ . This i< known as the (",,,el,,,;,,,, matri.' of the original dota and ha' the propeny thai if t""o rompooent, $x _ { i }$ and $x _ { j }$ of the data are perfee1ly correl.ted. then $\rho _ { i j } = 1$ .•nd if they a.-e uocorrelated. then $\rho _ { i j } = 0$ 

11",,'1""', using PeA we can make a It>Of'e subst.mial nonnalizat;oo of the data to gi\'C it zero mean and unit co'·ariance. so that different "anables become derorrelate<l To do this. we first ""rile the ei8Cn"cclor equation (12, 17) in the form 

$$
\mathbf {S U} = \mathbf {U L}\tag{12.23}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/8e41dfdcb29ae62007e68d924d88dab86e4f5318c132bdd22495182b567985d9.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/ebd61d8f30539cf71b7e63d9d1846eab661bd422e3c24de5920431cbb29beccd.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/976fd7c215191b95e8c6f8af72a4f31d81bd6f8efc42674c45103956242fcd2a.jpg)



Figure 12.6 Illustration of the effects of linear pre-processing applied to the Old Faithful data set. The plot on the left shows the original data. The centre plot shows the result of standardizing the individual variables to zero mean and unit variance. Also shown are the principal axes of this normalized data set, plotted over the range $\pm \lambda _ { i } ^ { 1 / 2 }$ The plot on the right shows the result of whitening of the data to give it zero mean and unit covariance.


where L is a $D \times D$ diagonal matrix with elements $\lambda _ { i } ,$ , and U is a $D \times D$ orthogonal matrix with columns given by $\mathbf { u } _ { i }$ . Then we define, for each data point $\mathbf { x } _ { n } .$ , a transformed value given by 

$$
\mathbf {y} _ {n} = \mathbf {L} ^ {- 1 / 2} \mathbf {U} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}})\tag{12.24}
$$

where $\overline { { \mathbf { x } } }$ is the sample mean defined by (12.1). Clearly, the set $\left\{ \mathbf { y } _ { n } \right\}$ has zero mean, and its covariance is given by the identity matrix because 

$$
\begin{array}{r c l} \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {y} _ {n} \mathbf {y} _ {n} ^ {\mathrm{T}} & = & \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {L} ^ {- 1 / 2} \mathbf {U} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) ^ {\mathrm{T}} \mathbf {U} \mathbf {L} ^ {- 1 / 2} \\ & = & \mathbf {L} ^ {- 1 / 2} \mathbf {U} ^ {\mathrm{T}} \mathbf {S} \mathbf {U} \mathbf {L} ^ {- 1 / 2} = \mathbf {L} ^ {- 1 / 2} \mathbf {L} \mathbf {L} ^ {- 1 / 2} = \mathbf {I}. \end{array}\tag{12.25}
$$

This operation is known as whitening or sphereing the data and is illustrated for the Old Faithful data set in Figure 12.6. 

It is interesting to compare PCA with the Fisher linear discriminant which was discussed in Section 4.1.4. Both methods can be viewed as techniques for linear dimensionality reduction. However, PCA is unsupervised and depends only on the values ${ \bf x } _ { n }$ whereas Fisher linear discriminant also uses class-label information. This difference is highlighted by the example in Figure 12.7. 

Another common application of principal component analysis is to data visualization. Here each data point is projected onto a two-dimensional $( M = 2 )$ principal subspace, so that a data point $\mathbf { x } _ { n }$ is plotted at Cartesian coordinates given by $\mathbf { x } _ { n } ^ { \mathrm { { T } } } \mathbf { u } _ { 1 }$ and $\bar { \mathbf { x } } _ { n } ^ { \mathrm { { T } } } \mathbf { u } _ { 2 }$ , where $\mathbf { u _ { \mathrm { 1 } } }$ and $\mathbf { u } _ { 2 }$ are the eigenvectors corresponding to the largest and second largest eigenvalues. An example of such a plot, for the oil flow data set, is shown in Figure 12.8. 

A comparison 01 pro:ipal compo-Mnt analysis ....111 Fisha(s linaar discriminant 101 """", <*man""'" ality r&duclion. Here too data in two dimansions, belonging to two classes sIIOWI1 in red and blue. is to be PfOI"Cled onto a s.ingle di· mension. PCA c/>xlsas the direc· tion 01 maximum varia""e. sIIOWI1 try tha ma9""ta Co""'. wt11ch leads to strong class overlap. whereas !he Fisl>ef IiMar diSCfOrnillant takes accoun1 <:A too class labels and leads to a projection onto the g<ean CUM! giving much t>etler class separation 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/481574607fa2bffcbe0122c10a159052a26a953663de06568a47685592110829.jpg)


Fig"", 12.8 Visualilatlon 01 !he oill'low <lata lIet obtained try projoecting the <lata onto the lirst two prin. cipal compone<1ts. The <ed, blue, and 9r&en points corre-spond to !he 'IamiNI(, 't>omogenoous', and '8nnula~ flow oonligurations ",specriveIy. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/fb785a425d2c780a7fdd625560c45f12a1ebe2d62048abdb8712bb1b58099bb1.jpg)


## 12.1.4 peA for high-dimensional data

In some application. of pliTlCipal component analysis. the number of data points is smaller than t!>c dimensionality of troe data 'pace. FOI" example. ",e might want to apply PeA to a data <el of a few hundred images, each of ,,'hich rorrespoOOs to a "eetor in a 'pace of poIentially .....ml million dimensiOlls (COITesponding tn thfl'e enlour "alues for each of the pi.",ls in troe image), NOIe that in a D-<limen,ional space a set of jY points. ",'here $N < D$ . defines a linear subspa::e ",hose dimensi"nality is at ""'st $N - 1$ , and SO there is linle point in applying PeA for ,'alue< of M thaI"'" greater than $N - 1$ , Indeed, if "'e pelf"",, PeA we will find that at least $D - N + 1$ of the eigen".lues art lero. eorrespnnding tQ eigenvectors aloog ",hose direclioos the data <el has 10m varianee. Funhem>ore. typical algOl"ithm, for finding the eigen,'eet"" ofa $D \times D$ matrix ha"e a computatiooal eosl thm scales like $O ( D ^ { 3 } )$ aOO so for appliealions such as the image e,ample. a direc' application of PeA will be computatiooally infe,,-sibJe. 

W. can resoh'e this problem as foIl",",'" Fir;l. let us define X to be the $( N \times D )$ 

dimensional centred data matrix, whose $n ^ { \mathrm { t h } }$ row is given by $( { \bf x } _ { n } - { \overline { { \bf x } } } ) ^ { \mathrm { T } }$ . The covariance matrix (12.3) can then be written as ${ \bf S } = N ^ { { - } 1 } { \bf X } ^ { \mathrm { T } } { \dot { \bf X } }$ , and the corresponding eigenvector equation becomes 

$$
\frac {1}{N} \mathbf {X} ^ {\mathrm{T}} \mathbf {X} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}.\tag{12.26}
$$

Now pre-multiply both sides by X to give 

$$
\frac {1}{N} \mathbf {X X ^ {\mathrm{T}}} (\mathbf {X u} _ {i}) = \lambda_ {i} (\mathbf {X u} _ {i}).\tag{12.27}
$$

If we now define $\mathbf { v } _ { i } = \mathbf { X } \mathbf { u } _ { i }$ , we obtain 

$$
\frac {1}{N} \mathbf {X X ^ {\mathrm{T}}} \mathbf {v} _ {i} = \lambda_ {i} \mathbf {v} _ {i}\tag{12.28}
$$

which is an eigenvector equation for the $N \times N$ matrix $N ^ { - 1 } \mathbf { X } \mathbf { X } ^ { \mathrm { { T } } }$ . We see that this has the same $N - 1$ eigenvalues as the original covariance matrix (which itself has an additional $D - N + 1$ eigenvalues of value zero). Thus we can solve the eigenvector problem in spaces of lower dimensionality with computational cost $O ( N ^ { \bar { 3 } } )$ instead of $O ( D ^ { 3 } )$ ). In order to determine the eigenvectors, we multiply both sides of (12.28) by $\mathbf { X } ^ { \mathrm { { T } } }$ to give 

$$
\left(\frac {1}{N} \mathbf {X} ^ {\mathrm{T}} \mathbf {X}\right) (\mathbf {X} ^ {\mathrm{T}} \mathbf {v} _ {i}) = \lambda_ {i} (\mathbf {X} ^ {\mathrm{T}} \mathbf {v} _ {i})\tag{12.29}
$$

from which we see that $\left( \mathbf { X } ^ { \mathrm { { T } } } \mathbf { v } _ { i } \right)$ is an eigenvector of S with eigenvalue $\lambda _ { i }$ . Note, however, that these eigenvectors need not be normalized. To determine the appropriate normalization, we re-scale $\mathbf { u } _ { i } \propto \mathbf { X } ^ { \mathrm { { T } } } \mathbf { v } _ { i }$ by a constant such that $\left\| \mathbf { u } _ { i } \right\| = 1$ , which, assuming $\mathbf { v } _ { i }$ has been normalized to unit length, gives 

$$
\mathbf {u} _ {i} = \frac {1}{(N \lambda_ {i}) ^ {1 / 2}} \mathbf {X} ^ {\mathrm{T}} \mathbf {v} _ {i}.\tag{12.30}
$$

In summary, to apply this approach we first evaluate $\mathbf { X X ^ { \mathrm { { T } } } }$ and then find its eigenvectors and eigenvalues and then compute the eigenvectors in the original data space using (12.30). 

## 12.2. Probabilistic peA

The formulation of PCA discussed in the previous section was based on a linear projection of the data onto a subspace of lower dimensionality than the original data space. We now show that PCA can also be expressed as the maximum likelihood solution of a probabilistic latent variable model. This reformulation of PCA, known as probabilistic peA, brings several advantages compared with conventional PCA: 

• Probabilistic PCA represents a constrained form of the Gaussian distribution in which the number of free parameters can be restricted while still allowing the model to capture the dominant correlations in a data set. 

• We can derive an EM algorithm for PCA that is computationally efficient in situations where only a few leading eigenvectors are required and that avoids having to evaluate the data covariance matrix as an intermediate step. 

• The combination of a probabilistic model and EM allows us to deal with missing values in the data set. 

• Mixtures of probabilistic PCA models can be formulated in a principled way and trained using the EM algorithm. 

• Probabilistic PCA forms the basis for a Bayesian treatment of PCA in which the dimensionality of the principal subspace can be found automatically from the data. 

• The existence of a likelihood function allows direct comparison with other probabilistic density models. By contrast, conventional PCA will assign a low reconstruction cost to data points that are close to the principal subspace even if they lie arbitrarily far from the training data. 

• Probabilistic PCA can be used to model class-conditional densities and hence be applied to classification problems. 

• The probabilistic PCA model can be run generatively to provide samples from the distribution. 

This formulation of PCA as a probabilistic model was proposed independently by Tipping and Bishop (1997, 1999b) and by Roweis (1998). As we shall see later, it is closely related tofactor analysis (Basilevsky, 1994). 

Probabilistic PCA is a simple example of the linear-Gaussian framework, in which all of the marginal and conditional distributions are Gaussian. We can formulate probabilistic PCA by first introducing an explicit latent variable z corresponding to the principal-component subspace. Next we define a Gaussian prior distribution $p ( \mathbf { z } )$ over the latent variable, together with a Gaussian conditional distribution $p ( \mathbf { x } | \mathbf { z } )$ for the observed variable x conditioned on the value of the latent variable. Specifically, the prior distribution over z is given by a zero-mean unit-covariance Gaussian 

$$
p (\mathbf {z}) = \mathcal {N} (\mathbf {z} | \mathbf {0}, \mathbf {I}).\tag{12.31}
$$

Similarly, the conditional distribution of the observed variable x, conditioned on the value of the latent variable z, is again Gaussian, of the form 

$$
p (\mathbf {x} | \mathbf {z}) = \mathcal {N} (\mathbf {x} | \mathbf {W z} + \boldsymbol {\mu}, \sigma^ {2} \mathbf {I})\tag{12.32}
$$

in which the mean of x is a general linear function of z governed by the $D \times M$ matrix Wand the D-dimensional vector $\pmb { \mu } .$ . Note that this factorizes with respect to the elements of x, in other words this is an example of the naive Bayes model. As we shall see shortly, the columns of W span a linear subspace within the data space that corresponds to the principal subspace. The other parameter in this model is the scalar $\sigma ^ { 2 }$ governing the variance of the conditional distribution. Note that there is no 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/c8c622f3d618bd2ff7eed3f5dd4f9cb604ca0b8c2e960fb5d42311bcf0ae9caf.jpg)



Flgu .. 12.9 I\n ~I"'tfat"" oIlt>e II"""fative vi&w oI1t>e p<ot>abi!;st", PeA modeIfof" two-dimensiooal <!ala space and a on&-<lirnent.ionallat/l<1t space, An Ob&erved <!ala point x Is generated by first drawing a value i fof 1t>e Iat&n1 vafiatlle /f(lm ~s prior dist,~t"" $p ( z )$ and Itlen drawing a val"" fof x lrom an iSO/fopK: Gaussian distr~t"" (iijust,al&(l by the red cir<:ie's) having mean $\mathbf { w } \widehat { z } + \mu$ and coY8r1.once $\sigma ^ { 2 } \mathbf { I }$ The l/f&er\ ellips.&$ show l!le density """toors!of the marg'''''1 dis1r1bulion $p ( \mathbf { x } )$


loss of ge""raJity in assuming a zero mean. unit co\'ariance Gau"ian for the latent distributi"n $p ( \mathbf { z } )$ because a more gcneral Gau"i3n di"ributi"n would gi"e rise to an equivalent probabili"ic n>odel. 

We can view the probabilistic PeA model from a geoerati"e \'iew""int in "hich a sampled '-alue of the ob""Yed ,..riable is obIained by first choo,ing a ,..Iue for the latent ,'ariahle aod then >ampling the OO",,,'e;j ,-ariable cooditioned on this lao tent \'alue, Specifically, the V-dimen'ional OO"''''ed '-ariable x is defined by a lin ea, tran,formati,," of the '\/·dimen,i"nal latcnt '-ariable z plu, additi'-e Gaussian 'noise' , <0 that 

$$
\mathbf {x} = \mathbf {W} \mathbf {z} + \boldsymbol {\mu} + \epsilon\tag{12.33}
$$

w!>ere z is an M-di""'nsional Gaussian lalent variable. and .. is a V·dimensi"nal ,ero-mean Gau..ian-distributed noi.., "ariable witb co'-ariance $\sigma ^ { 2 } \mathbf { I } .$ . This generative process is illustrated in Figure 12.9. NOIe that this frame".-orl< is based on a mapping from latent ,pace 10 data space. in contrast 10 the nl()l'(: C(""'cnti,,,,"1 "iew "f I'CA dis.cus"'d alx",e, 11Ie ",,'e= mapping, from data space to the latent space. ,,-ill he OOlained ,honly using Ha ycs· lhwn:m. 

SUf!ll'OSC we wish 10 deten"ine the "alues ofll>o parameters \V. I' and $\sigma ^ { 2 }$ uSIng maximum likelihuo<l, To write """"n lhe likeliltood function, we need an ""pression for tl>o marginal distributioo $p ( \mathbf { x } )$ of tl>o ~,,'ed ...riahle_ This is exprt__sed. fmn' the sum aod p,oduct rules "fprobability, in the form 

$$
p (\mathbf {x}) = \int p (\mathbf {x} | \mathbf {z}) p (\mathbf {z}) \mathrm{d} \mathbf {z}.\tag{12.34}
$$

ll""auS(: this corresponds to a linear·Gau"i,n lT1(llIcL thi< marginal di,tribulion is again Gaussian. atld is given by 

$$
p (\mathbf {x}) = \mathcal {N} (\mathbf {x} | \boldsymbol {\mu}, \mathbf {C})
$$

(IUS) 

where the $D \times D$ covariance matrix C is defined by 

$$
\mathbf {C} = \mathbf {W W ^ {\mathrm{T}}} + \sigma^ {2} \mathbf {I}.\tag{12.36}
$$

This result can also be derived more directly by noting that the predictive distribution will be Gaussian and then evaluating its mean and covariance using (12.33). This gives 

$$
\begin{array}{r c l} \mathbb {E} [ \mathbf {x} ] & = & \mathbb {E} [ \mathbf {W z} + \boldsymbol {\mu} + \boldsymbol {\epsilon} ] = \boldsymbol {\mu} \\ \operatorname{cov} [ \mathbf {x} ] & = & \mathbb {E} \left[ (\mathbf {W z} + \boldsymbol {\epsilon}) (\mathbf {W z} + \boldsymbol {\epsilon}) ^ {\mathrm{T}} \right] \\ & = & \mathbb {E} \left[ \mathbf {W z z} ^ {\mathrm{T}} \mathbf {W} ^ {\mathrm{T}} \right] + \mathbb {E} [ \boldsymbol {\epsilon} \boldsymbol {\epsilon} ^ {\mathrm{T}} ] = \mathbf {W W} ^ {\mathrm{T}} + \sigma^ {2} \mathbf {I} \end{array}\tag{12.37}
$$

(12.38) 

where we have used the fact that z and E are independent random variables and hence are uncorrelated. 

Intuitively, we can think of the distribution $p ( \mathbf { x } )$ as being defined by taking an isotropic Gaussian 'spray can' and moving it across the principal subspace spraying Gaussian ink with density determined by $\bar { \sigma } ^ { 2 }$ and weighted by the prior distribution. The accumulated ink density gives rise to a 'pancake' shaped distribution representing the marginal density $p ( \mathbf { x } )$ 

The predictive distribution $p ( \mathbf { x } )$ is governed by the parameters $\mu ,$ , W, and $\sigma ^ { 2 }$ However, there is redundancy in this parameterization corresponding to rotations of the latent space coordinates. To see this, consider a matrix $\mathbf { \tilde { W } } = \mathbf { W } \mathbf { R } \mathbf { \Lambda }$ where R is an orthogonal matrix. Using the orthogonality property $\mathbf { R } \mathbf { R } ^ { \mathrm { T } } = \mathbf { I }$ , we see that the quantity $\widetilde { \mathbf { W } } \widetilde { \mathbf { W } } ^ { \mathrm { T } }$ that appears in the covariance matrix C takes the form 

$$
\widetilde {\mathbf {W}} \widetilde {\mathbf {W}} ^ {\mathrm{T}} = \mathbf {W} \mathbf {R} \mathbf {R} ^ {\mathrm{T}} \mathbf {W} ^ {\mathrm{T}} = \mathbf {W} \mathbf {W} ^ {\mathrm{T}}\tag{12.39}
$$

and hence is independent of R. Thus there is a whole family of matrices $\widetilde { \bf W }$ all of which give rise to the same predictive distribution. This invariance can be understood in terms of rotations within the latent space. We shall return to a discussion of the number of independent parameters in this model later. 

When we evaluate the predictive distribution, we require $\mathbf { C } ^ { - 1 }$ , which involve the inversion of a $D \times D$ matrix. The computation required to do this can be reduced by making use of the matrix inversion identity (C.7) to give 

$$
\mathbf {C} ^ {- 1} = \sigma^ {- 1} \mathbf {I} - \sigma^ {- 2} \mathbf {W M} ^ {- 1} \mathbf {W} ^ {\mathrm{T}}\tag{12.40}
$$

where the $M \times M$ matrix M is defined by 

$$
\mathbf {M} = \mathbf {W} ^ {\mathrm{T}} \mathbf {W} + \sigma^ {2} \mathbf {I}.\tag{12.41}
$$

Because we invert M rather than inverting C directly, the cost of evaluating $\mathbf { C } ^ { - 1 }$ is reduced from $O ( D ^ { 3 } )$ to $O ( M ^ { 3 } )$ 

As well as the predictive distribution $p ( \mathbf { x } )$ , we will also require the posterior distributio $p ( \mathbf { z } | \mathbf { x } )$ , which can again be written down directly using the result (2.116) for linear-Gaussian models to give 

$$
p (\mathbf {z} | \mathbf {x}) = \mathcal {N} \left(\mathbf {z} | \mathbf {M} ^ {- 1} \mathbf {W} ^ {\mathrm{T}} (\mathbf {x} - \boldsymbol {\mu}), \sigma^ {- 2} \mathbf {M}\right).\tag{12.42}
$$

Note that the posterior mean depends on x, whereas the posterior covariance is independent of x. 

The probabilistic peA model for a data set of N observations of x can be expressed as a directed graph in which each observation $\mathbf { x } _ { n }$ is associated with a value ${ \bf z } _ { n }$ of the latent variable. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/b5c00d7e19e75ca8b3aac565d17f822f98da640b45240ae9e024192f7d5c2988.jpg)


## 12.2.1 Maximum likelihood peA

We next consider the determination of the model parameters using maximum likelihood. Given a data set ${ \bf X } = \{ { \bf x } _ { n } \}$ of observed data points, the probabilistic peA model can be expressed as a directed graph, as shown in Figure 12.10. The corresponding log likelihood function is given, from (12.35), by 

$$
\begin{array}{l} \ln p (\mathbf {X} | \boldsymbol {\mu}, \mathbf {W}, \sigma^ {2}) = \sum_ {n = 1} ^ {N} \ln p (\mathbf {x} _ {n} | \mathbf {W}, \boldsymbol {\mu}, \sigma^ {2}) \\ = - \frac {N D}{2} \ln (2 \pi) - \frac {N}{2} \ln | \mathbf {C} | - \frac {1}{2} \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \boldsymbol {\mu}) ^ {\mathrm{T}} \mathbf {C} ^ {- 1} (\mathbf {x} _ {n} - \boldsymbol {\mu}). \end{array}\tag{12.43}
$$

Setting the derivative of the log likelihood with respect to $\mu$ equal to zero gives the expected result ${ \pmb \mu } = \overline { { \mathbf { x } } }$ where $\overline { { \mathbf { x } } }$ is the data mean defined by (12.1). Back-substituting we can then write the log likelihood function in the form 

$$
\ln p (\mathbf {X} | \mathbf {W}, \pmb {\mu}, \sigma^ {2}) = - \frac {N}{2} \left\{D \ln (2 \pi) + \ln | \mathbf {C} | + \mathrm{Tr} \left(\mathbf {C} ^ {- 1} \mathbf {S}\right) \right\}\tag{12.44}
$$

where S is the data covariance matrix defined by (12.3). Because the log likelihood is a quadratic function of $\mu ,$ , this solution represents the unique maximum, as can be confirmed by computing second derivatives. 

Maximization with respect to W and $\sigma ^ { 2 }$ is more complex but nonetheless has an exact closed-form solution. It was shown by Tipping and Bishop (1999b) that all of the stationary points of the log likelihood function can be written as 

$$
\mathbf {W} _ {\mathrm{ML}} = \mathbf {U} _ {M} (\mathbf {L} _ {M} - \sigma^ {2} \mathbf {I}) ^ {1 / 2} \mathbf {R}\tag{12.45}
$$

where $\mathbf { U } _ { M }$ is a $D \times M$ matrix whose columns are given by any subset (of size M) of the eigenvectors of the data covariance matrix S, the $M \times M$ diagonal matrix $\mathbf { L } _ { M }$ has elements given by the corresponding eigenvalues $\lambda _ { i } .$ , and R is an arbitrar $M \times M$ orthogonal matrix. 

Furthermore, Tipping and Bishop (1999b) showed that the maximum of the like lihood function is obtained when the M eigenvectors are chosen to be those whose eigenvalues are the M largest (all other solutions being saddle points). A similar re sult was conjectured independently by Roweis (1998), although no proof was given 

Again, we shall assume that the eigenvectors have been arranged in order of decreasing values of the corresponding eigenvalues, so that the M principal eigenvectors are $\mathbf { u } _ { 1 } , \dots , \mathbf { u } _ { M }$ . In this case, the columns of W define the principal subspace of standard PCA. The corresponding maximum likelihood solution for $\sigma ^ { 2 }$ is then given by 

$$
\sigma_ {\mathrm{ML}} ^ {2} = \frac {1}{D - M} \sum_ {i = M + 1} ^ {D} \lambda_ {i}\tag{12.46}
$$

so that $\sigma _ { \mathrm { M L } } ^ { 2 }$ is the average variance associated with the discarded dimensions. 

Because R is orthogonal, it can be interpreted as a rotation matrix in the $M \times M$ latent space. If we substitute the solution for W into the expression for C, and make use of the orthogonality property $\mathbf { R R } ^ { \mathrm { T } } = \mathbf { I }$ , we see that C is independent of R. This simply says that the predictive density is unchanged by rotations in the latent space as discussed earlier. For the particular case of $\mathbf { R } = \mathbf { I }$ , we see that the columns of W are the principal component eigenvectors scaled by the variance parameters $\lambda _ { i } - \sigma ^ { 2 }$ . The interpretation of these scaling factors is clear once we recognize that for a convolution of independent Gaussian distributions (in this case the latent space distribution and the noise model) the variances are additive. Thus the variance $\lambda _ { i }$ in the direction of an eigenvector $\mathbf { u } _ { i }$ is composed of the sum of a contribution $\lambda _ { i } -$ $\sigma ^ { 2 }$ from the projection of the unit-variance latent space distribution into data space through the corresponding column of W, plus an isotropic contribution of variance $\sigma ^ { 2 }$ which is added in all directions by the noise model. 

It is worth taking a moment to study the form of the covariance matrix given by (12.36). Consider the variance of the predictive distribution along some direction specified by the unit vector v, where $\mathbf { v } ^ { \mathrm { T } } \mathbf { v } = 1$ , which is given by $\mathbf { v } ^ { \mathrm { T } } \mathbf { C } \mathbf { v }$ First suppose that v is orthogonal to the principal subspace, in other words it is given by some linear combination of the discarded eigenvectors. Then ${ \bf { v } } ^ { \mathrm { { T } } } { \bf { U } } = { \bf { 0 } }$ and hence $\mathbf { v } ^ { \mathrm { { T } } } \mathbf { C } \mathbf { v } = \sigma ^ { 2 }$ Thus the model predicts a noise variance orthogonal to the principal subspace, which, from (12.46), is just the average of the discarded eigenvalues. Now suppose that $\mathbf { v } = \mathbf { u } _ { i }$ where $\mathbf { u } _ { i }$ is one of the retained eigenvectors defining the principal subspace. Then ${ \bf v } ^ { \mathrm { T } } { \bf C } { \bf v } = ( \lambda _ { i } - \sigma ^ { 2 } ) + \sigma ^ { 2 } = \lambda _ { i }$ . In other words, this model correctly captures the variance of the data along the principal axes, and approximates the variance in all remaining directions with a single average value $\sigma ^ { 2 }$ 

One way to construct the maximum likelihood density model would simply be to find the eigenvectors and eigenvalues of the data covariance matrix and then to evaluate Wand $\sigma ^ { 2 }$ using the results given above. In this case, we would choose $\mathbf { R } = \mathbf { I }$ for convenience. However, if the maximum likelihood solution is found by numerical optimization of the likelihood function, for instance using an algorithm such as conjugate gradients (Fletcher, 1987; Nocedal and Wright, 1999; Bishop and Nabney, 2008) or through the EM algorithm, then the resulting value of R is essentially arbitrary. This implies that the columns of W need not be orthogonal. I an orthogonal basis is required, the matrix W can be post-processed appropriately (Golub and Van Loan, 1996). Alternatively, the EM algorithm can be modified in such a way as to yield orthonormal principal directions, sorted in descending order of the corresponding eigenvalues, directly (Ahn and Oh, 2003). 

The rotational invariance in latent space represents a form of statistical nonidentifiability, analogous to that encountered for mixture models in the case of discrete latent variables. Here there is a continuum of parameters all of which lead to the same predictive density, in contrast to the discrete nonidentifiability associated with component re-labelling in the mixture setting. 

If we consider the case of $M = D$ , so that there is no reduction of dimensionality, then $\mathbf { U } _ { M } = \mathbf { U }$ and $\mathbf { L } _ { M } = \mathbf { L }$ . Making use of the orthogonality properties $\mathbf { U } \dot { \mathbf { U } } ^ { \mathbf { T } } = \mathbf { I }$ and $\mathbf { R R } ^ { \mathbf { T } } = \mathbf { I }$ , we see that the covariance C of the marginal distribution for x becomes 

$$
\mathbf {C} = \mathbf {U} (\mathbf {L} - \sigma^ {2} \mathbf {I}) ^ {1 / 2} \mathbf {R R} ^ {\mathrm{T}} (\mathbf {L} - \sigma^ {2} \mathbf {I}) ^ {1 / 2} \mathbf {U} ^ {\mathrm{T}} + \sigma^ {2} \mathbf {I} = \mathbf {U L U} ^ {\mathrm{T}} = \mathbf {S}\tag{12.47}
$$

and so we obtain the standard maximum likelihood solution for an unconstrained Gaussian distribution in which the covariance matrix is given by the sample covariance. 

Conventional PCA is generally formulated as a projection of points from the Ddimensional data space onto an M -dimensional linear subspace. Probabilistic PCA, however, is most naturally expressed as a mapping from the latent space into the data space via (12.33). For applications such as visualization and data compression, we can reverse this mapping using Bayes' theorem. Any point x in data space can then be summarized by its posterior mean and covariance in latent space. From (12.42) the mean is given by 

$$
\mathbb {E} [ \mathbf {z} | \mathbf {x} ] = \mathbf {M} ^ {- 1} \mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} (\mathbf {x} - \overline {{\mathbf {x}}})\tag{12.48}
$$

where M is given by (12.41). This projects to a point in data space given by 

$$
\mathbf {W} \mathbb {E} [ \mathbf {z} | \mathbf {x} ] + \boldsymbol {\mu}.\tag{12.49}
$$

Note that this takes the same form as the equations for regularized linear regression and is a consequence of maximizing the likelihood function for a linear Gaussian model. Similarly, the posterior covariance is given from (12.42) by $\sigma ^ { 2 } \mathbf { M } ^ { - 1 }$ and is independent of x. 

If we take the limit $\sigma ^ { 2 } \to 0 .$ , then the posterior mean reduces to 

$$
(\mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{ML}}) ^ {- 1} \mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} (\mathbf {x} - \overline {{\mathbf {x}}})\tag{12.50}
$$

which represents an orthogonal projection of the data point onto the latent space, and so we recover the standard PCA model. The posterior covariance in this limit is zero, however, and the density becomes singular. For $\sigma ^ { 2 } > 0 ,$ , the latent projection is shifted towards the origin, relative to the orthogonal projection. 

Finally, we note that an important role for the probabilistic PCA model is in defining a multivariate Gaussian distribution in which the number of degrees of freedom, in other words the number of independent parameters, can be controlled whilst still allowing the model to capture the dominant correlations in the data. Recall that a general Gaussian distribution has $D ( D + 1 ) / 2$ independent parameters in its covariance matrix (plus another D parameters in its mean). Thus the number o parameters scales quadratically with D and can become excessive in spaces of high dimensionality. If we restrict the covariance matrix to be diagonal, then it has only D independent parameters, and so the number of parameters now grows linearly with dimensionality. However, it now treats the variables as if they were independent and hence can no longer express any correlations between them. Probabilistic PeA pro vides an elegant compromise in which the M most significant correlations can be captured while still ensuring that the total number of parameters grows only linearly with D. We can see this by evaluating the number of degrees of freedom in the PPCA model as follows. The covariance matrix C depends on the parameters W, which has size $D \times M$ , and $\sigma ^ { 2 }$ , giving a total parameter count of $D M + 1$ . However, we have seen that there is some redundancy in this parameterization associated with rotations of the coordinate system in the latent space. The orthogonal matrix R that expresses these rotations has size $M \times M$ . In the first column of this matrix there are $M - 1$ independent parameters, because the column vector must be normalized to unit length. In the second column there are $M - 2$ independent parameters, because the column must be normalized and also must be orthogonal to the previous column, and so on. Summing this arithmetic series, we see that R has a total o $M ( M - 1 ) / 2$ independent parameters. Thus the number of degrees of freedom in the covariance matrix C is given by 

$$
D M + 1 - M (M - 1) / 2.\tag{12.51}
$$

The number of independent parameters in this model therefore only grows linearly with $D ,$ for fixed M. If we take $M = D - 1$ 1, then we recover the standard result for a full covariance Gaussian. In this case, the variance along $D - 1$ linearly independent directions is controlled by the columns of W, and the variance along the remaining direction is given by $\sigma ^ { 2 }$ . If $M = 0$ , the model is equivalent to the isotropic covariance case. 

## 12.2.2 EM algorithm for peA

As we have seen, the probabilistic PCA model can be expressed in terms of a marginalization over a continuous latent space z in which for each data point ${ \bf x } _ { n } ,$ there is a corresponding latent variable $\mathbf { z } _ { n }$ . We can therefore make use of the EM algorithm to find maximum likelihood estimates of the model parameters. This may seem rather pointless because we have already obtained an exact closed-form solution for the maximum likelihood parameter values. However, in spaces of high dimensionality, there may be computational advantages in using an iterative EM procedure rather than working directly with the sample covariance matrix. This EM procedure can also be extended to the factor analysis model, for which there is no closed-form solution. Finally, it allows missing data to be handled in a principled way. 

We can derive the EM algorithm for probabilistic PCA by following the general framework for EM. Thus we write down the complete-data log likelihood and take its expectation with respect to the posterior distribution of the latent distribution evaluated using 'old' parameter values. Maximization of this expected completedata log likelihood then yields the 'new' parameter values. Because the data points are assumed independent, the complete-data log likelihood function takes the form 

$$
\ln p \left(\mathbf {X}, \mathbf {Z} | \pmb {\mu}, \mathbf {W}, \sigma^ {2}\right) = \sum_ {n = 1} ^ {N} \left\{\ln p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) + \ln p (\mathbf {z} _ {n}) \right\}\tag{12.52}
$$

where the $n ^ { \mathrm { t h } }$ row of the matrix Z is given by $\mathbf { z } _ { n }$ . We already know that the exact maximum likelihood solution for $\mu$ is given by the sample mean x defined by (12.1), and it is convenient to substitute for $\pmb { \mu }$ at this stage. Making use of the expressions (12.31) and (12.32) for the latent and conditional distributions, respectively, and taking the expectation with respect to the posterior distribution over the latent variables, we obtain 

$$
\begin{array}{l} \mathbb {E} [ \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\mu}, \mathbf {W}, \sigma^ {2}) ] = - \sum_ {n = 1} ^ {N} \left\{\frac {D}{2} \ln (2 \pi \sigma^ {2}) + \frac {1}{2} \operatorname{Tr} \left(\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ]\right) \right. \\ \left. + \frac {1}{2 \sigma^ {2}} \| \mathbf {x} _ {n} - \boldsymbol {\mu} \| ^ {2} - \frac {1}{\sigma^ {2}} \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \mathbf {W} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \boldsymbol {\mu}) \right. \\ \left. + \frac {1}{2 \sigma^ {2}} \operatorname{Tr} \left(\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] \mathbf {W} ^ {\mathrm{T}} \mathbf {W}\right) \right\}. \end{array} \tag {12.53}
$$

Note that this depends on the posterior distribution only through the sufficient statistics of the Gaussian. Thus in the E step, we use the old parameter values to evaluate 

$$
{\mathbb {E} [ \mathbf {z} _ {n} ]} = {\mathbf {M} ^ {- 1} \mathbf {W} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}})}\tag{12.54}
$$

$$
{\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ]} = {\sigma^ {2} \mathbf {M} ^ {- 1} + \mathbb {E} [ \mathbf {z} _ {n} ] \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}}}\tag{12.55}
$$

which follow directly from the posterior distribution (12.42) together with the stan dard result $\mathbb { E } [ \mathbf { z } _ { n } \mathbf { z } _ { n } ^ { \mathrm { T } } ] \stackrel { \cdot } { = } \mathrm { c o v } [ \mathbf { z } _ { n } ] \stackrel { \cdot } { + } \mathbb { E } [ \mathbf { z } _ { n } ] \mathbb { E } [ \mathbf { z } _ { n } ] ^ { \mathrm { T } }$ . Here M is defined by (12.41). 

In the M step, we maximize with respect to Wand $\sigma ^ { 2 }$ , keeping the posterior statistics fixed. Maximization with respect to $\sigma ^ { 2 }$ is straightforward. For the maximization with respect to W we make use of (C.24), and obtain the M-step equations 

Exercise 12.15 

$$
{\mathbf {W} _ {\mathrm{new}}} = {\left[ \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \right] \left[ \sum_ {n = 1} ^ {N} \mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] \right] ^ {- 1}}\tag{12.56}
$$

$$
\begin{array}{r l r} \sigma_ {\mathrm{new}} ^ {2} & = & \frac {1}{N D} \sum_ {n = 1} ^ {N} \left\{\| \mathbf {x} _ {n} - \overline {{\mathbf {x}}} \| ^ {2} - 2 \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{new}} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) \right. \\ & & \left. + \mathrm{Tr} \left(\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] \mathbf {W} _ {\mathrm{new}} ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{new}}\right) \right\}. \end{array}\tag{12.57}
$$

The EM algorithm for probabilistic PCA proceeds by initializing the parameters and then alternately computing the sufficient statistics of the latent space posterior distribution using (12.54) and (12.55) in the E step and revising the parameter values using (12.56) and (12.57) in the M step. 

One of the benefits of the EM algorithm for PCA is computational efficiency for large-scale applications (Roweis, 1998). Unlike conventional PCA based on an eigenvector decomposition of the sample covariance matrix, the EM approach is iterative and so might appear to be less attractive. However, each cycle of the EM algorithm can be computationally much more efficient than conventional PCA in spaces of high dimensionality. To see this, we note that the eigendecomposition of the covariance matrix requires $O ( D ^ { 3 } )$ computation. Often we are interested only in the first M eigenvectors and their corresponding eigenvalues, in which case we can use algorithms that are $O ( M D ^ { 2 } )$ . However, the evaluation of the covariance matrix itself takes $O ( N D ^ { 2 } )$ computations, where N is the number of data points. Algorithms such as the snapshot method (Sirovich, 1987), which assume that the eigenvectors are linear combinations of the data vectors, avoid direct evaluation of the covariance matrix but are $O ( N ^ { 3 } )$ and hence unsuited to large data sets. The EM algorithm described here also does not construct the covariance matrix explicitly. Instead, the most computationally demanding steps are those involving sums over the data set that are $O ( N D M )$ . For large $D _ { v }$ , and $M \ll D$ , this can be a significant saving compared to $O ( N D ^ { 2 } )$ and can offset the iterative nature of the EM algorithm. 

Note that this EM algorithm can be implemented in an on-line form in which each D-dimensional data point is read in and processed and then discarded before the next data point is considered. To see this, note that the quantities evaluated in the E step (an M-dimensional vector and an $M \times M$ matrix) can be computed for each data point separately, and in the M step we need to accumulate sums over data points, which we can do incrementally. This approach can be advantageous if both Nand D are large. 

Because we now have a fully probabilistic model for PCA, we can deal with missing data, provided that it is missing at random, by marginalizing over the distribution of the unobserved variables. Again these missing values can be treated using the EM algorithm. We give an example of the use of this approach for data visualization in Figure 12.11. 

Another elegant feature ofthe EM approach is that we can take the limit $\sigma ^ { 2 } \to 0$ corresponding to standard PCA, and still obtain a valid EM-like algorithm (Roweis, 1998). From (12.55), we see that the only quantity we need to compute in the Estep is $\mathbb { E } [ \mathbf { z } _ { n } ]$ . Furthermore, the M step is simplifie~ because $\mathbf { M } = \mathbf { W } ^ { \mathrm { T } } \bar { \mathbf { W } }$ . To emphasize the simplicity of the algorithm, let us define $\widetilde { \mathbf { X } }$ to be a matrix of size $N \times D$ whose $n ^ { \mathrm { t h } }$ row is given by the vector ${ \bf x } _ { n } - \overline { { \bf x } }$ and similarly define 0 to be a matrix of size $D \times M$ whose $n ^ { \mathrm { t h } }$ row is given by the vector $\mathbb { E } [ \mathbf { z } _ { n } ]$ . The Estep (12.54) of the EM algorithm for PCA then becomes 

$$
\boldsymbol {\Omega} = (\mathbf {W} _ {\mathrm{old}} ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{old}}) ^ {- 1} \mathbf {W} _ {\mathrm{old}} ^ {\mathrm{T}} \widetilde {\mathbf {X}}\tag{12.58}
$$

and the M step (12.56) takes the form 

$$
\mathbf {W} _ {\mathrm{new}} = \widetilde {\mathbf {X}} ^ {\mathrm{T}} \boldsymbol {\Omega} ^ {\mathrm{T}} (\boldsymbol {\Omega} \boldsymbol {\Omega} ^ {\mathrm{T}}) ^ {- 1}.\tag{12.59}
$$

Again these can be implemented in an on-line form. These equations have a simple interpretation as follows. From our earlier discussion, we see that the E step involves an orthogonal projection of the data points onto the current estimate for the principal subspace. Correspondingly, the M step represents a re-estimation of the principa 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/f06ea34d1cb9e27cffcd76a1da46fc32cf2c20dd41da015129f157153fc40cf5.jpg)



Fig".. 12.11 Probabilistic PCA visoo,zsbon 01 a portion 0I1he "" !low data setlo< Ihe !irsl 100 (lata »einls, The left..,...nd plot oIIOWS Ihe I'O"leoo< mean proj9c1ions oIlhfI (lata poims on lhe principal subspace. The ,;gtrI·hi\nd plot is obtained by firsl ran<lomly omitting 30% 0I1he variable .aloo. and lhen us>rlg EM 10 MndIe I"" mi...... values. Note I!IaI eac/1 data poinl1hen NoS allea., one missing mea.u,ement but lhoallhe plot i. ""ry ..mia, to lhe ona obtained wit"""l miss.... valL>ll$


## Ewrrise /2,/7

subspace to minimize !he squared reoonslruCtioo error in 'oIhich the proje<:tion, are C.,N. 

We ean gh'e a ,imple physical analogy for this EM algorithm. which is easily visualized for D = 2 and M = 1. Coo,ider a collectioo nf data point' ,n tWI) dimension', aod let tile u""'-dimensiunal principal subspace be represented by a <ohd rod. Now atlaCh each data point to the nxI via a ,pring oo<:)"ing HooI;:e', law ("umJ energy i, propol1ional 10 ,lie square of lile spring". length). In ll1e E 'tel', we keep the nxI hed and allow the attachment point' tn ,Iide up and <I<,wn ll1e nxI '" a, to minimize ll1e e",,'llY, This cau",. each attachment point (independently) 10 position Itself at the orthogonal pmjeclion of the c~sponding data point onto the nxI. In the M 'tel'. we keep the attachment poiOl' fil<ed and then release tile nxI and allow it to m'>,'e 10 tile minimum energy posilion. 11Ie E and M 'teps are then repeated until a ,uitable c""vergence cri.eri"" is ..,isfled. a. is illuSlrated in Figure 12.12. 

## 12.2.3 Bayesian peA

S<J far in OIlr di",""ioo of PeA. we have ",'.nled Ihal tile '"Ine ,II for ,lie dl,nen,ionalit)" of tile principal .ubspace is gi"en, In praclice. ".-e nlmt cOOose a suilable ,..I"" according 10 the application. For ,isuali,a,ion. we ge""",ny choose .\1 = 2. whereas for OIher application, the approrrialC choice for ,1/ ma)" be less dea,. One appmao:h i. 10 pi", the eigen"alue 'peclrum for lhe data set. analog,•." 10 the example in Figure 12.4 for the off_line digits dala SCI, and look to see if lite eige",,,I .... nmurally form two groups comprising a set of ,mall ,'alues separated by a ,ign;flcant gap from a ",t of relativel)" large ,'alues, indicating a natural cholcc f<>r AI, In practice. such a gap i, oflen ''''' seen 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/44d961abfd5e025a8dc459a52a87045677229af66828b1fdc2c317b5027d8046.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/5fc53ce8e8321070e373582a57f5543d49dbb4fb6c76c36ee5c2ba368484c904.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/5a222952220820be5bb215dd944c075bc5354c83b08cc65d44588709ec8d8b92.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/fe90462b74f40be5da41a8277ca2b68ac27e79b211ba80d56ddc39bbbe3b97b0.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/9236b3b384a88175b716ebebfac60ec8244ba30a97f030be589dde9c00e24e39.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/64e5f047d89a81c518310913ca75193e8a2df949f59ddea88c0c194a648f598d.jpg)



Flgu.. 12.12 Synt"'elic <lata illustrating too EM algorithm !of PCA defined by (12.58) and (1259). (8) A data set X with the data points shown in 1JI'e«l, t"ll"tM' W'i1!1l!>e t'IM pMdpal """"""",IS (shown as eigenveclor1 scaled by It>e squafll 'OOIS 04 the eigeJ'l\lllluel). (b) Initial configurat"'" 01 too principalsul>sl>a<:<t defined by W, shown in md, tOO"lhfIr with the fK'(Ijeclions 01 the latll<11 points Z inlo too <lata space, giItoo by $\mathbf { Z } \mathbf { W } ^ { \mathrm { T } }$ , shown in cyan, (oj Alter""" M step, too laten! SI'B«l P>as been update<! wiIh Z r>el(l nxed. (d) Me' tt>e success.... E Slep, It>e ""'-'eo 01 Z havu been up<!atll<:1. '" Ihogoooal r>rojecliQn$, with W h&k! fixed. (e) Aft.... tile se<:o<l<l M S!flp. <') After l!Ie <sub>MC()<>;l</sub> E st"l'


Be<:au,", th~ pm/xlhi li>lic PeA modd has a well·defined likelillood f"flCtion, we <wId employ cros,-,-.1idation to delermine the \"aJue of di"",nsiooa!ity by "'Iecting tit<: large,t log likelihood t>I1 a '-alidation data set Such an opprooch. hov.·~\-er. can become computationally ro<lly. p3rticularl)' if we CQnsid<:, • probabilistic miXlUre of PeA modds (Tipping and Bishop. 1999a) in "hich we seek 10 <!etermi'" the appropriate dimen,ionalily ",paraltly for toch componenl in lt1e mixm"" 

<sub>Gi'-en thai</sub> w. <sub>ha,-e a probabilislic formulalion of PeA, il s«ms natural 10 s«k</sub> u Buye,ian approach 10 model seleclion. To do thi,. ,,"'e nee<! 10 marginalize 001 the model paramele" $\mu ,$ . \V. und $\sigma ^ { 2 }$ wilh ""peel to appropriate prior distribution'. This Can be done by u,ing a ,-ariation.l framework to .pproxim'le the allulylic.lly intractable murginaliUOi;oo, (Bi,hop. 1mb). 1lIc marginal likelihood v.lues. given by ttle ,'ari.,ionallower bour.d, cun lhen be c<>mpun:d for a r.nge of different '"Tue "f;\I ar.d Itie '"Iue giving Iht largest marginal likelihood ",Iecloo_ 

l1ere we consider. simpler approach introducoo by b.ased on the rddmu "p-

Figure 12.13 Probabilistic graphical model for Bayesian peA in which the distribution over the parameter matrix W is governed by a vector a of hyperparameters. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/77e1e1c53db412e171ce9821c2a403ef4b0528ee4745a930a499e9cedf1bf194.jpg)


proximation, which is appropriate when the number of data points is relatively large and the corresponding posterior distribution is tightly peaked (Bishop, 1999a). It involves a specific choice of prior over W that allows surplus dimensions in the principal subspace to be pruned out of the model. This corresponds to an example of automatic relevance determination, or ARD, discussed in Section 7.2.2. Specifically, we define an independent Gaussian prior over each column of W, which represent the vectors defining the principal subspace. Each such Gaussian has an independent variance governed by a precision hyperparameter $\alpha _ { i }$ so that 

$$
p (\mathbf {W} | \boldsymbol {\alpha}) = \prod_ {i = 1} ^ {M} \left(\frac {\alpha_ {i}}{2 \pi}\right) ^ {D / 2} \exp \left\{- \frac {1}{2} \alpha_ {i} \mathbf {w} _ {i} ^ {\mathrm{T}} \mathbf {w} _ {i} \right\}\tag{12.60}
$$

where $\mathbf { w } _ { i }$ is the $i ^ { \mathrm { t h } }$ column of W. The resulting model can be represented using the directed graph shown in Figure 12.13. 

The values for $\alpha _ { i }$ will be found iteratively by maximizing the marginallikelihood function in which W has been integrated out. As a result of this optimization, some of the $\alpha _ { i }$ may be driven to infinity, with the corresponding parameters vector $\mathbf { w } _ { i }$ being driven to zero (the posterior distribution becomes a delta function at the origin) giving a sparse solution. The effective dimensionality of the principal subspace is then determined by the number of finite $\alpha _ { i }$ values, and the corresponding vectors $\mathbf { w } _ { i }$ can be thought of as 'relevant' for modelling the data distribution. In this way, the Bayesian approach is automatically making the trade-off between improving the fit to the data, by using a larger number of vectors $\mathbf { w } _ { i }$ with their corresponding eigenvalues $\lambda _ { i }$ each tuned to the data, and reducing the complexity o the model by suppressing some of the ${ \bf w } _ { i }$ vectors. The origins of this sparsity were discussed earlier in the context of relevance vector machines. 

The values of $\alpha _ { i }$ are re-estimated during training by maximizing the log marginal likelihood given by 

$$
p (\mathbf {X} | \boldsymbol {\alpha}, \boldsymbol {\mu}, \sigma^ {2}) = \int p (\mathbf {X} | \mathbf {W}, \boldsymbol {\mu}, \sigma^ {2}) p (\mathbf {W} | \boldsymbol {\alpha}) \mathrm{d} \mathbf {W}\tag{12.61}
$$

where the log of $p ( \mathbf { X } | \mathbf { W } , \mu , \sigma ^ { 2 } )$ is given by (12.43). Note that for simplicity we also treat $\pmb { \mu }$ and $\bar { \sigma } ^ { 2 }$ as parameters to be estimated, rather than defining priors over these parameters. 

Section 4.4 

Section 3.5.3 

Because this integration is intractable, we make use of the Laplace approximation. If we assume that the posterior distribution is sharply peaked, as will occur for sufficiently large data sets, then the re-estimation equations obtained by maximizing the marginal likelihood with respect to $\alpha _ { i }$ take the simple form 

$$
\alpha_ {i} ^ {\mathrm{new}} = \frac {D}{\mathbf {w} _ {i} ^ {\mathrm{T}} \mathbf {w} _ {i}}\tag{12.62}
$$

which follows from (3.98), noting that the dimensionality of $\mathbf { w } _ { i }$ is $D .$ These reestimations are interleaved with the EM algorithm updates for determining Wand $\sigma ^ { 2 }$ • The E-step equations are again given by (12.54) and (12.55). Similarly, the M step equation for $\sigma ^ { 2 }$ is again given by (12.57). The only change is to the M-step equation for W, which is modified to give 

$$
\mathbf {W} _ {\mathrm{new}} = \left[ \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \right] \left[ \sum_ {n = 1} ^ {N} \mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] + \sigma^ {2} \mathbf {A} \right] ^ {- 1}\tag{12.63}
$$

where $\mathbf { A } = \mathrm { d i a g } ( \alpha _ { i } )$ ' The value of $\mu$ is given by the sample mean, as before. 

If we choose $M = D - 1$ then, if all $\alpha _ { i }$ values are finite, the model represents a full-covariance Gaussian, while if all the $\alpha _ { i }$ go to infinity the model is equivalen to an isotropic Gaussian, and so the model can encompass all pennissible values for the effective dimensionality of the principal subspace. It is also possible to consider smaller values of $M$ , which will save on computational cost but which will limit the maximum dimensionality of the subspace. A comparison of the results of this algorithm with standard probabilistic PCA is shown in Figure 12.14. 

Bayesian PCA provides an opportunity to illustrate the Gibbs sampling algorithm discussed in Section 11.3. Figure 12.15 shows an example of the samples from the hyperparameters In $\alpha _ { i }$ for a data set in $D = 4$ dimensions in which the di mensionality of the latent space is $M = 3$ but in which the data set is generated from a probabilistic PCA model having one direction of high variance, with the remaining directions comprising low variance noise. This result shows clearly the presence of three distinct modes in the posterior distribution. At each step of the iteration, one of the hyperparameters has a small value and the remaining two have large values, so that two of the three latent variables are suppressed. During the course of the Gibbs sampling, the solution makes sharp transitions between the three modes. 

The model described here involves a prior only over the matrix W. A fully Bayesian treatment of PCA, including priors over $\mu , \sigma ^ { 2 }$ , and $\pmb { \alpha } ,$ , and solved using variational methods, is described in Bishop (1999b). For a discussion of various Bayesian approaches to detennining the appropriate dimensionality for a PCA model, see Minka (2001c). 

## 12.2.4 Factor analysis

Factor analysis is a linear-Gaussian latent variable model that is closely related to probabilistic PCA. Its definition differs from that of probabilistic PCA only in that the conditional distribution of the observed variable x given the latent variable z is taken to have a diagonal rather than an isotropic covariance so that 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/57229e54c0b5f1d138c830c4d439279bcceb03e8f0128350b84a92adc2b658f9.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/9ed0142cd9d06c62628a292f2f73da17457daa4fd05984df499016380b06a227.jpg)



Figure 12.14 'Hinloo' diagrams of the matrix W in which each element 01 the matrix is depicted as a square (white lor positive and black lor negative values) whose area is proportiona to the magnitude of that element. The synthetic data sel comprises 300 data points in D = 10 dimensions sampled from a Gaussian distribution having standard deviation 1.0 in 3 directions and standard deviation 0.5 in the remaining 7 directions for a data set in D = 10 dimensions having AT = 3 directions with larger variance than the remaining 7 directions. The left-hand plol shows the result Irom maximum likelihood probabilistic PCA, and the left·hand plot shows the corresponding resuft from Bayesian peA. We see how the Bayesian model is able to discover the appropriate dimensionality by suppressing the 6 surplus degrees of freedom.


$$
p (\mathbf {x} | \mathbf {z}) = \mathcal {N} (\mathbf {x} | \mathbf {W} \mathbf {z} + \boldsymbol {\mu}, \boldsymbol {\Psi})\tag{12.64}
$$

where ill is a $D \times D$ diagonal matrix. Note that the factor analysis model, in common with probabilistic PCA. assumes that the observed variables $x _ { 1 } , \ldots , x _ { D }$ are independent. given the latent variable z. In essence. the factor analysis model is explaining the observed covariance structure of the data by representing the independent variance associated with each coordinate in the matrix 1J.' and capturing the covariance between variables in the matrix W. In the factor analysis literature. the columns of W. which capture the correlations between observed variables. are calledfaclOr loadings. and the diagonal elements of 1J.'. which represent the independent noise variances for each of the variables, are called llniqllenesses. 

The origins of factor analysis are as old as those of PCA. and discussions of factor analysis can be found in the books by Everitt (1984). Bartholomew (1987), and Basilevsky (1994). Links between factor analysis and PCA were investigated by Lilwley (1953) and Anderson (1963) who showed that at stationary points o the likelihood function. for a faclOr analysis model with $\boldsymbol { \Psi } = \sigma ^ { 2 } \mathbf { I }$ , the columns o W are scaled eigenvectors of the sample covariance matrix. and $\sigma ^ { 2 }$ is the average of the discarded eigenvalues. Later. Tipping and Bishop (1999b) showed that the maximum of the log likelihood function occurs when the eigenvectors comprising Ware chosen to be the principal eigenvectors. 

Making use of (2.115). we see that the marginal distribution for the observed 


Gillbs .,,,,>p!j"lllo< Bay<lslan PCA sh<Ming plots oj In $\alpha _ { i }$ versus ~eralion number br three " values. showing tr"""tions betw..... tbe th"'" moOts <A !he posterior distribution.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/1bd3bc01860e57f91fe52a86e7ccf4104faf213f15b555214529db7c5204af1c.jpg)


,-"riabl, i' gi,-,n by $p ( \mathbf { x } ) = \mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \mathbf { C } )$ whe... now 

$$
\mathbf {C} = \mathbf {W} \mathbf {W} ^ {\mathrm{T}} + \boldsymbol {\Psi}.\tag{12.65}
$$

As with probabilistic PC A, thi, moMI is im-"ri.rrl to 'Olalions in 11><0 latent 'pace. 

Histoocally, factor anal)',;s has been lhe ,ubjerl of cOl1tro,-ersy wroe" a!tempt< h",-e bttn "'a<k: to place an intc'P"'t"lioo on the ind;vidual faclon (the cOOfdinates in z_space). which h3.\ pm"en problematic due to lr.e """i<lcmifiabilily of factOf analysis associmed with Mation' in this 'pace. From oor perspeoh-e, howe,-er. we shall .iew factor analysis as a form of lalent "ariable densily model. in which the form of tl>c lalent 'pace i' of interest but nO! the particular choicc of coordinates used to descrit>c il. If we wish to remove the degeneracy a'sociated with latent 'pace roIations. ""e mu,t con'ider non-Gaussian latent ,-"riable di'tribution,. gi"irrg rise 10 independent component .n.lysi, (lCA) models. 

We can detenni"e the parameters $\mu ,$ . \V. "nd .... in the fac!Of an.ly,i, model by muimum likelihood. 11.. solution for $\mu$ i' ag"in given by the ",,,,pie "'ean. How· eyC'. "nli~e probabili,tic l'CA.lllcre i' no longer a closed-form maximum likelihood solution for \V. ",'hich mu.\ltherdorc be found i'er.li,'c1)'_ Because faclor anal)',i. is a latent variable modeL thi' can be don. using an EM algorilhm (R.bin and Thayer. 1982) !h"t is "nalogou, to the one used (Of pml>;lbili.tie PeA. Specihcally. lhe E-'lep eqnJtioo, are g;'-en by 

$$
\mathbb {E} [ \mathbf {z} _ {n} ] = \mathbf {G W} ^ {\mathrm{T}} \boldsymbol {\Psi} ^ {- 1} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}})\tag{12.66}
$$

$$
{\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ]} = {\mathbf {G} + \mathbb {E} [ \mathbf {z} _ {n} ] \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}}}\tag{12.67}
$$

where ""e h",'e defi""d 

$$
\mathbf {G} = (\mathbf {I} + \mathbf {W} ^ {\mathrm{T}} \boldsymbol {\Psi} ^ {- 1} \mathbf {W}) ^ {- 1}.\tag{12.68}
$$

NOie th"t thi' i' e.pre,<ed in a for'" thai in,-oh'es inycrsi"n ofmal rices "f SilO $M \times M$ rathe'lhan $D \times D$ (ex"",,,, for tbe $D \times D$ diagooal matrix $\Psi$ "'hose in,-erse i.' 'ri"ial to compute in $O ( D )$ steps), which is convenient because often $M \ll D$ . Similarly, the M-step equations take the form 

$$
{\mathbf {W} ^ {\mathrm{new}}} = {\left[ \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \right] \left[ \sum_ {n = 1} ^ {N} \mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] \right] ^ {- 1}}\tag{12.69}
$$

$$
{\boldsymbol {\Psi} ^ {\mathrm{new}}} = {\mathrm{diag} \left\{\mathbf {S} - \mathbf {W} _ {\mathrm{new}} \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbb {E} [ \mathbf {z} _ {n} ] (\mathbf {x} _ {n} - \overline {{{\mathbf {x}}}}) ^ {\mathrm{T}} \right\}}\tag{12.70}
$$

where the 'diag' operator sets all of the nondiagonal elements of a matrix to zero. A Bayesian treatment of the factor analysis model can be obtained by a straightforward application of the techniques discussed in this book. 

Another difference between probabilistic PCA and factor analysis concerns their different behaviour under transformations of the data set. For PCA and probabilistic PCA, if we rotate the coordinate system in data space, then we obtain exactly the same fit to the data but with the W matrix transformed by the corresponding rotation matrix. However, for factor analysis, the analogous property is that if we make a component-wise re-scaling of the data vectors, then this is absorbed into a corresponding re-scaling of the elements of $\Psi$ 

## 12.3. Kernel peA

In Chapter 6, we saw how the technique of kernel substitution allows us to take an algorithm expressed in terms of scalar products of the form $\mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ and generalize that algorithm by replacing the scalar products with a nonlinear kernel. Here we apply this technique of kernel substitution to principal component analysis, thereby obtaining a nonlinear generalization called kernel peA (Scholkopf et al., 1998). 

Consider a data set $\left\{ \mathbf { x } _ { n } \right\}$ of observations, where $n = 1 , \ldots , N .$ , in a space o dimensionality $D$ In order to keep the notation uncluttered, we shall assume that we have already subtracted the sample mean from each of the vectors ${ \bf x } _ { n }$ , so that $\textstyle \sum _ { n } \mathbf { x } _ { n } = \mathbf { 0 }$ . The first step is to express conventional PCA in such a form that the data vectors $\left\{ \mathbf { x } _ { n } \right\}$ appear only in the form of the scalar products ${ \bf x } _ { n } ^ { \mathrm { T } } { \bf x } _ { m }$ . Recall that the principal components are defined by the eigenvectors $\mathbf { u } _ { i }$ of the covariance matrix 

$$
\mathbf {S u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{12.71}
$$

where $i = 1 , \ldots , D$ . Here the $D \times D$ sample covariance matrix S is defined by 

$$
\mathbf {S} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} \mathbf {x} _ {n} ^ {\mathrm{T}},\tag{12.72}
$$

and the eigenvectors are normalized such that $\mathbf { u } _ { i } ^ { \mathrm { T } } \mathbf { u } _ { i } = 1$ 

Now consider a nonlinear transformation $\phi ( \mathbf { x } )$ into an M -dimensional feature space, so that each data point ${ \bf x } _ { n }$ is thereby projected onto a point $\phi (  { \mathbf { x } } _ { n } )$ ). We can __ ptrform )l-.bnl PeA ill fnlllK lopICe. ..-Iudl,mpIiclIly «lIi'Il'S • - ' _ prinClpaI ....-.. model ill onpnll cbuo as ,1lU>tr*d in FllIft 12-16. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/2814462749fa4ab7bf372ba796e6cd2e2a85acdd3138895391e9592cafa1a9ca.jpg)



Figu'.12.16 SctIematic _,.lion 01 kernel PeA. A <Utll HI In lhe Oflglnal <Uta space l~'_ plot} .. PfOlEled by' """'*- tranllklfmalion $\phi ( \mathbf { x } )$ 1nIo. fa.tur. space (fIght_ plot). By I*b'~ PCA in the !Hue 111**. we oblaO'Ilha pmeiIlaI ~"llS. "'who<:tllha tnt Ie ......... in blUe.,.., .. oJano4ed by lha vector $\mathbf { v } _ { 1 }$ Tha gr-. . . . . In IMIuN apam indicMa Iha _ plOlKlio". onIO lhe Iirsl poiridl* '""" ......... 11 """'*' _ o d 110 ""'*- poOf&Cllu. in .... <lfisIonaI Oillll 111**. Hole IIuIIIn gMefM' la nol pox ' .. 110 '. . . . . . 1ha, ... iIio_ poi ........ 00i' ........ b y . _ 1 n "apam.


Fu "IO..It.. lei '" lOS!oUlllt 1Nl Illt diu. lObo halnro mean, !hal $\textstyle \sum _ { n } \phi ( \mathbf { x } _ { n } ) = \mathbf { 0 }$ . We dWl rctlll'1l 10 Itl,~ pol'" .Ihonly. 1ll $M \times M$ "'"""* CO\-.ullCC mMfU ,n (~ .If*'e ,~ l"" by 

$$
\mathbf {C} = \frac {1}{N} \sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}}\tag{12.73}
$$

and ,l~ ",,,,n'"MOl" opan,ion i' «lined by 

$$
\mathbf {C} \mathbf {v} _ {i} = \lambda_ {i} \mathbf {v} _ {i}\tag{12.74}
$$

$i = 1 , \dots , M$ . Our goal is 10 soh'" lhis eigen"lIlue problem WilhoUl ha"inlllO work ."plici,ly in ,he f.lIture 'pace. From !he definilion of C. lhe .ill"""""l"'" equal ions lell' U, thaI $\mathbf { v } _ { i }$ !-ali,fies 

$$
\frac {1}{N} \sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \left\{\phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \mathbf {v} _ {i} \right\} = \lambda_ {i} \mathbf {v} _ {i}\tag{12.75}
$$

........ ..-" . - lN1 (proo.idcd $\lambda _ { i } > 0 )$ ) tilt "CC'lo $\mathbf { v } _ { i }$ , is li''n by • Ii_ rombllla"on ofIll $\phi ( \mathbf { x } _ { n } )$ J ..... JO <;.- he "-"llm iIllhc (orm 

$$
\mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} a _ {i n} \phi (\mathbf {x} _ {n}).\tag{12.76}
$$

Substituting this expansion back into the eigenvector equation, we obtain 

$$
\frac {1}{N} \sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \sum_ {m = 1} ^ {N} a _ {i m} \phi (\mathbf {x} _ {m}) = \lambda_ {i} \sum_ {n = 1} ^ {N} a _ {i n} \phi (\mathbf {x} _ {n}).\tag{12.77}
$$

The key step is now to express this in terms of the kernel function $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } ) =$ $\phi (  { \mathbf { x } } _ { n } ) ^ { \mathrm { T } } \phi (  { \mathbf { x } } _ { m } )$ , which we do by multiplying both sides by $\phi ( \mathbf { x } _ { l } ) ^ { \mathrm { T } }$ to give 

$$
\frac {1}{N} \sum_ {n = 1} ^ {N} k (\mathbf {x} _ {l}, \mathbf {x} _ {n}) \sum_ {m = 1} ^ {m} a _ {i m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = \lambda_ {i} \sum_ {n = 1} ^ {N} a _ {i n} k (\mathbf {x} _ {l}, \mathbf {x} _ {n}).\tag{12.78}
$$

This can be written in matrix notation as 

$$
\mathbf {K} ^ {2} \mathbf {a} _ {i} = \lambda_ {i} N \mathbf {K} \mathbf {a} _ {i}\tag{12.79}
$$

where ${ \bf a } _ { i }$ is an N-dimensional column vector with elements $a _ { n i }$ for $n = 1 , \ldots , N$ We can find solutions for $\mathbf { a } _ { i }$ by solving the following eigenvalue problem 

$$
\mathbf {K} \mathbf {a} _ {i} = \lambda_ {i} N \mathbf {a} _ {i}\tag{12.80}
$$

in which we have removed a factor of K from both sides of (12.79). Note that the solutions of (12.79) and (12.80) differ only by eigenvectors of K having zero eigenvalues that do not affect the principal components projection. 

The normalization condition for the coefficients $\mathbf { a } _ { i }$ is obtained by requiring that the eigenvectors in feature space be normalized. Using (12.76) and (12.80), we have 

$$
1 = \mathbf {v} _ {i} ^ {\mathrm{T}} \mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} a _ {i n} a _ {i m} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) = \mathbf {a} _ {i} ^ {\mathrm{T}} \mathbf {K} \mathbf {a} _ {i} = \lambda_ {i} N \mathbf {a} _ {i} ^ {\mathrm{T}} \mathbf {a} _ {i}.\tag{12.81}
$$

Having solved the eigenvector problem, the resulting principal component projections can then also be cast in terms of the kernel function so that, using (12.76), the projection of a point x onto eigenvector i is given by 

$$
y _ {i} (\mathbf {x}) = \phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} a _ {i n} \phi (\mathbf {x}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) = \sum_ {n = 1} ^ {N} a _ {i n} k (\mathbf {x}, \mathbf {x} _ {n})\tag{12.82}
$$

and so again is expressed in terms of the kernel function. 

In the original D-dimensional x space there are D orthogonal eigenvectors and hence we can find at most D linear principal components. The dimensionality M of the feature space, however, can be much larger than D (even infinite), and thus we can find a number of nonlinear principal components that can exceed D. Note, however, that the number of nonzero eigenvalues cannot exceed the number N of data points, because (even if $M > N )$ the covariance matrix in feature space has rank at most equal to N. This is reflected in the fact that kernel PCA involves the eigenvector expansion of the $N \times N$ matrix K. 

So far we have assumed that the projected data set given by $\phi (  { \mathbf { x } } _ { n } )$ has zero mean, which in general will not be the case. We cannot simply compute and then subtract off the mean, since we wish to avoid working directly in feature space, and so again, we formulate the algorithm purely in-!erms of the kernel function. The projected data points after centralizing, denoted $\widetilde { \phi } ( \mathbf { x } _ { n } )$ ), are given by 

$$
\widetilde {\phi} (\mathbf {x} _ {n}) = \phi (\mathbf {x} _ {n}) - \frac {1}{N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {l})\tag{12.83}
$$

and the corresponding elements of the Gram matrix are given by 

$$
\begin{array}{r c l} \widetilde {K} _ {n m} & = & \widetilde {\phi} (\mathbf {x} _ {n}) ^ {\mathrm{T}} \widetilde {\phi} (\mathbf {x} _ {m}) \\ & = & \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) - \frac {1}{N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {l}) \\ & & - \frac {1}{N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {l}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) + \frac {1}{N ^ {2}} \sum_ {j = 1} ^ {N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {j}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {l}) \\ & = & k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) - \frac {1}{N} \sum_ {l = 1} ^ {N} k (\mathbf {x} _ {l}, \mathbf {x} _ {m}) \\ & & - \frac {1}{N} \sum_ {l = 1} ^ {N} k (\mathbf {x} _ {n}, \mathbf {x} _ {l}) + \frac {1}{N ^ {2}} \sum_ {j = 1} ^ {N} \sum_ {l = 1} ^ {N} k (\mathbf {x} _ {j}, \mathbf {x} _ {l}). \end{array}\tag{12.84}
$$

This can be expressed in matrix notation as 

$$
\widetilde {\mathbf {K}} = \mathbf {K} - \mathbf {1} _ {N} \mathbf {K} - \mathbf {K} \mathbf {1} _ {N} + \mathbf {1} _ {N} \mathbf {K} \mathbf {1} _ {N}\tag{12.85}
$$

Exercise 12.27 

where ${ \bf 1 } _ { N }$ denotes the $N \times N$ matrix in which every element takes the value $1 / N$ Thus we can evaluate $\tilde { \bf K }$ using only the kernel function and then use $\tilde { \bf K }$ to determine the eigenvalues and eigenvectors. Note that the standard PCA algorithm is recovered as a special case if we use a linear kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ . Figure 12.17 shows an example of kernel PCA applied to a synthetic data set (Scholkopf et al., 1998). Here a 'Gaussian' kernel of the form 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp (- \| \mathbf {x} - \mathbf {x} ^ {\prime} \| ^ {2} / 0. 1)\tag{12.86}
$$

is applied to a synthetic data set. The lines correspond to contours along which the projection onto the corresponding principal component, defined by 

$$
\phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} a _ {i n} k (\mathbf {x}, \mathbf {x} _ {n})\tag{12.87}
$$

is constant. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/a10aabffc7d85e30dc01d2c937870f2991a2ce4378475eeba18e9f59565c8ce8.jpg)



Figure 12.11 E"llmple 01 kernel PCA, with a Gaussian kernel awIiOO 10 a synthetic <lata sat in two <:Iirnensions, showing !he firsl flight eigenfunclions along w~h l!>eir e9tnvailNls. The oootours am lines along which !he <sub>projoc1ion</sub> onlo t"" COffaspMding principal <sub>componen1ls</sub> co<>stam, Nola <sub>haw Ihe</sub> firsl two ....,..rat. <sub>!he th"'" dusters. !he ""'"</sub> Ill"'" <sub>spIiI</sub> ""'*' <sub>oIlhe eluste, into haMoS. and</sub> t"" <sub>lolIowing Ihree</sub> again spI~!he duste," into halves along directions orthogonal 10 tho prEMouS splils,


One obvioo' dls.aJmota~eof I:emel !'CA Is thaf if invoh'es finding lhe elgen"e<- tors of the $N \times N$ malri>: $\tilde { \bf K }$ raW. Ihan lhe $D \times D$ malri, S of cor,..emionallinea !'CA. and!iO In prac1lce for large data "'1' appro,lmation< are often uS(:d 

Finally. ""e OOIe that i" <tandard linear I'CA, we often retain some redoce<l num· ber $L < \dot { D }$ of eigenvectors and then appro,lmale 0 data vttl<:>r $\mathbf { x } _ { n }$ b}' its projection ${ \widehat { \mathbf { x } } } _ { n }$ 0,,1" lhe L-dimensional principal subspace, defined by 

$$
\widehat {\mathbf {x}} _ {n} = \sum_ {i = 1} ^ {L} \left(\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) \mathbf {u} _ {i}.\tag{12.88}
$$

I" kernell'CA. this will in gencr~1 not be flO'slble, To see thl', OOIe Ihat the mapping $\phi ( \mathbf { x } )$ maps the D-dimensional x space i"t" 0 D-dimensioo.l manijQiII in lhe M-dimemioo.l femure space $\phi .$ TlIe: .'ector x i' koown a< lhe f'",.imagr of lhe c","""ponding poi"l $\phi ( \mathbf { x } )$ . However, fhe projec1ioo of poinl> in feature <J'3C" ""to the linear rcA ,ub,p""" in that 'pace will typically"''' lie On fhe nonlinear D-<sub>dimensional manifold</sub> and <sub>!iO will nul</sub> ha.,. <sub>a c"""",pondlng</sub> p",.lmo~e<sub>in dOlO spa<."C,</sub> Technlque< ho.-e lherefore bttn proposed for finding approximale pre-image< iB""lr Nat.. 2(04). 

## 12.4. Nonlinear Latent Variable Models

In this chapter, we have focussed on the simplest class of models having continuous latent variables, namely those based on linear-Gaussian distributions. As well as having great practical importance, these models are relatively easy to analyse and to fit to data and can also be used as components in more complex models. Here we consider briefly some generalizations of this framework to models that are either nonlinear or non-Gaussian, or both. 

In fact, the issues of nonlinearity and non-Gaussianity are related because a general probability density can be obtained from a simple fixed reference density, such as a Gaussian, by making a nonlinear change of variables. This idea forms the basis of several practical latent variable models as we shall see shortly. 

## 12.4.1 Independent component analysis

We begin by considering models in which the observed variables are related linearly to the latent variables, but for which the latent distribution is non-Gaussian. An important class of such models, known as independent component analysis, or leA, arises when we consider a distribution over the latent variables that factorizes, so that 

$$
p (\mathbf {z}) = \prod_ {j = 1} ^ {M} p (z _ {j}).\tag{12.89}
$$

To understand the role of such models, consider a situation in which two people are talking at the same time, and we record their voices using two microphones. If we ignore effects such as time delay and echoes, then the signals received by the microphones at any point in time will be given by linear combinations of the amplitudes of the two voices. The coefficients of this linear combination will be constant, and if we can infer their values from sample data, then we can invert the mixing process (assuming it is nonsingular) and thereby obtain two clean signals each of which contains the voice ofjust one person. This is an example of a problem called blind source separation in which 'blind' refers to the fact that we are given only the mixed data, and neither the original sources nor the mixing coefficients are observed (Cardoso, 1998). 

This type of problem is sometimes addressed using the following approach (MacKay, 2003) in which we ignore the temporal nature of the signals and treat the successive samples as i.i.d. We consider a generative model in which there are two latent variables corresponding to the unobserved speech signal amplitudes, and there are two observed variables given by the signal values at the microphones. The laten variables have ajoint distribution that factorizes as above, and the observed variables are given by a linear combination of the latent variables. There is no need to include a noise distribution because the number of latent variables equals the number of observed variables, and therefore the marginal distribution of the observed variables will not in general be singular, so the observed variables are simply deterministic linear combinations of the latent variables. Given a data set of observations, the likelihood function for this model is a function of the coefficients in the linear combination. The log likelihood can be maximized using gradient-based optimization giving rise to a particular version of independent component analysis. 

The success of this approach requires that the latent variables have non-Gaussian distributions. To see this, recall that in probabilistic PCA (and in factor analysis) the latent-space distribution is given by a zero-mean isotropic Gaussian. The model therefore cannot distinguish between two different choices for the latent variables where these differ simply by a rotation in latent space. This can be verified directly by noting that the marginal density (12.35), and hence the likelihood function, is unchanged if we make the transformation W -) WR where R is an orthogonal matrix satisfying $\mathbf { R R } ^ { \mathrm { T } } = \mathbf { I } .$ , because the matrix C given by (12.36) is itself invariant. Extending the model to allow more general Gaussian latent distributions does not change this conclusion because, as we have seen, such a model is equivalent to the zero-mean isotropic Gaussian latent variable model. 

Another way to see why a Gaussian latent variable distribution in a linear model is insufficient to find independent components is to note that the principal components represent a rotation of the coordinate system in data space such as to diagonalize the covariance matrix, so that the data distribution in the new coordinates is then uncorrelated. Although zero correlation is a necessary condition for independence it is not, however, sufficient. In practice, a common choice for the latent-variable distribution is given by 

$$
p (z _ {j}) = \frac {1}{\pi \cosh (z _ {j})} = \frac {1}{\pi \left(e ^ {z _ {j}} + e ^ {- z _ {j}}\right)}\tag{12.90}
$$

which has heavy tails compared to a Gaussian, reflecting the observation that many real-world distributions also exhibit this property. 

The original ICA model (Bell and Sejnowski, 1995) was based on the optimization of an objective function defined by information maximization. One advantage of a probabilistic latent variable formulation is that it helps to motivate and formulate generalizations of basic ICA. For instance, independentfactor analysis (Attias, 1999a) considers a model in which the number of latent and observed variables can differ, the observed variables are noisy, and the individual latent variables have flexible distributions modelled by mixtures of Gaussians. The log likelihood for this model is maximized using EM, and the reconstruction of the latent variables is approximated using a variational approach. Many other types of model have been considered, and there is now a huge literature on ICA and its applications (Jutten and Herault, 1991; Comon et at., 1991; Amari et at., 1996; Pearlmutter and Parra, 1997; Hyvarinen and Oja, 1997; Hinton et at., 2001; Miskin and MacKay, 2001; Hojen-Sorensen et at., 2002; Choudrey and Roberts, 2003; Chan et at., 2003; Stone, 2004). 

## 12.4.2 Autoassociative neural networks

In Chapter 5 we considered neural networks in the context of supervised learn ing, where the role of the network is to predict the output variables given values 

Figure 12.18 


An autoassociative mUltilayer perceptron havin two layers of weights. Such a network is trained to map input vectors onto themselves by minimiza tion ot a sum-ot-squares error. Even with non linear units in the hidden layer, such a network is equivalent to linear principal component anal ysis. Links representing bias parameters have been omitted for clarity.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/be677a212d2077b2882a379ff253639f765321e8a0da5317d78561ed2f51cd65.jpg)


for the input variables. However, neural networks have also been applied to un supervised learning where they have been used for dimensionality reduction. Thi is achieved by using a network having the same number of outputs as inputs, and optimizing the weights so as to minimize some measure of the reconstruction erro between inputs and outputs with respect to a set of training data. 

Consider first a multilayer perceptron of the form shown in Figure 12.18, having D inputs, $D$ output units and M hidden units, with $M < D$ . The targets used to train the network are simply the input vectors themselves, so that the network is attempting to map each input vector onto itself. Such a network is said to form an autoassociative mapping. Since the number of hidden units is smaller than the number of inputs, a perfect reconstruction of all input vectors is not in general possible. We therefore determine the network parameters w by minimizing an error function which captures the degree of mismatch between the input vectors and their reconstructions. In particular, we shall choose a sum-of-squares error of the form 

$$
E (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \| \mathbf {y} (\mathbf {x} _ {n}, \mathbf {w}) - \mathbf {x} _ {n} \| ^ {2}.\tag{12.91}
$$

If the hidden units have linear activations functions, then it can be shown that the error function has a unique global minimum, and that at this minimum the network performs a projection onto the M -dimensional subspace which is spanned by the first M principal components of the data (Bourlard and Kamp, 1988; Baldi and Hornik, 1989). Thus, the vectors of weights which lead into the hidden units in Figure 12.18 form a basis set which spans the principal subspace. Note, however, that these vectors need not be orthogonal or normalized. This result is unsurprising, since both principal component analysis and the neural network are using linear dimensionality reduction and are minimizing the same sum-of-squares error function. 

It might be thought that the limitations of a linear dimensionality reduction could be overcome by using nonlinear (sigmoidal) activation functions for the hidden units in the network in Figure 12.18. However, even with nonlinear hidden units, the minimum error solution is again given by the projection onto the principal component subspace (Bourlard and Kamp, 1988). There is therefore no advantage in using twolayer neural networks to perform dimensionality reduction. Standard techniques for principal component analysis (based on singular value decomposition) are guaranteed to give the correct solution in finite time, and they also generate an ordered set of eigenvalues with corresponding orthonormal eigenvectors. 


Addition of extra hidden layers of noolinear units gives an auloassocialive network which can perform a noolinear dimensiooality reduction.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/0ae85397bbfa0a67b95bd7b20d38c3558a1a624a4b35abe844986aa49f40d5c7.jpg)


The situation is different, however. if additional hidden layers are pcrmillcd in the network. Consider the four-layer autoassociativc network shown in Figure 12.19. Again the output units are linear, and the M units in the second hidden layer can also be linear. however, the first and third hidden layers have sigmoidal nonlinear activation functions. The network is again trained by minimization of the error function (12.91). We can view this network as two successive functional mappings $\mathbf { F } _ { 1 }$ and $\mathbf { F } _ { 2 }$ , as indicated in Figure 12.19. The first mapping $\mathbf { F } _ { 1 }$ projects the original $D _ { - }$ dimensional data onto an AI-dimensional subspace $s$ defined by the activations o the units in the second hidden layer. Because of the presence of the first hidden layer of nonlinear units. this mapping is very general. and in particular is not restricted to being linear. Similarly. the second half of the network defines an arbitrary functional mapping from the M -dimensional space back into the original D-dimensional input space. This has a simple geometrical interpretation. as indicated for the case $D = 3$ and $M = 2$ in Figure 12.20. 

Such a network effectively perfonns a nonlinear principal component analysis. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/94b41c6183ddba62929e3472218cf3a79724d5af12ab8ac60a14f8f3890dd097.jpg)



Figure 12.20 Geometrical interpretation of the mappings performed by the network in Figure 12.1 g for the case of $\mathrm { ~ D = 3 }$ inputs and $M = 2$ units in the middle hidden layer. The function F, maps from an M-dimensiona $\mathbf { F } _ { 2 }$ space S into a D-dimensiooal space and therefore defines the way in which the space S is embedded within the original x-space. Since the mapping $\mathbf { F } _ { 2 }$ can be r"I()(llinear, the embedding 0 $s$ can be nonplanar, as indicated in the figure. The mapping $\mathbf { F } _ { 1 }$ then defines a projectiorl of points in the original D-dimensional space into the M -dimensional subspace $s .$


It has the advantage of not being limited to linear transformations, although it con tains standard principal component analysis as a special case. However, training the network now involves a nonlinear optimization problem, since the error function (12.91) is no longer a quadratic function of the network parameters. Computation ally intensive nonlinear optimization techniques must be used, and there is the risk o finding a suboptimal local minimum of the error function. Also, the dimensionality of the subspace must be specified before training the network. 

## 12.4.3 Modelling nonlinear manifolds

As we have already noted, many natural sources of data correspond to lowdimensional, possibly noisy, nonlinear manifolds embedded within the higher dimensional observed data space. Capturing this property explicitly can lead to im proved density modelling compared with more general methods. Here we conside briefly a range of techniques that attempt to do this. 

One way to model the nonlinear structure is through a combination of linear models, so that we make a piece-wise linear approximation to the manifold. This can be obtained, for instance, by using a clustering technique such as K -means based on Euclidean distance to partition the data set into local groups with standard PCA ap plied to each group. A better approach is to use the reconstruction error for cluster assignment (Kambhatla and Leen, 1997; Hinton et al., 1997) as then a common cost function is being optimized in each stage. However, these approaches still suffe from limitations due to the absence of an overall density model. By using prob abilistic PCA it is straightforward to define a fully probabilistic model simply by considering a mixture distribution in which the components are probabilistic PCA models (Tipping and Bishop, 1999a). Such a model has both discrete latent variables, corresponding to the discrete mixture, as well as continuous latent variables, and the likelihood function can be maximized using the EM algorithm. A fully Bayesian treatment, based on variational inference (Bishop and Winn, 2000), allows the number of components in the mixture, as well as the effective dimensionalities of the individual models, to be inferred from the data. There are many variants o this model in which parameters such as the W matrix or the noise variances are tied across components in the mixture, or in which the isotropic noise distributions are replaced by diagonal ones, giving rise to a mixture of factor analysers (Ghahraman and Hinton, 1996a; Ghahramani and Beal, 2000). The mixture of probabilistic PCA models can also be extended hierarchically to produce an interactive data visualization algorithm (Bishop and Tipping, 1998). 

An alternative to considering a mixture of linear models is to consider a single nonlinear model. Recall that conventional PCA finds a linear subspace that passes close to the data in a least-squares sense. This concept can be extended to onedimensional nonlinear surfaces in the form ofprincipal curves (Hastie and Stuetzle, 1989). We can describe a curve in a D-dimensional data space using a vector-valued function f ().), which is a vector each of whose elements is a function of the scalar ).. There are many possible ways to parameterize the curve, of which a natural choice is the arc length along the curve. For any given point xin data space, we can find the point on the curve that is closest in Euclidean distance. We denote this point by $\lambda = g _ { \mathbf { f } } ( \mathbf { x } )$ because it depends on the particular curve $\mathbf f ( \lambda )$ . For a continuous data density $p ( \mathbf { x } )$ , a principal curve is defined as one for which every point on the curve is the mean of all those points in data space that project to it, so that 

$$
\mathbb {E} \left[ \mathbf {x} | g _ {\mathbf {f}} (\mathbf {x}) = \lambda \right] = \mathbf {f} (\lambda).\tag{12.92}
$$

For a given continuous density, there can be many principal curves. In practice, we are interested in finite data sets, and we also wish to restrict attention to smooth curves. Hastie and Stuetzle (1989) propose a two-stage iterative procedure for finding such principal curves, somewhat reminiscent of the EM algorithm for PCA. The curve is initialized using the first principal component, and then the algorithm alternates between a data projection step and curve re-estimation step. In the projection step, each data point is assigned to a value of >.. corresponding to the closest point on the curve. Then in the re-estimation step, each point on the curve is given by a weighted average of those points that project to nearby points on the curve, with points closest on the curve given the greatest weight. In the case where the subspace is constrained to be linear, the procedure converges to the first principal component and is equivalent to the power method for finding the largest eigenvector of the covariance matrix. Principal curves can be generalized to multidimensional manifolds called principal surfaces although these have found limited use due to the difficulty of data smoothing in higher dimensions even for two-dimensional manifolds. 

PCA is often used to project a data set onto a lower-dimensional space, for example two dimensional, for the purposes of visualization. Another linear technique with a similar aim is multidimensional scaling, or MDS (Cox and Cox, 2000). It finds a low-dimensional projection of the data such as to preserve, as closely as possible, the pairwise distances between data points, and involves finding the eigenvectors o the distance matrix. In the case where the distances are Euclidean, it gives equivalent results to PCA. The MDS concept can be extended to a wide variety of data types specified in terms of a similarity matrix, giving nonmetric MDS. 

Two other nonprobabilistic methods for dimensionality reduction and data vi sualization are worthy of mention. Locally linear embedding, or LLE (Roweis and Saul, 2000) first computes the set of coefficients that best reconstructs each data point from its neighbours. These coefficients are arranged to be invariant to rotations, translations, and scalings of that data point and its neighbours, and hence the characterize the local geometrical properties of the neighbourhood. LLE then maps the high-dimensional data points down to a lower dimensional space while preserv ing these neighbourhood coefficients. If the local neighbourhood for a particular data point can be considered linear, then the transformation can be achieved using a combination of translation, rotation, and scaling, such as to preserve the angles formed between the data points and their neighbours. Because the weights are in variant to these transformations, we expect the same weight values to reconstruct the data points in the low-dimensional space as in the high-dimensional data space. In spite of the nonlinearity, the optimization for LLE does not exhibit local minima. 

In isometricfeature mapping, or isomap (Tenenbaum et ai., 2000), the goal i to project the data to a lower-dimensional space using MDS, but where the dissim ilarities are defined in terms of the geodesic distances measured along the manifold. For instance, if two points lie on a circle, then the geodesic is the arc-length distance measured around the circumference of the circle not the straight line distance measured along the chord connecting them. The algorithm first defines the neighbourhood for each data point, either by finding the K nearest neighbours or by finding all points within a sphere of radius E. A graph is then constructed by linking all neighbouring points and labelling them with their Euclidean distance. The geodesic distance between any pair of points is then approximated by the sum of the arc lengths along the shortest path connecting them (which itself is found using standard algorithms). Finally, metric MDS is applied to the geodesic distance matrix to find the low-dimensional projection. 

Our focus in this chapter has been on models for which the observed variables are continuous. We can also consider models having continuous latent variables together with discrete observed variables, giving rise to latent trait models (Bartholomew, 1987). In this case, the marginalization over the continuous latent variables, even for a linear relationship between latent and observed variables, cannot be performed analytically, and so more sophisticated techniques are required. Tipping (1999) uses variational inference in a model with a two-dimensional latent space, allowing a binary data set to be visualized analogously to the use of PCA to visualize continuous data. Note that this model is the dual of the Bayesian logistic regression problem discussed in Section 4.5. In the case of logistic regression we have N observations of the feature vector $\phi _ { n }$ which are parameterized by a single parameter vector w, whereas in the latent space visualization model there is a single latent space variable x (analogous to $\phi )$ and N copies of the latent variable ${ \bf w } _ { n }$ . A generalization of probabilistic latent variable models to general exponential family distributions is described in Collins et al. (2002). 

We have already noted that an arbitrary distribution can be formed by taking a Gaussian random variable and transforming it through a suitable nonlinearity. This is exploited in a general latent variable model called a density network (MacKay, 1995; MacKay and Gibbs, 1999) in which the nonlinear function is governed by a multilayered neural network. If the network has enough hidden units, it can approximate a given nonlinear function to any desired accuracy. The downside of having such a flexible model is that the marginalization over the latent variables, required in order to obtain the likelihood function, is no longer analytically tractable. Instead, the likelihood is approximated using Monte Carlo techniques by drawing sample from the Gaussian prior. The marginalization over the latent variables then becomes a simple sum with one term for each sample. However, because a large number of sample points may be required in order to give an accurate representation of the marginal, this procedure can be computationally costly. 

If we consider more restricted forms for the nonlinear function, and make an ap propriate choice of the latent variable distribution, then we can construct a latent vari able model that is both nonlinear and efficient to train. The generative topographic mapping, or GTM (Bishop et aI., 1996; Bishop et aI., 1997a; Bishop et aI., 1998b) uses a latent distribution that is defined by a finite regular grid of delta functions over the (typically two-dimensional) latent space. Marginalization over the latent space then simply involves summing over the contributions from each of the grid locations. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/b101f5734d2c30dabf5bd00f525d2db825febd8856748d616eef173c65f8fa69.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/623cd1d1fda8ba5d6827d1dc1f0e1e47a4aff702ad121f3bd7905d49bfeaa8f0.jpg)



FllIu.e 12.21 ?lot ot trle oillkYw <:lata Wllisualiz.ed using PeA on the left and GTM on Itle ngr,t FOf tile GTM model. each <lata poinIls plollfld at tile mean ot its posM'k>< dislribution in ..tent s;>ace, Tile "","ineanty mlhe GTM 1TlOd8I._lha sepamlion betwoon the groups of data points to be .....n """. ckl.arfy,


The no"liotar mapping is gi,'en by a linear regression model thaI allow, for general IIO/llinearily while being a linear fuoction of tile adapli'-e parameler<, NOIe thaI tilt usual limitation of linear regression models arising from the en"", of dimen,iooalily does 1101 arise in the Contr~1 oflhe GT~I si""'e the "\3nifold generall)' ha< t,,'o di"ltn· sions irrespecti'-e of the dimensionality of the data space, A coo""!",,nce of Illese 11"0 cooices is that the likelihood funclion can be e~pressed analytically in dosed form and can be optimilC<.! efficiently o,ing the EM algorithm_ The resolting GTM model hIs a lwo-dimensional nonlinear manifold 10 tile dala sel. and by e"alualing the posterior distrilJ",lion (Wer latent space for the data poi"", they can he projectt<J back to the lalent 'JI'K'" for .'isualilalion purposes, Figure 12,21 sl"""s a comparison of the oil data..,1 "isualired wilh lincar PeA and wilh lhe IIO/lhnear GT~I, 

<sub>TIlt GTM can</sub> be <sub>seen as a probabilistic "'rsion of an earlier nlOd<l callM the</sub> '''I org"nidng ""'p. or SOM (Kohonen. 1982: Kobonen. (995). which also represents a Iwo-dimensiooal IIO/llincar manifoid as a regular array of disc"'le points. The SOM i' somewhat remin;""'nt of the K·trlCan, algorithm in that data points are a.,igr.ed to nearby ProlOl)'j>C '-eclon thaI are lhen subsc<juenlly updale<!. Initially. lhe proIOI)'jl('S are distribuled at random, and during the training process they 'sel organize' so as to aPl'ro~imalea smoolh manifold. Unlike K -mean'. how'e"e.. the SOM is TIOI optimizing any well.ddine<! cost function (Erwin .. al.. 1992) making" difficult to s." the parameters of the model and 10 assess con'-ergence. There i' also no guarantee that the '",If-<>rganilalion' will take place .. this is depen""nl 00 the choice of appropriate paranlttcr "aloC' f,,, any particular data sel. 

By OOfItrast, GTM optimize, the log likelihood functioo, and the resolting model define' a probabilily den,ity in dma ,pace, In faeL il corre,ponds to a con,m,incd mi,ture of Gaussian, in which the component.' ,h.re a COnlnlOn ".riance.•nd the mean, are con'trained to lie on a 'mooIh tw-o-diITlCn,iooal n1anifold. This probabilistic foundation also makes it very straightforward to define generalizations of GTM (Bishop et al., 1998a) such as a Bayesian treatment, dealing with missing values, a principled extension to discrete variables, the use of Gaussian processes to define the manifold, or a hierarchical GTM model (Tino and Nabney, 2002). 

Because the manifold in GTM is defined as a continuous surface, not just at the prototype vectors as in the SOM, it is possible to compute the magnificationfactors corresponding to the local expansions and compressions of the manifold needed to fit the data set (Bishop et al., 1997b) as well as the directional curvatures of the manifold (Tino et al., 2001). These can be visualized along with the projected data and provide additional insight into the model. 

## Exercises

12.1 <sub>(* *)</sub> l I B In this exercise, we use proof by induction to show that the linear projection onto an M -dimensional subspace that maximizes the variance of the projected data is defined by the M eigenvectors of the data covariance matrix S, given by (12.3), corresponding to the M largest eigenvalues. In Section 12.1, this result was proven for the case of $M = 1$ . Now suppose the result holds for some general value of M and show that it consequently holds for dimensionality $M + 1$ . To do this, first set the derivative of the variance of the projected data with respect to a vector $\mathbf { u } _ { M + 1 }$ defining the new direction in data space equal to zero. This should be done subject to the constraints that $\mathbf { u } _ { M + 1 }$ be orthogonal to the existing vectors $\mathbf { u } _ { 1 } , \dots , \mathbf { u } _ { M }$ , and also that it be normalized to unit length. Use Lagrange multipliers to enforce these constraints. Then make use of the orthonormality properties of the vectors $\mathbf { u } _ { 1 } , \dots , \mathbf { u } _ { M }$ to show that the new vector $\mathbf { u } _ { M + 1 }$ is an eigenvector of S. Finally, show that the variance is maximized if the eigenvector is chosen to be the one corresponding to eigenvector $\lambda _ { M + 1 }$ where the eigenvalues have been ordered in decreasing value. 

12.2 (**) Show that the minimum value of the PCA distortion measure J given by (12.15) with respect to the $\mathbf { u } _ { i } ,$ , subject to the orthonormality constraints (12.7), is obtained when the $\mathbf { u } _ { i }$ are eigenvectors of the data covariance matrix S. To do this, introduce a matrix H of Lagrange multipliers, one for each constraint, so that th modified distortion measure, in matrix notation reads 

$$
\widetilde {J} = \mathrm{Tr} \left\{\widehat {\mathbf {U}} ^ {\mathrm{T}} \mathbf {S} \widehat {\mathbf {U}} \right\} + \mathrm{Tr} \left\{\mathbf {H} (\mathbf {I} - \widehat {\mathbf {U}} ^ {\mathrm{T}} \widehat {\mathbf {U}}) \right\}\tag{12.93}
$$

where $\widehat { \mathbf { U } }$ <sub>is a</sub> m~trix <sub>of</sub> dimensio $D \times ( D - M )$ whose columns are gi:::..en <sup>b~</sup> $\mathbf { u } _ { i }$ Now minimize $\widetilde { J }$ with respect to $\widehat { \bf U }$ and show that the s~ution satisfies $\widehat { \mathbf { S } } \widehat { \mathbf { U } } = \widehat { \mathbf { U } } \mathbf { H }$ Clearly, one possible solution is that the columns of $\widehat { \textbf { U } }$ are eigenvectors of S, in which case H is a diagonal matrix containing the corresponding eigenvalues. To obtain the general solution, show that H can be assumed to be a symmetr~ ma~ix, and by using its eigenvect£r expansion show that the general solution to $\mathbf { S \widehat { U } } = \widehat { \mathbf { U } } \mathbf { H }$ gives the same value for $\widetilde { J }$ as the specific solution in which the columns of $\widehat { \bf U }$ are the eigenvectors of S. Because these solutions are all equivalent, it is convenient to choose the eigenvector solution. 

12.3 (*) Verify that the eigenvectors defined by (12.30) are normalized to unit length, assuming that the eigenvectors $\mathbf { v } _ { i }$ have unit length. 

12.4 (*) Imm Suppose we replace the zero-mean, unit-covariance latent space distribution (12.31) in the probabilistic PCA model by a general Gaussian distribution of the form $\mathcal { N } ( \mathbf { z } | \mathbf { m } , \pmb { \Sigma } )$ . By redefining the parameters ofthe model, show that this leads to an identical model for the marginal distribution $p ( \mathbf { x } )$ over the observed variables for any valid choice of m and ~. 

12.5 (* *) Let x be a D-dimensional random variable having a Gaussian distribution given by $\mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \Sigma )$ , and consider the M-dimensional random variable given by $\mathbf { y } = \mathbf { A x } + \mathbf { b }$ where A is an $M \times D$ matrix. Show that y also has a Gaussian distribution, and find expressions for its mean and covariance. Discuss the form of this Gaussian distribution for $M < D$ , for $M = D$ , and for $M > D$ 

12.6 (*) Imm Draw a directed probabilistic graph for the probabilistic PCA model described in Section 12.2 in which the components of the observed variable x are shown explicitly as separate nodes. Hence verify that the probabilistic PCA model has the same independence structure as the naive Bayes model discussed in Section 8.2.2. 

12.7 (* *) By making use of the results (2.270) and (2.271) for the mean and covariance of a general distribution, derive the result (12.35) for the marginal distribution $p ( \mathbf { x } )$ in the probabilistic PCA model. 

12.8 (* *) Imm By making use of the result (2.116), show that the posterior distribution $p ( \mathbf { z } | \mathbf { x } )$ for the probabilistic PCA model is given by (12.42). 

12.9 (*) Verify that maximizing the log likelihood (12.43) for the probabilistic PCA model with respect to the parameter $\pmb { \mu }$ gives the result $\pmb { \mu } _ { \mathrm { M L } } = \overline { { \mathbf { x } } }$ where x is the mean of the data vectors. 

12.10 (**) By evaluating the second derivatives of the log likelihood function (12.43) for the probabilistic PCA model with respect to the parameter $\mu ,$ , show that the stationary point $\pmb { \mu } _ { \mathrm { M L } } = \overline { { \mathbf { x } } }$ represents the unique maximum. 

12.11 <sub>(* *)</sub> Imm Show that in the limit $\sigma ^ { 2 } \to 0$ , the posterior mean for the probabilistic PCA model becomes an orthogonal projection onto the principal subspace, as in conventional PCA. 

12.12 (* *) For $\sigma ^ { 2 } > 0$ show that the posterior mean in the probabilistic PCA model is shifted towards the origin relative to the orthogonal projection. 

12.13 (* *) Show that the optimal reconstruction of a data point under probabilistic PCA, according to the least squares projection cost of conventional PCA, is given by 

$$
\widetilde {\mathbf {x}} = \mathbf {W} _ {\mathrm{ML}} (\mathbf {W} _ {\mathrm{ML}} ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{ML}}) ^ {- 1} \mathbf {M} \mathbb {E} [ \mathbf {z} | \mathbf {x} ].\tag{12.94}
$$

12.14 (*) The number of independent parameters in the covariance matrix for the probabilistic PCA model with an M -dimensional latent space and a D-dimensional data space is given by (12.51). Verify that in the case of $M = D - 1$ , the number of independent parameters is the same as in a general covariance Gaussian, whereas for $M = 0$ it is the same as for a Gaussian with an isotropic covariance. 

12.15 (**) IIiI!I Derive the M-step equations (12.56) and (12.57) for the probabilistic PCA model by maximization of the expected complete-data log likelihood function given by (12.53). 

12.16 (* * *) In Figure 12.11, we showed an application of probabilistic PCA to a data set in which some of the data values were missing at random. Derive the EM algorithm for maximizing the likelihood function for the probabilistic PCA model in this situation. Note that the $\left\{ { { \bf { z } } _ { n } } \right\}$ , as well as the missing data values that are components of the vectors $\left\{ { \bf x } _ { n } \right\}$ , are now latent variables. Show that in the special case in which all of the data values are observed, this reduces to the EM algorithm for probabilistic PCA derived in Section 12.2.2. 

12.17 (**) IIiI!I Let W be a $D \times M$ matrix whose columns define a linear subspace of dimensionality M embedded within a data space of dimensionality D, and let $\mu$ be a D-dimensional vector. Given a data set $\left\{ { \bf x } _ { n } \right\}$ where $n = 1 , \ldots , N .$ , we can approximate the data points using a linear mapping from a set of M -dimensional vectors $\left\{ { { \bf { z } } _ { n } } \right\}$ , so that ${ \bf x } _ { n }$ is approximated by ${ \bf W } { \bf z } _ { n } + \pmb { \mu }$ . The associated sum-of squares reconstruction cost is given by 

$$
J = \sum_ {n = 1} ^ {N} \left\| \mathbf {x} _ {n} - \boldsymbol {\mu} - \mathbf {W} \mathbf {z} _ {n} \right\| ^ {2}.\tag{12.95}
$$

First show that minimizing J with respect to $\mu$ leads to an analogous expression with $\mathbf { x } _ { n }$ and ${ \bf z } _ { n }$ replaced by zero-mean variables ${ \bf x } _ { n } - \overline { { \bf x } }$ and ${ \bf z } _ { n } - \overline { { { \bf z } } }$ , respectively, where x and Z denote sample means. Then show that minimizing J with respect to $\mathbf { z } _ { n }$ , where W is kept fixed, gives rise to the PCA Estep (12.58), and that minimizing $J$ with respect to W, where $\left\{ { { \bf { z } } _ { n } } \right\}$ is kept fixed, gives rise to the PCA M step (12.59). 

12.18 (*) Derive an expression for the number of independent parameters in the factor analysis model described in Section 12.2.4. 

12.19 (**) IIiI!I Show that the factor analysis model described in Section 12.2.4 is invariant under rotations of the latent space coordinates. 

12.20 (**) By considering second derivatives, show that the only stationary point of the log likelihood function for the factor analysis model discussed in Section 12.2.4 with respect to the parameter J1 is given by the sample mean defined by (12.1). Furthermore, show that this stationary point is a maximum. 

12.21 (**) Derive the formulae (12.66) and (12.67) for the E step of the EM algorithm for factor analysis. Note that from the result of Exercise 12.20, the parameter $\pmb { \mu }$ can be replaced by the sample mean x. 

12.22 (* *) Write down an expression for the expected complete-data log likelihood function for the factor analysis model, and hence derive the corresponding M step equations (12.69) and (12.70). 

12.23 (*) III!I Draw a directed probabilistic graphical model representing a discrete mixture of probabilistic PCA models in which each PCA model has its own values of W, JL, and $\sigma ^ { 2 }$ • Now draw a modified graph in which these parameter values are shared between the components of the mixture. 

12.24 (***) We saw in Section 2.3.7 that Student's t-distribution can be viewed as an infinite mixture of Gaussians in which we marginalize with respect to a continuous latent variable. By exploiting this representation, formulate an EM algorithm for maximizing the log likelihood function for a multivariate Student's t-distribution given an observed set of data points, and derive the forms of the E and M step equations. 

12.25 (**) III!I Consider a linear-Gaussian latent-variable model having a latent space distribution $\mathbf { \bar { \rho } } _ { p ( \mathbf { z } ) } = \mathcal { N } ( \mathbf { x } | \mathbf { 0 } , \mathbf { I } )$ and a conditional distribution for the observed variable $p ( \mathbf { x } | \mathbf { z } ) = \mathcal { N } ( \mathbf { x } | \mathbf { W } \mathbf { z } + \pmb { \mu } , \Phi )$ where <P is an arbitrary symmetric, positivedefinite noise covariance matrix. Now suppose that we make a nonsingular linear transformation of the data variables $\bf { x } \to \bf { A x }$ , where A is a $D \times D$ matrix. If $\mu _ { \mathrm { M L } } , \mathbf { W } _ { \mathrm { M L } }$ and $\Phi _ { \mathrm { M L } }$ represent the maximum likelihood solution corresponding to the original untransformed data, show that $\mathbf { A } \mu _ { \mathrm { M L } } , \mathbf { A W } _ { \mathrm { M L } }$ , and ${ \bf A } \Phi _ { \mathrm { M L } } { \bf A } ^ { \mathrm { \hat { T } } }$ will represent the corresponding maximum likelihood solution for the transformed data set. Finally, show that the form of the model is preserved in two cases: (i) A is a diagonal matrix and $\Phi$ is a diagonal matrix. This corresponds to the case of factor analysis. The transformed $\Phi$ remains diagonal, and hence factor analysis is covariant under component-wise re-scaling of the data variables; (ii) A is orthogonal and <P is proportional to the unit matrix so that $\bar { \Phi } = \sigma ^ { 2 } \mathbf { I }$ . This corresponds to probabilistic PCA. The transformed <P matrix remains proportional to the unit matrix, and hence probabilistic PCA is covariant under a rotation of the axes of data space, as is the case for conventional PCA. 

12.26 (**) Show that any vector ${ \bf a } _ { i }$ that satisfies (12.80) will also satisfy (12.79). Also, show that for any solution of (12.80) having eigenvalue A, we can add any multiple of an eigenvector of K having zero eigenvalue, and obtain a solution to (12.79) that also has eigenvalue A. Finally, show that such modifications do not affect the principal-component projection given by (12.82). 

12.27 (* *) Show that the conventional linear PCA algorithm is recovered as a special case of kernel PCA if we choose the linear kernel function given by $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ 

12.28 (* *) III!I Use the transformation property (1.27) of a probability density under a change of variable to show that any density $p ( y )$ can be obtained from a fixed density $q ( x )$ that is everywhere nonzero by making a nonlinear change of variable $y = f ( x )$ in which $f ( x )$ is a monotonic function so that $0 \leqslant f ^ { \prime } ( x ) < \infty$ . Write down the differential equation satisfied by $f ( x )$ and draw a diagram illustrating the transformation of the density. 

12.29 <sub>(**)</sub> Em Suppose that two variables $z _ { 1 }$ and $z _ { 2 }$ are independent so tha $p ( z _ { 1 } , z _ { 2 } ) =$ $p ( z _ { 1 } ) p ( z _ { 2 } )$ ' Show that the covariance matrix between these variables is diagonal. This shows that independence is a sufficient condition for two variables to be uncorrelated. Now consider two variables $y _ { 1 }$ and $y _ { 2 }$ in which $- 1 \leqslant y _ { 1 } \leqslant 1$ and $y _ { 2 } = y _ { 2 } ^ { 2 }$ . Write down the conditional distribution $p ( y _ { 2 } | y _ { 1 } )$ and observe that this is dependent on $y _ { 1 }$ showing that the two variables are not independent. Now show that the covariance matrix between these two variables is again diagonal. To do this, use the relation $p ( y _ { 1 } , y _ { 2 } ) \ : = \ : p ( y _ { 1 } ) p ( y _ { 2 } | y _ { 1 } )$ to show that the off-diagonal terms are zero. This counter-example shows that zero correlation is not a sufficient condition for independence. 

# Sequential Data

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/2e27a0b6da1627617cc58b6a437382d86b758db9a9aeba5e889f24b637ca8a8f.jpg)


So far in this book, we have focussed primarily on sets of data points that were assumed to be independent and identically distributed (i.i.d.). This assumption allowed us to express the likelihood function as the product over all data points of the probability distribution evaluated at each data point. For many applications, however, the i.i.d. assumption will be a poor one. Here we consider a particularly important class of such data sets, namely those that describe sequential data. These often arise through measurement of time series, for example the rainfall measurements on successive days at a particular location, or the daily values of a currency exchange rate, or the acoustic features at successive time frames used for speech recognition. An example involving speech data is shown in Figure 13.1. Sequential data can also arise in contexts other than time series, for example the sequence of nucleotide base pairs along a strand of DNA or the sequence of characters in an English sentence. For convenience, we shall sometimes refer to ‘past’ and ‘future’ observations in a sequence. However, the models explored in this chapter are equally applicable to all 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/d20b45bf8c492aa8a299531d924f695066173a5ccced461c2bfb0faaf09deeff.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/a15082b3727a2c5c603c7e712a55a331b4094ea7187bd336e31d92f9fa6f0de4.jpg)


Figure 13.1 Example of a spectrogram of the spoken words “Bayes’ theorem” showing a plot of the intensity of the spectral coefficients versus time index. 

forms of sequential data, not just temporal sequences. 

It is useful to distinguish between stationary and nonstationary sequential distributions. In the stationary case, the data evolves in time, but the distribution from which it is generated remains the same. For the more complex nonstationary situation, the generative distribution itself is evolving with time. Here we shall focus on the stationary case. 

For many applications, such as financial forecasting, we wish to be able to predict the next value in a time series given observations of the previous values. Intuitively, we expect that recent observations are likely to be more informative than more historical observations in predicting future values. The example in Figure 13.1 shows that successive observations of the speech spectrum are indeed highly correlated. Furthermore, it would be impractical to consider a general dependence of future observations on all previous observations because the complexity of such a model would grow without limit as the number of observations increases. This leads us to consider Markov models in which we assume that future predictions are inde-

Figure 13.2 

pendent of all but the most recent observations. 

Although such models are tractable, they are also severely limited. We can obtain a more general framework, while still retaining tractability, by the introduction of latent variables, leading to state space models. As in Chapters 9 and 12, we shall see that complex models can thereby be constructed from simpler components (in particular, from distributions belonging to the exponential family) and can be readily characterized using the framework of probabilistic graphical models. Here we focus on the two most important examples of state space models, namely the hidden Markov model, in which the latent variables are discrete, and linear dynamical systems, in which the latent variables are Gaussian. Both models are described by directed graphs having a tree structure (no loops) for which inference can be performed efficiently using the sum-product algorithm. 

## 13.1. Markov Models

The easiest way to treat sequential data would be simply to ignore the sequential aspects and treat the observations as i.i.d., corresponding to the graph in Figure 13.2. Such an approach, however, would fail to exploit the sequential patterns in the data, such as correlations between observations that are close in the sequence. Suppose, for instance, that we observe a binary variable denoting whether on a particular day it rained or not. Given a time series of recent observations of this variable, we wish to predict whether it will rain on the next day. If we treat the data as i.i.d., then the only information we can glean from the data is the relative frequency of rainy days. However, we know in practice that the weather often exhibits trends that may last for several days. Observing whether or not it rains today is therefore of significant help in predicting if it will rain tomorrow. 

To express such effects in a probabilistic model, we need to relax the i.i.d. assumption, and one of the simplest ways to do this is to consider a Markov model. First of all we note that, without loss of generality, we can use the product rule to express the joint distribution for a sequence of observations in the form 

$$
p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {N}) = \prod_ {n = 1} ^ {N} p (\mathbf {x} _ {n} | \mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}).\tag{13.1}
$$

If we now assume that each of the conditional distributions on the right-hand side is independent of all previous observations except the most recent, we obtain the first-order Markov chain, which is depicted as a graphical model in Figure 13.3. The 

Figure 13.3 A first-order Markov chain of observations $\left\{ \mathbf { x } _ { n } \right\}$ in which the distribution $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - 1 } )$ of a particular observation ${ \bf x } _ { n }$ is conditioned on the value of the previous observation ${ \bf x } _ { n - 1 }$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/337a55f15cedcf4623d5f2d9dcfb2aa02f18581cfc2b7ce501821f461736c028.jpg)


joint distribution for a sequence of N observations under this model is given by 

$$
p (\mathbf {x} _ {1}, \dots , \mathbf {x} _ {N}) = p (\mathbf {x} _ {1}) \prod_ {n = 2} ^ {N} p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1}).\tag{13.2}
$$

From the d-separation property, we see that the conditional distribution for observation ${ \bf x } _ { n }$ , given all of the observations up to time n, is given by 

$$
p (\mathbf {x} _ {n} | \mathbf {x} _ {1}, \dots , \mathbf {x} _ {n - 1}) = p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1})\tag{13.3}
$$

which is easily verified by direct evaluation starting from (13.2) and using the product rule of probability. Thus if we use such a model to predict the next observation in a sequence, the distribution of predictions will depend only on the value of the immediately preceding observation and will be independent of all earlier observations. 

In most applications of such models, the conditional distributions $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - 1 } )$ that define the model will be constrained to be equal, corresponding to the assumption of a stationary time series. The model is then known as a homogeneous Markov chain. For instance, if the conditional distributions depend on adjustable parameters (whose values might be inferred from a set of training data), then all of the conditional distributions in the chain will share the same values of those parameters. 

Although this is more general than the independence model, it is still very restrictive. For many sequential observations, we anticipate that the trends in the data over several successive observations will provide important information in predicting the next value. One way to allow earlier observations to have an influence is to move to higher-order Markov chains. If we allow the predictions to depend also on the previous-but-one value, we obtain a second-order Markov chain, represented by the graph in Figure 13.4. The joint distribution is now given by 

$$
p (\mathbf {x} _ {1}, \dots , \mathbf {x} _ {N}) = p (\mathbf {x} _ {1}) p (\mathbf {x} _ {2} | \mathbf {x} _ {1}) \prod_ {n = 3} ^ {N} p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1}, \mathbf {x} _ {n - 2}).\tag{13.4}
$$

Again, using d-separation or by direct evaluation, we see that the conditional distribution of ${ \bf x } _ { n }$ given ${ \bf x } _ { n - 1 }$ and ${ \bf x } _ { n - 2 }$ is independent of all observations $\mathbf { x } _ { 1 } , \ldots . . . \mathbf { x } _ { n - 3 }$ 

Figure 13.4 A second-order Markov chain, in which the conditional distribution of a particular observation ${ \bf x } _ { n }$ depends on the values of the two previous observations $\mathbf { x } _ { n - 1 }$ and $\mathbf { x } _ { n - 2 }$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/a7cde87c3d20d0551c0439748581c72d80436f9950163147cfadb7f87eb7fdc6.jpg)



Figure 13.5 We can represent sequential data using a Markov chain of latent variables, with each observation conditioned on the state of the corresponding latent variable. This important graphical structure forms the foundation both for the hidden Markov model and for linear dynamical systems.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/cb79c729c033d6b6eb457b39ac19bc3e6b4cc28873f9db3d9b65ef46251b4ddd.jpg)


Each observation is now influenced by two previous observations. We can similarly consider extensions to an $M ^ { \mathrm { t h } }$ order Markov chain in which the conditional distribution for a particular variable depends on the previous M variables. However, we have paid a price for this increased flexibility because the number of parameters in the model is now much larger. Suppose the observations are discrete variables having K states. Then the conditional distribution $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - 1 } )$ in a first-order Markov chain will be specified by a set of $K - 1$ parameters for each of the K states of $\mathbf x _ { n - 1 }$ giving a total of $K ( K - 1 )$ parameters. Now suppose we extend the model to an $\dot { M } ^ { \mathrm { t h } }$ order Markov chain, so that the joint distribution is built up from conditionals $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - M } , \ldots , \mathbf { x } _ { n - 1 } )$ . If the variables are discrete, and if the conditional distributions are represented by general conditional probability tables, then the number of parameters in such a model will have $K ^ { M - \hat { 1 } } ( K - 1 )$ parameters. Because this grows exponentially with M, it will often render this approach impractical for larger values of M. 

For continuous variables, we can use linear-Gaussian conditional distributions in which each node has a Gaussian distribution whose mean is a linear function of its parents. This is known as an autoregressive or AR model (Box et al., 1994; Thiesson et al., 2004). An alternative approach is to use a parametric model for $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - M } , . . . , \mathbf { x } _ { n - 1 } )$ such as a neural network. This technique is sometimes called a tapped delay line because it corresponds to storing (delaying) the previous M values of the observed variable in order to predict the next value. The number of parameters can then be much smaller than in a completely general model (for example it may grow linearly with M), although this is achieved at the expense of a restricted family of conditional distributions. 

Suppose we wish to build a model for sequences that is not limited by the Markov assumption to any order and yet that can be specified using a limited number of free parameters. We can achieve this by introducing additional latent variables to permit a rich class of models to be constructed out of simple components, as we did with mixture distributions in Chapter 9 and with continuous latent variable models in Chapter 12. For each observation ${ \bf x } _ { n }$ , we introduce a corresponding latent variable $\mathbf { z } _ { n }$ (which may be of different type or dimensionality to the observed variable). We now assume that it is the latent variables that form a Markov chain, giving rise to the graphical structure known as a state space model, which is shown in Figure 13.5. It satisfies the key conditional independence property that $\mathbf { z } _ { n - 1 }$ and $\mathbf { z } _ { n + 1 }$ are independent given $\mathbf { z } _ { n }$ , so that 

$$
\mathbf {z} _ {n + 1} \perp \mathbf {\Lambda} \mathbf {z} _ {n - 1} \mid \mathbf {z} _ {n}.\tag{13.5}
$$

The joint distribution for this model is given by 

$$
p (\mathbf {x} _ {1}, \dots , \mathbf {x} _ {N}, \mathbf {z} _ {1}, \dots , \mathbf {z} _ {N}) = p (\mathbf {z} _ {1}) \left[ \prod_ {n = 2} ^ {N} p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) \right] \prod_ {n = 1} ^ {N} p (\mathbf {x} _ {n} | \mathbf {z} _ {n}).\tag{13.6}
$$

Using the d-separation criterion, we see that there is always a path connecting any two observed variables ${ \bf x } _ { n }$ and $\mathbf { x } _ { m }$ via the latent variables, and that this path is never blocked. Thus the predictive distribution $p ( \mathbf { x } _ { n + 1 } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n } )$ for observation $\mathbf { x } _ { n + 1 }$ given all previous observations does not exhibit any conditional independence properties, and so our predictions for $\mathbf { x } _ { n + 1 }$ depends on all previous observations. The observed variables, however, do not satisfy the Markov property at any order. We shall discuss how to evaluate the predictive distribution in later sections of this chapter. 

There are two important models for sequential data that are described by this graph. If the latent variables are discrete, then we obtain the hidden Markov model, or HMM (Elliott et al., 1995). Note that the observed variables in an HMM may be discrete or continuous, and a variety of different conditional distributions can be used to model them. If both the latent and the observed variables are Gaussian (with a linear-Gaussian dependence of the conditional distributions on their parents), then we obtain the linear dynamical system. 

## 13.2. Hidden Markov Models

The hidden Markov model can be viewed as a specific instance of the state space model of Figure 13.5 in which the latent variables are discrete. However, if we examine a single time slice of the model, we see that it corresponds to a mixture distribution, with component densities given by $p ( \mathbf { x } | \mathbf { z } )$ . It can therefore also be interpreted as an extension of a mixture model in which the choice of mixture component for each observation is not selected independently but depends on the choice of component for the previous observation. The HMM is widely used in speech recognition (Jelinek, 1997; Rabiner and Juang, 1993), natural language modelling (Manning and Schutze, 1999), on-line handwriting recognition (Nag¨ et al., 1986), and for the analysis of biological sequences such as proteins and DNA (Krogh et al., 1994; Durbin et al., 1998; Baldi and Brunak, 2001). 

As in the case of a standard mixture model, the latent variables are the discrete multinomial variables $\mathbf { z } _ { n }$ describing which component of the mixture is responsible for generating the corresponding observation ${ \bf x } _ { n }$ . Again, it is convenient to use a 1-of-K coding scheme, as used for mixture models in Chapter 9. We now allow the probability distribution of $\mathbf { z } _ { n }$ to depend on the state of the previous latent variable $\mathbf { z } _ { n - 1 }$ through a conditional distribution $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ . Because the latent variables are K-dimensional binary variables, this conditional distribution corresponds to a table of numbers that we denote by A, the elements of which are known as transition probabilities. They are given by $A _ { j k } \equiv p ( z _ { n k } = 1 | z _ { n - 1 , j } = 1 )$ , and because they are probabilities, they satisfy $0 \leqslant A _ { j k } \leqslant 1$ with $\textstyle \sum _ { k } A _ { j k } = 1$ , so that the matrix A 

Transition diagram showing a model whose latent variables have three possible states corresponding to the three boxes. The black lines denote the elements of the transition matrix $A _ { j k }$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/e13222f89521960d4e2305f16f53e92ea6e6502e3d7b2c42e99464f15e47b240.jpg)


has $K ( K { - } 1 )$ independent parameters. We can then write the conditional distribution explicitly in the form 

$$
p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1, \mathbf {A}}) = \prod_ {k = 1} ^ {K} \prod_ {j = 1} ^ {K} A _ {j k} ^ {z _ {n - 1, j} z _ {n k}}.\tag{13.7}
$$

The initial latent node $\mathbf { z } _ { 1 }$ is special in that it does not have a parent node, and so it has a marginal distribution $p ( \mathbf { z } _ { 1 } )$ represented by a vector of probabilities $\pi$ with elements $\pi _ { k } \equiv p ( z _ { 1 k } = 1 )$ , so that 

$$
p (\mathbf {z} _ {1} | \boldsymbol {\pi}) = \prod_ {k = 1} ^ {K} \pi_ {k} ^ {z _ {1 k}}\tag{13.8}
$$

where $\textstyle \sum _ { k } \pi _ { k } = 1$ 

The transition matrix is sometimes illustrated diagrammatically by drawing the states as nodes in a state transition diagram as shown in Figure 13.6 for the case of $K = 3$ . Note that this does not represent a probabilistic graphical model, because the nodes are not separate variables but rather states of a single variable, and so we have shown the states as boxes rather than circles. 

It is sometimes useful to take a state transition diagram, of the kind shown in Figure 13.6, and unfold it over time. This gives an alternative representation of the transitions between latent states, known as a lattice or trellis diagram, and which is shown for the case of the hidden Markov model in Figure 13.7. 

The specification of the probabilistic model is completed by defining the conditional distributions of the observed variables $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } , \phi )$ , where $\phi$ is a set of parameters governing the distribution. These are known as emission probabilities, and might for example be given by Gaussians of the form (9.11) if the elements of x are continuous variables, or by conditional probability tables if x is discrete. Because ${ \bf x } _ { n }$ is observed, the distribution $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } , \phi )$ consists, for a given value of $\phi .$ , of a vector of K numbers corresponding to the K possible states of the binary vector $\mathbf { z } _ { n }$ 

Figure 13.7 If we unfold the state transition diagram of Figure 13.6 over time, we obtain a lattice, or trellis, representation of the latent states. Each column of this diagram corresponds to one of the latent variables ${ \bf z } _ { n }$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/f9cdc8f6d91ecd4470bc42bcc2efd5811ea374726f7fa4028a1e1ffbd7d8fefe.jpg)


We can represent the emission probabilities in the form 

$$
p (\mathbf {x} _ {n} | \mathbf {z} _ {n}, \phi) = \prod_ {k = 1} ^ {K} p (\mathbf {x} _ {n} | \phi_ {k}) ^ {z _ {n k}}.\tag{13.9}
$$

We shall focuss attention on homogeneous models for which all of the conditional distributions governing the latent variables share the same parameters A, and similarly all of the emission distributions share the same parameters $\phi$ (the extension to more general cases is straightforward). Note that a mixture model for an i.i.d. data set corresponds to the special case in which the parameters $A _ { j k }$ are the same for all values of ${ \dot { } } $ , so that the conditional distribution $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ is independent of $\mathbf { z } _ { n - 1 }$ This corresponds to deleting the horizontal links in the graphical model shown in Figure 13.5. 

The joint probability distribution over both latent and observed variables is then given by 

$$
p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}) = p (\mathbf {z} _ {1} | \boldsymbol {\pi}) \left[ \prod_ {n = 2} ^ {N} p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}, \mathbf {A}) \right] \prod_ {m = 1} ^ {N} p (\mathbf {x} _ {m} | \mathbf {z} _ {m}, \boldsymbol {\phi})\tag{13.10}
$$

where $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \} , \mathbf { Z } = \{ \mathbf { z } _ { 1 } , \ldots , \mathbf { z } _ { N } \}$ , and $\pmb \theta = \{ \pi , \mathbf A , \phi \}$ denotes the set of parameters governing the model. Most of our discussion of the hidden Markov model will be independent of the particular choice of the emission probabilities. Indeed, the model is tractable for a wide range of emission distributions including discrete tables, Gaussians, and mixtures of Gaussians. It is also possible to exploit discriminative models such as neural networks. These can be used to model the emission density $p ( \mathbf { x } | \mathbf { z } )$ directly, or to provide a representation for $p ( \mathbf { z } | \mathbf { x } )$ that can be converted into the required emission density $p ( \mathbf { x } | \mathbf { z } )$ using Bayes’ theorem (Bishop et al., 2004). 

We can gain a better understanding of the hidden Markov model by considering it from a generative point of view. Recall that to generate samples from a mixture of 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/120cb170367b544c3dddc1e29225c14b09ec40026ff99311fb6461bb70a68d65.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/e45d42762393b53ce3f2dc317ef537de5813fe5d49b9cc0b8514b91aad0db44a.jpg)



Figure 13.8 Illustration of sampling from a hidden Markov model having a 3-state latent variable z and a Gaussian emission model $p ( \mathbf { x } | \mathbf { z } )$ where x is 2-dimensional. (a) Contours of constant probability density for the emission distributions corresponding to each of the three states of the latent variable. (b) A sample of 50 points drawn from the hidden Markov model, colour coded according to the component that generated them and with lines connecting the successive observations. Here the transition matrix was fixed so that in any state there is a 5% probability of making a transition to each of the other states, and consequently a 90% probability of remaining in the same state.


Gaussians, we first chose one of the components at random with probability given by the mixing coefficients $\pi _ { k }$ and then generate a sample vector x from the corresponding Gaussian component. This process is repeated N times to generate a data set of N independent samples. In the case of the hidden Markov model, this procedure is modified as follows. We first choose the initial latent variable $\mathbf { z } _ { 1 }$ with probabilities governed by the parameters $\pi _ { k }$ and then sample the corresponding observation $\mathbf { x } _ { 1 }$ Now we choose the state of the variable $\mathbf { z } _ { 2 }$ according to the transition probabilities $p ( \mathbf { z } _ { 2 } | \mathbf { z } _ { 1 } )$ using the already instantiated value of $\mathbf { z } _ { 1 }$ . Thus suppose that the sample for $\mathbf { z } _ { 1 }$ corresponds to state $j .$ . Then we choose the state k of $\mathbf { z } _ { 2 }$ with probabilities $A _ { j k }$ for $k = 1 , \ldots , K$ . Once we know $\mathbf { z } _ { 2 }$ we can draw a sample for $\mathbf { x } _ { 2 }$ and also sample the next latent variable $\mathbf { z } _ { 3 }$ and so on. This is an example of ancestral sampling for a directed graphical model. If, for instance, we have a model in which the diagonal transition elements $A _ { k k }$ are much larger than the off-diagonal elements, then a typical data sequence will have long runs of points generated from a single component, with infrequent transitions from one component to another. The generation of samples from a hidden Markov model is illustrated in Figure 13.8. 

There are many variants of the standard HMM model, obtained for instance by imposing constraints on the form of the transition matrix A (Rabiner, 1989). Here we mention one of particular practical importance called the left-to-right HMM, which is obtained by setting the elements $A _ { j k }$ of A to zero if $k < j$ , as illustrated in the state transition diagram for a 3-state HMM in Figure 13.9. Typically for such models the initial state probabilities for $p ( \mathbf { z } _ { 1 } )$ are modified so that $p ( z _ { 1 1 } ) = 1$ and $p ( z _ { 1 j } ) = 0$ for $j \neq 1$ , in other words every sequence is constrained to start in state $j = 1$ . The transition matrix may be further constrained to ensure that large changes in the state index do not occur, so that $A _ { j k } = 0 \mathrm { i f } k > j + \Delta$ . This type of model is illustrated using a lattice diagram in Figure 13.10. 


Figure 13.9 Example of the state transition diagram for a 3-state left-to-right hidden Markov model. Note that once a state has been vacated, it cannot later be re-entered.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/3c8fe39406ad8ce55ebf756a98b951f07369fb6683f759588b6fb20c4c904787.jpg)


Many applications of hidden Markov models, for example speech recognition, or on-line character recognition, make use of left-to-right architectures. As an illustration of the left-to-right hidden Markov model, we consider an example involving handwritten digits. This uses on-line data, meaning that each digit is represented by the trajectory of the pen as a function of time in the form of a sequence of pen coordinates, in contrast to the off-line digits data, discussed in Appendix A, which comprises static two-dimensional pixellated images of the ink. Examples of the online digits are shown in Figure 13.11. Here we train a hidden Markov model on a subset of data comprising 45 examples of the digit ‘2’. There are $K = 1 6$ states, each of which can generate a line segment of fixed length having one of 16 possible angles, and so the emission distribution is simply a $1 6 \times 1 6$ table of probabilities associated with the allowed angle values for each state index value. Transition probabilities are all set to zero except for those that keep the state index k the same or that increment it by 1, and the model parameters are optimized using 25 iterations of EM. We can gain some insight into the resulting model by running it generatively, as shown in Figure 13.11. 


Figure 13.10 Lattice diagram for a 3-state leftto-right HMM in which the state index k is allowed to increase by at most 1 at each transition.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/55f827e853ac8fdce8322ed6ed63646cd29b124d59be11aace7182e44090e7ca.jpg)


Top row: examples of on-line handwritten digits. Bottom row: synthetic digits sampled generatively from a left-to-right hidden Markov model that has been trained on a data set of 45 handwritten digits. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/a3b1b1c6bafe6abf42d21de6841bfbe85bdaa2ca76f60aa3fa3d7903e05025f0.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/7891f3f7a238ba0b2f659988a12781c80a4370aa30c2599c98f1d18ae9df4b01.jpg)


One of the most powerful properties of hidden Markov models is their ability to exhibit some degree of invariance to local warping (compression and stretching) of the time axis. To understand this, consider the way in which the digit $\cdot _ { 2 } ,$ is written in the on-line handwritten digits example. A typical digit comprises two distinct sections joined at a cusp. The first part of the digit, which starts at the top left, has a sweeping arc down to the cusp or loop at the bottom left, followed by a second moreor-less straight sweep ending at the bottom right. Natural variations in writing style will cause the relative sizes of the two sections to vary, and hence the location of the cusp or loop within the temporal sequence will vary. From a generative perspective such variations can be accommodated by the hidden Markov model through changes in the number of transitions to the same state versus the number of transitions to the successive state. Note, however, that if a digit $\cdot _ { 2 } ,$ is written in the reverse order, that is, starting at the bottom right and ending at the top left, then even though the pen tip coordinates may be identical to an example from the training set, the probability of the observations under the model will be extremely small. In the speech recognition context, warping of the time axis is associated with natural variations in the speed of speech, and again the hidden Markov model can accommodate such a distortion and not penalize it too heavily. 

## 13.2.1 Maximum likelihood for the HMM

If we have observed a data set $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ , we can determine the parameters of an HMM using maximum likelihood. The likelihood function is obtained from the joint distribution (13.10) by marginalizing over the latent variables 

$$
p (\mathbf {X} | \boldsymbol {\theta}) = \sum_ {\mathbf {Z}} p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}).\tag{13.11}
$$

Because the joint distribution $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ does not factorize over n (in contrast to the mixture distribution considered in Chapter 9), we cannot simply treat each of the summations over $\mathbf { z } _ { n }$ independently. Nor can we perform the summations explicitly because there are N variables to be summed over, each of which has K states, resulting in a total of $K ^ { N }$ terms. Thus the number of terms in the summation grows exponentially with the length of the chain. In fact, the summation in (13.11) corresponds to summing over exponentially many paths through the lattice diagram in Figure 13.7. 

We have already encountered a similar difficulty when we considered the inference problem for the simple chain of variables in Figure 8.32. There we were able to make use of the conditional independence properties of the graph to re-order the summations in order to obtain an algorithm whose cost scales linearly, instead of exponentially, with the length of the chain. We shall apply a similar technique to the hidden Markov model. 

A further difficulty with the expression (13.11) for the likelihood function is that, because it corresponds to a generalization of a mixture distribution, it represents a summation over the emission models for different settings of the latent variables. Direct maximization of the likelihood function will therefore lead to complex expressions with no closed-form solutions, as was the case for simple mixture models (recall that a mixture model for i.i.d. data is a special case of the HMM). 

We therefore turn to the expectation maximization algorithm to find an efficient framework for maximizing the likelihood function in hidden Markov models. The EM algorithm starts with some initial selection for the model parameters, which we denote by $\pmb { \theta } ^ { \mathrm { o l d } }$ . In the E step, we take these parameter values and find the posterior distribution of the latent variables $p ( \mathbf { Z } | \mathbf { X } , \theta ^ { \mathrm { { \bar { o l d } } } } )$ . We then use this posterior distribution to evaluate the expectation of the logarithm of the complete-data likelihood function, as a function of the parameters θ, to give the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ defined by 

$$
Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\text { old }}) = \sum_ {\mathbf {Z}} p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\theta} ^ {\text { old }}) \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}).\tag{13.12}
$$

At this point, it is convenient to introduce some notation. We shall use $\gamma ( \mathbf { z } _ { n } )$ to denote the marginal posterior distribution of a latent variable $\mathbf { z } _ { n }$ , and $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ to denote the joint posterior distribution of two successive latent variables, so that 

$$
{\gamma (\mathbf {z} _ {n})} = {p (\mathbf {z} _ {n} | \mathbf {X}, \pmb {\theta} ^ {\mathrm{old}})}\tag{13.13}
$$

$$
\xi (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) = p (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n} | \mathbf {X}, \boldsymbol {\theta} ^ {\mathrm{old}}).\tag{13.14}
$$

For each value of $n ,$ we can store $\gamma ( \mathbf { z } _ { n } )$ using a set of K nonnegative numbers that sum to unity, and similarly we can store $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ using a $K \times K$ matrix of nonnegative numbers that again sum to unity. We shall also use $\gamma ( z _ { n k } )$ to denote the conditional probability of $z _ { n k } = 1$ , with a similar use of notation for $\xi \big ( z _ { n - 1 , j } , z _ { n k } \big )$ and for other probabilistic variables introduced later. Because the expectation of a binary random variable is just the probability that it takes the value 1, we have 

$$
\gamma (z _ {n k}) = \mathbb {E} [ z _ {n k} ] = \sum_ {\mathbf {z}} \gamma (\mathbf {z}) z _ {n k}\tag{13.15}
$$

$$
\xi (z _ {n - 1, j}, z _ {n k}) = \mathbb {E} [ z _ {n - 1, j} z _ {n k} ] = \sum_ {\mathbf {z}} \gamma (\mathbf {z}) z _ {n - 1, j} z _ {n k}.\tag{13.16}
$$

If we substitute the joint distribution $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ given by (13.10) into (13.12), 

and make use of the definitions of $\gamma$ and $\xi$ , we obtain 

$$
\begin{array}{r c l} Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\text {old}}) & = & \sum_ {k = 1} ^ {K} \gamma (z _ {1 k}) \ln \pi_ {k} + \sum_ {n = 2} ^ {N} \sum_ {j = 1} ^ {K} \sum_ {k = 1} ^ {K} \xi (z _ {n - 1, j}, z _ {n k}) \ln A _ {j k} \\ & & + \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma (z _ {n k}) \ln p (\mathbf {x} _ {n} | \boldsymbol {\phi} _ {k}). \end{array}\tag{13.17}
$$

The goal of the E step will be to evaluate the quantities $\gamma ( \mathbf { z } _ { n } )$ and $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ efficiently, and we shall discuss this in detail shortly. 

In the M step, we maximize $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to the parameters $\theta \ : = \ :$ $\{ \pi , \mathbf { A } , \phi \}$ in which we treat $\gamma ( \mathbf { z } _ { n } )$ and $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ as constant. Maximization with respect to $\pi$ and A is easily achieved using appropriate Lagrange multipliers with the results 

Exercise 13.5 

$$
\pi_ {k} = \frac {\gamma (z _ {1 k})}{\sum_ {j = 1} ^ {K} \gamma (z _ {1 j})}\tag{13.18}
$$

$$
A _ {j k} = \frac {\sum_ {n = 2} ^ {N} \xi (z _ {n - 1 , j} , z _ {n k})}{\sum_ {l = 1} ^ {K} \sum_ {n = 2} ^ {N} \xi (z _ {n - 1 , j} , z _ {n l})}.\tag{13.19}
$$

The EM algorithm must be initialized by choosing starting values for π and A, which should of course respect the summation constraints associated with their probabilistic interpretation. Note that any elements of π or A that are set to zero initially will remain zero in subsequent EM updates. A typical initialization procedure would involve selecting random starting values for these parameters subject to the summation and non-negativity constraints. Note that no particular modification to the EM results are required for the case of left-to-right models beyond choosing initial values for the elements $A _ { j k }$ in which the appropriate elements are set to zero, because these will remain zero throughout. 

To maximize $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to $\phi _ { k }$ , we notice that only the final term in (13.17) depends on $\phi _ { k }$ , and furthermore this term has exactly the same form as the data-dependent term in the corresponding function for a standard mixture distribution for i.i.d. data, as can be seen by comparison with (9.40) for the case of a Gaussian mixture. Here the quantities $\gamma ( z _ { n k } )$ are playing the role of the responsibilities. If the parameters $\phi _ { k }$ are independent for the different components, then this term decouples into a sum of terms one for each value of $k ,$ each of which can be maximized independently. We are then simply maximizing the weighted log likelihood function for the emission density $p ( \mathbf { x } | \phi _ { k } )$ with weights $\gamma ( z _ { n k } )$ . Here we shall suppose that this maximization can be done efficiently. For instance, in the case of 

Gaussian emission densities we have $p ( \mathbf { x } | \phi _ { k } ) = \mathcal { N } ( \mathbf { x } | \mu _ { k } , \Sigma _ { k } )$ , and maximization of the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ then gives 

$$
\begin{array}{l l l} \boldsymbol {\mu} _ {k} & = & \frac { \sum_ {n = 1} ^ {N} \gamma (z _ {n k}) \mathbf {x} _ {n}}{ \sum_ {n = 1} ^ {N} \gamma (z _ {n k})} \\ \boldsymbol {\Sigma} _ {k} & = & \frac { \sum_ {n = 1} ^ {N} \gamma (z _ {n k}) (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k}) (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}}}{ \sum_ {n = 1} ^ {N} \gamma (z _ {n k})}. \end{array}\tag{13.20}
$$

(13.21) 

For the case of discrete multinomial observed variables, the conditional distribution of the observations takes the form 

$$
p (\mathbf {x} | \mathbf {z}) = \prod_ {i = 1} ^ {D} \prod_ {k = 1} ^ {K} \mu_ {i k} ^ {x _ {i} z _ {k}}\tag{13.22}
$$

Exercise 13.8 

and the corresponding M-step equations are given by 

$$
\mu_ {i k} = \frac {\sum_ {n = 1} ^ {N} \gamma (z _ {n k}) x _ {n i}}{\sum_ {n = 1} ^ {N} \gamma (z _ {n k})}.\tag{13.23}
$$

An analogous result holds for Bernoulli observed variables. 

The EM algorithm requires initial values for the parameters of the emission distribution. One way to set these is first to treat the data initially as i.i.d. and fit the emission density by maximum likelihood, and then use the resulting values to initialize the parameters for EM. 

## 13.2.2 The forward-backward algorithm

Next we seek an efficient procedure for evaluating the quantities $\gamma ( z _ { n k } )$ and $\xi ( z _ { n - 1 , j } , z _ { n k } )$ , corresponding to the E step of the EM algorithm. The graph for the hidden Markov model, shown in Figure 13.5, is a tree, and so we know that the posterior distribution of the latent variables can be obtained efficiently using a twostage message passing algorithm. In the particular context of the hidden Markov model, this is known as the forward-backward algorithm (Rabiner, 1989), or the Baum-Welch algorithm (Baum, 1972). There are in fact several variants of the basic algorithm, all of which lead to the exact marginals, according to the precise form of the messages that are propagated along the chain (Jordan, 2007). We shall focus on the most widely used of these, known as the alpha-beta algorithm. 

As well as being of great practical importance in its own right, the forwardbackward algorithm provides us with a nice illustration of many of the concepts introduced in earlier chapters. We shall therefore begin in this section with a ‘conventional’ derivation of the forward-backward equations, making use of the sum and product rules of probability, and exploiting conditional independence properties which we shall obtain from the corresponding graphical model using d-separation. Then in Section 13.2.3, we shall see how the forward-backward algorithm can be obtained very simply as a specific example of the sum-product algorithm introduced in Section 8.4.4. 

It is worth emphasizing that evaluation of the posterior distributions of the latent variables is independent of the form of the emission density $p ( \mathbf { x } | \mathbf { z } )$ or indeed of whether the observed variables are continuous or discrete. All we require is the values of the quantities $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ for each value of $\mathbf { z } _ { n }$ for every n. Also, in this section and the next we shall omit the explicit dependence on the model parameters $\theta ^ { \mathrm { o l d } }$ because these fixed throughout. 

We therefore begin by writing down the following conditional independence properties (Jordan, 2007) 

$$
{p (\mathbf {X} | \mathbf {z} _ {n})} = {p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n} | \mathbf {z} _ {n})}\tag{13.24}
$$

$$
{p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {x} _ {n}, \mathbf {z} _ {n})} = {p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n})}\tag{13.25}
$$

$$
{p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1}, \mathbf {z} _ {n})} = {p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1})}\tag{13.26}
$$

$$
{p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n}, \mathbf {z} _ {n + 1})} = {p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1})}\tag{13.27}
$$

$$
{p (\mathbf {x} _ {n + 2}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1}, \mathbf {x} _ {n + 1})} = {p (\mathbf {x} _ {n + 2}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1})}\tag{13.28}
$$

$$
{p (\mathbf {X} | \mathbf {z} _ {n - 1}, \mathbf {z} _ {n})} = {p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1})}
$$

$$
p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n})\tag{13.29}
$$

$$
{p (\mathbf {x} _ {N + 1} | \mathbf {X}, \mathbf {z} _ {N + 1})} = {p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1})}\tag{13.30}
$$

$$
{p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {N}, \mathbf {X})} = {p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {N})}\tag{13.31}
$$

where $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ . These relations are most easily proved using d-separation. For instance in the first of these results, we note that every path from any one of the nodes $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 }$ to the node ${ \bf x } _ { n }$ passes through the node $\mathbf { z } _ { n }$ , which is observed. Because all such paths are head-to-tail, it follows that the conditional independence property must hold. The reader should take a few moments to verify each of these properties in turn, as an exercise in the application of d-separation. These relations can also be proved directly, though with significantly greater effort, from the joint distribution for the hidden Markov model using the sum and product rules of probability. 

Let us begin by evaluating $\gamma ( z _ { n k } )$ . Recall that for a discrete multinomial random variable the expected value of one of its components is just the probability of that component having the value 1. Thus we are interested in finding the posterior distribution $p ( \mathbf { z } _ { n } \vert \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } )$ of $\mathbf { z } _ { n }$ given the observed data set $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ . This represents a vector of length K whose entries correspond to the expected values of $z _ { n k }$ . Using Bayes’ theorem, we have 

$$
\gamma (\mathbf {z} _ {n}) = p (\mathbf {z} _ {n} | \mathbf {X}) = \frac {p (\mathbf {X} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n})}{p (\mathbf {X})}.\tag{13.32}
$$

Note that the denominator $p ( \mathbf { X } )$ is implicitly conditioned on the parameters $\pmb { \theta } ^ { \mathrm { o l d } }$ of the HMM and hence represents the likelihood function. Using the conditional independence property (13.24), together with the product rule of probability, we obtain 

$$
\gamma (\mathbf {z} _ {n}) = \frac {p (\mathbf {x} _ {1} , \ldots , \mathbf {x} _ {n} , \mathbf {z} _ {n}) p (\mathbf {x} _ {n + 1} , \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n})}{p (\mathbf {X})} = \frac {\alpha (\mathbf {z} _ {n}) \beta (\mathbf {z} _ {n})}{p (\mathbf {X})}\tag{13.33}
$$

where we have defined 

$$
\alpha (\mathbf {z} _ {n}) \equiv p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}, \mathbf {z} _ {n})\tag{13.34}
$$

$$
\beta (\mathbf {z} _ {n}) \equiv p (\mathbf {x} _ {n + 1}, \dots , \mathbf {x} _ {N} | \mathbf {z} _ {n}).\tag{13.35}
$$

The quantity $\alpha ( { \mathbf z } _ { n } )$ represents the joint probability of observing all of the given data up to time n and the value of $\mathbf { z } _ { n }$ , whereas $\beta ( { \bf z } _ { n } )$ represents the conditional probability of all future data from time $n + 1$ up to N given the value of $\mathbf { z } _ { n }$ . Again, $\alpha ( { \mathbf z } _ { n } )$ and $\beta ( { \bf z } _ { n } )$ each represent set of $K$ numbers, one for each of the possible settings of the 1-of-K coded binary vector $\mathbf { z } _ { n }$ . We shall use the notation $\alpha ( z _ { n k } )$ to denote the value of $\alpha ( { \mathbf z } _ { n } )$ when $z _ { n k } = 1$ , with an analogous interpretation of $\beta ( z _ { n k } )$ 

We now derive recursion relations that allow $\alpha ( { \mathbf z } _ { n } )$ and $\beta ( { \bf z } _ { n } )$ to be evaluated efficiently. Again, we shall make use of conditional independence properties, in particular (13.25) and (13.26), together with the sum and product rules, allowing us to express $\alpha ( { \mathbf z } _ { n } )$ in terms of $\alpha ( { \bf z } _ { n - 1 } )$ as follows 

$$
\begin{array}{r c l} \alpha (\mathbf {z} _ {n}) & = & p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}, \mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}, \mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}, \mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}, \mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n - 1}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n - 1}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x}. _ {n - 1}, \mathbf {z}. _ {n - 1}) p (\mathbf {z}. _ {n} | \mathbf {z}. _ {n - 1}) \end{array}
$$

Making use of the definition (13.34) for $\alpha ( { \mathbf z } _ { n } )$ , we then obtain 

$$
\alpha (\mathbf {z} _ {n}) = p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} \alpha (\mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}).\tag{13.36}
$$

Illustration of the forward recursion (13.36) for evaluation of the $\alpha$ variables. In this fragment of the lattice, we see that the quantity $\bar { \alpha } ( z _ { n 1 } )$ is obtained by taking the elements $\alpha ( z _ { n - 1 , j } )$ of $\alpha ( { \bf z } _ { n - 1 } )$ at step $n - 1$ and summing them up with weights given by $A _ { j 1 }$ , corresponding to the values of $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ , and then multiplying by the data contribution $p ( \mathbf { x } _ { n } | z _ { n 1 } )$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/b8b82eb0c8bb3000b942f6eb10b4f111f2c2242c862fc1dabe4e3c659b0481c5.jpg)


It is worth taking a moment to study this recursion relation in some detail. Note that there are $K$ terms in the summation, and the right-hand side has to be evaluated for each of the $K$ values of $\mathbf { z } _ { n }$ so each step of the $\alpha$ recursion has computational cost that scaled like $O ( K ^ { 2 } )$ . The forward recursion equation for $\alpha ( { \mathbf z } _ { n } )$ is illustrated using a lattice diagram in Figure 13.12. 

In order to start this recursion, we need an initial condition that is given by 

$$
\alpha (\mathbf {z} _ {1}) = p (\mathbf {x} _ {1}, \mathbf {z} _ {1}) = p (\mathbf {z} _ {1}) p (\mathbf {x} _ {1} | \mathbf {z} _ {1}) = \prod_ {k = 1} ^ {K} \left\{\pi_ {k} p (\mathbf {x} _ {1} | \boldsymbol {\phi} _ {k}) \right\} ^ {z _ {1 k}}\tag{13.37}
$$

which tells us that $\alpha ( z _ { 1 k } )$ , for $k = 1 , \ldots , K$ , takes the value $\pi _ { k } p ( { \bf x } _ { 1 } | \phi _ { k } )$ . Starting at the first node of the chain, we can then work along the chain and evaluate $\alpha ( { \mathbf z } _ { n } )$ for every latent node. Because each step of the recursion involves multiplying by a $K \times K$ matrix, the overall cost of evaluating these quantities for the whole chain is of $O ( K ^ { 2 } N )$ 

We can similarly find a recursion relation for the quantities $\beta ( { \bf z } _ { n } )$ by making use of the conditional independence properties (13.27) and (13.28) giving 

$$
\begin{array}{l l l} \beta (\mathbf {z} _ {n}) & = & p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n}) \\ & = & \sum_ {\mathbf {z} _ {n + 1}} p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N}, \mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) \\ & = & \sum_ {\mathbf {z} _ {n + 1}} p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n}, \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) \\ & = & \sum_ {\mathbf {z} _ {n + 1}} p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) \\ & = & \sum_ {\mathbf {z} _ {n + 1}} p (\mathbf {x} _ {n + 2}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1}) p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}). \end{array}
$$

Illustration of the backward recursion (13.38) for evaluation of the $\beta$ variables. In this fragment of the lattice, we see that the quantity $\beta ( z _ { n 1 } )$ is obtained by taking the components $\beta ( z _ { n + 1 , k } )$ of $\beta ( \mathbf { z } _ { n + 1 } )$ at step $n + 1$ and summing them up with weights given by the products of $A _ { 1 k }$ , corresponding to the values of $p ( \mathbf { z } _ { n + 1 } | \mathbf { z } _ { n } )$ and the corresponding values of the emission density $p ( \mathbf { x } _ { n } | z _ { n + 1 , k } )$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/2d709c9c6123d19ac66e01826b856b8d212b872ac4ee663d4a7439fb7be4e478.jpg)


Making use of the definition (13.35) for $\beta ( { \bf z } _ { n } )$ , we then obtain 

$$
\beta (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n + 1}} \beta (\mathbf {z} _ {n + 1}) p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}).\tag{13.38}
$$

Note that in this case we have a backward message passing algorithm that evaluates $\beta ( { \bf z } _ { n } )$ in terms of $\beta ( { \bf z } _ { n + 1 } )$ . At each step, we absorb the effect of observation $\mathbf { x } _ { n + 1 }$ through the emission probability $p ( \mathbf { x } _ { n + 1 } | \mathbf { z } _ { n + 1 } )$ , multiply by the transition matrix $p ( \mathbf { z } _ { n + 1 } | \mathbf { z } _ { n } )$ , and then marginalize out $\mathbf { z } _ { n + 1 }$ . This is illustrated in Figure 13.13. 

Again we need a starting condition for the recursion, namely a value for $\beta ( { \bf z } _ { N } )$ This can be obtained by setting $n = N$ in (13.33) and replacing $\alpha ( { \bf z } _ { N } )$ with its definition (13.34) to give 

$$
p (\mathbf {z} _ {N} | \mathbf {X}) = \frac {p (\mathbf {X} , \mathbf {z} _ {N}) \beta (\mathbf {z} _ {N})}{p (\mathbf {X})}\tag{13.39}
$$

which we see will be correct provided we take $\beta ( { \bf z } _ { N } ) = 1$ for all settings of $\mathbf { z } _ { N }$ . 

In the M step equations, the quantity $p ( \mathbf { X } )$ will cancel out, as can be seen, for instance, in the M-step equation for $\mu _ { k }$ given by (13.20), which takes the form 

$$
\boldsymbol {\mu} _ {k} = \frac {\sum_ {n = 1} ^ {n} \gamma (z _ {n k}) \mathbf {x} _ {n}}{\sum_ {n = 1} ^ {n} \gamma (z _ {n k})} = \frac {\sum_ {n = 1} ^ {n} \alpha (z _ {n k}) \beta (z _ {n k}) \mathbf {x} _ {n}}{\sum_ {n = 1} ^ {n} \alpha (z _ {n k}) \beta (z _ {n k})}.\tag{13.40}
$$

However, the quantity $p ( \mathbf { X } )$ represents the likelihood function whose value we typically wish to monitor during the EM optimization, and so it is useful to be able to evaluate it. If we sum both sides of (13.33) over $\mathbf { z } _ { n }$ , and use the fact that the left-hand side is a normalized distribution, we obtain 

$$
p (\mathbf {X}) = \sum_ {\mathbf {z} _ {n}} \alpha (\mathbf {z} _ {n}) \beta (\mathbf {z} _ {n}).\tag{13.41}
$$

Thus we can evaluate the likelihood function by computing this sum, for any convenient choice of $n .$ For instance, if we only want to evaluate the likelihood function, then we can do this by running the α recursion from the start to the end of the chain, and then use this result for $n = N$ , making use of the fact that $\beta ( { \bf z } _ { N } )$ is a vector of 1s. In this case no $\beta$ recursion is required, and we simply have 

$$
p (\mathbf {X}) = \sum_ {\mathbf {z} _ {N}} \alpha (\mathbf {z} _ {N}).\tag{13.42}
$$

Let us take a moment to interpret this result for $p ( \mathbf { X } )$ . Recall that to compute the likelihood we should take the joint distribution $p ( \mathbf { X } , \mathbf { Z } )$ and sum over all possible values of Z. Each such value represents a particular choice of hidden state for every time step, in other words every term in the summation is a path through the lattice diagram, and recall that there are exponentially many such paths. By expressing the likelihood function in the form (13.42), we have reduced the computational cost from being exponential in the length of the chain to being linear by swapping the order of the summation and multiplications, so that at each time step n we sum the contributions from all paths passing through each of the states $z _ { n k }$ to give the intermediate quantities $\alpha ( { \mathbf z } _ { n } )$ 

Next we consider the evaluation of the quantities $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ , which correspond to the values of the conditional probabilities $p ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } | \mathbf { X } )$ for each of the $K \times K$ settings for $\left( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } \right)$ . Using the definition of $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ , and applying Bayes theorem, we have 

$$
\begin{array}{l} \xi (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) = p (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n} | \mathbf {X}) \\ = \frac {p (\mathbf {X} | \mathbf {z} _ {n - 1} , \mathbf {z} _ {n}) p (\mathbf {z} _ {n - 1} , \mathbf {z} _ {n})}{p (\mathbf {X})} \\ = \frac {p (\mathbf {x} _ {1} , \dots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {x} _ {n + 1} , \dots , \mathbf {x} _ {N} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n - 1})}{p (\mathbf {X})} \\ = \frac {\alpha (\mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) \beta (\mathbf {z} _ {n})}{p (\mathbf {X})} \end{array} \tag {13.43}
$$

where we have made use of the conditional independence property (13.29) together with the definitions of $\alpha ( { \mathbf z } _ { n } )$ and $\beta ( { \bf z } _ { n } )$ given by (13.34) and (13.35). Thus we can calculate the $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ directly by using the results of the α and $\beta$ recursions. 

Let us summarize the steps required to train a hidden Markov model using the EM algorithm. We first make an initial selection of the parameters $\pmb { \theta } ^ { \mathrm { o l d } }$ where $\pmb { \theta } \equiv ( \pi , \mathbf { A } , \phi )$ The A and $\pi$ parameters are often initialized either uniformly or randomly from a uniform distribution (respecting their non-negativity and summation constraints). Initialization of the parameters $\phi$ will depend on the form of the distribution. For instance in the case of Gaussians, the parameters $\mu _ { k }$ might be initialized by applying the K-means algorithm to the data, and $\Sigma _ { k }$ might be initialized to the covariance matrix of the corresponding K means cluster. Then we run both the forward α recursion and the backward $\beta$ recursion and use the results to evaluate $\gamma ( \mathbf { z } _ { n } )$ and $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ . At this stage, we can also evaluate the likelihood function. 

This completes the E step, and we use the results to find a revised set of parameters $\pmb { \theta } ^ { \mathrm { n e w } }$ using the M-step equations from Section 13.2.1. We then continue to alternate between E and M steps until some convergence criterion is satisfied, for instance when the change in the likelihood function is below some threshold. 

Note that in these recursion relations the observations enter through conditional distributions of the form $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ The recursions are therefore independent of the type or dimensionality of the observed variables or the form of this conditional distribution, so long as its value can be computed for each of the K possible states of $\mathbf { z } _ { n }$ . Since the observed variables $\left\{ { \bf x } _ { n } \right\}$ are fixed, the quantities $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ can be pre-computed as functions of $\mathbf { z } _ { n }$ at the start of the EM algorithm, and remain fixed throughout. 

We have seen in earlier chapters that the maximum likelihood approach is most effective when the number of data points is large in relation to the number of parameters. Here we note that a hidden Markov model can be trained effectively, using maximum likelihood, provided the training sequence is sufficiently long. Alternatively, we can make use of multiple shorter sequences, which requires a straightforward modification of the hidden Markov model EM algorithm. In the case of left-to-right models, this is particularly important because, in a given observation sequence, a given state transition corresponding to a nondiagonal element of A will seen at most once. 

Another quantity of interest is the predictive distribution, in which the observed data is $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ and we wish to predict $\mathbf { x } _ { N + 1 }$ , which would be important for real-time applications such as financial forecasting. Again we make use of the sum and product rules together with the conditional independence properties (13.29) and (13.31) giving 

$$
\begin{array}{r c l} p (\mathbf {x} _ {N + 1} | \mathbf {X}) & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1}, \mathbf {z} _ {N + 1} | \mathbf {X}) \\ & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) p (\mathbf {z} _ {N + 1} | \mathbf {X}) \\ & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) \sum_ {\mathbf {z} _ {N}} p (\mathbf {z} _ {N + 1}, \mathbf {z} _ {N} | \mathbf {X}) \\ & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) \sum_ {\mathbf {z} _ {N}} p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {N}) p (\mathbf {z} _ {N} | \mathbf {X}) \\ & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) \sum_ {\mathbf {z} _ {N}} p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {\mathrm{N}}) \frac {p (\mathbf {z} _ {\mathrm{N}} , \mathbf {X})}{p (\mathbf {X})} \\ & = & \frac {1}{p (\mathbf {X})} \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) \sum_ {\mathbf {z} _ {\mathrm{N}}} p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {\mathrm{N}}) \alpha (\mathbf {z} _ {\mathrm{N}}) \end{array}\tag{13.44}
$$

which can be evaluated by first running a forward α recursion and then computing the final summations over $\mathbf { z } _ { N }$ and $\mathbf { z } _ { N + 1 }$ . The result of the first summation over $\mathbf { z } _ { N }$ can be stored and used once the value of $\mathbf { x } _ { N + 1 }$ is observed in order to run the α recursion forward to the next step in order to predict the subsequent value $\mathbf { x } _ { N + 2 }$ 


Figure 13.14 A fragment of the factor graph representation for the hidden Markov model.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/a9c212e43dfe92e79705766a0b2ae31ea2256d376f8ccca805c90e28b21f41a6.jpg)


Note that in (13.44), the influence of all data from $\mathbf { x } _ { 1 }$ to $\mathbf { x } _ { N }$ is summarized in the K values of $\alpha ( { \bf z } _ { N } )$ . Thus the predictive distribution can be carried forward indefinitely using a fixed amount of storage, as may be required for real-time applications. 

Here we have discussed the estimation of the parameters of an HMM using maximum likelihood. This framework is easily extended to regularized maximum likelihood by introducing priors over the model parameters $\pi .$ , A and $\phi$ whose values are then estimated by maximizing their posterior probability. This can again be done using the EM algorithm in which the E step is the same as discussed above, and the M step involves adding the log of the prior distribution $p ( \pmb \theta )$ to the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ before maximization and represents a straightforward application of the techniques developed at various points in this book. Furthermore, we can use variational methods to give a fully Bayesian treatment of the HMM in which we marginalize over the parameter distributions (MacKay, 1997). As with maximum likelihood, this leads to a two-pass forward-backward recursion to compute posterior probabilities. 

## 13.2.3 The sum-product algorithm for the HMM

The directed graph that represents the hidden Markov model, shown in Figure 13.5, is a tree and so we can solve the problem of finding local marginals for the hidden variables using the sum-product algorithm. Not surprisingly, this turns out to be equivalent to the forward-backward algorithm considered in the previous section, and so the sum-product algorithm therefore provides us with a simple way to derive the alpha-beta recursion formulae. 

We begin by transforming the directed graph of Figure 13.5 into a factor graph, of which a representative fragment is shown in Figure 13.14. This form of the factor graph shows all variables, both latent and observed, explicitly. However, for the purpose of solving the inference problem, we shall always be conditioning on the variables $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ , and so we can simplify the factor graph by absorbing the emission probabilities into the transition probability factors. This leads to the simplified factor graph representation in Figure 13.15, in which the factors are given by 

$$
{h (\mathbf {z} _ {1})} = {p (\mathbf {z} _ {1}) p (\mathbf {x} _ {1} | \mathbf {z} _ {1})}\tag{13.45}
$$

$$
{f _ {n} (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n})} = {p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}).}\tag{13.46}
$$

Figure 13.15 A simplified form of factor graph to describe the hidden Markov model. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/76a73eb030e95cf7da48fb735bd6c6868405489832fc986700cab4783145c9d0.jpg)


To derive the alpha-beta algorithm, we denote the final hidden variable $\mathbf { z } _ { N }$ as the root node, and first pass messages from the leaf node h to the root. From the general results (8.66) and (8.69) for message propagation, we see that the messages which are propagated in the hidden Markov model take the form 

$$
\mu_ {\mathbf {z} _ {n - 1} \to f _ {n}} (\mathbf {z} _ {n - 1}) = \mu_ {f _ {n - 1} \to \mathbf {z} _ {n - 1}} (\mathbf {z} _ {n - 1})\tag{13.47}
$$

$$
\mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n - 1}} f _ {n} (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) \mu_ {\mathbf {z} _ {n - 1} \to f _ {n}} (\mathbf {z} _ {n - 1})\tag{13.48}
$$

These equations represent the propagation of messages forward along the chain and are equivalent to the alpha recursions derived in the previous section, as we shall now show. Note that because the variable nodes $\mathbf { z } _ { n }$ have only two neighbours, they perform no computation. 

We can eliminate $\mu _ { \mathbf { z } _ { n - 1 }  f _ { n } } ( \mathbf { z } _ { n - 1 } )$ from (13.48) using (13.47) to give a recursion for the $f  \mathbf { z }$ messages of the form 

$$
\mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n - 1}} f _ {n} (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) \mu_ {f _ {n - 1} \to \mathbf {z} _ {n - 1}} (\mathbf {z} _ {n - 1}).\tag{13.49}
$$

If we now recall the definition (13.46), and if we define 

$$
\alpha (\mathbf {z} _ {n}) = \mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n})\tag{13.50}
$$

then we obtain the alpha recursion given by (13.36). We also need to verify that the quantities $\alpha ( { \mathbf z } _ { n } )$ are themselves equivalent to those defined previously. This is easily done by using the initial condition (8.71) and noting that $\alpha ( { \bf z } _ { 1 } )$ is given by $h ( \mathbf { z } _ { 1 } ) = p ( \mathbf { z } _ { 1 } ) p ( \mathbf { x } _ { 1 } | \mathbf { z } _ { 1 } )$ which is identical to (13.37). Because the initial α is the same, and because they are iteratively computed using the same equation, all subsequent α quantities must be the same. 

Next we consider the messages that are propagated from the root node back to the leaf node. These take the form 

$$
\mu_ {f _ {n + 1} \rightarrow f _ {n}} (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n + 1}} f _ {n + 1} (\mathbf {z} _ {n}, \mathbf {z} _ {n + 1}) \mu_ {f _ {n + 2} \rightarrow f _ {n + 1}} (\mathbf {z} _ {n + 1})\tag{13.51}
$$

where, as before, we have eliminated the messages of the type $\mathrm { ~ \bf ~ z ~ } \to \mathrm { ~ \boldsymbol ~ f ~ }$ since the variable nodes perform no computation. Using the definition (13.46) to substitute for $f _ { n + 1 } ( \mathbf { z } _ { n } , \mathbf { z } _ { n + 1 } )$ , and defining 

$$
\beta (\mathbf {z} _ {n}) = \mu_ {f _ {n + 1} \rightarrow \mathbf {z} _ {n}} (\mathbf {z} _ {n})\tag{13.52}
$$

we obtain the beta recursion given by (13.38). Again, we can verify that the beta variables themselves are equivalent by noting that (8.70) implies that the initial message send by the root variable node is $\mu _ { { \bf z } _ { N }  f _ { N } } ( { \bf z } _ { N } ) = 1$ , which is identical to the initialization of $\beta ( { \bf z } _ { N } )$ given in Section 13.2.2. 

The sum-product algorithm also specifies how to evaluate the marginals once all the messages have been evaluated. In particular, the result (8.63) shows that the local marginal at the node $\mathbf { z } _ { n }$ is given by the product of the incoming messages. Because we have conditioned on the variables $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ , we are computing the joint distribution 

$$
p (\mathbf {z} _ {n}, \mathbf {X}) = \mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n}) \mu_ {f _ {n + 1} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n}) = \alpha (\mathbf {z} _ {n}) \beta (\mathbf {z} _ {n}).\tag{13.53}
$$

Dividing both sides by $p ( \mathbf { X } )$ , we then obtain 

$$
\gamma (\mathbf {z} _ {n}) = \frac {p (\mathbf {z} _ {n} , \mathbf {X})}{p (\mathbf {X})} = \frac {\alpha (\mathbf {z} _ {n}) \beta (\mathbf {z} _ {n})}{p (\mathbf {X})}\tag{13.54}
$$

Exercise 13.11 

in agreement with (13.33). The result (13.43) can similarly be derived from (8.72). 

## 13.2.4 Scaling factors

There is an important issue that must be addressed before we can make use of the forward backward algorithm in practice. From the recursion relation (13.36), we note that at each step the new value $\alpha ( { \mathbf z } _ { n } )$ is obtained from the previous value $\alpha ( { \bf z } _ { n - 1 } )$ by multiplying by quantities $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ and $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ . Because these probabilities are often significantly less than unity, as we work our way forward along the chain, the values of $\alpha ( { \mathbf z } _ { n } )$ can go to zero exponentially quickly. For moderate lengths of chain (say 100 or so), the calculation of the $\alpha ( { \mathbf z } _ { n } )$ will soon exceed the dynamic range of the computer, even if double precision floating point is used. 

In the case of i.i.d. data, we implicitly circumvented this problem with the evaluation of likelihood functions by taking logarithms. Unfortunately, this will not help here because we are forming sums of products of small numbers (we are in fact implicitly summing over all possible paths through the lattice diagram of Figure 13.7). We therefore work with re-scaled versions of $\alpha ( { \mathbf z } _ { n } )$ and $\beta ( { \bf z } _ { n } )$ whose values remain of order unity. As we shall see, the corresponding scaling factors cancel out when we use these re-scaled quantities in the EM algorithm. 

In (13.34), we defined $\alpha ( { \mathbf z } _ { n } ) = p ( { \mathbf x } _ { 1 } , \ldots , { \mathbf x } _ { n } , { \mathbf z } _ { n } )$ representing the joint distribution of all the observations up to ${ \bf x } _ { n }$ and the latent variable $\mathbf { z } _ { n }$ . Now we define a normalized version of α given by 

$$
\widehat {\alpha} (\mathbf {z} _ {n}) = p (\mathbf {z} _ {n} | \mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}) = \frac {\alpha (\mathbf {z} _ {n})}{p (\mathbf {x} _ {1} , \ldots , \mathbf {x} _ {n})}\tag{13.55}
$$

which we expect to be well behaved numerically because it is a probability distribution over K variables for any value of $n$ . In order to relate the scaled and original alpha variables, we introduce scaling factors defined by conditional distributions over the observed variables 

$$
c _ {n} = p \left(\mathbf {x} _ {n} \mid \mathbf {x} _ {1}, \dots , \mathbf {x} _ {n - 1}\right).\tag{13.56}
$$

From the product rule, we then have 

$$
p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}) = \prod_ {m = 1} ^ {n} c _ {m}\tag{13.57}
$$

and so 

$$
\alpha (\mathbf {z} _ {n}) = p (\mathbf {z} _ {n} | \mathbf {x} _ {1}, \dots , \mathbf {x} _ {n}) p (\mathbf {x} _ {1}, \dots , \mathbf {x} _ {n}) = \left(\prod_ {m = 1} ^ {n} c _ {m}\right) \widehat {\alpha} (\mathbf {z} _ {n}).\tag{13.58}
$$

We can then turn the recursion equation (13.36) for α into one for $\widehat { \alpha }$ given by 

$$
c _ {n} \widehat {\alpha} (\mathbf {z} _ {n}) = p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} \widehat {\alpha} (\mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}).\tag{13.59}
$$

Note that at each stage of the forward message passing phase, used to evaluate $\widehat { \alpha } ( \mathbf { z } _ { n } )$ we have to evaluate and store $c _ { n }$ , which is easily done because it is the coefficient that normalizes the right-hand side of (13.59) to give $\widehat { \alpha } ( \mathbf { z } _ { n } )$ 

We can similarly define re-scaled variables ${ \widehat { \beta } } ( \mathbf { z } _ { n } )$ using 

$$
\beta (\mathbf {z} _ {n}) = \left(\prod_ {m = n + 1} ^ {N} c _ {m}\right) \widehat {\beta} (\mathbf {z} _ {n})\tag{13.60}
$$

which will again remain within machine precision because, from (13.35), the quantities $\widehat { \beta } ( \mathbf { z } _ { n } )$ are simply the ratio of two conditional probabilities 

$$
\widehat {\beta} (\mathbf {z} _ {n}) = \frac {p (\mathbf {x} _ {n + 1} , \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n})}{p (\mathbf {x} _ {n + 1} , \ldots , \mathbf {x} _ {N} | \mathbf {x} _ {1} , \ldots , \mathbf {x} _ {n})}.\tag{13.61}
$$

The recursion result (13.38) for $\beta$ then gives the following recursion for the re-scaled variables 

$$
c _ {n + 1} \widehat {\beta} (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n + 1}} \widehat {\beta} (\mathbf {z} _ {n + 1}) p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}).\tag{13.62}
$$

In applying this recursion relation, we make use of the scaling factors $c _ { n }$ that were previously computed in the α phase. 

From (13.57), we see that the likelihood function can be found using 

$$
p (\mathbf {X}) = \prod_ {n = 1} ^ {N} c _ {n}.\tag{13.63}
$$

Exercise 13.15 

Similarly, using (13.33) and (13.43), together with (13.63), we see that the required marginals are given by 

$$
\gamma (\mathbf {z} _ {n}) = \widehat {\alpha} (\mathbf {z} _ {n}) \widehat {\beta} (\mathbf {z} _ {n})\tag{13.64}
$$

$$
\xi (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) = c _ {n} \widehat {\alpha} (\mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {z} _ {- 1}) \widehat {\beta} (\mathbf {z} _ {n}).\tag{13.65}
$$

Finally, we note that there is an alternative formulation of the forward-backward algorithm (Jordan, 2007) in which the backward pass is defined by a recursion based the quantities $\gamma ( \mathbf { z } _ { n } ) = { \widehat { \alpha } } ( \mathbf { z } _ { n } ) { \widehat { \beta } } ( \mathbf { z } _ { n } )$ instead of using ${ \widehat { \boldsymbol { \beta } } } ( \mathbf { z } _ { n } )$ . This $\alpha - \gamma$ recursion  requires that the forward pass be completed first so that all the quantities $\widehat { \alpha } ( \mathbf { z } _ { n } )$ are available for the backward pass, whereas the forward and backward passes of the $\alpha { - } \beta$ algorithm can be done independently. Although these two algorithms have comparable computational cost, the $\alpha { - } \beta$ version is the most commonly encountered one in the case of hidden Markov models, whereas for linear dynamical systems a recursion analogous to the $\alpha - \gamma$ form is more usual. 

## 13.2.5 The Viterbi algorithm

In many applications of hidden Markov models, the latent variables have some meaningful interpretation, and so it is often of interest to find the most probable sequence of hidden states for a given observation sequence. For instance in speech recognition, we might wish to find the most probable phoneme sequence for a given series of acoustic observations. Because the graph for the hidden Markov model is a directed tree, this problem can be solved exactly using the max-sum algorithm. We recall from our discussion in Section 8.4.5 that the problem of finding the most probable sequence of latent states is not the same as that of finding the set of states that are individually the most probable. The latter problem can be solved by first running the forward-backward (sum-product) algorithm to find the latent variable marginals $\gamma ( \mathbf { z } _ { n } )$ and then maximizing each of these individually (Duda et al., 2001). However, the set of such states will not, in general, correspond to the most probable sequence of states. In fact, this set of states might even represent a sequence having zero probability, if it so happens that two successive states, which in isolation are individually the most probable, are such that the transition matrix element connecting them is zero. 

In practice, we are usually interested in finding the most probable sequence of states, and this can be solved efficiently using the max-sum algorithm, which in the context of hidden Markov models is known as the Viterbi algorithm (Viterbi, 1967). Note that the max-sum algorithm works with log probabilities and so there is no need to use re-scaled variables as was done with the forward-backward algorithm. Figure 13.16 shows a fragment of the hidden Markov model expanded as lattice diagram. As we have already noted, the number of possible paths through the lattice grows exponentially with the length of the chain. The Viterbi algorithm searches this space of paths efficiently to find the most probable path with a computational cost that grows only linearly with the length of the chain. 

As with the sum-product algorithm, we first represent the hidden Markov model as a factor graph, as shown in Figure 13.15. Again, we treat the variable node $\mathbf { z } _ { N }$ as the root, and pass messages to the root starting with the leaf nodes. Using the results (8.93) and (8.94), we see that the messages passed in the max-sum algorithm are given by 

$$
\mu_ {\mathbf {z} _ {n} \to f _ {n + 1}} (\mathbf {z} _ {n}) = \mu_ {f _ {n} \to \mathbf {z} _ {n}} (\mathbf {z} _ {n})\tag{13.66}
$$

$$
\mu_ {f _ {n + 1} \to {\bf z} _ {n + 1}} ({\bf z} _ {n + 1}) = \max _ {{\bf z} _ {n}} \left\{\ln f _ {n + 1} ({\bf z} _ {n}, {\bf z} _ {n + 1}) + \mu_ {{\bf z} _ {n} \to f _ {n + 1}} ({\bf z} _ {n}) \right\}\tag{13.67}
$$

Figure 13.16 A fragment of the HMM lattice showing two possible paths. The Viterbi algorithm efficiently determines the most probable path from amongst the exponentially many possibilities. For any given path, the corresponding probability is given by the product of the elements of the transition matrix $A _ { j k }$ , corresponding to the probabilities $p ( \mathbf { z } _ { n + 1 } | \mathbf { z } _ { n } )$ for each segment of the path, along with the emission densities $p ( \mathbf { x } _ { n } | k )$ associated with each node on the path. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/117774143a79f88560fbe6265cd71fa302a637948845f02e9600551c9304cca7.jpg)


If we eliminate $\mu _ { \mathbf { z } _ { n }  f _ { n + 1 } } ( \mathbf { z } _ { n } )$ between these two equations, and make use of (13.46), we obtain a recursion for the $f  \mathbf { z }$ messages of the form 

$$
\omega (\mathbf {z} _ {n + 1}) = \ln p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) + \max _ {\mathbf {z} _ {n}} \left\{\ln p (\mathbf {x} _ {+ 1} | \mathbf {z} _ {n}) + \omega (\mathbf {z} _ {n}) \right\}\tag{13.68}
$$

where we have introduced the notation $\omega ( \mathbf { z } _ { n } ) \equiv \mu _ { f _ { n } \to \mathbf { z } _ { n } } ( \mathbf { z } _ { n } )$ 

From (8.95) and (8.96), these messages are initialized using 

$$
\omega (\mathbf {z} _ {1}) = \ln p (\mathbf {z} _ {1}) + \ln p (\mathbf {x} _ {1} | \mathbf {z} _ {1}).\tag{13.69}
$$

where we have used (13.45). Note that to keep the notation uncluttered, we omit the dependence on the model parameters $\pmb \theta$ that are held fixed when finding the most probable sequence. 

The Viterbi algorithm can also be derived directly from the definition (13.6) of the joint distribution by taking the logarithm and then exchanging maximizations and summations. It is easily seen that the quantities $\omega ( \mathbf { z } _ { n } )$ have the probabilistic interpretation 

$$
\omega (\mathbf {z} _ {n}) = \max _ {\mathbf {z} _ {1}, \ldots , \mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}, \mathbf {z} _ {1}, \ldots , \mathbf {z} _ {n}).\tag{13.70}
$$

Once we have completed the final maximization over $\mathbf { z } _ { N }$ , we will obtain the value of the joint distribution $p ( \mathbf { X } , \mathbf { Z } )$ corresponding to the most probable path. We also wish to find the sequence of latent variable values that corresponds to this path. To do this, we simply make use of the back-tracking procedure discussed in Section 8.4.5. Specifically, we note that the maximization over $\mathbf { z } _ { n }$ must be performed for each of the K possible values of $\mathbf { z } _ { n + 1 }$ . Suppose we keep a record of the values of $\mathbf { z } _ { n }$ that correspond to the maxima for each value of the $K$ values of $\mathbf { z } _ { n + 1 }$ . Let us denote this function by $\psi ( k _ { n } )$ where $k \in \{ 1 , \ldots , K \}$ . Once we have passed messages to the end of the chain and found the most probable state of $\mathbf { z } _ { N }$ , we can then use this function to backtrack along the chain by applying it recursively 

$$
k _ {n} ^ {\mathrm{max}} = \psi (k _ {n + 1} ^ {\mathrm{max}}).\tag{13.71}
$$

Intuitively, we can understand the Viterbi algorithm as follows. Naively, we could consider explicitly all of the exponentially many paths through the lattice, evaluate the probability for each, and then select the path having the highest probability. However, we notice that we can make a dramatic saving in computational cost as follows. Suppose that for each path we evaluate its probability by summing up products of transition and emission probabilities as we work our way forward along each path through the lattice. Consider a particular time step n and a particular state k at that time step. There will be many possible paths converging on the corresponding node in the lattice diagram. However, we need only retain that particular path that so far has the highest probability. Because there are $K$ states at time step n, we need to keep track of $K$ such paths. At time step $n + 1$ , there will be $K ^ { 2 }$ possible paths to consider, comprising $K$ possible paths leading out of each of the $K$ current states, but again we need only retain K of these corresponding to the best path for each state at time $n { + 1 }$ . When we reach the final time step N we will discover which state corresponds to the overall most probable path. Because there is a unique path coming into that state we can trace the path back to step $N - 1$ to see what state it occupied at that time, and so on back through the lattice to the state $n = 1$ 

## 13.2.6 Extensions of the hidden Markov model

The basic hidden Markov model, along with the standard training algorithm based on maximum likelihood, has been extended in numerous ways to meet the requirements of particular applications. Here we discuss a few of the more important examples. 

We see from the digits example in Figure 13.11 that hidden Markov models can be quite poor generative models for the data, because many of the synthetic digits look quite unrepresentative of the training data. If the goal is sequence classification, there can be significant benefit in determining the parameters of hidden Markov models using discriminative rather than maximum likelihood techniques. Suppose we have a training set of $R$ observation sequences ${ \bf X } _ { r }$ , where $r = 1 , \ldots , R .$ , each of which is labelled according to its class $m$ , where $m = 1 , \ldots , M$ . For each class, we have a separate hidden Markov model with its own parameters $\pmb { \theta } _ { m }$ , and we treat the problem of determining the parameter values as a standard classification problem in which we optimize the cross-entropy 

$$
\sum_ {r = 1} ^ {R} \ln p (m _ {r} | \mathbf {X} _ {r}).\tag{13.72}
$$

Using Bayes’ theorem this can be expressed in terms of the sequence probabilities associated with the hidden Markov models 

$$
\sum_ {r = 1} ^ {R} \ln \left\{\frac {p (\mathbf {X} _ {r} | \boldsymbol {\theta} _ {r}) p (m _ {r})}{\sum_ {l = 1} ^ {M} p (\mathbf {X} _ {r} | \boldsymbol {\theta} _ {l}) p (l _ {r})} \right\}\tag{13.73}
$$

where $p ( m )$ is the prior probability of class m. Optimization of this cost function is more complex than for maximum likelihood (Kapadia, 1998), and in particular requires that every training sequence be evaluated under each of the models in order to compute the denominator in (13.73). Hidden Markov models, coupled with discriminative training methods, are widely used in speech recognition (Kapadia, 1998). 


Section of an autoregressive hidden Markov model, in which the distribution of the observation ${ \bf x } _ { n }$ depends on a subset of the previous observations as well as on the hidden state ${ \bf z } _ { n }$ . In this example, the distribution of ${ \bf x } _ { n }$ depends on the two previous observations $\mathbf { x } _ { n - 1 }$ and ${ \bf x } _ { n - 2 }$


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/38bc50f2d541e1e76452172a9ad8748deedd5d4e6fa5e7756e0c6661918ac9f5.jpg)


A significant weakness of the hidden Markov model is the way in which it represents the distribution of times for which the system remains in a given state. To see the problem, note that the probability that a sequence sampled from a given hidden Markov model will spend precisely $T$ steps in state k and then make a transition to a different state is given by 

$$
p (T) = \left(A _ {k k}\right) ^ {T} \left(1 - A _ {k k}\right) \propto \exp \left(- T \ln A _ {k k}\right)\tag{13.74}
$$

and so is an exponentially decaying function of T. For many applications, this will be a very unrealistic model of state duration. The problem can be resolved by modelling state duration directly in which the diagonal coefficients $A _ { k k }$ are all set to zero, and each state k is explicitly associated with a probability distribution $p ( T | k )$ of possible duration times. From a generative point of view, when a state k is entered, a value $T$ representing the number of time steps that the system will remain in state k is then drawn from $p ( T | k )$ . The model then emits T values of the observed variable $\mathbf { x } _ { t }$ , which are generally assumed to be independent so that the corresponding emission density is simply $\begin{array} { r l } {  { \prod _ { t = 1 } ^ { T } p ( \mathbf x _ { t } | k ) } } \end{array}$ . This approach requires some straightforward modifications to the EM optimization procedure (Rabiner, 1989). 

Another limitation of the standard HMM is that it is poor at capturing longrange correlations between the observed variables (i.e., between variables that are separated by many time steps) because these must be mediated via the first-order Markov chain of hidden states. Longer-range effects could in principle be included by adding extra links to the graphical model of Figure 13.5. One way to address this is to generalize the HMM to give the autoregressive hidden Markov model (Ephraim et al., 1989), an example of which is shown in Figure 13.17. For discrete observations, this corresponds to expanded tables of conditional probabilities for the emission distributions. In the case of a Gaussian emission density, we can use the linear-Gaussian framework in which the conditional distribution for ${ \bf x } _ { n }$ given the values of the previous observations, and the value of $\mathbf { z } _ { n } .$ , is a Gaussian whose mean is a linear combination of the values of the conditioning variables. Clearly the number of additional links in the graph must be limited to avoid an excessive the number of free parameters. In the example shown in Figure 13.17, each observation depends on the two preceding observed variables as well as on the hidden state. Although this graph looks messy, we can again appeal to d-separation to see that in fact it still has a simple probabilistic structure. In particular, if we imagine conditioning on $\mathbf { z } _ { n }$ we see that, as with the standard HMM, the values of $\mathbf { z } _ { n - 1 }$ and $\mathbf { z } _ { n + 1 }$ are independent, corresponding to the conditional independence property (13.5). This is easily verified by noting that every path from node $\mathbf { z } _ { n - 1 }$ to node $\mathbf { z } _ { n + 1 }$ passes through at leas one observed node that is head-to-tail with respect to that path. As a consequence, we can again use a forward-backward recursion in the E step of the EM algorithm to determine the posterior distributions of the latent variables in a computational time that is linear in the length of the chain. Similarly, the M step involves only a minor modification of the standard M-step equations. In the case of Gaussian emission densities this involves estimating the parameters using the standard linear regression equations, discussed in Chapter 3. 


Figure 13.18



Example of an input-output hidden Markov model. In this case, both the emission probabilities and the transition probabilities depend on the values of a sequence of observations $\mathbf { u } _ { 1 } , \ldots , \mathbf { u } _ { N }$


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/67faf6a9adb031849cfa8f57305cb24c8b9c63b80381e58142959ec48b9c6ce2.jpg)


We have seen that the autoregressive HMM appears as a natural extension of the standard HMM when viewed as a graphical model. In fact the probabilistic graphical modelling viewpoint motivates a plethora of different graphical structures based on the HMM. Another example is the input-output hidden Markov model (Bengio and Frasconi, 1995), in which we have a sequence of observed variables $\mathbf { u } _ { 1 } , \ldots , \mathbf { u } _ { N }$ , in addition to the output variables $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ , whose values influence either the distribution of latent variables or output variables, or both. An example is shown in Figure 13.18. This extends the HMM framework to the domain of supervised learning for sequential data. It is again easy to show, through the use of the d-separation criterion, that the Markov property (13.5) for the chain of latent variables still holds. To verify this, simply note that there is only one path from node $\mathbf { z } _ { n - 1 }$ to node $\mathbf { z } _ { n + 1 }$ and this is head-to-tail with respect to the observed node $\mathbf { z } _ { n }$ . This conditional independence property again allows the formulation of a computationally efficient learning algorithm. In particular, we can determine the parameters $\pmb \theta$ of the model by maximizing the likelihood function $L ( \pmb \theta ) = p ( \mathbf { X } | \mathbf { U } , \mathbf { \bar { \theta } } )$ where U is a matrix whose rows are given by ${ \mathbf u } _ { n } ^ { \mathrm { T } }$ . As a consequence of the conditional independence property (13.5) this likelihood function can be maximized efficiently using an EM algorithm in which the E step involves forward and backward recursions. 

Another variant of the HMM worthy of mention is thefactorial hidden Markov model (Ghahramani and Jordan, 1997), in which there are multiple independent 

A factorial hidden Markov model comprising two Markov chains of latent variables. For continuous observed variables x, one possible choice of emission model is a linear-Gaussian density in which the mean of the Gaussian is a linear combination of the states of the corresponding latent variables. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/ee26607ef10a8acf3f0f4dfa47d5289ca1a4c6f89f4eace76c6b2cfef2bd72b7.jpg)


Markov chains of latent variables, and the distribution of the observed variable at a given time step is conditional on the states of all of the corresponding latent variables at that same time step. Figure 13.19 shows the corresponding graphical model. The motivation for considering factorial HMM can be seen by noting that in order to represent, say, 10 bits of information at a given time step, a standard HMM would need $K = 2 ^ { 1 0 } = 1 0 2 4$ latent states, whereas a factorial HMM could make use of 10 binary latent chains. The primary disadvantage of factorial HMMs, however, lies in the additional complexity of training them. The M step for the factorial HMM model is straightforward. However, observation of the x variables introduces dependencies between the latent chains, leading to difficulties with the E step. This can be seen by noting that in Figure 13.19, the variables $\mathbf { z } _ { n } ^ { ( 1 ) }$ and $\mathbf { z } _ { n } ^ { ( 2 ) }$ are connected by a path which is head-to-head at node ${ \bf x } _ { n }$ and hence they are not d-separated. The exact E step for this model does not correspond to running forward and backward recursions along the M Markov chains independently. This is confirmed by noting that the key conditional independence property (13.5) is not satisfied for the individual Markov chains in the factorial HMM model, as is shown using d-separation in Figure 13.20. Now suppose that there are M chains of hidden nodes and for simplicity suppose that all latent variables have the same number K of states. Then one approach would be to note that there are $K ^ { M }$ combinations of latent variables at a given time step 

Example of a path, highlighted in green, which is head-to-head at the observed nodes $\mathbf x _ { n - 1 }$ and $\mathbf { x } _ { n + 1 }$ , and head-to-tail at the unobserved nodes $ { \mathbf { z } } _ { n - 1 } ^ { ( 2 ) } , \  { \mathbf { z } } _ { n } ^ { ( 2 ) }$ and $\mathbf { z } _ { n + 1 } ^ { ( 2 ) }$ Thus the path is not blocked and so the conditional independence property (13.5) does not hold for the individual latent chains of the factorial HMM model. As a consequence, there is no efficient exact E step for this model. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/469507628e80c309203e599d7b263e532297d286e0373d27b3ae842c93b523bc.jpg)


and so we can transform the model into an equivalent standard HMM having a single chain of latent variables each of which has $\hat { K } ^ { M }$ latent states. We can then run the standard forward-backward recursions in the E step. This has computational complexity $O ( N K ^ { 2 M } )$ that is exponential in the number M of latent chains and so will be intractable for anything other than small values of M. One solution would be to use sampling methods (discussed in Chapter 11). As an elegant deterministic alternative, Ghahramani and Jordan (1997) exploited variational inference techniques to obtain a tractable algorithm for approximate inference. This can be done using a simple variational posterior distribution that is fully factorized with respect to the latent variables, or alternatively by using a more powerful approach in which the variational distribution is described by independent Markov chains corresponding to the chains of latent variables in the original model. In the latter case, the variational inference algorithms involves running independent forward and backward recursions along each chain, which is computationally efficient and yet is also able to capture correlations between variables within the same chain. 

Clearly, there are many possible probabilistic structures that can be constructed according to the needs of particular applications. Graphical models provide a general technique for motivating, describing, and analysing such structures, and variational methods provide a powerful framework for performing inference in those models for which exact solution is intractable. 

## 13.3. Linear Dynamical Systems

In order to motivate the concept of linear dynamical systems, let us consider the following simple problem, which often arises in practical settings. Suppose we wish to measure the value of an unknown quantity z using a noisy sensor that returns a observation x representing the value of z plus zero-mean Gaussian noise. Given a single measurement, our best guess for z is to assume that $\textbf { z } = \textbf { x }$ . However, we can improve our estimate for z by taking lots of measurements and averaging them, because the random noise terms will tend to cancel each other. Now let’s make the situation more complicated by assuming that we wish to measure a quantity z that is changing over time. We can take regular measurements of x so that at some point in time we have obtained $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ and we wish to find the corresponding values ${ \bf z } _ { 1 } , \ldots , { \bf x } _ { N }$ . If we simply average the measurements, the error due to random noise will be reduced, but unfortunately we will just obtain a single averaged estimate, in which we have averaged over the changing value of z, thereby introducing a new source of error. 

Intuitively, we could imagine doing a bit better as follows. To estimate the value of $\mathbf { z } _ { N }$ , we take only the most recent few measurements, say ${ \bf x } _ { N - L } , \ldots , { \bf x } _ { N }$ and just average these. If z is changing slowly, and the random noise level in the sensor is high, it would make sense to choose a relatively long window of observations to average. Conversely, if the signal is changing quickly, and the noise levels are small, we might be better just to use $\mathbf { x } _ { N }$ directly as our estimate of $\mathbf { z } _ { N }$ . Perhaps we could do even better if we take a weighted average, in which more recent measurements make a greater contribution than less recent ones. 

Although this sort of intuitive argument seems plausible, it does not tell us how to form a weighted average, and any sort of hand-crafted weighing is hardly likely to be optimal. Fortunately, we can address problems such as this much more systematically by defining a probabilistic model that captures the time evolution and measurement processes and then applying the inference and learning methods developed in earlier chapters. Here we shall focus on a widely used model known as a linear dynamical system. 

As we have seen, the HMM corresponds to the state space model shown in Figure 13.5 in which the latent variables are discrete but with arbitrary emission probability distributions. This graph of course describes a much broader class of probability distributions, all of which factorize according to (13.6). We now consider extensions to other distributions for the latent variables. In particular, we consider continuous latent variables in which the summations of the sum-product algorithm become integrals. The general form of the inference algorithms will, however, be the same as for the hidden Markov model. It is interesting to note that, historically, hidden Markov models and linear dynamical systems were developed independently. Once they are both expressed as graphical models, however, the deep relationship between them immediately becomes apparent. 

One key requirement is that we retain an efficient algorithm for inference which is linear in the length of the chain. This requires that, for instance, when we take a quantity $\widehat { \alpha } ( \mathbf { z } _ { n - 1 } )$ , representing the posterior probability of $\mathbf { z } _ { n }$ given observations $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n }$ , and multiply by the transition probability $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ and the emission probability $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ and then marginalize over $\mathbf { z } _ { n - 1 }$ , we obtain a distribution over $\mathbf { z } _ { n }$ that is of the same functional form as that over $\widehat { \alpha } ( \mathbf { z } _ { n - 1 } )$ That is to say, the distribution must not become more complex at each stage, but must only change in its parameter values. Not surprisingly, the only distributions that have this property of being closed under multiplication are those belonging to the exponential family. 

Here we consider the most important example from a practical perspective, which is the Gaussian. In particular, we consider a linear-Gaussian state space model so that the latent variables $\left\{ \mathbf { z } _ { n } \right\}$ , as well as the observed variables $\left\{ \mathbf { x } _ { n } \right\}$ , are multivariate Gaussian distributions whose means are linear functions of the states of their parents in the graph. We have seen that a directed graph of linear-Gaussian units is equivalent to a joint Gaussian distribution over all of the variables. Furthermore, marginals such as $\widehat { \alpha } ( \mathbf { z } _ { n } )$ are also Gaussian, so that the functional form of the messages is preserved and we will obtain an efficient inference algorithm. By contrast, suppose that the emission densities $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ comprise a mixture of K Gaussians each of which has a mean that is linear in $\mathbf { z } _ { n }$ . Then even if $\widehat { \alpha } ( \mathbf { z } _ { 1 } )$ is Gaussian, the quantity $\widehat { \alpha } ( \mathbf { z } _ { 2 } )$ will be a mixture of K Gaussians, $\widehat { \alpha } ( { \bf z } _ { 3 } )$ will be a mixture of $K ^ { 2 }$ Gaussians, and so on, and exact inference will not be of practical value. 

We have seen that the hidden Markov model can be viewed as an extension of the mixture models of Chapter 9 to allow for sequential correlations in the data. In a similar way, we can view the linear dynamical system as a generalization of the continuous latent variable models of Chapter 12 such as probabilistic PCA and factor analysis. Each pair of nodes $\left\{ \mathbf { z } _ { n } , \mathbf { x } _ { n } \right\}$ represents a linear-Gaussian latent variable model for that particular observation. However, the latent variables $\left\{ { { \bf { z } } _ { n } } \right\}$ are no longer treated as independent but now form a Markov chain. 

Because the model is represented by a tree-structured directed graph, inference problems can be solved efficiently using the sum-product algorithm. The forward recursions, analogous to the α messages of the hidden Markov model, are known as the Kalman filter equations (Kalman, 1960; Zarchan and Musoff, 2005), and the backward recursions, analogous to the $\beta$ messages, are known as the Kalman smoother equations, or the Rauch-Tung-Striebel (RTS) equations (Rauch et al., 1965). The Kalman filter is widely used in many real-time tracking applications. 

Because the linear dynamical system is a linear-Gaussian model, the joint distribution over all variables, as well as all marginals and conditionals, will be Gaussian. It follows that the sequence of individually most probable latent variable values is the same as the most probable latent sequence. There is thus no need to consider the analogue of the Viterbi algorithm for the linear dynamical system. 

Because the model has linear-Gaussian conditional distributions, we can write the transition and emission distributions in the general form 

$$
{p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1})} = {\mathcal {N} (\mathbf {z} _ {n} | \mathbf {A z} _ {n - 1}, \boldsymbol {\Gamma})}\tag{13.75}
$$

$$
{p (\mathbf {x} _ {n} | \mathbf {z} _ {n})} = {\mathcal {N} (\mathbf {x} _ {n} | \mathbf {C z} _ {n}, \boldsymbol {\Sigma}).}\tag{13.76}
$$

The initial latent variable also has a Gaussian distribution which we write as 

$$
p (\mathbf {z} _ {1}) = \mathcal {N} (\mathbf {z} _ {1} | \boldsymbol {\mu} _ {0}, \mathbf {V} _ {0}).\tag{13.77}
$$

Note that in order to simplify the notation, we have omitted additive constant terms from the means of the Gaussians. In fact, it is straightforward to include them if desired. Traditionally, these distributions are more commonly expressed in an equivalent form in terms of noisy linear equations given by 

$$
{\bf z} _ {n} = {\bf A} {\bf z} _ {n - 1} + {\bf w} _ {n}\tag{13.78}
$$

$$
{\mathbf {x} _ {n}} = {\mathbf {C z} _ {n} + \mathbf {v} _ {n}}\tag{13.79}
$$

$$
{\bf z} _ {1} = {\pmb \mu} _ {0} + {\bf u}\tag{13.80}
$$

where the noise terms have the distributions 

$$
\mathbf {w} \sim \mathcal {N} (\mathbf {w} | \mathbf {0}, \boldsymbol {\Gamma})\tag{13.81}
$$

$$
\mathbf {v} \sim \mathcal {N} (\mathbf {v} | \mathbf {0}, \boldsymbol {\Sigma})\tag{13.82}
$$

$$
\mathbf {u} \sim \mathcal {N} (\mathbf {u} | \mathbf {0}, \mathbf {V} _ {0}).\tag{13.83}
$$

The parameters of the model, denoted by $\pmb \theta = \{ { \bf A } , { \bf r } , { \bf C } , \Sigma , \mu _ { 0 } , { \bf V } _ { 0 } \}$ , can be determined using maximum likelihood through the EM algorithm. In the E step, we need to solve the inference problem of determining the local posterior marginals for the latent variables, which can be solved efficiently using the sum-product algorithm, as we discuss in the next section. 

## 13.3.1 Inference in LDS

We now turn to the problem of finding the marginal distributions for the latent variables conditional on the observation sequence. For given parameter settings, we also wish to make predictions of the next latent state $\mathbf { z } _ { n }$ and of the next observation ${ \bf x } _ { n }$ conditioned on the observed data $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 }$ for use in real-time applications. These inference problems can be solved efficiently using the sum-product algorithm, which in the context of the linear dynamical system gives rise to the Kalman filter and Kalman smoother equations. 

It is worth emphasizing that because the linear dynamical system is a linear-Gaussian model, the joint distribution over all latent and observed variables is simply a Gaussian, and so in principle we could solve inference problems by using the standard results derived in previous chapters for the marginals and conditionals of a multivariate Gaussian. The role of the sum-product algorithm is to provide a more efficient way to perform such computations. 

Linear dynamical systems have the identical factorization, given by (13.6), to hidden Markov models, and are again described by the factor graphs in Figures 13.14 and 13.15. Inference algorithms therefore take precisely the same form except that summations over latent variables are replaced by integrations. We begin by considering the forward equations in which we treat $\mathbf { z } _ { N }$ as the root node, and propagate messages from the leaf node $h ( \mathbf { z } _ { 1 } )$ to the root. From (13.77), the initial message will be Gaussian, and because each of the factors is Gaussian, all subsequent messages will also be Gaussian. By convention, we shall propagate messages that are normalized marginal distributions corresponding to $p ( \mathbf { z } _ { n } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n } )$ , which we denote by 

$$
\widehat {\alpha} (\mathbf {z} _ {n}) = \mathcal {N} (\mathbf {z} _ {n} | \boldsymbol {\mu} _ {n}, \mathbf {V} _ {n}).\tag{13.84}
$$

This is precisely analogous to the propagation of scaled variables $\widehat { \alpha } ( \mathbf { z } _ { n } )$ given by (13.59) in the discrete case of the hidden Markov model, and so the recursion equation now takes the form 

$$
c _ {n} \widehat {\alpha} (\mathbf {z} _ {n}) = p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \int \widehat {\alpha} (\mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) \mathrm{d} \mathbf {z} _ {n - 1}.\tag{13.85}
$$

Substituting for the conditionals $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ and $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ , using (13.75) and (13.76), respectively, and making use of (13.84), we see that (13.85) becomes 

$$
\begin{array}{l} c _ {n} \mathcal {N} (\mathbf {z} _ {n} | \boldsymbol {\mu} _ {n}, \mathbf {V} _ {n}) = \mathcal {N} (\mathbf {x} _ {n} | \mathbf {C z} _ {n}, \boldsymbol {\Sigma}) \\ \int \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A z} _ {n - 1}, \boldsymbol {\Gamma}) \mathcal {N} (\mathbf {z} _ {n - 1} | \boldsymbol {\mu} _ {n - 1}, \mathbf {V} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n - 1}. \end{array}\tag{13.86}
$$

Here we are supposing that $\pmb { \mu } _ { n - 1 }$ and ${ \bf V } _ { n - 1 }$ are known, and by evaluating the integral in (13.86), we wish to determine values for $\pmb { \mu } _ { n }$ and $\mathbf { V } _ { n }$ . The integral is easily evaluated by making use of the result (2.115), from which it follows that 

$$
\begin{array}{c} \int \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A} \mathbf {z} _ {n - 1}, \boldsymbol {\Gamma}) \mathcal {N} (\mathbf {z} _ {n - 1} | \boldsymbol {\mu} _ {n - 1}, \mathbf {V} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n - 1} \\ = \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A} \boldsymbol {\mu} _ {n - 1}, \mathbf {P} _ {n - 1}) \end{array}\tag{13.87}
$$

where we have defined 

$$
\mathbf {P} _ {n - 1} = \mathbf {A V} _ {n - 1} \mathbf {A} ^ {\mathrm{T}} + \boldsymbol {\Gamma}.\tag{13.88}
$$

We can now combine this result with the first factor on the right-hand side of (13.86) by making use of (2.115) and (2.116) to give 

$$
{\boldsymbol {\mu} _ {n}} = {\mathbf {A} \boldsymbol {\mu} _ {n - 1} + \mathbf {K} _ {n} (\mathbf {x} _ {n} - \mathbf {C A} \boldsymbol {\mu} _ {n - 1})}\tag{13.89}
$$

$$
{\mathbf {V} _ {n}} = {(\mathbf {I} - \mathbf {K} _ {n} \mathbf {C}) \mathbf {P} _ {n - 1}}\tag{13.90}
$$

$$
{c _ {n}} = {\mathcal {N} (\mathbf {x} _ {n} | \mathbf {C A} \pmb {\mu} _ {n - 1}, \mathbf {C P} _ {n - 1} \mathbf {C} ^ {\mathrm{T}} + \pmb {\Sigma}).}\tag{13.91}
$$

Here we have made use of the matrix inverse identities (C.5) and (C.7) and also defined the Kalman gain matrix 

$$
\mathbf {K} _ {n} = \mathbf {P} _ {n - 1} \mathbf {C} ^ {\mathrm{T}} \left(\mathbf {C P} _ {n - 1} \mathbf {C} ^ {\mathrm{T}} + \boldsymbol {\Sigma}\right) ^ {- 1}.\tag{13.92}
$$

Thus, given the values of $\pmb { \mu } _ { n - 1 }$ and ${ \bf V } _ { n - 1 }$ , together with the new observation $\mathbf { x } _ { n } .$ we can evaluate the Gaussian marginal for $\mathbf { z } _ { n }$ having mean $\pmb { \mu } _ { n }$ and covariance $\mathbf { V } _ { n }$ as well as the normalization coefficient $c _ { n }$ . 

The initial conditions for these recursion equations are obtained from 

$$
c _ {1} \widehat {\alpha} (\mathbf {z} _ {1}) = p (\mathbf {z} _ {1}) p (\mathbf {x} _ {1} | \mathbf {z} _ {1}).\tag{13.93}
$$

Because $p ( \mathbf { z } _ { 1 } )$ is given by (13.77), and $p ( \mathbf { x } _ { 1 } | \mathbf { z } _ { 1 } )$ is given by (13.76), we can again make use of (2.115) to calculate $c _ { 1 }$ and (2.116) to calculate $\pmb { \mu } _ { 1 }$ and $\mathbf { V } _ { 1 }$ giving 

$$
\boldsymbol {\mu} _ {1} = \boldsymbol {\mu} _ {0} + \mathbf {K} _ {1} (\mathbf {x} _ {1} - \mathbf {C} \boldsymbol {\mu} _ {0})\tag{13.94}
$$

$$
\mathbf {V} _ {1} = (\mathbf {I} - \mathbf {K} _ {1} \mathbf {C}) \mathbf {V} _ {0}\tag{13.95}
$$

$$
{c _ {1}} = {\mathcal {N} (\mathbf {x} _ {1} | \mathbf {C} \pmb {\mu} _ {0}, \mathbf {C V} _ {0} \mathbf {C} ^ {\mathrm{T}} + \pmb {\Sigma})}\tag{13.96}
$$

where 

$$
\mathbf {K} _ {1} = \mathbf {V} _ {0} \mathbf {C} ^ {\mathrm{T}} \left(\mathbf {C V} _ {0} \mathbf {C} ^ {\mathrm{T}} + \boldsymbol {\Sigma}\right) ^ {- 1}.\tag{13.97}
$$

Similarly, the likelihood function for the linear dynamical system is given by (13.63) in which the factors $c _ { n }$ are found using the Kalman filtering equations. 

We can interpret the steps involved in going from the posterior marginal over $\mathbf { z } _ { n - 1 }$ to the posterior marginal over $\mathbf { z } _ { n }$ as follows. In (13.89), we can view the quantity $\mathbf { A } { \boldsymbol { \mu } } _ { n - 1 }$ as the prediction of the mean over $\mathbf { z } _ { n }$ obtained by simply taking the mean over $\mathbf { z } _ { n - 1 }$ and projecting it forward one step using the transition probability matrix A. This predicted mean would give a predicted observation for ${ \bf x } _ { n }$ given by $\mathbf { C A z } _ { n - 1 }$ obtained by applying the emission probability matrix C to the predicted hidden state mean. We can view the update equation (13.89) for the mean of the hidden variable distribution as taking the predicted mean $\mathbf { A } { \boldsymbol { \mu } } _ { n - 1 }$ and then adding a correction that is proportional to the error ${ \bf x } _ { n } - { \bf C } { \bf A } { \bf z } _ { n - 1 }$ between the predicted observation and the actual observation. The coefficient of this correction is given by the Kalman gain matrix. Thus we can view the Kalman filter as a process of making successive predictions and then correcting these predictions in the light of the new observations. This is illustrated graphically in Figure 13.21. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/e13df6f58857ed98f1f0d254f8ee50f72c27d5503e3a633a7c5e72b37c043210.jpg)



Figure 13.21 The linear dynamical system can be viewed as a sequence of steps in which increasing un certainty in the state variable due to diffusion is compensated by the arrival of new data. In the left-hand plot, the blue curve shows the distribution $p ( \mathbf { z } _ { n - 1 } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 } )$ , which incorporates all the data up to step $n - 1$ The diffusion arising from the nonzero variance of the transition probability $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ gives the distribution $p ( \mathbf { z } _ { n } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 } )$ , shown in red in the centre plot. Note that this is broader and shifted relative to the blue curve (which is shown dashed in the centre plot for comparison). The next data observation ${ \bf x } _ { n }$ contributes through the emission density $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ , which is shown as a function of $\mathbf { z } _ { n }$ in green on the right-hand plot. Note that this is not a density with respect to $\mathbf { z } _ { n }$ and so is not normalized to one. Inclusion of this new data point leads to a revised distribution $p ( \mathbf { z } _ { n } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n } )$ for the state density shown in blue. We see that observation of the data has shifted and narrowed the distribution compared to $p ( \mathbf { z } _ { n } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 } )$ (which is shown in dashed in the right-hand plot for comparison).


If we consider a situation in which the measurement noise is small compared to the rate at which the latent variable is evolving, then we find that the posterior distribution for $\mathbf { z } _ { n }$ depends only on the current measurement ${ \bf x } _ { n }$ , in accordance with the intuition from our simple example at the start of the section. Similarly, if the latent variable is evolving slowly relative to the observation noise level, we find that the posterior mean for $\mathbf { z } _ { n }$ is obtained by averaging all of the measurements obtained up to that time. 

Exercise 13.27 

Exercise 13.28 

One of the most important applications of the Kalman filter is to tracking, and this is illustrated using a simple example of an object moving in two dimensions in Figure 13.22. 

So far, we have solved the inference problem of finding the posterior marginal for a node $\mathbf { z } _ { n }$ given observations from $\mathbf { x } _ { 1 }$ up to ${ \bf x } _ { n }$ . Next we turn to the problem of finding the marginal for a node $\mathbf { z } _ { n }$ given all observations $\mathbf { x } _ { 1 }$ to $\mathbf { x } _ { N }$ . For temporal data, this corresponds to the inclusion of future as well as past observations. Although this cannot be used for real-time prediction, it plays a key role in learning the parameters of the model. By analogy with the hidden Markov model, this problem can be solved by propagating messages from node $\mathbf { x } _ { N }$ back to node $\mathbf { x } _ { 1 }$ and combining this information with that obtained during the forward message passing stage used to compute the $\widehat { \alpha } ( \mathbf { z } _ { n } )$ 

In the LDS literature, it is usual to formulate this backward recursion in terms of $\widetilde { \gamma } ( \mathbf { z } _ { n } ) = \widehat { \alpha } ( \mathbf { z } _ { n } ) \widehat { \beta } ( \mathbf { z } _ { n } )$ rather than in terms of $\widehat { \beta } ( \mathbf { z } _ { n } )$ . Because $\gamma ( \mathbf { z } _ { n } )$ must also be Gaussian, we write it in the form 

$$
\gamma (\mathbf {z} _ {n}) = \widehat {\alpha} (\mathbf {z} _ {n}) \widehat {\beta} (\mathbf {z} _ {n}) = \mathcal {N} (\mathbf {z} _ {n} | \widehat {\boldsymbol {\mu}} _ {n}, \widehat {\mathbf {V}} _ {n}).\tag{13.98}
$$

To derive the required recursion, we start from the backward recursion (13.62) for 

An illustration of a linear dynamical system being used to track a moving object. The blue points indicate the true positions of the object in a two-dimensional space at successive time steps, the green points denote noisy measurements of the positions, and the red crosses indicate the means of the inferred posterior distributions of the positions obtained by running the Kalman filtering equations. The covariances of the inferred positions are indicated by the red ellipses, which correspond to contours having one standard deviation. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/b4d49f19411074b338e0ffb58484624950e293f6660f33cc893cb9809dd16c26.jpg)


${ \widehat { \boldsymbol { \beta } } } ( \mathbf { z } _ { n } )$ , which, for continuous latent variables, can be written in the form 

$$
c _ {n + 1} \widehat {\beta} (\mathbf {z} _ {n}) = \int \widehat {\beta} (\mathbf {z} _ {n + 1}) p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) \mathrm{d} \mathbf {z} _ {n + 1}.\tag{13.99}
$$

We now multiply both sides of (13.99) by $\widehat { \alpha } ( \mathbf { z } _ { n } )$ and substitute for $p ( \mathbf { x } _ { n + 1 } | \mathbf { z } _ { n + 1 } )$ and $p ( \mathbf { z } _ { n + 1 } | \mathbf { z } _ { n } )$ using (13.75) and (13.76). Then we make use of (13.89), (13.90) and (13.91), together with (13.98), and after some manipulation we obtain 

Exercise 13.29 

$$
\widehat {\boldsymbol {\mu}} _ {n} = \boldsymbol {\mu} _ {n} + \mathbf {J} _ {n} \left(\widehat {\boldsymbol {\mu}} _ {n + 1} - \mathbf {A} \boldsymbol {\mu} _ {N}\right)\tag{13.100}
$$

$$
\widehat {\mathbf {V}} _ {n} = \mathbf {V} _ {n} + \mathbf {J} _ {n} \left(\widehat {\mathbf {V}} _ {n + 1} - \mathbf {P} _ {n}\right) \mathbf {J} _ {n} ^ {\mathrm{T}}\tag{13.101}
$$

where we have defined 

$$
\mathbf {J} _ {n} = \mathbf {V} _ {n} \mathbf {A} ^ {\mathrm{T}} (\mathbf {P} _ {n}) ^ {- 1}\tag{13.102}
$$

and we have made use of $\mathbf { A V } _ { n } = \mathbf { P } _ { n } \mathbf { J } _ { n } ^ { \mathrm { T } }$ . Note that these recursions require that the forward pass be completed first so that the quantities $\pmb { \mu } _ { n }$ and $\mathbf { V } _ { n }$ will be available for the backward pass. 

For the EM algorithm, we also require the pairwise posterior marginals, which can be obtained from (13.65) in the form 

$$
\begin{array}{r l} & {\xi (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) = (c _ {n}) ^ {- 1} \widehat {\alpha} (\mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {z} _ {- 1}) \widehat {\beta} (\mathbf {z} _ {n})} \\ & {\quad = \frac {\mathcal {N} (\mathbf {z} _ {n - 1} | \boldsymbol {\mu} _ {n - 1} , \mathbf {V} _ {n - 1}) \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A z} _ {n - 1} , \boldsymbol {\Gamma}) \mathcal {N} (\mathbf {x} _ {n} | \mathbf {C z} _ {n} , \boldsymbol {\Sigma}) \mathcal {N} (\mathbf {z} _ {n} | \widehat {\boldsymbol {\mu}} _ {n} , \widehat {\mathbf {V}} _ {n})}{c _ {n} \widehat {\alpha} (\mathbf {z} _ {n})}} \end{array}\tag{13.103}
$$

Substituting for $\widehat { \alpha } ( \mathbf { z } _ { n } )$ using (13.84) and rearranging, we see that $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ is a Gaussian with mean given with components $\gamma ( \mathbf { z } _ { n - 1 } )$ and $\gamma ( \mathbf { z } _ { n } )$ , and a covariance between $\mathbf { z } _ { n }$ and $\mathbf { z } _ { n - 1 }$ given by 

Exercise 13.31 

$$
\operatorname{cov} \left[ \mathbf {z} _ {n}, \mathbf {z} _ {n - 1} \right] = \mathbf {J} _ {n - 1} \widehat {\mathbf {V}} _ {n}.\tag{13.104}
$$

## 13.3.2 Learning in LDS

So far, we have considered the inference problem for linear dynamical systems, assuming that the model parameters $\pmb \theta = \{ { \bf A } , \bar { \bf T } , { \bf C } , \Sigma , \mu _ { 0 } , { \bf V } _ { 0 } \}$ are known. Next, we consider the determination of these parameters using maximum likelihood (Ghahramani and Hinton, 1996b). Because the model has latent variables, this can be addressed using the EM algorithm, which was discussed in general terms in Chapter 9. 

We can derive the EM algorithm for the linear dynamical system as follows. Let us denote the estimated parameter values at some particular cycle of the algorithm by $\pmb { \theta } ^ { \mathrm { o l d } }$ . For these parameter values, we can run the inference algorithm to determine the posterior distribution of the latent variables $p ( \mathbf { Z } | \mathbf { X } , \theta ^ { \mathrm { o l d } } )$ , or more precisely those local posterior marginals that are required in the M step. In particular, we shall require the following expectations 

$$
\mathbb {E} \left[ \mathbf {z} _ {n} \right] = \widehat {\pmb {\mu}} _ {n}\tag{13.105}
$$

$$
{\mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right]} = {\mathbf {J} _ {n - 1} \widehat {\mathbf {V}} _ {n} + \widehat {\pmb {\mu}} _ {n} \widehat {\pmb {\mu}} _ {n - 1} ^ {\mathrm{T}}}\tag{13.106}
$$

$$
{\mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} \right]} = {\widehat {\mathbf {V}} _ {n} + \widehat {\pmb {\mu}} _ {n} \widehat {\pmb {\mu}} _ {n} ^ {\mathrm{T}}}\tag{13.107}
$$

where we have used (13.104). 

Now we consider the complete-data log likelihood function, which is obtained by taking the logarithm of (13.6) and is therefore given by 

$$
\begin{array}{r c l} \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}) & = & \ln p (\mathbf {z} _ {1} | \boldsymbol {\mu} _ {0}, \mathbf {V} _ {0}) + \sum_ {n = 2} ^ {N} \ln p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}, \mathbf {A}, \boldsymbol {\Gamma}) \\ & & + \sum_ {n = 1} ^ {N} \ln p (\mathbf {x} _ {n} | \mathbf {z} _ {n}, \mathbf {C}, \boldsymbol {\Sigma}) \end{array}\tag{13.108}
$$

in which we have made the dependence on the parameters explicit. We now take the expectation of the complete-data log likelihood with respect to the posterior distri bution $p ( { \bf Z } | { \bf X } , \boldsymbol { \theta } ^ { \mathrm { o l d } } )$ which defines the function 

$$
Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\mathrm{old}}) = \mathbb {E} _ {\mathbf {Z} | \boldsymbol {\theta} ^ {\mathrm{old}}} \left[ \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}) \right].\tag{13.109}
$$

In the M step, this function is maximized with respect to the components of $\pmb { \theta } .$ . 

Consider first the parameters $\pmb { \mu } _ { 0 }$ and $\mathbf { V } _ { 0 }$ . If we substitute for $p ( \mathbf { z } _ { 1 } | \boldsymbol { \mu } _ { 0 } , \mathbf { V } _ { 0 } )$ in (13.108) using (13.77), and then take the expectation with respect to $\mathbf { Z } ,$ , we obtain 

$$
Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = - \frac {1}{2} \ln | \mathbf {V} _ {0} | - \mathbb {E} _ {\mathbf {Z} | \pmb {\theta} ^ {\mathrm{old}}} \left[ \frac {1}{2} (\mathbf {z} _ {1} - \pmb {\mu} _ {0}) ^ {\mathrm{T}} \mathbf {V} _ {0} ^ {- 1} (\mathbf {z} _ {1} - \pmb {\mu} _ {0}) \right] + \mathrm{const}
$$

Exercise 13.32 

where all terms not dependent on $\pmb { \mu } _ { 0 }$ or $\mathbf { V } _ { 0 }$ have been absorbed into the additive constant. Maximization with respect to $\pmb { \mu } _ { 0 }$ and $\mathbf { V } _ { 0 }$ is easily performed by making use of the maximum likelihood solution for a Gaussian distribution discussed in Section 2.3.4, giving 

$$
{\pmb \mu_ {0} ^ {\mathrm{new}}} = {\mathbb {E} [ \mathbf {z} _ {1} ]}\tag{13.110}
$$

$$
{\bf V} _ {0} ^ {\mathrm{new}} = \mathbb {E} [ {\bf z} _ {1} {\bf z} _ {1} ^ {\mathrm{T}} ] - \mathbb {E} [ {\bf z} _ {1} ] \mathbb {E} [ {\bf z} _ {1} ^ {\mathrm{T}} ].\tag{13.111}
$$

Similarly, to optimize A and Γ, we substitute for $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } , \mathbf { A } , \mathbf { T } )$ in (13.108) using (13.75) giving 

$$
\begin{array}{c} Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = - \frac {N - 1}{2} \ln | \pmb {\Gamma} | \\ - \mathbb {E} _ {\mathbf {Z} | \pmb {\theta} ^ {\mathrm{old}}} \left[ \frac {1}{2} \sum_ {n = 2} ^ {N} (\mathbf {z} _ {n} - \mathbf {A z} _ {n - 1}) ^ {\mathrm{T}} \pmb {\Gamma} ^ {- 1} (\mathbf {z} _ {n} - \mathbf {A z} _ {n - 1}) \right] + \mathrm{const} \end{array}\tag{13.112}
$$

Exercise 13.33 

in which the constant comprises terms that are independent of A and Γ. Maximizing with respect to these parameters then gives 

$$
\mathbf {A} ^ {\text {new}} = \left(\sum_ {n = 2} ^ {N} \mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right]\right) \left(\sum_ {n = 2} ^ {N} \mathbb {E} \left[ \mathbf {z} _ {n - 1} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right]\right) ^ {- 1}\tag{13.113}
$$

$$
\begin{array}{r l} \boldsymbol {\Gamma} ^ {\text {new}} & = \frac {1}{N - 1} \sum_ {n = 2} ^ {N} \left\{\mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} \right] - \mathbf {A} ^ {\text {new}} \mathbb {E} \left[ \mathbf {z} _ {n - 1} \mathbf {z} _ {n} ^ {\mathrm{T}} \right] \right. \\ & \left. - \mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right] \mathbf {A} ^ {\text {new}} + \mathbf {A} ^ {\text {new}} \mathbb {E} \left[ \mathbf {z} _ {n - 1} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right] (\mathbf {A} ^ {\text {new}}) ^ {\mathrm{T}} \right\}. \end{array}\tag{13.114}
$$

Note that $\mathbf { A } ^ { \mathrm { n e w } }$ must be evaluated first, and the result can then be used to determine $\mathbf { T } ^ { \mathrm { n e w } }$ 

Finally, in order to determine the new values of C and $\Sigma _ { : }$ , we substitute for $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } , \mathbf { C } , \pmb { \Sigma } )$ in (13.108) using (13.76) giving 

$$
\begin{array}{r c l} Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) & = & - \frac {N}{2} \ln | \pmb {\Sigma} | \\ & & - \mathbb {E} _ {\mathbf {Z} | \pmb {\theta} ^ {\mathrm{old}}} \left[ \frac {1}{2} \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \mathbf {C z} _ {n}) ^ {\mathrm{T}} \pmb {\Sigma} ^ {- 1} (\mathbf {x} _ {n} - \mathbf {C z} _ {n}) \right] + \mathrm{const.} \end{array}
$$

Exercise 13.34 

Maximizing with respect to C and Σ then gives 

$$
\mathbf {C} ^ {\mathrm{new}} = \left(\sum_ {n = 1} ^ {N} \mathbf {x} _ {n} \mathbb {E} \left[ \mathbf {z} _ {n} ^ {\mathrm{T}} \right]\right) \left(\sum_ {n = 1} ^ {N} \mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} \right]\right) ^ {- 1}\tag{13.115}
$$

$$
\begin{array}{r c l} \boldsymbol {\Sigma} ^ {\mathrm{new}} & = & \frac {1}{N} \sum_ {n = 1} ^ {N} \left\{\mathbf {x} _ {n} \mathbf {x} _ {n} ^ {\mathrm{T}} - \mathbf {C} ^ {\mathrm{new}} \mathbb {E} \left[ \mathbf {z} _ {n} \right] \mathbf {x} _ {n} ^ {\mathrm{T}} \right. \\ & & \left. - \mathbf {x} _ {n} \mathbb {E} \left[ \mathbf {z} _ {n} ^ {\mathrm{T}} \right] \mathbf {C} ^ {\mathrm{new}} + \mathbf {C} ^ {\mathrm{new}} \mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} \right] \mathbf {C} ^ {\mathrm{new}} \right\}. \end{array}\tag{13.116}
$$

We have approached parameter learning in the linear dynamical system using maximum likelihood. Inclusion of priors to give a MAP estimate is straightforward, and a fully Bayesian treatment can be found by applying the analytical approximation techniques discussed in Chapter 10, though a detailed treatment is precluded here due to lack of space. 

## 13.3.3 Extensions of LDS

As with the hidden Markov model, there is considerable interest in extending the basic linear dynamical system in order to increase its capabilities. Although the assumption of a linear-Gaussian model leads to efficient algorithms for inference and learning, it also implies that the marginal distribution of the observed variables is simply a Gaussian, which represents a significant limitation. One simple extension of the linear dynamical system is to use a Gaussian mixture as the initial distribution for $\mathbf { z } _ { 1 }$ . If this mixture has K components, then the forward recursion equations (13.85) will lead to a mixture of K Gaussians over each hidden variable $\mathbf { z } _ { n }$ , and so the model is again tractable. 

For many applications, the Gaussian emission density is a poor approximation. If instead we try to use a mixture of K Gaussians as the emission density, then the posterior $\widehat { \alpha } ( \mathbf { z } _ { 1 } )$ will also be a mixture of K Gaussians. However, from (13.85) the posterior $\widehat { \alpha } ( \mathbf { z } _ { 2 } )$ will comprise a mixture of $K ^ { 2 }$ Gaussians, and so on, with $\widehat { \alpha } ( \mathbf { z } _ { n } )$ being given by a mixture of $K ^ { n }$ Gaussians. Thus the number of components grows exponentially with the length of the chain, and so this model is impractical. 

More generally, introducing transition or emission models that depart from the linear-Gaussian (or other exponential family) model leads to an intractable inference problem. We can make deterministic approximations such as assumed density filtering or expectation propagation, or we can make use of sampling methods, as discussed in Section 13.3.4. One widely used approach is to make a Gaussian approximation by linearizing around the mean of the predicted distribution, which gives rise to the extended Kalmanfilter (Zarchan and Musoff, 2005). 

As with hidden Markov models, we can develop interesting extensions of the basic linear dynamical system by expanding its graphical representation. For example, the switching state space model (Ghahramani and Hinton, 1998) can be viewed as a combination of the hidden Markov model with a set of linear dynamical systems. The model has multiple Markov chains of continuous linear-Gaussian latent variables, each of which is analogous to the latent chain of the linear dynamical system discussed earlier, together with a Markov chain of discrete variables of the form used in a hidden Markov model. The output at each time step is determined by stochastically choosing one of the continuous latent chains, using the state of the discrete latent variable as a switch, and then emitting an observation from the corresponding conditional output distribution. Exact inference in this model is intractable, but variational methods lead to an efficient inference scheme involving forward-backward recursions along each of the continuous and discrete Markov chains independently. Note that, if we consider multiple chains of discrete latent variables, and use one as the switch to select from the remainder, we obtain an analogous model having only discrete latent variables known as the switching hidden Markov model. 

## 13.3.4 Particle filters

For dynamical systems which do not have a linear-Gaussian, for example, if they use a non-Gaussian emission density, we can turn to sampling methods in order to find a tractable inference algorithm. In particular, we can apply the samplingimportance-resampling formalism of Section 11.1.5 to obtain a sequential Monte Carlo algorithm known as the particle filter. 

Consider the class of distributions represented by the graphical model in Figure 13.5, and suppose we are given the observed values $\mathbf { X } _ { n } = \left( \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n } \right)$ and we wish to draw $L$ samples from the posterior distribution $p ( \mathbf { z } _ { n } | \mathbf { X } _ { n } )$ . Using Bayes’ theorem, we have 

$$
\begin{array}{r c l} \mathbb {E} [ f (\mathbf {z} _ {n}) ] & = & \int f (\mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \int f (\mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {x} _ {n}, \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \frac {\int f (\mathbf {z} _ {n}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n}}{\int p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n}} \\ & \simeq & \sum_ {l = 1} ^ {L} w _ {n} ^ {(l)} f (\mathbf {z} _ {n} ^ {(l)}) \end{array}\tag{13.117}
$$

where $\{ \mathbf { z } _ { n } ^ { ( l ) } \}$ is a set of samples drawn from $p ( \mathbf { z } _ { n } | \mathbf { X } _ { n - 1 } )$ and we have made use of the conditional independence property $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } , \mathbf { X } _ { n - 1 } ) = p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ , which follows from the graph in Figure 13.5. The sampling weights $\{ w _ { n } ^ { ( l ) } \}$ are defined by 

$$
w _ {n} ^ {(l)} = \frac {p (\mathbf {x} _ {n} | \mathbf {z} _ {n} ^ {(l)})}{\sum_ {m = 1} ^ {L} p (\mathbf {x} _ {n} | \mathbf {z} _ {n} ^ {(m)})}\tag{13.118}
$$

where the same samples are used in the numerator as in the denominator. Thus the posterior distribution $p ( \mathbf { z } _ { n } | \mathbf { x } _ { n } )$ is represented by the set of samples $\{ \mathbf { z } _ { n } ^ { ( l ) } \}$ together with the corresponding weights $\{ w _ { n } ^ { ( l ) } \}$ . Note that these weights satisfy $0 \leqslant w _ { n } ^ { ( l ) } 1$ and $\begin{array} { r } { \sum _ { l } w _ { n } ^ { ( l ) } = 1 } \end{array}$ 

Because we wish to find a sequential sampling scheme, we shall suppose that a set of samples and weights have been obtained at time step $n ,$ and that we have subsequently observed the value of $\mathbf x _ { n + 1 }$ , and we wish to find the weights and samples at time step $n + 1$ . We first sample from the distribution $p ( \mathbf { z } _ { n + 1 } | \mathbf { X } _ { n } )$ . This is straightforward since, again using Bayes’ theorem 

$$
\begin{array}{r c l} p (\mathbf {z} _ {n + 1} | \mathbf {X} _ {n}) & = & \int p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}, \mathbf {X} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \int p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \int p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {x} _ {n}, \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \frac {\int p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n}}{\int p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n}} \\ & = & \sum_ {l} w _ {n} ^ {(l)} p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n} ^ {(l)}) \end{array}\tag{13.119}
$$

where we have made use of the conditional independence properties 

$$
{p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}, \mathbf {X} _ {n})} = {p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n})}\tag{13.120}
$$

$$
{p (\mathbf {x} _ {n} | \mathbf {z} _ {n}, \mathbf {X} _ {n - 1})} = {p (\mathbf {x} _ {n} | \mathbf {z} _ {n})}\tag{13.121}
$$

which follow from the application of the d-separation criterion to the graph in Figure 13.5. The distribution given by (13.119) is a mixture distribution, and samples can be drawn by choosing a component l with probability given by the mixing coefficients $w ^ { ( l ) }$ and then drawing a sample from the corresponding component. 

In summary, we can view each step of the particle filter algorithm as comprising two stages. At time step n, we have a sample representation of the posterior distribution $p ( \mathbf { z } _ { n } | \mathbf { X } _ { n } )$ expressed as samples $\{ \mathbf { z } _ { n } ^ { ( \bar { l } ) } \}$ with corresponding weights $\{ w _ { n } ^ { ( l ) } \}$ This can be viewed as a mixture representation of the form (13.119). To obtain the corresponding representation for the next time step, we first draw L samples from the mixture distribution (13.119), and then for each sample we use the new observation $\mathbf { x } _ { n + 1 }$ to evaluate the corresponding weights $w _ { n + 1 } ^ { ( l ) } \propto p ( \mathbf { x } _ { n + 1 } | \mathbf { z } _ { n + 1 } ^ { ( l ) } )$ . This is illustrated, for the case of a single variable z, in Figure 13.23. 

The particle filtering, or sequential Monte Carlo, approach has appeared in the literature under various names including the bootstrap filter (Gordon et al., 1993), survival ofthefittest (Kanazawa et al., 1995), and the condensation algorithm (Isard and Blake, 1998). 

## Exercises

13.1 () www Use the technique of d-separation, discussed in Section 8.2, to verify that the Markov model shown in Figure 13.3 having N nodes in total satisfies the conditional independence properties (13.3) for $n = 2 , \ldots , N$ . Similarly, show that a model described by the graph in Figure 13.4 in which there are N nodes in total satisfies the conditional independence properties 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/282e2d465b5c2aef3e722394a20e7b766643a9b424cffd94371f0d97c8f1745e.jpg)



Figure 13.23 Schematic illustration of the operation of the particle filter for a one-dimensional latent space. At time step $n ,$ the posterior $p ( z _ { n } | \mathbf { x } _ { n } )$ is represented as a mixture distribution, shown schematically as circles whose sizes are proportional to the weights $w _ { n } ^ { ( l ) }$ . A set of L samples is then drawn from this distribution and the new weights $w _ { n + 1 } ^ { ( l ) }$ evaluated using $p ( \mathbf { x } _ { n + 1 } | \mathbf { z } _ { n + 1 } ^ { ( l ) } )$


$$
p (\mathbf {x} _ {n} | \mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}) = p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1}, \mathbf {x} _ {n - 2})\tag{13.122}
$$

for $n = 3 , \ldots , N .$ 

13.2 ( ) Consider the joint probability distribution (13.2) corresponding to the directed graph of Figure 13.3. Using the sum and product rules of probability, verify that this joint distribution satisfies the conditional independence property (13.3) for $n =$ $2 , \ldots , N$ Similarly, show that the second-order Markov model described by the joint distribution (13.4) satisfies the conditional independence property 

$$
p (\mathbf {x} _ {n} | \mathbf {x} _ {1}, \dots , \mathbf {x} _ {n - 1}) = p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1}, \mathbf {x} _ {n - 2})\tag{13.123}
$$

for $n = 3 , \ldots , N .$ 

13.3 () By using d-separation, show that the distribution $p ( \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } )$ of the observed data for the state space model represented by the directed graph in Figure 13.5 does not satisfy any conditional independence properties and hence does not exhibit the Markov property at any finite order. 

13.4 ( ) www Consider a hidden Markov model in which the emission densities are represented by a parametric model $p ( \mathbf { x } | \mathbf { z } , \mathbf { w } )$ , such as a linear regression model or a neural network, in which w is a vector of adaptive parameters. Describe how the parameters w can be learned from data using maximum likelihood. 

13.5 ( ) Verify the M-step equations (13.18) and (13.19) for the initial state probabilities and transition probability parameters of the hidden Markov model by maximization of the expected complete-data log likelihood function (13.17), using appropriate Lagrange multipliers to enforce the summation constraints on the components of π and A. 

13.6 () Show that if any elements of the parameters π or A for a hidden Markov model are initially set to zero, then those elements will remain zero in all subsequent updates of the EM algorithm. 

13.7 () Consider a hidden Markov model with Gaussian emission densities. Show that maximization of the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to the mean and covariance parameters of the Gaussians gives rise to the M-step equations (13.20) and (13.21). 

13.8 ( ) www For a hidden Markov model having discrete observations governed by a multinomial distribution, show that the conditional distribution of the observations given the hidden variables is given by (13.22) and the corresponding M step equations are given by (13.23). Write down the analogous equations for the conditional distribution and the M step equations for the case of a hidden Markov with multiple binary output variables each of which is governed by a Bernoulli conditional distribution. Hint: refer to Sections 2.1 and 2.2 for a discussion of the corresponding maximum likelihood solutions for i.i.d. data if required. 

13.9 ( ) www Use the d-separation criterion to verify that the conditional independence properties (13.24)–(13.31) are satisfied by the joint distribution for the hidden Markov model defined by (13.6). 

13.10 (  ) By applying the sum and product rules of probability, verify that the conditional independence properties (13.24)–(13.31) are satisfied by the joint distribution for the hidden Markov model defined by (13.6). 

13.11 ( ) Starting from the expression (8.72) for the marginal distribution over the variables of a factor in a factor graph, together with the results for the messages in the sum-product algorithm obtained in Section 13.2.3, derive the result (13.43) for the joint posterior distribution over two successive latent variables in a hidden Markov model. 

13.12 ( ) Suppose we wish to train a hidden Markov model by maximum likelihood using data that comprises R independent sequences of observations, which we denote by $\mathbf { X } ^ { ( r ) }$ where $r = 1 , \ldots , R$ Show that in the E step of the EM algorithm, we simply evaluate posterior probabilities for the latent variables by running the α and $\beta$ recursions independently for each of the sequences. Also show that in the M step, the initial probability and transition probability parameters are re-estimated using modified forms of (13.18 ) and (13.19) given by 

$$
\begin{array}{r l r} \pi_ {k} & = & \frac {\sum_ {r = 1} ^ {R} \gamma (z _ {1 k} ^ {(r)})}{\sum_ {r = 1} ^ {R} \sum_ {j = 1} ^ {K} \gamma (z _ {1 j} ^ {(r)})} \\ A _ {j k} & = & \frac {\sum_ {r = 1} ^ {R} \sum_ {n = 2} ^ {N} \xi (z _ {n - 1 , j} ^ {(r)} , z _ {n , k} ^ {(r)})}{\sum_ {r = 1} ^ {R} \sum_ {l = 1} ^ {K} \sum_ {n = 2} ^ {N} \xi (z _ {n - 1 , j} ^ {(r)} , z _ {n , l} ^ {(r)})} \end{array}\tag{13.124}
$$

(13.125) 

where, for notational convenience, we have assumed that the sequences are of the same length (the generalization to sequences of different lengths is straightforward). Similarly, show that the M-step equation for re-estimation of the means of Gaussian emission models is given by 

$$
\boldsymbol {\mu} _ {k} = \frac {\sum_ {r = 1} ^ {R} \sum_ {n = 1} ^ {N} \gamma (z _ {n k} ^ {(r)}) \mathbf {x} _ {n} ^ {(r)}}{\sum_ {r = 1} ^ {R} \sum_ {n = 1} ^ {N} \gamma (z _ {n k} ^ {(r)})}.\tag{13.126}
$$

Note that the M-step equations for other emission model parameters and distributions take an analogous form. 

13.13 ( ) www Use the definition (8.64) of the messages passed from a factor node to a variable node in a factor graph, together with the expression (13.6) for the joint distribution in a hidden Markov model, to show that the definition (13.50) of the alpha message is the same as the definition (13.34). 

13.14 ( ) Use the definition (8.67) of the messages passed from a factor node to a variable node in a factor graph, together with the expression (13.6) for the joint distribution in a hidden Markov model, to show that the definition (13.52) of the beta message is the same as the definition (13.35). 

13.15 ( ) Use the expressions (13.33) and (13.43) for the marginals in a hidden Markov model to derive the corresponding results (13.64) and (13.65) expressed in terms of re-scaled variables. 

13.16 (  ) In this exercise, we derive the forward message passing equation for the Viterbi algorithm directly from the expression (13.6) for the joint distribution. This involves maximizing over all of the hidden variables $\mathbf { z } _ { 1 } , \ldots , \mathbf { z } _ { N }$ . By taking the logarithm and then exchanging maximizations and summations, derive the recursion (13.68) where the quantities $\omega ( \mathbf { z } _ { n } )$ are defined by (13.70). Show that the initial condition for this recursion is given by (13.69). 

13.17 () www Show that the directed graph for the input-output hidden Markov model, given in Figure 13.18, can be expressed as a tree-structured factor graph of the form shown in Figure 13.15 and write down expressions for the initial factor $h ( \mathbf { z } _ { 1 } )$ and for the general factor $f _ { n } ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ where ${ \bar { 2 } } \leqslant n \leqslant N$ 

13.18 (  ) Using the result of Exercise 13.17, derive the recursion equations, including the initial conditions, for the forward-backward algorithm for the input-output hidden Markov model shown in Figure 13.18. 

13.19 () www The Kalman filter and smoother equations allow the posterior distributions over individual latent variables, conditioned on all of the observed variables, to be found efficiently for linear dynamical systems. Show that the sequence of latent variable values obtained by maximizing each of these posterior distributions individually is the same as the most probable sequence of latent values. To do this, simply note that the joint distribution of all latent and observed variables in a linear dynamical system is Gaussian, and hence all conditionals and marginals will also be Gaussian, and then make use of the result (2.98). 

13.20 ( ) www Use the result (2.115) to prove (13.87). 

13.21 ( ) Use the results (2.115) and (2.116), together with the matrix identities (C.5) and (C.7), to derive the results (13.89), (13.90), and (13.91), where the Kalman gain matrix ${ \bf K } _ { n }$ is defined by (13.92). 

13.22 ( ) www Using (13.93), together with the definitions (13.76) and (13.77) and the result (2.115), derive (13.96). 

13.23 ( ) Using (13.93), together with the definitions (13.76) and (13.77) and the result (2.116), derive (13.94), (13.95) and (13.97). 

13.24 ( ) www Consider a generalization of (13.75) and (13.76) in which we include constant terms and in the Gaussian means, so that 

$$
p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) = \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A z} _ {n - 1} + \mathbf {a}, \boldsymbol {\Gamma})\tag{13.127}
$$

$$
p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) = \mathcal {N} (\mathbf {x} _ {n} | \mathbf {C z} _ {n} + \mathbf {c}, \boldsymbol {\Sigma}).\tag{13.128}
$$

Show that this extension can be re-case in the framework discussed in this chapter by defining a state vector z with an additional component fixed at unity, and then augmenting the matrices A and C using extra columns corresponding to the parameters a and c. 

13.25 ( ) In this exercise, we show that when the Kalman filter equations are applied to independent observations, they reduce to the results given in Section 2.3 for the maximum likelihood solution for a single Gaussian distribution. Consider the problem of finding the mean $\mu$ of a single Gaussian random variable x, in which we are given a set of independent observations $\{ x _ { 1 } , \ldots , x _ { N } \}$ . To model this we can use a linear dynamical system governed by (13.75) and (13.76), with latent variables $\{ z _ { 1 } , \dots , z _ { N } \}$ in which C becomes the identity matrix and where the transition probability $\mathrm { ~ \bf ~ A ~ } = \mathrm { ~ \bf ~ 0 ~ }$ because the observations are independent. Let the parameters m<sub>0</sub> and $\mathbf { V } _ { 0 }$ of the initial state be denoted by $\mu _ { 0 }$ and $\dot { \sigma } _ { 0 } ^ { 2 }$ , respectively, and suppose that Σ becomes $\sigma ^ { 2 }$ . Write down the corresponding Kalman filter equations starting from the general results (13.89) and (13.90), together with (13.94) and (13.95). Show that these are equivalent to the results (2.141) and (2.142) obtained directly by considering independent data. 

13.26 (  ) Consider a special case of the linear dynamical system of Section 13.3 that is equivalent to probabilistic PCA, so that the transition matrix $\mathbf A = \mathbf 0$ , the covariance $\mathbf { T } = \mathbf { I }$ , and the noise covariance $\pmb { \Sigma } = \sigma ^ { 2 } \mathbf { I }$ . By making use of the matrix inversion identity (C.7) show that, if the emission density matrix C is denoted W, then the posterior distribution over the hidden states defined by (13.89) and (13.90) reduces to the result (12.42) for probabilistic PCA. 

13.27 () www Consider a linear dynamical system of the form discussed in Section 13.3 in which the amplitude of the observation noise goes to zero, so that $\mathbf { \delta E = 0 }$ Show that the posterior distribution for $\mathbf { z } _ { n }$ has mean ${ \bf x } _ { n }$ and zero variance. This accords with our intuition that if there is no noise, we should just use the current observation ${ \bf x } _ { n }$ to estimate the state variable $\mathbf { z } _ { n }$ and ignore all previous observations. 

13.28 (  ) Consider a special case of the linear dynamical system of Section 13.3 in which the state variable $\mathbf { z } _ { n }$ is constrained to be equal to the previous state variable, which corresponds to $\mathbf { A } = \mathbf { I } \operatorname { a n d } \mathbf { \Gamma } \mathbf { \Gamma } = \mathbf { 0 }$ . For simplicity, assume also that ${ \bf V } _ { 0 } \to \infty$ so that the initial conditions for z are unimportant, and the predictions are determined purely by the data. Use proof by induction to show that the posterior mean for state $\mathbf { z } _ { n }$ is determined by the average of $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n }$ This corresponds to the intuitive result that if the state variable is constant, our best estimate is obtained by averaging the observations. 

13.29 (  ) Starting from the backwards recursion equation (13.99), derive the RTS smoothing equations (13.100) and (13.101) for the Gaussian linear dynamical system. 

13.30 ( ) Starting from the result (13.65) for the pairwise posterior marginal in a state space model, derive the specific form (13.103) for the case of the Gaussian linear dynamical system. 

13.31 ( ) Starting from the result (13.103) and by substituting for $\widehat { \alpha } ( \mathbf { z } _ { n } )$ using (13.84), verify the result (13.104) for the covariance between $\mathbf { z } _ { n }$ and $\mathbf { z } _ { n - 1 }$ 

13.32 ( ) www Verify the results (13.110) and (13.111) for the M-step equations for $\pmb { \mu } _ { 0 }$ and $\mathbf { V } _ { 0 }$ in the linear dynamical system. 

13.33 ( ) Verify the results (13.113) and (13.114) for the M-step equations for A and Γ in the linear dynamical system. 

13.34 ( ) Verify the results (13.115) and (13.116) for the M-step equations for C and Σ in the linear dynamical system. 

# Combining Models

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/466839219ac4c5231e29fad7ccaaa2fd650bf5f9b91b856c72c00631c599461d.jpg)


In earlier chapters, we have explored a range of different models for solving classification and regression problems. It is often found that improved performance can be obtained by combining multiple models together in some way, instead of just using a single model in isolation. For instance, we might train L different models and then make predictions using the average of the predictions made by each model. Such combinations of models are sometimes called committees. In Section 14.2, we discuss ways to apply the committee concept in practice, and we also give some insight into why it can sometimes be an effective procedure. 

One important variant of the committee method, known as boosting, involves training multiple models in sequence in which the error function used to train a particular model depends on the performance of the previous models. This can produce substantial improvements in performance compared to the use of a single model and is discussed in Section 14.3. 

Instead of averaging the predictions of a set of models, an alternative form of model combination is to select one of the models to make the prediction, in which the choice of model is a function of the input variables. Thus different models become responsible for making predictions in different regions of input space. One widely used framework of this kind is known as a decision tree in which the selection process can be described as a sequence of binary selections corresponding to the traversal of a tree structure and is discussed in Section 14.4. In this case, the individual models are generally chosen to be very simple, and the overall flexibility of the model arises from the input-dependent selection process. Decision trees can be applied to both classification and regression problems. 

One limitation of decision trees is that the division of input space is based on hard splits in which only one model is responsible for making predictions for any given value of the input variables. The decision process can be softened by moving to a probabilistic framework for combining models, as discussed in Section 14.5. For example, if we have a set of K models for a conditional distribution $p ( t | \mathbf { x } , k )$ where x is the input variable, t is the target variable, and $k = 1 , \ldots , K$ indexes the model, then we can form a probabilistic mixture of the form 

$$
p (t | \mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} (\mathbf {x}) p (t | \mathbf {x}, k)\tag{14.1}
$$

in which $\pi _ { k } ( \mathbf { x } ) = p ( k | \mathbf { x } )$ represent the input-dependent mixing coefficients. Such models can be viewed as mixture distributions in which the component densities, as well as the mixing coefficients, are conditioned on the input variables and are known as mixtures ofexperts. They are closely related to the mixture density network model discussed in Section 5.6. 

## 14.1. Bayesian Model Averaging

It is important to distinguish between model combination methods and Bayesian model averaging, as the two are often confused. To understand the difference, consider the example of density estimation using a mixture of Gaussians in which several Gaussian components are combined probabilistically. The model contains a binary latent variable z that indicates which component of the mixture is responsible for generating the corresponding data point. Thus the model is specified in terms of a joint distribution 

$$
p (\mathbf {x}, \mathbf {z})\tag{14.2}
$$

and the corresponding density over the observed variable x is obtained by marginalizing over the latent variable 

$$
p (\mathbf {x}) = \sum_ {\mathbf {z}} p (\mathbf {x}, \mathbf {z}).\tag{14.3}
$$

In the case of our Gaussian mixture example, this leads to a distribution of the form 

$$
p (\mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k})\tag{14.4}
$$

with the usual interpretation of the symbols. This is an example of model combination. For independent, identically distributed data, we can use (14.3) to write the marginal probability of a data set $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ in the form 

$$
p (\mathbf {X}) = \prod_ {n = 1} ^ {N} p (\mathbf {x} _ {n}) = \prod_ {n = 1} ^ {N} \left[ \sum_ {\mathbf {z} _ {n}} p (\mathbf {x} _ {n}, \mathbf {z} _ {n}) \right].\tag{14.5}
$$

Thus we see that each observed data point ${ \bf x } _ { n }$ has a corresponding latent variable $\mathbf { z } _ { n }$ 

Now suppose we have several different models indexed by $h = 1 , \ldots , H$ with prior probabilities $p ( h )$ . For instance one model might be a mixture of Gaussians and another model might be a mixture of Cauchy distributions. The marginal distribution over the data set is given by 

$$
p (\mathbf {X}) = \sum_ {h = 1} ^ {H} p (\mathbf {X} | h) p (h).\tag{14.6}
$$

This is an example of Bayesian model averaging. The interpretation of this summation over h is that just one model is responsible for generating the whole data set, and the probability distribution over h simply reflects our uncertainty as to which model that is. As the size of the data set increases, this uncertainty reduces, and the posterior probabilities $p ( h | \mathbf { X } )$ become increasingly focussed on just one of the models. 

This highlights the key difference between Bayesian model averaging and model combination, because in Bayesian model averaging the whole data set is generated by a single model. By contrast, when we combine multiple models, as in (14.5), we see that different data points within the data set can potentially be generated from different values of the latent variable z and hence by different components. 

Although we have considered the marginal probability $p ( \mathbf { X } )$ , the same considerations apply for the predictive density $p ( \mathbf { x } | \mathbf { X } )$ or for conditional distributions such as $p ( \mathbf { t } | \mathbf { x } , \mathbf { X } , \mathbf { T } )$ . 

## 14.2. Committees

The simplest way to construct a committee is to average the predictions of a set of individual models. Such a procedure can be motivated from a frequentist perspective by considering the trade-off between bias and variance, which decomposes the error due to a model into the bias component that arises from differences between the model and the true function to be predicted, and the variance component that represents the sensitivity of the model to the individual data points. Recall from Figure 3.5 that when we trained multiple polynomials using the sinusoidal data, and then averaged the resulting functions, the contribution arising from the variance term tended to cancel, leading to improved predictions. When we averaged a set of low-bias models (corresponding to higher order polynomials), we obtained accurate predictions for the underlying sinusoidal function from which the data were generated. 

In practice, of course, we have only a single data set, and so we have to find a way to introduce variability between the different models within the committee. One approach is to use bootstrap data sets, discussed in Section 1.2.3. Consider a regression problem in which we are trying to predict the value of a single continuous variable, and suppose we generate M bootstrap data sets and then use each to train a separate copy $y _ { m } ( \mathbf x )$ of a predictive model where $m = 1 , \ldots , M$ . The committee prediction is given by 

$$
y _ {\mathrm{COM}} (\mathbf {x}) = \frac {1}{M} \sum_ {m = 1} ^ {M} y _ {m} (\mathbf {x}).\tag{14.7}
$$

This procedure is known as bootstrap aggregation or bagging (Breiman, 1996). 

Suppose the true regression function that we are trying to predict is given by $h ( \mathbf { x } )$ , so that the output of each of the models can be written as the true value plus an error in the form 

$$
y _ {m} (\mathbf {x}) = h (\mathbf {x}) + \epsilon_ {m} (\mathbf {x}).\tag{14.8}
$$

The average sum-of-squares error then takes the form 

$$
\mathbb {E} _ {\mathbf {x}} \left[ \left\{y _ {m} (\mathbf {x}) - h (\mathbf {x}) \right\} ^ {2} \right] = \mathbb {E} _ {\mathbf {x}} \left[ \epsilon_ {m} (\mathbf {x}) ^ {2} \right]\tag{14.9}
$$

where $\mathbb { E } _ { \mathbf { x } } [ \cdot ]$ denotes a frequentist expectation with respect to the distribution of the input vector x. The average error made by the models acting individually is therefore 

$$
E _ {\mathrm{AV}} = \frac {1}{M} \sum_ {m = 1} ^ {M} \mathbb {E} _ {\mathbf {x}} \left[ \epsilon_ {m} (\mathbf {x}) ^ {2} \right].\tag{14.10}
$$

Similarly, the expected error from the committee (14.7) is given by 

$$
\begin{array}{r c l} E _ {\mathrm{COM}} & = & \mathbb {E} _ {\mathbf {x}} \left[ \left\{\frac {1}{M} \sum_ {m = 1} ^ {M} y _ {m} (\mathbf {x}) - h (\mathbf {x}) \right\} ^ {2} \right] \\ & = & \mathbb {E} _ {\mathbf {x}} \left[ \left\{\frac {1}{M} \sum_ {m = 1} ^ {M} \epsilon_ {m} (\mathbf {x}) \right\} ^ {2} \right] \end{array}\tag{14.11}
$$

If we assume that the errors have zero mean and are uncorrelated, so that 

$$
\mathbb {E} _ {\mathbf {x}} \left[ \epsilon_ {m} (\mathbf {x}) \right] = 0\tag{14.12}
$$

$$
\mathbb {E} _ {\mathbf {x}} \left[ \epsilon_ {m} (\mathbf {x}) \epsilon_ {l} (\mathbf {x}) \right] = 0, \qquad m \neq l\tag{14.13}
$$

then we obtain 

$$
E _ {\mathrm{COM}} = \frac {1}{M} E _ {\mathrm{AV}}.\tag{14.14}
$$

This apparently dramatic result suggests that the average error of a model can be reduced by a factor of M simply by averaging M versions of the model. Unfortunately, it depends on the key assumption that the errors due to the individual models are uncorrelated. In practice, the errors are typically highly correlated, and the reduction in overall error is generally small. It can, however, be shown that the expected committee error will not exceed the expected error of the constituent models, so that $E _ { \mathrm { C O M } } \leqslant E _ { \mathrm { A V } }$ . In order to achieve more significant improvements, we turn to a more sophisticated technique for building committees, known as boosting. 

## 14.3. Boosting

Boosting is a powerful technique for combining multiple ‘base’ classifiers to produce a form of committee whose performance can be significantly better than that of any of the base classifiers. Here we describe the most widely used form of boosting algorithm called AdaBoost, short for ‘adaptive boosting’, developed by Freund and Schapire (1996). Boosting can give good results even if the base classifiers have a performance that is only slightly better than random, and hence sometimes the base classifiers are known as weak learners. Originally designed for solving classification problems, boosting can also be extended to regression (Friedman, 2001). 

The principal difference between boosting and the committee methods such as bagging discussed above, is that the base classifiers are trained in sequence, and each base classifier is trained using a weighted form of the data set in which the weighting coefficient associated with each data point depends on the performance of the previous classifiers. In particular, points that are misclassified by one of the base classifiers are given greater weight when used to train the next classifier in the sequence. Once all the classifiers have been trained, their predictions are then combined through a weighted majority voting scheme, as illustrated schematically in Figure 14.1. 

Consider a two-class classification problem, in which the training data comprises input vectors $\mathbf { x } _ { 1 } , \ldots .$ , x<sub>N</sub> along with corresponding binary target variables $t _ { 1 } , \ldots , t _ { N }$ where $t _ { n } \in \{ - 1 , 1 \}$ . Each data point is given an associated weighting parameter $w _ { n }$ , which is initially set $1 / N$ for all data points. We shall suppose that we have a procedure available for training a base classifier using weighted data to give a function $y ( \mathbf { x } ) \in \{ - 1 , 1 \}$ . At each stage of the algorithm, AdaBoost trains a new classifier using a data set in which the weighting coefficients are adjusted according to the performance of the previously trained classifier so as to give greater weight to the misclassified data points. Finally, when the desired number of base classifiers have been trained, they are combined to form a committee using coefficients that give different weight to different base classifiers. The precise form of the AdaBoost algorithm is given below. 

Schematic illustration of the boosting framework. Each base classifier $y _ { m } ( \mathbf { x } )$ is trained on a weighted form of the training set (blue arrows) in which the weights $w _ { n } ^ { ( m ) }$ depend on the performance of the previous base classifier $y _ { m - 1 } ( \mathbf { x } )$ (green arrows). Once all base classifiers have been trained, they are combined to give the final classifier $Y _ { M } ( \mathbf { x } )$ (red arrows). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/7ff9be65b1820f9c050dac763da7d9e0d4353648a949a88f406d92549a47731b.jpg)


## AdaBoost

1. Initialize the data weighting coefficients $\{ w _ { n } \}$ by setting $w _ { n } ^ { ( 1 ) } = 1 / N$ for $n = 1 , \ldots , N$ 

2. For $m = 1 , \ldots , M \colon$ 

(a) Fit a classifier $y _ { m } ( \mathbf x )$ to the training data by minimizing the weighted error function 

$$
J _ {m} = \sum_ {n = 1} ^ {N} w _ {n} ^ {(m)} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n})\tag{14.15}
$$

where $I ( y _ { m } ( \mathbf { x } _ { n } ) \mid \neq t _ { n } )$ is the indicator function and equals 1 when $y _ { m } ( \mathbf x _ { n } ) \neq t _ { n }$ and 0 otherwise. 

(b) Evaluate the quantities 

$$
\epsilon_ {m} = \frac {\sum_ {n = 1} ^ {N} w _ {n} ^ {(m)} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n})}{\sum_ {n = 1} ^ {N} w _ {n} ^ {(m)}}\tag{14.16}
$$

and then use these to evaluate 

$$
\alpha_ {m} = \ln \left\{\frac {1 - \epsilon_ {m}}{\epsilon_ {m}} \right\}.\tag{14.17}
$$

(c) Update the data weighting coefficients 

$$
w _ {n} ^ {(m + 1)} = w _ {n} ^ {(m)} \exp \left\{\alpha_ {m} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n}) \right\}\tag{14.18}
$$

3. Make predictions using the final model, which is given by 

$$
Y _ {M} (\mathbf {x}) = \operatorname{sign} \left(\sum_ {m = 1} ^ {M} \alpha_ {m} y _ {m} (\mathbf {x})\right).\tag{14.19}
$$

We see that the first base classifier $y _ { 1 } ( \mathbf x )$ is trained using weighting coefficients $w _ { n } ^ { ( 1 ) }$ that are all equal, which therefore corresponds to the usual procedure for training a single classifier. From (14.18), we see that in subsequent iterations the weighting coefficients $w _ { n } ^ { ( m ) }$ are increased for data points that are misclassified and decreased for data points that are correctly classified. Successive classifiers are therefore forced to place greater emphasis on points that have been misclassified by previous classifiers, and data points that continue to be misclassified by successive classifiers receive ever greater weight. The quantities $\epsilon _ { m }$ represent weighted measures of the error rates of each of the base classifiers on the data set. We therefore see that the weighting coefficients $\alpha _ { m }$ defined by (14.17) give greater weight to the more accurate classifiers when computing the overall output given by (14.19). 

The AdaBoost algorithm is illustrated in Figure 14.2, using a subset of 30 data points taken from the toy classification data set shown in Figure A.7. Here each base learners consists of a threshold on one of the input variables. This simple classifier corresponds to a form of decision tree known as a ‘decision stumps’, i.e., a decision tree with a single node. Thus each base learner classifies an input according to whether one of the input features exceeds some threshold and therefore simply partitions the space into two regions separated by a linear decision surface that is parallel to one of the axes. 

## 14.3.1 Minimizing exponential error

Boosting was originally motivated using statistical learning theory, leading to upper bounds on the generalization error. However, these bounds turn out to be too loose to have practical value, and the actual performance of boosting is much better than the bounds alone would suggest. Friedman et al. (2000) gave a different and very simple interpretation of boosting in terms of the sequential minimization of an exponential error function. 

Consider the exponential error function defined by 

$$
E = \sum_ {n = 1} ^ {N} \exp \left\{- t _ {n} f _ {m} (\mathbf {x} _ {n}) \right\}\tag{14.20}
$$

where $f _ { m } ( \mathbf { x } )$ is a classifier defined in terms of a linear combination of base classifiers $y _ { l } ( \mathbf x )$ of the form 

$$
f _ {m} (\mathbf {x}) = \frac {1}{2} \sum_ {l = 1} ^ {m} \alpha_ {l} y _ {l} (\mathbf {x})\tag{14.21}
$$

and $t _ { n } \in \{ - 1 , 1 \}$ are the training set target values. Our goal is to minimize E with respect to both the weighting coefficients $\alpha _ { l }$ and the parameters of the base classifiers $y _ { l } ( \mathbf x )$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/8869c20dc65cadc421e9b788a6ecb6226ef84a855b94c951309d2a62d049edf0.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/3166519348b51f4abfd83469702e7c7b488a50ec1bf303546f64ea6fcb1e2122.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/153682546ac68754d4362573f7422f66ad58c0222a414b39afe7d13c777caa68.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/ab85375379b5c911f10b9b1fcaa89eff8327eaeb0e2f4f461e5ed6f82b565f4a.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/c0d8e8a9fd395b3f62954f8eebb10989a5e4a7418fd06046f1ac6aaf9dcc50a4.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/6f9cf76f5de73dcfcdb7f42ef963fbc8bcd1b16d6e54b16c24ea8c2f21807dec.jpg)



Figure 14.2 Illustration of boosting in which the base learners consist of simple thresholds applied to one or other of the axes. Each figure shows the number m of base learners trained so far, along with the decision boundary of the most recent base learner (dashed black line) and the combined decision boundary of the ensemble (solid green line). Each data point is depicted by a circle whose radius indicates the weight assigned to that data point when training the most recently added base learner. Thus, for instance, we see that points that are misclassified by the $m = 1$ base learner are given greater weight when training the $m = 2$ base learner.


Instead of doing a global error function minimization, however, we shall suppose that the base classifiers $y _ { 1 } ( \mathbf x ) , \dots , y _ { m - 1 } ( \mathbf x )$ are fixed, as are their coefficients $\alpha _ { 1 } , \ldots , \alpha _ { m - 1 }$ , and so we are minimizing only with respect to $\alpha _ { m }$ and $y _ { m } ( \mathbf { x } )$ . Separating off the contribution from base classifier $y _ { m } ( \mathbf x )$ , we can then write the error function in the form 

$$
\begin{array}{r c l} {E} & {=} & { \sum_ {n = 1} ^ {N} \exp \left\{- t _ {n} f _ {m - 1} (\mathbf {x} _ {n}) - \frac {1}{2} t _ {n} \alpha_ {m} y _ {m} (\mathbf {x} _ {n}) \right\}} \\ & {=} & { \sum_ {n = 1} ^ {N} w _ {n} ^ {(m)} \exp \left\{- \frac {1}{2} t _ {n} \alpha_ {m} y _ {m} (\mathbf {x} _ {n}) \right\}} \end{array}\tag{14.22}
$$

where the coefficients $w _ { n } ^ { ( m ) } = \exp \{ - t _ { n } f _ { m - 1 } ( { \bf x } _ { n } ) \}$ can be viewed as constants because we are optimizing only $\alpha _ { m }$ and $y _ { m } ( \mathbf x )$ . If we denote by $\mathcal { T } _ { m }$ the set of data points that are correctly classified by $y _ { m } ( \mathbf { x } )$ , and if we denote the remaining misclassified points by $\mathcal { M } _ { m }$ , then we can in turn rewrite the error function in the 

form 

$$
\begin{array}{r c l} E & = & e ^ {- \alpha_ {m} / 2} \sum_ {n \in \mathcal {T} _ {m}} w _ {n} ^ {(m)} + e ^ {\alpha_ {m} / 2} \sum_ {n \in \mathcal {M} _ {m}} w _ {n} ^ {(m)} \\ & = & (e ^ {\alpha_ {m} / 2} - e ^ {- \alpha_ {m} / 2}) \sum_ {n = 1} ^ {N} w _ {n} ^ {(m)} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n}) + e ^ {- \alpha_ {m} / 2} \sum_ {n = 1} ^ {N} w _ {n} ^ {(m)}. \end{array}\tag{14.23}
$$

When we minimize this with respect to $y _ { m } ( \mathbf { x } )$ , we see that the second term is constant, and so this is equivalent to minimizing (14.15) because the overall multiplicative factor in front of the summation does not affect the location of the minimum. Similarly, minimizing with respect to $\alpha _ { m }$ , we obtain (14.17) in which $\epsilon _ { m }$ is defined by (14.16). 

From (14.22) we see that, having found $\alpha _ { m }$ and $y _ { m } ( \mathbf x )$ , the weights on the data points are updated using 

$$
w _ {n} ^ {(m + 1)} = w _ {n} ^ {(m)} \exp \left\{- \frac {1}{2} t _ {n} \alpha_ {m} y _ {m} (\mathbf {x} _ {n}) \right\}.\tag{14.24}
$$

Making use of the fact that 

$$
t _ {n} y _ {m} (\mathbf {x} _ {n}) = 1 - 2 I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n})\tag{14.25}
$$

we see that the weights $w _ { n } ^ { ( m ) }$ are updated at the next iteration using 

$$
w _ {n} ^ {(m + 1)} = w _ {n} ^ {(m)} \exp (- \alpha_ {m} / 2) \exp \left\{\alpha_ {m} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n}) \right\}.\tag{14.26}
$$

Because the term $\exp ( - \alpha _ { m } / 2 )$ is independent of $n _ { \colon }$ we see that it weights all data points by the same factor and so can be discarded. Thus we obtain (14.18). 

Finally, once all the base classifiers are trained, new data points are classified by evaluating the sign of the combined function defined according to (14.21). Because the factor of $1 / 2$ does not affect the sign it can be omitted, giving (14.19). 

## 14.3.2 Error functions for boosting

The exponential error function that is minimized by the AdaBoost algorithm differs from those considered in previous chapters. To gain some insight into the nature of the exponential error function, we first consider the expected error given by 

$$
\mathbb {E} _ {\mathbf {x}, t} \left[ \exp \{- t y (\mathbf {x}) \} \right] = \sum_ {t} \int \exp \{- t y (\mathbf {x}) \} p (t | \mathbf {x}) p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{14.27}
$$

If we perform a variational minimization with respect to all possible functions $y ( \mathbf x )$ we obtain 

$$
y (\mathbf {x}) = \frac {1}{2} \ln \left\{\frac {p (t = 1 | \mathbf {x})}{p (t = - 1 | \mathbf {x})} \right\}\tag{14.28}
$$


Plot of the exponential (green) and rescaled cross-entropy (red) error functions along with the hinge error (blue) used in support vector machines, and the misclassification error (black). Note that for large negative values of $\begin{array} { r } { z = \begin{array} { r } { t y ( \mathbf { x } ) } \end{array} } \end{array}$ , the cross-entropy gives a linearly increasing penalty, whereas the exponential loss gives an exponentially increasing penalty.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/622fe81cc444e6ec3dc7a66c1c0bb1da641dbe5b8d33e481b1133fa6ef677dd5.jpg)


which is half the log-odds. Thus the AdaBoost algorithm is seeking the best approximation to the log odds ratio, within the space of functions represented by the linear combination of base classifiers, subject to the constrained minimization resulting from the sequential optimization strategy. This result motivates the use of the sign function in (14.19) to arrive at the final classification decision. 

We have already seen that the minimizer $y ( \mathbf x )$ of the cross-entropy error (4.90) for two-class classification is given by the posterior class probability. In the case of a target variable $t \in \{ - 1 , 1 \}$ , we have seen that the error function is given by ln $( 1 + \exp ( - y t ) )$ . This is compared with the exponential error function in Figure 14.3, where we have divided the cross-entropy error by a constant factor ln(2) so that it passes through the point (0, 1) for ease of comparison. We see that both can be seen as continuous approximations to the ideal misclassification error function. An advantage of the exponential error is that its sequential minimization leads to the simple AdaBoost scheme. One drawback, however, is that it penalizes large negative values of $t y ( \mathbf { x } )$ much more strongly than cross-entropy. In particular, we see that for large negative values of $t y$ , the cross-entropy grows linearly with $| t y |$ whereas the exponential error function grows exponentially with $| t y |$ . Thus the exponential error function will be much less robust to outliers or misclassified data points. Another important difference between cross-entropy and the exponential error function is that the latter cannot be interpreted as the log likelihood function of any well-defined probabilistic model. Furthermore, the exponential error does not generalize to classification problems having $K > 2$ classes, again in contrast to the cross-entropy for a probabilistic model, which is easily generalized to give (4.108). 

The interpretation of boosting as the sequential optimization of an additive model under an exponential error (Friedman et al., 2000) opens the door to a wide range of boosting-like algorithms, including multiclass extensions, by altering the choice of error function. It also motivates the extension to regression problems (Friedman, 2001). If we consider a sum-of-squares error function for regression, then sequential minimization of an additive model of the form (14.21) simply involves fitting each new base classifier to the residual errors $t _ { n } - f _ { m - 1 } ( \mathbf { x } _ { n } )$ from the previous model. As we have noted, however, the sum-of-squares error is not robust to outliers, and this can be addressed by basing the boosting algorithm on the absolute deviation $\left| y - t \right|$ instead. These two error functions are compared in Figure 14.4. 


Figure 14.4 Comparison of the squared error (green) with the absolute error (red) showing how the latter places much less emphasis on large errors and hence is more robust to outliers and mislabelled data points.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/1d2297ca1ce1905bf52da03ed4aafb65ce2809e431d320136f370cb4c4e96174.jpg)


## 14.4. Tree-based Models

There are various simple, but widely used, models that work by partitioning the input space into cuboid regions, whose edges are aligned with the axes, and then assigning a simple model (for example, a constant) to each region. They can be viewed as a model combination method in which only one model is responsible for making predictions at any given point in input space. The process of selecting a specific model, given a new input x, can be described by a sequential decision making process corresponding to the traversal of a binary tree (one that splits into two branches at each node). Here we focus on a particular tree-based framework called classification and regression trees, or CART (Breiman et al., 1984), although there are many other variants going by such names as ID3 and C4.5 (Quinlan, 1986; Quinlan, 1993). 

Figure 14.5 shows an illustration of a recursive binary partitioning of the input space, along with the corresponding tree structure. In this example, the first step 


Figure 14.5 Illustration of a two-dimensional input space that has been partitioned into five regions using axis-aligned boundaries.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/10842cb30d10da6e67a660267cb3f57db8f57a6d4d37d5f1a6c10630190808d6.jpg)


Figure 14.6 Binary tree corresponding to the partitioning of input space shown in Figure 14.5. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/e0a8a28471c48f5d9a8bfa68981e7ec3ec8d33760fd3cba9cc2b2b9b46cffc89.jpg)


divides the whole of the input space into two regions according to whether $x _ { 1 } \leqslant \theta _ { 1 }$ or $x _ { 1 } > \theta _ { 1 }$ where $\theta _ { 1 }$ is a parameter of the model. This creates two subregions, each of which can then be subdivided independently. For instance, the region $x _ { 1 } \leqslant \theta _ { 1 }$ is further subdivided according to whether $x _ { 2 } \leqslant \theta _ { 2 }$ or $x _ { 2 } > \theta _ { 2 }$ , giving rise to the regions denoted A and B. The recursive subdivision can be described by the traversal of the binary tree shown in Figure 14.6. For any new input x, we determine which region it falls into by starting at the top of the tree at the root node and following a path down to a specific leaf node according to the decision criteria at each node. Note that such decision trees are not probabilistic graphical models. 

Within each region, there is a separate model to predict the target variable. For instance, in regression we might simply predict a constant over each region, or in classification we might assign each region to a specific class. A key property of treebased models, which makes them popular in fields such as medical diagnosis, for example, is that they are readily interpretable by humans because they correspond to a sequence of binary decisions applied to the individual input variables. For instance, to predict a patient’s disease, we might first ask “is their temperature greater than some threshold?”. If the answer is yes, then we might next ask “is their blood pressure less than some threshold?”. Each leaf of the tree is then associated with a specific diagnosis. 

In order to learn such a model from a training set, we have to determine the structure of the tree, including which input variable is chosen at each node to form the split criterion as well as the value of the threshold parameter $\theta _ { i }$ for the split. We also have to determine the values of the predictive variable within each region. 

Consider first a regression problem in which the goal is to predict a single target variable t from a D-dimensional vector $\mathbf x = ( x _ { 1 } , \hdots , x _ { D } ) ^ { \mathrm T }$ of input variables. The training data consists of input vectors $\left\{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \right\}$ along with the corresponding continuous labels $\{ t _ { 1 } , \ldots , t _ { N } \}$ . If the partitioning of the input space is given, and we minimize the sum-of-squares error function, then the optimal value of the predictive variable within any given region is just given by the average of the values of $t _ { n }$ for those data points that fall in that region. 

Now consider how to determine the structure of the decision tree. Even for a fixed number of nodes in the tree, the problem of determining the optimal structure (including choice of input variable for each split as well as the corresponding thresholds) to minimize the sum-of-squares error is usually computationally infeasible due to the combinatorially large number of possible solutions. Instead, a greedy optimization is generally done by starting with a single root node, corresponding to the whole input space, and then growing the tree by adding nodes one at a time. At each step there will be some number of candidate regions in input space that can be split, corresponding to the addition of a pair of leaf nodes to the existing tree. For each of these, there is a choice of which of the $D$ input variables to split, as well as the value of the threshold. The joint optimization of the choice of region to split, and the choice of input variable and threshold, can be done efficiently by exhaustive search noting that, for a given choice of split variable and threshold, the optimal choice of predictive variable is given by the local average of the data, as noted earlier. This is repeated for all possible choices of variable to be split, and the one that gives the smallest residual sum-of-squares error is retained. 

Given a greedy strategy for growing the tree, there remains the issue of when to stop adding nodes. A simple approach would be to stop when the reduction in residual error falls below some threshold. However, it is found empirically that often none of the available splits produces a significant reduction in error, and yet after several more splits a substantial error reduction is found. For this reason, it is common practice to grow a large tree, using a stopping criterion based on the number of data points associated with the leaf nodes, and then prune back the resulting tree. The pruning is based on a criterion that balances residual error against a measure of model complexity. If we denote the starting tree for pruning by $T _ { 0 }$ , then we define $T \subset T _ { 0 }$ to be a subtree of $T _ { 0 }$ if it can be obtained by pruning nodes from $T _ { 0 }$ (in other words, by collapsing internal nodes by combining the corresponding regions). Suppose the leaf nodes are indexed by $\tau = 1 , \dots , | T |$ , with leaf node $\tau$ representing a region $\mathcal { R } _ { \tau }$ of input space having $N _ { \tau }$ data points, and $| T |$ denoting the total number of leaf nodes. The optimal prediction for region $\mathcal { R } _ { \tau }$ is then given by 

$$
y _ {\tau} = \frac {1}{N _ {\tau}} \sum_ {\mathbf {x} _ {n} \in \mathcal {R} _ {\tau}} t _ {n}\tag{14.29}
$$

and the corresponding contribution to the residual sum-of-squares is then 

$$
Q _ {\tau} (T) = \sum_ {\mathbf {x} _ {n} \in \mathcal {R} _ {\tau}} \left\{t _ {n} - y _ {\tau} \right\} ^ {2}.\tag{14.30}
$$

The pruning criterion is then given by 

$$
C (T) = \sum_ {\tau = 1} ^ {| T |} Q _ {\tau} (T) + \lambda | T |\tag{14.31}
$$

The regularization parameter λ determines the trade-off between the overall residual sum-of-squares error and the complexity of the model as measured by the number $| T |$ of leaf nodes, and its value is chosen by cross-validation. 

For classification problems, the process of growing and pruning the tree is similar, except that the sum-of-squares error is replaced by a more appropriate measure of performance. If we define $p _ { \tau k }$ to be the proportion of data points in region $\mathcal { R } _ { \tau }$ assigned to class k, where $k = 1 , \ldots , K$ , then two commonly used choices are the cross-entropy 

$$
Q _ {\tau} (T) = \sum_ {k = 1} ^ {K} p _ {\tau k} \ln p _ {\tau k}\tag{14.32}
$$

and the Gini index 

$$
Q _ {\tau} (T) = \sum_ {k = 1} ^ {K} p _ {\tau k} \left(1 - p _ {\tau k}\right).\tag{14.33}
$$

These both vanish for $p _ { \tau k } = 0$ and $p _ { \tau k } = 1$ and have a maximum at $p _ { \tau k } = 0 . 5$ . They encourage the formation of regions in which a high proportion of the data points are assigned to one class. The cross entropy and the Gini index are better measures than the misclassification rate for growing the tree because they are more sensitive to the node probabilities. Also, unlike misclassification rate, they are differentiable and hence better suited to gradient based optimization methods. For subsequent pruning of the tree, the misclassification rate is generally used. 

The human interpretability of a tree model such as CART is often seen as its major strength. However, in practice it is found that the particular tree structure that is learned is very sensitive to the details of the data set, so that a small change to the training data can result in a very different set of splits (Hastie et al., 2001). 

There are other problems with tree-based methods of the kind considered in this section. One is that the splits are aligned with the axes of the feature space, which may be very suboptimal. For instance, to separate two classes whose optimal decision boundary runs at 45 degrees to the axes would need a large number of axis-parallel splits of the input space as compared to a single non-axis-aligned split. Furthermore, the splits in a decision tree are hard, so that each region of input space is associated with one, and only one, leaf node model. The last issue is particularly problematic in regression where we are typically aiming to model smooth functions, and yet the tree model produces piecewise-constant predictions with discontinuities at the split boundaries. 

## 14.5. Conditional Mixture Models

We have seen that standard decision trees are restricted by hard, axis-aligned splits of the input space. These constraints can be relaxed, at the expense of interpretability, by allowing soft, probabilistic splits that can be functions of all of the input variables, not just one of them at a time. If we also give the leaf models a probabilistic interpretation, we arrive at a fully probabilistic tree-based model called the hierarchical mixture of experts, which we consider in Section 14.5.3. 

An alternative way to motivate the hierarchical mixture of experts model is to start with a standard probabilistic mixtures of unconditional density models such as Gaussians and replace the component densities with conditional distributions. Here we consider mixtures of linear regression models (Section 14.5.1) and mixtures of logistic regression models (Section 14.5.2). In the simplest case, the mixing coefficients are independent of the input variables. If we make a further generalization to allow the mixing coefficients also to depend on the inputs then we obtain a mixture of experts model. Finally, if we allow each component in the mixture model to be itself a mixture of experts model, then we obtain a hierarchical mixture of experts. 

## 14.5.1 Mixtures of linear regression models

One of the many advantages of giving a probabilistic interpretation to the linear regression model is that it can then be used as a component in more complex probabilistic models. This can be done, for instance, by viewing the conditional distribution representing the linear regression model as a node in a directed probabilistic graph. Here we consider a simple example corresponding to a mixture of linear regression models, which represents a straightforward extension of the Gaussian mixture model discussed in Section 9.2 to the case of conditional Gaussian distributions. 

We therefore consider K linear regression models, each governed by its own weight parameter ${ \bf w } _ { k }$ . In many applications, it will be appropriate to use a common noise variance, governed by a precision parameter $\beta ,$ for all K components, and this is the case we consider here. We will once again restrict attention to a single target variable t, though the extension to multiple outputs is straightforward. If we denote the mixing coefficients by $\pi _ { k }$ , then the mixture distribution can be written 

$$
p (t | \pmb {\theta}) = \sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (t | \mathbf {w} _ {k} ^ {\mathrm{T}} \phi , \beta^ {- 1})\tag{14.34}
$$

where $\pmb \theta$ denotes the set of all adaptive parameters in the model, namely $\mathbf { W } = \{ \mathbf { w } _ { k } \}$ $\pi = \left\{ \pi _ { k } \right\}$ , and $\beta .$ The log likelihood function for this model, given a data set of observations $\{ \phi _ { n } , t _ { n } \}$ , then takes the form 

$$
\ln p (\mathbf {t} | \boldsymbol {\theta}) = \sum_ {n = 1} ^ {N} \ln \left(\sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (t _ {n} | \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}, \beta^ {- 1})\right)\tag{14.35}
$$

where ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ denotes the vector of target variables. 

In order to maximize this likelihood function, we can once again appeal to the EM algorithm, which will turn out to be a simple extension of the EM algorithm for unconditional Gaussian mixtures of Section 9.2. We can therefore build on our experience with the unconditional mixture and introduce a set ${ \bf Z } = \{ { \bf z } _ { n } \}$ of binary latent variables where $z _ { n k } \in \{ 0 , 1 \}$ in which, for each data point $n _ { \mathrm { : } }$ all of the elements $k = 1 , \ldots , K$ are zero except for a single value of 1 indicating which component of the mixture was responsible for generating that data point. The joint distribution over latent and observed variables can be represented by the graphical model shown in Figure 14.7. 

The complete-data log likelihood function then takes the form 

$$
\ln p (\mathbf {t}, \mathbf {Z} | \pmb {\theta}) = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} z _ {n k} \ln \left\{\pi_ {k} \mathcal {N} (t _ {n} | \mathbf {w} _ {k} ^ {\mathrm{T}} \phi_ {n}, \beta^ {- 1}) \right\}.\tag{14.36}
$$

Figure 14.7 Probabilistic directed graph representing a mixture of linear regression models, defined by (14.35). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/021d7175dc261d6e2e766f95f8bfc5d1c9c88b1f55a538d476648602591d502e.jpg)


The EM algorithm begins by first choosing an initial value $\theta ^ { \mathrm { o l d } }$ for the model parameters. In the E step, these parameter values are then used to evaluate the posterior probabilities, or responsibilities, of each component k for every data point n given by 

$$
\gamma_ {n k} = \mathbb {E} [ z _ {n k} ] = p (k | \boldsymbol {\phi} _ {n}, \boldsymbol {\theta} ^ {\mathrm{old}}) = \frac {\pi_ {k} \mathcal {N} (t _ {n} | \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} , \beta^ {- 1})}{\sum_ {j} \pi_ {j} \mathcal {N} (t _ {n} | \mathbf {w} _ {j} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} , \beta^ {- 1})}.\tag{14.37}
$$

The responsibilities are then used to determine the expectation, with respect to the posterior distribution $p ( \mathbf { Z } | \mathbf { t } , \theta ^ { \mathrm { o l d } } )$ , of the complete-data log likelihood, which takes the form 

$$
Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\mathrm{old}}) = \mathbb {E} _ {\mathbf {Z}} \left[ \ln p (\mathbf {t}, \mathbf {Z} | \boldsymbol {\theta}) \right] = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma_ {n k} \left\{\ln \pi_ {k} + \ln \mathcal {N} (t _ {n} | \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}, \beta^ {- 1}) \right\}.
$$

In the M step, we maximize the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to $\theta _ { ; }$ , keeping the $\gamma _ { n k }$ fixed. For the optimization with respect to the mixing coefficients $\pi _ { k }$ we need to take account of the constraint $\begin{array} { r } { \sum _ { k } \pi _ { k } = 1 } \end{array}$ , which can be done with the aid of a Lagrange multiplier, leading to an M-step re-estimation equation for $\pi _ { k }$ in the form 

Exercise 14.14 

$$
\pi_ {k} = \frac {1}{N} \sum_ {n = 1} ^ {N} \gamma_ {n k}.\tag{14.38}
$$

Note that this has exactly the same form as the corresponding result for a simple mixture of unconditional Gaussians given by (9.22). 

Next consider the maximization with respect to the parameter vector $\mathbf { w } _ { k }$ of the $k ^ { \mathrm { t h } }$ linear regression model. Substituting for the Gaussian distribution, we see that the function $\mathbf { \widetilde { \mathbf { \Gamma } } } Q ( \theta , \theta ^ { \mathrm { o l d } } )$ , as a function of the parameter vector ${ \bf w } _ { k }$ , takes the form 

$$
Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = \sum_ {n = 1} ^ {N} \gamma_ {n k} \left\{- \frac {\beta}{2} \left(t _ {n} - \mathbf {w} _ {k} ^ {\mathrm{T}} \phi_ {n}\right) ^ {2} \right\} + \mathrm{const}\tag{14.39}
$$

where the constant term includes the contributions from other weight vectors $\mathbf { w } _ { j }$ for $j \neq k$ . Note that the quantity we are maximizing is similar to the (negative of the) standard sum-of-squares error (3.12) for a single linear regression model, but with the inclusion of the responsibilities $\gamma _ { n k }$ . This represents a weighted least squares problem, in which the term corresponding to the $n ^ { \mathrm { t h } }$ data point carries a weighting coefficient given by $\beta \gamma _ { n k }$ , which could be interpreted as an effective precision for each data point. We see that each component linear regression model in the mixture, governed by its own parameter vector $\mathbf { w } _ { k }$ , is fitted separately to the whole data set in the M step, but with each data point n weighted by the responsibility $\gamma _ { n k }$ that model k takes for that data point. Setting the derivative of (14.39) with respect to ${ \bf w } _ { k }$ equal to zero gives 

$$
0 = \sum_ {n = 1} ^ {N} \gamma_ {n k} \left(t _ {n} - \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}\right) \boldsymbol {\phi} _ {n}\tag{14.40}
$$

which we can write in matrix notation as 

$$
0 = \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} _ {k} (\mathbf {t} - \boldsymbol {\Phi} \mathbf {w} _ {k})\tag{14.41}
$$

where $\mathbf { R } _ { k } = \mathrm { d i a g } ( \gamma _ { n k } )$ is a diagonal matrix of size $N \times N$ . Solving for ${ \bf w } _ { k }$ , we obtain 

$$
\mathbf {w} _ {k} = \left(\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} _ {k} \boldsymbol {\Phi}\right) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} _ {k} \mathbf {t}.\tag{14.42}
$$

This represents a set of modified normal equations corresponding to the weighted least squares problem, of the same form as (4.99) found in the context of logistic regression. Note that after each E step, the matrix ${ \bf R } _ { k }$ will change and so we will have to solve the normal equations afresh in the subsequent M step. 

Finally, we maximize $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to $\beta .$ . Keeping only terms that depend on $\beta _ { : }$ , the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ can be written 

$$
Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma_ {n k} \left\{\frac {1}{2} \ln \beta - \frac {\beta}{2} \left(t _ {n} - \mathbf {w} _ {k} ^ {\mathrm{T}} \phi_ {n}\right) ^ {2} \right\}.\tag{14.43}
$$

Setting the derivative with respect to $\beta$ equal to zero, and rearranging, we obtain the M-step equation for $\beta$ in the form 

$$
\frac {1}{\beta} = \frac {1}{N} \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma_ {n k} \left(t _ {n} - \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}\right) ^ {2}.\tag{14.44}
$$

In Figure 14.8, we illustrate this EM algorithm using the simple example of fitting a mixture of two straight lines to a data set having one input variable x and one target variable t. The predictive density (14.34) is plotted in Figure 14.9 using the converged parameter values obtained from the EM algorithm, corresponding to the right-hand plot in Figure 14.8. Also shown in this figure is the result of fitting a single linear regression model, which gives a unimodal predictive density. We see that the mixture model gives a much better representation of the data distribution, and this is reflected in the higher likelihood value. However, the mixture model also assigns significant probability mass to regions where there is no data because its predictive distribution is bimodal for all values of x. This problem can be resolved by extending the model to allow the mixture coefficients themselves to be functions of x, leading to models such as the mixture density networks discussed in Section 5.6, and hierarchical mixture of experts discussed in Section 14.5.3. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/2179035191a5170ec0fd3a03addaa62c8ff0c3bdafedcc3b24a66ab9e4a6bb6e.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/4ea0e69b21f4bf28d3ac7090e930b0dc35b1e159fe24c1b72be24bd6ec9cd36b.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/6914717d1cbbad4f0044926c3f87dd0f4c6433424a7294db6d029bbc1284ebaf.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/2c76c59fecc94de2ee8d30573f83daf801c866ab7a773370b1c118e9d776b15b.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/40f53d1d18351d06197c268cad1a178baad61d968d104c715f96e434988abc1a.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/800c4284ceb85c7ab0241917caabfe3c368e87c0d71b5cbec12ee3e384f921f9.jpg)



Figure 14.8 Example of a synthetic data set, shown by the green points, having one input variable x and one target variable t, together with a mixture of two linear regression models whose mean functions $y ( x , \mathbf { w } _ { k } )$ , where $k \in \{ 1 , 2 \}$ , are shown by the blue and red lines. The upper three plots show the initial configuration (left), the result of running 30 iterations of EM (centre), and the result after 50 iterations of EM (right). Here $\beta$ was initialized to the reciprocal of the true variance of the set of target values. The lower three plots show the corresponding responsibilities plotted as a vertical line for each data point in which the length of the blue segment gives the posterior probability of the blue line for that data point (and similarly for the red segment).


## 14.5.2 Mixtures of logistic models

Because the logistic regression model defines a conditional distribution for the target variable, given the input vector, it is straightforward to use it as the component distribution in a mixture model, thereby giving rise to a richer family of conditional distributions compared to a single logistic regression model. This example involves a straightforward combination of ideas encountered in earlier sections of the book and will help consolidate these for the reader. 

The conditional distribution of the target variable, for a probabilistic mixture of K logistic regression models, is given by 

$$
p (t | \boldsymbol {\phi}, \boldsymbol {\theta}) = \sum_ {k = 1} ^ {K} \pi_ {k} y _ {k} ^ {t} [ 1 - y _ {k} ] ^ {1 - t}\tag{14.45}
$$

where $\phi$ is the feature vector, $y _ { k } = \sigma \left( \mathbf { w } _ { k } ^ { \mathrm { T } } \phi \right)$ is the output of component $k ,$ and $\pmb \theta$ denotes the adjustable parameters namely $\{ \pi _ { k } \}$ and $\left\{ \mathbf { w } _ { k } \right\}$ 

Now suppose we are given a data set $\{ \phi _ { n } , t _ { n } \}$ . The corresponding likelihood 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/8a0514ef333992312f2625a94f34c4a09eb2ca25ea6502364a9389dae43ea559.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/62b71e48c6ef599a3dd2db38f76931ee5a0b2094faeb718f2a56ef84c796e584.jpg)



Figure 14.9 The left plot shows the predictive conditional density corresponding to the converged solution in Figure 14.8. This gives a log likelihood value of 3.0. A vertical slice through one of these plots at a particula value of x represents the corresponding conditional distribution $p ( t | x )$ , which we see is bimodal. The plot on the right shows the predictive density for a single linear regression model fitted to the same data set using maximum likelihood. This model has a smaller log likelihood of 27.6.


function is then given by 

$$
p (\mathbf {t} | \boldsymbol {\theta}) = \prod_ {n = 1} ^ {N} \left(\sum_ {k = 1} ^ {K} \pi_ {k} y _ {n k} ^ {t _ {n}} \left[ 1 - y _ {n k} \right] ^ {1 - t _ {n}}\right)\tag{14.46}
$$

where $y _ { n k } = \sigma ( \mathbf { w } _ { k } ^ { \mathrm { T } } \phi _ { n } )$ and $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . We can maximize this likelihood function iteratively by making use of the EM algorithm. This involves introducing latent variables $z _ { n k }$ that correspond to a 1-of-K coded binary indicator variable for each data point n. The complete-data likelihood function is then given by 

$$
p (\mathbf {t}, \mathbf {Z} | \boldsymbol {\theta}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} \left\{\pi_ {k} y _ {n k} ^ {t _ {n}} \left[ 1 - y _ {n k} \right] ^ {1 - t _ {n}} \right\} ^ {z _ {n k}}\tag{14.47}
$$

where Z is the matrix of latent variables with elements $z _ { n k }$ . We initialize the EM algorithm by choosing an initial value $\theta ^ { \mathrm { o l d } }$ for the model parameters. In the E step, we then use these parameter values to evaluate the posterior probabilities of the components k for each data point n, which are given by 

$$
\gamma_ {n k} = \mathbb {E} [ z _ {n k} ] = p (k | \boldsymbol {\phi} _ {n}, \pmb {\theta} ^ {\mathrm{old}}) = \frac {\pi_ {k} y _ {n k} ^ {t _ {n}} [ 1 - y _ {n k} ] ^ {1 - t _ {n}}}{\sum_ {j} \pi_ {j} y _ {n j} ^ {t _ {n}} [ 1 - y _ {n j} ] ^ {1 - t _ {n}}}.\tag{14.48}
$$

These responsibilities are then used to find the expected complete-data log likelihood as a function of θ, given by 

$$
\begin{array}{l} Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\text {old}}) = \mathbb {E} _ {\mathbf {Z}} \left[ \ln p (\mathbf {t}, \mathbf {Z} | \boldsymbol {\theta}) \right] \\ = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma_ {n k} \left\{\ln \pi_ {k} + t _ {n} \ln y _ {n k} + (1 - t _ {n}) \ln (1 - y _ {n k}) \right\}. \end{array}\tag{14.49}
$$

The M step involves maximization of this function with respect to $\theta ,$ keeping $\pmb { \theta } ^ { \mathrm { o l d } }$ and hence $\gamma _ { n k }$ , fixed. Maximization with respect to $\pi _ { k }$ can be done in the usual way, with a Lagrange multiplier to enforce the summation constraint $\textstyle \sum _ { k } \pi _ { k } = 1$ , giving the familiar result 

$$
\pi_ {k} = \frac {1}{N} \sum_ {n = 1} ^ {N} \gamma_ {n k}.\tag{14.50}
$$

To determine the $\left\{ \mathbf { w } _ { k } \right\}$ , we note that the $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ function comprises a sum over terms indexed by k each of which depends only on one of the vectors $\mathbf { w } _ { k } .$ , so that the different vectors are decoupled in the M step of the EM algorithm. In other words, the different components interact only via the responsibilities, which are fixed during the M step. Note that the M step does not have a closed-form solution and must be solved iteratively using, for instance, the iterative reweighted least squares (IRLS) algorithm. The gradient and the Hessian for the vector $\mathbf { w } _ { k }$ are given by 

$$
\nabla_ {k} Q = \sum_ {n = 1} ^ {N} \gamma_ {n k} (t _ {n} - y _ {n k}) \phi_ {n}\tag{14.51}
$$

$$
\mathbf {H} _ {k} = - \nabla_ {k} \nabla_ {k} Q = \sum_ {n = 1} ^ {N} \gamma_ {n k} y _ {n k} (1 - y _ {n k}) \phi_ {n} \phi_ {n} ^ {\mathrm{T}}\tag{14.52}
$$

where $\nabla _ { k }$ denotes the gradient with respect to ${ \bf w } _ { k }$ . For fixed $\gamma _ { n k }$ , these are independent of $\{ \mathbf { w } _ { j } \}$ for $j \neq k$ and so we can solve for each $\mathbf { w } _ { k }$ separately using the IRLS algorithm. Thus the M-step equations for component k correspond simply to fitting a single logistic regression model to a weighted data set in which data point n carries a weight $\gamma _ { n k }$ . Figure 14.10 shows an example of the mixture of logistic regression models applied to a simple classification problem. The extension of this model to a mixture of softmax models for more than two classes is straightforward. 

## 14.5.3 Mixtures of experts

In Section 14.5.1, we considered a mixture of linear regression models, and in Section 14.5.2 we discussed the analogous mixture of linear classifiers. Although these simple mixtures extend the flexibility of linear models to include more complex (e.g., multimodal) predictive distributions, they are still very limited. We can further increase the capability of such models by allowing the mixing coefficients themselves to be functions of the input variable, so that 

$$
p (\mathbf {t} | \mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} (\mathbf {x}) p _ {k} (\mathbf {t} | \mathbf {x}).\tag{14.53}
$$

This is known as a mixture of experts model (Jacobs et al., 1991) in which the mixing coefficients $\pi _ { k } ( { \bf x } )$ are known as gating functions and the individual component densities $p _ { k } ( \mathbf t | \mathbf x )$ are called experts. The notion behind the terminology is that different components can model the distribution in different regions of input space (they are ‘experts’ at making predictions in their own regions), and the gating functions determine which components are dominant in which region. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/1df7b65618d905c64c5b7eaa055851e4c88d60a3935e401ad93480a67584af79.jpg)



Figure 14.10 Illustration of a mixture of logistic regression models. The left plot shows data points drawn from two classes denoted red and blue, in which the background colour (which varies from pure red to pure blue) denotes the true probability of the class label. The centre plot shows the result of fitting a single logistic regression model using maximum likelihood, in which the background colour denotes the corresponding probability of the class label. Because the colour is a near-uniform purple, we see that the model assigns a probability of around 0.5 to each of the classes over most of input space. The right plot shows the result of fitting a mixture of two logistic regression models, which now gives much higher probability to the correct labels for many of the points in the blue class.


The gating functions $\pi _ { k } ( { \bf x } )$ must satisfy the usual constraints for mixing coefficients, namely $0 \leqslant \pi _ { k } ( \mathbf { x } ) \leqslant 1$ and $\begin{array} { r } { \sum _ { k } \pi _ { k } ( { \bf x } ) = 1 } \end{array}$ . They can therefore be represented, for example, by linear softmax models of the form (4.104) and (4.105). If the experts are also linear (regression or classification) models, then the whole model can be fitted efficiently using the EM algorithm, with iterative reweighted least squares being employed in the M step (Jordan and Jacobs, 1994). 

Such a model still has significant limitations due to the use of linear models for the gating and expert functions. A much more flexible model is obtained by using a multilevel gating function to give the hierarchical mixture of experts, or HME model (Jordan and Jacobs, 1994). To understand the structure of this model, imagine a mixture distribution in which each component in the mixture is itself a mixture distribution. For simple unconditional mixtures, this hierarchical mixture is trivially equivalent to a single flat mixture distribution. However, when the mixing coefficients are input dependent, this hierarchical model becomes nontrivial. The HME model can also be viewed as a probabilistic version of decision trees discussed in Section 14.4 and can again be trained efficiently by maximum likelihood using an EM algorithm with IRLS in the M step. A Bayesian treatment of the HME has been given by Bishop and Svensen (2003) based on variational inference.´ 

We shall not discuss the HME in detail here. However, it is worth pointing out the close connection with the mixture density network discussed in Section 5.6. The principal advantage of the mixtures of experts model is that it can be optimized by EM in which the M step for each mixture component and gating model involves a convex optimization (although the overall optimization is nonconvex). By contrast, the advantage of the mixture density network approach is that the component densities and the mixing coefficients share the hidden units of the neural network. Furthermore, in the mixture density network, the splits of the input space are further relaxed compared to the hierarchical mixture of experts in that they are not only soft, and not constrained to be axis aligned, but they can also be nonlinear. 

## Exercises

14.1 ( ) www Consider a set models of the form $p ( \mathbf { t } | \mathbf { x } , \mathbf { z } _ { h } , \pmb { \theta } _ { h } , h )$ in which is the input vector, t is the target vector, h indexes the different models, $\mathbf { z } _ { h }$ is a latent variable for model $h ,$ and $\pmb { \theta } _ { h }$ is the set of parameters for model h. Suppose the models have prior probabilities $p ( h )$ and that we are given a training set $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ and $\bar { \mathbf { T } } = \left\{ \mathbf { t } _ { 1 } , \ldots , \mathbf { t } _ { N } \right\}$ Write down the formulae needed to evaluate the predictive distribution $p ( \mathbf { t } | \mathbf { x } , \mathbf { X } , \mathbf { T } )$ in which the latent variables and the model index are marginalized out. Use these formulae to highlight the difference between Bayesian averaging of different models and the use of latent variables within a single model. 

14.2 () The expected sum-of-squares error $E _ { \mathrm { A V } }$ for a simple committee model can be defined by (14.10), and the expected error of the committee itself is given by (14.11). Assuming that the individual errors satisfy (14.12) and (14.13), derive the result (14.14). 

14.3 () www By making use of Jensen’s inequality (1.115), for the special case of the convex function $f ( x ) ~ = ~ x ^ { 2 }$ , show that the average expected sum-of-squares error $E _ { \mathrm { A V } }$ of the members of a simple committee model, given by (14.10), and the expected error $E _ { \mathrm { C O M } }$ of the committee itself, given by (14.11), satisfy 

$$
E _ {\mathrm{COM}} \leqslant E _ {\mathrm{AV}}.\tag{14.54}
$$

14.4 ( ) By making use of Jensen’s in equality (1.115), show that the result (14.54) derived in the previous exercise hods for any error function $E ( y )$ , not just sum-of squares, provided it is a convex function of $y .$ 

14.5 ( ) www Consider a committee in which we allow unequal weighting of the constituent models, so that 

$$
y _ {\mathrm{COM}} (\mathbf {x}) = \sum_ {m = 1} ^ {M} \alpha_ {m} y _ {m} (\mathbf {x}).\tag{14.55}
$$

In order to ensure that the predictions $y _ { \mathrm { C O M } } ( \mathbf { x } )$ remain within sensible limits, sup pose that we require that they be bounded at each value of x by the minimum and maximum values given by any of the members of the committee, so that 

$$
y _ {\min} (\mathbf {x}) \leqslant y _ {\operatorname{COM}} (\mathbf {x}) \leqslant y _ {\max} (\mathbf {x}).\tag{14.56}
$$

Show that a necessary and sufficient condition for this constraint is that the coefficients $\alpha _ { m }$ satisfy 

$$
\alpha_ {m} \geqslant 0, \quad \sum_ {m = 1} ^ {M} \alpha_ {m} = 1.\tag{14.57}
$$

14.6 () www By differentiating the error function (14.23) with respect to $\alpha _ { m }$ , show that the parameters $\alpha _ { m }$ in the AdaBoost algorithm are updated using (14.17) in which $\epsilon _ { m }$ is defined by (14.16). 

14.7 () By making a variational minimization of the expected exponential error function given by (14.27) with respect to all possible functions $y ( \mathbf x )$ , show that the minimizing function is given by (14.28). 

14.8 () Show that the exponential error function (14.20), which is minimized by the AdaBoost algorithm, does not correspond to the log likelihood of any well-behaved probabilistic model. This can be done by showing that the corresponding conditional distribution $p ( t | \mathbf { x } )$ cannot be correctly normalized. 

14.9 () www Show that the sequential minimization of the sum-of-squares error function for an additive model of the form (14.21) in the style of boosting simply involves fitting each new base classifier to the residual errors $t _ { n } - f _ { m - 1 } ( \mathbf { x } _ { n } )$ from the previous model. 

14.10 () Verify that if we minimize the sum-of-squares error between a set of training values $\left\{ t _ { n } \right\}$ and a single predictive value t, then the optimal solution for t is given by the mean of the $\left\{ t _ { n } \right\}$ 

14.11 ( ) Consider a data set comprising 400 data points from class $\mathcal { C } _ { 1 }$ and 400 data points from class $\mathcal { C } _ { 2 }$ . Suppose that a tree model A splits these into (300, 100) at the first leaf node and (100, 300) at the second leaf node, where $( n , m )$ denotes that n points are assigned to $\mathcal { C } _ { 1 }$ and m points are assigned to $\mathcal { C } _ { 2 }$ . Similarly, suppose that a second tree model B splits them into (200, 400) and (200, 0). Evaluate the misclassification rates for the two trees and hence show that they are equal. Similarly, evaluate the cross-entropy (14.32) and Gini index (14.33) for the two trees and show that they are both lower for tree B than for tree A. 

14.12 ( ) Extend the results of Section 14.5.1 for a mixture of linear regression models to the case of multiple target values described by a vector t. To do this, make use of the results of Section 3.1.5. 

14.13 () www Verify that the complete-data log likelihood function for the mixture of linear regression models is given by (14.36). 

14.14 () Use the technique of Lagrange multipliers (Appendix E) to show that the M-step re-estimation equation for the mixing coefficients in the mixture of linear regression models trained by maximum likelihood EM is given by (14.38). 

14.15 () www We have already noted that if we use a squared loss function in a regression problem, the corresponding optimal prediction of the target variable for a new input vector is given by the conditional mean of the predictive distribution. Show that the conditional mean for the mixture of linear regression models discussed in Section 14.5.1 is given by a linear combination of the means of each component distribution. Note that if the conditional distribution of the target data is multimodal, the conditional mean can give poor predictions. 

14.16 (  ) Extend the logistic regression mixture model of Section 14.5.2 to a mixture of softmax classifiers representing $C \geqslant 2$ classes. Write down the EM algorithm for determining the parameters of this model through maximum likelihood. 

14.17 ( ) www Consider a mixture model for a conditional distribution $p ( t | \mathbf { x } )$ of the form 

$$
p (t | \mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} \psi_ {k} (t | \mathbf {x})\tag{14.58}
$$

in which each mixture component $\psi _ { k } ( t | \mathbf x )$ is itself a mixture model. Show that this two-level hierarchical mixture is equivalent to a conventional single-level mixture model. Now suppose that the mixing coefficients in both levels of such a hierarchical model are arbitrary functions of x. Again, show that this hierarchical model is again equivalent to a single-level model with x-dependent mixing coefficients. Finally, consider the case in which the mixing coefficients at both levels of the hierarchical mixture are constrained to be linear classification (logistic or softmax) models. Show that the hierarchical mixture cannot in general be represented by a single-level mixture having linear classification models for the mixing coefficients. Hint: to do this it is sufficient to construct a single counter-example, so consider a mixture of two components in which one of those components is itself a mixture of two components, with mixing coefficients given by linear-logistic models. Show that this cannot be represented by a single-level mixture of 3 components having mixing coefficients determined by a linear-softmax model. 

# Appendix A. Data Sets

In this appendix, we give a brief introduction to the data sets used to illustrate some of the algorithms described in this book. Detailed information on file formats for these data sets, as well as the data files themselves, can be obtained from the book web site: 

http://research.microsoft.com/ cmbishop/PRML 

## Handwritten Digits

The digits data used in this book is taken from the MNIST data set (LeCun et al., 1998), which itself was constructed by modifying a subset of the much larger data set produced by NIST (the National Institute of Standards and Technology). It comprises a training set of 60, 000 examples and a test set of 10, 000 examples. Some of the data was collected from Census Bureau employees and the rest was collected from high-school children, and care was taken to ensure that the test examples were written by different individuals to the training examples. 

The original NIST data had binary (black or white) pixels. To create MNIST, these images were size normalized to fit in a 20 20 pixel box while preserving their aspect ratio. As a consequence of the anti-aliasing used to change the resolution of the images, the resulting MNIST digits are grey scale. These images were then centred in a 28 28 box. Examples of the MNIST digits are shown in Figure A.1. 

Error rates for classifying the digits range from 12% for a simple linear classifier, through 0.56% for a carefully designed support vector machine, to 0.4% for a convolutional neural network (LeCun et al., 1998). 

Figure A.1 One hundred examples of the MNIST digits chosen at random from the training set. 

7 2 4 4 9 5 9 0 6 9 0 5 9 7 3 4 9 6 9 5 7 4 0 3 3 L 7 2 7 7 4 3 5 2 4 4 6 3 5 5 6 0 4 9 8 9 3 7 64 3 0 7 0 2 7 3 2 9 7 7 6 2 7 8 4 7 3 6 3 6 9 3 4 7 6 9 

## Oil Flow

This is a synthetic data set that arose out of a project aimed at measuring noninvasively the proportions of oil, water, and gas in North Sea oil transfer pipelines (Bishop and James, 1993). It is based on the principle of dual-energy gamma densitometry. The ideas is that if a narrow beam of gamma rays is passed through the pipe, the attenuation in the intensity of the beam provides information about the density of material along its path. Thus, for instance, the beam will be attenuated more strongly by oil than by gas. 

A single attenuation measurement alone is not sufficient because there are two degrees of freedom corresponding to the fraction of oil and the fraction of water (the fraction of gas is redundant because the three fractions must add to one). To address this, two gamma beams of different energies (in other words different frequencies or wavelengths) are passed through the pipe along the same path, and the attenuation of each is measured. Because the absorbtion properties of different materials vary differently as a function of energy, measurement of the attenuations at the two energies provides two independent pieces of information. Given the known absorbtion properties of oil, water, and gas at the two energies, it is then a simple matter to calculate the average fractions of oil and water (and hence of gas) measured along the path of the gamma beams. 

There is a further complication, however, associated with the motion of the materials along the pipe. If the flow velocity is small, then the oil floats on top of the water with the gas sitting above the oil. This is known as a laminar or stratified 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/62993bdbb6bab8fef43d7abe39691ff0baaadf8db7e73f11a7d06a33c78675e4.jpg)



Stratified


Figure A.2 The three geometrical configurations of the oil, water, and gas phases used to generate the oil flow data set. For each configuration, the proportions of the three phases can vary. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/b2e0532c67b3776d8ea4c7e0743db37ffe525390c6f1c37999120ec4188b9d79.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/b26b3c9b0fedbcdde1ddf66b4bf22d70f015ce84b34a97c03e89539477d887a0.jpg)



Annular


flow configuration and is illustrated in Figure A.2. As the flow velocity is increased, more complex geometrical configurations of the oil, water, and gas can arise. For the purposes of this data set, two specific idealizations are considered. In the annular configuration the oil, water, and gas form concentric cylinders with the water around the outside and the gas in the centre, whereas in the homogeneous configuration the oil, water and gas are assumed to be intimately mixed as might occur at high flow velocities under turbulent conditions. These configurations are also illustrated in Figure A.2. 

We have seen that a single dual-energy beam gives the oil and water fractions measured along the path length, whereas we are interested in the volume fractions of oil and water. This can be addressed by using multiple dual-energy gamma densitometers whose beams pass through different regions of the pipe. For this particular data set, there are six such beams, and their spatial arrangement is shown in Figure A.3. A single observation is therefore represented by a 12-dimensional vector comprising the fractions of oil and water measured along the paths of each of the beams. We are, however, interested in obtaining the overall volume fractions of the three phases in the pipe. This is much like the classical problem of tomographic reconstruction, used in medical imaging for example, in which a two-dimensional dis-

Figure A.3 Cross section of the pipe showing the arrangement of the six beam lines, each of which comprises a single dualenergy gamma densitometer. Note that the vertical beams are asymmetrically arranged relative to the central axis (shown by the dotted line). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/d40b025a256afe3b6306508dfef3f4a7dd49f1b33223ef87251859a30fd8347b.jpg)


tribution is to be reconstructed from an number of one-dimensional averages. Here there are far fewer line measurements than in a typical tomography application. On the other hand the range of geometrical configurations is much more limited, and so the configuration, as well as the phase fractions, can be predicted with reasonable accuracy from the densitometer data. 

For safety reasons, the intensity of the gamma beams is kept relatively weak and so to obtain an accurate measurement of the attenuation, the measured beam intensity is integrated over a specific time interval. For a finite integration time, there are random fluctuations in the measured intensity due to the fact that the gamma beams comprise discrete packets of energy called photons. In practice, the integration time is chosen as a compromise between reducing the noise level (which requires a long integration time) and detecting temporal variations in the flow (which requires a short integration time). The oil flow data set is generated using realistic known values for the absorption properties of oil, water, and gas at the two gamma energies used, and with a specific choice of integration time (10 seconds) chosen as characteristic of a typical practical setup. 

Each point in the data set is generated independently using the following steps: 

1. Choose one of the three phase configurations at random with equal probability. 

2. Choose three random numbers $f _ { 1 } , f _ { 2 }$ and $f _ { 3 }$ from the uniform distribution over (0, 1) and define 

$$
f _ {\mathrm{oil}} = \frac {f _ {1}}{f _ {1} + f _ {2} + f _ {3}}, \quad f _ {\mathrm{water}} = \frac {f _ {2}}{f _ {1} + f _ {2} + f _ {3}}.\tag{A.1}
$$

This treats the three phases on an equal footing and ensures that the volume fractions add to one. 

3. For each of the six beam lines, calculate the effective path lengths through oil and water for the given phase configuration. 

4. Perturb the path lengths using the Poisson distribution based on the known beam intensities and integration time to allow for the effect of photon statistics. 

Each point in the data set comprises the 12 path length measurements, together with the fractions of oil and water and a binary label describing the phase configuration. The data set is divided into training, validation, and test sets, each of which comprises 1, 000 independent data points. Details of the data format are available from the book web site. 

In Bishop and James (1993), statistical machine learning techniques were used to predict the volume fractions and also the geometrical configuration of the phases shown in Figure A.2, from the 12-dimensional vector of measurements. The 12- dimensional observation vectors can also be used to test data visualization algorithms. 

This data set has a rich and interesting structure, as follows. For any given configuration there are two degrees of freedom corresponding to the fractions of oil and water, and so for infinite integration time the data will locally live on a twodimensional manifold. For a finite integration time, the individual data points will be perturbed away from the manifold by the photon noise. In the homogeneous phase configuration, the path lengths in oil and water are linearly related to the fractions of oil and water, and so the data points lie close to a linear manifold. For the annular configuration, the relationship between phase fraction and path length is nonlinear and so the manifold will be nonlinear. In the case of the laminar configuration the situation is even more complex because small variations in the phase fractions can cause one of the horizontal phase boundaries to move across one of the horizontal beam lines leading to a discontinuous jump in the 12-dimensional observation space. In this way, the two-dimensional nonlinear manifold for the laminar configuration is broken into six distinct segments. Note also that some of the manifolds for different phase configurations meet at specific points, for example if the pipe is filled entirely with oil, it corresponds to specific instances of the laminar, annular, and homogeneous configurations. 

## Old Faithful

Old Faithful, shown in Figure A.4, is a hydrothermal geyser in Yellowstone National Park in the state of Wyoming, U.S.A., and is a popular tourist attraction. Its name stems from the supposed regularity of its eruptions. 

The data set comprises 272 observations, each of which represents a single eruption and contains two variables corresponding to the duration in minutes of the eruption, and the time until the next eruption, also in minutes. Figure A.5 shows a plot of the time to the next eruption versus the duration of the eruptions. It can be seen that the time to the next eruption varies considerably, although knowledge of the duration of the current eruption allows it to be predicted more accurately. Note that there exist several other data sets relating to the eruptions of Old Faithful. 

## Figure A.4

The Old Faithful geyser in Yellowstone National Park. c Bruce T. Gourley www.brucegourley.com. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/bf0bb82718b3d47e26b63623fc54b672363562c23a797e9a633d21a74b16fce0.jpg)


Figure A.5 Plot of the time to the next eruption in minutes (vertical axis) versus the duration of the eruption in minutes (horizontal axis) for the Old Faithful data set. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/e233a866a945c3d7eaaf28d619c20dc229f171f118c37552d51941faa5b9c728.jpg)


## Synthetic Data

Throughout the book, we use two simple synthetic data sets to illustrate many of the algorithms. The first of these is a regression problem, based on the sinusoidal function, shown in Figure A.6. The input values $\{ x _ { n } \}$ are generated uniformly in range (0, 1), and the corresponding target values $\left\{ t _ { n } \right\}$ are obtained by first computing the corresponding values of the function sin $( 2 \pi x )$ , and then adding random noise with a Gaussian distribution having standard deviation 0.3. Various forms of this data set, having different numbers of data points, are used in the book. 

The second data set is a classification problem having two classes, with equal prior probabilities, and is shown in Figure A.7. The blue class is generated from a single Gaussian while the red class comes from a mixture of two Gaussians. Because we know the class priors and the class-conditional densities, it is straightforward to evaluate and plot the true posterior probabilities as well as the minimum misclassification-rate decision boundary, as shown in Figure A.7. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/afd73c875cdccd5d3f6f959977032aca0ce279033e4962d23a9e6a737c7ec89c.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/058c80f65a5cdbcdb27ee8403201102fdf9ded6f112bb7cbd025921b601cb5d3.jpg)



Figure A.6 The left-hand plot shows the synthetic regression data set along with the underlying sinusoidal function from which the data points were generated. The right-hand plot shows the true conditional distribution $p ( t | x )$ from which the labels are generated, in which the green curve denotes the mean, and the shaded region spans one standard deviation on each side of the mean.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/f9348c6bb3426a8f1bc6d63fb8b026bb5bc6cd9c7aeea26f59e907885d1c0a92.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/2ee39eebfde1caa5607a84f603bfb30b5b155544fc4d7efe3ef86132d3e0bad1.jpg)



Figure A.7 The left plot shows the synthetic classification data set with data from the two classes shown in red and blue. On the right is a plot of the true posterior probabilities, shown on a colour scale going from pure red denoting probability of the red class is 1 to pure blue denoting probability of the red class is 0. Because these probabilities are known, the optimal decision boundary for minimizing the misclassification rate (which corresponds to the contour along which the posterior probabilities for each class equal 0.5) can be evaluated and is shown by the green curve. This decision boundary is also plotted on the left-hand figure.


## Appendix B. Probability Distributions

In this appendix, we summarize the main properties of some of the most widely used probability distributions, and for each distribution we list some key statistics such as the expectation $\mathbb { E } [ \mathbf { x } ]$ , the variance (or covariance), the mode, and the entropy H[x]. All of these distributions are members of the exponential family and are widely used as building blocks for more sophisticated probabilistic models. 

## Bernoulli

This is the distribution for a single binary variable $x \ \in \ \{ 0 , 1 \}$ representing, for example, the result of flipping a coin. It is governed by a single continuous parameter $\mu \in [ 0 , 1 ]$ that represents the probability of $x = 1$ 

$$
\mathrm{Bern} (x | \mu) = \mu^ {x} (1 - \mu) ^ {1 - x}\tag{B.1}
$$

$$
\mathbb {E} [ x ] = \mu\tag{B.2}
$$

$$
\operatorname{var} [ x ] = \mu (1 - \mu)\tag{B.3}
$$

$$
\operatorname{mode} [ x ] = \left\{ \begin{array}{l l} 1 & \text { if } \mu \geqslant 0. 5, \\ 0 & \text { otherwise } \end{array} \right.\tag{B.4}
$$

$$
\mathrm{H} [ x ] = - \mu \ln \mu - (1 - \mu) \ln (1 - \mu).\tag{B.5}
$$

The Bernoulli is a special case of the binomial distribution for the case of a single observation. Its conjugate prior for $\mu$ is the beta distribution. 

## Beta

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/e1ba74523fa21fa720bf1952840bf17f046ee726809e1b4eee5ca196f303524b.jpg)


This is a distribution over a continuous variable $\mu \in [ 0 , 1 ]$ , which is often used to represent the probability for some binary event. It is governed by two parameters a and b that are constrained by $a > 0$ and $b > 0$ to ensure that the distribution can be normalized. 

$$
\operatorname{Beta} (\mu | a, b) = \frac {\Gamma (a + b)}{\Gamma (a) \Gamma (b)} \mu^ {a - 1} (1 - \mu) ^ {b - 1}\tag{B.6}
$$

$$
\mathbb {E} [ \mu ] = \frac {a}{a + b}\tag{B.7}
$$

$$
\operatorname{var} [ \mu ] = \frac {a b}{(a + b) ^ {2} (a + b + 1)}\tag{B.8}
$$

$$
\mathrm{mode} [ \mu ] = \frac {a - 1}{a + b - 2}.\tag{B.9}
$$

The beta is the conjugate prior for the Bernoulli distribution, for which a and b can be interpreted as the effective prior number of observations of $x = 1$ and $x = 0$ respectively. Its density is finite if $a \geqslant 1$ and $b \geqslant 1$ , otherwise there is a singularity at $\mu = 0$ and/or $\mu = 1$ . For $a = b = 1$ , it reduces to a uniform distribution. The beta distribution is a special case of the K-state Dirichlet distribution for $K = 2$ 

## Binomial

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/286dcb35f9b09f91bffb0a3d13b0225478bae8b4f05741e0185eac0b30aec4cb.jpg)


The binomial distribution gives the probability of observing m occurrences of $x = 1$ in a set of N samples from a Bernoulli distribution, where the probability of observing $x = 1$ is $\mu \in [ 0 , 1 ]$ 

$$
\operatorname{Bin} (m | N, \mu) = \binom {N} {m} \mu^ {m} (1 - \mu) ^ {N - m}\tag{B.10}
$$

$$
\mathbb {E} [ m ] = N \mu\tag{B.11}
$$

$$
\operatorname{var} [ m ] = N \mu (1 - \mu)\tag{B.12}
$$

$$
\mathrm{mode} [ m ] = \lfloor (N + 1) \mu \rfloor\tag{B.13}
$$

where $\left\lfloor ( N + 1 ) \mu \right\rfloor$ denotes the largest integer that is less than or equal to $( N + 1 ) \mu .$ and the quantity 

$$
\binom {N} {m} = \frac {N !}{m ! (N - m) !}\tag{B.14}
$$

denotes the number of ways of choosing m objects out of a total of N identical objects. Here $m !$ , pronounced ‘factorial $m ^ { \prime }$ , denotes the product $m \times ( m - 1 ) \times$ $\ldots , \times 2 \times 1$ . The particular case of the binomial distribution for $N = 1$ is known as the Bernoulli distribution, and for large N the binomial distribution is approximately Gaussian. The conjugate prior for $\mu$ is the beta distribution. 

## Dirichlet

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/481f702dd71d0629bb2ed26997c35ee77d9745f097d654dae95589a34e134dde.jpg)


The Dirichlet is a multivariate distribution over K random variables $0 \leqslant \mu _ { k } \leqslant 1$ where $k = 1 , \ldots , K$ , subject to the constraints 

$$
0 \leqslant \mu_ {k} \leqslant 1, \quad \sum_ {k = 1} ^ {K} \mu_ {k} = 1.\tag{B.15}
$$

Denoting $\pmb { \mu } = ( \mu _ { 1 } , \ldots , \mu _ { K } ) ^ { \mathrm { T } }$ and $\mathbf { \alpha } \propto ( \alpha _ { 1 } , \ldots , \alpha _ { K } ) ^ { \mathrm { T } }$ , we have 

$$
\operatorname{Dir} (\boldsymbol {\mu} | \boldsymbol {\alpha}) = C (\boldsymbol {\alpha}) \prod_ {k = 1} ^ {K} \mu_ {k} ^ {\alpha_ {k} - 1}\tag{B.16}
$$

$$
\mathbb {E} [ \mu_ {k} ] = \frac {\alpha_ {k}}{\widehat {\alpha}}\tag{B.17}
$$

$$
\operatorname{var} [ \mu_ {k} ] = \frac {\alpha_ {k} (\widehat {\alpha} - \alpha_ {k})}{\widehat {\alpha} ^ {2} (\widehat {\alpha} + 1)}\tag{B.18}
$$

$$
\operatorname{cov} [ \mu_ {j} \mu_ {k} ] = - \frac {\alpha_ {j} \alpha_ {k}}{\widehat {\alpha} ^ {2} (\widehat {\alpha} + 1)}\tag{B.19}
$$

$$
\mathrm{mode} [ \mu_ {k} ] = \frac {\alpha_ {k} - 1}{\widehat {\alpha} - K}\tag{B.20}
$$

$$
\mathbb {E} [ \ln \mu_ {k} ] = \psi (\alpha_ {k}) - \psi (\widehat {\alpha})\tag{B.21}
$$

$$
\mathrm{H} [ \boldsymbol {\mu} ] = - \sum_ {k = 1} ^ {K} (\alpha_ {k} - 1) \left\{\psi (\alpha_ {k}) - \psi (\widehat {\alpha}) \right\} - \ln C (\boldsymbol {\alpha})\tag{B.22}
$$

where 

$$
C (\boldsymbol {\alpha}) = \frac {\Gamma (\widehat {\alpha})}{\Gamma (\alpha_ {1}) \cdots \Gamma (\alpha_ {K})}\tag{B.23}
$$

and 

$$
\widehat {\alpha} = \sum_ {k = 1} ^ {K} \alpha_ {k}.\tag{B.24}
$$

Here 

$$
\psi (a) \equiv \frac {d}{d a} \ln \Gamma (a)\tag{B.25}
$$

is known as the digamma function (Abramowitz and Stegun, 1965). The parameters $\alpha _ { k }$ are subject to the constraint $\alpha _ { k } > 0$ in order to ensure that the distribution can be normalized. 

The Dirichlet forms the conjugate prior for the multinomial distribution and represents a generalization of the beta distribution. In this case, the parameters $\alpha _ { k }$ can be interpreted as effective numbers of observations of the corresponding values of the K-dimensional binary observation vector x. As with the beta distribution, the Dirichlet has finite density everywhere provided $\alpha _ { k } \geqslant 1$ for all k. 

## Gamma

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/7c2b7b470a10fb4e1143398814466dd361610557db18ba57692cbabece513e7d.jpg)


The Gamma is a probability distribution over a positive random variable $\tau > 0$ governed by parameters a and $b$ that are subject to the constraints $a > 0$ and $b > 0$ to ensure that the distribution can be normalized. 

$$
\operatorname{Gam} (\tau | a, b) = \frac {1}{\Gamma (a)} b ^ {a} \tau^ {a - 1} e ^ {- b \tau}\tag{B.26}
$$

$$
\mathbb {E} [ \tau ] = \frac {a}{b}\tag{B.27}
$$

$$
\operatorname{var} [ \tau ] = \frac {a}{b ^ {2}}\tag{B.28}
$$

$$
\operatorname{mode} [ \tau ] = \frac {a - 1}{b} \quad \text { for } \alpha \geqslant 1\tag{B.29}
$$

$$
\mathbb {E} [ \ln \tau ] = \psi (a) - \ln b\tag{B.30}
$$

$$
\mathrm{H} [ \tau ] = \ln \Gamma (a) - (a - 1) \psi (a) - \ln b + a\tag{B.31}
$$

where $\psi ( \cdot )$ is the digamma function defined by (B.25). The gamma distribution is the conjugate prior for the precision (inverse variance) of a univariate Gaussian. For $a \geqslant 1$ the density is everywhere finite, and the special case of $a = 1$ is known as the exponential distribution. 

## Gaussian

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/ad47523940f39a3d8c5c689135d421927daee20144e734eb881f01d6b236f3ed.jpg)


The Gaussian is the most widely used distribution for continuous variables. It is also known as the normal distribution. In the case of a single variable $x \in ( - \infty , \infty )$ it is governed by two parameters, the mean $\mu \in ( - \infty , \infty )$ and the variance $\sigma ^ { 2 } > 0$ 

$$
\mathcal {N} (x | \mu , \sigma^ {2}) = \frac {1}{(2 \pi \sigma^ {2}) ^ {1 / 2}} \exp \left\{- \frac {1}{2 \sigma^ {2}} (x - \mu) ^ {2} \right\}\tag{B.32}
$$

$$
\mathbb {E} [ x ] = \mu\tag{B.33}
$$

$$
\operatorname{var} [ x ] = \sigma^ {2}\tag{B.34}
$$

$$
\mathrm{mode} [ x ] = \mu\tag{B.35}
$$

$$
\mathrm{H} [ x ] = \frac {1}{2} \ln \sigma^ {2} + \frac {1}{2} (1 + \ln (2 \pi)).\tag{B.36}
$$

The inverse of the variance $\tau = 1 / \sigma ^ { 2 }$ is called the precision, and the square root of the variance $\sigma$ is called the standard deviation. The conjugate prior for $\mu$ is the Gaussian, and the conjugate prior for $\tau$ is the gamma distribution. If both $\mu$ and $\tau$ are unknown, their joint conjugate prior is the Gaussian-gamma distribution. 

For a D-dimensional vector x, the Gaussian is governed by a D-dimensional mean vector $\pmb { \mu }$ and a $D \times D$ covariance matrix $\pmb { \Sigma }$ that must be symmetric and 

positive-definite. 

$$
\mathcal {N} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Sigma}) = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \exp \left\{- \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu}) \right\}\tag{B.37}
$$

$$
\mathbb {E} [ \mathbf {x} ] = \boldsymbol {\mu}\tag{B.38}
$$

$$
\operatorname{cov} [ \mathbf {x} ] = \boldsymbol {\Sigma}\tag{B.39}
$$

$$
\mathrm{mode} [ \mathbf {x} ] = \boldsymbol {\mu}\tag{B.40}
$$

$$
\mathrm{H} [ \mathbf {x} ] = \frac {1}{2} \ln | \boldsymbol {\Sigma} | + \frac {D}{2} (1 + \ln (2 \pi)).\tag{B.41}
$$

The inverse of the covariance matrix $\pmb { \Lambda } = \pmb { \Sigma } ^ { - 1 }$ is the precision matrix, which is also symmetric and positive definite. Averages of random variables tend to a Gaussian, by the central limit theorem, and the sum of two Gaussian variables is again Gaussian. The Gaussian is the distribution that maximizes the entropy for a given variance (or covariance). Any linear transformation of a Gaussian random variable is again Gaussian. The marginal distribution of a multivariate Gaussian with respect to a subset of the variables is itself Gaussian, and similarly the conditional distribution is also Gaussian. The conjugate prior for $\pmb { \mu }$ is the Gaussian, the conjugate prior for Λ is the Wishart, and the conjugate prior for $( \mu , \Lambda )$ is the Gaussian-Wishart. 

If we have a marginal Gaussian distribution for x and a conditional Gaussian distribution for y given x in the form 

$$
{p (\mathbf {x})} = {\mathcal {N} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Lambda} ^ {- 1})}\tag{B.42}
$$

$$
p (\mathbf {y} | \mathbf {x}) = \mathcal {N} (\mathbf {y} | \mathbf {A x} + \mathbf {b}, \mathbf {L} ^ {- 1})\tag{B.43}
$$

then the marginal distribution of $\mathbf { y } _ { \mathrm { : } }$ , and the conditional distribution of x given y, are given by 

$$
{p (\mathbf {y})} = {\mathcal {N} (\mathbf {y} | \mathbf {A} \boldsymbol {\mu} + \mathbf {b}, \mathbf {L} ^ {- 1} + \mathbf {A} \boldsymbol {\Lambda} ^ {- 1} \mathbf {A} ^ {\mathrm{T}})}\tag{B.44}
$$

$$
{p (\mathbf {x} | \mathbf {y})} = {\mathcal {N} (\mathbf {x} | \boldsymbol {\Sigma} \{\mathbf {A} ^ {\mathrm{T}} \mathbf {L} (\mathbf {y} - \mathbf {b}) + \boldsymbol {\Lambda} \boldsymbol {\mu} \}, \boldsymbol {\Sigma})}\tag{B.45}
$$

where 

$$
\boldsymbol {\Sigma} = \left(\boldsymbol {\Lambda} + \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \mathbf {A}\right) ^ {- 1}.\tag{B.46}
$$

If we have a joint Gaussian distribution $\mathcal { N } ( { \bf x } | \mu , \Sigma )$ with $\pmb { \Lambda } \equiv \pmb { \Sigma } ^ { - 1 }$ and we define the following partitions 

$$
\mathbf {x} = \binom{\mathbf {x} _ {a}}{\mathbf {x} _ {b}}, \quad \boldsymbol {\mu} = \binom{\boldsymbol {\mu} _ {a}}{\boldsymbol {\mu} _ {b}}\tag{B.47}
$$

$$
\boldsymbol {\Sigma} = \left( \begin{array}{c c} \boldsymbol {\Sigma} _ {a a} & \boldsymbol {\Sigma} _ {a b} \\ \boldsymbol {\Sigma} _ {b a} & \boldsymbol {\Sigma} _ {b b} \end{array} \right), \quad \boldsymbol {\Lambda} = \left( \begin{array}{c c} \boldsymbol {\Lambda} _ {a a} & \boldsymbol {\Lambda} _ {a b} \\ \boldsymbol {\Lambda} _ {b a} & \boldsymbol {\Lambda} _ {b b} \end{array} \right)\tag{B.48}
$$

then the conditional distribution $p ( \mathbf { x } _ { a } | \mathbf { x } _ { b } )$ is given by 

$$
{p (\mathbf {x} _ {a} | \mathbf {x} _ {b})} = {\mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {a | b}, \boldsymbol {\Lambda} _ {a a} ^ {- 1})}\tag{B.49}
$$

$$
{\pmb {\mu} _ {a | b}} = {\pmb {\mu} _ {a} - \pmb {\Lambda} _ {a a} ^ {- 1} \pmb {\Lambda} _ {a b} (\mathbf {x} _ {b} - \pmb {\mu} _ {b})}\tag{B.50}
$$

and the marginal distribution $p ( \mathbf { x } _ { a } )$ is given by 

$$
p (\mathbf {x} _ {a}) = \mathcal {N} (\mathbf {x} _ {a} | \boldsymbol {\mu} _ {a}, \boldsymbol {\Sigma} _ {a a}).\tag{B.51}
$$

## Gaussian-Gamma

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/eb4aaf85b2fb38f33031f1793b438e7908ae06a85c35d5740a3555e4870ca918.jpg)


This is the conjugate prior distribution for a univariate Gaussian $\mathcal { N } ( \boldsymbol { x } | \mu , \lambda ^ { - 1 } )$ in which the mean $\mu$ and the precision λ are both unknown and is also called the normal-gamma distribution. It comprises the product of a Gaussian distribution for $\mu ,$ whose precision is proportional to λ, and a gamma distribution over λ. 

$$
p (\mu , \lambda | \mu_ {0}, \beta , a, b) = \mathcal {N} \left(\mu | \mu_ {o}, (\beta \lambda) ^ {- 1}\right) \operatorname{Gam} (\lambda | a, b).\tag{B.52}
$$

## Gaussian-Wishart

This is the conjugate prior distribution for a multivariate Gaussian $\mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \mathbf { \Lambda } \mathbf { \Lambda } )$ in which both the mean $\pmb { \mu }$ and the precision Λ are unknown, and is also called the normal-Wishart distribution. It comprises the product of a Gaussian distribution for $\mu ,$ whose precision is proportional to Λ, and a Wishart distribution over Λ. 

$$
p (\boldsymbol {\mu}, \boldsymbol {\Lambda} | \boldsymbol {\mu} _ {0}, \beta , \mathbf {W}, \nu) = \mathcal {N} \left(\boldsymbol {\mu} | \boldsymbol {\mu} _ {0}, (\beta \boldsymbol {\Lambda}) ^ {- 1}\right) \mathcal {W} (\boldsymbol {\Lambda} | \mathbf {W}, \nu).\tag{B.53}
$$

For the particular case of a scalar x, this is equivalent to the Gaussian-gamma distribution. 

## Multinomial

If we generalize the Bernoulli distribution to an K-dimensional binary variable x with components $x _ { k } \in \{ 0 , 1 \}$ such that $\textstyle \sum _ { k } x _ { k } = 1$ , then we obtain the following discrete distribution 

$$
p (\mathbf {x}) = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {x _ {k}}\tag{B.54}
$$

$$
\mathbb {E} [ x _ {k} ] = \mu_ {k}\tag{B.55}
$$

$$
\operatorname{var} [ x _ {k} ] = \mu_ {k} (1 - \mu_ {k})\tag{B.56}
$$

$$
{\mathrm{cov} [ x _ {j} x _ {k} ]} = {I _ {j k} \mu_ {k}}\tag{B.57}
$$

$$
\mathrm{H} [ \mathbf {x} ] = - \sum_ {k = 1} ^ {M} \mu_ {k} \ln \mu_ {k}\tag{B.58}
$$

where $I _ { j k }$ is the $j , k$ element of the identity matrix. Because $p ( x _ { k } = 1 ) = \mu _ { k }$ , the parameters must satisfy $0 \leqslant \mu _ { k } \leqslant 1$ and $\textstyle \sum _ { k } \mu _ { k } = 1$ 

The multinomial distribution is a multivariate generalization of the binomial and gives the distribution over counts $m _ { k }$ for a K-state discrete variable to be in state k given a total number of observations N. 

$$
\text { Mult } (m _ {1}, m _ {2}, \ldots , m _ {K} | \boldsymbol {\mu}, N) = \binom{N}{m _ {1} m _ {2} \ldots m _ {M}} \prod_ {k = 1} ^ {M} \mu_ {k} ^ {m _ {k}}\tag{B.59}
$$

$$
\mathbb {E} [ m _ {k} ] = N \mu_ {k}\tag{B.60}
$$

$$
{\mathrm{var} [ m _ {k} ]} = {N \mu_ {k} (1 - \mu_ {k})}\tag{B.61}
$$

$$
\operatorname{cov} [ m _ {j} m _ {k} ] = - N \mu_ {j} \mu_ {k}\tag{B.62}
$$

where $\pmb { \mu } = ( \mu _ { 1 } , \ldots , \mu _ { K } ) ^ { \mathrm { T } }$ , and the quantity 

$$
\binom {N} {m _ {1} m _ {2} \ldots m _ {K}} = \frac {N !}{m _ {1} ! \ldots m _ {K} !}\tag{B.63}
$$

gives the number of ways of taking N identical objects and assigning $m _ { k }$ of them to bin k for $k = 1 , \ldots , K$ . The value of $\mu _ { k }$ gives the probability of the random variable taking state k, and so these parameters are subject to the constraints $0 \leqslant \mu _ { k } \leqslant 1$ and $\bar { \sum _ { k } \mu _ { k } } ~ = ~ 1$ . The conjugate prior distribution for the parameters $\{ \mu _ { k } \}$ is the Dirichlet. 

## Normal

The normal distribution is simply another name for the Gaussian. In this book, we use the term Gaussian throughout, although we retain the conventional use of the symbol $\mathcal { N }$ to denote this distribution. For consistency, we shall refer to the normalgamma distribution as the Gaussian-gamma distribution, and similarly the normal-Wishart is called the Gaussian-Wishart. 

## Student’s t

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/d60dae4a01137910e7aac9dd5c519903fddaf99bc7bbffcf4980754b8da4a495.jpg)


This distribution was published by William Gosset in 1908, but his employer, Guiness Breweries, required him to publish under a pseudonym, so he chose ‘Student’. In the univariate form, Student’s t-distribution is obtained by placing a conjugate gamma prior over the precision of a univariate Gaussian distribution and then integrating out the precision variable. It can therefore be viewed as an infinite mixture of Gaussians having the same mean but different variances. 

$$
\operatorname{St} (x | \mu , \lambda , \nu) = \frac {\Gamma (\nu / 2 + 1 / 2)}{\Gamma (\nu / 2)} \left(\frac {\lambda}{\pi \nu}\right) ^ {1 / 2} \left[ 1 + \frac {\lambda (x - \mu) ^ {2}}{\nu} \right] ^ {- \nu / 2 - 1 / 2}\tag{B.64}
$$

$$
\mathbb {E} [ x ] = \mu \quad \mathrm{for} \nu > 1\tag{B.65}
$$

$$
\operatorname{var} [ x ] = \frac {1}{\lambda} \frac {\nu}{\nu - 2} \quad \mathrm{for} \nu > 2\tag{B.66}
$$

$$
\mathrm{mode} [ x ] = \mu .\tag{B.67}
$$

Here $\nu > 0$ is called the number of degrees of freedom of the distribution. The particular case of $\nu = 1$ is called the Cauchy distribution. 

For a D-dimensional variable x, Student’s t-distribution corresponds to marginalizing the precision matrix of a multivariate Gaussian with respect to a conjugate Wishart prior and takes the form 

$$
\operatorname{St} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Lambda}, \nu) = \frac {\Gamma (\nu / 2 + D / 2)}{\Gamma (\nu / 2)} \frac {| \boldsymbol {\Lambda} | ^ {1 / 2}}{(\nu \pi) ^ {D / 2}} \left[ 1 + \frac {\Delta^ {2}}{\nu} \right] ^ {- \nu / 2 - D / 2}\tag{B.68}
$$

$$
\mathbb {E} [ \mathbf {x} ] = \boldsymbol {\mu} \quad \mathrm{for} \nu > 1\tag{B.69}
$$

$$
\operatorname{cov} [ \mathbf {x} ] = \frac {\nu}{\nu - 2} \boldsymbol {\Lambda} ^ {- 1} \quad \text { for } \nu > 2\tag{B.70}
$$

$$
\mathrm{mode} [ \mathbf {x} ] = \boldsymbol {\mu}\tag{B.71}
$$

where $\Delta ^ { 2 }$ is the squared Mahalanobis distance defined by 

$$
\Delta^ {2} = (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Lambda} (\mathbf {x} - \boldsymbol {\mu}).\tag{B.72}
$$

In the limit $\nu \to \infty$ , the t-distribution reduces to a Gaussian with mean $\mu$ and precision Λ. Student’s t-distribution provides a generalization of the Gaussian whose maximum likelihood parameter values are robust to outliers. 

## Uniform

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/3d98e54d7aaa684ccfc0f09133af6239a87db6e960ddb3412adb950dfbf2d752.jpg)


This is a simple distribution for a continuous variable x defined over a finite interval $x \in [ a , b ]$ where $b > a$ 

$$
\mathrm{U} (x | a, b) = \frac {1}{b - a}\tag{B.73}
$$

$$
\mathbb {E} [ x ] = \frac {(b + a)}{2}\tag{B.74}
$$

$$
\operatorname{var} [ x ] = \frac {(b - a) ^ {2}}{1 2}\tag{B.75}
$$

$$
\mathrm{H} [ x ] = \ln (b - a).\tag{B.76}
$$

If x has distribution $\mathrm { U } ( x | 0 , 1 )$ , then $a + ( b - a ) x$ will have distribution $\mathrm { U } ( { \boldsymbol { x } } | { \boldsymbol { a } } , { \boldsymbol { b } } )$ 

## Von Mises

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/39c2476deea36e266200a22949b5bef8273b6800162ca6744308fd84f527a72d.jpg)


The von Mises distribution, also known as the circular normal or the circular Gaussian, is a univariate Gaussian-like periodic distribution for a variable $\theta \in [ 0 , 2 \pi )$ 

$$
{p (\theta | \theta_ {0}, m)} = {\frac {1}{2 \pi I _ {0} (m)} \exp \{m \cos (\theta - \theta_ {0}) \}}\tag{B.77}
$$

where $I _ { 0 } ( m )$ is the zeroth-order Bessel function of the first kind. The distribution has period $2 \pi$ so that $p ( \theta + 2 \pi ) = p ( \theta )$ for all θ. Care must be taken in interpreting this distribution because simple expectations will be dependent on the (arbitrary) choice of origin for the variable θ. The parameter $\theta _ { 0 }$ is analogous to the mean of a univariate Gaussian, and the parameter $m > 0$ , known as the concentration parameter, is analogous to the precision (inverse variance). For large m, the von Mises distribution is approximately a Gaussian centred on $\theta _ { 0 }$ 

## Wishart

The Wishart distribution is the conjugate prior for the precision matrix of a multivariate Gaussian. 

$$
\mathcal {W} (\boldsymbol {\Lambda} | \mathbf {W}, \nu) = B (\mathbf {W}, \nu) | \boldsymbol {\Lambda} | ^ {(\nu - D - 1) / 2} \exp \left(- \frac {1}{2} \operatorname{Tr} \left(\mathbf {W} ^ {- 1} \boldsymbol {\Lambda}\right)\right)\tag{B.78}
$$

where 

$$
B (\mathbf {W}, \nu) \equiv | \mathbf {W} | ^ {- \nu / 2} \left(2 ^ {\nu D / 2} \pi^ {D (D - 1) / 4} \prod_ {i = 1} ^ {D} \Gamma \left(\frac {\nu + 1 - i}{2}\right)\right) ^ {- 1}\tag{B.79}
$$

$$
\mathbb {E} [ \boldsymbol {\Lambda} ] = \nu \mathbf {W}\tag{B.80}
$$

$$
\mathbb {E} \left[ \ln | \boldsymbol {\Lambda} | \right] = \sum_ {i = 1} ^ {D} \psi \left(\frac {\nu + 1 - i}{2}\right) + D \ln 2 + \ln | \mathbf {W} |\tag{B.81}
$$

$$
\mathrm{H} [ \boldsymbol {\Lambda} ] = - \ln B (\mathbf {W}, \nu) - \frac {(\nu - D - 1)}{2} \mathbb {E} \left[ \ln | \boldsymbol {\Lambda} | \right] + \frac {\nu D}{2}\tag{B.82}
$$

where W is a $D \times D$ symmetric, positive definite matrix, and $\psi ( \cdot )$ is the digamma function defined by (B.25). The parameter ν is called the number of degrees of freedom of the distribution and is restricted to $\nu > D - 1$ to ensure that the Gamma function in the normalization factor is well-defined. In one dimension, the Wishart reduces to the gamma distribution ${ \mathrm { G a m } } ( \lambda | a , b )$ given by (B.26) with parameters $a = \nu / 2$ and $b = 1 / 2 W$ 

## Appendix C. Properties of Matrices

In this appendix, we gather together some useful properties and identities involving matrices and determinants. This is not intended to be an introductory tutorial, and it is assumed that the reader is already familiar with basic linear algebra. For some results, we indicate how to prove them, whereas in more complex cases we leave the interested reader to refer to standard textbooks on the subject. In all cases, we assume that inverses exist and that matrix dimensions are such that the formulae are correctly defined. A comprehensive discussion of linear algebra can be found in Golub and Van Loan (1996), and an extensive collection of matrix properties is given by Lutkepohl (1996). Matrix derivatives are discussed in Magnus and Neudecker¨ (1999). 

## Basic Matrix Identities

A matrix A has elements $A _ { i j }$ where i indexes the rows, and j indexes the columns. We use ${ \mathbf { I } } _ { N }$ to denote the $N \times N$ identity matrix (also called the unit matrix), and where there is no ambiguity over dimensionality we simply use I. The transpose matrix ${ \bf A } ^ { \mathrm { T } }$ has elements $( \mathbf { A } ^ { \mathrm { T } } ) _ { i j } = A _ { j i }$ . From the definition of transpose, we have 

$$
(\mathbf {A B}) ^ {\mathrm{T}} = \mathbf {B} ^ {\mathrm{T}} \mathbf {A} ^ {\mathrm{T}}\tag{C.1}
$$

which can be verified by writing out the indices. The inverse of A, denoted $\mathbf { A } ^ { - 1 }$ satisfies 

$$
\mathbf {A} \mathbf {A} ^ {- 1} = \mathbf {A} ^ {- 1} \mathbf {A} = \mathbf {I}.\tag{C.2}
$$

Because $\mathbf { A } \mathbf { B } \mathbf { B } ^ { - 1 } \mathbf { A } ^ { - 1 } = \mathbf { I }$ , we have 

$$
(\mathbf {A B}) ^ {- 1} = \mathbf {B} ^ {- 1} \mathbf {A} ^ {- 1}.\tag{C.3}
$$

Also we have 

$$
\left(\mathbf {A} ^ {\mathrm{T}}\right) ^ {- 1} = \left(\mathbf {A} ^ {- 1}\right) ^ {\mathrm{T}}\tag{C.4}
$$

which is easily proven by taking the transpose of (C.2) and applying (C.1). 

A useful identity involving matrix inverses is the following 

$$
(\mathbf {P} ^ {- 1} + \mathbf {B} ^ {\mathrm{T}} \mathbf {R} ^ {- 1} \mathbf {B}) ^ {- 1} \mathbf {B} ^ {\mathrm{T}} \mathbf {R} ^ {- 1} = \mathbf {P B} ^ {\mathrm{T}} (\mathbf {B P B} ^ {\mathrm{T}} + \mathbf {R}) ^ {- 1}.\tag{C.5}
$$

which is easily verified by right multiplying both sides by $( \mathbf { B P B ^ { \mathrm { T } } + R } )$ . Suppose that P has dimensionality $N \times N$ while R has dimensionality $M \times M$ , so that B is $M \times N$ . Then if $M \ll N$ , it will be much cheaper to evaluate the right-hand side of (C.5) than the left-hand side. A special case that sometimes arises is 

$$
(\mathbf {I} + \mathbf {A B}) ^ {- 1} \mathbf {A} = \mathbf {A} (\mathbf {I} + \mathbf {B A}) ^ {- 1}.\tag{C.6}
$$

Another useful identity involving inverses is the following: 

$$
(\mathbf {A} + \mathbf {B D} ^ {- 1} \mathbf {C}) ^ {- 1} = \mathbf {A} ^ {- 1} - \mathbf {A} ^ {- 1} \mathbf {B} (\mathbf {D} + \mathbf {C A} ^ {- 1} \mathbf {B}) ^ {- 1} \mathbf {C A} ^ {- 1}\tag{C.7}
$$

which is known as the Woodbury identity and which can be verified by multiplying both sides by $\mathbf { \left( A + B D ^ { - 1 } C \right) }$ This is useful, for instance, when A is large and diagonal, and hence easy to invert, while B has many rows but few columns (and conversely for C) so that the right-hand side is much cheaper to evaluate than the left-hand side. 

A set of vectors $\left\{ \mathbf { a } _ { 1 } , \ldots , \mathbf { a } _ { N } \right\}$ is said to be linearly independent if the relation $\begin{array} { r } { \sum _ { n } \alpha _ { n } \mathbf { a } _ { n } \ = \ 0 } \end{array}$ holds only if all $\alpha _ { n } \ = \ 0$ . This implies that none of the vectors can be expressed as a linear combination of the remainder. The rank of a matrix is the maximum number of linearly independent rows (or equivalently the maximum number of linearly independent columns). 

## Traces and Determinants

Trace and determinant apply to square matrices. The trace $\operatorname { T r } ( \mathbf { A } )$ of a matrix A is defined as the sum of the elements on the leading diagonal. By writing out the indices, we see that 

$$
\operatorname{Tr} (\mathbf {A B}) = \operatorname{Tr} (\mathbf {B A}).\tag{C.8}
$$

By applying this formula multiple times to the product of three matrices, we see that 

$$
\operatorname{Tr} (\mathbf {A B C}) = \operatorname{Tr} (\mathbf {C A B}) = \operatorname{Tr} (\mathbf {B C A})\tag{C.9}
$$

which is known as the cyclic property of the trace operator and which clearly extends to the product of any number of matrices. The determinant $| \mathbf { A } |$ of an $N \times N$ matrix A is defined by 

$$
| \mathbf {A} | = \sum (\pm 1) A _ {1 i _ {1}} A _ {2 i _ {2}} \dots A _ {N i _ {N}}\tag{C.10}
$$

in which the sum is taken over all products consisting of precisely one element from each row and one element from each column, with a coefficient +1 or 1 according to whether the permutation $i _ { 1 } i _ { 2 } \dots i _ { N }$ is even or odd, respectively. Note that $| \mathbf { I } | = 1$ Thus, for a $2 \times 2$ matrix, the determinant takes the form 

$$
| \mathbf {A} | = \left| \begin{array}{l l} a _ {1 1} & a _ {1 2} \\ a _ {2 1} & a _ {2 2} \end{array} \right| = a _ {1 1} a _ {2 2} - a _ {1 2} a _ {2 1}.\tag{C.11}
$$

The determinant of a product of two matrices is given by 

$$
| \mathbf {A B} | = | \mathbf {A} | | \mathbf {B} |\tag{C.12}
$$

as can be shown from (C.10). Also, the determinant of an inverse matrix is given by 

$$
\left| \mathbf {A} ^ {- 1} \right| = \frac {1}{\left| \mathbf {A} \right|}\tag{C.13}
$$

which can be shown by taking the determinant of (C.2) and applying (C.12). 

If A and B are matrices of size $N \times M$ , then 

$$
\left| \mathbf {I} _ {N} + \mathbf {A B} ^ {\mathrm{T}} \right| = \left| \mathbf {I} _ {M} + \mathbf {A} ^ {\mathrm{T}} \mathbf {B} \right|.\tag{C.14}
$$

A useful special case is 

$$
\left| \mathbf {I} _ {N} + \mathbf {a b} ^ {\mathrm{T}} \right| = 1 + \mathbf {a} ^ {\mathrm{T}} \mathbf {b}\tag{C.15}
$$

where a and b are N-dimensional column vectors. 

## Matrix Derivatives

Sometimes we need to consider derivatives of vectors and matrices with respect to scalars. The derivative of a vector a with respect to a scalar x is itself a vector whose components are given by 

$$
\left(\frac {\partial \mathbf {a}}{\partial x}\right) _ {i} = \frac {\partial a _ {i}}{\partial x}\tag{C.16}
$$

with an analogous definition for the derivative of a matrix. Derivatives with respect to vectors and matrices can also be defined, for instance 

$$
\left(\frac {\partial x}{\partial \mathbf {a}}\right) _ {i} = \frac {\partial x}{\partial a _ {i}}\tag{C.17}
$$

and similarly 

$$
\left(\frac {\partial \mathbf {a}}{\partial \mathbf {b}}\right) _ {i j} = \frac {\partial a _ {i}}{\partial b _ {j}}.\tag{C.18}
$$

The following is easily proven by writing out the components 

$$
\frac {\partial}{\partial \mathbf {x}} \left(\mathbf {x} ^ {\mathrm{T}} \mathbf {a}\right) = \frac {\partial}{\partial \mathbf {x}} \left(\mathbf {a} ^ {\mathrm{T}} \mathbf {x}\right) = \mathbf {a}.\tag{C.19}
$$

Similarly 

$$
\frac {\partial}{\partial \mathbf {x}} (\mathbf {A B}) = \frac {\partial \mathbf {A}}{\partial \mathbf {x}} \mathbf {B} + \mathbf {A} \frac {\partial \mathbf {B}}{\partial \mathbf {x}}.\tag{C.20}
$$

The derivative of the inverse of a matrix can be expressed as 

$$
\frac {\partial}{\partial x} \left(\mathbf {A} ^ {- 1}\right) = - \mathbf {A} ^ {- 1} \frac {\partial \mathbf {A}}{\partial x} \mathbf {A} ^ {- 1}\tag{C.21}
$$

as can be shown by differentiating the equation $\mathbf { A } ^ { - 1 } \mathbf { A } = \mathbf { I }$ using (C.20) and then right multiplying by ${ { \bf A } ^ { - 1 } }$ . Also 

$$
\frac {\partial}{\partial x} \ln | \mathbf {A} | = \operatorname{Tr} \left(\mathbf {A} ^ {- 1} \frac {\partial \mathbf {A}}{\partial x}\right)\tag{C.22}
$$

which we shall prove later. If we choose x to be one of the elements of A, we have 

$$
\frac {\partial}{\partial A _ {i j}} \mathrm{Tr} (\mathbf {A B}) = B _ {j i}\tag{C.23}
$$

as can be seen by writing out the matrices using index notation. We can write this result more compactly in the form 

$$
\frac {\partial}{\partial \mathbf {A}} \mathrm{Tr} (\mathbf {A B}) = \mathbf {B} ^ {\mathrm{T}}.\tag{C.24}
$$

With this notation, we have the following properties 

$$
\frac {\partial}{\partial \mathbf {A}} \mathrm{Tr} \left(\mathbf {A} ^ {\mathrm{T}} \mathbf {B}\right) = \mathbf {B}\tag{C.25}
$$

$$
{\frac {\partial}{\partial \mathbf {A}} \mathrm{Tr} (\mathbf {A})} = {\mathbf {I}}\tag{C.26}
$$

$$
\frac {\partial}{\partial \mathbf {A}} \mathrm{Tr} (\mathbf {A B A} ^ {\mathrm{T}}) = \mathbf {A} (\mathbf {B} + \mathbf {B} ^ {\mathrm{T}})\tag{C.27}
$$

which can again be proven by writing out the matrix indices. We also have 

$$
\frac {\partial}{\partial \mathbf {A}} \ln | \mathbf {A} | = (\mathbf {A} ^ {- 1}) ^ {\mathrm{T}}\tag{C.28}
$$

which follows from (C.22) and (C.26). 

## Eigenvector Equation

For a square matrix A of size $M \times M$ , the eigenvector equation is defined by 

$$
\mathbf {A} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{C.29}
$$

for $i = 1 , \ldots , M$ , where $\mathbf { u } _ { i }$ is an eigenvector and $\lambda _ { i }$ is the corresponding eigenvalue. This can be viewed as a set of M simultaneous homogeneous linear equations, and the condition for a solution is that 

$$
| \mathbf {A} - \lambda_ {i} \mathbf {I} | = 0\tag{C.30}
$$

which is known as the characteristic equation. Because this is a polynomial of order M in $\lambda _ { i } .$ , it must have M solutions (though these need not all be distinct). The rank of A is equal to the number of nonzero eigenvalues. 

Of particular interest are symmetric matrices, which arise as covariance matrices, kernel matrices, and Hessians. Symmetric matrices have the property that $A _ { i j } = A _ { j i }$ , or equivalently $\mathbf { A } ^ { \mathrm { T } } = \mathbf { A }$ . The inverse of a symmetric matrix is also symmetric, as can be seen by taking the transpose of $\mathbf { A } ^ { - 1 } \dot { \mathbf { A } } = \mathbf { I }$ and using $\mathbf { A } \mathbf { A } ^ { - 1 } = \mathbf { I }$ together with the symmetry of I. 

In general, the eigenvalues of a matrix are complex numbers, but for symmetric matrices the eigenvalues $\lambda _ { i }$ are real. This can be seen by first left multiplying (C.29) by $( \mathbf { u } _ { i } ^ { \star } ) ^ { \mathrm { T } }$ , where  denotes the complex conjugate, to give 

$$
\left(\mathbf {u} _ {i} ^ {\star}\right) ^ {\mathrm{T}} \mathbf {A u} _ {i} = \lambda_ {i} \left(\mathbf {u} _ {i} ^ {\star}\right) ^ {\mathrm{T}} \mathbf {u} _ {i}.\tag{C.31}
$$

Next we take the complex conjugate of (C.29) and left multiply by ${ \mathbf { u } } _ { i } ^ { \mathrm { T } }$ to give 

$$
\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {A} \mathbf {u} _ {i} ^ {\star} = \lambda_ {i} ^ {\star} \mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {i} ^ {\star}.\tag{C.32}
$$

where we have used $\mathbf { A } ^ { \star } = \mathbf { A }$ because we consider only real matrices A. Taking the transpose of the second of these equations, and using $\mathbf { A } ^ { \mathrm { T } } = \mathbf { A }$ , we see that the left-hand sides of the two equations are equal, and hence that $\lambda _ { i } ^ { \star } = \lambda _ { i }$ and so $\lambda _ { i }$ must be real. 

The eigenvectors $\mathbf { u } _ { i }$ of a real symmetric matrix can be chosen to be orthonormal (i.e., orthogonal and of unit length) so that 

$$
\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j} = I _ {i j}\tag{C.33}
$$

where $I _ { i j }$ are the elements of the identity matrix I. To show this, we first left multiply (C.29) by $\mathbf { u } _ { j } ^ { \mathrm { T } }$ to give 

$$
\mathbf {u} _ {j} ^ {\mathrm{T}} \mathbf {A} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {j} ^ {\mathrm{T}} \mathbf {u} _ {i}\tag{C.34}
$$

and hence, by exchange of indices, we have 

$$
\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {A} \mathbf {u} _ {j} = \lambda_ {j} \mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j}.\tag{C.35}
$$

We now take the transpose of the second equation and make use of the symmetry property $\mathbf { A } ^ { \mathrm { T } } = \mathbf { A }$ , and then subtract the two equations to give 

$$
\left(\lambda_ {i} - \lambda_ {j}\right) \mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j} = 0.\tag{C.36}
$$

Hence, for $\lambda _ { i } \neq \lambda _ { j }$ , we have $\mathbf { u } _ { i } ^ { \mathrm { T } } \mathbf { u } _ { j } = 0$ , and hence $\mathbf { u } _ { i }$ and $\mathbf { u } _ { j }$ are orthogonal. If the two eigenvalues are equal, then any linear combination $\alpha \mathbf { u } _ { i } + \beta \mathbf { u } _ { j }$ is also an eigenvector with the same eigenvalue, so we can select one linear combination arbitrarily, and then choose the second to be orthogonal to the first (it can be shown that the degenerate eigenvectors are never linearly dependent). Hence the eigenvectors can be chosen to be orthogonal, and by normalizing can be set to unit length. Because there are M eigenvalues, the corresponding M orthogonal eigenvectors form a complete set and so any M-dimensional vector can be expressed as a linear combination of the eigenvectors. 

We can take the eigenvectors $\mathbf { u } _ { i }$ to be the columns of an $M \times M$ matrix U, which from orthonormality satisfies 

$$
\mathbf {U} ^ {\mathrm{T}} \mathbf {U} = \mathbf {I}.\tag{C.37}
$$

Such a matrix is said to be orthogonal. Interestingly, the rows of this matrix are also orthogonal, so that $\mathbf { U } \mathbf { U } ^ { \mathrm { T } } = \mathbf { I }$ . To show this, note that (C.37) implies $\begin{array} { r } { { \bf U } ^ { \mathrm { T } } { \bf U } { \bf U } ^ { - 1 } = \qquad } \end{array}$ $\mathbf { U } ^ { - 1 } = \mathbf { U } ^ { \mathrm { T } }$ and so $\mathbf { U U } ^ { - 1 } = \mathbf { U U } ^ { \mathrm { T } } = \mathbf { I } .$ . Using (C.12), it also follows that $| \mathbf { U } | = 1$ The eigenvector equation (C.29) can be expressed in terms of U in the form The eigenvector equation (C.29) can be expressed in terms of U in the form 

$$
\mathbf {A} \mathbf {U} = \mathbf {U} \boldsymbol {\Lambda}\tag{C.38}
$$

where Λ is an $M \times M$ diagonal matrix whose diagonal elements are given by the eigenvalues $\lambda _ { i }$ 

If we consider a column vector x that is transformed by an orthogonal matrix U to give a new vector 

$$
\widetilde {\mathbf {x}} = \mathbf {U} \mathbf {x}\tag{C.39}
$$

then the length of the vector is preserved because 

$$
\widetilde {\mathbf {x}} ^ {\mathrm{T}} \widetilde {\mathbf {x}} = \mathbf {x} ^ {\mathrm{T}} \mathbf {U} ^ {\mathrm{T}} \mathbf {U} \mathbf {x} = \mathbf {x} ^ {\mathrm{T}} \mathbf {x}\tag{C.40}
$$

and similarly the angle between any two such vectors is preserved because 

$$
\widetilde {\mathbf {x}} ^ {\mathrm{T}} \widetilde {\mathbf {y}} = \mathbf {x} ^ {\mathrm{T}} \mathbf {U} ^ {\mathrm{T}} \mathbf {U} \mathbf {y} = \mathbf {x} ^ {\mathrm{T}} \mathbf {y}.\tag{C.41}
$$

Thus, multiplication by U can be interpreted as a rigid rotation of the coordinate system. 

From (C.38), it follows that 

$$
\mathbf {U} ^ {\mathrm{T}} \mathbf {A} \mathbf {U} = \boldsymbol {\Lambda}\tag{C.42}
$$

and because Λ is a diagonal matrix, we say that the matrix A is diagonalized by the matrix U. If we left multiply by U and right multiply by $\mathbf { U } ^ { \mathrm { T } }$ , we obtain 

$$
\mathbf {A} = \mathbf {U} \boldsymbol {\Lambda} \mathbf {U} ^ {\mathrm{T}}\tag{C.43}
$$

Taking the inverse of this equation, and using (C.3) together with $\mathbf { U } ^ { - 1 } = \mathbf { U } ^ { \mathrm { T } }$ , we have 

$$
\mathbf {A} ^ {- 1} = \mathbf {U} \boldsymbol {\Lambda} ^ {- 1} \mathbf {U} ^ {\mathrm{T}}.\tag{C.44}
$$

These last two equations can also be written in the form 

$$
\mathbf {A} = \sum_ {i = 1} ^ {M} \lambda_ {i} \mathbf {u} _ {i} \mathbf {u} _ {i} ^ {\mathrm{T}}\tag{C.45}
$$

$$
\mathbf {A} ^ {- 1} = \sum_ {i = 1} ^ {M} \frac {1}{\lambda_ {i}} \mathbf {u} _ {i} \mathbf {u} _ {i} ^ {\mathrm{T}}.\tag{C.46}
$$

If we take the determinant of (C.43), and use (C.12), we obtain 

$$
| \mathbf {A} | = \prod_ {i = 1} ^ {M} \lambda_ {i}.\tag{C.47}
$$

Similarly, taking the trace of (C.43), and using the cyclic property (C.8) of the trace operator together with $\mathbf { U } ^ { \mathrm { T } } \mathbf { U } = \mathbf { I }$ , we have 

$$
\operatorname{Tr} (\mathbf {A}) = \sum_ {i = 1} ^ {M} \lambda_ {i}.\tag{C.48}
$$

We leave it as an exercise for the reader to verify (C.22) by making use of the results (C.33), (C.45), (C.46), and (C.47). 

A matrix A is said to be positive definite, denoted by $\mathbf A \succ 0$ , if $\mathbf { w } ^ { \mathrm { T } } \mathbf { A } \mathbf { w } > 0$ for all values of the vector w. Equivalently, a positive definite matrix has $\lambda _ { i } > 0$ for all of its eigenvalues (as can be seen by setting w to each of the eigenvectors in turn, and by noting that an arbitrary vector can be expanded as a linear combination of the eigenvectors). Note that positive definite is not the same as all the elements being positive. For example, the matrix 

$$
\left( \begin{array}{c c} 1 & 2 \\ 3 & 4 \end{array} \right)\tag{C.49}
$$

has eigenvalues $\lambda _ { 1 } \simeq 5 . 3 7$ and $\lambda _ { 2 } \simeq - 0 . 3 7$ . A matrix is said to be positive semidefinite if $\mathbf { w } ^ { \mathrm { T } } \mathbf { A } \mathbf { w } \ \geqslant \ 0$ holds for all values of w, which is denoted $\textbf { A } \succeq 0$ , and is equivalent to $\lambda _ { i } \geqslant 0$ 

## Appendix D. Calculus of Variations

We can think of a function $y ( x )$ as being an operator that, for any input value $x ,$ returns an output value $y .$ In the same way, we can define a functional $F [ y ]$ to be an operator that takes a function $y ( x )$ and returns an output value $F .$ . An example of a functional is the length of a curve drawn in a two-dimensional plane in which the path of the curve is defined in terms of a function. In the context of machine learning, a widely used functional is the entropy $\mathrm { H } [ x ]$ for a continuous variable x because, for any choice of probability density function $p ( x )$ , it returns a scalar value representing the entropy of x under that density. Thus the entropy of $p ( x )$ could equally well have been written as $\mathrm { H } [ p ]$ 

A common problem in conventional calculus is to find a value of $x$ that maximizes (or minimizes) a function $y ( x )$ . Similarly, in the calculus of variations we seek a function $y ( x )$ that maximizes (or minimizes) a functional $F [ y ]$ . That is, of all possible functions $y ( x )$ , we wish to find the particular function for which the functional $F [ y ]$ is a maximum (or minimum). The calculus of variations can be used, for instance, to show that the shortest path between two points is a straight line or that the maximum entropy distribution is a Gaussian. 

If we weren’t familiar with the rules of ordinary calculus, we could evaluate a conventional derivative $\mathrm { d } y /$ dx by making a small change  to the variable x and then expanding in powers of , so that 

$$
y (x + \epsilon) = y (x) + \frac {\mathrm{d} y}{\mathrm{d} x} \epsilon + O (\epsilon^ {2})\tag{D.1}
$$

and finally taking the limit $\epsilon  0 .$ . Similarly, for a function of several variables $y ( x _ { 1 } , \ldots , x _ { D } )$ , the corresponding partial derivatives are defined by 

$$
y (x _ {1} + \epsilon_ {1}, \dots , x _ {D} + \epsilon_ {D}) = y (x _ {1}, \dots , x _ {D}) + \sum_ {i = 1} ^ {D} \frac {\partial y}{\partial x _ {i}} \epsilon_ {i} + O (\epsilon^ {2}).\tag{D.2}
$$

The analogous definition of a functional derivative arises when we consider how much a functional $F [ y ]$ changes when we make a small change $\epsilon \eta ( x )$ to the function 

Figure D.1 A functional derivative can be defined by considering how the value of a functional $F [ y ]$ changes when the function $y ( x )$ is changed to $y ( x ) + \epsilon \eta ( x )$ where $\eta ( x )$ is an arbitrary function of x. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/39187f22cf81e0b7af963e4e1a7d83bc75167a0e8f5cf8a7ce3af4f985d6dc3e.jpg)


$y ( x )$ , where $\eta ( x )$ is an arbitrary function of $x ,$ , as illustrated in Figure D.1. We denote the functional derivative of $E [ f ]$ with respect to $f ( x )$ by $\delta F / \delta f ( x )$ , and define it by the following relation: 

$$
F [ y (x) + \epsilon \eta (x) ] = F [ y (x) ] + \epsilon \int \frac {\delta F}{\delta y (x)} \eta (x) \mathrm{d} x + O (\epsilon^ {2}).\tag{D.3}
$$

This can be seen as a natural extension of (D.2) in which $F [ y ]$ now depends on a continuous set of variables, namely the values of $y$ at all points x. Requiring that the functional be stationary with respect to small variations in the function $y ( x )$ gives 

$$
\int {\frac {\delta E}{\delta y (x)}} \eta (x) \mathrm{d} x = 0.\tag{D.4}
$$

Because this must hold for an arbitrary choice of $\eta ( x )$ , it follows that the functional derivative must vanish. To see this, imagine choosing a perturbation $\eta ( x )$ that is zero everywhere except in the neighbourhood of a point ${ \widehat { x } } ,$ in which case the functional derivative must be zero at $x = { \widehat { x } }$ However, because this must be true for every choice of ${ \widehat { x } } .$ , the functional derivative must vanish for all values of $x .$ 

Consider a functional that is defined by an integral over a function $G ( y , y ^ { \prime } , x )$ that depends on both $y ( x )$ and its derivative $y ^ { \prime } ( x )$ as well as having a direct dependence on x 

$$
F [ y ] = \int G (y (x), y ^ {\prime} (x), x) \mathrm{d} x\tag{D.5}
$$

where the value of $y ( x )$ is assumed to be fixed at the boundary of the region of integration (which might be at infinity). If we now consider variations in the function $y ( x )$ , we obtain 

$$
F [ y (x) + \epsilon \eta (x) ] = F [ y (x) ] + \epsilon \int \left\{\frac {\partial G}{\partial y} \eta (x) + \frac {\partial G}{\partial y ^ {\prime}} \eta^ {\prime} (x) \right\} d x + O (\epsilon^ {2}).\tag{D.6}
$$

We now have to cast this in the form (D.3). To do so, we integrate the second term by parts and make use of the fact that $\eta ( x )$ must vanish at the boundary of the integral (because $y ( x )$ is fixed at the boundary). This gives 

$$
F [ y (x) + \epsilon \eta (x) ] = F [ y (x) ] + \epsilon \int \left\{\frac {\partial G}{\partial y} - \frac {\mathrm{d}}{\mathrm{d} x} \left(\frac {\partial G}{\partial y ^ {\prime}}\right) \right\} \eta (x) \mathrm{d} x + O (\epsilon^ {2})\tag{D.7}
$$

from which we can read off the functional derivative by comparison with (D.3). Requiring that the functional derivative vanishes then gives 

$$
\frac {\partial G}{\partial y} - \frac {\mathrm{d}}{\mathrm{d} x} \left(\frac {\partial G}{\partial y ^ {\prime}}\right) = 0\tag{D.8}
$$

which are known as the Euler-Lagrange equations. For example, if 

$$
G = y (x) ^ {2} + \left(y ^ {\prime} (x)\right) ^ {2}\tag{D.9}
$$

then the Euler-Lagrange equations take the form 

$$
y (x) - \frac {\mathrm{d} ^ {2} y}{\mathrm{d} x ^ {2}} = 0.\tag{D.10}
$$

This second order differential equation can be solved for $y ( x )$ by making use of the boundary conditions on $y ( x )$ 

Often, we consider functionals defined by integrals whose integrands take the form $G ( y , x )$ and that do not depend on the derivatives of $y ( x )$ . In this case, stationarity simply requires that $\partial G / \partial y ( x ) = 0$ for all values of $x$ . 

If we are optimizing a functional with respect to a probability distribution, then we need to maintain the normalization constraint on the probabilities. This is often most conveniently done using a Lagrange multiplier, which then allows an unconstrained optimization to be performed. 

The extension of the above results to a multidimensional variable x is straightforward. For a more comprehensive discussion of the calculus of variations, see Sagan (1969). 

## Appendix E. Lagrange Multipliers

Lagrange multipliers, also sometimes called undetermined multipliers, are used to find the stationary points of a function of several variables subject to one or more constraints. 

Consider the problem of finding the maximum of a function $f ( x _ { 1 } , x _ { 2 } )$ subject to a constraint relating $x _ { 1 }$ and $x _ { 2 }$ , which we write in the form 

$$
g (x _ {1}, x _ {2}) = 0.\tag{E.1}
$$

One approach would be to solve the constraint equation (E.1) and thus express $x _ { 2 }$ as a function of $x _ { 1 }$ in the form $x _ { 2 } = h ( x _ { 1 } )$ . This can then be substituted into $f ( x _ { 1 } , x _ { 2 } )$ to give a function of $x _ { 1 }$ alone of the form $f ( x _ { 1 } , h ( x _ { 1 } ) )$ . The maximum with respect to $x _ { 1 }$ could then be found by differentiation in the usual way, to give the stationary value $x _ { 1 } ^ { \star }$ , with the corresponding value of $x _ { 2 }$ given by $x _ { 2 } ^ { \star } = h ( x _ { 1 } ^ { \star } )$ 

One problem with this approach is that it may be difficult to find an analytic solution of the constraint equation that allows $x _ { 2 }$ to be expressed as an explicit function of $x _ { 1 }$ . Also, this approach treats $x _ { 1 }$ and $x _ { 2 }$ differently and so spoils the natural symmetry between these variables. 

A more elegant, and often simpler, approach is based on the introduction of a parameter λ called a Lagrange multiplier. We shall motivate this technique from a geometrical perspective. Consider a D-dimensional variable x with components $x _ { 1 } , \ldots , x _ { D }$ . The constraint equation $g ( \mathbf { x } ) = 0$ then represents a $( D - 1 )$ -dimensional surface in x-space as indicated in Figure E.1. 

We first note that at any point on the constraint surface the gradient $\nabla g ( \mathbf { x } )$ of the constraint function will be orthogonal to the surface. To see this, consider a point x that lies on the constraint surface, and consider a nearby point $\mathbf { x } + \epsilon$ that also lies on the surface. If we make a Taylor expansion around x, we have 

$$
g (\mathbf {x} + \boldsymbol {\epsilon}) \simeq g (\mathbf {x}) + \boldsymbol {\epsilon} ^ {\mathrm{T}} \nabla g (\mathbf {x}).\tag{E.2}
$$

Because both x and $\mathbf { x } + \epsilon$ lie on the constraint surface, we have $g ( \mathbf { x } ) = g ( \mathbf { x } + \epsilon )$ and hence $\epsilon ^ { \mathrm { T } } \nabla g ( \mathbf { x } ) \simeq 0$ . In the limit $\| \epsilon \|  0$ we have $\epsilon ^ { \mathrm { T } } \nabla g ( \mathbf { x } ) \bar { = } \mathrm { ~ 0 ~ }$ , and because  is 

Figure E.1 A geometrical picture of the technique of Lagrange multipliers in which we seek to maximize a function $f ( \mathbf { x } )$ , subject to the constraint $g ( \mathbf { x } ) = 0$ If x is D dimensional, the constraint $g ( \mathbf { x } ) = 0$ corresponds to a subspace of dimensionality $D - 1$ indicated by the red curve. The problem can be solved by optimizing the Lagrangian function $L ( \mathbf { x } , \lambda ) = f ( \mathbf { x } ) \dot { + } \lambda g ( \mathbf { x } )$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/a88368c0c0c7ba7a16b3d41b332e7f49c19605081ad88efea165c451e4f768d5.jpg)


then parallel to the constraint surface $g ( \mathbf { x } ) = 0$ , we see that the vector $\nabla g$ is normal to the surface. 

Next we seek a point $\mathbf { x } ^ { \star }$ on the constraint surface such that $f ( \mathbf { x } )$ is maximized. Such a point must have the property that the vector $\nabla f ( \mathbf { x } )$ is also orthogonal to the constraint surface, as illustrated in Figure E.1, because otherwise we could increase the value of $f ( \mathbf { x } )$ by moving a short distance along the constraint surface. Thus $\nabla f$ and $\nabla g$ are parallel (or anti-parallel) vectors, and so there must exist a parameter λ such that 

$$
\nabla f + \lambda \nabla g = 0\tag{E.3}
$$

where $\lambda \neq 0$ is known as a Lagrange multiplier. Note that λ can have either sign. 

At this point, it is convenient to introduce the Lagrangian function defined by 

$$
L (\mathbf {x}, \lambda) \equiv f (\mathbf {x}) + \lambda g (\mathbf {x}).\tag{E.4}
$$

The constrained stationarity condition (E.3) is obtained by setting $\nabla _ { \mathbf x } L = 0$ . Furthermore, the condition $\partial { \cal L } / \partial \lambda = 0$ leads to the constraint equation $g ( \mathbf { x } ) = 0$ 

Thus to find the maximum of a function $f ( \mathbf { x } )$ subject to the constraint $g ( \mathbf { x } ) = 0$ we define the Lagrangian function given by (E.4) and we then find the stationary point of $L ( \mathbf { x } , \lambda )$ with respect to both x and λ. For a D-dimensional vector x, this gives $D + 1$ equations that determine both the stationary point $\mathbf { x } ^ { \star }$ and the value of λ. If we are only interested in $\mathbf { x } ^ { \star }$ , then we can eliminate λ from the stationarity equations without needing to find its value (hence the term ‘undetermined multiplier’). 

As a simple example, suppose we wish to find the stationary point of the function $f ( x _ { 1 } , x _ { 2 } ) = \overset { \cdot } { 1 } - x _ { 1 } ^ { 2 } - \overset { \cdot } { x } _ { 2 } ^ { 2 }$ subject to the constraint $g ( x _ { 1 } , x _ { 2 } ) = x _ { 1 } + x _ { 2 } - 1 = 0$ , as illustrated in Figure E.2. The corresponding Lagrangian function is given by 

$$
L (\mathbf {x}, \lambda) = 1 - x _ {1} ^ {2} - x _ {2} ^ {2} + \lambda (x _ {1} + x _ {2} - 1).\tag{E.5}
$$

The conditions for this Lagrangian to be stationary with respect to $x _ { 1 } , x _ { 2 }$ , and λ give the following coupled equations: 

$$
- 2 x _ {1} + \lambda = 0\tag{E.6}
$$

$$
- 2 x _ {2} + \lambda = 0\tag{E.7}
$$

$$
x _ {1} + x _ {2} - 1 = 0.\tag{E.8}
$$


Figure E.2 A simple example of the use of Lagrange multipliers in which the aim is to maximize $f ( x _ { 1 } , x _ { 2 } ) ~ =$ $1 - x _ { 1 } ^ { 2 } - x _ { 2 } ^ { 2 }$ subject to the constraint $g ( x _ { 1 } , x _ { 2 } ) = 0$ where $g ( x _ { 1 } , x _ { 2 } ) = x _ { 1 } + x _ { 2 } - 1$ . The circles show contours of the function $f ( x _ { 1 } , x _ { 2 } )$ , and the diagonal line shows the constraint surface $g ( x _ { 1 } , x _ { 2 } ) = \bar { 0 }$


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/179a03d90254344764cc2a924cba141c32f16aaf51a3bf3719fb6cfe7020c968.jpg)


Solution of these equations then gives the stationary point as $\begin{array} { r } { ( x _ { 1 } ^ { \star } , x _ { 2 } ^ { \star } ) = ( \frac { 1 } { 2 } , \frac { 1 } { 2 } ) } \end{array}$ , and the corresponding value for the Lagrange multiplier is $\lambda = 1$ 

So far, we have considered the problem of maximizing a function subject to an equality constraint of the form $g ( \mathbf { x } ) = 0$ . We now consider the problem of maximizing $f ( \mathbf { x } )$ subject to an inequality constraint of the form $g ( \mathbf { x } ) \geqslant 0$ , as illustrated in Figure E.3. 

There are now two kinds of solution possible, according to whether the constrained stationary point lies in the region where $g ( \mathbf { x } ) > 0$ , in which case the constraint is inactive, or whether it lies on the boundary $g ( \mathbf { x } ) = 0$ , in which case the constraint is said to be active. In the former case, the function $g ( \mathbf { x } )$ plays no role and so the stationary condition is simply $\nabla f ( \mathbf { x } ) = 0$ . This again corresponds to a stationary point of the Lagrange function (E.4) but this time with $\lambda = 0$ . The latter case, where the solution lies on the boundary, is analogous to the equality constraint discussed previously and corresponds to a stationary point of the Lagrange function (E.4) with $\lambda \neq 0$ . Now, however, the sign of the Lagrange multiplier is crucial, because the function $f ( \mathbf { x } )$ will only be at a maximum if its gradient is oriented away from the region $g ( \mathbf { x } ) > 0$ , as illustrated in Figure E.3. We therefore have $\nabla f ( \mathbf { x } ) = - \lambda \nabla g ( \mathbf { x } )$ for some value of $\lambda > 0$ 

For either of these two cases, the product $\lambda g ( \mathbf { x } ) = 0$ . Thus the solution to the problem of maximizing $f ( \mathbf { x } )$ subject to $g ( \mathbf { x } ) ~ \geqslant ~ 0$ is obtained by optimizing the Lagrange function (E.4) with respect to x and λ subject to the conditions 


Figure E.3 Illustration of the problem of maximizing $f ( \mathbf { x } )$ subject to the inequality constraint $g ( \mathbf { x } ) \geqslant 0$


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/e0da47f0-20db-445f-83be-e0f02173da0a/f988eb5a5460fa9da7a5db9d90658798a22153b4d7689a0d013b74ff264502df.jpg)


$$
g (\mathbf {x}) \geqslant 0
$$

$$
\lambda \geqslant 0\tag{E.9}
$$

$$
\lambda g (\mathbf {x}) = 0\tag{E.10}
$$

(E.11) 

These are known as the Karush-Kuhn-Tucker (KKT) conditions (Karush, 1939; Kuhn and Tucker, 1951). 

Note that if we wish to minimize (rather than maximize) the function $f ( \mathbf { x } )$ subject to an inequality constraint $g ( \mathbf { x } ) \geqslant 0$ , then we minimize the Lagrangian function $L ( \mathbf { x } , \lambda ) = f ( \mathbf { \bar { x } } ) - \lambda g ( \mathbf { x } )$ with respect to x, again subject to $\lambda \geqslant 0$ 

Finally, it is straightforward to extend the technique of Lagrange multipliers to the case of multiple equality and inequality constraints. Suppose we wish to maximize $f ( \mathbf { x } )$ subject to $g _ { j } ( \mathbf { x } ) = 0 \operatorname { f o r } j = 1 , \ldots , J ,$ , and $h _ { k } ( { \bf x } ) \geqslant 0$ for $k = 1 , \ldots , K$ We then introduce Lagrange multipliers $\{ \lambda _ { j } \}$ and $\{ \mu _ { k } \}$ , and then optimize the Lagrangian function given by 

$$
L (\mathbf {x}, \{\lambda_ {j} \}, \{\mu_ {k} \}) = f (\mathbf {x}) + \sum_ {j = 1} ^ {J} \lambda_ {j} g _ {j} (\mathbf {x}) + \sum_ {k = 1} ^ {K} \mu_ {k} h _ {k} (\mathbf {x})\tag{E.12}
$$

subject to $\mu _ { k } \geqslant 0$ and $\mu _ { k } h _ { k } ( { \bf x } ) = 0$ for $k = 1 , \ldots , K$ . Extensions to constrained functional derivatives are similarly straightforward. For a more detailed discussion of the technique of Lagrange multipliers, see Nocedal and Wright (1999). 

## References



Abramowitz, M. and I. A. Stegun (1965). Handbook ofMathematical Functions. Dover. 





Adler, S. L. (1981). Over-relaxation method for the Monte Carlo evaluation of the partition function for multiquadratic actions. Physical Review D 23, 2901–2904. 





Ahn, J. H. and J. H. Oh (2003). A constrained EM algorithm for principal component analysis. Neural Computation 15(1), 57–65. 





Aizerman, M. A., E. M. Braverman, and L. I. Rozonoer (1964). The probability problem of pattern recognition learning and the method of potential functions. Automation and Remote Control 25, 1175–1190. 





Akaike, H. (1974). A new look at statistical model identification. IEEE Transactions on Automatic Control 19, 716–723. 





Ali, S. M. and S. D. Silvey (1966). A general class of coefficients of divergence of one distribution from another. Journal ofthe Royal Statistical Society, B 28(1), 131–142. 





Allwein, E. L., R. E. Schapire, and Y. Singer (2000). Reducing multiclass to binary: a unifying approach for margin classifiers. Journal ofMachine Learning Research 1, 113–141. 





Amari, S. (1985). Differential-Geometrical Methods in Statistics. Springer. 





Amari, S., A. Cichocki, and H. H. Yang (1996). A new learning algorithm for blind signal separation. In D. S. Touretzky, M. C. Mozer, and M. E. Hasselmo (Eds.), Advances in Neural Information Processing Systems, Volume 8, pp. 757–763. MIT Press. 





Amari, S. I. (1998). Natural gradient works efficiently in learning. Neural Computation 10, 251–276. 





Anderson, J. A. and E. Rosenfeld (Eds.) (1988). Neurocomputing: Foundations of Research. MIT Press. 





Anderson, T. W. (1963). Asymptotic theory for principal component analysis. Annals of Mathematical Statistics 34, 122–148. 





Andrieu, C., N. de Freitas, A. Doucet, and M. I. Jordan (2003). An introduction to MCMC for machine learning. Machine Learning 50, 5–43. 





Anthony, M. and N. Biggs (1992). An Introduction to Computational Learning Theory. Cambridge University Press. 





Attias, H. (1999a). Independent factor analysis. Neural Computation 11(4), 803–851. 





Attias, H. (1999b). Inferring parameters and structure of latent variable models by variational Bayes. In K. B. Laskey and H. Prade (Eds.), 





Uncertainty in Artificial Intelligence: Proceedings of the Fifth Conference, pp. 21–30. Morgan Kaufmann. 





Bach, F. R. and M. I. Jordan (2002). Kernel independent component analysis. Journal ofMachine Learning Research 3, 1–48. 





Bakir, G. H., J. Weston, and B. Scholkopf (2004).¨ Learning to find pre-images. In S. Thrun, L. K. Saul, and B. Scholkopf (Eds.),¨ Advances in Neural Information Processing Systems, Volume 16, pp. 449–456. MIT Press. 





Baldi, P. and S. Brunak (2001). Bioinformatics: The Machine Learning Approach (Second ed.). MIT Press. 





Baldi, P. and K. Hornik (1989). Neural networks and principal component analysis: learning from examples without local minima. Neural Networks 2(1), 53–58. 





Barber, D. and C. M. Bishop (1997). Bayesian model comparison by Monte Carlo chaining. In M. Mozer, M. Jordan, and T. Petsche (Eds.), Advances in Neural Information Processing Systems, Volume 9, pp. 333–339. MIT Press. 





Barber, D. and C. M. Bishop (1998a). Ensemble learning for multi-layer networks. In M. I. Jordan, K. J. Kearns, and S. A. Solla (Eds.), Advances in Neural Information Processing Systems, Volume 10, pp. 395–401. 





Barber, D. and C. M. Bishop (1998b). Ensemble learning in Bayesian neural networks. In C. M. Bishop (Ed.), Generalization in Neural Networks and Machine Learning, pp. 215–237. Springer. 





Bartholomew, D. J. (1987). Latent Variable Models and Factor Analysis. Charles Griffin. 





Basilevsky, A. (1994). Statistical Factor Analysis and Related Methods: Theory and Applications. Wiley. 





Bather, J. (2000). Decision Theory: An Introduction to Dynamic Programming and Sequential Decisions. Wiley. 





Baudat, G. and F. Anouar (2000). Generalized discriminant analysis using a kernel approach. Neural Computation 12(10), 2385–2404. 





Baum, L. E. (1972). An inequality and associated maximization technique in statistical estimation of probabilistic functions of Markov processes. Inequalities 3, 1–8. 





Becker, S. and Y. Le Cun (1989). Improving the convergence of back-propagation learning with second order methods. In D. Touretzky, G. E. Hinton, and T. J. Sejnowski (Eds.), Proceedings of the 1988 Connectionist Models Summer School, pp. 29–37. Morgan Kaufmann. 





Bell, A. J. and T. J. Sejnowski (1995). An information maximization approach to blind separation and blind deconvolution. Neural Computation 7(6), 1129–1159. 





Bellman, R. (1961). Adaptive Control Processes: A Guided Tour. Princeton University Press. 





Bengio, Y. and P. Frasconi (1995). An input output HMM architecture. In G. Tesauro, D. S. Touretzky, and T. K. Leen (Eds.), Advances in Neural Information Processing Systems, Volume 7, pp. 427–434. MIT Press. 





Bennett, K. P. (1992). Robust linear programming discrimination of two linearly separable sets. Optimization Methods and Software 1, 23–34. 





Berger, J. O. (1985). Statistical Decision Theory and Bayesian Analysis (Second ed.). Springer. 





Bernardo, J. M. and A. F. M. Smith (1994). Bayesian Theory. Wiley. 





Berrou, C., A. Glavieux, and P. Thitimajshima (1993). Near Shannon limit error-correcting coding and decoding: Turbo-codes (1). In Proceedings ICC’93, pp. 1064–1070. 





Besag, J. (1974). On spatio-temporal models and Markov fields. In Transactions of the 7th Prague Conference on Information Theory, Statistical Decision Functions and Random Processes, pp. 47–75. Academia. 





Besag, J. (1986). On the statistical analysis of dirty pictures. Journal of the Royal Statistical Society B-48, 259–302. 





Besag, J., P. J. Green, D. Hidgon, and K. Megersen (1995). Bayesian computation and stochastic systems. Statistical Science 10(1), 3–66. 





Bishop, C. M. (1991). A fast procedure for retraining the multilayer perceptron. International Journal ofNeural Systems 2(3), 229–236. 





Bishop, C. M. (1992). Exact calculation of the Hessian matrix for the multilayer perceptron. Neural Computation 4(4), 494–501. 





Bishop, C. M. (1993). Curvature-driven smoothing: a learning algorithm for feedforward networks. IEEE Transactions on Neural Networks 4(5), 882–884. 





Bishop, C. M. (1994). Novelty detection and neural network validation. IEE Proceedings: Vision, Image and Signal Processing 141(4), 217–222. Special issue on applications of neural networks. 





Bishop, C. M. (1995a). Neural Networks for Pattern Recognition. Oxford University Press. 





Bishop, C. M. (1995b). Training with noise is equivalent to Tikhonov regularization. Neural Computation 7(1), 108–116. 





Bishop, C. M. (1999a). Bayesian PCA. In M. S. Kearns, S. A. Solla, and D. A. Cohn (Eds.), Advances in Neural Information Processing Systems, Volume 11, pp. 382–388. MIT Press. 





Bishop, C. M. (1999b). Variational principal components. In Proceedings Ninth International Conference on Artificial Neural Networks, ICANN’99, Volume 1, pp. 509–514. IEE. 





Bishop, C. M. and G. D. James (1993). Analysis of multiphase flows using dual-energy gamma densitometry and neural networks. Nuclear Instruments and Methods in Physics Research A327, 580–593. 





Bishop, C. M. and I. T. Nabney (1996). Modelling conditional probability distributions for periodic variables. Neural Computation 8(5), 1123–1133. 





Bishop, C. M. and I. T. Nabney (2008). Pattern Recognition and Machine Learning: A Matlab Companion. Springer. In preparation. 





Bishop, C. M., D. Spiegelhalter, and J. Winn (2003). VIBES: A variational inference engine for Bayesian networks. In S. Becker, S. Thrun, and K. Obermeyer (Eds.), Advances in Neural 





Information Processing Systems, Volume 15, pp. 793–800. MIT Press. 





Bishop, C. M. and M. Svensen (2003). Bayesian hi-´ erarchical mixtures of experts. In U. Kjaerulff and C. Meek (Eds.), Proceedings Nineteenth Conference on Uncertainty in Artificial Intelligence, pp. 57–64. Morgan Kaufmann. 





Bishop, C. M., M. Svensen, and G. E. Hinton ´ (2004). Distinguishing text from graphics in online handwritten ink. In F. Kimura and H. Fujisawa (Eds.), Proceedings Ninth International Workshop on Frontiers in Handwriting Recognition, IWFHR-9, Tokyo, Japan, pp. 142–147. 





Bishop, C. M., M. Svensen, and C. K. I. Williams ´ (1996). EM optimization of latent variable density models. In D. S. Touretzky, M. C. Mozer, and M. E. Hasselmo (Eds.), Advances in Neural Information Processing Systems, Volume 8, pp. 465–471. MIT Press. 





Bishop, C. M., M. Svensen, and C. K. I. Williams´ (1997a). GTM: a principled alternative to the Self-Organizing Map. In M. C. Mozer, M. I. Jordan, and T. Petche (Eds.), Advances in Neural Information Processing Systems, Volume 9, pp. 354–360. MIT Press. 





Bishop, C. M., M. Svensen, and C. K. I. Williams ´ (1997b). Magnification factors for the GTM algorithm. In Proceedings IEE Fifth International Conference on Artificial Neural Networks, Cambridge, U.K., pp. 64–69. Institute of Electrical Engineers. 





Bishop, C. M., M. Svensen, and C. K. I. Williams´ (1998a). Developments of the Generative Topographic Mapping. Neurocomputing 21, 203– 224. 





Bishop, C. M., M. Svensen, and C. K. I. Williams´ (1998b). GTM: the Generative Topographic Mapping. Neural Computation 10(1), 215–234. 





Bishop, C. M. and M. E. Tipping (1998). A hierarchical latent variable model for data visualization. IEEE Transactions on Pattern Analysis and Machine Intelligence 20(3), 281–293. 





Bishop, C. M. and J. Winn (2000). Non-linear Bayesian image modelling. In Proceedings Sixth European Conference on Computer Vision, Dublin, Volume 1, pp. 3–17. Springer. 





Blei, D. M., M. I. Jordan, and A. Y. Ng (2003). Hierarchical Bayesian models for applications in information retrieval. In J. M. B. et al. (Ed.), Bayesian Statistics, 7, pp. 25–43. Oxford University Press. 





Block, H. D. (1962). The perceptron: a model for brain functioning. Reviews of Modern Physics 34(1), 123–135. Reprinted in Anderson and Rosenfeld (1988). 





Blum, J. A. (1965). Multidimensional stochastic approximation methods. Annals of Mathematical Statistics 25, 737–744. 





Bodlaender, H. (1993). A tourist guide through treewidth. Acta Cybernetica 11, 1–21. 





Boser, B. E., I. M. Guyon, and V. N. Vapnik (1992). A training algorithm for optimal margin classifiers. In D. Haussler (Ed.), Proceedings Fifth Annual Workshop on Computational Learning Theory (COLT), pp. 144–152. ACM. 





Bourlard, H. and Y. Kamp (1988). Auto-association by multilayer perceptrons and singular value decomposition. Biological Cybernetics 59, 291– 294. 





Box, G. E. P., G. M. Jenkins, and G. C. Reinsel (1994). Time Series Analysis. Prentice Hall. 





Box, G. E. P. and G. C. Tao (1973). Bayesian Inference in Statistical Analysis. Wiley. 





Boyd, S. and L. Vandenberghe (2004). Convex Opti mization. Cambridge University Press. 





Boyen, X. and D. Koller (1998). Tractable inference for complex stochastic processes. In G. F. Cooper and S. Moral (Eds.), Proceedings 14th Annual Conference on Uncertainty in Artificial Intelligence (UAI), pp. 33–42. Morgan Kaufmann. 





Boykov, Y., O. Veksler, and R. Zabih (2001). Fast approximate energy minimization via graph cuts. IEEE Transactions on Pattern Analysis and Machine Intelligence 23(11), 1222–1239. 





Breiman, L. (1996). Bagging predictors. Machine Learning 26, 123–140. 





Breiman, L., J. H. Friedman, R. A. Olshen, and P. J. Stone (1984). Classification and Regression Trees. Wadsworth. 





Brooks, S. P. (1998). Markov chain Monte Carlo method and its application. The Statistician 47(1), 69–100. 





Broomhead, D. S. and D. Lowe (1988). Multivariable functional interpolation and adaptive networks. Complex Systems 2, 321–355. 





Buntine, W. and A. Weigend (1991). Bayesian backpropagation. Complex Systems 5, 603–643. 





Buntine, W. L. and A. S. Weigend (1993). Computing second derivatives in feed-forward networks: a review. IEEE Transactions on Neural Networks 5(3), 480–488. 





Burges, C. J. C. (1998). A tutorial on support vector machines for pattern recognition. Knowledge Discovery and Data Mining 2(2), 121–167. 





Cardoso, J.-F. (1998). Blind signal separation: statistical principles. Proceedings of the IEEE 9(10), 2009–2025. 





Casella, G. and R. L. Berger (2002). Statistical Inference (Second ed.). Duxbury. 





Castillo, E., J. M. Gutierrez, and A. S. Hadi (1997).´ Expert Systems and Probabilistic Network Models. Springer. 





Chan, K., T. Lee, and T. J. Sejnowski (2003). Variational Bayesian learning of ICA with missing data. Neural Computation 15(8), 1991–2011. 





Chen, A. M., H. Lu, and R. Hecht-Nielsen (1993). On the geometry of feedforward neural network error surfaces. Neural Computation 5(6), 910– 927. 





Chen, M. H., Q. M. Shao, and J. G. Ibrahim (Eds.) (2001). Monte Carlo Methodsfor Bayesian Computation. Springer. 





Chen, S., C. F. N. Cowan, and P. M. Grant (1991). Orthogonal least squares learning algorithm for radial basis function networks. IEEE Transactions on Neural Networks 2(2), 302–309. 





Choudrey, R. A. and S. J. Roberts (2003). Variational mixture of Bayesian independent component analyzers. Neural Computation 15(1), 213–252. 





Clifford, P. (1990). Markov random fields in statistics. In G. R. Grimmett and D. J. A. Welsh (Eds.), Disorder in Physical Systems. A Volume in Honour of John M. Hammersley, pp. 19–32. Oxford University Press. 





Collins, M., S. Dasgupta, and R. E. Schapire (2002). A generalization of principal component analysis to the exponential family. In T. G. Dietterich, S. Becker, and Z. Ghahramani (Eds.), Advances in Neural Information Processing Systems, Volume 14, pp. 617–624. MIT Press. 





Comon, P., C. Jutten, and J. Herault (1991). Blind source separation, 2: problems statement. Signal Processing 24(1), 11–20. 





Corduneanu, A. and C. M. Bishop (2001). Variational Bayesian model selection for mixture distributions. In T. Richardson and T. Jaakkola (Eds.), Proceedings Eighth International Conference on Artificial Intelligence and Statistics, pp. 27–34. Morgan Kaufmann. 





Cormen, T. H., C. E. Leiserson, R. L. Rivest, and C. Stein (2001). Introduction to Algorithms (Second ed.). MIT Press. 





Cortes, C. and V. N. Vapnik (1995). Support vector networks. Machine Learning 20, 273–297. 





Cotter, N. E. (1990). The Stone-Weierstrass theorem and its application to neural networks. IEEE Transactions on Neural Networks 1(4), 290–295. 





Cover, T. and P. Hart (1967). Nearest neighbor pattern classification. IEEE Transactions on Information Theory IT-11, 21–27. 





Cover, T. M. and J. A. Thomas (1991). Elements of Information Theory. Wiley. 





Cowell, R. G., A. P. Dawid, S. L. Lauritzen, and D. J. Spiegelhalter (1999). Probabilistic Networks and Expert Systems. Springer. 





Cox, R. T. (1946). Probability, frequency and reasonable expectation. American Journal of Physics 14(1), 1–13. 





Cox, T. F. and M. A. A. Cox (2000). Multidimensional Scaling (Second ed.). Chapman and Hall. 





Cressie, N. (1993). Statistics for Spatial Data. Wiley. 





Cristianini, N. and J. Shawe-Taylor (2000). Support vector machines and other kernel-based learning methods. Cambridge University Press. 





Csato, L. and M. Opper (2002). Sparse on-line Gaus-´ sian processes. Neural Computation 14(3), 641– 668. 





Csiszar, I. and G. Tusn` ady (1984). Information ge-` ometry and alternating minimization procedures. Statistics and Decisions 1(1), 205–237. 





Cybenko, G. (1989). Approximation by superpositions of a sigmoidal function. Mathematics of Control, Signals and Systems 2, 304–314. 





Dawid, A. P. (1979). Conditional independence in statistical theory (with discussion). Journal ofthe Royal Statistical Society, Series B 4, 1–31. 





Dawid, A. P. (1980). Conditional independence for statistical operations. Annals of Statistics 8, 598– 617. 





deFinetti, B. (1970). Theory of Probability. Wiley and Sons. 





Dempster, A. P., N. M. Laird, and D. B. Rubin (1977). Maximum likelihood from incomplete data via the EM algorithm. Journal of the Royal Statistical Society, B 39(1), 1–38. 





Denison, D. G. T., C. C. Holmes, B. K. Mallick, and A. F. M. Smith (2002). Bayesian Methodsfor Nonlinear Classification and Regression. Wiley. 





Diaconis, P. and L. Saloff-Coste (1998). What do we know about the Metropolis algorithm? Journal ofComputer and System Sciences 57, 20–36. 





Dietterich, T. G. and G. Bakiri (1995). Solving multiclass learning problems via error-correcting output codes. Journal of Artificial Intelligence Research 2, 263–286. 





Duane, S., A. D. Kennedy, B. J. Pendleton, and D. Roweth (1987). Hybrid Monte Carlo. Physics Letters B 195(2), 216–222. 





Duda, R. O. and P. E. Hart (1973). Pattern Classification and Scene Analysis. Wiley. 





Duda, R. O., P. E. Hart, and D. G. Stork (2001). Pattern Classification (Second ed.). Wiley. 





Durbin, R., S. Eddy, A. Krogh, and G. Mitchison (1998). Biological Sequence Analysis. Cambridge University Press. 





Dybowski, R. and S. Roberts (2005). An anthology of probabilistic models for medical informatics. In D. Husmeier, R. Dybowski, and S. Roberts (Eds.), Probabilistic Modeling in Bioinformatics and Medical Informatics, pp. 297–349. Springer. 





Efron, B. (1979). Bootstrap methods: another look at the jackknife. Annals ofStatistics 7, 1–26. 





Elkan, C. (2003). Using the triangle inequality to accelerate k-means. In Proceedings of the Twelfth International Conference on Machine Learning, pp. 147–153. AAAI. 





Elliott, R. J., L. Aggoun, and J. B. Moore (1995). Hidden Markov Models: Estimation and Control. Springer. 





Ephraim, Y., D. Malah, and B. H. Juang (1989). On the application of hidden Markov models for enhancing noisy speech. IEEE Transactions on Acoustics, Speech and Signal Processing 37(12), 1846–1856. 





Erwin, E., K. Obermayer, and K. Schulten (1992). Self-organizing maps: ordering, convergence properties and energy functions. Biological Cybernetics 67, 47–55. 





Everitt, B. S. (1984). An Introduction to Latent Variable Models. Chapman and Hall. 





Faul, A. C. and M. E. Tipping (2002). Analysis of sparse Bayesian learning. In T. G. Dietterich, S. Becker, and Z. Ghahramani (Eds.), Advances in Neural Information Processing Systems, Volume 14, pp. 383–389. MIT Press. 





Feller, W. (1966). An Introduction to Probability Theory and its Applications (Second ed.), Volume 2. Wiley. 





Feynman, R. P., R. B. Leighton, and M. Sands (1964). The Feynman Lectures of Physics, Volume Two. Addison-Wesley. Chapter 19. 





Fletcher, R. (1987). Practical Methods of Optimization (Second ed.). Wiley. 





Forsyth, D. A. and J. Ponce (2003). Computer Vi sion: A Modern Approach. Prentice Hall. 





Freund, Y. and R. E. Schapire (1996). Experiments with a new boosting algorithm. In L. Saitta (Ed.), Thirteenth International Conference on Machine Learning, pp. 148–156. Morgan Kaufmann. 





Frey, B. J. (1998). Graphical Models for Machine Learning and Digital Communication. MIT Press. 





Frey, B. J. and D. J. C. MacKay (1998). A revolution: Belief propagation in graphs with cycles. In M. I. Jordan, M. J. Kearns, and S. A. Solla (Eds.), Advances in Neural Information Processing Systems, Volume 10. MIT Press. 





Friedman, J. H. (2001). Greedy function approximation: a gradient boosting machine. Annals of Statistics 29(5), 1189–1232. 





Friedman, J. H., T. Hastie, and R. Tibshirani (2000). Additive logistic regression: a statistical view of boosting. Annals ofStatistics 28, 337–407. 





Friedman, N. and D. Koller (2003). Being Bayesian about network structure: A Bayesian approach to structure discovery in Bayesian networks. Machine Learning 50, 95–126. 





Frydenberg, M. (1990). The chain graph Markov property. Scandinavian Journal of Statistics 17, 333–353. 





Fukunaga, K. (1990). Introduction to Statistical Pattern Recognition (Second ed.). Academic Press. 





Funahashi, K. (1989). On the approximate realization of continuous mappings by neural networks. Neural Networks 2(3), 183–192. 





Fung, R. and K. C. Chang (1990). Weighting and integrating evidence for stochastic simulation in Bayesian networks. In P. P. Bonissone, M. Henrion, L. N. Kanal, and J. F. Lemmer (Eds.), Uncertainty in Artificial Intelligence, Volume 5, pp. 208–219. Elsevier. 





Gallager, R. G. (1963). Low-Density Parity-Check Codes. MIT Press. 





Gamerman, D. (1997). Markov Chain Monte Carlo: Stochastic Simulation for Bayesian Inference. Chapman and Hall. 





Gelman, A., J. B. Carlin, H. S. Stern, and D. B. Rubin (2004). Bayesian Data Analysis (Second ed.). Chapman and Hall. 





Geman, S. and D. Geman (1984). Stochastic relaxation, Gibbs distributions, and the Bayesian restoration of images. IEEE Transactions on Pattern Analysis and Machine Intelligence 6(1), 721–741. 





Ghahramani, Z. and M. J. Beal (2000). Variational inference for Bayesian mixtures of factor analyzers. In S. A. Solla, T. K. Leen, and K. R. Muller (Eds.), ¨ Advances in Neural Information Processing Systems, Volume 12, pp. 449–455. MIT Press. 





Ghahramani, Z. and G. E. Hinton (1996a). The EM algorithm for mixtures of factor analyzers. Technical Report CRG-TR-96-1, University of Toronto. 





Ghahramani, Z. and G. E. Hinton (1996b). Parameter estimation for linear dynamical systems. Technical Report CRG-TR-96-2, University of Toronto. 





Ghahramani, Z. and G. E. Hinton (1998). Variational learning for switching state-space models. Neural Computation 12(4), 963–996. 





Ghahramani, Z. and M. I. Jordan (1994). Supervised learning from incomplete data via an EM appproach. In J. D. Cowan, G. T. Tesauro, and J. Alspector (Eds.), Advances in Neural Information Processing Systems, Volume 6, pp. 120–127. Morgan Kaufmann. 





Ghahramani, Z. and M. I. Jordan (1997). Factorial hidden Markov models. Machine Learning 29, 245–275. 





Gibbs, M. N. (1997). Bayesian Gaussian processes for regression and classification. Phd thesis, University of Cambridge. 





Gibbs, M. N. and D. J. C. MacKay (2000). Variational Gaussian process classifiers. IEEE Transactions on Neural Networks 11, 1458–1464. 





Gilks, W. R. (1992). Derivative-free adaptive rejection sampling for Gibbs sampling. In J. Bernardo, J. Berger, A. P. Dawid, and A. F. M. Smith (Eds.), Bayesian Statistics, Volume 4. Oxford University Press. 





Gilks, W. R., N. G. Best, and K. K. C. Tan (1995). Adaptive rejection Metropolis sampling. Applied Statistics 44, 455–472. 





Gilks, W. R., S. Richardson, and D. J. Spiegelhalter (Eds.) (1996). Markov Chain Monte Carlo in Practice. Chapman and Hall. 





Gilks, W. R. and P. Wild (1992). Adaptive rejection sampling for Gibbs sampling. Applied Statistics 41, 337–348. 





Gill, P. E., W. Murray, and M. H. Wright (1981). Practical Optimization. Academic Press. 





Goldberg, P. W., C. K. I. Williams, and C. M. Bishop (1998). Regression with input-dependent noise: A Gaussian process treatment. In Advances in Neural Information Processing Systems, Volume 10, pp. 493–499. MIT Press. 





Golub, G. H. and C. F. Van Loan (1996). Matrix Computations (Third ed.). John Hopkins University Press. 





Good, I. (1950). Probability and the Weighing ofEvidence. Hafners. 





Gordon, N. J., D. J. Salmond, and A. F. M. Smith (1993). Novel approach to nonlinear/non-Gaussian Bayesian state estimation. IEE Proceedings-F 140(2), 107–113. 





Graepel, T. (2003). Solving noisy linear operator equations by Gaussian processes: Application to ordinary and partial differential equations. In Proceedings of the Twentieth International Conference on Machine Learning, pp. 234–241. 





Greig, D., B. Porteous, and A. Seheult (1989). Exact maximum a-posteriori estimation for binary images. Journal of the Royal Statistical Society, Series B 51(2), 271–279. 





Gull, S. F. (1989). Developments in maximum entropy data analysis. In J. Skilling (Ed.), Maximum Entropy and Bayesian Methods, pp. 53–71. Kluwer. 





Hassibi, B. and D. G. Stork (1993). Second order derivatives for network pruning: optimal brain surgeon. In S. J. Hanson, J. D. Cowan, and C. L. Giles (Eds.), Advances in Neural Information Processing Systems, Volume 5, pp. 164–171. Morgan Kaufmann. 





Hastie, T. and W. Stuetzle (1989). Principal curves. Journal of the American Statistical Association 84(106), 502–516. 





Hastie, T., R. Tibshirani, and J. Friedman (2001). The Elements of Statistical Learning. Springer. 





Hastings, W. K. (1970). Monte Carlo sampling methods using Markov chains and their applications. Biometrika 57, 97–109. 





Hathaway, R. J. (1986). Another interpretation of the EM algorithm for mixture distributions. Statistics and Probability Letters 4, 53–56. 





Haussler, D. (1999). Convolution kernels on discrete structures. Technical Report UCSC-CRL-99-10, University of California, Santa Cruz, Computer Science Department. 





Henrion, M. (1988). Propagation of uncertainty by logic sampling in Bayes’ networks. In J. F. Lemmer and L. N. Kanal (Eds.), Uncertainty in Artificial Intelligence, Volume 2, pp. 149–164. North Holland. 





Herbrich, R. (2002). Learning Kernel Classifiers. MIT Press. 





Hertz, J., A. Krogh, and R. G. Palmer (1991). Introduction to the Theory ofNeural Computation. Addison Wesley. 





Hinton, G. E., P. Dayan, and M. Revow (1997). Modelling the manifolds of images of handwritten digits. IEEE Transactions on Neural Networks 8(1), 65–74. 





Hinton, G. E. and D. van Camp (1993). Keeping neural networks simple by minimizing the description length of the weights. In Proceedings of the Sixth Annual Conference on Computational Learning Theory, pp. 5–13. ACM. 





Hinton, G. E., M. Welling, Y. W. Teh, and S. Osindero (2001). A new view of ICA. In Proceedings 





of the International Conference on Independent Component Analysis and Blind Signal Separation, Volume 3. 





Hodgson, M. E. (1998). Reducing computational requirements of the minimum-distance classifier. Remote Sensing ofEnvironments 25, 117–128. 





Hoerl, A. E. and R. Kennard (1970). Ridge regression: biased estimation for nonorthogonal problems. Technometrics 12, 55–67. 





Hofmann, T. (2000). Learning the similarity of documents: an information-geometric approach to document retrieval and classification. In S. A. Solla, T. K. Leen, and K. R. Muller (Eds.),¨ Advances in Neural Information Processing Systems, Volume 12, pp. 914–920. MIT Press. 





Hojen-Sorensen, P. A., O. Winther, and L. K. Hansen (2002). Mean field approaches to independent component analysis. Neural Computation 14(4), 889–918. 





Hornik, K. (1991). Approximation capabilities of multilayer feedforward networks. Neural Networks 4(2), 251–257. 





Hornik, K., M. Stinchcombe, and H. White (1989). Multilayer feedforward networks are universal approximators. Neural Networks 2(5), 359–366. 





Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. Journal ofEducational Psychology 24, 417–441. 





Hotelling, H. (1936). Relations between two sets of variables. Biometrika 28, 321–377. 





Hyvarinen, A. and E. Oja (1997). A fast fixed-point¨ algorithm for independent component analysis. Neural Computation 9(7), 1483–1492. 





Isard, M. and A. Blake (1998). CONDENSATION – conditional density propagation for visual tracking. International Journal of Computer Vision 29(1), 5–18. 





Ito, Y. (1991). Representation of functions by superpositions of a step or sigmoid function and their applications to neural network theory. Neural Networks 4(3), 385–394. 





Jaakkola, T. and M. I. Jordan (2000). Bayesian parameter estimation via variational methods. Statistics and Computing 10, 25–37. 





Jaakkola, T. S. (2001). Tutorial on variational approximation methods. In M. Opper and D. Saad (Eds.), Advances in Mean Field Methods, pp. 129–159. MIT Press. 





Jaakkola, T. S. and D. Haussler (1999). Exploiting generative models in discriminative classifiers. In M. S. Kearns, S. A. Solla, and D. A. Cohn (Eds.), Advances in Neural Information Processing Systems, Volume 11. MIT Press. 





Jacobs, R. A., M. I. Jordan, S. J. Nowlan, and G. E. Hinton (1991). Adaptive mixtures of local experts. Neural Computation 3(1), 79–87. 





Jaynes, E. T. (2003). Probability Theory: The Logic ofScience. Cambridge University Press. 





Jebara, T. (2004). Machine Learning: Discriminative and Generative. Kluwer. 





Jeffries, H. (1946). An invariant form for the prior probability in estimation problems. Pro. Roy. Soc. AA 186, 453–461. 





Jelinek, F. (1997). Statistical Methods for Speech Recognition. MIT Press. 





Jensen, C., A. Kong, and U. Kjaerulff (1995). Blocking gibbs sampling in very large probabilistic expert systems. International Journal of Human Computer Studies. Special Issue on Real-World Applications of Uncertain Reasoning. 42, 647– 666. 





Jensen, F. V. (1996). An Introduction to Bayesian Networks. UCL Press. 





Jerrum, M. and A. Sinclair (1996). The Markov chain Monte Carlo method: an approach to approximate counting and integration. In D. S. Hochbaum (Ed.), Approximation Algorithms for NP-Hard Problems. PWS Publishing. 





Jolliffe, I. T. (2002). Principal Component Analysis (Second ed.). Springer. 





Jordan, M. I. (1999). Learning in Graphical Models. MIT Press. 





Jordan, M. I. (2007). An Introduction to Probabilistic Graphical Models. In preparation. 





Jordan, M. I., Z. Ghahramani, T. S. Jaakkola, and L. K. Saul (1999). An introduction to variational methods for graphical models. In M. I. Jordan (Ed.), Learning in Graphical Models, pp. 105– 162. MIT Press. 





Jordan, M. I. and R. A. Jacobs (1994). Hierarchical mixtures of experts and the EM algorithm. Neural Computation 6(2), 181–214. 





Jutten, C. and J. Herault (1991). Blind separation of sources, 1: An adaptive algorithm based on neuromimetic architecture. Signal Processing 24(1), 1–10. 





Kalman, R. E. (1960). A new approach to linear filtering and prediction problems. Transactions of the American Society for Mechanical Engineering, Series D, Journal of Basic Engineering 82, 35–45. 





Kambhatla, N. and T. K. Leen (1997). Dimension reduction by local principal component analysis. Neural Computation 9(7), 1493–1516. 





Kanazawa, K., D. Koller, and S. Russel (1995). Stochastic simulation algorithms for dynamic probabilistic networks. In Uncertainty in Artificial Intelligence, Volume 11. Morgan Kaufmann. 





Kapadia, S. (1998). Discriminative Training of Hidden Markov Models. Phd thesis, University of Cambridge, U.K. 





Kapur, J. (1989). Maximum entropy methods in science and engineering. Wiley. 





Karush, W. (1939). Minima of functions of several variables with inequalities as side constraints. Master’s thesis, Department of Mathematics, University of Chicago. 





Kass, R. E. and A. E. Raftery (1995). Bayes factors. Journal of the American Statistical Association 90, 377–395. 





Kearns, M. J. and U. V. Vazirani (1994). An Introduction to Computational Learning Theory. MIT Press. 





Kindermann, R. and J. L. Snell (1980). Markov Random Fields and Their Applications. American Mathematical Society. 





Kittler, J. and J. Foglein (1984). Contextual classifi-¨ cation of multispectral pixel data. Image and Vision Computing 2, 13–29. 





Kohonen, T. (1982). Self-organized formation of topologically correct feature maps. Biological Cybernetics 43, 59–69. 





Kohonen, T. (1995). Self-Organizing Maps. Springer. 





Kolmogorov, V. and R. Zabih (2004). What energy functions can be minimized via graph cuts? IEEE Transactions on Pattern Analysis and Machine Intelligence 26(2), 147–159. 





Kreinovich, V. Y. (1991). Arbitrary nonlinearity is sufficient to represent all functions by neural networks: a theorem. Neural Networks 4(3), 381– 383. 





Krogh, A., M. Brown, I. S. Mian, K. Sjolander, and¨ D. Haussler (1994). Hidden Markov models in computational biology: Applications to protein modelling. Journal of Molecular Biology 235, 1501–1531. 





Kschischnang, F. R., B. J. Frey, and H. A. Loeliger (2001). Factor graphs and the sum-product algorithm. IEEE Transactions on Information Theory 47(2), 498–519. 





Kuhn, H. W. and A. W. Tucker (1951). Nonlinear programming. In Proceedings of the 2nd Berkeley Symposium on Mathematical Statistics and Probabilities, pp. 481–492. University of California Press. 





Kullback, S. and R. A. Leibler (1951). On information and sufficiency. Annals of Mathematical Statistics 22(1), 79–86. 





Kurkov˙ a, V. and P. C. Kainen (1994). Functionally´ equivalent feed-forward neural networks. Neural Computation 6(3), 543–558. 





Kuss, M. and C. Rasmussen (2006). Assessing approximations for Gaussian process classification. 





In Advances in Neural Information Processing Systems, Number 18. MIT Press. in press. 





Lasserre, J., C. M. Bishop, and T. Minka (2006). Principled hybrids of generative and discriminative models. In Proceedings 2006 IEEE Conference on Computer Vision and Pattern Recognition, New York. 





Lauritzen, S. and N. Wermuth (1989). Graphical models for association between variables, some of which are qualitative some quantitative. Annals of Statistics 17, 31–57. 





Lauritzen, S. L. (1992). Propagation of probabilities, means and variances in mixed graphical association models. Journal of the American Statistical Association 87, 1098–1108. 





Lauritzen, S. L. (1996). Graphical Models. Oxford University Press. 





Lauritzen, S. L. and D. J. Spiegelhalter (1988). Local computations with probabailities on graphical structures and their application to expert systems. Journal ofthe Royal Statistical Society 50, 157– 224. 





Lawley, D. N. (1953). A modified method of estimation in factor analysis and some large sample results. In Uppsala Symposium on Psychological Factor Analysis, Number 3 in Nordisk Psykologi Monograph Series, pp. 35–42. Uppsala: Almqvist and Wiksell. 





Lawrence, N. D., A. I. T. Rowstron, C. M. Bishop, and M. J. Taylor (2002). Optimising synchronisation times for mobile devices. In T. G. Dietterich, S. Becker, and Z. Ghahramani (Eds.), Advances in Neural Information Processing Systems, Volume 14, pp. 1401–1408. MIT Press. 





Lazarsfeld, P. F. and N. W. Henry (1968). Latent Structure Analysis. Houghton Mifflin. 





Le Cun, Y., B. Boser, J. S. Denker, D. Henderson, R. E. Howard, W. Hubbard, and L. D. Jackel (1989). Backpropagation applied to handwritten zip code recognition. Neural Computation 1(4), 541–551. 





Le Cun, Y., J. S. Denker, and S. A. Solla (1990). Optimal brain damage. In D. S. Touretzky (Ed.), 





Advances in Neural Information Processing Systems, Volume 2, pp. 598–605. Morgan Kaufmann. 





LeCun, Y., L. Bottou, Y. Bengio, and P. Haffner (1998). Gradient-based learning applied to document recognition. Proceedings of the IEEE 86, 2278–2324. 





Lee, Y., Y. Lin, and G. Wahba (2001). Multicategory support vector machines. Technical Report 1040, Department of Statistics, University of Madison, Wisconsin. 





Leen, T. K. (1995). From data distributions to regularization in invariant learning. Neural Computation 7, 974–981. 





Lindley, D. V. (1982). Scoring rules and the inevitability of probability. International Statistical Review 50, 1–26. 





Liu, J. S. (Ed.) (2001). Monte Carlo Strategies in Scientific Computing. Springer. 





Lloyd, S. P. (1982). Least squares quantization in PCM. IEEE Transactions on Information Theory 28(2), 129–137. 





Lutkepohl, H. (1996).¨ Handbook ofMatrices. Wiley. 





MacKay, D. J. C. (1992a). Bayesian interpolation. Neural Computation 4(3), 415–447. 





MacKay, D. J. C. (1992b). The evidence framework applied to classification networks. Neural Computation 4(5), 720–736. 





MacKay, D. J. C. (1992c). A practical Bayesian framework for back-propagation networks. Neural Computation 4(3), 448–472. 





MacKay, D. J. C. (1994). Bayesian methods for backprop networks. In E. Domany, J. L. van Hemmen, and K. Schulten (Eds.), Models of Neural Networks, III, Chapter 6, pp. 211–254. Springer. 





MacKay, D. J. C. (1995). Bayesian neural networks and density networks. Nuclear Instruments and Methods in Physics Research, A 354(1), 73–80. 





MacKay, D. J. C. (1997). Ensemble learning for hidden Markov models. Unpublished manuscript, 





Department of Physics, University of Cambridge. 





MacKay, D. J. C. (1998). Introduction to Gaussian processes. In C. M. Bishop (Ed.), Neural Networks and Machine Learning, pp. 133–166. Springer. 





MacKay, D. J. C. (1999). Comparison of approximate methods for handling hyperparameters. Neural Computation 11(5), 1035–1068. 





MacKay, D. J. C. (2003). Information Theory, Inference and Learning Algorithms. Cambridge University Press. 





MacKay, D. J. C. and M. N. Gibbs (1999). Density networks. In J. W. Kay and D. M. Titterington (Eds.), Statistics and Neural Networks: Advances at the Interface, Chapter 5, pp. 129–145. Oxford University Press. 





MacKay, D. J. C. and R. M. Neal (1999). Good errorcorrecting codes based on very sparse matrices. IEEE Transactions on Information Theory 45, 399–431. 





MacQueen, J. (1967). Some methods for classification and analysis of multivariate observations. In L. M. LeCam and J. Neyman (Eds.), Proceedings of the Fifth Berkeley Symposium on Mathematical Statistics and Probability, Volume I, pp. 281–297. University of California Press. 





Magnus, J. R. and H. Neudecker (1999). Matrix Differential Calculus with Applications in Statistics and Econometrics. Wiley. 





Mallat, S. (1999). A Wavelet Tour ofSignal Processing (Second ed.). Academic Press. 





Manning, C. D. and H. Schutze (1999). ¨ Foundations of Statistical Natural Language Processing. MIT Press. 





Mardia, K. V. and P. E. Jupp (2000). Directional Statistics. Wiley. 





Maybeck, P. S. (1982). Stochastic models, estimation and control. Academic Press. 





McAllester, D. A. (2003). PAC-Bayesian stochastic model selection. Machine Learning 51(1), 5–21. 





McCullagh, P. and J. A. Nelder (1989). Generalized Linear Models (Second ed.). Chapman and Hall. 





McCulloch, W. S. and W. Pitts (1943). A logical calculus of the ideas immanent in nervous activity. Bulletin of Mathematical Biophysics 5, 115–133. Reprinted in Anderson and Rosenfeld (1988). 





McEliece, R. J., D. J. C. MacKay, and J. F. Cheng (1998). Turbo decoding as an instance of Pearl’s ‘Belief Ppropagation’ algorithm. IEEE Journal on Selected Areas in Communications 16, 140– 152. 





McLachlan, G. J. and K. E. Basford (1988). Mixture Models: Inference and Applications to Clustering. Marcel Dekker. 





McLachlan, G. J. and T. Krishnan (1997). The EM Algorithm and its Extensions. Wiley. 





McLachlan, G. J. and D. Peel (2000). Finite Mixture Models. Wiley. 





Meng, X. L. and D. B. Rubin (1993). Maximum likelihood estimation via the ECM algorithm: a general framework. Biometrika 80, 267–278. 





Metropolis, N., A. W. Rosenbluth, M. N. Rosenbluth, A. H. Teller, and E. Teller (1953). Equation of state calculations by fast computing machines. Journal of Chemical Physics 21(6), 1087–1092. 





Metropolis, N. and S. Ulam (1949). The Monte Carlo method. Journal of the American Statistical Association 44(247), 335–341. 





Mika, S., G. Ratsch, J. Weston, and B. Sch¨ olkopf¨ (1999). Fisher discriminant analysis with kernels. In Y. H. Hu, J. Larsen, E. Wilson, and S. Douglas (Eds.), Neural Networks for Signal Processing IX, pp. 41–48. IEEE. 





Minka, T. (2001a). Expectation propagation for approximate Bayesian inference. In J. Breese and D. Koller (Eds.), Proceedings of the Seventeenth Conference on Uncertainty in Artificial Intelligence, pp. 362–369. Morgan Kaufmann. 





Minka, T. (2001b). A family of approximate algorithms for Bayesian inference. Ph. D. thesis, MIT. 





Minka, T. (2004). Power EP. Technical Report MSR-TR-2004-149, Microsoft Research Cambridge. 





Minka, T. (2005). Divergence measures and message passing. Technical Report MSR-TR-2005- 173, Microsoft Research Cambridge. 





Minka, T. P. (2001c). Automatic choice of dimensionality for PCA. In T. K. Leen, T. G. Dietterich, and V. Tresp (Eds.), Advances in Neural Information Processing Systems, Volume 13, pp. 598–604. MIT Press. 





Minsky, M. L. and S. A. Papert (1969). Perceptrons. MIT Press. Expanded edition 1990. 





Miskin, J. W. and D. J. C. MacKay (2001). Ensemble learning for blind source separation. In S. J. Roberts and R. M. Everson (Eds.), Independent Component Analysis: Principles and Practice. Cambridge University Press. 





Møller, M. (1993). Efficient Training of Feed-Forward Neural Networks. Ph. D. thesis, Aarhus University, Denmark. 





Moody, J. and C. J. Darken (1989). Fast learning in networks of locally-tuned processing units. Neural Computation 1(2), 281–294. 





Moore, A. W. (2000). The anchors hierarch: using the triangle inequality to survive high dimensional data. In Proceedings of the Twelfth Conference on Uncertainty in Artificial Intelligence, pp. 397–405. 





Muller, K. R., S. Mika, G. R¨ atsch, K. Tsuda, and¨ B. Scholkopf (2001). An introduction to kernel-¨ based learning algorithms. IEEE Transactions on Neural Networks 12(2), 181–202. 





Muller, P. and F. A. Quintana (2004). Nonparametric ¨ Bayesian data analysis. Statistical Science 19(1), 95–110. 





Nabney, I. T. (2002). Netlab: Algorithms for Pattern Recognition. Springer. 





Nadaraya, E. A. (1964). On estimating regression.<sup>´</sup> Theory of Probability and its Applications 9(1), 141–142. 





Nag, R., K. Wong, and F. Fallside (1986). Script recognition using hidden markov models. In ICASSP86, pp. 2071–2074. IEEE. 





Neal, R. M. (1993). Probabilistic inference using Markov chain Monte Carlo methods. Technical Report CRG-TR-93-1, Department of Computer Science, University of Toronto, Canada. 





Neal, R. M. (1996). Bayesian Learning for Neural Networks. Springer. Lecture Notes in Statistics 118. 





Neal, R. M. (1997). Monte Carlo implementation of Gaussian process models for Bayesian regression and classification. Technical Report 9702, Department of Computer Statistics, University of Toronto. 





Neal, R. M. (1999). Suppressing random walks in Markov chain Monte Carlo using ordered overrelaxation. In M. I. Jordan (Ed.), Learning in Graphical Models, pp. 205–228. MIT Press. 





Neal, R. M. (2000). Markov chain sampling for Dirichlet process mixture models. Journal of Computational and Graphical Statistics 9, 249– 265. 





Neal, R. M. (2003). Slice sampling. Annals of Statistics 31, 705–767. 





Neal, R. M. and G. E. Hinton (1999). A new view of the EM algorithm that justifies incremental and other variants. In M. I. Jordan (Ed.), Learning in Graphical Models, pp. 355–368. MIT Press. 





Nelder, J. A. and R. W. M. Wedderburn (1972). Generalized linear models. Journal of the Royal Statistical Society, A 135, 370–384. 





Nilsson, N. J. (1965). Learning Machines. McGraw-Hill. Reprinted as The Mathematical Foundations of Learning Machines, Morgan Kaufmann, (1990). 





Nocedal, J. and S. J. Wright (1999). Numerical Optimization. Springer. 





Nowlan, S. J. and G. E. Hinton (1992). Simplifying neural networks by soft weight sharing. Neural Computation 4(4), 473–493. 





Ogden, R. T. (1997). Essential Wavelets for Statistical Applications and Data Analysis. Birkhauser.¨ 





Opper, M. and O. Winther (1999). A Bayesian approach to on-line learning. In D. Saad (Ed.), On-Line Learning in Neural Networks, pp. 363–378. Cambridge University Press. 





Opper, M. and O. Winther (2000a). Gaussian processes and SVM: mean field theory and leave-one-out. In A. J. Smola, P. L. Bartlett, B. Scholkopf, and D. Shuurmans (Eds.),¨ Advances in Large Margin Classifiers, pp. 311–326. MIT Press. 





Opper, M. and O. Winther (2000b). Gaussian processes for classification. Neural Computation 12(11), 2655–2684. 





Osuna, E., R. Freund, and F. Girosi (1996). Support vector machines: training and applications. A.I. Memo AIM-1602, MIT. 





Papoulis, A. (1984). Probability, Random Variables, and Stochastic Processes (Second ed.). McGraw-Hill. 





Parisi, G. (1988). Statistical Field Theory. Addison-Wesley. 





Pearl, J. (1988). Probabilistic Reasoning in Intelligent Systems. Morgan Kaufmann. 





Pearlmutter, B. A. (1994). Fast exact multiplication by the Hessian. Neural Computation 6(1), 147– 160. 





Pearlmutter, B. A. and L. C. Parra (1997). Maximum likelihood source separation: a context-sensitive generalization of ICA. In M. C. Mozer, M. I. Jordan, and T. Petsche (Eds.), Advances in Neural Information Processing Systems, Volume 9, pp. 613–619. MIT Press. 





Pearson, K. (1901). On lines and planes of closest fit to systems of points in space. The London, Edinburgh and Dublin Philosophical Magazine and Journal ofScience, Sixth Series 2, 559–572. 





Platt, J. C. (1999). Fast training of support vector machines using sequential minimal optimization. In B. Scholkopf, C. J. C. Burges, and A. J. Smola ¨ (Eds.), Advances in Kernel Methods – Support Vector Learning, pp. 185–208. MIT Press. 





Platt, J. C. (2000). Probabilities for SV machines. In A. J. Smola, P. L. Bartlett, B. Scholkopf, and ¨ D. Shuurmans (Eds.), Advances in Large Margin Classifiers, pp. 61–73. MIT Press. 





Platt, J. C., N. Cristianini, and J. Shawe-Taylor (2000). Large margin DAGs for multiclass classification. In S. A. Solla, T. K. Leen, and K. R. Muller (Eds.),¨ Advances in Neural Information Processing Systems, Volume 12, pp. 547–553. MIT Press. 





Poggio, T. and F. Girosi (1990). Networks for approximation and learning. Proceedings of the IEEE 78(9), 1481–1497. 





Powell, M. J. D. (1987). Radial basis functions for multivariable interpolation: a review. In J. C. Mason and M. G. Cox (Eds.), Algorithms for Approximation, pp. 143–167. Oxford University Press. 





Press, W. H., S. A. Teukolsky, W. T. Vetterling, and B. P. Flannery (1992). Numerical Recipes in C: The Art of Scientific Computing (Second ed.). Cambridge University Press. 





Qazaz, C. S., C. K. I. Williams, and C. M. Bishop (1997). An upper bound on the Bayesian error bars for generalized linear regression. In S. W. Ellacott, J. C. Mason, and I. J. Anderson (Eds.), Mathematics of Neural Networks: Models, Algorithms and Applications, pp. 295–299. Kluwer. 





Quinlan, J. R. (1986). Induction of decision trees. Machine Learning 1(1), 81–106. 





Quinlan, J. R. (1993). C4.5: Programs for Machine Learning. Morgan Kaufmann. 





Rabiner, L. and B. H. Juang (1993). Fundamentals ofSpeech Recognition. Prentice Hall. 





Rabiner, L. R. (1989). A tutorial on hidden Markov models and selected applications in speech recognition. Proceedings of the IEEE 77(2), 257–285. 





Ramasubramanian, V. and K. K. Paliwal (1990). A generalized optimization of the k-d tree for fast nearest-neighbour search. In Proceedings Fourth IEEE Region 10 International Conference (TEN-CON’89), pp. 565–568. 





Ramsey, F. (1931). Truth and probability. In R. Braithwaite (Ed.), The Foundations of Mathematics and other Logical Essays. Humanities Press. 





Rao, C. R. and S. K. Mitra (1971). Generalized Inverse ofMatrices and Its Applications. Wiley. 





Rasmussen, C. E. (1996). Evaluation of Gaussian Processes and Other Methods for Non-Linear Regression. Ph. D. thesis, University of Toronto. 





Rasmussen, C. E. and J. Quinonero-Candela (2005).˜ Healing the relevance vector machine by augmentation. In L. D. Raedt and S. Wrobel (Eds.), Proceedings of the 22nd International Conference on Machine Learning, pp. 689–696. 





Rasmussen, C. E. and C. K. I. Williams (2006). Gaussian Processes for Machine Learning. MIT Press. 





Rauch, H. E., F. Tung, and C. T. Striebel (1965). Maximum likelihood estimates of linear dynamical systems. AIAA Journal 3, 1445–1450. 





Ricotti, L. P., S. Ragazzini, and G. Martinelli (1988). Learning of word stress in a sub-optimal second order backpropagation neural network. In Proceedings of the IEEE International Conference on Neural Networks, Volume 1, pp. 355–361. IEEE. 





Ripley, B. D. (1996). Pattern Recognition and Neural Networks. Cambridge University Press. 





Robbins, H. and S. Monro (1951). A stochastic approximation method. Annals of Mathematical Statistics 22, 400–407. 





Robert, C. P. and G. Casella (1999). Monte Carlo Statistical Methods. Springer. 





Rockafellar, R. (1972). Convex Analysis. Princeton University Press. 





Rosenblatt, F. (1962). Principles of Neurodynamics: Perceptrons and the Theory of Brain Mech anisms. Spartan. 





Roth, V. and V. Steinhage (2000). Nonlinear discriminant analysis using kernel functions. In S. A. 





Solla, T. K. Leen, and K. R. Muller (Eds.),¨ Advances in Neural Information Processing Systems, Volume 12. MIT Press. 





Roweis, S. (1998). EM algorithms for PCA and SPCA. In M. I. Jordan, M. J. Kearns, and S. A. Solla (Eds.), Advances in Neural Information Processing Systems, Volume 10, pp. 626–632. MIT Press. 





Roweis, S. and Z. Ghahramani (1999). A unifying review of linear Gaussian models. Neural Computation 11(2), 305–345. 





Roweis, S. and L. Saul (2000, December). Nonlinear dimensionality reduction by locally linear embedding. Science 290, 2323–2326. 





Rubin, D. B. (1983). Iteratively reweighted least squares. In Encyclopedia of Statistical Sciences, Volume 4, pp. 272–275. Wiley. 





Rubin, D. B. and D. T. Thayer (1982). EM algorithms for ML factor analysis. Psychometrika 47(1), 69–76. 





Rumelhart, D. E., G. E. Hinton, and R. J. Williams (1986). Learning internal representations by error propagation. In D. E. Rumelhart, J. L. Mc-Clelland, and the PDP Research Group (Eds.), Parallel Distributed Processing: Explorations in the Microstructure of Cognition, Volume 1: Foundations, pp. 318–362. MIT Press. Reprinted in Anderson and Rosenfeld (1988). 





Rumelhart, D. E., J. L. McClelland, and the PDP Research Group (Eds.) (1986). Parallel Distributed Processing: Explorations in the Microstructure of Cognition, Volume 1: Foundations. MIT Press. 





Sagan, H. (1969). Introduction to the Calculus of Variations. Dover. 





Savage, L. J. (1961). The subjective basis of statistical practice. Technical report, Department of Statistics, University of Michigan, Ann Arbor. 





Scholkopf, B., J. Platt, J. Shawe-Taylor, A. Smola, ¨ and R. C. Williamson (2001). Estimating the support of a high-dimensional distribution. Neural Computation 13(7), 1433–1471. 





Scholkopf, B., A. Smola, and K.-R. M¨ uller (1998).¨ Nonlinear component analysis as a kernel eigenvalue problem. Neural Computation 10(5), 1299–1319. 





Scholkopf, B., A. Smola, R. C. Williamson, and P. L. ¨ Bartlett (2000). New support vector algorithms. Neural Computation 12(5), 1207–1245. 





Scholkopf, B. and A. J. Smola (2002). ¨ Learning with Kernels. MIT Press. 





Schwarz, G. (1978). Estimating the dimension of a model. Annals of Statistics 6, 461–464. 





Schwarz, H. R. (1988). Finite element methods. Academic Press. 





Seeger, M. (2003). Bayesian Gaussian Process Models: PAC-Bayesian Generalization Error Bounds and Sparse Approximations. Ph. D. thesis, University of Edinburg. 





Seeger, M., C. K. I. Williams, and N. Lawrence (2003). Fast forward selection to speed up sparse Gaussian processes. In C. M. Bishop and B. Frey (Eds.), Proceedings Ninth International Workshop on Artificial Intelligence and Statistics, Key West, Florida. 





Shachter, R. D. and M. Peot (1990). Simulation approaches to general probabilistic inference on belief networks. In P. P. Bonissone, M. Henrion, L. N. Kanal, and J. F. Lemmer (Eds.), Uncertainty in Artificial Intelligence, Volume 5. Elsevier. 





Shannon, C. E. (1948). A mathematical theory of communication. The Bell System Technical Journal 27(3), 379–423 and 623–656. 





Shawe-Taylor, J. and N. Cristianini (2004). Kernel Methods for Pattern Analysis. Cambridge University Press. 





Sietsma, J. and R. J. F. Dow (1991). Creating artificial neural networks that generalize. Neural Networks 4(1), 67–79. 





Simard, P., Y. Le Cun, and J. Denker (1993). Efficient pattern recognition using a new transformation distance. In S. J. Hanson, J. D. Cowan, and 





C. L. Giles (Eds.), Advances in Neural Information Processing Systems, Volume 5, pp. 50–58. Morgan Kaufmann. 





Simard, P., B. Victorri, Y. Le Cun, and J. Denker (1992). Tangent prop – a formalism for specifying selected invariances in an adaptive network. In J. E. Moody, S. J. Hanson, and R. P. Lippmann (Eds.), Advances in Neural Information Processing Systems, Volume 4, pp. 895–903. Morgan Kaufmann. 





Simard, P. Y., D. Steinkraus, and J. Platt (2003). Best practice for convolutional neural networks applied to visual document analysis. In Proceedings International Conference on Document Analysis and Recognition (ICDAR), pp. 958– 962. IEEE Computer Society. 





Sirovich, L. (1987). Turbulence and the dynamics of coherent structures. Quarterly Applied Mathematics 45(3), 561–590. 





Smola, A. J. and P. Bartlett (2001). Sparse greedy Gaussian process regression. In T. K. Leen, T. G. Dietterich, and V. Tresp (Eds.), Advances in Neural Information Processing Systems, Volume 13, pp. 619–625. MIT Press. 





Spiegelhalter, D. and S. Lauritzen (1990). Sequential updating of conditional probabilities on directed graphical structures. Networks 20, 579–605. 





Stinchecombe, M. and H. White (1989). Universal approximation using feed-forward networks with non-sigmoid hidden layer activation functions. In International Joint Conference on Neural Networks, Volume 1, pp. 613–618. IEEE. 





Stone, J. V. (2004). Independent Component Analysis: A Tutorial Introduction. MIT Press. 





Sung, K. K. and T. Poggio (1994). Example-based learning for view-based human face detection. A.I. Memo 1521, MIT. 





Sutton, R. S. and A. G. Barto (1998). Reinforcement Learning: An Introduction. MIT Press. 





Svensen, M. and C. M. Bishop (2004). Ro- ´ bust Bayesian mixture modelling. Neurocomputing 64, 235–252. 





Tarassenko, L. (1995). Novelty detection for the identification of masses in mamograms. In Proceedings Fourth IEE International Conference on Artificial Neural Networks, Volume 4, pp. 442–447. IEE. 





Tax, D. and R. Duin (1999). Data domain description by support vectors. In M. Verleysen (Ed.), Proceedings European Symposium on Artificial Neural Networks, ESANN, pp. 251–256. D. Facto Press. 





Teh, Y. W., M. I. Jordan, M. J. Beal, and D. M. Blei (2006). Hierarchical Dirichlet processes. Journal of the Americal Statistical Association. to appear. 





Tenenbaum, J. B., V. de Silva, and J. C. Langford (2000, December). A global framework for nonlinear dimensionality reduction. Science 290, 2319–2323. 





Tesauro, G. (1994). TD-Gammon, a self-teaching backgammon program, achieves master-level play. Neural Computation 6(2), 215–219. 





Thiesson, B., D. M. Chickering, D. Heckerman, and C. Meek (2004). ARMA time-series modelling with graphical models. In M. Chickering and J. Halpern (Eds.), Proceedings of the Twentieth Conference on Uncertainty in Artificial Intelligence, Banff, Canada, pp. 552–560. AUAI Press. 





Tibshirani, R. (1996). Regression shrinkage and selection via the lasso. Journal of the Royal Statistical Society, B 58, 267–288. 





Tierney, L. (1994). Markov chains for exploring posterior distributions. Annals of Statistics 22(4), 1701–1762. 





Tikhonov, A. N. and V. Y. Arsenin (1977). Solutions of Ill-Posed Problems. V. H. Winston. 





Tino, P. and I. T. Nabney (2002). Hierarchical GTM: constructing localized non-linear projection manifolds in a principled way. IEEE Transactions on Pattern Analysis and Machine Intelligence 24(5), 639–656. 





Tino, P., I. T. Nabney, and Y. Sun (2001). Using directional curvatures to visualize folding patterns of the GTM projection manifolds. In 





G. Dorffner, H. Bischof, and K. Hornik (Eds.), Artificial Neural Networks – ICANN 2001, pp. 421–428. Springer. 





Tipping, M. E. (1999). Probabilistic visualisation of high-dimensional binary data. In M. S. Kearns, S. A. Solla, and D. A. Cohn (Eds.), Advances in Neural Information Processing Systems, Volume 11, pp. 592–598. MIT Press. 





Tipping, M. E. (2001). Sparse Bayesian learning and the relevance vector machine. Journal of Machine Learning Research 1, 211–244. 





Tipping, M. E. and C. M. Bishop (1997). Probabilistic principal component analysis. Technical Report NCRG/97/010, Neural Computing Research Group, Aston University. 





Tipping, M. E. and C. M. Bishop (1999a). Mixtures of probabilistic principal component analyzers. Neural Computation 11(2), 443–482. 





Tipping, M. E. and C. M. Bishop (1999b). Probabilistic principal component analysis. Journal of the Royal Statistical Society, Series B 21(3), 611–622. 





Tipping, M. E. and A. Faul (2003). Fast marginal likelihood maximization for sparse Bayesian models. In C. M. Bishop and B. Frey (Eds.), Proceedings Ninth International Workshop on Artificial Intelligence and Statistics, Key West, Florida. 





Tong, S. and D. Koller (2000). Restricted Bayes optimal classifiers. In Proceedings 17th National Conference on Artificial Intelligence, pp. 658– 664. AAAI. 





Tresp, V. (2001). Scaling kernel-based systems to large data sets. Data Mining and Knowledge Discovery 5(3), 197–211. 





Uhlenbeck, G. E. and L. S. Ornstein (1930). On the theory of Brownian motion. Phys. Rev. 36, 823– 841. 





Valiant, L. G. (1984). A theory of the learnable. Communications of the Association for Computing Machinery 27, 1134–1142. 





Vapnik, V. N. (1982). Estimation of dependences based on empirical data. Springer. 





Vapnik, V. N. (1995). The nature of statistical learning theory. Springer. 





Vapnik, V. N. (1998). Statistical learning theory. Wiley. 





Veropoulos, K., C. Campbell, and N. Cristianini (1999). Controlling the sensitivity of support vector machines. In Proceedings of the International Joint Conference on Artificial Intelligence (IJCAI99), Workshop ML3, pp. 55–60. 





Vidakovic, B. (1999). Statistical Modelling by Wavelets. Wiley. 





Viola, P. and M. Jones (2004). Robust real-time face detection. International Journal of Computer Vision 57(2), 137–154. 





Viterbi, A. J. (1967). Error bounds for convolutional codes and an asymptotically optimum decoding algorithm. IEEE Transactions on Information Theory IT-13, 260–267. 





Viterbi, A. J. and J. K. Omura (1979). Principles of Digital Communication and Coding. McGraw-Hill. 





Wahba, G. (1975). A comparison of GCV and GML for choosing the smoothing parameter in the generalized spline smoothing problem. Numerical Mathematics 24, 383–393. 





Wainwright, M. J., T. S. Jaakkola, and A. S. Willsky (2005). A new class of upper bounds on the log partition function. IEEE Transactions on Information Theory 51, 2313–2335. 





Walker, A. M. (1969). On the asymptotic behaviour of posterior distributions. Journal of the Royal Statistical Society, B 31(1), 80–88. 





Walker, S. G., P. Damien, P. W. Laud, and A. F. M. Smith (1999). Bayesian nonparametric inference for random distributions and related functions (with discussion). Journal of the Royal Statistical Society, B 61(3), 485–527. 





Watson, G. S. (1964). Smooth regression analysis. Sankhya: The Indian Journal of Statistics. Series ¯ A 26, 359–372. 





Webb, A. R. (1994). Functional approximation by feed-forward networks: a least-squares approach to generalisation. IEEE Transactions on Neural Networks 5(3), 363–371. 





Weisstein, E. W. (1999). CRC Concise Encyclopedia of Mathematics. Chapman and Hall, and CRC. 





Weston, J. and C. Watkins (1999). Multi-class support vector machines. In M. Verlysen (Ed.), Proceedings ESANN’99, Brussels. D-Facto Publications. 





Whittaker, J. (1990). Graphical Models in Applied Multivariate Statistics. Wiley. 





Widrow, B. and M. E. Hoff (1960). Adaptive switching circuits. In IRE WESCON Convention Record, Volume 4, pp. 96–104. Reprinted in Anderson and Rosenfeld (1988). 





Widrow, B. and M. A. Lehr (1990). 30 years of adaptive neural networks: perceptron, madeline, and backpropagation. Proceedings of the IEEE 78(9), 1415–1442. 





Wiegerinck, W. and T. Heskes (2003). Fractional belief propagation. In S. Becker, S. Thrun, and K. Obermayer (Eds.), Advances in Neural Information Processing Systems, Volume 15, pp. 455– 462. MIT Press. 





Williams, C. K. I. (1998). Computation with infinite neural networks. Neural Computation 10(5), 1203–1216. 





Williams, C. K. I. (1999). Prediction with Gaussian processes: from linear regression to linear prediction and beyond. In M. I. Jordan (Ed.), Learning in Graphical Models, pp. 599–621. MIT Press. 





Williams, C. K. I. and D. Barber (1998). Bayesian classification with Gaussian processes. IEEE Transactions on Pattern Analysis and Machine Intelligence 20, 1342–1351. 





Williams, C. K. I. and M. Seeger (2001). Using the Nystrom method to speed up kernel machines. In T. K. Leen, T. G. Dietterich, and V. Tresp (Eds.), Advances in Neural Information Processing Systems, Volume 13, pp. 682–688. MIT Press. 





Williams, O., A. Blake, and R. Cipolla (2005). Sparse Bayesian learning for efficient visual tracking. IEEE Transactions on Pattern Analysis and Machine Intelligence 27(8), 1292–1304. 





Williams, P. M. (1996). Using neural networks to model conditional multivariate densities. Neural Computation 8(4), 843–854. 





Winn, J. and C. M. Bishop (2005). Variational message passing. Journal of Machine Learning Research 6, 661–694. 





Zarchan, P. and H. Musoff (2005). Fundamentals of Kalman Filtering: A Practical Approach (Second ed.). AIAA. 



## Index

Page numbers in bold indicate the primary source of information for the corresponding topic. 

1-of-K coding scheme, 424 

acceptance criterion, 538, 541, 544 activation function, 180, 213, 227 active constraint, 328, 709 AdaBoost, 657, 658 adaline, 196 adaptive rejection sampling, 530 ADF, see assumed density filtering AIC, see Akaike information criterion Akaike information criterion, 33, 217 α family of divergences, 469 α recursion, 620 ancestral sampling, 365, 525, 613 annular flow, 679 AR model, see autoregressive model arc, 360 ARD, see automatic relevance determination ARMA, see autoregressive moving average assumed density filtering, 510 autoassociative networks, 592 automatic relevance determination, 259, 31 485, 582 autoregressive hidden Markov model, 632 autoregressive model, 609 autoregressive moving average, 304 

backgammon, 3 backpropagation, 241 bagging, 656 basis function, 138, 172, 204, 227 batch training, 240 Baum-Welch algorithm, 618 Bayes’ theorem, 15 Bayes, Thomas, 21 Bayesian analysis, vii, 9, 21 hierarchical, 372 model averaging, 654 Bayesian information criterion, 33, 216 Bayesian model comparison, 161, 473, 483 Bayesian network, 360 Bayesian probability, 21 belief propagation, 403 Bernoulli distribution, 69, 113, 685 mixture model, 444 Bernoulli, Jacob, 69 beta distribution, 71, 686 beta recursion, 621 between-class covariance, 189 bias, 27, 149 bias parameter, 138, 181, 227, 346 bias-variance trade-off, 147 BIC, see Bayesian information criterion binary entropy, 495 binomial distribution, 70, 686 

back-tracking, 415, 630 biological sequence, 610 bipartite graph, 401 bits, 49 blind source separation, 591 blocked path, 374, 378, 384 Boltzmann distribution, 387 Boltzmann, Ludwig Eduard, 53 Boolean logic, 21 boosting, 657 bootstrap, 23, 656 bootstrap filter, 646 box constraints, 333, 342 Box-Muller method, 527 

C4.5, 663 calculus of variations, 462 canonical correlation analysis, 565 canonical link function, 212 CART, see classification and regression trees Cauchy distribution, 527, 529, 692 causality, 366 CCA, see canonical correlation analysis central differences, 246 central limit theorem, 78 chain graph, 393 chaining, 555 Chapman-Kolmogorov equations, 397 child node, 361 Cholesky decomposition, 528 chunking, 335 circular normal, see von Mises distribution classical probability, 21 classification, 3 classification and regression trees, 663 clique, 385 clustering, 3 clutter problem, 511 co-parents, 383, 492 code-book vectors, 429 combining models, 45, 653 committee, 655 complete data set, 440 completing the square, 86 computational learning theory, 326, 344 concave function, 56 

concentration parameter, 108, 693 condensation algorithm, 646 conditional entropy, 55 conditional expectation, 20 conditional independence, 46, 372, 383 conditional mixture model, see mixture model conditional probability, 14 conjugate prior, 68, 98, 117, 490 convex duality, 494 convex function, 55, 493 convolutional neural network, 267 correlation matrix, 567 cost function, 41 covariance, 20 between-class, 189 within-class, 189 covariance matrix diagonal, 84 isotropic, 84 partitioned, 85, 307 positive definite, 308 Cox’s axioms, 21 credit assignment, 3 cross-entropy error function, 206, 209, 235, 631, 666 cross-validation, 32, 161 cumulative distribution function, 18 curse of dimensionality, 33, 36 curve fitting, 4 

D map, see dependency map d-separation, 373, 378, 443 DAG, see directed acyclic graph DAGSVM, 339 data augmentation, 537 data compression, 429 decision boundary, 39, 179 decision region, 39, 179 decision surface, see decision boundary decision theory, 38 decision tree, 654, 663, 673 decomposition methods, 335 degrees of freedom, 559 degrees-of-freedom parameter, 102, 693 density estimation, 3, 67 

density network, 597 dependency map, 392 descendant node, 376 design matrix, 142, 347 differential entropy, 53 digamma function, 687 directed acyclic graph, 362 directed cycle, 362 directed factorization, 381 Dirichlet distribution, 76, 687 Dirichlet, Lejeune, 77 discriminant function, 43, 180, 181 discriminative model, 43, 203 distortion measure, 424 distributive law of multiplication, 396 DNA, 610 document retrieval, 299 dual representation, 293, 329 dual-energy gamma densitometry, 678 dynamic programming, 411 dynamical system, 548 E step, see expectation step early stopping, 259 ECM, see expectation conditional maximization edge, 360 effective number of observations, 72, 101 effective number of parameters, 9, 170, 281 elliptical K-means, 444 EM, see expectation maximization emission probability, 611 empirical Bayes, see evidence approximation energy function, 387 entropy, 49 conditional, 55 differential, 53 relative, 55 EP, see expectation propagation -tube, 341 -insensitive error function, 340 equality constraint, 709 equivalent kernel, 159, 301 erf function, 211 error backpropagation, see backpropagation error function, 5, 23 

error-correcting output codes, 339 Euler, Leonhard, 465 Euler-Lagrange equations, 705 evidence approximation, 165, 347, 581 evidence function, 161 expectation, 19 expectation conditional maximization, 454 expectation maximization, 113, 423, 440 Gaussian mixture, 435 generalized, 454 sampling methods, 536 expectation propagation, 315, 468, 505 expectation step, 437 explaining away, 378 exploitation, 3 exploration, 3 exponential distribution, 526, 688 exponential family, 68, 113, 202, 490 extensive variables, 490 face detection, 2 face tracking, 355 factor analysis, 583 mixture model, 595 factor graph, 360, 399, 625 factor loading, 584 factorial hidden Markov model, 633 factorized distribution, 464, 476 feature extraction, 2 feature map, 268 feature space, 292, 586 Fisher information matrix, 298 Fisher kernel, 298 Fisher’s linear discriminant, 186 flooding schedule, 417 forward kinematics, 272 forward problem, 272 forward propagation, 228, 243 forward-backward algorithm, 618 fractional belief propagation, 517 frequentist probability, 21 fuel system, 376 function interpolation, 299 functional, 462, 703 derivative, 463 

gamma densitometry, 678 gamma distribution, 529, 688 gamma function, 71 gating function, 672 Gauss, Carl Friedrich, 79 Gaussian, 24, 78, 688 conditional, 85, 93 marginal, 88, 93 maximum likelihood, 93 mixture, 110, 270, 273, 430 sequential estimation, 94 sufficient statistics, 93 wrapped, 110 Gaussian kernel, 296 Gaussian process, 160, 303 Gaussian random field, 305 Gaussian-gamma distribution, 101, 690 Gaussian-Wishart distribution, 102, 475, 478, 690 GEM, see expectation maximization, generalized generalization, 2 generalized linear model, 180, 213 generalized maximum likelihood, see evidence ap proximation generative model, 43, 196, 297, 365, 572, 631 generative topographic mapping, 597 directional curvature, 599 magnification factor, 599 geodesic distance, 596 Gibbs sampling, 542 blocking, 546 Gibbs, Josiah Willard, 543 Gini index, 666 global minimum, 237 gradient descent, 240 Gram matrix, 293 graph-cut algorithm, 390 graphical model, 359 bipartite, 401 directed, 360 factorization, 362, 384 fully connected, 361 inference, 393 tree, 398 treewidth, 417 triangulated, 416 

undirected, 360 Green’s function, 299 GTM, see generative topographic mapping Hamilton, William Rowan, 549 Hamiltonian dynamics, 548 Hamiltonian function, 549 Hammersley-Clifford theorem, 387 handwriting recognition, 1, 610, 614 handwritten digit, 565, 614, 677 head-to-head path, 376 head-to-tail path, 375 Heaviside step function, 206 Hellinger distance, 470 Hessian matrix, 167, 215, 217, 238, 249 diagonal approximation, 250 exact evaluation, 253 fast multiplication, 254 finite differences, 252 inverse, 252 outer product approximation, 251 heteroscedastic, 273, 311 hidden Markov model, 297, 610 autoregressive, 632 factorial, 633 forward-backward algorithm, 618 input-output, 633 left-to-right, 613 maximum likelihood, 615 scaling factor, 627 sum-product algorithm, 625 switching, 644 variational inference, 625 hidden unit, 227 hidden variable, 84, 364, 430, 559 hierarchical Bayesian model, 372 hierarchical mixture of experts, 673 hinge error function, 337 Hinton diagram, 584 histogram density estimation, 120 HME, see hierarchical mixture of experts hold-out set, 11 homogeneous flow, 679 homogeneous kernel, 292 homogeneous Markov chain, 540, 608 

Hooke’s law, 580 hybrid Monte Carlo, 548 hyperparameter, 71, 280, 311, 346, 372, 502 hyperprior, 372 

I map, see independence map i.i.d., see independent identically distributed ICA, see independent component analysis ICM, see iterated conditional modes ID3, 663 identifiability, 435 image de-noising, 387 importance sampling, 525, 532 importance weights, 533 improper prior, 118, 259, 472 imputation step, 537 imputation-posterior algorithm, 537 inactive constraint, 328, 709 incomplete data set, 440 independence map, 392 independent component analysis, 591 independent factor analysis, 592 independent identically distributed, 26, 379 independent variables, 17 independent, identically distributed, 605 induced factorization, 485 inequality constraint, 709 inference, 38, 42 information criterion, 33 information geometry, 298 information theory, 48 input-output hidden Markov model, 633 intensive variables, 490 intrinsic dimensionality, 559 invariance, 261 inverse gamma distribution, 101 inverse kinematics, 272 inverse problem, 272 inverse Wishart distribution, 102 IP algorithm, see imputation-posterior algorithm IRLS, see iterative reweighted least squares Ising model, 389 isomap, 596 isometric feature map, 596 iterated conditional modes, 389, 415 

iterative reweighted least squares, 207, 210, 316, 354, 672 

Jacobian matrix, 247, 264 Jensen’s inequality, 56 join tree, 416 junction tree algorithm, 392, 416 

K nearest neighbours, 125 K-means clustering algorithm, 424, 443 K-medoids algorithm, 428 Kalman filter, 304, 637 extended, 644 Kalman gain matrix, 639 Kalman smoother, 637 Karhunen-Loeve transform, 561` Karush-Kuhn-Tucker conditions, 330, 333, 342, 710 kernel density estimator, 122, 326 kernel function, 123, 292, 294 Fisher, 298 Gaussian, 296 homogeneous, 292 nonvectorial inputs, 297 stationary, 292 kernel PCA, 586 kernel regression, 300, 302 kernel substitution, 292 kernel trick, 292 kinetic energy, 549 KKT, see Karush-Kuhn-Tucker conditions KL divergence, see Kullback-Leibler divergence kriging, see Gaussian process Kullback-Leibler divergence, 55, 451, 468, 505 

Lagrange multiplier, 707 Lagrange, Joseph-Louis, 329 Lagrangian, 328, 332, 341, 708 laminar flow, 678 Laplace approximation, 213, 217, 278, 315, 354 Laplace, Pierre-Simon, 24 large margin, see margin lasso, 145 latent class analysis, 444 latent trait model, 597 latent variable, 84, 364, 430, 559 

lattice diagram, 414, 611, 621, 629 LDS, see linear dynamical system leapfrog discretization, 551 learning, 2 learning rate parameter, 240 least-mean-squares algorithm, 144 leave-one-out, 33 likelihood function, 22 likelihood weighted sampling, 534 linear discriminant, 181 Fisher, 186 linear dynamical system, 84, 635 inference, 638 linear independence, 696 linear regression, 138 EM, 448 mixture model, 667 variational, 486 linear smoother, 159 linear-Gaussian model, 87, 370 linearly separable, 179 link, 360 link function, 180, 213 Liouville’s Theorem, 550 LLE, see locally linear embedding LMS algorithm, see least-mean-squares algorithm local minimum, 237 local receptive field, 268 locally linear embedding, 596 location parameter, 118 log odds, 197 logic sampling, 525 logistic regression, 205, 336 Bayesian, 217, 498 mixture model, 670 multiclass, 209 logistic sigmoid, 114, 139, 197, 205, 220, 227, 495 logit function, 197 loopy belief propagation, 417 loss function, 41 loss matrix, 41 lossless data compression, 429 lossy data compression, 429 lower bound, 484 M step, see maximization step 

machine learning, vii macrostate, 51 Mahalanobis distance, 80 manifold, 38, 590, 595, 681 MAP, see maximum posterior margin, 326, 327, 502 error, 334 soft, 332 marginal likelihood, 162, 165 marginal probability, 14 Markov blanket, 382, 384, 545 Markov boundary, see Markov blanket Markov chain, 397, 539 first order, 607 homogeneous, 540, 608 second order, 608 Markov chain Monte Carlo, 537 Markov model, 607 homogeneous, 612 Markov network, see Markov random fiel Markov random field, 84, 360, 383 max-sum algorithm, 411, 629 maximal clique, 385 maximal spanning tree, 416 maximization step, 437 maximum likelihood, 9, 23, 26, 116 Gaussian mixture, 432 singularities, 480 type 2, see evidence approximation maximum margin, see margin maximum posterior, 30, 441 MCMC, see Markov chain Monte Carlo MDN, see mixture density network MDS, see multidimensional scaling mean, 24 mean field theory, 465 mean value theorem, 52 measure theory, 19 memory-based methods, 292 message passing, 396 pending message, 417 schedule, 417 variational, 491 Metropolis algorithm, 538 Metropolis-Hastings algorithm, 541 

microstate, 51 minimum risk, 44 Minkowski loss, 48 missing at random, 441, 579 missing data, 579 mixing coefficient, 111 mixture component, 111 mixture density network, 272, 673 mixture distribution, see mixture model mixture model, 162, 423 conditional, 273, 666 linear regression, 667 logistic regression, 670 symmetries, 483 mixture of experts, 672 mixture of Gaussians, 110, 270, 273, 430 MLP, see multilayer perceptron MNIST data, 677 model comparison, 6, 32, 161, 473, 483 model evidence, 161 model selection, 162 moment matching, 506, 510 momentum variable, 548 Monte Carlo EM algorithm, 536 Monte Carlo sampling, 24, 523 Moore-Penrose pseudo-inverse, see pseudo-inverse moralization, 391, 401 MRF, see Markov random field multidimensional scaling, 596 multilayer perceptron, 226, 229 multimodality, 272 multinomial distribution, 76, 114, 690 multiplicity, 51 mutual information, 55, 57 

Nadaraya-Watson, see kernel regression naive Bayes model, 46, 380 nats, 50 natural language modelling, 610 natural parameters, 113 nearest-neighbour methods, 124 neural network, 225 convolutional, 267 regularization, 256 relation to Gaussian process, 319 

Newton-Raphson, 207, 317 node, 360 noiseless coding theorem, 50 nonidentifiability, 585 noninformative prior, 23, 117 nonparametric methods, 68, 120 normal distribution, see Gaussian normal equations, 142 normal-gamma distribution, 101, 691 normal-Wishart distribution, 102, 475, 478, 691 normalized exponential, see softmax function novelty detection, 44 ν-SVM, 334 

object recognition, 366 observed variable, 364 Occam factor, 217 oil flow data, 34, 560, 568, 678 Old Faithful data, 110, 479, 484, 681 on-line learning, see sequential learning one-versus-one classifier, 183, 339 one-versus-the-rest classifier, 182, 338 ordered over-relaxation, 545 Ornstein-Uhlenbeck process, 305 orthogonal least squares, 301 outlier, 44, 185, 212 outliers, 103 over-fitting, 6, 147, 434, 464 over-relaxation, 544 

PAC learning, see probably approximately correct PAC-Bayesian framework, 345 parameter shrinkage, 144 parent node, 361 particle filter, 645 partition function, 386, 554 Parzen estimator, see kernel density estimator Parzen window, 123 pattern recognition, vii PCA, see principal component analysis pending message, 417 perceptron, 192 convergence theorem, 194 hardware, 196 perceptron criterion, 193 perfect map, 392 

periodic variable, 105 phase space, 549 photon noise, 680 plate, 363 polynomial curve fitting, 4, 362 polytree, 399 position variable, 548 positive definite covariance, 81 positive definite matrix, 701 positive semidefinite covariance, 81 positive semidefinite matrix, 701 posterior probability, 17 posterior step, 537 potential energy, 549 potential function, 386 power EP, 517 power method, 563 precision matrix, 85 precision parameter, 24 predictive distribution, 30, 156 preprocessing, 2 principal component analysis, 561, 572, 593 Bayesian, 580 EM algorithm, 577 Gibbs sampling, 583 mixture distribution, 595 physical analogy, 580 principal curve, 595 principal subspace, 561 principal surface, 596 prior, 17 conjugate, 68, 98, 117, 490 consistent, 257 improper, 118, 259, 472 noninformative, 23, 117 probabilistic graphical model, see graphical model probabilistic PCA, 570 probability, 12 Bayesian, 21 classical, 21 density, 17 frequentist, 21 mass function, 19 prior, 45 product rule, 13, 14, 359 

sum rule, 13, 14, 359 theory, 12 probably approximately correct, 344 probit function, 211, 219 probit regression, 210 product rule of probability, 13, 14, 359 proposal distribution, 528, 532, 538 protected conjugate gradients, 335 protein sequence, 610 pseudo-inverse, 142, 185 pseudo-random numbers, 526 quadratic discriminant, 199 quality parameter, 351 radial basis function, 292, 299 Rauch-Tung-Striebel equations, 637 regression, 3 regression function, 47, 95 regularization, 10 Tikhonov, 267 regularized least squares, 144 reinforcement learning, 3 reject option, 42, 45 rejection sampling, 528 relative entropy, 55 relevance vector, 348 relevance vector machine, 161, 345 responsibility, 112, 432, 477 ridge regression, 10 RMS error, see root-mean-square error Robbins-Monro algorithm, 95 robot arm, 272 robustness, 103, 185 root node, 399 root-mean-square error, 6 Rosenblatt, Frank, 193 rotation invariance, 573, 585 RTS equations, see Rauch-Tung-Striebel equations running intersection property, 416 RVM, see relevance vector machine sample mean, 27 sample variance, 27 sampling-importance-resampling, 534 scale invariance, 119, 261 

scale parameter, 119 scaling factor, 627 Schwarz criterion, see Bayesian information criterion self-organizing map, 598 sequential data, 605 sequential estimation, 94 sequential gradient descent, 144, 240 sequential learning, 73, 143 sequential minimal optimization, 335 serial message passing schedule, 417 Shannon, Claude, 55 shared parameters, 368 shrinkage, 10 Shur complement, 87 sigmoid, see logistic sigmoid simplex, 76 single-class support vector machine, 339 singular value decomposition, 143 sinusoidal data, 682 SIR, see sampling-importance-resampling skip-layer connection, 229 slack variable, 331 slice sampling, 546 SMO, see sequential minimal optimization smoother matrix, 159 smoothing parameter, 122 soft margin, 332 soft weight sharing, 269 softmax function, 115, 198, 236, 274, 356, 497 SOM, see self-organizing map sparsity, 145, 347, 349, 582 sparsity parameter, 351 spectrogram, 606 speech recognition, 605, 610 sphereing, 568 spline functions, 139 standard deviation, 24 standardizing, 425, 567 state space model, 609 switching, 644 stationary kernel, 292 statistical bias, see bias statistical independence, see independent variables statistical learning theory, see computational lear ing theory, 326, 344 steepest descent, 240 Stirling’s approximation, 51 stochastic, 5 stochastic EM, 536 stochastic gradient descent, 144, 240 stochastic process, 305 stratified flow, 678 Student’s t-distribution, 102, 483, 691 subsampling, 268 sufficient statistics, 69, 75, 116 sum rule of probability, 13, 14, 359 sum-of-squares error, 5, 29, 184, 232, 662 sum-product algorithm, 399, 402 for hidden Markov model, 625 supervised learning, 3 support vector, 330 support vector machine, 225 for regression, 339 multiclass, 338 survival of the fittest, 646 SVD, see singular value decomposition SVM, see support vector machine switching hidden Markov model, 644 switching state space model, 644 synthetic data sets, 682 

tail-to-tail path, 374 tangent distance, 265 tangent propagation, 262, 263 tapped delay line, 609 target vector, 2 test set, 2, 32 threshold parameter, 181 tied parameters, 368 Tikhonov regularization, 267 time warping, 615 tomography, 679 training, 2 training set, 2 transition probability, 540, 610 translation invariance, 118, 261 tree-reweighted message passing, 517 treewidth, 417 

trellis diagram, see lattice diagram triangulated graph, 416 type 2 maximum likelihood, see evidence approxi mation undetermined multiplier, see Lagrange multiplier undirected graph, see Markov random field uniform distribution, 692 uniform sampling, 534 uniquenesses, 584 unobserved variable, see latent variable unsupervised learning, 3 utility function, 41 validation set, 11, 32 Vapnik-Chervonenkis dimension, 344 variance, 20, 24, 149 variational inference, 315, 462, 635 for Gaussian mixture, 474 for hidden Markov model, 625 local, 493 VC dimension, see Vapnik-Chervonenkis dimension vector quantization, 429 vertex, see node visualization, 3 Viterbi algorithm, 415, 629 von Mises distribution, 108, 693 wavelets, 139 weak learner, 657 weight decay, 10, 144, 257 weight parameter, 227 weight sharing, 268 soft, 269 weight vector, 181 weight-space symmetry, 231, 281 weighted least squares, 668 well-determined parameters, 170 whitening, 299, 568 Wishart distribution, 102, 693 within-class covariance, 189 Woodbury identity, 696 wrapped distribution, 110 Yellowstone National Park, 110, 681 