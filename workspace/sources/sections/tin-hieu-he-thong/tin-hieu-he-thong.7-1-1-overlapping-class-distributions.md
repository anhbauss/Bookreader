---
id: "tin-hieu-he-thong.7-1-1-overlapping-class-distributions"
doc_id: "tin-hieu-he-thong"
title: "7.1.1 Overlapping class distributions"
level: 2
heading_path: ["Sparse Kernel Machines", "7.1.1 Overlapping class distributions"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.joseph-louis-lagrange-1736-1813"
next_id: "tin-hieu-he-thong.7-1-2-relation-to-logistic-regression"
block_ids: ["b3746", "b3747", "b3748", "b3749", "b3750", "b3751", "b3752", "b3753", "b3754", "b3755", "b3756", "b3757", "b3758", "b3759", "b3760", "b3761", "b3762", "b3763", "b3764", "b3765", "b3766", "b3767", "b3768", "b3769", "b3770", "b3771", "b3772", "b3773", "b3774", "b3775", "b3776", "b3777", "b3778", "b3779", "b3780", "b3781", "b3782", "b3783", "b3784", "b3785", "b3786", "b3787", "b3788", "b3789", "b3790", "b3791", "b3792", "b3793", "b3794", "b3795", "b3796", "b3797", "b3798", "b3799", "b3800", "b3801", "b3802", "b3803"]
---

## 7.1.1 Overlapping class distributions

So far, we have assumed that the training data points are linearly separable in the feature space $\phi ( \mathbf { x } )$ . The resulting support vector machine will give exact separation of the training data in the original input space x, although the corresponding decision boundary will be nonlinear. In practice, however, the class-conditional distributions may overlap, in which case exact separation of the training data can lead to poor generalization.

We therefore need a way to modify the support vector machine so as to allow some of the training points to be misclassified. From (7.19) we see that in the case of separable classes, we implicitly used an error function that gave infinite error if a data point was misclassified and zero error if it was classified correctly, and then optimized the model parameters to maximize the margin. We now modify this approach so that data points are allowed to be on the ‘wrong side’ of the margin boundary, but with a penalty that increases with the distance from that boundary. For the subsequent optimization problem, it is convenient to make this penalty a linear function of this distance. To do this, we introduce slack variables, $\xi _ { n } \geqslant 0$ where $n = 1 , \ldots , N$ , with one slack variable for each training data point (Bennett, 1992; Cortes and Vapnik, 1995). These are defined by $\xi _ { n } = 0$ for data points that are on or inside the correct margin boundary and $\xi _ { n } = | t _ { n } - y ( \mathbf { x } _ { n } )$ for other points. Thus a data point that is on the decision boundary $y ( \mathbf { x } _ { n } ) = 0$ will have $\xi _ { n } = 1$ , and points

Figure 7.3 Illustration of the slack variables $\xi _ { n } \geqslant 0$ Data points with circles around them are support vectors.

![image](images/part-002--9c6b38a63c712bd65e83872a3d515d494e66065ad07662cc01ec3a3acbdcfd6c.jpg)

with $\xi _ { n } > 1$ will be misclassified. The exact classification constraints (7.5) are then replaced with

t _ {n} y (\mathbf {x} _ {n}) \geqslant 1 - \xi_ {n}, \qquad n = 1, \ldots , N\tag{7.20}

in which the slack variables are constrained to satisfy $\xi _ { n } \geqslant 0$ . Data points for which $\xi _ { n } = 0$ are correctly classified and are either on the margin or on the correct side of the margin. Points for which $0 < \xi _ { n } \leqslant 1$ lie inside the margin, but on the correct side of the decision boundary, and those data points for which $\xi _ { n } > 1$ lie on the wrong side of the decision boundary and are misclassified, as illustrated in Figure 7.3. This is sometimes described as relaxing the hard margin constraint to give a soft margin and allows some of the training set data points to be misclassified. Note that while slack variables allow for overlapping class distributions, this framework is still sensitive to outliers because the penalty for misclassification increases linearly with ξ.

Our goal is now to maximize the margin while softly penalizing points that lie on the wrong side of the margin boundary. We therefore minimize

C \sum_ {n = 1} ^ {N} \xi_ {n} + \frac {1}{2} \| \mathbf {w} \| ^ {2}\tag{7.21}

where the parameter $C > 0$ controls the trade-off between the slack variable penalty and the margin. Because any point that is misclassified has $\xi _ { n } > 1$ , it follows that $\sum _ { n } \xi _ { n }$ is an upper bound on the number of misclassified points. The parameter C is therefore analogous to (the inverse of) a regularization coefficient because it controls the trade-off between minimizing training errors and controlling model complexity. In the limit $C  \infty$ , we will recover the earlier support vector machine for separable data.

We now wish to minimize (7.21) subject to the constraints (7.20) together with $\xi _ { n } \geqslant 0$ . The corresponding Lagrangian is given by

L (\mathbf {w}, b, \mathbf {a}) = \frac {1}{2} \| \mathbf {w} \| ^ {2} + C \sum_ {n = 1} ^ {N} \xi_ {n} - \sum_ {n = 1} ^ {N} a _ {n} \left\{t _ {n} y (\mathbf {x} _ {n}) - 1 + \xi_ {n} \right\} - \sum_ {n = 1} ^ {N} \mu_ {n} \xi_ {n}\tag{7.22}

Appendix E

where $\{ a _ { n } \geqslant 0 \}$ and $\{ \mu _ { n } \geqslant 0 \}$ are Lagrange multipliers. The corresponding set of KKT conditions are given by

a _ {n} \geqslant 0\tag{7.23}

t _ {n} y (\mathbf {x} _ {n}) - 1 + \xi_ {n} \geqslant 0\tag{7.24}

a _ {n} (t _ {n} y (\mathbf {x} _ {n}) - 1 + \xi_ {n}) = 0\tag{7.25}

\mu_ {n} \geqslant 0\tag{7.26}

\xi_ {n} \geqslant 0\tag{7.27}

\mu_ {n} \xi_ {n} = 0\tag{7.28}

where $n = 1 , \ldots , N$

We now optimize out w, b, and $\{ \xi _ { n } \}$ making use of the definition (7.1) of $y ( \mathbf x )$ to give

\frac {\partial L}{\partial \mathbf {w}} = 0 \Rightarrow \mathbf {w} = \sum_ {n = 1} ^ {N} a _ {n} t _ {n} \phi (\mathbf {x} _ {n})\tag{7.29}

{\frac {\partial L}{\partial b}} = 0 \Rightarrow \sum_ {n = 1} ^ {N} a _ {n} t _ {n} = 0\tag{7.30}

\frac {\partial L}{\partial \xi_ {n}} = 0 \Rightarrow a _ {n} = C - \mu_ {n}.\tag{7.31}

Using these results to eliminate w, b, and $\{ \xi _ { n } \}$ from the Lagrangian, we obtain the dual Lagrangian in the form

\widetilde {L} (\mathbf {a}) = \sum_ {n = 1} ^ {N} a _ {n} - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} a _ {n} a _ {m} t _ {n} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\tag{7.32}

