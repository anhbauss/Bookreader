---
id: "tin-hieu-he-thong.13-3-1-inference-in-lds"
doc_id: "tin-hieu-he-thong"
title: "13.3.1 Inference in LDS"
level: 2
heading_path: ["Sequential Data", "13.3.1 Inference in LDS"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-3-linear-dynamical-systems"
next_id: "tin-hieu-he-thong.13-3-2-learning-in-lds"
block_ids: ["b6825", "b6826", "b6827", "b6828", "b6829", "b6830", "b6831", "b6832", "b6833", "b6834", "b6835", "b6836", "b6837", "b6838", "b6839", "b6840", "b6841", "b6842", "b6843", "b6844", "b6845", "b6846", "b6847", "b6848", "b6849", "b6850", "b6851", "b6852", "b6853", "b6854", "b6855", "b6856", "b6857", "b6858", "b6859", "b6860", "b6861", "b6862", "b6863", "b6864", "b6865", "b6866", "b6867", "b6868", "b6869", "b6870", "b6871", "b6872", "b6873", "b6874", "b6875", "b6876", "b6877", "b6878", "b6879", "b6880"]
---

## 13.3.1 Inference in LDS

We now turn to the problem of finding the marginal distributions for the latent variables conditional on the observation sequence. For given parameter settings, we also wish to make predictions of the next latent state $\mathbf { z } _ { n }$ and of the next observation ${ \bf x } _ { n }$ conditioned on the observed data $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 }$ for use in real-time applications. These inference problems can be solved efficiently using the sum-product algorithm, which in the context of the linear dynamical system gives rise to the Kalman filter and Kalman smoother equations.

It is worth emphasizing that because the linear dynamical system is a linear-Gaussian model, the joint distribution over all latent and observed variables is simply a Gaussian, and so in principle we could solve inference problems by using the standard results derived in previous chapters for the marginals and conditionals of a multivariate Gaussian. The role of the sum-product algorithm is to provide a more efficient way to perform such computations.

Linear dynamical systems have the identical factorization, given by (13.6), to hidden Markov models, and are again described by the factor graphs in Figures 13.14 and 13.15. Inference algorithms therefore take precisely the same form except that summations over latent variables are replaced by integrations. We begin by considering the forward equations in which we treat $\mathbf { z } _ { N }$ as the root node, and propagate messages from the leaf node $h ( \mathbf { z } _ { 1 } )$ to the root. From (13.77), the initial message will be Gaussian, and because each of the factors is Gaussian, all subsequent messages will also be Gaussian. By convention, we shall propagate messages that are normalized marginal distributions corresponding to $p ( \mathbf { z } _ { n } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n } )$ , which we denote by

\widehat {\alpha} (\mathbf {z} _ {n}) = \mathcal {N} (\mathbf {z} _ {n} | \boldsymbol {\mu} _ {n}, \mathbf {V} _ {n}).\tag{13.84}

This is precisely analogous to the propagation of scaled variables $\widehat { \alpha } ( \mathbf { z } _ { n } )$ given by (13.59) in the discrete case of the hidden Markov model, and so the recursion equation now takes the form

c _ {n} \widehat {\alpha} (\mathbf {z} _ {n}) = p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \int \widehat {\alpha} (\mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) \mathrm{d} \mathbf {z} _ {n - 1}.\tag{13.85}

Substituting for the conditionals $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ and $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ , using (13.75) and (13.76), respectively, and making use of (13.84), we see that (13.85) becomes

\begin{array}{l} c _ {n} \mathcal {N} (\mathbf {z} _ {n} | \boldsymbol {\mu} _ {n}, \mathbf {V} _ {n}) = \mathcal {N} (\mathbf {x} _ {n} | \mathbf {C z} _ {n}, \boldsymbol {\Sigma}) \\ \int \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A z} _ {n - 1}, \boldsymbol {\Gamma}) \mathcal {N} (\mathbf {z} _ {n - 1} | \boldsymbol {\mu} _ {n - 1}, \mathbf {V} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n - 1}. \end{array}\tag{13.86}

Here we are supposing that $\pmb { \mu } _ { n - 1 }$ and ${ \bf V } _ { n - 1 }$ are known, and by evaluating the integral in (13.86), we wish to determine values for $\pmb { \mu } _ { n }$ and $\mathbf { V } _ { n }$ . The integral is easily evaluated by making use of the result (2.115), from which it follows that

