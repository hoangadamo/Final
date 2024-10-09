# Final-Project

## Loyalty System

### Admin
+ Quản lý danh sách tất cả các user (CRUD)
+ Quản lý danh sách tất cả các store (CRUD)
+ Phê duyệt cửa hàng mới khi đăng ký
### Store
+ Đăng ký (verify OTP), đăng nhập bằng email (phải đã được duyệt)
+ Quản lý danh sách user tại cửa hàng
+ Tích điểm cho user
+ Tạo danh sách các item dùng để đổi quà (tên, điểm đổi, ảnh, thời hạn, số lượng, mô tả)
### User
+ User đăng ký tài khoản và đổi quà tại tất cả các store của hệ thống
+ User đăng ký/đăng nhập bằng số điện thoại và gửi OTP để xác nhận
+ Khi user mua hàng tại cửa hàng, số điểm tích cho user được chia làm 2 dạng:
    - Tích điểm cố định (Ví dụ: 100k tích 5 điểm, 200k tích 10 điểm)
    - Tích điểm theo phần trăm giá trị đơn hàng
+ Số điểm tích của user sẽ được chia thành các cấp bậc rank(mặc định khi đăng ký sẽ là rank đồng)
    - Rank đồng(default): Cứ mỗi 100k được tích 5 điểm hoặc được tích 10% tối đa 5 điểm 
    - Rank bạc (khi tích được 2000 điểm sẽ lên rank): Cứ mỗi 100k được tích 10 điểm hoặc tích 15% tối đa 10 điểm 
    - Rank vàng (khi tích được 5000 điểm sẽ lên rank): Cứ mỗi 100k được tích 15 điểm hoặc được tích 20% tối đa 20 điểm
+ Đổi sản phẩm (mỗi lần user chỉ được đổi tối đa 3 item, và số điểm tối đa có thể đổ là 1000 điểm/lần)
