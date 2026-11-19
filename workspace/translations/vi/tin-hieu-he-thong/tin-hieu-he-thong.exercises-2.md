1.1 () www Xét hàm lỗi bình phương tổng được cho bởi (1.2) trong đó hàm $y ( x , \mathbf { w } )$ được cho bởi đa thức (1.1). Chỉ ra rằng các hệ số $\mathbf { w } = \{ w _ { i } \}$ mà làm cực tiểu hàm lỗi này được cho bởi nghiệm của tập các phương trình tuyến tính sau

\sum_ {j = 0} ^ {M} A _ {i j} w _ {j} = T _ {i}\tag{1.122}

trong đó

A _ {i j} = \sum_ {n = 1} ^ {N} (x _ {n}) ^ {i + j}, \quad T _ {i} = \sum_ {n = 1} ^ {N} (x _ {n}) ^ {i} t _ {n}.\tag{1.123}

Ở đây hậu tố i hoặc $j$ biểu thị chỉ số của một thành phần, trong khi $( x ) ^ { i }$ biểu thị x lũy thừa với i.

1.2 () Viết tập các phương trình tuyến tính liên kết, tương tự với (1.122), được thỏa mãn bởi các hệ số $w _ { i }$ mà làm cực tiểu hàm lỗi bình phương tổng được chính quy hóa được cho bởi (1.4).

1.3 ( ) Giả sử chúng ta có ba hộp màu r (đỏ), b (xanh dương), và g (xanh lá cây). Hộp $r$ chứa 3 quả táo, 4 quả cam, và 3 quả chanh, hộp b chứa 1 quả táo, 1 quả cam, và 0 quả chanh, và hộp $g$ chứa 3 quả táo, 3 quả cam, và 4 quả chanh. Nếu một hộp được chọn ngẫu nhiên với xác suất $p ( r ) = 0 . 2 , p ( b ) = 0 . 2 , p ( g ) = 0 . 6 ,$ , và một trái cây được lấy ra từ hộp (với xác suất bằng nhau để chọn bất kỳ mục nào trong hộp), thì xác suất chọn một quả táo là bao nhiêu? Nếu chúng ta quan sát thấy rằng trái cây được chọn thực ra là một quả cam, xác suất nó đến từ hộp xanh lá cây là bao nhiêu?

1.4 ( ) www Xét một mật độ xác suất $p _ { x } ( x )$ được định nghĩa trên một biến liên tục x, và giả sử rằng chúng ta tạo một thay đổi biến phi tuyến tính sử dụng $x = g ( y )$ sao cho mật độ biến đổi theo (1.27). Bằng cách lấy đạo hàm của (1.27), chỉ ra rằng vị trí $\dot { \widehat { y } }$ của cực đại của mật độ trong y không liên quan chung chung đến vị trí $\widehat { x }$ của cực đại của mật độ trên x bởi quan hệ hàm số đơn giản ${ \widehat { x } } = g ( { \widehat { y } } )$ như là hệ quả của hệ số Jacobian. Điều này chỉ ra rằng cực đại của một mật độ xác suất (trái ngược với một hàm số đơn giản) phụ thuộc vào sự lựa chọn của biến. Xác minh rằng, trong trường hợp của một phép biến đổi tuyến tính, vị trí của cực đại biến đổi theo cách tương tự như chính biến đó.

1.5 () Sử dụng định nghĩa (1.38) chỉ ra rằng $\operatorname { v a r } [ f ( x ) ]$ thỏa mãn (1.39).

1.6 () Chỉ ra rằng nếu hai biến x và $y$ là độc lập, thì hiệp phương sai của chúng bằng không.

1.7 ( ) www Trong bài tập này, chúng ta chứng minh điều kiện chuẩn hóa (1.48) cho Gaussian một biến. Để làm điều này, hãy xem xét tích phân

I = \int_ {- \infty} ^ {\infty} \exp \left(- \frac {1}{2 \sigma^ {2}} x ^ {2}\right) \mathrm{d} x\tag{1.124}

mà chúng ta có thể tính bằng cách đầu tiên viết bình phương của nó dưới dạng