\begin{array}{c} \int \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A} \mathbf {z} _ {n - 1}, \boldsymbol {\Gamma}) \mathcal {N} (\mathbf {z} _ {n - 1} | \boldsymbol {\mu} _ {n - 1}, \mathbf {V} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n - 1} \\ = \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A} \boldsymbol {\mu} _ {n - 1}, \mathbf {P} _ {n - 1}) \end{array}\tag{13.87}

where we have defined

\mathbf {P} _ {n - 1} = \mathbf {A V} _ {n - 1} \mathbf {A} ^ {\mathrm{T}} + \boldsymbol {\Gamma}.\tag{13.88}

We can now combine this result with the first factor on the right-hand side of (13.86) by making use of (2.115) and (2.116) to give

{\boldsymbol {\mu} _ {n}} = {\mathbf {A} \boldsymbol {\mu} _ {n - 1} + \mathbf {K} _ {n} (\mathbf {x} _ {n} - \mathbf {C A} \boldsymbol {\mu} _ {n - 1})}\tag{13.89}

{\mathbf {V} _ {n}} = {(\mathbf {I} - \mathbf {K} _ {n} \mathbf {C}) \mathbf {P} _ {n - 1}}\tag{13.90}

{c _ {n}} = {\mathcal {N} (\mathbf {x} _ {n} | \mathbf {C A} \pmb {\mu} _ {n - 1}, \mathbf {C P} _ {n - 1} \mathbf {C} ^ {\mathrm{T}} + \pmb {\Sigma}).}\tag{13.91}

Here we have made use of the matrix inverse identities (C.5) and (C.7) and also defined the Kalman gain matrix

\mathbf {K} _ {n} = \mathbf {P} _ {n - 1} \mathbf {C} ^ {\mathrm{T}} \left(\mathbf {C P} _ {n - 1} \mathbf {C} ^ {\mathrm{T}} + \boldsymbol {\Sigma}\right) ^ {- 1}.\tag{13.92}

Thus, given the values of $\pmb { \mu } _ { n - 1 }$ and ${ \bf V } _ { n - 1 }$ , together with the new observation $\mathbf { x } _ { n } .$ we can evaluate the Gaussian marginal for $\mathbf { z } _ { n }$ having mean $\pmb { \mu } _ { n }$ and covariance $\mathbf { V } _ { n }$ as well as the normalization coefficient $c _ { n }$ .

The initial conditions for these recursion equations are obtained from

c _ {1} \widehat {\alpha} (\mathbf {z} _ {1}) = p (\mathbf {z} _ {1}) p (\mathbf {x} _ {1} | \mathbf {z} _ {1}).\tag{13.93}

Because $p ( \mathbf { z } _ { 1 } )$ is given by (13.77), and $p ( \mathbf { x } _ { 1 } | \mathbf { z } _ { 1 } )$ is given by (13.76), we can again make use of (2.115) to calculate $c _ { 1 }$ and (2.116) to calculate $\pmb { \mu } _ { 1 }$ and $\mathbf { V } _ { 1 }$ giving

\boldsymbol {\mu} _ {1} = \boldsymbol {\mu} _ {0} + \mathbf {K} _ {1} (\mathbf {x} _ {1} - \mathbf {C} \boldsymbol {\mu} _ {0})\tag{13.94}

\mathbf {V} _ {1} = (\mathbf {I} - \mathbf {K} _ {1} \mathbf {C}) \mathbf {V} _ {0}\tag{13.95}

{c _ {1}} = {\mathcal {N} (\mathbf {x} _ {1} | \mathbf {C} \pmb {\mu} _ {0}, \mathbf {C V} _ {0} \mathbf {C} ^ {\mathrm{T}} + \pmb {\Sigma})}\tag{13.96}

where

\mathbf {K} _ {1} = \mathbf {V} _ {0} \mathbf {C} ^ {\mathrm{T}} \left(\mathbf {C V} _ {0} \mathbf {C} ^ {\mathrm{T}} + \boldsymbol {\Sigma}\right) ^ {- 1}.\tag{13.97}

Similarly, the likelihood function for the linear dynamical system is given by (13.63) in which the factors $c _ { n }$ are found using the Kalman filtering equations.

