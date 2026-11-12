---
id: "tin-hieu-he-thong.12-1-3-applications-of-pea"
doc_id: "tin-hieu-he-thong"
title: "12.1.3 Applications of peA"
level: 2
heading_path: ["Sampling Methods", "12.1.3 Applications of peA"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-1-2-minimum-error-formulation"
next_id: "tin-hieu-he-thong.12-1-4-pea-for-high-dimensional-data"
block_ids: ["b6180", "b6181", "b6182", "b6183", "b6184", "b6185", "b6186", "b6187", "b6188", "b6189", "b6190", "b6191", "b6192", "b6193", "b6194", "b6195", "b6196", "b6197", "b6198", "b6199", "b6200", "b6201", "b6202", "b6203", "b6204", "b6205", "b6206", "b6207", "b6208", "b6209", "b6210", "b6211", "b6212", "b6213", "b6214", "b6215", "b6216"]
---

## 12.1.3 Applications of peA

We can illustrate the use of PCA for data compression by considering the off line digits data set. Because each eigenvector of the covariance matrix is a vector ;n the OIigi",,1 D-<limensional space. we can represent tho eigenw:cto<s as imago< of tho same silO as ,1>0 data poi",,_ 11,. first Ih'e .ig.n,'occOfS. along wich tl>o corresponding .igen,'slue,. are <IIo"'n in Figure 12,3, A plO! ofll>o complete spect"'m uf oigo",·alue,. sone<! into decreasing order. is shown in Figure 12.4{ai. The di'tortion measure J aSSQCiated wilh choo<ing a particular value of M is gi.'en by tho sum of the eig.n",lues from M + I up to $D$ and is ptO!ted for different ,'aluo< of .\1 in Figure 12,4(b).

![image](images/part-004--74991f5b7cc98c962987b7012d94b5ce53136e6cbd445b8888e48d43b723712f.jpg)

Figure 12.3 The mean ~'" x aklog with !he II"'t lou' PCA e;gerrvecl<)rll $\mathbf { u } _ { 1 } , \ldots , \mathbf { u } _ { 4 }$ lor the 011-..... cligits data set. t<>getl'ler with !he correspondi~ ~.

If "'e <utlslitut. (12, 12) and (12.13) into (12.10). we can write the I'CA appro~­ imation to a data "eel'" $\mathbf { x } _ { n }$ i" the fonn

\begin{array}{r c l} \widetilde {\mathbf {x}} _ {n} & = & \sum_ {i = 1} ^ {M} (\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i}) \mathbf {u} _ {i} + \sum_ {i = M + 1} ^ {D} (\overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {i}) \mathbf {u} _ {i} \\ & = & \overline {{\mathbf {x}}} + \sum_ {i = 1} ^ {M} \left(\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i} - \overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) \mathbf {u} _ {i} \end{array}\tag{12.19}

(12.20)

![image](images/part-004--af18da62412076f351d4489d78d48a8728e80138a8b705331b46924aca6fe76c.jpg)

(a)

![image](images/part-004--9c28e068205c72af0c62324c95d383d1de6fd8afe2eb1542cf5bf78880c62543.jpg)

(b)

FIIIUre 12,4 (a) PIol at !he eJoI;nv.loo .".,etrum lor the off·1ine digits data set (b) P10t 01 !he sum at the <:liscarded ."".Ioos, which "'l'fesoots!he s.um-ol·SQ"",es distortlon J i<*~ by projecti<Xl the data onto a p<incipal componenl slll>spaee '" dimensionalitv M.

![image](images/part-004--bd469ded0de3864b878a71d13226769d50152e9fa717b0b6476707f678df7131.jpg)

FIIIUr. 1:1:.5 An ",>gi",,1 ~mpIe Irom lI>e 011·_ digils data ...ttOll"1her with its PeA re<:onstnxlions oblair...:! by 'e1aio"li!Xl ,If j)<incipal ~n1S 10< various val,," 01 ,If. As ,II increason !tie re<:onst,uctiOfI ~s more ao::urate and woukl portee! when $M = D =$ $2 8 \times 2 8 = 7 8 4$

