import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Header from "./Header"
import { formatPrice } from "../../utils/functions"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { toast } from "sonner"

export default function LikedProducts() {
    const [likedItems, setLikedItems] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchLikedItems = async () => {
            try {
                // Giả sử có API để lấy sản phẩm yêu thích của người dùng
                const res = await axios.get('http://localhost:3000/api/like-product/user/' + userId);
                setLikedItems(res.data?.likedProducts);
                console.log(res.data.likedProducts)
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm yêu thích:', error);
            }
        }

        fetchLikedItems();
    }, [userId])

    const removeFromLiked = async (id) => {
        setLikedItems(likedItems.filter((item) => item.product_id !== id));
        try {
            await axios.delete(`http://localhost:3000/api/like-product/product/${id}/user/${userId}`);
            toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích');
        } catch (error) {
            console.log(error);
            toast.error('Lỗi khi xóa sản phẩm khỏi danh sách yêu thích');
        }   
    }

    const calculateDiscount = (original, current) => {
        if (!original) return 0
        return Math.round(((original - current) / original) * 100)
    }

    if (likedItems.length === 0) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Danh sách yêu thích trống</h2>
                            <p className="text-gray-600 mb-6">Bạn chưa thêm sản phẩm nào vào danh sách yêu thích</p>
                            <Link
                                to="/"
                                className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách yêu thích</h1>
                        <p className="text-gray-600">Bạn có {likedItems.length} sản phẩm trong danh sách yêu thích</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Liked Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {likedItems.map((item) => (
                                <div key={item.product_id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <Link
                                            to={`/products/${item.product_id}`}
                                            className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                                        >
                                            <img
                                                src={item.image1 || "/placeholder.svg"}
                                                alt={item.product_name}
                                                className="w-full h-full object-cover"
                                            />
                                            {item.product_discount && (
                                                <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                                    -{item.product_discount}%
                                                </div>
                                            )}
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <Link
                                                        to={`/products/${item.id}`}
                                                        className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                                                    >
                                                        {item.product_name}
                                                    </Link>
                                                    <p className="text-sm text-gray-600 mt-1">{item.variant}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromLiked(item.product_id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    aria-label="Xóa khỏi yêu thích"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end mt-4">
                                                {/* Price */}
                                                <div>
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        {
                                                            formatPrice(item.product_price - (item.product_price * item.product_discount / 100))
                                                        }
                                                    </p>
                                                    {item.product_discount > 0 && (
                                                        <p className="text-sm text-gray-500 line-through">{formatPrice(item.product_price)}đ</p>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2">
                                                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                                        <ShoppingCart className="w-4 h-4" />
                                                        Thêm giỏ
                                                    </button>
                                                    <Link
                                                        to={`/user/products/${item.product_id}`}
                                                        className="px-3 py-2 border border-gray-300 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        Chi tiết
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Continue Shopping */}
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mt-4"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Tiếp tục mua sắm
                            </Link>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Tóm tắt</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Số sản phẩm</span>
                                        <span className="font-medium">{likedItems.length}</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
                                            <span className="text-2xl font-bold text-gray-900">
                                                {formatPrice(likedItems.reduce((sum, item) => sum + Number(item.product_discount > 0
                                                    ? item.product_price - (item.product_price * item.product_discount / 100)
                                                    : item.product_price), 0))}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                                    <p>✓ Miễn phí vận chuyển cho đơn trên 500.000đ</p>
                                    <p>✓ Đổi trả trong 30 ngày</p>
                                    <p>✓ Hỗ trợ 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
