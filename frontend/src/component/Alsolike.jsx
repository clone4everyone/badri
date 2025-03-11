import React, { useState, useRef, useEffect } from 'react';
import LikeCard from './cards/LikeCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';   
import API from '../utils/API';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
const Alsolike = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const [products,setProducts]=useState(null);
  const properties = [
    {
      id: 1,
      image: "/api/placeholder/400/320",
      title: "Sri Sai Shakthi Nagar (Poondi Project)",
      location: "Location: Poondi, Thiruvallur District",
      projectSize: "6 Acres",
      bedrooms: "2BHK - 1Balcony",
      price: "40,30,000"
    },
    {
      id: 2,
      image: "/api/placeholder/400/320",
      title: "Sri Sai Shakthi Nagar (Poondi Project)",
      location: "Location: Poondi, Thiruvallur District",
      projectSize: "6 Acres",
      bedrooms: "2BHK - 1Balcony",
      price: "40,30,000"
    },
    {
      id: 3,
      image: "/api/placeholder/400/320",
      title: "Sri Sai Shakthi Nagar (Poondi Project)",
      location: "Location: Poondi, Thiruvallur District",
      projectSize: "6 Acres",
      bedrooms: "2BHK - 1Balcony",
      price: "40,30,000"
    },
    {
      id: 4,
      image: "/api/placeholder/400/320",
      title: "Sri Sai Shakthi Nagar (Poondi Project)",
      location: "Location: Poondi, Thiruvallur District",
      projectSize: "6 Acres",
      bedrooms: "2BHK - 1Balcony",
      price: "40,30,000"
    },
    {
      id: 5,
      image: "/api/placeholder/400/320",
      title: "Sri Sai Shakthi Nagar (Poondi Project)",
      location: "Location: Poondi, Thiruvallur District",
      projectSize: "6 Acres",
      bedrooms: "2BHK - 1Balcony",
      price: "40,30,000"
    }
  ];

  
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      setTimeout(() => {
        setScrollPosition(container.scrollLeft);
      }, 500);
    }
  };
 useEffect(()=>{
        const call=async()=>{
            try{
                console.log("hello")
              const data=await API.get('/projects/getAll');
             setProducts(data.data.courses);
             console.log(data.data.courses)
            }catch(err){
                 console.log(err.message);
            }
          }
          call();
    },[]);
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <div className="bg-amber-50 p-6 px-12 rounded-lg mt-5">
      <h2 className="text-4xl  mb-6 fira-sans">You May Also Like</h2>
      {
        products ? (
<div className="relative">
        {/* Left scroll button */}
        <button 
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded-full shadow ${
            scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft size={20} />
        </button>
        
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 scrollbar-hide" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
        >
          {products.map((property,index) => (
            <LikeCard
             property={property}
             key={index}
            />
          ))}
        </div>
        
        {/* Right scroll button */}
        <button 
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded-full shadow ${
            scrollContainerRef.current && 
            scrollPosition >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.offsetWidth - 10 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100'
          }`}
          disabled={scrollContainerRef.current && 
            scrollPosition >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.offsetWidth - 10}
        >
          <ChevronRight size={20} />
        </button>
      </div>
        ):
          <div className='w-full flex justify-center items-center py-24'>
                <Loading className=""/>
              </div>
        
      }
      
    </div>
  );
};

export default Alsolike;