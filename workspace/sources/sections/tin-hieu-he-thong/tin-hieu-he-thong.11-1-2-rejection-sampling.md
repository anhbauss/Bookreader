---
id: "tin-hieu-he-thong.11-1-2-rejection-sampling"
doc_id: "tin-hieu-he-thong"
title: "11.1.2 Rejection sampling"
level: 2
heading_path: ["Sampling Methods", "11.1.2 Rejection sampling"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-1-1-standard-distributions"
next_id: "tin-hieu-he-thong.sub-11-1-3-sub-sub-adaptive-sub-sub-rejection-sub-sub-sampling-sub"
block_ids: ["b5830", "b5831", "b5832", "b5833", "b5834", "b5835", "b5836", "b5837", "b5838", "b5839", "b5840", "b5841", "b5842", "b5843", "b5844", "b5845", "b5846", "b5847", "b5848", "b5849"]
---

## 11.1.2 Rejection sampling

The rejection sampling framework allows us to sample from relatively complex distributions, subject to certain constraints. We begin by considering univariate distributions and discuss the extension to multiple dimensions subsequently.

Suppose we wish to sample from a distribution $p ( \mathbf { z } )$ that is not one of the simple, standard distributions considered so far, and that sampling directly from $p ( \mathbf { z } )$ is difficult. Furthermore suppose, as is often the case, that we are easily able to evaluate $p ( \mathbf { z } )$ for any given value of $\mathbf { z } ,$ up to some normalizing constant $Z .$ , so that

p (z) = \frac {1}{Z _ {p}} \widetilde {p} (z)\tag{11.13}

where $\widetilde { p } ( z )$ can readily be evaluated, but $Z _ { p }$ is unknown.

In order to apply rejection sampling, we need some simpler distribution $q ( z )$ sometimes called a proposal distribution, from which we can readily draw samples.

Figure 11.4 In the rejection sampling method, samples are drawn from a simple distribution $q ( z )$ and rejected if they fall in the grey area between the unnormalized distribution $\widetilde { p } ( z )$ and the scaled distribution $k q ( z )$ . The resulting samples are distributed according to $p ( z )$ which is the normalized version of $\widetilde { p } ( z )$

![image](images/part-003--13b768754d7209253ed73330dcd16e2febaf33884a377f6467ab8edfe3dc06de.jpg)

We next introduce a constant k whose value is chosen such that $k q ( z ) \geqslant \widetilde { p } ( z )$ for all values of z. The function $k q ( z )$ is called the comparison function and is illustrated for a univariate distribution in Figure 11.4. Each step of the rejection sampler involves generating two random numbers. First, we generate a number $z _ { \mathrm { 0 } }$ from the distribution $q ( z )$ . Next, we generate a number $u _ { 0 }$ from the uniform distribution over $[ 0 , k q ( z _ { 0 } ) ]$ . This pair of random numbers has uniform distribution under the curve of the function $k q ( z )$ . Finally, if $u _ { 0 } > \widetilde { p } ( z _ { 0 } )$ then the sample is rejected, otherwise $u _ { 0 }$ is retained. Thus the pair is rejected if it lies in the grey shaded region in Figure 11.4. The remaining pairs then have uniform distribution under the curve of $\widetilde { p } ( z )$ and hence the corresponding z values are distributed according to $p ( z )$ , as desired.

The original values of z are generated from the distribution $q ( z )$ , and these samples are then accepted with probability $\widetilde { p } ( z ) / k q ( z )$ , and so the probability that a sample will be accepted is given by

\begin{array}{r c l} {p (\mathrm{accept})} & = & {\int \{\widetilde {p} (z) / k q (z) \} q (z) \mathrm{d} z} \\ & = & {\frac {1}{k} \int \widetilde {p} (z) \mathrm{d} z.} \end{array}\tag{11.14}

Thus the fraction of points that are rejected by this method depends on the ratio of the area under the unnormalized distribution $\tilde { p } ( z )$ to the area under the curve $k q ( z )$ We therefore see that the constant k should be as small as possible subject to the limitation that $k q ( z )$ must be nowhere less than $\widetilde { p } ( z )$

As an illustration of the use of rejection sampling, consider the task of sampling from the gamma distribution

\operatorname{Gam} (z | a, b) = \frac {b ^ {a} z ^ {a - 1} \exp (- b z)}{\Gamma (a)}\tag{11.15}

which, for $a \ > \ 1$ , has a bell-shaped form, as shown in Figure 11.5. A suitable proposal distribution is therefore the Cauchy (11.8) because this too is bell-shaped and because we can use the transformation method, discussed earlier, to sample from it. We need to generalize the Cauchy slightly to ensure that it nowhere has a smaller value than the gamma distribution. This can be achieved by transforming a uniform random variable y using $z = b \tan y + c ,$ which gives random numbers distributed according to.

Plot showing the gamma distribution given by (11.15) as the green curve, with a scaled Cauchy proposal distribution shown by the red curve. Samples from the gamma distribution can be obtained by sampling from the Cauchy and then applying the rejection sampling criterion.

Exercise 11.9

![image](images/part-003--9f63f1761610a413fcb0636168c9ffa6f036358a66e29f168f5a6f317bd2557c.jpg)

q (z) = \frac {k}{1 + (z - c) ^ {2} / b ^ {2}}.\tag{11.16}

The minimum reject rate is obtained by setting $c = a - 1 , b ^ { 2 } = 2 a - 1$ and choosing the constant k to be as small as possible while still satisfying the requirement $k q ( z ) \geqslant \widetilde { p } ( z )$ . The resulting comparison function is also illustrated in Figure 11.5.
