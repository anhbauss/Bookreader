---
id: "tin-hieu-he-thong.12-2-3-bayesian-pea"
doc_id: "tin-hieu-he-thong"
title: "12.2.3 Bayesian peA"
level: 2
heading_path: ["Sampling Methods", "12.2.3 Bayesian peA"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.ewrrise-2-7"
next_id: "tin-hieu-he-thong.12-2-4-factor-analysis"
block_ids: ["b6337", "b6338", "b6339", "b6340", "b6341", "b6342", "b6343", "b6344", "b6345", "b6346", "b6347", "b6348", "b6349", "b6350", "b6351", "b6352", "b6353", "b6354", "b6355", "b6356", "b6357", "b6358", "b6359", "b6360", "b6361", "b6362", "b6363", "b6364", "b6365", "b6366", "b6367"]
---

## 12.2.3 Bayesian peA

S<J far in OIlr di",""ioo of PeA. we have ",'.nled Ihal tile '"Ine ,II for ,lie dl,nen,ionalit)" of tile principal .ubspace is gi"en, In praclice. ".-e nlmt cOOose a suilable ,..I"" according 10 the application. For ,isuali,a,ion. we ge""",ny choose .\1 = 2. whereas for OIher application, the approrrialC choice for ,1/ ma)" be less dea,. One appmao:h i. 10 pi", the eigen"alue 'peclrum for lhe data set. analog,•." 10 the example in Figure 12.4 for the off_line digits dala SCI, and look to see if lite eige",,,I .... nmurally form two groups comprising a set of ,mall ,'alues separated by a ,ign;flcant gap from a ",t of relativel)" large ,'alues, indicating a natural cholcc f<>r AI, In practice. such a gap i, oflen ''''' seen

![image](images/part-004--44d961abfd5e025a8dc459a52a87045677229af66828b1fdc2c317b5027d8046.jpg)

![image](images/part-004--5fc53ce8e8321070e373582a57f5543d49dbb4fb6c76c36ee5c2ba368484c904.jpg)

![image](images/part-004--5a222952220820be5bb215dd944c075bc5354c83b08cc65d44588709ec8d8b92.jpg)

![image](images/part-004--fe90462b74f40be5da41a8277ca2b68ac27e79b211ba80d56ddc39bbbe3b97b0.jpg)

![image](images/part-004--9236b3b384a88175b716ebebfac60ec8244ba30a97f030be589dde9c00e24e39.jpg)

![image](images/part-004--64e5f047d89a81c518310913ca75193e8a2df949f59ddea88c0c194a648f598d.jpg)

Flgu.. 12.12 Synt"'elic <lata illustrating too EM algorithm !of PCA defined by (12.58) and (1259). (8) A data set X with the data points shown in 1JI'e«l, t"ll"tM' W'i1!1l!>e t'IM pMdpal """"""",IS (shown as eigenveclor1 scaled by It>e squafll 'OOIS 04 the eigeJ'l\lllluel). (b) Initial configurat"'" 01 too principalsul>sl>a<:<t defined by W, shown in md, tOO"lhfIr with the fK'(Ijeclions 01 the latll<11 points Z inlo too <lata space, giItoo by $\mathbf { Z } \mathbf { W } ^ { \mathrm { T } }$ , shown in cyan, (oj Alter""" M step, too laten! SI'B«l P>as been update<! wiIh Z r>el(l nxed. (d) Me' tt>e success.... E Slep, It>e ""'-'eo 01 Z havu been up<!atll<:1. '" Ihogoooal r>rojecliQn$, with W h&k! fixed. (e) Aft.... tile se<:o<l<l M S!flp. <') After l!Ie <sub>MC()<>;l</sub> E st"l'

Be<:au,", th~ pm/xlhi li>lic PeA modd has a well·defined likelillood f"flCtion, we <wId employ cros,-,-.1idation to delermine the \"aJue of di"",nsiooa!ity by "'Iecting tit<: large,t log likelihood t>I1 a '-alidation data set Such an opprooch. hov.·~\-er. can become computationally ro<lly. p3rticularl)' if we CQnsid<:, • probabilistic miXlUre of PeA modds (Tipping and Bishop. 1999a) in "hich we seek 10 <!etermi'" the appropriate dimen,ionalily ",paraltly for toch componenl in lt1e mixm""

<sub>Gi'-en thai</sub> w. <sub>ha,-e a probabilislic formulalion of PeA, il s«ms natural 10 s«k</sub> u Buye,ian approach 10 model seleclion. To do thi,. ,,"'e nee<! 10 marginalize 001 the model paramele" $\mu ,$ . \V. und $\sigma ^ { 2 }$ wilh ""peel to appropriate prior distribution'. This Can be done by u,ing a ,-ariation.l framework to .pproxim'le the allulylic.lly intractable murginaliUOi;oo, (Bi,hop. 1mb). 1lIc marginal likelihood v.lues. given by ttle ,'ari.,ionallower bour.d, cun lhen be c<>mpun:d for a r.nge of different '"Tue "f;\I ar.d Itie '"Iue giving Iht largest marginal likelihood ",Iecloo_

l1ere we consider. simpler approach introducoo by b.ased on the rddmu "p-

Figure 12.13 Probabilistic graphical model for Bayesian peA in which the distribution over the parameter matrix W is governed by a vector a of hyperparameters.

![image](images/part-004--77e1e1c53db412e171ce9821c2a403ef4b0528ee4745a930a499e9cedf1bf194.jpg)

