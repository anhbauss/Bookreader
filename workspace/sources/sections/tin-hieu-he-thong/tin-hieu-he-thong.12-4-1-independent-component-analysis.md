---
id: "tin-hieu-he-thong.12-4-1-independent-component-analysis"
doc_id: "tin-hieu-he-thong"
title: "12.4.1 Independent component analysis"
level: 2
heading_path: ["Sampling Methods", "12.4.1 Independent component analysis"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.12-4-nonlinear-latent-variable-models"
next_id: "tin-hieu-he-thong.12-4-2-autoassociative-neural-networks"
block_ids: ["b6447", "b6448", "b6449", "b6450", "b6451", "b6452", "b6453", "b6454", "b6455", "b6456"]
---

## 12.4.1 Independent component analysis

We begin by considering models in which the observed variables are related linearly to the latent variables, but for which the latent distribution is non-Gaussian. An important class of such models, known as independent component analysis, or leA, arises when we consider a distribution over the latent variables that factorizes, so that

p (\mathbf {z}) = \prod_ {j = 1} ^ {M} p (z _ {j}).\tag{12.89}

To understand the role of such models, consider a situation in which two people are talking at the same time, and we record their voices using two microphones. If we ignore effects such as time delay and echoes, then the signals received by the microphones at any point in time will be given by linear combinations of the amplitudes of the two voices. The coefficients of this linear combination will be constant, and if we can infer their values from sample data, then we can invert the mixing process (assuming it is nonsingular) and thereby obtain two clean signals each of which contains the voice ofjust one person. This is an example of a problem called blind source separation in which 'blind' refers to the fact that we are given only the mixed data, and neither the original sources nor the mixing coefficients are observed (Cardoso, 1998).

This type of problem is sometimes addressed using the following approach (MacKay, 2003) in which we ignore the temporal nature of the signals and treat the successive samples as i.i.d. We consider a generative model in which there are two latent variables corresponding to the unobserved speech signal amplitudes, and there are two observed variables given by the signal values at the microphones. The laten variables have ajoint distribution that factorizes as above, and the observed variables are given by a linear combination of the latent variables. There is no need to include a noise distribution because the number of latent variables equals the number of observed variables, and therefore the marginal distribution of the observed variables will not in general be singular, so the observed variables are simply deterministic linear combinations of the latent variables. Given a data set of observations, the likelihood function for this model is a function of the coefficients in the linear combination. The log likelihood can be maximized using gradient-based optimization giving rise to a particular version of independent component analysis.

The success of this approach requires that the latent variables have non-Gaussian distributions. To see this, recall that in probabilistic PCA (and in factor analysis) the latent-space distribution is given by a zero-mean isotropic Gaussian. The model therefore cannot distinguish between two different choices for the latent variables where these differ simply by a rotation in latent space. This can be verified directly by noting that the marginal density (12.35), and hence the likelihood function, is unchanged if we make the transformation W -) WR where R is an orthogonal matrix satisfying $\mathbf { R R } ^ { \mathrm { T } } = \mathbf { I } .$ , because the matrix C given by (12.36) is itself invariant. Extending the model to allow more general Gaussian latent distributions does not change this conclusion because, as we have seen, such a model is equivalent to the zero-mean isotropic Gaussian latent variable model.

Another way to see why a Gaussian latent variable distribution in a linear model is insufficient to find independent components is to note that the principal components represent a rotation of the coordinate system in data space such as to diagonalize the covariance matrix, so that the data distribution in the new coordinates is then uncorrelated. Although zero correlation is a necessary condition for independence it is not, however, sufficient. In practice, a common choice for the latent-variable distribution is given by

p (z _ {j}) = \frac {1}{\pi \cosh (z _ {j})} = \frac {1}{\pi \left(e ^ {z _ {j}} + e ^ {- z _ {j}}\right)}\tag{12.90}

which has heavy tails compared to a Gaussian, reflecting the observation that many real-world distributions also exhibit this property.

The original ICA model (Bell and Sejnowski, 1995) was based on the optimization of an objective function defined by information maximization. One advantage of a probabilistic latent variable formulation is that it helps to motivate and formulate generalizations of basic ICA. For instance, independentfactor analysis (Attias, 1999a) considers a model in which the number of latent and observed variables can differ, the observed variables are noisy, and the individual latent variables have flexible distributions modelled by mixtures of Gaussians. The log likelihood for this model is maximized using EM, and the reconstruction of the latent variables is approximated using a variational approach. Many other types of model have been considered, and there is now a huge literature on ICA and its applications (Jutten and Herault, 1991; Comon et at., 1991; Amari et at., 1996; Pearlmutter and Parra, 1997; Hyvarinen and Oja, 1997; Hinton et at., 2001; Miskin and MacKay, 2001; Hojen-Sorensen et at., 2002; Choudrey and Roberts, 2003; Chan et at., 2003; Stone, 2004).
