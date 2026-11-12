---
id: "tin-hieu-he-thong.11-5-the-hybrid-monte-carlo-algorithm"
doc_id: "tin-hieu-he-thong"
title: "11.5. The Hybrid Monte Carlo Algorithm"
level: 2
heading_path: ["Sampling Methods", "11.5. The Hybrid Monte Carlo Algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-4-slice-sampling"
next_id: "tin-hieu-he-thong.11-5-1-dynamical-systems"
block_ids: ["b6014", "b6015", "b6016"]
---

## 11.5. The Hybrid Monte Carlo Algorithm

As we have already noted, one of the major limitations of the Metropolis algorithm is that it can exhibit random walk behaviour whereby the distance traversed through the state space grows only as the square root of the number of steps. The problem cannot be resolved simply by taking bigger steps as this leads to a high rejection rate.

In this section, we introduce a more sophisticated class of transitions based on an analogy with physical systems and that has the property of being able to make large changes to the system state while keeping the rejection probability small. It is applicable to distributions over continuous variables for which we can readily evaluate the gradient of the log probability with respect to the state variables. We will discuss the dynamical systems framework in Section 11.5.1, and then in Section 11.5.2 we explain how this may be combined with the Metropolis algorithm to yield the powerful hybrid Monte Carlo algorithm. A background in physics is not required as this section is self-contained and the key results are all derived from first principles.
