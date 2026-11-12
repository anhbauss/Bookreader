---
id: "tin-hieu-he-thong.adaboost"
doc_id: "tin-hieu-he-thong"
title: "AdaBoost"
level: 2
heading_path: ["Combining Models", "AdaBoost"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-3-boosting"
next_id: "tin-hieu-he-thong.14-3-1-minimizing-exponential-error"
block_ids: ["b7030", "b7031", "b7032", "b7033", "b7034", "b7035", "b7036", "b7037", "b7038", "b7039", "b7040", "b7041", "b7042", "b7043", "b7044"]
---

## AdaBoost

1. Initialize the data weighting coefficients $\{ w _ { n } \}$ by setting $w _ { n } ^ { ( 1 ) } = 1 / N$ for $n = 1 , \ldots , N$
2. For $m = 1 , \ldots , M \colon$

(a) Fit a classifier $y _ { m } ( \mathbf x )$ to the training data by minimizing the weighted error function

J _ {m} = \sum_ {n = 1} ^ {N} w _ {n} ^ {(m)} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n})\tag{14.15}

where $I ( y _ { m } ( \mathbf { x } _ { n } ) \mid \neq t _ { n } )$ is the indicator function and equals 1 when $y _ { m } ( \mathbf x _ { n } ) \neq t _ { n }$ and 0 otherwise.

(b) Evaluate the quantities

\epsilon_ {m} = \frac {\sum_ {n = 1} ^ {N} w _ {n} ^ {(m)} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n})}{\sum_ {n = 1} ^ {N} w _ {n} ^ {(m)}}\tag{14.16}

and then use these to evaluate

\alpha_ {m} = \ln \left\{\frac {1 - \epsilon_ {m}}{\epsilon_ {m}} \right\}.\tag{14.17}

(c) Update the data weighting coefficients

w _ {n} ^ {(m + 1)} = w _ {n} ^ {(m)} \exp \left\{\alpha_ {m} I (y _ {m} (\mathbf {x} _ {n}) \neq t _ {n}) \right\}\tag{14.18}

3. Make predictions using the final model, which is given by

Y _ {M} (\mathbf {x}) = \operatorname{sign} \left(\sum_ {m = 1} ^ {M} \alpha_ {m} y _ {m} (\mathbf {x})\right).\tag{14.19}

We see that the first base classifier $y _ { 1 } ( \mathbf x )$ is trained using weighting coefficients $w _ { n } ^ { ( 1 ) }$ that are all equal, which therefore corresponds to the usual procedure for training a single classifier. From (14.18), we see that in subsequent iterations the weighting coefficients $w _ { n } ^ { ( m ) }$ are increased for data points that are misclassified and decreased for data points that are correctly classified. Successive classifiers are therefore forced to place greater emphasis on points that have been misclassified by previous classifiers, and data points that continue to be misclassified by successive classifiers receive ever greater weight. The quantities $\epsilon _ { m }$ represent weighted measures of the error rates of each of the base classifiers on the data set. We therefore see that the weighting coefficients $\alpha _ { m }$ defined by (14.17) give greater weight to the more accurate classifiers when computing the overall output given by (14.19).

The AdaBoost algorithm is illustrated in Figure 14.2, using a subset of 30 data points taken from the toy classification data set shown in Figure A.7. Here each base learners consists of a threshold on one of the input variables. This simple classifier corresponds to a form of decision tree known as a ‘decision stumps’, i.e., a decision tree with a single node. Thus each base learner classifies an input according to whether one of the input features exceeds some threshold and therefore simply partitions the space into two regions separated by a linear decision surface that is parallel to one of the axes.
