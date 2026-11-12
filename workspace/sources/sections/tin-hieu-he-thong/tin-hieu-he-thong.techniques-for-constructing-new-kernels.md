---
id: "tin-hieu-he-thong.techniques-for-constructing-new-kernels"
doc_id: "tin-hieu-he-thong"
title: "Techniques for Constructing New Kernels."
level: 2
heading_path: ["Kernel Methods", "Techniques for Constructing New Kernels."]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-2-constructing-kernels"
next_id: "tin-hieu-he-thong.6-3-radial-basis-function-networks"
block_ids: ["b3377", "b3378", "b3379", "b3380", "b3381", "b3382", "b3383", "b3384", "b3385", "b3386", "b3387", "b3388", "b3389", "b3390", "b3391", "b3392", "b3393", "b3394", "b3395", "b3396", "b3397", "b3398", "b3399", "b3400", "b3401", "b3402", "b3403", "b3404", "b3405", "b3406", "b3407", "b3408", "b3409", "b3410", "b3411", "b3412", "b3413", "b3414", "b3415", "b3416", "b3417", "b3418", "b3419", "b3420", "b3421", "b3422", "b3423", "b3424", "b3425", "b3426", "b3427", "b3428", "b3429", "b3430"]
---

## Techniques for Constructing New Kernels.

Given valid kernels $k _ { 1 } ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ and $k _ { 2 } ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ , the following new kernels will also be valid:

{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {c k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime})}\tag{6.13}

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = f (\mathbf {x}) k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}) f (\mathbf {x} ^ {\prime})\tag{6.14}

{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {q (k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}))}\tag{6.15}

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp (k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}))\tag{6.16}

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}) + k _ {2} (\mathbf {x}, \mathbf {x} ^ {\prime})\tag{6.17}

{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {k _ {1} (\mathbf {x}, \mathbf {x} ^ {\prime}) k _ {2} (\mathbf {x}, \mathbf {x} ^ {\prime})}\tag{6.18}

{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {k _ {3} (\phi (\mathbf {x}), \phi (\mathbf {x} ^ {\prime}))}\tag{6.19}

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \mathbf {x} ^ {\mathrm{T}} \mathbf {A} \mathbf {x} ^ {\prime}\tag{6.20}

{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {k _ {a} (\mathbf {x} _ {a}, \mathbf {x} _ {a} ^ {\prime}) + k _ {b} (\mathbf {x} _ {b}, \mathbf {x} _ {b} ^ {\prime})}\tag{6.21}

{k (\mathbf {x}, \mathbf {x} ^ {\prime})} = {k _ {a} (\mathbf {x} _ {a}, \mathbf {x} _ {a} ^ {\prime}) k _ {b} (\mathbf {x} _ {b}, \mathbf {x} _ {b} ^ {\prime})}\tag{6.22}

where $c > 0$ is a constant, $f ( \cdot )$ is any function, $q ( \cdot )$ is a polynomial with nonnegative coefficients, $\phi ( \mathbf { x } )$ is a function from x to $\bar { \mathbb { R } ^ { M } } , k _ { 3 } ( \cdot , \cdot )$ is a valid kernel in $\mathbb { R } ^ { M }$ , A is a symmetric positive semidefinite matrix, $\mathbf { x } _ { a }$ and $\mathbf { x } _ { b }$ are variables (not necessarily disjoint) with $\mathbf { x } = ( \mathbf { x } _ { a } , \mathbf { x } _ { b } )$ , and $k _ { a }$ and $k _ { b }$ are valid kernel functions over their respective spaces.

Equipped with these properties, we can now embark on the construction of more complex kernels appropriate to specific applications. We require that the kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ be symmetric and positive semidefinite and that it expresses the appropriate form of similarity between x and $\mathbf { x } ^ { \prime }$ according to the intended application. Here we consider a few common examples of kernel functions. For a more extensive discussion of ‘kernel engineering’, see Shawe-Taylor and Cristianini (2004).

We saw that the simple polynomial kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \left( \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime } \right) ^ { 2 }$ contains only terms of degree two. If we consider the slightly generalized kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) ~ =$ $\left( \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime } + c \right) ^ { 2 }$ with $c > 0$ , then the corresponding feature mapping $\phi ( \mathbf { x } )$ contains constant and linear terms as well as terms of order two. Similarly, $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \left( \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime } \right) ^ { M }$ contains all monomials of order M. For instance, if x and $\mathbf { x } ^ { \prime }$ are two images, then the kernel represents a particular weighted sum of all possible products of M pixels in the first image with M pixels in the second image. This can similarly be generalized to include all terms up to degree M by considering $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \left( \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime } + c \right) ^ { M }$ with $c > 0$ . Using the results (6.17) and (6.18) for combining kernels we see that these will all be valid kernel functions.

