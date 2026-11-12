---
id: "tin-hieu-he-thong.4-1-4-fisher-s-linear-discriminant"
doc_id: "tin-hieu-he-thong"
title: "4.1.4 Fisher\u2019s linear discriminant"
level: 2
heading_path: ["4 Linear Models for Classification", "4.1.4 Fisher\u2019s linear discriminant"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-1-3-least-squares-for-classification"
next_id: "tin-hieu-he-thong.4-1-5-relation-to-least-squares"
block_ids: ["b2132", "b2133", "b2134", "b2135", "b2136", "b2137", "b2138", "b2139", "b2140", "b2141", "b2142", "b2143", "b2144", "b2145", "b2146", "b2147", "b2148", "b2149", "b2150", "b2151", "b2152", "b2153", "b2154", "b2155", "b2156", "b2157", "b2158", "b2159", "b2160", "b2161", "b2162", "b2163"]
---

## 4.1.4 Fisher’s linear discriminant

One way to view a linear classification model is in terms of dimensionality reduction. Consider first the case of two classes, and suppose we take the Ddimensional input vector x and project it down to one dimension using

![image](images/part-002--0cd1788b366f62ba981b324517f1fa15d469f40f664e099f0ce3788db70e6174.jpg)

![image](images/part-002--f3d80ef53b30a78981a6f2b9c8616c5a21547fa6202b447600a754309027db1d.jpg)

Figure 4.5 Example of a synthetic data set comprising three classes, with training data points denoted in red ( ), green (+), and blue ( ). Lines denote the decision boundaries, and the background colours denote the respective classes of the decision regions. On the left is the result of using a least-squares discriminant. We see that the region of input space assigned to the green class is too small and so most of the points from this class are misclassified. On the right is the result of using logistic regressions as described in Section 4.3.2 showing correct classification of the training data.

y = \mathbf {w} ^ {\mathrm{T}} \mathbf {x}.\tag{4.20}

If we place a threshold on y and classify $y \geqslant - w _ { 0 }$ as class $\mathcal { C } _ { 1 }$ , and otherwise class $\mathcal { C } _ { 2 }$ , then we obtain our standard linear classifier discussed in the previous section. In general, the projection onto one dimension leads to a considerable loss of information, and classes that are well separated in the original D-dimensional space may become strongly overlapping in one dimension. However, by adjusting the components of the weight vector w, we can select a projection that maximizes the class separation. To begin with, consider a two-class problem in which there are $N _ { 1 }$ points of class $\mathcal { C } _ { 1 }$ and ${ \dot { N _ { 2 } } }$ points of class $\mathcal { C } _ { 2 }$ , so that the mean vectors of the two classes are given by

\mathbf {m} _ {1} = \frac {1}{N _ {1}} \sum_ {n \in \mathcal {C} _ {1}} \mathbf {x} _ {n}, \quad \mathbf {m} _ {2} = \frac {1}{N _ {2}} \sum_ {n \in \mathcal {C} _ {2}} \mathbf {x} _ {n}.\tag{4.21}

The simplest measure of the separation of the classes, when projected onto w, is the separation of the projected class means. This suggests that we might choose w so as to maximize

m _ {2} - m _ {1} = \mathbf {w} ^ {\mathrm{T}} (\mathbf {m} _ {2} - \mathbf {m} _ {1})\tag{4.22}

where

m _ {k} = \mathbf {w} ^ {\mathrm{T}} \mathbf {m} _ {k}\tag{4.23}

![image](images/part-002--03779a67f3d8332b120a6cc9763a0945eb8f971a19b82b1421ce3c0ec2398997.jpg)

![image](images/part-002--6a6f937d2eff2e32290b1b378280414654a1ad127b6771e7f82ab829dc53b38a.jpg)

Figure 4.6 The left plot shows samples from two classes (depicted in red and blue) along with the histograms resulting from projection onto the line joining the class means. Note that there is considerable class overlap in the projected space. The right plot shows the corresponding projection based on the Fisher linear discriminant, showing the greatly improved class separation.

is the mean of the projected data from class $\mathcal { C } _ { k }$ . However, this expression can be made arbitrarily large simply by increasing the magnitude of w. To solve this problem, we could constrain w to have unit length, so that $\textstyle \sum _ { i } w _ { i } ^ { 2 } \ = \ 1$ Using a Lagrange multiplier to perform the constrained maximization, we then find that $\mathbf { w } \propto \left( \mathbf { m } _ { 2 } - \mathbf { m } _ { 1 } \right)$ . There is still a problem with this approach, however, as illustrated in Figure 4.6. This shows two classes that are well separated in the original twodimensional space $( x _ { 1 } , x _ { 2 } )$ but that have considerable overlap when projected onto the line joining their means. This difficulty arises from the strongly nondiagonal covariances of the class distributions. The idea proposed by Fisher is to maximize a function that will give a large separation between the projected class means while also giving a small variance within each class, thereby minimizing the class overlap.

The projection formula (4.20) transforms the set of labelled data points in x into a labelled set in the one-dimensional space y. The within-class variance of the transformed data from class $\mathcal { C } _ { k }$ is therefore given by

s _ {k} ^ {2} = \sum_ {n \in \mathcal {C} _ {k}} (y _ {n} - m _ {k}) ^ {2}\tag{4.24}

where $y _ { n } = \mathbf { w } ^ { \mathrm { T } } \mathbf { x } _ { n }$ . We can define the total within-class variance for the whole data set to be simply $s _ { 1 } ^ { 2 } + s _ { 2 } ^ { 2 }$ . The Fisher criterion is defined to be the ratio of the between-class variance to the within-class variance and is given by

J (\mathbf {w}) = \frac {(m _ {2} - m _ {1}) ^ {2}}{s _ {1} ^ {2} + s _ {2} ^ {2}}.\tag{4.25}

We can make the dependence on w explicit by using (4.20), (4.23), and (4.24) to rewrite the Fisher criterion in the form

J (\mathbf {w}) = \frac {\mathbf {w} ^ {\mathrm{T}} \mathbf {S} _ {\mathrm{B}} \mathbf {w}}{\mathbf {w} ^ {\mathrm{T}} \mathbf {S} _ {\mathrm{W}} \mathbf {w}}\tag{4.26}

where $\mathbf { S } _ { \mathrm { B } }$ is the between-class covariance matrix and is given by

\mathbf {S} _ {\mathrm{B}} = (\mathbf {m} _ {2} - \mathbf {m} _ {1}) (\mathbf {m} _ {2} - \mathbf {m} _ {1}) ^ {\mathrm{T}}\tag{4.27}

and $\mathbf { S } _ { \mathrm { W } }$ is the total within-class covariance matrix, given by

\mathbf {S} _ {\mathrm{W}} = \sum_ {n \in \mathcal {C} _ {1}} (\mathbf {x} _ {n} - \mathbf {m} _ {1}) (\mathbf {x} _ {n} - \mathbf {m} _ {1}) ^ {\mathrm{T}} + \sum_ {n \in \mathcal {C} _ {2}} (\mathbf {x} _ {n} - \mathbf {m} _ {2}) (\mathbf {x} _ {n} - \mathbf {m} _ {2}) ^ {\mathrm{T}}.\tag{4.28}

Differentiating (4.26) with respect to w, we find that $J ( \mathbf { w } )$ is maximized when

(\mathbf {w} ^ {\mathrm{T}} \mathbf {S} _ {\mathrm{B}} \mathbf {w}) \mathbf {S} _ {\mathrm{W}} \mathbf {w} = (\mathbf {w} ^ {\mathrm{T}} \mathbf {S} _ {\mathrm{W}} \mathbf {w}) \mathbf {S} _ {\mathrm{B}} \mathbf {w}.\tag{4.29}

From (4.27), we see that $\mathbf { S } _ { \mathrm { B } } \mathbf { w }$ is always in the direction of $\left( \mathbf { m } _ { 2 } - \mathbf { m } _ { 1 } \right)$ . Furthermore, we do not care about the magnitude of w, only its direction, and so we can drop the scalar factors $\mathbf { \Psi } ( \mathbf { w } ^ { \mathrm { T } } \mathbf { S } _ { \mathrm { B } } \mathbf { w } )$ and $\big ( \mathbf { w } ^ { \mathrm { T } } \mathbf { S } _ { \mathrm { W } } \mathbf { w } \big )$ . Multiplying both sides of (4.29) by $\mathbf { S } _ { \mathrm { W } } ^ { - 1 }$ we then obtain

\mathbf {w} \propto \mathbf {S} _ {\mathrm{W}} ^ {- 1} (\mathbf {m} _ {2} - \mathbf {m} _ {1}).\tag{4.30}

Note that if the within-class covariance is isotropic, so that $\mathbf { S } _ { \mathrm { W } }$ is proportional to the unit matrix, we find that w is proportional to the difference of the class means, as discussed above.

The result (4.30) is known as Fisher’s linear discriminant, although strictly it is not a discriminant but rather a specific choice of direction for projection of the data down to one dimension. However, the projected data can subsequently be used to construct a discriminant, by choosing a threshold $y _ { 0 }$ so that we classify a new point as belonging to $\mathcal { C } _ { 1 } \mathrm { i f } y ( \mathbf { x } ) \geqslant y _ { 0 }$ and classify it as belonging to $\mathcal { C } _ { 2 }$ otherwise. For example, we can model the class-conditional densities $p ( \boldsymbol { y } | \mathcal { C } _ { k } )$ using Gaussian distributions and then use the techniques of Section 1.2.4 to find the parameters of the Gaussian distributions by maximum likelihood. Having found Gaussian approximations to the projected classes, the formalism of Section 1.5.1 then gives an expression for the optimal threshold. Some justification for the Gaussian assumption comes from the central limit theorem by noting that $y = \mathbf { w } ^ { \mathrm { T } } \mathbf { x }$ is the sum of a set of random variables.
