Chúng ta sẽ bây giờ sử dụng khung đồ thị nhân tố để suy ra một lớp mạnh mẽ các thuật toán suy diễn hiệu quả và chính xác có thể áp dụng cho các đồ thị có cấu trúc cây. Ở đây chúng ta sẽ tập trung vào vấn đề đánh giá các biên cộng địa phương trên các nút hoặc tập con của các nút, điều này sẽ dẫn chúng ta đến thuật toán tổng-tích. Sau này chúng ta sẽ sửa đổi kỹ thuật để cho phép tìm trạng thái có khả năng xảy ra nhất, dẫn đến thuật toán cực đại-tổng.

Ngoài ra chúng ta sẽ giả sử rằng tất cả các biến trong mô hình là rời rạc, và vì vậy tính toán biên tương ứng với việc thực hiện các tổng. Khung này, tuy nhiên, cũng có thể áp dụng bình đẳng cho các mô hình tuyến tính-Gaussian trong trường hợp tính toán biên liên quan đến tích phân, và chúng ta sẽ xem xét một ví dụ chi tiết khi chúng ta thảo luận về các hệ thống động lực tuyến tính.

**Figure 8.44**

(a) Một đoạn của đồ thị có hướng có một vòng lặp địa phương. (b) Chuyển đổi thành một đoạn của đồ thị nhân tố có cấu trúc cây, trong đó $f ( x _ { 1 } , x _ { 2 } , x _ { 3 } ) = p ( x _ { 1 } ) p ( x _ { 2 } | x _ { 1 } ) p ( x _ { 3 } | x _ { 1 } , x _ { 2 } )$

![image](images/part-003--4b9f586a3c4d4087ee4ad929adc339b18c8fb9eecb8499c8a879e364ec114bde.jpg)

(a)

![image](images/part-003--1f5f59fe368103648e7115a8dc9192b3b7528fb37fea33b198c74540a19e04a9.jpg)

(b)

![image](images/part-003--03273c091ead7e87a715665b9fc6bceec71c7b024c4a8fc15bf2734ae5ca2f49.jpg)

**Figure 8.45** (a) Một đồ thị vô hướng kết nối hoàn toàn. (b) và (c) Hai đồ thị nhân tố, mỗi đồ thị tương ứng với đồ thị vô hướng trong (a).

Có một thuật toán cho suy diễn chính xác trên các đồ thị có hướng không có vòng lặp được gọi là lan truyền niềm tin (Pearl, 1988; Lauritzen và Spiegelhalter, 1988), và tương đương với một trường hợp đặc biệt của thuật toán tổng-tích. Ở đây chúng ta sẽ chỉ xem xét thuật toán tổng-tích vì nó đơn giản hơn để suy ra và áp dụng, cũng như tổng quát hơn.

Chúng ta sẽ giả sử rằng đồ thị gốc là một cây vô hướng hoặc một cây có hướng hoặc polytree, sao cho đồ thị nhân tố tương ứng có cấu trúc cây. Chúng ta trước tiên chuyển đổi đồ thị gốc thành một đồ thị nhân tố để chúng ta có thể xử lý cả các mô hình có hướng và vô hướng bằng cách sử dụng cùng một khung. Mục tiêu của chúng ta là khai thác cấu trúc của đồ thị để đạt được hai điều: (i) để có được một thuật toán suy diễn hiệu quả và chính xác cho việc tìm các biên; (ii) trong các tình huống khi cần nhiều biên để cho phép tính toán được chia sẻ một cách hiệu quả.

Chúng ta bắt đầu bằng cách xem xét vấn đề tìm biên $p ( x )$ cho một nút biến cụ thể x. Hiện tại, chúng ta sẽ giả sử rằng tất cả các biến đều ẩn. Sau này chúng ta sẽ thấy cách sửa đổi thuật toán để kết hợp bằng chứng tương ứng với các biến quan sát. Theo định nghĩa, biên được tính bằng cách cộng phân bố khớp trên tất cả các biến ngoại trừ x sao cho

$$p (x) = \sum_ {\mathbf {x} \backslash x} p (\mathbf {x})\tag{8.61}$$

