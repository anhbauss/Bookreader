Cho đến nay, chúng ta đã thảo luận lý thuyết quyết định trong bối cảnh của các bài toán phân loại. Bây giờ chúng ta chuyển sang trường hợp của các bài toán hồi quy, chẳng hạn như ví dụ điều chỉnh đường cong được thảo luận trước đó. Giai đoạn quyết định bao gồm việc chọn một ước tính cụ thể $y ( \mathbf x )$ của giá trị của t cho mỗi đầu vào x. Giả sử rằng khi làm như vậy, chúng ta phải chịu một mất mát $L ( t , y ( \mathbf x ) )$ ). Mất mát trung bình, hoặc dự kiến, sau đó được cho bởi

$$\mathbb {E} [ L ] = \iint L (t, y (\mathbf {x})) p (\mathbf {x}, t) \mathrm{d} \mathbf {x} \mathrm{d} t.\tag{1.86}$$

Một lựa chọn phổ biến của hàm mất mát trong các bài toán hồi quy là mất mát bình phương được cho bởi $L ( t , y ( \mathbf { x } ) ) = \{ y ( \mathbf { x } ) - t \} ^ { 2 }$ . Trong trường hợp này, mất mát dự kiến có thể được viết

$$\mathbb {E} [ L ] = \iint \left\{y (\mathbf {x}) - t \right\} ^ {2} p (\mathbf {x}, t) \mathrm{d} \mathbf {x} \mathrm{d} t.\tag{1.87}$$

Mục tiêu của chúng ta là chọn $y ( \mathbf x )$ để giảm thiểu $\mathbb { E } [ L ]$ . Nếu chúng ta giả định một hàm hoàn toàn linh hoạt $y ( \mathbf x )$ , chúng ta có thể làm điều này chính thức bằng cách sử dụng phép tính biến phân để cho

$$\frac {\delta \mathbb {E} [ L ]}{\delta y (\mathbf {x})} = 2 \int \{y (\mathbf {x}) - t \} p (\mathbf {x}, t) d t = 0.\tag{1.88}$$

Giải cho $y ( \mathbf x )$ , và sử dụng các quy tắc tổng và tích của xác suất, chúng ta có được

$$y (\mathbf {x}) = \frac {\int t p (\mathbf {x} , t) \mathrm{d} t}{p (\mathbf {x})} = \int t p (t | \mathbf {x}) \mathrm{d} t = \mathbb {E} _ {t} [ t | \mathbf {x} ]\tag{1.89}$$

Figure 1.28

Hàm hồi quy $y ( x )$ giảm thiểu mất mát bình phương dự kiến, được cho bởi giá trị trung bình của phân phối điều kiện $p ( t | x )$

![image](images/part-001--6e74fe98d6a23cabcbcc54dc8f0ace098d0592d3dae53e4dcabee4ad0b89579f.jpg)

Exercise 1.25

đó là giá trị trung bình điều kiện của t được điều kiện hóa trên x và được gọi là hàm hồi quy. Kết quả này được minh họa trong Hình 1.28. Nó có thể dễ dàng được mở rộng thành nhiều biến đích được biểu diễn bằng vector t, trong trường hợp đó giải pháp tối ưu là giá trị trung bình điều kiện $\mathbf { y } ( \mathbf { x } ) = \mathbb { E } _ { t } [ \mathbf { t } | \mathbf { x } ]$

Chúng ta cũng có thể suy ra kết quả này theo một cách hơi khác, điều này cũng sẽ làm sáng tỏ bản chất của vấn đề hồi quy. Với kiến thức rằng giải pháp tối ưu là kỳ vọng điều kiện, chúng ta có thể mở rộng số hạng bình phương như sau

$$\begin{array}{r l} & {\left\{y (\mathbf {x}) - t \right\} ^ {2} = \left\{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] + \mathbb {E} [ t | \mathbf {x} ] - t \right\} ^ {2}} \\ & {= \left\{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] \right\} ^ {2} + 2 \{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] \} \{\mathbb {E} [ t | \mathbf {x} ] - t \} + \left\{\mathbb {E} [ t | \mathbf {x} ] - t \right\} ^ {2}} \end{array}$$

