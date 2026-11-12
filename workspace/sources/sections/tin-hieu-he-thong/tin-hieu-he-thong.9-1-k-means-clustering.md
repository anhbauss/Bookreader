---
id: "tin-hieu-he-thong.9-1-k-means-clustering"
doc_id: "tin-hieu-he-thong"
title: "9.1. K-means Clustering"
level: 2
heading_path: ["Mixture Models and EM", "9.1. K-means Clustering"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.mixture-models-and-em"
next_id: "tin-hieu-he-thong.9-1-1-image-segmentation-and-compression"
block_ids: ["b4703", "b4704", "b4705", "b4706", "b4707", "b4708", "b4709", "b4710", "b4711", "b4712", "b4713", "b4714", "b4715", "b4716", "b4717", "b4718", "b4719", "b4720", "b4721", "b4722", "b4723", "b4724", "b4725", "b4726", "b4727", "b4728", "b4729", "b4730", "b4731", "b4732", "b4733", "b4734", "b4735", "b4736", "b4737"]
---

## 9.1. K-means Clustering

We begin by considering the problem of identifying groups, or clusters, of data points in a multidimensional space. Suppose we have a data set $\left\{ \mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N } \right\}$ consisting of N observations of a random D-dimensional Euclidean variable x. Our goal is to partition the data set into some number K of clusters, where we shall suppose for the moment that the value of K is given. Intuitively, we might think of a cluster as comprising a group of data points whose inter-point distances are small compared with the distances to points outside of the cluster. We can formalize this notion by first introducing a set of D-dimensional vectors $\pmb { \mu } _ { k }$ , where $k = 1 , \ldots , K$ , in which $\pmb { \mu } _ { k }$ is a prototype associated with the $k ^ { \mathrm { t h } }$ cluster. As we shall see shortly, we can think of the $\pmb { \mu } _ { k }$ as representing the centres of the clusters. Our goal is then to find an assignment of data points to clusters, as well as a set of vectors $\{ \mu _ { k } \}$ , such that the sum of the squares of the distances of each data point to its closest vector $\mu _ { k }$ , is a minimum.

It is convenient at this point to define some notation to describe the assignment of data points to clusters. For each data point $\mathbf { x } _ { n } .$ , we introduce a corresponding set of binary indicator variables $r _ { n k } \in \{ 0 , 1 \}$ , where $k = 1 , \ldots , K$ describing which of the K clusters the data point ${ \bf x } _ { n }$ is assigned to, so that if data point ${ \bf x } _ { n }$ is assigned to cluster k then $r _ { n k } = 1$ , and $r _ { n j } = 0$ for $j \neq k$ . This is known as the 1-of-K coding scheme. We can then define an objective function, sometimes called a distortion measure, given by

J = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} r _ {n k} \| \mathbf {x} _ {n} - \pmb {\mu} _ {k} \| ^ {2}\tag{9.1}

which represents the sum of the squares of the distances of each data point to its assigned vector $\pmb { \mu } _ { k }$ . Our goal is to find values for the $\{ r _ { n k } \}$ and the $\{ \mu _ { k } \}$ so as to minimize J. We can do this through an iterative procedure in which each iteration involves two successive steps corresponding to successive optimizations with respect to the $r _ { n k }$ and the $\mu _ { k }$ . First we choose some initial values for the $\pmb { \mu } _ { k }$ . Then in the first phase we minimize J with respect to the $r _ { n k }$ , keeping the $\mu _ { k }$ fixed. In the second phase we minimize J with respect to the $\pmb { \mu } _ { k }$ , keeping $r _ { n k }$ fixed. This two-stage optimization is then repeated until convergence. We shall see that these two stages of updating $r _ { n k }$ and updating $\pmb { \mu } _ { k }$ correspond respectively to the E (expectation) and M (maximization) steps of the EM algorithm, and to emphasize this we shall use the terms E step and M step in the context of the K-means algorithm.

Consider first the determination of the $r _ { n k }$ . Because J in (9.1) is a linear function of $r _ { n k }$ , this optimization can be performed easily to give a closed form solution. The terms involving different n are independent and so we can optimize for each n separately by choosing $r _ { n k }$ to be 1 for whichever value of k gives the minimum value of $\| \mathbf { x } _ { n } - \pmb { \mu } _ { k } \| ^ { 2 }$ . In other words, we simply assign the $n ^ { \mathrm { t h } }$ data point to the closest cluster centre. More formally, this can be expressed as

r _ {n k} = \left\{ \begin{array}{l l} 1 & \text { if } k = \arg \min _ {j} \| \mathbf {x} _ {n} - \boldsymbol {\mu} _ {j} \| ^ {2} \\ 0 & \text { otherwise. } \end{array} \right.\tag{9.2}

Now consider the optimization of the $\pmb { \mu } _ { k }$ with the $r _ { n k }$ held fixed. The objective function J is a quadratic function of $\pmb { \mu } _ { k }$ , and it can be minimized by setting its derivative with respect to $\pmb { \mu } _ { k }$ to zero giving

2 \sum_ {n = 1} ^ {N} r _ {n k} (\mathbf {x} _ {n} - \boldsymbol {\mu} _ {k}) = 0\tag{9.3}

which we can easily solve for $\mu _ { k }$ to give

\pmb {\mu} _ {k} = \frac {\sum_ {n} r _ {n k} \mathbf {x} _ {n}}{\sum_ {n} r _ {n k}}.\tag{9.4}

The denominator in this expression is equal to the number of points assigned to cluster $k ,$ and so this result has a simple interpretation, namely set $\mu _ { k }$ equal to the mean of all of the data points ${ \bf x } _ { n }$ assigned to cluster k. For this reason, the procedure is known as the K-means algorithm.

The two phases of re-assigning data points to clusters and re-computing the cluster means are repeated in turn until there is no further change in the assignments (or until some maximum number of iterations is exceeded). Because each phase reduces the value of the objective function J, convergence of the algorithm is assured. However, it may converge to a local rather than global minimum of J. The convergence properties of the K-means algorithm were studied by MacQueen (1967).

The K-means algorithm is illustrated using the Old Faithful data set in Figure 9.1. For the purposes of this example, we have made a linear re-scaling of the data, known as standardizing, such that each of the variables has zero mean and unit standard deviation. For this example, we have chosen $K = 2$ , and so in this case, the assignment of each data point to the nearest cluster centre is equivalent to a classification of the data points according to which side they lie of the perpendicular bisector of the two cluster centres. A plot of the cost function J given by (9.1) for the Old Faithful example is shown in Figure 9.2.

![image](images/part-003--87f8b82d31072e6160cf80baffa345bc02b85adb72842ac061f6e51d28af24c0.jpg)

![image](images/part-003--18d17755b5aea4bf6d03376a875096ca9838d537546b93aa6d0794d7e5b8b7bd.jpg)

![image](images/part-003--90610fed0dfce0d22388c8f2894753f715021214d8de1820f6640e009066cb2a.jpg)

![image](images/part-003--fd36170c13d446e0a13cb7db1cdb4b3609f2ff5d12115146cea669d98ce9c12b.jpg)

![image](images/part-003--075205e7753842645e3d5228c2ee1c3ff7434d24e6ce0efe675d0fb69869eb09.jpg)

![image](images/part-003--5fc7c085a5f32678c3ac21e91e9369f521f5635ab6db3b80c82abcc5ce35630b.jpg)

![image](images/part-003--ca87ac02ff95cdeae964d336233aeba6530847449f74f4c9f32761488f1c7978.jpg)

![image](images/part-003--c47ca54eb7e55f10b25103da097cd786e695ca505fda69aea3dac69eff530bdc.jpg)

![image](images/part-003--1868146e82a96d9a705c40396994c5cd8cd8a657bbcd02408073fe506aca86c7.jpg)

Figure 9.1 Illustration of the K-means algorithm using the re-scaled Old Faithful data set. (a) Green points denote the data set in a two-dimensional Euclidean space. The initial choices for centres $\pmb { \mu } _ { 1 }$ and $\mu _ { 2 }$ are shown by the red and blue crosses, respectively. (b) In the initial E step, each data point is assigned either to the red cluster or to the blue cluster, according to which cluster centre is nearer. This is equivalent to classifying the points according to which side of the perpendicular bisector of the two cluster centres, shown by the magenta line, they lie on. (c) In the subsequent M step, each cluster centre is re-computed to be the mean of the points assigned to the corresponding cluster. (d)–(i) show successive E and M steps through to final convergence of the algorithm.

Plot of the cost function J given by (9.1) after each E step (blue points) and M step (red points) of the Kmeans algorithm for the example shown in Figure 9.1. The algorithm has converged after the third M step, and the final EM cycle produces no changes in either the assignments or the prototype vectors.

![image](images/part-003--e5a51ec29e7e0bd6d4e39df4a9a1c1cde47006f54904324660899cbe4c0cfe93.jpg)

Note that we have deliberately chosen poor initial values for the cluster centres so that the algorithm takes several steps before convergence. In practice, a better initialization procedure would be to choose the cluster centres $\pmb { \mu } _ { k }$ to be equal to a random subset of K data points. It is also worth noting that the K-means algorithm itself is often used to initialize the parameters in a Gaussian mixture model before applying the EM algorithm.

A direct implementation of the K-means algorithm as discussed here can be relatively slow, because in each E step it is necessary to compute the Euclidean distance between every prototype vector and every data point. Various schemes have been proposed for speeding up the K-means algorithm, some of which are based on precomputing a data structure such as a tree such that nearby points are in the same subtree (Ramasubramanian and Paliwal, 1990; Moore, 2000). Other approaches make use of the triangle inequality for distances, thereby avoiding unnecessary distance calculations (Hodgson, 1998; Elkan, 2003).

So far, we have considered a batch version of K-means in which the whole data set is used together to update the prototype vectors. We can also derive an on-line stochastic algorithm (MacQueen, 1967) by applying the Robbins-Monro procedure to the problem of finding the roots of the regression function given by the derivatives of J in (9.1) with respect to $\mu _ { k }$ . This leads to a sequential update in which, for each data point ${ \bf x } _ { n }$ in turn, we update the nearest prototype $\mu _ { k }$ using

\pmb {\mu} _ {k} ^ {\mathrm{new}} = \pmb {\mu} _ {k} ^ {\mathrm{old}} + \eta_ {n} (\mathbf {x} _ {n} - \pmb {\mu} _ {k} ^ {\mathrm{old}})\tag{9.5}

where $\eta _ { n }$ is the learning rate parameter, which is typically made to decrease monotonically as more data points are considered.

The K-means algorithm is based on the use of squared Euclidean distance as the measure of dissimilarity between a data point and a prototype vector. Not only does this limit the type of data variables that can be considered (it would be inappropriate for cases where some or all of the variables represent categorical labels for instance), but it can also make the determination of the cluster means nonrobust to outliers. We can generalize the K-means algorithm by introducing a more general dissimilarity measure $\mathcal { V } ( \mathbf { x } , \mathbf { x } ^ { \prime } )$ between two vectors x and $\mathbf { x } ^ { \prime }$ and then minimizing the following distortion measure

\widetilde {J} = \sum_ {n = 1} ^ {N} \sum_ {k = 1} ^ {K} r _ {n k} \mathcal {V} (\mathbf {x} _ {n}, \pmb {\mu} _ {k})\tag{9.6}

which gives the K-medoids algorithm. The E step again involves, for given cluster prototypes $\pmb { \mu } _ { k }$ , assigning each data point to the cluster for which the dissimilarity to the corresponding prototype is smallest. The computational cost of this is $O ( K N )$ as is the case for the standard K-means algorithm. For a general choice of dissimilarity measure, the M step is potentially more complex than for K-means, and so it is common to restrict each cluster prototype to be equal to one of the data vectors assigned to that cluster, as this allows the algorithm to be implemented for any choice of dissimilarity measure $\mathcal { V } ( \cdot , \cdot )$ so long as it can be readily evaluated. Thus the M step involves, for each cluster k, a discrete search over the $N _ { k }$ points assigned to that cluster, which requires $O ( N _ { k } ^ { 2 } )$ evaluations of $\mathcal { V } ( \cdot , \cdot )$

One notable feature of the K-means algorithm is that at each iteration, every data point is assigned uniquely to one, and only one, of the clusters. Whereas some data points will be much closer to a particular centre $\pmb { \mu } _ { k }$ than to any other centre, there may be other data points that lie roughly midway between cluster centres. In the latter case, it is not clear that the hard assignment to the nearest cluster is the most appropriate. We shall see in the next section that by adopting a probabilistic approach, we obtain ‘soft’ assignments of data points to clusters in a way that reflects the level of uncertainty over the most appropriate assignment. This probabilistic formulation brings with it numerous benefits.
