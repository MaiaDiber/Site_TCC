import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navegation from './routes'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navegation />
  </StrictMode>,
)
