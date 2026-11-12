---
id: "tin-hieu-he-thong.12-4-2-autoassociative-neural-networks"
doc_id: "tin-hieu-he-thong"
title: "12.4.2 Autoassociative neural networks"
level: 2
heading_path: ["Sampling Methods", "12.4.2 Autoassociative neural networks"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-4-1-independent-component-analysis"
next_id: "tin-hieu-he-thong.12-4-3-modelling-nonlinear-manifolds"
block_ids: ["b6457", "b6458", "b6459", "b6460", "b6461", "b6462", "b6463", "b6464", "b6465", "b6466", "b6467", "b6468", "b6469", "b6470", "b6471", "b6472", "b6473"]
---

## 12.4.2 Autoassociative neural networks

In Chapter 5 we considered neural networks in the context of supervised learn ing, where the role of the network is to predict the output variables given values

Figure 12.18

An autoassociative mUltilayer perceptron havin two layers of weights. Such a network is trained to map input vectors onto themselves by minimiza tion ot a sum-ot-squares error. Even with non linear units in the hidden layer, such a network is equivalent to linear principal component anal ysis. Links representing bias parameters have been omitted for clarity.

![image](images/part-004--be677a212d2077b2882a379ff253639f765321e8a0da5317d78561ed2f51cd65.jpg)

for the input variables. However, neural networks have also been applied to un supervised learning where they have been used for dimensionality reduction. Thi is achieved by using a network having the same number of outputs as inputs, and optimizing the weights so as to minimize some measure of the reconstruction erro between inputs and outputs with respect to a set of training data.

Consider first a multilayer perceptron of the form shown in Figure 12.18, having D inputs, $D$ output units and M hidden units, with $M < D$ . The targets used to train the network are simply the input vectors themselves, so that the network is attempting to map each input vector onto itself. Such a network is said to form an autoassociative mapping. Since the number of hidden units is smaller than the number of inputs, a perfect reconstruction of all input vectors is not in general possible. We therefore determine the network parameters w by minimizing an error function which captures the degree of mismatch between the input vectors and their reconstructions. In particular, we shall choose a sum-of-squares error of the form

E (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \| \mathbf {y} (\mathbf {x} _ {n}, \mathbf {w}) - \mathbf {x} _ {n} \| ^ {2}.\tag{12.91}

If the hidden units have linear activations functions, then it can be shown that the error function has a unique global minimum, and that at this minimum the network performs a projection onto the M -dimensional subspace which is spanned by the first M principal components of the data (Bourlard and Kamp, 1988; Baldi and Hornik, 1989). Thus, the vectors of weights which lead into the hidden units in Figure 12.18 form a basis set which spans the principal subspace. Note, however, that these vectors need not be orthogonal or normalized. This result is unsurprising, since both principal component analysis and the neural network are using linear dimensionality reduction and are minimizing the same sum-of-squares error function.

It might be thought that the limitations of a linear dimensionality reduction could be overcome by using nonlinear (sigmoidal) activation functions for the hidden units in the network in Figure 12.18. However, even with nonlinear hidden units, the minimum error solution is again given by the projection onto the principal component subspace (Bourlard and Kamp, 1988). There is therefore no advantage in using twolayer neural networks to perform dimensionality reduction. Standard techniques for principal component analysis (based on singular value decomposition) are guaranteed to give the correct solution in finite time, and they also generate an ordered set of eigenvalues with corresponding orthonormal eigenvectors.

Addition of extra hidden layers of noolinear units gives an auloassocialive network which can perform a noolinear dimensiooality reduction.

![image](images/part-004--0ae85397bbfa0a67b95bd7b20d38c3558a1a624a4b35abe844986aa49f40d5c7.jpg)

The situation is different, however. if additional hidden layers are pcrmillcd in the network. Consider the four-layer autoassociativc network shown in Figure 12.19. Again the output units are linear, and the M units in the second hidden layer can also be linear. however, the first and third hidden layers have sigmoidal nonlinear activation functions. The network is again trained by minimization of the error function (12.91). We can view this network as two successive functional mappings $\mathbf { F } _ { 1 }$ and $\mathbf { F } _ { 2 }$ , as indicated in Figure 12.19. The first mapping $\mathbf { F } _ { 1 }$ projects the original $D _ { - }$ dimensional data onto an AI-dimensional subspace $s$ defined by the activations o the units in the second hidden layer. Because of the presence of the first hidden layer of nonlinear units. this mapping is very general. and in particular is not restricted to being linear. Similarly. the second half of the network defines an arbitrary functional mapping from the M -dimensional space back into the original D-dimensional input space. This has a simple geometrical interpretation. as indicated for the case $D = 3$ and $M = 2$ in Figure 12.20.

Such a network effectively perfonns a nonlinear principal component analysis.

![image](images/part-004--94b41c6183ddba62929e3472218cf3a79724d5af12ab8ac60a14f8f3890dd097.jpg)

Figure 12.20 Geometrical interpretation of the mappings performed by the network in Figure 12.1 g for the case of $\mathrm { ~ D = 3 }$ inputs and $M = 2$ units in the middle hidden layer. The function F, maps from an M-dimensiona $\mathbf { F } _ { 2 }$ space S into a D-dimensiooal space and therefore defines the way in which the space S is embedded within the original x-space. Since the mapping $\mathbf { F } _ { 2 }$ can be r"I()(llinear, the embedding 0 $s$ can be nonplanar, as indicated in the figure. The mapping $\mathbf { F } _ { 1 }$ then defines a projectiorl of points in the original D-dimensional space into the M -dimensional subspace $s .$

It has the advantage of not being limited to linear transformations, although it con tains standard principal component analysis as a special case. However, training the network now involves a nonlinear optimization problem, since the error function (12.91) is no longer a quadratic function of the network parameters. Computation ally intensive nonlinear optimization techniques must be used, and there is the risk o finding a suboptimal local minimum of the error function. Also, the dimensionality of the subspace must be specified before training the network.