trong đó, để giữ cho ký hiệu không bị rối, chúng ta sử dụng $\mathbb { E } [ t | { \bf x } ]$ để ký hiệu $\mathbb { E } _ { t } [ t | \mathbf { x } ]$ . Thay thế vào hàm mất mát và thực hiện tích phân trên $t ,$ chúng ta thấy rằng số hạng chéo biến mất và chúng ta có được một biểu thức cho hàm mất mát ở dạng

$$\mathbb {E} [ L ] = \int \left\{y (\mathbf {x}) - \mathbb {E} [ t | \mathbf {x} ] \right\} ^ {2} p (\mathbf {x}) \mathrm{d} \mathbf {x} + \int \left\{\mathbb {E} [ t | \mathbf {x} ] - t \right\} ^ {2} p (\mathbf {x}) \mathrm{d} \mathbf {x}.\tag{1.90}$$

Hàm $y ( \mathbf x )$ chúng ta tìm cách xác định chỉ vào số hạng đầu tiên, số hạng này sẽ được giảm thiểu khi $y ( \mathbf x )$ bằng $\mathbb { E } [ t | { \bf x } ]$ , trong trường hợp đó số hạng này sẽ biến mất. Đây đơn giản là kết quả mà chúng ta suy ra trước đó và cho thấy rằng bộ dự báo bình phương nhỏ nhất tối ưu được cho bởi giá trị trung bình điều kiện. Số hạng thứ hai là phương sai của phân phối của $t ,$ được lấy trung bình trên x. Nó biểu thị sự biến thiên nội tại của dữ liệu mục tiêu và có thể được coi là tiếng ồn. Vì nó độc lập với $y ( \mathbf x )$ , nó biểu thị giá trị tối thiểu không thể giảm được của hàm mất mát.

Như với bài toán phân loại, chúng ta có thể xác định xác suất thích hợp và sau đó sử dụng chúng để đưa ra quyết định tối ưu, hoặc chúng ta có thể xây dựng các mô hình đưa ra quyết định trực tiếp. Thật vậy, chúng ta có thể xác định ba cách tiếp cận khác biệt để giải quyết các bài toán hồi quy được đưa ra, theo thứ tự độ phức tạp giảm dần, bởi:

(a) Trước tiên giải quyết bài toán suy luận xác định mật độ chung $\boldsymbol { p } ( \mathbf { x } , t )$ . Sau đó chuẩn hóa để tìm mật độ điều kiện $p ( t | \mathbf { x } )$ , và cuối cùng để tìm giá trị trung bình điều kiện được cho bởi (1.89).

(b) Trước tiên giải quyết bài toán suy luận xác định mật độ điều kiện $p ( t | \mathbf { x } )$ và sau đó tiếp tục để tìm giá trị trung bình điều kiện được cho bởi (1.89).

(c) Tìm một hàm hồi quy $y ( \mathbf x )$ trực tiếp từ dữ liệu huấn luyện.

Các ưu điểm tương đối của ba cách tiếp cận này tuân theo các dòng tương tự như các bài toán phân loại ở trên.

Mất mát bình phương không phải là lựa chọn duy nhất của hàm mất mát cho hồi quy. Thật vậy, có những tình huống trong đó mất mát bình phương có thể dẫn đến kết quả rất kém và nơi chúng ta cần phát triển các cách tiếp cận tinh vi hơn. Một ví dụ quan trọng liên quan đến các tình huống trong đó phân phối điều kiện $p ( t | \mathbf { x } )$ là đa phương thức, như thường xảy ra trong giải pháp của các bài toán nghịch đảo. Ở đây chúng ta xem xét ngắn gọn một sự tổng quát hóa đơn giản của mất mát bình phương, được gọi là mất mát Minkowski, có kỳ vọng được cho bởi

$$\mathbb {E} [ L _ {q} ] = \iint | y (\mathbf {x}) - t | ^ {q} p (\mathbf {x}, t) \mathrm{d} \mathbf {x} \mathrm{d} t\tag{1.91}$$

giảm thành mất mát bình phương dự kiến cho $q \ = \ 2 .$ . Hàm $\lvert y - t \rvert ^ { q }$ được vẽ biểu đồ so với $y - t$ cho các giá trị khác nhau của $q$ trong Hình 1.29. Giá trị tối thiểu của E $[ L _ { q } ]$ được cho bởi giá trị trung bình điều kiện cho $q = 2$ , giá trị trung vị điều kiện cho $q = 1$ , và chế độ điều kiện cho $q \to 0$