trong đó ${ \textbf { x } } \backslash x$ biểu thị tập hợp các biến trong x với biến x bị bỏ qua. Ý tưởng là thay thế $p ( \mathbf { x } )$ bằng cách sử dụng biểu thức đồ thị nhân tố (8.59) và sau đó hoán đổi các tổng và tích để có được một thuật toán hiệu quả. Hãy xem xét đoạn đồ thị được hiển thị trong Hình 8.46 mà chúng ta thấy rằng cấu trúc cây của đồ thị cho phép chúng ta phân chia các nhân tố trong phân bố khớp thành các nhóm, với một nhóm liên kết với mỗi nút nhân tố là hàng xóm của nút biến x. Chúng ta thấy rằng phân bố khớp có thể được viết dưới dạng tích

$$p (\mathbf {x}) = \prod_ {s \in \mathrm{ne} (x)} F _ {s} (x, X _ {s})\tag{8.62}$$

trong đó $\mathrm{ne} ( x )$ biểu thị tập hợp các nút nhân tố là hàng xóm của $x$, và $X _ { s }$ biểu thị tập hợp tất cả các biến trong cây con được kết nối với nút biến x thông qua nút nhân tố $f _ { s }$, và $F _ { s } ( x , X _ { s } )$ biểu thị tích của tất cả các nhân tố trong nhóm liên kết với nhân tố $f _ { s }$.

**Figure 8.46** Một đoạn của đồ thị nhân tố minh họa phép tính biên $p ( x )$

![image](images/part-003--d8924513877f05d7b9b3f8476da10d339a57c0434ba6bef7bc50fe5f73f914ef.jpg)

Thay thế (8.62) vào (8.61) và hoán đổi các tổng và tích, chúng ta nhận được

$$\begin{array}{r c l} p (x) & = & \prod_ {s \in \mathrm{ne} (x)} \left[ \sum_ {X _ {s}} F _ {s} (x, X _ {s}) \right] \\ & = & \prod_ {s \in \mathrm{ne} (x)} \mu_ {f _ {s} \to x} (x). \end{array}\tag{8.63}$$

Ở đây chúng ta đã giới thiệu một tập hợp các hàm $\mu _ { f _ { s } \to x } ( x )$, được định nghĩa bởi

$$\mu_ {f _ {s} \rightarrow x} (x) \equiv \sum_ {X _ {s}} F _ {s} (x, X _ {s})\tag{8.64}$$

có thể được xem như các tin nhắn từ các nút nhân tố $f _ { s }$ đến nút biến x. Chúng ta thấy rằng biên cần thiết $p ( x )$ được cho bởi tích của tất cả các tin nhắn đến từ bên ngoài đến nút x.

Để đánh giá các tin nhắn này, chúng ta lại quay trở lại Hình 8.46 và lưu ý rằng mỗi nhân tố $F _ { s } ( x , X _ { s } )$ được mô tả bởi một nhân tố (dưới-)đồ thị và do đó có thể tự nó được phân tích thành nhân tố. Cụ thể, chúng ta có thể viết

$$F _ {s} (x, X _ {s}) = f _ {s} (x, x _ {1}, \ldots , x _ {M}) G _ {1} \left(x _ {1}, X _ {s 1}\right) \ldots G _ {M} \left(x _ {M}, X _ {s M}\right)\tag{8.65}$$

trong đó, để thuận tiện, chúng ta đã ký hiệu các biến liên kết với nhân tố $f _ { s }$, ngoài x, bằng $x _ { 1 } , \ldots , x _ { M }$. Việc phân tích thành nhân tố này được minh họa trong Hình 8.47. Lưu ý rằng tập hợp các biến $\{ x , x _ { 1 } , \ldots , x _ { M } \}$ là tập hợp các biến mà nhân tố $f _ { s }$ phụ thuộc vào, và do đó nó cũng có thể được ký hiệu là $\mathbf { x } _ { s }$, sử dụng ký hiệu của (8.59).

Thay thế (8.65) vào (8.64) chúng ta nhận được

