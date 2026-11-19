Trong chương này, chúng ta đã thảo luận về nhiều khái niệm từ lý thuyết xác suất và lý thuyết quyết định sẽ tạo nền tảng cho phần lớn thảo luận tiếp theo trong cuốn sách này. Chúng ta kết thúc chương này bằng cách giới thiệu một số khái niệm bổ sung từ lĩnh vực lý thuyết thông tin, điều này cũng sẽ chứng tỏ hữu ích trong sự phát triển của các kỹ thuật nhận dạng mẫu và học máy của chúng ta. Một lần nữa, chúng ta sẽ chỉ tập trung vào các khái niệm chính, và chúng ta đề cập đến tài liệu khác để có các thảo luận chi tiết hơn (Viterbi và Omura, 1979; Cover và Thomas, 1991; MacKay, 2003).

Chúng ta bắt đầu bằng cách xem xét một biến ngẫu nhiên rời rạc x và chúng ta hỏi rằng chúng ta nhận được bao nhiêu thông tin khi quan sát một giá trị cụ thể cho biến này. Lượng thông tin có thể được xem như là 'mức độ bất ngờ' khi biết giá trị của $x$. Nếu chúng ta được cho biết rằng một sự kiện rất khó xảy ra vừa xảy ra, chúng ta sẽ nhận được nhiều thông tin hơn so với nếu chúng ta được cho biết rằng một sự kiện rất có khả năng xảy ra vừa xảy ra, và nếu chúng ta biết rằng sự kiện chắc chắn sẽ xảy ra, chúng ta sẽ không nhận được thông tin nào. Thước đo nội dung thông tin của chúng ta sẽ phụ thuộc vào phân bố xác suất $p(x)$, và do đó chúng ta tìm kiếm một đại lượng $h(x)$ là một hàm đơn điệu của xác suất $p(x)$ và biểu thị nội dung thông tin. Dạng của $h(\cdot)$ có thể được tìm thấy bằng cách lưu ý rằng nếu chúng ta có hai sự kiện x và $y$ không liên quan, thì thông tin thu được từ việc quan sát cả hai sự kiện này phải là tổng của thông tin thu được từ mỗi sự kiện riêng biệt, sao cho $h(x, y) = h(x) + h(y)$. Hai sự kiện không liên quan sẽ độc lập thống kê và do đó $p(x, y) = p(x)p(y)$. Từ hai mối quan hệ này, dễ dàng có thể chỉ ra rằng $h(x)$ phải được cho bởi logarit của $p(x)$ và do đó chúng ta có

![image](images/part-001--64c22ac39abb389e7ce60cd67e734ec32a9abee9ea1c307e0e1127074a75bb11.jpg)

![image](images/part-001--ab3c7cd16639cf315da795eef8248fbfd7185bef3c3e27eba13d021dbff6e693.jpg)

![image](images/part-001--df3adb2d95beb4414636b54eb20e6e9c4cab9053eccb10c184b65ce05555141a.jpg)

![image](images/part-001--c67a07ab198e5a372d22ca6e7f9064953b9a0edb08c7000669a9583e5a2c6161.jpg)

Figure 1.29 Các đồ thị của đại lượng $L_{q} = |y - t|^{q}$ với các giá trị khác nhau của $q$.

$$h(x) = -\log_{2}p(x)\tag{1.92}$$

trong đó dấu âm đảm bảo rằng thông tin là dương hoặc bằng không. Lưu ý rằng các sự kiện xác suất thấp x tương ứng với nội dung thông tin cao. Lựa chọn cơ sở cho logarit là tùy ý, và hiện tại chúng ta sẽ áp dụng quy ước phổ biến trong lý thuyết thông tin của việc sử dụng logarit cơ số 2. Trong trường hợp này, như chúng ta sẽ thấy ngay sau đây, các đơn vị của $h(x)$ là bits ('chữ số nhị phân').

Bây giờ giả sử rằng một người gửi muốn truyền giá trị của một biến ngẫu nhiên đến một người nhận. Lượng thông tin trung bình mà họ truyền trong quá trình này được thu được bằng cách lấy kỳ vọng của (1.92) đối với phân bố $p(x)$ và được cho bởi

$$\mathrm{H}[x] = -\sum_{x}p(x)\log_{2}p(x).\tag{1.93}$$

Đại lượng quan trọng này được gọi là entropy của biến ngẫu nhiên x. Lưu ý rằng $\begin{array}{r}{\operatorname*{lim}_{p \longrightarrow 0}p\ln p = 0}\end{array}$ và do đó chúng ta sẽ lấy $p(x)\ln p(x) = 0$ bất cứ khi nào chúng ta gặp một giá trị cho x sao cho $p(x) = 0$.

Cho đến nay, chúng ta đã cung cấp một động lực khá heuristic cho định nghĩa về thông tin (1.92) và entropy tương ứng (1.93). Bây giờ chúng ta chỉ ra rằng các định nghĩa này thực sự sở hữu các tính chất hữu ích. Xem xét một biến ngẫu nhiên x có 8 trạng thái có thể, mỗi trạng thái có xác suất bằng nhau. Để truyền đạt giá trị của x đến một người nhận, chúng ta sẽ cần truyền một tin nhắn có độ dài 3 bits. Lưu ý rằng entropy của biến này được cho bởi

$$\mathrm{H}[x] = -8 \times \frac{1}{8}\log_{2}\frac{1}{8} = 3\mathrm{bits}.$$

Bây giờ xem xét một ví dụ (Cover và Thomas, 1991) về một biến có 8 trạng thái có thể $\{a, b, c, d, e, f, g, h\}$ mà các xác suất tương ứng được cho bởi $(\textstyle{\frac{1}{2}}, \textstyle{\frac{1}{4}}, \textstyle{\frac{1}{8}}, \textstyle{\frac{1}{16}}, \textstyle{\frac{1}{64}}, \textstyle{\frac{1}{64}}, \textstyle{\frac{1}{64}}, \textstyle{\frac{1}{64}})$. Entropy trong trường hợp này được cho bởi

$$\mathrm{H}[x] = -\frac{1}{2}\log_{2}\frac{1}{2} - \frac{1}{4}\log_{2}\frac{1}{4} - \frac{1}{8}\log_{2}\frac{1}{8} - \frac{1}{16}\log_{2}\frac{1}{16} - \frac{4}{64}\log_{2}\frac{1}{64} = 2\text{ bits.}$$

Chúng ta thấy rằng phân bố không đều có entropy nhỏ hơn phân bố đều, và chúng ta sẽ hiểu được điều này ngay sau đây khi thảo luận về diễn giải entropy theo độ rối loạn. Hiện tại, hãy xem xét cách chúng ta sẽ truyền đạt danh tính của trạng thái của biến đến một người nhận. Chúng ta có thể làm điều này, như trước đây, sử dụng một số 3-bit. Tuy nhiên, chúng ta có thể tận dụng phân bố không đều bằng cách sử dụng các mã ngắn hơn cho các sự kiện có khả năng xảy ra cao hơn, với chi phí của các mã dài hơn cho các sự kiện ít có khả năng xảy ra, hy vọng sẽ có độ dài mã trung bình ngắn hơn. Điều này có thể được thực hiện bằng cách biểu diễn các trạng thái $\{a, b, c, d, e, f, g, h\}$ sử dụng, ví dụ, bộ chuỗi mã sau: 0, 10, 110, 1110, 111100, 111101, 111110, 111111. Độ dài trung bình của mã phải được truyền là khi đó

$$\text{average code length} = \frac{1}{2} \times 1 + \frac{1}{4} \times 2 + \frac{1}{8} \times 3 + \frac{1}{16} \times 4 + 4 \times \frac{1}{64} \times 6 = 2\text{ bits}$$

lại là tương tự như entropy của biến ngẫu nhiên. Lưu ý rằng không thể sử dụng các chuỗi mã ngắn hơn vì phải có thể phân biệt một sự nối tiếp của các chuỗi như vậy thành các phần tạo nên nó. Chẳng hạn, 11001110 giải mã duy nhất thành chuỗi trạng thái $c, a, d$.

Mối quan hệ này giữa entropy và độ dài mã ngắn nhất là một mối quan hệ chung. Định lý mã hóa không ồn ào (Shannon, 1948) phát biểu rằng entropy là một cận dưới trên số bit cần thiết để truyền đạt trạng thái của một biến ngẫu nhiên.

Từ giờ trở đi, chúng ta sẽ chuyển sang sử dụng logarit tự nhiên trong việc định nghĩa entropy, vì điều này sẽ cung cấp một liên kết thuận tiện hơn với các ý tưởng ở nơi khác trong cuốn sách này. Trong trường hợp này, entropy được đo bằng các đơn vị 'nats' thay vì bits, chúng khác nhau chỉ bởi một hệ số ln 2.

