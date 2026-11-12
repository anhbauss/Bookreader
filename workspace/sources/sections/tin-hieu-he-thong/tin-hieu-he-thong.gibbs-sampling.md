---
id: "tin-hieu-he-thong.gibbs-sampling"
doc_id: "tin-hieu-he-thong"
title: "Gibbs Sampling"
level: 2
heading_path: ["Sampling Methods", "Gibbs Sampling"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-3-gibbs-sampling"
next_id: "tin-hieu-he-thong.josiah-willard-gibbs-1839-1903"
block_ids: ["b5973", "b5974", "b5975", "b5976"]
---

## Gibbs Sampling

1. Initialize $\{z_{i}:i=1,\ldots,M\}$ 2. For $\tau=1,\ldots,T$ :

- Sample $z_{1}^{(\tau+1)} \sim p(z_{1}|z_{2}^{(\tau)}, z_{3}^{(\tau)}, \ldots, z_{M}^{(\tau)})$ .
- Sample $z_{2}^{(\tau+1)} \sim p(z_{2}|z_{1}^{(\tau+1)}, z_{3}^{(\tau)}, \ldots, z_{M}^{(\tau)})$ . $\vdots$ - Sample $z_{j}^{(\tau+1)} \sim p(z_{j}|z_{1}^{(\tau+1)}, \ldots, z_{j-1}^{(\tau+1)}, z_{j+1}^{(\tau)}, \ldots, z_{M}^{(\tau)})$ . $\vdots$ - Sample $z_{M}^{(\tau+1)} \sim p(z_{M}|z_{1}^{(\tau+1)}, z_{2}^{(\tau+1)}, \ldots, z_{M-1}^{(\tau+1)})$ .

![image](images/part-003--a69da9a2a027f83ff5571df636434b073fd7f442533c555dd07747d221b0a7af.jpg)
