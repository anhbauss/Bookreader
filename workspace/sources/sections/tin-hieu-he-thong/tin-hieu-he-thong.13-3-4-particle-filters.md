---
id: "tin-hieu-he-thong.13-3-4-particle-filters"
doc_id: "tin-hieu-he-thong"
title: "13.3.4 Particle filters"
level: 2
heading_path: ["Sequential Data", "13.3.4 Particle filters"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-3-3-extensions-of-lds"
next_id: "tin-hieu-he-thong.exercises-14"
block_ids: ["b6918", "b6919", "b6920", "b6921", "b6922", "b6923", "b6924", "b6925", "b6926", "b6927", "b6928", "b6929", "b6930", "b6931", "b6932"]
---

## 13.3.4 Particle filters

For dynamical systems which do not have a linear-Gaussian, for example, if they use a non-Gaussian emission density, we can turn to sampling methods in order to find a tractable inference algorithm. In particular, we can apply the samplingimportance-resampling formalism of Section 11.1.5 to obtain a sequential Monte Carlo algorithm known as the particle filter.

Consider the class of distributions represented by the graphical model in Figure 13.5, and suppose we are given the observed values $\mathbf { X } _ { n } = \left( \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n } \right)$ and we wish to draw $L$ samples from the posterior distribution $p ( \mathbf { z } _ { n } | \mathbf { X } _ { n } )$ . Using Bayes’ theorem, we have

\begin{array}{r c l} \mathbb {E} [ f (\mathbf {z} _ {n}) ] & = & \int f (\mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \int f (\mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {x} _ {n}, \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \frac {\int f (\mathbf {z} _ {n}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n}}{\int p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n}} \\ & \simeq & \sum_ {l = 1} ^ {L} w _ {n} ^ {(l)} f (\mathbf {z} _ {n} ^ {(l)}) \end{array}\tag{13.117}

where $\{ \mathbf { z } _ { n } ^ { ( l ) } \}$ is a set of samples drawn from $p ( \mathbf { z } _ { n } | \mathbf { X } _ { n - 1 } )$ and we have made use of the conditional independence property $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } , \mathbf { X } _ { n - 1 } ) = p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ , which follows from the graph in Figure 13.5. The sampling weights $\{ w _ { n } ^ { ( l ) } \}$ are defined by

w _ {n} ^ {(l)} = \frac {p (\mathbf {x} _ {n} | \mathbf {z} _ {n} ^ {(l)})}{\sum_ {m = 1} ^ {L} p (\mathbf {x} _ {n} | \mathbf {z} _ {n} ^ {(m)})}\tag{13.118}

where the same samples are used in the numerator as in the denominator. Thus the posterior distribution $p ( \mathbf { z } _ { n } | \mathbf { x } _ { n } )$ is represented by the set of samples $\{ \mathbf { z } _ { n } ^ { ( l ) } \}$ together with the corresponding weights $\{ w _ { n } ^ { ( l ) } \}$ . Note that these weights satisfy $0 \leqslant w _ { n } ^ { ( l ) } 1$ and $\begin{array} { r } { \sum _ { l } w _ { n } ^ { ( l ) } = 1 } \end{array}$

Because we wish to find a sequential sampling scheme, we shall suppose that a set of samples and weights have been obtained at time step $n ,$ and that we have subsequently observed the value of $\mathbf x _ { n + 1 }$ , and we wish to find the weights and samples at time step $n + 1$ . We first sample from the distribution $p ( \mathbf { z } _ { n + 1 } | \mathbf { X } _ { n } )$ . This is straightforward since, again using Bayes’ theorem

\begin{array}{r c l} p (\mathbf {z} _ {n + 1} | \mathbf {X} _ {n}) & = & \int p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}, \mathbf {X} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \int p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \int p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {x} _ {n}, \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n} \\ & = & \frac {\int p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n}}{\int p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {X} _ {n - 1})   \mathrm{d} \mathbf {z} _ {n}} \\ & = & \sum_ {l} w _ {n} ^ {(l)} p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n} ^ {(l)}) \end{array}\tag{13.119}

where we have made use of the conditional independence properties

{p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}, \mathbf {X} _ {n})} = {p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n})}\tag{13.120}

{p (\mathbf {x} _ {n} | \mathbf {z} _ {n}, \mathbf {X} _ {n - 1})} = {p (\mathbf {x} _ {n} | \mathbf {z} _ {n})}\tag{13.121}

which follow from the application of the d-separation criterion to the graph in Figure 13.5. The distribution given by (13.119) is a mixture distribution, and samples can be drawn by choosing a component l with probability given by the mixing coefficients $w ^ { ( l ) }$ and then drawing a sample from the corresponding component.

In summary, we can view each step of the particle filter algorithm as comprising two stages. At time step n, we have a sample representation of the posterior distribution $p ( \mathbf { z } _ { n } | \mathbf { X } _ { n } )$ expressed as samples $\{ \mathbf { z } _ { n } ^ { ( \bar { l } ) } \}$ with corresponding weights $\{ w _ { n } ^ { ( l ) } \}$ This can be viewed as a mixture representation of the form (13.119). To obtain the corresponding representation for the next time step, we first draw L samples from the mixture distribution (13.119), and then for each sample we use the new observation $\mathbf { x } _ { n + 1 }$ to evaluate the corresponding weights $w _ { n + 1 } ^ { ( l ) } \propto p ( \mathbf { x } _ { n + 1 } | \mathbf { z } _ { n + 1 } ^ { ( l ) } )$ . This is illustrated, for the case of a single variable z, in Figure 13.23.

The particle filtering, or sequential Monte Carlo, approach has appeared in the literature under various names including the bootstrap filter (Gordon et al., 1993), survival ofthefittest (Kanazawa et al., 1995), and the condensation algorithm (Isard and Blake, 1998).
