---
id: "tin-hieu-he-thong.10-5-local-variational-methods"
doc_id: "tin-hieu-he-thong"
title: "10.5. Local Variational Methods"
level: 2
heading_path: ["Approximate Inference", "10.5. Local Variational Methods"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-4-1-variational-message-passing"
next_id: "tin-hieu-he-thong.10-6-variational-logistic-regression"
block_ids: ["b5409", "b5410", "b5411", "b5412", "b5413", "b5414", "b5415", "b5416", "b5417", "b5418", "b5419", "b5420", "b5421", "b5422", "b5423", "b5424", "b5425", "b5426", "b5427", "b5428", "b5429", "b5430", "b5431", "b5432", "b5433", "b5434", "b5435", "b5436", "b5437", "b5438", "b5439", "b5440", "b5441", "b5442", "b5443", "b5444", "b5445", "b5446", "b5447", "b5448", "b5449", "b5450", "b5451", "b5452", "b5453", "b5454", "b5455", "b5456", "b5457", "b5458", "b5459", "b5460", "b5461", "b5462", "b5463", "b5464", "b5465", "b5466", "b5467", "b5468", "b5469", "b5470", "b5471", "b5472"]
---

## 10.5. Local Variational Methods

The variational framework discussed in Sections 10.1 and 10.2 can be considered a ‘global’ method in the sense that it directly seeks an approximation to the full posterior distribution over all random variables. An alternative ‘local’ approach involves finding bounds on functions over individual variables or groups of variables within a model. For instance, we might seek a bound on a conditional distribution $p ( y | x )$ which is itself just one factor in a much larger probabilistic model specified by a directed graph. The purpose of introducing the bound of course is to simplify the resulting distribution. This local approximation can be applied to multiple variables in turn until a tractable approximation is obtained, and in Section 10.6.1 we shall give a practical example of this approach in the context of logistic regression. Here we focus on developing the bounds themselves.

We have already seen in our discussion of the Kullback-Leibler divergence that the convexity of the logarithm function played a key role in developing the lower bound in the global variational approach. We have defined a (strictly) convex function as one for which every chord lies above the function. Convexity also plays a central role in the local variational framework. Note that our discussion will apply equally to concave functions with ‘min’ and ‘max’ interchanged and with lower bounds replaced by upper bounds.

Let us begin by considering a simple example, namely the function $f ( x ) =$ $\exp ( - x )$ , which is a convex function of x, and which is shown in the left-hand plot of Figure 10.10. Our goal is to approximate $f ( x )$ by a simpler function, in particular a linear function of $x .$ . From Figure 10.10, we see that this linear function will be a lower bound on $f ( x )$ if it corresponds to a tangent. We can obtain the tangent line $y ( x )$ at a specific value of x, say $x = \xi$ , by making a first order Taylor expansion

y (x) = f (\xi) + f ^ {\prime} (\xi) (x - \xi)\tag{10.125}

so that $y ( x ) \leqslant f ( x )$ with equality when $x = \xi$ . For our example function $f ( x ) =$

Figure 10.10 In the left-hand figure the red curve shows the function $\exp ( - x )$ and the blue line shows the tangent at $x \ = \ \xi$ defined by (10.125) with $\xi = 1$ . This line has slope $\overset { \cdot } { \lambda } = f ^ { \prime } ( \overset { \cdot } { \xi } ) = - \exp ( - \overset { \cdot } { \xi } )$ . Note that any other tangent line, for example the ones shown in green, will have a smaller value of $y$ at $x =$ $\xi .$ The right-hand figure shows the corresponding plot of the function $\lambda \xi - g ( \lambda )$ , where $g ( \lambda )$ is given by $_ { ( 1 0 . 1 3 1 ) }$ versus λ for $\xi ~ = ~ 1$ , in which the maximum corresponds to $\lambda = - \exp ( - \xi ) = - 1 / e$

![image](images/part-003--63e1e12514de1d28c720e8a02b7c8ecd571fb219b246bcbec34c83f0f59b7774.jpg)

![image](images/part-003--eafae9c5212bdd8f83a16e9d8202000be8607ed78cfafa4d163f36a469d84d79.jpg)

![image](images/part-003--6c1cb78274e9abe116fe98cb2ecd3d6305933acc2a3fc160f4083d085a30603f.jpg)

Figure 10.11 In the left-hand plot the red curve shows a convex function $f ( x )$ , and the blue line represents the linear function $\lambda x ,$ which is a lower bound on $f ( x )$ because $f ( x ) > \lambda x$ for all x. For the given value of slope λ the contact point of the tangent line having the same slope is found by minimizing with respect to x the discrepancy (shown by the green dashed lines) given by $f ( x ) - \lambda x$ . This defines the dual function $g ( \lambda )$ , which corresponds to the (negative of the) intercept of the tangent line having slope λ.

$\exp ( - x )$ , we therefore obtain the tangent line in the form

y (x) = \exp (- \xi) - \exp (- \xi) (x - \xi)\tag{10.126}

which is a linear function parameterized by $\xi .$ For consistency with subsequent discussion, let us define $\lambda = - \exp ( - \xi )$ so that

y (x, \lambda) = \lambda x - \lambda + \lambda \ln (- \lambda).\tag{10.127}

Different values of λ correspond to different tangent lines, and because all such lines are lower bounds on the function, we have $f ( x ) \geqslant y ( x , \lambda )$ . Thus we can write the function in the form

f (x) = \max _ {\lambda} \left\{\lambda x - \lambda + \lambda \ln (- \lambda) \right\}.\tag{10.128}

We have succeeded in approximating the convex function $f ( x )$ by a simpler, linear function $y ( x , \lambda )$ . The price we have paid is that we have introduced a variational parameter λ, and to obtain the tightest bound we must optimize with respect to λ.

We can formulate this approach more generally using the framework of convex duality (Rockafellar, 1972; Jordan et al., 1999). Consider the illustration of a convex function $f ( x )$ shown in the left-hand plot in Figure 10.11. In this example, the function λx is a lower bound on $f ( x )$ but it is not the best lower bound that can be achieved by a linear function having slope λ, because the tightest bound is given by the tangent line. Let us write the equation of the tangent line, having slope λ as $\lambda x - g ( \lambda )$ where the (negative) intercept $g ( \lambda )$ clearly depends on the slope λ of the tangent. To determine the intercept, we note that the line must be moved vertically by an amount equal to the smallest vertical distance between the line and the function, as shown in Figure 10.11. Thus

\begin{array}{r c l} g (\lambda) & = & - \min _ {x} \left\{f (x) - \lambda x \right\} \\ & = & \max _ {x} \left\{\lambda x - f (x) \right\}. \end{array}\tag{10.129}

Now, instead of fixing λ and varying x, we can consider a particular x and then adjust λ until the tangent plane is tangent at that particular x. Because the y value of the tangent line at a particular x is maximized when that value coincides with its contact point, we have

f (x) = \max _ {\lambda} \left\{\lambda x - g (\lambda) \right\}.\tag{10.130}

We see that the functions $f ( x )$ and $g ( \lambda )$ play a dual role, and are related through (10.129) and (10.130).

Let us apply these duality relations to our simple example $f ( x ) = \exp ( - x )$ From (10.129) we see that the maximizing value of x is given by $\xi = - \ln ( - \lambda )$ , and back-substituting we obtain the conjugate function $g ( \lambda )$ in the form

g (\lambda) = \lambda - \lambda \ln (- \lambda)\tag{10.131}

as obtained previously. The function $\lambda \xi - g ( \lambda )$ is shown, for $\xi = 1$ in the right-hand plot in Figure 10.10. As a check, we can substitute (10.131) into (10.130), which gives the maximizing value of $\lambda = - \exp ( - x )$ , and back-substituting then recovers the original function $f ( x ) = \exp ( - x )$

For concave functions, we can follow a similar argument to obtain upper bounds, in which max’ is replaced with ‘min’, so that

f (x) = \min _ {\lambda} \{\lambda x - g (\lambda) \}\tag{10.132}

g (\lambda) = \min _ {x} \left\{\lambda x - f (x) \right\}.\tag{10.133}

If the function of interest is not convex (or concave), then we cannot directly apply the method above to obtain a bound. However, we can first seek invertible transformations either of the function or of its argument which change it into a convex form. We then calculate the conjugate function and then transform back to the original variables.

An important example, which arises frequently in pattern recognition, is the logistic sigmoid function defined by

\sigma (x) = \frac {1}{1 + e ^ {- x}}.\tag{10.134}

As it stands this function is neither convex nor concave. However, if we take the logarithm we obtain a function which is concave, as is easily verified by finding the second derivative. From (10.133) the corresponding conjugate function then takes the form

g (\lambda) = \min _ {x} \left\{\lambda x - f (x) \right\} = - \lambda \ln \lambda - (1 - \lambda) \ln (1 - \lambda)\tag{10.135}

which we recognize as the binary entropy function for a variable whose probability of having the value 1 is λ. Using (10.132), we then obtain an upper bound on the log sigmoid

\ln \sigma (x) \leqslant \lambda x - g (\lambda)\tag{10.136}

![image](images/part-003--416ac1db4eff31ce3d429966080b12a7d4d20673717341f2d09826f58196cc61.jpg)

![image](images/part-003--78cbdd76dd23597d2b41659982d8a2cf636b1a23d382d192f8a74505a0e5a225.jpg)

Figure 10.12 The left-hand plot shows the logistic sigmoid function $\sigma ( x )$ defined by (10.134) in red, together with two examples of the exponential upper bound (10.137) shown in blue. The right-hand plot shows the logistic sigmoid again in red together with the Gaussian lower bound (10.144) shown in blue. Here the parameter $\xi = 2 . 5$ , and the bound is exact at $x = \xi$ and $x = - \xi$ , denoted by the dashed green lines.

and taking the exponential, we obtain an upper bound on the logistic sigmoid itself of the form

\sigma (x) \leqslant \exp (\lambda x - g (\lambda))\tag{10.137}

which is plotted for two values of λ on the left-hand plot in Figure 10.12.

We can also obtain a lower bound on the sigmoid having the functional form of a Gaussian. To do this, we follow Jaakkola and Jordan (2000) and make transformations both of the input variable and of the function itself. First we take the log of the logistic function and then decompose it so that

\begin{array}{r c l} \ln \sigma (x) & = & - \ln (1 + e ^ {- x}) = - \ln \left\{e ^ {- x / 2} (e ^ {x / 2} + e ^ {- x / 2}) \right\} \\ & = & x / 2 - \ln (e ^ {x / 2} + e ^ {- x / 2}). \end{array}\tag{10.138}

We now note that the function $f ( x ) = - \ln ( e ^ { x / 2 } + e ^ { - x / 2 } )$ is a convex function of the variable $x ^ { 2 }$ , as can again be verified by finding the second derivative. This leads to a lower bound on $f ( x )$ , which is a linear function of $x ^ { 2 }$ whose conjugate function is given by

g (\lambda) = \max _ {x ^ {2}} \left\{\lambda x ^ {2} - f \left(\sqrt {x ^ {2}}\right) \right\}.\tag{10.139}

The stationarity condition leads to

0 = \lambda - \frac {d x}{d x ^ {2}} \frac {d}{d x} f (x) = \lambda + \frac {1}{4 x} \tanh \left(\frac {x}{2}\right).\tag{10.140}

If we denote this value of $x ,$ corresponding to the contact point of the tangent line for this particular value of λ, by $\xi ,$ , then we have

\lambda (\xi) = - \frac {1}{4 \xi} \tanh \left(\frac {\xi}{2}\right) = - \frac {1}{2 \xi} \left[ \sigma (\xi) - \frac {1}{2} \right].\tag{10.141}

Instead of thinking of $\lambda$ as the variational parameter, we can let $\xi$ play this role as this leads to simpler expressions for the conjugate function, which is then given by

g (\lambda) = \lambda (\xi) \xi^ {2} - f (\xi) = \lambda (\xi) \xi^ {2} + \ln (e ^ {\xi / 2} + e ^ {- \xi / 2}).\tag{10.142}

Hence the bound on $f ( x )$ can be written as

f (x) \geqslant \lambda x ^ {2} - g (\lambda) = \lambda x ^ {2} - \lambda \xi^ {2} - \ln (e ^ {\xi / 2} + e ^ {- \xi / 2}).\tag{10.143}

The bound on the sigmoid then becomes

\sigma (x) \geqslant \sigma (\xi) \exp \left\{(x - \xi) / 2 - \lambda (\xi) (x ^ {2} - \xi^ {2}) \right\}\tag{10.144}

where $\lambda ( \xi )$ is defined by (10.141). This bound is illustrated in the right-hand plot of Figure 10.12. We see that the bound has the form of the exponential of a quadratic function of $x ,$ which will prove useful when we seek Gaussian representations of posterior distributions defined through logistic sigmoid functions.

The logistic sigmoid arises frequently in probabilistic models over binary variables because it is the function that transforms a log odds ratio into a posterior probability. The corresponding transformation for a multiclass distribution is given by the softmax function. Unfortunately, the lower bound derived here for the logistic sigmoid does not directly extend to the softmax. Gibbs (1997) proposes a method for constructing a Gaussian distribution that is conjectured to be a bound (although no rigorous proof is given), which may be used to apply local variational methods to multiclass problems.

We shall see an example of the use of local variational bounds in Sections 10.6.1. For the moment, however, it is instructive to consider in general terms how these bounds can be used. Suppose we wish to evaluate an integral of the form

I = \int \sigma (a) p (a) \mathrm{d} a\tag{10.145}

where $\sigma ( a )$ is the logistic sigmoid, and $p ( a )$ is a Gaussian probability density. Such integrals arise in Bayesian models when, for instance, we wish to evaluate the predictive distribution, in which case $p ( a )$ represents a posterior parameter distribution. Because the integral is intractable, we employ the variational bound (10.144), which we write in the form $\sigma ( a ) \geqslant f ( a , \xi )$ where $\xi$ is a variational parameter. The integral now becomes the product of two exponential-quadratic functions and so can be integrated analytically to give a bound on I

I \geqslant \int f (a, \xi) p (a) \mathrm{d} a = F (\xi).\tag{10.146}

We now have the freedom to choose the variational parameter $\xi ,$ , which we do by finding the value $\xi ^ { \star }$ that maximizes the function $F ( \xi )$ . The resulting value $F ( \xi ^ { \star } )$ represents the tightest bound within this family of bounds and can be used as an approximation to I. This optimized bound, however, will in general not be exact.

Although the bound $\sigma ( a ) \geqslant f ( a , \xi )$ on the logistic sigmoid can be optimized exactly, the required choice for $\xi$ depends on the value of a, so that the bound is exact for one value of a only. Because the quantity $F ( \xi )$ is obtained by integrating over all values of $a ,$ the value of $\xi ^ { \star }$ represents a compromise, weighted by the distribution $p ( a )$
