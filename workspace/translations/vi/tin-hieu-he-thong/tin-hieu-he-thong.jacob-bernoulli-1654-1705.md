Jacob Bernoulli, còn được biết đến với tên gọi Jacques hoặc James Bernoulli, là một nhà toán học người Thụy Sĩ và là người đầu tiên trong gia đình Bernoulli theo đuổi sự nghiệp trong khoa học và toán học. Mặc dù bị ép buộc phải học triết học và th신học trái ý muốn của cha mẹ, nhưng sau khi tốt nghiệp ông đã đi du lịch rộng rãi để gặp gỡ nhiều nhà khoa học hàng đầu của thời đại, bao gồm Boyle và Hooke ở Anh. Khi trở về Thụy Sĩ, ông dạy cơ học và trở thành Giáo sư Toán học tại Basel năm 1687. Thật không may, sự cạnh tranh giữa Jacob và anh trai kém tuổi Johann của ông đã biến một sự cộng tác ban đầu có hiệu quả thành một cuộc tranh chấp cay đắng và công khai. Những đóng góp quan trọng nhất của Jacob đối với toán học xuất hiện trong Ars Conjectandi được xuất bản năm 1713, tám năm sau khi ông qua đời, cuốn sách này đề cập đến các chủ đề trong lý thuyết xác suất bao gồm những gì đã trở thành phân bố Bernoulli.

Hình 2.1 Biểu đồ tần số của phân bố nhị thức (2.9) như một hàm của m với N = 10 và $\mu = 0.25$

![image](images/part-001--502086544586852da1b941c7844fe0faa0934ee791d0e07d2ba25e10d5be1961.jpg)

cũng được gọi là trung bình mẫu. Nếu ký hiệu số lượng quan sát của $x = 1$ (mặt ngửa) trong tập dữ liệu này bằng m, thì chúng ta có thể viết (2.7) dưới dạng

\mu_ {\mathrm{ML}} = \frac {m}{N}\tag{2.8}

sao cho xác suất hạ cánh mặt ngửa được cho, trong khung công tác khả năng tối đa này, bằng phân số quan sát mặt ngửa trong tập dữ liệu.

Bây giờ giả sử chúng ta tung đồng xu, chẳng hạn, 3 lần và tình cờ quan sát thấy 3 mặt ngửa. Khi đó $N = m = 3$ và $\mu _ { \mathrm { M L } } = 1$ . Trong trường hợp này, kết quả khả năng tối đa sẽ dự đoán rằng tất cả các quan sát trong tương lai đều sẽ cho mặt ngửa. Lẽ thường chúng ta nói rằng điều này là không hợp lý, và thực tế đây là một ví dụ cực đoan về việc quá khớp liên kết với khả năng tối đa. Chúng ta sẽ sớm thấy làm thế nào để đi đến những kết luận hợp lý hơn thông qua việc giới thiệu một phân bố tiên nghiệm trên $\mu .$

Chúng ta cũng có thể tính toán phân bố của số m quan sát của $x = 1$ cho rằng tập dữ liệu có kích thước N. Đây được gọi là phân bố nhị thức, và từ (2.5) chúng ta thấy rằng nó tỷ lệ với $\mu ^ { m } ( 1 - \mu ) ^ { N - m }$ . Để có được hệ số chuẩn hóa, chúng ta lưu ý rằng ngoài N lần tung đồng xu, chúng ta phải cộng tất cả các cách có thể để có được m mặt ngửa, do đó phân bố nhị thức có thể được viết

\operatorname{Bin} (m | N, \mu) = \binom {N} {m} \mu^ {m} (1 - \mu) ^ {N - m}\tag{2.9}

trong đó

\binom {N} {m} \equiv \frac {N !}{(N - m) ! m !}\tag{2.10}

là số cách để chọn m đối tượng từ tổng cộng N đối tượng giống hệt nhau. Hình 2.1 hiển thị một biểu đồ của phân bố nhị thức cho $N = 1 0$ và $\mu = 0 . 2 5$

Giá trị trung bình và phương sai của phân bố nhị thức có thể được tìm thấy bằng cách sử dụng kết quả của Bài tập 1.10, chỉ ra rằng đối với các sự kiện độc lập, giá trị trung bình của tổng là tổng của các giá trị trung bình, và phương sai của tổng là tổng của các phương sai. Vì $m = x _ { 1 } + . . . + x _ { N }$ , và đối với mỗi quan sát, giá trị trung bình và phương sai lần lượt được cho bởi (2.3) và (2.4), chúng ta có

\mathbb {E} [ m ] \equiv \sum_ {m = 0} ^ {N} m \mathrm{Bin} (m | N, \mu) = N \mu\tag{2.11}

\operatorname{var} [ m ] \equiv \sum_ {m = 0} ^ {N} (m - \mathbb {E} [ m ]) ^ {2} \operatorname{Bin} (m | N, \mu) = N \mu (1 - \mu).\tag{2.12}

Những kết quả này cũng có thể được chứng minh trực tiếp bằng cách sử dụng phép tính.