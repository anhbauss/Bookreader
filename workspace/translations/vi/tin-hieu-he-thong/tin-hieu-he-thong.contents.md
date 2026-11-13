# Lời nói đầu

## Ký hiệu toán học

## Mục lục

1 Giới thiệu
1.1 Ví dụ: Fitting Đường cong đa thức ..... 4
1.2 Lý thuyết xác suất ..... 12
1.2.1 Hàm mật độ xác suất ..... 17
1.2.2 Kỳ vọng và hiệp phương sai ..... 19
1.2.3 Xác suất Bayes ..... 21
1.2.4 Phân phối Gaussian ..... 24
1.2.5 Fitting đường cong - revisited ..... 28
1.2.6 Fitting đường cong Bayes ..... 30
1.3 Lựa chọn mô hình ..... 32
1.4 Lời nguyền của chiều cao ..... 33
1.5 Lý thuyết quyết định ..... 38
1.5.1 Giảm thiểu tỷ lệ phân loại sai ..... 39
1.5.2 Giảm thiểu tổn thất dự kiến ..... 41
1.5.3 Tùy chọn từ chối ..... 42
1.5.4 Suy luận và quyết định ..... 42
1.5.5 Các hàm tổn thất cho hồi quy ..... 46
1.6 Lý thuyết thông tin ..... 48
1.6.1 Entropy tương đối và thông tin lẫn nhau ..... 55
Bài tập ..... 58

2 Phân phối xác suất 67
2.1 Các biến nhị phân . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.1.1 Phân phối beta . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.2 Các biến đa thức . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.2.1 Phân phối Dirichlet. 76
2.3 Phân phối Gaussian. 78
2.3.1 Phân phối Gaussian có điều kiện. 85
2.3.2 Phân phối Gaussian biên. 88
2.3.3 Định lý Bayes cho các biến Gaussian. 90
2.3.4 Hợp lý tối đa cho Gaussian. 93
2.3.5 Ước lượng tuần tự. 94
2.3.6 Suy luận Bayes cho Gaussian. 97
2.3.7 Phân phối t của Student. 102
2.3.8 Các biến tuần hoàn. 105
2.3.9 Hỗn hợp Gaussians. 110
2.4 Họ hàm mũ. 113
2.4.1 Hợp lý tối đa và thống kê đủ. 116
2.4.2 Prior liên hợp. 117
2.4.3 Prior không mang thông tin. 117
2.5 Các phương pháp phi tham số. 120
2.5.1 Các ước lượng mật độ kernel. 122
2.5.2 Các phương pháp láng giềng gần nhất. 124
Bài tập. 127

3 Các mô hình tuyến tính cho hồi quy 137
3.1 Các mô hình hàm cơ sở tuyến tính. 138
3.1.1 Hợp lý tối đa và bình phương nhỏ nhất. 140
3.1.2 Hình học của bình phương nhỏ nhất. 143
3.1.3 Học tuần tự. 143
3.1.4 Bình phương nhỏ nhất được điều chỉnh. 144
3.1.5 Đầu ra bội. 146
3.2 Phân tích Bias-Variance. 147
3.3 Hồi quy tuyến tính Bayes. 152
3.3.1 Phân phối tham số. 152
3.3.2 Phân phối dự báo. 156
3.3.3 Kernel tương đương. 159
3.4 Comparision mô hình Bayes. 161
3.5 Xấp xỉ bằng chứng. 165
3.5.1 Đánh giá hàm bằng chứng. 166
3.5.2 Tối đa hóa hàm bằng chứng. 168
3.5.3 Số lượng tham số hiệu quả. 170
3.6 Hạn chế của các hàm cơ sở cố định. 172
Bài tập. 173

