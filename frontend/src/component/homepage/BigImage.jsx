import React from 'react';

const BigImage = () => {
  return (
    <>
      <div className="relative w-full h-[65vh]">
  {/* Background Image */}
  <div
    className="w-full h-full bg-cover bg-center relative"
    style={{
      backgroundImage:
        "url('https://cdn.shopify.com/s/files/1/0053/6513/7472/products/newyorkcitysunset911.jpg?v=1544036357')",
    }}
  >
    {/* Overlay for better text visibility */}
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-6 sm:px-8">
      {/* Main Heading */}
      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold leading-tight">
        Unique Housing & Land Solution for You
      </h1>
      {/* Subheading */}
      <p className="text-sm sm:text-lg md:text-xl mt-4 mb-6">
        Building Dreams, Crafting Legacies. Your Trusted Address Since 1980.
      </p>
      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <a href='#service' className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-md font-semibold rounded-lg transition duration-300">
          Our Services
        </a>
        <a href='#contact' className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm md:text-md font-semibold rounded-lg transition duration-300">
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
