---
id: "tin-hieu-he-thong.9-4-the-em-algorithm-in-general"
doc_id: "tin-hieu-he-thong"
title: "9.4. The EM Algorithm in General"
level: 2
heading_path: ["Mixture Models and EM", "9.4. The EM Algorithm in General"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-3-4-em-for-bayesian-linear-regression"
next_id: "tin-hieu-he-thong.exercises-10"
block_ids: ["b4958", "b4959", "b4960", "b4961", "b4962", "b4963", "b4964", "b4965", "b4966", "b4967", "b4968", "b4969", "b4970", "b4971", "b4972", "b4973", "b4974", "b4975", "b4976", "b4977", "b4978", "b4979", "b4980", "b4981", "b4982", "b4983", "b4984", "b4985", "b4986", "b4987", "b4988", "b4989", "b4990", "b4991", "b4992", "b4993", "b4994", "b4995", "b4996", "b4997", "b4998", "b4999", "b5000", "b5001", "b5002", "b5003", "b5004", "b5005", "b5006", "b5007"]
---

## 9.4. The EM Algorithm in General

The expectation maximization algorithm, or EM algorithm, is a general technique for finding maximum likelihood solutions for probabilistic models having latent variables (Dempster et al., 1977; McLachlan and Krishnan, 1997). Here we give a very general treatment of the EM algorithm and in the process provide a proof that the EM algorithm derived heuristically in Sections 9.2 and 9.3 for Gaussian mixtures does indeed maximize the likelihood function (Csiszar and Tusn` ady, 1984; Hath-` away, 1986; Neal and Hinton, 1999). Our discussion will also form the basis for the derivation of the variational inference framework.

Consider a probabilistic model in which we collectively denote all of the observed variables by X and all of the hidden variables by Z. The joint distribution $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ is governed by a set of parameters denoted $\pmb { \theta } .$ Our goal is to maximize the likelihood function that is given by

p (\mathbf {X} | \boldsymbol {\theta}) = \sum_ {\mathbf {Z}} p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}).\tag{9.69}

Here we are assuming Z is discrete, although the discussion is identical if Z comprises continuous variables or a combination of discrete and continuous variables, with summation replaced by integration as appropriate.

We shall suppose that direct optimization of $p ( \mathbf { X } | \pmb { \theta } )$ is difficult, but that opti mization of the complete-data likelihood function $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ is significantly easier. Next we introduce a distribution $q ( \mathbf { Z } )$ defined over the latent variables, and we observe that, for any choice of $q ( \mathbf { Z } )$ , the following decomposition holds

\ln p (\mathbf {X} | \boldsymbol {\theta}) = \mathcal {L} (q, \boldsymbol {\theta}) + \mathrm{KL} (q \| p)\tag{9.70}

where we have defined

\mathcal {L} (q, \pmb {\theta}) = \sum_ {\mathbf {Z}} q (\mathbf {Z}) \ln \left\{\frac {p (\mathbf {X} , \mathbf {Z} | \pmb {\theta})}{q (\mathbf {Z})} \right\}\tag{9.71}

\operatorname{KL} (q \| p) = - \sum_ {\mathbf {Z}} q (\mathbf {Z}) \ln \left\{\frac {p (\mathbf {Z} | \mathbf {X} , \boldsymbol {\theta})}{q (\mathbf {Z})} \right\}.\tag{9.72}

Note that $\mathcal { L } ( q , \theta )$ is a functional (see Appendix D for a discussion of functionals) of the distribution $q ( \mathbf { Z } )$ , and a function of the parameters $\pmb { \theta } .$ It is worth studying

Illustration of the decomposition given by (9.70), which holds for any choice of distribution $q ( \mathbf { Z } )$ Because the Kullback-Leibler divergence satisfies $\mathrm { K L } ( q \| p ) \geqslant 0$ , we see that the quantity $\dot { \mathcal { L } } ( \boldsymbol { q } , \boldsymbol { \theta } )$ is a lower bound on the log likelihood function ln $p ( \mathbf { X } | \pmb { \theta } )$

![image](images/part-003--4b9ba213faa93ea2674647d32850b7342d29a29e4006184f72a517147d0ced7c.jpg)

carefully the forms of the expressions (9.71) and (9.72), and in particular noting that they differ in sign and also that $\mathcal { L } ( q , \theta )$ contains the joint distribution of X and Z while KL $\left( q \| p \right)$ contains the conditional distribution of $\mathbf { Z }$ given $\mathbf { X }$ . To verify the decomposition (9.70), we first make use of the product rule of probability to give

\ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}) = \ln p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\theta}) + \ln p (\mathbf {X} | \boldsymbol {\theta})\tag{9.73}

which we then substitute into the expression for $\mathcal { L } ( q , \theta )$ . This gives rise to two terms, one of which cancels $\mathrm { K L } ( q \| p )$ while the other gives the required log likelihood ln $p ( \mathbf { X } | \pmb { \theta } )$ after noting that $q ( \mathbf { Z } )$ is a normalized distribution that sums to 1.

From (9.72), we see that $\mathrm { K L } ( q \| p )$ is the Kullback-Leibler divergence between $q ( \mathbf { Z } )$ and the posterior distribution $p ( \mathbf { Z } | \mathbf { X } , \pmb \theta )$ . Recall that the Kullback-Leibler divergence satisfies KL $( q \| p ) \geqslant 0$ , with equality if, and only if, $q ( \mathbf { Z } ) = p ( \mathbf { Z } | \mathbf { X } , \theta )$ . It therefore follows from $_ { ( 9 . 7 0 ) }$ that $\mathcal { L } ( q , \pmb { \theta } ) \leqslant \ln p ( \mathbf { X } | \pmb { \theta } )$ , in other words that $\mathcal { L } ( q , \theta )$ is a lower bound on ln $p ( \mathbf { X } | \pmb { \theta } )$ . The decomposition (9.70) is illustrated in Figure 9.11.

The EM algorithm is a two-stage iterative optimization technique for finding maximum likelihood solutions. We can use the decomposition (9.70) to define the EM algorithm and to demonstrate that it does indeed maximize the log likelihood. Suppose that the current value of the parameter vector is $\pmb { \theta } ^ { \mathrm { o l d } }$ . In the E step, the lower bound $\mathscr { L } ( q , \theta ^ { \mathrm { o l d } } )$ is maximized with respect to $q ( \mathbf { Z } )$ while holding $\pmb { \theta } ^ { \mathrm { o l d } }$ fixed. The solution to this maximization problem is easily seen by noting that the value of ln $p ( \mathbf { X } | \mathbf { \theta } ^ { \mathrm { o l d } } )$ does not depend on $q ( \mathbf { Z } )$ and so the largest value of $\mathcal { L } ( q , \theta ^ { \mathrm { o l d } } )$ will occur when the Kullback-Leibler divergence vanishes, in other words when $q ( \mathbf { Z } )$ is equal to the posterior distribution $p ( \mathbf { Z } | \mathbf { X } , \theta ^ { \mathrm { o l d } } )$ . In this case, the lower bound will equal the log likelihood, as illustrated in Figure 9.12.

In the subsequent M step, the distribution $q ( \mathbf { Z } )$ is held fixed and the lower bound $\mathcal { L } ( q , \theta )$ is maximized with respect to $\pmb \theta$ to give some new value $\pmb { \theta } ^ { \mathrm { n e w } }$ This will cause the lower bound $\mathcal { L }$ to increase (unless it is already at a maximum), which will necessarily cause the corresponding log likelihood function to increase. Because the distribution $q$ is determined using the old parameter values rather than the new values and is held fixed during the M step, it will not equal the new posterior distribution $p ( \mathbf { Z } | \mathbf { X } , \pmb { \theta } ^ { \mathrm { n e w } } )$ , and hence there will be a nonzero KL divergence. The increase in the log likelihood function is therefore greater than the increase in the lower bound, as

Illustration of the E step of the EM algorithm. The q distribution is set equal to the posterior distribution for the current parameter values $\pmb { \theta } ^ { \mathrm { o l d } }$ , causing the lower bound to move up to the same value as the log likelihood function, with the KL divergence vanishing.

![image](images/part-003--0ff5ad85db3d5f6230dd5d8895da132ef5f12042bf6983fbe70d63ef43ec58fd.jpg)

shown in Figure 9.13. If we substitute $q ( \mathbf { Z } ) = p ( \mathbf { Z } | \mathbf { X } , \theta ^ { \mathrm { o l d } } )$ into (9.71), we see that, after the E step, the lower bound takes the form

\begin{array}{r c l} \mathcal {L} (q, \boldsymbol {\theta}) & = & \sum_ {\mathbf {Z}} p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\theta} ^ {\text {old}}) \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}) - \sum_ {\mathbf {Z}} p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\theta} ^ {\text {old}}) \ln p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\theta} ^ {\text {old}}) \\ & = & \mathcal {Q} (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\text {old}}) + \text {const} \end{array} \tag {9.74}

where the constant is simply the negative entropy of the q distribution and is therefore independent of θ. Thus in the M step, the quantity that is being maximized is the expectation of the complete-data log likelihood, as we saw earlier in the case of mixtures of Gaussians. Note that the variable $\pmb \theta$ over which we are optimizing appears only inside the logarithm. If the joint distribution $p ( \mathbf { Z } , \mathbf { X } | \mathbf { \theta } )$ comprises a member of the exponential family, or a product of such members, then we see that the logarithm will cancel the exponential and lead to an M step that will be typically much simpler than the maximization of the corresponding incomplete-data log likelihood function $p ( \mathbf { X } | \pmb { \theta } )$

The operation of the EM algorithm can also be viewed in the space of parameters, as illustrated schematically in Figure 9.14. Here the red curve depicts the (in

Illustration of the M step of the EM algorithm. The distribution $q ( \mathbf { Z } )$ is held fixed and the lower bound $\mathcal { L } ( q , \theta )$ is maximized with respect to the parameter vector θ to give a revised value $\pmb { \theta } ^ { \mathrm { n e w } }$ . Because the KL divergence is nonnegative, this causes the log likelihood ln $p ( \mathbf { X } | \pmb { \theta } )$ to increase by at least as much as the lower bound does.

![image](images/part-003--f986fe00455b874bc288930332b443f5a431392205b8f2d9727f43a532696b39.jpg)

The EM algorithm involves alternately computing a lower bound on the log likelihood for the current parameter values and then maximizing this bound to obtain the new parameter values. See the text for a full discussion.

![image](images/part-003--6f1ff9cecd034c1862d063a23de82a295ebe344baf1414992e4465aaabc91fb1.jpg)

Exercise 9.25

complete data) log likelihood function whose value we wish to maximize. We start with some initial parameter value $\pmb { \theta } ^ { \mathrm { o l d } }$ , and in the first E step we evaluate the posterior distribution over latent variables, which gives rise to a lower bound ${ \mathcal { L } } ( \theta , { \bar { \theta } } ^ { \mathrm { ( o l d ) } } )$ ) whose value equals the log likelihood at $\pmb { \theta } ^ { \mathrm { ( o l d ) } }$ , as shown by the blue curve. Note that the bound makes a tangential contact with the log likelihood at $\pmb { \theta } ^ { \mathrm { ( o l d ) } }$ , so that both curves have the same gradient. This bound is a convex function having a unique maximum (for mixture components from the exponential family). In the M step, the bound is maximized giving the value $\theta ^ { \mathrm { ( n e w ) } }$ , which gives a larger value of log likelihood than $\pmb { \theta } ^ { \mathrm { ( o l d ) } }$ . The subsequent E step then constructs a bound that is tangential at $\theta ^ { \mathrm { ( n e w ) } }$ as shown by the green curve.

For the particular case of an independent, identically distributed data set, X will comprise N data points $\left\{ { \bf x } _ { n } \right\}$ while Z will comprise N corresponding latent variables $\left\{ { \bf z } _ { n } \right\}$ , where $n = 1 , \ldots , N$ . From the independence assumption, we have $\begin{array} { r } { p ( \mathbf { X } , \mathbf { Z } ) \ = \ \prod _ { n } p ( \mathbf { x } _ { n } , \mathbf { z } _ { n } ) } \end{array}$ and, by marginalizing over the $\left\{ { { \bf { z } } _ { n } } \right\}$ we have $p ( \mathbf { X } ) =$ $\prod _ { n } p ( \mathbf { x } _ { n } )$ . Using the sum and product rules, we see that the posterior probability that is evaluated in the E step takes the form

