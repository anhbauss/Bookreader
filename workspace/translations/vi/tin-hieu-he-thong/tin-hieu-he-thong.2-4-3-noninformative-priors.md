## 2.4.3 Tiên nghiệm không cung cấp thông tin

Trong một số ứng dụng của suy luận xác suất, ta có thể có kiến thức tiên nghiệm có thể biểu diễn thuận tiện bằng phân phối tiên nghiệm. Ví dụ, nếu tiên nghiệm gán xác suất bằng không cho một giá trị nào đó của biến, thì phân phối hậu nghiệm cũng tất yếu gán xác suất bằng không cho giá trị đó, bất kể các quan sát dữ liệu tiếp theo. Tuy nhiên, trong nhiều trường hợp, ta hầu như không biết phân phối nên có dạng như thế nào. Khi đó, ta có thể tìm một dạng phân phối tiên nghiệm, gọi là **tiên nghiệm không cung cấp thông tin** (*noninformative prior*), nhằm tác động ít nhất có thể đến phân phối hậu nghiệm. Điều này đôi khi được gọi là “để dữ liệu tự nói lên”.

Nếu ta có một phân phối $p(x \mid \lambda)$ được chi phối bởi tham số $\lambda$, ta có thể muốn đề xuất tiên nghiệm $p(\lambda) = \mathrm{const}$ là phù hợp. Nếu $\lambda$ là biến rời rạc có $K$ trạng thái, điều này đơn giản tương đương với việc đặt xác suất tiên nghiệm của mỗi trạng thái là $1/K$.

Tuy nhiên, với tham số liên tục, cách tiếp cận này có hai khó khăn. Thứ nhất, nếu miền của $\lambda$ không bị chặn, phân phối tiên nghiệm này không thể được chuẩn hoá đúng vì tích phân theo $\lambda$ phân kỳ. Những tiên nghiệm như vậy được gọi là **tiên nghiệm không chính quy** (*improper prior*). Trên thực tế, tiên nghiệm không chính quy thường vẫn có thể dùng được nếu phân phối hậu nghiệm tương ứng là chính quy, tức có thể chuẩn hoá đúng.

Khó khăn thứ hai xuất hiện do hành vi biến đổi của mật độ xác suất dưới phép đổi biến phi tuyến. Nếu một hàm $h(\lambda)$ là hằng số và ta đổi biến thành $\lambda = \eta^2$, thì $\widehat{h}(\eta) = h(\eta^2)$ cũng sẽ là hằng số. Tuy nhiên, nếu chọn mật độ $p_{\lambda}(\lambda)$ là hằng số, thì mật độ của $\eta$ là

$$
p_{\eta}(\eta) =
p_{\lambda}(\lambda)
\left| \frac{\mathrm{d}\lambda}{\mathrm{d}\eta} \right|
=
p_{\lambda}(\eta^2) 2\eta
\propto \eta
$$

Vì thế mật độ trên $\eta$ sẽ không còn là hằng số. Vấn đề này không xuất hiện khi dùng hợp lý cực đại, vì hàm hợp lý $p(x \mid \lambda)$ chỉ là một hàm đơn giản của $\lambda$. Tuy nhiên, nếu muốn chọn một tiên nghiệm hằng, ta phải cẩn thận sử dụng biểu diễn thích hợp cho các tham số.

Ở đây ta xét hai ví dụ đơn giản về tiên nghiệm không cung cấp thông tin. Trước hết, nếu một mật độ có dạng

$$
p(x \mid \mu) = f(x - \mu)
$$

thì tham số $\mu$ được gọi là **tham số vị trí** (*location parameter*). Họ mật độ này có tính bất biến theo phép tịnh tiến. Nếu dịch $x$ đi một hằng số để được $\widehat{x} = x + c$, thì

$$
p(\widehat{x} \mid \widehat{\mu})
=
f(\widehat{x} - \widehat{\mu})
$$

trong đó $\widehat{\mu} = \mu + c$. Mật độ có cùng dạng trong biến mới như trong biến ban đầu, nên không phụ thuộc vào việc chọn gốc toạ độ.

Ta muốn chọn một phân phối tiên nghiệm phản ánh tính bất biến theo phép tịnh tiến này. Vì vậy, tiên nghiệm phải gán cùng khối lượng xác suất cho khoảng $A \leqslant \mu \leqslant B$ và khoảng đã dịch $A-c \leqslant \mu \leqslant B-c$. Điều này suy ra

