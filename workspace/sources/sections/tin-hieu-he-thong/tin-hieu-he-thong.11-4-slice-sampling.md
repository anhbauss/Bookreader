---
id: "tin-hieu-he-thong.11-4-slice-sampling"
doc_id: "tin-hieu-he-thong"
title: "11.4. Slice Sampling"
level: 2
heading_path: ["Sampling Methods", "11.4. Slice Sampling"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.josiah-willard-gibbs-1839-1903"
next_id: "tin-hieu-he-thong.11-5-the-hybrid-monte-carlo-algorithm"
block_ids: ["b6001", "b6002", "b6003", "b6004", "b6005", "b6006", "b6007", "b6008", "b6009", "b6010", "b6011", "b6012", "b6013"]
---

## 11.4. Slice Sampling

We have seen that one of the difficulties with the Metropolis algorithm is the sensitivity to step size. If this is too small, the result is slow decorrelation due to random walk behaviour, whereas if it is too large the result is inefficiency due to a high rejection rate. The technique of slice sampling (Neal, 2003) provides an adaptive step size that is automatically adjusted to match the characteristics of the distribution. Again it requires that we are able to evaluate the unnormalized distribution $\widetilde { p } ( \mathbf { z } )$

Consider first the univariate case. Slice sampling involves augmenting z with an additional variable u and then drawing samples from the joint (z, u) space. We shall see another example of this approach when we discuss hybrid Monte Carlo in Section 11.5. The goal is to sample uniformly from the area under the distribution

![image](images/part-003--94e8a69b959b5c991b47c9071b4c8b1cf3c451fdd55b8a7bd3ebf9dacff73f7e.jpg)

Figure 11.13 Illustration of slice sampling. (a) For a given value $z ^ { ( \tau ) }$ , a value of u is chosen uniformly in the region $0 \leqslant u \leqslant \widetilde { p } ( z ^ { ( \tau ) } )$ , which then defines a ‘slice’ through the distribution, shown by the solid horizontal lines. (b) Because it is infeasible to sample directly from a slice, a new sample of z is drawn from a region z<sub>min</sub> $\leqslant z \leqslant z _ { \mathrm { m a x } }$ , which contains the previous value $\dot { z } ^ { ( \tau ) }$

given by

\widehat {p} (z, u) = \left\{ \begin{array}{l l} 1 / Z _ {p} & \text { if } 0 \leqslant u \leqslant \widetilde {p} (z) \\ 0 & \text { otherwise } \end{array} \right.\tag{11.51}

where $Z _ { p } = \int \widetilde { p } ( z )$ dz. The marginal distribution over $z$ is given by

\int \widehat {p} (z, u) \mathrm{d} u = \int_ {0} ^ {\widetilde {p} (z)} \frac {1}{Z _ {p}} \mathrm{d} u = \frac {\widetilde {p} (z)}{Z _ {p}} = p (z)\tag{11.52}

and so we can sample from $p ( z )$ by sampling from $\widehat { p } ( z , u )$ and then ignoring the u values. This can be achieved by alternately sampling z and u. Given the value of $z$ we evaluate $\widetilde { p } ( z )$ and then sample u uniformly in the range $0 \leqslant u \leqslant \widetilde { p } ( z )$ , which is straightforward. Then we fix u and sample z uniformly from the ‘slice’ through the distribution defined by $\{ z : \widetilde { p } ( z ) > u \}$ . This is illustrated in Figure 11.13(a).

In practice, it can be difficult to sample directly from a slice through the distribution and so instead we define a sampling scheme that leaves the uniform distribution under $\widehat { p } ( z , u )$ invariant, which can be achieved by ensuring that detailed balance is satisfied. Suppose the current value of z is denoted $z ^ { ( \tau ) }$ and that we have obtained a corresponding sample $u .$ . The next value of z is obtained by considering a region $z _ { \mathrm { m i n } } \leqslant z \leqslant z _ { \mathrm { m a x } }$ that contains $z ^ { ( \tau ) }$ . It is in the choice of this region that the adaptation to the characteristic length scales of the distribution takes place. We want the region to encompass as much of the slice as possible so as to allow large moves in z space while having as little as possible of this region lying outside the slice, because this makes the sampling less efficient.

One approach to the choice of region involves starting with a region containing $z ^ { ( \tau ) }$ having some width w and then testing each of the end points to see if they lie within the slice. If either end point does not, then the region is extended in that direction by increments of value w until the end point lies outside the region. A candidate value $z ^ { \prime }$ is then chosen uniformly from this region, and if it lies within the slice, then it forms $z ^ { ( \tau + 1 ) }$ . If it lies outside the slice, then the region is shrunk such that $z ^ { \prime }$ forms an end point and such that the region still contains $\bar { z } ^ { ( \tau ) }$ . Then another candidate point is drawn uniformly from this reduced region and so on, until a value of z is found that lies within the slice.

Slice sampling can be applied to multivariate distributions by repeatedly sampling each variable in turn, in the manner of Gibbs sampling. This requires that we are able to compute, for each component $z _ { i } ,$ a function that is proportional to $p ( \boldsymbol { z } _ { i } | \mathbf { z } _ { \backslash i } )$
