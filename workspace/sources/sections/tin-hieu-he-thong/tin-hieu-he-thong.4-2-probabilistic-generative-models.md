---
id: "tin-hieu-he-thong.4-2-probabilistic-generative-models"
doc_id: "tin-hieu-he-thong"
title: "4.2. Probabilistic Generative Models"
level: 2
heading_path: ["4 Linear Models for Classification", "4.2. Probabilistic Generative Models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.frank-rosenblatt-1928-1969"
next_id: "tin-hieu-he-thong.4-2-1-continuous-inputs"
block_ids: ["b2245", "b2246", "b2247", "b2248", "b2249", "b2250", "b2251", "b2252", "b2253", "b2254", "b2255", "b2256", "b2257", "b2258", "b2259", "b2260", "b2261", "b2262", "b2263", "b2264", "b2265", "b2266", "b2267"]
---

## 4.2. Probabilistic Generative Models

We turn next to a probabilistic view of classification and show how models with linear decision boundaries arise from simple assumptions about the distribution of the data. In Section 1.5.4, we discussed the distinction between the discriminative and the generative approaches to classification. Here we shall adopt a generative

Plot of the logistic sigmoid function $\sigma ( a )$ defined by (4.59), shown in red, together with the scaled probit function $\Phi ( \lambda a )$ , for $\lambda ^ { 2 } \ = \ \dot { \pi } / 8 ,$ shown in dashed blue, where Φ(a) is defined by (4.114). The scaling factor $\pi / 8$ is chosen so that the derivatives of the two curves are equal for $a = 0$

![image](images/part-002--e877216828c5dcffa36eaa70386bab742b5ef09ebd77ebc29e940af07feb787d.jpg)

approach in which we model the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ , as well as the class priors $p ( \mathcal { C } _ { k } )$ , and then use these to compute posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ through Bayes’ theorem.

Consider first of all the case of two classes. The posterior probability for class $\mathcal { C } _ { 1 }$ can be written as

\begin{array}{r c l} p (\mathcal {C} _ {1} | \mathbf {x}) & = & \frac {p (\mathbf {x} | \mathcal {C} _ {1}) p (\mathcal {C} _ {1})}{p (\mathbf {x} | \mathcal {C} _ {1}) p (\mathcal {C} _ {1}) + p (\mathbf {x} | \mathcal {C} _ {2}) p (\mathcal {C} _ {2})} \\ & = & \frac {1}{1 + \exp (- a)} = \sigma (a) \end{array}\tag{4.57}

where we have defined

a = \ln {\frac {p (\mathbf {x} | \mathcal {C} _ {1}) p (\mathcal {C} _ {1})}{p (\mathbf {x} | \mathcal {C} _ {2}) p (\mathcal {C} _ {2})}}\tag{4.58}

and $\sigma ( a )$ is the logistic sigmoid function defined by

\sigma (a) = \frac {1}{1 + \exp (- a)}\tag{4.59}

which is plotted in Figure 4.9. The term ‘sigmoid’ means S-shaped. This type of function is sometimes also called a ‘squashing function’ because it maps the whole real axis into a finite interval. The logistic sigmoid has been encountered already in earlier chapters and plays an important role in many classification algorithms. It satisfies the following symmetry property

\sigma (- a) = 1 - \sigma (a)\tag{4.60}

as is easily verified. The inverse of the logistic sigmoid is given by

a = \ln \left(\frac {\sigma}{1 - \sigma}\right)\tag{4.61}

and is known as the logit function. It represents the log of the ratio of probabilities ln $[ p ( \mathcal { C } _ { 1 } | \mathbf { x } ) / p ( \mathcal { C } _ { 2 } | \mathbf { x } ) ]$ for the two classes, also known as the log odds.

Note that in (4.57) we have simply rewritten the posterior probabilities in an equivalent form, and so the appearance of the logistic sigmoid may seem rather vacuous. However, it will have significance provided $a ( \mathbf { x } )$ takes a simple functional form. We shall shortly consider situations in which $a ( \mathbf { x } )$ is a linear function of $\mathbf { x } ,$ in which case the posterior probability is governed by a generalized linear model.

For the case of $K > 2$ classes, we have

\begin{array}{r c l} p (\mathcal {C} _ {k} | \mathbf {x}) & = & \frac {p (\mathbf {x} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k})}{\sum_ {j} p (\mathbf {x} | \mathcal {C} _ {j}) p (\mathcal {C} _ {j})} \\ & = & \frac {\exp (a _ {k})}{\sum_ {j} \exp (a _ {j})} \end{array}\tag{4.62}

which is known as the normalized exponential and can be regarded as a multiclass generalization of the logistic sigmoid. Here the quantities $a _ { k }$ are defined by

a _ {k} = \ln p (\mathbf {x} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k}).\tag{4.63}

The normalized exponential is also known as the softmax function, as it represents a smoothed version of the ‘max’ function because, if $a _ { k } \gg a _ { j }$ for all $j \neq k$ , then $p ( \mathcal { C } _ { k } | \mathbf { x } ) \simeq 1$ , and $p ( \mathcal { C } _ { j } | \mathbf { x } ) \simeq 0$

We now investigate the consequences of choosing specific forms for the classconditional densities, looking first at continuous input variables x and then discussing briefly the case of discrete inputs.
