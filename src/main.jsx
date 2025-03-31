import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/bootstrap/bootstrap.min.css'
import './styles/bootstrap/bootstrap.bundle.min.js'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
