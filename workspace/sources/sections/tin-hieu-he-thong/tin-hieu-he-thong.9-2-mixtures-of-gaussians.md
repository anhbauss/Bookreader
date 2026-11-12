---
id: "tin-hieu-he-thong.9-2-mixtures-of-gaussians"
doc_id: "tin-hieu-he-thong"
title: "9.2. Mixtures of Gaussians"
level: 2
heading_path: ["Mixture Models and EM", "9.2. Mixtures of Gaussians"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-1-1-image-segmentation-and-compression"
next_id: "tin-hieu-he-thong.9-2-1-maximum-likelihood"
block_ids: ["b4744", "b4745", "b4746", "b4747", "b4748", "b4749", "b4750", "b4751", "b4752", "b4753", "b4754", "b4755", "b4756", "b4757", "b4758", "b4759", "b4760", "b4761", "b4762", "b4763", "b4764", "b4765", "b4766", "b4767", "b4768", "b4769", "b4770", "b4771", "b4772"]
---

## 9.2. Mixtures of Gaussians

In Section 2.3.9 we motivated the Gaussian mixture model as a simple linear superposition of Gaussian components, aimed at providing a richer class of density models than the single Gaussian. We now turn to a formulation of Gaussian mixtures in terms of discrete latent variables. This will provide us with a deeper insight into this important distribution, and will also serve to motivate the expectation-maximization algorithm.

Recall from (2.188) that the Gaussian mixture distribution can be written as a linear superposition of Gaussians in the form

p (\mathbf {x}) = \sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}).\tag{9.7}

Let us introduce a K-dimensional binary random variable z having a 1-of-K representation in which a particular element $z _ { k }$ is equal to 1 and all other elements are equal to 0. The values of $z _ { k }$ therefore satisfy $z _ { k } \in \{ 0 , 1 \}$ and $\textstyle \sum _ { k } z _ { k } = 1$ , and we see that there are K possible states for the vector z according to which element is nonzero. We shall define the joint distribution $p ( \mathbf { x } , \mathbf { z } )$ in terms of a marginal distribution $p ( \mathbf { z } )$ and a conditional distribution $p ( \mathbf { x } | \mathbf { z } )$ , corresponding to the graphical model in Figure 9.4. The marginal distribution over z is specified in terms of the mixing coefficients $\pi _ { k }$ , such that

p (z _ {k} = 1) = \pi_ {k}

Figure 9.4 Graphical representation of a mixture model, in which the joint distribution is expressed in the form $p ( \mathbf { x } , \mathbf { z } ) \ =$ $p ( \mathbf { z } ) p ( \mathbf { x } | \mathbf { z } )$

![image](images/part-003--90414c10649ae5d37ac6e58c73051addda74b6732836eb2c208773a7ecd5152e.jpg)

where the parameters $\left\{ \pi _ { k } \right\}$ must satisfy

0 \leqslant \pi_ {k} \leqslant 1\tag{9.8}

together with

\sum_ {k = 1} ^ {K} \pi_ {k} = 1\tag{9.9}

in order to be valid probabilities. Because z uses a 1-of-K representation, we can also write this distribution in the form

p (\mathbf {z}) = \prod_ {k = 1} ^ {K} \pi_ {k} ^ {z _ {k}}.\tag{9.10}

Similarly, the conditional distribution of x given a particular value for z is a Gaussian

p (\mathbf {x} | z _ {k} = 1) = \mathcal {N} (\mathbf {x} | \pmb {\mu} _ {k}, \pmb {\Sigma} _ {k})

which can also be written in the form

p (\mathbf {x} | \mathbf {z}) = \prod_ {k = 1} ^ {K} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k}) ^ {z _ {k}}.\tag{9.11}

Exercise 9.3

The joint distribution is given by $p ( \mathbf { z } ) p ( \mathbf { x } | \mathbf { z } )$ , and the marginal distribution of x is then obtained by summing the joint distribution over all possible states of z to give

p (\mathbf {x}) = \sum_ {\mathbf {z}} p (\mathbf {z}) p (\mathbf {x} | \mathbf {z}) = \sum_ {k = 1} ^ {K} \pi_ {k} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {k}, \boldsymbol {\Sigma} _ {k})\tag{9.12}

where we have made use of (9.10) and (9.11). Thus the marginal distribution of x is a Gaussian mixture of the form (9.7). If we have several observations $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ then, because we have represented the marginal distribution in the form $p ( \mathbf { x } ) \mathbf { \alpha } = \mathbf { \alpha }$ $\begin{array} { r } { \sum _ { \mathbf { z } } p ( \mathbf { x } , \mathbf { z } ) } \end{array}$ , it follows that for every observed data point ${ \bf x } _ { n }$ there is a corresponding latent variable $\mathbf { z } _ { n }$

We have therefore found an equivalent formulation of the Gaussian mixture involving an explicit latent variable. It might seem that we have not gained much by doing so. However, we are now able to work with the joint distribution $p ( \mathbf { x } , \mathbf { z } )$

instead of the marginal distribution $p ( \mathbf { x } )$ , and this will lead to significant simplifications, most notably through the introduction of the expectation-maximization (EM) algorithm.

Another quantity that will play an important role is the conditional probability of z given x. We shall use $\gamma ( \boldsymbol { z } _ { k } )$ to denote $p ( z _ { k } = 1 | \mathbf { x } )$ , whose value can be found using Bayes’ theorem

\begin{array}{l l l} \gamma (z _ {k}) \equiv p (z _ {k} = 1 | \mathbf {x}) & = & \frac {p (z _ {k} = 1) p (\mathbf {x} | z _ {k} = 1)}{K} \\ & & \sum_ {j = 1} ^ {K} p (z _ {j} = 1) p (\mathbf {x} | z _ {j} = 1) \\ & = & \frac {\pi_ {k} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {k} , \boldsymbol {\Sigma} _ {k})}{K}. \\ & & \sum_ {j = 1} ^ {K} \pi_ {j} \mathcal {N} (\mathbf {x} | \boldsymbol {\mu} _ {j}, \boldsymbol {\Sigma} _ {j}) \end{array}\tag{9.13}

We shall view $\pi _ { k }$ as the prior probability of $z _ { k } = 1$ , and the quantity $\gamma ( \boldsymbol { z } _ { k } )$ as the corresponding posterior probability once we have observed x. As we shall see later, $\gamma ( \boldsymbol { z } _ { k } )$ can also be viewed as the responsibility that component k takes for ‘explaining’ the observation x.

We can use the technique of ancestral sampling to generate random samples distributed according to the Gaussian mixture model. To do this, we first generate a value for $\mathbf { z } ,$ which we denote ${ \widehat { \mathbf { z } } } ,$ , from the marginal distribution $p ( \mathbf { z } )$ and then generate a value for x from the conditional distribution $p ( \mathbf { x } | \widehat { \mathbf { z } } )$ . Techniques for sampling from standard distributions are discussed in Chapter 11. We can depict samples from the joint distribution $p ( \mathbf { x } , \mathbf { z } )$ by plotting points at the corresponding values of x and then colouring them according to the value of $\mathbf { z } ,$ in other words according to which Gaussian component was responsible for generating them, as shown in Figure 9.5(a). Similarly samples from the marginal distribution $p ( \mathbf { x } )$ are obtained by taking the samples from the joint distribution and ignoring the values of $\mathbf { z } .$ . These are illustrated in Figure 9.5(b) by plotting the x values without any coloured labels.

We can also use this synthetic data set to illustrate the ‘responsibilities’ by evaluating, for every data point, the posterior probability for each component in the mixture distribution from which this data set was generated. In particular, we can represent the value of the responsibilities $\gamma ( z _ { n k } )$ associated with data point ${ \bf x } _ { n }$ by plotting the corresponding point using proportions of red, blue, and green ink given by $\gamma ( z _ { n k } )$ for $k = 1 , 2 , 3$ , respectively, as shown in Figure 9.5(c). So, for instance, a data point for which $\gamma ( z _ { n 1 } ) = 1$ will be coloured red, whereas one for which $\gamma ( z _ { n 2 } ) = \gamma ( z _ { n 3 } ) = 0 . 5$ will be coloured with equal proportions of blue and green ink and so will appear cyan. This should be compared with Figure 9.5(a) in which the data points were labelled using the true identity of the component from which they were generated.