$$
\int_A^B p(\mu)\,\mathrm{d}\mu
=
\int_{A-c}^{B-c} p(\mu)\,\mathrm{d}\mu
=
\int_A^B p(\mu-c)\,\mathrm{d}\mu
$$

Vì điều này phải đúng với mọi lựa chọn của $A$ và $B$, ta có

$$
p(\mu-c) = p(\mu)
$$

Suy ra $p(\mu)$ là hằng số. Một ví dụ về tham số vị trí là trung bình $\mu$ của một phân phối Gaussian. Tiên nghiệm liên hợp của $\mu$ là Gaussian:

$$
p(\mu \mid \mu_0, \sigma_0^2)
=
\mathcal{N}(\mu \mid \mu_0, \sigma_0^2)
$$

Ta nhận được tiên nghiệm không cung cấp thông tin bằng cách lấy giới hạn $\sigma_0^2 \to \infty$. Khi đó, các đóng góp từ tiên nghiệm trong phân phối hậu nghiệm trên $\mu$ sẽ triệt tiêu.

Là ví dụ thứ hai, hãy xét mật độ

$$
p(x \mid \sigma)
=
\frac{1}{\sigma}
f\left(\frac{x}{\sigma}\right)
$$

trong đó $\sigma > 0$. Tham số $\sigma$ được gọi là **tham số tỉ lệ** (*scale parameter*). Mật độ có tính bất biến theo tỉ lệ: nếu co giãn $x$ bởi một hằng số để được $\widehat{x} = cx$, thì

$$
p(\widehat{x} \mid \widehat{\sigma})
=
\frac{1}{\widehat{\sigma}}
f\left(\frac{\widehat{x}}{\widehat{\sigma}}\right)
$$

trong đó $\widehat{\sigma} = c\sigma$. Phép biến đổi này tương ứng với thay đổi đơn vị đo, chẳng hạn từ mét sang kilômét nếu $x$ là độ dài.

Nếu xét khoảng $A \leqslant \sigma \leqslant B$ và khoảng được co giãn $A/c \leqslant \sigma \leqslant B/c$, tiên nghiệm phải gán cùng khối lượng xác suất cho hai khoảng này. Vì vậy,

$$
\int_A^B p(\sigma)\,\mathrm{d}\sigma
=
\int_{A/c}^{B/c} p(\sigma)\,\mathrm{d}\sigma
=
\int_A^B
p\left(\frac{1}{c}\sigma\right)
\frac{1}{c}\,\mathrm{d}\sigma
$$

Do đó,

$$
p(\sigma)
=
p\left(\frac{1}{c}\sigma\right)
\frac{1}{c}
$$

và suy ra $p(\sigma) \propto 1/\sigma$. Đây tiếp tục là một tiên nghiệm không chính quy vì tích phân trên $0 \leqslant \sigma \leqslant \infty$ phân kỳ.

Cũng có thể xét tiên nghiệm của tham số tỉ lệ thông qua mật độ của logarit tham số. Theo quy tắc biến đổi mật độ, $p(\ln \sigma) = \mathrm{const}$. Vì vậy, khối lượng xác suất trong miền $1 \leqslant \sigma \leqslant 10$ bằng với khối lượng trong miền $10 \leqslant \sigma \leqslant 100$, cũng như trong miền $100 \leqslant \sigma \leqslant 1000$.

Một ví dụ về tham số tỉ lệ là độ lệch chuẩn $\sigma$ của phân phối Gaussian, sau khi đã xét đến tham số vị trí $\mu$, bởi vì

$$
\mathcal{N}(x \mid \mu, \sigma^2)
\propto
\sigma^{-1}
\exp\left\{
-(\widetilde{x}/\sigma)^2
\right\}
$$

trong đó $\widetilde{x} = x-\mu$. Thường thuận tiện hơn khi làm việc với độ chính xác $\lambda = 1/\sigma^2$ thay vì trực tiếp với $\sigma$. Quy tắc biến đổi mật độ cho thấy $p(\sigma) \propto 1/\sigma$ tương ứng với phân phối trên $\lambda$ có dạng $p(\lambda) \propto 1/\lambda$.

Tiên nghiệm liên hợp của $\lambda$ là phân phối gamma $\mathrm{Gam}(\lambda \mid a_0, b_0)$. Tiên nghiệm không cung cấp thông tin thu được như trường hợp đặc biệt $a_0 = b_0 = 0$. Khi đó, phân phối hậu nghiệm chỉ phụ thuộc vào các hạng tử phát sinh từ dữ liệu chứ không phụ thuộc vào tiên nghiệm.
