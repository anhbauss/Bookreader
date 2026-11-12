---
id: "tin-hieu-he-thong.10-2-1-variational-distribution"
doc_id: "tin-hieu-he-thong"
title: "10.2.1 Variational distribution"
level: 2
heading_path: ["Approximate Inference", "10.2.1 Variational distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-2-illustration-variational-mixture-of-gaussians"
next_id: "tin-hieu-he-thong.10-2-2-variational-lower-bound"
block_ids: ["b5197", "b5198", "b5199", "b5200", "b5201", "b5202", "b5203", "b5204", "b5205", "b5206", "b5207", "b5208", "b5209", "b5210", "b5211", "b5212", "b5213", "b5214", "b5215", "b5216", "b5217", "b5218", "b5219", "b5220", "b5221", "b5222", "b5223", "b5224", "b5225", "b5226", "b5227", "b5228", "b5229", "b5230", "b5231", "b5232", "b5233", "b5234", "b5235", "b5236", "b5237", "b5238", "b5239", "b5240", "b5241", "b5242", "b5243", "b5244", "b5245", "b5246", "b5247", "b5248", "b5249", "b5250", "b5251", "b5252", "b5253", "b5254", "b5255", "b5256", "b5257", "b5258", "b5259", "b5260", "b5261", "b5262", "b5263", "b5264", "b5265", "b5266", "b5267", "b5268", "b5269", "b5270", "b5271"]
---

## 10.2.1 Variational distribution

In order to formulate a variational treatment of this model, we next write down the joint distribution of all of the random variables, which is given by

p (\mathbf {X}, \mathbf {Z}, \boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) = p (\mathbf {X} | \mathbf {Z}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) p (\mathbf {Z} | \boldsymbol {\pi}) p (\boldsymbol {\pi}) p (\boldsymbol {\mu} | \boldsymbol {\Lambda}) p (\boldsymbol {\Lambda})\tag{10.41}

in which the various factors are defined above. The reader should take a moment to verify that this decomposition does indeed correspond to the probabilistic graphical model shown in Figure 10.5. Note that only the variables $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ are observed.

We now consider a variational distribution which factorizes between the latent variables and the parameters so that

q (\mathbf {Z}, \boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) = q (\mathbf {Z}) q (\boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}).\tag{10.42}

It is remarkable that this is the only assumption that we need to make in order to obtain a tractable practical solution to our Bayesian mixture model. In particular, the functional form of the factors $q ( \mathbf { Z } )$ and $q ( \pi , \mu , \Lambda )$ will be determined automatically by optimization of the variational distribution. Note that we are omitting the subscripts on the $q$ distributions, much as we do with the $p$ distributions in (10.41), and are relying on the arguments to distinguish the different distributions.

The corresponding sequential update equations for these factors can be easily derived by making use of the general result (10.9). Let us consider the derivation of the update equation for the factor $q ( \mathbf { Z } )$ . The log of the optimized factor is given by

\ln q ^ {\star} (\mathbf {Z}) = \mathbb {E} _ {\boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}} [ \ln p (\mathbf {X}, \mathbf {Z}, \boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) ] + \mathrm{const}.\tag{10.43}

We now make use of the decomposition (10.41). Note that we are only interested in the functional dependence of the right-hand side on the variable Z. Thus any terms that do not depend on $\mathbf { Z }$ can be absorbed into the additive normalization constant, giving

\ln q ^ {\star} (\mathbf {Z}) = \mathbb {E} _ {\boldsymbol {\pi}} [ \ln p (\mathbf {Z} | \boldsymbol {\pi}) ] + \mathbb {E} _ {\boldsymbol {\mu}, \boldsymbol {\Lambda}} [ \ln p (\mathbf {X} | \mathbf {Z}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) ] + \mathrm{const.}\tag{10.44}

Substituting for the two conditional distributions on the right-hand side, and again absorbing any terms that are independent of $\mathbf { Z }$ into the additive constant, we have

