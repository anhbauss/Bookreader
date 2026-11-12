---
id: "tin-hieu-he-thong.12-2-4-factor-analysis"
doc_id: "tin-hieu-he-thong"
title: "12.2.4 Factor analysis"
level: 2
heading_path: ["Sampling Methods", "12.2.4 Factor analysis"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-2-3-bayesian-pea"
next_id: "tin-hieu-he-thong.12-3-kernel-pea"
block_ids: ["b6368", "b6369", "b6370", "b6371", "b6372", "b6373", "b6374", "b6375", "b6376", "b6377", "b6378", "b6379", "b6380", "b6381", "b6382", "b6383", "b6384", "b6385", "b6386", "b6387", "b6388", "b6389", "b6390", "b6391", "b6392"]
---

## 12.2.4 Factor analysis

Factor analysis is a linear-Gaussian latent variable model that is closely related to probabilistic PCA. Its definition differs from that of probabilistic PCA only in that the conditional distribution of the observed variable x given the latent variable z is taken to have a diagonal rather than an isotropic covariance so that

![image](images/part-004--57229e54c0b5f1d138c830c4d439279bcceb03e8f0128350b84a92adc2b658f9.jpg)

![image](images/part-004--9ed0142cd9d06c62628a292f2f73da17457daa4fd05984df499016380b06a227.jpg)

Figure 12.14 'Hinloo' diagrams of the matrix W in which each element 01 the matrix is depicted as a square (white lor positive and black lor negative values) whose area is proportiona to the magnitude of that element. The synthetic data sel comprises 300 data points in D = 10 dimensions sampled from a Gaussian distribution having standard deviation 1.0 in 3 directions and standard deviation 0.5 in the remaining 7 directions for a data set in D = 10 dimensions having AT = 3 directions with larger variance than the remaining 7 directions. The left-hand plol shows the result Irom maximum likelihood probabilistic PCA, and the left·hand plot shows the corresponding resuft from Bayesian peA. We see how the Bayesian model is able to discover the appropriate dimensionality by suppressing the 6 surplus degrees of freedom.

p (\mathbf {x} | \mathbf {z}) = \mathcal {N} (\mathbf {x} | \mathbf {W} \mathbf {z} + \boldsymbol {\mu}, \boldsymbol {\Psi})\tag{12.64}

where ill is a $D \times D$ diagonal matrix. Note that the factor analysis model, in common with probabilistic PCA. assumes that the observed variables $x _ { 1 } , \ldots , x _ { D }$ are independent. given the latent variable z. In essence. the factor analysis model is explaining the observed covariance structure of the data by representing the independent variance associated with each coordinate in the matrix 1J.' and capturing the covariance between variables in the matrix W. In the factor analysis literature. the columns of W. which capture the correlations between observed variables. are calledfaclOr loadings. and the diagonal elements of 1J.'. which represent the independent noise variances for each of the variables, are called llniqllenesses.

The origins of factor analysis are as old as those of PCA. and discussions of factor analysis can be found in the books by Everitt (1984). Bartholomew (1987), and Basilevsky (1994). Links between factor analysis and PCA were investigated by Lilwley (1953) and Anderson (1963) who showed that at stationary points o the likelihood function. for a faclOr analysis model with $\boldsymbol { \Psi } = \sigma ^ { 2 } \mathbf { I }$ , the columns o W are scaled eigenvectors of the sample covariance matrix. and $\sigma ^ { 2 }$ is the average of the discarded eigenvalues. Later. Tipping and Bishop (1999b) showed that the maximum of the log likelihood function occurs when the eigenvectors comprising Ware chosen to be the principal eigenvectors.

Making use of (2.115). we see that the marginal distribution for the observed

Gillbs .,,,,>p!j"lllo< Bay<lslan PCA sh<Ming plots oj In $\alpha _ { i }$ versus ~eralion number br three " values. showing tr"""tions betw..... tbe th"'" moOts <A !he posterior distribution.

![image](images/part-004--1bd3bc01860e57f91fe52a86e7ccf4104faf213f15b555214529db7c5204af1c.jpg)

,-"riabl, i' gi,-,n by $p ( \mathbf { x } ) = \mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \mathbf { C } )$ whe... now

\mathbf {C} = \mathbf {W} \mathbf {W} ^ {\mathrm{T}} + \boldsymbol {\Psi}.\tag{12.65}

As with probabilistic PC A, thi, moMI is im-"ri.rrl to 'Olalions in 11><0 latent 'pace.

Histoocally, factor anal)',;s has been lhe ,ubjerl of cOl1tro,-ersy wroe" a!tempt< h",-e bttn "'a<k: to place an intc'P"'t"lioo on the ind;vidual faclon (the cOOfdinates in z_space). which h3.\ pm"en problematic due to lr.e """i<lcmifiabilily of factOf analysis associmed with Mation' in this 'pace. From oor perspeoh-e, howe,-er. we shall .iew factor analysis as a form of lalent "ariable densily model. in which the form of tl>c lalent 'pace i' of interest but nO! the particular choicc of coordinates used to descrit>c il. If we wish to remove the degeneracy a'sociated with latent 'pace roIations. ""e mu,t con'ider non-Gaussian latent ,-"riable di'tribution,. gi"irrg rise 10 independent component .n.lysi, (lCA) models.

We can detenni"e the parameters $\mu ,$ . \V. "nd .... in the fac!Of an.ly,i, model by muimum likelihood. 11.. solution for $\mu$ i' ag"in given by the ",,,,pie "'ean. How· eyC'. "nli~e probabili,tic l'CA.lllcre i' no longer a closed-form maximum likelihood solution for \V. ",'hich mu.\ltherdorc be found i'er.li,'c1)'_ Because faclor anal)',i. is a latent variable modeL thi' can be don. using an EM algorilhm (R.bin and Thayer. 1982) !h"t is "nalogou, to the one used (Of pml>;lbili.tie PeA. Specihcally. lhe E-'lep eqnJtioo, are g;'-en by

