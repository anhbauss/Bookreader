---
id: "tin-hieu-he-thong.10-1-2-properties-of-factorized-approximations"
doc_id: "tin-hieu-he-thong"
title: "10.1.2 Properties of factorized approximations"
level: 2
heading_path: ["Approximate Inference", "10.1.2 Properties of factorized approximations"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.leonhard-euler-1707-1783"
next_id: "tin-hieu-he-thong.10-1-3-example-the-univariate-gaussian"
block_ids: ["b5092", "b5093", "b5094", "b5095", "b5096", "b5097", "b5098", "b5099", "b5100", "b5101", "b5102", "b5103", "b5104", "b5105", "b5106", "b5107", "b5108", "b5109", "b5110", "b5111", "b5112", "b5113", "b5114", "b5115", "b5116", "b5117", "b5118", "b5119", "b5120", "b5121", "b5122", "b5123", "b5124", "b5125", "b5126", "b5127", "b5128", "b5129", "b5130", "b5131", "b5132", "b5133", "b5134"]
---

## 10.1.2 Properties of factorized approximations

Our approach to variational inference is based on a factorized approximation to the true posterior distribution. Let us consider for a moment the problem of approximating a general distribution by a factorized distribution. To begin with, we discuss the problem of approximating a Gaussian distribution using a factorized Gaussian, which will provide useful insight into the types of inaccuracy introduced in using factorized approximations. Consider a Gaussian distribution $\dot { p } ( { \bf z } ) = \mathcal { N } ( { \bf z } | \pmb { \mu } , \pmb { \Lambda } ^ { - 1 } )$ over two correlated variables $\textbf { z } = \ ( z _ { 1 } , z _ { 2 } )$ in which the mean and precision have elements

\boldsymbol {\mu} = \binom{\mu_ {1}}{\mu_ {2}}, \qquad \boldsymbol {\Lambda} = \left( \begin{array}{c c} \Lambda_ {1 1} & \Lambda_ {1 2} \\ \Lambda_ {2 1} & \Lambda_ {2 2} \end{array} \right)\tag{10.10}

and $\Lambda _ { 2 1 } = \Lambda _ { 1 2 }$ due to the symmetry of the precision matrix. Now suppose we wish to approximate this distribution using a factorized Gaussian of the form $q ( \mathbf { z } ) =$ $q _ { 1 } ( z _ { 1 } ) q _ { 2 } ( z _ { 2 } )$ . We first apply the general result (10.9) to find an expression for the optimal factor $q _ { 1 } ^ { \star } ( z _ { 1 } )$ . In doing so it is useful to note that on the right-hand side we only need to retain those terms that have some functional dependence on $z _ { 1 }$ because all other terms can be absorbed into the normalization constant. Thus we have

\begin{array}{r c l} \ln q _ {1} ^ {\star} (z _ {1}) & = & \mathbb {E} _ {z _ {2}} [ \ln p (\mathbf {z}) ] + \text { const } \\ & = & \mathbb {E} _ {z _ {2}} \left[ - \frac {1}{2} (z _ {1} - \mu_ {1}) ^ {2} \Lambda_ {1 1} - (z _ {1} - \mu_ {1}) \Lambda_ {1 2} (z _ {2} - \mu_ {2}) \right] + \text { const } \\ & = & - \frac {1}{2} z _ {1} ^ {2} \Lambda_ {1 1} + z _ {1} \mu_ {1} \Lambda_ {1 1} - z _ {1} \Lambda_ {1 2} (\mathbb {E} [ z _ {2} ] - \mu_ {2}) + \text { const }. \end{array} \tag {10.}\tag{10.11}

Next we observe that the right-hand side of this expression is a quadratic function of $z _ { 1 }$ , and so we can identify $q ^ { \star } ( z _ { 1 } )$ as a Gaussian distribution. It is worth emphasizing that we did not assume that $q ( z _ { i } )$ is Gaussian, but rather we derived this result by variational optimization of the KL divergence over all possible distributions $q ( z _ { i } )$ Note also that we do not need to consider the additive constant in (10.9) explicitly because it represents the normalization constant that can be found at the end by inspection if required. Using the technique of completing the square, we can identify the mean and precision of this Gaussian, giving

Section 2.3.1

q ^ {\star} (z _ {1}) = \mathcal {N} (z _ {1} | m _ {1}, \Lambda_ {1 1} ^ {- 1})\tag{10.12}

where

m _ {1} = \mu_ {1} - \Lambda_ {1 1} ^ {- 1} \Lambda_ {1 2} \left(\mathbb {E} [ z _ {2} ] - \mu_ {2}\right).\tag{10.13}

By symmetry, $q _ { 2 } ^ { \star } ( z _ { 2 } )$ is also Gaussian and can be written as

q _ {2} ^ {\star} (z _ {2}) = \mathcal {N} (z _ {2} | m _ {2}, \Lambda_ {2 2} ^ {- 1})\tag{10.14}

in which

m _ {2} = \mu_ {2} - \Lambda_ {2 2} ^ {- 1} \Lambda_ {2 1} \left(\mathbb {E} [ z _ {1} ] - \mu_ {1}\right).\tag{10.15}

Note that these solutions are coupled, so that $q ^ { \star } ( z _ { 1 } )$ depends on expectations computed with respect to $q ^ { \star } ( z _ { 2 } )$ and vice versa. In general, we address this by treating the variational solutions as re-estimation equations and cycling through the variables in turn updating them until some convergence criterion is satisfied. We shall see an example of this shortly. Here, however, we note that the problem is sufficiently simple that a closed form solution can be found. In particular, because $\mathbb { E } [ z _ { 1 } ] = m _ { 1 }$ and $\mathbb { E } [ z _ { 2 } ] = m _ { 2 }$ , we see that the two equations are satisfied if we take $\mathbb { E } [ z _ { 1 } ] = \mu _ { 1 }$ and $\mathbb { E } [ z _ { 2 } ] = \mu _ { 2 }$ , and it is easily shown that this is the only solution provided the distribution is nonsingular. This result is illustrated in Figure 10.2(a). We see that the mean is correctly captured but that the variance of $q ( \mathbf { z } )$ is controlled by the direction of smallest variance of $p ( \mathbf { z } )$ , and that the variance along the orthogonal direction is significantly under-estimated. It is a general result that a factorized variational approximation tends to give approximations to the posterior distribution that are too compact.

By way of comparison, suppose instead that we had been minimizing the reverse Kullback-Leibler divergence $\mathrm { K L } ( p | | q )$ . As we shall see, this form of KL divergence

Figure 10.2 Comparison of the two alternative forms for the Kullback-Leibler divergence. The green contours corresponding to 1, 2, and 3 standard deviations for a correlated Gaussian distribution $p ( \mathbf { z } )$ over two variables $z _ { 1 }$ and $z _ { 2 }$ and the red contours represent the corresponding levels for an approximating distribution $q ( \mathbf { z } )$ over the same variables given by the product of two independent univariate Gaussian distributions whose parameters are obtained by minimization of (a) the Kullback-Leibler divergence $\mathrm { K L } ( q \| p )$ and (b) the reverse Kullback-Leibler divergence $\mathrm { K L } ( p | | q )$

![image](images/part-003--107540168c71c12cea907b9287cd23807201a71ebe92d6bad2b4eb43d9af1951.jpg)

(a)

![image](images/part-003--3689725d7e1ce1f627f5be297bc0f74914cf02681c15d793bd21be3e3c0e8c70.jpg)

Section 10.7

is used in an alternative approximate inference framework called expectation propagation. We therefore consider the general problem of minimizing KL $( p \| q )$ when $q ( \mathbf { Z } )$ is a factorized approximation of the form (10.5). The KL divergence can then be written in the form

\mathrm{KL} (p \| q) = - \int p (\mathbf {Z}) \left[ \sum_ {i = 1} ^ {M} \ln q _ {i} (\mathbf {Z} _ {i}) \right] \mathrm{d} \mathbf {Z} + \mathrm{const}\tag{10.16}

Exercise 10.3

where the constant term is simply the entropy of $p ( \mathbf { Z } )$ and so does not depend on $q ( \mathbf { Z } )$ . We can now optimize with respect to each of the factors $q _ { j } ( \mathbf { Z } _ { j } )$ , which is easily done using a Lagrange multiplier to give

q _ {j} ^ {\star} (\mathbf {Z} _ {j}) = \int p (\mathbf {Z}) \prod_ {i \neq j} \mathrm{d} \mathbf {Z} _ {i} = p (\mathbf {Z} _ {j}).\tag{10.17}

In this case, we find that the optimal solution for $q _ { j } ( \mathbf { Z } _ { j } )$ is just given by the corresponding marginal distribution of $p ( \mathbf { Z } )$ . Note that this is a closed-form solution and so does not require iteration.

To apply this result to the illustrative example of a Gaussian distribution $p ( \mathbf { z } )$ over a vector z we can use (2.98), which gives the result shown in Figure 10.2(b). We see that once again the mean of the approximation is correct, but that it places significant probability mass in regions of variable space that have very low probability.

The difference between these two results can be understood by noting that there is a large positive contribution to the Kullback-Leibler divergence

\mathrm{KL} (q \| p) = - \int q (\mathbf {Z}) \ln \left\{\frac {p (\mathbf {Z})}{q (\mathbf {Z})} \right\} \mathrm{d} \mathbf {Z}\tag{10.18}

(c)

![image](images/part-003--f77bef3060afa3db6357905249388fc5ee47c653f9709a762b0845c0cc178adb.jpg)

![image](images/part-003--9d6817463717df792b7619f52af37c3dd6ba45031547ae311c0b33e1148d035b.jpg)

![image](images/part-003--d4aac4fccd14c4e313db53d81daeac84fd25c627941fdc418dfaf0621c4e92bb.jpg)

Figure 10.3 Another comparison of the two alternative forms for the Kullback-Leibler divergence. (a) The blue contours show a bimodal distribution $p ( \mathbf { Z } )$ given by a mixture of two Gaussians, and the red contours correspond to the single Gaussian distribution $q ( \mathbf { Z } )$ that best approximates $p ( \mathbf { Z } )$ in the sense of minimizing the Kullback-Leibler divergence $\mathrm { K L } ( p | | q )$ . (b) $\mathsf { A } \mathsf { s }$ in (a) but now the red contours correspond to a Gaussian distribution $q ( \mathbf { Z } )$ found by numerical minimization of the Kullback-Leibler divergence KL $( q \| p )$ . (c) As in (b) but showing a different local minimum of the Kullback-Leibler divergence.

from regions of Z space in which $p ( \mathbf { Z } )$ is near zero unless $q ( \mathbf { Z } )$ is also close to zero. Thus minimizing this form of KL divergence leads to distributions $q ( \mathbf { Z } )$ that avoid regions in which $p ( \mathbf { Z } )$ is small. Conversely, the Kullback-Leibler divergence KL $( p \| q )$ is minimized by distributions $q ( \mathbf { Z } )$ that are nonzero in regions where $p ( \mathbf { Z } )$ is nonzero.

We can gain further insight into the different behaviour of the two KL divergences if we consider approximating a multimodal distribution by a unimodal one, as illustrated in Figure 10.3. In practical applications, the true posterior distribution will often be multimodal, with most of the posterior mass concentrated in some number of relatively small regions of parameter space. These multiple modes may arise through nonidentifiability in the latent space or through complex nonlinear dependence on the parameters. Both types of multimodality were encountered in Chapter 9 in the context of Gaussian mixtures, where they manifested themselves as multiple maxima in the likelihood function, and a variational treatment based on the minimization of $\mathrm { K L } ( q \| p )$ will tend to find one of these modes. By contrast, if we were to minimize $\mathrm { K L } ( p | | q )$ , the resulting approximations would average across all of the modes and, in the context of the mixture model, would lead to poor predictive distributions (because the average of two good parameter values is typically itself not a good parameter value). It is possible to make use of $\mathrm { K L } ( p | | q )$ to define a useful inference procedure, but this requires a rather different approach to the one discussed here, and will be considered in detail when we discuss expectation propagation.

The two forms of Kullback-Leibler divergence are members of the alpha family

of divergences (Ali and Silvey, 1966; Amari, 1985; Minka, 2005) defined by

\mathrm{D} _ {\alpha} (p \| q) = \frac {4}{1 - \alpha^ {2}} \left(1 - \int p (x) ^ {(1 + \alpha) / 2} q (x) ^ {(1 - \alpha) / 2} \mathrm{d} x\right)\tag{10.19}

where $- \infty < \alpha < \infty$ is a continuous parameter. The Kullback-Leibler divergence $\mathrm { K L } ( p | | q )$ corresponds to the limit $\alpha  1$ , whereas $\mathrm { K L } ( q \| p )$ corresponds to the limit $\alpha  - 1$ . For all values of α we have $\begin{array} { r } { \mathrm { D } _ { \alpha } ( p \Vert q ) \geqslant 0 } \end{array}$ , with equality if, and only if, $p ( x ) = q ( x )$ . Suppose $p ( x )$ is a fixed distribution, and we minimize $\mathrm { D } _ { \alpha } ( p \Vert q )$ with respect to some set of distributions $q ( x )$ . Then for $\alpha \leqslant - 1$ the divergence is zero forcing, so that any values of x for which $p ( x ) = 0$ will have $q ( x ) = 0$ , and typically $q ( x )$ will under-estimate the support of $p ( x )$ and will tend to seek the mode with the largest mass. Conversely for $\alpha \geqslant 1$ the divergence is zero-avoiding, so that values of $x$ for which $p ( x ) > 0$ will have $q ( x ) > 0$ , and typically $q ( x )$ will stretch to cover all of $p ( x )$ , and will over-estimate the support of $p ( x )$ . When $\alpha = 0$ we obtain a symmetric divergence that is linearly related to the Hellinger distance given by

\mathrm{D} _ {\mathrm{H}} (p \| q) = \int \left(p (x) ^ {1 / 2} - q (x) ^ {1 / 2}\right) \mathrm{d} x.\tag{10.20}

The square root of the Hellinger distance is a valid distance metric.
