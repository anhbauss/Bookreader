---
id: "tin-hieu-he-thong.1-2-4-the-gaussian-distribution"
doc_id: "tin-hieu-he-thong"
title: "1.2.4 The Gaussian distribution"
level: 2
heading_path: ["Introduction", "1.2.4 The Gaussian distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.thomas-bayes-1701-1761"
next_id: "tin-hieu-he-thong.pierre-simon-laplace-1749-1827"
block_ids: ["b304", "b305", "b306", "b307", "b308", "b309", "b310", "b311", "b312", "b313"]
---

## 1.2.4 The Gaussian distribution

We shall devote the whole of Chapter 2 to a study of various probability distributions and their key properties. It is convenient, however, to introduce here one of the most important probability distributions for continuous variables, called the normal or Gaussian distribution. We shall make extensive use of this distribution in the remainder of this chapter and indeed throughout much of the book.

For the case of a single real-valued variable $x ,$ the Gaussian distribution is defined by

\mathcal {N} \left(x | \mu , \sigma^ {2}\right) = \frac {1}{(2 \pi \sigma^ {2}) ^ {1 / 2}} \exp \left\{- \frac {1}{2 \sigma^ {2}} (x - \mu) ^ {2} \right\}\tag{1.46}

which is governed by two parameters: $\mu ,$ called the mean, and $\sigma ^ { 2 }$ , called the variance. The square root of the variance, given by $\sigma _ { \mathrm { { : } } }$ , is called the standard deviation, and the reciprocal of the variance, written as $\beta = 1 / \sigma ^ { 2 }$ , is called the precision. We shall see the motivation for these terms shortly. Figure 1.13 shows a plot of the Gaussian distribution.

From the form of (1.46) we see that the Gaussian distribution satisfies

\mathcal {N} (x | \mu , \sigma^ {2}) > 0.\tag{1.47}

Exercise 1.7

Also it is straightforward to show that the Gaussian is normalized, so that

![image](images/part-001--fcd7a41379878f14fde4827fb2696e2787ecc10b86941905dd3421bbc1516a3c.jpg)
