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

### Player
The player is controlled using the keyboard, and the player target point also rotates along with the mouse movement. Each bullet fires from the player or the enemy is a particle and it is controlled by our Physics Engine.

To avoid the player stops and starts too abrubtly, we also decided to instead of setting its velocity directly to zero when the user releases the key, we decay the velocity by a factor of 10. That way we achieved a much smoother movement.

### Enemy
The enemies spawn in packs of 5, and they try to randomly path find to the player to destroy the player's ship. They player has 100 points of health
and it decreases by 20 each bullet received. Each frame, there is 1% that an ememy will path find to a player (mostly to dodge the player's bullets).

## Drawbacks
The biggest disadvantage to our approach is since we are loading a lot of 3D models into our game, it takes a bit of time to load and to remove all the meshes from the website, therefore there are a lot of lags during the transition between each stage of the game. We hope to resolve this issue in the future.

We also wanted to load custom fonts, because the fonts from THREE doesn't fit the theme of our game. But the `load` function of THREE was a bit
buggy and we did not get it to work to load our own font.

## Future Work
In the future, we would like to add more features into the game, clean up the code and optimize for slower computers. Right now when I test the game
on my computer with a GPU, it runs very smoothly, but on my old computer, there are a lot of lags. The features I would like to add are smarter path finding algorithms, more artistic looking movement for the enemies, a level system, and item system that player can collect on the way.

## Source Code
We chose to implement our game in THREE.js, the full source code is available [here](https://github.com/tienpdinh/Galaga)