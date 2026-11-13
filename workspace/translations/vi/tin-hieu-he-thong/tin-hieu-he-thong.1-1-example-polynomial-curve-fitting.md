Chúng tôi bắt đầu bằng cách giới thiệu một bài toán hồi quy đơn giản, mà chúng tôi sẽ sử dụng như một ví dụ chạy suốt chương này để thúc đẩy một số khái niệm chính. Giả sử chúng ta quan sát một biến đầu vào có giá trị thực x và chúng ta muốn sử dụng quan sát này để dự đoán giá trị của một biến mục tiêu có giá trị thực t. Với mục đích hiện tại, điều hữu ích là xem xét một ví dụ nhân tạo sử dụng dữ liệu được tạo tổng hợp vì khi đó chúng ta biết quá trình chính xác đã tạo ra dữ liệu để so sánh với bất kỳ mô hình nào được học. Dữ liệu cho ví dụ này được tạo từ hàm sin $( 2 \pi x )$ với nhiễu ngẫu nhiên được bao gồm trong các giá trị mục tiêu, như được mô tả chi tiết trong Phụ lục A.

Bây giờ giả sử rằng chúng ta được cung cấp một tập huấn luyện bao gồm N quan sát của $x ,$ được viết $\mathbf { x } \equiv ( x _ { 1 } , \ldots , x _ { N } ) ^ { \mathrm { T } }$ , cùng với các quan sát tương ứng của các giá trị của t, ký hiệu là ${ \bf t } \equiv ( t _ { 1 } , \ldots , t _ { N } ) ^ { \mathrm { T } }$ . Hình 1.2 cho thấy một biểu đồ của một tập huấn luyện bao gồm $N = 1 0$ điểm dữ liệu. Tập dữ liệu đầu vào x trong Hình 1.2 được tạo bằng cách chọn các giá trị của $x _ { n }$ , cho $n = 1 , \ldots , N$ , được đặt cách đều nhau trong khoảng [0, 1], và tập dữ liệu mục tiêu t được thu được bằng cách trước tiên tính các giá trị tương ứng của hàm sin $( 2 \pi x )$ và sau đó thêm một mức độ nhiễu ngẫu nhiên nhỏ có phân bố Gaussian (phân bố Gaussian được thảo luận trong Mục 1.2.4) vào mỗi điểm như vậy để thu được giá trị tương ứng $t _ { n }$ . Bằng cách tạo dữ liệu theo cách này, chúng ta đang nắm bắt một tính chất của nhiều tập dữ liệu thực, đó là chúng sở hữu một tính quy luật cơ bản, mà chúng ta muốn học, nhưng các quan sát riêng lẻ bị hỏng do nhiễu ngẫu nhiên. Nhiễu này có thể phát sinh từ các quá trình vốn có tính ngẫu nhiên (tức là ngẫu nhiên) như sự phân rã phóng xạ nhưng thường là do có các nguồn biến thiên tự nó chưa được quan sát.

Mục tiêu của chúng tôi là tận dụng tập huấn luyện này để dự đoán giá trị $\widehat { t }$ của biến mục tiêu cho một giá trị mới $\widehat { x }$ của biến đầu vào. Như chúng ta sẽ thấy sau, điều này liên quan đến việc ngầm cố gắng phát hiện hàm cơ bản sin(2πx). Đây vốn là một bài toán khó vì chúng ta phải khái quát hóa từ một tập dữ liệu hữu hạn. Hơn nữa, dữ liệu quan sát được bị hỏng bằng nhiễu, và do đó với một $\widehat { x }$ nhất định, có sự không chắc chắn về giá trị thích hợp cho $\widehat { t } .$  Lý thuyết xác suất, được thảo luận trong Mục 1.2, cung cấp một khung để biểu thị sự không chắc chắn như vậy theo một cách chính xác và định lượng, và lý thuyết quyết định, được thảo luận trong Mục 1.5, cho phép chúng ta tận dụng đại diện xác suất này để đưa ra dự đoán tối ưu theo các tiêu chí thích hợp.

