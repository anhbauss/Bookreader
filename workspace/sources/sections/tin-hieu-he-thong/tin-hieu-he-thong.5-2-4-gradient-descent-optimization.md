---
id: "tin-hieu-he-thong.5-2-4-gradient-descent-optimization"
doc_id: "tin-hieu-he-thong"
title: "5.2.4 Gradient descent optimization"
level: 2
heading_path: ["Neural Networks", "5.2.4 Gradient descent optimization"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-2-3-use-of-gradient-information"
next_id: "tin-hieu-he-thong.5-3-error-backpropagation"
block_ids: ["b2738", "b2739", "b2740", "b2741", "b2742", "b2743", "b2744", "b2745", "b2746", "b2747", "b2748", "b2749", "b2750"]
---

## 5.2.4 Gradient descent optimization

The simplest approach to using gradient information is to choose the weight update in (5.27) to comprise a small step in the direction of the negative gradient, so that

\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} - \eta \nabla E (\mathbf {w} ^ {(\tau)})\tag{5.41}

where the parameter $\eta > 0$ is known as the learning rate. After each such update, the gradient is re-evaluated for the new weight vector and the process repeated. Note that the error function is defined with respect to a training set, and so each step requires that the entire training set be processed in order to evaluate $\nabla E$ . Techniques that use the whole data set at once are called batch methods. At each step the weight vector is moved in the direction of the greatest rate of decrease of the error function, and so this approach is known as gradient descent or steepest descent. Although such an approach might intuitively seem reasonable, in fact it turns out to be a poor algorithm, for reasons discussed in Bishop and Nabney (2008).

For batch optimization, there are more efficient methods, such as conjugate gradients and quasi-Newton methods, which are much more robust and much faster than simple gradient descent (Gill et al., 1981; Fletcher, 1987; Nocedal and Wright, 1999). Unlike gradient descent, these algorithms have the property that the error function always decreases at each iteration unless the weight vector has arrived at a local or global minimum.

In order to find a sufficiently good minimum, it may be necessary to run a gradient-based algorithm multiple times, each time using a different randomly chosen starting point, and comparing the resulting performance on an independent validation set.

There is, however, an on-line version of gradient descent that has proved useful in practice for training neural networks on large data sets (Le Cun et al., 1989). Error functions based on maximum likelihood for a set of independent observations comprise a sum of terms, one for each data point

E (\mathbf {w}) = \sum_ {n = 1} ^ {N} E _ {n} (\mathbf {w}).\tag{5.42}

On-line gradient descent, also known as sequential gradient descent or stochastic gradient descent, makes an update to the weight vector based on one data point at a time, so that

\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} - \eta \nabla E _ {n} (\mathbf {w} ^ {(\tau)}).\tag{5.43}

This update is repeated by cycling through the data either in sequence or by selecting points at random with replacement. There are of course intermediate scenarios in which the updates are based on batches of data points.

One advantage of on-line methods compared to batch methods is that the former handle redundancy in the data much more efficiently. To see, this consider an extreme example in which we take a data set and double its size by duplicating every data point. Note that this simply multiplies the error function by a factor of 2 and so is equivalent to using the original error function. Batch methods will require double the computational effort to evaluate the batch error function gradient, whereas online methods will be unaffected. Another property of on-line gradient descent is the possibility of escaping from local minima, since a stationary point with respect to the error function for the whole data set will generally not be a stationary point for each data point individually.

Nonlinear optimization algorithms, and their practical application to neural network training, are discussed in detail in Bishop and Nabney (2008).
