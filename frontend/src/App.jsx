import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from './pages/Projects'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import ProjectDetail from './pages/ProjectDetail'
import Register from './pages/Register'
import ScrollToTop from './component/ScrollToTop'
import EmailSentPage from './pages/auth/email-sent/Page'
import ForgotPassword from './pages/auth/forgot-password/Page'
import ResetPassword from './pages/auth/reset-password/Page'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <ScrollToTop/>
    <Routes>
    <Route path="/auth/email-sent" element={<EmailSentPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={ <HomePage/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/projectDetail/:name/:id' element={<ProjectDetail/>}/>
    
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
