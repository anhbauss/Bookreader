---
id: "tin-hieu-he-thong.10-4-exponential-family-distributions"
doc_id: "tin-hieu-he-thong"
title: "10.4. Exponential Family Distributions"
level: 2
heading_path: ["Approximate Inference", "10.4. Exponential Family Distributions"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-3-3-lower-bound"
next_id: "tin-hieu-he-thong.10-4-1-variational-message-passing"
block_ids: ["b5378", "b5379", "b5380", "b5381", "b5382", "b5383", "b5384", "b5385", "b5386", "b5387", "b5388", "b5389", "b5390", "b5391", "b5392", "b5393", "b5394", "b5395", "b5396", "b5397", "b5398"]
---

## 10.4. Exponential Family Distributions

In Chapter 2, we discussed the important role played by the exponential family of distributions and their conjugate priors. For many of the models discussed in this book, the complete-data likelihood is drawn from the exponential family. However, in general this will not be the case for the marginal likelihood function for the observed data. For example, in a mixture of Gaussians, the joint distribution of observations ${ \bf x } _ { n }$ and corresponding hidden variables $\mathbf { z } _ { n }$ is a member of the exponential family, whereas the marginal distribution of ${ \bf x } _ { n }$ is a mixture of Gaussians and hence is not.

Up to now we have grouped the variables in the model into observed variables and hidden variables. We now make a further distinction between latent variables, denoted Z, and parameters, denoted $\theta ,$ where parameters are intensive (fixed in number independent of the size of the data set), whereas latent variables are extensive (scale in number with the size of the data set). For example, in a Gaussian mixture model, the indicator variables $z _ { k n }$ (which specify which component k is responsible for generating data point $\mathbf { x } _ { n } )$ represent the latent variables, whereas the means $\pmb { \mu } _ { k }$ precisions $\mathbf { \Lambda } _ { \Lambda _ { k } }$ and mixing proportions $\pi _ { k }$ represent the parameters.

Consider the case of independent identically distributed data. We denote the data values by ${ \bf X } = \{ { \bf x } _ { n } \}$ , where $n = 1 , \ldots N$ , with corresponding latent variables ${ \bf Z } = \{ { \bf z } _ { n } \}$ . Now suppose that the joint distribution of observed and latent variables is a member of the exponential family, parameterized by natural parameters η so that

p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\eta}) = \prod_ {n = 1} ^ {N} h (\mathbf {x} _ {n}, \mathbf {z} _ {n}) g (\boldsymbol {\eta}) \exp \left\{\boldsymbol {\eta} ^ {\mathrm{T}} \mathbf {u} (\mathbf {x} _ {n}, \mathbf {z} _ {n}) \right\}.\tag{10.113}

We shall also use a conjugate prior for η, which can be written as

p (\boldsymbol {\eta} | \nu_ {0}, \mathbf {v} _ {0}) = f (\nu_ {0}, \boldsymbol {\chi} _ {0}) g (\boldsymbol {\eta}) ^ {\nu_ {0}} \exp \left\{\nu_ {o} \boldsymbol {\eta} ^ {\mathrm{T}} \boldsymbol {\chi} _ {0} \right\}.\tag{10.114}

Recall that the conjugate prior distribution can be interpreted as a prior number $\nu _ { 0 }$ of observations all having the value $x _ { 0 }$ for the u vector. Now consider a variational distribution that factorizes between the latent variables and the parameters, so that $q ( { \bf Z } , \eta ) = q ( { \bf Z } ) q ( \eta )$ . Using the general result (10.9), we can solve for the two factors as follows

\begin{array}{r c l} \ln q ^ {\star} (\mathbf {Z}) & = & \mathbb {E} _ {\boldsymbol {\eta}} [ \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\eta}) ] + \text { const } \\ & = & \sum_ {n = 1} ^ {N} \left\{\ln h (\mathbf {x} _ {n}, \mathbf {z} _ {n}) + \mathbb {E} [ \boldsymbol {\eta} ^ {\mathrm{T}} ] \mathbf {u} (\mathbf {x} _ {n}, \mathbf {z} _ {n}) \right\} + \text { const }. \end{array}\tag{10.115}

Thus we see that this decomposes into a sum of independent terms, one for each value of $n ,$ and hence the solution for $q ^ { \star } ( \mathbf { Z } )$ will factorize over $n$ so that ${ \boldsymbol { q } } ^ { \star } ( \mathbf { Z } ) =$ $\prod _ { n } q ^ { \star } ( \mathbf { z } _ { n } )$ . This is an example of an induced factorization. Taking the exponential of both sides, we have

q ^ {\star} (\mathbf {z} _ {n}) = h (\mathbf {x} _ {n}, \mathbf {z} _ {n}) g \left(\mathbb {E} [ \boldsymbol {\eta} ]\right) \exp \left\{\mathbb {E} [ \boldsymbol {\eta} ^ {\mathrm{T}} ] \mathbf {u} (\mathbf {x} _ {n}, \mathbf {z} _ {n}) \right\}\tag{10.116}

where the normalization coefficient has been re-instated by comparison with the standard form for the exponential family.

Similarly, for the variational distribution over the parameters, we have

\ln q ^ {\star} (\pmb {\eta}) = \ln p (\pmb {\eta} | \nu_ {0}, \pmb {\chi} _ {0}) + \mathbb {E} _ {\mathbf {Z}} [ \ln p (\mathbf {X}, \mathbf {Z} | \pmb {\eta}) ] + \mathrm{const}\tag{10.117}

= \nu_ {0} \ln g (\boldsymbol {\eta}) + \boldsymbol {\eta} ^ {\mathrm{T}} \boldsymbol {\chi} _ {0} + \sum_ {n = 1} ^ {N} \left\{\ln g (\boldsymbol {\eta}) + \boldsymbol {\eta} ^ {\mathrm{T}} \mathbb {E} _ {\mathbf {z} _ {n}} [ \mathbf {u} (\mathbf {x} _ {n}, \mathbf {z} _ {n}) ] \right\} + \text { const. }\tag{10.118}

Again, taking the exponential of both sides, and re-instating the normalization coefficient by inspection, we have

q ^ {\star} (\boldsymbol {\eta}) = f \left(\nu_ {N}, \boldsymbol {\chi} _ {N}\right) g (\boldsymbol {\eta}) ^ {\nu_ {N}} \exp \left\{\boldsymbol {\eta} ^ {\mathrm{T}} \boldsymbol {\chi} _ {N} \right\}\tag{10.119}

where we have defined

\nu_ {N} = \nu_ {0} + N\tag{10.120}

\chi_ {N} = \chi_ {0} + \sum_ {n = 1} ^ {N} \mathbb {E} _ {\mathbf {z} _ {n}} [ \mathbf {u} (\mathbf {x} _ {n}, \mathbf {z} _ {n}) ].\tag{10.121}

Note that the solutions for $q ^ { \star } ( { \bf z } _ { n } )$ and $q ^ { \star } ( \eta )$ are coupled, and so we solve them iteratively in a two-stage procedure. In the variational E step, we evaluate the expected sufficient statistics $\mathbb { E } [ { \bf u } ( { \bf x } _ { n } , { \bf z } _ { n } ) ]$ using the current posterior distribution $q ( \mathbf { z } _ { n } )$ over the latent variables and use this to compute a revised posterior distribution $q ( \eta )$ over the parameters. Then in the subsequent variational M step, we use this revised parameter posterior distribution to find the expected natural parameters $\mathbb { E } [ \eta ^ { \mathrm { T } } ]$ , which gives rise to a revised variational distribution over the latent variables.
