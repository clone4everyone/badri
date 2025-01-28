import React from 'react';
import big from "../../assets/big.png"
const BigImage = () => {
  return (
    <>
  <div className="relative w-full h-[65vh] md:h-[75vh]">
  {/* Background Image */}
  <div
    className="w-full h-full bg-cover bg-center relative"
    style={{
      backgroundImage: `url('${big}')`,
    }}
  >
    {/* Overlay for better text visibility */}
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-center text-center text-white px-6 sm:px-8 md:pl-24">
      {/* Main Heading */}
      <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl text-start font-bold leading-tight">
        Unique Housing & Land <br /> Solution for You
      </h1>
      {/* Subheading */}
      <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mt-4 mb-6">
        Building Dreams, Crafting Legacies. Your Trusted Address Since 1980.
      </p>
      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <a
          href="#service"
          className="px-4 py-2 bg-[#2b2bd9] hover:bg-blue-700 text-white text-sm md:text-base font-semibold rounded-sm transition duration-300"
        >
          Our Services
        </a>
        <a
          href="#contact"
          className="px-4 py-2 bg-white border-2 border-[#2b2bd9] text-[#2b2bd9] text-sm md:text-base font-semibold rounded-sm transition duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

export default BigImage;
