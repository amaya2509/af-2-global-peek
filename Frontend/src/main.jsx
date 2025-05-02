import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { FavoriteProvider } from './context/FavoriteContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <FavoriteProvider> 
      <AuthProvider>
        <App />
      </AuthProvider>
    </FavoriteProvider>
  </BrowserRouter>
</StrictMode>

)
