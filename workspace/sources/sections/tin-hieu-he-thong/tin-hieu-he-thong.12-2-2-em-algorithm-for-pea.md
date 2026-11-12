---
id: "tin-hieu-he-thong.12-2-2-em-algorithm-for-pea"
doc_id: "tin-hieu-he-thong"
title: "12.2.2 EM algorithm for peA"
level: 2
heading_path: ["Sampling Methods", "12.2.2 EM algorithm for peA"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-2-1-maximum-likelihood-pea"
next_id: "tin-hieu-he-thong.ewrrise-2-7"
block_ids: ["b6309", "b6310", "b6311", "b6312", "b6313", "b6314", "b6315", "b6316", "b6317", "b6318", "b6319", "b6320", "b6321", "b6322", "b6323", "b6324", "b6325", "b6326", "b6327", "b6328", "b6329", "b6330", "b6331", "b6332", "b6333"]
---

## 12.2.2 EM algorithm for peA

As we have seen, the probabilistic PCA model can be expressed in terms of a marginalization over a continuous latent space z in which for each data point ${ \bf x } _ { n } ,$ there is a corresponding latent variable $\mathbf { z } _ { n }$ . We can therefore make use of the EM algorithm to find maximum likelihood estimates of the model parameters. This may seem rather pointless because we have already obtained an exact closed-form solution for the maximum likelihood parameter values. However, in spaces of high dimensionality, there may be computational advantages in using an iterative EM procedure rather than working directly with the sample covariance matrix. This EM procedure can also be extended to the factor analysis model, for which there is no closed-form solution. Finally, it allows missing data to be handled in a principled way.

We can derive the EM algorithm for probabilistic PCA by following the general framework for EM. Thus we write down the complete-data log likelihood and take its expectation with respect to the posterior distribution of the latent distribution evaluated using 'old' parameter values. Maximization of this expected completedata log likelihood then yields the 'new' parameter values. Because the data points are assumed independent, the complete-data log likelihood function takes the form

\ln p \left(\mathbf {X}, \mathbf {Z} | \pmb {\mu}, \mathbf {W}, \sigma^ {2}\right) = \sum_ {n = 1} ^ {N} \left\{\ln p (\mathbf {x} _ {n} | \mathbf {z} _ {n}) + \ln p (\mathbf {z} _ {n}) \right\}\tag{12.52}

where the $n ^ { \mathrm { t h } }$ row of the matrix Z is given by $\mathbf { z } _ { n }$ . We already know that the exact maximum likelihood solution for $\mu$ is given by the sample mean x defined by (12.1), and it is convenient to substitute for $\pmb { \mu }$ at this stage. Making use of the expressions (12.31) and (12.32) for the latent and conditional distributions, respectively, and taking the expectation with respect to the posterior distribution over the latent variables, we obtain

\begin{array}{l} \mathbb {E} [ \ln p (\mathbf {X}, \mathbf {Z} | \boldsymbol {\mu}, \mathbf {W}, \sigma^ {2}) ] = - \sum_ {n = 1} ^ {N} \left\{\frac {D}{2} \ln (2 \pi \sigma^ {2}) + \frac {1}{2} \operatorname{Tr} \left(\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ]\right) \right. \\ \left. + \frac {1}{2 \sigma^ {2}} \| \mathbf {x} _ {n} - \boldsymbol {\mu} \| ^ {2} - \frac {1}{\sigma^ {2}} \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \mathbf {W} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \boldsymbol {\mu}) \right. \\ \left. + \frac {1}{2 \sigma^ {2}} \operatorname{Tr} \left(\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] \mathbf {W} ^ {\mathrm{T}} \mathbf {W}\right) \right\}. \end{array} \tag {12.53}

Note that this depends on the posterior distribution only through the sufficient statistics of the Gaussian. Thus in the E step, we use the old parameter values to evaluate

{\mathbb {E} [ \mathbf {z} _ {n} ]} = {\mathbf {M} ^ {- 1} \mathbf {W} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}})}\tag{12.54}

{\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ]} = {\sigma^ {2} \mathbf {M} ^ {- 1} + \mathbb {E} [ \mathbf {z} _ {n} ] \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}}}\tag{12.55}

which follow directly from the posterior distribution (12.42) together with the stan dard result $\mathbb { E } [ \mathbf { z } _ { n } \mathbf { z } _ { n } ^ { \mathrm { T } } ] \stackrel { \cdot } { = } \mathrm { c o v } [ \mathbf { z } _ { n } ] \stackrel { \cdot } { + } \mathbb { E } [ \mathbf { z } _ { n } ] \mathbb { E } [ \mathbf { z } _ { n } ] ^ { \mathrm { T } }$ . Here M is defined by (12.41).

In the M step, we maximize with respect to Wand $\sigma ^ { 2 }$ , keeping the posterior statistics fixed. Maximization with respect to $\sigma ^ { 2 }$ is straightforward. For the maximization with respect to W we make use of (C.24), and obtain the M-step equations

Exercise 12.15

{\mathbf {W} _ {\mathrm{new}}} = {\left[ \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \right] \left[ \sum_ {n = 1} ^ {N} \mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] \right] ^ {- 1}}\tag{12.56}