$$\begin{array}{r c l}\mu_ {f _ {s} \rightarrow x} (x)&=&\sum_ {x _ {1}} \dots \sum_ {x _ {M}} f _ {s} (x, x _ {1}, \dots , x _ {M}) \prod_ {m \in \mathrm{ne} (f _ {s}) \backslash x} \left[ \sum_ {X _ {s m}} G _ {m} (x _ {m}, X _ {s m}) \right]\\&=&\sum_ {x _ {1}} \dots \sum_ {x _ {M}} f _ {s} (x, x _ {1}, \dots , x _ {M}) \prod_ {m \in \mathrm{ne} (f _ {s}) \backslash x} \mu_ {x _ {m} \rightarrow f _ {s}} (x _ {m})\end{array}\tag{8.66}$$

**Figure 8.47** Minh họa về phân tích thành nhân tố của đồ thị con liên kết với nút nhân tố $f _ { s }$

![image](images/part-003--74e560390296edf2e7828b6a29fe6d0cc5fb558003752a477f433f83b7be975c.jpg)

trong đó $\mathrm { n e } ( f _ { s } )$ biểu thị tập hợp các nút biến là hàng xóm của nút nhân tố $f _ { s }$, và $\mathrm{ne} ( f _ { s } ) \setminus x$ biểu thị cùng một tập hợp nhưng với nút x bị xóa. Ở đây chúng ta đã định nghĩa các tin nhắn sau từ các nút biến đến các nút nhân tố

$$\mu_ {x _ {m} \to f _ {s}} (x _ {m}) \equiv \sum_ {X _ {s m}} G _ {m} (x _ {m}, X _ {s m}).\tag{8.67}$$

Do đó, chúng ta đã giới thiệu hai loại tin nhắn riêng biệt, những tin nhắn từ các nút nhân tố đến các nút biến được ký hiệu là $\mu _ { f \to x } ( x )$, và những tin nhắn từ các nút biến đến các nút nhân tố được ký hiệu là $\mu _ { x \to f } ( x )$. Trong mỗi trường hợp, chúng ta thấy rằng các tin nhắn được truyền dọc theo một liên kết luôn là một hàm của biến liên kết với nút biến mà liên kết kết nối đến.

Kết quả (8.66) nói rằng để đánh giá tin nhắn được gửi bởi một nút nhân tố đến một nút biến dọc theo liên kết kết nối chúng, hãy lấy tích của các tin nhắn đến từ bên ngoài dọc theo tất cả các liên kết khác đi vào nút nhân tố, nhân với nhân tố liên kết với nút đó, và sau đó tính toán biên trên tất cả các biến liên kết với các tin nhắn đến. Điều này được minh họa trong Hình 8.47. Điều quan trọng cần lưu ý là một nút nhân tố có thể gửi một tin nhắn đến một nút biến sau khi nó đã nhận được các tin nhắn đến từ tất cả các nút biến hàng xóm khác.

Cuối cùng, chúng ta suy ra một biểu thức để đánh giá các tin nhắn từ các nút biến đến các nút nhân tố, một lần nữa sử dụng phân tích (dưới-)đồ thị. Từ Hình 8.48, chúng ta thấy rằng số hạng $G _ { m } ( x _ { m } , X _ { s m } )$ liên kết với nút $x _ { m }$ được cho bởi tích của các số hạng $F _ { l } ( x _ { m } , X _ { m l } )$ mỗi số hạng liên kết với một trong các nút nhân tố $f _ { l }$ được liên kết với nút $x _ { m }$ (loại trừ nút $f _ { s }$), sao cho

$$G _ {m} (x _ {m}, X _ {s m}) = \prod_ {l \in \mathrm{ne} (x _ {m}) \setminus f _ {s}} F _ {l} (x _ {m}, X _ {m l})\tag{8.68}$$

trong đó tích được lấy trên tất cả các hàng xóm của nút $x _ { m }$ ngoại trừ nút $f _ { s }$. Lưu ý rằng mỗi một trong các nhân tố $F _ { l } ( x _ { m } , X _ { m l } )$ biểu thị một cây con của đồ thị gốc chính xác cùng loại như được giới thiệu trong (8.62).

