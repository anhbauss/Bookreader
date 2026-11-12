---
id: "tin-hieu-he-thong.5-5-5-training-with-transformed-data"
doc_id: "tin-hieu-he-thong"
title: "5.5.5 Training with transformed data"
level: 2
heading_path: ["Neural Networks", "5.5.5 Training with transformed data"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-5-4-tangent-propagation"
next_id: "tin-hieu-he-thong.5-5-6-convolutional-networks"
block_ids: ["b3029", "b3030", "b3031", "b3032", "b3033", "b3034", "b3035", "b3036", "b3037", "b3038", "b3039", "b3040", "b3041", "b3042", "b3043", "b3044", "b3045", "b3046", "b3047", "b3048", "b3049", "b3050", "b3051", "b3052", "b3053"]
---

## 5.5.5 Training with transformed data

We have seen that one way to encourage invariance of a model to a set of transformations is to expand the training set using transformed versions of the original input patterns. Here we show that this approach is closely related to the technique of tangent propagation (Bishop, 1995b; Leen, 1995).

As in Section 5.5.4, we shall consider a transformation governed by a single parameter $\xi$ and described by the function $\mathbf { s } ( \mathbf { x } , \boldsymbol { \xi } )$ , with $\mathbf { s } ( \mathbf { x } , 0 ) = \mathbf { x }$ . We shall also consider a sum-of-squares error function. The error function for untransformed inputs can be written (in the infinite data set limit) in the form

E = \frac {1}{2} \iint \{y (\mathbf {x}) - t \} ^ {2} p (t | \mathbf {x}) p (\mathbf {x}) \mathrm{d} \mathbf {x} \mathrm{d} t\tag{5.129}

as discussed in Section 1.5.5. Here we have considered a network having a single output, in order to keep the notation uncluttered. If we now consider an infinite number of copies of each data point, each of which is perturbed by the transformation in which the parameter $\xi$ is drawn from a distribution $p ( \xi )$ , then the error function defined over this expanded data set can be written as

\widetilde {E} = \frac {1}{2} \iiint \left\{y (\mathbf {s} (\mathbf {x}, \xi)) - t \right\} ^ {2} p (t | \mathbf {x}) p (\mathbf {x}) p (\xi) \mathrm{d} \mathbf {x} \mathrm{d} t \mathrm{d} \xi .\tag{5.130}

We now assume that the distribution $p ( \xi )$ has zero mean with small variance, so that we are only considering small transformations of the original input vectors. We can then expand the transformation function as a Taylor series in powers of $\xi$ to give

\begin{array}{r c l} \mathbf {s} (\mathbf {x}, \xi) & = & \mathbf {s} (\mathbf {x}, 0) + \xi \left. \frac {\partial}{\partial \xi} \mathbf {s} (\mathbf {x}, \xi) \right| _ {\xi = 0} + \frac {\xi^ {2}}{2} \left. \frac {\partial^ {2}}{\partial \xi^ {2}} \mathbf {s} (\mathbf {x}, \xi) \right| _ {\xi = 0} + O (\xi^ {3}) \\ & = & \mathbf {x} + \xi \boldsymbol {\tau} + \frac {1}{2} \xi^ {2} \boldsymbol {\tau} ^ {\prime} + O (\xi^ {3}) \end{array}

where $\tau ^ { \prime }$ denotes the second derivative of ${ \bf s } ( { \bf x } , \xi )$ with respect to $\xi$ evaluated at $\xi = 0$ This allows us to expand the model function to give

y (\mathbf {s} (\mathbf {x}, \xi)) = y (\mathbf {x}) + \xi \pmb {\tau} ^ {\mathrm{T}} \nabla y (\mathbf {x}) + \frac {\xi^ {2}}{2} \left[ (\pmb {\tau} ^ {\prime}) ^ {\mathrm{T}} \nabla y (\mathbf {x}) + \pmb {\tau} ^ {\mathrm{T}} \nabla \nabla y (\mathbf {x}) \pmb {\tau} \right] + O (\xi^ {3}).

Substituting into the mean error function (5.130) and expanding, we then have

\begin{array}{r c l} \widetilde {E} & = & \frac {1}{2} \iint \{y (\mathbf {x}) - t \} ^ {2} p (t | \mathbf {x}) p (\mathbf {x})   \mathrm{d} \mathbf {x}   \mathrm{d} t \\ & + & \mathbb {E} [ \xi ] \iint \{y (\mathbf {x}) - t \} \boldsymbol {\tau} ^ {\mathrm{T}} \nabla y (\mathbf {x}) p (t | \mathbf {x}) p (\mathbf {x})   \mathrm{d} \mathbf {x}   \mathrm{d} t \\ & + & \mathbb {E} [ \xi^ {2} ] \iint \left[ \{y (\mathbf {x}) - t \} \frac {1}{2} \left\{(\boldsymbol {\tau} ^ {\prime}) ^ {\mathrm{T}} \nabla y (\mathbf {x}) + \boldsymbol {\tau} ^ {\mathrm{T}} \nabla \nabla y (\mathbf {x}) \boldsymbol {\tau} \right\} \right. \\ & & \left. + \left(\boldsymbol {\tau} ^ {\mathrm{T}} \nabla y (\mathbf {x})\right) ^ {2} \right] p (t | \mathbf {x}) p (\mathbf {x})   \mathrm{d} \mathbf {x}   \mathrm{d} t + O (\xi^ {3}). \end{array}

Because the distribution of transformations has zero mean we have $\mathbb { E } [ \xi ] = 0$ . Also, we shall denote $\mathbb { E } [ \xi ^ { 2 } ]$ by $\lambda .$ Omitting terms of $O ( \xi ^ { 3 } )$ , the average error function then becomes

\widetilde {E} = E + \lambda \Omega\tag{5.131}

where $E$ is the original sum-of-squares error, and the regularization term $\Omega$ takes the form

\begin{array}{r c l} \Omega & = & \int \left[ \left\{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] \right\} \frac {1}{2} \left\{(\boldsymbol {\tau} ^ {\prime}) ^ {\mathrm{T}} \nabla y (\mathbf {x}) + \boldsymbol {\tau} ^ {\mathrm{T}} \nabla \nabla y (\mathbf {x}) \boldsymbol {\tau} \right\} \right. \\ & & \left. + \left(\boldsymbol {\tau} ^ {T} \nabla y (\mathbf {x})\right) ^ {2} \right] p (\mathbf {x})   \mathrm{d} \mathbf {x} \end{array}\tag{5.132}

