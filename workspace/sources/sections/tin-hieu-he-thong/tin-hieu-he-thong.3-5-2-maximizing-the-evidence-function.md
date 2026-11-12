---
id: "tin-hieu-he-thong.3-5-2-maximizing-the-evidence-function"
doc_id: "tin-hieu-he-thong"
title: "3.5.2 Maximizing the evidence function"
level: 2
heading_path: ["3 Linear Models for Regression", "3.5.2 Maximizing the evidence function"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-5-1-evaluation-of-the-evidence-function"
next_id: "tin-hieu-he-thong.3-5-3-effective-number-of-parameters"
block_ids: ["b1942", "b1943", "b1944", "b1945", "b1946", "b1947", "b1948", "b1949", "b1950", "b1951", "b1952", "b1953", "b1954", "b1955", "b1956", "b1957", "b1958", "b1959", "b1960", "b1961", "b1962", "b1963", "b1964", "b1965", "b1966", "b1967"]
---

## 3.5.2 Maximizing the evidence function

Let us first consider the maximization of $p ( \mathbf { t } | \alpha , \beta )$ with respect to α. This can be done by first defining the following eigenvector equation

\left(\beta \boldsymbol {\Phi} ^ {T} \boldsymbol {\Phi}\right) \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}.\tag{3.87}

From (3.81), it then follows that A has eigenvalues $\alpha + \lambda _ { i }$ . Now consider the derivative of the term involving ln $| \mathbf { A } |$ in (3.86) with respect to α. We have

{\frac {d}{d \alpha}} \ln | {\bf A} | = {\frac {d}{d \alpha}} \ln \prod_ {i} (\lambda_ {i} + \alpha) = {\frac {d}{d \alpha}} \sum_ {i} \ln (\lambda_ {i} + \alpha) = \sum_ {i} {\frac {1}{\lambda_ {i} + \alpha}}.\tag{3.88}

Thus the stationary points of (3.86) with respect to α satisfy

0 = \frac {M}{2 \alpha} - \frac {1}{2} \mathbf {m} _ {N} ^ {\mathrm{T}} \mathbf {m} _ {N} - \frac {1}{2} \sum_ {i} \frac {1}{\lambda_ {i} + \alpha}.\tag{3.89}

Multiplying through by 2α and rearranging, we obtain

\alpha \mathbf {m} _ {N} ^ {\mathrm{T}} \mathbf {m} _ {N} = M - \alpha \sum_ {i} \frac {1}{\lambda_ {i} + \alpha} = \gamma .\tag{3.90}

Since there are $M$ terms in the sum over $i ,$ the quantity $\gamma$ can be written

\gamma = \sum_ {i} \frac {\lambda_ {i}}{\alpha + \lambda_ {i}}.\tag{3.91}

Exercise 3.20

The interpretation of the quantity $\gamma$ will be discussed shortly. From (3.90) we see that the value of $\alpha$ that maximizes the marginal likelihood satisfies

\alpha = \frac {\gamma}{\mathbf {m} _ {N} ^ {\mathrm{T}} \mathbf {m} _ {N}}.\tag{3.92}

Note that this is an implicit solution for $\alpha$ not only because $\gamma$ depends on $\alpha ,$ but also because the mode $\mathbf { m } _ { N }$ of the posterior distribution itself depends on the choice of $\alpha .$ We therefore adopt an iterative procedure in which we make an initial choice for α and use this to find $\mathbf { m } _ { N }$ , which is given by (3.53), and also to evaluate $\gamma _ { \mathrm { : } }$ which is given by (3.91). These values are then used to re-estimate $\alpha$ using (3.92), and the process repeated until convergence. Note that because the matrix $\bar { \Phi ^ { \mathrm { T } } } \bar { \Phi }$ is fixed, we can compute its eigenvalues once at the start and then simply multiply these by $\beta$ to obtain the $\lambda _ { i }$

It should be emphasized that the value of $\alpha$ has been determined purely by looking at the training data. In contrast to maximum likelihood methods, no independent data set is required in order to optimize the model complexity.

We can similarly maximize the log marginal likelihood (3.86) with respect to $\beta .$ To do this, we note that the eigenvalues $\lambda _ { i }$ defined by (3.87) are proportional to $\beta ,$ and hence $d \lambda _ { i } / d \beta = \lambda _ { i } / \beta$ giving

{\frac {d}{d \beta}} \ln | {\bf A} | = {\frac {d}{d \beta}} \sum_ {i} \ln (\lambda_ {i} + \alpha) = {\frac {1}{\beta}} \sum_ {i} {\frac {\lambda_ {i}}{\lambda_ {i} + \alpha}} = {\frac {\gamma}{\beta}}.\tag{3.93}

The stationary point of the marginal likelihood therefore satisfies

0 = \frac {N}{2 \beta} - \frac {1}{2} \sum_ {n = 1} ^ {N} \left\{t _ {n} - \mathbf {m} _ {N} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \right\} ^ {2} - \frac {\gamma}{2 \beta}\tag{3.94}

Exercise 3.22

and rearranging we obtain

\frac {1}{\beta} = \frac {1}{N - \gamma} \sum_ {n = 1} ^ {N} \left\{t _ {n} - \mathbf {m} _ {N} ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) \right\} ^ {2}.\tag{3.95}

Again, this is an implicit solution for $\beta$ and can be solved by choosing an initial value for $\beta$ and then using this to calculate ${ \bf m } _ { N }$ and $\gamma$ and then re-estimate $\beta$ using (3.95), repeating until convergence. If both $\alpha$ and $\beta$ are to be determined from the data, then their values can be re-estimated together after each update of $\gamma$ .

Figure 3.15 Contours of the likelihood function (red) and the prior (green) in which the axes in parameter space have been rotated to align with the eigenvectors $\mathbf { u } _ { i }$ of the Hessian. For $\alpha = 0$ , the mode of the posterior is given by the maximum likelihood solution $\mathbf { w } _ { \mathrm { M L } } ,$ whereas for nonzero $\alpha$ the mode is at ${ \bf w } _ { \mathrm { M A P } } = { \bf m } _ { N }$ . In the direction $w _ { 1 }$ the eigenvalue $\lambda _ { 1 }$ , defined by (3.87), is small compared with $\alpha$ and so the quantity $\lambda _ { 1 } / ( \lambda _ { 1 } + \alpha )$ is close to zero, and the corresponding $\mathsf { M A P }$ value of $w _ { 1 }$ is also close to zero. By contrast, in the direction $w _ { 2 }$ the eigenvalue $\lambda _ { 2 }$ is large compared with $\alpha$ and so the quantity $\lambda _ { 2 } / ( \lambda _ { 2 } + \alpha )$ is close to unity, and the ${ \mathsf { M A P } }$ value of $w _ { 2 }$ is close to its maximum likelihood value.

![image](images/part-001--11c7d5e8b68161e0a9ea9a329ba7875409c5f76a2aacd87bfd5fc87fbe8076b9.jpg)
