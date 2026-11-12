---
id: "tin-hieu-he-thong.4-3-3-iterative-reweighted-least-squares"
doc_id: "tin-hieu-he-thong"
title: "4.3.3 Iterative reweighted least squares"
level: 2
heading_path: ["4 Linear Models for Classification", "4.3.3 Iterative reweighted least squares"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-3-2-logistic-regression"
next_id: "tin-hieu-he-thong.4-3-4-multiclass-logistic-regression"
block_ids: ["b2365", "b2366", "b2367", "b2368", "b2369", "b2370", "b2371", "b2372", "b2373", "b2374", "b2375", "b2376", "b2377", "b2378", "b2379", "b2380", "b2381", "b2382", "b2383", "b2384", "b2385", "b2386", "b2387", "b2388", "b2389", "b2390"]
---

## 4.3.3 Iterative reweighted least squares

In the case of the linear regression models discussed in Chapter 3, the maximum likelihood solution, on the assumption of a Gaussian noise model, leads to a closed-form solution. This was a consequence of the quadratic dependence of the log likelihood function on the parameter vector w. For logistic regression, there is no longer a closed-form solution, due to the nonlinearity of the logistic sigmoid function. However, the departure from a quadratic form is not substantial. To be precise, the error function is concave, as we shall see shortly, and hence has a unique minimum. Furthermore, the error function can be minimized by an efficient iterative technique based on the Newton-Raphson iterative optimization scheme, which uses a local quadratic approximation to the log likelihood function. The Newton-Raphson update, for minimizing a function $E ( \mathbf { w } )$ , takes the form (Fletcher, 1987; Bishop and Nabney, 2008)

\mathbf {w} ^ {\mathrm{(new)}} = \mathbf {w} ^ {\mathrm{(old)}} - \mathbf {H} ^ {- 1} \nabla E (\mathbf {w}).\tag{4.92}

where H is the Hessian matrix whose elements comprise the second derivatives of $E ( \mathbf { w } )$ with respect to the components of w.

Let us first of all apply the Newton-Raphson method to the linear regression model (3.3) with the sum-of-squares error function (3.12). The gradient and Hessian of this error function are given by

\nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} (\mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} - t _ {n}) \boldsymbol {\phi} _ {n} = \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi} \mathbf {w} - \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {t}\tag{4.93}

\mathbf {H} = \nabla \nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} \phi_ {n} \phi_ {n} ^ {\mathrm{T}} = \boldsymbol {\Phi} ^ {\mathrm{T}} \boldsymbol {\Phi}\tag{4.94}

Section 3.1.1

where $\Phi$ is the $N \times M$ design matrix, whose $n ^ { \mathrm { t h } }$ row is given by $\boldsymbol { \phi } _ { n } ^ { \mathrm { T } }$ . The Newton-Raphson update then takes the form

\begin{array}{r c l} \mathbf {w} ^ {\text {(new)}} & = & \mathbf {w} ^ {\text {(old)}} - (\boldsymbol {\Phi} ^ {\text {T}} \boldsymbol {\Phi}) ^ {- 1} \left\{\boldsymbol {\Phi} ^ {\text {T}} \boldsymbol {\Phi} \mathbf {w} ^ {\text {(old)}} - \boldsymbol {\Phi} ^ {\text {T}} \mathbf {t} \right\} \\ & = & (\boldsymbol {\Phi} ^ {\text {T}} \boldsymbol {\Phi}) ^ {- 1} \boldsymbol {\Phi} ^ {\text {T}} \mathbf {t} \end{array}\tag{4.95}

which we recognize as the standard least-squares solution. Note that the error function in this case is quadratic and hence the Newton-Raphson formula gives the exact solution in one step.

Now let us apply the Newton-Raphson update to the cross-entropy error function (4.90) for the logistic regression model. From (4.91) we see that the gradient and Hessian of this error function are given by

\nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} (y _ {n} - t _ {n}) \phi_ {n} = \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {y} - \mathbf {t})\tag{4.96}

\mathbf {H} = \nabla \nabla E (\mathbf {w}) = \sum_ {n = 1} ^ {N} y _ {n} (1 - y _ {n}) \phi_ {n} \phi_ {n} ^ {\mathrm{T}} = \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi}\tag{4.97}

where we have made use of (4.88). Also, we have introduced the $N \times N$ diagonal matrix R with elements

R _ {n n} = y _ {n} (1 - y _ {n}).\tag{4.98}

We see that the Hessian is no longer constant but depends on w through the weighting matrix R, corresponding to the fact that the error function is no longer quadratic. Using the property $0 < y _ { n } < 1$ , which follows from the form of the logistic sigmoid function, we see that $\mathbf { u } ^ { \mathrm { T } } \mathbf { H } \mathbf { u } > 0$ for an arbitrary vector u, and so the Hessian matrix H is positive definite. It follows that the error function is a concave function of w and hence has a unique minimum.

The Newton-Raphson update formula for the logistic regression model then becomes

\begin{array}{r c l} \mathbf {w} ^ {\text {(new)}} & = & \mathbf {w} ^ {\text {(old)}} - (\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi}) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {y} - \mathbf {t}) \\ & = & (\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi}) ^ {- 1} \left\{\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi} \mathbf {w} ^ {\text {(old)}} - \boldsymbol {\Phi} ^ {\mathrm{T}} (\mathbf {y} - \mathbf {t}) \right\} \\ & = & (\boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \boldsymbol {\Phi}) ^ {- 1} \boldsymbol {\Phi} ^ {\mathrm{T}} \mathbf {R} \mathbf {z} \end{array}\tag{4.99}

where z is an N-dimensional vector with elements

\mathbf {z} = \boldsymbol {\Phi} \mathbf {w} ^ {(\text { old })} - \mathbf {R} ^ {- 1} (\mathbf {y} - \mathbf {t}).\tag{4.100}

We see that the update formula (4.99) takes the form of a set of normal equations for a weighted least-squares problem. Because the weighing matrix R is not constant but depends on the parameter vector w, we must apply the normal equations iteratively, each time using the new weight vector w to compute a revised weighing matrix R. For this reason, the algorithm is known as iterative reweighted least squares, or IRLS (Rubin, 1983). As in the weighted least-squares problem, the elements of the diagonal weighting matrix R can be interpreted as variances because the mean and variance of t in the logistic regression model are given by

{\mathbb {E} [ t ]} = {\sigma (\mathbf {x}) = y}\tag{4.101}

\operatorname{var} [ t ] = \mathbb {E} [ t ^ {2} ] - \mathbb {E} [ t ] ^ {2} = \sigma (\mathbf {x}) - \sigma (\mathbf {x}) ^ {2} = y (1 - y)\tag{4.102}

where we have used the property $t ^ { 2 } = t$ for $t \in \{ 0 , 1 \}$ . In fact, we can interpret IRLS as the solution to a linearized problem in the space of the variable $a = \mathbf { w } ^ { \mathrm { T } } \phi$ . The quantity $z _ { n }$ , which corresponds to the $n ^ { \mathrm { t h } }$ element of z, can then be given a simple interpretation as an effective target value in this space obtained by making a local linear approximation to the logistic sigmoid function around the current operating point $\mathbf { w } \mathbf { ( \bar { o } l d ) }$

\begin{array}{r c l} {a _ {n} (\mathbf {w})} & \simeq & {a _ {n} (\mathbf {w} ^ {(\mathrm{old})}) + \left. \frac {\mathrm{d} a _ {n}}{\mathrm{d} y _ {n}} \right| _ {\mathbf {w} ^ {(\mathrm{old})}} (t _ {n} - y _ {n})} \\ & = & {\phi_ {n} ^ {\mathrm{T}} \mathbf {w} ^ {(\mathrm{old})} - \frac {(y _ {n} - t _ {n})}{y _ {n} (1 - y _ {n})} = z _ {n}.} \end{array}\tag{4.103}