4 Các mô hình tuyến tính cho phân loại 179
4.1 Hàm phân biệt . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.1.1 Hai lớp . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.1.2 Nhiều lớp . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.1.3 Bình phương nhỏ nhất cho phân loại. 184
4.1.4 Hàm phân biệt tuyến tính của Fisher. 186
4.1.5 Mối quan hệ với bình phương nhỏ nhất. 189
4.1.6 Hàm phân biệt của Fisher cho nhiều lớp. 191
4.1.7 Thuật toán perceptron. 192
4.2 Mô hình sinh quá trình xác suất. 196
4.2.1 Đầu vào liên tục. 198
4.2.2 Giải pháp hợp lý tối đa. 200
4.2.3 Đặc trưng rời rạc. 202
4.2.4 Họ hàm mũ. 202
4.3 Mô hình phân biệt xác suất. 203
4.3.1 Hàm cơ sở cố định. 204
4.3.2 Hồi quy logistic. 205
4.3.3 Bình phương nhỏ nhất được cân lại lặp. 207
4.3.4 Hồi quy logistic đa lớp. 209
4.3.5 Hồi quy probit. 210
4.3.6 Hàm liên kết canonical. 212
4.4 Xấp xỉ Laplace. 213
4.4.1 So sánh mô hình và BIC. 216
4.5 Hồi quy logistic Bayes. 217
4.5.1 Xấp xỉ Laplace. 217
4.5.2 Phân phối dự báo. 218
Bài tập. 220

5 Mạng thần kinh nhân tạo 225
5.1 Hàm mạng feedforward 227
5.1.1 Đối xứng không gian trọng số 231
5.2 Huấn luyện mạng. 232
5.2.1 Tối ưu hóa tham số. 236
5.2.2 Xấp xỉ bậc hai địa phương. 237
5.2.3 Sử dụng thông tin gradient. 239
5.2.4 Tối ưu hóa gradient descent. 240
5.3 Lan truyền ngược lỗi 241
5.3.1 Đánh giá đạo hàm hàm lỗi 242
5.3.2 Một ví dụ đơn giản 245
5.3.3 Hiệu quả của lan truyền ngược 246
5.3.4 Ma trận Jacobian 247
5.4 Ma trận Hessian 249
5.4.1 Xấp xỉ đường chéo 250
5.4.2 Xấp xỉ tích ngoài 251
5.4.3 Hessian ngược 252
5.4.4 Sai phân hữu hạn 252
5.4.5 Đánh giá chính xác Hessian 253
5.4.6 Nhân nhanh với Hessian 254
5.5 Điều chỉnh trong mạng thần kinh nhân tạo 256
5.5.1 Prior Gaussian nhất quán 257
5.5.2 Dừng sớm 259
5.5.3 Các bất biến 261
5.5.4 Lan truyền tiếp tuyến 263
5.5.5 Huấn luyện với dữ liệu biến đổi 265
5.5.6 Mạng phức hợp 267
5.5.7 Chia sẻ trọng số mềm 269
5.6 Mạng mật độ hỗn hợp 272
5.7 Mạng thần kinh nhân tạo Bayes 277
5.7.1 Phân phối tham số hậu nghiệm 278
5.7.2 Tối ưu hóa siêu tham số 280
5.7.3 Mạng thần kinh nhân tạo Bayes cho phân loại 281
Bài tập 284

6 Các phương pháp kernel 291
6.1 Biểu diễn kép 293
6.2 Xây dựng Kernels 294
6.3 Mạng hàm cơ sở bán kính 299
6.3.1 Mô hình Nadaraya-Watson 301
6.4 Các quá trình Gaussian 303
6.4.1 Hồi quy tuyến tính được xem lại 304
6.4.2 Các quá trình Gaussian cho hồi quy 306
6.4.3 Học các siêu tham số 311
6.4.4 Xác định mức độ liên quan tự động 312
6.4.5 Các quá trình Gaussian cho phân loại 313
6.4.6 Xấp xỉ Laplace 315
6.4.7 Kết nối với mạng thần kinh nhân tạo 319
Bài tập 320

7 Máy kernel thưa 325
7.1 Bộ phân loại lề tối đa 326
7.1.1 Phân phối lớp chồng chéo 331
7.1.2 Mối quan hệ với hồi quy logistic 336
7.1.3 SVMs đa lớp 338
7.1.4 SVMs cho hồi quy 339
7.1.5 Lý thuyết học tính toán 344
7.2 Máy vectơ liên quan 345
7.2.1 RVM cho hồi quy 345
7.2.2 Phân tích sparsity 349
7.2.3 RVM cho phân loại 353
Bài tập 357

8 Mô hình đồ thị 359
8.1 Mạng Bayes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.1.1 Ví dụ: Hồi quy đa thức . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.1.2 Mô hình sinh quá trình . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.1.3 Các biến rời rạc. 366
8.1.4 Mô hình tuyến tính-Gaussian 370
8.2 Độc lập có điều kiện 372
8.2.1 Ba ví dụ về đồ thị 373
8.2.2 D-phân tách 378
8.3 Trường ngẫu nhiên Markov 383
8.3.1 Các tính chất độc lập có điều kiện 383
8.3.2 Các tính chất phân tích nhân tử 384
8.3.3 Minh họa: Khử nhiễu ảnh 387
8.3.4 Mối quan hệ với đồ thị có hướng 390
8.4 Suy luận trong các mô hình đồ thị 393
8.4.1 Suy luận trên một chuỗi 394
8.4.2 Cây 398
8.4.3 Đồ thị nhân tố 399
8.4.4 Thuật toán sum-product 402
8.4.5 Thuật toán max-sum 411
8.4.6 Suy luận chính xác trong đồ thị chung 416
8.4.7 Lan truyền niềm tin vòng lặp 417
8.4.8 Học cấu trúc đồ thị 418
Bài tập 418

9 Mô hình hỗn hợp và EM 423
9.1 Gom cụm K-means 424
9.1.1 Phân đoạn ảnh và nén 428
9.2 Hỗn hợp Gaussians 430
9.2.1 Hợp lý tối đa 432
9.2.2 EM cho hỗn hợp Gaussians 435
9.3 Một cách nhìn khác về EM 439
9.3.1 Hỗn hợp Gaussians được xem lại 441
9.3.2 Mối quan hệ với K-means 443
9.3.3 Hỗn hợp phân phối Bernoulli 444
9.3.4 EM cho hồi quy tuyến tính Bayes 448
9.4 Thuật toán EM nói chung 450
Bài tập 455

10 Suy luận gần đúng 461
10.1 Suy luận biến phân 462
10.1.1 Phân phối phân tích nhân tử 464
10.1.2 Tính chất của các xấp xỉ phân tích nhân tử 466
10.1.3 Ví dụ: Gaussian một biến 470
10.1.4 So sánh mô hình 473
10.2 Minh họa: Hỗn hợp Gaussians biến phân 474
10.2.1 Phân phối biến phân 475
10.2.2 Cận dưới biến phân 481
10.2.3 Mật độ dự báo 482
10.2.4 Xác định số lượng thành phần 483
10.2.5 Phân tích nhân tử cảm ứng 485
10.3 Hồi quy tuyến tính biến phân 486
10.3.1 Phân phối biến phân 486
10.3.2 Phân phối dự báo 488
10.3.3 Cận dưới 489
10.4 Phân phối họ hàm mũ 490
10.4.1 Truyền thông điệp biến phân 491
10.5 Phương pháp biến phân địa phương 493
10.6 Hồi quy logistic biến phân 498
10.6.1 Phân phối hậu nghiệm biến phân 498
10.6.2 Tối ưu hóa các tham số biến phân 500
10.6.3 Suy luận siêu tham số 502
10.7 Lan truyền kỳ vọng 505
10.7.1 Ví dụ: Bài toán lộn xộn 511
10.7.2 Lan truyền kỳ vọng trên đồ thị 513
Bài tập 517

11 Phương pháp lấy mẫu 523
11.1 Các thuật toán lấy mẫu cơ bản 526
11.1.1 Phân phối tiêu chuẩn 526
11.1.2 Lấy mẫu từ chối 528
11.1.3 Lấy mẫu từ chối thích ứng 530
11.1.4 Lấy mẫu tầm quan trọng 532
11.1.5 Lấy mẫu-tầm quan trọng-tái lấy mẫu 534
11.1.6 Lấy mẫu và thuật toán EM 536
11.2 Markov Chain Monte Carlo 537
11.2.1 Chuỗi Markov 539
11.2.2 Thuật toán Metropolis-Hastings 541
11.3 Lấy mẫu Gibbs 542
11.4 Lấy mẫu lát cắt 546
11.5 Thuật toán Hybrid Monte Carlo 548
11.5.1 Hệ thống động lực 548
11.5.2 Hybrid Monte Carlo 552
11.6 Ước lượng hàm phân hoạch 554
Bài tập 556

12 Các biến tiềm ẩn liên tục 559
12.1 Phân tích thành phần chính 561
12.1.1 Công thức phương sai tối đa 561
12.1.2 Công thức sai số tối thiểu 563
12.1.3 Các ứng dụng của PCA 565
12.1.4 PCA cho dữ liệu chiều cao 569
12.2 PCA xác suất . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 570
12.2.1 PCA hợp lý tối đa . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 574
12.2.2 Thuật toán EM cho PCA . . . . . . . . . . . . . . . . . . . . . . 577
12.2.3 PCA Bayes . . . . . . . . . . . . . . . . 580
12.2.4 Phân tích nhân tố . . . . . . . . 583
12.3 Kernel PCA .. 586
12.4 Mô hình biến tiềm ẩn phi tuyến .. 591
12.4.1 Phân tích thành phần độc lập .. 591
12.4.2 Mạng thần kinh nhân tạo tự liên kết .. 592
12.4.3 Mô hình đa tạp phi tuyến .. 595
Bài tập .. 599

13 Dữ liệu tuần tự 605
13.1 Mô hình Markov .. 607
13.2 Mô hình Markov ẩn .. 610
13.2.1 Hợp lý tối đa cho HMM .. 615
13.2.2 Thuật toán tiến-lùi .. 618
13.2.3 Thuật toán sum-product cho HMM .. 625
13.2.4 Các yếu tố tỷ lệ .. 627
13.2.5 Thuật toán Viterbi .. 629
13.2.6 Phần mở rộng mô hình Markov ẩn .. 631
13.3 Các hệ thống động tuyến tính .. 635
13.3.1 Suy luận trong LDS .. 638
13.3.2 Học trong LDS .. 642
13.3.3 Phần mở rộng LDS .. 644
13.3.4 Các bộ lọc hạt .. 645
Bài tập .. 646

14 Kết hợp các mô hình 653
14.1 Trung bình mô hình Bayes .. 654
14.2 Các ủy ban .. 655
14.3 Boosting .. 657
14.3.1 Giảm thiểu lỗi hàm mũ .. 659
14.3.2 Các hàm lỗi cho boosting .. 661
14.4 Mô hình dựa trên cây .. 663
14.5 Mô hình hỗn hợp có điều kiện .. 666
14.5.1 Hỗn hợp các mô hình hồi quy tuyến tính .. 667
14.5.2 Hỗn hợp các mô hình logistic .. 670
14.5.3 Hỗn hợp các chuyên gia .. 672
Bài tập .. 674

Phụ lục A Tập dữ liệu 677
Phụ lục B Phân phối xác suất 685
Phụ lục C Tính chất ma trận 695
Phụ lục D Phép tính biến phân 703
Phụ lục E Nhân tử Lagrange 707
Tài liệu tham khảo 711
Chỉ mục 729