---
id: "tin-hieu-he-thong.1-5-3-the-reject-option"
doc_id: "tin-hieu-he-thong"
title: "1.5.3 The reject option"
level: 2
heading_path: ["Introduction", "1.5.3 The reject option"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-5-2-minimizing-the-expected-loss"
next_id: "tin-hieu-he-thong.1-5-4-inference-and-decision"
block_ids: ["b470", "b471", "b472"]
---

## 1.5.3 The reject option

We have seen that classification errors arise from the regions of input space where the largest of the posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ is significantly less than unity, or equivalently where the joint distributions $p ( \mathbf { x } , \mathcal { C } _ { k } )$ have comparable values. These are the regions where we are relatively uncertain about class membership. In some applications, it will be appropriate to avoid making decisions on the difficult cases in anticipation of a lower error rate on those examples for which a classification decision is made. This is known as the reject option. For example, in our hypothetical medical illustration, it may be appropriate to use an automatic system to classify those X-ray images for which there is little doubt as to the correct class, while leaving a human expert to classify the more ambiguous cases. We can achieve this by introducing a threshold θ and rejecting those inputs x for which the largest of the posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ is less than or equal to θ. This is illustrated for the case of two classes, and a single continuous input variable x, in Figure 1.26. Note that setting $\theta = 1$ will ensure that all examples are rejected, whereas if there are K classes then setting $\theta < 1 / K$ will ensure that no examples are rejected. Thus the fraction of examples that get rejected is controlled by the value of θ.

We can easily extend the reject criterion to minimize the expected loss, when a loss matrix is given, taking account of the loss incurred when a reject decision is made.