I ^ {2} = \int_ {- \infty} ^ {\infty} \int_ {- \infty} ^ {\infty} \exp \left(- \frac {1}{2 \sigma^ {2}} x ^ {2} - \frac {1}{2 \sigma^ {2}} y ^ {2}\right) \mathrm{d} x \mathrm{d} y.\tag{1.125}

Bây giờ hãy tạo phép biến đổi từ tọa độ Descartes $( x , y )$ sang tọa độ cực $( r , \theta )$ và sau đó thay thế $u = r ^ { 2 }$ . Chỉ ra rằng, bằng cách thực hiện các tích phân trên $\theta$ và $u ,$ và sau đó lấy căn bậc hai của cả hai vế, chúng ta nhận được

I = \left(2 \pi \sigma^ {2}\right) ^ {1 / 2}.\tag{1.126}

Cuối cùng, sử dụng kết quả này để chỉ ra rằng phân phối Gaussian $\mathcal { N } ( x | \mu , \sigma ^ { 2 } )$ được chuẩn hóa.

1.8 ( ) www Bằng cách sử dụng một thay đổi biến, xác minh rằng phân phối Gaussian một biến được cho bởi (1.46) thỏa mãn (1.49). Tiếp theo, bằng cách lấy đạo hàm của cả hai vế của điều kiện chuẩn hóa

\int_ {- \infty} ^ {\infty} \mathcal {N} (x | \mu , \sigma^ {2}) \mathrm{d} x = 1\tag{1.127}

đối với $\sigma ^ { 2 }$ , xác minh rằng Gaussian thỏa mãn (1.50). Cuối cùng, chỉ ra rằng (1.51) được giữ.

1.9 () www Chỉ ra rằng chế độ (tức là cực đại) của phân phối Gaussian (1.46) được cho bởi $\mu .$ Tương tự, chỉ ra rằng chế độ của Gaussian đa biến (1.52) được cho bởi $\mu .$

1.10 () www Giả sử rằng hai biến $x$ và $z$ là độc lập về mặt thống kê. Chỉ ra rằng giá trị trung bình và phương sai của tổng của chúng thỏa mãn

\mathbb {E} [ x + z ] = \mathbb {E} [ x ] + \mathbb {E} [ z ]\tag{1.128}

\operatorname{var} [ x + z ] = \operatorname{var} [ x ] + \operatorname{var} [ z ].\tag{1.129}

1.11 () $\boldsymbol { \mathrm { B y } }$ thiết lập các đạo hàm của hàm log-khả năng (1.54) đối với $\mu$ và $\sigma ^ { 2 }$ bằng không, xác minh các kết quả (1.55) và (1.56).

1.12 ( ) www Sử dụng các kết quả (1.49) và (1.50), chỉ ra rằng

\mathbb {E} [ x _ {n} x _ {m} ] = \mu^ {2} + I _ {n m} \sigma^ {2}\tag{1.130}

trong đó $x _ { n }$ và $x _ { m }$ biểu thị các điểm dữ liệu được lấy mẫu từ phân phối Gaussian với giá trị trung bình $\mu$ và phương sai $\sigma ^ { 2 }$ , và $I _ { n m }$ thỏa mãn $I _ { n m } = 1$ nếu $n = m$ và $I _ { n m } = 0$ khác. Do đó chứng minh các kết quả (1.57) và (1.58).

1.13 () Giả sử rằng phương sai của một Gaussian được ước tính bằng cách sử dụng kết quả (1.56) nhưng với ước tính khả năng tối đa $\mu _ { \mathrm { M L } }$ được thay thế bằng giá trị thực $\mu$ của giá trị trung bình. Chỉ ra rằng ước lượng này có tính chất là kỳ vọng của nó được cho bởi phương sai thực $\sigma ^ { 2 }$

