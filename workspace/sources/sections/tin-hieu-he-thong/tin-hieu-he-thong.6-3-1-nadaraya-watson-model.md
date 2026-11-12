---
id: "tin-hieu-he-thong.6-3-1-nadaraya-watson-model"
doc_id: "tin-hieu-he-thong"
title: "6.3.1 Nadaraya-Watson model"
level: 2
heading_path: ["Kernel Methods", "6.3.1 Nadaraya-Watson model"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.6-3-radial-basis-function-networks"
next_id: "tin-hieu-he-thong.6-4-gaussian-processes"
block_ids: ["b3451", "b3452", "b3453", "b3454", "b3455", "b3456", "b3457", "b3458", "b3459", "b3460", "b3461", "b3462", "b3463", "b3464", "b3465", "b3466", "b3467", "b3468", "b3469", "b3470", "b3471", "b3472", "b3473", "b3474"]
---

## 6.3.1 Nadaraya-Watson model

In Section 3.3.3, we saw that the prediction of a linear regression model for a new input x takes the form of a linear combination of the training set target values with coefficients given by the ‘equivalent kernel’ (3.62) where the equivalent kernel satisfies the summation constraint (3.64).

We can motivate the kernel regression model (3.61) from a different perspective, starting with kernel density estimation. Suppose we have a training set $\{ \mathbf { x } _ { n } , t _ { n } \}$ and we use a Parzen density estimator to model the joint distribution $\boldsymbol { p } ( \mathbf { x } , t )$ , so that

p (\mathbf {x}, t) = \frac {1}{N} \sum_ {n = 1} ^ {N} f (\mathbf {x} - \mathbf {x} _ {n}, t - t _ {n})\tag{6.42}

where $f ( \mathbf { x } , t )$ is the component density function, and there is one such component centred on each data point. We now find an expression for the regression function $y ( \mathbf x )$ , corresponding to the conditional average of the target variable conditioned on

the input variable, which is given by

\begin{array}{r c l} y (\mathbf {x}) & = & \mathbb {E} [ t | \mathbf {x} ] = \int_ {- \infty} ^ {\infty} t p (t | \mathbf {x})   \mathrm{d} t \\ & = & \frac {\int t p (\mathbf {x} , t)   \mathrm{d} t}{\int p (\mathbf {x} , t)   \mathrm{d} t} \\ & = & \frac {\sum_ {n} \int t f (\mathbf {x} - \mathbf {x} _ {n} , t - t _ {n})   \mathrm{d} t}{\sum_ {m} \int f (\mathbf {x} - \mathbf {x} _ {m} , t - t _ {m})   \mathrm{d} t}. \end{array}\tag{6.43}

We now assume for simplicity that the component density functions have zero mean so that

\int_ {- \infty} ^ {\infty} f (\mathbf {x}, t) t \mathrm{d} t = 0\tag{6.44}

for all values of x. Using a simple change of variable, we then obtain

\begin{array}{r c l} y (\mathbf {x}) & = & \frac {\sum_ {n} g (\mathbf {x} - \mathbf {x} _ {n}) t _ {n}}{\sum_ {m} g (\mathbf {x} - \mathbf {x} _ {m})} \\ & = & \sum_ {n} k (\mathbf {x}, \mathbf {x} _ {n}) t _ {n} \end{array}\tag{6.45}

where $n , m = 1 , \ldots , N$ and the kernel function $k ( \mathbf { x } , \mathbf { x } _ { n } )$ is given by

k (\mathbf {x}, \mathbf {x} _ {n}) = \frac {g (\mathbf {x} - \mathbf {x} _ {n})}{\sum_ {m} g (\mathbf {x} - \mathbf {x} _ {m})}\tag{6.46}

and we have defined

g (\mathbf {x}) = \int_ {- \infty} ^ {\infty} f (\mathbf {x}, t) \mathrm{d} t.\tag{6.47}

The result (6.45) is known as the Nadaraya-Watson model, or kernel regression (Nadaraya, 1964; Watson, 1964). For a localized kernel function, it has the property of giving more weight to the data points ${ \bf x } _ { n }$ that are close to x. Note that the kernel (6.46) satisfies the summation constraint

\sum_ {n = 1} ^ {N} k (\mathbf {x}, \mathbf {x} _ {n}) = 1.

Figure 6.3 Illustration of the Nadaraya-Watson kernel regression model using isotropic Gaussian kernels, for the sinusoidal data set. The original sine function is shown by the green curve, the data points are shown in blue, and each is the centre of an isotropic Gaussian kernel. The resulting regression function, given by the conditional mean, is shown by the red line, along with the twostandard-deviation region for the conditional distribution $p ( t | x )$ shown by the red shading. The blue ellipse around each data point shows one standard deviation contour for the corresponding kernel. These appear noncircular due to the different scales on the horizontal and vertical axes.

![image](images/part-002--1f702168b0d5afde8b41d4e22800d7ead91ada0a2003620b171e8356b049577f.jpg)

In fact, this model defines not only a conditional expectation but also a full conditional distribution given by

p (t | \mathbf {x}) = \frac {p (t , \mathbf {x})}{\int p (t , \mathbf {x}) \mathrm{d} t} = \frac {\sum_ {n} f (\mathbf {x} - \mathbf {x} _ {n} , t - t _ {n})}{\sum_ {m} \int f (\mathbf {x} - \mathbf {x} _ {m} , t - t _ {m}) \mathrm{d} t}\tag{6.48}

from which other expectations can be evaluated.

As an illustration we consider the case of a single input variable x in which $f ( x , t )$ is given by a zero-mean isotropic Gaussian over the variable ${ \bf z } = ( x , t )$ with variance $\bar { \sigma ^ { 2 } }$ . The corresponding conditional distribution (6.48) is given by a Gaussian mixture, and is shown, together with the conditional mean, for the sinusoidal synthetic data set in Figure 6.3.

An obvious extension of this model is to allow for more flexible forms of Gaussian components, for instance having different variance parameters for the input and target variables. More generally, we could model the joint distribution $p ( t , \mathbf { x } )$ using a Gaussian mixture model, trained using techniques discussed in Chapter 9 (Ghahramani and Jordan, 1994), and then find the corresponding conditional distribution $p ( t | \mathbf { x } )$ . In this latter case we no longer have a representation in terms of kernel functions evaluated at the training set data points. However, the number of components in the mixture model can be smaller than the number of training set points, resulting in a model that is faster to evaluate for test data points. We have thereby accepted an increased computational cost during the training phase in order to have a model that is faster at making predictions.