Chúng ta đã giới thiệu khái niệm entropy về lượng thông tin trung bình cần thiết để chỉ định trạng thái của một biến ngẫu nhiên. Trên thực tế, khái niệm entropy có nguồn gốc sớm hơn nhiều trong vật lý, nơi nó được giới thiệu trong bối cảnh của nhiệt động lực học cân bằng và sau đó được cho một diễn giải sâu hơn như một thước đo độ rối loạn thông qua sự phát triển trong cơ học thống kê. Chúng ta có thể hiểu được quan điểm thay thế này của entropy bằng cách xem xét một tập hợp N đối tượng giống hệt nhau được chia thành một tập hợp các thùng, sao cho có $n_{i}$ đối tượng trong thùng thứ $i$. Xem xét số cách khác nhau của việc phân bổ các đối tượng vào các thùng. Có N cách để chọn đối tượng đầu tiên, $(N-1)$ cách để chọn đối tượng thứ hai, v.v., dẫn đến tổng cộng N! cách để phân bổ tất cả N đối tượng vào các thùng, trong đó N! (phát âm là 'giai thừa $N$') biểu thị tích $N \times (N-1) \times \cdots \times 2 \times 1$. Tuy nhiên, chúng ta không muốn phân biệt giữa các sắp xếp lại của các đối tượng trong mỗi thùng. Trong thùng thứ $i$, có $n_{i}!$ cách để sắp xếp lại các đối tượng, và do đó tổng số cách phân bổ N đối tượng vào các thùng được cho bởi

$$W = \frac{N!}{\prod_{i}n_{i}!}\tag{1.94}$$

được gọi là tính đa dạng. Entropy sau đó được định nghĩa là logarit của tính đa dạng được cân bằng bởi một hằng số thích hợp

$$\mathrm{H} = \frac{1}{N}\ln W = \frac{1}{N}\ln N! - \frac{1}{N}\sum_{i}\ln n_{i}!.\tag{1.95}$$

Chúng ta bây giờ xem xét giới hạn $N \to \infty$, trong đó các phân số $n_{i}/N$ được giữ cố định, và áp dụng xấp xỉ của Stirling

$$\ln N! \simeq N\ln N - N\tag{1.96}$$

cái mà cho

$$\mathrm{H} = -\lim_{N \to \infty}\sum_{i}\left(\frac{n_{i}}{N}\right)\ln\left(\frac{n_{i}}{N}\right) = -\sum_{i}p_{i}\ln p_{i}\tag{1.97}$$

trong đó chúng ta sử dụng $\textstyle\sum_{i}n_{i} = N$. Ở đây $p_{i} = \mathrm{lim}_{N \to \infty}(n_{i}/N)$ là xác suất của một đối tượng được gán vào thùng thứ $i$. Theo thuật ngữ vật lý, các sắp xếp cụ thể của các đối tượng trong các thùng được gọi là một vi trạng thái, và phân bố tổng thể của các số chiếm giữ, được biểu thị thông qua các tỷ lệ $n_{i}/N$, được gọi là một đại trạng thái. Tính đa dạng W cũng được gọi là trọng lượng của đại trạng thái.

Chúng ta có thể diễn giải các thùng như các trạng thái $x_{i}$ của một biến ngẫu nhiên rời rạc X, trong đó $p(X = x_{i}) = p_{i}$. Entropy của biến ngẫu nhiên X là khi đó

$$\mathrm{H}[p] = -\sum_{i}p(x_{i})\ln p(x_{i}).\tag{1.98}$$

Các phân bố $p(x_{i})$ tập trung sắc nét xung quanh một vài giá trị sẽ có entropy tương đối thấp, trong khi những giá trị được trải rộng đều hơn trên nhiều giá trị sẽ có entropy cao hơn, như được minh họa trong Hình 1.30. Vì $0 \leqslant p_{i} \leqslant 1$, entropy là không âm, và nó sẽ bằng giá trị tối thiểu của nó là 0 khi một trong các $\begin{array}{rl}{p_{i}}&{{} = }\end{array}$ 1 và tất cả các $p_{j \neq i} = 0$ khác. Cấu hình entropy tối đa có thể được tìm thấy bằng cách cực đại hóa H sử dụng một nhân tử Lagrange để thực thi ràng buộc chuẩn hóa trên các xác suất. Do đó chúng ta cực đại hóa

$$\widetilde{\mathrm{H}} = -\sum_{i}p(x_{i})\ln p(x_{i}) + \lambda\left(\sum_{i}p(x_{i}) - 1\right)\tag{1.99}$$

![image](images/part-001--c736470bf53886a4d6e70e1fb7dfda0a1522503a91bbf54e35ac65803a501931.jpg)

![image](images/part-001--8a98e063eef2a3cf134b4c738886c15f03077e1afe4a0d610b4554bab2442b9a.jpg)

