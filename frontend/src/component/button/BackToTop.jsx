import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Smooth scrolling effect added here
          });
      };
  return (
    <div className='fixed bottom-24 right-[29.5px] bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center hover:cursor-pointer z-50' onClick={scrollToTop}>
      <FaArrowUp />
    </div>
  );
}

export default BackToTop;
