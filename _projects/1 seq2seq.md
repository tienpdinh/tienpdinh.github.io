---
title: attention mechanism
image: /assets/img/cover_photos/seq2seq.png
permalink: /project/seq2seq
---

# Attention Mechanism
While working at the Applied Motion Lab, I had to deal with training time series data,
and I thought it would be a good idea to incorporate attention mechanism to my models.
So I wrote a encoder-decoder network with attention mechanism, running on a toy dataset
to test it out.

## Data
The dataset I created was very simple, I will feed a series of number to a RNN one by one,
and the model will have to output either the exact same sequence, or the sequence in reverse order.
In particular, if my input is:
```
0 4 23 129 2 89 90 124 8 87 9124
```

Then the output will be:
```
0 4 23 129 2 89 90 124 8 87 9124
```

## Models
I implemented two sequence models, one with attention and one without. The model without
attention performs relatively good until the length of the sequence hits 20, at which
attention completely outperforms it.
![acclen](/assets/img/seq2seq/acc_vs_length.png)
> The orange line is model without attention, while
> the blue line is model with attention

I also drawed a heat map of the attention model, to see at each point, what input hidden state it
pays attention to when output a particular number.
![heat](/assets/img/seq2seq/heat.png)
> Heatmap of attention

We can see that it pays attention to the exact number from the input in each output step.

## References
- The attention mechanism I implemented was Luong's attention, from [this paper](https://arxiv.org/abs/1508.04025).

## Source Code
- Technologies used: Python and Keras
- The full source code can be found [here](https://github.com/tienpdinh/seq2seq).