1.14 ( ) Chỉ ra rằng một ma trận vuông tùy ý có các phần tử $w _ { i j }$ có thể được viết dưới dạng $w _ { i j } = w _ { i j } ^ { \mathrm { S } } + w _ { i j } ^ { \mathrm { A } }$ trong đó $w _ { i j } ^ { \mathrm { S } }$ và $w _ { i j } ^ { \mathrm { A } }$ là các ma trận đối xứng và phản đối xứng, tương ứng, thỏa mãn $w _ { i j } ^ { \mathrm { S } } = w _ { j i } ^ { \mathrm { S } }$ và $w _ { i j } ^ { \mathrm { A } } = - w _ { j i } ^ { \mathrm { A } }$ với tất cả i và $j .$ . Bây giờ hãy xem xét số hạng bậc hai trong một đa thức bậc cao hơn trong D chiều, được cho bởi

\sum_ {i = 1} ^ {D} \sum_ {j = 1} ^ {D} w _ {i j} x _ {i} x _ {j}.\tag{1.131}

Chỉ ra rằng

\sum_ {i = 1} ^ {D} \sum_ {j = 1} ^ {D} w _ {i j} x _ {i} x _ {j} = \sum_ {i = 1} ^ {D} \sum_ {j = 1} ^ {D} w _ {i j} ^ {\mathrm{S}} x _ {i} x _ {j}\tag{1.132}

sao cho đóng góp từ ma trận phản đối xứng biến mất. Do đó chúng ta thấy rằng, không mất tính tổng quát, ma trận các hệ số $w _ { i j }$ có thể được chọn là đối xứng, và do đó không phải tất cả $D ^ { 2 }$ phần tử của ma trận này có thể được chọn độc lập. Chỉ ra rằng số lượng các tham số độc lập trong ma trận $w _ { i j } ^ { \mathrm { S } }$ được cho bởi $D ( D + 1 ) / 2$

1.15 (  ) www Trong bài tập này và bài tiếp theo, chúng ta khám phá cách số lượng các tham số độc lập trong một đa thức tăng lên với thứ tự M của đa thức và với chiều D của không gian đầu vào. Chúng ta bắt đầu bằng cách viết xuống số hạng thứ $M ^ { \mathrm { t h } }$ cho một đa thức trong D chiều dưới dạng

\sum_ {i _ {1} = 1} ^ {D} \sum_ {i _ {2} = 1} ^ {D} \dots \sum_ {i _ {M} = 1} ^ {D} w _ {i _ {1} i _ {2} \dots i _ {M}} x _ {i _ {1}} x _ {i _ {2}} \dots x _ {i _ {M}}.\tag{1.133}

Các hệ số $w _ { i _ { 1 } i _ { 2 } \cdots i _ { M } }$ bao gồm $D ^ { M }$ phần tử, nhưng số lượng các tham số độc lập ít hơn đáng kể do nhiều tính đối xứng hoán vị của hệ số $x _ { i _ { 1 } } x _ { i _ { 2 } } \cdots x _ { i _ { M } }$ . Bắt đầu bằng cách chỉ ra rằng sự dư thừa trong các hệ số có thể được loại bỏ bằng cách viết lại số hạng thứ $\dot { M } ^ { \mathrm { t h } }$ này dưới dạng

\sum_ {i _ {1} = 1} ^ {D} \sum_ {i _ {2} = 1} ^ {i _ {1}} \dots \sum_ {i _ {M} = 1} ^ {i _ {M - 1}} \widetilde {w} _ {i _ {1} i _ {2} \ldots i _ {M}} x _ {i _ {1}} x _ {i _ {2}} \dots x _ {i _ {M}}.\tag{1.134}

Lưu ý rằng mối quan hệ chính xác giữa các hệ số $\widetilde { w }$ và w không cần phải được thực hiện rõ ràng. Sử dụng kết quả này để chỉ ra rằng số lượng các tham số độc lập $n ( D , M )$ , xuất hiện ở thứ tự $M ,$ , thỏa mãn quan hệ đệ quy sau

n (D, M) = \sum_ {i = 1} ^ {D} n (i, M - 1).\tag{1.135}

Tiếp theo sử dụng chứng minh bằng quy nạp để chỉ ra rằng kết quả sau đây được giữ

\sum_ {i = 1} ^ {D} \frac {(i + M - 2) !}{(i - 1) ! (M - 1) !} = \frac {(D + M - 1) !}{(D - 1) ! M !}\tag{1.136}

