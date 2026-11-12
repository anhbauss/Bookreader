---
id: "tin-hieu-he-thong.13-2-2-the-forward-backward-algorithm"
doc_id: "tin-hieu-he-thong"
title: "13.2.2 The forward-backward algorithm"
level: 2
heading_path: ["Sequential Data", "13.2.2 The forward-backward algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-2-1-maximum-likelihood-for-the-hmm"
next_id: "tin-hieu-he-thong.13-2-3-the-sum-product-algorithm-for-the-hmm"
block_ids: ["b6638", "b6639", "b6640", "b6641", "b6642", "b6643", "b6644", "b6645", "b6646", "b6647", "b6648", "b6649", "b6650", "b6651", "b6652", "b6653", "b6654", "b6655", "b6656", "b6657", "b6658", "b6659", "b6660", "b6661", "b6662", "b6663", "b6664", "b6665", "b6666", "b6667", "b6668", "b6669", "b6670", "b6671", "b6672", "b6673", "b6674", "b6675", "b6676", "b6677", "b6678", "b6679", "b6680", "b6681", "b6682", "b6683", "b6684", "b6685", "b6686", "b6687", "b6688", "b6689", "b6690", "b6691", "b6692", "b6693", "b6694", "b6695", "b6696", "b6697", "b6698", "b6699", "b6700", "b6701"]
---

## 13.2.2 The forward-backward algorithm

Next we seek an efficient procedure for evaluating the quantities $\gamma ( z _ { n k } )$ and $\xi ( z _ { n - 1 , j } , z _ { n k } )$ , corresponding to the E step of the EM algorithm. The graph for the hidden Markov model, shown in Figure 13.5, is a tree, and so we know that the posterior distribution of the latent variables can be obtained efficiently using a twostage message passing algorithm. In the particular context of the hidden Markov model, this is known as the forward-backward algorithm (Rabiner, 1989), or the Baum-Welch algorithm (Baum, 1972). There are in fact several variants of the basic algorithm, all of which lead to the exact marginals, according to the precise form of the messages that are propagated along the chain (Jordan, 2007). We shall focus on the most widely used of these, known as the alpha-beta algorithm.

As well as being of great practical importance in its own right, the forwardbackward algorithm provides us with a nice illustration of many of the concepts introduced in earlier chapters. We shall therefore begin in this section with a ‘conventional’ derivation of the forward-backward equations, making use of the sum and product rules of probability, and exploiting conditional independence properties which we shall obtain from the corresponding graphical model using d-separation. Then in Section 13.2.3, we shall see how the forward-backward algorithm can be obtained very simply as a specific example of the sum-product algorithm introduced in Section 8.4.4.

It is worth emphasizing that evaluation of the posterior distributions of the latent variables is independent of the form of the emission density $p ( \mathbf { x } | \mathbf { z } )$ or indeed of whether the observed variables are continuous or discrete. All we require is the values of the quantities $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ for each value of $\mathbf { z } _ { n }$ for every n. Also, in this section and the next we shall omit the explicit dependence on the model parameters $\theta ^ { \mathrm { o l d } }$ because these fixed throughout.

We therefore begin by writing down the following conditional independence properties (Jordan, 2007)

{p (\mathbf {X} | \mathbf {z} _ {n})} = {p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n} | \mathbf {z} _ {n})}\tag{13.24}

{p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {x} _ {n}, \mathbf {z} _ {n})} = {p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n})}\tag{13.25}

{p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1}, \mathbf {z} _ {n})} = {p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1})}\tag{13.26}

{p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n}, \mathbf {z} _ {n + 1})} = {p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1})}\tag{13.27}

{p (\mathbf {x} _ {n + 2}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1}, \mathbf {x} _ {n + 1})} = {p (\mathbf {x} _ {n + 2}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1})}\tag{13.28}

{p (\mathbf {X} | \mathbf {z} _ {n - 1}, \mathbf {z} _ {n})} = {p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1})}

