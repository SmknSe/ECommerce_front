import axios from 'axios'
import './App.css'
import AuthContextProvider, { AuthContext } from './components/AuthContext'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Auth from './pages/Auth'
import { Toaster } from './components/ui/toaster'
import Home from './pages/Home'
import useViewNavigate from './lib/hooks/viewNavigate'
import Protected from './components/Protected'
import { useContext } from 'react'

function App() {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = 'http://localhost:8080/api/'
  // axios.defaults.baseURL = 'https://e-commerce-spring.onrender.com/api/'
  useContext(AuthContext)
  return (
    <AuthContextProvider>
      <div className="h-full">
        <BrowserRouter>
          {/* header */}
          <div className="p-6 overflow-auto w-full h-full">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/auth" element={<Protected><Auth /></Protected>} />
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthContextProvider>
  )
}

export default App
