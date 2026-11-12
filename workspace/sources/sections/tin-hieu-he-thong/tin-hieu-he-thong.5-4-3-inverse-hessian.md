---
id: "tin-hieu-he-thong.5-4-3-inverse-hessian"
doc_id: "tin-hieu-he-thong"
title: "5.4.3 Inverse Hessian"
level: 2
heading_path: ["Neural Networks", "5.4.3 Inverse Hessian"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-4-2-outer-product-approximation"
next_id: "tin-hieu-he-thong.5-4-4-finite-differences"
block_ids: ["b2878", "b2879", "b2880", "b2881", "b2882", "b2883", "b2884", "b2885", "b2886", "b2887", "b2888"]
---

## 5.4.3 Inverse Hessian

We can use the outer-product approximation to develop a computationally efficient procedure for approximating the inverse of the Hessian (Hassibi and Stork, 1993). First we write the outer-product approximation in matrix notation as

\mathbf {H} _ {N} = \sum_ {n = 1} ^ {N} \mathbf {b} _ {n} \mathbf {b} _ {n} ^ {\mathrm{T}}\tag{5.86}

where $\mathbf { b } _ { n } \equiv \nabla _ { \mathbf { w } } a _ { n }$ is the contribution to the gradient of the output unit activation arising from data point n. We now derive a sequential procedure for building up the Hessian by including data points one at a time. Suppose we have already obtained the inverse Hessian using the first $L$ data points. By separating off the contribution from data point $L + 1$ , we obtain

\mathbf {H} _ {L + 1} = \mathbf {H} _ {L} + \mathbf {b} _ {L + 1} \mathbf {b} _ {L + 1} ^ {\mathrm{T}}.\tag{5.87}

In order to evaluate the inverse of the Hessian, we now consider the matrix identity

\left(\mathbf {M} + \mathbf {v v} ^ {\mathrm{T}}\right) ^ {- 1} = \mathbf {M} ^ {- 1} - \frac {\left(\mathbf {M} ^ {- 1} \mathbf {v}\right) \left(\mathbf {v} ^ {\mathrm{T}} \mathbf {M} ^ {- 1}\right)}{1 + \mathbf {v} ^ {\mathrm{T}} \mathbf {M} ^ {- 1} \mathbf {v}}\tag{5.88}

where I is the unit matrix, which is simply a special case of the Woodbury identity (C.7). If we now identify $\mathbf { H } _ { L }$ with M and b $_ { L + 1 }$ with v, we obtain

\mathbf {H} _ {L + 1} ^ {- 1} = \mathbf {H} _ {L} ^ {- 1} - \frac {\mathbf {H} _ {L} ^ {- 1} \mathbf {b} _ {L + 1} \mathbf {b} _ {L + 1} ^ {\mathrm{T}} \mathbf {H} _ {L} ^ {- 1}}{1 + \mathbf {b} _ {L + 1} ^ {\mathrm{T}} \mathbf {H} _ {L} ^ {- 1} \mathbf {b} _ {L + 1}}.\tag{5.89}

In this way, data points are sequentially absorbed until $L + 1 = N$ and the whole data set has been processed. This result therefore represents a procedure for evaluating the inverse of the Hessian using a single pass through the data set. The initial matrix $\mathbf { H } _ { 0 }$ is chosen to be αI, where α is a small quantity, so that the algorithm actually finds the inverse of $\mathbf H + \alpha \mathbf I$ . The results are not particularly sensitive to the precise value of α. Extension of this algorithm to networks having more than one output is straightforward.

We note here that the Hessian matrix can sometimes be calculated indirectly as part of the network training algorithm. In particular, quasi-Newton nonlinear optimization algorithms gradually build up an approximation to the inverse of the Hessian during training. Such algorithms are discussed in detail in Bishop and Nabney (2008).
