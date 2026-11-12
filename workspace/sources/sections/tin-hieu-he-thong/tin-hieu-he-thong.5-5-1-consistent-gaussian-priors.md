---
id: "tin-hieu-he-thong.5-5-1-consistent-gaussian-priors"
doc_id: "tin-hieu-he-thong"
title: "5.5.1 Consistent Gaussian priors"
level: 2
heading_path: ["Neural Networks", "5.5.1 Consistent Gaussian priors"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-5-regularization-in-neural-networks"
next_id: "tin-hieu-he-thong.5-5-2-early-stopping"
block_ids: ["b2950", "b2951", "b2952", "b2953", "b2954", "b2955", "b2956", "b2957", "b2958", "b2959", "b2960", "b2961", "b2962", "b2963", "b2964", "b2965", "b2966", "b2967", "b2968", "b2969", "b2970", "b2971", "b2972", "b2973", "b2974", "b2975", "b2976", "b2977", "b2978", "b2979", "b2980"]
---

## 5.5.1 Consistent Gaussian priors

One of the limitations of simple weight decay in the form (5.112) is that is inconsistent with certain scaling properties of network mappings. To illustrate this, consider a multilayer perceptron network having two layers of weights and linear output units, which performs a mapping from a set of input variables $\{ x _ { i } \}$ to a set of output variables $\left\{ y _ { k } \right\}$ . The activations of the hidden units in the first hidden layer

Plot of the sum-of-squares test-set error for the polynomial data set versus the number of hidden units in the network, with 30 random starts for each network size, showing the effect of local minima. For each new start, the weight vector was initialized by sampling from an isotropic Gaussian distribution having a mean of zero and a variance of 10.

![image](images/part-002--8292670adee4bb3b49945f93749491f88ab20742753ddedac4b9fbd25cfffe71.jpg)

take the form

z _ {j} = h \left(\sum_ {i} w _ {j i} x _ {i} + w _ {j 0}\right)\tag{5.113}

while the activations of the output units are given by

y _ {k} = \sum_ {j} w _ {k j} z _ {j} + w _ {k 0}.\tag{5.114}

Suppose we perform a linear transformation of the input data of the form

x _ {i} \rightarrow \widetilde {x} _ {i} = a x _ {i} + b.\tag{5.115}

Then we can arrange for the mapping performed by the network to be unchanged by making a corresponding linear transformation of the weights and biases from the inputs to the units in the hidden layer of the form

Exercise 5.24

w _ {j i} \rightarrow \widetilde {w} _ {j i} = \frac {1}{a} w _ {j i}\tag{5.116}

w _ {j 0} \rightarrow \widetilde {w} _ {j 0} = w _ {j 0} - \frac {b}{a} \sum_ {i} w _ {j i}.\tag{5.117}

Similarly, a linear transformation of the output variables of the network of the form

y _ {k} \rightarrow \widetilde {y} _ {k} = c y _ {k} + d\tag{5.118}

can be achieved by making a transformation of the second-layer weights and biases using

w _ {k j} \rightarrow \widetilde {w} _ {k j} = c w _ {k j}\tag{5.119}

w _ {k 0} \rightarrow \widetilde {w} _ {k 0} = c w _ {k 0} + d.\tag{5.120}

If we train one network using the original data and one network using data for which the input and/or target variables are transformed by one of the above linear transformations, then consistency requires that we should obtain equivalent networks that differ only by the linear transformation of the weights as given. Any regularizer should be consistent with this property, otherwise it arbitrarily favours one solution over another, equivalent one. Clearly, simple weight decay (5.112), that treats all weights and biases on an equal footing, does not satisfy this property.

We therefore look for a regularizer which is invariant under the linear transformations (5.116), (5.117), (5.119) and (5.120). These require that the regularizer should be invariant to re-scaling of the weights and to shifts of the biases. Such a regularizer is given by

\frac {\lambda_ {1}}{2} \sum_ {w \in \mathcal {W} _ {1}} w ^ {2} + \frac {\lambda_ {2}}{2} \sum_ {w \in \mathcal {W} _ {2}} w ^ {2}\tag{5.121}

where $\mathcal { W } _ { 1 }$ denotes the set of weights in the first layer, $\mathcal { W } _ { 2 }$ denotes the set of weights in the second layer, and biases are excluded from the summations. This regularizer will remain unchanged under the weight transformations provided the regularization parameters are re-scaled using $\lambda _ { 1 } \stackrel {  } {  } \stackrel {  } { a } ^ { 1 / 2 } \lambda _ { 1 }$ and $\lambda _ { 2 }  c ^ { \hat { - } 1 / 2 } \lambda _ { 2 }$

The regularizer (5.121) corresponds to a prior of the form

p (\mathbf {w} | \alpha_ {1}, \alpha_ {2}) \propto \exp \left(- \frac {\alpha_ {1}}{2} \sum_ {w \in \mathcal {W} _ {1}} w ^ {2} - \frac {\alpha_ {2}}{2} \sum_ {w \in \mathcal {W} _ {2}} w ^ {2}\right).\tag{5.122}

Note that priors of this form are improper (they cannot be normalized) because the bias parameters are unconstrained. The use of improper priors can lead to difficulties in selecting regularization coefficients and in model comparison within the Bayesian framework, because the corresponding evidence is zero. It is therefore common to include separate priors for the biases (which then break shift invariance) having their own hyperparameters. We can illustrate the effect of the resulting four hyperparameters by drawing samples from the prior and plotting the corresponding network functions, as shown in Figure 5.11.

More generally, we can consider priors in which the weights are divided into any number of groups $\mathcal { W } _ { k }$ so that

p (\mathbf {w}) \propto \exp \left(- \frac {1}{2} \sum_ {k} \alpha_ {k} \| \mathbf {w} \| _ {k} ^ {2}\right)\tag{5.123}

where

\| \mathbf {w} \| _ {k} ^ {2} = \sum_ {j \in \mathcal {W} _ {k}} w _ {j} ^ {2}.\tag{5.124}

As a special case of this prior, if we choose the groups to correspond to the sets of weights associated with each of the input units, and we optimize the marginal likelihood with respect to the corresponding parameters $\alpha _ { k }$ , we obtain automatic relevance determination as discussed in Section 7.2.2.
