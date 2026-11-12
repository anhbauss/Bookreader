---
id: "tin-hieu-he-thong.2-4-2-conjugate-priors"
doc_id: "tin-hieu-he-thong"
title: "2.4.2 Conjugate priors"
level: 2
heading_path: ["Probability Distributions", "2.4.2 Conjugate priors"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-4-1-maximum-likelihood-and-sufficient-statistics"
next_id: "tin-hieu-he-thong.2-4-3-noninformative-priors"
block_ids: ["b1383", "b1384", "b1385", "b1386", "b1387", "b1388"]
---

## 2.4.2 Conjugate priors

We have already encountered the concept of a conjugate prior several times, for example in the context of the Bernoulli distribution (for which the conjugate prior is the beta distribution) or the Gaussian (where the conjugate prior for the mean is a Gaussian, and the conjugate prior for the precision is the Wishart distribution). In general, for a given probability distribution $p ( \mathbf { x } | \boldsymbol { \eta } )$ , we can seek a prior $p ( \eta )$ that is conjugate to the likelihood function, so that the posterior distribution has the same functional form as the prior. For any member of the exponential family (2.194), there exists a conjugate prior that can be written in the form

p (\boldsymbol {\eta} | \boldsymbol {\chi}, \nu) = f (\boldsymbol {\chi}, \nu) g (\boldsymbol {\eta}) ^ {\nu} \exp \left\{\nu \boldsymbol {\eta} ^ {T} \boldsymbol {\chi} \right\}\tag{2.229}

where $f ( \chi , \nu )$ is a normalization coefficient, and $g ( \pmb { \eta } )$ is the same function as appears in (2.194). To see that this is indeed conjugate, let us multiply the prior (2.229) by the likelihood function (2.227) to obtain the posterior distribution, up to a normalization coefficient, in the form

p (\boldsymbol {\eta} | \mathbf {X}, \boldsymbol {\chi}, \nu) \propto g (\boldsymbol {\eta}) ^ {\nu + N} \exp \left\{\boldsymbol {\eta} ^ {\mathrm{T}} \left(\sum_ {n = 1} ^ {N} \mathbf {u} (\mathbf {x} _ {n}) + \nu \boldsymbol {\chi}\right) \right\}.\tag{2.230}

This again takes the same functional form as the prior (2.229), confirming conjugacy. Furthermore, we see that the parameter ν can be interpreted as a effective number of pseudo-observations in the prior, each of which has a value for the sufficient statistic u(x) given by χ.