\ln q ^ {\star} (\mathbf {Z}) = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} z _ {n k} \ln \rho_ {n k} + \text { const }\tag{10.45}

where we have defined

\begin{array}{r l r} \ln \rho_ {n k} & = & \mathbb {E} [ \ln \pi_ {k} ] + \frac {1}{2} \mathbb {E} \left[ \ln | \boldsymbol {\Lambda} _ {k} | \right] - \frac {D}{2} \ln (2 \pi) \\ & & - \frac {1}{2} \mathbb {E} _ {\boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k}} \left[ (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}} \boldsymbol {\Lambda} _ {k} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k}) \right] \end{array}\tag{10.46}

where $D$ is the dimensionality of the data variable x. Taking the exponential of both sides of (10.45) we obtain

q ^ {\star} (\mathbf {Z}) \propto \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} \rho_ {n k} ^ {z _ {n k}}.\tag{10.47}

Exercise 10.12

Requiring that this distribution be normalized, and noting that for each value of n the quantities $z _ { n k }$ are binary and sum to 1 over all values of k, we obtain

q ^ {\star} (\mathbf {Z}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} r _ {n k} ^ {z _ {n k}}\tag{10.48}

where

r _ {n k} = \frac {\rho_ {n k}}{\sum_ {j = 1} ^ {K} \rho_ {n j}}.\tag{10.49}

We see that the optimal solution for the factor $q ( \mathbf { Z } )$ takes the same functional form as the prior $p ( \mathbf { Z } | \pi )$ . Note that because $\rho _ { n k }$ is given by the exponential of a real quantity, the quantities $r _ { n k }$ will be nonnegative and will sum to one, as required.

For the discrete distribution $q ^ { \star } ( \mathbf { Z } )$ we have the standard result

\mathbb {E} [ z _ {n k} ] = r _ {n k}\tag{10.50}

from which we see that the quantities $r _ { n k }$ are playing the role of responsibilities. Note that the optimal solution for $q ^ { \star } ( \mathbf { Z } )$ depends on moments evaluated with respect to the distributions of other variables, and so again the variational update equations are coupled and must be solved iteratively.

At this point, we shall find it convenient to define three statistics of the observed data set evaluated with respect to the responsibilities, given by

N _ {k} = \sum_ {n = 1} ^ {N} r _ {n k}\tag{10.51}

{\overline {{\mathbf {x}}} _ {k}} = {\frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} r _ {n k} \mathbf {x} _ {n}}\tag{10.52}

\mathbf {S} _ {k} = \frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} r _ {n k} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}} _ {k}) (\mathbf {x} _ {n} - \overline {{\mathbf {x}}} _ {k}) ^ {\mathrm{T}}.\tag{10.53}

Note that these are analogous to quantities evaluated in the maximum likelihood EM algorithm for the Gaussian mixture model.

Now let us consider the factor $q ( \pi , \mu , \Lambda )$ in the variational posterior distribution. Again using the general result (10.9) we have

\begin{array}{l} \ln q ^ {\star} (\boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) = \ln p (\boldsymbol {\pi}) + \sum_ {k = 1} ^ {K} \ln p \left(\boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k}\right) + \mathbb {E} _ {\mathbf {Z}} [ \ln p (\mathbf {Z} | \boldsymbol {\pi}) ] \\ + \sum_ {k = 1} ^ {K} \sum_ {n = 1} ^ {N} \mathbb {E} \left[ z _ {n k} \right] \ln \mathcal {N} \left(\mathbf {x} _ {n} \mid \boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k} ^ {- 1}\right) + \text { const. } \end{array} \tag {10}\tag{10.54}

