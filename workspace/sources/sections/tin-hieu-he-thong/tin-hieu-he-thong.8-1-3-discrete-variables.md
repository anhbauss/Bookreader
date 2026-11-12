---
id: "tin-hieu-he-thong.8-1-3-discrete-variables"
doc_id: "tin-hieu-he-thong"
title: "8.1.3 Discrete variables"
level: 2
heading_path: ["Graphical Models", "8.1.3 Discrete variables"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-1-2-generative-models"
next_id: "tin-hieu-he-thong.8-1-4-linear-gaussian-models"
block_ids: ["b4132", "b4133", "b4134", "b4135", "b4136", "b4137", "b4138", "b4139", "b4140", "b4141", "b4142", "b4143", "b4144", "b4145", "b4146", "b4147", "b4148", "b4149", "b4150", "b4151", "b4152", "b4153", "b4154", "b4155", "b4156", "b4157", "b4158", "b4159", "b4160", "b4161", "b4162"]
---

## 8.1.3 Discrete variables

We have discussed the importance of probability distributions that are members of the exponential family, and we have seen that this family includes many wellknown distributions as particular cases. Although such distributions are relatively simple, they form useful building blocks for constructing more complex probability

Figure 8.9 (a) This fully-connected graph describes a general distribution over two K-state discrete variables having a total of $K ^ { 2 } - 1$ parameters. (b) By dropping the link between the nodes, the number of parameters is reduced to $2 ( K - 1 )$

(a)

(b)

![image](images/part-002--abfadde287d39240479eaa47de86e0ea595363401bbb0777f0a33288ed0f04d0.jpg)

distributions, and the framework of graphical models is very useful in expressing the way in which these building blocks are linked together.

Such models have particularly nice properties if we choose the relationship between each parent-child pair in a directed graph to be conjugate, and we shall explore several examples of this shortly. Two cases are particularly worthy of note, namely when the parent and child node each correspond to discrete variables and when they each correspond to Gaussian variables, because in these two cases the relationship can be extended hierarchically to construct arbitrarily complex directed acyclic graphs. We begin by examining the discrete case.

The probability distribution $p ( \mathbf { x } | \boldsymbol { \mu } )$ for a single discrete variable x having K possible states (using the 1-of-K representation) is given by

p (\mathbf {x} | \boldsymbol {\mu}) = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {x _ {k}}\tag{8.9}

and is governed by the parameters $\pmb { \mu } ~ = ~ ( \mu _ { 1 } , \ldots , \mu _ { K } ) ^ { \mathrm { T } }$ . Due to the constraint $\textstyle \sum _ { k } \mu _ { k } = 1$ , only $K - 1$ values for $\mu _ { k }$ need to be specified in order to define the distribution.

Now suppose that we have two discrete variables, $\mathbf { x } _ { 1 }$ and $\mathbf { x } _ { 2 } ,$ , each of which has K states, and we wish to model their joint distribution. We denote the probability of observing both $x _ { 1 k } = 1$ and $x _ { 2 l } = 1$ by the parameter $\mu _ { k l }$ , where $x _ { 1 k }$ denotes the $k ^ { \mathrm { t h } }$ component of $\mathbf { x } _ { 1 }$ , and similarly for $x _ { 2 l }$ . The joint distribution can be written

p (\mathbf {x} _ {1}, \mathbf {x} _ {2} | \boldsymbol {\mu}) = \prod_ {k = 1} ^ {K} \prod_ {l = 1} ^ {K} \mu_ {k l} ^ {x _ {1 k} x _ {2 l}}.

Because the parameters $\mu _ { k l }$ are subject to the constraint $\begin{array} { r } { \sum _ { k } \sum _ { l } \mu _ { k l } = 1 } \end{array}$ , this distribution is governed by $K ^ { 2 } - 1$ parameters. It is easily seen that the total number of parameters that must be specified for an arbitrary joint distribution over M variables is $K ^ { M } - 1$ and therefore grows exponentially with the number M of variables.

Using the product rule, we can factor the joint distribution $p ( \mathbf { x } _ { 1 } , \mathbf { x } _ { 2 } )$ in the form $p ( \mathbf { x } _ { 2 } | \mathbf { x } _ { 1 } ) p ( \mathbf { x } _ { 1 } )$ , which corresponds to a two-node graph with a link going from the $\mathbf { x } _ { 1 }$ node to the $\mathbf { x } _ { 2 }$ node as shown in Figure 8.9(a). The marginal distribution $p ( \mathbf { x } _ { 1 } )$ is governed by $K - 1$ parameters, as before, Similarly, the conditional distribution $p ( \mathbf { x } _ { 2 } | \mathbf { x } _ { 1 } )$ requires the specification of $K - 1$ parameters for each of the K possible values of $\mathbf { x } _ { 1 }$ . The total number of parameters that must be specified in the joint distribution is therefore $( K - 1 ) + \bar { K } ( K - 1 ) = K ^ { 2 } - 1$ as before.

Now suppose that the variables $\mathbf { x } _ { 1 }$ and $\mathbf { x } _ { 2 }$ were independent, corresponding to the graphical model shown in Figure 8.9(b). Each variable is then described by a separate multinomial distribution, and the total number of parameters would be $2 ( K - 1 )$ . For a distribution over M independent discrete variables, each having K states, the total number of parameters would be $M ( K - 1 )$ , which therefore grows linearly with the number of variables. From a graphical perspective, we have reduced the number of parameters by dropping links in the graph, at the expense of having a restricted class of distributions.

Figure 8.10 This chain of M discrete nodes, each having K states, requires the specification of $K - 1 +$ $( M - 1 ) K ( K - 1 )$ parameters, which grows linearly with the length M of the chain. In contrast, a fully connected graph of M nodes would have $K ^ { M } - 1$ parameters, which grows exponentially with M.

![image](images/part-002--6a7f32f1ab893f189e26b61ca2dd6148c18b0cb17c5bf11cb5dd1074d638715a.jpg)

More generally, if we have M discrete variables $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { M }$ , we can model the joint distribution using a directed graph with one variable corresponding to each node. The conditional distribution at each node is given by a set of nonnegative parameters subject to the usual normalization constraint. If the graph is fully connected then we have a completely general distribution having $K ^ { M } - 1$ parameters, whereas if there are no links in the graph the joint distribution factorizes into the product of the marginals, and the total number of parameters is $M ( K - 1 )$ . Graphs having intermediate levels of connectivity allow for more general distributions than the fully factorized one while requiring fewer parameters than the general joint distribution. As an illustration, consider the chain of nodes shown in Figure 8.10. The marginal distribution $p ( \mathbf { x } _ { 1 } )$ requires $K - 1$ parameters, whereas each of the $M - 1$ conditional distributions $p ( \mathbf { x } _ { i } | \mathbf { x } _ { i - 1 } )$ , for $i = 2 , \dots , M$ , requires $K ( K - 1 )$ ) parameters. This gives a total parameter count of $K - 1 + ( M - 1 ) K ( K - 1 )$ , which is quadratic in K and which grows linearly (rather than exponentially) with the length M of the chain.