\begin{array}{r l r} \sigma_ {\mathrm{new}} ^ {2} & = & \frac {1}{N D} \sum_ {n = 1} ^ {N} \left\{\| \mathbf {x} _ {n} - \overline {{\mathbf {x}}} \| ^ {2} - 2 \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{new}} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) \right. \\ & & \left. + \mathrm{Tr} \left(\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] \mathbf {W} _ {\mathrm{new}} ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{new}}\right) \right\}. \end{array}\tag{12.57}

The EM algorithm for probabilistic PCA proceeds by initializing the parameters and then alternately computing the sufficient statistics of the latent space posterior distribution using (12.54) and (12.55) in the E step and revising the parameter values using (12.56) and (12.57) in the M step.

One of the benefits of the EM algorithm for PCA is computational efficiency for large-scale applications (Roweis, 1998). Unlike conventional PCA based on an eigenvector decomposition of the sample covariance matrix, the EM approach is iterative and so might appear to be less attractive. However, each cycle of the EM algorithm can be computationally much more efficient than conventional PCA in spaces of high dimensionality. To see this, we note that the eigendecomposition of the covariance matrix requires $O ( D ^ { 3 } )$ computation. Often we are interested only in the first M eigenvectors and their corresponding eigenvalues, in which case we can use algorithms that are $O ( M D ^ { 2 } )$ . However, the evaluation of the covariance matrix itself takes $O ( N D ^ { 2 } )$ computations, where N is the number of data points. Algorithms such as the snapshot method (Sirovich, 1987), which assume that the eigenvectors are linear combinations of the data vectors, avoid direct evaluation of the covariance matrix but are $O ( N ^ { 3 } )$ and hence unsuited to large data sets. The EM algorithm described here also does not construct the covariance matrix explicitly. Instead, the most computationally demanding steps are those involving sums over the data set that are $O ( N D M )$ . For large $D _ { v }$ , and $M \ll D$ , this can be a significant saving compared to $O ( N D ^ { 2 } )$ and can offset the iterative nature of the EM algorithm.

Note that this EM algorithm can be implemented in an on-line form in which each D-dimensional data point is read in and processed and then discarded before the next data point is considered. To see this, note that the quantities evaluated in the E step (an M-dimensional vector and an $M \times M$ matrix) can be computed for each data point separately, and in the M step we need to accumulate sums over data points, which we can do incrementally. This approach can be advantageous if both Nand D are large.

Because we now have a fully probabilistic model for PCA, we can deal with missing data, provided that it is missing at random, by marginalizing over the distribution of the unobserved variables. Again these missing values can be treated using the EM algorithm. We give an example of the use of this approach for data visualization in Figure 12.11.

Another elegant feature ofthe EM approach is that we can take the limit $\sigma ^ { 2 } \to 0$ corresponding to standard PCA, and still obtain a valid EM-like algorithm (Roweis, 1998). From (12.55), we see that the only quantity we need to compute in the Estep is $\mathbb { E } [ \mathbf { z } _ { n } ]$ . Furthermore, the M step is simplifie~ because $\mathbf { M } = \mathbf { W } ^ { \mathrm { T } } \bar { \mathbf { W } }$ . To emphasize the simplicity of the algorithm, let us define $\widetilde { \mathbf { X } }$ to be a matrix of size $N \times D$ whose $n ^ { \mathrm { t h } }$ row is given by the vector ${ \bf x } _ { n } - \overline { { \bf x } }$ and similarly define 0 to be a matrix of size $D \times M$ whose $n ^ { \mathrm { t h } }$ row is given by the vector $\mathbb { E } [ \mathbf { z } _ { n } ]$ . The Estep (12.54) of the EM algorithm for PCA then becomes

\boldsymbol {\Omega} = (\mathbf {W} _ {\mathrm{old}} ^ {\mathrm{T}} \mathbf {W} _ {\mathrm{old}}) ^ {- 1} \mathbf {W} _ {\mathrm{old}} ^ {\mathrm{T}} \widetilde {\mathbf {X}}\tag{12.58}

and the M step (12.56) takes the form

\mathbf {W} _ {\mathrm{new}} = \widetilde {\mathbf {X}} ^ {\mathrm{T}} \boldsymbol {\Omega} ^ {\mathrm{T}} (\boldsymbol {\Omega} \boldsymbol {\Omega} ^ {\mathrm{T}}) ^ {- 1}.\tag{12.59}

Again these can be implemented in an on-line form. These equations have a simple interpretation as follows. From our earlier discussion, we see that the E step involves an orthogonal projection of the data points onto the current estimate for the principal subspace. Correspondingly, the M step represents a re-estimation of the principa

![image](images/part-004--f06ea34d1cb9e27cffcd76a1da46fc32cf2c20dd41da015129f157153fc40cf5.jpg)

Fig".. 12.11 Probabilistic PCA visoo,zsbon 01 a portion 0I1he "" !low data setlo< Ihe !irsl 100 (lata »einls, The left..,...nd plot oIIOWS Ihe I'O"leoo< mean proj9c1ions oIlhfI (lata poims on lhe principal subspace. The ,;gtrI·hi\nd plot is obtained by firsl ran<lomly omitting 30% 0I1he variable .aloo. and lhen us>rlg EM 10 MndIe I"" mi...... values. Note I!IaI eac/1 data poinl1hen NoS allea., one missing mea.u,ement but lhoallhe plot i. ""ry ..mia, to lhe ona obtained wit"""l miss.... valL>ll$
