import { useEffect, useState } from "react"
import axios from "axios"
import { Edit2, Trash2, Search, Plus, Tag } from "lucide-react"
import { toast } from 'sonner'

const AdminCategoriesTab = () => {
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCategories, setFilteredCategories] = useState([])
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, category: null })
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    category_name: ""
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.category_id.toString().includes(searchTerm)
    )
    setFilteredCategories(filtered)
  }, [categories, searchTerm])

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories")
      setCategories(res.data.categories)
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast.error("Có lỗi xảy ra khi tải danh mục!")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/api/categories", formData)
      setFormData({ category_name: "" })
      setShowAddModal(false)
      fetchCategories()
      toast.success("Thêm danh mục thành công!")
    } catch (error) {
      console.error("Error adding category:", error)
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm danh mục!")
    }
  }

  const handleEditCategory = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3000/api/categories/${editingCategory.category_id}`, formData)
      setFormData({ category_name: "" })
      setShowEditModal(false)
      setEditingCategory(null)
      fetchCategories()
      toast.success("Cập nhật danh mục thành công!")
    } catch (error) {
      console.error("Error updating category:", error)
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật danh mục!")
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${categoryId}`)
      setCategories(prev => prev.filter(category => category.category_id !== categoryId))
      setDeleteConfirm({ show: false, category: null })
      toast.success("Xóa danh mục thành công!")
    } catch (error) {
      console.error("Error deleting category:", error)
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa danh mục!")
    }
  }

  const showDeleteConfirm = (category) => {
    setDeleteConfirm({ show: true, category })
  }

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, category: null })
  }

  const openEditModal = (category) => {
    setEditingCategory(category)
    setFormData({
      category_name: category.category_name
    })
    setShowEditModal(true)
  }

  const closeModals = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setEditingCategory(null)
    setFormData({ category_name: "" })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h2>
          <p className="text-sm text-gray-600 mt-1">Tổng cộng: {categories.length} danh mục</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          Thêm danh mục
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc ID danh mục..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.category_id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Tag className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.category_name}</h3>
                    <p className="text-sm text-gray-500">ID: {category.category_id}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150"
                    title="Sửa"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showDeleteConfirm(category)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy danh mục nào</p>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg border border-gray-200 backdrop-blur-sm duration-300 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Thêm danh mục mới</h3>
            </div>
            
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tên danh mục *</label>
                <input
                  type="text"
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên danh mục"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors font-medium"
                >
                  Thêm danh mục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg border border-gray-200 backdrop-blur-sm duration-300 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Edit2 className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Sửa danh mục</h3>
            </div>
            
            <form onSubmit={handleEditCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tên danh mục *</label>
                <input
                  type="text"
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên danh mục"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors font-medium"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg border border-gray-200 backdrop-blur-sm duration-300 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Xác nhận xóa danh mục</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa danh mục <strong>"{deleteConfirm.category?.category_name}"</strong>? 
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
                onClick={() => handleDeleteCategory(deleteConfirm.category.category_id)}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium"
              >
                Xóa danh mục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCategoriesTab
