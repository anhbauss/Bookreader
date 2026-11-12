---
id: "tin-hieu-he-thong.em-for-gaussian-mixtures"
doc_id: "tin-hieu-he-thong"
title: "EM for Gaussian Mixtures"
level: 2
heading_path: ["Mixture Models and EM", "EM for Gaussian Mixtures"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-2-2-em-for-gaussian-mixtures"
next_id: "tin-hieu-he-thong.9-3-an-alternative-view-of-em"
block_ids: ["b4819", "b4820", "b4821", "b4822", "b4823", "b4824", "b4825", "b4826", "b4827", "b4828", "b4829", "b4830", "b4831"]
---

## EM for Gaussian Mixtures

Given a Gaussian mixture model, the goal is to maximize the likelihood function with respect to the parameters (comprising the means and covariances of the components and the mixing coefficients).

1. Initialize the means $\mu _ { k }$ , covariances $\Sigma _ { k }$ and mixing coefficients $\pi _ { k }$ , and evaluate the initial value of the log likelihood.
2. E step. Evaluate the responsibilities using the current parameter values

\gamma (z _ {n k}) = \frac {\pi_ {k} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k} , \boldsymbol {\Sigma} _ {k})}{\sum_ {j = 1} ^ {K} \pi_ {j} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {j} , \boldsymbol {\Sigma} _ {j})}.\tag{9.23}

3. M step. Re-estimate the parameters using the current responsibilities

{\pmb {\mu} _ {k} ^ {\mathrm{new}}} = {\frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} \gamma (z _ {n k}) \mathbf {x} _ {n}}\tag{9.24}

{\pmb {\Sigma} _ {k} ^ {\mathrm{new}}} = {\frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} \gamma (z _ {n k}) (\mathbf {x} _ {n} - \pmb {\mu} _ {k} ^ {\mathrm{new}}) (\mathbf {x} _ {n} - \pmb {\mu} _ {k} ^ {\mathrm{new}}) ^ {\mathrm{T}}}\tag{9.25}

\pi_ {k} ^ {\mathrm{new}} = \frac {N _ {k}}{N}\tag{9.26}

where

N _ {k} = \sum_ {n = 1} ^ {N} \gamma (z _ {n k}).\tag{9.27}

4. Evaluate the log likelihood

\ln p (\mathbf {X} | \boldsymbol {\mu}, \boldsymbol {\Sigma}, \boldsymbol {\pi}) = \sum_ {n = 1} ^ {N} \ln \left\{\sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}) \right\}\tag{9.28}

and check for convergence of either the parameters or the log likelihood. If the convergence criterion is not satisfied return to step 2.
