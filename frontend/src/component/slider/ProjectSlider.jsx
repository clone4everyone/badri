import React, { useState } from 'react';
import projectData from '../../data/productData';

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
        <div className="relative mt-0 w-full p-8 bg-[#EEEEFC]">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 font-[Fira_Sans]">Our Projects</h2>
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          <button
            onClick={prevSlide}
            className="text-3xl font-[Fira_Sans] text-gray-700 self-center md:self-auto"
          >
            &#9664;
          </button>
          <div className="relative flex items-center">
            <div className="text-4xl md:text-6xl h-full flex-col justify-start font-bold text-gray-700 absolute -left-10 md:-left-16 font-[Fira_Sans]">
              {year}
            </div>
            <img
              src={thumbnail}
              alt={titile}
              className="w-60 h-60 md:w-80 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold font-[Fira_Sans]">{titile}</h3>
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
            className="text-3xl font-[Fira_Sans] text-gray-700 self-center md:self-auto"
          >
            &#9654;
          </button>
        </div>
      </div>
      
    );
};

export default ProjectSlider;