We observe that the right-hand side of this expression decomposes into a sum of terms involving only π together with terms only involving $\pmb { \mu }$ and Λ, which implies that the variational posterior $q ( \pi , \mu , \Lambda )$ factorizes to give $q ( \pi ) q ( \pmb { \mu } , \pmb { \Lambda } )$ . Furthermore, the terms involving $\pmb { \mu }$ and Λ themselves comprise a sum over k of terms involving $\pmb { \mu } _ { k }$ and $\mathbf { \Lambda } _ { \Lambda _ { k } }$ leading to the further factorization

q (\boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) = q (\boldsymbol {\pi}) \prod_ {k = 1} ^ {K} q (\boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k}).\tag{10.55}

Identifying the terms on the right-hand side of (10.54) that depend on π, we have

\ln q ^ {\star} (\boldsymbol {\pi}) = (\alpha_ {0} - 1) \sum_ {k = 1} ^ {K} \ln \pi_ {k} + \sum_ {k = 1} ^ {K} \sum_ {n = 1} ^ {N} r _ {n k} \ln \pi_ {k} + \text { const }\tag{10.56}

where we have used (10.50). Taking the exponential of both sides, we recognize $q ^ { \star } ( \pi )$ as a Dirichlet distribution

q ^ {\star} (\boldsymbol {\pi}) = \operatorname{Dir} (\boldsymbol {\pi} | \boldsymbol {\alpha})\tag{10.57}

where α has components $\alpha _ { k }$ given by

\alpha_ {k} = \alpha_ {0} + N _ {k}.\tag{10.58}

Finally, the variational posterior distribution $q ^ { \star } ( \pmb { \mu } _ { k } , \pmb { \Lambda } _ { k } )$ does not factorize into the product of the marginals, but we can always use the product rule to write it in the form $q ^ { \star } ( { \pmb \mu } _ { k } , \pmb \Lambda _ { k } ) = q ^ { \star } ( { \pmb \mu } _ { k } | \pmb \Lambda _ { k } ) q ^ { \star } ( \pmb \Lambda _ { k } )$ . The two factors can be found by inspecting (10.54) and reading off those terms that involve $\mu _ { k }$ and $\mathbf { \Lambda } _ { \Lambda _ { k } }$ . The result, as expected, is a Gaussian-Wishart distribution and is given by

Exercise 10.13

q ^ {\star} \left(\boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k}\right) = \mathcal {N} \left(\boldsymbol {\mu} _ {k} \mid \mathbf {m} _ {k}, \left(\beta_ {k} \boldsymbol {\Lambda} _ {k}\right) ^ {- 1}\right) \mathcal {W} \left(\boldsymbol {\Lambda} _ {k} \mid \mathbf {W} _ {k}, \nu_ {k}\right)\tag{10.59}

where we have defined

\beta_ {k} = \beta_ {0} + N _ {k}\tag{10.60}

{\mathbf {m} _ {k}} = {\frac {1}{\beta_ {k}} \left(\beta_ {0} \mathbf {m} _ {0} + N _ {k} \overline {{\mathbf {x}}} _ {k}\right)}\tag{10.61}

{\mathbf {W} _ {k} ^ {- 1}} = {\mathbf {W} _ {0} ^ {- 1} + N _ {k} \mathbf {S} _ {k} + \frac {\beta_ {0} N _ {k}}{\beta_ {0} + N _ {k}} (\overline {{\mathbf {x}}} _ {k} - \mathbf {m} _ {0}) (\overline {{\mathbf {x}}} _ {k} - \mathbf {m} _ {0}) ^ {\mathrm{T}}}\tag{10.62}

\nu_ {k} = \nu_ {0} + N _ {k}.\tag{10.63}

These update equations are analogous to the M-step equations of the EM algorithm for the maximum likelihood solution of the mixture of Gaussians. We see that the computations that must be performed in order to update the variational posterior distribution over the model parameters involve evaluation of the same sums over the data set, as arose in the maximum likelihood treatment.

In order to perform this variational M step, we need the expectations $\mathbb { E } [ z _ { n k } ] =$ $r _ { n k }$ representing the responsibilities. These are obtained by normalizing the $\rho _ { n k }$ that are given by (10.46). We see that this expression involves expectations with respect to the variational distributions of the parameters, and these are easily evaluated to give