Figure 1.30 Biểu đồ của hai phân bố xác suất trên 30 thùng minh họa giá trị cao hơn của entropy H đối với phân bố rộng hơn. Entropy lớn nhất sẽ phát sinh từ một phân bố đều sẽ cho $\mathrm{H} = -\ln(1/30) = 3.40$.

từ đó chúng ta tìm thấy rằng tất cả các $p(x_{i})$ đều bằng nhau và được cho bởi $p(x_{i}) = 1/M$ trong đó M là tổng số trạng thái $x_{i}$. Giá trị tương ứng của entropy là khi đó H = ln M. Kết quả này cũng có thể được suy ra từ bất đẳng thức Jensen (sẽ được thảo luận ngay sau đây). Để xác minh rằng điểm dừng thực sự là một cực đại, chúng ta có thể đánh giá đạo hàm bậc hai của entropy, cái mà cho

Exercise 1.29

$$\frac{\partial\widetilde{\mathrm{H}}}{\partial p(x_{i})\partial p(x_{j})} = -I_{ij}\frac{1}{p_{i}}\tag{1.100}$$

trong đó $I_{ij}$ là các phần tử của ma trận nhận dạng.

Chúng ta có thể mở rộng định nghĩa của entropy để bao gồm các phân bố $p(x)$ trên các biến liên tục x như sau. Trước tiên chia x thành các thùng có chiều rộng $\Delta$. Sau đó, giả sử rằng $p(x)$ là liên tục, định lý giá trị trung bình (Weisstein, 1999) cho chúng ta biết rằng, đối với mỗi thùng như vậy, phải tồn tại một giá trị $x_{i}$ sao cho

$$\int_{i\Delta}^{(i+1)\Delta}p(x)\mathrm{d}x = p(x_{i})\Delta.\tag{1.101}$$

Chúng ta có thể bây giờ lượng tử hóa biến liên tục x bằng cách gán bất kỳ giá trị x nào cho giá trị $x_{i}$ bất cứ khi nào x rơi vào thùng thứ $i$. Xác suất của việc quan sát giá trị $x_{i}$ là khi đó $p(x_{i})\Delta$. Điều này cho một phân bố rời rạc mà entropy có dạng

$$\mathrm{H}_{\Delta} = -\sum_{i}p(x_{i})\Delta\ln{(p(x_{i})\Delta)} = -\sum_{i}p(x_{i})\Delta\ln{p(x_{i})} - \ln{\Delta}\tag{1.102}$$

trong đó chúng ta sử dụng $\begin{array}{r}{\sum_{i}p(x_{i})\Delta = 1}\end{array}$, cái mà theo sau từ (1.101). Chúng ta bây giờ bỏ qua số hạng thứ hai ln $\Delta$ ở vế phải của (1.102) và sau đó xem xét giới hạn $\Delta \to 0$. Số hạng thứ nhất ở vế phải của (1.102) sẽ tiếp cận tích phân của $p(x)\ln p(x)$ trong giới hạn này sao cho

$$\lim_{\Delta \rightarrow 0}\left\{\sum_{i}p(x_{i})\Delta\ln p(x_{i})\right\} = -\int p(x)\ln p(x)\mathrm{d}x\tag{1.103}$$

trong đó đại lượng ở vế phải được gọi là entropy vi phân. Chúng ta thấy rằng các dạng rời rạc và liên tục của entropy khác nhau bởi một đại lượng ln $\Delta$, cái mà phân kỳ trong giới hạn $\Delta \to 0$. Điều này phản ánh sự thật rằng để chỉ định một biến liên tục rất chính xác đòi hỏi một số lượng lớn các bit. Đối với một mật độ được định nghĩa trên nhiều biến liên tục, được ký hiệu tập thể bởi vectơ x, entropy vi phân được cho bởi

$$\mathrm{H}[\mathbf{x}] = -\int p(\mathbf{x})\ln p(\mathbf{x})\mathrm{d}\mathbf{x}.\tag{1.104}$$

Trong trường hợp của các phân bố rời rạc, chúng ta thấy rằng cấu hình entropy tối đa tương ứng với một phân bố xác suất bằng nhau trên các trạng thái có thể của biến. Bây giờ hãy xem xét cấu hình entropy tối đa cho một biến liên tục. Để cực đại này được xác định rõ, sẽ là cần thiết để ràng buộc các momen thứ nhất và thứ hai của $p(x)$ cũng như bảo tồn ràng buộc chuẩn hóa. Do đó chúng ta cực đại hóa entropy vi phân với các

![image](images/part-001--6698665971883c47ca7f0d8f72211b9d6c040f085b8a3bc0981da849f105c40b.jpg)