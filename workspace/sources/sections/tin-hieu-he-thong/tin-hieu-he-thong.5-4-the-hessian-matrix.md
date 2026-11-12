---
id: "tin-hieu-he-thong.5-4-the-hessian-matrix"
doc_id: "tin-hieu-he-thong"
title: "5.4. The Hessian Matrix"
level: 2
heading_path: ["Neural Networks", "5.4. The Hessian Matrix"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-3-4-the-jacobian-matrix"
next_id: "tin-hieu-he-thong.5-4-1-diagonal-approximation"
block_ids: ["b2850", "b2851", "b2852", "b2853", "b2854", "b2855", "b2856"]
---

## 5.4. The Hessian Matrix

We have shown how the technique of backpropagation can be used to obtain the first derivatives of an error function with respect to the weights in the network. Backpropagation can also be used to evaluate the second derivatives of the error, given by

\frac {\partial^ {2} E}{\partial w _ {j i} \partial w _ {l k}}.\tag{5.78}

Note that it is sometimes convenient to consider all of the weight and bias parameters as elements $w _ { i }$ of a single vector, denoted w, in which case the second derivatives form the elements $H _ { i j }$ of the Hessian matrix H, where $i , j \in \{ 1 , \dots , W \}$ and W is the total number of weights and biases. The Hessian plays an important role in many aspects of neural computing, including the following:

1. Several nonlinear optimization algorithms used for training neural networks are based on considerations of the second-order properties of the error surface, which are controlled by the Hessian matrix (Bishop and Nabney, 2008).
2. The Hessian forms the basis of a fast procedure for re-training a feed-forward network following a small change in the training data (Bishop, 1991).
3. The inverse of the Hessian has been used to identify the least significant weights in a network as part of network ‘pruning’ algorithms (Le Cun et al., 1990).
4. The Hessian plays a central role in the Laplace approximation for a Bayesian neural network (see Section 5.7). Its inverse is used to determine the predictive distribution for a trained network, its eigenvalues determine the values of hyperparameters, and its determinant is used to evaluate the model evidence.

Various approximation schemes have been used to evaluate the Hessian matrix for a neural network. However, the Hessian can also be calculated exactly using an extension of the backpropagation technique.

An important consideration for many applications of the Hessian is the efficiency with which it can be evaluated. If there are $W$ parameters (weights and biases) in the network, then the Hessian matrix has dimensions $W \times W$ and so the computational effort needed to evaluate the Hessian will scale like $O ( W ^ { 2 } )$ for each pattern in the data set. As we shall see, there are efficient methods for evaluating the Hessian whose scaling is indeed $O ( W ^ { 2 } )$