p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n})\tag{13.29}

{p (\mathbf {x} _ {N + 1} | \mathbf {X}, \mathbf {z} _ {N + 1})} = {p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1})}\tag{13.30}

{p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {N}, \mathbf {X})} = {p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {N})}\tag{13.31}

where $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ . These relations are most easily proved using d-separation. For instance in the first of these results, we note that every path from any one of the nodes $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { n - 1 }$ to the node ${ \bf x } _ { n }$ passes through the node $\mathbf { z } _ { n }$ , which is observed. Because all such paths are head-to-tail, it follows that the conditional independence property must hold. The reader should take a few moments to verify each of these properties in turn, as an exercise in the application of d-separation. These relations can also be proved directly, though with significantly greater effort, from the joint distribution for the hidden Markov model using the sum and product rules of probability.

Let us begin by evaluating $\gamma ( z _ { n k } )$ . Recall that for a discrete multinomial random variable the expected value of one of its components is just the probability of that component having the value 1. Thus we are interested in finding the posterior distribution $p ( \mathbf { z } _ { n } \vert \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } )$ of $\mathbf { z } _ { n }$ given the observed data set $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ . This represents a vector of length K whose entries correspond to the expected values of $z _ { n k }$ . Using Bayes’ theorem, we have

\gamma (\mathbf {z} _ {n}) = p (\mathbf {z} _ {n} | \mathbf {X}) = \frac {p (\mathbf {X} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n})}{p (\mathbf {X})}.\tag{13.32}

Note that the denominator $p ( \mathbf { X } )$ is implicitly conditioned on the parameters $\pmb { \theta } ^ { \mathrm { o l d } }$ of the HMM and hence represents the likelihood function. Using the conditional independence property (13.24), together with the product rule of probability, we obtain

\gamma (\mathbf {z} _ {n}) = \frac {p (\mathbf {x} _ {1} , \ldots , \mathbf {x} _ {n} , \mathbf {z} _ {n}) p (\mathbf {x} _ {n + 1} , \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n})}{p (\mathbf {X})} = \frac {\alpha (\mathbf {z} _ {n}) \beta (\mathbf {z} _ {n})}{p (\mathbf {X})}\tag{13.33}

where we have defined

\alpha (\mathbf {z} _ {n}) \equiv p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}, \mathbf {z} _ {n})\tag{13.34}

\beta (\mathbf {z} _ {n}) \equiv p (\mathbf {x} _ {n + 1}, \dots , \mathbf {x} _ {N} | \mathbf {z} _ {n}).\tag{13.35}

The quantity $\alpha ( { \mathbf z } _ { n } )$ represents the joint probability of observing all of the given data up to time n and the value of $\mathbf { z } _ { n }$ , whereas $\beta ( { \bf z } _ { n } )$ represents the conditional probability of all future data from time $n + 1$ up to N given the value of $\mathbf { z } _ { n }$ . Again, $\alpha ( { \mathbf z } _ { n } )$ and $\beta ( { \bf z } _ { n } )$ each represent set of $K$ numbers, one for each of the possible settings of the 1-of-K coded binary vector $\mathbf { z } _ { n }$ . We shall use the notation $\alpha ( z _ { n k } )$ to denote the value of $\alpha ( { \mathbf z } _ { n } )$ when $z _ { n k } = 1$ , with an analogous interpretation of $\beta ( z _ { n k } )$

We now derive recursion relations that allow $\alpha ( { \mathbf z } _ { n } )$ and $\beta ( { \bf z } _ { n } )$ to be evaluated efficiently. Again, we shall make use of conditional independence properties, in particular (13.25) and (13.26), together with the sum and product rules, allowing us to express $\alpha ( { \mathbf z } _ { n } )$ in terms of $\alpha ( { \bf z } _ { n - 1 } )$ as follows

