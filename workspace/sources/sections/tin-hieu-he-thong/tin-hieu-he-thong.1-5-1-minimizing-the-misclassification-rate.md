---
id: "tin-hieu-he-thong.1-5-1-minimizing-the-misclassification-rate"
doc_id: "tin-hieu-he-thong"
title: "1.5.1 Minimizing the misclassification rate"
level: 2
heading_path: ["Introduction", "1.5.1 Minimizing the misclassification rate"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-5-decision-theory"
next_id: "tin-hieu-he-thong.1-5-2-minimizing-the-expected-loss"
block_ids: ["b447", "b448", "b449", "b450", "b451", "b452", "b453", "b454", "b455", "b456", "b457"]
---

## 1.5.1 Minimizing the misclassification rate

Suppose that our goal is simply to make as few misclassifications as possible. We need a rule that assigns each value of x to one of the available classes. Such a rule will divide the input space into regions $\mathcal { R } _ { k }$ called decision regions, one for each class, such that all points in $\mathcal { R } _ { k }$ are assigned to class $\mathcal { C } _ { k }$ . The boundaries between decision regions are called decision boundaries or decision surfaces. Note that each decision region need not be contiguous but could comprise some number of disjoint regions. We shall encounter examples of decision boundaries and decision regions in later chapters. In order to find the optimal decision rule, consider first of all the case of two classes, as in the cancer problem for instance. A mistake occurs when an input vector belonging to class $\mathcal { C } _ { 1 }$ is assigned to class $\mathcal { C } _ { 2 }$ or vice versa. The probability of this occurring is given by

\begin{array}{r c l} p (\text {mistake}) & = & p (\mathbf {x} \in \mathcal {R} _ {1}, \mathcal {C} _ {2}) + p (\mathbf {x} \in \mathcal {R} _ {2}, \mathcal {C} _ {1}) \\ & = & \int_ {\mathcal {R} _ {1}} p (\mathbf {x}, \mathcal {C} _ {2})   \mathrm{d} \mathbf {x} + \int_ {\mathcal {R} _ {2}} p (\mathbf {x}, \mathcal {C} _ {1})   \mathrm{d} \mathbf {x}. \end{array}\tag{1.78}

We are free to choose the decision rule that assigns each point x to one of the two classes. Clearly to minimize p(mistake) we should arrange that each x is assigned to whichever class has the smaller value of the integrand in (1.78). Thus, if $p ( \mathbf { x } , \mathcal { C } _ { 1 } ) >$ $p ( \mathbf { x } , \mathcal { C } _ { 2 } )$ for a given value of $\mathbf { x } ,$ then we should assign that x to class $\mathcal { C } _ { 1 }$ . From the product rule of probability we have $p ( \mathbf { x } , \mathcal { C } _ { k } ) = p ( \mathcal { C } _ { k } | \mathbf { x } ) p ( \mathbf { x } )$ . Because the factor $p ( \mathbf { x } )$ is common to both terms, we can restate this result as saying that the minimum probability of making a mistake is obtained if each value of x is assigned to the class for which the posterior probability $p ( \mathcal { C } _ { k } | \mathbf { x } )$ is largest. This result is illustrated for two classes, and a single input variable x, in Figure 1.24.

![image](images/part-001--5cbff76323fa9a7a2a1a4d3b3331dae2675dce3c27c6f3025eda44bd624f8451.jpg)

Schematic illustration of the joint probabilities $p ( x , \mathcal { C } _ { k } )$ for each of two classes plotted against $x ,$ , together with the decision boundary $x = { \widehat { x } }$ . Values of $x \geqslant { \widehat { x } }$ are classified as class $\mathcal { C } _ { 2 }$ and hence belong to decision region $\mathcal { R } _ { 2 }$ , whereas points $x < { \widehat { x } }$ are classified as $\mathcal { C } _ { 1 }$ and belong to $\mathcal { R } _ { 1 }$ . Errors arise from the blue, green, and red regions, so that for $x < { \widehat { x } }$ the errors are due to points from class $\mathcal { C } _ { 2 }$ being misclassified as $\mathcal { C } _ { 1 }$ (represented by the sum of the red and green regions), and conversely for points in the region $x \geqslant { \widehat { x } }$ the errors are due to points from class $\mathcal { C } _ { 1 }$ being misclassified as $\mathcal { C } _ { 2 }$ (represented by the blue region). As we vary the location $\widehat { x }$ of the decision boundary, the combined areas of the blue and green regions remains constant, whereas the size of the red region varies. The optimal choice for $\widehat { x }$ is where the curves for $p ( x , \mathcal { C } _ { 1 } )$ and $p ( x , \mathcal { C } _ { 2 } )$ cross, corresponding to $\widehat { x } = x _ { 0 }$ , because in this case the red region disappears. This is equivalent to the minimum misclassification rate decision rule, which assigns each value of $x$ to the class having the higher posterior probability $p ( \mathcal { C } _ { k } | x )$

For the more general case of K classes, it is slightly easier to maximize the probability of being correct, which is given by

\begin{array}{r c l} p (\text { correct }) & = & \sum_ {k = 1} ^ {K} p (\mathbf {x} \in \mathcal {R} _ {k}, \mathcal {C} _ {k}) \\ & = & \sum_ {k = 1} ^ {K} \int_ {\mathcal {R} _ {k}} p (\mathbf {x}, \mathcal {C} _ {k})   \mathrm{d} \mathbf {x} \end{array}\tag{1.79}

which is maximized when the regions $\mathcal { R } _ { k }$ are chosen such that each x is assigned to the class for which $p ( \mathbf { x } , \mathcal { C } _ { k } )$ is largest. Again, using the product rule $p ( \mathbf { x } , \mathcal { C } _ { k } ) =$ $p ( \mathcal { C } _ { k } | \mathbf { x } ) p ( \mathbf { x } )$ , and noting that the factor of $p ( \mathbf { x } )$ is common to all terms, we see that each x should be assigned to the class having the largest posterior probability $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$

Figure 1.25 An example of a loss matrix with elements $L _ { k j }$ for the cancer treatment problem. The rows correspond to the true class, whereas the columns correspond to the assignment of class made by our decision criterion.

\begin{array}{c c c} & \text {cancer} & \text {normal} \\ \text {cancer} & 0 & 1 0 0 0 \\ \text {normal} & 1 & 0 \end{array}
