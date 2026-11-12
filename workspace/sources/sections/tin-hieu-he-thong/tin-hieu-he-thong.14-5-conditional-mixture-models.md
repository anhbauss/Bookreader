---
id: "tin-hieu-he-thong.14-5-conditional-mixture-models"
doc_id: "tin-hieu-he-thong"
title: "14.5. Conditional Mixture Models"
level: 2
heading_path: ["Combining Models", "14.5. Conditional Mixture Models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-4-tree-based-models"
next_id: "tin-hieu-he-thong.14-5-1-mixtures-of-linear-regression-models"
block_ids: ["b7111", "b7112", "b7113"]
---

## 14.5. Conditional Mixture Models

We have seen that standard decision trees are restricted by hard, axis-aligned splits of the input space. These constraints can be relaxed, at the expense of interpretability, by allowing soft, probabilistic splits that can be functions of all of the input variables, not just one of them at a time. If we also give the leaf models a probabilistic interpretation, we arrive at a fully probabilistic tree-based model called the hierarchical mixture of experts, which we consider in Section 14.5.3.

An alternative way to motivate the hierarchical mixture of experts model is to start with a standard probabilistic mixtures of unconditional density models such as Gaussians and replace the component densities with conditional distributions. Here we consider mixtures of linear regression models (Section 14.5.1) and mixtures of logistic regression models (Section 14.5.2). In the simplest case, the mixing coefficients are independent of the input variables. If we make a further generalization to allow the mixing coefficients also to depend on the inputs then we obtain a mixture of experts model. Finally, if we allow each component in the mixture model to be itself a mixture of experts model, then we obtain a hierarchical mixture of experts.
