---
id: "tin-hieu-he-thong.14-5-1-mixtures-of-linear-regression-models"
doc_id: "tin-hieu-he-thong"
title: "14.5.1 Mixtures of linear regression models"
level: 2
heading_path: ["Combining Models", "14.5.1 Mixtures of linear regression models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-5-conditional-mixture-models"
next_id: "tin-hieu-he-thong.14-5-2-mixtures-of-logistic-models"
block_ids: ["b7114", "b7115", "b7116", "b7117", "b7118", "b7119", "b7120", "b7121", "b7122", "b7123", "b7124", "b7125", "b7126", "b7127", "b7128", "b7129", "b7130", "b7131", "b7132", "b7133", "b7134", "b7135", "b7136", "b7137", "b7138", "b7139", "b7140", "b7141", "b7142", "b7143", "b7144", "b7145", "b7146", "b7147", "b7148", "b7149", "b7150", "b7151", "b7152", "b7153", "b7154"]
---

## 14.5.1 Mixtures of linear regression models

One of the many advantages of giving a probabilistic interpretation to the linear regression model is that it can then be used as a component in more complex probabilistic models. This can be done, for instance, by viewing the conditional distribution representing the linear regression model as a node in a directed probabilistic graph. Here we consider a simple example corresponding to a mixture of linear regression models, which represents a straightforward extension of the Gaussian mixture model discussed in Section 9.2 to the case of conditional Gaussian distributions.

We therefore consider K linear regression models, each governed by its own weight parameter ${ \bf w } _ { k }$ . In many applications, it will be appropriate to use a common noise variance, governed by a precision parameter $\beta ,$ for all K components, and this is the case we consider here. We will once again restrict attention to a single target variable t, though the extension to multiple outputs is straightforward. If we denote the mixing coefficients by $\pi _ { k }$ , then the mixture distribution can be written

p (t | \pmb {\theta}) = \sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (t | \mathbf {w} _ {k} ^ {\mathrm{T}} \phi , \beta^ {- 1})\tag{14.34}

where $\pmb \theta$ denotes the set of all adaptive parameters in the model, namely $\mathbf { W } = \{ \mathbf { w } _ { k } \}$ $\pi = \left\{ \pi _ { k } \right\}$ , and $\beta .$ The log likelihood function for this model, given a data set of observations $\{ \phi _ { n } , t _ { n } \}$ , then takes the form

\ln p (\mathbf {t} | \boldsymbol {\theta}) = \sum_ {n = 1} ^ {N} \ln \left(\sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (t _ {n} | \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}, \beta^ {- 1})\right)\tag{14.35}

where ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ denotes the vector of target variables.

In order to maximize this likelihood function, we can once again appeal to the EM algorithm, which will turn out to be a simple extension of the EM algorithm for unconditional Gaussian mixtures of Section 9.2. We can therefore build on our experience with the unconditional mixture and introduce a set ${ \bf Z } = \{ { \bf z } _ { n } \}$ of binary latent variables where $z _ { n k } \in \{ 0 , 1 \}$ in which, for each data point $n _ { \mathrm { : } }$ all of the elements $k = 1 , \ldots , K$ are zero except for a single value of 1 indicating which component of the mixture was responsible for generating that data point. The joint distribution over latent and observed variables can be represented by the graphical model shown in Figure 14.7.

The complete-data log likelihood function then takes the form

\ln p (\mathbf {t}, \mathbf {Z} | \pmb {\theta}) = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} z _ {n k} \ln \left\{\pi_ {k} \mathcal {N} (t _ {n} | \mathbf {w} _ {k} ^ {\mathrm{T}} \phi_ {n}, \beta^ {- 1}) \right\}.\tag{14.36}

Figure 14.7 Probabilistic directed graph representing a mixture of linear regression models, defined by (14.35).

![image](images/part-004--021d7175dc261d6e2e766f95f8bfc5d1c9c88b1f55a538d476648602591d502e.jpg)

