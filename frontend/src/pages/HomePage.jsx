import React,{useEffect} from 'react';
import  Navbar  from '../component/homepage/Navbar';
import BigImage from '../component/homepage/BigImage';
import Overview from '../component/homepage/Overview';
import About from '../component/homepage/About';
import Service from '../component/homepage/Service';
import Products from '../component/homepage/Products';
import ContactUs from '../component/homepage/ContactUs';
import Footer from '../component/homepage/Footer';
import Testimonial from '../component/homepage/Testimonial';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  const togle=()=>{
    toast.success("hello")
  }
  return (
    <>
     <Navbar/>
    <div className="bg-[#E9E9FB] p-0 m-0 ">
      
      <BigImage/>
      <Overview/>
      <section id="about" className="!mb-0 !pb-0">
        <About/>
      </section>
      
    </div>
     <section id='service'>
      <Service/>
     </section>
      <section id='projects'>
        <Products/>
      </section>
      
      <Testimonial/>
      <section id='contact'>
        <ContactUs/>
      </section>
      
      <Footer/>
    </>
  );
}

export default HomePage;
