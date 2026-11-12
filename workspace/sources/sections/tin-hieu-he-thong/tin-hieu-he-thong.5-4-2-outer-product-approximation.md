---
id: "tin-hieu-he-thong.5-4-2-outer-product-approximation"
doc_id: "tin-hieu-he-thong"
title: "5.4.2 Outer product approximation"
level: 2
heading_path: ["Neural Networks", "5.4.2 Outer product approximation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-4-1-diagonal-approximation"
next_id: "tin-hieu-he-thong.5-4-3-inverse-hessian"
block_ids: ["b2866", "b2867", "b2868", "b2869", "b2870", "b2871", "b2872", "b2873", "b2874", "b2875", "b2876", "b2877"]
---

## 5.4.2 Outer product approximation

When neural networks are applied to regression problems, it is common to use a sum-of-squares error function of the form

E = \frac {1}{2} \sum_ {n = 1} ^ {N} (y _ {n} - t _ {n}) ^ {2}\tag{5.82}

where we have considered the case of a single output in order to keep the notation simple (the extension to several outputs is straightforward). We can then write the Hessian matrix in the form

\mathbf {H} = \nabla \nabla E = \sum_ {n = 1} ^ {N} \nabla y _ {n} \nabla y _ {n} + \sum_ {n = 1} ^ {N} (y _ {n} - t _ {n}) \nabla \nabla y _ {n}.\tag{5.83}

If the network has been trained on the data set, and its outputs $y _ { n }$ happen to be very close to the target values $t _ { n } .$ , then the second term in (5.83) will be small and can be neglected. More generally, however, it may be appropriate to neglect this term by the following argument. Recall from Section 1.5.5 that the optimal function that minimizes a sum-of-squares loss is the conditional average of the target data. The quantity $\left( y _ { n } - t _ { n } \right)$ is then a random variable with zero mean. If we assume that its value is uncorrelated with the value of the second derivative term on the right-hand side of (5.83), then the whole term will average to zero in the summation over n.

By neglecting the second term in (5.83), we arrive at the Levenberg–Marquardt approximation or outer product approximation (because the Hessian matrix is built up from a sum of outer products of vectors), given by

\mathbf {H} \simeq \sum_ {n = 1} ^ {N} \mathbf {b} _ {n} \mathbf {b} _ {n} ^ {\mathrm{T}}\tag{5.84}

where $\mathbf { b } _ { n } = \nabla y _ { n } = \nabla a _ { n }$ because the activation function for the output units is simply the identity. Evaluation of the outer product approximation for the Hessian is straightforward as it only involves first derivatives of the error function, which can be evaluated efficiently in $O ( W )$ steps using standard backpropagation. The elements of the matrix can then be found in $O ( W ^ { 2 } )$ steps by simple multiplication. It is important to emphasize that this approximation is only likely to be valid for a network that has been trained appropriately, and that for a general network mapping the second derivative terms on the right-hand side of (5.83) will typically not be negligible.

In the case of the cross-entropy error function for a network with logistic sigmoid output-unit activation functions, the corresponding approximation is given by

\mathbf {H} \simeq \sum_ {n = 1} ^ {N} y _ {n} (1 - y _ {n}) \mathbf {b} _ {n} \mathbf {b} _ {n} ^ {\mathrm{T}}.\tag{5.85}

An analogous result can be obtained for multiclass networks having softmax outputunit activation functions.
