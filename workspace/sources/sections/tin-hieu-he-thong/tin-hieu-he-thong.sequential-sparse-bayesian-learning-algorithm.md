---
id: "tin-hieu-he-thong.sequential-sparse-bayesian-learning-algorithm"
doc_id: "tin-hieu-he-thong"
title: "Sequential Sparse Bayesian Learning Algorithm"
level: 2
heading_path: ["Sparse Kernel Machines", "Sequential Sparse Bayesian Learning Algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.7-2-2-analysis-of-sparsity"
next_id: "tin-hieu-he-thong.7-2-3-rvm-for-classification"
block_ids: ["b3982", "b3983", "b3984", "b3985", "b3986", "b3987", "b3988", "b3989", "b3990", "b3991", "b3992", "b3993", "b3994", "b3995"]
---

## Sequential Sparse Bayesian Learning Algorithm

1. If solving a regression problem, initialize $\beta .$
2. Initialize using one basis function $\varphi _ { 1 }$ , with hyperparameter $\alpha _ { 1 }$ set using (7.101), with the remaining hyperparameters $\alpha _ { j }$ for $j \neq i$ initialized to infinity, so that only $\varphi _ { 1 }$ is included in the model.
3. Evaluate $\pmb { \Sigma }$ and m, along with $q _ { i }$ and $s _ { i }$ for all basis functions.
4. Select a candidate basis function $\varphi _ { i }$
5. If $q _ { i } ^ { 2 } > s _ { i }$ , and $\alpha _ { i } < \infty$ , so that the basis vector $\varphi _ { i }$ is already included in the model, then update $\alpha _ { i }$ using (7.101).
6. If $q _ { i } ^ { 2 } > s _ { i }$ , and $\alpha _ { i } = \infty$ , then add $\varphi _ { i }$ to the model, and evaluate hyperparameter $\alpha _ { i }$ using (7.101).
7. If $q _ { i } ^ { 2 } \leqslant s _ { i } .$ , and $\alpha _ { i } < \infty$ then remove basis function $\varphi _ { i }$ from the model, and set $\alpha _ { i } = \infty$
8. If solving a regression problem, update $\beta$
9. If converged terminate, otherwise go to 3.

Note that if $q _ { i } ^ { 2 } \leqslant s _ { i }$ and $\alpha _ { i } = \infty$ , then the basis function $\varphi _ { i }$ is already excluded from the model and no action is required.

In practice, it is convenient to evaluate the quantities

Q _ {i} = \varphi_ {i} ^ {\mathrm{T}} \mathbf {C} ^ {- 1} \mathbf {t}\tag{7.102}

{S _ {i}} = {\varphi_ {i} ^ {\mathrm{T}} \mathbf {C} ^ {- 1} \varphi_ {i}.}\tag{7.103}

The quality and sparseness variables can then be expressed in the form

{q _ {i}} = {\frac {\alpha_ {i} Q _ {i}}{\alpha_ {i} - S _ {i}}}\tag{7.104}

s _ {i} = \frac {\alpha_ {i} S _ {i}}{\alpha_ {i} - S _ {i}}.\tag{7.105}

Exercise 7.17

Note that when $\alpha _ { i } = \infty$ , we have $q _ { i } = Q _ { i }$ and $s _ { i } = S _ { i }$ . Using (C.7), we can write

{Q _ {i}} = {\beta \varphi_ {i} ^ {\mathrm{T}} \mathbf {t} - \beta^ {2} \varphi_ {i} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Sigma} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}}\tag{7.106}

{S _ {i}} = {\beta \pmb {\varphi} _ {i} ^ {\mathrm{T}} \pmb {\varphi} _ {i} - \beta^ {2} \pmb {\varphi} _ {i} ^ {\mathrm{T}} \pmb {\Phi} \pmb {\Sigma} \pmb {\Phi} ^ {\mathrm{T}} \pmb {\varphi} _ {i}}\tag{7.107}

where $\Phi$ and Σ involve only those basis vectors that correspond to finite hyperparameters $\alpha _ { i }$ . At each stage the required computations therefore scale like $O ( M ^ { 3 } )$ , where M is the number of active basis vectors in the model and is typically much smaller than the number $N$ of training patterns.
