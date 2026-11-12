---
id: "tin-hieu-he-thong.figure-3-6"
doc_id: "tin-hieu-he-thong"
title: "Figure 3.6"
level: 2
heading_path: ["3 Linear Models for Regression", "Figure 3.6"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-2-the-bias-variance-decomposition"
next_id: "tin-hieu-he-thong.3-3-bayesian-linear-regression"
block_ids: ["b1774", "b1775", "b1776", "b1777", "b1778", "b1779", "b1780", "b1781", "b1782", "b1783", "b1784", "b1785"]
---

## Figure 3.6

Plot of squared bias and variance, together with their sum, corresponding to the results shown in Figure 3.5. Also shown is the average test set error for a test data set size of 1000 points. The minimum value of $( \mathrm { b i a s } ) ^ { \dot { 2 } } +$ variance occurs around ln $\dot { \lambda } = - 0 . 3 1$ , which is close to the value that gives the minimum error on the test data.

![image](images/part-001--03dbe6cb83b33c0f24890913d3d608db668256a29872dcf30c798b3bec2cda0c.jpg)

fit a model with 24 Gaussian basis functions by minimizing the regularized error function (3.27) to give a prediction function $y ^ { ( l ) } ( x )$ as shown in Figure 3.5. The top row corresponds to a large value of the regularization coefficient λ that gives low variance (because the red curves in the left plot look similar) but high bias (because the two curves in the right plot are very different). Conversely on the bottom row, for which λ is small, there is large variance (shown by the high variability between the red curves in the left plot) but low bias (shown by the good fit between the average model fit and the original sinusoidal function). Note that the result of averaging many solutions for the complex model with $M = 2 5$ is a very good fit to the regression function, which suggests that averaging may be a beneficial procedure. Indeed, a weighted averaging of multiple solutions lies at the heart of a Bayesian approach, although the averaging is with respect to the posterior distribution of parameters, not with respect to multiple data sets.

We can also examine the bias-variance trade-off quantitatively for this example. The average prediction is estimated from

\overline {{y}} (x) = \frac {1}{L} \sum_ {l = 1} ^ {L} y ^ {(l)} (x)\tag{3.45}

and the integrated squared bias and integrated variance are then given by

\left(\text { bias }\right) ^ {2} = \frac {1}{N} \sum_ {n = 1} ^ {N} \left\{\overline {{y}} (x _ {n}) - h (x _ {n}) \right\} ^ {2}\tag{3.46}

\text { variance } = \frac {1}{N} \sum_ {n = 1} ^ {N} \frac {1}{L} \sum_ {l = 1} ^ {L} \left\{y ^ {(l)} (x _ {n}) - \overline {{y}} (x _ {n}) \right\} ^ {2}\tag{3.47}

where the integral over x weighted by the distribution $p ( x )$ is approximated by a finite sum over data points drawn from that distribution. These quantities, along with their sum, are plotted as a function of ln λ in Figure 3.6. We see that small values of λ allow the model to become finely tuned to the noise on each individual data set leading to large variance. Conversely, a large value of λ pulls the weight parameters towards zero leading to large bias.

Although the bias-variance decomposition may provide some interesting insights into the model complexity issue from a frequentist perspective, it is of limited practical value, because the bias-variance decomposition is based on averages with respect to ensembles of data sets, whereas in practice we have only the single observed data set. If we had a large number of independent training sets of a given size, we would be better off combining them into a single large training set, which of course would reduce the level of over-fitting for a given model complexity.

Given these limitations, we turn in the next section to a Bayesian treatment of linear basis function models, which not only provides powerful insights into the issues of over-fitting but which also leads to practical techniques for addressing the question model complexity.
