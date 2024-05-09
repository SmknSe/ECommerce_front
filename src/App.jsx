import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import PersistLogin from './components/PersistLogin'
import RequireAuth from './components/RequireAuth'
import Catalog from './pages/Catalog'

function App() {
  // axios.defaults.baseURL = 'https://e-commerce-spring.onrender.com/api/'
  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/catalog" element={< Catalog />} />
        <Route path="/products/:category" element={< Products />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={< Profile />} />
            {/* <Route path="/cart" element={< Cart />} /> */}
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
