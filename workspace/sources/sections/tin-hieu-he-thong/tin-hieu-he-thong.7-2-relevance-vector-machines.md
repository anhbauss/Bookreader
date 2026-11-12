---
id: "tin-hieu-he-thong.7-2-relevance-vector-machines"
doc_id: "tin-hieu-he-thong"
title: "7.2. Relevance Vector Machines"
level: 2
heading_path: ["Sparse Kernel Machines", "7.2. Relevance Vector Machines"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.7-1-5-computational-learning-theory"
next_id: "tin-hieu-he-thong.7-2-1-rvm-for-regression"
block_ids: ["b3903", "b3904", "b3905", "b3906"]
---

## 7.2. Relevance Vector Machines

Support vector machines have been used in a variety of classification and regression applications. Nevertheless, they suffer from a number of limitations, several of which have been highlighted already in this chapter. In particular, the outputs of an SVM represent decisions rather than posterior probabilities. Also, the SVM was originally formulated for two classes, and the extension to $K > 2$ classes is problematic. There is a complexity parameter $C ,$ or ν (as well as a parameter  in the case of regression), that must be found using a hold-out method such as cross-validation. Finally, predictions are expressed as linear combinations of kernel functions that are centred on training data points and that are required to be positive definite.

The relevance vector machine or RVM (Tipping, 2001) is a Bayesian sparse kernel technique for regression and classification that shares many of the characteristics of the SVM whilst avoiding its principal limitations. Additionally, it typically leads to much sparser models resulting in correspondingly faster performance on test data whilst maintaining comparable generalization error.

In contrast to the SVM we shall find it more convenient to introduce the regression form of the RVM first and then consider the extension to classification tasks.