Tuy nhiên, hiện tại chúng ta sẽ tiến hành khá không chính thức và xem xét một phương pháp đơn giản dựa trên khớp đường cong. Cụ thể, chúng ta sẽ khớp dữ liệu sử dụng một hàm đa thức có dạng

y (x, \mathbf {w}) = w _ {0} + w _ {1} x + w _ {2} x ^ {2} + \dots + w _ {M} x ^ {M} = \sum_ {j = 0} ^ {M} w _ {j} x ^ {j}\tag{1.1}

trong đó M là bậc của đa thức, và $x ^ { j }$ biểu thị x được nâng lên lũy thừa của $j$ . Các hệ số đa thức $w _ { 0 } , \ldots , w _ { M }$ được ký hiệu chung bằng vectơ w. Lưu ý rằng, mặc dù hàm đa thức $y ( x , \mathbf { w } )$ là một hàm phi tuyến của $x ,$ nó là một hàm tuyến tính của các hệ số w. Các hàm, chẳng hạn như đa thức, là tuyến tính trong các tham số chưa biết có các tính chất quan trọng và được gọi là các mô hình tuyến tính và sẽ được thảo luận rộng rãi trong Chương 3 và 4.

Các giá trị của các hệ số sẽ được xác định bằng cách khớp đa thức với dữ liệu huấn luyện. Điều này có thể được thực hiện bằng cách giảm thiểu một hàm lỗi để đo lường sự không khớp giữa hàm $y ( x , \mathbf { w } )$ , cho bất kỳ giá trị nào của w, và các điểm dữ liệu tập huấn luyện. Một lựa chọn hàm lỗi đơn giản, được sử dụng rộng rãi, được đưa ra bởi tổng bình phương của các lỗi giữa các dự đoán $y ( x _ { n } , \mathbf { w } )$ cho mỗi điểm dữ liệu $x _ { n }$ và các giá trị mục tiêu tương ứng $t _ { n }$ , sao cho chúng ta giảm thiểu

E (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \left\{y (x _ {n}, \mathbf {w}) - t _ {n} \right\} ^ {2}\tag{1.2}

trong đó hệ số của $1 / 2$ được bao gồm để thuận tiện sau này. Chúng ta sẽ thảo luận động lực cho lựa chọn hàm lỗi này sau trong chương này. Hiện tại, chúng ta chỉ lưu ý rằng nó là một đại lượng không âm sẽ bằng không nếu, và chỉ nếu,

Hình 1.3 Hàm lỗi (1.2) tương ứng với (một nửa) tổng bình phương của các chuyển vị (được hiển thị bằng các thanh xanh lục theo phương thẳng đứng) của mỗi điểm dữ liệu từ hàm $y ( x , \mathbf { w } )$

![image](images/part-001--c0b5184beb3ae3504d9ff2ab900284e52c2e3662d53badcd4a01189ed13e06ab.jpg)

hàm $y ( x , \mathbf { w } )$ đi qua chính xác mỗi điểm dữ liệu huấn luyện. Việc diễn giải hình học của hàm lỗi bình phương tổng được minh họa trong Hình 1.3.

Chúng ta có thể giải bài toán khớp đường cong bằng cách chọn giá trị của w mà $E ( \mathbf { w } )$ càng nhỏ càng tốt. Vì hàm lỗi là một hàm bậc hai của các hệ số w, các đạo hàm của nó đối với các hệ số sẽ là tuyến tính trong các phần tử của w, và do đó việc giảm thiểu hàm lỗi có một giải pháp duy nhất, ký hiệu là $\mathbf { w } ^ { \star }$ , có thể được tìm thấy ở dạng đóng. Đa thức kết quả được cho bởi hàm $y ( x , \mathbf { w } ^ { \star } )$ ).

Vẫn còn vấn đề lựa chọn bậc M của đa thức, và như chúng ta sẽ thấy, điều này sẽ hóa ra là một ví dụ về một khái niệm quan trọng được gọi là so sánh mô hình hoặc lựa chọn mô hình. Trong Hình 1.4, chúng tôi cho thấy bốn ví dụ về kết quả khớp đa thức có bậc $M = 0 , 1 , 3$ , và 9 với tập dữ liệu được hiển thị trong Hình 1.2.

