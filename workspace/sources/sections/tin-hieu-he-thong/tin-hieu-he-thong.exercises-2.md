---
id: "tin-hieu-he-thong.exercises-2"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Introduction", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.claude-shannon-1916-2001"
next_id: "tin-hieu-he-thong.2"
block_ids: ["b635", "b636", "b637", "b638", "b639", "b640", "b641", "b642", "b643", "b644", "b645", "b646", "b647", "b648", "b649", "b650", "b651", "b652", "b653", "b654", "b655", "b656", "b657", "b658", "b659", "b660", "b661", "b662", "b663", "b664", "b665", "b666", "b667", "b668", "b669", "b670", "b671", "b672", "b673", "b674", "b675", "b676", "b677", "b678", "b679", "b680", "b681", "b682", "b683", "b684", "b685", "b686", "b687", "b688", "b689", "b690", "b691", "b692", "b693", "b694", "b695", "b696", "b697", "b698", "b699", "b700", "b701", "b702", "b703", "b704", "b705", "b706", "b707", "b708", "b709", "b710", "b711", "b712", "b713", "b714", "b715", "b716", "b717", "b718", "b719", "b720", "b721", "b722", "b723", "b724", "b725", "b726", "b727", "b728", "b729", "b730", "b731", "b732", "b733", "b734", "b735", "b736", "b737", "b738"]
---

## Exercises

1.1 () www Consider the sum-of-squares error function given by (1.2) in which the function $y ( x , \mathbf { w } )$ is given by the polynomial (1.1). Show that the coefficients $\mathbf { w } = \{ w _ { i } \}$ that minimize this error function are given by the solution to the following set of linear equations

\sum_ {j = 0} ^ {M} A _ {i j} w _ {j} = T _ {i}\tag{1.122}

where

A _ {i j} = \sum_ {n = 1} ^ {N} (x _ {n}) ^ {i + j}, \quad T _ {i} = \sum_ {n = 1} ^ {N} (x _ {n}) ^ {i} t _ {n}.\tag{1.123}

Here a suffix i or $j$ denotes the index of a component, whereas $( x ) ^ { i }$ denotes x raised to the power of i.

1.2 () Write down the set of coupled linear equations, analogous to (1.122), satisfied by the coefficients $w _ { i }$ which minimize the regularized sum-of-squares error function given by (1.4).

1.3 ( ) Suppose that we have three coloured boxes r (red), b (blue), and g (green). Box $r$ contains 3 apples, 4 oranges, and 3 limes, box b contains 1 apple, 1 orange, and 0 limes, and box $g$ contains 3 apples, 3 oranges, and 4 limes. If a box is chosen at random with probabilities $p ( r ) = 0 . 2 , p ( b ) = 0 . 2 , p ( g ) = 0 . 6 ,$ , and a piece of fruit is removed from the box (with equal probability of selecting any of the items in the box), then what is the probability of selecting an apple? If we observe that the selected fruit is in fact an orange, what is the probability that it came from the green box?

1.4 ( ) www Consider a probability density $p _ { x } ( x )$ defined over a continuous variable x, and suppose that we make a nonlinear change of variable using $x = g ( y )$ so that the density transforms according to (1.27). By differentiating (1.27), show that the location $\dot { \widehat { y } }$ of the maximum of the density in y is not in general related to the location $\widehat { x }$ of the maximum of the density over x by the simple functional relation ${ \widehat { x } } = g ( { \widehat { y } } )$ as a consequence of the Jacobian factor. This shows that the maximum of a probability density (in contrast to a simple function) is dependent on the choice of variable. Verify that, in the case of a linear transformation, the location of the maximum transforms in the same way as the variable itself.

1.5 () Using the definition (1.38) show that $\operatorname { v a r } [ f ( x ) ]$ satisfies (1.39).

1.6 () Show that if two variables x and $y$ are independent, then their covariance is zero.

1.7 ( ) www In this exercise, we prove the normalization condition (1.48) for the univariate Gaussian. To do this consider, the integral

I = \int_ {- \infty} ^ {\infty} \exp \left(- \frac {1}{2 \sigma^ {2}} x ^ {2}\right) \mathrm{d} x\tag{1.124}

which we can evaluate by first writing its square in the form

