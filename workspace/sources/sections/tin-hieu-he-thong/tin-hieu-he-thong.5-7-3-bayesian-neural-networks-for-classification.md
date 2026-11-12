---
id: "tin-hieu-he-thong.5-7-3-bayesian-neural-networks-for-classification"
doc_id: "tin-hieu-he-thong"
title: "5.7.3 Bayesian neural networks for classification"
level: 2
heading_path: ["Neural Networks", "5.7.3 Bayesian neural networks for classification"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-7-2-hyperparameter-optimization"
next_id: "tin-hieu-he-thong.exercises-6"
block_ids: ["b3214", "b3215", "b3216", "b3217", "b3218", "b3219", "b3220", "b3221", "b3222", "b3223", "b3224", "b3225", "b3226", "b3227", "b3228", "b3229", "b3230", "b3231", "b3232", "b3233", "b3234", "b3235", "b3236", "b3237", "b3238", "b3239", "b3240", "b3241", "b3242", "b3243", "b3244", "b3245", "b3246", "b3247", "b3248", "b3249"]
---

## 5.7.3 Bayesian neural networks for classification

So far, we have used the Laplace approximation to develop a Bayesian treatment of neural network regression models. We now discuss the modifications to this framework that arise when it is applied to classification. Here we shall consider a network having a single logistic sigmoid output corresponding to a two-class classification problem. The extension to networks with multiclass softmax outputs is straightforward. We shall build extensively on the analogous results for linear classification models discussed in Section 4.5, and so we encourage the reader to familiarize themselves with that material before studying this section.

The log likelihood function for this model is given by

\ln p (\mathcal {D} | \mathbf {w}) = \sum_ {n} = 1 ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\}\tag{5.181}

where $t _ { n } \in \{ 0 , 1 \}$ are the target values, and $y _ { n } \equiv y ( \mathbf x _ { n } , \mathbf w )$ . Note that there is no hyperparameter $\beta ,$ because the data points are assumed to be correctly labelled. As before, the prior is taken to be an isotropic Gaussian of the form (5.162).

The first stage in applying the Laplace framework to this model is to initialize the hyperparameter $\alpha ,$ , and then to determine the parameter vector w by maximizing the log posterior distribution. This is equivalent to minimizing the regularized error function α

E (\mathbf {w}) = - \ln p (\mathcal {D} | \mathbf {w}) + \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}\tag{5.182}

and can be achieved using error backpropagation combined with standard optimization algorithms, as discussed in Section 5.3.

Having found a solution ${ \bf w } _ { \mathrm { M A P } }$ for the weight vector, the next step is to evaluate the Hessian matrix H comprising the second derivatives of the negative log likelihood function. This can be done, for instance, using the exact method of Section 5.4.5, or using the outer product approximation given by (5.85). The second derivatives of the negative log posterior can again be written in the form (5.166), and the Gaussian approximation to the posterior is then given by (5.167).

To optimize the hyperparameter $\alpha .$ , we again maximize the marginal likelihood, which is easily shown to take the form

\ln p (\mathcal {D} | \alpha) \simeq - E (\mathbf {w} _ {\mathrm{MAP}}) - \frac {1}{2} \ln | \mathbf {A} | + \frac {W}{2} \ln \alpha + \mathrm{const}\tag{5.183}

where the regularized error function is defined by

E (\mathbf {w} _ {\mathrm{MAP}}) = - \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\} + \frac {\alpha}{2} \mathbf {w} _ {\mathrm{MAP}} ^ {\mathrm{T}} \mathbf {w} _ {\mathrm{MAP}}\tag{5.184}

in which $y _ { n } \equiv y ( \mathbf { x } _ { n } , \mathbf { w } _ { \mathrm { M A P } } )$ . Maximizing this evidence function with respect to α again leads to the re-estimation equation given by (5.178).

The use of the evidence procedure to determine α is illustrated in Figure 5.22 for the synthetic two-dimensional data discussed in Appendix A.

Finally, we need the predictive distribution, which is defined by (5.168). Again, this integration is intractable due to the nonlinearity of the network function. The

Illustration of the evidence framework applied to a synthetic two-class data set. The green curve shows the optimal decision boundary, the black curve shows the result of fitting a two-layer network with 8 hidden units by maximum likelihood, and the red curve shows the result of including a regularizer in which α is optimized using the evidence procedure, starting from the initial value $\alpha = 0$ Note that the evidence procedure greatly reduces the over-fitting of the network.

![image](images/part-002--5ff1f5c8c5697ecdf766bfa605691cf04d0cd4f28433ad91a2432e79ae8ba506.jpg)

