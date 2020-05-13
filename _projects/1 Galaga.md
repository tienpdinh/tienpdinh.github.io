---
title: 3D Galaga
permalink: /project/galaga
image: /assets/img/cover_photos/galaga.png
---

# 3D Galaga

**This game is live, you can play it [here](https://tienpdinh.com/Galaga)**

Final project for Dr. Stephen Guy's class **Animation and Planning in Games**. My classmate [Rafi Barash](https://rafibarash.com/) and I collaborated on this project.

Our directive was to create a game that made uses of what we have learned during the semester. We chose to create Galaga because we can create our custom Physics Engine and Path Finding.

## Media
![beauty shot](/assets/img/galaga/galaga.png)
> Gameplay

<iframe width="560" height="315" src="https://www.youtube.com/embed/z5Fl2Vrd1_o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
> Presentation Video

## Physics Engine

Rafi made the most of this Physics Engine, and it is a published `npm` package. The package can be found [here](https://www.npmjs.com/package/simple-physics-engine).

## Movements

The enemies spawn in packs of 5, and they try to randomly path find to the player to destroy the player's ship. They player has 100 points of health
and it decreases by 20 each bullet received.

## Source Code
We chose to implement our game in THREE.js, the full source code is available [here](https://github.com/tienpdinh/Galaga)