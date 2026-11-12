---
id: "tin-hieu-he-thong.4-linear-models-for-classification"
doc_id: "tin-hieu-he-thong"
title: "4 Linear Models for Classification"
level: 1
heading_path: ["4 Linear Models for Classification"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.3-2-show-that-the-matrix"
next_id: "tin-hieu-he-thong.4-1-discriminant-functions"
block_ids: ["b2055", "b2056", "b2057", "b2058", "b2059", "b2060", "b2061", "b2062", "b2063", "b2064", "b2065", "b2066", "b2067", "b2068"]
---

# 4 Linear Models for Classification

![image](images/part-001--805c7e6a9290155996d9cc051f2021c2847c0e5038543fca4afccf82c9159588.jpg)

In the previous chapter, we explored a class of regression models having particularly simple analytical and computational properties. We now discuss an analogous class of models for solving classification problems. The goal in classification is to take an input vector x and to assign it to one of K discrete classes $\mathcal { C } _ { k }$ where $k = 1 , \ldots , K$ In the most common scenario, the classes are taken to be disjoint, so that each input is assigned to one and only one class. The input space is thereby divided into decision regions whose boundaries are called decision boundaries or decision surfaces. In this chapter, we consider linear models for classification, by which we mean that the decision surfaces are linear functions of the input vector x and hence are defined by (D 1)-dimensional hyperplanes within the D-dimensional input space. Data sets whose classes can be separated exactly by linear decision surfaces are said to be linearly separable.

For regression problems, the target variable t was simply the vector of real numbers whose values we wish to predict. In the case of classification, there are various ways of using target values to represent class labels. For probabilistic models, the most convenient, in the case of two-class problems, is the binary representation in which there is a single target variable $t \in \{ 0 , 1 \}$ such that $t = 1$ represents class $\mathcal { C } _ { 1 }$ and $t = 0$ represents class $\mathcal { C } _ { 2 }$ . We can interpret the value of t as the probability that the class is $\mathcal { C } _ { 1 }$ , with the values of probability taking only the extreme values of 0 and 1. For $K > 2$ classes, it is convenient to use a 1-of-K coding scheme in which t is a vector of length K such that if the class is $\mathcal { C } _ { j }$ , then all elements $t _ { k }$ of t are zero except element $t _ { j }$ , which takes the value 1. For instance, if we have $K = 5$ classes, then a pattern from class 2 would be given the target vector

\mathbf {t} = (0, 1, 0, 0, 0) ^ {\mathrm{T}}.\tag{4.1}

Again, we can interpret the value of $t _ { k }$ as the probability that the class is $\mathcal { C } _ { k }$ . For nonprobabilistic models, alternative choices of target variable representation will sometimes prove convenient.

In Chapter 1, we identified three distinct approaches to the classification problem. The simplest involves constructing a discriminant function that directly assigns each vector x to a specific class. A more powerful approach, however, models the conditional probability distribution $p ( \mathcal { C } _ { k } | \mathbf { x } )$ in an inference stage, and then subsequently uses this distribution to make optimal decisions. By separating inference and decision, we gain numerous benefits, as discussed in Section 1.5.4. There are two different approaches to determining the conditional probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ . One technique is to model them directly, for example by representing them as parametric models and then optimizing the parameters using a training set. Alternatively, we can adopt a generative approach in which we model the class-conditional densities given by $p ( \mathbf { x } | \mathcal { C } _ { k } )$ , together with the prior probabilities $p ( \mathcal { C } _ { k } )$ for the classes, and then we compute the required posterior probabilities using Bayes’ theorem

p (\mathcal {C} _ {k} | \mathbf {x}) = \frac {p (\mathbf {x} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k})}{p (\mathbf {x})}.\tag{4.2}

We shall discuss examples of all three approaches in this chapter.

In the linear regression models considered in Chapter 3, the model prediction $y ( \mathbf { x } , \mathbf { w } )$ was given by a linear function of the parameters w. In the simplest case, the model is also linear in the input variables and therefore takes the form $y ( \mathbf { x } ) =$ $\mathbf { w } ^ { \mathrm { T } } \mathbf { x } + w _ { 0 }$ , so that $y$ is a real number. For classification problems, however, we wish to predict discrete class labels, or more generally posterior probabilities that lie in the range (0, 1). To achieve this, we consider a generalization of this model in which we transform the linear function of w using a nonlinear function $f ( \cdot )$ so that

y (\mathbf {x}) = f \left(\mathbf {w} ^ {\mathrm{T}} \mathbf {x} + w _ {0}\right).\tag{4.3}

In the machine learning literature $f ( \cdot )$ is known as an activation function, whereas its inverse is called a link function in the statistics literature. The decision surfaces correspond to $y ( \mathbf { x } ) = \mathrm { c o n s t a n t }$ , so that $\mathbf { w } ^ { \mathrm { T } } \mathbf { x } + w _ { 0 } =$ constant and hence the decision surfaces are linear functions of x, even if the function $f ( \cdot )$ is nonlinear. For this reason, the class of models described by (4.3) are called generalized linear models

(McCullagh and Nelder, 1989). Note, however, that in contrast to the models used for regression, they are no longer linear in the parameters due to the presence of the nonlinear function $f ( \cdot )$ . This will lead to more complex analytical and computational properties than for linear regression models. Nevertheless, these models are still relatively simple compared to the more general nonlinear models that will be studied in subsequent chapters.

The algorithms discussed in this chapter will be equally applicable if we first make a fixed nonlinear transformation of the input variables using a vector of basis functions $\phi ( \mathbf { x } )$ as we did for regression models in Chapter 3. We begin by considering classification directly in the original input space x, while in Section 4.3 we shall find it convenient to switch to a notation involving basis functions for consistency with later chapters.
