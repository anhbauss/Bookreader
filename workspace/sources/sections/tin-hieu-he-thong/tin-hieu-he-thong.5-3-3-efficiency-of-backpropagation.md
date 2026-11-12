---
id: "tin-hieu-he-thong.5-3-3-efficiency-of-backpropagation"
doc_id: "tin-hieu-he-thong"
title: "5.3.3 Efficiency of backpropagation"
level: 2
heading_path: ["Neural Networks", "5.3.3 Efficiency of backpropagation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-3-2-a-simple-example"
next_id: "tin-hieu-he-thong.5-3-4-the-jacobian-matrix"
block_ids: ["b2816", "b2817", "b2818", "b2819", "b2820", "b2821", "b2822", "b2823", "b2824", "b2825", "b2826"]
---

## 5.3.3 Efficiency of backpropagation

One of the most important aspects of backpropagation is its computational efficiency. To understand this, let us examine how the number of computer operations required to evaluate the derivatives of the error function scales with the total number $W$ of weights and biases in the network. A single evaluation of the error function (for a given input pattern) would require $O ( W )$ operations, for sufficiently large W. This follows from the fact that, except for a network with very sparse connections, the number of weights is typically much greater than the number of units, and so the bulk of the computational effort in forward propagation is concerned with evaluating the sums in (5.48), with the evaluation of the activation functions representing a small overhead. Each term in the sum in (5.48) requires one multiplication and one addition, leading to an overall computational cost that is $O ( W )$

An alternative approach to backpropagation for computing the derivatives of the error function is to use finite differences. This can be done by perturbing each weight in turn, and approximating the derivatives by the expression

\frac {\partial E _ {n}}{\partial w _ {j i}} = \frac {E _ {n} (w _ {j i} + \epsilon) - E _ {n} (w _ {j i})}{\epsilon} + O (\epsilon)\tag{5.68}

where $\epsilon \ll 1$ . In a software simulation, the accuracy of the approximation to the derivatives can be improved by making  smaller, until numerical roundoff problems arise. The accuracy of the finite differences method can be improved significantly by using symmetrical central differences of the form

\frac {\partial E _ {n}}{\partial w _ {j i}} = \frac {E _ {n} (w _ {j i} + \epsilon) - E _ {n} (w _ {j i} - \epsilon)}{2 \epsilon} + O (\epsilon^ {2}).\tag{5.69}

In this case, the $O ( \epsilon )$ corrections cancel, as can be verified by Taylor expansion on the right-hand side of (5.69), and so the residual corrections are ${ \cal O } ( \epsilon ^ { 2 } )$ . The number of computational steps is, however, roughly doubled compared with (5.68).

The main problem with numerical differentiation is that the highly desirable $O ( W )$ scaling has been lost. Each forward propagation requires $O ( W )$ steps, and there are W weights in the network each of which must be perturbed individually, so that the overall scaling is $O ( W ^ { 2 } )$

Illustration of a modular pattern recognition system in which the Jacobian matrix can be used to backpropagate error signals from the outputs through to earlier modules in the system.

![image](images/part-002--965c8869e618b1f4dc498afec9ace27d33b3b9ae35c01924fb7af8346443d206.jpg)

However, numerical differentiation plays an important role in practice, because a comparison of the derivatives calculated by backpropagation with those obtained using central differences provides a powerful check on the correctness of any software implementation of the backpropagation algorithm. When training networks in practice, derivatives should be evaluated using backpropagation, because this gives the greatest accuracy and numerical efficiency. However, the results should be compared with numerical differentiation using (5.69) for some test cases in order to check the correctness of the implementation.
