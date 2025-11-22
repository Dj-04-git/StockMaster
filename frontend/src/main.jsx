import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Navbar />}>
        <Route index element={<App />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Route>
    </Routes>
  </BrowserRouter>,
)
