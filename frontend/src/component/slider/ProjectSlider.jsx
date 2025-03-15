import React, { useState } from 'react';
import projectData from '../../data/productData';
import { FaAngleLeft, FaAngleRight, FaArrowLeft,FaArrowRight, FaGreaterThan, FaGreaterThanEqual } from 'react-icons/fa';

const ProjectSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === projectData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? projectData.length - 1 : prevIndex - 1
        );
    };

    const { year, thumbnail, titile, location, area, description } = projectData[currentIndex];

    return (
        <div className="relative mt-[37vh] md:mt-0 w-full p-8 bg-[#EEEEFC]">
        <h2 className="text-2xl md:text-4xl  mb-6 fira-sans md:pl-12">Our Top Projects</h2>
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 justify-around">
          <button
            onClick={prevSlide}
            className="text-3xl rounded-lg  font-bold hover:bg-gray-200 hover:scale-125 text-black  py-5 px-2 self-center md:self-auto "
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="96" viewBox="0 0 35 96" fill="none">
<g id="left arrow">
<rect id="Rectangle 4437" opacity="0.1" x="35" y="96" width="35" height="96" transform="rotate(-180 35 96)" fill="#D9D9D9"/>
<path id="Arrow 36" d="M11.2929 47.2929C10.9024 47.6834 10.9024 48.3166 11.2929 48.7071L17.6569 55.0711C18.0474 55.4616 18.6805 55.4616 19.0711 55.0711C19.4616 54.6805 19.4616 54.0474 19.0711 53.6569L13.4142 48L19.0711 42.3431C19.4616 41.9526 19.4616 41.3195 19.0711 40.9289C18.6805 40.5384 18.0474 40.5384 17.6569 40.9289L11.2929 47.2929ZM14 47L12 47L12 49L14 49L14 47Z" fill="#1B1C1E"/>
</g>
</svg>
          {/* {'<'} */}
            {/* <FaAngleLeft/> */}
          </button>
          
          <div className="relative flex items-center ">
            {/* <div className="text-3xl md:text-4xl h-full flex-col justify-start  text-gray-700 absolute -left-10 md:-left-16 font-[firaSans]">
              {year}
            </div> */}
            <img
              src={thumbnail}
              alt={titile}
              className="w-60 h-60 md:w-80 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-3xl  fira-sans animate-text-shine">{titile}</h3>
            <p className="text-sm md:text-lg font-semibold font-[Montserrat]">
              Location: {location}
            </p>
            <p className="text-sm md:text-lg font-semibold font-[Montserrat]">
              Project Size: {area}
            </p>
            <p className="text-gray-700 mt-4 text-sm md:text-base font-[Montserrat]">
              {description}
            </p>
          </div>
          <button
            onClick={nextSlide}
            className="text-3xl px-2 p-1 rounded-lg hover:bg-gray-200 hover:scale-125 text-black  py-5  self-center md:self-auto font-bold"
          
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="96" viewBox="0 0 35 96" fill="none">
<g id="right arrow">
<rect id="Rectangle 4437" opacity="0.1" width="35" height="96" fill="#D9D9D9"/>
<path id="Arrow 36" d="M23.7071 48.7071C24.0976 48.3166 24.0976 47.6834 23.7071 47.2929L17.3431 40.9289C16.9526 40.5384 16.3195 40.5384 15.9289 40.9289C15.5384 41.3195 15.5384 41.9526 15.9289 42.3431L21.5858 48L15.9289 53.6569C15.5384 54.0474 15.5384 54.6805 15.9289 55.0711C16.3195 55.4616 16.9526 55.4616 17.3431 55.0711L23.7071 48.7071ZM21 49L23 49L23 47L21 47L21 49Z" fill="#1B1C1E"/>
</g>
</svg>
           {/* {'>'} */}
          </button>
        </div>
      </div>
      
    );
};

export default ProjectSlider;