\begin{array}{r c l} \alpha (\mathbf {z} _ {n}) & = & p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n}, \mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}, \mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}, \mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1}, \mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n - 1}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n - 1}) \\ & = & p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} p (\mathbf {x} _ {1}, \ldots , \mathbf {x}. _ {n - 1}, \mathbf {z}. _ {n - 1}) p (\mathbf {z}. _ {n} | \mathbf {z}. _ {n - 1}) \end{array}

Making use of the definition (13.34) for $\alpha ( { \mathbf z } _ { n } )$ , we then obtain

\alpha (\mathbf {z} _ {n}) = p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) \sum_ {\mathbf {z} _ {n - 1}} \alpha (\mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}).\tag{13.36}

Illustration of the forward recursion (13.36) for evaluation of the $\alpha$ variables. In this fragment of the lattice, we see that the quantity $\bar { \alpha } ( z _ { n 1 } )$ is obtained by taking the elements $\alpha ( z _ { n - 1 , j } )$ of $\alpha ( { \bf z } _ { n - 1 } )$ at step $n - 1$ and summing them up with weights given by $A _ { j 1 }$ , corresponding to the values of $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ , and then multiplying by the data contribution $p ( \mathbf { x } _ { n } | z _ { n 1 } )$

![image](images/part-004--b8b82eb0c8bb3000b942f6eb10b4f111f2c2242c862fc1dabe4e3c659b0481c5.jpg)

It is worth taking a moment to study this recursion relation in some detail. Note that there are $K$ terms in the summation, and the right-hand side has to be evaluated for each of the $K$ values of $\mathbf { z } _ { n }$ so each step of the $\alpha$ recursion has computational cost that scaled like $O ( K ^ { 2 } )$ . The forward recursion equation for $\alpha ( { \mathbf z } _ { n } )$ is illustrated using a lattice diagram in Figure 13.12.

In order to start this recursion, we need an initial condition that is given by

\alpha (\mathbf {z} _ {1}) = p (\mathbf {x} _ {1}, \mathbf {z} _ {1}) = p (\mathbf {z} _ {1}) p (\mathbf {x} _ {1} | \mathbf {z} _ {1}) = \prod_ {k = 1} ^ {K} \left\{\pi_ {k} p (\mathbf {x} _ {1} | \boldsymbol {\phi} _ {k}) \right\} ^ {z _ {1 k}}\tag{13.37}

which tells us that $\alpha ( z _ { 1 k } )$ , for $k = 1 , \ldots , K$ , takes the value $\pi _ { k } p ( { \bf x } _ { 1 } | \phi _ { k } )$ . Starting at the first node of the chain, we can then work along the chain and evaluate $\alpha ( { \mathbf z } _ { n } )$ for every latent node. Because each step of the recursion involves multiplying by a $K \times K$ matrix, the overall cost of evaluating these quantities for the whole chain is of $O ( K ^ { 2 } N )$

We can similarly find a recursion relation for the quantities $\beta ( { \bf z } _ { n } )$ by making use of the conditional independence properties (13.27) and (13.28) giving

\begin{array}{l l l} \beta (\mathbf {z} _ {n}) & = & p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n}) \\ & = & \sum_ {\mathbf {z} _ {n + 1}} p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N}, \mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) \\ & = & \sum_ {\mathbf {z} _ {n + 1}} p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n}, \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) \\ & = & \sum_ {\mathbf {z} _ {n + 1}} p (\mathbf {x} _ {n + 1}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}) \\ & = & \sum_ {\mathbf {z} _ {n + 1}} p (\mathbf {x} _ {n + 2}, \ldots , \mathbf {x} _ {N} | \mathbf {z} _ {n + 1}) p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}). \end{array}

