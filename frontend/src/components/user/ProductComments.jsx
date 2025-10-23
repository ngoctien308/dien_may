import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { MessageCircle, Star, Send, Edit2, Trash2 } from "lucide-react"
import { toast } from "sonner"

const ProductComments = ({ productId }) => {
  const { user, isSignedIn } = useUser()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [rating, setRating] = useState(0)
  const [editingComment, setEditingComment] = useState(null)
  const [editContent, setEditContent] = useState("")
  const [editRating, setEditRating] = useState(0)

  useEffect(() => {
    fetchComments()
  }, [productId])

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/comments/product/${productId}`)
      const productComments = res.data.comments
      setComments(productComments)
    } catch (error) {
      console.error("Error fetching comments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!isSignedIn) {
      toast.error("Vui lòng đăng nhập để bình luận!")
      return
    }

    if (!newComment.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận!")
      return
    }

    try {
      // Tạo comment mới với mock data
      const newCommentData = {
        product_id: Number.parseInt(productId),
        user_id: user.id,
        comment_content: newComment.trim(),
        comment_rating: rating > 0 ? rating : null,
      }

      await axios.post(`http://localhost:3000/api/comments/product/${productId}`, newCommentData)
      fetchComments()

      setNewComment("")
      setRating(0)
      toast.success("Bình luận đã được thêm!")
    } catch (error) {
      console.error("Error adding comment:", error)
      toast.error("Có lỗi xảy ra khi thêm bình luận!")
    }
  }

  const handleEditComment = async (commentId) => {
    if (!editContent.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận!")
      return
    }

    try {
      await axios.put(`http://localhost:3000/api/comments/${commentId}`, {
        comment_content: editContent.trim(),
        comment_rating: editRating > 0 ? editRating : null,
      })
      fetchComments()
      setEditingComment(null)
      setEditContent("")
      setEditRating(0)
      toast.success("Bình luận đã được cập nhật!")
    } catch (error) {
      console.error("Error updating comment:", error)
      toast.error("Có lỗi xảy ra khi cập nhật bình luận!")
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      return
    }

    try {
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`)
      fetchComments()
      toast.success("Bình luận đã được xóa!")
    } catch (error) {
      console.error("Error deleting comment:", error)
      toast.error("Có lỗi xảy ra khi xóa bình luận!")
    }
  }

  const startEdit = (comment) => {
    setEditingComment(comment.comment_id)
    setEditContent(comment.comment_content)
    setEditRating(comment.comment_rating || 0)
  }

  const cancelEdit = () => {
    setEditingComment(null)
    setEditContent("")
    setEditRating(0)
  }

  const renderStars = (currentRating, onRatingChange, readOnly = false) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readOnly && onRatingChange(star)}
            disabled={readOnly}
            className={`${readOnly ? "cursor-default" : "cursor-pointer hover:scale-125"} transition-all duration-200`}
          >
            <Star className={`w-6 h-6 ${star <= currentRating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDisplayName = (comment) => {
    // Nếu comment có user_id trùng với user hiện tại, hiển thị tên từ Clerk
    if (isSignedIn && user?.id === comment.user_id) {
      return user.fullName || user.emailAddresses[0].emailAddress
    }
    // Nếu không, hiển thị "User" + một phần của user_id
    return `User ${comment.user_id.slice(-4)}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-gray-900"></div>
          <p className="text-sm text-gray-500">Đang tải bình luận...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
        <div className="p-2 bg-gray-100 rounded-lg">
          <MessageCircle className="w-6 h-6 text-gray-900" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Bình luận và đánh giá</h3>
          <p className="text-sm text-gray-500 mt-1">
            {comments.length} {comments.length === 1 ? "bình luận" : "bình luận"}
          </p>
        </div>
      </div>

      {isSignedIn ? (
        <form
          onSubmit={handleSubmitComment}
          className="mb-10 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Đánh giá sản phẩm</label>
            {renderStars(rating, setRating)}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Chia sẻ trải nghiệm của bạn</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Sản phẩm này như thế nào? Chất lượng, giao hàng, dịch vụ..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <Send className="w-4 h-4" />
            Gửi bình luận
          </button>
        </form>
      ) : (
        <div className="mb-10 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-blue-900 font-medium">📝 Vui lòng đăng nhập để bình luận và đánh giá sản phẩm.</p>
        </div>
      )}

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-200 bg-white"
            >
              {editingComment === comment.comment_id ? (
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Đánh giá</label>
                    {renderStars(editRating, setEditRating)}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Nội dung bình luận</label>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-gray-900"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditComment(comment.comment_id)}
                      className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 active:scale-95 transition-all duration-200"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-5 py-2 bg-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-400 active:scale-95 transition-all duration-200"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                          <img
                            src={user.imageUrl}
                            alt='userimg'
                            className="w-full h-full object-cover"
                          />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{getDisplayName(comment)}</h4>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(comment.created_at)}</p>
                      </div>
                    </div>

                    {isSignedIn && user?.id === comment.user_id && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEdit(comment)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="Sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.comment_id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {comment.comment_rating && (
                    <div className="mb-4">{renderStars(comment.comment_rating, () => { }, true)}</div>
                  )}

                  <p className="text-gray-700 leading-relaxed text-base">{comment.comment_content}</p>

                  {comment.updated_at && comment.updated_at !== comment.created_at && (
                    <p className="text-xs text-gray-400 mt-3">Đã chỉnh sửa {formatDate(comment.updated_at)}</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 font-medium mb-1">Chưa có bình luận nào</p>
            <p className="text-gray-500 text-sm">Hãy là người đầu tiên chia sẻ trải nghiệm của bạn!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductComments
