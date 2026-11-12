Feedback_1: Vẫn còn một số chỗ chưa hiện được công thức
Minh chứng:
he goal in the curve fitting problem is to be able to make predictions for the target variable t given some new value of the input variable x on the basis of a set of training data comprising N input values 
x
=
(
x
1
,
\hdots
,
x
N
)
T
x=(x 
1
​
 ,\hdots,x 
N
​
 ) 
T
  and their corresponding target values 
t
=
Ω
^
(
t
1
,
…
,
t
N
)
T
t= 
Ω
 (t 
1
​
 ,…,t 
N
​
 ) 
T
  . We can express our uncertainty over the value of the target variable using a probability distribution. For this purpose, we shall assume that, given the value of x, the corresponding value of t has a Gaussian distribution with a mean equal to the value 
y
(
x
,
w
)
y(x,w) of the polynomial curve given by (1.1). Thus we have

(Tiếp)...
I have tried to use a consistent notation throughout the book, although at times this means departing from some of the conventions used in the corresponding research literature. Vectors are denoted by lower case bold Roman letters such as x, and all vectors are assumed to be column vectors. A superscript T denotes the transpose of a matrix or vector, so that 
x
T
x 
T
  will be a row vector. Uppercase bold roman letters, such as M, denote matrices. The notation 
(
w
1
,
…
,
w
M
)
(w 
1
​
 ,…,w 
M
​
 ) denotes a row vector with M elements, while the corresponding column vector is written as 
w
=
(
w
1
,
\hdots
,
w
M
)
T
w=(w 
1
​
 ,\hdots,w 
M
​
 ) 
T
 

The notation 
[
a
,
b
]
[a,b] is used to denote the closed interval from a to 
b
,
b, that is the interval including the values a and b themselves, while 
(
a
,
b
)
(a,b) denotes the corresponding open interval, that is the interval excluding a and b. Similarly, 
[
a
,
b
)
[a,b) denotes an interval that includes 
a
a but excludes b. For the most part, however, there will be little need to dwell on such refinements as whether the end points of an interval are included or not.
(Tiếp)...
Table 1.3 The joint distribution 
p
(
x
,
y
)
p(x,y) for two binary variables x and y used in Exercise 1.39.

x \begin{array}{c c c} & y \ & 0 & 1 \ \hline 0 & 1 / 3 & 1 / 3 \ 1 & 0 & 1 / 3 \end{array}
1.31 ( ) www Consider two variables x and y having joint distribution 
p
(
x
,
y
)
p(x,y) . Show that the differential entropy of this pair of variables satisfies

H
[
x
,
y
]
⩽
H
[
x
]
+
H
[
y
]
(Tiếp)...
Expressing the right-hand side as the exponential of the logarithm, we have

\begin{array}{r c l} p (x | \mu) & = & \exp \left{x \ln \mu + (1 - x) \ln (1 - \mu) \right} \ & = & (1 - \mu) \exp \left\{\ln \left(\frac {\mu}{1 - \mu}\right) x \right\}. \end{array}
Comparison with (2.194) allows us to identify

η
=
ln
⁡
(
μ
1
−
μ
)
