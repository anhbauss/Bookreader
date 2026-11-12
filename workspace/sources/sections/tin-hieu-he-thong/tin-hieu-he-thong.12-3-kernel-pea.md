---
id: "tin-hieu-he-thong.12-3-kernel-pea"
doc_id: "tin-hieu-he-thong"
title: "12.3. Kernel peA"
level: 2
heading_path: ["Sampling Methods", "12.3. Kernel peA"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-2-4-factor-analysis"
next_id: "tin-hieu-he-thong.12-4-nonlinear-latent-variable-models"
block_ids: ["b6393", "b6394", "b6395", "b6396", "b6397", "b6398", "b6399", "b6400", "b6401", "b6402", "b6403", "b6404", "b6405", "b6406", "b6407", "b6408", "b6409", "b6410", "b6411", "b6412", "b6413", "b6414", "b6415", "b6416", "b6417", "b6418", "b6419", "b6420", "b6421", "b6422", "b6423", "b6424", "b6425", "b6426", "b6427", "b6428", "b6429", "b6430", "b6431", "b6432", "b6433", "b6434", "b6435", "b6436", "b6437", "b6438", "b6439", "b6440", "b6441", "b6442", "b6443"]
---

## 12.3. Kernel peA

In Chapter 6, we saw how the technique of kernel substitution allows us to take an algorithm expressed in terms of scalar products of the form $\mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ and generalize that algorithm by replacing the scalar products with a nonlinear kernel. Here we apply this technique of kernel substitution to principal component analysis, thereby obtaining a nonlinear generalization called kernel peA (Scholkopf et al., 1998).

Consider a data set $\left\{ \mathbf { x } _ { n } \right\}$ of observations, where $n = 1 , \ldots , N .$ , in a space o dimensionality $D$ In order to keep the notation uncluttered, we shall assume that we have already subtracted the sample mean from each of the vectors ${ \bf x } _ { n }$ , so that $\textstyle \sum _ { n } \mathbf { x } _ { n } = \mathbf { 0 }$ . The first step is to express conventional PCA in such a form that the data vectors $\left\{ \mathbf { x } _ { n } \right\}$ appear only in the form of the scalar products ${ \bf x } _ { n } ^ { \mathrm { T } } { \bf x } _ { m }$ . Recall that the principal components are defined by the eigenvectors $\mathbf { u } _ { i }$ of the covariance matrix

\mathbf {S u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{12.71}

where $i = 1 , \ldots , D$ . Here the $D \times D$ sample covariance matrix S is defined by

\mathbf {S} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} \mathbf {x} _ {n} ^ {\mathrm{T}},\tag{12.72}

and the eigenvectors are normalized such that $\mathbf { u } _ { i } ^ { \mathrm { T } } \mathbf { u } _ { i } = 1$

Now consider a nonlinear transformation $\phi ( \mathbf { x } )$ into an M -dimensional feature space, so that each data point ${ \bf x } _ { n }$ is thereby projected onto a point $\phi (  { \mathbf { x } } _ { n } )$ ). We can __ ptrform )l-.bnl PeA ill fnlllK lopICe. ..-Iudl,mpIiclIly «lIi'Il'S • - ' _ prinClpaI ....-.. model ill onpnll cbuo as ,1lU>tr*d in FllIft 12-16.

![image](images/part-004--2814462749fa4ab7bf372ba796e6cd2e2a85acdd3138895391e9592cafa1a9ca.jpg)

Figu'.12.16 SctIematic _,.lion 01 kernel PeA. A <Utll HI In lhe Oflglnal <Uta space l~'_ plot} .. PfOlEled by' """'*- tranllklfmalion $\phi ( \mathbf { x } )$ 1nIo. fa.tur. space (fIght_ plot). By I*b'~ PCA in the !Hue 111**. we oblaO'Ilha pmeiIlaI ~"llS. "'who<:tllha tnt Ie ......... in blUe.,.., .. oJano4ed by lha vector $\mathbf { v } _ { 1 }$ Tha gr-. . . . . In IMIuN apam indicMa Iha _ plOlKlio". onIO lhe Iirsl poiridl* '""" ......... 11 """'*' _ o d 110 ""'*- poOf&Cllu. in .... <lfisIonaI Oillll 111**. Hole IIuIIIn gMefM' la nol pox ' .. 110 '. . . . . . 1ha, ... iIio_ poi ........ 00i' ........ b y . _ 1 n "apam.

Fu "IO..It.. lei '" lOS!oUlllt 1Nl Illt diu. lObo halnro mean, !hal $\textstyle \sum _ { n } \phi ( \mathbf { x } _ { n } ) = \mathbf { 0 }$ . We dWl rctlll'1l 10 Itl,~ pol'" .Ihonly. 1ll $M \times M$ "'"""* CO\-.ullCC mMfU ,n (~ .If*'e ,~ l"" by

\mathbf {C} = \frac {1}{N} \sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}}\tag{12.73}

and ,l~ ",,,,n'"MOl" opan,ion i' «lined by

