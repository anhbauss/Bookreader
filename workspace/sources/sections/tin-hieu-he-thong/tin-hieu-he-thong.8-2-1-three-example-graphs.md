---
id: "tin-hieu-he-thong.8-2-1-three-example-graphs"
doc_id: "tin-hieu-he-thong"
title: "8.2.1 Three example graphs"
level: 2
heading_path: ["Graphical Models", "8.2.1 Three example graphs"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.8-2-conditional-independence"
next_id: "tin-hieu-he-thong.8-2-2-d-separation"
block_ids: ["b4202", "b4203", "b4204", "b4205", "b4206", "b4207", "b4208", "b4209", "b4210", "b4211", "b4212", "b4213", "b4214", "b4215", "b4216", "b4217", "b4218", "b4219", "b4220", "b4221", "b4222", "b4223", "b4224", "b4225", "b4226", "b4227", "b4228", "b4229", "b4230", "b4231", "b4232", "b4233", "b4234", "b4235", "b4236", "b4237", "b4238", "b4239", "b4240", "b4241", "b4242", "b4243", "b4244", "b4245", "b4246", "b4247", "b4248", "b4249", "b4250", "b4251", "b4252", "b4253", "b4254", "b4255", "b4256", "b4257", "b4258", "b4259", "b4260", "b4261", "b4262", "b4263", "b4264", "b4265"]
---

## 8.2.1 Three example graphs

We begin our discussion of the conditional independence properties of directed graphs by considering three simple examples each involving graphs having just three nodes. Together, these will motivate and illustrate the key concepts of d-separation. The first of the three examples is shown in Figure 8.15, and the joint distribution corresponding to this graph is easily written down using the general result (8.5) to give

p (a, b, c) = p (a | c) p (b | c) p (c).\tag{8.23}

If none of the variables are observed, then we can investigate whether a and b are independent by marginalizing both sides of (8.23) with respect to c to give

p (a, b) = \sum_ {c} p (a | c) p (b | c) p (c).\tag{8.24}

In general, this does not factorize into the product $p ( a ) p ( b )$ , and so

a \not \perp b \mid \emptyset\tag{8.25}

Figure 8.16 As in Figure 8.15 but where we have conditioned on the value of variable c.

![image](images/part-002--a17fe665074a1a33f0abcf7025f0690472953dbdb7d66b4f11e8d2b24b42673b.jpg)

where $\varnothing$ denotes the empty set, and the symbol means that the conditional independence property does not hold in general. Of course, it may hold for a particular distribution by virtue of the specific numerical values associated with the various conditional probabilities, but it does not follow in general from the structure of the graph.

Now suppose we condition on the variable $c ,$ as represented by the graph of Figure 8.16. From (8.23), we can easily write down the conditional distribution of a and b, given c, in the form

\begin{array}{r c l} p (a, b | c) & = & \frac {p (a , b , c)}{p (c)} \\ & = & p (a | c) p (b | c) \end{array}

and so we obtain the conditional independence property

a \perp b \mid c.

We can provide a simple graphical interpretation of this result by considering the path from node a to node b via c. The node c is said to be tail-to-tail with respect to this path because the node is connected to the tails of the two arrows, and the presence of such a path connecting nodes a and b causes these nodes to be dependent. However, when we condition on node $c ,$ as in Figure 8.16, the conditioned node ‘blocks’ the path from a to $b$ and causes a and b to become (conditionally) independent.

We can similarly consider the graph shown in Figure 8.17. The joint distribution corresponding to this graph is again obtained from our general formula (8.5) to give

p (a, b, c) = p (a) p (c | a) p (b | c).\tag{8.26}

First of all, suppose that none of the variables are observed. Again, we can test to see if a and b are independent by marginalizing over c to give

p (a, b) = p (a) \sum_ {c} p (c | a) p (b | c) = p (a) p (b | a).

Figure 8.17 The second of our three examples of 3-node graphs used to motivate the conditional independence framework for directed graphical models.

![image](images/part-002--2d6d464079a9f85ae6249e1a20eb3c3e78dc31c39919c207304ebe3ae9d3bd44.jpg)

Figure 8.18 As in Figure 8.17 but now conditioning on node c.

![image](images/part-002--3a91c04de20efc732129b7f99a185c1fcddc91d2569408206634b9dd20700c40.jpg)

which in general does not factorize into $p ( a ) p ( b )$ , and so

a \not \perp b \mid \emptyset\tag{8.27}

as before.

Now suppose we condition on node c, as shown in Figure 8.18. Using Bayes theorem, together with (8.26), we obtain

\begin{array}{r c l} p (a, b | c) & = & \frac {p (a , b , c)}{p (c)} \\ & = & \frac {p (a) p (c | a) p (b | c)}{p (c)} \\ & = & p (a | c) p (b | c) \end{array}

and so again we obtain the conditional independence property

a \perp b \mid c.

As before, we can interpret these results graphically. The node c is said to be head-to-tail with respect to the path from node a to node b. Such a path connects nodes a and b and renders them dependent. If we now observe c, as in Figure 8.18, then this observation ‘blocks’ the path from a to $b$ and so we obtain the conditional independence property a b c.

Finally, we consider the third of our 3-node examples, shown by the graph in Figure 8.19. As we shall see, this has a more subtle behaviour than the two previous graphs.

The joint distribution can again be written down using our general result (8.5) to give

p (a, b, c) = p (a) p (b) p (c | a, b).\tag{8.28}

Consider first the case where none of the variables are observed. Marginalizing both sides of (8.28) over c we obtain

p (a, b) = p (a) p (b)

![image](images/part-002--ca02a31e584118aa9d222a297257b18fa79ddc7cb40f43551a75224e7347a56d.jpg)

Figure 8.20 As in Figure 8.19 but conditioning on the value of node $c .$ In this graph, the act of conditioning induces a dependence between a and b.

![image](images/part-002--6aa6bc1b122f2c3e073e5f6c88f2ded6ee017bd7ee0190c9e13f7c24cbb8b130.jpg)

and so a and $b$ are independent with no variables observed, in contrast to the two previous examples. We can write this result as

a \perp \perp b \mid \emptyset .\tag{8.29}

Now suppose we condition on c, as indicated in Figure 8.20. The conditional distribution of a and b is then given by

\begin{array}{r c l} p (a, b | c) & = & \frac {p (a , b , c)}{p (c)} \\ & = & \frac {p (a) p (b) p (c | a , b)}{p (c)} \end{array}

which in general does not factorize into the product $p ( a ) p ( b )$ , and so

a \not \perp b \mid c.

Thus our third example has the opposite behaviour from the first two. Graphically, we say that node c is head-to-head with respect to the path from a to b because it connects to the heads of the two arrows. When node c is unobserved, it ‘blocks the path, and the variables a and b are independent. However, conditioning on c ‘unblocks’ the path and renders a and b dependent.

There is one more subtlety associated with this third example that we need to consider. First we introduce some more terminology. We say that node y is a descendant of node x if there is a path from x to y in which each step of the path follows the directions of the arrows. Then it can be shown that a head-to-head path will become unblocked if either the node, or any ofits descendants, is observed.

In summary, a tail-to-tail node or a head-to-tail node leaves a path unblocked unless it is observed in which case it blocks the path. By contrast, a head-to-head node blocks a path if it is unobserved, but once the node, and/or at least one of its descendants, is observed the path becomes unblocked.

It is worth spending a moment to understand further the unusual behaviour of the graph of Figure 8.20. Consider a particular instance of such a graph corresponding to a problem with three binary random variables relating to the fuel system on a car, as shown in Figure 8.21. The variables are called B, representing the state of a battery that is either charged $( B = 1 )$ or flat $( B = 0 )$ , F representing the state of the fuel tank that is either full of fuel $( F = 1 )$ or empty $( F = 0 )$ , and G, which is the state of an electric fuel gauge and which indicates either full $( G = 1 )$ or empty $( G = 0 )$ . The battery is either charged or flat, and independently the fuel tank is either full or empty, with prior probabilities

![image](images/part-002--2a06ca9565d1101d79ae4906730728d453bdfeb1a2126daf194d2f811500cc99.jpg)

Figure 8.21 An example of a 3-node graph used to illustrate the phenomenon of ‘explaining away’. The three nodes represent the state of the battery (B), the state of the fuel tank (F) and the reading on the electric fuel gauge (G). See the text for details.

\begin{array}{r c l} p (B = 1) & = & 0. 9 \\ p (F = 1) & = & 0. 9. \end{array}

Given the state of the fuel tank and the battery, the fuel gauge reads full with probabilities given by

\begin{array}{r c l} p (G = 1 | B = 1, F = 1) & = & 0. 8 \\ p (G = 1 | B = 1, F = 0) & = & 0. 2 \\ p (G = 1 | B = 0, F = 1) & = & 0. 2 \\ p (G = 1 | B = 0, F = 0) & = & 0. 1 \end{array}

so this is a rather unreliable fuel gauge! All remaining probabilities are determined by the requirement that probabilities sum to one, and so we have a complete specification of the probabilistic model.

Before we observe any data, the prior probability of the fuel tank being empty is $p ( F = 0 ) = 0 . 1$ . Now suppose that we observe the fuel gauge and discover that it reads empty, i.e., $G = 0$ , corresponding to the middle graph in Figure 8.21. We can use Bayes’ theorem to evaluate the posterior probability of the fuel tank being empty. First we evaluate the denominator for Bayes’ theorem given by

p (G = 0) = \sum_ {B \in \{0, 1 \}} \sum_ {F \in \{0, 1 \}} p (G = 0 | B, F) p (B) p (F) = 0. 3 1 5\tag{8.30}

and similarly we evaluate

p (G = 0 | F = 0) = \sum_ {B \in \{0, 1 \}} p (G = 0 | B, F = 0) p (B) = 0. 8 1\tag{8.31}

and using these results we have

p (F = 0 | G = 0) = \frac {p (G = 0 | F = 0) p (F = 0)}{p (G = 0)} \simeq 0. 2 5 7\tag{8.32}

and so $p ( F = 0 | G = 0 ) > p ( F = 0 )$ . Thus observing that the gauge reads empty makes it more likely that the tank is indeed empty, as we would intuitively expect. Next suppose that we also check the state of the battery and find that it is flat, i.e., $B = 0$ . We have now observed the states of both the fuel gauge and the battery, as shown by the right-hand graph in Figure 8.21. The posterior probability that the fuel tank is empty given the observations of both the fuel gauge and the battery state is then given by

p (F = 0 | G = 0, B = 0) = \frac {p (G = 0 | B = 0 , F = 0) p (F = 0)}{\sum_ {F \in \{0 , 1 \}} p (G = 0 | B = 0 , F) p (F)} \simeq 0. 1 1 1\tag{8.33}

where the prior probability $p ( B = 0 )$ has cancelled between numerator and denominator. Thus the probability that the tank is empty has decreased (from 0.257 to 0.111) as a result of the observation of the state of the battery. This accords with our intuition that finding out that the battery is flat explains away the observation that the fuel gauge reads empty. We see that the state of the fuel tank and that of the battery have indeed become dependent on each other as a result of observing the reading on the fuel gauge. In fact, this would also be the case ${ \mathrm { i f } } ,$ instead of observing the fuel gauge directly, we observed the state of some descendant of $G .$ Note that the probability $p ( F = 0 | G = 0 , B = 0 ) \simeq 0$ .111 is greater than the prior probability $p ( F = 0 ) = 0 . 1$ because the observation that the fuel gauge reads zero still provides some evidence in favour of an empty fuel tank.
