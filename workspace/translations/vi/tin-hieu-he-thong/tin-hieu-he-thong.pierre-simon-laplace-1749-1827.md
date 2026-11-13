Được nói rằng Laplace thiếu khiêm tốn một cách nghiêm trọng và tại một thời điểm đã tuyên bố rằng ông là nhà toán học giỏi nhất ở Pháp vào thời điểm đó, một tuyên bố có thể được coi là đúng. Ngoài việc có năng suất cao trong toán học, ông cũng có nhiều đóng góp cho thiên văn học, bao gồm giả thuyết tinh vân theo đó trái đất được cho là đã hình thành từ sự ngưng tụ và làm lạnh của một đĩa khí và bụi quay lớn. Năm 1812, ông xuất bản phiên bản đầu tiên của Théorie<sup>´</sup>, trong đó Laplace phát biểu rằng "lý thuyết xác suất không là gì khác ngoài lẽ thường được quy về phép tính". Công trình này bao gồm một thảo luận về phép tính xác suất ngược (sau này được Poincaré gọi là định lý Bayes), mà ông đã sử dụng để giải các vấn đề về tuổi thọ, luật pháp, khối lượng hành tinh, tam giác đo, và ước tính lỗi.

Hình 1.13 Đồ thị của Gaussian một chiều hiển thị giá trị trung bình $\mu$ và độ lệch chuẩn σ.

![image](images/part-001--4d97e10dd855bafb5bccabf591d1955d95791ec52d6fde2a2af3dbd14feb75e0.jpg)

$$\int_ {- \infty} ^ {\infty} \mathcal {N} (x | \mu , \sigma^ {2}) \mathrm{d} x = 1.\tag{1.48}$$

Do đó (1.46) thỏa mãn hai yêu cầu cho một hàm mật độ xác suất hợp lệ.

Chúng ta có thể dễ dàng tìm được các kỳ vọng của các hàm của x dưới phân phối Gaussian. Đặc biệt, giá trị trung bình của x được cho bởi

$$\mathbb {E} [ x ] = \int_ {- \infty} ^ {\infty} \mathcal {N} (x | \mu , \sigma^ {2}) x \mathrm{d} x = \mu .\tag{1.49}$$

Vì tham số $\mu$ biểu thị giá trị trung bình của $x$ dưới phân phối, nó được gọi là giá trị trung bình. Tương tự như vậy, đối với mô-men bậc hai

$$\mathbb {E} [ x ^ {2} ] = \int_ {- \infty} ^ {\infty} \mathcal {N} (x | \mu , \sigma^ {2}) x ^ {2} \mathrm{d} x = \mu^ {2} + \sigma^ {2}.\tag{1.50}$$

Từ (1.49) và (1.50), suy ra phương sai của x được cho bởi

$$\operatorname{var} [ x ] = \mathbb {E} [ x ^ {2} ] - \mathbb {E} [ x ] ^ {2} = \sigma^ {2}\tag{1.51}$$

và do đó $\sigma ^ { 2 }$ được gọi là tham số phương sai. Điểm cực đại của một phân phối được gọi là chế độ của nó. Đối với một Gaussian, chế độ trùng với giá trị trung bình.

Chúng ta cũng quan tâm đến phân phối Gaussian được định nghĩa trên một vectơ x có chiều D gồm các biến liên tục, được cho bởi

$$\mathcal {N} (\mathbf {x} | \boldsymbol {\mu}, \boldsymbol {\Sigma}) = \frac {1}{(2 \pi) ^ {D / 2}} \frac {1}{| \boldsymbol {\Sigma} | ^ {1 / 2}} \exp \left\{- \frac {1}{2} (\mathbf {x} - \boldsymbol {\mu}) ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} (\mathbf {x} - \boldsymbol {\mu}) \right\}\tag{1.52}$$

trong đó vectơ D chiều $\pmb { \mu }$ được gọi là giá trị trung bình, ma trận $D \times D$ Σ được gọi là hiệp phương sai, và Σ biểu thị định thức của Σ. Chúng tôi sẽ sử dụng phân phối Gaussian đa biến một cách ngắn gọn trong chương này, mặc dù các tính chất của nó sẽ được nghiên cứu chi tiết trong Phần 2.3.

Minh họa hàm khả năng cho một phân phối Gaussian, được thể hiện bằng đường cong màu đỏ. Ở đây các điểm đen biểu thị một tập dữ liệu các giá trị $\dot { \{ x _ { n } \} }$, và hàm khả năng được cho bởi (1.53) tương ứng với tích của các giá trị màu xanh. Tối đa hóa khả năng liên quan đến việc điều chỉnh giá trị trung bình và phương sai của Gaussian để tối đa hóa tích này.

![image](images/part-001--86c9676e76c7db217bd38f3fbc853e525560c5759517bb0f619e29abbefdd863.jpg)

