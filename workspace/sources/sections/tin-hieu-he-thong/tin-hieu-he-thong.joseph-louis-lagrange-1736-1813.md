---
id: "tin-hieu-he-thong.joseph-louis-lagrange-1736-1813"
doc_id: "tin-hieu-he-thong"
title: "Joseph-Louis Lagrange 1736\u20131813"
level: 2
heading_path: ["Sparse Kernel Machines", "Joseph-Louis Lagrange 1736\u20131813"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.7-1-maximum-margin-classifiers"
next_id: "tin-hieu-he-thong.7-1-1-overlapping-class-distributions"
block_ids: ["b3726", "b3727", "b3728", "b3729", "b3730", "b3731", "b3732", "b3733", "b3734", "b3735", "b3736", "b3737", "b3738", "b3739", "b3740", "b3741", "b3742", "b3743", "b3744", "b3745"]
---

## Joseph-Louis Lagrange 1736–1813

Although widely considered to be a French mathematician, Lagrange was born in Turin in Italy. By the age of nineteen, he had already made important contributions mathematics and had been appointed as Pro-

fessor at the Royal Artillery School in Turin. For many years, Euler worked hard to persuade Lagrange to move to Berlin, which he eventually did in 1766 where he succeeded Euler as Director of Mathematics at the Berlin Academy. Later he moved to Paris, narrowly escaping with his life during the French revolution thanks to the personal intervention of Lavoisier (the French chemist who discovered oxygen) who himself was later executed at the guillotine. Lagrange made key contributions to the calculus of variations and the foundations of dynamics.

In Appendix E, we show that a constrained optimization of this form satisfies the Karush-Kuhn-Tucker (KKT) conditions, which in this case require that the following three properties hold

a _ {n} \geqslant 0\tag{7.14}

t _ {n} y (\mathbf {x} _ {n}) - 1 \geqslant 0\tag{7.15}

a _ {n} \left\{t _ {n} y (\mathbf {x} _ {n}) - 1 \right\} = 0.\tag{7.16}

Thus for every data point, either $a _ { n } ~ = ~ 0$ or $t _ { n } y ( \mathbf { x } _ { n } ) ~ = ~ 1$ . Any data point for which $a _ { n } = 0$ will not appear in the sum in (7.13) and hence plays no role in making predictions for new data points. The remaining data points are called support vectors, and because they satisfy $t _ { n } y ( \mathbf { x } _ { n } ) ~ = ~ 1$ , they correspond to points that lie on the maximum margin hyperplanes in feature space, as illustrated in Figure 7.1. This property is central to the practical applicability of support vector machines. Once the model is trained, a significant proportion of the data points can be discarded and only the support vectors retained.

Having solved the quadratic programming problem and found a value for a, we can then determine the value of the threshold parameter b by noting that any support vector ${ \bf x } _ { n }$ satisfies $t _ { n } y ( \mathbf x _ { n } ) = 1$ . Using (7.13) this gives

t _ {n} \left(\sum_ {m \in \mathcal {S}} a _ {m} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) + b\right) = 1\tag{7.17}

where $s$ denotes the set of indices of the support vectors. Although we can solve this equation for b using an arbitrarily chosen support vector ${ \bf x } _ { n }$ , a numerically more stable solution is obtained by first multiplying through by $t _ { n }$ , making use of $\dot { t } _ { n } ^ { 2 } = 1$ and then averaging these equations over all support vectors and solving for b to give

b = \frac {1}{N _ {\mathcal {S}}} \sum_ {n \in \mathcal {S}} \left(t _ {n} - \sum_ {m \in \mathcal {S}} a _ {m} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\right)\tag{7.18}

where $N _ { S }$ is the total number of support vectors.

For later comparison with alternative models, we can express the maximummargin classifier in terms of the minimization of an error function, with a simple quadratic regularizer, in the form

\sum_ {n = 1} ^ {N} E _ {\infty} (y (\mathbf {x} _ {n}) t _ {n} - 1) + \lambda \| \mathbf {w} \| ^ {2}\tag{7.19}

where $E _ { \infty } ( z )$ is a function that is zero $\mathrm { i f } \ z \geqslant 0$ and $\infty$ otherwise and ensures that the constraints (7.5) are satisfied. Note that as long as the regularization parameter satisfies $\lambda > 0$ , its precise value plays no role.

Figure 7.2 shows an example of the classification resulting from training a support vector machine on a simple synthetic data set using a Gaussian kernel of the form (6.23). Although the data set is not linearly separable in the two-dimensional data space x, it is linearly separable in the nonlinear feature space defined implicitly by the nonlinear kernel function. Thus the training data points are perfectly separated in the original data space.

Example of synthetic data from two classes in two dimensions showing contours of constant $y ( \mathbf x )$ obtained from a support vector machine having a Gaussian kernel function. Also shown are the decision boundary, the margin boundaries, and the support vectors.

![image](images/part-002--08b85d37340b67bd5b2257299c220a5d19aed22ef679456af346793b0400bf0d.jpg)

This example also provides a geometrical insight into the origin of sparsity in the SVM. The maximum margin hyperplane is defined by the location of the support vectors. Other data points can be moved around freely (so long as they remain outside the margin region) without changing the decision boundary, and so the solution will be independent of such data points.
