import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { Wishlist } from './pages/Wishlist'
import { AuthLogin } from './pages/AuthLogin'
import Receipt from './pages/Receipt'

function App() {

  return (
    <>
      <Routes>
        <Route path ="/" element = {<Home/>} />
        <Route path ="/cart" element = {<Cart/>} />
        <Route path ="/wishlist" element = {<Wishlist/>} />
        <Route path ="/auth/login" element = {<AuthLogin/>} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </>
  )
}

export default App
