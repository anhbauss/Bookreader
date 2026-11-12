---
id: "tin-hieu-he-thong.1-6-information-theory"
doc_id: "tin-hieu-he-thong"
title: "1.6. Information Theory"
level: 2
heading_path: ["Introduction", "1.6. Information Theory"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-5-5-loss-functions-for-regression"
next_id: "tin-hieu-he-thong.ludwig-boltzmann-1844-1906"
block_ids: ["b526", "b527", "b528", "b529", "b530", "b531", "b532", "b533", "b534", "b535", "b536", "b537", "b538", "b539", "b540", "b541", "b542", "b543", "b544", "b545", "b546", "b547", "b548", "b549", "b550", "b551", "b552", "b553", "b554", "b555", "b556", "b557", "b558", "b559", "b560", "b561", "b562", "b563", "b564", "b565", "b566", "b567", "b568", "b569", "b570", "b571", "b572", "b573", "b574", "b575", "b576", "b577", "b578"]
---

## 1.6. Information Theory

In this chapter, we have discussed a variety of concepts from probability theory and decision theory that will form the foundations for much of the subsequent discussion in this book. We close this chapter by introducing some additional concepts from the field of information theory, which will also prove useful in our development of pattern recognition and machine learning techniques. Again, we shall focus only on the key concepts, and we refer the reader elsewhere for more detailed discussions (Viterbi and Omura, 1979; Cover and Thomas, 1991; MacKay, 2003) .

We begin by considering a discrete random variable x and we ask how much information is received when we observe a specific value for this variable. The amount of information can be viewed as the ‘degree of surprise’ on learning the value of $x .$ . If we are told that a highly improbable event has just occurred, we will have received more information than if we were told that some very likely event has just occurred, and if we knew that the event was certain to happen we would receive no information. Our measure of information content will therefore depend on the probability distribution $p ( x )$ , and we therefore look for a quantity $h ( x )$ that is a monotonic function of the probability $p ( x )$ and that expresses the information content. The form of $h ( \cdot )$ can be found by noting that if we have two events x and $y$ that are unrelated, then the information gain from observing both of them should be the sum of the information gained from each of them separately, so that $h ( x , y ) = h ( x ) + h ( y )$ . Two unrelated events will be statistically independent and so $p ( x , y ) = p ( x ) p ( y )$ . From these two relationships, it is easily shown that $h ( x )$ must be given by the logarithm of $p ( x )$ and so we have

![image](images/part-001--64c22ac39abb389e7ce60cd67e734ec32a9abee9ea1c307e0e1127074a75bb11.jpg)

![image](images/part-001--ab3c7cd16639cf315da795eef8248fbfd7185bef3c3e27eba13d021dbff6e693.jpg)

![image](images/part-001--df3adb2d95beb4414636b54eb20e6e9c4cab9053eccb10c184b65ce05555141a.jpg)

![image](images/part-001--c67a07ab198e5a372d22ca6e7f9064953b9a0edb08c7000669a9583e5a2c6161.jpg)

Figure 1.29 Plots of the quantity $L _ { q } = | y - t | ^ { q }$ for various values of $q .$

h (x) = - \log_ {2} p (x)\tag{1.92}

where the negative sign ensures that information is positive or zero. Note that low probability events x correspond to high information content. The choice of basis for the logarithm is arbitrary, and for the moment we shall adopt the convention prevalent in information theory of using logarithms to the base of 2. In this case, as we shall see shortly, the units of $h ( x )$ are bits (‘binary digits’).

Now suppose that a sender wishes to transmit the value of a random variable to a receiver. The average amount of information that they transmit in the process is obtained by taking the expectation of (1.92) with respect to the distribution $p ( x )$ and is given by

\mathrm{H} [ x ] = - \sum_ {x} p (x) \log_ {2} p (x).\tag{1.93}

This important quantity is called the entropy of the random variable x. Note that $\begin{array} { r } { \operatorname* { l i m } _ { p \longrightarrow 0 } p \ln p = 0 } \end{array}$ and so we shall take $p ( x ) \ln p ( x ) = 0$ whenever we encounter a value for x such that $p ( x ) = 0$

So far we have given a rather heuristic motivation for the definition of information (1.92) and the corresponding entropy (1.93). We now show that these definitions indeed possess useful properties. Consider a random variable x having 8 possible states, each of which is equally likely. In order to communicate the value of x to a receiver, we would need to transmit a message of length 3 bits. Notice that the entropy of this variable is given by

\mathrm{H} [ x ] = - 8 \times \frac {1}{8} \log_ {2} {\frac {1}{8}} = 3 \mathrm{bits}.

Now consider an example (Cover and Thomas, 1991) of a variable having 8 possible states $\{ a , b , c , d , e , f , g , h \}$ for which the respective probabilities are given by $( \textstyle { \frac { 1 } { 2 } } , \textstyle { \frac { 1 } { 4 } } , \textstyle { \frac { 1 } { 8 } } , \textstyle { \frac { 1 } { 1 6 } } , \textstyle { \frac { 1 } { 6 4 } } , \textstyle { \frac { 1 } { 6 4 } } , \textstyle { \frac { 1 } { 6 4 } } , \textstyle { \frac { 1 } { 6 4 } } ) $ . The entropy in this case is given by

\mathrm{H} [ x ] = - \frac {1}{2} \log_ {2} \frac {1}{2} - \frac {1}{4} \log_ {2} \frac {1}{4} - \frac {1}{8} \log_ {2} \frac {1}{8} - \frac {1}{1 6} \log_ {2} \frac {1}{1 6} - \frac {4}{6 4} \log_ {2} \frac {1}{6 4} = 2 \text {bits.}

We see that the nonuniform distribution has a smaller entropy than the uniform one, and we shall gain some insight into this shortly when we discuss the interpretation of entropy in terms of disorder. For the moment, let us consider how we would transmit the identity of the variable’s state to a receiver. We could do this, as before, using a 3-bit number. However, we can take advantage of the nonuniform distribution by using shorter codes for the more probable events, at the expense of longer codes for the less probable events, in the hope of getting a shorter average code length. This can be done by representing the states $\{ a , b , c , d , e , f , g , h \}$ using, for instance, the following set of code strings: 0, 10, 110, 1110, 111100, 111101, 111110, 111111. The average length of the code that has to be transmitted is then

\text { average   code   length } = \frac {1}{2} \times 1 + \frac {1}{4} \times 2 + \frac {1}{8} \times 3 + \frac {1}{1 6} \times 4 + 4 \times \frac {1}{6 4} \times 6 = 2 \text { bits }

which again is the same as the entropy of the random variable. Note that shorter code strings cannot be used because it must be possible to disambiguate a concatenation of such strings into its component parts. For instance, 11001110 decodes uniquely into the state sequence $c , a , d .$

This relation between entropy and shortest coding length is a general one. The noiseless coding theorem (Shannon, 1948) states that the entropy is a lower bound on the number of bits needed to transmit the state of a random variable.

From now on, we shall switch to the use of natural logarithms in defining entropy, as this will provide a more convenient link with ideas elsewhere in this book. In this case, the entropy is measured in units of ‘nats’ instead of bits, which differ simply by a factor of ln 2.

We have introduced the concept of entropy in terms of the average amount of information needed to specify the state of a random variable. In fact, the concept of entropy has much earlier origins in physics where it was introduced in the context of equilibrium thermodynamics and later given a deeper interpretation as a measure of disorder through developments in statistical mechanics. We can understand this alternative view of entropy by considering a set of N identical objects that are to be divided amongst a set of bins, such that there are $n _ { i }$ objects in the $i ^ { \mathrm { t h } }$ bin. Consider the number of different ways of allocating the objects to the bins. There are N ways to choose the first object, $( N - 1 )$ ways to choose the second object, and so on, leading to a total of N! ways to allocate all N objects to the bins, where N! (pronounced ‘factorial $N ^ { \prime } )$ denotes the product $N \times ( N - 1 ) \times \cdot \cdot \cdot \times 2 \times 1$ . However, we don’t wish to distinguish between rearrangements of objects within each bin. In the $i ^ { \mathrm { t h } }$ bin there are $n _ { i } !$ ways of reordering the objects, and so the total number of ways of allocating the N objects to the bins is given by

W = \frac {N !}{\prod_ {i} n _ {i} !}\tag{1.94}

which is called the multiplicity. The entropy is then defined as the logarithm of the multiplicity scaled by an appropriate constant

\mathrm{H} = \frac {1}{N} \ln W = \frac {1}{N} \ln N! - \frac {1}{N} \sum_ {i} \ln n _ {i}!.\tag{1.95}

We now consider the limit $N \to \infty$ , in which the fractions $n _ { i } / N$ are held fixed, and apply Stirling’s approximation

\ln N! \simeq N \ln N - N\tag{1.96}

which gives

\mathrm{H} = - \lim _ {N \to \infty} \sum_ {i} \left(\frac {n _ {i}}{N}\right) \ln \left(\frac {n _ {i}}{N}\right) = - \sum_ {i} p _ {i} \ln p _ {i}\tag{1.97}

where we have used $\textstyle \sum _ { i } n _ { i } = N$ . Here $p _ { i } = \mathrm { l i m } _ { N \to \infty } ( n _ { i } / N )$ is the probability of an object being assigned to the $i ^ { \mathrm { t h } }$ bin. In physics terminology, the specific arrangements of objects in the bins is called a microstate, and the overall distribution of occupation numbers, expressed through the ratios $n _ { i } / N$ , is called a macrostate. The multiplicity W is also known as the weight of the macrostate.

We can interpret the bins as the states $x _ { i }$ of a discrete random variable X, where $p ( X = x _ { i } ) = p _ { i }$ . The entropy of the random variable X is then

\mathrm{H} [ p ] = - \sum_ {i} p (x _ {i}) \ln p (x _ {i}).\tag{1.98}

Distributions $p ( x _ { i } )$ that are sharply peaked around a few values will have a relatively low entropy, whereas those that are spread more evenly across many values will have higher entropy, as illustrated in Figure 1.30. Because $0 \leqslant p _ { i } \leqslant 1$ , the entropy is nonnegative, and it will equal its minimum value of 0 when one of the $\begin{array} { r l } { p _ { i } } & { { } = } \end{array}$ 1 and all other $p _ { j \neq i } = 0$ . The maximum entropy configuration can be found by maximizing H using a Lagrange multiplier to enforce the normalization constraint on the probabilities. Thus we maximize

\widetilde {\mathrm{H}} = - \sum_ {i} p (x _ {i}) \ln p (x _ {i}) + \lambda \left(\sum_ {i} p (x _ {i}) - 1\right)

(1.99)

![image](images/part-001--c736470bf53886a4d6e70e1fb7dfda0a1522503a91bbf54e35ac65803a501931.jpg)

![image](images/part-001--8a98e063eef2a3cf134b4c738886c15f03077e1afe4a0d610b4554bab2442b9a.jpg)

Figure 1.30 Histograms of two probability distributions over 30 bins illustrating the higher value of the entropy H for the broader distribution. The largest entropy would arise from a uniform distribution that would give $\mathrm { H } =$ $- \ln ( 1 / 3 0 ) = 3 . 4 0$

from which we find that all of the $p ( x _ { i } )$ are equal and are given by $p ( x _ { i } ) = 1 / M$ where M is the total number of states $x _ { i }$ . The corresponding value of the entropy is then H = ln M. This result can also be derived from Jensen’s inequality (to be discussed shortly). To verify that the stationary point is indeed a maximum, we can evaluate the second derivative of the entropy, which gives

Exercise 1.29

\frac {\partial \widetilde {\mathrm{H}}}{\partial p (x _ {i}) \partial p (x _ {j})} = - I _ {i j} \frac {1}{p _ {i}}\tag{1.100}

where $I _ { i j }$ are the elements of the identity matrix.

We can extend the definition of entropy to include distributions $p ( x )$ over continuous variables x as follows. First divide x into bins of width $\Delta .$ . Then, assuming $p ( x )$ is continuous, the mean value theorem (Weisstein, 1999) tells us that, for each such bin, there must exist a value $x _ { i }$ such that

\int_ {i \Delta} ^ {(i + 1) \Delta} p (x) \mathrm{d} x = p (x _ {i}) \Delta .\tag{1.101}

We can now quantize the continuous variable x by assigning any value x to the value $x _ { i }$ whenever x falls in the $i ^ { \mathrm { t h } }$ bin. The probability of observing the value $x _ { i }$ is then $p ( x _ { i } ) \Delta$ . This gives a discrete distribution for which the entropy takes the form

\mathrm{H} _ {\Delta} = - \sum_ {i} p (x _ {i}) \Delta \ln {(p (x _ {i}) \Delta)} = - \sum_ {i} p (x _ {i}) \Delta \ln {p (x _ {i})} - \ln {\Delta}\tag{1.102}

where we have used $\begin{array} { r } { \sum _ { i } p ( x _ { i } ) \Delta = 1 } \end{array}$ , which follows from (1.101). We now omit the second term ln $\Delta$ on the right-hand side of (1.102) and then consider the limit $\Delta \to 0$ . The first term on the right-hand side of (1.102) will approach the integral of $p ( x )$ ln $p ( x )$ in this limit so that

\lim _ {\Delta \rightarrow 0} \left\{\sum_ {i} p (x _ {i}) \Delta \ln p (x _ {i}) \right\} = - \int p (x) \ln p (x) \mathrm{d} x\tag{1.103}

where the quantity on the right-hand side is called the differential entropy. We see that the discrete and continuous forms of the entropy differ by a quantity ln $\Delta .$ , which diverges in the limit $\Delta  0$ . This reflects the fact that to specify a continuous variable very precisely requires a large number of bits. For a density defined over multiple continuous variables, denoted collectively by the vector x, the differential entropy is given by

\mathrm{H} [ \mathbf {x} ] = - \int p (\mathbf {x}) \ln p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{1.104}

In the case of discrete distributions, we saw that the maximum entropy configuration corresponded to an equal distribution of probabilities across the possible states of the variable. Let us now consider the maximum entropy configuration for a continuous variable. In order for this maximum to be well defined, it will be necessary to constrain the first and second moments of $p ( x )$ as well as preserving the normalization constraint. We therefore maximize the differential entropy with the

![image](images/part-001--6698665971883c47ca7f0d8f72211b9d6c040f085b8a3bc0981da849f105c40b.jpg)
