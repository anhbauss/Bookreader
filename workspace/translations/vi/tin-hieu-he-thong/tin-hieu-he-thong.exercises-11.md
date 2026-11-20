10.1 () www Xác minh rằng logarit của phân bố biên của dữ liệu quan sát ln $p ( \mathbf { X } )$ có thể được phân tích thành hai số hạng dưới dạng (10.2) trong đó $\mathcal { L } ( q )$ được cho bởi (10.3) và $\mathrm { K L } ( q \| p )$ được cho bởi (10.4).

10.2 () Sử dụng các tính chất $\mathbb { E } [ z _ { 1 } ] = m _ { 1 }$ và $\mathbb { E } [ z _ { 2 } ] = m _ { 2 }$ để giải các phương trình đồng thời (10.13) và (10.15), và do đó chỉ ra rằng, với điều kiện phân bố ban đầu $p ( \mathbf { z } )$ là không suy biến, giải duy nhất cho các trung bình của các thừa số trong phân bố xấp xỉ được cho bởi $\mathbb { E } [ z _ { 1 } ] = \mu _ { 1 }$ và $\mathbb { E } [ z _ { 2 } ] = \mu _ { 2 }$

10.3 ( ) www Xét phân bố biến phân có nhân tử hóa $q ( \mathbf { Z } )$ dưới dạng (10.5). Bằng cách sử dụng kỹ thuật nhân tử Lagrange, hãy xác minh rằng cực tiểu hóa phân kỳ Kullback-Leibler $\mathrm { K L } ( p \Vert q )$ đối với một trong các thừa số $q _ { i } ( \mathbf { Z } _ { i } )$ giữ tất cả các thừa số khác cố định, dẫn đến giải pháp (10.17).

10.4 ( ) Giả sử $p ( \mathbf { x } )$ là một phân bố cố định nào đó và chúng ta muốn xấp xỉ nó bằng phân bố Gaussian $q ( \mathbf { x } ) = \mathcal { N } ( \mathbf { x } | \boldsymbol { \mu } , \Sigma )$ . Bằng cách viết ra dạng của phân kỳ KL $\mathrm { K L } ( p | | q )$ cho một Gaussian $q ( \mathbf { x } )$ và sau đó lấy đạo hàm, hãy chỉ ra rằng cực tiểu hóa $\mathrm { K L } ( p | | q )$ đối với $\pmb { \mu }$ và $\pmb { \Sigma }$ dẫn đến kết quả rằng $\pmb { \mu }$ được cho bởi kỳ vọng của x dưới $p ( \mathbf { x } )$ và rằng Σ được cho bởi hiệp phương sai.

10.5 ( ) www Xét một mô hình trong đó tập hợp tất cả các biến ngẫu nhiên ẩn, ký hiệu tập thể bởi $\mathbf { Z } ,$ bao gồm một số biến tiềm ẩn z cùng với một số tham số mô hình $\pmb { \theta } .$ Giả sử chúng ta sử dụng phân bố biến phân được nhân tử hóa giữa các biến tiềm ẩn và tham số sao cho $q ( \mathbf { z } , \pmb { \theta } ) = q _ { \mathbf { z } } ( \mathbf { z } ) q _ { \pmb { \theta } } ( \pmb { \theta } )$ , trong đó phân bố $q _ { \pmb { \theta } } ( \pmb { \theta } )$ được xấp xỉ bởi một ước tính điểm có dạng ${ q } _ { \pmb { \theta } } ( \pmb { \theta } ) = \delta ( \pmb { \theta } - \pmb { \theta } _ { 0 } )$ trong đó $\theta _ { 0 }$ là một vectơ của các tham số tự do. Chỉ ra rằng tối ưu hóa biến phân của phân bố này được nhân tử hóa tương đương với một thuật toán EM, trong đó bước E tối ưu hóa $q _ { \mathbf { z } } ( \mathbf { z } )$ và bước M cực đại hóa phân bố logarit hậu nghiệm đầy đủ dữ liệu dự kiến của θ đối với $\theta _ { 0 }$

