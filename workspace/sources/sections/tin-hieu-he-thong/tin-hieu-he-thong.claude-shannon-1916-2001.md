---
id: "tin-hieu-he-thong.claude-shannon-1916-2001"
doc_id: "tin-hieu-he-thong"
title: "Claude Shannon 1916\u20132001"
level: 2
heading_path: ["Introduction", "Claude Shannon 1916\u20132001"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-6-1-relative-entropy-and-mutual-information"
next_id: "tin-hieu-he-thong.exercises-2"
block_ids: ["b608", "b609", "b610", "b611", "b612", "b613", "b614", "b615", "b616", "b617", "b618", "b619", "b620", "b621", "b622", "b623", "b624", "b625", "b626", "b627", "b628", "b629", "b630", "b631", "b632", "b633", "b634"]
---

## Claude Shannon 1916–2001

After graduating from Michigan and MIT, Shannon joined the AT&T Bell Telephone laboratories in 1941. His paper ‘A Mathematical Theory of Communication’ published in the Bell System Technical Journal in

1948 laid the foundations for modern information theory. This paper introduced the word ‘bit’, and his concept that information could be sent as a stream of 1s and 0s paved the way for the communications revolution. It is said that von Neumann recommended to Shannon that he use the term entropy, not only because of its similarity to the quantity used in physics, but also because “nobody knows what entropy really is, so in any discussion you will always have an advantage”.

Figure 1.31 A convex function $f ( x )$ is one for which every chord (shown in blue) lies on or above the function (shown in red).

![image](images/part-001--f7b3cc28083dd963e74a527a92ba21998cc66ad95919c500b6db743fc4bd2ae7.jpg)

and the corresponding value of the function is $f \left( \lambda a + ( 1 - \lambda ) b \right)$ . Convexity then implies

f (\lambda a + (1 - \lambda) b) \leqslant \lambda f (a) + (1 - \lambda) f (b).\tag{1.114}

This is equivalent to the requirement that the second derivative of the function be everywhere positive. Examples of convex functions are x ln x (for $x > 0 )$ and $x ^ { 2 }$ . A function is called strictly convex if the equality is satisfied only for $\lambda = 0$ and $\lambda = 1$ If a function has the opposite property, namely that every chord lies on or below the function, it is called concave, with a corresponding definition for strictly concave. If a function $f ( x )$ is convex, then $- f ( x )$ will be concave.

Using the technique of proof by induction, we can show from (1.114) that a convex function $f ( x )$ satisfies

f \left(\sum_ {i = 1} ^ {M} \lambda_ {i} x _ {i}\right) \leqslant \sum_ {i = 1} ^ {M} \lambda_ {i} f (x _ {i})\tag{1.115}

where $\lambda _ { i } ~ \geqslant ~ 0$ and $\textstyle \sum _ { i } \lambda _ { i } = 1$ , for any set of points $\{ x _ { i } \}$ . The result (1.115) is known as Jensen’s inequality. If we interpret the $\lambda _ { i }$ as the probability distribution over a discrete variable x taking the values $\{ x _ { i } \}$ , then (1.115) can be written

f \left(\mathbb {E} [ x ]\right) \leqslant \mathbb {E} [ f (x) ]\tag{1.116}

where $\mathbb { E } [ \cdot ]$ denotes the expectation. For continuous variables, Jensen’s inequality takes the form

f \left(\int \mathbf {x} p (\mathbf {x}) \mathrm{d} \mathbf {x}\right) \leqslant \int f (\mathbf {x}) p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{1.117}

We can apply Jensen’s inequality in the form (1.117) to the Kullback-Leibler divergence (1.113) to give

\mathrm{KL} (p \| q) = - \int p (\mathbf {x}) \ln \left\{\frac {q (\mathbf {x})}{p (\mathbf {x})} \right\} \mathrm{d} \mathbf {x} \geqslant - \ln \int q (\mathbf {x}) \mathrm{d} \mathbf {x} = 0\tag{1.118}

where we have used the fact that ln x is a convex function, together with the normalization condition $\begin{array} { r } { \int q ( \mathbf { x } ) \mathrm { d } \mathbf { x } = 1 } \end{array}$ . In fact,  ln x is a strictly convex function, so the equality will hold if, and only if, $q ( \mathbf { x } ) = p ( \mathbf { x } )$ for all $\mathbf { x } .$ Thus we can interpret the Kullback-Leibler divergence as a measure of the dissimilarity of the two distributions $p ( \mathbf { x } )$ and $q ( \mathbf { x } )$

We see that there is an intimate relationship between data compression and density estimation (i.e., the problem of modelling an unknown probability distribution) because the most efficient compression is achieved when we know the true distribution. If we use a distribution that is different from the true one, then we must necessarily have a less efficient coding, and on average the additional information that must be transmitted is (at least) equal to the Kullback-Leibler divergence between the two distributions.

Suppose that data is being generated from an unknown distribution $p ( \mathbf { x } )$ that we wish to model. We can try to approximate this distribution using some parametric distribution $q ( \mathbf { x } | \mathbf { \theta } )$ , governed by a set of adjustable parameters $\theta ,$ for example a multivariate Gaussian. One way to determine $\pmb \theta$ is to minimize the Kullback-Leibler divergence between $p ( \mathbf { x } )$ and $q ( \mathbf { x } | \mathbf { \theta } )$ with respect to $\theta .$ We cannot do this directly because we don’t know $p ( \mathbf { x } )$ . Suppose, however, that we have observed a finite set of training points $\mathbf { x } _ { n } .$ , for $n = 1 , \ldots , N$ , drawn from $p ( \mathbf { x } )$ . Then the expectation with respect to $p ( \mathbf { x } )$ can be approximated by a finite sum over these points, using (1.35), so that

\mathrm{KL} (p \| q) \simeq \sum_ {n = 1} ^ {N} \left\{- \ln q (\mathbf {x} _ {n} | \boldsymbol {\theta}) + \ln p (\mathbf {x} _ {n}) \right\}.\tag{1.119}

The second term on the right-hand side of (1.119) is independent of $\theta _ { ; }$ , and the first term is the negative log likelihood function for θ under the distribution $q ( \mathbf { x } | \mathbf { \theta } )$ evaluated using the training set. Thus we see that minimizing this Kullback-Leibler divergence is equivalent to maximizing the likelihood function.

Now consider the joint distribution between two sets of variables x and y given by $p ( \mathbf x , \mathbf y )$ . If the sets of variables are independent, then their joint distribution will factorize into the product of their marginals $p ( \mathbf { x } , \mathbf { y } ) = p ( \mathbf { x } ) p ( \mathbf { y } )$ . If the variables are not independent, we can gain some idea of whether they are ‘close’ to being independent by considering the Kullback-Leibler divergence between the joint distribution and the product of the marginals, given by

\begin{array}{r c l} \mathrm{I} [ \mathbf {x}, \mathbf {y} ] & \equiv & \mathrm{KL} (p (\mathbf {x}, \mathbf {y}) \| p (\mathbf {x}) p (\mathbf {y})) \\ & = & - \iint p (\mathbf {x}, \mathbf {y}) \ln \left(\frac {p (\mathbf {x}) p (\mathbf {y})}{p (\mathbf {x} , \mathbf {y})}\right) \mathrm{d} \mathbf {x} \mathrm{d} \mathbf {y} \end{array}\tag{1.120}

which is called the mutual information between the variables x and $\mathbf { y }$ . From the properties of the Kullback-Leibler divergence, we see that $I ( \mathbf { x } , \mathbf { y } ) \geqslant 0$ with equality if, and only if, x and $\mathbf { y }$ are independent. Using the sum and product rules of probability, we see that the mutual information is related to the conditional entropy through

Exercise 1.41

\operatorname{I} [ \mathbf {x}, \mathbf {y} ] = \operatorname{H} [ \mathbf {x} ] - \operatorname{H} [ \mathbf {x} | \mathbf {y} ] = \operatorname{H} [ \mathbf {y} ] - \operatorname{H} [ \mathbf {y} | \mathbf {x} ].\tag{1.121}

Thus we can view the mutual information as the reduction in the uncertainty about x by virtue of being told the value of y (or vice versa). From a Bayesian perspective, we can view $p ( \mathbf { x } )$ as the prior distribution for x and $p ( \mathbf { x } | \mathbf { y } )$ as the posterior distribution after we have observed new data y. The mutual information therefore represents the reduction in uncertainty about x as a consequence of the new observation $\mathbf { y }$ .