Chúng ta nhận thấy rằng các đa thức hằng số $( M \ = \ 0 )$ và bậc nhất $( M = 1 )$ cho các khớp khá kém với dữ liệu và do đó khá kém biểu diễn hàm sin(2πx). Đa thức bậc ba $( M = 3 )$ dường như cho khớp tốt nhất với hàm sin $( 2 \pi x )$ trong các ví dụ được hiển thị trong Hình 1.4. Khi chúng ta chuyển sang một đa thức có bậc cao hơn nhiều $( M = 9 )$ , chúng ta có được một khớp tuyệt vời với dữ liệu huấn luyện. Trên thực tế, đa thức khớp chính xác với mỗi điểm dữ liệu và $E ( \mathbf { w } ^ { \star } ) = 0$ Tuy nhiên, đường cong khớp dao động rất mạnh và cho biểu diễn rất kém của hàm sin(2πx). Hành vi sau được gọi là quá khớp.

Như chúng ta đã lưu ý trước đây, mục tiêu là đạt được khái quát hóa tốt bằng cách dự đoán chính xác cho dữ liệu mới. Chúng ta có thể có được một số hiểu biết định lượng về sự phụ thuộc của hiệu suất khái quát hóa vào $M$ bằng cách xem xét một tập kiểm tra riêng biệt bao gồm 100 điểm dữ liệu được tạo bằng cách sử dụng chính xác cùng một thủ tục được sử dụng để tạo các điểm tập huấn luyện nhưng với các lựa chọn mới cho các giá trị nhiễu ngẫu nhiên được bao gồm trong các giá trị mục tiêu. Với mỗi lựa chọn của M, chúng ta có thể đánh giá giá trị phần dư của $E ( \mathbf { w } ^ { \star } )$ được cho bởi (1.2) cho dữ liệu huấn luyện, và chúng ta cũng có thể đánh giá $E ( \mathbf { w } ^ { \star } )$ cho tập dữ liệu kiểm tra. Đôi khi sẽ thuận tiện hơn khi sử dụng căn bậc hai của lỗi trung bình

![image](images/part-001--588c72d0194017d3ece853fd0de191dc0759b3ba1389bc02d890d5e61b59b0a4.jpg)

![image](images/part-001--df526720b589036c62277d9b7950f28b994bc1b4dfdc607079e308aaa1fe7b28.jpg)

![image](images/part-001--7113d1e93e8919ba5f1f7f126256c0f90d9dc543ccfc3e91a9983ecad9fe50e6.jpg)

![image](images/part-001--c1940d03147aceb48fbbfb63bd6d70434e20712545b54b2e00c7d518db2b589d.jpg)

Hình 1.4 Biểu đồ của các đa thức có bậc khác nhau M, được hiển thị dưới dạng các đường cong màu đỏ, khớp với tập dữ liệu được hiển thị trong Hình 1.2.

(RMS) lỗi được định nghĩa bởi

E _ {\mathrm{RMS}} = \sqrt {2 E (\mathbf {w} ^ {\star}) / N}\tag{1.3}

trong đó phép chia cho N cho phép chúng ta so sánh các kích thước khác nhau của tập dữ liệu trên cơ sở bằng nhau, và căn bậc hai đảm bảo rằng $E _ { \mathrm { R M S } }$ được đo trên cùng một thang độ (và trong cùng các đơn vị) như biến mục tiêu t. Các biểu đồ của các lỗi RMS của tập huấn luyện và tập kiểm tra được hiển thị, cho các giá trị khác nhau của M, trong Hình 1.5. Lỗi tập kiểm tra là một thước đo xem chúng ta đang làm tốt như thế nào trong việc dự đoán các giá trị của t cho các quan sát dữ liệu mới của x. Chúng ta lưu ý từ Hình 1.5 rằng các giá trị nhỏ của M cho các giá trị tương đối lớn của lỗi tập kiểm tra, và điều này có thể được quy trách cho thực tế rằng các đa thức tương ứng khá không linh hoạt và không có khả năng nắm bắt các dao động trong hàm sin(2πx). Các giá trị của M trong khoảng $3 \leqslant M \leqslant 8$ cho các giá trị nhỏ cho lỗi tập kiểm tra, và chúng cũng cho các biểu diễn hợp lý của hàm tạo sin(2πx), như có thể thấy, cho trường hợp $M = 3$ , từ Hình 1.4.

