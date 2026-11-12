---
id: "tin-hieu-he-thong.synthetic-data"
doc_id: "tin-hieu-he-thong"
title: "Synthetic Data"
level: 2
heading_path: ["Appendix A. Data Sets", "Synthetic Data"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.figure-a-4"
next_id: "tin-hieu-he-thong.appendix-b-probability-distributions"
block_ids: ["b7254", "b7255", "b7256", "b7257", "b7258", "b7259", "b7260", "b7261", "b7262"]
---

## Synthetic Data

Throughout the book, we use two simple synthetic data sets to illustrate many of the algorithms. The first of these is a regression problem, based on the sinusoidal function, shown in Figure A.6. The input values $\{ x _ { n } \}$ are generated uniformly in range (0, 1), and the corresponding target values $\left\{ t _ { n } \right\}$ are obtained by first computing the corresponding values of the function sin $( 2 \pi x )$ , and then adding random noise with a Gaussian distribution having standard deviation 0.3. Various forms of this data set, having different numbers of data points, are used in the book.

The second data set is a classification problem having two classes, with equal prior probabilities, and is shown in Figure A.7. The blue class is generated from a single Gaussian while the red class comes from a mixture of two Gaussians. Because we know the class priors and the class-conditional densities, it is straightforward to evaluate and plot the true posterior probabilities as well as the minimum misclassification-rate decision boundary, as shown in Figure A.7.

![image](images/part-004--afd73c875cdccd5d3f6f959977032aca0ce279033e4962d23a9e6a737c7ec89c.jpg)

![image](images/part-004--058c80f65a5cdbcdb27ee8403201102fdf9ded6f112bb7cbd025921b601cb5d3.jpg)

Figure A.6 The left-hand plot shows the synthetic regression data set along with the underlying sinusoidal function from which the data points were generated. The right-hand plot shows the true conditional distribution $p ( t | x )$ from which the labels are generated, in which the green curve denotes the mean, and the shaded region spans one standard deviation on each side of the mean.

![image](images/part-004--f9348c6bb3426a8f1bc6d63fb8b026bb5bc6cd9c7aeea26f59e907885d1c0a92.jpg)

![image](images/part-004--2ee39eebfde1caa5607a84f603bfb30b5b155544fc4d7efe3ef86132d3e0bad1.jpg)

Figure A.7 The left plot shows the synthetic classification data set with data from the two classes shown in red and blue. On the right is a plot of the true posterior probabilities, shown on a colour scale going from pure red denoting probability of the red class is 1 to pure blue denoting probability of the red class is 0. Because these probabilities are known, the optimal decision boundary for minimizing the misclassification rate (which corresponds to the contour along which the posterior probabilities for each class equal 0.5) can be evaluated and is shown by the green curve. This decision boundary is also plotted on the left-hand figure.
