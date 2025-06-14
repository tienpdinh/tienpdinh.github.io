---
title: Fluid Simulation
image: /img/cover_photos/fluid.png
permalink: /project/fluid
---

# Fluid Simulation
2D Eulerian fluid simulation is a project I created for CSCI 5611 - Animation and
Planning in Games. I'm very interested in learning how fluid flows in a medium
and therefore decided to implement a simulation.

## Media
<iframe width="560" height="315" src="https://www.youtube.com/embed/hquSqXGp8yg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![fluid](/img/cover_photos/fluid.png)
> 2D Fluid Simulation

## Features
- 200x200 grid benchmarking at 30+ FPS
- User can use mouse to interact with the fluid
- The simulation can be paused with 'v' button for various effects (like in my video)
- Fluid will dissolve over time to avoid explosion

## References
- [Navier-Stokes equations](https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations)
- [Jos Stam's Real-Time Fluid Dynamics for Games](https://pdfs.semanticscholar.org/847f/819a4ea14bd789aca8bc88e85e906cfc657c.pdf)
    - My implementation relies heavily on Stam's implementation in his paper.

## Source Code
- I implemented my fluid simulation in Processing 3, the source code can be found [here](https://github.com/tienpdinh/FluidSim)