Hình 1.5 Đồ thị của lỗi căn bậc hai, được xác định bởi (1.3), được đánh giá trên tập huấn luyện và trên một tập kiểm tra độc lập cho các giá trị khác nhau của M.

![image](images/part-001--395ba75dad24025c9147592e37a1b59f59ce670af7cc276bb6ae49199124fab6.jpg)

Với $M \ : = \ : 9$ , lỗi tập huấn luyện sẽ bằng không, như chúng ta có thể mong đợi vì đa thức này chứa 10 bậc tự do tương ứng với 10 hệ số $w _ { 0 } , \ldots , w _ { 9 }$ , và do đó có thể được điều chỉnh chính xác với 10 điểm dữ liệu trong tập huấn luyện. Tuy nhiên, lỗi tập kiểm tra đã trở nên rất lớn và, như chúng ta đã thấy trong Hình 1.4, hàm tương ứng $y ( x , \mathbf { w } ^ { \star } )$ thể hiện những dao động dữ dội.

Điều này có vẻ mâu thuẫn vì một đa thức có một bậc nhất định chứa tất cả các đa thức bậc thấp hơn như các trường hợp đặc biệt. Đa thức $M = 9$ do đó có khả năng tạo ra các kết quả ít nhất cũng tốt như đa thức M = 3. Hơn nữa, chúng ta có thể cho rằng dự báo tốt nhất của dữ liệu mới sẽ là hàm sin(2πx) từ đó dữ liệu được tạo (và chúng ta sẽ thấy sau rằng điều này thực sự là đúng). Chúng ta biết rằng khai triển chuỗi lũy thừa của hàm sin $( 2 \pi x )$ chứa các số hạng của tất cả các bậc, nên chúng ta có thể mong đợi rằng các kết quả sẽ cải thiện một cách đơn điệu khi chúng ta tăng M.

Chúng ta có thể hiểu được sự cố bằng cách kiểm tra các giá trị của các hệ số $\mathbf { w } ^ { \star }$ thu được từ các đa thức có bậc khác nhau, như được hiển thị trong Bảng 1.1. Chúng ta thấy rằng, khi M tăng, độ lớn của các hệ số thường trở nên lớn hơn. Đặc biệt, đối với đa thức $M = 9$ , các hệ số đã trở nên tinh chỉnh tốt cho dữ liệu bằng cách phát triển các giá trị dương và âm lớn sao cho hàm đa thức tương ứng khớp chính xác mỗi điểm dữ liệu, nhưng giữa các điểm dữ liệu (đặc biệt gần các điểm cuối của phạm vi) hàm thể hiện những dao động lớn quan sát thấy trong Hình 1.4. Theo trực giác, điều gì đang xảy ra là các đa thức linh hoạt hơn với các giá trị lớn hơn của M đang ngày càng được điều chỉnh để phù hợp với nhiễu ngẫu nhiên trên các giá trị mục tiêu.

Bảng 1.1 Bảng các hệ số $\mathbf { w } ^ { \star }$ cho các đa thức có bậc khác nhau. Quan sát cách độ lớn điển hình của các hệ số tăng nhanh khi bậc của đa thức tăng.

