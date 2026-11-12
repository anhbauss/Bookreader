---
id: "tin-hieu-he-thong.2-4-1-maximum-likelihood-and-sufficient-statistics"
doc_id: "tin-hieu-he-thong"
title: "2.4.1 Maximum likelihood and sufficient statistics"
level: 2
heading_path: ["Probability Distributions", "2.4.1 Maximum likelihood and sufficient statistics"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-4-the-exponential-family"
next_id: "tin-hieu-he-thong.2-4-2-conjugate-priors"
block_ids: ["b1367", "b1368", "b1369", "b1370", "b1371", "b1372", "b1373", "b1374", "b1375", "b1376", "b1377", "b1378", "b1379", "b1380", "b1381", "b1382"]
---

## 2.4.1 Maximum likelihood and sufficient statistics

Let us now consider the problem of estimating the parameter vector η in the general exponential family distribution (2.194) using the technique of maximum likeli hood. Taking the gradient of both sides of (2.195) with respect to $\eta ,$ we have

\begin{array}{l} \nabla g (\boldsymbol {\eta}) \int h (\mathbf {x}) \exp \left\{\boldsymbol {\eta} ^ {\mathrm{T}} \mathbf {u} (\mathbf {x}) \right\} \mathrm{d} \mathbf {x} \\ + \quad g (\boldsymbol {\eta}) \int h (\mathbf {x}) \exp \left\{\boldsymbol {\eta} ^ {\mathrm{T}} \mathbf {u} (\mathbf {x}) \right\} \mathbf {u} (\mathbf {x}) \mathrm{d} \mathbf {x} = 0. \end{array}\tag{2.224}

Rearranging, and making use again of (2.195) then gives

- \frac {1}{g (\pmb {\eta})} \nabla g (\pmb {\eta}) = g (\pmb {\eta}) \int h (\mathbf {x}) \exp \left\{\pmb {\eta} ^ {\mathrm{T}} \mathbf {u} (\mathbf {x}) \right\} \mathbf {u} (\mathbf {x}) \mathrm{d} \mathbf {x} = \mathbb {E} [ \mathbf {u} (\mathbf {x}) ]\tag{2.225}

where we have used (2.194). We therefore obtain the result

- \nabla \ln g (\boldsymbol {\eta}) = \mathbb {E} [ \mathbf {u} (\mathbf {x}) ].\tag{2.226}

Exercise 2.58

Note that the covariance of $\mathbf { u } ( \mathbf { x } )$ can be expressed in terms of the second derivatives of $g ( \pmb { \eta } )$ , and similarly for higher order moments. Thus, provided we can normalize a distribution from the exponential family, we can always find its moments by simple differentiation.

Now consider a set of independent identically distributed data denoted by $\mathbf { X } =$ $\left\{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n } \right\}$ , for which the likelihood function is given by

p (\mathbf {X} | \boldsymbol {\eta}) = \left(\prod_ {n = 1} ^ {N} h (\mathbf {x} _ {n})\right) g (\boldsymbol {\eta}) ^ {N} \exp \left\{\boldsymbol {\eta} ^ {\mathrm{T}} \sum_ {n = 1} ^ {N} \mathbf {u} (\mathbf {x} _ {n}) \right\}.\tag{2.227}

Setting the gradient of ln $p ( \mathbf { X } | \eta )$ with respect to $\eta$ to zero, we get the following condition to be satisfied by the maximum likelihood estimator $\pmb { \eta } _ { \mathrm { M I } }$

- \nabla \ln g (\pmb {\eta} _ {\mathrm{ML}}) = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {u} (\mathbf {x} _ {n})\tag{2.228}

which can in principle be solved to obtain $\eta _ { \mathrm { M L } }$ We see that the solution for the maximum likelihood estimator depends on the data only through $\textstyle \sum _ { n } \mathbf { u } ( \mathbf { x } _ { n } )$ , which is therefore called the sufficient statistic of the distribution (2.194). We do not need to store the entire data set itself but only the value of the sufficient statistic. For the Bernoulli distribution, for example, the function $\mathbf { u } ( x )$ is given just by x and so we need only keep the sum of the data points $\{ x _ { n } \}$ , whereas for the Gaussian ${ \mathbf u } ( x ) = ( x , x ^ { 2 } ) ^ { \dot { \mathrm { T } } }$ , and so we should keep both the sum of $\{ x _ { n } \}$ and the sum of $\{ x _ { n } ^ { 2 } \}$

If we consider the limit $N  \infty$ , then the right-hand side of (2.228) becomes $\mathbb { E } [ { \bf u } ( { \bf x } ) ]$ , and so by comparing with (2.226) we see that in this limit $\pmb { \eta } _ { \mathrm { M L } }$ will equal the true value $\eta .$

In fact, this sufficiency property holds also for Bayesian inference, although we shall defer discussion of this until Chapter 8 when we have equipped ourselves with the tools of graphical models and can thereby gain a deeper insight into these important concepts.
