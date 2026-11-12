---
id: "tin-hieu-he-thong.7-1-4-svms-for-regression"
doc_id: "tin-hieu-he-thong"
title: "7.1.4 SVMs for regression"
level: 2
heading_path: ["Sparse Kernel Machines", "7.1.4 SVMs for regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.7-1-3-multiclass-svms"
next_id: "tin-hieu-he-thong.7-1-5-computational-learning-theory"
block_ids: ["b3834", "b3835", "b3836", "b3837", "b3838", "b3839", "b3840", "b3841", "b3842", "b3843", "b3844", "b3845", "b3846", "b3847", "b3848", "b3849", "b3850", "b3851", "b3852", "b3853", "b3854", "b3855", "b3856", "b3857", "b3858", "b3859", "b3860", "b3861", "b3862", "b3863", "b3864", "b3865", "b3866", "b3867", "b3868", "b3869", "b3870", "b3871", "b3872", "b3873", "b3874", "b3875", "b3876", "b3877", "b3878", "b3879", "b3880", "b3881", "b3882", "b3883", "b3884", "b3885", "b3886", "b3887", "b3888", "b3889", "b3890", "b3891", "b3892", "b3893", "b3894", "b3895"]
---

## 7.1.4 SVMs for regression

We now extend support vector machines to regression problems while at the same time preserving the property of sparseness. In simple linear regression, we

Figure 7.6

Plot of an -insensitive error function (in red) in which the error increases linearly with distance beyond the insensitive region. Also shown for comparison is the quadratic error function (in green).

![image](images/part-002--863d1cdc9b603d5cdce68b32214d693a59c23d924a595f9eabd1a4e0dcc3183c.jpg)

minimize a regularized error function given by

\frac {1}{2} \sum_ {n = 1} ^ {N} \left\{y _ {n} - t _ {n} \right\} ^ {2} + \frac {\lambda}{2} \| \mathbf {w} \| ^ {2}.\tag{7.50}

To obtain sparse solutions, the quadratic error function is replaced by an -insensitive error function (Vapnik, 1995), which gives zero error if the absolute difference between the prediction $y ( \mathbf x )$ and the target t is less than  where $\epsilon > 0$ . A simple example of an -insensitive error function, having a linear cost associated with errors outside the insensitive region, is given by

E _ {\epsilon} (y (\mathbf {x}) - t) = \left\{ \begin{array}{l l} 0, & \text { if } | y (\mathbf {x}) - t | <   \epsilon ; \\ | y (\mathbf {x}) - t | - \epsilon , & \text { otherwise } \end{array} \right.\tag{7.51}

and is illustrated in Figure 7.6.

We therefore minimize a regularized error function given by

C \sum_ {n = 1} ^ {N} E _ {\epsilon} (y (\mathbf {x} _ {n}) - t _ {n}) + \frac {1}{2} \| \mathbf {w} \| ^ {2}\tag{7.52}

where $y ( \mathbf x )$ is given by (7.1). By convention the (inverse) regularization parameter, denoted C, appears in front of the error term.

As before, we can re-express the optimization problem by introducing slack variables. For each data point ${ \bf x } _ { n }$ , we now need two slack variables $\xi _ { n } \geqslant 0$ and $\widehat { \xi } _ { n } \geqslant 0$ , where $\xi _ { n } > 0$ corresponds to a point for which $t _ { n } > y ( \mathbf x _ { n } ) + \epsilon .$ , and $\widehat { \xi } _ { n } > 0$ corresponds to a point for which $t _ { n } < y ( \mathbf x _ { n } ) - \epsilon .$ , as illustrated in Figure 7.7.

The condition for a target point to lie inside the -tube is that $y _ { n } - \epsilon \leqslant t _ { n } \leqslant$ $y _ { n } + \epsilon$ , where $y _ { n } = y ( \mathbf { x } _ { n } )$ . Introducing the slack variables allows points to lie outside the tube provided the slack variables are nonzero, and the corresponding conditions are

{t _ {n}} \leqslant {y (\mathbf {x} _ {n}) + \epsilon + \xi_ {n}}\tag{7.53}

{t _ {n}} \geqslant {y (\mathbf {x} _ {n}) - \epsilon - \widehat {\xi} _ {n}.}\tag{7.54}

igure 7.7 Illustration of SVM regression, showing the regression curve together with the $\epsilon \cdot$ insensitive ‘tube’. Also shown are examples of the slack variables $\xi$ and ${ \widehat { \xi } } .$ Points above the -tube have $\xi > 0$ and ${ \widehat { \xi } } = 0 ,$ points below the -tube have $\xi ~ = ~ 0$ and $\widehat { \xi } > 0$ , and points inside the -tube have $\xi = \widehat { \xi } = 0$

![image](images/part-002--33f5bf3c38e9fa73f73272d0d83e9a6c9ca4cfed9a9a6077dcee3942f075c472.jpg)

The error function for support vector regression can then be written as

C \sum_ {n = 1} ^ {N} (\xi_ {n} + \widehat {\xi} _ {n}) + \frac {1}{2} \| \mathbf {w} \| ^ {2}\tag{7.55}

which must be minimized subject to the constraints $\xi _ { n } \geqslant 0$ and $\widehat { \xi } _ { n } \geqslant 0$ as well as (7.53) and (7.54). This can be achieved by introducing Lagrange multipliers $a _ { n } \geqslant 0$ $\widehat { a } _ { n } \geqslant 0 , \mu _ { n } \geqslant 0$ , and $\widehat { \mu } _ { n } \geqslant 0$ and optimizing the Lagrangian

\begin{array}{r c l} L & = & C \sum_ {n = 1} ^ {N} (\xi_ {n} + \widehat {\xi} _ {n}) + \frac {1}{2} \| \mathbf {w} \| ^ {2} - \sum_ {n = 1} ^ {N} (\mu_ {n} \xi_ {n} + \widehat {\mu} _ {n} \widehat {\xi} _ {n}) \\ & & - \sum_ {n = 1} ^ {N} a _ {n} (\epsilon + \xi_ {n} + y _ {n} - t _ {n}) - \sum_ {n = 1} ^ {N} \widehat {a} _ {n} (\epsilon + \widehat {\xi} _ {n} - y _ {n} + t _ {n}). \end{array}\tag{7.56}

We now substitute for $y ( \mathbf x )$ using (7.1) and then set the derivatives of the Lagrangian with respect to $\mathbf { w } , b , \xi _ { n }$ , and $\widehat { \xi } _ { n }$ to zero, giving

\frac {\partial L}{\partial \mathbf {w}} = 0 \Rightarrow \mathbf {w} = \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) \phi (\mathbf {x} _ {n})\tag{7.57}

\frac {\partial L}{\partial b} = 0 \Rightarrow \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) = 0\tag{7.58}

