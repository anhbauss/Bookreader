---
id: "tin-hieu-he-thong.frank-rosenblatt-1928-1969"
doc_id: "tin-hieu-he-thong"
title: "Frank Rosenblatt 1928\u20131969"
level: 2
heading_path: ["4 Linear Models for Classification", "Frank Rosenblatt 1928\u20131969"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-1-7-the-perceptron-algorithm"
next_id: "tin-hieu-he-thong.4-2-probabilistic-generative-models"
block_ids: ["b2222", "b2223", "b2224", "b2225", "b2226", "b2227", "b2228", "b2229", "b2230", "b2231", "b2232", "b2233", "b2234", "b2235", "b2236", "b2237", "b2238", "b2239", "b2240", "b2241", "b2242", "b2243", "b2244"]
---

## Frank Rosenblatt 1928–1969

Rosenblatt’s perceptron played an important role in the history of machine learning. Initially, Rosenblatt simulated the perceptron on an IBM 704 computer at Cornell in 1957, but by the early 1960s he had built special-purpose hardware that provided a direct, parallel implementation of perceptron learning. Many of his ideas were encapsulated in “Principles of Neurodynamics: Perceptrons and the Theory of Brain Mechanisms” published in 1962. Rosenblatt’s work was criticized by Marvin Minksy, whose objections were published in the book “Perceptrons”, co-authored with

Seymour Papert. This book was widely misinterpreted at the time as showing that neural networks were fatally flawed and could only learn solutions for linearly separable problems. In fact, it only proved such limitations in the case of single-layer networks such as the perceptron and merely conjectured (incorrectly) that they applied to more general network models. Unfortunately, however, this book contributed to the substantial decline in research funding for neural computing, a situation that was not reversed until the mid-1980s. Today, there are many hundreds, if not thousands, of applications of neural networks in widespread use, with examples in areas such as handwriting recognition and information retrieval being used routinely by millions of people.

where denotes the set of all misclassified patterns. The contribution to the error associated with a particular misclassified pattern is a linear function of w in regions of w space where the pattern is misclassified and zero in regions where it is correctly classified. The total error function is therefore piecewise linear.

We now apply the stochastic gradient descent algorithm to this error function. The change in the weight vector w is then given by

\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} - \eta \nabla E _ {\mathrm{P}} (\mathbf {w}) = \mathbf {w} ^ {(\tau)} + \eta \phi_ {n} t _ {n}\tag{4.55}

where $\eta$ is the learning rate parameter and $\tau$ is an integer that indexes the steps of the algorithm. Because the perceptron function $y ( \mathbf { x } , \mathbf { w } )$ is unchanged if we multiply w by a constant, we can set the learning rate parameter $\eta$ equal to 1 without of generality. Note that, as the weight vector evolves during training, the set of patterns that are misclassified will change.

The perceptron learning algorithm has a simple interpretation, as follows. We cycle through the training patterns in turn, and for each pattern ${ \bf x } _ { n }$ we evaluate the perceptron function (4.52). If the pattern is correctly classified, then the weight vector remains unchanged, whereas if it is incorrectly classified, then for class $\mathcal { C } _ { 1 }$ we add the vector $\phi (  { \mathbf { x } } _ { n } )$ onto the current estimate of weight vector w while for class $\mathcal { C } _ { 2 }$ we subtract the vector $\phi (  { \mathbf { x } } _ { n } )$ from $\mathbf { w } .$ . The perceptron learning algorithm is illustrated in Figure 4.7.

If we consider the effect of a single update in the perceptron learning algorithm, we see that the contribution to the error from a misclassified pattern will be reduced because from (4.55) we have

- \mathbf {w} ^ {(\tau + 1) \mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n} = - \mathbf {w} ^ {(\tau) \mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n} - (\boldsymbol {\phi} _ {n} t _ {n}) ^ {\mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n} <   - \mathbf {w} ^ {(\tau) \mathrm{T}} \boldsymbol {\phi} _ {n} t _ {n}\tag{4.56}

where we have set $\eta = 1$ , and made use of $\| \phi _ { n } t _ { n } \| ^ { 2 } > 0$ . Of course, this does not imply that the contribution to the error function from the other misclassified patterns will have been reduced. Furthermore, the change in weight vector may have caused some previously correctly classified patterns to become misclassified. Thus the perceptron learning rule is not guaranteed to reduce the total error function at each stage.

