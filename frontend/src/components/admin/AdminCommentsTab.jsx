const AdminCommentsTab = () => {
    const comments = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      product: "iPhone 15 Pro Max",
      rating: 5,
      comment: "Sản phẩm rất tốt, giao hàng nhanh!",
      date: "15/01/2025",
    },
    {
      id: 2,
      user: "Trần Thị B",
      product: "Áo thun nam basic",
      rating: 4,
      comment: "Chất lượng ổn, giá hơi cao",
      date: "14/01/2025",
    },
    {
      id: 3,
      user: "Lê Văn C",
      product: "Giày sneaker trắng",
      rating: 5,
      comment: "Mình rất hài lòng!",
      date: "13/01/2025",
    },
    {
      id: 4,
      user: "Phạm Thị D",
      product: "Đồng hồ thời trang",
      rating: 3,
      comment: "Bình thường, không có gì đặc biệt",
      date: "12/01/2025",
    },
  ]

  return (
    <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Bình luận và đánh giá</h2>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{comment.user}</h3>
                        <p className="text-sm text-gray-600">{comment.product}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${i < comment.rating ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{comment.comment}</p>
                    <div className="flex gap-2">
                      <button className="text-green-600 hover:text-green-800 font-medium text-sm">Phê duyệt</button>
                      <button className="text-red-600 hover:text-red-800 font-medium text-sm">Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default AdminCommentsTab