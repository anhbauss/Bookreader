Ludwig Eduard Boltzmann là một nhà vật lý người Áo đã tạo ra lĩnh vực cơ học thống kê. Trước Boltzmann, khái niệm entropy đã được biết đến từ nhiệt động lực học cổ điển, nơi nó

lượng hóa thực tế rằng khi chúng ta lấy năng lượng từ một hệ thống, không phải tất cả năng lượng đó thường có sẵn để thực hiện công hữu ích. Boltzmann chỉ ra rằng entropy nhiệt động lực S, một đại lượng vĩ mô, có thể được liên kết với các tính chất thống kê ở mức độ vi mô. Điều này được biểu thị thông qua phương trình nổi tiếng $\textit { S } = \textit { k }$ ln W trong đó W đại diện cho số lượng các trạng thái vi mô có thể có trong một trạng thái vĩ mô, và $k \simeq 1 . 3 8 \stackrel { \cdot } { \times } 1 0 ^ { - 2 3 }$ (tính bằng đơn vị Joules trên Kelvin) được gọi là hằng số Boltzmann. Ý tưởng của Boltzmann đã bị nhiều nhà khoa học thời đó tranh cãi. Một khó khăn mà họ nhìn thấy phát sinh từ định luật thứ hai của nhiệt động lực học, định luật phát biểu rằng entropy của một hệ thống kín có xu hướng tăng theo thời gian. Ngược lại, ở mức độ vi mô các phương trình vật lý Newton cổ điển là khả nghịch, và do đó họ thấy khó khăn trong việc giải thích cách mà các phương trình này có thể giải thích cách đó. Họ không hoàn toàn đánh giá cao các lập luận của Boltzmann, vốn là tính chất thống kê và kết luận không phải là entropy không bao giờ có thể giảm theo thời gian mà đơn giản là với xác suất cao nó sẽ tăng chung chung. Boltzmann thậm chí còn có một cuộc tranh cãi kéo dài với biên tập viên của tạp chí vật lý hàng đầu của Đức, người từ chối cho phép ông đề cập đến nguyên tử và phân tử là bất cứ điều gì khác ngoài các cấu trúc lý thuyết tiện lợi. Các cuộc tấn công liên tục vào công việc của ông dẫn đến các đợt trầm cảm, và cuối cùng ông đã tự sát. Không lâu sau cái chết của Boltzmann, các thí nghiệm mới của Perrin về các huyền phù keo xác minh các lý thuyết của ông và xác nhận giá trị của hằng số Boltzmann. Phương trình $S = k$ ln W được khắc trên ngôi mộ của Boltzmann.

ba ràng buộc

\int_ {- \infty} ^ {\infty} p (x) \mathrm{d} x = 1\tag{1.105}

\int_ {- \infty} ^ {\infty} x p (x) \mathrm{d} x = \mu\tag{1.106}

\int_ {- \infty} ^ {\infty} (x - \mu) ^ {2} p (x) \mathrm{d} x = \sigma^ {2}.\tag{1.107}

Sự tối đa hóa có ràng buộc có thể được thực hiện bằng cách sử dụng các nhân tử Lagrange sao cho chúng ta tối đa hóa hàm thức sau đây đối với $p ( x )$

\begin{array}{l} - \int_ {- \infty} ^ {\infty} p (x) \ln p (x) \mathrm{d} x + \lambda_ {1} \left(\int_ {- \infty} ^ {\infty} p (x) \mathrm{d} x - 1\right) \\ + \lambda_ {2} \left(\int_ {- \infty} ^ {\infty} x p (x) \mathrm{d} x - \mu\right) + \lambda_ {3} \left(\int_ {- \infty} ^ {\infty} (x - \mu) ^ {2} p (x) \mathrm{d} x - \sigma^ {2}\right). \end{array}

Sử dụng phép tính biến phân, chúng ta đặt đạo hàm của hàm thức này bằng không, cho ra

p (x) = \exp \left\{- 1 + \lambda_ {1} + \lambda_ {2} x + \lambda_ {3} (x - \mu) ^ {2} \right\}.\tag{1.108}

Các nhân tử Lagrange có thể được tìm thấy bằng cách thay thế ngược kết quả này vào ba phương trình ràng buộc, cuối cùng dẫn đến kết quả

p (x) = \frac {1}{(2 \pi \sigma^ {2}) ^ {1 / 2}} \exp \left\{- \frac {(x - \mu) ^ {2}}{2 \sigma^ {2}} \right\}\tag{1.109}

và do đó phân bố tối đa hóa entropy vi phân là phân bố Gaussian. Lưu ý rằng chúng ta không ràng buộc phân bố phải là không âm khi chúng ta tối đa hóa entropy. Tuy nhiên, vì phân bố kết quả thực sự là không âm, chúng ta thấy với tầm nhìn hậu kỳ rằng ràng buộc như vậy là không cần thiết.

Nếu chúng ta đánh giá entropy vi phân của phân bố Gaussian, chúng ta nhận được

\mathrm{H} [ x ] = \frac {1}{2} \left\{1 + \ln (2 \pi \sigma^ {2}) \right\}.\tag{1.110}

Do đó, chúng ta lại thấy rằng entropy tăng khi phân bố trở nên rộng hơn, tức là khi $\sigma ^ { 2 }$ tăng. Kết quả này cũng cho thấy rằng entropy vi phân, không giống như entropy rời rạc, có thể âm, vì $\operatorname { I } ( x ) < 0$ trong (1.110) cho $\sigma ^ { 2 } < 1 / ( 2 \pi e )$

Giả sử chúng ta có một phân bố chung $p ( \mathbf x , \mathbf y )$ từ đó chúng ta rút ra các cặp giá trị của x và y. Nếu một giá trị của x đã được biết, thì thông tin bổ sung cần thiết để xác định giá trị tương ứng của y được cung cấp bởi $- \ln p ( \mathbf { y } | \mathbf { x } )$ . Do đó, thông tin bổ sung trung bình cần thiết để xác định y có thể được viết là

\mathrm{H} [ \mathbf {y} | \mathbf {x} ] = - \iint p (\mathbf {y}, \mathbf {x}) \ln p (\mathbf {y} | \mathbf {x}) \mathrm{d} \mathbf {y} \mathrm{d} \mathbf {x}\tag{1.111}

Exercise 1.37

đây được gọi là entropy có điều kiện của y cho x. Có thể dễ dàng thấy, sử dụng quy tắc tích, rằng entropy có điều kiện thỏa mãn quan hệ

\mathrm{H} [ \mathbf {x}, \mathbf {y} ] = \mathrm{H} [ \mathbf {y} | \mathbf {x} ] + \mathrm{H} [ \mathbf {x} ]\tag{1.112}

trong đó $\mathrm { H } [ \mathbf { x } , \mathbf { y } ]$ là entropy vi phân của $p ( \mathbf x , \mathbf y )$ và $\mathrm { H } [ \mathbf { x } ]$ là entropy vi phân của phân bố biên $p ( \mathbf { x } )$ . Do đó, thông tin cần thiết để mô tả x và y được cung cấp bởi tổng thông tin cần thiết để mô tả x một mình cộng với thông tin bổ sung cần thiết để xác định y cho x.