**Figure 8.48** Minh họa về phép tính của tin nhắn được gửi bởi một nút biến đến một nút nhân tố liền kề.

![image](images/part-003--455c3f9f33dfc0c8a3b981d69e21328cc7426c7ddcd03bdf52d2f60d536e4db8.jpg)

Thay thế (8.68) vào (8.67), chúng ta nhận được

$$\begin{array}{r c l} \mu_ {x _ {m} \to f _ {s}} (x _ {m}) & = & \prod_ {l \in \mathrm{ne} (x _ {m}) \setminus f _ {s}} \left[ \sum_ {X _ {m l}} F _ {l} (x _ {m}, X _ {m l}) \right] \\ & = & \prod_ {l \in \mathrm{ne} (x _ {m}) \setminus f _ {s}} \mu_ {f _ {l} \to x _ {m}} (x _ {m}) \end{array}\tag{8.69}$$

trong đó chúng ta đã sử dụng định nghĩa (8.64) của các tin nhắn được truyền từ các nút nhân tố đến các nút biến. Do đó, để đánh giá tin nhắn được gửi bởi một nút biến đến một nút nhân tố liền kề dọc theo liên kết kết nối, chúng ta chỉ cần lấy tích của các tin nhắn đến từ bên ngoài dọc theo tất cả các liên kết khác. Lưu ý rằng bất kỳ nút biến nào chỉ có hai hàng xóm không thực hiện bất kỳ tính toán nào mà chỉ đơn giản là truyền các tin nhắn không thay đổi. Ngoài ra, chúng ta lưu ý rằng một nút biến có thể gửi tin nhắn đến một nút nhân tố sau khi nó đã nhận được các tin nhắn đến từ tất cả các nút nhân tố hàng xóm khác.

Nhớ lại rằng mục tiêu của chúng ta là tính toán biên cho nút biến x, và biên này được cho bởi tích của các tin nhắn đến từ bên ngoài dọc theo tất cả các liên kết đến tại nút đó. Mỗi một trong các tin nhắn này có thể được tính toán một cách đệ quy theo các tin nhắn khác. Để bắt đầu sự đệ quy này, chúng ta có thể coi nút x là gốc của cây và bắt đầu tại các nút lá. Từ định nghĩa (8.69), chúng ta thấy rằng nếu một nút lá là một nút biến, thì tin nhắn mà nó gửi dọc theo liên kết duy nhất và lớn nhất của nó được cho bởi

$$\mu_ {x \to f} (x) = 1\tag{8.70}$$

như được minh họa trong Hình 8.49(a). Tương tự, nếu nút lá là một nút nhân tố, chúng ta thấy từ (8.66) rằng tin nhắn được gửi phải có dạng

$$\mu_ {f \to x} (x) = f (x)\tag{8.71}$$

Thuật toán tổng-tích bắt đầu bằng các tin nhắn được gửi bởi các nút lá, điều này phụ thuộc vào việc nút lá là (a) một nút biến, hay (b) một nút nhân tố.

![image](images/part-003--8767478bdd7694f7cdcf98be526eaae142ad16358c66a07ca5a1fce2ed57cdc7.jpg)

![image](images/part-003--f3b846022bf952bf5bce0161cd1f9f5749e3c535098d0d6223f97275a782f87e.jpg)

như được minh họa trong Hình 8.49(b).

Tại điểm này, có giá trị để tạm dừng để tóm tắt phiên bản cụ thể của thuật toán tổng-tích đã thu được cho đến nay để đánh giá biên $p ( x )$. Chúng ta bắt đầu bằng cách coi nút biến x là gốc của đồ thị nhân tố và bắt đầu các tin nhắn tại các lá của đồ thị bằng cách sử dụng (8.70) và (8.71). Các bước truyền tin nhắn (8.66) và (8.69) sau đó được áp dụng một cách đệ quy cho đến khi các tin nhắn đã được truyền dọc theo mọi liên kết, và nút gốc đã nhận được các tin nhắn từ tất cả các hàng xóm của nó. Mỗi nút có thể gửi một tin nhắn hướng tới gốc một khi nó đã nhận được các tin nhắn từ tất cả các hàng xóm khác của nó. Một khi nút gốc đã nhận được các tin nhắn từ tất cả các hàng xóm của nó, biên cần thiết có thể được đánh giá bằng cách sử dụng (8.63). Chúng ta sẽ minh họa quy trình này ngay sau đây.