mà có thể được thực hiện bằng cách đầu tiên chứng minh kết quả cho $D = 1$ và M tùy ý bằng cách sử dụng kết quả $0 ! = 1$ , sau đó giả sử nó đúng với chiều D và xác minh rằng nó đúng với chiều $D + 1$ . Cuối cùng, sử dụng hai kết quả trước đó, cùng với chứng minh bằng quy nạp, để chỉ ra

n (D, M) = \frac {(D + M - 1) !}{(D - 1) ! M !}.\tag{1.137}

Để làm điều này, trước tiên hãy chỉ ra rằng kết quả đúng với $M = 2$ , và bất kỳ giá trị nào của $D \geqslant 1$ bằng cách so sánh với kết quả của Bài tập 1.14. Sau đó sử dụng (1.135), cùng với (1.136), để chỉ ra rằng, nếu kết quả được giữ ở thứ tự $M - 1$ , thì nó cũng sẽ được giữ ở thứ tự M

1.16 (  ) Trong Bài tập 1.15, chúng ta đã chứng minh kết quả (1.135) cho số lượng các tham số độc lập trong số hạng thứ $M ^ { \mathrm { t h } }$ của một đa thức D-chiều. Bây giờ chúng ta tìm một biểu thức cho tổng số $N ( D , M )$ các tham số độc lập trong tất cả các số hạng lên đến và bao gồm thứ tự M6. Trước tiên chỉ ra rằng $\bar { N } ( D , M )$ thỏa mãn

N (D, M) = \sum_ {m = 0} ^ {M} n (D, m)\tag{1.138}

trong đó $n ( D , m )$ là số lượng các tham số độc lập trong số hạng của thứ tự m. Bây giờ sử dụng kết quả (1.137), cùng với chứng minh bằng quy nạp, để chỉ ra rằng

N (d, M) = \frac {(D + M) !}{D !   M !}.\tag{1.139}

Điều này có thể được thực hiện bằng cách đầu tiên chứng minh rằng kết quả được giữ cho $M \ : = \ : 0$ và D tùy ý $\geqslant 1$ , sau đó giả sử rằng nó được giữ ở thứ tự $M .$ , và do đó chỉ ra rằng nó được giữ ở thứ tự $M + 1$ . Cuối cùng, sử dụng xấp xỉ Stirling dưới dạng

n! \simeq n ^ {n} e ^ {- n}\tag{1.140}

cho n lớn để chỉ ra rằng, đối với $D \gg M$ , lượng $N ( D , M )$ tăng lên như $D ^ { M }$ và đối với $M \gg D$ nó tăng lên như $M ^ { D }$ . Xem xét một đa thức bậc ba $( M = 3 )$ trong D chiều, và tính toán số lượng tổng các tham số độc lập cho (i) $D ~ = ~ 1 0$ và (ii) $D ~ = ~ 1 0 0$ , tương ứng với các ứng dụng học máy quy mô nhỏ và quy mô trung bình điển hình.

1.17 ( ) www Hàm gamma được định nghĩa bởi

\Gamma (x) \equiv \int_ {0} ^ {\infty} u ^ {x - 1} e ^ {- u} \mathrm{d} u.\tag{1.141}

Sử dụng tích phân từng phần, chứng minh quan hệ $\Gamma ( x + 1 ) = x \Gamma ( x )$ . Chỉ ra thêm rằng $\Gamma ( 1 ) = 1$ và do đó $\Gamma ( x + 1 ) =$ x! khi x là một số nguyên.

1.18 ( ) www Chúng ta có thể sử dụng kết quả (1.126) để rút ra một biểu thức cho diện tích bề mặt $S _ { D }$ , và thể tích $V _ { D }$ , của một hình cầu bán kính đơn vị trong $D$ chiều. Để làm điều này, hãy xem xét kết quả sau, được thu được bằng cách biến đổi từ tọa độ Descartes sang tọa độ cực

\prod_ {i = 1} ^ {D} \int_ {- \infty} ^ {\infty} e ^ {- x _ {i} ^ {2}} \mathrm{d} x _ {i} = S _ {D} \int_ {0} ^ {\infty} e ^ {- r ^ {2}} r ^ {D - 1} \mathrm{d} r.\tag{1.142}

