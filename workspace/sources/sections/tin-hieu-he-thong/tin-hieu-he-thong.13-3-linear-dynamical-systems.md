---
id: "tin-hieu-he-thong.13-3-linear-dynamical-systems"
doc_id: "tin-hieu-he-thong"
title: "13.3. Linear Dynamical Systems"
level: 2
heading_path: ["Sequential Data", "13.3. Linear Dynamical Systems"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-2-6-extensions-of-the-hidden-markov-model"
next_id: "tin-hieu-he-thong.13-3-1-inference-in-lds"
block_ids: ["b6801", "b6802", "b6803", "b6804", "b6805", "b6806", "b6807", "b6808", "b6809", "b6810", "b6811", "b6812", "b6813", "b6814", "b6815", "b6816", "b6817", "b6818", "b6819", "b6820", "b6821", "b6822", "b6823", "b6824"]
---

## 13.3. Linear Dynamical Systems

In order to motivate the concept of linear dynamical systems, let us consider the following simple problem, which often arises in practical settings. Suppose we wish to measure the value of an unknown quantity z using a noisy sensor that returns a observation x representing the value of z plus zero-mean Gaussian noise. Given a single measurement, our best guess for z is to assume that $\textbf { z } = \textbf { x }$ . However, we can improve our estimate for z by taking lots of measurements and averaging them, because the random noise terms will tend to cancel each other. Now let’s make the situation more complicated by assuming that we wish to measure a quantity z that is changing over time. We can take regular measurements of x so that at some point in time we have obtained $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ and we wish to find the corresponding values ${ \bf z } _ { 1 } , \ldots , { \bf x } _ { N }$ . If we simply average the measurements, the error due to random noise will be reduced, but unfortunately we will just obtain a single averaged estimate, in which we have averaged over the changing value of z, thereby introducing a new source of error.

Intuitively, we could imagine doing a bit better as follows. To estimate the value of $\mathbf { z } _ { N }$ , we take only the most recent few measurements, say ${ \bf x } _ { N - L } , \ldots , { \bf x } _ { N }$ and just average these. If z is changing slowly, and the random noise level in the sensor is high, it would make sense to choose a relatively long window of observations to average. Conversely, if the signal is changing quickly, and the noise levels are small, we might be better just to use $\mathbf { x } _ { N }$ directly as our estimate of $\mathbf { z } _ { N }$ . Perhaps we could do even better if we take a weighted average, in which more recent measurements make a greater contribution than less recent ones.

Although this sort of intuitive argument seems plausible, it does not tell us how to form a weighted average, and any sort of hand-crafted weighing is hardly likely to be optimal. Fortunately, we can address problems such as this much more systematically by defining a probabilistic model that captures the time evolution and measurement processes and then applying the inference and learning methods developed in earlier chapters. Here we shall focus on a widely used model known as a linear dynamical system.

As we have seen, the HMM corresponds to the state space model shown in Figure 13.5 in which the latent variables are discrete but with arbitrary emission probability distributions. This graph of course describes a much broader class of probability distributions, all of which factorize according to (13.6). We now consider extensions to other distributions for the latent variables. In particular, we consider continuous latent variables in which the summations of the sum-product algorithm become integrals. The general form of the inference algorithms will, however, be the same as for the hidden Markov model. It is interesting to note that, historically, hidden Markov models and linear dynamical systems were developed independently. Once they are both expressed as graphical models, however, the deep relationship between them immediately becomes apparent.

One key requirement is that we retain an efficient algorithm for inference which is linear in the length of the chain. This requires that, for instance, when we take a quantity $\widehat { \alpha } ( \mathbf { z } _ { n - 1 } )$ , representing the posterior probability of $\mathbf { z } _ { n }$ given observations $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n }$ , and multiply by the transition probability $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ and the emission probability $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ and then marginalize over $\mathbf { z } _ { n - 1 }$ , we obtain a distribution over $\mathbf { z } _ { n }$ that is of the same functional form as that over $\widehat { \alpha } ( \mathbf { z } _ { n - 1 } )$ That is to say, the distribution must not become more complex at each stage, but must only change in its parameter values. Not surprisingly, the only distributions that have this property of being closed under multiplication are those belonging to the exponential family.

