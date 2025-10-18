"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Header from "./Header"
import { formatPrice } from "../../utils/functions"

export default function LikedProducts() {
    const [likedItems, setLikedItems] = useState([
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            image: "/anh1.jpg",
            price: 29990000,
            originalPrice: 34990000,
            variant: "256GB - Titan Tự Nhiên",
        },
        {
            id: 3,
            name: "Giày sneaker trắng",
            image: "/anh2.jpg",
            price: 890000,
            originalPrice: 1200000,
            variant: "Size 42",
        }
    ])

    const removeFromLiked = (id) => {
        setLikedItems(likedItems.filter((item) => item.id !== id))
    }

    const calculateDiscount = (original, current) => {
        if (!original) return 0
        return Math.round(((original - current) / original) * 100)
    }

    if (likedItems.length === 0) {
        return (
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
                                <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <Link
                                            to={`/products/${item.id}`}
                                            className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                                        >
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                            {item.originalPrice && (
                                                <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                                    -{calculateDiscount(item.originalPrice, item.price)}%
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
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-sm text-gray-600 mt-1">{item.variant}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromLiked(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    aria-label="Xóa khỏi yêu thích"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end mt-4">
                                                {/* Price */}
                                                <div>
                                                    <p className="text-lg font-semibold text-gray-900">{formatPrice(item.price)}đ</p>
                                                    {item.originalPrice && (
                                                        <p className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}đ</p>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2">
                                                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                                        <ShoppingCart className="w-4 h-4" />
                                                        Thêm giỏ
                                                    </button>
                                                    <Link
                                                        to={`/products/${item.id}`}
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
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tổng giá gốc</span>
                                        <span className="font-medium">
                                            {formatPrice(likedItems.reduce((sum, item) => sum + (item.originalPrice || item.price), 0))}đ
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Tiết kiệm được</span>
                                        <span className="font-medium">
                                            {formatPrice(
                                                likedItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) - item.price), 0),
                                            )}
                                            đ
                                        </span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
                                            <span className="text-2xl font-bold text-gray-900">
                                                {formatPrice(likedItems.reduce((sum, item) => sum + item.price, 0))}đ
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-3">
                                    Thêm tất cả vào giỏ
                                </button>

                                <button className="w-full border border-gray-300 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                    Xóa tất cả
                                </button>

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
