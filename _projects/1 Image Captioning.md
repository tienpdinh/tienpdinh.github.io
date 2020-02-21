---
title: Auto Image Captioning
image: /assets/img/cover_photos/captioning-cover.png
permalink: /project/captioning
---

# Auto Image Captioning
I created an auto image captioning model using data from the Microsoft Common Objects in COntext (MS COCO) dataset.
This dataset is commonly used to train and benchmark object detection, segmentation, and captioning algorithms. You can
learn more about the dataset [here](http://cocodataset.org/#home).

This project was part of the [Udacity Computer Vision Nanodegree Program](https://www.udacity.com/course/computer-vision-nanodegree--nd891).

## Network Architecture
![archi](/assets/img/cover_photos/encoder-decoder.png)
> CNN - RNN architecture

The architecture that I implemented was a Convolutional Neural Network (CNN) followed by
a Recurrent Neural Network (RNN) with Long-Short Term Memory (LSTM) cells.

The CNN was used to extract a feature vector from the input image,
then that feature vector is fed into the RNN to sequentially output
the caption word by word.

## Source Code
- Technologies used: Python and Pytorch
- The full source code, including documentations, can be found [here](https://github.com/tienpdinh/Auto-Image-Captioning).
- The model predictions, including accurate and inaccurate predictions, can be found [here](https://github.com/tienpdinh/Auto-Image-Captioning/blob/master/3_Inference.ipynb).