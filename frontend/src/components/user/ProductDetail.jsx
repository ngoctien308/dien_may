import { useEffect, useState } from "react"
import { Heart, ShoppingCart, Minus, Plus, Star } from "lucide-react"
import Header from "./Header"
import Footer from "./Footer"
import { reviews } from "../../mock-data"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function ProductDetailPage() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [selectedVersion, setSelectedVersion] = useState(0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleChangeVersion = (version_id) => {
    setSelectedVersion(version_id);
  };

  // fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:3000/api/products/${id}`);
      setProduct(res.data.product);
      setSelectedVersion(res.data.product.versions[0]?.version_id);
      setSelectedImage(res.data.product.image1);
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    console.log(product)
  }, [product]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white">
              <img
                src={selectedImage || product?.image1}
                alt={product?.product_name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {[
                product.image1,
                product.image2,
                product.image3
              ].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${selectedImage === index
                      ? "border-gray-900"
                      : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.product_name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product?.product_name}</h1>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(4.0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {4.0} (1000 đánh giá)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product?.product_price * (1 - (product?.product_discount || 0) / 100))}
              </span>
              {product?.product_discount !== 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">{formatPrice(product?.product_price)}</span>
                  <span className="rounded-md bg-red-500 px-2 py-1 text-sm font-semibold text-white">
                    -
                    {product?.product_discount}
                    %
                  </span>
                </>
              )}
            </div>

            {/* Versions */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Phiên bản</h3>
              <div className="flex flex-wrap gap-2">
                {product?.versions?.map((version) => (
                  <button
                    key={version?.version_id}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${selectedVersion === version.version_id
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    onClick={() => handleChangeVersion(version.version_id)}
                  >
                    {version.version_name}
                  </button>
                ))}
              </div>
            </div>


            {/* Quantity */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Số lượng</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-gray-200">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="flex h-10 w-10 items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="flex h-10 w-10 items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800">
                <ShoppingCart className="mr-2 inline-block h-5 w-5" />
                Thêm vào giỏ hàng
              </button>
              <button className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-600">
                Đặt hàng ngay
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50"
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`pb-4 text-sm font-semibold transition-colors ${activeTab === "details"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Chi tiết sản phẩm
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-sm font-semibold transition-colors ${activeTab === "reviews"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Đánh giá (1000)
              </button>
            </div>
          </div>

          <div className="mt-6">
            {activeTab === "details" && (
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Mô tả sản phẩm</h3>
                <p className="text-gray-700 leading-relaxed">{product?.description}</p>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-gray-900">Thông số kỹ thuật:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {
                      product?.specifications?.split(',').map(item => {
                        const [key, value] = item.split(':');
                        return (
                          <li className="flex" key={key}>
                            <span className="w-40 font-medium">{key}</span>
                            <span>{value}</span>
                          </li>
                        )
                      })
                    }
                  </ul>

                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border border-gray-200 bg-white p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 4.0 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
