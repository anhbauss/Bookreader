---
id: "tin-hieu-he-thong.8-4-inference-in-graphical-models"
doc_id: "tin-hieu-he-thong"
title: "8.4. Inference in Graphical Models"
level: 2
heading_path: ["Graphical Models", "8.4. Inference in Graphical Models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-3-4-relation-to-directed-graphs"
next_id: "tin-hieu-he-thong.8-4-1-inference-on-a-chain"
block_ids: ["b4402", "b4403", "b4404", "b4405", "b4406", "b4407", "b4408", "b4409", "b4410", "b4411", "b4412", "b4413", "b4414", "b4415", "b4416"]
---

## 8.4. Inference in Graphical Models

We turn now to the problem of inference in graphical models, in which some of the nodes in a graph are clamped to observed values, and we wish to compute the posterior distributions of one or more subsets of other nodes. As we shall see, we can exploit the graphical structure both to find efficient algorithms for inference, and

Figure 8.37 A graphical representation of Bayes’ theorem. See the text for details.

![image](images/part-003--89abe895e22536c6c8d4eddd4e27d36e1d0a2ef11240381a4e7f9a402a04a8bd.jpg)

(a)

![image](images/part-003--4a5044f9ab474a7b9056faafeaa11c2c4e6c32e981059e1723a43ed76418d1c4.jpg)

(b)

![image](images/part-003--460a64192c9bd50deb60eb40dc864d6ebc7321627df3db2afcefe36eccf9702f.jpg)

(c)

to make the structure of those algorithms transparent. Specifically, we shall see that many algorithms can be expressed in terms of the propagation of local messages around the graph. In this section, we shall focus primarily on techniques for exact inference, and in Chapter 10 we shall consider a number of approximate inference algorithms.

To start with, let us consider the graphical interpretation of Bayes’ theorem. Suppose we decompose the joint distribution $p ( x , y )$ over two variables x and y into a product of factors in the form $p ( x , y ) = p ( x ) p ( y | x )$ . This can be represented by the directed graph shown in Figure 8.37(a). Now suppose we observe the value of $y ,$ as indicated by the shaded node in Figure 8.37(b). We can view the marginal distribution $p ( x )$ as a prior over the latent variable x, and our goal is to infer the corresponding posterior distribution over x. Using the sum and product rules of probability we can evaluate

p (y) = \sum_ {x ^ {\prime}} p (y | x ^ {\prime}) p (x ^ {\prime})\tag{8.47}

which can then be used in Bayes’ theorem to calculate

p (x | y) = \frac {p (y | x) p (x)}{p (y)}.\tag{8.48}

Thus the joint distribution is now expressed in terms of $p ( y )$ and $p ( x | y )$ . From a graphical perspective, the joint distribution $p ( x , y )$ is now represented by the graph shown in Figure 8.37(c), in which the direction of the arrow is reversed. This is the simplest example of an inference problem for a graphical model.
