---
id: "tin-hieu-he-thong.8-1-2-generative-models"
doc_id: "tin-hieu-he-thong"
title: "8.1.2 Generative models"
level: 2
heading_path: ["Graphical Models", "8.1.2 Generative models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-1-1-example-polynomial-regression"
next_id: "tin-hieu-he-thong.8-1-3-discrete-variables"
block_ids: ["b4123", "b4124", "b4125", "b4126", "b4127", "b4128", "b4129", "b4130", "b4131"]
---

## 8.1.2 Generative models

There are many situations in which we wish to draw samples from a given probability distribution. Although we shall devote the whole of Chapter 11 to a detailed discussion of sampling methods, it is instructive to outline here one technique, called ancestral sampling, which is particularly relevant to graphical models. Consider a joint distribution $p ( x _ { 1 } , \ldots , x _ { K } )$ over $K$ variables that factorizes according to (8.5) corresponding to a directed acyclic graph. We shall suppose that the variables have been ordered such that there are no links from any node to any lower numbered node, in other words each node has a higher number than any of its parents. Our goal is to draw a sample $\widehat { x } _ { 1 } , \ldots , \widehat { x } _ { K }$ from the joint distribution.

To do this, we start with the lowest-numbered node and draw a sample from the distribution $p ( x _ { 1 } )$ , which we call $\widehat { x } _ { 1 }$ . We then work through each of the nodes in order, so that for node n we draw a sample from the conditional distribution $p ( x _ { n } | \mathrm { p a } _ { n } )$ in which the parent variables have been set to their sampled values. Note that at each stage, these parent values will always be available because they correspond to lowernumbered nodes that have already been sampled. Techniques for sampling from specific distributions will be discussed in detail in Chapter 11. Once we have sampled from the final variable $x _ { K }$ , we will have achieved our objective of obtaining a sample from the joint distribution. To obtain a sample from some marginal distribution corresponding to a subset of the variables, we simply take the sampled values for the required nodes and ignore the sampled values for the remaining nodes. For example, to draw a sample from the distribution $p ( x _ { 2 } , x _ { 4 } )$ , we simply sample from the full joint distribution and then retain the values $\widehat { x } _ { 2 } , \widehat { x } _ { 4 }$ and discard the remaining values $\{ \widehat { x } _ { j \neq 2 , 4 } \}$

Figure 8.8 A graphical model representing the process by which images of objects are created, in which the identity of an object (a discrete variable) and the position and orientation of that object (continuous variables) have independent prior probabilities. The image (a vector of pixel intensities) has a probability distribution that is dependent on the identity of the object as well as on its position and orientation.

![image](images/part-002--4a21deeeb0452abe075fbf6318aa66504575a620f2f4010ca6d5026a3b3418d4.jpg)

For practical applications of probabilistic models, it will typically be the highernumbered variables corresponding to terminal nodes of the graph that represent the observations, with lower-numbered nodes corresponding to latent variables. The primary role of the latent variables is to allow a complicated distribution over the observed variables to be represented in terms of a model constructed from simpler (typically exponential family) conditional distributions.

We can interpret such models as expressing the processes by which the observed data arose. For instance, consider an object recognition task in which each observed data point corresponds to an image (comprising a vector of pixel intensities) of one of the objects. In this case, the latent variables might have an interpretation as the position and orientation of the object. Given a particular observed image, our goal is to find the posterior distribution over objects, in which we integrate over all possible positions and orientations. We can represent this problem using a graphical model of the form show in Figure 8.8.

The graphical model captures the causal process (Pearl, 1988) by which the observed data was generated. For this reason, such models are often called generative models. By contrast, the polynomial regression model described by Figure 8.5 is not generative because there is no probability distribution associated with the input variable x, and so it is not possible to generate synthetic data points from this model. We could make it generative by introducing a suitable prior distribution p(x), at the expense of a more complex model.

The hidden variables in a probabilistic model need not, however, have any explicit physical interpretation but may be introduced simply to allow a more complex joint distribution to be constructed from simpler components. In either case, the technique of ancestral sampling applied to a generative model mimics the creation of the observed data and would therefore give rise to ‘fantasy’ data whose probability distribution (if the model were a perfect representation of reality) would be the same as that of the observed data. In practice, producing synthetic observations from a generative model can prove informative in understanding the form of the probability distribution represented by that model.
