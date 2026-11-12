---
id: "tin-hieu-he-thong.12-1-1-mllximllm-variance-lormulation"
doc_id: "tin-hieu-he-thong"
title: "12,1.1 Mllximllm variance lormulation"
level: 2
heading_path: ["Sampling Methods", "12,1.1 Mllximllm variance lormulation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.c2-1-principal-component-analysis"
next_id: "tin-hieu-he-thong.12-1-2-minimum-error-formulation"
block_ids: ["b6133", "b6134", "b6135", "b6136", "b6137", "b6138", "b6139", "b6140", "b6141", "b6142", "b6143", "b6144", "b6145", "b6146", "b6147", "b6148", "b6149"]
---

## 12,1.1 Mllximllm variance lormulation

Con,ider a dala set <If obser"\lations $\{ \mathbf { x } _ { n } \}$ wher $n = 1 , \ldots , N$ , and $\mathbf { x } _ { n }$ i, a Euclidean variable "'ilh dimen,ionality D. Our goal is to project If>/:: data onto a 'pace ha"ing dimen,ionality $M < D$ " hile Ill3Jli",i,illg the "ariallCe ofthe projttted data. For the !noll..nl. we 'hall assume that tbe "alue of M is g;\·en. Latcr in this chapter, we shall consider techniques to determine an appropriate value of IV! from the data.

To begin with, consider the projection onto a one-dimensional space $( M = 1 )$ We can define the direction of this space using a D-dimensional vector $\mathbf { u } _ { 1 }$ , which for convenience (and without loss of generality) we shall choose to be a unit vector so that ${ \bf u } _ { 1 } ^ { \mathrm { T } } { \bf u } _ { 1 } = 1$ (note that we are only interested in the direction defined by $\mathbf { u } _ { 1 }$ not in the magnitude of $\mathbf { u } _ { 1 }$ itself). Each data point ${ \bf x } _ { n }$ is then projected onto a scalar value ${ \bf u } _ { 1 } ^ { \mathrm { T } } { \bf x } _ { n }$ . The mean of the projected data is $\mathbf { u } _ { 1 } ^ { \mathrm { T } } \overline { { \mathbf { x } } }$ where $\overline { { \mathbf { x } } }$ is the sample set mean given by

\overline {{\mathbf {x}}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n}\tag{12.1}

and the variance of the projected data is given by

\frac {1}{N} \sum_ {n = 1} ^ {N} \left\{\mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {x} _ {n} - \mathbf {u} _ {1} ^ {\mathrm{T}} \overline {{\mathbf {x}}} \right\} ^ {2} = \mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {S u} _ {1}\tag{12.2}

where $\mathbf { S }$ is the data covariance matrix defined by

\mathbf {S} = \frac {1}{N} \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) ^ {\mathrm{T}}.\tag{12.3}

We now maximize the projected variance ${ \bf u } _ { 1 } ^ { \mathrm { T } } { \bf S } { \bf u } _ { 1 }$ with respect to $\mathbf { u } _ { 1 }$ . Clearly, this has to be a constrained maximization to prevent $\| \mathbf { u } _ { 1 } \|  \infty$ . The appropriate constraint comes from the normalization condition $\mathbf { u } _ { 1 } ^ { \mathrm { T } } \mathbf { u } _ { 1 } = 1$ . To enforce this constraint, we introduce a Lagrange multiplier that we shall denote by $\lambda _ { 1 }$ I, and then make an unconstrained maximization o

\mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {S u} _ {1} + \lambda_ {1} \left(1 - \mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {u} _ {1}\right).\tag{12.4}

By setting the derivative with respect to $\mathbf { u } _ { 1 }$ equal to zero, we see that this quantity will have a stationary point when

\mathbf {S u} _ {1} = \lambda_ {1} \mathbf {u} _ {1}\tag{12.5}

which says that $\mathbf { u } _ { 1 }$ must be an eigenvector of S. If we left-multiply by ${ \bf u } _ { 1 } ^ { \mathrm { T } }$ and make use of $\mathbf { u } _ { 1 } ^ { \bar { \mathrm { T } } } \mathbf { u } _ { 1 } = 1$ , we see that the variance is given by

\mathbf {u} _ {1} ^ {\mathrm{T}} \mathbf {S u} _ {1} = \lambda_ {1}\tag{12.6}

and so the variance will be a maximum when we set $\mathbf { u } _ { 1 }$ equal to the eigenvecto having the largest eigenvalue $\lambda _ { 1 }$ I. This eigenvector is known as the first principa component.

We can define additional principal components in an incremental fashion by choosing each new direction to be that which maximizes the projected varianc amongst all possible directions orthogonal to those already considered. If we con sider the general case of an M -dimensional projection space, the optimal linear pro jection for which the variance of the projected data is maximized is now defined by the M eigenvectors $\mathbf { u } _ { 1 } , \dots , \mathbf { u } _ { M }$ of the data covariance matrix S corresponding to the M largest eigenvalue $\lambda _ { 1 } , \dots , \lambda _ { M }$ . This is easily shown using proof by induction

To summarize, principal component analysis involves evaluating the mean x and the covariance matrix S of the data set and then finding the M eigenvectors of S corresponding to the M largest eigenvalues. Algorithms for finding eigenvectors and eigenvalues, as well as additional theorems related to eigenvector decomposition, can be found in Golub and Van Loan (1996). Note that the computational cost o computing the full eigenvector decomposition for a matrix of size ${ \bf \bar { \cal D } } \times { \cal D } { \bf i s } { \cal O } ( D ^ { 3 } )$ If we plan to project our data onto the first M principal components, then we only need to find the first M eigenvalues and eigenvectors. This can be done with more efficient techniques, such as the power method (Golub and Van Loan, 1996), tha scale like $O ( M D ^ { 2 } )$ ), or alternatively we can make use of the EM algorithm.
