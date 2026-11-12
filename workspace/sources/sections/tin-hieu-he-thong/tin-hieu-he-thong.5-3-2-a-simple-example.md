---
id: "tin-hieu-he-thong.5-3-2-a-simple-example"
doc_id: "tin-hieu-he-thong"
title: "5.3.2 A simple example"
level: 2
heading_path: ["Neural Networks", "5.3.2 A simple example"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.error-backpropagation"
next_id: "tin-hieu-he-thong.5-3-3-efficiency-of-backpropagation"
block_ids: ["b2796", "b2797", "b2798", "b2799", "b2800", "b2801", "b2802", "b2803", "b2804", "b2805", "b2806", "b2807", "b2808", "b2809", "b2810", "b2811", "b2812", "b2813", "b2814", "b2815"]
---

## 5.3.2 A simple example

The above derivation of the backpropagation procedure allowed for general forms for the error function, the activation functions, and the network topology. In order to illustrate the application of this algorithm, we shall consider a particular example. This is chosen both for its simplicity and for its practical importance, because many applications of neural networks reported in the literature make use of this type of network. Specifically, we shall consider a two-layer network of the form illustrated in Figure 5.1, together with a sum-of-squares error, in which the output units have linear activation functions, so that $y _ { k } = a _ { k }$ , while the hidden units have logistic sigmoid activation functions given by

h (a) \equiv \tanh (a)\tag{5.58}

where

\tanh (a) = \frac {e ^ {a} - e ^ {- a}}{e ^ {a} + e ^ {- a}}.\tag{5.59}

A useful feature of this function is that its derivative can be expressed in a particularly simple form:

h ^ {\prime} (a) = 1 - h (a) ^ {2}.\tag{5.60}

We also consider a standard sum-of-squares error function, so that for pattern n the error is given by

E _ {n} = \frac {1}{2} \sum_ {k = 1} ^ {K} (y _ {k} - t _ {k}) ^ {2}\tag{5.61}

where $y _ { k }$ is the activation of output unit $k _ { : }$ , and $t _ { k }$ is the corresponding target, for a particular input pattern ${ \bf x } _ { n }$

For each pattern in the training set in turn, we first perform a forward propagation using

a _ {j} = \sum_ {i = 0} ^ {D} w _ {j i} ^ {(1)} x _ {i}\tag{5.62}

z _ {j} = \tanh (a _ {j})\tag{5.63}

y _ {k} = \sum_ {j = 0} ^ {M} w _ {k j} ^ {(2)} z _ {j}.\tag{5.64}

Next we compute the $\delta \mathbf { \dot { s } }$ for each output unit using

\delta_ {k} = y _ {k} - t _ {k}.\tag{5.65}

Then we backpropagate these to obtain δs for the hidden units using

\delta_ {j} = (1 - z _ {j} ^ {2}) \sum_ {k = 1} ^ {K} w _ {k j} \delta_ {k}.\tag{5.66}

Finally, the derivatives with respect to the first-layer and second-layer weights are given by

\frac {\partial E _ {n}}{\partial w _ {j i} ^ {(1)}} = \delta_ {j} x _ {i}, \quad \frac {\partial E _ {n}}{\partial w _ {k j} ^ {(2)}} = \delta_ {k} z _ {j}.\tag{5.67}
