---
id: "tin-hieu-he-thong.marginal-and-conditional-gaussians"
doc_id: "tin-hieu-he-thong"
title: "Marginal and Conditional Gaussians"
level: 2
heading_path: ["Probability Distributions", "Marginal and Conditional Gaussians"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-3-bayes-theorem-for-gaussian-variables"
next_id: "tin-hieu-he-thong.2-3-4-maximum-likelihood-for-the-gaussian"
block_ids: ["b1065", "b1066", "b1067", "b1068", "b1069", "b1070", "b1071", "b1072", "b1073"]
---

## Marginal and Conditional Gaussians

Given a marginal Gaussian distribution for x and a conditional Gaussian distribution for y given x in the form

{p (\mathbf {x})} = {\mathcal {N} (\mathbf {x} | \pmb {\mu}, \pmb {\Lambda} ^ {- 1})}\tag{2.113}

p (\mathbf {y} | \mathbf {x}) = \mathcal {N} (\mathbf {y} | \mathbf {A x} + \mathbf {b}, \mathbf {L} ^ {- 1})\tag{2.114}

the marginal distribution of $\mathbf { y }$ and the conditional distribution of x given y are given by

p (\mathbf {y}) = \mathcal {N} (\mathbf {y} | \mathbf {A} \boldsymbol {\mu} + \mathbf {b}, \mathbf {L} ^ {- 1} + \mathbf {A} \boldsymbol {\Lambda} ^ {- 1} \mathbf {A} ^ {\mathrm{T}})\tag{2.115}

{p (\mathbf {x} | \mathbf {y})} = {\mathcal {N} (\mathbf {x} | \boldsymbol {\Sigma} \{\mathbf {A} ^ {\mathrm{T}} \mathbf {L} (\mathbf {y} - \mathbf {b}) + \boldsymbol {\Lambda} \boldsymbol {\mu} \}, \boldsymbol {\Sigma})}\tag{2.116}

where

\boldsymbol {\Sigma} = \left(\boldsymbol {\Lambda} + \mathbf {A} ^ {\mathrm{T}} \mathbf {L} \mathbf {A}\right) ^ {- 1}.\tag{2.117}
