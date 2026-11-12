---
id: "tin-hieu-he-thong.5-2-1-parameter-optimization"
doc_id: "tin-hieu-he-thong"
title: "5.2.1 Parameter optimization"
level: 2
heading_path: ["Neural Networks", "5.2.1 Parameter optimization"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.5-2-network-training"
next_id: "tin-hieu-he-thong.5-2-2-local-quadratic-approximation"
block_ids: ["b2693", "b2694", "b2695", "b2696", "b2697", "b2698", "b2699", "b2700", "b2701"]
---

## 5.2.1 Parameter optimization

We turn next to the task of finding a weight vector w which minimizes the chosen function $E ( \mathbf { w } )$ . At this point, it is useful to have a geometrical picture of the error function, which we can view as a surface sitting over weight space as shown in Figure 5.5. First note that if we make a small step in weight space from w to $\mathbf { w } + \delta \mathbf { w }$ then the change in the error function is $\delta E \simeq \delta \mathbf { w } ^ { \mathrm { T } } \nabla E ( \mathbf { \bar { w } } )$ , where the vector $\nabla E ( \mathbf { w } )$ points in the direction of greatest rate of increase of the error function. Because the error $E ( \mathbf { w } )$ is a smooth continuous function of w, its smallest value will occur at a point in weight space such that the gradient of the error function vanishes, so that

\nabla E (\mathbf {w}) = 0\tag{5.26}

as otherwise we could make a small step in the direction of $- \nabla E ( \mathbf { w } )$ and thereby further reduce the error. Points at which the gradient vanishes are called stationary points, and may be further classified into minima, maxima, and saddle points.

Our goal is to find a vector w such that $E ( \mathbf { w } )$ takes its smallest value. However, the error function typically has a highly nonlinear dependence on the weights and bias parameters, and so there will be many points in weight space at which the gradient vanishes (or is numerically very small). Indeed, from the discussion in Section 5.1.1 we see that for any point w that is a local minimum, there will be other points in weight space that are equivalent minima. For instance, in a two-layer network of the kind shown in Figure 5.1, with M hidden units, each point in weight space is a member of a family of $M ! 2 ^ { M }$ equivalent points.

Furthermore, there will typically be multiple inequivalent stationary points and in particular multiple inequivalent minima. A minimum that corresponds to the smallest value of the error function for any weight vector is said to be a $g l o b a l$ minimum. Any other minima corresponding to higher values of the error function are said to be local minima. For a successful application of neural networks, it may not be necessary to find the global minimum (and in general it will not be known whether the global minimum has been found) but it may be necessary to compare several local minima in order to find a sufficiently good solution.

Because there is clearly no hope of finding an analytical solution to the equation $\nabla E ( \mathbf { w } ) = 0$ we resort to iterative numerical procedures. The optimization of continuous nonlinear functions is a widely studied problem and there exists an extensive literature on how to solve it efficiently. Most techniques involve choosing some initial value $\mathbf { w } ^ { ( 0 ) }$ for the weight vector and then moving through weight space in a succession of steps of the form

\mathbf {w} ^ {(\tau + 1)} = \mathbf {w} ^ {(\tau)} + \Delta \mathbf {w} ^ {(\tau)}\tag{5.27}

where $\tau$ labels the iteration step. Different algorithms involve different choices for the weight vector update $\Delta \mathbf { w } ^ { ( \tau ) }$ . Many algorithms make use of gradient information and therefore require that, after each update, the value of $\nabla E ( \mathbf { w } )$ is evaluated at the new weight vector $\mathbf { w } ^ { ( \tau + 1 ) }$ . In order to understand the importance of gradient information, it is useful to consider a local approximation to the error function based on a Taylor expansion.