I ^ {2} = \int_ {- \infty} ^ {\infty} \int_ {- \infty} ^ {\infty} \exp \left(- \frac {1}{2 \sigma^ {2}} x ^ {2} - \frac {1}{2 \sigma^ {2}} y ^ {2}\right) \mathrm{d} x \mathrm{d} y.\tag{1.125}

Now make the transformation from Cartesian coordinates $( x , y )$ to polar coordinates $( r , \theta )$ and then substitute $u = r ^ { 2 }$ . Show that, by performing the integrals over $\theta$ and $u ,$ and then taking the square root of both sides, we obtain

I = \left(2 \pi \sigma^ {2}\right) ^ {1 / 2}.\tag{1.126}

Finally, use this result to show that the Gaussian distribution $\mathcal { N } ( x | \mu , \sigma ^ { 2 } )$ is normalized.

1.8 ( ) www By using a change of variables, verify that the univariate Gaussian distribution given by (1.46) satisfies (1.49). Next, by differentiating both sides of the normalization condition

\int_ {- \infty} ^ {\infty} \mathcal {N} (x | \mu , \sigma^ {2}) \mathrm{d} x = 1\tag{1.127}

with respect to $\sigma ^ { 2 }$ , verify that the Gaussian satisfies (1.50). Finally, show that (1.51) holds.

1.9 () www Show that the mode (i.e. the maximum) of the Gaussian distribution (1.46) is given by $\mu .$ Similarly, show that the mode of the multivariate Gaussian (1.52) is given by $\mu .$

1.10 () www Suppose that the two variables $x$ and $z$ are statistically independent. Show that the mean and variance of their sum satisfies

\mathbb {E} [ x + z ] = \mathbb {E} [ x ] + \mathbb {E} [ z ]\tag{1.128}

\operatorname{var} [ x + z ] = \operatorname{var} [ x ] + \operatorname{var} [ z ].\tag{1.129}

1.11 () $\boldsymbol { \mathrm { B y } }$ setting the derivatives of the log likelihood function (1.54) with respect to $\mu$ and $\sigma ^ { 2 }$ equal to zero, verify the results (1.55) and (1.56).

1.12 ( ) www Using the results (1.49) and (1.50), show that

\mathbb {E} [ x _ {n} x _ {m} ] = \mu^ {2} + I _ {n m} \sigma^ {2}\tag{1.130}

where $x _ { n }$ and $x _ { m }$ denote data points sampled from a Gaussian distribution with mean $\mu$ and variance $\sigma ^ { 2 }$ , and $I _ { n m }$ satisfies $I _ { n m } = 1$ if $n = m$ and $I _ { n m } = 0$ otherwise. Hence prove the results (1.57) and (1.58).

1.13 () Suppose that the variance of a Gaussian is estimated using the result (1.56) but with the maximum likelihood estimate $\mu _ { \mathrm { M L } }$ replaced with the true value $\mu$ of the mean. Show that this estimator has the property that its expectation is given by the true variance $\sigma ^ { 2 }$

1.14 ( ) Show that an arbitrary square matrix with elements $w _ { i j }$ can be written in the form $w _ { i j } = w _ { i j } ^ { \mathrm { S } } + w _ { i j } ^ { \mathrm { A } }$ where $w _ { i j } ^ { \mathrm { S } }$ and $w _ { i j } ^ { \mathrm { A } }$ are symmetric and anti-symmetric matrices, respectively, satisfying $w _ { i j } ^ { \mathrm { S } } = w _ { j i } ^ { \mathrm { S } }$ and $w _ { i j } ^ { \mathrm { A } } = - w _ { j i } ^ { \mathrm { A } }$ for all i and $j .$ . Now consider the second order term in a higher order polynomial in D dimensions, given by

\sum_ {i = 1} ^ {D} \sum_ {j = 1} ^ {D} w _ {i j} x _ {i} x _ {j}.\tag{1.131}

Show that

\sum_ {i = 1} ^ {D} \sum_ {j = 1} ^ {D} w _ {i j} x _ {i} x _ {j} = \sum_ {i = 1} ^ {D} \sum_ {j = 1} ^ {D} w _ {i j} ^ {\mathrm{S}} x _ {i} x _ {j}\tag{1.132}

so that the contribution from the anti-symmetric matrix vanishes. We therefore see that, without loss of generality, the matrix of coefficients $w _ { i j }$ can be chosen to be symmetric, and so not all of the $D ^ { 2 }$ elements of this matrix can be chosen independently. Show that the number of independent parameters in the matrix $w _ { i j } ^ { \mathrm { S } }$ is given by $D ( D + 1 ) / 2$

1.15 (  ) www In this exercise and the next, we explore how the number of independent parameters in a polynomial grows with the order M of the polynomial and with the dimensionality D of the input space. We start by writing down the $M ^ { \mathrm { t h } }$ order term for a polynomial in D dimensions in the form

\sum_ {i _ {1} = 1} ^ {D} \sum_ {i _ {2} = 1} ^ {D} \dots \sum_ {i _ {M} = 1} ^ {D} w _ {i _ {1} i _ {2} \dots i _ {M}} x _ {i _ {1}} x _ {i _ {2}} \dots x _ {i _ {M}}.\tag{1.133}

The coefficients $w _ { i _ { 1 } i _ { 2 } \cdots i _ { M } }$ comprise $D ^ { M }$ elements, but the number of independent parameters is significantly fewer due to the many interchange symmetries of the factor $x _ { i _ { 1 } } x _ { i _ { 2 } } \cdots x _ { i _ { M } }$ . Begin by showing that the redundancy in the coefficients can be removed by rewriting this $\dot { M } ^ { \mathrm { t h } }$ order term in the form

\sum_ {i _ {1} = 1} ^ {D} \sum_ {i _ {2} = 1} ^ {i _ {1}} \dots \sum_ {i _ {M} = 1} ^ {i _ {M - 1}} \widetilde {w} _ {i _ {1} i _ {2} \ldots i _ {M}} x _ {i _ {1}} x _ {i _ {2}} \dots x _ {i _ {M}}.\tag{1.134}

Note that the precise relationship between the $\widetilde { w }$ coefficients and w coefficients need not be made explicit. Use this result to show that the number of independent parameters $n ( D , M )$ , which appear at order $M ,$ , satisfies the following recursion relation

n (D, M) = \sum_ {i = 1} ^ {D} n (i, M - 1).\tag{1.135}

Next use proof by induction to show that the following result holds

\sum_ {i = 1} ^ {D} \frac {(i + M - 2) !}{(i - 1) ! (M - 1) !} = \frac {(D + M - 1) !}{(D - 1) ! M !}\tag{1.136}

which can be done by first proving the result for $D = 1$ and arbitrary M by making use of the result $0 ! = 1$ , then assuming it is correct for dimension D and verifying that it is correct for dimension $D + 1$ . Finally, use the two previous results, together with proof by induction, to show

n (D, M) = \frac {(D + M - 1) !}{(D - 1) ! M !}.\tag{1.137}

To do this, first show that the result is true for $M = 2$ , and any value of $D \geqslant 1$ by comparison with the result of Exercise 1.14. Then make use of (1.135), together with (1.136), to show that, if the result holds at order $M - 1$ , then it will also hold at order M

1.16 (  ) In Exercise 1.15, we proved the result (1.135) for the number of independent parameters in the $M ^ { \mathrm { t h } }$ order term of a D-dimensional polynomial. We now find an expression for the total number $N ( D , M )$ of independent parameters in all of the terms up to and including the M6th order. First show that $\bar { N } ( D , M )$ satisfies

N (D, M) = \sum_ {m = 0} ^ {M} n (D, m)\tag{1.138}

where $n ( D , m )$ is the number of independent parameters in the term of order m. Now make use of the result (1.137), together with proof by induction, to show that

N (d, M) = \frac {(D + M) !}{D !   M !}.\tag{1.139}

This can be done by first proving that the result holds for $M \ : = \ : 0$ and arbitrary $D \geqslant 1$ , then assuming that it holds at order $M .$ , and hence showing that it holds at order $M + 1$ . Finally, make use of Stirling’s approximation in the form

n! \simeq n ^ {n} e ^ {- n}\tag{1.140}

for large n to show that, for $D \gg M$ , the quantity $N ( D , M )$ grows like $D ^ { M }$ and for $M \gg D$ it grows like $M ^ { D }$ . Consider a cubic $( M = 3 )$ polynomial in D dimensions, and evaluate numerically the total number of independent parameters for (i) $D ~ = ~ 1 0$ and (ii) $D ~ = ~ 1 0 0$ , which correspond to typical small-scale and medium-scale machine learning applications.

1.17 ( ) www The gamma function is defined by

\Gamma (x) \equiv \int_ {0} ^ {\infty} u ^ {x - 1} e ^ {- u} \mathrm{d} u.\tag{1.141}

Using integration by parts, prove the relation $\Gamma ( x + 1 ) = x \Gamma ( x )$ . Show also that $\Gamma ( 1 ) = 1$ and hence that $\Gamma ( x + 1 ) =$ x! when x is an integer.

1.18 ( ) www We can use the result (1.126) to derive an expression for the surface area $S _ { D }$ , and the volume $V _ { D }$ , of a sphere of unit radius in $D$ dimensions. To do this, consider the following result, which is obtained by transforming from Cartesian to polar coordinates

\prod_ {i = 1} ^ {D} \int_ {- \infty} ^ {\infty} e ^ {- x _ {i} ^ {2}} \mathrm{d} x _ {i} = S _ {D} \int_ {0} ^ {\infty} e ^ {- r ^ {2}} r ^ {D - 1} \mathrm{d} r.\tag{1.142}

Using the definition (1.141) of the Gamma function, together with (1.126), evaluate both sides of this equation, and hence show that

S _ {D} = \frac {2 \pi^ {D / 2}}{\Gamma (D / 2)}.\tag{1.143}

Next, by integrating with respect to radius from 0 to 1, show that the volume of the unit sphere in $D$ dimensions is given by

V _ {D} = \frac {S _ {D}}{D}.\tag{1.144}

Finally, use the results $\Gamma ( 1 ) = 1$ and $\Gamma ( 3 / 2 ) = \sqrt { \pi } / 2$ to show that (1.143) and (1.144) reduce to the usual expressions for $D = 2$ and $D = 3$

1.19 ( ) Consider a sphere of radius a in D-dimensions together with the concentric hypercube of side $2 a .$ , so that the sphere touches the hypercube at the centres of each of its sides. By using the results of Exercise 1.18, show that the ratio of the volume of the sphere to the volume of the cube is given by

\frac {\text { volume   of   sphere }}{\text { volume   of   cube }} = \frac {\pi^ {D / 2}}{D 2 ^ {D - 1} \Gamma (D / 2)}.\tag{1.145}

Now make use of Stirling’s formula in the form

\Gamma (x + 1) \simeq (2 \pi) ^ {1 / 2} e ^ {- x} x ^ {x + 1 / 2}\tag{1.146}

which is valid for $x \gg 1$ , to show that, as $D \to \infty$ , the ratio (1.145) goes to zero. Show also that the ratio of the distance from the centre of the hypercube to one of the corners, divided by the perpendicular distance to one of the sides, is $\sqrt { D }$ , which therefore goes to $\infty$ as $D \to \infty$ . From these results we see that, in a space of high dimensionality, most of the volume of a cube is concentrated in the large number of corners, which themselves become very long ‘spikes’!

( ) www In this exercise, we explore the behaviour of the Gaussian distribution in high-dimensional spaces. Consider a Gaussian distribution in D dimensions given by

p (\mathbf {x}) = \frac {1}{(2 \pi \sigma^ {2}) ^ {D / 2}} \exp \left(- \frac {\| \mathbf {x} \| ^ {2}}{2 \sigma^ {2}}\right).\tag{1.147}

We wish to find the density with respect to radius in polar coordinates in which the direction variables have been integrated out. To do this, show that the integral of the probability density over a thin shell of radius $r$ and thickness $\epsilon ,$ where $\epsilon \ll 1$ , is given by $p ( r ) \epsilon$ where

p (r) = \frac {S _ {D} r ^ {D - 1}}{(2 \pi \sigma^ {2}) ^ {D / 2}} \exp \left(- \frac {r ^ {2}}{2 \sigma^ {2}}\right)\tag{1.148}

where $S _ { D }$ is the surface area of a unit sphere in $D$ dimensions. Show that the function $p ( r )$ has a single stationary point located, for large $D _ { : }$ , at $\widehat { r } \simeq \sqrt { D } \sigma$ . By considering $p ( \widehat { r } + \epsilon )$ where $\epsilon \ll { \widehat { r } } ,$ show that for large $D _ { \mathbf { \delta } }$

p (\widehat {r} + \epsilon) = p (\widehat {r}) \exp \left(- \frac {3 \epsilon^ {2}}{2 \sigma^ {2}}\right)\tag{1.149}

which shows that $\widehat { r }$ is a maximum of the radial probability density and also that $p ( r )$ decays exponentially away from its maximum at $\widehat { r }$ with length scale $\sigma .$ We have already seen that $\sigma \ll \widehat { r }$ for large D, and so we see that most of the probability mass is concentrated in a thin shell at large radius. Finally, show that the probability density $p ( \mathbf { x } )$ is larger at the origin than at the radius $\widehat { r }$ by a factor of $\exp ( D / 2 )$ . We therefore see that most of the probability mass in a high-dimensional Gaussian distribution is located at a different radius from the region of high probability density. This property of distributions in spaces of high dimensionality will have important consequences when we consider Bayesian inference of model parameters in later chapters.

1.21 ( ) Consider two nonnegative numbers a and b, and show that, if $a \leqslant b ,$ , then $a \leqslant ( a b ) ^ { 1 / 2 }$ . Use this result to show that, if the decision regions of a two-class classification problem are chosen to minimize the probability of misclassification, this probability will satisfy

p (\text { mistake }) \leqslant \int \left\{p (\mathbf {x}, \mathcal {C} _ {1}) p (\mathbf {x}, \mathcal {C} _ {2}) \right\} ^ {1 / 2} \mathrm{d} \mathbf {x}.\tag{1.150}

1.22 () www Given a loss matrix with elements $L _ { k j }$ , the expected risk is minimized if, for each x, we choose the class that minimizes (1.81). Verify that, when the loss matrix is given by $L _ { k j } = 1 - I _ { k j }$ , where $I _ { k j }$ are the elements of the identity matrix, this reduces to the criterion of choosing the class having the largest posterior probability. What is the interpretation of this form of loss matrix?

1.23 () Derive the criterion for minimizing the expected loss when there is a general loss matrix and general prior probabilities for the classes.

1.24 ( ) www Consider a classification problem in which the loss incurred when an input vector from class $\mathcal { C } _ { k }$ is classified as belonging to class $\mathcal { C } _ { j }$ is given by the loss matrix $L _ { k j }$ , and for which the loss incurred in selecting the reject option is λ. Find the decision criterion that will give the minimum expected loss. Verify that this reduces to the reject criterion discussed in Section 1.5.3 when the loss matrix is given by $L _ { k j } = 1 - I _ { k j }$ . What is the relationship between λ and the rejection threshold $\theta ?$

1.25 () www Consider the generalization of the squared loss function (1.87) for a single target variable t to the case of multiple target variables described by the vector t given by

\mathbb {E} [ L (\mathbf {t}, \mathbf {y} (\mathbf {x})) ] = \iint \| \mathbf {y} (\mathbf {x}) - \mathbf {t} \| ^ {2} p (\mathbf {x}, \mathbf {t}) d \mathbf {x} d \mathbf {t}.\tag{1.151}

Using the calculus of variations, show that the function $\mathbf { y } ( \mathbf { x } )$ for which this expected loss is minimized is given by $\mathbf { y } ( \mathbf { x } ) = \mathbb { E } _ { \mathbf { t } } [ \mathbf { t } | \mathbf { x } ]$ . Show that this result reduces to (1.89) for the case of a single target variable t.

1.26 () By expansion of the square in (1.151), derive a result analogous to (1.90) and hence show that the function $\mathbf { y } ( \mathbf { x } )$ that minimizes the expected squared loss for the case of a vector t of target variables is again given by the conditional expectation of t.

1.27 ( ) www Consider the expected loss for regression problems under the $L _ { q }$ loss function given by (1.91). Write down the condition that $y ( \mathbf x )$ must satisfy in order to minimize $\mathbb { E } [ L _ { q } ]$ . Show that, for $q = 1$ , this solution represents the conditional median, i.e., the function $y ( \mathbf x )$ such that the probability mass for $t < y ( \mathbf { x } )$ is the same as for $t \geqslant y ( \mathbf { x } )$ . Also show that the minimum expected $L _ { q }$ loss for $q \to 0$ is given by the conditional mode, i.e., by the function $y ( \mathbf x )$ equal to the value of t that maximizes $p ( t | \mathbf { x } )$ for each x.