in which we have performed the integration over $t .$

We can further simplify this regularization term as follows. In Section 1.5.5 we saw that the function that minimizes the sum-of-squares error is given by the conditional average $\mathbb { E } [ t | { \bf x } ]$ of the target values t. From (5.131) we see that the regularized error will equal the unregularized sum-of-squares plus terms which are $O ( \xi )$ , and so the network function that minimizes the total error will have the form

y (\mathbf {x}) = \mathbb {E} [ t | \mathbf {x} ] + O (\xi).\tag{5.133}

Thus, to leading order in $\xi ,$ , the first term in the regularizer vanishes and we are left with

\Omega = \frac {1}{2} \int \left(\pmb {\tau} ^ {T} \nabla y (\mathbf {x})\right) ^ {2} p (\mathbf {x}) \mathrm{d} \mathbf {x}\tag{5.134}

which is equivalent to the tangent propagation regularizer (5.128).

If we consider the special case in which the transformation of the inputs simply consists of the addition of random noise, so that $\textbf { x } \longrightarrow \textbf { x } + \pmb { \xi }$ , then the regularizer takes the form

\Omega = \frac {1}{2} \int \| \nabla y (\mathbf {x}) \| ^ {2} p (\mathbf {x}) \mathrm{d} \mathbf {x}\tag{5.135}

which is known as Tikhonov regularization (Tikhonov and Arsenin, 1977; Bishop, 1995b). Derivatives of this regularizer with respect to the network weights can be found using an extended backpropagation algorithm (Bishop, 1993). We see that, for small noise amplitudes, Tikhonov regularization is related to the addition of random noise to the inputs, which has been shown to improve generalization in appropriate circumstances (Sietsma and Dow, 1991).
