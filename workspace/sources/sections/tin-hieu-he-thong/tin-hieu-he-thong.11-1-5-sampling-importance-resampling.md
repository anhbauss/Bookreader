---
id: "tin-hieu-he-thong.11-1-5-sampling-importance-resampling"
doc_id: "tin-hieu-he-thong"
title: "11.1.5 Sampling-importance-resampling"
level: 2
heading_path: ["Sampling Methods", "11.1.5 Sampling-importance-resampling"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-1-4-importance-sampling"
next_id: "tin-hieu-he-thong.11-1-6-sampling-and-the-em-algorithm"
block_ids: ["b5886", "b5887", "b5888", "b5889", "b5890", "b5891", "b5892", "b5893", "b5894", "b5895", "b5896", "b5897"]
---

## 11.1.5 Sampling-importance-resampling

The rejection sampling method discussed in Section 11.1.2 depends in part for its success on the determination of a suitable value for the constant k. For many pairs of distributions $p ( \mathbf { z } )$ and $q ( \mathbf { z } )$ , it will be impractical to determine a suitable value for k in that any value that is sufficiently large to guarantee a bound on the desired distribution will lead to impractically small acceptance rates.

As in the case of rejection sampling, the sampling-importance-resampling (SIR) approach also makes use of a sampling distribution $q ( \mathbf { z } )$ but avoids having to determine the constant k. There are two stages to the scheme. In the first stage, $L$ samples $\mathbf { z } ^ { ( 1 ) } , \ldots , \mathbf { z } ^ { ( L ) }$ are drawn from $q ( \mathbf { z } )$ . Then in the second stage, weights $w _ { 1 } , \ldots , w _ { L }$ are constructed using (11.23). Finally, a second set of $L$ samples is drawn from the discrete distribution $( \mathbf { z } ^ { ( 1 ) } , \ldots , \mathbf { z } ^ { ( L ) } )$ with probabilities given by the weights $( w _ { 1 } , \dots , w _ { L } )$

The resulting L samples are only approximately distributed according to $p ( \mathbf { z } )$ but the distribution becomes correct in the limit $L  \infty$ . To see this, consider the univariate case, and note that the cumulative distribution of the resampled values is given by

\begin{array}{r c l} p (z \leqslant a) & = & \sum_ {l: z ^ {(l)} \leqslant a} w _ {l} \\ & = & \frac {\sum_ {l} I (z ^ {(l)} \leqslant a) \widetilde {p} (z ^ {(l)}) / q (z ^ {(l)})}{\sum_ {l} \widetilde {p} (z ^ {(l)}) / q (z ^ {(l)})} \end{array}\tag{11.25}

where $I ( . )$ is the indicator function (which equals 1 if its argument is true and 0 otherwise). Taking the limit $L  \infty$ , and assuming suitable regularity of the distributions, we can replace the sums by integrals weighted according to the original sampling distribution $q ( z )$

\begin{array}{l l l} p (z \leqslant a) & = & \frac { \int I (z \leqslant a)   \{\widetilde {p} (z) / q (z) \}   q (z)   \mathrm{d} z}{ \int \{\widetilde {p} (z) / q (z) \}   q (z)   \mathrm{d} z} \\ & = & \frac { \int I (z \leqslant a) \widetilde {p} (z)   \mathrm{d} z}{ \int \widetilde {p} (z)   \mathrm{d} z} \\ & = & \int I (z \leqslant a) p (z)   \mathrm{d} z \end{array}\tag{11.26}

which is the cumulative distribution function of $p ( z )$ . Again, we see that the normalization of $p ( z )$ is not required.

For a finite value of $L ,$ and a given initial sample set, the resampled values will only approximately be drawn from the desired distribution. As with rejection sampling, the approximation improves as the sampling distribution $q ( \mathbf { z } )$ gets closer to the desired distribution $p ( \mathbf { z } )$ . When $q ( \mathbf { z } ) = p ( \mathbf { z } )$ , the initial samples $( \mathbf { z } ^ { ( 1 ) } , \ldots , \mathbf { z } ^ { ( L ) } )$ have the desired distribution, and the weights $w _ { n } = 1 / L$ so that the resampled values also have the desired distribution.

If moments with respect to the distribution $p ( \mathbf { z } )$ are required, then they can be

evaluated directly using the original samples together with the weights, because

\begin{array}{r c l} \mathbb {E} [ f (\mathbf {z}) ] & = & \int f (\mathbf {z}) p (\mathbf {z})   \mathrm{d} \mathbf {z} \\ & = & \frac {\int f (\mathbf {z}) [ \widetilde {p} (\mathbf {z}) / q (\mathbf {z}) ] q (\mathbf {z})   \mathrm{d} \mathbf {z}}{\int [ \widetilde {p} (\mathbf {z}) / q (\mathbf {z}) ] q (\mathbf {z})   \mathrm{d} \mathbf {z}} \\ & \simeq & \sum_ {l = 1} ^ {L} w _ {l} f (\mathbf {z} _ {l}). \end{array}\tag{11.27}
