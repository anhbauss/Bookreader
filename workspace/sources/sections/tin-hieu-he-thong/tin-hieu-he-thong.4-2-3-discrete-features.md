---
id: "tin-hieu-he-thong.4-2-3-discrete-features"
doc_id: "tin-hieu-he-thong"
title: "4.2.3 Discrete features"
level: 2
heading_path: ["4 Linear Models for Classification", "4.2.3 Discrete features"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-2-2-maximum-likelihood-solution"
next_id: "tin-hieu-he-thong.4-2-4-exponential-family"
block_ids: ["b2318", "b2319", "b2320", "b2321", "b2322", "b2323"]
---

## 4.2.3 Discrete features

Let us now consider the case of discrete feature values $x _ { i }$ . For simplicity, we begin by looking at binary feature values $x _ { i } \in \{ 0 , 1 \}$ and discuss the extension to more general discrete features shortly. If there are $D$ inputs, then a general distribution would correspond to a table of $\mathrm { \dot { 2 } } ^ { D }$ numbers for each class, containing $2 ^ { D } - 1$ independent variables (due to the summation constraint). Because this grows exponentially with the number of features, we might seek a more restricted representation. Here we will make the naive Bayes assumption in which the feature values are treated as independent, conditioned on the class $\mathcal { C } _ { k }$ . Thus we have class-conditional distributions of the form

p (\mathbf {x} | \mathcal {C} _ {k}) = \prod_ {i = 1} ^ {D} \mu_ {k i} ^ {x _ {i}} (1 - \mu_ {k i}) ^ {1 - x _ {i}}\tag{4.81}

which contain D independent parameters for each class. Substituting into (4.63) then gives

a _ {k} (\mathbf {x}) = \sum_ {i = 1} ^ {D} \left\{x _ {i} \ln \mu_ {k i} + (1 - x _ {i}) \ln (1 - \mu_ {k i}) \right\} + \ln p (\mathcal {C} _ {k})\tag{4.82}

which again are linear functions of the input values $x _ { i }$ . For the case of $K = 2$ classes, we can alternatively consider the logistic sigmoid formulation given by (4.57). Analogous results are obtained for discrete variables each of which can take $M \ > \ 2$ states.
