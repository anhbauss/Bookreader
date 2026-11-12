---
id: "tin-hieu-he-thong.8-1-4-linear-gaussian-models"
doc_id: "tin-hieu-he-thong"
title: "8.1.4 Linear-Gaussian models"
level: 2
heading_path: ["Graphical Models", "8.1.4 Linear-Gaussian models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-1-3-discrete-variables"
next_id: "tin-hieu-he-thong.8-2-conditional-independence"
block_ids: ["b4163", "b4164", "b4165", "b4166", "b4167", "b4168", "b4169", "b4170", "b4171", "b4172", "b4173", "b4174", "b4175", "b4176", "b4177", "b4178", "b4179", "b4180", "b4181", "b4182", "b4183", "b4184", "b4185", "b4186", "b4187", "b4188"]
---

## 8.1.4 Linear-Gaussian models

In the previous section, we saw how to construct joint probability distributions over a set of discrete variables by expressing the variables as nodes in a directed acyclic graph. Here we show how a multivariate Gaussian can be expressed as a directed graph corresponding to a linear-Gaussian model over the component variables. This allows us to impose interesting structure on the distribution, with the general Gaussian and the diagonal covariance Gaussian representing opposite extremes. Several widely used techniques are examples of linear-Gaussian models, such as probabilistic principal component analysis, factor analysis, and linear dynamical systems (Roweis and Ghahramani, 1999). We shall make extensive use of the results of this section in later chapters when we consider some of these techniques in detail.

Consider an arbitrary directed acyclic graph over D variables in which node i represents a single continuous random variable $x _ { i }$ having a Gaussian distribution. The mean of this distribution is taken to be a linear combination of the states of its parent nodes $\mathrm { p a } _ { i }$ of node i

p \left(x _ {i} \mid \mathrm{pa} _ {i}\right) = \mathcal {N} \left(x _ {i} \left| \sum_ {j \in \mathrm{pa} _ {i}} w _ {i j} x _ {j} + b _ {i}, v _ {i} \right.\right)\tag{8.11}

where $w _ { i j }$ and $b _ { i }$ are parameters governing the mean, and $v _ { i }$ is the variance of the conditional distribution for $x _ { i }$ . The log of the joint distribution is then the log of the product of these conditionals over all nodes in the graph and hence takes the form

\begin{array}{r c l} \ln p (\mathbf {x}) & = & \sum_ {i = 1} ^ {D} \ln p (x _ {i} | \mathrm{pa} _ {i}) \\ & = & - \sum_ {i = 1} ^ {D} \frac {1}{2 v _ {i}} \left(x _ {i} - \sum_ {j \in \mathrm{pa} _ {i}} w _ {i j} x _ {j} - b _ {i}\right) ^ {2} + \text { const } \end{array}\tag{8.12}

(8.13)

where ${ \bf x } = ( x _ { 1 } , \dots , x _ { D } ) ^ { \mathrm { T } }$ and ‘const’ denotes terms independent of x. We see that this is a quadratic function of the components of x, and hence the joint distribution $p ( \mathbf { x } )$ is a multivariate Gaussian.

We can determine the mean and covariance of the joint distribution recursively as follows. Each variable $x _ { i }$ has (conditional on the states of its parents) a Gaussian distribution of the form (8.11) and so

x _ {i} = \sum_ {j \in \mathrm{pa} _ {i}} w _ {i j} x _ {j} + b _ {i} + \sqrt {v _ {i}} \epsilon_ {i}\tag{8.14}

where $\epsilon _ { i }$ is a zero mean, unit variance Gaussian random variable satisfying $\mathbb { E } [ \epsilon _ { i } ] = 0$ and $\mathbb { E } [ \epsilon _ { i } \epsilon _ { j } ] = I _ { i j }$ , where $I _ { i j }$ is the $i , j$ element of the identity matrix. Taking the expectation of (8.14), we have

\mathbb {E} [ x _ {i} ] = \sum_ {j \in \mathrm{pa} _ {i}} w _ {i j} \mathbb {E} [ x _ {j} ] + b _ {i}.\tag{8.15}

Figure 8.14 A directed graph over three Gaussian variables, with one missing link.

![image](images/part-002--d2f5714d622cda7cca2206ad43d52d6d1c4882aa7a7da0f6a73ce9814542e16b.jpg)

Thus we can find the components of $\mathbb { E } [ \mathbf { x } ] = ( \mathbb { E } [ x _ { 1 } ] , \dots , \mathbb { E } [ x _ { D } ] ) ^ { \mathrm { T } }$ by starting at the lowest numbered node and working recursively through the graph (here we again assume that the nodes are numbered such that each node has a higher number than its parents). Similarly, we can use (8.14) and (8.15) to obtain the $i , j$ element of the covariance matrix for $p ( \mathbf { x } )$ in the form of a recursion relation

\begin{array}{r c l} \operatorname{cov} [ x _ {i}, x _ {j} ] & = & \mathbb {E} \left[ (x _ {i} - \mathbb {E} [ x _ {i} ]) (x _ {j} - \mathbb {E} [ x _ {j} ]) \right] \\ & = & \mathbb {E} \left[ (x _ {i} - \mathbb {E} [ x _ {i} ]) \left\{\sum_ {k \in \mathrm{pa} _ {j}} w _ {j k} (x _ {k} - \mathbb {E} [ x _ {k} ]) + \sqrt {v _ {j}} \epsilon_ {j} \right\} \right] \\ & = & \sum_ {k \in \mathrm{pa} _ {j}} w _ {j k} \operatorname{cov} [ x _ {i}, x _ {k} ] + I _ {i j} v _ {j} \end{array}\tag{8.16}

and so the covariance can similarly be evaluated recursively starting from the lowest numbered node.

Let us consider two extreme cases. First of all, suppose that there are no links in the graph, which therefore comprises D isolated nodes. In this case, there are no parameters $w _ { i j }$ and so there are just D parameters $b _ { i }$ and D parameters $v _ { i }$ . From the recursion relations (8.15) and (8.16), we see that the mean of $p ( \mathbf { x } )$ is given by $( b _ { 1 } , \ldots , b _ { D } ) ^ { \mathrm { T } }$ and the covariance matrix is diagonal of the form diag $\mathbf { \sigma } ( v _ { 1 } , \dots , v _ { D } )$ The joint distribution has a total of 2D parameters and represents a set of D independent univariate Gaussian distributions.

Now consider a fully connected graph in which each node has all lower numbered nodes as parents. The matrix $w _ { i j }$ then has $i - 1$ entries on the $i ^ { \mathrm { t h } }$ row and hence is a lower triangular matrix (with no entries on the leading diagonal). Then the total number of parameters $w _ { i j }$ is obtained by taking the number $D ^ { \overline { { 2 } } }$ of elements in a $D \times D$ matrix, subtracting $D$ to account for the absence of elements on the leading diagonal, and then dividing by 2 because the matrix has elements only below the diagonal, giving a total of $D ( \bar { D } - 1 ) / 2$ . The total number of independent parameters $\{ w _ { i j } \}$ and $\{ v _ { i } \}$ in the covariance matrix is therefore $D ( D + 1 ) \bar { / } 2$ corresponding to a general symmetric covariance matrix.

Graphs having some intermediate level of complexity correspond to joint Gaussian distributions with partially constrained covariance matrices. Consider for example the graph shown in Figure 8.14, which has a link missing between variables $x _ { 1 }$ and $x _ { 3 }$ . Using the recursion relations (8.15) and (8.16), we see that the mean and covariance of the joint distribution are given by

{\pmb {\mu}} {=} {(b _ {1}, b _ {2} + w _ {2 1} b _ {1}, b _ {3} + w _ {3 2} b _ {2} + w _ {3 2} w _ {2 1} b _ {1}) ^ {\mathrm{T}}}\tag{8.17}

\begin{array}{r l r} {\pmb {\Sigma}} & {=} & {\left( \begin{array}{c c c} v _ {1} & w _ {2 1} v _ {1} & w _ {3 2} w _ {2 1} v _ {1} \\ w _ {2 1} v _ {1} & v _ {2} + w _ {2 1} ^ {2} v _ {1} & w _ {3 2} (v _ {2} + w _ {2 1} ^ {2} v _ {1}) \\ w _ {3 2} w _ {2 1} v _ {1} & w _ {3 2} (v _ {2} + w _ {2 1} ^ {2} v _ {1}) & v _ {3} + w _ {3 2} ^ {2} (v _ {2} + w _ {2 1} ^ {2} v _ {1}) \end{array} \right)} \end{array}\tag{8.18}

We can readily extend the linear-Gaussian graphical model to the case in which the nodes of the graph represent multivariate Gaussian variables. In this case, we can write the conditional distribution for node i in the form

p \left(\mathbf {x} _ {i} \mid \mathrm{pa} _ {i}\right) = \mathcal {N} \left(\mathbf {x} _ {i} \left| \sum_ {j \in \mathrm{pa} _ {i}} \mathbf {W} _ {i j} \mathbf {x} _ {j} + \mathbf {b} _ {i}, \boldsymbol {\Sigma} _ {i}\right) \right.\tag{8.19}

where now $\mathbf { W } _ { i j }$ is a matrix (which is nonsquare if $\mathbf { x } _ { i }$ and $\mathbf { x } _ { j }$ have different dimensionalities). Again it is easy to verify that the joint distribution over all variables is Gaussian.

Note that we have already encountered a specific example of the linear-Gaussian relationship when we saw that the conjugate prior for the mean $\pmb { \mu }$ of a Gaussian variable $\mathbf { x }$ is itself a Gaussian distribution over $\pmb { \mu } .$ . The joint distribution over x and $\pmb { \mu }$ is therefore Gaussian. This corresponds to a simple two-node graph in which the node representing $\pmb { \mu }$ is the parent of the node representing $\mathbf { x } .$ . The mean of the distribution over $\pmb { \mu }$ is a parameter controlling a prior, and so it can be viewed as a hyperparameter. Because the value of this hyperparameter may itself be unknown, we can again treat it from a Bayesian perspective by introducing a prior over the hyperparameter, sometimes called a hyperprior, which is again given by a Gaussian distribution. This type of construction can be extended in principle to any level and is an illustration of a hierarchical Bayesian model, of which we shall encounter further examples in later chapters.
