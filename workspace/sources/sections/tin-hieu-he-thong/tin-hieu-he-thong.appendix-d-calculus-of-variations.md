---
id: "tin-hieu-he-thong.appendix-d-calculus-of-variations"
doc_id: "tin-hieu-he-thong"
title: "Appendix D. Calculus of Variations"
level: 2
heading_path: ["Appendix A. Data Sets", "Appendix D. Calculus of Variations"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.eigenvector-equation"
next_id: "tin-hieu-he-thong.appendix-e-lagrange-multipliers"
block_ids: ["b7533", "b7534", "b7535", "b7536", "b7537", "b7538", "b7539", "b7540", "b7541", "b7542", "b7543", "b7544", "b7545", "b7546", "b7547", "b7548", "b7549", "b7550", "b7551", "b7552", "b7553", "b7554", "b7555", "b7556", "b7557", "b7558", "b7559", "b7560", "b7561", "b7562", "b7563"]
---

## Appendix D. Calculus of Variations

We can think of a function $y ( x )$ as being an operator that, for any input value $x ,$ returns an output value $y .$ In the same way, we can define a functional $F [ y ]$ to be an operator that takes a function $y ( x )$ and returns an output value $F .$ . An example of a functional is the length of a curve drawn in a two-dimensional plane in which the path of the curve is defined in terms of a function. In the context of machine learning, a widely used functional is the entropy $\mathrm { H } [ x ]$ for a continuous variable x because, for any choice of probability density function $p ( x )$ , it returns a scalar value representing the entropy of x under that density. Thus the entropy of $p ( x )$ could equally well have been written as $\mathrm { H } [ p ]$

A common problem in conventional calculus is to find a value of $x$ that maximizes (or minimizes) a function $y ( x )$ . Similarly, in the calculus of variations we seek a function $y ( x )$ that maximizes (or minimizes) a functional $F [ y ]$ . That is, of all possible functions $y ( x )$ , we wish to find the particular function for which the functional $F [ y ]$ is a maximum (or minimum). The calculus of variations can be used, for instance, to show that the shortest path between two points is a straight line or that the maximum entropy distribution is a Gaussian.

If we weren’t familiar with the rules of ordinary calculus, we could evaluate a conventional derivative $\mathrm { d } y /$ dx by making a small change  to the variable x and then expanding in powers of , so that

y (x + \epsilon) = y (x) + \frac {\mathrm{d} y}{\mathrm{d} x} \epsilon + O (\epsilon^ {2})\tag{D.1}

and finally taking the limit $\epsilon  0 .$ . Similarly, for a function of several variables $y ( x _ { 1 } , \ldots , x _ { D } )$ , the corresponding partial derivatives are defined by

y (x _ {1} + \epsilon_ {1}, \dots , x _ {D} + \epsilon_ {D}) = y (x _ {1}, \dots , x _ {D}) + \sum_ {i = 1} ^ {D} \frac {\partial y}{\partial x _ {i}} \epsilon_ {i} + O (\epsilon^ {2}).\tag{D.2}

The analogous definition of a functional derivative arises when we consider how much a functional $F [ y ]$ changes when we make a small change $\epsilon \eta ( x )$ to the function

Figure D.1 A functional derivative can be defined by considering how the value of a functional $F [ y ]$ changes when the function $y ( x )$ is changed to $y ( x ) + \epsilon \eta ( x )$ where $\eta ( x )$ is an arbitrary function of x.

![image](images/part-004--39187f22cf81e0b7af963e4e1a7d83bc75167a0e8f5cf8a7ce3af4f985d6dc3e.jpg)

$y ( x )$ , where $\eta ( x )$ is an arbitrary function of $x ,$ , as illustrated in Figure D.1. We denote the functional derivative of $E [ f ]$ with respect to $f ( x )$ by $\delta F / \delta f ( x )$ , and define it by the following relation:

F [ y (x) + \epsilon \eta (x) ] = F [ y (x) ] + \epsilon \int \frac {\delta F}{\delta y (x)} \eta (x) \mathrm{d} x + O (\epsilon^ {2}).\tag{D.3}

This can be seen as a natural extension of (D.2) in which $F [ y ]$ now depends on a continuous set of variables, namely the values of $y$ at all points x. Requiring that the functional be stationary with respect to small variations in the function $y ( x )$ gives

\int {\frac {\delta E}{\delta y (x)}} \eta (x) \mathrm{d} x = 0.\tag{D.4}

Because this must hold for an arbitrary choice of $\eta ( x )$ , it follows that the functional derivative must vanish. To see this, imagine choosing a perturbation $\eta ( x )$ that is zero everywhere except in the neighbourhood of a point ${ \widehat { x } } ,$ in which case the functional derivative must be zero at $x = { \widehat { x } }$ However, because this must be true for every choice of ${ \widehat { x } } .$ , the functional derivative must vanish for all values of $x .$

Consider a functional that is defined by an integral over a function $G ( y , y ^ { \prime } , x )$ that depends on both $y ( x )$ and its derivative $y ^ { \prime } ( x )$ as well as having a direct dependence on x

F [ y ] = \int G (y (x), y ^ {\prime} (x), x) \mathrm{d} x\tag{D.5}

where the value of $y ( x )$ is assumed to be fixed at the boundary of the region of integration (which might be at infinity). If we now consider variations in the function $y ( x )$ , we obtain

F [ y (x) + \epsilon \eta (x) ] = F [ y (x) ] + \epsilon \int \left\{\frac {\partial G}{\partial y} \eta (x) + \frac {\partial G}{\partial y ^ {\prime}} \eta^ {\prime} (x) \right\} d x + O (\epsilon^ {2}).\tag{D.6}

We now have to cast this in the form (D.3). To do so, we integrate the second term by parts and make use of the fact that $\eta ( x )$ must vanish at the boundary of the integral (because $y ( x )$ is fixed at the boundary). This gives

F [ y (x) + \epsilon \eta (x) ] = F [ y (x) ] + \epsilon \int \left\{\frac {\partial G}{\partial y} - \frac {\mathrm{d}}{\mathrm{d} x} \left(\frac {\partial G}{\partial y ^ {\prime}}\right) \right\} \eta (x) \mathrm{d} x + O (\epsilon^ {2})\tag{D.7}

from which we can read off the functional derivative by comparison with (D.3). Requiring that the functional derivative vanishes then gives

\frac {\partial G}{\partial y} - \frac {\mathrm{d}}{\mathrm{d} x} \left(\frac {\partial G}{\partial y ^ {\prime}}\right) = 0\tag{D.8}

which are known as the Euler-Lagrange equations. For example, if

G = y (x) ^ {2} + \left(y ^ {\prime} (x)\right) ^ {2}\tag{D.9}

then the Euler-Lagrange equations take the form

y (x) - \frac {\mathrm{d} ^ {2} y}{\mathrm{d} x ^ {2}} = 0.\tag{D.10}

This second order differential equation can be solved for $y ( x )$ by making use of the boundary conditions on $y ( x )$

Often, we consider functionals defined by integrals whose integrands take the form $G ( y , x )$ and that do not depend on the derivatives of $y ( x )$ . In this case, stationarity simply requires that $\partial G / \partial y ( x ) = 0$ for all values of $x$ .

If we are optimizing a functional with respect to a probability distribution, then we need to maintain the normalization constraint on the probabilities. This is often most conveniently done using a Lagrange multiplier, which then allows an unconstrained optimization to be performed.

The extension of the above results to a multidimensional variable x is straightforward. For a more comprehensive discussion of the calculus of variations, see Sagan (1969).
