Chúng ta đã thấy trong (2.8) rằng cách đặt hợp lý cực đại cho tham số $\mu$ trong phân bố Bernoulli, và do đó trong phân bố nhị thức, được cho bởi tỷ lệ các quan sát trong tập dữ liệu có $x = 1$. Như chúng tôi đã lưu ý, điều này có thể cho kết quả quá khớp nghiêm trọng đối với các tập dữ liệu nhỏ. Để phát triển một xử lý Bayes cho vấn đề này, chúng ta cần giới thiệu một phân bố tiên nghiệm $p ( \mu )$ trên tham số $\mu$. Ở đây chúng ta xem xét một dạng phân bố tiên nghiệm có một diễn giải đơn giản cũng như một số tính chất phân tích hữu ích. Để tạo động lực cho tiên nghiệm này, chúng ta lưu ý rằng hàm hợp lý có dạng tích của các nhân tử có dạng $\mu ^ { x } ( 1 - \mu ) ^ { 1 - x }$. Nếu chúng ta chọn một tiên nghiệm tỷ lệ với các lũy thừa của $\mu$ và $( 1 - \mu )$, thì phân bố hậu nghiệm, tỷ lệ với tích của tiên nghiệm và hàm hợp lý, sẽ có cùng dạng hàm với tiên nghiệm. Tính chất này được gọi là tính liên hợp và chúng ta sẽ thấy một số ví dụ về nó sau này trong chương này. Do đó chúng ta chọn một tiên nghiệm, được gọi là phân bố beta, cho bởi

$$\operatorname{Beta} (\mu | a, b) = \frac {\Gamma (a + b)}{\Gamma (a) \Gamma (b)} \mu^ {a - 1} (1 - \mu) ^ {b - 1}\tag{2.13}$$

Exercise 2.5

trong đó $\Gamma ( x )$ là hàm gamma được định nghĩa bởi (1.141), và hệ số trong (2.13) đảm bảo rằng phân bố beta được chuẩn hóa, sao cho

$$\int_ {0} ^ {1} \operatorname{Beta} (\mu | a, b) \mathrm{d} \mu = 1.\tag{2.14}$$

Exercise 2.6

Trung bình và phương sai của phân bố beta được cho bởi

$$\mathbb {E} [ \mu ] = \frac {a}{a + b}\tag{2.15}$$

$$\operatorname{var} [ \mu ] = \frac {a b}{(a + b) ^ {2} (a + b + 1)}.\tag{2.16}$$

Các tham số $a$ và $b$ thường được gọi là siêu tham số vì chúng kiểm soát phân bố của tham số $\mu$. Hình 2.2 cho thấy các biểu đồ của phân bố beta cho các giá trị khác nhau của các siêu tham số.

Phân bố hậu nghiệm của $\mu$ bây giờ được thu được bằng cách nhân tiên nghiệm beta (2.13) với hàm hợp lý nhị thức (2.9) và chuẩn hóa. Chỉ giữ lại các nhân tử phụ thuộc vào $\mu$, chúng ta thấy rằng phân bố hậu nghiệm này có dạng

$$p (\mu | m, l, a, b) \propto \mu^ {m + a - 1} (1 - \mu) ^ {l + b - 1}\tag{2.17}$$

![image](images/part-001--4c8a5439a3e7888bb44f36a9885166abc81daf5610251037dff4cf0070cecd49.jpg)

![image](images/part-001--c1cbd5a0cf1c24ea9d8a4e1f0466b27388794abd7a8955e4211af0cc2070098d.jpg)

![image](images/part-001--fe20412799fb050d21b0f565ae66cdcc10e689b0411d96736057ffdf0566379f.jpg)

![image](images/part-001--dc8c72d4f11b6145211bb793ec67bf4abf196b5c394c843a8ab92853a439d979.jpg)

Hình 2.2 Các biểu đồ của phân bố beta Beta $\scriptstyle ( \mu | a , b )$ được cho bởi (2.13) như một hàm của $\mu$ cho các giá trị khác nhau của các siêu tham số a và b.

trong đó $l = N - m$, và do đó tương ứng với số lần 'sấp' trong ví dụ về đồng xu. Chúng ta thấy rằng (2.17) có sự phụ thuộc hàm số giống như phân bố tiên nghiệm trên $\mu$, phản ánh các tính chất liên hợp của tiên nghiệm với hàm hợp lý. Thực tế, nó chỉ là một phân bố beta khác, và hệ số chuẩn hóa của nó có thể được thu được bằng cách so sánh với (2.13) để cho

