---
id: "tin-hieu-he-thong.4-1-7-the-perceptron-algorithm"
doc_id: "tin-hieu-he-thong"
title: "4.1.7 The perceptron algorithm"
level: 2
heading_path: ["4 Linear Models for Classification", "4.1.7 The perceptron algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-1-6-fisher-s-discriminant-for-multiple-classes"
next_id: "tin-hieu-he-thong.frank-rosenblatt-1928-1969"
block_ids: ["b2212", "b2213", "b2214", "b2215", "b2216", "b2217", "b2218", "b2219", "b2220", "b2221"]
---

## 4.1.7 The perceptron algorithm

Another example of a linear discriminant model is the perceptron of Rosenblatt (1962), which occupies an important place in the history of pattern recognition algorithms. It corresponds to a two-class model in which the input vector x is first transformed using a fixed nonlinear transformation to give a feature vector $\phi ( \mathbf { x } )$ , and this is then used to construct a generalized linear model of the form

y (\mathbf {x}) = f \left(\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x})\right)\tag{4.52}

where the nonlinear activation function $f ( \cdot )$ is given by a step function of the form

f (a) = \left\{ \begin{array}{l l} + 1, & a \geqslant 0 \\ - 1, & a <   0. \end{array} \right.\tag{4.53}

The vector $\phi ( \mathbf { x } )$ will typically include a bias component $\phi _ { 0 } ( \mathbf { x } ) = 1$ . In earlier discussions of two-class classification problems, we have focussed on a target coding scheme in which $t \in \{ 0 , 1 \}$ , which is appropriate in the context of probabilistic models. For the perceptron, however, it is more convenient to use target values $t = + 1$ for class $\mathcal { C } _ { 1 }$ and $t = - 1$ for class $\mathcal { C } _ { 2 }$ , which matches the choice of activation function.

The algorithm used to determine the parameters w of the perceptron can most easily be motivated by error function minimization. A natural choice of error function would be the total number of misclassified patterns. However, this does not lead to a simple learning algorithm because the error is a piecewise constant function of w, with discontinuities wherever a change in w causes the decision boundary to move across one of the data points. Methods based on changing w using the gradient of the error function cannot then be applied, because the gradient is zero almost everywhere.

We therefore consider an alternative error function known as the perceptron criterion. To derive this, we note that we are seeking a weight vector w such that patterns ${ \bf x } _ { n }$ in class $\mathcal { C } _ { 1 }$ will have $\mathbf { w } ^ { \mathrm { T } } \phi ( \mathbf { x } _ { n } ) > 0$ , whereas patterns ${ \bf x } _ { n }$ in class $\mathcal { C } _ { 2 }$ have ${ \bf w } ^ { \mathrm { T } } \phi ( { \bf x } _ { n } ) < 0$ . Using the $t \in \{ - 1 , + 1 \}$ target coding scheme it follows that we would like all patterns to satisfy $\mathbf { w } ^ { \mathrm { T } } \phi ( \mathbf { x } _ { n } ) t _ { n } \ > \ 0$ The perceptron criterion associates zero error with any pattern that is correctly classified, whereas for a misclassified pattern ${ \bf x } _ { n }$ it tries to minimize the quantity $- \mathbf { w } ^ { \mathrm { T } } \phi ( \mathbf { x } _ { n } ) t _ { n }$ . The perceptron criterion is therefore given by

E _ {\mathrm{P}} (\mathbf {w}) = - \sum_ {n \in \mathcal {M}} \mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n}\tag{4.54}

![image](images/part-002--ead7a3a44e25ac57406b566b6aad3f11e0d4d610e0dc6aca6823fd593c4a3f92.jpg)