Sử dụng định nghĩa (1.141) của Hàm Gamma, cùng với (1.126), tính toán cả hai vế của phương trình này, và do đó chỉ ra rằng

S _ {D} = \frac {2 \pi^ {D / 2}}{\Gamma (D / 2)}.\tag{1.143}

Tiếp theo, bằng cách tích phân đối với bán kính từ 0 đến 1, chỉ ra rằng thể tích của hình cầu đơn vị trong $D$ chiều được cho bởi

V _ {D} = \frac {S _ {D}}{D}.\tag{1.144}

Cuối cùng, sử dụng các kết quả $\Gamma ( 1 ) = 1$ và $\Gamma ( 3 / 2 ) = \sqrt { \pi } / 2$ để chỉ ra rằng (1.143) và (1.144) giảm xuống các biểu thức thông thường cho $D = 2$ và $D = 3$

1.19 ( ) Xem xét một hình cầu bán kính a trong D-chiều cùng với siêu lập phương đồng tâm có cạnh $2 a .$ , sao cho hình cầu tiếp xúc với siêu lập phương tại các tâm của mỗi cạnh của nó. Bằng cách sử dụng các kết quả của Bài tập 1.18, chỉ ra rằng tỷ lệ giữa thể tích của hình cầu với thể tích của khối lập phương được cho bởi

\frac {\text { volume   of   sphere }}{\text { volume   of   cube }} = \frac {\pi^ {D / 2}}{D 2 ^ {D - 1} \Gamma (D / 2)}.\tag{1.145}

Bây giờ sử dụng công thức Stirling dưới dạng

\Gamma (x + 1) \simeq (2 \pi) ^ {1 / 2} e ^ {- x} x ^ {x + 1 / 2}\tag{1.146}

mà hợp lệ cho $x \gg 1$ , để chỉ ra rằng, khi $D \to \infty$ , tỷ lệ (1.145) có xu hướng tiến tới không. Chỉ ra thêm rằng tỷ lệ giữa khoảng cách từ tâm của siêu lập phương đến một trong các góc, chia cho khoảng cách vuông góc đến một trong các cạnh, là $\sqrt { D }$ , do đó có xu hướng tiến tới $\infty$ khi $D \to \infty$ . Từ các kết quả này, chúng ta thấy rằng, trong một không gian có chiều cao cao, hầu hết thể tích của một khối lập phương được tập trung trong số lượng lớn các góc, chính những góc này trở thành rất dài 'spike'!

( ) www Trong bài tập này, chúng ta khám phá hành vi của phân phối Gaussian trong không gian có chiều cao cao. Xem xét phân phối Gaussian trong D chiều được cho bởi

p (\mathbf {x}) = \frac {1}{(2 \pi \sigma^ {2}) ^ {D / 2}} \exp \left(- \frac {\| \mathbf {x} \| ^ {2}}{2 \sigma^ {2}}\right).\tag{1.147}

Chúng ta muốn tìm mật độ đối với bán kính trong tọa độ cực trong đó các biến hướng đã được tích phân. Để làm điều này, chỉ ra rằng tích phân của mật độ xác suất trên một vỏ mỏng bán kính $r$ và độ dày $\epsilon ,$ trong đó $\epsilon \ll 1$ , được cho bởi $p ( r ) \epsilon$ trong đó

p (r) = \frac {S _ {D} r ^ {D - 1}}{(2 \pi \sigma^ {2}) ^ {D / 2}} \exp \left(- \frac {r ^ {2}}{2 \sigma^ {2}}\right)\tag{1.148}

trong đó $S _ { D }$ là diện tích bề mặt của một hình cầu đơn vị trong $D$ chiều. Chỉ ra rằng hàm $p ( r )$ có một điểm dừng duy nhất nằm, cho D lớn$_{ : }$ , tại $\widehat { r } \simeq \sqrt { D } \sigma$ . Bằng cách xem xét $p ( \widehat { r } + \epsilon )$ trong đó $\epsilon \ll { \widehat { r } } ,$ chỉ ra rằng cho D lớn$_{ \mathbf { \delta } }$

