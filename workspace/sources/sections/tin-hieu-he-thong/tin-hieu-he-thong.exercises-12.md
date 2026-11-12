---
id: "tin-hieu-he-thong.exercises-12"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["Sampling Methods", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-6-estimating-the-partition-function"
next_id: "tin-hieu-he-thong.c2-1-principal-component-analysis"
block_ids: ["b6095", "b6096", "b6097", "b6098", "b6099", "b6100", "b6101", "b6102", "b6103", "b6104", "b6105", "b6106", "b6107", "b6108", "b6109", "b6110", "b6111", "b6112", "b6113", "b6114", "b6115", "b6116", "b6117", "b6118", "b6119", "b6120", "b6121", "b6122", "b6123", "b6124", "b6125", "b6126", "b6127", "b6128", "b6129"]
---

## Exercises

11.1 () www Show that the finite sample estimator $\widehat { \boldsymbol { f } }$ defined by (11.2) has mean equal to $\overline { { \mathbb { E } [ } } f ]$ and variance given by (11.3).

11.2 () Suppose that z is a random variable with uniform distribution over $( 0 , 1 )$ and that we transform z using $y = h ^ { - 1 } ( z )$ where $h ( y )$ is given by (11.6). Show that y has the distribution $p ( y )$ .

11.3 () Given a random variable z that is uniformly distributed over $( 0 , 1 )$ , find a transformation $y = f ( z )$ such that y has a Cauchy distribution given by (11.8).

11.4 ( ) Suppose that $z _ { 1 }$ and $z _ { 2 }$ are uniformly distributed over the unit circle, as shown in Figure 11.3, and that we make the change of variables given by (11.10) and (11.11). Show that $( y _ { 1 } , y _ { 2 } )$ will be distributed according to (11.12).

11.5 () www Let z be a D-dimensional random variable having a Gaussian distribution with zero mean and unit covariance matrix, and suppose that the positive definite symmetric matrix Σ has the Cholesky decomposition $\dot { \boldsymbol { \Sigma } } = \mathbf { L } \mathbf { L } ^ { \mathrm { T } }$ where L is a lowertriangular matrix (i.e., one with zeros above the leading diagonal). Show that the variable $\mathbf { y } = \pmb { \mu } + \mathbf { L z }$ has a Gaussian distribution with mean $\pmb { \mu }$ and covariance Σ. This provides a technique for generating samples from a general multivariate Gaussian using samples from a univariate Gaussian having zero mean and unit variance.

11.6 ( ) www In this exercise, we show more carefully that rejection sampling does indeed draw samples from the desired distribution $p ( \mathbf { z } )$ . Suppose the proposal distribution is $q ( \mathbf { z } )$ and show that the probability of a sample value z being accepted is given by $\widetilde { p } ( \mathbf { z } ) / k q ( \mathbf { z } )$ where $\widetilde { p }$ is any unnormalized distribution that is proportional to $p ( \mathbf { z } )$ , and the constant k is set to the smallest value that ensures $k q ( \mathbf { z } ) \geqslant \widetilde { p } ( \mathbf { z } )$ for all values of $\mathbf { z } .$  Note that the probability of drawing a value z is given by the probability of drawing that value from $q ( \mathbf { z } )$ times the probability of accepting that value given that it has been drawn. Make use of this, along with the sum and product rules of probability, to write down the normalized form for the distribution over z, and show that it equals $p ( \mathbf { z } )$

11.7 () Suppose that z has a uniform distribution over the interval $[ 0 , 1 ]$ . Show that the variable $y = b$ tan $z + c$ has a Cauchy distribution given by (11.16).

11.8 ( ) Determine expressions for the coefficients $k _ { i }$ in the envelope distribution (11.17) for adaptive rejection sampling using the requirements of continuity and normalization.

11.9 ( ) By making use of the technique discussed in Section 11.1.1 for sampling from a single exponential distribution, devise an algorithm for sampling from the piecewise exponential distribution defined by (11.17).

11.10 () Show that the simple random walk over the integers defined by (11.34), (11.35), and (11.36) has the property that $\mathbb { E } [ ( z ^ { ( \tau ) } ) ^ { 2 } ] = \mathbb { E } [ ( z ^ { ( \tau - 1 ) } ) ^ { 2 } ] + \bar { 1 } / 2$ and hence by induction that $\mathbb { E } [ ( z ^ { ( \tau ) } ) ^ { 2 } ] = \dot { \tau } / 2$

Figure 11.15 A probability distribution over two variables $z _ { 1 }$ and $z _ { 2 }$ that is uniform over the shaded regions and that is zero everywhere else.

![image](images/part-004--87da60e542a59477287ea2bcfadedb220246ca66c41305889d872f1cba96e218.jpg)

11.11 ( ) www Show that the Gibbs sampling algorithm, discussed in Section 11.3, satisfies detailed balance as defined by (11.40).

11.12 () Consider the distribution shown in Figure 11.15. Discuss whether the standard Gibbs sampling procedure for this distribution is ergodic, and therefore whether it would sample correctly from this distribution

11.13 ( ) Consider the simple 3-node graph shown in Figure 11.16 in which the observed node x is given by a Gaussian distribution $\mathcal { N } ( \boldsymbol { x } | \mu , \tau ^ { - 1 } )$ with mean $\mu$ and precision $\tau .$ Suppose that the marginal distributions over the mean and precision are given by $\mathcal { N } ( \mu | \mu _ { 0 } , s _ { 0 } )$ and $\mathrm { G a m } ( \tau | a , b )$ , where $\mathrm { G a m } ( \cdot | \cdot , \cdot )$ denotes a gamma distribution. Write down expressions for the conditional distributions $p ( \mu | x , \tau )$ and $p ( \tau | x , \mu )$ that would be required in order to apply Gibbs sampling to the posterior distribution $p ( \mu , \tau | x )$

11.14 () Verify that the over-relaxation update (11.50), in which $z _ { i }$ has mean $\mu _ { i }$ and variance $\sigma _ { i } .$ , and where ν has zero mean and unit variance, gives a value $z _ { i } ^ { \prime }$ with mean $\mu _ { i }$ and variance $\sigma _ { i } ^ { 2 }$

11.15 () www Using (11.56) and (11.57), show that the Hamiltonian equation (11.58) is equivalent to (11.53). Similarly, using (11.57) show that (11.59) is equivalent to (11.55).

11.16 () By making use of (11.56), (11.57), and (11.63), show that the conditional distribution $p ( \mathbf { r } | \mathbf { z } )$ is a Gaussian.

Figure 11.16 A graph involving an observed Gaussian variable x with prior distributions over its mean $\mu$ and precision $\tau .$

![image](images/part-004--f20b1940137f5ddd369c61c8184f7f7525ee05a63cd1d0fef91d6b93e2be4613.jpg)

11.17 () www Verify that the two probabilities (11.68) and (11.69) are equal, and hence that detailed balance holds for the hybrid Monte Carlo algorithm.

![image](images/part-004--6690f0d2876dff81af054bc0baaeba1d4220f93799410197af597f9d8461064e.jpg)

In Chapter 9, we discussed probabilistic models having discrete latent variables, such as the mixture of Gaussians. We now explore models in which some, or all, of the latent variables are continuous. An important motivation for such models is that many data sets have the property that the data points all lie close to a manifold o much lower dimensionality than that of the original data space. To see why this might arise, consider an artificial data set constructed by taking one of the off-line digits, represented by a 64 x 64 pixel grey-level image, and embedding it in a large image of size 100 x 100 by padding with pixels having the value zero (corresponding to white pixels) in which the location and orientation of the digit is varied at random, as illustrated in Figure 12.1. Each of the resulting images is represented by a point in the 100 x 100 = 10, OOO-dimensional data space. However, across a data set of such images, there are only three degrees offreedom of variability, corresponding to the vertical and horizontal translations and the rotations. The data points will therefore live on a subspace of the data space whose intrinsic dimensionality is three. Note

![image](images/part-004--2046f66213f80d4b2496da555b49be40f0bfe55c14733ba39e6d1e75ed3425e1.jpg)

Figure 12.1 A synthetic data sel obtained by taking one of the off-line digit images and creating multi ple copies in each of which the digit has undergone a random displacement and rotation within some larger image field. The resulting images each have 100 )( 100 = 10.000 pixels.

that the manifold will be nonlinear because. for instance. if we translate the digit past a particular pixel, that pixel value will go from zero (white) 10 one (black) and back to zero again. which is clearly a nonlinear function of the digit position. In this example. !.he lranslation and rotation parameters are latent variables because we observe only the image vectors and are not told which values of the translation or rotation variables were used to create them.

For real digit image data, there will be a funher degree of freedom arising from scaling. Moreover there will be multiple addilional degrees of freedom associaled wilh more complex deformations due to the variability in an individual's wriling 3S well as lhe differences in writing slyles between individuals. evenheless. the number of such degrees of freedom will be small compared to the dimensionality o Ihe data set.

Another example is provided by the oil flow data set. in which (for a given geometrical configuration of the gas, WOller, and oil phases) there are only two degrees of freedom of variability corresponding to the fraction of oil in the pipe and the fraction of water (the fraction of gas Ihen being determined). Ahhough the data space comprises 12 measuremenlS, a data set of points will lie close to a Iwo-dimensional manifold embedded within this space. In this case, the manifold comprises scveral distinct segments corresponding to different flow regimes. each such segment being a (noisy) continuous two-dimensional manifold. If our goal is data compression. or density modelling, then there can be benefits in exploiling this manifold struclUre.

In praclice. the data points will not be confined precisely to a smooth lowdimensional manifold, and we can interpret the departures of data points from the manifold as ·noise'. This leads naturally to a generative view of such models in which we first select a poinl within the manifold according to some latent variable distribution and then generate an observed data point by :ldding noise, drawn from some conditional distribution of the data varillbles given the latent varillbles.

Thc simplest continuous latent variable model assumes Gaussian distributions for both thc latent and observed variables and makes use of a linear,Gaussian dependence of the observed variables on Ihe slate of the latent variables. This leads to a probabilislic fonnulation of the well-known technique of principal component analysis (PeA), as well as 10 a related model called factor analysis.

In this chapter w will begin wilh a slandard, nonprobabilistic treatment of PeA. and thcn we show how PeA arises naturally as the maximum likelihood solution 10

P'if>cipal compooont a",,~" seeks" $pace 01 !owe, dimensionality. kt"(>WIl as !he P<lno> pal subSpace "nd denoted I:Jy the magenta line. SUCh Itlet the Grthogonet [jiojectiOh 01 !he data points ('ed doIsl onto tP'Ns """'imizes the varia,..,., of !he proja<:ted points (green doIs). An "It",nati"" ....finilion 01 PCA is based on m..mizing the """,-<>I·squares of !he projection errors. ind'cated by the bfi.>e lines.

![image](images/part-004--5cd28d50fca576731937e21537a58d87cdb7fa4000e93f2596c8366ad4a564b7.jpg)

a panlcula, fonn of linear-Gau"ian latem "ariable model. This probabilistic reformulation bring~ many ad\'imlag~s, su~h as tl>l: use I)f EM for parameter eslimalion, rrinciple<J c~tensioos 10 Oli~turc, of PeA model" and Ba)'~sian formulat;ons that allow tbe number of rrincipal com[>Oncnts to be detennined aUlOmatically from !be data. Finally'. "c diSl;us< briefly ""'eral gencrali,ation, ofthe latent Yariable concept that g<l be~ood tbe linear-Gaussian assumption including non·Gau"i"n I.tcnt yariabies .....hich lea'" to tbe fr.me....ork of indrl"'mJ.m compon.nl anal,-.;., as ....ell a, models ha"ing a nonlinear rclationship bet ....een latent and oose",e<J ,'lUiable,.
