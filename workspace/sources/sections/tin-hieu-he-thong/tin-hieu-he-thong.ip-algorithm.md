---
id: "tin-hieu-he-thong.ip-algorithm"
doc_id: "tin-hieu-he-thong"
title: "IP Algorithm"
level: 2
heading_path: ["Sampling Methods", "IP Algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-1-6-sampling-and-the-em-algorithm"
next_id: "tin-hieu-he-thong.11-2-markov-chain-monte-carlo"
block_ids: ["b5907", "b5908", "b5909", "b5910", "b5911", "b5912", "b5913", "b5914", "b5915"]
---

## IP Algorithm

I-step. We wish to sample from $p ( \mathbf { Z } | \mathbf { X } )$ but we cannot do this directly. We therefore note the relation

p (\mathbf {Z} | \mathbf {X}) = \int p (\mathbf {Z} | \boldsymbol {\theta}, \mathbf {X}) p (\boldsymbol {\theta} | \mathbf {X}) \mathrm{d} \boldsymbol {\theta}\tag{11.30}

and hence for $l = 1 , \ldots , L$ we first draw a sample $\pmb \theta ^ { ( l ) }$ from the current estimate for $p ( \pmb \theta | \mathbf X )$ , and then use this to draw a sample $\mathbf { Z } ^ { ( l ) }$ from $p ( \mathbf { Z } | \pmb { \theta } ^ { ( l ) } , \mathbf { X } )$ . P-step. Given the relation

p (\pmb {\theta} | \mathbf {X}) = \int p (\pmb {\theta} | \mathbf {Z}, \mathbf {X}) p (\mathbf {Z} | \mathbf {X}) \mathrm{d} \mathbf {Z}\tag{11.31}

we use the samples $\{ \mathbf { Z } ^ { ( l ) } \}$ obtained from the I-step to compute a revised estimate of the posterior distribution over θ given by

p (\boldsymbol {\theta} | \mathbf {X}) \simeq \frac {1}{L} \sum_ {l = 1} ^ {L} p (\boldsymbol {\theta} | \mathbf {Z} ^ {(l)}, \mathbf {X}).\tag{11.32}

By assumption, it will be feasible to sample from this approximation in the I-step.

Note that we are making a (somewhat artificial) distinction between parameters θ and hidden variables Z. From now on, we blur this distinction and focus simply on the problem of drawing samples from a given posterior distribution.