10.6 ( ) Họ phân kỳ alpha được định nghĩa bởi (10.19). Chỉ ra rằng phân kỳ Kullback-Leibler $\mathrm { K L } ( p \Vert q )$ tương ứng với $\alpha  1$ . Điều này có thể được thực hiện bằng cách viết $p ^ { \epsilon } = \exp ( \epsilon \ln p ) = 1 + \epsilon \ln p + O ( \epsilon ^ { 2 } )$ và sau đó lấy $\epsilon  0$ . Tương tự chỉ ra rằng $\mathrm { K L } ( q \| p )$ tương ứng với $\alpha  - 1$

10.7 ( ) Xét bài toán suy luận trung bình và độ chính xác của một Gaussian một chiều sử dụng xấp xỉ biến phân được nhân tử hóa, như được xem xét trong Phần 10.1.3. Chỉ ra rằng thừa số $q _ { \mu } ( \mu )$ là một Gaussian có dạng $\mathcal { N } ( \mu \vert \mu _ { N } , \lambda _ { N } ^ { - 1 } )$ với trung bình và độ chính xác được cho bởi (10.26) và (10.27), tương ứng. Tương tự chỉ ra rằng thừa số $q _ { \tau } ( \tau )$ là một phân bố gamma có dạng ${ \mathrm { G a m } } ( \tau | a _ { N } , b _ { N } )$ với các tham số được cho bởi (10.29) và (10.30).

10.8 () Xét phân bố hậu nghiệm biến phân cho độ chính xác của một Gaussian một chiều có các tham số được cho bởi (10.29) và (10.30). Bằng cách sử dụng các kết quả tiêu chuẩn cho trung bình và phương sai của phân bố gamma được cho bởi (B.27) và (B.28), hãy chỉ ra rằng nếu chúng ta để cho $N  \infty$ , phân bố hậu nghiệm biến phân này có một trung bình được cho bởi nghịch đảo của ước tính hợp lý tối đa cho phương sai của dữ liệu, và một phương sai đi về không.

10.9 ( ) Bằng cách sử dụng kết quả tiêu chuẩn $\mathbb { E } [ \tau ] = a _ { N } / b _ { N }$ cho trung bình của phân bố gamma, cùng với (10.26), (10.27), (10.29), và (10.30), hãy suy ra kết quả (10.33) cho nghịch đảo của độ chính xác dự kiến trong xử lý biến phân được nhân tử hóa của một Gaussian một chiều.

10.10 () www Suy ra phân tích được cho bởi (10.34) được sử dụng để tìm các phân bố hậu nghiệm xấp xỉ trên các mô hình bằng suy luận biến phân.

10.11 ( ) www Bằng cách sử dụng nhân tử Lagrange để áp dụng ràng buộc chuẩn hóa trên phân bố $q ( m )$ , hãy chỉ ra rằng cực đại của cận dưới (10.35) được cho bởi (10.36).

10.12 ( ) Bắt đầu từ phân bố kết hợp (10.41), và áp dụng kết quả chung (10.9), chỉ ra rằng phân bố biến phân tối ưu $q ^ { \star } ( \mathbf { Z } )$ trên các biến tiềm ẩn cho hỗn hợp Bayesian của Gaussian được cho bởi (10.48) bằng cách xác minh các bước được đưa ra trong văn bản.

10.13 ( ) www Bắt đầu từ (10.54), suy ra kết quả (10.59) cho phân bố hậu nghiệm biến phân tối ưu trên $\mu _ { k }$ và $\mathbf { \Lambda } _ { \Lambda _ { k } }$ trong hỗn hợp Bayesian của Gaussian, và do đó xác minh các biểu thức cho các tham số của phân bố này được cho bởi (10.60)–(10.63).

10.14 ( ) Sử dụng phân bố (10.59), xác minh kết quả (10.64).

10.15 () Sử dụng kết quả (B.17), hãy chỉ ra rằng giá trị dự kiến của các hệ số trộn trong hỗn hợp Gaussian biến phân được cho bởi (10.69).

