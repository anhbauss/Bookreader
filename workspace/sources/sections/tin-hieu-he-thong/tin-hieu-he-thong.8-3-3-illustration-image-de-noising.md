---
id: "tin-hieu-he-thong.8-3-3-illustration-image-de-noising"
doc_id: "tin-hieu-he-thong"
title: "8.3.3 Illustration: Image de-noising"
level: 2
heading_path: ["Graphical Models", "8.3.3 Illustration: Image de-noising"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-3-2-factorization-properties"
next_id: "tin-hieu-he-thong.8-3-4-relation-to-directed-graphs"
block_ids: ["b4348", "b4349", "b4350", "b4351", "b4352", "b4353", "b4354", "b4355", "b4356", "b4357", "b4358", "b4359", "b4360", "b4361", "b4362", "b4363", "b4364", "b4365", "b4366", "b4367", "b4368", "b4369", "b4370", "b4371"]
---

## 8.3.3 Illustration: Image de-noising

We can illustrate the application of undirected graphs using an example of noise removal from a binary image (Besag, 1974; Geman and Geman, 1984; Besag, 1986). Although a very simple example, this is typical of more sophisticated applications. Let the observed noisy image be described by an array of binary pixel values $y _ { i } \in$ $\{ - 1 , + 1 \}$ , where the index $i = 1 , \ldots , D$ runs over all pixels. We shall suppose that the image is obtained by taking an unknown noise-free image, described by binary pixel values $x _ { i } \in \{ - 1 , + 1 \}$ and randomly flipping the sign of pixels with some small probability. An example binary image, together with a noise corrupted image obtained by flipping the sign of the pixels with probability 10%, is shown in Figure 8.30. Given the noisy image, our goal is to recover the original noise-free image.

Because the noise level is small, we know that there will be a strong correlation between $x _ { i }$ and $y _ { i }$ . We also know that neighbouring pixels $x _ { i }$ and $x _ { j }$ in an image are strongly correlated. This prior knowledge can be captured using the Markov random field model whose undirected graph is shown in Figure 8.31. This graph has two types of cliques, each of which contains two variables. The cliques of the form $\{ x _ { i } , y _ { i } \}$ have an associated energy function that expresses the correlation between these variables. We choose a very simple energy function for these cliques of the form $- \eta x _ { i } y _ { i }$ where $\eta$ is a positive constant. This has the desired effect of giving a lower energy (thus encouraging a higher probability) when $x _ { i }$ and $y _ { i }$ have the same sign and a higher energy when they have the opposite sign.

![image](images/part-003--c87b905a56dfa4f35a30ec93a92d92b9fe2fefba729778de6f11f39368e4e2f1.jpg)

![image](images/part-003--1aa1e04c033a20fe59a4c2e4b077f169de8be28cfbbe2628f860d13b4fd2e3cc.jpg)

![image](images/part-003--a207f2d30fa57249e95e22f3a440ad1603e928240e18348012f235986f3b0a0c.jpg)

![image](images/part-003--68ab7778d73161fc150ef01e017a6a37db97e149a8023f22b734cde251028ade.jpg)

Figure 8.30 Illustration of image de-noising using a Markov random field. The top row shows the original binary image on the left and the corrupted image after randomly changing 10% of the pixels on the right. The bottom row shows the restored images obtained using iterated conditional models (ICM) on the left and using the graph-cut algorithm on the right. ICM produces an image where 96% of the pixels agree with the original image, whereas the corresponding number for graph-cut is 99%.

The remaining cliques comprise pairs of variables $\{ x _ { i } , x _ { j } \}$ where $i$ and $j$ are indices of neighbouring pixels. Again, we want the energy to be lower when the pixels have the same sign than when they have the opposite sign, and so we choose an energy given by $\mathbf { - } \beta x _ { i } x _ { j }$ where $\beta$ is a positive constant.

Because a potential function is an arbitrary, nonnegative function over a maximal clique, we can multiply it by any nonnegative functions of subsets of the clique, or

An undirected graphical model representing a Markov random field for image de-noising, in which $x _ { i }$ is a binary variable denoting the state of pixel i in the unknown noise-free image, and $y _ { i }$ denotes the corresponding value of pixel i in the observed noisy image.

![image](images/part-003--c3c088095d0c4dd3ef3b3c3014e33cb8bcc438c3d3333082a1a313b17fa5e1f2.jpg)

equivalently we can add the corresponding energies. In this example, this allows us to add an extra term $h x _ { i }$ for each pixel i in the noise-free image. Such a term has the effect of biasing the model towards pixel values that have one particular sign in preference to the other.

The complete energy function for the model then takes the form

E (\mathbf {x}, \mathbf {y}) = h \sum_ {i} x _ {i} - \beta \sum_ {\{i, j \}} x _ {i} x _ {j} - \eta \sum_ {i} x _ {i} y _ {i}\tag{8.42}

which defines a joint distribution over x and y given by

p (\mathbf {x}, \mathbf {y}) = \frac {1}{Z} \exp \{- E (\mathbf {x}, \mathbf {y}) \}.\tag{8.43}

We now fix the elements of $\mathbf { y }$ to the observed values given by the pixels of the noisy image, which implicitly defines a conditional distribution $p ( \mathbf { x } | \mathbf { y } )$ over noisefree images. This is an example of the Ising model, which has been widely studied in statistical physics. For the purposes of image restoration, we wish to find an image x having a high probability (ideally the maximum probability). To do this we shall use a simple iterative technique called iterated conditional modes, or ICM (Kittler and Foglein, 1984), which is simply an application of coordinate-wise gradient ascent.¨ The idea is first to initialize the variables $\{ x _ { i } \}$ , which we do by simply setting $x _ { i } =$ $y _ { i }$ for all i. Then we take one node $x _ { j }$ at a time and we evaluate the total energy for the two possible states $x _ { j } = + 1$ and $x _ { j } = - 1$ , keeping all other node variables fixed, and set $x _ { j }$ to whichever state has the lower energy. This will either leave the probability unchanged, if $x _ { j }$ is unchanged, or will increase it. Because only one variable is changed, this is a simple local computation that can be performed efficiently. We then repeat the update for another site, and so on, until some suitable stopping criterion is satisfied. The nodes may be updated in a systematic way, for instance by repeatedly raster scanning through the image, or by choosing nodes at random.

If we have a sequence of updates in which every site is visited at least once, and in which no changes to the variables are made, then by definition the algorithm

Figure 8.32 graph. (b) graph.

![image](images/part-003--f4d6f5d5642c5089173544a2d9ed455787b17dde8ba5b71d344186db38d47833.jpg)

will have converged to a local maximum of the probability. This need not, however, correspond to the global maximum.

For the purposes of this simple illustration, we have fixed the parameters to be $\beta = 1 . 0 , \eta = 2 . 1$ and $h = 0$ . Note that leaving $h = 0$ simply means that the prior probabilities of the two states of $x _ { i }$ are equal. Starting with the observed noisy image as the initial configuration, we run ICM until convergence, leading to the de-noised image shown in the lower left panel of Figure 8.30. Note that if we set $\beta = 0$ which effectively removes the links between neighbouring pixels, then the global most probable solution is given by $x _ { i } = y _ { i }$ for all i, corresponding to the observed noisy image.

Later we shall discuss a more effective algorithm for finding high probability solutions called the max-product algorithm, which typically leads to better solutions, although this is still not guaranteed to find the global maximum of the posterior distribution. However, for certain classes of model, including the one given by (8.42), there exist efficient algorithms based on graph cuts that are guaranteed to find the global maximum (Greig et al., 1989; Boykov et al., 2001; Kolmogorov and Zabih, 2004). The lower right panel of Figure 8.30 shows the result of applying a graph-cut algorithm to the de-noising problem.
