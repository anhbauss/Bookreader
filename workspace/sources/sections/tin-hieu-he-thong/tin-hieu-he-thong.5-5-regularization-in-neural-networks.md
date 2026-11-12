---
id: "tin-hieu-he-thong.5-5-regularization-in-neural-networks"
doc_id: "tin-hieu-he-thong"
title: "5.5. Regularization in Neural Networks"
level: 2
heading_path: ["Neural Networks", "5.5. Regularization in Neural Networks"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-4-6-fast-multiplication-by-the-hessian"
next_id: "tin-hieu-he-thong.5-5-1-consistent-gaussian-priors"
block_ids: ["b2938", "b2939", "b2940", "b2941", "b2942", "b2943", "b2944", "b2945", "b2946", "b2947", "b2948", "b2949"]
---

## 5.5. Regularization in Neural Networks

The number of input and outputs units in a neural network is generally determined by the dimensionality of the data set, whereas the number M of hidden units is a free parameter that can be adjusted to give the best predictive performance. Note that M controls the number of parameters (weights and biases) in the network, and so we might expect that in a maximum likelihood setting there will be an optimum value of M that gives the best generalization performance, corresponding to the optimum balance between under-fitting and over-fitting. Figure 5.9 shows an example of the effect of different values of M for the sinusoidal regression problem.

The generalization error, however, is not a simple function of M due to the presence of local minima in the error function, as illustrated in Figure 5.10. Here we see the effect of choosing multiple random initializations for the weight vector for a range of values of M. The overall best validation set performance in this case occurred for a particular solution having $M = 8$ . In practice, one approach to choosing M is in fact to plot a graph of the kind shown in Figure 5.10 and then to choose the specific solution having the smallest validation set error.

There are, however, other ways to control the complexity of a neural network model in order to avoid over-fitting. From our discussion of polynomial curve fitting in Chapter 1, we see that an alternative approach is to choose a relatively large value for M and then to control complexity by the addition of a regularization term to the error function. The simplest regularizer is the quadratic, giving a regularized error

Figure 5.10

![image](images/part-002--f5cd8d8046c4a2352a4f43101de2f7af757b3cce0197171c45f4bd1b094370b4.jpg)

![image](images/part-002--a4234e1b0e4403e7a710cf7beaf272fcb7aefcfb3be6a94d202133f23559d142.jpg)

![image](images/part-002--eed2e5130ed918eb5b6cd4bd1875f96f16bda384a2790488ba4363c3ec70a674.jpg)

Figure 5.9 Examples of two-layer networks trained on 10 data points drawn from the sinusoidal data set. The graphs show the result of fitting networks having $M = 1$ , 3 and 10 hidden units, respectively, by minimizing a sum-of-squares error function using a scaled conjugate-gradient algorithm.

of the form

\widetilde {E} (\mathbf {w}) = E (\mathbf {w}) + \frac {\lambda}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}.\tag{5.112}

This regularizer is also known as weight decay and has been discussed at length in Chapter 3. The effective model complexity is then determined by the choice of the regularization coefficient λ. As we have seen previously, this regularizer can be interpreted as the negative logarithm of a zero-mean Gaussian prior distribution over the weight vector w.
