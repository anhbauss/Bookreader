---
id: "tin-hieu-he-thong.thomas-bayes-1701-1761"
doc_id: "tin-hieu-he-thong"
title: "Thomas Bayes 1701\u20131761"
level: 2
heading_path: ["Introduction", "Thomas Bayes 1701\u20131761"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-2-3-bayesian-probabilities"
next_id: "tin-hieu-he-thong.1-2-4-the-gaussian-distribution"
block_ids: ["b284", "b285", "b286", "b287", "b288", "b289", "b290", "b291", "b292", "b293", "b294", "b295", "b296", "b297", "b298", "b299", "b300", "b301", "b302", "b303"]
---

## Thomas Bayes 1701–1761

Thomas Bayes was born in Tunbridge Wells and was a clergyman as well as an amateur scientist and a mathematician. He studied logic and theology at Edinburgh University and was elected Fellow of the Royal Society in 1742. During the 18<sup>th</sup> century, is-

sues regarding probability arose in connection with gambling and with the new concept of insurance. One particularly important problem concerned so-called inverse probability. A solution was proposed by Thomas Bayes in his paper ‘Essay towards solving a problem in the doctrine of chances’, which was published in 1764, some three years after his death, in the Philosophical Transactions of the Royal Society. In fact, Bayes only formulated his theory for the case of a uniform prior, and it was Pierre-Simon Laplace who independently rediscovered the theory in general form and who demonstrated its broad applicability.

tion of probability. Consider the example of polynomial curve fitting discussed in Section 1.1. It seems reasonable to apply the frequentist notion of probability to the random values of the observed variables $t _ { n }$ . However, we would like to address and quantify the uncertainty that surrounds the appropriate choice for the model parameters w. We shall see that, from a Bayesian perspective, we can use the machinery of probability theory to describe the uncertainty in model parameters such as w, or indeed in the choice of model itself.

Bayes’ theorem now acquires a new significance. Recall that in the boxes of fruit example, the observation of the identity of the fruit provided relevant information that altered the probability that the chosen box was the red one. In that example, Bayes’ theorem was used to convert a prior probability into a posterior probability by incorporating the evidence provided by the observed data. As we shall see in detail later, we can adopt a similar approach when making inferences about quantities such as the parameters w in the polynomial curve fitting example. We capture our assumptions about w, before observing the data, in the form of a prior probability distribution $p ( \mathbf { w } )$ . The effect of the observed data $\mathcal { D } = \{ t _ { 1 } , \ldots , t _ { N } \}$ is expressed through the conditional probability $p ( \mathcal { D } | \mathbf { w } )$ , and we shall see later, in Section 1.2.5, how this can be represented explicitly. Bayes’ theorem, which takes the form

p (\mathbf {w} | \mathcal {D}) = \frac {p (\mathcal {D} | \mathbf {w}) p (\mathbf {w})}{p (\mathcal {D})}\tag{1.43}

then allows us to evaluate the uncertainty in w after we have observed in the form of the posterior probability $p ( \mathbf { w } | \mathcal { D } )$ .

The quantity $p ( \mathcal { D } | \mathbf { w } )$ on the right-hand side of Bayes’ theorem is evaluated for the observed data set and can be viewed as a function of the parameter vector w, in which case it is called the likelihood function. It expresses how probable the observed data set is for different settings of the parameter vector w. Note that the likelihood is not a probability distribution over w, and its integral with respect to w does not (necessarily) equal one.

Given this definition of likelihood, we can state Bayes’ theorem in words

\mathrm{posterior} \propto \mathrm{likelihood} \times \mathrm{prior}\tag{1.44}

where all of these quantities are viewed as functions of w. The denominator in (1.43) is the normalization constant, which ensures that the posterior distribution on the left-hand side is a valid probability density and integrates to one. Indeed, integrating both sides of (1.43) with respect to w, we can express the denominator in Bayes’ theorem in terms of the prior distribution and the likelihood function

p (\mathcal {D}) = \int p (\mathcal {D} | \mathbf {w}) p (\mathbf {w}) \mathrm{d} \mathbf {w}.\tag{1.45}

In both the Bayesian and frequentist paradigms, the likelihood function $p ( \mathcal { D } | \mathbf { w } )$ plays a central role. However, the manner in which it is used is fundamentally different in the two approaches. In a frequentist setting, w is considered to be a fixed parameter, whose value is determined by some form of ‘estimator’, and error bars on this estimate are obtained by considering the distribution of possible data sets . By contrast, from the Bayesian viewpoint there is only a single data set  (namely the one that is actually observed), and the uncertainty in the parameters is expressed through a probability distribution over w.

A widely used frequentist estimator is maximum likelihood, in which w is set to the value that maximizes the likelihood function $p ( \mathcal { D } | \mathbf { w } )$ . This corresponds to choosing the value of w for which the probability of the observed data set is maximized. In the machine learning literature, the negative log of the likelihood function is called an error function. Because the negative logarithm is a monotonically decreasing function, maximizing the likelihood is equivalent to minimizing the error.

One approach to determining frequentist error bars is the bootstrap (Efron, 1979; Hastie et al., 2001), in which multiple data sets are created as follows. Suppose our original data set consists of N data points $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ . We can create a new data set $\mathbf { X } _ { \mathrm { B } }$ by drawing N points at random from X, with replacement, so that some points in X may be replicated in $\mathbf { X } _ { \mathrm { B } }$ , whereas other points in X may be absent from $\mathbf { X } _ { \mathrm { B } }$ . This process can be repeated L times to generate L data sets each of size N and each obtained by sampling from the original data set X. The statistical accuracy of parameter estimates can then be evaluated by looking at the variability of predictions between the different bootstrap data sets.

One advantage of the Bayesian viewpoint is that the inclusion of prior knowledge arises naturally. Suppose, for instance, that a fair-looking coin is tossed three times and lands heads each time. A classical maximum likelihood estimate of the probability of landing heads would give 1, implying that all future tosses will land heads! By contrast, a Bayesian approach with any reasonable prior will lead to a much less extreme conclusion.

There has been much controversy and debate associated with the relative merits of the frequentist and Bayesian paradigms, which have not been helped by the fact that there is no unique frequentist, or even Bayesian, viewpoint. For instance, one common criticism of the Bayesian approach is that the prior distribution is often selected on the basis of mathematical convenience rather than as a reflection of any prior beliefs. Even the subjective nature of the conclusions through their dependence on the choice of prior is seen by some as a source of difficulty. Reducing the dependence on the prior is one motivation for so-called noninformative priors. However, these lead to difficulties when comparing different models, and indeed Bayesian methods based on poor choices of prior can give poor results with high confidence. Frequentist evaluation methods offer some protection from such problems, and techniques such as cross-validation remain useful in areas such as model comparison.

This book places a strong emphasis on the Bayesian viewpoint, reflecting the huge growth in the practical importance of Bayesian methods in the past few years, while also discussing useful frequentist concepts as required.

Although the Bayesian framework has its origins in the $1 8 ^ { \mathrm { t h } }$ century, the practical application of Bayesian methods was for a long time severely limited by the difficulties in carrying through the full Bayesian procedure, particularly the need to marginalize (sum or integrate) over the whole of parameter space, which, as we shall see, is required in order to make predictions or to compare different models. The development of sampling methods, such as Markov chain Monte Carlo (discussed in Chapter 11) along with dramatic improvements in the speed and memory capacity of computers, opened the door to the practical use of Bayesian techniques in an impressive range of problem domains. Monte Carlo methods are very flexible and can be applied to a wide range of models. However, they are computationally intensive and have mainly been used for small-scale problems.

More recently, highly efficient deterministic approximation schemes such as variational Bayes and expectation propagation (discussed in Chapter 10) have been developed. These offer a complementary alternative to sampling methods and have allowed Bayesian techniques to be used in large-scale applications (Blei et al., 2003).