Bây giờ giả sử rằng chúng ta có một tập dữ liệu quan sát ${ \bf x } = ( x _ { 1 } , \ldots , x _ { N } ) ^ { \mathrm { T } }$, đại diện cho N quan sát của biến vô hướng $x .$ . Lưu ý rằng chúng tôi sử dụng kiểu chữ x để phân biệt điều này từ một quan sát duy nhất của biến có giá trị vectơ $( x _ { 1 } , \ldots , x _ { D } ) ^ { \mathrm { T } }$, mà chúng tôi ký hiệu là x. Chúng tôi sẽ giả sử rằng các quan sát được rút ra độc lập từ một phân phối Gaussian có giá trị trung bình $\mu$ và phương sai $\sigma ^ { 2 }$ không xác định, và chúng tôi muốn xác định các tham số này từ tập dữ liệu. Các điểm dữ liệu được rút ra độc lập từ cùng một phân phối được gọi là độc lập và phân phối giống hệt nhau, thường được viết tắt là i.i.d. Chúng tôi đã thấy rằng xác suất chung của hai sự kiện độc lập được cho bởi tích của xác suất biên cho mỗi sự kiện riêng biệt. Vì tập dữ liệu x của chúng tôi là i.i.d., do đó chúng tôi có thể viết xác suất của tập dữ liệu, với $\mu$ và $\sigma ^ { 2 }$ cho trước, dưới dạng

$$p (\mathbf {x} | \mu , \sigma^ {2}) = \prod_ {n = 1} ^ {N} \mathcal {N} \left(x _ {n} | \mu , \sigma^ {2}\right).\tag{1.53}$$

Khi xem như một hàm của $\mu$ và $\sigma ^ { 2 }$, đây là hàm khả năng cho Gaussian và được giải thích bằng sơ đồ trong Hình 1.14.

Một tiêu chí phổ biến để xác định các tham số trong một phân phối xác suất bằng cách sử dụng một tập dữ liệu quan sát là tìm các giá trị tham số tối đa hóa hàm khả năng. Điều này có vẻ như là một tiêu chí lạ lẫm vì, từ thảo luận trước đây của chúng tôi về lý thuyết xác suất, có vẻ tự nhiên hơn khi tối đa hóa xác suất của các tham số cho trước dữ liệu, không phải xác suất của dữ liệu cho trước các tham số. Trên thực tế, hai tiêu chí này có liên quan, như chúng tôi sẽ thảo luận trong bối cảnh của khớp đường cong.

Tuy nhiên, hiện tại chúng tôi sẽ xác định các giá trị cho các tham số chưa biết $\mu$ và $\sigma ^ { 2 }$ trong Gaussian bằng cách tối đa hóa hàm khả năng (1.53). Trong thực tế, sẽ thuận tiện hơn khi tối đa hóa logarit của hàm khả năng. Vì logarit là một hàm tăng đơn điệu của đối số của nó, việc tối đa hóa logarit của một hàm tương đương với tối đa hóa chính hàm đó. Lấy logarit không chỉ đơn giản hóa phân tích toán học tiếp theo, mà còn giúp về mặt số học vì tích của một số lượng lớn các xác suất nhỏ có thể dễ dàng vượt quá độ chính xác số của máy tính, và điều này được giải quyết bằng cách tính tổng của các xác suất logarit thay thế. Từ (1.46) và (1.53), hàm log khả năng có thể được viết dưới dạng

$$\ln p \left(\mathbf {x} | \mu , \sigma^ {2}\right) = - \frac {1}{2 \sigma^ {2}} \sum_ {n = 1} ^ {N} (x _ {n} - \mu) ^ {2} - \frac {N}{2} \ln \sigma^ {2} - \frac {N}{2} \ln (2 \pi).\tag{1.54}$$

Bài tập 1.11

Tối đa hóa (1.54) với respect to $\mu ,$ chúng tôi nhận được giải pháp khả năng cực đại được cho bởi

$$\mu_ {\mathrm{ML}} = \frac {1}{N} \sum_ {n = 1} ^ {N} x _ {n}\tag{1.55}$$

đây là giá trị trung bình mẫu, tức là, giá trị trung bình của các giá trị quan sát $\{ x _ { n } \}$ . Tương tự như vậy, tối đa hóa (1.54) với respect to $\sigma ^ { 2 }$ , chúng tôi nhận được giải pháp khả năng cực đại cho phương sai dưới dạng

$$\sigma_ {\mathrm{ML}} ^ {2} = \frac {1}{N} \sum_ {n = 1} ^ {N} (x _ {n} - \mu_ {\mathrm{ML}}) ^ {2}\tag{1.56}$$