Illustration of the backward recursion (13.38) for evaluation of the $\beta$ variables. In this fragment of the lattice, we see that the quantity $\beta ( z _ { n 1 } )$ is obtained by taking the components $\beta ( z _ { n + 1 , k } )$ of $\beta ( \mathbf { z } _ { n + 1 } )$ at step $n + 1$ and summing them up with weights given by the products of $A _ { 1 k }$ , corresponding to the values of $p ( \mathbf { z } _ { n + 1 } | \mathbf { z } _ { n } )$ and the corresponding values of the emission density $p ( \mathbf { x } _ { n } | z _ { n + 1 , k } )$

![image](images/part-004--2d709c9c6123d19ac66e01826b856b8d212b872ac4ee663d4a7439fb7be4e478.jpg)

Making use of the definition (13.35) for $\beta ( { \bf z } _ { n } )$ , we then obtain

\beta (\mathbf {z} _ {n}) = \sum_ {\mathbf {z} _ {n + 1}} \beta (\mathbf {z} _ {n + 1}) p (\mathbf {x} _ {n + 1} | \mathbf {z} _ {n + 1}) p (\mathbf {z} _ {n + 1} | \mathbf {z} _ {n}).\tag{13.38}

Note that in this case we have a backward message passing algorithm that evaluates $\beta ( { \bf z } _ { n } )$ in terms of $\beta ( { \bf z } _ { n + 1 } )$ . At each step, we absorb the effect of observation $\mathbf { x } _ { n + 1 }$ through the emission probability $p ( \mathbf { x } _ { n + 1 } | \mathbf { z } _ { n + 1 } )$ , multiply by the transition matrix $p ( \mathbf { z } _ { n + 1 } | \mathbf { z } _ { n } )$ , and then marginalize out $\mathbf { z } _ { n + 1 }$ . This is illustrated in Figure 13.13.

Again we need a starting condition for the recursion, namely a value for $\beta ( { \bf z } _ { N } )$ This can be obtained by setting $n = N$ in (13.33) and replacing $\alpha ( { \bf z } _ { N } )$ with its definition (13.34) to give

p (\mathbf {z} _ {N} | \mathbf {X}) = \frac {p (\mathbf {X} , \mathbf {z} _ {N}) \beta (\mathbf {z} _ {N})}{p (\mathbf {X})}\tag{13.39}

which we see will be correct provided we take $\beta ( { \bf z } _ { N } ) = 1$ for all settings of $\mathbf { z } _ { N }$ .

In the M step equations, the quantity $p ( \mathbf { X } )$ will cancel out, as can be seen, for instance, in the M-step equation for $\mu _ { k }$ given by (13.20), which takes the form

\boldsymbol {\mu} _ {k} = \frac {\sum_ {n = 1} ^ {n} \gamma (z _ {n k}) \mathbf {x} _ {n}}{\sum_ {n = 1} ^ {n} \gamma (z _ {n k})} = \frac {\sum_ {n = 1} ^ {n} \alpha (z _ {n k}) \beta (z _ {n k}) \mathbf {x} _ {n}}{\sum_ {n = 1} ^ {n} \alpha (z _ {n k}) \beta (z _ {n k})}.\tag{13.40}

However, the quantity $p ( \mathbf { X } )$ represents the likelihood function whose value we typically wish to monitor during the EM optimization, and so it is useful to be able to evaluate it. If we sum both sides of (13.33) over $\mathbf { z } _ { n }$ , and use the fact that the left-hand side is a normalized distribution, we obtain

p (\mathbf {X}) = \sum_ {\mathbf {z} _ {n}} \alpha (\mathbf {z} _ {n}) \beta (\mathbf {z} _ {n}).\tag{13.41}

Thus we can evaluate the likelihood function by computing this sum, for any convenient choice of $n .$ For instance, if we only want to evaluate the likelihood function, then we can do this by running the α recursion from the start to the end of the chain, and then use this result for $n = N$ , making use of the fact that $\beta ( { \bf z } _ { N } )$ is a vector of 1s. In this case no $\beta$ recursion is required, and we simply have

