---
id: "tin-hieu-he-thong.2-3-the-gaussian-distribution"
doc_id: "tin-hieu-he-thong"
title: "2.3. The Gaussian Distribution"
level: 2
heading_path: ["Probability Distributions", "2.3. The Gaussian Distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.lejeune-dirichlet-1805-1859"
next_id: "tin-hieu-he-thong.carl-friedrich-gauss-1777-1855"
block_ids: ["b872", "b873", "b874", "b875", "b876", "b877", "b878", "b879", "b880", "b881", "b882", "b883", "b884", "b885", "b886"]
---

## 2.3. The Gaussian Distribution

The Gaussian, also known as the normal distribution, is a widely used model for the distribution of continuous variables. In the case of a single variable x, the Gaussian distribution can be written in the form

\mathcal {N} (x | \mu , \sigma^ {2}) = \frac {1}{(2 \pi \sigma^ {2}) ^ {1 / 2}} \exp \left\{- \frac {1}{2 \sigma^ {2}} (x - \mu) ^ {2} \right\}\tag{2.42}

where $\mu$ is the mean and $\sigma ^ { 2 }$ is the variance. For a D-dimensional vector x, the multivariate Gaussian distribution takes the form

\mathcal {N} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Sigma}) = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \exp \left\{- \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu}) \right\}\tag{2.43}

where $\pmb { \mu }$ is a D-dimensional mean vector, Σ is a $D \times D$ covariance matrix, and Σ denotes the determinant of Σ.

The Gaussian distribution arises in many different contexts and can be motivated from a variety of different perspectives. For example, we have already seen that for a single real variable, the distribution that maximizes the entropy is the Gaussian. This property applies also to the multivariate Gaussian.

Another situation in which the Gaussian distribution arises is when we consider the sum of multiple random variables. The central limit theorem (due to Laplace) tells us that, subject to certain mild conditions, the sum of a set of random variables, which is of course itself a random variable, has a distribution that becomes increasingly Gaussian as the number of terms in the sum increases (Walker, 1969). We can illustrate this by considering N variables $x _ { 1 } , \ldots , x _ { N }$ each of which has a uniform distribution over the interval [0, 1] and then considering the distribution of the mean $( x _ { 1 } + \cdot \cdot \cdot + x _ { N } ) / N$ . For large N, this distribution tends to a Gaussian, as illustrated in Figure 2.6. In practice, the convergence to a Gaussian as N increases can be very rapid. One consequence of this result is that the binomial distribution (2.9), which is a distribution over m defined by the sum of N observations of the random binary variable x, will tend to a Gaussian as $N \to \infty$ (see Figure 2.1 for the case of $N = 1 0 )$

![image](images/part-001--c97813cd82849009827e6a9ba3acddf7b38ff2ccf5d77d30cbd78d700e89a7dc.jpg)

![image](images/part-001--82e7ac5637a793ec2eca3ac20e7a17e254fc5490573ed0e904d5171d9193fd7a.jpg)

![image](images/part-001--9eb9bf95a31df17d8568d270842af141b5d393d69207f5f10d47ca37e9bc0907.jpg)

Figure 2.6 Histogram plots of the mean of N uniformly distributed numbers for various values of N. We observe that as N increases, the distribution tends towards a Gaussian.

The Gaussian distribution has many important analytical properties, and we shall consider several of these in detail. As a result, this section will be rather more technically involved than some of the earlier sections, and will require familiarity with various matrix identities. However, we strongly encourage the reader to become proficient in manipulating Gaussian distributions using the techniques presented here as this will prove invaluable in understanding the more complex models presented in later chapters.

We begin by considering the geometrical form of the Gaussian distribution. The

![image](images/part-001--154d935cb725d0a1fd51fa8b63198af56541a45e96632cd07e8911e788e2f351.jpg)
