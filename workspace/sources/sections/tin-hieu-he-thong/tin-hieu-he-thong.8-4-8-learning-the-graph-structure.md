---
id: "tin-hieu-he-thong.8-4-8-learning-the-graph-structure"
doc_id: "tin-hieu-he-thong"
title: "8.4.8 Learning the graph structure"
level: 2
heading_path: ["Graphical Models", "8.4.8 Learning the graph structure"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-4-7-loopy-belief-propagation"
next_id: "tin-hieu-he-thong.exercises-9"
block_ids: ["b4653", "b4654", "b4655", "b4656", "b4657", "b4658"]
---

## 8.4.8 Learning the graph structure

In our discussion of inference in graphical models, we have assumed that the structure of the graph is known and fixed. However, there is also interest in going beyond the inference problem and learning the graph structure itself from data (Friedman and Koller, 2003). This requires that we define a space of possible structures as well as a measure that can be used to score each structure.

From a Bayesian viewpoint, we would ideally like to compute a posterior distribution over graph structures and to make predictions by averaging with respect to this distribution. If we have a prior $p ( m )$ over graphs indexed by m, then the posterior distribution is given by

p (m | \mathcal {D}) \propto p (m) p (\mathcal {D} | m)\tag{8.103}

where is the observed data set. The model evidence $p ( \mathcal { D } | m )$ then provides the score for each model. However, evaluation of the evidence involves marginalization over the latent variables and presents a challenging computational problem for many models.

Exploring the space of structures can also be problematic. Because the number of different graph structures grows exponentially with the number of nodes, it is often necessary to resort to heuristics to find good candidates.
