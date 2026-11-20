Trong Chương 6, chúng tôi đã thấy cách kỹ thuật thế nhân kernel cho phép chúng tôi lấy một thuật toán được biểu diễn dưới dạng tích vô hướng có dạng $\mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ và tổng quát hóa thuật toán đó bằng cách thay thế các tích vô hướng bằng một kernel phi tuyến. Ở đây chúng tôi áp dụng kỹ thuật thế nhân kernel này cho phân tích thành phần chính, do đó thu được một tổng quát hóa phi tuyến được gọi là kernel PCA (Scholkopf et al., 1998).

Xét một tập dữ liệu $\left\{ \mathbf { x } _ { n } \right\}$ gồm các quan sát, trong đó $n = 1 , \ldots , N .$ , trong một không gian có chiều $D$ Để giữ ký hiệu không bị lộn xộn, chúng tôi sẽ giả định rằng chúng tôi đã trừ đi trung bình mẫu từ mỗi vector ${ \bf x } _ { n }$ , sao cho $\textstyle \sum _ { n } \mathbf { x } _ { n } = \mathbf { 0 }$ . Bước đầu tiên là biểu diễn PCA thông thường theo một dạng sao cho các vector dữ liệu $\left\{ \mathbf { x } _ { n } \right\}$ chỉ xuất hiện dưới dạng các tích vô hướng ${ \bf x } _ { n } ^ { \mathrm { T } } { \bf x } _ { m }$ . Nhớ rằng các thành phần chính được định nghĩa bởi các vector riêng $\mathbf { u } _ { i }$ của ma trận hiệp phương sai

\mathbf {S u} _ {i} = \lambda_ {i} \mathbf {u} _ {i}\tag{12.71}

trong đó $i = 1 , \ldots , D$ . Ở đây ma trận hiệp phương sai mẫu $D \times D$ S được định nghĩa bởi

\mathbf {S} = \frac {1}{N} \sum_ {n = 1} ^ {N} \mathbf {x} _ {n} \mathbf {x} _ {n} ^ {\mathrm{T}},\tag{12.72}

và các vector riêng được chuẩn hóa sao cho $\mathbf { u } _ { i } ^ { \mathrm { T } } \mathbf { u } _ { i } = 1$

Bây giờ xét một phép biến đổi phi tuyến $\phi ( \mathbf { x } )$ vào một không gian đặc trưng M-chiều, sao cho mỗi điểm dữ liệu ${ \bf x } _ { n }$ được chiếu vào một điểm $\phi (  { \mathbf { x } } _ { n } )$ ). Chúng tôi có thể thực hiện PCA trong không gian kernel. Chúng tôi minh họa điều này bằng cách kiểm tra các thành phần chính trong dữ liệu gốc như được hiển thị trong Hình 12.16.

![image](images/part-004--2814462749fa4ab7bf372ba796e6cd2e2a85acdd3138895391e9592cafa1a9ca.jpg)

Hình 12.16 Sơ đồ minh họa kernel PCA. Một đám mây dữ liệu trong không gian dữ liệu gốc (ô trái) được chiếu bằng phép biến đổi phi tuyến $\phi ( \mathbf { x } )$ vào không gian đặc trưng (ô phải). Bằng cách thực hiện PCA trong không gian đặc trưng, chúng tôi thu được các hướng chính. Các vector riêng đầu tiên được hiển thị bằng màu xanh lam và được biểu diễn bởi vector $\mathbf { v } _ { 1 }$ . Các đường màu xanh lá cây trong không gian đặc trưng chỉ ra các hình chiếu ngược lại của đường được chiếu tương ứng trong không gian dữ liệu gốc. Lưu ý rằng nói chung không thể thiết lập ánh xạ nghịch đảo từ không gian đặc trưng trở lại không gian dữ liệu gốc.

Để đơn giản, hãy để chúng tôi giả định rằng dữ liệu được căn giữa, để $\textstyle \sum _ { n } \phi ( \mathbf { x } _ { n } ) = \mathbf { 0 }$ . Chúng tôi sẽ quay lại vấn đề này sau. Ma trận hiệp phương sai $M \times M$ trong không gian đặc trưng được xác định bởi

