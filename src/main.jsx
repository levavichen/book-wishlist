import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BookIndex } from './pages/BookIndex'

import './assets/styles/main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookIndex />
  </StrictMode>,
)