\frac {\partial L}{\partial \xi_ {n}} = 0 \Rightarrow a _ {n} + \mu_ {n} = C\tag{7.59}

\frac {\partial L}{\partial \widehat {\xi} _ {n}} = 0 \Rightarrow \widehat {a} _ {n} + \widehat {\mu} _ {n} = C.\tag{7.60}

Exercise 7.7

Using these results to eliminate the corresponding variables from the Lagrangian, we see that the dual problem involves maximizing

\begin{array}{r c l} \widetilde {L} (\mathbf {a}, \widehat {\mathbf {a}}) & = & - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) (a _ {m} - \widehat {a} _ {m}) k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) \\ & & - \epsilon \sum_ {n = 1} ^ {N} (a _ {n} + \widehat {a} _ {n}) + \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) t _ {n} \end{array}\tag{7.61}

with respect to $\left\{ a _ { n } \right\}$ and $\{ \widehat { a } _ { n } \}$ , where we have introduced the kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) =$ $\phi ( \mathbf { x } ) ^ { \mathrm { T } } \hat { \phi ( \mathbf { x } ^ { \prime } ) }$ . Again, this is a constrained maximization, and to find the constraints we note that $a _ { n } \geqslant 0$ and $\widehat { a } _ { n } \geqslant 0$ are both required because these are Lagrange multipliers. Also $\mu _ { n } \geqslant 0$ and $\widehat { \mu } _ { n } \geqslant 0$ together with (7.59) and (7.60), require $a _ { n } \leqslant C$ and $\widehat { a } _ { n } \leqslant C$ , and so again we have the box constraints

0 \leqslant a _ {n} \leqslant C\tag{7.62}

0 \leqslant \widehat {a} _ {n} \leqslant C\tag{7.63}

together with the condition (7.58).

Substituting (7.57) into (7.1), we see that predictions for new inputs can be made using

y (\mathbf {x}) = \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) k (\mathbf {x}, \mathbf {x} _ {n}) + b\tag{7.64}

which is again expressed in terms of the kernel function.

The corresponding Karush-Kuhn-Tucker (KKT) conditions, which state that at the solution the product of the dual variables and the constraints must vanish, are given by

a _ {n} (\epsilon + \xi_ {n} + y _ {n} - t _ {n}) = 0\tag{7.65}