10.16 ( ) www Xác minh kết quả (10.71) và (10.72) cho hai số hạng đầu tiên trong cận dưới cho mô hình hỗn hợp Gaussian biến phân được cho bởi (10.70).

10.17 (  ) Xác minh kết quả (10.73)–(10.77) cho các số hạng còn lại trong cận dưới cho mô hình hỗn hợp Gaussian biến phân được cho bởi (10.70).

10.18 (  ) Trong bài tập này, chúng ta sẽ suy ra các phương trình ước tính lại biến phân cho mô hình hỗn hợp Gaussian bằng cách phân biệt trực tiếp của cận dưới. Để làm điều này, chúng ta giả sử rằng phân bố biến phân có nhân tử hóa được định nghĩa bởi (10.42) và (10.55) với các thừa số được cho bởi (10.48), (10.57), và (10.59). Thay thế chúng vào (10.70) và do đó nhận được cận dưới như một hàm của các tham số của phân bố biến phân. Sau đó, bằng cách cực đại hóa cận liên quan đến các tham số này, suy ra các phương trình ước tính lại cho các thừa số trong phân bố biến phân, và chỉ ra rằng chúng giống như những phương trình thu được trong Phần 10.2.1.

10.19 ( ) Suy ra kết quả (10.81) cho phân bố dự đoán trong xử lý biến phân của mô hình hỗn hợp Bayesian của Gaussian.

10.20 ( ) www Bài tập này khám phá giải pháp Bayes biến phân cho mô hình hỗn hợp Gaussian khi kích thước N của tập dữ liệu lớn và chỉ ra rằng nó được giảm (như chúng ta sẽ mong đợi) thành giải pháp hợp lý tối đa dựa trên EM được suy ra trong Chương 9. Lưu ý rằng các kết quả từ Phụ lục B có thể được sử dụng để giúp trả lời bài tập này. Đầu tiên chỉ ra rằng phân bố hậu nghiệm $q ^ { \star } ( \Lambda _ { k } )$ của các độ chính xác trở nên sắc nét xung quanh giải pháp hợp lý tối đa. Làm tương tự cho phân bố hậu nghiệm của các trung bình $q ^ { \star } ( \pmb { \mu } _ { k } | \pmb { \Lambda } _ { k } )$ . Tiếp theo xem xét phân bố hậu nghiệm $q ^ { \star } ( \pi )$ cho các hệ số trộn và chỉ ra rằng điều này cũng trở nên sắc nét xung quanh giải pháp hợp lý tối đa. Tương tự, hãy chỉ ra rằng các trách nhiệm trở nên bằng các giá trị hợp lý tối đa tương ứng cho N lớn, bằng cách sử dụng kết quả tiệm cận sau đây cho hàm digamma cho x lớn

\psi (x) = \ln x + O \left(1 / x\right).\tag{10.241}

Cuối cùng, bằng cách sử dụng (10.80), hãy chỉ ra rằng đối với N lớn, phân bố dự đoán trở thành một hỗn hợp của Gaussian.

10.21 () Chỉ ra rằng số lượng cài đặt tham số tương đương do các đối xứng hoán vị trong một mô hình hỗn hợp với K thành phần là K!.

10.22 ( ) Chúng ta đã thấy rằng mỗi chế độ của phân bố hậu nghiệm trong một mô hình hỗn hợp Gaussian là một thành viên của một họ các chế độ tương đương K!. Giả sử rằng kết quả của việc chạy thuật toán suy luận biến phân là một phân bố hậu nghiệm xấp xỉ $q$ được bản địa hóa trong vùng lân cận của một trong các chế độ. Chúng ta có thể sau đó xấp xỉ phân bố hậu nghiệm đầy đủ như một hỗn hợp của $K !$ phân bố $q$ như vậy, một lần tập trung trên mỗi chế độ và có các hệ số trộn bằng nhau. Chỉ ra rằng nếu chúng ta giả sử sự chồng lấp không đáng kể giữa các thành phần của hỗn hợp $q$ , cận dưới kết quả khác với cận dưới cho một thành phần $q$ duy nhất thông qua sự thêm vào của một số hạng bổ sung ln $K !$

