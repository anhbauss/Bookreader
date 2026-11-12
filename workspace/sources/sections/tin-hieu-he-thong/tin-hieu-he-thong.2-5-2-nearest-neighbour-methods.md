---
id: "tin-hieu-he-thong.2-5-2-nearest-neighbour-methods"
doc_id: "tin-hieu-he-thong"
title: "2.5.2 Nearest-neighbour methods"
level: 2
heading_path: ["Probability Distributions", "2.5.2 Nearest-neighbour methods"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-5-1-kernel-density-estimators"
next_id: "tin-hieu-he-thong.exercises-3"
block_ids: ["b1459", "b1460", "b1461", "b1462", "b1463", "b1464", "b1465", "b1466", "b1467", "b1468", "b1469", "b1470", "b1471", "b1472", "b1473", "b1474", "b1475", "b1476", "b1477", "b1478", "b1479", "b1480", "b1481", "b1482", "b1483", "b1484", "b1485"]
---

## 2.5.2 Nearest-neighbour methods

One of the difficulties with the kernel approach to density estimation is that the parameter h governing the kernel width is fixed for all kernels. In regions of high data density, a large value of h may lead to over-smoothing and a washing out of structure that might otherwise be extracted from the data. However, reducing h may lead to noisy estimates elsewhere in data space where the density is smaller. Thus the optimal choice for h may be dependent on location within the data space. This issue is addressed by nearest-neighbour methods for density estimation.

We therefore return to our general result (2.246) for local density estimation, and instead of fixing V and determining the value of K from the data, we consider a fixed value of K and use the data to find an appropriate value for V . To do this, we consider a small sphere centred on the point x at which we wish to estimate the

Figure 2.26

Illustration of K-nearest-neighbour density estimation using the same data set as in Figures 2.25 and 2.24. We see that the parameter K governs the degree of smoothing, so that a small value of K leads to a very noisy density model (top panel), whereas a large value (bottom panel) smoothes out the bimodal nature of the true distribution (shown by the green curve) from which the data set was generated.

![image](images/part-001--b900113f0d5eb640164af955f07a3b4a5ff0299a43adc70fa79f1d01e03ca800.jpg)

density $p ( \mathbf { x } )$ , and we allow the radius of the sphere to grow until it contains precisely K data points. The estimate of the density $p ( \mathbf { x } )$ is then given by (2.246) with V set to the volume of the resulting sphere. This technique is known as K nearest neighbours and is illustrated in Figure 2.26, for various choices of the parameter $K$ , using the same data set as used in Figure 2.24 and Figure 2.25. We see that the value of K now governs the degree of smoothing and that again there is an optimum choice for K that is neither too large nor too small. Note that the model produced by K nearest neighbours is not a true density model because the integral over all space diverges.

Exercise 2.61

We close this chapter by showing how the K-nearest-neighbour technique for density estimation can be extended to the problem of classification. To do this, we apply the K-nearest-neighbour density estimation technique to each class separately and then make use of Bayes’ theorem. Let us suppose that we have a data set comprising $N _ { k }$ points in class $\mathcal { C } _ { k }$ with N points in total, so that $\textstyle \sum _ { k } N _ { k } = N$ . If we wish to classify a new point x, we draw a sphere centred on x containing precisely K points irrespective of their class. Suppose this sphere has volume V and contains $K _ { k }$ points from class $\mathcal { C } _ { k }$ . Then (2.246) provides an estimate of the density associated with each class

p (\mathbf {x} | \mathcal {C} _ {k}) = \frac {K _ {k}}{N _ {k} V}.\tag{2.253}

Similarly, the unconditional density is given by

p (\mathbf {x}) = \frac {K}{N V}\tag{2.254}

while the class priors are given by

p (\mathcal {C} _ {k}) = \frac {N _ {k}}{N}.\tag{2.255}

We can now combine (2.253), (2.254), and (2.255) using Bayes’ theorem to obtain the posterior probability of class membership

p (\mathcal {C} _ {k} | \mathbf {x}) = \frac {p (\mathbf {x} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k})}{p (\mathbf {x})} = \frac {K _ {k}}{K}.\tag{2.256}

Figure 2.27 (a) In the K-nearestneighbour classifier, a new point, shown by the black diamond, is classified according to the majority class membership of the K closest training data points, in this case $K =$ 3. (b) In the nearest-neighbour $( K = 1 )$ approach to classification, the resulting decision boundary is composed of hyperplanes that form perpendicular bisectors of pairs of points from different classes.

![image](images/part-001--dbe2269b10bf987212abe2f4d631136093cb921feee2f268e4e04368e05ffeb5.jpg)

![image](images/part-001--6c9e3f9e1d9c62f6c21b108c9dbbfecc983ced8ec91998c3d3db92d0e4831abd.jpg)

If we wish to minimize the probability of misclassification, this is done by assigning the test point x to the class having the largest posterior probability, corresponding to the largest value of $K _ { k } / K$ . Thus to classify a new point, we identify the K nearest points from the training data set and then assign the new point to the class having the largest number of representatives amongst this set. Ties can be broken at random. The particular case of $K = 1$ is called the nearest-neighbour rule, because a test point is simply assigned to the same class as the nearest point from the training set. These concepts are illustrated in Figure 2.27.

In Figure 2.28, we show the results of applying the K-nearest-neighbour algorithm to the oil flow data, introduced in Chapter 1, for various values of K. As expected, we see that K controls the degree of smoothing, so that small K produces many small regions of each class, whereas large K leads to fewer larger regions.

![image](images/part-001--d1f0bd1ff65614f2bf4aded88f609652008e44ca84d4358f29900e30f3fcd6fb.jpg)

![image](images/part-001--bbf7510ba4228b58e73a80370d678d36313eeeb4f586315c7c064c2c1b4c786a.jpg)

![image](images/part-001--245f2ac59877868e0ac3ae68bd626691231d8689ac27aaab87c39de924a550f8.jpg)

Figure 2.28 Plot of 200 data points from the oil data set showing values of $x _ { 6 }$ plotted against $x _ { 7 } ,$ , where the red, green, and blue points correspond to the ‘laminar’, ‘annular’, and ‘homogeneous’ classes, respectively. Also shown are the classifications of the input space given by the K-nearest-neighbour algorithm for various values of $K$

An interesting property of the nearest-neighbour (K = 1) classifier is that, in the limit $N \to \infty$ , the error rate is never more than twice the minimum achievable error rate of an optimal classifier, i.e., one that uses the true class distributions (Cover and Hart, 1967) .

As discussed so far, both the K-nearest-neighbour method, and the kernel density estimator, require the entire training data set to be stored, leading to expensive computation if the data set is large. This effect can be offset, at the expense of some additional one-off computation, by constructing tree-based search structures to allow (approximate) near neighbours to be found efficiently without doing an exhaustive search of the data set. Nevertheless, these nonparametric methods are still severely limited. On the other hand, we have seen that simple parametric models are very restricted in terms of the forms of distribution that they can represent. We therefore need to find density models that are very flexible and yet for which the complexity of the models can be controlled independently of the size of the training set, and we shall see in subsequent chapters how to achieve this.
