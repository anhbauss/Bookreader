---
id: "tin-hieu-he-thong.14-5-2-mixtures-of-logistic-models"
doc_id: "tin-hieu-he-thong"
title: "14.5.2 Mixtures of logistic models"
level: 2
heading_path: ["Combining Models", "14.5.2 Mixtures of logistic models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-5-1-mixtures-of-linear-regression-models"
next_id: "tin-hieu-he-thong.14-5-3-mixtures-of-experts"
block_ids: ["b7155", "b7156", "b7157", "b7158", "b7159", "b7160", "b7161", "b7162", "b7163", "b7164", "b7165", "b7166", "b7167", "b7168", "b7169", "b7170", "b7171", "b7172", "b7173", "b7174", "b7175", "b7176", "b7177"]
---

## 14.5.2 Mixtures of logistic models

Because the logistic regression model defines a conditional distribution for the target variable, given the input vector, it is straightforward to use it as the component distribution in a mixture model, thereby giving rise to a richer family of conditional distributions compared to a single logistic regression model. This example involves a straightforward combination of ideas encountered in earlier sections of the book and will help consolidate these for the reader.

The conditional distribution of the target variable, for a probabilistic mixture of K logistic regression models, is given by

p (t | \boldsymbol {\phi}, \boldsymbol {\theta}) = \sum_ {k = 1} ^ {K} \pi_ {k} y _ {k} ^ {t} [ 1 - y _ {k} ] ^ {1 - t}\tag{14.45}

where $\phi$ is the feature vector, $y _ { k } = \sigma \left( \mathbf { w } _ { k } ^ { \mathrm { T } } \phi \right)$ is the output of component $k ,$ and $\pmb \theta$ denotes the adjustable parameters namely $\{ \pi _ { k } \}$ and $\left\{ \mathbf { w } _ { k } \right\}$

Now suppose we are given a data set $\{ \phi _ { n } , t _ { n } \}$ . The corresponding likelihood

![image](images/part-004--8a0514ef333992312f2625a94f34c4a09eb2ca25ea6502364a9389dae43ea559.jpg)

![image](images/part-004--62b71e48c6ef599a3dd2db38f76931ee5a0b2094faeb718f2a56ef84c796e584.jpg)

Figure 14.9 The left plot shows the predictive conditional density corresponding to the converged solution in Figure 14.8. This gives a log likelihood value of 3.0. A vertical slice through one of these plots at a particula value of x represents the corresponding conditional distribution $p ( t | x )$ , which we see is bimodal. The plot on the right shows the predictive density for a single linear regression model fitted to the same data set using maximum likelihood. This model has a smaller log likelihood of 27.6.

function is then given by

p (\mathbf {t} | \boldsymbol {\theta}) = \prod_ {n = 1} ^ {N} \left(\sum_ {k = 1} ^ {K} \pi_ {k} y _ {n k} ^ {t _ {n}} \left[ 1 - y _ {n k} \right] ^ {1 - t _ {n}}\right)\tag{14.46}

where $y _ { n k } = \sigma ( \mathbf { w } _ { k } ^ { \mathrm { T } } \phi _ { n } )$ and $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . We can maximize this likelihood function iteratively by making use of the EM algorithm. This involves introducing latent variables $z _ { n k }$ that correspond to a 1-of-K coded binary indicator variable for each data point n. The complete-data likelihood function is then given by

p (\mathbf {t}, \mathbf {Z} | \boldsymbol {\theta}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} \left\{\pi_ {k} y _ {n k} ^ {t _ {n}} \left[ 1 - y _ {n k} \right] ^ {1 - t _ {n}} \right\} ^ {z _ {n k}}\tag{14.47}

where Z is the matrix of latent variables with elements $z _ { n k }$ . We initialize the EM algorithm by choosing an initial value $\theta ^ { \mathrm { o l d } }$ for the model parameters. In the E step, we then use these parameter values to evaluate the posterior probabilities of the components k for each data point n, which are given by

\gamma_ {n k} = \mathbb {E} [ z _ {n k} ] = p (k | \boldsymbol {\phi} _ {n}, \pmb {\theta} ^ {\mathrm{old}}) = \frac {\pi_ {k} y _ {n k} ^ {t _ {n}} [ 1 - y _ {n k} ] ^ {1 - t _ {n}}}{\sum_ {j} \pi_ {j} y _ {n j} ^ {t _ {n}} [ 1 - y _ {n j} ] ^ {1 - t _ {n}}}.\tag{14.48}

These responsibilities are then used to find the expected complete-data log likelihood as a function of θ, given by

\begin{array}{l} Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\text {old}}) = \mathbb {E} _ {\mathbf {Z}} \left[ \ln p (\mathbf {t}, \mathbf {Z} | \boldsymbol {\theta}) \right] \\ = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma_ {n k} \left\{\ln \pi_ {k} + t _ {n} \ln y _ {n k} + (1 - t _ {n}) \ln (1 - y _ {n k}) \right\}. \end{array}\tag{14.49}

The M step involves maximization of this function with respect to $\theta ,$ keeping $\pmb { \theta } ^ { \mathrm { o l d } }$ and hence $\gamma _ { n k }$ , fixed. Maximization with respect to $\pi _ { k }$ can be done in the usual way, with a Lagrange multiplier to enforce the summation constraint $\textstyle \sum _ { k } \pi _ { k } = 1$ , giving the familiar result

\pi_ {k} = \frac {1}{N} \sum_ {n = 1} ^ {N} \gamma_ {n k}.\tag{14.50}

To determine the $\left\{ \mathbf { w } _ { k } \right\}$ , we note that the $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ function comprises a sum over terms indexed by k each of which depends only on one of the vectors $\mathbf { w } _ { k } .$ , so that the different vectors are decoupled in the M step of the EM algorithm. In other words, the different components interact only via the responsibilities, which are fixed during the M step. Note that the M step does not have a closed-form solution and must be solved iteratively using, for instance, the iterative reweighted least squares (IRLS) algorithm. The gradient and the Hessian for the vector $\mathbf { w } _ { k }$ are given by

\nabla_ {k} Q = \sum_ {n = 1} ^ {N} \gamma_ {n k} (t _ {n} - y _ {n k}) \phi_ {n}\tag{14.51}

\mathbf {H} _ {k} = - \nabla_ {k} \nabla_ {k} Q = \sum_ {n = 1} ^ {N} \gamma_ {n k} y _ {n k} (1 - y _ {n k}) \phi_ {n} \phi_ {n} ^ {\mathrm{T}}\tag{14.52}

where $\nabla _ { k }$ denotes the gradient with respect to ${ \bf w } _ { k }$ . For fixed $\gamma _ { n k }$ , these are independent of $\{ \mathbf { w } _ { j } \}$ for $j \neq k$ and so we can solve for each $\mathbf { w } _ { k }$ separately using the IRLS algorithm. Thus the M-step equations for component k correspond simply to fitting a single logistic regression model to a weighted data set in which data point n carries a weight $\gamma _ { n k }$ . Figure 14.10 shows an example of the mixture of logistic regression models applied to a simple classification problem. The extension of this model to a mixture of softmax models for more than two classes is straightforward.