which is identical to the separable case, except that the constraints are somewhat different. To see what these constraints are, we note that $a _ { n } \geqslant 0$ is required because these are Lagrange multipliers. Furthermore, (7.31) together with $\mu _ { n } \geqslant 0$ implies $a _ { n } \leqslant C$ . We therefore have to minimize (7.32) with respect to the dual variables $\left\{ a _ { n } \right\}$ subject to

0 \leqslant a _ {n} \leqslant C

\sum_ {n = 1} ^ {N} a _ {n} t _ {n} = 0\tag{7.33}

(7.34)

for $n = 1 , \ldots , N$ , where (7.33) are known as box constraints. This again represents a quadratic programming problem. If we substitute (7.29) into (7.1), we see that predictions for new data points are again made by using (7.13).

We can now interpret the resulting solution. As before, a subset of the data points may have $a _ { n } ~ = ~ 0$ , in which case they do not contribute to the predictive model (7.13). The remaining data points constitute the support vectors. These have $a _ { n } > 0$ and hence from (7.25) must satisfy

t _ {n} y (\mathbf {x} _ {n}) = 1 - \xi_ {n}.\tag{7.35}

If $a _ { n } < C$ , then (7.31) implies that $\mu _ { n } > 0$ , which from (7.28) requires $\xi _ { n } = 0$ and hence such points lie on the margin. Points with $a _ { n } = C$ can lie inside the margin and can either be correctly classified if $\xi _ { n } \leqslant 1$ or misclassified if $\xi _ { n } > 1$