Exercise 10.14

\begin{array}{r l} & {\mathbb {E} _ {\boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k}} \left[ (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}} \boldsymbol {\Lambda} _ {k} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k}) \right]} \\ & {\quad = D \beta_ {k} ^ {- 1} + \nu_ {k} (\mathbf {x} _ {n} - \mathbf {m} _ {k}) ^ {\mathrm{T}} \mathbf {W} _ {k} (\mathbf {x} _ {n} - \mathbf {m} _ {k})} \end{array}\tag{10.64}

\ln \widetilde {\Lambda} _ {k} \equiv \mathbb {E} \left[ \ln | \boldsymbol {\Lambda} _ {k} | \right] = \sum_ {i = 1} ^ {D} \psi \left(\frac {\nu_ {k} + 1 - i}{2}\right) + D \ln 2 + \ln | \mathbf {W} _ {k} |\tag{10.65}

\ln \widetilde {\pi} _ {k} \equiv \mathbb {E} \left[ \ln \pi_ {k} \right] = \psi (\alpha_ {k}) - \psi (\widehat {\alpha})\tag{10.66}

where we have introduced definitions of $\widetilde { \Lambda } _ { k }$ and $\widetilde { \pi } _ { k } .$ , and $\psi ( \cdot )$ is the digamma function defined by (B.25), with $\widehat { \alpha } = \textstyle \sum _ { k } \alpha _ { k }$ . The results (10.65) and (10.66) follow from the standard properties of the Wishart and Dirichlet distributions.

If we substitute (10.64), (10.65), and (10.66) into (10.46) and make use of (10.49), we obtain the following result for the responsibilities

r _ {n k} \propto \widetilde {\pi} _ {k} \widetilde {\Lambda} _ {k} ^ {1 / 2} \exp \left\{- \frac {D}{2 \beta_ {k}} - \frac {\nu_ {k}}{2} (\mathbf {x} _ {n} - \mathbf {m} _ {k}) ^ {\mathrm{T}} \mathbf {W} _ {k} (\mathbf {x} _ {n} - \mathbf {m} _ {k}) \right\}.\tag{10.67}

Notice the similarity to the corresponding result for the responsibilities in maximum likelihood EM, which from (9.13) can be written in the form

r _ {n k} \propto \pi_ {k} | \boldsymbol {\Lambda} _ {k} | ^ {1 / 2} \exp \left\{- \frac {1}{2} (\mathbf {x} _ {n} - \pmb {\mu} _ {k}) ^ {\mathrm{T}} \pmb {\Lambda} _ {k} (\mathbf {x} _ {n} - \pmb {\mu} _ {k}) \right\}\tag{10.68}

where we have used the precision in place of the covariance to highlight the similarity to (10.67).

Thus the optimization of the variational posterior distribution involves cycling between two stages analogous to the E and M steps of the maximum likelihood EM algorithm. In the variational equivalent of the E step, we use the current distributions over the model parameters to evaluate the moments in (10.64), (10.65), and (10.66) and hence evaluate $\mathbb { E } [ z _ { n k } ] = r _ { n k }$ . Then in the subsequent variational equivalent of the M step, we keep these responsibilities fixed and use them to re-compute the variational distribution over the parameters using (10.57) and (10.59). In each case, we see that the variational posterior distribution has the same functional form as the corresponding factor in the joint distribution (10.41). This is a general result and is a consequence of the choice of conjugate distributions.

