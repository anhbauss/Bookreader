---
id: "tin-hieu-he-thong.5-5-2-early-stopping"
doc_id: "tin-hieu-he-thong"
title: "5.5.2 Early stopping"
level: 2
heading_path: ["Neural Networks", "5.5.2 Early stopping"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-5-1-consistent-gaussian-priors"
next_id: "tin-hieu-he-thong.5-5-3-invariances"
block_ids: ["b2981", "b2982", "b2983", "b2984", "b2985", "b2986", "b2987", "b2988", "b2989", "b2990", "b2991", "b2992"]
---

## 5.5.2 Early stopping

An alternative to regularization as a way of controlling the effective complexity of a network is the procedure of early stopping. The training of nonlinear network models corresponds to an iterative reduction of the error function defined with respect to a set of training data. For many of the optimization algorithms used for network training, such as conjugate gradients, the error is a nonincreasing function of the iteration index. However, the error measured with respect to independent data, generally called a validation set, often shows a decrease at first, followed by an increase as the network starts to over-fit. Training can therefore be stopped at the point of smallest error with respect to the validation data set, as indicated in Figure 5.12, in order to obtain a network having good generalization performance.

The behaviour of the network in this case is sometimes explained qualitatively in terms of the effective number of degrees of freedom in the network, in which this number starts out small and then to grows during the training process, corresponding to a steady increase in the effective complexity of the model. Halting training before a minimum of the training error has been reached then represents a way of limiting the effective network complexity.

![image](images/part-002--d08c077462d6678b15d1bd500d6dac39f7b1e60e596cda0b7f121c22edf94757.jpg)

![image](images/part-002--4771aff82e6dafcffed773ba26fdc44ddea522d9dbc910fbbc5492ff12ad8005.jpg)

![image](images/part-002--cf812c483c8de4767f5187788f40974d3e2aa3cf00ba974e609867b1cbf71cbf.jpg)

![image](images/part-002--851acbbb9aeb17a20295cf9a90713550008b91e0a3c69355eecbb68ac1ab20ad.jpg)

Figure 5.11 Illustration of the effect of the hyperparameters governing the prior distribution over weights and biases in a two-layer network having a single input, a single linear output, and 12 hidden units having ‘tanh’ activation functions. The priors are governed by four hyperparameters $\alpha _ { 1 } ^ { \mathrm { b } } , \alpha _ { 1 } ^ { \mathrm { w } } , \alpha _ { 2 } ^ { \mathrm { b } }$ , and $\alpha _ { 2 } ^ { \mathrm { w } }$ , which represent the precisions of the Gaussian distributions of the first-layer biases, first-layer weights, second-layer biases, and second-layer weights, respectively. We see that the parameter $\alpha _ { 2 } ^ { \mathrm { w } }$ governs the vertical scale of functions (note the different vertical axis ranges on the top two diagrams), $\alpha _ { 1 } ^ { \mathrm { w } }$ governs the horizontal scale of variations in the function values, and $\alpha _ { 1 } ^ { \mathrm { b } }$ governs the horizontal range over which variations occur. The parameter $\alpha _ { 2 } ^ { \mathrm { b } }$ , whose effect is not illustrated here, governs the range of vertical offsets of the functions.

In the case of a quadratic error function, we can verify this insight, and show that early stopping should exhibit similar behaviour to regularization using a simple weight-decay term. This can be understood from Figure 5.13, in which the axes in weight space have been rotated to be parallel to the eigenvectors of the Hessian matrix. If, in the absence of weight decay, the weight vector starts at the origin and proceeds during training along a path that follows the local negative gradient vector, then the weight vector will move initially parallel to the $w _ { 2 }$ axis through a point corresponding roughly to $\widetilde { \mathbf { w } }$ and then move towards the minimum of the error function $\mathbf { w } _ { \mathrm { M L } }$ . This follows from the shape of the error surface and the widely differing eigenvalues of the Hessian. Stopping at a point near $\widetilde { \mathbf { w } }$ is therefore similar to weight decay. The relationship between early stopping and weight decay can be made quantitative, thereby showing that the quantity $\tau \eta$ (where τ is the iteration index, and η is the learning rate parameter) plays the role of the reciprocal of the regularization parameter λ. The effective number of parameters in the network therefore grows during the course of training.

![image](images/part-002--40eaf11e3886260ee12bb234aab4b133e73d6ee2179d7bc24f9e85727a8878ad.jpg)

![image](images/part-002--14ce494ad817dbf9312bb80f81b4a27319f3ae8d09e42fcf80e0109af55ec37a.jpg)

Figure 5.12 An illustration of the behaviour of training set error (left) and validation set error (right) during a typical training session, as a function of the iteration step, for the sinusoidal data set. The goal of achieving the best generalization performance suggests that training should be stopped at the point shown by the vertical dashed lines, corresponding to the minimum of the validation set error.
