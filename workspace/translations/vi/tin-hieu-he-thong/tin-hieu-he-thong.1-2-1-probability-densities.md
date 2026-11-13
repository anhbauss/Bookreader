Cũng như xem xét các xác suất được xác định trên các tập hợp sự kiện rời rạc, chúng ta cũng muốn xem xét các xác suất liên quan đến các biến liên tục. Chúng ta sẽ giới hạn bản thân trong một cuộc thảo luận tương đối không chính thức. Nếu xác suất của một biến có giá trị thực x rơi vào khoảng $( x , x + \delta x )$ được cho bởi $p ( x ) \delta x$ cho $\delta x  0$ , thì $p ( x )$ được gọi là mật độ xác suất trên x. Điều này được minh họa trong Hình 1.12. Xác suất mà x sẽ nằm trong khoảng $( a , b )$ sau đó được cho bởi

p (x \in (a, b)) = \int_ {a} ^ {b} p (x) \mathrm{d} x.\tag{1.24}

Khái niệm xác suất cho các biến rời rạc có thể được mở rộng thành khái niệm mật độ xác suất $p ( x )$ trên một biến liên tục x và sao cho xác suất của x nằm trong khoảng $( x , x + \delta x )$ được cho bởi $p ( x ) \delta x$ cho $\dot { \delta x } \  \ \dot { 0 } .$ Mật độ xác suất có thể được biểu diễn dưới dạng đạo hàm của hàm phân phối tích lũy $P ( x )$ .

![image](images/part-001--ed4ed1550cd182ee335742a5f3c064675af832bffbfc72a53ae8a6b13780104c.jpg)

Vì các xác suất không âm, và vì giá trị của x phải nằm ở đâu đó trên trục thực, mật độ xác suất $p ( x )$ phải thỏa mãn hai điều kiện

p (x) \geqslant 0\tag{1.25}

\int_ {- \infty} ^ {\infty} p (x) \mathrm{d} x = 1.\tag{1.26}

Dưới một thay đổi biến phi tuyến tính, một mật độ xác suất biến đổi khác với một hàm đơn giản, do hệ số Jacobian. Chẳng hạn, nếu chúng ta xem xét một thay đổi biến $x = g ( y )$ , thì một hàm $f ( x )$ trở thành ${ \bf \bar { \boldsymbol { f } } } ( \boldsymbol { y } ) = f ( \boldsymbol { g } ( \boldsymbol { y } ) )$ Bây giờ xem xét một mật độ xác suất $p _ { x } ( x )$ tương ứng với một mật độ $p _ { y } ( y )$ đối với biến mới y, trong đó các chữ cái dưới biểu thị thực tế là $p _ { x } ( x )$ và $p _ { y } ( y )$ là các mật độ khác nhau. Các quan sát rơi vào phạm vi $( x , x + \delta x )$ sẽ, đối với các giá trị nhỏ của $\delta x$ , được biến đổi thành phạm vi $( y , y + \delta y )$ trong đó $p _ { x } ( x ) \delta x \simeq p _ { y } ( y ) \delta y$ và do đó

\begin{array}{r c l} p _ {y} (y) & = & p _ {x} (x) \left| \frac {\mathrm{d} x}{\mathrm{d} y} \right| \\ & = & p _ {x} (g (y))   | g ^ {\prime} (y) |  . \end{array}\tag{1.27}

Một hệ quả của tính chất này là khái niệm về cực đại của mật độ xác suất phụ thuộc vào lựa chọn biến.

Xác suất mà x nằm trong khoảng $( - \infty , z )$ được cho bởi hàm phân phối tích lũy được xác định bởi

P (z) = \int_ {- \infty} ^ {z} p (x) \mathrm{d} x\tag{1.28}

thỏa mãn $P ^ { \prime } ( x ) = p ( x )$ , như được hiển thị trong Hình 1.12.

Nếu chúng ta có nhiều biến liên tục $x _ { 1 } , \ldots , x _ { D }$ , được biểu thị tập thể bằng vectơ x, thì chúng ta có thể xác định một mật độ xác suất kết hợp $p ( \mathbf { x } ) = p ( x _ { 1 } , . . . , x _ { D } )$ sao cho xác suất của x rơi vào một thể tích vô cùng bé δx chứa điểm x được cho bởi $p ( \mathbf { x } ) \delta \mathbf { x }$ . Mật độ xác suất đa biến này phải thỏa mãn

p (\mathbf {x}) \geqslant 0\tag{1.29}

\int p (\mathbf {x}) \mathrm{d} \mathbf {x} = 1\tag{1.30}

trong đó tích phân được lấy trên toàn bộ không gian x. Chúng ta cũng có thể xem xét các phân phối xác suất kết hợp trên sự kết hợp của các biến rời rạc và liên tục.

Lưu ý rằng nếu x là một biến rời rạc, thì $p ( x )$ đôi khi được gọi là hàm khối lượng xác suất vì nó có thể được coi là một tập hợp các 'khối lượng xác suất' tập trung tại các giá trị được phép của x.

Các quy tắc tổng và tích của xác suất, cũng như định lý Bayes, áp dụng như nhau cho trường hợp của mật độ xác suất, hoặc cho sự kết hợp của các biến rời rạc và liên tục. Chẳng hạn, nếu x và y là hai biến thực, thì các quy tắc tổng và tích có dạng

p (x) = \int p (x, y) \mathrm{d} y\tag{1.31}

p (x, y) = p (y | x) p (x).\tag{1.32}

Một chứng minh chính thức của các quy tắc tổng và tích cho các biến liên tục (Feller, 1966) yêu cầu một nhánh của toán học được gọi là lý thuyết đo lường và nằm ngoài phạm vi của cuốn sách này. Tính hợp lệ của nó có thể được nhìn thấy một cách không chính thức, tuy nhiên, bằng cách chia mỗi biến thực thành các khoảng có chiều rộng $\Delta$ và xem xét phân phối xác suất rời rạc trên các khoảng này. Lấy giới hạn $\Delta \to 0$ sau đó chuyển các tổng thành tích phân và cho kết quả mong muốn.