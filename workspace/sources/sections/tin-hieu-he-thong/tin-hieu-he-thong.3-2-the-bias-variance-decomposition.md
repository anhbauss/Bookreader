---
id: "tin-hieu-he-thong.3-2-the-bias-variance-decomposition"
doc_id: "tin-hieu-he-thong"
title: "3.2. The Bias-Variance Decomposition"
level: 2
heading_path: ["3 Linear Models for Regression", "3.2. The Bias-Variance Decomposition"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-1-5-multiple-outputs"
next_id: "tin-hieu-he-thong.figure-3-6"
block_ids: ["b1741", "b1742", "b1743", "b1744", "b1745", "b1746", "b1747", "b1748", "b1749", "b1750", "b1751", "b1752", "b1753", "b1754", "b1755", "b1756", "b1757", "b1758", "b1759", "b1760", "b1761", "b1762", "b1763", "b1764", "b1765", "b1766", "b1767", "b1768", "b1769", "b1770", "b1771", "b1772", "b1773"]
---

## 3.2. The Bias-Variance Decomposition

So far in our discussion of linear models for regression, we have assumed that the form and number of basis functions are both fixed. As we have seen in Chapter 1, the use of maximum likelihood, or equivalently least squares, can lead to severe over-fitting if complex models are trained using data sets of limited size. However, limiting the number of basis functions in order to avoid over-fitting has the side effect of limiting the flexibility of the model to capture interesting and important trends in the data. Although the introduction of regularization terms can control over-fitting for models with many parameters, this raises the question of how to determine a suitable value for the regularization coefficient λ. Seeking the solution that minimizes the regularized error function with respect to both the weight vector w and the regularization coefficient λ is clearly not the right approach since this leads to the unregularized solution with $\lambda = 0$

As we have seen in earlier chapters, the phenomenon of over-fitting is really an unfortunate property of maximum likelihood and does not arise when we marginalize over parameters in a Bayesian setting. In this chapter, we shall consider the Bayesian view of model complexity in some depth. Before doing so, however, it is instructive to consider a frequentist viewpoint of the model complexity issue, known as the biasvariance trade-off. Although we shall introduce this concept in the context of linear basis function models, where it is easy to illustrate the ideas using simple examples, the discussion has more general applicability.

In Section 1.5.5, when we discussed decision theory for regression problems, we considered various loss functions each of which leads to a corresponding optimal prediction once we are given the conditional distribution $p ( t | \mathbf { x } )$ . A popular choice is the squared loss function, for which the optimal prediction is given by the conditional expectation, which we denote by $h ( \mathbf { x } )$ and which is given by

h (\mathbf {x}) = \mathbb {E} [ t | \mathbf {x} ] = \int t p (t | \mathbf {x}) \mathrm{d} t.\tag{3.36}

At this point, it is worth distinguishing between the squared loss function arising from decision theory and the sum-of-squares error function that arose in the maximum likelihood estimation of model parameters. We might use more sophisticated techniques than least squares, for example regularization or a fully Bayesian approach, to determine the conditional distribution $p ( t | \mathbf { x } )$ . These can all be combined with the squared loss function for the purpose of making predictions.

We showed in Section 1.5.5 that the expected squared loss can be written in the form

\mathbb {E} [ L ] = \int \left\{y (\mathbf {x}) - h (\mathbf {x}) \right\} ^ {2} p (\mathbf {x}) \mathrm{d} \mathbf {x} + \int \left\{h (\mathbf {x}) - t \right\} ^ {2} p (\mathbf {x}, t) \mathrm{d} \mathbf {x} \mathrm{d} t.\tag{3.37}

Recall that the second term, which is independent of $y ( \mathbf x )$ , arises from the intrinsic noise on the data and represents the minimum achievable value of the expected loss. The first term depends on our choice for the function $y ( \mathbf x )$ , and we will seek a solution for $y ( \mathbf x )$ which makes this term a minimum. Because it is nonnegative, the smallest that we can hope to make this term is zero. If we had an unlimited supply of data (and unlimited computational resources), we could in principle find the regression function $h ( \mathbf { x } )$ to any desired degree of accuracy, and this would represent the optimal choice for $y ( \mathbf x )$ . However, in practice we have a data set $\mathcal { D }$ containing only a finite number $N$ of data points, and consequently we do not know the regression function $h ( \mathbf { x } )$ exactly.

If we model the $h ( \mathbf { x } )$ using a parametric function $y ( \mathbf { x } , \mathbf { w } )$ governed by a parameter vector w, then from a Bayesian perspective the uncertainty in our model is expressed through a posterior distribution over w. A frequentist treatment, however, involves making a point estimate of w based on the data set $\mathcal { D } _ { : }$ , and tries instead to interpret the uncertainty of this estimate through the following thought experiment. Suppose we had a large number of data sets each of size $N$ and each drawn independently from the distribution $p ( t , \mathbf { x } )$ . For any given data set $\mathcal { D } _ { : }$ , we can run our learning algorithm and obtain a prediction function $y ( \mathbf { x } ; \mathcal { D } )$ . Different data sets from the ensemble will give different functions and consequently different values of the squared loss. The performance of a particular learning algorithm is then assessed by taking the average over this ensemble of data sets.

Consider the integrand of the first term in (3.37), which for a particular data set $\mathcal { D }$ takes the form

\{y (\mathbf {x}; \mathcal {D}) - h (\mathbf {x}) \} ^ {2}.\tag{3.38}

Because this quantity will be dependent on the particular data set $\mathcal { D } _ { \mathrm { : } }$ , we take its average over the ensemble of data sets. If we add and subtract the quantity $\mathbb { E } _ { \mathcal { D } } [ y ( \mathbf { x } ; \mathcal { D } ) ]$ inside the braces, and then expand, we obtain

\begin{array}{r l} & {\left\{y (\mathbf {x}; \mathcal {D}) - \mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x}; \mathcal {D}) ] + \mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x}; \mathcal {D}) ] - h (\mathbf {x}) \right\} ^ {2}} \\ {=} & {\left\{y (\mathbf {x}; \mathcal {D}) - \mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x}; \mathcal {D}) ] \right\} ^ {2} + \left\{\mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x}; \mathcal {D}) ] - h (\mathbf {x}) \right\} ^ {2}} \\ & {\quad + 2 \bigl \{y (\mathbf {x}; \mathcal {D}) - \mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x}; \mathcal {D}) ] \bigr \} \bigl \{\mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x}; \mathcal {D}) ] - h (\mathbf {x}) \bigr \}.} \end{array}\tag{3.39}

