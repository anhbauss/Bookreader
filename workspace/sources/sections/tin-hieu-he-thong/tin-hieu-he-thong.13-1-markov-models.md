---
id: "tin-hieu-he-thong.13-1-markov-models"
doc_id: "tin-hieu-he-thong"
title: "13.1. Markov Models"
level: 2
heading_path: ["Sequential Data", "13.1. Markov Models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.sequential-data"
next_id: "tin-hieu-he-thong.13-2-hidden-markov-models"
block_ids: ["b6540", "b6541", "b6542", "b6543", "b6544", "b6545", "b6546", "b6547", "b6548", "b6549", "b6550", "b6551", "b6552", "b6553", "b6554", "b6555", "b6556", "b6557", "b6558", "b6559", "b6560", "b6561", "b6562", "b6563", "b6564", "b6565", "b6566", "b6567"]
---

## 13.1. Markov Models

The easiest way to treat sequential data would be simply to ignore the sequential aspects and treat the observations as i.i.d., corresponding to the graph in Figure 13.2. Such an approach, however, would fail to exploit the sequential patterns in the data, such as correlations between observations that are close in the sequence. Suppose, for instance, that we observe a binary variable denoting whether on a particular day it rained or not. Given a time series of recent observations of this variable, we wish to predict whether it will rain on the next day. If we treat the data as i.i.d., then the only information we can glean from the data is the relative frequency of rainy days. However, we know in practice that the weather often exhibits trends that may last for several days. Observing whether or not it rains today is therefore of significant help in predicting if it will rain tomorrow.

To express such effects in a probabilistic model, we need to relax the i.i.d. assumption, and one of the simplest ways to do this is to consider a Markov model. First of all we note that, without loss of generality, we can use the product rule to express the joint distribution for a sequence of observations in the form

p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {N}) = \prod_ {n = 1} ^ {N} p (\mathbf {x} _ {n} | \mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}).\tag{13.1}

If we now assume that each of the conditional distributions on the right-hand side is independent of all previous observations except the most recent, we obtain the first-order Markov chain, which is depicted as a graphical model in Figure 13.3. The

Figure 13.3 A first-order Markov chain of observations $\left\{ \mathbf { x } _ { n } \right\}$ in which the distribution $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - 1 } )$ of a particular observation ${ \bf x } _ { n }$ is conditioned on the value of the previous observation ${ \bf x } _ { n - 1 }$

![image](images/part-004--337a55f15cedcf4623d5f2d9dcfb2aa02f18581cfc2b7ce501821f461736c028.jpg)

joint distribution for a sequence of N observations under this model is given by

p (\mathbf {x} _ {1}, \dots , \mathbf {x} _ {N}) = p (\mathbf {x} _ {1}) \prod_ {n = 2} ^ {N} p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1}).\tag{13.2}

From the d-separation property, we see that the conditional distribution for observation ${ \bf x } _ { n }$ , given all of the observations up to time n, is given by

p (\mathbf {x} _ {n} | \mathbf {x} _ {1}, \dots , \mathbf {x} _ {n - 1}) = p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1})\tag{13.3}

which is easily verified by direct evaluation starting from (13.2) and using the product rule of probability. Thus if we use such a model to predict the next observation in a sequence, the distribution of predictions will depend only on the value of the immediately preceding observation and will be independent of all earlier observations.

In most applications of such models, the conditional distributions $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - 1 } )$ that define the model will be constrained to be equal, corresponding to the assumption of a stationary time series. The model is then known as a homogeneous Markov chain. For instance, if the conditional distributions depend on adjustable parameters (whose values might be inferred from a set of training data), then all of the conditional distributions in the chain will share the same values of those parameters.

Although this is more general than the independence model, it is still very restrictive. For many sequential observations, we anticipate that the trends in the data over several successive observations will provide important information in predicting the next value. One way to allow earlier observations to have an influence is to move to higher-order Markov chains. If we allow the predictions to depend also on the previous-but-one value, we obtain a second-order Markov chain, represented by the graph in Figure 13.4. The joint distribution is now given by

p (\mathbf {x} _ {1}, \dots , \mathbf {x} _ {N}) = p (\mathbf {x} _ {1}) p (\mathbf {x} _ {2} | \mathbf {x} _ {1}) \prod_ {n = 3} ^ {N} p (\mathbf {x} _ {n} | \mathbf {x} _ {n - 1}, \mathbf {x} _ {n - 2}).\tag{13.4}

Again, using d-separation or by direct evaluation, we see that the conditional distribution of ${ \bf x } _ { n }$ given ${ \bf x } _ { n - 1 }$ and ${ \bf x } _ { n - 2 }$ is independent of all observations $\mathbf { x } _ { 1 } , \ldots . . . \mathbf { x } _ { n - 3 }$

