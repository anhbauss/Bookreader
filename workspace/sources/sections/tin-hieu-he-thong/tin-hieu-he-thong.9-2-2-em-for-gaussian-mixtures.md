---
id: "tin-hieu-he-thong.9-2-2-em-for-gaussian-mixtures"
doc_id: "tin-hieu-he-thong"
title: "9.2.2 EM for Gaussian mixtures"
level: 2
heading_path: ["Mixture Models and EM", "9.2.2 EM for Gaussian mixtures"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.9-2-1-maximum-likelihood"
next_id: "tin-hieu-he-thong.em-for-gaussian-mixtures"
block_ids: ["b4790", "b4791", "b4792", "b4793", "b4794", "b4795", "b4796", "b4797", "b4798", "b4799", "b4800", "b4801", "b4802", "b4803", "b4804", "b4805", "b4806", "b4807", "b4808", "b4809", "b4810", "b4811", "b4812", "b4813", "b4814", "b4815", "b4816", "b4817", "b4818"]
---

## 9.2.2 EM for Gaussian mixtures

An elegant and powerful method for finding maximum likelihood solutions for models with latent variables is called the expectation-maximization algorithm, or EM algorithm (Dempster et al., 1977; McLachlan and Krishnan, 1997). Later we shall give a general treatment of EM, and we shall also show how EM can be generalized to obtain the variational inference framework. Initially, we shall motivate the EM algorithm by giving a relatively informal treatment in the context of the Gaussian mixture model. We emphasize, however, that EM has broad applicability, and indeed it will be encountered in the context of a variety of different models in this book.

Let us begin by writing down the conditions that must be satisfied at a maximum of the likelihood function. Setting the derivatives of ln $p ( { \bf X } | \pi , \mu , \Sigma )$ in (9.14) with respect to the means $\mu _ { k }$ of the Gaussian components to zero, we obtain

0 = - \sum_ {n = 1} ^ {N} \underbrace {\frac {\pi_ {k} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k} , \boldsymbol {\Sigma} _ {k})}{\sum_ {j} \pi_ {j} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {j} , \boldsymbol {\Sigma} _ {j})}} _ {\gamma (z _ {n k})} \boldsymbol {\Sigma} _ {k} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k})\tag{9.16}

where we have made use of the form (2.43) for the Gaussian distribution. Note that the posterior probabilities, or responsibilities, given by (9.13) appear naturally on the right-hand side. Multiplying by $\Sigma _ { k } ^ { - 1 }$ (which we assume to be nonsingular) and rearranging we obtain

\pmb {\mu} _ {k} = \frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} \gamma (z _ {n k}) \mathbf {x} _ {n}\tag{9.17}

where we have defined

N _ {k} = \sum_ {n = 1} ^ {N} \gamma (z _ {n k}).\tag{9.18}

We can interpret $N _ { k }$ as the effective number of points assigned to cluster k. Note carefully the form of this solution. We see that the mean $\mu _ { k }$ for the $k ^ { \mathrm { t h } }$ Gaussian component is obtained by taking a weighted mean of all of the points in the data set, in which the weighting factor for data point ${ \bf x } _ { n }$ is given by the posterior probability $\gamma ( z _ { n k } )$ that component k was responsible for generating ${ \bf x } _ { n }$

If we set the derivative of ln $p ( { \bf X } | \pi , \mu , \Sigma )$ with respect to $\Sigma _ { k }$ to zero, and follow a similar line of reasoning, making use of the result for the maximum likelihood solution for the covariance matrix of a single Gaussian, we obtain

\pmb {\Sigma} _ {k} = \frac {1}{N _ {k}} \sum_ {n = 1} ^ {N} \gamma (z _ {n k}) (\mathbf {x} _ {n} - \pmb {\mu} _ {k}) (\mathbf {x} _ {n} - \pmb {\mu} _ {k}) ^ {\mathrm{T}}\tag{9.19}

which has the same form as the corresponding result for a single Gaussian fitted to the data set, but again with each data point weighted by the corresponding posterior probability and with the denominator given by the effective number of points associated with the corresponding component.

Finally, we maximize ln $p ( { \bf X } | \pi , \mu , \Sigma )$ with respect to the mixing coefficients $\pi _ { k }$ . Here we must take account of the constraint (9.9), which requires the mixing coefficients to sum to one. This can be achieved using a Lagrange multiplier and maximizing the following quantity

\ln p (\mathbf {X} | \boldsymbol {\pi}, \boldsymbol {\mu}, \boldsymbol {\Sigma}) + \lambda \left(\sum_ {k = 1} ^ {K} \pi_ {k} - 1\right)\tag{9.20}

which gives

0 = \sum_ {n = 1} ^ {N} \frac {\mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {k} , \boldsymbol {\Sigma} _ {k})}{\sum_ {j} \pi_ {j} \mathcal {N} (\mathbf {x} _ {n} | \boldsymbol {\mu} _ {j} , \boldsymbol {\Sigma} _ {j})} + \lambda\tag{9.21}

