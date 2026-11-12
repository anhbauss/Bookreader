---
id: "tin-hieu-he-thong.14-4-tree-based-models"
doc_id: "tin-hieu-he-thong"
title: "14.4. Tree-based Models"
level: 2
heading_path: ["Combining Models", "14.4. Tree-based Models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-3-2-error-functions-for-boosting"
next_id: "tin-hieu-he-thong.14-5-conditional-mixture-models"
block_ids: ["b7085", "b7086", "b7087", "b7088", "b7089", "b7090", "b7091", "b7092", "b7093", "b7094", "b7095", "b7096", "b7097", "b7098", "b7099", "b7100", "b7101", "b7102", "b7103", "b7104", "b7105", "b7106", "b7107", "b7108", "b7109", "b7110"]
---

## 14.4. Tree-based Models

There are various simple, but widely used, models that work by partitioning the input space into cuboid regions, whose edges are aligned with the axes, and then assigning a simple model (for example, a constant) to each region. They can be viewed as a model combination method in which only one model is responsible for making predictions at any given point in input space. The process of selecting a specific model, given a new input x, can be described by a sequential decision making process corresponding to the traversal of a binary tree (one that splits into two branches at each node). Here we focus on a particular tree-based framework called classification and regression trees, or CART (Breiman et al., 1984), although there are many other variants going by such names as ID3 and C4.5 (Quinlan, 1986; Quinlan, 1993).

Figure 14.5 shows an illustration of a recursive binary partitioning of the input space, along with the corresponding tree structure. In this example, the first step

Figure 14.5 Illustration of a two-dimensional input space that has been partitioned into five regions using axis-aligned boundaries.

![image](images/part-004--10842cb30d10da6e67a660267cb3f57db8f57a6d4d37d5f1a6c10630190808d6.jpg)

Figure 14.6 Binary tree corresponding to the partitioning of input space shown in Figure 14.5.

![image](images/part-004--e0a8a28471c48f5d9a8bfa68981e7ec3ec8d33760fd3cba9cc2b2b9b46cffc89.jpg)

divides the whole of the input space into two regions according to whether $x _ { 1 } \leqslant \theta _ { 1 }$ or $x _ { 1 } > \theta _ { 1 }$ where $\theta _ { 1 }$ is a parameter of the model. This creates two subregions, each of which can then be subdivided independently. For instance, the region $x _ { 1 } \leqslant \theta _ { 1 }$ is further subdivided according to whether $x _ { 2 } \leqslant \theta _ { 2 }$ or $x _ { 2 } > \theta _ { 2 }$ , giving rise to the regions denoted A and B. The recursive subdivision can be described by the traversal of the binary tree shown in Figure 14.6. For any new input x, we determine which region it falls into by starting at the top of the tree at the root node and following a path down to a specific leaf node according to the decision criteria at each node. Note that such decision trees are not probabilistic graphical models.

Within each region, there is a separate model to predict the target variable. For instance, in regression we might simply predict a constant over each region, or in classification we might assign each region to a specific class. A key property of treebased models, which makes them popular in fields such as medical diagnosis, for example, is that they are readily interpretable by humans because they correspond to a sequence of binary decisions applied to the individual input variables. For instance, to predict a patient’s disease, we might first ask “is their temperature greater than some threshold?”. If the answer is yes, then we might next ask “is their blood pressure less than some threshold?”. Each leaf of the tree is then associated with a specific diagnosis.

In order to learn such a model from a training set, we have to determine the structure of the tree, including which input variable is chosen at each node to form the split criterion as well as the value of the threshold parameter $\theta _ { i }$ for the split. We also have to determine the values of the predictive variable within each region.

Consider first a regression problem in which the goal is to predict a single target variable t from a D-dimensional vector $\mathbf x = ( x _ { 1 } , \hdots , x _ { D } ) ^ { \mathrm T }$ of input variables. The training data consists of input vectors $\left\{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \right\}$ along with the corresponding continuous labels $\{ t _ { 1 } , \ldots , t _ { N } \}$ . If the partitioning of the input space is given, and we minimize the sum-of-squares error function, then the optimal value of the predictive variable within any given region is just given by the average of the values of $t _ { n }$ for those data points that fall in that region.

Now consider how to determine the structure of the decision tree. Even for a fixed number of nodes in the tree, the problem of determining the optimal structure (including choice of input variable for each split as well as the corresponding thresholds) to minimize the sum-of-squares error is usually computationally infeasible due to the combinatorially large number of possible solutions. Instead, a greedy optimization is generally done by starting with a single root node, corresponding to the whole input space, and then growing the tree by adding nodes one at a time. At each step there will be some number of candidate regions in input space that can be split, corresponding to the addition of a pair of leaf nodes to the existing tree. For each of these, there is a choice of which of the $D$ input variables to split, as well as the value of the threshold. The joint optimization of the choice of region to split, and the choice of input variable and threshold, can be done efficiently by exhaustive search noting that, for a given choice of split variable and threshold, the optimal choice of predictive variable is given by the local average of the data, as noted earlier. This is repeated for all possible choices of variable to be split, and the one that gives the smallest residual sum-of-squares error is retained.

Given a greedy strategy for growing the tree, there remains the issue of when to stop adding nodes. A simple approach would be to stop when the reduction in residual error falls below some threshold. However, it is found empirically that often none of the available splits produces a significant reduction in error, and yet after several more splits a substantial error reduction is found. For this reason, it is common practice to grow a large tree, using a stopping criterion based on the number of data points associated with the leaf nodes, and then prune back the resulting tree. The pruning is based on a criterion that balances residual error against a measure of model complexity. If we denote the starting tree for pruning by $T _ { 0 }$ , then we define $T \subset T _ { 0 }$ to be a subtree of $T _ { 0 }$ if it can be obtained by pruning nodes from $T _ { 0 }$ (in other words, by collapsing internal nodes by combining the corresponding regions). Suppose the leaf nodes are indexed by $\tau = 1 , \dots , | T |$ , with leaf node $\tau$ representing a region $\mathcal { R } _ { \tau }$ of input space having $N _ { \tau }$ data points, and $| T |$ denoting the total number of leaf nodes. The optimal prediction for region $\mathcal { R } _ { \tau }$ is then given by

y _ {\tau} = \frac {1}{N _ {\tau}} \sum_ {\mathbf {x} _ {n} \in \mathcal {R} _ {\tau}} t _ {n}\tag{14.29}

and the corresponding contribution to the residual sum-of-squares is then

Q _ {\tau} (T) = \sum_ {\mathbf {x} _ {n} \in \mathcal {R} _ {\tau}} \left\{t _ {n} - y _ {\tau} \right\} ^ {2}.\tag{14.30}

The pruning criterion is then given by

C (T) = \sum_ {\tau = 1} ^ {| T |} Q _ {\tau} (T) + \lambda | T |\tag{14.31}

The regularization parameter λ determines the trade-off between the overall residual sum-of-squares error and the complexity of the model as measured by the number $| T |$ of leaf nodes, and its value is chosen by cross-validation.

For classification problems, the process of growing and pruning the tree is similar, except that the sum-of-squares error is replaced by a more appropriate measure of performance. If we define $p _ { \tau k }$ to be the proportion of data points in region $\mathcal { R } _ { \tau }$ assigned to class k, where $k = 1 , \ldots , K$ , then two commonly used choices are the cross-entropy

Q _ {\tau} (T) = \sum_ {k = 1} ^ {K} p _ {\tau k} \ln p _ {\tau k}\tag{14.32}

and the Gini index

Q _ {\tau} (T) = \sum_ {k = 1} ^ {K} p _ {\tau k} \left(1 - p _ {\tau k}\right).\tag{14.33}

These both vanish for $p _ { \tau k } = 0$ and $p _ { \tau k } = 1$ and have a maximum at $p _ { \tau k } = 0 . 5$ . They encourage the formation of regions in which a high proportion of the data points are assigned to one class. The cross entropy and the Gini index are better measures than the misclassification rate for growing the tree because they are more sensitive to the node probabilities. Also, unlike misclassification rate, they are differentiable and hence better suited to gradient based optimization methods. For subsequent pruning of the tree, the misclassification rate is generally used.

The human interpretability of a tree model such as CART is often seen as its major strength. However, in practice it is found that the particular tree structure that is learned is very sensitive to the details of the data set, so that a small change to the training data can result in a very different set of splits (Hastie et al., 2001).

There are other problems with tree-based methods of the kind considered in this section. One is that the splits are aligned with the axes of the feature space, which may be very suboptimal. For instance, to separate two classes whose optimal decision boundary runs at 45 degrees to the axes would need a large number of axis-parallel splits of the input space as compared to a single non-axis-aligned split. Furthermore, the splits in a decision tree are hard, so that each region of input space is associated with one, and only one, leaf node model. The last issue is particularly problematic in regression where we are typically aiming to model smooth functions, and yet the tree model produces piecewise-constant predictions with discontinuities at the split boundaries.