Figure 13.4 A second-order Markov chain, in which the conditional distribution of a particular observation ${ \bf x } _ { n }$ depends on the values of the two previous observations $\mathbf { x } _ { n - 1 }$ and $\mathbf { x } _ { n - 2 }$

![image](images/part-004--a7cde87c3d20d0551c0439748581c72d80436f9950163147cfadb7f87eb7fdc6.jpg)

Figure 13.5 We can represent sequential data using a Markov chain of latent variables, with each observation conditioned on the state of the corresponding latent variable. This important graphical structure forms the foundation both for the hidden Markov model and for linear dynamical systems.

![image](images/part-004--cb79c729c033d6b6eb457b39ac19bc3e6b4cc28873f9db3d9b65ef46251b4ddd.jpg)

Each observation is now influenced by two previous observations. We can similarly consider extensions to an $M ^ { \mathrm { t h } }$ order Markov chain in which the conditional distribution for a particular variable depends on the previous M variables. However, we have paid a price for this increased flexibility because the number of parameters in the model is now much larger. Suppose the observations are discrete variables having K states. Then the conditional distribution $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - 1 } )$ in a first-order Markov chain will be specified by a set of $K - 1$ parameters for each of the K states of $\mathbf x _ { n - 1 }$ giving a total of $K ( K - 1 )$ parameters. Now suppose we extend the model to an $\dot { M } ^ { \mathrm { t h } }$ order Markov chain, so that the joint distribution is built up from conditionals $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - M } , \ldots , \mathbf { x } _ { n - 1 } )$ . If the variables are discrete, and if the conditional distributions are represented by general conditional probability tables, then the number of parameters in such a model will have $K ^ { M - \hat { 1 } } ( K - 1 )$ parameters. Because this grows exponentially with M, it will often render this approach impractical for larger values of M.

For continuous variables, we can use linear-Gaussian conditional distributions in which each node has a Gaussian distribution whose mean is a linear function of its parents. This is known as an autoregressive or AR model (Box et al., 1994; Thiesson et al., 2004). An alternative approach is to use a parametric model for $p ( \mathbf { x } _ { n } | \mathbf { x } _ { n - M } , . . . , \mathbf { x } _ { n - 1 } )$ such as a neural network. This technique is sometimes called a tapped delay line because it corresponds to storing (delaying) the previous M values of the observed variable in order to predict the next value. The number of parameters can then be much smaller than in a completely general model (for example it may grow linearly with M), although this is achieved at the expense of a restricted family of conditional distributions.

Suppose we wish to build a model for sequences that is not limited by the Markov assumption to any order and yet that can be specified using a limited number of free parameters. We can achieve this by introducing additional latent variables to permit a rich class of models to be constructed out of simple components, as we did with mixture distributions in Chapter 9 and with continuous latent variable models in Chapter 12. For each observation ${ \bf x } _ { n }$ , we introduce a corresponding latent variable $\mathbf { z } _ { n }$ (which may be of different type or dimensionality to the observed variable). We now assume that it is the latent variables that form a Markov chain, giving rise to the graphical structure known as a state space model, which is shown in Figure 13.5. It satisfies the key conditional independence property that $\mathbf { z } _ { n - 1 }$ and $\mathbf { z } _ { n + 1 }$ are independent given $\mathbf { z } _ { n }$ , so that

\mathbf {z} _ {n + 1} \perp \mathbf {\Lambda} \mathbf {z} _ {n - 1} \mid \mathbf {z} _ {n}.\tag{13.5}

The joint distribution for this model is given by

p (\mathbf {x} _ {1}, \dots , \mathbf {x} _ {N}, \mathbf {z} _ {1}, \dots , \mathbf {z} _ {N}) = p (\mathbf {z} _ {1}) \left[ \prod_ {n = 2} ^ {N} p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) \right] \prod_ {n = 1} ^ {N} p (\mathbf {x} _ {n} | \mathbf {z} _ {n}).\tag{13.6}

Using the d-separation criterion, we see that there is always a path connecting any two observed variables ${ \bf x } _ { n }$ and $\mathbf { x } _ { m }$ via the latent variables, and that this path is never blocked. Thus the predictive distribution $p ( \mathbf { x } _ { n + 1 } | \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n } )$ for observation $\mathbf { x } _ { n + 1 }$ given all previous observations does not exhibit any conditional independence properties, and so our predictions for $\mathbf { x } _ { n + 1 }$ depends on all previous observations. The observed variables, however, do not satisfy the Markov property at any order. We shall discuss how to evaluate the predictive distribution in later sections of this chapter.

There are two important models for sequential data that are described by this graph. If the latent variables are discrete, then we obtain the hidden Markov model, or HMM (Elliott et al., 1995). Note that the observed variables in an HMM may be discrete or continuous, and a variety of different conditional distributions can be used to model them. If both the latent and the observed variables are Gaussian (with a linear-Gaussian dependence of the conditional distributions on their parents), then we obtain the linear dynamical system.
