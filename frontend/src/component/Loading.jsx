import React,{useEffect,useState} from 'react';
import toast from 'react-hot-toast';
const Loading = () => {
   const [progress, setProgress] = useState(10);
  
   useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          toast.error("Refresh the page...");
          return 10; // Reset to 10% after reaching 100%
        }
        return prev + 1;
      });
    }, 1000); // Adjust speed

    return () => clearInterval(interval);
  }, []);
  return (
    <>
    {/* <div className='w-full flex items-center justify-center'>
 <div class="relative animate-spin-slow hover:animate-pulse transition-all">
  <svg xmlns="http://www.w3.org/2000/svg" width="180" height="245" viewBox="0 0 206 254" fill="none" class="stroke-[#F4BE85]">
    <g id="Frame 427319931">
      <path id="Vector 12" d="M0.5 250.841H30.3834V173.655L63.5539 148.228V250.841H49.8823V49.7775H87.7595V142.165H73.7143V2H121.677V202.068H105.615V157.91H156.267V251.203H140.429V63.7126L173.375 89.2302V251.203H205.5" class="stroke-dasharray-2000 stroke-dashoffset-2000 animation-drawing stroke-4" />
    </g>
  </svg>
</div>
    </div> */}
   
   <div className="w-full flex items-center justify-center">
      <div className="w-[70%] border border-[#F4B26E] rounded-full mt-3 overflow-hidden relative">
        {/* Loading bar */}
        <div
          className="h-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer Effect */}
          <div className="h-full bg-white/30 animate-pulse w-10 opacity-60 rounded-full ml-auto"></div>
        </div>
      </div>
    </div>
  
 
    </>
  );
}

export default Loading;
