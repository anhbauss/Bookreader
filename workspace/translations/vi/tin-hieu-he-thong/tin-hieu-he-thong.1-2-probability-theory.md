Một khái niệm chính trong lĩnh vực nhận dạng mẫu là khái niệm về độ không chắc chắn. Nó phát sinh cả từ nhiễu trong các phép đo, cũng như từ kích thước hữu hạn của các tập dữ liệu. Lý thuyết xác suất cung cấp một khuôn khổ nhất quán để định lượng và thao tác độ không chắc chắn và tạo thành một trong những nền tảng trung tâm cho nhận dạng mẫu. Khi kết hợp với lý thuyết quyết định, được thảo luận trong Phần 1.5, nó cho phép chúng ta đưa ra những dự đoán tối ưu với tất cả các thông tin có sẵn cho chúng ta, mặc dù thông tin đó có thể không đầy đủ hoặc mơ hồ.

Chúng ta sẽ giới thiệu các khái niệm cơ bản của lý thuyết xác suất bằng cách xem xét một ví dụ đơn giản. Tưởng tượng rằng chúng ta có hai cái hộp, một cái đỏ và một cái xanh lam, và trong hộp đỏ chúng ta có 2 quả táo và 6 quả cam, và trong hộp xanh lam chúng ta có 3 quả táo và 1 quả cam. Điều này được minh họa trong Hình 1.9. Bây giờ giả sử rằng chúng ta chọn ngẫu nhiên một trong những cái hộp và từ hộp đó chúng ta chọn ngẫu nhiên một quả trái cây, và sau khi quan sát được loại quả nào chúng ta trả nó vào hộp mà nó đã lấy ra. Chúng ta có thể tưởng tượng lặp lại quy trình này nhiều lần. Giả sử rằng trong quá trình này chúng ta chọn hộp đỏ 40% lần và chúng ta chọn hộp xanh lam 60% lần, và khi chúng ta lấy một quả trái cây ra khỏi hộp thì chúng ta có khả năng bằng nhau để chọn bất kỳ quả trái cây nào trong hộp.

Trong ví dụ này, danh tính của hộp sẽ được chọn là một biến ngẫu nhiên, mà chúng ta sẽ ký hiệu là B. Biến ngẫu nhiên này có thể nhận một trong hai giá trị có thể, cụ thể là r (tương ứng với hộp đỏ) hoặc b (tương ứng với hộp xanh lam). Tương tự, danh tính của quả trái cây cũng là một biến ngẫu nhiên và sẽ được ký hiệu là F. Nó có thể nhận một trong hai giá trị a (đối với táo) hoặc o (đối với cam).

Để bắt đầu, chúng ta sẽ định nghĩa xác suất của một sự kiện là phân số lần sự kiện đó xảy ra trên tổng số lần thử, trong giới hạn khi tổng số lần thử tiến tới vô cùng. Do đó xác suất chọn hộp đỏ là 4/10

Chúng ta sử dụng một ví dụ đơn giản với hai hộp có màu sắc khác nhau, mỗi hộp chứa trái cây (táo được hiển thị bằng màu xanh lá cây và cam được hiển thị bằng màu cam) để giới thiệu các ý tưởng cơ bản của xác suất.

![image](images/part-001--da24b74475870a5db49d5a770b9c39e17702cafff58e8af498158de0c3776324.jpg)

Hình 1.10 Chúng ta có thể suy ra các quy tắc tổng và tích của xác suất bằng cách xem xét hai biến ngẫu nhiên, $X$ , nhận các giá trị $\{ x _ { i } \}$ trong đó $i = 1 , \dots , \mathbf { \bar { \cal M } }$ , và $Y$ , nhận các giá trị $\{ y _ { j } \}$ trong đó $j \doteq 1 , \ldots , L$ Trong minh họa này chúng ta có $M = 5$ và $L = 3 .$ Nếu chúng ta xem xét tổng số N trường hợp của các biến này, thì chúng ta ký hiệu số trường hợp trong đó $X = x _ { i }$ và $Y = y _ { j }$ bằng $n _ { i j } ,$ là số điểm trong ô tương ứng của mảng. Số điểm trong cột $i ,$ tương ứng với $X = x _ { i }$ , được ký hiệu bằng $c _ { i }$ , và số điểm trong hàng j, tương ứng với $Y = y _ { j }$ , được ký hiệu bằng $r _ { j }$

