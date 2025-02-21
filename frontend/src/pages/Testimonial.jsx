// import React from 'react';
// import TestimonialCard from '../component/cards/TestimonialCard';
// import man1 from '../assets/man1.jpg'
// import man2 from '../assets/man2.jpg'
// import man3 from '../assets/man3.jpg'
// import man4 from '../assets/man4.jpg'
// import man5 from '../assets/man5.jpg'
// const Testimonial = () => {
//     const testimonials=[
//         {
//           id: 1,
//           name: "Karan rawat",
//           profession: "Software Engineer",
//           feedback: "This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
//           rating: 5,
//           image: man1, // Replace with actual image URL
//         },
//         {
//           id: 2,
//           name: "Mahesh",
//           profession: "Doctor",
//           feedback: "Great experience and support from the team.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
//           rating: 4,
//           image: man2, // Replace with actual image URL
//         },
//         {
//           id: 3,
//           name: "Vamshi",
//           profession: "Store Manager",
//           feedback: "Satisfied with the results. Will use again!This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
//           rating: 5,
//           image: man3, // Replace with actual image URL
//         },
//         {
//           id: 4,
//           name: "vaibhav Negi",
//           profession: "Businessman",
//           feedback: "Exceptional quality and fast delivery.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
//           rating: 5,
//           image: man4, // Replace with actual image URL
//         },
//         {
//           id: 5,
//           name: "Ajay singh bartwal",
//           profession: "Freelancer",
//           feedback: "Affordable and reliable service. Highly impressed.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
//           rating: 4,
//           image: man5, // Replace with actual image URL
//         },
//       ];
//   return (
//     <>
//        <div className="flex flex-wrap gap-6 justify-center p-8 bg-gray-100">
//       {testimonials.map((testimonial, index) => (
//         <TestimonialCard key={index} {...testimonial} />
//       ))}
//     </div>
//     </>
//   );
// }

// export default Testimonial;


import { Box5087 } from "../component/Rectangle/rectangles";
import { Box5088 } from "../component/Rectangle/rectangles";
import { Box5091 } from "../component/Rectangle/rectangles";
import { Box5095 } from "../component/Rectangle/rectangles";
import { Box5096 } from "../component/Rectangle/rectangles";
import { Box5099 } from "../component/Rectangle/rectangles";
import star1 from "../assets/Star 1.png"
import nigga from "../assets/nigga.jpg"
import background from "../assets/project.jpeg";
import Footer from "../component/homepage/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/homepage/Navbar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../utils/API";
import Loading from "../component/Loading";
import ShowAll from "../component/button/ShowAll"
const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate=useNavigate();
 const [minimum,setMinimum]=useState(null);
const [testi,setTesti]=useState(null)

const expand=()=>{
  if(showAll) {
     setShowAll(false)
    setMinimum(testi.slice(0,5));
     return ;
    }
    setShowAll(true);
    setMinimum(testi);
 }
useEffect(()=>{
  const call=async()=>{
try{
   const data=await API.get("/testimonial/getAll");
   console.log(data)
   if(data.data.status){
   
    setTesti(data.data.testimonial);
    if(data.data.testimonial.length>5){
      setMinimum(data.data.testimonial.slice(0,5));
      return ;
    }
    setMinimum(data.data.testimonial);
    return ;
   }
   toast.error("cannot find testimonials");
}catch(err){
  toast.error(err.message)
}
  }
  call();
},[]);

  return (
    
    <>
<Navbar/>
<div
        className="w-full min-h-72 max-h-72 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-col justify-end gap-3 h-72 pb-8 px-6 sm:px-14 text-white">
          <h1 className="text-3xl sm:text-4xl font-semibold">Testimonials</h1>
          <p className="text-lg sm:text-xl font-[Montserrat]">
            <span
              onClick={() => navigate("/")}
              className="border-b-2 cursor-pointer"
            >
              Home
            </span>{" "}
            {">"} <span>Testimonials</span>
          </p>
        </div>
      </div>

      {/* Title Section */}
      <div className="px-6 sm:pl-14 pt-10 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-wide">
          What People Think About
        </h2>
        <p className="text-2xl sm:text-4xl font-bold [-webkit-text-stroke:1px_transparent] bg-[linear-gradient(180deg,rgb(0,0,0)_0%,rgb(102,102,102)_51.5%,rgb(0,0,0)_73.5%,rgb(102,102,102)_100%)] [-webkit-background-clip:text] [font-family:'Fira_Sans-Bold',Helvetica] mt-2 text-[#f5be86]  leading-[57.6px] whitespace-nowrap">
          SRI SAI REAL ESTATE & CONSTRUCTION
        </p>
      </div>

      {/* Testimonials Grid */}
      {
        minimum!==null ?  <div className="relative w-full bg-white px-6 sm:px-14 py-10 sm:py-16">
  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
    {minimum.map((testimonial, index) => (
      <div
        key={index}
        className={`break-inside-avoid p-6 border border-gray-300 rounded-lg shadow-lg ${
          index % 2 === 0 ? "bg-[#fff9eb]" : "bg-[#fff1d3]"
        }`}
      >
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <img
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover"
            alt="Profile"
            src={testimonial.profileImage}
          />
          <div>
            <div className="text-lg sm:text-xl font-bold text-[#1b1c1e]">
              {testimonial.name}
            </div>
            <div className="text-sm text-[#6b7280]">{testimonial.job}</div>
            {/* Stars */}
            <div className="flex gap-1">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <span key={idx} className="text-yellow-500 text-lg">★</span>
                ))}
            </div>
          </div>
        </div>
        {/* Review Text */}
        <p className="text-sm sm:text-base text-[#313234] leading-relaxed">
          {testimonial.feedback}
        </p>
      </div>
    ))}
  </div>
</div>
:<div className="mb-24 mt-24">
  <Loading /> 
</div> 
      }

<div className="w-full flex items-center justify-center mb-14">
  <div className="relative w-full max-w-[300px] flex items-center justify-center px-4 sm:px-0" onClick={() => expand()}>
  <ShowAll showAll={showAll}/>
  </div>
</div>


      
     
      <Footer />
    </>
   
  );
};

export default Testimonials;