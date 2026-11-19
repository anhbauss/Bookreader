Sau khi tốt nghiệp từ Michigan và MIT, Shannon gia nhập các phòng thí nghiệm Bell Telephone của AT&T vào năm 1941. Bài báo của ông 'A Mathematical Theory of Communication' được công bố trên Bell System Technical Journal năm 1948 đã đặt nền tảng cho lý thuyết thông tin hiện đại. Bài báo này giới thiệu từ 'bit', và khái niệm của ông rằng thông tin có thể được gửi dưới dạng một luồng các số 1 và 0 đã mở đường cho cuộc cách mạng thông tin liên lạc. Người ta nói rằng von Neumann đã khuyến khích Shannon sử dụng thuật ngữ entropy, không chỉ vì độ tương đồng của nó với đại lượng được sử dụng trong vật lý, mà còn vì "không ai biết entropy thực sự là gì, vì vậy trong bất kỳ cuộc thảo luận nào, bạn sẽ luôn có lợi thế".

Figure 1.31 Một hàm lồi $f ( x )$ là hàm mà mọi dây cung (được hiển thị bằng màu xanh lam) nằm trên hoặc phía trên hàm (được hiển thị bằng màu đỏ).

![image](images/part-001--f7b3cc28083dd963e74a527a92ba21998cc66ad95919c500b6db743fc4bd2ae7.jpg)

và giá trị tương ứng của hàm là $f \left( \lambda a + ( 1 - \lambda ) b \right)$ . Tính lồi khi đó ngụ ý

$$f (\lambda a + (1 - \lambda) b) \leqslant \lambda f (a) + (1 - \lambda) f (b).\tag{1.114}$$

Điều này tương đương với yêu cầu rằng đạo hàm cấp hai của hàm phải dương ở mọi nơi. Ví dụ về các hàm lồi là x ln x (cho $x > 0 $) và $x ^ { 2 }$ . Một hàm được gọi là lồi chặt nếu đẳng thức được thỏa mãn chỉ khi $\lambda = 0$ và $\lambda = 1$ Nếu một hàm có tính chất ngược lại, cụ thể là mọi dây cung nằm trên hoặc phía dưới hàm, nó được gọi là lõm, với định nghĩa tương ứng cho lõm chặt. Nếu một hàm $f ( x )$ là lồi, thì $- f ( x )$ sẽ là lõm.

Sử dụng kỹ thuật chứng minh bằng quy nạp, chúng ta có thể chỉ ra từ (1.114) rằng một hàm lồi $f ( x )$ thỏa mãn

$$f \left(\sum_ {i = 1} ^ {M} \lambda_ {i} x _ {i}\right) \leqslant \sum_ {i = 1} ^ {M} \lambda_ {i} f (x _ {i})\tag{1.115}$$

trong đó $\lambda _ { i } ~ \geqslant ~ 0$ và $\textstyle \sum _ { i } \lambda _ { i } = 1$ , cho bất kỳ tập hợp điểm nào $\{ x _ { i } \}$ . Kết quả (1.115) được gọi là bất đẳng thức Jensen. Nếu chúng ta diễn giải $\lambda _ { i }$ như là phân phối xác suất trên một biến rời rạc x nhận các giá trị $\{ x _ { i } \}$ , thì (1.115) có thể được viết

$$f \left(\mathbb {E} [ x ]\right) \leqslant \mathbb {E} [ f (x) ]\tag{1.116}$$

trong đó $\mathbb { E } [ \cdot ]$ biểu thị kỳ vọng. Đối với các biến liên tục, bất đẳng thức Jensen có dạng

$$f \left(\int \mathbf {x} p (\mathbf {x}) \mathrm{d} \mathbf {x}\right) \leqslant \int f (\mathbf {x}) p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{1.117}$$

Chúng ta có thể áp dụng bất đẳng thức Jensen dưới dạng (1.117) cho độ phân kỳ Kullback-Leibler (1.113) để có được

$$\mathrm{KL} (p \| q) = - \int p (\mathbf {x}) \ln \left\{\frac {q (\mathbf {x})}{p (\mathbf {x})} \right\} \mathrm{d} \mathbf {x} \geqslant - \ln \int q (\mathbf {x}) \mathrm{d} \mathbf {x} = 0\tag{1.118}$$

trong đó chúng ta đã sử dụng thực tế rằng ln x là một hàm lồi, cùng với điều kiện chuẩn hóa $\begin{array} { r } { \int q ( \mathbf { x } ) \mathrm { d } \mathbf { x } = 1 } \end{array}$ . Thực tế, ln x là một hàm lồi chặt, vì vậy đẳng thức sẽ giữ nếu, và chỉ nếu, $q ( \mathbf { x } ) = p ( \mathbf { x } )$ với tất cả $\mathbf { x } .$ Do đó chúng ta có thể diễn giải độ phân kỳ Kullback-Leibler như một thước đo sự khác biệt giữa hai phân phối $p ( \mathbf { x } )$ và $q ( \mathbf { x } )$