![image](images/part-001--02bc0c34b969a5235b4673f4918c7d7fc6d88973e3fde4e32cabc7a35375eafc.jpg)

và xác suất chọn hộp xanh lam là $6 / 1 0$ . Chúng ta viết những xác suất này dưới dạng $p ( B = r ) = 4 / 1 0$ và $p ( B = b ) = 6 / 1 0$ . Lưu ý rằng, theo định nghĩa, xác suất phải nằm trong khoảng [0, 1]. Ngoài ra, nếu các sự kiện là loại trừ lẫn nhau và nếu chúng bao gồm tất cả các kết quả có thể (ví dụ, trong ví dụ này hộp phải là đỏ hoặc xanh lam), thì chúng ta thấy rằng xác suất cho những sự kiện đó phải cộng lên thành một.

Chúng ta có thể đặt các câu hỏi như: "xác suất tổng thể mà quy trình lựa chọn sẽ chọn một quả táo là bao nhiêu?", hoặc "được biết rằng chúng ta đã chọn một quả cam, xác suất mà hộp chúng ta chọn là hộp xanh lam bao nhiêu?". Chúng ta có thể trả lời những câu hỏi như vậy, và thực tế là những câu hỏi phức tạp hơn nhiều liên quan đến các vấn đề trong nhận dạng mẫu, sau khi chúng ta đã trang bị cho mình hai quy tắc sơ cấp của xác suất, được gọi là quy tắc tổng và quy tắc tích. Sau khi có được các quy tắc này, chúng ta sẽ quay lại ví dụ hộp trái cây của chúng ta.

Để suy ra các quy tắc của xác suất, hãy xem xét ví dụ chung hơn một chút được hiển thị trong Hình 1.10 liên quan đến hai biến ngẫu nhiên X và Y (có thể là các biến Hộp và Trái cây được xem xét ở trên). Chúng ta sẽ giả sử rằng X có thể nhận bất kỳ giá trị nào $x _ { i }$ trong đó $i = 1 , \dots , M$ , và $Y$ có thể nhận các giá trị $y _ { j }$ trong đó $j = 1 , \dots , L$ . Xem xét tổng cộng N lần thử trong đó chúng ta lấy mẫu cả hai biến X và $Y$ , và cho phép số của những lần thử như vậy trong đó $X = x _ { i }$ và $Y = y _ { j }$ bằng $n _ { i j }$ . Ngoài ra, cho phép số lần thử trong đó X nhận giá trị $x _ { i }$ (bất kể giá trị mà $Y$ nhận) được ký hiệu bằng $c _ { i }$ , và tương tự cho phép số lần thử trong đó Y nhận giá trị $y _ { j }$ được ký hiệu bằng $r _ { j }$

Xác suất mà X sẽ nhận giá trị $x _ { i }$ và Y sẽ nhận giá trị $y _ { j }$ được viết $p ( X = x _ { i } , Y = y _ { j } )$ và được gọi là xác suất kết hợp của $X ~ = ~ x _ { i }$ và $Y = y _ { j }$ . Nó được cho bởi số điểm rơi vào ô $i , j$ dưới dạng một phân số của tổng số điểm, và do đó

p (X = x _ {i}, Y = y _ {j}) = \frac {n _ {i j}}{N}.\tag{1.5}

Ở đây chúng ta đang ngầm xem xét giới hạn $N \to \infty$ . Tương tự, xác suất mà X nhận giá trị $x _ { i }$ bất kể giá trị của Y được viết dưới dạng $p ( X = x _ { i } )$ và được cho bởi phân số của tổng số điểm rơi vào cột i, sao cho

p (X = x _ {i}) = \frac {c _ {i}}{N}.\tag{1.6}

Bởi vì số lượng trường hợp trong cột i trong Hình 1.10 chỉ là tổng của số lượng trường hợp trong mỗi ô của cột đó, chúng ta có $c _ { i } = \textstyle \sum _ { j } n _ { i j }$ và do đó,

từ (1.5) và (1.6), chúng ta có

p (X = x _ {i}) = \sum_ {j = 1} ^ {L} p (X = x _ {i}, Y = y _ {j})\tag{1.7}

