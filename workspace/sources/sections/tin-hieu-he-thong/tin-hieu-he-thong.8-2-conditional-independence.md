---
id: "tin-hieu-he-thong.8-2-conditional-independence"
doc_id: "tin-hieu-he-thong"
title: "8.2. Conditional Independence"
level: 2
heading_path: ["Graphical Models", "8.2. Conditional Independence"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-1-4-linear-gaussian-models"
next_id: "tin-hieu-he-thong.8-2-1-three-example-graphs"
block_ids: ["b4189", "b4190", "b4191", "b4192", "b4193", "b4194", "b4195", "b4196", "b4197", "b4198", "b4199", "b4200", "b4201"]
---

## 8.2. Conditional Independence

An important concept for probability distributions over multiple variables is that of conditional independence (Dawid, 1980). Consider three variables a, $b ,$ and $c ,$ and suppose that the conditional distribution of $^ { a , }$ given $b$ and $c ,$ is such that it does not depend on the value of $b ,$ so that

p (a | b, c) = p (a | c).\tag{8.20}

We say that $a$ is conditionally independent of b given $c .$ This can be expressed in a slightly different way if we consider the joint distribution of $a$ and $b$ conditioned on $c ,$ which we can write in the form

\begin{array}{r c l} p (a, b | c) & = & p (a | b, c) p (b | c) \\ & = & p (a | c) p (b | c). \end{array}\tag{8.21}

where we have used the product rule of probability together with (8.20). Thus we see that, conditioned on $c ,$ the joint distribution of $a$ and b factorizes into the product of the marginal distribution of a and the marginal distribution of $b$ (again both conditioned on c). This says that the variables a and $b$ are statistically independent, given c. Note that our definition of conditional independence will require that (8.20),

Figure 8.15 The first of three examples of graphs over three variables a, b, and c used to discuss conditional independence properties of directed graphical models.

![image](images/part-002--9b75acb0342875322607939bc7db7f1a92a3bb55c361d04f971beb9189d036a6.jpg)

or equivalently (8.21), must hold for every possible value of c, and not just for some values. We shall sometimes use a shorthand notation for conditional independence (Dawid, 1979) in which

a \perp b \mid c\tag{8.22}

denotes that a is conditionally independent of b given c and is equivalent to (8.20).

Conditional independence properties play an important role in using probabilistic models for pattern recognition by simplifying both the structure of a model and the computations needed to perform inference and learning under that model. We shall see examples of this shortly.

If we are given an expression for the joint distribution over a set of variables in terms of a product of conditional distributions (i.e., the mathematical representation underlying a directed graph), then we could in principle test whether any potential conditional independence property holds by repeated application of the sum and product rules of probability. In practice, such an approach would be very time consuming. An important and elegant feature of graphical models is that conditional independence properties of the joint distribution can be read directly from the graph without having to perform any analytical manipulations. The general framework for achieving this is called d-separation, where the $\cdot _ { \mathrm { d } } ,$ stands for ‘directed’ (Pearl, 1988). Here we shall motivate the concept of d-separation and give a general statement of the d-separation criterion. A formal proof can be found in Lauritzen (1996).