10.23 ( ) www Xét một mô hình hỗn hợp Gaussian biến phân trong đó không có phân bố trước trên các hệ số trộn $\{ \pi _ { k } \}$ . Thay vào đó, các hệ số trộn được coi như các tham số, có giá trị được tìm bằng cách cực đại hóa cận dưới biến phân trên logarit của khả năng biên. Chỉ ra rằng cực đại hóa cận dưới này đối với các hệ số trộn, sử dụng nhân tử Lagrange để áp dụng ràng buộc rằng các hệ số trộn tổng bằng một, dẫn đến kết quả ước tính lại (10.83). Lưu ý rằng không cần phải xem xét tất cả các số hạng trong cận dưới mà chỉ cần xem xét sự phụ thuộc của cận vào $\{ \pi _ { k } \}$

10.24 ( ) www Chúng ta đã thấy trong Phần 10.2 rằng các điểm kỳ dị phát sinh trong xử lý hợp lý tối đa của các mô hình hỗn hợp Gaussian không phát sinh trong xử lý Bayesian. Hãy thảo luận về liệu các điểm kỳ dị như vậy sẽ phát sinh nếu mô hình Bayesian được giải quyết bằng cách ước tính hậu nghiệm tối đa (MAP).

10.25 ( ) Xử lý biến phân của hỗn hợp Bayesian của Gaussian, được thảo luận trong Phần 10.2, đã sử dụng xấp xỉ nhân tử hóa (10.5) với phân bố hậu nghiệm. Như chúng ta đã thấy trong Hình 10.2, giả định nhân tử hóa gây ra phương sai của phân bố hậu nghiệm bị đánh giá thấp cho các hướng nhất định trong không gian tham số. Hãy thảo luận một cách định tính về tác động mà điều này sẽ có trên xấp xỉ biến phân của bằng chứng mô hình, và cách tác động này sẽ thay đổi theo số lượng thành phần trong hỗn hợp. Do đó giải thích liệu hỗn hợp Gaussian biến phân sẽ có xu hướng đánh giá thấp hoặc đánh giá cao số lượng thành phần tối ưu.

10.26 (  ) Mở rộng xử lý biến phân của hồi quy tuyến tính Bayesian để bao gồm một siêu độ trước gamma Gam $( \beta | c _ { 0 } , d _ { 0 } )$ trên $\beta$ và giải biến phân, bằng cách giả sử phân bố biến phân nhân tử hóa dạng $q ( \mathbf { w } ) q ( \alpha ) q ( \beta )$ . Suy ra các phương trình cập nhật biến phân cho ba thừa số trong phân bố biến phân và cũng có được một biểu thức cho cận dưới và cho phân bố dự đoán.

10.27 ( ) Bằng cách sử dụng các công thức được đưa ra trong Phụ lục B chỉ ra rằng cận dưới biến phân cho mô hình hồi quy hàm cơ sở tuyến tính, được định nghĩa bởi (10.107), có thể được viết dưới dạng (10.107) với các số hạng khác nhau được định nghĩa bởi (10.108)–(10.112).

10.28 (  ) Viết lại mô hình cho hỗn hợp Bayesian của Gaussian, được giới thiệu trong Phần 10.2, như một mô hình liên hợp từ họ hàm mũ, như được thảo luận trong Phần 10.4. Do đó sử dụng các kết quả chung (10.115) và (10.119) để suy ra các kết quả cụ thể (10.48), (10.57), và (10.59).

10.29 () www Chỉ ra rằng hàm $f ( x ) = \ln ( x )$ là lõm cho $0 < x < \infty$ bằng cách tính đạo hàm cấp hai của nó. Xác định dạng của hàm kép $g ( \lambda )$ được định nghĩa bởi (10.133), và xác minh rằng cực tiểu hóa $\lambda x - g ( \lambda )$ đối với λ theo (10.132) thực sự phục hồi hàm ln(x).

