import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Login from '../../pages/Login';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Smooth scrolling effect added here
          });
      };
  return (
    <>
   <h1
  className="bg-[#2222AE] flex justify-center py-2 text-sm text-white hover:cursor-pointer "
  onClick={scrollToTop}
>
  Go Back To Top
</h1>
<footer className="bg-[#EEEEFC] text-black pt-6 pl-10 md:pl-0">
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-6">
    {/* Logo & Social Media */}
    <div>
      <h1 className="text-lg font-semibold mb-3 font-fira-sana"> 
        <Logo />
      </h1>
      <div className="flex space-x-3">
        <a href="#" className="text-black hover:text-blue-500">
          <FaFacebook size={20} />
        </a>
        <a href="#" className="text-black hover:text-blue-400">
          <FaTwitter size={20} />
        </a>
        <a href="#" className="text-black hover:text-pink-500">
          <FaInstagram size={20} />
        </a>
        <a href="#" className="text-black hover:text-blue-700">
          <FaLinkedin size={20} />
        </a>
      </div>
    </div>

    {/* Site Map */}
    <div>
      <h2 className="text-md font-medium mb-3 font-fira-sana">Site Map</h2>
      <ul className="space-y-1">
        <li>
          <Link to="/" className="hover:text-black text-sm font-montserrat">
            Home
          </Link>
        </li>
        <li>
          <Link to="/#about" className="hover:text-black text-sm font-montserrat">
            About
          </Link>
        </li>
        <li>
          <Link to="/#service" className="hover:text-black text-sm font-montserrat">
            Service
          </Link>
        </li>
        <li>
          <Link to="/#properties" className="hover:text-black text-sm font-montserrat">
            Properties
          </Link>
        </li>
        <li>
          <Link to="/#contact" className="hover:text-black text-sm font-montserrat">
            Contacts
          </Link>
        </li>
      </ul>
    </div>

    {/* Services */}
    <div>
      <h2 className="text-md font-medium mb-3 font-fira-sana">Services</h2>
      <ul className="space-y-1">
        <li>
          <a href="#" className="hover:text-black text-sm font-montserrat">
            Buy
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-black text-sm font-montserrat">
            Land Sale Solution
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-black text-sm font-montserrat">
            Construction
          </a>
        </li>
      </ul>
    </div>

    {/* Head Office */}
    <div>
      <h2 className="text-md font-medium mb-3 font-fira-sana">Head Office</h2>
      <p className="text-sm text-black font-montserrat">
        Office at: 123 Main Street, City, Country
      </p>
      <p className="text-sm text-black font-montserrat mt-1">Phone: +123-456-7890</p>
      <p className="text-sm text-black font-montserrat mt-1">
        Email:{" "}
        <a href="mailto:info@example.com" className="hover:text-black">
          info@example.com
        </a>
      </p>
    </div>
  </div>

  <div className="flex  sm:flex-row justify-between px-2 bg-[#2222AE] text-white text-xs mt-6 border-t border-gray-700 py-2 font-montserrat">
    <p>© {new Date().getFullYear()} copyright</p>
    <p>Privacy Policy</p>
    <p>All rights reserved.</p>
  </div>
</footer>

  </>
  
  );
}

export default Footer;
