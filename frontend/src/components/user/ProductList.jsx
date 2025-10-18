import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import axios from "axios"

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('http://localhost:3000/api/products');
            setProducts(res.data.products);
        }

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-10 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-600">Sản phẩm nổi bật</h2>
                <p className="mt-2 text-gray-600">Khám phá những sản phẩm hot nhất</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))}
            </div>
        </div>
    )
}