<table><tr><td></td><td>M=0</td><td>M=1</td><td>M=6</td><td>M=9</td></tr><tr><td><eq>w_0^\star</eq></td><td>0.19</td><td>0.82</td><td>0.31</td><td>0.35</td></tr><tr><td><eq>w_1^\star</eq></td><td></td><td>-1.27</td><td>7.99</td><td>232.37</td></tr><tr><td><eq>w_2^\star</eq></td><td></td><td></td><td>-25.43</td><td>-5321.83</td></tr><tr><td><eq>w_3^\star</eq></td><td></td><td></td><td>17.37</td><td>48568.31</td></tr><tr><td><eq>w_4^\star</eq></td><td></td><td></td><td></td><td>-231639.30</td></tr><tr><td><eq>w_5^\star</eq></td><td></td><td></td><td></td><td>640042.26</td></tr><tr><td><eq>w_6^\star</eq></td><td></td><td></td><td></td><td>-1061800.52</td></tr><tr><td><eq>w_7^\star</eq></td><td></td><td></td><td></td><td>1042400.18</td></tr><tr><td><eq>w_8^\star</eq></td><td></td><td></td><td></td><td>-557682.99</td></tr><tr><td><eq>w_9^\star</eq></td><td></td><td></td><td></td><td>125201.43</td></tr></table>

![image](images/part-001--5d33e080de216ee867154eb4a967e48b94143b0860ca410701355fedfc65fbf1.jpg)

![image](images/part-001--aaf934c0327b3839d6deebf9a220414dba76710d3174883fb876e5be5853fb4b.jpg)

Hình 1.6 Biểu đồ của các giải pháp thu được bằng cách giảm thiểu hàm lỗi bình phương tổng sử dụng đa thức $M = 9$ cho $N = 1 5$ điểm dữ liệu (biểu đồ trái) và N = 100 điểm dữ liệu (biểu đồ phải). Chúng ta thấy rằng tăng kích thước của tập dữ liệu làm giảm vấn đề quá khớp.

Cũng rất thú vị khi kiểm tra hành vi của một mô hình nhất định khi kích thước của tập dữ liệu thay đổi, như được hiển thị trong Hình 1.6. Chúng ta thấy rằng, đối với một độ phức tạp mô hình nhất định, vấn đề quá khớp trở nên kém nghiêm trọng hơn khi kích thước của tập dữ liệu tăng. Một cách khác để nói điều này là tập dữ liệu càng lớn, mô hình càng phức tạp (hay nói cách khác là linh hoạt hơn) mà chúng ta có thể đủ khả năng khớp với dữ liệu. Một quy tắc heuristic sơ khai đôi khi được ủng hộ là số điểm dữ liệu không được ít hơn một bội số (giả sử 5 hoặc 10) của số tham số thích nghi trong mô hình. Tuy nhiên, như chúng ta sẽ thấy trong Chương 3, số lượng tham số không nhất thiết là thước đo phù hợp nhất của độ phức tạp mô hình.

Ngoài ra, có điều gì đó khá không thỏa mãn khi phải giới hạn số lượng tham số trong một mô hình theo kích thước của tập dữ liệu huấn luyện có sẵn. Dường như sẽ hợp lý hơn khi chọn độ phức tạp của mô hình theo độ phức tạp của vấn đề được giải quyết. Chúng ta sẽ thấy rằng phương pháp bình phương tối thiểu để tìm các tham số mô hình đại diện cho một trường hợp cụ thể của khả năng tối đa (được thảo luận trong Mục 1.2.5), và vấn đề quá khớp có thể được hiểu như một tính chất chung của khả năng tối đa. Bằng cách áp dụng một phương pháp Bayesian, vấn đề quá khớp có thể được tránh. Chúng ta sẽ thấy rằng không có khó khăn nào từ một quan điểm Bayesian trong việc sử dụng các mô hình mà số lượng tham số vượt quá rất nhiều số lượng điểm dữ liệu. Thực tế, trong một mô hình Bayesian, số lượng tham số có hiệu lực tự động thích ứng theo kích thước của tập dữ liệu.

Tuy nhiên, hiện tại nó là hữu ích để tiếp tục với phương pháp hiện tại và xem xét cách trong thực tế chúng ta có thể áp dụng nó cho các tập dữ liệu có kích thước hạn chế nơi chúng ta có thể muốn sử dụng các mô hình tương đối phức tạp và linh hoạt. Một kỹ thuật thường được sử dụng để kiểm soát hiện tượng quá khớp trong những trường hợp như vậy là chính quy hóa, bao gồm thêm một hạn kỳ phạt vào hàm lỗi (1.2) để ngăn chặn các hệ số đạt được các giá trị lớn. Hạn kỳ phạt đơn giản nhất có dạng tổng bình phương của tất cả các hệ số, dẫn đến hàm lỗi được sửa đổi có dạng

