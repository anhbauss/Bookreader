---
id: "tin-hieu-he-thong.7-2-1-rvm-for-regression"
doc_id: "tin-hieu-he-thong"
title: "7.2.1 RVM for regression"
level: 2
heading_path: ["Sparse Kernel Machines", "7.2.1 RVM for regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.7-2-relevance-vector-machines"
next_id: "tin-hieu-he-thong.7-2-2-analysis-of-sparsity"
block_ids: ["b3907", "b3908", "b3909", "b3910", "b3911", "b3912", "b3913", "b3914", "b3915", "b3916", "b3917", "b3918", "b3919", "b3920", "b3921", "b3922", "b3923", "b3924", "b3925", "b3926", "b3927", "b3928", "b3929", "b3930", "b3931", "b3932", "b3933", "b3934", "b3935", "b3936", "b3937", "b3938", "b3939", "b3940", "b3941", "b3942", "b3943", "b3944", "b3945", "b3946", "b3947", "b3948", "b3949", "b3950"]
---

## 7.2.1 RVM for regression

The relevance vector machine for regression is a linear model of the form studied in Chapter 3 but with a modified prior that results in sparse solutions. The model defines a conditional distribution for a real-valued target variable t, given an input vector x, which takes the form

p (t | \mathbf {x}, \mathbf {w}, \beta) = \mathcal {N} (t | y (\mathbf {x}), \beta^ {- 1})\tag{7.76}

where $\beta = \sigma ^ { - 2 }$ is the noise precision (inverse noise variance), and the mean is given by a linear model of the form

y (\mathbf {x}) = \sum_ {i = 1} ^ {M} w _ {i} \phi_ {i} (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x})\tag{7.77}

with fixed nonlinear basis functions $\phi _ { i } ( \mathbf { x } )$ , which will typically include a constant term so that the corresponding weight parameter represents a ‘bias’.

The relevance vector machine is a specific instance of this model, which is intended to mirror the structure of the support vector machine. In particular, the basis functions are given by kernels, with one kernel associated with each of the data points from the training set. The general expression (7.77) then takes the SVM-like form

y (\mathbf {x}) = \sum_ {n = 1} ^ {N} w _ {n} k (\mathbf {x}, \mathbf {x} _ {n}) + b\tag{7.78}

where b is a bias parameter. The number of parameters in this case is $M = N + 1$ and $y ( \mathbf x )$ has the same form as the predictive model (7.64) for the SVM, except that the coefficients $a _ { n }$ are here denoted $w _ { n }$ . It should be emphasized that the subsequent analysis is valid for arbitrary choices of basis function, and for generality we shall work with the form (7.77). In contrast to the SVM, there is no restriction to positivedefinite kernels, nor are the basis functions tied in either number or location to the training data points.

Suppose we are given a set of N observations of the input vector x, which we denote collectively by a data matrix X whose $n ^ { \mathrm { t h } }$ row is ${ \bf x } _ { n } ^ { \mathrm { T } }$ with $n = 1 , \ldots , N$ . The corresponding target values are given by ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . Thus, the likelihood function is given by

p (\mathbf {t} | \mathbf {X}, \mathbf {w}, \beta) = \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {x} _ {n}, \mathbf {w}, \beta^ {- 1}).\tag{7.79}

Next we introduce a prior distribution over the parameter vector w and as in Chapter 3, we shall consider a zero-mean Gaussian prior. However, the key difference in the RVM is that we introduce a separate hyperparameter $\alpha _ { i }$ for each of the weight parameters $w _ { i }$ instead of a single shared hyperparameter. Thus the weight prior takes the form

p (\mathbf {w} | \boldsymbol {\alpha}) = \prod_ {i = 1} ^ {M} \mathcal {N} (w _ {i} | 0, \alpha_ {i} ^ {- 1})\tag{7.80}

where $\alpha _ { i }$ represents the precision of the corresponding parameter $w _ { i }$ , and α denotes $( \alpha _ { 1 } , \ldots , \bar { \alpha _ { M } } ) ^ { \mathrm { T } }$ . We shall see that, when we maximize the evidence with respect to these hyperparameters, a significant proportion of them go to infinity, and the corresponding weight parameters have posterior distributions that are concentrated at zero. The basis functions associated with these parameters therefore play no role in the predictions made by the model and so are effectively pruned out, resulting in a sparse model.

Using the result (3.49) for linear regression models, we see that the posterior distribution for the weights is again Gaussian and takes the form

p (\mathbf {w} | \mathbf {t}, \mathbf {X}, \boldsymbol {\alpha}, \beta) = \mathcal {N} (\mathbf {w} | \mathbf {m}, \boldsymbol {\Sigma})\tag{7.81}

where the mean and covariance are given by

\mathbf {m} = \beta \boldsymbol {\Sigma} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}\tag{7.82}

\boldsymbol {\Sigma} = \left(\mathbf {A} + \beta \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\right) ^ {- 1}\tag{7.83}

where Φ is the $N \times M$ design matrix with elements $\Phi _ { n i } ~ = ~ \phi _ { i } ( \mathbf { x } _ { n } )$ , and ${ \textbf { A } } =$ $\mathrm { d i a g } ( \alpha _ { i } )$ . Note that in the specific case of the model (7.78), we have Φ ${ \mathbf { \Gamma } } = { \mathbf { K } }$ , where K is the symmetric $( N + 1 ) \times ( N + 1 )$ kernel matrix with elements $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$

The values of $\alpha$ and $\beta$ are determined using type-2 maximum likelihood, also known as the evidence approximation, in which we maximize the marginal likelihood function obtained by integrating out the weight parameters

p (\mathbf {t} | \mathbf {X}, \boldsymbol {\alpha}, \beta) = \int p (\mathbf {t} | \mathbf {X}, \mathbf {w}, \beta) p (\mathbf {w} | \boldsymbol {\alpha}) d \mathbf {w}.\tag{7.84}

Because this represents the convolution of two Gaussians, it is readily evaluated to give the log marginal likelihood in the form

\begin{array}{r c l} \ln p (\mathbf {t} | \mathbf {X}, \boldsymbol {\alpha}, \beta) & = & \ln \mathcal {N} (\mathbf {t} | \mathbf {0}, \mathbf {C}) \\ & = & - \frac {1}{2} \left\{N \ln (2 \pi) + \ln | \mathbf {C} | + \mathbf {t} ^ {\mathrm{T}} \mathbf {C} ^ {- 1} \mathbf {t} \right\} \end{array}\tag{7.85}

where ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ , and we have defined the $N \times N$ matrix C given by

\mathbf {C} = \beta^ {- 1} \mathbf {I} + \boldsymbol {\Phi} \mathbf {A} ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}}.\tag{7.86}

Our goal is now to maximize (7.85) with respect to the hyperparameters α and $\beta .$ This requires only a small modification to the results obtained in Section 3.5 for the evidence approximation in the linear regression model. Again, we can identify two approaches. In the first, we simply set the required derivatives of the marginal likelihood to zero and obtain the following re-estimation equations

\alpha_ {i} ^ {\mathrm{new}} = \frac {\gamma_ {i}}{m _ {i} ^ {2}}\tag{7.87}

(\beta^ {\mathrm{new}}) ^ {- 1} = \frac {\| \mathbf {t} - \boldsymbol {\Phi} \mathbf {m} \| ^ {2}}{N - \sum_ {i} \gamma_ {i}}\tag{7.88}

where $m _ { i }$ is the $i ^ { \mathrm { t h } }$ component of the posterior mean m defined by (7.82). The quantity $\gamma _ { i }$ measures how well the corresponding parameter $w _ { i }$ is determined by the data and is defined by

\gamma_ {i} = 1 - \alpha_ {i} \Sigma_ {i i}\tag{7.89}

in which $\Sigma _ { i i }$ is the $i ^ { \mathrm { t h } }$ diagonal component of the posterior covariance Σ given by (7.83). Learning therefore proceeds by choosing initial values for α and $\beta ,$ evaluating the mean and covariance of the posterior using (7.82) and (7.83), respectively, and then alternately re-estimating the hyperparameters, using (7.87) and (7.88), and re-estimating the posterior mean and covariance, using (7.82) and (7.83), until a suitable convergence criterion is satisfied.

The second approach is to use the EM algorithm, and is discussed in Section 9.3.4. These two approaches to finding the values of the hyperparameters that maximize the evidence are formally equivalent. Numerically, however, it is found that the direct optimization approach corresponding to (7.87) and (7.88) gives somewhat faster convergence (Tipping, 2001).