We can interpret the steps involved in going from the posterior marginal over $\mathbf { z } _ { n - 1 }$ to the posterior marginal over $\mathbf { z } _ { n }$ as follows. In (13.89), we can view the quantity $\mathbf { A } { \boldsymbol { \mu } } _ { n - 1 }$ as the prediction of the mean over $\mathbf { z } _ { n }$ obtained by simply taking the mean over $\mathbf { z } _ { n - 1 }$ and projecting it forward one step using the transition probability matrix A. This predicted mean would give a predicted observation for ${ \bf x } _ { n }$ given by $\mathbf { C A z } _ { n - 1 }$ obtained by applying the emission probability matrix C to the predicted hidden state mean. We can view the update equation (13.89) for the mean of the hidden variable distribution as taking the predicted mean $\mathbf { A } { \boldsymbol { \mu } } _ { n - 1 }$ and then adding a correction that is proportional to the error ${ \bf x } _ { n } - { \bf C } { \bf A } { \bf z } _ { n - 1 }$ between the predicted observation and the actual observation. The coefficient of this correction is given by the Kalman gain matrix. Thus we can view the Kalman filter as a process of making successive predictions and then correcting these predictions in the light of the new observations. This is illustrated graphically in Figure 13.21.

![image](images/part-004--e13df6f58857ed98f1f0d254f8ee50f72c27d5503e3a633a7c5e72b37c043210.jpg)

Figure 13.21 The linear dynamical system can be viewed as a sequence of steps in which increasing un certainty in the state variable due to diffusion is compensated by the arrival of new data. In the left-hand plot, the blue curve shows the distribution $p ( \mathbf { z } _ { n - 1 } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 } )$ , which incorporates all the data up to step $n - 1$ The diffusion arising from the nonzero variance of the transition probability $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ gives the distribution $p ( \mathbf { z } _ { n } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 } )$ , shown in red in the centre plot. Note that this is broader and shifted relative to the blue curve (which is shown dashed in the centre plot for comparison). The next data observation ${ \bf x } _ { n }$ contributes through the emission density $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ , which is shown as a function of $\mathbf { z } _ { n }$ in green on the right-hand plot. Note that this is not a density with respect to $\mathbf { z } _ { n }$ and so is not normalized to one. Inclusion of this new data point leads to a revised distribution $p ( \mathbf { z } _ { n } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n } )$ for the state density shown in blue. We see that observation of the data has shifted and narrowed the distribution compared to $p ( \mathbf { z } _ { n } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 } )$ (which is shown in dashed in the right-hand plot for comparison).

If we consider a situation in which the measurement noise is small compared to the rate at which the latent variable is evolving, then we find that the posterior distribution for $\mathbf { z } _ { n }$ depends only on the current measurement ${ \bf x } _ { n }$ , in accordance with the intuition from our simple example at the start of the section. Similarly, if the latent variable is evolving slowly relative to the observation noise level, we find that the posterior mean for $\mathbf { z } _ { n }$ is obtained by averaging all of the measurements obtained up to that time.

Exercise 13.27

Exercise 13.28

One of the most important applications of the Kalman filter is to tracking, and this is illustrated using a simple example of an object moving in two dimensions in Figure 13.22.

So far, we have solved the inference problem of finding the posterior marginal for a node $\mathbf { z } _ { n }$ given observations from $\mathbf { x } _ { 1 }$ up to ${ \bf x } _ { n }$ . Next we turn to the problem of finding the marginal for a node $\mathbf { z } _ { n }$ given all observations $\mathbf { x } _ { 1 }$ to $\mathbf { x } _ { N }$ . For temporal data, this corresponds to the inclusion of future as well as past observations. Although this cannot be used for real-time prediction, it plays a key role in learning the parameters of the model. By analogy with the hidden Markov model, this problem can be solved by propagating messages from node $\mathbf { x } _ { N }$ back to node $\mathbf { x } _ { 1 }$ and combining this information with that obtained during the forward message passing stage used to compute the $\widehat { \alpha } ( \mathbf { z } _ { n } )$

In the LDS literature, it is usual to formulate this backward recursion in terms of $\widetilde { \gamma } ( \mathbf { z } _ { n } ) = \widehat { \alpha } ( \mathbf { z } _ { n } ) \widehat { \beta } ( \mathbf { z } _ { n } )$ rather than in terms of $\widehat { \beta } ( \mathbf { z } _ { n } )$ . Because $\gamma ( \mathbf { z } _ { n } )$ must also be Gaussian, we write it in the form

\gamma (\mathbf {z} _ {n}) = \widehat {\alpha} (\mathbf {z} _ {n}) \widehat {\beta} (\mathbf {z} _ {n}) = \mathcal {N} (\mathbf {z} _ {n} | \widehat {\boldsymbol {\mu}} _ {n}, \widehat {\mathbf {V}} _ {n}).\tag{13.98}

To derive the required recursion, we start from the backward recursion (13.62) for

An illustration of a linear dynamical system being used to track a moving object. The blue points indicate the true positions of the object in a two-dimensional space at successive time steps, the green points denote noisy measurements of the positions, and the red crosses indicate the means of the inferred posterior distributions of the positions obtained by running the Kalman filtering equations. The covariances of the inferred positions are indicated by the red ellipses, which correspond to contours having one standard deviation.

![image](images/part-004--b4d49f19411074b338e0ffb58484624950e293f6660f33cc893cb9809dd16c26.jpg)

${ \widehat { \boldsymbol { \beta } } } ( \mathbf { z } _ { n } )$ , which, for continuous latent variables, can be written in the form

c _ {n + 1} \widehat {\beta} (\mathbf {z} _ {n}) = \int \widehat {\beta} (\mathbf {z} _ {n + 1}) p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) \mathrm{d} \mathbf {z} _ {n + 1}.\tag{13.99}

We now multiply both sides of (13.99) by $\widehat { \alpha } ( \mathbf { z } _ { n } )$ and substitute for $p ( \mathbf { x } _ { n + 1 } | \mathbf { z } _ { n + 1 } )$ and $p ( \mathbf { z } _ { n + 1 } | \mathbf { z } _ { n } )$ using (13.75) and (13.76). Then we make use of (13.89), (13.90) and (13.91), together with (13.98), and after some manipulation we obtain

Exercise 13.29

\widehat {\boldsymbol {\mu}} _ {n} = \boldsymbol {\mu} _ {n} + \mathbf {J} _ {n} \left(\widehat {\boldsymbol {\mu}} _ {n + 1} - \mathbf {A} \boldsymbol {\mu} _ {N}\right)\tag{13.100}

\widehat {\mathbf {V}} _ {n} = \mathbf {V} _ {n} + \mathbf {J} _ {n} \left(\widehat {\mathbf {V}} _ {n + 1} - \mathbf {P} _ {n}\right) \mathbf {J} _ {n} ^ {\mathrm{T}}\tag{13.101}

where we have defined

\mathbf {J} _ {n} = \mathbf {V} _ {n} \mathbf {A} ^ {\mathrm{T}} (\mathbf {P} _ {n}) ^ {- 1}\tag{13.102}

and we have made use of $\mathbf { A V } _ { n } = \mathbf { P } _ { n } \mathbf { J } _ { n } ^ { \mathrm { T } }$ . Note that these recursions require that the forward pass be completed first so that the quantities $\pmb { \mu } _ { n }$ and $\mathbf { V } _ { n }$ will be available for the backward pass.

For the EM algorithm, we also require the pairwise posterior marginals, which can be obtained from (13.65) in the form

\begin{array}{r l} & {\xi (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) = (c _ {n}) ^ {- 1} \widehat {\alpha} (\mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {z} _ {- 1}) \widehat {\beta} (\mathbf {z} _ {n})} \\ & {\quad = \frac {\mathcal {N} (\mathbf {z} _ {n - 1} | \boldsymbol {\mu} _ {n - 1} , \mathbf {V} _ {n - 1}) \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A z} _ {n - 1} , \boldsymbol {\Gamma}) \mathcal {N} (\mathbf {x} _ {n} | \mathbf {C z} _ {n} , \boldsymbol {\Sigma}) \mathcal {N} (\mathbf {z} _ {n} | \widehat {\boldsymbol {\mu}} _ {n} , \widehat {\mathbf {V}} _ {n})}{c _ {n} \widehat {\alpha} (\mathbf {z} _ {n})}} \end{array}\tag{13.103}

Substituting for $\widehat { \alpha } ( \mathbf { z } _ { n } )$ using (13.84) and rearranging, we see that $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ is a Gaussian with mean given with components $\gamma ( \mathbf { z } _ { n - 1 } )$ and $\gamma ( \mathbf { z } _ { n } )$ , and a covariance between $\mathbf { z } _ { n }$ and $\mathbf { z } _ { n - 1 }$ given by

Exercise 13.31

\operatorname{cov} \left[ \mathbf {z} _ {n}, \mathbf {z} _ {n - 1} \right] = \mathbf {J} _ {n - 1} \widehat {\mathbf {V}} _ {n}.\tag{13.104}
