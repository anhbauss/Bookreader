---
id: "tin-hieu-he-thong.error-backpropagation"
doc_id: "tin-hieu-he-thong"
title: "Error Backpropagation"
level: 2
heading_path: ["Neural Networks", "Error Backpropagation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-3-1-evaluation-of-error-function-derivatives"
next_id: "tin-hieu-he-thong.5-3-2-a-simple-example"
block_ids: ["b2791", "b2792", "b2793", "b2794", "b2795"]
---

## Error Backpropagation

1. Apply an input vector ${ \bf x } _ { n }$ to the network and forward propagate through the network using (5.48) and (5.49) to find the activations of all the hidden and output units.
2. Evaluate the $\delta _ { k }$ for all the output units using (5.54).
3. Backpropagate the $\delta \mathbf { \dot { s } }$ using (5.56) to obtain $\delta _ { j }$ for each hidden unit in the network.
4. Use (5.53) to evaluate the required derivatives.

For batch methods, the derivative of the total error $E$ can then be obtained by repeating the above steps for each pattern in the training set and then summing over all patterns:

\frac {\partial E}{\partial w _ {j i}} = \sum_ {n} \frac {\partial E _ {n}}{\partial w _ {j i}}.\tag{5.57}

In the above derivation we have implicitly assumed that each hidden or output unit in the network has the same activation function $h ( \cdot )$ . The derivation is easily generalized, however, to allow different units to have individual activation functions, simply by keeping track of which form of $h ( \cdot )$ goes with which unit.