The EM algorithm begins by first choosing an initial value $\theta ^ { \mathrm { o l d } }$ for the model parameters. In the E step, these parameter values are then used to evaluate the posterior probabilities, or responsibilities, of each component k for every data point n given by

\gamma_ {n k} = \mathbb {E} [ z _ {n k} ] = p (k | \boldsymbol {\phi} _ {n}, \boldsymbol {\theta} ^ {\mathrm{old}}) = \frac {\pi_ {k} \mathcal {N} (t _ {n} | \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} , \beta^ {- 1})}{\sum_ {j} \pi_ {j} \mathcal {N} (t _ {n} | \mathbf {w} _ {j} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} , \beta^ {- 1})}.\tag{14.37}

The responsibilities are then used to determine the expectation, with respect to the posterior distribution $p ( \mathbf { Z } | \mathbf { t } , \theta ^ { \mathrm { o l d } } )$ , of the complete-data log likelihood, which takes the form

Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\mathrm{old}}) = \mathbb {E} _ {\mathbf {Z}} \left[ \ln p (\mathbf {t}, \mathbf {Z} | \boldsymbol {\theta}) \right] = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma_ {n k} \left\{\ln \pi_ {k} + \ln \mathcal {N} (t _ {n} | \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}, \beta^ {- 1}) \right\}.

In the M step, we maximize the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to $\theta _ { ; }$ , keeping the $\gamma _ { n k }$ fixed. For the optimization with respect to the mixing coefficients $\pi _ { k }$ we need to take account of the constraint $\begin{array} { r } { \sum _ { k } \pi _ { k } = 1 } \end{array}$ , which can be done with the aid of a Lagrange multiplier, leading to an M-step re-estimation equation for $\pi _ { k }$ in the form

Exercise 14.14

\pi_ {k} = \frac {1}{N} \sum_ {n = 1} ^ {N} \gamma_ {n k}.\tag{14.38}

Note that this has exactly the same form as the corresponding result for a simple mixture of unconditional Gaussians given by (9.22).

Next consider the maximization with respect to the parameter vector $\mathbf { w } _ { k }$ of the $k ^ { \mathrm { t h } }$ linear regression model. Substituting for the Gaussian distribution, we see that the function $\mathbf { \widetilde { \mathbf { \Gamma } } } Q ( \theta , \theta ^ { \mathrm { o l d } } )$ , as a function of the parameter vector ${ \bf w } _ { k }$ , takes the form

Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = \sum_ {n = 1} ^ {N} \gamma_ {n k} \left\{- \frac {\beta}{2} \left(t _ {n} - \mathbf {w} _ {k} ^ {\mathrm{T}} \phi_ {n}\right) ^ {2} \right\} + \mathrm{const}\tag{14.39}

where the constant term includes the contributions from other weight vectors $\mathbf { w } _ { j }$ for $j \neq k$ . Note that the quantity we are maximizing is similar to the (negative of the) standard sum-of-squares error (3.12) for a single linear regression model, but with the inclusion of the responsibilities $\gamma _ { n k }$ . This represents a weighted least squares problem, in which the term corresponding to the $n ^ { \mathrm { t h } }$ data point carries a weighting coefficient given by $\beta \gamma _ { n k }$ , which could be interpreted as an effective precision for each data point. We see that each component linear regression model in the mixture, governed by its own parameter vector $\mathbf { w } _ { k }$ , is fitted separately to the whole data set in the M step, but with each data point n weighted by the responsibility $\gamma _ { n k }$ that model k takes for that data point. Setting the derivative of (14.39) with respect to ${ \bf w } _ { k }$ equal to zero gives

0 = \sum_ {n = 1} ^ {N} \gamma_ {n k} \left(t _ {n} - \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}\right) \boldsymbol {\phi} _ {n}\tag{14.40}

