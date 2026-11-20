Một trong những phép toán quan trọng nhất liên quan đến xác suất là tìm các trung bình có trọng số của các hàm. Giá trị trung bình của một hàm nào đó $f ( x )$ dưới một phân bố xác suất $p ( x )$ được gọi là kỳ vọng của $f ( x )$ và sẽ được ký hiệu bởi $\mathbb { E } [ f ]$ . Đối với một phân bố rời rạc, nó được cho bởi

$$\mathbb {E} [ f ] = \sum_ {x} p (x) f (x)\tag{1.33}$$

sao cho trung bình được tính theo trọng số của các xác suất tương đối của các giá trị khác nhau của x. Trong trường hợp các biến liên tục, kỳ vọng được biểu thị dưới dạng một tích phân theo mật độ xác suất tương ứng

$$\mathbb {E} [ f ] = \int p (x) f (x) \mathrm{d} x.\tag{1.34}$$

Trong cả hai trường hợp, nếu chúng ta có một số hữu hạn N điểm được lấy từ phân bố xác suất hoặc mật độ xác suất, thì kỳ vọng có thể được xấp xỉ dưới dạng một

tổng hữu hạn trên các điểm này

$$\mathbb {E} [ f ] \simeq \frac {1}{N} \sum_ {n = 1} ^ {N} f (x _ {n}).\tag{1.35}$$

Chúng tôi sẽ sử dụng rộng rãi kết quả này khi chúng tôi thảo luận về các phương pháp lấy mẫu trong Chương 11. Xấp xỉ trong (1.35) trở nên chính xác trong giới hạn $N \to \infty$

Đôi khi chúng ta sẽ xem xét các kỳ vọng của các hàm của nhiều biến, trong trường hợp đó chúng ta có thể sử dụng một chỉ số dưới để chỉ ra biến nào được lấy trung bình, sao cho chẳng hạn

$$\mathbb {E} _ {x} [ f (x, y) ]\tag{1.36}$$

biểu thị giá trị trung bình của hàm $f ( x , y )$ với respect đến phân bố của x. Lưu ý rằng $\mathbb { E } _ { x } [ f ( x , y ) ]$ sẽ là một hàm của $y .$

Chúng ta cũng có thể xem xét một kỳ vọng có điều kiện với respect đến một phân bố có điều kiện, sao cho

$$\mathbb {E} _ {x} [ f | y ] = \sum_ {x} p (x | y) f (x)\tag{1.37}$$

với một định nghĩa tương tự cho các biến liên tục.

Phương sai của $f ( x )$ được định nghĩa bởi

$$\operatorname{var} [ f ] = \mathbb {E} \left[ (f (x) - \mathbb {E} [ f (x) ]) ^ {2} \right]\tag{1.38}$$

và cung cấp một thước đo mức độ biến thiên có trong $f ( x )$ xung quanh giá trị trung bình của nó $\mathbb { E } [ f ( x ) ]$ ]. Khai triển bình phương, chúng ta thấy rằng phương sai cũng có thể được viết dưới dạng các kỳ vọng của $f ( x )$ và $f ( x ) ^ { 2 }$

$$\operatorname{var} [ f ] = \mathbb {E} [ f (x) ^ {2} ] - \mathbb {E} [ f (x) ] ^ {2}.\tag{1.39}$$

Đặc biệt, chúng ta có thể xem xét phương sai của biến x, được cho bởi

$$\operatorname{var} [ x ] = \mathbb {E} [ x ^ {2} ] - \mathbb {E} [ x ] ^ {2}.\tag{1.40}$$

Đối với hai biến ngẫu nhiên x và $y .$ , hiệp phương sai được định nghĩa bởi

$$\begin{array}{r c l} \operatorname{cov} [ x, y ] & = & \mathbb {E} _ {x, y} \left[ \left\{x - \mathbb {E} [ x ] \right\} \left\{y - \mathbb {E} [ y ] \right\} \right] \\ & = & \mathbb {E} _ {x, y} [ x y ] - \mathbb {E} [ x ] \mathbb {E} [ y ] \end{array}\tag{1.41}$$

cái mà diễn tả mức độ x và y biến thiên cùng nhau. Nếu x và y là độc lập, thì hiệp phương sai của chúng biến mất.

Trong trường hợp của hai vectơ các biến ngẫu nhiên x và ${ \bf y } ,$ , hiệp phương sai là một ma trận

$$\begin{array}{r c l} \operatorname{cov} [ \mathbf {x}, \mathbf {y} ] & = & \mathbb {E} _ {\mathbf {x}, \mathbf {y}} \left[ \{\mathbf {x} - \mathbb {E} [ \mathbf {x} ] \} \{\mathbf {y} ^ {\mathrm{T}} - \mathbb {E} [ \mathbf {y} ^ {\mathrm{T}} ] \} \right] \\ & = & \mathbb {E} _ {\mathbf {x}, \mathbf {y}} [ \mathbf {x y} ^ {\mathrm{T}} ] - \mathbb {E} [ \mathbf {x} ] \mathbb {E} [ \mathbf {y} ^ {\mathrm{T}} ]. \end{array}\tag{1.42}$$

Nếu chúng ta xem xét hiệp phương sai của các thành phần của một vectơ x với nhau, thì chúng tôi sử dụng một ký hiệu đơn giản hơn một chút cov $[ \mathbf { x } ] \equiv \operatorname { c o v } [ \mathbf { x } , \mathbf { x } ]$