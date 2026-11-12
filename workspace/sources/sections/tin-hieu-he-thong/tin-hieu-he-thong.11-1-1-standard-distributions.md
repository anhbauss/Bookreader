---
id: "tin-hieu-he-thong.11-1-1-standard-distributions"
doc_id: "tin-hieu-he-thong"
title: "11.1.1 Standard distributions"
level: 2
heading_path: ["Sampling Methods", "11.1.1 Standard distributions"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-1-basic-sampling-algorithms"
next_id: "tin-hieu-he-thong.11-1-2-rejection-sampling"
block_ids: ["b5804", "b5805", "b5806", "b5807", "b5808", "b5809", "b5810", "b5811", "b5812", "b5813", "b5814", "b5815", "b5816", "b5817", "b5818", "b5819", "b5820", "b5821", "b5822", "b5823", "b5824", "b5825", "b5826", "b5827", "b5828", "b5829"]
---

## 11.1.1 Standard distributions

We first consider how to generate random numbers from simple nonuniform distributions, assuming that we already have available a source of uniformly distributed random numbers. Suppose that z is uniformly distributed over the interval $( 0 , 1 )$ and that we transform the values of z using some function $f ( \cdot )$ so that $y = f ( z )$ The distribution of $y$ will be governed by

p (y) = p (z) \left| \frac {d z}{d y} \right|\tag{11.5}

where, in this case, $p ( z ) = 1$ . Our goal is to choose the function $f ( z )$ such that the resulting values of $y$ have some specific desired distribution $p ( y )$ . Integrating (11.5) we obtain

z = h (y) \equiv \int_ {- \infty} ^ {y} p (\widehat {y}) \mathrm{d} \widehat {y}\tag{11.6}

which is the indefinite integral of $p ( y )$ . Thus, $y = h ^ { - 1 } ( z )$ , and so we have to transform the uniformly distributed random numbers using a function which is the inverse of the indefinite integral of the desired distribution. This is illustrated in Figure 11.2.

Consider for example the exponential distribution

p (y) = \lambda \exp (- \lambda y)\tag{11.7}

where $0 \leqslant y < \infty$ . In this case the lower limit of the integral in (11.6) is 0, and so $h ( y ) = 1 - \exp ( - \lambda y )$ . Thus, if we transform our uniformly distributed variable $z$ using $y = - \lambda ^ { - 1 } \ln ( 1 - z )$ , then $y$ will have an exponential distribution.

Figure 11.2 Geometrical interpretation of the transformation method for generating nonuniformly distributed random numbers. $h ( y )$ is the indefinite integral of the desired distribution $p ( y )$ If a uniformly distributed random variable z is transformed using $y = h ^ { - 1 } ( z )$ , then y will be distributed according to $p ( y )$

![image](images/part-003--c59ac6ad7e0b8a93288b26effbf69cf1b2292eedc7fe0f1d08050469031bb4a9.jpg)

Another example of a distribution to which the transformation method can be applied is given by the Cauchy distribution

p (y) = \frac {1}{\pi} \frac {1}{1 + y ^ {2}}.\tag{11.8}

In this case, the inverse of the indefinite integral can be expressed in terms of the ‘tan’ function.

The generalization to multiple variables is straightforward and involves the Jacobian of the change of variables, so that

p (y _ {1}, \dots , y _ {M}) = p (z _ {1}, \dots , z _ {M}) \left| \frac {\partial (z _ {1} , \dots , z _ {M})}{\partial (y _ {1} , \dots , y _ {M})} \right|.\tag{11.9}

As a final example of the transformation method we consider the Box-Muller method for generating samples from a Gaussian distribution. First, suppose we generate pairs of uniformly distributed random numbers $z _ { 1 } , z _ { 2 } \in ( - 1 , 1 )$ , which we can do by transforming a variable distributed uniformly over (0, 1) using $z  2 z - 1$ Next we discard each pair unless it satisfies $z _ { 1 } ^ { 2 } + \dot { z } _ { 2 } ^ { 2 } \leqslant 1$ This leads to a uniform distribution of points inside the unit circle with $p ( z _ { 1 } , z _ { 2 } ) = 1 / \pi$ , as illustrated in Figure 11.3. Then, for each pair $z _ { 1 } , z _ { 2 }$ we evaluate the quantities

Figure 11.3 The Box-Muller method for generating Gaussian distributed random numbers starts by generating samples from a uniform distribution inside the unit circle.

![image](images/part-003--cc71f140b5f19c6bf8666cabd597f5d60e2480257b5b8a87d232063560352012.jpg)

y _ {1} = z _ {1} \left(\frac {- 2 \ln z _ {1}}{r ^ {2}}\right) ^ {1 / 2}\tag{11.10}

{y _ {2}} = {z _ {2} \left(\frac {- 2 \ln z _ {2}}{r ^ {2}}\right) ^ {1 / 2}}\tag{11.11}

where $r ^ { 2 } = z _ { 1 } ^ { 2 } + z _ { 2 } ^ { 2 }$ . Then the joint distribution of $y _ { 1 }$ and $y _ { 2 }$ is given by

\begin{array}{r c l} p (y _ {1}, y _ {2}) & = & p (z _ {1}, z _ {2}) \left| \frac {\partial (z _ {1} , z _ {2})}{\partial (y _ {1} , y _ {2})} \right| \\ & = & \left[ \frac {1}{\sqrt {2 \pi}} \exp (- y _ {1} ^ {2} / 2) \right] \left[ \frac {1}{\sqrt {2 \pi}} \exp (- y _ {2} ^ {2} / 2) \right] \end{array}\tag{11.12}

and so $y _ { 1 }$ and $y _ { 2 }$ are independent and each has a Gaussian distribution with zero mean and unit variance.

If $y$ has a Gaussian distribution with zero mean and unit variance, then $\sigma y + \mu$ will have a Gaussian distribution with mean $\mu$ and variance $\sigma ^ { 2 }$ . To generate vectorvalued variables having a multivariate Gaussian distribution with mean $\pmb { \mu }$ and covariance Σ, we can make use of the Cholesky decomposition, which takes the form ${ \pmb \Sigma } = { \bf L L } ^ { \mathrm { T } }$ (Press et al., 1992). Then, if z is a vector valued random variable whose components are independent and Gaussian distributed with zero mean and unit variance, then $\mathbf { y } = \pmb { \mu } + \mathbf { L z }$ will have mean $\pmb { \mu }$ and covariance Σ.

Obviously, the transformation technique depends for its success on the ability to calculate and then invert the indefinite integral of the required distribution. Such operations will only be feasible for a limited number of simple distributions, and so we must turn to alternative approaches in search of a more general strategy. Here we consider two techniques called rejection sampling and importance sampling. Although mainly limited to univariate distributions and thus not directly applicable to complex problems in many dimensions, they do form important components in more general strategies.
