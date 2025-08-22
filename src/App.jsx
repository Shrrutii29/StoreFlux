import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { CardProvider } from './context/card.context'
import { Cart } from './pages/Cart'
import { Wishlist } from './pages/Wishlist'

function App() {

  return (
    <>
      <Routes>
        <Route path ="/" element = {<Home/>} />
        <Route path ="/cart" element = {<Cart/>} />
        <Route path ="/wishlist" element = {<Wishlist/>} />
      </Routes>
    </>
  )
}

export default App
