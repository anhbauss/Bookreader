---
id: "tin-hieu-he-thong.10-7-1-example-the-clutter-problem"
doc_id: "tin-hieu-he-thong"
title: "10.7.1 Example: The clutter problem"
level: 2
heading_path: ["Approximate Inference", "10.7.1 Example: The clutter problem"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.expectation-propagation"
next_id: "tin-hieu-he-thong.10-7-2-expectation-propagation-on-graphs"
block_ids: ["b5649", "b5650", "b5651", "b5652", "b5653", "b5654", "b5655", "b5656", "b5657", "b5658", "b5659", "b5660", "b5661", "b5662", "b5663", "b5664", "b5665", "b5666", "b5667", "b5668", "b5669", "b5670", "b5671", "b5672", "b5673", "b5674", "b5675", "b5676", "b5677", "b5678", "b5679", "b5680", "b5681", "b5682", "b5683", "b5684", "b5685"]
---

## 10.7.1 Example: The clutter problem

Following Minka (2001b), we illustrate the EP algorithm using a simple example in which the goal is to infer the mean $\pmb \theta$ of a multivariate Gaussian distribution over a variable x given a set of observations drawn from that distribution. To make the problem more interesting, the observations are embedded in background clutter, which itself is also Gaussian distributed, as illustrated in Figure 10.15. The distribution of observed values x is therefore a mixture of Gaussians, which we take to be of the form

p (\mathbf {x} | \boldsymbol {\theta}) = (1 - w) \mathcal {N} (\mathbf {x} | \boldsymbol {\theta}, \mathbf {I}) + w \mathcal {N} (\mathbf {x} | \mathbf {0}, a \mathbf {I})\tag{10.209}

where $w$ is the proportion of background clutter and is assumed to be known. The prior over $\pmb \theta$ is taken to be Gaussian

p (\boldsymbol {\theta}) = \mathcal {N} (\boldsymbol {\theta} | \mathbf {0}, b \mathbf {I})\tag{10.210}

and Minka (2001a) chooses the parameter values $a = 1 0 , b = 1 0 0$ and $w = 0 . 5$ The joint distribution of N observations $\mathcal { D } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ and θ is given by

p (\mathcal {D}, \pmb {\theta}) = p (\pmb {\theta}) \prod_ {n = 1} ^ {N} p (\mathbf {x} _ {n} | \pmb {\theta})\tag{10.211}

and so the posterior distribution comprises a mixture of $2 ^ { N }$ Gaussians. Thus the computational cost of solving this problem exactly would grow exponentially with the size of the data set, and so an exact solution is intractable for moderately large $N$

To apply EP to the clutter problem, we first identify the factors $f _ { 0 } ( \pmb { \theta } ) = p ( \pmb { \theta } )$ and $f _ { n } ( \pmb { \theta } ) = p ( \mathbf x _ { n } | \pmb \theta )$ . Next we select an approximating distribution from the exponential family, and for this example it is convenient to choose a spherical Gaussian

q (\boldsymbol {\theta}) = \mathcal {N} (\boldsymbol {\theta} | \mathbf {m}, v \mathbf {I}).\tag{10.212}

The factor approximations will therefore take the form of exponential-quadratic functions of the form

\widetilde {f} _ {n} (\pmb {\theta}) = s _ {n} \mathcal {N} (\pmb {\theta} | \mathbf {m} _ {n}, v _ {n} \mathbf {I})\tag{10.213}

where $n = 1 , \ldots , N$ , and we set $\widetilde { f } _ { 0 } ( \pmb { \theta } )$ equal to the prior $p ( \pmb \theta )$ . Note that the use of $\mathcal { N } ( \pmb \theta | \cdot , \cdot )$ does not imply that the right-hand side is a well-defined Gaussian density (in fact, as we shall see, the variance parameter $v _ { n }$ can be negative) but is simply a convenient shorthand notation. The approximations ${ \widetilde { f } } _ { n } ( \pmb \theta )$ , for $n = 1 , \ldots , N$ , can be initialized to unity, corresponding to $s _ { n } = ( 2 \pi v _ { n } ) ^ { D / 2 } , v _ { n } \to \infty$ and $\mathbf { m } _ { n } = \mathbf { 0 }$ where $D$ is the dimensionality of x and hence of $\pmb { \theta } .$ . The initial $q ( \pmb \theta )$ , defined by (10.191), is therefore equal to the prior.

We then iteratively refine the factors by taking one factor $f _ { n } ( \pmb \theta )$ at a time and applying (10.205), (10.206), and (10.207). Note that we do not need to revise the term $f _ { 0 } ( \pmb { \theta } )$ because an EP update will leave this term unchanged. Here we state the results and leave the reader to fill in the details.

First we remove the current estimate ${ \dot { f } } _ { n } ( \pmb { \theta } )$ from $q ( \pmb \theta )$ by division using (10.205) to give $q ^ { \setminus n } ( \pmb \theta )$ , which has mean and inverse variance given by

{\bf m} ^ {\backslash n} = {\bf m} + v ^ {\backslash n} v _ {n} ^ {- 1} ({\bf m} - {\bf m} _ {n})\tag{10.214}

(v ^ {\backslash n}) ^ {- 1} = v ^ {- 1} - v _ {n} ^ {- 1}.\tag{10.215}

Next we evaluate the normalization constant $Z _ { n }$ using (10.206) to give

Z _ {n} = (1 - w) \mathcal {N} (\mathbf {x} _ {n} | \mathbf {m} ^ {\backslash n}, (v ^ {\backslash n} + 1) \mathbf {I}) + w \mathcal {N} (\mathbf {x} _ {n} | \mathbf {0}, a \mathbf {I}).\tag{10.216}

Similarly, we compute the mean and variance of $q ^ { \mathrm { n e w } } ( \pmb { \theta } )$ by finding the mean and variance of $q ^ { \backslash n } ( \pmb \theta ) \bar { f } _ { n } ( \pmb \theta )$ to give

\mathbf {m} = \mathbf {m} ^ {\backslash n} + \rho_ {n} \frac {v ^ {\backslash n}}{v ^ {\backslash n} + 1} (\mathbf {x} _ {n} - \mathbf {m} ^ {\backslash n})\tag{10.217}

v = v ^ {\backslash n} - \rho_ {n} \frac {(v ^ {\backslash n}) ^ {2}}{v ^ {\backslash n} + 1} + \rho_ {n} (1 - \rho_ {n}) \frac {(v ^ {\backslash n}) ^ {2} \| \mathbf {x} _ {n} - \mathbf {m} ^ {\backslash n} \| ^ {2}}{D (v ^ {\backslash n} + 1) ^ {2}}\tag{10.218}

where the quantity

\rho_ {n} = 1 - \frac {w}{Z _ {n}} \mathcal {N} (\mathbf {x} _ {n} | \mathbf {0}, a \mathbf {I})\tag{10.219}

has a simple interpretation as the probability of the point ${ \bf x } _ { n }$ not being clutter. Then we use (10.207) to compute the refined factor $\widetilde { f } _ { n } ( \pmb { \theta } )$ whose parameters are given by

{v _ {n} ^ {- 1}} = {(v ^ {\mathrm{new}}) ^ {- 1} - (v ^ {\backslash n}) ^ {- 1}}\tag{10.220}

\mathbf {m} _ {n} = \mathbf {m} ^ {\backslash n} + (v _ {n} + v ^ {\backslash n}) (v ^ {\backslash n}) ^ {- 1} (\mathbf {m} ^ {\mathrm{new}} - \mathbf {m} ^ {\backslash n})\tag{10.221}

Z _ {n}

{s _ {n}} = {\frac {n}{(2 \pi v _ {n}) ^ {D / 2} \mathcal {N} (\mathbf {m} _ {n} | \mathbf {m} ^ {\backslash n} , (v _ {n} + v ^ {\backslash n}) \mathbf {I})}.}\tag{10.222}

This refinement process is repeated until a suitable termination criterion is satisfied, for instance that the maximum change in parameter values resulting from a complete pass through all factors is less than some threshold. Finally, we use (10.208) to evaluate the approximation to the model evidence, given by

![image](images/part-003--f290d67a2c42c4f82ccd2f498acc78947ad17e90da2c70e9bf33d0f92e637174.jpg)

![image](images/part-003--0cf60405cbeb9b71aedcb5260d7d1d4fe9a15b4027e02f314d3944356cf9a115.jpg)

Figure 10.16 Examples of the approximation of specific factors for a one-dimensional version of the clutter problem, showing $f _ { n } ( \theta )$ in blue, ${ \widetilde { f } } _ { n } ( \theta )$ in red, and $q ^ { \setminus n } ( \theta )$ in green. Notice that the current form for $q ^ { \setminus n } ( \theta )$ controls the range of θ over which ${ \widetilde { f } } _ { n } ( \theta )$ will be a good approximation to $f _ { n } ( \theta )$

p (\mathcal {D}) \simeq (2 \pi v ^ {\mathrm{new}}) ^ {D / 2} \exp (B / 2) \prod_ {n = 1} ^ {N} \left\{s _ {n} (2 \pi v _ {n}) ^ {- D / 2} \right\}\tag{10.223}

where

B = \frac {(\mathbf {m} ^ {\mathrm{new}}) ^ {\mathrm{T}} \mathbf {m} ^ {\mathrm{new}}}{v} - \sum_ {n = 1} ^ {N} \frac {\mathbf {m} _ {n} ^ {\mathrm{T}} \mathbf {m} _ {n}}{v _ {n}}.\tag{10.224}

Examples factor approximations for the clutter problem with a one-dimensional parameter space $\theta$ are shown in Figure 10.16. Note that the factor approximations can have infinite or even negative values for the ‘variance’ parameter $v _ { n }$ . This simply corresponds to approximations that curve upwards instead of downwards and are not necessarily problematic provided the overall approximate posterior $q ( \pmb \theta )$ has positive variance. Figure 10.17 compares the performance of EP with variational Bayes (mean field theory) and the Laplace approximation on the clutter problem.
