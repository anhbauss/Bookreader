---
id: "tin-hieu-he-thong.13-2-hidden-markov-models"
doc_id: "tin-hieu-he-thong"
title: "13.2. Hidden Markov Models"
level: 2
heading_path: ["Sequential Data", "13.2. Hidden Markov Models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-1-markov-models"
next_id: "tin-hieu-he-thong.13-2-1-maximum-likelihood-for-the-hmm"
block_ids: ["b6568", "b6569", "b6570", "b6571", "b6572", "b6573", "b6574", "b6575", "b6576", "b6577", "b6578", "b6579", "b6580", "b6581", "b6582", "b6583", "b6584", "b6585", "b6586", "b6587", "b6588", "b6589", "b6590", "b6591", "b6592", "b6593", "b6594", "b6595", "b6596", "b6597", "b6598", "b6599", "b6600", "b6601", "b6602", "b6603"]
---

## 13.2. Hidden Markov Models

The hidden Markov model can be viewed as a specific instance of the state space model of Figure 13.5 in which the latent variables are discrete. However, if we examine a single time slice of the model, we see that it corresponds to a mixture distribution, with component densities given by $p ( \mathbf { x } | \mathbf { z } )$ . It can therefore also be interpreted as an extension of a mixture model in which the choice of mixture component for each observation is not selected independently but depends on the choice of component for the previous observation. The HMM is widely used in speech recognition (Jelinek, 1997; Rabiner and Juang, 1993), natural language modelling (Manning and Schutze, 1999), on-line handwriting recognition (Nag¨ et al., 1986), and for the analysis of biological sequences such as proteins and DNA (Krogh et al., 1994; Durbin et al., 1998; Baldi and Brunak, 2001).

As in the case of a standard mixture model, the latent variables are the discrete multinomial variables $\mathbf { z } _ { n }$ describing which component of the mixture is responsible for generating the corresponding observation ${ \bf x } _ { n }$ . Again, it is convenient to use a 1-of-K coding scheme, as used for mixture models in Chapter 9. We now allow the probability distribution of $\mathbf { z } _ { n }$ to depend on the state of the previous latent variable $\mathbf { z } _ { n - 1 }$ through a conditional distribution $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ . Because the latent variables are K-dimensional binary variables, this conditional distribution corresponds to a table of numbers that we denote by A, the elements of which are known as transition probabilities. They are given by $A _ { j k } \equiv p ( z _ { n k } = 1 | z _ { n - 1 , j } = 1 )$ , and because they are probabilities, they satisfy $0 \leqslant A _ { j k } \leqslant 1$ with $\textstyle \sum _ { k } A _ { j k } = 1$ , so that the matrix A

Transition diagram showing a model whose latent variables have three possible states corresponding to the three boxes. The black lines denote the elements of the transition matrix $A _ { j k }$

![image](images/part-004--e13222f89521960d4e2305f16f53e92ea6e6502e3d7b2c42e99464f15e47b240.jpg)

has $K ( K { - } 1 )$ independent parameters. We can then write the conditional distribution explicitly in the form

p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1, \mathbf {A}}) = \prod_ {k = 1} ^ {K} \prod_ {j = 1} ^ {K} A _ {j k} ^ {z _ {n - 1, j} z _ {n k}}.\tag{13.7}

The initial latent node $\mathbf { z } _ { 1 }$ is special in that it does not have a parent node, and so it has a marginal distribution $p ( \mathbf { z } _ { 1 } )$ represented by a vector of probabilities $\pi$ with elements $\pi _ { k } \equiv p ( z _ { 1 k } = 1 )$ , so that

p (\mathbf {z} _ {1} | \boldsymbol {\pi}) = \prod_ {k = 1} ^ {K} \pi_ {k} ^ {z _ {1 k}}\tag{13.8}

where $\textstyle \sum _ { k } \pi _ { k } = 1$

The transition matrix is sometimes illustrated diagrammatically by drawing the states as nodes in a state transition diagram as shown in Figure 13.6 for the case of $K = 3$ . Note that this does not represent a probabilistic graphical model, because the nodes are not separate variables but rather states of a single variable, and so we have shown the states as boxes rather than circles.

It is sometimes useful to take a state transition diagram, of the kind shown in Figure 13.6, and unfold it over time. This gives an alternative representation of the transitions between latent states, known as a lattice or trellis diagram, and which is shown for the case of the hidden Markov model in Figure 13.7.

