---
id: "tin-hieu-he-thong.2-5-1-kernel-density-estimators"
doc_id: "tin-hieu-he-thong"
title: "2.5.1 Kernel density estimators"
level: 2
heading_path: ["Probability Distributions", "2.5.1 Kernel density estimators"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-5-nonparametric-methods"
next_id: "tin-hieu-he-thong.2-5-2-nearest-neighbour-methods"
block_ids: ["b1429", "b1430", "b1431", "b1432", "b1433", "b1434", "b1435", "b1436", "b1437", "b1438", "b1439", "b1440", "b1441", "b1442", "b1443", "b1444", "b1445", "b1446", "b1447", "b1448", "b1449", "b1450", "b1451", "b1452", "b1453", "b1454", "b1455", "b1456", "b1457", "b1458"]
---

## 2.5.1 Kernel density estimators

Let us suppose that observations are being drawn from some unknown probability density $p ( \mathbf { x } )$ in some D-dimensional space, which we shall take to be Euclidean, and we wish to estimate the value of $p ( \mathbf { x } )$ . From our earlier discussion of locality, let us consider some small region $\mathcal { R }$ containing x. The probability mass associated with this region is given by

P = \int_ {\mathcal {R}} p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{2.242}

Now suppose that we have collected a data set comprising N observations drawn from $p ( \mathbf { x } )$ . Because each data point has a probability P of falling within $\mathcal { R }$ , the total number K of points that lie inside  will be distributed according to the binomial distribution

\operatorname{Bin} (K | N, P) = \frac {N !}{K ! (N - K) !} P ^ {K} (1 - P) ^ {1 - K}.\tag{2.243}

Using (2.11), we see that the mean fraction of points falling inside the region is $\mathbb { E } [ K / N ] = P$ , and similarly using (2.12) we see that the variance around this mean is $\mathrm { \dot { v a r } } [ \dot { K } / N ] = P ( 1 - P ) / N$ . For large N, this distribution will be sharply peaked around the mean and so

K \simeq N P.\tag{2.244}

If, however, we also assume that the region $\mathcal { R }$ is sufficiently small that the probability density $p ( \mathbf { x } )$ is roughly constant over the region, then we have

P \simeq p (\mathbf {x}) V\tag{2.245}

where V is the volume of $\mathcal { R }$ . Combining (2.244) and (2.245), we obtain our density estimate in the form T2

p (\mathbf {x}) = \frac {K}{N V}.\tag{2.246}

Note that the validity of (2.246) depends on two contradictory assumptions, namely that the region be sufficiently small that the density is approximately constant over the region and yet sufficiently large (in relation to the value of that density) that the number K of points falling inside the region is sufficient for the binomial distribution to be sharply peaked.

We can exploit the result (2.246) in two different ways. Either we can fix K and determine the value of V from the data, which gives rise to the K-nearest-neighbour technique discussed shortly, or we can fix V and determine K from the data, giving rise to the kernel approach. It can be shown that both the K-nearest-neighbour density estimator and the kernel density estimator converge to the true probability density in the limit $N \to \infty$ provided V shrinks suitably with N, and K grows with N (Duda and Hart, 1973).

We begin by discussing the kernel method in detail, and to start with we take the region to be a small hypercube centred on the point x at which we wish to determine the probability density. In order to count the number K of points falling within this region, it is convenient to define the following function

k (\mathbf {u}) = \left\{ \begin{array}{l l} 1, & | u _ {i} | \leqslant 1 / 2, \quad i = 1, \ldots , D, \\ 0, & \text { otherwise } \end{array} \right.\tag{2.247}

which represents a unit cube centred on the origin. The function $k ( { \mathbf { u } } )$ is an example of a kernelfunction, and in this context is also called a Parzen window. From (2.247), the quantity $k ( ( \mathbf { x } - \mathbf { x } _ { n } ) / h )$ will be one if the data point ${ \bf x } _ { n }$ lies inside a cube of side h centred on x, and zero otherwise. The total number of data points lying inside this cube will therefore be

K = \sum_ {n = 1} ^ {N} k \left(\frac {\mathbf {x} - \mathbf {x} _ {n}}{h}\right).\tag{2.248}

Substituting this expression into (2.246) then gives the following result for the estimated density at x

p (\mathbf {x}) = \frac {1}{N} \sum_ {n = 1} ^ {N} \frac {1}{h ^ {D}} k \left(\frac {\mathbf {x} - \mathbf {x} _ {n}}{h}\right)\tag{2.249}

where we have used $V = h ^ { D }$ for the volume of a hypercube of side h in D dimensions. Using the symmetry of the function $k ( \mathbf { u } )$ , we can now re-interpret this equation, not as a single cube centred on x but as the sum over N cubes centred on the N data points ${ \bf x } _ { n }$

As it stands, the kernel density estimator (2.249) will suffer from one of the same problems that the histogram method suffered from, namely the presence of artificial discontinuities, in this case at the boundaries of the cubes. We can obtain a smoother density model if we choose a smoother kernel function, and a common choice is the Gaussian, which gives rise to the following kernel density model

p (\mathbf {x}) = \frac {1}{N} \sum_ {n = 1} ^ {N} \frac {1}{(2 \pi h ^ {2}) ^ {1 / 2}} \exp \left\{- \frac {\| \mathbf {x} - \mathbf {x} _ {n} \| ^ {2}}{2 h ^ {2}} \right\}\tag{2.250}

where h represents the standard deviation of the Gaussian components. Thus our density model is obtained by placing a Gaussian over each data point and then adding up the contributions over the whole data set, and then dividing by N so that the density is correctly normalized. In Figure 2.25, we apply the model (2.250) to the data

Illustration of the kernel density model (2.250) applied to the same data set used to demonstrate the histogram approach in Figure 2.24. We see that h acts as a smoothing parameter and that if it is set too small (top panel), the result is a very noisy density model, whereas if it is set too large (bottom panel), then the bimodal nature of the underlying distribution from which the data is generated (shown by the green curve) is washed out. The best density model is obtained for some intermediate value of h (middle panel).

![image](images/part-001--bcde01e634dc4181f1fc934c771573e9e6e1cfbf9c6a5504423d755ba928e359.jpg)

set used earlier to demonstrate the histogram technique. We see that, as expected, the parameter $h$ plays the role of a smoothing parameter, and there is a trade-off between sensitivity to noise at small h and over-smoothing at large h. Again, the optimization of $h$ is a problem in model complexity, analogous to the choice of bin width in histogram density estimation, or the degree of the polynomial used in curve fitting.

We can choose any other kernel function $k ( \mathbf { u } )$ in (2.249) subject to the condi tions

k (\mathbf {u}) \geqslant 0,\tag{2.251}

\int k (\mathbf {u}) \mathrm{d} \mathbf {u} = 1\tag{2.252}

which ensure that the resulting probability distribution is nonnegative everywhere and integrates to one. The class of density model given by (2.249) is called a kernel density estimator, or Parzen estimator. It has a great merit that there is no computation involved in the ‘training’ phase because this simply requires storage of the training set. However, this is also one of its great weaknesses because the computational cost of evaluating the density grows linearly with the size of the data set.
