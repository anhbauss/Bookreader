---
id: "tin-hieu-he-thong.1-5-2-minimizing-the-expected-loss"
doc_id: "tin-hieu-he-thong"
title: "1.5.2 Minimizing the expected loss"
level: 2
heading_path: ["Introduction", "1.5.2 Minimizing the expected loss"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-5-1-minimizing-the-misclassification-rate"
next_id: "tin-hieu-he-thong.1-5-3-the-reject-option"
block_ids: ["b458", "b459", "b460", "b461", "b462", "b463", "b464", "b465", "b466", "b467", "b468", "b469"]
---

## 1.5.2 Minimizing the expected loss

For many applications, our objective will be more complex than simply minimizing the number of misclassifications. Let us consider again the medical diagnosis problem. We note that, if a patient who does not have cancer is incorrectly diagnosed as having cancer, the consequences may be some patient distress plus the need for further investigations. Conversely, if a patient with cancer is diagnosed as healthy, the result may be premature death due to lack of treatment. Thus the consequences of these two types of mistake can be dramatically different. It would clearly be better to make fewer mistakes of the second kind, even if this was at the expense of making more mistakes of the first kind.

We can formalize such issues through the introduction of a loss function, also called a cost function, which is a single, overall measure of loss incurred in taking any of the available decisions or actions. Our goal is then to minimize the total loss incurred. Note that some authors consider instead a utility function, whose value they aim to maximize. These are equivalent concepts if we take the utility to be simply the negative of the loss, and throughout this text we shall use the loss function convention. Suppose that, for a new value of x, the true class is $\mathcal { C } _ { k }$ and that we assign x to class $\mathcal { C } _ { j }$ (where $j$ may or may not be equal to k). In so doing, we incur some level of loss that we denote by $L _ { k j }$ , which we can view as the $k , j$ element of a loss matrix. For instance, in our cancer example, we might have a loss matrix of the form shown in Figure 1.25. This particular loss matrix says that there is no loss incurred if the correct decision is made, there is a loss of 1 if a healthy patient is diagnosed as having cancer, whereas there is a loss of 1000 if a patient having cancer is diagnosed as healthy.

The optimal solution is the one which minimizes the loss function. However, the loss function depends on the true class, which is unknown. For a given input vector x, our uncertainty in the true class is expressed through the joint probability distribution $p ( \mathbf { x } , \mathcal { C } _ { k } )$ and so we seek instead to minimize the average loss, where the average is computed with respect to this distribution, which is given by

\mathbb {E} [ L ] = \sum_ {k} \sum_ {j} \int_ {\mathcal {R} _ {j}} L _ {k j} p (\mathbf {x}, \mathcal {C} _ {k}) \mathrm{d} \mathbf {x}.\tag{1.80}

Each x can be assigned independently to one of the decision regions $\mathcal { R } _ { j }$ . Our goal is to choose the regions $\mathcal { R } _ { j }$ in order to minimize the expected loss (1.80), which implies that for each x we should minimize $\begin{array} { r } { \sum _ { k } L _ { k j } p ( \mathbf x , \hat { \mathcal { C } } _ { k } ) } \end{array}$ . As before, we can use the product rule $p ( \mathbf { x } , \mathcal { C } _ { k } ) = p ( \mathcal { C } _ { k } | \mathbf { x } ) p ( \mathbf { x } )$ to eliminate the common factor of $p ( \mathbf { x } )$ Thus the decision rule that minimizes the expected loss is the one that assigns each

Figure 1.26

Illustration of the reject option. Inputs x such that the larger of the two posterior probabilities is less than or equal to some threshold θ will be rejected.

![image](images/part-001--82ff855bfd4203e4488074edc4d5d4af9be5b0e535c0ebe17669ce7d2feae21e.jpg)

new x to the class j for which the quantity

\sum_ {k} L _ {k j} p (\mathcal {C} _ {k} | \mathbf {x})\tag{1.81}

is a minimum. This is clearly trivial to do, once we know the posterior class probabilities $p ( \mathcal { C } _ { k } | \mathbf { x } )$
