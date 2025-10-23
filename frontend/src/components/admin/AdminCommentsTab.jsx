import { useEffect, useState } from "react"
import axios from "axios"
import { MessageCircle, Star, Search, Trash2, Eye, Filter } from "lucide-react"
import { toast } from 'sonner'

const AdminCommentsTab = () => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [filteredComments, setFilteredComments] = useState([])
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, comment: null })
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState({});

  const fetchUser = async (userId) => {
    if (users[userId]) return users[userId]; // tránh gọi lại

    try {
      const res = await axios.get(`http://localhost:3000/api/users/${userId}`);
      const name = res.data.user.name;
      const imgUrl = res.data.user.imgUrl;

      setUsers(prev => ({ ...prev, [userId]: { name, imgUrl } }));
    } catch (error) {
      console.error("Error fetching user name:", error);
      setUsers(prev => ({ ...prev, [userId]: "Người dùng" }));
    }
  };

  useEffect(() => {
    fetchComments()
    fetchStats()
  }, [])

  useEffect(() => {
    comments.forEach(c => fetchUser(c.user_id));
  }, [comments]);

  useEffect(() => {
    filterComments()
  }, [comments, searchTerm, filterRating])

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/comments")
      setComments(res.data.comments)
    } catch (error) {
      console.error("Error fetching comments:", error)
      toast.error("Có lỗi xảy ra khi tải bình luận!")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/comments/stats")
      setStats(res.data.stats)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const filterComments = () => {
    let filtered = comments

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(comment =>
        comment.comment_content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by rating
    if (filterRating !== "all") {
      if (filterRating === "no-rating") {
        filtered = filtered.filter(comment => !comment.comment_rating)
      } else {
        filtered = filtered.filter(comment => comment.comment_rating == filterRating)
      }
    }

    setFilteredComments(filtered)
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`)
      setComments(prev => prev.filter(comment => comment.comment_id !== commentId))
      setDeleteConfirm({ show: false, comment: null })
      fetchStats() // Refresh stats
      toast.success("Xóa bình luận thành công!")
    } catch (error) {
      console.error("Error deleting comment:", error)
      toast.error("Có lỗi xảy ra khi xóa bình luận!")
    }
  }

  const showDeleteConfirm = (comment) => {
    setDeleteConfirm({ show: true, comment })
  }

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, comment: null })
  }

  const renderStars = (rating) => {
    if (!rating) return <span className="text-gray-400 text-sm">Chưa đánh giá</span>

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bình luận...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý bình luận</h2>
          <p className="text-sm text-gray-600 mt-1">Tổng cộng: {comments.length} bình luận</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total_comments}</p>
                <p className="text-sm text-gray-600">Tổng bình luận</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.average_rating}
                </p>
                <p className="text-sm text-gray-600">Đánh giá TB</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.rated_comments}</p>
                <p className="text-sm text-gray-600">Có đánh giá</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.recent_comments}</p>
                <p className="text-sm text-gray-600">7 ngày qua</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo nội dung, user ID hoặc sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
            >
              <option value="all">Tất cả đánh giá</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
              <option value="no-rating">Chưa đánh giá</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredComments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredComments.map((comment) => (
              <div key={comment.comment_id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {users[comment.user_id]?.imgUrl ? (
                        <img
                          src={users[comment.user_id].imgUrl}
                          alt={users[comment.user_id].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 font-medium text-sm">
                          {users[comment.user_id]?.name?.charAt(0).toUpperCase() || "?"}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{users[comment.user_id]?.name || "Đang tải..."}</h4>
                      <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => showDeleteConfirm(comment)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                    title="Xóa bình luận"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">Sản phẩm:</span>
                    <span className="text-sm text-gray-600">{comment.product_name}</span>
                  </div>

                  {comment.comment_rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-gray-700">Đánh giá:</span>
                      {renderStars(comment.comment_rating)}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{comment.comment_content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm || filterRating !== "all"
                ? "Không tìm thấy bình luận nào phù hợp với bộ lọc"
                : "Chưa có bình luận nào"}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg border border-gray-200 backdrop-blur-sm duration-300 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Xác nhận xóa bình luận</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa bình luận của <strong>"User {deleteConfirm.comment?.user_id?.slice(-4)}"</strong>?
              Hành động này không thể hoàn tác.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDeleteComment(deleteConfirm.comment.comment_id)}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium"
              >
                Xóa bình luận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCommentsTab