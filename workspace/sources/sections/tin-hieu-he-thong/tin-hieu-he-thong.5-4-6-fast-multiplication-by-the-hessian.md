---
id: "tin-hieu-he-thong.5-4-6-fast-multiplication-by-the-hessian"
doc_id: "tin-hieu-he-thong"
title: "5.4.6 Fast multiplication by the Hessian"
level: 2
heading_path: ["Neural Networks", "5.4.6 Fast multiplication by the Hessian"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-4-5-exact-evaluation-of-the-hessian"
next_id: "tin-hieu-he-thong.5-5-regularization-in-neural-networks"
block_ids: ["b2909", "b2910", "b2911", "b2912", "b2913", "b2914", "b2915", "b2916", "b2917", "b2918", "b2919", "b2920", "b2921", "b2922", "b2923", "b2924", "b2925", "b2926", "b2927", "b2928", "b2929", "b2930", "b2931", "b2932", "b2933", "b2934", "b2935", "b2936", "b2937"]
---

## 5.4.6 Fast multiplication by the Hessian

For many applications of the Hessian, the quantity of interest is not the Hessian matrix H itself but the product of H with some vector v. We have seen that the evaluation of the Hessian takes $O ( W ^ { 2 } )$ operations, and it also requires storage that is $O ( W ^ { 2 } )$ . The vector $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ that we wish to calculate, however, has only W elements, so instead of computing the Hessian as an intermediate step, we can instead try to find an efficient approach to evaluating $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ directly in a way that requires only $O ( W )$ operations.

To do this, we first note that

\mathbf {v} ^ {\mathrm{T}} \mathbf {H} = \mathbf {v} ^ {\mathrm{T}} \nabla (\nabla E)\tag{5.96}

where denotes the gradient operator in weight space. We can then write down the standard forward-propagation and backpropagation equations for the evaluation of E and apply (5.96) to these equations to give a set of forward-propagation and backpropagation equations for the evaluation of $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ (Møller, 1993; Pearlmutter, 1994). This corresponds to acting on the original forward-propagation and backpropagation equations with a differential operator $\mathbf { v } ^ { \mathrm { T } } \nabla$ . Pearlmutter (1994) used the notation $\mathcal { R } \{ \cdot \}$ to denote the operator $\mathbf { v } ^ { \mathrm { T } } \nabla$ , and we shall follow this convention. The analysis is straightforward and makes use of the usual rules of differential calculus, together with the result

\mathcal {R} \{\mathbf {w} \} = \mathbf {v}.\tag{5.97}

The technique is best illustrated with a simple example, and again we choose a two-layer network of the form shown in Figure 5.1, with linear output units and a sum-of-squares error function. As before, we consider the contribution to the error function from one pattern in the data set. The required vector is then obtained as usual by summing over the contributions from each of the patterns separately. For the two-layer network, the forward-propagation equations are given by

a _ {j} = \sum_ {i} w _ {j i} x _ {i}\tag{5.98}

z _ {j} = h (a _ {j})\tag{5.99}

y _ {k} = \sum_ {j} w _ {k j} z _ {j}.\tag{5.100}

We now act on these equations using the $\mathcal { R } \{ \cdot \}$ operator to obtain a set of forward propagation equations in the form

\mathcal {R} \{a _ {j} \} = \sum_ {i} v _ {j i} x _ {i}\tag{5.101}

\mathcal {R} \{z _ {j} \} = h ^ {\prime} (a _ {j}) \mathcal {R} \{a _ {j} \}\tag{5.102}

\mathcal {R} \{y _ {k} \} = \sum_ {j} w _ {k j} \mathcal {R} \{z _ {j} \} + \sum_ {j} v _ {k j} z _ {j}\tag{5.103}

where $v _ { j i }$ is the element of the vector v that corresponds to the weight $w _ { j i }$ . Quantities of the form ${ \mathcal { R } } \{ z _ { j } \} , { \mathcal { R } } \{ a _ { j } \}$ and $\mathcal { R } \{ y _ { k } \}$ are to be regarded as new variables whose values are found using the above equations.

Because we are considering a sum-of-squares error function, we have the following standard backpropagation expressions:

{\delta_ {k}} = {y _ {k} - t _ {k}}\tag{5.104}

\delta_ {j} = h ^ {\prime} (a _ {j}) \sum_ {k} w _ {k j} \delta_ {k}.\tag{5.105}

Again, we act on these equations with the $\mathcal { R } \{ \cdot \}$ operator to obtain a set of backpropagation equations in the form

\begin{array}{r c l} \mathcal {R} \{\delta_ {k} \} & = & \mathcal {R} \{y _ {k} \} \\ \mathcal {R} \{\delta_ {j} \} & = & h ^ {\prime \prime} (a _ {j}) \mathcal {R} \{a _ {j} \} \sum_ {k} w _ {k j} \delta_ {k} \\ & & + h ^ {\prime} (a _ {j}) \sum_ {k} v _ {k j} \delta_ {k} + h ^ {\prime} (a _ {j}) \sum_ {k} w _ {k j} \mathcal {R} \{\delta_ {k} \}. \end{array}\tag{5.106}

(5.107)

Finally, we have the usual equations for the first derivatives of the error

{\frac {\partial E}{\partial w _ {k j}}} = {\delta_ {k} z _ {j}}\tag{5.108}

{\frac {\partial E}{\partial w _ {j i}}} = {\delta_ {j} x _ {i}}\tag{5.109}

and acting on these with the $\mathcal { R } \{ \cdot \}$ operator, we obtain expressions for the elements of the vector $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$

\mathcal {R} \left\{\frac {\partial E}{\partial w _ {k j}} \right\} = \mathcal {R} \{\delta_ {k} \} z _ {j} + \delta_ {k} \mathcal {R} \{z _ {j} \}\tag{5.110}

\mathcal {R} \left\{\frac {\partial E}{\partial w _ {j i}} \right\} = x _ {i} \mathcal {R} \{\delta_ {j} \}.\tag{5.111}

The implementation of this algorithm involves the introduction of additional variables $\mathcal { R } \{ a _ { j } \} , \mathcal { R } \{ z _ { j } \}$ and ${ \mathcal { R } } \{ \delta _ { j } \}$ for the hidden units and $\mathcal { R } \{ \delta _ { k } \}$ and $\mathcal { R } \{ y _ { k } \}$ for the output units. For each input pattern, the values of these quantities can be found using the above results, and the elements of $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ are then given by (5.110) and (5.111). An elegant aspect of this technique is that the equations for evaluating $\mathbf { v } ^ { \mathrm { T } } \mathbf { H }$ mirror closely those for standard forward and backward propagation, and so the extension of existing software to compute this product is typically straightforward.

If desired, the technique can be used to evaluate the full Hessian matrix by choosing the vector v to be given successively by a series of unit vectors of the form $( 0 , 0 , \ldots , 1 , \ldots , 0 )$ each of which picks out one column of the Hessian. This leads to a formalism that is analytically equivalent to the backpropagation procedure of Bishop (1992), as described in Section 5.4.5, though with some loss of efficiency due to redundant calculations.