Here we consider the most important example from a practical perspective, which is the Gaussian. In particular, we consider a linear-Gaussian state space model so that the latent variables $\left\{ \mathbf { z } _ { n } \right\}$ , as well as the observed variables $\left\{ \mathbf { x } _ { n } \right\}$ , are multivariate Gaussian distributions whose means are linear functions of the states of their parents in the graph. We have seen that a directed graph of linear-Gaussian units is equivalent to a joint Gaussian distribution over all of the variables. Furthermore, marginals such as $\widehat { \alpha } ( \mathbf { z } _ { n } )$ are also Gaussian, so that the functional form of the messages is preserved and we will obtain an efficient inference algorithm. By contrast, suppose that the emission densities $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ comprise a mixture of K Gaussians each of which has a mean that is linear in $\mathbf { z } _ { n }$ . Then even if $\widehat { \alpha } ( \mathbf { z } _ { 1 } )$ is Gaussian, the quantity $\widehat { \alpha } ( \mathbf { z } _ { 2 } )$ will be a mixture of K Gaussians, $\widehat { \alpha } ( { \bf z } _ { 3 } )$ will be a mixture of $K ^ { 2 }$ Gaussians, and so on, and exact inference will not be of practical value.

We have seen that the hidden Markov model can be viewed as an extension of the mixture models of Chapter 9 to allow for sequential correlations in the data. In a similar way, we can view the linear dynamical system as a generalization of the continuous latent variable models of Chapter 12 such as probabilistic PCA and factor analysis. Each pair of nodes $\left\{ \mathbf { z } _ { n } , \mathbf { x } _ { n } \right\}$ represents a linear-Gaussian latent variable model for that particular observation. However, the latent variables $\left\{ { { \bf { z } } _ { n } } \right\}$ are no longer treated as independent but now form a Markov chain.

Because the model is represented by a tree-structured directed graph, inference problems can be solved efficiently using the sum-product algorithm. The forward recursions, analogous to the α messages of the hidden Markov model, are known as the Kalman filter equations (Kalman, 1960; Zarchan and Musoff, 2005), and the backward recursions, analogous to the $\beta$ messages, are known as the Kalman smoother equations, or the Rauch-Tung-Striebel (RTS) equations (Rauch et al., 1965). The Kalman filter is widely used in many real-time tracking applications.

Because the linear dynamical system is a linear-Gaussian model, the joint distribution over all variables, as well as all marginals and conditionals, will be Gaussian. It follows that the sequence of individually most probable latent variable values is the same as the most probable latent sequence. There is thus no need to consider the analogue of the Viterbi algorithm for the linear dynamical system.

Because the model has linear-Gaussian conditional distributions, we can write the transition and emission distributions in the general form

{p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1})} = {\mathcal {N} (\mathbf {z} _ {n} | \mathbf {A z} _ {n - 1}, \boldsymbol {\Gamma})}\tag{13.75}

{p (\mathbf {x} _ {n} | \mathbf {z} _ {n})} = {\mathcal {N} (\mathbf {x} _ {n} | \mathbf {C z} _ {n}, \boldsymbol {\Sigma}).}\tag{13.76}

The initial latent variable also has a Gaussian distribution which we write as

p (\mathbf {z} _ {1}) = \mathcal {N} (\mathbf {z} _ {1} | \boldsymbol {\mu} _ {0}, \mathbf {V} _ {0}).\tag{13.77}

Note that in order to simplify the notation, we have omitted additive constant terms from the means of the Gaussians. In fact, it is straightforward to include them if desired. Traditionally, these distributions are more commonly expressed in an equivalent form in terms of noisy linear equations given by

{\bf z} _ {n} = {\bf A} {\bf z} _ {n - 1} + {\bf w} _ {n}\tag{13.78}

{\mathbf {x} _ {n}} = {\mathbf {C z} _ {n} + \mathbf {v} _ {n}}\tag{13.79}

{\bf z} _ {1} = {\pmb \mu} _ {0} + {\bf u}\tag{13.80}

where the noise terms have the distributions

\mathbf {w} \sim \mathcal {N} (\mathbf {w} | \mathbf {0}, \boldsymbol {\Gamma})\tag{13.81}

\mathbf {v} \sim \mathcal {N} (\mathbf {v} | \mathbf {0}, \boldsymbol {\Sigma})\tag{13.82}

\mathbf {u} \sim \mathcal {N} (\mathbf {u} | \mathbf {0}, \mathbf {V} _ {0}).\tag{13.83}

The parameters of the model, denoted by $\pmb \theta = \{ { \bf A } , { \bf r } , { \bf C } , \Sigma , \mu _ { 0 } , { \bf V } _ { 0 } \}$ , can be determined using maximum likelihood through the EM algorithm. In the E step, we need to solve the inference problem of determining the local posterior marginals for the latent variables, which can be solved efficiently using the sum-product algorithm, as we discuss in the next section.
