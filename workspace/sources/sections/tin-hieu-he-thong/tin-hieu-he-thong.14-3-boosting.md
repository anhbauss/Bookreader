---
id: "tin-hieu-he-thong.14-3-boosting"
doc_id: "tin-hieu-he-thong"
title: "14.3. Boosting"
level: 2
heading_path: ["Combining Models", "14.3. Boosting"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.14-2-committees"
next_id: "tin-hieu-he-thong.adaboost"
block_ids: ["b7024", "b7025", "b7026", "b7027", "b7028", "b7029"]
---

## 14.3. Boosting

Boosting is a powerful technique for combining multiple ‘base’ classifiers to produce a form of committee whose performance can be significantly better than that of any of the base classifiers. Here we describe the most widely used form of boosting algorithm called AdaBoost, short for ‘adaptive boosting’, developed by Freund and Schapire (1996). Boosting can give good results even if the base classifiers have a performance that is only slightly better than random, and hence sometimes the base classifiers are known as weak learners. Originally designed for solving classification problems, boosting can also be extended to regression (Friedman, 2001).

The principal difference between boosting and the committee methods such as bagging discussed above, is that the base classifiers are trained in sequence, and each base classifier is trained using a weighted form of the data set in which the weighting coefficient associated with each data point depends on the performance of the previous classifiers. In particular, points that are misclassified by one of the base classifiers are given greater weight when used to train the next classifier in the sequence. Once all the classifiers have been trained, their predictions are then combined through a weighted majority voting scheme, as illustrated schematically in Figure 14.1.

Consider a two-class classification problem, in which the training data comprises input vectors $\mathbf { x } _ { 1 } , \ldots .$ , x<sub>N</sub> along with corresponding binary target variables $t _ { 1 } , \ldots , t _ { N }$ where $t _ { n } \in \{ - 1 , 1 \}$ . Each data point is given an associated weighting parameter $w _ { n }$ , which is initially set $1 / N$ for all data points. We shall suppose that we have a procedure available for training a base classifier using weighted data to give a function $y ( \mathbf { x } ) \in \{ - 1 , 1 \}$ . At each stage of the algorithm, AdaBoost trains a new classifier using a data set in which the weighting coefficients are adjusted according to the performance of the previously trained classifier so as to give greater weight to the misclassified data points. Finally, when the desired number of base classifiers have been trained, they are combined to form a committee using coefficients that give different weight to different base classifiers. The precise form of the AdaBoost algorithm is given below.

Schematic illustration of the boosting framework. Each base classifier $y _ { m } ( \mathbf { x } )$ is trained on a weighted form of the training set (blue arrows) in which the weights $w _ { n } ^ { ( m ) }$ depend on the performance of the previous base classifier $y _ { m - 1 } ( \mathbf { x } )$ (green arrows). Once all base classifiers have been trained, they are combined to give the final classifier $Y _ { M } ( \mathbf { x } )$ (red arrows).

![image](images/part-004--7ff9be65b1820f9c050dac763da7d9e0d4353648a949a88f406d92549a47731b.jpg)