We now take the expectation of this expression with respect to $\mathcal { D }$ and note that the final term will vanish, giving

\begin{array}{l} \mathbb {E} _ {\mathcal {D}} \left[ \{y (\mathbf {x}; \mathcal {D}) - h (\mathbf {x}) \} ^ {2} \right] \\ = \underbrace {\{\mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x} ; \mathcal {D}) ] - h (\mathbf {x}) \} ^ {2}} _ {(\text { bias }) ^ {2}} + \underbrace {\mathbb {E} _ {\mathcal {D}} \left[ \{y (\mathbf {x} ; \mathcal {D}) - \mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x} ; \mathcal {D}) ] \} ^ {2} \right]} _ {\text { variance }}. \end{array}\tag{3.40}

We see that the expected squared difference between $y ( \mathbf { x } ; \mathcal { D } )$ and the regression function $h ( \mathbf { x } )$ can be expressed as the sum of two terms. The first term, called the squared bias, represents the extent to which the average prediction over all data sets differs from the desired regression function. The second term, called the variance, measures the extent to which the solutions for individual data sets vary around their average, and hence this measures the extent to which the function $y ( \mathbf { x } ; \mathcal { D } )$ is sensitive to the particular choice of data set. We shall provide some intuition to support these definitions shortly when we consider a simple example.

So far, we have considered a single input value x. If we substitute this expansion back into (3.37), we obtain the following decomposition of the expected squared loss

\text { expected   loss } = (\text { bias }) ^ {2} + \text { variance } + \text { noise }\tag{3.41}

where

(\mathrm{bias}) ^ {2} = \int \{\mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x}; \mathcal {D}) ] - h (\mathbf {x}) \} ^ {2} p (\mathbf {x})   \mathrm{d} \mathbf {x}\tag{3.42}

\mathrm{variance} = \int \mathbb {E} _ {\mathcal {D}} \left[ \{y (\mathbf {x}; \mathcal {D}) - \mathbb {E} _ {\mathcal {D}} [ y (\mathbf {x}; \mathcal {D}) ] \} ^ {2} \right] p (\mathbf {x}) \mathrm{d} \mathbf {x}\tag{3.43}

\mathrm{noise} = \int \{h (\mathbf {x}) - t \} ^ {2} p (\mathbf {x}, t) \mathrm{d} \mathbf {x} \mathrm{d} t\tag{3.44}

and the bias and variance terms now refer to integrated quantities.

Our goal is to minimize the expected loss, which we have decomposed into the sum of a (squared) bias, a variance, and a constant noise term. As we shall see, there is a trade-off between bias and variance, with very flexible models having low bias and high variance, and relatively rigid models having high bias and low variance. The model with the optimal predictive capability is the one that leads to the best balance between bias and variance. This is illustrated by considering the sinusoidal data set from Chapter 1. Here we generate 100 data sets, each containing $N = 2 5$ data points, independently from the sinusoidal curve $h ( x ) = \sin ( 2 \pi x )$ . The data sets are indexed by $l = 1 , \dots , L$ , where $L = 1 0 0$ , and for each data set $\mathcal { D } ^ { ( l ) }$ we

Appendix A

![image](images/part-001--bc4018a90c4d474f6d62c38e80340e0ada25021b970cfa858ec0403855ac6d6e.jpg)

![image](images/part-001--7ea7658905db48e44154787662cb064d826cdb60c184448d80415f11bfeed320.jpg)

![image](images/part-001--b9dc67e59e1595e8654a35612ecb40cc0ca66e7f2baefb21de7bc8d7dd65560e.jpg)

![image](images/part-001--cd1005d248dc2f5311f0c4c4f9bc4c4e94ef477d84ba305823c3df0670a489bd.jpg)

![image](images/part-001--b03c3d9a685a3912473d5225c3fdebb7ad7d7c43ffd2347271741ce3ac4b373c.jpg)

![image](images/part-001--065f1898046a8e5133c162614d4ff3a3f84e9bc8af31886abcb108758620e082.jpg)

Figure 3.5 Illustration of the dependence of bias and variance on model complexity, governed by a regulariza tion parameter λ, using the sinusoidal data set from Chapter 1. There are $L = 1 0 0$ data sets, each having $N = 2 5$ data points, and there are 24 Gaussian basis functions in the model so that the total number of parameters is $M = 2 5$ including the bias parameter. The left column shows the result of fitting the model to the data sets for various values of ln λ (for clarity, only 20 of the 100 fits are shown). The right column shows the corresponding average of the 100 fits (red) along with the sinusoidal function from which the data sets were generated (green).
