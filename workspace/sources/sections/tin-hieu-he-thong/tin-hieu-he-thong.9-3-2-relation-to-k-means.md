---
id: "tin-hieu-he-thong.9-3-2-relation-to-k-means"
doc_id: "tin-hieu-he-thong"
title: "9.3.2 Relation to K-means"
level: 2
heading_path: ["Mixture Models and EM", "9.3.2 Relation to K-means"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-3-1-gaussian-mixtures-revisited"
next_id: "tin-hieu-he-thong.9-3-3-mixtures-of-bernoulli-distributions"
block_ids: ["b4876", "b4877", "b4878", "b4879", "b4880", "b4881", "b4882", "b4883", "b4884", "b4885", "b4886", "b4887"]
---

## 9.3.2 Relation to K-means

Comparison of the K-means algorithm with the EM algorithm for Gaussian mixtures shows that there is a close similarity. Whereas the K-means algorithm performs a hard assignment of data points to clusters, in which each data point is associated uniquely with one cluster, the EM algorithm makes a soft assignment based on the posterior probabilities. In fact, we can derive the K-means algorithm as a particular limit of EM for Gaussian mixtures as follows.

Consider a Gaussian mixture model in which the covariance matrices of the mixture components are given by I, where  is a variance parameter that is shared by all of the components, and I is the identity matrix, so that

p (\mathbf {x} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}) = \frac {1}{(2 \pi \epsilon) ^ {1 / 2}} \exp \left\{- \frac {1}{2 \epsilon} \| \mathbf {x} - \boldsymbol {\mu} _ {k} \| ^ {2} \right\}.\tag{9.41}

We now consider the EM algorithm for a mixture of K Gaussians of this form in which we treat  as a fixed constant, instead of a parameter to be re-estimated. From (9.13) the posterior probabilities, or responsibilities, for a particular data point ${ \bf x } _ { n }$ are given by

\gamma (z _ {n k}) = \frac {\pi_ {k} \exp \left\{- \| \mathbf {x} _ {n} - \pmb {\mu} _ {k} \| ^ {2} / 2 \epsilon \right\}}{\sum_ {j} \pi_ {j} \exp \left\{- \| \mathbf {x} _ {n} - \pmb {\mu} _ {j} \| ^ {2} / 2 \epsilon \right\}}.\tag{9.42}

If we consider the limit $\epsilon  0$ , we see that in the denominator the term for which $\| \mathbf { x } _ { n } - { \pmb { \mu } } _ { i } \| ^ { 2 }$ is smallest will go to zero most slowly, and hence the responsibilities $\gamma ( z _ { n k } )$ for the data point ${ \bf x } _ { n }$ all go to zero except for term $j ,$ , for which the responsibility $\gamma ( z _ { n j } )$ will go to unity. Note that this holds independently of the values of the $\pi _ { k }$ so long as none of the $\pi _ { k }$ is zero. Thus, in this limit, we obtain a hard assignment of data points to clusters, just as in the K-means algorithm, so that $\gamma ( z _ { n k } ) \to r _ { n k }$ where $r _ { n k }$ is defined by (9.2). Each data point is thereby assigned to the cluster having the closest mean.

The EM re-estimation equation for the $\mu _ { k }$ , given by (9.17), then reduces to the K-means result (9.4). Note that the re-estimation formula for the mixing coefficients (9.22) simply re-sets the value of $\pi _ { k }$ to be equal to the fraction of data points assigned to cluster $k ,$ although these parameters no longer play an active role in the algorithm.

Finally, in the limit $\epsilon  0$ the expected complete-data log likelihood, given by (9.40), becomes

\mathbb {E} _ {\mathbf {Z}} [ \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\mu}, \boldsymbol {\Sigma}, \boldsymbol {\pi}) ] \rightarrow - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} r _ {n k} \| \mathbf {x} _ {n} - \boldsymbol {\mu} _ {k} \| ^ {2} + \mathrm{const.}\tag{9.43}

Thus we see that in this limit, maximizing the expected complete-data log likelihood is equivalent to minimizing the distortion measure J for the K-means algorithm given by (9.1).

Note that the K-means algorithm does not estimate the covariances of the clusters but only the cluster means. A hard-assignment version of the Gaussian mixture model with general covariance matrices, known as the elliptical K-means algorithm, has been considered by Sung and Poggio (1994).