\mathbf {C} \mathbf {v} _ {i} = \lambda_ {i} \mathbf {v} _ {i}\tag{12.74}

$i = 1 , \dots , M$ . Our goal is 10 soh'" lhis eigen"lIlue problem WilhoUl ha"inlllO work ."plici,ly in ,he f.lIture 'pace. From !he definilion of C. lhe .ill"""""l"'" equal ions lell' U, thaI $\mathbf { v } _ { i }$ !-ali,fies

\frac {1}{N} \sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \left\{\phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \mathbf {v} _ {i} \right\} = \lambda_ {i} \mathbf {v} _ {i}\tag{12.75}

........ ..-" . - lN1 (proo.idcd $\lambda _ { i } > 0 )$ ) tilt "CC'lo $\mathbf { v } _ { i }$ , is li''n by • Ii_ rombllla"on ofIll $\phi ( \mathbf { x } _ { n } )$ J ..... JO <;.- he "-"llm iIllhc (orm

\mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} a _ {i n} \phi (\mathbf {x} _ {n}).\tag{12.76}

Substituting this expansion back into the eigenvector equation, we obtain

\frac {1}{N} \sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \sum_ {m = 1} ^ {N} a _ {i m} \phi (\mathbf {x} _ {m}) = \lambda_ {i} \sum_ {n = 1} ^ {N} a _ {i n} \phi (\mathbf {x} _ {n}).\tag{12.77}

The key step is now to express this in terms of the kernel function $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } ) =$ $\phi (  { \mathbf { x } } _ { n } ) ^ { \mathrm { T } } \phi (  { \mathbf { x } } _ { m } )$ , which we do by multiplying both sides by $\phi ( \mathbf { x } _ { l } ) ^ { \mathrm { T } }$ to give

\frac {1}{N} \sum_ {n = 1} ^ {N} k (\mathbf {x} _ {l}, \mathbf {x} _ {n}) \sum_ {m = 1} ^ {m} a _ {i m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = \lambda_ {i} \sum_ {n = 1} ^ {N} a _ {i n} k (\mathbf {x} _ {l}, \mathbf {x} _ {n}).\tag{12.78}

This can be written in matrix notation as

\mathbf {K} ^ {2} \mathbf {a} _ {i} = \lambda_ {i} N \mathbf {K} \mathbf {a} _ {i}\tag{12.79}

where ${ \bf a } _ { i }$ is an N-dimensional column vector with elements $a _ { n i }$ for $n = 1 , \ldots , N$ We can find solutions for $\mathbf { a } _ { i }$ by solving the following eigenvalue problem

\mathbf {K} \mathbf {a} _ {i} = \lambda_ {i} N \mathbf {a} _ {i}\tag{12.80}

in which we have removed a factor of K from both sides of (12.79). Note that the solutions of (12.79) and (12.80) differ only by eigenvectors of K having zero eigenvalues that do not affect the principal components projection.

The normalization condition for the coefficients $\mathbf { a } _ { i }$ is obtained by requiring that the eigenvectors in feature space be normalized. Using (12.76) and (12.80), we have

1 = \mathbf {v} _ {i} ^ {\mathrm{T}} \mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} a _ {i n} a _ {i m} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) = \mathbf {a} _ {i} ^ {\mathrm{T}} \mathbf {K} \mathbf {a} _ {i} = \lambda_ {i} N \mathbf {a} _ {i} ^ {\mathrm{T}} \mathbf {a} _ {i}.\tag{12.81}

Having solved the eigenvector problem, the resulting principal component projections can then also be cast in terms of the kernel function so that, using (12.76), the projection of a point x onto eigenvector i is given by

y _ {i} (\mathbf {x}) = \phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} a _ {i n} \phi (\mathbf {x}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) = \sum_ {n = 1} ^ {N} a _ {i n} k (\mathbf {x}, \mathbf {x} _ {n})\tag{12.82}

and so again is expressed in terms of the kernel function.

In the original D-dimensional x space there are D orthogonal eigenvectors and hence we can find at most D linear principal components. The dimensionality M of the feature space, however, can be much larger than D (even infinite), and thus we can find a number of nonlinear principal components that can exceed D. Note, however, that the number of nonzero eigenvalues cannot exceed the number N of data points, because (even if $M > N )$ the covariance matrix in feature space has rank at most equal to N. This is reflected in the fact that kernel PCA involves the eigenvector expansion of the $N \times N$ matrix K.

So far we have assumed that the projected data set given by $\phi (  { \mathbf { x } } _ { n } )$ has zero mean, which in general will not be the case. We cannot simply compute and then subtract off the mean, since we wish to avoid working directly in feature space, and so again, we formulate the algorithm purely in-!erms of the kernel function. The projected data points after centralizing, denoted $\widetilde { \phi } ( \mathbf { x } _ { n } )$ ), are given by

\widetilde {\phi} (\mathbf {x} _ {n}) = \phi (\mathbf {x} _ {n}) - \frac {1}{N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {l})\tag{12.83}

and the corresponding elements of the Gram matrix are given by

\begin{array}{r c l} \widetilde {K} _ {n m} & = & \widetilde {\phi} (\mathbf {x} _ {n}) ^ {\mathrm{T}} \widetilde {\phi} (\mathbf {x} _ {m}) \\ & = & \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) - \frac {1}{N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {l}) \\ & & - \frac {1}{N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {l}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) + \frac {1}{N ^ {2}} \sum_ {j = 1} ^ {N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {j}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {l}) \\ & = & k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) - \frac {1}{N} \sum_ {l = 1} ^ {N} k (\mathbf {x} _ {l}, \mathbf {x} _ {m}) \\ & & - \frac {1}{N} \sum_ {l = 1} ^ {N} k (\mathbf {x} _ {n}, \mathbf {x} _ {l}) + \frac {1}{N ^ {2}} \sum_ {j = 1} ^ {N} \sum_ {l = 1} ^ {N} k (\mathbf {x} _ {j}, \mathbf {x} _ {l}). \end{array}\tag{12.84}

This can be expressed in matrix notation as

\widetilde {\mathbf {K}} = \mathbf {K} - \mathbf {1} _ {N} \mathbf {K} - \mathbf {K} \mathbf {1} _ {N} + \mathbf {1} _ {N} \mathbf {K} \mathbf {1} _ {N}\tag{12.85}

Exercise 12.27

where ${ \bf 1 } _ { N }$ denotes the $N \times N$ matrix in which every element takes the value $1 / N$ Thus we can evaluate $\tilde { \bf K }$ using only the kernel function and then use $\tilde { \bf K }$ to determine the eigenvalues and eigenvectors. Note that the standard PCA algorithm is recovered as a special case if we use a linear kernel $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ . Figure 12.17 shows an example of kernel PCA applied to a synthetic data set (Scholkopf et al., 1998). Here a 'Gaussian' kernel of the form

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp (- \| \mathbf {x} - \mathbf {x} ^ {\prime} \| ^ {2} / 0. 1)\tag{12.86}

is applied to a synthetic data set. The lines correspond to contours along which the projection onto the corresponding principal component, defined by

\phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} a _ {i n} k (\mathbf {x}, \mathbf {x} _ {n})\tag{12.87}

is constant.

![image](images/part-004--a10aabffc7d85e30dc01d2c937870f2991a2ce4378475eeba18e9f59565c8ce8.jpg)

Figure 12.11 E"llmple 01 kernel PCA, with a Gaussian kernel awIiOO 10 a synthetic <lata sat in two <:Iirnensions, showing !he firsl flight eigenfunclions along w~h l!>eir e9tnvailNls. The oootours am lines along which !he <sub>projoc1ion</sub> onlo t"" COffaspMding principal <sub>componen1ls</sub> co<>stam, Nola <sub>haw Ihe</sub> firsl two ....,..rat. <sub>!he th"'" dusters. !he ""'"</sub> Ill"'" <sub>spIiI</sub> ""'*' <sub>oIlhe eluste, into haMoS. and</sub> t"" <sub>lolIowing Ihree</sub> again spI~!he duste," into halves along directions orthogonal 10 tho prEMouS splils,

One obvioo' dls.aJmota~eof I:emel !'CA Is thaf if invoh'es finding lhe elgen"e<- tors of the $N \times N$ malri>: $\tilde { \bf K }$ raW. Ihan lhe $D \times D$ malri, S of cor,..emionallinea !'CA. and!iO In prac1lce for large data "'1' appro,lmation< are often uS(:d

Finally. ""e OOIe that i" <tandard linear I'CA, we often retain some redoce<l num· ber $L < \dot { D }$ of eigenvectors and then appro,lmale 0 data vttl<:>r $\mathbf { x } _ { n }$ b}' its projection ${ \widehat { \mathbf { x } } } _ { n }$ 0,,1" lhe L-dimensional principal subspace, defined by

\widehat {\mathbf {x}} _ {n} = \sum_ {i = 1} ^ {L} \left(\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) \mathbf {u} _ {i}.\tag{12.88}

I" kernell'CA. this will in gencr~1 not be flO'slble, To see thl', OOIe Ihat the mapping $\phi ( \mathbf { x } )$ maps the D-dimensional x space i"t" 0 D-dimensioo.l manijQiII in lhe M-dimemioo.l femure space $\phi .$ TlIe: .'ector x i' koown a< lhe f'",.imagr of lhe c","""ponding poi"l $\phi ( \mathbf { x } )$ . However, fhe projec1ioo of poinl> in feature <J'3C" ""to the linear rcA ,ub,p""" in that 'pace will typically"''' lie On fhe nonlinear D-<sub>dimensional manifold</sub> and <sub>!iO will nul</sub> ha.,. <sub>a c"""",pondlng</sub> p",.lmo~e<sub>in dOlO spa<."C,</sub> Technlque< ho.-e lherefore bttn proposed for finding approximale pre-image< iB""lr Nat.. 2(04).
