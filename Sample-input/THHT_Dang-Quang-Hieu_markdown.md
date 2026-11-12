# Tín hiệu và hệ thống

Đặng Quang Hiếu Đại học Bách Khoa Hà Nội 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/2acd8f45f17758f2103c3794e75a6246ab30c126fc0f8969045a1c029c48abeb.jpg)


Tháng 10 – 2026 

Tín hiệu và hệ thống 

Đặng Quang Hiếu 

Đại học Bách Khoa Hà Nội Email: hieu.dangquang@hust.edu.vn 

Từ khóa. tín hiệu và hệ thống, xử lý tín hiệu, hệ thống LTI, biến đổi Fourier, biến đổi Laplace, biến đổi z, định lý lấy mẫu, hệ thống thông tin, điều chế, giải điều chế 

© 2026 Đặng Quang Hiếu. 

Tác phẩm này được phát hành theo giấy phép Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0). Nội dung giấy phép: https://creativecommons.org/licenses/by-nc-sa/4.0/ 

Bạn được sao chép, phân phối, chỉnh sửa tác phẩm, với điều kiện ghi công tác giả, không dùng vào mục đích thương mại, và phát hành bản chỉnh sửa theo cùng giấy phép. 

Phiên bản 2026-10-24. Phiên bản mới nhất và các phiên bản đã phát hành: https://github.com/dangquanghieu/book-thht 

Góp ý, báo lỗi xin gửi về hieu.dangquang@hust.edu.vn. 

BBKKHT. 

## Mục lục

Lời nói đầu
xi
Ký hiệu và chữ viết tắt
xiii
Ký hiệu
xiii
Chữ viết tắt
xvii
Chương 1. Những khái niệm cơ bản về tín hiệu và hệ thống
1
1.1. Định nghĩa và phân loại tín hiệu
1
1.2. Biểu diễn tín hiệu trên miền thời gian
3
1.3. Năng lượng và công suất của tín hiệu
4
1.4. Các phép toán thực hiện trên tín hiệu
6
1.5. Một số dạng tín hiệu cơ bản
10
1.6. Định nghĩa và phân loại hệ thống
17
1.7. Ghép nối hệ thống
18
1.8. Các thuộc tính của hệ thống
18
Tóm tắt chương
22
Bài tập
23
Chương 2. Hệ thống LTI
31
2.1. Đáp ứng xung và phép chấp cho hệ thống rời rạc
31
2.2. Đáp ứng xung và phép chấp cho hệ thống liên tục
38
2.3. Các tính chất của phép chấp và hệ thống LTI
43
2.4. Đáp ứng nhảy của hệ thống LTI
48
2.5. Biểu diễn hệ thống LTI bằng phương trình sai phân / vi phân tuyến tính hệ số hàng
50
2.6. Sở đồ thực hiện hệ thống LTI
53 

2.7. Phép tương quan 58
Tóm tắt chương 61
Bài tập 61
Chương 3. Các phép biến đổi Fourier 71
3.1. Đặt vấn đề 71
3.2. Chuỗi Fourier cho tín hiệu liên tục, tuần hoàn 73
3.3. Chuỗi Fourier cho tín hiệu rời rạc theo thời gian 82
3.4. Biến đổi Fourier cho tín hiệu liên tục 86
3.5. Đáp ứng tần số và khái niệm bộ lọc 96
3.6. Biến đổi Fourier cho tín hiệu rời rạc 106
Tóm tắt chương 115
Bài tập 116
Chương 4. Định lý lấy mẫu 129
4.1. Đặt vấn đề và phát biểu định lý 129
4.2. Chứng minh định lý lấy mẫu 131
4.3. Lấy mẫu bằng dây xung đơn vị 132
4.4. Phổ của tín hiệu rời rạc x[n] 135
Tóm tắt chương 137
Bài tập 138
Chương 5. Biến đổi z 143
5.1. Đình nghĩa biến đổi z và miền hội tụ 143
5.2. Các tính chất của biến đổi z 150
5.3. Biến đổi z ngược 153
5.4. Phân tích hệ thống trên miền z 159
5.5. Biến đổi z một phía 167
Tóm tắt chương 168
Bài tập 170
Chương 6. Biến đổi Laplace 181
6.1. Đình nghĩa biến đổi Laplace và miền hội tụ 181
6.2. Các tính chất của biến đổi Laplace 185
6.3. Biến đổi Laplace ngược 190
6.4. Phân tích hệ thống trên miền s 192
6.5. Biểu đồ Bode 199
6.6. Bộ lọc tương tự 212
6.7. Biến đổi Laplace một phía 220
Tóm tắt chương 222
Bài tập 224 

Chương 7. Hệ thống thông tin 235
7.1. Khái niệm hệ thống thông tin 235
7.2. Điều chế / giải điều chế 236
7.3. Nguyên lý thông tin số 240
Tóm tắt chương 255
Bài tập 256
Lời cuối sách 263
Phụ lực A. Bảng đối chiếu các phép biến đổi 265
Phụ lực B. Thuật ngữ Việt-Anh 269
Tài liệu tham khảo 273 

## Lời nói đầu

Tín hiệu và hệ thống là những khái niệm cơ sở cho sinh viên đại học trong nhiều chuyên ngành kỹ thuật như điện, điện tử, viễn thông, công nghệ thông tin, tự động hóa và cơ khí. Cách biểu diễn tín hiệu và hệ thống trên các miền thời gian và tần số, các phương pháp phân tích, tổng hợp hệ thống qua các phép biến đổi Fourier, biến đổi z, biến đổi Laplace đã trở thành những công cụ cơ bản, quan trọng nhất cho người làm kỹ thuật. Trong khi đó, các trường đại học kỹ thuật thường có rất nhiều sách về toán cao cấp, sau đó “nhảy cóc” lên những tài liệu cụ thể về chuyên ngành mà bỏ qua phần đệm rất quan trọng là tín hiệu và hệ thống này. Cuốn sách này có nội dung hướng tới phần nào lấp đầy khoảng trống đó trong khoảng thời gian một học kỳ chương trình đại học. 

Với mục tiêu như vậy, tác giả tập trung vào việc trình bày chọn lọc các khái niệm, và đưa ra các ví dụ để minh họa / ứng dụng cho các khái niệm đó trên thực tế. Các định lý và tính chất được phát biểu kèm theo điều kiện áp dụng. Phần chứng minh được đưa vào khi nó ngắn gọn và giúp hiểu rõ bản chất của vấn đề; những chứng minh đòi hỏi công cụ toán học vượt ra ngoài phạm vi môn học chỉ được nêu kết quả. 

Mặc dù tài liệu này được thiết kế dựa trên khung chương trình đào tạo chuẩn của Đại học Bách Khoa Hà Nội, nhưng nó vẫn có thể được dùng hỗ trợ giảng dạy môn Tín hiệu và hệ thống cho hệ cử nhân và kỹ sư trong các trường đại học kỹ thuật khác, dùng làm tài liệu tham khảo cho học viên sau đại học cũng như các kỹ thuật viên trong các ngành nghề có liên quan. Vì vậy, nội dung của sách được chủ ý trình bày rộng hơn khuôn khổ một học kỳ một chút, để giảng viên có thể lựa chọn những phần phù hợp với chuyên ngành của mình. 

Để học tốt môn học này, bạn đọc cần có các kiến thức cơ bản về Đại số tuyến tính, Giải tích, một chút kiến thức về Mạch điện và Xác suất thống kê; đồng thời tích cực giải bài tập, sử dụng Python để minh họa cũng như tìm hiểu sâu hơn về Tín hiệu và hệ thống. 

Thứ tự trình bày các nội dung trong cuốn này như sau. Đầu tiên, chương 1 đưa ra những khái niệm cơ bản về tín hiệu và hệ thống. Tiếp theo, chương 2 tìm hiểu về hệ thống LTI, đáp ứng xung và phép chập, cũng như các cách biểu diễn khác thông qua phương trình sai phân / vi phân tuyến tính hệ số hằng, và sơ đồ hệ thống. Chương 3 bắt đầu ngay vào việc biểu diễn tín hiệu và hệ thống trên miền tần số thông qua chuỗi Fourier và biến đổi Fourier. Chương này đưa ra khái niệm và phân tích chi tiết về phổ của tín hiệu, về đáp ứng tần số của hệ thống và bộ lọc. Sau khi tìm hiểu về định lý lấy mẫu với vai trò là cầu nối giữa liên tục và rời rạc trong chương 4, chúng ta sẽ học cách phân tích hệ thống trên miền z (chương 5), và trên miền s (chương 6). Cuối cùng, chương 7 sẽ giới thiệu một số nội dung cơ bản về hệ thống thông tin dưới góc nhìn của Tín hiệu và hệ thống, trong đó phần 7.3 là tự chọn, dành cho sinh viên chuyên ngành Viễn thông. Mục 3.5.4 (truyền không méo, pha tuyến tính và trễ nhóm) và mục 6.5.5 (liên hệ giữa biểu đồ Bode và trễ nhóm) dành cho bạn đọc tự đọc thêm. 

Ngoài ra, để cuốn sách không quá dài, tác giả chỉ đưa vào những đoạn code Python ngắn, một cách chọn lọc. Thay vào đó, các bài lab đồng hành sử dụng Python (dạng Jupyter notebook) được đặt tại 

https://github.com/dangquanghieu/tinhieu-hethong-notebooks 

Giáo trình được cập nhật thường xuyên; phiên bản mới nhất luôn có tại website chính thức của sách (https://github.com/dangquanghieu/book-thht). 

Tác giả mong muốn nhận được thêm nhiều góp ý để tài liệu này ngày càng hoàn thiện hơn. Xin cảm ơn! 

Đặng Quang Hiếu 

# Ký hiệu và chữ viết tắt

Bảng dưới đây liệt kê các ký hiệu dùng ở nhiều chỗ trong sách. Ký hiệu chỉ dùng trong một ví dụ hoặc một chứng minh được định nghĩa ngay tại chỗ và không có trong bảng. Một số ký hiệu mang nghĩa khác nhau ở các chương khác nhau; khi đó các nghĩa được ghi cùng một dòng, kèm số chương. 

## Ký hiệu

<table><tr><td>Ký hiệu</td><td>Ý nghĩa</td></tr><tr><td colspan="2">Quy ước chung</td></tr><tr><td><eq>j</eq></td><td>Đơn vị ảo, <eq>j^{2} = -1</eq></td></tr><tr><td><eq>\mathbb{R}, \mathbb{C}, \mathbb{Z}</eq></td><td>Tập số thực, tập số phúc, tập số nguyên</td></tr><tr><td>Re{·}, Im{·}</td><td>Phần thực, phần ảo</td></tr><tr><td><eq>x^{*}</eq></td><td>Liên hợp phúc của <eq>x</eq></td></tr><tr><td>:=</td><td>Ký hiệu định nghĩa: vé trái được định nghĩa bằng vé phải</td></tr><tr><td><eq>\{1,2,3\} \uparrow</eq></td><td>Mũi tên đánh dấu mẫu tại <eq>n = 0</eq> khi liệt kê các giá trị của một dãy</td></tr><tr><td colspan="2">Tín hiệu</td></tr><tr><td><eq>x(t)</eq></td><td>Tín hiệu liên tục theo thời gian</td></tr><tr><td><eq>x[n]</eq></td><td>Tín hiệu rời rạc theo thời gian, <eq>n \in \mathbb{Z}</eq> (luôn dùng ngoặc vuông)</td></tr><tr><td><eq>\delta(t), \delta[n]</eq></td><td>Hàm xung đơn vị liên tục (hàm delta Dirac), rời rạc</td></tr><tr><td><eq>u(t), u[n]</eq></td><td>Hàm nhảy đơn vị (sách quy ước <eq>u(0) = 1</eq>)</td></tr><tr><td><eq>r(t), r[n]</eq></td><td>Hàm dốc đơn vị: <eq>r(t) = tu(t), r[n] = nu[n]</eq> (ch. 1); trong ch. 7, <eq>r(t)</eq> là tín hiệu thu</td></tr><tr><td><eq>rect_{N}[n]</eq><eq>\text{sinc}(t)</eq></td><td>Dãy chữ nhật dài <eq>N</eq>: bằng 1 khi <eq>0 \leq n \leq N-1</eq>, bằng 0 ở các chỗ còn lạiHàm sinc, <eq>\text{sinc}(t) := \frac{\sin(\pi t)}{\pi t}</eq></td></tr><tr><td><eq>Ce^{at}, C\alpha^n</eq></td><td>Hàm mũ liên tục, rời rạc (<eq>\alpha</eq> có thể âm hoặc phúc)</td></tr><tr><td><eq>\tilde{x}[n], \tilde{x}[n]_N</eq></td><td>Dãy tuần hoàn; chỉ số <eq>N</eq> dùng khi cần nhân mạnh chu kỳ</td></tr><tr><td><eq>T, N</eq></td><td>Chu kỳ cơ bản của tín hiệu liên tục (<eq>T &gt; 0</eq>), rời rạc (<eq>N \in \mathbb{Z}^+</eq>)</td></tr><tr><td><eq>x_e, x_o</eq></td><td>Thành phần chăn, thành phần lẻ của tín hiệu</td></tr><tr><td><eq>E_x</eq></td><td>Năng lượng của tín hiệu <eq>x</eq></td></tr><tr><td><eq>P_x; p_x(t)</eq></td><td>Công suất trung bình; công suất tức thời <eq>p_x(t) = |x(t)|^2</eq></td></tr><tr><td><eq>B_x</eq></td><td>Cận của tín hiệu bị chặn: <eq>|x(t)| \leq B_x</eq> (định nghĩa ổn định BIBO)</td></tr><tr><td colspan="2"><eq>\text{Hệ thống}</eq></td></tr><tr><td><eq>T\{\cdot\}, x \overset{T}{\to} y</eq></td><td>Hệ thống (toán tử) <eq>T</eq> biến đầu vào <eq>x</eq> thành đầu ra <eq>y</eq>; <eq>T^{-1}</eq> là hệ thống nghịch đảo</td></tr><tr><td>*</td><td>Phép chấp</td></tr><tr><td><eq>h(t), h[n]</eq></td><td>Đáp ứng xung</td></tr><tr><td><eq>h_1(t), h_1[n]</eq></td><td>Đáp ứng xung của hệ thống nghịch đảo: <eq>h[n] * h_1[n] = \delta[n]</eq></td></tr><tr><td><eq>s(t), s[n]</eq></td><td>Đáp ứng nhảy (ch. 2); trong ch. 7, <eq>s(t), s_i(t)</eq> là dạng sóng</td></tr><tr><td><eq>r_{xy}, r_{xx}</eq></td><td>Tương quan chéo, tự tương quan: <eq>r_{xy}[n] = x[n] * y^*[-n]</eq></td></tr><tr><td><eq>a_k, b_k</eq></td><td>Hệ số của phương trình sai phân (ch. 2, 5); hệ số của chuỗi Fourier dạng lượng giác (ch. 3)</td></tr><tr><td><eq>M, N</eq></td><td>Bậc của vé phải, vé trái phương trình sai phân (bậc tử số, mẫu số của hàm truyền); trong ch. 7, <eq>M</eq> là số thông diệp, <eq>N</eq> là số chiều của không gian tín hiệu</td></tr><tr><td>D</td><td>Phần tử trẻ một mẫu (hệ rời rạc) hoặc phần tử lấy đạo hàm (hệ liên tục) trong sơ đồ khối ch. 2</td></tr><tr><td><eq>z^{-1}</eq></td><td>Phần tử trẻ một mẫu trong sơ đồ khối, từ ch. 5</td></tr><tr><td colspan="2"><eq>\text{Tần số và các phép biến đổi}</eq></td></tr><tr><td><eq>\Omega, f</eq></td><td>Tần số của tín hiệu liên tục: <eq>\Omega</eq> [rad/s], <eq>f = \Omega/2\pi</eq> [Hz]</td></tr><tr><td><eq>\omega</eq></td><td>Tần số của tín hiệu rời rạc; cũng là góc của <eq>z = re^{j\omega}</eq></td></tr><tr><td><eq>\Omega_0, f_0, \omega_0</eq></td><td>Tần số của tín hiệu hình sin; tàn số cơ bản; trong ch. 6, <eq>\Omega_0</eq> là tần số trung tâm của bộ lọc thông đải, chấn đải</td></tr><tr><td><eq>T_s, f_s, \Omega_s</eq></td><td>Chu kỳ lấy mẫu; tần số lấy mẫu <eq>f_s = 1/T_s</eq> [Hz], <eq>\Omega_s = 2\pi f_s</eq> [rad/s] (ch. 4)</td></tr><tr><td><eq>B</eq></td><td>Tần số lớn nhất của tín hiệu [Hz]: <eq>X(j\Omega) = 0</eq> khi <eq>|\Omega| &gt; 2\pi B</eq> (ch. 4, 7)</td></tr><tr><td>BW, BW<eq>_{-3\text{ dB}}</eq></td><td>Băng thông, bằng thông 3-dB [rad/s] (ch. 3, 6)</td></tr><tr><td><eq>c_k</eq></td><td>Hệ số chuỗi Fourier của tín hiệu liên tục tuần hoàn</td></tr><tr><td><eq>\tilde{c}_k</eq></td><td>Hệ số chuỗi Fourier của dãy tuần hoàn (tuần hoàn theo <eq>k</eq> với chu kỳ <eq>N</eq>)</td></tr><tr><td><eq>X(j\Omega); X(f)</eq></td><td>Biến đổi Fourier của <eq>x(t)</eq>; phổ viết theo tần số <eq>f</eq> [Hz]</td></tr><tr><td><eq>X(e^{j\omega})</eq></td><td>Biến đổi Fourier của <eq>x[n]</eq> (DTFT)</td></tr><tr><td><eq>X(s)</eq></td><td>Biến đổi Laplace của <eq>x(t)</eq>, biến phúc <eq>s = \sigma + j\Omega</eq></td></tr><tr><td><eq>X(z); X^{+}(z)</eq></td><td>Biến đổi <eq>z</eq> của <eq>x[n]</eq>, biến phúc <eq>z = re^{j\omega}</eq>; biến đổi <eq>z</eq> một phía</td></tr><tr><td>ROC{·}</td><td>Miền hội tụ</td></tr><tr><td>FS, DTFS, FT, ZT</td><td>Toán tử chuỗi Fourier, chuỗi Fourier ròi rạc, biến đổi Fourier (dùng cho cả tín hiệu liên tục và ròi rạc), biến đổi <eq>z</eq></td></tr><tr><td><eq>\mathcal{L}\{\cdot\}, \mathcal{L}_{u}</eq></td><td>Biến đổi Laplace; biến đổi Laplace một phía</td></tr><tr><td><eq>x(t) \xleftrightarrow{\text{FT}} X(j\Omega)</eq></td><td>Cặp biến đổi; tương tự với FS, DTFS, <eq>z</eq>, <eq>\mathcal{L}</eq></td></tr><tr><td><eq>z_{pk}, z_{0r}</eq></td><td>Điểm cực, điểm không của <eq>H(z)</eq></td></tr><tr><td><eq>s_{pk}, s_{0r}</eq></td><td>Điểm cực, điểm không của <eq>H(s)</eq></td></tr><tr><td><eq>S_{XX}(e^{j\omega})</eq></td><td>Mật độ phổ: biến đổi Fourier của <eq>r_{xx}[n]</eq></td></tr></table>

<table><tr><td colspan="2">Đập ứng của hệ thông và bộ lọc</td></tr><tr><td><eq>H(z), H(s)</eq></td><td>Hàm truyền</td></tr><tr><td><eq>H(e^{j\omega}), H(j\Omega)</eq></td><td>Đáp ứng tần số (khi vòng tròn đơn vị, trục ảo nằm trong miền hội tụ của <eq>H(z), H(s)</eq>)</td></tr><tr><td><eq>H_{lp}, H_{hp}, H_{bp}, H_{bs}</eq></td><td>Bộ lọc lý tưởng thông thấp, thông cao, thông đãi, chấn đãi</td></tr><tr><td><eq>\Omega_c, \omega_c</eq></td><td>Tần số cắt (ch. 3, 4); trong ch. 6, <eq>\Omega_c</eq> của bộ lọc Butterworth là tần số 3-dB; trong ch. 7, <eq>\Omega_c</eq> là tần số sóng mang</td></tr><tr><td><eq>\delta_p, \delta_s</eq></td><td>Độ gọn sóng đãi thông, đãi chấn</td></tr><tr><td><eq>\Omega_p, \Omega_s</eq></td><td>Tần số cắt đãi thông, đãi chấn (ch. 3, 6; rời rạc: <eq>\omega_p, \omega_s</eq>); trong ch. 4, <eq>\Omega_s</eq> là tần số lấy mẫu; trong mục 6.5, <eq>\Omega_p</eq> là tần số gãy</td></tr><tr><td><eq>R_p, A_s</eq></td><td>Độ gọn dải thông, độ suy giảm dải chấn [dB]</td></tr><tr><td><eq>\tau_p, \tau_g</eq></td><td>Trễ pha, trễ nhóm</td></tr><tr><td><eq>s(\infty), t_r, t_p, t_s, M_p</eq></td><td>Giá trị xác lập, thời gian lên, thời điểm đinh, thời gian xác lập, độ vọt lố cực đại của đáp ứng nhảy</td></tr><tr><td><eq>\Omega_n, \zeta</eq></td><td>Tần số góc tự nhiên, hệ số tất dân của thành phần bậc 2</td></tr><tr><td><eq>\Omega_r, M_r</eq></td><td>Tần số tại đinh cộng hưởng, đinh cộng hưởng</td></tr><tr><td><eq>H_{\min}(s), H_{ap}(s)</eq></td><td>Hệ thống pha tối thiểu, hệ thống thông tất (ch. 6)</td></tr><tr><td><eq>H_n(s)</eq></td><td>Hàm truyền bộ lọc thông thấp chuẩn hóa (ch. 6)</td></tr><tr><td><eq>\varepsilon, T_N(\Omega)</eq></td><td>Hệ số gọn sóng, đa thức Chebyshev bậc N (bộ lọc Chebyshev, ch. 6)</td></tr><tr><td colspan="2">Thông tin số (ch. 7)</td></tr><tr><td><eq>\hat{x}(t)</eq></td><td>Tín hiệu khởi phục ở máy thu</td></tr><tr><td><eq>\mathbb{E}[\cdot]</eq></td><td>Kỳ vọng</td></tr><tr><td><eq>\mathcal{N}(\mu, \sigma^2)</eq></td><td>Phân phối chuẩn (Gauss) với kỳ vọng <eq>\mu</eq>, phương sai <eq>\sigma^2</eq></td></tr><tr><td><eq>N_0/2</eq></td><td>Mật độ phổ công suất hai phía của nhiều trắng</td></tr><tr><td><eq>m_i, \hat{m}</eq></td><td>Thông diệp thứ i; thông diệp được quyết định ở máy thu</td></tr><tr><td><eq>s_i(t), T</eq></td><td>Dạng sóng ứng với thông diệp <eq>m_i</eq>; chu kỳ ký hiệu</td></tr><tr><td><eq>g(t)</eq></td><td>Xung định dạng</td></tr><tr><td><eq>E_s, E_b, E_g</eq></td><td>Năng lượng của ký hiệu, của bit, của xung <eq>g(t)</eq></td></tr><tr><td><eq>\mathcal{S}; \phi_j(t)</eq></td><td>Không gian tín hiệu; hệ cơ sở trực chuẩn</td></tr><tr><td>Ký hiệu</td><td>Ý nghĩa</td></tr><tr><td><eq>\mathbf{s}_{i}</eq>; <eq>\mathbf{r}</eq></td><td>Điểm chòm sao (vector tọa độ của <eq>s_{i}(t)</eq>); vector quan sát</td></tr><tr><td><eq>\tilde{s}(t)</eq>; <eq>\tilde{r}</eq></td><td>Đường bao phúc (tín hiệu tương đương bằng cơ sở); quan sátphúc ở máy thu I/Q</td></tr><tr><td><eq>P_{e}</eq>, <eq>P_{s}</eq></td><td>Xác suất lỗi; xác suất lỗi ký hiệu</td></tr><tr><td>SNR</td><td>Tỷ số tín hiệu trên nhiều</td></tr></table>


Chữ viết tắt


<table><tr><td>Viết tắt</td><td>Tiếng Anh</td><td>Tiếng Việt</td></tr><tr><td>ADC</td><td>analog-to-digital converter</td><td>bộ chuyển đổi tương tự – số</td></tr><tr><td>AM</td><td>amplitude modulation</td><td>điều biên</td></tr><tr><td>BER</td><td>bit error rate</td><td>tỷ lệ lỗi bit</td></tr><tr><td>BIBO</td><td>bounded-input bounded-output</td><td>(hệ thống) ổn định</td></tr><tr><td>BPSK</td><td>binary phase-shift keying</td><td>—</td></tr><tr><td>DSB-SC</td><td>double-sideband suppressed-carrier</td><td>—</td></tr><tr><td>DTFS</td><td>discrete-time Fourier series</td><td>chuỗi Fourier cho tín hiệu rời rạc</td></tr><tr><td>DTFT</td><td>discrete-time Fourier transform</td><td>biến đổi Fourier của tín hiệu rời rạc</td></tr><tr><td>FIR</td><td>finite impulse response</td><td>đáp ứng xung có chiều dài hữu hạn</td></tr><tr><td>FM</td><td>frequency modulation</td><td>điều tần</td></tr><tr><td>FS</td><td>Fourier series</td><td>chuỗi Fourier</td></tr><tr><td>FT</td><td>Fourier transform</td><td>biến đổi Fourier</td></tr><tr><td>I/Q</td><td>in-phase / quadrature</td><td>đồng pha / vuông pha</td></tr><tr><td>i.i.d.</td><td>independent and identically distributed</td><td>độc lập và cùng phân phối</td></tr><tr><td>IIR</td><td>infinite impulse response</td><td>đáp ứng xung có chiều dài vô hạn</td></tr><tr><td>ISI</td><td>intersymbol interference</td><td>—</td></tr><tr><td>LTI</td><td>linear time-invariant</td><td>tuyến tính bất biến theo thời gian</td></tr><tr><td>MAP</td><td>maximum a posteriori</td><td>xác suất hậu nghiệm lớn nhất</td></tr><tr><td>MF</td><td>matched filter</td><td>bộ lọc phối hợp</td></tr><tr><td>ML</td><td>maximum likelihood</td><td>—</td></tr><tr><td>OFDM</td><td>orthogonal frequency-division multiplexing</td><td>—</td></tr><tr><td>PAM</td><td>pulse amplitude modulation</td><td>—</td></tr><tr><td>PLL</td><td>phase-locked loop</td><td>—</td></tr><tr><td>PM</td><td>phase modulation</td><td>điều pha</td></tr><tr><td>PSK</td><td>phase-shift keying</td><td>—</td></tr><tr><td>QAM</td><td>quadrature amplitude modulation</td><td>—</td></tr><tr><td>QPSK</td><td>quadrature phase-shift keying</td><td>—</td></tr><tr><td>ROC</td><td>region of convergence</td><td>miền hội tụ</td></tr><tr><td>RX</td><td>receiver</td><td>máy thu</td></tr><tr><td>SNR</td><td>signal-to-noise ratio</td><td>tỷ số tín hiệu trên nhiều</td></tr><tr><td>TX</td><td>transmitter</td><td>máy phát</td></tr></table>


Dấu — nghĩa là sách chỉ dùng chữ viết tắt hoặc tên tiếng Anh. 


# Những khái niệm cơ bản về tín hiệu và hệ thống

Chương này sẽ trình bày những khái niệm cơ bản nhất, bao gồm: định nghĩa, phân loại, những đặc trưng của tín hiệu và hệ thống, những phép toán thực hiện trên tín hiệu và những cách ghép nối hệ thống. Nội dung chương này có thể tham khảo thêm trong [1, 2]. 

## 1.1. Định nghĩa và phân loại tín hiệu

Những ví dụ về tín hiệu có ở khắp mọi nơi, bao gồm những dạng vật lý có thể có tác động tới các giác quan của con người như âm thanh, hình ảnh cho tới những dạng vật lý mà con người không cảm nhận được trực tiếp như sóng điện từ hoặc dòng điện trong các mạch điện tử. Ngoài ra, tín hiệu còn có thể ở những dạng trừu tượng hơn, ví dụ như chỉ số chứng khoán VN-Index theo ngày, số lượng sinh viên tới trường theo giờ, tốc độ trung bình các phương tiện giao thông chạy theo từng đoạn đường và theo từng thời điểm. 

Chúng ta có thể thấy rằng, tất cả các ví dụ trên về tín hiệu đều có những đặc điểm chung: tín hiệu có chứa thông tin về một hiện tượng nào đó, thông tin đó có thể biểu diễn qua một giá trị cụ thể, và giá trị này thông thường sẽ thay đổi theo một số đại lượng như thời gian, không gian, v.v. 

Định nghĩa 1.1. Tín hiệu là một hàm của một hay nhiều biến độc lập, mang thông tin về bản chất của một hiện tượng nào đó. 

Hình 1.1 minh họa một đoạn âm thanh x(t) do tác giả đọc từ một tới mười, trong đó trục hoành là biến thời gian t tính theo giây, trục tung thể hiện biên độ sóng âm tại các thời điểm tương ứng, nhận các giá trị thực trong dải từ -1 tới 1. Hình 1.2 là một bức ảnh đen trắng mô phỏng vân tay, được tạo bằng máy tính từ một mô hình toán học của các đường vân. Ảnh này có thể coi là một hàm f(u, v) 

của hai biến độc lập biểu diễn tọa độ $( u , v )$ của điểm ảnh, nhận giá trị là cường độ sáng thay đổi theo tọa độ của điểm ảnh. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/32b2faef91c8a3db2bb95fcbb59e5262184d4a983f7414850e238811bbb00138.jpg)



Hình 1.1. Tín hiệu âm thanh "một, hai, ba, ..., chín, mười"


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/56c78b2d663b7021cdd4bec606ec78ebf3c394e59a1809ffd670cb1dc7a02664.jpg)



Hình 1.2. Ảnh vân tay tổng hợp


Xuất phát từ định nghĩa vừa nêu, tín hiệu có thể được phân loại theo biến độc lập, hoặc theo hàm, như sau. 

Tín hiệu một chiều và nhiều chiều. Một tín hiệu được gọi là một chiều (onedimensional) khi chỉ có một biến số độc lập, ví dụ như cường độ dòng điện i(t) trong mạch là hàm phụ thuộc vào một biến thời gian, số lượng người $p ( t )$ trong phòng họp là một hàm phụ thuộc vào biến thời gian. Một tín hiệu được gọi là nhiều chiều (multi-dimensional) khi có từ hai biến số độc lập trở lên, ví dụ như trong tín hiệu hình ảnh $f ( u , v )$ , tín hiệu video $f ( u , v , t )$ 

Tín hiệu một kênh và nhiều kênh. Một tín hiệu được gọi là một kênh (onechannel) khi chỉ có một hàm phụ thuộc. Một tín hiệu được gọi là nhiều kênh (multi-channel) khi có từ hai hàm phụ thuộc trở lên (ví dụ như tín hiệu đến tai người của một hệ thống âm thanh với nhiều loa), khi đó tín hiệu được biểu diễn là một vector $[ x _ { 1 } ( t ) , x _ { 2 } ( t ) ]$ 

Tín hiệu xác định và ngẫu nhiên. Tín hiệu xác định (deterministic signal) là tín hiệu có giá trị xác định, được biểu diễn bởi một hàm theo biến thời gian. Tín hiệu ngẫu nhiên (random signal) là tín hiệu có giá trị ngẫu nhiên, được biểu diễn thông qua biến ngẫu nhiên, hàm mật độ xác suất và quá trình ngẫu nhiên. 

Tín hiệu liên tục và rời rạc theo thời gian. Tín hiệu liên tục theo thời gian (continuous-time signal) có biến số độc lập t R liên tục theo thời gian. Tín hiệu rời rạc theo thời gian (discrete-time signal) có biến số độc lập $n \in \mathbb { Z }$ rời rạc theo thời gian. 

Trong nhiều trường hợp, người ta có thể tạo tín hiệu rời rạc theo thời gian từ tín hiệu liên tục theo thời gian qua các bước: lấy mẫu (với chu kỳ $T _ { s } )$ và chuẩn hóa. 

$$
x (t) \xrightarrow [ T _ {s} ]{\text { l   a   y   m   a   u }} x (n T _ {s}) \xrightarrow {\text { c   h   u   a   n   h   o   a }} x [ n ]\tag{1.1}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/85cbad13d9948f3f8555e0912d253dabf2b676eaa32164876c287ba2e3e3cd24.jpg)



Hình 1.3. Tín hiệu liên tục x(t) và tín hiệu rời rạc theo thời gian x[n]


Phạm vi của cuốn sách này bao gồm loại tín hiệu một chiều, một kênh, và xác định. Trong đó, hai trường hợp tín hiệu liên tục theo thời gian $x ( t )$ và tín hiệu rời rạc theo thời gian $x [ n ]$ sẽ luôn được trình bày song song. 

## 1.2. Biểu diễn tín hiệu trên miền thời gian

Do tín hiệu là một hàm theo biến thời gian (x(t) hoặc x[n]), ta có thể biểu diễn tín hiệu theo công thức, đồ thị hoặc liệt kê (trong trường hợp rời rạc theo thời gian). 

Công thức. Cũng như các hàm toán học thông thường, tín hiệu có thể được biểu diễn qua các công thức, ví dụ như 

$$
x (t) = \left\{ \begin{array}{l l} 2 t + 1, & t \geq 0 \\ 0, & t \text {còn lại} \end{array} \right. \quad x [ n ] = \left\{ \begin{array}{l l} - n ^ {2} + n, & - 1 <   n <   3 \\ 0, & n \text {còn lại} \end{array} \right.
$$

Đồ thị. Trên đồ thị, tín hiệu liên tục là một đường nét liền, trong khi tín hiệu rời rạc sẽ là các đoạn nối từ tọa độ của điểm (có chấm đậm ở đầu) thẳng tới trục hoành và song song với trục tung (xem hình 1.3). 

Liệt kê. Tín hiệu rời rạc có thể coi là một dãy số. Khi đó, tín hiệu rời rạc x[n] có thể được biểu diễn theo kiểu liệt kê, như ví dụ dưới đây 

$$
x [ n ] = \left\{ \begin{array}{r l} 1, & n = - 2 \\ 0. 5, & n = - 1 \\ - 2, & n = 0 \\ 0, & n = 1 \\ 3, & n = 2 \\ - 1, & n = 3 \\ 0, & n \text {   côn   lại } \end{array} \right.\tag{1.2}
$$

hoặc có thể rút $\mathrm { \ g o n }$ lại như sau 

$$
x [ n ] = \{1, 0. 5, \underset {\uparrow} {- 2}, 0, 3, - 1 \}\tag{1.3}
$$

trong đó, dấu mũi tên chỉ vị trí $\mathrm { g } \acute { \mathrm { o c } }$ thời gian (n = 0), và những giá trị của x[n] nằm ngoài đoạn liệt kê được quy ước bằng không. Tín hiệu có chiều dài hữu hạn bằng tổng số mẫu có trong đoạn liệt kê này, do vậy tín hiệu trong (1.3) có chiều dài là 6 (mẫu). Tín hiệu này được biểu diễn trên đồ thị như trong hình 1.4. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/5588c6db8737a3b85cbf3e8c9318de1c0fb8dea9ab29b6fea8a456f133090d8a.jpg)



Hình 1.4. Biểu diễn tín hiệu rời rạc trên đồ thị


## 1.3. Năng lượng và công suất của tín hiệu

Xét tín hiệu liên tục x(t), công suất tức thời của tín hiệu được định nghĩa là 

$$
p _ {x} (t) = | x (t) | ^ {2}
$$

Lưu $\acute { \mathrm { y } }$ là biên độ của tín hiệu trong trường hợp tổng quát có thể nhận giá trị phức, do vậy ở đây minh họa cho phép lấy modulus cho số phức. 

Định nghĩa 1.2. Tổng năng lượng của tín hiệu $x ( t )$ trên đoạn $[ t _ { 1 } , t _ { 2 } ]$ là $\textstyle \int _ { t _ { 1 } } ^ { t _ { 2 } } | x ( t ) | ^ { 2 } d t$ và tổng năng lượng của tín hiệu trên toàn trục thời gian là 

$$
E _ {x} = \lim _ {T \to \infty} \int_ {- T} ^ {T} | x (t) | ^ {2} d t = \int_ {- \infty} ^ {\infty} | x (t) | ^ {2} d t\tag{1.4}
$$

Công suất trung bình của tín hiệu trên toàn trục thời gian là 

$$
P _ {x} = \lim _ {T \to \infty} \frac {1}{2 T} \int_ {- T} ^ {T} | x (t) | ^ {2} d t\tag{1.5}
$$

Trong trường hợp tín hiệu rời rạc theo thời gian x[n], ta cũng có các định nghĩa tương tự cho tổng năng lượng và công suất trung bình của x[n]. 

$$
\begin{array}{l} {E _ {x} = \sum_ {n = - \infty} ^ {\infty} | x [ n ] | ^ {2}} \\ {P _ {x} = \lim _ {N \to \infty} \frac {1}{2 N + 1} \sum_ {n = - N} ^ {N} | x [ n ] | ^ {2}} \end{array}
$$

Ví dụ 1.1. Hãy tìm tổng năng lượng và công suất trung bình của tín hiệu sau 

$$
x (t) = 5 \cos (2 \pi \cdot 5 0 t - \pi / 3)
$$

Lời giải. Do $x ( t )$ tuần hoàn và không đồng nhất bằng 0 nên dễ thấy tổng năng lượng của tín hiệu này, theo (1.4), sẽ bằng vô cùng 

$$
E _ {x} = \infty
$$

Tiếp theo, chúng ta sẽ tìm công suất trung bình theo (1.5) 

$$
\begin{array}{l} P _ {x} = \lim _ {T \to \infty} \frac {1}{2 T} \int_ {- T} ^ {T} 2 5 \cos^ {2} (2 \pi \cdot 5 0 t - \pi / 3) d t \\ \quad = \lim _ {T \to \infty} \frac {1}{2 T} \int_ {- T} ^ {T} \frac {2 5}{2} (1 + \cos (2 0 0 \pi t - 2 \pi / 3)) d t \\ \quad = \frac {2 5}{2} + \frac {2 5}{2} \frac {1}{2 0 0 \pi} \lim _ {T \to \infty} \frac {\sin (2 0 0 \pi T - 2 \pi / 3) - \sin (- 2 0 0 \pi T - 2 \pi / 3)}{2 T} \\ \quad = \frac {2 5}{2} \end{array}
$$

Trong công thức trên, tử số bị chặn, mẫu số tiến tới vô cùng nên giới hạn đó sẽ tiến tới 0 khi $T \to \infty$  

Python. Với tín hiệu tuần hoàn, giới hạn trong (1.5) bằng trung bình của $| x ( t ) | ^ { 2 }$ trên một số nguyên chu kỳ, nên có thể tính gần đúng bằng tích phân số với hàm np.trapezoid (quy tắc hình thang). Đoạn mã sau lấy trung bình trên đoạn [0, 1] s (đúng 50 chu kỳ) và cho $\mathsf { P } = 1 2 . 5$ , trùng với kết quả trên. 

```python
import numpy as np
t = np.linspace(0, 1, 100001)
x = 5*np.cos(2*np.pi*50*t - np.pi/3)
P = np.trapezoid(np.abs(x)**2, t) / (t[-1] - t[0]) 
```

Định nghĩa 1.3. Xuất phát từ hai khái niệm năng lượng và công suất, người ta phân tín hiệu thành hai loại như sau: 

• <sup>Tín</sup> <sup>hiệu</sup> <sup>năng</sup> <sup>lượng:</sup> $E _ { x } < \infty$ 

Tín hiệu công suất: $0 < P _ { x } < \infty$ 

Chúng ta dễ dàng chứng minh được rằng một tín hiệu nếu đã thuộc loại tín hiệu năng lượng $( E _ { x } < \infty )$ thì sẽ có công suất trung bình $P _ { x } = 0$ , do vậy sẽ không thể là tín hiệu công suất. Ngược lại, nếu một tín hiệu thuộc loại tín hiệu công suất $( 0 < P _ { x } < \infty )$ thì sẽ có tổng năng lượng $E _ { x } = \infty$ , do vậy sẽ không thể là tín hiệu năng lượng. Cũng có những tín hiệu không thuộc loại nào trong hai loại trên, ví dụ $x [ n ] = n$ với n  0, x[n] = 0 với $n < 0 .$ , có $E _ { x } = \infty$ và $P _ { x } = \infty$ 

## 1.4. Các phép toán thực hiện trên tín hiệu

Tín hiệu được biểu diễn về mặt toán học là một hàm phụ thuộc vào biến số thời gian, do $\mathrm { v } \mathrm { \hat { a } \mathrm { y } }$ , các phép toán thực hiện trên tín hiệu cũng được chia thành hai loại: các phép toán thực hiện trên biến số độc lập (thời gian), và các phép toán thực hiện trên giá trị (biên độ) của tín hiệu. 

## 1.4.1. Các phép toán thực hiện trên thời gian

Các phép toán cơ bản thực hiện trên thời gian bao gồm: phép dịch (time shifting), phép co giãn (scaling), phép lấy đối xứng (còn gọi là đảo thời gian - reflection, folding, time reversal) như minh họa trong Hình 1.5. 

Phép dịch. Tín hiệu $x ( t - T )$ , với $T$ là hằng số, là $x ( t )$ dịch đi một đoạn T dọc theo trục thời gian (còn gọi là phép tịnh tiến). Lưu $\acute { \mathrm { y } }$ về chiều dịch của $x ( t - T )$ 

Dịch về bên phải: $T > 0$ 

Dịch về bên trái: $T < 0$ 

Phép lấy đối xứng. Tín hiệu x( t) là $x ( t )$ được lấy đối xứng qua trục tung, phép này còn được gọi là phép đảo thời gian. 

Phép co giãn. Tín hiệu $x ( a t )$ , với a là hằng số vô hướng, là $x ( t )$ bị co / giãn với tỷ lệ a. 

• <sup>Co:</sup> |<sup>a</sup>| <sup>></sup> <sup>1</sup> 

Giãn: $| a | < 1$ 

Khi $a < 0$ , tín hiệu $x ( a t )$ là $x ( | a | t )$ được lấy đối xứng qua trục tung, tức là phép co giãn kết hợp với phép lấy đối xứng (xem ví dụ 1.3). 

Ví dụ 1.2. Cho tín hiệu liên tục $x ( t )$ như trong hình 1.6 (a). Dạng của các tín hiệu x(t  1), x(2t) và $x ( 2 t - 1 )$ được vẽ lần lượt trong các hình 1.6 (b),(c),(d). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/c0bbec5544c73a9e3ecda5c65f259274492b0851eeb8d47458cde2624e262bd9.jpg)



(a) Tín hiệu ban đầu


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/6f2816b48a37beb7d71039d4d7dd72180ccf34819d38f89bbf33d9e19defba7e.jpg)



(b) Phép dịch theo thời gian


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/2b7707a0c776340d5049e1ad013a0c2374b145a517f0d7f49243913fd9c06eb2.jpg)



(c) Phép lấy đối xứng


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/95f93500e8ee1c8a232605bf1d30ce7353d7f225bf7a9eab1475f4a987c93cb0.jpg)



(d) Phép co giãn



Hình 1.5. Các phép toán thực hiện trên biến thời gian


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4856d021e1bf5bbfd9ce2bd35aa6298cd238adf8edc02f4819aa5e5738370b7a.jpg)



(a) Tín hiệu x(t)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7a9236a4533f1d6345e3718f22da20de1342fc4d28400ed0a191aeb84f510346.jpg)



(b) Dịch phải


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/736157507a3838247b6eb8a174d17ad1f4e140c2330f3722792d0c8af1ce1bea.jpg)



(c) Phép co


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/dd6e834651dd3cd4623d33ae592d59349ae2cf9c096007ed6d075478b7943874.jpg)



(d) Phép co và dịch



Hình 1.6. Tín hiệu liên tục và các phép toán trên biến độc lập


Ví dụ 1.3. Cho tín hiệu liên tục $x ( t )$ được minh họa trong hình 1.7 (a). Hãy vẽ tín hiệu $x ( - 2 t + 1 )$ . 

Lời giải. Trong trường hợp phải thực hiện nhiều phép toán trên biến độc lập, chúng ta lựa chọn một số điểm (càng nhiều điểm càng tốt) để ánh xạ từ đồ thị x(t) 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1d04c2b468a1143d2acdd0614245ad83c5e9ec17655ffc184536468cea063070.jpg)



(a) Cho tín hiệu x(t)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1fb60d6a33a7f7ae3c6a4db4894bd81ef84a38c681fb6d0be920a3b2494219de.jpg)



(b) Vẽ x(−2t + 1)



Hình 1.7. Thực hiện nhiều phép toán cùng một lúc


qua đồ thị $x ( - 2 t + 1 ) . { \overset { \underset { } { \bigotimes } } { \bigotimes } }$ đây, ta chọn các điểm $\mathrm { A } ( - 1 , 0 )$ , B(0,2), C(2,2), D(4,0) trên $x ( t )$ . Khi $\mathrm { \acute { d o } , }$ các điểm tương ứng $\mathrm { A } ^ { \prime } , \mathrm { B } ^ { \prime } , \mathrm { C } ^ { \prime } , \mathrm { D } ^ { \prime }$ trên $x ( - 2 t + 1 )$ sẽ là 

$$
\begin{array}{c} A (t = - 1, x (t) = 0) \to A ^ {\prime} (- 2 t + 1 = - 1, x (- 2 t + 1) = 0) \\ \equiv A ^ {\prime} (t = 1, x (- 2 t + 1) = 0) \end{array}
$$

$$
\begin{array}{c} B (t = 0, x (t) = 2) \to B ^ {\prime} (- 2 t + 1 = 0, x (- 2 t + 1) = 2) \\ \equiv B ^ {\prime} (t = 0. 5, x (- 2 t + 1) = 2) \end{array}
$$

$$
\begin{array}{c} C (t = 2, x (t) = 2) \to C ^ {\prime} (- 2 t + 1 = 2, x (- 2 t + 1) = 2) \\ \equiv C ^ {\prime} (t = - 0. 5, x (- 2 t + 1) = 2) \end{array}
$$

$$
\begin{array}{c} D (t = 4, x (t) = 0) \to D ^ {\prime} (- 2 t + 1 = 4, x (- 2 t + 1) = 0) \\ \equiv D ^ {\prime} (t = - 1. 5, x (- 2 t + 1) = 0) \end{array}
$$

Căn cứ vào các điểm đặc biệt trên, ta có thể vẽ tín hiệu $x ( - 2 t + 1 )$ như trên hình 1.7 (b).  

## 1.4.2. Các phép toán thực hiện trên giá trị của tín hiệu

Cũng giống như các hàm toán học, người ta có các phép nhân tín hiệu với hằng số, phép cộng hai tín hiệu và phép nhân hai tín hiệu. 

$$
y (t) = a \cdot x (t)\tag{1.6}
$$

$$
y (t) = x _ {1} (t) + x _ {2} (t)\tag{1.7}
$$

$$
y (t) = x _ {1} (t) \cdot x _ {2} (t)\tag{1.8}
$$

## 1.4.3. Trường hợp tín hiệu rời rạc

Các phép toán trên tín hiệu rời rạc x[n] cũng được thực hiện tương tự như trường hợp tín hiệu liên tục $x ( t )$ , trừ trường hợp giãn tín hiệu $( | a | < 1 )$ . Do $x [ n ]$ chỉ xác định tại các giá trị nguyên của $n ,$ khoảng dịch n<sub>0</sub> trong $x [ n - n _ { 0 } ]$ phải là số nguyên, và phép co x[an] chỉ thực hiện với a nguyên. Khác với trường hợp liên tục, phép co tín hiệu rời rạc làm mất mẫu: ví dụ $x [ 2 n ]$ chỉ giữ lại các mẫu của x[n] có chỉ số chẵn, do vậy không thể khôi phục x[n] từ $x [ 2 n ]$ 

Ví dụ 1.4. Cho tín hiệu rời rạc x[n] như trong hình 1.8. Dạng của các tín hiệu $c [ n + 1 ] , x [ 2 n ]$ và $x [ 2 n + 1 ]$ được vẽ trong hình 1.8 $( \mathrm { b } ) , ( \mathrm { c } ) , ( \mathrm { d } )$ . Cần lưu ý rằng các tín hiệu rời rạc chỉ nhận các mẫu tại các giá trị nguyên của n. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b1ed99e5c20f554c913856c5e6fdfea1113d4bdb1ec3a2492fdbb8b8c1eba285.jpg)



(a) Tín hiệu x[n]


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7063c254ceaaebf0796fe98141050cf0d1890976786f2a674e9302545158b375.jpg)



(b) Dịch trái


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/5b05029429961bb96f716a0ff965dc299df936567f96cf4e2b8902981a7e9a33.jpg)



(c) Phép co


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/e3e67e4376d7b89a725d203a378e5c6dc55199a2f41970fe46258bc0b58bd214.jpg)



(d) Phép co và dịch



Hình 1.8. Tín hiệu rời rạc và các phép toán trên biến độc lập


## 1.4.4. Một số ví dụ thực tế

Các phép toán cơ bản vừa tìm hiểu đều được sử dụng rất nhiều trong việc mô hình hóa và phát triển các hệ thống thông tin sau này. Dưới đây là một số ví dụ điển hình. 

1.4.4.1. Truyền tín hiệu. Hình 1.9 minh họa sơ đồ thu phát tín hiệu trong một hệ thống thông tin. Khi đó, tín hiệu thu được $y ( t )$ có thể được biểu diễn qua tín hiệu phát đi $x ( t )$ như sau 

$$
y (t) = \alpha x (t - \tau) + n (t)
$$

trong đó x(t) là tín hiệu phát đi, $y ( t )$ là tín hiệu thu được, $n ( t )$ là nhiễu cộng (quá trình ngẫu nhiên), α là suy hao do truyền dẫn (phụ thuộc vào môi trường và khoảng cách), τ là thời gian truyền (độ trễ truyền dẫn). 

Như vậy, ở đây chúng ta đã thực hiện các phép dịch, nhân với hằng số và phép cộng tín hiệu. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1eccbe4f9beeefce99af58d49f62970099744921855425799f7d9d802285dd75.jpg)



Hình 1.9. Truyền tín hiệu trong một hệ thống thông tin


1.4.4.2. Kênh đa đường. Hình 1.10 minh họa một hệ thống thông tin mà tín hiệu truyền từ máy phát tới máy thu theo nhiều đường khác nhau (với các hệ số suy hao $\alpha _ { i }$ và thời gian truyền $\tau _ { i }$ khác nhau). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/68fbd9af238ac40582f4953b8a08d54ae28f7416c5dc04192337dc587a52e617.jpg)



Hình 1.10. Kênh đa đường


Khi đó, tín hiệu thu được y(t) là 

$$
\begin{array}{l} y (t) = \alpha_ {0} x (t - \tau_ {0}) + \alpha_ {1} x (t - \tau_ {1}) + \alpha_ {2} x (t - \tau_ {2}) + \dots + n (t) \\ = \sum_ {i} \alpha_ {i} x (t - \tau_ {i}) + n (t) \end{array}
$$

trong đó $\alpha _ { i } , \tau _ { i }$ tương ứng là suy hao và trễ truyền dẫn của đường thứ i. 

1.4.4.3. Điều chế biên độ (AM). Hình 1.11 minh họa máy phát thực hiện điều chế biên độ AM theo kiểu DSB-SC nhằm ghép tín hiệu chứa tin $x ( t )$ (thường có tần số thấp) vào sóng mang có tần số cao $f _ { c }$ để thành tín hiệu phù hợp hơn với môi trường truyền dẫn (do vậy có thể truyền được đi xa hơn, tin cậy hơn). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/76352bf1d209227229f6396ad1691859ee9b5f6998d6611f63ac0e9cc12d838b.jpg)



Hình 1.11. Điều chế biên độ AM DSB-SC


$$
y (t) = x (t) \cos (2 \pi f _ {c} t)
$$

Như $\mathrm { v a y } .$ , phép điều chế ở đây chỉ đơn giản là một phép nhân hai tín hiệu. 

## 1.5. Một số dạng tín hiệu cơ bản

Phần này sẽ giới thiệu một số loại tín hiệu hay gặp trên thực tế (như tín hiệu hàm mũ và tín hiệu hình sin), và các tín hiệu cơ bản khác. 

## 1.5.1. Tín hiệu tuần hoàn

Định nghĩa 1.4. Tín hiệu $x ( t )$ , x[n] được gọi là tuần hoàn nếu như tồn tại các hằng số $T \in \mathbb { R } ^ { + }$ và $N \in \mathbb { Z } ^ { + }$ sao cho 

$$
\begin{array}{l l} {x (t) = x (t + T), \quad \forall t} \\ {x [ n ] = x [ n + N ], \quad \forall n} \end{array}
$$

Giá trị T , N nhỏ nhất (nếu tồn tại) thỏa mãn điều kiện trên gọi là chu $\mathrm { k } \mathrm { \hat { y } }$ cơ bản (fundamental period) của tín hiệu. 

Ví dụ 1.5. Xác định xem các tín hiệu dưới đây có phải là tuần hoàn không? Nếu tuần hoàn thì hãy tính chu kỳ cơ bản. 

(a) $x _ { 1 } ( t ) = \cos ^ { 2 } ( 2 \pi t + \pi / 4 )$ 

(b) $x _ { 2 } [ n ] = \sin ( 2 n )$ 

Lời giải. (a) Áp dụng công thức hạ bậc, ta có 

$$
x _ {1} (t) = \cos^ {2} (2 \pi t + \pi / 4) = \frac {1}{2} + \frac {1}{2} \cos (4 \pi t + \pi / 2)
$$

Thành phần cos $( 4 \pi t + \pi / 2 )$ tuần hoàn với chu kỳ cơ bản $2 \pi / ( 4 \pi ) = 1 / 2$ , do vậy $x _ { 1 } ( t )$ tuần hoàn với chu kỳ cơ bản $T = 1 / 2$ 

(b) Giả sử $x _ { 2 } [ n ]$ tuần hoàn với chu kỳ $N \in \mathbb { Z } ^ { + }$ , tức là $\sin ( 2 n + 2 N ) = \sin ( 2 n )$ với mọi n. Biến đổi hiệu thành tích, ta có 

$$
\sin (2 n + 2 N) - \sin (2 n) = 2 \cos (2 n + N) \sin N = 0, \quad \forall n
$$

Nếu sin $N \neq 0$ thì $\cos ( N ) = 0$ và cos $( N + 2 ) = 0$ (ứng với $n = 0$ và $n = 1 )$ , tức là cả N và $N + 2$ đều có dạng $\pi / 2 +$ mπ với m nguyên. Khi $\mathrm { d } \mathrm { ~ d ~ } 2$ là bội nguyên của π, vô lý vì π là số vô $\mathrm { t { \overset { \cdot } { y } } } .$ . Do vậy sin $N = 0$ , tức là $N = k \pi$ với k nguyên dương, suy ra $\pi = N / k$ là số hữu tỷ, vô lý. Như vậy $x _ { 2 } [ n ]$ không tuần hoàn.  

## 1.5.2. Tín hiệu đối xứng và phản đối xứng

Định nghĩa 1.5. Tương tự như trong toán học, tín hiệu chẵn (đối xứng) và lẻ (phản đối xứng) được định nghĩa như sau 

$$
\bullet \mathrm{Chan:} x (t) = x (- t); x [ n ] = x [ - n ]
$$

$$
\bullet \quad \text {   Lê:   } x (t) = - x (- t); x [ n ] = - x [ - n ]
$$

Ví dụ 1.6. Một tín hiệu $x ( t )$ bất kỳ đều có thể được phân tích thành 2 thành phần chẵn, lẻ: $x ( t ) = x _ { e } ( t ) + x _ { o } ( t )$ . Hãy tìm $x _ { e } ( t )$ và $x _ { o } ( t )$ theo $x ( t )$ 

Lời $\mathbf { g i } \mathrm { \dot { a } i }$ . Thay t bởi t và dùng tính chẵn của $x _ { e } ( t )$ , tính lẻ của $x _ { o } ( t )$ , ta có $x ( - t ) = x _ { e } ( - t ) + x _ { o } ( - t ) = x _ { e } ( t ) - x _ { o } ( t )$ . Kết hợp với $x ( t ) = x _ { e } ( t ) + x _ { o } ( t )$ , ta được 

$$
x _ {e} (t) = \frac {x (t) + x (- t)}{2}, \qquad x _ {o} (t) = \frac {x (t) - x (- t)}{2}
$$

Dễ kiểm tra lại rằng $x _ { e } ( t )$ ở trên là tín hiệu chẵn, $x _ { o } ( t )$ là tín hiệu lẻ, và tổng của chúng bằng $x ( t )$  

Python. Công thức trên $\mathrm { { \acute { a p } } }$ dụng tương tự cho tín hiệu rời rạc: $\begin{array} { r } { x _ { e } [ n ] = \frac { x [ n ] + x [ - n ] } { 2 } } \end{array}$ $\begin{array} { r } { x _ { o } [ n ] = \frac { x [ n ] - x [ - n ] } { 2 } } \end{array}$ . Khi các chỉ số n đối xứng quanh 0 (ở đây $n = - 3 , \ldots , 3 )$ , mảng đảo $\operatorname { n g u m e c } \mathbf { x } \left[ : : - 1 \right]$ chính là $x [ - n ]$ . Với $x [ n ] = u [ n ]$ , các mảng xe, xo cho 

$$
x _ {e} [ n ] = \{0. 5, 0. 5, 0. 5, \underset {\uparrow} {1}, 0. 5, 0. 5, 0. 5 \}
$$

$$
x _ {o} [ n ] = \{- 0. 5, - 0. 5, - 0. 5, \underset {\uparrow} {0}, 0. 5, 0. 5, 0. 5 \}
$$

```python
import numpy as np
n = np.arange(-3, 4)
x = (n >= 0) * 1.0
xe = (x + x[::-1]) / 2
xo = (x - x[::-1]) / 2 
```

## 1.5.3. Tín hiệu hàm mũ thực

$$
x (t) = C e ^ {a t}, x [ n ] = C e ^ {a n}, \qquad C, a \in \mathbb {R}
$$

Với tín hiệu rời rạc, người ta thường viết dưới dạng $x [ n ] = C \alpha ^ { n }$ . Dạng $C e ^ { a n }$ ở trên ứng với $\alpha = e ^ { a } > 0 ;$ dạng $C \alpha ^ { n }$ còn cho phép $\alpha < 0$ , khi đó giá trị của $x [ n ]$ đổi dấu luân phiên. 

Ví dụ 1.7. Xét mạch điện không có nguồn, gồm tụ C và điện trở R mắc nối tiếp. Điện $\mathrm { { \dot { a } p } } \ v ( t )$ trên tụ $C$ là tín hiệu hàm mũ thực, được biểu diễn qua công thức sau (giả thiết tại thời điểm $t = 0$ tụ đã được nạp đến điện áp $V _ { 0 }$ , sau đó phóng điện qua R). 

$$
v (t) = V _ {0} e ^ {- \frac {1}{R C} t}, \quad t \geq 0
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/c96fa89575c6c4572a0d6bb533a5362e074af38fc71c653393a79db191f8faa9.jpg)



(a) Tín hiệu liên tục, a < 0


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/e5d645a4560fd11d0111eebc1d377ee65f4be3b930e82b079a8ddc5ef475ef6d.jpg)



(b) Tín hiệu liên tục, a > 0


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/439e4333a8cbe64db11ae91536d16d661a289f2375d209eb90b35266180a44b1.jpg)



(c) Tín hiệu rời rạc, a < 0


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/479e0f80adddafc7b7cd62031e81d3c92a86c2af149cff936a2e9cdd00569d20.jpg)



(d) Tín hiệu rời rạc, a > 0



Hình 1.12. Các ví dụ về tín hiệu hàm mũ thực


## 1.5.4. Tín hiệu hình sin

$$
x (t) = \sin (\Omega_ {0} t + \phi)
$$

Với $\Omega _ { 0 } > 0$ , tín hiệu này tuần hoàn với chu kỳ $\begin{array} { r } { T = \frac { 2 \pi } { \Omega _ { 0 } } } \end{array}$ . Một ví dụ hay gặp là mạch điện bao gồm tụ $C$ và cuộn cảm $L$ sẽ tạo ra tín hiệu dao động hình sin với tần số $\begin{array} { r } { \Omega _ { 0 } = \frac { 1 } { \sqrt { L C } } } \end{array}$ 

Một tín hiệu liên tục hình sin $x ( t ) = \cos ( \Omega _ { 0 } t )$ có tần số $\Omega _ { 0 } [ \mathrm { r a d / s } ]$ (hoặc $\begin{array} { r } { f _ { 0 } = \frac { \Omega _ { 0 } } { 2 \pi } } \end{array}$ [Hz]). Hiển nhiên, $\Omega _ { 0 }$ (hoặc $f _ { 0 } )$ càng lớn thì tín hiệu có tần số càng cao, và ngược lại. Hình 1.13 minh họa các tín hiệu hình sin với tần số khác nhau. Ta thấy các tín hiệu thay đổi nhanh theo thời gian sẽ có tần số cao $\left( x _ { 3 } ( t ) \right)$ , tín hiệu thay đổi chậm theo thời gian sẽ có tần số thấp $( x _ { 1 } ( t ) )$ 

Trong trường hợp tín hiệu rời $\mathrm { r a c } ,$ xét một tín hiệu hình sin sau 

$$
x [ n ] = \cos (\omega_ {0} n)
$$

Lưu $\acute { \mathrm { ~ y ~ r ~ a ~ } }$ ng 

$$
\cos (\omega_ {0} n) = \cos ((\omega_ {0} + 2 \pi) n)
$$

Các tín hiệu rời rạc hình sin có tần số $\omega _ { 0 }$ sẽ giống hệt các tín hiệu có tần số $\omega _ { 0 } + k 2 \pi$ (với k là số nguyên bất kỳ). Do $\mathrm { v a y } ,$ khái niệm về tần số cao và thấp trong trường hợp này sẽ rút gọn về trong khoảng [0, 2π]. Ta thấy trong khoảng này, tần số sẽ thay đổi tăng dần từ thấp (gần 0) tới cao (xung quanh π), rồi sau đó lại giảm dần xuống thấp $( \mathrm { g } \dot { \hat { \mathrm { a } } } \mathrm { n } 2 \pi )$ . Hình 1.14 minh họa hai tín hiệu rời rạc hình sin khác nhau. Dễ thấy tín hiệu $x _ { 1 } [ n ]$ thay đổi nhanh hơn theo thời gian nên có tần số cao (giá trị $\omega _ { 1 } = 0 . 8 \pi$ gần với π hơn). Tín hiệu $x _ { 2 } [ n ]$ thay đổi chậm hơn theo thời gian nên có tần số thấp (giá trị $\omega _ { 2 } = 1$ .8π gần với 2π hơn). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/d1b563df4fec2c19621f2bce8df5f182a29e9bad1b9781fe8cbf00b0b5936d4f.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b6a61bec47f8b2c15f6ea47c4c681306d51c0d29f0542cd189ed3926337aea4c.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/d349d81d287152ab72a180dad60e6c555717182d2b82116efbf819f97eb8af00.jpg)



Hình 1.13. Các tín hiệu hình sin với tần số khác nhau


Ngoài ra, khác với trường hợp liên tục, tín hiệu rời rạc hình sin $\cos ( \omega _ { 0 } n )$ không phải lúc nào cũng tuần hoàn. Tín hiệu này tuần hoàn khi và chỉ khi $\omega _ { 0 } / ( 2 \pi )$ là số hữu tỷ. Khi đó, nếu viết $\omega _ { 0 } / ( 2 \pi ) = { k } / { N }$ dưới dạng phân số tối giản với $N > 0 ,$ thì chu kỳ cơ bản là N. Ví dụ, tín hiệu $x _ { 2 } [ n ] = \sin ( 2 n ) { \mathrm { ~ \boldsymbol { \delta } ~ } }$ trên không tuần hoàn vì $2 / ( 2 \pi ) = 1 / \pi$ là số vô tỷ. 

## 1.5.5. Tín hiệu hàm mũ phức

Với C và a là số phức: $C = | C | e ^ { j \theta }$ và $a = r + j \Omega _ { 0 }$ , ta có: 

$$
\begin{array}{r l} & {x (t) = | C | e ^ {r t} e ^ {j (\Omega_ {0} t + \theta)}} \\ & {\qquad = | C | e ^ {r t} \cos (\Omega_ {0} t + \theta) + j | C | e ^ {r t} \sin (\Omega_ {0} t + \theta)} \end{array}
$$

Ta thấy các thành phần $\mathrm { R e } \{ x ( t ) \}$ và Im $\{ x ( t ) \}$ đều là tích của tín hiệu hàm mũ thực và tín hiệu hình sin. Hình 1.15 minh họa một tín hiệu dao động tắt dần có thể gặp trong mạch điện RLC. 

Tương tự, với tín hiệu rời rạc $x [ n ] = C \alpha ^ { n }$ , trong đó $C = | C | e ^ { j \theta }$ và $\alpha = | \alpha | e ^ { j \omega _ { 0 } }$ là các số phức, ta có 

$$
x [ n ] = | C | | \alpha | ^ {n} \cos (\omega_ {0} n + \theta) + j | C | | \alpha | ^ {n} \sin (\omega_ {0} n + \theta)
$$

Phần thực và phần ảo của x[n] là các tín hiệu hình sin rời rạc với đường bao $| C | | \alpha | ^ { n }$ đường bao tăng dần khi $| \alpha | > 1$ , giảm dần khi $| \alpha | < 1$ và không đổi khi $| \alpha | = 1$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7d75b430d334282ef04cce8ac18bcd00f4e030d519f6e783e85f4f9dd8e00898.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/aafad32afe9d1337e5e83672ab781a6a49d3baffae24fbe4a975047434f642d6.jpg)



Hình 1.14. Tín hiệu rời rạc hình sin $x [ n ] = \sin ( \omega n )$ với $\omega _ { 1 } = 0 ,$ .8π và $\omega _ { 2 } =$ 1.8π


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/936f814ded5dcf79ce2a024c8ca31201c98feffea199d94f4e63afa69b1a24f3.jpg)



Hình 1.15. Tín hiệu dao động tắt dần


## 1.5.6. Hàm nhảy đơn vị

$$
u (t) = \left\{ \begin{array}{l l} 1, & t \geq 0 \\ 0, & t \quad \text { c   o   n   l   a   i } \end{array} \right. \quad u [ n ] = \left\{ \begin{array}{l l} 1, & n \geq 0 \\ 0, & n \quad \text { c   o   n   l   a   i } \end{array} \right.
$$

Trong mạch điện, hàm nhảy đơn vị thường được dùng để biểu diễn khóa K đóng 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4cdd3ca52f02f5c761997dc6b9171803f335342b7cd861af94f024c4e78578f3.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/cac7a3b3bf79802b589672f2f3e8eccbf70b9e353977d8e350b2c9cf3d1a066f.jpg)



Hình 1.16. Hàm nhảy đơn vị u(t) và u[n]


/ mở tại thời điểm $t = 0 .$ 

## 1.5.7. Hàm xung đơn vị

Hàm xung đơn vị $\delta [ n ]$ (xem hình 1.17) cho trường hợp rời rạc theo thời gian được định nghĩa như sau 

$$
\delta [ n ] = \left\{ \begin{array}{l l} 1, & n = 0 \\ 0, & n \quad \text { c   o   n   l   a   i } \end{array} \right.\tag{1.9}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/45cec34ec4531913fd34e0a275fc420b69e08d6f96849e734daccc99a3e46046.jpg)



Hình 1.17. Hàm xung đơn vị δ[n]


Quan hệ với hàm nhảy đơn vị: 

$$
\begin{array}{l} \delta [ n ] = u [ n ] - u [ n - 1 ] \\ u [ n ] = \sum_ {k = 0} ^ {\infty} \delta [ n - k ] \end{array}
$$

Một tín hiệu $x [ n ]$ bất kỳ có thể được biểu diễn qua hàm xung đơn vị theo công thức sau 

$$
x [ n ] = \sum_ {k = - \infty} ^ {\infty} x [ k ] \delta [ n - k ]\tag{1.10}
$$

Lấy ví dụ tín hiệu rời rạc (1.3) có thể được biểu diễn 

$$
\begin{array}{c} x [ n ] = \{1, 0. 5, - 2, 0, 3, - 1 \} \\ = \delta [ n + 2 ] + 0. 5 \delta [ n + 1 ] - 2 \delta [ n ] + 3 \delta [ n - 2 ] - \delta [ n - 3 ] \end{array}
$$

Như $\mathrm { v a y } .$ , có $\mathrm { t h } \mathring { \mathrm { e } }$ nói xung đơn vị là thành phần cơ bản nhất tạo nên tín hiệu. 

Trong trường hợp tín hiệu liên tục theo thời gian, hàm xung đơn vị, còn gọi là hàm delta Dirac, được định nghĩa như sau. 

$$
\delta (t) = 0, \quad \forall t \neq 0
$$

$$
\int_ {- \infty} ^ {\infty} \delta (t) d t = 1\tag{1.11}
$$

(1.12) 

Chặt chẽ về mặt toán học, $\delta ( t )$ không phải là một hàm số thông thường mà là một hàm suy rộng (generalized function), được xác định thông qua tích phân của nó với các hàm khác, như trong tính chất lấy mẫu (1.14) dưới đây. Trong sách này, hai hệ thức trên được dùng như một định nghĩa mang tính kỹ thuật. 

Trong hình 1.18 bên trái, xét các xung chữ nhật bao quanh $\mathrm { g } \acute { \mathrm { o c } } ,$ có diện tích bằng 1. Thực hiện giảm dần độ rộng xung nhưng giữ nguyên diện tích, khi đó chiều cao của xung cũng tăng dần. Khi giảm độ rộng xung về 0 (vẫn giữ nguyên diện tích 1) thì ta thu được hàm delta Dirac $\delta ( t )$ (hay còn gọi là hàm xung đơn vị cho trường hợp liên tục theo thời gian), hàm này được ký hiệu với một dấu mũi tên chỉ lên (như trong hình 1.18 bên phải). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/d9c9166740685e7f52ebecd71ba48306de98c0ee4729d02b0e0ff5a87b69675d.jpg)



Hình 1.18. Hàm delta Dirac δ(t)


Một số tính chất của hàm delta Dirac: 

$$
\delta (t) = \frac {d}{d t} u (t), \quad u (t) = \int_ {- \infty} ^ {t} \delta (\tau) d \tau\tag{1.13}
$$

$$
x (t _ {0}) = \int_ {- \infty} ^ {\infty} x (t) \delta (t - t _ {0}) d t, \quad x (t) \text { liên   tục   tại } t _ {0}\tag{1.14}
$$

$$
\delta (a t) = \frac {1}{| a |} \delta (t), \quad a \neq 0\tag{1.15}
$$

Tính chất (1.14) được gọi là tính chất lấy mẫu (sampling property) của hàm xung đơn vị. 

## 1.5.8. Hàm dốc đơn vị

Hàm dốc đơn vị (xem hình 1.19) được định nghĩa 

$$
r (t) = \left\{ \begin{array}{l l} t, & t \geq 0 \\ 0, & t \quad \text { c   o   n   l   a   i } \end{array} \right. \quad r [ n ] = \left\{ \begin{array}{l l} n, & n \geq 0 \\ 0, & n \quad \text { c   o   n   l   a   i } \end{array} \right.\tag{1.16}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1d51489d956fc4c45fedca2e97f7451e63185e13fb1b336d0137795834656d69.jpg)



Hình 1.19. Hàm dốc đơn vị r(t) và r[n]


## 1.6. Định nghĩa và phân loại hệ thống

Hệ thống là một khái niệm tồn tại song song với tín hiệu. Cũng như tín hiệu, các ví dụ về hệ thống có ở khắp mọi nơi. Một chiếc điện thoại có thể coi là một hệ thống lớn bao gồm nhiều hệ thống nhỏ (như màn hình, nút bấm, loa, mic, v.v.), nó nhận các tín hiệu đầu vào là sóng điện từ (đến từ trạm BTS), tiếng nói (từ người dùng), thực hiện một số chức năng nào đó và đưa ra các tín hiệu đầu ra như sóng điện từ (gửi tới trạm BTS) và âm thanh (phát ra loa) hay hình ảnh (hiển thị trên màn hình). Một chiếc máy in nhận lệnh in, thực hiện phun mực theo các tọa độ in, và xuất ra tờ giấy có nội dung tương ứng. Một cái bóng đèn sợi đốt nhận lệnh tắt bật và mức độ sáng sẽ điều chỉnh cường độ dòng điện tương ứng chạy qua bóng, cuối cùng sẽ chiếu sáng như mong muốn. Ngay cả con người cũng có thể coi là một hệ thống, nhận tín hiệu vào qua các giác quan, và thực hiện các chức năng tương ứng, đồng thời cũng xuất các tín hiệu ra qua ánh mắt, ngôn ngữ, cử chỉ, hành động. 

Định nghĩa 1.6. Hệ thống là một thực thể làm thay đổi tín hiệu để thực hiện một chức năng nào đó, và trong quá trình đó tạo ra tín hiệu mới. 

Từ định nghĩa 1.6, chúng ta có thể thấy: 

Một hệ thống luôn có tín hiệu đầu vào (còn gọi là kích thích) và tín hiệu đầu ra (còn gọi là đáp ứng). Mối quan hệ này được thể hiện trong hình 1.20. Trên thực tế, một hệ thống có thể có nhiều đầu vào và nhiều đầu ra. Tuy nhiên, tài liệu này chỉ nghiên cứu về trường hợp đơn giản nhất: hệ thống có một đầu vào và một đầu ra. 

Hệ thống làm thay đổi tín hiệu, để thực hiện một chức năng nào đó. 

Thuật toán xử lý tín hiệu là tập hợp các quy tắc, cách ghép nối, vận hành để hệ thống thực hiện đúng chức năng của nó. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/92349e7e309fa2b68d0d5eb74e7e91080586de17182623a44a60f84d946992b6.jpg)



Hình 1.20. Quan hệ giữa tín hiệu và hệ thống


Hệ thống T có thể minh họa như một ánh xạ hay một phép biến đổi như sau 

$$
x (t) \stackrel {T} {\longrightarrow} y (t), \quad x [ n ] \stackrel {T} {\longrightarrow} y [ n ]\tag{1.17}
$$

Hệ thống được phân loại tùy theo tín hiệu ở đầu vào và đầu ra của nó (xem hình 1.21). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/19690a78cccee574d70baef7afdf1ec3dae214adf3ed5490872aac5f597cd108.jpg)



Hình 1.21. Hệ thống liên tục và rời rạc theo thời gian


## 1.7. Ghép nối hệ thống

Các hệ thống có thể ghép nối với nhau thành một hệ thống mới, phức tạp hơn. Hình 1.22 minh họa ba cách ghép nối cơ bản: nối tiếp, song song và hồi tiếp. Trong các chương sau, chúng ta sẽ phân tích xem các đặc trưng của hệ thống thay đổi như thế nào sau khi được ghép nối với nhau. 

## 1.8. Các thuộc tính của hệ thống

Một hệ thống T có thể có các thuộc tính cơ bản như ổn định, không có nhớ, nhân quả, bất biến theo thời gian, tuyến tính và khả nghịch. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/8fb8bf18eb758b86b3511ea239b1dfecdba1c613381e0315e5ad21a9745b72b6.jpg)



(a) Nối tiếp


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b85df381ba916e19af5810953f1aed73a3ef6f9dd97a32f64d1decc07150950b.jpg)



(b) Song song


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/99579287e81d1700c08b6f5aefd4d79dce81e0be5ac9ab0879b993d8f1173578.jpg)



(c) Hồi tiếp



Hình 1.22. Các cách ghép nối hệ thống


## 1.8.1. Tính ổn định

Định nghĩa 1.7. Một hệ thống T là ổn định (BIBO stable) nếu mọi đầu vào bị chặn, tức là tồn tại hằng số $B _ { x }$ sao cho 

$$
| x (t) | \leq B _ {x} <   \infty , \quad \forall t
$$

đều khiến cho đầu ra tương ứng bị chặn, tức là tồn tại hằng số $B _ { y }$ sao cho 

$$
| y (t) | \leq B _ {y} <   \infty , \quad \forall t
$$

Định nghĩa tương tự cho hệ thống rời rạc với $x [ n ]$ , y[n] và n. 

Tính ổn định là một thuộc tính quan trọng, phải được đảm bảo khi thiết kế chế tạo hệ thống trên thực tế. Hệ thống không ổn định thường sẽ gây ra hỏng hóc hoặc hoạt động không đúng chức năng ban đầu của nó. 

Ví dụ 1.8. Xét tính ổn định của hệ thống 

$$
y [ n ] = r ^ {n} x [ n ]
$$

với $| r | > 1 .$ 

Lời giải. Chọn đầu vào $x [ n ] = u [ n ]$ . Khi đó, 

$$
\lim _ {n \to \infty} | y [ n ] | = \lim _ {n \to \infty} | r | ^ {n} = \infty
$$

Như vậy, đầu vào bị chặn (do chỉ nhận hai giá trị 0 hoặc 1), đầu ra lại không bị chặn. Do vậy hệ thống này không ổn định.  

## 1.8.2. Thuộc tính nhớ

Định nghĩa 1.8. Thuộc tính nhớ của hệ thống được định nghĩa như sau. 

Hệ thống gọi là không có nhớ (memoryless) nếu đầu ra chỉ phụ thuộc vào đầu vào ở thời điểm hiện tại. 

Hệ thống gọi là có nhớ nếu đầu ra phụ thuộc vào đầu vào ở thời điểm quá khứ hoặc tương lai. 

Ví dụ 1.9. Xét thuộc tính nhớ của các hệ thống 

(a) $y [ n ] = x [ n ] - x [ n - 1 ] + 2 x [ n + 2 ]$ 

(b) $\begin{array} { r } { i ( t ) = \frac { 1 } { R } v ( t ) } \end{array}$ 

Lời giải. Dễ thấy trong ví dụ (a), đầu ra y[n] phụ thuộc đầu vào x[n] cùng thời điểm hiện tại, đầu vào $x [ n - 1 ] \ ,$ ở quá khứ và đầu vào $x [ n + 2 ] \mathrm { ~ \ i ~ { ~ \ - ~ } ~ }$ tương lai. Hệ thống (a) này có nhớ. Trong ví dụ (b), cường độ dòng điện i(t) chỉ phụ thuộc vào điện áp v(t) giữa hai đầu điện trở ở cùng thời điểm nên hệ thống (b) không có nhớ.  

## 1.8.3. Tính nhân quả

Định nghĩa 1.9. Hệ thống gọi là nhân quả (causal) nếu như đầu ra tại thời điểm n bất kỳ chỉ phụ thuộc đầu vào thời điểm hiện tại hoặc quá khứ. 

$$
y [ n ] = F [ x [ n ], x [ n - 1 ], x [ n - 2 ], \ldots ]
$$

Tương tự, hệ thống liên tục là nhân quả nếu đầu ra $y ( t )$ tại thời điểm t bất kỳ chỉ phụ thuộc vào các giá trị $x ( \tau )$ với $\tau \leq t$ 

Ví dụ 1.10. Xét tính nhân quả của các hệ thống 

(a) $y [ n ] = x [ n ] - x [ n - 1 ] + 2 x [ n + 2 ]$ 

(b) $\begin{array} { r } { i ( t ) = \frac { 1 } { L } \int _ { - \infty } ^ { t } v ( \tau ) d \tau } \end{array}$ 

Lời giải. Trong ví dụ (a), đầu ra $y [ n ]$ có phụ thuộc đầu vào $x [ n + 2 ]$ ở tương lai nên hệ thống này không nhân quả. Trong ví dụ (b), cường độ dòng điện i(t) qua cuộn cảm L chỉ phụ thuộc điện áp v(t) từ quá khứ cho đến đúng thời điểm t nên hệ thống này là nhân quả. Ngay cả khi không biết phương trình (b) chúng ta cũng có thể kết luận mối quan hệ giữa $i ( t )$ và $v ( t )$ trên cuộn cảm là nhân quả, bởi vì các hệ thống vật lý hoạt động theo thời gian thực đều nhân quả: đầu ra không thể phụ thuộc vào đầu vào chưa xảy ra.  

## 1.8.4. Bất biến theo thời gian

Định nghĩa 1.10. Một hệ thống T bất biến theo thời gian khi và chỉ khi 

$$
x [ n ] \stackrel {T} {\longrightarrow} y [ n ] \quad \mathrm{thi} \quad x [ n - n _ {0} ] \stackrel {T} {\longrightarrow} y [ n - n _ {0} ] \quad \forall n
$$

với mọi đầu vào x[n] và với mọi khoảng dịch thời gian $n _ { 0 }$ . Tương tự, hệ thống liên tục bất biến theo thời gian khi và chỉ khi $x ( t ) \ { \overset { T } { \to } } y ( t )$ thì $x ( t - t _ { 0 } ) \overset { T } { \longrightarrow } y ( t - t _ { 0 } )$ , với mọi đầu vào $x ( t )$ và mọi $t _ { 0 } .$ . 

Ví dụ 1.11. Hệ thống sau có bất biến theo thời gian không? 

$$
y [ n ] = n x [ n ]
$$

Lời giải. Chọn đầu vào $x _ { 1 } [ n ] \ = \ \delta [ n ]$ , khi đó đầu ra là $y _ { 1 } [ n ] = n \delta [ n ] = 0$ với mọi n. Dịch đầu vào đi một mẫu, $x _ { 2 } [ n ] = x _ { 1 } [ n - 1 ] = \delta [ n - 1 ]$ , khi đó đầu ra là $y _ { 2 } [ n ] = n \delta [ n - 1 ] = \delta [ n - 1 ]$ . Ta thấy $y _ { 2 } [ n ] \neq y _ { 1 } [ n - 1 ] = 0 .$ tức là khi dịch đầu vào thì đầu ra không dịch tương ứng. Như $\mathrm { v } \mathrm { \hat { a } \mathrm { y } }$ , hệ thống này không bất biến theo thời gian, còn gọi là thay đổi theo thời gian.  

Đôi khi người ta hay nhầm lẫn giữa hai khái niệm ổn định và bất biến theo thời gian. Bạn đọc hãy tự phân biệt hai khái niệm này qua các ví dụ thực tế. 

## 1.8.5. Tuyến tính

Định nghĩa 1.11. Hệ thống T gọi là tuyến tính khi và chỉ khi 

$$
T \{a _ {1} x _ {1} [ n ] + a _ {2} x _ {2} [ n ] \} = a _ {1} T \{x _ {1} [ n ] \} + a _ {2} T \{x _ {2} [ n ] \}
$$

với mọi đầu vào $x _ { 1 } [ n ] , x _ { 2 } [ n ]$ và với mọi hằng số $a _ { 1 } , a _ { 2 }$ . Định nghĩa tương tự cho hệ thống liên tục với các đầu vào $x _ { 1 } ( t ) , x _ { 2 } ( t )$ 

Ví dụ 1.12. Các hệ thống sau có tuyến tính không? 

(a) $y ( t ) = t x ( t )$ 

(b) $y ( t ) = x ^ { 2 } ( t )$ 

Lời giải. Dễ thấy hệ thống (a) là tuyến tính, còn hệ thống (b) không tuyến tính (còn gọi là phi tuyến).  

Python. Có thể thử định nghĩa tuyến tính bằng số: chọn ngẫu nhiên hai đầu vào (hàm np.random.randn) và hai hằng số, rồi so sánh hai vế. Với hệ thống $( \mathrm { b } ) , \ \dot { y } \ = \ x ^ { 2 } .$ , kết quả là False; thay dòng thứ hai bằng hệ thống (a), ví dụ $\mathrm { ~ T ~ } = \mathrm { ~ 1 ~ }$ ambda x: np.arange $( 1 0 0 ) * \mathbf { x } .$ , kết quả là True. Lưu ý: phép thử bằng số chỉ chứng minh được hệ thống không tuyến tính (khi tìm được phản ví dụ); kết quả True chưa phải là chứng minh hệ thống tuyến tính. 

```python
import numpy as np
T = lambda x: x**2
x1, x2 = np.random.randn(2, 100)
print(np.allclose(T(2*x1 + 3*x2), 2*T(x1) + 3*T(x2))) 
```

## 1.8.6. Tính khả nghịch

Định nghĩa 1.12. Một hệ thống gọi là khả nghịch nếu như có thể khôi phục được đầu vào từ đầu ra của nó (xem hình 1.23, khi đó hệ thống $T ^ { - 1 }$ được gọi là nghịch đảo của hệ thống T). 

Nếu coi hệ thống như một ánh xạ thì ta có dấu hiệu khả nghịch của hệ thống: các đầu vào phân biệt sẽ có các đầu ra phân biệt. 

Ví dụ 1.13. Các hệ thống sau có khả nghịch không, nếu có, tìm hệ thống nghịch đảo 

(a) $\begin{array} { r } { y [ n ] = \sum _ { k = - \infty } ^ { n } x [ k ] } \end{array}$ 

(b) $y ( t ) = x ^ { 2 } ( t )$ 

Lời giải. Trong ví dụ (a), với các đầu vào làm cho tổng hội tụ, ta có 

$$
y [ n ] - y [ n - 1 ] = \sum_ {k = - \infty} ^ {n} x [ k ] - \sum_ {k = - \infty} ^ {n - 1} x [ k ] = x [ n ]
$$

Như vậy có thể khôi phục x[n] từ $y [ n ]$ , hệ thống (a) khả nghịch và hệ thống nghịch đảo là $w [ n ] = y [ n ] - y [ n - 1 ]$ 

Ta thấy trong ví dụ (b), hai đầu vào khác nhau x(t) và $- x ( t )$ (với $x ( t ) \not \equiv 0 )$ nhưng lại cho cùng một đầu ra. Do vậy hệ thống này không khả nghịch.  

## Tóm tắt chương

Tín hiệu là một hàm của một hay nhiều biến độc lập, mang thông tin về một hiện tượng nào đó. Sách này xét tín hiệu một chiều, một kênh và xác định, gồm tín hiệu liên tục x(t) và tín hiệu rời rạc x[n]. 

Năng lượng $E _ { x }$ và công suất trung bình $P _ { x }$ được dùng $\mathrm { d } \acute { \mathrm { e } }$ phân loại tín hiệu: tín hiệu năng lượng $( E _ { x } < \infty )$ có $P _ { x } = 0 ;$ tín hiệu công suất $( 0 < P _ { x } < \infty )$ có $E _ { x } = \infty$ 

Các phép toán trên biến thời gian gồm dịch, đảo thời gian và co giãn. Với tín hiệu rời rạc, khoảng dịch và hệ số co phải là số nguyên, và phép co làm mất mẫu. 

Các tín hiệu cơ bản gồm tín hiệu hàm mũ, hình sin, hàm nhảy đơn $\mathrm { v i . }$ , hàm xung đơn vị và hàm dốc đơn $\mathrm { v i . }$ . Tín hiệu rời rạc cos(ω<sub>0</sub>n) chỉ tuần hoàn khi $\omega _ { 0 } / ( 2 \pi )$ là số hữu tỷ, và hai tần số $\omega _ { 0 } , \omega _ { 0 } + 2 \pi k$ cho cùng một tín hiệu. 

Mọi tín hiệu rời rạc $x [ n ]$ đều biểu diễn được qua xung đơn vị theo công thức (1.10). Với tín hiệu liên tục, tính chất lấy mẫu (1.14) của hàm xung đơn vị đúng khi x(t) liên tục tại $t _ { 0 }$ . 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/e076fe300944a233a2df73d684b3fe9f3d35b19799c72c5df513e72ea9063831.jpg)



Hình 1.23. Nghịch đảo một hệ thống


Hệ thống là một ánh xạ từ tín hiệu vào tới tín hiệu ra. Các hệ thống có thể được ghép nối tiếp, song song hoặc hồi tiếp. 

Các thuộc tính cơ bản của hệ thống gồm: ổn định BIBO, không có nhớ, nhân quả, bất biến theo thời gian, tuyến tính và khả nghịch. Để chứng minh một hệ thống không có một thuộc tính nào đó, chỉ cần chỉ ra một phản ví dụ, chẳng hạn cặp đầu vào $\delta [ n ]$ và $\delta [ n - 1 ]$ với hệ thống $y [ n ] = n x [ n ]$ 

## Bài tập

1. Phân tích các thuộc tính nhân quả, ổn định, tuyến tính và bất biến theo thời gian của các hệ thống (liên tục hoặc rời rạc) được cho bởi mối quan hệ giữa đầu vào và đầu ra như sau 

(a) $y [ n ] = x [ n - 2 ] \sin ( \pi n / 5 )$ 

(b) $y [ n ] = x [ 2 n - 2 ]$ 

(c) $y ( t ) = \cos ( x ( - t ) )$ 

(d) $\begin{array} { r } { y ( t ) = \frac { d } { d t } \{ e ^ { - t } x ( t ) \} } \end{array}$ 

(e) $\begin{array} { r } { y ( t ) = \int _ { - \infty } ^ { t / 2 } x ( \tau ) d \tau } \end{array}$ 

(f) $\begin{array} { r } { y [ n ] = \sum _ { k = - \infty } ^ { n } x [ k + 2 ] } \end{array}$ 

(g) $y [ n ] = x [ n ] \cos ( \pi n / 5 )$ 

(h) $y [ n ] = 2 x [ n ^ { 2 } ]$ 

(i) $y ( t ) = 2 x ( t - 3 ) + x ( 3 - t )$ 

(j) $y ( t ) = [ 2 x ( t ) + x ( t - 1 ) ] u ( t )$ 

(k) $y [ n ] = - x [ - 3 n + 1 ]$ 

2. Tính công suất trung bình của các tín hiệu sau 

(a) x(t) = 0.5 sin(5πt  π/2) + 1.5j sin(10πt + π/2) 

(b) x(t) =  cos(2πt)  2j sin(5πt  π/3) 

(c) x(t) = cos(10πt + π/2)  3j sin(10πt) 

3. Cho tín hiệu $x [ n ] = \{ 1 , 0 . 5 , - 2 , 0 , 3 , - 1 \}$ như trong (1.3). 

(a) Tìm và vẽ các tín hiệu $x [ n - 2 ] , x [ - n + 1 ]$ và $x [ 2 n ]$ 

(b) Phân tích x[n] thành tổng của thành phần chẵn $x _ { e } [ n ]$ và thành phần lẻ $x _ { o } [ n ]$ 

4. Các tín hiệu sau có tuần hoàn không? Nếu có, hãy tìm chu kỳ cơ bản. 

(a) $x [ n ] = \cos ( 0 . 3 \pi n )$ 

(b) $x [ n ] = \cos ( n / 4 )$ 

(c) $x ( t ) = \cos ( 2 \pi t / 3 ) + \sin ( \pi t / 2 )$ 

5. Tính năng lượng và công suất trung bình của các tín hiệu sau, từ đó cho biết mỗi tín hiệu là tín hiệu năng lượng hay tín hiệu công suất. 

(a) $x [ n ] = ( 0 . 5 ) ^ { n } u [ n ]$ 

(b) $x [ n ] = u [ n ]$ 

(c) $x ( t ) = e ^ { - 2 t } u ( t )$ 

(d) $x ( t ) = u ( t )$ 

(e) $x ( t ) = 3 e ^ { j ( 5 t + \pi / 4 ) }$ 

(f) $x [ n ] = \cos ( \pi n / 4 )$ . Gợi ${ \acute { \mathrm { y } } } { \mathrm { : } }$ với tín hiệu tuần hoàn chu kỳ $N _ { ; }$ , công suất trung bình bằng trung bình của $| x [ n ] | ^ { 2 }$ trên một chu kỳ. 

(g) $x [ n ] = ( - 0 . 8 ) ^ { | n \| }$ | 

(h) $x ( t ) = r ( t )$ , với r(t) là hàm dốc đơn vị 

(i) $r ( t ) = t ^ { - 1 / 2 } u ( t - 1 )$ . Gợi ý: tính $\int _ { - T } ^ { T } | x ( t ) | ^ { 2 } d t$ với $T > 1$ , rồi xét giới hạn khi $T \to \infty$ của tích phân này và của tích phân chia cho 2T. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/6848069e0a55422533f498b653c0c4434286be0753572dfeb158e599df31c6bc.jpg)



Hình 1.24. Tín hiệu x(t) trong bài tập 6


6. Cho tín hiệu liên tục x(t) gồm một xung tam giác và một xung chữ nhật như trong hình 1.24. Hãy vẽ các tín hiệu sau (không cần xét giá trị tại các điểm gián đoạn). 

(a) $x ( t - 1 )$ 

(b) $x ( - t )$ 

(c) $x ( 2 t )$ 

(d) $x ( 2 - t )$ 

7. Cho tín hiệu liên tục 

$$
x (t) = r (t + 1) - r (t - 1) - 2 u (t - 2)
$$

trong đó r(t) là hàm dốc đơn vị và $u ( t )$ là hàm nhảy đơn vị. 

(a) Viết x(t) dưới dạng hàm cho theo từng khoảng và vẽ $x ( t )$ 

(b) Vẽ $y _ { 1 } ( t ) = x ( 1 - t / 2 )$ . Gợi ý: ánh xạ các điểm đặc biệt như trong ví dụ 1.3. 

(c) Vẽ $\begin{array} { r } { y _ { 2 } ( t ) = 1 - \frac { 1 } { 2 } x ( 2 t - 1 ) } \end{array}$ 

(d) Vẽ $y _ { 3 } ( t ) = x ( t ) + x ( - t )$ và thành phần lẻ $x _ { o } ( t )$ của $x ( t )$ 

(e) Tìm và vẽ đạo hàm $\begin{array} { r } { \frac { d } { d t } x ( t ) } \end{array}$ 

(f) Tính $\textstyle \int _ { - \infty } ^ { \infty } x ( t ) \delta ( t - 1 / 2 )$ dt. Có thể dùng tính chất lấy mẫu (1.14) để tính $\textstyle \int _ { - \infty } ^ { \infty } x ( t ) \delta ( t - 2 ) d t \mathrm { k h } \hat { \mathrm { o n g } } ?$ Vì sao? 

(g) Tính năng lượng $E _ { x }$ và $E _ { y _ { 1 } }$ . Nhận xét. 

8. Cho các hệ thống liên tục $T _ { 1 } : y ( t ) = x ( t - 2 ) ; T _ { 2 } : y ( t ) = x ( 2 t ) ; T _ { 3 } : y ( t ) =$ $x ( - t ) ; T _ { 4 } : y ( t ) = x ^ { 2 } ( t ) ; T _ { 5 } : y ( t ) = 2 x ( t ) + 1$ 

(a) Tìm quan hệ vào ra của hệ thống ghép nối tiếp trong hình 1.25(a) khi $T _ { i } = T _ { 1 } , T _ { k } = T _ { 2 } $ , và khi đổi thứ tự $T _ { i } = T _ { 2 } , T _ { k } = T _ { 1 }$ 

(b) Làm tương tự câu (a) với cặp $T _ { 1 } , T _ { 3 } ;$ cặp T<sub>4</sub>, T<sub>5</sub>; cặp T<sub>1</sub>, T<sub>4</sub> (mỗi cặp xét cả hai thứ tự). 

(c) Tìm quan hệ vào ra của hệ thống trong hình 1.25(b), và tìm đầu ra khi $x ( t ) = \delta ( t )$ 

(d) Thay các khối trong hình 1.25(a) bằng hai hệ thống rời rạc $S _ { 1 } : y [ n ] =$ $x [ n - 1 ]$ và $S _ { 2 } : y [ n ] = n x [ n ]$ (đầu vào $x [ n ]$ , đầu ra $y [ n ] )$ . Tìm quan hệ vào ra khi ghép $S _ { 1 }$ rồi $S _ { 2 }$ , và khi ghép $S _ { 2 }$ rồi $S _ { 1 }$ . 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/f77daa430646a3127f7b82c7dfebf401be271f761e123b84b3a7fd313561bc89.jpg)



(a) Ghép nối tiếp T<sub>i</sub> rồi $T _ { k }$


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/006321f39700e1b4daceb80bd682b0806ab1f0668a23060820ad09a65e94280b.jpg)



(b) Ghép song song T<sub>1</sub>, T<sub>2</sub> rồi nối tiếp với $T _ { 3 }$



Hình 1.25. Sơ đồ ghép nối hệ thống trong bài tập 8


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/ac43cdf5be4993a1d07b2e302a2d8374a1d0d15a90ada14863e6dce0df3ca817.jpg)



Hình 1.26. Hệ thống ghép hồi tiếp trong bài tập 9


9. Cho hệ thống rời rạc ghép hồi tiếp như trong hình 1.26, trong đó khối “trễ 1 mẫu” là hệ thống có quan hệ vào ra $y [ n ] = x [ n - 1 ]$ và a là hằng số. 

(a) Từ sơ đồ, viết phương trình quan hệ giữa đầu vào x[n] và đầu ra y[n] của cả hệ thống. 

(b) Giả thiết $y [ n ] = 0$ với $n < 0$ . Tính $y [ 0 ] , y [ 1 ] , y [ 2 ] , y [ 3 ]$ rồi tìm biểu thức tổng quát của $y [ n ]$ khi $x [ n ] = \delta [ n ]$ , và khi $x [ n ] = u [ n ]$ 

(c) Với giá trị nào của a thì đầu ra ứng với $x [ n ] = \delta [ n ]$ bị chặn? Từ đó kết luận gì về tính ổn định của hệ thống khi $| a | > 1 ?$ 

10. Xác định xem các hệ thống dưới đây có khả nghịch không. Nếu có thì tìm hệ thống nghịch đảo, nếu không thì tìm hai đầu vào khác nhau cho cùng một đầu ra. Trong câu (b) giả thiết tín hiệu nhận giá trị thực. 

(a) $y ( t ) = 3 x ( t ) + 2$ 

(b) $y ( t ) = x ^ { 3 } ( t )$ 

(c) $y ( t ) = | x ( t ) |$ 

(d) $\begin{array} { r } { y ( t ) = \frac { d } { d t } x ( t ) + x ( t ) } \end{array}$ 

(e) $y ( t ) = x ( - 2 t + 3 )$ 

(f) $y ( t ) = 2 x ( t - 1 ) + 1$ 

(g) $y ( t ) = x ( t ) u ( t )$ 

(h) $y ( t ) = x ( t ) + x ( t - T _ { 0 } )$ , với $T _ { 0 } > 0$ 

(i) $y [ n ] = x [ n ] - x [ n - 1 ]$ . Kết luận có thay đổi không nếu chỉ xét các đầu vào $\begin{array} { r } { \operatorname { t h i o a } \operatorname* { m i n } \operatorname* { l i m } _ { n  - \infty } x [ n ] = 0 ? } \end{array}$ 

(j) $y [ n ] = ( - 1 ) ^ { n } x [ n ]$ (k) $\begin{array} { l } { { y [ n ] = x [ n ] \cos ( \pi n / 2 ) } } \\ { { y [ n ] = 2 ^ { n } x [ n ] } } \end{array}$ (l) 

11. Cho tín hiệu năng lượng x(t) và $y ( t ) = A x ( a t - b )$ , trong đó A, a, b là các hằng số thực, $a \neq 0 .$ . Chứng minh rằng $E _ { y } = | A | ^ { 2 } E _ { x } / | a |$ . Áp dụng để kiểm tra lại kết quả $E _ { y _ { 1 } }$ trong bài 7. 

12. Tính năng lượng của các xung sau (dạng xung vẽ trong hình 1.27), với A là hằng số thực và $T , a , \sigma$ là các hằng số dương. Gợi ý: có thể tính cho trường hợp $A = 1$ và $T = 1$ (hoặc $\sigma = 1 )$ rồi áp dụng bài 11; dùng các tích phân $\textstyle \int _ { - \infty } ^ { \infty } e ^ { - v ^ { 2 } } d v = { \sqrt { \pi } }$ và $\textstyle \int _ { - \infty } ^ { \infty } v ^ { 2 } e ^ { - v ^ { 2 } } d v = { \sqrt { \pi } } / 2$ (tích phân từng phần). 

(a) Xung chữ nhật: $x ( t ) = A$ khi t < T /2, x(t) = 0 khi $\vert t \vert > T / 2$ 

(b) Xung tam giác: $x ( t ) = A ( 1 - | t | / T )$ khi $| t | \leq T , x ( t ) = 0$ khi $| t | > T$ 

(c) Xung nửa chu kỳ cos: $x ( t ) = A \cos ( \pi t / T )$ khi $| t | \le T / 2 , x ( t ) = 0$ khi $\vert t \vert > T / 2$ 

(d) Xung cos nâng có độ dài hữu hạn: $\begin{array} { r } { x ( t ) = \frac { A } { 2 } \left[ 1 + \cos ( 2 \pi t / T ) \right] } \end{array}$ khi $\vert t \vert \le T / 2$ $x ( t ) = 0$ khi $\vert t \vert > T / 2$ 

(e) Xung hàm mũ một phía: $x ( t ) = A e ^ { - a t } u ( t )$ 

(f) Xung Gauss: $x ( t ) = A e ^ { - t ^ { 2 } / ( 2 \sigma ^ { 2 } ) }$ 

(g) Đạo hàm bậc một của xung Gauss: 

$$
x (t) = \frac {d}{d t} \left[ A e ^ {- t ^ {2} / (2 \sigma^ {2})} \right] = - \frac {A t}{\sigma^ {2}} e ^ {- t ^ {2} / (2 \sigma^ {2})}
$$

So sánh với câu (f): năng lượng thay đổi thế nào khi σ giảm? 

13. Các kết quả dưới đây được liệt kê để tra cứu (A thực, $T > 0 , \sigma > 0 )$ . Ba kết quả đầu có thể chứng minh bằng quan hệ Parseval ở chương 3; ở chương này, hãy kiểm tra chúng bằng cách tính tích phân số trên Python cho một vài giá trị của tham số. 

(a) Xung sinc: $x ( t ) = A \mathrm { s i n c } ( t / T )$ , trong đó sin $\begin{array} { r } { \mathbf { \Phi } : ( t ) : = \frac { \sin ( \pi t ) } { \pi t } } \end{array}$ và $\mathrm { s i n c } ( 0 ) = 1$ Năng lượng: $E _ { x } = A ^ { 2 } T$ 

(b) Xung $\mathrm { s i n c } ^ { 2 } \colon x ( t ) = A \mathrm { s i n c } ^ { 2 } ( t / T )$ ). Năng lượng: $\textstyle E _ { x } = { \frac { 2 } { 3 } } A ^ { 2 } T$ 

(c) Xung cos nâng (raised cosine) dùng trong thông tin số (chương 7), với tham số $0 \leq \beta \leq 1$ : 

$$
x (t) = A \operatorname{sinc} \left(\frac {t}{T}\right) \frac {\cos (\pi \beta t / T)}{1 - (2 \beta t / T) ^ {2}}
$$

(khi $\beta > 0$ , tại $t = \pm T / ( 2 \beta )$ mẫu số bằng 0 và x(t) lấy giá trị giới hạn $\textstyle { \frac { \pi A } { 4 } }$ sinc $\begin{array} { r } { \left( \frac { 1 } { 2 \beta } \right) ) } \end{array}$ . Năng lượng: $\begin{array} { r } { E _ { x } = A ^ { 2 } T \left( 1 - \frac { \beta } { 4 } \right) } \end{array}$ . Khi $\beta = 0$ ta có lại kết quả của câu (a). Lưu $\acute { \mathrm { y } }$ xung này khác với xung cos nâng có độ dài hữu hạn ở bài 12. 

(d) Đạo hàm bậc hai của xung Gauss: 

$$
x (t) = \frac {d ^ {2}}{d t ^ {2}} \left[ A e ^ {- t ^ {2} / (2 \sigma^ {2})} \right] = \frac {A}{\sigma^ {2}} \left(\frac {t ^ {2}}{\sigma^ {2}} - 1\right) e ^ {- t ^ {2} / (2 \sigma^ {2})}
$$

Năng lượng: $\begin{array} { r } { E _ { x } = \frac { 3 \sqrt { \pi } A ^ { 2 } } { 4 \sigma ^ { 3 } } } \end{array}$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/8d4f7a9026655b51c4b26bedd4c941fcc4c065c5f42296da5ce18781798835ed.jpg)



(a) Xung tam giác


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/5289c13f7e18e0a5696e7c8c7659560bb48dbe92856d9cc4e01a64599c51fa39.jpg)



(b) Xung nửa chu kỳ cos


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/ed9306d0426bebe7cea0fc9703b8e38a62c41621d2c887c99ba36586d8c79fd1.jpg)



(c) Xung cos nâng có độ dài hữu hạn


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/ef6fc5f48fc79c91d3f78296640f4629f0a07b32e8c83354a2c9937048738927.jpg)



(d) Xung hàm mũ một phía


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1fed0e0850d6d9c50163818f7602849a39d6c849bbffa99fccd432bbf1f8f787.jpg)



(e) Xung Gauss


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/35f530f45e0bb5bf3982055ecf3c7f75b8d40ee3cd060a78e70f874f1683078e.jpg)



(f) Đạo hàm bậc một của xung Gauss


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/0886ba998083a147fe03c1c2460b9fec4e66c30d4878126f51875e89ceb6bf26.jpg)



(g) Xung sinc


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/706adf59750072d05edf65e65b67edf2e45289426248cbf86908d36086457f3e.jpg)



(h) Xung sinc<sup>2</sup>


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/bd3f9549e3c5faf1f35465c3e1dff2361c033544f5d609612b3bd278f207dcde.jpg)



(i) Xung cos nâng (Nyquist)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/ac8906fbc8093f9f9be90bca9009db60faf3363323208d57d5687406dddd5aca.jpg)



(j) Đạo hàm bậc hai của xung Gauss



Hình 1.27. Dạng của các xung trong bài tập 12 và 13, vẽ với A = 1, T = 1, $a = 1 , \sigma = 1$


## Đáp số bài tập

Bài 1 (có: hệ thống có thuộc tính tương ứng; không: không có): 

<table><tr><td>Câu</td><td>Nhân quả</td><td>Ốn định</td><td>Tuyến tính</td><td>Bất biến</td><td>Ghi chú</td></tr><tr><td>(a)</td><td>có</td><td>có</td><td>có</td><td>không</td><td></td></tr><tr><td>(b)</td><td>không</td><td>có</td><td>có</td><td>không</td><td><eq>y[3]</eq> cần <eq>x[4]</eq></td></tr><tr><td>(c)</td><td>không</td><td>có</td><td>không</td><td>không</td><td><eq>|y(t)| \leq 1</eq></td></tr><tr><td>(d)</td><td>có*</td><td>không</td><td>có</td><td>không</td><td><eq>x = 1 \Rightarrow y = -e^{-t}</eq></td></tr><tr><td>(e)</td><td>không</td><td>không</td><td>có</td><td>không</td><td><eq>x = u(t)</eq></td></tr><tr><td>(f)</td><td>không</td><td>không</td><td>có</td><td>có</td><td><eq>x = u[n]</eq></td></tr><tr><td>(g)</td><td>có</td><td>có</td><td>có</td><td>không</td><td></td></tr><tr><td>(h)</td><td>không</td><td>có</td><td>có</td><td>không</td><td><eq>y[2]</eq> cần <eq>x[4]</eq></td></tr><tr><td>(i)</td><td>không</td><td>có</td><td>có</td><td>không</td><td><eq>y(0)</eq> cần <eq>x(3)</eq></td></tr><tr><td>(j)</td><td>có</td><td>có</td><td>có</td><td>không</td><td></td></tr><tr><td>(k)</td><td>không</td><td>có</td><td>có</td><td>không</td><td><eq>y[-1]</eq> cần <eq>x[4]</eq></td></tr></table>

∗ Theo quy ước coi đạo hàm tại thời điểm t chỉ phụ thuộc vào lân cận vô cùng nhỏ của t. 

• <sup>Bài</sup> <sup>2:</sup> <sup>(a)</sup> $P _ { x } = 1 . 2 5 ;$ ; (b) $P _ { x } = 2 . 5 ;$ (c) $P _ { x } = 5$ 

Bài 3: 

$$
\text { a) } \quad x [ n - 2 ] = \{1, 0. 5, - 2, 0, 3, - 1 \}
$$

$$
x [ - n + 1 ] = \{- 1, 3, \underset {\uparrow} {0}, - 2, 0. 5, 1 \}
$$

$$
x [ 2 n ] = \{1, - 2, 3 \}
$$

$$
\text {(b)} \quad x _ {e} [ n ] = \{- 0. 5, 2, 0. 2 5, \underset {\uparrow} {- 2}, 0. 2 5, 2, - 0. 5 \}
$$

$$
x _ {o} [ n ] = \{0. 5, - 1, 0. 2 5, \underset {\uparrow} {0}, - 0. 2 5, 1, - 0. 5 \}
$$

Bài 4: (a) tuần hoàn, N = 20; (b) không tuần hoàn; (c) tuần hoàn, $T = 1 2 .$ 

Bài 5: (a) $E _ { x } = 4 / 3 , P _ { x } = 0$ , tín hiệu năng lượng; (b) $E _ { x } = \infty , P _ { x } = 1 / 2$ tín hiệu công suất; (c) $E _ { x } = 1 / 4 , P _ { x } = 0$ , tín hiệu năng lượng; $\mathrm { ( d ) } \ E _ { x } = \infty .$ $P _ { x } = 1 / 2$ , tín hiệu công suất; $( \mathrm { e } ) | x ( t ) | = 3$ với mọi t nên $E _ { x } = \infty , P _ { x } = 9$ , tín hiệu công suất; (f) chu kỳ $N = 8 , E _ { x } = \infty , P _ { x } = 1 / 2$ , tín hiệu công suất; (g) $\begin{array} { r } { E _ { x } = 1 + 2 \sum _ { n = 1 } ^ { \infty } ( 0 . 6 4 ) ^ { n } = 4 1 / 9 , P _ { x } = 0 } \end{array}$ , tín hiệu năng lượng; (h) $E _ { x } = \infty ,$ $P _ { x } = \infty$ , không thuộc loại nào; (i) $\begin{array} { r } { \int _ { - T } ^ { T } | x ( t ) | ^ { 2 } d t = \int _ { 1 } ^ { T } \frac { d t } { t } = \ln T } \end{array}$ nên $E _ { x } = \infty$ và $\begin{array} { r } { P _ { x } = \operatorname* { l i m } _ { T \to \infty } \frac { \ln T } { 2 T } = 0 } \end{array}$ , không thuộc loại nào (khác với câu (h), ở đây $P _ { x } = 0 )$ 

Bài 6: các tín hiệu đều gồm một xung tam giác cao 2 và một xung chữ nhật cao 1. (a) Tam giác trên đoạn [ 1, 1], đỉnh tại $t = 0 ;$ chữ nhật trên khoảng (2, 4). (b) Tam giác trên đoạn [0, 2], đỉnh tại $t = 1$ ; chữ nhật trên khoảng ( 3, 1). (c) Tam giác trên đoạn [ 1, 0], đỉnh tại $t = - 1 / 2 ;$ chữ nhật trên khoảng $( 1 / 2 , 3 / 2 )$ . (d) Tam giác trên đoạn [2, 4], đỉnh tại $t = 3 ;$ chữ nhật trên khoảng ( 1, 1). 

Bài 7: 

(a) 

$$
x (t) = \left\{ \begin{array}{l l} t + 1, & - 1 \leq t \leq 1 \\ 2, & 1 <   t <   2 \\ 0, & t <   - 1 \text {   hoặc   } t \geq 2 \end{array} \right.\tag{b}
$$

$$
y _ {1} (t) = \left\{ \begin{array}{l l} 2, & - 2 <   t <   0 \\ 2 - t / 2, & 0 \leq t \leq 4 \\ 0, & t \leq - 2 \text { hoăc } t > 4 \end{array} \right.\tag{c}
$$

$$
y _ {2} (t) = \left\{ \begin{array}{l l} 1 - t, & 0 \leq t \leq 1 \\ 0, & 1 <   t <   3 / 2 \\ 1, & t <   0 \text {   hoặc   } t \geq 3 / 2 \end{array} \right.
$$

$$
\text {(d)} \quad y _ {3} (t) = \left\{ \begin{array}{l l} 2, & | t | <   2 \\ 0, & | t | \geq 2 \end{array} \right.
$$

$$
x _ {o} (t) = \left\{ \begin{array}{l l} - 1, & - 2 <   t <   - 1 \\ t, & - 1 \leq t \leq 1 \\ 1, & 1 <   t <   2 \\ 0, & | t | \geq 2 \end{array} \right.
$$

(e) $\begin{array} { r } { \frac { d } { d t } x ( t ) = u ( t + 1 ) - u ( t - 1 ) - 2 \delta ( t - 2 ) } \end{array}$ : bằng 1 trên khoảng $( - 1 , 1 )$ , bằng 0 ở ngoài, cộng thêm xung $- 2 \delta ( t - 2 )$ tại điểm gián đoạn. (f) $\textstyle \int x ( t ) \delta ( t - 1 / 2 ) d t =$ $x ( 1 / 2 ) = 3 / 2$ . Không dùng được (1.14) tại $t _ { 0 } = 2 \mathrm { \ v i } x ( t )$ gián đoạn tại đó; giá trị thu được phụ thuộc cách xấp xỉ $\delta ( t ) \colon$ : xung chữ nhật diện tích 1 trên đoạn $[ 2 - \varepsilon / 2 , 2 + \varepsilon / 2 ]$ cho kết quả 1, trên đoạn $[ 2 , 2 + \varepsilon ]$ cho 0, trên đoạn $[ 2 - \varepsilon , 2 ]$ cho 2 (với mọi $\varepsilon \in ( 0 , 1 ) ) . { \mathrm { ~ ( g ) ~ } } E _ { x } = 2 0 / 3 , E _ { y _ { 1 } } = 4 0 / 3 = 2 E _ { x } { \mathrm { : ~ } } y _ { 1 } ( t )$ là $x ( t )$ bị giãn 2 lần (kèm lấy đối xứng và dịch) nên năng lượng tăng 2 lần. 

Bài 8: $\mathbf { \Psi } ( \mathbf { a } ) \mathbf { \Psi } T _ { 1 }$ rồi $T _ { 2 } \colon y ( t ) = x ( 2 t - 2 ) ; T _ { 2 }$ rồi $T _ { 1 } \colon y ( t ) = x ( 2 t - 4 )$ . (b) $T _ { 1 }$ rồi $T _ { 3 } { \mathrm { : } }$ $y ( t ) = x ( - t - 2 ) ; T _ { 3 }$ rồi $T _ { 1 } \colon y ( t ) = x ( 2 - t ) ; T _ { 4 }$ rồi $T _ { 5 } \colon y ( t ) = 2 x ^ { 2 } ( t ) + 1 ; T _ { 5 }$ rồi $T _ { 4 } \colon y ( t ) = [ 2 x ( t ) + 1 ] ^ { 2 } ; T _ { 1 } , T _ { 4 }$ theo thứ tự nào cũng cho $y ( t ) = x ^ { 2 } ( t - 2 )$ . (c) $y ( t ) = x ( - t - 1 ) + 2 x ( - t )$ ; với $x ( t ) = \delta ( t ) \colon y ( t ) = \delta ( t + 1 ) + 2 \delta ( t ) . \mathrm { ~ ( d ) ~ } S _ { 1 }$ rồi $S _ { 2 } \colon y [ n ] = n x [ n - 1 ] ; S _ { 2 }$ rồi $S _ { 1 } \colon y [ n ] = ( n - 1 ) x [ n - 1 ]$ . Nói chung không đổi được thứ tự hai hệ thống ghép nối tiếp; với hệ thống LTI thì đổi được (chương 2). 

Bài $\ u { \mathrm { : ~ } } ( \mathrm { a } ) \ y [ n ] = x [ n ] + a y [ n - 1 ]$ . (b) Với $x [ n ] = \delta [ n ] \colon y [ 0 ] , \ldots , y [ 3 ] = 1 , a , a ^ { 2 } , a ^ { 3 }$ và $y [ n ] = a ^ { n } u [ n ] . { \mathrm { V } } \dot { \mathrm { } } { \mathrm { } } { \mathrm { } } n [ n ] = u [ n ] \cdot y [ 0 ] , \ldots , y [ 3 ] = 1 , 1 + a , 1 + a + a ^ { 2 } , 1 + a + a ^ { 2 } + a ^ { 3 }$ và $\begin{array} { r } { y [ n ] = \frac { 1 - a ^ { n + 1 } } { 1 - a } u [ n ] } \end{array}$ khi $a \neq 1 , y [ n ] = ( n + 1 ) u [ n ]$ khi $a = 1 . ~ ( \mathrm { c } ) ~ a ^ { n } u [ n ]$ bị chặn khi và chỉ khi $| a | \le 1$ . Khi $| a | > 1$ , đầu vào bị chặn $\delta [ n ]$ cho đầu ra không bị chặn nên hệ thống không ổn định. 

Bài 10: 

(a) Khả nghịch: $x ( t ) = [ y ( t ) - 2 ] / 3$ (hệ thống không tuyến tính nhưng vẫn khả nghịch). 

(b) Khả nghịch: $x ( t ) = \sqrt [ 3 ] { y ( t ) }$ (căn bậc ba thực). Nếu cho phép tín hiệu phức thì không khả nghịch: $x ( t )$ và $e ^ { j 2 \pi / 3 } x ( t )$ cho cùng đầu ra. 

(c) Không: x(t) và x(t), với $x ( t ) \not \equiv 0$ 

(d) Không: $x _ { 1 } ( t ) = 0$ và $x _ { 2 } ( t ) = e ^ { - t }$ đều cho $y ( t ) = 0$ 

(e) Khả nghịch: $\begin{array} { r } { x ( t ) = y \left( \frac { 3 - t } { 2 } \right) } \end{array}$ 

(f) Khả nghịch: $\begin{array} { r } { x ( t ) = \frac { 1 } { 2 } [ y ( t + 1 ) - 1 ] } \end{array}$ . Hệ thống nhân quả nhưng hệ thống nghịch đảo không nhân quả. 

(g) Không: $x _ { 1 } ( t ) = 0$ và $x _ { 2 } ( t ) = u ( - t - 1 )$ . 

(h) Không: $x _ { 1 } ( t ) = 0 \ \mathrm { v { \dot { a } } } \ x _ { 2 } ( t ) = \cos ( \pi t / T _ { 0 } )$ đều cho $y ( t ) = 0$ (i) Không: x[n] và $x [ n ] + 1$ . Khi chỉ xét các đầu vào có li $1 _ { n \to - \infty } x [ n ] = 0$ thì khả nghịch: $\begin{array} { r } { x [ n ] = \sum _ { k = - \infty } ^ { n } y [ k ] } \end{array}$ (xem ví dụ 1.13). 

(j) Khả nghịch, hệ thống nghịch đảo là chính nó: $x [ n ] = ( - 1 ) ^ { n } y [ n ]$ 

(k) Không: $x _ { 1 } [ n ] = 0 { \mathrm { ~ v a ~ } } x _ { 2 } [ n ] = \delta [ n - 1 ] { \mathrm { ~ } } ( { \mathrm { v i ~ } } \cos ( \pi n / 2 ) = 0 { \mathrm { ~ k h i ~ } } n { \mathrm { ~ l e } } )$ 

(l) Khả nghịch: $x [ n ] = 2 ^ { - n } y [ n ] , { \mathrm { ~ v i ~ } } 2 ^ { n } \neq 0$ với mọi n. So sánh với hệ thống $y [ n ] = n x [ n ] ;$ : hệ số n bằng 0 tại $n = 0$ nên x[0] bị mất. 

Bài 11: đổi biến $\tau = a t - b$ trong $\begin{array} { r } { \int _ { - \infty } ^ { \infty } | A | ^ { 2 } | x ( a t - b ) | ^ { 2 } d t . } \end{array}$ ; khi $a < 0$ cận tích phân đổi chiều, do đó xuất hiện a . Áp dụng: $y _ { 1 } ( t ) = x ( - t / 2 + 1 ) \thinspace \mathrm { c } \acute { 0 } \vert a \vert = 1 / 2$ nên $E _ { y _ { 1 } } = 2 E _ { x }$ 

Bài 12: (a) $A ^ { 2 } T ; ~ ( \mathrm { b } ) ~ \textstyle { \frac { 2 } { 3 } } A ^ { 2 } T ; ~ ( \mathrm { c } ) ~ \textstyle { \frac { 1 } { 2 } } A ^ { 2 } T ; ~ ( \mathrm { d } ) ~ \textstyle { \frac { 3 } { 8 } } A ^ { 2 } T ; ~ ( \mathrm { e } ) ~ \textstyle { \frac { A ^ { 2 } } { 2 a } } ; { \mathrm {  ~ ( f ) ~ } } \sqrt { \pi } A ^ { 2 } \sigma ;$ (g) $\textstyle { \frac { { \sqrt { \pi } } A ^ { 2 } } { 2 \sigma } }$ . Khi σ giảm (xung hẹp lại), năng lượng của xung Gauss giảm tỷ lệ với $\sigma ,$ còn năng lượng của đạo hàm tăng tỷ lệ với $1 / \sigma$ (xung hẹp hơn thì biến thiên nhanh hơn). 

# Hệ thống LTI

Chương này bắt đầu tìm hiểu về hệ thống tuyến tính bất biến theo thời gian (LTI) qua khái niệm đáp ứng xung, phép chập. Từ đó, đáp ứng xung được đặt ở vị trí trung tâm khi phân tích các đặc trưng của hệ thống LTI. Tiếp theo, hệ thống LTI còn được biểu diễn (gián tiếp) thông qua các phương trình vi phân / sai phân tuyến tính (LDE) hệ số hằng và sơ đồ thực hiện hệ thống. Trong chương này, các khái niệm trên sẽ được trình bày lần lượt theo thứ tự: trường hợp rời rạc theo thời gian được tìm hiểu chi tiết trước, trường hợp liên tục theo thời gian được đưa ra sau với mục đích giúp cho người đọc dễ tiếp cận hơn và tránh trùng lặp không cần thiết. Nội dung chương này có thể tham khảo thêm trong [1, 2]. 

## 2.1. Đáp ứng xung và phép chập cho hệ thống rời rạc

Xét hệ thống T rời rạc theo thời gian có thuộc tính: tuyến tính (Linear) và bất biến theo thời gian (Time Invariant). Hệ thống có (kích thích) đầu vào x[n] và (đáp ứng) đầu ra y[n] 

$$
x [ n ] \stackrel {T} {\longrightarrow} y [ n ]; \quad y [ n ] = T \{x [ n ] \}
$$

Biểu diễn đầu vào x[n] thành một tổ hợp tuyến tính của các hàm xung đơn vị <sup>δ[n</sup> − <sup>k]</sup> 

$$
x [ n ] = \sum_ {k = - \infty} ^ {\infty} x [ k ] \delta [ n - k ]
$$

Áp dụng tính chất tuyến tính, ta thấy y[n] cũng phải là một tổ hợp tuyến tính của các đầu ra tương ứng<sup>1</sup> 

$$
y [ n ] = T \{x [ n ] \} = \sum_ {k = - \infty} ^ {\infty} x [ k ] T \{\delta [ n - k ] \}\tag{2.1}
$$

Gọi $h [ n ]$ là đáp ứng (đầu ra) của hệ thống $T$ khi kích thích (đầu vào) là hàm xung đơn vị như minh họa trong hình 2.1 (do vậy $h [ n ]$ được gọi là đáp ứng xung của hệ thống T). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/c3b680916f39493abc1885e3935137a152ec745d546fa7dd3594f8fa97a9c2ca.jpg)



Hình 2.1. Đáp ứng xung h[n] của hệ thống


Do hệ thống $T$ bất biến theo thời gian nên 

$$
h [ n - k ] = T \{\delta [ n - k ] \}
$$

Thay vào (2.1), ta có 

$$
y [ n ] = \sum_ {k = - \infty} ^ {\infty} x [ k ] h [ n - k ]\tag{2.2}
$$

Phép toán trên được định nghĩa là phép chập<sup>2</sup> giữa hai tín hiệu rời rạc $x [ n ]$ và $h [ n ]$ 

$$
x [ n ] * h [ n ] := \sum_ {k = - \infty} ^ {\infty} x [ k ] h [ n - k ]\tag{2.3}
$$

Như $\mathrm { v a y } .$ mỗi hệ thống LTI đều được đặc trưng bởi đáp ứng xung $h [ n ]$ , và đầu ra được xác định bằng cách thực hiện phép chập giữa đầu vào với đáp ứng xung 

$$
y [ n ] = x [ n ] * h [ n ]
$$

Hệ thống T với đáp ứng xung $h [ n ]$ có thể được biểu diễn như trong hình 2.2. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/03cbb4dd91e4fe566fe1ce341ddbce2336441384ab0362f924be46007f15cb2b.jpg)



Hình 2.2. Đáp ứng xung của hệ thống và phép chập


## 2.1.1. Cách tính phép chập rời rạc

Cho hai dãy x[n] và $h [ n ]$ , ta cần tìm dãy $y [ n ]$ , tức là cần tính $y [ n ]$ với mọi giá trị của $n = \cdots , - 2 , - 1 , 0 , 1 , 2 , \cdot \cdot \cdot$ . Với mỗi giá trị của n, ví dụ như $n = n _ { 0 }$ , ta có 

$$
y [ n _ {0} ] = \sum_ {k = - \infty} ^ {\infty} x [ k ] h [ n _ {0} - k ]\tag{2.4}
$$

Từ (2.4), chúng ta có thể tính được $y [ n _ { 0 } ]$ bằng đồ thị qua các bước như sau: 

(1) Vẽ x[k] và $h [ k ]$ trên đồ thị. 

(2) Lấy đối xứng qua trục tung: $h [ k ] \to h [ - k ]$ (3) Dịch theo trục hoành: Dịch $h [ - k ]$ đi $n _ { 0 }$ để được dãy $h [ n _ { 0 } - k ]$ . Với $n _ { 0 } > 0$ thì dịch sang bên phải, $n _ { 0 } < 0$ thì dịch sang bên trái. 

(4) Nhân hai dãy: $v _ { n _ { 0 } } [ k ] = x [ k ] h [ n _ { 0 } - k ]$ (chỉ cần nhân phần chồng lên nhau). 

(5) Tính tổng: Cộng tất cả các phần tử (khác không) của dãy $v _ { n _ { 0 } } [ k ]$ thì được y[n<sub>0</sub>]. 

Khi thay đổi các giá trị khác nhau của n, chúng ta chỉ việc lặp lại các bước (3), (4), (5) ở trên. 

Ví dụ 2.1. Cho hệ thống LTI với đầu vào x[n] và đáp ứng xung $h [ n ]$ như sau 

$$
x [ n ] = \{1, 1, 1, 1, 1 \}
$$

$$
h [ n ] = \{1, 0. 7 5, 0. 5, 0. 2 5 \}
$$

Để tính $y [ n ]$ , tức là tính phép chập giữa x[n] và $h [ n ]$ , chúng ta sẽ sử dụng đồ thị như trong hình 2.3. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/a63bfaad2ad8ff16558487718227331a3cd7a5e5466ae893f471fe0b88600783.jpg)



Hình 2.3. Các bước tính phép chập bằng đồ thị


Kết quả cuối cùng được minh họa trong hình 2.4. 

$$
y [ n ] = \{1, 1. 7 5, 2. 2 5, 2. 5, 2. 5, 1. 5, 0. 7 5, 0. 2 5 \}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/226d22894c508d7a4a5bf7bfdd0fddb66f304875d0915beaae3418cc19e2ecf7.jpg)



Hình 2.4. Kết quả của phép chập


## 2.1.2. Một số lưu ý khi tính phép chập

Khi tính toán phép chập, chúng ta có thể dễ dàng nhận thấy một số đặc điểm của dãy $y [ n ]$ khi so sánh với dãy $x [ n ]$ và $h [ n ]$ như sau. 

Chiều dài của đầu ra. Nếu x[n] và h[n] có chiều dài hữu hạn, lần lượt là L và P, thì chiều dài của $y [ n ]$ sẽ là $\left( L + P - 1 \right)$ 

Trong ví dụ 2.1, chiều dài của $y [ n ]$ là $5 + 4 - 1 = 8$ mẫu. 

Dịch. Nếu x[n] dịch đi $n _ { 1 }$ mẫu thành $x [ n - n _ { 1 } ]$ , và $h [ n ]$ dịch đi $n _ { 2 }$ mẫu thành $h [ n - n _ { 2 } ]$ thì $y [ n ]$ trở thành $y [ n - n _ { 1 } - n _ { 2 } ]$ 

$\mathbf { V _ { i } }$ trí của đầu ra trên trục thời gian. Nếu $x [ n ]$ bắt đầu từ vị trí (thời gian) $n _ { x }$ và kết thúc ở $n _ { x ^ { \prime } }$ , còn $h [ n ]$ bắt đầu từ vị trí (thời gian) $n _ { h }$ và kết thúc ở $n _ { h ^ { \prime } }$ , thì $y [ n ]$ sẽ bắt đầu và kết thúc như sau 

$$
\begin{array}{c} {n _ {y} = n _ {x} + n _ {h}} \\ {n _ {y ^ {\prime}} = n _ {x ^ {\prime}} + n _ {h ^ {\prime}}} \end{array}
$$

Trong ví dụ 2.1, x[n] có vị trí từ $n _ { x } = - 1$ cho tới $n _ { x ^ { \prime } } = 3$ , còn $h [ n ]$ có vị trí từ $n _ { h } = 0$ cho tới $n _ { h ^ { \prime } } = 3$ . Do $\operatorname { v a y } , y [ n ]$ có vị trí từ $n _ { y } = - 1 + 0 = - 1$ đến $n _ { y ^ { \prime } } = 3 + 3 = 6$ 

Chập với hàm xung đơn $\mathbf { v i } .$ Dễ dàng chứng minh được một tín hiệu bất $\mathrm { k } \mathrm { \hat { y } }$ chập với hàm xung đơn vị đều cho kết quả là chính nó 

$$
\begin{array}{l} {x [ n ] * \delta [ n ] = x [ n ]} \\ {\delta [ n ] * h [ n ] = h [ n ]} \end{array}
$$

## 2.1.3. Tính phép chập bằng hàm có sẵn trên Python

Thư viện NumPy có sẵn hàm np.convolve để tính phép chập giữa hai tín hiệu rời rạc có chiều dài hữu hạn, như minh họa dưới $\mathrm { \hat { d a y } }$ 

```python
import numpy as np
x = np.array([1, 1, 1, 1, 1])
h = np.array([1, 0.75, 0.5, 0.25])
y = np.convolve(x, h) 
```

Tuy nhiên, hàm np.convolve chỉ tính ra các giá trị của $y [ n ]$ mà không chỉ rõ xem các giá trị này tương ứng với thời điểm nào. Về bản chất thì hàm này tính chập của hai mảng x, h, mỗi mảng có thể được coi là một tín hiệu có gốc (n = 0) nằm ở phần tử đầu tiên. 

Chúng ta có thể kết hợp với các lưu ý ở phần trước để dễ dàng tìm ra vị trí của y[n] trên trục thời gian sau khi sử dụng hàm np.convolve này. 

## 2.1.4. Tính phép chập bằng cách kẻ bảng

Ta có thể kẻ bảng để tính phép chập (thực chất có thể coi là tương đương với phương pháp vẽ đồ thị). Phương pháp này được minh họa qua ví dụ sau. Xét hệ thống LTI với 

$$
\begin{array}{l} {x [ n ] = \{2, 0, \underset {\uparrow} {- 4}, 1, 3 \}} \\ {h [ n ] = \{- 1, 0, \underset {\uparrow} {2}, 5 \}} \end{array}
$$

Thay vì vẽ $x [ k ] , h [ - k ]$ trên đồ thị thì chúng ta kẻ bảng như sau (lưu $\acute { \mathrm { y } }$ rằng vị trí gốc của x $[ k ] , h [ - k ]$ phải trên cùng một cột) 

$$
\begin{array}{l l l l l l l l} x [ k ] & 2 & 0 & - 4 & 1 & 3 \\ h [ - k ] & 5 & 2 & 0 & - 1 & \to y [ 0 ] = 0 \cdot 5 + (- 4) \cdot 2 + 1 \cdot 0 + 3 \cdot (- 1) = - 1 1 \\ h [ 1 - k ] & 5 & 2 & 0 & \dots & \to y [ 1 ] = (- 4) \cdot 5 + 1 \cdot 2 + 3 \cdot 0 = - 1 8 \\ h [ 2 - k ] & 5 & 2 & \dots & \to y [ 2 ] = 1 \cdot 5 + 3 \cdot 2 = 1 1 \\ h [ 3 - k ] & 5 & \dots & \to y [ 3 ] = 3 \cdot 5 = 1 5 \\ h [ 4 - k ] & \dots & \to y [ 4 ] = y [ 5 ] = \dots = 0 \\ h [ - 1 - k ] & 5 & 2 & 0 & - 1 & \to y [ - 1 ] = 2 \cdot 5 + 0 \cdot 2 + (- 4) \cdot 0 + 1 (- 1) = 9 \\ h [ - 2 - k ] & \dots & 2 & 0 & - 1 & \to y [ - 2 ] = 2 \cdot 2 + 0 \cdot 0 + (- 4) \cdot (- 1) = 8 \\ h [ - 3 - k ] & \dots & 0 & - 1 & & \to y [ - 3 ] = 2 \cdot 0 + 0 \cdot (- 1) = 0 \\ h [ - 4 - k ] & \dots & - 1 & & & \to y [ - 4 ] = 2 \cdot (- 1) = - 2 \\ h [ - 5 - k ] & \dots & & & & \to y [ - 5 ] = y [ - 6 ] = \dots = 0 \end{array}
$$

Kết quả cuối cùng là 

$$
y [ n ] = \{- 2, 0, 8, 9, - 1 1, - 1 8, 1 1, 1 5 \}
$$

## 2.1.5. Tính phép chập bằng phép nhân ma trận

Xuất phát từ công thức (2.2), ta có thể biểu diễn đầu ra $y [ n ]$ thành kết quả của phép nhân vector hàng với vector cột như sau 

$$
\begin{array}{l} y [ n ] = \dots + x [ 0 ] h [ n ] + x [ 1 ] h [ n - 1 ] + x [ 2 ] h [ n - 2 ] + \dots \\ \qquad = \left[ \dots \quad h [ n ] \quad h [ n - 1 ] \quad h [ n - 2 ] \quad \dots \right] \left[ \begin{array}{c} \vdots \\ x [ 0 ] \\ x [ 1 ] \\ x [ 2 ] \\ \vdots \end{array} \right] \end{array}
$$

Biểu diễn $h [ n ]$ thành vector $\mathrm { c } \hat { \mathrm { Q } } \mathrm { t } ,$ khi đó vector đầu ra y được biểu diễn thành phép nhân giữa ma trận H và vector đầu vào x như minh họa trong hình 2.5 (giả sử x[n] có chiều dài $L , h [ n ]$ có chiều dài P). 

$$
\mathbf {y} = \mathbf {H} \cdot \mathbf {x}
$$

$\mathrm { \acute { O } }$ đây, H có dạng ma trận Toeplitz (tất cả các phần tử trên cùng một đường chéo từ trái sang phải đều bằng nhau). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/638e8cd3134cc45df64dc8e4925dd2de6478abe00b194895c95a12be3dc7139b.jpg)



Hình 2.5. Dạng ma trận của phép chập


Ví dụ 2.2. Xét hệ thống LTI với đầu vào $x [ n ]$ và đáp ứng xung $h [ n ]$ như sau 

$$
x [ n ] = \{4, - 2, 1, 3 \}
$$

$$
h [ n ] = \{2, 5, - 1 \}
$$

Khi $\begin{array} { r } { \dot { \mathrm { d } } \acute { \mathrm { o } } , } \end{array}$ ta có thể tính được đầu ra $y [ n ]$ bằng phép nhân ma trận như sau 

$$
\begin{array}{l} \mathbf {y} = \mathbf {H} \cdot \mathbf {x} \\ = \left[ \begin{array}{c c c c} 2 & 0 & 0 & 0 \\ 5 & 2 & 0 & 0 \\ - 1 & 5 & 2 & 0 \\ 0 & - 1 & 5 & 2 \\ 0 & 0 & - 1 & 5 \\ 0 & 0 & 0 & - 1 \end{array} \right] \left[ \begin{array}{c} 4 \\ - 2 \\ 1 \\ 3 \end{array} \right] \\ = \left[ \begin{array}{c} 8 \\ 1 6 \\ - 1 2 \\ 1 3 \\ 1 4 \\ - 3 \end{array} \right] \end{array}
$$

Áp dụng tính chất về vị trí của đầu ra trên trục thời gian, ta có kết quả cuối cùng như sau 

$$
y [ n ] = \{8, 1 6, - 1 2, 1 3, 1 4, - 3 \}
$$

## 2.1.6. Độ phức tạp tính toán của phép chập

Trên thực tế, khi thực hiện các hệ thống LTI có đáp ứng xung $h [ n ]$ chiều dài hữu hạn, ngoài việc tính toán chính xác các giá trị đầu ra $y [ n ]$ bằng phép chập, người ta còn quan tâm đến độ phức tạp tính toán của phép toán này: cụ thể là số lượng phép nhân và số lượng phép cộng. 

Xét hệ thống LTI rời rạc với đầu vào x[n], đáp ứng xung $h [ n ]$ có chiều dài hữu hạn lần lượt là L và P. Ta cần tính số lượng phép nhân và số lượng phép cộng cần thiết để thực hiện phép chập giữa x[n] và $h [ n ]$ nhằm tìm được đầu ra y[n]. Giả thiết sử dụng các phương pháp tính trực tiếp phép chập như đã trình bày trong các phần trước ở chương này, và chỉ tính các tích $x [ k ] h [ n - k ]$ mà cả hai thừa số đều nằm trong chiều dài của hai dãy (không tính các phép nhân với các giá trị 0 ở ngoài hai dãy, chẳng hạn các phần tử 0 của ma trận H ở mục trước). 

Có nhiều cách. Ta có thể đếm số phép nhân và phép cộng cho từng giá trị của y[n], rồi cộng tất cả lại (chiều dài của $y [ n ]$ là $L + P - 1 )$ . 

Tuy nhiên, ta có thể tính nhanh hơn khi quan sát toàn bộ quá trình tính toán theo định nghĩa. Hai dãy xếp hàng cạnh nhau (một dãy đầu vào, và dãy đáp ứng xung sau khi lấy đối xứng). Một dãy đứng im, dãy kia dịch chuyển lần lượt từng phần tử một. Mỗi lần dịch chuyển, các cặp đối diện nhau sẽ nhân với nhau, sau đó cộng kết quả lại. Lưu ý : trong toàn bộ quá trình, mỗi phần tử của dãy này sẽ chỉ đối diện (gặp) mỗi phần tử của dãy kia đúng một lần duy nhất. 

Như vậy, số lần gặp nhau được tính bằng chiều dài của dãy này nhân với chiều dài của dãy kia. Nói cách khác, tổng số phép nhân sẽ là LP. 

Sau khi gặp nhau (và thực hiện phép nhân), chúng ta sẽ có $L P$ kết quả. Các kết quả này sẽ được gom lại (cộng) để ra $L + P - 1$ giá trị đầu ra (mỗi giá trị đầu ra nhận ít nhất một kết quả). Lưu $\acute { y }$ : mỗi kết quả trong tổng số $L P$ kết quả trên sẽ chỉ được sử dụng đúng một lần duy nhất. Mặt khác, mỗi phép cộng gộp hai số hạng thành một, tức là làm giảm số lượng số hạng đi đúng một. Để giảm từ LP số hạng xuống còn $L + P - 1$ giá trị đầu ra cần giảm $L P - ( L + P - 1 )$ số hạng. 

Do đó, tổng số phép cộng sẽ là 

$$
L P - (L + P - 1) = (L - 1) (P - 1).
$$

Khi đầu vào x[n] rất dài (chẳng hạn khi xử lý theo thời gian thực), ta thường tính lần lượt từng mẫu đầu ra. Khi đó, mỗi mẫu $y [ n ]$ mà dãy $h [ n - k ]$ nằm trọn trong vùng có x[k] cần P phép nhân và $P - 1$ phép cộng. Con số này khớp với $M + N + 1$ bộ nhân và $M + N$ bộ cộng của sơ đồ dạng trực tiếp (mục 2.6) khi $N = 0 , M = P - 1$ 

Sau này, trong môn Xử lý tín hiệu số, FFT và IFFT sẽ được dùng để tính phép chập với độ phức tạp tính toán thấp đi rất nhiều, đặc biệt khi x[n], h[n] có chiều dài lớn. 

## 2.1.7. Code tính tổng chập trên Python

Như đã nói ở mục 2.1.3, do tính chất dịch của phép chập, ta có thể coi đầu vào và đáp ứng xung là các dãy có gốc ở phần tử đầu tiên, đầu ra cũng vậy. 

Với cùng nhận xét với phần 2.1.6, mỗi phần tử của mảng đầu vào $x _ { i }$ sẽ chỉ nhân duy nhất một lần với mỗi phần tử của mảng đáp ứng xung $h _ { j }$ , và $x _ { i } \cdot h _ { j }$ sẽ chỉ đóng góp vào đầu ra $y _ { i + j }$ . Ta có đoạn code sau: 

```python
import numpy as np
x = np.array([3,-1,2,9,-4,5,7])
h = np.array([-2,0,-3,2,0,-4,2,-1])
L = len(x)
P = len(h)
y = np.zeros(L+P-1)
for i in range(L):
    for j in range(P):
    y[i+j] += x[i]*h[j]
print(y) 
```

Quan sát đoạn code trên, chúng ta cũng có thể dễ dàng tính được tổng số phép nhân, và tổng số phép cộng (sau khi bỏ đi những lần cộng với không). 

## 2.2. Đáp ứng xung và phép chập cho hệ thống liên tục

Xét hệ thống LTI liên tục theo thời gian với đầu vào x(t) và đầu ra $y ( t )$ 

$$
x (t) \stackrel {T} {\longrightarrow} y (t); \quad y (t) = T \{x (t) \}
$$

Biểu diễn đầu vào theo hàm delta Dirac 

$$
x (t) = \int_ {- \infty} ^ {\infty} x (\tau) \delta (t - \tau) d \tau
$$

Gọi h(t) (đáp ứng xung) là đầu ra của hệ thống khi đầu vào là hàm delta Dirac, 

$$
h (t) = T \{\delta (t) \}
$$

Áp dụng tính chất tuyến tính và bất biến theo thời gian, ta có mối quan hệ: 

$$
y (t) = x (t) * h (t) := \int_ {- \infty} ^ {\infty} x (\tau) h (t - \tau) d \tau\tag{2.5}
$$

Phép tích phân trong công thức (2.5) được định nghĩa là phép $\mathrm { c h a p } ^ { 3 }$ giữa $x ( t )$ và $h ( t )$ 

## 2.2.1. Cách tính phép chập liên tục

Các bước tính giá trị của $y ( t _ { 0 } )$ bao gồm: 

(1) Vẽ $x ( \tau )$ và $h ( \tau )$ trên đồ thị. 

(2) Lấy đối xứng qua trục tung: $h ( \tau ) \to h ( - \tau )$ 

(3) Dịch theo trục hoành: Dịch $h ( - \tau )$ đi $t _ { 0 }$ để được $h ( t _ { 0 } - \tau )$ 

(4) Nhân: $v _ { t _ { 0 } } ( \tau ) = x ( \tau ) h ( t _ { 0 } - \tau )$ (chỉ cần nhân đoạn chồng lên nhau). 

(5) Tính tích phân (xét trên đoạn khác không) của $v _ { t _ { 0 } } ( \tau )$ thì được $y ( t _ { 0 } )$ 

Ta thấy, về cơ bản, phép chập cho trường hợp liên tục cũng $\mathrm { g i } \tilde { \hat { \mathrm { o } } } \mathrm { n g }$ như phép chập cho trường hợp rời rạc. Đều có lấy đối xứng, sau đó 3 thao tác: dịch, nhân, lấy tích phân (hoặc tính tổng) được lặp đi lặp lại nhiều lần. Sự khác biệt ở đây là phép lấy tích phân đã được sử dụng thay cho phép tính tổng, và ta sẽ không tính lần lượt từng giá trị đầu ra $y ( t )$ như trường hợp rời rạc nữa. Thay vào đó, ta sẽ chia các khoảng khác nhau của biến t để thay đổi các cận cho tích phân. 

Ví dụ 2.3. Cho mạch điện RC nối tiếp với $R C = 1 ~ [ \mathrm { s ] }$ , hãy tính điện áp $y ( t )$ trên tụ khi điện áp giữa hai đầu mạch điện là xung chữ nhật: 

$$
x (t) = u (t) - u (t - 2)
$$

Gợi ý: Đáp ứng xung của hệ thống là $h ( t ) = e ^ { - t } u ( t )$ 

Lời giải. Hình 2.6 minh họa các bước tính phép chập liên tục giữa $x ( t )$ và $h ( t )$ Chúng ta có thể thấy được đoạn chồng lên nhau giữa $x ( \tau )$ và $h ( t - \tau )$ sẽ thay đổi tùy theo giá trị khác nhau của t. Do $\mathrm { v } \mathrm { \hat { a } \mathrm { y } }$ , các cận để tính tích phân cũng thay đổi tương ứng. 

$$
y (t) = \left\{ \begin{array}{l l} 0, & t <   0 \\ \int_ {0} ^ {t} e ^ {- (t - \tau)} d \tau , & 0 \leq t <   2 \\ \int_ {0} ^ {2} e ^ {- (t - \tau)} d \tau , & t \geq 2 \end{array} \right.
$$

Tính các tích phân trên, ta được 

$$
y (t) = \left\{ \begin{array}{l l} 0, & t <   0 \\ 1 - e ^ {- t}, & 0 \leq t <   2 \\ (e ^ {2} - 1) e ^ {- t}, & t \geq 2 \end{array} \right.
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/44f140755f91fabc3edc2f45b7ddd697709fa0e30f534977c5e79473cf3b543e.jpg)



Hình 2.6. Các bước tính phép chập cho tín hiệu và hệ thống liên tục


Ví dụ 2.4. Xét hệ thống LTI với đầu vào và đáp ứng xung là các xung chữ nhật đơn giản 

$$
\begin{array}{l} x (t) = u (t + 1) - u (t - 4) \\ h (t) = u (t) - u (t - 2) \end{array}
$$

Chúng ta sẽ tìm đầu ra y(t) bằng cách thực hiện phép chập trên đồ thị như sau. Đầu tiên, vẽ $x ( \tau )$ và $h ( - \tau )$ trên đồ thị như trong hình 2.7a. 

Trường hợp 1, khi $t < - 1 , x ( \tau )$ và $h ( t - \tau )$ sẽ không chồng lên nhau (xem hình 2.7b). Do đó $y ( t ) = 0$ 

Trường hợp 2, khi 1  t < 1, x(τ) và $h ( t - \tau )$ sẽ chồng lên nhau một phần từ 1 cho đến t như trong hình 2.7c. Do đó 

$$
y (t) = \int_ {- 1} ^ {t} 1 d \tau = t + 1
$$

Trường hợp 3, $1 \leq t < 4 , x ( \tau )$ và $h ( t - \tau )$ sẽ chồng lên nhau toàn bộ hình chữ nhật con, từ $t - 2$ cho đến t như trong hình 2.7d. Do đó 

$$
y (t) = \int_ {t - 2} ^ {t} 1 d \tau = 2
$$

Trường hợp 4, khi $4 \leq t \leq 6 , x ( \tau ) { \mathrm { ~ v { \dot { a } } ~ } } h ( t - \tau )$ sẽ chồng lên nhau một phần từ $t - 2$ cho đến 4 như trong hình 2.7e. Do đó 

$$
y (t) = \int_ {t - 2} ^ {4} 1 d \tau = 6 - t
$$

Trường hợp 5, khi $t > 6 , x ( \tau )$ và $h ( t - \tau )$ không chồng lên nhau, cho nên $y ( t ) = 0$ 

Kết quả cuối cùng minh họa trong hình 2.8. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7c8c25f0d5334fc21566f1ce3c5e8b70c9b57304a11235cae98c787ada4f88fd.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/096759c6907a6f1e3ff1cbaca75365daf97a9133087c49878178872a5554c444.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/dcb1c99d6791c9672c231d363d39c9069ac94a876ba929713667b30c6f41bee0.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/48c9293c78b43d786df184714c4a41ce885412d2c5711a1302f1de56cceca725.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/e926d6dc0732073134ede13840c744d26aee3235b3a602917f90b0a6fb514ecf.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4a347e0a3846990b5b10de5e86b1e1d24a7c0c4b489f38b0b24a6596ab139dec.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/e62ade9ee9b4d1ea7af3d4702578e03b522cada2935a165d3b8a1a7e5ebb01c0.jpg)



(c) Trường hợp 2: −1 ≤ t < 1


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/ba3c8a6a144c325c4865ab54d149134b24d8eb35f52c140efdcf9503195e5291.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/c3aac314c0ec285e3cddbd400b1ad6a7b1c10a9f60cd4ebafdb55edb8417bf83.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/08f8a2cf77c92f16c38adddc5108f23c994132455bcfc2b7e5f9faa3c6aadb7f.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/ee06b64767522992a4b3dee71bab6fbd3d0e25866e7f396afeda54c65aa2b244.jpg)



(e) Trường hợp 4: 4 ≤ t ≤ 6


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7db4e1e5d6a59c119b28528eac36823cac2f0f4a98a5daedce2179dfab752446.jpg)



(f) Trường hợp 5: t > 6



Hình 2.7. Phép chập giữa hai xung chữ nhật


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/a79ac8824d77fea5ed15cfac56fcc48dcd32e3ce1451845336cfada57d2510e6.jpg)



Hình 2.8. Kết quả phép chập giữa hai xung chữ nhật


## 2.2.2. Đáp ứng xung của kênh đa đường

Xét kênh đa đường với tín hiệu phát đi $x ( t )$ và tín hiệu thu được $y ( t )$ như đã tìm hiểu trong phần 1.4.4.2. 

$$
\begin{array}{c} y (t) = \alpha_ {0} x (t - \tau_ {0}) + \alpha_ {1} x (t - \tau_ {1}) + \alpha_ {2} x (t - \tau_ {2}) + \dots \\ = \sum_ {i} \alpha_ {i} x (t - \tau_ {i}) \end{array}
$$

Nếu bỏ qua nhiễu $n ( t )$ và các hệ số $\alpha _ { i } , \tau _ { i }$ không thay đổi theo thời gian, có thể coi kênh này như một hệ thống LTI với đáp ứng xung $h ( t )$ (xem hình 2.9) như sau 

$$
h (t) = \sum_ {i} \alpha_ {i} \delta (t - \tau_ {i})
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b8dc23b233fd2c9bb20f2aa1bc01ac3ef3cb5604e67c93a5bc7728ece48c40d7.jpg)



Hình 2.9. Đáp ứng xung của kênh đa đường


Nhìn vào đáp ứng xung của kênh, gồm các xung đơn vị có trọng số $\alpha _ { i }$ và dịch đi $\tau _ { i } ,$ chúng ta sẽ biết ngay được kênh có những thành phần đa đường nào, biên độ lớn hay bé $\left( \left| \alpha _ { i } \right| \right)$ , trễ nhiều hay ít $\left( \tau _ { i } \right)$ . Việc tạo mô hình kênh (channel modeling) bằng đo đạc thực nghiệm và ước lượng kênh (channel estimation), tức là xác định các cặp $\alpha _ { i } , \tau _ { i }$ từ tín hiệu thu được, là một phần quan trọng trong các hệ thống thông tin số. 

## 2.3. Các tính chất của phép chập và hệ thống LTI

Tương tự như nhiều phép toán truyền thống khác, phép chập cũng có các tính chất cơ bản như giao hoán, kết hợp và phân phối. Ngoài ra, nhiều tính chất của hệ thống LTI có thể được đánh giá thông qua đáp ứng xung của hệ thống. 

Nhận xét. Các tính chất của phép chập trong mục này chỉ đúng khi các phép chập liên quan tồn tại, tức là các tổng (tích phân) chập hội tụ. Điều kiện này được thỏa mãn khi, chẳng hạn, các tín hiệu có chiều dài hữu hạn, hoặc khi đầu vào bị chặn và các đáp ứng xung khả tổng tuyệt đối (các hệ thống ổn định, xem mục 2.3.7). Nếu không, tính chất kết hợp có thể không còn đúng. Ví dụ, xét $x [ n ] = 1$ với mọi $n ,$ $h _ { 1 } [ n ] = \delta [ n ] - \delta [ n - 1 ]$ và $h _ { 2 } [ n ] = u [ n ]$ . Ta có x[n] $h _ { 1 } [ n ] = x [ n ] - x [ n - 1 ] = 0$ , nên $( x [ n ] * h _ { 1 } [ n ] ) * h _ { 2 } [ n ] = 0$ . Trong khi đó $h _ { 1 } [ n ] \ast \bar { h _ { 2 } } [ n ] \stackrel {  } { = } u [ n ] - u [ n - 1 ] \stackrel {  } { = } \delta [ n ]$ , nên $x [ n ] * ( h _ { 1 } [ n ] * h _ { 2 } [ n ] ) = x [ n ] = 1$ . Nguyên nhân là tổng chập $\begin{array} { r } { x [ n ] * h _ { 2 } [ n ] = \sum _ { k = - \infty } ^ { n } \dot { } } \end{array}$ 1 không hội tụ. 

## 2.3.1. Tính chất kết hợp

$$
(x [ n ] * h _ {1} [ n ]) * h _ {2} [ n ] = x [ n ] * (h _ {1} [ n ] * h _ {2} [ n ])
$$

$$
(x (t) * h _ {1} (t)) * h _ {2} (t) = x (t) * (h _ {1} (t) * h _ {2} (t))
$$

Một hệ quả trực tiếp của tính chất này là: khi ghép nối tiếp hai hệ thống LTI với đáp ứng xung lần lượt là $h _ { 1 } [ n ]$ và $h _ { 2 } [ n ]$ (xem hình 2.10), đáp ứng xung của cả hệ thống sẽ là 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/2eb1b6efb0e67b2655ae61686c82885b3af7a06aa9c4c33bdff60db0436d879b.jpg)



Hình 2.10. Ghép nối tiếp hai hệ thống LTI


## 2.3.2. Tính chất giao hoán

$$
\begin{array}{l} x [ n ] * h [ n ] = h [ n ] * x [ n ] \\ x (t) * h (t) = h (t) * x (t) \end{array}
$$

Bạn đọc có thể thử làm lại tất cả các bài tập tính toán phép chập đã có trong chương này nhưng thay bằng $h [ n ] * x [ n ]$ (hoặc $h ( t ) * x ( t ) )$ và so sánh kết quả để luyện tập và kiểm chứng tính chất này trên các ví dụ cụ thể. 

Xét trường hợp ghép nối tiếp hai hệ thống LTI với đáp ứng xung lần lượt là $h _ { 1 } [ n ]$ và $h _ { 2 } [ n ]$ $\mathrm { { \acute { A } p } }$ dụng tính chất kết hợp, sau đó áp dụng tính chất giao hoán, chúng ta có thể tính được đáp ứng xung của cả hệ thống 

$$
h [ n ] = h _ {1} [ n ] * h _ {2} [ n ] = h _ {2} [ n ] * h _ {1} [ n ]
$$

Như vậy, chúng ta có thể đổi thứ tự trước sau hai hệ thống ghép nối tiếp mà kết quả vẫn không đổi (như minh họa trong hình 2.11). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/de64046ccc0605cc9a0db69a7be8073f26fd1a65b063c07011714d7f008b18d4.jpg)



Hình 2.11. Đổi thứ tự hai hệ thống LTI ghép nối tiếp


## 2.3.3. Tính chất phân phối với phép cộng

$$
\begin{array}{l} x [ n ] * (h _ {1} [ n ] + h _ {2} [ n ]) = x [ n ] * h _ {1} [ n ] + x [ n ] * h _ {2} [ n ] \\ x (t) * (h _ {1} (t) + h _ {2} (t)) = x (t) * h _ {1} (t) + x (t) * h _ {2} (t) \end{array}
$$

Xét trường hợp ghép song song hai hệ thống LTI như trong hình 2.12. Đáp ứng xung của cả hệ thống là 

$$
h [ n ] = h _ {1} [ n ] + h _ {2} [ n ]
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/12f0b4f6ef95658e81e824f5a888359176c7215d1ff86fb5b48307e5b0b49c46.jpg)



Hình 2.12. Ghép song song hai hệ thống LTI


## 2.3.4. Hệ thống LTI không có nhớ

Xét hệ thống LTI với đáp ứng xung $h [ n ]$ , ta có 

$$
y [ n ] = x [ n ] * h [ n ]
$$

Áp dụng tính chất giao hoán, 

$$
\begin{array}{l} y [ n ] = h [ n ] * x [ n ] = \sum_ {k = - \infty} ^ {\infty} h [ k ] x [ n - k ] \\ \qquad = \dots + h [ - 2 ] x [ n + 2 ] + h [ - 1 ] x [ n + 1 ] + h [ 0 ] x [ n ] + h [ 1 ] x [ n - 1 ] + \dots \end{array}
$$

Hệ thống không có nhớ khi y[n] chỉ phụ thuộc vào $x [ n ]$ . Theo công thức trên, nếu $h [ k ] \neq 0$ với một giá trị $k \neq 0$ nào đó thì $y [ n ]$ phụ thuộc vào x $[ n - k ]$ . Do đó, hệ thống không có nhớ khi và chỉ khi 

$$
h [ n ] = 0, \quad \forall n \neq 0
$$

tức là $h [ n ] = C \delta [ n ]$ , trong đó $C$ là hằng số. Khi đó, quan hệ giữa đầu vào và đầu ra của hệ thống là 

$$
y [ n ] = x [ n ] * C \delta [ n ] = C x [ n ]
$$

Trong trường hợp liên tục theo thời gian, hệ thống LTI sẽ là không có nhớ khi 

$$
h (t) = C \delta (t)
$$

## 2.3.5. Tính khả nghịch của hệ thống LTI

Một hệ thống LTI (với đáp ứng xung $h [ n ] )$ được gọi là khả nghịch nếu tồn tại một hệ thống LTI khác (với đáp ứng xung $h _ { 1 } [ n ] )$ sao cho ghép nối tiếp với nhau thì đầu ra cuối cùng sẽ bằng đầu vào đầu tiên (như minh họa trong hình 2.13). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/cc0f59eaa16eb33513d83bf7a7a9cc14bfa2007fd5ae0d3a5c9b269c8b039c1a.jpg)



Hình 2.13. Nghịch đảo một hệ thống LTI


Như đã phân tích ở phần trước, một hệ thống có đầu ra bằng đầu vào thì đáp ứng xung của hệ thống đó chính là hàm xung đơn vị δ[n]. Như vậy, điều kiện để hệ thống $h [ n ]$ khả nghịch là tồn tại $h _ { 1 } [ n ]$ sao cho thỏa mãn công thức sau 

$$
h [ n ] * h _ {1} [ n ] = \delta [ n ]
$$

Ví dụ 2.5. Xét nghịch đảo của các hệ thống LTI sau: 

(a) $h [ n ] = \delta [ n - n _ { 0 } ]$ 

(b) $h [ n ] = u [ n ]$ 

Lời giải. (a) Khi hệ thống $T$ có đáp ứng xung $h [ n ] = \delta [ n - n _ { 0 } ]$ , dễ thấy đầu ra sẽ bị trễ so với đầu vào $n _ { 0 }$ mẫu 

$$
y [ n ] = x [ n - n _ {0} ]
$$

Do $\mathrm { v a y } ,$ , khi ghép nối tiếp với hệ thống $T ^ { - 1 }$ để được đầu ra cuối cùng là $x [ n ]$ thì hệ thống nghịch đảo $T ^ { - 1 }$ phải dịch tín hiệu đi $n _ { 0 }$ mẫu theo chiều ngược lại. Đáp ứng xung của $T ^ { - 1 }$ phải là $\delta [ n + n _ { 0 } ]$ 

(b) Khi $h [ n ] = u [ n ]$ , đầu ra là tổng tích lũy của đầu vào (với các đầu vào mà tổng này hội tụ) 

$$
y [ n ] = \sum_ {k = - \infty} ^ {\infty} x [ k ] u [ n - k ] = \sum_ {k = - \infty} ^ {n} x [ k ]
$$

Suy ra $y [ n ] - y [ n - 1 ] = x [ n ]$ . Như vậy, hệ thống nghịch đảo lấy hiệu của hai mẫu liên tiếp, và có đáp ứng xung 

$$
h _ {1} [ n ] = \delta [ n ] - \delta [ n - 1 ]
$$

Kiểm tra lại: $h [ n ] * h _ { 1 } [ n ] = u [ n ] - u [ n - 1 ] = \delta [ n ] .$ 

## 2.3.6. Tính nhân quả của hệ thống LTI

$\mathrm { { \acute { A } p } }$ dụng tính chất giao hoán, đầu ra của hệ thống được tính theo công thức: 

$$
y [ n ] = \dots + h [ - 2 ] x [ n + 2 ] + h [ - 1 ] x [ n + 1 ] + h [ 0 ] x [ n ] + h [ 1 ] x [ n - 1 ] + \dots
$$

Hệ thống nhân quả khi và chỉ khi đầu ra $y [ n ]$ chỉ là một hàm của $x [ n ] , x [ n - 1 ] , . . . ,$ chứ không phụ thuộc vào $x [ n + 1 ] , x [ n + 2 ] , . . . ,$ tức là 

$$
h [ n ] = 0, \quad \forall n <   0
$$

Trong trường hợp liên tục theo thời gian, điều kiện sẽ là 

$$
h (t) = 0, \quad \forall t <   0
$$

Người ta mở rộng khái niệm nhân quả cho một tín hiệu $x [ n ] , x ( t )$ bất $\mathrm { k } \mathrm { \tilde { y } }$ như sau: 

$$
\begin{array}{l l} {x [ n ] = 0, \quad \forall n <   0} \\ {x (t) = 0, \quad \forall t <   0} \end{array}
$$

## 2.3.7. Tính ổn định của hệ thống LTI

Điều kiện cần và đủ để một hệ thống LTI (với đáp ứng xung $h [ n ] )$ ổn định theo nghĩa BIBO (mọi đầu vào bị chặn đều cho đầu ra bị chặn) là: 

$$
\sum_ {n = - \infty} ^ {\infty} | h [ n ] | <   \infty\tag{2.6}
$$

Chứng minh. Điều kiện đủ: Đầu ra được tính theo công thức sau 

$$
y [ n ] = x [ n ] * h [ n ] = h [ n ] * x [ n ] = \sum_ {k = - \infty} ^ {\infty} h [ k ] x [ n - k ]
$$

Khi đầu vào bị chặn, có nghĩa tồn tại hằng số $C$ sao cho $| x [ n ] | \leq C$ ∀<sup>n.</sup> $\mathrm { { \AA p } }$ dụng bất đẳng thức tam giác, ta có 

$$
| y [ n ] | \leq \sum_ {k = - \infty} ^ {\infty} | h [ k ] | | x [ n - k ] | \leq C \sum_ {k = - \infty} ^ {\infty} | h [ k ] |, \quad \forall n
$$

Như vậy, nếu điều kiện $\scriptstyle \sum _ { n = - \infty } ^ { \infty } | h [ n ] | < \infty$ được thỏa mãn thì đầu ra $y [ n ]$ bị chặn khi đầu vào x[n] bị chặn. 

Điều kiện cần: gọi a và b là hai mệnh đề 

$$
a: \text {   hệ   thống   ổn   định   BIBO,   }
$$

$$
b: \sum_ {n = - \infty} ^ {\infty} | h [ n ] | <   \infty
$$

Ta cần chứng minh $a \Rightarrow b$ . Ta chứng minh bằng phản đảo (contrapositive), dựa trên sự tương đương 

$$
(a \Rightarrow b) \Leftrightarrow (\bar {b} \Rightarrow \bar {a})
$$

tức là chỉ ra rằng khi $\scriptstyle \sum _ { n = - \infty } ^ { \infty } | h [ n ] | = \infty$ thì có ít nhất một trường hợp hệ thống có đầu vào bị chặn mà đầu ra không bị chặn. 

Chọn đầu vào như sau: 

$$
x [ n ] = \left\{ \begin{array}{l l} \frac {h ^ {*} [ - n ]}{| h [ - n ] |}, & h [ - n ] \neq 0 \\ 0, & h [ - n ] = 0 \end{array} \right.
$$

Khi đó đầu ra tại $n = 0$ được tính như sau 

$$
y [ 0 ] = \sum_ {k = - \infty} ^ {\infty} h [ k ] x [ - k ] = \sum_ {k = - \infty} ^ {\infty} | h [ k ] |
$$

Theo giả thiết, chuỗi này phân $\mathrm { k } \grave { \mathrm { y } } ,$ tức là $y [ 0 ]$ không hữu hạn. Như vậy đầu vào bị chặn $( \mathrm { v i } | x [ n ] | \in \{ 0 , 1 \} )$ ) nhưng đầu ra không bị chặn.  

Trong trường hợp liên tục theo thời gian, điều kiện cần và đủ sẽ là 

$$
\int_ {t = - \infty} ^ {\infty} | h (t) | d t <   \infty\tag{2.7}
$$

Ví dụ 2.6. Xét tính ổn định của hệ thống $h [ n ] = a ^ { n } u [ n ]$ 

Lời giải. $\mathrm { { \acute { A } p } }$ dụng điều kiện (2.6): 

$$
\sum_ {n = - \infty} ^ {\infty} | h [ n ] | = \sum_ {n = 0} ^ {\infty} | a | ^ {n}
$$

Chuỗi hình học này hội tụ (và bằng ${ \frac { 1 } { 1 - | a | } } )$ khi và chỉ khi $| a | < 1$ . Vậy hệ thống ổn định khi và chỉ khi $| a | < 1$  

## 2.4. Đáp ứng nhảy của hệ thống LTI

Xét hệ thống LTI với đầu vào là hàm nhảy đơn vị, khi đó đầu ra được gọi là đáp ứng nhảy (step response) của hệ thống như minh họa trong hình 2.14. 

$$
s [ n ] = u [ n ] * h [ n ]
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7d93f8452ab34c4d6aab5881868e89c8dd510b2131e409350a0d777bcee20614.jpg)



Hình 2.14. Đáp ứng nhảy $s [ n ]$ của hệ thống LTI


Ta có $\mathrm { t h } \mathring { \mathrm { e } }$ dễ dàng tìm được mối liên hệ giữa đáp ứng nhảy $s [ n ]$ và đáp ứng xung $h [ n ]$ như sau. 

$\mathrm { { \AA p } }$ dụng tính chất giao hoán, 

$$
s [ n ] = h [ n ] * u [ n ] = \sum_ {k = - \infty} ^ {\infty} h [ k ] u [ n - k ]
$$

Mặt khác, 

$$
u [ n - k ] = \left\{ \begin{array}{l l} 1, & k \leq n \\ 0, & k > n \end{array} \right.
$$

Do đó, 

$$
s [ n ] = \sum_ {k = - \infty} ^ {n} h [ k ]\tag{2.8}
$$

Ngược lại, ta có: 

$$
h [ n ] = s [ n ] - s [ n - 1 ]
$$

Trong trường hợp liên tục theo thời gian, chúng ta cũng có mối quan hệ giữa đáp ứng nhảy s(t) và đáp ứng xung h(t) như sau 

$$
\begin{array}{l} {s (t) = \int_ {- \infty} ^ {t} h (\tau) d \tau} \\ {h (t) = \frac {d}{d t} s (t)} \end{array}
$$

Đáp ứng nhảy cho biết phản ứng tại đầu ra hệ thống LTI khi đầu vào có sự thay đổi đột ngột. Khi hệ thống ổn định (BIBO), chuỗi $\scriptstyle \sum _ { k = - \infty } ^ { \infty } h [ k ]$ hội tụ tuyệt đối theo (2.6), nên theo (2.8) đáp ứng nhảy s[n] tiến tới giá trị xác lập $\scriptstyle \sum _ { k = - \infty } ^ { \infty } h [ k ]$ khi $n \to \infty$ (tương tự, s(t) tiến tới $\textstyle \int _ { - \infty } ^ { \infty } h ( t )$ dt khi $t \to \infty )$ . Với hệ thống FIR, s[n] đạt đúng giá trị này sau một số hữu hạn mẫu; với hệ thống IIR, s[n] nói chung chỉ tiến dần tới giá trị đó. Vì vậy, người ta thường dùng thời gian xác lập (settling time) $t _ { s } \mathrm { : }$ khoảng thời gian cần thiết để đáp ứng nhảy đi vào và nằm lại trong một dải sai số nhỏ quanh giá trị xác lập (ví dụ 2%). Thời gian này có $\acute { \mathrm { y } }$ nghĩa quan trọng trong việc đánh giá chất lượng hoạt động của hệ thống. Thông thường, người ta mong muốn nó càng nhỏ càng tốt (có nghĩa là hệ thống sẽ nhanh ổn định khi có sự thay đổi đột ngột tại đầu vào). 

Phần đáp ứng nhảy trước thời điểm $t _ { s }$ được gọi là giai đoạn quá độ (transient), phần sau đó là giai đoạn xác lập (steady state). Giả sử giá trị xác lập $s ( \infty ) : =$ lim $\iota _ { t  \infty } s ( t ) > 0$ . Ngoài $t _ { s }$ , giai đoạn quá độ còn được đặc trưng bởi các chỉ tiêu sau (hình 2.15): 

thời gian lên (rise time) $t _ { r } \colon$ khoảng thời gian để đáp ứng tăng từ 10% đến 90% giá trị xác lập (một số tài liệu dùng khoảng từ 0% đến 100%); 

thời điểm đỉnh (peak time) $t _ { p } \colon$ thời điểm đáp ứng đạt giá trị lớn nhất; 

độ vọt lố cực đại (maximum overshoot) $\begin{array} { r } { M _ { p } = \frac { s ( t _ { p } ) - s ( \infty ) } { s ( \infty ) } \cdot 1 0 0 \% } \end{array}$ 

Khi đáp ứng nhảy không vượt quá giá trị xác lập, chẳng hạn $s ( t ) = ( 1 - e ^ { - t } ) u ( t )$ của hệ thống có $h ( t ) = e ^ { - t } u ( t )$ , ta có $M _ { p } = 0$ . Với hệ thống rời rạc, các chỉ tiêu được định nghĩa tương tự, với thời gian tính bằng số mẫu. Mức độ dao động trong giai đoạn quá độ phụ thuộc vào vị trí các điểm cực của hệ thống (xem hệ số tắt dần ζ ở chương 6). 

Ví dụ 2.7. Cho hệ thống LTI với đáp ứng xung 

$$
h [ n ] = \{- 4, 3, 0, 2, 5, - 1 \}
$$

$\mathrm { { \acute { A } p } }$ dụng công thức (2.8), ta dễ dàng tính được đáp ứng nhảy của hệ thống này 

$$
s [ n ] = \{- 4, - 1, - 1, 1, 6, 5, 5, 5, \ldots \}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/17f8daa578d0275a5f1dd892ea58b6cb62a2bfd9a991e591ce1f04d4d4c75a5f.jpg)



Hình 2.15. Các chỉ tiêu của đáp ứng nhảy (dải sai số ±5% để dễ quan sát)


## 2.5. Biểu diễn hệ thống LTI bằng phương trình sai phân / vi phân tuyến tính hệ số hằng

$\mathrm { \acute { O } }$ phần trước, ta thấy một hệ thống LTI có thể được biểu diễn trực tiếp qua đáp ứng xung $( h [ n ]$ hoặc $h ( t ) )$ . Ngoài ra, trong nhiều trường hợp, hệ thống LTI còn có thể được biểu diễn (gián tiếp) qua phương trình vi phân / sai phân tuyến tính hệ số hằng thể hiện mối quan hệ giữa đầu vào và đầu ra của hệ thống. 

Định nghĩa 2.1. Hệ thống thỏa mãn điều kiện nghỉ ban đầu (initial rest) nếu với mọi $t _ { 0 } { \mathrm { : } }$ khi $x ( t ) = 0$ với mọi $t < t _ { 0 }$ thì $y ( t ) = 0$ với mọi $t < t _ { 0 }$ . Với hệ thống rời rạc: với mọi $n _ { 0 }$ , khi $x [ n ] = 0$ với mọi $n < n _ { 0 }$ thì $y [ n ] = 0$ với mọi $n < n _ { 0 }$ 

Nhận xét. Bản thân một phương trình vi phân (hoặc sai phân) chưa xác định duy nhất đầu ra ứng với một đầu vào cho trước: nghiệm còn phụ thuộc vào các điều kiện đầu. Phương trình chỉ mô tả một hệ thống LTI nhân quả khi đi kèm điều kiện nghỉ ban đầu (định nghĩa 2.1) [1]. Khi điều kiện đầu khác không, đầu ra bằng tổng của đáp ứng với đầu vào (khi điều kiện đầu bằng không) và đáp ứng do riêng điều kiện đầu gây ra (khi đầu vào bằng không); hệ thống khi đó không tuyến tính, vì đầu vào bằng không vẫn cho đầu ra khác không. Trong sách này, khi nói một hệ thống LTI được biểu diễn bởi phương trình vi phân $/$ sai phân tuyến tính hệ số hằng, ta luôn ngầm hiểu là có điều kiện nghỉ ban đầu. 

## 2.5.1. Phương trình vi phân tuyến tính hệ số hằng

Xét hệ thống liên tục với đầu vào $x ( t )$ , đầu ra $y ( t )$ . Mối quan hệ giữa đầu vào và đầu ra của hệ thống được biểu diễn bởi phương trình vi phân tuyến tính hệ số hằng dưới đây 

$$
\sum_ {k = 0} ^ {N} a _ {k} \frac {d ^ {k}}{d t ^ {k}} y (t) = \sum_ {k = 0} ^ {M} b _ {k} \frac {d ^ {k}}{d t ^ {k}} x (t)\tag{2.9}
$$

Cho trước đầu vào $x ( t )$ , người ta có thể tìm được đầu ra $y ( t )$ tương ứng bằng cách giải phương trình vi phân này. Chi tiết về giải phương trình vi phân có thể được tìm hiểu trong nhiều tài liệu toán cao cấp. Dưới đây là các bước cơ bản nhất để giải phương trình vi phân tuyến tính hệ số hằng. 

(1) Tìm $y _ { h } ( t )$ là nghiệm tổng quát của phương trình thuần nhất 

$$
\sum_ {k = 0} ^ {N} a _ {k} \frac {d ^ {k}}{d t ^ {k}} y (t) = 0
$$

Giả sử $a _ { N } \neq 0$ và gọi $r _ { i }$ là các nghiệm của phương trình đặc trưng $\begin{array} { r } { \sum _ { k = 0 } ^ { N } a _ { k } r ^ { k } = } \end{array}$ 0. Nếu phương trình đặc trưng có N nghiệm phân biệt $r _ { 1 } , \ldots , r _ { N }$ thì 

$$
y _ {h} (t) = \sum_ {i = 1} ^ {N} c _ {i} e ^ {r _ {i} t}
$$

Nếu $r _ { i }$ là nghiệm bội m thì m số hạng tương ứng với nó trong tổng trên là $\left( c _ { i , 0 } + c _ { i , 1 } t + \cdot \cdot \cdot + c _ { i , m - 1 } t ^ { m - 1 } \right) e ^ { r _ { i } t }$ 

(2) Tìm nghiệm riêng $y _ { p } ( t )$ của (2.9). Khi $x ( t )$ là hàm mũ, đa thức, hàm sin/cos (hoặc tích của chúng), $y _ { p } ( t )$ thường được chọn có cùng dạng với $x ( t )$ với các hệ số cần xác định. Nếu dạng này trùng với một thành phần của $y _ { h } ( t )$ (hiện tượng cộng hưởng) thì phải nhân thêm $t ^ { m }$ , trong đó m là bội của nghiệm đặc trưng tương ứng. 

(3) Tìm các hệ số của nghiệm tổng quát sao cho nghiệm $y ( t ) = y _ { h } ( t ) + y _ { p } ( t )$ thỏa mãn các điều kiện đầu. 

Ví dụ 2.8. Xét mạch điện RC: $y ( t ) + R C { \frac { d } { d t } } y ( t ) = x ( t )$ . Tìm $y ( t ) \ ( t > 0 )$ khi a ${ \boldsymbol { x } } ( t ) = \cos ( { \Omega _ { 0 } t } ) { \boldsymbol { u } } ( t ) \ \mathrm { v a } \ y ( 0 ) = 2 \ \mathrm { [ V ] } , \ R = 1 \ \mathrm { [ 2 ] } , \ C = 1 \ \mathrm { [ F ] }$ 

Lời giải. Với $R C = 1 ~ [ \mathrm { s ] }$ , phương trình trở thành 

$$
\frac {d}{d t} y (t) + y (t) = \cos (\Omega_ {0} t), \quad t > 0
$$

Phương trình đặc trưng $r + 1 = 0$ có nghiệm $r = - 1$ , do đó $y _ { h } ( t ) = c e ^ { - t } . \mathrm { V i } - 1 \neq$ $\pm j \Omega _ { 0 }$ nên không có cộng hưởng, ta chọn nghiệm riêng dạng $y _ { p } ( t ) = A \cos ( \Omega _ { 0 } t ) +$ B sin $( \Omega _ { 0 } t )$ . Thay vào phương trình: 

$$
\left(A + B \Omega_ {0}\right) \cos (\Omega_ {0} t) + \left(B - A \Omega_ {0}\right) \sin (\Omega_ {0} t) = \cos (\Omega_ {0} t)
$$

Đồng nhất hệ số, $A + B \Omega _ { 0 } = 1$ và $B - A \Omega _ { 0 } = 0$ , suy ra 

$$
A = \frac {1}{1 + \Omega_ {0} ^ {2}}, \qquad B = \frac {\Omega_ {0}}{1 + \Omega_ {0} ^ {2}}
$$

Điều kiện đầu $y ( 0 ) = c + A = 2$ cho $\begin{array} { r } { c = 2 - \frac { 1 } { 1 + \Omega _ { 0 } ^ { 2 } } } \end{array}$ . Vậy 

$$
y (t) = \left(2 - \frac {1}{1 + \Omega_ {0} ^ {2}}\right) e ^ {- t} + \frac {\cos (\Omega_ {0} t) + \Omega_ {0} \sin (\Omega_ {0} t)}{1 + \Omega_ {0} ^ {2}} [ \mathrm{V} ], \quad t \geq 0
$$

Lưu $\acute { \mathrm { y } }$ rằng điều kiện đầu $y ( 0 ) = 2 \ [ \mathrm { V } ]$ khác không, nên ví dụ này không thỏa mãn điều kiện nghỉ ban đầu. Đầu ra ở trên là tổng của đáp ứng do riêng điều kiện đầu, 

 

$2 e ^ { - t }$ , và đáp ứng với đầu vào khi điều kiện đầu bằng không, 

$$
- \frac {e ^ {- t}}{1 + \Omega_ {0} ^ {2}} + \frac {\cos (\Omega_ {0} t) + \Omega_ {0} \sin (\Omega_ {0} t)}{1 + \Omega_ {0} ^ {2}}
$$

Chỉ thành phần thứ hai mới bằng $x ( t ) * h ( t )$ với $h ( t ) = e ^ { - t } u ( t )$ 

## 2.5.2. Phương trình sai phân tuyến tính hệ số hằng

Xét hệ thống rời rạc với đầu vào $x [ n ]$ , đầu ra $y [ n ]$ . Tương tự như trường hợp liên tục, mối quan hệ giữa đầu vào và đầu ra của hệ thống rời rạc có thể được biểu diễn thông qua phương trình sai phân tuyến tính hệ số hằng dưới đây. 

$$
\sum_ {k = 0} ^ {N} a _ {k} y [ n - k ] = \sum_ {k = 0} ^ {M} b _ {k} x [ n - k ]\tag{2.10}
$$

Nhận xét. Phương trình sai phân (2.10) có cách giải tương tự như giải phương trình vi phân (2.9), ngoài một số khác biệt liệt kê dưới đây. 

Nghiệm tổng quát (khi phương trình đặc trưng có N nghiệm phân biệt): 

$$
y _ {h} [ n ] = \sum_ {i = 1} ^ {N} c _ {i} r _ {i} ^ {n}
$$

Nếu $r _ { i }$ là nghiệm bội m thì các số hạng tương ứng là 

$$
\left(c _ {i, 0} + c _ {i, 1} n + \dots + c _ {i, m - 1} n ^ {m - 1}\right) r _ {i} ^ {n}
$$

Phương trình đặc trưng: 

$$
\sum_ {k = 0} ^ {N} a _ {k} r ^ {N - k} = 0
$$

Tùy theo chiều dài của đáp ứng xung, người ta phân hệ thống LTI rời rạc thành hai loại: 

FIR (finite impulse response): đáp ứng xung $h [ n ]$ có chiều dài hữu hạn; 

IIR (infinite impulse response): đáp ứng xung $h [ n ]$ có chiều dài vô hạn. 

Khi $N = 0$ , phương trình (2.10) không chứa các số hạng $y [ n - k ]$ với $k \geq 1$ , đầu ra chỉ là tổ hợp tuyến tính của $M + 1$ mẫu đầu vào, nên hệ thống chắc chắn là FIR. Ngược lại, $N > 0$ chưa đủ để kết luận hệ thống là IIR. Chẳng hạn, hệ thống 

$$
y [ n ] - y [ n - 1 ] = x [ n ] - x [ n - 4 ]
$$

có $N \ = \ 1$ nhưng là hệ thống FIR. Thật vậy, cho $x [ n ] = \delta [ n ]$ và tính đệ quy $h [ n ] = h [ n - 1 ] + \delta [ n ] - \delta [ n - 4 ]$ với $h [ n ] = 0$ khi $n < 0$ (điều kiện nghỉ ban đầu), ta được $h [ 0 ] = h [ 1 ] = h [ 2 ] = h [ 3 ] = 1$ và $h [ n ] = 0$ với mọi $n \geq 4$ , tức là 

$$
h [ n ] = \{1, 1, 1, 1 \}
$$

Hiện tượng này sẽ được giải thích bằng sự triệt tiêu giữa điểm cực và điểm không trong chương $5 .$ . 

Khi $N = 0 ,$ ta có thể dễ dàng tìm được đáp ứng xung của hệ thống. Ví dụ như, cho hệ thống được biểu diễn bởi phương trình sai phân sau 

$$
y [ n ] = 3 x [ n ] - x [ n - 1 ] + 2 x [ n - 3 ] - 5 x [ n - 4 ]
$$

Do đáp ứng xung $h [ n ]$ được định nghĩa là đầu ra của hệ thống khi đầu vào là hàm xung đơn vị nên ta có 

$$
\begin{array}{c} {h [ n ] = 3 \delta [ n ] - \delta [ n - 1 ] + 2 \delta [ n - 3 ] - 5 \delta [ n - 4 ]} \\ {= \{\underset {\uparrow} {3}, - 1, 0, 2, - 5 \}} \end{array}
$$

## 2.6. Sơ đồ thực hiện hệ thống LTI

Trên cơ sở biểu diễn hệ thống qua phương trình vi phân $/$ sai phân tuyến tính hệ số hằng, người ta có thể xây dựng được sơ đồ thực hiện hệ thống LTI. 

## 2.6.1. Các phần tử cơ bản

Để xây dựng sơ đồ thực hiện hệ thống được biểu diễn bởi các phương trình (2.9) và (2.10), người ta sử dụng các phần tử cơ bản bao gồm: phần tử nhân với hằng số, phần tử cộng, và phần tử trễ (với hệ thống liên tục là phần tử lấy đạo hàm) như trong hình 2.16. Lưu ý rằng ký hiệu D trong hình có $\acute { \mathrm { y } }$ nghĩa khác nhau trong hai trường hợp: với hệ thống rời rạc, D là phần tử trễ một mẫu; với hệ thống liên tục, D là phần tử lấy đạo hàm. Khi điều kiện đầu bằng không, hai phần tử này lần lượt tương ứng với phép nhân với $z ^ { - 1 }$ trên miền z (chương 5) và phép nhân với s trên miền Laplace (chương 6). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/a712cbc6150e32d69d7e428dab14a3fa720e88ac31bcf4df977a0eab1e47494a.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7728b6bba2012ffa6e29aa49c2055c6667a3621b968d2af8603a950d71623548.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/77973d2690b08437e291c563948f04172d6909d626a60d17bda931ed193658cc.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/085feb4063a4f466fc960573454d268dd409be621d928be308cc7f56e424df7d.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4c00bb35def9e937b52dfb6c7c9dbfcb8deffd560b8e76c24cca0aeb2ee58ec5.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/6ef447c5e55828e7115cdbbc580f3f259a2205d41464d40762280ba166617f31.jpg)



Hình 2.16. Các phần tử cơ bản thực hiện hệ thống LTI


## 2.6.2. Dạng trực tiếp I

Giả sử $a _ { 0 } \neq 0$ . Chia hai vế của (2.10) cho $a _ { 0 }$ (tức là chuẩn hóa để $a _ { 0 } = 1 )$ rồi viết lại phương trình sai phân về dạng dưới $\mathrm { \hat { d a y } }$ 

$$
y [ n ] = - \sum_ {k = 1} ^ {N} a _ {k} y [ n - k ] + \sum_ {r = 0} ^ {M} b _ {r} x [ n - r ]\tag{2.11}
$$

Khi $\begin{array} { r } { \dot { \mathrm { d } } \acute { \mathrm { o } } , } \end{array}$ ta có thể dễ dàng vẽ được sơ đồ thực hiện hệ thống như trong hình 2.17, còn gọi là dạng trực tiếp I. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b9a2f906aa1f26aacc89d3e6eb881c2aedf85a5f8d463bbca57febaed2c6c07a.jpg)



Hình 2.17. Dạng trực tiếp I


Ví dụ 2.9. Hãy vẽ sơ đồ cho hệ thống LTI được biểu diễn bởi phương trình sai phân tuyến tính hệ số hằng sau 

$$
y [ n ] - 3 y [ n - 1 ] = 5 x [ n ] - 2 x [ n - 1 ] + 4 x [ n - 2 ]
$$

Lời giải. Viết lại phương trình trên về dạng 

$$
y [ n ] = 5 x [ n ] - 2 x [ n - 1 ] + 4 x [ n - 2 ] + 3 y [ n - 1 ]
$$

Từ đó, chúng ta có thể dễ dàng vẽ được sơ $\mathrm { d } \hat { \boldsymbol { \mathrm { o } } }$ như trong hình 2.18. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/888d63e6e436f4855feea650eb686c5be28ef4cb512429ca326a0a82c9c602ca.jpg)



Hình 2.18. Ví dụ về dạng trực tiếp I


Ngoài ra, trong một số trường hợp đơn giản, từ sơ đồ thực hiện hệ thống chúng ta có thể tìm lại được phương trình sai phân. 

 

Ví dụ 2.10. Cho hệ thống LTI được biểu diễn bởi sơ đồ như trong hình 2.19. Hãy tìm phương trình sai phân mô tả cho hệ thống này. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1bbbdbc947b33888d2ab3ff546f868ffaa85c1292f39c1f19a8a068100edfabb.jpg)



Hình 2.19. Ví dụ về sơ đồ thực hiện hệ thống


Lời giải. Đặt tín hiệu trung gian $y _ { 1 } [ n ]$ như trong hình. Mối quan hệ giữa tín hiệu này và đầu ra $y [ n ]$ sẽ là 

$$
y [ n ] = 2 y _ {1} [ n ]
$$

Do đó, 

$$
y _ {1} [ n ] = \frac {1}{2} y [ n ]
$$

Mặt khác, từ sơ đồ ta có mối quan hệ giữa $y _ { 1 } [ n ]$ và đầu vào $x [ n ]$ như sau 

$$
y _ {1} [ n ] = - \left(5 x [ n ] - 2 x [ n - 1 ] + 4 x [ n - 2 ] + 3 y _ {1} [ n - 1 ]\right)
$$

Thay vào, ta được 

$$
\frac {1}{2} y [ n ] = - \left(5 x [ n ] - 2 x [ n - 1 ] + 4 x [ n - 2 ] + \frac {3}{2} y [ n - 1 ]\right)
$$

Phương trình sai phân cho hệ thống sẽ là 

$$
y [ n ] = - 1 0 x [ n ] + 4 x [ n - 1 ] - 8 x [ n - 2 ] - 3 y [ n - 1 ]\tag{2.12}
$$

Phương trình sai phân (2.12) sẽ cho ra sơ đồ dạng trực tiếp I như trong hình 2.20. Như vậy, cùng một hệ thống có thể có nhiều sơ đồ thực hiện. Ưu điểm của sơ đồ dạng trực tiếp là các hệ số nhân chính là các hệ số của phương trình sai phân (2.12), nên có thể vẽ ngay từ phương trình mà không cần biến đổi. Sơ đồ dạng trực tiếp I dùng $M + N + 1$ bộ nhân và $M + N$ bộ cộng (hai đầu vào). Với các hệ số tùy ý, đây là số lượng nhỏ nhất: sau khi chuẩn hóa $a _ { 0 } = 1$ , phương trình sai phân có $M + N + 1$ hệ số độc lập, mỗi hệ số cần một bộ nhân, và cần ít nhất $M + N$ phép cộng để gộp $M + N + 1$ tích lại với nhau. Số lượng này có thể giảm trong một số trường hợp đặc biệt, chẳng hạn khi có hệ số bằng 0 hoặc 1. Trong ví dụ này $( M = 2 , N = 1 )$ , sơ đồ dạng trực tiếp I dùng 4 bộ nhân, so với 6 bộ nhân ở sơ đồ ban đầu. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/81078d7176df64ca87d158c5b04d5d35ef6f78ce383159e11f3e63044cce667b.jpg)



Hình 2.20. Sơ đồ dạng trực tiếp cho hệ thống trong ví dụ 2.10


## 2.6.3. Dạng trực tiếp II

Ngoài ra, từ (2.11), người ta cũng có thể vẽ sơ đồ thực hiện hệ thống như trong hình 2.21. So với dạng trực tiếp I, sơ đồ dạng trực $\mathrm { t i \acute { e } p }$ II có cùng số phần tử nhân và phần tử cộng, nhưng chỉ cần max $( M , N )$ phần tử trễ thay vì $M + N$ (khi $M = N$ số phần tử trễ giảm đi một nửa). Số phần tử trễ này bằng bậc của phương trình sai phân, nên sơ đồ dạng trực tiếp II còn được gọi là dạng chính tắc (canonic form) về số phần tử trễ. 

Để hiểu chi tiết hơn về dạng trực tiếp II này, chúng ta hãy xem xét một số ví dụ sau. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/6d86c3a8258c19d817ee61428c562fb81f14efc42eb39538afc350ae8422bf72.jpg)



Hình 2.21. Dạng trực tiếp II


Ví dụ 2.11. Hãy vẽ sơ đồ thực hiện cho hệ thống LTI được biểu diễn bởi phương trình sai phân sau 

$$
y [ n ] = 3 x [ n ] - 5 x [ n - 1 ] + 2 x [ n - 2 ] - 6 y [ n - 1 ] + 4 y [ n - 2 ]
$$

Chúng ta có thể dễ dàng vẽ được dạng trực tiếp I như trong hình 2.22. 

Có thể thấy sơ đồ này bao gồm hai hệ thống con ghép nối tiếp với nhau. Hai hệ thống con này đều là LTI với điều kiện nghỉ ban đầu, tức là giá trị ban đầu lưu trong các phần tử trễ bằng không. Từ tính chất giao hoán của phép chập, chúng ta đã biết là nếu đổi thứ tự trước sau của hai hệ thống con này thì ta vẫn có một sơ đồ tương đương như trong hình 2.23. Quan sát sơ đồ này, ta thấy hai điểm $A _ { 1 }$ và $A _ { 2 }$ được nối với nhau nhưng ở giữa không có bất cứ bộ nhân, cộng hay trễ nào. Do vậy tín hiệu tại $A _ { 1 }$ và $A _ { 2 }$ là giống hệt nhau. Sau khi qua một bộ trễ (trên mỗi nhánh), tín hiệu tại các điểm $B _ { 1 }$ và $B _ { 2 }$ cũng giống hệt nhau. Tiếp tục qua một bộ trễ nữa, tín hiệu tại các điểm $C _ { 1 }$ và $C _ { 2 }$ cũng giống hệt nhau. Do đó, ta có thể nối trực tiếp $B _ { 1 }$ với $B _ { 2 } ,$ , và bỏ đi một bộ trễ. Có thể nối trực tiếp $C _ { 1 }$ với $C _ { 2 }$ và bỏ đi một bộ trễ nữa. Khi đó, ta sẽ được sơ đồ rút gọn như hình 2.24. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/f82d6c3771085c9012306a5a6fb15960d7e8ffb8457c34b78546c2aab94af0a4.jpg)



Hình 2.22. Dạng trực tiếp I cho ví dụ 2.11


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/62f0296fedbbf1aa830301bd5311587265c18ed4dd510d687aa4e7a214933dd6.jpg)



Hình 2.23. Đổi thứ tự hai hệ thống con


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/ddb1cddb1308347968bc38d09dbbffee44e60c7ee3fa86b04d3bb7e406850cdd.jpg)



Hình 2.24. Sơ đồ rút gọn cho ví dụ 2.11: dạng trực tiếp II


Ngoài ra, từ sơ đồ dạng trực tiếp II trong hình 2.24, chúng ta cũng có thể tìm ra được phương trình sai phân của hệ thống như sau. Đặt tín hiệu trung gian tại điểm A là g[n], mối quan hệ giữa đầu vào x[n] với g[n] được biểu diễn qua phương trình 

$$
g [ n ] = x [ n ] - 6 g [ n - 1 ] + 4 g [ n - 2 ]
$$

mối quan hệ giữa đầu ra y[n] với g[n] được biểu diễn qua phương trình 

$$
y [ n ] = 3 g [ n ] - 5 g [ n - 1 ] + 2 g [ n - 2 ]
$$

thay phương trình trên xuống phương trình dưới, ta được 

$$
\begin{array}{r l} & y [ n ] = 3 (x [ n ] - 6 g [ n - 1 ] + 4 g [ n - 2 ]) \\ & \qquad - 5 (x [ n - 1 ] - 6 g [ n - 2 ] + 4 g [ n - 3 ]) \\ & \qquad + 2 (x [ n - 2 ] - 6 g [ n - 3 ] + 4 g [ n - 4 ]) \end{array}
$$

Gom các số hạng của phương trình trên theo cột, 

$$
\begin{array}{l} y [ n ] = 3 x [ n ] - 5 x [ n - 1 ] + 2 x [ n - 2 ] \\ \quad - 6 (3 g [ n - 1 ] - 5 g [ n - 2 ] + 2 g [ n - 3 ]) \\ \quad + 4 (3 g [ n - 2 ] - 5 g [ n - 3 ] + 2 g [ n - 4 ]) \end{array}
$$

Thay mối quan hệ giữa đầu ra và $g [ n ]$ vào hai dòng dưới, ta có kết quả cuối cùng 

$$
y [ n ] = 3 x [ n ] - 5 x [ n - 1 ] + 2 x [ n - 2 ] - 6 y [ n - 1 ] + 4 y [ n - 2 ]
$$

## 2.7. Phép tương quan

Để so sánh mức độ giống nhau giữa hai tín hiệu, người ta dùng phép tương quan như định nghĩa dưới đây. 

Tương quan chéo giữa hai tín hiệu: 

$$
\begin{array}{l} r _ {x y} [ n ] = \sum_ {m = - \infty} ^ {\infty} x [ m ] y ^ {*} [ m - n ] \\ r _ {x y} (t) = \int_ {- \infty} ^ {\infty} x (\tau) y ^ {*} (\tau - t) d \tau \end{array}
$$

Từ định nghĩa trên, so sánh với phép chập giữa hai tín hiệu, 

$$
\begin{array}{l} x [ n ] * y [ n ] = \sum_ {m = - \infty} ^ {\infty} x [ m ] y [ n - m ] \\ x (t) * y (t) = \int_ {- \infty} ^ {\infty} x (\tau) y (t - \tau) d \tau \end{array}
$$

ta thấy, phép tương quan chéo có thể coi như là phép chập của một tín hiệu với liên hợp phức của phiên bản đảo thời gian của tín hiệu kia, tức là 

$$
\begin{array}{r} r _ {x y} [ n ] = x [ n ] * y ^ {*} [ - n ] \\ r _ {x y} (t) = x (t) * y ^ {*} (- t) \end{array}
$$

Từ đó, chúng ta dễ dàng suy ra các bước để tính tương quan chéo giữa hai tín hiệu, đồng thời có được các tính chất của phép tương quan chéo. 

Ví dụ 2.12. Tính tương quan chéo của hai dãy sau đây 

$$
x [ n ] = \{1, - 2, 0, \underset {\uparrow} {3}, 1 \}
$$

$$
y [ n ] = \{- 2, 0. 5, 4, 1, - 1 \}
$$

Lời giải. Do các dãy $x [ n ] , y [ n ]$ trong ví dụ này đều là dãy số thực nên chúng ta không cần quan tâm đến toán tử lấy liên hợp phức nữa. Các bước tính tương quan chéo trên đồ thị cũng tương tự như khi tính chập (chi tiết trong phần 2.1.1), chỉ khác là ở đây chúng ta bỏ qua bước đảo thời gian (lấy đối xứng qua trục tung). 

Kết quả cuối cùng là 

$$
r _ {x y} [ n ] = \{- 1, 3, 2, - 1 0. 5, - 1, 1 7, \underset {\uparrow} {5. 5}, - 5. 5, - 2 \}
$$

Ta thấy $r _ { x y } [ n ]$ nhận giá trị lớn nhất tại $n = - 1$ . Điều đó có nghĩa là nếu dịch y[n] sang trái 1 mẫu thì hai tín hiệu x[n] và $y [ n + 1 ]$ giống nhau nhất.  

Ngoài ra, hàm tự tương quan của một tín hiệu được định nghĩa là tương quan chéo giữa một tín hiệu với chính nó. 

$$
r _ {x x} [ n ] = \sum_ {m = - \infty} ^ {\infty} x [ m ] x ^ {*} [ m - n ]
$$

$$
r _ {x x} (t) = \int_ {- \infty} ^ {\infty} x (\tau) x ^ {*} (\tau - t) d \tau
$$

Với tín hiệu năng lượng (năng lượng $E _ { x }$ hữu hạn), hàm tự tương quan có hai tính chất sau (viết cho trường hợp rời rạc; trường hợp liên tục tương tự). 

Giá trị tại gốc bằng năng lượng của tín hiệu, $\begin{array} { r } { r _ { x x } [ 0 ] = \sum _ { m = - \infty } ^ { \infty } | x [ m ] | ^ { 2 } = E _ { x } , } \end{array}$ và đây là giá trị có độ lớn lớn nhất: $| r _ { x x } [ n ] | \leq r _ { x x } [ 0 ]$ với mọi n. Bất đẳng thức này là hệ quả của bất đẳng thức Cauchy–Schwarz. 

Đối xứng liên hợp: $r _ { x x } [ - n ] = r _ { x x } ^ { * } [ n ]$ . Khi x[n] là tín hiệu thực, $r _ { x x } [ n ]$ là hàm chẵn. 

Python. Để tính tương quan chéo trên Python, ta có thể dùng hàm có sẵn np.correlate của NumPy với tham số mode=’full’ (hàm này tự lấy liên hợp phức của đối số thứ hai), hoặc tính thông qua phép chập như sau $\left( \mathbb { y } \left[ : : : - 1 \right] \right.$ đảo thứ tự mảng, hàm np.conj lấy liên hợp phức, cần thiết khi y[n] là tín hiệu phức). Với dữ liệu của ví dụ 2.12, cả r1 và r2 đều cho dãy $\{ - 1 , 3 , 2 , - 1 0 . 5 , - 1 , 1 7 , 5 . 5 , - 5 . 5 , - 2 \}$ ; vị trí gốc thời gian được xác định giống như khi dùng np.convolve. 

```python
import numpy as np
x = np.array([1, -2, 0, 3, 1])
y = np.array([-2, 0.5, 4, 1, -1])
r1 = np.correlate(x, y, mode='full')
r2 = np.convolve(x, np.conj(y[::-1])) 
```

Tương quan là một phép toán dùng rất nhiều trong các hệ thống thông tin số, khi phải thực hiện phép so sánh giữa tín hiệu thu được với các mẫu khác nhau để đưa ra quyết định xem tín hiệu phát đi nhiều khả năng nhất là mẫu nào. Ngoài ra, tương quan cũng là phép toán cơ bản dùng trong các lớp (layer) của mạng nơ-ron trong lĩnh vực trí tuệ nhân tạo. 

Sau đây, chúng ta xem xét một ứng dụng cơ bản trong lĩnh vực radar: phát hiện và xác định vị trí của mục tiêu. Một hệ thống radar sẽ phát tín hiệu vào không gian tự do, khi gặp mục tiêu (cụ thể là máy bay) thì sẽ xuất hiện sóng phản xạ, và căn cứ vào thời điểm nhận được sóng phản $\mathrm { \mathbf { X } \mathbf { a } }$ (so với thời điểm phát sóng) thì sẽ đo được khoảng cách từ mỗi radar tới mục tiêu, từ đó xác định được vị trí của máy bay. Bài toán rút gọn lại như sau. 

Giả sử radar phát đi sóng x(t), sau khi gặp mục tiêu, phản xạ lại, tín hiệu thu được sẽ là 

$$
y (t) = \alpha x (t - \tau) + n (t)
$$

trong đó, α là hệ số suy hao, τ là thời gian truyền (từ lúc phát đi, phản xạ cho đến khi nhận lại), và $n ( t )$ là nhiễu (do chuyển động nhiệt trong linh kiện điện tử, do tác động từ môi trường như bụi, mưa và các hiệu ứng khác). Mặc dù tín hiệu bị suy hao đi nhiều, chúng ta có thể khuếch đại tín hiệu lên, nhưng khi đó nhiễu cũng bị khuếch đại lên tương ứng. Hình 2.25 minh họa cho tín hiệu phát đi (hình sin) và tín hiệu thu được (sau khuếch đại, có trễ và nhiễu). Ta thấy rằng, bằng mắt thường không thể phát hiện được xem liệu trong tín hiệu thu được có tín hiệu phát đi hay không, chưa nói đến khoảng thời gian trễ. 

Tuy nhiên, nếu thực hiện $\mathrm { p h e p }$ tương quan chéo $r _ { y x } ( t ) = y ( t ) * x ^ { * } ( - t )$ giữa tín hiệu thu được $y ( t )$ và tín hiệu phát đi $x ( t )$ , ta sẽ có kết quả như trong hình 2.26: vị trí đỉnh của hàm tương quan chéo cho biết thời gian truyền (khi bỏ qua nhiễu, $r _ { y x } ( t ) = \alpha r _ { x x } ( t - \tau )$ đạt độ lớn cực đại tại $t = \tau )$ , ở đây $\tau = 0 . 8 8$ s (trường hợp $\mathrm { S N R } = 2 0 ~ \mathrm { d B } )$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/10a3296d191fc649df084928df4508ca61b9efb56e30ceafd56b04992f32a100.jpg)



(a) Tín hiệu phát đi x(t)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/3b499a8114ea9fdbdaf83af5e1febe83fed4fef0a246452f738699cd78593a30.jpg)



(b) Tín hiệu thu được y(t)



Hình 2.25. Tín hiệu phát đi và tín hiệu thu được trong hệ thống radar


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/303744c6d11d44e166cb9f4faa3facceef028c4e290888086811df95798e4912.jpg)



Hình 2.26. Hàm tương quan chéo $r _ { y x } ( t )$ giữa tín hiệu thu được $y ( t )$ và tín hiệu phát đi x(t) (nét đứt: độ trễ thực τ)


## Tóm tắt chương

Hệ thống LTI được đặc trưng hoàn toàn bởi đáp ứng xung $h [ n ]$ (hoặc $h ( t ) )$ đầu ra bằng phép chập giữa đầu vào và đáp ứng xung, $y [ n ] = x [ n ] * h [ n ] \ ( \mathrm { t { \dot { o } n g } }$ chập) hoặc $y ( t ) = x ( t ) * h ( t )$ (tích phân chập). Phép chập rời rạc có thể tính bằng đồ thị, bằng cách kẻ bảng hoặc bằng phép nhân ma trận. 

Tính trực tiếp phép chập giữa hai dãy có chiều dài hữu hạn L và P (đầu ra dài $L + P - 1 )$ ) cần LP phép nhân và $L P - ( L + P - 1 ) = ( L - 1 ) ( P - 1 )$ ) phép cộng (không tính các phép nhân với 0). 

Kênh đa đường $\begin{array} { r } { y ( t ) = \sum _ { i } \alpha _ { i } x ( t - \tau _ { i } ) } \end{array}$ (bỏ qua nhiễu, $\alpha _ { i } , \tau _ { i }$ không đổi theo thời gian) là hệ thống LTI có đáp ứng xung $\begin{array} { r } { h ( t ) = \sum _ { i } \alpha _ { i } \delta ( t - \tau _ { i } ) } \end{array}$ : mỗi xung ứng với một đường truyền, với hệ số suy hao $\alpha _ { i }$ và độ trễ $\tau _ { i }$ 

Khi các phép chập liên quan tồn tại, phép chập có tính giao hoán, kết hợp và phân phối với phép cộng. Ghép nối tiếp hai hệ thống LTI tương ứng với chập các đáp ứng xung; ghép song song tương ứng với cộng các đáp ứng xung. 

Với hệ thống LTI, các tính chất của hệ thống có thể được xác định trực tiếp từ đáp ứng xung h[n] (hoặc h(t)): 

– không có nhớ khi và chỉ khi $h [ n ] = C \delta [ n ] ;$ 

nhân quả khi và chỉ khi $h [ n ] = 0$ với mọi $n < 0 ;$ 

– ổn định BIBO khi và chỉ khi $\scriptstyle \sum _ { n = - \infty } ^ { \infty } | h [ n ] | < \infty ;$ 

– khả nghịch khi và chỉ khi tồn tại $h _ { 1 } [ n ]$ sao cho $h [ n ] * h _ { 1 } [ n ] = \delta [ n ] .$ 

Đáp ứng nhảy liên hệ với đáp ứng xung qua $\begin{array} { r } { s [ n ] = \sum _ { k = - \infty } ^ { n } h [ k ] } \end{array}$ và $h [ n ] =$ $s [ n ] - s [ n - 1 ]$ . Với hệ thống ổn định, s[n] tiến tới giá trị xác lập $\scriptstyle \sum _ { k = - \infty } ^ { \infty } h [ k ]$ Giai đoạn quá độ của đáp ứng nhảy được đặc trưng bởi thời gian lên $t _ { r }$ , thời điểm đỉnh $t _ { p } ,$ độ vọt lố cực đại $M _ { p }$ và thời gian xác lập $t _ { s }$ . 

Phương trình vi phân / sai phân tuyến tính hệ số hằng mô tả một hệ thống LTI nhân quả khi có điều kiện nghỉ ban đầu (định nghĩa 2.1). Hệ thống rời rạc được phân thành FIR hoặc IIR theo chiều dài của h[n]; N = 0 là điều kiện đủ (nhưng không cần) để hệ thống là FIR. 

Sơ đồ dạng trực tiếp I và dạng trực tiếp II cùng dùng $M + N + 1$ bộ nhân và $M + N$ bộ cộng; dạng trực tiếp I cần $M + N$ phần tử trễ, dạng trực tiếp II chỉ cần max(M, N) phần tử trễ. 

Tương quan chéo $r _ { x y } [ n ] = x [ n ] * y ^ { * } [ - n ]$ đo mức độ giống nhau giữa hai tín hiệu theo độ dịch $n ,$ và được dùng để ước lượng độ trễ, chẳng hạn trong radar. 

## Bài tập

1. Cho $x [ n ] = \{ 1 , 2 , 3 \}$ . Tính $y [ n ] = x [ n ] * h [ n ]$ trong các trường hợp sau, và cho biết mỗi hệ thống đã thực hiện phép toán $\mathrm { g \hat { 1 } }$ trên đầu vào. 

(a) $h [ n ] = \delta [ n - 2 ]$ 

(b) $h [ n ] = \delta [ n ] - \delta [ n - 1 ]$ 

(c) $h [ n ] = u [ n ]$ 

2. Cho hệ thống LTI rời rạc với đầu vào $x [ n ] = \{ 3 , 2 , - 1 , \underset { \uparrow } { 4 } , - 5 , 0 , - 2 \}$ , và đáp ứng xung $h [ n ] = \{ 2 , 0 , \frac { - 3 , 1 , 4 } { \uparrow } \}$ . Hãy tính đầu ra $y [ n ]$ 

3. Tính các phép chập sau: 

(a) $( 0 . 6 ) ^ { n } u [ n ] * ( - 0 . 4 ) ^ { n } u [ n ]$ 

(b) $( 0 . 5 ) ^ { n } u [ n ] * ( 0 . 5 ) ^ { n } u [ n ]$ 

(c) $( 1 / 3 ) ^ { n - 1 } u [ n - 1 ] * u [ n + 2 ]$ 

Gợi ý: với $\begin{array} { r } { \alpha \stackrel { . } { \neq } \beta , \stackrel { . } { \sum _ { k = 0 } ^ { n } } \alpha ^ { k } \beta ^ { n - k } = \frac { \alpha ^ { n + 1 } - \beta ^ { n + 1 } } { \alpha - \beta } } \end{array}$ . Ở câu (c), trước hết hãy xác định giá trị n nhỏ nhất để $y [ n ] \neq 0$ 

4. Bộ lọc trung bình trượt M điểm (M nguyên dương) có quan hệ vào ra 

$$
y [ n ] = \frac {1}{M} \sum_ {k = 0} ^ {M - 1} x [ n - k ]
$$

(a) Tìm đáp ứng xung h[n]. Hệ thống có nhân quả, ổn định không? 

(b) Tìm đáp ứng nhảy s[n] và giá trị xác lập của nó. 

(c) Với $M = 4$ và $x [ n ] = u [ n ] - u [ n - 6 ]$ , tính y[n] bằng cách kẻ bảng. 

5. Dùng kết quả ở mục 2.1.6 (giả sử không có mẫu nào bằng 0). 

(a) Tính trực tiếp phép chập giữa một dãy dài 1000 mẫu và một dãy dài 64 mẫu. Đầu ra dài bao nhiêu mẫu? Cần bao nhiêu phép nhân, bao nhiêu phép cộng? 

(b) Một đoạn âm thanh dài 1 s, lấy mẫu ở tần số 44.1 kHz, được đưa qua một bộ lọc FIR có đáp ứng xung dài 256 mẫu. Cần bao nhiêu phép nhân? Tính trung bình, mỗi mẫu đầu vào cần bao nhiêu phép nhân? 

6. Cho hệ thống LTI liên tục với đầu vào $x ( t ) = u ( t ) - u ( t - 4 )$ , và đáp ứng xung $h ( t ) = ( 1 - t ) [ u ( t + 1 ) - u ( t - 5 ) ]$ . Hãy tính đầu ra $y ( t )$ 

7. Tính các phép chập sau: 

(a) $e ^ { - 2 t } u ( t ) \ast e ^ { - 3 t } u ( t )$ 

(b) $e ^ { - t } u ( t ) \ast e ^ { - t } u ( t )$ 

(c) $e ^ { 2 t } u ( - t ) * e ^ { - t } u ( t )$ (gợi ý: xét riêng hai trường hợp $t < 0$ và $t \geq 0 )$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/c9267a346c2709243c67b05d56529a2f5f037f77659d7a4208e3b01d40640e3d.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/8d789543ce60b37eed1bd4dedc8c8ce918bc86d8d17f5841cb019d019333c57e.jpg)



Hình 2.27. Tín hiệu x(t) và đáp ứng xung h(t) trong bài tập 8


8. Cho tín hiệu $x ( t ) = t \left[ u ( t ) - u ( t - 2 ) \right]$ và đáp ứng xung $h ( t ) = u ( t ) - u ( t - 1 )$ như trong hình 2.27. 

(a) Tính và vẽ $y ( t ) = x ( t ) * h ( t )$ bằng phương pháp đồ thị. Gợi ý: chứng minh rằng $\begin{array} { r } { y ( t ) = \int _ { t - 1 } ^ { t } x ( \tau ) d \tau } \end{array}$ 

(b) Vẽ tín $\mathrm { h i e u ~ } x ( t ) * [ \delta ( t + 1 ) - 2 \delta ( t - 2 ) ]$ 

9. Xung chữ nhật $x ( t ) = u ( t ) - u ( t - T )$ , với $T > 0$ , được truyền qua kênh hai đường có đáp ứng xung $h ( t ) = \delta ( t ) + 0 . 6 \delta ( t - \tau )$ 

(a) Vẽ tín hiệu thu được $y ( t )$ khi $\tau = T / 2$ và khi $\tau = 2 T$ 

(b) Tính năng lượng của y(t) trong hai trường hợp trên, và so sánh với tổng năng lượng của hai thành phần $x ( t )$ và $0 . 6 x ( t - \tau )$ 

(c) Giả sử phát liên tiếp các xung như trên, xung thứ k chiếm khoảng thời gian $[ k T , ( k + 1 ) T )$ . Trong mỗi trường hợp, thành phần trễ của xung thứ k chồng lên khoảng thời gian của những xung nào? 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/91c8cc4aeb62cd28804e3fa7f21211b97862b0438ca0007448505aca06b43541.jpg)



Hình 2.28. Hệ thống ghép nối trong bài tập 10


10. Cho hệ thống ghép nối như trong hình 2.28, với $h _ { 1 } [ n ] = \delta [ n ] - \delta [ n - 1 ] , h _ { 2 } [ n ] =$ u[n] và $h _ { 3 } [ n ] = ( 0 . 5 ) ^ { n } u [ n ]$ 

(a) Tìm đáp ứng $\operatorname { x u n g } h [ n ]$ của cả hệ thống. 

(b) Hệ thống con $h _ { 2 } [ n ]$ có ổn định không? Cả hệ thống có ổn định không? 

(c) Tính đầu ra của cả hệ thống khi $x [ n ] = u [ n ]$ theo hai cách: dùng $h [ n ]$ tìm được ở câu (a), và tính lần lượt qua từng khối. So sánh kết quả. 

11. Hai hệ thống LTI ghép nối tiếp, trong đó hệ thống thứ nhất có đáp ứng xung $h _ { 1 } [ n ] = \{ \underline { { { 1 } } } , 2 \}$ và cả hệ thống có đáp ứng xung $h [ \bar { n } ] = \{ 1 , 1 , - 4 , - 4 \}$ . Tìm đáp ứng xung $h _ { 2 } [ n ]$ của hệ thống thứ hai, biết rằng $h _ { 2 } [ n ]$ là dãy nhân quả có chiều dài hữu hạn. Gợi ý: xác định chiều dài của $h _ { 2 } [ n ]$ , đặt các mẫu của nó là ẩn số, rồi viết phép chập thành một hệ phương trình. 

12. Xét tính nhân quả và tính ổn định của các hệ thống LTI có đáp ứng xung sau: 

(a) $h [ n ] = 2 ^ { n } u [ - n ]$ 

(h) $h ( t ) = e ^ { - 3 t } u ( t + 1 )$ 

(b) $h [ n ] = ( - 0 . 7 ) ^ { n } u [ n - 2 ]$ 

(i) $h ( t ) = e ^ { 2 t } u ( - t - 1 )$ 

(c) $h [ n ] = 3 ^ { n } u [ 2 - n ]$ 

(j) $h ( t ) = t e ^ { - 2 t } u ( t )$ 

(d) $h [ n ] = n ( 0 . 5 ) ^ { n } u [ n ]$ 

(k) $h ( t ) = e ^ { - | t | }$ 

(e) $h [ n ] = \cos ( \pi n / 4 ) u [ n ]$ 

(l) $h ( t ) = u ( t ) - u ( t - 5 )$ 

(f) $\begin{array} { r } { h [ n ] = \frac { 1 } { n } u [ n - 1 ] } \end{array}$ 

(m) $\begin{array} { r } { h ( t ) = \frac { 1 } { 1 + t } u ( t ) } \end{array}$ 

(g) $\begin{array} { r } { h [ n ] = \frac { 1 } { n ^ { 2 } } u [ n - 1 ] } \end{array}$ 

Cuối cùng, chứng minh điều kiện đủ của tính ổn định cho hệ thống liên tục: nếu $\textstyle \int _ { - \infty } ^ { \infty } | h ( t ) | d t < \infty$ thì hệ thống ổn định BIBO (làm tương tự trường hợp rời rạc ở mục 2.3.7). 

13. Hệ thống tạo tiếng vọng rời rạc có đáp ứng xung $h [ n ] = \delta [ n ] + a \delta [ n - N ]$ , trong đó N là số nguyên dương và $a \neq 0$ là hằng số thực. 

(a) Chứng minh rằng $\begin{array} { r } { h _ { 1 } [ n ] = \sum _ { k = 0 } ^ { \infty } ( - a ) ^ { k } \delta [ n - k N ] } \end{array}$ thỏa mãn $h [ n ] { * h _ { 1 } } [ n ] = \delta [ n ]$ tức là $h _ { 1 } [ n ]$ là đáp ứng xung của một hệ thống nghịch đảo. 

(b) Với $a = 0 . 5$ và $N = 3 .$ liệt kê các giá trị $h _ { 1 } [ n ]$ với $0 \leq n \leq 9$ 

(c) Với điều kiện nào của a thì hệ thống nghịch đảo $h _ { 1 } [ n ]$ ở câu (a) ổn định? 

(d) Xét hệ thống liên tục tương ứng $h ( t ) = \delta ( t ) + a \delta ( t - T )$ , với $T > 0$ . Viết điều kiện để hệ thống có đáp ứng xung $h _ { 1 } ( t )$ là hệ thống nghịch đảo của nó, và tìm $h _ { 1 } ( t )$ tương tự câu (a). 

14. Cho hệ thống liên tục có quan hệ vào ra 

$$
y (t) = \int_ {- \infty} ^ {t} e ^ {- 2 (t - \tau)} x (\tau - 1) d \tau
$$

(a) Bằng cách đổi biến, đưa quan hệ trên về dạng tích phân chập. Từ đó chỉ ra rằng hệ thống là LTI và tìm đáp ứng xung $h ( t )$ 

(b) Hệ thống có nhân quả, ổn định không? 

(c) Tìm đầu ra $y ( t )$ khi $x ( t ) = u ( t ) - u ( t - 2 )$ 

15. Tìm đáp ứng nhảy $s [ n ]$ của hệ thống LTI có đáp ứng xung $h [ n ] = ( 0 . 5 ) ^ { n } u [ n ]$ Giá trị xác lập của s[n] khi $n \to \infty$ bằng bao nhiêu? 

16. Một hệ thống LTI liên tục có đáp ứng nhảy $s ( t ) = ( 1 - e ^ { - 2 t } ) u ( t )$ 

(a) Tìm đáp ứng xung h(t). 

(b) Chỉ dùng tính tuyến tính và tính bất biến (không tính phép chập), tìm đầu ra khi $x ( t ) = u ( t ) - u ( t - 1 )$ và khi $x ( t ) = 2 u ( t + 1 ) - u ( t - 2 )$ 

(c) Một hệ thống LTI rời rạc có đáp ứng nhảy $s [ n ] = 0$ với $n < 0 , s [ 0 ] = 1$ 2 $s [ 1 ] = 3 { \mathrm { ~ v { \hat { a } } ~ } } s [ n ] = 4 { \mathrm { ~ v { \hat { o } } i ~ } } n \geq 2$ . Tìm đáp ứng xung $h [ n ]$ . Hệ thống này là FIR hay IIR? 

17. Cho hệ thống LTI nhân quả được mô tả bởi phương trình sai phân $y [ n ] -$ $0 . 5 y [ n - 1 ] = 2 x [ n ] + 3 x [ n - 1 ]$ . Tìm đáp ứng xung $h [ n ]$ , xét tính ổn định của hệ thống và vẽ sơ đồ thực hiện dạng trực tiếp II. 

18. Cho mạch điện RL nối tiếp, với điện áp vào x(t) đặt giữa hai đầu mạch và đầu ra $y ( t )$ là điện áp trên điện trở R. 

(a) Lập phương trình vi phân mô tả quan hệ giữa x(t) và $y ( t )$ 

(b) Với điều kiện nghỉ ban đầu, tìm đáp ứng nhảy $s ( t )$ , rồi suy ra đáp ứng xung h(t). 

(c) Với $R = 1 0 0 \ [ \Omega ] \ \mathrm { v { \dot { a } } } \ L = 1 0$ [mH], tìm thời gian xác lập ứng với dải sai số 2% quanh giá trị xác lập. 

(d) Nếu đầu ra là điện áp trên cuộn cảm thì đáp ứng xung của hệ thống bằng bao nhiêu? 

(e) Với đầu ra là điện áp trên điện trở, tìm thời gian lên $t _ { r }$ và độ vọt lố cực đại $M _ { p }$ 

19. Cho hệ thống LTI rời rạc nhân quả có sơ đồ thực hiện như trong hình 2.29, trong đó D là phần tử trễ một mẫu. 

(a) Đặt tín hiệu tại điểm A là $g [ n ]$ . Viết phương trình sai phân mô tả quan hệ giữa $x [ n ]$ và $y [ n ]$ 

(b) Tính đệ quy các giá trị $h [ n ]$ với $0 \leq n \leq 4 .$ 

(c) Với $n \geq 2 , h [ n ]$ thỏa mãn phương trình thuần nhất. Dùng phương trình đặc trưng, tìm các hằng số $c _ { 1 } , c _ { 2 }$ sao cho $h [ n ] = c _ { 1 } r _ { 1 } ^ { n } + c _ { 2 } r _ { 2 } ^ { n }$ với mọi $n \geq 0$ 2 trong đó $r _ { 1 } , r _ { 2 }$ là các nghiệm đặc trưng. 

(d) Hệ thống là FIR hay IIR? Có ổn định không? 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/29844250e3daa38184e1b9cc008bc8e11838d9b8cad4fe596defd05aacf5ec81.jpg)



Hình 2.29. Sơ đồ thực hiện hệ thống trong bài tập 19


(e) Vẽ sơ đồ dạng trực tiếp I của hệ thống, và so sánh số phần tử trễ, số bộ nhân, số bộ cộng với sơ đồ trong hình 2.29. 

20. Cho hệ thống LTI liên tục mô tả bởi phương trình vi phân $y ^ { \prime \prime } ( t ) + 3 y ^ { \prime } ( t ) + 2 y ( t ) =$ 11 $x ( t )$ , với điều kiện nghỉ ban đầu. 

(a) Kiểm chứng rằng $h ( t ) = ( e ^ { - t } - e ^ { - 2 t } ) u ( t )$ là đáp ứng xung của hệ thống, bằng cách thay $x ( t ) = \delta ( t ) , y ( t ) = h ( t )$ vào phương trình. Lưu ý: đạo hàm của $u ( t )$ là $\delta ( t )$ , và $f ( t ) \delta ( t ) = f ( 0 ) \delta ( t )$ khi $f ( t )$ liên tục tại $t = 0$ 

(b) Hệ thống có nhân quả, ổn định không? 

(c) Tìm đáp ứng nhảy s(t) và giá trị xác lập của nó. 

21. Mã Barker độ dài 7 là dãy $b [ n ] = \{ \underline { { { 1 } } } , 1 , 1 , - 1 , - 1 , 1 , - 1 \}$ 

(a) Tính hàm tự tương quan $r _ { b b } [ n ]$ 

(b) Tính hàm tự tương quan $r _ { p p } [ n ]$ của xung chữ nhật cùng độ dài $p [ n ] =$ $u [ n ] - u [ n - 7 ]$ , và so sánh với $r _ { b b } [ n ]$ 

(c) Một hệ thống radar phát đi b[n] và thu được $y [ n ] = 0 . 5 b [ n - 5 ]$ (bỏ qua nhiễu). Tính $r _ { y x } [ n ]$ với $x [ n ] = b [ n ]$ , và xác định độ trễ từ vị trí đỉnh. 

(d) Khi tín hiệu thu có nhiễu, vì sao dùng b[n] dễ xác định đúng vị trí đỉnh hơn dùng $p [ n ] \colon$ 

## Đáp số bài tập

Bài $1 \colon ( \mathrm { a } ) \ y [ n ] = x [ n - 2 ] = \{ 0 , 0 , 1 , 2 , 3 \}$ : dịch trễ 2 mẫu. (b) $y [ n ] = x [ n ] -$ $x [ n - 1 ] = \{ 1 , 1 , 1 , - 3 \}$ : sai phân bậc nhất. (c) $\begin{array} { r } { y [ n ] = \sum _ { k = - \infty } ^ { n } x [ k ] \colon y [ n ] = 0 } \end{array}$ với $n < 0 , y [ 0 ] = 1 , y [ 1 ] = 3 { \mathrm { ~ v } } { \dot { \mathrm { a } } } y [ n ] = 6 { \mathrm { ~ v } } { \dot { \mathrm { o } } } { \dot { \mathrm { ~ } } } n \geq 2$ , tức là $y [ n ] = u [ n ] + 2 u [ n -$ $1 ] + 3 u [ n - 2 ]$ : tổng tích lũy. 

Bài $2 \colon y [ n ] = \{ 6 , 4 , - 1 1 , 5 , 7 , - 5 , 1 1 , 1 1 , - 1 4 , - 2 , - 8 \}$ 个

• <sup>Bài</sup> <sup>3:</sup> <sup>(a)</sup> <sup>Vì</sup> $0 . 6 - ( - 0 . 4 ) \ = \ 1 \ \mathrm { n { \hat { e } n } } \ y [ n ] \ = \ \left\lceil ( 0 . 6 ) ^ { n + 1 } - ( - 0 . 4 ) ^ { n + 1 } \right\rceil u [ n ]$ . (b) $\begin{array} { r } { y [ n ] = \sum _ { k = 0 } ^ { n } ( 0 . 5 ) ^ { k } ( 0 . 5 ) ^ { n - k } = ( n + 1 ) ( 0 . 5 ) ^ { n } u [ \bar { n } ] . \mathrm { ( c ) } y [ n ] = \sum _ { k = 1 } ^ { n + 2 } ( 1 \bar { / } 3 ) ^ { k - 1 } } \end{array}$ khi $n + 2 \ge 1$ , nên 

$$
y [ n ] = \frac {3}{2} \left[ 1 - \left(\frac {1}{3}\right) ^ {n + 2} \right] u [ n + 1 ]
$$

(y[ 1] = 1 và y[n]  3/2 khi $n \to \infty )$ 

• <sup>Bài</sup> <sup>4:</sup> <sup>(a)</sup> $\begin{array} { r } { h [ n ] = \frac { 1 } { M } ( u [ n ] - u [ n - M ] ) } \end{array}$ , gồm M mẫu bằng $\textstyle { \frac { 1 } { M } }$ tại $0 \leq n \leq$ $M - 1$ . Hệ thống nhân quả $( h [ n ] = 0 { \mathrm { ~ v } } { \ddot { 0 1 } } n < 0 )$ và ổn định $\begin{array} { r } { ( \sum _ { n } | h [ n ] | = 1 ) } \end{array}$ (b) $s [ n ] = 0$ với $\textstyle n \ < \ 0 , \ s [ n ] \ = \ { \frac { n + 1 } { M } }$ với $0 \leq n \leq M - 1 , s [ n ] = 1$ với $n \geq M$ giá trị xác lập bằng 1, đạt được sau M mẫu (hệ thống FIR). (c) $y [ n ] = \{ 0 . 2 5 , 0 . 5 , 0 . 7 5 , 1 , 1 , 1 , 0 . 7 5 , 0 . 5 , 0 . 2 5 \}$ 

Bài 5: (a) Đầu ra dài 1000 + 64 1 = 1063 mẫu; cần 1000 64 = 64000 phép nhân và $9 9 9 \cdot 6 3 = 6 2 9 3 7 ~ \mathrm { p h } \mathrm { { \acute { e } p } ~ c \hat { \circ } n g . ~ ( b ) }$ Đoạn âm thanh có 44100 mẫu, nên cần 44 $1 0 0 \cdot 2 5 6 = 1 1 2 8 9 6 0 0 \approx 1 . 1 3 \cdot 1 0 ^ { 7 }$ phép nhân, tức là trung bình 256 phép nhân cho mỗi mẫu đầu vào. 

Bài 6: 

$$
y (t) = \left\{ \begin{array}{l l} 0, & t <   - 1 \\ \frac {1}{2} (3 - t) (1 + t), & - 1 \leq t <   3 \\ 1 2 - 4 t, & 3 \leq t <   5 \\ \frac {1}{2} (t - 1) (t - 9), & 5 \leq t <   9 \\ 0, & t \geq 9 \end{array} \right.
$$

Bài $7 \colon ( \mathrm { a } ) \ ( e ^ { - 2 t } - e ^ { - 3 t } ) u ( t ) . \ ( \mathrm { b } ) \ t e ^ { - t } u ( t )$ . (c) Tích $e ^ { 2 \tau } u ( - \tau ) e ^ { - ( t - \tau ) } u ( t - \tau )$ khác 0 khi $\tau \leq$ min(0, t), nên 

$$
y (t) = e ^ {- t} \int_ {- \infty} ^ {\min (0, t)} e ^ {3 \tau} d \tau = \left\{ \begin{array}{l l} \frac {1}{3} e ^ {2 t}, & t <   0 \\ \frac {1}{3} e ^ {- t}, & t \geq 0 \end{array} \right.
$$

Bài $8 \colon ( \mathrm { a } ) \ h ( t - \tau ) = 1$ khi $t - 1 < \tau \leq t$ và bằng 0 ở ngoài khoảng này, nên $\textstyle y ( t ) = \int _ { t - 1 } ^ { t } x ( \tau )$ dτ và 

$$
y (t) = \left\{ \begin{array}{l l} 0, & t <   0 \\ \frac {1}{2} t ^ {2}, & 0 \leq t <   1 \\ t - \frac {1}{2}, & 1 \leq t <   2 \\ \frac {1}{2} \left[ 4 - (t - 1) ^ {2} \right], & 2 \leq t <   3 \\ 0, & t \geq 3 \end{array} \right.
$$

$y ( t )$ liên tục, đạt giá trị lớn nhất 1.5 tại $t = 2 . ~ ( \mathrm { b } ) ~ x ( t + 1 ) - 2 x ( t - 2 )$ : bằng $t + 1 \mathrm { t r @ n } \left[ - 1 , 1 \right)$ (tăng từ 0 đến gần 2), bằng $- 2 ( t - 2 )$ trên [2, 4) (giảm từ 0 đến $\mathrm { g } \mathrm { \hat { a } n - 4 ) }$ , và bằng 0 ở các khoảng còn lại. 

Bài 9: $y ( t ) = x ( t ) + 0 . 6 x ( t - \tau )$ . (a) Khi $\tau = T / 2 \colon y ( t ) = 1$ trên $[ 0 , T / 2 )$ , 1.6 trên $[ T / 2 , T )$ , 0.6 trên $[ T , 3 T / 2 )$ . Khi $\tau = 2 T \colon y ( t ) = 1$ trên $[ 0 , T ) , \ 0 . 6$ trên $[ 2 T , 3 T )$ . Ngoài các khoảng trên, $y ( t ) = 0 . \ ( \mathrm { b } )$ Tổng năng lượng của hai thành phần là $T + 0 . 3 6 T$ = 1.36T. Khi $\tau = 2 T$ , hai thành phần không chồng nhau nên $E _ { y } = 1 . 3 6 T$ . Khi $\tau = T / 2 , E _ { y } = \textstyle { \frac { T } { 2 } } ( 1 + 2 . 5 6 + 0 . 3 6 ) = 1 . 9 6 T$ , khác tổng năng lượng của hai thành phần vì chúng chồng lên nhau. (c) Khi $\tau = T / 2 \colon$ chồng lên nửa sau của chính xung thứ k và nửa đầu của xung thứ $k + 1$ . Khi $\tau = 2 T$ : chồng trọn lên khoảng thời gian của xung thứ $k + 2 .$ Như vậy, kể cả khi độ trễ lớn hơn độ rộng xung, thành phần trễ vẫn chồng lên các xung phát sau. 

• <sup>Bài</sup> <sup>10:</sup> <sup>(a)</sup> $h [ n ] = h _ { 1 } [ n ] * ( h _ { 2 } [ n ] + h _ { 3 } [ n ] ) = \delta [ n ] + ( 0 . 5 ) ^ { n } u [ n ] - ( 0 . 5 ) ^ { n - 1 } u [ n - 1 ]$ tức là 

$$
h [ n ] = 2 \delta [ n ] - (0. 5) ^ {n} u [ n - 1 ]
$$

(b) $h _ { 2 } [ n ] = u [ n ]$ không ổn định vì $\begin{array} { r } { \sum _ { n } | u [ n ] | = \infty } \end{array}$ . Cả hệ thống ổn định vì $\begin{array} { r } { \sum _ { n } \left| h [ n ] \right| = 2 + \sum _ { n = 1 } ^ { \infty } ( 0 . 5 ) ^ { n } = 3 < \infty . } \end{array}$ . (c) Dùng $\begin{array} { r } { h [ n ] \colon y [ n ] = \sum _ { k = - \infty } ^ { n } h [ k ] = } \end{array}$ $( 1 + 0 . 5 ^ { n } ) u [ n ]$ . Qua từng khối: $u [ n ] * h _ { 1 } [ n ] = \delta [ n ]$ , sau đó $\delta [ n ] * \left( h _ { 2 } [ n ] + h _ { 3 } [ n ] \right) =$ $u [ n ] + ( 0 . 5 ) ^ { n } u [ n ]$ . Hai cách cho cùng kết quả. 

Bài 11: $h _ { 2 } [ n ]$ dài $4 - 2 + 1 = 3$ mẫu. Đặt $h _ { 2 } [ n ] \ = \ \{ a , b , c \}$ , ta có $a = 1$ ， $2 a + b = 1 , 2 b + c = - 4 , 2 c = - 4$ , suy ra $h _ { 2 } [ n ] = \{ { 1 , - 1 , - 2 } \}$ (phương trình cuối dùng để kiểm tra lại). 

Bài 12: (a) $h [ - 1 ] = { \textstyle { \frac { 1 } { 2 } } } \neq 0$ nên không nhân quả; $\begin{array} { r } { \sum _ { n } | h [ n ] | = \sum _ { k = 0 } ^ { \infty } 2 ^ { - k } = 2 } \end{array}$ nên ổn định. (b) Nhân quả; ổn định, $\textstyle \sum _ { n = 2 } ^ { \infty } 0 . 7 ^ { n } = { \frac { 4 9 } { 3 0 } } . { \mathrm { ( c ) } }$ Không nhân quả; ổn định, $\textstyle \sum _ { n = - \infty } ^ { 2 } 3 ^ { n } = { \frac { 2 7 } { 2 } } . \ ( \mathrm { d } )$ Nhân quả; ổn định, $\textstyle \sum _ { n = 0 } ^ { \infty } n ( 0 . 5 ) ^ { n } = 2 . { \mathrm { ~ ( e ) } }$ Nhân quả; không ổn định, $\ ` 1 \mid \cos ( \pi n / 4 ) \mid = 1$ với mọi n chia hết cho 4 nên tổng phân kỳ. (f) Nhân quả; không ổn định (chuỗi điều hòa phân kỳ). (g) Nhân quả; ổn định, $\begin{array} { r } { \sum _ { n = 1 } ^ { \infty } \frac { 1 } { n ^ { 2 } } = \frac { \pi ^ { 2 } } { 6 } } \end{array}$ . (h) Không nhân quả $( h ( t ) \neq 0$ trên $[ - 1 , 0 ) ) ;$ ổn định, $\textstyle \int _ { - 1 } ^ { \infty } e ^ { - 3 t } d t = { \frac { e ^ { 3 } } { 3 } } . { \mathrm { ~ ( i ) } }$ Không nhân quả; ổn định, $\textstyle \int _ { - \infty } ^ { - 1 } e ^ { 2 t } d t = { \frac { e ^ { - 2 } } { 2 } } . \ ( { \mathrm { j } } )$ Nhân quả; ổn định, $\begin{array} { r } { \int _ { 0 } ^ { \infty } t e ^ { - 2 t } d t = \frac { 1 } { 4 } . \ ( \mathrm { k } ) } \end{array}$ Không nhân quả; ổn định, $\textstyle \int _ { - \infty } ^ { \infty } e ^ { - | t | } d t = 2$ (l) Nhân quả; ổn định, tích phân bằng 5. (m) Nhân quả; không ổn định, $\begin{array} { r } { \int _ { 0 } ^ { T } \frac { d t } { 1 + t } = \ln ( 1 + T ) \to \infty } \end{array}$ . Chứng minh điều kiện đủ: nếu $| x ( t ) | \leq C$ với mọi t thì với mọi t 

$$
\begin{array}{c} | y (t) | = \left| \int_ {- \infty} ^ {\infty} h (\tau) x (t - \tau) d \tau \right| \leq \int_ {- \infty} ^ {\infty} | h (\tau) | | x (t - \tau) | d \tau \\ \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \qquad \leq C \int_ {- \infty} ^ {\infty} | h (\tau) | d \tau <   \infty \end{array}
$$

• <sup>Bài</sup> <sup>13:</sup> <sup>(a)</sup> 

$$
h [ n ] * h _ {1} [ n ] = h _ {1} [ n ] + a h _ {1} [ n - N ] = \delta [ n ] + \sum_ {k = 1} ^ {\infty} \left[ (- a) ^ {k} + a (- a) ^ {k - 1} \right] \delta [ n - k N ] = \delta [ n ]
$$

vì $a ( - a ) ^ { k - 1 } = - ( - a ) ^ { k } . \mathrm { ( b ) } \ h _ { 1 } [ n ] = \{ 1 , 0 , 0 , - 0 . 5 , 0 , 0 , 0 . 2 5 , 0 , 0 , - 0 . 1 2 5 \}$ với $\begin{array} { r } { 0 \leq n \leq 9 . \mathrm { ~ ( c ) } \sum _ { n } \vert h _ { 1 } [ n ] \vert = \sum _ { k = 0 } ^ { \infty } \vert a \vert ^ { k } < \infty } \end{array}$ khi và chỉ khi $| a | < 1 . ~ ( \mathrm { d } )$ Điều kiện: $\begin{array} { r } { h ( t ) * h _ { 1 } ( t ) = \delta ( t ) ; h _ { 1 } ( t ) = \sum _ { k = 0 } ^ { \infty } ( - a ) ^ { k } \delta ( t - k T ) } \end{array}$ 

• <sup>Bài</sup> <sup>14:</sup> <sup>(a)</sup> <sup>Đặt</sup> $\sigma = \tau - 1$ 

$$
y (t) = \int_ {- \infty} ^ {t - 1} e ^ {- 2 (t - 1 - \sigma)} x (\sigma) d \sigma = \int_ {- \infty} ^ {\infty} x (\sigma) h (t - \sigma) d \sigma , \quad h (t) = e ^ {- 2 (t - 1)} u (t - 1)
$$

Quan hệ vào ra là phép chập với $h ( t )$ nên hệ thống là LTI. (b) Nhân quả, vì $h ( t ) = 0$ với $t < 1 ;$ ổn định, vì $\begin{array} { r } { \int _ { - \infty } ^ { \infty } \left| \dot { h } ( t ) \right| d t = \frac { 1 } { 2 } . ~ \mathrm { ( c ) } } \end{array}$ 

$$
y (t) = \left\{ \begin{array}{l l} 0, & t <   1 \\ \frac {1}{2} \left[ 1 - e ^ {- 2 (t - 1)} \right], & 1 \leq t <   3 \\ \frac {1}{2} (1 - e ^ {- 4})   e ^ {- 2 (t - 3)}, & t \geq 3 \end{array} \right.
$$

Bài 15: $\begin{array} { r } { s [ n ] = \sum _ { k = 0 } ^ { n } ( 0 . 5 ) ^ { k } = 2 \left( 1 - 0 . 5 ^ { n + 1 } \right) } \end{array}$ với $n \geq 0$ , và $s [ n ] = 0$ với $n < 0 ;$ giá trị xác lập bằng $\begin{array} { r } { 2 = \sum _ { k } h [ k ] } \end{array}$ 

• <sup>Bài</sup> <sup>16:</sup> <sup>(a)</sup> $\begin{array} { r } { h ( t ) = \frac { d } { d t } s ( t ) = 2 e ^ { - 2 t } u ( t ) } \end{array}$ (số hạng $( 1 - e ^ { - 2 t } ) \delta ( t )$ bằng 0 vì $1 - e ^ { 0 } =$ 0). (b) Với $x ( t ) = u ( t ) - u ( t - 1 ) \colon y ( t ) = s ( t ) - s ( t - 1 )$ , tức là $y ( t ) = 0$ với $t < 0 , y ( t ) = 1 - e ^ { - 2 t } \mathrm { ~ v \ o i ~ } 0 \leq t < 1 , y ( t ) = ( e ^ { 2 } - 1 ) e ^ { - 2 t } \mathrm { ~ v \ o i ~ } t \geq 1$ . Với $x ( t ) = 2 u ( t + 1 ) - u ( t - 2 ) \colon y ( t ) = 2 s ( t + 1 ) - s ( t - 2 )$ , tức là $y ( t ) = 0$ với $t < - 1 , y ( t ) = 2 \left[ 1 - e ^ { - 2 ( t + 1 ) } \right] \mathrm { v } \delta \mathrm { i } - 1 \leq t < 2 , y ( t ) = 1 - 2 e ^ { - 2 ( t + 1 ) } + e ^ { - 2 ( t - 2 ) }$ với $t \geq 2 . \mathrm { ( c ) } \ h [ n ] = s [ n ] - s [ n - 1 ] = \{ 1 , 2 , 1 \}$ : hệ thống FIR. 

Bài 17: vì hệ thống nhân quả nên $h [ n ] = 0$ với $n < 0$ . Tính đệ quy $h [ n ] =$ $0 . 5 h [ n - 1 ] + 2 \delta [ n ] + 3 \delta [ n - 1 ]$ được $h [ 0 ] = 2 , h [ 1 ] = 4$ và $h [ n ] = 0 . 5 h [ n - 1 ]$ với $n \geq 2$ , tức là 

$$
h [ n ] = 8 (0. 5) ^ {n} u [ n ] - 6 \delta [ n ]
$$

$\begin{array} { r } { \sum _ { n } | h [ n ] | = 2 + 8 \sum _ { n = 1 } ^ { \infty } ( 0 . 5 ) ^ { n } = 1 0 < \infty } \end{array}$ nên hệ thống ổn định. Sơ đồ dạng P Ptrực tiếp II (hình 2.30) dùng một phần tử trễ, với tín hiệu trung gian $g [ n ] =$ $x [ n ] + 0 . 5 g [ n - 1 ]$ và đầu ra $y [ n ] = 2 g [ n ] + 3 g [ n - 1 ]$ 

Bài 18: (a) Dòng điện trong mạch là $i ( t ) = y ( t ) / R$ , và $\begin{array} { r } { x ( t ) = L \frac { d } { d t } i ( t ) + R i ( t ) } \end{array}$ nên 

$$
\frac {L}{R} \frac {d}{d t} y (t) + y (t) = x (t)
$$

(b $\begin{array} { r } { \mathrm { ~ ) ~ } s ( t ) = \left( 1 - e ^ { - R t / L } \right) u ( t ) , h ( t ) = \frac { d } { d t } s ( t ) = \frac { R } { L } e ^ { - R t / L } u ( t ) . \mathrm { ~ ( c ) ~ } L / R = 1 0 ^ { - 4 } \mathrm { ~ s ~ } } \end{array}$ $| s ( t ) - 1 | = e ^ { - R t / L } \leq 0 . 0 2$ khi $\begin{array} { r } { t \ge \frac { L } { R } \ln 5 0 \approx 3 . 9 1 \cdot 1 0 ^ { - 4 } ~ \mathrm { s } \approx 0 . 3 9 } \end{array}$ ms. (d) Điện áp trên cuộn cảm bằng $x ( t ) - y ( t )$ , nên đáp ứng xung là $\begin{array} { r } { \delta ( t ) - \frac { R } { L } e ^ { - R t / L } u ( t ) } \end{array}$ $( \mathrm { e } ) \ s ( t ) = 0 . 1$ khi $\begin{array} { r } { t = \frac { L } { R } } \end{array}$ ln 10 9 và $s ( t ) = 0 . 9$ khi $\begin{array} { r } { t = \frac { L } { R } } \end{array}$ ln 10, nên $\begin{array} { r } { t _ { r } = \frac { L } { R } } \end{array}$ ln 9 2.20 10−4 s 0.22 ms; s(t) tăng đơn điệu và luôn nhỏ hơn $s ( \infty ) = 1$ nên $M _ { p } = 0$ 

B ${ \mathrm { ~ a i ~ } } 1 9 \colon ( { \mathrm { ~ a } } ) ~ g [ n ] = x [ n ] + 0 . 1 g [ n - 1 ] + 0 . 0 6 g [ n - 2 ] { \mathrm { ~ v a ~ } } y [ n ] = 5 g [ n ] + 2 g [ n - 1 ]$ suy ra 

$$
y [ n ] - 0. 1 y [ n - 1 ] - 0. 0 6 y [ n - 2 ] = 5 x [ n ] + 2 x [ n - 1 ]
$$

(b) $h [ 0 ] , \ldots , h [ 4 ] = 5 , 2 . 5 , 0 . 5 5 , 0 . 2 0 5 , 0 . 0 5 3 5 .$ (c) Phương trình đặc trưng $r ^ { 2 } - 0 . 1 r - 0 . 0 6 = 0$ có nghiệm r<sub>1</sub> = 0.3, r<sub>2</sub> = 0.2. Từ $h [ 0 ] = c _ { 1 } + c _ { 2 } =$ $5 \mathrm {  ~ \ v a ~ } h [ 1 ] = 0 . 3 c _ { 1 } - 0 . 2 c _ { 2 } = 2 . 5$ được $c _ { 1 } ~ = ~ 7 , ~ c _ { 2 } ~ = ~ - 2$ , tức là $h [ n ] ~ =$ $\left[ 7 ( 0 . 3 ) ^ { n } - 2 ( - 0 . 2 ) ^ { n } \right] u [ n ]$ . (d) IIR; ổn định, vì $\begin{array} { r } { \sum _ { n } | h [ n ] | \ \leq \ 7 \sum _ { n = 0 } ^ { \infty } 0 . 3 ^ { n } \ + } \end{array}$ $\textstyle 2 \sum _ { n = 0 } ^ { \infty } 0 . 2 ^ { n } < \infty .$ (e) Với $M = 1 , N = 2 \colon$ P: dạng trực tiếp I cần $M + N = 3$ Pphần tử trễ, sơ đồ trong hình chỉ cần max $( M , N ) = 2 ;$ ; cả hai sơ đồ đều có $M + N + 1 = 4$ bộ nhân (5, 2, 0.1, 0.06) và $M + N = 3$ bộ cộng. 

Bài 20: $( \mathrm { a } ) h ^ { \prime } ( t ) = ( - e ^ { - t } + 2 e ^ { - 2 t } ) u ( t )$ (số hạng chứa δ(t) có hệ số $e ^ { 0 } - e ^ { 0 } = 0 )$ $h ^ { \prime \prime } ( t ) = ( e ^ { - t } - 4 e ^ { - 2 t } ) u ( t ) + \delta ( t )$ . Thay vào vế trái được 

$$
h ^ {\prime \prime} (t) + 3 h ^ {\prime} (t) + 2 h (t) = \left[ (1 - 3 + 2) e ^ {- t} + (- 4 + 6 - 2) e ^ {- 2 t} \right] u (t) + \delta (t) = \delta (t)
$$

(b) Nhân quả; ổn định, vì $h ( t ) \geq 0$ và $\begin{array} { r } { \int _ { 0 } ^ { \infty } ( e ^ { - t } - e ^ { - 2 t } ) d t = \frac { 1 } { 2 } . \ ( \mathrm { c } ) \ s ( t ) \ = } \end{array}$ $\left( \textstyle { \frac { 1 } { 2 } } - e ^ { - t } + { \frac { 1 } { 2 } } e ^ { - 2 t } \right) u ( t )$ , giá trị xác lập bằng 1 . 

Bài 21: (a) $r _ { b b } [ n ] = \{ - 1 , 0 , - 1 , 0 , - 1 , 0 , 7 , 0 , - 1 , 0 , - 1 , 0 , - 1 \} \ \mathrm { v } \mathrm { \scriptsize \delta } - 6 \leq n \leq 6$ ↑ (b) $r _ { p p } [ n ] = 7 - | n |$ với $| n | \leq 6$ và bằng 0 ở ngoài. Cả hai có đỉnh bằng 7 tại $n = 0$ , nhưng $| r _ { b b } [ n ] | \le 1$ với mọi $n \neq 0$ , còn $r _ { p p } [ n ]$ giảm dần từ đỉnh $( r _ { p p } [ \pm 1 ] = 6 ) . ~ ( \mathrm { c } ) ~ r _ { y x } [ n ] = 0 . 5 r _ { b b } [ n - 5 ]$ , đạt đỉnh 3.5 tại $n = 5$ , nên độ trễ là 5 mẫu. (d) Với $r _ { b b } [ n ]$ , giá trị tại đỉnh lớn hơn hẳn các $\mathrm { \ g i \acute { a } }$ trị lân cận $( 7$ so với không quá 1), nên nhiễu khó làm thay $\dot { \mathrm { d } } \acute { \mathrm { o i } }$ vị trí đỉnh. Với $r _ { p p } [ n ]$ , các giá trị lân cận đỉnh gần bằng giá trị đỉnh (6 so với $^ { 7 ) }$ , nên một lượng nhiễu nhỏ cũng có thể làm đỉnh dịch sang $n = 4$ hoặc $n = 6$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/e59378c76c0eb83c8febbb60bd7ea81ad18ee9192729a07c3f9a117b2e50e574.jpg)



Hình 2.30. Sơ đồ dạng trực tiếp II cho bài 17


# Các phép biến đổi Fourier

Biến đổi Fourier có vai trò quan trọng trong toán học, vật lý, và đặc biệt trong các ngành kỹ thuật. Khái niệm chuỗi Fourier do Joseph Fourier giới thiệu vào năm 1807, và sau đó được phát triển bởi nhiều nhà khoa học nổi tiếng khác (xem thêm [1, 2]). 

Hình 3.1 biểu diễn một tín hiệu trên miền thời gian, và cùng tín hiệu đó, trên miền tần số. Dễ thấy, trong ví dụ này, tín hiệu trên miền thời gian rất phức tạp, còn trên miền tần số lại đơn giản, tách biệt hơn nhiều. Biến đổi Fourier cung cấp một công cụ chuyển tín hiệu, hệ thống từ miền thời gian qua miền tần số. Từ đó, chúng ta có thể để biểu diễn, quan sát, xử lý tín hiệu, phân tích hệ thống dưới một góc nhìn khác. 

Chương này tìm hiểu về các dạng khác nhau của biến đổi Fourier, tùy theo tín hiệu là liên tục hay rời rạc, tùy theo tuần hoàn hay không tuần hoàn. 

Chuỗi Fourier cho tín hiệu liên tục, tuần hoàn (FS) 

Chuỗi Fourier cho tín hiệu rời rạc, tuần hoàn (DTFS) 

Biến đổi Fourier cho tín hiệu liên tục (FT) 

Biến đổi Fourier cho tín hiệu rời rạc (FT) 

Nổi tiếng nhất là phép biến đổi Fourier rời rạc (DFT) và thuật toán FFT. Tuy nhiên, những nội dung này không được trình bày ở đây. Bạn đọc có thể tìm hiểu về chúng trong các tài liệu liên quan tới môn Xử lý tín hiệu số. 

Ngoài ra, các khái niệm về đáp ứng tần số cùng bộ lọc chọn lọc tần số, các khái niệm truyền không méo, pha tuyến tính và trễ nhóm cũng được giới thiệu và phân tích ở chương này. 

## 3.1. Đặt vấn đề

Trong chương 2, hai tính chất tuyến tính và bất biến theo thời gian đã giúp thực hiện hệ thống theo chiến lược: coi đầu vào là tổng các “thành phần” cơ bản, tìm $\mathrm { \dot { d a p } }$ ứng của hệ thống đối với từng “thành $\mathrm { \ p h { \dot { \hat { a } } } n { \vec { \mathbf { \tau } } } _ { 3 } }$ , sau đó cộng lại. “Thành $\mathrm { \ p h { \dot { \hat { a } } } n ^ { \prime } }$ được chọn ở chương trước là xung đơn vị sau dịch $\delta ( t - \tau )$ , với đáp ứng của hệ thống tương ứng là $h ( t - \tau )$ . Kết quả là phép chập 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/2da034e7900c7db223fea594135a026288251314a3038d9a51ded2debbbe8d73.jpg)



Hình 3.1. Tín hiệu trên miền thời gian và miền tần số


$$
y (t) = \int_ {- \infty} ^ {\infty} x (\tau) h (t - \tau) d \tau
$$

Ở đây, chập là một phép toán khá phức tạp. Liệu có “thành $\mathrm { \ p h { \dot { \hat { a } } } n ^ { \prime } }$ nào khác giúp ta có phép toán khác đơn giản hơn không? 

Lý tưởng nhất là “thành phần” mà khi qua hệ thống T thì đầu ra chính là đầu vào nhân với một hằng số λ (nói chung là số phức) 

$$
v (t) \xrightarrow {T} \lambda v (t)
$$

Liên hệ với đại $\mathrm { s } \acute { \hat { \mathrm { o } } }$ tuyến tính: $\mathbf { A } \mathbf { v } = \lambda \mathbf { v }$ , “thành phần” v này chính là vector riêng, còn λ là trị riêng, hệ thống ở đây đóng vai trò như ma trận A, khi tác động lên vector riêng chỉ làm co giãn nó. 

Xét hệ thống LTI với đáp ứng xung $h ( t )$ và đầu vào là tín hiệu hàm mũ phức $e ^ { j \Omega t }$ , áp dụng tính chất giao hoán của phép chập, đáp ứng tại đầu ra được tính như sau 

$$
\int_ {- \infty} ^ {\infty} h (\tau) e ^ {j \Omega (t - \tau)} d \tau = e ^ {j \Omega t} \int_ {- \infty} ^ {\infty} h (\tau) e ^ {- j \Omega \tau} d \tau
$$

Đặt $\begin{array} { r } { H ( j \Omega ) : = \int _ { - \infty } ^ { \infty } h ( \tau ) e ^ { - j \Omega \tau } d \tau } \end{array}$ , ta có: 

$$
e ^ {j \Omega t} \stackrel {T} {\longrightarrow} H (j \Omega) e ^ {j \Omega t}
$$

trong đó, 

$e ^ { j \Omega t }$ là hàm riêng của mọi hệ thống LTI có $H ( j \Omega )$ tồn tại. 

$H ( j \Omega )$ là trị riêng. Hệ LTI không tạo ra tần số mới; nó chỉ thay đổi biên độ và pha của từng thành phần tần số. 

Như vậy, $\mathrm { g i a }$ sử tín hiệu đầu vào $x ( t )$ viết được dưới dạng tổng các hàm riêng này 

$$
x (t) = \sum_ {k} c _ {k} e ^ {j \Omega_ {k} t}\tag{3.1}
$$

thì ta có thể tính được đầu ra ngay lập tức mà không cần thực hiện phép chập 

$$
y (t) = \sum_ {k} c _ {k} H (j \Omega_ {k}) e ^ {j \Omega_ {k} t}
$$

trong đó, mỗi thành phần tần số chỉ việc nhân với một hệ số tương ứng. 

Chuỗi Fourier (cho tín hiệu tuần hoàn) và biến đổi Fourier (cho tín hiệu không tuần hoàn) giúp ta thực hiện được việc biểu diễn tín hiệu đầu vào bất kỳ qua các hàm riêng: theo dạng tổng (3.1) với $\begin{array} { r } { \Omega _ { k } = k \frac { 2 \pi } { T } } \end{array}$ cho tín hiệu tuần hoàn, và theo dạng tích phân (3.11) cho tín hiệu không tuần hoàn. Đây cũng có thể coi là việc chuyển hệ cơ sở (theo nghĩa mở rộng, của không gian vector tín hiệu vô hạn chiều) từ các hàm delta Dirac dịch $\delta ( t - \tau )$ qua hệ cơ sở mới là các hàm mũ phức $e ^ { j \Omega t }$ . Khi $\dot { \mathrm { d } } \acute { \mathrm { o } } .$ $H ( j \Omega )$ là biến đổi Fourier của đáp ứng xung $h ( t )$ , và phép chập trên miền thời gian đã trở thành phép nhân trên miền tần số. 

Với hệ thống LTI rời rạc, lập luận hoàn toàn tương tự: dãy hàm mũ phức $e ^ { j \omega n }$ là hàm riêng, 

$$
e ^ {j \omega n} \xrightarrow {T} H (e ^ {j \omega}) e ^ {j \omega n}, \quad H (e ^ {j \omega}) := \sum_ {k = - \infty} ^ {\infty} h [ k ] e ^ {- j \omega k}
$$

với điều kiện $H ( e ^ { j \omega } )$ tồn tại. 

## 3.2. Chuỗi Fourier cho tín hiệu liên tục, tuần hoàn

Tín hiệu $x ( t )$ tuần hoàn với chu $\mathrm { k } \mathrm { \hat { y } }$ cơ bản $T ,$ , thỏa mãn các điều kiện Dirichlet (mục 3.2.2), có thể được biểu diễn bởi chuỗi Fourier (FS) như sau: 

$$
x (t) = \sum_ {k = - \infty} ^ {\infty} c _ {k} e ^ {j \frac {2 \pi}{T} k t}\tag{3.2}
$$

trong đó 

$$
c _ {k} = \frac {1}{T} \int_ {T} x (t) e ^ {- j \frac {2 \pi}{T} k t} d t\tag{3.3}
$$

Lưu $\acute { \mathrm { y } }$ trong công thức (3.3) để tính các hệ số $c _ { k } .$ , do cả $x ( t )$ và $e ^ { - j { \frac { 2 \pi } { T } } k t }$ đều tuần hoàn với chu kỳ $T$ (theo biến t) nên hai cận tích phân có thể chọn bất $\mathrm { k } \grave { \mathrm { y } } .$ , miễn là phủ kín một chu kỳ. 

Ngoài ra, theo công thức Euler, 

$$
c _ {k} e ^ {j k \frac {2 \pi}{T} t} = c _ {k} \cos (k \frac {2 \pi}{T} t) + j c _ {k} \sin (k \frac {2 \pi}{T} t)
$$

mỗi cụm $c _ { k } e ^ { j k \frac { 2 \pi } { T } t }$ bao gồm thành phần hình sin có tần số gấp k lần tần số cơ bản $( 2 \pi / T )$ , do vậy còn được gọi là thành phần hài bậc k. Còn tập $\{ c _ { k } \} _ { k = - \infty } ^ { \infty }$ được gọi là các hệ số chuỗi Fourier hay các hệ số phổ của tín hiệu $x ( t )$ . Do vậy, có thể coi tập $\{ c _ { k } \} _ { k = - \infty } ^ { \infty }$ là biểu diễn của $x ( t )$ trên miền tần số: mỗi hệ số $c _ { k }$ thể hiện sự tồn tại và độ lớn của thành phần hài bậc k trong tín hiệu $x ( t )$ 

Ví dụ 3.1. Hãy tìm khai triển chuỗi Fourier của dãy xung chữ nhật $x ( t )$ tuần hoàn với chu $\mathrm { k } \mathrm { \hat { y } }$ cơ bản T như trong hình 3.2. 

$$
x (t) = \left\{ \begin{array}{l l} 1, & \ell T - \frac {T _ {0}}{2} \leq t \leq \ell T + \frac {T _ {0}}{2}, \quad \ell \in \mathbb {Z} \\ 0, & t \text {   còn   lại } \end{array} \right.
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/426666e169b0794faca9d9fe41ef43a371c73bfd44dcd71f4b41e46864c21867.jpg)



Hình 3.2. Dãy xung chữ nhật tuần hoàn


Lời giải. Để tính các hệ số $c _ { k }$ , ta chọn cận tích phân từ $- \frac { T } { 2 }$ đến $\textstyle { \frac { T } { 2 } }$ Khi đó, 

$$
\begin{array}{r l} & c _ {k} = \frac {1}{T} \int_ {- T / 2} ^ {T / 2} x (t) e ^ {- j \frac {2 \pi}{T} k t} d t \\ & \quad = \frac {1}{T} \int_ {- T _ {0} / 2} ^ {T _ {0} / 2} 1 \cdot e ^ {- j \frac {2 \pi}{T} k t} d t \\ & \quad = \frac {1}{T} \frac {1}{- j \frac {2 \pi}{T} k} (e ^ {- j \frac {2 \pi}{T} k \frac {T _ {0}}{2}} - e ^ {j \frac {2 \pi}{T} k \frac {T _ {0}}{2}}) \\ & \quad = \frac {\sin (k \pi \frac {T _ {0}}{T})}{k \pi} \end{array}
$$

Phép tính trên đúng với $k \neq 0$ . Với $k = 0 .$ , tính trực tiếp $\begin{array} { r } { c _ { 0 } = \frac { 1 } { T } \int _ { - T _ { 0 } / 2 } ^ { T _ { 0 } / 2 } d t = \frac { T _ { 0 } } { T } } \end{array}$ trùng với giới hạn của biểu thức trên khi $k  0$ 

Trong trường hợp này, các hệ số $c _ { k }$ đều là số thực, như biểu diễn trong hình 3.3, với những giá trị khác nhau của $\textstyle { \frac { T _ { 0 } } { T } }$ . Đây là đồ thị dạng hàm sinc, được định nghĩa như sau 

$$
\operatorname{sinc} (t) := \frac {\sin (\pi t)}{\pi t}\tag{3.4}
$$

Hàm sinc(t) trên đồ thị (xem hình 3.4) nhìn gần giống như tín hiệu hình sin, nhưng có biên độ giảm dần về không khi $t \to \pm \infty$ . Ngoài ra, hàm này cắt trục hoành tại các điểm $t = k \in \{ \pm 1 , \pm 2 , \dots \}$ . Hàm này có một búp chính bao quanh $\mathrm { g } \acute { \mathrm { o c } } ,$ độ rộng 2, chiều cao 1; và có các búp phụ độ rộng 1 với biên độ giảm dần. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/96fc6a5343c5afe47db2553c356653b94294a636b0047eae36125e6254528444.jpg)



Hình 3.3. Các hệ số phổ của dãy xung chữ nhật tuần hoàn


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/8fdc03fcde5999e15fd49d6ac6399d03bf2370b30f502d6a7b171c61e27ca632.jpg)



Hình 3.4. Hàm sinc(t)


Ví dụ 3.2. Cho dãy xung chữ nhật tuần hoàn $x ( t )$ , chu $\mathrm { k } \mathrm { \tilde { y } }$ cơ bản $T = 7 .$ , với các giá trị trong một chu kỳ được xác định như sau 

$$
x (t) = \left\{ \begin{array}{l l} 1, & 0 \leq t \leq 5 \\ 0, & 5 <   t <   7 \end{array} \right.
$$

Hãy tính các hệ số khai triển chuỗi Fourier của $x ( t )$ , tính biên độ và pha của $c _ { k }$ . 

Lời giải. $\mathrm { { \acute { A } p } }$ dụng công thức (3.3), với cận tích phân $[ 0 , 7 ]$ , ta có 

$$
\begin{array}{r l} & c _ {k} = \frac {1}{7} \int_ {0} ^ {7} x (t) e ^ {- j \frac {2 \pi}{7} k t} d t \\ & \quad = \frac {1}{7} \int_ {0} ^ {5} e ^ {- j \frac {2 \pi}{7} k t} d t \\ & \quad = \frac {1}{7} \frac {1}{- j \frac {2 \pi}{7} k} [ e ^ {- j \frac {2 \pi}{7} k 5} - 1 ] \end{array}
$$

Ở đây $c _ { k }$ nhận giá trị phức, ta có $\mathrm { t h } \mathring { \mathrm { e } }$ tách riêng các thành phần biên $\begin{array} { r } { \dot { \mathrm { d } } \hat { \boldsymbol { \mathrm { O } } } . } \end{array}$ , pha theo cách sau 

$$
\begin{array}{r l} & {c _ {k} = \frac {1}{7} \frac {1}{- j \frac {2 \pi}{7} k} [ e ^ {- j \frac {1 0 \pi k}{7}} - 1 ]} \\ & {\quad = \frac {1}{- j 2 \pi k} e ^ {- j \frac {5 \pi k}{7}} [ e ^ {- j \frac {5 \pi k}{7}} - e ^ {j \frac {5 \pi k}{7}} ]} \\ & {\quad = \frac {\sin (\frac {5 \pi k}{7})}{\pi k} e ^ {- j \frac {5 \pi k}{7}}} \end{array}
$$

Các $\mathrm { p h e p }$ tính trên đúng với $k \neq 0$ . Với $\begin{array} { r } { k = 0 , c _ { 0 } = \frac { 1 } { 7 } \int _ { 0 } ^ { 5 } d t = \frac { 5 } { 7 } } \end{array}$ , trùng với giới hạn của biểu thức cuối khi $k  0$ 

Như vậy, 

$$
| c _ {k} | = \left| \frac {\sin (\frac {5 \pi k}{7})}{\pi k} \right|
$$

$$
\arg \{c _ {k} \} = \left\{ \begin{array}{l l} - \frac {5 \pi k}{7}, & \mathrm{khi} \quad \frac {\sin (\frac {5 \pi k}{7})}{\pi k} \geq 0 \\ - \frac {5 \pi k}{7} \pm \pi , & \mathrm{khi} \quad \frac {\sin (\frac {5 \pi k}{7})}{\pi k} <   0 \end{array} \right.
$$

Nếu muốn biểu diễn $c _ { k } ,$ ta cần vẽ hai đồ thị biên $\mathrm { d } \hat { \boldsymbol { 0 } } \ \lvert \boldsymbol { c } _ { k } \rvert$ và pha $\mathrm { a r g } \{ c _ { k } \}$  

Ví dụ 3.3. Tìm các hệ số khai triển chuỗi Fourier cho dãy xung đơn vị tuần hoàn 

$$
x (t) = \sum_ {\ell = - \infty} ^ {\infty} \delta (t - \ell T)
$$

Lời giải. $\mathrm { { \acute { A } p } }$ dụng công thức (3.3), với cận tích phân $[ - T / 2 , T / 2 ]$ 

$$
c _ {k} = \frac {1}{T} \int_ {- T / 2} ^ {T / 2} \delta (t) e ^ {- j \frac {2 \pi}{T} k t} d t
$$

Áp dụng tính chất lấy mẫu (1.14) của hàm xung đơn vị, 

$$
c _ {k} = \frac {1}{T} e ^ {- j \frac {2 \pi}{T} k \cdot 0} = \frac {1}{T}, \quad \forall k \in \mathbb {Z}\tag{3.5}
$$

Lưu $\acute { \mathrm { y } }$ rằng dãy xung Dirac tuần hoàn không thỏa mãn điều kiện Dirichlet (không bị chặn), nên khai triển này được hiểu theo nghĩa suy rộng, tương tự biến đổi Fourier mở rộng ở mục 3.4.2.  

## 3.2.1. Dạng biểu diễn khác của FS

Khai triển chuỗi Fourier cho $x ( t )$ còn có thể được biểu diễn dưới dạng khác như sau 

$$
x (t) = \frac {a _ {0}}{2} + \sum_ {k = 1} ^ {\infty} [ a _ {k} \cos (k \frac {2 \pi}{T} t) + b _ {k} \sin (k \frac {2 \pi}{T} t) ]\tag{3.6}
$$

Sử dụng công thức Euler, chúng ta tìm ra được mối quan hệ giữa $a _ { k } , b _ { k }$ và $c _ { k }$ như ví dụ dưới đây. 

Ví dụ 3.4. Hãy tìm khai triển chuỗi Fourier của 

$$
x (t) = \cos (\frac {\pi}{3} t)
$$

Lời giải. Đầu tiên, ta thấy x(t) là tín hiệu tuần hoàn với chu kỳ cơ bản $T = 6$ Áp dụng công thức Euler, ta có 

$$
\begin{array}{c} x (t) = \frac {1}{2} e ^ {j \frac {\pi}{3} t} + \frac {1}{2} e ^ {- j \frac {\pi}{3} t} \\ = \frac {1}{2} e ^ {j \frac {2 \pi}{6} t} + \frac {1}{2} e ^ {- j \frac {2 \pi}{6} t} \end{array}
$$

Đồng nhất hệ số với công thức (3.2), ta có 

$$
c _ {k} = \left\{ \begin{array}{l l} \frac {1}{2}, & k = \pm 1 \\ 0, & k \neq \pm 1 \end{array} \right.
$$

Tổng quát, ghép cặp số hạng thứ k và thứ $- k \left( k \geq 1 \right)$ trong (3.2) và áp dụng công thức Euler, ta có 

$$
c _ {k} e ^ {j k \frac {2 \pi}{T} t} + c _ {- k} e ^ {- j k \frac {2 \pi}{T} t} = (c _ {k} + c _ {- k}) \cos (k \frac {2 \pi}{T} t) + j (c _ {k} - c _ {- k}) \sin (k \frac {2 \pi}{T} t)
$$

Đồng nhất với (3.6), ta được mối quan hệ giữa hai dạng biểu diễn 

$$
a _ {0} = 2 c _ {0}, \quad a _ {k} = c _ {k} + c _ {- k}, \quad b _ {k} = j (c _ {k} - c _ {- k}), \quad k \geq 1
$$

và ngược lại, $\begin{array} { l } { { c _ { k } ~ = ~ \frac { a _ { k } - j b _ { k } } { 2 } , ~ c _ { - k } ~ = ~ \frac { a _ { k } + j b _ { k } } { 2 } } } \end{array}$ . Chẳng hạn, trong ví dụ trên, $a _ { 1 }$ = $c _ { 1 } + c _ { - 1 } = 1$ , còn tất cả các hệ số $a _ { k } , b _ { k }$ khác đều bằng 0, đúng với $\begin{array} { r } { x ( t ) = \cos ( \frac { \pi } { 3 } t ) } \end{array}$ 

## 3.2.2. Điều kiện tồn tại chuỗi Fourier

Về mặt toán học, sẽ tồn tại khai triển chuỗi Fourier cho tín hiệu tuần hoàn $x ( t )$ nếu thỏa mãn các điều kiện Dirichlet dưới đây 

(1) x(t) bị chặn 

(2) $x ( t )$ có hữu hạn các cực đại và cực tiểu trong một chu kỳ 

(3) $x ( t )$ có hữu hạn các điểm gián đoạn trong một chu kỳ 

Khi $\begin{array} { r } { \dot { \mathrm { d } } \acute { \mathrm { o } } , } \end{array}$ chuỗi (3.2) hội tụ về $x ( t )$ tại các điểm $x ( t )$ liên tục, và hội tụ về trung bình cộng của giới hạn trái và giới hạn phải tại các điểm gián đoạn. 

Trên thực $\mathrm { t } \acute { \hat { \mathrm { e } } } ,$ những tín hiệu tuần hoàn có FS là những tín hiệu có năng lượng hữu hạn trên một chu kỳ: 

$$
\int_ {T} | x (t) | ^ {2} d t <   \infty
$$

Với điều kiện này, chuỗi (3.2) hội tụ về $x ( t )$ theo nghĩa trung bình bình phương, tức là năng lượng của sai số trên một chu kỳ tiến tới 0 khi số số hạng tăng dần, dù chuỗi có thể không hội tụ tại từng điểm. 

## 3.2.3. Các tính chất của FS

Chuỗi Fourier có một loạt các tính chất, trong đó chỉ một $\mathrm { s } \acute { \hat { \mathrm { o } } }$ tính chất cơ bản nhất được giới thiệu trong phần này. Trong các chứng minh dưới đây, $x ( t )$ tuần hoàn với chu kỳ T và có các hệ số $c _ { k }$ tính theo (3.3); như đã lưu $\acute { \mathrm { ~ y ~ d ~ } }$ trên, tích phân trong (3.3) có thể lấy trên một đoạn bất kỳ có độ dài $T$ . 

3.2.3.1. Tính chất tuyến tính. Nếu $x _ { 1 } ( t ) , x _ { 2 } ( t )$ cùng chu kỳ 

$$
\begin{array}{l} x _ {1} (t) \xleftrightarrow {\text { FS }} c _ {k} ^ {(1)} \\ x _ {2} (t) \xleftrightarrow {\text { FS }} c _ {k} ^ {(2)} \end{array}
$$

thì 

$$
a _ {1} x _ {1} (t) + a _ {2} x _ {2} (t) \xleftrightarrow {\mathrm{FS}} a _ {1} c _ {k} ^ {(1)} + a _ {2} c _ {k} ^ {(2)}
$$

trong đó $a _ { 1 } , a _ { 2 }$ là các hằng số. 

Chứng minh. Tín hiệu $y ( t ) = a _ { 1 } x _ { 1 } ( t ) + a _ { 2 } x _ { 2 } ( t )$ cũng tuần hoàn với chu kỳ $T . { \mathrm { { \acute { A p } } } }$ dụng (3.3) cho $y ( t )$ và tính chất tuyến tính của tích phân, 

$$
\begin{array}{r} \frac {1}{T} \int_ {T} [ a _ {1} x _ {1} (t) + a _ {2} x _ {2} (t) ] e ^ {- j \frac {2 \pi}{T} k t} d t = a _ {1} \frac {1}{T} \int_ {T} x _ {1} (t) e ^ {- j \frac {2 \pi}{T} k t} d t \\ + a _ {2} \frac {1}{T} \int_ {T} x _ {2} (t) e ^ {- j \frac {2 \pi}{T} k t} d t \\ = a _ {1} c _ {k} ^ {(1)} + a _ {2} c _ {k} ^ {(2)} \end{array}
$$

 

Ví dụ 3.5. Hãy tìm khai triển chuỗi Fourier của 

$$
x (t) = 5 j \cos (\frac {\pi}{7} t - \frac {\pi}{3}) - 3 \sin (\frac {3 \pi}{8} t + \frac {\pi}{4})
$$

Lời giải. Trước hết, tìm chu kỳ cơ bản của $x ( t )$ . Thành phần thứ nhất có tần số $\operatorname { g o c } { \frac { \pi } { 7 } }$ , chu kỳ cơ bản $\begin{array} { r }  T _ { 1 } = \frac { 2 \pi } { \pi / 7 } = 1 4 \ \end{array}$ ; thành phần thứ hai có tần số góc $\frac { 3 \pi } { 8 }$ , chu kỳ cơ bản $\begin{array} { r } { T _ { 2 } = \frac { 2 \pi } { 3 \pi / 8 } = \frac { 1 6 } { 3 } } \end{array}$ . Chu kỳ $T$ của $x ( t )$ là bội chung nhỏ nhất của $T _ { 1 }$ và $T _ { 2 }$ , tức là số dương nhỏ nhất thỏa mãn $T = p T _ { 1 } = q T _ { 2 }$ với $p , q$ nguyên dương: 

$$
1 4 p = \frac {1 6}{3} q \quad \Leftrightarrow \quad 2 1 p = 8 q
$$

Do 8 và 21 nguyên tố cùng nhau nên nghiệm nguyên dương nhỏ nhất là $p = 8$ $q = 2 1$ . Suy ra $T = 1 1 2$ 

$\mathrm { { \AA p } }$ dụng công thức Euler cho từng thành phần, 

$$
\begin{array}{r} 5 j \cos (\frac {\pi}{7} t - \frac {\pi}{3}) = \frac {5 j}{2} e ^ {- j \frac {\pi}{3}} e ^ {j \frac {\pi}{7} t} + \frac {5 j}{2} e ^ {j \frac {\pi}{3}} e ^ {- j \frac {\pi}{7} t} \\ - 3 \sin (\frac {3 \pi}{8} t + \frac {\pi}{4}) = - \frac {3}{2 j} e ^ {j \frac {\pi}{4}} e ^ {j \frac {3 \pi}{8} t} + \frac {3}{2 j} e ^ {- j \frac {\pi}{4}} e ^ {- j \frac {3 \pi}{8} t} \end{array}
$$

Do $\begin{array} { r } { \frac { \pi } { 7 } = 8 \cdot \frac { 2 \pi } { 1 1 2 } } \end{array}$ và $\begin{array} { r } { \frac { 3 \pi } { 8 } = 2 1 \cdot \frac { 2 \pi } { 1 1 2 } } \end{array}$ , các thành phần $e ^ { \pm j \frac { \pi } { 7 } t } \ \mathrm { v \dot { a } } \ e ^ { \pm j \frac { 3 \pi } { 8 } t }$ chính là các hài bậc k = 8 và k = 21 trong (3.2). Theo tính chất tuyến tính, hệ số $c _ { k }$ của $x ( t )$ là tổng các hệ số tương ứng của hai thành phần. Đồng nhất với (3.2) và dùng $\begin{array} { r } { j = e ^ { j \frac { \pi } { 2 } } } \end{array}$ 2 $\frac { 1 } { j } = - j = e ^ { - j \frac { \pi } { 2 } }$ , ta được 

$$
c _ {k} = \left\{ \begin{array}{l l} \frac {5}{2} e ^ {j \frac {\pi}{6}}, & k = 8 \\ \frac {5}{2} e ^ {j \frac {5 \pi}{6}}, & k = - 8 \\ \frac {3}{2} e ^ {j \frac {3 \pi}{4}}, & k = 2 1 \\ \frac {3}{2} e ^ {- j \frac {3 \pi}{4}}, & k = - 2 1 \\ 0, & k \text {còn lại} \end{array} \right.
$$

Các hệ số $c _ { \pm 8 } , c _ { \pm 2 1 }$ đều khác 0 và 8, 21 nguyên tố cùng nhau, nên $T = 1 1 2$ đúng là chu kỳ cơ bản của $x ( t )$ (nói chung, bội chung nhỏ nhất của các chu kỳ thành phần chỉ chắc chắn là một chu kỳ của tổng). 

Biên độ và pha của các hệ số khác 0: 

$$
\begin{array}{r l r l r l} & {| c _ {\pm 8} | = \frac {5}{2},} & & {\arg \{c _ {8} \} = \frac {\pi}{6},} & & {\arg \{c _ {- 8} \} = \frac {5 \pi}{6}} \\ & {| c _ {\pm 2 1} | = \frac {3}{2},} & & {\arg \{c _ {2 1} \} = \frac {3 \pi}{4},} & & {\arg \{c _ {- 2 1} \} = - \frac {3 \pi}{4}} \end{array}
$$

Với các k còn lại, $c _ { k } = 0$ nên biên độ bằng 0 và pha không xác định. Hình 3.5 biểu diễn biên độ và pha của $c _ { k }$ . Lưu $\acute { \mathrm { y } }$ rằng do $x ( t )$ nhận giá trị phức (hệ số $5 j )$ , phổ pha không phản đối xứng: $\arg \{ c _ { - 8 } \} \neq - \arg \{ c _ { 8 } \}$  

## 3.2.3.2. Tính chất dịch thời gian.

$$
x (t - t _ {0}) \stackrel {\mathrm{FS}} {\longleftrightarrow} e ^ {- j \frac {2 \pi}{T} k t _ {0}} c _ {k}
$$

Chứng minh. Tín hiệu $x ( t - t _ { 0 } )$ cũng tuần hoàn với chu kỳ $T .$ Đổi biến $\tau = t - t _ { 0 } ;$ khi t chạy hết một chu kỳ thì τ chạy trên một đoạn có độ dài $T$ , nên 

$$
\begin{array}{r} \frac {1}{T} \int_ {T} x (t - t _ {0}) e ^ {- j \frac {2 \pi}{T} k t} d t = \frac {1}{T} \int_ {T} x (\tau) e ^ {- j \frac {2 \pi}{T} k (\tau + t _ {0})} d \tau \\ = e ^ {- j \frac {2 \pi}{T} k t _ {0}} \frac {1}{T} \int_ {T} x (\tau) e ^ {- j \frac {2 \pi}{T} k \tau} d \tau = e ^ {- j \frac {2 \pi}{T} k t _ {0}} c _ {k} \end{array}
$$

Ví dụ 3.6. Tìm khai triển FS cho dãy xung chữ nhật tuần hoàn với chu kỳ $T$ sau 

$$
x (t) = \left\{ \begin{array}{l l} 1, & \ell T \leq t \leq \ell T + T _ {0}, \quad \ell \in \mathbb {Z} \\ 0, & t \text {   côn   lại } \end{array} \right.
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/54016280f665906f820479cedd6b443bf4c78b9cd9f2843bb4ab829e299b0fe9.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/41aac885c0745a0285cabd20a86dd0ebf9df11264b003f5cb4799fa0386737e7.jpg)



Hình 3.5. Biên độ và pha của các hệ số chuỗi Fourier trong ví dụ 3.5 $( c _ { k } = 0$ tại các k không được vẽ)


Lời giải. Ta dễ $\operatorname { t h a y }$ tín hiệu $x ( t )$ trong ví dụ này chính là dãy xung chữ nhật trong ví dụ 3.1 bị dịch (theo thời gian) sang phải một đoạn $\scriptstyle { \frac { T _ { 0 } } { 2 } }$ . Do vậy, áp dụng tính chất dịch thời gian, ta tính được các hệ số FS như sau 

$$
c _ {k} = e ^ {- j \frac {2 \pi}{T} k \frac {T _ {0}}{2}} \frac {\sin (k \pi \frac {T _ {0}}{T})}{k \pi}, \quad k \neq 0; \qquad c _ {0} = \frac {T _ {0}}{T}
$$

3.2.3.3. Quan hệ Parseval. Nếu $x ( t )$ có năng lượng hữu hạn trên một chu kỳ thì 

$$
\frac {1}{T} \int_ {T} | x (t) | ^ {2} d t = \sum_ {k = - \infty} ^ {\infty} | c _ {k} | ^ {2}
$$

Chứng minh. Viết $| x ( t ) | ^ { 2 } = x ( t ) x ^ { * } ( t )$ và thay $x ^ { * } ( t )$ bởi liên hợp phức của chuỗi (3.2), $\begin{array} { r } { x ^ { * } ( t ) = \sum _ { k } c _ { k } ^ { * } e ^ { - j \frac { 2 \pi } { T } k t } } \end{array}$ . Đổi thứ tự lấy tổng và lấy tích phân, ta được 

$$
\frac {1}{T} \int_ {T} x (t) x ^ {*} (t) d t = \sum_ {k = - \infty} ^ {\infty} c _ {k} ^ {*} \frac {1}{T} \int_ {T} x (t) e ^ {- j \frac {2 \pi}{T} k t} d t = \sum_ {k = - \infty} ^ {\infty} c _ {k} ^ {*} c _ {k} = \sum_ {k = - \infty} ^ {\infty} | c _ {k} | ^ {2}
$$

Việc đổi thứ tự ở bước trên hợp lệ khi $x ( t )$ có năng lượng hữu hạn trên một chu $\mathrm { k } \mathrm { \tilde { y } }$ vì khi đó chuỗi (3.2) hội tụ về $x ( t )$ theo nghĩa trung bình bình phương (mục 3.2.2); ta chấp nhận kết quả này mà không chứng minh chi tiết.  

$\acute { \mathrm { Y } }$ nghĩa: FS bảo toàn công suất của tín hiệu. 

3.2.3.4. Các tính chất khác. FS còn có một loạt các tính chất khác, được liệt kê dưới đây: 

• <sup>Dịch</sup> <sup>tần</sup> <sup>số</sup> 

$$
e ^ {j \frac {2 \pi}{T} k _ {0} t} x (t) \xleftrightarrow {\mathrm{FS}} c _ {k - k _ {0}}, \quad k _ {0} \in \mathbb {Z}
$$

• <sup>Đảo</sup> <sup>thời</sup> <sup>gian</sup> 

$$
x (- t) \xleftrightarrow {\mathrm{FS}} c _ {- k}
$$

Tính chất đối xứng 

$$
x ^ {*} (t) \xleftrightarrow {\mathrm{FS}} c _ {- k} ^ {*}
$$

Chứng minh. Cả ba tín hiệu $e ^ { j \frac { 2 \pi } { T } k _ { 0 } t } x ( t )$ (do k<sub>0</sub> nguyên), $x ( - t )$ và $x ^ { * } ( t )$ đều tuần hoàn với chu kỳ $T . { \mathrm { ~ \AA p } }$ dụng (3.3) cho từng tín hiệu: 

Dịch tần số: 

$$
\frac {1}{T} \int_ {T} e ^ {j \frac {2 \pi}{T} k _ {0} t} x (t) e ^ {- j \frac {2 \pi}{T} k t} d t = \frac {1}{T} \int_ {T} x (t) e ^ {- j \frac {2 \pi}{T} (k - k _ {0}) t} d t = c _ {k - k _ {0}}
$$

Đảo thời gian: đổi biến $\tau = - t ;$ khi t chạy hết một chu kỳ thì $\tau$ cũng chạy trên một đoạn có độ dài $T _ { \ast }$ nên 

$$
\frac {1}{T} \int_ {T} x (- t) e ^ {- j \frac {2 \pi}{T} k t} d t = \frac {1}{T} \int_ {T} x (\tau) e ^ {- j \frac {2 \pi}{T} (- k) \tau} d \tau = c _ {- k}
$$

Tính chất đối xứng: do t là số thực, 

$$
\frac {1}{T} \int_ {T} x ^ {*} (t) e ^ {- j \frac {2 \pi}{T} k t} d t = \left[ \frac {1}{T} \int_ {T} x (t) e ^ {- j \frac {2 \pi}{T} (- k) t} d t \right] ^ {*} = c _ {- k} ^ {*}
$$

Các tính chất trên được tóm tắt trong bảng 3.1. 


Bảng 3.1. Các tính chất của chuỗi Fourier (x(t) tuần hoàn với chu kỳ T)


<table><tr><td>Tính chất</td><td><eq>x(t)</eq></td><td><eq>c_{k}</eq></td><td>Điều kiện</td></tr><tr><td>Tuyến tính</td><td><eq>a_{1}x_{1}(t)+a_{2}x_{2}(t)</eq></td><td><eq>a_{1}c_{k}^{(1)}+a_{2}c_{k}^{(2)}</eq></td><td><eq>x_{1}(t), x_{2}(t)</eq> cùng chu kỳ <eq>T</eq></td></tr><tr><td>Dịch thời gian</td><td><eq>x(t-t_{0})</eq></td><td><eq>e^{-j\frac{2\pi}{T}kt_{0}}c_{k}</eq></td><td></td></tr><tr><td>Dịch tần số</td><td><eq>e^{j\frac{2\pi}{T}k_{0}t}x(t)</eq></td><td><eq>c_{k-k_{0}}</eq></td><td><eq>k_{0} \in \mathbb{Z}</eq></td></tr><tr><td>Đảo thời gian</td><td><eq>x(-t)</eq></td><td><eq>c_{-k}</eq></td><td></td></tr><tr><td>Đối xứng</td><td><eq>x^{*}(t)</eq></td><td><eq>c_{-k}^{*}</eq></td><td></td></tr><tr><td>Parseval</td><td colspan="2"><eq>\frac{1}{T}\int_{T}|x(t)|^{2}dt=\sum_{k=-\infty}^{\infty}|c_{k}|^{2}</eq></td><td>Năng lượng hữu hạn trên một chu kỳ</td></tr></table>

## 3.3. Chuỗi Fourier cho tín hiệu rời rạc theo thời gian

Xét một tín hiệu rời rạc tuần hoàn1 với chu kỳ $N \in \mathbb { Z } ^ { + }$ 

$$
\tilde {x} [ n ] = \tilde {x} [ n - N ], \quad \forall n
$$

Chúng ta có khai triển chuỗi Fourier cho dãy ${ \tilde { x } } [ n ]$ như sau 

$$
\tilde {x} [ n ] = \sum_ {k = - \infty} ^ {\infty} c _ {k} e ^ {j \frac {2 \pi}{N} k n}
$$

Các thành phần tần số $e ^ { j { \frac { 2 \pi } { N } } }$ kn có đặc điểm: 

$$
e ^ {j \frac {2 \pi}{N} k n} = e ^ {j \frac {2 \pi}{N} (k + r N) n}, \quad \forall r \in \mathbb {Z}
$$

Do vậy, ta có 

$$
\tilde {x} [ n ] = \sum_ {k = 0} ^ {N - 1} \tilde {c} _ {k} e ^ {j \frac {2 \pi}{N} k n}, \quad \tilde {c} _ {k} = \sum_ {r} c _ {k + r N}\tag{3.7}
$$

trong đó các hệ số $\tilde { c } _ { k }$ được tính qua các bước như sau. 

(i) Nhân cả hai vế của (3.7) với $e ^ { - j { \frac { 2 \pi } { N } } m n }$ , tính tổng với $n = \overline { { 0 , ( N - 1 ) } }$ 

$$
\sum_ {n = 0} ^ {N - 1} \tilde {x} [ n ] e ^ {- j \frac {2 \pi}{N} m n} = \sum_ {n = 0} ^ {N - 1} \sum_ {k = 0} ^ {N - 1} \tilde {c} _ {k} e ^ {j \frac {2 \pi}{N} (k - m) n}
$$

(ii) Đổi thứ tự lấy tổng ở vế phải 

$$
\sum_ {n = 0} ^ {N - 1} \tilde {x} [ n ] e ^ {- j \frac {2 \pi}{N} m n} = \sum_ {k = 0} ^ {N - 1} \tilde {c} _ {k} \sum_ {n = 0} ^ {N - 1} e ^ {j \frac {2 \pi}{N} (k - m) n}
$$

(iii) Tính trực giao: 

$$
\sum_ {n = 0} ^ {N - 1} e ^ {j \frac {2 \pi}{N} (k - m) n} = \left\{ \begin{array}{l l} N, & \mathrm{khi} k - m = r N \\ 0, & \mathrm{khi} k - m \neq r N \end{array} \right.
$$

Như $\mathrm { v a y }$ 2 

$$
\sum_ {n = 0} ^ {N - 1} \tilde {x} [ n ] e ^ {- j \frac {2 \pi}{N} m n} = N \cdot \tilde {c} _ {m}
$$

Ta có khai triển chuỗi Fourier (DTFS) cho tín hiệu rời rạc như sau 

$$
\begin{array}{c} \tilde {x} [ n ] \xleftrightarrow {\mathrm{DTFS}} \tilde {c} _ {k} \\ \tilde {x} [ n ] = \sum_ {k = 0} ^ {N - 1} \tilde {c} _ {k} e ^ {j \frac {2 \pi}{N} k n} \end{array}\tag{3.8}
$$

trong $\mathrm { \bar { d o } } .$ 

$$
\tilde {c} _ {k} = \frac {1}{N} \sum_ {n = 0} ^ {N - 1} \tilde {x} [ n ] e ^ {- j \frac {2 \pi}{N} k n}\tag{3.9}
$$

Từ (3.9), dễ thấy $\tilde { c } _ { k }$ cũng tuần hoàn với chu kỳ N. Các hệ số $\tilde { c } _ { k }$ được gọi là các hệ số khai triển chuỗi Fourier hay các hệ số phổ của tín hiệu ${ \tilde { x } } [ n ]$ . Thông thường, $\tilde { c } _ { k }$ nhận giá trị phức và được biểu diễn qua hai thành phần: 

• <sup>Biên</sup> <sup>độ:</sup> |<sup>c˜</sup>k| 

• <sup>Pha:</sup> <sup>arg</sup>{<sup>c˜</sup>k}<sup>.</sup> 

Ví dụ 3.7. Tìm khai triển Fourier cho dãy tuần hoàn (với chu kỳ $N = 4 )$ sau 

$$
\tilde {x} [ n ] = \{\ldots , \underset {\uparrow} {- 3}, 2, - 1, 4, \ldots \}
$$

Lời giải. $\mathrm { { \acute { A } p } }$ dụng công thức (3.9) 

$$
\tilde {c} _ {k} = \frac {1}{4} \sum_ {n = 0} ^ {3} \tilde {x} [ n ] e ^ {- j \frac {2 \pi}{4} k n}
$$

Thay các giá trị khác nhau của $k \in \{ 0 , 1 , 2 , 3 \}$ , ta có 

$$
\tilde {c} _ {0} = \frac {1}{4} [ - 3 + 2 - 1 + 4 ] = \frac {1}{2}
$$

$$
\tilde {c} _ {1} = \frac {1}{4} [ - 3 + 2 (- j) - (- 1) + 4 j ] = - \frac {1}{2} + \frac {1}{2} j
$$

$$
\tilde {c} _ {2} = \frac {1}{4} [ - 3 + 2 (- 1) - 1 + 4 (- 1) ] = - \frac {5}{2}
$$

$$
\tilde {c} _ {3} = \frac {1}{4} [ - 3 + 2 j - (- 1) + 4 (- j) ] = - \frac {1}{2} - \frac {1}{2} j
$$

Như $\mathrm { v a y }$ , các hệ số khai triển chuỗi Fourier là một dãy tuần hoàn chu kỳ $N = 4$ 

$$
\tilde {c} _ {k} = \{\ldots , \frac {1}{2}, - \frac {1}{2} + \frac {1}{2} j, - \frac {5}{2}, - \frac {1}{2} - \frac {1}{2} j, \ldots \}
$$

Python. Hàm np.fft.fft của NumPy tính tổng trong (3.9) (chưa chia cho N) với $k = 0 , 1 , \ldots , N - 1$ bằng thuật toán FFT. Dãy x phải chứa đúng một chu kỳ của ${ \tilde { x } } [ n ]$ , bắt đầu từ $n = 0$ . Với dữ liệu của ví dụ trên, c cho 0.5, 0.5 + $0 . 5 j , \ - 2 . 5 , \ - 0 . 5 - 0 . 5 j \}$ , trùng với kết quả tính tay. 

```python
import numpy as np
x = np.array([-3, 2, -1, 4])
c = np.fft.fft(x) / len(x) 
```

Ví dụ 3.8. Hãy tìm khai triển chuỗi Fourier của dãy tuần hoàn 

$$
\tilde {x} [ n ] = 2 \cos (\frac {4 \pi}{5} n - \frac {\pi}{3}) + 3 \sin (\frac {\pi}{2} n + \frac {\pi}{4})
$$

Tính biên độ, pha của các hệ số $\tilde { c } _ { k }$ và biểu diễn chúng trên đồ thị. 

Lời giải. Trước hết, tìm chu kỳ cơ bản của x˜[n]. Với thành phần thứ nhất, $\textstyle { \frac { \omega } { 2 \pi } } =$ $\textstyle { \frac { 4 \pi / 5 } { 2 \pi } } = { \frac { 2 } { 5 } }$ là phân số tối giản nên chu kỳ cơ bản là $N _ { 1 } = 5$ (khác với trường hợp liên tục, chu kỳ không phải là $\begin{array} { r } { \frac { 2 \pi } { \omega } = \frac { 5 } { 2 } } \end{array}$ vì chu kỳ của dãy phải là số nguyên). Với thành phần thứ hai, $\begin{array} { r } { \frac { \omega } { 2 \pi } = \frac { \pi / 2 } { 2 \pi } = \frac { 1 } { 4 } } \end{array}$ nên $N _ { 2 } = 4$ . Chu kỳ N của ${ \tilde { x } } [ n ]$ là bội chung nhỏ nhất của $N _ { 1 }$ và $N _ { 2 } { : }$ 

$$
N = 2 0
$$

$\mathrm { { \AA p } }$ dụng công thức Euler cho từng thành phần, 

$$
\begin{array}{r} 2 \cos (\frac {4 \pi}{5} n - \frac {\pi}{3}) = e ^ {- j \frac {\pi}{3}} e ^ {j \frac {4 \pi}{5} n} + e ^ {j \frac {\pi}{3}} e ^ {- j \frac {4 \pi}{5} n} \\ 3 \sin (\frac {\pi}{2} n + \frac {\pi}{4}) = \frac {3}{2 j} e ^ {j \frac {\pi}{4}} e ^ {j \frac {\pi}{2} n} - \frac {3}{2 j} e ^ {- j \frac {\pi}{4}} e ^ {- j \frac {\pi}{2} n} \end{array}
$$

Trong (3.8), chỉ số k chạy trong một chu kỳ $k = \overline { { 0 , ( N - 1 ) } }$ . Do $\begin{array} { r } { { \frac { 4 \pi } { 5 } } = 8 \cdot { \frac { 2 \pi } { 2 0 } } , { \frac { \pi } { 2 } } = 5 \cdot { \frac { 2 \pi } { 2 0 } } } \end{array}$ và $e ^ { j 2 \pi n } = 1$ nên các thành phần tần số âm được đưa về chu kỳ này: 

$$
e ^ {- j \frac {4 \pi}{5} n} = e ^ {j \frac {2 \pi}{2 0} (2 0 - 8) n} = e ^ {j \frac {2 \pi}{2 0} 1 2 n}, \qquad e ^ {- j \frac {\pi}{2} n} = e ^ {j \frac {2 \pi}{2 0} 1 5 n}
$$

Đồng nhất hệ số với (3.8) và dùng ${ \frac { 1 } { j } } = e ^ { - j { \frac { \pi } { 2 } } } , - { \frac { 1 } { j } } = j = e ^ { j { \frac { \pi } { 2 } } }$ , trong một chu kỳ $k = \overline { { 0 , 1 9 } }$ ta được 

$$
\tilde {c} _ {k} = \left\{ \begin{array}{l l} \frac {3}{2} e ^ {- j \frac {\pi}{4}}, & k = 5 \\ e ^ {- j \frac {\pi}{3}}, & k = 8 \\ e ^ {j \frac {\pi}{3}}, & k = 1 2 \\ \frac {3}{2} e ^ {j \frac {\pi}{4}}, & k = 1 5 \\ 0, & k \text {   côn   lại } \end{array} \right.
$$

và $\tilde { c } _ { k }$ tuần hoàn với chu kỳ 20. Ước chung lớn nhất của các chỉ số 5, 8, 12, 15 và 20 bằng 1, nên $N = 2 0$ đúng là chu kỳ cơ bản của x˜[n]. 

Biên độ và pha của các hệ số khác 0 trong một chu kỳ: 

$$
\begin{array}{l l} | \tilde {c} _ {5} | = | \tilde {c} _ {1 5} | = \frac {3}{2}, & \arg \{\tilde {c} _ {5} \} = - \frac {\pi}{4}, \\ | \tilde {c} _ {8} | = | \tilde {c} _ {1 2} | = 1, & \arg \{\tilde {c} _ {8} \} = - \frac {\pi}{3}, \end{array} \qquad \begin{array}{l l} \arg \{\tilde {c} _ {1 5} \} = \frac {\pi}{4} \\ \arg \{\tilde {c} _ {1 2} \} = \frac {\pi}{3} \end{array}
$$

Với các k còn lại, $\tilde { c } _ { k } = 0$ nên pha không xác định. Hình 3.6 biểu diễn biên độ và pha của $\tilde { c } _ { k }$ trong hai chu kỳ. Do ${ \tilde { x } } [ n ]$ là dãy thực nên $\tilde { c } _ { - k } = \tilde { c } _ { N - k } = \tilde { c } _ { k } ^ { * } ,$ : phổ biên độ đối xứng và $\mathrm { p h } \mathring { \hat { 0 } }$ pha phản đối xứng quanh $k = 0$ (và quanh $k = N / 2 = 1 0 )$ .  

Ví dụ 3.9. Tìm khai triển Fourier của dãy xung đơn vị tuần hoàn với chu kỳ N sau 

$$
\tilde {x} [ n ] = \sum_ {\ell = - \infty} ^ {\infty} \delta [ n - \ell N ]
$$

Lời giải. $\mathrm { { \acute { A } p } }$ dụng công thức (3.9), 

$$
\begin{array}{c} \tilde {c} _ {k} = \frac {1}{N} \sum_ {n = 0} ^ {N - 1} \delta [ n ] e ^ {- j \frac {2 \pi}{N} k n} \\ = \frac {1}{N}, \quad \forall k \end{array}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1e333db87b70a805507e0343ab1f034b0eca839a045592bc800c046a8adae078.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/9fb5e9373d208340bee9180f244086af2d72b55d33063d8c97b5ba4c8cca7921.jpg)



Hình 3.6. Biên độ và pha của các hệ số chuỗi Fourier $\tilde { c } _ { k }$ trong ví dụ 3.8, với $k = \overline { { { - 2 0 , 2 0 } } } ~ ( \tilde { c } _ { k } = 0$ tại các k không được vẽ)


Ví dụ 3.10. Dãy ${ \tilde { x } } [ n ]$ tuần hoàn với chu kỳ N cũng có thể coi là một dãy tuần hoàn có chu kỳ 2N. Nếu $\tilde { c } _ { k } ^ { ( N ) } : = \mathrm { D T F S } \{ \tilde { x } [ n ] _ { N } \}$ và $\bar { c } _ { k } ^ { ( 2 N ) } : = \mathrm { D T F S } \{ \tilde { x } [ n ] _ { 2 N } \}$ . Hãy tính $\tilde { c } _ { k } ^ { ( 2 N ) }$ theo $\tilde { c } _ { k } ^ { ( N ) }$ 

Lời giải. Coi ${ \tilde { x } } [ n ]$ là dãy tuần hoàn chu kỳ 2N, theo (3.9), 

$$
\tilde {c} _ {k} ^ {(2 N)} = \frac {1}{2 N} \sum_ {n = 0} ^ {2 N - 1} \tilde {x} [ n ] e ^ {- j \frac {2 \pi}{2 N} k n}
$$

Tách tổng thành hai nửa: $n = \overline { { 0 , ( N - 1 ) } }$ và $n = m + N$ với $m = \overline { { 0 , ( N - 1 ) } }$ . Trong nửa sau, $\tilde { x } [ m + N ] = \tilde { x } [ m ]$ và 

$$
e ^ {- j \frac {2 \pi}{2 N} k (m + N)} = e ^ {- j \frac {\pi}{N} k m} e ^ {- j \pi k} = (- 1) ^ {k} e ^ {- j \frac {\pi}{N} k m}
$$

Do đó 

$$
\tilde {c} _ {k} ^ {(2 N)} = \frac {1 + (- 1) ^ {k}}{2 N} \sum_ {n = 0} ^ {N - 1} \tilde {x} [ n ] e ^ {- j \frac {\pi}{N} k n}
$$

Khi k lẻ: $\tilde { c } _ { k } ^ { ( 2 N ) } = 0$ 

Khi k = 2m chẵn: $\begin{array} { r } { \tilde { c } _ { 2 m } ^ { ( 2 N ) } = \frac { 1 } { N } \sum _ { n = 0 } ^ { N - 1 } \tilde { x } [ n ] e ^ { - j \frac { 2 \pi } { N } m n } = \tilde { c } _ { m } ^ { ( N ) } } \end{array}$ 

Vậy 

$$
\tilde {c} _ {k} ^ {(2 N)} = \left\{ \begin{array}{l l} \tilde {c} _ {k / 2} ^ {(N)}, & k \text {   chăn } \\ 0, & k \text {   l\'e } \end{array} \right.
$$

Khi coi chu kỳ là 2N, tần số cơ bản giảm một nửa $\textstyle \left( { \frac { 2 \pi } { 2 N } } \right)$ nên hài bậc 2m theo chu kỳ 2N chính là hài bậc m theo chu kỳ $N ;$ các hài bậc lẻ không có mặt trong tín hiệu.  

## 3.3.1. Các tính chất của DTFS

DTFS có các tính chất tương tự như FS (mục 3.2.3). Cách chứng minh cũng tương tự: áp dụng (3.9) rồi đổi biến chỉ số của tổng, thay cho đổi biến tích phân trong trường hợp FS; phần chứng minh được bỏ qua để giữ cho sách gọn nhẹ. Khác với FS, các hệ số trong (3.9) là tổng hữu hạn, nên DTFS luôn tồn tại với mọi dãy tuần hoàn và các tính chất của nó không cần điều kiện hội tụ. 

Các tính chất của DTFS được liệt kê trong bảng 3.2. Do $\tilde { c } _ { k }$ tuần hoàn với chu kỳ N nên $\tilde { c } _ { - k } = \tilde { c } _ { N - k }$ . Khi x˜[n] là dãy thực, tính chất đối xứng cho $\tilde { c } _ { - k } = \tilde { c } _ { k } ^ { \ast } ;$ : phổ biên độ đối xứng và phổ pha phản đối xứng (xem ví dụ 3.8). Quan hệ Parseval cho thấy DTFS bảo toàn công suất của dãy tuần hoàn. 

## 3.4. Biến đổi Fourier cho tín hiệu liên tục

Xét tín hiệu x(t) liên tục không tuần hoàn. Biến đổi Fourier (FT) được sử dụng để chuyển tín hiệu x(t) trên miền thời gian t về miền tần số Ω (dưới dạng $X ( j \Omega ) ,$ ) như trong hình 3.7. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/bf085448cd93d00fc7635f72df71e04695e1066b3ec7dc3bf46ea6a7443f04e3.jpg)



Hình 3.7. Cặp biến đổi Fourier


Cặp biến đổi Fourier (FT) được biểu diễn như sau 

$$
x (t) \xleftrightarrow {\mathrm{FT}} X (j \Omega)
$$


Bảng 3.2. Các tính chất của chuỗi Fourier cho dãy tuần hoàn (x˜[n] tuần hoàn với chu kỳ N)


<table><tr><td>Tính chất</td><td><eq>\tilde{x}[n]</eq></td><td><eq>\tilde{c}_{k}</eq></td><td>Điều kiện</td></tr><tr><td>Tuyến tính</td><td><eq>a_{1}\tilde{x}_{1}[n]+a_{2}\tilde{x}_{2}[n]</eq></td><td><eq>a_{1}\tilde{c}_{k}^{(1)}+a_{2}\tilde{c}_{k}^{(2)}</eq></td><td><eq>\tilde{x}_{1}[n],\ \tilde{x}_{2}[n]</eq> cùng chu kỳ <eq>N</eq></td></tr><tr><td>Dịch thời gian</td><td><eq>\tilde{x}[n-n_{0}]</eq></td><td><eq>e^{-j\frac{2\pi}{N}kn_{0}}\tilde{c}_{k}</eq></td><td><eq>n_{0}\in\mathbb{Z}</eq></td></tr><tr><td>Dịch tần số</td><td><eq>e^{j\frac{2\pi}{N}k_{0}n}\tilde{x}[n]</eq></td><td><eq>\tilde{c}_{k-k_{0}}</eq></td><td><eq>k_{0}\in\mathbb{Z}</eq></td></tr><tr><td>Đảo thời gian</td><td><eq>\tilde{x}[-n]</eq></td><td><eq>\tilde{c}_{-k}</eq></td><td></td></tr><tr><td>Đối xứng</td><td><eq>\tilde{x}^{*}[n]</eq></td><td><eq>\tilde{c}_{-k}^{*}</eq></td><td></td></tr><tr><td>Parseval</td><td colspan="3"><eq>\frac{1}{N}\sum_{n=0}^{N-1}|\tilde{x}[n]|^{2}=\sum_{k=0}^{N-1}|\tilde{c}_{k}|^{2}</eq></td></tr></table>

trong đó, biến đổi Fourier được định nghĩa 

$$
X (j \Omega) = \mathrm{FT} \{x (t) \} = \int_ {- \infty} ^ {\infty} x (t) e ^ {- j \Omega t} d t\tag{3.10}
$$

và biến đổi ngược là 

$$
x (t) = \mathrm{FT} ^ {- 1} \{X (j \Omega) \} = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} X (j \Omega) e ^ {j \Omega t} d \Omega\tag{3.11}
$$

Dạng biểu diễn của tín hiệu trên miền tần số, $X ( j \Omega ) ^ { 2 }$ , còn được gọi là $\mathrm { p h } \mathring { \hat { 0 } }$ của tín hiệu $x ( t )$ , trong đó 

$\left| X ( j \Omega ) \right| \mathrm  - \ p h \} \overset { \mathrm { 2 } } { \partial }$ biên độ 

• <sup>arg</sup>{<sup>X(jΩ)</sup>} <sup>-</sup> <sup>phổ</sup> <sup>pha</sup> 

Ngoài ra, trên thực tế người ta hay biểu diễn trên miền tần số thông thường $f$ đơn vị hertz (Hz) thay vì tần số góc Ω đơn vị radian: $\begin{array} { r } { f = \frac { \Omega } { 2 \pi } } \end{array}$ , khi $\mathrm { { \dot { d o } } ^ { 2 } }$ 

$$
\begin{array}{r} X (f) = \left. X (j \Omega) \right| _ {\Omega = 2 \pi f} = \int_ {- \infty} ^ {\infty} x (t) e ^ {- j 2 \pi f t} d t \\ x (t) = \int_ {- \infty} ^ {\infty} X (f) e ^ {j 2 \pi f t} d f \end{array}
$$

Ví dụ 3.11. Hãy tìm biến đổi Fourier của hàm mũ: $x ( t ) = e ^ { a t } u ( t )$ 

$\mathbf { g i } \mathrm { \dot { a } i }$ $\mathrm { { \acute { A } p } }$ dụng định nghĩa, theo công thức (3.10) ta có 

$$
\begin{array}{r l} & X (j \Omega) = \int_ {- \infty} ^ {\infty} e ^ {a t} u (t) e ^ {- j \Omega t} d t \\ & \qquad = \int_ {0} ^ {\infty} e ^ {(a - j \Omega) t} d t \\ & \qquad = \frac {1}{a - j \Omega} \left. e ^ {(a - j \Omega) t} \right| _ {0} ^ {\infty} \end{array}
$$

Ở đây, ta cần xem xét giới hạn sau 

$$
\lim _ {t \to \infty} e ^ {(a - j \Omega) t}
$$

Dễ thấy, $\mathrm { \ g i \tilde { \mathrm { O i } } }$ hạn này sẽ hội tụ (về 0) khi $\mathrm { R e } \{ a \} < 0$ . Như vậy, biến đổi Fourier sẽ là 

$$
X (j \Omega) = - \frac {1}{a - j \Omega}, \quad \mathrm{khi} \operatorname{Re} \{a \} <   0
$$

$\mathrm { P h } \mathring { \widehat { \boldsymbol { \mathrm { o } } } }$ biên độ của tín hiệu này với một số $\mathrm { \ g i \acute { a } }$ trị khác nhau của a được biểu diễn ở hình 3.8. 

Trong trường hợp $\mathrm { R e } \{ a \} \ge 0$ , giới hạn trên không tồn tại và biến đổi Fourier sẽ không tồn tại.  

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/6fc3d312baf48fc7b4fe7f61c37696df0a8cd14c4d3b1bbb502aaab1230178cf.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1a29c90a062a73acc0b3ecf3492aaa5203140215466dcd30eb6cc745f1e52d71.jpg)



Hình 3.8. Phổ biên độ của tín hiệu $x ( t ) = e ^ { a t } u ( t )$ với một số giá trị thực $a < 0$


Ví dụ 3.12. Hãy tìm biến đổi Fourier của xung chữ nhật: 

$$
x (t) = \left\{ \begin{array}{l l} 1, & | t | <   T _ {0} / 2 \\ 0, & | t | > T _ {0} / 2 \end{array} \right.
$$

Lời $\mathbf { g i } \dot { \mathbf { a } } \mathbf { i }$ $\mathrm { { \acute { A } p } }$ dụng định nghĩa ta có 

$$
\begin{array}{r l} & {X (j \Omega) = \int_ {- \infty} ^ {\infty} x (t) e ^ {- j \Omega t} d t} \\ & {\qquad = \int_ {- T _ {0} / 2} ^ {T _ {0} / 2} e ^ {- j \Omega t} d t} \\ & {\qquad = \frac {1}{- j \Omega} (e ^ {- j \Omega T _ {0} / 2} - e ^ {j \Omega T _ {0} / 2})} \\ & {\qquad = \frac {1}{- j \Omega} (- 2 j \sin (\Omega T _ {0} / 2))} \\ & {\qquad = \frac {2 \sin (\Omega T _ {0} / 2)}{\Omega}} \end{array}
$$

Phép tính trên đúng với $\Omega \neq 0$ . Tại $\Omega = 0 .$ , tính trực tiếp $\begin{array} { r } { X ( j 0 ) = \int _ { - T _ { 0 } / 2 } ^ { T _ { 0 } / 2 } d t = T _ { 0 } } \end{array}$ trùng với giới hạn của $\frac { 2 \sin ( \Omega T _ { 0 } / 2 ) } { \Omega }$ khi $\Omega \to 0$ . Do đó công thức đúng với mọi Ω khi hiểu giá trị tại $\Omega = 0$ theo giới hạn. 

Trong trường hợp đặc biệt này, phổ của tín hiệu là một hàm thực theo biến Ω (cụ thể hơn là hàm sinc). Hình 3.9 biểu diễn phổ biên độ và phổ pha của tín hiệu xung chữ nhật này với độ rộng xung $T _ { 0 } = 1$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/0dafceb0750e0f64d56ea8a18424f15311a9eae759b117c03a2e17e20929d694.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b6d14de34dd3f17867b5b2282ec7160dbbd40f2fe2bb2fbeb4e0a0418d7b7204.jpg)



Hình 3.9. Phổ của xung chữ nhật $T _ { 0 } = 1$


Ví dụ 3.13. Hãy tìm biến đổi Fourier của hàm delta Dirac $x ( t ) = \delta ( t )$ 

Lời giải. $\mathrm { { \acute { A } p } }$ dụng tính chất (1.14) của hàm xung đơn $\mathrm { v i } ,$ ta có 

$$
\begin{array}{r l} & X (j \Omega) = \int_ {- \infty} ^ {\infty} \delta (t) e ^ {- j \Omega t} d t \\ & \quad = e ^ {- j \Omega 0} \\ & \quad = 1 \end{array}
$$

Trong ví dụ về biến đổi Fourier của xung chữ nhật, nếu ta chuẩn hóa xung $\mathrm { d } \acute { \mathrm { e } }$ có diện tích bằng 1 (biên độ $1 / T _ { 0 } )$ rồi cho độ rộng xung $T _ { 0 }$ giảm dần về 0 thì phổ của xung, $\frac { \sin ( \Omega T _ { 0 } / 2 ) } { \Omega T _ { 0 } / 2 }$ (hàm sinc), sẽ thay đổi chậm dần và duỗi thẳng ra thành đường thẳng (bằng 1).  

## 3.4.1. Điều kiện tồn tại FT

Một tín hiệu x(t) sẽ có biến đổi Fourier nếu thỏa mãn đầy đủ các điều kiện sau 

(i) $\textstyle \int _ { - \infty } ^ { \infty } | x ( t ) | d t < \infty$ 

(ii) x(t) có hữu hạn các cực đại và cực tiểu trong bất cứ khoảng thời gian hữu hạn nào. 

(iii) x(t) có hữu hạn các điểm gián đoạn trong bất cứ khoảng thời gian hữu hạn nào và mỗi điểm gián đoạn đó phải có giá trị hữu hạn. 

Ví dụ 3.14. Hãy xét biến đổi Fourier cho tín hiệu $x ( t ) = \cos ( \Omega _ { 0 } t )$ 

Lời giải. Tín hiệu hình sin nói riêng và tín hiệu tuần hoàn (khác 0) nói chung đều không thỏa mãn điều kiện đầu tiên (i) ở trên. Tuy nhiên, các điều kiện (i)–(iii) chỉ là điều kiện đủ, nên cần xét trực tiếp tích phân (3.10). Với $\Omega _ { 0 } > 0$ , tại $\Omega = \Omega _ { 0 }$ ta có 

$$
\int_ {- A} ^ {A} \cos (\Omega_ {0} t) e ^ {- j \Omega_ {0} t} d t = \frac {1}{2} \int_ {- A} ^ {A} \left(1 + e ^ {- j 2 \Omega_ {0} t}\right) d t = A + \frac {\sin (2 \Omega_ {0} A)}{2 \Omega_ {0}}
$$

tiến ra vô cùng khi $A \to \infty$ . Tích phân (3.10) không hội tụ, do vậy không tồn tại biến đổi Fourier (theo nghĩa thông thường) cho tín hiệu này.  

## 3.4.2. Biến đổi Fourier mở rộng

Xét tín hiệu ở miền tần số $X ( j \Omega ) = 2 \pi \delta ( \Omega - \Omega _ { 0 } )$ , từ công thức biến đổi Fourier ngược trong (3.11), ta có: 

$$
\begin{array}{c} x (t) = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} 2 \pi \delta (\Omega - \Omega_ {0}) e ^ {j \Omega t} d \Omega \\ = e ^ {j \Omega_ {0} t} \end{array}
$$

Như vậy, với tín hiệu hình sin $x ( t ) = \cos ( \Omega _ { 0 } t )$ 

$$
x (t) = \cos (\Omega_ {0} t) = \frac {1}{2} [ e ^ {j \Omega_ {0} t} + e ^ {- j \Omega_ {0} t} ]
$$

ta tính được phổ của tín hiệu này 

$$
X (j \Omega) = \pi [ \delta (\Omega - \Omega_ {0}) + \delta (\Omega + \Omega_ {0}) ]
$$

Điều này trái ngược với ví dụ trước khi nói về sự tồn tại của FT. Lý do nằm ở cặp biến đổi: $e ^ { j \overleftarrow { \Omega } _ { 0 } t }$ và $2 \pi \delta ( \Omega - \Omega _ { 0 } )$ . Trong cặp biến đổi này, ta có thể thực hiện được biến đổi ngược mà không thực hiện được biến đổi thuận (do đặc điểm kì dị của hàm xung đơn vị delta Dirac). Như vậy, chặt chẽ mà nói thì đây không phải là một cặp biến đổi Fourier hoàn chỉnh. Biến đổi Fourier mở rộng được định nghĩa là biến đổi Fourier thông thường có kèm theo việc công nhận sự tồn tại của cặp biến đổi Fourier ở trên. Khi đó, ta có thể biểu diễn được phổ của tín hiệu hình sin như trong hình 3.10. Ta thấy tín hiệu hình sin tại tần số nào sẽ có phổ vạch (xung đơn vị) tại tần số đó. 

Ngoài ra, ta cũng có thể tìm được phổ cho một tín hiệu bất kỳ $x ( t )$ tuần hoàn với chu kỳ T. Đầu tiên, thực hiện khai triển chuỗi Fourier 

$$
x (t) = \sum_ {k = - \infty} ^ {\infty} c _ {k} e ^ {j \frac {2 \pi}{T} k t}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/bf5ecce49398100ee692b575dc40a531fbd042815efaa6f9d2833ad4327e4070.jpg)



Hình 3.10. Phổ (vạch) của tín hiệu hình sin


Tiếp theo, áp dụng biến đổi Fourier mở rộng ta được 

$$
X (j \Omega) = \sum_ {k = - \infty} ^ {\infty} (2 \pi c _ {k}) \delta (\Omega - \frac {2 \pi}{T} k)\tag{3.12}
$$

Có thể kết luận rằng, tín hiệu tuần hoàn luôn có phổ là các vạch (các hàm xung đơn vị) đặt tại các tần số $k \frac { 2 \pi } { T }$ , có độ lớn $\left( 2 \pi c _ { k } \right)$ . 

Ví dụ 3.15. Tìm FT của dãy xung đơn vị tuần hoàn 

$$
x (t) = \sum_ {\ell = - \infty} ^ {\infty} \delta (t - \ell T)
$$

Lời giải. Trong ví dụ 3.3, chúng ta đã tính được các hệ số $c _ { k }$ trong khai triển chuỗi Fourier của $x ( t )$ 

$$
c _ {k} = \frac {1}{T}, \forall k
$$

Do đó, phổ của dãy xung đơn vị tuần hoàn được biểu diễn như sau 

$$
X (j \Omega) = \sum_ {k = - \infty} ^ {\infty} \frac {2 \pi}{T} \delta (\Omega - \frac {2 \pi}{T} k)\tag{3.13}
$$

 

## 3.4.3. Tính chất tuyến tính

Nếu có các cặp biến đổi Fourier 

$$
\begin{array}{l} x _ {1} (t) \xleftrightarrow {\mathrm{FT}} X _ {1} (j \Omega) \\ x _ {2} (t) \xleftrightarrow {\mathrm{FT}} X _ {2} (j \Omega) \end{array}
$$

thì 

$$
a _ {1} x _ {1} (t) + a _ {2} x _ {2} (t) \xleftrightarrow {\mathrm{FT}} a _ {1} X _ {1} (j \Omega) + a _ {2} X _ {2} (j \Omega)
$$

trong đó $a _ { 1 } , a _ { 2 }$ là các hằng số. 

Từ tính chất này ta thấy, nếu một tín hiệu có cường độ lớn (trên miền thời gian) thì $\mathrm { p h } \mathring { \hat { 0 } }$ của nó cũng lớn tương ứng, và ngược lại. Nếu một tín hiệu là tổng hợp của nhiều thành phần, ví dụ như tín hiệu thu được ở ăng-ten của máy thu vô tuyến, thì phổ của tín hiệu đó cũng sẽ là tổng hợp của nhiều thành phần phổ tương ứng. 

## 3.4.4. Tính chất dịch thời gian

$$
x (t - t _ {0}) \stackrel {\mathrm{FT}} {\longleftrightarrow} e ^ {- j \Omega t _ {0}} X (j \Omega)
$$

Chứng minh. Theo định nghĩa 

$$
x (t - t _ {0}) \xrightarrow {\mathrm{FT}} \int_ {- \infty} ^ {\infty} x (t - t _ {0}) e ^ {- j \Omega t} d t
$$

Đổi biến $t ^ { \prime } = t - t _ { 0 }$ , ta được 

$$
\begin{array}{l} x (t - t _ {0}) \xrightarrow {\mathrm{FT}} \int_ {- \infty} ^ {\infty} x (t ^ {\prime}) e ^ {- j \Omega (t ^ {\prime} + t _ {0})} d t ^ {\prime} \\ \qquad = e ^ {- j \Omega t _ {0}} \int_ {- \infty} ^ {\infty} x (t ^ {\prime}) e ^ {- j \Omega (t ^ {\prime})} d t ^ {\prime} \\ \qquad = e ^ {- j \Omega t _ {0}} X (j \Omega) \end{array}
$$

Dễ thấy, so với tín hiệu ban đầu $x ( t )$ , tín hiệu trễ $x ( t - t _ { 0 } )$ có phổ biên độ giữ nguyên, còn phổ pha chỉ thêm một thành phần tuyến tính $- \Omega t _ { 0 }$ . Khi đó dạng tín hiệu và thông tin chứa trong tín hiệu không thay đổi. Chẳng hạn, các máy thu thanh ở những khoảng cách khác nhau nhận cùng một chương trình với độ trễ khác nhau, nhưng người nghe nhận được cùng một nội dung. Trong trường hợp này, việc phổ biên độ được giữ nguyên là yếu tố quyết định để nội dung tín hiệu không đổi, còn sự thay đổi của phổ pha chỉ phản ánh thời điểm tín hiệu đến máy thu. 

## 3.4.5. Dịch tần số

$$
e ^ {j \Omega_ {0} t} x (t) \xleftrightarrow {\mathrm{FT}} X (j (\Omega - \Omega_ {0}))
$$

Chứng minh. Theo định nghĩa 

$$
\begin{array}{r l} e ^ {j \Omega_ {0} t} x (t) & \xrightarrow {\mathrm{FT}} \int_ {- \infty} ^ {\infty} e ^ {j \Omega_ {0} t} x (t) e ^ {- j \Omega t} d t \\ & = \int_ {- \infty} ^ {\infty} x (t) e ^ {- j (\Omega - \Omega_ {0}) t} d t \\ & = X (j (\Omega - \Omega_ {0})) \end{array}
$$

Như vậy, khi cho một tín hiệu băng cơ sở $x ( t )$ nhân với một dao động hình sin $e ^ { j \Omega _ { 0 } t }$ thì tín hiệu đó sẽ được đẩy lên tần số cao (xung quanh tần số trung tâm $\Omega _ { 0 } )$ còn gọi là tín hiệu thông dải (xem hình 3.11). Đây là một thao tác rất quan trọng trong các hệ thống thông tin vô tuyến. Tín hiệu được điều chế lên tần số cao thông thường sẽ truyền được đi xa hơn, và phù hợp hơn với môi trường truyền dẫn. Ngoài ra, việc đưa tín hiệu băng cơ sở lên tần số cao cũng nhằm đảm bảo cho hệ thống hoạt động đúng trong dải tần được cấp phép. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/e51520a75ec0bfb8f404ae297abe4c8b91db7477d74c219498c6397d306f7820.jpg)



Hình 3.11. Tín hiệu băng cơ sở (baseband) sau khi dịch tần sẽ thành tín hiệu thông dải (bandpass)


## 3.4.6. Các tính chất đối xứng

$$
x ^ {*} (t) \xleftrightarrow {\mathrm{FT}} X ^ {*} (- j \Omega)
$$

Chứng minh. Theo định nghĩa 

$$
x ^ {*} (t) \xrightarrow {\mathrm{FT}} \int_ {- \infty} ^ {\infty} x ^ {*} (t) e ^ {- j \Omega t} d t = A
$$

Lấy liên hợp phức của A, ta được 

$$
\begin{array}{r l} A ^ {*} & = \int_ {- \infty} ^ {\infty} (x ^ {*} (t) e ^ {- j \Omega t}) ^ {*} d t \\ & = \int_ {- \infty} ^ {\infty} x (t) e ^ {j \Omega t} d t \\ & = X (- j \Omega) \end{array}
$$

Do đó, 

$$
A = X ^ {*} (- j \Omega)
$$

Một hệ quả của tính chất này là trường hợp tín hiệu trên thực tế. Do $x ( t ) \in \mathbb { R }$ nên $x ( t ) = x ^ { * } ( t )$ . Thực hiện biến đổi Fourier ta được 

$$
X (j \Omega) = X ^ {*} (- j \Omega)
$$

Do đó 

$$
\begin{array}{c} | X (j \Omega) | = | X (- j \Omega) | \\ \arg \{X (j \Omega) \} = - \arg \{X (- j \Omega) \} \end{array}
$$

Như vậy, một tín hiệu trên thực tế luôn có phổ biên độ đối xứng và phổ pha phản đối xứng. 

Ví dụ 3.16. Nếu $x ( t )$ thực và $x ( t ) = x _ { e } ( t ) + x _ { o } ( t )$ , hãy tìm FT của $x _ { e } ( t )$ và của $x _ { o } ( t ) ?$ 

Lời giải. Giả thiết $x ( t )$ có biến đổi Fourier $X ( j \Omega )$ . Nhắc lại, $\begin{array} { r } { x _ { e } ( t ) = \frac { x ( t ) + x ( - t ) } { 2 } } \end{array}$ và $\begin{array} { r } { x _ { o } ( t ) = \frac { x ( t ) - x ( - t ) } { 2 } } \end{array}$ . Trước hết, tìm FT của $x ( - t )$ : đổi biến $t ^ { \prime } = - t$ 

$$
\int_ {- \infty} ^ {\infty} x (- t) e ^ {- j \Omega t} d t = \int_ {- \infty} ^ {\infty} x (t ^ {\prime}) e ^ {j \Omega t ^ {\prime}} d t ^ {\prime} = X (- j \Omega)
$$

<sup>Do</sup> <sup>x(t)</sup> <sup>thực,</sup> <sup>thay</sup> <sup>Ω</sup> <sup>bởi</sup> −<sup>Ω</sup> <sup>trong</sup> <sup>hệ</sup> <sup>quả</sup> $X ( j \Omega ) ~ = ~ X ^ { * } ( - j \Omega )$ ở trên, ta có $X ( - j \Omega ) = X ^ { \ast } ( j \Omega )$ . Áp dụng tính chất tuyến tính, 

$$
\begin{array}{r l} & x _ {e} (t) \xleftarrow {\mathrm{FT}} \frac {X (j \Omega) + X ^ {*} (j \Omega)}{2} = \mathrm{Re} \{X (j \Omega) \} \\ & x _ {o} (t) \xleftarrow {\mathrm{FT}} \frac {X (j \Omega) - X ^ {*} (j \Omega)}{2} = j \mathrm{Im} \{X (j \Omega) \} \end{array}
$$

Như vậy, với tín hiệu thực, phần chẵn tương ứng với phần thực của phổ, còn phần lẻ tương ứng với phần ảo của phổ (nhân với j).  

## 3.4.7. Chập trên miền thời gian

Với $x _ { 1 } ( t ) , x _ { 2 } ( t )$ khả tích tuyệt đối, 

$$
x _ {1} (t) * x _ {2} (t) \xleftrightarrow {\mathrm{FT}} X _ {1} (j \Omega) X _ {2} (j \Omega)
$$

Chứng minh. Theo định nghĩa của phép chập và của biến đổi Fourier, 

$$
\begin{array}{c} x _ {1} (t) * x _ {2} (t) \xrightarrow {\mathrm{FT}} \int_ {- \infty} ^ {\infty} \left(\int_ {- \infty} ^ {\infty} x _ {1} (\tau) x _ {2} (t - \tau) d \tau\right) e ^ {- j \Omega t} d t \\ = \int_ {- \infty} ^ {\infty} \int_ {- \infty} ^ {\infty} x _ {1} (\tau) x _ {2} (t - \tau) e ^ {- j \Omega t} d \tau d t \end{array}
$$

Đổi thứ tự lấy tích phân (hợp lệ khi $x _ { 1 } ( t ) , x _ { 2 } ( t )$ khả tích tuyệt đối, theo định lý Fubini) và áp dụng tính chất dịch theo thời gian, 

$$
\begin{array}{l} x _ {1} (t) * x _ {2} (t) \xrightarrow {\mathrm{FT}} \int_ {- \infty} ^ {\infty} \int_ {- \infty} ^ {\infty} x _ {1} (\tau) x _ {2} (t - \tau) e ^ {- j \Omega t} d \tau d t \\ \qquad = \int_ {- \infty} ^ {\infty} x _ {1} (\tau) \left(\int_ {- \infty} ^ {\infty} x _ {2} (t - \tau) e ^ {- j \Omega t} d t\right) d \tau \\ \qquad = \int_ {- \infty} ^ {\infty} x _ {1} (\tau) e ^ {- j \Omega \tau} X _ {2} (j \Omega) d \tau \\ \qquad = X _ {2} (j \Omega) \int_ {- \infty} ^ {\infty} x _ {1} (\tau) e ^ {- j \Omega \tau} d \tau \\ \qquad = X _ {2} (j \Omega) X _ {1} (j \Omega) \end{array}
$$

Như vậy, một phép toán khá phức tạp là phép chập trên miền thời gian khi chuyển về miền tần số đã trở thành phép nhân đơn giản hơn rất nhiều. 

Ngược lại, phép nhân trên miền thời gian tương ứng với phép chập trên miền tần số (tính chất nhân): 

$$
x _ {1} (t) x _ {2} (t) \xleftrightarrow {\mathrm{FT}} \frac {1}{2 \pi} [ X _ {1} (j \Omega) * X _ {2} (j \Omega) ] = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} X _ {1} (j \theta) X _ {2} (j (\Omega - \theta)) d \theta\tag{3.14}
$$

Chứng minh. Giả thiết $x _ { 2 } ( t )$ và $X _ { 1 } ( j \Omega )$ khả tích tuyệt đối. Thay $x _ { 1 } ( t )$ bởi công thức biến đổi ngược (3.11) và đổi thứ tự lấy tích phân (định lý Fubini), 

$$
\begin{array}{r l} & x _ {1} (t) x _ {2} (t) \xrightarrow {\mathrm{FT}} \int_ {- \infty} ^ {\infty} \left(\frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} X _ {1} (j \theta) e ^ {j \theta t} d \theta\right) x _ {2} (t) e ^ {- j \Omega t} d t \\ & \qquad = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} X _ {1} (j \theta) \left(\int_ {- \infty} ^ {\infty} x _ {2} (t) e ^ {- j (\Omega - \theta) t} d t\right) d \theta \\ & \qquad = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} X _ {1} (j \theta) X _ {2} (j (\Omega - \theta)) d \theta \end{array}
$$

 

Tính chất nhân cũng được dùng theo nghĩa mở rộng (mục 3.4.2) khi một trong hai $\mathrm { p h } \mathring { \hat { 0 } }$ chứa xung Dirac, chẳng hạn khi lấy mẫu tín hiệu (chương 4). Với cách chứng minh tương tự, chúng ta có thể tìm được FT của tương quan chéo giữa hai tín hiệu. 

## 3.4.8. Các tính chất khác

Sau đây là một số tính chất khác của biến đổi Fourier (bạn đọc có thể tự chứng minh) và ý nghĩa của chúng. 

3.4.8.1. Đạo hàm. 

$$
\frac {d}{d t} x (t) \xleftrightarrow {\mathrm{FT}} j \Omega X (j \Omega)
$$

3.4.8.2. Tích phân. 

$$
\int_ {- \infty} ^ {t} x (\tau) d \tau \xleftrightarrow {\mathrm{FT}} \frac {1}{j \Omega} X (j \Omega) + \pi X (j 0) \delta (\Omega)
$$

3.4.8.3. Co giãn trên miền thời gian và tần số. 

$$
x (a t) \xleftrightarrow {\mathrm{FT}} \frac {1}{| a |} X \left(j \frac {\Omega}{a}\right)
$$

với $a \in \mathbb { R } , a \neq 0$ . Ta thấy, nếu một tín hiệu trải rộng trên miền thời gian thì sẽ co hẹp trên miền tần số và ngược lại. 

3.4.8.4. Đối ngẫu. Nếu 

$$
x (t) \stackrel {\mathrm{FT}} {\longleftrightarrow} X (j \Omega)
$$

thì 

$$
X (j t) \xleftrightarrow {\mathrm{FT}} 2 \pi x (- \Omega)
$$

Một ví dụ quen thuộc thể hiện tính chất này là nếu một tín hiệu là xung chữ nhật trên miền thời gian thì sẽ có phổ theo hàm sinc, và ngược lại, nếu trên miền thời gian ta có một tín hiệu có dạng của hàm sinc thì phổ của nó lại là một xung chữ nhật. 

3.4.8.5. Quan hệ Parseval. Nếu $x ( t )$ có năng lượng hữu hạn thì 

$$
\begin{array}{r} \int_ {- \infty} ^ {\infty} | x (t) | ^ {2} d t = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} | X (j \Omega) | ^ {2} d \Omega \\ = \int_ {- \infty} ^ {\infty} | X (f) | ^ {2} d f \end{array}
$$

Chứng minh. Ta chứng minh với giả thiết $x ( t )$ và $X ( j \Omega )$ đều khả tích tuyệt $\mathrm { d } \acute { \mathrm { o 1 } } ;$ khi đó công thức biến đổi ngược (3.11) đúng và được phép đổi thứ tự lấy tích phân (định lý Fubini). Viết $| x ( t ) | ^ { 2 } = x ^ { * } ( t ) { \dot { x } } ( t )$ rồi thay $x ( t )$ bởi (3.11): 

$$
\begin{array}{r} \int_ {- \infty} ^ {\infty} | x (t) | ^ {2} d t = \int_ {- \infty} ^ {\infty} x ^ {*} (t) \left(\frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} X (j \Omega) e ^ {j \Omega t} d \Omega\right) d t \\ = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} X (j \Omega) \left(\int_ {- \infty} ^ {\infty} x ^ {*} (t) e ^ {j \Omega t} d t\right) d \Omega \end{array}
$$

Tích phân trong ngoặc là liên hợp phức của $X ( j \Omega )$ 

$$
\int_ {- \infty} ^ {\infty} x ^ {*} (t) e ^ {j \Omega t} d t = \left(\int_ {- \infty} ^ {\infty} x (t) e ^ {- j \Omega t} d t\right) ^ {*} = X ^ {*} (j \Omega)
$$

Do đó 

$$
\int_ {- \infty} ^ {\infty} | x (t) | ^ {2} d t = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} X (j \Omega) X ^ {*} (j \Omega) d \Omega = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} | X (j \Omega) | ^ {2} d \Omega
$$

Cuối cùng, đổi biến $\Omega = 2 \pi f \ ( d \Omega = 2 \pi d f )$ và dùng $X ( f ) = X ( j 2 \pi f )$ , ta được đẳng thức thứ hai.  

Quan hệ Parseval vẫn đúng với mọi tín hiệu có năng lượng hữu hạn, kể cả khi $x ( t )$ hoặc $X ( j \Omega )$ không khả tích tuyệt đối (ví dụ hàm sinc); chứng minh cho trường hợp tổng quát này (định lý Plancherel) nằm ngoài phạm vi của giáo trình. 

Biến đổi Fourier bảo toàn năng lượng của tín hiệu (vế trái là tổng năng lượng của tín hiệu trên miền thời gian, và vế phải là tổng năng lượng của tín hiệu trên miền tần số $f )$ 

Các tính chất của biến đổi Fourier được tóm tắt trong bảng 3.3; bảng 3.4 tổng hợp các cặp biến đổi Fourier thông dụng. 

## 3.5. Đáp ứng tần số và khái niệm bộ lọc

Xét hệ thống LTI liên tục với đáp ứng xung $h ( t )$ . Biến đổi Fourier của đáp ứng xung được gọi là đáp ứng tần số của hệ thống. 

$$
H (j \Omega) := \mathrm{FT} \{h (t) \} = \int_ {- \infty} ^ {\infty} h (t) e ^ {- j \Omega t} d t\tag{3.15}
$$

Khi đó, áp dụng tính chất chập trên miền thời gian, ta có (xem hình 3.12) 

$$
\begin{array}{c} Y (j \Omega) = \mathrm{FT} \{y (t) \} = \mathrm{FT} \{x (t) * h (t) \} \\ = X (j \Omega) H (j \Omega) \end{array}\tag{3.16}
$$


Bảng 3.3. Các tính chất của biến đổi Fourier


<table><tr><td>Tính chất</td><td><eq>x(t)</eq></td><td><eq>X(j\Omega)</eq></td><td>Điều kiện</td></tr><tr><td>Tuyến tính</td><td><eq>a_{1}x_{1}(t)+a_{2}x_{2}(t)</eq></td><td><eq>a_{1}X_{1}(j\Omega)+a_{2}X_{2}(j\Omega)</eq></td><td></td></tr><tr><td>Dịch thời gian</td><td><eq>x(t-t_{0})</eq></td><td><eq>e^{-j\Omega t_{0}}X(j\Omega)</eq></td><td></td></tr><tr><td>Dịch tần số</td><td><eq>e^{j\Omega_{0}t}x(t)</eq></td><td><eq>X(j(\Omega-\Omega_{0}))</eq></td><td></td></tr><tr><td>Đối xứng</td><td><eq>x^{*}(t)</eq></td><td><eq>X^{*}(-j\Omega)</eq></td><td></td></tr><tr><td>Đảo thời gian</td><td><eq>x(-t)</eq></td><td><eq>X(-j\Omega)</eq></td><td></td></tr><tr><td>Co giãn</td><td><eq>x(at)</eq></td><td><eq>\frac{1}{|a|}X\left(j\frac{\Omega}{a}\right)</eq></td><td><eq>a\in\mathbb{R},a\neq 0</eq></td></tr><tr><td>Chập</td><td><eq>x_{1}(t)*x_{2}(t)</eq></td><td><eq>X_{1}(j\Omega)X_{2}(j\Omega)</eq></td><td><eq>x_{1}(t),x_{2}(t)khả</eq> tích tuyệt đối</td></tr><tr><td>Nhân</td><td><eq>x_{1}(t)x_{2}(t)</eq></td><td><eq>\frac{1}{2\pi}X_{1}(j\Omega)*X_{2}(j\Omega)</eq></td><td><eq>x_{2}(t),X_{1}(j\Omega)khả</eq> tích tuyệt đối</td></tr><tr><td>Đạo hàm</td><td><eq>\frac{dx(t)}{dt}</eq></td><td><eq>j\Omega X(j\Omega)</eq></td><td></td></tr><tr><td>Tích phân</td><td><eq>\int_{-\infty}^{t}x(\tau)d\tau</eq></td><td><eq>\frac{1}{j\Omega}X(j\Omega)+\pi X(j0)\delta(\Omega)</eq></td><td></td></tr><tr><td>Đối ngẫu</td><td><eq>X(jt)</eq></td><td><eq>2\pi x(-\Omega)</eq></td><td></td></tr><tr><td>Parseval</td><td colspan="2"><eq>\int_{-\infty}^{\infty}|x(t)|^{2}dt=\frac{1}{2\pi}\int_{-\infty}^{\infty}|X(j\Omega)|^{2}d\Omega</eq></td><td>Năng lượng hữu hạn</td></tr></table>


Giả thiết các biến đổi Fourier liên quan tồn tại. 


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/520a78b864b69a159744e7f27258c1f9252f5ba9896ecd4c94f29add822f4c15.jpg)



Hình 3.12. Đáp ứng tần số của hệ thống LTI


Đáp ứng tần số $H ( j \Omega )$ là một hàm phức của tần số $\Omega ,$ do $\mathrm { v a y } ,$ , nó thường được biểu diễn thông qua modulus và argument: 

Đáp ứng biên độ: $| H ( j \Omega ) |$ _ 

Đáp ứng pha: arg H(jΩ) 


Bảng 3.4. Các cặp biến đổi Fourier thông dụng (nhóm dưới: theo nghĩa mở rộng, mục 3.4.2)


<table><tr><td>x(t)</td><td>X(jΩ)</td><td>Điều kiện</td></tr><tr><td><eq>\delta(t)</eq></td><td>1</td><td></td></tr><tr><td><eq>e^{at}u(t)</eq></td><td><eq>\frac{1}{j\Omega - a}</eq></td><td><eq>\text{Re}\{a\} &lt; 0</eq></td></tr><tr><td><eq>\left\{ \begin{array}{l} 1, \quad |t| &lt; T_0/2 \\ 0, \quad |t| &gt; T_0/2 \end{array} \right.</eq></td><td><eq>\frac{2\sin(\Omega T_0/2)}{\Omega}</eq></td><td></td></tr><tr><td><eq>\frac{\sin(\Omega_c t)}{\pi t}</eq></td><td><eq>\left\{ \begin{array}{l} 1, \quad |\Omega| \leq \Omega_c \\ 0, \quad |\Omega| &gt; \Omega_c \end{array} \right.</eq></td><td><eq>\Omega_c &gt; 0</eq></td></tr><tr><td><eq>e^{j\Omega_0 t}</eq></td><td><eq>2\pi\delta(\Omega - \Omega_0)</eq></td><td></td></tr><tr><td><eq>\cos(\Omega_0 t)</eq></td><td><eq>\pi[\delta(\Omega - \Omega_0) + \delta(\Omega + \Omega_0)]</eq></td><td></td></tr><tr><td><eq>\sum_{\ell=-\infty}^{\infty}\delta(t-\ell T)</eq></td><td><eq>\frac{2\pi}{T}\sum_{k=-\infty}^{\infty}\delta\left(\Omega - \frac{2\pi}{T}k\right)</eq></td><td></td></tr><tr><td><eq>\sum_{k=-\infty}^{\infty}c_ke^{j\frac{2\pi}{T}kt}</eq></td><td><eq>\sum_{k=-\infty}^{\infty}2\pi c_k\delta\left(\Omega - \frac{2\pi}{T}k\right)</eq></td><td></td></tr></table>

Trên thực $\mathrm { t } \acute { \hat { \mathrm { e } } } ,$ người ta thường quan tâm trước hết đến đáp ứng biên độ của hệ thống. Đáp ứng pha trở nên quan trọng khi cần giữ nguyên dạng sóng của tín hiệu, ví dụ như trong các hệ thống pha tuyến tính (xem mục 3.5.4). 

Biểu đồ Bode là một công cụ để vẽ tay đáp ứng biên độ (tính theo dB: $2 0 \log _ { 1 0 } \left| H ( j \Omega ) \right| )$ và đáp ứng pha theo tần số (thang logarit), căn cứ vào vị trí các điểm không và điểm cực của hàm truyền H(s) (xem chương 6). 

## 3.5.1. Sự tồn tại của đáp ứng tần số

Do đáp ứng tần số $H ( j \Omega )$ là biến đổi Fourier của đáp ứng xung $h ( t )$ , một điều kiện đủ để hệ thống LTI có đáp ứng tần số là 

$$
\int_ {- \infty} ^ {\infty} | h (t) | d t <   \infty
$$

Ta thấy điều kiện trên cũng chính là điều kiện để một hệ thống ổn định. Như vậy, hệ thống ổn định luôn có đáp ứng tần số. Điều ngược lại không đúng: bộ lọc thông thấp lý tưởng trong ví dụ 3.17 có đáp ứng tần số, nhưng đáp ứng xung $\begin{array} { r } { h _ { l p } ( t ) = \frac { \sin ( \Omega _ { c } \hat { t } ) } { \pi t } } \end{array}$ không khả tích tuyệt đối nên hệ thống này không ổn định. 

## 3.5.2. Khái niệm bộ lọc

Xét hệ thống LTI với đáp ứng tần số $H ( j \Omega )$ như trong hình 3.13b. Với tín hiệu vào có $\mathrm { p h } \mathring { \hat { 0 } }$ biên độ trong hình 3.13a, áp dụng (3.16), ta có tín hiệu ở đầu ra bộ lọc có phổ như trong hình 3.13c. Ta thấy, hệ thống LTI này có tác dụng tương tự như một bộ lọc, khi tín hiệu đưa qua bộ lọc này thì chỉ có các thành phần tín hiệu có tần số nhỏ hơn $\Omega _ { c }$ đi qua, còn các thành phần tín hiệu có tần số lớn hơn $\Omega _ { c }$ bị chặn lại. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/0208765579b29c3899008c40f2cad8cb69f27074d36ab7ba05f9fe2f254f44df.jpg)



(a) Tín hiệu vào bộ lọc


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/74363249867ab82c99db9dd1f8f8259e37999b10519c5e31778d8fa887db9da0.jpg)



(b) Đáp ứng tần số của bộ lọc


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/863be226dca5dab9ec8809dccfb106019e0d80efae738ca3b2d12dbcb4ad584a.jpg)



(c) Tín hiệu đầu ra bộ lọc



Hình 3.13. Bộ lọc chọn lọc tần số


Thao tác lọc trong hình 3.13 này là lý tưởng: các thành phần tín hiệu đi qua thì có giá trị không đổi so với đầu vào (nhân với hệ số 1), còn các thành phần tín hiệu bị chặn thì biến mất hoàn toàn (nhân với hệ số 0). 

Bộ lọc trên thực tế có đáp ứng tần số như trong hình 3.14: từ dải thông không đột ngột chuyển sang dải chắn như trong trường hợp lý tưởng (hình 3.13b) mà chuyển từ từ trong dải chuyển $\mathrm { t i } \tilde { \hat { \mathrm { e } } } \mathrm { p } \left[ \Omega _ { p } , \Omega _ { s } \right]$ ]; trong dải thông và dải chắn, đáp ứng biên độ cũng không bằng hằng số mà chỉ nằm trong một phạm vi cho phép. Với bộ lọc thông thấp tương tự, đáp ứng biên độ được chuẩn hóa sao cho giá trị lớn nhất bằng 1, và phạm vi cho phép được cho bởi (hình 3.14a) 

$$
\begin{array}{r} 1 - \delta_ {p} \leq | H (j \Omega) | \leq 1, \qquad | \Omega | \leq \Omega_ {p} \\ | H (j \Omega) | \leq \delta_ {s}, \qquad | \Omega | \geq \Omega_ {s} \end{array}
$$

Ta gọi các tham số $\delta _ { p } , \delta _ { s } , \Omega _ { p } , \Omega _ { s }$ là các chỉ tiêu kỹ thuật của bộ lọc: 

Độ gợn sóng dải thông $\delta _ { p }$ 

Độ gợn sóng dải chắn $\delta _ { s }$ 

Tần số cắt dải thông $\Omega _ { p }$ 

Tần số cắt dải chắn $\Omega _ { s }$ 

Trên thực tế, các chỉ tiêu về biên độ thường được cho theo thang dB (hình 3.14b). Định nghĩa độ suy giảm (attenuation) của bộ lọc là 

$$
A (\Omega) := - 2 0 \log_ {1 0} | H (j \Omega) | [ \mathrm{dB} ]
$$

Khi đó: 

Độ gợn dải thông (passband ripple) $R _ { p } : = - 2 0 \log _ { 1 0 } ( 1 - \delta _ { p } )$ [dB] là độ suy giảm lớn nhất cho phép trong dải thông; 

Độ suy giảm dải chắn (stopband attenuation) $A _ { s } : = - 2 0 \log _ { 1 0 } \delta _ { s }$ [dB] là độ suy giảm nhỏ nhất yêu cầu trong dải chắn. 

Ví dụ, $\delta _ { p } = 0 . 1$ và $\delta _ { s } = 0 . 0 1$ tương ứng với $R _ { p } \approx 0 . 9 2$ dB và $A _ { s } = 4 0 ~ \mathrm { d B }$ . Các giá trị $\delta _ { s }$ nhỏ như vậy khó quan sát trên thang tuyến tính, nhưng thể hiện rõ trên thang dB. 

Ngoài ra, người ta có thể thay $\Omega _ { p } , \Omega _ { s }$ bằng hai tham số sau: 

Độ rộng dải chuyển tiếp $\Delta \Omega = \Omega _ { s } - \Omega _ { p }$ 

Tần số cắt (trung tâm) $\begin{array} { r } { \Omega _ { c } = \frac { 1 } { 2 } ( \Omega _ { p } + \Omega _ { s } ) } \end{array}$ 

Ngoài các chỉ tiêu trên, khi thiết kế người ta còn quan tâm đến bậc (order) của bộ lọc. Hệ thống LTI được mô tả bởi phương trình vi phân (2.9) hoặc phương trình sai phân (2.10) có thể được thực hiện bằng sơ đồ gồm các bộ cộng, bộ nhân và phần tử D (mục 2.6). 

Định nghĩa 3.1. Bậc của bộ lọc là số phần tử D tối thiểu cần dùng trong sơ đồ thực hiện bộ lọc. 

Với bộ lọc tương tự được mô tả bởi phương trình vi phân (2.9) với $M \leq N$ $a _ { N } \neq 0 ,$ , khi phương trình không rút gọn được nữa thì bậc của bộ lọc bằng N: sơ đồ dạng trực tiếp II dùng đúng N phần tử D. Trường hợp rời rạc được xét ở mục 3.6.4. 

Với cùng một loại bộ lọc, bậc càng cao thì đáp ứng tần số càng gần với bộ lọc lý tưởng (dải chuyển tiếp hẹp hơn, độ gợn sóng nhỏ hơn). Đổi lại, bộ lọc cần nhiều phần tử hơn (sơ đồ dạng trực tiếp dùng $M + N + 1$ bộ nhân và $M + N ~ \mathrm { b \hat { { 0 } } ~ c \hat { { 0 } } n g ) }$ và thường có độ trễ lớn hơn (xem trễ nhóm ở mục 3.5.4; ví dụ cụ thể ở mục 6.6). 

Những hệ thống LTI với đáp ứng tần số có sự phân biệt rõ ràng giữa dải thông và dải chắn (các hệ số $\delta _ { p } , \delta _ { s } , \Delta \Omega$ đủ nhỏ) sẽ được gọi riêng là các bộ lọc chọn lọc tần số. Còn các hệ thống LTI với đáp ứng tần số không có sự phân biệt rõ ràng như trên vẫn được gọi là bộ lọc, ví dụ như lớp các bộ lọc thích nghi. Như vậy, mọi hệ thống LTI, theo nghĩa chung, đều có thể được coi là bộ lọc. 

Bộ lọc chọn lọc tần số được chia thành 4 loại: thông thấp, thông cao, thông dải và chắn dải. Hình 3.15 minh họa đáp ứng tần số cho 4 loại bộ lọc chọn lọc tần số lý tưởng. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/2b9b709ab6de3a5ceb9ee0a950c1ddcbc72c10dffac65b755cb867ae30c13792.jpg)



(a) Thang tuyến tính


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/d1a8dc6c65be127a0e275d25e084274bcb184c3987c753d951704b4a6fb2b08f.jpg)



(b) Thang dB



Hình 3.14. Đáp ứng biên độ và các chỉ tiêu kỹ thuật của bộ lọc thông thấp tương tự trên thực tế (bộ lọc elliptic bậc 3, $R _ { p } = 2 ~ { \mathrm { d B } } , A _ { s } = 2 0 ~ { \mathrm { d B } } )$


Ví dụ 3.17. Hãy tìm đáp ứng xung của bộ lọc thông thấp lý tưởng sau 

$$
H (j \Omega) = \left\{ \begin{array}{l l} 1, & | \Omega | \leq \Omega_ {c} \\ 0, & | \Omega | > \Omega_ {c} \end{array} \right.
$$

Lời giải. $\mathrm { { \acute { A } p } }$ dụng biến đổi Fourier ngược (3.11), ta dễ dàng tìm được đáp ứng xung $h _ { l p } ( t )$ của bộ lọc thông thấp lý tưởng (xem hình 3.16). 

$$
\begin{array}{r l} & h _ {l p} (t) = \frac {1}{2 \pi} \int_ {- \Omega_ {c}} ^ {\Omega_ {c}} 1 \cdot e ^ {j \Omega t} d \Omega \\ & \quad = \frac {1}{2 \pi} \frac {1}{j t} (e ^ {j \Omega_ {c} t} - e ^ {- j \Omega_ {c} t}) \\ & \quad = \frac {\sin (\Omega_ {c} t)}{\pi t} \end{array}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/c175be95b4df4e591d138e8a3726beb28e633653e07d475f230fe336ca9ae287.jpg)



(a) Bộ lọc thông thấp


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/5ea684ea1ff15b4399bac6e184173f65bcc6df837b1ae0bacfc4ab706a3287df.jpg)



(b) Bộ lọc thông dải


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/205a88184652bebef883f9e0ac5925051e08bed3aff2979ecf55d8915bc3eb22.jpg)



(c) Bộ lọc thông cao


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/729705bf845d3cb18835be8388f390560e2774c8332c181df001e22e86f0931e.jpg)



(d) Bộ lọc chắn dải



Hình 3.15. Bốn loại bộ lọc chọn lọc tần số lý tưởng


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/fbf174dec406936ef65ebf7eedf44bd146e2be1a7457e866eb8353fd1c2fcd82.jpg)



Hình 3.16. Đáp ứng xung của bộ lọc thông thấp lý tưởng


Ví dụ 3.18. Hãy tìm đáp ứng xung cho các bộ lọc thông cao, thông dải và chắn dải lý tưởng. 

Lời giải. Giả thiết các bộ lọc có đáp ứng tần số thực, nhận giá trị 0 hoặc 1 như trong hình 3.15 (pha bằng 0), với $0 < \Omega _ { c 1 } < \Omega _ { c 2 }$ . Các đáp ứng tần số này biểu diễn được qua hằng số 1 và đáp ứng tần số của bộ lọc thông thấp lý tưởng: 

$H _ { h p } ( j \Omega ) = 1 - H _ { l p } ( j \Omega )$ , với $H _ { l p } ( j \Omega )$ có tần số cắt $\Omega _ { c } \mathrm { : }$ ; 

$H _ { b p } ( j \Omega )$ bằng hiệu đáp ứng tần số của hai bộ lọc thông thấp lý tưởng có tần số cắt $\Omega _ { c _ { 2 } } \ \mathrm { \ v \hat { a } \ \Omega } \Omega _ { c _ { 1 } }$ ; 

$H _ { b s } ( j \Omega ) = 1 - H _ { b p } ( j \Omega )$ 

Các đẳng thức trên có thể sai khác tại hữu hạn điểm ở biên các dải, điều này không ảnh hưởng đến tích phân biến đổi ngược. Áp dụng tính chất tuyến tính, cặp biến đổi $\delta ( t ) \longleftrightarrow 1$ và kết quả của ví dụ trên, ta có 

$$
\begin{array}{l} {h _ {h p} (t) = \delta (t) - \frac {\sin (\Omega_ {c} t)}{\pi t}} \\ {h _ {b p} (t) = \frac {\sin (\Omega_ {c _ {2}} t) - \sin (\Omega_ {c _ {1}} t)}{\pi t}} \\ {h _ {b s} (t) = \delta (t) - \frac {\sin (\Omega_ {c _ {2}} t) - \sin (\Omega_ {c _ {1}} t)}{\pi t}} \end{array}
$$

trong đó giá trị tại $t = 0$ của các thành phần dạng $\frac { \sin ( \cdot ) } { \pi t }$ được hiểu theo giới hạn khi $t \to 0$  

Nhận xét. Các đáp ứng xung $h _ { l p } ( t ) , h _ { h p } ( t ) , h _ { b p } ( t ) , h _ { b s } ( t )$ ở trên không đồng nhất bằng 0 khi $t < 0$ (hình 3.16), nên các bộ lọc lý tưởng không nhân quả: đầu ra tại thời điểm t phụ thuộc cả vào giá trị của tín hiệu vào sau thời điểm t. Các bộ lọc này cũng không ổn định, vì các thành phần dạng $\frac { \sin ( \cdot ) } { \pi t }$ không khả tích tuyệt đối (mục 3.5.1). Do đó, bộ lọc lý tưởng không thực hiện được trên thực tế; các bộ lọc thực tế chỉ xấp xỉ chúng theo các chỉ tiêu kỹ thuật (hình 3.14). 

## 3.5.3. Băng thông

Xét hệ thống LTI với đáp ứng tần số $H ( j \Omega )$ , băng thông (bandwidth) tuyệt đối BW $[ \mathrm { r a d } / \mathrm { s } ]$ được định nghĩa như sau 

$\mathrm { B W } = \Omega _ { c }$ (hệ thống thông thấp lý tưởng) 

$\mathrm { B W } = \Omega _ { c _ { 2 } } - \Omega _ { c _ { 1 } }$ (hệ thống thông dải lý tưởng, xem hình 3.15). 

Dễ thấy, đối với các hệ thống thông thấp / thông dải lý tưởng thì BW chính là độ rộng của dải tần số khác 0 trong đáp ứng tần số của hệ thống. Tuy nhiên, nếu áp dụng cho các hệ thống trên thực tế thì giá trị của BW sẽ rất lớn (có thể coi như $\mathrm { B W } = \infty )$ nên khái niệm này không có giá trị sử dụng. Khi đó, người ta đưa ra một khái niệm thay thế là băng thông 3-dB, $\mathrm { B W _ { - 3 } d B } .$ , là độ rộng của dải tần số mà trong đó $| H ( j \Omega ) | ^ { 2 }$ không nhỏ hơn một nửa giá trị lớn nhất; tại hai biên của dải, $| H ( j \Omega ) | ^ { 2 }$ giảm còn một nửa, tức là giảm 3 dB (xem hình 3.17). 

Đối với tín hiệu, người ta cũng sử dụng các định nghĩa tương tự (thay đáp ứng tần số bằng phổ của tín hiệu). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/5d88d48a781bd04740e111c99489dc7b70a2346d3f10adc17ca09ec30220db39.jpg)



Hình 3.17. Băng thông ở mức 3-dB cho hệ thống thông thấp


## 3.5.4. Truyền không méo, pha tuyến tính và trễ nhóm

Khi truyền tín hiệu qua một hệ thống (ví dụ một kênh truyền hay một bộ khuếch đại), ta thường muốn tín hiệu ra giữ nguyên dạng sóng của tín hiệu vào, chỉ khác về độ lớn và bị trễ một khoảng thời gian: 

$$
y (t) = K x (t - t _ {0}), \qquad K \in \mathbb {R}, K \neq 0, t _ {0} \in \mathbb {R}\tag{3.17}
$$

Hệ thống thỏa mãn (3.17) với mọi tín hiệu vào được gọi là hệ thống truyền không méo (distortionless transmission). 

Hệ thống trên có đáp ứng xung $h ( t ) = K \delta ( t - t _ { 0 } )$ , và có đáp ứng tần số: 

$$
H (j \Omega) = K e ^ {- j \Omega t _ {0}}\tag{3.18}
$$

Như vậy, điều kiện truyền không méo trên miền tần số gồm hai phần: 

đáp ứng biên độ là hằng số: $| H ( j \Omega ) | = | K | ;$ 

đáp ứng pha là hàm tuyến tính của tần số: arg $\{ H ( j \Omega ) \} = - \Omega t _ { 0 }$ (khi $K > 0 ;$ khi $K < 0$ thì cộng thêm π). 

Nhận xét. Nếu chỉ xét các tín hiệu vào có phổ bằng 0 ở ngoài một dải tần nào đó, thì chỉ cần (3.18) đúng trong dải tần đó: ở ngoài dải, $X ( j \Omega ) = 0$ nên giá trị của $H ( j \Omega )$ không ảnh hưởng đến $Y ( j \Omega )$ . Ví dụ, bộ lọc thông thấp lý tưởng (ví dụ 3.17) có thêm pha tuyến tính 

$$
H (j \Omega) = \left\{ \begin{array}{l l} e ^ {- j \Omega t _ {0}}, & | \Omega | \leq \Omega_ {c} \\ 0, & | \Omega | > \Omega_ {c} \end{array} \right.
$$

truyền không méo mọi tín hiệu có phổ nằm trong dải $| \Omega | \leq \Omega _ { c }$ : tín hiệu ra là $x ( t - t _ { 0 } )$ 

Khi đáp ứng pha không tuyến tính, các thành phần tần số khác nhau của tín hiệu bị trễ những khoảng thời gian khác nhau, nên dạng sóng ở đầu ra bị méo, kể cả khi đáp ứng biên độ là hằng số. Để định lượng độ trễ này, ta viết $H ( j \Omega ) = | H ( j \Omega ) | e ^ { j \phi ( \Omega ) }$ , trong đó $\phi ( \Omega )$ là đáp ứng pha. Để có thể lấy đạo hàm, $\phi ( \Omega )$ được chọn là hàm liên tục theo Ω (pha liên tục, unwrapped phase) thay vì giá trị chính trong khoảng $( - \pi , \pi ]$ : tại những tần số mà giá trị chính nhảy 2π, ta cộng hoặc trừ 2π để nối liền đồ thị pha. 

Định nghĩa 3.2. Xét hệ thống LTI có đáp ứng tần số $H ( j \Omega ) = | H ( j \Omega ) | e ^ { j \phi ( \Omega ) }$ trong đó $H ( j \Omega ) \ne 0$ trên khoảng tần số đang xét và φ(Ω) là pha liên tục, khả vi trên khoảng đó. 

Trễ pha (phase delay): $\tau _ { p } ( \Omega ) : = - \frac { \phi ( \Omega ) } { \Omega } , \quad \Omega \neq 0$ 

Trễ nhóm (group delay): $\tau _ { g } ( \Omega ) : = - \frac { d \phi ( \Omega ) } { d \Omega }$ 

Với hệ thống truyền không méo (3.18), $K > 0 ,$ , ta có $\tau _ { p } ( { \boldsymbol { \Omega } } ) = \tau _ { g } ( { \boldsymbol { \Omega } } ) = t _ { 0 }$ 

Trễ pha là độ trễ của một tín hiệu hình sin: với $h ( t )$ thực, áp dụng tính chất hàm riêng và tính chất đối xứng $H ( - j \Omega _ { 0 } ) = H ^ { * } ( j \Omega _ { 0 } )$ , ta có 

$$
\cos (\Omega_ {0} t) \stackrel {T} {\longrightarrow} | H (j \Omega_ {0}) | \cos \left(\Omega_ {0} t + \phi (\Omega_ {0})\right) = | H (j \Omega_ {0}) | \cos \left(\Omega_ {0} (t - \tau_ {p} (\Omega_ {0}))\right)
$$

$\acute { \mathrm { Y } }$ nghĩa của trễ nhóm thể hiện rõ với tín hiệu băng hẹp. Xét $h ( t )$ thực và tín hiệu vào 

$$
x (t) = s (t) \cos (\Omega_ {0} t)
$$

trong đó $s ( t )$ là tín hiệu thực có băng thông tuyệt đối $W < \Omega _ { 0 }$ . Ta gọi $s ( t )$ là đường bao (envelope), cos $( \Omega _ { 0 } t )$ là sóng mang (carrier) (xem thêm ở chương 7). Theo tính chất dịch tần số, tín hiệu thông dải có phổ sau 

$$
X (j \Omega) = \frac {1}{2} S (j (\Omega - \Omega_ {0})) + \frac {1}{2} S (j (\Omega + \Omega_ {0}))
$$

Giả sử W đủ nhỏ để trong dải dương $\left[ \Omega _ { 0 } - W , \ \Omega _ { 0 } + W \right]$ có thể xấp xỉ đáp ứng biên độ bằng hằng số và đáp ứng pha bằng khai triển Taylor bậc nhất: 

$$
| H (j \Omega) | \approx | H (j \Omega_ {0}) |, \quad \phi (\Omega) \approx \phi (\Omega_ {0}) - \tau_ {g} (\Omega_ {0}) (\Omega - \Omega_ {0})
$$

Như vậy: 

$$
H (j \Omega) \approx A _ {0} e ^ {j \phi_ {0}} e ^ {- j \tau_ {g} (\Omega - \Omega_ {0})},
$$

trong đó $A _ { 0 } = | H ( j \Omega _ { 0 } ) | , \phi _ { 0 } = \phi ( \Omega _ { 0 } ) , \tau _ { g } = \tau _ { g } ( \Omega _ { 0 } ) .$ 

Xét dải âm $\Omega \in [ - \Omega _ { 0 } - W , \ - \Omega _ { 0 } + W ]$ . Khi đó Ω nằm trong dải dương, nên áp dụng bước trên $\mathrm { t a i } - \Omega$ 

$$
H (- j \Omega) \approx A _ {0} e ^ {j \phi_ {0}} e ^ {- j \tau_ {g} (- \Omega - \Omega_ {0})} = A _ {0} e ^ {j \phi_ {0}} e ^ {j \tau_ {g} (\Omega + \Omega_ {0})}
$$

Vì h(t) thực nên $H ( j \Omega ) = H ^ { \ast } ( - j \Omega )$ , do đó 

$$
H (j \Omega) \approx A _ {0} e ^ {- j \phi_ {0}} e ^ {- j \tau_ {g} (\Omega + \Omega_ {0})}
$$

Đầu ra được tính như sau: 

$$
\begin{array}{c} Y (j \Omega) = X (j \Omega) H (j \Omega) \approx \frac {A _ {0}}{2} e ^ {j \phi_ {0}} S (j (\Omega - \Omega_ {0})) e ^ {- j (\Omega - \Omega_ {0}) \tau_ {g}} \\ + \frac {A _ {0}}{2} e ^ {- j \phi_ {0}} S (j (\Omega + \Omega_ {0})) e ^ {- j (\Omega + \Omega_ {0}) \tau_ {g}} \end{array}
$$

$\mathrm { { \acute { A } p } }$ dụng tính chất dịch thời gian, sau đó dịch tần số, kết quả là: 

$$
\begin{array}{r} y (t) \approx \frac {A _ {0}}{2} s (t - \tau_ {g}) \left[ e ^ {j (\Omega_ {0} t + \phi_ {0})} + e ^ {- j (\Omega_ {0} t + \phi_ {0})} \right] \\ = A _ {0} s (t - \tau_ {g}) \cos (\Omega_ {0} t + \phi_ {0}) \end{array}
$$

Thay $\phi _ { 0 } = - \Omega _ { 0 } \tau _ { p } ( \Omega _ { 0 } )$ , ta được 

$$
y (t) \approx | H (j \Omega_ {0}) | s \big (t - \tau_ {g} (\Omega_ {0}) \big) \cos \big (\Omega_ {0} (t - \tau_ {p} (\Omega_ {0})) \big)\tag{3.19}
$$

Như vậy, đường bao bị trễ $\tau _ { g } ( \Omega _ { 0 } )$ , còn sóng mang bị trễ $\tau _ { p } ( \Omega _ { 0 } )$ . Có thể hiểu tên gọi trễ nhóm như sau: đường bao được tạo bởi một nhóm các thành phần tần số gần $\Omega _ { 0 } .$ , và cả nhóm này bị trễ $\tau _ { g } ( \Omega _ { 0 } ) . \mathrm { X } \acute { \mathrm { a p } }$ xỉ (3.19) càng chính xác khi W càng nhỏ so với khoảng tần số mà trên đó $| H ( j \Omega ) |$ có thể coi là hằng số và $\phi ( \Omega )$ có thể coi là tuyến tính. Với tín hiệu có dải tần rộng, nếu $\tau _ { g } ( \Omega )$ ) thay đổi đáng kể trên dải tần đó thì các nhóm thành phần tần số khác nhau bị trễ khác nhau và dạng sóng ở đầu ra bị méo. 

Ví dụ 3.19. Mạch RC thông thấp có đáp ứng tần số $\begin{array} { r } { H ( j \Omega ) = \frac { 1 } { 1 + j \Omega R C } } \end{array}$ , với $R C > 0$ Hãy tìm trễ pha và trễ nhóm của mạch. 

Lời giải. $H ( j \Omega ) \neq 0$ với mọi $\Omega ,$ pha liên tục của mạch là $\phi ( \Omega ) = - \arctan ( \Omega R C )$ Do đó 

$$
\tau_ {p} (\Omega) = \frac {\arctan (\Omega R C)}{\Omega} (\Omega \neq 0), \quad \tau_ {g} (\Omega) = \frac {R C}{1 + (\Omega R C) ^ {2}}
$$

Khi $\Omega  0 .$ , cả hai đều tiến tới RC. Tại tần số $\begin{array} { r } { 3 \mathrm { - d B } \ \Omega = 1 / R C \colon \tau _ { p } = \frac { \pi } { 4 } R C } \end{array}$ ≈ 0.785RC, $\begin{array} { r } { \tau _ { g } = \frac { 1 } { 2 } R C } \end{array}$ . Trễ nhóm giảm dần khi Ω tăng: các thành phần tần số thấp bị trễ nhiều hơn các thành phần tần số cao, tức là pha của mạch không tuyến tính.  

Python. Hàm freqs trong scipy.signal tính $H ( j \Omega )$ của hệ liên tục từ các hệ số tử số và mẫu số (theo lũy thừa giảm dần của $j \Omega )$ , ở đây $\begin{array} { r } { H ( j \Omega ) = \frac { 1 } { R C ( j \Omega ) + 1 } } \end{array}$ với $R C = 1$ ms. Hàm np.unwrap cho pha liên tục φ(Ω), np.gradient lấy đạo hàm số, nên tau_g xấp xỉ $\tau _ { g } ( \Omega )$ . Kết quả: $\tau _ { g } ( 0 )$ 1 ms = RC và $\tau _ { g } ( 1 / R C ) \approx 0 . 5$ ms $= R C / 2 .$ , đúng như lời giải. 

```python
import numpy as np
from scipy import signal
W = np.linspace(0, 5000, 5001)
W, H = signal.freqs([1], [1e-3, 1], worN=W)
tau_g = -np.gradient(np.unwrap(np.angle(H)), W) 
```

## 3.6. Biến đổi Fourier cho tín hiệu rời rạc

Xét tín hiệu rời rạc không tuần hoàn x[n]. Biến đổi Fourier $\left( \mathrm { F T ^ { 4 } } \right)$ sẽ chuyển tín hiệu từ miền thời gian rời rạc n sang miền tần số ω như minh họa trong hình 3.18. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4d116ed66fdf388a5cd1b474a816301efd4a5f95d4b048ff57d766085412789e.jpg)



Hình 3.18. Cặp biến đổi FT


Cặp biến đổi Fourier (FT) cho trường hợp này được biểu diễn như sau 

$$
x [ n ] \stackrel {\mathrm{FT}} {\longleftrightarrow} X (e ^ {j \omega})
$$

Trong đó, biến đổi thuận được định nghĩa 

$$
X (e ^ {j \omega}) := \operatorname{FT} \{x [ n ] \} = \sum_ {n = - \infty} ^ {\infty} x [ n ] e ^ {- j \omega n}\tag{3.20}
$$

và biến đổi ngược là 

$$
x [ n ] = \mathrm{FT} ^ {- 1} \{X (e ^ {j \omega}) \} = \frac {1}{2 \pi} \int_ {2 \pi} X (e ^ {j \omega}) e ^ {j \omega n} d \omega\tag{3.21}
$$

Tương tự như trường hợp liên tục theo thời gian, $X ( e ^ { j \omega } ) ^ { 5 }$ được gọi là phổ của tín hiệu $x [ n ]$ , và thường được biểu diễn qua 

• <sup>Phổ</sup> <sup>biên</sup> <sup>độ:</sup> $| X ( e ^ { j \omega } ) |$ 

• <sup>Phổ</sup> <sup>pha:</sup> <sup>arg</sup> $\{ X ( e ^ { j \omega } ) \}$ 

Tuy nhiên, khác với trường hợp liên tục theo thời gian, $\mathrm { p h } \mathring { \hat { 0 } }$ cho tín hiệu rời rạc theo thời gian luôn tuần hoàn với chu kỳ 2π. 

$$
\begin{array}{l} X (e ^ {j (\omega + 2 \pi)}) = \sum_ {n = - \infty} ^ {\infty} x [ n ] e ^ {- j (\omega + 2 \pi) n} \\ \qquad = \sum_ {n = - \infty} ^ {\infty} x [ n ] e ^ {- j \omega n} e ^ {- j 2 \pi n} \\ \qquad = \sum_ {n = - \infty} ^ {\infty} x [ n ] e ^ {- j \omega n} \\ \qquad = X (e ^ {j \omega}) \end{array}
$$

Ví dụ 3.20. Hãy tìm phổ (cùng với phổ biên độ, phổ pha) của các dãy sau: 

a. $x _ { 1 } [ n ] = \delta [ n ]$ 

b. $x _ { 2 } [ n ] = \delta [ n - 2 ]$ 

c. $x _ { 3 } [ n ] = \delta [ n - 2 ] - \delta [ n ]$ 

Lời giải. $\mathrm { { \acute { A } p } }$ dụng định nghĩa (3.20). 

a. Tổng chỉ có một số hạng khác 0 (tại $n = 0 )$ : 

$$
X _ {1} (e ^ {j \omega}) = 1, \qquad | X _ {1} (e ^ {j \omega}) | = 1, \qquad \arg \{X _ {1} (e ^ {j \omega}) \} = 0
$$

b. Tổng chỉ có một số hạng khác 0 (tại $n = 2 )$ : 

$$
X _ {2} (e ^ {j \omega}) = e ^ {- j 2 \omega}, \qquad | X _ {2} (e ^ {j \omega}) | = 1, \qquad \arg \{X _ {2} (e ^ {j \omega}) \} = - 2 \omega
$$

Phổ biên độ giống câu a, còn phổ pha là hàm tuyến tính của $\omega$ (khi biểu diễn trong khoảng $( - \pi , \pi ]$ , pha được cộng thêm một bội của 2π). 

c. Tương tự, 

$$
X _ {3} (e ^ {j \omega}) = e ^ {- j 2 \omega} - 1 = e ^ {- j \omega} (e ^ {- j \omega} - e ^ {j \omega}) = - 2 j \sin \omega e ^ {- j \omega} = 2 \sin \omega e ^ {- j (\omega + \frac {\pi}{2})}
$$

Xét trong một chu $\mathrm { k } \tilde { \mathrm { y } } - \pi < \omega \leq \pi :$ 

$$
| X _ {3} (e ^ {j \omega}) | = 2 | \sin \omega |, \quad \arg \{X _ {3} (e ^ {j \omega}) \} = \left\{ \begin{array}{l l} - \omega - \frac {\pi}{2}, & 0 <   \omega <   \pi \\ - \omega + \frac {\pi}{2}, & - \pi <   \omega <   0 \end{array} \right.
$$

Tại $\omega = 0$ và $\omega = \pi , X _ { 3 } ( e ^ { j \omega } ) = 0$ nên pha không xác định. 

Ví dụ 3.21. Hãy tìm phổ (cùng với phổ biên độ, phổ pha) của dãy xung chữ nhật 

$$
x [ n ] = \operatorname{rect} _ {N} [ n ] = \left\{ \begin{array}{l l} 1, & 0 \leq n \leq (N - 1) \\ 0, & n \text {   còn   lại } \end{array} \right.
$$

Lời giải. Theo định nghĩa, $X ( e ^ { j \omega } )$ là tổng của cấp số nhân hữu hạn với công bội $e ^ { - j \omega }$ . Với $\omega \neq$ 2πm $( m \in \mathbb { Z } )$ 

$$
\begin{array}{l} X (e ^ {j \omega}) = \sum_ {n = 0} ^ {N - 1} e ^ {- j \omega n} = \frac {1 - e ^ {- j \omega N}}{1 - e ^ {- j \omega}} \\ \qquad = \frac {e ^ {- j \omega N / 2} \left(e ^ {j \omega N / 2} - e ^ {- j \omega N / 2}\right)}{e ^ {- j \omega / 2} \left(e ^ {j \omega / 2} - e ^ {- j \omega / 2}\right)} \\ \qquad = \frac {\sin (\omega N / 2)}{\sin (\omega / 2)} e ^ {- j \omega \frac {N - 1}{2}} \end{array}
$$

Tại $\omega = 2 \pi m$ , mọi số hạng của tổng bằng 1 nên $X ( e ^ { j \omega } ) = N$ , trùng với giới hạn của biểu thức trên. Như vậy, 

$$
\begin{array}{r l} & {| X (e ^ {j \omega}) | = \left| \frac {\sin (\omega N / 2)}{\sin (\omega / 2)} \right|} \\ & {\arg \{X (e ^ {j \omega}) \} = \left\{ \begin{array}{l l} {- \frac {N - 1}{2} \omega ,} & {\mathrm{khi} \quad \frac {\sin (\omega N / 2)}{\sin (\omega / 2)} > 0} \\ {- \frac {N - 1}{2} \omega \pm \pi ,} & {\mathrm{khi} \quad \frac {\sin (\omega N / 2)}{\sin (\omega / 2)} <   0} \end{array} \right.} \end{array}
$$

Phổ biên độ bằng 0 tại $\begin{array} { r } { \omega = \frac { 2 \pi m } { N } } \end{array}$ với m không chia hết cho N (tại đó pha không xác định). Hình 3.19 biểu diễn phổ biên độ và phổ pha với $N = 1 0 .$  

Python. Hàm freqz trong mô-đun scipy.signal tính $X ( e ^ { j \omega } )$ của một dãy hữu hạn bắt đầu từ $n = 0$ tại worN tần số cách đều trong $[ 0 , \pi )$ (thêm whole=True để lấy cả chu kỳ [0, 2π)). Tham số thứ hai bằng 1 ở đây; ý nghĩa tổng quát của nó sẽ rõ ở chương 5. Phổ biên độ là np.abs(X), phổ pha là np.angle(X) (giá trị trong $( - \pi , \pi ] )$ . Lưu ý: tại các tần số có $X ( e ^ { j \omega } ) = 0$ , pha không xác định nên giá trị số trả về tại đó không có nghĩa; ở đây chọn worN=512 để lưới không trùng các điểm $\omega = 2 \pi m / 1 0$ 

```python
import numpy as np
from scipy import signal
w, X = signal.freqz(np.ones(10), 1, worN=512) 
```

## 3.6.1. Sự tồn tại của biến đổi Fourier

Một điều kiện đủ để biến đổi Fourier cho dãy $x [ n ]$ tồn tại là 

$$
\sum_ {n = - \infty} ^ {\infty} | x [ n ] | <   \infty
$$

Tương tự mục 3.5.1, điều kiện này không phải điều kiện cần: đáp ứng xung $h _ { l p } [ n ]$ của bộ lọc thông thấp lý tưởng trong ví dụ 3.22 không khả tổng tuyệt đối, nhưng có năng lượng hữu hạn và vẫn có biến đổi Fourier (chuỗi (3.20) hội tụ theo nghĩa trung bình bình phương). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/9e6ddaeb8d2b1aec41a3e72b605fb661b646bf5fd8dc199106ade0104f841af9.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4c941682dc866dbcd02fc850d9a165d911f3e4133c398b3b91f84bffb4fe28d4.jpg)



Hình 3.19. Phổ biên độ và phổ pha của dãy xung chữ nhật $N = 1 0$


## 3.6.2. FT cho dãy rời rạc tuần hoàn

Xét dãy xung đơn vị trên miền tần số $\begin{array} { r } { 2 \pi \sum _ { \ell = - \infty } ^ { \infty } \delta ( \omega - \omega _ { 0 } - 2 \pi \ell ) } \end{array}$ . Dễ dàng chứng minh được biến đổi Fourier ngược $\mathrm { F T ^ { - 1 } }$ của dãy xung này chính là $e ^ { j \omega _ { 0 } n }$ . Tuy nhiên, nếu áp dụng đúng định nghĩa thì sẽ không thực hiện biến đổi thuận FT cho tín hiệu $e ^ { j \omega _ { 0 } n }$ . Do vậy, đây sẽ không phải là một cặp biến đổi Fourier hoàn chỉnh. Tuy nhiên, nếu ta mở rộng biến đổi Fourier và coi đây là một cặp: 

$$
e ^ {j \omega_ {0} n} \xleftrightarrow {\mathrm{FT}} 2 \pi \sum_ {\ell = - \infty} ^ {\infty} \delta (\omega - \omega_ {0} - 2 \pi \ell)
$$

Khi đó ta có thể tìm được biến đổi Fourier (mở rộng) cho một dãy tuần hoàn bất kỳ ${ \tilde { x } } [ n ] _ { N }$ . Đầu tiên, khai triển chuỗi Fourier cho ${ \tilde { x } } [ n ] _ { N }$ thành tổng các thành phần hài. 

$$
\tilde {x} [ n ] = \sum_ {k = 0} ^ {N - 1} \tilde {c} _ {k} e ^ {j \frac {2 \pi}{N} k n}
$$

Sau đó sử dụng cặp biến đổi Fourier ở trên cho từng thành phần hài thì ta sẽ thu được phổ của tín hiệu tuần hoàn ${ \tilde { x } } [ n ] _ { N }$ này. 

Kết quả là 

$$
X (e ^ {j \omega}) = 2 \pi \sum_ {k = 0} ^ {N - 1} \tilde {c} _ {k} \sum_ {\ell = - \infty} ^ {\infty} \delta (\omega - \frac {2 \pi}{N} k - 2 \pi \ell) = 2 \pi \sum_ {m = - \infty} ^ {\infty} \tilde {c} _ {m} \delta (\omega - \frac {2 \pi}{N} m)\tag{3.22}
$$

trong đó đẳng thức thứ hai có được khi đặt $m = k + \ell N$ (khi k chạy từ 0 đến $N - 1$ và ℓ chạy qua mọi số nguyên thì m chạy qua mọi số nguyên) và dùng tính tuần hoàn chu kỳ N của các hệ số: $\tilde { c } _ { k } = \tilde { c } _ { m }$ . Như vậy, tương tự trường hợp liên tục (3.12), phổ của dãy tuần hoàn là các vạch (xung đơn vị) đặt tại các tần số $\begin{array} { r } { \frac { 2 \pi } { N } m } \end{array}$ có độ lớn $2 \pi \tilde { c } _ { m }$ 

## 3.6.3. Các tính chất

Biến đổi Fourier cho tín hiệu rời rạc cũng có một loạt tính chất tương tự như trường hợp liên tục theo thời gian, với cùng cách chứng minh và $\acute { \mathrm { y } }$ nghĩa. Do vậy, phần này chỉ đưa ra các phát biểu như dưới đây. 

3.6.3.1. Tính chất tuyến tính. Nếu có các cặp biến đổi Fourier 

$$
\begin{array}{l} x _ {1} [ n ] \xleftrightarrow {\mathrm{FT}} X _ {1} (e ^ {j \omega}) \\ x _ {2} [ n ] \xleftrightarrow {\mathrm{FT}} X _ {2} (e ^ {j \omega}) \end{array}
$$

thì 

$$
a _ {1} x _ {1} [ n ] + a _ {2} x _ {2} [ n ] \xleftrightarrow {\mathrm{FT}} a _ {1} X _ {1} (e ^ {j \omega}) + a _ {2} X _ {2} (e ^ {j \omega})
$$

trong đó $a _ { 1 } , a _ { 2 }$ là các hằng số. 

3.6.3.2. Tính chất dịch thời gian. Nếu dịch đi $n _ { 0 }$ mẫu trên miền thời gian thì 

$$
x [ n - n _ {0} ] \stackrel {\mathrm{FT}} {\longleftrightarrow} e ^ {- j \omega n _ {0}} X (e ^ {j \omega})
$$

3.6.3.3. Dịch tần số. 

$$
e ^ {j \omega_ {0} n} x [ n ] \xleftrightarrow {\mathrm{FT}} X (e ^ {j (\omega - \omega_ {0})})
$$

3.6.3.4. Đảo thời gian. 

$$
x [ - n ] \stackrel {\mathrm{FT}} {\longleftrightarrow} X (e ^ {- j \omega})
$$

3.6.3.5. Đạo hàm trên miền tần số. 

$$
n x [ n ] \xleftrightarrow {\mathrm{FT}} j \frac {d X (e ^ {j \omega})}{d \omega}
$$

3.6.3.6. Tính chất chập. 

$$
x _ {1} [ n ] * x _ {2} [ n ] \stackrel {\mathrm{FT}} {\longleftrightarrow} X _ {1} (e ^ {j \omega}) X _ {2} (e ^ {j \omega})
$$

Ngược lại, 

$$
x _ {1} [ n ] x _ {2} [ n ] \xleftrightarrow {\mathrm{FT}} \frac {1}{2 \pi} \int_ {- \pi} ^ {\pi} X _ {1} (e ^ {j \theta}) X _ {2} (e ^ {j (\omega - \theta)}) d \theta
$$

## 3.6.3.7. Các tính chất đối xứng.

(a) $\mathrm { F T } \{ x ^ { * } [ n ] \} = X ^ { * } ( e ^ { - j \omega } )$ 

(b) $\operatorname { F T } \{ x ^ { * } [ - n ] \} = X ^ { * } ( e ^ { j \omega } )$ 

(c) Khi $x [ n ] \in { \mathrm { ~ . ~ } }$ R 

$\bar { X } ( \bar { e } ^ { j \omega } ) = X ^ { * } ( e ^ { - j \omega } )$ 

$| X ( e ^ { j \omega } ) | = | X ( e ^ { - j \omega } ) |$ 

$$
\arg \{X (e ^ {j \omega}) \} = - \arg \{X (e ^ {- j \omega}) \}
$$

3.6.3.8. Quan hệ Parseval. Nếu x[n] có năng lượng hữu hạn thì 

$$
\sum_ {n = - \infty} ^ {\infty} | x [ n ] | ^ {2} = \frac {1}{2 \pi} \int_ {- \pi} ^ {\pi} | X (e ^ {j \omega}) | ^ {2} d \omega
$$

3.6.3.9. Tính chất tương quan. 

$$
\mathrm{FT} \{r _ {x _ {1} x _ {2}} [ n ] \} = S _ {X _ {1} X _ {2}} (e ^ {j \omega}) = X _ {1} (e ^ {j \omega}) X _ {2} ^ {*} (e ^ {j \omega})
$$

3.6.3.10. Phổ mật độ năng lượng và định lý Wiener–Khintchine. Hệ quả của tính chất tương quan (với $x _ { 1 } [ n ] = x _ { 2 } [ n ] = x [ n ] )$ : với tín hiệu năng lượng x[n], 

$$
\mathrm{FT} \{r _ {x x} [ n ] \} = S _ {X X} (e ^ {j \omega}) = | X (e ^ {j \omega}) | ^ {2}
$$

trong đó $S _ { X X } ( e ^ { j \omega } )$ gọi là phổ mật độ năng lượng (energy spectral density) của tín hiệu x[n]. Theo quan hệ Parseval, $\begin{array} { r } { \frac { 1 } { 2 \pi } \int _ { - \pi } ^ { \pi } \bar { S } _ { X X } ( e ^ { \bar { j } \omega } ) d \omega = r _ { x x } [ 0 ] = E _ { x } } \end{array}$ 

Trong trường hợp tín hiệu ngẫu nhiên, do không thể biết chắc chắn giá trị của tín hiệu tại mỗi thời điểm nên ta không thể tính trực tiếp biến đổi Fourier $\mathrm { d } \acute { \mathrm { e } }$ có được phổ của tín hiệu này. Tuy nhiên, nếu tín hiệu ngẫu nhiên dừng theo nghĩa rộng, ta có thể xác định chắc chắn được hàm tự tương quan. Khi đó, thực hiện biến đổi Fourier trên hàm tự tương quan (định nghĩa theo kỳ vọng), ta sẽ thu được phổ mật độ công suất (power spectral density) của tín hiệu đó. Kết quả này được gọi là định lý Wiener–Khintchine. 

Các tính chất của biến đổi Fourier cho tín hiệu rời rạc được tóm tắt trong bảng 3.5; bảng 3.6 tổng hợp các cặp biến đổi thông dụng. 

## 3.6.4. Hệ thống rời rạc trên miền tần số

Xét hệ thống LTI rời rạc với đáp ứng xung $h [ n ]$ . Tương tự như trường hợp hệ thống liên tục, biến đổi Fourier của đáp ứng xung được gọi là đáp ứng tần số của hệ thống 

$$
H (e ^ {j \omega}) = \mathrm{FT} \{h [ n ] \} = \sum_ {n = - \infty} ^ {\infty} h [ n ] e ^ {- j \omega n}
$$

trong đó 

$\left| H ( e ^ { j \omega } ) \right| \textrm { - } \mathrm { d } \mathrm { { \acute { a } p } }$ ứng biên độ 

$\arg \{ H ( e ^ { j \omega } ) \} - \mathrm { d i a p }$ ứng pha 

Áp dụng tính chất chập, mối quan hệ giữa phổ đầu vào, phổ đầu ra và đáp ứng tần số là phép nhân: 

$$
X (e ^ {j \omega}) H (e ^ {j \omega}) = Y (e ^ {j \omega})
$$


Bảng 3.5. Các tính chất của biến đổi Fourier cho tín hiệu rời rạc


<table><tr><td>Tính chất</td><td><eq>x[n]</eq></td><td><eq>X(e^{j\omega})</eq></td></tr><tr><td>Tuyến tính</td><td><eq>a_{1}x_{1}[n]+a_{2}x_{2}[n]</eq></td><td><eq>a_{1}X_{1}(e^{j\omega})+a_{2}X_{2}(e^{j\omega})</eq></td></tr><tr><td>Dịch thời gian</td><td><eq>x[n-n_{0}]</eq></td><td><eq>e^{-j\omega n_{0}}X(e^{j\omega})</eq></td></tr><tr><td>Dịch tần số</td><td><eq>e^{j\omega_{0}n}x[n]</eq></td><td><eq>X(e^{j(\omega-\omega_{0})})</eq></td></tr><tr><td>Đảo thời gian</td><td><eq>x[-n]</eq></td><td><eq>X(e^{-j\omega})</eq></td></tr><tr><td>Đối xứng</td><td><eq>x^{*}[n]</eq></td><td><eq>X^{*}(e^{-j\omega})</eq></td></tr><tr><td></td><td><eq>x^{*}[-n]</eq></td><td><eq>X^{*}(e^{j\omega})</eq></td></tr><tr><td>Đạo hàm trên miền tần số</td><td><eq>nx[n]</eq></td><td><eq>j\frac{dX(e^{j\omega})}{d\omega}</eq></td></tr><tr><td>Chập</td><td><eq>x_{1}[n]*x_{2}[n]</eq></td><td><eq>X_{1}(e^{j\omega})X_{2}(e^{j\omega})</eq></td></tr><tr><td>Nhân</td><td><eq>x_{1}[n]x_{2}[n]</eq></td><td><eq>\frac{1}{2\pi}\int_{-\pi}^{\pi}X_{1}(e^{j\theta})X_{2}(e^{j(\omega-\theta)})d\theta</eq></td></tr><tr><td>Tương quan</td><td><eq>r_{x_{1}x_{2}}[n]</eq></td><td><eq>X_{1}(e^{j\omega})X_{2}^{*}(e^{j\omega})</eq></td></tr><tr><td>Parseval</td><td colspan="2"><eq>\sum_{n=-\infty}^{\infty}|x[n]|^{2}=\frac{1}{2\pi}\int_{-\pi}^{\pi}|X(e^{j\omega})|^{2}d\omega</eq></td></tr></table>


Giả thiết các biến đổi Fourier liên quan tồn tại. 



Bảng 3.6. Các cặp biến đổi Fourier thông dụng cho tín hiệu rời rạc (nhóm dưới: theo nghĩa mở rộng)


<table><tr><td>x[n]</td><td>X(ejω)</td><td>Điều kiện</td></tr><tr><td>δ[n]</td><td>1</td><td></td></tr><tr><td>anu[n]</td><td><eq>\frac{1}{1 - ae^{-j\omega}}</eq></td><td>|a|&lt; 1</td></tr><tr><td>rectN[n]</td><td><eq>\frac{\sin(\omega N/2)}{\sin(\omega/2)}e^{-j\omega \frac{N-1}{2}}</eq></td><td></td></tr><tr><td><eq>\frac{\sin(\omega_{c}n)}{\pi n}</eq></td><td><eq>\left\{ \begin{array}{ll} 1, &amp; |\omega| \leq \omega_{c} \\ 0, &amp; \omega_{c} &lt; |\omega| \leq \pi \end{array} \right.</eq></td><td>0&lt; ωc&lt; π</td></tr><tr><td>ejω0n</td><td>2π <eq>\sum_{\ell=-\infty}^{\infty} \delta(\omega - \omega_{0} - 2\pi\ell)</eq></td><td></td></tr><tr><td><eq>\tilde{x}[n]=\sum_{k=0}^{N-1}\tilde{c}_{k}e^{j\frac{2\pi}{N}kn}</eq></td><td>2π <eq>\sum_{m=-\infty}^{\infty}\tilde{c}_{m}\delta\left(\omega-\frac{2\pi}{N}m\right)</eq></td><td></td></tr></table>

Các khái niệm truyền không méo, trễ pha và trễ nhóm ở mục 3.5.4 được định nghĩa tương tự cho hệ thống rời rạc. Hệ thống có $H ( e ^ { j \omega } ) = K e ^ { - j \omega n _ { 0 } }$ , với $K \in \mathbb { R } , K \neq 0$ và $n _ { 0 } \in \mathbb { Z }$ , cho tín hiệu ra $y [ n ] = K x [ n - n _ { 0 } ]$ . Trễ nhóm $\begin{array} { r } { \tau _ { g } ( \omega ) : = - \frac { d \phi ( \omega ) } { d \omega } } \end{array}$ , trong đó φ(ω) là pha liên tục của $H ( e ^ { j \omega } )$ , có đơn vị là số mẫu và có thể không nguyên (xem bài tập 24). 

Do $H ( e ^ { j \omega } )$ tuần hoàn với chu kỳ 2π nên đáp ứng tần số của các bộ lọc chọn lọc tần số lý tưởng sẽ có dạng khác với trường hợp liên tục theo thời gian. Hình 3.20 minh họa cho đáp ứng tần số của các bộ lọc lý tưởng này. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/0b9a3405ccd853eb3dc0bbc7747fbdeb61c6137bc771c41a5b1d3f4adbb47305.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/8a6d62d7aeba77fd4454dd16db6d9e8af02d5abe6da8927f5bc6f380f25ece2e.jpg)



(a) Bộ lọc thông thấp


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7cbdb332f713529f168ec32f39c4489dcad4283db31318dd81d062b7519c9992.jpg)



(b) Bộ lọc thông dải



(c) Bộ lọc thông cao


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/72b6e268927598914e253dd862ee59a9e8b166824d31d335cf48a437b795513d.jpg)



(d) Bộ lọc chắn dải



Hình 3.20. Đáp ứng tần số của các bộ lọc lý tưởng


Ví dụ 3.22. Cho bộ lọc thông thấp lý tưởng với tần số cắt $\omega _ { c }$ có đáp ứng tần số (trong một chu $\mathrm { k } \dot { \mathrm { y } } \left[ - \pi , \pi \right] )$ như sau 

$$
H (e ^ {j \omega}) = \left\{ \begin{array}{l l} 1, & | \omega | \leq \omega_ {c} \\ 0, & | \omega | > \omega_ {c} \end{array} \right.
$$

Hãy tính đáp ứng xung của bộ lọc này. 

Lời giải. Giả thiết $0 < \omega _ { c } < \pi . \ \mathrm { { \AA p } }$ dụng biến đổi ngược (3.21) với chu kỳ lấy tích phân $[ - \pi , \pi ]$ . Với n $\neq 0 ,$ 

$$
\begin{array}{r l} & h _ {l p} [ n ] = \frac {1}{2 \pi} \int_ {- \omega_ {c}} ^ {\omega_ {c}} e ^ {j \omega n} d \omega \\ & \quad = \frac {1}{2 \pi} \frac {1}{j n} \left(e ^ {j \omega_ {c} n} - e ^ {- j \omega_ {c} n}\right) \\ & \quad = \frac {\sin (\omega_ {c} n)}{\pi n} \end{array}
$$

Với $\begin{array} { r } { n = 0 , h _ { l p } [ 0 ] = \frac { 1 } { 2 \pi } \int _ { - \omega _ { c } } ^ { \omega _ { c } } d \omega = \frac { \omega _ { c } } { \pi } } \end{array}$ (cũng là giới hạn của $\frac { \sin ( \omega _ { c } n ) } { \pi n }$ khi coi n là biến liên tục tiến về 0).  

Ví dụ 3.23. Hãy tính đáp ứng xung cho các bộ lọc thông cao, thông dải, chắn dải lý tưởng. 

Lời giải. Xét trong một chu kỳ $[ - \pi , \pi ]$ , giả thiết các đáp ứng tần số thực (pha bằng 0), với $0 < \omega _ { c } < \pi$ và $0 < \omega _ { c _ { 1 } } < \omega _ { c _ { 2 } } < \pi :$ 

• <sup>thông</sup> <sup>cao:</sup> $H _ { h p } ( e ^ { j \omega } ) = 1$ khi $\omega _ { c } < | \omega | \leq \pi$ , bằng 0 khi còn lại; 

thông dải: $H _ { b p } ( e ^ { j \omega } ) = 1$ khi $\omega _ { c _ { 1 } } \leq | \omega | \leq \omega _ { c _ { 2 } }$ , bằng 0 khi còn lại; 

chắn dải: $H _ { b s } ( e ^ { j \omega } ) = 1 - H _ { b p } ( e ^ { j \omega } )$ 

Theo ví dụ về $\mathrm { p h } \mathring { \hat { 0 } }$ của $\delta [ n ]$ , dãy có phổ bằng 1 trên cả chu kỳ là $\delta [ n ]$ . Làm tương tự trường hợp liên tục: $H _ { h p } = 1 - H _ { l p }$ (tần số $\mathrm { c } \acute { \mathrm { a t } } \ \omega _ { c } ) , H _ { b p }$ là hiệu của hai bộ lọc thông thấp lý tưởng có tần số cắt $\omega _ { c _ { 2 } }$ và $\omega _ { c _ { 1 } }$ (các đẳng thức có thể sai khác tại hữu hạn điểm, không ảnh hưởng đến tích phân). Áp dụng tính chất tuyến tính và kết quả của ví dụ trên, 

$$
\begin{array}{r l} & h _ {h p} [ n ] = \delta [ n ] - \frac {\sin (\omega_ {c} n)}{\pi n} \\ & h _ {b p} [ n ] = \frac {\sin (\omega_ {c _ {2}} n) - \sin (\omega_ {c _ {1}} n)}{\pi n} \\ & h _ {b s} [ n ] = \delta [ n ] - \frac {\sin (\omega_ {c _ {2}} n) - \sin (\omega_ {c _ {1}} n)}{\pi n} \end{array}
$$

trong đó giá trị tại $n = 0$ của các thành phần dạng $\frac { \sin ( \cdot ) } { \pi n }$ lấy bằng giới hạn như ở ví dụ trên, tức là $\begin{array} { r } { h _ { h p } [ 0 ] = 1 - \frac { \omega _ { c } } { \pi } , h _ { b p } [ 0 ] = \frac { \omega _ { c _ { 2 } } - \omega _ { c _ { 1 } } } { \pi } , h _ { b s } [ 0 ] = 1 - \frac { \omega _ { c _ { 2 } } - \omega _ { c _ { 1 } } } { \pi } } \end{array}$  

Nhận xét. Tương tự trường hợp liên tục, các đáp ứng xung $h _ { l p } [ n ] , h _ { h p } [ n ] , h _ { b p } [ n ]$ ， $h _ { b s } [ n ] \ \mathrm { ~ \ i ~ }$ trên không đồng nhất bằng 0 khi $n \ < \ 0$ , nên các bộ lọc số lý tưởng không nhân quả. Chúng cũng không ổn định, vì chuỗi $\begin{array} { r } { \sum _ { n } \left| \frac { \sin \left( \omega _ { c } n \right) } { \pi n } \right| } \end{array}$ phân kỳ với $0 < \omega _ { c } < \pi$ 

Tương tự trường hợp liên tục, bộ lọc số trên thực tế chỉ xấp xỉ bộ lọc lý tưởng. Hình 3.21 là đáp ứng biên độ của một bộ lọc thông thấp số. Với $h [ n ]$ thực, $| H ( e ^ { j \omega } ) |$ là hàm chẵn và tuần hoàn với chu kỳ 2π, nên chỉ cần xét $0 \leq \omega \leq \pi$ . Các chỉ tiêu kỹ thuật được cho dưới dạng 

$$
\begin{array}{r l} {1 - \delta_ {p} \leq | H (e ^ {j \omega}) | \leq 1 + \delta_ {p},} & {0 \leq \omega \leq \omega_ {p}} \\ {| H (e ^ {j \omega}) | \leq \delta_ {s},} & {\omega_ {s} \leq \omega \leq \pi} \end{array}
$$

Khác với quy ước cho bộ lọc tương tự ở trên, dải thông ở đây cho phép đáp ứng biên độ dao động quanh giá trị 1 về cả hai phía. Hai cách cho chỉ tiêu này chỉ sai khác một hệ số $\mathrm { t \vec { y } }$ lệ: chia $| H ( e ^ { j \omega } ) |$ cho $1 + \delta _ { p }$ thì giá trị lớn nhất trong dải thông bằng 1. 

Bậc của bộ lọc số cũng được định nghĩa như trong định nghĩa 3.1, với D là phần tử trễ một mẫu. Với bộ lọc được mô tả bởi phương trình sai phân (2.10) $( a _ { N } \neq 0 ;$ $b _ { M } \neq 0 )$ , khi phương trình không rút gọn được nữa thì bậc bằng max(M, N), đúng bằng số phần tử trễ của sơ đồ dạng trực tiếp II. Chẳng hạn, phương trình $y [ n ] { \bar { - y } } [ n - 1 ] { \bar { = } } x [ n ] - x [ n - 4 ] { \bar { \partial } }$ mục 2.5.2 có max $( M , N ) = 4$ , nhưng hệ thống này có đáp ứng xung $h [ n ] = \{ \boldsymbol { 1 } , \boldsymbol { 1 } , \boldsymbol { 1 } , \boldsymbol { 1 } \}$ , tức là có thể thực hiện bằng $y [ n ] =$ $x [ n ] + x [ n - 1 ] + x [ n - 2 ] + x [ n - 3 ]$ với 3 phần tử trễ: bậc của hệ thống là 3. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1e94540f40a959d5f18593a5c8f9daa0ebef562c61006dd075266b034a4d0845.jpg)



Hình 3.21. Đáp ứng biên độ và các chỉ tiêu kỹ thuật của bộ lọc thông thấp số trên thực tế


Bộ lọc FIR bậc $\textit { M } \left( N = 0 \right)$ có đáp ứng xung dài $M + 1$ mẫu, và mỗi mẫu đầu ra cần M + 1 phép nhân, M phép cộng. Nếu đáp ứng xung thực và đối xứng, $h [ n ] = h [ M - n ]$ , thì các số hạng sin triệt tiêu theo từng cặp $n , M - n ,$ , và 

$$
H (e ^ {j \omega}) = e ^ {- j \omega M / 2} \sum_ {n = 0} ^ {M} h [ n ] e ^ {- j \omega (n - M / 2)} = e ^ {- j \omega M / 2} \sum_ {n = 0} ^ {M} h [ n ] \cos (\omega (n - M / 2))
$$

trong đó tổng ở vế phải là một hàm thực của ω. Do đó bộ lọc có pha tuyến tính và trễ nhóm bằng $M / 2$ mẫu (trừ tại các tần số mà $H ( e ^ { j \omega } ) = 0 )$ : bậc càng cao thì độ trễ càng lớn. 

## Tóm tắt chương

Tín hiệu x(t) tuần hoàn chu kỳ $T ,$ thỏa mãn điều kiện Dirichlet, được khai triển thành chuỗi Fourier (3.2); các hệ số c (3.3) là phổ vạch của tín hiệu tại các tần số $k \frac { 2 \pi } { T }$ . Dạng lượng giác (3.6) liên hệ với $c _ { k }$ qua $a _ { 0 } = 2 c _ { 0 } , a _ { k } = c _ { k } + c _ { - k } ,$ $b _ { k } = j ( c _ { k } - \bar { c } _ { - k } )$ 

Dãy x˜[n] tuần hoàn chu kỳ N (nguyên dương) chỉ có N hệ số chuỗi Fourier độc lập (3.9); dãy $\tilde { c } _ { k }$ cũng tuần hoàn với chu kỳ N. Với tổng các thành phần hình sin, chu kỳ cơ bản được tìm trước (bội chung nhỏ nhất của các chu kỳ thành phần), sau đó dùng công thức Euler và đồng nhất hệ số. 

Biến đổi Fourier (3.10) tồn tại khi x(t) thỏa mãn các điều kiện đủ (khả tích tuyệt đối và các điều kiện Dirichlet). Tín hiệu tuần hoàn không có biến đổi 

Fourier theo nghĩa thông thường; theo nghĩa mở rộng, phổ của nó gồm các vạch $2 \pi c _ { k }$ tại các tần số $k \frac { 2 \pi } { T }$ (3.12). 

Các tính chất chính của biến đổi Fourier: tuyến tính; trễ trên miền thời gian tương ứng với pha tuyến tính $- \Omega t _ { 0 }$ (phổ biên độ giữ nguyên); nhân với $e ^ { j \Omega _ { 0 } t }$ tương ứng với dịch phổ đến $\Omega _ { 0 } ;$ chập trên miền thời gian tương ứng với phép nhân trên miền tần số (khi $x _ { 1 } ( t ) , x _ { 2 } ( t )$ khả tích tuyệt đối); quan hệ Parseval bảo toàn năng lượng (với tín hiệu năng lượng hữu hạn). 

Biến đổi Fourier của dãy $X ( e ^ { j \omega } )$ luôn tuần hoàn với chu kỳ 2π; điều kiện đủ để tồn tại là $\textstyle \sum _ { n } | x [ n ] | < \infty$ . Phổ của dãy tuần hoàn gồm các vạch $2 \pi \tilde { c } _ { k }$ tại các tần số $\frac { 2 \pi } { N } k \ ( 3 . 2 2 )$ 

Đáp ứng tần số của hệ thống LTI là biến đổi Fourier của đáp ứng xung, $H ( j \Omega ) = \mathrm { F T } \{ h ( t ) \}$ (hoặc $H ( e ^ { j \omega } ) = \operatorname { F T } \{ h [ n ] \} )$ , và phổ đầu ra bằng $Y = X H$ 

Có bốn loại bộ lọc chọn lọc tần số lý tưởng: thông thấp, thông cao, thông dải và chắn dải. Đáp ứng xung của chúng được biểu diễn qua các hàm dạng $\begin{array} { l } { { \frac { \sin ( \Omega _ { c } t ) } { \pi t } \ ( \mathrm { h o a c ~ } \frac { \sin ( \omega _ { c } \bar { n } ) } { \pi n } ) } } \end{array}$ , cùng với $\delta ( t )$ (hoặc $\delta [ n ] )$ đối với bộ lọc thông cao và chắn dải; các đáp ứng xung này không nhân quả và không khả tích (khả tổng) tuyệt đối, nên chỉ được xấp xỉ trong thực tế theo các chỉ tiêu $\delta _ { p } , \delta _ { s } , \Omega _ { p } , \Omega _ { s } ;$ trên thang dB, các chỉ tiêu biên độ là độ gợn dải thông $R _ { p }$ và độ suy giảm dải chắn $A _ { s } .$ . Bậc của bộ lọc là số phần tử D tối thiểu cần để thực hiện bộ lọc; bậc cao hơn cho đáp ứng gần với bộ lọc lý tưởng hơn, đổi lại bộ lọc phức tạp hơn và thường có độ trễ lớn hơn. 

Hệ thống truyền không méo có $H ( j \Omega ) = K e ^ { - j \Omega t _ { 0 } } \colon \mathrm { d a p }$ ứng biên độ là hằng số và đáp ứng pha tuyến tính. Trễ nhóm $\begin{array} { r } { \tau _ { g } ( \Omega ) = - \frac { d \phi ( \Omega ) } { d \Omega } } \end{array}$ là độ trễ của đường bao của tín hiệu băng hẹp có tần số trung tâm $\Omega ;$ trễ pha $\begin{array} { r } { \tau _ { p } ( \Omega ) = - \frac { \phi ( \Omega ) } { \Omega } } \end{array}$ là độ trễ của sóng mang. 

## Bài tập

1. Cho hệ thống LTI nhân quả có đáp ứng xung $h ( t ) = 2 e ^ { - 3 t } u ( t )$ 

(a) Tìm H(jΩ). Dùng tính chất hàm riêng, tìm đầu ra $y ( t )$ khi đầu vào là $x ( t ) = 2 + \cos ( 3 t ) , t \in \mathbb { R }$ 

(b) Tín hiệu cos(3t) có phải là hàm riêng của hệ thống này không? Vì sao? 

(c) Với hệ thống có $h ( t ) = e ^ { 2 t } u ( t )$ , chứng tỏ tích phân xác định $H ( j \Omega )$ không hội tụ, với bất kỳ giá trị Ω nào. Hệ thống này có ổn định không? 

2. Tìm chu kỳ cơ bản T và các hệ số chuỗi Fourier $c _ { k }$ của tín hiệu 

$$
x (t) = 1 + 2 \cos (\frac {\pi}{2} t) + \sin (\frac {\pi}{3} t + \frac {\pi}{6})
$$

Dùng quan hệ Parseval để tính công suất trung bình của $x ( t )$ 

3. Chuỗi Fourier của đạo hàm. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/03d5673ff05fbb1c23d9420f4bf4526c2361f2321066a8b9be162ab93838a7d3.jpg)



Hình 3.22. Sóng tam giác tuần hoàn trong bài tập 3


(a) Cho $x ( t )$ tuần hoàn với chu kỳ $T ,$ , liên tục và khả vi từng khúc, có các hệ số FS là $c _ { k }$ . Bằng phép tích phân từng phần, chứng minh tính chất đạo hàm 

$$
\frac {d}{d t} x (t) \xleftrightarrow {\mathrm{FS}} j k \frac {2 \pi}{T} c _ {k}
$$

(b) Xét sóng tam giác $x ( t )$ trong hình 3.22, chu kỳ $T = 4 , x ( t ) = | t |$ với $| t | \leq 2$ Vẽ $\begin{array} { r } { g ( t ) = \frac { d } { d t } x ( t ) } \end{array}$ và tìm các hệ số FS của $g ( t )$ . Gợi ý: biểu diễn $g ( t )$ qua dãy xung chữ nhật của ví dụ 3.1 (với $T = 4 , T _ { 0 } = 2 )$ bằng phép dịch thời gian và tính chất tuyến tính. 

(c) Từ kết quả câu (a) và (b), suy ra các hệ số $c _ { k }$ của $x ( t )$ với $k \neq 0$ . Tính $c _ { 0 }$ trực $\mathrm { t i } \acute { \mathrm { e p } } .$ 

(d) Dùng quan hệ Parseval, tính tổng $\scriptstyle \sum _ { k = 1 , 3 , 5 , \dots } { \frac { 1 } { k ^ { 4 } } }$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4277eca67650cf253c965deadca5cfcd1b19748c3848c492d2711145e7386fed.jpg)



Hình 3.23. Tín hiệu chỉnh lưu toàn sóng trong bài tập 4


4. Bộ chỉnh lưu toàn sóng lý tưởng biến điện áp 10 sin(100πt) [V] thành tín hiệu $x ( t ) = | 1 0 \sin ( 1 0 0 \pi t ) |$ như trong hình 3.23. 

(a) Tìm chu $\mathrm { k } \mathrm { \tilde { y } }$ cơ bản $T$ của $x ( t )$ và các hệ số FS $c _ { k }$ . 

(b) Tìm thành phần một chiều (DC) của $x ( t )$ . Thành phần DC chiếm bao nhiêu phần trăm công suất trung bình của $x ( t ) ?$ 

(c) Tín hiệu $x ( t )$ được đưa qua mạch lọc RC thông thấp, coi là hệ thống LTI có đáp ứng tần số $\begin{array} { r } { H ( j \Omega ) = \frac { 1 } { 1 + j \Omega R C } } \end{array}$ với $R C = 0 . 1 ~ \mathrm { s }$ (bỏ qua ảnh hưởng của tải). Tìm thành phần DC và biên độ của thành phần hài bậc 1 (tần số 100 Hz) ở đầu ra. 

5. Sóng tam giác x(t) ở bài 3 được đưa qua bộ lọc thông dải lý tưởng có $H ( j \Omega ) = 1$ khi $\pi < | \Omega | < 2 \pi$ và $H ( j \Omega ) = 0$ với các giá trị Ω còn lại. 

(a) Những thành phần hài nào của $x ( t )$ đi qua được bộ lọc? Tìm đầu ra $y ( t )$ 

(b) So sánh biên độ của $y ( t )$ với biên độ của thành phần hài bậc 1 trong $x ( t )$ Hệ thống kiểu này có thể dùng để tạo tín hiệu hình sin có tần số gấp ba tần số cơ bản của tín hiệu vào. 

6. Cho dãy ${ \tilde { x } } [ n ]$ tuần hoàn với chu kỳ $N = 6 ,$ các $\mathrm { \ g i \acute { a } }$ trị trong một chu kỳ là 

$$
\tilde {x} [ n ] = \{1, 1, 1, 0, 0, 0 \}
$$

(a) Tính các hệ số $\tilde { c } _ { k } , k = \overline { { 0 , 5 } } .$ Gợi ý: dùng công thức tổng cấp số nhân. 

(b) Phát biểu quan hệ Parseval cho DTFS (tương tự như với FS) và kiểm tra quan hệ này trên dãy đã cho. 

7. Dãy x˜[n] tuần hoàn với chu kỳ $N = 4$ có các hệ số $\tilde { c } _ { 0 } = 1 , \tilde { c } _ { 1 } = j , \tilde { c } _ { 2 } = 0$ ${ \tilde { c } } _ { 3 } = - j$ 

(a) Tìm ${ \tilde { x } } [ n ]$ dưới dạng tổng của hằng số và hàm sin, rồi liệt kê các giá trị của x˜[n] trong một chu kỳ. 

(b) Không cần tính ${ \tilde { x } } [ n ]$ , hãy giải thích vì sao ${ \tilde { x } } [ n ]$ là dãy thực. 

8. Cho tín hiệu liên tục (tuần hoàn) $x _ { c } ( t )$ có khai triển Fourier như sau: 

$$
x _ {c} (t) = \sum_ {k = - 9} ^ {9} a _ {k} e ^ {j 2 \pi k t / 1 0 ^ {- 3}}
$$

trong đó các hệ số $a _ { k } = 0 , \forall | k | > 9$ . Tín hiệu này được lấy mẫu với chu kỳ $\begin{array} { r } { T = \mathrm { \frac { 1 } { 6 } } 1 0 ^ { - 3 } \mathrm { [ s ] } } \end{array}$ để tạo thành dãy $x [ n ] = x _ { c } ( n T )$ 

a. Dãy x[n] có tuần hoàn không, nếu có thì chu kỳ bao nhiêu? 

b. Hãy tính $\tilde { c } _ { k }$ theo các hệ số $a _ { k }$ . 

9. Tìm biến đổi Fourier của $x ( t ) = e ^ { - 2 | t | }$ . Tính năng lượng của $x ( t )$ trên miền thời gian và kiểm tra lại bằng quan hệ Parseval. 

10. Dùng các tính chất của biến đổi Fourier và các kết quả đã biết, tìm FT của các tín hiệu sau. 

(a) $x _ { 1 } ( t ) = e ^ { - 3 ( t - 2 ) } u ( t - 2 )$ 

(b) $x _ { 2 } ( t ) = t e ^ { - 3 t } u ( t ) . { \mathrm { G o i ~ } } \acute { \mathrm { y } } \colon x _ { 2 } ( t ) = e ^ { - 3 t } u ( t ) * e ^ { - 3 t } u ( t ) .$ 

(c) $x _ { 3 } ( t ) = e ^ { - | t | } \cos ( 4 t )$ . Gợi ý: từ kết quả bài 9, dùng tính chất co giãn, sau đó dùng tính chất dịch tần số. 

(d) Xung tam giác $x _ { 4 } ( t ) = p ( t ) * p ( t )$ , với $p ( t ) = u ( t + 1 ) - u ( t - 1 )$ . Từ đó, dùng tính chất đối ngẫu, tìm FT của $\textstyle \left( { \frac { \sin t } { t } } \right) ^ { 2 }$ và tính $\textstyle \int _ { - \infty } ^ { \infty } \left( { \frac { \sin t } { t } } \right) ^ { 2 } d t$ 

11. Tìm tín hiệu x(t) có biến đổi Fourier như sau. 

(a) $\begin{array} { r } { X ( j \Omega ) = \frac { j \Omega + 4 } { ( j \Omega + 1 ) ( j \Omega + 3 ) } } \end{array}$ . Gợi ý: phân tích thành tổng các phân thức đơn giản. 

(b) $X ( j \Omega ) = 2 \cos ( 3 \Omega )$ 

(c) $X ( j \Omega ) = e ^ { - j \Omega } \mathrm { ~ k h i ~ } | \Omega | < 2 \mathrm { ~ v \hat { a } ~ } X ( j \Omega ) = 0 \mathrm { ~ k h i ~ } | \Omega | > 2 .$ 

12. Hệ thống LTI nhân quả, ổn định được mô tả bởi phương trình vi phân 

$$
y ^ {\prime \prime} (t) + 5 y ^ {\prime} (t) + 6 y (t) = x ^ {\prime} (t) + 4 x (t)
$$

(a) $\mathrm { L } \mathrm { \hat { a } y }$ biến đổi Fourier hai vế (dùng tính chất đạo hàm), tìm đáp ứng tần số $H ( j \Omega )$ 

(b) Tìm đáp ứng xung h(t). 

(c) Tìm đầu ra y(t) khi đầu vào là $x ( t ) = e ^ { - t } u ( t )$ 

(d) Tìm đầu ra y(t) khi đầu vào là $x ( t ) = \cos ( 2 t ) , t \in \mathbb { R } .$ 

13. Tín hiệu $x ( t ) = e ^ { - t } u ( t )$ được đưa qua bộ lọc thông thấp lý tưởng với tần số cắt $\Omega _ { c }$ (ví dụ 3.17); gọi $y ( t )$ là tín hiệu đầu ra. 

(a) Tính năng lượng $E _ { x }$ của $x ( t )$ . 

(b) Với $\Omega _ { c } = 1 \ \mathrm { r a d / s } ,$ dùng quan hệ Parseval tính năng lượng $E _ { y }$ của $y ( t )$ 

(c) Tìm giá trị nhỏ nhất của $\Omega _ { c }$ để $E _ { y } \ge 0 . 9 E _ { x }$ 

14. Chỉ tiêu bộ lọc thông thấp tương tự theo quy ước của hình 3.14. 

(a) Cho $\delta _ { p } = 0 . 0 5 , \delta _ { s } = 0 . 0 0 1$ . Tính $R _ { p }$ và $A _ { s }$ . 

(b) Cho $R _ { p } = 0 . 5 \ \mathrm { d B } , \ A _ { s } = 5 0$ dB. Tính $\delta _ { p }$ và $\delta _ { s }$ . 

(c) Bộ lọc có $\begin{array} { r } { | H ( j \Omega ) | ^ { 2 } = \frac { 1 } { 1 + \Omega ^ { 8 } } } \end{array}$ (Ω tính bằng rad/s). Chứng tỏ rằng $| H ( j \Omega ) |$ giảm dần khi Ω tăng, từ đó kiểm tra xem bộ lọc có thỏa mãn các chỉ tiêu $\Omega _ { p } = 0 . 8 ~ \mathrm { r a d / s } , \Omega _ { s } = 2$ rad/s, $R _ { p } = 1$ dB, $A _ { s } = 2 0$ dB hay không. 

15. Cho hệ thống có đáp ứng tần số $\begin{array} { r } { H ( j \Omega ) = \frac { 1 - j \Omega / \Omega _ { 1 } } { 1 + j \Omega / \Omega _ { 1 } } } \end{array}$ , với $\Omega _ { 1 } = 1 0 0 0 \mathrm { r a d / s }$ 

(a) Chứng minh rằng $| H ( j \Omega ) | = 1$ với mọi Ω. 

(b) Tìm pha liên tục φ(Ω) (với φ(0) = 0), trễ pha $\tau _ { p } ( \Omega )$ và trễ nhóm $\tau _ { g } ( \Omega )$ Tính $\tau _ { g }$ khi $\Omega \to 0$ và tại $\Omega = \Omega _ { 1 } ;$ ; tính $\tau _ { p } ( \Omega _ { 1 } )$ 

(c) Hệ thống có truyền không méo không? 

16. Tín hiệu $x ( t ) = s ( t ) \cos ( \Omega _ { 0 } t )$ , với $s ( t ) = e ^ { - t ^ { 2 } / ( 2 \sigma ^ { 2 } ) } , \Omega _ { 0 } = 1 0 0 0 \mathrm { r a d / s } , \sigma = 2 0 \mathrm { m s } .$ 2 được đưa qua hệ thống có đáp ứng tần số $\begin{array} { r } { H ( j \Omega ) = \frac { 1 } { ( 1 + j \Omega / \Omega _ { 1 } ) ^ { 2 } } } \end{array}$ , với $\Omega _ { 1 } = 1 0 0 0$ rad/s. 

(a) Tính $| H ( j \Omega _ { 0 } ) | , \tau _ { p } ( \Omega _ { 0 } )$ và $\tau _ { g } ( \Omega _ { 0 } )$ 

(b) Dùng (3.19), viết biểu thức gần đúng của tín hiệu ra $y ( t )$ . Đường bao của y(t) đạt cực đại tại thời điểm nào? 

17. Bài tập này tiếp nối các bài 12 và 13 ở chương 1. Hình 3.24 vẽ phổ biên độ $| X ( j \Omega ) |$ của các xung trong hình 1.27 (theo cùng thứ tự); hình 3.25 vẽ phổ biên độ tính theo dB của bốn xung có độ dài hữu hạn, gồm cả xung chữ nhật. Không cần tính các $\mathrm { p h } \mathring { \hat { 0 } }$ này; hãy quan sát hình và trả lời các câu hỏi sau. 

(a) Phổ của những xung nào bằng 0 ở ngoài một dải tần hữu hạn? Các xung đó có độ dài hữu hạn không? Ngược lại, phổ của các xung có độ dài hữu hạn có bằng 0 ở ngoài một dải tần hữu hạn không? 

(b) Dựa vào hình 3.25, so sánh tốc độ suy giảm của các búp phụ của bốn xung. Liên hệ với độ trơn của các xung tại hai đầu: xung bị gián đoạn, xung liên tục nhưng đạo hàm bị gián đoạn, hay cả xung và đạo hàm đều liên tục? Xung hàm mũ một phía thuộc nhóm nào? Với cùng độ dài $T _ { \ast }$ so sánh độ rộng búp chính của xung chữ nhật, xung nửa chu kỳ cos và xung cos nâng có độ dài hữu hạn. 

(c) Phổ của xung Gauss có dạng gì? Khi σ giảm (xung hẹp lại), phổ thay đổi thế nào? 

(d) Vì sao phổ của đạo hàm bậc một và bậc hai của xung Gauss bằng 0 tại $\Omega = 0 ?$ 

(e) Dùng quan hệ Parseval và phổ trong hình 3.24, chứng minh các kết quả về năng lượng của xung sinc và xung sinc2 trong bài 13. 

18. Tìm biến đổi Fourier của dãy $x [ n ] = ( 0 . 5 ) ^ { n } u [ n ]$ . Tính $| X ( e ^ { j \omega } ) |$ tại $\omega = 0$ và $\omega = \pi$ , và tính năng lượng của dãy. 

19. Cho $x [ n ] = ( 0 . 8 ) ^ { n } u [ n ]$ , có $\begin{array} { r } { X ( e ^ { j \omega } ) = \frac { 1 } { 1 - 0 . 8 e ^ { - j \omega } } } \end{array}$ (tương tự bài 18). Dùng các tính chất của biến đổi Fourier, tìm FT của các dãy sau. 

(a) $x [ n - 3 ]$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7f80518aa6b4be2252729e0c16796978ba4bdb929e5712fe5d71d94572705259.jpg)



(a) Xung tam giác


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/63ee37dcbc37b702c0f56f274beacbddcc1c39f709c9e90ac6515e2d5fe75783.jpg)



(b) Xung nửa chu kỳ cos


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/fe361df37f298c7dd82e84ab2ffe2cfb5cceceeabaedc1af5eed3c7ede7934a6.jpg)



(c) Xung cos nâng có độ dài hữu hạn


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/d4cfdbf4f3937ae00f2b5af22769117e4222b62b77269e3c23222348dcf58a96.jpg)



(d) Xung hàm mũ một phía


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4f00f7469c81f4d607fe858d175ff19a40c38f30b55c47a971aef5d30e355ab0.jpg)



(e) Xung Gauss


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/ab7f516b77f542dbde7e462fb73333f4e080d0f895fa0b519fd4d01d534b32a4.jpg)



(f) Đạo hàm bậc một của xung Gauss


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/aeed749cc923e1795dac5718dfe27b4973075975c223e0ecc03cd7d040a91cad.jpg)



(g) Xung sinc


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/c098b39e0ae03335bf7b9f2fd602633b81a3a0745e79e2f9cbbfd0fd647d824f.jpg)



(h) Xung sinc<sup>2</sup>


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/5413cf641ee7e9ccead291746aa9632ed4796b35d38677bb150c198c54015376.jpg)



(i) Xung cos nâng (Nyquist)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/bf9f342625b63a5936391dd19188809f51853c8e8acadbaf43683343b093fde1.jpg)



(j) Đạo hàm bậc hai của xung Gauss



Hình 3.24. Phổ biên độ của các xung trong hình 1.27 (bài tập 17); mỗi phổ được vẽ với thang tung độ riêng, nhãn trên trục tung là giá trị lớn nhất


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/bc7b4db004eb5c02a6e1d4523b86db6d3624e747a87908c9fefb1b1f2b428cbc.jpg)



(a) Xung chữ nhật


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/07df22be2ff09a8e3bec59b17132932bd44f7bc16d9b5ff9b269e619ac8a4d6d.jpg)



(b) Xung tam giác


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7450d20efdd6d8e3d11fd1b7aa44d3cf5faaa73effbc7bab0ec8dd3296637881.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/473ea7694464779be969d20a277875c42314d0ed21307011d046541c2d6d837e.jpg)



(c) Xung nửa chu kỳ cos



(d) Xung cos nâng có độ dài hữu hạn



Hình 3.25. Phổ biên độ (tính theo dB, 20 $\log _ { 1 0 } { | X ( j \Omega ) / X ( j 0 ) | } )$ của bốn xung có độ dài hữu hạn trong bài tập 17


(b) $x [ - n ]$ 

(c) $n x [ n ]$ 

(d) $( - 1 ) ^ { n } x [ n ]$ 

(e) $y [ n ] = x [ n ] * x [ n ]$ . Tính trực tiếp y[n] theo định nghĩa phép chập, rồi kiểm tra lại kết quả trên miền tần số. 

20. Hình 3.26 cho tám dãy $x _ { 1 } [ n ] , \dots , x _ { 8 } [ n ]$ (cột trái; dãy x<sub>7</sub>[n] kéo dài vô hạn về bên phải) và phổ biên độ $| X ( e ^ { j \omega } ) |$ của chúng trên đoạn $[ - \pi , \pi ]$ (cột phải), nhưng thứ tự các phổ đã bị đảo lộn. Mỗi $\mathrm { p h } \mathring { \hat { 0 } }$ được vẽ với thang tung độ riêng, giá trị lớn nhất của các phổ có cùng chiều cao trên hình. Hãy ghép mỗi dãy với phổ biên độ của nó và giải thích ngắn gọn. Gợi ý: 

$$
X (e ^ {j 0}) = \sum_ {n} x [ n ], \quad X (e ^ {j \pi}) = \sum_ {n} (- 1) ^ {n} x [ n ], \quad X (e ^ {j \frac {\pi}{2}}) = \sum_ {n} (- j) ^ {n} x [ n ]
$$

nhân dãy với $( - 1 ) ^ { n }$ làm phổ dịch đi $\pi ;$ dãy càng dài thì búp chính của $\mathrm { p h } \mathring { \hat { 0 } }$ càng hẹp. 

21. Biến đổi Fourier ngược của dãy. 

(a) Tìm dãy x[n] có $X ( e ^ { j \omega } ) = \cos ^ { 2 } \omega$ 

(b) Hệ thống LTI rời rạc có đáp ứng tần số (trong một chu $\begin{array} { r } { \mathrm { k } \dot { \mathrm { y } } \left[ - \pi , \pi \right] ) H ( e ^ { j \omega } ) = } \end{array}$ $e ^ { - j 2 \omega }$ khi $\begin{array} { r } { | \omega | \le \frac { \pi } { 3 } } \end{array}$ và $H ( e ^ { j \omega } ) = 0$ khi $\begin{array} { r } { \frac { \pi } { 3 } < | \omega | \le \pi } \end{array}$ . Tìm đáp ứng xung $h [ n ]$ Hệ thống có nhân quả không? 

(c) Dùng quan hệ Parseval, tính $\scriptstyle \sum _ { n = - \infty } ^ { \infty } | h [ n ] | ^ { 2 }$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b91ae7cf2a7b399969b64242d6008f203ed2d0a4ac652931843f924886f34262.jpg)



(A)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/6d1369752c8cc15be6fb051580b50437035195d005572aac2bc177923a7a9c9c.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/24778f3df341ccb94aa624d79967b5bccb576bf8daef76ee35f9916f35b01de9.jpg)



(B)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/61be114128358c2f85742c99915f50902e1a727c4521c0894fbd52d39b5cb0ff.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/e4f48c71c47e16f14628b6368aa214384388ecb0ce8a4d0fb6738ca11d5f21a1.jpg)



(C)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b2084a449caafc136e89d86afeede46f508155789aa4ee8b74a52c2128f72d82.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/84da08ca3883e7009fc9a6e1c18f4017c79f084bbca00ec644cd2a7c3c3304a8.jpg)



(D)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4f3e4d46df0082964beeb846e0eacaa5eab68146386cf2fae7a5c4fbc5b2fb12.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7ede165d8d48ca6f548a3a16fb1cbc83227d2ec363103a0be06c3483e6b837be.jpg)



(E)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/5330d548e047535c62d495eacb7383fc62cfe6623a01e7b5e2b8745d89353f23.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/6e082d4e9e7f34597660e65aeb099db8362f9193ced9ff12379ef43c7912e07c.jpg)



(F)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/905585acf23f7f6af9f9547edf764c3151090b0a05fca5839bce0072f73df6fc.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7f3f3461eee7ba62fe56f5a1745103b72060ff163d43ff23feb6d5d49444a543.jpg)



(G)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4ab10793dac62940b82f8987d05462cd4df8d82bc434b620e826e2df1a70a68a.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/623738a366ad0c1d0095d69f1bc8fbef49310b5a752fc42b1a05bd3076de51b0.jpg)



(H)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/afeab48a1cbc6c5bc66fa81589ac8095c2e10f486f63f89a1bc7d255b6634d49.jpg)



Hình 3.26. Các dãy $x _ { 1 } [ n ] , \ldots , x _ { 8 } [ n ]$ (cột trái) và các phổ biên độ (A)–(H) (cột phải) trong bài tập 20. Thứ tự các phổ đã bị đảo lộn; mỗi phổ được vẽ với thang tung độ riêng


22. Dãy $\begin{array} { r } { x [ n ] = \cos ( \frac { \pi } { 8 } n ) + \cos ( \frac { \pi } { 2 } n ) } \end{array}$ được đưa qua bộ lọc thông thấp lý tưởng với tần số cắt $\begin{array} { r } { \omega _ { c } = \frac { \pi } { 4 } } \end{array}$ (ví dụ 3.22). Tìm dãy đầu ra $y [ n ]$ 

23. Xét bộ lọc trung bình trượt 3 điểm (bài 4 chương 2 với M = 3) 

$$
y [ n ] = \frac {1}{3} (x [ n ] + x [ n - 1 ] + x [ n - 2 ])
$$

(a) Chứng minh rằng $\begin{array} { r } { H ( e ^ { j \omega } ) = \frac { 1 } { 3 } e ^ { - j \omega } ( 1 + 2 \cos \omega ) } \end{array}$ . Tìm tần số $\omega \in [ 0 , \pi ]$ mà tại đó $H ( e ^ { j \omega } ) = 0$ 

(b) Tìm y[n] khi $\begin{array} { r } { x [ n ] = 1 + \cos ( \frac { \pi } { 2 } n ) + \cos ( \frac { 2 \pi } { 3 } n ) , n \in \mathbb { Z } . } \end{array}$ 

(c) Chứng tỏ rằng trong dải $\begin{array} { r } { | \omega | < \frac { 2 \pi } { 3 } } \end{array}$ hệ thống có pha tuyến tính. Pha này tương ứng với trễ bao nhiêu mẫu? 

24. Trễ nhóm của hệ thống rời rạc. 

(a) Cho $h [ n ] = \delta [ n ] + 3 \delta [ n - 1 ] + 3 \delta [ n - 2 ] + \delta [ n - 3 ]$ . Chứng minh rằng $H ( e ^ { j \omega } ) = 8 e ^ { - j \frac { 3 } { 2 } \omega } \cos ^ { 3 } \frac { \omega } { 2 }$ . Tìm trễ nhóm $\tau _ { g } ( \omega )$ với $| \omega | < \pi$ . Hệ thống có pha tuyến tính không? 

(b) Cho $\begin{array} { r } { H ( e ^ { j \omega } ) = \frac { 1 } { 1 - a e ^ { - j \omega } } } \end{array}$ , với $0 < a < 1$ . Tìm $\tau _ { g } ( \omega )$ . Tính $\tau _ { g } ( 0 )$ và $\tau _ { g } ( \pi )$ khi $a = 0 . 5$ 

25. Hệ thống LTI nhân quả được mô tả bởi phương trình sai phân 

$$
y [ n ] + 0. 5 y [ n - 1 ] = x [ n ]
$$

(a) Tìm đáp ứng xung $h [ n ]$ và đáp ứng tần số $H ( e ^ { j \omega } )$ 

(b) Tính $| H ( e ^ { j \omega } ) |$ tại $\omega = 0$ và $\omega = \pi$ . Hệ thống là bộ lọc thông thấp hay thông cao? So sánh với hệ thống có đáp ứng xung $( 0 . 5 ) ^ { n } u [ n ]$ trong bài 18. 

(c) Tìm y[n] khi $x [ n ] = 2 + ( - 1 ) ^ { n } , n \in \mathbb { Z } .$ 

Đáp số bài tập 

$$
\bullet \text {   B   a   i   } 1: (a) H (j \Omega) = \int_ {0} ^ {\infty} 2 e ^ {- 3 t} e ^ {- j \Omega t} d t = \frac {2}{3 + j \Omega}. \text {   Vi   é   t   } x (t) = 2 e ^ {j 0 t} + \frac {1}{2} e ^ {j 3 t} +
$$

$$
\frac {1}{2} e ^ {- j 3 t}; \text {   với   } H (j 0) = \frac {2}{3}, H (j 3) = \frac {2}{3 + 3 j} = \frac {\sqrt {2}}{3} e ^ {- j \frac {\pi}{4}} \text {   và   } H (- j 3) = H ^ {*} (j 3)
$$

$$
y (t) = \frac {4}{3} + \frac {\sqrt {2}}{3} \cos \left(3 t - \frac {\pi}{4}\right)
$$

(b) Không. Đầu ra ứng với $\cos ( 3 t )$ là $\textstyle { \frac { \sqrt { 2 } } { 3 } } \cos ( 3 t - { \frac { \pi } { 4 } } )$ , bị lệch pha so với đầu vào: tại $\begin{array} { r } { t = { \frac { \pi } { 6 } } , \cos ( 3 t ) = 0 } \end{array}$ nhưng đầu ra khác 0, nên không có hằng số λ nào để đầu ra bằng λ cos(3t) với mọi t. Chỉ các hàm mũ phức $e ^ { \pm j 3 t } \mathrm { l } \mathrm { \hat { a } }$ hàm riêng. $\begin{array} { r } { \mathrm { ( c ) } \int _ { 0 } ^ { A } e ^ { 2 \tau } e ^ { - j \smile } d \tau = \frac { e ^ { ( \bar { 2 } - j \Omega ) A } - 1 } { 2 - j \Omega } } \end{array}$ có modulus không nhỏ hơn $\frac { e ^ { 2 A } - 1 } { | 2 - j \Omega | }  \infty$ khi $A \to \infty$ , nên tích phân không hội tụ. Hệ thống không ổn định vì $\textstyle \int _ { 0 } ^ { \infty } e ^ { 2 t } d t = \infty$ 

Bài 2: hai thành phần có chu kỳ cơ bản 4 và 6, nên $T = 1 2$ và $\begin{array} { r } { \frac { 2 \pi } { T } = \frac { \pi } { 6 } ; } \end{array}$ ; khi đó $\textstyle { \frac { \pi } { 2 } } = 3 \cdot { \frac { \pi } { 6 } } , { \frac { \pi } { 3 } } = 2 \cdot { \frac { \pi } { 6 } }$ . Theo công thức Euler, 

$c _ { 0 } = 1 , \quad c _ { \pm 3 } = 1 , \quad c _ { 2 } = \frac 1 2 e ^ { - j \frac \pi 3 } , \quad c _ { - 2 } = \frac 1 2 e ^ { j \frac \pi 3 } , \quad c _ { k } = 0$ với các k còn lại 

Công suất trung bình $\begin{array} { r } { P = \sum _ { k } | c _ { k } | ^ { 2 } = 1 + 2 \cdot 1 + 2 \cdot \frac { 1 } { 4 } = 3 . 5 } \end{array}$ 

Bài 3: (a) Đặt $\begin{array} { r } { \Omega _ { 0 } = \frac { 2 \pi } { T } } \end{array}$ . Tích phân từng phần trên từng khúc (các số hạng tại điểm nối triệt tiêu nhau vì x(t) liên tục): 

$$
\frac {1}{T} \int_ {0} ^ {T} x ^ {\prime} (t) e ^ {- j k \Omega_ {0} t} d t = \frac {1}{T} \left[ x (t) e ^ {- j k \Omega_ {0} t} \right] _ {0} ^ {T} + j k \Omega_ {0} \frac {1}{T} \int_ {0} ^ {T} x (t) e ^ {- j k \Omega_ {0} t} d t = j k \Omega_ {0} c _ {k}
$$

vì $x ( T ) = x ( 0 )$ và $e ^ { - j k \Omega _ { 0 } T } = 1$ . (b) $g ( t ) = - 1$ khi $- 2 < t < 0$ , g(t) = 1 khi $0 < t < 2$ (tuần hoàn chu kỳ 4), tức $g ( t ) = 2 p ( t - 1 ) - 1$ với p(t) là dãy xung chữ nhật của ví dụ 3.1 $( T = 4 , T _ { 0 } = 2 )$ . Do đó $g _ { 0 } = 2 \cdot { \textstyle \frac { 1 } { 2 } } - 1 = 0$ và với $k \neq 0$ 

$$
g _ {k} = 2 e ^ {- j \frac {\pi}{2} k} \frac {\sin (\frac {\pi}{2} k)}{k \pi} = \left\{ \begin{array}{l l} - \frac {2 j}{k \pi}, & k \text {   l\'e } \\ 0, & k \text {   ch\"{a} n } \end{array} \right.
$$

$\begin{array} { r } { \mathrm { ~ ( c ) ~ } c _ { k } = \frac { g _ { k } } { j k \frac { \pi } { 2 } } } \end{array}$ , tức $\begin{array} { r } { c _ { k } \ = \ - \frac { 4 } { k ^ { 2 } \pi ^ { 2 } } } \end{array}$ với $k \ \mathrm { l { \vec { e } } } , \ c _ { k } \ = \ 0$ với k chẵn khác $0 ; \ c _ { 0 } \ =$ $\textstyle { \frac { 1 } { 4 } } \int _ { - 2 } ^ { 2 } | t | d t \stackrel { \textstyle { ( - 1 . \mathrm {  ~ \scriptstyle ~ ( d ) ~ } } P \enspace } { = } \enspace \frac { 1 } { 4 } \int _ { - 2 } ^ { 2 } t ^ { 2 } d t \stackrel { \textstyle { ( - 1 ) } } { = } \enspace \frac { 4 } { 3 } = 1 + 2 \sum _ { k = 1 , 3 , 5 , . . . } \frac { 1 6 } { \pi ^ { 4 } k ^ { 4 } } ,$ suy ra $\begin{array} { r } { \sum _ { k = 1 , 3 , 5 , . . . } \frac { 1 } { k ^ { 4 } } = \frac { \pi ^ { 4 } } { 9 6 } . } \end{array}$ 

Bài $4 \colon ( \mathrm { a } ) ~ T = 1 0$ ms, $\begin{array} { r } { \frac { 2 \pi } { T } = 2 0 0 \pi } \end{array}$ rad/s. Trong một chu kỳ $\begin{array} { r } { x ( t ) = 1 0 \sin ( \frac { \pi } { T } t ) } \end{array}$ với $0 \leq t \leq T _ { \mathrm { { i } } }$ dùng công thức Euler, 

$$
c _ {k} = \frac {1 0}{T} \int_ {0} ^ {T} \sin \left(\frac {\pi}{T} t\right) e ^ {- j \frac {2 \pi}{T} k t} d t = \frac {2 0}{\pi (1 - 4 k ^ {2})}
$$

(b) Thành phần DC: $\begin{array} { r } { c _ { 0 } = \frac { 2 0 } { \pi } \approx 6 . 3 7 \ : \mathrm { V } . } \end{array}$ . Công suất trung bình $\textstyle P = { \frac { 1 0 ^ { 2 } } { 2 } } = 5 0$ nên tỷ lệ là $\begin{array} { r } { \frac { c _ { 0 } ^ { 2 } } { P } \ = \ \frac { 8 } { \pi ^ { 2 } } } \end{array}$ 81.1%. (c) $H ( j 0 ) = 1$ nên thành phần DC ở đầu ra vẫn là $\begin{array} { r } { \frac { 2 0 } { \pi } \approx 6 . 3 7 \mathrm { ~ V ~ } } \end{array}$ . Biên độ hài bậc 1 ở đầu ra là $2 | c _ { 1 } | | H ( j 2 0 0 \pi ) | =$ $\begin{array} { r } { \frac { 4 0 } { 3 \pi } \cdot \frac { 1 } { \sqrt { 1 + ( 2 0 \pi ) ^ { 2 } } } \approx 0 . 0 6 7 5 \mathrm { ~ V ~ } } \end{array}$ (ở đầu vào là $\textstyle { \frac { 4 0 } { 3 \pi } } \approx 4 . 2 4 { \mathrm { ~ V } } )$ 

Bài 5: (a) Các thành phần hài của $x ( t )$ có tần số $k \frac { \pi } { 2 }$ . Trong dải $\pi < | \Omega | < 2 \pi$ chỉ có $k = \pm 3$ (các hài $k = \pm 2$ <sup>,</sup> ±<sup>4</sup> <sup>nằm</sup> <sup>ở</sup> <sup>biên</sup> <sup>dải</sup> <sup>nhưng</sup> $c _ { \pm 2 } = c _ { \pm 4 } = 0 )$ . Do đó 

$$
y (t) = c _ {3} e ^ {j \frac {3 \pi}{2} t} + c _ {- 3} e ^ {- j \frac {3 \pi}{2} t} = - \frac {8}{9 \pi^ {2}} \cos \left(\frac {3 \pi}{2} t\right) \approx - 0. 0 9 0 \cos \left(\frac {3 \pi}{2} t\right)
$$

(b) Hài bậc 1 của $x ( t )$ có biên độ $\begin{array} { r } { 2 | c _ { 1 } | = \frac { 8 } { \pi ^ { 2 } } \approx 0 . 8 1 } \end{array}$ ; biên độ của $y ( t )$ bằng $\textstyle { \frac { 1 } { 9 } }$ giá trị này. 

• <sup>Bài</sup> <sup>6:</sup> <sup>(a)</sup> $\begin{array} { r } { \tilde { c } _ { 0 } = \frac { 1 } { 2 } ; } \end{array}$ với $k = \overline { { 1 , 5 } } ,$ 

$$
\tilde {c} _ {k} = \frac {1}{6} \sum_ {n = 0} ^ {2} e ^ {- j \frac {2 \pi}{6} k n} = \frac {1}{6} e ^ {- j \frac {\pi}{3} k} \frac {\sin (\frac {\pi}{2} k)}{\sin (\frac {\pi}{6} k)}
$$

cụ thể $\begin{array} { r } { \tilde { c } _ { 1 } = \frac { 1 } { 3 } e ^ { - j \frac { \pi } { 3 } } , \tilde { c } _ { 2 } = 0 , \tilde { c } _ { 3 } = \frac { 1 } { 6 } , \tilde { c } _ { 4 } = 0 , \tilde { c } _ { 5 } = \frac { 1 } { 3 } e ^ { j \frac { \pi } { 3 } } . \mathrm { ( b ) } \ \frac { 1 } { N } \sum _ { n = 0 } ^ { N - 1 } | \tilde { x } [ n ] | ^ { 2 } = } \end{array}$ $\begin{array} { r } { \sum _ { k = 0 } ^ { N - 1 } | \tilde { c } _ { k } | ^ { 2 } } \end{array}$ . Vế trái bằng $\begin{array} { r } { \frac { 3 } { 6 } = \frac { 1 } { 2 } ; } \end{array}$ vế phải bằng $\begin{array} { r } { \frac { 1 } { 4 } + \frac { 1 } { 9 } + \frac { 1 } { 3 6 } + \frac { 1 } { 9 } = \frac { 1 } { 2 } . } \end{array}$ 

• <sup>Bài</sup> <sup>7:</sup> <sup>(a)</sup> <sup>Do</sup> $e ^ { j { \frac { 2 \pi } { 4 } } 3 n } = e ^ { - j { \frac { \pi } { 2 } } n }$ 

$$
\tilde {x} [ n ] = 1 + j e ^ {j \frac {\pi}{2} n} - j e ^ {- j \frac {\pi}{2} n} = 1 - 2 \sin \left(\frac {\pi}{2} n\right)
$$

trong một chu kỳ $\tilde { x } [ n ] = \{ \boldsymbol { 1 } _ { \uparrow } , - \boldsymbol { 1 } , \boldsymbol { 1 } , \boldsymbol { 3 } \}$ . (b) Tương tự tính chất đối xứng của $\mathrm { F S } , \tilde { x } [ n ]$ là dãy thực khi và chỉ khi $\tilde { c } _ { - k } = \tilde { c } _ { k } ^ { \ast }$ với mọi k. Ở đây ${ \tilde { c } } _ { 0 } .$ , c˜ là số thực và $\tilde { c } _ { - 1 } = \tilde { c } _ { 3 } = - j = \tilde { c } _ { 1 } ^ { * }$ 

Bài 8: $\begin{array} { r } { x [ n ] = x _ { c } ( n T ) = \sum _ { k = - 9 } ^ { 9 } a _ { k } e ^ { j \frac { 2 \pi } { 6 } k n } } \end{array}$ 

a. x[n] tuần hoàn với chu kỳ $N = 6$ (chu kỳ cơ bản là 6 hoặc một ước của 6, tùy các hệ số $a _ { k } )$ 

b. Do $e ^ { j \frac { 2 \pi } { 6 } k n } = e ^ { j \frac { 2 \pi } { 6 } ( k + 6 r ) n }$ , các thành phần có chỉ $\mathrm { s } \acute { \hat { \mathrm { o } } }$ sai khác nhau bội của 6 chồng lên nhau: $\begin{array} { r } { \tilde { c } _ { m } = \sum _ { r } a _ { m + 6 r } , m = \overline { { 0 , 5 } } , } \end{array}$ , cụ thể 

$$
\tilde {c} _ {0} = a _ {- 6} + a _ {0} + a _ {6}, \quad \tilde {c} _ {1} = a _ {- 5} + a _ {1} + a _ {7}, \quad \tilde {c} _ {2} = a _ {- 4} + a _ {2} + a _ {8},
$$

$$
\tilde {c} _ {3} = a _ {- 9} + a _ {- 3} + a _ {3} + a _ {9}, \quad \tilde {c} _ {4} = a _ {- 8} + a _ {- 2} + a _ {4}, \quad \tilde {c} _ {5} = a _ {- 7} + a _ {- 1} + a _ {5}.
$$

Đây là hiện tượng chồng phổ khi lấy mẫu (xem chương 4). 

Bài 9: 

$$
X (j \Omega) = \int_ {- \infty} ^ {0} e ^ {2 t} e ^ {- j \Omega t} d t + \int_ {0} ^ {\infty} e ^ {- 2 t} e ^ {- j \Omega t} d t = \frac {1}{2 - j \Omega} + \frac {1}{2 + j \Omega} = \frac {4}{4 + \Omega^ {2}}
$$

Năng lượng $\begin{array} { r } { E = \int _ { - \infty } ^ { \infty } e ^ { - 4 | t | } d t = \frac 1 2 } \end{array}$ . Kiểm tra bằng quan hệ Parseval: 

$$
\frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} \frac {1 6}{(4 + \Omega^ {2}) ^ {2}} d \Omega = \frac {1}{2 \pi} \cdot 1 6 \cdot \frac {\pi}{1 6} = \frac {1}{2}
$$

Bài 10: (a) $\begin{array} { r } { X _ { 1 } ( j \Omega ) = \frac { e ^ { - j 2 \Omega } } { 3 + j \Omega } } \end{array}$ . (b) Hai thừa số khả tích tuyệt đối nên $X _ { 2 } ( j \Omega ) =$ $\begin{array} { r } { \frac { 1 } { ( 3 + j \Omega ) ^ { 2 } } . ~ ( \mathrm { c } ) ~ e ^ { - | t | } ~ \operatorname { l \bar { a } } ~ e ^ { - 2 | \dot { t } | } } \end{array}$ co giãn với $\begin{array} { r } { a = \frac { 1 } { 2 } } \end{array}$ , nên có phổ $\begin{array} { r } { 2 \cdot \frac { 4 } { 4 + ( 2 \Omega ) ^ { 2 } } = \frac { 2 } { 1 + \Omega ^ { 2 } } ; } \end{array}$ do $\begin{array} { r } { \dot { \cos } ( 4 t ) = \frac { 1 } { 2 } ( e ^ { j 4 t } + e ^ { - j 4 t } ) } \end{array}$ 2 

$$
X _ {3} (j \Omega) = \frac {1}{1 + (\Omega - 4) ^ {2}} + \frac {1}{1 + (\Omega + 4) ^ {2}}
$$

(d) $x _ { 4 } ( t ) = 2 - | t |$ khi $| t | \leq 2 , x _ { 4 } ( t ) = 0$ khi $| t | > 2$ . Do $\begin{array} { r } { P ( j \Omega ) = \frac { 2 \sin \Omega } { \Omega } } \end{array}$ , ta có $\begin{array} { r } { X _ { 4 } ( j \Omega ) = \frac { 4 \sin ^ { 2 } \Omega } { \Omega ^ { 2 } } } \end{array}$ . Theo tính chất đối ngẫu, $\begin{array} { r } { \frac { 4 \sin ^ { 2 } t } { t ^ { 2 } } \longleftrightarrow 2 \pi x _ { 4 } ( - \Omega ) } \end{array}$ , tức 

$$
\left(\frac {\sin t}{t}\right) ^ {2} \xleftrightarrow {\text {FT}} \left\{ \begin{array}{l l} \frac {\pi}{2} (2 - | \Omega |), & | \Omega | \leq 2 \\ 0, & | \Omega | > 2 \end{array} \right.
$$

Lấy $\begin{array} { r } { \mathrm { g i a ~ t r i ~ t a i ~ } \Omega = 0 \colon \int _ { - \infty } ^ { \infty } \left( \frac { \sin t } { t } \right) ^ { 2 } d t = \pi . } \end{array}$ 

Bài 11: (a) $\begin{array} { r } { X ( j \Omega ) ~ = ~ \frac { 3 / 2 } { j \Omega + 1 } - \frac { 1 / 2 } { j \Omega + 3 } } \end{array}$ , nên $x ( t ) ~ = ~ \left( { \textstyle { \frac { 3 } { 2 } } } e ^ { - t } - { \textstyle { \frac { 1 } { 2 } } } e ^ { - 3 t } \right) u ( t )$ . (b) $X ( j \Omega ) = e ^ { j 3 \Omega } + e ^ { - j 3 \Omega }$ , nên $x ( t ) = \delta ( t + 3 ) + \delta ( t - 3 )$ . (c) Theo ví dụ 3.17 và tính chất dịch thời gian, $\begin{array} { r } { x ( t ) = \frac { \sin \left( 2 \left( t - 1 \right) \right) } { \pi \left( t - 1 \right) } } \end{array}$ 

Bài $\begin{array} { r l } & { 1 2 \colon \mathrm { ( a ) } \ H ( j \Omega ) = \frac { j \Omega + 4 } { ( j \Omega ) ^ { 2 } + 5 j \Omega + 6 } = \frac { j \Omega + 4 } { ( j \Omega + 2 ) ( j \Omega + 3 ) } \cdot \mathrm { ( b ) } \ H ( j \Omega ) = \frac { 2 } { j \Omega + 2 } - \frac { 1 } { j \Omega + 3 } , } \\ & { h ( t ) = ( 2 e ^ { - 2 t } - e ^ { - 3 t } ) u ( t ) \cdot \mathrm { ( c ) } } \end{array}$ nên 

$$
Y (j \Omega) = \frac {j \Omega + 4}{(j \Omega + 1) (j \Omega + 2) (j \Omega + 3)} = \frac {3 / 2}{j \Omega + 1} - \frac {2}{j \Omega + 2} + \frac {1 / 2}{j \Omega + 3}
$$

$$
\mathrm {n \hat {e} n} y (t) = \left(\frac {3}{2} e ^ {- t} - 2 e ^ {- 2 t} + \frac {1}{2} e ^ {- 3 t}\right) u (t). (\mathrm{d})
$$

$$
H (j 2) = \frac {4 + 2 j}{2 + 1 0 j}, \quad | H (j 2) | = \sqrt {\frac {5}{2 6}} \approx 0. 4 3 9
$$

và $\arg \{ H ( j 2 ) \} = \arctan { \textstyle { \frac { 1 } { 2 } } } - \arctan 5 \approx - 0 . 9 1 0 { \mathrm { ~ r a d } } $ , nên 

$$
y (t) \approx 0. 4 3 9 \cos (2 t - 0. 9 1 0)
$$

• <sup>Bài</sup> <sup>13:</sup> <sup>(a)</sup> $\begin{array} { r } { E _ { x } = \int _ { 0 } ^ { \infty } e ^ { - 2 t } d t = \frac { 1 } { 2 } . ~ ( \mathrm { b } ) ~ | Y ( j \Omega ) | ^ { 2 } = \frac { 1 } { 1 + \Omega ^ { 2 } } ~ \mathrm { k h i } ~ | \Omega | \leq \Omega _ { c } } \end{array}$ và bằng 0 ở ngoài, nên $\begin{array} { r } { E _ { y } = \frac { 1 } { 2 \pi } \int _ { - \Omega _ { c } } ^ { \Omega _ { c } } \frac { d \Omega } { 1 + \Omega ^ { 2 } } = \frac { \arctan \Omega _ { c } } { \pi } ; } \end{array}$ ; với $\begin{array} { r } { \Omega _ { c } = 1 , E _ { y } = \frac { 1 } { 4 } } \end{array}$ (một nửa $E _ { x } ) . ~ ( \mathrm { c } ) ~ \frac { \arctan \Omega _ { c } } { \pi } \ge 0 . 4 5$ khi $\Omega _ { c } \geq \mathrm { t a n } ( 0 . 4 5 \pi ) \approx 6 . 3 1 ~ \mathrm { r a d / s }$ 

Bài 14: (a) $R _ { p } = - 2 0 \log _ { 1 0 } 0 . 9 5$ 0.446 dB, $A _ { s } = - 2 0 \log _ { 1 0 } 0 . 0 0 1 = 6 0 \mathrm { d B } .$ (b) $\delta _ { p } = 1 - 1 0 ^ { - 0 . 5 / 2 0 } \approx 0 . 0 5 5 9 , \delta _ { s } = 1 0 ^ { - 5 0 / 2 0 } \approx 0 . 0 0 3 1 6 . \mathrm { ( c ) } 1 + \Omega ^ { 8 }$ tăng khi Ω tăng nên $| H ( j \Omega ) |$ giảm, giá trị lớn nhất là $| H ( j 0 ) | = 1$ . Do đó độ suy giảm lớn nhất trong dải thông đạt tại $\Omega _ { p } \colon A ( 0 . 8 ) = 1 0 \log _ { 1 0 } ( 1 + 0 . 8 ^ { 8 } ) \approx 0 . 6 7 4 ~ \mathrm { d B } \le 1$ dB; độ suy giảm nhỏ nhất trong dải chắn đạt tại $\Omega _ { s } \colon A ( 2 ) = 1 0 \log _ { 1 0 } 2 5 7 \approx 2 4 . 1$ dB 20 dB. Bộ lọc thỏa mãn các chỉ tiêu. 

Bài 15: (a) Tử số và mẫu số là hai số phức liên hợp nên có cùng modulus. (b) $\phi ( \Omega ) = - 2$ arctan $\begin{array} { r } { ( \Omega / \Omega _ { 1 } ) , \tau _ { p } ( \Omega ) = \frac { 2 \arctan ( \Omega / \Omega _ { 1 } ) } { \Omega } , \tau _ { g } ( \Omega ) = \frac { 2 / \Omega _ { 1 } } { 1 + ( \Omega / \Omega _ { 1 } ) ^ { 2 } } } \end{array}$ . Khi $\Omega  0 \colon \tau _ { g }  2 / \Omega _ { 1 } = 2$ ms; $\begin{array} { r } { \tau _ { g } ( \Omega _ { 1 } ) = 1 \ \mathrm { m s } , \tau _ { p } ( \Omega _ { 1 } ) = \frac { \pi } { 2 \Omega _ { 1 } } } \end{array}$ 1.571 ms. (c) Không: đáp ứng biên độ là hằng số nhưng pha không tuyến tính $( \tau _ { g }$ thay đổi theo Ω), nên dạng sóng của tín hiệu có dải tần rộng bị méo. 

Bài 16: (a) $\begin{array} { r } { | H ( j \Omega _ { 0 } ) | = \frac { 1 } { | 1 + j | ^ { 2 } } = \frac { 1 } { 2 } ; \phi ( \Omega ) = - 2 \arctan ( \Omega / \Omega _ { 1 } ) } \end{array}$ , nên $\phi ( \Omega _ { 0 } ) =$ $\begin{array} { r } { - \frac { \pi } { 2 } , \tau _ { p } ( \Omega _ { 0 } ) = \frac { \pi } { 2 \Omega _ { 0 } } } \end{array}$ 1.571 ms, $\begin{array} { r } { \tau _ { g } ( \Omega _ { 0 } ) = \frac { 2 / \Omega _ { 1 } } { 1 + ( \Omega _ { 0 } / \Omega _ { 1 } ) ^ { 2 } } = 1 } \end{array}$ ms. (b) y(t) ${ \frac { 1 } { 2 } } e ^ { - \left( t - 1 0 ^ { - 3 } \right) ^ { 2 } / \left( 2 \sigma ^ { 2 } \right) } \cos \left( 1 0 0 0 t - { \frac { \pi } { 2 } } \right) = { \frac { 1 } { 2 } } e ^ { - \left( t - 1 0 ^ { - 3 } \right) ^ { 2 } / \left( 2 \sigma ^ { 2 } \right) } \sin ( 1 0 0 0 t )$ ; đường bao  đạt cực đại tại t 1 ms. 

Bài 17: (a) Phổ của xung sinc, xung sinc2 và xung cos nâng (Nyquist) bằng 0 khi Ω lớn hơn ${ \begin{array} { l } { { \frac { \pi } { T } } , \ { \frac { 2 \pi } { T } } \ { \mathrm { v { \dot { a } } } } \ { \frac { ( 1 + \beta ) \pi } { T } } } \end{array} }$ , nhưng cả ba xung đều kéo dài vô hạn theo thời gian. Ngược lại, phổ của các xung có độ dài hữu hạn (chữ nhật, tam giác, nửa chu kỳ cos, cos nâng có độ dài hữu hạn) chỉ bằng 0 tại các điểm rời rạc, không bằng 0 trên cả một dải tần nào. Đây là một kết quả tổng quát (không chứng minh ở đây): một tín hiệu khác 0 không thể vừa có độ dài hữu hạn, vừa có phổ bằng 0 ở ngoài một dải tần hữu hạn. Xung Gauss và xung hàm mũ không có giới hạn trên cả hai miền. (b) Xung chữ nhật bị gián đoạn tại $\begin{array} { r } { t = \pm \frac { T } { 2 } } \end{array}$ : các búp phụ giảm theo $\frac { 1 } { | \Omega | }$ (khoảng 20 dB khi Ω tăng 10 lần). Xung tam giác và xung nửa chu kỳ cos liên tục nhưng có đạo hàm gián đoạn: búp phụ giảm theo $\textstyle { \frac { 1 } { \Omega ^ { 2 } } }$ (khoảng 40 dB khi Ω tăng 10 lần). Xung cos nâng có độ dài hữu hạn có cả x(t) và $x ^ { \prime } ( t )$ liên tục: búp phụ giảm theo $\scriptstyle { \frac { 1 } { | { \boldsymbol { \Omega } } | ^ { 3 } } }$ (khoảng 60 dB khi Ω tăng 10 lần). Xung càng trơn thì phổ càng giảm nhanh ở tần số cao. Xung hàm mũ một phía gián đoạn tại t = 0, nên $\begin{array} { r } { | X ( j \Omega ) | = \frac { A } { \sqrt { a ^ { 2 } + \Omega ^ { 2 } } } } \end{array}$ cũng giảm theo $\scriptstyle { \frac { 1 } { | \Omega | } }$ . Đổi lại, với cùng độ dài T, búp chính (tính từ 0 đến điểm không đầu tiên) của xung chữ nhật, xung nửa chu kỳ cos và xung cos nâng có độ dài hữu hạn rộng lần lượt $\begin{array} { r } { \frac { 2 \pi } { T } , \frac { 3 \pi } { T } \mathrm { v } \mathrm { \dot { a } } \frac { 4 \pi } { T } . \mathrm { ( c ) } } \end{array}$ Phổ của xung Gauss cũng có dạng Gauss: $X ( j \Omega ) = A \sigma \sqrt { 2 \pi } e ^ { - \sigma ^ { 2 } \Omega ^ { 2 } / 2 }$ . Khi σ giảm, phổ rộng ra $\mathrm { t \vec { y } }$ lệ với $\textstyle { \frac { 1 } { \sigma } }$ và đỉnh thấp xuống (tính chất co giãn). (d) Gọi $g ( t )$ là xung Gauss. Theo tính chất đạo hàm, phổ của $g ^ { \prime } ( t )$ và $g ^ { \prime \prime } ( t )$ là $j \Omega G ( j \Omega )$ và $( j \Omega ) ^ { 2 } G ( j \Omega )$ , bằng 0 tại $\Omega = 0$ . Nói cách khác, $\begin{array} { r } { \int _ { - \infty } ^ { \infty } g ^ { \prime } ( t ) d t = g ( \infty ) - g ( - \infty ) = 0 { : } } \end{array}$ các xung này không có thành phần một chiều; phổ biên độ của chúng đạt cực đại tại $\begin{array} { r } { \Omega = \frac { 1 } { \sigma } \mathrm { \ v { \hat { a } } \ } \Omega = \frac { \sqrt { 2 } } { \sigma } } \end{array}$ (e) $\begin{array} { r } { A \operatorname { s i n c } ( \frac { t } { T } ) = A T \frac { \sin ( \pi t / T ) } { \pi t } } \end{array}$ , nên theo ví dụ 3.17 (với $\begin{array} { r } { \Omega _ { c } = \frac { \pi } { T } ) , X ( j \Omega ) = A T } \end{array}$ khi $\left| \Omega \right| \leq \frac { \pi } { T }$ và bằng 0 ở ngoài. Do đó $\begin{array} { r } { { \cal E } _ { x } = \frac { 1 } { 2 \pi } \int _ { - \pi / T } ^ { \pi / T } A ^ { 2 } T ^ { 2 } d \Omega = A ^ { 2 } T } \end{array}$ . Với xung sinc2, $\begin{array} { r } { X ( j \Omega ) = A T \left( 1 - \frac { | \Omega | T } { 2 \pi } \right) } \end{array}$ khi $\begin{array} { r } { | \Omega | \le \frac { 2 \pi } { T } } \end{array}$ và bằng 0 ở ngoài (tính chất 

nhân, hoặc tính chất đối ngẫu), nên 

$$
E _ {x} = \frac {1}{2 \pi} \cdot 2 \int_ {0} ^ {2 \pi / T} A ^ {2} T ^ {2} \left(1 - \frac {\Omega T}{2 \pi}\right) ^ {2} d \Omega = \frac {A ^ {2} T ^ {2}}{\pi} \cdot \frac {2 \pi}{3 T} = \frac {2}{3} A ^ {2} T
$$

Bài 18: do $| 0 . 5 e ^ { - j \omega } | < 1$ nên chuỗi hội tụ và 

$$
X (e ^ {j \omega}) = \sum_ {n = 0} ^ {\infty} (0. 5 e ^ {- j \omega}) ^ {n} = \frac {1}{1 - 0 . 5 e ^ {- j \omega}}
$$

Suy ra $\begin{array} { r } { | X ( e ^ { j 0 } ) | = 2 , | X ( e ^ { j \pi } ) | = \frac { 2 } { 3 } } \end{array}$ . Năng lượng $\begin{array} { r } { E = \sum _ { n = 0 } ^ { \infty } ( 0 . 2 5 ) ^ { n } = \frac { 4 } { 3 } , } \end{array}$ 

Bài 19: $\begin{array} { r } { \mathrm { ( a ) } \ \frac { e ^ { - j 3 \omega } } { 1 - 0 . 8 e ^ { - j \omega } \cdot } \mathrm { ( b ) } \ X ( e ^ { - j \omega } ) = \frac { 1 } { 1 - 0 . 8 e ^ { j \omega } \cdot } \mathrm { ( c ) } \ j \frac { d X ( e ^ { j \omega } ) } { d \omega } = \frac { 0 . 8 e ^ { - j \omega } } { ( 1 - 0 . 8 e ^ { - j \omega } ) ^ { 2 } \cdot } \mathrm { ( d ) } } \end{array}$ $( - 1 ) ^ { n } = e ^ { j \pi n }$ , nên theo tính chất dịch tần số ta được $\begin{array} { r } { X ( e ^ { j ( \omega - \pi ) } ) = \frac { 1 } { 1 + 0 . 8 e ^ { - j \omega } } . } \end{array}$ (e) $\begin{array} { r } { y [ n ] = \sum _ { k = 0 } ^ { n } ( 0 . 8 ) ^ { k } ( 0 . 8 ) ^ { n - k } = ( n + 1 ) ( 0 . 8 ) ^ { n } u [ n ] } \end{array}$ ; theo (c) và tính chất tuyến tính, $\begin{array} { r } { Y ( e ^ { j \omega } ) = \frac { 0 . 8 e ^ { - j \omega } } { ( 1 - 0 . 8 e ^ { - j \omega } ) ^ { 2 } } + \frac { 1 } { 1 - 0 . 8 e ^ { - j \omega } } = \frac { 1 } { ( 1 - 0 . 8 e ^ { - j \omega } ) ^ { 2 } } = X ^ { 2 } ( e ^ { j \omega } ) } \end{array}$ , đúng với tính chất chập. 

Bài 20: (1)–(D), (2)–(F), (3)–(B), (4)–(H), (5)–(A), (6)–(G), (7)–(E), (8)–(C). Giải thích: $\begin{array} { r l } & { - \ x _ { 1 } [ n ] = \delta [ n ] + \delta [ n - 1 ] \colon | X _ { 1 } ( e ^ { j \omega } ) | = 2 | \cos \frac { \omega } { 2 } | } \\ & { \quad \mathrm { t a i } \ \omega = \pm \pi . } \end{array}$ , lớn nhất tại $\omega = 0$ , bằng 0 $\begin{array} { r l } & { x _ { 2 } [ n ] = \delta [ n ] - \delta [ n - 1 ] \colon | X _ { 2 } ( e ^ { j \omega } ) | = 2 | \sin \frac { \omega } { 2 } | } \\ & { \mathrm { t a i } \omega = \pm \pi . } \end{array}$ , bằng 0 tại $\omega = 0$ , lớn nhất $\begin{array} { r l } & { - \ x _ { 3 } [ n ] = \delta [ n ] + \delta [ n - 2 ] \colon | X _ { 3 } ( e ^ { j \omega } ) | = 2 | \cos \omega | , } \\ & { \phantom { = } 0 \ \mathrm { t a i } \pm \frac { \pi } { 9 } . } \end{array}$ lớn nhất tại 0 và π, bằng $\begin{array} { r l } & { - \ x _ { 4 } [ n ] = \bar { \delta } [ n ] - { \delta } [ n - 2 ] \colon | X _ { 4 } ( e ^ { j \omega } ) | = 2 | \sin \omega | } \\ & { \quad \mathrm { t a i } \pm \frac { \pi } { 2 } . } \end{array}$ , bằng 0 tại 0 và π, lớn nhất – x<sub>5</sub>[n] (năm mẫu bằng 1): $\begin{array} { r } { | X _ { 5 } ( e ^ { j \omega } ) | = \left| \frac { \sin ( 5 \omega / 2 ) } { \sin ( \omega / 2 ) } \right| } \end{array}$ , búp chính tại $\omega = 0$ các điểm không tại $\textstyle \pm { \frac { 2 \pi } { 5 } } , \pm { \frac { 4 \pi } { 5 } }$ $- \ x _ { 6 } [ n ] = ( - 1 ) ^ { n } x _ { 5 } [ n ] \colon X _ { 6 } ( e ^ { j \omega } ) = X _ { 5 } ( e ^ { j ( \omega - \pi ) } )$ , búp chính tại $\omega = \pm \pi$ $\begin{array} { r } { - \ x _ { 7 } [ n ] = ( 0 . 8 ) ^ { n } u [ n ] \colon | X _ { 7 } ( e ^ { j \omega } ) | = \frac { 1 } { \sqrt { 1 . 6 4 - 1 . 6 \cos \omega } } } \end{array}$ , không có điểm không, lớn nhất tại $\omega = 0 ~ ( \mathrm { b } \tilde { \mathrm { a } } \mathrm { n g } ~ 5 )$ , nhỏ nhất tại $\omega = \pm \pi \ ( \mathrm { b } \tilde { \mathrm { a n g } } \ \frac { 1 } { 1 . 8 } )$ $\begin{array} { r } { x _ { 8 } [ n ] = \cos ( \frac { \pi } { 2 } n ) , n = \overline { { 0 , 7 } } ; \ : X _ { 8 } ( e ^ { j 0 } ) = X _ { 8 } ( e ^ { j \pi } ) = 0 \mathrm { \ v a } \ : | \dddot X _ { 8 } ( e ^ { j \frac { \pi } { 2 } } ) | = 4 ; } \end{array}$ dãy dài 8 mẫu nên đỉnh tại $\pm \frac { \pi } { 2 }$ hẹp hơn và có các búp phụ, khác với phổ (H) của $x _ { 4 } [ n ]$ 

Bài $\begin{array} { r } { 2 1 \colon ( \mathrm { a } ) \cos ^ { 2 } \omega = \frac { 1 } { 2 } + \frac { 1 } { 4 } e ^ { j 2 \omega } + \frac { 1 } { 4 } e ^ { - j 2 \omega } } \end{array}$ , nên $x [ n ] = { \textstyle { \frac { 1 } { 4 } } } \delta [ n + 2 ] + { \textstyle { \frac { 1 } { 2 } } } \delta [ n ] + { \textstyle { \frac { 1 } { 4 } } } \delta [ n - 2 ]$ (b) Đây là bộ lọc thông thấp lý tưởng với $\begin{array} { r } { \omega _ { c } = \frac { \pi } { 3 } } \end{array}$ , trễ 2 mẫu: 

$$
h [ n ] = \frac {\sin (\frac {\pi}{3} (n - 2))}{\pi (n - 2)}, \quad n \neq 2; \qquad h [ 2 ] = \frac {1}{3}
$$

Hệ thống không nhân quả, chẳng hạn $\begin{array} { r } { h [ - 2 ] \ : = \ : - \frac { \sqrt { 3 } } { 8 \pi } \neq \ : 0 . \ : ( \mathrm { c } ) \ : \sum _ { n } \vert h [ n ] \vert ^ { 2 } } \end{array}$ = $\begin{array} { r } { \frac { 1 } { 2 \pi } \int _ { - \pi / 3 } ^ { \pi / 3 } 1 d \omega = \frac { 1 } { 3 } } \end{array}$ 

Bài 22: trong một chu kỳ $[ - \pi , \pi ]$ , phổ của x[n] gồm các vạch tại $\omega = \pm \frac { \pi } { 8 }$ và $\omega = \pm \frac { \pi } { 2 }$ (công thức (3.22)). Bộ lọc giữ nguyên các vạch tại $\pm \frac { \pi } { 8 } \ \mathrm { ( v i } \ \frac { \pi } { 8 } < \omega _ { c } )$ và loại bỏ các vạch tại $\pm \frac { \pi } { 2 } \ \left( \mathrm { v { i } } \ \frac { \pi } { 2 } > \omega _ { c } \right)$ , do đó $\begin{array} { r } { y [ n ] = \cos ( \frac { \pi } { 8 } n ) } \end{array}$ 

Bài 23: (a) $\begin{array} { r } { H ( e ^ { j \omega } ) = \frac 1 3 ( 1 + e ^ { - j \omega } + e ^ { - j 2 \omega } ) = \frac 1 3 e ^ { - j \omega } ( e ^ { j \omega } + 1 + e ^ { - j \omega } ) = \frac 1 3 e ^ { - j \omega } ( 1 + } \end{array}$ 2 cos ω); $H ( e ^ { j \omega } ) = 0$ khi cos $\omega = - \frac { 1 } { 2 }$ , tức $\begin{array} { r } { \omega = \frac { 2 \pi } { 3 } . \ ( \mathrm { b } ) \ H ( e ^ { j 0 } ) = 1 , \ H ( e ^ { j \frac { \pi } { 2 } } ) = } \end{array}$ ${ \textstyle \frac { 1 } { 3 } } e ^ { - j { \frac { \pi } { 2 } } } , H ( e ^ { j { \frac { 2 \pi } { 3 } } } ) = 0$ , nên 

$$
y [ n ] = 1 + \frac {1}{3} \cos \left(\frac {\pi}{2} n - \frac {\pi}{2}\right) = 1 + \frac {1}{3} \sin \left(\frac {\pi}{2} n\right)
$$

(c) Khi $\begin{array} { r } { | \omega | < \frac { 2 \pi } { 3 } } \end{array}$ thì $1 + 2 \cos \omega > 0$ , nên $\arg \{ H ( e ^ { j \omega } ) \} = - \omega \colon$ pha tuyến tính, tương ứng với trễ 1 mẫu. 

Bài 24: (a) $H ( e ^ { j \omega } ) = ( 1 + e ^ { - j \omega } ) ^ { 3 } = \left[ e ^ { - j \frac { \omega } { 2 } } \left( e ^ { j \frac { \omega } { 2 } } + e ^ { - j \frac { \omega } { 2 } } \right) \right] ^ { 3 } = 8 e ^ { - j \frac { 3 } { 2 } \omega } \cos ^ { 3 } \frac { \omega } { 2 }$ Khi $| \omega | < \pi$ thì cos $\begin{array} { r } { \frac { \omega } { 2 } > 0 , } \end{array}$ , nên $\begin{array} { r } { \phi ( \omega ) = - \frac { 3 } { 2 } \omega : } \end{array}$ pha tuyến tính, $\tau _ { g } = 1 . 5$ mẫu (trễ không $\mathrm { n g u y } \mathrm { e n } ) . \ \mathrm { ( b ) } \ 1 - a e ^ { - j \omega } = \left( 1 - a \cos \omega \right) + j a$ a sin ω với $1 - a \cos \omega > 0$ 2 nên $\begin{array} { r } { \phi ( \omega ) = - \arctan \frac { a \sin \omega } { 1 - a \cos \omega } } \end{array}$ và 

$$
\tau_ {g} (\omega) = \frac {a \cos \omega - a ^ {2}}{1 - 2 a \cos \omega + a ^ {2}}
$$

Với $a = 0 . 5 \colon \tau _ { g } ( 0 ) = 1$ mẫu, $\begin{array} { r } { \tau _ { g } ( \pi ) = - \frac { 1 } { 3 } } \end{array}$ mẫu. Trễ nhóm có thể âm; điều này không mâu thuẫn với tính nhân quả, vì (3.19) chỉ là $\mathrm { x } \mathrm { \acute { a } p }$ xỉ cho tín hiệu băng hẹp. 

Bài $2 5 \colon { \mathrm { ( a ) ~ } } h [ n ] = ( - 0 . 5 ) ^ { n } u [ n ]$ , khả tổng tuyệt đối nên $\begin{array} { r } { H ( e ^ { j \omega } ) = \frac { 1 } { 1 + 0 . 5 e ^ { - j \omega } } . { \mathrm { ( b ) } } } \end{array}$ $\begin{array} { r } { | H ( e ^ { j 0 } ) | = \frac { 2 } { 3 } , | H ( e ^ { j \pi } ) | = 2 } \end{array}$ : hệ thống là bộ lọc thông cao, ngược với hệ thống trong bài 18 $( { \frac { | H ( e ^ { j 0 } ) | } { | H ( e ^ { j \pi } ) | } } = 3 ) . { \mathrm { ~ ( c ) ~ } } x [ n ] = 2 e ^ { j 0 n } + e ^ { j \pi n }$ , nên $y [ n ] = 2 \cdot { \frac { 2 } { 3 } } + 2 ( - 1 ) ^ { n } =$ $\textstyle { \frac { 4 } { 3 } } + 2 ( - 1 ) ^ { n }$ 

# Định lý lấy mẫu

Chúng ta đang sống trong kỷ nguyên số, khi mà phần lớn thiết bị công nghệ cao đều là sản phẩm của kỹ thuật số, bên trong các thiết bị đó đều có các tín hiệu và hệ thống rời rạc. Trong khi đó, rất nhiều tín hiệu trên thực tế lại là tương tự (cũng là tín hiệu liên tục theo thời gian). Như vậy, chắc chắn sẽ xảy ra thao tác lấy mẫu để biến tín hiệu liên tục thành tín hiệu rời rạc, cũng là một phần bắt buộc của các bộ ADC. Định lý lấy mẫu đưa ra cơ sở khoa học cho thao tác này, đồng thời cũng chỉ ra chính xác giới hạn tối thiểu mà tần số lấy mẫu cần đạt được để việc lấy mẫu “nắm bắt” được toàn bộ thông tin của tín hiệu ban đầu (đối với tín hiệu có phổ nằm gọn trong một dải tần hữu hạn). 

Chương này sẽ trình bày chi tiết về định lý lấy mẫu, cách chứng minh, cách diễn giải cũng như ý nghĩa và tầm quan trọng của nó trên thực tế (xem thêm [1, 2]). 

## 4.1. Đặt vấn đề và phát biểu định lý

Từ đầu cuốn sách đến giờ, chúng ta tìm hiểu song song về tín hiệu liên tục x(t), tín hiệu rời rạc x[n] và các phép biến đổi trên hai loại tín hiệu này. Tuy có một số tín hiệu bản chất đã rời rạc, nhưng một phần lớn tín hiệu rời rạc còn lại là do chúng đã bị rời rạc hóa từ tín hiệu liên tục, qua các thao tác lấy mẫu và chuẩn hóa như trong (1.1), trong đó T<sub>s</sub> là chu kỳ lấy mẫu. 

Câu hỏi đặt ra là có mối liên hệ gì giữa hai tín hiệu liên tục x(t) và rời rạc x[n] này? Cảm nhận trực giác sẽ nói rằng lấy mẫu đã khiến cho thông tin bị mất đi, bởi vì chúng ta đã bỏ đi tất cả (vô số) những điểm x(t) nằm giữa các mẫu. Nhằm giảm lượng tin mất mát, chúng ta có thể giảm chu kỳ lấy mẫu T<sub>s</sub> (hay tăng tần số lấy mẫu $f _ { s } = 1 / T _ { s }$ lên). Khi đó, các mẫu $x ( n T _ { s } )$ sẽ tiến lại gần nhau hơn, những điểm x(t) bị bỏ đi dường như cũng ít hơn. Khi khoảng cách giữa các mẫu liên tiếp đủ nhỏ, nếu vẽ đồ thị sẽ cho chúng ta cảm giác rằng $x ( n T _ { s } )$ gần như giống hệt x(t). Tuy nhiên, sẽ luôn tồn tại một vấn đề: dù thu nhỏ khoảng cách giữa hai mẫu liên tiếp đi bao nhiêu thì giữa chúng vẫn có vô số điểm $x ( t )$ bị bỏ đi. Như thế, dường như việc mất mát thông tin luôn xảy ra khi thực hiện lấy mẫu. 

Tuy nhiên, Claude Shannon<sup>1</sup> đã không nghĩ vậy. Ông cho rằng, với tín hiệu không có thành phần tần số nào lớn hơn một giá trị B nào đó, luôn tồn tại một giới hạn trên của chu kỳ lấy mẫu: khi $T _ { s }$ không vượt quá giới hạn này thì sẽ không xảy ra mất mát thông tin, và khi đó, từ tín hiệu rời rạc x[n], người ta có thể khôi phục lại tín hiệu liên tục $x ( t )$ . Ông đã phát biểu điều này trong một công trình khoa học xuất bản năm 1949 [3]. 

Định lý 4.1 (Định lý lấy mẫu). “Nếu tín hiệu x(t) không có thành phần tần số nào lớn hơn B hertz thì nó được hoàn toàn xác định tại các mẫu cách nhau $\scriptstyle { \frac { 1 } { 2 B } }$ giây.” – Claude Shannon. 

Phát biểu trên có thể viết lại chính xác hơn như sau. Giả sử $x ( t )$ có năng lượng hữu hạn và phổ của nó thỏa mãn $X ( j \Omega ) = 0$ với mọi $| \Omega | > 2 \pi B$ (tức là $x ( t )$ không có thành phần tần số nào lớn hơn B [Hz]). Khi $\dot { \mathrm { d o } } , x ( t )$ được xác định duy nhất bởi các mẫu $x ( n T _ { s } ) , n \in \mathbb { Z }$ , với mọi chu kỳ lấy mẫu $\begin{array} { r } { \dot { T _ { s } } \le \frac { 1 } { 2 B } } \end{array}$ (tức là $f _ { s } \geq 2 B )$ Trường hợp $f _ { s } = 2 B$ được phân tích thêm ở mục 4.3.1; công thức khôi phục $x ( t )$ từ các mẫu được trình bày ở mục 4.3.2. 

Như $\mathrm { v a y }$ , nếu tai người không nghe được âm thanh có tần số lớn hơn 20 kHz thì khi lấy mẫu tín hiệu âm thanh, người ta chỉ cần thực hiện với tần số lấy mẫu $f _ { s } = 4 4 . 1$ kHz. Ngoài ra, các hệ thống điện thoại cố định truyền thống, khi cần truyền đi tín hiệu thoại, do phần lớn thông tin cần thiết nằm trong dải từ $0 . 3 -$ 3.4 kHz, người ta chỉ cần lấy mẫu với tần số $f _ { s } = 8$ kHz là đủ. Trước khi lấy mẫu, những tín hiệu này sẽ được đưa qua bộ lọc thông thấp để loại bỏ đi những thành phần không cần thiết, nhằm hạn chế chồng $\mathrm { p h } \mathring { \hat { \mathrm { o } } } ,$ khái niệm này sẽ được nhắc tới ở phần sau của chương. Bộ lọc thông thấp trên thực tế không lý tưởng mà có một dải chuyển tiếp giữa dải thông và dải chắn (hình 3.14); đó là lý do tần số lấy mẫu được chọn lớn hơn 2B một chút. Giá trị 2B được gọi là tốc độ Nyquist (Nyquist rate). 

Cần phân biệt giữa hai khái niệm: tốc độ Nyquist và tần số Nyquist (Nyquist frequency). 

Tốc độ Nyquist bằng 2B (đơn vị Hz hoặc mẫu $\cdot / \mathrm { g i a y } )$ , là ngưỡng dưới của tần số lấy mẫu để có thể lấy mẫu một tín hiệu tương tự mà không làm mất thông tin, với điều kiện đã nêu ở trên $( x ( t )$ có năng lượng hữu hạn; nếu $x ( t )$ có thành phần hình sin đúng tại tần số B thì cần $f _ { s } > 2 B )$ . Khái niệm này gắn liền với tín hiệu đầu vào, cho biết ta phải lấy mẫu nhanh cỡ nào. 

Tần số Nyquist bằng $f _ { s } / 2$ , tức là một nửa tần số lấy mẫu $f _ { s }$ của hệ thống phần cứng hoặc thiết bị lấy mẫu. Khái niệm này gắn liền với hệ thống lấy mẫu: đó là cận trên của tần số các thành phần trong tín hiệu thực để không xảy ra hiện tượng chồng phổ (thành phần hình sin đúng tại tần số $f _ { s } / 2$ cũng không khôi phục được). 

Ví dụ 4.1. Tìm tốc độ Nyquist của tín hiệu $x ( t ) = \operatorname { s i n c } ( 2 0 0 t )$ và của tín hiệu $y ( t ) = x ^ { 2 } ( t )$ 

Lời $\mathbf { g i } \mathbf { \dot { a } } \mathbf { i } .$ . Theo định nghĩa (3.4), 

$$
x (t) = \frac {\sin (2 0 0 \pi t)}{2 0 0 \pi t} = \frac {1}{2 0 0} \frac {\sin (\Omega_ {c} t)}{\pi t}, \quad \Omega_ {c} = 2 0 0 \pi .
$$

Theo ví dụ $3 . 1 7 , \ \frac { \sin ( \Omega _ { c } t ) } { \pi t }$ là đáp ứng xung của bộ lọc thông thấp lý tưởng có $H ( j \Omega ) = 1$ với $| \Omega | \leq \Omega _ { c }$ và bằng 0 với $| \Omega | > \Omega _ { c }$ . Do đó 

$$
X (j \Omega) = \left\{ \begin{array}{l l} \frac {1}{2 0 0}, & | \Omega | \leq 2 0 0 \pi \\ 0, & | \Omega | > 2 0 0 \pi \end{array} \right.
$$

Tín hiệu $x ( t )$ không có thành phần tần số nào lớn hơn $B = 1 0 0 ~ \mathrm { H z } .$ nên tốc độ Nyquist là $2 B = 2 0 0$ Hz. Theo quan hệ Parseval, năng lượng của $x ( t )$ bằng $\textstyle { \frac { 1 } { 2 \pi } } \cdot { \frac { 1 } { 2 0 0 ^ { 2 } } } \cdot 4 0 0 \pi = { \frac { 1 } { 2 0 0 } }$ , hữu hạn, nên có thể lấy mẫu với đúng $f _ { s } = 2 0 0$ Hz (xem mục 4.3.1). 

Với $y ( t ) = x ( t ) x ( t )$ , áp dụng tính chất nhân (3.14), ta có $\begin{array} { r } { Y ( j \Omega ) = \frac { 1 } { 2 \pi } [ X ( j \Omega ) * } \end{array}$ $X ( j \Omega ) ]$ ]. Chập hai xung chữ nhật cùng khác 0 trên đoạn $[ - 2 0 0 \pi , 2 0 0 \pi ]$ cho một hàm tam giác khác 0 khi $| \Omega | < 4 0 0 \pi$ . Vậy $y ( t )$ không có thành phần tần số nào lớn hơn 200 $\mathrm { H z , }$ và tốc độ Nyquist của $y ( t )$ là 400 Hz, gấp đôi của $x ( t )$ : phép bình phương (một phép toán phi tuyến) đã mở rộng dải tần của tín hiệu.  

## 4.2. Chứng minh định lý lấy mẫu

Sau đây là cách chứng minh định lý trên theo nguyên bản của Shannon. 

Gọi $X ( j \Omega )$ là phổ của $x ( t )$ , với $x ( t )$ có năng lượng hữu hạn (theo quan hệ Parseval, $X ( j \Omega )$ cũng có năng lượng hữu hạn). Do tín hiệu $x ( t )$ không có thành phần tần số nào lớn hơn $B \ [ \mathrm { H z } ]$ nên $\mathrm { p h } \mathring { \hat { 0 } }$ của nó có thể được minh họa như trong hình 4.1. 

Thực hiện biến đổi Fourier ngược, ta được 

$$
x (t) = \frac {1}{2 \pi} \int_ {- \infty} ^ {\infty} X (j \Omega) e ^ {j \Omega t} d \Omega = \frac {1}{2 \pi} \int_ {- 2 \pi B} ^ {2 \pi B} X (j \Omega) e ^ {j \Omega t} d \Omega
$$

Nếu lấy mẫu với chu kỳ $\begin{array} { r } { T _ { s } = \frac { 1 } { 2 B } } \end{array}$ , thay $\begin{array} { r } { t = \frac { n } { 2 B } } \end{array}$ với $n \in \mathbb { Z }$ vào công thức trên, ta tính được $\mathrm { \ g i \acute { a } }$ trị của các mẫu rời rạc: 

$$
x \left(\frac {n}{2 B}\right) = \frac {1}{2 \pi} \int_ {- 2 \pi B} ^ {2 \pi B} X (j \Omega) e ^ {j \Omega \frac {n}{2 B}} d \Omega
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/9d5184faf5f59525a9842204018d07c4fca13ddee8b4f96091742d83ad5e7fe7.jpg)



Hình 4.1. Phổ của tín hiệu x(t)


Bây giờ, xuất phát từ phổ $X ( j \Omega )$ , ta tạo một tín hiệu mới tuần hoàn trên miền tần số bằng cách cho $\mathrm { p h } \mathring { \hat { 0 } }$ này lặp đi lặp lại với chu kỳ 4πB như trong hình 4.2 

Tại đây, Shannon phát biểu rằng, tín hiệu tuần hoàn trên miền tần số này (chu kỳ $4 \pi B )$ cũng có khai triển chuỗi Fourier (khai triển này tồn tại vì $\tilde { X } ( j \Omega )$ có năng lượng hữu hạn trên một chu $\mathrm { k } { \hat { \mathrm { y } } } .$ xem mục 3.2.2; các hệ số $c _ { n }$ xác định duy nhất $\tilde { X } ( j \Omega ) )$ 0 

$$
\tilde {X} (j \Omega) = \sum_ {n = - \infty} ^ {\infty} c _ {n} e ^ {j \frac {2 \pi}{4 \pi B} n \Omega} = \sum_ {n = - \infty} ^ {\infty} c _ {n} e ^ {j \Omega \frac {n}{2 B}}
$$

trong đó, 

$$
c _ {n} = \frac {1}{4 \pi B} \int_ {- 2 \pi B} ^ {2 \pi B} \tilde {X} (j \Omega) e ^ {- j \frac {2 \pi}{4 \pi B} n \Omega} d \Omega = \frac {1}{4 \pi B} \int_ {- 2 \pi B} ^ {2 \pi B} X (j \Omega) e ^ {- j \Omega \frac {n}{2 B}} d \Omega
$$

So sánh công thức tính $c _ { n }$ và công thức tính $x ( n / ( 2 B ) )$ , ta thấy 

$$
c _ {n} = \frac {1}{2 B} x \left(- \frac {n}{2 B}\right)
$$

Như $\mathrm { v a y , }$ nếu ta biết được tất cả các mẫu $x ( n / ( 2 B ) ) , \forall n \in \mathbb { Z }$ thì ta cũng biết được tất cả các giá trị $c _ { n } , \forall n \in \mathbb { Z }$ . Thay vào công thức khai triển chuỗi Fourier ở trên, ta biết được $\tilde { X } ( j \Omega )$ . Trích ra một chu kỳ của tín hiệu này thì được $X ( j \Omega )$ , sau đó thực hiện biến đổi Fourier ngược thì tìm lại được $x ( t )$ ban đầu. Đây chính là điều phải chứng minh! 

## 4.3. Lấy mẫu bằng dãy xung đơn vị

Coi thao tác lấy mẫu là phép nhân của $x ( t )$ với dãy xung đơn vị tuần hoàn với chu kỳ $T _ { s }$ như minh họa trong hình 4.3. 

$$
x _ {s} (t) = x (t) p (t)
$$

trong đó 

$$
p (t) = \sum_ {k = - \infty} ^ {\infty} \delta (t - k T _ {s})
$$

Nếu $x ( t )$ liên tục tại các điểm $n T _ { s }$ (điều này luôn đúng với tín hiệu có năng lượng hữu hạn và không có thành phần tần số nào lớn hơn $B )$ , áp dụng tính chất lấy mẫu của xung đơn vị (1.14), dưới dạng $x ( t ) \delta ( t - t _ { 0 } ) = x ( t _ { 0 } ) \delta ( t - t _ { 0 } )$ , ta có 

$$
x _ {s} (t) = \sum_ {n = - \infty} ^ {\infty} x (n T _ {s}) \delta (t - n T _ {s})\tag{4.1}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/d56c2eecfd14fb5a2721adc44bde73c8c93d535e1af1ed218209f76ce3525211.jpg)



Hình 4.2. Tín hiệu tuần hoàn trên miền tần số


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1c89262c089a0ca3d67809e7aecad01ba641019e0cf9805da77b261c77308f7f.jpg)



Hình 4.3. Tín hiệu ban đầu $x ( t )$ , dãy xung đơn vị $p ( t )$ và tín hiệu sau lấy mẫu $x _ { s } ( t )$


$\mathrm { { \AA p } }$ dụng tính chất nhân (3.14) (theo nghĩa mở rộng, do $P ( j \Omega )$ chứa các xung Dirac), ta xác định được phổ của tín hiệu sau lấy mẫu $x _ { s } ( t )$ như trong hình 4.4. 

$$
\begin{array}{l} X _ {s} (j \Omega) = \frac {1}{2 \pi} [ X (j \Omega) * P (j \Omega) ], \quad \text {vói} \quad P (j \Omega) = \frac {2 \pi}{T _ {s}} \sum_ {k = - \infty} ^ {\infty} \delta (\Omega - k \frac {2 \pi}{T _ {s}}) \\ \implies \boxed {X _ {s} (j \Omega) = \frac {1}{T _ {s}} \sum_ {k = - \infty} ^ {\infty} X (j (\Omega - k \Omega_ {s})), \Omega_ {s} = \frac {2 \pi}{T _ {s}}} \end{array}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/0aeb9831ebe16c50458d48f651a3182aa674f65710ceb49abd430462d3d3be8c.jpg)



Hình 4.4. Phổ của x(t), p(t), x<sub>s</sub>(t)


Ta thấy phổ của tín hiệu sau lấy mẫu có dạng giống như $\mathrm { p h } \mathring { \hat { 0 } }$ ban đầu, nhưng lặp đi lặp lại với chu kỳ $\Omega _ { s }$ và được nhân với hệ số $1 / T _ { s }$ 

## 4.3.1. Hiện tượng chồng phổ

Khi $\Omega _ { s }$ nhỏ lại thì các bản sao phổ liên tiếp sẽ tiến lại gần nhau, và có thể chồng lên nhau – gọi là chồng phổ (aliasing), xem hình 4.5. Điều kiện để không xảy ra chồng phổ là: 

$$
\Omega_ {s} \geq 4 \pi B \iff f _ {s} \geq 2 B
$$

Khi $f _ { s } = 2 B _ { \mathrm { { \scriptsize ; } } }$ , các bản sao phổ liền kề chạm nhau tại $\Omega = \pm \Omega _ { s } / 2 = \pm 2 \pi B .$ Nếu $x ( t )$ có năng lượng hữu hạn thì việc chạm nhau tại một điểm không làm mất thông tin. Tuy nhiên, nếu $x ( t )$ có thành phần hình sin đúng tại tần số $B ~ ( \mathrm { p h } \acute { 0 } ~ $ có xung Dirac tại $\pm 2 \pi B$ , tín hiệu không có năng lượng hữu hạn) thì xung Dirac của hai bản sao phổ liền kề trùng nhau, tức là xảy ra chồng phổ. Ví dụ, lấy mẫu $x ( t ) = \sin ( 2 \pi B t )$ với $f _ { s } = 2 B$ cho $x ( n T _ { s } ) = \sin ( \pi n ) = 0$ với mọi $n ,$ không phân biệt được với tín hiệu bằng 0. Vì $\mathrm { v a y } .$ dấu bằng trong điều kiện trên chỉ $\mathrm { { \acute { a p } } }$ dụng cho tín hiệu có năng lượng hữu hạn; nếu tín hiệu có thành phần hình sin tại tần số B thì cần lấy mẫu với $f _ { s } > 2 B$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/4f0ccd4b23343c7b23d22702759ac65e7297eec88723f6f21573bb31ac65327b.jpg)



Hình 4.5. Hiện tượng chồng phổ (các bản sao phổ chồng lên nhau; $X _ { s } ( j \Omega )$ là tổng của chúng)


Như vậy, khi $f _ { s } \geq 2 B$ , ta có thể dễ dàng khôi phục được tín hiệu $x ( t )$ ban đầu bằng cách cho $x _ { s } ( t )$ qua bộ lọc thông thấp lý tưởng với tần số cắt $\Omega _ { c } = \Omega _ { s } / 2$ (đáp ứng tần số của bộ lọc này là đường nét đứt trong hình 4.6). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/3ad0bfdf6911858c4ac87d43fc1f1811400e1bb006b9834b7a58d2c349738336.jpg)



Hình 4.6. Khi không chồng phổ và cách khôi phục tín hiệu x(t)


## 4.3.2. Khôi phục lại tín hiệu

Cho tín hiệu $x _ { s } ( t )$ qua bộ lọc thông thấp lý tưởng với $\Omega _ { c } = \Omega _ { s } / 2 \geq 2 \pi B$ 

$$
H (j \Omega) = \left\{ \begin{array}{l l} T _ {s}, & | \Omega | \leq \Omega_ {c c} \\ 0, & | \Omega | > \Omega_ {c c} \end{array} \right.
$$

$$
h (t) = \frac {T _ {s} \sin (\Omega_ {c} t)}{\pi t} = \operatorname{sinc} \left(\frac {t}{T _ {s}}\right)
$$

Ta có: 

$$
\begin{array}{r l} & x (t) = x _ {s} (t) * h (t) = \sum_ {n = - \infty} ^ {\infty} x (n T _ {s}) h (t - n T _ {s}) \\ & \qquad = \sum_ {n = - \infty} ^ {\infty} x (n T _ {s}) \frac {\Omega_ {c} T _ {s}}{\pi} \frac {\sin (\Omega_ {c} (t - n T _ {s}))}{\Omega_ {c} (t - n T _ {s})} \\ & \qquad = \sum_ {n = - \infty} ^ {\infty} x (n T _ {s}) \operatorname{sinc} \left(\frac {t - n T _ {s}}{T _ {s}}\right) \end{array}
$$

Như vậy, tín hiệu x(t) có thể coi chính là tổng của (vô số) hàm sinc như minh họa trong hình 4.7. 

Python. Hàm np.sinc của NumPy dùng đúng định nghĩa (3.4), sin $\begin{array} { r } { \mathbf { \dot { \mathbf { \rho } } } ( t ) = \frac { \sin ( \pi t ) } { \pi t } } \end{array}$ Đoạn mã sau khôi phục $x ( t ) = \mathrm { s i n c } ^ { 2 } ( t )$ (băng thông B = 1 Hz) từ các mẫu lấy với $f _ { s } = 4 ~ \mathrm { H z }$ , bằng công thức nội suy ở trên với tổng cắt ngắn $| n | \leq 1 0 0 ;$ phép nhân ma trận @ thực hiện tổng theo n cho mọi t cùng lúc. Trên đoạn [ 2, 2], sai lệch giữa xr và x(t) nhỏ hơn $1 0 ^ { - 9 }$ 

```python
import numpy as np
Ts = 0.25; n = np.arange(-100, 101)
x = np.sinc(n*Ts)**2
t = np.linspace(-2, 2, 401)
xr = np.sinc((t[:, None] - n*Ts)/Ts) @ x 
```

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b7a6d9fc60bc90b9ab056580d5bf1b2380d192fc0d57ce609b0e42622f91ce2d.jpg)



Hình 4.7. Khôi phục tín hiệu x(t) bằng cách cộng các hàm sinc lại


## 4.4. Phổ của tín hiệu rời rạc x[n]

Trở lại câu hỏi đặt ra ở đầu chương: phổ của tín hiệu rời rạc $x [ n ] = x ( n T _ { s } )$ liên hệ thế nào với phổ của $x ( t ) ?$ Biến đổi Fourier hai vế của (4.1), với $\delta ( t - n T _ { s } ) \longleftrightarrow e ^ { - j \Omega n T _ { s } }$ 2 ta được 

$$
X _ {s} (j \Omega) = \sum_ {n = - \infty} ^ {\infty} x [ n ] e ^ {- j \Omega n T _ {s}}.
$$

So sánh với định nghĩa biến đổi Fourier của tín hiệu rời rạc (3.20), ta thấy hai biểu thức trùng nhau khi đặt $\omega = \Omega T _ { s }$ : 

$$
X (e ^ {j \omega}) = X _ {s} \left(j \frac {\omega}{T _ {s}}\right) = \frac {1}{T _ {s}} \sum_ {k = - \infty} ^ {\infty} X \left(j \frac {\omega - 2 \pi k}{T _ {s}}\right).
$$

Như vậy, phổ của x[n] chính là phổ của $x _ { s } ( t )$ với trục tần số được chuẩn hóa theo $\omega = \Omega T _ { s } = 2 \pi f / f _ { s } ( \mathrm { v } \dot { \mathrm { o i } } \Omega = 2 \pi f )$ : tần số lấy mẫu $\Omega _ { s }$ ứng với $\omega = 2 \pi$ , và $\Omega _ { s } / 2$ ứng với $\omega = \pi$ . Điều này phù hợp với tính chất $X ( e ^ { j \omega } )$ tuần hoàn với chu kỳ 2π. Nếu không xảy ra chồng phổ thì trong khoảng $| \omega | < \pi$ chỉ có bản sao phổ ứng với $k = 0 \mathrm { : }$ 

$$
X (e ^ {j \omega}) = \frac {1}{T _ {s}} X \left(j \frac {\omega}{T _ {s}}\right), \quad | \omega | <   \pi .
$$

Ví dụ 4.2. Tín hiệu $x ( t ) = \cos ( 2 \pi \cdot 3 t )$ được lấy mẫu với tần số $f _ { s } = 4$ Hz. Tìm dãy x[n] và phổ $X ( e ^ { j \omega } )$ . Nếu khôi phục tín hiệu bằng bộ lọc thông thấp lý tưởng với $\Omega _ { c } = \Omega _ { s } / 2$ thì nhận được tín hiệu nào? 

Lời giải. Tín hiệu $x ( t )$ có tần số 3 Hz, nên tốc độ Nyquist là 6 Hz $> f _ { s } = 4$ Hz: điều kiện của định lý lấy mẫu không được thỏa mãn. Với $\begin{array} { r } { T _ { s } = \frac { 1 } { 4 } ~ \mathrm { s } . } \end{array}$ 

$$
x [ n ] = x \left(\frac {n}{4}\right) = \cos \left(\frac {3 \pi}{2} n\right) = \cos \left(2 \pi n - \frac {\pi}{2} n\right) = \cos \left(\frac {\pi}{2} n\right).
$$

Tín hiệu $x _ { 1 } ( t ) = \cos ( 2 \pi \cdot 1 t )$ , lấy mẫu với cùng $f _ { s } ,$ cho $\begin{array} { r } { x _ { 1 } [ n ] \ = \ \cos \left( \frac { 2 \pi } { 4 } n \right) \ = } \end{array}$ cos $\textstyle { \left( { \frac { \pi } { 2 } } n \right) } \ = \ x [ n ]$ : hai tín hiệu liên tục khác nhau cho cùng một dãy mẫu (hình  4.8). 

Trên miền tần số, tần số $\Omega _ { 0 } = 6 \pi$ rad/s ứng với $\begin{array} { r } { \omega _ { 0 } = \Omega _ { 0 } T _ { s } = \frac { 3 \pi } { 2 } } \end{array}$ . Do $X ( e ^ { j \omega } )$ tuần hoàn với chu kỳ 2π, vạch phổ tại $\frac { 3 \pi } { 2 }$ trùng với vạch tại $\begin{array} { r } { \frac { 3 \pi } { 2 } - 2 \pi = - \frac { \pi } { 2 } } \end{array}$ . Trong một chu $\mathrm { k } \dot { \mathrm { y } } \left[ - \pi , \pi \right]$ 2 

$$
X (e ^ {j \omega}) = \pi \left[ \delta \left(\omega - \frac {\pi}{2}\right) + \delta \left(\omega + \frac {\pi}{2}\right) \right],
$$

chính là $\mathrm { p h } \mathring { \hat { 0 } }$ của cos $\scriptstyle \left( { \frac { \pi } { 2 } } n \right)$ . Các vạch tại $\omega = \pm \frac { \pi } { 2 }$ ứng với $\Omega = \pm \frac { \pi } { 2 T _ { \mathrm { e } } } = \pm 2 \pi \ \mathrm { r a d / s } .$ tức là 1 Hz. Bộ lọc thông thấp lý tưởng với $\Omega _ { c } = \Omega _ { s } / 2$ (tần số cắt 2 Hz) giữ lại các vạch phổ này, nên tín hiệu nhận được là cos(2πt) chứ không phải $x ( t )$ : thành phần 3 Hz đã bị chồng phổ thành 1 Hz.  

Python. Có thể kiểm tra nhanh kết luận của ví dụ trên: $\mathrm { l } \mathrm { \acute { a } y }$ mẫu cos $( 2 \pi \cdot 3 t )$ và cos(2πt) với $f _ { s } = 4$ Hz (tức $t = n / 4 )$ rồi so sánh hai dãy bằng hàm np.allclose (so sánh từng phần tử, cho phép sai số làm tròn). Kết quả là True. 

```python
import numpy as np
n = np.arange(8)
x = np.cos(2*np.pi*3*n/4)
x1 = np.cos(2*np.pi*1*n/4)
print(np.allclose(x, x1)) 
```

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/a7b28387e0bcefe61d95cd088e1015dbe48feea1b8e885cdfc41f8ae7978550b.jpg)



Hình 4.8. Ví dụ 4.2. Trên: cos(2π · 3t) (nét liền), cos(2πt) (nét đứt) và các mẫu chung của chúng với $f _ { s } = 4$ Hz. Dưới: phổ $X ( e ^ { j \omega } )$ của dãy mẫu


## Tóm tắt chương

Tín hiệu rời rạc nhận được từ tín hiệu liên tục qua $\mathrm { l } \mathrm { \acute { a } y }$ mẫu và chuẩn hóa: $x [ n ] \ = \ x ( n T _ { s } )$ , với chu kỳ lấy mẫu $T _ { s }$ , tần số lấy mẫu $f _ { s } ~ = ~ 1 / T _ { s }$ [Hz] và $\Omega _ { s } = 2 \pi f _ { s } \ [ \mathrm { r a d / s } ]$ 

Định lý lấy mẫu: nếu $x ( t )$ có năng lượng hữu hạn và $X ( j \Omega ) = 0$ với $| \Omega | > 2 \pi B$ thì $x ( t )$ được xác định duy nhất bởi các mẫu $x ( n T _ { s } )$ khi $f _ { s } \geq 2 B$ . Giá trị 2B là tốc độ Nyquist. Nếu tín hiệu có thành phần hình sin đúng tại tần số B thì cần $f _ { s } > 2 B$ 

Lấy mẫu được mô hình hóa bằng phép nhân với dãy xung đơn vị: $x _ { s } ( t )$ = $\begin{array} { r } { x ( t ) p ( t ) = \sum _ { n } x ( n T _ { s } ) \delta ( t - n T _ { s } ) } \end{array}$ (khi $x ( t )$ liên tục tại các điểm $n T _ { s } )$ . Phổ $\begin{array} { r } { X _ { s } ( j \Omega ) = \frac { 1 } { T _ { s } } \sum _ { k } X ( j ( \Omega - k \Omega _ { s } ) ) } \end{array}$ là phổ ban đầu lặp lại với chu $\mathrm { k } \mathring { \mathrm { y } } \ \Omega _ { s }$ và nhân với $1 / T _ { s }$ 

Khi $f _ { s } < 2 B$ và $\mathrm { p h } \mathring { \hat { 0 } }$ khác 0 trên toàn khoảng $| \Omega | < 2 \pi B$ , các bản sao $\mathrm { p h } \mathring { \hat { 0 } }$ chồng lên nhau (chồng phổ) và không thể khôi phục $x ( t )$ từ các mẫu. Trên thực $\mathrm { t } \acute { \hat { \mathrm { e } } } ,$ tín hiệu được lọc thông thấp trước khi lấy mẫu, và tần số lấy mẫu được chọn lớn hơn 2B một chút. 

Khi không có chồng $\mathrm { p h } \mathring { \boldsymbol { \rho } } , \boldsymbol { x } ( t )$ được khôi phục bằng bộ lọc thông thấp lý tưởng có hệ số khuếch đại $T _ { s }$ và $\begin{array} { r } { \Omega _ { c } = \Omega _ { s } / 2 \colon x ( t ) = \sum _ { n } x ( n T _ { s } ) } \end{array}$ sinc $\scriptstyle \left( { \frac { t - n T _ { s } } { T _ { s } } } \right)$ 

Phổ của dãy mẫu là $\begin{array} { r } { X ( e ^ { j \omega } ) = X _ { s } \left( j \frac { \omega } { T _ { s } } \right) } \end{array}$ , với $\omega = \Omega T _ { s } = 2 \pi f / f _ { s } \colon \Omega _ { s }$ ứng với $\omega = 2 \pi , \Omega _ { s } / 2$ ứng với $\omega = \pi$ . Khi không có chồng phổ, $\begin{array} { r } { X ( e ^ { j \omega } ) = \frac { 1 } { T _ { s } } X \left( j \frac { \omega } { T _ { s } } \right) } \end{array}$ với $| \omega | < \pi$ 

## Bài tập

1. Tìm tốc độ Nyquist của các tín hiệu sau: 

a. $x _ { a } ( t ) = \cos ( 1 0 0 \pi t ) + \sin ( 3 0 0 \pi t )$ 

b. $x _ { b } ( t ) = \operatorname { s i n c } ( 2 0 0 t )$ 

c. $x _ { c } ( t ) = x _ { b } ^ { 2 } ( t )$ 

d. $x _ { d } ( t ) = x _ { b } ( t ) \cos ( 2 \pi \cdot 1 0 0 0 t )$ 

2. Tín hiệu âm thanh được đưa qua bộ lọc chống chồng phổ (anti-aliasing filter) trước khi lấy mẫu với tần số $f _ { s }$ . Bộ lọc giữ nguyên các thành phần trong dải thông $0 \leq f \leq 2 0$ kHz và làm suy giảm đến mức bỏ qua được các thành phần có tần số $f \geq f _ { a }$ , với $f _ { a } < f _ { s } ;$ các thành phần trong dải chuyển tiếp 20 kHz $< f < f _ { a }$ chưa bị suy giảm đủ (hình 3.14). Yêu cầu đặt ra là các thành phần bị chồng phổ (nếu có) không rơi vào dải thông [0, 20] kHz. 

a. Một thành phần hình sin có tần số $f ,$ với $\textstyle { \frac { f _ { s } } { 2 } } < f < f _ { s }$ , sau khi lấy mẫu và khôi phục bằng bộ lọc thông thấp lý tưởng có $\Omega _ { c } = \Omega _ { s } / 2$ trở thành thành phần có tần số bao nhiêu? Từ đó chứng tỏ yêu cầu trên được thỏa mãn khi $f _ { s } - f _ { a } \geq 2 0 ~ \mathrm { k H z }$ 

b. Tìm $f _ { a }$ lớn nhất và độ rộng dải chuyển tiếp $f _ { a } - 2 0$ kHz khi $f _ { s } = 4 4 . 1 \mathrm { { k H z } }$ 7 và khi $f _ { s } = 4 8 ~ \mathrm { k H z }$ 

c. Nếu yêu cầu chặt hơn là không xảy ra chồng phổ ở bất kỳ tần số nào thì với $f _ { s } = 4 4 . 1$ kHz, $f _ { a }$ lớn nhất bằng bao nhiêu? Độ rộng dải chuyển tiếp thay đổi thế nào so với câu b, và điều đó ảnh hưởng thế nào đến việc thực hiện bộ lọc? 

3. Tín hiệu $x ( t ) = \cos ( 2 \pi \cdot 7 0 0 t )$ được lấy mẫu với tần số $f _ { s } = 1$ kHz, sau đó được khôi phục bằng bộ lọc thông thấp lý tưởng có hệ số khuếch đại $T _ { s }$ và $\Omega _ { c } = \Omega _ { s } / 2$ . Tìm tín hiệu nhận được sau bộ lọc. 

4. Tín hiệu 

$$
x (t) = \cos (2 \pi \cdot 1 0 0 0 t) + 0. 5 \cos (2 \pi \cdot 5 0 0 0 t) + 0. 2 \cos (2 \pi \cdot 9 5 0 0 t)
$$

được lấy mẫu với tần số $f _ { s } = 8 ~ \mathrm { k H z }$ 

a. Viết x[n] dưới dạng tổng của các hàm $\cos ( \omega _ { i } n )$ với $0 \leq \omega _ { i } \leq \pi .$ 

b. Dãy mẫu được khôi phục bằng bộ lọc thông thấp lý tưởng có hệ số khuếch đại $T _ { s }$ và $\Omega _ { c } = \Omega _ { s } / 2$ . Tìm tín hiệu nhận được y(t). 

c. Làm lại câu b khi x(t) được đưa qua bộ lọc chống chồng phổ lý tưởng (bộ lọc thông thấp lý tưởng có hệ số khuếch đại 1, tần số cắt 4 kHz) trước khi lấy mẫu. 

d. Nếu không dùng bộ lọc chống chồng phổ thì tần số lấy mẫu phải thỏa mãn điều kiện gì để $y ( t ) = x ( t ) ?$ 

5. Tín hiệu $x ( t ) = A$ cos $( 2 \pi B t + \theta )$ , với $A > 0$ , được lấy mẫu với $f _ { s } = 2 B$ . Chứng minh rằng các mẫu chỉ phụ thuộc vào tích A cos θ. Có thể xác định A và θ từ các mẫu không? 

6. (Nâng cao) Lấy mẫu thông dải (bandpass sampling). Tín hiệu thực $x ( t )$ có phổ $X ( f ) = X ( j 2 \pi f )$ như hình 4.9: $\begin{array} { r } { X ( f ) = \frac { | f | - \bar { 9 } 0 0 } { 2 0 0 } } \end{array}$ với $9 0 0 \le | f | \le 1 1 0 0 ~ \mathrm { H z }$ và $X ( f ) = 0 \textrm { ‰}$ ngoài khoảng này. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/16a3a9fee6de84820b9b290600a55cb0252762290f7b5cec8e508abc123a0bc3.jpg)



Hình 4.9. Phổ của tín hiệu thông dải trong bài tập 6


a. Tìm tốc độ Nyquist của $x ( t )$ 

b. Tín hiệu được lấy mẫu bằng dãy xung đơn vị (mục 4.3). Vẽ các bản sao phổ trong $X _ { s } ( f ) = X _ { s } ( j 2 \pi f )$ trên khoảng $| f | \le 1 2 0 0$ Hz với $f _ { s } = 4 0 0$ , 440 và 500 Hz. Trường hợp nào không xảy ra chồng phổ? 

c. Với trường hợp không chồng phổ ở câu b, cần cho $x _ { s } ( t )$ qua bộ lọc lý tưởng loại nào (thông thấp, thông cao, thông dải hay chắn dải; dải thông và hệ số khuếch đại bằng bao nhiêu) để khôi phục $x ( t ) ?$ 

d. Kết quả ở câu b có mâu thuẫn với định lý lấy mẫu không? Vì sao? 

7. Các mẫu của một tín hiệu, lấy với chu kỳ T<sub>s</sub>, là $x ( 0 ) = x ( T _ { s } ) = 1 \ \mathrm { v { \bar { a } } } \ x ( n T _ { s } ) = 0$ với mọi $n \neq 0 , 1$ . Gọi $x _ { r } ( t )$ là tín hiệu khôi phục từ các mẫu này theo công thức ở mục 4.3.2. 

a. Viết biểu thức của $x _ { r } ( t )$ và vẽ phác đồ thị. 

b. Tính $x _ { r } ( T _ { s } / 2 )$ và so sánh với giá trị của các mẫu. Giá trị nội suy giữa hai mẫu liên tiếp có nhất thiết nằm giữa giá trị của hai mẫu đó không? 

c. Tìm $X _ { r } ( j \Omega )$ . Chứng tỏ rằng $\begin{array} { r } { | X _ { r } ( \bar { j } \Omega ) | = 2 T _ { s } \cos { \frac { \Omega T _ { s } } { 2 } } } \end{array}$ với $\begin{array} { r } { | \Omega | < \frac { \pi } { T _ { s } } } \end{array}$ và pha của $X _ { r } ( j \Omega )$ là hàm tuyến tính của Ω. Pha tuyến tính này ứng với tính chất đối xứng nào của $x _ { r } ( t ) \dddot { \dddot { \ z } }$ 

8. Tín hiệu x(t) có phổ dạng tam giác như hình 4.1 với $B = 5 0$ Hz và $X ( j 0 ) = 1$ được lấy mẫu với $f _ { s } = 1 5 0$ Hz. Tìm và vẽ $X ( e ^ { j \omega } )$ trong khoảng $[ - \pi , \pi ]$ 

9. Làm lại bài 8 với tần số lấy mẫu $f _ { s } = 7 5$ Hz. 

a. Có xảy ra chồng phổ không? Những bản sao phổ nào khác 0 trong khoảng $[ - \pi , \pi ] ?$ 

b. Tìm và vẽ $X ( e ^ { j \omega } )$ trong khoảng $[ - 2 \pi , 2 \pi ]$ 

c. So sánh $X ( e ^ { j \pi } )$ với $\textstyle { \frac { 1 } { T _ { s } } } X \left( j { \frac { \pi } { T _ { s } } } \right)$ . Có khôi phục được $x ( t )$ từ các mẫu không? 

10. Dãy $x [ n ] = \cos ( 0 . 4 \pi n )$ nhận được khi lấy mẫu tín hiệu $x ( t ) = \cos ( 2 \pi f _ { 0 } t )$ với $f _ { s } = 1$ kHz. 

a. Tìm tất cả các giá trị $f _ { 0 } \geq 0$ có thể. Nếu biết thêm $x ( t )$ thỏa mãn điều kiện của định lý lấy mẫu thì $f _ { 0 }$ bằng bao nhiêu? 

b. $\mathrm { D } \tilde { \mathrm { a y } } \ x [ n ]$ được đưa qua bộ lọc thông thấp lý tưởng rời rạc với tần số cắt $\omega _ { c } = \frac { \pi } { 4 }$ (ví dụ 3.22). Tần số cắt này ứng với bao nhiêu hertz của tín hiệu liên tục? Tìm dãy đầu ra $y [ n ]$ 

## Đáp số bài tập

Bài 1: 

a. Hai thành phần có tần số 50 Hz và 150 Hz, nên $B = 1 5 0$ Hz và tốc độ Nyquist là 300 Hz. Do có thành phần hình sin đúng tại 150 $\mathrm { H z , }$ cần lấy mẫu với $f _ { s } > 3 0 0$ Hz. 

b. 200 Hz (ví dụ 4.1). 

c. 400 Hz (ví dụ 4.1). 

d. Phép nhân với $\cos ( 2 \pi \cdot 1 0 0 0 t )$ dịch phổ của $x _ { b } ( t )$ đến 1000 Hz, nên $x _ { d } ( t )$ có các thành phần tần số từ 900 Hz đến 1100 Hz; $B = 1 1 0 0$ Hz và tốc độ Nyquist là 2200 Hz. 

Bài 2: 

a. Tương tự bài 3, thành phần tần số f trở thành thành phần tần số $f _ { s } - f .$ Các thành phần có $\begin{array} { r } { f \le \frac { f _ { s } } { 2 } } \end{array}$ không bị chồng phổ; các thành phần trong khoảng $\textstyle { \frac { f _ { s } } { 2 } } < f < f _ { a }$ chồng phổ vào khoảng $\begin{array} { r } { ( f _ { s } - f _ { a } , \frac { f _ { s } } { 2 } ) ; } \end{array}$ ; các thành phần có $f \geq f _ { a }$ được bỏ qua. Khoảng $\begin{array} { r } { ( f _ { s } - f _ { a } , \frac { f _ { s } } { 2 } ) } \end{array}$ không giao với dải thông [0, 20] kHz khi và chỉ khi $f _ { s } - f _ { a } \ge 2 0$ kHz. 

b. $f _ { s } = 4 4 . 1$ kHz: $f _ { a } \leq 2 4 . 1$ kHz, dải chuyển tiếp rộng 4.1 kHz. $f _ { s } = 4 8 \mathrm { { k H z } \mathrm { { : } } }$ $f _ { a } \leq 2 8$ kHz, dải chuyển tiếp rộng 8 kHz. 

c. Cần $f _ { a } \le \frac { f _ { s } } { 2 } = 2 2 . 0 5$ kHz: dải chuyển tiếp chỉ còn 2.05 kHz, hẹp bằng một nửa so với câu b, nên bộ lọc phải có độ dốc lớn hơn, tức là bậc cao hơn (mục 6.6). Với yêu cầu ở câu b, các thành phần bị chồng phổ nằm trong khoảng (20, 22.05) kHz, ngoài dải thông, và có thể được loại bỏ bằng một bộ lọc số sau khi lấy mẫu. 

Bài 3: Các bản sao $\mathrm { p h } \mathring { \hat { 0 } }$ trong $X _ { s } ( j \Omega )$ nằm tại các tần $\mathrm { s } \acute { \hat { \mathrm { o } } } \pm 7 0 0 + 1 0 0 0 k ~ \mathrm { H z }$ 2 $k \in \mathbb { Z } ;$ trong dải thông của bộ lọc $( | f | < 5 0 0 ~ \mathrm { H z } )$ chỉ có các vạch tại 300 Hz. Tín hiệu nhận được là cos(2π  300t). 

Bài 4: 

a. $\omega = 2 \pi f / f _ { s } \mathrm { ; }$ 1000 Hz ứng với $\textstyle { \frac { \pi } { 4 } } ;$ 5000 Hz ứng với $\frac { 5 \pi } { 4 }$ , tương đương $- \frac { 3 \pi } { 4 }$ ; 9500 Hz ứng với $\textstyle { \frac { 1 9 \pi } { 8 } }$ , tương đương $\frac { 3 \pi } { 8 }$ . Do hàm cos chẵn, $x [ n ] =$ cos $\begin{array} { r } { \left( \frac { \pi } { 4 } n \right) + 0 . 5 \cos { \left( \frac { 3 \pi } { 4 } n \right) } \breve { + } 0 . 2 \cos { \left( \frac { 3 \pi } { 8 } n \right) } } \end{array}$ 

b. $y ( t ) = \cos ( 2 \pi \cdot 1 0 0 0 t ) + 0 . 5 \cos ( 2 \pi \cdot 3 0 0 0 t ) + 0 . 2 \cos ( 2 \pi \cdot 1 5 0 0 t )$ : thành phần 5 kHz bị chồng phổ thành 3 kHz, thành phần 9.5 kHz thành 1.5 kHz. 

c. Bộ lọc chống chồng phổ loại bỏ hai thành phần 5 kHz và 9.5 kHz, nên $y ( t ) = \cos ( 2 \pi \cdot 1 0 0 0 t )$ . Tín hiệu mất các thành phần tần số cao nhưng không còn các thành phần giả do chồng phổ. 

d. $f _ { s } > 1 9$ kHz (dấu bằng không được phép vì $x ( t )$ có thành phần hình sin tại 9.5 kHz). 

Bài 5: $x ( n T _ { s } ) = A \cos ( \pi n + \theta ) = ( - 1 ) ^ { n } A$ cos θ. Không xác định được: ví dụ $A = 1 , \theta = 0 { \mathrm { ~ v a ~ } } A = 2 , \theta = { \frac { \pi } { 3 } }$ cho cùng một dãy mẫu $( - 1 ) ^ { n }$ 

Bài 6: 

a. B = 1100 Hz, tốc độ Nyquist là 2200 Hz. 

b. Đặt $\Omega = 2 \pi f$ trong công thức của $X _ { s } ( j \Omega )$ , ta có $\begin{array} { r } { X _ { s } ( f ) = f _ { s } \sum _ { k } X ( f - } \end{array}$ $k f _ { s } )$ : mỗi nửa phổ (900 f 1100 Hz v $\mathrm { i } \ - 1 1 0 0 \leq f \leq - 9 0 0 \ \mathrm { H z } )$ được dịch đi $k f _ { s } , k \in \mathbb { Z }$ (hình 4.10). 

$f _ { s } = 4 0 0$ Hz: bản sao của nửa dương ứng với $k = - 2$ và bản sao của nửa âm ứng với $k = 3$ cùng nằm trên khoảng [100, 300] Hz (tổng của chúng bằng hằng số $f _ { s } ) ;$ : chồng phổ. 

$f _ { s } = 4 4 0$ Hz: các bản sao chỉ chạm nhau tại các điểm biên (ví dụ tại 220 Hz): không chồng phổ. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/045c251ef2aeb0bc378f78f9c857a2d3ad0bcdfdf9257898f677f1cdd1baf3c6.jpg)



Hình 4.10. Các bản sao phổ trong $X _ { s } ( f ) \ \tilde { \mathrm { d } }$ bài tập 6 (không ghi tung độ). Ở hình (b), nét đứt là dải thông của bộ lọc khôi phục


$f _ { s } = 5 0 0$ Hz: bản sao của nửa dương $\left( k = - 2 \right)$ và của nửa âm $( k = 2 )$ cùng nằm trên [ 100, 100] Hz: $\mathrm { c h } \tilde { \mathrm { o } } \mathrm { n g } \mathrm { p h } \tilde { \mathrm { o } } .$ 

c. Với $f _ { s } =$ 440 Hz, trên các khoảng $9 0 0 \leq | f | \leq 1 1 0 0$ Hz chỉ có bản sao $k = 0$ . Dùng bộ lọc thông dải lý tưởng có $H = T _ { s }$ khi $9 0 0 \leq | f | \leq 1 1 0 0$ Hz và $H = 0 \textrm { ‰}$ ngoài. 

d. Không mâu thuẫn. Định lý lấy mẫu cho điều kiện đủ $\left( f _ { s } \ \ge \ 2 B \right.$ với B là tần số lớn nhất), không khẳng định rằng với $f _ { s } < 2 B$ thì luôn xảy ra chồng phổ. Điều kiện $f _ { s } \geq 2 B$ cũng là điều kiện cần khi phổ khác 0 trên toàn khoảng $| f | < B$ (như hình 4.1); $\mathrm { p h } \mathring { \hat { 0 } }$ của tín hiệu thông dải thì bằng 0 trên khoảng $\vert f \vert < 9 0 0$ Hz, nên các bản sao có thể nằm vào đó. Với tín hiệu này, các tần số lấy mẫu không gây chồng phổ là 440 $\leq f _ { s } \leq 4 5 0$ $5 5 0 \leq f _ { s } \leq 6 0 0 , 7 3 3 . 3 \leq f _ { s } \leq 9 0 0 , 1 1 0 0 \leq f _ { s } \leq 1 8 0 0 \mathrm { ~ v a ~ } f _ { s } \geq 2 2 0 0 \mathrm { ~ H z ~ }$ 

Bài 7: 

a. $\begin{array} { r } { \boldsymbol { x } _ { r } ( t ) = \operatorname { s i n c } \left( \frac { t } { T _ { s } } \right) } \end{array}$ + sinc $\scriptstyle \left( { \frac { t - T _ { s } } { T _ { s } } } \right)$ (hình 4.11). 

b. $\begin{array} { r } { x _ { r } ( T _ { s } / 2 ) = 2 \operatorname { s i n c } \left( \frac { 1 } { 2 } \right) = \frac { 4 } { \pi } \approx } \end{array}$ 1.273, lớn hơn giá trị của mọi mẫu (đây cũng là giá trị lớn nhất của $x _ { r } ( t ) )$ . Như vậy, giá trị nội suy không nhất thiết nằm giữa giá trị của hai mẫu lân cận. 

c. X (jΩ) = T 1 + e−jΩTs = 2T cos $\frac { \Omega T _ { s } } { 2 } e ^ { - j \Omega T _ { s } / 2 }$ với $\begin{array} { r } { | \Omega | < \frac { \pi } { T _ { s } } } \end{array}$ , và bằng 0 với $\begin{array} { r } { | \Omega | > \frac { \pi } { T _ { \mathrm { s } } } } \end{array}$ . Do cos $\frac { \Omega T _ { s } } { 2 } > 0$ khi $\begin{array} { r } { | \Omega | < \frac { \pi } { T _ { \mathrm { s } } } } \end{array}$ , pha bằng $- \frac { \Omega T _ { s } } { 2 }$ , ứng với trễ $\scriptstyle { \frac { T _ { s } } { 2 } }$ (mục $3 . 5 . 4 ) \colon x _ { r } ( t )$ đối xứng qua $\begin{array} { r } { t = \frac { T _ { s } } { 2 } } \end{array}$ , tức là $x _ { r } ( T _ { s } - t ) = x _ { r } ( t )$ 

Bài 8: $\begin{array} { r } { T _ { s } \ = \ \frac { 1 } { 1 5 0 } \ \mathrm { s } , \ X ( j \Omega ) \ = \ 1 - \ \frac { | \Omega | } { 1 0 0 \pi } } \end{array}$ với $| \Omega | \le 1 0 0 \pi$ . Do $f _ { s } ~ = ~ 1 5 0$ Hz $> 2 B = 1 0 0 ~ \mathrm { H z }$ , không có chồng phổ, và trong khoảng $[ - \pi , \pi ]$ 

$$
X (e ^ {j \omega}) = \frac {1}{T _ {s}} X \left(j \frac {\omega}{T _ {s}}\right) = \left\{ \begin{array}{l l} 1 5 0 \left(1 - \frac {3 | \omega |}{2 \pi}\right), & | \omega | \leq \frac {2 \pi}{3} \\ 0, & \frac {2 \pi}{3} <   | \omega | \leq \pi \end{array} \right.
$$

Đồ thị là một tam giác có đỉnh 150 tại $\omega = 0$ , bằng 0 tại $\omega = \pm \frac { 2 \pi } { 3 }$ , và lặp lại với chu kỳ 2π. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/11c638a23d0f684916ff0946dbc871a6bdfe59572bace4c2b19d17533ec8ca5d.jpg)



Hình 4.11. Tín hiệu khôi phục $x _ { r } ( t )$ (nét liền) là tổng của hai hàm sinc (nét đứt) trong bài tập 7; các chấm là các mẫu


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/32f26445fa65bc8e68728fc8ce37f24093959898070c68a8e905dd087e6b8e50.jpg)



Hình 4.12. Phổ $X ( e ^ { j \omega } )$ (nét liền) và các bản sao phổ (nét đứt) trong bài tập 9


Bài 9: $\begin{array} { r } { T _ { s } = \frac { 1 } { 7 5 } ~ \mathrm { s } . } \end{array}$ 

a. $f _ { s } ~ = ~ 7 5 ~ \mathrm { H z } ~ < ~ 2 B ~ = ~ 1 0 0$ Hz nên có chồng phổ. Bản sao thứ k là 75 $\textstyle \left( 1 - { \frac { 3 | \omega - 2 \pi k | } { 4 \pi } } \right)$ khi $\begin{array} { r } { | \omega - 2 \pi k | \le \frac { 4 \pi } { 3 } } \end{array}$ và bằng $0 \ \mathrm { \dot { \ d } \ n g o \dot { a } i }$ . Trong khoảng $[ - \pi ,$ π] có bản sao $k = 0 .$ , bản sao $k = 1$ (khác 0 khi $\begin{array} { r } { \omega > \frac { 2 \pi } { 3 } ) } \end{array}$ và bản sao $k = - 1$ (khác 0 khi $\omega < - \frac { 2 \pi } { 3 } )$ ). 

b. Trong khoảng $[ - \pi , \pi ]$ 

$$
X (e ^ {j \omega}) = \left\{ \begin{array}{l l} 7 5 \left(1 - \frac {3 | \omega |}{4 \pi}\right), & | \omega | \leq \frac {2 \pi}{3} \\ 3 7. 5, & \frac {2 \pi}{3} <   | \omega | \leq \pi \end{array} \right.
$$

và $X ( e ^ { j \omega } )$ lặp lại với chu $\ker 2 \pi$ (hình 4.12). 

c. $X ( e ^ { j \pi } ) = 3 7 . 5 ,$ , gấp đôi $\begin{array} { r } { \frac { 1 } { T _ { s } } X \left( j \frac { \pi } { T _ { s } } \right) = 7 5 \cdot \left( 1 - \frac { 7 5 \pi } { 1 0 0 \pi } \right) = 1 8 . 7 5 } \end{array}$ , vì tại $\omega = \pi$ có hai bản sao $( k = 0 \mathrm { \ v a \ } k = 1 )$ cộng vào. Không khôi phục được: với $\begin{array} { r } { \frac { 2 \pi } { 3 } < | \omega | < \pi , X ( e ^ { j \omega } ) \neq \frac { 1 } { T _ { s } } X \left( j \frac { \omega } { T _ { s } } \right) } \end{array}$ 

Bài 10: 

a. $\omega _ { 0 } = 2 \pi f _ { 0 } / f _ { s } = 0 . 4 \pi + 2 \pi k \mathrm { ~ h o \vec { \mathfrak { a } c } ~ } - 0 . 4 \pi + 2 \pi k .$ nên $f _ { 0 } = | 1 0 0 0 k \pm 2 0 0 |$ $\mathrm { H z } , k \in \mathbb { Z } ,$ tức là $f _ { 0 } \in \{ 2 0 0 , 8 0 0 , 1 2 0 0 , 1 8 0 0 , . . . \}$ Hz. Nếu $x ( t )$ thỏa mãn điều kiện của định lý lấy mẫu $( f _ { s } > 2 f _ { 0 } , \mathrm { v i } \ x ( t )$ là tín hiệu hình sin) thì $f _ { 0 } = 2 0 0 \ \mathrm { H z }$ 

b. $\begin{array} { r } { f _ { c } = \frac { \omega _ { c } } { 2 \pi } f _ { s } = 1 2 5 \ } \end{array}$ Hz. Do $\textstyle 0 . 4 \pi > { \frac { \pi } { 4 } }$ , thành phần của $x [ n ]$ nằm ngoài dải thông, nên $y [ n ] = 0$ 

## Biến đổi z

Biến đổi z được Ragazzini và Zadeh giới thiệu vào năm 1952. Biến đổi $z \cot $ vai trò quan trọng khi phân tích và tổng hợp hệ thống LTI rời rạc theo thời gian. Chương này sẽ trình bày định nghĩa về biến đổi z kèm theo khái niệm miền hội tụ, các tính chất và phương pháp biến đổi z ngược bằng cách phân tích thành các phân thức tối giản, và mối liên quan giữa hàm truyền của hệ thống với các đặc trưng khác của hệ thống như phương trình sai phân tuyến tính hệ số hằng, sơ đồ thực hiện hệ thống. 

## 5.1. Định nghĩa biến đổi z và miền hội tụ

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/364e6dd82e9a6e0bb5e8f875b867a4568bead802373d3326a7fce8dc205e440a.jpg)



Hình 5.1. Cặp biến đổi z


Dãy x[n] rời rạc trên miền thời gian có thể được biểu diễn trên miền z qua cặp biến đổi z (xem hình 5.1) 

$$
x [ n ] \stackrel {z} {\longleftrightarrow} X (z)
$$

trong $\vec { \mathrm { d } } \acute { \mathrm { o } } \ z \mathrm { \ l \ a }$ biến số phức $z = r e ^ { j \omega }$ , và biến đổi z thuận được định nghĩa như sau 

$$
X (z) = \sum_ {n = - \infty} ^ {\infty} x [ n ] z ^ {- n}\tag{5.1}
$$

Miền hội tụ (region of convergence, ROC) của $X ( z )$ được định nghĩa là tập hợp các điểm z trên mặt phẳng phức mà tại đó chuỗi trong (5.1) hội tụ tuyệt đối 

$$
\operatorname{ROC} \{X (z) \} = \left\{z \in \mathbb {C}: \sum_ {n = - \infty} ^ {\infty} | x [ n ] | | z | ^ {- n} <   \infty \right\}
$$

Lưu ý rằng biểu thức dạng đóng của $X ( z )$ có thể nhận giá trị hữu hạn cả tại những điểm nằm ngoài ROC (xem ví dụ 5.1 dưới đây: $\scriptstyle { \frac { 1 } { 1 - z ^ { - 1 } } }$ hữu hạn tại $z = 0 . 5$ , nhưng điểm này không thuộc ROC). Vì vậy, kết quả biến đổi z chỉ đầy đủ khi đi kèm với miền hội tụ. 

Ví dụ 5.1. Tìm biến $\operatorname { d } \acute { \boldsymbol { \mathrm { o } } } \acute { \boldsymbol { 1 } } ~ z$ của $x _ { 1 } [ n ] = \delta [ n ] \ \mathrm { v { \dot { a } } } \ x _ { 2 } [ n ] = u [ n ] ,$ 

Lời giải. $\mathrm { { \acute { A } p } }$ dụng định nghĩa, và tính chất của hàm xung đơn vị $\delta [ n ]$ , ta có 

$$
X _ {1} (z) = \sum_ {n = - \infty} ^ {\infty} \delta [ n ] z ^ {- n} = 1 \quad \forall z
$$

Miền hội tụ $\mathrm { R O C } \{ X _ { 1 } ( z ) \}$ là toàn bộ mặt phẳng phức. 

Biến đổi z của hàm nhảy đơn vị được tính như sau. 

$$
\begin{array}{r l} & X _ {2} (z) = \sum_ {n = - \infty} ^ {\infty} u [ n ] z ^ {- n} \\ & \qquad = \sum_ {n = 0} ^ {\infty} z ^ {- n} \\ & \qquad = \lim _ {M \to \infty} \frac {1 - z ^ {- M}}{1 - z ^ {- 1}} \end{array}
$$

Do lim $\scriptstyle { \operatorname { 1 } } M \to \infty { \left( z \right) } ^ { - M }$ sẽ hội tụ (về 0) khi và chỉ khi $| z | > 1$ nên 

$$
X _ {2} (z) = \frac {1}{1 - z ^ {- 1}} \quad \mathrm{khi} | z | > 1
$$

Miền hội tụ $\mathrm { R O C } \{ X _ { 2 } ( z ) \}$ là phần mặt phẳng phức nằm ngoài vòng tròn đơn vị.  

## 5.1.1. Mối quan hệ giữa biến đổi z và biến đổi Fourier

Từ định nghĩa của biến đổi Fourier (3.20) và định nghĩa của biến $\mathrm { { \ d } } \mathrm { { \acute { o } i } } \ z \ ( 5 . 1 )$ , chúng ta có thể thấy biến đổi Fourier là biến đổi z xét trên vòng tròn đơn vị $z = e ^ { j \omega }$ , với điều kiện vòng tròn đơn vị nằm trong $\mathrm { R O C } \{ X ( z ) \}$ 

$$
X (e ^ {j \omega}) = X (z) | _ {z = e ^ {j \omega}}\tag{5.2}
$$

Nếu vòng tròn đơn vị không nằm trong miền hội tụ, chẳng hạn với $x [ n ] = 2 ^ { n } u [ n ]$ $\left( \operatorname { R O C } \colon | z | > 2 \right)$ , thì không thể thay $z = e ^ { j \omega }$ vào X(z) để tìm $X ( e ^ { j \omega } )$ 

Ngược lại, khi viết $z = r e ^ { j \omega }$ , ta cũng có thể coi biến $\operatorname { d } \acute { \boldsymbol { \mathrm { o } } } \acute { \mathbf { l } } ~ z$ là biến đổi Fourier của $x [ n ] r ^ { - n }$ 

$$
X (z) = \sum_ {n = - \infty} ^ {\infty} x [ n ] (r e ^ {j \omega}) ^ {- n} = \mathrm{FT} \{x [ n ] r ^ {- n} \}\tag{5.3}
$$

Như vậy, điều kiện hội tụ của $X ( z )$ chính là điều kiện tồn tại $\mathrm { F T } \{ x [ n ] r ^ { - n } \}$ 

$$
\sum_ {n = - \infty} ^ {\infty} | x [ n ] r ^ {- n} | <   \infty\tag{5.4}
$$

## 5.1.2. Miền hội tụ

Từ (5.4), ta thấy miền hội tụ của $X ( z )$ chỉ phụ thuộc vào $| z | = r$ chứ không phụ thuộc vào arg $\{ z \} = \omega$ . Các điểm nằm trên cùng một vòng tròn có tâm là gốc tọa độ trên mặt phẳng phức sẽ cùng thuộc miền hội $\tan .$ , hoặc cùng không thuộc miền hội tụ của $X ( z )$ . Điều này gợi $\acute { \mathrm { y } }$ cho chúng ta biết về hình dạng của $\mathrm { R O C } \{ X ( z ) \}$ như trong các ví dụ dưới đây. 

Ví dụ 5.2. Hãy tìm biến đổi z và miền hội tụ cho dãy 

$$
x [ n ] = \{2, 1, 0, - 3, 7 \}
$$

Lời giải. $\mathrm { { \acute { A } p } }$ dụng định nghĩa (5.1), ta có 

$$
X (z) = 2 z + 1 - 3 z ^ {- 2} + 7 z ^ {- 3}
$$

Do 

$$
\lim _ {z \to 0} X (z) = \infty ; \quad \lim _ {z \to \infty} X (z) = \infty ;
$$

nên miền hội tụ của $X ( z )$ là: $0 < | z | < \infty$ 

Ví dụ 5.3. Hãy tìm biến đổi z và vẽ miền hội tụ cho dãy 

$$
x [ n ] = a ^ {n} u [ n ]
$$

Lời $\mathbf { g i } \mathrm { \dot { a } i }$ . Do $u [ n ]$ là hàm nhảy đơn vị, theo định nghĩa, ta có 

$$
\begin{array}{l} X (z) = \sum_ {n = - \infty} ^ {\infty} a ^ {n} u [ n ] z ^ {- n} \\ = \sum_ {n = 0} ^ {\infty} a ^ {n} z ^ {- n} \\ = \lim _ {M \to \infty} \frac {1 - a ^ {M} z ^ {- M}}{1 - a z ^ {- 1}} \end{array}
$$

Dễ thấy lim $M \to \infty  \left( z / a \right) ^ { - M }$ sẽ hội tụ $( \mathrm { v } \hat { \hat { \mathrm { e } } } 0 )$ khi và chỉ khi $\textstyle | { \frac { z } { a } } | > 1$ . Do $\mathrm { v a y }$ y, 

$$
X (z) = \frac {1}{1 - a z ^ {- 1}} \quad \mathrm{kh} | z | > | a |\tag{5.5}
$$

Miền hội tụ là phần mặt phẳng nằm ngoài vòng tròn có tâm tại gốc tọa độ, bán kính a như minh họa trong hình 5.2. 

Ví dụ 5.4. Hãy tìm biến $\mathrm { d } \hat { \mathrm { o } } \mathrm { i } ~ z \ \mathrm { v } \mathrm { \hat { a } }$ vẽ miền hội tụ cho dãy 

$$
x [ n ] = - a ^ {n} u [ - n - 1 ]
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/11bc878835a66b2aceb250971b226c1c7a89982940ae3fbcb221950dcdf24434.jpg)



Hình 5.2. Miền hội tụ $\mathrm { R O C } \{ X ( z ) \}$ trong ví dụ 5.3


Bạn đọc có thể tự giải ví dụ này. Kết quả như sau: 

$$
X (z) = \frac {1}{1 - a z ^ {- 1}} \quad \mathrm{khi} | z | <   | a |\tag{5.6}
$$

So sánh với ví dụ 5.3 thì hai dãy khác nhau trên miền $n ,$ nhưng khi biến đổi thì cho cùng một $X ( z )$ , và có miền hội tụ khác nhau. Trong ví dụ này, miền hội tụ là phần mặt phẳng nằm bên trong vòng tròn có tâm tại $\mathrm { g } \acute { \mathrm { o c } }$ tọa độ, bán kính a như minh họa trong hình 5.3. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/e78b173964ee3459cba5eb295380026c8fb19dd1b5135d5dab39ccf9357bdd92.jpg)



Hình 5.3. Miền hội tụ $\mathrm { R O C } \{ X ( z ) \}$ trong ví dụ 5.4


Ví dụ 5.5. Hãy tìm biến đổi z và vẽ miền hội tụ cho dãy 

$$
x [ n ] = 2 ^ {n} u [ n ] - (3 j) ^ {n} u [ - n - 1 ]
$$

Kết hợp hai ví dụ trước, ta có thể dễ dàng tìm được 

$$
X (z) = \frac {1}{1 - 2 z ^ {- 1}} + \frac {1}{1 - 3 j z ^ {- 1}} \quad \mathrm{khi} 2 <   | z | <   3
$$

Miền hội tụ là phần mặt phẳng nằm giữa hai vòng tròn có tâm tại $\mathrm { g } \acute { \mathrm { o c } } ;$ , và bán kính lần lượt là 2 và 3 (xem hình 5.4). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/b9b3ca883addeae55466f3b4896e4b5021b3d3ac691ca5126390a4ecd6f78515.jpg)



Hình 5.4. Miền hội tụ ROC{X(z)} trong ví dụ 5.5


Xuất phát từ điều kiện cần và đủ để hệ thống LTI nhân quả, $h [ n ] = 0 , \forall n < 0$ (xem chương 2), người ta mở rộng khái niệm nhân quả / phản nhân quả cho các dãy rời rạc như sau. 

Định nghĩa 5.1. Dãy x[n] được gọi là dãy nhân quả (causal sequence) nếu $x [ n ] = 0$ với mọi $n < 0 .$ , và được gọi là dãy phản nhân quả (anti-causal sequence) nếu $x [ n ] = 0$ với mọi $n > 0$ 

Qua các ví dụ nêu trên, chúng ta rút ra được một số đặc điểm về miền hội tụ của biến đổi z như sau 

(i) Nếu x[n] có chiều dài hữu hạn thì ROC sẽ là cả mặt phẳng phức, có thể bỏ đi 0 và . 

(ii) Nếu x[n] là dãy phía trái (left-sided sequence) có chiều dài vô hạn thì ROC sẽ là phần mặt phẳng nằm trong vòng tròn có tâm tại gốc: $| z | < r _ { 2 }$ . Điểm $z = 0$ thuộc ROC khi và chỉ khi $x [ n ] = 0$ với mọi $n > 0$ 

(iii) Nếu x[n] là dãy phía phải (right-sided sequence) có chiều dài vô hạn thì ROC sẽ là phần mặt phẳng nằm ngoài vòng tròn có tâm tại gốc: $r _ { 1 } < | z |$ . Điểm $z = \infty$ thuộc ROC khi và chỉ khi $x [ n ] = 0$ với mọi $n < 0$ , tức là x[n] là dãy nhân quả. 

(iv) Nếu x[n] là dãy hai phía (two-sided sequence) có chiều dài vô hạn thì ROC sẽ là phần mặt phẳng nằm giữa hai vòng tròn có tâm tại gốc: $r _ { 1 } < | z | < r _ { 2 }$ với điều kiện $r _ { 1 } < r _ { 2 }$ . Nếu $r _ { 1 } \geq r _ { 2 }$ thì ROC là tập rỗng và x[n] không có biến đổi z; ví dụ $\begin{array} { r } { x [ n ] = u [ n ] + \left( \frac { 1 } { 2 } \right) ^ { n } u [ - n - 1 ] } \end{array}$ cần đồng thời $| z | > 1$ và $\vert z \vert < { \frac { 1 } { 2 } }$ 

Nhận xét. Miền hội tụ ROC $\{ X ( z ) \}$ có dạng tổng quát: 

$$
r _ {1} <   | z | <   r _ {2}\tag{5.7}
$$

Tùy theo $\tt d \breve { a } c$ điểm của dãy $x [ n ] , r _ { 1 }$ có thể suy biến về 0 hoặc biến mất; và $r _ { 2 }$ có thể suy biến về hoặc biến mất. 

## 5.1.3. Các điểm cực và không

Các điểm không (zeros) $z _ { 0 r }$ là những điểm mà tại đó $X ( z )$ bằng không 

$$
X (z _ {0 r}) = 0
$$

Các điểm cực (poles) $z _ { p k }$ là những điểm mà tại đó $X ( z )$ bằng vô cùng 

$$
X (z _ {p k}) = \infty
$$

Như $\mathrm { v a y } .$ , nếu $X ( z )$ là một hàm hữu $\mathrm { t \vec { y } }$ 

$$
X (z) = \frac {N (z)}{D (z)} = \frac {b _ {0} + b _ {1} z + \cdots + b _ {M} z ^ {M}}{a _ {0} + a _ {1} z + \cdots + a _ {N} z ^ {N}}
$$

thì các điểm không là nghiệm của $N ( z )$ và các điểm cực là nghiệm của $D ( z )$ , với điều kiện $N ( z )$ và $D ( z )$ không có nhân tử chung (nếu có thì phải giản ước trước, xem ví dụ 5.7). 

Hiển nhiên $\mathrm { R O C } \{ X ( z ) \}$ không chứa các điểm $\operatorname { c u c } ,$ và ta thấy các điểm cực giúp xây dựng lên ranh giới (là các vòng tròn có tâm tại gốc và có chứa điểm $\mathrm { c u c } )$ cho $\mathrm { R O C } \{ X ( z ) \}$ 

Ví dụ 5.6. Hãy vẽ trên mặt phẳng phức các điểm cực và điểm không của 

$$
X (z) = \frac {z ^ {2} + 2 z + 5}{(z + 3) (z - 2)}
$$

Dễ thấy $X ( z )$ có các điểm không 

$$
\begin{array}{r} z _ {0 1} = - 1 + 2 j \\ z _ {0 2} = - 1 - 2 j \end{array}
$$

và các điểm cực 

$$
\begin{array}{c} {z _ {p 1} = - 3} \\ {z _ {p 2} = 2} \end{array}
$$

Python. Các điểm không và điểm cực là nghiệm của đa thức tử số và mẫu ${ \mathrm { s } } { \acute { \hat { \mathbf { o } } } } .$ tìm được bằng hàm np.roots (tham số là vector hệ số theo lũy thừa giảm dần của z); hàm np.polymul nhân hai đa thức để có hệ số của mẫu số $( z + 3 ) ( z - 2 )$ . Kết quả: $\mathsf { z 0 } = \{ - 1 + 2 j , - 1 - 2 j \} , \mathsf { z p } = \{ - 3 , 2 \}$ 

```python
import numpy as np
z0 = np.roots([1, 2, 5])
zp = np.roots(np.polymul([1, 3], [1, -2])) 
```

(a) Tìm biến đổi z và miền hội tụ. 

Ví dụ 5.7. Cho dãy $x [ n ] = a ^ { n } \operatorname { r e c t } _ { N } [ n ] .$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/fb9a76dfa5963799b432cb428ef472285b8730855654f8673f81fe0cda99f490.jpg)



Hình 5.5. Biểu diễn các điểm không và điểm cực trên mặt phẳng phức


(b) Tìm các điểm cực, điểm không và vẽ trên mặt phẳng phức. 

Lời giải. Xuất phát từ định nghĩa của hàm dãy xung chữ nhật 

$$
\operatorname{rect} _ {N} [ n ] = \left\{ \begin{array}{l l} 1, & 0 \leq n \leq (N - 1) \\ 0, & n \text {   côn   lại } \end{array} \right.
$$

Ta tính được $X ( z )$ 

$$
\begin{array}{c} X (z) = \sum_ {n = 0} ^ {N - 1} a ^ {n} z ^ {- n} \\ = \frac {1 - a ^ {N} z ^ {- N}}{1 - a z ^ {- 1}} \\ = \frac {z ^ {N} - a ^ {N}}{(z - a) z ^ {N - 1}} \end{array}
$$

Do x[n] chiều dài hữu hạn trong đoạn $[ 0 , N - 1 ]$ nên miền hội tụ sẽ là: $| z | > 0$ 

Với $a \ne 0 \ \mathrm { v { \bar { a } } } \ N \ge 2$ , các điểm cực của X(z) chỉ gồm một điểm cực bội bậc $N - 1$ tại $\mathrm { g } \acute { \mathrm { o c } } ,$ ứng với thừa số $z ^ { N - 1 }$ ở mẫu số. Các điểm không của $X ( z )$ là $( N - 1 )$ nghiệm của phương trình $z ^ { N } = a ^ { N }$ (Lưu ý là $z = a$ vừa làm nghiệm của tử và của mẫu trong công thức trên nên nó không phải là cực, không phải là không). 

Xét trường hợp tổng quát khi a là số phức, biểu diễn dưới dạng cực: $a = r _ { 0 } e ^ { j \omega _ { 0 } }$ Khi đó phương trình trở thành 

$$
\begin{array}{c} {z ^ {N} = a ^ {N}} \\ {r ^ {N} e ^ {j N \omega} = r _ {0} ^ {N} e ^ {j N \omega_ {0}}} \end{array}
$$

Giải phương trình này ta được N nghiệm sau 

$$
\omega = \omega_ {0} + k \frac {2 \pi}{N}, \quad 0 \leq k \leq (N - 1)
$$

Loại bỏ đi nghiệm $z = a$ (tương ứng với trường hợp $k = 0 )$ , ta còn $( N - 1 )$ nghiệm là các điểm phân bố đều nhau trên vòng tròn có tâm tại $\mathrm { g } \acute { \mathrm { o c } }$ , bán kính $r _ { 0 } = | a |$ như minh họa trong hình 5.6. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/6ca1160e6297b5d0e956e52d039a76483a78210beca44cf7d3efa29b23769f94.jpg)



Hình 5.6. Các điểm cực và $( N - 1 )$ điểm không của $X ( z )$ trong ví dụ 5.7 (minh họa với $N = 6 )$


## 5.2. Các tính chất của biến đổi z

Cũng như các phép biến đổi khác, biến đổi z có các tính chất như tuyến tính, dịch thời gian, chập, đạo hàm, và các tính chất đối xứng. Các tính chất này giúp cho việc tìm biến đổi z thuận và ngược trở nên dễ dàng hơn trong nhiều trường hợp. 

## 5.2.1. Tính chất tuyến tính

Nếu có các cặp biến đổi z 

$$
\begin{array}{l} x _ {1} [ n ] \xleftrightarrow {z} X _ {1} (z) \\ x _ {2} [ n ] \xleftrightarrow {z} X _ {2} (z) \end{array}
$$

thì 

$$
a _ {1} x _ {1} [ n ] + a _ {2} x _ {2} [ n ] \xleftrightarrow {z} a _ {1} X _ {1} (z) + a _ {2} X _ {2} (z)
$$

trong đó $a _ { 1 } , a _ { 2 }$ là các hằng số. Miền hội tụ của tổ hợp tuyến tính chứa ít nhất phần giao $\mathrm { R O C } \{ X _ { 1 } ( z ) \} \cap \mathrm { R O C } \{ X _ { 2 } ( z ) \}$ , và có thể rộng hơn nếu có điểm cực bị triệt tiêu. Ví dụ, với $a \neq 0 , x _ { 1 } [ n ] = a ^ { n } u [ n ]$ và $x _ { 2 } [ n ] = a ^ { n } u [ n - 1 ]$ đều có ROC là $| z | > | a |$ nhưng $x _ { 1 } [ n ] - x _ { 2 } [ n ] = \delta [ n ]$ có ROC là toàn bộ mặt phẳng phức. 

Trong ví dụ 5.2, chúng ta có thể tính trực tiếp $X ( z )$ từ định nghĩa, hoặc, nếu viết $x [ n ]$ thành tổ hợp tuyến tính của các hàm xung đơn vị 

$$
\begin{array}{r l} & {x [ n ] = \{2, 1, 0, - 3, 7 \}} \\ & {\qquad = 2 \delta [ n + 1 ] + \delta [ n ] - 3 \delta [ n - 2 ] + 7 \delta [ n - 3 ]} \end{array}
$$

và áp dụng tính chất tuyến tính, ta có 

$$
X (z) = 2 z + 1 - 3 z ^ {- 2} + 7 z ^ {- 3}
$$

## 5.2.2. Tính chất co giãn trên miền z

$$
a ^ {n} x [ n ] \xleftrightarrow {z} X (z / a)
$$

Với $a \ne 0 ,$ nếu $\mathrm { R O C } \{ X ( z ) \}$ là $r _ { 1 } ~ < ~ | z | ~ < ~ r _ { 2 }$ thì miền hội tụ của $X ( z / a )$ là $| a | r _ { 1 } < | z | < | a | r _ { 2 }$ 

Để tính biến đổi z của dãy $a ^ { n } u [ n ]$ , ngoài cách tính trực tiếp như trong ví dụ $5 . 3 ,$ chúng ta có thể sử dụng kết quả trong ví dụ 5.1 cho dãy u[n] và áp dụng tính chất co giãn trên miền z. 

## 5.2.3. Tính chất dịch thời gian

Nếu dịch đi $n _ { 0 }$ mẫu trên miền thời gian thì 

$$
x [ n - n _ {0} ] \xleftrightarrow {z} z ^ {- n _ {0}} X (z)
$$

Miền hội tụ $\mathrm { g i } \tilde { \mathrm { u } }$ nguyên như $\mathrm { R O C } \{ X ( z ) \}$ , ngoại trừ điểm $z = 0$ hoặc $z = \infty$ có thể được thêm vào hoặc bị loại ra: khi $n _ { 0 } > 0$ , thừa số $z ^ { - n _ { 0 } }$ có thể loại $z = 0$ khỏi $\mathrm { R O C } ;$ khi $n _ { 0 } < 0$ , thừa $\mathrm { s } \acute { \hat { 0 } } ~ z ^ { - n _ { 0 } }$ có thể loại $z = \infty$ 

Ví dụ 5.8. Tìm biến $\mathrm { { \ d } \acute { o } i \ z \ v \dot { a } }$ miền hội tụ cho trường hợp 

$$
x [ n ] = (- 3) ^ {- 2 n - 1} u [ n + 2 ]
$$

Đầu tiên, chúng ta có thể viết $x [ n ]$ dưới dạng 

$$
\begin{array}{r l} x [ n ] & = - \frac {1}{3} \left(\frac {1}{9}\right) ^ {n} u [ n + 2 ] \\ & = - 2 7 \left(\frac {1}{9}\right) ^ {n + 2} u [ n + 2 ] \end{array}
$$

Trong ví dụ 5.3, ta đã biết 

$$
a ^ {n} u [ n ] \xleftrightarrow {z} \frac {1}{1 - a z ^ {- 1}}, \quad | z | > | a |
$$

$\mathrm { { \acute { A } p } }$ dụng tính chất dịch thời gian và tính chất tuyến tính ta có 

$$
x [ n ] \stackrel {z} {\longleftrightarrow} - 2 7 z ^ {2} \frac {1}{1 - \frac {1}{9} z ^ {- 1}}
$$

Miền hội tụ $\mathrm { R O C } \{ X ( z ) \}$ là 

$$
\frac {1}{9} <   | z | <   \infty
$$

Lưu $\acute { \mathrm { y } }$ là do dãy $x [ n ]$ có chứa các mẫu nằm bên trái $\mathrm { g } \acute { \mathrm { o c } }$ nên miền hội tụ của $X ( z )$ sẽ không chứa $\infty .$ 

## 5.2.4. Tính chất đảo thời gian

$$
x [ - n ] \xleftrightarrow {z} X (1 / z)
$$

Nếu $\mathrm { R O C } \{ X ( z ) \}$ là $r _ { 1 } < | z | < r _ { 2 }$ thì miền hội tụ của $X ( 1 / z )$ là $\begin{array} { r } { \frac { 1 } { r _ { 2 } } < | z | < \frac { 1 } { r _ { 1 } } } \end{array}$ 

Xét biến đổi z của dãy $- a ^ { n } u [ - n - 1 ]$ như trong ví dụ 5.4. Ta có thể biểu diễn dãy này về dạng 

$$
- a ^ {n} u [ - n - 1 ] = - \frac {1}{a} \left(\frac {1}{a}\right) ^ {- (n + 1)} u [ - (n + 1) ]
$$

Sử dụng kết quả biến đổi z của dãy $a ^ { n } u [ n ]$ như trong ví dụ 5.3, và áp dụng tính chất đảo thời gian, sau đó là tính chất dịch thời gian, ta có 

$$
\begin{array}{c} - a ^ {n} u [ - n - 1 ] \xleftrightarrow {z} - \frac {1}{a} z \frac {1}{1 - a ^ {- 1} z}, \quad | z ^ {- 1} | > | a ^ {- 1} | \\ \xleftrightarrow {z} \frac {1}{1 - a z ^ {- 1}}, \quad | z | <   | a | \end{array}
$$

Miền hội tụ $\mathrm { R O C } \{ X ( z ) \}$ là: $| z | <$ |<sup>a</sup>| 

## 5.2.5. Tính chất liên hợp phức

$$
x ^ {*} [ n ] \xleftrightarrow {z} X ^ {*} (z ^ {*})
$$

Miền hội tụ không thay đổi. 

## 5.2.6. Tính chất chập

Nếu hai tín hiệu chập với nhau trên miền thời gian thì sẽ nhân với nhau trên miền z. 

$$
x _ {1} [ n ] * x _ {2} [ n ] \xleftrightarrow {z} X _ {1} (z) X _ {2} (z)
$$

Miền hội tụ của $X _ { 1 } ( z ) X _ { 2 } ( z )$ chứa ít nhất phần giao $\operatorname { R O C } \{ X _ { 1 } ( z ) \} \cap \operatorname { R O C } \{ X _ { 2 } ( z ) \}$ 2 và có thể rộng hơn nếu điểm cực của thừa số này bị triệt tiêu bởi điểm không của thừa số kia. 

## 5.2.7. Đạo hàm trên miền z

$$
n x [ n ] \xleftrightarrow {z} - z \frac {d X (z)}{d z}
$$

Miền hội tụ giữ nguyên như $\mathrm { R O C } \{ X ( z ) \}$ 

Các tính chất trên được tóm tắt trong bảng 5.1. 


Bảng 5.1. Các tính chất của biến đổi z


<table><tr><td>Tính chất</td><td><eq>x[n]</eq></td><td><eq>X(z)</eq></td><td>Miền hội tụ</td></tr><tr><td>Tuyến tính</td><td><eq>a_{1}x_{1}[n]+a_{2}x_{2}[n]</eq></td><td><eq>a_{1}X_{1}(z)+a_{2}X_{2}(z)</eq></td><td>Chữa ROC<eq>\{X_{1}(z)\}\cap</eq>ROC<eq>\{X_{2}(z)\}</eq>, có thể rộng hơn nếu có điểm cực bị triệt tiêu</td></tr><tr><td>Dịch thời gian</td><td><eq>x[n-n_{0}]</eq></td><td><eq>z^{-n_{0}}X(z)</eq></td><td>Như ROC<eq>\{X(z)\}</eq>, có thể thêm vào hoặc loại ra <eq>z=0</eq> hoặc <eq>z=\infty</eq></td></tr><tr><td>Co giãn trên miền <eq>z</eq></td><td><eq>a^{n}x[n], a\neq 0</eq></td><td><eq>X(z/a)</eq></td><td><eq>|a|r_{1}&lt;|z|&lt;|a|r_{2}</eq></td></tr><tr><td>Đảo thời gian</td><td><eq>x[-n]</eq></td><td><eq>X(1/z)</eq></td><td><eq>\frac{1}{r_{2}}&lt;|z|&lt;\frac{1}{r_{1}}</eq></td></tr><tr><td>Liên hợp phúc</td><td><eq>x^{*}[n]</eq></td><td><eq>X^{*}(z^{*})</eq></td><td>Không đổi</td></tr><tr><td>Chập</td><td><eq>x_{1}[n]*x_{2}[n]</eq></td><td><eq>X_{1}(z)X_{2}(z)</eq></td><td>Chữa ROC<eq>\{X_{1}(z)\}\cap</eq>ROC<eq>\{X_{2}(z)\}</eq>, có thể rộng hơn nếu có điểm cực bị triệt tiêu</td></tr><tr><td>Đạo hàm trên miền <eq>z</eq></td><td><eq>nx[n]</eq></td><td><eq>-z\frac{dX(z)}{dz}</eq></td><td>Không đổi</td></tr></table>


Giả thiết ROC{X(z)} là $r _ { 1 } < | z | < r _ { 2 }$ 


## 5.3. Biến đổi z ngược

Xuất phát từ mối quan hệ giữa biến đổi z và biến đổi Fourier trong (5.3), áp dụng biến đổi Fourier ngược 

$$
x [ n ] r ^ {- n} = \frac {1}{2 \pi} \int_ {2 \pi} X (r e ^ {j \omega}) e ^ {j \omega n} d \omega
$$

Nhân hai vế với $r ^ { n }$ và đổi biến $z = r e ^ { j \omega }$ . Khi ω chạy hết một chu kỳ $2 \pi$ , điểm z chạy một vòng trên đường tròn bán kính r (nằm trong ROC) theo chiều ngược chiều kim đồng hồ, và $d z = j r e ^ { j \omega } d \omega = j z d \omega$ . Như vậy ta có: 

$$
x [ n ] = \frac {1}{2 \pi} \int_ {2 \pi} X (r e ^ {j \omega}) \left(r e ^ {j \omega}\right) ^ {n} d \omega = \frac {1}{2 \pi j} \oint_ {\mathcal {C}} X (z) z ^ {n - 1} d z
$$

trong đó,  là đường cong khép kín nằm trong $\mathrm { R O C } \{ X ( z ) \}$ , bao quanh gốc tọa độ, và có chiều ngược chiều kim đồng hồ. 

Trên thực $\mathrm { t } \acute { \hat { \mathrm { e } } } ,$ người ta có một $\mathrm { s } \acute { \hat { \mathrm { o } } }$ phương pháp biến đổi z ngược đơn giản và hiệu quả hơn như: khai triển thành chuỗi lũy thừa và khai triển thành các phân thức tối giản. 

## 5.3.1. Phương pháp khai triển thành chuỗi lũy thừa

$$
X (z) = \sum_ {n = - \infty} ^ {\infty} c _ {n} z ^ {- n}
$$

Cho trước $X ( z )$ và ROC, khai triển $X ( z )$ thành chuỗi lũy thừa có dạng 

hội tụ trong ROC đã cho. Khi đó, $x [ n ] = c _ { n } , \forall n$ 

Trong trường hợp $X ( z )$ là hàm hữu $\mathrm { t { \overset { \cdot } { y } } , }$ ta có thể dễ dàng khai triển bằng cách thực hiện phép chia đa thức đơn giản như ở ví dụ sau. 

Ví dụ 5.9. Tìm biến $\mathrm { d } \mathrm { \AA } ^ { 2 } \mathrm { i } \ z \ \mathrm { n g u g c }$ của 

$$
X (z) = \frac {1 + 2 z ^ {- 1}}{1 - 2 z ^ {- 1} + z ^ {- 2}}
$$

cho các trường hợp sau: 

a. x[n] là dãy nhân quả 

b. x[n] là dãy phản nhân quả 

Lời giải. Mẫu số của $X ( z ) \mathrm { l } \mathrm { \hat { a } } ( 1 - z ^ { - 1 } ) ^ { 2 }$ , nên $X ( z )$ có một điểm cực kép tại $z = 1$ Do đó chỉ có hai khả năng cho miền hội $\mathrm { t u } \colon | z | > 1$ ứng với dãy nhân quả, và $| z | < 1$ ứng với dãy phản nhân quả. 

a. Với $| z | > 1$ , ta cần khai triển $X ( z )$ theo lũy thừa tăng của $z ^ { - 1 }$ . Thực hiện phép chia tử số cho mẫu số, mỗi bước giữ lại số hạng có lũy thừa thấp nhất của $z ^ { - 1 }$ 

$$
1 + 2 z ^ {- 1} = (1 - 2 z ^ {- 1} + z ^ {- 2}) \cdot 1 + (4 z ^ {- 1} - z ^ {- 2})
$$

$$
4 z ^ {- 1} - z ^ {- 2} = (1 - 2 z ^ {- 1} + z ^ {- 2}) \cdot 4 z ^ {- 1} + (7 z ^ {- 2} - 4 z ^ {- 3})
$$

$$
7 z ^ {- 2} - 4 z ^ {- 3} = (1 - 2 z ^ {- 1} + z ^ {- 2}) \cdot 7 z ^ {- 2} + (1 0 z ^ {- 3} - 7 z ^ {- 4})
$$

Như $\mathrm { v } \mathrm { \hat { a } \mathrm { y } }$ 

$$
X (z) = 1 + 4 z ^ {- 1} + 7 z ^ {- 2} + 1 0 z ^ {- 3} + \dots
$$

Các hệ số tăng đều 3 đơn vị sau mỗi bước, gợi $\acute { \mathrm { ~ y ~ } } x [ n ] = 3 n + 1$ với $n \geq 0$ . Có thể kiểm chứng điều này bằng khai triển $\begin{array} { r } { { \frac { 1 } { ( 1 - z ^ { - 1 } ) ^ { 2 } } } = \sum _ { n = 0 } ^ { \infty } ( n + 1 ) z ^ { - n } ~ \mathrm { ( h ) } } \end{array}$ tụ khi $| z | > 1 )$ : hệ số của $z ^ { - n }$ trong $\textstyle ( 1 + 2 z ^ { - 1 } ) \sum _ { n = 0 } ^ { \infty } ( n + 1 ) z ^ { - n }$ là $( n + 1 ) + 2 n = 3 n + 1$ $\mathrm { V a y }$ 

$$
x [ n ] = (3 n + 1) u [ n ]
$$

b. Với $| z | < 1$ , ta cần khai triển $X ( z )$ theo lũy thừa tăng của z. Nhân cả tử và mẫu với $z ^ { 2 } { \mathrm { : } }$ 2 

$$
X (z) = \frac {2 z + z ^ {2}}{1 - 2 z + z ^ {2}}
$$

rồi thực hiện phép chia theo lũy thừa tăng của z: 

$$
2 z + z ^ {2} = (1 - 2 z + z ^ {2}) \cdot 2 z + (5 z ^ {2} - 2 z ^ {3})
$$

$$
5 z ^ {2} - 2 z ^ {3} = (1 - 2 z + z ^ {2}) \cdot 5 z ^ {2} + (8 z ^ {3} - 5 z ^ {4})
$$

Như vậy 

$$
X (z) = 2 z + 5 z ^ {2} + 8 z ^ {3} + \dots = \sum_ {k = 1} ^ {\infty} (3 k - 1) z ^ {k}
$$

Hệ số của $z ^ { k }$ chính là $x [ - k ]$ , nên $x [ n ] = 3 ( - n ) - 1 = - ( 3 n + 1 )$ với $n \leq - 1$ . Vậy 

$$
x [ n ] = - (3 n + 1) u [ - n - 1 ]
$$

Cũng như trong ví dụ 5.3 và ví dụ $5 . 4 .$ cùng một biểu thức $X ( z )$ nhưng với các miền hội tụ khác nhau sẽ cho các dãy x[n] khác nhau.  

## 5.3.2. Khai triển thành các phân thức tối giản

Xét trường hợp $X ( z )$ là một hàm hữu $\mathrm { t \vec { y } }$ 

$$
X (z) = \frac {N (z)}{D (z)} = \frac {b _ {0} + b _ {1} z + \cdots + b _ {M} z ^ {M}}{a _ {0} + a _ {1} z + \cdots + a _ {N} z ^ {N}}
$$

Chúng ta sẽ khai triển $X ( z )$ thành các phân thức tối giản, tùy theo các trường hợp $X ( z )$ có điểm cực đơn hay có điểm cực bội. 

## 5.3.2.1. Trường hợp điểm cực đơn. Nếu $M < N$ , khai triển $X ( z )$ về dạng

$$
X (z) = \sum_ {k = 1} ^ {N} \frac {A _ {k}}{z - z _ {p k}}
$$

trong đó $z _ { p k }$ là các cực đơn của X(z) và 

$$
A _ {k} = (z - z _ {p k}) X (z) | _ {z = z _ {p k}}
$$

Nếu $M \geq N$ thì chia đa thức: $\begin{array} { r } { X ( z ) = G ( z ) + \frac { N ^ { \prime } ( z ) } { D ( z ) } } \end{array}$ trong đó $N ^ { \prime } ( z )$ có bậc $M ^ { \prime } < N$ 

Ví dụ 5.10. Hãy phân tích $X ( z )$ thành các phân thức tối giản 

$$
X (z) = \frac {3 z - 2}{z ^ {2} + z - 2}
$$

Dễ thấy $X ( z )$ có các điểm cực là 2 và 1. Khi đó biểu diễn $X ( z )$ thành các phân thức tối giản có dạng sau 

$$
X (z) = \frac {A}{z + 2} + \frac {B}{z - 1}\tag{5.8}
$$

Chúng ta có thể tìm $A , B$ theo hai cách. Đơn giản nhất là thực hiện quy đồng mẫu số và đồng nhất hệ số ở tử 

$$
X (z) = \frac {(A + B) z + (- A + 2 B)}{(z + 2) (z - 1)} = \frac {3 z - 2}{z ^ {2} + z - 2}
$$

ta có hệ phương trình sau 

$$
\left\{ \begin{array}{r l} A + B & = 3 \\ - A + 2 B & = - 2 \end{array} \right.
$$

Giải hệ phương trình trên chúng ta sẽ tìm được các nghiệm $\begin{array} { r } { A = \frac { 8 } { 3 } } \end{array}$ và $\begin{array} { r } { B = \frac { 1 } { 3 } } \end{array}$ 

Ngoài ra, nếu nhân cả hai vế của (5.8) với (z + 2) thì ta có thể tìm được A 

$$
\begin{array}{r l} & A = (z + 2) X (z) | _ {z = - 2} \\ & \quad = \frac {3 z - 2}{z - 1} \bigg | _ {z = - 2} \\ & \quad = \frac {8}{3} \end{array}
$$

Tương tự, ta cũng tìm được B 

$$
\begin{array}{c} B = (z - 1) X (z) | _ {z = 1} \\ = \left. \frac {3 z - 2}{z + 2} \right| _ {z = 1} \\ = \frac {1}{3} \end{array}
$$

Sau khi đã phân tích $X ( z )$ thành các phân thức tối giản, công việc tiếp theo sẽ là tìm biến đổi ngược của mỗi phân thức tối giản có dạng tổng quát $\scriptstyle { \frac { 1 } { z - a } }$ . Ta nhận thấy, 

$$
\frac {1}{z - a} = z ^ {- 1} \frac {1}{1 - a z ^ {- 1}}
$$

Từ ví dụ 5.3 và ví dụ 5.4, ta có biến đổi z ngược của $\scriptstyle { \frac { 1 } { 1 - a z ^ { - 1 } } }$ là 

$$
\frac {1}{1 - a z ^ {- 1}} \xrightarrow {z ^ {- 1}} \left\{ \begin{array}{l l} a ^ {n} u [ n ], & | z | > | a | \\ - a ^ {n} u [ - n - 1 ], & | z | <   | a | \end{array} \right.\tag{5.9}
$$

$\mathrm { { \acute { A } p } }$ dụng tính chất dịch thời gian, ta tìm được biến đổi z ngược của $\scriptstyle { \frac { 1 } { z - a } }$ 

$$
\frac {1}{z - a} \xrightarrow {z ^ {- 1}} \left\{ \begin{array}{l l} a ^ {n - 1} u [ n - 1 ], & | z | > | a | \\ - a ^ {n - 1} u [ - n ], & | z | <   | a | \end{array} \right.\tag{5.10}
$$

Như $\mathrm { v a y , }$ với $X ( z )$ đã được phân tích thành các phân thức tối giản trong ví dụ 5.10, ta có thể tìm được các trường hợp khác nhau của $x [ n ]$ tùy theo miền hội tụ như sau 

$$
x [ n ] = \left\{ \begin{array}{l l} \frac {8}{3} (- 2) ^ {n - 1} u [ n - 1 ] + \frac {1}{3} u [ n - 1 ], & | z | > 2 \\ - \frac {8}{3} (- 2) ^ {n - 1} u [ - n ] + \frac {1}{3} u [ n - 1 ], & 1 <   | z | <   2 \\ - \frac {8}{3} (- 2) ^ {n - 1} u [ - n ] - \frac {1}{3} u [ - n ], & | z | <   1 \end{array} \right.
$$

5.3.2.2. Trường hợp điểm cực $b \hat { O } i .$ . Trong trường hợp $X ( z )$ có điểm cực bội $z = a$ bậc $m ,$ , khai triển của $X ( z )$ phải chứa các phân thức tối giản sau 

$$
\frac {A _ {1}}{z - a} + \frac {A _ {2}}{(z - a) ^ {2}} + \dots + \frac {A _ {m}}{(z - a) ^ {m}}
$$

Xét đa thức sau: 

$$
(z - a) ^ {m} X (z) = A _ {1} (z - a) ^ {m - 1} + \dots + A _ {m - 2} (z - a) ^ {2} + A _ {m - 1} (z - a) + A _ {m}
$$

Ta có thể tính được $A _ { m }$ khi xét giá trị của đa thức trên tại $z = a$ 

$$
A _ {m} = (z - a) ^ {m} X (z) | _ {z = a}
$$

Tiếp theo, ta có thể tính được $A _ { m - i }$ từ đạo hàm bậc i của đa thức này 

$$
A _ {m - 1} = \left. \frac {d}{d z} (z - a) ^ {m} X (z) \right| _ {z = a}
$$

$$
A _ {m - i} = \left. \frac {1}{i !} \frac {d ^ {i}}{d z ^ {i}} (z - a) ^ {m} X (z) \right| _ {z = a}
$$

Bây giờ chúng ta cần thực hiện biến đổi z ngược cho các phân thức tối giản $\frac { 1 } { ( z - a ) ^ { m } }$ $\mathrm { \acute { O } }$ ví dụ trước, ta đã có biến đổi ngược của $\scriptstyle { \frac { 1 } { z - a } }$ (xem công thức (5.10)). Ta có thể biến đổi $\frac { 1 } { ( z - a ) ^ { 2 } }$ như sau 

$$
{\frac {1}{(z - a) ^ {2}}} = - {\frac {d}{d z}} {\frac {1}{z - a}} = z ^ {- 1} \left[ - z {\frac {d}{d z}} {\frac {1}{z - a}} \right]
$$

Áp dụng lần lượt tính chất đạo hàm trên miền z và tính chất dịch theo thời gian, ta tìm được biến đổi ngược của phân thức $\scriptstyle { \frac { 1 } { ( z - a ) ^ { 2 } } } :$ 

$$
\frac {1}{(z - a) ^ {2}} \xrightarrow {z ^ {- 1}} \left\{ \begin{array}{l l} (n - 1) a ^ {n - 2} u [ n - 2 ], & | z | > | a | \\ - (n - 1) a ^ {n - 2} u [ - n + 1 ], & | z | <   | a | \end{array} \right.\tag{5.11}
$$

Với cùng cách tiếp cận này, bạn đọc có thể tiếp tục tìm được biến đổi ngược của $\begin{array} { r } { \frac { 1 } { ( z - a ) ^ { 3 } } , \frac { 1 } { ( z - a ) ^ { 4 } } , } \end{array}$ 

Ví dụ 5.11. Tìm biến đổi z ngược của 

$$
X (z) = \frac {z}{(z - 2) ^ {2} (z + 1)}
$$

Lời giải. Phân tích $X ( z )$ thành các phân thức tối giản: 

$$
X (z) = \frac {A}{z + 1} + \frac {B}{z - 2} + \frac {C}{(z - 2) ^ {2}}
$$

trong đó, 

$$
A = (z + 1) X (z) | _ {z = - 1} = \left. \frac {z}{(z - 2) ^ {2}} \right| _ {z = - 1} = - \frac {1}{9}
$$

$$
C = (z - 2) ^ {2} X (z) \big | _ {z = 2} = \frac {z}{z + 1} \Big | _ {z = 2} = \frac {2}{3}
$$

$$
B = \left. \frac {d}{d z} (z - 2) ^ {2} X (z) \right| _ {z = 2} = \left. \frac {d}{d z} \frac {z}{z + 1} \right| _ {z = 2} = \frac {1}{9}
$$

Tiếp theo, ta sẽ tìm được x[n] tùy theo miền hội tụ như sau: 

$$
x [ n ] = \left\{ \begin{array}{l l} - \frac {1}{9} (- 1) ^ {n - 1} u [ n - 1 ] + \frac {1}{9} 2 ^ {n - 1} u [ n - 1 ] + \frac {2}{3} (n - 1) 2 ^ {n - 2} u [ n - 2 ], & | z | > 2 \\ - \frac {1}{9} (- 1) ^ {n - 1} u [ n - 1 ] - \frac {1}{9} 2 ^ {n - 1} u [ - n ] - \frac {2}{3} (n - 1) 2 ^ {n - 2} u [ - n + 1 ], & 1 <   | z | <   2 \\ \frac {1}{9} (- 1) ^ {n - 1} u [ - n ] - \frac {1}{9} 2 ^ {n - 1} u [ - n ] - \frac {2}{3} (n - 1) 2 ^ {n - 2} u [ - n + 1 ], & | z | <   1 \end{array} \right.
$$

5.3.2.3. Trường hợp điểm cực phức. Lưu $\acute { \mathrm { y } }$ rằng các công thức cho trường hợp điểm cực đơn và điểm cực bội trình bày ở trên đúng cho cả trường hợp điểm cực phức. Ta có thể hoàn toàn thực hiện các khâu phân tích thành phân thức tối $\mathrm { { g i a n } . }$ , rồi dựa trên những cặp biến đổi z đã biết để tìm ra $x [ n ]$ tương ứng với những miền hội tụ khác nhau. 

Nếu $X ( z )$ là hàm hữu $\mathrm { t \vec { y } }$ với các đa thức có hệ số thực thì các điểm cực phức luôn đi theo cặp liên hợp phức. Khi đó ta cũng có thể rút gọn được công thức cho x[n]. 

Ví dụ 5.12. Cho 

$$
X (z) = \frac {1}{z ^ {2} + a ^ {2}}
$$

với a là số thực khác 0. Hãy tìm $x [ n ]$ ứng với các miền hội tụ có $\mathrm { t h } \mathring { \mathrm { e } }$ có. 

Lời giải. $X ( z )$ có hai điểm cực liên hợp phức $z _ { p 1 } = j a$ và $z _ { p 2 } = - j a ,$ cùng nằm trên vòng tròn bán kính $| a |$ . Do đó chỉ có hai khả năng cho miền hội tụ: $| z | > | a |$ và $| z | < | a |$ 

Phân tích $X ( z )$ thành các phân thức tối giản 

$$
X (z) = \frac {A}{z - j a} + \frac {B}{z + j a}
$$

trong đó 

$$
A = (z - j a) X (z) | _ {z = j a} = \frac {1}{2 j a}, \qquad B = (z + j a) X (z) | _ {z = - j a} = - \frac {1}{2 j a} = A ^ {*}
$$

Với $| z | > | a |$ , áp dụng (5.10) cho từng phân thức, ta có 

$$
x [ n ] = \left[ A (j a) ^ {n - 1} + A ^ {*} (- j a) ^ {n - 1} \right] u [ n - 1 ] = 2 \operatorname{Re} \left\{A (j a) ^ {n - 1} \right\} u [ n - 1 ]
$$

Do $A ( j a ) ^ { n - 1 } = { \textstyle { \frac { 1 } { 2 j a } } } j ^ { n - 1 } a ^ { n - 1 } = { \textstyle { \frac { 1 } { 2 } } } a ^ { n - 2 } j ^ { n - 2 } = { \textstyle { \frac { 1 } { 2 } } } a ^ { n - 2 } e ^ { j { \textstyle { \frac { ( n - 2 ) \pi } { 2 } } } }$ , nên 

$$
x [ n ] = a ^ {n - 2} \cos {\frac {(n - 2) \pi}{2}} u [ n - 1 ]
$$

tức là $x [ n ] = \{ 0 , 0 , 1 , 0 , - a ^ { 2 } , 0 , a ^ { 4 } , \ldots \}$ . Có thể kiểm tra lại bằng khai triển thành 1 chuỗi lũy thừa (hội tụ khi $| z | > | a | )$ 

$$
X (z) = \frac {z ^ {- 2}}{1 + a ^ {2} z ^ {- 2}} = z ^ {- 2} - a ^ {2} z ^ {- 4} + a ^ {4} z ^ {- 6} - \dots
$$

Tương tự, với $| z | < | a |$ ta có 

$$
x [ n ] = - \left[ A (j a) ^ {n - 1} + A ^ {*} (- j a) ^ {n - 1} \right] u [ - n ] = - a ^ {n - 2} \cos {\frac {(n - 2) \pi}{2}} u [ - n ]
$$

Cách làm trên áp dụng được cho mọi cặp điểm cực liên hợp phức. Nếu khai triển của $X ( z )$ chứa cặp phân thức $\begin{array} { r } { \frac { A } { z - p } + \frac { \dot { A } ^ { * } } { z - p ^ { * } } } \end{array}$ với $p = r e ^ { j \theta } { \mathrm {  ~ \ v a ~ } } A = | A | e ^ { j \varphi }$ , thì do $A p ^ { n - 1 } + A ^ { * } ( p ^ { * } ) ^ { n - 1 } = 2 \operatorname { R e } \{ A p ^ { n - 1 } \}$ , cặp phân thức này ứng với 

$$
\frac {A}{z - p} + \frac {A ^ {*}}{z - p ^ {*}} \xrightarrow {z ^ {- 1}} \left\{ \begin{array}{l l} 2 | A |   r ^ {n - 1} \cos \left((n - 1) \theta + \varphi\right) u [ n - 1 ], & | z | > r \\ - 2 | A |   r ^ {n - 1} \cos \left((n - 1) \theta + \varphi\right) u [ - n ], & | z | <   r \end{array} \right.\tag{5.12}
$$

Các thành phần của x[n] ứng với cặp điểm cực phức vì vậy là các dao động hình sin với biên độ thay đổi theo $r ^ { n }$  

Bảng 5.2 tổng hợp các cặp biến đổi z thông dụng. 


Bảng 5.2. Các cặp biến đổi z thông dụng $( p = r e ^ { j \theta }$ $A = | A | e ^ { j \varphi } )$


<table><tr><td>x[n]</td><td>X(z)</td><td>Miền hội tụ</td></tr><tr><td>δ[n]</td><td>1</td><td>Toàn bộ mặt phẳng phúc</td></tr><tr><td>u[n]</td><td><eq>\frac{1}{1 - z^{-1}}</eq></td><td>|z| &gt; 1</td></tr><tr><td>-u[-n-1]</td><td><eq>\frac{1}{1 - z^{-1}}</eq></td><td>|z| &lt; 1</td></tr><tr><td>an u[n]</td><td><eq>\frac{1}{1 - az^{-1}}</eq></td><td>|z| &gt; |a|</td></tr><tr><td>-a^n u[-n-1]</td><td><eq>\frac{1}{1 - az^{-1}}</eq></td><td>|z| &lt; |a|</td></tr><tr><td>na^n u[n]</td><td><eq>\frac{az^{-1}}{(1 - az^{-1})^2}</eq></td><td>|z| &gt; |a|</td></tr><tr><td>-na^n u[-n-1]</td><td><eq>\frac{az^{-1}}{(1 - az^{-1})^2}</eq></td><td>|z| &lt; |a|</td></tr><tr><td>an rectN[n]</td><td><eq>\frac{1 - a^{N} z^{-N}}{1 - az^{-1}}</eq></td><td>|z| &gt; 0</td></tr><tr><td>cos(ω0n) u[n]</td><td><eq>\frac{1 - \cos \omega_0 z^{-1}}{1 - 2 \cos \omega_0 z^{-1} + z^{-2}}</eq></td><td>|z| &gt; 1</td></tr><tr><td>sin(ω0n) u[n]</td><td><eq>\frac{\sin \omega_0 z^{-1}}{1 - 2 \cos \omega_0 z^{-1} + z^{-2}}</eq></td><td>|z| &gt; 1</td></tr><tr><td>an-1u[n-1]</td><td><eq>\frac{1}{z - a}</eq></td><td>|z| &gt; |a|</td></tr><tr><td>-an-1u[-n]</td><td><eq>\frac{1}{z - a}</eq></td><td>|z| &lt; |a|</td></tr><tr><td>(n-1)an-2u[n-2]</td><td><eq>\frac{1}{(z - a)^2}</eq></td><td>|z| &gt; |a|</td></tr><tr><td>-(n-1)an-2u[-n+1]</td><td><eq>\frac{1}{(z - a)^2}</eq></td><td>|z| &lt; |a|</td></tr><tr><td>2|A|r^n-1cos((n-1)θ+φ)u[n-1]</td><td><eq>\frac{A}{z - p} + \frac{A^*}{z - p^*}</eq></td><td>|z| &gt; r</td></tr><tr><td>-2|A|r^n-1cos((n-1)θ+φ)u[-n]</td><td><eq>\frac{A}{z - p} + \frac{A^*}{z - p^*}</eq></td><td>|z| &lt; r</td></tr></table>

## 5.4. Phân tích hệ thống trên miền z

Xét một hệ thống LTI với đáp ứng xung h[n], với đầu vào x[n], đầu ra y[n]. 

$$
y [ n ] = x [ n ] * h [ n ]
$$

Thực hiện biến đổi z cả hai vế, áp dụng tính chất chập, ta có 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/965a5cea5353cf0a3b8c26fb67eff7bcc5009ee9ac09f6bab71c17ef91304e84.jpg)



Hình 5.7. Hàm truyền của hệ thống


Ta thấy, mối quan hệ vào / ra của hệ thống thể hiện qua phép chập trên miền thời gian đã biến thành phép nhân (đơn giản hơn rất nhiều) trên miền z. Đại lượng H(z), biến đổi z của đáp ứng xung $h [ n ]$ , được gọi là hàm truyền<sup>1</sup> của hệ thống (xem hình 5.7). 

Hàm truyền là một công cụ hữu hiệu giúp phân tích hệ thống. Hình 5.8 biểu diễn mối liên hệ giữa $H ( z )$ với các đặc trưng của hệ thống LTI. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/1a842c2f0891991417fe8df9552f0cc7c75b3ae6b0925159909f14a4d63d48dc.jpg)



Hình 5.8. Vai trò trung tâm của hàm truyền H(z) trong một hệ thống LTI


Dễ thấy, hai mối liên hệ giữa $H ( z )$ và $h [ n ]$ chính là cặp biến đổi z (thuận / ngược) mà chúng ta đã tìm hiểu ở các phần trước. Lưu ý thêm, các hệ thống xử lý theo thời gian thực phải nhân quả, khi đó có thêm điều kiện: $h [ n ] = 0 ;$ $\forall n < 0$ Khi xử lý ngoại tuyến (ví dụ xử lý ảnh, hoặc dữ liệu đã ghi sẵn), hệ thống không nhất thiết phải nhân quả. 

Còn mối liên hệ giữa đáp ứng tần số $H ( e ^ { j \omega } )$ và hàm truyền $H ( z )$ thể hiện qua công thức 

$$
H (e ^ {j \omega}) = H (z) | _ {z = e ^ {j \omega}}
$$

Công thức này chỉ áp dụng được khi vòng tròn đơn vị nằm trong $\mathrm { R O C } \{ H ( z ) \}$ , tức là khi hệ thống ổn định (xem phần tính ổn định dưới $\mathrm { \hat { d a y } ) }$ . 

## 5.4.1. Hàm truyền và phương trình sai phân

Hệ thống LTI được biểu diễn bởi phương trình sai phân tuyến tính hệ số hằng 

$$
y [ n ] = - \sum_ {k = 1} ^ {N} a _ {k} y [ n - k ] + \sum_ {r = 0} ^ {M} b _ {r} x [ n - r ]
$$

Biến $\mathrm { \ d } \mathrm { \acute { o } i \ z \ c a }$ hai vế, rút gọn 

$$
H (z) = \frac {B (z)}{A (z)}, \qquad B (z) := \sum_ {r = 0} ^ {M} b _ {r} z ^ {- r}, \qquad A (z) := 1 + \sum_ {k = 1} ^ {N} a _ {k} z ^ {- k}
$$

Khi $H ( z )$ là một hàm hữu $\mathrm { t { \vec { y } } , }$ với các điểm không và cực tương ứng là nghiệm của tử số $B ( z )$ và mẫu số $A ( z )$ , ta có thể phân loại hệ thống cực - không (pole-zero system): 

Nếu $a _ { k } = 0 , \quad 1 \leq k \leq N \to$ hệ thống FIR gồm toàn điểm không và một điểm cực bội bậc M tầm thường tại $\mathrm { g } \acute { \mathrm { o c } }$ 

Nếu $b _ { r } = 0 , \quad 1 \leq r \leq M \to$ hệ thống toàn cực (all-pole system), là hệ thống IIR có một điểm không bội bậc N tầm thường tại gốc. 

Khi $a _ { N } \neq 0 , b _ { M } \neq 0$ và $B ( z ) , A ( z )$ không có nghiệm chung, nhân cả tử và mẫu của $H ( z )$ với $z ^ { \operatorname* { m a x } ( M , N ) }$ ta được một hàm hữu $\mathrm { t \vec { y } }$ theo biến z có đúng $\operatorname* { m a x } ( M , N )$ điểm cực (kể cả các điểm cực tại gốc). Số này chính là bậc của hệ thống (định nghĩa 3.1). Ví dụ, hệ thống $y [ n ] - y [ n - 1 ] = x [ n ] - x [ n - 4 ]$ ở mục 2.5.2 có 

$$
H (z) = \frac {1 - z ^ {- 4}}{1 - z ^ {- 1}} = 1 + z ^ {- 1} + z ^ {- 2} + z ^ {- 3} = \frac {z ^ {3} + z ^ {2} + z + 1}{z ^ {3}}
$$

điểm cực $z = 1$ của mẫu $\mathrm { s } \acute { \hat { \mathrm { o } } }$ bị triệt tiêu bởi điểm không $z = 1$ của tử $\mathrm { s } \acute { \hat { \mathrm { o } } }$ , nên hệ thống là FIR, có bậc 3 (ba điểm cực tại $\mathrm { g } \acute { \mathrm { o c } } )$ 

Ví dụ 5.13. Cho hệ thống LTI được biểu diễn bởi phương trình sai phân sau 

$$
y [ n ] = 2 x [ n ] - 5 x [ n - 1 ] - 3 y [ n - 1 ] + 4 y [ n - 2 ]
$$

Biến đổi z cả hai vế, áp dụng tính chất tuyến tính và dịch theo thời gian, ta được 

$$
Y (z) = 2 X (z) - 5 z ^ {- 1} X (z) - 3 z ^ {- 1} Y (z) + 4 z ^ {- 2} Y (z)
$$

Do đó 

$$
\begin{array}{r} Y (z) + 3 z ^ {- 1} Y (z) - 4 z ^ {- 2} Y (z) = 2 X (z) - 5 z ^ {- 1} X (z) \\ Y (z) (1 + 3 z ^ {- 1} - 4 z ^ {- 2}) = X (z) (2 - 5 z ^ {- 1}) \end{array}
$$

Ta có $\mathrm { t h } \mathring { \mathrm { e } }$ tìm được hàm truyền của hệ thống 

$$
H (z) = \frac {Y (z)}{X (z)} = \frac {2 - 5 z ^ {- 1}}{1 + 3 z ^ {- 1} - 4 z ^ {- 2}}\tag{5.13}
$$

Thay $z = e ^ { j \omega }$ vào $H ( z )$ , ta có đáp ứng tần số $H ( e ^ { j \omega } )$ của hệ thống. Để tìm đáp ứng xung $h [ n ]$ , ta thực hiện biến $\mathrm { d } \mathrm { \AA } ^ { 2 } \mathrm { i } \ z \ \mathrm { n g u g c }$ bằng phương pháp phân tích thành các phân thức tối giản, theo hai cách sau. 

Từ hàm truyền $H ( z )$ là hàm hữu $\mathrm { t \vec { y } }$ của biến $z ^ { - 1 }$ trong (5.13), ta chuyển thành hàm hữu $\mathrm { t \vec { y } }$ theo biến z bằng cách nhân cả tử và mẫu với $z ^ { 2 } ;$ : 

$$
H (z) = \frac {2 z ^ {2} - 5 z}{z ^ {2} + 3 z - 4}\tag{5.14}
$$

Phân tích $H ( z )$ thành các phân thức tối giản 

$$
H (z) = 2 + \frac {- 1 0 . 4}{z + 4} + \frac {- 0 . 6}{z - 1}
$$

Python. Quá trình phân tích $H ( z )$ thành các phân thức tối giản theo biến z ở trên có thể được thực hiện trên Python bằng hàm residue trong mô-đun scipy.signal, với hai tham số là các vector hệ số tử số và mẫu số (theo lũy thừa giảm dần của z) của hàm hữu $\arg H ( z )$ trong (5.14). Kết quả: r chứa các thặng dư $- 0 . 6 , - 1 0 . 4$ ứng với các điểm cực $1 , - 4$ trong p, còn $\mathtt { k } = 2$ là phần nguyên. 

```python
from scipy import signal
r, p, k = signal.residue([2, -5, 0], [1, 3, -4]) 
```

Từ đó, ta có đáp ứng xung $h [ n ]$ theo 3 trường hợp khác nhau của miền hội tụ 

$$
h [ n ] = \left\{ \begin{array}{l l} 2 \delta [ n ] - 1 0. 4 (- 4) ^ {n - 1} u [ n - 1 ] - 0. 6 u [ n - 1 ], & | z | > 4 \\ 2 \delta [ n ] + 1 0. 4 (- 4) ^ {n - 1} u [ - n ] - 0. 6 u [ n - 1 ], & 1 <   | z | <   4 \\ 2 \delta [ n ] + 1 0. 4 (- 4) ^ {n - 1} u [ - n ] + 0. 6 u [ - n ], & | z | <   1 \end{array} \right.\tag{5.15}
$$

Ngoài ra, ta có thể phân tích $\textstyle { \frac { H ( z ) } { z } }$ thành các phân thức tối giản như sau 

$$
{\frac {H (z)}{z}} = {\frac {2 z - 5}{z ^ {2} + 3 z - 4}} = {\frac {2 . 6}{z + 4}} + {\frac {- 0 . 6}{z - 1}}
$$

Do đó, ta có thể viết $H ( z )$ thành 

$$
H (z) = \frac {2 . 6 z}{z + 4} + \frac {- 0 . 6 z}{z - 1} = \frac {2 . 6}{1 + 4 z ^ {- 1}} + \frac {- 0 . 6}{1 - z ^ {- 1}}
$$

Python. Như vậy, ta đã phân tích hàm hữu tỷ $H ( z )$ thành các phân thức tối giản theo biến $z ^ { - 1 }$ . Quá trình phân tích này có thể được thực hiện trên Python bằng hàm residuez trong mô-đun scipy.signal, với hai tham số là các vector hệ số tử số và mẫu số (theo lũy thừa tăng dần của $z ^ { - 1 } )$ của hàm hữu tỷ $H ( z )$ trong (5.13). Kết quả: r chứa 0.6, 2.6 ứng với các điểm cực $1 , - 4$ trong p, còn k rỗng. 

```python
from scipy import signal
r, p, k = signal.residuez([2, -5], [1, 3, -4]) 
```

Từ công thức (5.9), ta có thể tìm được đáp ứng xung $h [ n ]$ như sau 

$$
h [ n ] = \left\{ \begin{array}{l l} 2. 6 (- 4) ^ {n} u [ n ] - 0. 6 u [ n ], & | z | > 4 \\ - 2. 6 (- 4) ^ {n} u [ - n - 1 ] - 0. 6 u [ n ], & 1 <   | z | <   4 \\ - 2. 6 (- 4) ^ {n} u [ - n - 1 ] + 0. 6 u [ - n - 1 ], & | z | <   1 \end{array} \right.\tag{5.16}
$$

Bạn đọc có thể tự kiểm chứng đáp ứng xung $h [ n ]$ theo các công thức (5.15) và (5.16) là các cách biểu diễn khác nhau của cùng một dãy rời rạc. 

## 5.4.2. Hàm truyền và tính ổn định của hệ thống

Hàm truyền $H ( z )$ cũng giúp dễ dàng đánh giá tính nhân quả, ổn định của hệ thống LTI. Chúng ta sẽ phân tích điều này qua ví dụ sau. 

Ví dụ 5.14. Xét hệ thống LTI với hàm truyền 

$$
H (z) = \frac {\cdots}{(z - \frac {1}{2}) (z + 2)}
$$

Phân tích $H ( z )$ thành các phân thức tối giản 

$$
H (z) = \frac {A}{z - \frac {1}{2}} + \frac {B}{z + 2}
$$

Như vậy, từ các điểm cực $\begin{array} { r } { z _ { p 1 } = \frac { 1 } { 2 } \mathrm { \ v } \mathrm { \hat { a } \ z } _ { p 2 } = - 2 } \end{array}$ , mặt phẳng phức được chia thành 3 phần khác nhau, mỗi phần tương ứng với một trường hợp của miền hội tụ và của dãy $h [ n ]$ như minh họa trong hình 5.9. 

$$
h [ n ] = \left\{ \begin{array}{l l} A (0. 5) ^ {n - 1} u [ n - 1 ] + B (- 2) ^ {n - 1} u [ n - 1 ], & | z | > 2 \\ A (0. 5) ^ {n - 1} u [ n - 1 ] - B (- 2) ^ {n - 1} u [ - n ], & 0. 5 <   | z | <   2 \\ - A (0. 5) ^ {n - 1} u [ - n ] - B (- 2) ^ {n - 1} u [ - n ], & | z | <   0. 5 \end{array} \right.\tag{5.17}
$$

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/bb44c17c6a80d279695e1b6c1055831719dfd5a9fe8d80f00ba5f07c412554a5.jpg)



Hình 5.9. Các điểm cực của $H ( z )$ và các trường hợp khác nhau của miền hội tụ


Hệ thống nhân quả. Quan sát đáp ứng xung, ta thấy chỉ có trường hợp đầu tiên thỏa mãn: $h [ n ] = 0 , \forall n < 0$ , khi đó miền hội tụ là phần mặt phẳng nằm ngoài vòng tròn ngoài cùng (trường hợp (i) trong hình vẽ). 

Hệ thống ổn định. Điều kiện cần và đủ để hệ thống ổn định: 

$$
\sum_ {n = - \infty} ^ {\infty} | h [ n ] | <   \infty
$$

Ta thấy đây cũng chính là điều kiện để tồn tại biến đổi Fourier của $h [ n ]$ , tức là $H ( e ^ { j \omega } )$ hội tụ. Mặt khác, $H ( e ^ { j \omega } ) = \left. H ( z ) \right| _ { z = e ^ { j \omega } }$ , do vậy, vòng tròn đơn vị $z = e ^ { j \omega }$ phải nằm trong miền hội tụ của $H ( z )$ . Trong ví dụ này, chỉ có miền hội tụ trong trường hợp (ii) mới chứa vòng tròn đơn vị. 

Hệ thống vừa nhân quả vừa $\vec { \bf { o } } \mathbf { n }$ định. Với các hệ thống thời gian thực, vốn phải nhân quả, khi ta đặt câu hỏi xem hệ thống đó có ổn định không thì câu hỏi này bao hàm luôn hai điều kiện đồng thời: nhân quả và ổn định. Trong ví dụ này, ta thấy không có trường hợp nào hệ thống vừa nhân quả vừa ổn định. 

Chúng ta hãy xét bài toán tổng quát hơn khi $H ( z )$ có hai điểm cực $z _ { p 1 } =$ $a , z _ { p 2 } = b$ bất kỳ. Qua các điểm a, b trên mặt phẳng phức, ta vẽ các vòng tròn có tâm tại $\mathrm { g } \acute { \mathrm { o c } }$ . Để hệ thống nhân quả thì ROC H(z) phải là phần mặt phẳng nằm ngoài vòng tròn ngoài cùng (xem hình 5.10). Mặt khác, để hệ thống ổn định thì phần mặt phẳng này phải chứa vòng tròn đơn vị (vòng tròn nét liền đậm trong hình vẽ). Như vậy, ta có điều kiện cần và đủ để hệ thống vừa nhân quả vừa ổn định: tất cả các điểm cực của $H ( z )$ phải nằm bên trong vòng tròn đơn vị, tức là 

$$
| z _ {p k} | <   1, \quad \forall k\tag{5.18}
$$

Điều kiện (5.18) áp dụng cho hệ thống nhân quả có hàm truyền $H ( z )$ hữu $\mathrm { t { \vec { y } } , }$ trong đó $z _ { p k }$ là các điểm cực còn lại sau khi đã giản ước các cặp cực – không trùng nhau. Với hệ thống không nhân quả, tiêu chí vẫn là vòng tròn đơn vị phải nằm trong $\mathrm { R O C } \{ H ( z ) \}$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/35aa48617d7afbbf3ebd3e4181d3cac64a3dea93f765daafe7bd2b39ad0f14b8.jpg)



Hình 5.10. Hệ thống nhân quả và ổn định


Trong trường hợp mẫu số của hàm hữu tỷ $H ( z )$ là đa thức bậc cao, việc tìm nghiệm sẽ trở nên không dễ dàng. Khi đó, người ta có thể sử dụng tiêu chuẩn ổn định Schur–Cohn. Đây là thuật toán giúp kiểm tra xem liệu một đa thức có tất cả các nghiệm nằm trong vòng tròn đơn vị hay không, mà không cần tính toán cụ thể ra các nghiệm của nó. Tài liệu này sẽ không trình bày về tiêu chuẩn ổn định Schur–Cohn, bạn đọc có thể tìm đọc về tiêu chuẩn này trong các giáo trình Xử lý tín hiệu số. 

Python. Khi có máy tính, cách đơn giản nhất là tính trực tiếp các điểm cực bằng np.roots rồi kiểm tra điều kiện (5.18). Với mẫu số $1 + 3 z ^ { - 1 } - \bar { 4 } z ^ { - 2 }$ của (5.13), các điểm cực là 4 và 1, kết quả là False: hệ thống nhân quả này không ổn định. Lưu ý: điều kiện áp dụng cho các điểm cực còn lại sau khi đã giản ước các cặp cực – không trùng nhau, nên cần so sánh thêm với nghiệm của tử số. 


X(z)


```lua
p = np.roots([1, 3, -4])
print(np.all(np.abs(p) < 1)) 
```

## 5.4.3. Hàm truyền và sơ đồ hệ thống

Hàm truyền H(z) trở nên đặc biệt hữu dụng đối với các hệ thống có sơ đồ thực hiện phức tạp. Đầu tiên, từ một hàm truyền H(z) hữu tỷ bất kỳ, ta có thể dễ dàng vẽ được sơ đồ hệ thống. 

Ví dụ 5.15. Xét hệ thống LTI với hàm truyền 

$$
H (z) = \frac {3 - 2 z ^ {- 1} + 7 z ^ {- 2}}{1 + 4 z ^ {- 1} - 9 z ^ {- 2}}
$$

Do $\begin{array} { r } { H ( z ) = \frac { Y ( z ) } { X ( z ) } } \end{array}$ , nên 

$$
Y (z) = 3 X (z) - 2 z ^ {- 1} X (z) + 7 z ^ {- 2} X (z) - 4 z ^ {- 1} Y (z) + 9 z ^ {- 2} Y (z)
$$

Từ đây, ta có hai sơ đồ dạng trực tiếp I và II thực hiện hệ thống như trong hình 5.11. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/3cd0453c79cb2c43296ea46db0e43dfd9806b1a17592fa96ff00b1737f9c306f.jpg)



Hình 5.11. Dạng trực tiếp I và II trên miền z


Lưu ý rằng hai sơ đồ dạng trực tiếp này giống hệt như hai sơ đồ dạng trực tiếp đã được trình bày ở phần 2.6. Khác biệt duy nhất là cách ký hiệu phần tử trễ. Ở đây, áp dụng tính chất trễ của biến đổi z, ta có thể coi phần tử trễ như một hệ thống có hàm truyền $z ^ { - 1 }$ 

Bên cạnh đó, từ sơ đồ hệ thống chúng ta cũng có thể tìm lại được hàm truyền H(z) bằng cách sử dụng hai cách tiếp cận 

(i) Chia hệ thống phức tạp thành các hệ thống con đơn giản hơn. 

(ii) Đặt các tín hiệu trung gian. 

Ví dụ 5.16. Tìm hàm truyền $H ( z )$ của hệ thống LTI nhân quả có sơ đồ thực hiện như trong hình 5.12. Xét tính ổn định của hệ thống. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/31703bb3077e32cd3697e54302340e1ba560ec979094f5828dce4073a77df935.jpg)



Hình 5.12. Sơ đồ thực hiện hệ thống trong ví dụ 5.16


Lời giải. Gọi $W ( z )$ và $V ( z )$ lần lượt là tín hiệu ở đầu ra của bộ cộng thứ nhất và bộ cộng thứ hai (tính từ trái sang phải). Viết phương trình tại ba bộ cộng, ta có 

$$
\begin{array}{r} W (z) = X (z) + \frac {1}{4} z ^ {- 1} Y (z) \\ V (z) = W (z) + \frac {1}{4} z ^ {- 1} V (z) \\ Y (z) = V (z) - z ^ {- 1} V (z) \end{array}
$$

Các phương trình này cho phép chia sơ đồ thành các hệ thống con như sau. 

• <sup>Vòng</sup> <sup>hồi</sup> <sup>tiếp</sup> <sup>qua</sup> <sup>bộ</sup> <sup>cộng</sup> <sup>thứ</sup> <sup>hai</sup> <sup>là</sup> <sup>một</sup> <sup>hệ</sup> <sup>thống</sup> <sup>con</sup> <sup>với</sup> <sup>đầu</sup> <sup>vào</sup> $W ( z )$ , đầu ra $V ( z )$ . Từ phương trình thứ hai, 

$$
H _ {1} (z) = \frac {V (z)}{W (z)} = \frac {1}{1 - \frac {1}{4} z ^ {- 1}}
$$

Từ $V ( z )$ đến $Y ( z )$ là hai nhánh ghép song song: nhánh thẳng có hàm truyền 1, nhánh qua phần tử trễ và hệ số 1 có hàm truyền $- z ^ { - 1 }$ . Từ phương trình thứ ba, 

$$
H _ {2} (z) = \frac {Y (z)}{V (z)} = 1 - z ^ {- 1}
$$

Hai hệ thống con trên ghép nối tiếp, nên hàm truyền từ $W ( z )$ đến $Y ( z )$ là 

$$
G (z) = \frac {Y (z)}{W (z)} = H _ {1} (z) H _ {2} (z) = \frac {1 - z ^ {- 1}}{1 - \frac {1}{4} z ^ {- 1}}
$$

Cuối cùng, $G ( z )$ nằm trong vòng hồi tiếp ngoài cùng: đầu ra $Y ( z )$ đi qua phần tử trễ và hệ số $\textstyle { \frac { 1 } { 4 } }$ rồi quay về bộ cộng thứ nhất. Thay $Y ( z ) = G ( z ) W ( z )$ vào phương trình thứ nhất, 

$$
Y (z) = G (z) \left[ X (z) + \frac {1}{4} z ^ {- 1} Y (z) \right] \quad \Rightarrow \quad \frac {Y (z)}{X (z)} = \frac {G (z)}{1 - \frac {1}{4} z ^ {- 1} G (z)}
$$

Thay biểu thức của $G ( z )$ vào và nhân cả tử và mẫu với $1 - \textstyle { \frac { 1 } { 4 } } z ^ { - 1 }$ , ta được 

$$
H (z) = \frac {1 - z ^ {- 1}}{\left(1 - \frac {1}{4} z ^ {- 1}\right) - \frac {1}{4} z ^ {- 1} \left(1 - z ^ {- 1}\right)} = \frac {1 - z ^ {- 1}}{1 - \frac {1}{2} z ^ {- 1} + \frac {1}{4} z ^ {- 2}}
$$

Các điểm cực của $H ( z )$ là nghiệm của $\begin{array} { r } { z ^ { 2 } - \frac { 1 } { 2 } z + \frac { 1 } { 4 } = 0 } \end{array}$ 

$$
z _ {p 1, 2} = \frac {1}{4} \pm j \frac {\sqrt {3}}{4} = \frac {1}{2} e ^ {\pm j \frac {\pi}{3}}
$$

(các điểm không là $z = 0 \mathrm { \ v { \hat { a } } } z = 1$ , không trùng với điểm cực). Hệ thống nhân quả có cả hai điểm cực nằm trong vòng tròn đơn vị, $\begin{array} { r } { | z _ { p 1 , 2 } | = \frac { 1 } { 2 } < 1 } \end{array}$ , nên theo (5.18) hệ thống ổn định.  

## 5.5. Biến đổi z một phía

Biến đổi z một phía được định nghĩa như sau 

$$
X ^ {+} (z) = \mathrm{ZT} ^ {+} \{x [ n ] \} = \sum_ {n = 0} ^ {\infty} x [ n ] z ^ {- n}
$$

Các tính chất tương tự như biến $\operatorname { d } \acute { \boldsymbol { \mathrm { o } } } \acute { \mathbf { l } } ~ z$ hai phía, ngoại trừ: 

Trễ 

$$
\begin{array}{l} \mathrm {ZT^ {+} \{x[n- k]\}} = z ^ {- k} [ X ^ {+} (z) + \sum_ {n = 1} ^ {k} x [ - n ] z ^ {n} ], \quad k > 0 \\ \mathrm {ZT^ {+} \{x[n+ k]\}} = z ^ {k} [ X ^ {+} (z) - \sum_ {n = 0} ^ {k - 1} x [ n ] z ^ {- n} ], \quad k > 0 \end{array}
$$

• <sup>Định</sup> <sup>lý</sup> <sup>giá</sup> <sup>trị</sup> <sup>đầu:</sup> <sup>với</sup> <sup>mọi</sup> <sup>dãy</sup> <sup>x[n]</sup> <sup>có</sup> <sup>biến</sup> <sup>đổi</sup> <sup>z</sup> <sup>một</sup> <sup>phía</sup> <sup>(ROC</sup> <sup>dạng</sup> $| z | > r _ { 1 } )$ 

$$
x [ 0 ] = \lim _ {z \to \infty} X ^ {+} (z)\tag{5.19}
$$

Thật vậy, $X ^ { + } ( z ) = x [ 0 ] + x [ 1 ] z ^ { - 1 } + x [ 2 ] z ^ { - 2 } + \cdot \cdot \cdot$ là chuỗi lũy thừa theo $z ^ { - 1 }$ hội tụ đều trên miền $| z | \geq R$ với mọi $R > r _ { 1 }$ , nên được phép chuyển giới hạn qua tổng; khi $z  \infty$ , mọi số hạng với $n \geq 1$ đều tiến về 0. Nếu x[n] nhân quả thì $X ^ { + } ( z ) = X ( z )$ , khi đó $x [ 0 ] = \dim _ { z \to \infty } X ( z )$ 

Định lý giá trị cuối: nếu các điểm cực của $( z - 1 ) X ^ { + } ( z )$ đều nằm bên trong vòng tròn đơn vị thì 

$$
\lim _ {n \to \infty} x [ n ] = \lim _ {z \to 1} (z - 1) X ^ {+} (z)
$$

Biến $\mathrm { \bar { d } \acute { o } i \ z m \hat { o } t }$ phía được dùng để giải phương trình sai phân tuyến tính hệ số hằng. 

Ví dụ 5.17. Giải phương trình sai phân (tìm $y [ n ] , n \geq 0 )$ 

$$
y [ n ] - 3 y [ n - 1 ] + 2 y [ n - 2 ] = x [ n ]
$$

với đầu vào $x [ n ] = 3 ^ { n - 2 } u [ n ]$ và các điều kiện đầu: 

$$
y [ - 2 ] = - \frac {4}{9}, \quad y [ - 1 ] = - \frac {1}{3}
$$

Lời giải. Biến đổi z một phía của đầu vào là 

$$
X ^ {+} (z) = \sum_ {n = 0} ^ {\infty} 3 ^ {n - 2} z ^ {- n} = \frac {1 / 9}{1 - 3 z ^ {- 1}}, \quad | z | > 3
$$

$\mathrm { { \acute { A } p } }$ dụng tính chất trễ của biến $\operatorname { d } \acute { \boldsymbol { \mathrm { o } } } \acute { \boldsymbol { 1 } } ~ z$ một phía cho $y [ n - 1 ]$ và $y [ n - 2 ]$ 

$$
\begin{array}{r l} & {\mathrm {ZT^ {+} \{y[n- 1]\} = z^ {- 1} Y^ {+} (z) + y[- 1]}} \\ & {\mathrm {ZT^ {+} \{y[n- 2]\} = z^ {- 2} Y^ {+} (z) + z^ {- 1} y[- 1] + y[- 2]}} \end{array}
$$

Lấy biến đổi z một phía hai vế của phương trình sai phân và nhóm các số hạng chứa $Y ^ { + } ( z )$ 

$$
\begin{array}{c} (1 - 3 z ^ {- 1} + 2 z ^ {- 2}) Y ^ {+} (z) = X ^ {+} (z) + 3 y [ - 1 ] - 2 y [ - 2 ] - 2 y [ - 1 ] z ^ {- 1} \\ = \frac {1 / 9}{1 - 3 z ^ {- 1}} - \frac {1}{9} + \frac {2}{3} z ^ {- 1} \\ = \frac {z ^ {- 1} (1 - 2 z ^ {- 1})}{1 - 3 z ^ {- 1}} \end{array}
$$

Vì $1 - 3 z ^ { - 1 } + 2 z ^ { - 2 } = ( 1 - z ^ { - 1 } ) ( 1 - 2 z ^ { - 1 } )$ , thừa số $( 1 - 2 z ^ { - 1 } )$ được giản ước và ta có 

$$
Y ^ {+} (z) = \frac {z ^ {- 1}}{(1 - z ^ {- 1}) (1 - 3 z ^ {- 1})} = \frac {- 1 / 2}{1 - z ^ {- 1}} + \frac {1 / 2}{1 - 3 z ^ {- 1}}
$$

Biến đổi ngược từng phân thức theo (5.9), ta được 

$$
y [ n ] = \frac {1}{2} \left(3 ^ {n} - 1\right), \quad n \geq 0
$$

Có thể kiểm tra lại: $\begin{array} { r } { y [ 0 ] = 3 y [ - 1 ] - 2 y [ - 2 ] + x [ 0 ] = - 1 + \frac { 8 } { 9 } + \frac { 1 } { 9 } = 0 . } \end{array}$ , đúng với công thức trên. Ngoài ra, công thức này cũng cho đúng các giá trị $\begin{array} { r } { y [ - 1 ] = - \frac { 1 } { 3 } } \end{array}$ và $\begin{array} { r } { y [ - 2 ] = - \frac { 4 } { 9 } } \end{array}$ ; thành phần $2 ^ { n }$ (ứng với điểm cực $z = 2$ của phương trình sai phân) không xuất hiện trong nghiệm vì với các điều kiện đầu đã cho, thừa số $( 1 - 2 z ^ { - 1 } )$ bị giản ước.  

Python. Hàm lfilter(b, a, x) trong scipy.signal tính đầu ra của hệ thống mô tả bởi phương trình sai phân với các vector hệ số b $( \mathrm { v } \acute { \mathrm { e } } \cdot x )$ và a $( \mathrm { v } \acute { \mathrm { e } } \ y )$ , theo lũy thừa tăng dần của $z ^ { - 1 }$ ; hàm lfiltic chuyển các điều kiện đầu y[ $\cdot 1 ] , y [ - 2 ]$ (theo thứ tự đó) thành trạng thái ban đầu zi. Với dữ liệu của ví dụ trên, y cho 0, 1, 4, 13, 40, 121 (giá trị $y [ 0 ]$ in ra cỡ $1 0 ^ { - 1 7 }$ do sai số làm tròn), trùng với $y [ n ] =$ ${ \frac { 1 } { 2 } } ( 3 ^ { n } - 1 )$ 

```python
import numpy as np
from scipy import signal
n = np.arange(6); x = 3.0**(n-2)
zi = signal.lfiltic([1], [1, -3, 2], y=[-1/3, -4/9])
y, _ = signal.lfilter([1], [1, -3, 2], x, zi=zi) 
```

## Tóm tắt chương

Biến $\operatorname { d } \acute { \boldsymbol { \mathrm { o } } } \acute { \boldsymbol { \mathrm { l } } } \boldsymbol { \mathrm { \Omega } } z$ của dãy x[n] là $\begin{array} { r } { X ( z ) = \sum _ { n = - \infty } ^ { \infty } x [ n ] z ^ { - n } } \end{array}$ . Kết quả chỉ đầy đủ khi đi kèm miền hội tụ ROC, là tập các điểm z mà tại đó chuỗi hội tụ tuyệt đối: cùng một biểu thức $X ( z )$ với các ROC khác nhau ứng với các dãy $x [ n ]$ khác nhau. 

ROC chỉ phụ thuộc vào $| z | ,$ có dạng tổng quát $r _ { 1 } < | z | < r _ { 2 }$ và không chứa điểm cực nào. Dãy có chiều dài hữu hạn có ROC là cả mặt phẳng phức (có thể trừ 0 hoặc ); dãy phía phải có ROC nằm ngoài một vòng tròn; dãy phía trái có ROC nằm trong một vòng tròn; dãy hai phía có ROC nằm giữa hai vòng tròn (hoặc là tập rỗng). 

Khi vòng tròn đơn vị nằm trong $\mathrm { R O C } ,$ biến đổi Fourier là biến đổi z xét trên vòng tròn đơn vị: $X ( e ^ { j \omega } ) = X ( z ) | _ { z = e ^ { j \omega } }$ 

Các tính chất tuyến tính, co giãn trên miền z, dịch thời gian, đảo thời gian, liên hợp phức, chập và đạo hàm trên miền z giúp tìm biến đổi thuận và ngược; mỗi tính chất đi kèm quy tắc xác định ROC tương ứng. Phép chập trên miền thời gian trở thành phép nhân trên miền z. 

Biến đổi z ngược có thể tính bằng tích phân đường trong ROC, bằng khai triển thành chuỗi lũy thừa, hoặc (với $X ( z )$ hữu tỷ) bằng khai triển thành các phân thức tối giản rồi dùng các cặp biến đổi đã biết tùy theo ROC. Với $X ( z )$ hữu tỷ hệ số thực, mỗi cặp điểm cực liên hợp phức cho một thành phần dao động hình sin trong x[n] (5.12). 

Hàm truyền $H ( z ) = Y ( z ) / X ( z )$ là biến đổi z của đáp ứng xung $h [ n ]$ . Với hệ thống mô tả bởi phương trình sai phân tuyến tính hệ số hằng, $H ( z )$ = $B ( z ) / A ( z )$ là hàm hữu tỷ của $z ^ { - 1 }$ . Đáp ứng tần số $H ( e ^ { j \omega } ) = H ( z ) | _ { z = e ^ { j \omega } }$ khi vòng tròn đơn vị nằm trong ROC. 

Với $H ( z )$ hữu $\mathrm { t { \vec { y } } , }$ hệ thống nhân quả khi và chỉ khi ROC là phần mặt phẳng nằm ngoài vòng tròn đi qua điểm cực xa gốc nhất, kể cả $z = \infty ;$ hệ thống ổn định khi và chỉ khi ROC chứa vòng tròn đơn vị. Hệ thống nhân quả ổn định khi và chỉ khi mọi điểm cực (sau khi giản ước) nằm trong vòng tròn đơn vị: $| z _ { p k } | < 1$ 

Từ $H ( z )$ có thể vẽ sơ đồ thực hiện dạng trực tiếp I và II, trong đó phần tử trễ có hàm truyền $z ^ { - 1 }$ . Ngược lại, từ sơ đồ có thể tìm $H ( z )$ bằng cách chia thành các hệ thống con ghép nối tiếp, song song, hồi tiếp, hoặc đặt các tín hiệu trung gian và viết phương trình tại các bộ cộng. 

Biến đổi z một phía $\begin{array} { r } { X ^ { + } ( z ) = \sum _ { n = 0 } ^ { \infty } x [ n ] z ^ { - n } } \end{array}$ có tính chất trễ chứa các điều Pkiện đầu, nên được dùng để giải phương trình sai phân với điều kiện đầu khác không. Định lý giá trị đầu: $x [ 0 ] = \mathrm { l i m } _ { z  \infty } X ^ { + } ( z )$ . Định lý giá trị cuối: $\begin{array} { r } { \operatorname* { l i m } _ { n  \infty } x [ n ] = \operatorname* { l i m } _ { z  1 } ( z - 1 ) X ^ { + } ( z ) } \end{array}$ khi các điểm cực của $( z - 1 ) X ^ { + } ( z )$ đều nằm bên trong vòng tròn đơn vị. 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/c29e2adbe45365150302d5e6b369201262538aee0466a66fcd43d50fc3081c0f.jpg)



Hình 5.13. Sơ đồ hệ thống trong bài tập 18


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/efe481d93de8c484386172cf9789f644dfbdfe7ed80c1a7a0b5ab42806788fd0.jpg)



Hình 5.14. Sơ đồ hệ thống trong bài tập 19


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/5abd992e19b51cb09144a04b93efdc4fd931d40fb30768c01b9245782fef8cc1.jpg)



Hình 5.15. Sơ đồ hệ thống trong bài tập 20


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/46e683030b69fbdcade1d355e435d090008888ae5f19949e2a42a76dec1d63a3.jpg)



Hình 5.16. Các điểm cực và điểm không của X(z) trong bài tập 3 (vòng tròn nét đứt là vòng tròn đơn vị)


## Bài tập

1. Tìm biến $\mathrm { \ d { \acute { o } i } \ z \ v { \hat { a } } }$ miền hội tụ của dãy $\begin{array} { r } { x [ n ] = \left( \frac { 1 } { 2 } \right) ^ { n } u [ n ] - 3 ^ { n } u [ - n - 1 ] } \end{array}$ 

2. Tìm biến đổi z và miền hội tụ của các dãy sau; nếu biến đổi z không tồn tại thì giải thích vì sao. 

(a) $x _ { 1 } [ n ] = \{ 3 , 0 , - 1 , 2 \}$ 

(b) $x _ { 2 } [ n ] = ( 0 . 8 ) ^ { n } \dot { u } [ n - 3 ]$ 

(c) $\begin{array} { r } { x _ { 3 } [ n ] = \left( \frac { 1 } { 3 } \right) ^ { | n | } } \end{array}$ 

(d) $\begin{array} { l } { { x _ { 4 } [ n ] = 2 ^ { n } u [ - n ] } } \\ { { x _ { 5 } [ n ] = ( 0 . 5 ) ^ { n } u [ - n - 1 ] + 2 ^ { n } u [ n ] } } \end{array}$ (e) 

3. Biến đổi z của dãy x[n] là hàm hữu $\arg \ X ( z )$ có các điểm cực và điểm không (trong mặt phẳng phức, không $\ker \hat { \hat { \mathbf { e } } } ~ z = \infty )$ như trong hình 5.16. 

(a) Liệt kê tất cả các miền hội tụ có thể có của $X ( z )$ 

(b) Với mỗi miền hội tụ ở câu (a), x[n] là dãy phía phải, phía trái hay hai phía? 

(c) Với miền hội tụ nào thì $x [ n ]$ có biến đổi Fourier? 

(d) Có miền hội tụ nào ứng với x[n] nhân quả không? Giải thích. 

4. Tìm dãy x[n] biết rằng: 

(i) x[n] là dãy thực và nhân quả; 

(ii) X(z) có đúng hai điểm cực, một trong hai điểm cực là $z = 0 . 5 e ^ { j \pi / 3 }$ ; 

(iii) $X ( z )$ có điểm không bậc hai tại $z = 0$ và không có điểm không nào khác trong mặt phẳng phức; 

(iv) $X ( 1 ) = 4 .$ 

5. Cho $x [ n ] \longleftrightarrow X ( z ) = { \frac { z ^ { - 1 } } { ( 1 - 0 . 6 z ^ { - 1 } ) ^ { 2 } } } , | z | > 0 . 6$ . Không tìm $x [ n ]$ , hãy dùng các tính chất của biến đổi z (bảng 5.1) để tìm biến đổi z và miền hội tụ của các dãy sau: 

(a) $x [ n + 2 ]$ 

(b) $( - 2 ) ^ { n } x [ n ]$ 

(c) $x [ - n ]$ 

(d) $n x [ n ]$ 

(e) $x [ n ] * x [ - n ]$ 

(f) $x [ n ] - x [ n - 1 ]$ 

(g) cos $\left( { \frac { \pi n } { 2 } } \right) x [ n ] { \mathrm { ~ ( g o i ~ y : ~ v i ) } } { \hat { \hat { \mathrm { e } } } } \mathrm { t }$ cos $\textstyle \left( { \frac { \pi n } { 2 } } \right)$ theo công thức Euler) 

6. Xuất phát từ các cặp biến đổi trong bảng 5.2 và các tính chất trong bảng 5.1, tìm biến đổi z và miền hội tụ của: 

(a) $n ^ { 2 } a ^ { n } u [ n ]$ [n], với $a \neq 0$ 

(b) $r ^ { n } \cos ( \omega _ { 0 } n ) u [ n ]$ , với $r > 0 ;$ áp dụng cho $\begin{array} { r } { r = 0 . 9 , \omega _ { 0 } = \frac { \pi } { 3 } } \end{array}$ 3 

(c) $\textstyle y [ n ] = \sum _ { k = 0 } ^ { n } ( 0 . 5 ) ^ { k }$ với $n \geq 0$ và $y [ n ] = 0$ với $n < 0 \mathrm { ~ ( g o i ~ ) } \dot { \mathrm { y } } \mathrm { : ~ } y [ n ] = u [ n ] *$ $( 0 . 5 ) ^ { n } u [ n ] )$ . Từ $Y ( z )$ , tìm biểu thức của y[n] không chứa dấu tổng. 

7. Dùng tính chất chập của biến đổi z, tính $y [ n ] = x [ n ] * h [ n ]$ và chỉ ra miền hội tụ của Y(z) trong các trường hợp sau: 

(a) $x [ n ] = \{ \ O _ { \cdot } ^ { 2 } , - 1 , \ O _ { 3 } \} , h [ n ] = \{ 1 , \ O _ { \cdot } ^ { 2 } , - 1 \}$ 

(b) $x [ n ] = ( 0 . 8 ) ^ { n } u [ n ] , h [ n ] = \delta [ n ] - 0 . 8 \delta [ n - 1 ]$ 

(c) $x [ n ] = ( 0 . 5 ) ^ { n } u [ n ] , h [ n ] = 2 ^ { n } u [ - n - 1 ]$ 

8. Dùng phương pháp khai triển thành chuỗi lũy thừa, tìm x[n] biết: 

(a) $\begin{array} { r } { X ( z ) = \ln ( 1 + 0 . 5 z ^ { - 1 } ) , | z | > 0 . 5 \ ( \mathrm { g o i } \ \bar { y } ; \ln ( 1 + v ) = \sum _ { k = 1 } ^ { \infty } \frac { ( - 1 ) ^ { k + 1 } } { k } v ^ { k } } \end{array}$ với $| v | < 1 )$ 

(b) $X ( z ) = e ^ { 2 z ^ { - 1 } } , | z | > 0 .$ 

(c) Kiểm tra lại kết quả câu (a) bằng tính chất đạo hàm trên miền z: tìm biến đổi ngược của $- \bar { z } \frac { d X ( z ) } { d z }$ , rồi suy ra x[n]. 

9. Tìm $x [ n ]$ biết 

$$
X (z) = \frac {1}{(1 - 0 . 5 z ^ {- 1}) (1 + 0 . 2 5 z ^ {- 1})}
$$

ứng với tất cả các miền hội tụ có thể có. 

10. Tìm x[n] biết: 

(a) $X ( z ) = \frac { 1 + z ^ { - } } { ( 1 - 0 . 5 z ^ { - 1 } ) ( 1 - 0 . 2 5 z ^ { - 1 } ) } , | z | > 0 . 5$ (gợi $\acute { \mathrm { y } } { : }$ bậc tử số bằng bậc mẫu số). 

(b) $X ( z ) = \frac { 1 - z ^ { - 1 } } { ( 1 - 0 . 5 z ^ { - 1 } ) ^ { 2 } } , | z | < 0 . 5 .$ 

11. Cho $X ( z ) = { \frac { 1 + z ^ { - 1 } } { 1 - z ^ { - 1 } + 0 . 5 z ^ { - 2 } } } .$ . Tìm các điểm cực của $X ( z )$ và tìm $x [ n ]$ ứng với tất cả các miền hội tụ có thể có. 

12. Cho hệ thống LTI nhân quả được mô tả bởi phương trình sai phân $y [ n ] -$ $0 . 9 y [ n - 1 ] + 0 . 2 y [ n - 2 ] = x [ n ] - x [ n - 1 ]$ . Tìm hàm truyền $H ( z )$ và các điểm cực, xét tính ổn định của hệ thống, và tìm đáp ứng xung $h [ n ]$ 

13. Một hệ thống LTI cho đầu ra $y [ n ] = \left[ - 2 ( 0 . 5 ) ^ { n } + 3 ( - 0 . 2 5 ) ^ { n } \right] u [ n ]$ khi đầu vào là $x [ n ] = ( 0 . 5 ) ^ { n } u [ n ]$ 

(a) Tìm hàm truyền $H ( z )$ và lập luận để xác định miền hội tụ của nó. Hệ thống có nhân quả không? Có ổn định không? 

(b) Tìm đáp ứng xung $h [ n ]$ và phương trình sai phân mô tả hệ thống. 

(c) Chứng minh rằng nếu $z _ { 0 } \in \operatorname { R O C } \{ H ( z ) \}$ thì đầu ra ứng với đầu vào $x [ n ] =$ zn, n  Z, là $y [ n ] = H ( z _ { 0 } ) z _ { 0 } ^ { n }$ (gợi ý: tính trực tiếp phép chập). Áp dụng để tìm đầu ra khi đầu vào là $2 ^ { n }$ và khi đầu vào là $( - 1 ) ^ { n } , n \in \mathbb { Z }$ 

14. Cho hệ thống LTI nhân quả có hàm truyền $H ( z ) = \frac { 1 - z ^ { - 2 } } { 1 + 0 . 8 1 z ^ { - 2 } } .$ 

(a) Tìm các điểm $\operatorname { c u c } ,$ điểm không và vẽ trên mặt phẳng phức. Hệ thống có ổn định không? Bậc của hệ thống bằng bao nhiêu? 

(b) Tính $H ( e ^ { j \omega } )$ tại $\omega = 0 , { \textstyle \frac { \pi } { 4 } } , { \textstyle \frac { \pi } { 2 } } , { \textstyle \frac { 3 \pi } { 4 } } , \pi$ . Hệ thống là bộ lọc thông thấp, thông cao, thông dải hay chắn dải? Giải thích dựa vào vị trí các điểm cực và điểm không. 

(c) Tìm đầu ra $y [ n ]$ khi đầu vào là $\begin{array} { r } { x [ n ] = 3 + 2 \cos { \left( \frac { \pi n } { 2 } \right) } + \cos ( \pi n ) , n \in \mathbb { Z } . } \end{array}$ 

15. Cho hệ thống LTI nhân quả mô tả bởi phương trình sai phân $y [ n ] - a y [ n -$ $1 ] + 0 . 5 y [ n - 2 ] = x [ n ]$ , trong $\scriptstyle { \dot { \mathrm { d o ~ } } } a$ là hằng số thực. 

(a) Tìm điều kiện của a để hệ thống ổn định (gợi ý: xét riêng trường hợp các điểm cực là cặp số phức liên hợp và trường hợp các điểm cực là số thực). 

(b) Với $a = 1 .$ , tìm các điểm cực và đáp ứng xung $h [ n ]$ 

(c) Với $a = 1 . 5$ , tìm $h [ n ]$ . Chứng tỏ rằng $h [ n ]$ bị chặn nhưng hệ thống không ổn định. 

16. Hệ thống nghịch đảo của hệ thống LTI có hàm truyền $H ( z )$ là hệ thống có hàm truyền $H _ { i } ( z )$ thỏa mãn $H ( z ) H _ { i } ( z ) = 1$ (tương ứng $h [ n ] * h _ { i } [ n ] = \delta [ n ] )$ 

(a) Hệ thống LTI nhân quả có $H _ { 1 } ( z ) = \frac { 1 - 0 . 5 z ^ { - 1 } } { 1 + 0 . 4 z ^ { - 1 } }$ . Tìm hàm truyền và đáp ứng xung của hệ thống nghịch đảo nhân quả của nó. Hệ thống nghịch đảo này có ổn định không? 

(b) Hệ thống có đáp ứng xung $h _ { 2 } [ n ] = \delta [ n ] - 2 \delta [ n - 1 ]$ . Tìm đáp ứng xung của hệ thống nghịch đảo ứng với mỗi miền hội tụ có thể có. Có hệ thống nghịch đảo nào vừa nhân quả vừa ổn định không? 

(c) Từ (a) và (b), hãy nêu điều kiện đối với các điểm không của $H ( z )$ để một hệ thống LTI nhân quả, ổn định, có $H ( z )$ hữu $\mathrm { t \vec { y } }$ và $h [ 0 ] \neq 0$ có hệ thống nghịch đảo vừa nhân quả vừa ổn định. 

17. Cho hệ thống LTI nhân quả có hàm truyền 

$$
H (z) = \frac {2 + 0 . 4 z ^ {- 1} - 0 . 4 8 z ^ {- 2}}{1 - 0 . 2 z ^ {- 1} - 0 . 1 5 z ^ {- 2}}
$$

(a) Vẽ sơ đồ thực hiện hệ thống dạng trực tiếp II. 

(b) Phân tích tử số và mẫu số thành tích các thừa số bậc một, từ đó vẽ sơ đồ thực hiện hệ thống dưới dạng ghép nối tiếp hai khâu bậc một, mỗi khâu ở dạng trực tiếp II. 

(c) So sánh số bộ nhân, bộ cộng và phần tử trễ của hai sơ đồ. 

18. Cho hệ thống LTI nhân quả có sơ đồ thực hiện như trong hình 5.13. Tìm hàm truyền $H ( z )$ và các điểm cực, xét tính ổn định của hệ thống. 

19. Cho hệ thống LTI nhân quả có sơ đồ thực hiện như trong hình 5.14. Tìm hàm truyền $H ( z )$ và đáp ứng xung $h [ n ]$ của hệ thống. 

20. Cho hệ thống LTI nhân quả có sơ đồ thực hiện như trong hình 5.15. Tìm hàm truyền $H ( z )$ (gợi ý: đặt tín hiệu trung gian $W ( z )$ ở đầu ra của bộ cộng thứ nhất và viết phương trình tại hai bộ cộng), xét tính ổn định của hệ thống. 

21. Dùng biến đổi z một phía, giải phương trình sai phân $y [ n ] - 0 . 5 y [ n - 1 ] = u [ n ]$ với điều kiện đầu $y [ - 1 ] = 1$ (tìm $y [ n ] , n \geq 0 )$ . Kiểm tra giới hạn lim $\mathfrak { i } _ { n \to \infty } y [ n ]$ bằng định lý giá trị cuối. 

22. Cho phương trình sai phân $y [ n ] - 0 . 7 y [ n - 1 ] + 0 . 1 y [ n - 2 ] = 2 x [ n ]$ với đầu vào $x [ n ] = u [ n ]$ và các điều kiện đầu $y [ - 1 ] = 2 , y [ - 2 ] = 4$ 

(a) Dùng biến $\mathrm { d } \hat { \delta } \mathrm { i } ~ z \ \mathrm { m } \hat { \mathrm { 0 } } \mathrm { t }$ phía, tìm $Y ^ { + } ( z )$ và $y [ n ] , n \geq 0$ . Kiểm tra $y [ 0 ]$ , y[1] bằng cách tính trực tiếp từ phương trình sai phân. 

(b) Viết $Y ^ { + } ( z )$ thành tổng hai số hạng: số hạng thứ nhất chỉ phụ thuộc các điều kiện đầu (không phụ thuộc $X ^ { + } ( z ) )$ , số hạng thứ hai chỉ phụ thuộc $X ^ { + } ( z )$ (không phụ thuộc các điều kiện đầu). Tìm biến đổi ngược của từng số hạng. 

(c) Chứng tỏ rằng số hạng thứ hai bằng $H ( z ) X ( z )$ , trong đó $H ( z )$ là hàm truyền của hệ thống LTI nhân quả mô tả bởi phương trình sai phân trên. Nói cách khác, số hạng thứ hai là đầu ra của hệ thống LTI đó khi đầu vào là $x [ n ]$ 

23. Với mỗi biến $\operatorname { d } \acute { \mathrm { o i } } \ z$ một phía $X ^ { + } ( z )$ dưới đây, tìm $x [ 0 ]$ bằng định lý giá trị đầu; xét xem có áp dụng được định lý giá trị cuối không, nếu được thì tìm $\scriptstyle \operatorname* { l i m } _ { n \to \infty } x [ n ]$ . Kiểm tra lại bằng cách tìm $x [ n ] , n \geq 0$ 

(a) $X ^ { + } ( z ) = \frac { 2 - z ^ { - 1 } } { ( 1 - z _ { . } ^ { - 1 } ) ( 1 + 0 . 5 z ^ { - 1 } ) }$ 

(b) $X ^ { + } ( z ) = { \frac { z ^ { - 1 } } { ( 1 - z ^ { - 1 } ) ^ { 2 } } }$ 

(c) $X ^ { + } ( z ) = \frac { 3 } { 1 + z ^ { - 1 } }$ 

(d) $X ^ { + } ( z ) = { \frac { 1 - 3 z ^ { - 1 } } { 1 - 2 z ^ { - 1 } } }$ 

24. Dãy Fibonacci thỏa mãn $y [ n + 2 ] = y [ n + 1 ] + y [ n ]$ với $n \geq 0 .$ , và $y [ 0 ] = 0$ $y [ 1 ] = 1$ 

(a) Dùng tính chất dịch $x [ n + k ]$ của biến đổi z một phía, tìm $Y ^ { + } ( z )$ 

(b) Tìm biểu thức của $y [ n ] , n \geq 0$ . Kiểm tra với các giá trị $y [ 2 ] , \ldots , y [ 6 ]$ tính trực tiếp. 

(c) Xét hệ thống LTI nhân quả $y [ n ] = y [ n - 1 ] + y [ n - 2 ] + x [ n ]$ . Tìm các điểm cực và xét tính ổn định của hệ thống. Chứng tỏ rằng đáp ứng xung của hệ thống là $h [ n ] = y [ n + 1 ] , n \geq 0$ , với $y [ n ]$ là dãy Fibonacci ở trên. 

Đáp số bài tập 

Bài $\operatorname { l } \colon X ( z ) = { \frac { 1 } { 1 - { \frac { 1 } { 2 } } z ^ { - 1 } } } + { \frac { 1 } { 1 - 3 z ^ { - 1 } } } , { \mathrm { ~ v } } { \dot { 0 } } { \dot { 1 } } \ { \overset { 1 } { 2 } } < | z | < 3 .$ 

• <sup>Bài</sup> <sup>2:</sup> <sup>(a)</sup> $X _ { 1 } ( z ) = 3 z ^ { 2 } - 1 + 2 z ^ { - 1 } , 0 < | z | < \infty . \mathrm { ( b ) } \ X _ { 2 } ( z ) = { \frac { 0 . 5 1 2 z ^ { - 3 } } { 1 - 0 . 8 z ^ { - 1 } } } ,$ $| z | > 0 . 8 . \ \mathrm { ( c ) }$ Tách thành phần $n \geq 0$ và phần $n < 0 \mathrm { : }$ 

$$
X _ {3} (z) = \frac {1}{1 - \frac {1}{3} z ^ {- 1}} + \frac {\frac {1}{3} z}{1 - \frac {1}{3} z} = \frac {\frac {8}{9}}{\left(1 - \frac {1}{3} z ^ {- 1}\right) \left(1 - \frac {1}{3} z\right)}, \quad \frac {1}{3} <   | z | <   3
$$

(d) $\begin{array} { c c c } { { X _ { 4 } ( z ) = \sum _ { m = 0 } ^ { \infty } \left( \frac { z } { 2 } \right) ^ { m } = \displaystyle \frac { 1 } { 1 - \frac { 1 } { 2 } z } , | z | < 2 . { \mathrm { ( e ) } } } } \end{array}$ Thành phần thứ nhất chỉ hội tụ khi $| z | < 0 . 5$ , thành phần thứ hai chỉ hội tụ khi $| z | > 2 ;$ không có z nào thỏa mãn cả hai nên $x _ { 5 } [ n ]$ không có biến đổi z. 

Bài 3: (a) Bốn miền: $| z | < 0 . 5 ; 0 . 5 < | z | < 1 . 5 ; 1 . 5 < | z | < 3 ; | z | > 3$ (b) Lần lượt là dãy phía trái, hai phía, hai phía, phía phải. (c) Chỉ miền $0 . 5 < | z | < 1 . 5$ chứa vòng tròn đơn vị. (d) Có, miền $| z | > 3$ . Theo hình, $X ( z ) = K { \frac { ( z + 0 . 5 ) ( z - 2 ) } { ( z - 0 . 5 ) ( z + 1 . 5 ) ( z - 3 ) } } ;$ bậc tử số (2) nhỏ hơn bậc mẫu số (3) nên $X ( z )  0$ khi $z  \infty$ , tức là $z = \infty$ không phải là điểm cực. Miền $| z | > 3$ chứa cả $z = \infty$ nên x[n] nhân quả. 

Bài 4: Do x[n] thực, theo tính chất liên hợp phức $X ( z ) = X ^ { \ast } ( z ^ { \ast } )$ , nên nếu $z _ { p }$ là điểm cực thì $z _ { p } ^ { * }$ cũng là điểm cực: điểm cực thứ hai là $0 . 5 e ^ { - j \pi / 3 }$ . Từ (ii), (iii), 

$$
X (z) = \frac {K z ^ {2}}{(z - 0 . 5 e ^ {j \pi / 3}) (z - 0 . 5 e ^ {- j \pi / 3})} = \frac {K}{1 - 0 . 5 z ^ {- 1} + 0 . 2 5 z ^ {- 2}}
$$

Từ (iv), $K / 0 . 7 5 = 4$ nên $K = 3 .$ . Do x[n] nhân quả, ROC là $| z | > 0 . 5$ , và 

$$
x [ n ] = (0. 5) ^ {n} \left[ 3 \cos {\frac {\pi n}{3}} + \sqrt {3} \sin {\frac {\pi n}{3}} \right] u [ n ] = 2 \sqrt {3} (0. 5) ^ {n} \sin {\frac {\pi (n + 1)}{3}} u [ n ]
$$

Bài 5: Bài 5: 

(a) ${ \frac { \sigma \cdot } { ( 1 - 0 . 6 z ^ { - 1 } ) ^ { 2 } } } , 0 . 6 < | z | < \infty { \mathrm { ~ ( t h \ " a ~ s \ " o ~ } } z { \mathrm { ~ t a o ~ d i \ ' e m ~ c u r c ~ t a i ~ \infty ) . } }$ 

(b) $X ( - z / 2 ) = { \frac { - 2 z ^ { - 1 } } { ( 1 + 1 . 2 z ^ { - 1 } ) ^ { 2 } } } , | z | > 1 . 2 .$ 

(c) $X ( 1 / z ) = \frac { z } { ( 1 - 0 . 6 z ) ^ { 2 } } , | z | < \frac { 5 } { 3 } .$ 

(d) $- z \frac { d X ( z ) } { d z } = \frac { z ^ { - 1 } ( 1 + 0 . 6 z ^ { - 1 } ) } { ( 1 - 0 . 6 z ^ { - 1 } ) ^ { 3 } } , | z | > 0 . 6 .$ 

(e) $X ( z ) X ( 1 / z ) = \frac { \strut ^ { \mathbf { 1 } } } { ( 1 - 0 . 6 z ^ { - 1 } ) ^ { 2 } ( 1 - 0 . 6 z ) ^ { 2 } } , 0 . 6 < | z | < \frac { \uplus } { \ d u } .$ 

(f) $( 1 - z ^ { - 1 } ) X ( z ) = \frac { z ^ { - 1 } ( 1 - z ^ { - 1 } ) } { ( 1 - 0 . 6 z ^ { - 1 } ) ^ { 2 } } , | z | > 0 . 6$ 

(g) $\cos \left( { \textstyle { \frac { \pi n } { 2 } } } \right) = { \textstyle { \frac { 1 } { 2 } } } { \textstyle \left( e ^ { j \pi { \dot { n } } / 2 } + e ^ { - j \pi n / 2 } \right) }$ ; áp dụng tính chất co giãn trên miền z với $a = e ^ { \pm j \pi / 2 } $ 

$$
\frac {1}{2} \left[ X (- j z) + X (j z) \right] = \frac {- 1 . 2 z ^ {- 2}}{(1 + 0 . 3 6 z ^ {- 2}) ^ {2}}, \quad | z | > 0. 6
$$

Bài 6: (a) Áp dụng tính chất đạo hàm trên miền z cho $\mathrm { c a p } n a ^ { n } u [ n ]$ : 

$$
n ^ {2} a ^ {n} u [ n ] \xleftarrow {z} \frac {a z ^ {- 1} (1 + a z ^ {- 1})}{(1 - a z ^ {- 1}) ^ {3}}, \quad | z | > | a |
$$

(b) $\mathrm { { \acute { A } p } }$ dụng tính chất co giãn trên miền z cho cặp cos(ω<sub>0</sub>n)u[n]: 

$$
r ^ {n} \cos (\omega_ {0} n) u [ n ] \xleftarrow {z} \frac {1 - r \cos \omega_ {0} z ^ {- 1}}{1 - 2 r \cos \omega_ {0} z ^ {- 1} + r ^ {2} z ^ {- 2}}, | z | > r
$$

với $r = 0 . 9 , \omega _ { 0 } = \frac { \pi } { 3 } ; \frac { 1 - 0 . 4 5 z ^ { - 1 } } { 1 - 0 . 9 z ^ { - 1 } + 0 . 8 1 z ^ { - 2 } } , \left| z \right| > 0 . 9 .$ (c) Theo tính chất chập, 

$$
Y (z) = \frac {1}{(1 - z ^ {- 1}) (1 - 0 . 5 z ^ {- 1})} = \frac {2}{1 - z ^ {- 1}} - \frac {1}{1 - 0 . 5 z ^ {- 1}}, \quad | z | > 1
$$

nên $y [ n ] = \left[ 2 - ( 0 . 5 ) ^ { n } \right] u [ n ]$ 

Bài $7 \colon ( \mathrm { a } ) \ Y ( z ) = ( 2 - z ^ { - 1 } + 3 z ^ { - 2 } ) ( z + 2 - z ^ { - 1 } ) = 2 z + 3 - z ^ { - 1 } + 7 z ^ { - 2 } - 3 z ^ { - 3 } .$ $0 < | z | < \infty ; y [ n ] = \{ 2 , \frac { 3 } { * } , - 1 , 7 , - 3 \}$ . (b) $Y ( z ) = { \frac { 1 - 0 . 8 z ^ { - 1 } } { 1 - 0 . 8 z ^ { - 1 } } } = 1 \mathrm { { : } }$ điểm $\operatorname { c u c } z = 0 . 8$ bị triệt tiêu nên ROC mở rộng thành toàn bộ mặt phẳng phức; $y [ n ] = \delta [ n ] . \mathrm { \ ( c ) } \ H ( z ) = { \frac { - 1 } { 1 - 2 z ^ { - 1 } } } , | z | < 2 .$ nên 

$$
Y (z) = \frac {- 1}{(1 - 0 . 5 z ^ {- 1}) (1 - 2 z ^ {- 1})} = \frac {\frac {1}{3}}{1 - 0 . 5 z ^ {- 1}} - \frac {\frac {4}{3}}{1 - 2 z ^ {- 1}}, \quad 0. 5 <   | z | <   2
$$

$$
y [ n ] = \frac {1}{3} (0. 5) ^ {n} u [ n ] + \frac {4}{3} 2 ^ {n} u [ - n - 1 ].
$$

Bài $8 \colon ( \mathrm { a } ) \ x [ n ] = { \frac { ( - 1 ) ^ { n + 1 } ( 0 . 5 ) ^ { n } } { n } } u [ n - 1 ] . \ ( \mathrm { b } ) \ x [ n ] = { \frac { 2 ^ { n } } { n ! } } u [ n ] . \ ( \mathrm { c } ) \ - z { \frac { d X ( z ) } { d z } } =$ $\frac { 0 . 5 z ^ { - 1 } } { 1 + 0 . 5 z ^ { - 1 } } , | z | > 0 . 5$ , nên $n x [ n ] = 0 . 5 ( - 0 . 5 ) ^ { n - 1 } u [ n - 1 ] = ( - 1 ) ^ { n + 1 } ( 0 . 5 ) ^ { n } u [ n - ]$ 1]. Chia cho n với $n \geq 1 ;$ ; còn x[0] tìm bằng định lý giá trị đầu (5.19) (dãy nhân quả nên $\begin{array} { r } { X ^ { + } ( z ) = X ( z ) ) \colon x [ 0 ] = \operatorname* { l i m } _ { z \to \infty } \ln ( 1 + 0 . 5 z ^ { - 1 } ) = 0 } \end{array}$ . Kết quả trùng với câu (a). 

Bài 9: 

$$
x [ n ] = \left\{ \begin{array}{l l} \left[ \frac {2}{3} (0. 5) ^ {n} + \frac {1}{3} (- 0. 2 5) ^ {n} \right] u [ n ], & | z | > 0. 5 \\ - \frac {2}{3} (0. 5) ^ {n} u [ - n - 1 ] + \frac {1}{3} (- 0. 2 5) ^ {n} u [ n ], & 0. 2 5 <   | z | <   0. 5 \\ - \left[ \frac {2}{3} (0. 5) ^ {n} + \frac {1}{3} (- 0. 2 5) ^ {n} \right] u [ - n - 1 ], & | z | <   0. 2 5 \end{array} \right.
$$

Bài 10: (a) Chia đa thức rồi phân tích thành các phân thức tối giản: 

$$
X (z) = 8 + \frac {1 0}{1 - 0 . 5 z ^ {- 1}} - \frac {1 7}{1 - 0 . 2 5 z ^ {- 1}}, \quad x [ n ] = 8 \delta [ n ] + [ 1 0 (0. 5) ^ {n} - 1 7 (0. 2 5) ^ {n} ] u [ n ]
$$

(b) $X ( z ) = { \frac { 1 } { 1 - 0 . 5 z ^ { - 1 } } } - { \frac { 0 . 5 z ^ { - 1 } } { ( 1 - 0 . 5 z ^ { - 1 } ) ^ { 2 } } } ;$ theo bảng 5.2 với $\mathrm { R O C } \ | z | < 0 . 5$ $x [ n ] = - ( 0 . 5 ) ^ { n } u [ - n - 1 ] + \dot { n } ( 0 . 5 ) ^ { n } u [ - \acute { n } - 1 ] = ( n - 1 ) ( 0 . 5 ) ^ { n } u [ - n - 1 ] .$ 

Bài 11: các điểm cực $\begin{array} { r } { z _ { p 1 , 2 } = 0 . 5 \pm 0 . 5 j = \frac { 1 } { \sqrt { 2 } } e ^ { \pm j \pi / 4 } ; } \end{array}$ 

$$
x [ n ] = \left\{ \begin{array}{l l} \left(\frac {1}{\sqrt {2}}\right) ^ {n} \left[ \cos \frac {\pi n}{4} + 3 \sin \frac {\pi n}{4} \right] u [ n ], & | z | > \frac {1}{\sqrt {2}} \\ - \left(\frac {1}{\sqrt {2}}\right) ^ {n} \left[ \cos \frac {\pi n}{4} + 3 \sin \frac {\pi n}{4} \right] u [ - n - 1 ], & | z | <   \frac {1}{\sqrt {2}} \end{array} \right.
$$

Có thể viết $\begin{array} { r } { \mathrm { y o n } \cos { \frac { \pi n } { 4 } } + 3 \sin { \frac { \pi n } { 4 } } = \sqrt { 1 0 } \cos { \left( \frac { \pi n } { 4 } - \mathrm { a r c t a n } 3 \right) } } \end{array}$ 

Bài 12: $H ( z ) = { \frac { 1 - z ^ { - 1 } } { 1 - 0 . 9 z ^ { - 1 } + 0 . 2 z ^ { - 2 } } } ;$ các điểm cực $z _ { p 1 } = 0 . 5 , z _ { p 2 } = 0 . 4$ đều nằm trong vòng tròn đơn vị nên hệ thống ổn định; 

$$
h [ n ] = \left[ - 5 (0. 5) ^ {n} + 6 (0. 4) ^ {n} \right] u [ n ]
$$

Bài 13: (a) $Y ( z ) = { \frac { - 2 } { 1 - 0 . 5 z ^ { - 1 } } } + { \frac { 3 } { 1 + 0 . 2 5 z ^ { - 1 } } } = { \frac { 1 - 2 z ^ { - 1 } } { ( 1 - 0 . 5 z ^ { - 1 } ) ( 1 + 0 . 2 5 z ^ { - 1 } ) } } ,$ $| z | > 0 . 5 ,$ , và $X ( z ) = { \frac { 1 } { 1 - 0 . 5 z ^ { - 1 } } } ;$ , nên 

$$
H (z) = \frac {Y (z)}{X (z)} = \frac {1 - 2 z ^ {- 1}}{1 + 0 . 2 5 z ^ {- 1}}
$$

Nếu ROC của $H ( z ) \mathrm { ~ l ~ \AA ~ } | z | < 0 . 2 5$ thì không có phần chung với $| z | > 0 . 5 ,$ , khi đó phép chập $x [ n ] * h [ n ]$ không tồn tại. Vậy ROC là $| z | > 0 . 2 5$ : hệ thống nhân quả và ổn định. (b) $) \  h [ n ] = - 8 \delta [ n ] + 9 ( - 0 . 2 5 ) ^ { n } u [ n ] ; y [ n ] + 0 . 2 5 y [ n - 1 ] =$ $\begin{array} { r } { x [ n ] - 2 x [ n - 1 ] . \mathrm { ~ ( c ) ~ } y [ n ] = \sum _ { k } h [ k ] z _ { 0 } ^ { n - k } = z _ { 0 } ^ { n } \sum _ { k } h [ k ] z _ { 0 } ^ { - k } = H ( z _ { 0 } ) z _ { 0 } ^ { n } } \end{array}$ , chuỗi hội tụ vì z thuộc ROC. Với $z _ { 0 } = 2 \colon H ( 2 ) = 0$ nên $y [ n ] = 0 ; { \mathrm { v } } { \hat { 0 } } { \mathrm { i } } z _ { 0 } = - 1 { \mathrm { : } }$ $H ( - 1 ) = 4$ nên $y [ n ] = 4 ( - 1 ) ^ { n }$ 

Bài 14: (a) $H ( z ) = \frac { z ^ { 2 } - 1 } { z ^ { 2 } + 0 . 8 1 } \colon$ điểm không $z = \pm 1$ , điểm cực $z = \pm 0 . 9 j$ hệ thống nhân quả có các điểm cực nằm trong vòng tròn đơn vị nên ổn định; bậc 2. (b) $\begin{array} { r } { \dot { H } ( e ^ { j 0 } ) = H ( e ^ { j \pi } ) = 0 ; H ( e ^ { j \pi / 4 } ) = \frac { 1 \ddot { + } j } { 1 - 0 . 8 1 j } \approx 0 . 1 1 5 + 1 . 0 9 3 j } \end{array}$ $\begin{array} { r } { | H ( e ^ { j \pi / 4 } ) | \approx 1 . 1 0 ; \ : H ( e ^ { j 3 \pi / 4 } ) = H ^ { \ast } ( e ^ { j \pi / 4 } ) ; \ : H ( e ^ { j \pi / 2 } ) = \frac { 2 } { 0 . 1 9 } = \frac { 2 0 0 } { 1 9 } \approx 1 0 . 5 3 . } \end{array}$ Đây là bộ lọc thông dải quanh $\begin{array} { r } { \omega = \frac { \pi } { 2 } ; } \end{array}$ : các điểm không tại $z ~ = ~ \pm 1$ triệt tiêu thành phần $\omega = 0 \mathrm { \ v a \ } \omega = \pi$ , các điểm cực $\pm 0 . 9 j$ nằm gần vòng tròn đơn vị tại $\omega = \pm \frac { \pi } { 2 }$ tạo đỉnh. (c) $y [ n ] = 3 H ( e ^ { j 0 } ) + 2 \left| H ( e ^ { j \pi / 2 } ) \right| \cos \left( { \textstyle { \frac { \pi n } { 2 } } } \right) +$ $\begin{array} { r } { H ( e ^ { j \pi } ) \cos ( \pi n ) = \frac { \bar { 4 0 0 } } { 1 9 } \cos \left( \frac { \pi n } { 2 } \right) \approx 2 1 . 0 5 } \end{array}$ cos $\textstyle \left( { \frac { \pi n } { 2 } } \right)$ 

Bài 15: (a) $H ( z ) = { \frac { 1 } { 1 - a z ^ { - 1 } + 0 . 5 z ^ { - 2 } } }$ , các điểm cực là nghiệm của $z ^ { 2 } - a z +$ $0 . 5 = 0 . { \mathrm { N } } { \hat { \hat { \mathrm { e u } } } } a ^ { 2 } < 2 \colon$ hai điểm cực phức liên hợp có $| z _ { p } | ^ { 2 } = z _ { p 1 } z _ { p 2 } = 0 . 5 .$ , nên $\begin{array} { r } { | z _ { p } | = \frac { 1 } { \sqrt { 2 } } < 1 } \end{array}$ , hệ thống ổn định. Nếu $a ^ { 2 } \geq 2 \colon$ hai điểm cực thực, điểm có trị tuyệt đối lớn nhất là ${ \frac { | a | + { \sqrt { a ^ { 2 } - 2 } } } { 2 } } ;$ điều kiện $\begin{array} { r } { \frac { | a | + \sqrt { a ^ { 2 } - 2 } } { 2 } < 1 \Leftrightarrow \sqrt { a ^ { 2 } - 2 } < } \end{array}$ $2 - | a | \Leftrightarrow | a | < 1 . 5$ . Kết hợp hai trường hợp: hệ thống ổn định khi và chỉ khi $\begin{array} { r } { | a | < \dot { 1 } . 5 . \ \mathrm { ( b ) } \ z _ { p 1 , 2 } = 0 . 5 \pm 0 . 5 j = \frac { 1 } { \sqrt { 2 } } e ^ { \pm j \pi / 4 } } \end{array}$ 2 

$$
h [ n ] = \left(\frac {1}{\sqrt {2}}\right) ^ {n} \left[ \cos {\frac {\pi n}{4}} + \sin {\frac {\pi n}{4}} \right] u [ n ]
$$

(c) Các điểm cực 1 và 0.5; 

$$
H (z) = \frac {2}{1 - z ^ {- 1}} - \frac {1}{1 - 0 . 5 z ^ {- 1}}, \qquad h [ n ] = [ 2 - (0. 5) ^ {n} ] u [ n ]
$$

Ta có $| h [ n ] | < 2$ nhưng $h [ n ]  2$ nên $\begin{array} { r } { \sum _ { n } | h [ n ] | = \infty : } \end{array}$ hệ thống không ổn định (điểm cực $z = 1$ Pnằm trên vòng tròn đơn vị). 

1 + 0.4z−<sup>1</sup> 1.8 Bài 16: (a) H<sub>i</sub>(z) = 1 0.5z−<sup>1</sup> = 0.8 + 1 0.5z−<sup>1</sup> |<sup>z</sup>| <sup>></sup> <sup>0.5;</sup> <sup>h</sup>i<sup>[n]</sup> <sup>=</sup> $- 0 . 8 \delta [ n ] + 1 . 8 ( 0 . 5 ) ^ { n } u [ n ]$ ; ổn định vì điểm cực 0.5 nằm trong vòng tròn đơn vị. (b) $H _ { i } ( z ) = { \frac { 1 } { 1 - 2 z ^ { - 1 } } } \colon \operatorname { v \hat { o } i } | z | > 2 , h _ { i } [ n ] = 2 ^ { n } u [ n ]$ , nhân quả nhưng không ổn định; với $| z | < 2 , h _ { i } [ n ] = - 2 ^ { n } u [ - n - 1 ]$ , ổn định nhưng không nhân quả. Không có hệ thống nghịch đảo nào vừa nhân quả vừa ổn định. (c) Các điểm cực của $H _ { i } ( z ) = 1 / H ( z )$ chính là các điểm không của $H ( z )$ ; điều kiện $h [ 0 ] = H ( \infty ) \neq 0$ bảo đảm $H _ { i } ( z )$ không có điểm cực tại $z = \infty$ . Do đó hệ thống nghịch đảo vừa nhân quả vừa ổn định tồn tại khi và chỉ khi mọi điểm không của $H ( z )$ nằm trong vòng tròn đơn vị. 

Bài 17: (a) Hình $5 . 1 7 ( \mathrm { a } )$ : hệ số nhánh thuận $2 , 0 . 4 , - 0 . 4 8 ;$ hệ số nhánh hồi tiếp 0.2, 0.15 (đổi dấu so với mẫu số). (b) Tử số có các nghiệm $- 0 . 6 , 0 . 4 ;$ mẫu số có các nghiệm 0.5, 0.3: 

$$
H (z) = \frac {2 + 1 . 2 z ^ {- 1}}{1 - 0 . 5 z ^ {- 1}} \cdot \frac {1 - 0 . 4 z ^ {- 1}}{1 + 0 . 3 z ^ {- 1}}
$$

sơ đồ như hình $5 . 1 7 ( \mathrm { b } )$ . Cách ghép cặp điểm không với điểm cực và cách chia hệ số 2 cho hai khâu không duy nhất. (c) Cả hai sơ đồ đều dùng 5 bộ nhân, 4 bộ cộng và 2 phần tử trễ (khâu thứ hai có hệ số $b _ { 0 } = 1$ nên không cần bộ nhân). 

• <sup>Bài</sup> <sup>18:</sup> <sup>hai</sup> <sup>khâu</sup> <sup>bậc</sup> <sup>một</sup> <sup>ghép</sup> <sup>nối</sup> <sup>tiếp,</sup> 

$$
H (z) = \frac {1}{1 - \frac {1}{2} z ^ {- 1}} \cdot \frac {1 + z ^ {- 1}}{1 + \frac {1}{3} z ^ {- 1}} = \frac {1 + z ^ {- 1}}{1 - \frac {1}{6} z ^ {- 1} - \frac {1}{6} z ^ {- 2}}
$$

các điểm cực $\begin{array} { r } { z _ { p 1 } = \frac { 1 } { 2 } , z _ { p 2 } = - \frac { 1 } { 3 } } \end{array}$ đều nằm trong vòng tròn đơn vị nên hệ thống ổn định. 

Bài 19: hai nhánh ghép song song, 

$$
H (z) = \frac {2}{1 - \frac {1}{2} z ^ {- 1}} - \frac {1}{1 + \frac {1}{4} z ^ {- 1}} = \frac {1 + z ^ {- 1}}{1 - \frac {1}{4} z ^ {- 1} - \frac {1}{8} z ^ {- 2}}
$$

$$
h [ n ] = \left[ 2 \left(\frac {1}{2}\right) ^ {n} - \left(- \frac {1}{4}\right) ^ {n} \right] u [ n ].
$$

Bài $\begin{array} { r } { 2 0 \colon W ( z ) = X ( z ) + \frac { 1 } { 2 } z ^ { - 1 } W ( z ) - \frac { 1 } { 4 } z ^ { - 1 } Y ( z ) \mathrm { ~ v a ~ } Y ( z ) = W ( z ) + z ^ { - 1 } X ( z ) } \end{array}$ suy ra 

$$
H (z) = \frac {1 + z ^ {- 1} - \frac {1}{2} z ^ {- 2}}{1 - \frac {1}{4} z ^ {- 1}}
$$

các điểm cực $z = 0$ và $\begin{array} { r } { z = \frac { 1 } { 4 } } \end{array}$ đều nằm trong vòng tròn đơn vị nên hệ thống ổn định. 

Bài 2 $\begin{array} { r } { \lfloor : y [ n ] = 2 - ( 0 . 5 ) ^ { n + 1 } , n \geq 0 ; \operatorname* { l i m } _ { n \to \infty } y [ n ] = \operatorname* { l i m } _ { z \to 1 } ( z - 1 ) Y ^ { + } ( z ) = 2 . } \end{array}$ 

• <sup>Bài</sup> <sup>22:</sup> <sup>(a)</sup> <sup>Với</sup> $1 - 0 . 7 z ^ { - 1 } + 0 . 1 z ^ { - 2 } = ( 1 - 0 . 5 z ^ { - 1 } ) ( 1 - 0 . 2 z ^ { - 1 } )$ 

$$
\begin{array}{c} (1 - 0. 5 z ^ {- 1}) (1 - 0. 2 z ^ {- 1}) Y ^ {+} (z) = 2 X ^ {+} (z) + 0. 7 y [ - 1 ] - 0. 1 y [ - 2 ] - 0. 1 y [ - 1 ] z ^ {- 1} \\ = \frac {2}{1 - z ^ {- 1}} + 1 - 0. 2 z ^ {- 1} \end{array}
$$

$$
y [ n ] = 5 - \frac {7}{3} (0. 5) ^ {n} + \frac {1}{3} (0. 2) ^ {n}, \quad n \geq 0
$$

$y [ 0 ] = 3 , y [ 1 ] = 3 . 9$ . (b) Số hạng thứ nhất và biến đổi ngược của nó: 

$$
\frac {1 - 0 . 2 z ^ {- 1}}{(1 - 0 . 5 z ^ {- 1}) (1 - 0 . 2 z ^ {- 1})} = \frac {1}{1 - 0 . 5 z ^ {- 1}} \longrightarrow (0. 5) ^ {n}, \quad n \geq 0
$$

Số hạng thứ hai: 

$$
{\frac {2}{(1 - z ^ {- 1}) (1 - 0 . 5 z ^ {- 1}) (1 - 0 . 2 z ^ {- 1})}} = {\frac {5}{1 - z ^ {- 1}}} - {\frac {{\frac {1 0}{3}}}{{1 - 0 . 5 z ^ {- 1}}}} + {\frac {{\frac {1}{3}}}{{1 - 0 . 2 z ^ {- 1}}}}
$$

có biến đổi ngược $\begin{array} { r } { 5 - \frac { 1 0 } { 3 } ( 0 . 5 ) ^ { n } + \frac { 1 } { 3 } ( 0 . 2 ) ^ { n } , n \geq 0 . } \end{array}$ . (c) Số hạng thứ hai bằng $H ( z ) X ( z )$ với $H ( z ) = \frac { \omega } { 1 - 0 . 7 z ^ { - 1 } + 0 . 1 z ^ { - 2 } } ;$ , vì $X ^ { + } ( z ) = X ( z ) \ ( x [ n ] = u [ n ]$ nhân quả). 

Bài 23: (a) $x [ 0 ] = 2 ; ( z - 1 ) X ^ { + } ( z ) = \frac { z ( 2 - z ^ { - 1 } ) } { 1 + 0 . 5 z ^ { - 1 } }$ chỉ có điểm $\mathrm { c u c - 0 . 5 }$ nằm trong vòng tròn đơn vị, nên lim $\begin{array} { r } { \mathsf { i } _ { n \to \infty } x [ n ] = \frac { 2 - 1 } { 1 . 5 } = \frac { 2 } { 3 } } \end{array}$ ; kiểm tra: $\begin{array} { r } { x [ n ] = \frac { 2 } { 3 } + } \end{array}$ ${ \frac { 4 } { 3 } } ( - 0 . 5 ) ^ { n }$ . (b) $x [ 0 ] = 0 ; ( z - 1 ) X ^ { + } ( z ) = \frac { z } { z - 1 }$ có điểm cực $z = 1$ , không áp dụng được; $x [ n ] = n \to \infty . \mathrm { ~ ( c ) ~ } x [ 0 ] = 3 ; ( z - 1 ) X ^ { + } ( z )$ có điểm cực $z = - 1$ nằm trên vòng tròn đơn vị, không áp dụng được (áp dụng hình thức sẽ cho 0); $x [ n ] = 3 ( - 1 ) ^ { n }$ không có giới hạn. $( \mathrm { d } ) \ x [ 0 ] = 1 ; ( z - 1 ) X ^ { + } ( z )$ có điểm cực $z = 2$ không áp dụng được (áp dụng hình thức sẽ cho 0); $x [ n ] = 1 . 5 \delta [ n ] - 0 . 5 \cdot 2 ^ { n }$ tức là $x [ n ] = - 2 ^ { n - 1 } \to - \infty$ với $n \geq 1$ 

Bài 24: (a) $z ^ { 2 } [ Y ^ { + } ( z ) - y [ 0 ] - y [ 1 ] z ^ { - 1 } ] = z [ Y ^ { + } ( z ) - y [ 0 ] ] + Y ^ { + } ( z ) ( $ , suy ra <sup>Y+(z)</sup> <sup>=</sup> <sup>z</sup>z<sup>2</sup> z 1 <sup>= z−</sup>1 z−<sup>1</sup> z−<sup>2</sup> (b) Các điểm cực ${ \varphi } = \textstyle \frac { 1 + \sqrt { 5 } } { 2 } , { \psi } = \textstyle \frac { 1 - \sqrt { 5 } } { 2 } ; { Y } ^ { + } ( z ) = \textstyle \frac { 1 } { \sqrt { 5 } } \left[ \frac { 1 } { 1 - { \varphi } z ^ { - 1 } } - \frac { 1 } { 1 - { \psi } z ^ { - 1 } } \right] ,$ $| z | > \varphi ,$ nên 

$$
y [ n ] = \frac {1}{\sqrt {5}} \left[ \left(\frac {1 + \sqrt {5}}{2}\right) ^ {n} - \left(\frac {1 - \sqrt {5}}{2}\right) ^ {n} \right], \quad n \geq 0
$$

$y [ 2 ] , \ldots , y [ 6 ] = 1 , 2 , 3 , 5 , 8 .$ . (c) $H ( z ) = { \frac { 1 } { 1 - z ^ { - 1 } - z ^ { - 2 } } } = z Y ^ { + } ( z )$ , có điểm cực ϕ  1.618 nằm ngoài vòng tròn đơn vị nên hệ thống không ổn định; theo tính chất dịch thời gian, $h [ n ] = y [ n + 1 ]$ , tăng theo $\varphi ^ { n }$ 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/ac43b01480d8849c382d1b41b30469b15ea600c0568d5f4d356c75f578081205.jpg)



(a) Dạng trực tiếp II


![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/0b1b234dc84b8b266e39d136330784e3d7ab57d6fd79c48b518eec5fa1070c3a.jpg)



(b) Ghép nối tiếp hai khâu bậc một



Hình 5.17. Sơ đồ thực hiện hệ thống trong đáp số bài tập 17


# Biến đổi Laplace

Biến đổi Laplace do nhà khoa học Pierre-Simon Laplace đưa ra vào năm 1812. Đây là phép biến đổi quan trọng, có vai trò tương đương với biến đổi z, khi phân tích và đánh giá tín hiệu và hệ thống LTI liên tục theo thời gian. Để tránh trùng lặp không cần thiết với các nội dung tương tự trong chương biến đổi z, chương này sẽ chỉ trình bày ngắn gọn về định nghĩa, tính chất, biến đổi Laplace thuận và ngược; mối liên quan giữa hàm truyền $H ( s )$ với các đặc trưng khác của hệ thống. Ngoài ra, biểu đồ Bode được trình bày như một công cụ để vẽ tay và phân tích đáp ứng tần số hệ thống. Cuối cùng, các bộ lọc tương tự khác nhau được giới thiệu, phân tích, và so sánh, đi kèm với quy trình thiết kế. Nội dung chương này có thể tham khảo thêm trong [1, 2]. 

## 6.1. Định nghĩa biến đổi Laplace và miền hội tụ

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/7b435f828d3ed67bbf8f0f328455d71c61ee035bf539bc500eebcb25d7716dbd.jpg)



Hình 6.1. Cặp biến đổi Laplace


Tín hiệu $x ( t )$ liên tục theo thời gian có thể được biểu diễn trên miền s qua cặp biến đổi Laplace (xem hình 6.1). 

$$
x (t) \xleftrightarrow {\mathcal {L}} X (s)
$$

trong đó s là biến số phức: $s = \sigma + j \Omega$ . Biến đổi Laplace thuận được định nghĩa theo công thức sau 

$$
X (s) := \int_ {- \infty} ^ {\infty} x (t) e ^ {- s t} d t\tag{6.1}
$$

Miền hội tụ của $X ( s )$ , ký hiệu: ${ \mathrm { R O C } } \{ X ( s ) \}$ , được định nghĩa là tập hợp các điểm s trên mặt phẳng phức sao cho tích phân trong (6.1) hội tụ. 

Ví dụ 6.1. Tìm biến đổi Laplace của $x ( t ) = e ^ { a t } u ( t )$ 

Lời giải. Theo định nghĩa, ta có 

$$
\begin{array}{r l} & X (s) = \int_ {- \infty} ^ {\infty} e ^ {a t} u (t) e ^ {- s t} d t \\ & \qquad = \int_ {0} ^ {\infty} e ^ {(a - s) t} d t \\ & \qquad = \left. \frac {e ^ {(a - s) t}}{a - s} \right| _ {0} ^ {\infty} \end{array}
$$

Do lim $_ { 1 \to \infty } e ^ { ( a - s ) t } = 0$ khi $\mathrm { R e } \{ a - s \} < 0$ nên 

$$
X (s) = \frac {1}{s - a}, \quad \mathrm{Re} \{s \} > \mathrm{Re} \{a \}
$$

Miền hội tụ của $X ( s ) : { \mathrm { R e } } \{ s \} > { \mathrm { R e } } \{ a \}$ chính là nửa mặt phẳng bên phải (phần gạch chéo như minh họa trong hình $6 . 2 ( \mathrm { a } ) )$ .  

![image](https://cdn-mineru.openxlab.org.cn/result/2026-10-30/4e7866ea-425b-4b11-975b-cd3ba0e971a3/a0b5034e4b14c96d31bc8c4cf4ae9324c5c83e2fc3e6540be8b7b0f14e5a611f.jpg)



Hình 6.2. Các dạng miền hội tụ (phần gạch chéo) trong biến đổi Laplace: (a) nửa mặt phẳng bên phải; (b) nửa mặt phẳng bên trái; (c) dải song song với trục ảo


## 6.1.1. Liên hệ với biến đổi Fourier

Quan sát công thức định nghĩa của biến đổi Laplace và biến đổi Fourier, ta dễ thấy biến đổi Fourier chính là biến đổi Laplace xét trên trục ảo $s = j \Omega$ , khi trục ảo nằm trong miền hội tụ của $X ( s )$ 

$$
X (j \Omega) = X (s) | _ {s = j \Omega}\tag{6.2}
$$

Và ngược lại, biến đổi Laplace là biến đổi Fourier của $x ( t ) e ^ { - \sigma t }$ , với $s = \sigma + j \Omega$ 

$$
X (s) = \int_ {- \infty} ^ {\infty} x (t) e ^ {- (\sigma + j \Omega) t} d t = \mathrm{FT} \{x (t) e ^ {- \sigma t} \}\tag{6.3}
$$

Do đó, miền hội tụ cũng chính là những giá trị của s trên mặt phẳng phức sao cho tồn tại biến đổi Fourier của $x ( t ) e ^ { - \sigma t }$ . Điều kiện hội tụ: 

$$
\int_ {- \infty} ^ {\infty} | x (t) e ^ {- \sigma t} | d t <   \infty
$$