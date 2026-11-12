---
id: "tin-hieu-he-thong.5-4-1-diagonal-approximation"
doc_id: "tin-hieu-he-thong"
title: "5.4.1 Diagonal approximation"
level: 2
heading_path: ["Neural Networks", "5.4.1 Diagonal approximation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-4-the-hessian-matrix"
next_id: "tin-hieu-he-thong.5-4-2-outer-product-approximation"
block_ids: ["b2857", "b2858", "b2859", "b2860", "b2861", "b2862", "b2863", "b2864", "b2865"]
---

## 5.4.1 Diagonal approximation

Some of the applications for the Hessian matrix discussed above require the inverse of the Hessian, rather than the Hessian itself. For this reason, there has been some interest in using a diagonal approximation to the Hessian, in other words one that simply replaces the off-diagonal elements with zeros, because its inverse is trivial to evaluate. Again, we shall consider an error function that consists of a sum of terms, one for each pattern in the data set, so that $\textstyle E = \sum _ { n } E _ { n }$ . The Hessian can then be obtained by considering one pattern at a time, and then summing the results over all patterns. From (5.48), the diagonal elements of the Hessian, for pattern n, can be written

\frac {\partial^ {2} E _ {n}}{\partial w _ {j i} ^ {2}} = \frac {\partial^ {2} E _ {n}}{\partial a _ {j} ^ {2}} z _ {i} ^ {2}.\tag{5.79}

Using (5.48) and (5.49), the second derivatives on the right-hand side of (5.79) can be found recursively using the chain rule of differential calculus to give a backpropagation equation of the form

\frac {\partial^ {2} E _ {n}}{\partial a _ {j} ^ {2}} = h ^ {\prime} (a _ {j}) ^ {2} \sum_ {k} \sum_ {k ^ {\prime}} w _ {k j} w _ {k ^ {\prime} j} \frac {\partial^ {2} E _ {n}}{\partial a _ {k} \partial a _ {k ^ {\prime}}} + h ^ {\prime \prime} (a _ {j}) \sum_ {k} w _ {k j} \frac {\partial E ^ {n}}{\partial a _ {k}}.\tag{5.80}

If we now neglect off-diagonal elements in the second-derivative terms, we obtain (Becker and Le Cun, 1989; Le Cun et al., 1990)

\frac {\partial^ {2} E _ {n}}{\partial a _ {j} ^ {2}} = h ^ {\prime} (a _ {j}) ^ {2} \sum_ {k} w _ {k j} ^ {2} \frac {\partial^ {2} E _ {n}}{\partial a _ {k} ^ {2}} + h ^ {\prime \prime} (a _ {j}) \sum_ {k} w _ {k j} \frac {\partial E _ {n}}{\partial a _ {k}}.\tag{5.81}

Note that the number of computational steps required to evaluate this approximation is $O ( W )$ , where W is the total number of weight and bias parameters in the network, compared with $O ( W ^ { 2 } )$ for the full Hessian.

Ricotti et al. (1988) also used the diagonal approximation to the Hessian, but they retained all terms in the evaluation of $\breve { \partial } ^ { 2 } E _ { n } / \partial \bar { a } _ { j } ^ { 2 }$ and so obtained exact expressions for the diagonal terms. Note that this no longer has $O ( W )$ scaling. The major problem with diagonal approximations, however, is that in practice the Hessian is typically found to be strongly nondiagonal, and so these approximations, which are driven mainly be computational convenience, must be treated with care.
