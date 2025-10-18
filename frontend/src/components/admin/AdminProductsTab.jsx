import { useEffect, useState } from "react"
import { formatPrice } from '../../utils/functions.js'
import axios from "axios"
import { Eye, Edit2, Trash2, Search } from "lucide-react"
import { Link } from "react-router-dom"

const AdminProductsTab = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products")
        setProducts(res.data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_id.toString().includes(searchTerm),
    )
    setFilteredProducts(filtered)
  }, [products, searchTerm])

  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100))
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h2>
          <p className="text-sm text-gray-600 mt-1">Tổng cộng: {products.length} sản phẩm</p>
        </div>
        <Link to='/admin/add-product' className="bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium flex items-center gap-2 shadow-sm hover:shadow-md">
          <span>+</span> Thêm sản phẩm
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc ID sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Ảnh</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Giá gốc
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Giảm giá
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Giá bán
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.product_id}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        {[product.image1, product.image2, product.image3].map((img, idx) => (
                          <img
                            key={idx}
                            src={img || "/diverse-products-still-life.png"}
                            alt={`Product ${idx + 1}`}
                            className="w-12 h-12 rounded-md object-cover border border-gray-200 hover:border-gray-400 transition-colors"
                            onError={(e) => (e.target.src = "/diverse-products-still-life.png")}
                          />
                        ))}
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate"
                      title={product.product_name}
                    >
                      {product.product_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category_name || "Chưa phân loại"}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {formatPrice(product.product_price)}đ
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.product_discount > 0 ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                          -{product.product_discount}%
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                      {formatPrice(calculateDiscountedPrice(product.product_price, product.product_discount))}đ
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150"
                          title="Sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    <p className="text-sm">Không tìm thấy sản phẩm nào</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminProductsTab
