---
title: Path Finding
image: /img/cover_photos/pathfinding.png
permalink: /project/pathfinding
hide: true
---

# Path Finding

For this project checkup, our main directive was to implement
a path planning agent that can find its way through and environment
with a single obstacle in the middle.

## Media
<iframe width="1253" height="705" src="https://www.youtube.com/embed/Y09NgxEmMBc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
> Path Finding without Path Smoothing

<iframe width="1253" height="705" src="https://www.youtube.com/embed/z17ashNtlUw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
> Path Finding with Path Smoothing

![graph](/img/cover_photos/graph.png)
> PRM Graph with the shortest path found

## Features
- Dijkstra algorithm used to find the shortest path.
- Probabilistically sample the environment for milestone points.

## Instructions
- Make the following modifications to `PathFinding.pde`.
- To render the graph with all milestones and edges,
uncomment `g.render(OFFSET_X, OFFSET_Y)`.
- To render the shortest path, uncomment `g.renderPath(goal, OFFSET_X, OFFSET_Y)`.
- To disable path smoothing, use `agent.update(.001, 1000, false)`.
To enable path smoothing, use `agent.update(.001, 1000, true)`.

## Source Code
- I implemented my path finding in Processing 3, the source code can be found [here](https://github.com/tienpdinh/PathFinding)