$$p (\mu | m, l, a, b) = \frac {\Gamma (m + a + l + b)}{\Gamma (m + a) \Gamma (l + b)} \mu^ {m + a - 1} (1 - \mu) ^ {l + b - 1}.\tag{2.18}$$

Chúng ta thấy rằng tác dụng của việc quan sát một tập dữ liệu gồm $m$ quan sát của $x = 1$ và l quan sát của $x = 0$ là tăng giá trị của $a$ bởi $m$, và giá trị của b bởi l, khi chuyển từ phân bố tiên nghiệm sang phân bố hậu nghiệm. Điều này cho phép chúng ta cung cấp một diễn giải đơn giản của các siêu tham số $a$ và $b$ trong tiên nghiệm như một số quan sát hiệu dụng của $x = 1$ và $x = 0$, tương ứng. Lưu ý rằng a và $b$ không nhất thiết phải là số nguyên. Hơn nữa, phân bố hậu nghiệm có thể hoạt động như tiên nghiệm nếu chúng ta sau đó quan sát dữ liệu bổ sung. Để thấy điều này, chúng ta có thể tưởng tượng lấy quan sát một cách từng cái một và sau mỗi quan sát cập nhật phân bố hậu nghiệm hiện tại bằng cách nhân với hàm hợp lý cho quan sát mới và sau đó chuẩn hóa để thu được phân bố hậu nghiệm mới, được sửa đổi. Ở mỗi giai đoạn, hậu nghiệm là một phân bố beta với một số lượng tổng (tiên nghiệm và quan sát thực tế) các giá trị quan sát cho $x = 1$ và $x = 0$ được cho bởi các tham số a và b. Kết hợp một quan sát bổ sung của $x = 1$ chỉ đơn giản tương ứng với tăng giá trị của a lên 1, trong khi đối với một quan sát của $x = 0$ chúng ta tăng b lên 1. Hình 2.3 minh họa một bước trong quy trình này.

![image](images/part-001--1daefc0dc1bcd485ccfbdf6222eaae37410cc495966bb266fd0724995ff6bbf2.jpg)

Hình 2.3 Minh họa một bước của suy luận Bayes tuần tự. Tiên nghiệm được cho bởi một phân bố beta với các tham số $a = 2 , b = 2$, và hàm hợp lý, được cho bởi (2.9) với $N = m = 1$, tương ứng với một quan sát duy nhất của $x = 1$, sao cho hậu nghiệm được cho bởi một phân bố beta với các tham số $a = 3 , b = 2$

Chúng ta thấy rằng phương pháp tuần tự này để học phát sinh tự nhiên khi chúng ta áp dụng quan điểm Bayes. Nó độc lập với lựa chọn của tiên nghiệm và hàm hợp lý và chỉ phụ thuộc vào giả định về dữ liệu i.i.d. Các phương pháp tuần tự sử dụng quan sát một cách từng cái một, hoặc theo lô nhỏ, và sau đó loại bỏ chúng trước khi sử dụng các quan sát tiếp theo. Chúng có thể được sử dụng, chẳng hạn, trong các tình huống học tập thời gian thực nơi một luồng dữ liệu ổn định đến, và dự đoán phải được thực hiện trước khi tất cả dữ liệu được xem. Vì chúng không yêu cầu toàn bộ tập dữ liệu được lưu trữ hoặc tải vào bộ nhớ, các phương pháp tuần tự cũng hữu ích cho các tập dữ liệu lớn. Các phương pháp hợp lý cực đại cũng có thể được đưa vào một khung tuần tự.

Nếu mục tiêu của chúng ta là dự đoán, tốt nhất có thể, kết quả của thử nghiệm tiếp theo, thì chúng ta phải đánh giá phân bố dự đoán của x, cho trước tập dữ liệu quan sát $\mathcal { D }$. Từ các quy tắc tổng và tích của xác suất, điều này có dạng

$$p (x = 1 | \mathcal {D}) = \int_ {0} ^ {1} p (x = 1 | \mu) p (\mu | \mathcal {D}) \mathrm{d} \mu = \int_ {0} ^ {1} \mu p (\mu | \mathcal {D}) \mathrm{d} \mu = \mathbb {E} [ \mu | \mathcal {D} ].\tag{2.19}$$

Sử dụng kết quả (2.18) cho phân bố hậu nghiệm $p ( \mu | \mathcal { D } )$, cùng với kết quả (2.15) cho trung bình của phân bố beta, chúng ta thu được

$$p (x = 1 | \mathcal {D}) = \frac {m + a}{m + a + l + b}\tag{2.20}$$

