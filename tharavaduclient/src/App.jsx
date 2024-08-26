import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/about' element={<About/>}  />
      <Route path='/gallery' element={<Gallery/>}  />
      <Route path='/contact' element={<Contact/>}  />
      <Route path='/login' element={<Login/>}  />
      <Route path='/register' element={<Register/>}  />
      <Route path='/events' element={<Events/>}  />
    </Routes>
    </>
  )
}

export default App