Another commonly used kernel takes the form

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp \left(- \| \mathbf {x} - \mathbf {x} ^ {\prime} \| ^ {2} / 2 \sigma^ {2}\right)\tag{6.23}

and is often called a ‘Gaussian’ kernel. Note, however, that in this context it is not interpreted as a probability density, and hence the normalization coefficient is omitted. We can see that this is a valid kernel by expanding the square

\left\| \mathbf {x} - \mathbf {x} ^ {\prime} \right\| ^ {2} = \mathbf {x} ^ {\mathrm{T}} \mathbf {x} + \left(\mathbf {x} ^ {\prime}\right) ^ {\mathrm{T}} \mathbf {x} ^ {\prime} - 2 \mathbf {x} ^ {\mathrm{T}} \mathbf {x} ^ {\prime}\tag{6.24}

to give

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp \left(- \mathbf {x} ^ {\mathrm{T}} \mathbf {x} / 2 \sigma^ {2}\right) \exp \left(\mathbf {x} ^ {\mathrm{T}} \mathbf {x} ^ {\prime} / \sigma^ {2}\right) \exp \left(- (\mathbf {x} ^ {\prime}) ^ {\mathrm{T}} \mathbf {x} ^ {\prime} / 2 \sigma^ {2}\right)\tag{6.25}

and then making use of (6.14) and (6.16), together with the validity of the linear kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ . Note that the feature vector that corresponds to the Gaussian kernel has infinite dimensionality.

The Gaussian kernel is not restricted to the use of Euclidean distance. If we use kernel substitution in (6.24) to replace $\mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ with a nonlinear kernel $\kappa ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ , we obtain

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp \left\{- \frac {1}{2 \sigma^ {2}} \left(\kappa (\mathbf {x}, \mathbf {x}) + \kappa (\mathbf {x} ^ {\prime}, \mathbf {x} ^ {\prime}) - 2 \kappa (\mathbf {x}, \mathbf {x} ^ {\prime})\right) \right\}.\tag{6.26}

An important contribution to arise from the kernel viewpoint has been the extension to inputs that are symbolic, rather than simply vectors of real numbers. Kernel functions can be defined over objects as diverse as graphs, sets, strings, and text documents. Consider, for instance, a fixed set and define a nonvectorial space consisting of all possible subsets of this set. If $A _ { 1 }$ and $A _ { 2 }$ are two such subsets then one simple choice of kernel would be

k (A _ {1}, A _ {2}) = 2 ^ {| A _ {1} \cap A _ {2} |}\tag{6.27}

where $A _ { 1 } \cap A _ { 2 }$ denotes the intersection of sets $A _ { 1 }$ and $A _ { 2 }$ , and $| A |$ denotes the number of subsets in A. This is a valid kernel function because it can be shown to correspond to an inner product in a feature space.

One powerful approach to the construction of kernels starts from a probabilistic generative model (Haussler, 1999), which allows us to apply generative models in a discriminative setting. Generative models can deal naturally with missing data and in the case of hidden Markov models can handle sequences of varying length. By contrast, discriminative models generally give better performance on discriminative tasks than generative models. It is therefore of some interest to combine these two approaches (Lasserre et al., 2006). One way to combine them is to use a generative model to define a kernel, and then use this kernel in a discriminative approach.

Given a generative model $p ( \mathbf { x } )$ we can define a kernel by

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = p (\mathbf {x}) p (\mathbf {x} ^ {\prime}).\tag{6.28}

This is clearly a valid kernel function because we can interpret it as an inner product in the one-dimensional feature space defined by the mapping $p ( \mathbf { x } )$ . It says that two inputs x and $\mathbf { x } ^ { \prime }$ are similar if they both have high probabilities. We can use (6.13) and (6.17) to extend this class of kernels by considering sums over products of different probability distributions, with positive weighting coefficients $p ( i )$ , of the form

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \sum_ {i} p (\mathbf {x} | i) p (\mathbf {x} ^ {\prime} | i) p (i).\tag{6.29}