Để thấy rằng mỗi nút sẽ luôn nhận được đủ các tin nhắn để có thể gửi ra một tin nhắn, chúng ta có thể sử dụng một lập luận quy nạp đơn giản như sau. Rõ ràng, đối với một đồ thị bao gồm một nút gốc biến được kết nối trực tiếp với nhiều nút lá nhân tố, thuật toán tầm thường liên quan đến việc gửi các tin nhắn của dạng (8.71) trực tiếp từ các lá đến gốc. Bây giờ hãy tưởng tượng xây dựng một đồ thị chung bằng cách thêm các nút từng cái một, và giả sử rằng đối với một đồ thị cụ thể nào đó chúng ta có một thuật toán hợp lệ. Khi một nút (biến hoặc nhân tố) khác được thêm vào, nó có thể chỉ được kết nối bằng một liên kết duy nhất vì đồ thị tổng thể phải vẫn là một cây, và do đó nút mới sẽ là một nút lá. Do đó, nó gửi một tin nhắn đến nút mà nó được liên kết, mà lần lượt sẽ nhận được tất cả các tin nhắn mà nó cần để gửi tin nhắn riêng của nó hướng tới gốc, và do đó một lần nữa chúng ta có một thuật toán hợp lệ, hoàn thành chứng minh.

Bây giờ giả sử chúng ta muốn tìm các biên cho mỗi nút biến trong đồ thị. Điều này có thể được thực hiện bằng cách chỉ chạy thuật toán trên từng nút một. Tuy nhiên, điều này sẽ rất lãng phí vì nhiều tính toán cần thiết sẽ được lặp lại. Chúng ta có thể thu được một thủ tục hiệu quả hơn nhiều bằng cách xếp chồng các thuật toán truyền tin nhắn nhiều này để thu được thuật toán tổng-tích chung như sau. Tùy ý chọn bất kỳ nút (biến hoặc nhân tố) nào và chỉ định nó là gốc. Truyền các tin nhắn từ các lá đến gốc như trước. Tại điểm này, nút gốc sẽ đã nhận được các tin nhắn từ tất cả các hàng xóm của nó. Do đó, nó có thể gửi các tin nhắn đến tất cả các hàng xóm của nó. Những cái này lần lượt sẽ nhận được các tin nhắn từ tất cả các hàng xóm của chúng và do đó có thể gửi các tin nhắn dọc theo các liên kết đi ra từ gốc, và cứ thế. Theo cách này, các tin nhắn được truyền ra từ gốc tất cả các đường đến các lá. Cho đến bây giờ, một tin nhắn sẽ đã truyền theo cả hai hướng trên mỗi liên kết trong đồ thị, và mỗi nút sẽ đã nhận được một tin nhắn từ tất cả các hàng xóm của nó. Một lần nữa, một lập luận quy nạp đơn giản có thể được sử dụng để xác minh tính hợp lệ của giao thức truyền tin nhắn này. Vì mỗi nút biến sẽ nhận được các tin nhắn từ tất cả các hàng xóm của nó, chúng ta có thể dễ dàng tính toán phân bố biên cho mỗi biến trong đồ thị. Số lượng tin nhắn phải được tính toán được cho bởi hai lần số liên kết trong đồ thị và do đó chỉ liên quan đến hai lần tính toán liên quan đến việc tìm một biên duy nhất. So sánh, nếu chúng ta đã chạy thuật toán tổng-tích riêng biệt cho mỗi nút, lượng tính toán sẽ tăng bậc hai với kích thước của đồ thị. Lưu ý rằng thuật toán này thực tế là độc lập với nút nào được chỉ định là gốc, và thực sự, khái niệm về một nút có trạng thái đặc biệt chỉ được giới thiệu như một cách thuận tiện để giải thích giao thức truyền tin nhắn.

