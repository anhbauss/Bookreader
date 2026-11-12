---
id: "tin-hieu-he-thong.10-1-4-model-comparison"
doc_id: "tin-hieu-he-thong"
title: "10.1.4 Model comparison"
level: 2
heading_path: ["Approximate Inference", "10.1.4 Model comparison"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-1-3-example-the-univariate-gaussian"
next_id: "tin-hieu-he-thong.10-2-illustration-variational-mixture-of-gaussians"
block_ids: ["b5171", "b5172", "b5173", "b5174", "b5175", "b5176", "b5177", "b5178"]
---

## 10.1.4 Model comparison

As well as performing inference over the hidden variables Z, we may also wish to compare a set of candidate models, labelled by the index m, and having prior probabilities $p ( m )$ . Our goal is then to approximate the posterior probabilities $p ( m | \mathbf { X } )$ , where X is the observed data. This is a slightly more complex situation than that considered so far because different models may have different structure and indeed different dimensionality for the hidden variables Z. We cannot therefore simply consider a factorized approximation $q ( \mathbf { Z } ) q ( m )$ , but must instead recognize that the posterior over Z must be conditioned on m, and so we must consider $q ( \mathbf { Z } , m ) = q ( \mathbf { Z } | m ) q ( m )$ . We can readily verify the following decomposition based on this variational distribution

\ln p (\mathbf {X}) = \mathcal {L} _ {m} - \sum_ {m} \sum_ {\mathbf {Z}} q (\mathbf {Z} | m) q (m) \ln \left\{\frac {p (\mathbf {Z} , m | \mathbf {X})}{q (\mathbf {Z} | m) q (m)} \right\}\tag{10.34}

where the ${ \mathcal { L } } _ { m }$ is a lower bound on ln $p ( \mathbf { X } )$ and is given by

\mathcal {L} _ {m} = \sum_ {m} \sum_ {\mathbf {Z}} q (\mathbf {Z} | m) q (m) \ln \left\{\frac {p (\mathbf {Z} , \mathbf {X} , m)}{q (\mathbf {Z} | m) q (m)} \right\}.\tag{10.35}

Here we are assuming discrete Z, but the same analysis applies to continuous latent variables provided the summations are replaced with integrations. We can maximize ${ \mathcal { L } } _ { m }$ with respect to the distribution $q ( m )$ using a Lagrange multiplier, with the result

q (m) \propto p (m) \exp \{\mathcal {L} _ {m} \}.\tag{10.36}

However, if we maximize ${ \mathcal { L } } _ { m }$ with respect to the $q ( \mathbf { Z } | m )$ , we find that the solutions for different m are coupled, as we expect because they are conditioned on m. We proceed instead by first optimizing each of the $q ( \mathbf { Z } | m )$ individually by optimization of (10.35), and then subsequently determining the $q ( m )$ using (10.36). After normalization the resulting values for $q ( m )$ can be used for model selection or model averaging in the usual way.
