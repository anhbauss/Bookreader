---
id: "tin-hieu-he-thong.exercises-4"
doc_id: "tin-hieu-he-thong"
title: "Exercises"
level: 2
heading_path: ["3 Linear Models for Regression", "Exercises"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-6-limitations-of-fixed-basis-functions"
next_id: "tin-hieu-he-thong.3-2-show-that-the-matrix"
block_ids: ["b1993", "b1994", "b1995", "b1996", "b1997", "b1998", "b1999", "b2000"]
---

## Exercises

3.1 () www Show that the ‘tanh’ function and the logistic sigmoid function (3.6) are related by

\tanh (a) = 2 \sigma (2 a) - 1.\tag{3.100}

Hence show that a general linear combination of logistic sigmoid functions of the form

y (x, \mathbf {w}) = w _ {0} + \sum_ {j = 1} ^ {M} w _ {j} \sigma \left(\frac {x - \mu_ {j}}{s}\right)\tag{3.101}

is equivalent to a linear combination of ‘tanh’ functions of the form

y (x, \mathbf {u}) = u _ {0} + \sum_ {j = 1} ^ {M} u _ {j} \tanh \left(\frac {x - \mu_ {j}}{s}\right)\tag{3.102}

and find expressions to relate the new parameters $\{ u _ { 1 } , . . . , u _ { M } \}$ to the original parameters $\{ w _ { 1 } , \hdots , w _ { M } \}$
