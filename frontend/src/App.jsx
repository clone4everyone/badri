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
  useEffect(() => {
      setTimeout(() => {
        setLoading(false); // Show loading for 3 seconds initially
      }, 5000);
    
  }, []); // Empty dependency array to run once on component mount



  return (
    <>
      {loading && <Enterance />} {/* Show loading screen when loading */}
      {!loading && (
        <Routes>
          <Route path="/auth/email-sent" element={<EmailSentPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path='/projectDetail/:name/:id' element={<ProjectDetail />} />
        </Routes>
      )}
    </>
  );
};

export default App;