which we can write in matrix notation as

0 = \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} _ {k} (\mathbf {t} - \boldsymbol {\Phi} \mathbf {w} _ {k})\tag{14.41}

where $\mathbf { R } _ { k } = \mathrm { d i a g } ( \gamma _ { n k } )$ is a diagonal matrix of size $N \times N$ . Solving for ${ \bf w } _ { k }$ , we obtain

\mathbf {w} _ {k} = \left(\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} _ {k} \boldsymbol {\Phi}\right) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} _ {k} \mathbf {t}.\tag{14.42}

This represents a set of modified normal equations corresponding to the weighted least squares problem, of the same form as (4.99) found in the context of logistic regression. Note that after each E step, the matrix ${ \bf R } _ { k }$ will change and so we will have to solve the normal equations afresh in the subsequent M step.

Finally, we maximize $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to $\beta .$ . Keeping only terms that depend on $\beta _ { : }$ , the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ can be written

Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma_ {n k} \left\{\frac {1}{2} \ln \beta - \frac {\beta}{2} \left(t _ {n} - \mathbf {w} _ {k} ^ {\mathrm{T}} \phi_ {n}\right) ^ {2} \right\}.\tag{14.43}

Setting the derivative with respect to $\beta$ equal to zero, and rearranging, we obtain the M-step equation for $\beta$ in the form

\frac {1}{\beta} = \frac {1}{N} \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma_ {n k} \left(t _ {n} - \mathbf {w} _ {k} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n}\right) ^ {2}.\tag{14.44}

In Figure 14.8, we illustrate this EM algorithm using the simple example of fitting a mixture of two straight lines to a data set having one input variable x and one target variable t. The predictive density (14.34) is plotted in Figure 14.9 using the converged parameter values obtained from the EM algorithm, corresponding to the right-hand plot in Figure 14.8. Also shown in this figure is the result of fitting a single linear regression model, which gives a unimodal predictive density. We see that the mixture model gives a much better representation of the data distribution, and this is reflected in the higher likelihood value. However, the mixture model also assigns significant probability mass to regions where there is no data because its predictive distribution is bimodal for all values of x. This problem can be resolved by extending the model to allow the mixture coefficients themselves to be functions of x, leading to models such as the mixture density networks discussed in Section 5.6, and hierarchical mixture of experts discussed in Section 14.5.3.

![image](images/part-004--2179035191a5170ec0fd3a03addaa62c8ff0c3bdafedcc3b24a66ab9e4a6bb6e.jpg)

![image](images/part-004--4ea0e69b21f4bf28d3ac7090e930b0dc35b1e159fe24c1b72be24bd6ec9cd36b.jpg)

![image](images/part-004--6914717d1cbbad4f0044926c3f87dd0f4c6433424a7294db6d029bbc1284ebaf.jpg)

![image](images/part-004--2c76c59fecc94de2ee8d30573f83daf801c866ab7a773370b1c118e9d776b15b.jpg)

![image](images/part-004--40f53d1d18351d06197c268cad1a178baad61d968d104c715f96e434988abc1a.jpg)

![image](images/part-004--800c4284ceb85c7ab0241917caabfe3c368e87c0d71b5cbec12ee3e384f921f9.jpg)

Figure 14.8 Example of a synthetic data set, shown by the green points, having one input variable x and one target variable t, together with a mixture of two linear regression models whose mean functions $y ( x , \mathbf { w } _ { k } )$ , where $k \in \{ 1 , 2 \}$ , are shown by the blue and red lines. The upper three plots show the initial configuration (left), the result of running 30 iterations of EM (centre), and the result after 50 iterations of EM (right). Here $\beta$ was initialized to the reciprocal of the true variance of the set of target values. The lower three plots show the corresponding responsibilities plotted as a vertical line for each data point in which the length of the blue segment gives the posterior probability of the blue line for that data point (and similarly for the red segment).
