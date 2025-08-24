import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { Wishlist } from './pages/Wishlist'
import Receipt from './pages/Receipt'
import { AuthSignup } from './pages/AuthSignup'
import { AuthLogin } from './pages/AuthLogin'
import { Profile } from './pages/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route path ="/" element = {<Home/>} />
        <Route path ="/cart" element = {<Cart/>} />
        <Route path ="/wishlist" element = {<Wishlist/>} />
        <Route path ="/auth/login" element = {<AuthLogin/>} />
        <Route path ="/auth/signup" element = {<AuthSignup/>} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
