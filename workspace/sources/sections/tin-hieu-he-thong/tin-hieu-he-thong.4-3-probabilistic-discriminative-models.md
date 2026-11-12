---
id: "tin-hieu-he-thong.4-3-probabilistic-discriminative-models"
doc_id: "tin-hieu-he-thong"
title: "4.3. Probabilistic Discriminative Models"
level: 2
heading_path: ["4 Linear Models for Classification", "4.3. Probabilistic Discriminative Models"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.4-2-4-exponential-family"
next_id: "tin-hieu-he-thong.4-3-1-fixed-basis-functions"
block_ids: ["b2337", "b2338", "b2339", "b2340", "b2341", "b2342", "b2343", "b2344"]
---

## 4.3. Probabilistic Discriminative Models

For the two-class classification problem, we have seen that the posterior probability of class $\mathcal { C } _ { 1 }$ can be written as a logistic sigmoid acting on a linear function of x, for a wide choice of class-conditional distributions $p ( \mathbf { x } | \mathcal { C } _ { k } )$ . Similarly, for the multiclass case, the posterior probability of class $\mathcal { C } _ { k }$ is given by a softmax transformation of a linear function of x. For specific choices of the class-conditional densities $p ( \mathbf { x } | \mathcal { C } _ { k } )$ , we have used maximum likelihood to determine the parameters of the densities as well as the class priors $p ( \mathcal { C } _ { k } )$ and then used Bayes’ theorem to find the posterior class probabilities.

However, an alternative approach is to use the functional form of the generalized linear model explicitly and to determine its parameters directly by using maximum likelihood. We shall see that there is an efficient algorithm finding such solutions known as iterative reweighted least squares, or IRLS.

The indirect approach to finding the parameters of a generalized linear model, by fitting class-conditional densities and class priors separately and then applying

![image](images/part-002--30dbd26949a61fd33a3346454c643698c3d05b2c2065df2da3b0188e6f8b021b.jpg)

![image](images/part-002--21d31eff7e81d6f17774c217e8314527acf88192cccb2ae430ce508ec96a447c.jpg)

Figure 4.12 Illustration of the role of nonlinear basis functions in linear classification models. The left plot shows the original input space $( x _ { 1 } , x _ { 2 } )$ together with data points from two classes labelled red and blue. Two ‘Gaussian’ basis functions φ (x) and $\phi _ { 2 } ( \mathbf { x } )$ are defined in this space with centres shown by the green crosses and with contours shown by the green circles. The right-hand plot shows the corresponding feature space $\left( \phi _ { 1 } , \phi _ { 2 } \right)$ together with the linear decision boundary obtained given by a logistic regression model of the form discussed in Section 4.3.2. This corresponds to a nonlinear decision boundary in the original input space, shown by the black curve in the left-hand plot.

Bayes’ theorem, represents an example of generative modelling, because we could take such a model and generate synthetic data by drawing values of x from the marginal distribution $p ( \mathbf { x } )$ . In the direct approach, we are maximizing a likelihood function defined through the conditional distribution $p ( \mathcal { C } _ { k } \vert \mathbf { x } )$ , which represents a form of discriminative training. One advantage of the discriminative approach is that there will typically be fewer adaptive parameters to be determined, as we shall see shortly. It may also lead to improved predictive performance, particularly when the class-conditional density assumptions give a poor approximation to the true distributions.