The specification of the probabilistic model is completed by defining the conditional distributions of the observed variables $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } , \phi )$ , where $\phi$ is a set of parameters governing the distribution. These are known as emission probabilities, and might for example be given by Gaussians of the form (9.11) if the elements of x are continuous variables, or by conditional probability tables if x is discrete. Because ${ \bf x } _ { n }$ is observed, the distribution $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } , \phi )$ consists, for a given value of $\phi .$ , of a vector of K numbers corresponding to the K possible states of the binary vector $\mathbf { z } _ { n }$

Figure 13.7 If we unfold the state transition diagram of Figure 13.6 over time, we obtain a lattice, or trellis, representation of the latent states. Each column of this diagram corresponds to one of the latent variables ${ \bf z } _ { n }$

![image](images/part-004--f9cdc8f6d91ecd4470bc42bcc2efd5811ea374726f7fa4028a1e1ffbd7d8fefe.jpg)

We can represent the emission probabilities in the form

p (\mathbf {x} _ {n} | \mathbf {z} _ {n}, \phi) = \prod_ {k = 1} ^ {K} p (\mathbf {x} _ {n} | \phi_ {k}) ^ {z _ {n k}}.\tag{13.9}

We shall focuss attention on homogeneous models for which all of the conditional distributions governing the latent variables share the same parameters A, and similarly all of the emission distributions share the same parameters $\phi$ (the extension to more general cases is straightforward). Note that a mixture model for an i.i.d. data set corresponds to the special case in which the parameters $A _ { j k }$ are the same for all values of ${ \dot { } } $ , so that the conditional distribution $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } )$ is independent of $\mathbf { z } _ { n - 1 }$ This corresponds to deleting the horizontal links in the graphical model shown in Figure 13.5.

The joint probability distribution over both latent and observed variables is then given by

p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}) = p (\mathbf {z} _ {1} | \boldsymbol {\pi}) \left[ \prod_ {n = 2} ^ {N} p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}, \mathbf {A}) \right] \prod_ {m = 1} ^ {N} p (\mathbf {x} _ {m} | \mathbf {z} _ {m}, \boldsymbol {\phi})\tag{13.10}

where $\mathbf { X } = \{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \} , \mathbf { Z } = \{ \mathbf { z } _ { 1 } , \ldots , \mathbf { z } _ { N } \}$ , and $\pmb \theta = \{ \pi , \mathbf A , \phi \}$ denotes the set of parameters governing the model. Most of our discussion of the hidden Markov model will be independent of the particular choice of the emission probabilities. Indeed, the model is tractable for a wide range of emission distributions including discrete tables, Gaussians, and mixtures of Gaussians. It is also possible to exploit discriminative models such as neural networks. These can be used to model the emission density $p ( \mathbf { x } | \mathbf { z } )$ directly, or to provide a representation for $p ( \mathbf { z } | \mathbf { x } )$ that can be converted into the required emission density $p ( \mathbf { x } | \mathbf { z } )$ using Bayes’ theorem (Bishop et al., 2004).

We can gain a better understanding of the hidden Markov model by considering it from a generative point of view. Recall that to generate samples from a mixture of

![image](images/part-004--120cb170367b544c3dddc1e29225c14b09ec40026ff99311fb6461bb70a68d65.jpg)

![image](images/part-004--e45d42762393b53ce3f2dc317ef537de5813fe5d49b9cc0b8514b91aad0db44a.jpg)

Figure 13.8 Illustration of sampling from a hidden Markov model having a 3-state latent variable z and a Gaussian emission model $p ( \mathbf { x } | \mathbf { z } )$ where x is 2-dimensional. (a) Contours of constant probability density for the emission distributions corresponding to each of the three states of the latent variable. (b) A sample of 50 points drawn from the hidden Markov model, colour coded according to the component that generated them and with lines connecting the successive observations. Here the transition matrix was fixed so that in any state there is a 5% probability of making a transition to each of the other states, and consequently a 90% probability of remaining in the same state.

Gaussians, we first chose one of the components at random with probability given by the mixing coefficients $\pi _ { k }$ and then generate a sample vector x from the corresponding Gaussian component. This process is repeated N times to generate a data set of N independent samples. In the case of the hidden Markov model, this procedure is modified as follows. We first choose the initial latent variable $\mathbf { z } _ { 1 }$ with probabilities governed by the parameters $\pi _ { k }$ and then sample the corresponding observation $\mathbf { x } _ { 1 }$ Now we choose the state of the variable $\mathbf { z } _ { 2 }$ according to the transition probabilities $p ( \mathbf { z } _ { 2 } | \mathbf { z } _ { 1 } )$ using the already instantiated value of $\mathbf { z } _ { 1 }$ . Thus suppose that the sample for $\mathbf { z } _ { 1 }$ corresponds to state $j .$ . Then we choose the state k of $\mathbf { z } _ { 2 }$ with probabilities $A _ { j k }$ for $k = 1 , \ldots , K$ . Once we know $\mathbf { z } _ { 2 }$ we can draw a sample for $\mathbf { x } _ { 2 }$ and also sample the next latent variable $\mathbf { z } _ { 3 }$ and so on. This is an example of ancestral sampling for a directed graphical model. If, for instance, we have a model in which the diagonal transition elements $A _ { k k }$ are much larger than the off-diagonal elements, then a typical data sequence will have long runs of points generated from a single component, with infrequent transitions from one component to another. The generation of samples from a hidden Markov model is illustrated in Figure 13.8.

