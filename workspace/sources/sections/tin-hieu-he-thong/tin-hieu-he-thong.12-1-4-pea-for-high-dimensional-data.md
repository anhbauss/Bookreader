---
id: "tin-hieu-he-thong.12-1-4-pea-for-high-dimensional-data"
doc_id: "tin-hieu-he-thong"
title: "12.1.4 peA for high-dimensional data"
level: 2
heading_path: ["Sampling Methods", "12.1.4 peA for high-dimensional data"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-1-3-applications-of-pea"
next_id: "tin-hieu-he-thong.12-2-probabilistic-pea"
block_ids: ["b6217", "b6218", "b6219", "b6220", "b6221", "b6222", "b6223", "b6224", "b6225", "b6226", "b6227", "b6228", "b6229", "b6230"]
---

## 12.1.4 peA for high-dimensional data

In some application. of pliTlCipal component analysis. the number of data points is smaller than t!>c dimensionality of troe data 'pace. FOI" example. ",e might want to apply PeA to a data <el of a few hundred images, each of ,,'hich rorrespoOOs to a "eetor in a 'pace of poIentially .....ml million dimensiOlls (COITesponding tn thfl'e enlour "alues for each of the pi.",ls in troe image), NOIe that in a D-<limen,ional space a set of jY points. ",'here $N < D$ . defines a linear subspa::e ",hose dimensi"nality is at ""'st $N - 1$ , and SO there is linle point in applying PeA for ,'alue< of M thaI"'" greater than $N - 1$ , Indeed, if "'e pelf"",, PeA we will find that at least $D - N + 1$ of the eigen".lues art lero. eorrespnnding tQ eigenvectors aloog ",hose direclioos the data <el has 10m varianee. Funhem>ore. typical algOl"ithm, for finding the eigen,'eet"" ofa $D \times D$ matrix ha"e a computatiooal eosl thm scales like $O ( D ^ { 3 } )$ aOO so for appliealions such as the image e,ample. a direc' application of PeA will be computatiooally infe,,-sibJe.

W. can resoh'e this problem as foIl",",'" Fir;l. let us define X to be the $( N \times D )$

dimensional centred data matrix, whose $n ^ { \mathrm { t h } }$ row is given by $( { \bf x } _ { n } - { \overline { { \bf x } } } ) ^ { \mathrm { T } }$ . The covariance matrix (12.3) can then be written as ${ \bf S } = N ^ { { - } 1 } { \bf X } ^ { \mathrm { T } } { \dot { \bf X } }$ , and the corresponding eigenvector equation becomes

\frac {1}{N} \mathbf {X} ^ {\mathrm{T}} \mathbf {X} \mathbf {u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}.\tag{12.26}

Now pre-multiply both sides by X to give

\frac {1}{N} \mathbf {X X ^ {\mathrm{T}}} (\mathbf {X u} _ {i}) = \lambda_ {i} (\mathbf {X u} _ {i}).\tag{12.27}

If we now define $\mathbf { v } _ { i } = \mathbf { X } \mathbf { u } _ { i }$ , we obtain

\frac {1}{N} \mathbf {X X ^ {\mathrm{T}}} \mathbf {v} _ {i} = \lambda_ {i} \mathbf {v} _ {i}\tag{12.28}

which is an eigenvector equation for the $N \times N$ matrix $N ^ { - 1 } \mathbf { X } \mathbf { X } ^ { \mathrm { { T } } }$ . We see that this has the same $N - 1$ eigenvalues as the original covariance matrix (which itself has an additional $D - N + 1$ eigenvalues of value zero). Thus we can solve the eigenvector problem in spaces of lower dimensionality with computational cost $O ( N ^ { \bar { 3 } } )$ instead of $O ( D ^ { 3 } )$ ). In order to determine the eigenvectors, we multiply both sides of (12.28) by $\mathbf { X } ^ { \mathrm { { T } } }$ to give

\left(\frac {1}{N} \mathbf {X} ^ {\mathrm{T}} \mathbf {X}\right) (\mathbf {X} ^ {\mathrm{T}} \mathbf {v} _ {i}) = \lambda_ {i} (\mathbf {X} ^ {\mathrm{T}} \mathbf {v} _ {i})\tag{12.29}

from which we see that $\left( \mathbf { X } ^ { \mathrm { { T } } } \mathbf { v } _ { i } \right)$ is an eigenvector of S with eigenvalue $\lambda _ { i }$ . Note, however, that these eigenvectors need not be normalized. To determine the appropriate normalization, we re-scale $\mathbf { u } _ { i } \propto \mathbf { X } ^ { \mathrm { { T } } } \mathbf { v } _ { i }$ by a constant such that $\left\| \mathbf { u } _ { i } \right\| = 1$ , which, assuming $\mathbf { v } _ { i }$ has been normalized to unit length, gives

\mathbf {u} _ {i} = \frac {1}{(N \lambda_ {i}) ^ {1 / 2}} \mathbf {X} ^ {\mathrm{T}} \mathbf {v} _ {i}.\tag{12.30}

In summary, to apply this approach we first evaluate $\mathbf { X X ^ { \mathrm { { T } } } }$ and then find its eigenvectors and eigenvalues and then compute the eigenvectors in the original data space using (12.30).
