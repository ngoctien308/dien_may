import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import axios from "axios"
import { toast } from 'sonner'

export default function AdminEditProduct() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    product_name: "",
    product_price: "",
    product_discount: "",
    category_id: "",
    specifications: "",
    description: "",
    versions: ""
  })

  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
  })

  const [imagePreview, setImagePreview] = useState({
    image1: null,
    image2: null,
    image3: null,
  })

  const [currentImages, setCurrentImages] = useState({
    image1: "",
    image2: "",
    image3: "",
  })

  useEffect(() => {
    fetchCategories()
    fetchProduct()
  }, [productId])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/categories')
      setCategories(res.data.categories)
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error)
    }
  }

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/products/${productId}`)
      const product = res.data.product
      
      setFormData({
        product_name: product.product_name || "",
        product_price: product.product_price || "",
        product_discount: product.product_discount || "",
        category_id: product.category_id || "",
        specifications: product.specifications || "",
        description: product.description || "",
        versions: product.versions ? product.versions.map(v => v.version_name).join(', ') : ""
      })

      setCurrentImages({
        image1: product.image1 || "",
        image2: product.image2 || "",
        image3: product.image3 || "",
      })

      setImagePreview({
        image1: product.image1 || null,
        image2: product.image2 || null,
        image3: product.image3 || null,
      })
    } catch (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error)
      toast.error('Có lỗi xảy ra khi tải thông tin sản phẩm!')
      navigate('/admin/home')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e, imageField) => {
    const file = e.target.files[0]
    if (file) {
      // Lưu file object
      setImageFiles((prev) => ({
        ...prev,
        [imageField]: file,
      }))
      
      // Tạo preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview((prev) => ({
          ...prev,
          [imageField]: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (imageField) => {
    setImageFiles((prev) => ({
      ...prev,
      [imageField]: null,
    }))
    setImagePreview((prev) => ({
      ...prev,
      [imageField]: null,
    }))
    setCurrentImages((prev) => ({
      ...prev,
      [imageField]: "",
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Upload ảnh mới nếu có
      let imageUrls = { ...currentImages }
      
      const formDataImg = new FormData()
      let hasNewImages = false

      if (imageFiles.image1) {
        formDataImg.append('images', imageFiles.image1)
        hasNewImages = true
      }
      if (imageFiles.image2) {
        formDataImg.append('images', imageFiles.image2)
        hasNewImages = true
      }
      if (imageFiles.image3) {
        formDataImg.append('images', imageFiles.image3)
        hasNewImages = true
      }

      if (hasNewImages) {
        const uploadRes = await axios.post('http://localhost:3000/api/upload', formDataImg, {
          headers: { 'Content-Type': 'multipart/form-data' },
          maxBodyLength: Infinity,
          maxContentLength: Infinity
        })
        
        const uploadedUrls = uploadRes.data.urls
        let urlIndex = 0
        
        if (imageFiles.image1) {
          imageUrls.image1 = uploadedUrls[urlIndex++]
        }
        if (imageFiles.image2) {
          imageUrls.image2 = uploadedUrls[urlIndex++]
        }
        if (imageFiles.image3) {
          imageUrls.image3 = uploadedUrls[urlIndex++]
        }
      }

      // Cập nhật sản phẩm
      const productData = {
        ...formData,
        image1: imageUrls.image1,
        image2: imageUrls.image2,
        image3: imageUrls.image3,
      }

      await axios.put(`http://localhost:3000/api/products/${productId}`, productData)
      toast.success('Cập nhật sản phẩm thành công!')
      navigate('/admin/home')
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Có lỗi xảy ra khi cập nhật sản phẩm!')
    }
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin/home"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Sửa sản phẩm</h1>
          <p className="text-gray-600 mt-2">Cập nhật thông tin sản phẩm dưới đây</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin cơ bản</h2>
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tên sản phẩm *</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sản phẩm"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Danh mục *</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price and Discount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Giá sản phẩm (đ) *</label>
                  <input
                    type="number"
                    name="product_price"
                    value={formData.product_price}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Phần trăm giảm giá (%)</label>
                  <input
                    type="number"
                    name="product_discount"
                    value={formData.product_discount}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Mô tả sản phẩm</h2>
            <div className="space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Mô tả chi tiết</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả sản phẩm"
                  rows="4"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Specifications */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Thông số kỹ thuật</label>
                <textarea
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleInputChange}
                  placeholder="Nhập thông số kỹ thuật (ví dụ: Màn hình: 6.7 inch, Chip: A17 Pro, RAM: 8GB)"
                  rows="4"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Hình ảnh sản phẩm</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {["image1", "image2", "image3"].map((imageField, index) => (
                <div key={imageField}>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Ảnh {index + 1}</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, imageField)}
                      className="hidden"
                      id={imageField}
                    />
                    <label
                      htmlFor={imageField}
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all"
                    >
                      {imagePreview[imageField] ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imagePreview[imageField]}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              removeImage(imageField)
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Tải ảnh lên</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Versions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Phiên bản sản phẩm</h2>
            <div className="space-y-4">
              <input
                name="versions"
                value={formData.versions}
                onChange={handleInputChange}
                type="text"
                placeholder="Ví dụ: iPhone 11 64GB, iPhone 11 128GB"
                className="w-full flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <Link
              to='/admin/home'
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Hủy
            </Link>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Cập nhật sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