1.28 () In Section 1.6, we introduced the idea of entropy $h ( x )$ as the information gained on observing the value of a random variable x having distribution $p ( x )$ . We saw that, for independent variables x and y for which $p ( x , y ) = p ( x ) p ( y )$ , the entropy functions are additive, so that $h ( x , y ) = h ( x ) + h ( y )$ . In this exercise, we derive the relation between $h$ and $p$ in the form of a function $h ( p )$ . First show that $h ( p ^ { 2 } ) =$ $2 h ( p )$ , and hence by induction that $h ( p ^ { n } ) = n h ( p )$ where n is a positive integer. Hence show that ${ \dot { h ( p ^ { n / m } ) } } = ( n / m ) { \ddot { h ( p ) } }$ where m is also a positive integer. This implies that $h ( p ^ { x } ) = x h ( p )$ where x is a positive rational number, and hence by continuity when it is a positive real number. Finally, show that this implies $h ( p )$ must take the form $h ( p ) \propto$ ln $p .$

1.29 () www Consider an M-state discrete random variable x, and use Jensen’s inequality in the form (1.115) to show that the entropy of its distribution $p ( x )$ satisfies $\mathrm { H } \bar { \vert x \vert } \leqslant$ ln M.

1.30 ( ) Evaluate the Kullback-Leibler divergence (1.113) between two Gaussians $p ( x ) = \mathcal { N } ( x | \mu , \sigma ^ { 2 } )$ and $q ( x ) = \mathcal { N } ( x | m , s ^ { 2 } )$

Table 1.3 The joint distribution $p ( x , y )$ for two binary variables x and y used in Exercise 1.39.

x \begin{array}{c c c} & y \\ & 0 & 1 \\ \hline 0 & 1 / 3 & 1 / 3 \\ 1 & 0 & 1 / 3 \end{array}

1.31 ( ) www Consider two variables x and y having joint distribution $p ( \mathbf x , \mathbf y )$ . Show that the differential entropy of this pair of variables satisfies

\mathrm{H} [ \mathbf {x}, \mathbf {y} ] \leqslant \mathrm{H} [ \mathbf {x} ] + \mathrm{H} [ \mathbf {y} ]\tag{1.152}

with equality if, and only $\operatorname { i f } , \mathbf { x }$ and y are statistically independent.

1.32 () Consider a vector x of continuous variables with distribution $p ( \mathbf { x } )$ and corresponding entropy $\mathrm { H } [ \mathbf { x } ]$ . Suppose that we make a nonsingular linear transformation of x to obtain a new variable $\mathbf { y } = \mathbf { A x }$ . Show that the corresponding entropy is given by $\mathrm { H } [ \mathbf { y } ] = \mathrm { H } [ \mathbf { x } ] + \ln { | \mathbf { A } | }$ where $| \mathbf { A } |$ denotes the determinant of A.

1.33 ( ) Suppose that the conditional entropy $\mathrm { H } [ y | x ]$ between two discrete random variables x and y is zero. Show that, for all values of x such that $p ( x ) > 0$ , the variable y must be a function of $x ,$ in other words for each x there is only one value of y such that $p ( y | x ) \neq 0$

1.34 ( ) www Use the calculus of variations to show that the stationary point of the functional (1.108) is given by (1.108). Then use the constraints (1.105), (1.106), and (1.107) to eliminate the Lagrange multipliers and hence show that the maximum entropy solution is given by the Gaussian (1.109).

1.35 () www Use the results (1.106) and (1.107) to show that the entropy of the univariate Gaussian (1.109) is given by (1.110).

1.36 () A strictly convex function is defined as one for which every chord lies above the function. Show that this is equivalent to the condition that the second derivative of the function be positive.

1.37 () Using the definition (1.111) together with the product rule of probability, prove the result (1.112).

1.38 ( ) www Using proof by induction, show that the inequality (1.114) for convex functions implies the result (1.115).

1.39 (  ) Consider two binary variables x and y having the joint distribution given in Table 1.3. Evaluate the following quantities (a) $\begin{array} { l } { \mathrm { H } [ x ] } \\ { \mathrm { H } [ y ] } \end{array}$ (c) $\begin{array} { r } { \mathrm { H } [ y | x ] } \\ { \mathrm { H } [ x | y ] } \end{array}$ (e) $\mathrm { H } [ x , y ]$ (b) (d) (f) $[ [ x , y ] .$

Draw a diagram to show the relationship between these various quantities.

1.40 () By applying Jensen’s inequality (1.115) with $f ( x ) =$ ln x, show that the arith metic mean of a set of real numbers is never less than their geometrical mean.

1.41 () www Using the sum and product rules of probability, show that the mutual information $I ( \mathbf { x } , \mathbf { y } )$ satisfies the relation (1.121).
