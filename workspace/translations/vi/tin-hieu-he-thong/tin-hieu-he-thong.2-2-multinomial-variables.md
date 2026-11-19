Các biến nhị phân có thể được sử dụng để mô tả các đại lượng có thể nhận một trong hai giá trị có thể. Tuy nhiên, thường xuyên chúng ta gặp các biến rời rạc có thể nhận một trong K trạng thái loại trừ lẫn nhau. Mặc dù có nhiều cách khác nhau để biểu diễn các biến như vậy, chúng ta sẽ sớm thấy rằng một biểu diễn đặc biệt tiện lợi là lược đồ 1-of-K, trong đó biến được biểu diễn bởi một vectơ K chiều x mà một trong các phần tử $x _ { k }$ bằng 1, và tất cả các phần tử còn lại bằng 0. Vì vậy, chẳng hạn nếu chúng ta có một biến có thể nhận $K = 6$ trạng thái và một quan sát cụ thể của biến tương ứng với trạng thái trong đó $x _ { 3 } = 1$, thì x sẽ được biểu diễn bởi

$$\mathbf {x} = (0, 0, 1, 0, 0, 0) ^ {\mathrm{T}}.\tag{2.25}$$

Lưu ý rằng những vectơ như vậy thỏa mãn $\textstyle \sum _ { k = 1 } ^ { K } x _ { k } = 1$. Nếu chúng ta ký hiệu xác suất của $x _ { k } = 1$ bằng tham số $\mu _ { k }$, thì phân phối của x được cho bởi

$$p (\mathbf {x} | \boldsymbol {\mu}) = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {x _ {k}}\tag{2.26}$$

trong đó $\pmb { \mu } = ( \mu _ { 1 } , \ldots , \mu _ { K } ) ^ { \mathrm { T } }$, và các tham số $\mu _ { k }$ bị ràng buộc thỏa mãn $\mu _ { k } \geqslant 0$ và $\textstyle \sum _ { k } \mu _ { k } = 1$, vì chúng đại diện cho các xác suất. Phân phối (2.26) có thể được coi là một sự tổng quát hóa của phân phối Bernoulli sang nhiều hơn hai kết quả. Có thể dễ dàng thấy rằng phân phối được chuẩn hóa

$$\sum_ {\mathbf {x}} p (\mathbf {x} | \boldsymbol {\mu}) = \sum_ {k = 1} ^ {K} \mu_ {k} = 1\tag{2.27}$$

và rằng

$$\mathbb {E} [ \mathbf {x} | \boldsymbol {\mu} ] = \sum_ {\mathbf {x}} p (\mathbf {x} | \boldsymbol {\mu}) \mathbf {x} = (\mu_ {1}, \dots , \mu_ {M}) ^ {\mathrm{T}} = \boldsymbol {\mu}.\tag{2.28}$$

Bây giờ hãy xem xét một tập dữ liệu $\mathcal { D }$ gồm N quan sát độc lập $\mathbf { x } _ { 1 } , \ldots , \mathbf { x } _ { N }$. Hàm likelihood tương ứng có dạng

$$p (\mathcal {D} | \boldsymbol {\mu}) = \prod_ {n = 1} ^ {N} \prod_ {k = 1} ^ {K} \mu_ {k} ^ {x _ {n k}} = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {\left(\sum_ {n} x _ {n k}\right)} = \prod_ {k = 1} ^ {K} \mu_ {k} ^ {m _ {k}}.\tag{2.29}$$

Chúng ta thấy rằng hàm likelihood chỉ phụ thuộc vào N điểm dữ liệu thông qua K đại lượng

$$m _ {k} = \sum_ {n} x _ {n k}\tag{2.30}$$

đó là số lượng quan sát của $x _ { k } = 1$. Chúng được gọi là các thống kê đủ cho phân phối này.

Để tìm giải pháp hợp lý tối đa cho $\mu$, chúng ta cần cực đại hóa ln $p ( \mathcal { D } | \boldsymbol { \mu } )$ đối với $\mu _ { k }$ có tính đến ràng buộc rằng $\mu _ { k }$ phải tổng bằng một. Điều này có thể đạt được bằng cách sử dụng một nhân tử Lagrange λ và cực đại hóa

$$\sum_ {k = 1} ^ {K} m _ {k} \ln \mu_ {k} + \lambda \left(\sum_ {k = 1} ^ {K} \mu_ {k} - 1\right).\tag{2.31}$$

Đặt đạo hàm của (2.31) đối với $\mu _ { k }$ bằng không, chúng ta thu được

$$\mu_ {k} = - m _ {k} / \lambda .\tag{2.32}$$

Chúng ta có thể giải quyết nhân tử Lagrange λ bằng cách thay thế (2.32) vào ràng buộc $\textstyle \sum _ { k } \mu _ { k } = 1$ để thu được $\lambda = - N$. Do đó chúng ta thu được giải pháp hợp lý tối đa dưới dạng

$$\mu_ {k} ^ {\mathrm{ML}} = \frac {m _ {k}}{N}\tag{2.33}$$

đó là phân số của N quan sát mà $x _ { k } = 1$.

Chúng ta có thể xem xét phân phối kết hợp của các đại lượng $m _ { 1 } , \ldots , m _ { K }$, có điều kiện trên các tham số $\pmb { \mu }$ và trên tổng số $N$ quan sát. Từ (2.29) cái này có dạng

$$\mathrm{Mult} (m _ {1}, m _ {2}, \ldots , m _ {K} | \boldsymbol {\mu}, N) = \binom {N} {m _ {1} m _ {2} \ldots m _ {K}} \prod_ {k = 1} ^ {K} \mu_ {k} ^ {m _ {k}}\tag{2.34}$$

đó được biết đến như phân phối đa thức. Hệ số chuẩn hóa là số cách phân chia N đối tượng thành K nhóm có kích thước $m _ { 1 } , \ldots , m _ { K }$ và được cho bởi

$$\binom{N}{m _ {1} m _ {2} \ldots m _ {K}} = \frac {N !}{m _ {1} ! m _ {2} ! \ldots m _ {K} !}.\tag{2.35}$$

Lưu ý rằng các biến $m _ { k }$ phải tuân thủ ràng buộc

$$\sum_ {k = 1} ^ {K} m _ {k} = N.\tag{2.36}$$