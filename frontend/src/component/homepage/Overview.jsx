import React from 'react';

const Overview = () => {
  return (
    <>
   <div className="w-full h-auto pl-4 md:pl-0 flex justify-center relative -top-20">
  <div className="w-[90%] md:w-[86%] h-full z-10 backdrop-blur-md gap-6 flex flex-col md:flex-row items-center justify-around  border p-6 bg-white/70 py-11">
    <div className="h-auto md:h-[70%] border-black md:border-r-2 px-6 flex flex-col items-center justify-center mb-4 md:mb-0 text-gray-800">
      <h1 className="text-4xl md:text-[64px] font-bold">5+</h1>
      <p className="text-base md:text-lg font-medium mt-4">Years of Experience</p>
    </div>
    <div className="h-auto md:h-[70%] border-black md:border-r-2 px-6 flex flex-col items-center justify-center mb-4 md:mb-0 text-gray-800">
      <h1 className="text-4xl md:text-[64px] font-bold">47+</h1>
      <p className="text-base md:text-lg font-medium mt-4">Projects Done</p>
    </div>
    <div className="h-auto md:h-[70%] border-black md:border-r-2 px-6 flex flex-col items-center justify-center mb-4 md:mb-0 text-gray-800">
      <h1 className="text-4xl md:text-[64px] font-bold">40+</h1>
      <p className="text-base md:text-lg font-medium mt-4">Customers Served</p>
    </div>
    <div className="h-auto md:h-[70%] px-6 flex flex-col items-center justify-center text-gray-800">
      <h1 className="text-4xl md:text-[64px] font-bold">466k+</h1>
      <p className="text-base md:text-lg font-medium mt-4">Sq.ft Sold</p>
    </div>
  </div>
</div>


    </>
  );
}

export default Overview;