Thuật toán tổng-tích có thể được xem thuần túy theo các tin nhắn được gửi bởi các nút nhân tố đến các nút nhân tố khác. Trong ví dụ này, tin nhắn đi ra được hiển thị bởi mũi tên màu xanh được tính bằng cách lấy tích của tất cả các tin nhắn đến được hiển thị bởi các mũi tên màu xanh lá cây, nhân với nhân tố $f _ { s }$, và tính toán biên trên các biến $x _ { 1 }$ và $x _ { 2 }$.

![image](images/part-003--4c086c185deb3097dff23b11a6549c33496dac67d72588019a4bf778e1b88f81.jpg)

Tiếp theo giả sử chúng ta muốn tìm các phân bố biên $p ( \mathbf { x } _ { s } )$ liên kết với các tập hợp biến thuộc về mỗi một trong các nhân tố. Bằng một lập luận tương tự như lập luận được sử dụng ở trên, dễ dàng thấy rằng biên liên kết với một nhân tố được cho bởi tích của các tin nhắn đến tại nút nhân tố và nhân tố địa phương tại nút đó

$$p (\mathbf {x} _ {s}) = f _ {s} (\mathbf {x} _ {s}) \prod_ {i \in \mathrm{ne} (f _ {s})} \mu_ {x _ {i} \to f _ {s}} (x _ {i})\tag{8.72}$$

hoàn toàn tương tự với các biên ở các nút biến. Nếu các nhân tố là các hàm được tham số hóa và chúng ta muốn học các giá trị của các tham số bằng cách sử dụng thuật toán EM, thì những đại lượng này chính xác là những gì chúng ta sẽ cần tính toán trong bước E, như chúng ta sẽ thấy chi tiết khi chúng ta thảo luận về mô hình Markov ẩn trong Chương 13.

Tin nhắn được gửi bởi một nút biến đến một nút nhân tố, như chúng ta đã thấy, đơn giản là tích của các tin nhắn đến trên các liên kết khác. Chúng ta có thể, nếu chúng ta muốn, xem thuật toán tổng-tích ở một dạng hơi khác bằng cách loại bỏ các tin nhắn từ các nút biến đến các nút nhân tố và chỉ xem xét các tin nhắn được gửi bởi các nút nhân tố. Điều này dễ dàng nhất được nhìn thấy bằng cách xem xét ví dụ trong Hình 8.50.

Cho đến nay, chúng ta đã khá bỏ qua vấn đề chuẩn hóa. Nếu đồ thị nhân tố được suy ra từ một đồ thị có hướng, thì phân bố khớp đã được chuẩn hóa chính xác, và do đó các biên được tính bằng thuật toán tổng-tích sẽ tương tự được chuẩn hóa chính xác. Tuy nhiên, nếu chúng ta bắt đầu từ một đồ thị vô hướng, thì nói chung sẽ có một hệ số chuẩn hóa không xác định $1 / Z$. Như với ví dụ chuỗi đơn giản của Hình 8.38, điều này dễ dàng được xử lý bằng cách làm việc với một phiên bản không chuẩn hóa $\widetilde { p } ( \mathbf { x } )$ của phân bố khớp, trong đó $p ( \mathbf { x } ) = \widetilde { p } ( \mathbf { x } ) / Z$. Chúng ta trước tiên chạy thuật toán tổng-tích để tìm các biên không chuẩn hóa tương ứng $\widetilde { p } ( \boldsymbol { x } _ { i } )$. Hệ số $1 / Z$ sau đó dễ dàng được tính bằng cách chuẩn hóa bất kỳ một trong các biên này, và điều này hiệu quả về mặt tính toán vì việc chuẩn hóa được thực hiện trên một biến duy nhất thay vì trên toàn bộ tập hợp các biến như sẽ được yêu cầu để chuẩn hóa $\widetilde { p } ( \mathbf { x } )$ trực tiếp.

Tại điểm này, có thể hữu ích để xem xét một ví dụ đơn giản để minh họa hoạt động của thuật toán tổng-tích.

**Figure 8.51** Một đồ thị nhân tố đơn giản được sử dụng để minh họa thuật toán tổng-tích.

