---
id: "tin-hieu-he-thong.4-3-1-fixed-basis-functions"
doc_id: "tin-hieu-he-thong"
title: "4.3.1 Fixed basis functions"
level: 2
heading_path: ["4 Linear Models for Classification", "4.3.1 Fixed basis functions"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-3-probabilistic-discriminative-models"
next_id: "tin-hieu-he-thong.4-3-2-logistic-regression"
block_ids: ["b2345", "b2346", "b2347", "b2348"]
---

## 4.3.1 Fixed basis functions

So far in this chapter, we have considered classification models that work directly with the original input vector x. However, all of the algorithms are equally applicable if we first make a fixed nonlinear transformation of the inputs using a vector of basis functions $\phi ( \mathbf { x } )$ . The resulting decision boundaries will be linear in the feature space $\phi ,$ and these correspond to nonlinear decision boundaries in the original x space, as illustrated in Figure 4.12. Classes that are linearly separable in the feature space $\phi ( \mathbf { x } )$ need not be linearly separable in the original observation space x. Note that as in our discussion of linear models for regression, one of the basis functions is typically set to a constant, say $\phi _ { 0 } ( \mathbf { x } ) = 1$ , so that the corresponding parameter $w _ { 0 }$ plays the role of a bias. For the remainder of this chapter, we shall include a fixed basis function transformation $\phi ( \mathbf { x } )$ , as this will highlight some useful similarities to the regression models discussed in Chapter 3.

For many problems of practical interest, there is significant overlap between the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ . This corresponds to posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ , which, for at least some values of $\mathbf { x } ,$ are not 0 or 1. In such cases, the optimal solution is obtained by modelling the posterior probabilities accurately and then applying standard decision theory, as discussed in Chapter 1. Note that nonlinear transformations $\phi ( \mathbf { x } )$ cannot remove such class overlap. Indeed, they can increase the level of overlap, or create overlap where none existed in the original observation space. However, suitable choices of nonlinearity can make the process of modelling the posterior probabilities easier.

Such fixed basis function models have important limitations, and these will be resolved in later chapters by allowing the basis functions themselves to adapt to the data. Notwithstanding these limitations, models with fixed nonlinear basis functions play an important role in applications, and a discussion of such models will introduce many of the key concepts needed for an understanding of their more complex counterparts.
