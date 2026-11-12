---
id: "tin-hieu-he-thong.5-4-5-exact-evaluation-of-the-hessian"
doc_id: "tin-hieu-he-thong"
title: "5.4.5 Exact evaluation of the Hessian"
level: 2
heading_path: ["Neural Networks", "5.4.5 Exact evaluation of the Hessian"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-4-4-finite-differences"
next_id: "tin-hieu-he-thong.5-4-6-fast-multiplication-by-the-hessian"
block_ids: ["b2896", "b2897", "b2898", "b2899", "b2900", "b2901", "b2902", "b2903", "b2904", "b2905", "b2906", "b2907", "b2908"]
---

## 5.4.5 Exact evaluation of the Hessian

So far, we have considered various approximation schemes for evaluating the Hessian matrix or its inverse. The Hessian can also be evaluated exactly, for a network of arbitrary feed-forward topology, using extension of the technique of backpropagation used to evaluate first derivatives, which shares many of its desirable features including computational efficiency (Bishop, 1991; Bishop, 1992). It can be applied to any differentiable error function that can be expressed as a function of the network outputs and to networks having arbitrary differentiable activation functions. The number of computational steps needed to evaluate the Hessian scales like $O ( W ^ { 2 } )$ . Similar algorithms have also been considered by Buntine and Weigend (1993).

Here we consider the specific case of a network having two layers of weights, for which the required equations are easily derived. We shall use indices i and $i ^ { \prime }$ to denote inputs, indices $j$ and $j ^ { \prime }$ to denoted hidden units, and indices k and $k ^ { \prime }$ to denote outputs. We first define

\delta_ {k} = \frac {\partial E _ {n}}{\partial a _ {k}}, \qquad M _ {k k ^ {\prime}} \equiv \frac {\partial^ {2} E _ {n}}{\partial a _ {k} \partial a _ {k ^ {\prime}}}\tag{5.92}

where $E _ { n }$ is the contribution to the error from data point $n .$ . The Hessian matrix for this network can then be considered in three separate blocks as follows.

1. Both weights in the second layer:

\frac {\partial^ {2} E _ {n}}{\partial w _ {k j} ^ {(2)} \partial w _ {k ^ {\prime} j ^ {\prime}} ^ {(2)}} = z _ {j} z _ {j ^ {\prime}} M _ {k k ^ {\prime}}.\tag{5.93}

Exercise 5.23

2. Both weights in the first layer:

\begin{array}{c} \frac {\partial^ {2} E _ {n}}{\partial w _ {j i} ^ {(1)} \partial w _ {j ^ {\prime} i ^ {\prime}} ^ {(1)}} = x _ {i} x _ {i ^ {\prime}} h ^ {\prime \prime} (a _ {j ^ {\prime}}) I _ {j j ^ {\prime}} \sum_ {k} w _ {k j ^ {\prime}} ^ {(2)} \delta_ {k} \\ + x _ {i} x _ {i ^ {\prime}} h ^ {\prime} (a _ {j ^ {\prime}}) h ^ {\prime} (a _ {j}) \sum_ {k} \sum_ {k ^ {\prime}} w _ {k ^ {\prime} j ^ {\prime}} ^ {(2)} w _ {k j} ^ {(2)} M _ {k k ^ {\prime}}. \end{array}\tag{5.94}

3. One weight in each layer:

\frac {\partial^ {2} E _ {n}}{\partial w _ {j i} ^ {(1)} \partial w _ {k j ^ {\prime}} ^ {(2)}} = x _ {i} h ^ {\prime} (a _ {j ^ {\prime}}) \left\{\delta_ {k} I _ {j j ^ {\prime}} + z _ {j} \sum_ {k ^ {\prime}} w _ {k ^ {\prime} j ^ {\prime}} ^ {(2)} H _ {k k ^ {\prime}} \right\}.\tag{5.95}

Here $I _ { j j ^ { \prime } }$ is the ${ \boldsymbol { j } } , { \boldsymbol { j } } ^ { \prime }$ element of the identity matrix. If one or both of the weights is a bias term, then the corresponding expressions are obtained simply by setting the appropriate activation(s) to 1. Inclusion of skip-layer connections is straightforward.