An alternative way to reduce the number of independent parameters in a model is by sharing parameters (also known as tying of parameters). For instance, in the chain example of Figure 8.10, we can arrange that all of the conditional distributions $p ( \mathbf { x } _ { i } | \mathbf { x } _ { i - 1 } )$ , for $i = 2 , \ldots , M$ , are governed by the same set of $K ( K { - } 1 )$ parameters. Together with the $K - 1$ parameters governing the distribution of $\mathbf { x } _ { 1 }$ , this gives a total of $K ^ { 2 } - 1$ parameters that must be specified in order to define the joint distribution.

We can turn a graph over discrete variables into a Bayesian model by introducing Dirichlet priors for the parameters. From a graphical point of view, each node then acquires an additional parent representing the Dirichlet distribution over the parameters associated with the corresponding discrete node. This is illustrated for the chain model in Figure 8.11. The corresponding model in which we tie the parameters governing the conditional distributions $p ( \mathbf { x } _ { i } | \mathbf { x } _ { i - 1 } )$ , for $i = 2 , \dots , M$ , is shown in Figure 8.12.

Another way of controlling the exponential growth in the number of parameters in models of discrete variables is to use parameterized models for the conditional distributions instead of complete tables of conditional probability values. To illustrate this idea, consider the graph in Figure 8.13 in which all of the nodes represent binary variables. Each of the parent variables $x _ { i }$ is governed by a single parame-

An extension of the model of Figure 8.10 to include Dirichlet priors over the parameters governing the discrete distributions.

![image](images/part-002--cd7182149015a7693259d3bf3fbf418588153a224efc38e7af45fd2810b99b70.jpg)

As in Figure 8.11 but with a sin gle set of parameters $\pmb { \mu }$ shared amongst all of the conditional distributions $p ( \mathbf { x } _ { i } | \mathbf { x } _ { i - 1 } )$ .

![image](images/part-002--8f5b99c7b20f1d66d361b008fc5b5d347bcb97629d758b73c04a6e1494a5bcaf.jpg)

ter $\mu _ { i }$ representing the probability $p ( x _ { i } = 1 )$ ), giving M parameters in total for the parent nodes. The conditional distribution $p ( y | x _ { 1 } , \dots , x _ { M } )$ , however, would require $\dot { 2 } ^ { M }$ parameters representing the probability $p ( y = 1 )$ for each of the $2 ^ { M }$ possible settings of the parent variables. Thus in general the number of parameters required to specify this conditional distribution will grow exponentially with $M$ . We can obtain a more parsimonious form for the conditional distribution by using a logistic sigmoid function acting on a linear combination of the parent variables, giving

p (y = 1 | x _ {1}, \dots , x _ {M}) = \sigma \left(w _ {0} + \sum_ {i = 1} ^ {M} w _ {i} x _ {i}\right) = \sigma (\mathbf {w} ^ {\mathrm{T}} \mathbf {x})\tag{8.10}

where $\sigma ( a ) = ( 1 + \exp ( - a ) ) ^ { - 1 }$ is the logistic sigmoid, $\mathbf { x } = ( x _ { 0 } , x _ { 1 } , \hdots , x _ { M } ) ^ { \mathrm { T } }$ is an $( M + 1 )$ -dimensional vector of parent states augmented with an additional variable $x _ { 0 }$ whose value is clamped to 1, and $\mathbf { w } = ( w _ { 0 } , w _ { 1 } , \hdots , w _ { M } ) ^ { \mathrm { T } }$ is a vector of $M + 1$ parameters. This is a more restricted form of conditional distribution than the general case but is now governed by a number of parameters that grows linearly with M. In this sense, it is analogous to the choice of a restrictive form of covariance matrix (for example, a diagonal matrix) in a multivariate Gaussian distribution. The motivation for the logistic sigmoid representation was discussed in Section 4.2.

Figure 8.13 A graph comprising M parents $x _ { 1 } , \ldots , x _ { M }$ and a single child $^ { y , }$ used to illustrate the idea of parameterized conditional distributions for discrete variables.

![image](images/part-002--85a04ae31ec3493ca077ad8682895a41ae34d50662bd81ced9753e524236e1b3.jpg)