Chúng ta thấy rằng có một mối quan hệ chặt chẽ giữa nén dữ liệu và ước tính mật độ (tức là, bài toán mô hình hóa một phân phối xác suất chưa biết) vì nén hiệu quả nhất được đạt khi chúng ta biết phân phối thực. Nếu chúng ta sử dụng một phân phối khác với phân phối thực, thì chúng ta nhất thiết phải có một mã hóa kém hiệu quả hơn, và trung bình, thông tin bổ sung phải được truyền là (ít nhất) bằng độ phân kỳ Kullback-Leibler giữa hai phân phối.

Giả sử rằng dữ liệu đang được tạo từ một phân phối chưa biết $p ( \mathbf { x } )$ mà chúng ta muốn mô hình hóa. Chúng ta có thể cố gắng xấp xỉ phân phối này bằng cách sử dụng một số phân phối tham số $q ( \mathbf { x } | \mathbf { \theta } )$ , được điều chỉnh bởi một tập hợp các tham số có thể điều chỉnh $\theta ,$ ví dụ như một Gaussian đa biến. Một cách để xác định $\pmb \theta$ là giảm thiểu độ phân kỳ Kullback-Leibler giữa $p ( \mathbf { x } )$ và $q ( \mathbf { x } | \mathbf { \theta } )$ với liên quan đến $\theta .$ Chúng ta không thể làm điều này trực tiếp vì chúng ta không biết $p ( \mathbf { x } )$ . Tuy nhiên, giả sử rằng chúng ta đã quan sát một tập hợp hữu hạn các điểm huấn luyện $\mathbf { x } _ { n } .$ , cho $n = 1 , \ldots , N$ , được rút ra từ $p ( \mathbf { x } )$ . Khi đó, kỳ vọng liên quan đến $p ( \mathbf { x } )$ có thể được xấp xỉ bằng một tổng hữu hạn trên các điểm này, sử dụng (1.35), sao cho

$$\mathrm{KL} (p \| q) \simeq \sum_ {n = 1} ^ {N} \left\{- \ln q (\mathbf {x} _ {n} | \boldsymbol {\theta}) + \ln p (\mathbf {x} _ {n}) \right\}.\tag{1.119}$$

Số hạng thứ hai ở bên tay phải của (1.119) độc lập với $\theta _ { ; }$ , và số hạng thứ nhất là hàm log-likelihood âm cho θ theo phân phối $q ( \mathbf { x } | \mathbf { \theta } )$ được đánh giá bằng cách sử dụng tập huấn luyện. Do đó, chúng ta thấy rằng giảm thiểu độ phân kỳ Kullback-Leibler này tương đương với tối đa hóa hàm likelihood.

Bây giờ hãy xem xét phân phối chung giữa hai tập hợp các biến x và y được cho bởi $p ( \mathbf x , \mathbf y )$ . Nếu các tập hợp biến là độc lập, thì phân phối chung của chúng sẽ phân tích thành tích của các biên của chúng $p ( \mathbf { x } , \mathbf { y } ) = p ( \mathbf { x } ) p ( \mathbf { y } )$ . Nếu các biến không độc lập, chúng ta có thể có được một ý tưởng về liệu chúng có 'gần' độc lập hay không bằng cách xem xét độ phân kỳ Kullback-Leibler giữa phân phối chung và tích của các biên, được cho bởi

$$\begin{array}{r c l} \mathrm{I} [ \mathbf {x}, \mathbf {y} ] & \equiv & \mathrm{KL} (p (\mathbf {x}, \mathbf {y}) \| p (\mathbf {x}) p (\mathbf {y})) \\ & = & - \iint p (\mathbf {x}, \mathbf {y}) \ln \left(\frac {p (\mathbf {x}) p (\mathbf {y})}{p (\mathbf {x} , \mathbf {y})}\right) \mathrm{d} \mathbf {x} \mathrm{d} \mathbf {y} \end{array}\tag{1.120}$$

được gọi là thông tin lẫn nhau giữa các biến x và $\mathbf { y }$ . Từ các tính chất của độ phân kỳ Kullback-Leibler, chúng ta thấy rằng $I ( \mathbf { x } , \mathbf { y } ) \geqslant 0$ với đẳng thức nếu, và chỉ nếu, x và $\mathbf { y }$ là độc lập. Sử dụng các quy tắc tổng và tích của xác suất, chúng ta thấy rằng thông tin lẫn nhau có liên quan đến entropy có điều kiện thông qua

Exercise 1.41

$$\operatorname{I} [ \mathbf {x}, \mathbf {y} ] = \operatorname{H} [ \mathbf {x} ] - \operatorname{H} [ \mathbf {x} | \mathbf {y} ] = \operatorname{H} [ \mathbf {y} ] - \operatorname{H} [ \mathbf {y} | \mathbf {x} ].\tag{1.121}$$

Do đó, chúng ta có thể xem thông tin lẫn nhau như là sự giảm bớt trong sự không chắc chắn về x nhờ được biết giá trị của y (hoặc ngược lại). Từ quan điểm Bayesian, chúng ta có thể xem $p ( \mathbf { x } )$ như là phân phối tiên nghiệm cho x và $p ( \mathbf { x } | \mathbf { y } )$ như là phân phối hậu nghiệm sau khi chúng ta đã quan sát dữ liệu mới y. Thông tin lẫn nhau do đó biểu thị sự giảm bớt trong sự không chắc chắn về x như một hệ quả của quan sát mới $\mathbf { y }$ .