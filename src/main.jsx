import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Editor from './Components/Editor.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Editor/> */}
  </StrictMode>,
)