p (\mathbf {X}) = \sum_ {\mathbf {z} _ {N}} \alpha (\mathbf {z} _ {N}).\tag{13.42}

Let us take a moment to interpret this result for $p ( \mathbf { X } )$ . Recall that to compute the likelihood we should take the joint distribution $p ( \mathbf { X } , \mathbf { Z } )$ and sum over all possible values of Z. Each such value represents a particular choice of hidden state for every time step, in other words every term in the summation is a path through the lattice diagram, and recall that there are exponentially many such paths. By expressing the likelihood function in the form (13.42), we have reduced the computational cost from being exponential in the length of the chain to being linear by swapping the order of the summation and multiplications, so that at each time step n we sum the contributions from all paths passing through each of the states $z _ { n k }$ to give the intermediate quantities $\alpha ( { \mathbf z } _ { n } )$

Next we consider the evaluation of the quantities $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ , which correspond to the values of the conditional probabilities $p ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } | \mathbf { X } )$ for each of the $K \times K$ settings for $\left( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } \right)$ . Using the definition of $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ , and applying Bayes theorem, we have

\begin{array}{l} \xi (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n}) = p (\mathbf {z} _ {n - 1}, \mathbf {z} _ {n} | \mathbf {X}) \\ = \frac {p (\mathbf {X} | \mathbf {z} _ {n - 1} , \mathbf {z} _ {n}) p (\mathbf {z} _ {n - 1} , \mathbf {z} _ {n})}{p (\mathbf {X})} \\ = \frac {p (\mathbf {x} _ {1} , \dots , \mathbf {x} _ {n - 1} | \mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {x} _ {n + 1} , \dots , \mathbf {x} _ {N} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) p (\mathbf {z} _ {n - 1})}{p (\mathbf {X})} \\ = \frac {\alpha (\mathbf {z} _ {n - 1}) p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}) \beta (\mathbf {z} _ {n})}{p (\mathbf {X})} \end{array} \tag {13.43}

where we have made use of the conditional independence property (13.29) together with the definitions of $\alpha ( { \mathbf z } _ { n } )$ and $\beta ( { \bf z } _ { n } )$ given by (13.34) and (13.35). Thus we can calculate the $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ directly by using the results of the α and $\beta$ recursions.

Let us summarize the steps required to train a hidden Markov model using the EM algorithm. We first make an initial selection of the parameters $\pmb { \theta } ^ { \mathrm { o l d } }$ where $\pmb { \theta } \equiv ( \pi , \mathbf { A } , \phi )$ The A and $\pi$ parameters are often initialized either uniformly or randomly from a uniform distribution (respecting their non-negativity and summation constraints). Initialization of the parameters $\phi$ will depend on the form of the distribution. For instance in the case of Gaussians, the parameters $\mu _ { k }$ might be initialized by applying the K-means algorithm to the data, and $\Sigma _ { k }$ might be initialized to the covariance matrix of the corresponding K means cluster. Then we run both the forward α recursion and the backward $\beta$ recursion and use the results to evaluate $\gamma ( \mathbf { z } _ { n } )$ and $\xi ( \mathbf { z } _ { n - 1 } , \mathbf { z } _ { n } )$ . At this stage, we can also evaluate the likelihood function.

This completes the E step, and we use the results to find a revised set of parameters $\pmb { \theta } ^ { \mathrm { n e w } }$ using the M-step equations from Section 13.2.1. We then continue to alternate between E and M steps until some convergence criterion is satisfied, for instance when the change in the likelihood function is below some threshold.

Note that in these recursion relations the observations enter through conditional distributions of the form $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ The recursions are therefore independent of the type or dimensionality of the observed variables or the form of this conditional distribution, so long as its value can be computed for each of the K possible states of $\mathbf { z } _ { n }$ . Since the observed variables $\left\{ { \bf x } _ { n } \right\}$ are fixed, the quantities $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } )$ can be pre-computed as functions of $\mathbf { z } _ { n }$ at the start of the EM algorithm, and remain fixed throughout.