simplest approximation is to assume that the posterior distribution is very narrow and hence make the approximation

p (t | \mathbf {x}, \mathcal {D}) \simeq p (t | \mathbf {x}, \mathbf {w} _ {\mathrm{MAP}}).\tag{5.185}

We can improve on this, however, by taking account of the variance of the posterior distribution. In this case, a linear approximation for the network outputs, as was used in the case of regression, would be inappropriate due to the logistic sigmoid outputunit activation function that constrains the output to lie in the range (0, 1). Instead, we make a linear approximation for the output unit activation in the form

a (\mathbf {x}, \mathbf {w}) \simeq a _ {\mathrm{MAP}} (\mathbf {x}) + \mathbf {b} ^ {\mathrm{T}} (\mathbf {w} - \mathbf {w} _ {\mathrm{MAP}})\tag{5.186}

where $a _ { \mathrm { M A P } } ( \mathbf { x } ) = a ( \mathbf { x } , \mathbf { w } _ { \mathrm { M A P } } )$ , and the vector $\mathbf { b } \equiv \nabla a ( \mathbf { x } , \mathbf { w } _ { \mathrm { M A P } } )$ can be found by backpropagation.

Because we now have a Gaussian approximation for the posterior distribution over w, and a model for a that is a linear function of w, we can now appeal to the results of Section 4.5.2. The distribution of output unit activation values, induced by the distribution over network weights, is given by

p (a | \mathbf {x}, \mathcal {D}) = \int \delta \left(a - a _ {\mathrm{MAP}} (\mathbf {x}) - \mathbf {b} ^ {\mathrm{T}} (\mathbf {x}) (\mathbf {w} - \mathbf {w} _ {\mathrm{MAP}})\right) q (\mathbf {w} | \mathcal {D}) \mathrm{d} \mathbf {w}\tag{5.187}

where $q ( \mathbf { w } | \mathcal { D } )$ is the Gaussian approximation to the posterior distribution given by (5.167). From Section 4.5.2, we see that this distribution is Gaussian with mean $a _ { \mathrm { M A P } } \equiv a ( \mathbf { x } , \mathbf { w } _ { \mathrm { M A P } } )$ , and variance

\sigma_ {a} ^ {2} (\mathbf {x}) = \mathbf {b} ^ {\mathrm{T}} (\mathbf {x}) \mathbf {A} ^ {- 1} \mathbf {b} (\mathbf {x}).\tag{5.188}

Finally, to obtain the predictive distribution, we must marginalize over a using

p (t = 1 | \mathbf {x}, \mathcal {D}) = \int \sigma (a) p (a | \mathbf {x}, \mathcal {D}) \mathrm{d} a.\tag{5.189}

![image](images/part-002--92c1880ff42e965aba5fb455a63fb0dea5373f6c059a7f1ebadb8bc0131843a7.jpg)

![image](images/part-002--1dae58eca6df163fac36c5806d35737354b1002cfca0fc585b5b7f26ae7947d7.jpg)

Figure 5.23 An illustration of the Laplace approximation for a Bayesian neural network having 8 hidden units with ‘tanh’ activation functions and a single logistic-sigmoid output unit. The weight parameters were found using scaled conjugate gradients, and the hyperparameter α was optimized using the evidence framework. On the left is the result of using the simple approximation (5.185) based on a point estimate ${ \bf w } _ { \mathrm { M A P } }$ of the parameters, in which the green curve shows the $y = 0 . 5$ decision boundary, and the other contours correspond to output probabilities of $y = 0 . 1 , 0 . 3 , 0 . 7 ,$ , and 0.9. On the right is the corresponding result obtained using (5.190). Note that the effect of marginalization is to spread out the contours and to make the predictions less confident, so that at each input point x, the posterior probabilities are shifted towards 0.5, while the $y = 0 . 5$ contour itself is unaffected.

The convolution of a Gaussian with a logistic sigmoid is intractable. We therefore apply the approximation (4.153) to (5.189) giving

p (t = 1 | \mathbf {x}, \mathcal {D}) = \sigma \left(\kappa (\sigma_ {a} ^ {2}) \mathbf {b} ^ {\mathrm{T}} \mathbf {w} _ {\mathrm{MAP}}\right)\tag{5.190}

where $\kappa ( \cdot )$ is defined by (4.154). Recall that both $\sigma _ { a } ^ { 2 }$ and b are functions of x.

Figure 5.23 shows an example of this framework applied to the synthetic classification data set described in Appendix A.