This is equivalent, up to an overall multiplicative constant, to a mixture distribution in which the components factorize, with the index i playing the role of a ‘latent variable. Two inputs x and $\mathbf { x } ^ { \prime }$ will give a large value for the kernel function, and hence appear similar, if they have significant probability under a range of different components. Taking the limit of an infinite sum, we can also consider kernels of the form

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \int p (\mathbf {x} | \mathbf {z}) p (\mathbf {x} ^ {\prime} | \mathbf {z}) p (\mathbf {z}) d \mathbf {z}\tag{6.30}

where z is a continuous latent variable.

Now suppose that our data consists of ordered sequences of length $L$ so that an observation is given by $\textbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { L } \}$ . A popular generative model for sequences is the hidden Markov model, which expresses the distribution $p ( \mathbf { X } )$ as a marginalization over a corresponding sequence of hidden states $\mathbf { Z } = \{ \mathbf { z } _ { 1 } , \ldots , \mathbf { z } _ { L } \}$ We can use this approach to define a kernel function measuring the similarity of two sequences X and $\mathbf { X } ^ { \prime }$ by extending the mixture representation (6.29) to give

k (\mathbf {X}, \mathbf {X} ^ {\prime}) = \sum_ {\mathbf {Z}} p (\mathbf {X} | \mathbf {Z}) p (\mathbf {X} ^ {\prime} | \mathbf {Z}) p (\mathbf {Z})\tag{6.31}

so that both observed sequences are generated by the same hidden sequence Z. This model can easily be extended to allow sequences of differing length to be compared.

An alternative technique for using generative models to define kernel functions is known as the Fisher kernel (Jaakkola and Haussler, 1999). Consider a parametric generative model $p ( \mathbf { x } | \mathbf { \boldsymbol { \theta } } )$ where $\pmb \theta$ denotes the vector of parameters. The goal is to find a kernel that measures the similarity of two input vectors x and $\mathbf { x } ^ { \prime }$ induced by the generative model. Jaakkola and Haussler (1999) consider the gradient with respect to $\theta ,$ which defines a vector in a ‘feature’ space having the same dimensionality as θ. In particular, they consider the Fisher score

\mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) = \nabla_ {\boldsymbol {\theta}} \ln p (\mathbf {x} | \boldsymbol {\theta})\tag{6.32}

from which the Fisher kernel is defined by

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) ^ {\mathrm{T}} \mathbf {F} ^ {- 1} \mathbf {g} (\boldsymbol {\theta}, \mathbf {x} ^ {\prime}).\tag{6.33}

Here F is the Fisher information matrix, given by

\mathbf {F} = \mathbb {E} _ {\mathbf {x}} \left[ \mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) \mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) ^ {\mathrm{T}} \right]\tag{6.34}

where the expectation is with respect to x under the distribution $p ( \mathbf { x } | \mathbf { \boldsymbol { \theta } } )$ . This can be motivated from the perspective of information geometry (Amari, 1998), which considers the differential geometry of the space of model parameters. Here we simply note that the presence of the Fisher information matrix causes this kernel to be invariant under a nonlinear re-parameterization of the density model $\theta  \psi ( \theta )$

In practice, it is often infeasible to evaluate the Fisher information matrix. One approach is simply to replace the expectation in the definition of the Fisher information with the sample average, giving

\mathbf {F} \simeq \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {g} (\boldsymbol {\theta}, \mathbf {x} _ {n}) \mathbf {g} (\boldsymbol {\theta}, \mathbf {x} _ {n}) ^ {\mathrm{T}}.\tag{6.35}

Section 12.1.3

This is the covariance matrix of the Fisher scores, and so the Fisher kernel corresponds to a whitening of these scores. More simply, we can just omit the Fisher information matrix altogether and use the noninvariant kernel

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \mathbf {g} (\boldsymbol {\theta}, \mathbf {x}) ^ {\mathrm{T}} \mathbf {g} (\boldsymbol {\theta}, \mathbf {x} ^ {\prime}).\tag{6.36}

An application of Fisher kernels to document retrieval is given by Hofmann (2000). A final example of a kernel function is the sigmoidal kernel given by

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \tanh \left(a \mathbf {x} ^ {\mathrm{T}} \mathbf {x} ^ {\prime} + b\right)\tag{6.37}

whose Gram matrix in general is not positive semidefinite. This form of kernel has, however, been used in practice (Vapnik, 1995), possibly because it gives kernel expansions such as the support vector machine a superficial resemblance to neural network models. As we shall see, in the limit of an infinite number of basis functions, a Bayesian neural network with an appropriate prior reduces to a Gaussian process, thereby providing a deeper link between neural networks and kernel methods.

Section 6.4.7
