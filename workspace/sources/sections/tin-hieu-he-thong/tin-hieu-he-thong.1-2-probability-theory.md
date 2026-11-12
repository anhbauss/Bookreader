---
id: "tin-hieu-he-thong.1-2-probability-theory"
doc_id: "tin-hieu-he-thong"
title: "1.2. Probability Theory"
level: 2
heading_path: ["Introduction", "1.2. Probability Theory"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.1-1-example-polynomial-curve-fitting"
next_id: "tin-hieu-he-thong.1-2-1-probability-densities"
block_ids: ["b162", "b163", "b164", "b165", "b166", "b167", "b168", "b169", "b170", "b171", "b172", "b173", "b174", "b175", "b176", "b177", "b178", "b179", "b180", "b181", "b182", "b183", "b184", "b185", "b186", "b187", "b188", "b189", "b190", "b191", "b192", "b193", "b194", "b195", "b196", "b197", "b198", "b199", "b200", "b201", "b202", "b203", "b204", "b205", "b206", "b207", "b208", "b209", "b210", "b211", "b212", "b213", "b214", "b215", "b216", "b217", "b218", "b219", "b220", "b221", "b222", "b223", "b224", "b225", "b226", "b227"]
---

## 1.2. Probability Theory

A key concept in the field of pattern recognition is that of uncertainty. It arises both through noise on measurements, as well as through the finite size of data sets. Probability theory provides a consistent framework for the quantification and manipulation of uncertainty and forms one of the central foundations for pattern recognition. When combined with decision theory, discussed in Section 1.5, it allows us to make optimal predictions given all the information available to us, even though that information may be incomplete or ambiguous.

We will introduce the basic concepts of probability theory by considering a simple example. Imagine we have two boxes, one red and one blue, and in the red box we have 2 apples and 6 oranges, and in the blue box we have 3 apples and 1 orange. This is illustrated in Figure 1.9. Now suppose we randomly pick one of the boxes and from that box we randomly select an item of fruit, and having observed which sort of fruit it is we replace it in the box from which it came. We could imagine repeating this process many times. Let us suppose that in so doing we pick the red box 40% of the time and we pick the blue box 60% of the time, and that when we remove an item of fruit from a box we are equally likely to select any of the pieces of fruit in the box.

In this example, the identity of the box that will be chosen is a random variable, which we shall denote by B. This random variable can take one of two possible values, namely r (corresponding to the red box) or b (corresponding to the blue box). Similarly, the identity of the fruit is also a random variable and will be denoted by F. It can take either of the values a (for apple) or o (for orange).

To begin with, we shall define the probability of an event to be the fraction of times that event occurs out of the total number of trials, in the limit that the total number of trials goes to infinity. Thus the probability of selecting the red box is 4/10

We use a simple example of two coloured boxes each containing fruit (apples shown in green and oranges shown in orange) to introduce the basic ideas of probability.

![image](images/part-001--da24b74475870a5db49d5a770b9c39e17702cafff58e8af498158de0c3776324.jpg)

Figure 1.10 We can derive the sum and product rules of probability by considering two random variables, $X$ , which takes the values $\{ x _ { i } \}$ where $i = 1 , \dots , \mathbf { \bar { \cal M } }$ , and $Y$ , which takes the values $\{ y _ { j } \}$ where $j \doteq 1 , \ldots , L$ In this illustration we have $M = 5$ and $L = 3 .$ If we consider a total number N of instances of these variables, then we denote the number of instances where $X = x _ { i }$ and $Y = y _ { j }$ by $n _ { i j } ,$ which is the number of points in the corresponding cell of the array. The number of points in column $i ,$ corresponding to $X = x _ { i }$ , is denoted by $c _ { i }$ , and the number of points in row j, corresponding to $Y = y _ { j }$ , is denoted by $r _ { j }$

![image](images/part-001--02bc0c34b969a5235b4673f4918c7d7fc6d88973e3fde4e32cabc7a35375eafc.jpg)

and the probability of selecting the blue box is $6 / 1 0$ . We write these probabilities as $p ( B = r ) = 4 / 1 0$ and $p ( B = b ) = 6 / 1 0$ . Note that, by definition, probabilities must lie in the interval [0, 1]. Also, if the events are mutually exclusive and if they include all possible outcomes (for instance, in this example the box must be either red or blue), then we see that the probabilities for those events must sum to one.

We can now ask questions such as: “what is the overall probability that the selection procedure will pick an apple?”, or “given that we have chosen an orange, what is the probability that the box we chose was the blue one?”. We can answer questions such as these, and indeed much more complex questions associated with problems in pattern recognition, once we have equipped ourselves with the two elementary rules of probability, known as the sum rule and the product rule. Having obtained these rules, we shall then return to our boxes of fruit example.

In order to derive the rules of probability, consider the slightly more general example shown in Figure 1.10 involving two random variables X and Y (which could for instance be the Box and Fruit variables considered above). We shall suppose that X can take any of the values $x _ { i }$ where $i = 1 , \dots , M$ , and $Y$ can take the values $y _ { j }$ where $j = 1 , \dots , L$ . Consider a total of N trials in which we sample both of the variables X and $Y$ , and let the number of such trials in which $X = x _ { i }$ and $Y = y _ { j }$ be $n _ { i j }$ . Also, let the number of trials in which X takes the value $x _ { i }$ (irrespective of the value that $Y$ takes) be denoted by $c _ { i }$ , and similarly let the number of trials in which Y takes the value $y _ { j }$ be denoted by $r _ { j }$

The probability that X will take the value $x _ { i }$ and Y will take the value $y _ { j }$ is written $p ( X = x _ { i } , Y = y _ { j } )$ and is called the joint probability of $X ~ = ~ x _ { i }$ and $Y = y _ { j }$ . It is given by the number of points falling in the cell $i , j$ as a fraction of the total number of points, and hence

p (X = x _ {i}, Y = y _ {j}) = \frac {n _ {i j}}{N}.\tag{1.5}

Here we are implicitly considering the limit $N \to \infty$ . Similarly, the probability that X takes the value $x _ { i }$ irrespective of the value of Y is written as $p ( X = x _ { i } )$ and is given by the fraction of the total number of points that fall in column i, so that

p (X = x _ {i}) = \frac {c _ {i}}{N}.\tag{1.6}

Because the number of instances in column i in Figure 1.10 is just the sum of the number of instances in each cell of that column, we have $c _ { i } = \textstyle \sum _ { j } n _ { i j }$ and therefore,

from (1.5) and (1.6), we have

p (X = x _ {i}) = \sum_ {j = 1} ^ {L} p (X = x _ {i}, Y = y _ {j})\tag{1.7}

which is the sum rule of probability. Note that $p ( X = x _ { i } )$ is sometimes called the marginal probability, because it is obtained by marginalizing, or summing out, the other variables (in this case $Y )$

If we consider only those instances for which $X ~ = ~ x _ { i }$ , then the fraction of such instances for which $Y = y _ { j }$ is written $p ( Y = y _ { j } | X = x _ { i } )$ and is called the conditional probability of $Y ~ = ~ y _ { j }$ given $X ~ = ~ x _ { i }$ . It is obtained by finding the fraction of those points in column i that fall in cell $i , j$ and hence is given by

p (Y = y _ {j} | X = x _ {i}) = \frac {n _ {i j}}{c _ {i}}.\tag{1.8}

From (1.5), (1.6), and (1.8), we can then derive the following relationship

\begin{array}{r c l} p (X = x _ {i}, Y = y _ {j}) & = & \frac {n _ {i j}}{N} = \frac {n _ {i j}}{c _ {i}} \cdot \frac {c _ {i}}{N} \\ & = & p (Y = y _ {j} | X = x _ {i}) p (X = x _ {i}) \end{array}\tag{1.9}

which is the product rule of probability.

So far we have been quite careful to make a distinction between a random variable, such as the box B in the fruit example, and the values that the random variable can take, for example r if the box were the red one. Thus the probability that B takes the value $r$ is denoted $p ( B = r )$ . Although this helps to avoid ambiguity, it leads to a rather cumbersome notation, and in many cases there will be no need for such pedantry. Instead, we may simply write $p ( B )$ to denote a distribution over the random variable $B ,$ or $p ( r )$ to denote the distribution evaluated for the particular value r, provided that the interpretation is clear from the context.

With this more compact notation, we can write the two fundamental rules of probability theory in the following form.

The Rules of Probability

sum rule

p (X) = \sum_ {Y} p (X, Y)\tag{1.10}

product rule

p (X, Y) = p (Y | X) p (X).\tag{1.11}

Here $p ( X , Y )$ is a joint probability and is verbalized as “the probability of X and $Y ^ { \ast }$ . Similarly, the quantity $p ( Y | X )$ is a conditional probability and is verbalized as “the probability of $Y$ given $X ^ { \dag }$ , whereas the quantity $p ( X )$ is a marginal probability and is simply “the probability of $X ^ { \dag }$ . These two simple rules form the basis for all of the probabilistic machinery that we use throughout this book.

From the product rule, together with the symmetry property $p ( X , Y ) = p ( Y , X )$ we immediately obtain the following relationship between conditional probabilities

p (Y | X) = \frac {p (X | Y) p (Y)}{p (X)}\tag{1.12}

which is called Bayes’ theorem and which plays a central role in pattern recognition and machine learning. Using the sum rule, the denominator in Bayes’ theorem can be expressed in terms of the quantities appearing in the numerator

p (X) = \sum_ {Y} p (X | Y) p (Y).\tag{1.13}

We can view the denominator in Bayes’ theorem as being the normalization constant required to ensure that the sum of the conditional probability on the left-hand side of (1.12) over all values of $Y$ equals one.

In Figure 1.11, we show a simple example involving a joint distribution over two variables to illustrate the concept of marginal and conditional distributions. Here a finite sample of $N = 6 0$ data points has been drawn from the joint distribution and is shown in the top left. In the top right is a histogram of the fractions of data points having each of the two values of $Y$ . From the definition of probability, these fractions would equal the corresponding probabilities $p ( Y )$ in the limit $N \to \infty$ . We can view the histogram as a simple way to model a probability distribution given only a finite number of points drawn from that distribution. Modelling distributions from data lies at the heart of statistical pattern recognition and will be explored in great detail in this book. The remaining two plots in Figure 1.11 show the corresponding histogram estimates of $p ( X )$ and $p ( X | Y = 1 )$

Let us now return to our example involving boxes of fruit. For the moment, we shall once again be explicit about distinguishing between the random variables and their instantiations. We have seen that the probabilities of selecting either the red or the blue boxes are given by

p (B = r) = 4 / 1 0\tag{1.14}

p (B = b) = 6 / 1 0\tag{1.15}

respectively. Note that these satisfy $p ( B = r ) + p ( B = b ) = 1$

Now suppose that we pick a box at random, and it turns out to be the blue box. Then the probability of selecting an apple is just the fraction of apples in the blue box which is $3 / 4$ , and so $p ( F = a | B = b ) = 3 / 4$ . In fact, we can write out all four conditional probabilities for the type of fruit, given the selected box

p (F = a | B = r) = 1 / 4\tag{1.16}

p (F = o | B = r) = 3 / 4\tag{1.17}

p (F = a | B = b) = 3 / 4\tag{1.18}

p (F = o | B = b) = 1 / 4.\tag{1.19}

![image](images/part-001--ec1a6f103bdd4654e27b95bca261898a019066465ca45fb55e6648d506d9403a.jpg)

p(X)

![image](images/part-001--75883a1167e7f746b64badb73b29586020f829ba470cf3f1128897ba5734e6df.jpg)

![image](images/part-001--a7ac085231bacec427a0c0e77d98d96fa53b5b2f241e2e9507ad8794c7a733c2.jpg)

![image](images/part-001--8e6d755a5bb08af9bbc1efbf3d242ebfe953cd96e09a91718fb826e2e045bf10.jpg)

Figure 1.11 An illustration of a distribution over two variables, $X ,$ , which takes 9 possible values, and ${ \cal Y } ,$ , which takes two possible values. The top left figure shows a sample of 60 points drawn from a joint probability distribution over these variables. The remaining figures show histogram estimates of the marginal distributions $p ( X )$ and $p ( Y )$ , as well as the conditional distribution $p ( X | Y = 1 )$ corresponding to the bottom row in the top left figure.

Again, note that these probabilities are normalized so that

p (F = a | B = r) + p (F = o | B = r) = 1\tag{1.20}

and similarly

p (F = a | B = b) + p (F = o | B = b) = 1.\tag{1.21}

We can now use the sum and product rules of probability to evaluate the overall probability of choosing an apple

\begin{array}{r c l} p (F = a) & = & p (F = a \mid B = r) p (B = r) + p (F = a \mid B = b) p (B = b) \\ & = & \frac {1}{4} \times \frac {4}{1 0} + \frac {3}{4} \times \frac {6}{1 0} = \frac {1 1}{2 0} \end{array} \tag {C}\tag{1.22}

from which it follows, using the sum rule, that $p ( F = o ) = 1 - 1 1 / 2 0 = 9 / 2 0$

Suppose instead we are told that a piece of fruit has been selected and it is an orange, and we would like to know which box it came from. This requires that we evaluate the probability distribution over boxes conditioned on the identity of the fruit, whereas the probabilities in (1.16)–(1.19) give the probability distribution over the fruit conditioned on the identity of the box. We can solve the problem of reversing the conditional probability by using Bayes’ theorem to give

p (B = r | F = o) = \frac {p (F = o | B = r) p (B = r)}{p (F = o)} = \frac {3}{4} \times \frac {4}{1 0} \times \frac {2 0}{9} = \frac {2}{3}.\tag{1.23}

From the sum rule, it then follows that $\begin{array} { r } { p ( B = b | F = o ) = 1 - 2 / 3 = 1 / 3 . } \end{array}$

We can provide an important interpretation of Bayes’ theorem as follows. If we had been asked which box had been chosen before being told the identity of the selected item of fruit, then the most complete information we have available is provided by the probability $p ( B )$ . We call this the prior probability because it is the probability available before we observe the identity of the fruit. Once we are told that the fruit is an orange, we can then use Bayes’ theorem to compute the probability $p ( B | F )$ , which we shall call the posterior probability because it is the probability obtained after we have observed $F _ { \cdot }$ . Note that in this example, the prior probability of selecting the red box was $4 / 1 0 .$ , so that we were more likely to select the blue box than the red one. However, once we have observed that the piece of selected fruit is an orange, we find that the posterior probability of the red box is now $2 / 3 ,$ , so that it is now more likely that the box we selected was in fact the red one. This result accords with our intuition, as the proportion of oranges is much higher in the red box than it is in the blue box, and so the observation that the fruit was an orange provides significant evidence favouring the red box. In fact, the evidence is sufficiently strong that it outweighs the prior and makes it more likely that the red box was chosen rather than the blue one.

Finally, we note that if the joint distribution of two variables factorizes into the product of the marginals, so that $p ( X , Y ) = p ( X ) p ( Y )$ , then X and $Y$ are said to be independent. From the product rule, we see that $p ( Y | X ) = p ( Y )$ , and so the conditional distribution of $\bar { Y }$ given X is indeed independent of the value of $X$ . For instance, in our boxes of fruit example, if each box contained the same fraction of apples and oranges, then $p ( F | B ) = \bar { P } ( F )$ , so that the probability of selecting, say, an apple is independent of which box is chosen.
