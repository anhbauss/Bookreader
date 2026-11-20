Trong một số ứng dụng của phân tích thành phần chính, số điểm dữ liệu nhỏ hơn chiều của không gian dữ liệu. Ví dụ, chúng ta có thể muốn áp dụng PCA vào một tập dữ liệu gồm một vài trăm hình ảnh, mỗi hình ảnh tương ứng với một vectơ trong một không gian có chiều lên đến hàng triệu (tương ứng với ba giá trị màu sắc cho mỗi pixel trong hình ảnh). Lưu ý rằng trong một không gian D-chiều, một tập hợp gồm N điểm, trong đó $N < D$, xác định một không gian con tuyến tính có chiều tối đa là $N - 1$, do đó không có ý nghĩa gì khi áp dụng PCA cho các giá trị M lớn hơn $N - 1$. Thực tế, nếu chúng ta thực hiện PCA, chúng ta sẽ thấy rằng ít nhất $D - N + 1$ giá trị riêng bằng không, tương ứng với các vectơ riêng dọc theo những hướng mà tập dữ liệu có phương sai bằng không. Hơn nữa, các thuật toán điển hình để tìm vectơ riêng của ma trận $D \times D$ có chi phí tính toán tỷ lệ với $O(D^3)$, do đó đối với các ứng dụng như ví dụ về hình ảnh, ứng dụng trực tiếp PCA sẽ không khả thi về mặt tính toán.

Chúng ta có thể giải quyết vấn đề này như sau: Trước tiên, hãy xác định X là ma trận dữ liệu tâm hóa có chiều $(N \times D)$, hàng thứ $n$ được cho bởi $(\mathbf{x}_n - \overline{\mathbf{x}})^{\mathrm{T}}$. Ma trận hiệp phương sai (12.3) có thể được viết là $\mathbf{S} = N^{-1} \mathbf{X}^{\mathrm{T}} \mathbf{X}$, và phương trình vectơ riêng tương ứng trở thành

$$\frac{1}{N} \mathbf{X}^{\mathrm{T}} \mathbf{X} \mathbf{u}_{i} = \lambda_{i} \mathbf{u}_{i}.\tag{12.26}$$

Bây giờ nhân cả hai vế trước với X để có

$$\frac{1}{N} \mathbf{X} \mathbf{X}^{\mathrm{T}} (\mathbf{X} \mathbf{u}_{i}) = \lambda_{i} (\mathbf{X} \mathbf{u}_{i}).\tag{12.27}$$

Nếu chúng ta xác định $\mathbf{v}_{i} = \mathbf{X} \mathbf{u}_{i}$, chúng ta nhận được

$$\frac{1}{N} \mathbf{X} \mathbf{X}^{\mathrm{T}} \mathbf{v}_{i} = \lambda_{i} \mathbf{v}_{i}\tag{12.28}$$

đây là phương trình vectơ riêng cho ma trận $N \times N$ là $N^{-1} \mathbf{X} \mathbf{X}^{\mathrm{T}}$. Chúng ta thấy rằng phương trình này có cùng $N - 1$ giá trị riêng như ma trận hiệp phương sai gốc (ma trận gốc có thêm $D - N + 1$ giá trị riêng bằng không). Vì vậy, chúng ta có thể giải quyết bài toán vectơ riêng trong các không gian có chiều thấp hơn với chi phí tính toán $O(N^3)$ thay vì $O(D^3)$. Để xác định các vectơ riêng, chúng ta nhân cả hai vế của (12.28) với $\mathbf{X}^{\mathrm{T}}$ để có

$$\left(\frac{1}{N} \mathbf{X}^{\mathrm{T}} \mathbf{X}\right) (\mathbf{X}^{\mathrm{T}} \mathbf{v}_{i}) = \lambda_{i} (\mathbf{X}^{\mathrm{T}} \mathbf{v}_{i})\tag{12.29}$$

từ đó chúng ta thấy rằng $(\mathbf{X}^{\mathrm{T}} \mathbf{v}_{i})$ là một vectơ riêng của S với giá trị riêng $\lambda_{i}$. Tuy nhiên, các vectơ riêng này không nhất thiết phải được chuẩn hóa. Để xác định chuẩn hóa thích hợp, chúng ta thay đổi tỷ lệ $\mathbf{u}_{i} \propto \mathbf{X}^{\mathrm{T}} \mathbf{v}_{i}$ bằng một hằng số sao cho $\|\mathbf{u}_{i}\| = 1$, điều này, với giả định rằng $\mathbf{v}_{i}$ đã được chuẩn hóa thành độ dài đơn vị, cho ta

$$\mathbf{u}_{i} = \frac{1}{(N \lambda_{i})^{1/2}} \mathbf{X}^{\mathrm{T}} \mathbf{v}_{i}.\tag{12.30}$$

Tóm lại, để áp dụng phương pháp này, trước tiên chúng ta tính $\mathbf{X} \mathbf{X}^{\mathrm{T}}$, sau đó tìm các vectơ riêng và giá trị riêng của nó, rồi tính các vectơ riêng trong không gian dữ liệu gốc bằng cách sử dụng (12.30).