As a result of the optimization, we find that a proportion of the hyperparameters $\left\{ \alpha _ { i } \right\}$ are driven to large (in principle infinite) values, and so the weight parameters $w _ { i }$ corresponding to these hyperparameters have posterior distributions with mean and variance both zero. Thus those parameters, and the corresponding basis functions $\phi _ { i } ( \mathbf { x } )$ , are removed from the model and play no role in making predictions for new inputs. In the case of models of the form (7.78), the inputs ${ \bf x } _ { n }$ corresponding to the remaining nonzero weights are called relevance vectors, because they are identified through the mechanism of automatic relevance determination, and are analogous to the support vectors of an SVM. It is worth emphasizing, however, that this mechanism for achieving sparsity in probabilistic models through automatic relevance determination is quite general and can be applied to any model expressed as an adaptive linear combination of basis functions.

Having found values $\alpha ^ { \star }$ and $\beta ^ { \star }$ for the hyperparameters that maximize the marginal likelihood, we can evaluate the predictive distribution over t for a new input x. Using (7.76) and (7.81), this is given by

\begin{array}{r c l} p (t | \mathbf {x}, \mathbf {X}, \mathbf {t}, \boldsymbol {\alpha} ^ {\star}, \beta^ {\star}) & = & \int p (t | \mathbf {x}, \mathbf {w}, \beta^ {\star}) p (\mathbf {w} | \mathbf {X}, \mathbf {t}, \boldsymbol {\alpha} ^ {\star}, \beta^ {\star})   \mathrm{d} \mathbf {w} \\ & = & \mathcal {N} \left(t | \mathbf {m} ^ {\mathrm{T}} \phi (\mathbf {x}), \sigma^ {2} (\mathbf {x})\right). \end{array}\tag{7.90}

Thus the predictive mean is given by (7.76) with w set equal to the posterior mean m, and the variance of the predictive distribution is given by

\sigma^ {2} (\mathbf {x}) = (\beta^ {\star}) ^ {- 1} + \phi (\mathbf {x}) ^ {\mathrm{T}} \pmb {\Sigma} \phi (\mathbf {x})\tag{7.91}

where Σ is given by (7.83) in which α and $\beta$ are set to their optimized values $\alpha ^ { \star }$ and $\beta ^ { \star }$ . This is just the familiar result (3.59) obtained in the context of linear regression. Recall that for localized basis functions, the predictive variance for linear regression models becomes small in regions of input space where there are no basis functions. In the case of an RVM with the basis functions centred on data points, the model will therefore become increasingly certain of its predictions when extrapolating outside the domain of the data (Rasmussen and Quinonero-Candela, 2005), which of course˜ is undesirable. The predictive distribution in Gaussian process regression does not

Illustration of RVM regression using the same data set, and the same Gaussian kernel functions, as used in Figure 7.8 for the $\nu { \mathrm { - } } { \mathsf { S V M } }$ regression model. The mean of the predictive distribution for the RVM is shown by the red line, and the one standarddeviation predictive distribution is shown by the shaded region. Also, the data points are shown in green, and the relevance vectors are indicated by blue circles. Note that there are only 3 relevance vectors compared to 7 support vectors for the ν-SVM in Figure 7.8.

![image](images/part-002--a8917173aa3cf6979dde30a4ee77e6db6e6d7956f33de96edddb27fcec906672.jpg)

suffer from this problem. However, the computational cost of making predictions with a Gaussian processes is typically much higher than with an RVM.

Figure 7.9 shows an example of the RVM applied to the sinusoidal regression data set. Here the noise precision parameter $\beta$ is also determined through evidence maximization. We see that the number of relevance vectors in the RVM is significantly smaller than the number of support vectors used by the SVM. For a wide range of regression and classification tasks, the RVM is found to give models that are typically an order of magnitude more compact than the corresponding support vector machine, resulting in a significant improvement in the speed of processing on test data. Remarkably, this greater sparsity is achieved with little or no reduction in generalization error compared with the corresponding SVM.

The principal disadvantage of the RVM compared to the SVM is that training involves optimizing a nonconvex function, and training times can be longer than for a comparable SVM. For a model with M basis functions, the RVM requires inversion of a matrix of size $M \times M$ , which in general requires $O ( M ^ { 3 } )$ computation. In the specific case of the SVM-like model (7.78), we have $M = N + 1$ . As we have noted, there are techniques for training SVMs whose cost is roughly quadratic in N. Of course, in the case of the RVM we always have the option of starting with a smaller number of basis functions than $N + 1$ . More significantly, in the relevance vector machine the parameters governing complexity and noise variance are determined automatically from a single training run, whereas in the support vector machine the parameters $C$ and  (or ν) are generally found using cross-validation, which involves multiple training runs. Furthermore, in the next section we shall derive an alternative procedure for training the relevance vector machine that improves training speed significantly.
