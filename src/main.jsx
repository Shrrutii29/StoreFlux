import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CardProvider } from './context/card.context.jsx'
import { AuthProvider } from './context/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CardProvider>
          <App />
        </CardProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
