---
id: "tin-hieu-he-thong.3-1-3-sequential-learning"
doc_id: "tin-hieu-he-thong"
title: "3.1.3 Sequential learning"
level: 2
heading_path: ["3 Linear Models for Regression", "3.1.3 Sequential learning"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-1-2-geometry-of-least-squares"
next_id: "tin-hieu-he-thong.3-1-4-regularized-least-squares"
block_ids: ["b1697", "b1698", "b1699", "b1700", "b1701", "b1702", "b1703"]
---

## 3.1.3 Sequential learning

Batch techniques, such as the maximum likelihood solution (3.15), which involve processing the entire training set in one go, can be computationally costly for large data sets. As we have discussed in Chapter 1, if the data set is sufficiently large, it may be worthwhile to use sequential algorithms, also known as on-line algorithms, in which the data points are considered one at a time, and the model parameters updated after each such presentation. Sequential learning is also appropriate for realtime applications in which the data observations are arriving in a continuous stream, and predictions must be made before all of the data points are seen.

We can obtain a sequential learning algorithm by applying the technique of stochastic gradient descent, also known as sequential gradient descent, as follows. If the error function comprises a sum over data points $\textstyle E = \sum _ { n } E _ { n }$ , then after presentation of pattern $n _ { \mathrm { { ; } } }$ , the stochastic gradient descent algorithm updates the parameter vector w using

\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} - \eta \nabla E _ {n}\tag{3.22}

where $\tau$ denotes the iteration number, and $\eta$ is a learning rate parameter. We shall discuss the choice of value for η shortly. The value of w is initialized to some starting vector $\mathbf { w } ^ { ( 0 ) }$ . For the case of the sum-of-squares error function (3.12), this gives

\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} + \eta (t _ {n} - \mathbf {w} ^ {(\tau) \mathrm{T}} \phi_ {n}) \phi_ {n}\tag{3.23}

where $\phi _ { n } = \phi ( \mathbf { x } _ { n } )$ . This is known as least-mean-squares or the LMS algorithm. The value of $\eta$ needs to be chosen with care to ensure that the algorithm converges (Bishop and Nabney, 2008).
