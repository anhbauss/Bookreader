---
id: "tin-hieu-he-thong.10-3-2-predictive-distribution"
doc_id: "tin-hieu-he-thong"
title: "10.3.2 Predictive distribution"
level: 2
heading_path: ["Approximate Inference", "10.3.2 Predictive distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-3-1-variational-distribution"
next_id: "tin-hieu-he-thong.10-3-3-lower-bound"
block_ids: ["b5359", "b5360", "b5361", "b5362", "b5363", "b5364"]
---

## 10.3.2 Predictive distribution

The predictive distribution over t, given a new input x, is easily evaluated for this model using the Gaussian variational posterior for the parameters

\begin{array}{r c l} p (t | \mathbf {x}, \mathbf {t}) & = & \int p (t | \mathbf {x}, \mathbf {w}) p (\mathbf {w} | \mathbf {t})   \mathrm{d} \mathbf {w} \\ & \simeq & \int p (t | \mathbf {x}, \mathbf {w}) q (\mathbf {w})   \mathrm{d} \mathbf {w} \\ & = & \int \mathcal {N} (t | \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x}), \beta^ {- 1}) \mathcal {N} (\mathbf {w} | \mathbf {m} _ {N}, \mathbf {S} _ {N})   \mathrm{d} \mathbf {w} \\ & = & \mathcal {N} (t | \mathbf {m} _ {N} ^ {\mathrm{T}} \phi (\mathbf {x}), \sigma^ {2} (\mathbf {x})) \end{array}\tag{10.105}

where we have evaluated the integral by making use of the result (2.115) for the linear-Gaussian model. Here the input-dependent variance is given by

\sigma^ {2} (\mathbf {x}) = \frac {1}{\beta} + \phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {S} _ {N} \phi (\mathbf {x}).\tag{10.106}

Note that this takes the same form as the result (3.59) obtained with fixed α except that now the expected value $\mathbb { E } [ \alpha ]$ appears in the definition of $\mathbf { S } _ { N }$
