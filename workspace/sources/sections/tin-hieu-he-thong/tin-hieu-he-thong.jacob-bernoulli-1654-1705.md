---
id: "tin-hieu-he-thong.jacob-bernoulli-1654-1705"
doc_id: "tin-hieu-he-thong"
title: "Jacob Bernoulli 1654\u20131705"
level: 2
heading_path: ["Probability Distributions", "Jacob Bernoulli 1654\u20131705"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-1-binary-variables"
next_id: "tin-hieu-he-thong.2-1-1-the-beta-distribution"
block_ids: ["b764", "b765", "b766", "b767", "b768", "b769", "b770", "b771", "b772", "b773", "b774", "b775", "b776", "b777", "b778", "b779", "b780", "b781"]
---

## Jacob Bernoulli 1654–1705

Jacob Bernoulli, also known as Jacques or James Bernoulli, was a Swiss mathematician and was the first of many in the Bernoulli family to pursue a career in science and mathematics. Although compelled

to study philosophy and theology against his will by his parents, he travelled extensively after graduating in order to meet with many of the leading scientists of his time, including Boyle and Hooke in England. When he returned to Switzerland, he taught mechanics and became Professor of Mathematics at Basel in 1687. Unfortunately, rivalry between Jacob and his younger brother Johann turned an initially productive collaboration into a bitter and public dispute. Jacob’s most significant contributions to mathematics appeared in The published in 1713, eight years after his death, which deals with topics in probability theory including what has become known as the Bernoulli distribution.

Figure 2.1 Histogram plot of the binomial distribution (2.9) as a function of m for N = 10 and $\mu = 0 . 2 5$

![image](images/part-001--502086544586852da1b941c7844fe0faa0934ee791d0e07d2ba25e10d5be1961.jpg)

which is also known as the sample mean. If we denote the number of observations of $x = 1$ (heads) within this data set by m, then we can write (2.7) in the form

\mu_ {\mathrm{ML}} = \frac {m}{N}\tag{2.8}

so that the probability of landing heads is given, in this maximum likelihood framework, by the fraction of observations of heads in the data set.

Now suppose we flip a coin, say, 3 times and happen to observe 3 heads. Then $N = m = 3$ and $\mu _ { \mathrm { M L } } = 1$ . In this case, the maximum likelihood result would predict that all future observations should give heads. Common sense tells us that this is unreasonable, and in fact this is an extreme example of the over-fitting associated with maximum likelihood. We shall see shortly how to arrive at more sensible conclusions through the introduction of a prior distribution over $\mu .$

We can also work out the distribution of the number m of observations of $x = 1$ given that the data set has size N. This is called the binomial distribution, and from (2.5) we see that it is proportional to $\mu ^ { m } ( 1 - \mu ) ^ { N - m }$ . In order to obtain the normalization coefficient we note that out of N coin flips, we have to add up all of the possible ways of obtaining m heads, so that the binomial distribution can be written

\operatorname{Bin} (m | N, \mu) = \binom {N} {m} \mu^ {m} (1 - \mu) ^ {N - m}\tag{2.9}

where

\binom {N} {m} \equiv \frac {N !}{(N - m) ! m !}\tag{2.10}

is the number of ways of choosing m objects out of a total of N identical objects. Figure 2.1 shows a plot of the binomial distribution for $N = 1 0$ and $\mu = 0 . 2 5$

The mean and variance of the binomial distribution can be found by using the result of Exercise 1.10, which shows that for independent events the mean of the sum is the sum of the means, and the variance of the sum is the sum of the variances. Because $m = x _ { 1 } + . . . + x _ { N }$ , and for each observation the mean and variance are given by (2.3) and (2.4), respectively, we have

\mathbb {E} [ m ] \equiv \sum_ {m = 0} ^ {N} m \mathrm{Bin} (m | N, \mu) = N \mu\tag{2.11}

\operatorname{var} [ m ] \equiv \sum_ {m = 0} ^ {N} (m - \mathbb {E} [ m ]) ^ {2} \operatorname{Bin} (m | N, \mu) = N \mu (1 - \mu).\tag{2.12}

These results can also be proved directly using calculus.