To determine the parameter $b$ in (7.1), we note that those support vectors for which $0 < a _ { n } < C$ have $\xi _ { n } = 0$ so that $t _ { n } y ( \mathbf x _ { n } ) = 1$ and hence will satisfy

t _ {n} \left(\sum_ {m \in \mathcal {S}} a _ {m} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) + b\right) = 1.\tag{7.36}

Again, a numerically stable solution is obtained by averaging to give

b = \frac {1}{N _ {\mathcal {M}}} \sum_ {n \in \mathcal {M}} \left(t _ {n} - \sum_ {m \in \mathcal {S}} a _ {m} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\right)\tag{7.37}

where denotes the set of indices of data points having $0 < a _ { n } < C$

An alternative, equivalent formulation of the support vector machine, known as the $\nu { - } S V M ,$ has been proposed by Scholkopf ¨ et al. (2000). This involves maximizing

\widetilde {L} (\mathbf {a}) = - \frac {1}{2} \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} a _ {n} a _ {m} t _ {n} t _ {m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m})\tag{7.38}

subject to the constraints

0 \leqslant a _ {n} \leqslant 1 / N\tag{7.39}

\sum_ {n = 1} ^ {N} a _ {n} t _ {n} = 0\tag{7.40}

\sum_ {n = 1} ^ {N} a _ {n} \geqslant \nu .\tag{7.41}

This approach has the advantage that the parameter $\nu ,$ which replaces $C ,$ can be interpreted as both an upper bound on the fraction of margin errors (points for which $\xi _ { n } > 0$ and hence which lie on the wrong side of the margin boundary and which may or may not be misclassified) and a lower bound on the fraction of support vectors. An example of the ν-SVM applied to a synthetic data set is shown in Figure 7.4. Here Gaussian kernels of the form exp $( - \gamma \Vert \mathbf { x } - \mathbf { x } ^ { \prime } \Vert ^ { 2 } )$ have been used, with $\gamma = 0 . 4 5$

Although predictions for new inputs are made using only the support vectors, the training phase (i.e., the determination of the parameters a and b) makes use of the whole data set, and so it is important to have efficient algorithms for solving the quadratic programming problem. We first note that the objective function $\widetilde L ( \mathbf { a } )$ given by (7.10) or (7.32) is quadratic and so any local optimum will also be a global optimum provided the constraints define a convex region (which they do as a consequence of being linear). Direct solution of the quadratic programming problem using traditional techniques is often infeasible due to the demanding computation and memory requirements, and so more practical approaches need to be found. The technique of chunking (Vapnik, 1982) exploits the fact that the value of the Lagrangian is unchanged if we remove the rows and columns of the kernel matrix corresponding to Lagrange multipliers that have value zero. This allows the full quadratic programming problem to be broken down into a series of smaller ones, whose goal is eventually to identify all of the nonzero Lagrange multipliers and discard the others. Chunking can be implemented using protected conjugate gradients (Burges, 1998). Although chunking reduces the size of the matrix in the quadratic function from the number of data points squared to approximately the number of nonzero Lagrange multipliers squared, even this may be too big to fit in memory for large-scale applications. Decomposition methods (Osuna et al., 1996) also solve a series of smaller quadratic programming problems but are designed so that each of these is of a fixed size, and so the technique can be applied to arbitrarily large data sets. However, it still involves numerical solution of quadratic programming subproblems and these can be problematic and expensive. One of the most popular approaches to training support vector machines is called sequential minimal optimization, or SMO (Platt, 1999). It takes the concept of chunking to the extreme limit and considers just two Lagrange multipliers at a time. In this case, the subproblem can be solved analytically, thereby avoiding numerical quadratic programming altogether. Heuristics are given for choosing the pair of Lagrange multipliers to be considered at each step. In practice, SMO is found to have a scaling with the number of data points that is somewhere between linear and quadratic depending on the particular application.

