---
id: "tin-hieu-he-thong.1-6-1-relative-entropy-and-mutual-information"
doc_id: "tin-hieu-he-thong"
title: "1.6.1 Relative entropy and mutual information"
level: 2
heading_path: ["Introduction", "1.6.1 Relative entropy and mutual information"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.ludwig-boltzmann-1844-1906"
next_id: "tin-hieu-he-thong.claude-shannon-1916-2001"
block_ids: ["b602", "b603", "b604", "b605", "b606", "b607"]
---

## 1.6.1 Relative entropy and mutual information

So far in this section, we have introduced a number of concepts from information theory, including the key notion of entropy. We now start to relate these ideas to pattern recognition. Consider some unknown distribution $p ( \mathbf { x } )$ , and suppose that we have modelled this using an approximating distribution $q ( \mathbf { x } )$ . If we use $q ( \mathbf { x } )$ to construct a coding scheme for the purpose of transmitting values of x to a receiver, then the average additional amount of information (in nats) required to specify the value of x (assuming we choose an efficient coding scheme) as a result of using $q ( \mathbf { x } )$ instead of the true distribution $p ( \mathbf { x } )$ is given by

\begin{array}{r c l} \mathrm{KL} (p \| q) & = & - \int p (\mathbf {x}) \ln q (\mathbf {x})   \mathrm{d} \mathbf {x} - \left(- \int p (\mathbf {x}) \ln p (\mathbf {x})   \mathrm{d} \mathbf {x}\right) \\ & = & - \int p (\mathbf {x}) \ln \left\{\frac {q (\mathbf {x})}{p (\mathbf {x})} \right\}   \mathrm{d} \mathbf {x}. \end{array}\tag{1.113}

This is known as the relative entropy or Kullback-Leibler divergence, or KL divergence (Kullback and Leibler, 1951), between the distributions $p ( \mathbf { x } )$ and $q ( \mathbf { x } )$ . Note that it is not a symmetrical quantity, that is to say $\mathrm { K L } ( p \| q ) \not \equiv \mathrm { K L } ( q \| p )$

We now show that the Kullback-Leibler divergence satisfies KL $( p \| q ) \geqslant 0$ with equality if, and only if, $p ( \mathbf { x } ) = q ( \mathbf { x } )$ . To do this we first introduce the concept of convex functions. A function $f ( x )$ is said to be convex if it has the property that every chord lies on or above the function, as shown in Figure 1.31. Any value of x in the interval from $x = a$ to $x = b$ can be written in the form $\lambda a + ( 1 - \lambda ) b$ where $0 \leqslant \lambda \leqslant 1$ . The corresponding point on the chord is given by $\lambda f ( a ) + ( 1 - \lambda ) f ( b )$

![image](images/part-001--1b663dc236e9ed322a7b8fb32b63eb5de37c04df9bf8154165d9ef8a3ace161d.jpg)
