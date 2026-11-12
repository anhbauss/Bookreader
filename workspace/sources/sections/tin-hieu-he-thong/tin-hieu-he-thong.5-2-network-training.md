---
id: "tin-hieu-he-thong.5-2-network-training"
doc_id: "tin-hieu-he-thong"
title: "5.2. Network Training"
level: 2
heading_path: ["Neural Networks", "5.2. Network Training"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-1-1-weight-space-symmetries"
next_id: "tin-hieu-he-thong.5-2-1-parameter-optimization"
block_ids: ["b2648", "b2649", "b2650", "b2651", "b2652", "b2653", "b2654", "b2655", "b2656", "b2657", "b2658", "b2659", "b2660", "b2661", "b2662", "b2663", "b2664", "b2665", "b2666", "b2667", "b2668", "b2669", "b2670", "b2671", "b2672", "b2673", "b2674", "b2675", "b2676", "b2677", "b2678", "b2679", "b2680", "b2681", "b2682", "b2683", "b2684", "b2685", "b2686", "b2687", "b2688", "b2689", "b2690", "b2691", "b2692"]
---

## 5.2. Network Training

So far, we have viewed neural networks as a general class of parametric nonlinear functions from a vector x of input variables to a vector y of output variables. A simple approach to the problem of determining the network parameters is to make an analogy with the discussion of polynomial curve fitting in Section 1.1, and therefore to minimize a sum-of-squares error function. Given a training set comprising a set of input vectors $\left\{ \mathbf { x } _ { n } \right\}$ , where $n = 1 , \ldots , N$ , together with a corresponding set of target vectors $\left\{ \mathbf { t } _ { n } \right\}$ , we minimize the error function

E (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \| \mathbf {y} (\mathbf {x} _ {n}, \mathbf {w}) - \mathbf {t} _ {n} \| ^ {2}.\tag{5.11}

However, we can provide a much more general view of network training by first giving a probabilistic interpretation to the network outputs. We have already seen many advantages of using probabilistic predictions in Section 1.5.4. Here it will also provide us with a clearer motivation both for the choice of output unit nonlinearity and the choice of error function.

We start by discussing regression problems, and for the moment we consider a single target variable t that can take any real value. Following the discussions in Section 1.2.5 and 3.1, we assume that t has a Gaussian distribution with an xdependent mean, which is given by the output of the neural network, so that

p (t | \mathbf {x}, \mathbf {w}) = \mathcal {N} \left(t | y (\mathbf {x}, \mathbf {w}), \beta^ {- 1}\right)\tag{5.12}

where $\beta$ is the precision (inverse variance) of the Gaussian noise. Of course this is a somewhat restrictive assumption, and in Section 5.6 we shall see how to extend this approach to allow for more general conditional distributions. For the conditional distribution given by (5.12), it is sufficient to take the output unit activation function to be the identity, because such a network can approximate any continuous function from x to y. Given a data set of N independent, identically distributed observations $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ , along with corresponding target values $\mathbf { t } = \{ t _ { 1 } , \ldots , t _ { N } \}$ , we can construct the corresponding likelihood function

p (\mathbf {t} | \mathbf {X}, \mathbf {w}, \beta) = \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {x} _ {n}, \mathbf {w}, \beta).

Taking the negative logarithm, we obtain the error function

\frac {\beta}{2} \sum_ {n = 1} ^ {N} \{y (\mathbf {x} _ {n}, \mathbf {w}) - t _ {n} \} ^ {2} - \frac {N}{2} \ln \beta + \frac {N}{2} \ln (2 \pi)\tag{5.13}

which can be used to learn the parameters w and $\beta .$ In Section 5.7, we shall discuss the Bayesian treatment of neural networks, while here we consider a maximum likelihood approach. Note that in the neural networks literature, it is usual to consider the minimization of an error function rather than the maximization of the (log) likelihood, and so here we shall follow this convention. Consider first the determination of w. Maximizing the likelihood function is equivalent to minimizing the sum-of-squares error function given by

E (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \{y (\mathbf {x} _ {n}, \mathbf {w}) - t _ {n} \} ^ {2}\tag{5.14}

where we have discarded additive and multiplicative constants. The value of w found by minimizing $E ( \mathbf { w } )$ will be denoted $\mathbf { w } _ { \mathrm { M L } }$ because it corresponds to the maximum likelihood solution. In practice, the nonlinearity of the network function $y ( \mathbf { x } _ { n } , \mathbf { w } )$ causes the error $E ( \mathbf { w } )$ to be nonconvex, and so in practice local maxima of the likelihood may be found, corresponding to local minima of the error function, as discussed in Section 5.2.1.

Having found $\mathbf { w } _ { \mathrm { M L } }$ , the value of $\beta$ can be found by minimizing the negative log likelihood to give

\frac {1}{\beta_ {\mathrm{ML}}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \{y (\mathbf {x} _ {n}, \mathbf {w} _ {\mathrm{ML}}) - t _ {n} \} ^ {2}.\tag{5.15}

Note that this can be evaluated once the iterative optimization required to find $\mathbf { w } _ { \mathrm { M L } }$ is completed. If we have multiple target variables, and we assume that they are independent conditional on x and w with shared noise precision $\beta ,$ , then the conditional distribution of the target values is given by

p (\mathbf {t} | \mathbf {x}, \mathbf {w}) = \mathcal {N} \left(\mathbf {t} | \mathbf {y} (\mathbf {x}, \mathbf {w}), \beta^ {- 1} \mathbf {I}\right).\tag{5.16}

Following the same argument as for a single target variable, we see that the maximum likelihood weights are determined by minimizing the sum-of-squares error function (5.11). The noise precision is then given by

\frac {1}{\beta_ {\mathrm{ML}}} = \frac {1}{N K} \sum_ {n = 1} ^ {N} \| \mathbf {y} (\mathbf {x} _ {n}, \mathbf {w} _ {\mathrm{ML}}) - \mathbf {t} _ {n} \| ^ {2}\tag{5.17}

where K is the number of target variables. The assumption of independence can be dropped at the expense of a slightly more complex optimization problem.

Recall from Section 4.3.6 that there is a natural pairing of the error function (given by the negative log likelihood) and the output unit activation function. In the regression case, we can view the network as having an output activation function that is the identity, so that $y _ { k } = a _ { k }$ . The corresponding sum-of-squares error function has the property

\frac {\partial E}{\partial a _ {k}} = y _ {k} - t _ {k}\tag{5.18}

which we shall make use of when discussing error backpropagation in Section 5.3.

Now consider the case of binary classification in which we have a single target variable t such that $t = 1$ denotes class $\mathcal { C } _ { 1 }$ and $t = 0$ denotes class $\mathcal { C } _ { 2 }$ . Following the discussion of canonical link functions in Section 4.3.6, we consider a network having a single output whose activation function is a logistic sigmoid

y = \sigma (a) \equiv \frac {1}{1 + \exp (- a)}\tag{5.19}

so that $0 \leqslant y ( \mathbf { x } , \mathbf { w } ) \leqslant 1$ . We can interpret $y ( \mathbf { x } , \mathbf { w } )$ as the conditional probability $p ( \mathcal { C } _ { 1 } | \mathbf { x } )$ , with $p ( \mathcal { C } _ { 2 } | \mathbf { x } )$ given by $1 - y ( \mathbf x , \mathbf w )$ . The conditional distribution of targets given inputs is then a Bernoulli distribution of the form

p (t | \mathbf {x}, \mathbf {w}) = y (\mathbf {x}, \mathbf {w}) ^ {t} \left\{1 - y (\mathbf {x}, \mathbf {w}) \right\} ^ {1 - t}.\tag{5.20}

If we consider a training set of independent observations, then the error function, which is given by the negative log likelihood, is then a cross-entropy error function of the form

E (\mathbf {w}) = - \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\}\tag{5.21}

where $y _ { n }$ denotes $y ( \mathbf { x } _ { n } , \mathbf { w } )$ . Note that there is no analogue of the noise precision $\beta$ because the target values are assumed to be correctly labelled. However, the model is easily extended to allow for labelling errors. Simard et al. (2003) found that using the cross-entropy error function instead of the sum-of-squares for a classification problem leads to faster training as well as improved generalization.

If we have K separate binary classifications to perform, then we can use a network having K outputs each of which has a logistic sigmoid activation function. Associated with each output is a binary class label $t _ { k } \in \{ 0 , 1 \}$ , where $k = 1 , \ldots , K$ If we assume that the class labels are independent, given the input vector, then the conditional distribution of the targets is

p (\mathbf {t} | \mathbf {x}, \mathbf {w}) = \prod_ {k = 1} ^ {K} y _ {k} (\mathbf {x}, \mathbf {w}) ^ {t _ {k}} \left[ 1 - y _ {k} (\mathbf {x}, \mathbf {w}) \right] ^ {1 - t _ {k}}.\tag{5.22}

Taking the negative logarithm of the corresponding likelihood function then gives the following error function

E (\mathbf {w}) = - \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \left\{t _ {n k} \ln y _ {n k} + (1 - t _ {n k}) \ln (1 - y _ {n k}) \right\}\tag{5.23}

where $y _ { n k }$ denotes $y _ { k } ( \mathbf { x } _ { n } , \mathbf { w } )$ . Again, the derivative of the error function with respect to the activation for a particular output unit takes the form (5.18) just as in the regression case.

It is interesting to contrast the neural network solution to this problem with the corresponding approach based on a linear classification model of the kind discussed in Chapter 4. Suppose that we are using a standard two-layer network of the kind shown in Figure 5.1. We see that the weight parameters in the first layer of the network are shared between the various outputs, whereas in the linear model each classification problem is solved independently. The first layer of the network can be viewed as performing a nonlinear feature extraction, and the sharing of features between the different outputs can save on computation and can also lead to improved generalization.

Finally, we consider the standard multiclass classification problem in which each input is assigned to one of K mutually exclusive classes. The binary target variables $t _ { k } ~ \in ~ \{ 0 , 1 \}$ have a 1-of-K coding scheme indicating the class, and the network outputs are interpreted as $y _ { k } ( \mathbf { x } , \mathbf { w } ) = p ( t _ { k } = 1 | \mathbf { x } )$ , leading to the following error function

E (\mathbf {w}) = - \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} t _ {k n} \ln y _ {k} (\mathbf {x} _ {n}, \mathbf {w}).\tag{5.24}

Figure 5.5 Geometrical view of the error function $E ( \mathbf { w } )$ as a surface sitting over weight space. Point $\mathbf { w } _ { A }$ is a local minimum and $\mathbf { w } _ { B }$ is the global minimum. At any point $\mathbf { w } _ { C }$ , the local gradient of the error surface is given by the vector $\nabla E .$

![image](images/part-002--4fbdd37b164fe7bf1686742224b4808202bb17b8039b9e6844370b996c08b004.jpg)

Following the discussion of Section 4.3.4, we see that the output unit activation function, which corresponds to the canonical link, is given by the softmax function

y _ {k} (\mathbf {x}, \mathbf {w}) = \frac {\exp (a _ {k} (\mathbf {x} , \mathbf {w}))}{\sum_ {j} \exp (a _ {j} (\mathbf {x} , \mathbf {w}))}\tag{5.25}

which satisfies $0 \leqslant y _ { k } \leqslant 1$ and $\textstyle \sum _ { k } y _ { k } = 1$ . Note that the $y _ { k } ( \mathbf { x } , \mathbf { w } )$ are unchanged if a constant is added to all of the $a _ { k } ( { \bf x } , { \bf w } )$ , causing the error function to be constant for some directions in weight space. This degeneracy is removed if an appropriate regularization term (Section 5.5) is added to the error function.

Once again, the derivative of the error function with respect to the activation for a particular output unit takes the familiar form (5.18).

In summary, there is a natural choice of both output unit activation function and matching error function, according to the type of problem being solved. For regression we use linear outputs and a sum-of-squares error, for (multiple independent) binary classifications we use logistic sigmoid outputs and a cross-entropy error function, and for multiclass classification we use softmax outputs with the corresponding multiclass cross-entropy error function. For classification problems involving two classes, we can use a single logistic sigmoid output, or alternatively we can use a network with two outputs having a softmax output activation function.