However, the perceptron convergence theorem states that if there exists an exact solution (in other words, if the training data set is linearly separable), then the perceptron learning algorithm is guaranteed to find an exact solution in a finite number of steps. Proofs of this theorem can be found for example in Rosenblatt (1962), Block (1962), Nilsson (1965), Minsky and Papert (1969), Hertz et al. (1991), and Bishop (1995a). Note, however, that the number of steps required to achieve convergence could still be substantial, and in practice, until convergence is achieved, we will not be able to distinguish between a nonseparable problem and one that is simply slow to converge.

Even when the data set is linearly separable, there may be many solutions, and which one is found will depend on the initialization of the parameters and on the order of presentation of the data points. Furthermore, for data sets that are not linearly separable, the perceptron learning algorithm will never converge.

![image](images/part-002--e5976a6fcc6daf4ffd9835c03b5926a05b5f80595886f20369aef95292cb72b5.jpg)

![image](images/part-002--37a7e32b7e9e3486fa25049c2a8c7c8835b25458e51aec15860ea447c895c0e2.jpg)

![image](images/part-002--7fca87f5cee35c86e2e62bd07ce0baf7ebc28286d3b4ba91f76a27ad9712d20f.jpg)

![image](images/part-002--191a6bbccf0c72c50d36948f3b86687b57a3892a064b3108e218060b0099d9bc.jpg)

Figure 4.7 Illustration of the convergence of the perceptron learning algorithm, showing data points from two classes (red and blue) in a two-dimensional feature space $( \phi _ { 1 } , \phi _ { 2 } )$ . The top left plot shows the initial parameter vector w shown as a black arrow together with the corresponding decision boundary (black line), in which the arrow points towards the decision region which classified as belonging to the red class. The data point circled in green is misclassified and so its feature vector is added to the current weight vector, giving the new decision boundary shown in the top right plot. The bottom left plot shows the next misclassified point to be considered, indicated by the green circle, and its feature vector is again added to the weight vector giving the decision boundary shown in the bottom right plot for which all data points are correctly classified.

![image](images/part-002--4fec53298a4f128374cf87727e1dd8346364fd0e8b32644efd8aef58938b7a5c.jpg)

Figure 4.8 Illustration of the Mark 1 perceptron hardware. The photograph on the left shows how the inputs were obtained using a simple camera system in which an input scene, in this case a printed character, was illuminated by powerful lights, and an image focussed onto a 20 20 array of cadmium sulphide photocells, giving a primitive 400 pixel image. The perceptron also had a patch board, shown in the middle photograph, which allowed different configurations of input features to be tried. Often these were wired up at random to demonstrate the ability of the perceptron to learn without the need for precise wiring, in contrast to a modern digital computer. The photograph on the right shows one of the racks of adaptive weights. Each weight was implemented using a rotary variable resistor, also called a potentiometer, driven by an electric motor thereby allowing the value of the weight to be adjusted automatically by the learning algorithm.

Aside from difficulties with the learning algorithm, the perceptron does not provide probabilistic outputs, nor does it generalize readily to K > 2 classes. The most important limitation, however, arises from the fact that (in common with all of the models discussed in this chapter and the previous one) it is based on linear combinations of fixed basis functions. More detailed discussions of the limitations of perceptrons can be found in Minsky and Papert (1969) and Bishop (1995a).

Analogue hardware implementations of the perceptron were built by Rosenblatt, based on motor-driven variable resistors to implement the adaptive parameters $w _ { j }$ These are illustrated in Figure 4.8. The inputs were obtained from a simple camera system based on an array of photo-sensors, while the basis functions φ could be chosen in a variety of ways, for example based on simple fixed functions of randomly chosen subsets of pixels from the input image. Typical applications involved learning to discriminate simple shapes or characters.

At the same time that the perceptron was being developed, a closely related system called the adaline, which is short for ‘adaptive linear element’, was being explored by Widrow and co-workers. The functional form of the model was the same as for the perceptron, but a different approach to training was adopted (Widrow and Hoff, 1960; Widrow and Lehr, 1990).
