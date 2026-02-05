import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './components/user/SignIn'
import Home from './components/user/Home'
import ProductDetail from './components/user/ProductDetail'
import Cart from './components/user/Cart'
import LikedProducts from './components/user/LikedProducts'
import AdminSignIn from './components/admin/AdminSignIn'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminHome from './components/admin/AdminHome'
import AdminAddProduct from './components/admin/AdminAddProduct'
import AdminEditProduct from './components/admin/AdminEditProduct'
import AdminProductDetail from './components/admin/AdminProductDetail'
import Checkout from './components/user/Checkout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user/home" replace />} />
      {/* USER */}
      <Route path='/user/signin' element={<SignIn />} />
      <Route path='/user/home' element={<Home />} />
      <Route path='/user/products/:id' element={<ProductDetail />} />
      <Route path='/user/cart' element={<Cart />} />
      <Route path='/user/liked-products' element={<LikedProducts />} />
      <Route path='/user/checkout' element={<Checkout />} />

      {/* ADMIN */}
      <Route path="/admin" element={<Navigate to="/admin/home" replace />} />
      <Route path='/admin/signin' element={<AdminSignIn />} />
      <Route path='/admin/home' element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
      <Route path='/admin/add-product' element={<ProtectedRoute><AdminAddProduct /></ProtectedRoute>} />
      <Route path='/admin/edit-product/:productId' element={<ProtectedRoute><AdminEditProduct /></ProtectedRoute>} />
      <Route path='/admin/product-detail/:productId' element={<ProtectedRoute><AdminProductDetail /></ProtectedRoute>} />

      {/* Bất kỳ đường dẫn nào khác → quay về /user */}
      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
  )
}

export default App