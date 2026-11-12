---
id: "tin-hieu-he-thong.ludwig-boltzmann-1844-1906"
doc_id: "tin-hieu-he-thong"
title: "Ludwig Boltzmann 1844\u20131906"
level: 2
heading_path: ["Introduction", "Ludwig Boltzmann 1844\u20131906"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-6-information-theory"
next_id: "tin-hieu-he-thong.1-6-1-relative-entropy-and-mutual-information"
block_ids: ["b579", "b580", "b581", "b582", "b583", "b584", "b585", "b586", "b587", "b588", "b589", "b590", "b591", "b592", "b593", "b594", "b595", "b596", "b597", "b598", "b599", "b600", "b601"]
---

## Ludwig Boltzmann 1844–1906

Ludwig Eduard Boltzmann was an Austrian physicist who created the field of statistical mechanics. Prior to Boltzmann, the concept of entropy was already known from classical thermodynamics where it

quantifies the fact that when we take energy from a system, not all of that energy is typically available to do useful work. Boltzmann showed that the thermodynamic entropy S, a macroscopic quantity, could be related to the statistical properties at the microscopic level. This is expressed through the famous equation $\textit { S } = \textit { k }$ ln W in which W represents the number of possible microstates in a macrostate, and $k \simeq 1 . 3 8 \stackrel { \cdot } { \times } 1 0 ^ { - 2 3 }$ (in units of Joules per Kelvin) is known as Boltzmann’s constant. Boltzmann’s ideas were disputed by many scientists of they day. One difficulty they saw arose from the second law of thermodynamics, which states that the entropy of a closed system tends to increase with time. By contrast, at the microscopic level the classical Newtonian equations of physics are reversible, and so they found it difficult to see how the latter could explain the former. They didn’t fully appreciate Boltzmann’s arguments, which were statistical in nature and which concluded not that entropy could never decrease over time but simply that with overwhelming probability it would generally increase. Boltzmann even had a longrunning dispute with the editor of the leading German physics journal who refused to let him refer to atoms and molecules as anything other than convenient theoretical constructs. The continued attacks on his work lead to bouts of depression, and eventually he committed suicide. Shortly after Boltzmann’s death, new experiments by Perrin on colloidal suspensions verified his theories and confirmed the value of the Boltzmann constant. The equation $S = k$ ln W is carved on Boltzmann’s tombstone.

three constraints

\int_ {- \infty} ^ {\infty} p (x) \mathrm{d} x = 1\tag{1.105}

\int_ {- \infty} ^ {\infty} x p (x) \mathrm{d} x = \mu\tag{1.106}

\int_ {- \infty} ^ {\infty} (x - \mu) ^ {2} p (x) \mathrm{d} x = \sigma^ {2}.\tag{1.107}

The constrained maximization can be performed using Lagrange multipliers so that we maximize the following functional with respect to $p ( x )$

\begin{array}{l} - \int_ {- \infty} ^ {\infty} p (x) \ln p (x) \mathrm{d} x + \lambda_ {1} \left(\int_ {- \infty} ^ {\infty} p (x) \mathrm{d} x - 1\right) \\ + \lambda_ {2} \left(\int_ {- \infty} ^ {\infty} x p (x) \mathrm{d} x - \mu\right) + \lambda_ {3} \left(\int_ {- \infty} ^ {\infty} (x - \mu) ^ {2} p (x) \mathrm{d} x - \sigma^ {2}\right). \end{array}

Using the calculus of variations, we set the derivative of this functional to zero giving

p (x) = \exp \left\{- 1 + \lambda_ {1} + \lambda_ {2} x + \lambda_ {3} (x - \mu) ^ {2} \right\}.\tag{1.108}

The Lagrange multipliers can be found by back substitution of this result into the three constraint equations, leading finally to the result

p (x) = \frac {1}{(2 \pi \sigma^ {2}) ^ {1 / 2}} \exp \left\{- \frac {(x - \mu) ^ {2}}{2 \sigma^ {2}} \right\}\tag{1.109}

and so the distribution that maximizes the differential entropy is the Gaussian. Note that we did not constrain the distribution to be nonnegative when we maximized the entropy. However, because the resulting distribution is indeed nonnegative, we see with hindsight that such a constraint is not necessary.

If we evaluate the differential entropy of the Gaussian, we obtain

\mathrm{H} [ x ] = \frac {1}{2} \left\{1 + \ln (2 \pi \sigma^ {2}) \right\}.\tag{1.110}

Thus we see again that the entropy increases as the distribution becomes broader, i.e., as $\sigma ^ { 2 }$ increases. This result also shows that the differential entropy, unlike the discrete entropy, can be negative, because $\operatorname { I } ( x ) < 0$ in (1.110) for $\sigma ^ { 2 } < 1 / ( 2 \pi e )$

Suppose we have a joint distribution $p ( \mathbf x , \mathbf y )$ from which we draw pairs of values of x and y. If a value of x is already known, then the additional information needed to specify the corresponding value of y is given by $- \ln p ( \mathbf { y } | \mathbf { x } )$ . Thus the average additional information needed to specify y can be written as

\mathrm{H} [ \mathbf {y} | \mathbf {x} ] = - \iint p (\mathbf {y}, \mathbf {x}) \ln p (\mathbf {y} | \mathbf {x}) \mathrm{d} \mathbf {y} \mathrm{d} \mathbf {x}\tag{1.111}

Exercise 1.37

which is called the conditional entropy of y given x. It is easily seen, using the product rule, that the conditional entropy satisfies the relation

\mathrm{H} [ \mathbf {x}, \mathbf {y} ] = \mathrm{H} [ \mathbf {y} | \mathbf {x} ] + \mathrm{H} [ \mathbf {x} ]\tag{1.112}

where $\mathrm { H } [ \mathbf { x } , \mathbf { y } ]$ is the differential entropy of $p ( \mathbf x , \mathbf y )$ and $\mathrm { H } [ \mathbf { x } ]$ is the differential entropy of the marginal distribution $p ( \mathbf { x } )$ . Thus the information needed to describe x and y is given by the sum of the information needed to describe x alone plus the additional information required to specify y given x.