![image](images/part-001--c756eac92e69c7b29b73cbef70459653b6255a3608a4c164099c9a779da1f34e.jpg)

![image](images/part-001--58d3e04905f9e71eb8e2418f697fcd1b94a0206383909c5d71a680f04cd48fb8.jpg)

Hình 1.7 Biểu đồ của đa thức $M = 9$ khớp với tập dữ liệu được hiển thị trong Hình 1.2 sử dụng hàm lỗi được chính quy hóa (1.4) cho hai giá trị của tham số chính quy hóa λ tương ứng với ln $\lambda = - 1 8$ và ln $\lambda = 0$ . Trường hợp không có chính quy hóa, tức là $\lambda = 0$ , tương ứng với ln $\lambda = - \infty$ , được hiển thị ở phía dưới bên phải của Hình 1.4.

\widetilde {E} (\mathbf {w}) = \frac {1}{2} \sum_ {n = 1} ^ {N} \left\{y (x _ {n}, \mathbf {w}) - t _ {n} \right\} ^ {2} + \frac {\lambda}{2} \| \mathbf {w} \| ^ {2}\tag{1.4}

trong đó $\| \mathbf { w } \| ^ { 2 } \equiv \mathbf { w } ^ { \mathrm { T } } \mathbf { w } = w _ { 0 } ^ { 2 } + w _ { 1 } ^ { 2 } + . . . + w _ { M } ^ { 2 }$ , và hệ số λ điều chỉnh tầm quan trọng tương đối của hạn kỳ chính quy hóa so với hạn kỳ lỗi bình phương tổng. Lưu ý rằng thường hệ số $w _ { 0 }$ được loại trừ khỏi chính quy hóa vì sự bao gồm của nó khiến kết quả phụ thuộc vào lựa chọn gốc cho biến mục tiêu (Hastie et al., 2001), hoặc nó có thể được bao gồm nhưng với hệ số chính quy hóa riêng của nó (chúng ta sẽ thảo luận chủ đề này chi tiết hơn trong Mục 5.5.1). Một lần nữa, hàm lỗi trong (1.4) có thể được giảm thiểu chính xác ở dạng đóng. Các kỹ thuật như vậy được biết đến trong văn học thống kê là các phương pháp co rút vì chúng giảm giá trị của các hệ số. Trường hợp cụ thể của một chính quy hóa bậc hai được gọi là hồi quy sườn (Hoerl and Kennard, 1970). Trong bối cảnh của các mạng nơ-ron, phương pháp này được gọi là suy giảm trọng lượng.

Hình 1.7 cho thấy kết quả khớp đa thức bậc $M = 9$ với cùng tập dữ liệu như trước nhưng bây giờ sử dụng hàm lỗi được chính quy hóa được cho bởi (1.4). Chúng ta thấy rằng, với một giá trị của ln $\lambda = - 1 8$ , quá khớp đã bị triệt tiêu và chúng ta bây giờ có được một biểu diễn gần hơn nhiều của hàm cơ bản sin $( 2 \pi x )$ . Tuy nhiên, nếu chúng ta sử dụng một giá trị quá lớn cho λ thì chúng ta lại có được một khớp kém, như được hiển thị trong Hình 1.7 cho ln $\lambda = 0$ . Các hệ số tương ứng từ các đa thức khớp được đưa ra trong Bảng 1.2, cho thấy rằng chính quy hóa có tác dụng mong muốn là giảm

Bảng 1.2 Bảng các hệ số $\mathbf { w } ^ { \star }$ cho đa thức $M =$ 9 với các giá trị khác nhau cho tham số chính quy hóa λ. Lưu ý rằng ln $\lambda \ = \ - \infty$ tương ứng với một mô hình không có chính quy hóa, tức là đồ thị ở phía dưới bên phải trong Hình 1.4. Chúng ta thấy rằng, khi giá trị của λ tăng, độ lớn điển hình của các hệ số trở nên nhỏ hơn.

