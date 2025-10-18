import { formatPrice } from "../../utils/functions";

const AdminStatisticsTab = () => {
    const products = [
    { id: 1, name: "iPhone 15 Pro Max", category: "Điện thoại", price: 29990000, stock: 45, sales: 234 },
    { id: 2, name: "Áo thun nam basic", category: "Thời trang", price: 199000, stock: 120, sales: 567 },
    { id: 3, name: "Giày sneaker trắng", category: "Giày dép", price: 890000, stock: 78, sales: 189 },
    { id: 4, name: "Đồng hồ thời trang", category: "Phụ kiện", price: 650000, stock: 32, sales: 98 },
    { id: 5, name: "Váy midi hoa nhí", category: "Thời trang", price: 380000, stock: 56, sales: 145 },
  ]  

  const stats = {
    totalRevenue: 125450000,
    totalOrders: 1234,
    totalCustomers: 856,
    topProduct: "iPhone 15 Pro Max",
    topProductSales: 234,
  } 

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Thống kê kinh doanh</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <p className="text-gray-600 text-sm font-medium mb-2">Tổng doanh thu</p>
                    <p className="text-3xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}đ</p>
                    <p className="text-green-600 text-sm mt-2">+12% so với tháng trước</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <p className="text-gray-600 text-sm font-medium mb-2">Tổng đơn hàng</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                    <p className="text-green-600 text-sm mt-2">+8% so với tháng trước</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <p className="text-gray-600 text-sm font-medium mb-2">Tổng khách hàng</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
                    <p className="text-green-600 text-sm mt-2">+15% so với tháng trước</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <p className="text-gray-600 text-sm font-medium mb-2">Sản phẩm bán chạy</p>
                    <p className="text-lg font-bold text-gray-900">{stats.topProduct}</p>
                    <p className="text-gray-600 text-sm mt-2">{stats.topProductSales} đơn hàng</p>
                </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Doanh thu theo tháng</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
                        Biểu đồ doanh thu
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Top 5 sản phẩm bán chạy</h3>
                    <div className="space-y-3">
                        {products.slice(0, 5).map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 font-medium">#{index + 1}</span>
                                    <span className="text-gray-900">{product.name}</span>
                                </div>
                                <span className="font-semibold text-gray-900">{product.sales} bán</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminStatisticsTab