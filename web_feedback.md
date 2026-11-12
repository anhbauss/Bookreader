Feedback: Còn mỗi số lượng nhỏ công thức chưa hiển thị được:
Tổng hợp:
Minh chứng 1:
We now wish to identify a prior distribution 
p
(
μ
,
λ
)
p(μ,λ) that has the same functiona dependence on 
μ
μ and λ as the likelihood function and that should therefore take the form

\begin{array}{l} p (\mu , \lambda) \propto \left[ \lambda^ {1 / 2} \exp \left(- \frac {\lambda \mu^ {2}}{2}\right) \right] ^ {\beta} \exp \left{c \lambda \mu - d \lambda \right} \ = \exp \left\{- \frac {\beta \lambda}{2} (\mu - c / \beta) ^ {2} \right\} \lambda^ {\beta / 2} \exp \left\{- \left(d - \frac {c ^ {2}}{2 \beta}\right) \lambda \right\} \end{array}
where 
c
,
d
,
c,d, , and 
β
β are constants. Since we can always write 
p
(
μ
,
λ
)
=
p
(
μ
∣
λ
)
p
(
λ
)
p(μ,λ)=p(μ∣λ)p(λ) we can find 
p
(
μ
∣
λ
)
p(μ∣λ) and 
p
(
λ
)
p(λ) by inspection. In particular, we see that 
p
(
μ
∣
λ
)
p(μ∣λ) is a Gaussian whose precision is a linear function of λ and that 
p
(
λ
)
p(λ) is a gamma distribution, so that the normalized prior takes the form

Minh chứng 2:
of the first kind (Abramowitz and Stegun, 1965) and is defined by

I _ {0} (m) = \frac {1}{2 \pi} \int_ {0} ^ {2 \pi} \exp \left{m \cos \theta \right} d \theta .
For large 
m
,
m,
Minh chứng 3:
Expressing the right-hand side as the exponential of the logarithm, we have

\begin{array}{r c l} p (x | \mu) & = & \exp \left{x \ln \mu + (1 - x) \ln (1 - \mu) \right} \ & = & (1 - \mu) \exp \left\{\ln \left(\frac {\mu}{1 - \mu}\right) x \right\}. \end{array}
Comparison with (2.194) allows us to identify

η
=
ln
⁡
(
μ
1
−
μ
)
Minh chứng 4:
where 
w
=
(
w
0
,
\hdots
,
w
M
−
1
)
T
w=(w 
0
​
 ,\hdots,w 
M−1
​
 ) 
T
  and
Minh chứng 5:
and find expressions to relate the new parameters 
{
u
1
,
.
.
.
,
u
M
}
{u 
1
​
 ,...,u 
M
​
 } to the original parameters 
{
w
1
,
\hdots
,
w
M
}
{w 
1
​
 ,\hdots,w 
M
​
 }
 Minh chứng 6: (Tiêu đề)
 <sub>11.1.3</sub> <sub>Adaptive</sub> <sub>rejection</sub> <sub>sampling</sub>
Sampling Methods

11.1.3 Adaptive rejection sampling
In many instances where we might wish to apply rejection sampling, it proves difficult to determine a suitable analytic form for the envelope distribution 
q
(
z
)
q(z) . An alternative approach is to construct the envelope function on the fly b

Minh chứng 7:
10.31 ( ) By finding the second derivative with respect to x, show that the function f ( x ) = { \dot { - } } \ln ( e ^ { x { \mathord { \left/ { \vphantom { \mathrm { 1 2 } } } \right. \kern - delimiterspace } 2 } } + e ^ { - x / 2 } ) is a concave function of 
x
.
x. Now consider the second derivatives with respect to the variable 
x
2
x 
Minh chứng 8:
 then takes the form

g (\lambda) = \min _ {x} \left{\lambda x - f (x) \right} = - \lambda \ln \lambda - (1 - \lambda) \ln (1 - \lambda)
which we
\
g (\lambda) = \min _ {x} \left{\lambda x - f (x) \right}.

Minh chứng 9:
Different values of λ correspond to different tangent lines, and because all such lines are lower bounds on the function, we have 
f
(
x
)
⩾
y
(
x
,
λ
)
f(x)⩾y(x,λ) . Thus we can write the function in the form

f (x) = \max _ {\lambda} \left{\lambda x - \lambda + \lambda \ln (- \lambda) \right}.
We have succeeded in approximating the convex function 
f
(
x
)
f(x) by a simpler, linear function 
y
(
x
,
λ
)
y(x,λ) . The price we have paid is that we have introduced a variational parameter λ, and to obtain the tightest bound we must optimize with respect to λ.

We can formulate this approach more generally using the framework of convex duality (Rockafellar, 1972; Jordan et al., 1999). Consider the illustration of a convex function 
f
(
x
)
f(x) shown in the left-hand plot in Figure 10.11. In this example, the function λx is a lower bound on 
f
(
x
)
f(x) but it is not the best lower bound that can be achieved by a linear function having slope λ, because the tightest bound is given by the tangent line. Let us write the equation of the tangent line, having slope λ as 
λ
x
−
g
(
λ
)
λx−g(λ) where the (negative) intercept 
g
(
λ
)
g(λ) clearly depends on the slope λ of the tangent. To determine the intercept, we note that the line must be moved vertically by an amount equal to the smallest vertical distance between the line and the function, as shown in Figure 10.11. Thus

\begin{array}{r c l} g (\lambda) & = & - \min _ {x} \left{f (x) - \lambda x \right} \ & = & \max _ {x} \left{\lambda x - f (x) \right}. \end{array}
Now, instead of fixing λ and varying x, we can consider a particular x and then adjust λ until the tangent plane is tangent at that particular x. Because the y value of the tangent line at a particular x is maximized when that value coincides with its contact point, we have

f (x) = \max _ {\lambda} \left{\lambda x - g (\lambda) \right}.
We see that the functions 
f
(
x
)
f(x) and 
g
(
λ
)
g(λ) play a dual role, and are related through (10.129) and (10.130).
Minh chứng 10:
If we have a prior 
p
(
m
)
p(m) over graphs indexed by m, then the posterior distribution is given by

p (m | \mathcal {D}) \propto p (m) p (\mathcal {D} | m)\tag{8.103}

where is the observed data set. 