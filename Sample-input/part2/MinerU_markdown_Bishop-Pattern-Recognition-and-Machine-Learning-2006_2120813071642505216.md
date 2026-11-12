(McCullagh and Nelder, 1989). Note, however, that in contrast to the models used for regression, they are no longer linear in the parameters due to the presence of the nonlinear function $f ( \cdot )$ . This will lead to more complex analytical and computational properties than for linear regression models. Nevertheless, these models are still relatively simple compared to the more general nonlinear models that will be studied in subsequent chapters. 

The algorithms discussed in this chapter will be equally applicable if we first make a fixed nonlinear transformation of the input variables using a vector of basis functions $\phi ( \mathbf { x } )$ as we did for regression models in Chapter 3. We begin by considering classification directly in the original input space x, while in Section 4.3 we shall find it convenient to switch to a notation involving basis functions for consistency with later chapters. 

## 4.1. Discriminant Functions

A discriminant is a function that takes an input vector x and assigns it to one of K classes, denoted $\mathcal { C } _ { k }$ . In this chapter, we shall restrict attention to linear discriminants, namely those for which the decision surfaces are hyperplanes. To simplify the discussion, we consider first the case of two classes and then investigate the extension to $K > 2$ classes. 

## 4.1.1 Two classes

The simplest representation of a linear discriminant function is obtained by taking a linear function of the input vector so that 

$$
y (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \mathbf {x} + w _ {0}\tag{4.4}
$$

where w is called a weight vector, and $w _ { 0 }$ is a bias (not to be confused with bias in the statistical sense). The negative of the bias is sometimes called a threshold. An input vector x is assigned to class $\mathcal { C } _ { 1 }$ if $y ( \mathbf { x } ) \geqslant 0$ and to class $\mathcal { C } _ { 2 }$ otherwise. The corresponding decision boundary is therefore defined by the relation $y ( \mathbf { x } ) = 0$ , which corresponds to a $( D - 1 )$ -dimensional hyperplane within the D-dimensional input space. Consider two points $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x _ { \mathrm { B } } }$ both of which lie on the decision surface. Because $y ( \mathbf { x } _ { \mathrm { A } } ) = y ( \mathbf { x } _ { \mathrm { B } } ) = 0$ , we have ${ \bf w } ^ { \mathrm { T } } ( { \bf x } _ { \mathrm { A } } - { \bf x } _ { \mathrm { B } } ) = 0$ and hence the vector w is orthogonal to every vector lying within the decision surface, and so w determines the orientation of the decision surface. Similarly, if x is a point on the decision surface, then $y ( \mathbf { x } ) = 0$ , and so the normal distance from the origin to the decision surface is given by 

$$
\frac {\mathbf {w} ^ {\mathrm{T}} \mathbf {x}}{\| \mathbf {w} \|} = - \frac {w _ {0}}{\| \mathbf {w} \|}.\tag{4.5}
$$

We therefore see that the bias parameter $w _ { 0 }$ determines the location of the decision surface. These properties are illustrated for the case of $D = 2$ in Figure 4.1. 

Furthermore, we note that the value of $y ( \mathbf x )$ gives a signed measure of the perpendicular distance r of the point x from the decision surface. To see this, consider 

Figure 4.1 Illustration of the geometry of a linear discriminant function in two dimensions. The decision surface, shown in red, is perpendicular to $\mathbf { w } ,$ and its displacement from the origin is controlled by the bias parameter $w _ { 0 } .$ Also, the signed orthogonal distance of a general point x from the decision surface is given by $y ( \mathbf { x } ) / \| \mathbf { w } \|$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/1503b03e08c287d433ad5604f4bd35c289eefd7598dc4fabcb61a2d08c173517.jpg)


an arbitrary point x and let $\mathbf { x } _ { \perp }$ be its orthogonal projection onto the decision surface, so that W 

$$
\mathbf {x} = \mathbf {x} _ {\perp} + r \frac {\mathbf {w}}{\| \mathbf {w} \|}.\tag{4.6}
$$

Multiplying both sides of this result by $\mathbf { w } ^ { \mathrm { T } }$ and adding $w _ { 0 }$ , and making use of $y ( \mathbf { x } ) =$ $\mathbf { w } ^ { \mathrm { T } } \mathbf { x } + w _ { 0 }$ and $y ( \mathbf { x } _ { \perp } ) = \mathbf { w } ^ { \mathrm { T } } \mathbf { x } _ { \perp } + w _ { 0 } = 0$ , we have 

$$
r = \frac {y (\mathbf {x})}{\| \mathbf {w} \|}.\tag{4.7}
$$

This result is illustrated in Figure 4.1. 

As with the linear regression models in Chapter 3, it is sometimes convenient to use a more compact notation in which we introduce an additional dummy ‘input value $x _ { 0 } = 1$ and then define $\widetilde { \mathbf { w } } = ( w _ { 0 } , \mathbf { w } )$ and $\widetilde { \mathbf { x } } = \left( x _ { 0 } , \mathbf { x } \right)$ so that 

$$
y (\mathbf {x}) = \widetilde {\mathbf {w}} ^ {\mathrm{T}} \widetilde {\mathbf {x}}.\tag{4.8}
$$

In this case, the decision surfaces are D-dimensional hyperplanes passing through the origin of the $D + 1$ -dimensional expanded input space. 

## 4.1.2 Multiple classes

Now consider the extension of linear discriminants to $K > 2$ classes. We might be tempted be to build a K-class discriminant by combining a number of two-class discriminant functions. However, this leads to some serious difficulties (Duda and Hart, 1973) as we now show. 

Consider the use of $K - 1$ classifiers each of which solves a two-class problem of separating points in a particular class $\mathcal { C } _ { k }$ from points not in that class. This is known as a one-versus-the-rest classifier. The left-hand example in Figure 4.2 shows an example involving three classes where this approach leads to regions of input space that are ambiguously classified. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a143bfb6fd5aa8e95b760d56f74fd2ff03afd01b988874bfa8dc947574d04c06.jpg)



Figure 4.2 Attempting to construct a K class discriminant from a set of two class discriminants leads to ambiguous regions, shown in green. On the left is an example involving the use of two discriminants designed to distinguish points in class $\mathcal { C } _ { k }$ from points not in class $\mathcal { C } _ { k }$ . On the right is an example involving three discriminant functions each of which is used to separate a pair of classes $\mathcal { C } _ { k }$ and $\mathcal { C } _ { j }$


An alternative is to introduce $K ( K - 1 ) / 2$ binary discriminant functions, one for every possible pair of classes. This is known as a one-versus-one classifier. Each point is then classified according to a majority vote amongst the discriminant functions. However, this too runs into the problem of ambiguous regions, as illustrated in the right-hand diagram of Figure 4.2. 

We can avoid these difficulties by considering a single K-class discriminant comprising K linear functions of the form 

$$
y _ {k} (\mathbf {x}) = \mathbf {w} _ {k} ^ {\mathrm{T}} \mathbf {x} + w _ {k 0}\tag{4.9}
$$

and then assigning a point x to class $\mathcal { C } _ { k }$ if $y _ { k } ( \mathbf x ) > y _ { j } ( \mathbf x )$ for all $j \neq k$ . The decision boundary between class $\mathcal { C } _ { k }$ and class $\mathcal { C } _ { j }$ is therefore given by $y _ { k } ( \mathbf x ) = y _ { j } ( \mathbf x )$ and hence corresponds to a $( D - 1 )$ -dimensional hyperplane defined by 

$$
\left(\mathbf {w} _ {k} - \mathbf {w} _ {j}\right) ^ {\mathrm{T}} \mathbf {x} + \left(w _ {k 0} - w _ {j 0}\right) = 0.\tag{4.10}
$$

This has the same form as the decision boundary for the two-class case discussed in Section 4.1.1, and so analogous geometrical properties apply. 

The decision regions of such a discriminant are always singly connected and convex. To see this, consider two points $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x _ { \mathrm { B } } }$ both of which lie inside decision region $\mathcal { R } _ { k }$ , as illustrated in Figure 4.3. Any point x that lies on the line connecting $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x } _ { \mathrm { B } }$ can be expressed in the form 

$$
\widehat {\mathbf {x}} = \lambda \mathbf {x} _ {\mathrm{A}} + (1 - \lambda) \mathbf {x} _ {\mathrm{B}}\tag{4.11}
$$

Figure 4.3 Illustration of the decision regions for a multiclass linear discriminant, with the decision boundaries shown in red. If two points $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x } _ { \mathrm { B } }$ both lie inside the same decision region $\mathcal { R } _ { k } ,$ then any point x that lies on the line connecting these two points must also lie in $\mathcal { R } _ { k }$ , and hence the decision region must be singly connected and convex. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/adca51862e097bd110ecfc63d1878d40ea1db856d2acecdea39461dfc7bd317c.jpg)


where $0 \leqslant \lambda \leqslant 1$ . From the linearity of the discriminant functions, it follows that 

$$
y _ {k} (\widehat {\mathbf {x}}) = \lambda y _ {k} (\mathbf {x} _ {\mathrm{A}}) + (1 - \lambda) y _ {k} (\mathbf {x} _ {\mathrm{B}}).\tag{4.12}
$$

Because both $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x _ { \mathrm { B } } }$ lie inside $\mathcal { R } _ { k } ,$ it follows that $y _ { k } ( \mathbf { x } _ { \mathrm { A } } ) \ > \ y _ { j } ( \mathbf { x } _ { \mathrm { A } } )$ , and $y _ { k } ( \mathbf { x } _ { \mathrm { B } } ) \ > \ y _ { j } ( \mathbf { x } _ { \mathrm { B } } )$ , for all $j \neq k$ , and hence $y _ { k } ( \widehat { \mathbf x } ) > y _ { j } ( \widehat { \mathbf x } )$ , and so x also lies inside $\mathcal { R } _ { k }$ . Thus $\mathcal { R } _ { k }$ is singly connected and convex. 

Note that for two classes, we can either employ the formalism discussed here, based on two discriminant functions $y _ { 1 } ( \mathbf x )$ and $y _ { 2 } ( \mathbf x )$ , or else use the simpler but equivalent formulation described in Section 4.1.1 based on a single discriminant function $y ( \mathbf x )$ 

We now explore three approaches to learning the parameters of linear discrimi nant functions, based on least squares, Fisher’s linear discriminant, and the perceptron algorithm. 

## 4.1.3 Least squares for classification

In Chapter 3, we considered models that were linear functions of the parameters, and we saw that the minimization of a sum-of-squares error function led to a simple closed-form solution for the parameter values. It is therefore tempting to see if we can apply the same formalism to classification problems. Consider a general classification problem with K classes, with a 1-of-K binary coding scheme for the target vector t. One justification for using least squares in such a context is that it approximates the conditional expectation $\mathbb { E } [ \mathbf { t } | \mathbf { x } ]$ of the target values given the input vector. For the binary coding scheme, this conditional expectation is given by the vector of posterior class probabilities. Unfortunately, however, these probabilities are typically approximated rather poorly, indeed the approximations can have values outside the range (0, 1), due to the limited flexibility of a linear model as we shall see shortly. 

Each class $\mathcal { C } _ { k }$ is described by its own linear model so that 

$$
y _ {k} (\mathbf {x}) = \mathbf {w} _ {k} ^ {\mathrm{T}} \mathbf {x} + w _ {k 0}\tag{4.13}
$$

where $k = 1 , \ldots , K$ . We can conveniently group these together using vector notation so that 

$$
\mathbf {y} (\mathbf {x}) = \widetilde {\mathbf {W}} ^ {\mathrm{T}} \widetilde {\mathbf {x}}\tag{4.14}
$$

where $\widetilde { \bf W }$ is a matrix whose $k ^ { \mathrm { t h } }$ column comprises the $D + 1$ -dimensional vector $\widetilde { \mathbf { w } } _ { k } = ( w _ { k 0 } , \mathbf { w } _ { k } ^ { \mathrm { T } } ) ^ { \mathrm { T } }$ and $\widetilde { \mathbf { x } }$ is the corresponding augmented input vector $( 1 , \mathbf { x } ^ { \mathrm { T } } ) ^ { \mathrm { T } }$ with a dummy input $x _ { 0 } = 1$ . This representation was discussed in detail in Section 3.1. A new input x is then assigned to the class for which the output $y _ { k } = \widetilde { \mathbf { w } } _ { k } ^ { \mathrm { T } } \widetilde { \mathbf { x } }$ is largest. 

We now determine the parameter matrix $\widetilde { \bf W }$  by minimizing a sum-of-squares ,error function, as we did for regression in Chapter 3. Consider a training data set $\{ \mathbf { x } _ { n } , \mathbf { t } _ { n } \}$ where $n = 1 , \ldots , N$ , and define a matrix T whose $n ^ { \mathrm { t h } }$ row is the vector $\mathbf { t } _ { n } ^ { \mathrm { T } }$ together with a matrix $\widetilde { \mathbf { X } }$ whose $n ^ { \mathrm { t h } }$ row is $\widetilde { \mathbf { x } } _ { n } ^ { \mathrm { { T } } }$ . The sum-of-squares error function can then be written as 

$$
E _ {D} (\widetilde {\mathbf {W}}) = \frac {1}{2} \mathrm{Tr} \left\{(\widetilde {\mathbf {X}} \widetilde {\mathbf {W}} - \mathbf {T}) ^ {\mathrm{T}} (\widetilde {\mathbf {X}} \widetilde {\mathbf {W}} - \mathbf {T}) \right\}.\tag{4.15}
$$

Setting the derivative with respect to $\widetilde { \bf W }$ to zero, and rearranging, we then obtain the solution for $\widetilde { \mathbf { W } }$ in the form 

$$
\widetilde {\mathbf {W}} = (\widetilde {\mathbf {X}} ^ {\mathrm{T}} \widetilde {\mathbf {X}}) ^ {- 1} \widetilde {\mathbf {X}} ^ {\mathrm{T}} \mathbf {T} = \widetilde {\mathbf {X}} ^ {\dagger} \mathbf {T}\tag{4.16}
$$

where $\widetilde { \mathbf { X } } ^ { \dagger }$ is the pseudo-inverse of the matrix $\widetilde { \mathbf { X } } ,$ , as discussed in Section 3.1.1. We  then obtain the discriminant function in the form 

$$
\mathbf {y} (\mathbf {x}) = \widetilde {\mathbf {W}} ^ {\mathrm{T}} \widetilde {\mathbf {x}} = \mathbf {T} ^ {\mathrm{T}} \left(\widetilde {\mathbf {X}} ^ {\dagger}\right) ^ {\mathrm{T}} \widetilde {\mathbf {x}}.\tag{4.17}
$$

An interesting property of least-squares solutions with multiple target variables is that if every target vector in the training set satisfies some linear constraint 

$$
\mathbf {a} ^ {\mathrm{T}} \mathbf {t} _ {n} + b = 0\tag{4.18}
$$

for some constants a and b, then the model prediction for any value of x will satisfy the same constraint so that 

$$
\mathbf {a} ^ {\mathrm{T}} \mathbf {y} (\mathbf {x}) + b = 0.\tag{4.19}
$$

Thus if we use a 1-of-K coding scheme for K classes, then the predictions made by the model will have the property that the elements of $\mathbf { y } ( \mathbf { x } )$ will sum to 1 for any value of x. However, this summation constraint alone is not sufficient to allow the model outputs to be interpreted as probabilities because they are not constrained to lie within the interval (0, 1). 

The least-squares approach gives an exact closed-form solution for the discriminant function parameters. However, even as a discriminant function (where we use it to make decisions directly and dispense with any probabilistic interpretation) it suffers from some severe problems. We have already seen that least-squares solutions lack robustness to outliers, and this applies equally to the classification application, as illustrated in Figure 4.4. Here we see that the additional data points in the righthand figure produce a significant change in the location of the decision boundary, even though these point would be correctly classified by the original decision boundary in the left-hand figure. The sum-of-squares error function penalizes predictions that are ‘too correct’ in that they lie a long way on the correct side of the decision boundary. In Section 7.1.2, we shall consider several alternative error functions for classification and we shall see that they do not suffer from this difficulty. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/ddab55d97d8a8191decf8980c5dbe8b452bdcc14e8edf9ac5002efd56b683903.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/c34a13b92358e05225fac551548df796aedad40cef7c63019c6f727f1f28e29d.jpg)



Figure 4.4 The left plot shows data from two classes, denoted by red crosses and blue circles, together with the decision boundary found by least squares (magenta curve) and also by the logistic regression model (green curve), which is discussed later in Section 4.3.2. The right-hand plot shows the corresponding results obtained when extra data points are added at the bottom left of the diagram, showing that least squares is highly sensitive to outliers, unlike logistic regression.


However, problems with least squares can be more severe than simply lack of robustness, as illustrated in Figure 4.5. This shows a synthetic data set drawn from three classes in a two-dimensional input space $( x _ { 1 } , x _ { 2 } )$ , having the property that lin ear decision boundaries can give excellent separation between the classes. Indeed, the technique of logistic regression, described later in this chapter, gives a satisfactory solution as seen in the right-hand plot. However, the least-squares solution gives poor results, with only a small region of the input space assigned to the green class. 

The failure of least squares should not surprise us when we recall that it corresponds to maximum likelihood under the assumption of a Gaussian conditional distribution, whereas binary target vectors clearly have a distribution that is far from Gaussian. By adopting more appropriate probabilistic models, we shall obtain classification techniques with much better properties than least squares. For the moment, however, we continue to explore alternative nonprobabilistic methods for setting the parameters in the linear classification models. 

## 4.1.4 Fisher’s linear discriminant

One way to view a linear classification model is in terms of dimensionality reduction. Consider first the case of two classes, and suppose we take the Ddimensional input vector x and project it down to one dimension using 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/0cd1788b366f62ba981b324517f1fa15d469f40f664e099f0ce3788db70e6174.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/f3d80ef53b30a78981a6f2b9c8616c5a21547fa6202b447600a754309027db1d.jpg)



Figure 4.5 Example of a synthetic data set comprising three classes, with training data points denoted in red ( ), green (+), and blue ( ). Lines denote the decision boundaries, and the background colours denote the respective classes of the decision regions. On the left is the result of using a least-squares discriminant. We see that the region of input space assigned to the green class is too small and so most of the points from this class are misclassified. On the right is the result of using logistic regressions as described in Section 4.3.2 showing correct classification of the training data.


$$
y = \mathbf {w} ^ {\mathrm{T}} \mathbf {x}.\tag{4.20}
$$

If we place a threshold on y and classify $y \geqslant - w _ { 0 }$ as class $\mathcal { C } _ { 1 }$ , and otherwise class $\mathcal { C } _ { 2 }$ , then we obtain our standard linear classifier discussed in the previous section. In general, the projection onto one dimension leads to a considerable loss of information, and classes that are well separated in the original D-dimensional space may become strongly overlapping in one dimension. However, by adjusting the components of the weight vector w, we can select a projection that maximizes the class separation. To begin with, consider a two-class problem in which there are $N _ { 1 }$ points of class $\mathcal { C } _ { 1 }$ and ${ \dot { N _ { 2 } } }$ points of class $\mathcal { C } _ { 2 }$ , so that the mean vectors of the two classes are given by 

$$
\mathbf {m} _ {1} = \frac {1}{N _ {1}} \sum_ {n \in \mathcal {C} _ {1}} \mathbf {x} _ {n}, \quad \mathbf {m} _ {2} = \frac {1}{N _ {2}} \sum_ {n \in \mathcal {C} _ {2}} \mathbf {x} _ {n}.\tag{4.21}
$$

The simplest measure of the separation of the classes, when projected onto w, is the separation of the projected class means. This suggests that we might choose w so as to maximize 

$$
m _ {2} - m _ {1} = \mathbf {w} ^ {\mathrm{T}} (\mathbf {m} _ {2} - \mathbf {m} _ {1})\tag{4.22}
$$

where 

$$
m _ {k} = \mathbf {w} ^ {\mathrm{T}} \mathbf {m} _ {k}\tag{4.23}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/03779a67f3d8332b120a6cc9763a0945eb8f971a19b82b1421ce3c0ec2398997.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/6a6f937d2eff2e32290b1b378280414654a1ad127b6771e7f82ab829dc53b38a.jpg)



Figure 4.6 The left plot shows samples from two classes (depicted in red and blue) along with the histograms resulting from projection onto the line joining the class means. Note that there is considerable class overlap in the projected space. The right plot shows the corresponding projection based on the Fisher linear discriminant, showing the greatly improved class separation.


is the mean of the projected data from class $\mathcal { C } _ { k }$ . However, this expression can be made arbitrarily large simply by increasing the magnitude of w. To solve this problem, we could constrain w to have unit length, so that $\textstyle \sum _ { i } w _ { i } ^ { 2 } \ = \ 1$ Using a Lagrange multiplier to perform the constrained maximization, we then find that $\mathbf { w } \propto \left( \mathbf { m } _ { 2 } - \mathbf { m } _ { 1 } \right)$ . There is still a problem with this approach, however, as illustrated in Figure 4.6. This shows two classes that are well separated in the original twodimensional space $( x _ { 1 } , x _ { 2 } )$ but that have considerable overlap when projected onto the line joining their means. This difficulty arises from the strongly nondiagonal covariances of the class distributions. The idea proposed by Fisher is to maximize a function that will give a large separation between the projected class means while also giving a small variance within each class, thereby minimizing the class overlap. 

The projection formula (4.20) transforms the set of labelled data points in x into a labelled set in the one-dimensional space y. The within-class variance of the transformed data from class $\mathcal { C } _ { k }$ is therefore given by 

$$
s _ {k} ^ {2} = \sum_ {n \in \mathcal {C} _ {k}} (y _ {n} - m _ {k}) ^ {2}\tag{4.24}
$$

where $y _ { n } = \mathbf { w } ^ { \mathrm { T } } \mathbf { x } _ { n }$ . We can define the total within-class variance for the whole data set to be simply $s _ { 1 } ^ { 2 } + s _ { 2 } ^ { 2 }$ . The Fisher criterion is defined to be the ratio of the between-class variance to the within-class variance and is given by 

$$
J (\mathbf {w}) = \frac {(m _ {2} - m _ {1}) ^ {2}}{s _ {1} ^ {2} + s _ {2} ^ {2}}.\tag{4.25}
$$

We can make the dependence on w explicit by using (4.20), (4.23), and (4.24) to rewrite the Fisher criterion in the form 

$$
J (\mathbf {w}) = \frac {\mathbf {w} ^ {\mathrm{T}} \mathbf {S} _ {\mathrm{B}} \mathbf {w}}{\mathbf {w} ^ {\mathrm{T}} \mathbf {S} _ {\mathrm{W}} \mathbf {w}}\tag{4.26}
$$

where $\mathbf { S } _ { \mathrm { B } }$ is the between-class covariance matrix and is given by 

$$
\mathbf {S} _ {\mathrm{B}} = (\mathbf {m} _ {2} - \mathbf {m} _ {1}) (\mathbf {m} _ {2} - \mathbf {m} _ {1}) ^ {\mathrm{T}}\tag{4.27}
$$

and $\mathbf { S } _ { \mathrm { W } }$ is the total within-class covariance matrix, given by 

$$
\mathbf {S} _ {\mathrm{W}} = \sum_ {n \in \mathcal {C} _ {1}} (\mathbf {x} _ {n} - \mathbf {m} _ {1}) (\mathbf {x} _ {n} - \mathbf {m} _ {1}) ^ {\mathrm{T}} + \sum_ {n \in \mathcal {C} _ {2}} (\mathbf {x} _ {n} - \mathbf {m} _ {2}) (\mathbf {x} _ {n} - \mathbf {m} _ {2}) ^ {\mathrm{T}}.\tag{4.28}
$$

Differentiating (4.26) with respect to w, we find that $J ( \mathbf { w } )$ is maximized when 

$$
(\mathbf {w} ^ {\mathrm{T}} \mathbf {S} _ {\mathrm{B}} \mathbf {w}) \mathbf {S} _ {\mathrm{W}} \mathbf {w} = (\mathbf {w} ^ {\mathrm{T}} \mathbf {S} _ {\mathrm{W}} \mathbf {w}) \mathbf {S} _ {\mathrm{B}} \mathbf {w}.\tag{4.29}
$$

From (4.27), we see that $\mathbf { S } _ { \mathrm { B } } \mathbf { w }$ is always in the direction of $\left( \mathbf { m } _ { 2 } - \mathbf { m } _ { 1 } \right)$ . Furthermore, we do not care about the magnitude of w, only its direction, and so we can drop the scalar factors $\mathbf { \Psi } ( \mathbf { w } ^ { \mathrm { T } } \mathbf { S } _ { \mathrm { B } } \mathbf { w } )$ and $\big ( \mathbf { w } ^ { \mathrm { T } } \mathbf { S } _ { \mathrm { W } } \mathbf { w } \big )$ . Multiplying both sides of (4.29) by $\mathbf { S } _ { \mathrm { W } } ^ { - 1 }$ we then obtain 

$$
\mathbf {w} \propto \mathbf {S} _ {\mathrm{W}} ^ {- 1} (\mathbf {m} _ {2} - \mathbf {m} _ {1}).\tag{4.30}
$$

Note that if the within-class covariance is isotropic, so that $\mathbf { S } _ { \mathrm { W } }$ is proportional to the unit matrix, we find that w is proportional to the difference of the class means, as discussed above. 

The result (4.30) is known as Fisher’s linear discriminant, although strictly it is not a discriminant but rather a specific choice of direction for projection of the data down to one dimension. However, the projected data can subsequently be used to construct a discriminant, by choosing a threshold $y _ { 0 }$ so that we classify a new point as belonging to $\mathcal { C } _ { 1 } \mathrm { i f } y ( \mathbf { x } ) \geqslant y _ { 0 }$ and classify it as belonging to $\mathcal { C } _ { 2 }$ otherwise. For example, we can model the class-conditional densities $p ( \boldsymbol { y } | \mathcal { C } _ { k } )$ using Gaussian distributions and then use the techniques of Section 1.2.4 to find the parameters of the Gaussian distributions by maximum likelihood. Having found Gaussian approximations to the projected classes, the formalism of Section 1.5.1 then gives an expression for the optimal threshold. Some justification for the Gaussian assumption comes from the central limit theorem by noting that $y = \mathbf { w } ^ { \mathrm { T } } \mathbf { x }$ is the sum of a set of random variables. 

## 4.1.5 Relation to least squares

The least-squares approach to the determination of a linear discriminant was based on the goal of making the model predictions as close as possible to a set of target values. By contrast, the Fisher criterion was derived by requiring maximum class separation in the output space. It is interesting to see the relationship between these two approaches. In particular, we shall show that, for the two-class problem, the Fisher criterion can be obtained as a special case of least squares. 

So far we have considered $1 { \mathrm { - o f } } { \mathrm { - } } K$ coding for the target values. If, however, we adopt a slightly different target coding scheme, then the least-squares solution for the weights becomes equivalent to the Fisher solution (Duda and Hart, 1973). In particular, we shall take the targets for class $\mathcal { C } _ { 1 }$ to be $N / N _ { 1 }$ , where $N _ { 1 }$ is the number of patterns in class $\mathcal { C } _ { 1 }$ , and $\dot { N }$ is the total number of patterns. This target value approximates the reciprocal of the prior probability for class $\mathcal { C } _ { 1 }$ . For class $\mathcal { C } _ { 2 }$ , we shall take the targets to be $- N / N _ { 2 }$ , where $N _ { 2 }$ is the number of patterns in class $\mathcal { C } _ { 2 }$ 

The sum-of-squares error function can be written 

$$
E = \frac {1}{2} \sum_ {n = 1} ^ {N} \left(\mathbf {w} ^ {\mathrm{T}} \mathbf {x} _ {n} + w _ {0} - t _ {n}\right) ^ {2}.\tag{4.31}
$$

Setting the derivatives of $E$ with respect to $w _ { 0 }$ and w to zero, we obtain respectively 

$$
\sum_ {n = 1} ^ {N} \left(\mathbf {w} ^ {\mathrm{T}} \mathbf {x} _ {n} + w _ {0} - t _ {n}\right) = 0\tag{4.32}
$$

$$
\sum_ {n = 1} ^ {N} \left(\mathbf {w} ^ {\mathrm{T}} \mathbf {x} _ {n} + w _ {0} - t _ {n}\right) \mathbf {x} _ {n} = 0.\tag{4.33}
$$

From (4.32), and making use of our choice of target coding scheme for the $t _ { n }$ , we obtain an expression for the bias in the form 

$$
w _ {0} = - \mathbf {w} ^ {\mathrm{T}} \mathbf {m}\tag{4.34}
$$

where we have used 

$$
\sum_ {n = 1} ^ {N} t _ {n} = N _ {1} \frac {N}{N _ {1}} - N _ {2} \frac {N}{N _ {2}} = 0\tag{4.35}
$$

and where m is the mean of the total data set and is given by 

$$
\mathbf {m} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} = \frac {1}{N} (N _ {1} \mathbf {m} _ {1} + N _ {2} \mathbf {m} _ {2}).\tag{4.36}
$$

Exercise 4.6 

After some straightforward algebra, and again making use of the choice of $t _ { n }$ , the second equation (4.33) becomes 

$$
\left(\mathbf {S} _ {\mathrm{W}} + \frac {N _ {1} N _ {2}}{N} \mathbf {S} _ {\mathrm{B}}\right) \mathbf {w} = N (\mathbf {m} _ {1} - \mathbf {m} _ {2})\tag{4.37}
$$

where $\mathbf { S } _ { \mathrm { W } }$ is defined by (4.28), $\mathbf { S } _ { \mathrm { B } }$ is defined by (4.27), and we have substituted for the bias using (4.34). Using (4.27), we note that $\mathbf { S } _ { \mathrm { B } } \mathbf { w }$ is always in the direction of $\left( \mathbf { m } _ { 2 } - \mathbf { m } _ { 1 } \right)$ . Thus we can write 

$$
\mathbf {w} \propto \mathbf {S} _ {\mathrm{W}} ^ {- 1} (\mathbf {m} _ {2} - \mathbf {m} _ {1})\tag{4.38}
$$

where we have ignored irrelevant scale factors. Thus the weight vector coincides with that found from the Fisher criterion. In addition, we have also found an expression for the bias value $w _ { 0 }$ given by (4.34). This tells us that a new vector x should be classified as belonging to class $\mathcal { C } _ { 1 } \mathrm { i f } y ( \mathbf { x } ) = \mathbf { w } ^ { \mathrm { T } } ( \mathbf { x } - \mathbf { m } ) > 0$ and class $\mathcal { C } _ { 2 }$ otherwise. 

## 4.1.6 Fisher’s discriminant for multiple classes

We now consider the generalization of the Fisher discriminant to $K > 2$ classes, and we shall assume that the dimensionality D of the input space is greater than the number K of classes. Next, we introduce $D ^ { \prime } > 1$ linear ‘features $y _ { k } = \mathbf { w } _ { k } ^ { \mathrm { T } } \mathbf { x } .$ , where $k = 1 , \ldots , D ^ { \prime }$ . These feature values can conveniently be grouped together to form a vector y. Similarly, the weight vectors $\left\{ \mathbf { w } _ { k } \right\}$ can be considered to be the columns of a matrix W, so that 

$$
\mathbf {y} = \mathbf {W} ^ {\mathrm{T}} \mathbf {x}.\tag{4.39}
$$

Note that again we are not including any bias parameters in the definition of $\mathbf { y } .$ . The generalization of the within-class covariance matrix to the case of K classes follows from (4.28) to give 

$$
\mathbf {S} _ {\mathrm{W}} = \sum_ {k = 1} ^ {K} \mathbf {S} _ {k}\tag{4.40}
$$

where 

$$
\mathbf {S} _ {k} = \sum_ {n \in \mathcal {C} _ {k}} (\mathbf {x} _ {n} - \mathbf {m} _ {k}) (\mathbf {x} _ {n} - \mathbf {m} _ {k}) ^ {\mathrm{T}}\tag{4.41}
$$

$$
{\bf m} _ {k} = \frac {1}{N _ {k}} \sum_ {n \in \mathcal {C} _ {k}} {\bf x} _ {n}\tag{4.42}
$$

and $N _ { k }$ is the number of patterns in class $\mathcal { C } _ { k }$ . In order to find a generalization of the between-class covariance matrix, we follow Duda and Hart (1973) and consider first the total covariance matrix 

$$
\mathbf {S} _ {\mathrm{T}} = \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \mathbf {m}) (\mathbf {x} _ {n} - \mathbf {m}) ^ {\mathrm{T}}\tag{4.43}
$$

where m is the mean of the total data set 

$$
\mathbf {m} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} = \frac {1}{N} \sum_ {k = 1} ^ {K} N _ {k} \mathbf {m} _ {k}\tag{4.44}
$$

and $\begin{array} { r } { N = \sum _ { k } N _ { k } } \end{array}$ is the total number of data points. The total covariance matrix can be decomposed into the sum of the within-class covariance matrix, given by (4.40) and (4.41), plus an additional matrix $\mathbf { S } _ { \mathrm { B } }$ , which we identify as a measure of the between-class covariance 

$$
\mathbf {S} _ {\mathrm{T}} = \mathbf {S} _ {\mathrm{W}} + \mathbf {S} _ {\mathrm{B}}\tag{4.45}
$$

where 

$$
\mathbf {S} _ {\mathrm{B}} = \sum_ {k = 1} ^ {K} N _ {k} (\mathbf {m} _ {k} - \mathbf {m}) (\mathbf {m} _ {k} - \mathbf {m}) ^ {\mathrm{T}}.\tag{4.46}
$$

These covariance matrices have been defined in the original x-space. We can now define similar matrices in the projected $D ^ { \prime }$ -dimensional y-space 

$$
\mathbf {s} _ {\mathrm{W}} = \sum_ {k = 1} ^ {K} \sum_ {n \in \mathcal {C} _ {k}} (\mathbf {y} _ {n} - \boldsymbol {\mu} _ {k}) (\mathbf {y} _ {n} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}}\tag{4.47}
$$

and 

$$
\mathbf {s} _ {\mathrm{B}} = \sum_ {k = 1} ^ {K} N _ {k} (\boldsymbol {\mu} _ {k} - \boldsymbol {\mu}) (\boldsymbol {\mu} _ {k} - \boldsymbol {\mu}) ^ {\mathrm{T}}\tag{4.48}
$$

where 

$$
\boldsymbol {\mu} _ {k} = \frac {1}{N _ {k}} \sum_ {n \in \mathcal {C} _ {k}} \mathbf {y} _ {n}, \quad \boldsymbol {\mu} = \frac {1}{N} \sum_ {k = 1} ^ {K} N _ {k} \boldsymbol {\mu} _ {k}.\tag{4.49}
$$

Again we wish to construct a scalar that is large when the between-class covariance is large and when the within-class covariance is small. There are now many possible choices of criterion (Fukunaga, 1990). One example is given by 

$$
J (\mathbf {W}) = \mathrm{Tr} \left\{\mathbf {s} _ {\mathrm{W}} ^ {- 1} \mathbf {s} _ {\mathrm{B}} \right\}.\tag{4.50}
$$

This criterion can then be rewritten as an explicit function of the projection matrix W in the form 

$$
J (\mathbf {w}) = \operatorname{Tr} \left\{\left(\mathbf {W S} _ {\mathrm{W}} \mathbf {W} ^ {\mathrm{T}}\right) ^ {- 1} \left(\mathbf {W S} _ {\mathrm{B}} \mathbf {W} ^ {\mathrm{T}}\right) \right\}.\tag{4.51}
$$

Maximization of such criteria is straightforward, though somewhat involved, and is discussed at length in Fukunaga (1990). The weight values are determined by those eigenvectors of $\bar { \bf S } _ { \mathrm { W } } ^ { - 1 } { \bf S } _ { \mathrm { B } }$ that correspond to the $D ^ { \prime }$ largest eigenvalues. 

There is one important result that is common to all such criteria, which is worth emphasizing. We first note from (4.46) that $\mathbf { S } _ { \mathrm { B } }$ is composed of the sum of K matrices, each of which is an outer product of two vectors and therefore of rank 1. In addition, only $( K - 1 )$ of these matrices are independent as a result of the constraint (4.44). Thus, $\mathbf { S } _ { \mathrm { B } }$ has rank at most equal to $( K - \bar { 1 } )$ and so there are at most $( K - 1 )$ nonzero eigenvalues. This shows that the projection onto the $( K - 1 )$ -dimensional subspace spanned by the eigenvectors of $\mathbf { S } _ { \mathrm { B } }$ does not alter the value of $J ( \mathbf { w } )$ , and so we are therefore unable to find more than $( K - 1 )$ linear ‘features’ by this means (Fukunaga, 1990). 

## 4.1.7 The perceptron algorithm

Another example of a linear discriminant model is the perceptron of Rosenblatt (1962), which occupies an important place in the history of pattern recognition algorithms. It corresponds to a two-class model in which the input vector x is first transformed using a fixed nonlinear transformation to give a feature vector $\phi ( \mathbf { x } )$ , and this is then used to construct a generalized linear model of the form 

$$
y (\mathbf {x}) = f \left(\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x})\right)\tag{4.52}
$$

where the nonlinear activation function $f ( \cdot )$ is given by a step function of the form 

$$
f (a) = \left\{ \begin{array}{l l} + 1, & a \geqslant 0 \\ - 1, & a <   0. \end{array} \right.\tag{4.53}
$$

The vector $\phi ( \mathbf { x } )$ will typically include a bias component $\phi _ { 0 } ( \mathbf { x } ) = 1$ . In earlier discussions of two-class classification problems, we have focussed on a target coding scheme in which $t \in \{ 0 , 1 \}$ , which is appropriate in the context of probabilistic models. For the perceptron, however, it is more convenient to use target values $t = + 1$ for class $\mathcal { C } _ { 1 }$ and $t = - 1$ for class $\mathcal { C } _ { 2 }$ , which matches the choice of activation function. 

The algorithm used to determine the parameters w of the perceptron can most easily be motivated by error function minimization. A natural choice of error function would be the total number of misclassified patterns. However, this does not lead to a simple learning algorithm because the error is a piecewise constant function of w, with discontinuities wherever a change in w causes the decision boundary to move across one of the data points. Methods based on changing w using the gradient of the error function cannot then be applied, because the gradient is zero almost everywhere. 

We therefore consider an alternative error function known as the perceptron criterion. To derive this, we note that we are seeking a weight vector w such that patterns ${ \bf x } _ { n }$ in class $\mathcal { C } _ { 1 }$ will have $\mathbf { w } ^ { \mathrm { T } } \phi ( \mathbf { x } _ { n } ) > 0$ , whereas patterns ${ \bf x } _ { n }$ in class $\mathcal { C } _ { 2 }$ have ${ \bf w } ^ { \mathrm { T } } \phi ( { \bf x } _ { n } ) < 0$ . Using the $t \in \{ - 1 , + 1 \}$ target coding scheme it follows that we would like all patterns to satisfy $\mathbf { w } ^ { \mathrm { T } } \phi ( \mathbf { x } _ { n } ) t _ { n } \ > \ 0$ The perceptron criterion associates zero error with any pattern that is correctly classified, whereas for a misclassified pattern ${ \bf x } _ { n }$ it tries to minimize the quantity $- \mathbf { w } ^ { \mathrm { T } } \phi ( \mathbf { x } _ { n } ) t _ { n }$ . The perceptron criterion is therefore given by 

$$
E _ {\mathrm{P}} (\mathbf {w}) = - \sum_ {n \in \mathcal {M}} \mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n}\tag{4.54}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/ead7a3a44e25ac57406b566b6aad3f11e0d4d610e0dc6aca6823fd593c4a3f92.jpg)


## Frank Rosenblatt 1928–1969

Rosenblatt’s perceptron played an important role in the history of machine learning. Initially, Rosenblatt simulated the perceptron on an IBM 704 computer at Cornell in 1957, but by the early 1960s he had built special-purpose hardware that provided a direct, parallel implementation of perceptron learning. Many of his ideas were encapsulated in “Principles of Neurodynamics: Perceptrons and the Theory of Brain Mechanisms” published in 1962. Rosenblatt’s work was criticized by Marvin Minksy, whose objections were published in the book “Perceptrons”, co-authored with 

Seymour Papert. This book was widely misinterpreted at the time as showing that neural networks were fatally flawed and could only learn solutions for linearly separable problems. In fact, it only proved such limitations in the case of single-layer networks such as the perceptron and merely conjectured (incorrectly) that they applied to more general network models. Unfortunately, however, this book contributed to the substantial decline in research funding for neural computing, a situation that was not reversed until the mid-1980s. Today, there are many hundreds, if not thousands, of applications of neural networks in widespread use, with examples in areas such as handwriting recognition and information retrieval being used routinely by millions of people. 

where denotes the set of all misclassified patterns. The contribution to the error associated with a particular misclassified pattern is a linear function of w in regions of w space where the pattern is misclassified and zero in regions where it is correctly classified. The total error function is therefore piecewise linear. 

We now apply the stochastic gradient descent algorithm to this error function. The change in the weight vector w is then given by 

$$
\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} - \eta \nabla E _ {\mathrm{P}} (\mathbf {w}) = \mathbf {w} ^ {(\tau)} + \eta \phi_ {n} t _ {n}\tag{4.55}
$$

where $\eta$ is the learning rate parameter and $\tau$ is an integer that indexes the steps of the algorithm. Because the perceptron function $y ( \mathbf { x } , \mathbf { w } )$ is unchanged if we multiply w by a constant, we can set the learning rate parameter $\eta$ equal to 1 without of generality. Note that, as the weight vector evolves during training, the set of patterns that are misclassified will change. 

The perceptron learning algorithm has a simple interpretation, as follows. We cycle through the training patterns in turn, and for each pattern ${ \bf x } _ { n }$ we evaluate the perceptron function (4.52). If the pattern is correctly classified, then the weight vector remains unchanged, whereas if it is incorrectly classified, then for class $\mathcal { C } _ { 1 }$ we add the vector $\phi (  { \mathbf { x } } _ { n } )$ onto the current estimate of weight vector w while for class $\mathcal { C } _ { 2 }$ we subtract the vector $\phi (  { \mathbf { x } } _ { n } )$ from $\mathbf { w } .$ . The perceptron learning algorithm is illustrated in Figure 4.7. 

If we consider the effect of a single update in the perceptron learning algorithm, we see that the contribution to the error from a misclassified pattern will be reduced because from (4.55) we have 

$$
- \mathbf {w} ^ {(\tau + 1) \mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n} = - \mathbf {w} ^ {(\tau) \mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n} - (\boldsymbol {\phi} _ {n} t _ {n}) ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n} <   - \mathbf {w} ^ {(\tau) \mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n}\tag{4.56}
$$

where we have set $\eta = 1$ , and made use of $\| \phi _ { n } t _ { n } \| ^ { 2 } > 0$ . Of course, this does not imply that the contribution to the error function from the other misclassified patterns will have been reduced. Furthermore, the change in weight vector may have caused some previously correctly classified patterns to become misclassified. Thus the perceptron learning rule is not guaranteed to reduce the total error function at each stage. 

However, the perceptron convergence theorem states that if there exists an exact solution (in other words, if the training data set is linearly separable), then the perceptron learning algorithm is guaranteed to find an exact solution in a finite number of steps. Proofs of this theorem can be found for example in Rosenblatt (1962), Block (1962), Nilsson (1965), Minsky and Papert (1969), Hertz et al. (1991), and Bishop (1995a). Note, however, that the number of steps required to achieve convergence could still be substantial, and in practice, until convergence is achieved, we will not be able to distinguish between a nonseparable problem and one that is simply slow to converge. 

Even when the data set is linearly separable, there may be many solutions, and which one is found will depend on the initialization of the parameters and on the order of presentation of the data points. Furthermore, for data sets that are not linearly separable, the perceptron learning algorithm will never converge. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/e5976a6fcc6daf4ffd9835c03b5926a05b5f80595886f20369aef95292cb72b5.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/37a7e32b7e9e3486fa25049c2a8c7c8835b25458e51aec15860ea447c895c0e2.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/7fca87f5cee35c86e2e62bd07ce0baf7ebc28286d3b4ba91f76a27ad9712d20f.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/191a6bbccf0c72c50d36948f3b86687b57a3892a064b3108e218060b0099d9bc.jpg)



Figure 4.7 Illustration of the convergence of the perceptron learning algorithm, showing data points from two classes (red and blue) in a two-dimensional feature space $( \phi _ { 1 } , \phi _ { 2 } )$ . The top left plot shows the initial parameter vector w shown as a black arrow together with the corresponding decision boundary (black line), in which the arrow points towards the decision region which classified as belonging to the red class. The data point circled in green is misclassified and so its feature vector is added to the current weight vector, giving the new decision boundary shown in the top right plot. The bottom left plot shows the next misclassified point to be considered, indicated by the green circle, and its feature vector is again added to the weight vector giving the decision boundary shown in the bottom right plot for which all data points are correctly classified.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/4fec53298a4f128374cf87727e1dd8346364fd0e8b32644efd8aef58938b7a5c.jpg)



Figure 4.8 Illustration of the Mark 1 perceptron hardware. The photograph on the left shows how the inputs were obtained using a simple camera system in which an input scene, in this case a printed character, was illuminated by powerful lights, and an image focussed onto a 20 20 array of cadmium sulphide photocells, giving a primitive 400 pixel image. The perceptron also had a patch board, shown in the middle photograph, which allowed different configurations of input features to be tried. Often these were wired up at random to demonstrate the ability of the perceptron to learn without the need for precise wiring, in contrast to a modern digital computer. The photograph on the right shows one of the racks of adaptive weights. Each weight was implemented using a rotary variable resistor, also called a potentiometer, driven by an electric motor thereby allowing the value of the weight to be adjusted automatically by the learning algorithm.


Aside from difficulties with the learning algorithm, the perceptron does not provide probabilistic outputs, nor does it generalize readily to K > 2 classes. The most important limitation, however, arises from the fact that (in common with all of the models discussed in this chapter and the previous one) it is based on linear combinations of fixed basis functions. More detailed discussions of the limitations of perceptrons can be found in Minsky and Papert (1969) and Bishop (1995a). 

Analogue hardware implementations of the perceptron were built by Rosenblatt, based on motor-driven variable resistors to implement the adaptive parameters $w _ { j }$ These are illustrated in Figure 4.8. The inputs were obtained from a simple camera system based on an array of photo-sensors, while the basis functions φ could be chosen in a variety of ways, for example based on simple fixed functions of randomly chosen subsets of pixels from the input image. Typical applications involved learning to discriminate simple shapes or characters. 

At the same time that the perceptron was being developed, a closely related system called the adaline, which is short for ‘adaptive linear element’, was being explored by Widrow and co-workers. The functional form of the model was the same as for the perceptron, but a different approach to training was adopted (Widrow and Hoff, 1960; Widrow and Lehr, 1990). 

## 4.2. Probabilistic Generative Models

We turn next to a probabilistic view of classification and show how models with linear decision boundaries arise from simple assumptions about the distribution of the data. In Section 1.5.4, we discussed the distinction between the discriminative and the generative approaches to classification. Here we shall adopt a generative 

Plot of the logistic sigmoid function $\sigma ( a )$ defined by (4.59), shown in red, together with the scaled probit function $\Phi ( \lambda a )$ , for $\lambda ^ { 2 } \ = \ \dot { \pi } / 8 ,$ shown in dashed blue, where Φ(a) is defined by (4.114). The scaling factor $\pi / 8$ is chosen so that the derivatives of the two curves are equal for $a = 0$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/e877216828c5dcffa36eaa70386bab742b5ef09ebd77ebc29e940af07feb787d.jpg)


approach in which we model the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ , as well as the class priors $p ( \mathcal { C } _ { k } )$ , and then use these to compute posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ through Bayes’ theorem. 

Consider first of all the case of two classes. The posterior probability for class $\mathcal { C } _ { 1 }$ can be written as 

$$
\begin{array}{r c l} p (\mathcal {C} _ {1} | \mathbf {x}) & = & \frac {p (\mathbf {x} | \mathcal {C} _ {1}) p (\mathcal {C} _ {1})}{p (\mathbf {x} | \mathcal {C} _ {1}) p (\mathcal {C} _ {1}) + p (\mathbf {x} | \mathcal {C} _ {2}) p (\mathcal {C} _ {2})} \\ & = & \frac {1}{1 + \exp (- a)} = \sigma (a) \end{array}\tag{4.57}
$$

where we have defined 

$$
a = \ln {\frac {p (\mathbf {x} | \mathcal {C} _ {1}) p (\mathcal {C} _ {1})}{p (\mathbf {x} | \mathcal {C} _ {2}) p (\mathcal {C} _ {2})}}\tag{4.58}
$$

and $\sigma ( a )$ is the logistic sigmoid function defined by 

$$
\sigma (a) = \frac {1}{1 + \exp (- a)}\tag{4.59}
$$

which is plotted in Figure 4.9. The term ‘sigmoid’ means S-shaped. This type of function is sometimes also called a ‘squashing function’ because it maps the whole real axis into a finite interval. The logistic sigmoid has been encountered already in earlier chapters and plays an important role in many classification algorithms. It satisfies the following symmetry property 

$$
\sigma (- a) = 1 - \sigma (a)\tag{4.60}
$$

as is easily verified. The inverse of the logistic sigmoid is given by 

$$
a = \ln \left(\frac {\sigma}{1 - \sigma}\right)\tag{4.61}
$$

and is known as the logit function. It represents the log of the ratio of probabilities ln $[ p ( \mathcal { C } _ { 1 } | \mathbf { x } ) / p ( \mathcal { C } _ { 2 } | \mathbf { x } ) ]$ for the two classes, also known as the log odds. 

Note that in (4.57) we have simply rewritten the posterior probabilities in an equivalent form, and so the appearance of the logistic sigmoid may seem rather vacuous. However, it will have significance provided $a ( \mathbf { x } )$ takes a simple functional form. We shall shortly consider situations in which $a ( \mathbf { x } )$ is a linear function of $\mathbf { x } ,$ in which case the posterior probability is governed by a generalized linear model. 

For the case of $K > 2$ classes, we have 

$$
\begin{array}{r c l} p (\mathcal {C} _ {k} | \mathbf {x}) & = & \frac {p (\mathbf {x} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k})}{\sum_ {j} p (\mathbf {x} | \mathcal {C} _ {j}) p (\mathcal {C} _ {j})} \\ & = & \frac {\exp (a _ {k})}{\sum_ {j} \exp (a _ {j})} \end{array}\tag{4.62}
$$

which is known as the normalized exponential and can be regarded as a multiclass generalization of the logistic sigmoid. Here the quantities $a _ { k }$ are defined by 

$$
a _ {k} = \ln p (\mathbf {x} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k}).\tag{4.63}
$$

The normalized exponential is also known as the softmax function, as it represents a smoothed version of the ‘max’ function because, if $a _ { k } \gg a _ { j }$ for all $j \neq k$ , then $p ( \mathcal { C } _ { k } | \mathbf { x } ) \simeq 1$ , and $p ( \mathcal { C } _ { j } | \mathbf { x } ) \simeq 0$ 

We now investigate the consequences of choosing specific forms for the classconditional densities, looking first at continuous input variables x and then discussing briefly the case of discrete inputs. 

## 4.2.1 Continuous inputs

Let us assume that the class-conditional densities are Gaussian and then explore the resulting form for the posterior probabilities. To start with, we shall assume that all classes share the same covariance matrix. Thus the density for class $\mathcal { C } _ { k }$ is given by 

$$
p (\mathbf {x} | \mathcal {C} _ {k}) = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \exp \left\{- \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu} _ {k}) \right\}.\tag{4.64}
$$

Consider first the case of two classes. From (4.57) and (4.58), we have 

$$
p (\mathcal {C} _ {1} | \mathbf {x}) = \sigma (\mathbf {w} ^ {\mathrm{T}} \mathbf {x} + w _ {0})\tag{4.65}
$$

where we have defined 

$$
\mathbf {w} = \boldsymbol {\Sigma} ^ {- 1} (\boldsymbol {\mu} _ {1} - \boldsymbol {\mu} _ {2})\tag{4.66}
$$

$$
w _ {0} = - \frac {1}{2} \boldsymbol {\mu} _ {1} ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} \boldsymbol {\mu} _ {1} + \frac {1}{2} \boldsymbol {\mu} _ {2} ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} \boldsymbol {\mu} _ {2} + \ln \frac {p (\mathcal {C} _ {1})}{p (\mathcal {C} _ {2})}.\tag{4.67}
$$

We see that the quadratic terms in x from the exponents of the Gaussian densities have cancelled (due to the assumption of common covariance matrices) leading to a linear function of x in the argument of the logistic sigmoid. This result is illustrated for the case of a two-dimensional input space x in Figure 4.10. The resulting decision boundaries correspond to surfaces along which the posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ are constant and so will be given by linear functions of $\mathbf { x } ,$ and therefore the decision boundaries are linear in input space. The prior probabilities $p ( \mathcal { C } _ { k } )$ enter only through the bias parameter $w _ { 0 }$ so that changes in the priors have the effect of making parallel shifts of the decision boundary and more generally of the parallel contours of constant posterior probability. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/b2a8fe57e42ae45445c533fe57f02bb8e9101c10e227d00e02ba556e914537e7.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/05d7276e60246a37a961361f1be4cfeb98a8cad88c38b70c87670838a55d7a2f.jpg)



Figure 4.10 The left-hand plot shows the class-conditional densities for two classes, denoted red and blue. On the right is the corresponding posterior probability $p ( \mathcal { C } _ { 1 } | \mathbf { x } )$ , which is given by a logistic sigmoid of a linear function of x. The surface in the right-hand plot is coloured using a proportion of red ink given by $p ( \mathcal { C } _ { 1 } | \mathbf { x } )$ and a proportion of blue ink given by $p ( \mathcal { C } _ { 2 } \vert \mathbf { x } ) = 1 - p ( \mathcal { C } _ { 1 } \vert \mathbf { x } )$


For the general case of K classes we have, from (4.62) and (4.63), 

$$
a _ {k} (\mathbf {x}) = \mathbf {w} _ {k} ^ {\mathrm{T}} \mathbf {x} + w _ {k 0}\tag{4.68}
$$

where we have defined 

$$
{\bf w} _ {k} = {\bf \Sigma} ^ {- 1} {\pmb \mu} _ {k}\tag{4.69}
$$

$$
{w _ {k 0}} = {- \frac {1}{2} \pmb {\mu} _ {k} ^ {\mathrm{T}} \pmb {\Sigma} ^ {- 1} \pmb {\mu} _ {k} + \ln p (\mathcal {C} _ {k}).}\tag{4.70}
$$

We see that the $a _ { k } ( { \bf x } )$ are again linear functions of x as a consequence of the cancellation of the quadratic terms due to the shared covariances. The resulting decision boundaries, corresponding to the minimum misclassification rate, will occur when two of the posterior probabilities (the two largest) are equal, and so will be defined by linear functions of x, and so again we have a generalized linear model. 

If we relax the assumption of a shared covariance matrix and allow each classconditional density $p ( \mathbf { x } | \mathcal { C } _ { k } )$ to have its own covariance matrix $\Sigma _ { k }$ , then the earlier cancellations will no longer occur, and we will obtain quadratic functions of x, giving rise to a quadratic discriminant. The linear and quadratic decision boundaries are illustrated in Figure 4.11. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/23e26baa0589a37622f6d60169cb129837ea780a6ae8054fe952f6a0d4e9c662.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/31a66b455b455a18cf36c9a18eab49fa295044f999880d9c500147db638eec6b.jpg)



Figure 4.11 The left-hand plot shows the class-conditional densities for three classes each having a Gaussian distribution, coloured red, green, and blue, in which the red and green classes have the same covariance matrix. The right-hand plot shows the corresponding posterior probabilities, in which the RGB colour vector represents the posterior probabilities for the respective three classes. The decision boundaries are also shown. Notice that the boundary between the red and green classes, which have the same covariance matrix, is linear, whereas those between the other pairs of classes are quadratic.


## 4.2.2 Maximum likelihood solution

Once we have specified a parametric functional form for the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ , we can then determine the values of the parameters, together with the prior class probabilities $p ( \mathcal { C } _ { k } )$ , using maximum likelihood. This requires a data set comprising observations of x along with their corresponding class labels. 

Consider first the case of two classes, each having a Gaussian class-conditional density with a shared covariance matrix, and suppose we have a data set $\{ \mathbf { x } _ { n } , t _ { n } \}$ where $n = 1 , \ldots , N$ . Here $t _ { n } = 1$ denotes class $\mathcal { C } _ { 1 }$ and $t _ { n } = 0$ denotes class $\mathcal { C } _ { 2 }$ . We denote the prior class probability $p ( \mathcal { C } _ { 1 } ) = \pi$ , so that $p ( \mathcal { C } _ { 2 } ) = 1 - \pi$ . For a data point ${ \bf x } _ { n }$ from class $\mathcal { C } _ { 1 }$ , we have $t _ { n } = 1$ and hence 

$$
p (\mathbf {x} _ {n}, \mathcal {C} _ {1}) = p (\mathcal {C} _ {1}) p (\mathbf {x} _ {n} | \mathcal {C} _ {1}) = \pi \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {1}, \boldsymbol {\Sigma}).
$$

Similarly for class $\mathcal { C } _ { 2 }$ , we have $t _ { n } = 0$ and hence 

$$
p (\mathbf {x} _ {n}, \mathcal {C} _ {2}) = p (\mathcal {C} _ {2}) p (\mathbf {x} _ {n} | \mathcal {C} _ {2}) = (1 - \pi) \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {2}, \boldsymbol {\Sigma}).
$$

Thus the likelihood function is given by 

$$
p (\mathbf {t} | \pi , \boldsymbol {\mu} _ {1}, \boldsymbol {\mu} _ {2}, \boldsymbol {\Sigma}) = \prod_ {n = 1} ^ {N} \left[ \pi \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {1}, \boldsymbol {\Sigma}) \right] ^ {t _ {n}} \left[ (1 - \pi) \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {2}, \boldsymbol {\Sigma}) \right] ^ {1 - t _ {n}}\tag{4.71}
$$

where $\mathbf { t } ~ = ~ ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . As usual, it is convenient to maximize the log of the likelihood function. Consider first the maximization with respect to $\pi .$ . The terms in the log likelihood function that depend on $\pi$ are 

$$
\sum_ {n = 1} ^ {N} \left\{t _ {n} \ln \pi + (1 - t _ {n}) \ln (1 - \pi) \right\}.\tag{4.72}
$$

Setting the derivative with respect to $\pi$ equal to zero and rearranging, we obtain 

$$
\pi = \frac {1}{N} \sum_ {n = 1} ^ {N} t _ {n} = \frac {N _ {1}}{N} = \frac {N _ {1}}{N _ {1} + N _ {2}}\tag{4.73}
$$

where $N _ { 1 }$ denotes the total number of data points in class $\mathcal { C } _ { 1 }$ , and $N _ { 2 }$ denotes the total number of data points in class $\mathcal { C } _ { 2 }$ . Thus the maximum likelihood estimate for $\pi$ is simply the fraction of points in class $\mathcal { C } _ { 1 }$ as expected. This result is easily generalized to the multiclass case where again the maximum likelihood estimate of the prior probability associated with class $\mathcal { C } _ { k }$ is given by the fraction of the training set points assigned to that class. 

Now consider the maximization with respect to $\pmb { \mu } _ { 1 }$ . Again we can pick out of the log likelihood function those terms that depend on $\pmb { \mu } _ { 1 }$ giving 

$$
\sum_ {n = 1} ^ {N} t _ {n} \ln \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {1}, \boldsymbol {\Sigma}) = - \frac {1}{2} \sum_ {n = 1} ^ {N} t _ {n} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {1}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {1}) + \text { const }.\tag{4.74}
$$

Setting the derivative with respect to $\pmb { \mu } _ { 1 }$ to zero and rearranging, we obtain 

$$
\pmb {\mu} _ {1} = \frac {1}{N _ {1}} \sum_ {n = 1} ^ {N} t _ {n} \mathbf {x} _ {n}\tag{4.75}
$$

which is simply the mean of all the input vectors ${ \bf x } _ { n }$ assigned to class $\mathcal { C } _ { 1 }$ . By a similar argument, the corresponding result for $\pmb { \mu } _ { 2 }$ is given by 

$$
\boldsymbol {\mu} _ {2} = \frac {1}{N _ {2}} \sum_ {n = 1} ^ {N} (1 - t _ {n}) \mathbf {x} _ {n}\tag{4.76}
$$

which again is the mean of all the input vectors ${ \bf x } _ { n }$ assigned to class $\mathcal { C } _ { 2 }$ . 

Finally, consider the maximum likelihood solution for the shared covariance matrix Σ. Picking out the terms in the log likelihood function that depend on $\Sigma .$ , we have 

$$
\begin{array}{l} - \frac {1}{2} \sum_ {n = 1} ^ {N} t _ {n} \ln | \boldsymbol {\Sigma} | - \frac {1}{2} \sum_ {n = 1} ^ {N} t _ {n} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {1}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {1}) \\ - \frac {1}{2} \sum_ {n = 1} ^ {N} (1 - t _ {n}) \ln | \boldsymbol {\Sigma} | - \frac {1}{2} \sum_ {n = 1} ^ {N} (1 - t _ {n}) (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {2}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {2}) \\ = - \frac {N}{2} \ln | \boldsymbol {\Sigma} | - \frac {N}{2} \operatorname{Tr} \left\{\boldsymbol {\Sigma} ^ {- 1} \mathbf {S} \right\} \end{array}\tag{4.77}
$$

where we have defined 

$$
\mathbf {S} = \frac {N _ {1}}{N} \mathbf {S} _ {1} + \frac {N _ {2}}{N} \mathbf {S} _ {2}\tag{4.78}
$$

$$
{\bf S} _ {1} = \frac {1}{N _ {1}} \sum_ {n \in \mathcal {C} _ {1}} ({\bf x} _ {n} - {\boldsymbol {\mu}} _ {1}) ({\bf x} _ {n} - {\boldsymbol {\mu}} _ {1}) ^ {\mathrm{T}}\tag{4.79}
$$

$$
\mathbf {S} _ {2} = \frac {1}{N _ {2}} \sum_ {n \in \mathcal {C} _ {2}} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {2}) (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {2}) ^ {\mathrm{T}}.\tag{4.80}
$$

Using the standard result for the maximum likelihood solution for a Gaussian distribution, we see that $\mathbf { \Delta } \Sigma = \mathbf { S }$ , which represents a weighted average of the covariance matrices associated with each of the two classes separately. 

This result is easily extended to the $K$ class problem to obtain the corresponding maximum likelihood solutions for the parameters in which each class-conditional density is Gaussian with a shared covariance matrix. Note that the approach of fitting Gaussian distributions to the classes is not robust to outliers, because the maximum likelihood estimation of a Gaussian is not robust. 

## 4.2.3 Discrete features

Let us now consider the case of discrete feature values $x _ { i }$ . For simplicity, we begin by looking at binary feature values $x _ { i } \in \{ 0 , 1 \}$ and discuss the extension to more general discrete features shortly. If there are $D$ inputs, then a general distribution would correspond to a table of $\mathrm { \dot { 2 } } ^ { D }$ numbers for each class, containing $2 ^ { D } - 1$ independent variables (due to the summation constraint). Because this grows exponentially with the number of features, we might seek a more restricted representation. Here we will make the naive Bayes assumption in which the feature values are treated as independent, conditioned on the class $\mathcal { C } _ { k }$ . Thus we have class-conditional distributions of the form 

$$
p (\mathbf {x} | \mathcal {C} _ {k}) = \prod_ {i = 1} ^ {D} \mu_ {k i} ^ {x _ {i}} (1 - \mu_ {k i}) ^ {1 - x _ {i}}\tag{4.81}
$$

which contain D independent parameters for each class. Substituting into (4.63) then gives 

$$
a _ {k} (\mathbf {x}) = \sum_ {i = 1} ^ {D} \left\{x _ {i} \ln \mu_ {k i} + (1 - x _ {i}) \ln (1 - \mu_ {k i}) \right\} + \ln p (\mathcal {C} _ {k})\tag{4.82}
$$

which again are linear functions of the input values $x _ { i }$ . For the case of $K = 2$ classes, we can alternatively consider the logistic sigmoid formulation given by (4.57). Analogous results are obtained for discrete variables each of which can take $M \ > \ 2$ states. 

## 4.2.4 Exponential family

As we have seen, for both Gaussian distributed and discrete inputs, the posterior class probabilities are given by generalized linear models with logistic sigmoid $( K =$ 

2 classes) or softmax $( K \geqslant 2$ classes) activation functions. These are particular cases of a more general result obtained by assuming that the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ are members of the exponential family of distributions. 

Using the form (2.194) for members of the exponential family, we see that the distribution of x can be written in the form 

$$
p (\mathbf {x} | \boldsymbol {\lambda} _ {k}) = h (\mathbf {x}) g (\boldsymbol {\lambda} _ {k}) \exp \left\{\boldsymbol {\lambda} _ {k} ^ {\mathrm{T}} \mathbf {u} (\mathbf {x}) \right\}.\tag{4.83}
$$

We now restrict attention to the subclass of such distributions for which $\mathbf { u } ( \mathbf { x } ) = \mathbf { x }$ Then we make use of (2.236) to introduce a scaling parameter s, so that we obtain the restricted set of exponential family class-conditional densities of the form 

$$
p (\mathbf {x} | \boldsymbol {\lambda} _ {k}, s) = \frac {1}{s} h \left(\frac {1}{s} \mathbf {x}\right) g (\boldsymbol {\lambda} _ {k}) \exp \left\{\frac {1}{s} \boldsymbol {\lambda} _ {k} ^ {\mathrm{T}} \mathbf {x} \right\}.\tag{4.84}
$$

Note that we are allowing each class to have its own parameter vector $\lambda _ { k }$ but we are assuming that the classes share the same scale parameter s. 

For the two-class problem, we substitute this expression for the class-conditional densities into (4.58) and we see that the posterior class probability is again given by a logistic sigmoid acting on a linear function $a ( \mathbf { x } )$ which is given by 

$$
a (\mathbf {x}) = \left(\boldsymbol {\lambda} _ {1} - \boldsymbol {\lambda} _ {2}\right) ^ {\mathrm{T}} \mathbf {x} + \ln g \left(\boldsymbol {\lambda} _ {1}\right) - \ln g \left(\boldsymbol {\lambda} _ {2}\right) + \ln p \left(\mathcal {C} _ {1}\right) - \ln p \left(\mathcal {C} _ {2}\right).\tag{4.85}
$$

Similarly, for the K-class problem, we substitute the class-conditional density expression into (4.63) to give 

$$
a _ {k} (\mathbf {x}) = \boldsymbol {\lambda} _ {k} ^ {\mathrm{T}} \mathbf {x} + \ln g (\boldsymbol {\lambda} _ {k}) + \ln p (\mathcal {C} _ {k})\tag{4.86}
$$

and so again is a linear function of x. 

## 4.3. Probabilistic Discriminative Models

For the two-class classification problem, we have seen that the posterior probability of class $\mathcal { C } _ { 1 }$ can be written as a logistic sigmoid acting on a linear function of x, for a wide choice of class-conditional distributions $p ( \mathbf { x } | \mathcal { C } _ { k } )$ . Similarly, for the multiclass case, the posterior probability of class $\mathcal { C } _ { k }$ is given by a softmax transformation of a linear function of x. For specific choices of the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ , we have used maximum likelihood to determine the parameters of the densities as well as the class priors $p ( \mathcal { C } _ { k } )$ and then used Bayes’ theorem to find the posterior class probabilities. 

However, an alternative approach is to use the functional form of the generalized linear model explicitly and to determine its parameters directly by using maximum likelihood. We shall see that there is an efficient algorithm finding such solutions known as iterative reweighted least squares, or IRLS. 

The indirect approach to finding the parameters of a generalized linear model, by fitting class-conditional densities and class priors separately and then applying 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/30dbd26949a61fd33a3346454c643698c3d05b2c2065df2da3b0188e6f8b021b.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/21d31eff7e81d6f17774c217e8314527acf88192cccb2ae430ce508ec96a447c.jpg)



Figure 4.12 Illustration of the role of nonlinear basis functions in linear classification models. The left plot shows the original input space $( x _ { 1 } , x _ { 2 } )$ together with data points from two classes labelled red and blue. Two ‘Gaussian’ basis functions φ (x) and $\phi _ { 2 } ( \mathbf { x } )$ are defined in this space with centres shown by the green crosses and with contours shown by the green circles. The right-hand plot shows the corresponding feature space $\left( \phi _ { 1 } , \phi _ { 2 } \right)$ together with the linear decision boundary obtained given by a logistic regression model of the form discussed in Section 4.3.2. This corresponds to a nonlinear decision boundary in the original input space, shown by the black curve in the left-hand plot.


Bayes’ theorem, represents an example of generative modelling, because we could take such a model and generate synthetic data by drawing values of x from the marginal distribution $p ( \mathbf { x } )$ . In the direct approach, we are maximizing a likelihood function defined through the conditional distribution $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ , which represents a form of discriminative training. One advantage of the discriminative approach is that there will typically be fewer adaptive parameters to be determined, as we shall see shortly. It may also lead to improved predictive performance, particularly when the class-conditional density assumptions give a poor approximation to the true distributions. 

## 4.3.1 Fixed basis functions

So far in this chapter, we have considered classification models that work directly with the original input vector x. However, all of the algorithms are equally applicable if we first make a fixed nonlinear transformation of the inputs using a vector of basis functions $\phi ( \mathbf { x } )$ . The resulting decision boundaries will be linear in the feature space $\phi ,$ and these correspond to nonlinear decision boundaries in the original x space, as illustrated in Figure 4.12. Classes that are linearly separable in the feature space $\phi ( \mathbf { x } )$ need not be linearly separable in the original observation space x. Note that as in our discussion of linear models for regression, one of the basis functions is typically set to a constant, say $\phi _ { 0 } ( \mathbf { x } ) = 1$ , so that the corresponding parameter $w _ { 0 }$ plays the role of a bias. For the remainder of this chapter, we shall include a fixed basis function transformation $\phi ( \mathbf { x } )$ , as this will highlight some useful similarities to the regression models discussed in Chapter 3. 

For many problems of practical interest, there is significant overlap between the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ . This corresponds to posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ , which, for at least some values of $\mathbf { x } ,$ are not 0 or 1. In such cases, the optimal solution is obtained by modelling the posterior probabilities accurately and then applying standard decision theory, as discussed in Chapter 1. Note that nonlinear transformations $\phi ( \mathbf { x } )$ cannot remove such class overlap. Indeed, they can increase the level of overlap, or create overlap where none existed in the original observation space. However, suitable choices of nonlinearity can make the process of modelling the posterior probabilities easier. 

Such fixed basis function models have important limitations, and these will be resolved in later chapters by allowing the basis functions themselves to adapt to the data. Notwithstanding these limitations, models with fixed nonlinear basis functions play an important role in applications, and a discussion of such models will introduce many of the key concepts needed for an understanding of their more complex counterparts. 

## 4.3.2 Logistic regression

We begin our treatment of generalized linear models by considering the problem of two-class classification. In our discussion of generative approaches in Section 4.2, we saw that under rather general assumptions, the posterior probability of class $\mathcal { C } _ { 1 }$ can be written as a logistic sigmoid acting on a linear function of the feature vector $\phi$ so that 

$$
p (\mathcal {C} _ {1} | \phi) = y (\phi) = \sigma \left(\mathbf {w} ^ {\mathrm{T}} \phi\right)\tag{4.87}
$$

with $p ( \mathcal { C } _ { 2 } | \phi ) = 1 - p ( \mathcal { C } _ { 1 } | \phi )$ . Here $\sigma ( \cdot )$ is the logistic sigmoid function defined by (4.59). In the terminology of statistics, this model is known as logistic regression, although it should be emphasized that this is a model for classification rather than regression. 

For an M-dimensional feature space $\phi ,$ , this model has M adjustable parameters. By contrast, if we had fitted Gaussian class conditional densities using maximum likelihood, we would have used 2M parameters for the means and $M ( M + 1 ) / 2$ parameters for the (shared) covariance matrix. Together with the class prior $p ( \mathcal { C } _ { 1 } )$ , this gives a total of $M ( M + 5 ) / 2 + 1$ parameters, which grows quadratically with $M$ in contrast to the linear dependence on M of the number of parameters in logistic regression. For large values of $M$ , there is a clear advantage in working with the logistic regression model directly. 

We now use maximum likelihood to determine the parameters of the logistic regression model. To do this, we shall make use of the derivative of the logistic sigmoid function, which can conveniently be expressed in terms of the sigmoid function itself 

$$
\frac {d \sigma}{d a} = \sigma (1 - \sigma).\tag{4.88}
$$

For a data set $\{ \phi _ { n } , t _ { n } \}$ , where $t _ { n } ~ \in ~ \{ 0 , 1 \}$ and $\phi _ { n } ~ = ~ \phi ( \mathbf { x } _ { n } )$ , with $n =$ $1 , \ldots , N$ , the likelihood function can be written 

$$
p (\mathbf {t} | \mathbf {w}) = \prod_ {n = 1} ^ {N} y _ {n} ^ {t _ {n}} \left\{1 - y _ {n} \right\} ^ {1 - t _ {n}}\tag{4.89}
$$

where ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ and $y _ { n } ~ = ~ p ( \mathcal { C } _ { 1 } | \phi _ { n } )$ . As usual, we can define an error function by taking the negative logarithm of the likelihood, which gives the crossentropy error function in the form 

$$
E (\mathbf {w}) = - \ln p (\mathbf {t} | \mathbf {w}) = - \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\}\tag{4.90}
$$

where $y _ { n } = \sigma ( a _ { n } )$ and $a _ { n } = \mathbf { w } ^ { \mathrm { T } } \phi _ { n }$ . Taking the gradient of the error function with respect to w, we obtain 

$$
\nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} (y _ {n} - t _ {n}) \phi_ {n}\tag{4.91}
$$

where we have made use of (4.88). We see that the factor involving the derivative of the logistic sigmoid has cancelled, leading to a simplified form for the gradient of the log likelihood. In particular, the contribution to the gradient from data point n is given by the ‘error $y _ { n } - t _ { n }$ between the target value and the prediction of the model, times the basis function vector $\phi _ { n }$ . Furthermore, comparison with (3.13) shows that this takes precisely the same form as the gradient of the sum-of-squares error function for the linear regression model. 

If desired, we could make use of the result (4.91) to give a sequential algorithm in which patterns are presented one at a time, in which each of the weight vectors is updated using (3.22) in which $\nabla E _ { n }$ is the $n ^ { \mathrm { t h } }$ term in (4.91). 

It is worth noting that maximum likelihood can exhibit severe over-fitting for data sets that are linearly separable. This arises because the maximum likelihood solution occurs when the hyperplane corresponding to $\sigma = 0 . 5$ , equivalent to ${ \bf w } ^ { \mathrm { T } } \phi = { }$ 0, separates the two classes and the magnitude of w goes to infinity. In this case, the logistic sigmoid function becomes infinitely steep in feature space, corresponding to a Heaviside step function, so that every training point from each class k is assigned a posterior probability $p ( \mathcal { C } _ { k } | \mathbf { x } ) = 1$ . Furthermore, there is typically a continuum of such solutions because any separating hyperplane will give rise to the same posterior probabilities at the training data points, as will be seen later in Figure 10.13. Maximum likelihood provides no way to favour one such solution over another, and which solution is found in practice will depend on the choice of optimization algorithm and on the parameter initialization. Note that the problem will arise even if the number of data points is large compared with the number of parameters in the model, so long as the training data set is linearly separable. The singularity can be avoided by inclusion of a prior and finding a MAP solution for w, or equivalently by adding a regularization term to the error function. 

## 4.3.3 Iterative reweighted least squares

In the case of the linear regression models discussed in Chapter 3, the maximum likelihood solution, on the assumption of a Gaussian noise model, leads to a closed-form solution. This was a consequence of the quadratic dependence of the log likelihood function on the parameter vector w. For logistic regression, there is no longer a closed-form solution, due to the nonlinearity of the logistic sigmoid function. However, the departure from a quadratic form is not substantial. To be precise, the error function is concave, as we shall see shortly, and hence has a unique minimum. Furthermore, the error function can be minimized by an efficient iterative technique based on the Newton-Raphson iterative optimization scheme, which uses a local quadratic approximation to the log likelihood function. The Newton-Raphson update, for minimizing a function $E ( \mathbf { w } )$ , takes the form (Fletcher, 1987; Bishop and Nabney, 2008) 

$$
\mathbf {w} ^ {\mathrm{(new)}} = \mathbf {w} ^ {\mathrm{(old)}} - \mathbf {H} ^ {- 1} \nabla E (\mathbf {w}).\tag{4.92}
$$

where H is the Hessian matrix whose elements comprise the second derivatives of $E ( \mathbf { w } )$ with respect to the components of w. 

Let us first of all apply the Newton-Raphson method to the linear regression model (3.3) with the sum-of-squares error function (3.12). The gradient and Hessian of this error function are given by 

$$
\nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} (\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} - t _ {n}) \boldsymbol {\phi} _ {n} = \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi} \mathbf {w} - \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}\tag{4.93}
$$

$$
\mathbf {H} = \nabla \nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} \phi_ {n} \phi_ {n} ^ {\mathrm{T}} = \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\tag{4.94}
$$

Section 3.1.1 

where $\Phi$ is the $N \times M$ design matrix, whose $n ^ { \mathrm { t h } }$ row is given by $\boldsymbol { \phi } _ { n } ^ { \mathrm { T } }$ . The Newton-Raphson update then takes the form 

$$
\begin{array}{r c l} \mathbf {w} ^ {\text {(new)}} & = & \mathbf {w} ^ {\text {(old)}} - (\boldsymbol {\Phi} ^ {\text {T}} \boldsymbol {\Phi}) ^ {- 1} \left\{\boldsymbol {\Phi} ^ {\text {T}} \boldsymbol {\Phi} \mathbf {w} ^ {\text {(old)}} - \boldsymbol {\Phi} ^ {\text {T}} \mathbf {t} \right\} \\ & = & (\boldsymbol {\Phi} ^ {\text {T}} \boldsymbol {\Phi}) ^ {- 1} \boldsymbol {\Phi} ^ {\text {T}} \mathbf {t} \end{array}\tag{4.95}
$$

which we recognize as the standard least-squares solution. Note that the error function in this case is quadratic and hence the Newton-Raphson formula gives the exact solution in one step. 

Now let us apply the Newton-Raphson update to the cross-entropy error function (4.90) for the logistic regression model. From (4.91) we see that the gradient and Hessian of this error function are given by 

$$
\nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} (y _ {n} - t _ {n}) \phi_ {n} = \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {y} - \mathbf {t})\tag{4.96}
$$

$$
\mathbf {H} = \nabla \nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} y _ {n} (1 - y _ {n}) \phi_ {n} \phi_ {n} ^ {\mathrm{T}} = \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi}\tag{4.97}
$$

where we have made use of (4.88). Also, we have introduced the $N \times N$ diagonal matrix R with elements 

$$
R _ {n n} = y _ {n} (1 - y _ {n}).\tag{4.98}
$$

We see that the Hessian is no longer constant but depends on w through the weighting matrix R, corresponding to the fact that the error function is no longer quadratic. Using the property $0 < y _ { n } < 1$ , which follows from the form of the logistic sigmoid function, we see that $\mathbf { u } ^ { \mathrm { T } } \mathbf { H } \mathbf { u } > 0$ for an arbitrary vector u, and so the Hessian matrix H is positive definite. It follows that the error function is a concave function of w and hence has a unique minimum. 

The Newton-Raphson update formula for the logistic regression model then becomes 

$$
\begin{array}{r c l} \mathbf {w} ^ {\text {(new)}} & = & \mathbf {w} ^ {\text {(old)}} - (\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi}) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {y} - \mathbf {t}) \\ & = & (\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi}) ^ {- 1} \left\{\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi} \mathbf {w} ^ {\text {(old)}} - \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {y} - \mathbf {t}) \right\} \\ & = & (\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi}) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \mathbf {z} \end{array}\tag{4.99}
$$

where z is an N-dimensional vector with elements 

$$
\mathbf {z} = \boldsymbol {\Phi} \mathbf {w} ^ {(\text { old })} - \mathbf {R} ^ {- 1} (\mathbf {y} - \mathbf {t}).\tag{4.100}
$$

We see that the update formula (4.99) takes the form of a set of normal equations for a weighted least-squares problem. Because the weighing matrix R is not constant but depends on the parameter vector w, we must apply the normal equations iteratively, each time using the new weight vector w to compute a revised weighing matrix R. For this reason, the algorithm is known as iterative reweighted least squares, or IRLS (Rubin, 1983). As in the weighted least-squares problem, the elements of the diagonal weighting matrix R can be interpreted as variances because the mean and variance of t in the logistic regression model are given by 

$$
{\mathbb {E} [ t ]} = {\sigma (\mathbf {x}) = y}\tag{4.101}
$$

$$
\operatorname{var} [ t ] = \mathbb {E} [ t ^ {2} ] - \mathbb {E} [ t ] ^ {2} = \sigma (\mathbf {x}) - \sigma (\mathbf {x}) ^ {2} = y (1 - y)\tag{4.102}
$$

where we have used the property $t ^ { 2 } = t$ for $t \in \{ 0 , 1 \}$ . In fact, we can interpret IRLS as the solution to a linearized problem in the space of the variable $a = \mathbf { w } ^ { \mathrm { T } } \phi$ . The quantity $z _ { n }$ , which corresponds to the $n ^ { \mathrm { t h } }$ element of z, can then be given a simple interpretation as an effective target value in this space obtained by making a local linear approximation to the logistic sigmoid function around the current operating point $\mathbf { w } \mathbf { ( \bar { o } l d ) }$ 

$$
\begin{array}{r c l} {a _ {n} (\mathbf {w})} & \simeq & {a _ {n} (\mathbf {w} ^ {(\mathrm{old})}) + \left. \frac {\mathrm{d} a _ {n}}{\mathrm{d} y _ {n}} \right| _ {\mathbf {w} ^ {(\mathrm{old})}} (t _ {n} - y _ {n})} \\ & = & {\phi_ {n} ^ {\mathrm{T}} \mathbf {w} ^ {(\mathrm{old})} - \frac {(y _ {n} - t _ {n})}{y _ {n} (1 - y _ {n})} = z _ {n}.} \end{array}\tag{4.103}
$$

## 4.3.4 Multiclass logistic regression

In our discussion of generative models for multiclass classification, we have seen that for a large class of distributions, the posterior probabilities are given by a softmax transformation of linear functions of the feature variables, so that 

$$
p (\mathcal {C} _ {k} | \phi) = y _ {k} (\phi) = \frac {\exp (a _ {k})}{\sum_ {j} \exp (a _ {j})}\tag{4.104}
$$

where the ‘activations’ $a _ { k }$ are given by 

$$
a _ {k} = \mathbf {w} _ {k} ^ {\mathrm{T}} \phi .\tag{4.105}
$$

There we used maximum likelihood to determine separately the class-conditional densities and the class priors and then found the corresponding posterior probabilities using Bayes’ theorem, thereby implicitly determining the parameters $\left\{ \mathbf { w } _ { k } \right\}$ . Here we consider the use of maximum likelihood to determine the parameters $\left\{ \mathbf { w } _ { k } \right\}$ of this model directly. To do this, we will require the derivatives of $y _ { k }$ with respect to all of the activations $a _ { j }$ . These are given by 

$$
\frac {\partial y _ {k}}{\partial a _ {j}} = y _ {k} (I _ {k j} - y _ {j})\tag{4.106}
$$

where $I _ { k j }$ are the elements of the identity matrix. 

Next we write down the likelihood function. This is most easily done using the 1-of-K coding scheme in which the target vector $\mathbf { t } _ { n }$ for a feature vector $\phi _ { n }$ belonging to class $\mathcal { C } _ { k }$ is a binary vector with all elements zero except for element $k ,$ , which equals one. The likelihood function is then given by 

$$
p (\mathbf {T} | \mathbf {w} _ {1}, \dots , \mathbf {w} _ {K}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} p (\mathcal {C} _ {k} | \phi_ {n}) ^ {t _ {n k}} = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} y _ {n k} ^ {t _ {n k}}\tag{4.107}
$$

where $y _ { n k } = y _ { k } ( \phi _ { n } )$ , and T is an $N \times K$ matrix of target variables with elements $t _ { n k }$ . Taking the negative logarithm then gives 

$$
E (\mathbf {w} _ {1}, \ldots , \mathbf {w} _ {K}) = - \ln p (\mathbf {T} | \mathbf {w} _ {1}, \ldots , \mathbf {w} _ {K}) = - \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} t _ {n k} \ln y _ {n k}\tag{4.108}
$$

which is known as the cross-entropy error function for the multiclass classification problem. 

We now take the gradient of the error function with respect to one of the parameter vectors ${ \bf w } _ { j }$ . Making use of the result (4.106) for the derivatives of the softmax function, we obtain 

$$
\nabla_ {\mathbf {w} _ {j}} E (\mathbf {w} _ {1}, \ldots , \mathbf {w} _ {K}) = \sum_ {n = 1} ^ {N} (y _ {n j} - t _ {n j}) \phi_ {n}\tag{4.109}
$$

Exercise 4.20 

where we have made use of $\textstyle \sum _ { k } t _ { n k } = 1$ . Once again, we see the same form arising for the gradient as was found for the sum-of-squares error function with the linear model and the cross-entropy error for the logistic regression model, namely the product of the error $( y _ { n j } - t _ { n j } )$ times the basis function $\phi _ { n }$ . Again, we could use this to formulate a sequential algorithm in which patterns are presented one at a time, in which each of the weight vectors is updated using (3.22). 

We have seen that the derivative of the log likelihood function for a linear regression model with respect to the parameter vector w for a data point n took the form of the ‘error’ $y _ { n } - t _ { n }$ times the feature vector $\phi _ { n }$ . Similarly, for the combination of logistic sigmoid activation function and cross-entropy error function (4.90), and for the softmax activation function with the multiclass cross-entropy error function (4.108), we again obtain this same simple form. This is an example of a more general result, as we shall see in Section 4.3.6. 

To find a batch algorithm, we again appeal to the Newton-Raphson update to obtain the corresponding IRLS algorithm for the multiclass problem. This requires evaluation of the Hessian matrix that comprises blocks of size $M \times M$ in which block $j ,$ k is given by 

$$
\nabla_ {\mathbf {w} _ {k}} \nabla_ {\mathbf {w} _ {j}} E (\mathbf {w} _ {1}, \ldots , \mathbf {w} _ {K}) = - \sum_ {n = 1} ^ {N} y _ {n k} (I _ {k j} - y _ {n j}) \phi_ {n} \phi_ {n} ^ {\mathrm{T}}.\tag{4.110}
$$

As with the two-class problem, the Hessian matrix for the multiclass logistic regression model is positive definite and so the error function again has a unique minimum. Practical details of IRLS for the multiclass case can be found in Bishop and Nabney (2008). 

## 4.3.5 Probit regression

We have seen that, for a broad range of class-conditional distributions, described by the exponential family, the resulting posterior class probabilities are given by a logistic (or softmax) transformation acting on a linear function of the feature variables. However, not all choices of class-conditional density give rise to such a simple form for the posterior probabilities (for instance, if the class-conditional densities are modelled using Gaussian mixtures). This suggests that it might be worth exploring other types of discriminative probabilistic model. For the purposes of this chapter, however, we shall return to the two-class case, and again remain within the framework of generalized linear models so that 

$$
p (t = 1 | a) = f (a)\tag{4.111}
$$

where $a = \mathbf { w } ^ { \mathrm { T } } \phi$ , and $f ( \cdot )$ is the activation function. 

One way to motivate an alternative choice for the link function is to consider a noisy threshold model, as follows. For each input $\phi _ { n }$ , we evaluate $a _ { n } = \mathbf { w } ^ { \mathrm { T } } \phi _ { n }$ and then we set the target value according to 

$$
\left\{ \begin{array}{l l} t _ {n} = 1 & \text { if } a _ {n} \geqslant \theta \\ t _ {n} = 0 & \text { otherwise. } \end{array} \right.\tag{4.112}
$$


Figure 4.13 Schematic example of a probability density $p ( \theta )$ shown by the blue curve, given in this example by a mixture of two Gaussians, along with its cumulative distribution function $f ( a )$ , shown by the red curve. Note that the value of the blue curve at any point, such as that indicated by the vertical green line, corresponds to the slope of the red curve at the same point. Conversely, the value of the red curve at this point corresponds to the area under the blue curve indicated by the shaded green region. In the stochastic threshold model, the class label takes the value $t = 1$ if the value of $a = \mathbf { w } ^ { \mathrm { T } }$ φ exceeds a threshold, otherwise it takes the value $t = 0$ . This is equivalent to an activation function given by the cumulative distribution function $f ( a )$


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/c5e477788ff6f2d77b0fcec384cb8708965cb5998497f5bfc410f4a42266979e.jpg)


If the value of $\theta$ is drawn from a probability density $p ( \theta )$ , then the corresponding activation function will be given by the cumulative distribution function 

$$
f (a) = \int_ {- \infty} ^ {a} p (\theta) \mathrm{d} \theta\tag{4.113}
$$

as illustrated in Figure 4.13. 

As a specific example, suppose that the density $p ( \theta )$ is given by a zero mean, unit variance Gaussian. The corresponding cumulative distribution function is given by 

$$
\Phi (a) = \int_ {- \infty} ^ {a} \mathcal {N} (\theta | 0, 1) \mathrm{d} \theta\tag{4.114}
$$

which is known as the probit function. It has a sigmoidal shape and is compared with the logistic sigmoid function in Figure 4.9. Note that the use of a more general Gaussian distribution does not change the model because this is equivalent to a re-scaling of the linear coefficients w. Many numerical packages provide for the evaluation of a closely related function defined by 

$$
\operatorname{erf} (a) = \frac {2}{\sqrt {\pi}} \int_ {0} ^ {a} \exp (- \theta^ {2} / 2) \mathrm{d} \theta\tag{4.115}
$$

and known as the erffunction or error function (not to be confused with the error function of a machine learning model). It is related to the probit function by 

$$
\Phi (a) = \frac {1}{2} \left\{1 + \frac {1}{\sqrt {2}} \mathrm{erf} (a) \right\}.\tag{4.116}
$$

The generalized linear model based on a probit activation function is known as probit regression. 

We can determine the parameters of this model using maximum likelihood, by a straightforward extension of the ideas discussed earlier. In practice, the results found using probit regression tend to be similar to those of logistic regression. We shall, however, find another use for the probit model when we discuss Bayesian treatments of logistic regression in Section 4.5. 

One issue that can occur in practical applications is that of outliers, which can arise for instance through errors in measuring the input vector x or through mislabelling of the target value t. Because such points can lie a long way to the wrong side of the ideal decision boundary, they can seriously distort the classifier. Note that the logistic and probit regression models behave differently in this respect because the tails of the logistic sigmoid decay asymptotically like $\exp ( - x )$ for $x \to \infty$ , whereas for the probit activation function they decay like $\exp ( - x ^ { 2 } )$ , and so the probit model can be significantly more sensitive to outliers. 

However, both the logistic and the probit models assume the data is correctly labelled. The effect of mislabelling is easily incorporated into a probabilistic model by introducing a probability  that the target value t has been flipped to the wrong value (Opper and Winther, 2000a), leading to a target value distribution for data point x of the form 

$$
\begin{array}{r c l} p (t | \mathbf {x}) & = & (1 - \epsilon) \sigma (\mathbf {x}) + \epsilon (1 - \sigma (\mathbf {x})) \\ & = & \epsilon + (1 - 2 \epsilon) \sigma (\mathbf {x}) \end{array}\tag{4.117}
$$

where $\sigma ( \mathbf { x } )$ is the activation function with input vector x. Here  may be set in advance, or it may be treated as a hyperparameter whose value is inferred from the data. 

## 4.3.6 Canonical link functions

For the linear regression model with a Gaussian noise distribution, the error function, corresponding to the negative log likelihood, is given by (3.12). If we take the derivative with respect to the parameter vector w of the contribution to the error function from a data point n, this takes the form of the ‘error’ $y _ { n } - t _ { n }$ times the feature vector $\phi _ { n }$ , where $y _ { n } = \mathbf { w } ^ { \mathrm { T } } \phi _ { n }$ . Similarly, for the combination of the logistic sigmoid activation function and the cross-entropy error function (4.90), and for the softmax activation function with the multiclass cross-entropy error function (4.108), we again obtain this same simple form. We now show that this is a general result of assuming a conditional distribution for the target variable from the exponential family, along with a corresponding choice for the activation function known as the canonical linkfunction. 

We again make use of the restricted form (4.84) of exponential family distributions. Note that here we are applying the assumption of exponential family distribution to the target variable t, in contrast to Section 4.2.4 where we applied it to the input vector x. We therefore consider conditional distributions of the target variable of the form 

$$
p (t | \eta , s) = \frac {1}{s} h \left(\frac {t}{s}\right) g (\eta) \exp \left\{\frac {\eta t}{s} \right\}.\tag{4.118}
$$

Using the same line of argument as led to the derivation of the result (2.226), we see that the conditional mean of t, which we denote by $y ,$ is given by 

$$
y \equiv \mathbb {E} [ t | \eta ] = - s \frac {d}{d \eta} \ln g (\eta).\tag{4.119}
$$

Thus y and η must related, and we denote this relation through $\eta = \psi ( y )$ 

Following Nelder and Wedderburn (1972), we define a generalized linear model to be one for which $y$ is a nonlinear function of a linear combination of the input (or feature) variables so that 

$$
y = f (\mathbf {w} ^ {\mathrm{T}} \phi)\tag{4.120}
$$

where $f ( \cdot )$ is known as the activationfunction in the machine learning literature, and $f ^ { - 1 } ( \cdot )$ is known as the linkfunction in statistics. 

Now consider the log likelihood function for this model, which, as a function of η, is given by 

$$
\ln p (\mathbf {t} | \eta , s) = \sum_ {n = 1} ^ {N} \ln p (t _ {n} | \eta , s) = \sum_ {n = 1} ^ {N} \left\{\ln g (\eta_ {n}) + \frac {\eta_ {n} t _ {n}}{s} \right\} + \text { const }\tag{4.121}
$$

where we are assuming that all observations share a common scale parameter (which corresponds to the noise variance for a Gaussian distribution for instance) and so s is independent of $n .$ . The derivative of the log likelihood with respect to the model parameters w is then given by 

$$
\begin{array}{r c l} \nabla_ {\mathbf {w}} \ln p (\mathbf {t} | \eta , s) & = & \sum_ {n = 1} ^ {N} \left\{\frac {d}{d \eta_ {n}} \ln g (\eta_ {n}) + \frac {t _ {n}}{s} \right\} \frac {d \eta_ {n}}{d y _ {n}} \frac {d y _ {n}}{d a _ {n}} \nabla a _ {n} \\ & = & \sum_ {n = 1} ^ {N} \frac {1}{s} \left\{t _ {n} - y _ {n} \right\} \psi^ {\prime} (y _ {n}) f ^ {\prime} (a _ {n}) \phi_ {n} \end{array}\tag{4.122}
$$

where $a _ { n } = \mathbf { w } ^ { \mathrm { T } } \phi _ { n }$ , and we have used $y _ { n } = f ( a _ { n } )$ together with the result (4.119) for $\mathbb { E } [ t | \eta ]$ . We now see that there is a considerable simplification if we choose a particular form for the link function $f ^ { - 1 } ( y )$ given by 

$$
f ^ {- 1} (y) = \psi (y)\tag{4.123}
$$

which gives $f ( \psi ( y ) ) = y$ and hence $f ^ { \prime } ( \psi ) \psi ^ { \prime } ( y ) = 1$ . Also, because $a = f ^ { - 1 } ( y )$ we have $a = \psi$ and hence $f ^ { \prime } ( a ) \psi ^ { \prime } ( y ) \stackrel { \cdot } { = } 1$ . In this case, the gradient of the error function reduces to 

$$
\nabla \ln E (\mathbf {w}) = \frac {1}{s} \sum_ {n = 1} ^ {N} \{y _ {n} - t _ {n} \} \phi_ {n}.\tag{4.124}
$$

For the Gaussian $s = \beta ^ { - 1 }$ , whereas for the logistic model $s = 1$ 

## 4.4. The Laplace Approximation

In Section 4.5 we shall discuss the Bayesian treatment of logistic regression. As we shall see, this is more complex than the Bayesian treatment of linear regression models, discussed in Sections 3.3 and 3.5. In particular, we cannot integrate exactly over the parameter vector w since the posterior distribution is no longer Gaussian. It is therefore necessary to introduce some form of approximation. Later in the book we shall consider a range of techniques based on analytical approximations and numerical sampling. 

Here we introduce a simple, but widely used, framework called the Laplace approximation, that aims to find a Gaussian approximation to a probability density defined over a set of continuous variables. Consider first the case of a single continuous variable z, and suppose the distribution $p ( z )$ is defined by 

$$
p (z) = \frac {1}{Z} f (z)\tag{4.125}
$$

where $\begin{array} { r } { Z = \int f ( z ) \mathrm { d } z } \end{array}$ is the normalization coefficient. We shall suppose that the value of Z is unknown. In the Laplace method the goal is to find a Gaussian approximation $q ( z )$ which is centred on a mode of the distribution $p ( z )$ . The first step is to find a mode of $p ( z )$ , in other words a point $z _ { \mathrm { 0 } }$ such that $p ^ { \prime } ( z _ { 0 } ) = 0$ , or equivalently 

$$
\left. \frac {d f (z)}{d z} \right| _ {z = z _ {0}} = 0.\tag{4.126}
$$

A Gaussian distribution has the property that its logarithm is a quadratic function of the variables. We therefore consider a Taylor expansion of ln $f ( z )$ centred on the mode $z _ { \mathrm { 0 } }$ so that 

$$
\ln f (z) \simeq \ln f (z _ {0}) - \frac {1}{2} A (z - z _ {0}) ^ {2}\tag{4.127}
$$

where 

$$
A = - \left. \frac {d ^ {2}}{d z ^ {2}} \ln f (z) \right| _ {z = z _ {0}}.\tag{4.128}
$$

Note that the first-order term in the Taylor expansion does not appear since $z _ { 0 }$ is a local maximum of the distribution. Taking the exponential we obtain 

$$
f (z) \simeq f (z _ {0}) \exp \left\{- \frac {A}{2} (z - z _ {0}) ^ {2} \right\}.\tag{4.129}
$$

We can then obtain a normalized distribution $q ( z )$ by making use of the standard result for the normalization of a Gaussian, so that 

$$
q (z) = \left(\frac {A}{2 \pi}\right) ^ {1 / 2} \exp \left\{- \frac {A}{2} (z - z _ {0}) ^ {2} \right\}.\tag{4.130}
$$

The Laplace approximation is illustrated in Figure 4.14. Note that the Gaussian approximation will only be well defined if its precision $A > 0$ , in other words the stationary point $z _ { 0 }$ must be a local maximum, so that the second derivative of $f ( z )$ at the point $z _ { 0 }$ is negative. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/f13419f591f1a675a13f488417d2103e3326edb90ba3293d972b9c82cc228c54.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/fede03da01ef26f37953c158fb04f83ea37ade1521ed082fd103f9922b470dbd.jpg)



Figure 4.14 Illustration of the Laplace approximation applied to the distribution $p ( z ) \propto \exp ( - z ^ { 2 } / 2 ) \sigma ( 2 0 z + 4 )$ where $\sigma ( z )$ is the logistic sigmoid function defined by $\sigma \dot { ( } z \dot { ) } = ( 1 + e ^ { - z } ) ^ { - 1 }$ . The left plot shows the normalized distribution $p ( z )$ in yellow, together with the Laplace approximation centred on the mode $z _ { \mathrm { 0 } }$ of $p ( z )$ in red. The right plot shows the negative logarithms of the corresponding curves.


We can extend the Laplace method to approximate a distribution $p ( \mathbf { z } ) = f ( \mathbf { z } ) / Z$ defined over an M-dimensional space z. At a stationary point $\mathbf { z } _ { 0 }$ the gradient $\nabla f ( \mathbf { z } )$ will vanish. Expanding around this stationary point we have 

$$
\ln f (\mathbf {z}) \simeq \ln f (\mathbf {z} _ {0}) - \frac {1}{2} (\mathbf {z} - \mathbf {z} _ {0}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {z} - \mathbf {z} _ {0})\tag{4.131}
$$

where the $M \times M$ Hessian matrix A is defined by 

$$
\mathbf {A} = - \left. \nabla \nabla \ln f (\mathbf {z}) \right| _ {\mathbf {z} = \mathbf {z} _ {0}}\tag{4.132}
$$

and $\nabla$ is the gradient operator. Taking the exponential of both sides we obtain 

$$
f (\mathbf {z}) \simeq f (\mathbf {z} _ {0}) \exp \left\{- \frac {1}{2} (\mathbf {z} - \mathbf {z} _ {0}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {z} - \mathbf {z} _ {0}) \right\}.\tag{4.133}
$$

The distribution $q ( \mathbf { z } )$ is proportional to $f ( \mathbf { z } )$ and the appropriate normalization coefficient can be found by inspection, using the standard result (2.43) for a normalized multivariate Gaussian, giving 

$$
q (\mathbf {z}) = \frac {| \mathbf {A} | ^ {1 / 2}}{(2 \pi) ^ {M / 2}} \exp \left\{- \frac {1}{2} (\mathbf {z} - \mathbf {z} _ {0}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {z} - \mathbf {z} _ {0}) \right\} = \mathcal {N} (\mathbf {z} | \mathbf {z} _ {0}, \mathbf {A} ^ {- 1})\tag{4.134}
$$

where $| \mathbf { A } |$ denotes the determinant of A. This Gaussian distribution will be well defined provided its precision matrix, given by A, is positive definite, which implies that the stationary point $\mathbf { z } _ { 0 }$ must be a local maximum, not a minimum or a saddle point. 

In order to apply the Laplace approximation we first need to find the mode $\mathbf { z } _ { 0 }$ and then evaluate the Hessian matrix at that mode. In practice a mode will typically be found by running some form of numerical optimization algorithm (Bishop and Nabney, 2008). Many of the distributions encountered in practice will be multimodal and so there will be different Laplace approximations according to which mode is being considered. Note that the normalization constant $Z$ of the true distribution does not need to be known in order to apply the Laplace method. As a result of the central limit theorem, the posterior distribution for a model is expected to become increasingly better approximated by a Gaussian as the number of observed data points is increased, and so we would expect the Laplace approximation to be most useful in situations where the number of data points is relatively large. 

One major weakness of the Laplace approximation is that, since it is based on a Gaussian distribution, it is only directly applicable to real variables. In other cases it may be possible to apply the Laplace approximation to a transformation of the variable. For instance if $0 \leqslant \tau < \infty$ then we can consider a Laplace approximation of ln $\tau .$ . The most serious limitation of the Laplace framework, however, is that it is based purely on the aspects of the true distribution at a specific value of the variable, and so can fail to capture important global properties. In Chapter 10 we shall consider alternative approaches which adopt a more global perspective. 

## 4.4.1 Model comparison and BIC

As well as approximating the distribution $p ( \mathbf { z } )$ we can also obtain an approxi mation to the normalization constant Z. Using the approximation (4.133) we have 

$$
\begin{array}{r c l} Z & = & \int f (\mathbf {z}) \mathrm{d} \mathbf {z} \\ & \simeq & f (\mathbf {z} _ {0}) \int \exp \left\{- \frac {1}{2} (\mathbf {z} - \mathbf {z} _ {0}) ^ {\mathrm{T}} \mathbf {A} (\mathbf {z} - \mathbf {z} _ {0}) \right\} \mathrm{d} \mathbf {z} \\ & = & f (\mathbf {z} _ {0}) \frac {(2 \pi) ^ {M / 2}}{| \mathbf {A} | ^ {1 / 2}} \end{array}\tag{4.135}
$$

where we have noted that the integrand is Gaussian and made use of the standard result (2.43) for a normalized Gaussian distribution. We can use the result (4.135) to obtain an approximation to the model evidence which, as discussed in Section 3.4, plays a central role in Bayesian model comparison. 

Consider a data set $\mathcal { D }$ and a set of models $\{ \mathcal { M } _ { i } \}$ having parameters $\{ \pmb \theta _ { i } \}$ . For each model we define a likelihood function $p ( \mathcal { D } | \pmb { \theta } _ { i } , \mathcal { M } _ { i } )$ . If we introduce a prior $p ( \pmb \theta _ { i } | \mathcal { M } _ { i } )$ over the parameters, then we are interested in computing the model evidence $p ( \mathcal { D } | \mathcal { M } _ { i } )$ for the various models. From now on we omit the conditioning on $\mathcal { M } _ { i }$ to keep the notation uncluttered. From Bayes’ theorem the model evidence is given by 

$$
p (\mathcal {D}) = \int p (\mathcal {D} | \boldsymbol {\theta}) p (\boldsymbol {\theta}) \mathrm{d} \boldsymbol {\theta}.\tag{4.136}
$$

Identifying $f ( \pmb \theta ) = p ( \mathcal { D } | \pmb \theta ) p ( \pmb \theta )$ and $Z = p ( { \mathcal { D } } )$ , and applying the result (4.135), we obtain 

$$
\ln p (\mathcal {D}) \simeq \ln p (\mathcal {D} | \boldsymbol {\theta} _ {\mathrm{MAP}}) + \underbrace {\ln p (\boldsymbol {\theta} _ {\mathrm{MAP}}) + \frac {M}{2} \ln (2 \pi) - \frac {1}{2} \ln | \mathbf {A} |}\tag{4.137}
$$

)*Occam factor 

where $\theta _ { \mathrm { M A P } }$ is the value of θ at the mode of the posterior distribution, and A is the Hessian matrix of second derivatives of the negative log posterior 

$$
\mathbf {A} = - \nabla \nabla \ln p (\mathcal {D} | \boldsymbol {\theta} _ {\mathrm{MAP}}) p (\boldsymbol {\theta} _ {\mathrm{MAP}}) = - \nabla \nabla \ln p (\boldsymbol {\theta} _ {\mathrm{MAP}} | \mathcal {D}).\tag{4.138}
$$

The first term on the right hand side of (4.137) represents the log likelihood evaluated using the optimized parameters, while the remaining three terms comprise the ‘Occam factor’ which penalizes model complexity. 

If we assume that the Gaussian prior distribution over parameters is broad, and that the Hessian has full rank, then we can approximate (4.137) very roughly using 

$$
\ln p (\mathcal {D}) \simeq \ln p (\mathcal {D} | \pmb {\theta} _ {\mathrm{MAP}}) - \frac {1}{2} M \ln N\tag{4.139}
$$

where N is the number of data points, M is the number of parameters in θ and we have omitted additive constants. This is known as the Bayesian Information Criterion (BIC) or the Schwarz criterion (Schwarz, 1978). Note that, compared to AIC given by (1.73), this penalizes model complexity more heavily. 

Complexity measures such as AIC and BIC have the virtue of being easy to evaluate, but can also give misleading results. In particular, the assumption that the Hessian matrix has full rank is often not valid since many of the parameters are not ‘well-determined’. We can use the result (4.137) to obtain a more accurate estimate of the model evidence starting from the Laplace approximation, as we illustrate in the context of neural networks in Section 5.7. 

## 4.5. Bayesian Logistic Regression

We now turn to a Bayesian treatment of logistic regression. Exact Bayesian inference for logistic regression is intractable. In particular, evaluation of the posterior distribution would require normalization of the product of a prior distribution and a likelihood function that itself comprises a product of logistic sigmoid functions, one for every data point. Evaluation of the predictive distribution is similarly intractable. Here we consider the application of the Laplace approximation to the problem of Bayesian logistic regression (Spiegelhalter and Lauritzen, 1990; MacKay, 1992b). 

## 4.5.1 Laplace approximation

Recall from Section 4.4 that the Laplace approximation is obtained by finding the mode of the posterior distribution and then fitting a Gaussian centred at that mode. This requires evaluation of the second derivatives of the log posterior, which is equivalent to finding the Hessian matrix. 

Because we seek a Gaussian representation for the posterior distribution, it is natural to begin with a Gaussian prior, which we write in the general form 

$$
p (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \mathbf {m} _ {0}, \mathbf {S} _ {0})\tag{4.140}
$$

where $\mathbf { m } _ { 0 }$ and $\mathbf { S } _ { 0 }$ are fixed hyperparameters. The posterior distribution over w is given by 

$$
p (\mathbf {w} | \mathbf {t}) \propto p (\mathbf {w}) p (\mathbf {t} | \mathbf {w})\tag{4.141}
$$

where $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . Taking the log of both sides, and substituting for the prior distribution using (4.140), and for the likelihood function using (4.89), we obtain 

$$
\begin{array}{r c l} \ln p (\mathbf {w} | \mathbf {t}) & = & - \frac {1}{2} (\mathbf {w} - \mathbf {m} _ {0}) ^ {\mathrm{T}} \mathbf {S} _ {0} ^ {- 1} (\mathbf {w} - \mathbf {m} _ {0}) \\ & & + \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\} + \text {const} \end{array}\tag{4.142}
$$

where $y _ { n } = \sigma ( \mathbf { w } ^ { \mathrm { T } } \phi _ { n } )$ . To obtain a Gaussian approximation to the posterior distribution, we first maximize the posterior distribution to give the MAP (maximum posterior) solution ${ \bf w } _ { \mathrm { M A P } }$ , which defines the mean of the Gaussian. The covariance is then given by the inverse of the matrix of second derivatives of the negative log likelihood, which takes the form 

$$
\mathbf {S} _ {N} = - \nabla \nabla \ln p (\mathbf {w} | \mathbf {t}) = \mathbf {S} _ {0} ^ {- 1} + \sum_ {n = 1} ^ {N} y _ {n} (1 - y _ {n}) \boldsymbol {\phi} _ {n} \boldsymbol {\phi} _ {n} ^ {\mathrm{T}}.\tag{4.143}
$$

The Gaussian approximation to the posterior distribution therefore takes the form 

$$
q (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \mathbf {w} _ {\mathrm{MAP}}, \mathbf {S} _ {N}).\tag{4.144}
$$

Having obtained a Gaussian approximation to the posterior distribution, there remains the task of marginalizing with respect to this distribution in order to make predictions. 

## 4.5.2 Predictive distribution

The predictive distribution for class $\mathcal { C } _ { 1 }$ , given a new feature vector $\phi ( \mathbf { x } )$ , is obtained by marginalizing with respect to the posterior distribution $p ( \mathbf { w } | \mathbf { t } )$ , which is itself approximated by a Gaussian distribution $q ( \mathbf { w } )$ so that 

$$
p (\mathcal {C} _ {1} | \boldsymbol {\phi}, \mathbf {t}) = \int p (\mathcal {C} _ {1} | \boldsymbol {\phi}, \mathbf {w}) p (\mathbf {w} | \mathbf {t}) d \mathbf {w} \simeq \int \sigma (\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi}) q (\mathbf {w}) d \mathbf {w}\tag{4.145}
$$

with the corresponding probability for class $\mathcal { C } _ { 2 }$ given by $p ( \mathcal { C } _ { 2 } | \phi , \mathbf { t } ) = 1 - p ( \mathcal { C } _ { 1 } | \phi , \mathbf { t } )$ To evaluate the predictive distribution, we first note that the function $\sigma ( \mathbf { w } ^ { \mathrm { T } } \phi )$ depends on w only through its projection onto $\phi$ . Denoting $a = \mathbf { w } ^ { \mathrm { T } } \phi$ , we have 

$$
\sigma (\mathbf {w} ^ {\mathrm{T}} \phi) = \int \delta (a - \mathbf {w} ^ {\mathrm{T}} \phi) \sigma (a) \mathrm{d} a\tag{4.146}
$$

where $\delta ( \cdot )$ is the Dirac delta function. From this we obtain 

$$
\int \sigma (\mathbf {w} ^ {\mathrm{T}} \phi) q (\mathbf {w}) \mathrm{d} \mathbf {w} = \int \sigma (a) p (a) \mathrm{d} a\tag{4.147}
$$

where 

$$
p (a) = \int \delta (a - \mathbf {w} ^ {\mathrm{T}} \phi) q (\mathbf {w}) \mathrm{d} \mathbf {w}.\tag{4.148}
$$

We can evaluate $p ( a )$ by noting that the delta function imposes a linear constraint on w and so forms a marginal distribution from the joint distribution $q ( \mathbf { w } )$ by integrating out all directions orthogonal to $\phi .$ . Because $q ( \mathbf { w } )$ is Gaussian, we know from Section 2.3.2 that the marginal distribution will also be Gaussian. We can evaluate the mean and covariance of this distribution by taking moments, and interchanging the order of integration over a and w, so that 

$$
\mu_ {a} = \mathbb {E} [ a ] = \int p (a) a \mathrm{d} a = \int q (\mathbf {w}) \mathbf {w} ^ {\mathrm{T}} \phi \mathrm{d} \mathbf {w} = \mathbf {w} _ {\mathrm{MAP}} ^ {\mathrm{T}} \phi\tag{4.149}
$$

where we have used the result (4.144) for the variational posterior distribution $q ( \mathbf { w } )$ Similarly 

$$
\begin{array}{r c l} \sigma_ {a} ^ {2} & = & \operatorname{var} [ a ] = \int p (a) \left\{a ^ {2} - \mathbb {E} [ a ] ^ {2} \right\} \mathrm{d} a \\ & = & \int q (\mathbf {w}) \left\{(\mathbf {w} ^ {\mathrm{T}} \phi) ^ {2} - (\mathbf {m} _ {N} ^ {\mathrm{T}} \phi) ^ {2} \right\} \mathrm{d} \mathbf {w} = \phi^ {\mathrm{T}} \mathbf {S} _ {N} \phi . \end{array}\tag{4.150}
$$

Note that the distribution of a takes the same form as the predictive distribution (3.58) for the linear regression model, with the noise variance set to zero. Thus our variational approximation to the predictive distribution becomes 

$$
p (\mathcal {C} _ {1} | \mathbf {t}) = \int \sigma (a) p (a) \mathrm{d} a = \int \sigma (a) \mathcal {N} (a | \mu_ {a}, \sigma_ {a} ^ {2}) \mathrm{d} a.\tag{4.151}
$$

This result can also be derived directly by making use of the results for the marginal of a Gaussian distribution given in Section 2.3.2. 

The integral over a represents the convolution of a Gaussian with a logistic sigmoid, and cannot be evaluated analytically. We can, however, obtain a good approximation (Spiegelhalter and Lauritzen, 1990; MacKay, 1992b; Barber and Bishop, 1998a) by making use of the close similarity between the logistic sigmoid function $\sigma ( a )$ defined by (4.59) and the probit function $\Phi ( a )$ defined by (4.114). In order to obtain the best approximation to the logistic function we need to re-scale the horizontal axis, so that we approximate $\sigma ( a )$ by $\Phi ( \lambda a )$ . We can find a suitable value of λ by requiring that the two functions have the same slope at the origin, which gives $\lambda ^ { 2 } = \pi / 8$ The similarity of the logistic sigmoid and the probit function, for this choice of λ, is illustrated in Figure 4.9. 

The advantage of using a probit function is that its convolution with a Gaussian can be expressed analytically in terms of another probit function. Specifically we can show that 

$$
\int \Phi (\lambda a) \mathcal {N} (a | \mu , \sigma^ {2}) \mathrm{d} a = \Phi \left(\frac {\mu}{(\lambda^ {- 2} + \sigma^ {2}) ^ {1 / 2}}\right).\tag{4.152}
$$

We now apply the approximation $\sigma ( a ) \simeq \Phi ( \lambda a )$ to the probit functions appearing on both sides of this equation, leading to the following approximation for the convolution of a logistic sigmoid with a Gaussian 

$$
\int \sigma (a) \mathcal {N} (a | \mu , \sigma^ {2}) \mathrm{d} a \simeq \sigma (\kappa (\sigma^ {2}) \mu)\tag{4.153}
$$

where we have defined 

$$
\kappa (\sigma^ {2}) = (1 + \pi \sigma^ {2} / 8) ^ {- 1 / 2}.\tag{4.154}
$$

Applying this result to (4.151) we obtain the approximate predictive distribution in the form 

$$
p (\mathcal {C} _ {1} | \boldsymbol {\phi}, \mathbf {t}) = \sigma \left(\kappa (\sigma_ {a} ^ {2}) \mu_ {a}\right)\tag{4.155}
$$

where $\mu _ { a }$ and $\sigma _ { a } ^ { 2 }$ are defined by (4.149) and (4.150), respectively, and $\kappa ( \sigma _ { a } ^ { 2 } )$ is defined by (4.154). 

Note that the decision boundary corresponding to $p ( \mathcal { C } _ { 1 } | \phi , \mathbf { t } ) = 0 . 5$ is given by $\mu _ { a } = 0$ , which is the same as the decision boundary obtained by using the MAP value for w. Thus if the decision criterion is based on minimizing misclassification rate, with equal prior probabilities, then the marginalization over w has no effect. However, for more complex decision criteria it will play an important role. Marginalization of the logistic sigmoid model under a Gaussian approximation to the posterior distribution will be illustrated in the context of variational inference in Figure 10.13. 

## Exercises

4.1 ( ) Given a set of data points $\left\{ \mathbf { x } _ { n } \right\}$ , we can define the convex hull to be the set of all points x given by 

$$
\mathbf {x} = \sum_ {n} \alpha_ {n} \mathbf {x} _ {n}\tag{4.156}
$$

where $\alpha _ { n } \geqslant 0$ and $\textstyle \sum _ { n } \alpha _ { n } = 1$ . Consider a second set of points $\left\{ \mathbf { y } _ { n } \right\}$ together with their corresponding convex hull. By definition, the two sets of points will be linearly separable if there exists a vector w and a scalar $w _ { 0 }$ such that $ { \hat { \mathbf { w } } } ^ { \mathrm { T } } \mathbf { x } _ { n } + w _ { 0 } > 0$ for all ${ \bf x } _ { n }$ , and $\widehat { \mathbf { w } } ^ { \mathrm { T } } \mathbf { y } _ { n } + w _ { 0 } < 0$ for all ${ \bf y } _ { n }$ . Show that if their convex hulls intersect, the two sets of points cannot be linearly separable, and conversely that if they are linearly separable, their convex hulls do not intersect. 

4.2 ( ) www Consider the minimization of a sum-of-squares error function (4.15), and suppose that all of the target vectors in the training set satisfy a linear constraint 

$$
\mathbf {a} ^ {\mathrm{T}} \mathbf {t} _ {n} + b = 0\tag{4.157}
$$

where $\mathbf { t } _ { n }$ corresponds to the $n ^ { \mathrm { t h } }$ row of the matrix T in (4.15). Show that as a consequence of this constraint, the elements of the model prediction $\mathbf { y } ( \mathbf { x } )$ given by the least-squares solution (4.17) also satisfy this constraint, so that 

$$
\mathbf {a} ^ {\mathrm{T}} \mathbf {y} (\mathbf {x}) + b = 0.\tag{4.158}
$$

To do so, assume that one of the basis functions $\phi _ { 0 } ( \mathbf { x } ) = 1$ so that the corresponding parameter $w _ { 0 }$ plays the role of a bias. 

4.3 ( ) Extend the result of Exercise 4.2 to show that if multiple linear constraints are satisfied simultaneously by the target vectors, then the same constraints will also be satisfied by the least-squares prediction of a linear model. 

4.4 () www Show that maximization of the class separation criterion given by (4.23) with respect to w, using a Lagrange multiplier to enforce the constraint $\mathbf { w } ^ { \mathrm { T } } \mathbf { w } = 1$ leads to the result that $\mathbf { w } \propto \left( \mathbf { m } _ { 2 } - \mathbf { m } _ { 1 } \right)$ 

4.5 () By making use of (4.20), (4.23), and (4.24), show that the Fisher criterion (4.25) can be written in the form (4.26). 

4.6 () Using the definitions of the between-class and within-class covariance matrices given by (4.27) and (4.28), respectively, together with (4.34) and (4.36) and the choice of target values described in Section 4.1.5, show that the expression (4.33) that minimizes the sum-of-squares error function can be written in the form (4.37). 

4.7 () www Show that the logistic sigmoid function (4.59) satisfies the property σ $\cdot ( - { \overline { { a ) = 1 } } } - \sigma ( a )$ and that its inverse is given by $\sigma ^ { - 1 } ( y ) = \ln { \{ y / ( 1 - y ) \} }$ 

4.8 () Using (4.57) and (4.58), derive the result (4.65) for the posterior class probability in the two-class generative model with Gaussian densities, and verify the results (4.66) and (4.67) for the parameters w and $w _ { 0 }$ 

4.9 () www Consider a generative classification model for K classes defined by prior class probabilities $p ( \mathcal { C } _ { k } ) = \pi _ { k }$ and general class-conditional densities $p ( \phi | { \mathcal C } _ { k } )$ where φ is the input feature vector. Suppose we are given a training data set $\{ \phi _ { n } , \mathbf { t } _ { n } \}$ where $n = 1 , \ldots , N$ , and $\mathbf { t } _ { n }$ is a binary target vector of length K that uses the 1-of-K coding scheme, so that it has components $t _ { n j } = I _ { j k }$ if pattern n is from class $\mathcal { C } _ { k }$ Assuming that the data points are drawn independently from this model, show that the maximum-likelihood solution for the prior probabilities is given by 

$$
\pi_ {k} = \frac {N _ {k}}{N}\tag{4.159}
$$

where $N _ { k }$ is the number of data points assigned to class $\mathcal { C } _ { k }$ 

4.10 ( ) Consider the classification model of Exercise 4.9 and now suppose that the class-conditional densities are given by Gaussian distributions with a shared covariance matrix, so that 

$$
p (\phi | \mathcal {C} _ {k}) = \mathcal {N} (\phi | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma}).\tag{4.160}
$$

Show that the maximum likelihood solution for the mean of the Gaussian distribution for class $\mathcal { C } _ { k }$ is given by 

$$
\pmb {\mu} _ {k} = \frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} t _ {n k} \phi_ {n}\tag{4.161}
$$

which represents the mean of those feature vectors assigned to class $\mathcal { C } _ { k }$ . Similarly, show that the maximum likelihood solution for the shared covariance matrix is given by 

$$
\pmb {\Sigma} = \sum_ {k = 1} ^ {K} \frac {N _ {k}}{N} \mathbf {S} _ {k}\tag{4.162}
$$

where 

$$
\mathbf {S} _ {k} = \frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} t _ {n k} (\boldsymbol {\phi} _ {n} - \boldsymbol {\mu} _ {k}) (\boldsymbol {\phi} _ {n} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}}.\tag{4.163}
$$

Thus Σ is given by a weighted average of the covariances of the data associated with each class, in which the weighting coefficients are given by the prior probabilities of the classes. 

4.11 ( ) Consider a classification problem with K classes for which the feature vector $\phi$ has M components each of which can take L discrete states. Let the values of the components be represented by a $1 { - } 0 \mathrm { f - } L$ binary coding scheme. Further suppose that, conditioned on the class $\mathcal { C } _ { k }$ , the M components of $\phi$ are independent, so that the class-conditional density factorizes with respect to the feature vector components. Show that the quantities $a _ { k }$ given by (4.63), which appear in the argument to the softmax function describing the posterior class probabilities, are linear functions of the components of $\phi .$ Note that this represents an example of the naive Bayes model which is discussed in Section 8.2.2. 

4.12 () www Verify the relation (4.88) for the derivative of the logistic sigmoid function defined by (4.59). 

4.13 () www By making use of the result (4.88) for the derivative of the logistic sigmoid, show that the derivative of the error function (4.90) for the logistic regression model is given by (4.91). 

4.14 () Show that for a linearly separable data set, the maximum likelihood solution for the logistic regression model is obtained by finding a vector w whose decision boundary $\mathbf { \bar { w } } ^ { \mathrm { T } } \phi ( \mathbf { x } ) = 0$ separates the classes and then taking the magnitude of w to infinity. 

4.15 ( ) Show that the Hessian matrix H for the logistic regression model, given by (4.97), is positive definite. Here R is a diagonal matrix with elements $y _ { n } ( 1 - y _ { n } )$ and $y _ { n }$ is the output of the logistic regression model for input vector ${ \bf x } _ { n }$ . Hence show that the error function is a concave function of w and that it has a unique minimum. 

4.16 () Consider a binary classification problem in which each observation ${ \bf x } _ { n }$ is known to belong to one of two classes, corresponding to $t = 0$ and $t = 1$ , and suppose that the procedure for collecting training data is imperfect, so that training points are sometimes mislabelled. For every data point ${ \bf x } _ { n }$ , instead of having a value t for the class label, we have instead a value $\pi _ { n }$ representing the probability that $t _ { n } = 1$ Given a probabilistic model $p ( t = 1 | \phi )$ , write down the log likelihood function appropriate to such a data set. 

4.17 () www Show that the derivatives of the softmax activation function (4.104), where the $a _ { k }$ are defined by (4.105), are given by (4.106). 

4.18 () Using the result (4.91) for the derivatives of the softmax activation function, show that the gradients of the cross-entropy error (4.108) are given by (4.109). 

4.19 () www Write down expressions for the gradient of the log likelihood, as well as the corresponding Hessian matrix, for the probit regression model defined in Section 4.3.5. These are the quantities that would be required to train such a model using IRLS. 

4.20 ( ) Show that the Hessian matrix for the multiclass logistic regression problem, defined by (4.110), is positive semidefinite. Note that the full Hessian matrix for this problem is of size $M K \times M K$ , where M is the number of parameters and K is the number of classes. To prove the positive semidefinite property, consider the product $\mathbf { u } ^ { \mathrm { T } } \mathbf { H } \mathbf { u }$ where u is an arbitrary vector of length MK, and then apply Jensen’s inequality. 

4.21 () Show that the probit function (4.114) and the erf function (4.115) are related by (4.116). 

4.22 () Using the result (4.135), derive the expression (4.137) for the log model evidence under the Laplace approximation. 

4.23 ( ) www In this exercise, we derive the BIC result (4.139) starting from the Laplace approximation to the model evidence given by (4.137). Show that if the prior over parameters is Gaussian of the form $p ( \pmb \theta ) = \mathcal { N } ( \pmb \theta | \mathbf { m } , \mathbf { V } _ { 0 } )$ , the log model evidence under the Laplace approximation takes the form 

$$
\ln p (\mathcal {D}) \simeq \ln p (\mathcal {D} | \boldsymbol {\theta} _ {\mathrm{MAP}}) - \frac {1}{2} (\boldsymbol {\theta} _ {\mathrm{MAP}} - \mathbf {m}) ^ {\mathrm{T}} \mathbf {V} _ {0} ^ {- 1} (\boldsymbol {\theta} _ {\mathrm{MAP}} - \mathbf {m}) - \frac {1}{2} \ln | \mathbf {H} | + \text {const}
$$

where H is the matrix of second derivatives of the log likelihood ln $p ( \mathcal { D } | \mathbf { \theta } )$ evaluated at $\theta _ { \mathrm { M A P } }$ . Now assume that the prior is broad so that $\mathbf { V } _ { 0 } ^ { - 1 }$ is small and the second term on the right-hand side above can be neglected. Furthermore, consider the case of independent, identically distributed data so that H is the sum of terms one for each data point. Show that the log model evidence can then be written approximately in the form of the BIC expression (4.139). 

4.24 ( ) Use the results from Section 2.3.2 to derive the result (4.151) for the marginalization of the logistic regression model with respect to a Gaussian posterior distribution over the parameters w. 

4.25 ( ) Suppose we wish to approximate the logistic sigmoid $\sigma ( a )$ defined by (4.59) by a scaled probit function $\Phi ( \lambda a )$ , where $\Phi ( a )$ is defined by (4.114). Show that if λ is chosen so that the derivatives of the two functions are equal at $a = 0$ , then $\lambda ^ { 2 } = \pi / 8$ 

## 4. LINEAR MODELS FOR CLASSIFICATION

4.26 ( ) In this exercise, we prove the relation (4.152) for the convolution of a probit function with a Gaussian distribution. To do this, show that the derivative of the left hand side with respect to $\mu$ is equal to the derivative of the right-hand side, and then integrate both sides with respect to $\mu$ and then show that the constant of integration vanishes. Note that before differentiating the left-hand side, it is convenient first to introduce a change of variable given by $a = \mu + \sigma z$ so that the integral over a is replaced by an integral over $z .$ When we differentiate the left-hand side of the relation (4.152), we will then obtain a Gaussian integral over z that can be evaluated analytically. 

# Neural Networks

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/21cc2a3e73ab0968477c6601ded430736670c09ae50495e44e490d78d621901e.jpg)


In Chapters 3 and 4 we considered models for regression and classification that comprised linear combinations of fixed basis functions. We saw that such models have useful analytical and computational properties but that their practical applicability was limited by the curse of dimensionality. In order to apply such models to largescale problems, it is necessary to adapt the basis functions to the data. 

Support vector machines (SVMs), discussed in Chapter 7, address this by first defining basis functions that are centred on the training data points and then selecting a subset of these during training. One advantage of SVMs is that, although the training involves nonlinear optimization, the objective function is convex, and so the solution of the optimization problem is relatively straightforward. The number of basis functions in the resulting models is generally much smaller than the number of training points, although it is often still relatively large and typically increases with the size of the training set. The relevance vector machine, discussed in Section 7.2, also chooses a subset from a fixed set of basis functions and typically results in much sparser models. Unlike the SVM it also produces probabilistic outputs, although this is at the expense of a nonconvex optimization during training. 

An alternative approach is to fix the number of basis functions in advance but allow them to be adaptive, in other words to use parametric forms for the basis functions in which the parameter values are adapted during training. The most successful model of this type in the context of pattern recognition is the feed-forward neural network, also known as the multilayer perceptron, discussed in this chapter. In fact, ‘multilayer perceptron’ is really a misnomer, because the model comprises multiple layers of logistic regression models (with continuous nonlinearities) rather than multiple perceptrons (with discontinuous nonlinearities). For many applications, the resulting model can be significantly more compact, and hence faster to evaluate, than a support vector machine having the same generalization performance. The price to be paid for this compactness, as with the relevance vector machine, is that the likelihood function, which forms the basis for network training, is no longer a convex function of the model parameters. In practice, however, it is often worth investing substantial computational resources during the training phase in order to obtain a compact model that is fast at processing new data. 

The term ‘neural network’ has its origins in attempts to find mathematical representations of information processing in biological systems (McCulloch and Pitts, 1943; Widrow and Hoff, 1960; Rosenblatt, 1962; Rumelhart et al., 1986). Indeed, it has been used very broadly to cover a wide range of different models, many of which have been the subject of exaggerated claims regarding their biological plausibility. From the perspective of practical applications of pattern recognition, however, biological realism would impose entirely unnecessary constraints. Our focus in this chapter is therefore on neural networks as efficient models for statistical pattern recognition. In particular, we shall restrict our attention to the specific class of neural networks that have proven to be of greatest practical value, namely the multilayer perceptron. 

We begin by considering the functional form of the network model, including the specific parameterization of the basis functions, and we then discuss the problem of determining the network parameters within a maximum likelihood framework, which involves the solution of a nonlinear optimization problem. This requires the evaluation of derivatives of the log likelihood function with respect to the network parameters, and we shall see how these can be obtained efficiently using the technique of error backpropagation. We shall also show how the backpropagation framework can be extended to allow other derivatives to be evaluated, such as the Jacobian and Hessian matrices. Next we discuss various approaches to regularization of neural network training and the relationships between them. We also consider some extensions to the neural network model, and in particular we describe a general framework for modelling conditional probability distributions known as mixture density networks. Finally, we discuss the use of Bayesian treatments of neural networks. Additional background on neural network models can be found in Bishop (1995a). 

## 5.1. Feed-forward Network Functions

The linear models for regression and classification discussed in Chapters 3 and 4, respectively, are based on linear combinations of fixed nonlinear basis functions $\phi _ { j } ( \mathbf { x } )$ and take the form 

$$
y (\mathbf {x}, \mathbf {w}) = f \left(\sum_ {j = 1} ^ {M} w _ {j} \phi_ {j} (\mathbf {x})\right)\tag{5.1}
$$

where $f ( \cdot )$ is a nonlinear activation function in the case of classification and is the identity in the case of regression. Our goal is to extend this model by making the basis functions $\phi _ { j } ( \mathbf { x } )$ depend on parameters and then to allow these parameters to be adjusted, along with the coefficients $\{ w _ { j } \}$ , during training. There are, of course, many ways to construct parametric nonlinear basis functions. Neural networks use basis functions that follow the same form as (5.1), so that each basis function is itself a nonlinear function of a linear combination of the inputs, where the coefficients in the linear combination are adaptive parameters. 

This leads to the basic neural network model, which can be described a series of functional transformations. First we construct M linear combinations of the input variables $x _ { 1 } , \ldots , x _ { D }$ in the form 

$$
a _ {j} = \sum_ {i = 1} ^ {D} w _ {j i} ^ {(1)} x _ {i} + w _ {j 0} ^ {(1)}\tag{5.2}
$$

where $j = 1 , \dots , M$ , and the superscript (1) indicates that the corresponding parameters are in the first ‘layer’ of the network. We shall refer to the parameters $w _ { j i } ^ { ( 1 ) }$ as weights and the parameters ${ w _ { j 0 } ^ { ( 1 ) } }$ as biases, following the nomenclature of Chapter 3. The quantities $a _ { j }$ are known as activations. Each of them is then transformed using a differentiable, nonlinear activation function $h ( \cdot )$ to give 

$$
z _ {j} = h (a _ {j}).\tag{5.3}
$$

These quantities correspond to the outputs of the basis functions in (5.1) that, in the context of neural networks, are called hidden units. The nonlinear functions $h ( \cdot )$ are generally chosen to be sigmoidal functions such as the logistic sigmoid or the ‘tanh function. Following (5.1), these values are again linearly combined to give output unit activations 

$$
a _ {k} = \sum_ {j = 1} ^ {M} w _ {k j} ^ {(2)} z _ {j} + w _ {k 0} ^ {(2)}\tag{5.4}
$$

where $k = 1 , \ldots , K$ , and K is the total number of outputs. This transformation corresponds to the second layer of the network, and again the $w _ { k 0 } ^ { ( 2 ) }$ are bias parameters. Finally, the output unit activations are transformed using an appropriate activation function to give a set of network outputs $y _ { k }$ . The choice of activation function is determined by the nature of the data and the assumed distribution of target variables 

Network diagram for the twolayer neural network corresponding to (5.7). The input, hidden, and output variables are represented by nodes, and the weight parameters are represented by links between the nodes, in which the bias parameters are denoted by links coming from additional input and hidden variables $x _ { 0 }$ and z<sub>0</sub>. Arrows denote the direction of information flow through the network during forward propagation. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/02aabcb780d6fe0cfdc558b695a2e668eefe24c427daa948cf856d7fa6ae01eb.jpg)


and follows the same considerations as for linear models discussed in Chapters 3 and 4. Thus for standard regression problems, the activation function is the identity so that $y _ { k } = a _ { k }$ . Similarly, for multiple binary classification problems, each output unit activation is transformed using a logistic sigmoid function so that 

$$
y _ {k} = \sigma (a _ {k})\tag{5.5}
$$

where 

$$
\sigma (a) = \frac {1}{1 + \exp (- a)}.\tag{5.6}
$$

Finally, for multiclass problems, a softmax activation function of the form (4.62) is used. The choice of output unit activation function is discussed in detail in Section 5.2. 

We can combine these various stages to give the overall network function that, for sigmoidal output unit activation functions, takes the form 

$$
y _ {k} (\mathbf {x}, \mathbf {w}) = \sigma \left(\sum_ {j = 1} ^ {M} w _ {k j} ^ {(2)} h \left(\sum_ {i = 1} ^ {D} w _ {j i} ^ {(1)} x _ {i} + w _ {j 0} ^ {(1)}\right) + w _ {k 0} ^ {(2)}\right)\tag{5.7}
$$

where the set of all weight and bias parameters have been grouped together into a vector w. Thus the neural network model is simply a nonlinear function from a set of input variables $\{ x _ { i } \}$ to a set of output variables $\left\{ y _ { k } \right\}$ controlled by a vector w of adjustable parameters. 

This function can be represented in the form of a network diagram as shown in Figure 5.1. The process of evaluating (5.7) can then be interpreted as a forward propagation of information through the network. It should be emphasized that these diagrams do not represent probabilistic graphical models of the kind to be considered in Chapter 8 because the internal nodes represent deterministic variables rather than stochastic ones. For this reason, we have adopted a slightly different graphical notation for the two kinds of model. We shall see later how to give a probabilistic interpretation to a neural network. 

As discussed in Section 3.1, the bias parameters in (5.2) can be absorbed into the set of weight parameters by defining an additional input variable $x _ { 0 }$ whose value is clamped at $x _ { 0 } = 1$ , so that (5.2) takes the form 

$$
a _ {j} = \sum_ {i = 0} ^ {D} w _ {j i} ^ {(1)} x _ {i}.\tag{5.8}
$$

We can similarly absorb the second-layer biases into the second-layer weights, so that the overall network function becomes 

$$
y _ {k} (\mathbf {x}, \mathbf {w}) = \sigma \left(\sum_ {j = 0} ^ {M} w _ {k j} ^ {(2)} h \left(\sum_ {i = 0} ^ {D} w _ {j i} ^ {(1)} x _ {i}\right)\right).\tag{5.9}
$$

As can be seen from Figure 5.1, the neural network model comprises two stages of processing, each of which resembles the perceptron model of Section 4.1.7, and for this reason the neural network is also known as the multilayer perceptron, or MLP. A key difference compared to the perceptron, however, is that the neural network uses continuous sigmoidal nonlinearities in the hidden units, whereas the perceptron uses step-function nonlinearities. This means that the neural network function is differentiable with respect to the network parameters, and this property will play a central role in network training. 

If the activation functions of all the hidden units in a network are taken to be linear, then for any such network we can always find an equivalent network without hidden units. This follows from the fact that the composition of successive linear transformations is itself a linear transformation. However, if the number of hidden units is smaller than either the number of input or output units, then the transformations that the network can generate are not the most general possible linear transformations from inputs to outputs because information is lost in the dimensionality reduction at the hidden units. In Section 12.4.2, we show that networks of linear units give rise to principal component analysis. In general, however, there is little interest in multilayer networks of linear units. 

The network architecture shown in Figure 5.1 is the most commonly used one in practice. However, it is easily generalized, for instance by considering additional layers of processing each consisting of a weighted linear combination of the form (5.4) followed by an element-wise transformation using a nonlinear activation function. Note that there is some confusion in the literature regarding the terminology for counting the number of layers in such networks. Thus the network in Figure 5.1 may be described as a 3-layer network (which counts the number of layers of units, and treats the inputs as units) or sometimes as a single-hidden-layer network (which counts the number of layers of hidden units). We recommend a terminology in which Figure 5.1 is called a two-layer network, because it is the number of layers of adaptive weights that is important for determining the network properties. 

Another generalization of the network architecture is to include skip-layer connections, each of which is associated with a corresponding adaptive parameter. For instance, in a two-layer network these would go directly from inputs to outputs. In principle, a network with sigmoidal hidden units can always mimic skip layer connections (for bounded input values) by using a sufficiently small first-layer weight that, over its operating range, the hidden unit is effectively linear, and then compensating with a large weight value from the hidden unit to the output. In practice, however, it may be advantageous to include skip-layer connections explicitly. 


Figure 5.2 Example of a neural network having a general feed-forward topology. Note that each hidden and output unit has an associated bias parameter (omitted for clarity).


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/c124a873d706c2fc642a6440ff34ae91b0055cbd0b747b2ff5f2cf066f28dc79.jpg)


Furthermore, the network can be sparse, with not all possible connections within a layer being present. We shall see an example of a sparse network architecture when we consider convolutional neural networks in Section 5.5.6. 

Because there is a direct correspondence between a network diagram and its mathematical function, we can develop more general network mappings by considering more complex network diagrams. However, these must be restricted to a feed-forward architecture, in other words to one having no closed directed cycles, to ensure that the outputs are deterministic functions of the inputs. This is illustrated with a simple example in Figure 5.2. Each (hidden or output) unit in such a network computes a function given by 

$$
z _ {k} = h \left(\sum_ {j} w _ {k j} z _ {j}\right)\tag{5.10}
$$

where the sum runs over all units that send connections to unit k (and a bias parameter is included in the summation). For a given set of values applied to the inputs of the network, successive application of (5.10) allows the activations of all units in the network to be evaluated including those of the output units. 

The approximation properties of feed-forward networks have been widely studied (Funahashi, 1989; Cybenko, 1989; Hornik et al., 1989; Stinchecombe and White, 1989; Cotter, 1990; Ito, 1991; Hornik, 1991; Kreinovich, 1991; Ripley, 1996) and found to be very general. Neural networks are therefore said to be universal approximators. For example, a two-layer network with linear outputs can uniformly approximate any continuous function on a compact input domain to arbitrary accuracy provided the network has a sufficiently large number of hidden units. This result holds for a wide range of hidden unit activation functions, but excluding polynomials. Although such theorems are reassuring, the key problem is how to find suitable parameter values given a set of training data, and in later sections of this chapter we will show that there exist effective solutions to this problem based on both maximum likelihood and Bayesian approaches. 


Figure 5.3 Illustration of the capability of a multilayer perceptron to approximate four different functions comprising (a) $f ( x ) = x ^ { 2 }$ , (b) $f ( x ) = \sin ( x )$ , (c), $f ( x ) \ = \ | x |$ and (d) $f ( x ) \ { \overset { \cdot } { = } } \ H ( x )$ where $H ( x )$ is the Heaviside step function. In each case, $ { N _ { \mathrm { ~ ~ \scriptsize ~ = ~ } } } 5 0$ data points, shown as blue dots, have been sampled uniformly in x over the interval $( - 1 , 1 )$ and the corresponding values of $f ( x )$ evaluated. These data points are then used to train a twolayer network having 3 hidden units with ‘tanh’ activation functions and linear output units. The resulting network functions are shown by the red curves, and the outputs of the three hidden units are shown by the three dashed curves.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/666841035d59b682570304e05a9a299978dcf72ef39501c2c5bea69e53808e80.jpg)



(a)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/88cddf34a87da9b0df5690206a3f42f05d66832913d0d2f6f887f620e22b7123.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a861d8db25b616ca4c951071f6b416094740ec588920afabdff362d952b6bb45.jpg)



(c)



(b)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/8048576c095262513e2f876e2ddc45830798d06a262407c24481cb218b0d18eb.jpg)



(d)


The capability of a two-layer network to model a broad range of functions is illustrated in Figure 5.3. This figure also shows how individual hidden units work collaboratively to approximate the final function. The role of hidden units in a simple classification problem is illustrated in Figure 5.4 using the synthetic classification data set described in Appendix A. 

## 5.1.1 Weight-space symmetries

One property of feed-forward networks, which will play a role when we consider Bayesian model comparison, is that multiple distinct choices for the weight vector w can all give rise to the same mapping function from inputs to outputs (Chen et al., 1993). Consider a two-layer network of the form shown in Figure 5.1 with M hidden units having ‘tanh’ activation functions and full connectivity in both layers. If we change the sign of all of the weights and the bias feeding into a particular hidden unit, then, for a given input pattern, the sign of the activation of the hidden unit will be reversed, because ‘tanh’ is an odd function, so that tanh $( - a ) = - \operatorname { t a n h } ( a )$ . This transformation can be exactly compensated by changing the sign of all of the weights leading out of that hidden unit. Thus, by changing the signs of a particular group of weights (and a bias), the input–output mapping function represented by the network is unchanged, and so we have found two different weight vectors that give rise to the same mapping function. For M hidden units, there will be M such ‘sign-flip 

Figure 5.4 Example of the solution of a simple twoclass classification problem involving synthetic data using a neural network having two inputs, two hidden units with ‘tanh’ activation functions, and a single output having a logistic sigmoid activation function. The dashed blue lines show the $z = 0 . 5$ contours for each of the hidden units, and the red line shows the $y = 0 . 5$ decision surface for the network. For comparison, the green line denotes the optimal decision boundary computed from the distributions used to generate the data. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/1d9ae1a19fea3bdd511656d736012b3ddbca562a3795e3cf764e17fb2b32d7ff.jpg)


symmetries, and thus any given weight vector will be one of a set $2 ^ { M }$ equivalent weight vectors . 

Similarly, imagine that we interchange the values of all of the weights (and the bias) leading both into and out of a particular hidden unit with the corresponding values of the weights (and bias) associated with a different hidden unit. Again, this clearly leaves the network input–output mapping function unchanged, but it corresponds to a different choice of weight vector. For M hidden units, any given weight vector will belong to a set of M! equivalent weight vectors associated with this interchange symmetry, corresponding to the M! different orderings of the hidden units. The network will therefore have an overall weight-space symmetry factor of $M ! 2 ^ { M }$ For networks with more than two layers of weights, the total level of symmetry will be given by the product of such factors, one for each layer of hidden units. 

It turns out that these factors account for all of the symmetries in weight space (except for possible accidental symmetries due to specific choices for the weight values). Furthermore, the existence of these symmetries is not a particular property of the ‘tanh’ function but applies to a wide range of activation functions (Kurkov˙ a and´ Kainen, 1994). In many cases, these symmetries in weight space are of little practical consequence, although in Section 5.7 we shall encounter a situation in which we need to take them into account. 

## 5.2. Network Training

So far, we have viewed neural networks as a general class of parametric nonlinear functions from a vector x of input variables to a vector y of output variables. A simple approach to the problem of determining the network parameters is to make an analogy with the discussion of polynomial curve fitting in Section 1.1, and therefore to minimize a sum-of-squares error function. Given a training set comprising a set of input vectors $\left\{ \mathbf { x } _ { n } \right\}$ , where $n = 1 , \ldots , N$ , together with a corresponding set of target vectors $\left\{ \mathbf { t } _ { n } \right\}$ , we minimize the error function 

$$
E (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \| \mathbf {y} (\mathbf {x} _ {n}, \mathbf {w}) - \mathbf {t} _ {n} \| ^ {2}.\tag{5.11}
$$

However, we can provide a much more general view of network training by first giving a probabilistic interpretation to the network outputs. We have already seen many advantages of using probabilistic predictions in Section 1.5.4. Here it will also provide us with a clearer motivation both for the choice of output unit nonlinearity and the choice of error function. 

We start by discussing regression problems, and for the moment we consider a single target variable t that can take any real value. Following the discussions in Section 1.2.5 and 3.1, we assume that t has a Gaussian distribution with an xdependent mean, which is given by the output of the neural network, so that 

$$
p (t | \mathbf {x}, \mathbf {w}) = \mathcal {N} \left(t | y (\mathbf {x}, \mathbf {w}), \beta^ {- 1}\right)\tag{5.12}
$$

where $\beta$ is the precision (inverse variance) of the Gaussian noise. Of course this is a somewhat restrictive assumption, and in Section 5.6 we shall see how to extend this approach to allow for more general conditional distributions. For the conditional distribution given by (5.12), it is sufficient to take the output unit activation function to be the identity, because such a network can approximate any continuous function from x to y. Given a data set of N independent, identically distributed observations $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ , along with corresponding target values $\mathbf { t } = \{ t _ { 1 } , \ldots , t _ { N } \}$ , we can construct the corresponding likelihood function 

$$
p (\mathbf {t} | \mathbf {X}, \mathbf {w}, \beta) = \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {x} _ {n}, \mathbf {w}, \beta).
$$

Taking the negative logarithm, we obtain the error function 

$$
\frac {\beta}{2} \sum_ {n = 1} ^ {N} \{y (\mathbf {x} _ {n}, \mathbf {w}) - t _ {n} \} ^ {2} - \frac {N}{2} \ln \beta + \frac {N}{2} \ln (2 \pi)\tag{5.13}
$$

which can be used to learn the parameters w and $\beta .$ In Section 5.7, we shall discuss the Bayesian treatment of neural networks, while here we consider a maximum likelihood approach. Note that in the neural networks literature, it is usual to consider the minimization of an error function rather than the maximization of the (log) likelihood, and so here we shall follow this convention. Consider first the determination of w. Maximizing the likelihood function is equivalent to minimizing the sum-of-squares error function given by 

$$
E (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \{y (\mathbf {x} _ {n}, \mathbf {w}) - t _ {n} \} ^ {2}\tag{5.14}
$$

where we have discarded additive and multiplicative constants. The value of w found by minimizing $E ( \mathbf { w } )$ will be denoted $\mathbf { w } _ { \mathrm { M L } }$ because it corresponds to the maximum likelihood solution. In practice, the nonlinearity of the network function $y ( \mathbf { x } _ { n } , \mathbf { w } )$ causes the error $E ( \mathbf { w } )$ to be nonconvex, and so in practice local maxima of the likelihood may be found, corresponding to local minima of the error function, as discussed in Section 5.2.1. 

Having found $\mathbf { w } _ { \mathrm { M L } }$ , the value of $\beta$ can be found by minimizing the negative log likelihood to give 

$$
\frac {1}{\beta_ {\mathrm{ML}}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \{y (\mathbf {x} _ {n}, \mathbf {w} _ {\mathrm{ML}}) - t _ {n} \} ^ {2}.\tag{5.15}
$$

Note that this can be evaluated once the iterative optimization required to find $\mathbf { w } _ { \mathrm { M L } }$ is completed. If we have multiple target variables, and we assume that they are independent conditional on x and w with shared noise precision $\beta ,$ , then the conditional distribution of the target values is given by 

$$
p (\mathbf {t} | \mathbf {x}, \mathbf {w}) = \mathcal {N} \left(\mathbf {t} | \mathbf {y} (\mathbf {x}, \mathbf {w}), \beta^ {- 1} \mathbf {I}\right).\tag{5.16}
$$

Following the same argument as for a single target variable, we see that the maximum likelihood weights are determined by minimizing the sum-of-squares error function (5.11). The noise precision is then given by 

$$
\frac {1}{\beta_ {\mathrm{ML}}} = \frac {1}{N K} \sum_ {n = 1} ^ {N} \| \mathbf {y} (\mathbf {x} _ {n}, \mathbf {w} _ {\mathrm{ML}}) - \mathbf {t} _ {n} \| ^ {2}\tag{5.17}
$$

where K is the number of target variables. The assumption of independence can be dropped at the expense of a slightly more complex optimization problem. 

Recall from Section 4.3.6 that there is a natural pairing of the error function (given by the negative log likelihood) and the output unit activation function. In the regression case, we can view the network as having an output activation function that is the identity, so that $y _ { k } = a _ { k }$ . The corresponding sum-of-squares error function has the property 

$$
\frac {\partial E}{\partial a _ {k}} = y _ {k} - t _ {k}\tag{5.18}
$$

which we shall make use of when discussing error backpropagation in Section 5.3. 

Now consider the case of binary classification in which we have a single target variable t such that $t = 1$ denotes class $\mathcal { C } _ { 1 }$ and $t = 0$ denotes class $\mathcal { C } _ { 2 }$ . Following the discussion of canonical link functions in Section 4.3.6, we consider a network having a single output whose activation function is a logistic sigmoid 

$$
y = \sigma (a) \equiv \frac {1}{1 + \exp (- a)}\tag{5.19}
$$

so that $0 \leqslant y ( \mathbf { x } , \mathbf { w } ) \leqslant 1$ . We can interpret $y ( \mathbf { x } , \mathbf { w } )$ as the conditional probability $p ( \mathcal { C } _ { 1 } | \mathbf { x } )$ , with $p ( \mathcal { C } _ { 2 } | \mathbf { x } )$ given by $1 - y ( \mathbf x , \mathbf w )$ . The conditional distribution of targets given inputs is then a Bernoulli distribution of the form 

$$
p (t | \mathbf {x}, \mathbf {w}) = y (\mathbf {x}, \mathbf {w}) ^ {t} \left\{1 - y (\mathbf {x}, \mathbf {w}) \right\} ^ {1 - t}.\tag{5.20}
$$

If we consider a training set of independent observations, then the error function, which is given by the negative log likelihood, is then a cross-entropy error function of the form 

$$
E (\mathbf {w}) = - \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\}\tag{5.21}
$$

where $y _ { n }$ denotes $y ( \mathbf { x } _ { n } , \mathbf { w } )$ . Note that there is no analogue of the noise precision $\beta$ because the target values are assumed to be correctly labelled. However, the model is easily extended to allow for labelling errors. Simard et al. (2003) found that using the cross-entropy error function instead of the sum-of-squares for a classification problem leads to faster training as well as improved generalization. 

If we have K separate binary classifications to perform, then we can use a network having K outputs each of which has a logistic sigmoid activation function. Associated with each output is a binary class label $t _ { k } \in \{ 0 , 1 \}$ , where $k = 1 , \ldots , K$ If we assume that the class labels are independent, given the input vector, then the conditional distribution of the targets is 

$$
p (\mathbf {t} | \mathbf {x}, \mathbf {w}) = \prod_ {k = 1} ^ {K} y _ {k} (\mathbf {x}, \mathbf {w}) ^ {t _ {k}} \left[ 1 - y _ {k} (\mathbf {x}, \mathbf {w}) \right] ^ {1 - t _ {k}}.\tag{5.22}
$$

Taking the negative logarithm of the corresponding likelihood function then gives the following error function 

$$
E (\mathbf {w}) = - \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} \left\{t _ {n k} \ln y _ {n k} + (1 - t _ {n k}) \ln (1 - y _ {n k}) \right\}\tag{5.23}
$$

where $y _ { n k }$ denotes $y _ { k } ( \mathbf { x } _ { n } , \mathbf { w } )$ . Again, the derivative of the error function with respect to the activation for a particular output unit takes the form (5.18) just as in the regression case. 

It is interesting to contrast the neural network solution to this problem with the corresponding approach based on a linear classification model of the kind discussed in Chapter 4. Suppose that we are using a standard two-layer network of the kind shown in Figure 5.1. We see that the weight parameters in the first layer of the network are shared between the various outputs, whereas in the linear model each classification problem is solved independently. The first layer of the network can be viewed as performing a nonlinear feature extraction, and the sharing of features between the different outputs can save on computation and can also lead to improved generalization. 

Finally, we consider the standard multiclass classification problem in which each input is assigned to one of K mutually exclusive classes. The binary target variables $t _ { k } ~ \in ~ \{ 0 , 1 \}$ have a 1-of-K coding scheme indicating the class, and the network outputs are interpreted as $y _ { k } ( \mathbf { x } , \mathbf { w } ) = p ( t _ { k } = 1 | \mathbf { x } )$ , leading to the following error function 

$$
E (\mathbf {w}) = - \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} t _ {k n} \ln y _ {k} (\mathbf {x} _ {n}, \mathbf {w}).\tag{5.24}
$$

Figure 5.5 Geometrical view of the error function $E ( \mathbf { w } )$ as a surface sitting over weight space. Point $\mathbf { w } _ { A }$ is a local minimum and $\mathbf { w } _ { B }$ is the global minimum. At any point $\mathbf { w } _ { C }$ , the local gradient of the error surface is given by the vector $\nabla E .$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/4fbdd37b164fe7bf1686742224b4808202bb17b8039b9e6844370b996c08b004.jpg)


Following the discussion of Section 4.3.4, we see that the output unit activation function, which corresponds to the canonical link, is given by the softmax function 

$$
y _ {k} (\mathbf {x}, \mathbf {w}) = \frac {\exp (a _ {k} (\mathbf {x} , \mathbf {w}))}{\sum_ {j} \exp (a _ {j} (\mathbf {x} , \mathbf {w}))}\tag{5.25}
$$

which satisfies $0 \leqslant y _ { k } \leqslant 1$ and $\textstyle \sum _ { k } y _ { k } = 1$ . Note that the $y _ { k } ( \mathbf { x } , \mathbf { w } )$ are unchanged if a constant is added to all of the $a _ { k } ( { \bf x } , { \bf w } )$ , causing the error function to be constant for some directions in weight space. This degeneracy is removed if an appropriate regularization term (Section 5.5) is added to the error function. 

Once again, the derivative of the error function with respect to the activation for a particular output unit takes the familiar form (5.18). 

In summary, there is a natural choice of both output unit activation function and matching error function, according to the type of problem being solved. For regression we use linear outputs and a sum-of-squares error, for (multiple independent) binary classifications we use logistic sigmoid outputs and a cross-entropy error function, and for multiclass classification we use softmax outputs with the corresponding multiclass cross-entropy error function. For classification problems involving two classes, we can use a single logistic sigmoid output, or alternatively we can use a network with two outputs having a softmax output activation function. 

## 5.2.1 Parameter optimization

We turn next to the task of finding a weight vector w which minimizes the chosen function $E ( \mathbf { w } )$ . At this point, it is useful to have a geometrical picture of the error function, which we can view as a surface sitting over weight space as shown in Figure 5.5. First note that if we make a small step in weight space from w to $\mathbf { w } + \delta \mathbf { w }$ then the change in the error function is $\delta E \simeq \delta \mathbf { w } ^ { \mathrm { T } } \nabla E ( \mathbf { \bar { w } } )$ , where the vector $\nabla E ( \mathbf { w } )$ points in the direction of greatest rate of increase of the error function. Because the error $E ( \mathbf { w } )$ is a smooth continuous function of w, its smallest value will occur at a point in weight space such that the gradient of the error function vanishes, so that 

$$
\nabla E (\mathbf {w}) = 0\tag{5.26}
$$

as otherwise we could make a small step in the direction of $- \nabla E ( \mathbf { w } )$ and thereby further reduce the error. Points at which the gradient vanishes are called stationary points, and may be further classified into minima, maxima, and saddle points. 

Our goal is to find a vector w such that $E ( \mathbf { w } )$ takes its smallest value. However, the error function typically has a highly nonlinear dependence on the weights and bias parameters, and so there will be many points in weight space at which the gradient vanishes (or is numerically very small). Indeed, from the discussion in Section 5.1.1 we see that for any point w that is a local minimum, there will be other points in weight space that are equivalent minima. For instance, in a two-layer network of the kind shown in Figure 5.1, with M hidden units, each point in weight space is a member of a family of $M ! 2 ^ { M }$ equivalent points. 

Furthermore, there will typically be multiple inequivalent stationary points and in particular multiple inequivalent minima. A minimum that corresponds to the smallest value of the error function for any weight vector is said to be a $g l o b a l$ minimum. Any other minima corresponding to higher values of the error function are said to be local minima. For a successful application of neural networks, it may not be necessary to find the global minimum (and in general it will not be known whether the global minimum has been found) but it may be necessary to compare several local minima in order to find a sufficiently good solution. 

Because there is clearly no hope of finding an analytical solution to the equation $\nabla E ( \mathbf { w } ) = 0$ we resort to iterative numerical procedures. The optimization of continuous nonlinear functions is a widely studied problem and there exists an extensive literature on how to solve it efficiently. Most techniques involve choosing some initial value $\mathbf { w } ^ { ( 0 ) }$ for the weight vector and then moving through weight space in a succession of steps of the form 

$$
\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} + \Delta \mathbf {w} ^ {(\tau)}\tag{5.27}
$$

where $\tau$ labels the iteration step. Different algorithms involve different choices for the weight vector update $\Delta \mathbf { w } ^ { ( \tau ) }$ . Many algorithms make use of gradient information and therefore require that, after each update, the value of $\nabla E ( \mathbf { w } )$ is evaluated at the new weight vector $\mathbf { w } ^ { ( \tau + 1 ) }$ . In order to understand the importance of gradient information, it is useful to consider a local approximation to the error function based on a Taylor expansion. 

## 5.2.2 Local quadratic approximation

Insight into the optimization problem, and into the various techniques for solving it, can be obtained by considering a local quadratic approximation to the error function. 

Consider the Taylor expansion of $E ( \mathbf { w } )$ around some point $\widehat { \bf w }$ in weight space 

$$
E (\mathbf {w}) \simeq E (\widehat {\mathbf {w}}) + (\mathbf {w} - \widehat {\mathbf {w}}) ^ {\mathrm{T}} \mathbf {b} + \frac {1}{2} (\mathbf {w} - \widehat {\mathbf {w}}) ^ {\mathrm{T}} \mathbf {H} (\mathbf {w} - \widehat {\mathbf {w}})\tag{5.28}
$$

where cubic and higher terms have been omitted. Here b is defined to be the gradient of E evaluated at $\widehat { \mathbf { w } }$ 

$$
\mathbf {b} \equiv \left. \nabla E \right| _ {\mathbf {w} = \widehat {\mathbf {w}}}\tag{5.29}
$$

and the Hessian matrix $\mathbf { H } = \nabla \nabla E$ has elements 

$$
(\mathbf {H}) _ {i j} \equiv \left. \frac {\partial E}{\partial w _ {i} \partial w _ {j}} \right| _ {\mathbf {w} = \widehat {\mathbf {w}}}.\tag{5.30}
$$

From (5.28), the corresponding local approximation to the gradient is given by 

$$
\nabla E \simeq \mathbf {b} + \mathbf {H} (\mathbf {w} - \widehat {\mathbf {w}}).\tag{5.31}
$$

For points w that are sufficiently close to $\widehat { \bf w }$ , these expressions will give reasonable approximations for the error and its gradient. 

Consider the particular case of a local quadratic approximation around a point $\mathbf { w } ^ { \star }$ that is a minimum of the error function. In this case there is no linear term, because $\nabla E = 0$ at $\mathbf { w } ^ { \star }$ , and (5.28) becomes 

$$
E (\mathbf {w}) = E (\mathbf {w} ^ {\star}) + \frac {1}{2} (\mathbf {w} - \mathbf {w} ^ {\star}) ^ {\mathrm{T}} \mathbf {H} (\mathbf {w} - \mathbf {w} ^ {\star})\tag{5.32}
$$

where the Hessian H is evaluated at $\mathbf { w } ^ { \star }$ . In order to interpret this geometrically, consider the eigenvalue equation for the Hessian matrix 

$$
\mathbf {H} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{5.33}
$$

where the eigenvectors $\mathbf { u } _ { i }$ form a complete orthonormal set (Appendix C) so that 

$$
\mathbf {u} _ {i} ^ {\mathrm{T}} \mathbf {u} _ {j} = \delta_ {i j}.\tag{5.34}
$$

We now expand $\left( \mathbf { w } - \mathbf { w } ^ { \star } \right)$ as a linear combination of the eigenvectors in the form 

$$
\mathbf {w} - \mathbf {w} ^ {\star} = \sum_ {i} \alpha_ {i} \mathbf {u} _ {i}.\tag{5.35}
$$

This can be regarded as a transformation of the coordinate system in which the origin is translated to the point $\mathbf { w } ^ { \star }$ , and the axes are rotated to align with the eigenvectors (through the orthogonal matrix whose columns are the $\mathbf { u } _ { i } )$ , and is discussed in more detail in Appendix C. Substituting (5.35) into (5.32), and using (5.33) and (5.34), allows the error function to be written in the form 

$$
E (\mathbf {w}) = E (\mathbf {w} ^ {\star}) + \frac {1}{2} \sum_ {i} \lambda_ {i} \alpha_ {i} ^ {2}.\tag{5.36}
$$

A matrix H is said to be positive definite if, and only if, 

$$
\mathbf {v} ^ {\mathrm{T}} \mathbf {H} \mathbf {v} > 0 \quad \text {   for   all   } \mathbf {v}.\tag{5.37}
$$

In the neighbourhood of a minimum $\mathbf { w } ^ { \star }$ , the error function can be approximated by a quadratic. Contours of constant error are then ellipses whose axes are aligned with the eigenvectors $\mathbf { u } _ { i }$ of the Hessian matrix, with lengths that are inversely proportional to the square roots of the corresponding eigenvectors $\lambda _ { i }$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/f240565430fbe22a5aa2eb16e5a6882ba0a275f5c1216b00a2867060d005c843.jpg)


Because the eigenvectors $\left\{ { { \bf { u } } _ { i } } \right\}$ form a complete set, an arbitrary vector v can be written in the form 

$$
\mathbf {v} = \sum_ {i} c _ {i} \mathbf {u} _ {i}.\tag{5.38}
$$

From (5.33) and (5.34), we then have 

$$
\mathbf {v} ^ {\mathrm{T}} \mathbf {H} \mathbf {v} = \sum_ {i} c _ {i} ^ {2} \lambda_ {i}\tag{5.39}
$$

and so H will be positive definite if, and only if, all of its eigenvalues are positive. In the new coordinate system, whose basis vectors are given by the eigenvectors $\{ \mathbf { u } _ { i } \}$ , the contours of constant $E$ are ellipses centred on the origin, as illustrated in Figure 5.6. For a one-dimensional weight space, a stationary point $w ^ { \star }$ will be a minimum if 

$$
\left. \frac {\partial^ {2} E}{\partial w ^ {2}} \right| _ {w ^ {\star}} > 0.\tag{5.40}
$$

The corresponding result in D-dimensions is that the Hessian matrix, evaluated at $\mathbf { w } ^ { \star }$ , should be positive definite. 

## 5.2.3 Use of gradient information

As we shall see in Section 5.3, it is possible to evaluate the gradient of an error function efficiently by means of the backpropagation procedure. The use of this gradient information can lead to significant improvements in the speed with which the minima of the error function can be located. We can see why this is so, as follows. 

In the quadratic approximation to the error function, given in (5.28), the error surface is specified by the quantities b and H, which contain a total of $W ( W +$ $3 ) / 2$ independent elements (because the matrix H is symmetric), where W is the dimensionality of $\mathbf { w }$ (i.e., the total number of adaptive parameters in the network). The location of the minimum of this quadratic approximation therefore depends on $O ( W ^ { 2 } )$ parameters, and we should not expect to be able to locate the minimum until we have gathered $O ( W ^ { 2 } )$ independent pieces of information. If we do not make use of gradient information, we would expect to have to perform $O ( W ^ { 2 } )$ function evaluations, each of which would require $O ( W )$ steps. Thus, the computational effort needed to find the minimum using such an approach would be $O ( W ^ { 3 } )$ 

Now compare this with an algorithm that makes use of the gradient information. Because each evaluation of $\nabla E$ brings $W$ items of information, we might hope to find the minimum of the function in $O ( W )$ gradient evaluations. As we shall see, by using error backpropagation, each such evaluation takes only $O ( W )$ steps and so the minimum can now be found in $O ( W ^ { 2 } )$ steps. For this reason, the use of gradient information forms the basis of practical algorithms for training neural networks. 

## 5.2.4 Gradient descent optimization

The simplest approach to using gradient information is to choose the weight update in (5.27) to comprise a small step in the direction of the negative gradient, so that 

$$
\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} - \eta \nabla E (\mathbf {w} ^ {(\tau)})\tag{5.41}
$$

where the parameter $\eta > 0$ is known as the learning rate. After each such update, the gradient is re-evaluated for the new weight vector and the process repeated. Note that the error function is defined with respect to a training set, and so each step requires that the entire training set be processed in order to evaluate $\nabla E$ . Techniques that use the whole data set at once are called batch methods. At each step the weight vector is moved in the direction of the greatest rate of decrease of the error function, and so this approach is known as gradient descent or steepest descent. Although such an approach might intuitively seem reasonable, in fact it turns out to be a poor algorithm, for reasons discussed in Bishop and Nabney (2008). 

For batch optimization, there are more efficient methods, such as conjugate gradients and quasi-Newton methods, which are much more robust and much faster than simple gradient descent (Gill et al., 1981; Fletcher, 1987; Nocedal and Wright, 1999). Unlike gradient descent, these algorithms have the property that the error function always decreases at each iteration unless the weight vector has arrived at a local or global minimum. 

In order to find a sufficiently good minimum, it may be necessary to run a gradient-based algorithm multiple times, each time using a different randomly chosen starting point, and comparing the resulting performance on an independent validation set. 

There is, however, an on-line version of gradient descent that has proved useful in practice for training neural networks on large data sets (Le Cun et al., 1989). Error functions based on maximum likelihood for a set of independent observations comprise a sum of terms, one for each data point 

$$
E (\mathbf {w}) = \sum_ {n = 1} ^ {N} E _ {n} (\mathbf {w}).\tag{5.42}
$$

On-line gradient descent, also known as sequential gradient descent or stochastic gradient descent, makes an update to the weight vector based on one data point at a time, so that 

$$
\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} - \eta \nabla E _ {n} (\mathbf {w} ^ {(\tau)}).\tag{5.43}
$$

This update is repeated by cycling through the data either in sequence or by selecting points at random with replacement. There are of course intermediate scenarios in which the updates are based on batches of data points. 

One advantage of on-line methods compared to batch methods is that the former handle redundancy in the data much more efficiently. To see, this consider an extreme example in which we take a data set and double its size by duplicating every data point. Note that this simply multiplies the error function by a factor of 2 and so is equivalent to using the original error function. Batch methods will require double the computational effort to evaluate the batch error function gradient, whereas online methods will be unaffected. Another property of on-line gradient descent is the possibility of escaping from local minima, since a stationary point with respect to the error function for the whole data set will generally not be a stationary point for each data point individually. 

Nonlinear optimization algorithms, and their practical application to neural network training, are discussed in detail in Bishop and Nabney (2008). 

## 5.3. Error Backpropagation

Our goal in this section is to find an efficient technique for evaluating the gradient of an error function E(w) for a feed-forward neural network. We shall see that this can be achieved using a local message passing scheme in which information is sent alternately forwards and backwards through the network and is known as error backpropagation, or sometimes simply as backprop. 

It should be noted that the term backpropagation is used in the neural computing literature to mean a variety of different things. For instance, the multilayer perceptron architecture is sometimes called a backpropagation network. The term backpropagation is also used to describe the training of a multilayer perceptron using gradient descent applied to a sum-of-squares error function. In order to clarify the terminology, it is useful to consider the nature of the training process more carefully. Most training algorithms involve an iterative procedure for minimization of an error function, with adjustments to the weights being made in a sequence of steps. At each such step, we can distinguish between two distinct stages. In the first stage, the derivatives of the error function with respect to the weights must be evaluated. As we shall see, the important contribution of the backpropagation technique is in providing a computationally efficient method for evaluating such derivatives. Because it is at this stage that errors are propagated backwards through the network, we shall use the term backpropagation specifically to describe the evaluation of derivatives. In the second stage, the derivatives are then used to compute the adjustments to be made to the weights. The simplest such technique, and the one originally considered by Rumelhart et al. (1986), involves gradient descent. It is important to recognize that the two stages are distinct. Thus, the first stage, namely the propagation of errors backwards through the network in order to evaluate derivatives, can be applied to many other kinds of network and not just the multilayer perceptron. It can also be applied to error functions other that just the simple sum-of-squares, and to the evaluation of other derivatives such as the Jacobian and Hessian matrices, as we shall see later in this chapter. Similarly, the second stage of weight adjustment using the calculated derivatives can be tackled using a variety of optimization schemes, many of which are substantially more powerful than simple gradient descent. 

## 5.3.1 Evaluation of error-function derivatives

We now derive the backpropagation algorithm for a general network having arbitrary feed-forward topology, arbitrary differentiable nonlinear activation functions, and a broad class of error function. The resulting formulae will then be illustrated using a simple layered network structure having a single layer of sigmoidal hidden units together with a sum-of-squares error. 

Many error functions of practical interest, for instance those defined by maximum likelihood for a set of i.i.d. data, comprise a sum of terms, one for each data point in the training set, so that 

$$
E (\mathbf {w}) = \sum_ {n = 1} ^ {N} E _ {n} (\mathbf {w}).\tag{5.44}
$$

Here we shall consider the problem of evaluating $\nabla E _ { n } ( \mathbf { w } )$ for one such term in the error function. This may be used directly for sequential optimization, or the results can be accumulated over the training set in the case of batch methods. 

Consider first a simple linear model in which the outputs $y _ { k }$ are linear combina tions of the input variables $x _ { i }$ so that 

$$
y _ {k} = \sum_ {i} w _ {k i} x _ {i}\tag{5.45}
$$

together with an error function that, for a particular input pattern n, takes the form 

$$
E _ {n} = \frac {1}{2} \sum_ {k} (y _ {n k} - t _ {n k}) ^ {2}\tag{5.46}
$$

where $y _ { n k } = y _ { k } ( \mathbf x _ { n } , \mathbf w )$ . The gradient of this error function with respect to a weight $w _ { j i }$ is given by 

$$
\frac {\partial E _ {n}}{\partial w _ {j i}} = (y _ {n j} - t _ {n j}) x _ {n i}\tag{5.47}
$$

which can be interpreted as a ‘local’ computation involving the product of an ‘error signal’ $y _ { n j } - t _ { n j }$ associated with the output end of the link $w _ { j i }$ and the variable $x _ { n i }$ associated with the input end of the link. In Section 4.3.2, we saw how a similar formula arises with the logistic sigmoid activation function together with the cross entropy error function, and similarly for the softmax activation function together with its matching cross-entropy error function. We shall now see how this simple result extends to the more complex setting of multilayer feed-forward networks. 

In a general feed-forward network, each unit computes a weighted sum of its inputs of the form 

$$
a _ {j} = \sum_ {i} w _ {j i} z _ {i}\tag{5.48}
$$

where $z _ { i }$ is the activation of a unit, or input, that sends a connection to unit $j ,$ , and $w _ { j i }$ is the weight associated with that connection. In Section 5.1, we saw that biases can be included in this sum by introducing an extra unit, or input, with activation fixed at +1. We therefore do not need to deal with biases explicitly. The sum in (5.48) is transformed by a nonlinear activation function $h ( \cdot )$ to give the activation $z _ { j }$ of unit $j$ in the form 

$$
z _ {j} = h (a _ {j}).\tag{5.49}
$$

Note that one or more of the variables $z _ { i }$ in the sum in (5.48) could be an input, and similarly, the unit $j$ in (5.49) could be an output. 

For each pattern in the training set, we shall suppose that we have supplied the corresponding input vector to the network and calculated the activations of all of the hidden and output units in the network by successive application of (5.48) and (5.49). This process is often called forward propagation because it can be regarded as a forward flow of information through the network. 

Now consider the evaluation of the derivative of $E _ { n }$ with respect to a weight $w _ { j i }$ . The outputs of the various units will depend on the particular input pattern n. However, in order to keep the notation uncluttered, we shall omit the subscript n from the network variables. First we note that $E _ { n }$ depends on the weight $w _ { j i }$ only via the summed input $a _ { j }$ to unit $j$ . We can therefore apply the chain rule for partial derivatives to give 

$$
\frac {\partial E _ {n}}{\partial w _ {j i}} = \frac {\partial E _ {n}}{\partial a _ {j}} \frac {\partial a _ {j}}{\partial w _ {j i}}.\tag{5.50}
$$

We now introduce a useful notation 

$$
\delta_ {j} \equiv \frac {\partial E _ {n}}{\partial a _ {j}}\tag{5.51}
$$

where the $\delta \mathbf { \dot { s } }$ are often referred to as errors for reasons we shall see shortly. Using (5.48), we can write 

$$
\frac {\partial a _ {j}}{\partial w _ {j i}} = z _ {i}.\tag{5.52}
$$

Substituting (5.51) and (5.52) into (5.50), we then obtain 

$$
\frac {\partial E _ {n}}{\partial w _ {j i}} = \delta_ {j} z _ {i}.\tag{5.53}
$$

Equation (5.53) tells us that the required derivative is obtained simply by multiplying the value of δ for the unit at the output end of the weight by the value of $z$ for the unit at the input end of the weight (where z = 1 in the case of a bias). Note that this takes the same form as for the simple linear model considered at the start of this section. Thus, in order to evaluate the derivatives, we need only to calculate the value of $\delta _ { j }$ for each hidden and output unit in the network, and then apply (5.53). 

As we have seen already, for the output units, we have 

$$
\delta_ {k} = y _ {k} - t _ {k}\tag{5.54}
$$

igure 5.7 Illustration of the calculation of $\delta _ { j }$ for hidden unit $j$ by backpropagation of the $\delta \boldsymbol { \mathsf { s } }$ from those units k to which unit $j$ sends connections. The blue arrow denotes the direction of information flow during forward propagation, and the red arrows indicate the backward propagation of error information. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/035a8a8537a9b8c5099fc271bfe4fcbce9c157008e6143557ea658160d0cbb05.jpg)


provided we are using the canonical link as the output-unit activation function. To evaluate the $\delta \mathbf { \dot { s } }$ for hidden units, we again make use of the chain rule for partial derivatives, 

$$
\delta_ {j} \equiv \frac {\partial E _ {n}}{\partial a _ {j}} = \sum_ {k} \frac {\partial E _ {n}}{\partial a _ {k}} \frac {\partial a _ {k}}{\partial a _ {j}}\tag{5.55}
$$

where the sum runs over all units k to which unit $j$ sends connections. The arrangement of units and weights is illustrated in Figure 5.7. Note that the units labelled k could include other hidden units and/or output units. In writing down (5.55), we are making use of the fact that variations in $a _ { j }$ give rise to variations in the error function only through variations in the variables $a _ { k }$ . If we now substitute the definition of $\delta$ given by (5.51) into (5.55), and make use of (5.48) and (5.49), we obtain the following backpropagation formula 

$$
\delta_ {j} = h ^ {\prime} (a _ {j}) \sum_ {k} w _ {k j} \delta_ {k}\tag{5.56}
$$

which tells us that the value of $\delta$ for a particular hidden unit can be obtained by propagating the $\delta \mathbf { \dot { s } }$ backwards from units higher up in the network, as illustrated in Figure 5.7. Note that the summation in (5.56) is taken over the first index on $w _ { k j }$ (corresponding to backward propagation of information through the network), whereas in the forward propagation equation (5.10) it is taken over the second index. Because we already know the values of the $\delta \mathbf { \dot { s } }$ for the output units, it follows that by recursively applying (5.56) we can evaluate the $\delta \mathbf { \dot { s } }$ for all of the hidden units in a feed-forward network, regardless of its topology. 

The backpropagation procedure can therefore be summarized as follows. 

## Error Backpropagation

1. Apply an input vector ${ \bf x } _ { n }$ to the network and forward propagate through the network using (5.48) and (5.49) to find the activations of all the hidden and output units. 

2. Evaluate the $\delta _ { k }$ for all the output units using (5.54). 

3. Backpropagate the $\delta \mathbf { \dot { s } }$ using (5.56) to obtain $\delta _ { j }$ for each hidden unit in the network. 

4. Use (5.53) to evaluate the required derivatives. 

For batch methods, the derivative of the total error $E$ can then be obtained by repeating the above steps for each pattern in the training set and then summing over all patterns: 

$$
\frac {\partial E}{\partial w _ {j i}} = \sum_ {n} \frac {\partial E _ {n}}{\partial w _ {j i}}.\tag{5.57}
$$

In the above derivation we have implicitly assumed that each hidden or output unit in the network has the same activation function $h ( \cdot )$ . The derivation is easily generalized, however, to allow different units to have individual activation functions, simply by keeping track of which form of $h ( \cdot )$ goes with which unit. 

## 5.3.2 A simple example

The above derivation of the backpropagation procedure allowed for general forms for the error function, the activation functions, and the network topology. In order to illustrate the application of this algorithm, we shall consider a particular example. This is chosen both for its simplicity and for its practical importance, because many applications of neural networks reported in the literature make use of this type of network. Specifically, we shall consider a two-layer network of the form illustrated in Figure 5.1, together with a sum-of-squares error, in which the output units have linear activation functions, so that $y _ { k } = a _ { k }$ , while the hidden units have logistic sigmoid activation functions given by 

$$
h (a) \equiv \tanh (a)\tag{5.58}
$$

where 

$$
\tanh (a) = \frac {e ^ {a} - e ^ {- a}}{e ^ {a} + e ^ {- a}}.\tag{5.59}
$$

A useful feature of this function is that its derivative can be expressed in a particularly simple form: 

$$
h ^ {\prime} (a) = 1 - h (a) ^ {2}.\tag{5.60}
$$

We also consider a standard sum-of-squares error function, so that for pattern n the error is given by 

$$
E _ {n} = \frac {1}{2} \sum_ {k = 1} ^ {K} (y _ {k} - t _ {k}) ^ {2}\tag{5.61}
$$

where $y _ { k }$ is the activation of output unit $k _ { : }$ , and $t _ { k }$ is the corresponding target, for a particular input pattern ${ \bf x } _ { n }$ 

For each pattern in the training set in turn, we first perform a forward propagation using 

$$
a _ {j} = \sum_ {i = 0} ^ {D} w _ {j i} ^ {(1)} x _ {i}\tag{5.62}
$$

$$
z _ {j} = \tanh (a _ {j})\tag{5.63}
$$

$$
y _ {k} = \sum_ {j = 0} ^ {M} w _ {k j} ^ {(2)} z _ {j}.\tag{5.64}
$$

Next we compute the $\delta \mathbf { \dot { s } }$ for each output unit using 

$$
\delta_ {k} = y _ {k} - t _ {k}.\tag{5.65}
$$

Then we backpropagate these to obtain δs for the hidden units using 

$$
\delta_ {j} = (1 - z _ {j} ^ {2}) \sum_ {k = 1} ^ {K} w _ {k j} \delta_ {k}.\tag{5.66}
$$

Finally, the derivatives with respect to the first-layer and second-layer weights are given by 

$$
\frac {\partial E _ {n}}{\partial w _ {j i} ^ {(1)}} = \delta_ {j} x _ {i}, \quad \frac {\partial E _ {n}}{\partial w _ {k j} ^ {(2)}} = \delta_ {k} z _ {j}.\tag{5.67}
$$

## 5.3.3 Efficiency of backpropagation

One of the most important aspects of backpropagation is its computational efficiency. To understand this, let us examine how the number of computer operations required to evaluate the derivatives of the error function scales with the total number $W$ of weights and biases in the network. A single evaluation of the error function (for a given input pattern) would require $O ( W )$ operations, for sufficiently large W. This follows from the fact that, except for a network with very sparse connections, the number of weights is typically much greater than the number of units, and so the bulk of the computational effort in forward propagation is concerned with evaluating the sums in (5.48), with the evaluation of the activation functions representing a small overhead. Each term in the sum in (5.48) requires one multiplication and one addition, leading to an overall computational cost that is $O ( W )$ 

An alternative approach to backpropagation for computing the derivatives of the error function is to use finite differences. This can be done by perturbing each weight in turn, and approximating the derivatives by the expression 

$$
\frac {\partial E _ {n}}{\partial w _ {j i}} = \frac {E _ {n} (w _ {j i} + \epsilon) - E _ {n} (w _ {j i})}{\epsilon} + O (\epsilon)\tag{5.68}
$$

where $\epsilon \ll 1$ . In a software simulation, the accuracy of the approximation to the derivatives can be improved by making  smaller, until numerical roundoff problems arise. The accuracy of the finite differences method can be improved significantly by using symmetrical central differences of the form 

$$
\frac {\partial E _ {n}}{\partial w _ {j i}} = \frac {E _ {n} (w _ {j i} + \epsilon) - E _ {n} (w _ {j i} - \epsilon)}{2 \epsilon} + O (\epsilon^ {2}).\tag{5.69}
$$

In this case, the $O ( \epsilon )$ corrections cancel, as can be verified by Taylor expansion on the right-hand side of (5.69), and so the residual corrections are ${ \cal O } ( \epsilon ^ { 2 } )$ . The number of computational steps is, however, roughly doubled compared with (5.68). 

The main problem with numerical differentiation is that the highly desirable $O ( W )$ scaling has been lost. Each forward propagation requires $O ( W )$ steps, and there are W weights in the network each of which must be perturbed individually, so that the overall scaling is $O ( W ^ { 2 } )$ 


Illustration of a modular pattern recognition system in which the Jacobian matrix can be used to backpropagate error signals from the outputs through to earlier modules in the system.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/965c8869e618b1f4dc498afec9ace27d33b3b9ae35c01924fb7af8346443d206.jpg)


However, numerical differentiation plays an important role in practice, because a comparison of the derivatives calculated by backpropagation with those obtained using central differences provides a powerful check on the correctness of any software implementation of the backpropagation algorithm. When training networks in practice, derivatives should be evaluated using backpropagation, because this gives the greatest accuracy and numerical efficiency. However, the results should be compared with numerical differentiation using (5.69) for some test cases in order to check the correctness of the implementation. 

## 5.3.4 The Jacobian matrix

We have seen how the derivatives of an error function with respect to the weights can be obtained by the propagation of errors backwards through the network. The technique of backpropagation can also be applied to the calculation of other derivatives. Here we consider the evaluation of the Jacobian matrix, whose elements are given by the derivatives of the network outputs with respect to the inputs 

$$
J _ {k i} \equiv \frac {\partial y _ {k}}{\partial x _ {i}}\tag{5.70}
$$

where each such derivative is evaluated with all other inputs held fixed. Jacobian matrices play a useful role in systems built from a number of distinct modules, as illustrated in Figure 5.8. Each module can comprise a fixed or adaptive function, which can be linear or nonlinear, so long as it is differentiable. Suppose we wish to minimize an error function E with respect to the parameter w in Figure 5.8. The derivative of the error function is given by 

$$
\frac {\partial E}{\partial w} = \sum_ {k, j} \frac {\partial E}{\partial y _ {k}} \frac {\partial y _ {k}}{\partial z _ {j}} \frac {\partial z _ {j}}{\partial w}\tag{5.71}
$$

in which the Jacobian matrix for the red module in Figure 5.8 appears in the middle term. 

Because the Jacobian matrix provides a measure of the local sensitivity of the outputs to changes in each of the input variables, it also allows any known errors $\Delta x _ { i }$ associated with the inputs to be propagated through the trained network in order to estimate their contribution $\Delta y _ { k }$ to the errors at the outputs, through the relation 

$$
\Delta y _ {k} \simeq \sum_ {i} \frac {\partial y _ {k}}{\partial x _ {i}} \Delta x _ {i}\tag{5.72}
$$

which is valid provided the $\lvert \Delta x _ { i } \rvert$ are small. In general, the network mapping represented by a trained neural network will be nonlinear, and so the elements of the Jacobian matrix will not be constants but will depend on the particular input vector used. Thus (5.72) is valid only for small perturbations of the inputs, and the Jacobian itself must be re-evaluated for each new input vector. 

The Jacobian matrix can be evaluated using a backpropagation procedure that is similar to the one derived earlier for evaluating the derivatives of an error function with respect to the weights. We start by writing the element $J _ { k i }$ in the form 

$$
\begin{array}{r c l} J _ {k i} = \frac {\partial y _ {k}}{\partial x _ {i}} & = & \sum_ {j} \frac {\partial y _ {k}}{\partial a _ {j}} \frac {\partial a _ {j}}{\partial x _ {i}} \\ & = & \sum_ {j} w _ {j i} \frac {\partial y _ {k}}{\partial a _ {j}} \end{array}\tag{5.73}
$$

where we have made use of (5.48). The sum in (5.73) runs over all units $j$ to which the input unit $i$ sends connections (for example, over all units in the first hidden layer in the layered topology considered earlier). We now write down a recursive backpropagation formula to determine the derivatives $\partial { y _ { k } } / \partial { a _ { j } }$ 

$$
\begin{array}{r c l} \frac {\partial y _ {k}}{\partial a _ {j}} & = & \sum_ {l} \frac {\partial y _ {k}}{\partial a _ {l}} \frac {\partial a _ {l}}{\partial a _ {j}} \\ & = & h ^ {\prime} (a _ {j}) \sum_ {l} w _ {l j} \frac {\partial y _ {k}}{\partial a _ {l}} \end{array}\tag{5.74}
$$

where the sum runs over all units l to which unit $j$ sends connections (corresponding to the first index of $w _ { l j } )$ . Again, we have made use of (5.48) and (5.49). This backpropagation starts at the output units for which the required derivatives can be found directly from the functional form of the output-unit activation function. For instance, if we have individual sigmoidal activation functions at each output unit, then 

$$
\frac {\partial y _ {k}}{\partial a _ {j}} = \delta_ {k j} \sigma^ {\prime} (a _ {j})\tag{5.75}
$$

whereas for softmax outputs we have 

$$
\frac {\partial y _ {k}}{\partial a _ {j}} = \delta_ {k j} y _ {k} - y _ {k} y _ {j}.\tag{5.76}
$$

We can summarize the procedure for evaluating the Jacobian matrix as follows. Apply the input vector corresponding to the point in input space at which the Jacobian matrix is to be found, and forward propagate in the usual way to obtain the 

Exercise 5.15 

activations of all of the hidden and output units in the network. Next, for each row k of the Jacobian matrix, corresponding to the output unit k, backpropagate using the recursive relation (5.74), starting with (5.75) or (5.76), for all of the hidden units in the network. Finally, use (5.73) to do the backpropagation to the inputs. The Jacobian can also be evaluated using an alternative forward propagation formalism, which can be derived in an analogous way to the backpropagation approach given here. 

Again, the implementation of such algorithms can be checked by using numerical differentiation in the form 

$$
\frac {\partial y _ {k}}{\partial x _ {i}} = \frac {y _ {k} (x _ {i} + \epsilon) - y _ {k} (x _ {i} - \epsilon)}{2 \epsilon} + O (\epsilon^ {2})\tag{5.77}
$$

which involves 2D forward propagations for a network having D inputs. 

## 5.4. The Hessian Matrix

We have shown how the technique of backpropagation can be used to obtain the first derivatives of an error function with respect to the weights in the network. Backpropagation can also be used to evaluate the second derivatives of the error, given by 

$$
\frac {\partial^ {2} E}{\partial w _ {j i} \partial w _ {l k}}.\tag{5.78}
$$

Note that it is sometimes convenient to consider all of the weight and bias parameters as elements $w _ { i }$ of a single vector, denoted w, in which case the second derivatives form the elements $H _ { i j }$ of the Hessian matrix H, where $i , j \in \{ 1 , \dots , W \}$ and W is the total number of weights and biases. The Hessian plays an important role in many aspects of neural computing, including the following: 

1. Several nonlinear optimization algorithms used for training neural networks are based on considerations of the second-order properties of the error surface, which are controlled by the Hessian matrix (Bishop and Nabney, 2008). 

2. The Hessian forms the basis of a fast procedure for re-training a feed-forward network following a small change in the training data (Bishop, 1991). 

3. The inverse of the Hessian has been used to identify the least significant weights in a network as part of network ‘pruning’ algorithms (Le Cun et al., 1990). 

4. The Hessian plays a central role in the Laplace approximation for a Bayesian neural network (see Section 5.7). Its inverse is used to determine the predictive distribution for a trained network, its eigenvalues determine the values of hyperparameters, and its determinant is used to evaluate the model evidence. 

Various approximation schemes have been used to evaluate the Hessian matrix for a neural network. However, the Hessian can also be calculated exactly using an extension of the backpropagation technique. 

An important consideration for many applications of the Hessian is the efficiency with which it can be evaluated. If there are $W$ parameters (weights and biases) in the network, then the Hessian matrix has dimensions $W \times W$ and so the computational effort needed to evaluate the Hessian will scale like $O ( W ^ { 2 } )$ for each pattern in the data set. As we shall see, there are efficient methods for evaluating the Hessian whose scaling is indeed $O ( W ^ { 2 } )$ 

## 5.4.1 Diagonal approximation

Some of the applications for the Hessian matrix discussed above require the inverse of the Hessian, rather than the Hessian itself. For this reason, there has been some interest in using a diagonal approximation to the Hessian, in other words one that simply replaces the off-diagonal elements with zeros, because its inverse is trivial to evaluate. Again, we shall consider an error function that consists of a sum of terms, one for each pattern in the data set, so that $\textstyle E = \sum _ { n } E _ { n }$ . The Hessian can then be obtained by considering one pattern at a time, and then summing the results over all patterns. From (5.48), the diagonal elements of the Hessian, for pattern n, can be written 

$$
\frac {\partial^ {2} E _ {n}}{\partial w _ {j i} ^ {2}} = \frac {\partial^ {2} E _ {n}}{\partial a _ {j} ^ {2}} z _ {i} ^ {2}.\tag{5.79}
$$

Using (5.48) and (5.49), the second derivatives on the right-hand side of (5.79) can be found recursively using the chain rule of differential calculus to give a backpropagation equation of the form 

$$
\frac {\partial^ {2} E _ {n}}{\partial a _ {j} ^ {2}} = h ^ {\prime} (a _ {j}) ^ {2} \sum_ {k} \sum_ {k ^ {\prime}} w _ {k j} w _ {k ^ {\prime} j} \frac {\partial^ {2} E _ {n}}{\partial a _ {k} \partial a _ {k ^ {\prime}}} + h ^ {\prime \prime} (a _ {j}) \sum_ {k} w _ {k j} \frac {\partial E ^ {n}}{\partial a _ {k}}.\tag{5.80}
$$

If we now neglect off-diagonal elements in the second-derivative terms, we obtain (Becker and Le Cun, 1989; Le Cun et al., 1990) 

$$
\frac {\partial^ {2} E _ {n}}{\partial a _ {j} ^ {2}} = h ^ {\prime} (a _ {j}) ^ {2} \sum_ {k} w _ {k j} ^ {2} \frac {\partial^ {2} E _ {n}}{\partial a _ {k} ^ {2}} + h ^ {\prime \prime} (a _ {j}) \sum_ {k} w _ {k j} \frac {\partial E _ {n}}{\partial a _ {k}}.\tag{5.81}
$$

Note that the number of computational steps required to evaluate this approximation is $O ( W )$ , where W is the total number of weight and bias parameters in the network, compared with $O ( W ^ { 2 } )$ for the full Hessian. 

Ricotti et al. (1988) also used the diagonal approximation to the Hessian, but they retained all terms in the evaluation of $\breve { \partial } ^ { 2 } E _ { n } / \partial \bar { a } _ { j } ^ { 2 }$ and so obtained exact expressions for the diagonal terms. Note that this no longer has $O ( W )$ scaling. The major problem with diagonal approximations, however, is that in practice the Hessian is typically found to be strongly nondiagonal, and so these approximations, which are driven mainly be computational convenience, must be treated with care. 

## 5.4.2 Outer product approximation

When neural networks are applied to regression problems, it is common to use a sum-of-squares error function of the form 

$$
E = \frac {1}{2} \sum_ {n = 1} ^ {N} (y _ {n} - t _ {n}) ^ {2}\tag{5.82}
$$

where we have considered the case of a single output in order to keep the notation simple (the extension to several outputs is straightforward). We can then write the Hessian matrix in the form 

$$
\mathbf {H} = \nabla \nabla E = \sum_ {n = 1} ^ {N} \nabla y _ {n} \nabla y _ {n} + \sum_ {n = 1} ^ {N} (y _ {n} - t _ {n}) \nabla \nabla y _ {n}.\tag{5.83}
$$

If the network has been trained on the data set, and its outputs $y _ { n }$ happen to be very close to the target values $t _ { n } .$ , then the second term in (5.83) will be small and can be neglected. More generally, however, it may be appropriate to neglect this term by the following argument. Recall from Section 1.5.5 that the optimal function that minimizes a sum-of-squares loss is the conditional average of the target data. The quantity $\left( y _ { n } - t _ { n } \right)$ is then a random variable with zero mean. If we assume that its value is uncorrelated with the value of the second derivative term on the right-hand side of (5.83), then the whole term will average to zero in the summation over n. 

By neglecting the second term in (5.83), we arrive at the Levenberg–Marquardt approximation or outer product approximation (because the Hessian matrix is built up from a sum of outer products of vectors), given by 

$$
\mathbf {H} \simeq \sum_ {n = 1} ^ {N} \mathbf {b} _ {n} \mathbf {b} _ {n} ^ {\mathrm{T}}\tag{5.84}
$$

where $\mathbf { b } _ { n } = \nabla y _ { n } = \nabla a _ { n }$ because the activation function for the output units is simply the identity. Evaluation of the outer product approximation for the Hessian is straightforward as it only involves first derivatives of the error function, which can be evaluated efficiently in $O ( W )$ steps using standard backpropagation. The elements of the matrix can then be found in $O ( W ^ { 2 } )$ steps by simple multiplication. It is important to emphasize that this approximation is only likely to be valid for a network that has been trained appropriately, and that for a general network mapping the second derivative terms on the right-hand side of (5.83) will typically not be negligible. 

In the case of the cross-entropy error function for a network with logistic sigmoid output-unit activation functions, the corresponding approximation is given by 

$$
\mathbf {H} \simeq \sum_ {n = 1} ^ {N} y _ {n} (1 - y _ {n}) \mathbf {b} _ {n} \mathbf {b} _ {n} ^ {\mathrm{T}}.\tag{5.85}
$$

An analogous result can be obtained for multiclass networks having softmax outputunit activation functions. 

## 5.4.3 Inverse Hessian

We can use the outer-product approximation to develop a computationally efficient procedure for approximating the inverse of the Hessian (Hassibi and Stork, 1993). First we write the outer-product approximation in matrix notation as 

$$
\mathbf {H} _ {N} = \sum_ {n = 1} ^ {N} \mathbf {b} _ {n} \mathbf {b} _ {n} ^ {\mathrm{T}}\tag{5.86}
$$

where $\mathbf { b } _ { n } \equiv \nabla _ { \mathbf { w } } a _ { n }$ is the contribution to the gradient of the output unit activation arising from data point n. We now derive a sequential procedure for building up the Hessian by including data points one at a time. Suppose we have already obtained the inverse Hessian using the first $L$ data points. By separating off the contribution from data point $L + 1$ , we obtain 

$$
\mathbf {H} _ {L + 1} = \mathbf {H} _ {L} + \mathbf {b} _ {L + 1} \mathbf {b} _ {L + 1} ^ {\mathrm{T}}.\tag{5.87}
$$

In order to evaluate the inverse of the Hessian, we now consider the matrix identity 

$$
\left(\mathbf {M} + \mathbf {v v} ^ {\mathrm{T}}\right) ^ {- 1} = \mathbf {M} ^ {- 1} - \frac {\left(\mathbf {M} ^ {- 1} \mathbf {v}\right) \left(\mathbf {v} ^ {\mathrm{T}} \mathbf {M} ^ {- 1}\right)}{1 + \mathbf {v} ^ {\mathrm{T}} \mathbf {M} ^ {- 1} \mathbf {v}}\tag{5.88}
$$

where I is the unit matrix, which is simply a special case of the Woodbury identity (C.7). If we now identify $\mathbf { H } _ { L }$ with M and b $_ { L + 1 }$ with v, we obtain 

$$
\mathbf {H} _ {L + 1} ^ {- 1} = \mathbf {H} _ {L} ^ {- 1} - \frac {\mathbf {H} _ {L} ^ {- 1} \mathbf {b} _ {L + 1} \mathbf {b} _ {L + 1} ^ {\mathrm{T}} \mathbf {H} _ {L} ^ {- 1}}{1 + \mathbf {b} _ {L + 1} ^ {\mathrm{T}} \mathbf {H} _ {L} ^ {- 1} \mathbf {b} _ {L + 1}}.\tag{5.89}
$$

In this way, data points are sequentially absorbed until $L + 1 = N$ and the whole data set has been processed. This result therefore represents a procedure for evaluating the inverse of the Hessian using a single pass through the data set. The initial matrix $\mathbf { H } _ { 0 }$ is chosen to be αI, where α is a small quantity, so that the algorithm actually finds the inverse of $\mathbf H + \alpha \mathbf I$ . The results are not particularly sensitive to the precise value of α. Extension of this algorithm to networks having more than one output is straightforward. 

We note here that the Hessian matrix can sometimes be calculated indirectly as part of the network training algorithm. In particular, quasi-Newton nonlinear optimization algorithms gradually build up an approximation to the inverse of the Hessian during training. Such algorithms are discussed in detail in Bishop and Nabney (2008). 

## 5.4.4 Finite differences

As in the case of the first derivatives of the error function, we can find the second derivatives by using finite differences, with accuracy limited by numerical precision. If we perturb each possible pair of weights in turn, we obtain 

$$
\begin{array}{c} \frac {\partial^ {2} E}{\partial w _ {j i} \partial w _ {l k}} = \frac {1}{4 \epsilon^ {2}} \left\{E (w _ {j i} + \epsilon , w _ {l k} + \epsilon) - E (w _ {j i} + \epsilon , w _ {l k} - \epsilon) \right. \\ \left. - E (w _ {j i} - \epsilon , w _ {l k} + \epsilon) + E (w _ {j i} - \epsilon , w _ {l k} - \epsilon) \right\} + O (\epsilon^ {2}). \end{array}\tag{5.90}
$$

Again, by using a symmetrical central differences formulation, we ensure that the residual errors are ${ \mathcal O } ( \epsilon ^ { 2 } )$ rather than $O ( \epsilon )$ . Because there are $W ^ { 2 }$ elements in the Hessian matrix, and because the evaluation of each element requires four forward propagations each needing $O ( W )$ operations (per pattern), we see that this approach will require $O ( W ^ { 3 } )$ operations to evaluate the complete Hessian. It therefore has poor scaling properties, although in practice it is very useful as a check on the software implementation of backpropagation methods. 

A more efficient version of numerical differentiation can be found by applying central differences to the first derivatives of the error function, which are themselves calculated using backpropagation. This gives 

$$
\frac {\partial^ {2} E}{\partial w _ {j i} \partial w _ {l k}} = \frac {1}{2 \epsilon} \left\{\frac {\partial E}{\partial w _ {j i}} (w _ {l k} + \epsilon) - \frac {\partial E}{\partial w _ {j i}} (w _ {l k} - \epsilon) \right\} + O (\epsilon^ {2}).\tag{5.91}
$$

Because there are now only W weights to be perturbed, and because the gradients can be evaluated in $O ( W )$ steps, we see that this method gives the Hessian in $O ( W ^ { 2 } )$ operations. 

## 5.4.5 Exact evaluation of the Hessian

So far, we have considered various approximation schemes for evaluating the Hessian matrix or its inverse. The Hessian can also be evaluated exactly, for a network of arbitrary feed-forward topology, using extension of the technique of backpropagation used to evaluate first derivatives, which shares many of its desirable features including computational efficiency (Bishop, 1991; Bishop, 1992). It can be applied to any differentiable error function that can be expressed as a function of the network outputs and to networks having arbitrary differentiable activation functions. The number of computational steps needed to evaluate the Hessian scales like $O ( W ^ { 2 } )$ . Similar algorithms have also been considered by Buntine and Weigend (1993). 

Here we consider the specific case of a network having two layers of weights, for which the required equations are easily derived. We shall use indices i and $i ^ { \prime }$ to denote inputs, indices $j$ and $j ^ { \prime }$ to denoted hidden units, and indices k and $k ^ { \prime }$ to denote outputs. We first define 

$$
\delta_ {k} = \frac {\partial E _ {n}}{\partial a _ {k}}, \qquad M _ {k k ^ {\prime}} \equiv \frac {\partial^ {2} E _ {n}}{\partial a _ {k} \partial a _ {k ^ {\prime}}}\tag{5.92}
$$

where $E _ { n }$ is the contribution to the error from data point $n .$ . The Hessian matrix for this network can then be considered in three separate blocks as follows. 

1. Both weights in the second layer: 

$$
\frac {\partial^ {2} E _ {n}}{\partial w _ {k j} ^ {(2)} \partial w _ {k ^ {\prime} j ^ {\prime}} ^ {(2)}} = z _ {j} z _ {j ^ {\prime}} M _ {k k ^ {\prime}}.\tag{5.93}
$$

Exercise 5.23 

2. Both weights in the first layer: 

$$
\begin{array}{c} \frac {\partial^ {2} E _ {n}}{\partial w _ {j i} ^ {(1)} \partial w _ {j ^ {\prime} i ^ {\prime}} ^ {(1)}} = x _ {i} x _ {i ^ {\prime}} h ^ {\prime \prime} (a _ {j ^ {\prime}}) I _ {j j ^ {\prime}} \sum_ {k} w _ {k j ^ {\prime}} ^ {(2)} \delta_ {k} \\ + x _ {i} x _ {i ^ {\prime}} h ^ {\prime} (a _ {j ^ {\prime}}) h ^ {\prime} (a _ {j}) \sum_ {k} \sum_ {k ^ {\prime}} w _ {k ^ {\prime} j ^ {\prime}} ^ {(2)} w _ {k j} ^ {(2)} M _ {k k ^ {\prime}}. \end{array}\tag{5.94}
$$

3. One weight in each layer: 

$$
\frac {\partial^ {2} E _ {n}}{\partial w _ {j i} ^ {(1)} \partial w _ {k j ^ {\prime}} ^ {(2)}} = x _ {i} h ^ {\prime} (a _ {j ^ {\prime}}) \left\{\delta_ {k} I _ {j j ^ {\prime}} + z _ {j} \sum_ {k ^ {\prime}} w _ {k ^ {\prime} j ^ {\prime}} ^ {(2)} H _ {k k ^ {\prime}} \right\}.\tag{5.95}
$$

Here $I _ { j j ^ { \prime } }$ is the ${ \boldsymbol { j } } , { \boldsymbol { j } } ^ { \prime }$ element of the identity matrix. If one or both of the weights is a bias term, then the corresponding expressions are obtained simply by setting the appropriate activation(s) to 1. Inclusion of skip-layer connections is straightforward. 

## 5.4.6 Fast multiplication by the Hessian

For many applications of the Hessian, the quantity of interest is not the Hessian matrix H itself but the product of H with some vector v. We have seen that the evaluation of the Hessian takes $O ( W ^ { 2 } )$ operations, and it also requires storage that is $O ( W ^ { 2 } )$ . The vector $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ that we wish to calculate, however, has only W elements, so instead of computing the Hessian as an intermediate step, we can instead try to find an efficient approach to evaluating $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ directly in a way that requires only $O ( W )$ operations. 

To do this, we first note that 

$$
\mathbf {v} ^ {\mathrm{T}} \mathbf {H} = \mathbf {v} ^ {\mathrm{T}} \nabla (\nabla E)\tag{5.96}
$$

where denotes the gradient operator in weight space. We can then write down the standard forward-propagation and backpropagation equations for the evaluation of E and apply (5.96) to these equations to give a set of forward-propagation and backpropagation equations for the evaluation of $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ (Møller, 1993; Pearlmutter, 1994). This corresponds to acting on the original forward-propagation and backpropagation equations with a differential operator $\mathbf { v } ^ { \mathrm { T } } \nabla$ . Pearlmutter (1994) used the notation $\mathcal { R } \{ \cdot \}$ to denote the operator $\mathbf { v } ^ { \mathrm { T } } \nabla$ , and we shall follow this convention. The analysis is straightforward and makes use of the usual rules of differential calculus, together with the result 

$$
\mathcal {R} \{\mathbf {w} \} = \mathbf {v}.\tag{5.97}
$$

The technique is best illustrated with a simple example, and again we choose a two-layer network of the form shown in Figure 5.1, with linear output units and a sum-of-squares error function. As before, we consider the contribution to the error function from one pattern in the data set. The required vector is then obtained as usual by summing over the contributions from each of the patterns separately. For the two-layer network, the forward-propagation equations are given by 

$$
a _ {j} = \sum_ {i} w _ {j i} x _ {i}\tag{5.98}
$$

$$
z _ {j} = h (a _ {j})\tag{5.99}
$$

$$
y _ {k} = \sum_ {j} w _ {k j} z _ {j}.\tag{5.100}
$$

We now act on these equations using the $\mathcal { R } \{ \cdot \}$ operator to obtain a set of forward propagation equations in the form 

$$
\mathcal {R} \{a _ {j} \} = \sum_ {i} v _ {j i} x _ {i}\tag{5.101}
$$

$$
\mathcal {R} \{z _ {j} \} = h ^ {\prime} (a _ {j}) \mathcal {R} \{a _ {j} \}\tag{5.102}
$$

$$
\mathcal {R} \{y _ {k} \} = \sum_ {j} w _ {k j} \mathcal {R} \{z _ {j} \} + \sum_ {j} v _ {k j} z _ {j}\tag{5.103}
$$

where $v _ { j i }$ is the element of the vector v that corresponds to the weight $w _ { j i }$ . Quantities of the form ${ \mathcal { R } } \{ z _ { j } \} , { \mathcal { R } } \{ a _ { j } \}$ and $\mathcal { R } \{ y _ { k } \}$ are to be regarded as new variables whose values are found using the above equations. 

Because we are considering a sum-of-squares error function, we have the following standard backpropagation expressions: 

$$
{\delta_ {k}} = {y _ {k} - t _ {k}}\tag{5.104}
$$

$$
\delta_ {j} = h ^ {\prime} (a _ {j}) \sum_ {k} w _ {k j} \delta_ {k}.\tag{5.105}
$$

Again, we act on these equations with the $\mathcal { R } \{ \cdot \}$ operator to obtain a set of backpropagation equations in the form 

$$
\begin{array}{r c l} \mathcal {R} \{\delta_ {k} \} & = & \mathcal {R} \{y _ {k} \} \\ \mathcal {R} \{\delta_ {j} \} & = & h ^ {\prime \prime} (a _ {j}) \mathcal {R} \{a _ {j} \} \sum_ {k} w _ {k j} \delta_ {k} \\ & & + h ^ {\prime} (a _ {j}) \sum_ {k} v _ {k j} \delta_ {k} + h ^ {\prime} (a _ {j}) \sum_ {k} w _ {k j} \mathcal {R} \{\delta_ {k} \}. \end{array}\tag{5.106}
$$

(5.107) 

Finally, we have the usual equations for the first derivatives of the error 

$$
{\frac {\partial E}{\partial w _ {k j}}} = {\delta_ {k} z _ {j}}\tag{5.108}
$$

$$
{\frac {\partial E}{\partial w _ {j i}}} = {\delta_ {j} x _ {i}}\tag{5.109}
$$

and acting on these with the $\mathcal { R } \{ \cdot \}$ operator, we obtain expressions for the elements of the vector $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ 

$$
\mathcal {R} \left\{\frac {\partial E}{\partial w _ {k j}} \right\} = \mathcal {R} \{\delta_ {k} \} z _ {j} + \delta_ {k} \mathcal {R} \{z _ {j} \}\tag{5.110}
$$

$$
\mathcal {R} \left\{\frac {\partial E}{\partial w _ {j i}} \right\} = x _ {i} \mathcal {R} \{\delta_ {j} \}.\tag{5.111}
$$

The implementation of this algorithm involves the introduction of additional variables $\mathcal { R } \{ a _ { j } \} , \mathcal { R } \{ z _ { j } \}$ and ${ \mathcal { R } } \{ \delta _ { j } \}$ for the hidden units and $\mathcal { R } \{ \delta _ { k } \}$ and $\mathcal { R } \{ y _ { k } \}$ for the output units. For each input pattern, the values of these quantities can be found using the above results, and the elements of $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ are then given by (5.110) and (5.111). An elegant aspect of this technique is that the equations for evaluating $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ mirror closely those for standard forward and backward propagation, and so the extension of existing software to compute this product is typically straightforward. 

If desired, the technique can be used to evaluate the full Hessian matrix by choosing the vector v to be given successively by a series of unit vectors of the form $( 0 , 0 , \ldots , 1 , \ldots , 0 )$ each of which picks out one column of the Hessian. This leads to a formalism that is analytically equivalent to the backpropagation procedure of Bishop (1992), as described in Section 5.4.5, though with some loss of efficiency due to redundant calculations. 

## 5.5. Regularization in Neural Networks

The number of input and outputs units in a neural network is generally determined by the dimensionality of the data set, whereas the number M of hidden units is a free parameter that can be adjusted to give the best predictive performance. Note that M controls the number of parameters (weights and biases) in the network, and so we might expect that in a maximum likelihood setting there will be an optimum value of M that gives the best generalization performance, corresponding to the optimum balance between under-fitting and over-fitting. Figure 5.9 shows an example of the effect of different values of M for the sinusoidal regression problem. 

The generalization error, however, is not a simple function of M due to the presence of local minima in the error function, as illustrated in Figure 5.10. Here we see the effect of choosing multiple random initializations for the weight vector for a range of values of M. The overall best validation set performance in this case occurred for a particular solution having $M = 8$ . In practice, one approach to choosing M is in fact to plot a graph of the kind shown in Figure 5.10 and then to choose the specific solution having the smallest validation set error. 

There are, however, other ways to control the complexity of a neural network model in order to avoid over-fitting. From our discussion of polynomial curve fitting in Chapter 1, we see that an alternative approach is to choose a relatively large value for M and then to control complexity by the addition of a regularization term to the error function. The simplest regularizer is the quadratic, giving a regularized error 


Figure 5.10


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/f5cd8d8046c4a2352a4f43101de2f7af757b3cce0197171c45f4bd1b094370b4.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a4234e1b0e4403e7a710cf7beaf272fcb7aefcfb3be6a94d202133f23559d142.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/eed2e5130ed918eb5b6cd4bd1875f96f16bda384a2790488ba4363c3ec70a674.jpg)



Figure 5.9 Examples of two-layer networks trained on 10 data points drawn from the sinusoidal data set. The graphs show the result of fitting networks having $M = 1$ , 3 and 10 hidden units, respectively, by minimizing a sum-of-squares error function using a scaled conjugate-gradient algorithm.


of the form 

$$
\widetilde {E} (\mathbf {w}) = E (\mathbf {w}) + \frac {\lambda}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}.\tag{5.112}
$$

This regularizer is also known as weight decay and has been discussed at length in Chapter 3. The effective model complexity is then determined by the choice of the regularization coefficient λ. As we have seen previously, this regularizer can be interpreted as the negative logarithm of a zero-mean Gaussian prior distribution over the weight vector w. 

## 5.5.1 Consistent Gaussian priors

One of the limitations of simple weight decay in the form (5.112) is that is inconsistent with certain scaling properties of network mappings. To illustrate this, consider a multilayer perceptron network having two layers of weights and linear output units, which performs a mapping from a set of input variables $\{ x _ { i } \}$ to a set of output variables $\left\{ y _ { k } \right\}$ . The activations of the hidden units in the first hidden layer 

Plot of the sum-of-squares test-set error for the polynomial data set versus the number of hidden units in the network, with 30 random starts for each network size, showing the effect of local minima. For each new start, the weight vector was initialized by sampling from an isotropic Gaussian distribution having a mean of zero and a variance of 10. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/8292670adee4bb3b49945f93749491f88ab20742753ddedac4b9fbd25cfffe71.jpg)


take the form 

$$
z _ {j} = h \left(\sum_ {i} w _ {j i} x _ {i} + w _ {j 0}\right)\tag{5.113}
$$

while the activations of the output units are given by 

$$
y _ {k} = \sum_ {j} w _ {k j} z _ {j} + w _ {k 0}.\tag{5.114}
$$

Suppose we perform a linear transformation of the input data of the form 

$$
x _ {i} \rightarrow \widetilde {x} _ {i} = a x _ {i} + b.\tag{5.115}
$$

Then we can arrange for the mapping performed by the network to be unchanged by making a corresponding linear transformation of the weights and biases from the inputs to the units in the hidden layer of the form 

Exercise 5.24 

$$
w _ {j i} \rightarrow \widetilde {w} _ {j i} = \frac {1}{a} w _ {j i}\tag{5.116}
$$

$$
w _ {j 0} \rightarrow \widetilde {w} _ {j 0} = w _ {j 0} - \frac {b}{a} \sum_ {i} w _ {j i}.\tag{5.117}
$$

Similarly, a linear transformation of the output variables of the network of the form 

$$
y _ {k} \rightarrow \widetilde {y} _ {k} = c y _ {k} + d\tag{5.118}
$$

can be achieved by making a transformation of the second-layer weights and biases using 

$$
w _ {k j} \rightarrow \widetilde {w} _ {k j} = c w _ {k j}\tag{5.119}
$$

$$
w _ {k 0} \rightarrow \widetilde {w} _ {k 0} = c w _ {k 0} + d.\tag{5.120}
$$

If we train one network using the original data and one network using data for which the input and/or target variables are transformed by one of the above linear transformations, then consistency requires that we should obtain equivalent networks that differ only by the linear transformation of the weights as given. Any regularizer should be consistent with this property, otherwise it arbitrarily favours one solution over another, equivalent one. Clearly, simple weight decay (5.112), that treats all weights and biases on an equal footing, does not satisfy this property. 

We therefore look for a regularizer which is invariant under the linear transformations (5.116), (5.117), (5.119) and (5.120). These require that the regularizer should be invariant to re-scaling of the weights and to shifts of the biases. Such a regularizer is given by 

$$
\frac {\lambda_ {1}}{2} \sum_ {w \in \mathcal {W} _ {1}} w ^ {2} + \frac {\lambda_ {2}}{2} \sum_ {w \in \mathcal {W} _ {2}} w ^ {2}\tag{5.121}
$$

where $\mathcal { W } _ { 1 }$ denotes the set of weights in the first layer, $\mathcal { W } _ { 2 }$ denotes the set of weights in the second layer, and biases are excluded from the summations. This regularizer will remain unchanged under the weight transformations provided the regularization parameters are re-scaled using $\lambda _ { 1 } \stackrel {  } {  } \stackrel {  } { a } ^ { 1 / 2 } \lambda _ { 1 }$ and $\lambda _ { 2 }  c ^ { \hat { - } 1 / 2 } \lambda _ { 2 }$ 

The regularizer (5.121) corresponds to a prior of the form 

$$
p (\mathbf {w} | \alpha_ {1}, \alpha_ {2}) \propto \exp \left(- \frac {\alpha_ {1}}{2} \sum_ {w \in \mathcal {W} _ {1}} w ^ {2} - \frac {\alpha_ {2}}{2} \sum_ {w \in \mathcal {W} _ {2}} w ^ {2}\right).\tag{5.122}
$$

Note that priors of this form are improper (they cannot be normalized) because the bias parameters are unconstrained. The use of improper priors can lead to difficulties in selecting regularization coefficients and in model comparison within the Bayesian framework, because the corresponding evidence is zero. It is therefore common to include separate priors for the biases (which then break shift invariance) having their own hyperparameters. We can illustrate the effect of the resulting four hyperparameters by drawing samples from the prior and plotting the corresponding network functions, as shown in Figure 5.11. 

More generally, we can consider priors in which the weights are divided into any number of groups $\mathcal { W } _ { k }$ so that 

$$
p (\mathbf {w}) \propto \exp \left(- \frac {1}{2} \sum_ {k} \alpha_ {k} \| \mathbf {w} \| _ {k} ^ {2}\right)\tag{5.123}
$$

where 

$$
\| \mathbf {w} \| _ {k} ^ {2} = \sum_ {j \in \mathcal {W} _ {k}} w _ {j} ^ {2}.\tag{5.124}
$$

As a special case of this prior, if we choose the groups to correspond to the sets of weights associated with each of the input units, and we optimize the marginal likelihood with respect to the corresponding parameters $\alpha _ { k }$ , we obtain automatic relevance determination as discussed in Section 7.2.2. 

## 5.5.2 Early stopping

An alternative to regularization as a way of controlling the effective complexity of a network is the procedure of early stopping. The training of nonlinear network models corresponds to an iterative reduction of the error function defined with respect to a set of training data. For many of the optimization algorithms used for network training, such as conjugate gradients, the error is a nonincreasing function of the iteration index. However, the error measured with respect to independent data, generally called a validation set, often shows a decrease at first, followed by an increase as the network starts to over-fit. Training can therefore be stopped at the point of smallest error with respect to the validation data set, as indicated in Figure 5.12, in order to obtain a network having good generalization performance. 

The behaviour of the network in this case is sometimes explained qualitatively in terms of the effective number of degrees of freedom in the network, in which this number starts out small and then to grows during the training process, corresponding to a steady increase in the effective complexity of the model. Halting training before a minimum of the training error has been reached then represents a way of limiting the effective network complexity. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/d08c077462d6678b15d1bd500d6dac39f7b1e60e596cda0b7f121c22edf94757.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/4771aff82e6dafcffed773ba26fdc44ddea522d9dbc910fbbc5492ff12ad8005.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/cf812c483c8de4767f5187788f40974d3e2aa3cf00ba974e609867b1cbf71cbf.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/851acbbb9aeb17a20295cf9a90713550008b91e0a3c69355eecbb68ac1ab20ad.jpg)



Figure 5.11 Illustration of the effect of the hyperparameters governing the prior distribution over weights and biases in a two-layer network having a single input, a single linear output, and 12 hidden units having ‘tanh’ activation functions. The priors are governed by four hyperparameters $\alpha _ { 1 } ^ { \mathrm { b } } , \alpha _ { 1 } ^ { \mathrm { w } } , \alpha _ { 2 } ^ { \mathrm { b } }$ , and $\alpha _ { 2 } ^ { \mathrm { w } }$ , which represent the precisions of the Gaussian distributions of the first-layer biases, first-layer weights, second-layer biases, and second-layer weights, respectively. We see that the parameter $\alpha _ { 2 } ^ { \mathrm { w } }$ governs the vertical scale of functions (note the different vertical axis ranges on the top two diagrams), $\alpha _ { 1 } ^ { \mathrm { w } }$ governs the horizontal scale of variations in the function values, and $\alpha _ { 1 } ^ { \mathrm { b } }$ governs the horizontal range over which variations occur. The parameter $\alpha _ { 2 } ^ { \mathrm { b } }$ , whose effect is not illustrated here, governs the range of vertical offsets of the functions.


In the case of a quadratic error function, we can verify this insight, and show that early stopping should exhibit similar behaviour to regularization using a simple weight-decay term. This can be understood from Figure 5.13, in which the axes in weight space have been rotated to be parallel to the eigenvectors of the Hessian matrix. If, in the absence of weight decay, the weight vector starts at the origin and proceeds during training along a path that follows the local negative gradient vector, then the weight vector will move initially parallel to the $w _ { 2 }$ axis through a point corresponding roughly to $\widetilde { \mathbf { w } }$ and then move towards the minimum of the error function $\mathbf { w } _ { \mathrm { M L } }$ . This follows from the shape of the error surface and the widely differing eigenvalues of the Hessian. Stopping at a point near $\widetilde { \mathbf { w } }$ is therefore similar to weight decay. The relationship between early stopping and weight decay can be made quantitative, thereby showing that the quantity $\tau \eta$ (where τ is the iteration index, and η is the learning rate parameter) plays the role of the reciprocal of the regularization parameter λ. The effective number of parameters in the network therefore grows during the course of training. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/40eaf11e3886260ee12bb234aab4b133e73d6ee2179d7bc24f9e85727a8878ad.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/14ce494ad817dbf9312bb80f81b4a27319f3ae8d09e42fcf80e0109af55ec37a.jpg)



Figure 5.12 An illustration of the behaviour of training set error (left) and validation set error (right) during a typical training session, as a function of the iteration step, for the sinusoidal data set. The goal of achieving the best generalization performance suggests that training should be stopped at the point shown by the vertical dashed lines, corresponding to the minimum of the validation set error.


## 5.5.3 Invariances

In many applications of pattern recognition, it is known that predictions should be unchanged, or invariant, under one or more transformations of the input variables. For example, in the classification of objects in two-dimensional images, such as handwritten digits, a particular object should be assigned the same classification irrespective of its position within the image (translation invariance) or of its size (scale invariance). Such transformations produce significant changes in the raw data, expressed in terms of the intensities at each of the pixels in the image, and yet should give rise to the same output from the classification system. Similarly in speech recognition, small levels of nonlinear warping along the time axis, which preserve temporal ordering, should not change the interpretation of the signal. 

If sufficiently large numbers of training patterns are available, then an adaptive model such as a neural network can learn the invariance, at least approximately. This involves including within the training set a sufficiently large number of examples of the effects of the various transformations. Thus, for translation invariance in an image, the training set should include examples of objects at many different positions. 

This approach may be impractical, however, if the number of training examples is limited, or if there are several invariants (because the number of combinations of transformations grows exponentially with the number of such transformations). We therefore seek alternative approaches for encouraging an adaptive model to exhibit the required invariances. These can broadly be divided into four categories: 

1. The training set is augmented using replicas of the training patterns, transformed according to the desired invariances. For instance, in our digit recognition example, we could make multiple copies of each example in which the 

Figure 5.13 A schematic illustration of why early stopping can give similar results to weight decay in the case of a quadratic error function. The ellipse shows a contour of constant error, and wML denotes the minimum of the error function. If the weight vector starts at the origin and moves according to the local negative gradient direction, then it will follow the path shown by the curve. By stopping training early, a weight vector w is found that is qualitatively similar to that obtained with a simple weight-decay regularizer and training to the minimum of the regularized error, as can be seen by comparing with Figure 3.15. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/985cb72c1845e679c3f5959d528cd0e7f9e36b33eefc9803cdd484aec0422b82.jpg)


digit is shifted to a different position in each image. 

2. A regularization term is added to the error function that penalizes changes in the model output when the input is transformed. This leads to the technique of tangent propagation, discussed in Section 5.5.4. 

3. Invariance is built into the pre-processing by extracting features that are invariant under the required transformations. Any subsequent regression or classification system that uses such features as inputs will necessarily also respect these invariances. 

4. The final option is to build the invariance properties into the structure of a neural network (or into the definition of a kernel function in the case of techniques such as the relevance vector machine). One way to achieve this is through the use of local receptive fields and shared weights, as discussed in the context of convolutional neural networks in Section 5.5.6. 

Approach 1 is often relatively easy to implement and can be used to encourage complex invariances such as those illustrated in Figure 5.14. For sequential training algorithms, this can be done by transforming each input pattern before it is presented to the model so that, if the patterns are being recycled, a different transformation (drawn from an appropriate distribution) is added each time. For batch methods, a similar effect can be achieved by replicating each data point a number of times and transforming each copy independently. The use of such augmented data can lead to significant improvements in generalization (Simard et al., 2003), although it can also be computationally costly. 

Approach 2 leaves the data set unchanged but modifies the error function through the addition of a regularizer. In Section 5.5.5, we shall show that this approach is closely related to approach 2. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/edd48be75e295f54c7e355ccd488386629462a1306296d3337ef57a7e57a7ff5.jpg)



Figure 5.14 Illustration of the synthetic warping of a handwritten digit. The original image is shown on the left. On the right, the top row shows three examples of warped digits, with the corresponding displacement fields shown on the bottom row. These displacement fields are generated by sampling random displacements $\Delta x , \Delta y \in ( 0 , 1 )$ at each pixel and then smoothing by convolution with Gaussians of width 0.01, 30 and 60 respectively.


One advantage of approach 3 is that it can correctly extrapolate well beyond the range of transformations included in the training set. However, it can be difficult to find hand-crafted features with the required invariances that do not also discard information that can be useful for discrimination. 

## 5.5.4 Tangent propagation

We can use regularization to encourage models to be invariant to transformations of the input through the technique of tangent propagation (Simard et al., 1992). Consider the effect of a transformation on a particular input vector ${ \bf x } _ { n }$ . Provided the transformation is continuous (such as translation or rotation, but not mirror reflection for instance), then the transformed pattern will sweep out a manifold within the D-dimensional input space. This is illustrated in Figure 5.15, for the case of $D =$ 2 for simplicity. Suppose the transformation is governed by a single parameter ξ (which might be rotation angle for instance). Then the subspace swept out by ${ \bf x } _ { n }$ 

Illustration of a two-dimensional input space showing the effect of a continuous transformation on a particular input vector ${ \bf x } _ { n }$ . A onedimensional transformation, parameterized by the continuous variable ξ, applied to ${ \bf x } _ { n }$ causes it to sweep out a one-dimensional manifold . Locally, the effect of the transformation can be approximated by the tangent vector $\tau _ { n }$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a7f9ded40dc6f682aa1dfe1d28ce963d17056a7177a8980820a8b54cd3dbf902.jpg)


will be one-dimensional, and will be parameterized by $\xi .$ . Let the vector that results from acting on ${ \bf x } _ { n }$ by this transformation be denoted by $\mathbf { s } ( \mathbf { x } _ { n } , \xi )$ , which is defined so that $\mathbf { s } ( \mathbf { x } , 0 ) = \mathbf { x }$ . Then the tangent to the curve $\mathcal { M }$ is given by the directional derivative ${ \boldsymbol { \tau } } = \partial \mathbf { s } / \partial \xi$ , and the tangent vector at the point ${ \bf x } _ { n }$ is given by 

$$
\pmb {\tau} _ {n} = \left. \frac {\partial \mathbf {s} (\mathbf {x} _ {n} , \xi)}{\partial \xi} \right| _ {\xi = 0}.\tag{5.125}
$$

Under a transformation of the input vector, the network output vector will, in general, change. The derivative of output k with respect to $\xi$ is given by 

$$
\left. \frac {\partial y _ {k}}{\partial \xi} \right| _ {\xi = 0} = \sum_ {i = 1} ^ {D} \frac {\partial y _ {k}}{\partial x _ {i}} \frac {\partial x _ {i}}{\partial \xi} \Bigg | _ {\xi = 0} = \sum_ {i = 1} ^ {D} J _ {k i} \tau_ {i}\tag{5.126}
$$

where $J _ { k i }$ is the $( k , i )$ element of the Jacobian matrix J, as discussed in Section 5.3.4. The result (5.126) can be used to modify the standard error function, so as to encourage local invariance in the neighbourhood of the data points, by the addition to the original error function $E$ of a regularization function $\Omega$ to give a total error function of the form 

$$
\widetilde {E} = E + \lambda \Omega\tag{5.127}
$$

where $\lambda$ is a regularization coefficient and 

$$
\Omega = \frac {1}{2} \sum_ {n} \sum_ {k} \left(\left. \frac {\partial y _ {n k}}{\partial \xi} \right| _ {\xi = 0}\right) ^ {2} = \frac {1}{2} \sum_ {n} \sum_ {k} \left(\sum_ {i = 1} ^ {D} J _ {n k i} \tau_ {n i}\right) ^ {2}.\tag{5.128}
$$

The regularization function will be zero when the network mapping function is invariant under the transformation in the neighbourhood of each pattern vector, and the value of the parameter λ determines the balance between fitting the training data and learning the invariance property. 

In a practical implementation, the tangent vector $\tau _ { n }$ can be approximated using finite differences, by subtracting the original vector ${ \bf x } _ { n }$ from the corresponding vector after transformation using a small value of $\xi ,$ and then dividing by $\xi .$ . This is illustrated in Figure 5.16. 

The regularization function depends on the network weights through the Jacobian J. A backpropagation formalism for computing the derivatives of the regularizer with respect to the network weights is easily obtained by extension of the techniques introduced in Section 5.3. 

If the transformation is governed by $L$ parameters (e.g., $L = 3$ for the case of translations combined with in-plane rotations in a two-dimensional image), then the manifold  will have dimensionality L, and the corresponding regularizer is given by the sum of terms of the form (5.128), one for each transformation. If several transformations are considered at the same time, and the network mapping is made invariant to each separately, then it will be (locally) invariant to combinations of the transformations (Simard et al., 1992). 


Figure 5.16 Illustration showing (a) the original image x of a handwritten digit, (b) the tangent vector $\tau$ corresponding to an infinitesimal clockwise rotation, (c) the result of adding a small contribution from the tangent vector to the original image giving ${ \bf x } + \epsilon \tau$ with $\epsilon = 1 5$ degrees, and (d) the true image rotated for comparison.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/1e03f98f5954084e1f0438dd7da27f11cc0c6d76f5e790f802f758eac07e3e8e.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/e77537d09f1b3d94e3c3cd9474f4c381431698544728bcca5172226fcd0a3e09.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/6c3708e23af6d5e306447fcc6007c7f9efd8f67c482d33adf5585d904e6d2887.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/87b2632a842167d917f0fb47fe4d4bb4fb8c1bba9a9762f0fbbfbf7270a1d29b.jpg)


A related technique, called tangent distance, can be used to build invariance properties into distance-based methods such as nearest-neighbour classifiers (Simard et al., 1993). 

## 5.5.5 Training with transformed data

We have seen that one way to encourage invariance of a model to a set of transformations is to expand the training set using transformed versions of the original input patterns. Here we show that this approach is closely related to the technique of tangent propagation (Bishop, 1995b; Leen, 1995). 

As in Section 5.5.4, we shall consider a transformation governed by a single parameter $\xi$ and described by the function $\mathbf { s } ( \mathbf { x } , \boldsymbol { \xi } )$ , with $\mathbf { s } ( \mathbf { x } , 0 ) = \mathbf { x }$ . We shall also consider a sum-of-squares error function. The error function for untransformed inputs can be written (in the infinite data set limit) in the form 

$$
E = \frac {1}{2} \iint \{y (\mathbf {x}) - t \} ^ {2} p (t | \mathbf {x}) p (\mathbf {x}) \mathrm{d} \mathbf {x} \mathrm{d} t\tag{5.129}
$$

as discussed in Section 1.5.5. Here we have considered a network having a single output, in order to keep the notation uncluttered. If we now consider an infinite number of copies of each data point, each of which is perturbed by the transformation in which the parameter $\xi$ is drawn from a distribution $p ( \xi )$ , then the error function defined over this expanded data set can be written as 

$$
\widetilde {E} = \frac {1}{2} \iiint \left\{y (\mathbf {s} (\mathbf {x}, \xi)) - t \right\} ^ {2} p (t | \mathbf {x}) p (\mathbf {x}) p (\xi) \mathrm{d} \mathbf {x} \mathrm{d} t \mathrm{d} \xi .\tag{5.130}
$$

We now assume that the distribution $p ( \xi )$ has zero mean with small variance, so that we are only considering small transformations of the original input vectors. We can then expand the transformation function as a Taylor series in powers of $\xi$ to give 

$$
\begin{array}{r c l} \mathbf {s} (\mathbf {x}, \xi) & = & \mathbf {s} (\mathbf {x}, 0) + \xi \left. \frac {\partial}{\partial \xi} \mathbf {s} (\mathbf {x}, \xi) \right| _ {\xi = 0} + \frac {\xi^ {2}}{2} \left. \frac {\partial^ {2}}{\partial \xi^ {2}} \mathbf {s} (\mathbf {x}, \xi) \right| _ {\xi = 0} + O (\xi^ {3}) \\ & = & \mathbf {x} + \xi \boldsymbol {\tau} + \frac {1}{2} \xi^ {2} \boldsymbol {\tau} ^ {\prime} + O (\xi^ {3}) \end{array}
$$

where $\tau ^ { \prime }$ denotes the second derivative of ${ \bf s } ( { \bf x } , \xi )$ with respect to $\xi$ evaluated at $\xi = 0$ This allows us to expand the model function to give 

$$
y (\mathbf {s} (\mathbf {x}, \xi)) = y (\mathbf {x}) + \xi \pmb {\tau} ^ {\mathrm{T}} \nabla y (\mathbf {x}) + \frac {\xi^ {2}}{2} \left[ (\pmb {\tau} ^ {\prime}) ^ {\mathrm{T}} \nabla y (\mathbf {x}) + \pmb {\tau} ^ {\mathrm{T}} \nabla \nabla y (\mathbf {x}) \pmb {\tau} \right] + O (\xi^ {3}).
$$

Substituting into the mean error function (5.130) and expanding, we then have 

$$
\begin{array}{r c l} \widetilde {E} & = & \frac {1}{2} \iint \{y (\mathbf {x}) - t \} ^ {2} p (t | \mathbf {x}) p (\mathbf {x})   \mathrm{d} \mathbf {x}   \mathrm{d} t \\ & + & \mathbb {E} [ \xi ] \iint \{y (\mathbf {x}) - t \} \boldsymbol {\tau} ^ {\mathrm{T}} \nabla y (\mathbf {x}) p (t | \mathbf {x}) p (\mathbf {x})   \mathrm{d} \mathbf {x}   \mathrm{d} t \\ & + & \mathbb {E} [ \xi^ {2} ] \iint \left[ \{y (\mathbf {x}) - t \} \frac {1}{2} \left\{(\boldsymbol {\tau} ^ {\prime}) ^ {\mathrm{T}} \nabla y (\mathbf {x}) + \boldsymbol {\tau} ^ {\mathrm{T}} \nabla \nabla y (\mathbf {x}) \boldsymbol {\tau} \right\} \right. \\ & & \left. + \left(\boldsymbol {\tau} ^ {\mathrm{T}} \nabla y (\mathbf {x})\right) ^ {2} \right] p (t | \mathbf {x}) p (\mathbf {x})   \mathrm{d} \mathbf {x}   \mathrm{d} t + O (\xi^ {3}). \end{array}
$$

Because the distribution of transformations has zero mean we have $\mathbb { E } [ \xi ] = 0$ . Also, we shall denote $\mathbb { E } [ \xi ^ { 2 } ]$ by $\lambda .$ Omitting terms of $O ( \xi ^ { 3 } )$ , the average error function then becomes 

$$
\widetilde {E} = E + \lambda \Omega\tag{5.131}
$$

where $E$ is the original sum-of-squares error, and the regularization term $\Omega$ takes the form 

$$
\begin{array}{r c l} \Omega & = & \int \left[ \left\{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] \right\} \frac {1}{2} \left\{(\boldsymbol {\tau} ^ {\prime}) ^ {\mathrm{T}} \nabla y (\mathbf {x}) + \boldsymbol {\tau} ^ {\mathrm{T}} \nabla \nabla y (\mathbf {x}) \boldsymbol {\tau} \right\} \right. \\ & & \left. + \left(\boldsymbol {\tau} ^ {T} \nabla y (\mathbf {x})\right) ^ {2} \right] p (\mathbf {x})   \mathrm{d} \mathbf {x} \end{array}\tag{5.132}
$$

in which we have performed the integration over $t .$ 

We can further simplify this regularization term as follows. In Section 1.5.5 we saw that the function that minimizes the sum-of-squares error is given by the conditional average $\mathbb { E } [ t | { \bf x } ]$ of the target values t. From (5.131) we see that the regularized error will equal the unregularized sum-of-squares plus terms which are $O ( \xi )$ , and so the network function that minimizes the total error will have the form 

$$
y (\mathbf {x}) = \mathbb {E} [ t | \mathbf {x} ] + O (\xi).\tag{5.133}
$$

Thus, to leading order in $\xi ,$ , the first term in the regularizer vanishes and we are left with 

$$
\Omega = \frac {1}{2} \int \left(\pmb {\tau} ^ {T} \nabla y (\mathbf {x})\right) ^ {2} p (\mathbf {x}) \mathrm{d} \mathbf {x}\tag{5.134}
$$

which is equivalent to the tangent propagation regularizer (5.128). 

If we consider the special case in which the transformation of the inputs simply consists of the addition of random noise, so that $\textbf { x } \longrightarrow \textbf { x } + \pmb { \xi }$ , then the regularizer takes the form 

$$
\Omega = \frac {1}{2} \int \| \nabla y (\mathbf {x}) \| ^ {2} p (\mathbf {x}) \mathrm{d} \mathbf {x}\tag{5.135}
$$

which is known as Tikhonov regularization (Tikhonov and Arsenin, 1977; Bishop, 1995b). Derivatives of this regularizer with respect to the network weights can be found using an extended backpropagation algorithm (Bishop, 1993). We see that, for small noise amplitudes, Tikhonov regularization is related to the addition of random noise to the inputs, which has been shown to improve generalization in appropriate circumstances (Sietsma and Dow, 1991). 

## 5.5.6 Convolutional networks

Another approach to creating models that are invariant to certain transformation of the inputs is to build the invariance properties into the structure of a neural network. This is the basis for the convolutional neural network (Le Cun et al., 1989; LeCun et al., 1998), which has been widely applied to image data. 

Consider the specific task of recognizing handwritten digits. Each input image comprises a set of pixel intensity values, and the desired output is a posterior probability distribution over the ten digit classes. We know that the identity of the digit is invariant under translations and scaling as well as (small) rotations. Furthermore, the network must also exhibit invariance to more subtle transformations such as elastic deformations of the kind illustrated in Figure 5.14. One simple approach would be to treat the image as the input to a fully connected network, such as the kind shown in Figure 5.1. Given a sufficiently large training set, such a network could in principle yield a good solution to this problem and would learn the appropriate invariances by example. 

However, this approach ignores a key property of images, which is that nearby pixels are more strongly correlated than more distant pixels. Many of the modern approaches to computer vision exploit this property by extracting local features that depend only on small subregions of the image. Information from such features can then be merged in later stages of processing in order to detect higher-order features and ultimately to yield information about the image as whole. Also, local features that are useful in one region of the image are likely to be useful in other regions of the image, for instance if the object of interest is translated. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/1c4135db140166d6ad2887c6367a2398b945e87efbe8b104afaf5a5602e5da56.jpg)



Figure 5.17 Diagram illustrating part of a convolutional neural network, showing a layer of convolutional units followed by a layer of subsampling units. Several successive pairs of such layers may be used.


These notions are incorporated into convolutional neural networks through three mechanisms: (i) local receptive fields, (ii) weight sharing, and (iii) subsampling. The structure of a convolutional network is illustrated in Figure 5.17. In the convolutional layer the units are organized into planes, each of which is called afeature map. Units in a feature map each take inputs only from a small subregion of the image, and all of the units in a feature map are constrained to share the same weight values. For instance, a feature map might consist of 100 units arranged in a $1 0 \times 1 0 ~ \mathrm { g r i d }$ , with each unit taking inputs from a $5 \times 5$ pixel patch of the image. The whole feature map therefore has 25 adjustable weight parameters plus one adjustable bias parameter. Input values from a patch are linearly combined using the weights and the bias, and the result transformed by a sigmoidal nonlinearity using (5.1). If we think of the units as feature detectors, then all of the units in a feature map detect the same pattern but at different locations in the input image. Due to the weight sharing, the evaluation of the activations of these units is equivalent to a convolution of the image pixel intensities with a ‘kernel’ comprising the weight parameters. If the input image is shifted, the activations of the feature map will be shifted by the same amount but will otherwise be unchanged. This provides the basis for the (approximate) invariance of the network outputs to translations and distortions of the input image. Because we will typically need to detect multiple features in order to build an effective model, there will generally be multiple feature maps in the convolutional layer, each having its own set of weight and bias parameters. 

The outputs of the convolutional units form the inputs to the subsampling layer of the network. For each feature map in the convolutional layer, there is a plane of units in the subsampling layer and each unit takes inputs from a small receptive field in the corresponding feature map of the convolutional layer. These units perform subsampling. For instance, each subsampling unit might take inputs from a $2 \times 2$ unit region in the corresponding feature map and would compute the average of those inputs, multiplied by an adaptive weight with the addition of an adaptive bias parameter, and then transformed using a sigmoidal nonlinear activation function. The receptive fields are chosen to be contiguous and nonoverlapping so that there are half the number of rows and columns in the subsampling layer compared with the convolutional layer. In this way, the response of a unit in the subsampling layer will be relatively insensitive to small shifts of the image in the corresponding regions of the input space. 

In a practical architecture, there may be several pairs of convolutional and subsampling layers. At each stage there is a larger degree of invariance to input transformations compared to the previous layer. There may be several feature maps in a given convolutional layer for each plane of units in the previous subsampling layer, so that the gradual reduction in spatial resolution is then compensated by an increasing number of features. The final layer of the network would typically be a fully connected, fully adaptive layer, with a softmax output nonlinearity in the case of multiclass classification. 

The whole network can be trained by error minimization using backpropagation to evaluate the gradient of the error function. This involves a slight modification of the usual backpropagation algorithm to ensure that the shared-weight constraints are satisfied. Due to the use of local receptive fields, the number of weights in the network is smaller than if the network were fully connected. Furthermore, the number of independent parameters to be learned from the data is much smaller still, due to the substantial numbers of constraints on the weights. 

## 5.5.7 Soft weight sharing

One way to reduce the effective complexity of a network with a large number of weights is to constrain weights within certain groups to be equal. This is the technique of weight sharing that was discussed in Section 5.5.6 as a way of building translation invariance into networks used for image interpretation. It is only applicable, however, to particular problems in which the form of the constraints can be specified in advance. Here we consider a form of soft weight sharing (Nowlan and Hinton, 1992) in which the hard constraint of equal weights is replaced by a form of regularization in which groups of weights are encouraged to have similar values. Furthermore, the division of weights into groups, the mean weight value for each group, and the spread of values within the groups are all determined as part of the learning process. 

Recall that the simple weight decay regularizer, given in (5.112), can be viewed as the negative log of a Gaussian prior distribution over the weights. We can encourage the weight values to form several groups, rather than just one group, by considering instead a probability distribution that is a mixture of Gaussians. The centres and variances of the Gaussian components, as well as the mixing coefficients, will be considered as adjustable parameters to be determined as part of the learning process. Thus, we have a probability density of the form 

$$
p (\mathbf {w}) = \prod_ {i} p (w _ {i})\tag{5.136}
$$

where 

$$
p (w _ {i}) = \sum_ {j = 1} ^ {M} \pi_ {j} \mathcal {N} (w _ {i} | \mu_ {j}, \sigma_ {j} ^ {2})\tag{5.137}
$$

and $\pi _ { j }$ are the mixing coefficients. Taking the negative logarithm then leads to a regularization function of the form 

$$
\Omega (\mathbf {w}) = - \sum_ {i} \ln \left(\sum_ {j = 1} ^ {M} \pi_ {j} \mathcal {N} (w _ {i} | \mu_ {j}, \sigma_ {j} ^ {2})\right).\tag{5.138}
$$

The total error function is then given by 

$$
\widetilde {E} (\mathbf {w}) = E (\mathbf {w}) + \lambda \Omega (\mathbf {w})\tag{5.139}
$$

where λ is the regularization coefficient. This error is minimized both with respect to the weights $w _ { i }$ and with respect to the parameters $\{ \pi _ { j } , \mu _ { j } , \sigma _ { j } \}$ of the mixture model. If the weights were constant, then the parameters of the mixture model could be determined by using the EM algorithm discussed in Chapter 9. However, the distribution of weights is itself evolving during the learning process, and so to avoid numerical instability, a joint optimization is performed simultaneously over the weights and the mixture-model parameters. This can be done using a standard optimization algorithm such as conjugate gradients or quasi-Newton methods. 

In order to minimize the total error function, it is necessary to be able to evaluate its derivatives with respect to the various adjustable parameters. To do this it is convenient to regard the $\{ \pi _ { j } \}$ as prior probabilities and to introduce the corresponding posterior probabilities which, following (2.192), are given by Bayes’ theorem in the form 

$$
\gamma_ {j} (w) = \frac {\pi_ {j} \mathcal {N} (w | \mu_ {j} , \sigma_ {j} ^ {2})}{\sum_ {k} \pi_ {k} \mathcal {N} (w | \mu_ {k} , \sigma_ {k} ^ {2})}.\tag{5.140}
$$

The derivatives of the total error function with respect to the weights are then given by 

$$
\frac {\partial \widetilde {E}}{\partial w _ {i}} = \frac {\partial E}{\partial w _ {i}} + \lambda \sum_ {j} \gamma_ {j} (w _ {i}) \frac {(w _ {i} - \mu_ {j})}{\sigma_ {j} ^ {2}}.\tag{5.141}
$$

The effect of the regularization term is therefore to pull each weight towards the centre of the $j ^ { \mathrm { t h } }$ Gaussian, with a force proportional to the posterior probability of that Gaussian for the given weight. This is precisely the kind of effect that we are seeking. 

Derivatives of the error with respect to the centres of the Gaussians are also easily computed to give 

$$
\frac {\partial \widetilde {E}}{\partial \mu_ {j}} = \lambda \sum_ {i} \gamma_ {j} (w _ {i}) \frac {(\mu_ {i} - w _ {j})}{\sigma_ {j} ^ {2}}\tag{5.142}
$$

which has a simple intuitive interpretation, because it pushes $\mu _ { j }$ towards an average of the weight values, weighted by the posterior probabilities that the respective weight parameters were generated by component $j$ . Similarly, the derivatives with respect to the variances are given by 

$$
\frac {\partial \widetilde {E}}{\partial \sigma_ {j}} = \lambda \sum_ {i} \gamma_ {j} (w _ {i}) \left(\frac {1}{\sigma_ {j}} - \frac {(w _ {i} - \mu_ {j}) ^ {2}}{\sigma_ {j} ^ {3}}\right)\tag{5.143}
$$

which drives $\sigma _ { j }$ towards the weighted average of the squared deviations of the weights around the corresponding centre $\mu _ { j }$ , where the weighting coefficients are again given by the posterior probability that each weight is generated by component $j .$ . Note that in a practical implementation, new variables $\eta _ { j }$ defined by 

$$
\sigma_ {j} ^ {2} = \exp (\eta_ {j})\tag{5.144}
$$

are introduced, and the minimization is performed with respect to the $\eta _ { j }$ . This ensures that the parameters $\sigma _ { j }$ remain positive. It also has the effect of discouraging pathological solutions in which one or more of the $\sigma _ { j }$ goes to zero, corresponding to a Gaussian component collapsing onto one of the weight parameter values. Such solutions are discussed in more detail in the context of Gaussian mixture models in Section 9.2.1. 

For the derivatives with respect to the mixing coefficients $\pi _ { j }$ , we need to take account of the constraints 

$$
\sum_ {j} \pi_ {j} = 1, \quad 0 \leqslant \pi_ {i} \leqslant 1\tag{5.145}
$$

which follow from the interpretation of the $\pi _ { j }$ as prior probabilities. This can be done by expressing the mixing coefficients in terms of a set of auxiliary variables $\{ \eta _ { j } \}$ using the softmax function given by 

$$
\pi_ {j} = \frac {\exp (\eta_ {j})}{\sum_ {k = 1} ^ {M} \exp (\eta_ {k})}.\tag{5.146}
$$

Exercise 5.32 

The derivatives of the regularized error function with respect to the $\{ \eta _ { j } \}$ then take the form 

Figure 5.18 The left figure shows a two-link robot arm, in which the Cartesian coordinates $( x _ { 1 } , x _ { 2 } )$ of the end effector are determined uniquely by the two joint angles $\theta _ { 1 }$ and $\theta _ { 2 }$ and the (fixed) lengths $L _ { 1 }$ and $L _ { 2 }$ of the arms. This is know as the forward kinematics of the arm. In practice, we have to find the joint angles that will give rise to a desired end effector position and, as shown in the right figure, this inverse kinematics has two solutions corresponding to ‘elbow up’ and ‘elbow down’. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a912db2a39761b11884b3c8fdf621d40cfbed047acb663f432020b866d03a0f6.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/c3786be100cfd31d1d2e93e36668828a7c1ea98c3572cbceede829bad2e84634.jpg)


$$
\frac {\partial \widetilde {E}}{\partial \eta_ {j}} = \sum_ {i} \left\{\pi_ {j} - \gamma_ {j} (w _ {i}) \right\}.\tag{5.147}
$$

We see that $\pi _ { j }$ is therefore driven towards the average posterior probability for component $j$ . 

## 5.6. Mixture Density Networks

The goal of supervised learning is to model a conditional distribution $p ( \mathbf { t } | \mathbf { x } )$ , which for many simple regression problems is chosen to be Gaussian. However, practical machine learning problems can often have significantly non-Gaussian distributions. These can arise, for example, with inverse problems in which the distribution can be multimodal, in which case the Gaussian assumption can lead to very poor predictions. 

As a simple example of an inverse problem, consider the kinematics of a robot arm, as illustrated in Figure 5.18. The forward problem involves finding the end effector position given the joint angles and has a unique solution. However, in practice we wish to move the end effector of the robot to a specific position, and to do this we must set appropriate joint angles. We therefore need to solve the inverse problem, which has two solutions as seen in Figure 5.18. 

Forward problems often corresponds to causality in a physical system and generally have a unique solution. For instance, a specific pattern of symptoms in the human body may be caused by the presence of a particular disease. In pattern recognition, however, we typically have to solve an inverse problem, such as trying to predict the presence of a disease given a set of symptoms. If the forward problem involves a many-to-one mapping, then the inverse problem will have multiple solutions. For instance, several different diseases may result in the same symptoms. 

In the robotics example, the kinematics is defined by geometrical equations, and the multimodality is readily apparent. However, in many machine learning problems the presence of multimodality, particularly in problems involving spaces of high dimensionality, can be less obvious. For tutorial purposes, however, we shall consider a simple toy problem for which we can easily visualize the multimodality. Data for this problem is generated by sampling a variable x uniformly over the interval (0, 1), to give a set of values $\{ x _ { n } \}$ , and the corresponding target values $t _ { n }$ are obtained by computing the function $x _ { n } + 0 . 3 \sin ( 2 \pi x _ { n } )$ and then adding uniform noise over the interval $( - 0 . 1 , 0 . 1 )$ . The inverse problem is then obtained by keeping the same data points but exchanging the roles of x and t. Figure 5.19 shows the data sets for the forward and inverse problems, along with the results of fitting two-layer neural networks having 6 hidden units and a single linear output unit by minimizing a sumof-squares error function. Least squares corresponds to maximum likelihood under a Gaussian assumption. We see that this leads to a very poor model for the highly non-Gaussian inverse problem. 


Figure 5.19 On the left is the data set for a simple ‘forward problem’ in which the red curve shows the result of fitting a two-layer neural network by minimizing the sum-of-squares error function. The corresponding inverse problem, shown on the right, is obtained by exchanging the roles of x and t. Here the same network trained again by minimizing the sum-of-squares error function gives a very poor fit to the data due to the multimodality of the data set.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/42224a10faca3305c837b899fac4f69675352e9445c5ad41bed8fb734fdeadc3.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/ec7e3609f3d4ce0173099c4418baf6b3395efe4aff2c4c4b3a22246bc8de9136.jpg)


We therefore seek a general framework for modelling conditional probability distributions. This can be achieved by using a mixture model for $p ( \mathbf { t } | \mathbf { x } )$ in which both the mixing coefficients as well as the component densities are flexible functions of the input vector x, giving rise to the mixture density network. For any given value of x, the mixture model provides a general formalism for modelling an arbitrary conditional density function $p ( \mathbf { t } | \mathbf { x } )$ . Provided we consider a sufficiently flexible network, we then have a framework for approximating arbitrary conditional distributions. 

Here we shall develop the model explicitly for Gaussian components, so that 

$$
p (\mathbf {t} | \mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} (\mathbf {x}) \mathcal {N} \left(\mathbf {t} | \boldsymbol {\mu} _ {k} (\mathbf {x}), \sigma_ {k} ^ {2} (\mathbf {x})\right).\tag{5.148}
$$

This is an example of a heteroscedastic model since the noise variance on the data is a function of the input vector x. Instead of Gaussians, we can use other distributions for the components, such as Bernoulli distributions if the target variables are binary rather than continuous. We have also specialized to the case of isotropic covariances for the components, although the mixture density network can readily be extended to allow for general covariance matrices by representing the covariances using a Cholesky factorization (Williams, 1996). Even with isotropic components, the conditional distribution $p ( \mathbf { t } | \mathbf { x } )$ does not assume factorization with respect to the components of t (in contrast to the standard sum-of-squares regression model) as a consequence of the mixture distribution. 

We now take the various parameters of the mixture model, namely the mixing coefficients $\pi _ { k } ( { \bf x } )$ , the means $\mu _ { k } ( { \bf x } )$ , and the variances $\sigma _ { k } ^ { 2 } ( { \bf x } )$ , to be governed by the outputs of a conventional neural network that takes x as its input. The structure of this mixture density network is illustrated in Figure 5.20. The mixture density network is closely related to the mixture of experts discussed in Section 14.5.3. The principle difference is that in the mixture density network the same function is used to predict the parameters of all of the component densities as well as the mixing coefficients, and so the nonlinear hidden units are shared amongst the input-dependent functions. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/2aa6d36b20c51fb78a0103ca78b54b57742bc854cedb3641d53ca55f3e1fb94e.jpg)



Figure 5.20 The mixture density network can represent general conditional probability densities $p ( \mathbf { t } | \mathbf { x } )$ by considering a parametric mixture model for the distribution of t whose parameters are determined by the outputs of a neural network that takes x as its input vector.


The neural network in Figure 5.20 can, for example, be a two-layer network having sigmoidal (‘tanh’) hidden units. If there are L components in the mixture model (5.148), and if t has K components, then the network will have L output unit activations denoted by $a _ { k } ^ { \pi }$ that determine the mixing coefficients $\pi _ { k } ( { \bf x } )$ , K outputs denoted by $a _ { k } ^ { \sigma }$ that determine the kernel widths $\sigma _ { k } ( { \bf x } )$ , and $L \times K$ outputs denoted by $a _ { k j } ^ { \mu }$ that determine the components $\mu _ { k j } ( { \bf x } )$ of the kernel centres $\mu _ { k } ( { \bf x } )$ . The total number of network outputs is given by $( K + 2 ) L$ , as compared with the usual K outputs for a network, which simply predicts the conditional means of the target variables. 

The mixing coefficients must satisfy the constraints 

$$
\sum_ {k = 1} ^ {K} \pi_ {k} (\mathbf {x}) = 1, \quad 0 \leqslant \pi_ {k} (\mathbf {x}) \leqslant 1\tag{5.149}
$$

which can be achieved using a set of softmax outputs 

$$
\pi_ {k} (\mathbf {x}) = \frac {\exp (a _ {k} ^ {\pi})}{\sum_ {l = 1} ^ {K} \exp (a _ {l} ^ {\pi})}.\tag{5.150}
$$

Similarly, the variances must satisfy $\sigma _ { k } ^ { 2 } ( { \bf x } ) \geqslant 0$ and so can be represented in terms of the exponentials of the corresponding network activations using 

$$
\sigma_ {k} (\mathbf {x}) = \exp (a _ {k} ^ {\sigma}).\tag{5.151}
$$

Finally, because the means $\mu _ { k } ( { \bf x } )$ have real components, they can be represented 

directly by the network output activations 

$$
\mu_ {k j} (\mathbf {x}) = a _ {k j} ^ {\mu}.\tag{5.152}
$$

The adaptive parameters of the mixture density network comprise the vector w of weights and biases in the neural network, that can be set by maximum likelihood, or equivalently by minimizing an error function defined to be the negative logarithm of the likelihood. For independent data, this error function takes the form 

$$
E (\mathbf {w}) = - \sum_ {n = 1} ^ {N} \ln \left\{\sum_ {k = 1} ^ {k} \pi_ {k} \left(\mathbf {x} _ {n}, \mathbf {w}\right) \mathcal {N} \left(\mathbf {t} _ {n} \mid \boldsymbol {\mu} _ {k} \left(\mathbf {x} _ {n}, \mathbf {w}\right), \sigma_ {k} ^ {2} \left(\mathbf {x} _ {n}, \mathbf {w}\right)\right) \right\}\tag{5.153}
$$

where we have made the dependencies on w explicit. 

In order to minimize the error function, we need to calculate the derivatives of the error $E ( \mathbf { w } )$ with respect to the components of w. These can be evaluated by using the standard backpropagation procedure, provided we obtain suitable expressions for the derivatives of the error with respect to the output-unit activations. These represent error signals δ for each pattern and for each output unit, and can be backpropagated to the hidden units and the error function derivatives evaluated in the usual way. Because the error function (5.153) is composed of a sum of terms, one for each training data point, we can consider the derivatives for a particular pattern n and then find the derivatives of E by summing over all patterns. 

Because we are dealing with mixture distributions, it is convenient to view the mixing coefficients $\pi _ { k } ( { \bf x } )$ as x-dependent prior probabilities and to introduce the corresponding posterior probabilities given by 

$$
\gamma_ {k} (\mathbf {t} | \mathbf {x}) = \frac {\pi_ {k} \mathcal {N} _ {n k}}{\sum_ {l = 1} ^ {K} \pi_ {l} \mathcal {N} _ {n l}}\tag{5.154}
$$

where $\mathcal { N } _ { n k }$ denotes $\mathcal { N } \left( \mathbf { t } _ { n } | \pmb { \mu } _ { k } ( \mathbf { x } _ { n } ) , \sigma _ { k } ^ { 2 } ( \mathbf { x } _ { n } ) \right)$ 

The derivatives with respect to the network output activations governing the mixing coefficients are given by 

$$
\frac {\partial E _ {n}}{\partial a _ {k} ^ {\pi}} = \pi_ {k} - \gamma_ {k}.\tag{5.155}
$$

Similarly, the derivatives with respect to the output activations controlling the component means are given by 

$$
\frac {\partial E _ {n}}{\partial a _ {k l} ^ {\mu}} = \gamma_ {k} \left\{\frac {\mu_ {k l} - t _ {l}}{\sigma_ {k} ^ {2}} \right\}.\tag{5.156}
$$

Finally, the derivatives with respect to the output activations controlling the component variances are given by 

$$
\frac {\partial E _ {n}}{\partial a _ {k} ^ {\sigma}} = - \gamma_ {k} \left\{\frac {\| \mathbf {t} - \boldsymbol {\mu} _ {k} \| ^ {2}}{\sigma_ {k} ^ {3}} - \frac {1}{\sigma_ {k}} \right\}.\tag{5.157}
$$

Figure 5.21 (a) Plot of the mixing coefficients $\pi _ { k } ( x )$ as a function of x for the three kernel functions in a mixture density network trained on the data shown in Figure 5.19. The model has three Gaussian components, and uses a two-layer multilayer perceptron with five ‘tanh’ sigmoidal units in the hidden layer, and nine outputs (corresponding to the 3 means and 3 variances of the Gaussian components and the 3 mixing coefficients). At both small and large values of x, where the conditional probability density of the target data is unimodal, only one of the kernels has a high value for its prior probability, while at intermediate values of $x ,$ where the conditional density is trimodal, the three mixing coefficients have comparable values. (b) Plots of the means $\mu _ { k } ( x )$ using the same colour coding as for the mixing coefficients. (c) Plot of the contours of the corresponding conditional probability density of the target data for the same mixture density network. (d) Plot of the approximate conditional mode, shown by the red points, of the conditional density. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/39bcc95a20cc733646018e09e6e32e2c38ce674fb21022c7af68d61b06de20bd.jpg)



(a)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/4519df0298a742975fd5e53889c4d1bbbf6e2e1383cb9f03fdea2bcb55137394.jpg)



(b)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/d01c18b6b76d51efcd55aa27777941191665b93deaffa78d8bc7b3d59d7b07d2.jpg)



(c)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/2f04fc60418b9ddaaf8e32d3bd4ab9a3f6218bfaae59d579e95e266a293956a4.jpg)



(d)


We illustrate the use of a mixture density network by returning to the toy example of an inverse problem shown in Figure 5.19. Plots of the mixing coefficients $\pi _ { k } ( x )$ , the means $\mu _ { k } ( x )$ , and the conditional density contours corresponding to $p ( t | x )$ , are shown in Figure 5.21. The outputs of the neural network, and hence the parameters in the mixture model, are necessarily continuous single-valued functions of the input variables. However, we see from Figure 5.21(c) that the model is able to produce a conditional density that is unimodal for some values of x and trimodal for other values by modulating the amplitudes of the mixing components $\pi _ { k } ( { \bf x } )$ 

Once a mixture density network has been trained, it can predict the conditional density function of the target data for any given value of the input vector. This conditional density represents a complete description of the generator of the data, so far as the problem of predicting the value of the output vector is concerned. From this density function we can calculate more specific quantities that may be of interest in different applications. One of the simplest of these is the mean, corresponding to the conditional average of the target data, and is given by 

$$
\mathbb {E} \left[ \mathbf {t} | \mathbf {x} \right] = \int \mathbf {t} p (\mathbf {t} | \mathbf {x}) \mathrm{d} \mathbf {t} = \sum_ {k = 1} ^ {K} \pi_ {k} (\mathbf {x}) \pmb {\mu} _ {k} (\mathbf {x})\tag{5.158}
$$

where we have used (5.148). Because a standard network trained by least squares is approximating the conditional mean, we see that a mixture density network can reproduce the conventional least-squares result as a special case. Of course, as we have already noted, for a multimodal distribution the conditional mean is of limited value. 

Exercise 5.37 

We can similarly evaluate the variance of the density function about the conditional average, to give 

$$
{s ^ {2} (\mathbf {x})} = {\mathbb {E} \left[ | | \mathbf {t} - \mathbb {E} [ \mathbf {t} | \mathbf {x} ] | | ^ {2} | \mathbf {x} \right]}\tag{5.159}
$$

$$
= \sum_ {k = 1} ^ {K} \pi_ {k} (\mathbf {x}) \left\{\sigma_ {k} ^ {2} (\mathbf {x}) + \left\| \boldsymbol {\mu} _ {k} (\mathbf {x}) - \sum_ {l = 1} ^ {K} \pi_ {l} (\mathbf {x}) \boldsymbol {\mu} _ {l} (\mathbf {x}) \right\| ^ {2} \right\}\tag{5.160}
$$

where we have used (5.148) and (5.158). This is more general than the corresponding least-squares result because the variance is a function of x. 

We have seen that for multimodal distributions, the conditional mean can give a poor representation of the data. For instance, in controlling the simple robot arm shown in Figure 5.18, we need to pick one of the two possible joint angle settings in order to achieve the desired end-effector location, whereas the average of the two solutions is not itself a solution. In such cases, the conditional mode may be of more value. Because the conditional mode for the mixture density network does not have a simple analytical solution, this would require numerical iteration. A simple alternative is to take the mean of the most probable component (i.e., the one with the largest mixing coefficient) at each value of x. This is shown for the toy data set in Figure 5.21(d). 

## 5.7. Bayesian Neural Networks

So far, our discussion of neural networks has focussed on the use of maximum likelihood to determine the network parameters (weights and biases). Regularized maximum likelihood can be interpreted as a MAP (maximum posterior) approach in which the regularizer can be viewed as the logarithm of a prior parameter distribution. However, in a Bayesian treatment we need to marginalize over the distribution of parameters in order to make predictions. 

In Section 3.3, we developed a Bayesian solution for a simple linear regression model under the assumption of Gaussian noise. We saw that the posterior distribution, which is Gaussian, could be evaluated exactly and that the predictive distribution could also be found in closed form. In the case of a multilayered network, the highly nonlinear dependence of the network function on the parameter values means that an exact Bayesian treatment can no longer be found. In fact, the log of the posterior distribution will be nonconvex, corresponding to the multiple local minima in the error function. 

The technique of variational inference, to be discussed in Chapter 10, has been applied to Bayesian neural networks using a factorized Gaussian approximation to the posterior distribution (Hinton and van Camp, 1993) and also using a fullcovariance Gaussian (Barber and Bishop, 1998a; Barber and Bishop, 1998b). The most complete treatment, however, has been based on the Laplace approximation (MacKay, 1992c; MacKay, 1992b) and forms the basis for the discussion given here. We will approximate the posterior distribution by a Gaussian, centred at a mode of the true posterior. Furthermore, we shall assume that the covariance of this Gaussian is small so that the network function is approximately linear with respect to the parameters over the region of parameter space for which the posterior probability is significantly nonzero. With these two approximations, we will obtain models that are analogous to the linear regression and classification models discussed in earlier chapters and so we can exploit the results obtained there. We can then make use of the evidence framework to provide point estimates for the hyperparameters and to compare alternative models (for example, networks having different numbers of hidden units). To start with, we shall discuss the regression case and then later consider the modifications needed for solving classification tasks. 

## 5.7.1 Posterior parameter distribution

Consider the problem of predicting a single continuous target variable t from a vector x of inputs (the extension to multiple targets is straightforward). We shall suppose that the conditional distribution $p ( t | \mathbf { x } )$ is Gaussian, with an x-dependent mean given by the output of a neural network model $y ( \mathbf { x } , \mathbf { w } )$ , and with precision (inverse variance) $\beta$ 

$$
p (t | \mathbf {x}, \mathbf {w}, \beta) = \mathcal {N} (t | y (\mathbf {x}, \mathbf {w}), \beta^ {- 1}).\tag{5.161}
$$

Similarly, we shall choose a prior distribution over the weights w that is Gaussian of the form 

$$
p (\mathbf {w} | \alpha) = \mathcal {N} (\mathbf {w} | \mathbf {0}, \alpha^ {- 1} \mathbf {I}).\tag{5.162}
$$

For an i.i.d. data set of N observations $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ , with a corresponding set of target values $\mathcal { D } = \{ t _ { 1 } , \ldots , t _ { N } \}$ , the likelihood function is given by 

$$
p (\mathcal {D} | \mathbf {w}, \beta) = \prod_ {n = 1} ^ {N} \mathcal {N} (t _ {n} | y (\mathbf {x} _ {n}, \mathbf {w}), \beta^ {- 1})\tag{5.163}
$$

and so the resulting posterior distribution is then 

$$
p (\mathbf {w} | \mathcal {D}, \alpha , \beta) \propto p (\mathbf {w} | \alpha) p (\mathcal {D} | \mathbf {w}, \beta).\tag{5.164}
$$

which, as a consequence of the nonlinear dependence of $y ( \mathbf { x } , \mathbf { w } )$ on w, will be non-Gaussian. 

We can find a Gaussian approximation to the posterior distribution by using the Laplace approximation. To do this, we must first find a (local) maximum of the posterior, and this must be done using iterative numerical optimization. As usual, it is convenient to maximize the logarithm of the posterior, which can be written in the 

form 

$$
\ln p (\mathbf {w} | \mathcal {D}) = - \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w} - \frac {\beta}{2} \sum_ {n = 1} ^ {N} \left\{y (\mathbf {x} _ {n}, \mathbf {w}) - t _ {n} \right\} ^ {2} + \mathrm{const}\tag{5.165}
$$

which corresponds to a regularized sum-of-squares error function. Assuming for the moment that $\alpha$ and $\beta$ are fixed, we can find a maximum of the posterior, which we denote ${ \bf w } _ { \mathrm { M A P } }$ , by standard nonlinear optimization algorithms such as conjugate gradients, using error backpropagation to evaluate the required derivatives. 

Having found a mode ${ \bf w } _ { \mathrm { M A P } }$ , we can then build a local Gaussian approximation by evaluating the matrix of second derivatives of the negative log posterior distribution. From (5.165), this is given by 

$$
\mathbf {A} = - \nabla \nabla \ln p (\mathbf {w} | \mathcal {D}, \alpha , \beta) = \alpha \mathbf {I} + \beta \mathbf {H}\tag{5.166}
$$

where H is the Hessian matrix comprising the second derivatives of the sum-ofsquares error function with respect to the components of w. Algorithms for computing and approximating the Hessian were discussed in Section 5.4. The corresponding Gaussian approximation to the posterior is then given from (4.134) by 

$$
q (\mathbf {w} | \mathcal {D}) = \mathcal {N} (\mathbf {w} | \mathbf {w} _ {\mathrm{MAP}}, \mathbf {A} ^ {- 1}).\tag{5.167}
$$

Similarly, the predictive distribution is obtained by marginalizing with respect to this posterior distribution 

$$
p (t | \mathbf {x}, \mathcal {D}) = \int p (t | \mathbf {x}, \mathbf {w}) q (\mathbf {w} | \mathcal {D}) \mathrm{d} \mathbf {w}.\tag{5.168}
$$

However, even with the Gaussian approximation to the posterior, this integration is still analytically intractable due to the nonlinearity of the network function $y ( \mathbf { x } , \mathbf { w } )$ as a function of $\mathbf { w }$ . To make progress, we now assume that the posterior distribution has small variance compared with the characteristic scales of w over which $y ( \mathbf { x } , \mathbf { w } )$ is varying. This allows us to make a Taylor series expansion of the network function around ${ \bf w } _ { \mathrm { M A P } }$ and retain only the linear terms 

$$
y (\mathbf {x}, \mathbf {w}) \simeq y (\mathbf {x}, \mathbf {w} _ {\mathrm{MAP}}) + \mathbf {g} ^ {\mathbf {T}} (\mathbf {w} - \mathbf {w} _ {\mathrm{MAP}})\tag{5.169}
$$

where we have defined 

$$
\mathbf {g} = \left. \nabla_ {\mathbf {w}} y (\mathbf {x}, \mathbf {w}) \right| _ {\mathbf {w} = \mathbf {w} _ {\mathrm{MAP}}}.\tag{5.170}
$$

With this approximation, we now have a linear-Gaussian model with a Gaussian distribution for $p ( \mathbf { w } )$ and a Gaussian for $p ( t | \mathbf { w } )$ whose mean is a linear function of w of the form 

$$
p (t | \mathbf {x}, \mathbf {w}, \beta) \simeq \mathcal {N} \left(t | y (\mathbf {x}, \mathbf {w} _ {\mathrm{MAP}}) + \mathbf {g} ^ {\mathbf {T}} (\mathbf {w} - \mathbf {w} _ {\mathrm{MAP}}), \beta^ {- 1}\right).\tag{5.171}
$$

Exercise 5.38 

We can therefore make use of the general result (2.115) for the marginal $p ( t )$ to give 

$$
p (t | \mathbf {x}, \mathcal {D}, \alpha , \beta) = \mathcal {N} \left(t | y (\mathbf {x}, \mathbf {w} _ {\mathrm{MAP}}), \sigma^ {2} (\mathbf {x})\right)\tag{5.172}
$$

where the input-dependent variance is given by 

$$
\sigma^ {2} (\mathbf {x}) = \beta^ {- 1} + \mathbf {g} ^ {\mathrm{T}} \mathbf {A} ^ {- 1} \mathbf {g}.\tag{5.173}
$$

We see that the predictive distribution $p ( t | \mathbf { x } , \mathcal { D } )$ is a Gaussian whose mean is given by the network function $y ( \mathbf { x } , \mathbf { w } _ { \mathrm { M A P } } )$ with the parameter set to their MAP value. The variance has two terms, the first of which arises from the intrinsic noise on the target variable, whereas the second is an x-dependent term that expresses the uncertainty in the interpolant due to the uncertainty in the model parameters w. This should be compared with the corresponding predictive distribution for the linear regression model, given by (3.58) and (3.59). 

## 5.7.2 Hyperparameter optimization

So far, we have assumed that the hyperparameters α and $\beta$ are fixed and known. We can make use of the evidence framework, discussed in Section 3.5, together with the Gaussian approximation to the posterior obtained using the Laplace approximation, to obtain a practical procedure for choosing the values of such hyperparameters. 

The marginal likelihood, or evidence, for the hyperparameters is obtained by integrating over the network weights 

$$
p (\mathcal {D} | \alpha , \beta) = \int p (\mathcal {D} | \mathbf {w}, \beta) p (\mathbf {w} | \alpha) \mathrm{d} \mathbf {w}.\tag{5.174}
$$

Exercise 5.39 

This is easily evaluated by making use of the Laplace approximation result (4.135). Taking logarithms then gives 

$$
\ln p (\mathcal {D} | \alpha , \beta) \simeq - E (\mathbf {w} _ {\mathrm{MAP}}) - \frac {1}{2} \ln | \mathbf {A} | + \frac {W}{2} \ln \alpha + \frac {N}{2} \ln \beta - \frac {N}{2} \ln (2 \pi)\tag{5.175}
$$

where $W$ is the total number of parameters in w, and the regularized error function is defined by 

$$
E (\mathbf {w} _ {\mathrm{MAP}}) = \frac {\beta}{2} \sum_ {n = 1} ^ {N} \left\{y (\mathbf {x} _ {n}, \mathbf {w} _ {\mathrm{MAP}}) - t _ {n} \right\} ^ {2} + \frac {\alpha}{2} \mathbf {w} _ {\mathrm{MAP}} ^ {\mathrm{T}} \mathbf {w} _ {\mathrm{MAP}}.\tag{5.176}
$$

We see that this takes the same form as the corresponding result (3.86) for the linear regression model. 

In the evidence framework, we make point estimates for α and $\beta$ by maximizing ln $p ( \mathcal { D } | \alpha , \beta )$ . Consider first the maximization with respect to α, which can be done by analogy with the linear regression case discussed in Section 3.5.2. We first define the eigenvalue equation 

$$
\beta \mathbf {H} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{5.177}
$$

where H is the Hessian matrix comprising the second derivatives of the sum-ofsquares error function, evaluated at $\mathbf { w } = \mathbf { w } _ { \mathrm { M A P } }$ . By analogy with (3.92), we obtain 

$$
\alpha = \frac {\gamma}{\mathbf {w} _ {\mathrm{MAP}} ^ {\mathrm{T}} \mathbf {w} _ {\mathrm{MAP}}}\tag{5.178}
$$

Section 3.5.3 

where $\gamma$ represents the effective number of parameters and is defined by 

$$
\gamma = \sum_ {i = 1} ^ {W} \frac {\lambda_ {i}}{\alpha + \lambda_ {i}}.\tag{5.179}
$$

Note that this result was exact for the linear regression case. For the nonlinear neural network, however, it ignores the fact that changes in $\alpha$ will cause changes in the Hessian H, which in turn will change the eigenvalues. We have therefore implicitly ignored terms involving the derivatives of $\lambda _ { i }$ with respect to $\alpha$ 

Similarly, from (3.95) we see that maximizing the evidence with respect to $\beta$ gives the re-estimation formula 

$$
\frac {1}{\beta} = \frac {1}{N - \gamma} \sum_ {n = 1} ^ {N} \left\{y (\mathbf {x} _ {n}, \mathbf {w} _ {\mathrm{MAP}}) - t _ {n} \right\} ^ {2}.\tag{5.180}
$$

As with the linear model, we need to alternate between re-estimation of the hyperparameters $\alpha$ and $\beta$ and updating of the posterior distribution. The situation with a neural network model is more complex, however, due to the multimodality of the posterior distribution. As a consequence, the solution for ${ \bf w } _ { \mathrm { M A P } }$ found by maximizing the log posterior will depend on the initialization of w. Solutions that differ only as a consequence of the interchange and sign reversal symmetries in the hidden units are identical so far as predictions are concerned, and it is irrelevant which of the equivalent solutions is found. However, there may be inequivalent solutions as well, and these will generally yield different values for the optimized hyperparameters. 

In order to compare different models, for example neural networks having different numbers of hidden units, we need to evaluate the model evidence $p ( \mathcal { D } )$ . This can be approximated by taking (5.175) and substituting the values of α and $\beta$ obtained from the iterative optimization of these hyperparameters. A more careful evaluation is obtained by marginalizing over α and $\beta ,$ again by making a Gaussian approximation (MacKay, 1992c; Bishop, 1995a). In either case, it is necessary to evaluate the determinant $| \mathbf { A } |$ of the Hessian matrix. This can be problematic in practice because the determinant, unlike the trace, is sensitive to the small eigenvalues that are often difficult to determine accurately. 

The Laplace approximation is based on a local quadratic expansion around a mode of the posterior distribution over weights. We have seen in Section 5.1.1 that any given mode in a two-layer network is a member of a set of $M ! 2 ^ { M }$ equivalent modes that differ by interchange and sign-change symmetries, where M is the number of hidden units. When comparing networks having different numbers of hidden units, this can be taken into account by multiplying the evidence by a factor of $M ! 2 ^ { M }$ 

## 5.7.3 Bayesian neural networks for classification

So far, we have used the Laplace approximation to develop a Bayesian treatment of neural network regression models. We now discuss the modifications to this framework that arise when it is applied to classification. Here we shall consider a network having a single logistic sigmoid output corresponding to a two-class classification problem. The extension to networks with multiclass softmax outputs is straightforward. We shall build extensively on the analogous results for linear classification models discussed in Section 4.5, and so we encourage the reader to familiarize themselves with that material before studying this section. 

The log likelihood function for this model is given by 

$$
\ln p (\mathcal {D} | \mathbf {w}) = \sum_ {n} = 1 ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\}\tag{5.181}
$$

where $t _ { n } \in \{ 0 , 1 \}$ are the target values, and $y _ { n } \equiv y ( \mathbf x _ { n } , \mathbf w )$ . Note that there is no hyperparameter $\beta ,$ because the data points are assumed to be correctly labelled. As before, the prior is taken to be an isotropic Gaussian of the form (5.162). 

The first stage in applying the Laplace framework to this model is to initialize the hyperparameter $\alpha ,$ , and then to determine the parameter vector w by maximizing the log posterior distribution. This is equivalent to minimizing the regularized error function α 

$$
E (\mathbf {w}) = - \ln p (\mathcal {D} | \mathbf {w}) + \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}\tag{5.182}
$$

and can be achieved using error backpropagation combined with standard optimization algorithms, as discussed in Section 5.3. 

Having found a solution ${ \bf w } _ { \mathrm { M A P } }$ for the weight vector, the next step is to evaluate the Hessian matrix H comprising the second derivatives of the negative log likelihood function. This can be done, for instance, using the exact method of Section 5.4.5, or using the outer product approximation given by (5.85). The second derivatives of the negative log posterior can again be written in the form (5.166), and the Gaussian approximation to the posterior is then given by (5.167). 

To optimize the hyperparameter $\alpha .$ , we again maximize the marginal likelihood, which is easily shown to take the form 

$$
\ln p (\mathcal {D} | \alpha) \simeq - E (\mathbf {w} _ {\mathrm{MAP}}) - \frac {1}{2} \ln | \mathbf {A} | + \frac {W}{2} \ln \alpha + \mathrm{const}\tag{5.183}
$$

where the regularized error function is defined by 

$$
E (\mathbf {w} _ {\mathrm{MAP}}) = - \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\} + \frac {\alpha}{2} \mathbf {w} _ {\mathrm{MAP}} ^ {\mathrm{T}} \mathbf {w} _ {\mathrm{MAP}}\tag{5.184}
$$

in which $y _ { n } \equiv y ( \mathbf { x } _ { n } , \mathbf { w } _ { \mathrm { M A P } } )$ . Maximizing this evidence function with respect to α again leads to the re-estimation equation given by (5.178). 

The use of the evidence procedure to determine α is illustrated in Figure 5.22 for the synthetic two-dimensional data discussed in Appendix A. 

Finally, we need the predictive distribution, which is defined by (5.168). Again, this integration is intractable due to the nonlinearity of the network function. The 

Illustration of the evidence framework applied to a synthetic two-class data set. The green curve shows the optimal decision boundary, the black curve shows the result of fitting a two-layer network with 8 hidden units by maximum likelihood, and the red curve shows the result of including a regularizer in which α is optimized using the evidence procedure, starting from the initial value $\alpha = 0$ Note that the evidence procedure greatly reduces the over-fitting of the network. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/5ff1f5c8c5697ecdf766bfa605691cf04d0cd4f28433ad91a2432e79ae8ba506.jpg)


simplest approximation is to assume that the posterior distribution is very narrow and hence make the approximation 

$$
p (t | \mathbf {x}, \mathcal {D}) \simeq p (t | \mathbf {x}, \mathbf {w} _ {\mathrm{MAP}}).\tag{5.185}
$$

We can improve on this, however, by taking account of the variance of the posterior distribution. In this case, a linear approximation for the network outputs, as was used in the case of regression, would be inappropriate due to the logistic sigmoid outputunit activation function that constrains the output to lie in the range (0, 1). Instead, we make a linear approximation for the output unit activation in the form 

$$
a (\mathbf {x}, \mathbf {w}) \simeq a _ {\mathrm{MAP}} (\mathbf {x}) + \mathbf {b} ^ {\mathrm{T}} (\mathbf {w} - \mathbf {w} _ {\mathrm{MAP}})\tag{5.186}
$$

where $a _ { \mathrm { M A P } } ( \mathbf { x } ) = a ( \mathbf { x } , \mathbf { w } _ { \mathrm { M A P } } )$ , and the vector $\mathbf { b } \equiv \nabla a ( \mathbf { x } , \mathbf { w } _ { \mathrm { M A P } } )$ can be found by backpropagation. 

Because we now have a Gaussian approximation for the posterior distribution over w, and a model for a that is a linear function of w, we can now appeal to the results of Section 4.5.2. The distribution of output unit activation values, induced by the distribution over network weights, is given by 

$$
p (a | \mathbf {x}, \mathcal {D}) = \int \delta \left(a - a _ {\mathrm{MAP}} (\mathbf {x}) - \mathbf {b} ^ {\mathrm{T}} (\mathbf {x}) (\mathbf {w} - \mathbf {w} _ {\mathrm{MAP}})\right) q (\mathbf {w} | \mathcal {D}) \mathrm{d} \mathbf {w}\tag{5.187}
$$

where $q ( \mathbf { w } | \mathcal { D } )$ is the Gaussian approximation to the posterior distribution given by (5.167). From Section 4.5.2, we see that this distribution is Gaussian with mean $a _ { \mathrm { M A P } } \equiv a ( \mathbf { x } , \mathbf { w } _ { \mathrm { M A P } } )$ , and variance 

$$
\sigma_ {a} ^ {2} (\mathbf {x}) = \mathbf {b} ^ {\mathrm{T}} (\mathbf {x}) \mathbf {A} ^ {- 1} \mathbf {b} (\mathbf {x}).\tag{5.188}
$$

Finally, to obtain the predictive distribution, we must marginalize over a using 

$$
p (t = 1 | \mathbf {x}, \mathcal {D}) = \int \sigma (a) p (a | \mathbf {x}, \mathcal {D}) \mathrm{d} a.\tag{5.189}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/92c1880ff42e965aba5fb455a63fb0dea5373f6c059a7f1ebadb8bc0131843a7.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/1dae58eca6df163fac36c5806d35737354b1002cfca0fc585b5b7f26ae7947d7.jpg)



Figure 5.23 An illustration of the Laplace approximation for a Bayesian neural network having 8 hidden units with ‘tanh’ activation functions and a single logistic-sigmoid output unit. The weight parameters were found using scaled conjugate gradients, and the hyperparameter α was optimized using the evidence framework. On the left is the result of using the simple approximation (5.185) based on a point estimate ${ \bf w } _ { \mathrm { M A P } }$ of the parameters, in which the green curve shows the $y = 0 . 5$ decision boundary, and the other contours correspond to output probabilities of $y = 0 . 1 , 0 . 3 , 0 . 7 ,$ , and 0.9. On the right is the corresponding result obtained using (5.190). Note that the effect of marginalization is to spread out the contours and to make the predictions less confident, so that at each input point x, the posterior probabilities are shifted towards 0.5, while the $y = 0 . 5$ contour itself is unaffected.


The convolution of a Gaussian with a logistic sigmoid is intractable. We therefore apply the approximation (4.153) to (5.189) giving 

$$
p (t = 1 | \mathbf {x}, \mathcal {D}) = \sigma \left(\kappa (\sigma_ {a} ^ {2}) \mathbf {b} ^ {\mathrm{T}} \mathbf {w} _ {\mathrm{MAP}}\right)\tag{5.190}
$$

where $\kappa ( \cdot )$ is defined by (4.154). Recall that both $\sigma _ { a } ^ { 2 }$ and b are functions of x. 

Figure 5.23 shows an example of this framework applied to the synthetic classification data set described in Appendix A. 

## Exercises

5.1 ( ) Consider a two-layer network function of the form (5.7) in which the hiddenunit nonlinear activation functions $g ( \cdot )$ are given by logistic sigmoid functions of the form 

$$
\sigma (a) = \{1 + \exp (- a) \} ^ {- 1}.\tag{5.191}
$$

Show that there exists an equivalent network, which computes exactly the same function, but with hidden unit activation functions given by tanh(a) where the tanh function is defined by (5.59). Hint: first find the relation between $\sigma ( a )$ and tanh(a), and then show that the parameters of the two networks differ by linear transformations. 

5.2 () www Show that maximizing the likelihood function under the conditional distribution (5.16) for a multioutput neural network is equivalent to minimizing the sum-of-squares error function (5.11). 

5.3 ( ) Consider a regression problem involving multiple target variables in which it is assumed that the distribution of the targets, conditioned on the input vector x, is a Gaussian of the form 

$$
p (\mathbf {t} | \mathbf {x}, \mathbf {w}) = \mathcal {N} (\mathbf {t} | \mathbf {y} (\mathbf {x}, \mathbf {w}), \boldsymbol {\Sigma})\tag{5.192}
$$

where $\mathbf { y } ( \mathbf { x } , \mathbf { w } )$ is the output of a neural network with input vector x and weight vector w, and Σ is the covariance of the assumed Gaussian noise on the targets. Given a set of independent observations of x and t, write down the error function that must be minimized in order to find the maximum likelihood solution for w, if we assume that Σ is fixed and known. Now assume that Σ is also to be determined from the data, and write down an expression for the maximum likelihood solution for Σ. Note that the optimizations of w and Σ are now coupled, in contrast to the case of independent target variables discussed in Section 5.2. 

5.4 ( ) Consider a binary classification problem in which the target values are $t \in$ $\{ 0 , 1 \}$ , with a network output $y ( \mathbf { x } , \mathbf { w } )$ that represents $p ( t = 1 | \mathbf { x } )$ , and suppose that there is a probability  that the class label on a training data point has been incorrectly set. Assuming independent and identically distributed data, write down the error function corresponding to the negative log likelihood. Verify that the error function (5.21) is obtained when $\epsilon = 0$ . Note that this error function makes the model robust to incorrectly labelled data, in contrast to the usual error function. 

5.5 () www Show that maximizing likelihood for a multiclass neural network model in which the network outputs have the interpretation $y _ { k } ( \mathbf { x } , \mathbf { w } ) = p ( t _ { k } = 1 | \mathbf { x } )$ is equivalent to the minimization of the cross-entropy error function (5.24). 

5.6 () www Show the derivative of the error function (5.21) with respect to the activation $a _ { k }$ for an output unit having a logistic sigmoid activation function satisfies (5.18). 

5.7 () Show the derivative of the error function (5.24) with respect to the activation $a _ { k }$ for output units having a softmax activation function satisfies (5.18). 

5.8 () We saw in (4.88) that the derivative of the logistic sigmoid activation function can be expressed in terms of the function value itself. Derive the corresponding result for the ‘tanh’ activation function defined by (5.59). 

5.9 () www The error function (5.21) for binary classification problems was derived for a network having a logistic-sigmoid output activation function, so that $0 \leqslant y ( \mathbf { x } , \mathbf { w } ) \leqslant 1$ , and data having target values $t \in \{ 0 , 1 \}$ . Derive the corresponding error function if we consider a network having an output $- 1 \leqslant y ( \mathbf { x } , \mathbf { w } ) \leqslant 1$ and target values $t = 1$ for class $\mathcal { C } _ { 1 }$ and $t = - 1$ for class $\mathcal { C } _ { 2 }$ . What would be the appropriate choice of output unit activation function? 

5.10 () www Consider a Hessian matrix H with eigenvector equation (5.33). By setting the vector v in (5.39) equal to each of the eigenvectors $\mathbf { u } _ { i }$ in turn, show that H is positive definite if, and only if, all of its eigenvalues are positive. 

5.11 ( ) www Consider a quadratic error function defined by (5.32), in which the Hessian matrix H has an eigenvalue equation given by (5.33). Show that the contours of constant error are ellipses whose axes are aligned with the eigenvectors $\mathbf { u } _ { i }$ with lengths that are inversely proportional to the square root of the corresponding eigenvalues $\lambda _ { i }$ 

5.12 ( ) www By considering the local Taylor expansion (5.32) of an error function about a stationary point $\mathbf { w } ^ { \star }$ , show that the necessary and sufficient condition for the stationary point to be a local minimum of the error function is that the Hessian matrix H, defined by (5.30) with $\widehat { \mathbf { w } } = \mathbf { w } ^ { \star }$ , be positive definite. 

5.13 () Show that as a consequence of the symmetry of the Hessian matrix H, the number of independent elements in the quadratic error function (5.28) is given by $W ( W + 3 ) / 2$ 

5.14 () By making a Taylor expansion, verify that the terms that are $O ( \epsilon )$ cancel on the right-hand side of (5.69). 

5.15 ( ) In Section 5.3.4, we derived a procedure for evaluating the Jacobian matrix of a neural network using a backpropagation procedure. Derive an alternative formalism for finding the Jacobian based on forward propagation equations. 

5.16 () The outer product approximation to the Hessian matrix for a neural network using a sum-of-squares error function is given by (5.84). Extend this result to the case of multiple outputs. 

5.17 () Consider a squared loss function of the form 

$$
E = \frac {1}{2} \iint \left\{y (\mathbf {x}, \mathbf {w}) - t \right\} ^ {2} p (\mathbf {x}, t) d \mathbf {x} d t\tag{5.193}
$$

where $y ( \mathbf { x } , \mathbf { w } )$ is a parametric function such as a neural network. The result (1.89) shows that the function $y ( \mathbf { x } , \mathbf { w } )$ that minimizes this error is given by the conditional expectation of t given x. Use this result to show that the second derivative of E with respect to two elements $w _ { r }$ and $w _ { s }$ of the vector w, is given by 

$$
\frac {\partial^ {2} E}{\partial w _ {r} \partial w _ {s}} = \int \frac {\partial y}{\partial w _ {r}} \frac {\partial y}{\partial w _ {s}} p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{5.194}
$$

Note that, for a finite sample from $p ( \mathbf { x } )$ , we obtain (5.84). 

5.18 () Consider a two-layer network of the form shown in Figure 5.1 with the addition of extra parameters corresponding to skip-layer connections that go directly from the inputs to the outputs. By extending the discussion of Section 5.3.2, write down the equations for the derivatives of the error function with respect to these additional parameters. 

5.19 () www Derive the expression (5.85) for the outer product approximation to the Hessian matrix for a network having a single output with a logistic sigmoid output-unit activation function and a cross-entropy error function, corresponding to the result (5.84) for the sum-of-squares error function. 

5.20 () Derive an expression for the outer product approximation to the Hessian matrix for a network having $K$ outputs with a softmax output-unit activation function and a cross-entropy error function, corresponding to the result (5.84) for the sum-ofsquares error function. 

5.21 (  ) Extend the expression (5.86) for the outer product approximation of the Hessian matrix to the case of $K > 1$ output units. Hence, derive a recursive expression analogous to (5.87) for incrementing the number N of patterns and a similar expression for incrementing the number $K$ of outputs. Use these results, together with the identity (5.88), to find sequential update expressions analogous to (5.89) for finding the inverse of the Hessian by incrementally including both extra patterns and extra outputs. 

5.22 ( ) Derive the results (5.93), (5.94), and (5.95) for the elements of the Hessian matrix of a two-layer feed-forward network by application of the chain rule of calculus. 

5.23 ( ) Extend the results of Section 5.4.5 for the exact Hessian of a two-layer network to include skip-layer connections that go directly from inputs to outputs. 

5.24 () Verify that the network function defined by (5.113) and (5.114) is invariant under the transformation (5.115) applied to the inputs, provided the weights and biases are simultaneously transformed using (5.116) and (5.117). Similarly, show that the network outputs can be transformed according (5.118) by applying the transformation (5.119) and (5.120) to the second-layer weights and biases. 

5.25 (  ) www Consider a quadratic error function of the form 

$$
E = E _ {0} + \frac {1}{2} (\mathbf {w} - \mathbf {w} ^ {\star}) ^ {\mathrm{T}} \mathbf {H} (\mathbf {w} - \mathbf {w} ^ {\star})\tag{5.195}
$$

where $\mathbf { w } ^ { \star }$ represents the minimum, and the Hessian matrix H is positive definite and constant. Suppose the initial weight vector $\mathbf { w } ^ { ( 0 ) }$ is chosen to be at the origin and is updated using simple gradient descent 

$$
\mathbf {w} ^ {(\tau)} = \mathbf {w} ^ {(\tau - 1)} - \rho \nabla E\tag{5.196}
$$

where $\tau$ denotes the step number, and $\rho$ is the learning rate (which is assumed to be small). Show that, after $\tau$ steps, the components of the weight vector parallel to the eigenvectors of H can be written 

$$
w _ {j} ^ {(\tau)} = \{1 - (1 - \rho \eta_ {j}) ^ {\tau} \} w _ {j} ^ {\star}\tag{5.197}
$$

where $w _ { j } = \mathbf { w } ^ { \mathrm { T } } \mathbf { u } _ { j }$ , and $\mathbf { u } _ { j }$ and $\eta _ { j }$ are the eigenvectors and eigenvalues, respectively, of H so that 

$$
\mathbf {H} \mathbf {u} _ {j} = \eta_ {j} \mathbf {u} _ {j}.\tag{5.198}
$$

Show that as $\tau \to \infty$ , this gives $\mathbf { w } ^ { ( \tau ) } \to \mathbf { w } ^ { \star }$ as expected, provided $| 1 - \rho \eta _ { j } | < 1$ Now suppose that training is halted after a finite number $\tau$ of steps. Show that the components of the weight vector parallel to the eigenvectors of the Hessian satisfy 

$$
w _ {j} ^ {(\tau)} \simeq w _ {j} ^ {\star} \quad \mathrm{when} \quad \eta_ {j} \gg (\rho \tau) ^ {- 1}\tag{5.199}
$$

$$
| w _ {j} ^ {(\tau)} | \ll | w _ {j} ^ {\star} | \quad \text { when } \quad \eta_ {j} \ll (\rho \tau) ^ {- 1}.\tag{5.200}
$$

Compare this result with the discussion in Section 3.5.3 of regularization with simple weight decay, and hence show that $( \rho \tau ) ^ { - 1 }$ is analogous to the regularization parameter λ. The above results also show that the effective number of parameters in the network, as defined by (3.91), grows as the training progresses. 

( ) Consider a multilayer perceptron with arbitrary feed-forward topology, which is to be trained by minimizing the tangent propagation error function (5.127) in which the regularizing function is given by (5.128). Show that the regularization term Ω can be written as a sum over patterns of terms of the form 

$$
\Omega_ {n} = \frac {1}{2} \sum_ {k} (\mathcal {G} y _ {k}) ^ {2}\tag{5.201}
$$

where $\mathcal { G }$ is a differential operator defined by 

$$
\mathcal {G} \equiv \sum_ {i} \tau_ {i} \frac {\partial}{\partial x _ {i}}.\tag{5.202}
$$

By acting on the forward propagation equations 

$$
z _ {j} = h (a _ {j}), \qquad a _ {j} = \sum_ {i} w _ {j i} z _ {i}\tag{5.203}
$$

with the operator ${ \mathcal { G } } .$ show that $\Omega _ { n }$ can be evaluated by forward propagation using the following equations: 

$$
\alpha_ {j} = h ^ {\prime} (a _ {j}) \beta_ {j}, \quad \beta_ {j} = \sum_ {i} w _ {j i} \alpha_ {i}.\tag{5.204}
$$

where we have defined the new variables 

$$
\alpha_ {j} \equiv \mathcal {G} z _ {j}, \quad \beta_ {j} \equiv \mathcal {G} a _ {j}.\tag{5.205}
$$

Now show that the derivatives of $\Omega _ { n }$ with respect to a weight $w _ { r s }$ in the network can be written in the form 

$$
\frac {\partial \Omega_ {n}}{\partial w _ {r s}} = \sum_ {k} \alpha_ {k} \left\{\phi_ {k r} z _ {s} + \delta_ {k r} \alpha_ {s} \right\}\tag{5.206}
$$

where we have defined 

$$
\delta_ {k r} \equiv \frac {\partial y _ {k}}{\partial a _ {r}}, \quad \phi_ {k r} \equiv \mathcal {G} \delta_ {k r}.\tag{5.207}
$$

Write down the backpropagation equations for $\delta _ { k r }$ , and hence derive a set of backpropagation equations for the evaluation of the $\phi _ { k r }$ 

5.27 ( ) www Consider the framework for training with transformed data in the special case in which the transformation consists simply of the addition of random noise ${ \textbf { x } } \to { \textbf { x } } + \pmb { \xi }$ where $\boldsymbol { \xi }$ has a Gaussian distribution with zero mean and unit covariance. By following an argument analogous to that of Section 5.5.5, show that the resulting regularizer reduces to the Tikhonov form (5.135). 

5.28 () www Consider a neural network, such as the convolutional network discussed in Section 5.5.6, in which multiple weights are constrained to have the same value. Discuss how the standard backpropagation algorithm must be modified in order to ensure that such constraints are satisfied when evaluating the derivatives of an error function with respect to the adjustable parameters in the network. 

5.29 () www Verify the result (5.141). 

5.30 () Verify the result (5.142). 

5.31 () Verify the result (5.143). 

5.32 ( ) Show that the derivatives of the mixing coefficients $\{ \pi _ { k } \}$ , defined by (5.146), with respect to the auxiliary parameters $\{ \eta _ { j } \}$ are given by 

$$
\frac {\partial \pi_ {k}}{\partial \eta_ {j}} = \delta_ {j k} \pi_ {j} - \pi_ {j} \pi_ {k}.\tag{5.208}
$$

Hence, by making use of the constraint $\textstyle \sum _ { k } \pi _ { k } = 1$ , derive the result (5.147). 

5.33 () Write down a pair of equations that express the Cartesian coordinates $( x _ { 1 } , x _ { 2 } )$ for the robot arm shown in Figure 5.18 in terms of the joint angles $\theta _ { 1 }$ and $\theta _ { 2 }$ and the lengths $L _ { 1 }$ and $L _ { 2 }$ of the links. Assume the origin of the coordinate system is given by the attachment point of the lower arm. These equations define the ‘forward kinematics’ of the robot arm. 

5.34 () www Derive the result (5.155) for the derivative of the error function with respect to the network output activations controlling the mixing coefficients in the mixture density network. 

5.35 () Derive the result (5.156) for the derivative of the error function with respect to the network output activations controlling the component means in the mixture density network. 

5.36 () Derive the result (5.157) for the derivative of the error function with respect to the network output activations controlling the component variances in the mixture density network. 

5.37 () Verify the results (5.158) and (5.160) for the conditional mean and variance of the mixture density network model. 

5.38 () Using the general result (2.115), derive the predictive distribution (5.172) for the Laplace approximation to the Bayesian neural network model. 

5.39 () www Make use of the Laplace approximation result (4.135) to show that the evidence function for the hyperparameters α and $\beta$ in the Bayesian neural network model can be approximated by (5.175). 

5.40 () www Outline the modifications needed to the framework for Bayesian neural networks, discussed in Section 5.7.3, to handle multiclass problems using networks having softmax output-unit activation functions. 

5.41 ( ) By following analogous steps to those given in Section 5.7.1 for regression networks, derive the result (5.183) for the marginal likelihood in the case of a network having a cross-entropy error function and logistic-sigmoid output-unit activation function. 

## 6

# Kernel Methods

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/0a5d4ac963b507ac1c6fa91c08bfb953859575186bae636783b0daa447fc8ddf.jpg)


In Chapters 3 and 4, we considered linear parametric models for regression and classification in which the form of the mapping y(x, w) from input x to output y is governed by a vector w of adaptive parameters. During the learning phase, a set of training data is used either to obtain a point estimate of the parameter vector or to determine a posterior distribution over this vector. The training data is then discarded, and predictions for new inputs are based purely on the learned parameter vector w. This approach is also used in nonlinear parametric models such as neural networks. 

However, there is a class of pattern recognition techniques, in which the training data points, or a subset of them, are kept and used also during the prediction phase. For instance, the Parzen probability density model comprised a linear combination of ‘kernel’ functions each one centred on one of the training data points. Similarly, in Section 2.5.2 we introduced a simple technique for classification called nearest neighbours, which involved assigning to each new test vector the same label as the closest example from the training set. These are examples of memory-based methods that involve storing the entire training set in order to make predictions for future data points. They typically require a metric to be defined that measures the similarity of any two vectors in input space, and are generally fast to ‘train’ but slow at making predictions for test data points. 

Many linear parametric models can be re-cast into an equivalent ‘dual representation’ in which the predictions are also based on linear combinations of a kernel function evaluated at the training data points. As we shall see, for models which are based on a fixed nonlinear feature space mapping $\phi ( \mathbf { x } )$ , the kernel function is given by the relation 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \phi (\mathbf {x}) ^ {\mathrm{T}} \phi (\mathbf {x} ^ {\prime}).\tag{6.1}
$$

From this definition, we see that the kernel is a symmetric function of its arguments so that $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = k ( \mathbf { x } ^ { \prime } , \mathbf { x } )$ . The kernel concept was introduced into the field of pattern recognition by Aizerman et al. (1964) in the context of the method of potential functions, so-called because of an analogy with electrostatics. Although neglected for many years, it was re-introduced into machine learning in the context of largemargin classifiers by Boser et al. (1992) giving rise to the technique of support vector machines. Since then, there has been considerable interest in this topic, both in terms of theory and applications. One of the most significant developments has been the extension of kernels to handle symbolic objects, thereby greatly expanding the range of problems that can be addressed. 

The simplest example of a kernel function is obtained by considering the identity mapping for the feature space in (6.1) so that $\phi ( \mathbf { x } ) = \mathbf { x }$ , in which case $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) =$ $\mathbf { x } ^ { \mathrm { { T } } } \mathbf { \hat { x } } ^ { \prime }$ . We shall refer to this as the linear kernel. 

The concept of a kernel formulated as an inner product in a feature space allows us to build interesting extensions of many well-known algorithms by making use of the kernel trick, also known as kernel substitution. The general idea is that, if we have an algorithm formulated in such a way that the input vector x enters only in the form of scalar products, then we can replace that scalar product with some other choice of kernel. For instance, the technique of kernel substitution can be applied to principal component analysis in order to develop a nonlinear variant of PCA (Scholkopf¨ et al., 1998). Other examples of kernel substitution include nearest-neighbour classifiers and the kernel Fisher discriminant (Mika et al., 1999; Roth and Steinhage, 2000; Baudat and Anouar, 2000). 

There are numerous forms of kernel functions in common use, and we shall encounter several examples in this chapter. Many have the property of being a function only of the difference between the arguments, so that $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = k ( \mathbf { x } - \mathbf { x } ^ { \prime } )$ , which are known as stationary kernels because they are invariant to translations in input space. A further specialization involves homogeneous kernels, also known as radial basis functions, which depend only on the magnitude of the distance (typically Euclidean) between the arguments so that $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = k ( \| \mathbf { x } - \mathbf { x } ^ { \prime } \| )$ 

For recent textbooks on kernel methods, see Scholkopf and Smola (2002), Her- ¨ brich (2002), and Shawe-Taylor and Cristianini (2004). 

## 6.1. Dual Representations

Many linear models for regression and classification can be reformulated in terms of a dual representation in which the kernel function arises naturally. This concept will play an important role when we consider support vector machines in the next chapter. Here we consider a linear regression model whose parameters are determined by minimizing a regularized sum-of-squares error function given by 

$$
J (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \left\{\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) - t _ {n} \right\} ^ {2} + \frac {\lambda}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}\tag{6.2}
$$

where $\lambda \geqslant 0$ . If we set the gradient of $J ( \mathbf { w } )$ with respect to w equal to zero, we see that the solution for w takes the form of a linear combination of the vectors $\phi (  { \mathbf { x } } _ { n } )$ , with coefficients that are functions of w, of the form 

$$
\mathbf {w} = - \frac {1}{\lambda} \sum_ {n = 1} ^ {N} \left\{\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x} _ {n}) - t _ {n} \right\} \boldsymbol {\phi} (\mathbf {x} _ {n}) = \sum_ {n = 1} ^ {N} a _ {n} \boldsymbol {\phi} (\mathbf {x} _ {n}) = \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {a}\tag{6.3}
$$

where Φ is the design matrix, whose $n ^ { \mathrm { t h } }$ row is given by $\phi ( \mathbf { x } _ { n } ) ^ { \mathrm { T } }$ . Here the vector $\mathbf { a } = ( a _ { 1 } , \ldots , a _ { N } ) ^ { \mathrm { T } }$ , and we have defined 

$$
a _ {n} = - \frac {1}{\lambda} \left\{\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) - t _ {n} \right\}.\tag{6.4}
$$

Instead of working with the parameter vector w, we can now reformulate the leastsquares algorithm in terms of the parameter vector a, giving rise to a dual representation. If we substitute $\mathbf { w = \Phi \Phi ^ { \mathrm { T } } { \mathbf { \bullet } } }$ a into $J ( \mathbf { w } )$ , we obtain 

$$
J (\mathbf {a}) = \frac {1}{2} \mathbf {a} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {a} - \mathbf {a} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t} + \frac {1}{2} \mathbf {t} ^ {\mathrm{T}} \mathbf {t} + \frac {\lambda}{2} \mathbf {a} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {a}\tag{6.5}
$$

where $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . We now define the Gram matrix $\mathbf { K } = \Phi \mathbf { \Phi } \mathbf { \Phi } ^ { \mathrm { T } }$ , which is an $N \times N$ symmetric matrix with elements 

$$
K _ {n m} = \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) = k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\tag{6.6}
$$

where we have introduced the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ defined by (6.1). In terms of the Gram matrix, the sum-of-squares error function can be written as 

$$
J (\mathbf {a}) = \frac {1}{2} \mathbf {a} ^ {\mathrm{T}} \mathbf {K K a} - \mathbf {a} ^ {\mathrm{T}} \mathbf {K t} + \frac {1}{2} \mathbf {t} ^ {\mathrm{T}} \mathbf {t} + \frac {\lambda}{2} \mathbf {a} ^ {\mathrm{T}} \mathbf {K a}.\tag{6.7}
$$

Setting the gradient of $J ( \mathbf { a } )$ with respect to a to zero, we obtain the following solution 

$$
\mathbf {a} = \left(\mathbf {K} + \lambda \mathbf {I} _ {N}\right) ^ {- 1} \mathbf {t}.\tag{6.8}
$$

If we substitute this back into the linear regression model, we obtain the following prediction for a new input x 

$$
y (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x}) = \mathbf {a} ^ {\mathrm{T}} \boldsymbol {\Phi} \phi (\mathbf {x}) = \mathbf {k} (\mathbf {x}) ^ {\mathrm{T}} \left(\mathbf {K} + \lambda \mathbf {I} _ {N}\right) ^ {- 1} \mathbf {t}\tag{6.9}
$$

where we have defined the vector $\mathbf { k } ( \mathbf { x } )$ with elements $k _ { n } ( \mathbf { x } ) = k ( \mathbf { x } _ { n } , \mathbf { x } )$ . Thus we see that the dual formulation allows the solution to the least-squares problem to be expressed entirely in terms of the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ . This is known as a dual formulation because, by noting that the solution for a can be expressed as a linear combination of the elements of $\phi ( \mathbf { x } )$ , we recover the original formulation in terms of the parameter vector w. Note that the prediction at x is given by a linear combination of the target values from the training set. In fact, we have already obtained this result, using a slightly different notation, in Section 3.3.3. 

In the dual formulation, we determine the parameter vector a by inverting an $N \times N$ matrix, whereas in the original parameter space formulation we had to invert an $M \times M$ matrix in order to determine w. Because N is typically much larger than M, the dual formulation does not seem to be particularly useful. However, the advantage of the dual formulation, as we shall see, is that it is expressed entirely in terms of the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ We can therefore work directly in terms of kernels and avoid the explicit introduction of the feature vector $\phi ( \mathbf { x } )$ , which allows us implicitly to use feature spaces of high, even infinite, dimensionality. 

The existence of a dual representation based on the Gram matrix is a property of many linear models, including the perceptron. In Section 6.4, we will develop a duality between probabilistic linear models for regression and the technique of Gaussian processes. Duality will also play an important role when we discuss support vector machines in Chapter 7. 

## 6.2. Constructing Kernels

In order to exploit kernel substitution, we need to be able to construct valid kernel functions. One approach is to choose a feature space mapping $\phi ( \mathbf { x } )$ and then use this to find the corresponding kernel, as is illustrated in Figure 6.1. Here the kernel function is defined for a one-dimensional input space by 

$$
k (x, x ^ {\prime}) = \phi (x) ^ {\mathrm{T}} \phi (x ^ {\prime}) = \sum_ {i = 1} ^ {M} \phi_ {i} (x) \phi_ {i} (x ^ {\prime})\tag{6.10}
$$

where $\phi _ { i } ( x )$ are the basis functions. 

An alternative approach is to construct kernel functions directly. In this case, we must ensure that the function we choose is a valid kernel, in other words that it corresponds to a scalar product in some (perhaps infinite dimensional) feature space. As a simple example, consider a kernel function given by 

$$
k (\mathbf {x}, \mathbf {z}) = \left(\mathbf {x} ^ {\mathrm{T}} \mathbf {z}\right) ^ {2}.\tag{6.11}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/b059d0c8c797bee0c8932bfdef1082629afc417f0ba72bb426295489f4046942.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a0120d0f416ba57cbe5f554f3171bca4b9ec03924711a53c889c35a033a10f76.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/355f11d420feba31aab1ee39030e2a5b3e8506b887869bce2b49d68a096640da.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/f8dc7e653c2292d613aff64796870344c87cf05c26840581a20996f6a270c4f5.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/b9046c62a0cef930e75af369aa6ceffacbc7f02b0dd1c5dcf55731c19d3a0787.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/0dea52f9fce94713860ea48bd33333927605635ab3f58db76edbc92c16b79315.jpg)



Figure 6.1 Illustration of the construction of kernel functions starting from a corresponding set of basis func tions. In each column the lower plot shows the kernel function $k ( x , x ^ { \prime } )$ defined by (6.10) plotted as a function of $x$ for $x ^ { \prime } = 0$ , while the upper plot shows the corresponding basis functions given by polynomials (left column), ‘Gaussians’ (centre column), and logistic sigmoids (right column).


If we take the particular case of a two-dimensional input space $\mathbf { x } = \left( x _ { 1 } , x _ { 2 } \right)$ we can expand out the terms and thereby identify the corresponding nonlinear feature mapping 

$$
\begin{array}{r c l} {k (\mathbf {x}, \mathbf {z})} & = & {\left(\mathbf {x} ^ {\mathrm{T}} \mathbf {z}\right) ^ {2} = (x _ {1} z _ {1} + x _ {2} z _ {2}) ^ {2}} \\ & = & {x _ {1} ^ {2} z _ {1} ^ {2} + 2 x _ {1} z _ {1} x _ {2} z _ {2} + x _ {2} ^ {2} z _ {2} ^ {2}} \\ & = & {(x _ {1} ^ {2}, \sqrt {2} x _ {1} x _ {2}, x _ {2} ^ {2}) (z _ {1} ^ {2}, \sqrt {2} z _ {1} z _ {2}, z _ {2} ^ {2}) ^ {\mathrm{T}}} \\ & = & {\phi (\mathbf {x}) ^ {\mathrm{T}} \phi (\mathbf {z}).} \end{array}\tag{6.12}
$$

We see that the feature mapping takes the form $\phi ( \mathbf { x } ) \ = \ ( x _ { 1 } ^ { 2 } , \sqrt { 2 } x _ { 1 } x _ { 2 } , x _ { 2 } ^ { 2 } ) ^ { \mathrm { T } }$ and therefore comprises all possible second order terms, with a specific weighting between them. 

More generally, however, we need a simple way to test whether a function constitutes a valid kernel without having to construct the function $\phi ( \mathbf { x } )$ explicitly. A necessary and sufficient condition for a function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ to be a valid kernel (Shawe-Taylor and Cristianini, 2004) is that the Gram matrix K, whose elements are given by $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ , should be positive semidefinite for all possible choices of the set $\left\{ \mathbf { x } _ { n } \right\}$ Note that a positive semidefinite matrix is not the same thing as a matrix whose elements are nonnegative. 

One powerful technique for constructing new kernels is to build them out of simpler kernels as building blocks. This can be done using the following properties: 

## Techniques for Constructing New Kernels.

Given valid kernels $k _ { 1 } ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ and $k _ { 2 } ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ , the following new kernels will also be valid: 

$$
{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {c k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime})}\tag{6.13}
$$

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = f (\mathbf {x}) k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}) f (\mathbf {x} ^ {\prime})\tag{6.14}
$$

$$
{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {q (k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}))}\tag{6.15}
$$

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp (k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}))\tag{6.16}
$$

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}) + k _ {2} (\mathbf {x}, \mathbf {x} ^ {\prime})\tag{6.17}
$$

$$
{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}) k _ {2} (\mathbf {x}, \mathbf {x} ^ {\prime})}\tag{6.18}
$$

$$
{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {k _ {3} (\phi (\mathbf {x}), \phi (\mathbf {x} ^ {\prime}))}\tag{6.19}
$$

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \mathbf {x} ^ {\mathrm{T}} \mathbf {A} \mathbf {x} ^ {\prime}\tag{6.20}
$$

$$
{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {k _ {a} (\mathbf {x} _ {a}, \mathbf {x} _ {a} ^ {\prime}) + k _ {b} (\mathbf {x} _ {b}, \mathbf {x} _ {b} ^ {\prime})}\tag{6.21}
$$

$$
{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {k _ {a} (\mathbf {x} _ {a}, \mathbf {x} _ {a} ^ {\prime}) k _ {b} (\mathbf {x} _ {b}, \mathbf {x} _ {b} ^ {\prime})}\tag{6.22}
$$

where $c > 0$ is a constant, $f ( \cdot )$ is any function, $q ( \cdot )$ is a polynomial with nonnegative coefficients, $\phi ( \mathbf { x } )$ is a function from x to $\bar { \mathbb { R } ^ { M } } , k _ { 3 } ( \cdot , \cdot )$ is a valid kernel in $\mathbb { R } ^ { M }$ , A is a symmetric positive semidefinite matrix, $\mathbf { x } _ { a }$ and $\mathbf { x } _ { b }$ are variables (not necessarily disjoint) with $\mathbf { x } = ( \mathbf { x } _ { a } , \mathbf { x } _ { b } )$ , and $k _ { a }$ and $k _ { b }$ are valid kernel functions over their respective spaces. 

Equipped with these properties, we can now embark on the construction of more complex kernels appropriate to specific applications. We require that the kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ be symmetric and positive semidefinite and that it expresses the appropriate form of similarity between x and $\mathbf { x } ^ { \prime }$ according to the intended application. Here we consider a few common examples of kernel functions. For a more extensive discussion of ‘kernel engineering’, see Shawe-Taylor and Cristianini (2004). 

We saw that the simple polynomial kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \left( \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime } \right) ^ { 2 }$ contains only terms of degree two. If we consider the slightly generalized kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) ~ =$ $\left( \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime } + c \right) ^ { 2 }$ with $c > 0$ , then the corresponding feature mapping $\phi ( \mathbf { x } )$ contains constant and linear terms as well as terms of order two. Similarly, $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \left( \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime } \right) ^ { M }$ contains all monomials of order M. For instance, if x and $\mathbf { x } ^ { \prime }$ are two images, then the kernel represents a particular weighted sum of all possible products of M pixels in the first image with M pixels in the second image. This can similarly be generalized to include all terms up to degree M by considering $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \left( \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime } + c \right) ^ { M }$ with $c > 0$ . Using the results (6.17) and (6.18) for combining kernels we see that these will all be valid kernel functions. 

Another commonly used kernel takes the form 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp \left(- \| \mathbf {x} - \mathbf {x} ^ {\prime} \| ^ {2} / 2 \sigma^ {2}\right)\tag{6.23}
$$

and is often called a ‘Gaussian’ kernel. Note, however, that in this context it is not interpreted as a probability density, and hence the normalization coefficient is omitted. We can see that this is a valid kernel by expanding the square 

$$
\left\| \mathbf {x} - \mathbf {x} ^ {\prime} \right\| ^ {2} = \mathbf {x} ^ {\mathrm{T}} \mathbf {x} + \left(\mathbf {x} ^ {\prime}\right) ^ {\mathrm{T}} \mathbf {x} ^ {\prime} - 2 \mathbf {x} ^ {\mathrm{T}} \mathbf {x} ^ {\prime}\tag{6.24}
$$

to give 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp \left(- \mathbf {x} ^ {\mathrm{T}} \mathbf {x} / 2 \sigma^ {2}\right) \exp \left(\mathbf {x} ^ {\mathrm{T}} \mathbf {x} ^ {\prime} / \sigma^ {2}\right) \exp \left(- (\mathbf {x} ^ {\prime}) ^ {\mathrm{T}} \mathbf {x} ^ {\prime} / 2 \sigma^ {2}\right)\tag{6.25}
$$

and then making use of (6.14) and (6.16), together with the validity of the linear kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ . Note that the feature vector that corresponds to the Gaussian kernel has infinite dimensionality. 

The Gaussian kernel is not restricted to the use of Euclidean distance. If we use kernel substitution in (6.24) to replace $\mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ with a nonlinear kernel $\kappa ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ , we obtain 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp \left\{- \frac {1}{2 \sigma^ {2}} \left(\kappa (\mathbf {x}, \mathbf {x}) + \kappa (\mathbf {x} ^ {\prime}, \mathbf {x} ^ {\prime}) - 2 \kappa (\mathbf {x}, \mathbf {x} ^ {\prime})\right) \right\}.\tag{6.26}
$$

An important contribution to arise from the kernel viewpoint has been the extension to inputs that are symbolic, rather than simply vectors of real numbers. Kernel functions can be defined over objects as diverse as graphs, sets, strings, and text documents. Consider, for instance, a fixed set and define a nonvectorial space consisting of all possible subsets of this set. If $A _ { 1 }$ and $A _ { 2 }$ are two such subsets then one simple choice of kernel would be 

$$
k (A _ {1}, A _ {2}) = 2 ^ {| A _ {1} \cap A _ {2} |}\tag{6.27}
$$

where $A _ { 1 } \cap A _ { 2 }$ denotes the intersection of sets $A _ { 1 }$ and $A _ { 2 }$ , and $| A |$ denotes the number of subsets in A. This is a valid kernel function because it can be shown to correspond to an inner product in a feature space. 

One powerful approach to the construction of kernels starts from a probabilistic generative model (Haussler, 1999), which allows us to apply generative models in a discriminative setting. Generative models can deal naturally with missing data and in the case of hidden Markov models can handle sequences of varying length. By contrast, discriminative models generally give better performance on discriminative tasks than generative models. It is therefore of some interest to combine these two approaches (Lasserre et al., 2006). One way to combine them is to use a generative model to define a kernel, and then use this kernel in a discriminative approach. 

Given a generative model $p ( \mathbf { x } )$ we can define a kernel by 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = p (\mathbf {x}) p (\mathbf {x} ^ {\prime}).\tag{6.28}
$$

This is clearly a valid kernel function because we can interpret it as an inner product in the one-dimensional feature space defined by the mapping $p ( \mathbf { x } )$ . It says that two inputs x and $\mathbf { x } ^ { \prime }$ are similar if they both have high probabilities. We can use (6.13) and (6.17) to extend this class of kernels by considering sums over products of different probability distributions, with positive weighting coefficients $p ( i )$ , of the form 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \sum_ {i} p (\mathbf {x} | i) p (\mathbf {x} ^ {\prime} | i) p (i).\tag{6.29}
$$

This is equivalent, up to an overall multiplicative constant, to a mixture distribution in which the components factorize, with the index i playing the role of a ‘latent variable. Two inputs x and $\mathbf { x } ^ { \prime }$ will give a large value for the kernel function, and hence appear similar, if they have significant probability under a range of different components. Taking the limit of an infinite sum, we can also consider kernels of the form 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \int p (\mathbf {x} | \mathbf {z}) p (\mathbf {x} ^ {\prime} | \mathbf {z}) p (\mathbf {z}) d \mathbf {z}\tag{6.30}
$$

where z is a continuous latent variable. 

Now suppose that our data consists of ordered sequences of length $L$ so that an observation is given by $\textbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { L } \}$ . A popular generative model for sequences is the hidden Markov model, which expresses the distribution $p ( \mathbf { X } )$ as a marginalization over a corresponding sequence of hidden states $\mathbf { Z } = \{ \mathbf { z } _ { 1 } , \ldots , \mathbf { z } _ { L } \}$ We can use this approach to define a kernel function measuring the similarity of two sequences X and $\mathbf { X } ^ { \prime }$ by extending the mixture representation (6.29) to give 

$$
k (\mathbf {X}, \mathbf {X} ^ {\prime}) = \sum_ {\mathbf {Z}} p (\mathbf {X} | \mathbf {Z}) p (\mathbf {X} ^ {\prime} | \mathbf {Z}) p (\mathbf {Z})\tag{6.31}
$$

so that both observed sequences are generated by the same hidden sequence Z. This model can easily be extended to allow sequences of differing length to be compared. 

An alternative technique for using generative models to define kernel functions is known as the Fisher kernel (Jaakkola and Haussler, 1999). Consider a parametric generative model $p ( \mathbf { x } | \mathbf { \boldsymbol { \theta } } )$ where $\pmb \theta$ denotes the vector of parameters. The goal is to find a kernel that measures the similarity of two input vectors x and $\mathbf { x } ^ { \prime }$ induced by the generative model. Jaakkola and Haussler (1999) consider the gradient with respect to $\theta ,$ which defines a vector in a ‘feature’ space having the same dimensionality as θ. In particular, they consider the Fisher score 

$$
\mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) = \nabla_ {\boldsymbol {\theta}} \ln p (\mathbf {x} | \boldsymbol {\theta})\tag{6.32}
$$

from which the Fisher kernel is defined by 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) ^ {\mathrm{T}} \mathbf {F} ^ {- 1} \mathbf {g} (\boldsymbol {\theta}, \mathbf {x} ^ {\prime}).\tag{6.33}
$$

Here F is the Fisher information matrix, given by 

$$
\mathbf {F} = \mathbb {E} _ {\mathbf {x}} \left[ \mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) \mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) ^ {\mathrm{T}} \right]\tag{6.34}
$$

where the expectation is with respect to x under the distribution $p ( \mathbf { x } | \mathbf { \boldsymbol { \theta } } )$ . This can be motivated from the perspective of information geometry (Amari, 1998), which considers the differential geometry of the space of model parameters. Here we simply note that the presence of the Fisher information matrix causes this kernel to be invariant under a nonlinear re-parameterization of the density model $\theta  \psi ( \theta )$ 

In practice, it is often infeasible to evaluate the Fisher information matrix. One approach is simply to replace the expectation in the definition of the Fisher information with the sample average, giving 

$$
\mathbf {F} \simeq \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {g} (\boldsymbol {\theta}, \mathbf {x} _ {n}) \mathbf {g} (\boldsymbol {\theta}, \mathbf {x} _ {n}) ^ {\mathrm{T}}.\tag{6.35}
$$

Section 12.1.3 

This is the covariance matrix of the Fisher scores, and so the Fisher kernel corresponds to a whitening of these scores. More simply, we can just omit the Fisher information matrix altogether and use the noninvariant kernel 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) ^ {\mathrm{T}} \mathbf {g} (\boldsymbol {\theta}, \mathbf {x} ^ {\prime}).\tag{6.36}
$$

An application of Fisher kernels to document retrieval is given by Hofmann (2000). A final example of a kernel function is the sigmoidal kernel given by 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \tanh \left(a \mathbf {x} ^ {\mathrm{T}} \mathbf {x} ^ {\prime} + b\right)\tag{6.37}
$$

whose Gram matrix in general is not positive semidefinite. This form of kernel has, however, been used in practice (Vapnik, 1995), possibly because it gives kernel expansions such as the support vector machine a superficial resemblance to neural network models. As we shall see, in the limit of an infinite number of basis functions, a Bayesian neural network with an appropriate prior reduces to a Gaussian process, thereby providing a deeper link between neural networks and kernel methods. 

Section 6.4.7 

## 6.3. Radial Basis Function Networks

In Chapter 3, we discussed regression models based on linear combinations of fixed basis functions, although we did not discuss in detail what form those basis functions might take. One choice that has been widely used is that of radial basis functions, which have the property that each basis function depends only on the radial distance (typically Euclidean) from a centre $\mu _ { j }$ , so that $\phi _ { j } ( \mathbf { x } ) = h ( \| \mathbf { x } - \pmb { \mu } _ { j } \| )$ 

Historically, radial basis functions were introduced for the purpose of exact function interpolation (Powell, 1987). Given a set of input vectors $\{ \mathbf { x } _ { 1 } , \hdots , \mathbf { x } _ { N } \}$ along with corresponding target values $\{ t _ { 1 } , \ldots , t _ { N } \}$ , the goal is to find a smooth function $f ( \mathbf { x } )$ that fits every target value exactly, so that $f ( \mathbf { x } _ { n } ) = t _ { n }$ for $n = 1 , \ldots , N$ . This is achieved by expressing $f ( \mathbf { x } )$ as a linear combination of radial basis functions, one centred on every data point 

$$
f (\mathbf {x}) = \sum_ {n = 1} ^ {N} w _ {n} h (\| \mathbf {x} - \mathbf {x} _ {n} \|).\tag{6.38}
$$

The values of the coefficients $\{ w _ { n } \}$ are found by least squares, and because there are the same number of coefficients as there are constraints, the result is a function that fits every target value exactly. In pattern recognition applications, however, the target values are generally noisy, and exact interpolation is undesirable because this corresponds to an over-fitted solution. 

Expansions in radial basis functions also arise from regularization theory (Poggio and Girosi, 1990; Bishop, 1995a). For a sum-of-squares error function with a regularizer defined in terms of a differential operator, the optimal solution is given by an expansion in the Green’s functions of the operator (which are analogous to the eigenvectors of a discrete matrix), again with one basis function centred on each data point. If the differential operator is isotropic then the Green’s functions depend only on the radial distance from the corresponding data point. Due to the presence of the regularizer, the solution no longer interpolates the training data exactly. 

Another motivation for radial basis functions comes from a consideration of the interpolation problem when the input (rather than the target) variables are noisy (Webb, 1994; Bishop, 1995a). If the noise on the input variable x is described by a variable $\boldsymbol { \xi }$ having a distribution $\nu ( \pmb { \xi } )$ , then the sum-of-squares error function becomes 

$$
E = \frac {1}{2} \sum_ {n = 1} ^ {N} \int \left\{y (\mathbf {x} _ {n} + \pmb {\xi}) - t _ {n} \right\} ^ {2} \nu (\pmb {\xi}) \mathrm{d} \pmb {\xi}.\tag{6.39}
$$

Using the calculus of variations, we can optimize with respect to the function $f ( \mathbf { x } )$ to give 

$$
y (\mathbf {x} _ {n}) = \sum_ {n = 1} ^ {N} t _ {n} h (\mathbf {x} - \mathbf {x} _ {n})\tag{6.40}
$$

where the basis functions are given by 

$$
h (\mathbf {x} - \mathbf {x} _ {n}) = \frac {\nu (\mathbf {x} - \mathbf {x} _ {n})}{\sum_ {n = 1} ^ {N} \nu (\mathbf {x} - \mathbf {x} _ {n})}.\tag{6.41}
$$

We see that there is one basis function centred on every data point. This is known as the Nadaraya-Watson model and will be derived again from a different perspective in Section 6.3.1. If the noise distribution $\nu ( \pmb { \xi } )$ is isotropic, so that it is a function only of ξ , then the basis functions will be radial. 

Note that the basis functions (6.41) are normalized, so that $\begin{array} { r } { \sum _ { n } h ( \mathbf x - \mathbf x _ { n } ) = 1 } \end{array}$ for any value of x. The effect of such normalization is shown in Figure 6.2. Normalization is sometimes used in practice as it avoids having regions of input space where all of the basis functions take small values, which would necessarily lead to predictions in such regions that are either small or controlled purely by the bias parameter. 

Another situation in which expansions in normalized radial basis functions arise is in the application of kernel density estimation to the problem of regression, as we shall discuss in Section 6.3.1. 

Because there is one basis function associated with every data point, the corresponding model can be computationally costly to evaluate when making predictions for new data points. Models have therefore been proposed (Broomhead and Lowe, 1988; Moody and Darken, 1989; Poggio and Girosi, 1990), which retain the expansion in radial basis functions but where the number M of basis functions is smaller than the number N of data points. Typically, the number of basis functions, and the locations $\pmb { \mu } _ { i }$ of their centres, are determined based on the input data $\left\{ { \bf x } _ { n } \right\}$ alone. The basis functions are then kept fixed and the coefficients $\{ w _ { i } \}$ are determined by least squares by solving the usual set of linear equations, as discussed in Section 3.1.1. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/6332f41c129c4eb8aa3802f2caa656d8287f604d280ab560b141c4a582105a5a.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/65ae801c71169ff63e05d15be319c9cf2585dc028e9505be8eeb2d96c9af36a4.jpg)



Figure 6.2 Plot of a set of Gaussian basis functions on the left, together with the corresponding normalized basis functions on the right.


One of the simplest ways of choosing basis function centres is to use a randomly chosen subset of the data points. A more systematic approach is called orthogonal least squares (Chen et al., 1991). This is a sequential selection process in which at each step the next data point to be chosen as a basis function centre corresponds to the one that gives the greatest reduction in the sum-of-squares error. Values for the expansion coefficients are determined as part of the algorithm. Clustering algorithms such as K-means have also been used, which give a set of basis function centres that no longer coincide with training data points. 

## 6.3.1 Nadaraya-Watson model

In Section 3.3.3, we saw that the prediction of a linear regression model for a new input x takes the form of a linear combination of the training set target values with coefficients given by the ‘equivalent kernel’ (3.62) where the equivalent kernel satisfies the summation constraint (3.64). 

We can motivate the kernel regression model (3.61) from a different perspective, starting with kernel density estimation. Suppose we have a training set $\{ \mathbf { x } _ { n } , t _ { n } \}$ and we use a Parzen density estimator to model the joint distribution $\boldsymbol { p } ( \mathbf { x } , t )$ , so that 

$$
p (\mathbf {x}, t) = \frac {1}{N} \sum_ {n = 1} ^ {N} f (\mathbf {x} - \mathbf {x} _ {n}, t - t _ {n})\tag{6.42}
$$

where $f ( \mathbf { x } , t )$ is the component density function, and there is one such component centred on each data point. We now find an expression for the regression function $y ( \mathbf x )$ , corresponding to the conditional average of the target variable conditioned on 

the input variable, which is given by 

$$
\begin{array}{r c l} y (\mathbf {x}) & = & \mathbb {E} [ t | \mathbf {x} ] = \int_ {- \infty} ^ {\infty} t p (t | \mathbf {x})   \mathrm{d} t \\ & = & \frac {\int t p (\mathbf {x} , t)   \mathrm{d} t}{\int p (\mathbf {x} , t)   \mathrm{d} t} \\ & = & \frac {\sum_ {n} \int t f (\mathbf {x} - \mathbf {x} _ {n} , t - t _ {n})   \mathrm{d} t}{\sum_ {m} \int f (\mathbf {x} - \mathbf {x} _ {m} , t - t _ {m})   \mathrm{d} t}. \end{array}\tag{6.43}
$$

We now assume for simplicity that the component density functions have zero mean so that 

$$
\int_ {- \infty} ^ {\infty} f (\mathbf {x}, t) t \mathrm{d} t = 0\tag{6.44}
$$

for all values of x. Using a simple change of variable, we then obtain 

$$
\begin{array}{r c l} y (\mathbf {x}) & = & \frac {\sum_ {n} g (\mathbf {x} - \mathbf {x} _ {n}) t _ {n}}{\sum_ {m} g (\mathbf {x} - \mathbf {x} _ {m})} \\ & = & \sum_ {n} k (\mathbf {x}, \mathbf {x} _ {n}) t _ {n} \end{array}\tag{6.45}
$$

where $n , m = 1 , \ldots , N$ and the kernel function $k ( \mathbf { x } , \mathbf { x } _ { n } )$ is given by 

$$
k (\mathbf {x}, \mathbf {x} _ {n}) = \frac {g (\mathbf {x} - \mathbf {x} _ {n})}{\sum_ {m} g (\mathbf {x} - \mathbf {x} _ {m})}\tag{6.46}
$$

and we have defined 

$$
g (\mathbf {x}) = \int_ {- \infty} ^ {\infty} f (\mathbf {x}, t) \mathrm{d} t.\tag{6.47}
$$

The result (6.45) is known as the Nadaraya-Watson model, or kernel regression (Nadaraya, 1964; Watson, 1964). For a localized kernel function, it has the property of giving more weight to the data points ${ \bf x } _ { n }$ that are close to x. Note that the kernel (6.46) satisfies the summation constraint 

$$
\sum_ {n = 1} ^ {N} k (\mathbf {x}, \mathbf {x} _ {n}) = 1.
$$


Figure 6.3 Illustration of the Nadaraya-Watson kernel regression model using isotropic Gaussian kernels, for the sinusoidal data set. The original sine function is shown by the green curve, the data points are shown in blue, and each is the centre of an isotropic Gaussian kernel. The resulting regression function, given by the conditional mean, is shown by the red line, along with the twostandard-deviation region for the conditional distribution $p ( t | x )$ shown by the red shading. The blue ellipse around each data point shows one standard deviation contour for the corresponding kernel. These appear noncircular due to the different scales on the horizontal and vertical axes.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/1f702168b0d5afde8b41d4e22800d7ead91ada0a2003620b171e8356b049577f.jpg)


In fact, this model defines not only a conditional expectation but also a full conditional distribution given by 

$$
p (t | \mathbf {x}) = \frac {p (t , \mathbf {x})}{\int p (t , \mathbf {x}) \mathrm{d} t} = \frac {\sum_ {n} f (\mathbf {x} - \mathbf {x} _ {n} , t - t _ {n})}{\sum_ {m} \int f (\mathbf {x} - \mathbf {x} _ {m} , t - t _ {m}) \mathrm{d} t}\tag{6.48}
$$

from which other expectations can be evaluated. 

As an illustration we consider the case of a single input variable x in which $f ( x , t )$ is given by a zero-mean isotropic Gaussian over the variable ${ \bf z } = ( x , t )$ with variance $\bar { \sigma ^ { 2 } }$ . The corresponding conditional distribution (6.48) is given by a Gaussian mixture, and is shown, together with the conditional mean, for the sinusoidal synthetic data set in Figure 6.3. 

An obvious extension of this model is to allow for more flexible forms of Gaussian components, for instance having different variance parameters for the input and target variables. More generally, we could model the joint distribution $p ( t , \mathbf { x } )$ using a Gaussian mixture model, trained using techniques discussed in Chapter 9 (Ghahramani and Jordan, 1994), and then find the corresponding conditional distribution $p ( t | \mathbf { x } )$ . In this latter case we no longer have a representation in terms of kernel functions evaluated at the training set data points. However, the number of components in the mixture model can be smaller than the number of training set points, resulting in a model that is faster to evaluate for test data points. We have thereby accepted an increased computational cost during the training phase in order to have a model that is faster at making predictions. 

## 6.4. Gaussian Processes

In Section 6.1, we introduced kernels by applying the concept of duality to a nonprobabilistic model for regression. Here we extend the role of kernels to probabilistic discriminative models, leading to the framework of Gaussian processes. We shall thereby see how kernels arise naturally in a Bayesian setting. 

In Chapter 3, we considered linear regression models of the form $y ( \mathbf { x } , \mathbf { w } ) =$ $\mathbf { w } ^ { \mathrm { T } } \phi ( \mathbf { x } )$ in which w is a vector of parameters and $\phi ( \mathbf { x } )$ is a vector of fixed nonlinear basis functions that depend on the input vector x. We showed that a prior distribution over w induced a corresponding prior distribution over functions $y ( \mathbf { x } , \mathbf { w } )$ . Given a training data set, we then evaluated the posterior distribution over w and thereby obtained the corresponding posterior distribution over regression functions, which in turn (with the addition of noise) implies a predictive distribution $p ( t | \mathbf { x } )$ for new input vectors x. 

In the Gaussian process viewpoint, we dispense with the parametric model and instead define a prior probability distribution over functions directly. At first sight, it might seem difficult to work with a distribution over the uncountably infinite space of functions. However, as we shall see, for a finite training set we only need to consider the values of the function at the discrete set of input values ${ \bf x } _ { n }$ corresponding to the training set and test set data points, and so in practice we can work in a finite space. 

Models equivalent to Gaussian processes have been widely studied in many different fields. For instance, in the geostatistics literature Gaussian process regression is known as kriging (Cressie, 1993). Similarly, ARMA (autoregressive moving average) models, Kalman filters, and radial basis function networks can all be viewed as forms of Gaussian process models. Reviews of Gaussian processes from a machine learning perspective can be found in MacKay (1998), Williams (1999), and MacKay (2003), and a comparison of Gaussian process models with alternative approaches is given in Rasmussen (1996). See also Rasmussen and Williams (2006) for a recent textbook on Gaussian processes. 

## 6.4.1 Linear regression revisited

In order to motivate the Gaussian process viewpoint, let us return to the linear regression example and re-derive the predictive distribution by working in terms of distributions over functions $y ( \mathbf { x } , \mathbf { w } )$ . This will provide a specific example of a Gaussian process. 

Consider a model defined in terms of a linear combination of M fixed basis functions given by the elements of the vector $\phi ( \mathbf { x } )$ so that 

$$
y (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x})\tag{6.49}
$$

where x is the input vector and w is the M-dimensional weight vector. Now consider a prior distribution over w given by an isotropic Gaussian of the form 

$$
p (\mathbf {w}) = \mathcal {N} (\mathbf {w} | \mathbf {0}, \alpha^ {- 1} \mathbf {I})\tag{6.50}
$$

governed by the hyperparameter α, which represents the precision (inverse variance) of the distribution. For any given value of w, the definition (6.49) defines a particular function of x. The probability distribution over w defined by (6.50) therefore induces a probability distribution over functions $y ( \mathbf x )$ . In practice, we wish to eval uate this function at specific values of x, for example at the training data points $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ . We are therefore interested in the joint distribution of the function values $y ( \mathbf { x } _ { 1 } ) , \ldots , y ( \mathbf { x } _ { N } )$ , which we denote by the vector y with elements $y _ { n } = y ( \mathbf { x } _ { n } )$ for $n = 1 , \ldots , N$ . From (6.49), this vector is given by 

$$
\mathbf {y} = \boldsymbol {\Phi} \mathbf {w}\tag{6.51}
$$

where $\Phi$ is the design matrix with elements $\Phi _ { n k } = \phi _ { k } ( \mathbf { x } _ { n } )$ . We can find the probability distribution of y as follows. First of all we note that y is a linear combination of Gaussian distributed variables given by the elements of w and hence is itself Gaussian. We therefore need only to find its mean and covariance, which are given from (6.50) by 

Exercise 2.31 

$$
{\mathbb {E} [ \mathbf {y} ]} = {\boldsymbol {\Phi} \mathbb {E} [ \mathbf {w} ] = \mathbf {0}}\tag{6.52}
$$

$$
\operatorname{cov} [ \mathbf {y} ] = \mathbb {E} \left[ \mathbf {y y} ^ {\mathrm{T}} \right] = \boldsymbol {\Phi} \mathbb {E} \left[ \mathbf {w w} ^ {\mathrm{T}} \right] \boldsymbol {\Phi} ^ {\mathrm{T}} = \frac {1}{\alpha} \boldsymbol {\Phi} \boldsymbol {\Phi} ^ {\mathrm{T}} = \mathbf {K}\tag{6.53}
$$

where K is the Gram matrix with elements 

$$
K _ {n m} = k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = \frac {1}{\alpha} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m})\tag{6.54}
$$

and $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ is the kernel function. 

This model provides us with a particular example of a Gaussian process. In general, a Gaussian process is defined as a probability distribution over functions $y ( \mathbf x )$ such that the set of values of $y ( \mathbf x )$ evaluated at an arbitrary set of points $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ jointly have a Gaussian distribution. In cases where the input vector x is two dimensional, this may also be known as a Gaussian random field. More generally, a stochastic process $y ( \mathbf x )$ is specified by giving the joint probability distribution for any finite set of values $y ( \mathbf { x } _ { 1 } ) , \ldots , y ( \mathbf { x } _ { N } )$ in a consistent manner. 

A key point about Gaussian stochastic processes is that the joint distribution over N variables $y _ { 1 } , \ldots , y _ { N }$ is specified completely by the second-order statistics, namely the mean and the covariance. In most applications, we will not have any prior knowledge about the mean of $y ( \mathbf x )$ and so by symmetry we take it to be zero. This is equivalent to choosing the mean of the prior over weight values $p ( \mathbf { w } | \alpha )$ to be zero in the basis function viewpoint. The specification of the Gaussian process is then completed by giving the covariance of $y ( \mathbf x )$ evaluated at any two values of x, which is given by the kernel function 

$$
\mathbb {E} \left[ y (\mathbf {x} _ {n}) y (\mathbf {x} _ {m}) \right] = k (\mathbf {x} _ {n}, \mathbf {x} _ {m}).\tag{6.55}
$$

For the specific case of a Gaussian process defined by the linear regression model (6.49) with a weight prior (6.50), the kernel function is given by (6.54). 

We can also define the kernel function directly, rather than indirectly through a choice of basis function. Figure 6.4 shows samples of functions drawn from Gaussian processes for two different choices of kernel function. The first of these is a ‘Gaussian’ kernel of the form (6.23), and the second is the exponential kernel given by 

$$
k (x, x ^ {\prime}) = \exp (- \theta | x - x ^ {\prime} |)\tag{6.56}
$$

which corresponds to the Ornstein-Uhlenbeck process originally introduced by Uhlenbeck and Ornstein (1930) to describe Brownian motion. 

Figure 6.4 Samples from Gaussian processes for a ‘Gaussian’ kernel (left) and an exponential kernel (right). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/f1580c4eecf8708fa5294d5cb34d71b44fcf1c70e02f1455020216fbee83ba5a.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/fe366e648fbbeb8b1305624c2fdfacc58892c5ce4c90f2713714474691248af4.jpg)


## 6.4.2 Gaussian processes for regression

In order to apply Gaussian process models to the problem of regression, we need to take account of the noise on the observed target values, which are given by 

$$
t _ {n} = y _ {n} + \epsilon_ {n}\tag{6.57}
$$

where $y _ { n } = y ( \mathbf { x } _ { n } )$ , and $\epsilon _ { n }$ is a random noise variable whose value is chosen independently for each observation n. Here we shall consider noise processes that have a Gaussian distribution, so that 

$$
p (t _ {n} | y _ {n}) = \mathcal {N} (t _ {n} | y _ {n}, \beta^ {- 1})\tag{6.58}
$$

where $\beta$ is a hyperparameter representing the precision of the noise. Because the noise is independent for each data point, the joint distribution of the target values $\mathbf { t } = ( t _ { 1 } , \ldots , { \bar { t } } _ { N } ) ^ { \mathrm { T } }$ conditioned on the values of $\pmb { \ y } = ( y _ { 1 } , \dots , y _ { N } ) ^ { \mathrm { T } }$ is given by an isotropic Gaussian of the form 

$$
p (\mathbf {t} | \mathbf {y}) = \mathcal {N} (\mathbf {t} | \mathbf {y}, \beta^ {- 1} \mathbf {I} _ {N})\tag{6.59}
$$

where ${ \mathbf { I } } _ { N }$ denotes the $N \times N$ unit matrix. From the definition of a Gaussian process, the marginal distribution $p ( \pmb { \mathsf { y } } )$ is given by a Gaussian whose mean is zero and whose covariance is defined by a Gram matrix K so that 

$$
p (\mathbf {y}) = \mathcal {N} (\mathbf {y} | \mathbf {0}, \mathbf {K}).\tag{6.60}
$$

The kernel function that determines K is typically chosen to express the property that, for points ${ \bf x } _ { n }$ and $\mathbf { x } _ { m }$ that are similar, the corresponding values $y ( \mathbf { x } _ { n } )$ and $y ( \mathbf { x } _ { m } )$ will be more strongly correlated than for dissimilar points. Here the notion of similarity will depend on the application. 

In order to find the marginal distribution $p ( \mathbf { t } )$ , conditioned on the input values $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ , we need to integrate over y. This can be done by making use of the results from Section 2.3.3 for the linear-Gaussian model. Using (2.115), we see that the marginal distribution of t is given by 

$$
p (\mathbf {t}) = \int p (\mathbf {t} | \mathbf {y}) p (\mathbf {y}) \mathrm{d} \mathbf {y} = \mathcal {N} (\mathbf {t} | \mathbf {0}, \mathbf {C})\tag{6.61}
$$

where the covariance matrix C has elements 

$$
C (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) + \beta^ {- 1} \delta_ {n m}.\tag{6.62}
$$

This result reflects the fact that the two Gaussian sources of randomness, namely that associated with $y ( \mathbf x )$ and that associated with , are independent and so their covariances simply add. 

One widely used kernel function for Gaussian process regression is given by the exponential of a quadratic form, with the addition of constant and linear terms to give 

$$
k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = \theta_ {0} \exp \left\{- \frac {\theta_ {1}}{2} \| \mathbf {x} _ {n} - \mathbf {x} _ {m} \| ^ {2} \right\} + \theta_ {2} + \theta_ {3} \mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {x} _ {m}.\tag{6.63}
$$

Note that the term involving $\theta _ { 3 }$ corresponds to a parametric model that is a linear function of the input variables. Samples from this prior are plotted for various values of the parameters $\theta _ { 0 } , \ldots , \theta _ { 3 }$ in Figure 6.5, and Figure 6.6 shows a set of points sampled from the joint distribution (6.60) along with the corresponding values defined by (6.61). 

So far, we have used the Gaussian process viewpoint to build a model of the joint distribution over sets of data points. Our goal in regression, however, is to make predictions of the target variables for new inputs, given a set of training data. Let us suppose that $\mathbf t _ { N } = ( \bar { t } _ { 1 } , \dots , t _ { N } ) ^ { \mathrm T }$ , corresponding to input values $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ comprise the observed training set, and our goal is to predict the target variable $t _ { N + 1 }$ for a new input vector $\mathbf { x } _ { N + 1 }$ . This requires that we evaluate the predictive distribution $p ( t _ { N + 1 } | \mathbf { t } _ { N } )$ . Note that this distribution is conditioned also on the variables $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ and $\mathbf { x } _ { N + 1 }$ . However, to keep the notation simple we will not show these conditioning variables explicitly. 

To find the conditional distribution $p ( t _ { N + 1 } | \mathbf { t } )$ , we begin by writing down the joint distribution $p ( \mathbf { t } _ { N + 1 } )$ , where $\mathbf { t } _ { N + 1 }$ denotes the vector $( t _ { 1 } , \ldots , t _ { N } , t _ { N + 1 } ) ^ { \mathrm { T } }$ . We then apply the results from Section 2.3.1 to obtain the required conditional distribution, as illustrated in Figure 6.7. 

From (6.61), the joint distribution over $t _ { 1 } , \ldots , t _ { N + 1 }$ will be given by 

$$
p (\mathbf {t} _ {N + 1}) = \mathcal {N} (\mathbf {t} _ {N + 1} | \mathbf {0}, \mathbf {C} _ {N + 1})\tag{6.64}
$$

where ${ \bf C } _ { N + 1 }$ is an $( N + 1 ) \times ( N + 1 )$ covariance matrix with elements given by (6.62). Because this joint distribution is Gaussian, we can apply the results from Section 2.3.1 to find the conditional Gaussian distribution. To do this, we partition the covariance matrix as follows 

$$
\mathbf {C} _ {N + 1} = \left( \begin{array}{c c} \mathbf {C} _ {N} & \mathbf {k} \\ \mathbf {k} ^ {\mathrm{T}} & c \end{array} \right)\tag{6.65}
$$

where $\mathbf { C } _ { N }$ is the $N \times N$ covariance matrix with elements given by (6.62) for $n , m =$ $1 , \ldots , N$ , the vector k has elements $k ( \mathbf { x } _ { n } , \mathbf { x } _ { N + 1 } )$ for $n = 1 , \ldots , N$ , and the scalar $c = k ( \mathbf { x } _ { N + 1 } , \mathbf { x } _ { N + 1 } ) + \beta ^ { - 1 }$ . Using the results (2.81) and (2.82), we see that the conditional distribution $p ( t _ { N + 1 } | \mathbf { t } )$ is a Gaussian distribution with mean and covariance given by 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/b5ef3fe223a3c7f0a9ea56131adf62b6194e880f9a982e51cfe9c0b6ec7282e9.jpg)



Figure 6.5 Samples from a Gaussian process prior defined by the covariance function (6.63). The title above each plot denotes $( \theta _ { 0 } , \theta _ { 1 } , \theta _ { 2 } , \theta _ { 3 } )$


$$
{m (\mathbf {x} _ {N + 1})} = {\mathbf {k} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {t}}\tag{6.66}
$$

$$
\sigma^ {2} (\mathbf {x} _ {N + 1}) = c - \mathbf {k} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {k}.\tag{6.67}
$$

These are the key results that define Gaussian process regression. Because the vector k is a function of the test point input value $\mathbf { x } _ { N + 1 }$ , we see that the predictive distribution is a Gaussian whose mean and variance both depend on $\mathbf { x } _ { N + 1 }$ . An example of Gaussian process regression is shown in Figure 6.8. 

The only restriction on the kernel function is that the covariance matrix given by (6.62) must be positive definite. If $\lambda _ { i }$ is an eigenvalue of $\mathbf { K } ,$ , then the corresponding eigenvalue of C will be $\lambda _ { i } + \beta ^ { - 1 }$ . It is therefore sufficient that the kernel matrix $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ be positive semidefinite for any pair of points ${ \bf x } _ { n }$ and $\mathbf { x } _ { m }$ , so that $\lambda _ { i } \geqslant 0$ because any eigenvalue $\lambda _ { i }$ that is zero will still give rise to a positive eigenvalue for C because $\beta > 0$ . This is the same restriction on the kernel function discussed earlier, and so we can again exploit all of the techniques in Section 6.2 to construct 

Illustration of the sampling of data points $\left\{ t _ { n } \right\}$ from a Gaussian process. The blue curve shows a sample function from the Gaussian process prior over functions, and the red points show the values of $y _ { n }$ obtained by evaluating the function at a set of input values $\{ x _ { n } \}$ The corresponding values of $\{ \boldsymbol { { \acute { t } } } _ { n } \}$ , shown in green, are obtained by adding independent Gaussian noise to each of the $\{ y _ { n } \}$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/3fad71a741977fe883138a580de2c230d0405bc651248bc4fe887be20c04c8b6.jpg)


suitable kernels. 

Note that the mean (6.66) of the predictive distribution can be written, as a function of $\mathbf { x } _ { N + 1 }$ , in the form 

$$
m (\mathbf {x} _ {N + 1}) = \sum_ {n = 1} ^ {N} a _ {n} k (\mathbf {x} _ {n}, \mathbf {x} _ {N + 1})\tag{6.68}
$$

where $a _ { n }$ is the $n ^ { \mathrm { t h } }$ component of $\mathbf { C } _ { N } ^ { - 1 } \mathbf { t } .$ . Thus, if the kernel function $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ depends only on the distance $\| \mathbf { x } _ { n } - \mathbf { x } _ { m } \|$ , then we obtain an expansion in radial basis functions. 

The results (6.66) and (6.67) define the predictive distribution for Gaussian process regression with an arbitrary kernel function $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ . In the particular case in which the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ is defined in terms of a finite set of basis functions, we can derive the results obtained previously in Section 3.3.2 for linear regression starting from the Gaussian process viewpoint. 

For such models, we can therefore obtain the predictive distribution either by taking a parameter space viewpoint and using the linear regression result or by taking a function space viewpoint and using the Gaussian process result. 

The central computational operation in using Gaussian processes will involve the inversion of a matrix of size $\bar { N } \times N$ , for which standard methods require $O ( N ^ { 3 } )$ computations. By contrast, in the basis function model we have to invert a matrix $\mathbf { S } _ { N }$ of size $M \times M$ , which has $O ( M ^ { 3 } )$ computational complexity. Note that for both viewpoints, the matrix inversion must be performed once for the given training set. For each new test point, both methods require a vector-matrix multiply, which has cost $O ( N ^ { 2 } )$ in the Gaussian process case and $O ( M ^ { 2 } )$ for the linear basis function model. If the number M of basis functions is smaller than the number $N$ of data points, it will be computationally more efficient to work in the basis function 


Exercise 6.23


Illustration of the mechanism of Gaussian process regression for the case of one training point and one test point, in which the red ellipses show contours of the joint distribution $p ( t _ { 1 } , t _ { 2 } )$ Here $t _ { 1 }$ is the training data point, and conditioning on the value of $t _ { 1 } ,$ , corresponding to the vertical blue line, we obtain $p ( t _ { 2 } | t _ { 1 } )$ shown as a function of $t _ { 2 }$ by the green curve. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/0cf2ea9823148eedca48dcd43f70fc0897796d3eb3a3c86064d50728a0e3506e.jpg)


framework. However, an advantage of a Gaussian processes viewpoint is that we can consider covariance functions that can only be expressed in terms of an infinite number of basis functions. 

For large training data sets, however, the direct application of Gaussian process methods can become infeasible, and so a range of approximation schemes have been developed that have better scaling with training set size than the exact approach (Gibbs, 1997; Tresp, 2001; Smola and Bartlett, 2001; Williams and Seeger, 2001; Csato and Opper, 2002; Seeger´ et $a l .$ , 2003). Practical issues in the application of Gaussian processes are discussed in Bishop and Nabney (2008). 

We have introduced Gaussian process regression for the case of a single target variable. The extension of this formalism to multiple target variables, known as co-kriging (Cressie, 1993), is straightforward. Various other extensions of Gaus-

Illustration of Gaussian process regression applied to the sinusoidal data set in Figure A.6 in which the three right-most data points have been omitted. The green curve shows the sinusoidal function from which the data points, shown in blue, are obtained by sampling and addition of Gaussian noise. The red line shows the mean of the Gaussian process predictive distribution, and the shaded region corresponds to plus and minus two standard deviations. Notice how the uncertainty increases in the region to the right of the data points. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/c39ac2df28d3136dfca53704f1d68ec9d9d56f07d96ea858da1d5b38dc990b6e.jpg)


sian process regression have also been considered, for purposes such as modelling the distribution over low-dimensional manifolds for unsupervised learning (Bishop et al., 1998a) and the solution of stochastic differential equations (Graepel, 2003). 

## 6.4.3 Learning the hyperparameters

The predictions of a Gaussian process model will depend, in part, on the choice of covariance function. In practice, rather than fixing the covariance function, we may prefer to use a parametric family of functions and then infer the parameter values from the data. These parameters govern such things as the length scale of the correlations and the precision of the noise and correspond to the hyperparameters in a standard parametric model. 

Techniques for learning the hyperparameters are based on the evaluation of the likelihood function $p ( \mathbf { t } | \boldsymbol { \theta } )$ where $\pmb \theta$ denotes the hyperparameters of the Gaussian process model. The simplest approach is to make a point estimate of $\pmb \theta$ by maximizing the log likelihood function. Because $\pmb \theta$ represents a set of hyperparameters for the regression problem, this can be viewed as analogous to the type 2 maximum likelihood procedure for linear regression models. Maximization of the log likelihood can be done using efficient gradient-based optimization algorithms such as conjugate gradients (Fletcher, 1987; Nocedal and Wright, 1999; Bishop and Nabney, 2008). 

The log likelihood function for a Gaussian process regression model is easily evaluated using the standard form for a multivariate Gaussian distribution, giving 

$$
\ln p (\mathbf {t} | \boldsymbol {\theta}) = - \frac {1}{2} \ln | \mathbf {C} _ {N} | - \frac {1}{2} \mathbf {t} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {t} - \frac {N}{2} \ln (2 \pi).\tag{6.69}
$$

For nonlinear optimization, we also need the gradient of the log likelihood function with respect to the parameter vector $\theta .$ We shall assume that evaluation of the derivatives of ${ \bf C } _ { N }$ is straightforward, as would be the case for the covariance functions considered in this chapter. Making use of the result (C.21) for the derivative of ${ \bf C } _ { N } ^ { - 1 }$ , together with the result (C.22) for the derivative of ln $| { \bf C } _ { N } |$ , we obtain 

$$
\frac {\partial}{\partial \theta_ {i}} \ln p (\mathbf {t} | \boldsymbol {\theta}) = - \frac {1}{2} \operatorname{Tr} \left(\mathbf {C} _ {N} ^ {- 1} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {i}}\right) + \frac {1}{2} \mathbf {t} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {i}} \mathbf {C} _ {N} ^ {- 1} \mathbf {t}.\tag{6.70}
$$

Because ln $p ( \mathbf { t } | \mathbf { \boldsymbol { \theta } } )$ will in general be a nonconvex function, it can have multiple maxima. 

It is straightforward to introduce a prior over $\pmb \theta$ and to maximize the log posterior using gradient-based methods. In a fully Bayesian treatment, we need to evaluate marginals over $\pmb \theta$ weighted by the product of the prior $p ( \pmb \theta )$ and the likelihood function $p ( \mathbf { t } | \boldsymbol { \theta } )$ ). In general, however, exact marginalization will be intractable, and we must resort to approximations. 

The Gaussian process regression model gives a predictive distribution whose mean and variance are functions of the input vector x. However, we have assumed that the contribution to the predictive variance arising from the additive noise, governed by the parameter $\beta ,$ is a constant. For some problems, known as heteroscedastic, the noise variance itself will also depend on x. To model this, we can extend the 


Figure 6.9 Samples from the ARD prior for Gaussian processes, in which the kernel function is given by (6.71). The left plot corresponds to $\eta _ { 1 } = \eta _ { 2 } = 1$ , and the right plot corresponds to $\eta _ { 1 } = 1$ $\eta _ { 2 } = 0 . 0 1$


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/3c2127f0bca1ddaa6f42205b02c073cc0cec63ce760b06289e648bd1d085012a.jpg)


Gaussian process framework by introducing a second Gaussian process to represent the dependence of $\beta$ on the input x (Goldberg et al., 1998). Because $\beta$ is a variance, and hence nonnegative, we use the Gaussian process to model ln $\beta ( \mathbf { x } )$ 

## 6.4.4 Automatic relevance determination

In the previous section, we saw how maximum likelihood could be used to determine a value for the correlation length-scale parameter in a Gaussian process. This technique can usefully be extended by incorporating a separate parameter for each input variable (Rasmussen and Williams, 2006). The result, as we shall see, is that the optimization of these parameters by maximum likelihood allows the relative importance of different inputs to be inferred from the data. This represents an example in the Gaussian process context of automatic relevance determination, or ARD, which was originally formulated in the framework of neural networks (MacKay, 1994; Neal, 1996). The mechanism by which appropriate inputs are preferred is discussed in Section 7.2.2. 

Consider a Gaussian process with a two-dimensional input space ${ \bf x } = ( x _ { 1 } , x _ { 2 } )$ having a kernel function of the form 

$$
k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \theta_ {0} \exp \left\{- \frac {1}{2} \sum_ {i = 1} ^ {2} \eta_ {i} (x _ {i} - x _ {i} ^ {\prime}) ^ {2} \right\}.\tag{6.71}
$$

Samples from the resulting prior over functions $y ( \mathbf x )$ are shown for two different settings of the precision parameters $\eta _ { i }$ in Figure 6.9. We see that, as a particular parameter $\eta _ { i }$ becomes small, the function becomes relatively insensitive to the corresponding input variable $x _ { i }$ . By adapting these parameters to a data set using maximum likelihood, it becomes possible to detect input variables that have little effect on the predictive distribution, because the corresponding values of $\eta _ { i }$ will be small. This can be useful in practice because it allows such inputs to be discarded. ARD is illustrated using a simple synthetic data set having three inputs $x _ { 1 } , x _ { 2 }$ and $x _ { 3 }$ (Nabney, 2002) in Figure 6.10. The target variable t, is generated by sampling 100 values of $x _ { 1 }$ from a Gaussian, evaluating the function sin $( 2 \pi x _ { 1 } )$ , and then adding 

Figure 6.10 

Illustration of automatic relevance determination in a Gaussian process for a synthetic problem having three inputs $x _ { 1 } , \ x _ { 2 } ,$ and $x _ { 3 }$ , for which the curves show the corresponding values of the hyperparameters $\eta _ { 1 }$ (red), $\eta _ { 2 }$ (green), and $\eta _ { 3 }$ (blue) as a function of the number of iterations when optimizing the marginal likelihood. Details are given in the text. Note the logarithmic scale on the vertical axis. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/b7b2951e64166ee8d209766a50f214f1b8da49ca9574ae898e88830d1e688c79.jpg)


Gaussian noise. Values of $x _ { 2 }$ are given by copying the corresponding values of $x _ { 1 }$ and adding noise, and values of $x _ { 3 }$ are sampled from an independent Gaussian distribution. Thus $x _ { 1 }$ is a good predictor of $t , x _ { 2 }$ is a more noisy predictor of $t ,$ and $x _ { 3 }$ has only chance correlations with t. The marginal likelihood for a Gaussian process with ARD parameters $\eta _ { 1 } , \eta _ { 2 } , \eta _ { 3 }$ is optimized using the scaled conjugate gradients algorithm. We see from Figure 6.10 that $\eta _ { 1 }$ converges to a relatively large value, $\eta _ { 2 }$ converges to a much smaller value, and $\eta _ { 3 }$ becomes very small indicating that $x _ { 3 }$ is irrelevant for predicting t. 

The ARD framework is easily incorporated into the exponential-quadratic kernel (6.63) to give the following form of kernel function, which has been found useful for applications of Gaussian processes to a range of regression problems 

$$
k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = \theta_ {0} \exp \left\{- \frac {1}{2} \sum_ {i = 1} ^ {D} \eta_ {i} (x _ {n i} - x _ {m i}) ^ {2} \right\} + \theta_ {2} + \theta_ {3} \sum_ {i = 1} ^ {D} x _ {n i} x _ {m i}\tag{6.72}
$$

where D is the dimensionality of the input space. 

## 6.4.5 Gaussian processes for classification

In a probabilistic approach to classification, our goal is to model the posterior probabilities of the target variable for a new input vector, given a set of training data. These probabilities must lie in the interval (0, 1), whereas a Gaussian process model makes predictions that lie on the entire real axis. However, we can easily adapt Gaussian processes to classification problems by transforming the output of the Gaussian process using an appropriate nonlinear activation function. 

Consider first the two-class problem with a target variable $t \in \{ 0 , 1 \}$ . If we define a Gaussian process over a function $a ( \mathbf { x } )$ and then transform the function using a logistic sigmoid $y = \sigma ( a )$ , given by (4.59), then we will obtain a non-Gaussian stochastic process over functions $y ( \mathbf x )$ where $y \in ( 0 , 1 )$ . This is illustrated for the case of a one-dimensional input space in Figure 6.11 in which the probability distribution over the target variable t is then given by the Bernoulli distribution 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/23b4f19f131325f2675a3dd4af4ad8776aa5a07239c07ae4aa2cf70069bac875.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/40ad47ab9e983683e001aacc5160d6ef2a371d105dc2fa84a923820acaa1432f.jpg)



Figure 6.11 The left plot shows a sample from a Gaussian process prior over functions $a ( \mathbf { x } )$ , and the right plot shows the result of transforming this sample using a logistic sigmoid function.


$$
p (t | a) = \sigma (a) ^ {t} (1 - \sigma (a)) ^ {1 - t}.\tag{6.73}
$$

As usual, we denote the training set inputs by $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ with corresponding observed target variables $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { \hat { T } } }$ . We also consider a single test point $\mathbf { x } _ { N + 1 }$ with target value $t _ { N + 1 }$ . Our goal is to determine the predictive distribution $p ( t _ { N + 1 } | \mathbf { t } )$ , where we have left the conditioning on the input variables implicit. To do this we introduce a Gaussian process prior over the vector $\mathbf { a } _ { N + 1 }$ , which has components $a ( \mathbf { x } _ { 1 } ) , \dots , a ( \mathbf { x } _ { N + 1 } )$ . This in turn defines a non-Gaussian process over $\mathbf { t } _ { N + 1 }$ and by conditioning on the training data $\mathbf { t } _ { N }$ we obtain the required predictive distribution. The Gaussian process prior for $\mathbf { a } _ { N + 1 }$ takes the form 

$$
p (\mathbf {a} _ {N + 1}) = \mathcal {N} (\mathbf {a} _ {N + 1} | \mathbf {0}, \mathbf {C} _ {N + 1}).\tag{6.74}
$$

Unlike the regression case, the covariance matrix no longer includes a noise term because we assume that all of the training data points are correctly labelled. However, for numerical reasons it is convenient to introduce a noise-like term governed by a parameter ν that ensures that the covariance matrix is positive definite. Thus the covariance matrix ${ \bf C } _ { N + 1 }$ has elements given by 

$$
C (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) + \nu \delta_ {n m}\tag{6.75}
$$

where $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ is any positive semidefinite kernel function of the kind considered in Section 6.2, and the value of ν is typically fixed in advance. We shall assume that the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ is governed by a vector θ of parameters, and we shall later discuss how θ may be learned from the training data. 

For two-class problems, it is sufficient to predict $p ( t _ { N + 1 } = 1 | \mathbf { t } _ { N } )$ because the value of $p ( t _ { N + 1 } \ = \ 0 | \mathbf { t } _ { N } )$ is then given by $1 - p ( t _ { N + 1 } = 1 | \mathbf { t } _ { N } )$ . The required 

predictive distribution is given by 

$$
p (t _ {N + 1} = 1 | \mathbf {t} _ {N}) = \int p (t _ {N + 1} = 1 | a _ {N + 1}) p (a _ {N + 1} | \mathbf {t} _ {N}) \mathrm{d} a _ {N + 1}\tag{6.76}
$$

where $p ( t _ { N + 1 } = 1 | a _ { N + 1 } ) = \sigma ( a _ { N + 1 } )$ 

This integral is analytically intractable, and so may be approximated using sampling methods (Neal, 1997). Alternatively, we can consider techniques based on an analytical approximation. In Section 4.5.2, we derived the approximate formula (4.153) for the convolution of a logistic sigmoid with a Gaussian distribution. We can use this result to evaluate the integral in (6.76) provided we have a Gaussian approximation to the posterior distribution $p ( a _ { N + 1 } | \mathbf { t } _ { N } )$ . The usual justification for a Gaussian approximation to a posterior distribution is that the true posterior will tend to a Gaussian as the number of data points increases as a consequence of the central limit theorem. In the case of Gaussian processes, the number of variables grows with the number of data points, and so this argument does not apply directly. However, if we consider increasing the number of data points falling in a fixed region of x space, then the corresponding uncertainty in the function $a ( \mathbf { x } )$ will decrease, again leading asymptotically to a Gaussian (Williams and Barber, 1998). 

Three different approaches to obtaining a Gaussian approximation have been considered. One technique is based on variational inference (Gibbs and MacKay, 2000) and makes use of the local variational bound (10.144) on the logistic sigmoid. This allows the product of sigmoid functions to be approximated by a product of Gaussians thereby allowing the marginalization over $\mathbf { a } _ { N }$ to be performed analytically. The approach also yields a lower bound on the likelihood function $p ( \mathbf { t } _ { N } | \boldsymbol { \theta } )$ The variational framework for Gaussian process classification can also be extended to multiclass $( K > 2 )$ problems by using a Gaussian approximation to the softmax function (Gibbs, 1997). 

A second approach uses expectation propagation (Opper and Winther, 2000b; Minka, 2001b; Seeger, 2003). Because the true posterior distribution is unimodal, as we shall see shortly, the expectation propagation approach can give good results. 

## 6.4.6 Laplace approximation

The third approach to Gaussian process classification is based on the Laplace approximation, which we now consider in detail. In order to evaluate the predictive distribution (6.76), we seek a Gaussian approximation to the posterior distribution over $a _ { N + 1 }$ , which, using Bayes’ theorem, is given by 

$$
\begin{array}{l l l} p (a _ {N + 1} | \mathbf {t} _ {N}) & = & \int p (a _ {N + 1}, \mathbf {a} _ {N} | \mathbf {t} _ {N})   \mathrm{d} \mathbf {a} _ {N} \\ & = & \frac {1}{p (\mathbf {t} _ {N})} \int p (a _ {N + 1}, \mathbf {a} _ {N}) p (\mathbf {t} _ {N} | a _ {N + 1}, \mathbf {a} _ {N})   \mathrm{d} \mathbf {a} _ {N} \\ & = & \frac {1}{p (\mathbf {t} _ {N})} \int p (a _ {N + 1} | \mathbf {a} _ {N}) p (\mathbf {a} _ {N}) p (\mathbf {t} _ {N} | \mathbf {a} _ {N})   \mathrm{d} \mathbf {a} _ {N} \\ & = & \int p (a _ {N + 1} | \mathbf {a} _ {N}) p (\mathbf {a} _ {N} | \mathbf {t} _ {N})   \mathrm{d} \mathbf {a} _ {N} \end{array}\tag{6.77}
$$

where we have used $p ( { \bf t } _ { N } | a _ { N + 1 } , { \bf a } _ { N } ) = p ( { \bf t } _ { N } | { \bf a } _ { N } )$ . The conditional distribution $p ( a _ { N + 1 } | \mathbf { a } _ { N } )$ is obtained by invoking the results (6.66) and (6.67) for Gaussian process regression, to give 

$$
p (a _ {N + 1} | \mathbf {a} _ {N}) = \mathcal {N} (a _ {N + 1} | \mathbf {k} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {a} _ {N}, c - \mathbf {k} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {k}).\tag{6.78}
$$

We can therefore evaluate the integral in (6.77) by finding a Laplace approximation for the posterior distribution $p ( \mathbf { a } _ { N } | \mathbf { t } _ { N } )$ , and then using the standard result for the convolution of two Gaussian distributions. 

The prior $p ( { \bf a } _ { N } )$ is given by a zero-mean Gaussian process with covariance matrix $\mathbf { C } _ { N }$ , and the data term (assuming independence of the data points) is given by 

$$
p (\mathbf {t} _ {N} | \mathbf {a} _ {N}) = \prod_ {n = 1} ^ {N} \sigma (a _ {n}) ^ {t _ {n}} (1 - \sigma (a _ {n})) ^ {1 - t _ {n}} = \prod_ {n = 1} ^ {N} e ^ {a _ {n} t _ {n}} \sigma (- a _ {n}).\tag{6.79}
$$

We then obtain the Laplace approximation by Taylor expanding the logarithm of $p ( \mathbf { a } _ { N } | \mathbf { t } _ { N } )$ , which up to an additive normalization constant is given by the quantity 

$$
\begin{array}{r c l} \Psi (\mathbf {a} _ {N}) & = & \ln p (\mathbf {a} _ {N}) + \ln p (\mathbf {t} _ {N} | \mathbf {a} _ {N}) \\ & = & - \frac {1}{2} \mathbf {a} _ {N} ^ {\mathrm{T}} \mathbf {C} _ {N} ^ {- 1} \mathbf {a} _ {N} - \frac {N}{2} \ln (2 \pi) - \frac {1}{2} \ln | \mathbf {C} _ {N} | + \mathbf {t} _ {N} ^ {\mathrm{T}} \mathbf {a} _ {N} \\ & & - \sum_ {n = 1} ^ {N} \ln (1 + e ^ {a _ {n}}) + \text {const.} \end{array}\tag{6.80}
$$

First we need to find the mode of the posterior distribution, and this requires that we evaluate the gradient of $\Psi ( { \bf a } _ { N } )$ , which is given by 

$$
\nabla \Psi (\mathbf {a} _ {N}) = \mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N} - \mathbf {C} _ {N} ^ {- 1} \mathbf {a} _ {N}\tag{6.81}
$$

where $\sigma _ { N }$ is a vector with elements $\sigma ( a _ { n } )$ . We cannot simply find the mode by setting this gradient to zero, because $\sigma _ { N }$ depends nonlinearly on $\mathbf { a } _ { N }$ , and so we resort to an iterative scheme based on the Newton-Raphson method, which gives rise to an iterative reweighted least squares (IRLS) algorithm. This requires the second derivatives of $\Psi ( { \bf a } _ { N } )$ , which we also require for the Laplace approximation anyway, and which are given by 

$$
\nabla \nabla \Psi (\mathbf {a} _ {N}) = - \mathbf {W} _ {N} - \mathbf {C} _ {N} ^ {- 1}\tag{6.82}
$$

where ${ \bf W } _ { N }$ is a diagonal matrix with elements $\sigma ( a _ { n } ) ( 1 - \sigma ( a _ { n } ) )$ , and we have used the result (4.88) for the derivative of the logistic sigmoid function. Note that these diagonal elements lie in the range $( 0 , 1 / 4 )$ , and hence ${ \bf W } _ { N }$ is a positive definite matrix. Because ${ \bf C } _ { N }$ (and hence its inverse) is positive definite by construction, and because the sum of two positive definite matrices is also positive definite, we see that the Hessian matrix $\mathbf { A } = - \nabla \nabla \Psi ( \mathbf { a } _ { N } )$ is positive definite and so the posterior distribution $p ( \mathbf { a } _ { N } | \mathbf { t } _ { N } )$ is log convex and therefore has a single mode that is the global maximum. The posterior distribution is not Gaussian, however, because the Hessian is a function of a . 

Using the Newton-Raphson formula (4.92), the iterative update equation for $\mathbf { a } _ { N }$ is given by 

$$
\mathbf {a} _ {N} ^ {\mathrm{new}} = \mathbf {C} _ {N} (\mathbf {I} + \mathbf {W} _ {N} \mathbf {C} _ {N}) ^ {- 1} \left\{\mathbf {t} _ {N} - \pmb {\sigma} _ {N} + \mathbf {W} _ {N} \mathbf {a} _ {N} \right\}.\tag{6.83}
$$

These equations are iterated until they converge to the mode which we denote by $\mathbf { a } _ { N } ^ { \star }$ . At the mode, the gradient $\nabla \Psi ( { \mathbf a } _ { N } )$ will vanish, and hence $\mathbf { a } _ { N } ^ { \star }$ will satisfy 

$$
\mathbf {a} _ {N} ^ {\star} = \mathbf {C} _ {N} (\mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N}).\tag{6.84}
$$

Once we have found the mode $\mathbf { a } _ { N } ^ { \star }$ of the posterior, we can evaluate the Hessian matrix given by 

$$
\mathbf {H} = - \nabla \nabla \Psi (\mathbf {a} _ {N}) = \mathbf {W} _ {N} + \mathbf {C} _ {N} ^ {- 1}\tag{6.85}
$$

where the elements of $\mathbf { W } _ { N }$ are evaluated using $\mathbf { a } _ { N } ^ { \star }$ . This defines our Gaussian approximation to the posterior distribution $p ( \mathbf { a } _ { N } | \mathbf { t } _ { N } )$ given by 

$$
q (\mathbf {a} _ {N}) = \mathcal {N} (\mathbf {a} _ {N} | \mathbf {a} _ {N} ^ {\star}, \mathbf {H} ^ {- 1}).\tag{6.86}
$$

We can now combine this with (6.78) and hence evaluate the integral (6.77). Because this corresponds to a linear-Gaussian model, we can use the general result (2.115) to give 

$$
\mathbb {E} [ a _ {N + 1} | \mathbf {t} _ {N} ] = \mathbf {k} ^ {\mathrm{T}} (\mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N})\tag{6.87}
$$

$$
\operatorname{var} [ a _ {N + 1} | \mathbf {t} _ {N} ] = c - \mathbf {k} ^ {\mathrm{T}} (\mathbf {W} _ {N} ^ {- 1} + \mathbf {C} _ {N}) ^ {- 1} \mathbf {k}.\tag{6.88}
$$

Now that we have a Gaussian distribution for $p ( a _ { N + 1 } | \mathbf { t } _ { N } )$ , we can approximate the integral (6.76) using the result (4.153). As with the Bayesian logistic regression model of Section 4.5, if we are only interested in the decision boundary corresponding to $p ( t _ { N + 1 } | \mathbf { t } _ { N } ) = 0 . 5$ , then we need only consider the mean and we can ignore the effect of the variance. 

We also need to determine the parameters $\pmb \theta$ of the covariance function. One approach is to maximize the likelihood function given by $p ( \mathbf { t } _ { N } | \pmb { \theta } )$ for which we need expressions for the log likelihood and its gradient. If desired, suitable regularization terms can also be added, leading to a penalized maximum likelihood solution. The likelihood function is defined by 

$$
p (\mathbf {t} _ {N} | \boldsymbol {\theta}) = \int p (\mathbf {t} _ {N} | \mathbf {a} _ {N}) p (\mathbf {a} _ {N} | \boldsymbol {\theta}) \mathrm{d} \mathbf {a} _ {N}.\tag{6.89}
$$

This integral is analytically intractable, so again we make use of the Laplace approximation. Using the result (4.135), we obtain the following approximation for the log of the likelihood function 

$$
\ln p (\mathbf {t} _ {N} | \pmb {\theta}) = \Psi (\mathbf {a} _ {N} ^ {\star}) - \frac {1}{2} \ln | \mathbf {W} _ {N} + \mathbf {C} _ {N} ^ {- 1} | + \frac {N}{2} \ln (2 \pi)\tag{6.90}
$$

where $\Psi ( { \bf a } _ { N } ^ { \star } ) = \ln p ( { \bf a } _ { N } ^ { \star } | \pmb { \theta } ) + \ln p ( { \bf t } _ { N } | { \bf a } _ { N } ^ { \star } )$ . We also need to evaluate the gradient of ln $p ( \mathbf { t } _ { N } | \pmb { \theta } )$ with respect to the parameter vector $\theta .$ Note that changes in $\pmb \theta$ will cause changes in $\mathbf { a } _ { N } ^ { \star }$ , leading to additional terms in the gradient. Thus, when we differentiate (6.90) with respect to $\theta ,$ we obtain two sets of terms, the first arising from the dependence of the covariance matrix $\mathbf { C } _ { N }$ on $\theta ,$ and the rest arising from dependence of $\mathbf { a } _ { N } ^ { \star }$ on $\pmb { \theta } .$ 

The terms arising from the explicit dependence on $\pmb \theta$ can be found by using (6.80) together with the results (C.21) and (C.22), and are given by 

$$
\begin{array}{r c l} \frac {\partial \ln p (\mathbf {t} _ {N} | \boldsymbol {\theta})}{\partial \theta_ {j}} & = & \frac {1}{2} \mathbf {a} _ {N} ^ {\star^ {\mathrm{T}}} \mathbf {C} _ {N} ^ {- 1} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {j}} \mathbf {C} _ {N} ^ {- 1} \mathbf {a} _ {N} ^ {\star} \\ & & - \frac {1}{2} \mathrm{Tr} \left[ (\mathbf {I} + \mathbf {C} _ {N} \mathbf {W} _ {N}) ^ {- 1} \mathbf {W} _ {N} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {j}} \right]. \end{array}\tag{6.91}
$$

To compute the terms arising from the dependence of $\mathbf { a } _ { N } ^ { \star }$ on $\pmb \theta _ { : }$ , we note that the Laplace approximation has been constructed such that $\Psi ( { \bf a } _ { N } )$ has zero gradient at ${ \bf a } _ { N } = { \bf a } _ { N } ^ { \star }$ , and so $\Psi ( { \bf a } _ { N } ^ { \star } )$ gives no contribution to the gradient as a result of its dependence on $\mathbf { a } _ { N } ^ { \star }$ . This leaves the following contribution to the derivative with respect to a component $\theta _ { j }$ of $\pmb \theta$ 

$$
\begin{array}{r l} & {- \frac {1}{2} \sum_ {n = 1} ^ {N} \frac {\partial \ln | \mathbf {W} _ {N} + \mathbf {C} _ {N} ^ {- 1} |}{\partial a _ {n} ^ {\star}} \frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}}} \\ & {\qquad = - \frac {1}{2} \sum_ {n = 1} ^ {N} \left[ (\mathbf {I} + \mathbf {C} _ {N} \mathbf {W} _ {N}) ^ {- 1} \mathbf {C} _ {N} \right] _ {n n} \sigma_ {n} ^ {\star} (1 - \sigma_ {n} ^ {\star}) (1 - 2 \sigma_ {n} ^ {\star}) \frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}}} \end{array}\tag{6.92}
$$

where $\sigma _ { n } ^ { \star } ~ = ~ \sigma ( a _ { n } ^ { \star } )$ , and again we have used the result (C.22) together with the definition of ${ \bf W } _ { N }$ . We can evaluate the derivative of $a _ { N } ^ { \star }$ with respect to $\theta _ { j }$ by differentiating the relation (6.84) with respect to $\theta _ { j }$ to give 

$$
\frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}} = \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {j}} (\mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N}) - \mathbf {C} _ {N} \mathbf {W} _ {N} \frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}}.\tag{6.93}
$$

Rearranging then gives 

$$
\frac {\partial a _ {n} ^ {\star}}{\partial \theta_ {j}} = (\mathbf {I} + \mathbf {W} _ {N} \mathbf {C} _ {N}) ^ {- 1} \frac {\partial \mathbf {C} _ {N}}{\partial \theta_ {j}} (\mathbf {t} _ {N} - \boldsymbol {\sigma} _ {N}).\tag{6.94}
$$

Combining (6.91), (6.92), and (6.94), we can evaluate the gradient of the log likelihood function, which can be used with standard nonlinear optimization algorithms in order to determine a value for $\pmb { \theta } .$ 

We can illustrate the application of the Laplace approximation for Gaussian processes using the synthetic two-class data set shown in Figure 6.12. Extension of the Laplace approximation to Gaussian processes involving $K > 2$ classes, using the softmax activation function, is straightforward (Williams and Barber, 1998). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/610c6daf5164f357a47bd7ba36f7af1238b9e818701c08030f4fd5aa5fed4b11.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/4dcae451fbb86728611e1bce52ac6bd7236b855630e8a928f8d1e0cf008da747.jpg)



Figure 6.12 Illustration of the use of a Gaussian process for classification, showing the data on the left together with the optimal decision boundary from the true distribution in green, and the decision boundary from the Gaussian process classifier in black. On the right is the predicted posterior probability for the blue and red classes together with the Gaussian process decision boundary.


## 6.4.7 Connection to neural networks

We have seen that the range of functions which can be represented by a neural network is governed by the number M of hidden units, and that, for sufficiently large M, a two-layer network can approximate any given function with arbitrary accuracy. In the framework of maximum likelihood, the number of hidden units needs to be limited (to a level dependent on the size of the training set) in order to avoid over-fitting. However, from a Bayesian perspective it makes little sense to limit the number of parameters in the network according to the size of the training set. 

In a Bayesian neural network, the prior distribution over the parameter vector w, in conjunction with the network function $f ( \mathbf { x } , \mathbf { w } )$ , produces a prior distribution over functions from $y ( \mathbf x )$ where y is the vector of network outputs. Neal (1996) has shown that, for a broad class of prior distributions over w, the distribution of functions generated by a neural network will tend to a Gaussian process in the limit $M \to \infty$ . It should be noted, however, that in this limit the output variables of the neural network become independent. One of the great merits of neural networks is that the outputs share the hidden units and so they can ‘borrow statistical strength’ from each other, that is, the weights associated with each hidden unit are influenced by all of the output variables not just by one of them. This property is therefore lost in the Gaussian process limit. 

We have seen that a Gaussian process is determined by its covariance (kernel) function. Williams (1998) has given explicit forms for the covariance in the case of two specific choices for the hidden unit activation function (probit and Gaussian). These kernel functions $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ are nonstationary, i.e. they cannot be expressed as a function of the difference ${ \bf x } - { \bf x } ^ { \prime } .$ , as a consequence of the Gaussian weight prior being centred on zero which breaks translation invariance in weight space. 

By working directly with the covariance function we have implicitly marginalized over the distribution of weights. If the weight prior is governed by hyperparameters, then their values will determine the length scales of the distribution over functions, as can be understood by studying the examples in Figure 5.11 for the case of a finite number of hidden units. Note that we cannot marginalize out the hyperparameters analytically, and must instead resort to techniques of the kind discussed in Section 6.4. 

## Exercises

6.1 ( ) www Consider the dual formulation of the least squares linear regression problem given in Section 6.1. Show that the solution for the components $a _ { n }$ of the vector a can be expressed as a linear combination of the elements of the vector $\phi (  { \mathbf { x } } _ { n } )$ . Denoting these coefficients by the vector w, show that the dual of the dual formulation is given by the original representation in terms of the parameter vector w. 

6.2 ( ) In this exercise, we develop a dual formulation of the perceptron learning algorithm. Using the perceptron learning rule (4.55), show that the learned weight vector w can be written as a linear combination of the vectors $t _ { n } \phi ( \mathbf x _ { n } )$ where $t _ { n } \in$ $\{ - 1 , + 1 \}$ . Denote the coefficients of this linear combination by $\alpha _ { n }$ and derive a formulation of the perceptron learning algorithm, and the predictive function for the perceptron, in terms of the $\alpha _ { n }$ . Show that the feature vector $\phi ( \mathbf { x } )$ enters only in the form of the kernel function $k ( { \bf x } , { \bf x } ^ { \prime } ) = \phi ( { \bf x } ) ^ { \mathrm { T } } \phi ( { \bf x } ^ { \prime } )$ 

6.3 () The nearest-neighbour classifier (Section 2.5.2) assigns a new input vector x to the same class as that of the nearest input vector ${ \bf x } _ { n }$ from the training set, where in the simplest case, the distance is defined by the Euclidean metric $\| \mathbf { x } - \mathbf { x } _ { n } \| ^ { 2 }$ . By expressing this rule in terms of scalar products and then making use of kernel substitution, formulate the nearest-neighbour classifier for a general nonlinear kernel. 

6.4 () In Appendix C, we give an example of a matrix that has positive elements but that has a negative eigenvalue and hence that is not positive definite. Find an example of the converse property, namely a $2 \times 2$ matrix with positive eigenvalues yet that has at least one negative element. 

6.5 () www Verify the results (6.13) and (6.14) for constructing valid kernels. 

6.6 () Verify the results (6.15) and (6.16) for constructing valid kernels. 

6.7 () www Verify the results (6.17) and (6.18) for constructing valid kernels. 

6.8 () Verify the results (6.19) and (6.20) for constructing valid kernels. 

6.9 () Verify the results (6.21) and (6.22) for constructing valid kernels. 

6.10 () Show that an excellent choice of kernel for learning a function $f ( \mathbf { x } )$ is given by $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = f ( \mathbf { x } ) f ( \mathbf { x } ^ { \prime } )$ by showing that a linear learning machine based on this kernel will always find a solution proportional to $f ( \mathbf { x } )$ 

6.11 () By making use of the expansion (6.25), and then expanding the middle factor as a power series, show that the Gaussian kernel (6.23) can be expressed as the inner product of an infinite-dimensional feature vector. 

6.12 ( ) www Consider the space of all possible subsets A of a given fixed set D. Show that the kernel function (6.27) corresponds to an inner product in a feature space of dimensionality $2 ^ { | D | }$ defined by the mapping $\phi ( A )$ where A is a subset of D and the element $\phi _ { U } ( A )$ , indexed by the subset $\bar { U }$ , is given by 

$$
\phi_ {U} (A) = \left\{ \begin{array}{l l} 1, & \text { if } U \subseteq A; \\ 0, & \text { otherwise }. \end{array} \right.\tag{6.95}
$$

Here $U \subseteq A$ denotes that U is either a subset of A or is equal to $A .$ 

6.13 () Show that the Fisher kernel, defined by (6.33), remains invariant if we make a nonlinear transformation of the parameter vector $\theta \to \psi ( \theta )$ , where the function $\psi ( \cdot )$ is invertible and differentiable. 

6.14 () www Write down the form of the Fisher kernel, defined by (6.33), for the case of a distribution $p ( \mathbf { x } | \pmb { \mu } ) = \mathcal { N } ( \mathbf { x } | \pmb { \mu } , \mathbf { S } )$ that is Gaussian with mean $\pmb { \mu }$ and fixed covariance S. 

6.15 () By considering the determinant of a $2 \times 2$ Gram matrix, show that a positivedefinite kernel function $k ( x , x ^ { \prime } )$ satisfies the Cauchy-Schwartz inequality 

$$
k (x _ {1}, x _ {2}) ^ {2} \leqslant k (x _ {1}, x _ {1}) k (x _ {2}, x _ {2}).\tag{6.96}
$$

6.16 ( ) Consider a parametric model governed by the parameter vector w together with a data set of input values $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ and a nonlinear feature mapping $\phi ( \mathbf { x } )$ Suppose that the dependence of the error function on w takes the form 

$$
J (\mathbf {w}) = f (\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {1}), \ldots , \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {N})) + g (\mathbf {w} ^ {\mathrm{T}} \mathbf {w})\tag{6.97}
$$

where $g ( \cdot )$ is a monotonically increasing function. By writing w in the form 

$$
\mathbf {w} = \sum_ {n = 1} ^ {N} \alpha_ {n} \phi (\mathbf {x} _ {n}) + \mathbf {w} _ {\perp}\tag{6.98}
$$

show that the value of w that minimizes $J ( \mathbf { w } )$ takes the form of a linear combination of the basis functions $\phi (  { \mathbf { x } } _ { n } )$ for $n = 1 , \ldots , N$ 

6.17 ( ) www Consider the sum-of-squares error function (6.39) for data having noisy inputs, where $\nu ( \pmb { \xi } )$ is the distribution of the noise. Use the calculus of variations to minimize this error function with respect to the function $y ( \mathbf x )$ , and hence show that the optimal solution is given by an expansion of the form (6.40) in which the basis functions are given by (6.41). 

6.18 () Consider a Nadaraya-Watson model with one input variable x and one target variable t having Gaussian components with isotropic covariances, so that the covariance matrix is given by $\sigma ^ { 2 } \mathbf { I }$ where I is the unit matrix. Write down expressions for the conditional density $p ( t | x )$ and for the conditional mean $\mathbb { E } [ t | x ]$ and variance $\mathrm { v a r } [ t | x ]$ , in terms of the kernel function $k ( x , x _ { n } )$ 

6.19 ( ) Another viewpoint on kernel regression comes from a consideration of regression problems in which the input variables as well as the target variables are corrupted with additive noise. Suppose each target value $t _ { n }$ is generated as usual by taking a function $y ( \mathbf { z } _ { n } )$ evaluated at a point $\mathbf { z } _ { n } .$ , and adding Gaussian noise. The value of $\mathbf { z } _ { n }$ is not directly observed, however, but only a noise corrupted version ${ \bf x } _ { n } = { \bf z } _ { n } + { \pmb { \xi } } _ { n }$ where the random variable $\boldsymbol { \xi }$ is governed by some distribution $g ( \xi )$ Consider a set of observations $\left\{ \mathbf { x } _ { n } , t _ { n } \right\}$ , where $n = 1 , \ldots , N$ , together with a corresponding sum-of-squares error function defined by averaging over the distribution of input noise to give 

$$
E = \frac {1}{2} \sum_ {n = 1} ^ {N} \int \left\{y (\mathbf {x} _ {n} - \pmb {\xi} _ {n}) - t _ {n} \right\} ^ {2} g (\pmb {\xi} _ {n}) \mathrm{d} \pmb {\xi} _ {n}.\tag{6.99}
$$

By minimizing E with respect to the function $y ( \mathbf { z } )$ using the calculus of variations (Appendix D), show that optimal solution for $y ( \mathbf x )$ is given by a Nadaraya-Watson kernel regression solution of the form (6.45) with a kernel of the form (6.46). 

6.20 ( ) www Verify the results (6.66) and (6.67). 

6.21 ( ) www Consider a Gaussian process regression model in which the kernel function is defined in terms of a fixed set of nonlinear basis functions. Show that the predictive distribution is identical to the result (3.58) obtained in Section 3.3.2 for the Bayesian linear regression model. To do this, note that both models have Gaussian predictive distributions, and so it is only necessary to show that the conditional mean and variance are the same. For the mean, make use of the matrix identity (C.6), and for the variance, make use of the matrix identity (C.7). 

6.22 ( ) Consider a regression problem with N training set input vectors $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ and L test set input vectors $\mathbf { x } _ { N + 1 } , \dots , \mathbf { x } _ { N + L }$ , and suppose we define a Gaussian process prior over functions $t ( \mathbf { x } )$ . Derive an expression for the joint predictive distribution for $t ( \mathbf { x } _ { N + 1 } ) , \ldots , t ( \mathbf { x } _ { N + L } )$ , given the values of $t ( \mathbf { x } _ { 1 } ) , \ldots , t ( \mathbf { x } _ { N } )$ . Show the marginal of this distribution for one of the test observations $t _ { j }$ where $N + 1 \leqslant j \leqslant$ $N + L$ is given by the usual Gaussian process regression result (6.66) and (6.67). 

6.23 ( ) www Consider a Gaussian process regression model in which the target variable t has dimensionality D. Write down the conditional distribution of $\mathbf { t } _ { N + 1 }$ for a test input vector $\mathbf { x } _ { N + 1 }$ , given a training set of input vectors $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N + 1 }$ and corresponding target observations $\mathbf { t } _ { 1 } , \ldots , \mathbf { t } _ { N }$ 

6.24 () Show that a diagonal matrix W whose elements satisfy $0 < W _ { i i } < 1$ is positive definite. Show that the sum of two positive definite matrices is itself positive definite. 

6.25 () www Using the Newton-Raphson formula (4.92), derive the iterative update formula (6.83) for finding the mode $\mathbf { a } _ { N } ^ { \star }$ of the posterior distribution in the Gaussian process classification model. 

6.26 () Using the result (2.115), derive the expressions (6.87) and (6.88) for the mean and variance of the posterior distribution $p ( a _ { N + 1 } | \mathbf { t } _ { N } )$ in the Gaussian process classification model. 

6.27 (  ) Derive the result (6.90) for the log likelihood function in the Laplace approximation framework for Gaussian process classification. Similarly, derive the results (6.91), (6.92), and (6.94) for the terms in the gradient of the log likelihood. 

# Sparse Kernel Machines

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/07459308ae8f540e3a63bb5b5ea4a6ade03e2fd81b98d6446570e057de62e3c3.jpg)


In the previous chapter, we explored a variety of learning algorithms based on nonlinear kernels. One of the significant limitations of many such algorithms is that the kernel function $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ must be evaluated for all possible pairs ${ \bf x } _ { n }$ and $\mathbf { x } _ { m }$ of training points, which can be computationally infeasible during training and can lead to excessive computation times when making predictions for new data points. In this chapter we shall look at kernel-based algorithms that have sparse solutions, so that predictions for new inputs depend only on the kernel function evaluated at a subset of the training data points. 

We begin by looking in some detail at the support vector machine (SVM), which became popular in some years ago for solving problems in classification, regression, and novelty detection. An important property of support vector machines is that the determination of the model parameters corresponds to a convex optimization problem, and so any local solution is also a global optimum. Because the discussion of support vector machines makes extensive use of Lagrange multipliers, the reader is encouraged to review the key concepts covered in Appendix E. Additional information on support vector machines can be found in Vapnik (1995), Burges (1998), Cristianini and Shawe-Taylor (2000), Muller ¨ et al. (2001), Scholkopf and Smola ¨ (2002), and Herbrich (2002). 

The SVM is a decision machine and so does not provide posterior probabilities. We have already discussed some of the benefits of determining probabilities in Section 1.5.4. An alternative sparse kernel technique, known as the relevance vector machine (RVM), is based on a Bayesian formulation and provides posterior probabilistic outputs, as well as having typically much sparser solutions than the SVM. 

## 7.1. Maximum Margin Classifiers

We begin our discussion of support vector machines by returning to the two-class classification problem using linear models of the form 

$$
y (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x}) + b\tag{7.1}
$$

where $\phi ( \mathbf { x } )$ denotes a fixed feature-space transformation, and we have made the bias parameter b explicit. Note that we shall shortly introduce a dual representation expressed in terms of kernel functions, which avoids having to work explicitly in feature space. The training data set comprises N input vectors $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ , with corresponding target values $t _ { 1 } , \ldots , t _ { N }$ where $t _ { n } \in \{ - 1 , 1 \}$ , and new data points x are classified according to the sign of $y ( \mathbf x )$ 

We shall assume for the moment that the training data set is linearly separable in feature space, so that by definition there exists at least one choice of the parameters w and b such that a function of the form (7.1) satisfies $y ( \mathbf { x } _ { n } ) > 0$ for points having $t _ { n } = + 1$ and $y ( \mathbf { x } _ { n } ) < 0$ for points having $t _ { n } = - 1$ , so that $t _ { n } y ( \mathbf { x } _ { n } ) > 0$ for all training data points. 

There may of course exist many such solutions that separate the classes exactly. In Section 4.1.7, we described the perceptron algorithm that is guaranteed to find a solution in a finite number of steps. The solution that it finds, however, will be dependent on the (arbitrary) initial values chosen for w and $b$ as well as on the order in which the data points are presented. If there are multiple solutions all of which classify the training data set exactly, then we should try to find the one that will give the smallest generalization error. The support vector machine approaches this problem through the concept of the margin, which is defined to be the smallest distance between the decision boundary and any of the samples, as illustrated in Figure 7.1. 

In support vector machines the decision boundary is chosen to be the one for which the margin is maximized. The maximum margin solution can be motivated using computational learning theory, also known as statistical learning theory. However, a simple insight into the origins of maximum margin has been given by Tong and Koller (2000) who consider a framework for classification based on a hybrid of generative and discriminative approaches. They first model the distribution over input vectors x for each class using a Parzen density estimator with Gaussian kernels having a common parameter $\sigma ^ { 2 }$ . Together with the class priors, this defines an optimal misclassification-rate decision boundary. However, instead of using this optimal boundary, they determine the best hyperplane by minimizing the probability of error relative to the learned density model. In the limit $\sigma ^ { 2 } \to 0$ , the optimal hyperplane is shown to be the one having maximum margin. The intuition behind this result is that as $\sigma ^ { 2 }$ is reduced, the hyperplane is increasingly dominated by nearby data points relative to more distant ones. In the limit, the hyperplane becomes independent of data points that are not support vectors. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/c78e75c7e03b0ea5958dd94c2cbdd0c0b5a041d7cf7fe7df6005b1ca4e5e2571.jpg)



Figure 7.1 The margin is defined as the perpendicular distance between the decision boundary and the closest of the data points, as shown on the left figure. Maximizing the margin leads to a particular choice of decision boundary, as shown on the right. The location of this boundary is determined by a subset of the data points, known as support vectors, which are indicated by the circles.


We shall see in Figure 10.13 that marginalization with respect to the prior distribution of the parameters in a Bayesian approach for a simple linearly separable data set leads to a decision boundary that lies in the middle of the region separating the data points. The large margin solution has similar behaviour. 

Recall from Figure 4.1 that the perpendicular distance of a point x from a hyperplane defined by $y ( \mathbf { x } ) = 0$ where $y ( \mathbf x )$ takes the form (7.1) is given by $| y ( \mathbf { x } ) | / \| \mathbf { w } \|$ Furthermore, we are only interested in solutions for which all data points are correctly classified, so that $t _ { n } y ( \mathbf { x } _ { n } ) > 0$ for all n. Thus the distance of a point ${ \bf x } _ { n }$ to the decision surface is given by 

$$
\frac {t _ {n} y (\mathbf {x} _ {n})}{\| \mathbf {w} \|} = \frac {t _ {n} (\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) + b)}{\| \mathbf {w} \|}.\tag{7.2}
$$

The margin is given by the perpendicular distance to the closest point ${ \bf x } _ { n }$ from the data set, and we wish to optimize the parameters w and b in order to maximize this distance. Thus the maximum margin solution is found by solving 

$$
\arg \max _ {\mathbf {w}, b} \left\{\frac {1}{\| \mathbf {w} \|} \min _ {n} \left[ t _ {n} \left(\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x} _ {n}) + b\right) \right] \right\}\tag{7.3}
$$

where we have taken the factor $1 / \| \mathbf { w } \|$ outside the optimization over n because w does not depend on n. Direct solution of this optimization problem would be very complex, and so we shall convert it into an equivalent problem that is much easier to solve. To do this we note that if we make the rescaling $\mathbf { w } \to \kappa \mathbf { w }$ and $b \to \kappa b .$ then the distance from any point ${ \bf x } _ { n }$ to the decision surface, given by $t _ { n } y ( \mathbf { x } _ { n } ) / \| \mathbf { w } \|$ is unchanged. We can use this freedom to set 

$$
t _ {n} \left(\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x} _ {n}) + b\right) = 1\tag{7.4}
$$

for the point that is closest to the surface. In this case, all data points will satisfy the constraints 

$$
t _ {n} \left(\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) + b\right) \geqslant 1, \quad n = 1, \dots , N.\tag{7.5}
$$

This is known as the canonical representation of the decision hyperplane. In the case of data points for which the equality holds, the constraints are said to be active, whereas for the remainder they are said to be inactive. By definition, there will always be at least one active constraint, because there will always be a closest point, and once the margin has been maximized there will be at least two active constraints. The optimization problem then simply requires that we maximize $\lVert \mathbf { w } \rVert ^ { - 1 }$ , which is equivalent to minimizing $\| \mathbf { w } \| ^ { 2 }$ , and so we have to solve the optimization problem 

$$
\underset {\mathbf {w}, b} {\arg \min} \frac {1}{2} \| \mathbf {w} \| ^ {2}\tag{7.6}
$$

subject to the constraints given by (7.5). The factor of $1 / 2$ in (7.6) is included for later convenience. This is an example of a quadratic programming problem in which we are trying to minimize a quadratic function subject to a set of linear inequality constraints. It appears that the bias parameter b has disappeared from the optimization. However, it is determined implicitly via the constraints, because these require that changes to $\left\| \mathbf { w } \right\|$ be compensated by changes to b. We shall see how this works shortly. 

In order to solve this constrained optimization problem, we introduce Lagrange multipliers $a _ { n } \geqslant 0$ , with one multiplier $a _ { n }$ for each of the constraints in (7.5), giving the Lagrangian function 

$$
L (\mathbf {w}, b, \mathbf {a}) = \frac {1}{2} \| \mathbf {w} \| ^ {2} - \sum_ {n = 1} ^ {N} a _ {n} \left\{t _ {n} \left(\mathbf {w} ^ {\mathrm{T}} \phi \left(\mathbf {x} _ {n}\right) + b\right) - 1 \right\}\tag{7.7}
$$

where $\mathbf { a } = ( a _ { 1 } , \ldots , a _ { N } ) ^ { \mathrm { T } }$ . Note the minus sign in front of the Lagrange multiplier term, because we are minimizing with respect to w and $b ,$ and maximizing with respect to a. Setting the derivatives of $L ( { \bf w } , b , { \bf a } )$ with respect to w and b equal to zero, we obtain the following two conditions 

$$
\mathbf {w} = \sum_ {n = 1} ^ {N} a _ {n} t _ {n} \phi (\mathbf {x} _ {n})\tag{7.8}
$$

$$
0 = \sum_ {n = 1} ^ {N} a _ {n} t _ {n}.\tag{7.9}
$$

Eliminating w and b from $L ( { \bf w } , b , { \bf a } )$ using these conditions then gives the dual representation of the maximum margin problem in which we maximize 

$$
\widetilde {L} (\mathbf {a}) = \sum_ {n = 1} ^ {N} a _ {n} - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} a _ {n} a _ {m} t _ {n} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\tag{7.10}
$$

with respect to a subject to the constraints 

$$
a _ {n} \geqslant 0, \quad n = 1, \dots , N,\tag{7.11}
$$

$$
\sum_ {n = 1} ^ {N} a _ {n} t _ {n} = 0.\tag{7.12}
$$

Here the kernel function is defined by $k ( { \bf x } , { \bf x } ^ { \prime } ) = \phi ( { \bf x } ) ^ { \mathrm { T } } \phi ( { \bf x } ^ { \prime } )$ . Again, this takes the form of a quadratic programming problem in which we optimize a quadratic function of a subject to a set of inequality constraints. We shall discuss techniques for solving such quadratic programming problems in Section 7.1.1. 

The solution to a quadratic programming problem in M variables in general has computational complexity that is $\mathcal { O } ( M ^ { 3 } )$ . In going to the dual formulation we have turned the original optimization problem, which involved minimizing (7.6) over M variables, into the dual problem (7.10), which has N variables. For a fixed set of basis functions whose number M is smaller than the number N of data points, the move to the dual problem appears disadvantageous. However, it allows the model to be reformulated using kernels, and so the maximum margin classifier can be applied efficiently to feature spaces whose dimensionality exceeds the number of data points, including infinite feature spaces. The kernel formulation also makes clear the role of the constraint that the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ be positive definite, because this ensures that the Lagrangian function $\widetilde L ( \mathbf { a } )$ is bounded below, giving rise to a welldefined optimization problem. 

In order to classify new data points using the trained model, we evaluate the sign of $y ( \mathbf x )$ defined by (7.1). This can be expressed in terms of the parameters $\left\{ a _ { n } \right\}$ and the kernel function by substituting for w using (7.8) to give 

$$
y (\mathbf {x}) = \sum_ {n = 1} ^ {N} a _ {n} t _ {n} k (\mathbf {x}, \mathbf {x} _ {n}) + b.\tag{7.13}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/8904fb4950c040044ec0175b404bf2529a0a279366fa76749377b9b337c0ec8c.jpg)


## Joseph-Louis Lagrange 1736–1813

Although widely considered to be a French mathematician, Lagrange was born in Turin in Italy. By the age of nineteen, he had already made important contributions mathematics and had been appointed as Pro-

fessor at the Royal Artillery School in Turin. For many years, Euler worked hard to persuade Lagrange to move to Berlin, which he eventually did in 1766 where he succeeded Euler as Director of Mathematics at the Berlin Academy. Later he moved to Paris, narrowly escaping with his life during the French revolution thanks to the personal intervention of Lavoisier (the French chemist who discovered oxygen) who himself was later executed at the guillotine. Lagrange made key contributions to the calculus of variations and the foundations of dynamics. 

In Appendix E, we show that a constrained optimization of this form satisfies the Karush-Kuhn-Tucker (KKT) conditions, which in this case require that the following three properties hold 

$$
a _ {n} \geqslant 0\tag{7.14}
$$

$$
t _ {n} y (\mathbf {x} _ {n}) - 1 \geqslant 0\tag{7.15}
$$

$$
a _ {n} \left\{t _ {n} y (\mathbf {x} _ {n}) - 1 \right\} = 0.\tag{7.16}
$$

Thus for every data point, either $a _ { n } ~ = ~ 0$ or $t _ { n } y ( \mathbf { x } _ { n } ) ~ = ~ 1$ . Any data point for which $a _ { n } = 0$ will not appear in the sum in (7.13) and hence plays no role in making predictions for new data points. The remaining data points are called support vectors, and because they satisfy $t _ { n } y ( \mathbf { x } _ { n } ) ~ = ~ 1$ , they correspond to points that lie on the maximum margin hyperplanes in feature space, as illustrated in Figure 7.1. This property is central to the practical applicability of support vector machines. Once the model is trained, a significant proportion of the data points can be discarded and only the support vectors retained. 

Having solved the quadratic programming problem and found a value for a, we can then determine the value of the threshold parameter b by noting that any support vector ${ \bf x } _ { n }$ satisfies $t _ { n } y ( \mathbf x _ { n } ) = 1$ . Using (7.13) this gives 

$$
t _ {n} \left(\sum_ {m \in \mathcal {S}} a _ {m} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) + b\right) = 1\tag{7.17}
$$

where $s$ denotes the set of indices of the support vectors. Although we can solve this equation for b using an arbitrarily chosen support vector ${ \bf x } _ { n }$ , a numerically more stable solution is obtained by first multiplying through by $t _ { n }$ , making use of $\dot { t } _ { n } ^ { 2 } = 1$ and then averaging these equations over all support vectors and solving for b to give 

$$
b = \frac {1}{N _ {\mathcal {S}}} \sum_ {n \in \mathcal {S}} \left(t _ {n} - \sum_ {m \in \mathcal {S}} a _ {m} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\right)\tag{7.18}
$$

where $N _ { S }$ is the total number of support vectors. 

For later comparison with alternative models, we can express the maximummargin classifier in terms of the minimization of an error function, with a simple quadratic regularizer, in the form 

$$
\sum_ {n = 1} ^ {N} E _ {\infty} (y (\mathbf {x} _ {n}) t _ {n} - 1) + \lambda \| \mathbf {w} \| ^ {2}\tag{7.19}
$$

where $E _ { \infty } ( z )$ is a function that is zero $\mathrm { i f } \ z \geqslant 0$ and $\infty$ otherwise and ensures that the constraints (7.5) are satisfied. Note that as long as the regularization parameter satisfies $\lambda > 0$ , its precise value plays no role. 

Figure 7.2 shows an example of the classification resulting from training a support vector machine on a simple synthetic data set using a Gaussian kernel of the form (6.23). Although the data set is not linearly separable in the two-dimensional data space x, it is linearly separable in the nonlinear feature space defined implicitly by the nonlinear kernel function. Thus the training data points are perfectly separated in the original data space. 


Example of synthetic data from two classes in two dimensions showing contours of constant $y ( \mathbf x )$ obtained from a support vector machine having a Gaussian kernel function. Also shown are the decision boundary, the margin boundaries, and the support vectors.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/08b85d37340b67bd5b2257299c220a5d19aed22ef679456af346793b0400bf0d.jpg)


This example also provides a geometrical insight into the origin of sparsity in the SVM. The maximum margin hyperplane is defined by the location of the support vectors. Other data points can be moved around freely (so long as they remain outside the margin region) without changing the decision boundary, and so the solution will be independent of such data points. 

## 7.1.1 Overlapping class distributions

So far, we have assumed that the training data points are linearly separable in the feature space $\phi ( \mathbf { x } )$ . The resulting support vector machine will give exact separation of the training data in the original input space x, although the corresponding decision boundary will be nonlinear. In practice, however, the class-conditional distributions may overlap, in which case exact separation of the training data can lead to poor generalization. 

We therefore need a way to modify the support vector machine so as to allow some of the training points to be misclassified. From (7.19) we see that in the case of separable classes, we implicitly used an error function that gave infinite error if a data point was misclassified and zero error if it was classified correctly, and then optimized the model parameters to maximize the margin. We now modify this approach so that data points are allowed to be on the ‘wrong side’ of the margin boundary, but with a penalty that increases with the distance from that boundary. For the subsequent optimization problem, it is convenient to make this penalty a linear function of this distance. To do this, we introduce slack variables, $\xi _ { n } \geqslant 0$ where $n = 1 , \ldots , N$ , with one slack variable for each training data point (Bennett, 1992; Cortes and Vapnik, 1995). These are defined by $\xi _ { n } = 0$ for data points that are on or inside the correct margin boundary and $\xi _ { n } = | t _ { n } - y ( \mathbf { x } _ { n } )$ for other points. Thus a data point that is on the decision boundary $y ( \mathbf { x } _ { n } ) = 0$ will have $\xi _ { n } = 1$ , and points 

Figure 7.3 Illustration of the slack variables $\xi _ { n } \geqslant 0$ Data points with circles around them are support vectors. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/9c6b38a63c712bd65e83872a3d515d494e66065ad07662cc01ec3a3acbdcfd6c.jpg)


with $\xi _ { n } > 1$ will be misclassified. The exact classification constraints (7.5) are then replaced with 

$$
t _ {n} y (\mathbf {x} _ {n}) \geqslant 1 - \xi_ {n}, \qquad n = 1, \ldots , N\tag{7.20}
$$

in which the slack variables are constrained to satisfy $\xi _ { n } \geqslant 0$ . Data points for which $\xi _ { n } = 0$ are correctly classified and are either on the margin or on the correct side of the margin. Points for which $0 < \xi _ { n } \leqslant 1$ lie inside the margin, but on the correct side of the decision boundary, and those data points for which $\xi _ { n } > 1$ lie on the wrong side of the decision boundary and are misclassified, as illustrated in Figure 7.3. This is sometimes described as relaxing the hard margin constraint to give a soft margin and allows some of the training set data points to be misclassified. Note that while slack variables allow for overlapping class distributions, this framework is still sensitive to outliers because the penalty for misclassification increases linearly with ξ. 

Our goal is now to maximize the margin while softly penalizing points that lie on the wrong side of the margin boundary. We therefore minimize 

$$
C \sum_ {n = 1} ^ {N} \xi_ {n} + \frac {1}{2} \| \mathbf {w} \| ^ {2}\tag{7.21}
$$

where the parameter $C > 0$ controls the trade-off between the slack variable penalty and the margin. Because any point that is misclassified has $\xi _ { n } > 1$ , it follows that $\sum _ { n } \xi _ { n }$ is an upper bound on the number of misclassified points. The parameter C is therefore analogous to (the inverse of) a regularization coefficient because it controls the trade-off between minimizing training errors and controlling model complexity. In the limit $C  \infty$ , we will recover the earlier support vector machine for separable data. 

We now wish to minimize (7.21) subject to the constraints (7.20) together with $\xi _ { n } \geqslant 0$ . The corresponding Lagrangian is given by 

$$
L (\mathbf {w}, b, \mathbf {a}) = \frac {1}{2} \| \mathbf {w} \| ^ {2} + C \sum_ {n = 1} ^ {N} \xi_ {n} - \sum_ {n = 1} ^ {N} a _ {n} \left\{t _ {n} y (\mathbf {x} _ {n}) - 1 + \xi_ {n} \right\} - \sum_ {n = 1} ^ {N} \mu_ {n} \xi_ {n}\tag{7.22}
$$

Appendix E 

where $\{ a _ { n } \geqslant 0 \}$ and $\{ \mu _ { n } \geqslant 0 \}$ are Lagrange multipliers. The corresponding set of KKT conditions are given by 

$$
a _ {n} \geqslant 0\tag{7.23}
$$

$$
t _ {n} y (\mathbf {x} _ {n}) - 1 + \xi_ {n} \geqslant 0\tag{7.24}
$$

$$
a _ {n} (t _ {n} y (\mathbf {x} _ {n}) - 1 + \xi_ {n}) = 0\tag{7.25}
$$

$$
\mu_ {n} \geqslant 0\tag{7.26}
$$

$$
\xi_ {n} \geqslant 0\tag{7.27}
$$

$$
\mu_ {n} \xi_ {n} = 0\tag{7.28}
$$

where $n = 1 , \ldots , N$ 

We now optimize out w, b, and $\{ \xi _ { n } \}$ making use of the definition (7.1) of $y ( \mathbf x )$ to give 

$$
\frac {\partial L}{\partial \mathbf {w}} = 0 \Rightarrow \mathbf {w} = \sum_ {n = 1} ^ {N} a _ {n} t _ {n} \phi (\mathbf {x} _ {n})\tag{7.29}
$$

$$
{\frac {\partial L}{\partial b}} = 0 \Rightarrow \sum_ {n = 1} ^ {N} a _ {n} t _ {n} = 0\tag{7.30}
$$

$$
\frac {\partial L}{\partial \xi_ {n}} = 0 \Rightarrow a _ {n} = C - \mu_ {n}.\tag{7.31}
$$

Using these results to eliminate w, b, and $\{ \xi _ { n } \}$ from the Lagrangian, we obtain the dual Lagrangian in the form 

$$
\widetilde {L} (\mathbf {a}) = \sum_ {n = 1} ^ {N} a _ {n} - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} a _ {n} a _ {m} t _ {n} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\tag{7.32}
$$

which is identical to the separable case, except that the constraints are somewhat different. To see what these constraints are, we note that $a _ { n } \geqslant 0$ is required because these are Lagrange multipliers. Furthermore, (7.31) together with $\mu _ { n } \geqslant 0$ implies $a _ { n } \leqslant C$ . We therefore have to minimize (7.32) with respect to the dual variables $\left\{ a _ { n } \right\}$ subject to 

$$
0 \leqslant a _ {n} \leqslant C
$$

$$
\sum_ {n = 1} ^ {N} a _ {n} t _ {n} = 0\tag{7.33}
$$

(7.34) 

for $n = 1 , \ldots , N$ , where (7.33) are known as box constraints. This again represents a quadratic programming problem. If we substitute (7.29) into (7.1), we see that predictions for new data points are again made by using (7.13). 

We can now interpret the resulting solution. As before, a subset of the data points may have $a _ { n } ~ = ~ 0$ , in which case they do not contribute to the predictive model (7.13). The remaining data points constitute the support vectors. These have $a _ { n } > 0$ and hence from (7.25) must satisfy 

$$
t _ {n} y (\mathbf {x} _ {n}) = 1 - \xi_ {n}.\tag{7.35}
$$

If $a _ { n } < C$ , then (7.31) implies that $\mu _ { n } > 0$ , which from (7.28) requires $\xi _ { n } = 0$ and hence such points lie on the margin. Points with $a _ { n } = C$ can lie inside the margin and can either be correctly classified if $\xi _ { n } \leqslant 1$ or misclassified if $\xi _ { n } > 1$ 

To determine the parameter $b$ in (7.1), we note that those support vectors for which $0 < a _ { n } < C$ have $\xi _ { n } = 0$ so that $t _ { n } y ( \mathbf x _ { n } ) = 1$ and hence will satisfy 

$$
t _ {n} \left(\sum_ {m \in \mathcal {S}} a _ {m} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) + b\right) = 1.\tag{7.36}
$$

Again, a numerically stable solution is obtained by averaging to give 

$$
b = \frac {1}{N _ {\mathcal {M}}} \sum_ {n \in \mathcal {M}} \left(t _ {n} - \sum_ {m \in \mathcal {S}} a _ {m} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\right)\tag{7.37}
$$

where denotes the set of indices of data points having $0 < a _ { n } < C$ 

An alternative, equivalent formulation of the support vector machine, known as the $\nu { - } S V M ,$ has been proposed by Scholkopf ¨ et al. (2000). This involves maximizing 

$$
\widetilde {L} (\mathbf {a}) = - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} a _ {n} a _ {m} t _ {n} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\tag{7.38}
$$

subject to the constraints 

$$
0 \leqslant a _ {n} \leqslant 1 / N\tag{7.39}
$$

$$
\sum_ {n = 1} ^ {N} a _ {n} t _ {n} = 0\tag{7.40}
$$

$$
\sum_ {n = 1} ^ {N} a _ {n} \geqslant \nu .\tag{7.41}
$$

This approach has the advantage that the parameter $\nu ,$ which replaces $C ,$ can be interpreted as both an upper bound on the fraction of margin errors (points for which $\xi _ { n } > 0$ and hence which lie on the wrong side of the margin boundary and which may or may not be misclassified) and a lower bound on the fraction of support vectors. An example of the ν-SVM applied to a synthetic data set is shown in Figure 7.4. Here Gaussian kernels of the form exp $( - \gamma \Vert \mathbf { x } - \mathbf { x } ^ { \prime } \Vert ^ { 2 } )$ have been used, with $\gamma = 0 . 4 5$ 

Although predictions for new inputs are made using only the support vectors, the training phase (i.e., the determination of the parameters a and b) makes use of the whole data set, and so it is important to have efficient algorithms for solving the quadratic programming problem. We first note that the objective function $\widetilde L ( \mathbf { a } )$ given by (7.10) or (7.32) is quadratic and so any local optimum will also be a global optimum provided the constraints define a convex region (which they do as a consequence of being linear). Direct solution of the quadratic programming problem using traditional techniques is often infeasible due to the demanding computation and memory requirements, and so more practical approaches need to be found. The technique of chunking (Vapnik, 1982) exploits the fact that the value of the Lagrangian is unchanged if we remove the rows and columns of the kernel matrix corresponding to Lagrange multipliers that have value zero. This allows the full quadratic programming problem to be broken down into a series of smaller ones, whose goal is eventually to identify all of the nonzero Lagrange multipliers and discard the others. Chunking can be implemented using protected conjugate gradients (Burges, 1998). Although chunking reduces the size of the matrix in the quadratic function from the number of data points squared to approximately the number of nonzero Lagrange multipliers squared, even this may be too big to fit in memory for large-scale applications. Decomposition methods (Osuna et al., 1996) also solve a series of smaller quadratic programming problems but are designed so that each of these is of a fixed size, and so the technique can be applied to arbitrarily large data sets. However, it still involves numerical solution of quadratic programming subproblems and these can be problematic and expensive. One of the most popular approaches to training support vector machines is called sequential minimal optimization, or SMO (Platt, 1999). It takes the concept of chunking to the extreme limit and considers just two Lagrange multipliers at a time. In this case, the subproblem can be solved analytically, thereby avoiding numerical quadratic programming altogether. Heuristics are given for choosing the pair of Lagrange multipliers to be considered at each step. In practice, SMO is found to have a scaling with the number of data points that is somewhere between linear and quadratic depending on the particular application. 


Figure 7.4 Illustration of the ν-SVM applied to a nonseparable data set in two dimensions. The support vectors are indicated by circles.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/1f52d0205f308a5a996042c7ee3dd0787cc1b14cfd147b04e6f81c7cfd80397f.jpg)


We have seen that kernel functions correspond to inner products in feature spaces that can have high, or even infinite, dimensionality. By working directly in terms of the kernel function, without introducing the feature space explicitly, it might therefore seem that support vector machines somehow manage to avoid the curse of dimensionality. This is not the case, however, because there are constraints amongst the feature values that restrict the effective dimensionality of feature space. To see this consider a simple second-order polynomial kernel that we can expand in terms of its components 

$$
\begin{array}{r c l} k (\mathbf {x}, \mathbf {z}) & = & \left(1 + \mathbf {x} ^ {\mathrm{T}} \mathbf {z}\right) ^ {2} = (1 + x _ {1} z _ {1} + x _ {2} z _ {2}) ^ {2} \\ & = & 1 + 2 x _ {1} z _ {1} + 2 x _ {2} z _ {2} + x _ {1} ^ {2} z _ {1} ^ {2} + 2 x _ {1} z _ {1} x _ {2} z _ {2} + x _ {2} ^ {2} z _ {2} ^ {2} \\ & = & (1, \sqrt {2} x _ {1}, \sqrt {2} x _ {2}, x _ {1} ^ {2}, \sqrt {2} x _ {1} x _ {2}, x _ {2} ^ {2}) (1, \sqrt {2} z _ {1}, \sqrt {2} z _ {2}, z _ {1} ^ {2}, \sqrt {2} z _ {1} z _ {2}, z _ {2} ^ {2}) ^ {\mathrm{T}} \\ & = & \phi (\mathbf {x}) ^ {\mathrm{T}} \phi (\mathbf {z}). \end{array} \tag {7.42}
$$

This kernel function therefore represents an inner product in a feature space having six dimensions, in which the mapping from input space to feature space is described by the vector function $\phi ( \mathbf { x } )$ . However, the coefficients weighting these different features are constrained to have specific forms. Thus any set of points in the original two-dimensional space x would be constrained to lie exactly on a two-dimensional nonlinear manifold embedded in the six-dimensional feature space. 

We have already highlighted the fact that the support vector machine does not provide probabilistic outputs but instead makes classification decisions for new input vectors. Veropoulos et al. (1999) discuss modifications to the SVM to allow the trade-off between false positive and false negative errors to be controlled. However, if we wish to use the SVM as a module in a larger probabilistic system, then probabilistic predictions of the class label t for new inputs x are required. 

To address this issue, Platt (2000) has proposed fitting a logistic sigmoid to the outputs of a previously trained support vector machine. Specifically, the required conditional probability is assumed to be of the form 

$$
p (t = 1 | \mathbf {x}) = \sigma \left(A y (\mathbf {x}) + B\right)\tag{7.43}
$$

where $y ( \mathbf x )$ is defined by (7.1). Values for the parameters A and B are found by minimizing the cross-entropy error function defined by a training set consisting of pairs of values $y ( \mathbf { x } _ { n } )$ and $t _ { n }$ . The data used to fit the sigmoid needs to be independent of that used to train the original SVM in order to avoid severe over-fitting. This twostage approach is equivalent to assuming that the output $y ( \mathbf x )$ of the support vector machine represents the log-odds of x belonging to class $t = 1$ . Because the SVM training procedure is not specifically intended to encourage this, the SVM can give a poor approximation to the posterior probabilities (Tipping, 2001). 

## 7.1.2 Relation to logistic regression

As with the separable case, we can re-cast the SVM for nonseparable distributions in terms of the minimization of a regularized error function. This will also allow us to highlight similarities, and differences, compared to the logistic regression model. 

We have seen that for data points that are on the correct side of the margin boundary, and which therefore satisfy $y _ { n } t _ { n } \geqslant 1$ , we have $\xi _ { n } ~ = ~ 0$ , and for the 

.5 Plot of the ‘hinge’ error function used in support vector machines, shown in blue, along with the error function for logistic regression, rescaled by a factor of $1 / \bar { \ln ( 2 ) }$ so that it passes through the point (0, 1), shown in red. Also shown are the misclassification error in black and the squared error in green. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/549bd5fe0295b776350b251c24505ae9ac6140666c6deaf02cb6a815b7f71a79.jpg)


remaining points we have $\xi _ { n } = 1 - y _ { n } t _ { n }$ . Thus the objective function (7.21) can be written (up to an overall multiplicative constant) in the form 

$$
\sum_ {n = 1} ^ {N} E _ {\mathrm{SV}} (y _ {n} t _ {n}) + \lambda \| \mathbf {w} \| ^ {2}\tag{7.44}
$$

where $\lambda = ( 2 C ) ^ { - 1 }$ , and $E _ { \mathrm { S V } } ( \cdot )$ is the hinge error function defined by 

$$
E _ {\mathrm{SV}} (y _ {n} t _ {n}) = [ 1 - y _ {n} t _ {n} ] _ {+}\tag{7.45}
$$

where [  ]<sub>+</sub> denotes the positive part. The hinge error function, so-called because of its shape, is plotted in Figure 7.5. It can be viewed as an approximation to the misclassification error, i.e., the error function that ideally we would like to minimize, which is also shown in Figure 7.5. 

When we considered the logistic regression model in Section 4.3.2, we found it convenient to work with target variable $t \in \{ 0 , 1 \}$ . For comparison with the support vector machine, we first reformulate maximum likelihood logistic regression using the target variable $t \in \{ - 1 , 1 \}$ . To do this, we note that $p ( t = 1 | y ) = \sigma ( y )$ where $y ( \mathbf x )$ is given by (7.1), and $\sigma ( y )$ is the logistic sigmoid function defined by (4.59). It follows that $p ( t = - 1 | y ) = 1 - \sigma ( y ) = \sigma ( - y )$ , where we have used the properties of the logistic sigmoid function, and so we can write 

$$
p (t | y) = \sigma (y t).\tag{7.46}
$$

From this we can construct an error function by taking the negative logarithm of the likelihood function that, with a quadratic regularizer, takes the form 

Exercise 7.6 

$$
\sum_ {n = 1} ^ {N} E _ {\mathrm{LR}} (y _ {n} t _ {n}) + \lambda \| \mathbf {w} \| ^ {2}.\tag{7.47}
$$

where 

$$
E _ {\mathrm{LR}} (y t) = \ln \left(1 + \exp (- y t)\right).\tag{7.48}
$$

For comparison with other error functions, we can divide by ln(2) so that the error function passes through the point (0, 1). This rescaled error function is also plotted in Figure 7.5 and we see that it has a similar form to the support vector error function. The key difference is that the flat region in $E _ { \mathrm { S V } } ( y t )$ leads to sparse solutions. 

Both the logistic error and the hinge loss can be viewed as continuous approximations to the misclassification error. Another continuous error function that has sometimes been used to solve classification problems is the squared error, which is again plotted in Figure 7.5. It has the property, however, of placing increasing emphasis on data points that are correctly classified but that are a long way from the decision boundary on the correct side. Such points will be strongly weighted at the expense of misclassified points, and so if the objective is to minimize the misclassification rate, then a monotonically decreasing error function would be a better choice. 

## 7.1.3 Multiclass SVMs

The support vector machine is fundamentally a two-class classifier. In practice, however, we often have to tackle problems involving $K > 2$ classes. Various methods have therefore been proposed for combining multiple two-class SVMs in order to build a multiclass classifier. 

One commonly used approach (Vapnik, 1998) is to construct K separate SVMs, in which the $k ^ { \mathrm { t h } }$ model $y _ { k } ( \mathbf { x } )$ is trained using the data from class $\mathcal { C } _ { k }$ as the positive examples and the data from the remaining $K - 1$ classes as the negative examples. This is known as the one-versus-the-rest approach. However, in Figure 4.2 we saw that using the decisions of the individual classifiers can lead to inconsistent results in which an input is assigned to multiple classes simultaneously. This problem is sometimes addressed by making predictions for new inputs x using 

$$
y (\mathbf {x}) = \max _ {k} y _ {k} (\mathbf {x}).\tag{7.49}
$$

Unfortunately, this heuristic approach suffers from the problem that the different classifiers were trained on different tasks, and there is no guarantee that the realvalued quantities $y _ { k } ( { \bf x } )$ for different classifiers will have appropriate scales. 

Another problem with the one-versus-the-rest approach is that the training sets are imbalanced. For instance, if we have ten classes each with equal numbers of training data points, then the individual classifiers are trained on data sets comprising 90% negative examples and only 10% positive examples, and the symmetry of the original problem is lost. A variant of the one-versus-the-rest scheme was proposed by Lee et al. (2001) who modify the target values so that the positive class has target +1 and the negative class has target $- 1 / ( K - 1 )$ 

Weston and Watkins (1999) define a single objective function for training all K SVMs simultaneously, based on maximizing the margin from each to remaining classes. However, this can result in much slower training because, instead of solving K separate optimization problems each over N data points with an overall cost of $O ( K { \bar { N } } ^ { 2 } )$ , a single optimization problem of size $( K - \bar { 1 } ) N$ must be solved giving an overall cost of ${ \bar { O } } ( K ^ { \bar { 2 } } N ^ { 2 } )$ . 

Another approach is to train $K ( K - 1 ) / 2$ different 2-class SVMs on all possible pairs of classes, and then to classify test points according to which class has the highest number of ‘votes’, an approach that is sometimes called one-versus-one. Again, we saw in Figure 4.2 that this can lead to ambiguities in the resulting classification. Also, for large K this approach requires significantly more training time than the one-versus-the-rest approach. Similarly, to evaluate test points, significantly more computation is required. 

The latter problem can be alleviated by organizing the pairwise classifiers into a directed acyclic graph (not to be confused with a probabilistic graphical model) leading to the DAGSVM (Platt et al., 2000). For K classes, the DAGSVM has a total of $K ( K - 1 ) / 2$ classifiers, and to classify a new test point only $K - 1$ pairwise classifiers need to be evaluated, with the particular classifiers used depending on which path through the graph is traversed. 

A different approach to multiclass classification, based on error-correcting output codes, was developed by Dietterich and Bakiri (1995) and applied to support vector machines by Allwein et al. (2000). This can be viewed as a generalization of the voting scheme of the one-versus-one approach in which more general partitions of the classes are used to train the individual classifiers. The K classes themselves are represented as particular sets of responses from the two-class classifiers chosen, and together with a suitable decoding scheme, this gives robustness to errors and to ambiguity in the outputs of the individual classifiers. Although the application of SVMs to multiclass classification problems remains an open issue, in practice the one-versus-the-rest approach is the most widely used in spite of its ad-hoc formulation and its practical limitations. 

There are also single-class support vector machines, which solve an unsupervised learning problem related to probability density estimation. Instead of modelling the density of data, however, these methods aim to find a smooth boundary enclosing a region of high density. The boundary is chosen to represent a quantile of the density, that is, the probability that a data point drawn from the distribution will land inside that region is given by a fixed number between 0 and 1 that is specified in advance. This is a more restricted problem than estimating the full density but may be sufficient in specific applications. Two approaches to this problem using support vector machines have been proposed. The algorithm of Scholkopf¨ et al. (2001) tries to find a hyperplane that separates all but a fixed fraction ν of the training data from the origin while at the same time maximizing the distance (margin) of the hyperplane from the origin, while Tax and Duin (1999) look for the smallest sphere in feature space that contains all but a fraction ν of the data points. For kernels $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ that are functions only of $\mathbf { x } - \mathbf { x } ^ { \prime }$ , the two algorithms are equivalent. 

## 7.1.4 SVMs for regression

We now extend support vector machines to regression problems while at the same time preserving the property of sparseness. In simple linear regression, we 

Figure 7.6 

Plot of an -insensitive error function (in red) in which the error increases linearly with distance beyond the insensitive region. Also shown for comparison is the quadratic error function (in green). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/863d1cdc9b603d5cdce68b32214d693a59c23d924a595f9eabd1a4e0dcc3183c.jpg)


minimize a regularized error function given by 

$$
\frac {1}{2} \sum_ {n = 1} ^ {N} \left\{y _ {n} - t _ {n} \right\} ^ {2} + \frac {\lambda}{2} \| \mathbf {w} \| ^ {2}.\tag{7.50}
$$

To obtain sparse solutions, the quadratic error function is replaced by an -insensitive error function (Vapnik, 1995), which gives zero error if the absolute difference between the prediction $y ( \mathbf x )$ and the target t is less than  where $\epsilon > 0$ . A simple example of an -insensitive error function, having a linear cost associated with errors outside the insensitive region, is given by 

$$
E _ {\epsilon} (y (\mathbf {x}) - t) = \left\{ \begin{array}{l l} 0, & \text { if } | y (\mathbf {x}) - t | <   \epsilon ; \\ | y (\mathbf {x}) - t | - \epsilon , & \text { otherwise } \end{array} \right.\tag{7.51}
$$

and is illustrated in Figure 7.6. 

We therefore minimize a regularized error function given by 

$$
C \sum_ {n = 1} ^ {N} E _ {\epsilon} (y (\mathbf {x} _ {n}) - t _ {n}) + \frac {1}{2} \| \mathbf {w} \| ^ {2}\tag{7.52}
$$

where $y ( \mathbf x )$ is given by (7.1). By convention the (inverse) regularization parameter, denoted C, appears in front of the error term. 

As before, we can re-express the optimization problem by introducing slack variables. For each data point ${ \bf x } _ { n }$ , we now need two slack variables $\xi _ { n } \geqslant 0$ and $\widehat { \xi } _ { n } \geqslant 0$ , where $\xi _ { n } > 0$ corresponds to a point for which $t _ { n } > y ( \mathbf x _ { n } ) + \epsilon .$ , and $\widehat { \xi } _ { n } > 0$ corresponds to a point for which $t _ { n } < y ( \mathbf x _ { n } ) - \epsilon .$ , as illustrated in Figure 7.7. 

The condition for a target point to lie inside the -tube is that $y _ { n } - \epsilon \leqslant t _ { n } \leqslant$ $y _ { n } + \epsilon$ , where $y _ { n } = y ( \mathbf { x } _ { n } )$ . Introducing the slack variables allows points to lie outside the tube provided the slack variables are nonzero, and the corresponding conditions are 

$$
{t _ {n}} \leqslant {y (\mathbf {x} _ {n}) + \epsilon + \xi_ {n}}\tag{7.53}
$$

$$
{t _ {n}} \geqslant {y (\mathbf {x} _ {n}) - \epsilon - \widehat {\xi} _ {n}.}\tag{7.54}
$$

igure 7.7 Illustration of SVM regression, showing the regression curve together with the $\epsilon \cdot$ insensitive ‘tube’. Also shown are examples of the slack variables $\xi$ and ${ \widehat { \xi } } .$ Points above the -tube have $\xi > 0$ and ${ \widehat { \xi } } = 0 ,$ points below the -tube have $\xi ~ = ~ 0$ and $\widehat { \xi } > 0$ , and points inside the -tube have $\xi = \widehat { \xi } = 0$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/33f5bf3c38e9fa73f73272d0d83e9a6c9ca4cfed9a9a6077dcee3942f075c472.jpg)


The error function for support vector regression can then be written as 

$$
C \sum_ {n = 1} ^ {N} (\xi_ {n} + \widehat {\xi} _ {n}) + \frac {1}{2} \| \mathbf {w} \| ^ {2}\tag{7.55}
$$

which must be minimized subject to the constraints $\xi _ { n } \geqslant 0$ and $\widehat { \xi } _ { n } \geqslant 0$ as well as (7.53) and (7.54). This can be achieved by introducing Lagrange multipliers $a _ { n } \geqslant 0$ $\widehat { a } _ { n } \geqslant 0 , \mu _ { n } \geqslant 0$ , and $\widehat { \mu } _ { n } \geqslant 0$ and optimizing the Lagrangian 

$$
\begin{array}{r c l} L & = & C \sum_ {n = 1} ^ {N} (\xi_ {n} + \widehat {\xi} _ {n}) + \frac {1}{2} \| \mathbf {w} \| ^ {2} - \sum_ {n = 1} ^ {N} (\mu_ {n} \xi_ {n} + \widehat {\mu} _ {n} \widehat {\xi} _ {n}) \\ & & - \sum_ {n = 1} ^ {N} a _ {n} (\epsilon + \xi_ {n} + y _ {n} - t _ {n}) - \sum_ {n = 1} ^ {N} \widehat {a} _ {n} (\epsilon + \widehat {\xi} _ {n} - y _ {n} + t _ {n}). \end{array}\tag{7.56}
$$

We now substitute for $y ( \mathbf x )$ using (7.1) and then set the derivatives of the Lagrangian with respect to $\mathbf { w } , b , \xi _ { n }$ , and $\widehat { \xi } _ { n }$ to zero, giving 

$$
\frac {\partial L}{\partial \mathbf {w}} = 0 \Rightarrow \mathbf {w} = \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) \phi (\mathbf {x} _ {n})\tag{7.57}
$$

$$
\frac {\partial L}{\partial b} = 0 \Rightarrow \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) = 0\tag{7.58}
$$

$$
\frac {\partial L}{\partial \xi_ {n}} = 0 \Rightarrow a _ {n} + \mu_ {n} = C\tag{7.59}
$$

$$
\frac {\partial L}{\partial \widehat {\xi} _ {n}} = 0 \Rightarrow \widehat {a} _ {n} + \widehat {\mu} _ {n} = C.\tag{7.60}
$$

Exercise 7.7 

Using these results to eliminate the corresponding variables from the Lagrangian, we see that the dual problem involves maximizing 

$$
\begin{array}{r c l} \widetilde {L} (\mathbf {a}, \widehat {\mathbf {a}}) & = & - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) (a _ {m} - \widehat {a} _ {m}) k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) \\ & & - \epsilon \sum_ {n = 1} ^ {N} (a _ {n} + \widehat {a} _ {n}) + \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) t _ {n} \end{array}\tag{7.61}
$$

with respect to $\left\{ a _ { n } \right\}$ and $\{ \widehat { a } _ { n } \}$ , where we have introduced the kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) =$ $\phi ( \mathbf { x } ) ^ { \mathrm { T } } \hat { \phi ( \mathbf { x } ^ { \prime } ) }$ . Again, this is a constrained maximization, and to find the constraints we note that $a _ { n } \geqslant 0$ and $\widehat { a } _ { n } \geqslant 0$ are both required because these are Lagrange multipliers. Also $\mu _ { n } \geqslant 0$ and $\widehat { \mu } _ { n } \geqslant 0$ together with (7.59) and (7.60), require $a _ { n } \leqslant C$ and $\widehat { a } _ { n } \leqslant C$ , and so again we have the box constraints 

$$
0 \leqslant a _ {n} \leqslant C\tag{7.62}
$$

$$
0 \leqslant \widehat {a} _ {n} \leqslant C\tag{7.63}
$$

together with the condition (7.58). 

Substituting (7.57) into (7.1), we see that predictions for new inputs can be made using 

$$
y (\mathbf {x}) = \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) k (\mathbf {x}, \mathbf {x} _ {n}) + b\tag{7.64}
$$

which is again expressed in terms of the kernel function. 

The corresponding Karush-Kuhn-Tucker (KKT) conditions, which state that at the solution the product of the dual variables and the constraints must vanish, are given by 

$$
a _ {n} (\epsilon + \xi_ {n} + y _ {n} - t _ {n}) = 0\tag{7.65}
$$

$$
\widehat {a} _ {n} (\epsilon + \widehat {\xi} _ {n} - y _ {n} + t _ {n}) = 0\tag{7.66}
$$

$$
(C - a _ {n}) \xi_ {n} = 0\tag{7.67}
$$

$$
(C - \widehat {a} _ {n}) \widehat {\xi} _ {n} = 0.\tag{7.68}
$$

From these we can obtain several useful results. First of all, we note that a coefficient $a _ { n }$ can only be nonzero if $\epsilon + \xi _ { n } + y _ { n } - t _ { n } = 0$ , which implies that the data point either lies on the upper boundary of the -tube $( \xi _ { n } ~ = ~ 0 )$ or lies above the upper boundary $( \xi _ { n } > 0 )$ . Similarly, a nonzero value for $\widehat { a } _ { n }$ implies $\epsilon + \widehat { \xi } _ { n } - y _ { n } + t _ { n } = 0$ and such points must lie either on or below the lower boundary of the -tube. 

Furthermore, the two constraints $\epsilon + \xi _ { n } + y _ { n } - t _ { n } = 0$ and $\epsilon + \widehat { \xi } _ { n } - y _ { n } + t _ { n } = 0$ are incompatible, as is easily seen by adding them together and noting that $\xi _ { n }$ and $\widehat { \xi } _ { n }$ are nonnegative while  is strictly positive, and so for every data point $\mathbf { x } _ { n } .$ , either $a _ { n }$ or $\widehat { a } _ { n }$ (or both) must be zero. 

The support vectors are those data points that contribute to predictions given by (7.64), in other words those for which either $a _ { n } \neq 0$ or $\widehat { a } _ { n } \neq 0$ . These are points that lie on the boundary of the -tube or outside the tube. All points within the tube have $a _ { n } = { \widehat { a } } _ { n } = 0$ . We again have a sparse solution, and the only terms that have to be evaluated in the predictive model (7.64) are those that involve the support vectors. 

The parameter b can be found by considering a data point for which $0 < a _ { n } <$ C, which from (7.67) must have $\xi _ { n } ~ = ~ 0$ , and from (7.65) must therefore satisfy $\epsilon + y _ { n } - t _ { n } = 0$ . Using (7.1) and solving for $b ,$ we obtain 

$$
\begin{array}{r c l} {b} & {=} & {t _ {n} - \epsilon - {\bf w} ^ {\mathrm{T}} \phi ({\bf x} _ {n})} \\ & {=} & {t _ {n} - \epsilon - \sum_ {m = 1} ^ {N} (a _ {m} - \widehat {a} _ {m}) k ({\bf x} _ {n}, {\bf x} _ {m})} \end{array}\tag{7.69}
$$

where we have used (7.57). We can obtain an analogous result by considering a point for which $0 < \widehat { a } _ { n } < C$ . In practice, it is better to average over all such estimates of b. 

As with the classification case, there is an alternative formulation of the SVM for regression in which the parameter governing complexity has a more intuitive interpretation (Scholkopf¨ et al., 2000). In particular, instead of fixing the width  of the insensitive region, we fix instead a parameter ν that bounds the fraction of points lying outside the tube. This involves maximizing 

$$
\begin{array}{r c l} \widetilde {L} (\mathbf {a}, \widehat {\mathbf {a}}) & = & - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) (a _ {m} - \widehat {a} _ {m}) k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) \\ & & + \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) t _ {n} \end{array}\tag{7.70}
$$

subject to the constraints 

$$
0 \leqslant a _ {n} \leqslant C / N\tag{7.71}
$$

Appendix A 

$$
0 \leqslant \widehat {a} _ {n} \leqslant C / N
$$

$$
\sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) = 0\tag{7.72}
$$

(7.73) 

$$
\sum_ {n = 1} ^ {N} (a _ {n} + \widehat {a} _ {n}) \leqslant \nu C.\tag{7.74}
$$

It can be shown that there are at most $\nu N$ data points falling outside the insensitive tube, while at least $\nu N$ data points are support vectors and so lie either on the tube or outside it. 

The use of a support vector machine to solve a regression problem is illustrated using the sinusoidal data set in Figure 7.8. Here the parameters ν and C have been chosen by hand. In practice, their values would typically be determined by crossvalidation. 

Figure 7.8 Illustration of the $\nu { \mathrm { - } } \mathsf { S V M }$ for regression applied to the sinusoidal synthetic data set using Gaussian kernels. The predicted regression curve is shown by the red line, and the -insensitive tube corresponds to the shaded region. Also, the data points are shown in green, and those with support vectors are indicated by blue circles. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/2090f61315ba1787fc8d63985cfbc6cba1c9768f9cabf0323caec65423040579.jpg)


## 7.1.5 Computational learning theory

Historically, support vector machines have largely been motivated and analysed using a theoretical framework known as computational learning theory, also sometimes called statistical learning theory (Anthony and Biggs, 1992; Kearns and Vazirani, 1994; Vapnik, 1995; Vapnik, 1998). This has its origins with Valiant (1984) who formulated the probably approximately correct, or PAC, learning framework. The goal of the PAC framework is to understand how large a data set needs to be in order to give good generalization. It also gives bounds for the computational cost of learning, although we do not consider these here. 

Suppose that a data set of size N is drawn from some joint distribution $p ( \mathbf { x } , \mathbf { t } )$ where x is the input variable and t represents the class label, and that we restrict attention to ‘noise free’ situations in which the class labels are determined by some (unknown) deterministic function $\mathbf { t } = \mathbf { g } ( \mathbf { x } )$ . In PAC learning we say that a function $\mathbf { f } \left( \mathbf { x } ; \mathcal { D } \right)$ , drawn from a space $\mathcal { F }$ of such functions on the basis of the training set $\mathcal { D }$ , has good generalization if its expected error rate is below some pre-specified threshold , so that 

$$
\mathbb {E} _ {\mathbf {x}, \mathbf {t}} \left[ I \left(\mathbf {f} (\mathbf {x}; \mathcal {D}) \neq \mathbf {t}\right) \right] <   \epsilon\tag{7.75}
$$

where $I ( \cdot )$ is the indicator function, and the expectation is with respect to the distribution $p ( \mathbf { x } , \mathbf { t } )$ . The quantity on the left-hand side is a random variable, because it depends on the training set , and the PAC framework requires that (7.75) holds, with probability greater than $1 - \delta$ , for a data set drawn randomly from $p ( \mathbf { x } , \mathbf { t } )$ Here $\delta$ is another pre-specified parameter, and the terminology ‘probably approximately correct’ comes from the requirement that with high probability (greater than $1 - \delta )$ , the error rate be small (less than ). For a given choice of model space $\mathcal { F }$ , and for given parameters  and δ, PAC learning aims to provide bounds on the minimum size N of data set needed to meet this criterion. A key quantity in PAC learning is the Vapnik-Chervonenkis dimension, or VC dimension, which provides a measure of the complexity of a space of functions, and which allows the PAC framework to be extended to spaces containing an infinite number of functions. 

The bounds derived within the PAC framework are often described as worstcase, because they apply to any choice for the distribution $p ( \mathbf { x } , \mathbf { t } )$ , so long as both the training and the test examples are drawn (independently) from the same distribution, and for $a n y$ choice for the function $\mathbf { f } \left( \mathbf { x } \right)$ so long as it belongs to $\mathcal { F }$ . In real-world applications of machine learning, we deal with distributions that have significant regularity, for example in which large regions of input space carry the same class label. As a consequence of the lack of any assumptions about the form of the distribution, the PAC bounds are very conservative, in other words they strongly over-estimate the size of data sets required to achieve a given generalization performance. For this reason, PAC bounds have found few, if any, practical applications. 

One attempt to improve the tightness of the PAC bounds is the PAC-Bayesian framework (McAllester, 2003), which considers a distribution over the space $\mathcal { F }$ of functions, somewhat analogous to the prior in a Bayesian treatment. This still considers any possible choice for $p ( \mathbf { x } , \mathbf { t } )$ , and so although the bounds are tighter, they are still very conservative. 

## 7.2. Relevance Vector Machines

Support vector machines have been used in a variety of classification and regression applications. Nevertheless, they suffer from a number of limitations, several of which have been highlighted already in this chapter. In particular, the outputs of an SVM represent decisions rather than posterior probabilities. Also, the SVM was originally formulated for two classes, and the extension to $K > 2$ classes is problematic. There is a complexity parameter $C ,$ or ν (as well as a parameter  in the case of regression), that must be found using a hold-out method such as cross-validation. Finally, predictions are expressed as linear combinations of kernel functions that are centred on training data points and that are required to be positive definite. 

The relevance vector machine or RVM (Tipping, 2001) is a Bayesian sparse kernel technique for regression and classification that shares many of the characteristics of the SVM whilst avoiding its principal limitations. Additionally, it typically leads to much sparser models resulting in correspondingly faster performance on test data whilst maintaining comparable generalization error. 

In contrast to the SVM we shall find it more convenient to introduce the regression form of the RVM first and then consider the extension to classification tasks. 

## 7.2.1 RVM for regression

The relevance vector machine for regression is a linear model of the form studied in Chapter 3 but with a modified prior that results in sparse solutions. The model defines a conditional distribution for a real-valued target variable t, given an input vector x, which takes the form 

$$
p (t | \mathbf {x}, \mathbf {w}, \beta) = \mathcal {N} (t | y (\mathbf {x}), \beta^ {- 1})\tag{7.76}
$$

where $\beta = \sigma ^ { - 2 }$ is the noise precision (inverse noise variance), and the mean is given by a linear model of the form 

$$
y (\mathbf {x}) = \sum_ {i = 1} ^ {M} w _ {i} \phi_ {i} (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x})\tag{7.77}
$$

with fixed nonlinear basis functions $\phi _ { i } ( \mathbf { x } )$ , which will typically include a constant term so that the corresponding weight parameter represents a ‘bias’. 

The relevance vector machine is a specific instance of this model, which is intended to mirror the structure of the support vector machine. In particular, the basis functions are given by kernels, with one kernel associated with each of the data points from the training set. The general expression (7.77) then takes the SVM-like form 

$$
y (\mathbf {x}) = \sum_ {n = 1} ^ {N} w _ {n} k (\mathbf {x}, \mathbf {x} _ {n}) + b\tag{7.78}
$$

where b is a bias parameter. The number of parameters in this case is $M = N + 1$ and $y ( \mathbf x )$ has the same form as the predictive model (7.64) for the SVM, except that the coefficients $a _ { n }$ are here denoted $w _ { n }$ . It should be emphasized that the subsequent analysis is valid for arbitrary choices of basis function, and for generality we shall work with the form (7.77). In contrast to the SVM, there is no restriction to positivedefinite kernels, nor are the basis functions tied in either number or location to the training data points. 

Suppose we are given a set of N observations of the input vector x, which we denote collectively by a data matrix X whose $n ^ { \mathrm { t h } }$ row is ${ \bf x } _ { n } ^ { \mathrm { T } }$ with $n = 1 , \ldots , N$ . The corresponding target values are given by ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . Thus, the likelihood function is given by 

$$
p (\mathbf {t} | \mathbf {X}, \mathbf {w}, \beta) = \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {x} _ {n}, \mathbf {w}, \beta^ {- 1}).\tag{7.79}
$$

Next we introduce a prior distribution over the parameter vector w and as in Chapter 3, we shall consider a zero-mean Gaussian prior. However, the key difference in the RVM is that we introduce a separate hyperparameter $\alpha _ { i }$ for each of the weight parameters $w _ { i }$ instead of a single shared hyperparameter. Thus the weight prior takes the form 

$$
p (\mathbf {w} | \boldsymbol {\alpha}) = \prod_ {i = 1} ^ {M} \mathcal {N} (w _ {i} | 0, \alpha_ {i} ^ {- 1})\tag{7.80}
$$

where $\alpha _ { i }$ represents the precision of the corresponding parameter $w _ { i }$ , and α denotes $( \alpha _ { 1 } , \ldots , \bar { \alpha _ { M } } ) ^ { \mathrm { T } }$ . We shall see that, when we maximize the evidence with respect to these hyperparameters, a significant proportion of them go to infinity, and the corresponding weight parameters have posterior distributions that are concentrated at zero. The basis functions associated with these parameters therefore play no role in the predictions made by the model and so are effectively pruned out, resulting in a sparse model. 

Using the result (3.49) for linear regression models, we see that the posterior distribution for the weights is again Gaussian and takes the form 

$$
p (\mathbf {w} | \mathbf {t}, \mathbf {X}, \boldsymbol {\alpha}, \beta) = \mathcal {N} (\mathbf {w} | \mathbf {m}, \boldsymbol {\Sigma})\tag{7.81}
$$

where the mean and covariance are given by 

$$
\mathbf {m} = \beta \boldsymbol {\Sigma} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}\tag{7.82}
$$

$$
\boldsymbol {\Sigma} = \left(\mathbf {A} + \beta \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\right) ^ {- 1}\tag{7.83}
$$

where Φ is the $N \times M$ design matrix with elements $\Phi _ { n i } ~ = ~ \phi _ { i } ( \mathbf { x } _ { n } )$ , and ${ \textbf { A } } =$ $\mathrm { d i a g } ( \alpha _ { i } )$ . Note that in the specific case of the model (7.78), we have Φ ${ \mathbf { \Gamma } } = { \mathbf { K } }$ , where K is the symmetric $( N + 1 ) \times ( N + 1 )$ kernel matrix with elements $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } )$ 

The values of $\alpha$ and $\beta$ are determined using type-2 maximum likelihood, also known as the evidence approximation, in which we maximize the marginal likelihood function obtained by integrating out the weight parameters 

$$
p (\mathbf {t} | \mathbf {X}, \boldsymbol {\alpha}, \beta) = \int p (\mathbf {t} | \mathbf {X}, \mathbf {w}, \beta) p (\mathbf {w} | \boldsymbol {\alpha}) d \mathbf {w}.\tag{7.84}
$$

Because this represents the convolution of two Gaussians, it is readily evaluated to give the log marginal likelihood in the form 

$$
\begin{array}{r c l} \ln p (\mathbf {t} | \mathbf {X}, \boldsymbol {\alpha}, \beta) & = & \ln \mathcal {N} (\mathbf {t} | \mathbf {0}, \mathbf {C}) \\ & = & - \frac {1}{2} \left\{N \ln (2 \pi) + \ln | \mathbf {C} | + \mathbf {t} ^ {\mathrm{T}} \mathbf {C} ^ {- 1} \mathbf {t} \right\} \end{array}\tag{7.85}
$$

where ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ , and we have defined the $N \times N$ matrix C given by 

$$
\mathbf {C} = \beta^ {- 1} \mathbf {I} + \boldsymbol {\Phi} \mathbf {A} ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}}.\tag{7.86}
$$

Our goal is now to maximize (7.85) with respect to the hyperparameters α and $\beta .$ This requires only a small modification to the results obtained in Section 3.5 for the evidence approximation in the linear regression model. Again, we can identify two approaches. In the first, we simply set the required derivatives of the marginal likelihood to zero and obtain the following re-estimation equations 

$$
\alpha_ {i} ^ {\mathrm{new}} = \frac {\gamma_ {i}}{m _ {i} ^ {2}}\tag{7.87}
$$

$$
(\beta^ {\mathrm{new}}) ^ {- 1} = \frac {\| \mathbf {t} - \boldsymbol {\Phi} \mathbf {m} \| ^ {2}}{N - \sum_ {i} \gamma_ {i}}\tag{7.88}
$$

where $m _ { i }$ is the $i ^ { \mathrm { t h } }$ component of the posterior mean m defined by (7.82). The quantity $\gamma _ { i }$ measures how well the corresponding parameter $w _ { i }$ is determined by the data and is defined by 

$$
\gamma_ {i} = 1 - \alpha_ {i} \Sigma_ {i i}\tag{7.89}
$$

in which $\Sigma _ { i i }$ is the $i ^ { \mathrm { t h } }$ diagonal component of the posterior covariance Σ given by (7.83). Learning therefore proceeds by choosing initial values for α and $\beta ,$ evaluating the mean and covariance of the posterior using (7.82) and (7.83), respectively, and then alternately re-estimating the hyperparameters, using (7.87) and (7.88), and re-estimating the posterior mean and covariance, using (7.82) and (7.83), until a suitable convergence criterion is satisfied. 

The second approach is to use the EM algorithm, and is discussed in Section 9.3.4. These two approaches to finding the values of the hyperparameters that maximize the evidence are formally equivalent. Numerically, however, it is found that the direct optimization approach corresponding to (7.87) and (7.88) gives somewhat faster convergence (Tipping, 2001). 

As a result of the optimization, we find that a proportion of the hyperparameters $\left\{ \alpha _ { i } \right\}$ are driven to large (in principle infinite) values, and so the weight parameters $w _ { i }$ corresponding to these hyperparameters have posterior distributions with mean and variance both zero. Thus those parameters, and the corresponding basis functions $\phi _ { i } ( \mathbf { x } )$ , are removed from the model and play no role in making predictions for new inputs. In the case of models of the form (7.78), the inputs ${ \bf x } _ { n }$ corresponding to the remaining nonzero weights are called relevance vectors, because they are identified through the mechanism of automatic relevance determination, and are analogous to the support vectors of an SVM. It is worth emphasizing, however, that this mechanism for achieving sparsity in probabilistic models through automatic relevance determination is quite general and can be applied to any model expressed as an adaptive linear combination of basis functions. 

Having found values $\alpha ^ { \star }$ and $\beta ^ { \star }$ for the hyperparameters that maximize the marginal likelihood, we can evaluate the predictive distribution over t for a new input x. Using (7.76) and (7.81), this is given by 

$$
\begin{array}{r c l} p (t | \mathbf {x}, \mathbf {X}, \mathbf {t}, \boldsymbol {\alpha} ^ {\star}, \beta^ {\star}) & = & \int p (t | \mathbf {x}, \mathbf {w}, \beta^ {\star}) p (\mathbf {w} | \mathbf {X}, \mathbf {t}, \boldsymbol {\alpha} ^ {\star}, \beta^ {\star})   \mathrm{d} \mathbf {w} \\ & = & \mathcal {N} \left(t | \mathbf {m} ^ {\mathrm{T}} \phi (\mathbf {x}), \sigma^ {2} (\mathbf {x})\right). \end{array}\tag{7.90}
$$

Thus the predictive mean is given by (7.76) with w set equal to the posterior mean m, and the variance of the predictive distribution is given by 

$$
\sigma^ {2} (\mathbf {x}) = (\beta^ {\star}) ^ {- 1} + \phi (\mathbf {x}) ^ {\mathrm{T}} \pmb {\Sigma} \phi (\mathbf {x})\tag{7.91}
$$

where Σ is given by (7.83) in which α and $\beta$ are set to their optimized values $\alpha ^ { \star }$ and $\beta ^ { \star }$ . This is just the familiar result (3.59) obtained in the context of linear regression. Recall that for localized basis functions, the predictive variance for linear regression models becomes small in regions of input space where there are no basis functions. In the case of an RVM with the basis functions centred on data points, the model will therefore become increasingly certain of its predictions when extrapolating outside the domain of the data (Rasmussen and Quinonero-Candela, 2005), which of course˜ is undesirable. The predictive distribution in Gaussian process regression does not 

Illustration of RVM regression using the same data set, and the same Gaussian kernel functions, as used in Figure 7.8 for the $\nu { \mathrm { - } } { \mathsf { S V M } }$ regression model. The mean of the predictive distribution for the RVM is shown by the red line, and the one standarddeviation predictive distribution is shown by the shaded region. Also, the data points are shown in green, and the relevance vectors are indicated by blue circles. Note that there are only 3 relevance vectors compared to 7 support vectors for the ν-SVM in Figure 7.8. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a8917173aa3cf6979dde30a4ee77e6db6e6d7956f33de96edddb27fcec906672.jpg)


suffer from this problem. However, the computational cost of making predictions with a Gaussian processes is typically much higher than with an RVM. 

Figure 7.9 shows an example of the RVM applied to the sinusoidal regression data set. Here the noise precision parameter $\beta$ is also determined through evidence maximization. We see that the number of relevance vectors in the RVM is significantly smaller than the number of support vectors used by the SVM. For a wide range of regression and classification tasks, the RVM is found to give models that are typically an order of magnitude more compact than the corresponding support vector machine, resulting in a significant improvement in the speed of processing on test data. Remarkably, this greater sparsity is achieved with little or no reduction in generalization error compared with the corresponding SVM. 

The principal disadvantage of the RVM compared to the SVM is that training involves optimizing a nonconvex function, and training times can be longer than for a comparable SVM. For a model with M basis functions, the RVM requires inversion of a matrix of size $M \times M$ , which in general requires $O ( M ^ { 3 } )$ computation. In the specific case of the SVM-like model (7.78), we have $M = N + 1$ . As we have noted, there are techniques for training SVMs whose cost is roughly quadratic in N. Of course, in the case of the RVM we always have the option of starting with a smaller number of basis functions than $N + 1$ . More significantly, in the relevance vector machine the parameters governing complexity and noise variance are determined automatically from a single training run, whereas in the support vector machine the parameters $C$ and  (or ν) are generally found using cross-validation, which involves multiple training runs. Furthermore, in the next section we shall derive an alternative procedure for training the relevance vector machine that improves training speed significantly. 

## 7.2.2 Analysis of sparsity

We have noted earlier that the mechanism of automatic relevance determination causes a subset of parameters to be driven to zero. We now examine in more detail the mechanism of sparsity in the context of the relevance vector machine. In the process, we will arrive at a significantly faster procedure for optimizing the hyperparameters compared to the direct techniques given above. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/fae359950937cd77bd9a100245c38fea36ddc2cd6a09eca0cca3c082a5a9aec3.jpg)



Figure 7.10 Illustration of the mechanism for sparsity in a Bayesian linear regression model, showing a training set vector of target values given by ${ \bf t } = ( t _ { 1 } , t _ { 2 } ) ^ { \mathrm { T } }$ , indicated by the cross, for a model with one basis vector $\varphi = \left( \phi ( \mathbf { x } _ { 1 } ) , \phi ( \mathbf { x } _ { 2 } ) \right) ^ { \mathrm { T } }$ , which is poorly aligned with the target data vector t. On the left we see a model having only isotropic noise, so that $\mathbf { C } = \beta ^ { \mathbf { \bar { - } } 1 } \mathbf { I }$ , corresponding to $\alpha = \infty ,$ , with $\beta$ set to its most probable value. On the right we see the same model but with a finite value of $\alpha .$ . In each case the red ellipse corresponds to unit Mahalanobis distance, with $| \mathbf { C } |$ taking the same value for both plots, while the dashed green circle shows the contrition arising from the noise term $\beta ^ { - 1 }$ . We see that any finite value of $\alpha$ reduces the probability of the observed data, and so for the most probable solution the basis vector is removed.


Before proceeding with a mathematical analysis, we first give some informal insight into the origin of sparsity in Bayesian linear models. Consider a data set comprising $N = 2$ observations $t _ { 1 }$ and $t _ { 2 }$ , together with a model having a single basis function $\phi ( \mathbf { x } )$ , with hyperparameter α, along with isotropic noise having precision $\beta .$ . From (7.85), the marginal likelihood is given by $p ( \mathbf { t } | \bar { \alpha } , \beta ) = \mathcal { N } ( \mathbf { t } | \mathbf { 0 } , \mathbf { C } )$ in which the covariance matrix takes the form 

$$
\mathbf {C} = \frac {1}{\beta} \mathbf {I} + \frac {1}{\alpha} \boldsymbol {\varphi} \boldsymbol {\varphi} ^ {\mathrm{T}}\tag{7.92}
$$

where $\varphi$ denotes the N-dimensional vector $( \phi ( \mathbf { x } _ { 1 } ) , \phi ( \mathbf { x } _ { 2 } ) ) ^ { \mathrm { T } }$ , and similarly ${ \textbf { t } } =$ $( t _ { 1 } , t _ { 2 } ) ^ { \dot { \mathrm { T } } }$ . Notice that this is just a zero-mean Gaussian process model over t with covariance C. Given a particular observation for t, our goal is to find $\alpha ^ { \star }$ and $\beta ^ { \star }$ by maximizing the marginal likelihood. We see from Figure 7.10 that, if there is a poor alignment between the direction of $\varphi$ and that of the training data vector t, then the corresponding hyperparameter $\alpha$ will be driven to $\infty .$ , and the basis vector will be pruned from the model. This arises because any finite value for α will always assign a lower probability to the data, thereby decreasing the value of the density at t, provided that $\beta$ is set to its optimal value. We see that any finite value for α would cause the distribution to be elongated in a direction away from the data, thereby increasing the probability mass in regions away from the observed data and hence reducing the value of the density at the target data vector itself. For the more general case of M basis vectors $\varphi _ { 1 } , \ldots , \varphi _ { M }$ a similar intuition holds, namely that if a particular basis vector is poorly aligned with the data vector t, then it is likely to be pruned from the model. 

We now investigate the mechanism for sparsity from a more mathematical perspective, for a general case involving M basis functions. To motivate this analysis we first note that, in the result (7.87) for re-estimating the parameter $\alpha _ { i }$ , the terms on the right-hand side are themselves also functions of $\alpha _ { i }$ . These results therefore represent implicit solutions, and iteration would be required even to determine a single $\alpha _ { i }$ with all other $\alpha _ { j }$ for $j \neq i$ fixed. 

This suggests a different approach to solving the optimization problem for the RVM, in which we make explicit all of the dependence of the marginal likelihood (7.85) on a particular $\alpha _ { i }$ and then determine its stationary points explicitly (Faul and Tipping, 2002; Tipping and Faul, 2003). To do this, we first pull out the contribution from $\alpha _ { i }$ in the matrix C defined by (7.86) to give 

$$
\begin{array}{r c l} \mathbf {C} & = & \beta^ {- 1} \mathbf {I} + \sum_ {j \neq i} \alpha_ {j} ^ {- 1} \boldsymbol {\varphi} _ {j} \boldsymbol {\varphi} _ {j} ^ {\mathrm{T}} + \alpha_ {i} ^ {- 1} \boldsymbol {\varphi} _ {i} \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \\ & = & \mathbf {C} _ {- i} + \alpha_ {i} ^ {- 1} \boldsymbol {\varphi} _ {i} \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \end{array}\tag{7.93}
$$

where $\varphi _ { i }$ denotes the $i ^ { \mathrm { t h } }$ column of $\Phi$ , in other words the N-dimensional vector with elements $( \phi _ { i } ( \mathbf { x } _ { 1 } ) , \ldots , \phi _ { i } ( \mathbf { x } _ { N } ) )$ , in contrast to $\phi _ { n }$ , which denotes the $n ^ { \mathrm { t h } }$ row of $\Phi$ The matrix $\mathbf { C } _ { - i }$ represents the matrix C with the contribution from basis function i removed. Using the matrix identities (C.7) and (C.15), the determinant and inverse of C can then be written 

$$
{| \mathbf {C} |} = {| \mathbf {C} _ {- i} | | 1 + \alpha_ {i} ^ {- 1} \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1} \boldsymbol {\varphi} _ {i} |}\tag{7.94}
$$

$$
\mathbf {C} ^ {- 1} = \mathbf {C} _ {- i} ^ {- 1} - \frac {\mathbf {C} _ {- i} ^ {- 1} \boldsymbol {\varphi} _ {i} \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1}}{\alpha_ {i} + \boldsymbol {\varphi} _ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1} \boldsymbol {\varphi} _ {i}}.\tag{7.95}
$$

Exercise 7.15 

Using these results, we can then write the log marginal likelihood function (7.85) in the form 

$$
L (\boldsymbol {\alpha}) = L \left(\boldsymbol {\alpha} _ {- i}\right) + \lambda \left(\alpha_ {i}\right)\tag{7.96}
$$

where $L (  { \alpha } _ { - i } )$ is simply the log marginal likelihood with basis function $\varphi _ { i }$ omitted, and the quantity $\lambda ( \alpha _ { i } )$ is defined by 

$$
\lambda (\alpha_ {i}) = \frac {1}{2} \left[ \ln \alpha_ {i} - \ln (\alpha_ {i} + s _ {i}) + \frac {q _ {i} ^ {2}}{\alpha_ {i} + s _ {i}} \right]\tag{7.97}
$$

and contains all of the dependence on $\alpha _ { i }$ . Here we have introduced the two quantities 

$$
{s _ {i}} = {\varphi_ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1} \varphi_ {i}}\tag{7.98}
$$

$$
{q _ {i}} = {\varphi_ {i} ^ {\mathrm{T}} \mathbf {C} _ {- i} ^ {- 1} \mathbf {t}.}\tag{7.99}
$$

Here $s _ { i }$ is called the sparsity and $q _ { i }$ is known as the quality of $\varphi _ { i }$ , and as we shall see, a large value of $s _ { i }$ relative to the value of $q _ { i }$ means that the basis function $\varphi _ { i }$ is more likely to be pruned from the model. The ‘sparsity’ measures the extent to which basis function $\varphi _ { i }$ overlaps with the other basis vectors in the model, and the ‘quality’ represents a measure of the alignment of the basis vector $\varphi _ { n }$ with the error between the training set values $\mathbf { t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ and the vector ${ \pmb y } _ { - i }$ of predictions that would result from the model with the vector $\varphi _ { i }$ excluded (Tipping and Faul, 2003). 


Figure 7.11 Plots of the log marginal likelihood $\lambda ( \alpha _ { i } )$ versus ln $\alpha _ { i }$ showing on the left, the single maximum at a finite $\alpha _ { i }$ for $q _ { i } ^ { 2 } \ = \ 4$ and $s _ { i } = 1$ (so that $q _ { i } ^ { 2 } > s _ { i } )$ and on the right, the maximum at $\alpha _ { i } = \infty$ for $q _ { i } ^ { 2 } ~ = ~ 1$ and $s _ { i } ~ = ~ 2$ (so that $q _ { i } ^ { 2 } < s _ { i } )$


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/3d268babf3bc5c3ecfb27bdded9c045b81f3f18e9b1385ce447a20d4b932e30d.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/ad23958f596cbd7b20b06eea400fcc40f6c3e0bb80a7b08d8742e8a0ad5ece92.jpg)


The stationary points of the marginal likelihood with respect to $\alpha _ { i }$ occur when the derivative 

$$
\frac {\mathrm{d} \lambda (\alpha_ {i})}{\mathrm{d} \alpha_ {i}} = \frac {\alpha_ {i} ^ {- 1} s _ {i} ^ {2} - (q _ {i} ^ {2} - s _ {i})}{2 (\alpha_ {i} + s _ {i}) ^ {2}}\tag{7.100}
$$

is equal to zero. There are two possible forms for the solution. Recalling that $\alpha _ { i } \geqslant 0$ we see that if $q _ { i } ^ { 2 } < s _ { i }$ , then $\alpha _ { i } \to \infty$ provides a solution. Conversely, if $q _ { i } ^ { 2 } > s _ { i }$ , we can solve for $\alpha _ { i }$ to obtain 

$$
\alpha_ {i} = \frac {s _ {i} ^ {2}}{q _ {i} ^ {2} - s _ {i}}.\tag{7.101}
$$

These two solutions are illustrated in Figure 7.11. We see that the relative size of the quality and sparsity terms determines whether a particular basis vector will be pruned from the model or not. A more complete analysis (Faul and Tipping, 2002), based on the second derivatives of the marginal likelihood, confirms these solutions are indeed the unique maxima of $\lambda ( \alpha _ { i } )$ 

Note that this approach has yielded a closed-form solution for $\alpha _ { i }$ , for given values of the other hyperparameters. As well as providing insight into the origin of sparsity in the RVM, this analysis also leads to a practical algorithm for optimizing the hyperparameters that has significant speed advantages. This uses a fixed set of candidate basis vectors, and then cycles through them in turn to decide whether each vector should be included in the model or not. The resulting sequential sparse Bayesian learning algorithm is described below. 

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

$$
Q _ {i} = \varphi_ {i} ^ {\mathrm{T}} \mathbf {C} ^ {- 1} \mathbf {t}\tag{7.102}
$$

$$
{S _ {i}} = {\varphi_ {i} ^ {\mathrm{T}} \mathbf {C} ^ {- 1} \varphi_ {i}.}\tag{7.103}
$$

The quality and sparseness variables can then be expressed in the form 

$$
{q _ {i}} = {\frac {\alpha_ {i} Q _ {i}}{\alpha_ {i} - S _ {i}}}\tag{7.104}
$$

$$
s _ {i} = \frac {\alpha_ {i} S _ {i}}{\alpha_ {i} - S _ {i}}.\tag{7.105}
$$

Exercise 7.17 

Note that when $\alpha _ { i } = \infty$ , we have $q _ { i } = Q _ { i }$ and $s _ { i } = S _ { i }$ . Using (C.7), we can write 

$$
{Q _ {i}} = {\beta \varphi_ {i} ^ {\mathrm{T}} \mathbf {t} - \beta^ {2} \varphi_ {i} ^ {\mathrm{T}} \boldsymbol {\Phi} \boldsymbol {\Sigma} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}}\tag{7.106}
$$

$$
{S _ {i}} = {\beta \pmb {\varphi} _ {i} ^ {\mathrm{T}} \pmb {\varphi} _ {i} - \beta^ {2} \pmb {\varphi} _ {i} ^ {\mathrm{T}} \pmb {\Phi} \pmb {\Sigma} \pmb {\Phi} ^ {\mathrm{T}} \pmb {\varphi} _ {i}}\tag{7.107}
$$

where $\Phi$ and Σ involve only those basis vectors that correspond to finite hyperparameters $\alpha _ { i }$ . At each stage the required computations therefore scale like $O ( M ^ { 3 } )$ , where M is the number of active basis vectors in the model and is typically much smaller than the number $N$ of training patterns. 

## 7.2.3 RVM for classification

We can extend the relevance vector machine framework to classification problems by applying the ARD prior over weights to a probabilistic linear classification model of the kind studied in Chapter 4. To start with, we consider two-class problems with a binary target variable $t \in \{ 0 , 1 \}$ . The model now takes the form of a linear combination of basis functions transformed by a logistic sigmoid function 

$$
y (\mathbf {x}, \mathbf {w}) = \sigma \left(\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x})\right)\tag{7.108}
$$

where $\sigma ( \cdot )$ is the logistic sigmoid function defined by (4.59). If we introduce a Gaussian prior over the weight vector w, then we obtain the model that has been considered already in Chapter 4. The difference here is that in the RVM, this model uses the ARD prior (7.80) in which there is a separate precision hyperparameter associated with each weight parameter. 

In contrast to the regression model, we can no longer integrate analytically over the parameter vector w. Here we follow Tipping (2001) and use the Laplace approximation, which was applied to the closely related problem of Bayesian logistic regression in Section 4.5.1. 

We begin by initializing the hyperparameter vector α. For this given value of α, we then build a Gaussian approximation to the posterior distribution and thereby obtain an approximation to the marginal likelihood. Maximization of this approximate marginal likelihood then leads to a re-estimated value for $_ { \alpha , \beta }$ and the process is repeated until convergence. 

Let us consider the Laplace approximation for this model in more detail. For a fixed value of α, the mode of the posterior distribution over w is obtained by maximizing 

$$
\begin{array}{l} \ln p (\mathbf {w} | \mathbf {t}, \boldsymbol {\alpha}) = \ln \left\{p (\mathbf {t} | \mathbf {w}) p (\mathbf {w} | \boldsymbol {\alpha}) \right\} - \ln p (\mathbf {t} | \boldsymbol {\alpha}) \\ = \sum_ {n = 1} ^ {N} \left\{t _ {n} \ln y _ {n} + (1 - t _ {n}) \ln (1 - y _ {n}) \right\} - \frac {1}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {A} \mathbf {w} + \text { const } \end{array}\tag{7.109}
$$

where $\mathbf { A } = \mathrm { d i a g } ( \alpha _ { i } )$ . This can be done using iterative reweighted least squares (IRLS) as discussed in Section 4.3.3. For this, we need the gradient vector and Hessian matrix of the log posterior distribution, which from (7.109) are given by 

$$
\nabla \ln p (\mathbf {w} | \mathbf {t}, \boldsymbol {\alpha}) = \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {t} - \mathbf {y}) - \mathbf {A w}\tag{7.110}
$$

$$
\nabla \nabla \ln p (\mathbf {w} | \mathbf {t}, \boldsymbol {\alpha}) = - \left(\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {B} \boldsymbol {\Phi} + \mathbf {A}\right)\tag{7.111}
$$

where B is an $N \times N$ diagonal matrix with elements $b _ { n } = y _ { n } ( 1 - y _ { n } )$ , the vector $\pmb { \ y } = ( y _ { 1 } , \dots , y _ { N } ) ^ { \mathrm { T } }$ , and $\Phi$ is the design matrix with elements $\Phi _ { n i } = \phi _ { i } ( \mathbf { x } _ { n } )$ . Here we have used the property (4.88) for the derivative of the logistic sigmoid function. At convergence of the IRLS algorithm, the negative Hessian represents the inverse covariance matrix for the Gaussian approximation to the posterior distribution. 

The mode of the resulting approximation to the posterior distribution, corresponding to the mean of the Gaussian approximation, is obtained setting (7.110) to zero, giving the mean and covariance of the Laplace approximation in the form 

$$
\mathbf {w} ^ {\star} = \mathbf {A} ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {t} - \mathbf {y})\tag{7.112}
$$

$$
\boldsymbol {\Sigma} = \left(\boldsymbol {\Phi} ^ {T} \mathbf {B} \boldsymbol {\Phi} + \mathbf {A}\right) ^ {- 1}.\tag{7.113}
$$

We can now use this Laplace approximation to evaluate the marginal likelihood. Using the general result (4.135) for an integral evaluated using the Laplace approxi-

mation, we have 

$$
\begin{array}{r c l} p (\mathbf {t} | \boldsymbol {\alpha}) & = & \int p (\mathbf {t} | \mathbf {w}) p (\mathbf {w} | \boldsymbol {\alpha})   \mathrm{d} \mathbf {w} \\ & \simeq & p (\mathbf {t} | \mathbf {w} ^ {\star}) p (\mathbf {w} ^ {\star} | \boldsymbol {\alpha}) (2 \pi) ^ {M / 2} | \boldsymbol {\Sigma} | ^ {1 / 2}. \end{array}\tag{7.114}
$$

If we substitute for $p ( \mathbf { t } | \mathbf { w } ^ { \star } )$ and $p ( \mathbf { w } ^ { \star } | \alpha )$ and then set the derivative of the marginal likelihood with respect to $\alpha _ { i }$ equal to zero, we obtain 

$$
- \frac {1}{2} (w _ {i} ^ {\star}) ^ {2} + \frac {1}{2 \alpha_ {i}} - \frac {1}{2} \Sigma_ {i i} = 0.\tag{7.115}
$$

Defining $\gamma _ { i } = 1 - \alpha _ { i } \Sigma _ { i i }$ and rearranging then gives 

$$
\alpha_ {i} ^ {\mathrm{new}} = \frac {\gamma_ {i}}{(w _ {i} ^ {\star}) ^ {2}}\tag{7.116}
$$

which is identical to the re-estimation formula (7.87) obtained for the regression RVM. 

If we define 

$$
\widehat {\mathbf {t}} = \boldsymbol {\Phi} \mathbf {w} ^ {\star} + \mathbf {B} ^ {- 1} (\mathbf {t} - \mathbf {y})\tag{7.117}
$$

we can write the approximate log marginal likelihood in the form 

$$
\ln p (\mathbf {t} | \boldsymbol {\alpha}, \beta) = - \frac {1}{2} \left\{N \ln (2 \pi) + \ln | \mathbf {C} | + (\widehat {\mathbf {t}}) ^ {\mathrm{T}} \mathbf {C} ^ {- 1} \widehat {\mathbf {t}} \right\}\tag{7.118}
$$

where 

$$
\mathbf {C} = \mathbf {B} + \boldsymbol {\Phi} \mathbf {A} \boldsymbol {\Phi} ^ {\mathrm{T}}.\tag{7.119}
$$

This takes the same form as (7.85) in the regression case, and so we can apply the same analysis of sparsity and obtain the same fast learning algorithm in which we fully optimize a single hyperparameter $\alpha _ { i }$ at each step. 

Figure 7.12 shows the relevance vector machine applied to a synthetic classification data set. We see that the relevance vectors tend not to lie in the region of the decision boundary, in contrast to the support vector machine. This is consistent with our earlier discussion of sparsity in the RVM, because a basis function $\phi _ { i } ( \mathbf { x } )$ centred on a data point near the boundary will have a vector $\varphi _ { i }$ that is poorly aligned with the training data vector t. 

One of the potential advantages of the relevance vector machine compared with the SVM is that it makes probabilistic predictions. For example, this allows the RVM to be used to help construct an emission density in a nonlinear extension of the linear dynamical system for tracking faces in video sequences (Williams et al., 2005). 

So far, we have considered the RVM for binary classification problems. For $K > 2$ classes, we again make use of the probabilistic approach in Section 4.3.4 in which there are K linear models of the form 

$$
a _ {k} = \mathbf {w} _ {k} ^ {\mathrm{T}} \mathbf {x}\tag{7.120}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/99e4b84d1d51700445d38f1f24631433b4370c150602dc03003c896bc7b47742.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/4bce11f10dead0fe87ac6224e8eec06b0f2f5b4ed11088f4ec1ce7805eecb5b4.jpg)



Figure 7.12 Example of the relevance vector machine applied to a synthetic data set, in which the left-hand plot shows the decision boundary and the data points, with the relevance vectors indicated by circles. Comparison with the results shown in Figure 7.4 for the corresponding support vector machine shows that the RVM gives a much sparser model. The right-hand plot shows the posterior probability given by the RVM output in which the proportion of red (blue) ink indicates the probability of that point belonging to the red (blue) class.


which are combined using a softmax function to give outputs 

$$
y _ {k} (\mathbf {x}) = \frac {\exp (a _ {k})}{\sum_ {j} \exp (a _ {j})}.\tag{7.121}
$$

The log likelihood function is then given by 

$$
\ln p (\mathbf {T} | \mathbf {w} _ {1}, \dots , \mathbf {w} _ {K}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} y _ {n k} ^ {t _ {n k}}\tag{7.122}
$$

where the target values $t _ { n k }$ have a 1-of-K coding for each data point n, and T is a matrix with elements $t _ { n k }$ . Again, the Laplace approximation can be used to optimize the hyperparameters (Tipping, 2001), in which the model and its Hessian are found using IRLS. This gives a more principled approach to multiclass classification than the pairwise method used in the support vector machine and also provides probabilistic predictions for new data points. The principal disadvantage is that the Hessian matrix has size $M K \times M K$ , where M is the number of active basis functions, which gives an additional factor of $K ^ { 3 }$ in the computational cost of training compared with the two-class RVM. 

The principal disadvantage of the relevance vector machine is the relatively long training times compared with the SVM. This is offset, however, by the avoidance of cross-validation runs to set the model complexity parameters. Furthermore, because it yields sparser models, the computation time on test points, which is usually the more important consideration in practice, is typically much less. 

## Exercises

7.1 ( ) www Suppose we have a data set of input vectors $\left\{ { \bf x } _ { n } \right\}$ with corresponding target values $t _ { n } ~ \in ~ \{ - 1 , 1 \}$ , and suppose that we model the density of input vectors within each class separately using a Parzen kernel density estimator (see Section 2.5.1) with a kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ . Write down the minimum misclassification-rate decision rule assuming the two classes have equal prior probability. Show also that, if the kernel is chosen to be $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ , then the classification rule reduces to simply assigning a new input vector to the class having the closest mean. Finally, show that, if the kernel takes the form $k ( { \bf x } , { \bf x } ^ { \prime } ) = \phi ( { \bf x } ) ^ { \top } \phi ( { \bf x } ^ { \prime } )$ , that the classification is based on the closest mean in the feature space $\phi ( \mathbf { x } )$ 

7.2 () Show that, if the 1 on the right-hand side of the constraint (7.5) is replaced by some arbitrary constant $\gamma > 0$ , the solution for the maximum margin hyperplane is unchanged. 

7.3 ( ) Show that, irrespective of the dimensionality of the data space, a data set consisting of just two data points, one from each class, is sufficient to determine the location of the maximum-margin hyperplane. 

7.4 ( ) www Show that the value $\rho$ of the margin for the maximum-margin hyperplane is given by 

$$
{\frac {1}{\rho^ {2}}} = \sum_ {n = 1} ^ {N} a _ {n}\tag{7.123}
$$

where $\left\{ a _ { n } \right\}$ are given by maximizing (7.10) subject to the constraints (7.11) and (7.12). 

7.5 ( ) Show that the values of $\rho$ and $\{ a _ { n } \}$ in the previous exercise also satisfy 

$$
\frac {1}{\rho^ {2}} = 2 \widetilde {L} (\mathbf {a})\tag{7.124}
$$

where $\widetilde L ( \mathbf { a } )$ is defined by (7.10). Similarly, show that 

$$
\frac {1}{\rho^ {2}} = \left\| \mathbf {w} \right\| ^ {2}.\tag{7.125}
$$

7.6 () Consider the logistic regression model with a target variable $t \in \{ - 1 , 1 \}$ . If we define $p ( t = 1 | y ) = \sigma ( y )$ where $y ( \mathbf x )$ is given by (7.1), show that the negative log likelihood, with the addition of a quadratic regularization term, takes the form (7.47). 

7.7 () Consider the Lagrangian (7.56) for the regression support vector machine. By setting the derivatives of the Lagrangian with respect to w, b, $\xi _ { n }$ , and $\widehat { \xi } _ { n }$ to zero and then back substituting to eliminate the corresponding variables, show that the dual Lagrangian is given by (7.61). 

7.8 () www For the regression support vector machine considered in Section 7.1.4, show that all training data points for which $\xi _ { n } > 0$ will have $a _ { n } = C$ , and similarly all points for which $\widehat { \xi } _ { n } > 0$ will have $\widehat { a } _ { n } = C$ 

7.9 () Verify the results (7.82) and (7.83) for the mean and covariance of the posterior distribution over weights in the regression RVM. 

7.10 ( ) www Derive the result (7.85) for the marginal likelihood function in the regression RVM, by performing the Gaussian integral over w in (7.84) using the technique of completing the square in the exponential. 

7.11 ( ) Repeat the above exercise, but this time make use of the general result (2.115). 

7.12 ( ) www Show that direct maximization of the log marginal likelihood (7.85) for the regression relevance vector machine leads to the re-estimation equations (7.87) and (7.88) where $\gamma _ { i }$ is defined by (7.89). 

7.13 ( ) In the evidence framework for RVM regression, we obtained the re-estimation formulae (7.87) and (7.88) by maximizing the marginal likelihood given by (7.85). Extend this approach by inclusion of hyperpriors given by gamma distributions of the form (B.26) and obtain the corresponding re-estimation formulae for α and $\beta$ by maximizing the corresponding posterior probability $p ( \mathbf { t } , \alpha , \beta | \mathbf { X } )$ with respect to α and $\beta .$ . 

7.14 ( ) Derive the result (7.90) for the predictive distribution in the relevance vector machine for regression. Show that the predictive variance is given by (7.91). 

7.15 ( ) www Using the results (7.94) and (7.95), show that the marginal likelihood (7.85) can be written in the form (7.96), where $\lambda ( \alpha _ { n } )$ is defined by (7.97) and the sparsity and quality factors are defined by (7.98) and (7.99), respectively. 

7.16 () By taking the second derivative of the log marginal likelihood (7.97) for the regression RVM with respect to the hyperparameter $\alpha _ { i } ,$ show that the stationary point given by (7.101) is a maximum of the marginal likelihood. 

7.17 ( ) Using (7.83) and (7.86), together with the matrix identity (C.7), show that the quantities $S _ { n }$ and $Q _ { n }$ defined by (7.102) and (7.103) can be written in the form (7.106) and (7.107). 

7.18 () www Show that the gradient vector and Hessian matrix of the log posterior distribution (7.109) for the classification relevance vector machine are given by (7.110) and (7.111). 

7.19 ( ) Verify that maximization of the approximate log marginal likelihood function (7.114) for the classification relevance vector machine leads to the result (7.116) for re-estimation of the hyperparameters. 

## 8

# Graphical Models

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/866655b0c739f95d7f50a80a14a69c652bd45048b49dfb8ea4d6a5bf627aedae.jpg)


Probabilities play a central role in modern pattern recognition. We have seen in Chapter 1 that probability theory can be expressed in terms of two simple equations corresponding to the sum rule and the product rule. All of the probabilistic inference and learning manipulations discussed in this book, no matter how complex, amount to repeated application of these two equations. We could therefore proceed to formulate and solve complicated probabilistic models purely by algebraic manipulation. However, we shall find it highly advantageous to augment the analysis using diagrammatic representations of probability distributions, called probabilistic graphical models. These offer several useful properties: 

1. They provide a simple way to visualize the structure of a probabilistic model and can be used to design and motivate new models. 

2. Insights into the properties of the model, including conditional independence properties, can be obtained by inspection of the graph. 

3. Complex computations, required to perform inference and learning in sophisticated models, can be expressed in terms of graphical manipulations, in which underlying mathematical expressions are carried along implicitly. 

A graph comprises nodes (also called vertices) connected by links (also known as edges or arcs). In a probabilistic graphical model, each node represents a random variable (or group of random variables), and the links express probabilistic relationships between these variables. The graph then captures the way in which the joint distribution over all of the random variables can be decomposed into a product of factors each depending only on a subset of the variables. We shall begin by discussing Bayesian networks, also known as directed graphical models, in which the links of the graphs have a particular directionality indicated by arrows. The other major class of graphical models are Markov randomfields, also known as undirected graphical models, in which the links do not carry arrows and have no directional significance. Directed graphs are useful for expressing causal relationships between random variables, whereas undirected graphs are better suited to expressing soft constraints between random variables. For the purposes of solving inference problems, it is often convenient to convert both directed and undirected graphs into a different representation called afactor graph. 

In this chapter, we shall focus on the key aspects of graphical models as needed for applications in pattern recognition and machine learning. More general treatments of graphical models can be found in the books by Whittaker (1990), Lauritzen (1996), Jensen (1996), Castillo et al. (1997), Jordan (1999), Cowell et al. (1999), and Jordan (2007). 

## 8.1. Bayesian Networks

In order to motivate the use of directed graphs to describe probability distributions, consider first an arbitrary joint distribution $\textstyle p ( a , b , c )$ over three variables a, b, and c. Note that at this stage, we do not need to specify anything further about these variables, such as whether they are discrete or continuous. Indeed, one of the powerful aspects of graphical models is that a specific graph can make probabilistic statements for a broad class of distributions. By application of the product rule of probability (1.11), we can write the joint distribution in the form 

$$
p (a, b, c) = p (c | a, b) p (a, b).\tag{8.1}
$$

A second application of the product rule, this time to the second term on the righthand side of (8.1), gives 

$$
p (a, b, c) = p (c | a, b) p (b | a) p (a).\tag{8.2}
$$

Note that this decomposition holds for any choice of the joint distribution. We now represent the right-hand side of (8.2) in terms of a simple graphical model as follows. First we introduce a node for each of the random variables a, b, and c and associate each node with the corresponding conditional distribution on the right-hand side of 

Figure 8.1 A directed graphical model representing the joint probability distribution over three variables $a , b ,$ and $^ { c , }$ corresponding to the decomposition on the right-hand side of (8.2). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/e486a13028be7fba5fb25648b36a81ce409aaa3770edd2b5d70fc3500fb9eec8.jpg)


(8.2). Then, for each conditional distribution we add directed links (arrows) to the graph from the nodes corresponding to the variables on which the distribution is conditioned. Thus for the factor $p ( c | a , b )$ , there will be links from nodes $a$ and $b$ to node $c ,$ whereas for the factor $p ( a )$ there will be no incoming links. The result is the graph shown in Figure 8.1. If there is a link going from a node $a$ to a node $b ,$ , then we say that node a is the parent of node $b ,$ and we say that node $b$ is the child of node $a .$ Note that we shall not make any formal distinction between a node and the variable to which it corresponds but will simply use the same symbol to refer to both. 

An interesting point to note about (8.2) is that the left-hand side is symmetrical with respect to the three variables $a , b ,$ and $c ,$ whereas the right-hand side is not. Indeed, in making the decomposition in (8.2), we have implicitly chosen a particular ordering, namely $a , b , c ,$ , and had we chosen a different ordering we would have obtained a different decomposition and hence a different graphical representation. We shall return to this point later. 

For the moment let us extend the example of Figure 8.1 by considering the joint distribution over $K$ variables given by $p ( x _ { 1 } , \ldots , x _ { K } )$ . By repeated application of the product rule of probability, this joint distribution can be written as a product of conditional distributions, one for each of the variables 

$$
p (x _ {1}, \dots , x _ {K}) = p (x _ {K} | x _ {1}, \dots , x _ {K - 1}) \dots p (x _ {2} | x _ {1}) p (x _ {1}).\tag{8.3}
$$

For a given choice of $K$ , we can again represent this as a directed graph having K nodes, one for each conditional distribution on the right-hand side of (8.3), with each node having incoming links from all lower numbered nodes. We say that this graph isfully connected because there is a link between every pair of nodes. 

So far, we have worked with completely general joint distributions, so that the decompositions, and their representations as fully connected graphs, will be applicable to any choice of distribution. As we shall see shortly, it is the absence of links in the graph that conveys interesting information about the properties of the class of distributions that the graph represents. Consider the graph shown in Figure 8.2. This is not a fully connected graph because, for instance, there is no link from $x _ { 1 }$ to $x _ { 2 }$ or from $x _ { 3 }$ to $x _ { 7 }$ 

We shall now go from this graph to the corresponding representation of the joint probability distribution written in terms of the product of a set of conditional distributions, one for each node in the graph. Each such conditional distribution will be conditioned only on the parents of the corresponding node in the graph. For instance, $x _ { 5 }$ will be conditioned on $x _ { 1 }$ and $x _ { 3 }$ . The joint distribution of all $7$ variables 

Figure 8.2 Example of a directed acyclic graph describing the joint distribution over variables $x _ { 1 } , \ldots , x _ { 7 }$ . The corresponding decomposition of the joint distribution is given by (8.4). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/7402050c85d83049446d78dc34d14cc8848732fde3ea4412ef6762b578393728.jpg)


is therefore given by 

$$
p (x _ {1}) p (x _ {2}) p (x _ {3}) p (x _ {4} | x _ {1}, x _ {2}, x _ {3}) p (x _ {5} | x _ {1}, x _ {3}) p (x _ {6} | x _ {4}) p (x _ {7} | x _ {4}, x _ {5}).\tag{8.4}
$$

The reader should take a moment to study carefully the correspondence between (8.4) and Figure 8.2. 

We can now state in general terms the relationship between a given directed graph and the corresponding distribution over the variables. The joint distribution defined by a graph is given by the product, over all of the nodes of the graph, of a conditional distribution for each node conditioned on the variables corresponding to the parents of that node in the graph. Thus, for a graph with K nodes, the joint distribution is given by 

$$
p (\mathbf {x}) = \prod_ {k = 1} ^ {K} p (x _ {k} | \mathrm{pa} _ {k})\tag{8.5}
$$

where $\mathrm { p a } _ { k }$ denotes the set of parents of $x _ { k }$ , and $\textbf { x } = ~ \{ x _ { 1 } , . . . , x _ { K } \}$ This key equation expresses thefactorization properties of the joint distribution for a directed graphical model. Although we have considered each node to correspond to a single variable, we can equally well associate sets of variables and vector-valued variables with the nodes of a graph. It is easy to show that the representation on the righthand side of (8.5) is always correctly normalized provided the individual conditional distributions are normalized. 

The directed graphs that we are considering are subject to an important restriction namely that there must be no directed cycles, in other words there are no closed paths within the graph such that we can move from node to node along links following the direction of the arrows and end up back at the starting node. Such graphs are also called directed acyclic graphs, or DAGs. This is equivalent to the statement that there exists an ordering of the nodes such that there are no links that go from any node to any lower numbered node. 

## 8.1.1 Example: Polynomial regression

As an illustration of the use of directed graphs to describe probability distributions, we consider the Bayesian polynomial regression model introduced in Sec-

Figure 8.3 Directed graphical model representing the joint distribution (8.6) corresponding to the Bayesian polynomial regression model introduced in Section 1.2.6. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/e87d8239209d8067c7fce2aa83bf981cc8c0cdc27bd594fd05d0b8be00ea6cc6.jpg)


tion 1.2.6. The random variables in this model are the vector of polynomial coefficients w and the observed data ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . In addition, this model contains the input data ${ \bf x } = ( x _ { 1 } , \ldots , x _ { N } ) ^ { \mathrm { T } }$ , the noise variance $\sigma ^ { 2 }$ , and the hyperparameter α representing the precision of the Gaussian prior over w, all of which are parameters of the model rather than random variables. Focussing just on the random variables for the moment, we see that the joint distribution is given by the product of the prior $p ( \mathbf { w } )$ and N conditional distributions $p ( t _ { n } | \mathbf { w } )$ for $n = 1 , \ldots , N$ so that 

$$
p (\mathbf {t}, \mathbf {w}) = p (\mathbf {w}) \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {w}).\tag{8.6}
$$

This joint distribution can be represented by a graphical model shown in Figure 8.3. 

When we start to deal with more complex models later in the book, we shall find it inconvenient to have to write out multiple nodes of the form $t _ { 1 } , \ldots , t _ { N }$ explicitly as in Figure 8.3. We therefore introduce a graphical notation that allows such multiple nodes to be expressed more compactly, in which we draw a single representative node $t _ { n }$ and then surround this with a box, called a plate, labelled with N indicating that there are N nodes of this kind. Re-writing the graph of Figure 8.3 in this way, we obtain the graph shown in Figure 8.4. 

We shall sometimes find it helpful to make the parameters of a model, as well as its stochastic variables, explicit. In this case, (8.6) becomes 

$$
p (\mathbf {t}, \mathbf {w} | \mathbf {x}, \alpha , \sigma^ {2}) = p (\mathbf {w} | \alpha) \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {w}, x _ {n}, \sigma^ {2}).
$$

Correspondingly, we can make x and α explicit in the graphical representation. To do this, we shall adopt the convention that random variables will be denoted by open circles, and deterministic parameters will be denoted by smaller solid circles. If we take the graph of Figure 8.4 and include the deterministic parameters, we obtain the graph shown in Figure 8.5. 

When we apply a graphical model to a problem in machine learning or pattern recognition, we will typically set some of the random variables to specific observed 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/e8f460716075b434be868f39fdc05886706ce9ebf0203c94a9f3e8778f068110.jpg)


Figure 8.5 This shows the same model as in Figure 8.4 but with the deterministic parameters shown explicitly by the smaller solid nodes. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/d1707e119346f218b8f27209d1ccad3d8038267e32990c9ee0a593ddc04dc410.jpg)


values, for example the variables $\{ t _ { n } \}$ from the training set in the case of polynomial curve fitting. In a graphical model, we will denote such observed variables by shading the corresponding nodes. Thus the graph corresponding to Figure 8.5 in which the variables $\left\{ { { t } _ { n } } \right\}$ are observed is shown in Figure 8.6. Note that the value of w is not observed, and so w is an example of a latent variable, also known as a hidden variable. Such variables play a crucial role in many probabilistic models and will form the focus of Chapters 9 and 12. 

Having observed the values $\{ t _ { n } \}$ we can, if desired, evaluate the posterior distribution of the polynomial coefficients w as discussed in Section 1.2.5. For the moment, we note that this involves a straightforward application of Bayes’ theorem 

$$
p (\mathbf {w} | \mathbf {T}) \propto p (\mathbf {w}) \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {w})\tag{8.7}
$$

where again we have omitted the deterministic parameters in order to keep the notation uncluttered. 

In general, model parameters such as w are of little direct interest in themselves, because our ultimate goal is to make predictions for new input values. Suppose we are given a new input value $\widehat { x }$ and we wish to find the corresponding probability distribution for $\widehat { t }$ conditioned on the observed data. The graphical model that describes this problem is shown in Figure 8.7, and the corresponding joint distribution of all of the random variables in this model, conditioned on the deterministic parameters, is then given by 

$$
p (\widehat {t}, \mathbf {t}, \mathbf {w} | \widehat {x}, \mathbf {x}, \alpha , \sigma^ {2}) = \left[ \prod_ {n = 1} ^ {N} p (t _ {n} | x _ {n}, \mathbf {w}, \sigma^ {2}) \right] p (\mathbf {w} | \alpha) p (\widehat {t} | \widehat {x}, \mathbf {w}, \sigma^ {2}).\tag{8.8}
$$

Figure 8.6 As in Figure 8.5 but with the nodes $\left\{ t _ { n } \right\}$ shaded to indicate that the corresponding random variables have been set to their observed (training set) values. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a488578cef6d1bdd56aa972edd90c1420ccffa892a3119ed2ad8aa5d4833ef03.jpg)


Figure 8.7 The polynomial regression model, corresponding to Figure 8.6, showing also a new input value $\breve { \widehat { x } }$ together with the corresponding model prediction ${ \widehat { t } } .$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/657dced2f6a9fbb08207550cd579d148f3087ce9277715e6d146c5f5bc30f2e2.jpg)


The required predictive distribution for $\widehat { t }$ is then obtained, from the sum rule of probability, by integrating out the model parameters w so that 

$$
p (\widehat {t} | \widehat {x}, \mathbf {x}, \mathbf {t}, \alpha , \sigma^ {2}) \propto \int p (\widehat {t}, \mathbf {t}, \mathbf {w} | \widehat {x}, \mathbf {x}, \alpha , \sigma^ {2}) \mathrm{d} \mathbf {w}
$$

where we are implicitly setting the random variables in t to the specific values observed in the data set. The details of this calculation were discussed in Chapter 3. 

## 8.1.2 Generative models

There are many situations in which we wish to draw samples from a given probability distribution. Although we shall devote the whole of Chapter 11 to a detailed discussion of sampling methods, it is instructive to outline here one technique, called ancestral sampling, which is particularly relevant to graphical models. Consider a joint distribution $p ( x _ { 1 } , \ldots , x _ { K } )$ over $K$ variables that factorizes according to (8.5) corresponding to a directed acyclic graph. We shall suppose that the variables have been ordered such that there are no links from any node to any lower numbered node, in other words each node has a higher number than any of its parents. Our goal is to draw a sample $\widehat { x } _ { 1 } , \ldots , \widehat { x } _ { K }$ from the joint distribution. 

To do this, we start with the lowest-numbered node and draw a sample from the distribution $p ( x _ { 1 } )$ , which we call $\widehat { x } _ { 1 }$ . We then work through each of the nodes in order, so that for node n we draw a sample from the conditional distribution $p ( x _ { n } | \mathrm { p a } _ { n } )$ in which the parent variables have been set to their sampled values. Note that at each stage, these parent values will always be available because they correspond to lowernumbered nodes that have already been sampled. Techniques for sampling from specific distributions will be discussed in detail in Chapter 11. Once we have sampled from the final variable $x _ { K }$ , we will have achieved our objective of obtaining a sample from the joint distribution. To obtain a sample from some marginal distribution corresponding to a subset of the variables, we simply take the sampled values for the required nodes and ignore the sampled values for the remaining nodes. For example, to draw a sample from the distribution $p ( x _ { 2 } , x _ { 4 } )$ , we simply sample from the full joint distribution and then retain the values $\widehat { x } _ { 2 } , \widehat { x } _ { 4 }$ and discard the remaining values $\{ \widehat { x } _ { j \neq 2 , 4 } \}$ 


Figure 8.8 A graphical model representing the process by which images of objects are created, in which the identity of an object (a discrete variable) and the position and orientation of that object (continuous variables) have independent prior probabilities. The image (a vector of pixel intensities) has a probability distribution that is dependent on the identity of the object as well as on its position and orientation.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/4a21deeeb0452abe075fbf6318aa66504575a620f2f4010ca6d5026a3b3418d4.jpg)


For practical applications of probabilistic models, it will typically be the highernumbered variables corresponding to terminal nodes of the graph that represent the observations, with lower-numbered nodes corresponding to latent variables. The primary role of the latent variables is to allow a complicated distribution over the observed variables to be represented in terms of a model constructed from simpler (typically exponential family) conditional distributions. 

We can interpret such models as expressing the processes by which the observed data arose. For instance, consider an object recognition task in which each observed data point corresponds to an image (comprising a vector of pixel intensities) of one of the objects. In this case, the latent variables might have an interpretation as the position and orientation of the object. Given a particular observed image, our goal is to find the posterior distribution over objects, in which we integrate over all possible positions and orientations. We can represent this problem using a graphical model of the form show in Figure 8.8. 

The graphical model captures the causal process (Pearl, 1988) by which the observed data was generated. For this reason, such models are often called generative models. By contrast, the polynomial regression model described by Figure 8.5 is not generative because there is no probability distribution associated with the input variable x, and so it is not possible to generate synthetic data points from this model. We could make it generative by introducing a suitable prior distribution p(x), at the expense of a more complex model. 

The hidden variables in a probabilistic model need not, however, have any explicit physical interpretation but may be introduced simply to allow a more complex joint distribution to be constructed from simpler components. In either case, the technique of ancestral sampling applied to a generative model mimics the creation of the observed data and would therefore give rise to ‘fantasy’ data whose probability distribution (if the model were a perfect representation of reality) would be the same as that of the observed data. In practice, producing synthetic observations from a generative model can prove informative in understanding the form of the probability distribution represented by that model. 

## 8.1.3 Discrete variables

We have discussed the importance of probability distributions that are members of the exponential family, and we have seen that this family includes many wellknown distributions as particular cases. Although such distributions are relatively simple, they form useful building blocks for constructing more complex probability 

Figure 8.9 (a) This fully-connected graph describes a general distribution over two K-state discrete variables having a total of $K ^ { 2 } - 1$ parameters. (b) By dropping the link between the nodes, the number of parameters is reduced to $2 ( K - 1 )$ 


(a)



(b)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/abfadde287d39240479eaa47de86e0ea595363401bbb0777f0a33288ed0f04d0.jpg)


distributions, and the framework of graphical models is very useful in expressing the way in which these building blocks are linked together. 

Such models have particularly nice properties if we choose the relationship between each parent-child pair in a directed graph to be conjugate, and we shall explore several examples of this shortly. Two cases are particularly worthy of note, namely when the parent and child node each correspond to discrete variables and when they each correspond to Gaussian variables, because in these two cases the relationship can be extended hierarchically to construct arbitrarily complex directed acyclic graphs. We begin by examining the discrete case. 

The probability distribution $p ( \mathbf { x } | \boldsymbol { \mu } )$ for a single discrete variable x having K possible states (using the 1-of-K representation) is given by 

$$
p (\mathbf {x} | \boldsymbol {\mu}) = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {x _ {k}}\tag{8.9}
$$

and is governed by the parameters $\pmb { \mu } ~ = ~ ( \mu _ { 1 } , \ldots , \mu _ { K } ) ^ { \mathrm { T } }$ . Due to the constraint $\textstyle \sum _ { k } \mu _ { k } = 1$ , only $K - 1$ values for $\mu _ { k }$ need to be specified in order to define the distribution. 

Now suppose that we have two discrete variables, $\mathbf { x } _ { 1 }$ and $\mathbf { x } _ { 2 } ,$ , each of which has K states, and we wish to model their joint distribution. We denote the probability of observing both $x _ { 1 k } = 1$ and $x _ { 2 l } = 1$ by the parameter $\mu _ { k l }$ , where $x _ { 1 k }$ denotes the $k ^ { \mathrm { t h } }$ component of $\mathbf { x } _ { 1 }$ , and similarly for $x _ { 2 l }$ . The joint distribution can be written 

$$
p (\mathbf {x} _ {1}, \mathbf {x} _ {2} | \boldsymbol {\mu}) = \prod_ {k = 1} ^ {K} \prod_ {l = 1} ^ {K} \mu_ {k l} ^ {x _ {1 k} x _ {2 l}}.
$$

Because the parameters $\mu _ { k l }$ are subject to the constraint $\begin{array} { r } { \sum _ { k } \sum _ { l } \mu _ { k l } = 1 } \end{array}$ , this distribution is governed by $K ^ { 2 } - 1$ parameters. It is easily seen that the total number of parameters that must be specified for an arbitrary joint distribution over M variables is $K ^ { M } - 1$ and therefore grows exponentially with the number M of variables. 

Using the product rule, we can factor the joint distribution $p ( \mathbf { x } _ { 1 } , \mathbf { x } _ { 2 } )$ in the form $p ( \mathbf { x } _ { 2 } | \mathbf { x } _ { 1 } ) p ( \mathbf { x } _ { 1 } )$ , which corresponds to a two-node graph with a link going from the $\mathbf { x } _ { 1 }$ node to the $\mathbf { x } _ { 2 }$ node as shown in Figure 8.9(a). The marginal distribution $p ( \mathbf { x } _ { 1 } )$ is governed by $K - 1$ parameters, as before, Similarly, the conditional distribution $p ( \mathbf { x } _ { 2 } | \mathbf { x } _ { 1 } )$ requires the specification of $K - 1$ parameters for each of the K possible values of $\mathbf { x } _ { 1 }$ . The total number of parameters that must be specified in the joint distribution is therefore $( K - 1 ) + \bar { K } ( K - 1 ) = K ^ { 2 } - 1$ as before. 

Now suppose that the variables $\mathbf { x } _ { 1 }$ and $\mathbf { x } _ { 2 }$ were independent, corresponding to the graphical model shown in Figure 8.9(b). Each variable is then described by a separate multinomial distribution, and the total number of parameters would be $2 ( K - 1 )$ . For a distribution over M independent discrete variables, each having K states, the total number of parameters would be $M ( K - 1 )$ , which therefore grows linearly with the number of variables. From a graphical perspective, we have reduced the number of parameters by dropping links in the graph, at the expense of having a restricted class of distributions. 


Figure 8.10 This chain of M discrete nodes, each having K states, requires the specification of $K - 1 +$ $( M - 1 ) K ( K - 1 )$ parameters, which grows linearly with the length M of the chain. In contrast, a fully connected graph of M nodes would have $K ^ { M } - 1$ parameters, which grows exponentially with M.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/6a7f32f1ab893f189e26b61ca2dd6148c18b0cb17c5bf11cb5dd1074d638715a.jpg)


More generally, if we have M discrete variables $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { M }$ , we can model the joint distribution using a directed graph with one variable corresponding to each node. The conditional distribution at each node is given by a set of nonnegative parameters subject to the usual normalization constraint. If the graph is fully connected then we have a completely general distribution having $K ^ { M } - 1$ parameters, whereas if there are no links in the graph the joint distribution factorizes into the product of the marginals, and the total number of parameters is $M ( K - 1 )$ . Graphs having intermediate levels of connectivity allow for more general distributions than the fully factorized one while requiring fewer parameters than the general joint distribution. As an illustration, consider the chain of nodes shown in Figure 8.10. The marginal distribution $p ( \mathbf { x } _ { 1 } )$ requires $K - 1$ parameters, whereas each of the $M - 1$ conditional distributions $p ( \mathbf { x } _ { i } | \mathbf { x } _ { i - 1 } )$ , for $i = 2 , \dots , M$ , requires $K ( K - 1 )$ ) parameters. This gives a total parameter count of $K - 1 + ( M - 1 ) K ( K - 1 )$ , which is quadratic in K and which grows linearly (rather than exponentially) with the length M of the chain. 

An alternative way to reduce the number of independent parameters in a model is by sharing parameters (also known as tying of parameters). For instance, in the chain example of Figure 8.10, we can arrange that all of the conditional distributions $p ( \mathbf { x } _ { i } | \mathbf { x } _ { i - 1 } )$ , for $i = 2 , \ldots , M$ , are governed by the same set of $K ( K { - } 1 )$ parameters. Together with the $K - 1$ parameters governing the distribution of $\mathbf { x } _ { 1 }$ , this gives a total of $K ^ { 2 } - 1$ parameters that must be specified in order to define the joint distribution. 

We can turn a graph over discrete variables into a Bayesian model by introducing Dirichlet priors for the parameters. From a graphical point of view, each node then acquires an additional parent representing the Dirichlet distribution over the parameters associated with the corresponding discrete node. This is illustrated for the chain model in Figure 8.11. The corresponding model in which we tie the parameters governing the conditional distributions $p ( \mathbf { x } _ { i } | \mathbf { x } _ { i - 1 } )$ , for $i = 2 , \dots , M$ , is shown in Figure 8.12. 

Another way of controlling the exponential growth in the number of parameters in models of discrete variables is to use parameterized models for the conditional distributions instead of complete tables of conditional probability values. To illustrate this idea, consider the graph in Figure 8.13 in which all of the nodes represent binary variables. Each of the parent variables $x _ { i }$ is governed by a single parame-

An extension of the model of Figure 8.10 to include Dirichlet priors over the parameters governing the discrete distributions. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/cd7182149015a7693259d3bf3fbf418588153a224efc38e7af45fd2810b99b70.jpg)


As in Figure 8.11 but with a sin gle set of parameters $\pmb { \mu }$ shared amongst all of the conditional distributions $p ( \mathbf { x } _ { i } | \mathbf { x } _ { i - 1 } )$ . 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/8f5b99c7b20f1d66d361b008fc5b5d347bcb97629d758b73c04a6e1494a5bcaf.jpg)


ter $\mu _ { i }$ representing the probability $p ( x _ { i } = 1 )$ ), giving M parameters in total for the parent nodes. The conditional distribution $p ( y | x _ { 1 } , \dots , x _ { M } )$ , however, would require $\dot { 2 } ^ { M }$ parameters representing the probability $p ( y = 1 )$ for each of the $2 ^ { M }$ possible settings of the parent variables. Thus in general the number of parameters required to specify this conditional distribution will grow exponentially with $M$ . We can obtain a more parsimonious form for the conditional distribution by using a logistic sigmoid function acting on a linear combination of the parent variables, giving 

$$
p (y = 1 | x _ {1}, \dots , x _ {M}) = \sigma \left(w _ {0} + \sum_ {i = 1} ^ {M} w _ {i} x _ {i}\right) = \sigma (\mathbf {w} ^ {\mathrm{T}} \mathbf {x})\tag{8.10}
$$

where $\sigma ( a ) = ( 1 + \exp ( - a ) ) ^ { - 1 }$ is the logistic sigmoid, $\mathbf { x } = ( x _ { 0 } , x _ { 1 } , \hdots , x _ { M } ) ^ { \mathrm { T } }$ is an $( M + 1 )$ -dimensional vector of parent states augmented with an additional variable $x _ { 0 }$ whose value is clamped to 1, and $\mathbf { w } = ( w _ { 0 } , w _ { 1 } , \hdots , w _ { M } ) ^ { \mathrm { T } }$ is a vector of $M + 1$ parameters. This is a more restricted form of conditional distribution than the general case but is now governed by a number of parameters that grows linearly with M. In this sense, it is analogous to the choice of a restrictive form of covariance matrix (for example, a diagonal matrix) in a multivariate Gaussian distribution. The motivation for the logistic sigmoid representation was discussed in Section 4.2. 

Figure 8.13 A graph comprising M parents $x _ { 1 } , \ldots , x _ { M }$ and a single child $^ { y , }$ used to illustrate the idea of parameterized conditional distributions for discrete variables. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/85a04ae31ec3493ca077ad8682895a41ae34d50662bd81ced9753e524236e1b3.jpg)


## 8.1.4 Linear-Gaussian models

In the previous section, we saw how to construct joint probability distributions over a set of discrete variables by expressing the variables as nodes in a directed acyclic graph. Here we show how a multivariate Gaussian can be expressed as a directed graph corresponding to a linear-Gaussian model over the component variables. This allows us to impose interesting structure on the distribution, with the general Gaussian and the diagonal covariance Gaussian representing opposite extremes. Several widely used techniques are examples of linear-Gaussian models, such as probabilistic principal component analysis, factor analysis, and linear dynamical systems (Roweis and Ghahramani, 1999). We shall make extensive use of the results of this section in later chapters when we consider some of these techniques in detail. 

Consider an arbitrary directed acyclic graph over D variables in which node i represents a single continuous random variable $x _ { i }$ having a Gaussian distribution. The mean of this distribution is taken to be a linear combination of the states of its parent nodes $\mathrm { p a } _ { i }$ of node i 

$$
p \left(x _ {i} \mid \mathrm{pa} _ {i}\right) = \mathcal {N} \left(x _ {i} \left| \sum_ {j \in \mathrm{pa} _ {i}} w _ {i j} x _ {j} + b _ {i}, v _ {i} \right.\right)\tag{8.11}
$$

where $w _ { i j }$ and $b _ { i }$ are parameters governing the mean, and $v _ { i }$ is the variance of the conditional distribution for $x _ { i }$ . The log of the joint distribution is then the log of the product of these conditionals over all nodes in the graph and hence takes the form 

$$
\begin{array}{r c l} \ln p (\mathbf {x}) & = & \sum_ {i = 1} ^ {D} \ln p (x _ {i} | \mathrm{pa} _ {i}) \\ & = & - \sum_ {i = 1} ^ {D} \frac {1}{2 v _ {i}} \left(x _ {i} - \sum_ {j \in \mathrm{pa} _ {i}} w _ {i j} x _ {j} - b _ {i}\right) ^ {2} + \text { const } \end{array}\tag{8.12}
$$

(8.13) 

where ${ \bf x } = ( x _ { 1 } , \dots , x _ { D } ) ^ { \mathrm { T } }$ and ‘const’ denotes terms independent of x. We see that this is a quadratic function of the components of x, and hence the joint distribution $p ( \mathbf { x } )$ is a multivariate Gaussian. 

We can determine the mean and covariance of the joint distribution recursively as follows. Each variable $x _ { i }$ has (conditional on the states of its parents) a Gaussian distribution of the form (8.11) and so 

$$
x _ {i} = \sum_ {j \in \mathrm{pa} _ {i}} w _ {i j} x _ {j} + b _ {i} + \sqrt {v _ {i}} \epsilon_ {i}\tag{8.14}
$$

where $\epsilon _ { i }$ is a zero mean, unit variance Gaussian random variable satisfying $\mathbb { E } [ \epsilon _ { i } ] = 0$ and $\mathbb { E } [ \epsilon _ { i } \epsilon _ { j } ] = I _ { i j }$ , where $I _ { i j }$ is the $i , j$ element of the identity matrix. Taking the expectation of (8.14), we have 

$$
\mathbb {E} [ x _ {i} ] = \sum_ {j \in \mathrm{pa} _ {i}} w _ {i j} \mathbb {E} [ x _ {j} ] + b _ {i}.\tag{8.15}
$$

Figure 8.14 A directed graph over three Gaussian variables, with one missing link. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/d2f5714d622cda7cca2206ad43d52d6d1c4882aa7a7da0f6a73ce9814542e16b.jpg)


Thus we can find the components of $\mathbb { E } [ \mathbf { x } ] = ( \mathbb { E } [ x _ { 1 } ] , \dots , \mathbb { E } [ x _ { D } ] ) ^ { \mathrm { T } }$ by starting at the lowest numbered node and working recursively through the graph (here we again assume that the nodes are numbered such that each node has a higher number than its parents). Similarly, we can use (8.14) and (8.15) to obtain the $i , j$ element of the covariance matrix for $p ( \mathbf { x } )$ in the form of a recursion relation 

$$
\begin{array}{r c l} \operatorname{cov} [ x _ {i}, x _ {j} ] & = & \mathbb {E} \left[ (x _ {i} - \mathbb {E} [ x _ {i} ]) (x _ {j} - \mathbb {E} [ x _ {j} ]) \right] \\ & = & \mathbb {E} \left[ (x _ {i} - \mathbb {E} [ x _ {i} ]) \left\{\sum_ {k \in \mathrm{pa} _ {j}} w _ {j k} (x _ {k} - \mathbb {E} [ x _ {k} ]) + \sqrt {v _ {j}} \epsilon_ {j} \right\} \right] \\ & = & \sum_ {k \in \mathrm{pa} _ {j}} w _ {j k} \operatorname{cov} [ x _ {i}, x _ {k} ] + I _ {i j} v _ {j} \end{array}\tag{8.16}
$$

and so the covariance can similarly be evaluated recursively starting from the lowest numbered node. 

Let us consider two extreme cases. First of all, suppose that there are no links in the graph, which therefore comprises D isolated nodes. In this case, there are no parameters $w _ { i j }$ and so there are just D parameters $b _ { i }$ and D parameters $v _ { i }$ . From the recursion relations (8.15) and (8.16), we see that the mean of $p ( \mathbf { x } )$ is given by $( b _ { 1 } , \ldots , b _ { D } ) ^ { \mathrm { T } }$ and the covariance matrix is diagonal of the form diag $\mathbf { \sigma } ( v _ { 1 } , \dots , v _ { D } )$ The joint distribution has a total of 2D parameters and represents a set of D independent univariate Gaussian distributions. 

Now consider a fully connected graph in which each node has all lower numbered nodes as parents. The matrix $w _ { i j }$ then has $i - 1$ entries on the $i ^ { \mathrm { t h } }$ row and hence is a lower triangular matrix (with no entries on the leading diagonal). Then the total number of parameters $w _ { i j }$ is obtained by taking the number $D ^ { \overline { { 2 } } }$ of elements in a $D \times D$ matrix, subtracting $D$ to account for the absence of elements on the leading diagonal, and then dividing by 2 because the matrix has elements only below the diagonal, giving a total of $D ( \bar { D } - 1 ) / 2$ . The total number of independent parameters $\{ w _ { i j } \}$ and $\{ v _ { i } \}$ in the covariance matrix is therefore $D ( D + 1 ) \bar { / } 2$ corresponding to a general symmetric covariance matrix. 

Graphs having some intermediate level of complexity correspond to joint Gaussian distributions with partially constrained covariance matrices. Consider for example the graph shown in Figure 8.14, which has a link missing between variables $x _ { 1 }$ and $x _ { 3 }$ . Using the recursion relations (8.15) and (8.16), we see that the mean and covariance of the joint distribution are given by 

$$
{\pmb {\mu}} {=} {(b _ {1}, b _ {2} + w _ {2 1} b _ {1}, b _ {3} + w _ {3 2} b _ {2} + w _ {3 2} w _ {2 1} b _ {1}) ^ {\mathrm{T}}}\tag{8.17}
$$

$$
\begin{array}{r l r} {\pmb {\Sigma}} & {=} & {\left( \begin{array}{c c c} v _ {1} & w _ {2 1} v _ {1} & w _ {3 2} w _ {2 1} v _ {1} \\ w _ {2 1} v _ {1} & v _ {2} + w _ {2 1} ^ {2} v _ {1} & w _ {3 2} (v _ {2} + w _ {2 1} ^ {2} v _ {1}) \\ w _ {3 2} w _ {2 1} v _ {1} & w _ {3 2} (v _ {2} + w _ {2 1} ^ {2} v _ {1}) & v _ {3} + w _ {3 2} ^ {2} (v _ {2} + w _ {2 1} ^ {2} v _ {1}) \end{array} \right)} \end{array}\tag{8.18}
$$

We can readily extend the linear-Gaussian graphical model to the case in which the nodes of the graph represent multivariate Gaussian variables. In this case, we can write the conditional distribution for node i in the form 

$$
p \left(\mathbf {x} _ {i} \mid \mathrm{pa} _ {i}\right) = \mathcal {N} \left(\mathbf {x} _ {i} \left| \sum_ {j \in \mathrm{pa} _ {i}} \mathbf {W} _ {i j} \mathbf {x} _ {j} + \mathbf {b} _ {i}, \boldsymbol {\Sigma} _ {i}\right) \right.\tag{8.19}
$$

where now $\mathbf { W } _ { i j }$ is a matrix (which is nonsquare if $\mathbf { x } _ { i }$ and $\mathbf { x } _ { j }$ have different dimensionalities). Again it is easy to verify that the joint distribution over all variables is Gaussian. 

Note that we have already encountered a specific example of the linear-Gaussian relationship when we saw that the conjugate prior for the mean $\pmb { \mu }$ of a Gaussian variable $\mathbf { x }$ is itself a Gaussian distribution over $\pmb { \mu } .$ . The joint distribution over x and $\pmb { \mu }$ is therefore Gaussian. This corresponds to a simple two-node graph in which the node representing $\pmb { \mu }$ is the parent of the node representing $\mathbf { x } .$ . The mean of the distribution over $\pmb { \mu }$ is a parameter controlling a prior, and so it can be viewed as a hyperparameter. Because the value of this hyperparameter may itself be unknown, we can again treat it from a Bayesian perspective by introducing a prior over the hyperparameter, sometimes called a hyperprior, which is again given by a Gaussian distribution. This type of construction can be extended in principle to any level and is an illustration of a hierarchical Bayesian model, of which we shall encounter further examples in later chapters. 

## 8.2. Conditional Independence

An important concept for probability distributions over multiple variables is that of conditional independence (Dawid, 1980). Consider three variables a, $b ,$ and $c ,$ and suppose that the conditional distribution of $^ { a , }$ given $b$ and $c ,$ is such that it does not depend on the value of $b ,$ so that 

$$
p (a | b, c) = p (a | c).\tag{8.20}
$$

We say that $a$ is conditionally independent of b given $c .$ This can be expressed in a slightly different way if we consider the joint distribution of $a$ and $b$ conditioned on $c ,$ which we can write in the form 

$$
\begin{array}{r c l} p (a, b | c) & = & p (a | b, c) p (b | c) \\ & = & p (a | c) p (b | c). \end{array}\tag{8.21}
$$

where we have used the product rule of probability together with (8.20). Thus we see that, conditioned on $c ,$ the joint distribution of $a$ and b factorizes into the product of the marginal distribution of a and the marginal distribution of $b$ (again both conditioned on c). This says that the variables a and $b$ are statistically independent, given c. Note that our definition of conditional independence will require that (8.20), 

Figure 8.15 The first of three examples of graphs over three variables a, b, and c used to discuss conditional independence properties of directed graphical models. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/9b75acb0342875322607939bc7db7f1a92a3bb55c361d04f971beb9189d036a6.jpg)


or equivalently (8.21), must hold for every possible value of c, and not just for some values. We shall sometimes use a shorthand notation for conditional independence (Dawid, 1979) in which 

$$
a \perp b \mid c\tag{8.22}
$$

denotes that a is conditionally independent of b given c and is equivalent to (8.20). 

Conditional independence properties play an important role in using probabilistic models for pattern recognition by simplifying both the structure of a model and the computations needed to perform inference and learning under that model. We shall see examples of this shortly. 

If we are given an expression for the joint distribution over a set of variables in terms of a product of conditional distributions (i.e., the mathematical representation underlying a directed graph), then we could in principle test whether any potential conditional independence property holds by repeated application of the sum and product rules of probability. In practice, such an approach would be very time consuming. An important and elegant feature of graphical models is that conditional independence properties of the joint distribution can be read directly from the graph without having to perform any analytical manipulations. The general framework for achieving this is called d-separation, where the $\cdot _ { \mathrm { d } } ,$ stands for ‘directed’ (Pearl, 1988). Here we shall motivate the concept of d-separation and give a general statement of the d-separation criterion. A formal proof can be found in Lauritzen (1996). 

## 8.2.1 Three example graphs

We begin our discussion of the conditional independence properties of directed graphs by considering three simple examples each involving graphs having just three nodes. Together, these will motivate and illustrate the key concepts of d-separation. The first of the three examples is shown in Figure 8.15, and the joint distribution corresponding to this graph is easily written down using the general result (8.5) to give 

$$
p (a, b, c) = p (a | c) p (b | c) p (c).\tag{8.23}
$$

If none of the variables are observed, then we can investigate whether a and b are independent by marginalizing both sides of (8.23) with respect to c to give 

$$
p (a, b) = \sum_ {c} p (a | c) p (b | c) p (c).\tag{8.24}
$$

In general, this does not factorize into the product $p ( a ) p ( b )$ , and so 

$$
a \not \perp b \mid \emptyset\tag{8.25}
$$

Figure 8.16 As in Figure 8.15 but where we have conditioned on the value of variable c. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a17fe665074a1a33f0abcf7025f0690472953dbdb7d66b4f11e8d2b24b42673b.jpg)


where $\varnothing$ denotes the empty set, and the symbol means that the conditional independence property does not hold in general. Of course, it may hold for a particular distribution by virtue of the specific numerical values associated with the various conditional probabilities, but it does not follow in general from the structure of the graph. 

Now suppose we condition on the variable $c ,$ as represented by the graph of Figure 8.16. From (8.23), we can easily write down the conditional distribution of a and b, given c, in the form 

$$
\begin{array}{r c l} p (a, b | c) & = & \frac {p (a , b , c)}{p (c)} \\ & = & p (a | c) p (b | c) \end{array}
$$

and so we obtain the conditional independence property 

$$
a \perp b \mid c.
$$

We can provide a simple graphical interpretation of this result by considering the path from node a to node b via c. The node c is said to be tail-to-tail with respect to this path because the node is connected to the tails of the two arrows, and the presence of such a path connecting nodes a and b causes these nodes to be dependent. However, when we condition on node $c ,$ as in Figure 8.16, the conditioned node ‘blocks’ the path from a to $b$ and causes a and b to become (conditionally) independent. 

We can similarly consider the graph shown in Figure 8.17. The joint distribution corresponding to this graph is again obtained from our general formula (8.5) to give 

$$
p (a, b, c) = p (a) p (c | a) p (b | c).\tag{8.26}
$$

First of all, suppose that none of the variables are observed. Again, we can test to see if a and b are independent by marginalizing over c to give 

$$
p (a, b) = p (a) \sum_ {c} p (c | a) p (b | c) = p (a) p (b | a).
$$

Figure 8.17 The second of our three examples of 3-node graphs used to motivate the conditional independence framework for directed graphical models. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/2d6d464079a9f85ae6249e1a20eb3c3e78dc31c39919c207304ebe3ae9d3bd44.jpg)


Figure 8.18 As in Figure 8.17 but now conditioning on node c. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/3a91c04de20efc732129b7f99a185c1fcddc91d2569408206634b9dd20700c40.jpg)


which in general does not factorize into $p ( a ) p ( b )$ , and so 

$$
a \not \perp b \mid \emptyset\tag{8.27}
$$

as before. 

Now suppose we condition on node c, as shown in Figure 8.18. Using Bayes theorem, together with (8.26), we obtain 

$$
\begin{array}{r c l} p (a, b | c) & = & \frac {p (a , b , c)}{p (c)} \\ & = & \frac {p (a) p (c | a) p (b | c)}{p (c)} \\ & = & p (a | c) p (b | c) \end{array}
$$

and so again we obtain the conditional independence property 

$$
a \perp b \mid c.
$$

As before, we can interpret these results graphically. The node c is said to be head-to-tail with respect to the path from node a to node b. Such a path connects nodes a and b and renders them dependent. If we now observe c, as in Figure 8.18, then this observation ‘blocks’ the path from a to $b$ and so we obtain the conditional independence property a b c. 

Finally, we consider the third of our 3-node examples, shown by the graph in Figure 8.19. As we shall see, this has a more subtle behaviour than the two previous graphs. 

The joint distribution can again be written down using our general result (8.5) to give 

$$
p (a, b, c) = p (a) p (b) p (c | a, b).\tag{8.28}
$$

Consider first the case where none of the variables are observed. Marginalizing both sides of (8.28) over c we obtain 

$$
p (a, b) = p (a) p (b)
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/ca02a31e584118aa9d222a297257b18fa79ddc7cb40f43551a75224e7347a56d.jpg)


Figure 8.20 As in Figure 8.19 but conditioning on the value of node $c .$ In this graph, the act of conditioning induces a dependence between a and b. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/6aa6bc1b122f2c3e073e5f6c88f2ded6ee017bd7ee0190c9e13f7c24cbb8b130.jpg)


and so a and $b$ are independent with no variables observed, in contrast to the two previous examples. We can write this result as 

$$
a \perp \perp b \mid \emptyset .\tag{8.29}
$$

Now suppose we condition on c, as indicated in Figure 8.20. The conditional distribution of a and b is then given by 

$$
\begin{array}{r c l} p (a, b | c) & = & \frac {p (a , b , c)}{p (c)} \\ & = & \frac {p (a) p (b) p (c | a , b)}{p (c)} \end{array}
$$

which in general does not factorize into the product $p ( a ) p ( b )$ , and so 

$$
a \not \perp b \mid c.
$$

Thus our third example has the opposite behaviour from the first two. Graphically, we say that node c is head-to-head with respect to the path from a to b because it connects to the heads of the two arrows. When node c is unobserved, it ‘blocks the path, and the variables a and b are independent. However, conditioning on c ‘unblocks’ the path and renders a and b dependent. 

There is one more subtlety associated with this third example that we need to consider. First we introduce some more terminology. We say that node y is a descendant of node x if there is a path from x to y in which each step of the path follows the directions of the arrows. Then it can be shown that a head-to-head path will become unblocked if either the node, or any ofits descendants, is observed. 

In summary, a tail-to-tail node or a head-to-tail node leaves a path unblocked unless it is observed in which case it blocks the path. By contrast, a head-to-head node blocks a path if it is unobserved, but once the node, and/or at least one of its descendants, is observed the path becomes unblocked. 

It is worth spending a moment to understand further the unusual behaviour of the graph of Figure 8.20. Consider a particular instance of such a graph corresponding to a problem with three binary random variables relating to the fuel system on a car, as shown in Figure 8.21. The variables are called B, representing the state of a battery that is either charged $( B = 1 )$ or flat $( B = 0 )$ , F representing the state of the fuel tank that is either full of fuel $( F = 1 )$ or empty $( F = 0 )$ , and G, which is the state of an electric fuel gauge and which indicates either full $( G = 1 )$ or empty $( G = 0 )$ . The battery is either charged or flat, and independently the fuel tank is either full or empty, with prior probabilities 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/2a06ca9565d1101d79ae4906730728d453bdfeb1a2126daf194d2f811500cc99.jpg)



Figure 8.21 An example of a 3-node graph used to illustrate the phenomenon of ‘explaining away’. The three nodes represent the state of the battery (B), the state of the fuel tank (F) and the reading on the electric fuel gauge (G). See the text for details.


$$
\begin{array}{r c l} p (B = 1) & = & 0. 9 \\ p (F = 1) & = & 0. 9. \end{array}
$$

Given the state of the fuel tank and the battery, the fuel gauge reads full with probabilities given by 

$$
\begin{array}{r c l} p (G = 1 | B = 1, F = 1) & = & 0. 8 \\ p (G = 1 | B = 1, F = 0) & = & 0. 2 \\ p (G = 1 | B = 0, F = 1) & = & 0. 2 \\ p (G = 1 | B = 0, F = 0) & = & 0. 1 \end{array}
$$

so this is a rather unreliable fuel gauge! All remaining probabilities are determined by the requirement that probabilities sum to one, and so we have a complete specification of the probabilistic model. 

Before we observe any data, the prior probability of the fuel tank being empty is $p ( F = 0 ) = 0 . 1$ . Now suppose that we observe the fuel gauge and discover that it reads empty, i.e., $G = 0$ , corresponding to the middle graph in Figure 8.21. We can use Bayes’ theorem to evaluate the posterior probability of the fuel tank being empty. First we evaluate the denominator for Bayes’ theorem given by 

$$
p (G = 0) = \sum_ {B \in \{0, 1 \}} \sum_ {F \in \{0, 1 \}} p (G = 0 | B, F) p (B) p (F) = 0. 3 1 5\tag{8.30}
$$

and similarly we evaluate 

$$
p (G = 0 | F = 0) = \sum_ {B \in \{0, 1 \}} p (G = 0 | B, F = 0) p (B) = 0. 8 1\tag{8.31}
$$

and using these results we have 

$$
p (F = 0 | G = 0) = \frac {p (G = 0 | F = 0) p (F = 0)}{p (G = 0)} \simeq 0. 2 5 7\tag{8.32}
$$

and so $p ( F = 0 | G = 0 ) > p ( F = 0 )$ . Thus observing that the gauge reads empty makes it more likely that the tank is indeed empty, as we would intuitively expect. Next suppose that we also check the state of the battery and find that it is flat, i.e., $B = 0$ . We have now observed the states of both the fuel gauge and the battery, as shown by the right-hand graph in Figure 8.21. The posterior probability that the fuel tank is empty given the observations of both the fuel gauge and the battery state is then given by 

$$
p (F = 0 | G = 0, B = 0) = \frac {p (G = 0 | B = 0 , F = 0) p (F = 0)}{\sum_ {F \in \{0 , 1 \}} p (G = 0 | B = 0 , F) p (F)} \simeq 0. 1 1 1\tag{8.33}
$$

where the prior probability $p ( B = 0 )$ has cancelled between numerator and denominator. Thus the probability that the tank is empty has decreased (from 0.257 to 0.111) as a result of the observation of the state of the battery. This accords with our intuition that finding out that the battery is flat explains away the observation that the fuel gauge reads empty. We see that the state of the fuel tank and that of the battery have indeed become dependent on each other as a result of observing the reading on the fuel gauge. In fact, this would also be the case ${ \mathrm { i f } } ,$ instead of observing the fuel gauge directly, we observed the state of some descendant of $G .$ Note that the probability $p ( F = 0 | G = 0 , B = 0 ) \simeq 0$ .111 is greater than the prior probability $p ( F = 0 ) = 0 . 1$ because the observation that the fuel gauge reads zero still provides some evidence in favour of an empty fuel tank. 

## 8.2.2 D-separation

We now give a general statement of the d-separation property (Pearl, 1988) for directed graphs. Consider a general directed graph in which A, B, and $C$ are arbitrary nonintersecting sets of nodes (whose union may be smaller than the complete set of nodes in the graph). We wish to ascertain whether a particular conditional independence statement A $B \mid C$ is implied by a given directed acyclic graph. To do so, we consider all possible paths from any node in $A$ to any node in $B .$ Any such path is said to be blocked if it includes a node such that either 

(a) the arrows on the path meet either head-to-tail or tail-to-tail at the node, and the node is in the set $C ,$ , or 

(b) the arrows meet head-to-head at the node, and neither the node, nor any of its descendants, is in the set $C .$ 

If all paths are blocked, then A is said to be d-separated from B by C, and the joint distribution over all of the variables in the graph will satisfy A $B \mid C$ 

The concept of d-separation is illustrated in Figure 8.22. In graph (a), the path from a to $b$ is not blocked by node $f$ because it is a tail-to-tail node for this path and is not observed, nor is it blocked by node e because, although the latter is a head-to-head node, it has a descendant $c$ because is in the conditioning set. Thus the conditional independence statement $a \perp \perp b \mid c$ does not follow from this graph. In graph (b), the path from a to $b$ is blocked by node $f$ because this is a tail-to-tail node that is observed, and so the conditional independence property $a \perp \perp b \mid f$ will be satisfied by any distribution that factorizes according to this graph. Note that this path is also blocked by node $e$ because e is a head-to-head node and neither it nor its descendant are in the conditioning set. 


Figure 8.22 Illustration of the concept of d-separation. See the text for details.


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/52972c5f1aeebc796720980da59ae9ffaa95a2adb157e6810517a1aca3bc5643.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/66f38384260b822c8bb7b96c190faf409d3fb636b1e8493e372b7eb1ae89d654.jpg)



(b)


For the purposes of d-separation, parameters such as $\alpha$ and $\sigma ^ { 2 }$ in Figure 8.5, indicated by small filled circles, behave in the same was as observed nodes. However, there are no marginal distributions associated with such nodes. Consequently parameter nodes never themselves have parents and so all paths through these nodes will always be tail-to-tail and hence blocked. Consequently they play no role in d-separation. 

Another example of conditional independence and d-separation is provided by the concept of i.i.d. (independent identically distributed) data introduced in Section 1.2.4. Consider the problem of finding the posterior distribution for the mean of a univariate Gaussian distribution. This can be represented by the directed graph shown in Figure 8.23 in which the joint distribution is defined by a prior $p ( \mu )$ together with a set of conditional distributions $p ( x _ { n } | \mu )$ for $n = 1 , \ldots , N$ . In practice, we observe $\mathcal { D } = \{ x _ { 1 } , \ldots , x _ { N } \}$ and our goal is to infer $\mu .$ . Suppose, for a moment, that we condition on $\mu$ and consider the joint distribution of the observations. Using d-separation, we note that there is a unique path from any $x _ { i }$ to any other $x _ { j \neq i }$ and that this path is tail-to-tail with respect to the observed node $\mu .$ . Every such path is blocked and so the observations $D = \{ x _ { 1 } , \ldots , x _ { N } \}$ are independent given $\mu ,$ so that 

$$
p (\mathcal {D} | \mu) = \prod_ {n = 1} ^ {N} p (x _ {n} | \mu).\tag{8.34}
$$

(a) Directed graph corresponding to the problem of inferring the mean $\mu$ of a univariate Gaussian distribution from observations $x _ { 1 } , \ldots , x _ { N }$ (b) The same graph drawn using the plate notation. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/520f4f1f4f15e6d7d6b98c3366b0403ce1309953b191b9fc3e040be683839481.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/e2536502b09c00132dffb864b0443d5e335095eb1f7d84acb844328003d9aa05.jpg)



(b)


Figure 8.24 A graphical representation of the ‘naive Bayes’ model for classification. Conditioned on the class label $\mathbf { z } ,$ the components of the observed vector $\textbf { x } = ( x _ { 1 } , \dots , x _ { D } ) ^ { \mathrm { T } }$ are assumed to be independent. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-11-12/7c88183d-ab7f-4ef4-9833-795511e7d467/a09b933a2dfa646358ec465ad76219323ea7f70bd58204d29e9ca4317731e934.jpg)


However, if we integrate over $\mu ,$ the observations are in general no longer independent 

$$
p (\mathcal {D}) = \int_ {0} ^ {\infty} p (\mathcal {D} | \mu) p (\mu) \mathrm{d} \mu \neq \prod_ {n = 1} ^ {N} p (x _ {n}).\tag{8.35}
$$

Here $\mu$ is a latent variable, because its value is not observed. 

Another example of a model representing i.i.d. data is the graph in Figure 8.7 corresponding to Bayesian polynomial regression. Here the stochastic nodes correspond to $\{ t _ { n } \} ,$ w and $\widehat { t } .$ We see that the node for w is tail-to-tail with respect to the path from $\widehat { t }$ to any one of the nodes $t _ { n }$ and so we have the following conditional independence property 

$$
\widehat {t} \perp \perp t _ {n} \mid \mathbf {w}.\tag{8.36}
$$

Thus, conditioned on the polynomial coefficients w, the predictive distribution for $\widehat { t }$ is independent of the training data $\{ t _ { 1 } , \ldots , t _ { N } \}$ . We can therefore first use the training data to determine the posterior distribution over the coefficients w and then we can discard the training data and use the posterior distribution for w to make predictions of $\widehat { \mathbf { \xi } _ { t } }$ for new input observations ${ \widehat { x } } .$ 

 A related graphical structure arises in an approach to classification called the naive Bayes model, in which we use conditional independence assumptions to simplify the model structure. Suppose our observed variable consists of a D-dimensional vector ${ \bf x } = ( x _ { 1 } , \dots , x _ { D } ) ^ { \mathrm { T } }$ , and we wish to assign observed values of x to one of K classes. Using the 1-of-K encoding scheme, we can represent these classes by a $K \cdot$ dimensional binary vector z. We can then define a generative model by introducing a multinomial prior $p ( \mathbf { z } | \boldsymbol { \mu } )$ over the class labels, where the $k ^ { \mathrm { t h } }$ component $\mu _ { k }$ of $\pmb { \mu }$ is the prior probability of class $\mathcal { C } _ { k }$ , together with a conditional distribution $p ( \mathbf { x } | \mathbf { z } )$ for the observed vector $\mathbf { x } .$ The key assumption of the naive Bayes model is that, conditioned on the class $\mathbf { z } ,$ the distributions of the input variables $x _ { 1 } , \ldots , x _ { D }$ are independent. The graphical representation of this model is shown in Figure 8.24. We see that observation of $\mathbf { z }$ blocks the path between $x _ { i }$ and $x _ { j }$ for $j \neq i$ (because such paths are tail-to-tail at the node ${ \bf z } )$ and so $x _ { i }$ and $x _ { j }$ are conditionally independent given z. If, however, we marginalize out z (so that z is unobserved) the tail-to-tail path from $x _ { i }$ to $x _ { j }$ is no longer blocked. This tells us that in general the marginal density $p ( \mathbf { x } )$ will not factorize with respect to the components of $\mathbf { x } .$ . We encountered a simple application of the naive Bayes model in the context of fusing data from different sources for medical diagnosis in Section 1.5. 

If we are given a labelled training set, comprising inputs $\left\{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \right\}$ together with their class labels, then we can fit the naive Bayes model to the training data 