\mathbf {C} = \frac {1}{N} \sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}}\tag{12.73}

và bài toán giá trị riêng được định nghĩa bởi

\mathbf {C} \mathbf {v} _ {i} = \lambda_ {i} \mathbf {v} _ {i}\tag{12.74}

$i = 1 , \dots , M$ . Mục tiêu của chúng tôi là giải bài toán giá trị riêng này mà không cần phải làm việc một cách tường minh trong không gian đặc trưng. Từ định nghĩa của C, các phương trình giá trị riêng cho chúng tôi biết rằng $\mathbf { v } _ { i }$ thỏa mãn

\frac {1}{N} \sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \left\{\phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \mathbf {v} _ {i} \right\} = \lambda_ {i} \mathbf {v} _ {i}\tag{12.75}

Miễn là $\lambda _ { i } > 0$, vector $\mathbf { v } _ { i }$ được cho bởi một tổ hợp tuyến tính của tất cả $\phi ( \mathbf { x } _ { n } )$ . Để thấy điều này, chúng tôi có thể viết nó dưới dạng

\mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} a _ {i n} \phi (\mathbf {x} _ {n}).\tag{12.76}

Thay thế khai triển này trở lại phương trình vector riêng, chúng tôi thu được

\frac {1}{N} \sum_ {n = 1} ^ {N} \phi (\mathbf {x} _ {n}) \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \sum_ {m = 1} ^ {N} a _ {i m} \phi (\mathbf {x} _ {m}) = \lambda_ {i} \sum_ {n = 1} ^ {N} a _ {i n} \phi (\mathbf {x} _ {n}).\tag{12.77}

Bước chính bây giờ là biểu diễn cái này theo hàm kernel $k ( \mathbf { x } _ { n } , \mathbf { x } _ { m } ) =$ $\phi (  { \mathbf { x } } _ { n } ) ^ { \mathrm { T } } \phi (  { \mathbf { x } } _ { m } )$ , mà chúng tôi thực hiện bằng cách nhân cả hai vế với $\phi ( \mathbf { x } _ { l } ) ^ { \mathrm { T } }$ để có được

\frac {1}{N} \sum_ {n = 1} ^ {N} k (\mathbf {x} _ {l}, \mathbf {x} _ {n}) \sum_ {m = 1} ^ {m} a _ {i m} k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) = \lambda_ {i} \sum_ {n = 1} ^ {N} a _ {i n} k (\mathbf {x} _ {l}, \mathbf {x} _ {n}).\tag{12.78}

Cái này có thể được viết dưới dạng ma trận như

\mathbf {K} ^ {2} \mathbf {a} _ {i} = \lambda_ {i} N \mathbf {K} \mathbf {a} _ {i}\tag{12.79}

trong đó ${ \bf a } _ { i }$ là một vector cột N-chiều có các phần tử $a _ { n i }$ với $n = 1 , \ldots , N$ Chúng tôi có thể tìm nghiệm cho $\mathbf { a } _ { i }$ bằng cách giải bài toán giá trị riêng sau

\mathbf {K} \mathbf {a} _ {i} = \lambda_ {i} N \mathbf {a} _ {i}\tag{12.80}

trong đó chúng tôi đã loại bỏ một hệ số K từ cả hai vế của (12.79). Lưu ý rằng các nghiệm của (12.79) và (12.80) chỉ khác nhau bởi các vector riêng của K có các giá trị riêng bằng không mà không ảnh hưởng đến hình chiếu thành phần chính.

Điều kiện chuẩn hóa cho các hệ số $\mathbf { a } _ { i }$ được thu được bằng cách yêu cầu các vector riêng trong không gian đặc trưng được chuẩn hóa. Sử dụng (12.76) và (12.80), chúng tôi có

1 = \mathbf {v} _ {i} ^ {\mathrm{T}} \mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} \sum_ {m = 1} ^ {N} a _ {i n} a _ {i m} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) = \mathbf {a} _ {i} ^ {\mathrm{T}} \mathbf {K} \mathbf {a} _ {i} = \lambda_ {i} N \mathbf {a} _ {i} ^ {\mathrm{T}} \mathbf {a} _ {i}.\tag{12.81}

