import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CardProvider } from './context/card.context.jsx'
import { LoginProvider } from './context/login.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CardProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </CardProvider>
    </BrowserRouter>
  </StrictMode>,
)
