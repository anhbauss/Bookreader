Mặc dù chúng tôi đã đưa vào một phân phối tiên nghiệm $p ( \mathbf { w } | \alpha )$ , cho đến nay chúng tôi vẫn chỉ thực hiện ước tính điểm của w và do đó điều này chưa tương đương với một xử lý Bayesian. Trong một phương pháp Bayesian hoàn toàn, chúng tôi nên áp dụng một cách nhất quán các quy tắc tổng và tích của xác suất, điều này đòi hỏi, như chúng ta sẽ thấy trong thời gian ngắn, rằng chúng ta tích phân trên tất cả các giá trị của w. Những phép chuẩn hóa này nằm ở trung tâm của các phương pháp Bayesian để nhận dạng mẫu.

Trong bài toán khớp đường cong, chúng ta được cung cấp dữ liệu huấn luyện x và t, cùng với một điểm kiểm tra mới $x ,$ và mục tiêu của chúng ta là dự đoán giá trị của t. Do đó, chúng ta muốn đánh giá phân phối dự đoán $p ( t | x , \mathbf { x } , \mathbf { t } )$ . Ở đây chúng ta sẽ giả sử rằng các tham số α và $\beta$ được cố định và biết trước (trong các chương sau chúng ta sẽ thảo luận cách các tham số như vậy có thể được suy ra từ dữ liệu trong một cài đặt Bayesian).

Một xử lý Bayesian chỉ đơn giản tương ứng với một ứng dụng nhất quán của các quy tắc tổng và tích của xác suất, cho phép phân phối dự đoán được viết dưới dạng C

p (t | x, \mathbf {x}, \mathbf {t}) = \int p (t | x, \mathbf {w}) p (\mathbf {w} | \mathbf {x}, \mathbf {t}) d \mathbf {w}.\tag{1.68}

Ở đây $p ( t | x , \mathbf { w } )$ được cho bởi (1.60), và chúng tôi đã bỏ qua sự phụ thuộc vào α và $\beta$ để đơn giản hóa ký hiệu. Ở đây $p ( \mathbf { w } | \mathbf { x } , \mathbf { t } )$ là phân phối hậu nghiệm trên các tham số, và có thể được tìm thấy bằng cách chuẩn hóa vế phải của (1.66). Chúng ta sẽ thấy trong Phần 3.3 rằng, đối với các bài toán như ví dụ khớp đường cong, phân phối hậu nghiệm này là Gaussian và có thể được đánh giá một cách phân tích. Tương tự, tích phân trong (1.68) cũng có thể được thực hiện một cách phân tích với kết quả là phân phối dự đoán được cho bởi một Gaussian của dạng

p (t | x, \mathbf {x}, \mathbf {t}) = \mathcal {N} \left(t | m (x), s ^ {2} (x)\right)\tag{1.69}

trong đó giá trị trung bình và phương sai được cho bởi

m (x) = \beta \phi (x) ^ {\mathrm{T}} \mathbf {S} \sum_ {n = 1} ^ {N} \phi (x _ {n}) t _ {n}\tag{1.70}

s ^ {2} (x) = \beta^ {- 1} + \phi (x) ^ {\mathrm{T}} \mathbf {S} \phi (x).\tag{1.71}

Ở đây ma trận S được cho bởi

\mathbf {S} ^ {- 1} = \alpha \mathbf {I} + \beta \sum_ {n = 1} ^ {N} \boldsymbol {\phi} (x _ {n}) \boldsymbol {\phi} (x) ^ {\mathrm{T}}\tag{1.72}

trong đó I là ma trận đơn vị, và chúng ta đã xác định vector $\phi ( x )$ với các phần tử $\phi _ { i } ( x ) = x ^ { i }$ cho $i = 0 , \ldots , M$

Chúng ta thấy rằng phương sai, cũng như giá trị trung bình, của phân phối dự đoán trong (1.69) phụ thuộc vào x. Số hạng đầu tiên trong (1.71) đại diện cho độ không chắc chắn trong giá trị dự đoán của t do nhiễu trên các biến mục tiêu và đã được biểu thị trong phân phối dự đoán hợp lý tối đa (1.64) thông qua $\beta _ { \mathrm { M L } } ^ { - \tilde { 1 } }$ . Tuy nhiên, số hạng thứ hai phát sinh từ độ không chắc chắn trong các tham số w và là kết quả của xử lý Bayesian. Phân phối dự đoán cho bài toán hồi quy sin hình tổng hợp được minh họa trong Hình 1.17.

Phân phối dự đoán kết quả từ xử lý Bayesian của khớp đường cong đa thức sử dụng một đa thức $M = 9$ , với các tham số cố định $\alpha = 5 \times 1 0 ^ { - 3 }$ và $\beta =$ 11.1 (tương ứng với phương sai nhiễu đã biết), trong đó đường cong đỏ biểu thị giá trị trung bình của phân phối dự đoán và vùng đỏ tương ứng với 1 độ lệch chuẩn xung quanh giá trị trung bình.

![image](images/part-001--5f12f9003d6a6dd7de8d5bdb90c0b5002bc0af93ee03032a6c977906ba151fb5.jpg)