Sau khi giải quyết bài toán vector riêng, các hình chiếu thành phần chính kết quả sau đó cũng có thể được biểu diễn theo hàm kernel, sao cho, sử dụng (12.76), hình chiếu của một điểm x lên vector riêng i được cho bởi

y _ {i} (\mathbf {x}) = \phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} a _ {i n} \phi (\mathbf {x}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {n}) = \sum_ {n = 1} ^ {N} a _ {i n} k (\mathbf {x}, \mathbf {x} _ {n})\tag{12.82}

và do đó lại được biểu diễn theo hàm kernel.

Trong không gian x D-chiều gốc, có D vector riêng trực giao và do đó chúng tôi có thể tìm được nhiều nhất D thành phần chính tuyến tính. Chiều M của không gian đặc trưng, tuy nhiên, có thể lớn hơn D nhiều (thậm chí vô hạn), và do đó chúng tôi có thể tìm được một số thành phần chính phi tuyến mà có thể vượt quá D. Lưu ý, tuy nhiên, rằng số lượng giá trị riêng khác không không thể vượt quá số N của các điểm dữ liệu, bởi vì (ngay cả khi $M > N )$ ma trận hiệp phương sai trong không gian đặc trưng có hạng nhiều nhất bằng N. Điều này được phản ánh trong thực tế rằng kernel PCA liên quan đến khai triển vector riêng của ma trận $N \times N$ K.

Cho đến nay chúng tôi đã giả định rằng tập dữ liệu được chiếu được cho bởi $\phi (  { \mathbf { x } } _ { n } )$ có giá trị trung bình bằng không, điều này nói chung sẽ không phải là trường hợp. Chúng tôi không thể đơn giản tính toán và sau đó trừ đi giá trị trung bình, vì chúng tôi muốn tránh làm việc trực tiếp trong không gian đặc trưng, và do đó, một lần nữa, chúng tôi định dạng thuật toán hoàn toàn theo các hàm kernel. Các điểm dữ liệu được chiếu sau khi căn giữa, ký hiệu $\widetilde { \phi } ( \mathbf { x } _ { n } )$ ), được cho bởi

\widetilde {\phi} (\mathbf {x} _ {n}) = \phi (\mathbf {x} _ {n}) - \frac {1}{N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {l})\tag{12.83}

và các phần tử tương ứng của ma trận Gram được cho bởi

\begin{array}{r c l} \widetilde {K} _ {n m} & = & \widetilde {\phi} (\mathbf {x} _ {n}) ^ {\mathrm{T}} \widetilde {\phi} (\mathbf {x} _ {m}) \\ & = & \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) - \frac {1}{N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {n}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {l}) \\ & & - \frac {1}{N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {l}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {m}) + \frac {1}{N ^ {2}} \sum_ {j = 1} ^ {N} \sum_ {l = 1} ^ {N} \phi (\mathbf {x} _ {j}) ^ {\mathrm{T}} \phi (\mathbf {x} _ {l}) \\ & = & k (\mathbf {x} _ {n}, \mathbf {x} _ {m}) - \frac {1}{N} \sum_ {l = 1} ^ {N} k (\mathbf {x} _ {l}, \mathbf {x} _ {m}) \\ & & - \frac {1}{N} \sum_ {l = 1} ^ {N} k (\mathbf {x} _ {n}, \mathbf {x} _ {l}) + \frac {1}{N ^ {2}} \sum_ {j = 1} ^ {N} \sum_ {l = 1} ^ {N} k (\mathbf {x} _ {j}, \mathbf {x} _ {l}). \end{array}\tag{12.84}

Cái này có thể được biểu diễn dưới dạng ma trận như

\widetilde {\mathbf {K}} = \mathbf {K} - \mathbf {1} _ {N} \mathbf {K} - \mathbf {K} \mathbf {1} _ {N} + \mathbf {1} _ {N} \mathbf {K} \mathbf {1} _ {N}\tag{12.85}

Bài tập 12.27

