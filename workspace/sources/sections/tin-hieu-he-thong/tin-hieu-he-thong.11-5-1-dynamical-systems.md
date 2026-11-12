---
id: "tin-hieu-he-thong.11-5-1-dynamical-systems"
doc_id: "tin-hieu-he-thong"
title: "11.5.1 Dynamical systems"
level: 2
heading_path: ["Sampling Methods", "11.5.1 Dynamical systems"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.11-5-the-hybrid-monte-carlo-algorithm"
next_id: "tin-hieu-he-thong.william-hamilton-1805-1865"
block_ids: ["b6017", "b6018", "b6019", "b6020", "b6021", "b6022", "b6023", "b6024", "b6025", "b6026", "b6027", "b6028", "b6029", "b6030", "b6031", "b6032", "b6033", "b6034"]
---

## 11.5.1 Dynamical systems

The dynamical approach to stochastic sampling has its origins in algorithms for simulating the behaviour of physical systems evolving under Hamiltonian dynamics. In a Markov chain Monte Carlo simulation, the goal is to sample from a given probability distribution $p ( \mathbf { z } )$ . The framework of Hamiltonian dynamics is exploited by casting the probabilistic simulation in the form of a Hamiltonian system. In order to remain in keeping with the literature in this area, we make use of the relevant dynamical systems terminology where appropriate, which will be defined as we go along.

The dynamics that we consider corresponds to the evolution of the state variable $\mathbf { z } = \{ z _ { i } \}$ under continuous time, which we denote by τ. Classical dynamics is described by Newton’s second law of motion in which the acceleration of an object is proportional to the applied force, corresponding to a second-order differential equation over time. We can decompose a second-order equation into two coupled firstorder equations by introducing intermediate momentum variables $\mathbf { r } ,$ corresponding to the rate of change of the state variables z, having components

r _ {i} = \frac {\mathrm{d} z _ {i}}{\mathrm{d} \tau}\tag{11.53}

where the $z _ { i }$ can be regarded as position variables in this dynamics perspective. Thus for each position variable there is a corresponding momentum variable, and the joint space of position and momentum variables is called phase space.

Without loss of generality, we can write the probability distribution $p ( \mathbf { z } )$ in the form 1

p (\mathbf {z}) = \frac {1}{Z _ {p}} \exp (- E (\mathbf {z}))\tag{11.54}

where $E ( \mathbf { z } )$ is interpreted as the potential energy of the system when in state z. The system acceleration is the rate of change of momentum and is given by the applied force, which itself is the negative gradient of the potential energy

\frac {\mathrm{d} r _ {i}}{\mathrm{d} \tau} = - \frac {\partial E (\mathbf {z})}{\partial z _ {i}}.\tag{11.55}

It is convenient to reformulate this dynamical system using the Hamiltonian framework. To do this, we first define the kinetic energy by

K (\mathbf {r}) = \frac {1}{2} \| \mathbf {r} \| ^ {2} = \frac {1}{2} \sum_ {i} r _ {i} ^ {2}.\tag{11.56}

The total energy of the system is then the sum of its potential and kinetic energies

H (\mathbf {z}, \mathbf {r}) = E (\mathbf {z}) + K (\mathbf {r})\tag{11.57}

where H is the Hamiltonian function. Using (11.53), (11.55), (11.56), and (11.57), we can now express the dynamics of the system in terms of the Hamiltonian equations given by

Exercise 11.15

{\frac {\mathrm{d} z _ {i}}{\mathrm{d} \tau}} = {\frac {\partial H}{\partial r _ {i}}}\tag{11.58}

{\frac {\mathrm{d} r _ {i}}{\mathrm{d} \tau}} = {- \frac {\partial H}{\partial z _ {i}}.}\tag{11.59}

![image](images/part-003--a01fad4437717ddbc077eb1966b6122e067b28a5016cdbecafd9f1c62e5f0ede.jpg)
