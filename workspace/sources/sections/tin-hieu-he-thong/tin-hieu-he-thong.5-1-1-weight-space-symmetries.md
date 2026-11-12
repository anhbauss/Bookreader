---
id: "tin-hieu-he-thong.5-1-1-weight-space-symmetries"
doc_id: "tin-hieu-he-thong"
title: "5.1.1 Weight-space symmetries"
level: 2
heading_path: ["Neural Networks", "5.1.1 Weight-space symmetries"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-1-feed-forward-network-functions"
next_id: "tin-hieu-he-thong.5-2-network-training"
block_ids: ["b2641", "b2642", "b2643", "b2644", "b2645", "b2646", "b2647"]
---

## 5.1.1 Weight-space symmetries

One property of feed-forward networks, which will play a role when we consider Bayesian model comparison, is that multiple distinct choices for the weight vector w can all give rise to the same mapping function from inputs to outputs (Chen et al., 1993). Consider a two-layer network of the form shown in Figure 5.1 with M hidden units having ‘tanh’ activation functions and full connectivity in both layers. If we change the sign of all of the weights and the bias feeding into a particular hidden unit, then, for a given input pattern, the sign of the activation of the hidden unit will be reversed, because ‘tanh’ is an odd function, so that tanh $( - a ) = - \operatorname { t a n h } ( a )$ . This transformation can be exactly compensated by changing the sign of all of the weights leading out of that hidden unit. Thus, by changing the signs of a particular group of weights (and a bias), the input–output mapping function represented by the network is unchanged, and so we have found two different weight vectors that give rise to the same mapping function. For M hidden units, there will be M such ‘sign-flip

Figure 5.4 Example of the solution of a simple twoclass classification problem involving synthetic data using a neural network having two inputs, two hidden units with ‘tanh’ activation functions, and a single output having a logistic sigmoid activation function. The dashed blue lines show the $z = 0 . 5$ contours for each of the hidden units, and the red line shows the $y = 0 . 5$ decision surface for the network. For comparison, the green line denotes the optimal decision boundary computed from the distributions used to generate the data.

![image](images/part-002--1d9ae1a19fea3bdd511656d736012b3ddbca562a3795e3cf764e17fb2b32d7ff.jpg)

symmetries, and thus any given weight vector will be one of a set $2 ^ { M }$ equivalent weight vectors .

Similarly, imagine that we interchange the values of all of the weights (and the bias) leading both into and out of a particular hidden unit with the corresponding values of the weights (and bias) associated with a different hidden unit. Again, this clearly leaves the network input–output mapping function unchanged, but it corresponds to a different choice of weight vector. For M hidden units, any given weight vector will belong to a set of M! equivalent weight vectors associated with this interchange symmetry, corresponding to the M! different orderings of the hidden units. The network will therefore have an overall weight-space symmetry factor of $M ! 2 ^ { M }$ For networks with more than two layers of weights, the total level of symmetry will be given by the product of such factors, one for each layer of hidden units.

It turns out that these factors account for all of the symmetries in weight space (except for possible accidental symmetries due to specific choices for the weight values). Furthermore, the existence of these symmetries is not a particular property of the ‘tanh’ function but applies to a wide range of activation functions (Kurkov˙ a and´ Kainen, 1994). In many cases, these symmetries in weight space are of little practical consequence, although in Section 5.7 we shall encounter a situation in which we need to take them into account.