trong đó ${ \bf 1 } _ { N }$ ký hiệu ma trận $N \times N$ trong đó mọi phần tử nhận giá trị $1 / N$ Do đó chúng tôi có thể đánh giá $\tilde { \bf K }$ chỉ bằng cách sử dụng hàm kernel và sau đó sử dụng $\tilde { \bf K }$ để xác định các giá trị riêng và vector riêng. Lưu ý rằng thuật toán PCA tiêu chuẩn được phục hồi như một trường hợp đặc biệt nếu chúng tôi sử dụng một kernel tuyến tính $k ( \mathbf { x } , \mathbf { x } ^ { \prime } ) = \mathbf { x } ^ { \mathrm { { T } } } \mathbf { x } ^ { \prime }$ . Hình 12.17 cho thấy một ví dụ về kernel PCA được áp dụng cho một tập dữ liệu tổng hợp (Scholkopf et al., 1998). Ở đây một kernel 'Gaussian' có dạng

k (\mathbf {x}, \mathbf {x} ^ {\prime}) = \exp (- \| \mathbf {x} - \mathbf {x} ^ {\prime} \| ^ {2} / 0. 1)\tag{12.86}

được áp dụng cho một tập dữ liệu tổng hợp. Các đường tương ứng với các đường cong mức mà dọc đó hình chiếu lên thành phần chính tương ứng, được định nghĩa bởi

\phi (\mathbf {x}) ^ {\mathrm{T}} \mathbf {v} _ {i} = \sum_ {n = 1} ^ {N} a _ {i n} k (\mathbf {x}, \mathbf {x} _ {n})\tag{12.87}

là không đổi.

![image](images/part-004--a10aabffc7d85e30dc01d2c937870f2991a2ce4378475eeba18e9f59565c8ce8.jpg)

Hình 12.11 Ví dụ về kernel PCA, với một kernel Gaussian được áp dụng cho một tập dữ liệu tổng hợp trong hai chiều, cho thấy ba hàm riêng đầu tiên cùng với các giá trị riêng tương ứng của chúng. Các đường cong mức là những đường dọc đó hình chiếu lên thành phần chính tương ứng là không đổi. Lưu ý cách hai đầu tiên tách ba cụm, lần thứ ba chia một nửa mỗi cụm, và ba cái tiếp theo lại chia các cụm thành hai nửa dọc theo các hướng trực giao với các phần tách trước đó.

Một bất lợi rõ ràng của kernel PCA là nó liên quan đến việc tìm các vector riêng của ma trận $N \times N$ $\tilde { \bf K }$ thay vì ma trận $D \times D$ S của PCA tuyến tính thông thường, và do đó trong thực tế đối với các tập dữ liệu lớn, các phép gần đúng thường được sử dụng.

Cuối cùng, chúng tôi lưu ý rằng trong PCA tuyến tính tiêu chuẩn, chúng tôi thường giữ lại một số lượng nhỏ hơn $L < \dot { D }$ các vector riêng và sau đó gần đúng với một vector dữ liệu $\mathbf { x } _ { n }$ bằng hình chiếu ${ \widehat { \mathbf { x } } } _ { n }$ của nó trên không gian phụ nguyên L-chiều, được định nghĩa bởi

\widehat {\mathbf {x}} _ {n} = \sum_ {i = 1} ^ {L} \left(\mathbf {x} _ {n} ^ {\mathrm{T}} \mathbf {u} _ {i}\right) \mathbf {u} _ {i}.\tag{12.88}

Trong kernel PCA, điều này nói chung sẽ không thể. Để thấy điều này, lưu ý rằng ánh xạ $\phi ( \mathbf { x } )$ ánh xạ không gian x D-chiều vào một đa tạp D-chiều trong không gian đặc trưng M-chiều $\phi .$ Vector x được biết đến với tên gọi là pre-image của điểm tương ứng $\phi ( \mathbf { x } )$ . Tuy nhiên, hình chiếu của các điểm trong không gian đặc trưng lên không gian phụ PCA tuyến tính trong không gian đó sẽ điển hình không nằm trên đa tạp D-chiều phi tuyến và do đó sẽ không có pre-image tương ứng trong không gian dữ liệu. Các kỹ thuật do đó đã được đề xuất để tìm các pre-image gần đúng (Bishop và Naray-Szabo, 2004).