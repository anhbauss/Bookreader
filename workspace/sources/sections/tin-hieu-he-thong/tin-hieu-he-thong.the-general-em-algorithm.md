---
id: "tin-hieu-he-thong.the-general-em-algorithm"
doc_id: "tin-hieu-he-thong"
title: "The General EM Algorithm"
level: 2
heading_path: ["Mixture Models and EM", "The General EM Algorithm"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-3-an-alternative-view-of-em"
next_id: "tin-hieu-he-thong.9-3-1-gaussian-mixtures-revisited"
block_ids: ["b4846", "b4847", "b4848", "b4849", "b4850", "b4851", "b4852", "b4853", "b4854", "b4855", "b4856"]
---

## The General EM Algorithm

Given a joint distribution $p ( \mathbf { X } , \mathbf { Z } | \boldsymbol { \theta } )$ over observed variables X and latent variables Z, governed by parameters θ, the goal is to maximize the likelihood function $p ( \mathbf { X } | \pmb { \theta } )$ with respect to $\pmb { \theta } .$

1. Choose an initial setting for the parameters $\pmb { \theta } ^ { \mathrm { o l d } }$
2. E step Evaluate $p ( { \bf Z } | { \bf X } , \boldsymbol { \theta } ^ { \mathrm { o l d } } )$
3. M step Evaluate $\pmb { \theta } ^ { \mathrm { n e w } }$ given by

\boldsymbol {\theta} ^ {\text { new }} = \underset {\boldsymbol {\theta}} {\arg \max} \mathcal {Q} (\boldsymbol {\theta}, \boldsymbol {\theta} ^ {\text { old }})\tag{9.32}

where

\mathcal {Q} (\pmb {\theta}, \pmb {\theta} ^ {\mathrm{old}}) = \sum_ {\mathbf {Z}} p (\mathbf {Z} | \mathbf {X}, \pmb {\theta} ^ {\mathrm{old}}) \ln p (\mathbf {X}, \mathbf {Z} | \pmb {\theta}).\tag{9.33}

4. Check for convergence of either the log likelihood or the parameter values. If the convergence criterion is not satisfied, then let

\boldsymbol {\theta} ^ {\mathrm{old}} \leftarrow \boldsymbol {\theta} ^ {\mathrm{new}}\tag{9.34}

and return to step 2.

The EM algorithm can also be used to find MAP (maximum posterior) solutions for models in which a prior $p ( \pmb \theta )$ is defined over the parameters. In this case the E step remains the same as in the maximum likelihood case, whereas in the M step the quantity to be maximized is given by $\mathcal { Q } ( \pmb { \theta } , \pmb { \theta } ^ { \mathrm { o l d } } ) + \ln p ( \pmb { \theta } )$ . Suitable choices for the prior will remove the singularities of the kind illustrated in Figure 9.7.

Here we have considered the use of the EM algorithm to maximize a likelihood function when there are discrete latent variables. However, it can also be applied when the unobserved variables correspond to missing values in the data set. The distribution of the observed values is obtained by taking the joint distribution of all the variables and then marginalizing over the missing ones. EM can then be used to maximize the corresponding likelihood function. We shall show an example of the application of this technique in the context of principal component analysis in Figure 12.11. This will be a valid procedure if the data values are missing at random, meaning that the mechanism causing values to be missing does not depend on the unobserved values. In many situations this will not be the case, for instance if a sensor fails to return a value whenever the quantity it is measuring exceeds some threshold.