đây là phương sai mẫu được đo với respect to giá trị trung bình mẫu $\mu _ { \mathrm { M L } }$ . Lưu ý rằng chúng tôi đang thực hiện tối đa hóa chung của (1.54) với respect to $\mu$ và $\sigma ^ { 2 }$ , nhưng trong trường hợp của phân phối Gaussian, giải pháp cho $\mu$ tách rời khỏi giải pháp cho $\sigma ^ { 2 }$ sao cho chúng tôi có thể trước tiên đánh giá (1.55) và sau đó sử dụng kết quả này để đánh giá (1.56).

Ở phía sau trong chương này, và cũng trong các chương tiếp theo, chúng tôi sẽ làm nổi bật các hạn chế đáng kể của phương pháp khả năng cực đại. Ở đây chúng tôi cung cấp một dấu hiệu của vấn đề trong bối cảnh các giải pháp của chúng tôi cho các cài đặt tham số khả năng cực đại cho phân phối Gaussian một chiều. Đặc biệt, chúng tôi sẽ chỉ ra rằng phương pháp khả năng cực đại đã từng đánh giá thấp phương sai của phân phối. Đây là một ví dụ của một hiện tượng được gọi là độ lệch (bias) và liên quan đến vấn đề quá khớp gặp phải trong bối cảnh khớp đường cong đa thức. Chúng tôi trước tiên lưu ý rằng các giải pháp khả năng cực đại $\mu _ { \mathrm { M L } }$ và $\lvert \sigma _ { \mathrm { M L } } ^ { 2 }$ là các hàm của các giá trị tập dữ liệu $x _ { 1 } , \ldots , x _ { N }$ . Xem xét các kỳ vọng của những lượng này với respect to các giá trị tập dữ liệu, mà bản thân chúng đến từ một phân phối Gaussian với các tham số $\mu$ và $\sigma ^ { 2 }$ . Sẽ là trực tiếp để chỉ ra rằng

Bài tập 1.12

$$\mathbb {E} [ \mu_ {\mathrm{ML}} ] = \mu\tag{1.57}$$

$$\mathbb {E} [ \sigma_ {\mathrm{ML}} ^ {2} ] = \left(\frac {N - 1}{N}\right) \sigma^ {2}\tag{1.58}$$

sao cho trên trung bình ước tính khả năng cực đại sẽ lấy được giá trị trung bình chính xác nhưng sẽ đánh giá thấp phương sai thực tế bằng hệ số $( N - 1 ) / N$ . Trực giác đằng sau kết quả này được đưa ra bởi Hình 1.15.

Từ (1.58) suy ra rằng ước tính sau đây cho tham số phương sai không lệch

$$\widetilde {\sigma} ^ {2} = \frac {N}{N - 1} \sigma_ {\mathrm{ML}} ^ {2} = \frac {1}{N - 1} \sum_ {n = 1} ^ {N} (x _ {n} - \mu_ {\mathrm{ML}}) ^ {2}.\tag{1.59}$$

Minh họa cách độ lệch phát sinh khi sử dụng khả năng cực đại để xác định phương sai của một Gaussian. Đường cong xanh hiển thị phân phối Gaussian thực tế mà từ đó dữ liệu được tạo, và ba đường cong màu đỏ hiển thị các phân phối Gaussian thu được bằng cách khớp với ba tập dữ liệu, mỗi tập gồm hai điểm dữ liệu được hiển thị với màu xanh, bằng cách sử dụng các kết quả khả năng cực đại (1.55) và (1.56). Trung bình trên ba tập dữ liệu, giá trị trung bình là chính xác, nhưng phương sai được đánh giá thấp một cách hệ thống vì nó được đo đối với giá trị trung bình mẫu và không phải đối với giá trị trung bình thực tế.

![image](images/part-001--6547dd59e4fe6f8a7b1d535f2aa2f4e973d0b0d34643501484311c018b432298.jpg)

Trong Phần 10.1.3, chúng tôi sẽ thấy cách kết quả này phát sinh tự động khi chúng tôi áp dụng một phương pháp Bayesian.

Lưu ý rằng độ lệch của giải pháp khả năng cực đại trở nên ít đáng kể hơn khi số lượng N của các điểm dữ liệu tăng lên, và trong giới hạn $N \to \infty$ giải pháp khả năng cực đại cho phương sai bằng phương sai thực tế của phân phối tạo ra dữ liệu. Trong thực tế, đối với bất cứ điều gì khác ngoài N nhỏ, độ lệch này sẽ không chứng tỏ là một vấn đề nghiêm trọng. Tuy nhiên, trong suốt cuốn sách này, chúng tôi sẽ quan tâm đến các mô hình phức tạp hơn có nhiều tham số, trong đó các vấn đề độ lệch liên quan đến khả năng cực đại sẽ trở nên trầm trọng hơn nhiều. Trên thực tế, như chúng tôi sẽ thấy, vấn đề độ lệch trong khả năng cực đại nằm ở gốc của vấn đề quá khớp mà chúng tôi đã gặp phải trước đó trong bối cảnh khớp đường cong đa thức.