\widehat {a} _ {n} (\epsilon + \widehat {\xi} _ {n} - y _ {n} + t _ {n}) = 0\tag{7.66}

(C - a _ {n}) \xi_ {n} = 0\tag{7.67}

(C - \widehat {a} _ {n}) \widehat {\xi} _ {n} = 0.\tag{7.68}

From these we can obtain several useful results. First of all, we note that a coefficient $a _ { n }$ can only be nonzero if $\epsilon + \xi _ { n } + y _ { n } - t _ { n } = 0$ , which implies that the data point either lies on the upper boundary of the -tube $( \xi _ { n } ~ = ~ 0 )$ or lies above the upper boundary $( \xi _ { n } > 0 )$ . Similarly, a nonzero value for $\widehat { a } _ { n }$ implies $\epsilon + \widehat { \xi } _ { n } - y _ { n } + t _ { n } = 0$ and such points must lie either on or below the lower boundary of the -tube.

Furthermore, the two constraints $\epsilon + \xi _ { n } + y _ { n } - t _ { n } = 0$ and $\epsilon + \widehat { \xi } _ { n } - y _ { n } + t _ { n } = 0$ are incompatible, as is easily seen by adding them together and noting that $\xi _ { n }$ and $\widehat { \xi } _ { n }$ are nonnegative while  is strictly positive, and so for every data point $\mathbf { x } _ { n } .$ , either $a _ { n }$ or $\widehat { a } _ { n }$ (or both) must be zero.

The support vectors are those data points that contribute to predictions given by (7.64), in other words those for which either $a _ { n } \neq 0$ or $\widehat { a } _ { n } \neq 0$ . These are points that lie on the boundary of the -tube or outside the tube. All points within the tube have $a _ { n } = { \widehat { a } } _ { n } = 0$ . We again have a sparse solution, and the only terms that have to be evaluated in the predictive model (7.64) are those that involve the support vectors.

The parameter b can be found by considering a data point for which $0 < a _ { n } <$ C, which from (7.67) must have $\xi _ { n } ~ = ~ 0$ , and from (7.65) must therefore satisfy $\epsilon + y _ { n } - t _ { n } = 0$ . Using (7.1) and solving for $b ,$ we obtain

\begin{array}{r c l} {b} & {=} & {t _ {n} - \epsilon - {\bf w} ^ {\mathrm{T}} \phi ({\bf x} _ {n})} \\ & {=} & {t _ {n} - \epsilon - \sum_ {m = 1} ^ {N} (a _ {m} - \widehat {a} _ {m}) k ({\bf x} _ {n}, {\bf x} _ {m})} \end{array}\tag{7.69}

where we have used (7.57). We can obtain an analogous result by considering a point for which $0 < \widehat { a } _ { n } < C$ . In practice, it is better to average over all such estimates of b.

As with the classification case, there is an alternative formulation of the SVM for regression in which the parameter governing complexity has a more intuitive interpretation (Scholkopf¨ et al., 2000). In particular, instead of fixing the width  of the insensitive region, we fix instead a parameter ν that bounds the fraction of points lying outside the tube. This involves maximizing

\begin{array}{r c l} \widetilde {L} (\mathbf {a}, \widehat {\mathbf {a}}) & = & - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) (a _ {m} - \widehat {a} _ {m}) k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) \\ & & + \sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) t _ {n} \end{array}\tag{7.70}

subject to the constraints

0 \leqslant a _ {n} \leqslant C / N\tag{7.71}

Appendix A

0 \leqslant \widehat {a} _ {n} \leqslant C / N

\sum_ {n = 1} ^ {N} (a _ {n} - \widehat {a} _ {n}) = 0\tag{7.72}

(7.73)

\sum_ {n = 1} ^ {N} (a _ {n} + \widehat {a} _ {n}) \leqslant \nu C.\tag{7.74}

It can be shown that there are at most $\nu N$ data points falling outside the insensitive tube, while at least $\nu N$ data points are support vectors and so lie either on the tube or outside it.

The use of a support vector machine to solve a regression problem is illustrated using the sinusoidal data set in Figure 7.8. Here the parameters ν and C have been chosen by hand. In practice, their values would typically be determined by crossvalidation.

Figure 7.8 Illustration of the $\nu { \mathrm { - } } \mathsf { S V M }$ for regression applied to the sinusoidal synthetic data set using Gaussian kernels. The predicted regression curve is shown by the red line, and the -insensitive tube corresponds to the shaded region. Also, the data points are shown in green, and those with support vectors are indicated by blue circles.

![image](images/part-002--2090f61315ba1787fc8d63985cfbc6cba1c9768f9cabf0323caec65423040579.jpg)
