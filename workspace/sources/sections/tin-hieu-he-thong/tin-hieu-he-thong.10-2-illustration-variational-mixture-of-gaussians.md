---
id: "tin-hieu-he-thong.10-2-illustration-variational-mixture-of-gaussians"
doc_id: "tin-hieu-he-thong"
title: "10.2. Illustration: Variational Mixture of Gaussians"
level: 2
heading_path: ["Approximate Inference", "10.2. Illustration: Variational Mixture of Gaussians"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-1-4-model-comparison"
next_id: "tin-hieu-he-thong.10-2-1-variational-distribution"
block_ids: ["b5179", "b5180", "b5181", "b5182", "b5183", "b5184", "b5185", "b5186", "b5187", "b5188", "b5189", "b5190", "b5191", "b5192", "b5193", "b5194", "b5195", "b5196"]
---

## 10.2. Illustration: Variational Mixture of Gaussians

We now return to our discussion of the Gaussian mixture model and apply the variational inference machinery developed in the previous section. This will provide a good illustration of the application of variational methods and will also demonstrate how a Bayesian treatment elegantly resolves many of the difficulties associated with the maximum likelihood approach (Attias, 1999b). The reader is encouraged to work through this example in detail as it provides many insights into the practical application of variational methods. Many Bayesian models, corresponding to much more sophisticated distributions, can be solved by straightforward extensions and generalizations of this analysis.

Our starting point is the likelihood function for the Gaussian mixture model, illustrated by the graphical model in Figure 9.6. For each observation ${ \bf x } _ { n }$ we have a corresponding latent variable $\mathbf { z } _ { n }$ comprising a 1-of-K binary vector with elements $z _ { n k }$ for $k = 1 , \ldots , K$ . As before we denote the observed data set by $\mathbf { X } =$ $\{ \mathbf { x } _ { 1 } , \hdots , \mathbf { x } _ { N } \}$ , and similarly we denote the latent variables by $\mathbf { Z } = \{ \mathbf { z } _ { 1 } , \dotsc , \mathbf { z } _ { N } \}$ From (9.10) we can write down the conditional distribution of $\mathbf { Z } ,$ given the mixing coefficients π, in the form

p (\mathbf {Z} | \boldsymbol {\pi}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} \pi_ {k} ^ {z _ {n k}}.\tag{10.37}

Similarly, from (9.11), we can write down the conditional distribution of the observed data vectors, given the latent variables and the component parameters

p (\mathbf {X} | \mathbf {Z}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} \mathcal {N} \left(\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k} ^ {- 1}\right) ^ {z _ {n k}}\tag{10.38}

where $\boldsymbol { \mu } = \{ \mu _ { k } \}$ and $\pmb { \Lambda } = \{ \pmb { \Lambda } _ { k } \}$ . Note that we are working in terms of precision matrices rather than covariance matrices as this somewhat simplifies the mathematics.

Next we introduce priors over the parameters $\mu ,$ Λ and $\pi$ . The analysis is considerably simplified if we use conjugate prior distributions. We therefore choose a Dirichlet distribution over the mixing coefficients π

p (\boldsymbol {\pi}) = \operatorname{Dir} (\boldsymbol {\pi} | \boldsymbol {\alpha} _ {0}) = C (\boldsymbol {\alpha} _ {0}) \prod_ {k = 1} ^ {K} \pi_ {k} ^ {\alpha_ {0} - 1}\tag{10.39}

where by symmetry we have chosen the same parameter $\alpha _ { 0 }$ for each of the components, and $C ( \alpha _ { 0 } )$ is the normalization constant for the Dirichlet distribution defined

Figure 10.5 Directed acyclic graph representing the Bayesian mixture of Gaussians model, in which the box (plate) denotes a set of N i.i.d. observations. Here $\mu$ denotes $\{ \mu _ { k } \}$ and Λ denotes $\{ \pmb { \Lambda } _ { k } \}$

![image](images/part-003--cd450ac645fd6f87839c2882e4feb95d1d720161912915eb3eee9c1f225ec406.jpg)

by (B.23). As we have seen, the parameter $\alpha _ { 0 }$ can be interpreted as the effective prior number of observations associated with each component of the mixture. If the value of $\alpha _ { 0 }$ is small, then the posterior distribution will be influenced primarily by the data rather than by the prior.

Similarly, we introduce an independent Gaussian-Wishart prior governing the mean and precision of each Gaussian component, given by

\begin{array}{r c l} p (\boldsymbol {\mu}, \boldsymbol {\Lambda}) & = & p (\boldsymbol {\mu} | \boldsymbol {\Lambda}) p (\boldsymbol {\Lambda}) \\ & = & \prod_ {k = 1} ^ {K} \mathcal {N} \left(\boldsymbol {\mu} _ {k} | \mathbf {m} _ {0}, (\beta_ {0} \boldsymbol {\Lambda} _ {k}) ^ {- 1}\right) \mathcal {W} (\boldsymbol {\Lambda} _ {k} | \mathbf {W} _ {0}, \nu_ {0}) \end{array}\tag{10.40}

because this represents the conjugate prior distribution when both the mean and precision are unknown. Typically we would choose $\mathbf { m } _ { 0 } = \mathbf { 0 }$ by symmetry.

The resulting model can be represented as a directed graph as shown in Figure 10.5. Note that there is a link from Λ to $\pmb { \mu }$ since the variance of the distribution over $\pmb { \mu }$ in (10.40) is a function of Λ.

This example provides a nice illustration of the distinction between latent variables and parameters. Variables such as $\mathbf { z } _ { n }$ that appear inside the plate are regarded as latent variables because the number of such variables grows with the size of the data set. By contrast, variables such as $\pmb { \mu }$ that are outside the plate are fixed in number independently of the size of the data set, and so are regarded as parameters. From the perspective of graphical models, however, there is really no fundamental difference between them.
