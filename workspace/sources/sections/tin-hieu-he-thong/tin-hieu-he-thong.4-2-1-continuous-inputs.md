---
id: "tin-hieu-he-thong.4-2-1-continuous-inputs"
doc_id: "tin-hieu-he-thong"
title: "4.2.1 Continuous inputs"
level: 2
heading_path: ["4 Linear Models for Classification", "4.2.1 Continuous inputs"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-2-probabilistic-generative-models"
next_id: "tin-hieu-he-thong.4-2-2-maximum-likelihood-solution"
block_ids: ["b2268", "b2269", "b2270", "b2271", "b2272", "b2273", "b2274", "b2275", "b2276", "b2277", "b2278", "b2279", "b2280", "b2281", "b2282", "b2283", "b2284", "b2285", "b2286", "b2287", "b2288", "b2289"]
---

## 4.2.1 Continuous inputs

Let us assume that the class-conditional densities are Gaussian and then explore the resulting form for the posterior probabilities. To start with, we shall assume that all classes share the same covariance matrix. Thus the density for class $\mathcal { C } _ { k }$ is given by

p (\mathbf {x} | \mathcal {C} _ {k}) = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \exp \left\{- \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu} _ {k}) \right\}.\tag{4.64}

Consider first the case of two classes. From (4.57) and (4.58), we have

p (\mathcal {C} _ {1} | \mathbf {x}) = \sigma (\mathbf {w} ^ {\mathrm{T}} \mathbf {x} + w _ {0})\tag{4.65}

where we have defined

\mathbf {w} = \boldsymbol {\Sigma} ^ {- 1} (\boldsymbol {\mu} _ {1} - \boldsymbol {\mu} _ {2})\tag{4.66}

w _ {0} = - \frac {1}{2} \boldsymbol {\mu} _ {1} ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} \boldsymbol {\mu} _ {1} + \frac {1}{2} \boldsymbol {\mu} _ {2} ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} \boldsymbol {\mu} _ {2} + \ln \frac {p (\mathcal {C} _ {1})}{p (\mathcal {C} _ {2})}.\tag{4.67}

We see that the quadratic terms in x from the exponents of the Gaussian densities have cancelled (due to the assumption of common covariance matrices) leading to a linear function of x in the argument of the logistic sigmoid. This result is illustrated for the case of a two-dimensional input space x in Figure 4.10. The resulting decision boundaries correspond to surfaces along which the posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ are constant and so will be given by linear functions of $\mathbf { x } ,$ and therefore the decision boundaries are linear in input space. The prior probabilities $p ( \mathcal { C } _ { k } )$ enter only through the bias parameter $w _ { 0 }$ so that changes in the priors have the effect of making parallel shifts of the decision boundary and more generally of the parallel contours of constant posterior probability.

![image](images/part-002--b2a8fe57e42ae45445c533fe57f02bb8e9101c10e227d00e02ba556e914537e7.jpg)

![image](images/part-002--05d7276e60246a37a961361f1be4cfeb98a8cad88c38b70c87670838a55d7a2f.jpg)

Figure 4.10 The left-hand plot shows the class-conditional densities for two classes, denoted red and blue. On the right is the corresponding posterior probability $p ( \mathcal { C } _ { 1 } | \mathbf { x } )$ , which is given by a logistic sigmoid of a linear function of x. The surface in the right-hand plot is coloured using a proportion of red ink given by $p ( \mathcal { C } _ { 1 } | \mathbf { x } )$ and a proportion of blue ink given by $p ( \mathcal { C } _ { 2 } \vert \mathbf { x } ) = 1 - p ( \mathcal { C } _ { 1 } \vert \mathbf { x } )$

For the general case of K classes we have, from (4.62) and (4.63),

a _ {k} (\mathbf {x}) = \mathbf {w} _ {k} ^ {\mathrm{T}} \mathbf {x} + w _ {k 0}\tag{4.68}

where we have defined

{\bf w} _ {k} = {\bf \Sigma} ^ {- 1} {\pmb \mu} _ {k}\tag{4.69}

{w _ {k 0}} = {- \frac {1}{2} \pmb {\mu} _ {k} ^ {\mathrm{T}} \pmb {\Sigma} ^ {- 1} \pmb {\mu} _ {k} + \ln p (\mathcal {C} _ {k}).}\tag{4.70}

We see that the $a _ { k } ( { \bf x } )$ are again linear functions of x as a consequence of the cancellation of the quadratic terms due to the shared covariances. The resulting decision boundaries, corresponding to the minimum misclassification rate, will occur when two of the posterior probabilities (the two largest) are equal, and so will be defined by linear functions of x, and so again we have a generalized linear model.

If we relax the assumption of a shared covariance matrix and allow each classconditional density $p ( \mathbf { x } | \mathcal { C } _ { k } )$ to have its own covariance matrix $\Sigma _ { k }$ , then the earlier cancellations will no longer occur, and we will obtain quadratic functions of x, giving rise to a quadratic discriminant. The linear and quadratic decision boundaries are illustrated in Figure 4.11.

![image](images/part-002--23e26baa0589a37622f6d60169cb129837ea780a6ae8054fe952f6a0d4e9c662.jpg)

![image](images/part-002--31a66b455b455a18cf36c9a18eab49fa295044f999880d9c500147db638eec6b.jpg)

Figure 4.11 The left-hand plot shows the class-conditional densities for three classes each having a Gaussian distribution, coloured red, green, and blue, in which the red and green classes have the same covariance matrix. The right-hand plot shows the corresponding posterior probabilities, in which the RGB colour vector represents the posterior probabilities for the respective three classes. The decision boundaries are also shown. Notice that the boundary between the red and green classes, which have the same covariance matrix, is linear, whereas those between the other pairs of classes are quadratic.
