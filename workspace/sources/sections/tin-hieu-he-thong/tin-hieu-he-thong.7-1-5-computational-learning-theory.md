---
id: "tin-hieu-he-thong.7-1-5-computational-learning-theory"
doc_id: "tin-hieu-he-thong"
title: "7.1.5 Computational learning theory"
level: 2
heading_path: ["Sparse Kernel Machines", "7.1.5 Computational learning theory"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.7-1-4-svms-for-regression"
next_id: "tin-hieu-he-thong.7-2-relevance-vector-machines"
block_ids: ["b3896", "b3897", "b3898", "b3899", "b3900", "b3901", "b3902"]
---

## 7.1.5 Computational learning theory

Historically, support vector machines have largely been motivated and analysed using a theoretical framework known as computational learning theory, also sometimes called statistical learning theory (Anthony and Biggs, 1992; Kearns and Vazirani, 1994; Vapnik, 1995; Vapnik, 1998). This has its origins with Valiant (1984) who formulated the probably approximately correct, or PAC, learning framework. The goal of the PAC framework is to understand how large a data set needs to be in order to give good generalization. It also gives bounds for the computational cost of learning, although we do not consider these here.

Suppose that a data set of size N is drawn from some joint distribution $p ( \mathbf { x } , \mathbf { t } )$ where x is the input variable and t represents the class label, and that we restrict attention to ‘noise free’ situations in which the class labels are determined by some (unknown) deterministic function $\mathbf { t } = \mathbf { g } ( \mathbf { x } )$ . In PAC learning we say that a function $\mathbf { f } \left( \mathbf { x } ; \mathcal { D } \right)$ , drawn from a space $\mathcal { F }$ of such functions on the basis of the training set $\mathcal { D }$ , has good generalization if its expected error rate is below some pre-specified threshold , so that

\mathbb {E} _ {\mathbf {x}, \mathbf {t}} \left[ I \left(\mathbf {f} (\mathbf {x}; \mathcal {D}) \neq \mathbf {t}\right) \right] <   \epsilon\tag{7.75}

where $I ( \cdot )$ is the indicator function, and the expectation is with respect to the distribution $p ( \mathbf { x } , \mathbf { t } )$ . The quantity on the left-hand side is a random variable, because it depends on the training set , and the PAC framework requires that (7.75) holds, with probability greater than $1 - \delta$ , for a data set drawn randomly from $p ( \mathbf { x } , \mathbf { t } )$ Here $\delta$ is another pre-specified parameter, and the terminology ‘probably approximately correct’ comes from the requirement that with high probability (greater than $1 - \delta )$ , the error rate be small (less than ). For a given choice of model space $\mathcal { F }$ , and for given parameters  and δ, PAC learning aims to provide bounds on the minimum size N of data set needed to meet this criterion. A key quantity in PAC learning is the Vapnik-Chervonenkis dimension, or VC dimension, which provides a measure of the complexity of a space of functions, and which allows the PAC framework to be extended to spaces containing an infinite number of functions.

The bounds derived within the PAC framework are often described as worstcase, because they apply to any choice for the distribution $p ( \mathbf { x } , \mathbf { t } )$ , so long as both the training and the test examples are drawn (independently) from the same distribution, and for $a n y$ choice for the function $\mathbf { f } \left( \mathbf { x } \right)$ so long as it belongs to $\mathcal { F }$ . In real-world applications of machine learning, we deal with distributions that have significant regularity, for example in which large regions of input space carry the same class label. As a consequence of the lack of any assumptions about the form of the distribution, the PAC bounds are very conservative, in other words they strongly over-estimate the size of data sets required to achieve a given generalization performance. For this reason, PAC bounds have found few, if any, practical applications.

One attempt to improve the tightness of the PAC bounds is the PAC-Bayesian framework (McAllester, 2003), which considers a distribution over the space $\mathcal { F }$ of functions, somewhat analogous to the prior in a Bayesian treatment. This still considers any possible choice for $p ( \mathbf { x } , \mathbf { t } )$ , and so although the bounds are tighter, they are still very conservative.
