---
id: "tin-hieu-he-thong.2-2-multinomial-variables"
doc_id: "tin-hieu-he-thong"
title: "2.2. Multinomial Variables"
level: 2
heading_path: ["Probability Distributions", "2.2. Multinomial Variables"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-1-1-the-beta-distribution"
next_id: "tin-hieu-he-thong.2-2-1-the-dirichlet-distribution"
block_ids: ["b820", "b821", "b822", "b823", "b824", "b825", "b826", "b827", "b828", "b829", "b830", "b831", "b832", "b833", "b834", "b835", "b836", "b837", "b838", "b839", "b840", "b841", "b842", "b843", "b844", "b845", "b846", "b847"]
---

## 2.2. Multinomial Variables

Binary variables can be used to describe quantities that can take one of two possible values. Often, however, we encounter discrete variables that can take on one of K possible mutually exclusive states. Although there are various alternative ways to express such variables, we shall see shortly that a particularly convenient representation is the 1-of-K scheme in which the variable is represented by a K-dimensional vector x in which one of the elements $x _ { k }$ equals 1, and all remaining elements equal

1. So, for instance if we have a variable that can take $K = 6$ states and a particular observation of the variable happens to correspond to the state where $x _ { 3 } = 1$ , then x will be represented by

\mathbf {x} = (0, 0, 1, 0, 0, 0) ^ {\mathrm{T}}.\tag{2.25}

Note that such vectors satisfy $\textstyle \sum _ { k = 1 } ^ { K } x _ { k } = 1$ . If we denote the probability of $x _ { k } = 1$ by the parameter $\mu _ { k }$ , then the distribution of x is given

p (\mathbf {x} | \boldsymbol {\mu}) = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {x _ {k}}\tag{2.26}

where $\pmb { \mu } = ( \mu _ { 1 } , \ldots , \mu _ { K } ) ^ { \mathrm { T } }$ , and the parameters $\mu _ { k }$ are constrained to satisfy $\mu _ { k } \geqslant 0$ and $\textstyle \sum _ { k } \mu _ { k } = 1$ , because they represent probabilities. The distribution (2.26) can be regarded as a generalization of the Bernoulli distribution to more than two outcomes. It is easily seen that the distribution is normalized

\sum_ {\mathbf {x}} p (\mathbf {x} | \boldsymbol {\mu}) = \sum_ {k = 1} ^ {K} \mu_ {k} = 1\tag{2.27}

and that

\mathbb {E} [ \mathbf {x} | \boldsymbol {\mu} ] = \sum_ {\mathbf {x}} p (\mathbf {x} | \boldsymbol {\mu}) \mathbf {x} = (\mu_ {1}, \dots , \mu_ {M}) ^ {\mathrm{T}} = \boldsymbol {\mu}.\tag{2.28}

Now consider a data set $\mathcal { D }$ of N independent observations $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ . The corresponding likelihood function takes the form

p (\mathcal {D} | \boldsymbol {\mu}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} \mu_ {k} ^ {x _ {n k}} = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {\left(\sum_ {n} x _ {n k}\right)} = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {m _ {k}}.\tag{2.29}

We see that the likelihood function depends on the N data points only through the K quantities

m _ {k} = \sum_ {n} x _ {n k}\tag{2.30}

which represent the number of observations of $x _ { k } = 1$ . These are called the sufficient statistics for this distribution.

In order to find the maximum likelihood solution for $\mu ,$ we need to maximize ln $p ( \mathcal { D } | \boldsymbol { \mu } )$ with respect to $\mu _ { k }$ taking account of the constraint that the $\mu _ { k }$ must sum to one. This can be achieved using a Lagrange multiplier λ and maximizing

\sum_ {k = 1} ^ {K} m _ {k} \ln \mu_ {k} + \lambda \left(\sum_ {k = 1} ^ {K} \mu_ {k} - 1\right).\tag{2.31}

Setting the derivative of (2.31) with respect to $\mu _ { k }$ to zero, we obtain

\mu_ {k} = - m _ {k} / \lambda .\tag{2.32}

We can solve for the Lagrange multiplier λ by substituting (2.32) into the constraint $\textstyle \sum _ { k } \mu _ { k } = 1$ to give $\lambda = - N$ . Thus we obtain the maximum likelihood solution in the form

\mu_ {k} ^ {\mathrm{ML}} = \frac {m _ {k}}{N}\tag{2.33}

which is the fraction of the N observations for which $x _ { k } = 1$

We can consider the joint distribution of the quantities $m _ { 1 } , \ldots , m _ { K }$ , conditioned on the parameters $\pmb { \mu }$ and on the total number $\bar { N }$ of observations. From (2.29) this takes the form

\mathrm{Mult} (m _ {1}, m _ {2}, \ldots , m _ {K} | \boldsymbol {\mu}, N) = \binom {N} {m _ {1} m _ {2} \ldots m _ {K}} \prod_ {k = 1} ^ {K} \mu_ {k} ^ {m _ {k}}\tag{2.34}

which is known as the multinomial distribution. The normalization coefficient is the number of ways of partitioning N objects into K groups of size $m _ { 1 } , \ldots , m _ { K }$ and is given by

\binom{N}{m _ {1} m _ {2} \ldots m _ {K}} = \frac {N !}{m _ {1} ! m _ {2} ! \ldots m _ {K} !}.\tag{2.35}

Note that the variables $m _ { k }$ are subject to the constraint

\sum_ {k = 1} ^ {K} m _ {k} = N.\tag{2.36}
