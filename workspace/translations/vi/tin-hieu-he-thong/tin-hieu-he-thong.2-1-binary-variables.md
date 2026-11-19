Chúng tôi bắt đầu bằng cách xem xét một biến ngẫu nhiên nhị phân duy nhất $x \in \{ 0 , 1 \}$ . Ví dụ, x có thể mô tả kết quả của việc tung một đồng xu, với $x = 1$ đại diện cho 'mặt ngửa', và $x = 0$ đại diện cho 'mặt sấp'. Chúng ta có thể tưởng tượng rằng đây là một đồng xu bị hư hỏng sao cho xác suất rơi vào mặt ngửa không nhất thiết bằng xác suất rơi vào mặt sấp. Xác suất của $x = 1$ sẽ được ký hiệu bởi tham số $\mu$ sao cho

$$p (x = 1 | \mu) = \mu\tag{2.1}$$

trong đó $0 \leqslant \mu \leqslant 1$ , từ đó suy ra rằng $p ( x = 0 | \mu ) = 1 - \mu$ . Phân phối xác suất trên x do đó có thể được viết dưới dạng

$$\mathrm{Bern} (x | \mu) = \mu^ {x} (1 - \mu) ^ {1 - x}\tag{2.2}$$

Exercise 2.1

được gọi là phân phối Bernoulli. Dễ dàng xác minh rằng phân phối này là chuẩn hóa và nó có trung bình và phương sai được cho bởi

$$\mathbb {E} [ x ] = \mu\tag{2.3}$$

$$\operatorname{var} [ x ] = \mu (1 - \mu).\tag{2.4}$$

Bây giờ giả sử chúng ta có một tập dữ liệu $\mathcal { D } = \{ x _ { 1 } , \ldots , x _ { N } \}$ của các giá trị quan sát được của x. Chúng ta có thể xây dựng hàm hợp lý, đó là một hàm của $\mu ,$ dựa trên giả định rằng các quan sát được rút ra độc lập từ $p ( x | \mu )$ , sao cho

$$p (\mathcal {D} | \mu) = \prod_ {n = 1} ^ {N} p (x _ {n} | \mu) = \prod_ {n = 1} ^ {N} \mu^ {x _ {n}} (1 - \mu) ^ {1 - x _ {n}}.\tag{2.5}$$

Trong cài đặt phần tần suất, chúng ta có thể ước tính một giá trị cho $\mu$ bằng cách tối đa hóa hàm hợp lý, hoặc tương đương bằng cách tối đa hóa logarit của hợp lý. Trong trường hợp phân phối Bernoulli, hàm log hợp lý được cho bởi

$$\ln p (\mathcal {D} | \mu) = \sum_ {n = 1} ^ {N} \ln p (x _ {n} | \mu) = \sum_ {n = 1} ^ {N} \left\{x _ {n} \ln \mu + (1 - x _ {n}) \ln (1 - \mu) \right\}.\tag{2.6}$$

Section 2.4

Tại thời điểm này, cần lưu ý rằng hàm log hợp lý phụ thuộc vào các quan sát N $x _ { n }$ chỉ thông qua tổng của chúng $\textstyle \sum _ { n } x _ { n }$ . Tổng này cung cấp một ví dụ về một thống kê đủ cho dữ liệu dưới phân phối này, và chúng ta sẽ nghiên cứu chi tiết vai trò quan trọng của các thống kê đủ. Nếu chúng ta đặt đạo hàm của ln $p ( \mathcal { D } | \mu )$ đối với $\mu$ bằng không, chúng ta thu được ước tính hợp lý cực đại

$$\mu_ {\mathrm{ML}} = \frac {1}{N} \sum_ {n = 1} ^ {N} x _ {n}\tag{2.7}$$

![image](images/part-001--3e39d3ec4eade65f3ed47e187c52e87f00a894cdb510f69c0a8e34c2223e1142.jpg)