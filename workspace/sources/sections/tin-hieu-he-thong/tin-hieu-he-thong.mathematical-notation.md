---
id: "tin-hieu-he-thong.mathematical-notation"
doc_id: "tin-hieu-he-thong"
title: "Mathematical notation"
level: 2
heading_path: ["This book is dedicated to myfamily:", "Mathematical notation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.acknowledgements"
next_id: "tin-hieu-he-thong.contents"
block_ids: ["b67", "b68", "b69", "b70", "b71", "b72", "b73", "b74", "b75", "b76"]
---


I have tried to keep the mathematical content of the book to the minimum necessary to achieve a proper understanding of the field. However, this minimum level is nonzero, and it should be emphasized that a good grasp of calculus, linear algebra, and probability theory is essential for a clear understanding of modern pattern recognition and machine learning techniques. Nevertheless, the emphasis in this book is on conveying the underlying concepts rather than on mathematical rigour.

I have tried to use a consistent notation throughout the book, although at times this means departing from some of the conventions used in the corresponding research literature. Vectors are denoted by lower case bold Roman letters such as **x**, and all vectors are assumed to be column vectors. A superscript T denotes the transpose of a matrix or vector, so that $\mathbf{x}^{\mathrm{T}}$ will be a row vector. Uppercase bold roman letters, such as **M**, denote matrices. The notation $(w_1, \ldots, w_M)$ denotes a row vector with M elements, while the corresponding column vector is written as $\mathbf{w} = (w_1, \ldots, w_M)^{\mathrm{T}}$.

The notation $[a, b]$ is used to denote the closed interval from a to $b$, that is the interval including the values a and b themselves, while $(a, b)$ denotes the corresponding open interval, that is the interval excluding a and b. Similarly, $[a, b)$ denotes an interval that includes $a$ but excludes b. For the most part, however, there will be little need to dwell on such refinements as whether the end points of an interval are included or not.

The $M \times M$ identity matrix (also known as the unit matrix) is denoted $\mathbf{I}_M$ which will be abbreviated to **I** where there is no ambiguity about its dimensionality. It has elements $I_{ij}$ that equal 1 if $i = j$ and 0 if $i \neq j$.

A functional is denoted $f[y]$ where $y(x)$ is some function. The concept of a functional is discussed in Appendix D.

The notation $g(x) = O(f(x))$ denotes that $|g(x)/f(x)|$ is bounded as $x \to \infty$. For instance if $g(x) = 3x^2 + 2$, then $g(x) = O(x^2)$.

The expectation of a function $f(x, y)$ with respect to a random variable x is denoted by $\mathbb{E}_x[f(x, y)]$. In situations where there is no ambiguity as to which variable is being averaged over, this will be simplified by omitting the suffix, for instance $\mathbb{E}[x]$. If the distribution of x is conditioned on another variable z, then the corresponding conditional expectation will be written $\mathbb{E}_x[f(x) | z]$. Similarly, the variance is denoted $\mathrm{var}[f(x)]$, and for vector variables the covariance is written $\mathrm{cov}[\mathbf{x}, \mathbf{y}]$. We shall also use $\mathrm{cov}[\mathbf{x}]$ as a shorthand notation for $\mathrm{cov}[\mathbf{x}, \mathbf{x}]$. The concepts of expectations and covariances are introduced in Section 1.2.2.

If we have N values $\mathbf{x}_1, \ldots, \mathbf{x}_N$ of a D-dimensional vector $\mathbf{x} = (x_1, \ldots, x_D)^{\mathrm{T}}$ we can combine the observations into a data matrix **X** in which the $n^{\mathrm{th}}$ row of **X** corresponds to the row vector $\mathbf{x}_n^{\mathrm{T}}$. Thus the $n, i$ element of **X** corresponds to the $i^{\mathrm{th}}$ element of the $n^{\mathrm{th}}$ observation $\mathbf{x}_n$. For the case of one-dimensional variables we shall denote such a matrix by **x**, which is a column vector whose $n^{\mathrm{th}}$ element is $x_n$. Note that **x** (which has dimensionality N) uses a different typeface to distinguish it from **x** (which has dimensionality D).
