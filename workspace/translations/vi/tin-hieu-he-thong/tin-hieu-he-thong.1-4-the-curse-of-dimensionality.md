Trong ví dụ về khớp đường cong đa thức, chúng tôi chỉ có một biến đầu vào x. Tuy nhiên, đối với các ứng dụng thực tế của nhận dạng mô hình, chúng ta sẽ phải xử lý các không gian

Biểu đồ phân tán của dữ liệu dòng chảy dầu cho các biến đầu vào $x _ { 6 }$ và $x _ { 7 }$ , trong đó màu đỏ biểu thị lớp 'đồng nhất', màu xanh lá cây biểu thị lớp 'hình vòng', và màu xanh biểu thị lớp 'tầng'. Mục tiêu của chúng tôi là phân loại điểm kiểm tra mới được biểu thị bằng ' '.

![image](images/part-001--ad094d8ac7ea9b6c051d207ad9801736467c1c0506bf51adcd84bd06bf05a353.jpg)

có số chiều cao bao gồm nhiều biến đầu vào. Như chúng ta sẽ thảo luận ngay bây giờ, điều này đặt ra một số thách thức nghiêm trọng và là một yếu tố quan trọng ảnh hưởng đến thiết kế các kỹ thuật nhận dạng mô hình.

Để minh họa vấn đề, chúng tôi xem xét một bộ dữ liệu được tạo tổng hợp đại diện cho các phép đo được thực hiện từ một đường ống chứa hỗn hợp dầu, nước và khí (Bishop và James, 1993). Ba vật liệu này có thể có mặt trong một trong ba cấu hình hình học khác nhau được gọi là 'đồng nhất', 'hình vòng' và 'tầng', và phần nhỏ của ba vật liệu cũng có thể thay đổi. Mỗi điểm dữ liệu bao gồm một vectơ đầu vào 12 chiều gồm các phép đo được thực hiện bằng máy đo mật độ tia gamma đo sự suy giảm của tia gamma đi qua các chùm hẹp qua đường ống. Bộ dữ liệu này được mô tả chi tiết trong Phụ lục A. Hình 1.19 hiển thị 100 điểm từ bộ dữ liệu này trên biểu đồ hiển thị hai trong các phép đo $x _ { 6 }$ và $x _ { 7 }$ (mười giá trị đầu vào còn lại bị bỏ qua cho mục đích minh họa này). Mỗi điểm dữ liệu được gắn nhãn theo lớp hình học nào trong ba lớp nó thuộc về, và mục tiêu của chúng tôi là sử dụng dữ liệu này làm tập huấn luyện để có thể phân loại một quan sát mới $( x _ { 6 } , x _ { 7 } )$ , chẳng hạn như điểm được biểu thị bằng dấu cộng trong Hình 1.19. Chúng ta quan sát thấy rằng dấu cộng được bao quanh bởi nhiều điểm đỏ, và vì vậy chúng ta có thể cho rằng nó thuộc về lớp màu đỏ. Tuy nhiên, cũng có rất nhiều điểm xanh lá cây gần đó, vì vậy chúng ta có thể nghĩ rằng nó có thể thuộc về lớp màu xanh lá cây. Có vẻ không có khả năng nó thuộc về lớp màu xanh. Trực giác ở đây là danh tính của dấu cộng nên được xác định mạnh mẽ hơn bởi các điểm gần đó từ tập huấn luyện và yếu hơn bởi các điểm xa hơn. Trên thực tế, trực giác này hóa ra là hợp lý và sẽ được thảo luận đầy đủ hơn trong các chương sau.

Làm thế nào chúng ta có thể biến trực giác này thành một thuật toán học tập? Một cách tiếp cận rất đơn giản sẽ là chia không gian đầu vào thành các ô thông thường, như được chỉ ra trong Hình 1.20. Khi chúng ta được cung cấp một điểm kiểm tra và chúng ta muốn dự đoán lớp của nó, trước tiên chúng ta quyết định nó thuộc về ô nào, sau đó chúng ta tìm thấy tất cả các điểm dữ liệu huấn luyện rơi vào ô đó. Danh tính của điểm kiểm tra được dự đoán là giống với lớp có số lượng điểm huấn luyện lớn nhất trong ô giống như điểm kiểm tra (với các ràng buộc được phá vỡ ngẫu nhiên).

Hình 1.20

Minh họa một cách tiếp cận đơn giản để giải quyết vấn đề phân loại trong đó không gian đầu vào được chia thành các ô và bất kỳ điểm kiểm tra mới nào được gán cho lớp có số đại diện đa số trong ô giống như điểm kiểm tra. Như chúng ta sẽ thấy ngay sau đây, cách tiếp cận đơn sơ này có một số hạn chế nghiêm trọng.

