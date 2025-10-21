"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "./Header"
import { formatPrice } from "../../utils/functions"
import { useEffect } from "react"
import axios from "axios"
import { useAuth } from "@clerk/clerk-react"

export default function Cart() {
    const { userId } = useAuth();

    const [cartItems, setCartItems] = useState([])

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0)
    const shipping = subtotal > 500000 ? 0 : 30000
    const total = subtotal + shipping;


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/cart/user/${userId}`);
                setCartItems(res.data.products);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
            }
        }
        fetchCartItems();
    }, [userId])

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Giỏ hàng trống</h2>
                        <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn</h1>
                        <p className="text-gray-600">Bạn có {cartItems.length} sản phẩm trong giỏ hàng</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.cart_id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                src={item.image1 || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">{item.product_name}</h3>
                                                    <p className="text-sm text-gray-600">{item.version_name}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    aria-label="Xóa sản phẩm"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center mt-4">
                                                <span className="text-center font-medium text-gray-900">Số lượng mua: {item.quantity}</span>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        {formatPrice(item.product_price * item.quantity)}
                                                    </p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-sm text-gray-500">{formatPrice(item.product_price)} / sản phẩm</p>
                                                    )}
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

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính</span>
                                        <span className="font-medium">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí vận chuyển</span>
                                        <span className="font-medium">
                                            {shipping === 0 ? <span className="text-green-600">Miễn phí</span> : `${formatPrice(shipping)}đ`}
                                        </span>
                                    </div>
                                    {shipping > 0 && (
                                        <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                                            Mua thêm {formatPrice(500000 - subtotal)}đ để được miễn phí vận chuyển
                                        </p>
                                    )}
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
                                            <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-3">
                                    Thanh toán
                                </button>

                                <button className="w-full border border-gray-300 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                    Cập nhật giỏ hàng
                                </button>

                                {/* Payment Methods */}
                                <div className="mt-6 pt-6 border-t">
                                    <p className="text-sm text-gray-600 mb-3">Chúng tôi chấp nhận</p>
                                    <div className="flex gap-2">
                                        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                                            VISA
                                        </div>
                                        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                                            MC
                                        </div>
                                        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                                            COD
                                        </div>
                                        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                                            ATM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
