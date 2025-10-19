import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Edit2, Trash2, Tag, DollarSign, Percent, Package, FileText, Image as ImageIcon } from "lucide-react"
import axios from "axios"
import { toast } from 'sonner'
import { formatPrice } from '../../utils/functions.js'

const AdminProductDetail = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/products/${productId}`)
      setProduct(res.data.product)
    } catch (error) {
      console.error("Error fetching product:", error)
      toast.error("Có lỗi xảy ra khi tải thông tin sản phẩm!")
      navigate('/admin/home')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`)
      toast.success("Xóa sản phẩm thành công!")
      navigate('/admin/home')
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Có lỗi xảy ra khi xóa sản phẩm!")
    }
  }

  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600 mb-4">Sản phẩm này có thể đã bị xóa hoặc không tồn tại.</p>
          <Link
            to="/admin/home"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin/home"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </Link>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.product_name}</h1>
              <p className="text-gray-600 mt-2">ID: {product.product_id}</p>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/admin/edit-product/${product.product_id}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Sửa sản phẩm
              </Link>
              <button
                onClick={() => setDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Xóa sản phẩm
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Hình ảnh sản phẩm
              </h2>
              <div className="space-y-4">
                {[product.image1, product.image2, product.image3].map((image, index) => (
                  image && (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`${product.product_name} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        onError={(e) => (e.target.src = "/placeholder.svg")}
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        Ảnh {index + 1}
                      </div>
                    </div>
                  )
                ))}
                {!product.image1 && !product.image2 && !product.image3 && (
                  <div className="text-center py-8 text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>Chưa có hình ảnh</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Thông tin cơ bản
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                    <p className="text-gray-900 font-medium">{product.product_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{product.category_name || "Chưa phân loại"}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc</label>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900 font-medium">{formatPrice(product.product_price)}đ</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giảm giá</label>
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-gray-500" />
                      {product.product_discount > 0 ? (
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-700 border border-red-200">
                          -{product.product_discount}%
                        </span>
                      ) : (
                        <span className="text-gray-500">Không có</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-bold text-lg">
                        {formatPrice(calculateDiscountedPrice(product.product_price, product.product_discount))}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Mô tả sản phẩm
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Thông số kỹ thuật
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.specifications}</p>
              </div>
            )}

            {/* Product Versions */}
            {product.versions && product.versions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Phiên bản sản phẩm
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {product.versions.map((version, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span className="text-gray-900 font-medium">{version.version_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg border border-gray-200 backdrop-blur-sm duration-300 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Xác nhận xóa sản phẩm</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa sản phẩm <strong>"{product.product_name}"</strong>? 
                Hành động này không thể hoàn tác.
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium"
                >
                  Xóa sản phẩm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProductDetail
