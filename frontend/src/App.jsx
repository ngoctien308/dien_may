import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './components/user/SignIn'
import Home from './components/user/Home'
import ProductDetail from './components/user/ProductDetail'
import Cart from './components/user/Cart'
import LikedProducts from './components/user/LikedProducts'
import UserProtectedRoute from './components/user/UserProtectedRoute'
import AdminHome from './components/admin/AdminHome'
import AdminAddProduct from './components/admin/AdminAddProduct'
import AdminEditProduct from './components/admin/AdminEditProduct'
import AdminProductDetail from './components/admin/AdminProductDetail'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user/home" replace />} />
      {/* USER */}
      <Route path='/user/signin' element={<SignIn />} />
      <Route path='/user/home' element={<Home />} />
      <Route path='/user/products/:id' element={<ProductDetail />} />

      <Route element={<UserProtectedRoute />}>
        <Route path='/user/cart' element={<Cart />} />
        <Route path='/user/liked-products' element={<LikedProducts />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<Navigate to="/admin/home" replace />} />
      <Route path='/admin/home' element={<AdminHome />} />
      <Route path='/admin/add-product' element={<AdminAddProduct />} />
      <Route path='/admin/edit-product/:productId' element={<AdminEditProduct />} />
      <Route path='/admin/product-detail/:productId' element={<AdminProductDetail />} />

      {/* Bất kỳ đường dẫn nào khác → quay về /user */}
      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
  )
}

export default App