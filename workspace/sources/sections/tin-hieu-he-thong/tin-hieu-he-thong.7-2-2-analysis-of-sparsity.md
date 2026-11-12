---
id: "tin-hieu-he-thong.7-2-2-analysis-of-sparsity"
doc_id: "tin-hieu-he-thong"
title: "7.2.2 Analysis of sparsity"
level: 2
heading_path: ["Sparse Kernel Machines", "7.2.2 Analysis of sparsity"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.7-2-1-rvm-for-regression"
next_id: "tin-hieu-he-thong.sequential-sparse-bayesian-learning-algorithm"
block_ids: ["b3951", "b3952", "b3953", "b3954", "b3955", "b3956", "b3957", "b3958", "b3959", "b3960", "b3961", "b3962", "b3963", "b3964", "b3965", "b3966", "b3967", "b3968", "b3969", "b3970", "b3971", "b3972", "b3973", "b3974", "b3975", "b3976", "b3977", "b3978", "b3979", "b3980", "b3981"]
---

## 7.2.2 Analysis of sparsity

We have noted earlier that the mechanism of automatic relevance determination causes a subset of parameters to be driven to zero. We now examine in more detail the mechanism of sparsity in the context of the relevance vector machine. In the process, we will arrive at a significantly faster procedure for optimizing the hyperparameters compared to the direct techniques given above.

![image](images/part-002--fae359950937cd77bd9a100245c38fea36ddc2cd6a09eca0cca3c082a5a9aec3.jpg)

Figure 7.10 Illustration of the mechanism for sparsity in a Bayesian linear regression model, showing a training set vector of target values given by ${ \bf t } = ( t _ { 1 } , t _ { 2 } ) ^ { \mathrm { T } }$ , indicated by the cross, for a model with one basis vector $\varphi = \left( \phi ( \mathbf { x } _ { 1 } ) , \phi ( \mathbf { x } _ { 2 } ) \right) ^ { \mathrm { T } }$ , which is poorly aligned with the target data vector t. On the left we see a model having only isotropic noise, so that $\mathbf { C } = \beta ^ { \mathbf { \bar { - } } 1 } \mathbf { I }$ , corresponding to $\alpha = \infty ,$ , with $\beta$ set to its most probable value. On the right we see the same model but with a finite value of $\alpha .$ . In each case the red ellipse corresponds to unit Mahalanobis distance, with $| \mathbf { C } |$ taking the same value for both plots, while the dashed green circle shows the contrition arising from the noise term $\beta ^ { - 1 }$ . We see that any finite value of $\alpha$ reduces the probability of the observed data, and so for the most probable solution the basis vector is removed.

Before proceeding with a mathematical analysis, we first give some informal insight into the origin of sparsity in Bayesian linear models. Consider a data set comprising $N = 2$ observations $t _ { 1 }$ and $t _ { 2 }$ , together with a model having a single basis function $\phi ( \mathbf { x } )$ , with hyperparameter α, along with isotropic noise having precision $\beta .$ . From (7.85), the marginal likelihood is given by $p ( \mathbf { t } | \bar { \alpha } , \beta ) = \mathcal { N } ( \mathbf { t } | \mathbf { 0 } , \mathbf { C } )$ in which the covariance matrix takes the form

\mathbf {C} = \frac {1}{\beta} \mathbf {I} + \frac {1}{\alpha} \boldsymbol {\varphi} \boldsymbol {\varphi} ^ {\mathrm{T}}\tag{7.92}

where $\varphi$ denotes the N-dimensional vector $( \phi ( \mathbf { x } _ { 1 } ) , \phi ( \mathbf { x } _ { 2 } ) ) ^ { \mathrm { T } }$ , and similarly ${ \textbf { t } } =$ $( t _ { 1 } , t _ { 2 } ) ^ { \dot { \mathrm { T } } }$ . Notice that this is just a zero-mean Gaussian process model over t with covariance C. Given a particular observation for t, our goal is to find $\alpha ^ { \star }$ and $\beta ^ { \star }$ by maximizing the marginal likelihood. We see from Figure 7.10 that, if there is a poor alignment between the direction of $\varphi$ and that of the training data vector t, then the corresponding hyperparameter $\alpha$ will be driven to $\infty .$ , and the basis vector will be pruned from the model. This arises because any finite value for α will always assign a lower probability to the data, thereby decreasing the value of the density at t, provided that $\beta$ is set to its optimal value. We see that any finite value for α would cause the distribution to be elongated in a direction away from the data, thereby increasing the probability mass in regions away from the observed data and hence reducing the value of the density at the target data vector itself. For the more general case of M basis vectors $\varphi _ { 1 } , \ldots , \varphi _ { M }$ a similar intuition holds, namely that if a particular basis vector is poorly aligned with the data vector t, then it is likely to be pruned from the model.

We now investigate the mechanism for sparsity from a more mathematical perspective, for a general case involving M basis functions. To motivate this analysis we first note that, in the result (7.87) for re-estimating the parameter $\alpha _ { i }$ , the terms on the right-hand side are themselves also functions of $\alpha _ { i }$ . These results therefore represent implicit solutions, and iteration would be required even to determine a single $\alpha _ { i }$ with all other $\alpha _ { j }$ for $j \neq i$ fixed.

This suggests a different approach to solving the optimization problem for the RVM, in which we make explicit all of the dependence of the marginal likelihood (7.85) on a particular $\alpha _ { i }$ and then determine its stationary points explicitly (Faul and Tipping, 2002; Tipping and Faul, 2003). To do this, we first pull out the contribution from $\alpha _ { i }$ in the matrix C defined by (7.86) to give

\begin{array}{r c l} \mathbf {C} & = & \beta^ {- 1} \mathbf {I} + \sum_ {j \neq i} \alpha_ {j} ^ {- 1} \boldsymbol {\varphi} _ {j} \boldsymbol {\varphi} _ {j} ^ {\mathrm{T}} + \alpha_ {i} ^ {- 1} \boldsymbol {\varphi} _ {i} \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \\ & = & \mathbf {C} _ {- i} + \alpha_ {i} ^ {- 1} \boldsymbol {\varphi} _ {i} \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \end{array}\tag{7.93}

where $\varphi _ { i }$ denotes the $i ^ { \mathrm { t h } }$ column of $\Phi$ , in other words the N-dimensional vector with elements $( \phi _ { i } ( \mathbf { x } _ { 1 } ) , \ldots , \phi _ { i } ( \mathbf { x } _ { N } ) )$ , in contrast to $\phi _ { n }$ , which denotes the $n ^ { \mathrm { t h } }$ row of $\Phi$ The matrix $\mathbf { C } _ { - i }$ represents the matrix C with the contribution from basis function i removed. Using the matrix identities (C.7) and (C.15), the determinant and inverse of C can then be written

{| \mathbf {C} |} = {| \mathbf {C} _ {- i} | | 1 + \alpha_ {i} ^ {- 1} \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1} \boldsymbol {\varphi} _ {i} |}\tag{7.94}

