---
id: "tin-hieu-he-thong.9-3-an-alternative-view-of-em"
doc_id: "tin-hieu-he-thong"
title: "9.3. An Alternative View of EM"
level: 2
heading_path: ["Mixture Models and EM", "9.3. An Alternative View of EM"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.em-for-gaussian-mixtures"
next_id: "tin-hieu-he-thong.the-general-em-algorithm"
block_ids: ["b4832", "b4833", "b4834", "b4835", "b4836", "b4837", "b4838", "b4839", "b4840", "b4841", "b4842", "b4843", "b4844", "b4845"]
---

## 9.3. An Alternative View of EM

In this section, we present a complementary view of the EM algorithm that recognizes the key role played by latent variables. We discuss this approach first of all in an abstract setting, and then for illustration we consider once again the case of Gaussian mixtures.

The goal of the EM algorithm is to find maximum likelihood solutions for models having latent variables. We denote the set of all observed data by X, in which the $n ^ { \mathrm { t h } }$ row represents $\mathbf { x } _ { n } ^ { \mathrm { { T } } } .$ , and similarly we denote the set of all latent variables by Z, with a corresponding row ${ \mathbf z } _ { n } ^ { \mathrm { T } }$ . The set of all model parameters is denoted by θ, and so the log likelihood function is given by

\ln p (\mathbf {X} | \boldsymbol {\theta}) = \ln \left\{\sum_ {\mathbf {Z}} p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}) \right\}.\tag{9.29}

Note that our discussion will apply equally well to continuous latent variables simply by replacing the sum over Z with an integral.

A key observation is that the summation over the latent variables appears inside the logarithm. Even if the joint distribution $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ belongs to the exponential family, the marginal distribution $p ( \mathbf { X } | \pmb { \theta } )$ typically does not as a result of this summation. The presence of the sum prevents the logarithm from acting directly on the joint distribution, resulting in complicated expressions for the maximum likelihood solution.

Now suppose that, for each observation in X, we were told the corresponding value of the latent variable Z. We shall call $\{ \mathbf { X } , \mathbf { Z } \}$ the complete data set, and we shall refer to the actual observed data X as incomplete, as illustrated in Figure 9.5. The likelihood function for the complete data set simply takes the form ln $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ and we shall suppose that maximization of this complete-data log likelihood function is straightforward.

In practice, however, we are not given the complete data set $\{ \mathbf { X } , \mathbf { Z } \}$ , but only the incomplete data X. Our state of knowledge of the values of the latent variables in Z is given only by the posterior distribution $p ( \mathbf { Z } | \mathbf { X } , \pmb \theta )$ . Because we cannot use the complete-data log likelihood, we consider instead its expected value under the posterior distribution of the latent variable, which corresponds (as we shall see) to the E step of the EM algorithm. In the subsequent M step, we maximize this expectation. If the current estimate for the parameters is denoted $\theta ^ { \mathrm { o l d } }$ , then a pair of successive E and M steps gives rise to a revised estimate $\pmb { \theta } ^ { \mathrm { n e w } }$ . The algorithm is initialized by choosing some starting value for the parameters $\theta _ { 0 }$ . The use of the expectation may seem somewhat arbitrary. However, we shall see the motivation for this choice when we give a deeper treatment of EM in Section 9.4.

In the E step, we use the current parameter values $\theta ^ { \mathrm { o l d } }$ to find the posterior distribution of the latent variables given by $p ( { \bf Z } | { \bf X } , \boldsymbol { \theta } ^ { \mathrm { o l d } } )$ . We then use this posterior distribution to find the expectation of the complete-data log likelihood evaluated for some general parameter value θ. This expectation, denoted $\mathcal { Q } ( \theta , \theta ^ { \mathrm { o l d } } )$ , is given by

\mathcal {Q} (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\mathrm{old}}) = \sum_ {\mathbf {Z}} p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\theta} ^ {\mathrm{old}}) \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}).\tag{9.30}

In the M step, we determine the revised parameter estimate $\pmb { \theta } ^ { \mathrm { n e w } }$ by maximizing this function

\boldsymbol {\theta} ^ {\text { new }} = \underset {\boldsymbol {\theta}} {\arg \max} \mathcal {Q} (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\text { old }}).\tag{9.31}

Note that in the definition of $\mathcal { Q } ( \theta , \theta ^ { \mathrm { o l d } } )$ , the logarithm acts directly on the joint distribution $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ , and so the corresponding M-step maximization will, by supposition, be tractable.

The general EM algorithm is summarized below. It has the property, as we shall show later, that each cycle of EM will increase the incomplete-data log likelihood (unless it is already at a local maximum).
