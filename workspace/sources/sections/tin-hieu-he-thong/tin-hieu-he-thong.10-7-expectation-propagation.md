---
id: "tin-hieu-he-thong.10-7-expectation-propagation"
doc_id: "tin-hieu-he-thong"
title: "10.7. Expectation Propagation"
level: 2
heading_path: ["Approximate Inference", "10.7. Expectation Propagation"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.10-6-3-inference-of-hyperparameters"
next_id: "tin-hieu-he-thong.expectation-propagation"
block_ids: ["b5575", "b5576", "b5577", "b5578", "b5579", "b5580", "b5581", "b5582", "b5583", "b5584", "b5585", "b5586", "b5587", "b5588", "b5589", "b5590", "b5591", "b5592", "b5593", "b5594", "b5595", "b5596", "b5597", "b5598", "b5599", "b5600", "b5601", "b5602", "b5603", "b5604", "b5605", "b5606", "b5607", "b5608", "b5609", "b5610", "b5611", "b5612", "b5613", "b5614", "b5615", "b5616", "b5617", "b5618", "b5619", "b5620", "b5621", "b5622", "b5623"]
---


We conclude this chapter by discussing an alternative form of deterministic approximate inference, known as expectation propagation or $EP$ (Minka, 2001a; Minka, 2001b). As with the variational Bayes methods discussed so far, this too is based on the minimization of a Kullback-Leibler divergence but now of the reverse form, which gives the approximation rather different properties.

Consider for a moment the problem of minimizing KL $(p \| q)$ with respect to $q(\mathbf{z})$ when $p(\mathbf{z})$ is a fixed distribution and $q(\mathbf{z})$ is a member of the exponential family and so, from (2.194), can be written in the form

$$q(\mathbf{z}) = h(\mathbf{z}) g(\boldsymbol{\eta}) \exp \left\{\boldsymbol{\eta}^{\mathrm{T}} \mathbf{u}(\mathbf{z}) \right\}.\tag{10.184}$$

As a function of $\eta$, the Kullback-Leibler divergence then becomes

$$\mathrm{KL}(p \| q) = -\ln g(\boldsymbol{\eta}) - \boldsymbol{\eta}^{\mathrm{T}} \mathbb{E}_{p(\mathbf{z})} [\mathbf{u}(\mathbf{z})] + \mathrm{const}\tag{10.185}$$

where the constant terms are independent of the natural parameters $\eta$. We can minimize $\mathrm{KL}(p \| q)$ within this family of distributions by setting the gradient with respect to $\eta$ to zero, giving

$$-\nabla \ln g(\boldsymbol{\eta}) = \mathbb{E}_{p(\mathbf{z})} [\mathbf{u}(\mathbf{z})].\tag{10.186}$$

However, we have already seen in (2.226) that the negative gradient of $\ln g(\boldsymbol{\eta})$ is given by the expectation of $\mathbf{u}(\mathbf{z})$ under the distribution $q(\mathbf{z})$. Equating these two results, we obtain

$$\mathbb{E}_{q(\mathbf{z})} [\mathbf{u}(\mathbf{z})] = \mathbb{E}_{p(\mathbf{z})} [\mathbf{u}(\mathbf{z})].\tag{10.187}$$

We see that the optimum solution simply corresponds to matching the expected sufficient statistics. So, for instance, if $q(\mathbf{z})$ is a Gaussian $\mathcal{N}(\mathbf{z} | \boldsymbol{\mu}, \boldsymbol{\Sigma})$ then we minimize the Kullback-Leibler divergence by setting the mean $\boldsymbol{\mu}$ of $q(\mathbf{z})$ equal to the mean of the distribution $p(\mathbf{z})$ and the covariance $\boldsymbol{\Sigma}$ equal to the covariance of $p(\mathbf{z})$. This is sometimes called moment matching. An example of this was seen in Figure 10.3(a).

Now let us exploit this result to obtain a practical algorithm for approximate inference. For many probabilistic models, the joint distribution of data $\mathcal{D}$ and hidden variables (including parameters) $\boldsymbol{\theta}$ comprises a product of factors in the form

$$p(\mathcal{D}, \boldsymbol{\theta}) = \prod_{i} f_{i}(\boldsymbol{\theta}).\tag{10.188}$$

This would arise, for example, in a model for independent, identically distributed data in which there is one factor $f_{n}(\boldsymbol{\theta}) = p(\mathbf{x}_{n} | \boldsymbol{\theta})$ for each data point $\mathbf{x}_{n}$, along with a factor $f_{0}(\boldsymbol{\theta}) = p(\boldsymbol{\theta})$ corresponding to the prior. More generally, it would also apply to any model defined by a directed probabilistic graph in which each factor is a conditional distribution corresponding to one of the nodes, or an undirected graph in which each factor is a clique potential. We are interested in evaluating the posterior distribution $p(\boldsymbol{\theta} | \mathcal{D})$ for the purpose of making predictions, as well as the model evidence $p(\mathcal{D})$ for the purpose of model comparison. From (10.188) the posterior is given by

$$p(\boldsymbol{\theta} | \mathcal{D}) = \frac{1}{p(\mathcal{D})} \prod_{i} f_{i}(\boldsymbol{\theta})\tag{10.189}$$

and the model evidence is given by

$$p(\mathcal{D}) = \int \prod_{i} f_{i}(\boldsymbol{\theta}) \mathrm{d}\boldsymbol{\theta}.\tag{10.190}$$

Here we are considering continuous variables, but the following discussion applies equally to discrete variables with integrals replaced by summations. We shall suppose that the marginalization over $\theta$, along with the marginalizations with respect to the posterior distribution required to make predictions, are intractable so that some form of approximation is required.

Expectation propagation is based on an approximation to the posterior distribution which is also given by a product of factors

$$q(\boldsymbol{\theta}) = \frac{1}{Z} \prod_{i} \widetilde{f}_{i}(\boldsymbol{\theta})\tag{10.191}$$

in which each factor $\widetilde{f}_{i}(\boldsymbol{\theta})$ in the approximation corresponds to one of the factors $f_{i}(\boldsymbol{\theta})$ in the true posterior (10.189), and the factor $1/Z$ is the normalizing constant needed to ensure that the left-hand side of (10.191) integrates to unity. In order to obtain a practical algorithm, we need to constrain the factors $\widetilde{f}_{i}(\boldsymbol{\theta})$ in some way, and in particular we shall assume that they come from the exponential family. The product of the factors will therefore also be from the exponential family and so can be described by a finite set of sufficient statistics. For example, if each of the $\widetilde{f}_{i}(\boldsymbol{\theta})$ is a Gaussian, then the overall approximation $q(\boldsymbol{\theta})$ will also be Gaussian.

Ideally we would like to determine the $\widetilde{f}_{i}(\boldsymbol{\theta})$ by minimizing the Kullback-Leibler divergence between the true posterior and the approximation given by

$$\mathrm{KL}(p \| q) = \mathrm{KL}\left(\frac{1}{p(\mathcal{D})} \prod_{i} f_{i}(\boldsymbol{\theta}) \Bigg|\Bigg| \frac{1}{Z} \prod_{i} \widetilde{f}_{i}(\boldsymbol{\theta})\right).\tag{10.192}$$

Note that this is the reverse form of KL divergence compared with that used in variational inference. In general, this minimization will be intractable because the KL divergence involves averaging with respect to the true distribution. As a rough approximation, we could instead minimize the KL divergences between the corresponding pairs $f_{i}(\boldsymbol{\theta})$ and $\widetilde{f}_{i}(\boldsymbol{\theta})$ of factors. This represents a much simpler problem to solve, and has the advantage that the algorithm is noniterative. However, because each factor is individually approximated, the product of the factors could well give a poor approximation.

Expectation propagation makes a much better approximation by optimizing each factor in turn in the context of all of the remaining factors. It starts by initializing the factors $\widetilde{f}_{i}(\boldsymbol{\theta})$, and then cycles through the factors refining them one at a time. This is similar in spirit to the update of factors in the variational Bayes framework considered earlier. Suppose we wish to refine factor $\widetilde{f}_{j}(\boldsymbol{\theta})$. We first remove this factor from the product to give $\textstyle \prod_{i \neq j} \widetilde{f}_{i}(\boldsymbol{\theta})$. Conceptually, we will now determine a revised form of the factor $\widetilde{f}_{j}(\boldsymbol{\theta})$ by ensuring that the product

$$q^{\mathrm{new}}(\boldsymbol{\theta}) \propto \widetilde{f}_{j}(\boldsymbol{\theta}) \prod_{i \neq j} \widetilde{f}_{i}(\boldsymbol{\theta})\tag{10.193}$$

is as close as possible to

$$f_{j}(\boldsymbol{\theta}) \prod_{i \neq j} \widetilde{f}_{i}(\boldsymbol{\theta})\tag{10.194}$$

in which we keep fixed all of the factors $\widetilde{f}_{i}(\boldsymbol{\theta})$ for $i \neq j$. This ensures that the approximation is most accurate in the regions of high posterior probability as defined by the remaining factors. We shall see an example of this effect when we apply EP to the 'clutter problem'. To achieve this, we first remove the factor $\widetilde{f}_{j}(\boldsymbol{\theta})$ from the current approximation to the posterior by defining the unnormalized distribution

$$q^{\setminus j}(\boldsymbol{\theta}) = \frac{q(\boldsymbol{\theta})}{\widetilde{f}_{j}(\boldsymbol{\theta})}.\tag{10.195}$$

Note that we could instead find $q^{\setminus j}(\boldsymbol{\theta})$ from the product of factors $i \neq j$, although in practice division is usually easier. This is now combined with the factor $f_{j}(\boldsymbol{\theta})$ to give a distribution

$$\frac{1}{Z_{j}} f_{j}(\boldsymbol{\theta}) q^{\setminus j}(\boldsymbol{\theta})\tag{10.196}$$

![image](images/part-003--e25781cc01cbbc14d466198706fa2ccdad2e2601fb54341bf8245562f6077513.jpg)

![image](images/part-003--62c279a61c993b7c83b65f59532ddb2f8dc7048932d507a77e73e8df7195fe4c.jpg)

Figure 10.14 Illustration of the expectation propagation approximation using a Gaussian distribution for the example considered earlier in Figures 4.14 and 10.1. The left-hand plot shows the original distribution (yellow) along with the Laplace (red), global variational (green), and EP (blue) approximations, and the right-hand plot shows the corresponding negative logarithms of the distributions. Note that the $\mathsf{EP}$ distribution is broader than that variational inference, as a consequence of the different form of KL divergence.

where $Z_{j}$ is the normalization constant given by

$$Z_{j} = \int f_{j}(\boldsymbol{\theta}) q^{\setminus j}(\boldsymbol{\theta}) \mathrm{d}\boldsymbol{\theta}.\tag{10.197}$$

We now determine a revised factor $\widetilde{f}_{j}(\boldsymbol{\theta})$ by minimizing the Kullback-Leibler divergence

$$\mathrm{KL}\left(\frac{f_{j}(\boldsymbol{\theta}) q^{\setminus j}(\boldsymbol{\theta})}{Z_{j}} \Bigg|\Bigg| q^{\mathrm{new}}(\boldsymbol{\theta})\right).\tag{10.198}$$

This is easily solved because the approximating distribution $q^{\mathrm{new}}(\boldsymbol{\theta})$ is from the exponential family, and so we can appeal to the result (10.187), which tells us that the parameters of $q^{\mathrm{new}}(\boldsymbol{\theta})$ are obtained by matching its expected sufficient statistics to the corresponding moments of (10.196). We shall assume that this is a tractable operation. For example, if we choose $q(\boldsymbol{\theta})$ to be a Gaussian distribution $\mathcal{N}(\boldsymbol{\theta} | \boldsymbol{\mu}, \boldsymbol{\Sigma})$, then $\boldsymbol{\mu}$ is set equal to the mean of the (unnormalized) distribution $f_{j}(\boldsymbol{\theta}) q^{\setminus j}(\boldsymbol{\theta})$, and $\boldsymbol{\Sigma}$ is set to its covariance. More generally, it is straightforward to obtain the required expectations for any member of the exponential family, provided it can be normalized, because the expected statistics can be related to the derivatives of the normalization coefficient, as given by (2.226). The EP approximation is illustrated in Figure 10.14.

From (10.193), we see that the revised factor $\widetilde{f}_{j}(\boldsymbol{\theta})$ can be found by taking $q^{\mathrm{new}}(\boldsymbol{\theta})$ and dividing out the remaining factors so that

$$\widetilde{f}_{j}(\boldsymbol{\theta}) = K \frac{q^{\mathrm{new}}(\boldsymbol{\theta})}{q^{\setminus j}(\boldsymbol{\theta})}\tag{10.199}$$

where we have used (10.195). The coefficient $K$ is determined by multiplying both sides of (10.199) by $q^{\setminus j}(\boldsymbol{\theta})$ and integrating to give

$$K = \int \widetilde{f}_{j}(\boldsymbol{\theta}) q^{\setminus j}(\boldsymbol{\theta}) \mathrm{d}\boldsymbol{\theta}\tag{10.200}$$

where we have used the fact that $q^{\mathrm{new}}(\boldsymbol{\theta})$ is normalized. The value of $K$ can therefore be found by matching zeroth-order moments

$$\int \widetilde{f}_{j}(\boldsymbol{\theta}) q^{\setminus j}(\boldsymbol{\theta}) \mathrm{d}\boldsymbol{\theta} = \int f_{j}(\boldsymbol{\theta}) q^{\setminus j}(\boldsymbol{\theta}) \mathrm{d}\boldsymbol{\theta}.\tag{10.201}$$

Combining this with (10.197), we then see that $K = Z_{j}$ and so can be found by evaluating the integral in (10.197).

In practice, several passes are made through the set of factors, revising each factor in turn. The posterior distribution $p(\boldsymbol{\theta} | \mathcal{D})$ is then approximated using (10.191), and the model evidence $p(\mathcal{D})$ can be approximated by using (10.190) with the factors $f_{i}(\boldsymbol{\theta})$ replaced by their approximations $\widetilde{f}_{i}(\boldsymbol{\theta})$.
