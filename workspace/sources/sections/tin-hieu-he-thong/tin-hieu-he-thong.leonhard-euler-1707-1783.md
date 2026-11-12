---
id: "tin-hieu-he-thong.leonhard-euler-1707-1783"
doc_id: "tin-hieu-he-thong"
title: "Leonhard Euler 1707\u20131783"
level: 2
heading_path: ["Approximate Inference", "Leonhard Euler 1707\u20131783"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-1-1-factorized-distributions"
next_id: "tin-hieu-he-thong.10-1-2-properties-of-factorized-approximations"
block_ids: ["b5082", "b5083", "b5084", "b5085", "b5086", "b5087", "b5088", "b5089", "b5090", "b5091"]
---

## Leonhard Euler 1707–1783

Euler was a Swiss mathematician and physicist who worked in St. Petersburg and Berlin and who is widely considered to be one of the greatest mathematicians of all time. He is certainly the most prolific, and

his collected works fill 75 volumes. Amongst his many contributions, he formulated the modern theory of the function, he developed (together with Lagrange) the calculus of variations, and he discovered the formula $e ^ { i \pi } ~ = ~ - 1$ which relates four of the most important numbers in mathematics. During the last 17 years of his life, he was almost totally blind, and yet he produced nearly half of his results during this period.

divergence, and the minimum occurs when $q _ { j } ( \mathbf { Z } _ { j } ) = \widetilde { p } ( \mathbf { X } , \mathbf { Z } _ { j } )$ . Thus we obtain a general expression for the optimal solution $q _ { j } ^ { \star } ( \mathbf { Z } _ { j } )$ given by

\ln q _ {j} ^ {\star} (\mathbf {Z} _ {j}) = \mathbb {E} _ {i \neq j} [ \ln p (\mathbf {X}, \mathbf {Z}) ] + \mathrm{const.}\tag{10.9}

It is worth taking a few moments to study the form of this solution as it provides the basis for applications of variational methods. It says that the log of the optimal solution for factor $q _ { j }$ is obtained simply by considering the log of the joint distribution over all hidden and visible variables and then taking the expectation with respect to all of the other factors $\{ q _ { i } \}$ for $i \neq j$

The additive constant in (10.9) is set by normalizing the distribution $q _ { j } ^ { \star } ( \mathbf { Z } _ { j } )$ Thus if we take the exponential of both sides and normalize, we have

q _ {j} ^ {\star} (\mathbf {Z} _ {j}) = \frac {\exp \left(\mathbb {E} _ {i \neq j} [ \ln p (\mathbf {X} , \mathbf {Z}) ]\right)}{\int \exp \left(\mathbb {E} _ {i \neq j} [ \ln p (\mathbf {X} , \mathbf {Z}) ]\right) \mathrm{d} \mathbf {Z} _ {j}}.

In practice, we shall find it more convenient to work with the form (10.9) and then reinstate the normalization constant (where required) by inspection. This will become clear from subsequent examples.

The set of equations given by (10.9) for $j = 1 , \dots , M$ represent a set of consistency conditions for the maximum of the lower bound subject to the factorization constraint. However, they do not represent an explicit solution because the expression on the right-hand side of (10.9) for the optimum $q _ { j } ^ { \star } ( \mathbf { Z } _ { j } )$ depends on expectations computed with respect to the other factors $q _ { i } ( \mathbf { Z } _ { i } )$ for $i \neq j$ . We will therefore seek a consistent solution by first initializing all of the factors $q _ { i } ( \mathbf { Z } _ { i } )$ appropriately and then cycling through the factors and replacing each in turn with a revised estimate given by the right-hand side of (10.9) evaluated using the current estimates for all of the other factors. Convergence is guaranteed because bound is convex with respect to each of the factors $q _ { i } ( \mathbf { Z } _ { i } )$ (Boyd and Vandenberghe, 2004).
