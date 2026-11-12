---
id: "tin-hieu-he-thong.appendix-e-lagrange-multipliers"
doc_id: "tin-hieu-he-thong"
title: "Appendix E. Lagrange Multipliers"
level: 2
heading_path: ["Appendix A. Data Sets", "Appendix E. Lagrange Multipliers"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.appendix-d-calculus-of-variations"
next_id: "tin-hieu-he-thong.references"
block_ids: ["b7564", "b7565", "b7566", "b7567", "b7568", "b7569", "b7570", "b7571", "b7572", "b7573", "b7574", "b7575", "b7576", "b7577", "b7578", "b7579", "b7580", "b7581", "b7582", "b7583", "b7584", "b7585", "b7586", "b7587", "b7588", "b7589", "b7590", "b7591", "b7592", "b7593", "b7594", "b7595", "b7596", "b7597", "b7598", "b7599", "b7600", "b7601", "b7602", "b7603", "b7604", "b7605", "b7606"]
---

## Appendix E. Lagrange Multipliers

Lagrange multipliers, also sometimes called undetermined multipliers, are used to find the stationary points of a function of several variables subject to one or more constraints.

Consider the problem of finding the maximum of a function $f ( x _ { 1 } , x _ { 2 } )$ subject to a constraint relating $x _ { 1 }$ and $x _ { 2 }$ , which we write in the form

g (x _ {1}, x _ {2}) = 0.\tag{E.1}

One approach would be to solve the constraint equation (E.1) and thus express $x _ { 2 }$ as a function of $x _ { 1 }$ in the form $x _ { 2 } = h ( x _ { 1 } )$ . This can then be substituted into $f ( x _ { 1 } , x _ { 2 } )$ to give a function of $x _ { 1 }$ alone of the form $f ( x _ { 1 } , h ( x _ { 1 } ) )$ . The maximum with respect to $x _ { 1 }$ could then be found by differentiation in the usual way, to give the stationary value $x _ { 1 } ^ { \star }$ , with the corresponding value of $x _ { 2 }$ given by $x _ { 2 } ^ { \star } = h ( x _ { 1 } ^ { \star } )$

One problem with this approach is that it may be difficult to find an analytic solution of the constraint equation that allows $x _ { 2 }$ to be expressed as an explicit function of $x _ { 1 }$ . Also, this approach treats $x _ { 1 }$ and $x _ { 2 }$ differently and so spoils the natural symmetry between these variables.

A more elegant, and often simpler, approach is based on the introduction of a parameter λ called a Lagrange multiplier. We shall motivate this technique from a geometrical perspective. Consider a D-dimensional variable x with components $x _ { 1 } , \ldots , x _ { D }$ . The constraint equation $g ( \mathbf { x } ) = 0$ then represents a $( D - 1 )$ -dimensional surface in x-space as indicated in Figure E.1.

We first note that at any point on the constraint surface the gradient $\nabla g ( \mathbf { x } )$ of the constraint function will be orthogonal to the surface. To see this, consider a point x that lies on the constraint surface, and consider a nearby point $\mathbf { x } + \epsilon$ that also lies on the surface. If we make a Taylor expansion around x, we have

g (\mathbf {x} + \boldsymbol {\epsilon}) \simeq g (\mathbf {x}) + \boldsymbol {\epsilon} ^ {\mathrm{T}} \nabla g (\mathbf {x}).\tag{E.2}

Because both x and $\mathbf { x } + \epsilon$ lie on the constraint surface, we have $g ( \mathbf { x } ) = g ( \mathbf { x } + \epsilon )$ and hence $\epsilon ^ { \mathrm { T } } \nabla g ( \mathbf { x } ) \simeq 0$ . In the limit $\| \epsilon \|  0$ we have $\epsilon ^ { \mathrm { T } } \nabla g ( \mathbf { x } ) \bar { = } \mathrm { ~ 0 ~ }$ , and because  is

Figure E.1 A geometrical picture of the technique of Lagrange multipliers in which we seek to maximize a function $f ( \mathbf { x } )$ , subject to the constraint $g ( \mathbf { x } ) = 0$ If x is D dimensional, the constraint $g ( \mathbf { x } ) = 0$ corresponds to a subspace of dimensionality $D - 1$ indicated by the red curve. The problem can be solved by optimizing the Lagrangian function $L ( \mathbf { x } , \lambda ) = f ( \mathbf { x } ) \dot { + } \lambda g ( \mathbf { x } )$

![image](images/part-004--a88368c0c0c7ba7a16b3d41b332e7f49c19605081ad88efea165c451e4f768d5.jpg)

then parallel to the constraint surface $g ( \mathbf { x } ) = 0$ , we see that the vector $\nabla g$ is normal to the surface.

Next we seek a point $\mathbf { x } ^ { \star }$ on the constraint surface such that $f ( \mathbf { x } )$ is maximized. Such a point must have the property that the vector $\nabla f ( \mathbf { x } )$ is also orthogonal to the constraint surface, as illustrated in Figure E.1, because otherwise we could increase the value of $f ( \mathbf { x } )$ by moving a short distance along the constraint surface. Thus $\nabla f$ and $\nabla g$ are parallel (or anti-parallel) vectors, and so there must exist a parameter λ such that

\nabla f + \lambda \nabla g = 0\tag{E.3}

where $\lambda \neq 0$ is known as a Lagrange multiplier. Note that λ can have either sign.

At this point, it is convenient to introduce the Lagrangian function defined by

L (\mathbf {x}, \lambda) \equiv f (\mathbf {x}) + \lambda g (\mathbf {x}).\tag{E.4}

The constrained stationarity condition (E.3) is obtained by setting $\nabla _ { \mathbf x } L = 0$ . Furthermore, the condition $\partial { \cal L } / \partial \lambda = 0$ leads to the constraint equation $g ( \mathbf { x } ) = 0$

Thus to find the maximum of a function $f ( \mathbf { x } )$ subject to the constraint $g ( \mathbf { x } ) = 0$ we define the Lagrangian function given by (E.4) and we then find the stationary point of $L ( \mathbf { x } , \lambda )$ with respect to both x and λ. For a D-dimensional vector x, this gives $D + 1$ equations that determine both the stationary point $\mathbf { x } ^ { \star }$ and the value of λ. If we are only interested in $\mathbf { x } ^ { \star }$ , then we can eliminate λ from the stationarity equations without needing to find its value (hence the term ‘undetermined multiplier’).

As a simple example, suppose we wish to find the stationary point of the function $f ( x _ { 1 } , x _ { 2 } ) = \overset { \cdot } { 1 } - x _ { 1 } ^ { 2 } - \overset { \cdot } { x } _ { 2 } ^ { 2 }$ subject to the constraint $g ( x _ { 1 } , x _ { 2 } ) = x _ { 1 } + x _ { 2 } - 1 = 0$ , as illustrated in Figure E.2. The corresponding Lagrangian function is given by

L (\mathbf {x}, \lambda) = 1 - x _ {1} ^ {2} - x _ {2} ^ {2} + \lambda (x _ {1} + x _ {2} - 1).\tag{E.5}

The conditions for this Lagrangian to be stationary with respect to $x _ { 1 } , x _ { 2 }$ , and λ give the following coupled equations:

- 2 x _ {1} + \lambda = 0\tag{E.6}

- 2 x _ {2} + \lambda = 0\tag{E.7}

x _ {1} + x _ {2} - 1 = 0.\tag{E.8}

Figure E.2 A simple example of the use of Lagrange multipliers in which the aim is to maximize $f ( x _ { 1 } , x _ { 2 } ) ~ =$ $1 - x _ { 1 } ^ { 2 } - x _ { 2 } ^ { 2 }$ subject to the constraint $g ( x _ { 1 } , x _ { 2 } ) = 0$ where $g ( x _ { 1 } , x _ { 2 } ) = x _ { 1 } + x _ { 2 } - 1$ . The circles show contours of the function $f ( x _ { 1 } , x _ { 2 } )$ , and the diagonal line shows the constraint surface $g ( x _ { 1 } , x _ { 2 } ) = \bar { 0 }$

![image](images/part-004--179a03d90254344764cc2a924cba141c32f16aaf51a3bf3719fb6cfe7020c968.jpg)

Solution of these equations then gives the stationary point as $\begin{array} { r } { ( x _ { 1 } ^ { \star } , x _ { 2 } ^ { \star } ) = ( \frac { 1 } { 2 } , \frac { 1 } { 2 } ) } \end{array}$ , and the corresponding value for the Lagrange multiplier is $\lambda = 1$

So far, we have considered the problem of maximizing a function subject to an equality constraint of the form $g ( \mathbf { x } ) = 0$ . We now consider the problem of maximizing $f ( \mathbf { x } )$ subject to an inequality constraint of the form $g ( \mathbf { x } ) \geqslant 0$ , as illustrated in Figure E.3.

There are now two kinds of solution possible, according to whether the constrained stationary point lies in the region where $g ( \mathbf { x } ) > 0$ , in which case the constraint is inactive, or whether it lies on the boundary $g ( \mathbf { x } ) = 0$ , in which case the constraint is said to be active. In the former case, the function $g ( \mathbf { x } )$ plays no role and so the stationary condition is simply $\nabla f ( \mathbf { x } ) = 0$ . This again corresponds to a stationary point of the Lagrange function (E.4) but this time with $\lambda = 0$ . The latter case, where the solution lies on the boundary, is analogous to the equality constraint discussed previously and corresponds to a stationary point of the Lagrange function (E.4) with $\lambda \neq 0$ . Now, however, the sign of the Lagrange multiplier is crucial, because the function $f ( \mathbf { x } )$ will only be at a maximum if its gradient is oriented away from the region $g ( \mathbf { x } ) > 0$ , as illustrated in Figure E.3. We therefore have $\nabla f ( \mathbf { x } ) = - \lambda \nabla g ( \mathbf { x } )$ for some value of $\lambda > 0$

For either of these two cases, the product $\lambda g ( \mathbf { x } ) = 0$ . Thus the solution to the problem of maximizing $f ( \mathbf { x } )$ subject to $g ( \mathbf { x } ) ~ \geqslant ~ 0$ is obtained by optimizing the Lagrange function (E.4) with respect to x and λ subject to the conditions

Figure E.3 Illustration of the problem of maximizing $f ( \mathbf { x } )$ subject to the inequality constraint $g ( \mathbf { x } ) \geqslant 0$

![image](images/part-004--f988eb5a5460fa9da7a5db9d90658798a22153b4d7689a0d013b74ff264502df.jpg)

g (\mathbf {x}) \geqslant 0

\lambda \geqslant 0\tag{E.9}

\lambda g (\mathbf {x}) = 0\tag{E.10}

(E.11)

These are known as the Karush-Kuhn-Tucker (KKT) conditions (Karush, 1939; Kuhn and Tucker, 1951).

Note that if we wish to minimize (rather than maximize) the function $f ( \mathbf { x } )$ subject to an inequality constraint $g ( \mathbf { x } ) \geqslant 0$ , then we minimize the Lagrangian function $L ( \mathbf { x } , \lambda ) = f ( \mathbf { \bar { x } } ) - \lambda g ( \mathbf { x } )$ with respect to x, again subject to $\lambda \geqslant 0$

Finally, it is straightforward to extend the technique of Lagrange multipliers to the case of multiple equality and inequality constraints. Suppose we wish to maximize $f ( \mathbf { x } )$ subject to $g _ { j } ( \mathbf { x } ) = 0 \operatorname { f o r } j = 1 , \ldots , J ,$ , and $h _ { k } ( { \bf x } ) \geqslant 0$ for $k = 1 , \ldots , K$ We then introduce Lagrange multipliers $\{ \lambda _ { j } \}$ and $\{ \mu _ { k } \}$ , and then optimize the Lagrangian function given by

L (\mathbf {x}, \{\lambda_ {j} \}, \{\mu_ {k} \}) = f (\mathbf {x}) + \sum_ {j = 1} ^ {J} \lambda_ {j} g _ {j} (\mathbf {x}) + \sum_ {k = 1} ^ {K} \mu_ {k} h _ {k} (\mathbf {x})\tag{E.12}

subject to $\mu _ { k } \geqslant 0$ and $\mu _ { k } h _ { k } ( { \bf x } ) = 0$ for $k = 1 , \ldots , K$ . Extensions to constrained functional derivatives are similarly straightforward. For a more detailed discussion of the technique of Lagrange multipliers, see Nocedal and Wright (1999).
