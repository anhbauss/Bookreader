---
id: "tin-hieu-he-thong.exercises-14"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Sequential Data", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-3-4-particle-filters"
next_id: "tin-hieu-he-thong.combining-models"
block_ids: ["b6933", "b6934", "b6935", "b6936", "b6937", "b6938", "b6939", "b6940", "b6941", "b6942", "b6943", "b6944", "b6945", "b6946", "b6947", "b6948", "b6949", "b6950", "b6951", "b6952", "b6953", "b6954", "b6955", "b6956", "b6957", "b6958", "b6959", "b6960", "b6961", "b6962", "b6963", "b6964", "b6965", "b6966", "b6967", "b6968", "b6969", "b6970", "b6971", "b6972", "b6973", "b6974", "b6975", "b6976", "b6977", "b6978", "b6979", "b6980", "b6981"]
---

## Exercises

13.1 () www Use the technique of d-separation, discussed in Section 8.2, to verify that the Markov model shown in Figure 13.3 having N nodes in total satisfies the conditional independence properties (13.3) for $n = 2 , \ldots , N$ . Similarly, show that a model described by the graph in Figure 13.4 in which there are N nodes in total satisfies the conditional independence properties

![image](images/part-004--282e2d465b5c2aef3e722394a20e7b766643a9b424cffd94371f0d97c8f1745e.jpg)

Figure 13.23 Schematic illustration of the operation of the particle filter for a one-dimensional latent space. At time step $n ,$ the posterior $p ( z _ { n } | \mathbf { x } _ { n } )$ is represented as a mixture distribution, shown schematically as circles whose sizes are proportional to the weights $w _ { n } ^ { ( l ) }$ . A set of L samples is then drawn from this distribution and the new weights $w _ { n + 1 } ^ { ( l ) }$ evaluated using $p ( \mathbf { x } _ { n + 1 } | \mathbf { z } _ { n + 1 } ^ { ( l ) } )$

p (\mathbf {x} _ {n} | \mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}) = p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1}, \mathbf {x} _ {n - 2})\tag{13.122}

for $n = 3 , \ldots , N .$

13.2 ( ) Consider the joint probability distribution (13.2) corresponding to the directed graph of Figure 13.3. Using the sum and product rules of probability, verify that this joint distribution satisfies the conditional independence property (13.3) for $n =$ $2 , \ldots , N$ Similarly, show that the second-order Markov model described by the joint distribution (13.4) satisfies the conditional independence property

p (\mathbf {x} _ {n} | \mathbf {x} _ {1}, \dots , \mathbf {x} _ {n - 1}) = p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1}, \mathbf {x} _ {n - 2})\tag{13.123}

for $n = 3 , \ldots , N .$

13.3 () By using d-separation, show that the distribution $p ( \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } )$ of the observed data for the state space model represented by the directed graph in Figure 13.5 does not satisfy any conditional independence properties and hence does not exhibit the Markov property at any finite order.

13.4 ( ) www Consider a hidden Markov model in which the emission densities are represented by a parametric model $p ( \mathbf { x } | \mathbf { z } , \mathbf { w } )$ , such as a linear regression model or a neural network, in which w is a vector of adaptive parameters. Describe how the parameters w can be learned from data using maximum likelihood.

13.5 ( ) Verify the M-step equations (13.18) and (13.19) for the initial state probabilities and transition probability parameters of the hidden Markov model by maximization of the expected complete-data log likelihood function (13.17), using appropriate Lagrange multipliers to enforce the summation constraints on the components of π and A.

13.6 () Show that if any elements of the parameters π or A for a hidden Markov model are initially set to zero, then those elements will remain zero in all subsequent updates of the EM algorithm.

13.7 () Consider a hidden Markov model with Gaussian emission densities. Show that maximization of the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to the mean and covariance parameters of the Gaussians gives rise to the M-step equations (13.20) and (13.21).

13.8 ( ) www For a hidden Markov model having discrete observations governed by a multinomial distribution, show that the conditional distribution of the observations given the hidden variables is given by (13.22) and the corresponding M step equations are given by (13.23). Write down the analogous equations for the conditional distribution and the M step equations for the case of a hidden Markov with multiple binary output variables each of which is governed by a Bernoulli conditional distribution. Hint: refer to Sections 2.1 and 2.2 for a discussion of the corresponding maximum likelihood solutions for i.i.d. data if required.

13.9 ( ) www Use the d-separation criterion to verify that the conditional independence properties (13.24)–(13.31) are satisfied by the joint distribution for the hidden Markov model defined by (13.6).

13.10 (  ) By applying the sum and product rules of probability, verify that the conditional independence properties (13.24)–(13.31) are satisfied by the joint distribution for the hidden Markov model defined by (13.6).

13.11 ( ) Starting from the expression (8.72) for the marginal distribution over the variables of a factor in a factor graph, together with the results for the messages in the sum-product algorithm obtained in Section 13.2.3, derive the result (13.43) for the joint posterior distribution over two successive latent variables in a hidden Markov model.

13.12 ( ) Suppose we wish to train a hidden Markov model by maximum likelihood using data that comprises R independent sequences of observations, which we denote by $\mathbf { X } ^ { ( r ) }$ where $r = 1 , \ldots , R$ Show that in the E step of the EM algorithm, we simply evaluate posterior probabilities for the latent variables by running the α and $\beta$ recursions independently for each of the sequences. Also show that in the M step, the initial probability and transition probability parameters are re-estimated using modified forms of (13.18 ) and (13.19) given by

\begin{array}{r l r} \pi_ {k} & = & \frac {\sum_ {r = 1} ^ {R} \gamma (z _ {1 k} ^ {(r)})}{\sum_ {r = 1} ^ {R} \sum_ {j = 1} ^ {K} \gamma (z _ {1 j} ^ {(r)})} \\ A _ {j k} & = & \frac {\sum_ {r = 1} ^ {R} \sum_ {n = 2} ^ {N} \xi (z _ {n - 1 , j} ^ {(r)} , z _ {n , k} ^ {(r)})}{\sum_ {r = 1} ^ {R} \sum_ {l = 1} ^ {K} \sum_ {n = 2} ^ {N} \xi (z _ {n - 1 , j} ^ {(r)} , z _ {n , l} ^ {(r)})} \end{array}\tag{13.124}

(13.125)

where, for notational convenience, we have assumed that the sequences are of the same length (the generalization to sequences of different lengths is straightforward). Similarly, show that the M-step equation for re-estimation of the means of Gaussian emission models is given by

\boldsymbol {\mu} _ {k} = \frac {\sum_ {r = 1} ^ {R} \sum_ {n = 1} ^ {N} \gamma (z _ {n k} ^ {(r)}) \mathbf {x} _ {n} ^ {(r)}}{\sum_ {r = 1} ^ {R} \sum_ {n = 1} ^ {N} \gamma (z _ {n k} ^ {(r)})}.\tag{13.126}

Note that the M-step equations for other emission model parameters and distributions take an analogous form.

13.13 ( ) www Use the definition (8.64) of the messages passed from a factor node to a variable node in a factor graph, together with the expression (13.6) for the joint distribution in a hidden Markov model, to show that the definition (13.50) of the alpha message is the same as the definition (13.34).

13.14 ( ) Use the definition (8.67) of the messages passed from a factor node to a variable node in a factor graph, together with the expression (13.6) for the joint distribution in a hidden Markov model, to show that the definition (13.52) of the beta message is the same as the definition (13.35).

13.15 ( ) Use the expressions (13.33) and (13.43) for the marginals in a hidden Markov model to derive the corresponding results (13.64) and (13.65) expressed in terms of re-scaled variables.

13.16 (  ) In this exercise, we derive the forward message passing equation for the Viterbi algorithm directly from the expression (13.6) for the joint distribution. This involves maximizing over all of the hidden variables $\mathbf { z } _ { 1 } , \ldots , \mathbf { z } _ { N }$ . By taking the logarithm and then exchanging maximizations and summations, derive the recursion (13.68) where the quantities $\omega ( \mathbf { z } _ { n } )$ are defined by (13.70). Show that the initial condition for this recursion is given by (13.69).

13.17 () www Show that the directed graph for the input-output hidden Markov model, given in Figure 13.18, can be expressed as a tree-structured factor graph of the form shown in Figure 13.15 and write down expressions for the initial factor $h ( \mathbf { z } _ { 1 } )$ and for the general factor $f _ { n } ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ where ${ \bar { 2 } } \leqslant n \leqslant N$

13.18 (  ) Using the result of Exercise 13.17, derive the recursion equations, including the initial conditions, for the forward-backward algorithm for the input-output hidden Markov model shown in Figure 13.18.

13.19 () www The Kalman filter and smoother equations allow the posterior distributions over individual latent variables, conditioned on all of the observed variables, to be found efficiently for linear dynamical systems. Show that the sequence of latent variable values obtained by maximizing each of these posterior distributions individually is the same as the most probable sequence of latent values. To do this, simply note that the joint distribution of all latent and observed variables in a linear dynamical system is Gaussian, and hence all conditionals and marginals will also be Gaussian, and then make use of the result (2.98).

13.20 ( ) www Use the result (2.115) to prove (13.87).

13.21 ( ) Use the results (2.115) and (2.116), together with the matrix identities (C.5) and (C.7), to derive the results (13.89), (13.90), and (13.91), where the Kalman gain matrix ${ \bf K } _ { n }$ is defined by (13.92).

13.22 ( ) www Using (13.93), together with the definitions (13.76) and (13.77) and the result (2.115), derive (13.96).

13.23 ( ) Using (13.93), together with the definitions (13.76) and (13.77) and the result (2.116), derive (13.94), (13.95) and (13.97).

13.24 ( ) www Consider a generalization of (13.75) and (13.76) in which we include constant terms and in the Gaussian means, so that

p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) = \mathcal {N} (\mathbf {z} _ {n} | \mathbf {A z} _ {n - 1} + \mathbf {a}, \boldsymbol {\Gamma})\tag{13.127}

p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) = \mathcal {N} (\mathbf {x} _ {n} | \mathbf {C z} _ {n} + \mathbf {c}, \boldsymbol {\Sigma}).\tag{13.128}

Show that this extension can be re-case in the framework discussed in this chapter by defining a state vector z with an additional component fixed at unity, and then augmenting the matrices A and C using extra columns corresponding to the parameters a and c.

13.25 ( ) In this exercise, we show that when the Kalman filter equations are applied to independent observations, they reduce to the results given in Section 2.3 for the maximum likelihood solution for a single Gaussian distribution. Consider the problem of finding the mean $\mu$ of a single Gaussian random variable x, in which we are given a set of independent observations $\{ x _ { 1 } , \ldots , x _ { N } \}$ . To model this we can use a linear dynamical system governed by (13.75) and (13.76), with latent variables $\{ z _ { 1 } , \dots , z _ { N } \}$ in which C becomes the identity matrix and where the transition probability $\mathrm { ~ \bf ~ A ~ } = \mathrm { ~ \bf ~ 0 ~ }$ because the observations are independent. Let the parameters m<sub>0</sub> and $\mathbf { V } _ { 0 }$ of the initial state be denoted by $\mu _ { 0 }$ and $\dot { \sigma } _ { 0 } ^ { 2 }$ , respectively, and suppose that Σ becomes $\sigma ^ { 2 }$ . Write down the corresponding Kalman filter equations starting from the general results (13.89) and (13.90), together with (13.94) and (13.95). Show that these are equivalent to the results (2.141) and (2.142) obtained directly by considering independent data.

13.26 (  ) Consider a special case of the linear dynamical system of Section 13.3 that is equivalent to probabilistic PCA, so that the transition matrix $\mathbf A = \mathbf 0$ , the covariance $\mathbf { T } = \mathbf { I }$ , and the noise covariance $\pmb { \Sigma } = \sigma ^ { 2 } \mathbf { I }$ . By making use of the matrix inversion identity (C.7) show that, if the emission density matrix C is denoted W, then the posterior distribution over the hidden states defined by (13.89) and (13.90) reduces to the result (12.42) for probabilistic PCA.

13.27 () www Consider a linear dynamical system of the form discussed in Section 13.3 in which the amplitude of the observation noise goes to zero, so that $\mathbf { \delta E = 0 }$ Show that the posterior distribution for $\mathbf { z } _ { n }$ has mean ${ \bf x } _ { n }$ and zero variance. This accords with our intuition that if there is no noise, we should just use the current observation ${ \bf x } _ { n }$ to estimate the state variable $\mathbf { z } _ { n }$ and ignore all previous observations.

13.28 (  ) Consider a special case of the linear dynamical system of Section 13.3 in which the state variable $\mathbf { z } _ { n }$ is constrained to be equal to the previous state variable, which corresponds to $\mathbf { A } = \mathbf { I } \operatorname { a n d } \mathbf { \Gamma } \mathbf { \Gamma } = \mathbf { 0 }$ . For simplicity, assume also that ${ \bf V } _ { 0 } \to \infty$ so that the initial conditions for z are unimportant, and the predictions are determined purely by the data. Use proof by induction to show that the posterior mean for state $\mathbf { z } _ { n }$ is determined by the average of $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n }$ This corresponds to the intuitive result that if the state variable is constant, our best estimate is obtained by averaging the observations.

13.29 (  ) Starting from the backwards recursion equation (13.99), derive the RTS smoothing equations (13.100) and (13.101) for the Gaussian linear dynamical system.

13.30 ( ) Starting from the result (13.65) for the pairwise posterior marginal in a state space model, derive the specific form (13.103) for the case of the Gaussian linear dynamical system.

13.31 ( ) Starting from the result (13.103) and by substituting for $\widehat { \alpha } ( \mathbf { z } _ { n } )$ using (13.84), verify the result (13.104) for the covariance between $\mathbf { z } _ { n }$ and $\mathbf { z } _ { n - 1 }$

13.32 ( ) www Verify the results (13.110) and (13.111) for the M-step equations for $\pmb { \mu } _ { 0 }$ and $\mathbf { V } _ { 0 }$ in the linear dynamical system.

13.33 ( ) Verify the results (13.113) and (13.114) for the M-step equations for A and Γ in the linear dynamical system.

13.34 ( ) Verify the results (13.115) and (13.116) for the M-step equations for C and Σ in the linear dynamical system.