đây là quy tắc tổng của xác suất. Lưu ý rằng $p ( X = x _ { i } )$ đôi khi được gọi là xác suất cận biên, bởi vì nó thu được bằng cách biên hóa, hoặc tính tổng, các biến khác (trong trường hợp này $Y )$

Nếu chúng ta chỉ xem xét những trường hợp mà $X ~ = ~ x _ { i }$ , thì phân số của những trường hợp như vậy mà $Y = y _ { j }$ được viết $p ( Y = y _ { j } | X = x _ { i } )$ và được gọi là xác suất có điều kiện của $Y ~ = ~ y _ { j }$ được cho $X ~ = ~ x _ { i }$ . Nó thu được bằng cách tìm phân số của những điểm trong cột i rơi vào ô $i , j$ và do đó được cho bởi

p (Y = y _ {j} | X = x _ {i}) = \frac {n _ {i j}}{c _ {i}}.\tag{1.8}

Từ (1.5), (1.6), và (1.8), chúng ta có thể suy ra mối quan hệ sau

\begin{array}{r c l} p (X = x _ {i}, Y = y _ {j}) & = & \frac {n _ {i j}}{N} = \frac {n _ {i j}}{c _ {i}} \cdot \frac {c _ {i}}{N} \\ & = & p (Y = y _ {j} | X = x _ {i}) p (X = x _ {i}) \end{array}\tag{1.9}

đây là quy tắc tích của xác suất.

Cho đến nay chúng ta đã khá cẩn thận để phân biệt giữa một biến ngẫu nhiên, chẳng hạn như hộp B trong ví dụ trái cây, và các giá trị mà biến ngẫu nhiên có thể nhận, ví dụ như r nếu hộp là cái đỏ. Do đó xác suất mà B nhận giá trị $r$ được ký hiệu $p ( B = r )$ . Mặc dù điều này giúp tránh sự mơ hồ, nó lại dẫn đến một ký hiệu khá cumbersome, và trong nhiều trường hợp sẽ không cần thiết phải có sự chi tiết như vậy. Thay vào đó, chúng ta có thể đơn giản viết $p ( B )$ để biểu thị một phân phối trên biến ngẫu nhiên $B ,$ hoặc $p ( r )$ để biểu thị phân phối được đánh giá cho giá trị cụ thể r, với điều kiện là cách giải thích rõ ràng từ bối cảnh.

Với ký hiệu gọn hơn này, chúng ta có thể viết hai quy tắc cơ bản của lý thuyết xác suất ở dạng sau.

Các Quy Tắc của Xác Suất

quy tắc tổng

p (X) = \sum_ {Y} p (X, Y)\tag{1.10}

quy tắc tích

p (X, Y) = p (Y | X) p (X).\tag{1.11}

Ở đây $p ( X , Y )$ là một xác suất kết hợp và được phát âm là "xác suất của X và $Y ^ { \ast }$ . Tương tự, đại lượng $p ( Y | X )$ là một xác suất có điều kiện và được phát âm là "xác suất của $Y$ được cho $X ^ { \dag }$ , trong khi đại lượng $p ( X )$ là một xác suất cận biên và đơn giản là "xác suất của $X ^ { \dag }$ . Hai quy tắc đơn giản này tạo thành cơ sở cho tất cả các máy móc xác suất mà chúng ta sử dụng trong toàn bộ cuốn sách này.

Từ quy tắc tích, cùng với tính chất đối xứng $p ( X , Y ) = p ( Y , X )$ chúng ta ngay lập tức có được mối quan hệ sau đây giữa các xác suất có điều kiện

p (Y | X) = \frac {p (X | Y) p (Y)}{p (X)}\tag{1.12}

được gọi là định lý Bayes và đóng một vai trò trung tâm trong nhận dạng mẫu và học máy. Sử dụng quy tắc tổng, mẫu số trong định lý Bayes có thể được biểu diễn dưới dạng các đại lượng xuất hiện trong tử số

p (X) = \sum_ {Y} p (X | Y) p (Y).\tag{1.13}

Chúng ta có thể xem mẫu số trong định lý Bayes là hằng số chuẩn hóa cần thiết để đảm bảo rằng tổng của xác suất có điều kiện trên phía bên trái của (1.12) trên tất cả các giá trị của $Y$ bằng một.