![image](images/part-001--377c3512e517a1f91b23582aed131595a6da0a1cc6ef2944adcb46c482a65e28.jpg)

Có nhiều vấn đề với cách tiếp cận ngây thơ này, nhưng một trong những vấn đề nghiêm trọng nhất trở nên rõ ràng khi chúng ta xem xét phần mở rộng của nó thành các vấn đề có số lượng biến đầu vào lớn hơn, tương ứng với các không gian đầu vào có số chiều cao hơn. Nguồn gốc của vấn đề được minh họa trong Hình 1.21, cho thấy rằng, nếu chúng ta chia một khu vực của một không gian thành các ô thông thường, thì số lượng các ô đó tăng theo cấp số nhân với số chiều của không gian. Vấn đề với số lượng ô lớn theo cấp số nhân là chúng ta sẽ cần một lượng dữ liệu huấn luyện lớn theo cấp số nhân để đảm bảo rằng các ô không trống. Rõ ràng, chúng ta không có hy vọng áp dụng kỹ thuật như vậy trong một không gian có nhiều hơn một vài biến, và vì vậy chúng ta cần tìm một cách tiếp cận tinh vi hơn.

Phần 1.1

Chúng ta có thể hiểu sâu hơn về các vấn đề của các không gian có số chiều cao bằng cách quay lại ví dụ về khớp đường cong đa thức và xem xét cách chúng ta sẽ mở rộng cách tiếp cận này để xử lý các không gian đầu vào có nhiều biến. Nếu chúng ta có D biến đầu vào, thì một đa thức tổng quát có các hệ số lên tới bậc 3 sẽ có dạng

Hình 1.21 Minh họa của lời nguyền của số chiều, cho thấy cách số vùng của lưới thông thường tăng theo cấp số nhân với số chiều D của không gian. Để rõ ràng, chỉ một tập hợp con của các vùng khối lập phương được hiển thị cho $D = 3$

![image](images/part-001--d65877fc72da6f556e5d08ffb2b0e38da41baf0635450e5151b8590551d39514.jpg)

y (\mathbf {x}, \mathbf {w}) = w _ {0} + \sum_ {i = 1} ^ {D} w _ {i} x _ {i} + \sum_ {i = 1} ^ {D} \sum_ {j = 1} ^ {D} w _ {i j} x _ {i} x _ {j} + \sum_ {i = 1} ^ {D} \sum_ {j = 1} ^ {D} \sum_ {k = 1} ^ {D} w _ {i j k} x _ {i} x _ {j} x _ {k}.\tag{1.74}

Khi D tăng, số hệ số độc lập (không phải tất cả các hệ số đều độc lập do các đối xứng hoán vị giữa các biến x) tăng tương xứng với $D ^ { 3 }$ . Trong thực tế, để nắm bắt các phụ thuộc phức tạp trong dữ liệu, chúng ta có thể cần sử dụng một đa thức bậc cao hơn. Đối với một đa thức bậc M, sự tăng trưởng về số hệ số giống như $D ^ { M }$ . Mặc dù đây bây giờ là tăng trưởng quy luật lũy thừa, thay vì tăng trưởng cấp số nhân, nhưng nó vẫn chỉ ra rằng phương pháp đang trở nên nhanh chóng khó kiểm soát và có ích lợi thực tế hạn chế.

Những trực giác hình học của chúng ta, được hình thành thông qua một cuộc sống dành trong một không gian ba chiều, có thể thất bại một cách tồi tệ khi chúng ta xem xét các không gian có số chiều cao hơn. Như một ví dụ đơn giản, hãy xem xét một hình cầu có bán kính $r = 1$ trong một không gian D chiều, và hỏi phần nhỏ của thể tích hình cầu nằm giữa bán kính $r = 1 - \epsilon$ và $r = 1$ là bao nhiêu. Chúng ta có thể đánh giá phần nhỏ này bằng cách lưu ý rằng thể tích của một hình cầu có bán kính r trong D chiều phải tỷ lệ thuận với $r ^ { D }$ , và vì vậy chúng ta viết

V _ {D} (r) = K _ {D} r ^ {D}\tag{1.75}

trong đó hằng số $K _ { D }$ chỉ phụ thuộc vào $D$ . Do đó, phần nhỏ cần thiết được cho bởi

\frac {V _ {D} (1) - V _ {D} (1 - \epsilon)}{V _ {D} (1)} = 1 - (1 - \epsilon) ^ {D}\tag{1.76}

được vẽ như một hàm của 	 cho các giá trị khác nhau của D trong Hình 1.22. Chúng ta thấy rằng, đối với D lớn, phần nhỏ này có xu hướng tiến tới 1 ngay cả đối với các giá trị nhỏ của 	. Do đó, trong các không gian có số chiều cao, hầu hết thể tích của một hình cầu được tập trung trong một vỏ mỏng gần bề mặt!