p (\widehat {r} + \epsilon) = p (\widehat {r}) \exp \left(- \frac {3 \epsilon^ {2}}{2 \sigma^ {2}}\right)\tag{1.149}

mà chỉ ra rằng $\widehat { r }$ là một cực đại của mật độ xác suất hướng tâm và cũng chỉ ra rằng $p ( r )$ phân rã theo cấp số nhân ra khỏi cực đại của nó tại $\widehat { r }$ với tỷ lệ độ dài $\sigma .$ Chúng ta đã thấy rằng $\sigma \ll \widehat { r }$ cho D lớn, và do đó chúng ta thấy rằng hầu hết khối lượng xác suất được tập trung trong một vỏ mỏng ở bán kính lớn. Cuối cùng, chỉ ra rằng mật độ xác suất $p ( \mathbf { x } )$ lớn hơn tại gốc tọa độ so với bán kính $\widehat { r }$ bởi một hệ số $\exp ( D / 2 )$ . Do đó chúng ta thấy rằng hầu hết khối lượng xác suất trong phân phối Gaussian có chiều cao cao được nằm ở một bán kính khác với vùng có mật độ xác suất cao. Tính chất này của các phân phối trong không gian có chiều cao cao sẽ có những hệ quả quan trọng khi chúng ta xem xét suy luận Bayesian của các tham số mô hình trong các chương sau.

1.21 ( ) Xem xét hai số không âm a và b, và chỉ ra rằng, nếu $a \leqslant b ,$ , thì $a \leqslant ( a b ) ^ { 1 / 2 }$ . Sử dụng kết quả này để chỉ ra rằng, nếu các vùng quyết định của một bài toán phân loại hai lớp được chọn để làm cực tiểu xác suất phân loại sai, xác suất này sẽ thỏa mãn

p (\text { mistake }) \leqslant \int \left\{p (\mathbf {x}, \mathcal {C} _ {1}) p (\mathbf {x}, \mathcal {C} _ {2}) \right\} ^ {1 / 2} \mathrm{d} \mathbf {x}.\tag{1.150}

1.22 () www Cho một ma trận tổn thất với các phần tử $L _ { k j }$ , rủi ro kỳ vọng được làm cực tiểu nếu, cho mỗi x, chúng ta chọn lớp mà làm cực tiểu (1.81). Xác minh rằng, khi ma trận tổn thất được cho bởi $L _ { k j } = 1 - I _ { k j }$ , trong đó $I _ { k j }$ là các phần tử của ma trận nhận dạng, điều này giảm xuống tiêu chí chọn lớp có xác suất hậu nghiệm lớn nhất. Sự giải thích của hình thức ma trận tổn thất này là gì?

1.23 () Rút ra tiêu chí cho cực tiểu tổn thất kỳ vọng khi có ma trận tổn thất tổng quát và xác suất tiên nghiệm tổng quát cho các lớp.

1.24 ( ) www Xem xét một bài toán phân loại trong đó tổn thất phát sinh khi một vector đầu vào từ lớp $\mathcal { C } _ { k }$ được phân loại là thuộc lớp $\mathcal { C } _ { j }$ được cho bởi ma trận tổn thất $L _ { k j }$ , và trong đó tổn thất phát sinh trong lựa chọn lựa chọn từ chối là λ. Tìm tiêu chí quyết định mà sẽ cho tổn thất kỳ vọng nhỏ nhất. Xác minh rằng điều này giảm xuống tiêu chí từ chối được thảo luận trong Phần 1.5.3 khi ma trận tổn thất được cho bởi $L _ { k j } = 1 - I _ { k j }$ . Mối quan hệ giữa λ và ngưỡng từ chối $\theta$ là gì?

1.25 () www Xem xét sự tổng quát hóa của hàm tổn thất bình phương (1.87) cho một biến mục tiêu duy nhất t thành trường hợp của nhiều biến mục tiêu được mô tả bởi vector t được cho bởi

\mathbb {E} [ L (\mathbf {t}, \mathbf {y} (\mathbf {x})) ] = \iint \| \mathbf {y} (\mathbf {x}) - \mathbf {t} \| ^ {2} p (\mathbf {x}, \mathbf {t}) d \mathbf {x} d \mathbf {t}.\tag{1.151}

