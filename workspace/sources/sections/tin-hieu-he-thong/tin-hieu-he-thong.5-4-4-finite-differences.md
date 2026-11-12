---
id: "tin-hieu-he-thong.5-4-4-finite-differences"
doc_id: "tin-hieu-he-thong"
title: "5.4.4 Finite differences"
level: 2
heading_path: ["Neural Networks", "5.4.4 Finite differences"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-4-3-inverse-hessian"
next_id: "tin-hieu-he-thong.5-4-5-exact-evaluation-of-the-hessian"
block_ids: ["b2889", "b2890", "b2891", "b2892", "b2893", "b2894", "b2895"]
---

## 5.4.4 Finite differences

As in the case of the first derivatives of the error function, we can find the second derivatives by using finite differences, with accuracy limited by numerical precision. If we perturb each possible pair of weights in turn, we obtain

\begin{array}{c} \frac {\partial^ {2} E}{\partial w _ {j i} \partial w _ {l k}} = \frac {1}{4 \epsilon^ {2}} \left\{E (w _ {j i} + \epsilon , w _ {l k} + \epsilon) - E (w _ {j i} + \epsilon , w _ {l k} - \epsilon) \right. \\ \left. - E (w _ {j i} - \epsilon , w _ {l k} + \epsilon) + E (w _ {j i} - \epsilon , w _ {l k} - \epsilon) \right\} + O (\epsilon^ {2}). \end{array}\tag{5.90}

Again, by using a symmetrical central differences formulation, we ensure that the residual errors are ${ \mathcal O } ( \epsilon ^ { 2 } )$ rather than $O ( \epsilon )$ . Because there are $W ^ { 2 }$ elements in the Hessian matrix, and because the evaluation of each element requires four forward propagations each needing $O ( W )$ operations (per pattern), we see that this approach will require $O ( W ^ { 3 } )$ operations to evaluate the complete Hessian. It therefore has poor scaling properties, although in practice it is very useful as a check on the software implementation of backpropagation methods.

A more efficient version of numerical differentiation can be found by applying central differences to the first derivatives of the error function, which are themselves calculated using backpropagation. This gives

\frac {\partial^ {2} E}{\partial w _ {j i} \partial w _ {l k}} = \frac {1}{2 \epsilon} \left\{\frac {\partial E}{\partial w _ {j i}} (w _ {l k} + \epsilon) - \frac {\partial E}{\partial w _ {j i}} (w _ {l k} - \epsilon) \right\} + O (\epsilon^ {2}).\tag{5.91}

Because there are now only W weights to be perturbed, and because the gradients can be evaluated in $O ( W )$ steps, we see that this method gives the Hessian in $O ( W ^ { 2 } )$ operations.
