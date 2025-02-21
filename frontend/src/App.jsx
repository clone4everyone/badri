import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Projects from './pages/Projects';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import ProjectDetail from './pages/ProjectDetail';
import Register from './pages/Register';
import ScrollToTop from './component/ScrollToTop';
import EmailSentPage from './pages/auth/email-sent/Page';
import ForgotPassword from './pages/auth/forgot-password/Page';
import ResetPassword from './pages/auth/reset-password/Page';
import Enterance from './component/Enterance';
import Service from './pages/Service';
import Testimonial from './pages/Testimonial';
import NotFound from './pages/NotFound';
import WhatsAppButton from './component/button/WhatsAppButton';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LoadingRoutes />
    </BrowserRouter>
  );
}

const LoadingRoutes = () => {
  const [loading, setLoading] = useState(true);// To track route changes

  // Handle page loading and first-time visit logic
  const [showEnterance, setShowEnterance] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setShowEnterance(false); // Unmount only after the animation ends
      }, 700); // Match this duration with your animation duration
    }, 4000); // Simulate 5 seconds loading

  return ()=>clearTimeout(timer)
  }, []); // Empty dependency array to run once on component mount



  return (
    <>
   
      {showEnterance && <Enterance loading={loading}/>} {/* Show loading screen when loading */}
   
    
      {!showEnterance && (
        <>
        <Routes>
          <Route path="/auth/email-sent" element={<EmailSentPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/service" element={<Service/>}/>
          <Route path='/projectDetail/:name/:id' element={<ProjectDetail />} />
          <Route path='/Testimonials' element={<Testimonial />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <WhatsAppButton />
        </>

        

      )}
    </>
  );
};

export default App;
