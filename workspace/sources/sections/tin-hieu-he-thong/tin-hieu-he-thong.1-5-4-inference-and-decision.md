---
id: "tin-hieu-he-thong.1-5-4-inference-and-decision"
doc_id: "tin-hieu-he-thong"
title: "1.5.4 Inference and decision"
level: 2
heading_path: ["Introduction", "1.5.4 Inference and decision"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-5-3-the-reject-option"
next_id: "tin-hieu-he-thong.1-5-5-loss-functions-for-regression"
block_ids: ["b473", "b474", "b475", "b476", "b477", "b478", "b479", "b480", "b481", "b482", "b483", "b484", "b485", "b486", "b487", "b488", "b489", "b490", "b491", "b492", "b493", "b494", "b495", "b496", "b497", "b498"]
---

## 1.5.4 Inference and decision

We have broken the classification problem down into two separate stages, the inference stage in which we use training data to learn a model for $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ , and the subsequent decision stage in which we use these posterior probabilities to make optimal class assignments. An alternative possibility would be to solve both problems together and simply learn a function that maps inputs x directly into decisions. Such a function is called a discriminantfunction.

In fact, we can identify three distinct approaches to solving decision problems, all of which have been used in practical applications. These are given, in decreasing order of complexity, by:

(a) First solve the inference problem of determining the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ for each class $\mathcal { C } _ { k }$ individually. Also separately infer the prior class probabilities $p ( \mathcal { C } _ { k } )$ . Then use Bayes’ theorem in the form

p (\mathcal {C} _ {k} | \mathbf {x}) = \frac {p (\mathbf {x} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k})}{p (\mathbf {x})}\tag{1.82}

to find the posterior class probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ . As usual, the denominator in Bayes’ theorem can be found in terms of the quantities appearing in the numerator, because

p (\mathbf {x}) = \sum_ {k} p (\mathbf {x} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k}).\tag{1.83}

Equivalently, we can model the joint distribution $p ( \mathbf { x } , \mathcal { C } _ { k } )$ directly and then normalize to obtain the posterior probabilities. Having found the posterior probabilities, we use decision theory to determine class membership for each new input x. Approaches that explicitly or implicitly model the distribution of inputs as well as outputs are known as generative models, because by sampling from them it is possible to generate synthetic data points in the input space.

(b) First solve the inference problem of determining the posterior class probabilities $p ( \mathcal { C } _ { k } | \mathbf { x } )$ , and then subsequently use decision theory to assign each new x to one of the classes. Approaches that model the posterior probabilities directly are called discriminative models.

(c) Find a function $f ( \mathbf { x } )$ , called a discriminant function, which maps each input x directly onto a class label. For instance, in the case of two-class problems, $f ( \cdot )$ might be binary valued and such that $f = 0$ represents class $\mathcal { C } _ { 1 }$ and $f = 1$ represents class $\mathcal { C } _ { 2 }$ . In this case, probabilities play no role.

Let us consider the relative merits of these three alternatives. Approach (a) is the most demanding because it involves finding the joint distribution over both x and $\mathcal { C } _ { k }$ . For many applications, x will have high dimensionality, and consequently we may need a large training set in order to be able to determine the class-conditional densities to reasonable accuracy. Note that the class priors $p ( \mathcal { C } _ { k } )$ can often be estimated simply from the fractions of the training set data points in each of the classes. One advantage of approach (a), however, is that it also allows the marginal density of data $p ( \mathbf { x } )$ to be determined from (1.83). This can be useful for detecting new data points that have low probability under the model and for which the predictions may be of low accuracy, which is known as outlier detection or novelty detection (Bishop, 1994; Tarassenko, 1995).

![image](images/part-001--f5f86fc60727c6f977490b5394e30ac4241a53a84577ecc932b0715a1b0d5f93.jpg)

![image](images/part-001--f00ee8462dc0c229b17c0fd2205ebe34eb1862e4a7d6238966745e6d76eb89c4.jpg)

Figure 1.27 Example of the class-conditional densities for two classes having a single input variable x (left plot) together with the corresponding posterior probabilities (right plot). Note that the left-hand mode of the class-conditional density $p ( \mathbf { x } | \mathcal { C } _ { 1 } )$ , shown in blue on the left plot, has no effect on the posterior probabilities. The vertical green line in the right plot shows the decision boundary in x that gives the minimum misclassification rate.

However, if we only wish to make classification decisions, then it can be wasteful of computational resources, and excessively demanding of data, to find the joint distribution $p ( \mathbf { x } , \mathcal { C } _ { k } )$ when in fact we only really need the posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ , which can be obtained directly through approach (b). Indeed, the classconditional densities may contain a lot of structure that has little effect on the posterior probabilities, as illustrated in Figure 1.27. There has been much interest in exploring the relative merits of generative and discriminative approaches to machine learning, and in finding ways to combine them (Jebara, 2004; Lasserre et al., 2006).

