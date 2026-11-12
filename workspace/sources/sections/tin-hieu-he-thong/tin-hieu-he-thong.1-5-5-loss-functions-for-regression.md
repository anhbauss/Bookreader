---
id: "tin-hieu-he-thong.1-5-5-loss-functions-for-regression"
doc_id: "tin-hieu-he-thong"
title: "1.5.5 Loss functions for regression"
level: 2
heading_path: ["Introduction", "1.5.5 Loss functions for regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-5-4-inference-and-decision"
next_id: "tin-hieu-he-thong.1-6-information-theory"
block_ids: ["b499", "b500", "b501", "b502", "b503", "b504", "b505", "b506", "b507", "b508", "b509", "b510", "b511", "b512", "b513", "b514", "b515", "b516", "b517", "b518", "b519", "b520", "b521", "b522", "b523", "b524", "b525"]
---

## 1.5.5 Loss functions for regression

So far, we have discussed decision theory in the context of classification problems. We now turn to the case of regression problems, such as the curve fitting example discussed earlier. The decision stage consists of choosing a specific estimate $y ( \mathbf x )$ of the value of t for each input x. Suppose that in doing so, we incur a loss $L ( t , y ( \mathbf x ) )$ ). The average, or expected, loss is then given by

\mathbb {E} [ L ] = \iint L (t, y (\mathbf {x})) p (\mathbf {x}, t) \mathrm{d} \mathbf {x} \mathrm{d} t.\tag{1.86}

A common choice of loss function in regression problems is the squared loss given by $L ( t , y ( \mathbf { x } ) ) = \{ y ( \mathbf { x } ) - t \} ^ { 2 }$ . In this case, the expected loss can be written

\mathbb {E} [ L ] = \iint \left\{y (\mathbf {x}) - t \right\} ^ {2} p (\mathbf {x}, t) \mathrm{d} \mathbf {x} \mathrm{d} t.\tag{1.87}

Our goal is to choose $y ( \mathbf x )$ so as to minimize $\mathbb { E } [ L ]$ . If we assume a completely flexible function $y ( \mathbf x )$ , we can do this formally using the calculus of variations to give

\frac {\delta \mathbb {E} [ L ]}{\delta y (\mathbf {x})} = 2 \int \{y (\mathbf {x}) - t \} p (\mathbf {x}, t) d t = 0.\tag{1.88}

Solving for $y ( \mathbf x )$ , and using the sum and product rules of probability, we obtain

y (\mathbf {x}) = \frac {\int t p (\mathbf {x} , t) \mathrm{d} t}{p (\mathbf {x})} = \int t p (t | \mathbf {x}) \mathrm{d} t = \mathbb {E} _ {t} [ t | \mathbf {x} ]\tag{1.89}

Figure 1.28

The regression function $y ( x )$ which minimizes the expected squared loss, is given by the mean of the conditional distribution $p ( t | x )$

![image](images/part-001--6e74fe98d6a23cabcbcc54dc8f0ace098d0592d3dae53e4dcabee4ad0b89579f.jpg)

Exercise 1.25

which is the conditional average of t conditioned on x and is known as the regression function. This result is illustrated in Figure 1.28. It can readily be extended to multiple target variables represented by the vector t, in which case the optimal solution is the conditional average $\mathbf { y } ( \mathbf { x } ) = \mathbb { E } _ { t } [ \mathbf { t } | \mathbf { x } ]$

We can also derive this result in a slightly different way, which will also shed light on the nature of the regression problem. Armed with the knowledge that the optimal solution is the conditional expectation, we can expand the square term as follows

\begin{array}{r l} & {\left\{y (\mathbf {x}) - t \right\} ^ {2} = \left\{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] + \mathbb {E} [ t | \mathbf {x} ] - t \right\} ^ {2}} \\ & {= \left\{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] \right\} ^ {2} + 2 \{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] \} \{\mathbb {E} [ t | \mathbf {x} ] - t \} + \left\{\mathbb {E} [ t | \mathbf {x} ] - t \right\} ^ {2}} \end{array}

where, to keep the notation uncluttered, we use $\mathbb { E } [ t | { \bf x } ]$ to denote $\mathbb { E } _ { t } [ t | \mathbf { x } ]$ . Substituting into the loss function and performing the integral over $t ,$ we see that the cross-term vanishes and we obtain an expression for the loss function in the form

\mathbb {E} [ L ] = \int \left\{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] \right\} ^ {2} p (\mathbf {x}) \mathrm{d} \mathbf {x} + \int \left\{\mathbb {E} [ t | \mathbf {x} ] - t \right\} ^ {2} p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{1.90}

The function $y ( \mathbf x )$ we seek to determine enters only in the first term, which will be minimized when $y ( \mathbf x )$ is equal to $\mathbb { E } [ t | { \bf x } ]$ , in which case this term will vanish. This is simply the result that we derived previously and that shows that the optimal least squares predictor is given by the conditional mean. The second term is the variance of the distribution of $t ,$ averaged over x. It represents the intrinsic variability of the target data and can be regarded as noise. Because it is independent of $y ( \mathbf x )$ , it represents the irreducible minimum value of the loss function.

As with the classification problem, we can either determine the appropriate probabilities and then use these to make optimal decisions, or we can build models that make decisions directly. Indeed, we can identify three distinct approaches to solving regression problems given, in order of decreasing complexity, by:

(a) First solve the inference problem of determining the joint density $\boldsymbol { p } ( \mathbf { x } , t )$ . Then normalize to find the conditional density $p ( t | \mathbf { x } )$ , and finally marginalize to find the conditional mean given by (1.89).

(b) First solve the inference problem of determining the conditional density $p ( t | \mathbf { x } )$ and then subsequently marginalize to find the conditional mean given by (1.89).

(c) Find a regression function $y ( \mathbf x )$ directly from the training data.

The relative merits of these three approaches follow the same lines as for classification problems above.

The squared loss is not the only possible choice of loss function for regression. Indeed, there are situations in which squared loss can lead to very poor results and where we need to develop more sophisticated approaches. An important example concerns situations in which the conditional distribution $p ( t | \mathbf { x } )$ is multimodal, as often arises in the solution of inverse problems. Here we consider briefly one simple generalization of the squared loss, called the Minkowski loss, whose expectation is given by

\mathbb {E} [ L _ {q} ] = \iint | y (\mathbf {x}) - t | ^ {q} p (\mathbf {x}, t) \mathrm{d} \mathbf {x} \mathrm{d} t\tag{1.91}

which reduces to the expected squared loss for $q \ = \ 2 .$ . The function $\lvert y - t \rvert ^ { q }$ is plotted against $y - t$ for various values of $q$ in Figure 1.29. The minimum of E $[ L _ { q } ]$ is given by the conditional mean for $q = 2$ , the conditional median for $q = 1$ , and the conditional mode for $q \to 0$
