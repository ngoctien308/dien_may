import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "./Header"
import axios from "axios"
import { useAuth } from "@clerk/clerk-react"

export default function Checkout() {
  const [step, setStep] = useState(1)
  const { userId } = useAuth();
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });


  const [paymentMethod, setPaymentMethod] = useState("cod")

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProductsInCart = async () => {      
      const res = await axios.get(`http://localhost:3000/api/cart/user/${userId}`);
      setCartItems(res.data.products);
    };

    fetchProductsInCart();
  }, [userId])

  const navigate = useNavigate()

  const subtotal = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0)
  const shipping = subtotal > 500000 ? 0 : 30000
  const total = subtotal + shipping

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handleConfirmOrder = async () => {
    setOrderSuccess(true);
    cartItems.forEach(async cartItem => {
      await axios.delete(`http://localhost:3000/api/cart/${cartItem.cart_id}`);
    })

    setTimeout(() => {
      navigate("/")
    }, 3000)
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h2>
            <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
            <p className="text-sm text-gray-500 mb-6">Bạn sẽ được chuyển hướng về trang chủ trong giây lát...</p>
            <Link
              to="/"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Quay lại trang chủ
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán</h1>
            <p className="text-gray-600">Bước {step} của 3</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 flex gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1">
                <div className={`h-2 rounded-full transition-colors ${s <= step ? "bg-gray-900" : "bg-gray-200"}`} />
                <p className="text-sm text-gray-600 mt-2">
                  {s === 1 ? "Thông tin giao hàng" : s === 2 ? "Phương thức thanh toán" : "Xác nhận đơn hàng"}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8">
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin giao hàng</h2>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Họ và tên</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="example@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Số điện thoại</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="0123456789"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Địa chỉ</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Nhập địa chỉ"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Tỉnh/Thành phố</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Tỉnh/Thành phố"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Quận/Huyện</label>
                          <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Quận/Huyện"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Phường/Xã</label>
                          <input
                            type="text"
                            name="ward"
                            value={formData.ward}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Phường/Xã"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link
                        to="/user/cart"
                        className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
                      >
                        Quay lại
                      </Link>
                      <button
                        type="submit"
                        className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      >
                        Tiếp tục
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Phương thức thanh toán</h2>

                    <div className="space-y-4 mb-6">
                      {[
                        { id: "cod", label: "Thanh toán khi nhận hàng (COD)", icon: "🚚" },
                        { id: "visa", label: "Thẻ Visa/Mastercard", icon: "💳" },
                        { id: "atm", label: "Chuyển khoản ATM", icon: "🏦" },
                        { id: "momo", label: "Ví MoMo", icon: "📱" },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === method.id
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4"
                          />
                          <span className="ml-3 text-lg">{method.icon}</span>
                          <span className="ml-3 font-medium text-gray-900">{method.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Quay lại
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      >
                        Tiếp tục
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Order Confirmation */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Xác nhận đơn hàng</h2>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Thông tin giao hàng</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium text-gray-900">Tên:</span> {formData.fullName}
                        </p>
                        <p>
                          <span className="font-medium text-gray-900">Email:</span> {formData.email}
                        </p>
                        <p>
                          <span className="font-medium text-gray-900">Điện thoại:</span> {formData.phone}
                        </p>
                        <p>
                          <span className="font-medium text-gray-900">Địa chỉ:</span> {formData.address}, {formData.ward},{" "}
                          {formData.district}, {formData.city}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
                      <p className="text-sm text-gray-600">
                        {paymentMethod === "cod"
                          ? "Thanh toán khi nhận hàng (COD)"
                          : paymentMethod === "visa"
                            ? "Thẻ Visa/Mastercard"
                            : paymentMethod === "atm"
                              ? "Chuyển khoản ATM"
                              : "Ví MoMo"}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Quay lại
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmOrder}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        Xác nhận đặt hàng
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b">
                      <img
                        src={item.image1 || "/placeholder.svg"}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{item.product_name}</p>
                        <p className="text-xs text-gray-600">{item.version_name}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {formatPrice(item.product_price * item.quantity)}đ
                        </p>
                        <p className="text-xs text-gray-500">x{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span className="font-medium">{formatPrice(subtotal)}đ</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="font-medium">
                      {shipping === 0 ? <span className="text-green-600">Miễn phí</span> : `${formatPrice(shipping)}đ`}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Tổng cộng</span>
                      <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}đ</span>
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
