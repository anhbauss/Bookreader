---
id: "tin-hieu-he-thong.4-2-4-exponential-family"
doc_id: "tin-hieu-he-thong"
title: "4.2.4 Exponential family"
level: 2
heading_path: ["4 Linear Models for Classification", "4.2.4 Exponential family"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-2-3-discrete-features"
next_id: "tin-hieu-he-thong.4-3-probabilistic-discriminative-models"
block_ids: ["b2324", "b2325", "b2326", "b2327", "b2328", "b2329", "b2330", "b2331", "b2332", "b2333", "b2334", "b2335", "b2336"]
---

## 4.2.4 Exponential family

As we have seen, for both Gaussian distributed and discrete inputs, the posterior class probabilities are given by generalized linear models with logistic sigmoid $( K =$

2 classes) or softmax $( K \geqslant 2$ classes) activation functions. These are particular cases of a more general result obtained by assuming that the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ are members of the exponential family of distributions.

Using the form (2.194) for members of the exponential family, we see that the distribution of x can be written in the form

p (\mathbf {x} | \boldsymbol {\lambda} _ {k}) = h (\mathbf {x}) g (\boldsymbol {\lambda} _ {k}) \exp \left\{\boldsymbol {\lambda} _ {k} ^ {\mathrm{T}} \mathbf {u} (\mathbf {x}) \right\}.\tag{4.83}

We now restrict attention to the subclass of such distributions for which $\mathbf { u } ( \mathbf { x } ) = \mathbf { x }$ Then we make use of (2.236) to introduce a scaling parameter s, so that we obtain the restricted set of exponential family class-conditional densities of the form

p (\mathbf {x} | \boldsymbol {\lambda} _ {k}, s) = \frac {1}{s} h \left(\frac {1}{s} \mathbf {x}\right) g (\boldsymbol {\lambda} _ {k}) \exp \left\{\frac {1}{s} \boldsymbol {\lambda} _ {k} ^ {\mathrm{T}} \mathbf {x} \right\}.\tag{4.84}

Note that we are allowing each class to have its own parameter vector $\lambda _ { k }$ but we are assuming that the classes share the same scale parameter s.

For the two-class problem, we substitute this expression for the class-conditional densities into (4.58) and we see that the posterior class probability is again given by a logistic sigmoid acting on a linear function $a ( \mathbf { x } )$ which is given by

a (\mathbf {x}) = \left(\boldsymbol {\lambda} _ {1} - \boldsymbol {\lambda} _ {2}\right) ^ {\mathrm{T}} \mathbf {x} + \ln g \left(\boldsymbol {\lambda} _ {1}\right) - \ln g \left(\boldsymbol {\lambda} _ {2}\right) + \ln p \left(\mathcal {C} _ {1}\right) - \ln p \left(\mathcal {C} _ {2}\right).\tag{4.85}

Similarly, for the K-class problem, we substitute the class-conditional density expression into (4.63) to give

a _ {k} (\mathbf {x}) = \boldsymbol {\lambda} _ {k} ^ {\mathrm{T}} \mathbf {x} + \ln g (\boldsymbol {\lambda} _ {k}) + \ln p (\mathcal {C} _ {k})\tag{4.86}

and so again is a linear function of x.
