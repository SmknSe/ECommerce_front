import axios from 'axios'
import './App.css'
import AuthContextProvider from './components/AuthContext'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Auth from './pages/Auth'
import { Toaster } from './components/ui/toaster'
import Home from './pages/Home'
import useViewNavigate from './lib/hooks/viewNavigate'

function App() {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = 'http://localhost:8080/api/'
  return (
    <AuthContextProvider>
      <div className="h-full">
        <BrowserRouter>
          {/* header */}
          <div className="p-6 overflow-auto w-full h-full">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthContextProvider>
  )
}

export default App
