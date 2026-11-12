---
id: "tin-hieu-he-thong.4-1-6-fisher-s-discriminant-for-multiple-classes"
doc_id: "tin-hieu-he-thong"
title: "4.1.6 Fisher\u2019s discriminant for multiple classes"
level: 2
heading_path: ["4 Linear Models for Classification", "4.1.6 Fisher\u2019s discriminant for multiple classes"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-1-5-relation-to-least-squares"
next_id: "tin-hieu-he-thong.4-1-7-the-perceptron-algorithm"
block_ids: ["b2184", "b2185", "b2186", "b2187", "b2188", "b2189", "b2190", "b2191", "b2192", "b2193", "b2194", "b2195", "b2196", "b2197", "b2198", "b2199", "b2200", "b2201", "b2202", "b2203", "b2204", "b2205", "b2206", "b2207", "b2208", "b2209", "b2210", "b2211"]
---

## 4.1.6 Fisher’s discriminant for multiple classes

We now consider the generalization of the Fisher discriminant to $K > 2$ classes, and we shall assume that the dimensionality D of the input space is greater than the number K of classes. Next, we introduce $D ^ { \prime } > 1$ linear ‘features $y _ { k } = \mathbf { w } _ { k } ^ { \mathrm { T } } \mathbf { x } .$ , where $k = 1 , \ldots , D ^ { \prime }$ . These feature values can conveniently be grouped together to form a vector y. Similarly, the weight vectors $\left\{ \mathbf { w } _ { k } \right\}$ can be considered to be the columns of a matrix W, so that

\mathbf {y} = \mathbf {W} ^ {\mathrm{T}} \mathbf {x}.\tag{4.39}

Note that again we are not including any bias parameters in the definition of $\mathbf { y } .$ . The generalization of the within-class covariance matrix to the case of K classes follows from (4.28) to give

\mathbf {S} _ {\mathrm{W}} = \sum_ {k = 1} ^ {K} \mathbf {S} _ {k}\tag{4.40}

where

\mathbf {S} _ {k} = \sum_ {n \in \mathcal {C} _ {k}} (\mathbf {x} _ {n} - \mathbf {m} _ {k}) (\mathbf {x} _ {n} - \mathbf {m} _ {k}) ^ {\mathrm{T}}\tag{4.41}

{\bf m} _ {k} = \frac {1}{N _ {k}} \sum_ {n \in \mathcal {C} _ {k}} {\bf x} _ {n}\tag{4.42}

and $N _ { k }$ is the number of patterns in class $\mathcal { C } _ { k }$ . In order to find a generalization of the between-class covariance matrix, we follow Duda and Hart (1973) and consider first the total covariance matrix

\mathbf {S} _ {\mathrm{T}} = \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \mathbf {m}) (\mathbf {x} _ {n} - \mathbf {m}) ^ {\mathrm{T}}\tag{4.43}

where m is the mean of the total data set

\mathbf {m} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} = \frac {1}{N} \sum_ {k = 1} ^ {K} N _ {k} \mathbf {m} _ {k}\tag{4.44}

and $\begin{array} { r } { N = \sum _ { k } N _ { k } } \end{array}$ is the total number of data points. The total covariance matrix can be decomposed into the sum of the within-class covariance matrix, given by (4.40) and (4.41), plus an additional matrix $\mathbf { S } _ { \mathrm { B } }$ , which we identify as a measure of the between-class covariance

\mathbf {S} _ {\mathrm{T}} = \mathbf {S} _ {\mathrm{W}} + \mathbf {S} _ {\mathrm{B}}\tag{4.45}

where

\mathbf {S} _ {\mathrm{B}} = \sum_ {k = 1} ^ {K} N _ {k} (\mathbf {m} _ {k} - \mathbf {m}) (\mathbf {m} _ {k} - \mathbf {m}) ^ {\mathrm{T}}.\tag{4.46}

These covariance matrices have been defined in the original x-space. We can now define similar matrices in the projected $D ^ { \prime }$ -dimensional y-space

\mathbf {s} _ {\mathrm{W}} = \sum_ {k = 1} ^ {K} \sum_ {n \in \mathcal {C} _ {k}} (\mathbf {y} _ {n} - \boldsymbol {\mu} _ {k}) (\mathbf {y} _ {n} - \boldsymbol {\mu} _ {k}) ^ {\mathrm{T}}\tag{4.47}

and

\mathbf {s} _ {\mathrm{B}} = \sum_ {k = 1} ^ {K} N _ {k} (\boldsymbol {\mu} _ {k} - \boldsymbol {\mu}) (\boldsymbol {\mu} _ {k} - \boldsymbol {\mu}) ^ {\mathrm{T}}\tag{4.48}

where

\boldsymbol {\mu} _ {k} = \frac {1}{N _ {k}} \sum_ {n \in \mathcal {C} _ {k}} \mathbf {y} _ {n}, \quad \boldsymbol {\mu} = \frac {1}{N} \sum_ {k = 1} ^ {K} N _ {k} \boldsymbol {\mu} _ {k}.\tag{4.49}

Again we wish to construct a scalar that is large when the between-class covariance is large and when the within-class covariance is small. There are now many possible choices of criterion (Fukunaga, 1990). One example is given by

J (\mathbf {W}) = \mathrm{Tr} \left\{\mathbf {s} _ {\mathrm{W}} ^ {- 1} \mathbf {s} _ {\mathrm{B}} \right\}.\tag{4.50}

This criterion can then be rewritten as an explicit function of the projection matrix W in the form

J (\mathbf {w}) = \operatorname{Tr} \left\{\left(\mathbf {W S} _ {\mathrm{W}} \mathbf {W} ^ {\mathrm{T}}\right) ^ {- 1} \left(\mathbf {W S} _ {\mathrm{B}} \mathbf {W} ^ {\mathrm{T}}\right) \right\}.\tag{4.51}

Maximization of such criteria is straightforward, though somewhat involved, and is discussed at length in Fukunaga (1990). The weight values are determined by those eigenvectors of $\bar { \bf S } _ { \mathrm { W } } ^ { - 1 } { \bf S } _ { \mathrm { B } }$ that correspond to the $D ^ { \prime }$ largest eigenvalues.

There is one important result that is common to all such criteria, which is worth emphasizing. We first note from (4.46) that $\mathbf { S } _ { \mathrm { B } }$ is composed of the sum of K matrices, each of which is an outer product of two vectors and therefore of rank 1. In addition, only $( K - 1 )$ of these matrices are independent as a result of the constraint (4.44). Thus, $\mathbf { S } _ { \mathrm { B } }$ has rank at most equal to $( K - \bar { 1 } )$ and so there are at most $( K - 1 )$ nonzero eigenvalues. This shows that the projection onto the $( K - 1 )$ -dimensional subspace spanned by the eigenvectors of $\mathbf { S } _ { \mathrm { B } }$ does not alter the value of $J ( \mathbf { w } )$ , and so we are therefore unable to find more than $( K - 1 )$ linear ‘features’ by this means (Fukunaga, 1990).
