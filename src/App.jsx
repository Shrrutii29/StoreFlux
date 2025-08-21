import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { CartProvider } from './context/cart.context'
import { Cart } from './pages/Cart'

function App() {

  return (
    <>
      <Routes>
        <Route path ="/" element = {<Home/>} />
        <Route path ="/cart" element = {<Cart/>} />

      </Routes>
    </>
  )
}

export default App
