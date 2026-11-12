---
id: "tin-hieu-he-thong.3-1-linear-basis-function-models"
doc_id: "tin-hieu-he-thong"
title: "3.1. Linear Basis Function Models"
level: 2
heading_path: ["3 Linear Models for Regression", "3.1. Linear Basis Function Models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-linear-models-for-regression"
next_id: "tin-hieu-he-thong.3-1-1-maximum-likelihood-and-least-squares"
block_ids: ["b1630", "b1631", "b1632", "b1633", "b1634", "b1635", "b1636", "b1637", "b1638", "b1639", "b1640", "b1641", "b1642", "b1643", "b1644", "b1645", "b1646", "b1647", "b1648", "b1649", "b1650", "b1651", "b1652", "b1653", "b1654"]
---

## 3.1. Linear Basis Function Models

The simplest linear model for regression is one that involves a linear combination of the input variables

y (\mathbf {x}, \mathbf {w}) = w _ {0} + w _ {1} x _ {1} + \ldots + w _ {D} x _ {D}\tag{3.1}

where $\mathbf x = ( x _ { 1 } , \dots , x _ { D } ) ^ { \mathrm T }$ . This is often simply known as linear regression. The key property of this model is that it is a linear function of the parameters $w _ { 0 } , \ldots , w _ { D }$ . It is also, however, a linear function of the input variables $x _ { i }$ , and this imposes significant limitations on the model. We therefore extend the class of models by considering linear combinations of fixed nonlinear functions of the input variables, of the form

y (\mathbf {x}, \mathbf {w}) = w _ {0} + \sum_ {j = 1} ^ {M - 1} w _ {j} \phi_ {j} (\mathbf {x})\tag{3.2}

where $\phi _ { j } ( \mathbf { x } )$ are known as basis functions. By denoting the maximum value of the index $j$ by $M - 1$ , the total number of parameters in this model will be M.

The parameter $w _ { 0 }$ allows for any fixed offset in the data and is sometimes called a bias parameter (not to be confused with ‘bias’ in a statistical sense). It is often convenient to define an additional dummy ‘basis function $\phi _ { 0 } ( \mathbf { x } ) = 1$ so that

y (\mathbf {x}, \mathbf {w}) = \sum_ {j = 0} ^ {M - 1} w _ {j} \phi_ {j} (\mathbf {x}) = \mathbf {w} ^ {\mathrm{T}} \boldsymbol {\phi} (\mathbf {x})\tag{3.3}

where $\mathbf { w } = ( w _ { 0 } , \hdots , w _ { M - 1 } ) ^ { \mathrm { T } }$ and ${ \boldsymbol { \phi } } = \left( \phi _ { 0 } , \ldots , \phi _ { M - 1 } \right) ^ { \mathrm { T } }$ . In many practical applications of pattern recognition, we will apply some form of fixed pre-processing, or feature extraction, to the original data variables. If the original variables comprise the vector x, then the features can be expressed in terms of the basis functions $\{ \phi _ { j } ( \mathbf { x } ) \}$

By using nonlinear basis functions, we allow the function $y ( \mathbf { x } , \mathbf { w } )$ to be a nonlinear function of the input vector x. Functions of the form (3.2) are called linear models, however, because this function is linear in w. It is this linearity in the parameters that will greatly simplify the analysis of this class of models. However, it also leads to some significant limitations, as we discuss in Section 3.6.

The example of polynomial regression considered in Chapter 1 is a particular example of this model in which there is a single input variable x, and the basis functions take the form of powers of x so that $\phi _ { j } ( x ) = x ^ { j }$ . One limitation of polynomial basis functions is that they are global functions of the input variable, so that changes in one region of input space affect all other regions. This can be resolved by dividing the input space up into regions and fit a different polynomial in each region, leading to splinefunctions (Hastie et al., 2001).

There are many other possible choices for the basis functions, for example

\phi_ {j} (x) = \exp \left\{- \frac {(x - \mu_ {j}) ^ {2}}{2 s ^ {2}} \right\}\tag{3.4}

where the $\mu _ { j }$ govern the locations of the basis functions in input space, and the parameter s governs their spatial scale. These are usually referred to as ‘Gaussian’ basis functions, although it should be noted that they are not required to have a probabilistic interpretation, and in particular the normalization coefficient is unimportant because these basis functions will be multiplied by adaptive parameters $w _ { j }$

Another possibility is the sigmoidal basis function of the form

\phi_ {j} (x) = \sigma \left(\frac {x - \mu_ {j}}{s}\right)\tag{3.5}

where $\sigma ( a )$ is the logistic sigmoid function defined by

\sigma (a) = \frac {1}{1 + \exp (- a)}.\tag{3.6}

Equivalently, we can use the ‘tanh’ function because this is related to the logistic sigmoid by tanh $( a ) = 2 \sigma ( a ) - 1$ , and so a general linear combination of logistic sigmoid functions is equivalent to a general linear combination of ‘tanh’ functions. These various choices of basis function are illustrated in Figure 3.1.

Yet another possible choice of basis function is the Fourier basis, which leads to an expansion in sinusoidal functions. Each basis function represents a specific frequency and has infinite spatial extent. By contrast, basis functions that are localized to finite regions of input space necessarily comprise a spectrum of different spatial frequencies. In many signal processing applications, it is of interest to consider basis functions that are localized in both space and frequency, leading to a class of functions known as wavelets. These are also defined to be mutually orthogonal, to simplify their application. Wavelets are most applicable when the input values live on a regular lattice, such as the successive time points in a temporal sequence, or the pixels in an image. Useful texts on wavelets include Ogden (1997), Mallat (1999), and Vidakovic (1999).

![image](images/part-001--a8a5bc7bb56ef5f21d53386002d76701b597226e14de35df6c9685274c8b2f4a.jpg)

![image](images/part-001--7f4655c81ed639ba4583df1455aa7c450b50fa24cd3cfb8d5d0e6d337d3ed69a.jpg)

![image](images/part-001--32df59afe91d327eb0788e63ab1da5733ebd2592e691f9ac2b1a37551d08508f.jpg)

Figure 3.1 Examples of basis functions, showing polynomials on the left, Gaussians of the form (3.4) in the centre, and sigmoidal of the form (3.5) on the right.

Most of the discussion in this chapter, however, is independent of the particular choice of basis function set, and so for most of our discussion we shall not specify the particular form of the basis functions, except for the purposes of numerical illustration. Indeed, much of our discussion will be equally applicable to the situation in which the vector $\phi ( \mathbf { x } )$ of basis functions is simply the identity $\phi ( \mathbf { x } ) = \mathbf { x } .$ Furthermore, in order to keep the notation simple, we shall focus on the case of a single target variable t. However, in Section 3.1.5, we consider briefly the modifications needed to deal with multiple target variables.
