import { sampleProducts } from "../../mock-data"
import ProductCard from "./ProductCard"

export default function ProductList() {

    return (
        <div className="container mx-auto px-10 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-600">Sản phẩm nổi bật</h2>
                <p className="mt-2 text-gray-600">Khám phá những sản phẩm hot nhất</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {sampleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