\mathbb {E} [ \mathbf {z} _ {n} ] = \mathbf {G W} ^ {\mathrm{T}} \boldsymbol {\Psi} ^ {- 1} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}})\tag{12.66}

{\mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ]} = {\mathbf {G} + \mathbb {E} [ \mathbf {z} _ {n} ] \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}}}\tag{12.67}

where ""e h",'e defi""d

\mathbf {G} = (\mathbf {I} + \mathbf {W} ^ {\mathrm{T}} \boldsymbol {\Psi} ^ {- 1} \mathbf {W}) ^ {- 1}.\tag{12.68}

NOie th"t thi' i' e.pre,<ed in a for'" thai in,-oh'es inycrsi"n ofmal rices "f SilO $M \times M$ rathe'lhan $D \times D$ (ex"",,,, for tbe $D \times D$ diagooal matrix $\Psi$ "'hose in,-erse i.' 'ri"ial to compute in $O ( D )$ steps), which is convenient because often $M \ll D$ . Similarly, the M-step equations take the form

{\mathbf {W} ^ {\mathrm{new}}} = {\left[ \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \right] \left[ \sum_ {n = 1} ^ {N} \mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] \right] ^ {- 1}}\tag{12.69}

{\boldsymbol {\Psi} ^ {\mathrm{new}}} = {\mathrm{diag} \left\{\mathbf {S} - \mathbf {W} _ {\mathrm{new}} \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbb {E} [ \mathbf {z} _ {n} ] (\mathbf {x} _ {n} - \overline {{{\mathbf {x}}}}) ^ {\mathrm{T}} \right\}}\tag{12.70}

where the 'diag' operator sets all of the nondiagonal elements of a matrix to zero. A Bayesian treatment of the factor analysis model can be obtained by a straightforward application of the techniques discussed in this book.

Another difference between probabilistic PCA and factor analysis concerns their different behaviour under transformations of the data set. For PCA and probabilistic PCA, if we rotate the coordinate system in data space, then we obtain exactly the same fit to the data but with the W matrix transformed by the corresponding rotation matrix. However, for factor analysis, the analogous property is that if we make a component-wise re-scaling of the data vectors, then this is absorbed into a corresponding re-scaling of the elements of $\Psi$