There are many variants of the standard HMM model, obtained for instance by imposing constraints on the form of the transition matrix A (Rabiner, 1989). Here we mention one of particular practical importance called the left-to-right HMM, which is obtained by setting the elements $A _ { j k }$ of A to zero if $k < j$ , as illustrated in the state transition diagram for a 3-state HMM in Figure 13.9. Typically for such models the initial state probabilities for $p ( \mathbf { z } _ { 1 } )$ are modified so that $p ( z _ { 1 1 } ) = 1$ and $p ( z _ { 1 j } ) = 0$ for $j \neq 1$ , in other words every sequence is constrained to start in state $j = 1$ . The transition matrix may be further constrained to ensure that large changes in the state index do not occur, so that $A _ { j k } = 0 \mathrm { i f } k > j + \Delta$ . This type of model is illustrated using a lattice diagram in Figure 13.10.

Figure 13.9 Example of the state transition diagram for a 3-state left-to-right hidden Markov model. Note that once a state has been vacated, it cannot later be re-entered.

![image](images/part-004--3c8fe39406ad8ce55ebf756a98b951f07369fb6683f759588b6fb20c4c904787.jpg)

Many applications of hidden Markov models, for example speech recognition, or on-line character recognition, make use of left-to-right architectures. As an illustration of the left-to-right hidden Markov model, we consider an example involving handwritten digits. This uses on-line data, meaning that each digit is represented by the trajectory of the pen as a function of time in the form of a sequence of pen coordinates, in contrast to the off-line digits data, discussed in Appendix A, which comprises static two-dimensional pixellated images of the ink. Examples of the online digits are shown in Figure 13.11. Here we train a hidden Markov model on a subset of data comprising 45 examples of the digit ‘2’. There are $K = 1 6$ states, each of which can generate a line segment of fixed length having one of 16 possible angles, and so the emission distribution is simply a $1 6 \times 1 6$ table of probabilities associated with the allowed angle values for each state index value. Transition probabilities are all set to zero except for those that keep the state index k the same or that increment it by 1, and the model parameters are optimized using 25 iterations of EM. We can gain some insight into the resulting model by running it generatively, as shown in Figure 13.11.

Figure 13.10 Lattice diagram for a 3-state leftto-right HMM in which the state index k is allowed to increase by at most 1 at each transition.

![image](images/part-004--55f827e853ac8fdce8322ed6ed63646cd29b124d59be11aace7182e44090e7ca.jpg)

Top row: examples of on-line handwritten digits. Bottom row: synthetic digits sampled generatively from a left-to-right hidden Markov model that has been trained on a data set of 45 handwritten digits.

![image](images/part-004--a3b1b1c6bafe6abf42d21de6841bfbe85bdaa2ca76f60aa3fa3d7903e05025f0.jpg)

![image](images/part-004--7891f3f7a238ba0b2f659988a12781c80a4370aa30c2599c98f1d18ae9df4b01.jpg)

One of the most powerful properties of hidden Markov models is their ability to exhibit some degree of invariance to local warping (compression and stretching) of the time axis. To understand this, consider the way in which the digit $\cdot _ { 2 } ,$ is written in the on-line handwritten digits example. A typical digit comprises two distinct sections joined at a cusp. The first part of the digit, which starts at the top left, has a sweeping arc down to the cusp or loop at the bottom left, followed by a second moreor-less straight sweep ending at the bottom right. Natural variations in writing style will cause the relative sizes of the two sections to vary, and hence the location of the cusp or loop within the temporal sequence will vary. From a generative perspective such variations can be accommodated by the hidden Markov model through changes in the number of transitions to the same state versus the number of transitions to the successive state. Note, however, that if a digit $\cdot _ { 2 } ,$ is written in the reverse order, that is, starting at the bottom right and ending at the top left, then even though the pen tip coordinates may be identical to an example from the training set, the probability of the observations under the model will be extremely small. In the speech recognition context, warping of the time axis is associated with natural variations in the speed of speech, and again the hidden Markov model can accommodate such a distortion and not penalize it too heavily.