Sử dụng phép tính của các biến thể, chỉ ra rằng hàm $\mathbf { y } ( \mathbf { x } )$ trong đó tổn thất kỳ vọng này được làm cực tiểu được cho bởi $\mathbf { y } ( \mathbf { x } ) = \mathbb { E } _ { \mathbf { t } } [ \mathbf { t } | \mathbf { x } ]$ . Chỉ ra rằng kết quả này giảm xuống (1.89) cho trường hợp một biến mục tiêu duy nhất t.

1.26 () Bằng cách khai triển hình vuông trong (1.151), rút ra một kết quả tương tự với (1.90) và do đó chỉ ra rằng hàm $\mathbf { y } ( \mathbf { x } )$ mà làm cực tiểu tổn thất bình phương kỳ vọng cho trường hợp một vector t của các biến mục tiêu lại được cho bởi kỳ vọng có điều kiện của t.

1.27 ( ) www Xem xét tổn thất kỳ vọng cho các bài toán hồi quy dưới hàm tổn thất $L _ { q }$ được cho bởi (1.91). Viết xuống điều kiện mà $y ( \mathbf x )$ phải thỏa mãn để làm cực tiểu $\mathbb { E } [ L _ { q } ]$ . Chỉ ra rằng, với $q = 1$ , giải pháp này biểu diễn trung vị có điều kiện, tức là hàm $y ( \mathbf x )$ sao cho khối lượng xác suất cho $t < y ( \mathbf { x } )$ bằng với khối lượng cho $t \geqslant y ( \mathbf { x } )$ . Cũng chỉ ra rằng tổn thất $L _ { q }$ kỳ vọng nhỏ nhất cho $q \to 0$ được cho bởi chế độ có điều kiện, tức là bởi hàm $y ( \mathbf x )$ bằng giá trị của t mà tối đa hóa $p ( t | \mathbf { x } )$ cho mỗi x.

1.28 () Trong Phần 1.6, chúng ta giới thiệu ý tưởng về entropy $h ( x )$ như là thông tin thu được khi quan sát giá trị của một biến ngẫu nhiên x có phân phối $p ( x )$ . Chúng ta thấy rằng, với các biến độc lập x và y trong đó $p ( x , y ) = p ( x ) p ( y )$ , các hàm entropy là cộng, sao cho $h ( x , y ) = h ( x ) + h ( y )$ . Trong bài tập này, chúng ta rút ra quan hệ giữa $h$ và $p$ dưới dạng của một hàm $h ( p )$ . Trước tiên chỉ ra rằng $h ( p ^ { 2 } ) =$ $2 h ( p )$ , và do đó bằng cảm ứng rằng $h ( p ^ { n } ) = n h ( p )$ trong đó n là một số nguyên dương. Do đó chỉ ra rằng ${ \dot { h ( p ^ { n / m } ) } } = ( n / m ) { \ddot { h ( p ) } }$ trong đó m cũng là một số nguyên dương. Điều này hàm ý rằng $h ( p ^ { x } ) = x h ( p )$ trong đó x là một số hữu tỉ dương, và do đó bằng tính liên tục khi nó là một số thực dương. Cuối cùng, chỉ ra rằng điều này hàm ý $h ( p )$ phải có dạng $h ( p ) \propto$ ln $p .$

1.29 () www Xem xét một biến ngẫu nhiên rời rạc M-trạng thái x, và sử dụng bất đẳng thức Jensen dưới dạng (1.115) để chỉ ra rằng entropy của phân phối của nó $p ( x )$ thỏa mãn $\mathrm { H } \bar { \vert x \vert } \leqslant$ ln M.

1.30 ( ) Tính toán phân kỳ Kullback-Leibler (1.113) giữa hai Gaussian $p ( x ) = \mathcal { N } ( x | \mu , \sigma ^ { 2 } )$ và $q ( x ) = \mathcal { N } ( x | m , s ^ { 2 } )$

Bảng 1.3 Phân phối chung $p ( x , y )$ cho hai biến nhị phân x và y được sử dụng trong Bài tập 1.39.

