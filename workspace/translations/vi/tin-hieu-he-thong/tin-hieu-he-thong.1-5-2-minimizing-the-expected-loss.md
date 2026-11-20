Đối với nhiều ứng dụng, mục tiêu của chúng ta sẽ phức tạp hơn so với việc đơn giản là giảm thiểu số lượng phân loại sai. Hãy xem xét lại bài toán chẩn đoán y tế. Chúng ta lưu ý rằng, nếu một bệnh nhân không bị ung thư nhưng bị chẩn đoán sai là có ung thư, hậu quả có thể là một số sự lo lắng của bệnh nhân cộng với nhu cầu tiến hành các cuộc điều tra thêm. Ngược lại, nếu một bệnh nhân bị ung thư nhưng được chẩn đoán là khỏe mạnh, kết quả có thể là tử vong sớm do thiếu điều trị. Do đó, hậu quả của hai loại sai lầm này có thể khác biệt rất lớn. Rõ ràng là tốt hơn nếu ta phạm phải ít sai lầm loại thứ hai hơn, ngay cả khi điều này có giá của việc phạm phải nhiều sai lầm loại thứ nhất hơn.

Chúng ta có thể chính thức hóa những vấn đề như vậy thông qua việc giới thiệu một hàm mất mát, còn được gọi là hàm chi phí, là một thước đo tổng thể duy nhất về mất mát phát sinh từ việc thực hiện bất kỳ quyết định hoặc hành động nào có sẵn. Mục tiêu của chúng ta sau đó là giảm thiểu tổng mất mát phát sinh. Lưu ý rằng một số tác giả thay vào đó xem xét một hàm tiện ích, giá trị của nó họ hướng đến việc tối đa hóa. Đây là những khái niệm tương đương nếu chúng ta coi tiện ích đơn giản là âm của mất mát, và trong suốt văn bản này chúng ta sẽ sử dụng quy ước hàm mất mát. Giả sử rằng, đối với một giá trị mới của x, lớp thực sự là $\mathcal{C}_k$ và chúng ta gán x cho lớp $\mathcal{C}_j$ (trong đó $j$ có thể bằng hoặc không bằng k). Bằng cách làm như vậy, chúng ta phải chịu một mức độ mất mát nào đó mà chúng ta ký hiệu bằng $L_{kj}$, mà chúng ta có thể xem như phần tử $k,j$ của một ma trận mất mát. Ví dụ, trong ví dụ ung thư của chúng ta, chúng ta có thể có một ma trận mất mát có dạng được hiển thị trong Hình 1.25. Ma trận mất mát cụ thể này nói rằng không có mất mát phát sinh nếu quyết định đúng được đưa ra, có mất mát là 1 nếu một bệnh nhân khỏe mạnh được chẩn đoán là có ung thư, trong khi có mất mát là 1000 nếu một bệnh nhân có ung thư được chẩn đoán là khỏe mạnh.

Giải pháp tối ưu là giải pháp giảm thiểu hàm mất mát. Tuy nhiên, hàm mất mát phụ thuộc vào lớp thực sự, không được biết. Đối với một vectơ đầu vào x cho trước, sự không chắc chắn của chúng ta về lớp thực sự được biểu thị thông qua phân phối xác suất kết hợp $p(\mathbf{x}, \mathcal{C}_k)$ và do đó chúng ta tìm cách giảm thiểu mất mát trung bình, trong đó trung bình được tính toán với respect to this distribution, được cho bởi

$$\mathbb{E}[L] = \sum_k \sum_j \int_{\mathcal{R}_j} L_{kj} p(\mathbf{x}, \mathcal{C}_k) \mathrm{d}\mathbf{x}.\tag{1.80}$$

Mỗi x có thể được gán độc lập cho một trong các vùng quyết định $\mathcal{R}_j$. Mục tiêu của chúng ta là chọn các vùng $\mathcal{R}_j$ để giảm thiểu mất mát dự kiến (1.80), điều này ngụ ý rằng đối với mỗi x chúng ta nên giảm thiểu

$$\sum_k L_{kj} p(\mathbf{x}, \mathcal{C}_k).$$

Như trước đây, chúng ta có thể sử dụng quy tắc tích $p(\mathbf{x}, \mathcal{C}_k) = p(\mathcal{C}_k|\mathbf{x}) p(\mathbf{x})$ để loại bỏ thừa số chung là $p(\mathbf{x})$. Do đó, quy tắc quyết định giảm thiểu mất mát dự kiến là quy tắc gán mỗi x mới cho lớp j mà đại lượng

$$\sum_k L_{kj} p(\mathcal{C}_k|\mathbf{x})\tag{1.81}$$

là tối thiểu. Rõ ràng điều này là tầm thường để thực hiện, sau khi chúng ta biết các xác suất lớp hậu nghiệp $p(\mathcal{C}_k|\mathbf{x})$.

**Hình 1.26** Minh họa tùy chọn từ chối. Các đầu vào x sao cho xác suất hậu nghiệp lớn hơn trong hai xác suất nhỏ hơn hoặc bằng một ngưỡng θ nào đó sẽ bị từ chối.

![image](images/part-001--82ff855bfd4203e4488074edc4d5d4af9be5b0e535c0ebe17669ce7d2feae21e.jpg)