có một diễn giải đơn giản như tỷ lệ tổng các quan sát (cả quan sát thực tế và quan sát tiên nghiệm hư cấu) tương ứng với $x = 1$. Lưu ý rằng trong giới hạn của một tập dữ liệu vô cùng lớn m, $l \to \infty$ kết quả (2.20) giảm xuống kết quả hợp lý cực đại (2.8). Như chúng ta sẽ thấy, nó là một tính chất rất chung rằng các kết quả Bayes và hợp lý cực đại sẽ đồng ý trong giới hạn của một tập dữ liệu vô cùng lớn. Đối với một tập dữ liệu hữu hạn, trung bình hậu nghiệm cho $\mu$ luôn nằm giữa trung bình tiên nghiệm và ước tính hợp lý cực đại cho $\mu$ tương ứng với tần số tương đối của các sự kiện được cho bởi (2.7).

Từ Hình 2.2, chúng ta thấy rằng khi số lượng quan sát tăng, phân bố hậu nghiệm trở nên tập trung hơn. Điều này cũng có thể được nhìn thấy từ kết quả (2.16) cho phương sai của phân bố beta, trong đó chúng ta thấy rằng phương sai bằng 0 cho $a \to \infty$ hoặc $b \to \infty$. Thực tế, chúng ta có thể tự hỏi liệu đó có phải là một tính chất chung của học Bayes hay không, rằng khi chúng ta quan sát ngày càng nhiều dữ liệu, sự không chắc chắn được biểu diễn bởi phân bố hậu nghiệm sẽ giảm dần.

Để giải quyết vấn đề này, chúng ta có thể áp dụng quan điểm tần suất của học Bayes và chỉ ra rằng, trung bình, một tính chất như vậy thực sự giữ. Xem xét một vấn đề suy luận Bayes tổng quát cho một tham số $\pmb \theta$ mà chúng ta đã quan sát một tập dữ liệu $\mathcal { D }$ được mô tả bởi phân bố chung $p ( \pmb \theta , \mathcal { D } )$. Kết quả sau đây

$$\mathbb {E} _{\boldsymbol {\theta}} [ \boldsymbol {\theta} ] = \mathbb {E} _{\mathcal {D}} \left[ \mathbb {E} _{\boldsymbol {\theta}} [ \boldsymbol {\theta} | \mathcal {D} ] \right]\tag{2.21}$$

trong đó

$$\mathbb {E} _{\boldsymbol {\theta}} [ \boldsymbol {\theta} ] \equiv \int p (\boldsymbol {\theta}) \boldsymbol {\theta} \mathrm{d} \boldsymbol {\theta}\tag{2.22}$$

$$\mathbb {E} _{\mathcal {D}} [ \mathbb {E} _{\boldsymbol {\theta}} [ \boldsymbol {\theta} | \mathcal {D} ] ] \equiv \int \left\{\int \boldsymbol {\theta} p (\boldsymbol {\theta} | \mathcal {D}) \mathrm{d} \boldsymbol {\theta} \right\} p (\mathcal {D}) \mathrm{d} \mathcal {D}\tag{2.23}$$

nói rằng trung bình hậu nghiệm của $\theta$, lấy trung bình trên phân bố tạo ra dữ liệu, bằng trung bình tiên nghiệm của $\pmb { \theta }$. Tương tự, chúng ta có thể chỉ ra rằng

$$\operatorname{var} _{\boldsymbol {\theta}} [ \boldsymbol {\theta} ] = \mathbb {E} _{\mathcal {D}} \left[ \operatorname{var} _{\boldsymbol {\theta}} [ \boldsymbol {\theta} | \mathcal {D} ] \right] + \operatorname{var} _{\mathcal {D}} \left[ \mathbb {E} _{\boldsymbol {\theta}} [ \boldsymbol {\theta} | \mathcal {D} ] \right].\tag{2.24}$$

Số hạng ở phía bên trái của (2.24) là phương sai tiên nghiệm của $\pmb { \theta }$. Ở phía bên phải, số hạng đầu tiên là phương sai hậu nghiệm trung bình của $\theta$, và số hạng thứ hai đo lường phương sai trong trung bình hậu nghiệm của $\pmb \theta$. Bởi vì phương sai này là một lượng dương, kết quả này cho thấy rằng, trung bình, phương sai hậu nghiệm của $\pmb \theta$ nhỏ hơn phương sai tiên nghiệm. Sự giảm phương sai lớn hơn nếu phương sai trong trung bình hậu nghiệm lớn hơn. Tuy nhiên, lưu ý rằng kết quả này chỉ giữ trung bình, và rằng đối với một tập dữ liệu quan sát cụ thể, có thể phương sai hậu nghiệm lớn hơn phương sai tiên nghiệm.