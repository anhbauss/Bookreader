---
id: "tin-hieu-he-thong.13-2-1-maximum-likelihood-for-the-hmm"
doc_id: "tin-hieu-he-thong"
title: "13.2.1 Maximum likelihood for the HMM"
level: 2
heading_path: ["Sequential Data", "13.2.1 Maximum likelihood for the HMM"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-2-hidden-markov-models"
next_id: "tin-hieu-he-thong.13-2-2-the-forward-backward-algorithm"
block_ids: ["b6604", "b6605", "b6606", "b6607", "b6608", "b6609", "b6610", "b6611", "b6612", "b6613", "b6614", "b6615", "b6616", "b6617", "b6618", "b6619", "b6620", "b6621", "b6622", "b6623", "b6624", "b6625", "b6626", "b6627", "b6628", "b6629", "b6630", "b6631", "b6632", "b6633", "b6634", "b6635", "b6636", "b6637"]
---

## 13.2.1 Maximum likelihood for the HMM

If we have observed a data set $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ , we can determine the parameters of an HMM using maximum likelihood. The likelihood function is obtained from the joint distribution (13.10) by marginalizing over the latent variables

p (\mathbf {X} | \boldsymbol {\theta}) = \sum_ {\mathbf {Z}} p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}).\tag{13.11}

Because the joint distribution $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ does not factorize over n (in contrast to the mixture distribution considered in Chapter 9), we cannot simply treat each of the summations over $\mathbf { z } _ { n }$ independently. Nor can we perform the summations explicitly because there are N variables to be summed over, each of which has K states, resulting in a total of $K ^ { N }$ terms. Thus the number of terms in the summation grows exponentially with the length of the chain. In fact, the summation in (13.11) corresponds to summing over exponentially many paths through the lattice diagram in Figure 13.7.

We have already encountered a similar difficulty when we considered the inference problem for the simple chain of variables in Figure 8.32. There we were able to make use of the conditional independence properties of the graph to re-order the summations in order to obtain an algorithm whose cost scales linearly, instead of exponentially, with the length of the chain. We shall apply a similar technique to the hidden Markov model.

A further difficulty with the expression (13.11) for the likelihood function is that, because it corresponds to a generalization of a mixture distribution, it represents a summation over the emission models for different settings of the latent variables. Direct maximization of the likelihood function will therefore lead to complex expressions with no closed-form solutions, as was the case for simple mixture models (recall that a mixture model for i.i.d. data is a special case of the HMM).

We therefore turn to the expectation maximization algorithm to find an efficient framework for maximizing the likelihood function in hidden Markov models. The EM algorithm starts with some initial selection for the model parameters, which we denote by $\pmb { \theta } ^ { \mathrm { o l d } }$ . In the E step, we take these parameter values and find the posterior distribution of the latent variables $p ( \mathbf { Z } | \mathbf { X } , \theta ^ { \mathrm { { \bar { o l d } } } } )$ . We then use this posterior distribution to evaluate the expectation of the logarithm of the complete-data likelihood function, as a function of the parameters θ, to give the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ defined by

Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\text { old }}) = \sum_ {\mathbf {Z}} p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\theta} ^ {\text { old }}) \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}).\tag{13.12}

At this point, it is convenient to introduce some notation. We shall use $\gamma ( \mathbf { z } _ { n } )$ to denote the marginal posterior distribution of a latent variable $\mathbf { z } _ { n }$ , and $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ to denote the joint posterior distribution of two successive latent variables, so that

{\gamma (\mathbf {z} _ {n})} = {p (\mathbf {z} _ {n} | \mathbf {X}, \pmb {\theta} ^ {\mathrm{old}})}\tag{13.13}

\xi (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) = p (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n} | \mathbf {X}, \boldsymbol {\theta} ^ {\mathrm{old}}).\tag{13.14}

For each value of $n ,$ we can store $\gamma ( \mathbf { z } _ { n } )$ using a set of K nonnegative numbers that sum to unity, and similarly we can store $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ using a $K \times K$ matrix of nonnegative numbers that again sum to unity. We shall also use $\gamma ( z _ { n k } )$ to denote the conditional probability of $z _ { n k } = 1$ , with a similar use of notation for $\xi \big ( z _ { n - 1 , j } , z _ { n k } \big )$ and for other probabilistic variables introduced later. Because the expectation of a binary random variable is just the probability that it takes the value 1, we have

\gamma (z _ {n k}) = \mathbb {E} [ z _ {n k} ] = \sum_ {\mathbf {z}} \gamma (\mathbf {z}) z _ {n k}\tag{13.15}

\xi (z _ {n - 1, j}, z _ {n k}) = \mathbb {E} [ z _ {n - 1, j} z _ {n k} ] = \sum_ {\mathbf {z}} \gamma (\mathbf {z}) z _ {n - 1, j} z _ {n k}.\tag{13.16}

