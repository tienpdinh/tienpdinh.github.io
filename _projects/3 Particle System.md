---
title: Particle System
image: /assets/img/cover_photos/particle-system.gif
permalink: /project/particle-system
---

# Particle System
This is a project I made for a class I took at the university. Our directive is to make two
simulations, a water and a fire simulations. Both of my simulations were done in Processing 3.

## Water Simulation
In this simulation, I created a water fountain spawning water particle at a rate of 5000 particles a second, creating a continuous, look-a-like water motion. The orange ball is used to block the water particles.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dnHmZeSMun8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Features
- 30k+ particles at 30 FPS
- Continuous user interaction with mouse
- Water particles bounced off the ground
- Custom vector library
- 3D camera supporting translation and rotation

## Fire Simulation
<iframe width="560" height="315" src="https://www.youtube.com/embed/dKBAfUCgMyA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Features
- Custom vector library
- 3D camera supporting translation and rotation
- Translucent particle textures.

## Credits
- [QueasyCam](https://github.com/jrc03c/queasycam) : external 3D camera library.
- I used the starting code from the particle system tutorial on processing website, but it was heavily modified.

## Instructions
- You need [Processing 3](https://processing.org/) to run my project.
- You can use WASD to move around.
- For water simulation, you need to disable the camera (press C) to begin interacting with it with the ball and mouse.
- For fire simulation, please try not to move around or to the back of the fire since I did not support 3D viewing (just move around with the mouse).

## Source Code
- The full Processing source code is available [here](https://github.com/tienpdinh/particle-system).