Figure 10.6 shows the results of applying this approach to the rescaled Old Faithful data set for a Gaussian mixture model having $K = 6$ components. We see that after convergence, there are only two components for which the expected values of the mixing coefficients are numerically distinguishable from their prior values. This effect can be understood qualitatively in terms of the automatic trade-off in a Bayesian model between fitting the data and the complexity of the model, in which the complexity penalty arises from components whose parameters are pushed away from their prior values. Components that take essentially no responsibility for explaining the data points have $r _ { n k } \simeq 0$ and hence $N _ { k } \simeq 0$ . From (10.58), we see that $\alpha _ { k } \simeq \alpha _ { 0 }$ and from (10.60)–(10.63) we see that the other parameters revert to their prior values. In principle such components are fitted slightly to the data points, but for broad priors this effect is too small to be seen numerically. For the variational Gaussian mixture model the expected values of the mixing coefficients in the posterior distribution are given by

\mathbb {E} [ \pi_ {k} ] = \frac {\alpha_ {k} + N _ {k}}{K \alpha_ {0} + N}.\tag{10.69}

Consider a component for which $N _ { k } \simeq 0$ and $\alpha _ { k } \simeq \alpha _ { 0 }$ . If the prior is broad so that $\alpha _ { 0 }  0$ , then $\bar { \mathbb { E } [ \pi _ { k } ] } \to 0$ and the component plays no role in the model, whereas if

Figure 10.6 Variational Bayesian mixture of $K \ = \ 6$ Gaussians applied to the Old Faithful data set, in which the ellipses denote the one standard-deviation density contours for each of the components, and the density of red ink inside each ellipse corresponds to the mean value of the mixing coefficient for each component. The number in the top left of each diagram shows the number of iterations of variational inference. Components whose expected mixing coefficient are numerically indistinguishable from zero are not plotted.

![image](images/part-003--7d72e89259b6c9e6214b5f7be8e406778690e71b6f8fd203a1070b80f0661ca8.jpg)

![image](images/part-003--61dde09f523d50d5cee77d4317698f675d728703a4d85a978b6a8c9e8d2d8808.jpg)

![image](images/part-003--b8f24677a6cdda05165df3f4d63f204f3c1654869c76e2690f151cb4a4deffbe.jpg)

![image](images/part-003--8960848dd2b03d633ed162c873aca51adaef8fceffe9deb4c58f4667e2a4ccba.jpg)

the prior tightly constrains the mixing coefficients so that $\alpha _ { 0 }  \infty ,$ , then $\mathbb { E } [ \pi _ { k } ] \to$ $1 / K$

In Figure 10.6, the prior over the mixing coefficients is a Dirichlet of the form (10.39). Recall from Figure 2.5 that for $\alpha _ { 0 } < 1$ the prior favours solutions in which some of the mixing coefficients are zero. Figure 10.6 was obtained using $\alpha _ { 0 } = 1 0 ^ { - 3 }$ and resulted in two components having nonzero mixing coefficients. If instead we choose $\alpha _ { 0 } = 1$ we obtain three components with nonzero mixing coefficients, and for $\alpha = 1 0$ all six components have nonzero mixing coefficients.

As we have seen there is a close similarity between the variational solution for the Bayesian mixture of Gaussians and the EM algorithm for maximum likelihood. In fact if we consider the limit $N \to \infty$ then the Bayesian treatment converges to the maximum likelihood EM algorithm. For anything other than very small data sets, the dominant computational cost of the variational algorithm for Gaussian mixtures arises from the evaluation of the responsibilities, together with the evaluation and inversion of the weighted data covariance matrices. These computations mirror precisely those that arise in the maximum likelihood EM algorithm, and so there is little computational overhead in using this Bayesian approach as compared to the traditional maximum likelihood one. There are, however, some substantial advantages. First of all, the singularities that arise in maximum likelihood when a Gaussian component ‘collapses’ onto a specific data point are absent in the Bayesian treatment.

Section 10.2.4

Indeed, these singularities are removed if we simply introduce a prior and then use a MAP estimate instead of maximum likelihood. Furthermore, there is no over-fitting if we choose a large number K of components in the mixture, as we saw in Figure 10.6. Finally, the variational treatment opens up the possibility of determining the optimal number of components in the mixture without resorting to techniques such as cross validation.
