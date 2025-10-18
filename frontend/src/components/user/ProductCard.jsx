import { useState } from "react"
import { Heart, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { formatPrice } from "../../utils/functions";

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }  

  const handleAddToCart = () => {
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image1}
          alt={product.product_name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {product.product_discount !== 0 && <div className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          {`-${product.product_discount}%`}
        </div>}

        {/* Action Buttons - Heart & Cart */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={toggleLike}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
            aria-label="Thêm vào yêu thích"
          >
            <Heart className={`h-5 w-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-extralight uppercase text-gray-900">{product.product_name}</h3>

        <div className="mb-3 flex items-center gap-2">
          {product.product_discount == 0 && <span className="font-bold text-gray-900">{formatPrice(product.product_price)}</span>}
          {product.product_discount !== 0 && (
            <span className="font-bold text-gray-900">
              {formatPrice(product.product_price - (product.product_price * product.product_discount) / 100)}
            </span>
          )}
          {product.product_discount !== 0 && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(product.product_price)}</span>
          )}
        </div>

        <Link
          to={`/user/products/${product.product_id}`}
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 cursor-pointer"
        >
          Xem chi tiết
        </Link>

      </div>
    </div>
  )
}