10.30 () Bằng cách đánh giá đạo hàm cấp hai, chỉ ra rằng hàm logistic logarit $f ( x ) =$ $- \ln ( 1 + e ^ { - x } )$ là lõm. Suy ra cận trên biến phân (10.137) trực tiếp bằng cách tạo khai triển Taylor cấp hai của hàm logistic logarit xung quanh một điểm $x = \xi$

10.31 ( ) Bằng cách tìm đạo hàm cấp hai đối với x, chỉ ra rằng hàm $f ( x ) = { \dot { - } } \ln ( e ^ { x { \mathord { \left/ { \vphantom { \mathrm { 1 2 } } } \right. \kern - delimiterspace } 2 } } + e ^ { - x / 2 } )$ là một hàm lõm của $x .$ Bây giờ xem xét các đạo hàm cấp hai liên quan đến biến $x ^ { 2 }$ và do đó chỉ ra rằng nó là một hàm lồi của $x ^ { 2 }$ . Vẽ đồ thị của $f ( x )$ so với x và so với $x ^ { 2 }$ . Suy ra cận dưới (10.144) trên hàm sigmoid logistic trực tiếp bằng cách tạo khai triển chuỗi Taylor cấp một của hàm $f ( x )$ trong biến $x ^ { \mathrm { 2 } }$ tập trung trên giá trị $\xi ^ { 2 }$

10.32 ( ) www Xét xử lý biến phân của hồi quy logistic với học tập tuần tự trong đó các điểm dữ liệu đến từng cái một và mỗi điểm phải được xử lý và loại bỏ trước khi điểm dữ liệu tiếp theo đến. Chỉ ra rằng xấp xỉ Gaussian cho phân bố hậu nghiệm có thể được duy trì thông qua việc sử dụng cận dưới (10.151), trong đó phân bố được khởi tạo bằng cách sử dụng độ trước, và khi mỗi điểm dữ liệu được hấp thụ, tham số biến phân tương ứng $\xi _ { n }$ của nó được tối ưu hóa.

10.33 () Bằng cách phân biệt đại lượng $Q ( \xi , \xi ^ { \mathrm { o l d } } )$ được định nghĩa bởi (10.161) đối với tham số biến phân $\xi _ { n }$ chỉ ra rằng phương trình cập nhật cho $\xi _ { n }$ cho mô hình hồi quy logistic Bayesian được cho bởi (10.163).

10.34 ( ) Trong bài tập này chúng ta suy ra các phương trình ước tính lại cho các tham số biến phân $\boldsymbol { \xi }$ trong mô hình hồi quy logistic Bayesian của Phần 4.5 bằng cách cực đại hóa trực tiếp cận dưới được cho bởi (10.164). Để làm điều này đặt đạo hàm của $\mathcal { L } ( \pmb { \xi } )$ đối với $\xi _ { n }$ bằng không, sử dụng kết quả (3.117) cho đạo hàm của logarit của một định thức, cùng với các biểu thức (10.157) và (10.158) định nghĩa trung bình và hiệp phương sai của phân bố hậu nghiệm biến phân $q ( \mathbf { w } )$

10.35 ( ) Suy ra kết quả (10.164) cho cận dưới $\mathcal { L } ( \pmb { \xi } )$ trong mô hình hồi quy logistic biến phân. Điều này được thực hiện dễ nhất bằng cách thay thế các biểu thức cho độ trước Gaussian $q ( \mathbf { w } ) = \mathcal { N } ( \mathbf { w } | \mathbf { m } _ { 0 } , \mathbf { S } _ { 0 } )$ , cùng với cận dưới $h ( \mathbf { w } , \pmb { \xi } )$ trên hàm khả năng, vào tích phân (10.159) định nghĩa $\mathcal { L } ( \pmb { \xi } )$ . Tiếp theo thu thập các số hạng phụ thuộc vào w trong hàm mũ và hoàn thành bình phương để cho một tích phân Gaussian, sau đó có thể được đánh giá bằng cách gọi kết quả tiêu chuẩn cho hệ số chuẩn hóa của một Gaussian đa biến. Cuối cùng lấy logarit để nhận được (10.164).

