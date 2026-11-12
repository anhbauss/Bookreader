---
id: "tin-hieu-he-thong.4-1-3-least-squares-for-classification"
doc_id: "tin-hieu-he-thong"
title: "4.1.3 Least squares for classification"
level: 2
heading_path: ["4 Linear Models for Classification", "4.1.3 Least squares for classification"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-1-2-multiple-classes"
next_id: "tin-hieu-he-thong.4-1-4-fisher-s-linear-discriminant"
block_ids: ["b2108", "b2109", "b2110", "b2111", "b2112", "b2113", "b2114", "b2115", "b2116", "b2117", "b2118", "b2119", "b2120", "b2121", "b2122", "b2123", "b2124", "b2125", "b2126", "b2127", "b2128", "b2129", "b2130", "b2131"]
---

## 4.1.3 Least squares for classification

In Chapter 3, we considered models that were linear functions of the parameters, and we saw that the minimization of a sum-of-squares error function led to a simple closed-form solution for the parameter values. It is therefore tempting to see if we can apply the same formalism to classification problems. Consider a general classification problem with K classes, with a 1-of-K binary coding scheme for the target vector t. One justification for using least squares in such a context is that it approximates the conditional expectation $\mathbb { E } [ \mathbf { t } | \mathbf { x } ]$ of the target values given the input vector. For the binary coding scheme, this conditional expectation is given by the vector of posterior class probabilities. Unfortunately, however, these probabilities are typically approximated rather poorly, indeed the approximations can have values outside the range (0, 1), due to the limited flexibility of a linear model as we shall see shortly.

Each class $\mathcal { C } _ { k }$ is described by its own linear model so that

y _ {k} (\mathbf {x}) = \mathbf {w} _ {k} ^ {\mathrm{T}} \mathbf {x} + w _ {k 0}\tag{4.13}

where $k = 1 , \ldots , K$ . We can conveniently group these together using vector notation so that

\mathbf {y} (\mathbf {x}) = \widetilde {\mathbf {W}} ^ {\mathrm{T}} \widetilde {\mathbf {x}}\tag{4.14}

where $\widetilde { \bf W }$ is a matrix whose $k ^ { \mathrm { t h } }$ column comprises the $D + 1$ -dimensional vector $\widetilde { \mathbf { w } } _ { k } = ( w _ { k 0 } , \mathbf { w } _ { k } ^ { \mathrm { T } } ) ^ { \mathrm { T } }$ and $\widetilde { \mathbf { x } }$ is the corresponding augmented input vector $( 1 , \mathbf { x } ^ { \mathrm { T } } ) ^ { \mathrm { T } }$ with a dummy input $x _ { 0 } = 1$ . This representation was discussed in detail in Section 3.1. A new input x is then assigned to the class for which the output $y _ { k } = \widetilde { \mathbf { w } } _ { k } ^ { \mathrm { T } } \widetilde { \mathbf { x } }$ is largest.

We now determine the parameter matrix $\widetilde { \bf W }$  by minimizing a sum-of-squares ,error function, as we did for regression in Chapter 3. Consider a training data set $\{ \mathbf { x } _ { n } , \mathbf { t } _ { n } \}$ where $n = 1 , \ldots , N$ , and define a matrix T whose $n ^ { \mathrm { t h } }$ row is the vector $\mathbf { t } _ { n } ^ { \mathrm { T } }$ together with a matrix $\widetilde { \mathbf { X } }$ whose $n ^ { \mathrm { t h } }$ row is $\widetilde { \mathbf { x } } _ { n } ^ { \mathrm { { T } } }$ . The sum-of-squares error function can then be written as

E _ {D} (\widetilde {\mathbf {W}}) = \frac {1}{2} \mathrm{Tr} \left\{(\widetilde {\mathbf {X}} \widetilde {\mathbf {W}} - \mathbf {T}) ^ {\mathrm{T}} (\widetilde {\mathbf {X}} \widetilde {\mathbf {W}} - \mathbf {T}) \right\}.\tag{4.15}

Setting the derivative with respect to $\widetilde { \bf W }$ to zero, and rearranging, we then obtain the solution for $\widetilde { \mathbf { W } }$ in the form

\widetilde {\mathbf {W}} = (\widetilde {\mathbf {X}} ^ {\mathrm{T}} \widetilde {\mathbf {X}}) ^ {- 1} \widetilde {\mathbf {X}} ^ {\mathrm{T}} \mathbf {T} = \widetilde {\mathbf {X}} ^ {\dagger} \mathbf {T}\tag{4.16}

where $\widetilde { \mathbf { X } } ^ { \dagger }$ is the pseudo-inverse of the matrix $\widetilde { \mathbf { X } } ,$ , as discussed in Section 3.1.1. We  then obtain the discriminant function in the form

\mathbf {y} (\mathbf {x}) = \widetilde {\mathbf {W}} ^ {\mathrm{T}} \widetilde {\mathbf {x}} = \mathbf {T} ^ {\mathrm{T}} \left(\widetilde {\mathbf {X}} ^ {\dagger}\right) ^ {\mathrm{T}} \widetilde {\mathbf {x}}.\tag{4.17}

An interesting property of least-squares solutions with multiple target variables is that if every target vector in the training set satisfies some linear constraint

\mathbf {a} ^ {\mathrm{T}} \mathbf {t} _ {n} + b = 0\tag{4.18}

for some constants a and b, then the model prediction for any value of x will satisfy the same constraint so that

\mathbf {a} ^ {\mathrm{T}} \mathbf {y} (\mathbf {x}) + b = 0.\tag{4.19}

Thus if we use a 1-of-K coding scheme for K classes, then the predictions made by the model will have the property that the elements of $\mathbf { y } ( \mathbf { x } )$ will sum to 1 for any value of x. However, this summation constraint alone is not sufficient to allow the model outputs to be interpreted as probabilities because they are not constrained to lie within the interval (0, 1).

The least-squares approach gives an exact closed-form solution for the discriminant function parameters. However, even as a discriminant function (where we use it to make decisions directly and dispense with any probabilistic interpretation) it suffers from some severe problems. We have already seen that least-squares solutions lack robustness to outliers, and this applies equally to the classification application, as illustrated in Figure 4.4. Here we see that the additional data points in the righthand figure produce a significant change in the location of the decision boundary, even though these point would be correctly classified by the original decision boundary in the left-hand figure. The sum-of-squares error function penalizes predictions that are ‘too correct’ in that they lie a long way on the correct side of the decision boundary. In Section 7.1.2, we shall consider several alternative error functions for classification and we shall see that they do not suffer from this difficulty.

![image](images/part-002--ddab55d97d8a8191decf8980c5dbe8b452bdcc14e8edf9ac5002efd56b683903.jpg)

![image](images/part-002--c34a13b92358e05225fac551548df796aedad40cef7c63019c6f727f1f28e29d.jpg)

Figure 4.4 The left plot shows data from two classes, denoted by red crosses and blue circles, together with the decision boundary found by least squares (magenta curve) and also by the logistic regression model (green curve), which is discussed later in Section 4.3.2. The right-hand plot shows the corresponding results obtained when extra data points are added at the bottom left of the diagram, showing that least squares is highly sensitive to outliers, unlike logistic regression.

However, problems with least squares can be more severe than simply lack of robustness, as illustrated in Figure 4.5. This shows a synthetic data set drawn from three classes in a two-dimensional input space $( x _ { 1 } , x _ { 2 } )$ , having the property that lin ear decision boundaries can give excellent separation between the classes. Indeed, the technique of logistic regression, described later in this chapter, gives a satisfactory solution as seen in the right-hand plot. However, the least-squares solution gives poor results, with only a small region of the input space assigned to the green class.

The failure of least squares should not surprise us when we recall that it corresponds to maximum likelihood under the assumption of a Gaussian conditional distribution, whereas binary target vectors clearly have a distribution that is far from Gaussian. By adopting more appropriate probabilistic models, we shall obtain classification techniques with much better properties than least squares. For the moment, however, we continue to explore alternative nonprobabilistic methods for setting the parameters in the linear classification models.
