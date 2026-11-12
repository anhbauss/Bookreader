---
id: "tin-hieu-he-thong.13-3-2-learning-in-lds"
doc_id: "tin-hieu-he-thong"
title: "13.3.2 Learning in LDS"
level: 2
heading_path: ["Sequential Data", "13.3.2 Learning in LDS"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.13-3-1-inference-in-lds"
next_id: "tin-hieu-he-thong.13-3-3-extensions-of-lds"
block_ids: ["b6881", "b6882", "b6883", "b6884", "b6885", "b6886", "b6887", "b6888", "b6889", "b6890", "b6891", "b6892", "b6893", "b6894", "b6895", "b6896", "b6897", "b6898", "b6899", "b6900", "b6901", "b6902", "b6903", "b6904", "b6905", "b6906", "b6907", "b6908", "b6909", "b6910", "b6911", "b6912"]
---

## 13.3.2 Learning in LDS

So far, we have considered the inference problem for linear dynamical systems, assuming that the model parameters $\pmb \theta = \{ { \bf A } , \bar { \bf T } , { \bf C } , \Sigma , \mu _ { 0 } , { \bf V } _ { 0 } \}$ are known. Next, we consider the determination of these parameters using maximum likelihood (Ghahramani and Hinton, 1996b). Because the model has latent variables, this can be addressed using the EM algorithm, which was discussed in general terms in Chapter 9.

We can derive the EM algorithm for the linear dynamical system as follows. Let us denote the estimated parameter values at some particular cycle of the algorithm by $\pmb { \theta } ^ { \mathrm { o l d } }$ . For these parameter values, we can run the inference algorithm to determine the posterior distribution of the latent variables $p ( \mathbf { Z } | \mathbf { X } , \theta ^ { \mathrm { o l d } } )$ , or more precisely those local posterior marginals that are required in the M step. In particular, we shall require the following expectations

\mathbb {E} \left[ \mathbf {z} _ {n} \right] = \widehat {\pmb {\mu}} _ {n}\tag{13.105}

{\mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right]} = {\mathbf {J} _ {n - 1} \widehat {\mathbf {V}} _ {n} + \widehat {\pmb {\mu}} _ {n} \widehat {\pmb {\mu}} _ {n - 1} ^ {\mathrm{T}}}\tag{13.106}

{\mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} \right]} = {\widehat {\mathbf {V}} _ {n} + \widehat {\pmb {\mu}} _ {n} \widehat {\pmb {\mu}} _ {n} ^ {\mathrm{T}}}\tag{13.107}

where we have used (13.104).

Now we consider the complete-data log likelihood function, which is obtained by taking the logarithm of (13.6) and is therefore given by

\begin{array}{r c l} \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}) & = & \ln p (\mathbf {z} _ {1} | \boldsymbol {\mu} _ {0}, \mathbf {V} _ {0}) + \sum_ {n = 2} ^ {N} \ln p (\mathbf {z} _ {n} | \mathbf {z} _ {n - 1}, \mathbf {A}, \boldsymbol {\Gamma}) \\ & & + \sum_ {n = 1} ^ {N} \ln p (\mathbf {x} _ {n} | \mathbf {z} _ {n}, \mathbf {C}, \boldsymbol {\Sigma}) \end{array}\tag{13.108}

in which we have made the dependence on the parameters explicit. We now take the expectation of the complete-data log likelihood with respect to the posterior distri bution $p ( { \bf Z } | { \bf X } , \boldsymbol { \theta } ^ { \mathrm { o l d } } )$ which defines the function

Q (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\mathrm{old}}) = \mathbb {E} _ {\mathbf {Z} | \boldsymbol {\theta} ^ {\mathrm{old}}} \left[ \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\theta}) \right].\tag{13.109}

In the M step, this function is maximized with respect to the components of $\pmb { \theta } .$ .

Consider first the parameters $\pmb { \mu } _ { 0 }$ and $\mathbf { V } _ { 0 }$ . If we substitute for $p ( \mathbf { z } _ { 1 } | \boldsymbol { \mu } _ { 0 } , \mathbf { V } _ { 0 } )$ in (13.108) using (13.77), and then take the expectation with respect to $\mathbf { Z } ,$ , we obtain

Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = - \frac {1}{2} \ln | \mathbf {V} _ {0} | - \mathbb {E} _ {\mathbf {Z} | \pmb {\theta} ^ {\mathrm{old}}} \left[ \frac {1}{2} (\mathbf {z} _ {1} - \pmb {\mu} _ {0}) ^ {\mathrm{T}} \mathbf {V} _ {0} ^ {- 1} (\mathbf {z} _ {1} - \pmb {\mu} _ {0}) \right] + \mathrm{const}

Exercise 13.32

where all terms not dependent on $\pmb { \mu } _ { 0 }$ or $\mathbf { V } _ { 0 }$ have been absorbed into the additive constant. Maximization with respect to $\pmb { \mu } _ { 0 }$ and $\mathbf { V } _ { 0 }$ is easily performed by making use of the maximum likelihood solution for a Gaussian distribution discussed in Section 2.3.4, giving

