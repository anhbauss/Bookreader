Chúng tôi đã thấy cách mà vấn đề của việc khớp đường cong đa thức có thể được biểu diễn dưới dạng cực tiểu hóa lỗi. Ở đây chúng tôi quay lại ví dụ khớp đường cong và xem xét nó từ một góc nhìn xác suất, từ đó thu được một số hiểu biết về các hàm lỗi và chính quy hóa, cũng như đưa chúng ta hướng tới một xử lý Bayes đầy đủ.

Mục tiêu trong vấn đề khớp đường cong là có khả năng đưa ra dự đoán cho biến mục tiêu t với một giá trị mới nào đó của biến đầu vào x dựa trên tập hợp dữ liệu huấn luyện bao gồm N giá trị đầu vào $\mathbf { x } = ( x _ { 1 } , \hdots , x _ { N } ) ^ { \mathrm { T } }$ và các giá trị mục tiêu tương ứng của chúng $\mathbf { t } = \widehat { \mathbf { \Omega } } ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . Chúng ta có thể biểu diễn sự không chắc chắn của chúng ta về giá trị của biến mục tiêu bằng cách sử dụng một phân bố xác suất. Cho mục đích này, chúng tôi sẽ giả định rằng, cho định giá trị của x, giá trị tương ứng của t có phân bố Gaussian với một trung bình bằng với giá trị $y ( x , \mathbf { w } )$ của đường cong đa thức được cho bởi (1.1). Do đó chúng tôi có

p (t | x, \mathbf {w}, \beta) = \mathcal {N} \left(t | y (x, \mathbf {w}), \beta^ {- 1}\right)\tag{1.60}

trong đó, để phù hợp với ký hiệu trong các chương sau, chúng tôi đã định nghĩa một tham số độ chính xác $\beta$ tương ứng với phương sai nghịch đảo của phân bố. Điều này được minh họa theo sơ đồ trong Hình 1.16.

Hình 1.16 Minh họa sơ đồ phân bố điều kiện Gaussian cho t với x được cho bởi (1.60), trong đó trung bình được cho bởi hàm đa thức $y ( x , \mathbf { w } )$ , và độ chính xác được cho bởi tham số $\beta ,$ liên quan đến phương sai bằng $\beta ^ { - 1 } = \sigma ^ { 2 }$

![image](images/part-001--cdcd50ad150a67ee39fd088cac86127ec7d53bf5a6c2d73a3fc523ee623bac0f.jpg)

Bây giờ chúng tôi sử dụng dữ liệu huấn luyện $\{ { \pmb x } , { \pmb t } \}$ để xác định các giá trị của các tham số chưa biết w và $\beta$ bằng cách sử dụng khả năng tối đa. Nếu giả định rằng dữ liệu được rút ra một cách độc lập từ phân bố (1.60), thì hàm khả năng được cho bởi

p (\mathbf {t} | \mathbf {x}, \mathbf {w}, \beta) = \prod_ {n = 1} ^ {N} \mathcal {N} \left(t _ {n} | y (x _ {n}, \mathbf {w}), \beta^ {- 1}\right).\tag{1.61}

Như chúng tôi đã làm trong trường hợp của phân bố Gaussian đơn giản trước đó, sẽ thuận tiện hơn nếu cực đại hóa logarit của hàm khả năng. Thay thế cho dạng của phân bố Gaussian, được cho bởi (1.46), chúng tôi thu được hàm khả năng logarit dưới dạng

\ln p (\mathbf {t} | \mathbf {x}, \mathbf {w}, \beta) = - \frac {\beta}{2} \sum_ {n = 1} ^ {N} \left\{y (x _ {n}, \mathbf {w}) - t _ {n} \right\} ^ {2} + \frac {N}{2} \ln \beta - \frac {N}{2} \ln (2 \pi).\tag{1.62}

Xem xét trước tiên việc xác định giải pháp khả năng tối đa cho các hệ số đa thức, sẽ được ký hiệu là $\mathbf { w } _ { \mathrm { M L } }$ . Những cái này được xác định bằng cách cực đại hóa (1.62) với respect tới w. Cho mục đích này, chúng ta có thể bỏ qua hai số hạng cuối cùng ở phía bên phải của (1.62) vì chúng không phụ thuộc vào w. Ngoài ra, chúng ta lưu ý rằng việc chia tỷ lệ logarit khả năng bằng một hệ số hệ số dương không làm thay đổi vị trí của cực đại với respect tới w, và do đó chúng ta có thể thay thế hệ số $\beta / 2$ bằng $1 / 2$ . Cuối cùng, thay vì cực đại hóa logarit khả năng, chúng ta có thể tương đương cực tiểu hóa logarit khả năng âm. Do đó chúng ta thấy rằng cực đại hóa khả năng là tương đương, liên quan đến việc xác định w, với việc cực tiểu hóa hàm lỗi tổng bình phương được định nghĩa bởi (1.2). Do đó hàm lỗi tổng bình phương đã phát sinh như một hệ quả của việc cực đại hóa khả năng dưới giả định của phân bố nhiễu Gaussian.