proximation, which is appropriate when the number of data points is relatively large and the corresponding posterior distribution is tightly peaked (Bishop, 1999a). It involves a specific choice of prior over W that allows surplus dimensions in the principal subspace to be pruned out of the model. This corresponds to an example of automatic relevance determination, or ARD, discussed in Section 7.2.2. Specifically, we define an independent Gaussian prior over each column of W, which represent the vectors defining the principal subspace. Each such Gaussian has an independent variance governed by a precision hyperparameter $\alpha _ { i }$ so that

p (\mathbf {W} | \boldsymbol {\alpha}) = \prod_ {i = 1} ^ {M} \left(\frac {\alpha_ {i}}{2 \pi}\right) ^ {D / 2} \exp \left\{- \frac {1}{2} \alpha_ {i} \mathbf {w} _ {i} ^ {\mathrm{T}} \mathbf {w} _ {i} \right\}\tag{12.60}

where $\mathbf { w } _ { i }$ is the $i ^ { \mathrm { t h } }$ column of W. The resulting model can be represented using the directed graph shown in Figure 12.13.

The values for $\alpha _ { i }$ will be found iteratively by maximizing the marginallikelihood function in which W has been integrated out. As a result of this optimization, some of the $\alpha _ { i }$ may be driven to infinity, with the corresponding parameters vector $\mathbf { w } _ { i }$ being driven to zero (the posterior distribution becomes a delta function at the origin) giving a sparse solution. The effective dimensionality of the principal subspace is then determined by the number of finite $\alpha _ { i }$ values, and the corresponding vectors $\mathbf { w } _ { i }$ can be thought of as 'relevant' for modelling the data distribution. In this way, the Bayesian approach is automatically making the trade-off between improving the fit to the data, by using a larger number of vectors $\mathbf { w } _ { i }$ with their corresponding eigenvalues $\lambda _ { i }$ each tuned to the data, and reducing the complexity o the model by suppressing some of the ${ \bf w } _ { i }$ vectors. The origins of this sparsity were discussed earlier in the context of relevance vector machines.

The values of $\alpha _ { i }$ are re-estimated during training by maximizing the log marginal likelihood given by

p (\mathbf {X} | \boldsymbol {\alpha}, \boldsymbol {\mu}, \sigma^ {2}) = \int p (\mathbf {X} | \mathbf {W}, \boldsymbol {\mu}, \sigma^ {2}) p (\mathbf {W} | \boldsymbol {\alpha}) \mathrm{d} \mathbf {W}\tag{12.61}

where the log of $p ( \mathbf { X } | \mathbf { W } , \mu , \sigma ^ { 2 } )$ is given by (12.43). Note that for simplicity we also treat $\pmb { \mu }$ and $\bar { \sigma } ^ { 2 }$ as parameters to be estimated, rather than defining priors over these parameters.

Section 4.4

Section 3.5.3

Because this integration is intractable, we make use of the Laplace approximation. If we assume that the posterior distribution is sharply peaked, as will occur for sufficiently large data sets, then the re-estimation equations obtained by maximizing the marginal likelihood with respect to $\alpha _ { i }$ take the simple form

\alpha_ {i} ^ {\mathrm{new}} = \frac {D}{\mathbf {w} _ {i} ^ {\mathrm{T}} \mathbf {w} _ {i}}\tag{12.62}

which follows from (3.98), noting that the dimensionality of $\mathbf { w } _ { i }$ is $D .$ These reestimations are interleaved with the EM algorithm updates for determining Wand $\sigma ^ { 2 }$ • The E-step equations are again given by (12.54) and (12.55). Similarly, the M step equation for $\sigma ^ { 2 }$ is again given by (12.57). The only change is to the M-step equation for W, which is modified to give

\mathbf {W} _ {\mathrm{new}} = \left[ \sum_ {n = 1} ^ {N} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) \mathbb {E} [ \mathbf {z} _ {n} ] ^ {\mathrm{T}} \right] \left[ \sum_ {n = 1} ^ {N} \mathbb {E} [ \mathbf {z} _ {n} \mathbf {z} _ {n} ^ {\mathrm{T}} ] + \sigma^ {2} \mathbf {A} \right] ^ {- 1}\tag{12.63}

where $\mathbf { A } = \mathrm { d i a g } ( \alpha _ { i } )$ ' The value of $\mu$ is given by the sample mean, as before.

If we choose $M = D - 1$ then, if all $\alpha _ { i }$ values are finite, the model represents a full-covariance Gaussian, while if all the $\alpha _ { i }$ go to infinity the model is equivalen to an isotropic Gaussian, and so the model can encompass all pennissible values for the effective dimensionality of the principal subspace. It is also possible to consider smaller values of $M$ , which will save on computational cost but which will limit the maximum dimensionality of the subspace. A comparison of the results of this algorithm with standard probabilistic PCA is shown in Figure 12.14.

Bayesian PCA provides an opportunity to illustrate the Gibbs sampling algorithm discussed in Section 11.3. Figure 12.15 shows an example of the samples from the hyperparameters In $\alpha _ { i }$ for a data set in $D = 4$ dimensions in which the di mensionality of the latent space is $M = 3$ but in which the data set is generated from a probabilistic PCA model having one direction of high variance, with the remaining directions comprising low variance noise. This result shows clearly the presence of three distinct modes in the posterior distribution. At each step of the iteration, one of the hyperparameters has a small value and the remaining two have large values, so that two of the three latent variables are suppressed. During the course of the Gibbs sampling, the solution makes sharp transitions between the three modes.

The model described here involves a prior only over the matrix W. A fully Bayesian treatment of PCA, including priors over $\mu , \sigma ^ { 2 }$ , and $\pmb { \alpha } ,$ , and solved using variational methods, is described in Bishop (1999b). For a discussion of various Bayesian approaches to detennining the appropriate dimensionality for a PCA model, see Minka (2001c).
