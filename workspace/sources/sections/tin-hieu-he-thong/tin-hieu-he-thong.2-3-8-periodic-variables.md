---
id: "tin-hieu-he-thong.2-3-8-periodic-variables"
doc_id: "tin-hieu-he-thong"
title: "2.3.8 Periodic variables"
level: 2
heading_path: ["Probability Distributions", "2.3.8 Periodic variables"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-7-student-s-t-distribution"
next_id: "tin-hieu-he-thong.2-3-9-mixtures-of-gaussians"
block_ids: ["b1218", "b1219", "b1220", "b1221", "b1222", "b1223", "b1224", "b1225", "b1226", "b1227", "b1228", "b1229", "b1230", "b1231", "b1232", "b1233", "b1234", "b1235", "b1236", "b1237", "b1238", "b1239", "b1240", "b1241", "b1242", "b1243", "b1244", "b1245", "b1246", "b1247", "b1248", "b1249", "b1250", "b1251", "b1252", "b1253", "b1254", "b1255", "b1256", "b1257", "b1258", "b1259", "b1260", "b1261", "b1262", "b1263", "b1264", "b1265", "b1266", "b1267", "b1268", "b1269", "b1270", "b1271", "b1272", "b1273", "b1274", "b1275", "b1276", "b1277", "b1278", "b1279", "b1280", "b1281", "b1282", "b1283", "b1284", "b1285", "b1286"]
---

## 2.3.8 Periodic variables

Although Gaussian distributions are of great practical significance, both in their own right and as building blocks for more complex probabilistic models, there are situations in which they are inappropriate as density models for continuous variables. One important case, which arises in practical applications, is that of periodic variables.

An example of a periodic variable would be the wind direction at a particular geographical location. We might, for instance, measure values of wind direction on a number of days and wish to summarize this using a parametric distribution. Another example is calendar time, where we may be interested in modelling quantities that are believed to be periodic over 24 hours or over an annual cycle. Such quantities can conveniently be represented using an angular (polar) coordinate $0 \leqslant \theta < 2 \pi$

We might be tempted to treat periodic variables by choosing some direction as the origin and then applying a conventional distribution such as the Gaussian. Such an approach, however, would give results that were strongly dependent on the arbitrary choice of origin. Suppose, for instance, that we have two observations at $\theta _ { 1 } = 1 ^ { \circ }$ and $\theta _ { 2 } = 3 5 9 ^ { \circ }$ , and we model them using a standard univariate Gaussian distribution. If we choose the origin at $0 ^ { \circ }$ , then the sample mean of this data set will be $1 8 0 ^ { \circ }$ with standard deviation $1 7 9 ^ { \circ }$ , whereas if we choose the origin at $1 8 0 ^ { \circ }$ then the mean will be $0 ^ { \circ }$ and the standard deviation will be 1◦. We clearly need to develop a special approach for the treatment of periodic variables.

Let us consider the problem of evaluating the mean of a set of observations $\mathcal { D } = \{ \theta _ { 1 } , . . . , \theta _ { N } \}$ of a periodic variable. From now on, we shall assume that θ is measured in radians. We have already seen that the simple average $( \theta _ { 1 } + \cdot \cdot \cdot + \theta _ { N } ) / N$ will be strongly coordinate dependent. To find an invariant measure of the mean, we note that the observations can be viewed as points on the unit circle and can therefore be described instead by two-dimensional unit vectors $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ where $\| \mathbf { x } _ { n } \| = 1$ for $n = 1 , \ldots , N$ , as illustrated in Figure 2.17. We can average the vectors $\left\{ \mathbf { x } _ { n } \right\}$

Figure 2.17 Illustration of the representation of values $\theta _ { n }$ of a periodic variable as twodimensional vectors ${ \bf x } _ { n }$ living on the unit circle. Also shown is the average $\overline { { \bf x } }$ of those vectors.

![image](images/part-001--760bf6e06a9e91e2f9dde2cb32178c2ee3669d4dee8556d6b58128d90d8769fb.jpg)

instead to give

\overline {{\mathbf {x}}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n}\tag{2.167}

and then find the corresponding angle $\overline { { \theta } }$ of this average. Clearly, this definition will ensure that the location of the mean is independent of the origin of the angular coordinate. Note that x will typically lie inside the unit circle. The Cartesian coordinates of the observations are given by ${ \bf x } _ { n } = ( \cos \theta _ { n } , \sin \theta _ { n } )$ , and we can write the Cartesian coordinates of the sample mean in the form $\mathbf { \overline { { x } } } = ( \overline { { r } } \cos \overline { { \theta } } , \overline { { r } } \sin \overline { { \theta } } )$ . Substituting into (2.167) and equating the $x _ { 1 }$ and $x _ { 2 }$ components then gives

\overline {{r}} \cos \overline {{\theta}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \cos \theta_ {n},

\overline {{r}} \sin \overline {{\theta}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \sin \theta_ {n}.\tag{2.168}

Taking the ratio, and using the identity tan $\theta = \sin \theta /$ cos $\theta ,$ we can solve for $\overline { { \theta } }$ to give

\overline {{\theta}} = \tan^ {- 1} \left\{\frac {\sum_ {n} \sin \theta_ {n}}{\sum_ {n} \cos \theta_ {n}} \right\}.\tag{2.169}

Shortly, we shall see how this result arises naturally as the maximum likelihood estimator for an appropriately defined distribution over a periodic variable.

We now consider a periodic generalization of the Gaussian called the von Mises distribution. Here we shall limit our attention to univariate distributions, although periodic distributions can also be found over hyperspheres of arbitrary dimension. For an extensive discussion of periodic distributions, see Mardia and Jupp (2000).

By convention, we will consider distributions $p ( \theta )$ that have period 2π. Any probability density $p ( \theta )$ defined over $\theta$ must not only be nonnegative and integrate

Figure 2.18 The von Mises distribution can be derived by considering a two-dimensional Gaussian of the form (2.173), whose density contours are shown in blue and conditioning on the unit circle shown in red.

![image](images/part-001--af6714f22455e353d868d01afde295d5671e6f74455bef9496f3053179fb509a.jpg)

to one, but it must also be periodic. Thus $p ( \theta )$ must satisfy the three conditions

p (\theta) \geqslant 0\tag{2.170}

\int_ {0} ^ {2 \pi} p (\theta) \mathrm{d} \theta = 1\tag{2.171}

p (\theta + 2 \pi) = p (\theta).\tag{2.172}

From (2.172), it follows that $p ( \theta + M 2 \pi ) = p ( \theta )$ for any integer $M .$

We can easily obtain a Gaussian-like distribution that satisfies these three properties as follows. Consider a Gaussian distribution over two variables ${ \bf x } = ( x _ { 1 } , x _ { 2 } )$ having mean $\pmb { \mu } = ( \mu _ { 1 } , \mu _ { 2 } )$ and a covariance matrix $\pmb { \Sigma } = \sigma ^ { 2 } \mathbf { I }$ where I is the $2 \times 2$ identity matrix, so that

p (x _ {1}, x _ {2}) = \frac {1}{2 \pi \sigma^ {2}} \exp \left\{- \frac {(x _ {1} - \mu_ {1}) ^ {2} + (x _ {2} - \mu_ {2}) ^ {2}}{2 \sigma^ {2}} \right\}.\tag{2.173}

The contours of constant $p ( \mathbf { x } )$ are circles, as illustrated in Figure 2.18. Now suppose we consider the value of this distribution along a circle of fixed radius. Then by construction this distribution will be periodic, although it will not be normalized. We can determine the form of this distribution by transforming from Cartesian coordinates $( x _ { 1 } , x _ { 2 } )$ to polar coordinates $( r , \theta )$ so that

x _ {1} = r \cos \theta , \qquad x _ {2} = r \sin \theta .\tag{2.174}

We also map the mean $\pmb { \mu }$ into polar coordinates by writing

\mu_ {1} = r _ {0} \cos \theta_ {0}, \quad \mu_ {2} = r _ {0} \sin \theta_ {0}.\tag{2.175}

Next we substitute these transformations into the two-dimensional Gaussian distribution (2.173), and then condition on the unit circle $r = 1$ , noting that we are interested only in the dependence on $\theta .$ Focussing on the exponent in the Gaussian distribution we have

\begin{array}{r l} & {- \frac {1}{2 \sigma^ {2}} \left\{(r \cos \theta - r _ {0} \cos \theta_ {0}) ^ {2} + (r \sin \theta - r _ {0} \sin \theta_ {0}) ^ {2} \right\}} \\ & {\quad = - \frac {1}{2 \sigma^ {2}} \left\{1 + r _ {0} ^ {2} - 2 r _ {0} \cos \theta \cos \theta_ {0} - 2 r _ {0} \sin \theta \sin \theta_ {0} \right\}} \\ & {\quad = \frac {r _ {0}}{\sigma^ {2}} \cos (\theta - \theta_ {0}) + \mathrm{const}} \end{array}\tag{2.176}

![image](images/part-001--1a6c0bde71d3d9b65c31ce6116e7ba7986ff9670344478f0b49c834cc743c7e5.jpg)

![image](images/part-001--2de6f22eaab95ae6e7978d50352d8f2c66c3593758cf3d487f6fe2d5bb5e5011.jpg)

Figure 2.19 The von Mises distribution plotted for two different parameter values, shown as a Cartesian plot on the left and as the corresponding polar plot on the right.

Exercise 2.51

where ‘const’ denotes terms independent of $\mathbf { \partial } \cdot \theta ,$ , and we have made use of the following trigonometrical identities

\cos^ {2} A + \sin^ {2} A = 1\tag{2.177}

\cos A \cos B + \sin A \sin B = \cos (A - B).\tag{2.178}

If we now define $m = r _ { 0 } / \sigma ^ { 2 }$ , we obtain our final expression for the distribution of $p ( \theta )$ along the unit circle $r = 1$ in the form

p (\theta | \theta_ {0}, m) = \frac {1}{2 \pi I _ {0} (m)} \exp \left\{m \cos (\theta - \theta_ {0}) \right\}\tag{2.179}

which is called the von Mises distribution, or the circular normal. Here the parameter $\theta _ { 0 }$ corresponds to the mean of the distribution, while $m _ { : }$ , which is known as the concentration parameter, is analogous to the inverse variance (precision) for the Gaussian. The normalization coefficient in (2.179) is expressed in terms of $I _ { 0 } ( m )$ which is the zeroth-order Bessel function of the first kind (Abramowitz and Stegun, 1965) and is defined by

I _ {0} (m) = \frac {1}{2 \pi} \int_ {0} ^ {2 \pi} \exp \left\{m \cos \theta \right\} d \theta .\tag{2.180}

For large $m ,$ , the distribution becomes approximately Gaussian. The von Mises distribution is plotted in Figure 2.19, and the function $I _ { 0 } ( m )$ is plotted in Figure 2.20.

Now consider the maximum likelihood estimators for the parameters $\theta _ { 0 }$ and m for the von Mises distribution. The log likelihood function is given by

\ln p (\mathcal {D} | \theta_ {0}, m) = - N \ln (2 \pi) - N \ln I _ {0} (m) + m \sum_ {n = 1} ^ {N} \cos (\theta_ {n} - \theta_ {0}).\tag{2.181}

![image](images/part-001--505c01004c28cca6dfc51cb50356cbb4a7d391dc01c725376083ef9a9ecc4062.jpg)

![image](images/part-001--38916c9186f7b7b942bb746caf6f021afa0ba7cd8322e141c3769798c644c570.jpg)

Figure 2.20 Plot of the Bessel function $I _ { 0 } ( m )$ defined by (2.180), together with the function $A ( m )$ defined by (2.186).

Setting the derivative with respect to $\theta _ { 0 }$ equal to zero gives

\sum_ {n = 1} ^ {N} \sin (\theta_ {n} - \theta_ {0}) = 0.\tag{2.182}

To solve for $\theta _ { 0 }$ , we make use of the trigonometric identity

\sin (A - B) = \cos B \sin A - \cos A \sin B\tag{2.183}

Exercise 2.53

from which we obtain

\theta_ {0} ^ {\mathrm{ML}} = \tan^ {- 1} \left\{\frac {\sum_ {n} \sin \theta_ {n}}{\sum_ {n} \cos \theta_ {n}} \right\}\tag{2.184}

which we recognize as the result (2.169) obtained earlier for the mean of the observations viewed in a two-dimensional Cartesian space.

Similarly, maximizing (2.181) with respect to $m .$ , and making use of $I _ { 0 } ^ { \prime } ( m ) =$ $I _ { 1 } ( m )$ (Abramowitz and Stegun, 1965), we have

A (m) = \frac {1}{N} \sum_ {n = 1} ^ {N} \cos (\theta_ {n} - \theta_ {0} ^ {\mathrm{ML}})\tag{2.185}

where we have substituted for the maximum likelihood solution for $\theta _ { 0 } ^ { \mathrm { M L } }$ (recalling that we are performing a joint optimization over $\theta$ and $m )$ , and we have defined

A (m) = \frac {I _ {1} (m)}{I _ {0} (m)}.\tag{2.186}

The function $A ( m )$ is plotted in Figure 2.20. Making use of the trigonometric identity (2.178), we can write (2.185) in the form

A (m _ {\mathrm{ML}}) = \left(\frac {1}{N} \sum_ {n = 1} ^ {N} \cos \theta_ {n}\right) \cos \theta_ {0} ^ {\mathrm{ML}} - \left(\frac {1}{N} \sum_ {n = 1} ^ {N} \sin \theta_ {n}\right) \sin \theta_ {0} ^ {\mathrm{ML}}.\tag{2.187}

Figure 2.21 Plots of the ‘old faithful’ data in which the blue curves show contours of constant probability density. On the left is a single Gaussian distribution which has been fitted to the data using maximum likelihood. Note that this distribution fails to capture the two clumps in the data and indeed places much of its probability mass in the central region between the clumps where the data are relatively sparse. On the right the distribution is given by a linear combination of two Gaussians which has been fitted to the data by maximum likelihood using techniques discussed Chapter 9, and which gives a better representation of the data.

![image](images/part-001--5c041ba4ea6dfcb27cccee88222734c6f9cddb18711d6c2c731bae1fea4ac700.jpg)

![image](images/part-001--976b89f0a863a4ce1ee97dfc147b6a5b06ef50817a8a566e006a19d81d02c706.jpg)

The right-hand side of (2.187) is easily evaluated, and the function $A ( m )$ can be inverted numerically.

For completeness, we mention briefly some alternative techniques for the construction of periodic distributions. The simplest approach is to use a histogram of observations in which the angular coordinate is divided into fixed bins. This has the virtue of simplicity and flexibility but also suffers from significant limitations, as we shall see when we discuss histogram methods in more detail in Section 2.5. Another approach starts, like the von Mises distribution, from a Gaussian distribution over a Euclidean space but now marginalizes onto the unit circle rather than conditioning (Mardia and Jupp, 2000). However, this leads to more complex forms of distribution and will not be discussed further. Finally, any valid distribution over the real axis (such as a Gaussian) can be turned into a periodic distribution by mapping successive intervals of width 2π onto the periodic variable (0, 2π), which corresponds to ‘wrapping’ the real axis around unit circle. Again, the resulting distribution is more complex to handle than the von Mises distribution.

One limitation of the von Mises distribution is that it is unimodal. By forming mixtures of von Mises distributions, we obtain a flexible framework for modelling periodic variables that can handle multimodality. For an example of a machine learning application that makes use of von Mises distributions, see Lawrence et al. (2002), and for extensions to modelling conditional densities for regression problems, see Bishop and Nabney (1996).