Trong Hình 1.11, chúng ta hiển thị một ví dụ đơn giản liên quan đến một phân phối kết hợp trên hai biến để minh họa khái niệm về phân phối cận biên và có điều kiện. Ở đây, một mẫu hữu hạn có $N = 6 0$ điểm dữ liệu đã được rút ra từ phân phối kết hợp và được hiển thị ở phía trên bên trái. Ở phía trên bên phải là biểu đồ tần suất các phân số của điểm dữ liệu có mỗi trong hai giá trị của $Y$ . Từ định nghĩa của xác suất, những phân số này sẽ bằng các xác suất tương ứng $p ( Y )$ trong giới hạn $N \to \infty$ . Chúng ta có thể xem biểu đồ tần suất là một cách đơn giản để mô hình hóa một phân phối xác suất chỉ được cung cấp một số điểm hữu hạn được rút ra từ phân phối đó. Mô hình hóa các phân phối từ dữ liệu nằm ở trung tâm của nhận dạng mẫu thống kê và sẽ được khám phá chi tiết trong cuốn sách này. Hai biểu đồ còn lại trong Hình 1.11 hiển thị các ước tính biểu đồ tần suất tương ứng của $p ( X )$ và $p ( X | Y = 1 )$

Bây giờ hãy quay lại ví dụ của chúng ta liên quan đến các hộp trái cây. Trong thời gian này, chúng ta sẽ một lần nữa rõ ràng về việc phân biệt giữa các biến ngẫu nhiên và các tức thời của chúng. Chúng ta đã thấy rằng xác suất chọn một trong các hộp đỏ hoặc xanh lam được cho bởi

p (B = r) = 4 / 1 0\tag{1.14}

p (B = b) = 6 / 1 0\tag{1.15}

tương ứng. Lưu ý rằng những điều này thỏa mãn $p ( B = r ) + p ( B = b ) = 1$

Bây giờ giả sử rằng chúng ta chọn một hộp ngẫu nhiên, và nó hóa ra là hộp xanh lam. Khi đó xác suất chọn một quả táo chỉ là phân số của các quả táo trong hộp xanh lam đó là $3 / 4$ , và vì vậy $p ( F = a | B = b ) = 3 / 4$ . Thực tế, chúng ta có thể viết ra tất cả bốn xác suất có điều kiện cho loại quả, được cho hộp được chọn

p (F = a | B = r) = 1 / 4\tag{1.16}

p (F = o | B = r) = 3 / 4\tag{1.17}

p (F = a | B = b) = 3 / 4\tag{1.18}

p (F = o | B = b) = 1 / 4.\tag{1.19}

![image](images/part-001--ec1a6f103bdd4654e27b95bca261898a019066465ca45fb55e6648d506d9403a.jpg)

p(X)

![image](images/part-001--75883a1167e7f746b64badb73b29586020f829ba470cf3f1128897ba5734e6df.jpg)

![image](images/part-001--a7ac085231bacec427a0c0e77d98d96fa53b5b2f241e2e9507ad8794c7a733c2.jpg)

![image](images/part-001--8e6d755a5bb08af9bbc1efbf3d242ebfe953cd96e09a91718fb826e2e045bf10.jpg)

Hình 1.11 Một minh họa về phân phối trên hai biến, $X ,$ , nhận 9 giá trị có thể, và ${ \cal Y } ,$ , nhận hai giá trị có thể. Hình phía trên bên trái cho thấy một mẫu 60 điểm được rút ra từ một phân phối xác suất kết hợp trên các biến này. Các hình còn lại hiển thị ước tính biểu đồ tần suất của các phân phối cận biên $p ( X )$ và $p ( Y )$ , cũng như phân phối có điều kiện $p ( X | Y = 1 )$ tương ứng với hàng dưới cùng trong hình phía trên bên trái.

Một lần nữa, lưu ý rằng những xác suất này được chuẩn hóa sao cho

p (F = a | B = r) + p (F = o | B = r) = 1\tag{1.20}

và tương tự

p (F = a | B = b) + p (F = o | B = b) = 1.\tag{1.21}

Chúng ta có thể bây giờ sử dụng các quy tắc tổng và tích của xác suất để đánh giá xác suất tổng thể chọn một quả táo

