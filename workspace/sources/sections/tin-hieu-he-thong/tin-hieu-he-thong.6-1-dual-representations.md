---
id: "tin-hieu-he-thong.6-1-dual-representations"
doc_id: "tin-hieu-he-thong"
title: "6.1. Dual Representations"
level: 2
heading_path: ["Kernel Methods", "6.1. Dual Representations"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.kernel-methods"
next_id: "tin-hieu-he-thong.6-2-constructing-kernels"
block_ids: ["b3339", "b3340", "b3341", "b3342", "b3343", "b3344", "b3345", "b3346", "b3347", "b3348", "b3349", "b3350", "b3351", "b3352", "b3353", "b3354", "b3355", "b3356", "b3357", "b3358"]
---

## 6.1. Dual Representations

Many linear models for regression and classification can be reformulated in terms of a dual representation in which the kernel function arises naturally. This concept will play an important role when we consider support vector machines in the next chapter. Here we consider a linear regression model whose parameters are determined by minimizing a regularized sum-of-squares error function given by

J (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \left\{\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) - t _ {n} \right\} ^ {2} + \frac {\lambda}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}\tag{6.2}

where $\lambda \geqslant 0$ . If we set the gradient of $J ( \mathbf { w } )$ with respect to w equal to zero, we see that the solution for w takes the form of a linear combination of the vectors $\phi (  { \mathbf { x } } _ { n } )$ , with coefficients that are functions of w, of the form

\mathbf {w} = - \frac {1}{\lambda} \sum_ {n = 1} ^ {N} \left\{\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x} _ {n}) - t _ {n} \right\} \boldsymbol {\phi} (\mathbf {x} _ {n}) = \sum_ {n = 1} ^ {N} a _ {n} \boldsymbol {\phi} (\mathbf {x} _ {n}) = \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {a}\tag{6.3}

where Φ is the design matrix, whose $n ^ { \mathrm { t h } }$ row is given by $\phi ( \mathbf { x } _ { n } ) ^ { \mathrm { T } }$ . Here the vector $\mathbf { a } = ( a _ { 1 } , \ldots , a _ { N } ) ^ { \mathrm { T } }$ , and we have defined

a _ {n} = - \frac {1}{\lambda} \left\{\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) - t _ {n} \right\}.\tag{6.4}

Instead of working with the parameter vector w, we can now reformulate the leastsquares algorithm in terms of the parameter vector a, giving rise to a dual representation. If we substitute $\mathbf { w = \Phi \Phi ^ { \mathrm { T } } { \mathbf { \bullet } } }$ a into $J ( \mathbf { w } )$ , we obtain

J (\mathbf {a}) = \frac {1}{2} \mathbf {a} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {a} - \mathbf {a} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t} + \frac {1}{2} \mathbf {t} ^ {\mathrm{T}} \mathbf {t} + \frac {\lambda}{2} \mathbf {a} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {a}\tag{6.5}

where $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . We now define the Gram matrix $\mathbf { K } = \Phi \mathbf { \Phi } \mathbf { \Phi } ^ { \mathrm { T } }$ , which is an $N \times N$ symmetric matrix with elements

K _ {n m} = \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) = k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\tag{6.6}

where we have introduced the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ defined by (6.1). In terms of the Gram matrix, the sum-of-squares error function can be written as

J (\mathbf {a}) = \frac {1}{2} \mathbf {a} ^ {\mathrm{T}} \mathbf {K K a} - \mathbf {a} ^ {\mathrm{T}} \mathbf {K t} + \frac {1}{2} \mathbf {t} ^ {\mathrm{T}} \mathbf {t} + \frac {\lambda}{2} \mathbf {a} ^ {\mathrm{T}} \mathbf {K a}.\tag{6.7}

Setting the gradient of $J ( \mathbf { a } )$ with respect to a to zero, we obtain the following solution

\mathbf {a} = \left(\mathbf {K} + \lambda \mathbf {I} _ {N}\right) ^ {- 1} \mathbf {t}.\tag{6.8}

If we substitute this back into the linear regression model, we obtain the following prediction for a new input x

y (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x}) = \mathbf {a} ^ {\mathrm{T}} \boldsymbol {\Phi} \phi (\mathbf {x}) = \mathbf {k} (\mathbf {x}) ^ {\mathrm{T}} \left(\mathbf {K} + \lambda \mathbf {I} _ {N}\right) ^ {- 1} \mathbf {t}\tag{6.9}

where we have defined the vector $\mathbf { k } ( \mathbf { x } )$ with elements $k _ { n } ( \mathbf { x } ) = k ( \mathbf { x } _ { n } , \mathbf { x } )$ . Thus we see that the dual formulation allows the solution to the least-squares problem to be expressed entirely in terms of the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ . This is known as a dual formulation because, by noting that the solution for a can be expressed as a linear combination of the elements of $\phi ( \mathbf { x } )$ , we recover the original formulation in terms of the parameter vector w. Note that the prediction at x is given by a linear combination of the target values from the training set. In fact, we have already obtained this result, using a slightly different notation, in Section 3.3.3.

In the dual formulation, we determine the parameter vector a by inverting an $N \times N$ matrix, whereas in the original parameter space formulation we had to invert an $M \times M$ matrix in order to determine w. Because N is typically much larger than M, the dual formulation does not seem to be particularly useful. However, the advantage of the dual formulation, as we shall see, is that it is expressed entirely in terms of the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ We can therefore work directly in terms of kernels and avoid the explicit introduction of the feature vector $\phi ( \mathbf { x } )$ , which allows us implicitly to use feature spaces of high, even infinite, dimensionality.

The existence of a dual representation based on the Gram matrix is a property of many linear models, including the perceptron. In Section 6.4, we will develop a duality between probabilistic linear models for regression and the technique of Gaussian processes. Duality will also play an important role when we discuss support vector machines in Chapter 7.