p (\mathbf {Z} | \mathbf {X}, \boldsymbol {\theta}) = \frac {p (\mathbf {X} , \mathbf {Z} | \boldsymbol {\theta})}{\sum_ {\mathbf {Z}} p (\mathbf {X} , \mathbf {Z} | \boldsymbol {\theta})} = \frac {\prod_ {n = 1} ^ {N} p (\mathbf {x} _ {n} , \mathbf {z} _ {n} | \boldsymbol {\theta})}{\sum_ {\mathbf {Z}} \prod_ {n = 1} ^ {N} p (\mathbf {x} _ {n} , \mathbf {z} _ {n} | \boldsymbol {\theta})} = \prod_ {n = 1} ^ {N} p (\mathbf {z} _ {n} | \mathbf {x} _ {n}, \boldsymbol {\theta})\tag{9.75}

and so the posterior distribution also factorizes with respect to n. In the case of the Gaussian mixture model this simply says that the responsibility that each of the mixture components takes for a particular data point ${ \bf x } _ { n }$ depends only on the value of ${ \bf x } _ { n }$ and on the parameters θ of the mixture components, not on the values of the other data points.

We have seen that both the E and the M steps of the EM algorithm are increasing the value of a well-defined bound on the log likelihood function and that the complete EM cycle will change the model parameters in such a way as to cause the log likelihood to increase (unless it is already at a maximum, in which case the parameters remain unchanged).

We can also use the EM algorithm to maximize the posterior distribution $p ( \pmb \theta | \mathbf X )$ for models in which we have introduced a prior $p ( \pmb \theta )$ over the parameters. To see this, we note that as a function of $\theta _ { ; }$ , we have $\bar { p ( { \pmb \theta } | { \bf X } ) } = \bar { p ( { \pmb \theta } , { \bf X } ) / p ( { \bf X } ) }$ and so

\ln p (\boldsymbol {\theta} | \mathbf {X}) = \ln p (\boldsymbol {\theta}, \mathbf {X}) - \ln p (\mathbf {X}).\tag{9.76}

Making use of the decomposition (9.70), we have

\begin{array}{r c l} \ln p (\boldsymbol {\theta} | \mathbf {X}) & = & \mathcal {L} (q, \boldsymbol {\theta}) + \mathrm{KL} (q \| p) + \ln p (\boldsymbol {\theta}) - \ln p (\mathbf {X}) \\ & \geqslant & \mathcal {L} (q, \boldsymbol {\theta}) + \ln p (\boldsymbol {\theta}) - \ln p (\mathbf {X}). \end{array}\tag{9.77}

where ln $p ( \mathbf { X } )$ is a constant. We can again optimize the right-hand side alternately with respect to $q$ and $\pmb { \theta } .$ The optimization with respect to $q$ gives rise to the same $\mathrm { E } \mathrm { - }$ step equations as for the standard EM algorithm, because $q$ only appears in $\mathcal { L } ( q , \theta )$ The M-step equations are modified through the introduction of the prior term ln $p ( \pmb \theta )$ which typically requires only a small modification to the standard maximum likelihood M-step equations.

The EM algorithm breaks down the potentially difficult problem of maximizing the likelihood function into two stages, the E step and the M step, each of which will often prove simpler to implement. Nevertheless, for complex models it may be the case that either the E step or the M step, or indeed both, remain intractable. This leads to two possible extensions of the EM algorithm, as follows.

