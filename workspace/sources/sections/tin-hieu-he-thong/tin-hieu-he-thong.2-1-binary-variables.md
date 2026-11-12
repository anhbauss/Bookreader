---
id: "tin-hieu-he-thong.2-1-binary-variables"
doc_id: "tin-hieu-he-thong"
title: "2.1. Binary Variables"
level: 2
heading_path: ["Probability Distributions", "2.1. Binary Variables"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.probability-distributions"
next_id: "tin-hieu-he-thong.jacob-bernoulli-1654-1705"
block_ids: ["b747", "b748", "b749", "b750", "b751", "b752", "b753", "b754", "b755", "b756", "b757", "b758", "b759", "b760", "b761", "b762", "b763"]
---

## 2.1. Binary Variables

We begin by considering a single binary random variable $x \in \{ 0 , 1 \}$ . For example, x might describe the outcome of flipping a coin, with $x = 1$ representing ‘heads’, and $x = 0$ representing ‘tails’. We can imagine that this is a damaged coin so that the probability of landing heads is not necessarily the same as that of landing tails. The probability of $x = 1$ will be denoted by the parameter $\mu$ so that

p (x = 1 | \mu) = \mu\tag{2.1}

where $0 \leqslant \mu \leqslant 1$ , from which it follows that $p ( x = 0 | \mu ) = 1 - \mu$ . The probability distribution over x can therefore be written in the form

\mathrm{Bern} (x | \mu) = \mu^ {x} (1 - \mu) ^ {1 - x}\tag{2.2}

Exercise 2.1

which is known as the Bernoulli distribution. It is easily verified that this distribution is normalized and that it has mean and variance given by

\mathbb {E} [ x ] = \mu\tag{2.3}

\operatorname{var} [ x ] = \mu (1 - \mu).\tag{2.4}

Now suppose we have a data set $\mathcal { D } = \{ x _ { 1 } , \ldots , x _ { N } \}$ of observed values of x. We can construct the likelihood function, which is a function of $\mu ,$ on the assumption that the observations are drawn independently from $p ( x | \mu )$ , so that

p (\mathcal {D} | \mu) = \prod_ {n = 1} ^ {N} p (x _ {n} | \mu) = \prod_ {n = 1} ^ {N} \mu^ {x _ {n}} (1 - \mu) ^ {1 - x _ {n}}.\tag{2.5}

In a frequentist setting, we can estimate a value for $\mu$ by maximizing the likelihood function, or equivalently by maximizing the logarithm of the likelihood. In the case of the Bernoulli distribution, the log likelihood function is given by

\ln p (\mathcal {D} | \mu) = \sum_ {n = 1} ^ {N} \ln p (x _ {n} | \mu) = \sum_ {n = 1} ^ {N} \left\{x _ {n} \ln \mu + (1 - x _ {n}) \ln (1 - \mu) \right\}.\tag{2.6}

Section 2.4

At this point, it is worth noting that the log likelihood function depends on the N observations $x _ { n }$ only through their sum $\textstyle \sum _ { n } x _ { n }$ . This sum provides an example of a sufficient statistic for the data under this distribution, and we shall study the important role of sufficient statistics in some detail. If we set the derivative of ln $p ( \mathcal { D } | \mu )$ with respect to $\mu$ equal to zero, we obtain the maximum likelihood estimator

\mu_ {\mathrm{ML}} = \frac {1}{N} \sum_ {n = 1} ^ {N} x _ {n}\tag{2.7}

![image](images/part-001--3e39d3ec4eade65f3ed47e187c52e87f00a894cdb510f69c0a8e34c2223e1142.jpg)