Chúng ta cũng có thể sử dụng khả năng tối đa để xác định tham số độ chính xác $\beta$ của phân bố điều kiện Gaussian. Cực đại hóa (1.62) với respect tới $\beta$ cho

\frac {1}{\beta_ {\mathrm{ML}}} = \frac {1}{N} \sum_ {n = 1} ^ {N} \left\{y (x _ {n}, \mathbf {w} _ {\mathrm{ML}}) - t _ {n} \right\} ^ {2}.\tag{1.63}

Một lần nữa chúng ta có thể trước tiên xác định vector tham số ${ \bf w } _ { \mathrm { M L } }$ điều chỉnh trung bình và sau đó sử dụng cái này để tìm độ chính xác $\beta _ { \mathrm { M L } }$ như là trường hợp đối với phân bố Gaussian đơn giản.

Đã xác định các tham số w và $\beta ,$ chúng ta bây giờ có thể đưa ra dự đoán cho các giá trị mới của x. Bởi vì chúng ta bây giờ có một mô hình xác suất, những cái này được biểu diễn dưới dạng phân bố dự đoán cho biết phân bố xác suất trên t, thay vì chỉ đơn giản là một ước tính điểm, và được thu được bằng cách thay thế các tham số khả năng tối đa vào (1.60) để cho

p (t | x, \mathbf {w} _ {\mathrm{ML}}, \beta_ {\mathrm{ML}}) = \mathcal {N} \left(t | y (x, \mathbf {w} _ {\mathrm{ML}}), \beta_ {\mathrm{ML}} ^ {- 1}\right).\tag{1.64}

Bây giờ chúng ta hãy thực hiện một bước hướng tới một cách tiếp cận Bayesian hơn và giới thiệu một phân bố tiền nghiệm trên các hệ số đa thức w. Để đơn giản, chúng ta hãy xem xét một phân bố Gaussian có dạng

p (\mathbf {w} | \alpha) = \mathcal {N} (\mathbf {w} | \mathbf {0}, \alpha^ {- 1} \mathbf {I}) = \left(\frac {\alpha}{2 \pi}\right) ^ {(M + 1) / 2} \exp \left\{- \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w} \right\}\tag{1.65}

trong đó $\alpha$ là độ chính xác của phân bố, và M+1 là tổng số phần tử trong vector w cho một đa thức bậc $M ^ { \mathrm { t h } }$ . Các biến như α, chúng kiểm soát phân bố của các tham số mô hình, được gọi là siêu tham số. Sử dụng định lý Bayes, phân bố hậu nghiệm cho w tỷ lệ với tích của phân bố tiền nghiệm và hàm khả năng

p (\mathbf {w} | \mathbf {x}, \mathbf {t}, \alpha , \beta) \propto p (\mathbf {t} | \mathbf {x}, \mathbf {w}, \beta) p (\mathbf {w} | \alpha).\tag{1.66}

Chúng ta bây giờ có thể xác định w bằng cách tìm giá trị có xác suất cao nhất của w với dữ liệu, nói cách khác bằng cách cực đại hóa phân bố hậu nghiệm. Kỹ thuật này được gọi là posteriori tối đa, hoặc đơn giản là MAP. Lấy logarit âm của (1.66) và kết hợp với (1.62) và (1.65), chúng tôi tìm thấy rằng cực đại của posteriori được cho bởi cực tiểu của

\frac {\beta}{2} \sum_ {n = 1} ^ {N} \{y (x _ {n}, \mathbf {w}) - t _ {n} \} ^ {2} + \frac {\alpha}{2} \mathbf {w} ^ {\mathrm{T}} \mathbf {w}.\tag{1.67}

Do đó chúng ta thấy rằng cực đại hóa phân bố hậu nghiệm tương đương với việc cực tiểu hóa hàm lỗi tổng bình phương chính quy hóa gặp phải trước đây ở dạng (1.4), với một tham số chính quy hóa được cho bởi $\lambda = \alpha / \beta$