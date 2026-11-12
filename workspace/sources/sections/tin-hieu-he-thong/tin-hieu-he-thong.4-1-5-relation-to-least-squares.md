---
id: "tin-hieu-he-thong.4-1-5-relation-to-least-squares"
doc_id: "tin-hieu-he-thong"
title: "4.1.5 Relation to least squares"
level: 2
heading_path: ["4 Linear Models for Classification", "4.1.5 Relation to least squares"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-1-4-fisher-s-linear-discriminant"
next_id: "tin-hieu-he-thong.4-1-6-fisher-s-discriminant-for-multiple-classes"
block_ids: ["b2164", "b2165", "b2166", "b2167", "b2168", "b2169", "b2170", "b2171", "b2172", "b2173", "b2174", "b2175", "b2176", "b2177", "b2178", "b2179", "b2180", "b2181", "b2182", "b2183"]
---

## 4.1.5 Relation to least squares

The least-squares approach to the determination of a linear discriminant was based on the goal of making the model predictions as close as possible to a set of target values. By contrast, the Fisher criterion was derived by requiring maximum class separation in the output space. It is interesting to see the relationship between these two approaches. In particular, we shall show that, for the two-class problem, the Fisher criterion can be obtained as a special case of least squares.

So far we have considered $1 { \mathrm { - o f } } { \mathrm { - } } K$ coding for the target values. If, however, we adopt a slightly different target coding scheme, then the least-squares solution for the weights becomes equivalent to the Fisher solution (Duda and Hart, 1973). In particular, we shall take the targets for class $\mathcal { C } _ { 1 }$ to be $N / N _ { 1 }$ , where $N _ { 1 }$ is the number of patterns in class $\mathcal { C } _ { 1 }$ , and $\dot { N }$ is the total number of patterns. This target value approximates the reciprocal of the prior probability for class $\mathcal { C } _ { 1 }$ . For class $\mathcal { C } _ { 2 }$ , we shall take the targets to be $- N / N _ { 2 }$ , where $N _ { 2 }$ is the number of patterns in class $\mathcal { C } _ { 2 }$

The sum-of-squares error function can be written

E = \frac {1}{2} \sum_ {n = 1} ^ {N} \left(\mathbf {w} ^ {\mathrm{T}} \mathbf {x} _ {n} + w _ {0} - t _ {n}\right) ^ {2}.\tag{4.31}

Setting the derivatives of $E$ with respect to $w _ { 0 }$ and w to zero, we obtain respectively

\sum_ {n = 1} ^ {N} \left(\mathbf {w} ^ {\mathrm{T}} \mathbf {x} _ {n} + w _ {0} - t _ {n}\right) = 0\tag{4.32}

\sum_ {n = 1} ^ {N} \left(\mathbf {w} ^ {\mathrm{T}} \mathbf {x} _ {n} + w _ {0} - t _ {n}\right) \mathbf {x} _ {n} = 0.\tag{4.33}

From (4.32), and making use of our choice of target coding scheme for the $t _ { n }$ , we obtain an expression for the bias in the form

w _ {0} = - \mathbf {w} ^ {\mathrm{T}} \mathbf {m}\tag{4.34}

where we have used

\sum_ {n = 1} ^ {N} t _ {n} = N _ {1} \frac {N}{N _ {1}} - N _ {2} \frac {N}{N _ {2}} = 0\tag{4.35}

and where m is the mean of the total data set and is given by

\mathbf {m} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} = \frac {1}{N} (N _ {1} \mathbf {m} _ {1} + N _ {2} \mathbf {m} _ {2}).\tag{4.36}

Exercise 4.6

After some straightforward algebra, and again making use of the choice of $t _ { n }$ , the second equation (4.33) becomes

\left(\mathbf {S} _ {\mathrm{W}} + \frac {N _ {1} N _ {2}}{N} \mathbf {S} _ {\mathrm{B}}\right) \mathbf {w} = N (\mathbf {m} _ {1} - \mathbf {m} _ {2})\tag{4.37}

where $\mathbf { S } _ { \mathrm { W } }$ is defined by (4.28), $\mathbf { S } _ { \mathrm { B } }$ is defined by (4.27), and we have substituted for the bias using (4.34). Using (4.27), we note that $\mathbf { S } _ { \mathrm { B } } \mathbf { w }$ is always in the direction of $\left( \mathbf { m } _ { 2 } - \mathbf { m } _ { 1 } \right)$ . Thus we can write

\mathbf {w} \propto \mathbf {S} _ {\mathrm{W}} ^ {- 1} (\mathbf {m} _ {2} - \mathbf {m} _ {1})\tag{4.38}

where we have ignored irrelevant scale factors. Thus the weight vector coincides with that found from the Fisher criterion. In addition, we have also found an expression for the bias value $w _ { 0 }$ given by (4.34). This tells us that a new vector x should be classified as belonging to class $\mathcal { C } _ { 1 } \mathrm { i f } y ( \mathbf { x } ) = \mathbf { w } ^ { \mathrm { T } } ( \mathbf { x } - \mathbf { m } ) > 0$ and class $\mathcal { C } _ { 2 }$ otherwise.
