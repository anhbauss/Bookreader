---
id: "tin-hieu-he-thong.1-2-1-probability-densities"
doc_id: "tin-hieu-he-thong"
title: "1.2.1 Probability densities"
level: 2
heading_path: ["Introduction", "1.2.1 Probability densities"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-2-probability-theory"
next_id: "tin-hieu-he-thong.1-2-2-expectations-and-covariances"
block_ids: ["b228", "b229", "b230", "b231", "b232", "b233", "b234", "b235", "b236", "b237", "b238", "b239", "b240", "b241", "b242", "b243", "b244", "b245", "b246", "b247", "b248", "b249", "b250"]
---

## 1.2.1 Probability densities

As well as considering probabilities defined over discrete sets of events, we also wish to consider probabilities with respect to continuous variables. We shall limit ourselves to a relatively informal discussion. If the probability of a real-valued variable x falling in the interval $( x , x + \delta x )$ is given by $p ( x ) \delta x$ for $\delta x  0$ , then $p ( x )$ is called the probability density over x. This is illustrated in Figure 1.12. The probability that x will lie in an interval $( a , b )$ is then given by

p (x \in (a, b)) = \int_ {a} ^ {b} p (x) \mathrm{d} x.\tag{1.24}

The concept of probability for discrete variables can be extended to that of a probability density $p ( x )$ over a continuous variable x and is such that the probability of x lying in the interval $( x , x + \delta x )$ is given by $p ( x ) \delta x$ for $\dot { \delta x } \  \ \dot { 0 } .$ The probability density can be expressed as the derivative of a cumulative distribution function $P ( x )$ .

![image](images/part-001--ed4ed1550cd182ee335742a5f3c064675af832bffbfc72a53ae8a6b13780104c.jpg)

Because probabilities are nonnegative, and because the value of x must lie somewhere on the real axis, the probability density $p ( x )$ must satisfy the two conditions

p (x) \geqslant 0\tag{1.25}

\int_ {- \infty} ^ {\infty} p (x) \mathrm{d} x = 1.\tag{1.26}

Under a nonlinear change of variable, a probability density transforms differently from a simple function, due to the Jacobian factor. For instance, if we consider a change of variables $x = g ( y )$ , then a function $f ( x )$ becomes ${ \bf \bar { \boldsymbol { f } } } ( \boldsymbol { y } ) = f ( \boldsymbol { g } ( \boldsymbol { y } ) )$ Now consider a probability density $p _ { x } ( x )$ that corresponds to a density $p _ { y } ( y )$ with respect to the new variable y, where the suffices denote the fact that $p _ { x } ( x )$ and $p _ { y } ( y )$ are different densities. Observations falling in the range $( x , x + \delta x )$ will, for small values of $\delta x$ , be transformed into the range $( y , y + \delta y )$ where $p _ { x } ( x ) \delta x \simeq p _ { y } ( y ) \delta y$ and hence

\begin{array}{r c l} p _ {y} (y) & = & p _ {x} (x) \left| \frac {\mathrm{d} x}{\mathrm{d} y} \right| \\ & = & p _ {x} (g (y))   | g ^ {\prime} (y) |  . \end{array}\tag{1.27}

One consequence of this property is that the concept of the maximum of a probability density is dependent on the choice of variable.

The probability that x lies in the interval $( - \infty , z )$ is given by the cumulative distribution function defined by

P (z) = \int_ {- \infty} ^ {z} p (x) \mathrm{d} x\tag{1.28}

which satisfies $P ^ { \prime } ( x ) = p ( x )$ , as shown in Figure 1.12.

If we have several continuous variables $x _ { 1 } , \ldots , x _ { D }$ , denoted collectively by the vector x, then we can define a joint probability density $p ( \mathbf { x } ) = p ( x _ { 1 } , . . . , x _ { D } )$ such that the probability of x falling in an infinitesimal volume δx containing the point x is given by $p ( \mathbf { x } ) \delta \mathbf { x }$ . This multivariate probability density must satisfy

p (\mathbf {x}) \geqslant 0\tag{1.29}

\int p (\mathbf {x}) \mathrm{d} \mathbf {x} = 1\tag{1.30}

in which the integral is taken over the whole of x space. We can also consider joint probability distributions over a combination of discrete and continuous variables.

Note that if x is a discrete variable, then $p ( x )$ is sometimes called a probability massfunction because it can be regarded as a set of ‘probability masses’ concentrated at the allowed values of x.

The sum and product rules of probability, as well as Bayes’ theorem, apply equally to the case of probability densities, or to combinations of discrete and continuous variables. For instance, if x and y are two real variables, then the sum and product rules take the form

p (x) = \int p (x, y) \mathrm{d} y\tag{1.31}

p (x, y) = p (y | x) p (x).\tag{1.32}

A formal justification of the sum and product rules for continuous variables (Feller, 1966) requires a branch of mathematics called measure theory and lies outside the scope of this book. Its validity can be seen informally, however, by dividing each real variable into intervals of width $\Delta$ and considering the discrete probability distribution over these intervals. Taking the limit $\Delta \to 0$ then turns sums into integrals and gives the desired result.
