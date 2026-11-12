---
id: "tin-hieu-he-thong.10-2-3-predictive-density"
doc_id: "tin-hieu-he-thong"
title: "10.2.3 Predictive density"
level: 2
heading_path: ["Approximate Inference", "10.2.3 Predictive density"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-2-2-variational-lower-bound"
next_id: "tin-hieu-he-thong.10-2-4-determining-the-number-of-components"
block_ids: ["b5286", "b5287", "b5288", "b5289", "b5290", "b5291", "b5292", "b5293", "b5294", "b5295", "b5296", "b5297"]
---

## 10.2.3 Predictive density

In applications of the Bayesian mixture of Gaussians model we will often be interested in the predictive density for a new value $\widehat { \mathbf { x } }$ of the observed variable. ${ \mathrm { A s } } -$ sociated with this observation will be a corresponding latent variable ${ \widehat { \mathbf { z } } } ,$ and the predictive density is then given by

p (\widehat {\mathbf {x}} | \mathbf {X}) = \sum_ {\widehat {\mathbf {z}}} \iiint p (\widehat {\mathbf {x}} | \widehat {\mathbf {z}}, \boldsymbol {\mu}, \boldsymbol {\Lambda}) p (\widehat {\mathbf {z}} | \boldsymbol {\pi}) p (\boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda} | \mathbf {X}) \mathrm{d} \boldsymbol {\pi} \mathrm{d} \boldsymbol {\mu} \mathrm{d} \boldsymbol {\Lambda}\tag{10.78}

where $p ( \pi , \mu , \mathbf { A } | \mathbf { X } )$ is the (unknown) true posterior distribution of the parameters. Using (10.37) and (10.38) we can first perform the summation over $\widehat { \mathbf { z } }$ to give

p (\widehat {\mathbf {x}} | \mathbf {X}) = \sum_ {k = 1} ^ {K} \iiint \pi_ {k} \mathcal {N} \left(\widehat {\mathbf {x}} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k} ^ {- 1}\right) p (\boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Lambda} | \mathbf {X}) d \boldsymbol {\pi} d \boldsymbol {\mu} d \boldsymbol {\Lambda}.\tag{10.79}

Because the remaining integrations are intractable, we approximate the predictive density by replacing the true posterior distribution $p ( \pi , \mu , \mathbf { \Delta } \mathbf { \Delta } \mathbf { \Delta } )$ with its variational approximation $q ( \pi ) q ( \pmb { \mu } , \pmb { \Lambda } )$ to give

p (\widehat {\mathbf {x}} | \mathbf {X}) = \sum_ {k = 1} ^ {K} \iiint \pi_ {k} \mathcal {N} \left(\widehat {\mathbf {x}} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k} ^ {- 1}\right) q (\boldsymbol {\pi}) q (\boldsymbol {\mu} _ {k}, \boldsymbol {\Lambda} _ {k}) \mathrm{d} \boldsymbol {\pi} \mathrm{d} \boldsymbol {\mu} _ {k} \mathrm{d} \boldsymbol {\Lambda} _ {k}\tag{10.80}

where we have made use of the factorization (10.55) and in each term we have implicitly integrated out all variables $\{ \mu _ { j } , \pmb { \Lambda } _ { j } \}$ for $j \neq k$ The remaining integrations can now be evaluated analytically giving a mixture of Student’s t-distributions

p (\widehat {\mathbf {x}} | \mathbf {X}) = \frac {1}{\widehat {\alpha}} \sum_ {k = 1} ^ {K} \alpha_ {k} \mathrm{St} (\widehat {\mathbf {x}} | \mathbf {m} _ {k}, \mathbf {L} _ {k}, \nu_ {k} + 1 - D)\tag{10.81}

in which the $k ^ { \mathrm { t h } }$ component has mean $\mathbf { m } _ { k }$ , and the precision is given by

\mathbf {L} _ {k} = \frac {(\nu_ {k} + 1 - D) \beta_ {k}}{(1 + \beta_ {k})} \mathbf {W} _ {k}\tag{10.82}

in which $\nu _ { k }$ is given by (10.63). When the size N of the data set is large the predictive distribution (10.81) reduces to a mixture of Gaussians.
