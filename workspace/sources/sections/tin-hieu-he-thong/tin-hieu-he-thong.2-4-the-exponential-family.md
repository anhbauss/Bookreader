---
id: "tin-hieu-he-thong.2-4-the-exponential-family"
doc_id: "tin-hieu-he-thong"
title: "2.4. The Exponential Family"
level: 2
heading_path: ["Probability Distributions", "2.4. The Exponential Family"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.2-3-9-mixtures-of-gaussians"
next_id: "tin-hieu-he-thong.2-4-1-maximum-likelihood-and-sufficient-statistics"
block_ids: ["b1313", "b1314", "b1315", "b1316", "b1317", "b1318", "b1319", "b1320", "b1321", "b1322", "b1323", "b1324", "b1325", "b1326", "b1327", "b1328", "b1329", "b1330", "b1331", "b1332", "b1333", "b1334", "b1335", "b1336", "b1337", "b1338", "b1339", "b1340", "b1341", "b1342", "b1343", "b1344", "b1345", "b1346", "b1347", "b1348", "b1349", "b1350", "b1351", "b1352", "b1353", "b1354", "b1355", "b1356", "b1357", "b1358", "b1359", "b1360", "b1361", "b1362", "b1363", "b1364", "b1365", "b1366"]
---

## 2.4. The Exponential Family

The probability distributions that we have studied so far in this chapter (with the exception of the Gaussian mixture) are specific examples of a broad class of distributions called the exponential family (Duda and Hart, 1973; Bernardo and Smith, 1994). Members of the exponential family have many important properties in common, and it is illuminating to discuss these properties in some generality.

The exponential family of distributions over x, given parameters $\eta _ { \mathrm { : } }$ , is defined to be the set of distributions of the form

p (\mathbf {x} | \boldsymbol {\eta}) = h (\mathbf {x}) g (\boldsymbol {\eta}) \exp \left\{\boldsymbol {\eta} ^ {\mathrm{T}} \mathbf {u} (\mathbf {x}) \right\}\tag{2.194}

where x may be scalar or vector, and may be discrete or continuous. Here $\eta$ are called the natural parameters of the distribution, and $\mathbf { u } ( \mathbf { x } )$ is some function of x. The function $g ( \pmb { \eta } )$ can be interpreted as the coefficient that ensures that the distribution is normalized and therefore satisfies

g (\boldsymbol {\eta}) \int h (\mathbf {x}) \exp \left\{\boldsymbol {\eta} ^ {\mathrm{T}} \mathbf {u} (\mathbf {x}) \right\} \mathrm{d} \mathbf {x} = 1\tag{2.195}

where the integration is replaced by summation if x is a discrete variable.

We begin by taking some examples of the distributions introduced earlier in the chapter and showing that they are indeed members of the exponential family. Consider first the Bernoulli distribution

p (x | \mu) = \mathrm{Bern} (x | \mu) = \mu^ {x} (1 - \mu) ^ {1 - x}.\tag{2.196}

Expressing the right-hand side as the exponential of the logarithm, we have

\begin{array}{r c l} p (x | \mu) & = & \exp \left\{x \ln \mu + (1 - x) \ln (1 - \mu) \right\} \\ & = & (1 - \mu) \exp \left\{\ln \left(\frac {\mu}{1 - \mu}\right) x \right\}. \end{array}\tag{2.197}

Comparison with (2.194) allows us to identify

\eta = \ln \left(\frac {\mu}{1 - \mu}\right)\tag{2.198}

which we can solve for $\mu$ to give $\mu = \sigma ( \eta )$ , where

\sigma (\eta) = \frac {1}{1 + \exp (- \eta)}\tag{2.199}

is called the logistic sigmoid function. Thus we can write the Bernoulli distribution using the standard representation (2.194) in the form

p (x | \eta) = \sigma (- \eta) \exp (\eta x)\tag{2.200}

where we have used $1 - \sigma ( \eta ) = \sigma ( - \eta )$ , which is easily proved from (2.199). Comparison with (2.194) shows that

u (x) = x\tag{2.201}

h (x) = 1\tag{2.202}

g (\eta) = \sigma (- \eta).\tag{2.203}

Next consider the multinomial distribution that, for a single observation x, takes the form

p (\mathbf {x} | \boldsymbol {\mu}) = \prod_ {k = 1} ^ {M} \mu_ {k} ^ {x _ {k}} = \exp \left\{\sum_ {k = 1} ^ {M} x _ {k} \ln \mu_ {k} \right\}\tag{2.204}

where ${ \bf x } = ( x _ { 1 } , \ldots , x _ { N } ) ^ { \mathrm { T } }$ . Again, we can write this in the standard representation (2.194) so that

p (\mathbf {x} | \boldsymbol {\eta}) = \exp (\boldsymbol {\eta} ^ {\mathrm{T}} \mathbf {x})\tag{2.205}

where $\eta _ { k } = \ln \mu _ { k }$ , and we have defined $\pmb { \eta } = ( \eta _ { 1 } , \dots , \eta _ { M } ) ^ { \mathrm { T } }$ . Again, comparing with (2.194) we have

\mathbf {u} (\mathbf {x}) = \mathbf {x}\tag{2.206}

h (\mathbf {x}) = 1\tag{2.207}

g (\pmb {\eta}) = 1.\tag{2.208}

Note that the parameters $\eta _ { k }$ are not independent because the parameters $\mu _ { k }$ are subject to the constraint

\sum_ {k = 1} ^ {M} \mu_ {k} = 1\tag{2.209}

so that, given any $M - 1$ of the parameters $\mu _ { k }$ , the value of the remaining parameter is fixed. In some circumstances, it will be convenient to remove this constraint by expressing the distribution in terms of only $M - 1$ parameters. This can be achieved by using the relationship (2.209) to eliminate $\mu _ { M }$ by expressing it in terms of the remaining $\{ \mu _ { k } \}$ where $k = 1 , \ldots , M - 1$ , thereby leaving $M - 1$ parameters. Note that these remaining parameters are still subject to the constraints

0 \leqslant \mu_ {k} \leqslant 1, \quad \sum_ {k = 1} ^ {M - 1} \mu_ {k} \leqslant 1.\tag{2.210}

Making use of the constraint (2.209), the multinomial distribution in this representation then becomes

\begin{array}{l l} \exp \left\{\sum_ {k = 1} ^ {M} x _ {k} \ln \mu_ {k} \right\} \\ = & \exp \left\{\sum_ {k = 1} ^ {M - 1} x _ {k} \ln \mu_ {k} + \left(1 - \sum_ {k = 1} ^ {M - 1} x _ {k}\right) \ln \left(1 - \sum_ {k = 1} ^ {M - 1} \mu_ {k}\right) \right\} \\ = & \exp \left\{\sum_ {k = 1} ^ {M - 1} x _ {k} \ln \left(\frac {\mu_ {k}}{1 - \sum_ {j = 1} ^ {M - 1} \mu_ {j}}\right) + \ln \left(1 - \sum_ {k = 1} ^ {M - 1} \mu_ {k}\right) \right\}. \end{array}\tag{2.211}

We now identify

\ln \left(\frac {\mu_ {k}}{1 - \sum_ {j} \mu_ {j}}\right) = \eta_ {k}\tag{2.212}

which we can solve for $\mu _ { k }$ by first summing both sides over k and then rearranging and back-substituting to give

\mu_ {k} = \frac {\exp (\eta_ {k})}{1 + \sum_ {j} \exp (\eta_ {j})}.\tag{2.213}

This is called the softmax function, or the normalized exponential. In this representation, the multinomial distribution therefore takes the form

p (\mathbf {x} | \boldsymbol {\eta}) = \left(1 + \sum_ {k = 1} ^ {M - 1} \exp (\eta_ {k})\right) ^ {- 1} \exp (\boldsymbol {\eta} ^ {\mathrm{T}} \mathbf {x}).\tag{2.214}

This is the standard form of the exponential family, with parameter vector $\eta =$ $( \eta _ { 1 } , \dots , \eta _ { M - 1 } ) ^ { \mathrm { T } }$ in which

\mathbf {u} (\mathbf {x}) = \mathbf {x}\tag{2.215}

h (\mathbf {x}) = 1\tag{2.216}

g (\boldsymbol {\eta}) = \left(1 + \sum_ {k = 1} ^ {M - 1} \exp (\eta_ {k})\right) ^ {- 1}.\tag{2.217}

Finally, let us consider the Gaussian distribution. For the univariate Gaussian, we have

{p (x | \mu , \sigma^ {2})} = {\frac {1}{(2 \pi \sigma^ {2}) ^ {1 / 2}} \exp \left\{- \frac {1}{2 \sigma^ {2}} (x - \mu) ^ {2} \right\}}\tag{2.218}

= \frac {1}{(2 \pi \sigma^ {2}) ^ {1 / 2}} \exp \left\{- \frac {1}{2 \sigma^ {2}} x ^ {2} + \frac {\mu}{\sigma^ {2}} x - \frac {1}{2 \sigma^ {2}} \mu^ {2} \right\}\tag{2.219}

Exercise 2.57

which, after some simple rearrangement, can be cast in the standard exponential family form (2.194) with

\eta = \binom{\mu / \sigma^ {2}}{- 1 / 2 \sigma^ {2}}\tag{2.220}

\mathbf {u} (x) = \binom{x}{x ^ {2}}\tag{2.221}

{ h ( \mathbf { x } ) } = { ( 2 \pi ) ^ { - 1 / 2 } }\tag{2.222}

g (\pmb {\eta}) = (- 2 \eta_ {2}) ^ {1 / 2} \exp \left(\frac {\eta_ {1} ^ {2}}{4 \eta_ {2}}\right).\tag{2.223}