Như một ví dụ thêm nữa, có liên quan trực tiếp đến nhận dạng mô hình, hãy xem xét hành vi của một phân bố Gaussian trong một không gian có số chiều cao. Nếu chúng ta biến đổi từ tọa độ Descartes sang tọa độ cực, và sau đó tích phân các biến hướng, chúng ta thu được một biểu thức cho mật độ $p ( r )$ như một hàm của bán kính r từ gốc. Do đó $p ( r ) \delta r$ là khối lượng xác suất bên trong một vỏ mỏng có độ dày δr nằm ở bán kính r. Phân bố này được vẽ, cho các giá trị khác nhau của D, trong Hình 1.23, và chúng ta thấy rằng đối với D lớn, khối lượng xác suất của Gaussian được tập trung trong một vỏ mỏng.

Những khó khăn nghiêm trọng có thể nảy sinh trong các không gian có nhiều chiều đôi khi được gọi là lời nguyền của số chiều (Bellman, 1961). Trong cuốn sách này, chúng ta sẽ sử dụng rộng rãi các ví dụ minh họa liên quan đến các không gian đầu vào của một hoặc hai chiều, bởi vì điều này làm cho việc minh họa các kỹ thuật bằng đồ họa trở nên đặc biệt dễ dàng. Tuy nhiên, người đọc nên được cảnh báo rằng không phải tất cả các trực giác được phát triển trong các không gian có số chiều thấp sẽ khái quát hóa sang các không gian có nhiều chiều.

Hình 1.22 Biểu đồ về phần nhỏ của thể tích của một hình cầu nằm trong khoảng $r = 1 - \epsilon$ đến $r \ = \ 1$ cho các giá trị khác nhau của số chiều D.

![image](images/part-001--c2ea2addaf029a232ad1a4ea17b2ab1365d7e2dbd80bcb3a6adc7291bcfb8cd2.jpg)

Mặc dù lời nguyền của số chiều chắc chắn đặt ra những vấn đề quan trọng đối với các ứng dụng nhận dạng mô hình, nhưng nó không ngăn cản chúng ta tìm thấy các kỹ thuật hiệu quả có thể áp dụng cho các không gian có số chiều cao. Các lý do cho điều này là hai chiều. Thứ nhất, dữ liệu thực sẽ thường bị giới hạn trong một vùng của không gian có số chiều hiệu dụng thấp hơn, và đặc biệt là các hướng mà những biến đổi quan trọng trong các biến mục tiêu xảy ra có thể bị giới hạn như vậy. Thứ hai, dữ liệu thực sẽ thường có một số tính chất mịn (ít nhất là cục bộ) để hầu hết, những thay đổi nhỏ trong các biến đầu vào sẽ tạo ra những thay đổi nhỏ trong các biến mục tiêu, và vì vậy chúng ta có thể khai thác các kỹ thuật tương tự như suy nội khu bộ để cho phép chúng ta đưa ra dự đoán về các biến mục tiêu cho các giá trị mới của các biến đầu vào. Các kỹ thuật nhận dạng mô hình thành công khai thác một hoặc cả hai thuộc tính này. Hãy xem xét, ví dụ, một ứng dụng trong sản xuất trong đó các hình ảnh được chụp của các vật thể phẳng giống hệt nhau trên một băng chuyền, trong đó mục tiêu là xác định hướng của chúng. Mỗi hình ảnh là một điểm trong một không gian có số chiều cao có số chiều được xác định bởi số pixel. Bởi vì các vật thể có thể xuất hiện ở các vị trí khác nhau trong hình ảnh và ở các hướng khác nhau, có ba bậc tự do biến thiên giữa các hình ảnh, và một tập hợp các hình ảnh sẽ sống trên một đa tạp ba chiều nhúng trong không gian có số chiều cao. Do các mối quan hệ phức tạp giữa vị trí đối tượng hoặc hướng và cường độ pixel, đa tạp này sẽ cực kỳ phi tuyến tính. Nếu mục tiêu là học một mô hình có thể lấy một hình ảnh đầu vào và xuất ra hướng của vật thể bất kể vị trí của nó, thì chỉ có một bậc tự do biến thiên trong đa tạp là có ý nghĩa.

Hình 1.23

Biểu đồ mật độ xác suất đối với bán kính r của một phân bố Gaussian cho các giá trị khác nhau của số chiều D. Trong một không gian có số chiều cao, hầu hết khối lượng xác suất của một Gaussian nằm trong một vỏ mỏng ở một bán kính cụ thể.

![image](images/part-001--77f529bf30907e37ad96ab1983668ab5d7375351cc3199cac53e8731dd9866ab.jpg)