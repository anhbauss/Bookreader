---
id: "tin-hieu-he-thong.1-2-2-expectations-and-covariances"
doc_id: "tin-hieu-he-thong"
title: "1.2.2 Expectations and covariances"
level: 2
heading_path: ["Introduction", "1.2.2 Expectations and covariances"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-2-1-probability-densities"
next_id: "tin-hieu-he-thong.1-2-3-bayesian-probabilities"
block_ids: ["b251", "b252", "b253", "b254", "b255", "b256", "b257", "b258", "b259", "b260", "b261", "b262", "b263", "b264", "b265", "b266", "b267", "b268", "b269", "b270", "b271", "b272", "b273", "b274", "b275", "b276", "b277"]
---

## 1.2.2 Expectations and covariances

One of the most important operations involving probabilities is that of finding weighted averages of functions. The average value of some function $f ( x )$ under a probability distribution $p ( x )$ is called the expectation of $f ( x )$ and will be denoted by $\mathbb { E } [ f ]$ . For a discrete distribution, it is given by

\mathbb {E} [ f ] = \sum_ {x} p (x) f (x)\tag{1.33}

so that the average is weighted by the relative probabilities of the different values of x. In the case of continuous variables, expectations are expressed in terms of an integration with respect to the corresponding probability density

\mathbb {E} [ f ] = \int p (x) f (x) \mathrm{d} x.\tag{1.34}

In either case, if we are given a finite number N of points drawn from the probability distribution or probability density, then the expectation can be approximated as a

finite sum over these points

\mathbb {E} [ f ] \simeq \frac {1}{N} \sum_ {n = 1} ^ {N} f (x _ {n}).\tag{1.35}

We shall make extensive use of this result when we discuss sampling methods in Chapter 11. The approximation in (1.35) becomes exact in the limit $N \to \infty$

Sometimes we will be considering expectations of functions of several variables, in which case we can use a subscript to indicate which variable is being averaged over, so that for instance

\mathbb {E} _ {x} [ f (x, y) ]\tag{1.36}

denotes the average of the function $f ( x , y )$ with respect to the distribution of x. Note that $\mathbb { E } _ { x } [ f ( x , y ) ]$ will be a function of $y .$

We can also consider a conditional expectation with respect to a conditional distribution, so that

\mathbb {E} _ {x} [ f | y ] = \sum_ {x} p (x | y) f (x)\tag{1.37}

with an analogous definition for continuous variables.

The variance of $f ( x )$ is defined by

\operatorname{var} [ f ] = \mathbb {E} \left[ (f (x) - \mathbb {E} [ f (x) ]) ^ {2} \right]\tag{1.38}

and provides a measure of how much variability there is in $f ( x )$ around its mean value $\mathbb { E } [ f ( x ) ]$ ]. Expanding out the square, we see that the variance can also be written in terms of the expectations of $f ( x )$ and $f ( x ) ^ { 2 }$

\operatorname{var} [ f ] = \mathbb {E} [ f (x) ^ {2} ] - \mathbb {E} [ f (x) ] ^ {2}.\tag{1.39}

In particular, we can consider the variance of the variable x itself, which is given by

\operatorname{var} [ x ] = \mathbb {E} [ x ^ {2} ] - \mathbb {E} [ x ] ^ {2}.\tag{1.40}

For two random variables x and $y .$ , the covariance is defined by

\begin{array}{r c l} \operatorname{cov} [ x, y ] & = & \mathbb {E} _ {x, y} \left[ \left\{x - \mathbb {E} [ x ] \right\} \left\{y - \mathbb {E} [ y ] \right\} \right] \\ & = & \mathbb {E} _ {x, y} [ x y ] - \mathbb {E} [ x ] \mathbb {E} [ y ] \end{array}\tag{1.41}

which expresses the extent to which x and y vary together. If x and y are independent, then their covariance vanishes.

In the case of two vectors of random variables x and ${ \bf y } ,$ , the covariance is a matrix

\begin{array}{r c l} \operatorname{cov} [ \mathbf {x}, \mathbf {y} ] & = & \mathbb {E} _ {\mathbf {x}, \mathbf {y}} \left[ \{\mathbf {x} - \mathbb {E} [ \mathbf {x} ] \} \{\mathbf {y} ^ {\mathrm{T}} - \mathbb {E} [ \mathbf {y} ^ {\mathrm{T}} ] \} \right] \\ & = & \mathbb {E} _ {\mathbf {x}, \mathbf {y}} [ \mathbf {x y} ^ {\mathrm{T}} ] - \mathbb {E} [ \mathbf {x} ] \mathbb {E} [ \mathbf {y} ^ {\mathrm{T}} ]. \end{array}\tag{1.42}

If we consider the covariance of the components of a vector x with each other, then we use a slightly simpler notation cov $[ \mathbf { x } ] \equiv \operatorname { c o v } [ \mathbf { x } , \mathbf { x } ]$
