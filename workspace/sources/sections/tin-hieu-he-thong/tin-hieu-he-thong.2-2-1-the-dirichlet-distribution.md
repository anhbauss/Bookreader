---
id: "tin-hieu-he-thong.2-2-1-the-dirichlet-distribution"
doc_id: "tin-hieu-he-thong"
title: "2.2.1 The Dirichlet distribution"
level: 2
heading_path: ["Probability Distributions", "2.2.1 The Dirichlet distribution"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-2-multinomial-variables"
next_id: "tin-hieu-he-thong.lejeune-dirichlet-1805-1859"
block_ids: ["b848", "b849", "b850", "b851", "b852", "b853", "b854", "b855", "b856", "b857", "b858", "b859", "b860", "b861", "b862", "b863", "b864", "b865"]
---

## 2.2.1 The Dirichlet distribution

We now introduce a family of prior distributions for the parameters $\{ \mu _ { k } \}$ of the multinomial distribution (2.34). By inspection of the form of the multinomial distribution, we see that the conjugate prior is given by

p (\boldsymbol {\mu} | \boldsymbol {\alpha}) \propto \prod_ {k = 1} ^ {K} \mu_ {k} ^ {\alpha_ {k} - 1}\tag{2.37}

where $0 \leqslant \mu _ { k } \leqslant 1$ and $\textstyle \sum _ { k } \mu _ { k } = 1$ . Here $\alpha _ { 1 } , \ldots , \alpha _ { K }$ are the parameters of the distribution, and α denotes $\mathbf { \Psi } ( \alpha _ { 1 } , \ldots , \alpha _ { K } ) ^ { \mathrm { T } }$ . Note that, because of the summation constraint, the distribution over the space of the $\{ \mu _ { k } \}$ is confined to a simplex of dimensionality $K - 1$ , as illustrated for $K = 3$ in Figure 2.4.

The normalized form for this distribution is by

\operatorname{Dir} (\boldsymbol {\mu} | \boldsymbol {\alpha}) = \frac {\Gamma (\alpha_ {0})}{\Gamma (\alpha_ {1}) \cdots \Gamma (\alpha_ {K})} \prod_ {k = 1} ^ {K} \mu_ {k} ^ {\alpha_ {k} - 1}\tag{2.38}

which is called the Dirichlet distribution. Here $\Gamma ( x )$ is the gamma function defined by (1.141) while

\alpha_ {0} = \sum_ {k = 1} ^ {K} \alpha_ {k}.\tag{2.39}

Figure 2.4 The Dirichlet distribution over three variables $\mu _ { 1 } , \mu _ { 2 } , \mu _ { 3 }$ is confined to a simplex (a bounded linear manifold) of the form shown, as a consequence of the constraints $0 \leqslant \mu _ { k } \leqslant 1$ and $\textstyle \sum _ { k } \mu _ { k } = 1$

![image](images/part-001--4ae083274a11ae36d12725575478b0e89435d972ed636b6467b13cff50dd4cf3.jpg)

Plots of the Dirichlet distribution over the simplex, for various settings of the parameters $\alpha _ { k } .$ , are shown in Figure 2.5.

Multiplying the prior (2.38) by the likelihood function (2.34), we obtain the posterior distribution for the parameters $\{ \mu _ { k } \}$ in the form

p (\boldsymbol {\mu} | \mathcal {D}, \boldsymbol {\alpha}) \propto p (\mathcal {D} | \boldsymbol {\mu}) p (\boldsymbol {\mu} | \boldsymbol {\alpha}) \propto \prod_ {k = 1} ^ {K} \mu_ {k} ^ {\alpha_ {k} + m _ {k} - 1}.\tag{2.40}

We see that the posterior distribution again takes the form of a Dirichlet distribution, confirming that the Dirichlet is indeed a conjugate prior for the multinomial. This allows us to determine the normalization coefficient by comparison with (2.38) so that

\begin{array}{r c l} p (\boldsymbol {\mu} | \mathcal {D}, \boldsymbol {\alpha}) & = & \mathrm{Dir} (\boldsymbol {\mu} | \boldsymbol {\alpha} + \mathbf {m}) \\ & = & \frac {\Gamma (\alpha_ {0} + N)}{\Gamma (\alpha_ {1} + m _ {1}) \cdots \Gamma (\alpha_ {K} + m _ {K})} \prod_ {k = 1} ^ {K} \mu_ {k} ^ {\alpha_ {k} + m _ {k} - 1} \end{array}\tag{2.41}

where we have denoted $\mathbf { m } = ( m _ { 1 } , \ldots , m _ { K } ) ^ { \mathrm { T } }$ . As for the case of the binomial distribution with its beta prior, we can interpret the parameters $\alpha _ { k }$ of the Dirichlet prior as an effective number of observations of $x _ { k } = 1$

Note that two-state quantities can either be represented as binary variables and

![image](images/part-001--d8a92047449b3875fd94fd2fce1c21c08f08fcf6dd72da1ee1938a784b41fe3d.jpg)