An even simpler approach is (c) in which we use the training data to find a discriminant function $f ( \mathbf { x } )$ that maps each x directly onto a class label, thereby combining the inference and decision stages into a single learning problem. In the example of Figure 1.27, this would correspond to finding the value of x shown by the vertical green line, because this is the decision boundary giving the minimum probability of misclassification.

With option (c), however, we no longer have access to the posterior probabilities $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ . There are many powerful reasons for wanting to compute the posterior probabilities, even if we subsequently use them to make decisions. These include:

Minimizing risk. Consider a problem in which the elements of the loss matrix are subjected to revision from time to time (such as might occur in a financial application). If we know the posterior probabilities, we can trivially revise the minimum risk decision criterion by modifying (1.81) appropriately. If we have only a discriminant function, then any change to the loss matrix would require that we return to the training data and solve the classification problem afresh.

Reject option. Posterior probabilities allow us to determine a rejection criterion that will minimize the misclassification rate, or more generally the expected loss, for a given fraction of rejected data points.

Compensating for class priors. Consider our medical X-ray problem again, and suppose that we have collected a large number of X-ray images from the general population for use as training data in order to build an automated screening system. Because cancer is rare amongst the general population, we might find that, say, only 1 in every 1,000 examples corresponds to the presence of cancer. If we used such a data set to train an adaptive model, we could run into severe difficulties due to the small proportion of the cancer class. For instance, a classifier that assigned every point to the normal class would already achieve 99.9% accuracy and it would be difficult to avoid this trivial solution. Also, even a large data set will contain very few examples of X-ray images corresponding to cancer, and so the learning algorithm will not be exposed to a broad range of examples of such images and hence is not likely to generalize well. A balanced data set in which we have selected equal numbers of examples from each of the classes would allow us to find a more accurate model. However, we then have to compensate for the effects of our modifications to the training data. Suppose we have used such a modified data set and found models for the posterior probabilities. From Bayes’ theorem (1.82), we see that the posterior probabilities are proportional to the prior probabilities, which we can interpret as the fractions of points in each class. We can therefore simply take the posterior probabilities obtained from our artificially balanced data set and first divide by the class fractions in that data set and then multiply by the class fractions in the population to which we wish to apply the model. Finally, we need to normalize to ensure that the new posterior probabilities sum to one. Note that this procedure cannot be applied if we have learned a discriminant function directly instead of determining posterior probabilities.

Combining models. For complex applications, we may wish to break the problem into a number of smaller subproblems each of which can be tackled by a separate module. For example, in our hypothetical medical diagnosis problem, we may have information available from, say, blood tests as well as X-ray images. Rather than combine all of this heterogeneous information into one huge input space, it may be more effective to build one system to interpret the Xray images and a different one to interpret the blood data. As long as each of the two models gives posterior probabilities for the classes, we can combine the outputs systematically using the rules of probability. One simple way to do this is to assume that, for each class separately, the distributions of inputs for the X-ray images, denoted by $\mathbf { x } _ { \mathrm { I } } .$ , and the blood data, denoted by $\mathbf { x } _ { \mathrm { B } }$ , are

independent, so that

p (\mathbf {x} _ {\mathrm{I}}, \mathbf {x} _ {\mathrm{B}} | \mathcal {C} _ {k}) = p (\mathbf {x} _ {\mathrm{I}} | \mathcal {C} _ {k}) p (\mathbf {x} _ {\mathrm{B}} | \mathcal {C} _ {k}).\tag{1.84}

This is an example of conditional independence property, because the independence holds when the distribution is conditioned on the class $\mathcal { C } _ { k }$ . The posterior probability, given both the X-ray and blood data, is then given by

\begin{array}{r c l} p (\mathcal {C} _ {k} | \mathbf {x} _ {\mathrm{I}}, \mathbf {x} _ {\mathrm{B}}) & \propto & p (\mathbf {x} _ {\mathrm{I}}, \mathbf {x} _ {\mathrm{B}} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k}) \\ & \propto & p (\mathbf {x} _ {\mathrm{I}} | \mathcal {C} _ {k}) p (\mathbf {x} _ {\mathrm{B}} | \mathcal {C} _ {k}) p (\mathcal {C} _ {k}) \\ & \propto & \frac {p (\mathcal {C} _ {k} | \mathbf {x} _ {\mathrm{I}}) p (\mathcal {C} _ {k} | \mathbf {x} _ {\mathrm{B}})}{p (\mathcal {C} _ {k})} \end{array}\tag{1.85}

Thus we need the class prior probabilities $p ( \mathcal { C } _ { k } )$ , which we can easily estimate from the fractions of data points in each class, and then we need to normalize the resulting posterior probabilities so they sum to one. The particular conditional independence assumption (1.84) is an example of the naive Bayes model. Note that the joint marginal distribution $p ( \mathbf { x } _ { \mathrm { I } } , \mathbf { x } _ { \mathrm { B } } )$ will typically not factorize under this model. We shall see in later chapters how to construct models for combining data that do not require the conditional independence assumption (1.84).
