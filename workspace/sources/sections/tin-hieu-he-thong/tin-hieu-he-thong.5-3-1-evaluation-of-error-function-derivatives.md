---
id: "tin-hieu-he-thong.5-3-1-evaluation-of-error-function-derivatives"
doc_id: "tin-hieu-he-thong"
title: "5.3.1 Evaluation of error-function derivatives"
level: 2
heading_path: ["Neural Networks", "5.3.1 Evaluation of error-function derivatives"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-3-error-backpropagation"
next_id: "tin-hieu-he-thong.error-backpropagation"
block_ids: ["b2754", "b2755", "b2756", "b2757", "b2758", "b2759", "b2760", "b2761", "b2762", "b2763", "b2764", "b2765", "b2766", "b2767", "b2768", "b2769", "b2770", "b2771", "b2772", "b2773", "b2774", "b2775", "b2776", "b2777", "b2778", "b2779", "b2780", "b2781", "b2782", "b2783", "b2784", "b2785", "b2786", "b2787", "b2788", "b2789", "b2790"]
---

## 5.3.1 Evaluation of error-function derivatives

We now derive the backpropagation algorithm for a general network having arbitrary feed-forward topology, arbitrary differentiable nonlinear activation functions, and a broad class of error function. The resulting formulae will then be illustrated using a simple layered network structure having a single layer of sigmoidal hidden units together with a sum-of-squares error.

Many error functions of practical interest, for instance those defined by maximum likelihood for a set of i.i.d. data, comprise a sum of terms, one for each data point in the training set, so that

E (\mathbf {w}) = \sum_ {n = 1} ^ {N} E _ {n} (\mathbf {w}).\tag{5.44}

Here we shall consider the problem of evaluating $\nabla E _ { n } ( \mathbf { w } )$ for one such term in the error function. This may be used directly for sequential optimization, or the results can be accumulated over the training set in the case of batch methods.

Consider first a simple linear model in which the outputs $y _ { k }$ are linear combina tions of the input variables $x _ { i }$ so that

y _ {k} = \sum_ {i} w _ {k i} x _ {i}\tag{5.45}

together with an error function that, for a particular input pattern n, takes the form

E _ {n} = \frac {1}{2} \sum_ {k} (y _ {n k} - t _ {n k}) ^ {2}\tag{5.46}

where $y _ { n k } = y _ { k } ( \mathbf x _ { n } , \mathbf w )$ . The gradient of this error function with respect to a weight $w _ { j i }$ is given by

\frac {\partial E _ {n}}{\partial w _ {j i}} = (y _ {n j} - t _ {n j}) x _ {n i}\tag{5.47}

which can be interpreted as a ‘local’ computation involving the product of an ‘error signal’ $y _ { n j } - t _ { n j }$ associated with the output end of the link $w _ { j i }$ and the variable $x _ { n i }$ associated with the input end of the link. In Section 4.3.2, we saw how a similar formula arises with the logistic sigmoid activation function together with the cross entropy error function, and similarly for the softmax activation function together with its matching cross-entropy error function. We shall now see how this simple result extends to the more complex setting of multilayer feed-forward networks.

In a general feed-forward network, each unit computes a weighted sum of its inputs of the form

a _ {j} = \sum_ {i} w _ {j i} z _ {i}\tag{5.48}

where $z _ { i }$ is the activation of a unit, or input, that sends a connection to unit $j ,$ , and $w _ { j i }$ is the weight associated with that connection. In Section 5.1, we saw that biases can be included in this sum by introducing an extra unit, or input, with activation fixed at +1. We therefore do not need to deal with biases explicitly. The sum in (5.48) is transformed by a nonlinear activation function $h ( \cdot )$ to give the activation $z _ { j }$ of unit $j$ in the form

z _ {j} = h (a _ {j}).\tag{5.49}

Note that one or more of the variables $z _ { i }$ in the sum in (5.48) could be an input, and similarly, the unit $j$ in (5.49) could be an output.

For each pattern in the training set, we shall suppose that we have supplied the corresponding input vector to the network and calculated the activations of all of the hidden and output units in the network by successive application of (5.48) and (5.49). This process is often called forward propagation because it can be regarded as a forward flow of information through the network.

Now consider the evaluation of the derivative of $E _ { n }$ with respect to a weight $w _ { j i }$ . The outputs of the various units will depend on the particular input pattern n. However, in order to keep the notation uncluttered, we shall omit the subscript n from the network variables. First we note that $E _ { n }$ depends on the weight $w _ { j i }$ only via the summed input $a _ { j }$ to unit $j$ . We can therefore apply the chain rule for partial derivatives to give

\frac {\partial E _ {n}}{\partial w _ {j i}} = \frac {\partial E _ {n}}{\partial a _ {j}} \frac {\partial a _ {j}}{\partial w _ {j i}}.\tag{5.50}

We now introduce a useful notation

\delta_ {j} \equiv \frac {\partial E _ {n}}{\partial a _ {j}}\tag{5.51}

where the $\delta \mathbf { \dot { s } }$ are often referred to as errors for reasons we shall see shortly. Using (5.48), we can write

\frac {\partial a _ {j}}{\partial w _ {j i}} = z _ {i}.\tag{5.52}

Substituting (5.51) and (5.52) into (5.50), we then obtain

\frac {\partial E _ {n}}{\partial w _ {j i}} = \delta_ {j} z _ {i}.\tag{5.53}

Equation (5.53) tells us that the required derivative is obtained simply by multiplying the value of δ for the unit at the output end of the weight by the value of $z$ for the unit at the input end of the weight (where z = 1 in the case of a bias). Note that this takes the same form as for the simple linear model considered at the start of this section. Thus, in order to evaluate the derivatives, we need only to calculate the value of $\delta _ { j }$ for each hidden and output unit in the network, and then apply (5.53).

As we have seen already, for the output units, we have

\delta_ {k} = y _ {k} - t _ {k}\tag{5.54}

igure 5.7 Illustration of the calculation of $\delta _ { j }$ for hidden unit $j$ by backpropagation of the $\delta \boldsymbol { \mathsf { s } }$ from those units k to which unit $j$ sends connections. The blue arrow denotes the direction of information flow during forward propagation, and the red arrows indicate the backward propagation of error information.

![image](images/part-002--035a8a8537a9b8c5099fc271bfe4fcbce9c157008e6143557ea658160d0cbb05.jpg)

provided we are using the canonical link as the output-unit activation function. To evaluate the $\delta \mathbf { \dot { s } }$ for hidden units, we again make use of the chain rule for partial derivatives,

\delta_ {j} \equiv \frac {\partial E _ {n}}{\partial a _ {j}} = \sum_ {k} \frac {\partial E _ {n}}{\partial a _ {k}} \frac {\partial a _ {k}}{\partial a _ {j}}\tag{5.55}

where the sum runs over all units k to which unit $j$ sends connections. The arrangement of units and weights is illustrated in Figure 5.7. Note that the units labelled k could include other hidden units and/or output units. In writing down (5.55), we are making use of the fact that variations in $a _ { j }$ give rise to variations in the error function only through variations in the variables $a _ { k }$ . If we now substitute the definition of $\delta$ given by (5.51) into (5.55), and make use of (5.48) and (5.49), we obtain the following backpropagation formula

\delta_ {j} = h ^ {\prime} (a _ {j}) \sum_ {k} w _ {k j} \delta_ {k}\tag{5.56}

which tells us that the value of $\delta$ for a particular hidden unit can be obtained by propagating the $\delta \mathbf { \dot { s } }$ backwards from units higher up in the network, as illustrated in Figure 5.7. Note that the summation in (5.56) is taken over the first index on $w _ { k j }$ (corresponding to backward propagation of information through the network), whereas in the forward propagation equation (5.10) it is taken over the second index. Because we already know the values of the $\delta \mathbf { \dot { s } }$ for the output units, it follows that by recursively applying (5.56) we can evaluate the $\delta \mathbf { \dot { s } }$ for all of the hidden units in a feed-forward network, regardless of its topology.

The backpropagation procedure can therefore be summarized as follows.
