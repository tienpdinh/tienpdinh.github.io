---
title: Frustum Culling
image: /assets/img/cover_photos/frustum.png
permalink: /project/frustum
---

# Frustum Culling in OpenGL
I implemented frustum culling in a provided game engine by Dr. Stephen J. Guy (OpenGL). The project
demonstrated the use of vector math to only render object within the view to save computation.

## Without frustum culling
![lowpfs](/assets/img/frustum/lowfps.png)
> A very large scene without frustum culling, only run at 8 FPS

## With frustum culling
![highpfs](/assets/img/frustum/highfps.png)
> The same scene with frustum culling, at 30 FPS

## Level of Detail
I also implemented the level of detail system, which will switch out to a simpler
model when the player is far away from the object (typically within a fixed threshold)

## Debug Camera
![debugcam](/assets/img/frustum/debug_cam.png)
> With debug camera on, we can see that the engine only render
part of the scene where the player can actually see.

## Source Code
The source code is available to download from [here](https://github.com/tienpdinh/Frustum-Culling-OpenGL).