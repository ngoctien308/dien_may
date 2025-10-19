import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { MessageCircle, Star, Send, Edit2, Trash2 } from "lucide-react"
import { toast } from 'sonner'

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
      const res = await axios.get(`http://localhost:3000/api/comments/product/${productId}`);      
      const productComments = res.data.comments;
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
        product_id: parseInt(productId),
        user_id: user.id,
        comment_content: newComment.trim(),
        comment_rating: rating > 0 ? rating : null,
      }

      await axios.post(`http://localhost:3000/api/comments/product/${productId}`, newCommentData);
      fetchComments();

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
      await axios.put(`http://localhost:3000/api/comments/${commentId}`, { comment_content: editContent.trim(), comment_rating: editRating > 0 ? editRating : null });
      fetchComments();
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
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`);
      fetchComments();
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
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readOnly && onRatingChange(star)}
            disabled={readOnly}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= currentRating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-6 h-6 text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-900">
          Bình luận {comments.length > 0 ? `(${comments.length})` : ""}
        </h3>
      </div>

      {/* Add Comment Form */}
      {isSignedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá sản phẩm
            </label>
            {renderStars(rating, setRating)}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bình luận của bạn
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            />
          </div>
          
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Send className="w-4 h-4" />
            Gửi bình luận
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            Vui lòng đăng nhập để bình luận và đánh giá sản phẩm.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.comment_id} className="border-b border-gray-200 pb-6 last:border-b-0">
              {editingComment === comment.comment_id ? (
                // Edit Form
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đánh giá
                    </label>
                    {renderStars(editRating, setEditRating)}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung bình luận
                    </label>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditComment(comment.comment_id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                // Comment Display
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-sm">
                          {getDisplayName(comment).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{getDisplayName(comment)}</h4>
                        <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                      </div>
                    </div>
                    
                    {isSignedIn && user?.id === comment.user_id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(comment)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.comment_id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {comment.comment_rating && (
                    <div className="mb-3">
                      {renderStars(comment.comment_rating, () => {}, true)}
                    </div>
                  )}
                  
                  <p className="text-gray-700 leading-relaxed">{comment.comment_content}</p>
                  
                  {comment.updated_at && comment.updated_at !== comment.created_at && (
                    <p className="text-xs text-gray-400 mt-2">
                      Đã chỉnh sửa {formatDate(comment.updated_at)}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductComments
