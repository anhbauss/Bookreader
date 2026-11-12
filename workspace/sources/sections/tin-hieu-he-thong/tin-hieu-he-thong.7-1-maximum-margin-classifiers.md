---
id: "tin-hieu-he-thong.7-1-maximum-margin-classifiers"
doc_id: "tin-hieu-he-thong"
title: "7.1. Maximum Margin Classifiers"
level: 2
heading_path: ["Sparse Kernel Machines", "7.1. Maximum Margin Classifiers"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.sparse-kernel-machines"
next_id: "tin-hieu-he-thong.joseph-louis-lagrange-1736-1813"
block_ids: ["b3690", "b3691", "b3692", "b3693", "b3694", "b3695", "b3696", "b3697", "b3698", "b3699", "b3700", "b3701", "b3702", "b3703", "b3704", "b3705", "b3706", "b3707", "b3708", "b3709", "b3710", "b3711", "b3712", "b3713", "b3714", "b3715", "b3716", "b3717", "b3718", "b3719", "b3720", "b3721", "b3722", "b3723", "b3724", "b3725"]
---

## 7.1. Maximum Margin Classifiers

We begin our discussion of support vector machines by returning to the two-class classification problem using linear models of the form

y (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x}) + b\tag{7.1}

where $\phi ( \mathbf { x } )$ denotes a fixed feature-space transformation, and we have made the bias parameter b explicit. Note that we shall shortly introduce a dual representation expressed in terms of kernel functions, which avoids having to work explicitly in feature space. The training data set comprises N input vectors $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ , with corresponding target values $t _ { 1 } , \ldots , t _ { N }$ where $t _ { n } \in \{ - 1 , 1 \}$ , and new data points x are classified according to the sign of $y ( \mathbf x )$

We shall assume for the moment that the training data set is linearly separable in feature space, so that by definition there exists at least one choice of the parameters w and b such that a function of the form (7.1) satisfies $y ( \mathbf { x } _ { n } ) > 0$ for points having $t _ { n } = + 1$ and $y ( \mathbf { x } _ { n } ) < 0$ for points having $t _ { n } = - 1$ , so that $t _ { n } y ( \mathbf { x } _ { n } ) > 0$ for all training data points.

There may of course exist many such solutions that separate the classes exactly. In Section 4.1.7, we described the perceptron algorithm that is guaranteed to find a solution in a finite number of steps. The solution that it finds, however, will be dependent on the (arbitrary) initial values chosen for w and $b$ as well as on the order in which the data points are presented. If there are multiple solutions all of which classify the training data set exactly, then we should try to find the one that will give the smallest generalization error. The support vector machine approaches this problem through the concept of the margin, which is defined to be the smallest distance between the decision boundary and any of the samples, as illustrated in Figure 7.1.

In support vector machines the decision boundary is chosen to be the one for which the margin is maximized. The maximum margin solution can be motivated using computational learning theory, also known as statistical learning theory. However, a simple insight into the origins of maximum margin has been given by Tong and Koller (2000) who consider a framework for classification based on a hybrid of generative and discriminative approaches. They first model the distribution over input vectors x for each class using a Parzen density estimator with Gaussian kernels having a common parameter $\sigma ^ { 2 }$ . Together with the class priors, this defines an optimal misclassification-rate decision boundary. However, instead of using this optimal boundary, they determine the best hyperplane by minimizing the probability of error relative to the learned density model. In the limit $\sigma ^ { 2 } \to 0$ , the optimal hyperplane is shown to be the one having maximum margin. The intuition behind this result is that as $\sigma ^ { 2 }$ is reduced, the hyperplane is increasingly dominated by nearby data points relative to more distant ones. In the limit, the hyperplane becomes independent of data points that are not support vectors.

![image](images/part-002--c78e75c7e03b0ea5958dd94c2cbdd0c0b5a041d7cf7fe7df6005b1ca4e5e2571.jpg)

Figure 7.1 The margin is defined as the perpendicular distance between the decision boundary and the closest of the data points, as shown on the left figure. Maximizing the margin leads to a particular choice of decision boundary, as shown on the right. The location of this boundary is determined by a subset of the data points, known as support vectors, which are indicated by the circles.

We shall see in Figure 10.13 that marginalization with respect to the prior distribution of the parameters in a Bayesian approach for a simple linearly separable data set leads to a decision boundary that lies in the middle of the region separating the data points. The large margin solution has similar behaviour.

Recall from Figure 4.1 that the perpendicular distance of a point x from a hyperplane defined by $y ( \mathbf { x } ) = 0$ where $y ( \mathbf x )$ takes the form (7.1) is given by $| y ( \mathbf { x } ) | / \| \mathbf { w } \|$ Furthermore, we are only interested in solutions for which all data points are correctly classified, so that $t _ { n } y ( \mathbf { x } _ { n } ) > 0$ for all n. Thus the distance of a point ${ \bf x } _ { n }$ to the decision surface is given by

\frac {t _ {n} y (\mathbf {x} _ {n})}{\| \mathbf {w} \|} = \frac {t _ {n} (\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) + b)}{\| \mathbf {w} \|}.\tag{7.2}

The margin is given by the perpendicular distance to the closest point ${ \bf x } _ { n }$ from the data set, and we wish to optimize the parameters w and b in order to maximize this distance. Thus the maximum margin solution is found by solving

\arg \max _ {\mathbf {w}, b} \left\{\frac {1}{\| \mathbf {w} \|} \min _ {n} \left[ t _ {n} \left(\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x} _ {n}) + b\right) \right] \right\}\tag{7.3}

where we have taken the factor $1 / \| \mathbf { w } \|$ outside the optimization over n because w does not depend on n. Direct solution of this optimization problem would be very complex, and so we shall convert it into an equivalent problem that is much easier to solve. To do this we note that if we make the rescaling $\mathbf { w } \to \kappa \mathbf { w }$ and $b \to \kappa b .$ then the distance from any point ${ \bf x } _ { n }$ to the decision surface, given by $t _ { n } y ( \mathbf { x } _ { n } ) / \| \mathbf { w } \|$ is unchanged. We can use this freedom to set

t _ {n} \left(\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x} _ {n}) + b\right) = 1\tag{7.4}

for the point that is closest to the surface. In this case, all data points will satisfy the constraints

t _ {n} \left(\mathbf {w} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) + b\right) \geqslant 1, \quad n = 1, \dots , N.\tag{7.5}

This is known as the canonical representation of the decision hyperplane. In the case of data points for which the equality holds, the constraints are said to be active, whereas for the remainder they are said to be inactive. By definition, there will always be at least one active constraint, because there will always be a closest point, and once the margin has been maximized there will be at least two active constraints. The optimization problem then simply requires that we maximize $\lVert \mathbf { w } \rVert ^ { - 1 }$ , which is equivalent to minimizing $\| \mathbf { w } \| ^ { 2 }$ , and so we have to solve the optimization problem

\underset {\mathbf {w}, b} {\arg \min} \frac {1}{2} \| \mathbf {w} \| ^ {2}\tag{7.6}

subject to the constraints given by (7.5). The factor of $1 / 2$ in (7.6) is included for later convenience. This is an example of a quadratic programming problem in which we are trying to minimize a quadratic function subject to a set of linear inequality constraints. It appears that the bias parameter b has disappeared from the optimization. However, it is determined implicitly via the constraints, because these require that changes to $\left\| \mathbf { w } \right\|$ be compensated by changes to b. We shall see how this works shortly.

In order to solve this constrained optimization problem, we introduce Lagrange multipliers $a _ { n } \geqslant 0$ , with one multiplier $a _ { n }$ for each of the constraints in (7.5), giving the Lagrangian function

L (\mathbf {w}, b, \mathbf {a}) = \frac {1}{2} \| \mathbf {w} \| ^ {2} - \sum_ {n = 1} ^ {N} a _ {n} \left\{t _ {n} \left(\mathbf {w} ^ {\mathrm{T}} \phi \left(\mathbf {x} _ {n}\right) + b\right) - 1 \right\}\tag{7.7}

where $\mathbf { a } = ( a _ { 1 } , \ldots , a _ { N } ) ^ { \mathrm { T } }$ . Note the minus sign in front of the Lagrange multiplier term, because we are minimizing with respect to w and $b ,$ and maximizing with respect to a. Setting the derivatives of $L ( { \bf w } , b , { \bf a } )$ with respect to w and b equal to zero, we obtain the following two conditions

\mathbf {w} = \sum_ {n = 1} ^ {N} a _ {n} t _ {n} \phi (\mathbf {x} _ {n})\tag{7.8}

0 = \sum_ {n = 1} ^ {N} a _ {n} t _ {n}.\tag{7.9}

Eliminating w and b from $L ( { \bf w } , b , { \bf a } )$ using these conditions then gives the dual representation of the maximum margin problem in which we maximize

\widetilde {L} (\mathbf {a}) = \sum_ {n = 1} ^ {N} a _ {n} - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} a _ {n} a _ {m} t _ {n} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\tag{7.10}

with respect to a subject to the constraints

a _ {n} \geqslant 0, \quad n = 1, \dots , N,\tag{7.11}

\sum_ {n = 1} ^ {N} a _ {n} t _ {n} = 0.\tag{7.12}

Here the kernel function is defined by $k ( { \bf x } , { \bf x } ^ { \prime } ) = \phi ( { \bf x } ) ^ { \mathrm { T } } \phi ( { \bf x } ^ { \prime } )$ . Again, this takes the form of a quadratic programming problem in which we optimize a quadratic function of a subject to a set of inequality constraints. We shall discuss techniques for solving such quadratic programming problems in Section 7.1.1.

The solution to a quadratic programming problem in M variables in general has computational complexity that is $\mathcal { O } ( M ^ { 3 } )$ . In going to the dual formulation we have turned the original optimization problem, which involved minimizing (7.6) over M variables, into the dual problem (7.10), which has N variables. For a fixed set of basis functions whose number M is smaller than the number N of data points, the move to the dual problem appears disadvantageous. However, it allows the model to be reformulated using kernels, and so the maximum margin classifier can be applied efficiently to feature spaces whose dimensionality exceeds the number of data points, including infinite feature spaces. The kernel formulation also makes clear the role of the constraint that the kernel function $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ be positive definite, because this ensures that the Lagrangian function $\widetilde L ( \mathbf { a } )$ is bounded below, giving rise to a welldefined optimization problem.

In order to classify new data points using the trained model, we evaluate the sign of $y ( \mathbf x )$ defined by (7.1). This can be expressed in terms of the parameters $\left\{ a _ { n } \right\}$ and the kernel function by substituting for w using (7.8) to give

y (\mathbf {x}) = \sum_ {n = 1} ^ {N} a _ {n} t _ {n} k (\mathbf {x}, \mathbf {x} _ {n}) + b.\tag{7.13}

![image](images/part-002--8904fb4950c040044ec0175b404bf2529a0a279366fa76749377b9b337c0ec8c.jpg)