\mathbf {C} ^ {- 1} = \mathbf {C} _ {- i} ^ {- 1} - \frac {\mathbf {C} _ {- i} ^ {- 1} \boldsymbol {\varphi} _ {i} \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1}}{\alpha_ {i} + \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1} \boldsymbol {\varphi} _ {i}}.\tag{7.95}

Exercise 7.15

Using these results, we can then write the log marginal likelihood function (7.85) in the form

L (\boldsymbol {\alpha}) = L \left(\boldsymbol {\alpha} _ {- i}\right) + \lambda \left(\alpha_ {i}\right)\tag{7.96}

where $L (  { \alpha } _ { - i } )$ is simply the log marginal likelihood with basis function $\varphi _ { i }$ omitted, and the quantity $\lambda ( \alpha _ { i } )$ is defined by

\lambda (\alpha_ {i}) = \frac {1}{2} \left[ \ln \alpha_ {i} - \ln (\alpha_ {i} + s _ {i}) + \frac {q _ {i} ^ {2}}{\alpha_ {i} + s _ {i}} \right]\tag{7.97}

and contains all of the dependence on $\alpha _ { i }$ . Here we have introduced the two quantities

{s _ {i}} = {\varphi_ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1} \varphi_ {i}}\tag{7.98}

{q _ {i}} = {\varphi_ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1} \mathbf {t}.}\tag{7.99}