![image](images/part-003--f61bc054fbfdd77d4eafcf8a12d5835a0cd4bfc11e3f4e3ba3260f793ab17e34.jpg)

Đồ thị có một phân bố khớp không chuẩn hóa được cho bởi

$$\widetilde {p} (\mathbf {x}) = f _ {a} (x _ {1}, x _ {2}) f _ {b} (x _ {2}, x _ {3}) f _ {c} (x _ {2}, x _ {4}).\tag{8.73}$$

Để áp dụng thuật toán tổng-tích cho đồ thị này, chúng ta hãy chỉ định nút $x _ { 3 }$ làm gốc, trong trường hợp đó có hai nút lá $x _ { 1 }$ và $x _ { 4 }$. Bắt đầu với các nút lá, chúng ta có chuỗi sau của sáu tin nhắn:

$$\mu_ {x _ {1} \to f _ {a}} (x _ {1}) = 1\tag{8.74}$$

$$\mu_ {f _ {a} \rightarrow x _ {2}} (x _ {2}) = \sum_ {x _ {1}} f _ {a} (x _ {1}, x _ {2})\tag{8.75}$$

$$\mu_ {x _ {4} \to f _ {c}} (x _ {4}) = 1\tag{8.76}$$

$$\mu_ {f _ {c} \to x _ {2}} (x _ {2}) = \sum_ {x _ {4}} f _ {c} (x _ {2}, x _ {4})\tag{8.77}$$

$$\mu_ {x _ {2} \to f _ {b}} (x _ {2}) = \mu_ {f _ {a} \to x _ {2}} (x _ {2}) \mu_ {f _ {c} \to x _ {2}} (x _ {2})\tag{8.78}$$

$$\mu_ {f _ {b} \to x _ {3}} (x _ {3}) = \sum_ {x _ {2}} f _ {b} (x _ {2}, x _ {3}) \mu_ {x _ {2} \to f _ {b}} (x _ {2}).\tag{8.79}$$

**Figure 8.52** Luồng tin nhắn cho thuật toán tổng-tích được áp dụng cho đồ thị ví dụ trong Hình 8.51. (a) Từ các nút lá $x _ { 1 }$ và $x _ { 4 }$ hướng đến nút gốc $x _ { 3 }$. (b) Từ nút gốc hướng đến các nút lá.

![image](images/part-003--b2e367c00e007bfce3006a38f1fdce44f797669343780ea78f123a7e84f84dbd.jpg)

Một khi quá trình truyền tin nhắn này hoàn thành, chúng ta có thể sau đó truyền các tin nhắn từ nút gốc ra ngoài đến các nút lá, và những tin nhắn này được cho bởi

$$\mu_ {x _ {3} \to f _ {b}} (x _ {3}) = 1\tag{8.80}$$

$$\mu_ {f _ {b} \rightarrow x _ {2}} (x _ {2}) = \sum_ {x _ {3}} f _ {b} (x _ {2}, x _ {3})\tag{8.81}$$

$$\mu_ {x _ {2} \to f _ {a}} (x _ {2}) = \mu_ {f _ {b} \to x _ {2}} (x _ {2}) \mu_ {f _ {c} \to x _ {2}} (x _ {2})\tag{8.82}$$

$$\mu_ {f _ {a} \to x _ {1}} (x _ {1}) = \sum_ {x _ {2}} f _ {a} (x _ {1}, x _ {2}) \mu_ {x _ {2} \to f _ {a}} (x _ {2})\tag{8.83}$$

$$\mu_ {x _ {2} \to f _ {c}} (x _ {2}) = \mu_ {f _ {a} \to x _ {2}} (x _ {2}) \mu_ {f _ {b} \to x _ {2}} (x _ {2})\tag{8.84}$$

$$\mu_ {f _ {c} \to x _ {4}} (x _ {4}) = \sum_ {x _ {2}} f _ {c} (x _ {2}, x _ {4}) \mu_ {x _ {2} \to f _ {c}} (x _ {2}).\tag{8.85}$$

