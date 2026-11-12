---
id: "tin-hieu-he-thong.8-1-1-example-polynomial-regression"
doc_id: "tin-hieu-he-thong"
title: "8.1.1 Example: Polynomial regression"
level: 2
heading_path: ["Graphical Models", "8.1.1 Example: Polynomial regression"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-1-bayesian-networks"
next_id: "tin-hieu-he-thong.8-1-2-generative-models"
block_ids: ["b4095", "b4096", "b4097", "b4098", "b4099", "b4100", "b4101", "b4102", "b4103", "b4104", "b4105", "b4106", "b4107", "b4108", "b4109", "b4110", "b4111", "b4112", "b4113", "b4114", "b4115", "b4116", "b4117", "b4118", "b4119", "b4120", "b4121", "b4122"]
---

## 8.1.1 Example: Polynomial regression

As an illustration of the use of directed graphs to describe probability distributions, we consider the Bayesian polynomial regression model introduced in Sec-

Figure 8.3 Directed graphical model representing the joint distribution (8.6) corresponding to the Bayesian polynomial regression model introduced in Section 1.2.6.

![image](images/part-002--e87d8239209d8067c7fce2aa83bf981cc8c0cdc27bd594fd05d0b8be00ea6cc6.jpg)

tion 1.2.6. The random variables in this model are the vector of polynomial coefficients w and the observed data ${ \mathbf t } = ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . In addition, this model contains the input data ${ \bf x } = ( x _ { 1 } , \ldots , x _ { N } ) ^ { \mathrm { T } }$ , the noise variance $\sigma ^ { 2 }$ , and the hyperparameter α representing the precision of the Gaussian prior over w, all of which are parameters of the model rather than random variables. Focussing just on the random variables for the moment, we see that the joint distribution is given by the product of the prior $p ( \mathbf { w } )$ and N conditional distributions $p ( t _ { n } | \mathbf { w } )$ for $n = 1 , \ldots , N$ so that

p (\mathbf {t}, \mathbf {w}) = p (\mathbf {w}) \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {w}).\tag{8.6}

This joint distribution can be represented by a graphical model shown in Figure 8.3.

When we start to deal with more complex models later in the book, we shall find it inconvenient to have to write out multiple nodes of the form $t _ { 1 } , \ldots , t _ { N }$ explicitly as in Figure 8.3. We therefore introduce a graphical notation that allows such multiple nodes to be expressed more compactly, in which we draw a single representative node $t _ { n }$ and then surround this with a box, called a plate, labelled with N indicating that there are N nodes of this kind. Re-writing the graph of Figure 8.3 in this way, we obtain the graph shown in Figure 8.4.

We shall sometimes find it helpful to make the parameters of a model, as well as its stochastic variables, explicit. In this case, (8.6) becomes

p (\mathbf {t}, \mathbf {w} | \mathbf {x}, \alpha , \sigma^ {2}) = p (\mathbf {w} | \alpha) \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {w}, x _ {n}, \sigma^ {2}).

Correspondingly, we can make x and α explicit in the graphical representation. To do this, we shall adopt the convention that random variables will be denoted by open circles, and deterministic parameters will be denoted by smaller solid circles. If we take the graph of Figure 8.4 and include the deterministic parameters, we obtain the graph shown in Figure 8.5.

When we apply a graphical model to a problem in machine learning or pattern recognition, we will typically set some of the random variables to specific observed

![image](images/part-002--e8f460716075b434be868f39fdc05886706ce9ebf0203c94a9f3e8778f068110.jpg)

Figure 8.5 This shows the same model as in Figure 8.4 but with the deterministic parameters shown explicitly by the smaller solid nodes.

![image](images/part-002--d1707e119346f218b8f27209d1ccad3d8038267e32990c9ee0a593ddc04dc410.jpg)

values, for example the variables $\{ t _ { n } \}$ from the training set in the case of polynomial curve fitting. In a graphical model, we will denote such observed variables by shading the corresponding nodes. Thus the graph corresponding to Figure 8.5 in which the variables $\left\{ { { t } _ { n } } \right\}$ are observed is shown in Figure 8.6. Note that the value of w is not observed, and so w is an example of a latent variable, also known as a hidden variable. Such variables play a crucial role in many probabilistic models and will form the focus of Chapters 9 and 12.

Having observed the values $\{ t _ { n } \}$ we can, if desired, evaluate the posterior distribution of the polynomial coefficients w as discussed in Section 1.2.5. For the moment, we note that this involves a straightforward application of Bayes’ theorem

p (\mathbf {w} | \mathbf {T}) \propto p (\mathbf {w}) \prod_ {n = 1} ^ {N} p (t _ {n} | \mathbf {w})\tag{8.7}

where again we have omitted the deterministic parameters in order to keep the notation uncluttered.

In general, model parameters such as w are of little direct interest in themselves, because our ultimate goal is to make predictions for new input values. Suppose we are given a new input value $\widehat { x }$ and we wish to find the corresponding probability distribution for $\widehat { t }$ conditioned on the observed data. The graphical model that describes this problem is shown in Figure 8.7, and the corresponding joint distribution of all of the random variables in this model, conditioned on the deterministic parameters, is then given by

p (\widehat {t}, \mathbf {t}, \mathbf {w} | \widehat {x}, \mathbf {x}, \alpha , \sigma^ {2}) = \left[ \prod_ {n = 1} ^ {N} p (t _ {n} | x _ {n}, \mathbf {w}, \sigma^ {2}) \right] p (\mathbf {w} | \alpha) p (\widehat {t} | \widehat {x}, \mathbf {w}, \sigma^ {2}).\tag{8.8}

Figure 8.6 As in Figure 8.5 but with the nodes $\left\{ t _ { n } \right\}$ shaded to indicate that the corresponding random variables have been set to their observed (training set) values.

![image](images/part-002--a488578cef6d1bdd56aa972edd90c1420ccffa892a3119ed2ad8aa5d4833ef03.jpg)

Figure 8.7 The polynomial regression model, corresponding to Figure 8.6, showing also a new input value $\breve { \widehat { x } }$ together with the corresponding model prediction ${ \widehat { t } } .$

![image](images/part-002--657dced2f6a9fbb08207550cd579d148f3087ce9277715e6d146c5f5bc30f2e2.jpg)

The required predictive distribution for $\widehat { t }$ is then obtained, from the sum rule of probability, by integrating out the model parameters w so that

p (\widehat {t} | \widehat {x}, \mathbf {x}, \mathbf {t}, \alpha , \sigma^ {2}) \propto \int p (\widehat {t}, \mathbf {t}, \mathbf {w} | \widehat {x}, \mathbf {x}, \alpha , \sigma^ {2}) \mathrm{d} \mathbf {w}

where we are implicitly setting the random variables in t to the specific values observed in the data set. The details of this calculation were discussed in Chapter 3.
