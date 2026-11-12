---
id: "tin-hieu-he-thong.8-3-markov-random-fields"
doc_id: "tin-hieu-he-thong"
title: "8.3. Markov Random Fields"
level: 2
heading_path: ["Graphical Models", "8.3. Markov Random Fields"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-2-2-d-separation"
next_id: "tin-hieu-he-thong.8-3-1-conditional-independence-properties"
block_ids: ["b4308", "b4309", "b4310"]
---

## 8.3. Markov Random Fields

We have seen that directed graphical models specify a factorization of the joint distribution over a set of variables into a product of local conditional distributions. They also define a set of conditional independence properties that must be satisfied by any distribution that factorizes according to the graph. We turn now to the second major class of graphical models that are described by undirected graphs and that again specify both a factorization and a set of conditional independence relations.

A Markov random field, also known as a Markov network or an undirected graphical model (Kindermann and Snell, 1980), has a set of nodes each of which corresponds to a variable or group of variables, as well as a set of links each of which connects a pair of nodes. The links are undirected, that is they do not carry arrows. In the case of undirected graphs, it is convenient to begin with a discussion of conditional independence properties.