Bây giờ một tin nhắn đã truyền theo mỗi hướng trên mỗi liên kết, và chúng ta có thể bây giờ đánh giá các biên. Như một kiểm tra đơn giản, hãy để chúng ta xác minh rằng biên $p ( x _ { 2 } )$ được cho bởi biểu thức chính xác. Sử dụng (8.63) và thay thế các tin nhắn bằng cách sử dụng các kết quả trên, chúng ta có

$$\begin{array}{r c l} \widetilde {p} (x _ {2}) & = & \mu_ {f _ {a} \to x _ {2}} (x _ {2}) \mu_ {f _ {b} \to x _ {2}} (x _ {2}) \mu_ {f _ {c} \to x _ {2}} (x _ {2}) \\ & = & \left[ \sum_ {x _ {1}} f _ {a} (x _ {1}, x _ {2}) \right] \left[ \sum_ {x _ {3}} f _ {b} (x _ {2}, x _ {3}) \right] \left[ \sum_ {x _ {4}} f _ {c} (x _ {2}, x _ {4}) \right] \\ & = & \sum_ {x _ {1}} \sum_ {x _ {3}} \sum_ {x _ {4}} f _ {a} (x _ {1}, x _ {2}) f _ {b} (x _ {2}, x _ {3}) f _ {c} (x _ {2}, x _ {4}) \\ & = & \sum_ {x _ {1}} \sum_ {x _ {3}} \sum_ {x _ {4}} \widetilde {p} (\mathbf {x}) \end{array}\tag{8.86}$$

như yêu cầu.

Cho đến nay, chúng ta đã giả sử rằng tất cả các biến trong đồ thị đều ẩn. Trong hầu hết các ứng dụng thực tế, một tập con các biến sẽ được quan sát, và chúng ta muốn tính toán các phân bố hậu nghiệm có điều kiện trên các quan sát này. Các nút quan sát được dễ dàng xử lý trong thuật toán tổng-tích như sau. Giả sử chúng ta phân chia x thành các biến ẩn h và các biến quan sát v, và giá trị quan sát của v được ký hiệu là ${ \widehat { \mathbf { v } } }$. Sau đó, chúng ta chỉ cần nhân phân bố khớp $p ( \mathbf { x } )$ với $\textstyle \prod _ { i } I ( v _ { i } , { \widehat { v } } _ { i } )$ trong đó $I ( v , \widehat { v } ) = 1$ nếu $v = \widehat { v }$ và $I ( v , \widehat { v } ) = 0$ nếu khác. Tích này tương ứng với $p ( \mathbf { h } , \mathbf { v } = { \widehat { \mathbf { v } } } )$ và do đó là một phiên bản không chuẩn hóa của $p ( \mathbf { h } | \mathbf { v } = { \widehat { \mathbf { v } } } )$. Bằng cách chạy thuật toán tổng-tích, chúng ta có thể hiệu quả tính toán các biên hậu nghiệm $p ( h _ { i } | \mathbf { v } = { \widehat { \mathbf { v } } } )$ lên đến một hệ số chuẩn hóa có giá trị có thể được tìm thấy hiệu quả bằng cách sử dụng một tính toán địa phương. Bất kỳ tổng nào trên các biến trong v sau đó suy thu gọn thành một số hạng duy nhất.

Chúng ta đã giả sử trong suốt phần này rằng chúng ta đang xử lý các biến rời rạc. Tuy nhiên, không có gì cụ thể đối với các biến rời rạc hoặc trong khung đồ thị hoặc trong cấu trúc xác suất của thuật toán tổng-tích. Đối với các biến liên tục, các tổng chỉ được thay thế bằng các tích phân. Chúng ta sẽ đưa ra một ví dụ về thuật toán tổng-tích được áp dụng cho một đồ thị các biến tuyến tính-Gaussian khi chúng ta xem xét các hệ thống động lực tuyến tính.

**Table 8.1** Ví dụ về phân bố khớp trên hai biến nhị phân mà cực đại của phân bố khớp xảy ra đối với các giá trị biến khác nhau so với cực đại của hai biên.

| | x=0 | x=1 |
|---|---|---|
| y=0 | 0.3 | 0.4 |
| y=1 | 0.3 | 0.0 |