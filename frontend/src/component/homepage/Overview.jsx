import React from 'react';

const Overview = () => {
  return (
    <>
     <div className="w-full h-auto pl-4 md:pl-0 flex justify-center relative -top-20">
  <div className="w-[90%] md:w-[75%] h-full z-10 backdrop-blur gap-3 flex flex-col md:flex-row items-center justify-center border-gray-400 border p-4">
    <div className="h-auto md:h-[70%] border-black border-r-0 md:border-r-2 px-3 flex flex-col items-center justify-center mb-4 md:mb-0">
      <h1 className="text-xl md:text-2xl font-bold">5+</h1>
      <p className="text-sm md:text-base">years of experience</p>
    </div>
    <div className="h-auto md:h-[70%] border-black border-r-0 md:border-r-2 px-3 flex flex-col items-center justify-center mb-4 md:mb-0">
      <h1 className="text-xl md:text-2xl font-bold">47+</h1>
      <p className="text-sm md:text-base">projects done</p>
    </div>
    <div className="h-auto md:h-[70%] border-black border-r-0 md:border-r-2 px-3 flex flex-col items-center justify-center mb-4 md:mb-0">
      <h1 className="text-xl md:text-2xl font-bold">40+</h1>
      <p className="text-sm md:text-base">customer served</p>
    </div>
    <div className="h-auto md:h-[70%] px-3 flex flex-col items-center justify-center">
      <h1 className="text-xl md:text-2xl font-bold">466k+</h1>
      <p className="text-sm md:text-base">sq.ft sold</p>
    </div>
  </div>
</div>

    </>
  );
}

export default Overview;