Figure 7.4 Illustration of the ν-SVM applied to a nonseparable data set in two dimensions. The support vectors are indicated by circles.

![image](images/part-002--1f52d0205f308a5a996042c7ee3dd0787cc1b14cfd147b04e6f81c7cfd80397f.jpg)

We have seen that kernel functions correspond to inner products in feature spaces that can have high, or even infinite, dimensionality. By working directly in terms of the kernel function, without introducing the feature space explicitly, it might therefore seem that support vector machines somehow manage to avoid the curse of dimensionality. This is not the case, however, because there are constraints amongst the feature values that restrict the effective dimensionality of feature space. To see this consider a simple second-order polynomial kernel that we can expand in terms of its components

\begin{array}{r c l} k (\mathbf {x}, \mathbf {z}) & = & \left(1 + \mathbf {x} ^ {\mathrm{T}} \mathbf {z}\right) ^ {2} = (1 + x _ {1} z _ {1} + x _ {2} z _ {2}) ^ {2} \\ & = & 1 + 2 x _ {1} z _ {1} + 2 x _ {2} z _ {2} + x _ {1} ^ {2} z _ {1} ^ {2} + 2 x _ {1} z _ {1} x _ {2} z _ {2} + x _ {2} ^ {2} z _ {2} ^ {2} \\ & = & (1, \sqrt {2} x _ {1}, \sqrt {2} x _ {2}, x _ {1} ^ {2}, \sqrt {2} x _ {1} x _ {2}, x _ {2} ^ {2}) (1, \sqrt {2} z _ {1}, \sqrt {2} z _ {2}, z _ {1} ^ {2}, \sqrt {2} z _ {1} z _ {2}, z _ {2} ^ {2}) ^ {\mathrm{T}} \\ & = & \phi (\mathbf {x}) ^ {\mathrm{T}} \phi (\mathbf {z}). \end{array} \tag {7.42}

This kernel function therefore represents an inner product in a feature space having six dimensions, in which the mapping from input space to feature space is described by the vector function $\phi ( \mathbf { x } )$ . However, the coefficients weighting these different features are constrained to have specific forms. Thus any set of points in the original two-dimensional space x would be constrained to lie exactly on a two-dimensional nonlinear manifold embedded in the six-dimensional feature space.

We have already highlighted the fact that the support vector machine does not provide probabilistic outputs but instead makes classification decisions for new input vectors. Veropoulos et al. (1999) discuss modifications to the SVM to allow the trade-off between false positive and false negative errors to be controlled. However, if we wish to use the SVM as a module in a larger probabilistic system, then probabilistic predictions of the class label t for new inputs x are required.

To address this issue, Platt (2000) has proposed fitting a logistic sigmoid to the outputs of a previously trained support vector machine. Specifically, the required conditional probability is assumed to be of the form

p (t = 1 | \mathbf {x}) = \sigma \left(A y (\mathbf {x}) + B\right)\tag{7.43}

where $y ( \mathbf x )$ is defined by (7.1). Values for the parameters A and B are found by minimizing the cross-entropy error function defined by a training set consisting of pairs of values $y ( \mathbf { x } _ { n } )$ and $t _ { n }$ . The data used to fit the sigmoid needs to be independent of that used to train the original SVM in order to avoid severe over-fitting. This twostage approach is equivalent to assuming that the output $y ( \mathbf x )$ of the support vector machine represents the log-odds of x belonging to class $t = 1$ . Because the SVM training procedure is not specifically intended to encourage this, the SVM can give a poor approximation to the posterior probabilities (Tipping, 2001).