We have seen in earlier chapters that the maximum likelihood approach is most effective when the number of data points is large in relation to the number of parameters. Here we note that a hidden Markov model can be trained effectively, using maximum likelihood, provided the training sequence is sufficiently long. Alternatively, we can make use of multiple shorter sequences, which requires a straightforward modification of the hidden Markov model EM algorithm. In the case of left-to-right models, this is particularly important because, in a given observation sequence, a given state transition corresponding to a nondiagonal element of A will seen at most once.

Another quantity of interest is the predictive distribution, in which the observed data is $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \}$ and we wish to predict $\mathbf { x } _ { N + 1 }$ , which would be important for real-time applications such as financial forecasting. Again we make use of the sum and product rules together with the conditional independence properties (13.29) and (13.31) giving

\begin{array}{r c l} p (\mathbf {x} _ {N + 1} | \mathbf {X}) & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1}, \mathbf {z} _ {N + 1} | \mathbf {X}) \\ & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) p (\mathbf {z} _ {N + 1} | \mathbf {X}) \\ & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) \sum_ {\mathbf {z} _ {N}} p (\mathbf {z} _ {N + 1}, \mathbf {z} _ {N} | \mathbf {X}) \\ & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) \sum_ {\mathbf {z} _ {N}} p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {N}) p (\mathbf {z} _ {N} | \mathbf {X}) \\ & = & \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) \sum_ {\mathbf {z} _ {N}} p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {\mathrm{N}}) \frac {p (\mathbf {z} _ {\mathrm{N}} , \mathbf {X})}{p (\mathbf {X})} \\ & = & \frac {1}{p (\mathbf {X})} \sum_ {\mathbf {z} _ {N + 1}} p (\mathbf {x} _ {N + 1} | \mathbf {z} _ {N + 1}) \sum_ {\mathbf {z} _ {\mathrm{N}}} p (\mathbf {z} _ {N + 1} | \mathbf {z} _ {\mathrm{N}}) \alpha (\mathbf {z} _ {\mathrm{N}}) \end{array}\tag{13.44}

which can be evaluated by first running a forward α recursion and then computing the final summations over $\mathbf { z } _ { N }$ and $\mathbf { z } _ { N + 1 }$ . The result of the first summation over $\mathbf { z } _ { N }$ can be stored and used once the value of $\mathbf { x } _ { N + 1 }$ is observed in order to run the α recursion forward to the next step in order to predict the subsequent value $\mathbf { x } _ { N + 2 }$

Figure 13.14 A fragment of the factor graph representation for the hidden Markov model.

![image](images/part-004--a9c212e43dfe92e79705766a0b2ae31ea2256d376f8ccca805c90e28b21f41a6.jpg)

Note that in (13.44), the influence of all data from $\mathbf { x } _ { 1 }$ to $\mathbf { x } _ { N }$ is summarized in the K values of $\alpha ( { \bf z } _ { N } )$ . Thus the predictive distribution can be carried forward indefinitely using a fixed amount of storage, as may be required for real-time applications.

Here we have discussed the estimation of the parameters of an HMM using maximum likelihood. This framework is easily extended to regularized maximum likelihood by introducing priors over the model parameters $\pi .$ , A and $\phi$ whose values are then estimated by maximizing their posterior probability. This can again be done using the EM algorithm in which the E step is the same as discussed above, and the M step involves adding the log of the prior distribution $p ( \pmb \theta )$ to the function $Q ( \theta , \theta ^ { \mathrm { o l d } } )$ before maximization and represents a straightforward application of the techniques developed at various points in this book. Furthermore, we can use variational methods to give a fully Bayesian treatment of the HMM in which we marginalize over the parameter distributions (MacKay, 1997). As with maximum likelihood, this leads to a two-pass forward-backward recursion to compute posterior probabilities.
