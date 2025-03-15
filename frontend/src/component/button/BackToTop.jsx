import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Current scroll position
      const windowHeight = window.innerHeight; // Viewport height
      const documentHeight = document.documentElement.scrollHeight; // Total document height
      
      // Show button if scrolled past 200px but hide if at the bottom
      if (scrollTop > 200 && scrollTop + windowHeight < documentHeight - 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div 
          className='fixed bottom-24 right-[29.5px] bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center hover:cursor-pointer z-50'
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </div>
      )}
    </>
  );
};

export default BackToTop;