{\pmb \mu_ {0} ^ {\mathrm{new}}} = {\mathbb {E} [ \mathbf {z} _ {1} ]}\tag{13.110}

{\bf V} _ {0} ^ {\mathrm{new}} = \mathbb {E} [ {\bf z} _ {1} {\bf z} _ {1} ^ {\mathrm{T}} ] - \mathbb {E} [ {\bf z} _ {1} ] \mathbb {E} [ {\bf z} _ {1} ^ {\mathrm{T}} ].\tag{13.111}

Similarly, to optimize A and Γ, we substitute for $p ( \mathbf { z } _ { n } | \mathbf { z } _ { n - 1 } , \mathbf { A } , \mathbf { T } )$ in (13.108) using (13.75) giving

\begin{array}{c} Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = - \frac {N - 1}{2} \ln | \pmb {\Gamma} | \\ - \mathbb {E} _ {\mathbf {Z} | \pmb {\theta} ^ {\mathrm{old}}} \left[ \frac {1}{2} \sum_ {n = 2} ^ {N} (\mathbf {z} _ {n} - \mathbf {A z} _ {n - 1}) ^ {\mathrm{T}} \pmb {\Gamma} ^ {- 1} (\mathbf {z} _ {n} - \mathbf {A z} _ {n - 1}) \right] + \mathrm{const} \end{array}\tag{13.112}

Exercise 13.33

in which the constant comprises terms that are independent of A and Γ. Maximizing with respect to these parameters then gives

\mathbf {A} ^ {\text {new}} = \left(\sum_ {n = 2} ^ {N} \mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right]\right) \left(\sum_ {n = 2} ^ {N} \mathbb {E} \left[ \mathbf {z} _ {n - 1} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right]\right) ^ {- 1}\tag{13.113}

\begin{array}{r l} \boldsymbol {\Gamma} ^ {\text {new}} & = \frac {1}{N - 1} \sum_ {n = 2} ^ {N} \left\{\mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} \right] - \mathbf {A} ^ {\text {new}} \mathbb {E} \left[ \mathbf {z} _ {n - 1} \mathbf {z} _ {n} ^ {\mathrm{T}} \right] \right. \\ & \left. - \mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right] \mathbf {A} ^ {\text {new}} + \mathbf {A} ^ {\text {new}} \mathbb {E} \left[ \mathbf {z} _ {n - 1} \mathbf {z} _ {n - 1} ^ {\mathrm{T}} \right] (\mathbf {A} ^ {\text {new}}) ^ {\mathrm{T}} \right\}. \end{array}\tag{13.114}

Note that $\mathbf { A } ^ { \mathrm { n e w } }$ must be evaluated first, and the result can then be used to determine $\mathbf { T } ^ { \mathrm { n e w } }$

Finally, in order to determine the new values of C and $\Sigma _ { : }$ , we substitute for $p ( \mathbf { x } _ { n } | \mathbf { z } _ { n } , \mathbf { C } , \pmb { \Sigma } )$ in (13.108) using (13.76) giving

\begin{array}{r c l} Q (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) & = & - \frac {N}{2} \ln | \pmb {\Sigma} | \\ & & - \mathbb {E} _ {\mathbf {Z} | \pmb {\theta} ^ {\mathrm{old}}} \left[ \frac {1}{2} \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \mathbf {C z} _ {n}) ^ {\mathrm{T}} \pmb {\Sigma} ^ {- 1} (\mathbf {x} _ {n} - \mathbf {C z} _ {n}) \right] + \mathrm{const.} \end{array}

Exercise 13.34

Maximizing with respect to C and Σ then gives

\mathbf {C} ^ {\mathrm{new}} = \left(\sum_ {n = 1} ^ {N} \mathbf {x} _ {n} \mathbb {E} \left[ \mathbf {z} _ {n} ^ {\mathrm{T}} \right]\right) \left(\sum_ {n = 1} ^ {N} \mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} \right]\right) ^ {- 1}\tag{13.115}

\begin{array}{r c l} \boldsymbol {\Sigma} ^ {\mathrm{new}} & = & \frac {1}{N} \sum_ {n = 1} ^ {N} \left\{\mathbf {x} _ {n} \mathbf {x} _ {n} ^ {\mathrm{T}} - \mathbf {C} ^ {\mathrm{new}} \mathbb {E} \left[ \mathbf {z} _ {n} \right] \mathbf {x} _ {n} ^ {\mathrm{T}} \right. \\ & & \left. - \mathbf {x} _ {n} \mathbb {E} \left[ \mathbf {z} _ {n} ^ {\mathrm{T}} \right] \mathbf {C} ^ {\mathrm{new}} + \mathbf {C} ^ {\mathrm{new}} \mathbb {E} \left[ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} \right] \mathbf {C} ^ {\mathrm{new}} \right\}. \end{array}\tag{13.116}

We have approached parameter learning in the linear dynamical system using maximum likelihood. Inclusion of priors to give a MAP estimate is straightforward, and a fully Bayesian treatment can be found by applying the analytical approximation techniques discussed in Chapter 10, though a detailed treatment is precluded here due to lack of space.