The generalized EM, or GEM, algorithm addresses the problem of an intractable M step. Instead of aiming to maximize $\mathcal { L } ( q , \theta )$ with respect to $\theta ,$ it seeks instead to change the parameters in such a way as to increase its value. Again, because $\mathcal { L } ( q , \theta )$ is a lower bound on the log likelihood function, each complete EM cycle of the GEM algorithm is guaranteed to increase the value of the log likelihood (unless the parameters already correspond to a local maximum). One way to exploit the GEM approach would be to use one of the nonlinear optimization strategies, such as the conjugate gradients algorithm, during the M step. Another form of GEM algorithm, known as the expectation conditional maximization, or ECM, algorithm, involves making several constrained optimizations within each M step (Meng and Rubin, 1993). For instance, the parameters might be partitioned into groups, and the M step is broken down into multiple steps each of which involves optimizing one of the subset with the remainder held fixed.

We can similarly generalize the E step of the EM algorithm by performing a partial, rather than complete, optimization of $\mathcal { L } ( q , \theta )$ with respect to $q ( \mathbf { Z } )$ (Neal and Hinton, 1999). As we have seen, for any given value of $\pmb \theta$ there is a unique maximum of $\mathcal { L } ( q , \theta )$ with respect to $q ( \mathbf { Z } )$ that corresponds to the posterior distribution $q _ { \pmb { \theta } } ( \mathbf { Z } ) =$ $p ( \mathbf { Z } | \mathbf { X } , \pmb \theta )$ and that for this choice of $q ( \mathbf { Z } )$ the bound $\mathcal { L } ( q , \theta )$ is equal to the log likelihood function ln $p ( \mathbf { X } | \pmb { \theta } )$ . It follows that any algorithm that converges to the global maximum of $\mathcal { L } ( q , \theta )$ will find a value of $\pmb \theta$ that is also a global maximum of the log likelihood ln $p ( \mathbf { X } | \pmb { \theta } )$ . Provided $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ is a continuous function of θ then, by continuity, any local maximum of $\mathcal { L } ( q , \theta )$ will also be a local maximum of ln $p ( \mathbf { X } | \pmb { \theta } )$

Consider the case of N independent data points $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$ with corresponding latent variables $\mathbf { z } _ { 1 } , \ldots , \mathbf { z } _ { N }$ . The joint distribution $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ factorizes over the data points, and this structure can be exploited in an incremental form of EM in which at each EM cycle only one data point is processed at a time. In the E step, instead of recomputing the responsibilities for all of the data points, we just re-evaluate the responsibilities for one data point. It might appear that the subsequent M step would require computation involving the responsibilities for all of the data points. However, if the mixture components are members of the exponential family, then the responsibilities enter only through simple sufficient statistics, and these can be updated efficiently. Consider, for instance, the case of a Gaussian mixture, and suppose we perform an update for data point m in which the corresponding old and new values of the responsibilities are denoted $\gamma ^ { \mathrm { o l d } } ( z _ { m k } )$ and $\gamma ^ { \mathrm { n e w } } ( z _ { m k } )$ . In the M step, the required sufficient statistics can be updated incrementally. For instance, for the means the sufficient statistics are defined by (9.17) and (9.18) from which we obtain

Exercise 9.26

\pmb {\mu} _ {k} ^ {\mathrm{new}} = \pmb {\mu} _ {k} ^ {\mathrm{old}} + \left(\frac {\gamma^ {\mathrm{new}} (z _ {m k}) - \gamma^ {\mathrm{old}} (z _ {m k})}{N _ {k} ^ {\mathrm{new}}}\right) (\mathbf {x} _ {m} - \pmb {\mu} _ {k} ^ {\mathrm{old}})\tag{9.78}

together with

N _ {k} ^ {\mathrm{new}} = N _ {k} ^ {\mathrm{old}} + \gamma^ {\mathrm{new}} (z _ {m k}) - \gamma^ {\mathrm{old}} (z _ {m k}).\tag{9.79}

The corresponding results for the covariances and the mixing coefficients are analogous.

Thus both the E step and the M step take fixed time that is independent of the total number of data points. Because the parameters are revised after each data point, rather than waiting until after the whole data set is processed, this incremental version can converge faster than the batch version. Each E or M step in this incremental algorithm is increasing the value of $\mathcal { L } ( q , \theta )$ and, as we have shown above, if the algorithm converges to a local (or global) maximum of $\mathcal { L } ( q , \theta )$ , this will correspond to a local (or global) maximum of the log likelihood function ln $p ( \mathbf { X } | \pmb { \theta } )$