where again we see the appearance of the responsibilities. If we now multiply both sides by $\pi _ { k }$ and sum over k making use of the constraint (9.9), we find $\lambda = - N$ Using this to eliminate λ and rearranging we obtain

\pi_ {k} = \frac {N _ {k}}{N}\tag{9.22}

so that the mixing coefficient for the $k ^ { \mathrm { t h } }$ component is given by the average responsibility which that component takes for explaining the data points.

It is worth emphasizing that the results (9.17), (9.19), and (9.22) do not constitute a closed-form solution for the parameters of the mixture model because the responsibilities $\gamma ( z _ { n k } )$ depend on those parameters in a complex way through (9.13). However, these results do suggest a simple iterative scheme for finding a solution to the maximum likelihood problem, which as we shall see turns out to be an instance of the EM algorithm for the particular case of the Gaussian mixture model. We first choose some initial values for the means, covariances, and mixing coefficients. Then we alternate between the following two updates that we shall call the E step and the M step, for reasons that will become apparent shortly. In the expectation step, or E step, we use the current values for the parameters to evaluate the posterior probabilities, or responsibilities, given by (9.13). We then use these probabilities in the maximization step, or M step, to re-estimate the means, covariances, and mixing coefficients using the results (9.17), (9.19), and (9.22). Note that in so doing we first evaluate the new means using (9.17) and then use these new values to find the covariances using (9.19), in keeping with the corresponding result for a single Gaussian distribution. We shall show that each update to the parameters resulting from an E step followed by an M step is guaranteed to increase the log likelihood function. In practice, the algorithm is deemed to have converged when the change in the log likelihood function, or alternatively in the parameters, falls below some threshold. We illustrate the EM algorithm for a mixture of two Gaussians applied to the rescaled Old Faithful data set in Figure 9.8. Here a mixture of two Gaussians is used, with centres initialized using the same values as for the K-means algorithm in Figure 9.1, and with precision matrices initialized to be proportional to the unit matrix. Plot (a) shows the data points in green, together with the initial configuration of the mixture model in which the one standard-deviation contours for the two

![image](images/part-003--e599f8c3d1a536c459c1540c242dcfe1872418bc4ff3a477e7445824a77512c7.jpg)

![image](images/part-003--36233150eb8fd2d14bffe6916f1ae283d95e329a24e41da6f48c0cbf7c11c29a.jpg)

![image](images/part-003--da15c71d77212971f03552117c7a7d695c4e082ee23eecdc7884eeab909cb2eb.jpg)

![image](images/part-003--a5524f2cb65b79792f748bec0324f8931d6d3c0c0c0ee94a54ae96a01081e5c9.jpg)

![image](images/part-003--1fed2ad9db669b4a7d4d4a31f203ea83059ef3f475f34f76e8a247fdb1cd3fa5.jpg)

![image](images/part-003--1030baaae01b121b411b7b97962732af71a20ddf999364674b423c5cf04b0fd0.jpg)

Figure 9.8 Illustration of the EM algorithm using the Old Faithful set as used for the illustration of the K-means algorithm in Figure 9.1. See the text for details.

Gaussian components are shown as blue and red circles. Plot (b) shows the result of the initial E step, in which each data point is depicted using a proportion of blue ink equal to the posterior probability of having been generated from the blue component, and a corresponding proportion of red ink given by the posterior probability of having been generated by the red component. Thus, points that have a significant probability for belonging to either cluster appear purple. The situation after the first M step is shown in plot (c), in which the mean of the blue Gaussian has moved to the mean of the data set, weighted by the probabilities of each data point belonging to the blue cluster, in other words it has moved to the centre of mass of the blue ink. Similarly, the covariance of the blue Gaussian is set equal to the covariance of the blue ink. Analogous results hold for the red component. Plots (d), (e), and (f) show the results after 2, 5, and 20 complete cycles of EM, respectively. In plot (f) the algorithm is close to convergence.

Note that the EM algorithm takes many more iterations to reach (approximate) convergence compared with the K-means algorithm, and that each cycle requires significantly more computation. It is therefore common to run the K-means algorithm in order to find a suitable initialization for a Gaussian mixture model that is subsequently adapted using EM. The covariance matrices can conveniently be initialized to the sample covariances of the clusters found by the K-means algorithm, and the mixing coefficients can be set to the fractions of data points assigned to the respective clusters. As with gradient-based approaches for maximizing the log likelihood, techniques must be employed to avoid singularities of the likelihood function in which a Gaussian component collapses onto a particular data point. It should be emphasized that there will generally be multiple local maxima of the log likelihood function, and that EM is not guaranteed to find the largest of these maxima. Because the EM algorithm for Gaussian mixtures plays such an important role, we summarize it below.
