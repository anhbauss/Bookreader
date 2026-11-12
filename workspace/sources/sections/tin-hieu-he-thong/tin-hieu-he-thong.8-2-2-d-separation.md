---
id: "tin-hieu-he-thong.8-2-2-d-separation"
doc_id: "tin-hieu-he-thong"
title: "8.2.2 D-separation"
level: 2
heading_path: ["Graphical Models", "8.2.2 D-separation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-2-1-three-example-graphs"
next_id: "tin-hieu-he-thong.8-3-markov-random-fields"
block_ids: ["b4266", "b4267", "b4268", "b4269", "b4270", "b4271", "b4272", "b4273", "b4274", "b4275", "b4276", "b4277", "b4278", "b4279", "b4280", "b4281", "b4282", "b4283", "b4284", "b4285", "b4286", "b4287", "b4288", "b4289", "b4290", "b4291", "b4292", "b4293", "b4294", "b4295", "b4296", "b4297", "b4298", "b4299", "b4300", "b4301", "b4302", "b4303", "b4304", "b4305", "b4306", "b4307"]
---

## 8.2.2 D-separation

We now give a general statement of the d-separation property (Pearl, 1988) for directed graphs. Consider a general directed graph in which A, B, and $C$ are arbitrary nonintersecting sets of nodes (whose union may be smaller than the complete set of nodes in the graph). We wish to ascertain whether a particular conditional independence statement A $B \mid C$ is implied by a given directed acyclic graph. To do so, we consider all possible paths from any node in $A$ to any node in $B .$ Any such path is said to be blocked if it includes a node such that either

(a) the arrows on the path meet either head-to-tail or tail-to-tail at the node, and the node is in the set $C ,$ , or

(b) the arrows meet head-to-head at the node, and neither the node, nor any of its descendants, is in the set $C .$

If all paths are blocked, then A is said to be d-separated from B by C, and the joint distribution over all of the variables in the graph will satisfy A $B \mid C$

The concept of d-separation is illustrated in Figure 8.22. In graph (a), the path from a to $b$ is not blocked by node $f$ because it is a tail-to-tail node for this path and is not observed, nor is it blocked by node e because, although the latter is a head-to-head node, it has a descendant $c$ because is in the conditioning set. Thus the conditional independence statement $a \perp \perp b \mid c$ does not follow from this graph. In graph (b), the path from a to $b$ is blocked by node $f$ because this is a tail-to-tail node that is observed, and so the conditional independence property $a \perp \perp b \mid f$ will be satisfied by any distribution that factorizes according to this graph. Note that this path is also blocked by node $e$ because e is a head-to-head node and neither it nor its descendant are in the conditioning set.

Figure 8.22 Illustration of the concept of d-separation. See the text for details.

![image](images/part-002--52972c5f1aeebc796720980da59ae9ffaa95a2adb157e6810517a1aca3bc5643.jpg)

![image](images/part-002--66f38384260b822c8bb7b96c190faf409d3fb636b1e8493e372b7eb1ae89d654.jpg)

(b)

For the purposes of d-separation, parameters such as $\alpha$ and $\sigma ^ { 2 }$ in Figure 8.5, indicated by small filled circles, behave in the same was as observed nodes. However, there are no marginal distributions associated with such nodes. Consequently parameter nodes never themselves have parents and so all paths through these nodes will always be tail-to-tail and hence blocked. Consequently they play no role in d-separation.

Another example of conditional independence and d-separation is provided by the concept of i.i.d. (independent identically distributed) data introduced in Section 1.2.4. Consider the problem of finding the posterior distribution for the mean of a univariate Gaussian distribution. This can be represented by the directed graph shown in Figure 8.23 in which the joint distribution is defined by a prior $p ( \mu )$ together with a set of conditional distributions $p ( x _ { n } | \mu )$ for $n = 1 , \ldots , N$ . In practice, we observe $\mathcal { D } = \{ x _ { 1 } , \ldots , x _ { N } \}$ and our goal is to infer $\mu .$ . Suppose, for a moment, that we condition on $\mu$ and consider the joint distribution of the observations. Using d-separation, we note that there is a unique path from any $x _ { i }$ to any other $x _ { j \neq i }$ and that this path is tail-to-tail with respect to the observed node $\mu .$ . Every such path is blocked and so the observations $D = \{ x _ { 1 } , \ldots , x _ { N } \}$ are independent given $\mu ,$ so that

p (\mathcal {D} | \mu) = \prod_ {n = 1} ^ {N} p (x _ {n} | \mu).\tag{8.34}

(a) Directed graph corresponding to the problem of inferring the mean $\mu$ of a univariate Gaussian distribution from observations $x _ { 1 } , \ldots , x _ { N }$ (b) The same graph drawn using the plate notation.

![image](images/part-002--520f4f1f4f15e6d7d6b98c3366b0403ce1309953b191b9fc3e040be683839481.jpg)

![image](images/part-002--e2536502b09c00132dffb864b0443d5e335095eb1f7d84acb844328003d9aa05.jpg)

(b)

Figure 8.24 A graphical representation of the ‘naive Bayes’ model for classification. Conditioned on the class label $\mathbf { z } ,$ the components of the observed vector $\textbf { x } = ( x _ { 1 } , \dots , x _ { D } ) ^ { \mathrm { T } }$ are assumed to be independent.

![image](images/part-002--a09b933a2dfa646358ec465ad76219323ea7f70bd58204d29e9ca4317731e934.jpg)

However, if we integrate over $\mu ,$ the observations are in general no longer independent

p (\mathcal {D}) = \int_ {0} ^ {\infty} p (\mathcal {D} | \mu) p (\mu) \mathrm{d} \mu \neq \prod_ {n = 1} ^ {N} p (x _ {n}).\tag{8.35}

Here $\mu$ is a latent variable, because its value is not observed.

Another example of a model representing i.i.d. data is the graph in Figure 8.7 corresponding to Bayesian polynomial regression. Here the stochastic nodes correspond to $\{ t _ { n } \} ,$ w and $\widehat { t } .$ We see that the node for w is tail-to-tail with respect to the path from $\widehat { t }$ to any one of the nodes $t _ { n }$ and so we have the following conditional independence property

\widehat {t} \perp \perp t _ {n} \mid \mathbf {w}.\tag{8.36}

Thus, conditioned on the polynomial coefficients w, the predictive distribution for $\widehat { t }$ is independent of the training data $\{ t _ { 1 } , \ldots , t _ { N } \}$ . We can therefore first use the training data to determine the posterior distribution over the coefficients w and then we can discard the training data and use the posterior distribution for w to make predictions of $\widehat { \mathbf { \xi } _ { t } }$ for new input observations ${ \widehat { x } } .$

 A related graphical structure arises in an approach to classification called the naive Bayes model, in which we use conditional independence assumptions to simplify the model structure. Suppose our observed variable consists of a D-dimensional vector ${ \bf x } = ( x _ { 1 } , \dots , x _ { D } ) ^ { \mathrm { T } }$ , and we wish to assign observed values of x to one of K classes. Using the 1-of-K encoding scheme, we can represent these classes by a $K \cdot$ dimensional binary vector z. We can then define a generative model by introducing a multinomial prior $p ( \mathbf { z } | \boldsymbol { \mu } )$ over the class labels, where the $k ^ { \mathrm { t h } }$ component $\mu _ { k }$ of $\pmb { \mu }$ is the prior probability of class $\mathcal { C } _ { k }$ , together with a conditional distribution $p ( \mathbf { x } | \mathbf { z } )$ for the observed vector $\mathbf { x } .$ The key assumption of the naive Bayes model is that, conditioned on the class $\mathbf { z } ,$ the distributions of the input variables $x _ { 1 } , \ldots , x _ { D }$ are independent. The graphical representation of this model is shown in Figure 8.24. We see that observation of $\mathbf { z }$ blocks the path between $x _ { i }$ and $x _ { j }$ for $j \neq i$ (because such paths are tail-to-tail at the node ${ \bf z } )$ and so $x _ { i }$ and $x _ { j }$ are conditionally independent given z. If, however, we marginalize out z (so that z is unobserved) the tail-to-tail path from $x _ { i }$ to $x _ { j }$ is no longer blocked. This tells us that in general the marginal density $p ( \mathbf { x } )$ will not factorize with respect to the components of $\mathbf { x } .$ . We encountered a simple application of the naive Bayes model in the context of fusing data from different sources for medical diagnosis in Section 1.5.

If we are given a labelled training set, comprising inputs $\left\{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \right\}$ together with their class labels, then we can fit the naive Bayes model to the training data

using maximum likelihood assuming that the data are drawn independently from the model. The solution is obtained by fitting the model for each class separately using the correspondingly labelled data. As an example, suppose that the probability density within each class is chosen to be Gaussian. In this case, the naive Bayes assumption then implies that the covariance matrix for each Gaussian is diagonal, and the contours of constant density within each class will be axis-aligned ellipsoids. The marginal density, however, is given by a superposition of diagonal Gaussians (with weighting coefficients given by the class priors) and so will no longer factorize with respect to its components.

The naive Bayes assumption is helpful when the dimensionality D of the input space is high, making density estimation in the full D-dimensional space more challenging. It is also useful if the input vector contains both discrete and continuous variables, since each can be represented separately using appropriate models (e.g., Bernoulli distributions for binary observations or Gaussians for real-valued variables). The conditional independence assumption of this model is clearly a strong one that may lead to rather poor representations of the class-conditional densities. Nevertheless, even if this assumption is not precisely satisfied, the model may still give good classification performance in practice because the decision boundaries can be insensitive to some of the details in the class-conditional densities, as illustrated in Figure 1.27.

We have seen that a particular directed graph represents a specific decomposition of a joint probability distribution into a product of conditional probabilities. The graph also expresses a set of conditional independence statements obtained through the d-separation criterion, and the d-separation theorem is really an expression of the equivalence of these two properties. In order to make this clear, it is helpful to think of a directed graph as a filter. Suppose we consider a particular joint probability distribution $p ( \mathbf { x } )$ over the variables x corresponding to the (nonobserved) nodes of the graph. The filter will allow this distribution to pass through if, and only if, it can be expressed in terms of the factorization (8.5) implied by the graph. If we present to the filter the set of all possible distributions $p ( \mathbf { x } )$ over the set of variables x, then the subset of distributions that are passed by the filter will be denoted $\mathcal { D F }$ , for directed factorization. This is illustrated in Figure 8.25. Alternatively, we can use the graph as a different kind of filter by first listing all of the conditional independence properties obtained by applying the d-separation criterion to the graph, and then allowing a distribution to pass only if it satisfies all of these properties. If we present all possible distributions $p ( \mathbf { x } )$ to this second kind of filter, then the d-separation theorem tells us that the set of distributions that will be allowed through is precisely the set $\mathcal { D F }$

It should be emphasized that the conditional independence properties obtained from d-separation apply to any probabilistic model described by that particular directed graph. This will be true, for instance, whether the variables are discrete or continuous or a combination of these. Again, we see that a particular graph is describing a whole family of probability distributions.

At one extreme we have a fully connected graph that exhibits no conditional independence properties at all, and which can represent any possible joint probability distribution over the given variables. The set $\mathcal { D F }$ will contain all possible distributions $p ( \mathbf { x } )$ . At the other extreme, we have the fully disconnected graph, i.e., one having no links at all. This corresponds to joint distributions which factorize into the product of the marginal distributions over the variables comprising the nodes of the graph.

![image](images/part-003--7b72877104f7a3ba02ac4808e1d547b6c91a30d5ea0996d244133843fe51e6f2.jpg)

Figure 8.25 We can view a graphical model (in this case a directed graph) as a filter in which a probability distribution $p ( \mathbf { x } )$ is allowed through the filter if, and only if, it satisfies the directed factorization property (8.5). The set of all possible probability distributions $p ( \mathbf { x } )$ that pass through the filter is denoted . We can alternatively use the graph to filter distributions according to whether they respect all of the conditional independencies implied by the d-separation properties of the graph. The d-separation theorem says that it is the same set of distributions $\mathcal { D F }$ that will be allowed through this second kind of filter.

Note that for any given graph, the set of distributions $\mathcal { D F }$ will include any distributions that have additional independence properties beyond those described by the graph. For instance, a fully factorized distribution will always be passed through the filter implied by any graph over the corresponding set of variables.

We end our discussion of conditional independence properties by exploring the concept of a Markov blanket or Markov boundary. Consider a joint distribution $p ( \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { D } )$ represented by a directed graph having D nodes, and consider the conditional distribution of a particular node with variables $\mathbf { x } _ { i }$ conditioned on all of the remaining variables $\mathbf { x } _ { j \neq i }$ . Using the factorization property (8.5), we can express this conditional distribution in the form

\begin{array}{r c l} p (\mathbf {x} _ {i} | \mathbf {x} _ {\{j \neq i \}}) & = & \frac {p (\mathbf {x} _ {1} , \ldots , \mathbf {x} _ {D})}{\int p (\mathbf {x} _ {1} , \ldots , \mathbf {x} _ {D})   \mathrm{d} \mathbf {x} _ {i}} \\ & = & \frac {\prod_ {k} p (\mathbf {x} _ {k} | \mathrm{pa} _ {k})}{\int \prod_ {k} p (\mathbf {x} _ {k} | \mathrm{pa} _ {k})   \mathrm{d} \mathbf {x} _ {i}} \end{array}

in which the integral is replaced by a summation in the case of discrete variables. We now observe that any factor $p ( \mathbf { x } _ { k } | \mathrm { p a } _ { k } )$ that does not have any functional dependence on $\mathbf { x } _ { i }$ can be taken outside the integral over $\mathbf { x } _ { i } .$ , and will therefore cancel between numerator and denominator. The only factors that remain will be the conditional distribution $p ( \mathbf { x } _ { i } | \mathrm { p a } _ { i } )$ for node $\mathbf { x } _ { i }$ itself, together with the conditional distributions for any nodes $\mathbf { x } _ { k }$ such that node $\mathbf { x } _ { i }$ is in the conditioning set of $p ( \mathbf { x } _ { k } | \mathrm { p a } _ { k } )$ , in other words for which $\mathbf { x } _ { i }$ is a parent of $\mathbf { x } _ { k }$ . The conditional $p ( \mathbf { x } _ { i } | \mathrm { p a } _ { i } )$ will depend on the parents of node $\mathbf { x } _ { i } .$ , whereas the conditionals $p ( \mathbf { x } _ { k } | \mathrm { p a } _ { k } )$ will depend on the children

Figure 8.26

The Markov blanket of a node $\mathbf { x } _ { i }$ comprises the set of parents, children and co-parents of the node. It has the property that the conditional distribution of $\mathbf { x } _ { i } ,$ , conditioned on all the remaining variables in the graph, is dependent only on the variables in the Markov blanket.

![image](images/part-003--1278c7dba0a31f834f72e49d4e997dee2c9f0d8ae5554fe85e0fec702d084ea3.jpg)

of $\mathbf { x } _ { i }$ as well as on the co-parents, in other words variables corresponding to parents of node $\mathbf { x } _ { k }$ other than node $\mathbf { x } _ { i }$ . The set of nodes comprising the parents, the children and the co-parents is called the Markov blanket and is illustrated in Figure 8.26. We can think of the Markov blanket of a node $\mathbf { x } _ { i }$ as being the minimal set of nodes that isolates $\mathbf { x } _ { i }$ from the rest of the graph. Note that it is not sufficient to include only the parents and children of node $\mathbf { x } _ { i }$ because the phenomenon of explaining away means that observations of the child nodes will not block paths to the co-parents. We must therefore observe the co-parent nodes also.
