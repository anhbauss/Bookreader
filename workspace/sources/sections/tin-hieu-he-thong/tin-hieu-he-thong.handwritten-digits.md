---
id: "tin-hieu-he-thong.handwritten-digits"
doc_id: "tin-hieu-he-thong"
title: "Handwritten Digits"
level: 2
heading_path: ["Appendix A. Data Sets", "Handwritten Digits"]
page_start: null
page_end: null
prev_id: "tin-hieu-he-thong.appendix-a-data-sets"
next_id: "tin-hieu-he-thong.oil-flow"
block_ids: ["b7216", "b7217", "b7218", "b7219", "b7220", "b7221"]
---

## Handwritten Digits

The digits data used in this book is taken from the MNIST data set (LeCun et al., 1998), which itself was constructed by modifying a subset of the much larger data set produced by NIST (the National Institute of Standards and Technology). It comprises a training set of 60, 000 examples and a test set of 10, 000 examples. Some of the data was collected from Census Bureau employees and the rest was collected from high-school children, and care was taken to ensure that the test examples were written by different individuals to the training examples.

The original NIST data had binary (black or white) pixels. To create MNIST, these images were size normalized to fit in a 20 20 pixel box while preserving their aspect ratio. As a consequence of the anti-aliasing used to change the resolution of the images, the resulting MNIST digits are grey scale. These images were then centred in a 28 28 box. Examples of the MNIST digits are shown in Figure A.1.

Error rates for classifying the digits range from 12% for a simple linear classifier, through 0.56% for a carefully designed support vector machine, to 0.4% for a convolutional neural network (LeCun et al., 1998).

Figure A.1 One hundred examples of the MNIST digits chosen at random from the training set.

7 2 4 4 9 5 9 0 6 9 0 5 9 7 3 4 9 6 9 5 7 4 0 3 3 L 7 2 7 7 4 3 5 2 4 4 6 3 5 5 6 0 4 9 8 9 3 7 64 3 0 7 0 2 7 3 2 9 7 7 6 2 7 8 4 7 3 6 3 6 9 3 4 7 6 9