where we ha"e made moe of the relation

\overline {{\mathbf {x}}} = \sum_ {i = 1} ^ {D} \left(\overline {{\mathbf {x}}} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) \mathbf {u} _ {i}\tag{12.21}

which follow. from the completene" of the $\left\{ { \bf { u } } _ { i } \right\}$ , Thi. represent. a contpre"ioo "f the data >ct. Ilttau>e for each data poim we ha,.. repla«d the V·dimensiooal "o<:lor $\mathbf { x } _ { n }$ Wilh an ,I[.din>en,ional "o<:tor having componem, $\left( \mathbf { x } _ { n } ^ { \mathrm { { T } } } \mathbf { u } _ { i } - \overline { { \mathbf { x } } } ^ { \mathrm { { T } } } \mathbf { u } _ { i } \right)$ . 11Ie 'mailer the "alue of M. the greater the degree of comp.-e",ion. Example. of PeA ,""on't""tioos of data points for the digits data set are shown in Figure 12.5

Anolher application of priocipal compcmenl analy,i. i' to data pre-processing. In thi' case, lhe goal is nO! dimensionality redUC1ion but rather the tmn,formmion o a data sel in or<k' to standa'lli'.e eenain of ilS pmpenies. This can be in'portanl in allowing .ubsequent pallem ,""ognition algorithm. 10 be applied successfully 10 the data >ct. Typically. il is done wilen the original "ariable. are mea,ured in "arioos dif. ferent unil' or !la"e significantly difTerent ,'ariabilil}'. For instance in the Old Faithfu data sel. the time betv.-een eruption. i. typicany an order of magni1Ude greater than lhe dUrali"" of.n erupt;,,". When W'e applied the ".nlCans algorill"" 10 thi< data set, ".-e first made a separ.te linear re-sealing of the individual "anable' socb thm each "ariable had zero mean and unit "ariance. llUs is known as slllNlardiv·.,g the dota. and the cO\'anance matrix for lhe 'lando,di/,ed dala has components

\rho_ {i j} = \frac {1}{N} \sum_ {n = 1} ^ {N} \frac {\left(x _ {n i} - \overline {{{x}}} _ {i}\right)}{\sigma_ {i}} \frac {\left(x _ {n j} - \overline {{{x}}} _ {j}\right)}{\sigma_ {j}}\tag{12.22}

where $\sigma _ { i }$ is the ,'anaoce of $x _ { i }$ . This i< known as the (",,,el,,,;,,,, matri.' of the original dota and ha' the propeny thai if t""o rompooent, $x _ { i }$ and $x _ { j }$ of the data are perfee1ly correl.ted. then $\rho _ { i j } = 1$ .•nd if they a.-e uocorrelated. then $\rho _ { i j } = 0$

11",,'1""', using PeA we can make a It>Of'e subst.mial nonnalizat;oo of the data to gi\'C it zero mean and unit co'·ariance. so that different "anables become derorrelate<l To do this. we first ""rile the ei8Cn"cclor equation (12, 17) in the form

\mathbf {S U} = \mathbf {U L}\tag{12.23}

![image](images/part-004--8e41dfdcb29ae62007e68d924d88dab86e4f5318c132bdd22495182b567985d9.jpg)

![image](images/part-004--ebd61d8f30539cf71b7e63d9d1846eab661bd422e3c24de5920431cbb29beccd.jpg)

![image](images/part-004--976fd7c215191b95e8c6f8af72a4f31d81bd6f8efc42674c45103956242fcd2a.jpg)

Figure 12.6 Illustration of the effects of linear pre-processing applied to the Old Faithful data set. The plot on the left shows the original data. The centre plot shows the result of standardizing the individual variables to zero mean and unit variance. Also shown are the principal axes of this normalized data set, plotted over the range $\pm \lambda _ { i } ^ { 1 / 2 }$ The plot on the right shows the result of whitening of the data to give it zero mean and unit covariance.

where L is a $D \times D$ diagonal matrix with elements $\lambda _ { i } ,$ , and U is a $D \times D$ orthogonal matrix with columns given by $\mathbf { u } _ { i }$ . Then we define, for each data point $\mathbf { x } _ { n } .$ , a transformed value given by

\mathbf {y} _ {n} = \mathbf {L} ^ {- 1 / 2} \mathbf {U} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}})\tag{12.24}

where $\overline { { \mathbf { x } } }$ is the sample mean defined by (12.1). Clearly, the set $\left\{ \mathbf { y } _ { n } \right\}$ has zero mean, and its covariance is given by the identity matrix because

\begin{array}{r c l} \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {y} _ {n} \mathbf {y} _ {n} ^ {\mathrm{T}} & = & \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {L} ^ {- 1 / 2} \mathbf {U} ^ {\mathrm{T}} (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) (\mathbf {x} _ {n} - \overline {{\mathbf {x}}}) ^ {\mathrm{T}} \mathbf {U} \mathbf {L} ^ {- 1 / 2} \\ & = & \mathbf {L} ^ {- 1 / 2} \mathbf {U} ^ {\mathrm{T}} \mathbf {S} \mathbf {U} \mathbf {L} ^ {- 1 / 2} = \mathbf {L} ^ {- 1 / 2} \mathbf {L} \mathbf {L} ^ {- 1 / 2} = \mathbf {I}. \end{array}\tag{12.25}

This operation is known as whitening or sphereing the data and is illustrated for the Old Faithful data set in Figure 12.6.

It is interesting to compare PCA with the Fisher linear discriminant which was discussed in Section 4.1.4. Both methods can be viewed as techniques for linear dimensionality reduction. However, PCA is unsupervised and depends only on the values ${ \bf x } _ { n }$ whereas Fisher linear discriminant also uses class-label information. This difference is highlighted by the example in Figure 12.7.

Another common application of principal component analysis is to data visualization. Here each data point is projected onto a two-dimensional $( M = 2 )$ principal subspace, so that a data point $\mathbf { x } _ { n }$ is plotted at Cartesian coordinates given by $\mathbf { x } _ { n } ^ { \mathrm { { T } } } \mathbf { u } _ { 1 }$ and $\bar { \mathbf { x } } _ { n } ^ { \mathrm { { T } } } \mathbf { u } _ { 2 }$ , where $\mathbf { u _ { \mathrm { 1 } } }$ and $\mathbf { u } _ { 2 }$ are the eigenvectors corresponding to the largest and second largest eigenvalues. An example of such a plot, for the oil flow data set, is shown in Figure 12.8.

A comparison 01 pro:ipal compo-Mnt analysis ....111 Fisha(s linaar discriminant 101 """", <*man""'" ality r&duclion. Here too data in two dimansions, belonging to two classes sIIOWI1 in red and blue. is to be PfOI"Cled onto a s.ingle di· mension. PCA c/>xlsas the direc· tion 01 maximum varia""e. sIIOWI1 try tha ma9""ta Co""'. wt11ch leads to strong class overlap. whereas !he Fisl>ef IiMar diSCfOrnillant takes accoun1 <:A too class labels and leads to a projection onto the g<ean CUM! giving much t>etler class separation

![image](images/part-004--481574607fa2bffcbe0122c10a159052a26a953663de06568a47685592110829.jpg)

Fig"", 12.8 Visualilatlon 01 !he oill'low <lata lIet obtained try projoecting the <lata onto the lirst two prin. cipal compone<1ts. The <ed, blue, and 9r&en points corre-spond to !he 'IamiNI(, 't>omogenoous', and '8nnula~ flow oonligurations ",specriveIy.

![image](images/part-004--fb785a425d2c780a7fdd625560c45f12a1ebe2d62048abdb8712bb1b58099bb1.jpg)
