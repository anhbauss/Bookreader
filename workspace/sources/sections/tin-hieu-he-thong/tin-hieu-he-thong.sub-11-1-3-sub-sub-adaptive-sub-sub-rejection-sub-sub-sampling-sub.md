---
id: "tin-hieu-he-thong.sub-11-1-3-sub-sub-adaptive-sub-sub-rejection-sub-sub-sampling-sub"
doc_id: "tin-hieu-he-thong"
title: "\u0004<sub>11.1.3</sub> <sub>Adaptive</sub> <sub>rejection</sub> <sub>sampling</sub>"
level: 2
heading_path: ["Sampling Methods", "\u0004<sub>11.1.3</sub> <sub>Adaptive</sub> <sub>rejection</sub> <sub>sampling</sub>"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-1-2-rejection-sampling"
next_id: "tin-hieu-he-thong.11-1-4-importance-sampling"
block_ids: ["b5850", "b5851", "b5852", "b5853", "b5854", "b5855", "b5856", "b5857", "b5858", "b5859", "b5860", "b5861", "b5862", "b5863"]
---

## <sub>11.1.3</sub> <sub>Adaptive</sub> <sub>rejection</sub> <sub>sampling</sub>

In many instances where we might wish to apply rejection sampling, it proves difficult to determine a suitable analytic form for the envelope distribution $q ( z )$ . An alternative approach is to construct the envelope function on the fly based on measured values of the distribution $p ( z )$ (Gilks and Wild, 1992). Construction of an envelope function is particularly straightforward for cases in which $p ( z )$ is log concave, in other words when ln $p ( z )$ has derivatives that are nonincreasing functions of z. The construction of a suitable envelope function is illustrated graphically in Figure 11.6.

The function ln $p ( z )$ and its gradient are evaluated at some initial set of grid points, and the intersections of the resulting tangent lines are used to construct the envelope function. Next a sample value is drawn from the envelope distribution. This is straightforward because the log of the envelope distribution is a succession of linear functions, and hence the envelope distribution itself comprises a piecewise exponential distribution of the form

In the case of distributions that are log concave, an envelope function for use in rejection sampling can be constructed using the tangent lines computed at a set of grid points. If a sample point is rejected, it is added to the set of grid points and used to refine the envelope distribution.

![image](images/part-003--38b36c30d57b20e7fc55c772d3d035cac44464dcf656455fe2482ef6e28609d6.jpg)

Figure 11.7 Illustrative example of rejection sampling involving sampling from a Gaussian distribution $p ( z )$ shown by the green curve, by using rejection sampling from a proposal distribution $\overset { \cdot } { q } ( z )$ that is also Gaussian and whose scaled version $k q ( z )$ is shown by the red curve.

![image](images/part-003--51c28c7dda4af343ce0b04ed09053123b117ecfaf63b28e9bca13b05d0f31f0b.jpg)

q (z) = k _ {i} \lambda_ {i} \exp \left\{- \lambda_ {i} (z - z _ {i - 1}) \right\} \quad z _ {i - 1} <   z \leqslant z _ {i}.\tag{11.17}

Once a sample has been drawn, the usual rejection criterion can be applied. If the sample is accepted, then it will be a draw from the desired distribution. If, however, the sample is rejected, then it is incorporated into the set of grid points, a new tangent line is computed, and the envelope function is thereby refined. As the number of grid points increases, so the envelope function becomes a better approximation of the desired distribution $p ( z )$ and the probability of rejection decreases.

A variant of the algorithm exists that avoids the evaluation of derivatives (Gilks, 1992). The adaptive rejection sampling framework can also be extended to distributions that are not log concave, simply by following each rejection sampling step with a Metropolis-Hastings step (to be discussed in Section 11.2.2), giving rise to adaptive rejection Metropolis sampling (Gilks et al., 1995).

Clearly for rejection sampling to be of practical value, we require that the comparison function be close to the required distribution so that the rate of rejection is kept to a minimum. Now let us examine what happens when we try to use rejection sampling in spaces of high dimensionality. Consider, for the sake of illustration, a somewhat artificial problem in which we wish to sample from a zero-mean multivariate Gaussian distribution with covariance $\sigma _ { p } ^ { 2 } \mathbf { I }$ , where I is the unit matrix, by rejection sampling from a proposal distribution that is itself a zero-mean Gaussian distribution having covariance ${ \bar { \sigma } } _ { q } ^ { 2 } \mathbf { I }$ . Obviously, we must have $\sigma _ { q } ^ { 2 } \geqslant \sigma _ { p } ^ { 2 }$ in order that there exists a k such that $k q ( z ) \stackrel { \triangledown } { \geqslant } p ( z )$ . In D-dimensions the optimum value of k is given by $k = ( \sigma _ { q } / \sigma _ { p } ) ^ { D }$ , as illustrated for $D = 1$ in Figure 11.7. The acceptance rate will be the ratio of volumes under $p ( z )$ and $k q ( z )$ , which, because both distributions are normalized, is just $1 / k$ . Thus the acceptance rate diminishes exponentially with dimensionality. Even if $\sigma _ { q }$ exceeds $\sigma _ { p }$ by just one percent, for $D = 1 , 0 0 0$ the acceptance ratio will be approximately $1 / 2 0 , 0 0 0$ In this illustrative example the comparison function is close to the required distribution. For more practical examples, where the desired distribution may be multimodal and sharply peaked, it will be extremely difficult to find a good proposal distribution and comparison function.

Figure 11.8 Importance sampling addresses the problem of evaluating the expectation of a function $f ( z )$ with respect to a distribution $p ( z )$ from which it is difficult to draw samples directly. Instead, samples $\{ z ^ { ( l ) } \}$ are drawn from a simpler distribution $q ( z )$ , and the corresponding terms in the summation are weighted by the ratios $p ( z ^ { ( l ) } ) / q ( z ^ { ( l ) } )$ .

![image](images/part-003--f5f8ead216940804d29fb060c83e03fb3ecb9d18d2fed30683cde1abba04deb6.jpg)

Furthermore, the exponential decrease of acceptance rate with dimensionality is a generic feature of rejection sampling. Although rejection can be a useful technique in one or two dimensions it is unsuited to problems of high dimensionality. It can, however, play a role as a subroutine in more sophisticated algorithms for sampling in high dimensional spaces.