10.36 ( ) Xét sơ đồ xấp xỉ ADF được thảo luận trong Phần 10.7, và chỉ ra rằng bao gồm thừa số $f _ { j } ( \pmb \theta )$ dẫn đến cập nhật của bằng chứng mô hình có dạng

p _ {j} (\mathcal {D}) \simeq p _ {j - 1} (\mathcal {D}) Z _ {j}\tag{10.242}

trong đó $Z _ { j }$ là hằng số chuẩn hóa được định nghĩa bởi (10.197). Bằng cách áp dụng kết quả này một cách đệ quy, và khởi tạo với $p _ { 0 } ( \mathcal { D } ) = 1$ , suy ra kết quả

p (\mathcal {D}) \simeq \prod_ {j} Z _ {j}.\tag{10.243}

10.37 () www Xét thuật toán lan truyền kỳ vọng từ Phần 10.7, và giả sử rằng một trong các thừa số $f _ { 0 } ( \pmb { \theta } )$ trong định nghĩa (10.188) có cùng dạng hàm họ hàm mũ như phân bố xấp xỉ $q ( \pmb \theta )$ . Chỉ ra rằng nếu thừa số $\widetilde { f } _ { 0 } ( \pmb { \theta } )$ được khởi tạo để là $f _ { 0 } ( \pmb { \theta } )$ , thì cập nhật EP để tinh chỉnh $\widetilde { f } _ { 0 } ( \pmb { \theta } )$ để $\widetilde { f } _ { 0 } ( \pmb { \theta } )$  không thay đổi. Tình huống này thường phát sinh khi một trong các thừa số là độ trước $p ( \pmb \theta )$ , và vì vậy chúng ta thấy rằng thừa số độ trước có thể được kết hợp một lần chính xác và không cần phải được tinh chỉnh.

10.38 (  ) Trong bài tập này và bài tiếp theo, chúng ta sẽ xác minh kết quả (10.214)–(10.224) cho thuật toán lan truyền kỳ vọng được áp dụng cho vấn đề lộn xộn. Bắt đầu bằng cách sử dụng công thức chia (10.205) để suy ra các biểu thức (10.214) và (10.215) bằng cách hoàn thành bình phương bên trong hàm mũ để xác định trung bình và phương sai. Cũng chỉ ra rằng hằng số chuẩn hóa $Z _ { n }$ , được định nghĩa bởi (10.206), được cho cho vấn đề lộn xộn bởi (10.216). Điều này có thể được thực hiện bằng cách sử dụng kết quả chung (2.115).

10.39 (  ) Chỉ ra rằng trung bình và phương sai của $q ^ { \mathrm { n e w } } ( \pmb { \theta } )$ cho EP được áp dụng cho vấn đề lộn xộn được cho bởi (10.217) và (10.218). Để làm điều này, trước tiên hãy chứng minh các kết quả sau đây cho kỳ vọng của $\pmb \theta$ và $\boldsymbol { \theta \theta ^ { \mathrm { T } } }$ dưới $q ^ { \mathrm { n e w } } ( \pmb { \theta } )$

{\mathbb {E} [ \pmb {\theta} ]} = {\mathbf {m} ^ {\backslash n} + v ^ {\backslash n} \nabla_ {\mathbf {m} ^ {\backslash n}} \ln Z _ {n}}\tag{10.244}

\mathbb {E} [ \boldsymbol {\theta} ^ {\mathrm{T}} \boldsymbol {\theta} ] = 2 (v ^ {\backslash n}) ^ {2} \nabla_ {v ^ {\backslash n}} \ln Z _ {n} + 2 \mathbb {E} [ \boldsymbol {\theta} ] ^ {\mathrm{T}} \mathbf {m} ^ {\backslash n} - \| \mathbf {m} ^ {\backslash n} \| ^ {2}\tag{10.245}

và sau đó sử dụng kết quả (10.216) cho $Z _ { n }$ . Tiếp theo, chứng minh các kết quả (10.220)–(10.222) bằng cách sử dụng (10.207) và hoàn thành bình phương trong hàm mũ. Cuối cùng, sử dụng (10.208) để suy ra kết quả (10.223).