x \begin{array}{c c c} & y \\ & 0 & 1 \\ \hline 0 & 1 / 3 & 1 / 3 \\ 1 & 0 & 1 / 3 \end{array}

1.31 ( ) www Xem xét hai biến x và y có phân phối chung $p ( \mathbf x , \mathbf y )$ . Chỉ ra rằng entropy vi phân của cặp biến này thỏa mãn

\mathrm{H} [ \mathbf {x}, \mathbf {y} ] \leqslant \mathrm{H} [ \mathbf {x} ] + \mathrm{H} [ \mathbf {y} ]\tag{1.152}

với đẳng thức nếu, và chỉ nếu $\operatorname { i f } , \mathbf { x }$ và y là độc lập về mặt thống kê.

1.32 () Xem xét một vector x của các biến liên tục với phân phối $p ( \mathbf { x } )$ và entropy tương ứng $\mathrm { H } [ \mathbf { x } ]$ . Giả sử rằng chúng ta tạo một phép biến đổi tuyến tính không suy biến của x để thu được một biến mới $\mathbf { y } = \mathbf { A x }$ . Chỉ ra rằng entropy tương ứng được cho bởi $\mathrm { H } [ \mathbf { y } ] = \mathrm { H } [ \mathbf { x } ] + \ln { | \mathbf { A } | }$ trong đó $| \mathbf { A } |$ biểu thị định thức của A.

1.33 ( ) Giả sử rằng entropy có điều kiện $\mathrm { H } [ y | x ]$ giữa hai biến ngẫu nhiên rời rạc x và y bằng không. Chỉ ra rằng, với tất cả các giá trị của x sao cho $p ( x ) > 0$ , biến y phải là một hàm của $x ,$ nói cách khác với mỗi x chỉ có một giá trị của y sao cho $p ( y | x ) \neq 0$

1.34 ( ) www Sử dụng phép tính của các biến thể để chỉ ra rằng điểm dừng của hàm số (1.108) được cho bởi (1.108). Sau đó sử dụng các ràng buộc (1.105), (1.106), và (1.107) để loại bỏ các nhân số Lagrange và do đó chỉ ra rằng giải pháp entropy tối đa được cho bởi Gaussian (1.109).

1.35 () www Sử dụng các kết quả (1.106) và (1.107) để chỉ ra rằng entropy của Gaussian một biến (1.109) được cho bởi (1.110).

1.36 () Một hàm số lồi chặt được định nghĩa là hàm mà mỗi dây cung nằm phía trên hàm số. Chỉ ra rằng điều này tương đương với điều kiện rằng đạo hàm cấp hai của hàm số là dương.

1.37 () Sử dụng định nghĩa (1.111) cùng với quy tắc tích của xác suất, chứng minh kết quả (1.112).

1.38 ( ) www Sử dụng chứng minh bằng quy nạp, chỉ ra rằng bất đẳng thức (1.114) cho các hàm lồi hàm ý kết quả (1.115).

1.39 (  ) Xem xét hai biến nhị phân x và y có phân phối chung được cho trong Bảng 1.3. Tính toán các lượng sau (a) $\begin{array} { l } { \mathrm { H } [ x ] } \\ { \mathrm { H } [ y ] } \end{array}$ (c) $\begin{array} { r } { \mathrm { H } [ y | x ] } \\ { \mathrm { H } [ x | y ] } \end{array}$ (e) $\mathrm { H } [ x , y ]$ (b) (d) (f) $[ [ x , y ] .$

Vẽ một sơ đồ để chỉ ra mối quan hệ giữa các lượng khác nhau này.

1.40 () Bằng cách áp dụng bất đẳng thức Jensen (1.115) với $f ( x ) =$ ln x, chỉ ra rằng trung bình số học của một tập hợp các số thực không bao giờ nhỏ hơn trung bình hình học của chúng.

1.41 () www Sử dụng các quy tắc tổng và tích của xác suất, chỉ ra rằng thông tin lẫn nhau $I ( \mathbf { x } , \mathbf { y } )$ thỏa mãn quan hệ (1.121).