---
id: "tin-hieu-he-thong.4-1-2-multiple-classes"
doc_id: "tin-hieu-he-thong"
title: "4.1.2 Multiple classes"
level: 2
heading_path: ["4 Linear Models for Classification", "4.1.2 Multiple classes"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-1-1-two-classes"
next_id: "tin-hieu-he-thong.4-1-3-least-squares-for-classification"
block_ids: ["b2088", "b2089", "b2090", "b2091", "b2092", "b2093", "b2094", "b2095", "b2096", "b2097", "b2098", "b2099", "b2100", "b2101", "b2102", "b2103", "b2104", "b2105", "b2106", "b2107"]
---

## 4.1.2 Multiple classes

Now consider the extension of linear discriminants to $K > 2$ classes. We might be tempted be to build a K-class discriminant by combining a number of two-class discriminant functions. However, this leads to some serious difficulties (Duda and Hart, 1973) as we now show.

Consider the use of $K - 1$ classifiers each of which solves a two-class problem of separating points in a particular class $\mathcal { C } _ { k }$ from points not in that class. This is known as a one-versus-the-rest classifier. The left-hand example in Figure 4.2 shows an example involving three classes where this approach leads to regions of input space that are ambiguously classified.

![image](images/part-002--a143bfb6fd5aa8e95b760d56f74fd2ff03afd01b988874bfa8dc947574d04c06.jpg)

Figure 4.2 Attempting to construct a K class discriminant from a set of two class discriminants leads to ambiguous regions, shown in green. On the left is an example involving the use of two discriminants designed to distinguish points in class $\mathcal { C } _ { k }$ from points not in class $\mathcal { C } _ { k }$ . On the right is an example involving three discriminant functions each of which is used to separate a pair of classes $\mathcal { C } _ { k }$ and $\mathcal { C } _ { j }$

An alternative is to introduce $K ( K - 1 ) / 2$ binary discriminant functions, one for every possible pair of classes. This is known as a one-versus-one classifier. Each point is then classified according to a majority vote amongst the discriminant functions. However, this too runs into the problem of ambiguous regions, as illustrated in the right-hand diagram of Figure 4.2.

We can avoid these difficulties by considering a single K-class discriminant comprising K linear functions of the form

y _ {k} (\mathbf {x}) = \mathbf {w} _ {k} ^ {\mathrm{T}} \mathbf {x} + w _ {k 0}\tag{4.9}

and then assigning a point x to class $\mathcal { C } _ { k }$ if $y _ { k } ( \mathbf x ) > y _ { j } ( \mathbf x )$ for all $j \neq k$ . The decision boundary between class $\mathcal { C } _ { k }$ and class $\mathcal { C } _ { j }$ is therefore given by $y _ { k } ( \mathbf x ) = y _ { j } ( \mathbf x )$ and hence corresponds to a $( D - 1 )$ -dimensional hyperplane defined by

\left(\mathbf {w} _ {k} - \mathbf {w} _ {j}\right) ^ {\mathrm{T}} \mathbf {x} + \left(w _ {k 0} - w _ {j 0}\right) = 0.\tag{4.10}

This has the same form as the decision boundary for the two-class case discussed in Section 4.1.1, and so analogous geometrical properties apply.

The decision regions of such a discriminant are always singly connected and convex. To see this, consider two points $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x _ { \mathrm { B } } }$ both of which lie inside decision region $\mathcal { R } _ { k }$ , as illustrated in Figure 4.3. Any point x that lies on the line connecting $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x } _ { \mathrm { B } }$ can be expressed in the form

\widehat {\mathbf {x}} = \lambda \mathbf {x} _ {\mathrm{A}} + (1 - \lambda) \mathbf {x} _ {\mathrm{B}}\tag{4.11}

Figure 4.3 Illustration of the decision regions for a multiclass linear discriminant, with the decision boundaries shown in red. If two points $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x } _ { \mathrm { B } }$ both lie inside the same decision region $\mathcal { R } _ { k } ,$ then any point x that lies on the line connecting these two points must also lie in $\mathcal { R } _ { k }$ , and hence the decision region must be singly connected and convex.

![image](images/part-002--adca51862e097bd110ecfc63d1878d40ea1db856d2acecdea39461dfc7bd317c.jpg)

where $0 \leqslant \lambda \leqslant 1$ . From the linearity of the discriminant functions, it follows that

y _ {k} (\widehat {\mathbf {x}}) = \lambda y _ {k} (\mathbf {x} _ {\mathrm{A}}) + (1 - \lambda) y _ {k} (\mathbf {x} _ {\mathrm{B}}).\tag{4.12}

Because both $\mathbf { x } _ { \mathrm { A } }$ and $\mathbf { x _ { \mathrm { B } } }$ lie inside $\mathcal { R } _ { k } ,$ it follows that $y _ { k } ( \mathbf { x } _ { \mathrm { A } } ) \ > \ y _ { j } ( \mathbf { x } _ { \mathrm { A } } )$ , and $y _ { k } ( \mathbf { x } _ { \mathrm { B } } ) \ > \ y _ { j } ( \mathbf { x } _ { \mathrm { B } } )$ , for all $j \neq k$ , and hence $y _ { k } ( \widehat { \mathbf x } ) > y _ { j } ( \widehat { \mathbf x } )$ , and so x also lies inside $\mathcal { R } _ { k }$ . Thus $\mathcal { R } _ { k }$ is singly connected and convex.

Note that for two classes, we can either employ the formalism discussed here, based on two discriminant functions $y _ { 1 } ( \mathbf x )$ and $y _ { 2 } ( \mathbf x )$ , or else use the simpler but equivalent formulation described in Section 4.1.1 based on a single discriminant function $y ( \mathbf x )$

We now explore three approaches to learning the parameters of linear discrimi nant functions, based on least squares, Fisher’s linear discriminant, and the perceptron algorithm.
