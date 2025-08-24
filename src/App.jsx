import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { Wishlist } from './pages/Wishlist'
import Receipt from './pages/Receipt'
import { AuthSignup } from './pages/AuthSignup'
import { AuthLogin } from './pages/AuthLogin'
import { Profile } from './pages/Profile'
import { ProtectedRoute } from './utils/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Protected routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Auth routes */}
      <Route path="/auth/login" element={<AuthLogin />} />
      <Route path="/auth/signup" element={<AuthSignup />} />

      <Route path="/receipt" 
      element={
          <ProtectedRoute>
            <Receipt />
          </ProtectedRoute>
        } />
    </Routes>
  )
}

export default App