If we substitute the joint distribution $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ given by (13.10) into (13.12),

and make use of the definitions of $\gamma$ and $\xi$ , we obtain

\begin{array}{r c l} Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\text {old}}) & = & \sum_ {k = 1} ^ {K} \gamma (z _ {1 k}) \ln \pi_ {k} + \sum_ {n = 2} ^ {N} \sum_ {j = 1} ^ {K} \sum_ {k = 1} ^ {K} \xi (z _ {n - 1, j}, z _ {n k}) \ln A _ {j k} \\ & & + \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \gamma (z _ {n k}) \ln p (\mathbf {x} _ {n} | \boldsymbol {\phi} _ {k}). \end{array}\tag{13.17}

The goal of the E step will be to evaluate the quantities $\gamma ( \mathbf { z } _ { n } )$ and $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ efficiently, and we shall discuss this in detail shortly.

In the M step, we maximize $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to the parameters $\theta \ : = \ :$ $\{ \pi , \mathbf { A } , \phi \}$ in which we treat $\gamma ( \mathbf { z } _ { n } )$ and $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ as constant. Maximization with respect to $\pi$ and A is easily achieved using appropriate Lagrange multipliers with the results

Exercise 13.5

\pi_ {k} = \frac {\gamma (z _ {1 k})}{\sum_ {j = 1} ^ {K} \gamma (z _ {1 j})}\tag{13.18}

A _ {j k} = \frac {\sum_ {n = 2} ^ {N} \xi (z _ {n - 1 , j} , z _ {n k})}{\sum_ {l = 1} ^ {K} \sum_ {n = 2} ^ {N} \xi (z _ {n - 1 , j} , z _ {n l})}.\tag{13.19}

The EM algorithm must be initialized by choosing starting values for π and A, which should of course respect the summation constraints associated with their probabilistic interpretation. Note that any elements of π or A that are set to zero initially will remain zero in subsequent EM updates. A typical initialization procedure would involve selecting random starting values for these parameters subject to the summation and non-negativity constraints. Note that no particular modification to the EM results are required for the case of left-to-right models beyond choosing initial values for the elements $A _ { j k }$ in which the appropriate elements are set to zero, because these will remain zero throughout.

To maximize $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ with respect to $\phi _ { k }$ , we notice that only the final term in (13.17) depends on $\phi _ { k }$ , and furthermore this term has exactly the same form as the data-dependent term in the corresponding function for a standard mixture distribution for i.i.d. data, as can be seen by comparison with (9.40) for the case of a Gaussian mixture. Here the quantities $\gamma ( z _ { n k } )$ are playing the role of the responsibilities. If the parameters $\phi _ { k }$ are independent for the different components, then this term decouples into a sum of terms one for each value of $k ,$ each of which can be maximized independently. We are then simply maximizing the weighted log likelihood function for the emission density $p ( \mathbf { x } | \phi _ { k } )$ with weights $\gamma ( z _ { n k } )$ . Here we shall suppose that this maximization can be done efficiently. For instance, in the case of

Gaussian emission densities we have $p ( \mathbf { x } | \phi _ { k } ) = \mathcal { N } ( \mathbf { x } | \mu _ { k } , \Sigma _ { k } )$ , and maximization of the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ then gives

\begin{array}{l l l} \boldsymbol {\mu} _ {k} & = & \frac { \sum_ {n = 1} ^ {N} \gamma (z _ {n k}) \mathbf {x} _ {n}}{ \sum_ {n = 1} ^ {N} \gamma (z _ {n k})} \\ \boldsymbol {\Sigma} _ {k} & = & \frac { \sum_ {n = 1} ^ {N} \gamma (z _ {n k}) (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k}) (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}}}{ \sum_ {n = 1} ^ {N} \gamma (z _ {n k})}. \end{array}\tag{13.20}

(13.21)

For the case of discrete multinomial observed variables, the conditional distribution of the observations takes the form

p (\mathbf {x} | \mathbf {z}) = \prod_ {i = 1} ^ {D} \prod_ {k = 1} ^ {K} \mu_ {i k} ^ {x _ {i} z _ {k}}\tag{13.22}

Exercise 13.8

and the corresponding M-step equations are given by

\mu_ {i k} = \frac {\sum_ {n = 1} ^ {N} \gamma (z _ {n k}) x _ {n i}}{\sum_ {n = 1} ^ {N} \gamma (z _ {n k})}.\tag{13.23}

An analogous result holds for Bernoulli observed variables.

The EM algorithm requires initial values for the parameters of the emission distribution. One way to set these is first to treat the data initially as i.i.d. and fit the emission density by maximum likelihood, and then use the resulting values to initialize the parameters for EM.
