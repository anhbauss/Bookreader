---
id: "tin-hieu-he-thong.11-1-4-importance-sampling"
doc_id: "tin-hieu-he-thong"
title: "11.1.4 Importance sampling"
level: 2
heading_path: ["Sampling Methods", "11.1.4 Importance sampling"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.sub-11-1-3-sub-sub-adaptive-sub-sub-rejection-sub-sub-sampling-sub"
next_id: "tin-hieu-he-thong.11-1-5-sampling-importance-resampling"
block_ids: ["b5864", "b5865", "b5866", "b5867", "b5868", "b5869", "b5870", "b5871", "b5872", "b5873", "b5874", "b5875", "b5876", "b5877", "b5878", "b5879", "b5880", "b5881", "b5882", "b5883", "b5884", "b5885"]
---

## 11.1.4 Importance sampling

One of the principal reasons for wishing to sample from complicated probability distributions is to be able to evaluate expectations of the form (11.1). The technique of importance sampling provides a framework for approximating expectations directly but does not itself provide a mechanism for drawing samples from distribution $p ( \mathbf { z } )$

The finite sum approximation to the expectation, given by (11.2), depends on being able to draw samples from the distribution $p ( \mathbf { z } )$ . Suppose, however, that it is impractical to sample directly from $p ( \mathbf { z } )$ but that we can evaluate $p ( \mathbf { z } )$ easily for any given value of $\mathbf { z } .$ One simplistic strategy for evaluating expectations would be to discretize z-space into a uniform grid and to evaluate the integrand as a sum of the form

\mathbb {E} [ f ] \simeq \sum_ {l = 1} ^ {L} p (\mathbf {z} ^ {(l)}) f (\mathbf {z} ^ {(l)}).\tag{11.18}

An obvious problem with this approach is that the number of terms in the summation grows exponentially with the dimensionality of $\mathbf { z } .$ . Furthermore, as we have already noted, the kinds of probability distributions of interest will often have much of their mass confined to relatively small regions of z space and so uniform sampling will be very inefficient because in high-dimensional problems, only a very small proportion of the samples will make a significant contribution to the sum. We would really like to choose the sample points to fall in regions where $p ( \mathbf { z } )$ is large, or ideally where the product $p ( \mathbf { z } ) f ( \mathbf { z } )$ is large.

As in the case of rejection sampling, importance sampling is based on the use of a proposal distribution $q ( \mathbf { z } )$ from which it is easy to draw samples, as illustrated in Figure 11.8. We can then express the expectation in the form of a finite sum over

samples $\{ \mathbf { z } ^ { ( l ) } \}$ drawn from $q ( \mathbf { z } )$

\begin{array}{r c l} \mathbb {E} [ f ] & = & \int f (\mathbf {z}) p (\mathbf {z})   \mathrm{d} \mathbf {z} \\ & = & \int f (\mathbf {z}) \frac {p (\mathbf {z})}{q (\mathbf {z})} q (\mathbf {z})   \mathrm{d} \mathbf {z} \\ & \simeq & \frac {1}{L} \sum_ {l = 1} ^ {L} \frac {p (\mathbf {z} ^ {(l)})}{q (\mathbf {z} ^ {(l)})} f (\mathbf {z} ^ {(l)}). \end{array}\tag{11.19}

The quantities $r _ { l } = p ( \mathbf { z } ^ { ( l ) } ) / q ( \mathbf { z } ^ { ( l ) } )$ are known as importance weights, and they correct the bias introduced by sampling from the wrong distribution. Note that, unlike rejection sampling, all of the samples generated are retained.

It will often be the case that the distribution $p ( \mathbf { z } )$ can only be evaluated up to a normalization constant, so that $p ( \mathbf { z } ) = \widetilde { p } ( \mathbf { z } ) / Z _ { p }$ where $\widetilde { p } ( \mathbf { z } )$ can be evaluated easily, whereas $Z _ { p }$  is unknown. Similarly, we may wish to use an importance sampling distribution $q ( \mathbf { z } ) = \widetilde { q } ( \mathbf { z } ) / Z _ { q }$ , which has the same property. We then have

\begin{array}{r c l} \mathbb {E} [ f ] & = & \int f (\mathbf {z}) p (\mathbf {z}) \mathrm{d} \mathbf {z} \\ & = & \frac {Z _ {q}}{Z _ {p}} \int f (\mathbf {z}) \frac {\widetilde {p} (\mathbf {z})}{\widetilde {q} (\mathbf {z})} q (\mathbf {z}) \mathrm{d} \mathbf {z} \\ & \simeq & \frac {Z _ {q}}{Z _ {p}} \frac {1}{L} \sum_ {l = 1} ^ {L} \widetilde {r} _ {l} f (\mathbf {z} ^ {(l)}). \end{array}\tag{11.20}

where $\widetilde { r } _ { l } = \widetilde { p } ( \mathbf { z } ^ { ( l ) } ) / \widetilde { q } ( \mathbf { z } ^ { ( l ) } )$ . We can use the same sample set to evaluate the ratio $Z _ { p } / Z _ { q }$ with the result

\begin{array}{r c l} \frac {Z _ {p}}{Z _ {q}} & = & \frac {1}{Z _ {q}} \int \widetilde {p} (\mathbf {z}) \mathrm{d} \mathbf {z} = \int \frac {\widetilde {p} (\mathbf {z})}{\widetilde {q} (\mathbf {z})} q (\mathbf {z}) \mathrm{d} \mathbf {z} \\ & \simeq & \frac {1}{L} \sum_ {l = 1} ^ {L} \widetilde {r _ {l}} \end{array}\tag{11.21}

and hence

\mathbb {E} [ f ] \simeq \sum_ {l = 1} ^ {L} w _ {l} f (\mathbf {z} ^ {(l)})\tag{11.22}

where we have defined

w _ {l} = \frac {\widetilde {r} _ {l}}{\sum_ {m} \widetilde {r} _ {m}} = \frac {\widetilde {p} (\mathbf {z} ^ {(l)}) / q (\mathbf {z} ^ {(l)})}{\sum_ {m} \widetilde {p} (\mathbf {z} ^ {(m)}) / q (\mathbf {z} ^ {(m)})}.\tag{11.23}

As with rejection sampling, the success of the importance sampling approach depends crucially on how well the sampling distribution $q ( \mathbf { z } )$ matches the desired distribution $p ( \mathbf { z } )$ . If, as is often the case, $p ( \mathbf { z } ) f ( \mathbf { z } )$ is strongly varying and has a sig nificant proportion of its mass concentrated over relatively small regions of z space, then the set of importance weights $\{ r _ { l } \}$ may be dominated by a few weights having large values, with the remaining weights being relatively insignificant. Thus the effective sample size can be much smaller than the apparent sample size $L .$ . The problem is even more severe if none of the samples falls in the regions where $p ( \mathbf { z } ) f ( \mathbf { z } )$ is large. In that case, the apparent variances of $r _ { l }$ and $r _ { l } f ( \mathbf { z } ^ { ( \overline { { l } } ) } )$ may be small even though the estimate of the expectation may be severely wrong. Hence a major drawback of the importance sampling method is the potential to produce results that are arbitrarily in error and with no diagnostic indication. This also highlights a key requirement for the sampling distribution $q ( \mathbf { z } )$ , namely that it should not be small or zero in regions where $p ( \mathbf { z } )$ may be significant.

For distributions defined in terms of a graphical model, we can apply the importance sampling technique in various ways. For discrete variables, a simple approach is called uniform sampling. The joint distribution for a directed graph is defined by (11.4). Each sample from the joint distribution is obtained by first setting those variables $\mathbf { z } _ { i }$ that are in the evidence set equal to their observed values. Each of the remaining variables is then sampled independently from a uniform distribution over the space of possible instantiations. To determine the corresponding weight associated with a sample $\mathbf { z } ^ { ( l ) }$ , we note that the sampling distribution $\widetilde { \boldsymbol { q } } ( \mathbf { z } )$ is uniform over the possible choices for $\mathbf { z } ,$ and that $\widetilde { p } ( \mathbf { z } | \mathbf { x } ) = \widetilde { p } ( \mathbf { z } )$ , where x denotes the subset of variables that are observed, and the equality follows from the fact that every sample z that is generated is necessarily consistent with the evidence. Thus the weights $r _ { l }$ are simply proportional to $p ( \mathbf { z } )$ . Note that the variables can be sampled in any order. This approach can yield poor results if the posterior distribution is far from uniform, as is often the case in practice.

An improvement on this approach is called likelihood weighted sampling (Fung and Chang, 1990; Shachter and Peot, 1990) and is based on ancestral sampling of the variables. For each variable in turn, if that variable is in the evidence set, then it is just set to its instantiated value. If it is not in the evidence set, then it is sampled from the conditional distribution $p ( \mathbf { z } _ { i } | \mathrm { p a } _ { i } )$ in which the conditioning variables are set to their currently sampled values. The weighting associated with the resulting sample z is then given by

r (\mathbf {z}) = \prod_ {\mathbf {z} _ {i} \not \in \mathbf {e}} \frac {p (\mathbf {z} _ {i} | \mathrm{pa} _ {i})}{p (\mathbf {z} _ {i} | \mathrm{pa} _ {i})} \prod_ {\mathbf {z} _ {i} \in \mathbf {e}} \frac {p (\mathbf {z} _ {i} | \mathrm{pa} _ {i})}{1} = \prod_ {\mathbf {z} _ {i} \in \mathbf {e}} p (\mathbf {z} _ {i} | \mathrm{pa} _ {i}).\tag{11.24}

This method can be further extended using self-importance sampling (Shachter and Peot, 1990) in which the importance sampling distribution is continually updated to reflect the current estimated posterior distribution.