Here $s _ { i }$ is called the sparsity and $q _ { i }$ is known as the quality of $\varphi _ { i }$ , and as we shall see, a large value of $s _ { i }$ relative to the value of $q _ { i }$ means that the basis function $\varphi _ { i }$ is more likely to be pruned from the model. The ‘sparsity’ measures the extent to which basis function $\varphi _ { i }$ overlaps with the other basis vectors in the model, and the ‘quality’ represents a measure of the alignment of the basis vector $\varphi _ { n }$ with the error between the training set values $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ and the vector ${ \pmb y } _ { - i }$ of predictions that would result from the model with the vector $\varphi _ { i }$ excluded (Tipping and Faul, 2003).

Figure 7.11 Plots of the log marginal likelihood $\lambda ( \alpha _ { i } )$ versus ln $\alpha _ { i }$ showing on the left, the single maximum at a finite $\alpha _ { i }$ for $q _ { i } ^ { 2 } \ = \ 4$ and $s _ { i } = 1$ (so that $q _ { i } ^ { 2 } > s _ { i } )$ and on the right, the maximum at $\alpha _ { i } = \infty$ for $q _ { i } ^ { 2 } ~ = ~ 1$ and $s _ { i } ~ = ~ 2$ (so that $q _ { i } ^ { 2 } < s _ { i } )$

![image](images/part-002--3d268babf3bc5c3ecfb27bdded9c045b81f3f18e9b1385ce447a20d4b932e30d.jpg)

![image](images/part-002--ad23958f596cbd7b20b06eea400fcc40f6c3e0bb80a7b08d8742e8a0ad5ece92.jpg)

The stationary points of the marginal likelihood with respect to $\alpha _ { i }$ occur when the derivative

\frac {\mathrm{d} \lambda (\alpha_ {i})}{\mathrm{d} \alpha_ {i}} = \frac {\alpha_ {i} ^ {- 1} s _ {i} ^ {2} - (q _ {i} ^ {2} - s _ {i})}{2 (\alpha_ {i} + s _ {i}) ^ {2}}\tag{7.100}

is equal to zero. There are two possible forms for the solution. Recalling that $\alpha _ { i } \geqslant 0$ we see that if $q _ { i } ^ { 2 } < s _ { i }$ , then $\alpha _ { i } \to \infty$ provides a solution. Conversely, if $q _ { i } ^ { 2 } > s _ { i }$ , we can solve for $\alpha _ { i }$ to obtain

\alpha_ {i} = \frac {s _ {i} ^ {2}}{q _ {i} ^ {2} - s _ {i}}.\tag{7.101}

These two solutions are illustrated in Figure 7.11. We see that the relative size of the quality and sparsity terms determines whether a particular basis vector will be pruned from the model or not. A more complete analysis (Faul and Tipping, 2002), based on the second derivatives of the marginal likelihood, confirms these solutions are indeed the unique maxima of $\lambda ( \alpha _ { i } )$

Note that this approach has yielded a closed-form solution for $\alpha _ { i }$ , for given values of the other hyperparameters. As well as providing insight into the origin of sparsity in the RVM, this analysis also leads to a practical algorithm for optimizing the hyperparameters that has significant speed advantages. This uses a fixed set of candidate basis vectors, and then cycles through them in turn to decide whether each vector should be included in the model or not. The resulting sequential sparse Bayesian learning algorithm is described below.