<table><tr><td></td><td><eq>\ln \lambda = -\infty</eq></td><td><eq>\ln \lambda = -18</eq></td><td><eq>\ln \lambda = 0</eq></td></tr><tr><td><eq>w_0^\star</eq></td><td>0.35</td><td>0.35</td><td>0.13</td></tr><tr><td><eq>w_1^\star</eq></td><td>232.37</td><td>4.74</td><td>-0.05</td></tr><tr><td><eq>w_2^\star</eq></td><td>-5321.83</td><td>-0.77</td><td>-0.06</td></tr><tr><td><eq>w_3^\star</eq></td><td>48568.31</td><td>-31.97</td><td>-0.05</td></tr><tr><td><eq>w_4^\star</eq></td><td>-231639.30</td><td>-3.89</td><td>-0.03</td></tr><tr><td><eq>w_5^\star</eq></td><td>640042.26</td><td>55.28</td><td>-0.02</td></tr><tr><td><eq>w_6^\star</eq></td><td>-1061800.52</td><td>41.32</td><td>-0.01</td></tr><tr><td><eq>w_7^\star</eq></td><td>1042400.18</td><td>-45.95</td><td>-0.00</td></tr><tr><td><eq>w_8^\star</eq></td><td>-557682.99</td><td>-91.53</td><td>0.00</td></tr><tr><td><eq>w_9^\star</eq></td><td>125201.43</td><td>72.68</td><td>0.01</td></tr></table>

độ lớn của các hệ số.

Tác động của hạn kỳ chính quy hóa trên lỗi khái quát hóa có thể được nhìn thấy bằng cách vẽ biểu đồ giá trị của lỗi RMS (1.3) cho cả tập huấn luyện và tập kiểm tra so với ln λ, như được hiển thị trong Hình 1.8. Chúng ta thấy rằng thực tế λ bây giờ kiểm soát độ phức tạp có hiệu lực của mô hình và do đó xác định mức độ quá khớp.

Vấn đề về độ phức tạp mô hình là một vấn đề quan trọng và sẽ được thảo luận rộng rãi trong Mục 1.3. Ở đây chúng tôi chỉ lưu ý rằng, nếu chúng tôi đang cố gắng giải quyết một ứng dụng thực tế sử dụng phương pháp này là giảm thiểu một hàm lỗi, chúng ta sẽ phải tìm một cách để xác định một giá trị phù hợp cho độ phức tạp mô hình. Các kết quả ở trên gợi ý một cách đơn giản để đạt được điều này, cụ thể là bằng cách lấy dữ liệu có sẵn và phân chia nó thành một tập huấn luyện, được sử dụng để xác định các hệ số w, và một tập xác thực riêng biệt, còn được gọi là tập giữ lại, được sử dụng để tối ưu hóa độ phức tạp mô hình (M hoặc λ). Tuy nhiên, trong nhiều trường hợp, điều này sẽ chứng tỏ là quá lãng phí dữ liệu huấn luyện có giá trị, và chúng ta phải tìm kiếm các phương pháp tinh vi hơn.

Cho đến nay, cuộc thảo luận của chúng tôi về khớp đường cong đa thức chủ yếu dựa trên trực giác. Bây giờ chúng tôi tìm kiếm một phương pháp tiếp cận có nguyên tắc hơn để giải quyết các vấn đề trong nhận dạng mẫu bằng cách quay sang thảo luận về lý thuyết xác suất. Cũng như cung cấp nền tảng cho hầu hết tất cả các phát triển tiếp theo trong cuốn sách này, nó cũng sẽ

Hình 1.8 Biểu đồ của lỗi căn bậc hai (1.3) so với ln λ cho đa thức $M = 9$ .

![image](images/part-001--ebf15bfe507cf22cc5554afc836e1f5bb707783f4dab73dd3d0e780945a37a7a.jpg)

mang lại cho chúng tôi một số hiểu biết quan trọng về các khái niệm chúng tôi đã giới thiệu trong bối cảnh khớp đường cong đa thức và sẽ cho phép chúng tôi mở rộng chúng cho các tình huống phức tạp hơn.