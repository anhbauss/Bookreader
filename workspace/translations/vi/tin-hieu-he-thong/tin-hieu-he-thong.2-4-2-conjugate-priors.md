## 2.4.2 Tiên nghiệm liên hợp

Ta đã gặp khái niệm **tiên nghiệm liên hợp** (*conjugate prior*) nhiều lần. Ví dụ, với phân phối Bernoulli, tiên nghiệm liên hợp là phân phối beta; với phân phối Gaussian, tiên nghiệm liên hợp cho trung bình là Gaussian, còn tiên nghiệm liên hợp cho độ chính xác là phân phối Wishart. Nói chung, với một phân phối xác suất $p(\mathbf{x} \mid \boldsymbol{\eta})$, ta có thể tìm một tiên nghiệm $p(\boldsymbol{\eta})$ liên hợp với hàm hợp lý, sao cho phân phối hậu nghiệm có cùng dạng hàm với tiên nghiệm. Với mọi thành viên của họ mũ (2.194), luôn tồn tại một tiên nghiệm liên hợp có dạng

$$
p(\boldsymbol{\eta} \mid \boldsymbol{\chi}, \nu) = f(\boldsymbol{\chi}, \nu) g(\boldsymbol{\eta})^{\nu} \exp\left\{\nu \boldsymbol{\eta}^{T} \boldsymbol{\chi}\right\}
$$

trong đó $f(\boldsymbol{\chi}, \nu)$ là hệ số chuẩn hoá, còn $g(\boldsymbol{\eta})$ chính là hàm xuất hiện trong (2.194). Để thấy rằng tiên nghiệm này thực sự liên hợp, ta nhân tiên nghiệm (2.229) với hàm hợp lý (2.227). Khi đó, bỏ qua hệ số chuẩn hoá, ta thu được phân phối hậu nghiệm có dạng

$$
p(\boldsymbol{\eta} \mid \mathbf{X}, \boldsymbol{\chi}, \nu) \propto g(\boldsymbol{\eta})^{\nu + N} \exp\left\{\boldsymbol{\eta}^{\mathrm{T}} \left(\sum_{n=1}^{N} \mathbf{u}(\mathbf{x}_n) + \nu \boldsymbol{\chi}\right)\right\}
$$

Biểu thức này lại có cùng dạng hàm với tiên nghiệm (2.229), xác nhận tính liên hợp. Hơn nữa, tham số $\nu$ có thể được hiểu là số lượng hiệu dụng của các quan sát giả trong tiên nghiệm; mỗi quan sát giả có giá trị của thống kê đủ $u(x)$ bằng $\chi$.
