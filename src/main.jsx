//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'normalize.css'
import './styles/styles.scss'
import './index.css'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <App />
  // </StrictMode>,
)
