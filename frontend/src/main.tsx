import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './Dashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
    <Route
     path="/" element={<App />}/>
      <Route
     path="/app" element={<Dashboard />}/>
    
</Routes>
  </BrowserRouter>,
)