\begin{array}{r c l} p (F = a) & = & p (F = a \mid B = r) p (B = r) + p (F = a \mid B = b) p (B = b) \\ & = & \frac {1}{4} \times \frac {4}{1 0} + \frac {3}{4} \times \frac {6}{1 0} = \frac {1 1}{2 0} \end{array} \tag {C}\tag{1.22}

từ đó sau đó, sử dụng quy tắc tổng, rằng $p ( F = o ) = 1 - 1 1 / 2 0 = 9 / 2 0$

Giả sử thay vào đó chúng ta được biết rằng một quả trái cây đã được chọn và nó là một quả cam, và chúng ta muốn biết nó đến từ hộp nào. Điều này yêu cầu chúng ta đánh giá phân phối xác suất trên các hộp được điều kiện bởi danh tính của quả trái cây, trong khi xác suất trong (1.16)–(1.19) đưa ra phân phối xác suất trên quả trái cây được điều kiện bởi danh tính của hộp. Chúng ta có thể giải quyết vấn đề của việc đảo ngược xác suất có điều kiện bằng cách sử dụng định lý Bayes để đưa ra

p (B = r | F = o) = \frac {p (F = o | B = r) p (B = r)}{p (F = o)} = \frac {3}{4} \times \frac {4}{1 0} \times \frac {2 0}{9} = \frac {2}{3}.\tag{1.23}

Từ quy tắc tổng, nó sau đó theo sau đó $\begin{array} { r } { p ( B = b | F = o ) = 1 - 2 / 3 = 1 / 3 . } \end{array}$

Chúng ta có thể cung cấp một cách giải thích quan trọng về định lý Bayes như sau. Nếu chúng ta đã được yêu cầu hộp nào đã được chọn trước khi được biết danh tính của mục được chọn của trái cây, thì thông tin đầy đủ nhất mà chúng ta có sẵn được cung cấp bởi xác suất $p ( B )$ . Chúng ta gọi đây là xác suất tiên nghiệm vì nó là xác suất có sẵn trước khi chúng ta quan sát danh tính của quả trái cây. Khi chúng ta được biết rằng quả trái cây là một quả cam, chúng ta có thể sử dụng định lý Bayes để tính toán xác suất $p ( B | F )$ , mà chúng ta sẽ gọi là xác suất hậu nghiệm vì nó là xác suất thu được sau khi chúng ta quan sát $F _ { \cdot }$ . Lưu ý rằng trong ví dụ này, xác suất tiên nghiệm chọn hộp đỏ là $4 / 1 0 .$ , vì vậy chúng ta có nhiều khả năng chọn hộp xanh lam hơn là hộp đỏ. Tuy nhiên, khi chúng ta quan sát được rằng quả trái cây được chọn là một quả cam, chúng ta thấy rằng xác suất hậu nghiệm của hộp đỏ bây giờ là $2 / 3 ,$ , vì vậy bây giờ nó có nhiều khả năng hơn rằng hộp chúng ta chọn thực tế là hộp đỏ. Kết quả này phù hợp với trực giác của chúng ta, vì tỷ lệ cam cao hơn nhiều trong hộp đỏ so với trong hộp xanh lam, và vì vậy quan sát rằng quả trái cây là cam cung cấp bằng chứng đáng kể ủng hộ hộp đỏ. Thực tế, bằng chứng đủ mạnh để nó vượt quá tiên nghiệm và làm cho nó có khả năng hơn rằng hộp đỏ được chọn hơn là hộp xanh lam.

Cuối cùng, chúng ta lưu ý rằng nếu phân phối kết hợp của hai biến được phân tích thành tích của các biên, sao cho $p ( X , Y ) = p ( X ) p ( Y )$ , thì X và $Y$ được cho là độc lập. Từ quy tắc tích, chúng ta thấy rằng $p ( Y | X ) = p ( Y )$ , và vì vậy phân phối có điều kiện của $\bar { Y }$ được cho X thực sự độc lập với giá trị của $X$ . Ví dụ, trong ví dụ hộp trái cây của chúng ta, nếu mỗi hộp chứa cùng phân số của táo và cam, thì $p ( F | B ) = \bar { P } ( F )$ , sao cho xác suất chọn, ví dụ, một quả táo độc lập với hộp nào được chọn.