Đối với nhiều ứng dụng, mục tiêu của chúng ta sẽ phức tạp hơn là chỉ đơn giản giảm thiểu số lượng phân loại sai. Hãy xem xét lại vấn đề chẩn đoán y tế. Chúng ta lưu ý rằng, nếu một bệnh nhân không bị ung thư bị chẩn đoán sai là mắc ung thư, hậu quả có thể là một số khó chịu cho bệnh nhân cộng với nhu cầu điều tra thêm. Ngược lại, nếu một bệnh nhân mắc ung thư được chẩn đoán là khỏe mạnh, kết quả có thể là tử vong sớm do thiếu điều trị. Do đó, hậu quả của hai loại sai lầm này có thể khác nhau một cách đáng kể. Rõ ràng sẽ tốt hơn nếu mắc ít hơn những sai lầm loại thứ hai, ngay cả khi điều này là với chi phí mắc nhiều sai lầm loại thứ nhất hơn.

Chúng ta có thể hình thức hóa những vấn đề như vậy thông qua việc giới thiệu một hàm mất mát, còn được gọi là hàm chi phí, đây là một thước đo tổng thể duy nhất về tổn thất phát sinh trong việc thực hiện bất kỳ quyết định hoặc hành động nào có sẵn. Mục tiêu của chúng ta khi đó là giảm thiểu tổng tổn thất phát sinh. Lưu ý rằng một số tác giả xem xét thay vào đó một hàm tiện ích, mà họ muốn tối đa hóa giá trị của nó. Đây là những khái niệm tương đương nếu chúng ta coi tiện ích đơn giản là âm của tổn thất, và trong suốt văn bản này chúng ta sẽ sử dụng quy ước hàm mất mát. Giả sử rằng, đối với một giá trị mới của x, lớp thực sự là $\mathcal { C } _ { k }$ và chúng ta gán x cho lớp $\mathcal { C } _ { j }$ (trong đó $j$ có thể hoặc không bằng k). Trong quá trình làm như vậy, chúng ta phát sinh một mức độ tổn thất nhất định mà chúng ta ký hiệu là $L _ { k j }$ , mà chúng ta có thể xem như là phần tử $k , j$ của một ma trận mất mát. Ví dụ, trong ví dụ ung thư của chúng ta, chúng ta có thể có một ma trận mất mát có dạng được hiển thị trong Hình 1.25. Ma trận mất mát đặc biệt này nói rằng không có tổn thất phát sinh nếu đưa ra quyết định đúng, có tổn thất là 1 nếu một bệnh nhân khỏe mạnh được chẩn đoán là mắc ung thư, trong khi có tổn thất là 1000 nếu một bệnh nhân mắc ung thư được chẩn đoán là khỏe mạnh.

Giải pháp tối ưu là giải pháp làm giảm thiểu hàm mất mát. Tuy nhiên, hàm mất mát phụ thuộc vào lớp thực sự, lớp này không xác định. Đối với một vectơ đầu vào x cho trước, sự không chắc chắn của chúng ta trong lớp thực sự được biểu thị thông qua phân bố xác suất kết hợp $p ( \mathbf { x } , \mathcal { C } _ { k } )$ và vì vậy chúng ta tìm cách giảm thiểu tổn thất trung bình, trong đó trung bình được tính toán liên quan đến phân bố này, được cho bởi

$$\mathbb {E} [ L ] = \sum_ {k} \sum_ {j} \int_ {\mathcal {R} _ {j}} L _ {k j} p (\mathbf {x}, \mathcal {C} _ {k}) \mathrm{d} \mathbf {x}.\tag{1.80}$$

Mỗi x có thể được gán độc lập cho một trong các vùng quyết định $\mathcal { R } _ { j }$ . Mục tiêu của chúng ta là chọn các vùng $\mathcal { R } _ { j }$ để giảm thiểu tổn thất dự kiến (1.80), điều này ngụ ý rằng đối với mỗi x chúng ta nên giảm thiểu $\begin{array} { r } { \sum _ { k } L _ { k j } p ( \mathbf x , \hat { \mathcal { C } } _ { k } ) } \end{array}$ . Như trước, chúng ta có thể sử dụng quy tắc tích $p ( \mathbf { x } , \mathcal { C } _ { k } ) = p ( \mathcal { C } _ { k } | \mathbf { x } ) p ( \mathbf { x } )$ để loại bỏ thừa số chung của $p ( \mathbf { x } )$ Do đó, quy tắc quyết định giảm thiểu tổn thất dự kiến là quy tắc gán mỗi

Hình 1.26

Minh họa của lựa chọn từ chối. Các đầu vào x sao cho cái lớn hơn của hai xác suất hậu nghiệm nhỏ hơn hoặc bằng một ngưỡng θ nào đó sẽ bị từ chối.

![image](images/part-001--82ff855bfd4203e4488074edc4d5d4af9be5b0e535c0ebe17669ce7d2feae21e.jpg)

x mới cho lớp j mà đối với đó số lượng

$$\sum_ {k} L _ {k j} p (\mathcal {C} _ {k} | \mathbf {x})\tag{1.81}$$

là tối thiểu. Điều này rõ ràng là tầm thường để làm, khi chúng ta biết các xác suất lớp hậu nghiệm $p ( \mathcal { C } _ { k } | \mathbf { x } )$