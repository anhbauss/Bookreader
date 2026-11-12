---
id: "tin-hieu-he-thong.5-3-4-the-jacobian-matrix"
doc_id: "tin-hieu-he-thong"
title: "5.3.4 The Jacobian matrix"
level: 2
heading_path: ["Neural Networks", "5.3.4 The Jacobian matrix"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-3-3-efficiency-of-backpropagation"
next_id: "tin-hieu-he-thong.5-4-the-hessian-matrix"
block_ids: ["b2827", "b2828", "b2829", "b2830", "b2831", "b2832", "b2833", "b2834", "b2835", "b2836", "b2837", "b2838", "b2839", "b2840", "b2841", "b2842", "b2843", "b2844", "b2845", "b2846", "b2847", "b2848", "b2849"]
---

## 5.3.4 The Jacobian matrix

We have seen how the derivatives of an error function with respect to the weights can be obtained by the propagation of errors backwards through the network. The technique of backpropagation can also be applied to the calculation of other derivatives. Here we consider the evaluation of the Jacobian matrix, whose elements are given by the derivatives of the network outputs with respect to the inputs

J _ {k i} \equiv \frac {\partial y _ {k}}{\partial x _ {i}}\tag{5.70}

where each such derivative is evaluated with all other inputs held fixed. Jacobian matrices play a useful role in systems built from a number of distinct modules, as illustrated in Figure 5.8. Each module can comprise a fixed or adaptive function, which can be linear or nonlinear, so long as it is differentiable. Suppose we wish to minimize an error function E with respect to the parameter w in Figure 5.8. The derivative of the error function is given by

\frac {\partial E}{\partial w} = \sum_ {k, j} \frac {\partial E}{\partial y _ {k}} \frac {\partial y _ {k}}{\partial z _ {j}} \frac {\partial z _ {j}}{\partial w}\tag{5.71}

in which the Jacobian matrix for the red module in Figure 5.8 appears in the middle term.

Because the Jacobian matrix provides a measure of the local sensitivity of the outputs to changes in each of the input variables, it also allows any known errors $\Delta x _ { i }$ associated with the inputs to be propagated through the trained network in order to estimate their contribution $\Delta y _ { k }$ to the errors at the outputs, through the relation

\Delta y _ {k} \simeq \sum_ {i} \frac {\partial y _ {k}}{\partial x _ {i}} \Delta x _ {i}\tag{5.72}

which is valid provided the $\lvert \Delta x _ { i } \rvert$ are small. In general, the network mapping represented by a trained neural network will be nonlinear, and so the elements of the Jacobian matrix will not be constants but will depend on the particular input vector used. Thus (5.72) is valid only for small perturbations of the inputs, and the Jacobian itself must be re-evaluated for each new input vector.

The Jacobian matrix can be evaluated using a backpropagation procedure that is similar to the one derived earlier for evaluating the derivatives of an error function with respect to the weights. We start by writing the element $J _ { k i }$ in the form

\begin{array}{r c l} J _ {k i} = \frac {\partial y _ {k}}{\partial x _ {i}} & = & \sum_ {j} \frac {\partial y _ {k}}{\partial a _ {j}} \frac {\partial a _ {j}}{\partial x _ {i}} \\ & = & \sum_ {j} w _ {j i} \frac {\partial y _ {k}}{\partial a _ {j}} \end{array}\tag{5.73}

where we have made use of (5.48). The sum in (5.73) runs over all units $j$ to which the input unit $i$ sends connections (for example, over all units in the first hidden layer in the layered topology considered earlier). We now write down a recursive backpropagation formula to determine the derivatives $\partial { y _ { k } } / \partial { a _ { j } }$

\begin{array}{r c l} \frac {\partial y _ {k}}{\partial a _ {j}} & = & \sum_ {l} \frac {\partial y _ {k}}{\partial a _ {l}} \frac {\partial a _ {l}}{\partial a _ {j}} \\ & = & h ^ {\prime} (a _ {j}) \sum_ {l} w _ {l j} \frac {\partial y _ {k}}{\partial a _ {l}} \end{array}\tag{5.74}

where the sum runs over all units l to which unit $j$ sends connections (corresponding to the first index of $w _ { l j } )$ . Again, we have made use of (5.48) and (5.49). This backpropagation starts at the output units for which the required derivatives can be found directly from the functional form of the output-unit activation function. For instance, if we have individual sigmoidal activation functions at each output unit, then

\frac {\partial y _ {k}}{\partial a _ {j}} = \delta_ {k j} \sigma^ {\prime} (a _ {j})\tag{5.75}

whereas for softmax outputs we have

\frac {\partial y _ {k}}{\partial a _ {j}} = \delta_ {k j} y _ {k} - y _ {k} y _ {j}.\tag{5.76}

We can summarize the procedure for evaluating the Jacobian matrix as follows. Apply the input vector corresponding to the point in input space at which the Jacobian matrix is to be found, and forward propagate in the usual way to obtain the

Exercise 5.15

activations of all of the hidden and output units in the network. Next, for each row k of the Jacobian matrix, corresponding to the output unit k, backpropagate using the recursive relation (5.74), starting with (5.75) or (5.76), for all of the hidden units in the network. Finally, use (5.73) to do the backpropagation to the inputs. The Jacobian can also be evaluated using an alternative forward propagation formalism, which can be derived in an analogous way to the backpropagation approach given here.

Again, the implementation of such algorithms can be checked by using numerical differentiation in the form

\frac {\partial y _ {k}}{\partial x _ {i}} = \frac {y _ {k} (x _ {i} + \epsilon) - y _ {k} (x _ {i} - \epsilon)}{2 \epsilon} + O (\epsilon^ {2})\tag{5.77}

which involves 2D forward propagations for a network having D inputs.
