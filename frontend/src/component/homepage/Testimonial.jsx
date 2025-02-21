import React, { useState } from "react";
import man1 from '../../assets/man1.jpg'
import man2 from '../../assets/man2.jpg'
import man3 from '../../assets/man3.jpg'
import man4 from '../../assets/man4.jpg'
import man5 from '../../assets/man5.jpg'
import Review from "../models/Review";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GiveReviewButton from "../button/GiveReviewButton"
const testimonials=[
    {
      id: 1,
      name: "Karan rawat",
      profession: "Software Engineer",
      feedback: "This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
      rating: 5,
      image: man1, // Replace with actual image URL
    },
    {
      id: 2,
      name: "Mahesh",
      profession: "Doctor",
      feedback: "Great experience and support from the team.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
      rating: 4,
      image: man2, // Replace with actual image URL
    },
    {
      id: 3,
      name: "Vamshi",
      profession: "Store Manager",
      feedback: "Satisfied with the results. Will use again!This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
      rating: 5,
      image: man3, // Replace with actual image URL
    },
    {
      id: 4,
      name: "vaibhav Negi",
      profession: "Businessman",
      feedback: "Exceptional quality and fast delivery.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
      rating: 5,
      image: man4, // Replace with actual image URL
    },
    {
      id: 5,
      name: "Ajay singh bartwal",
      profession: "Freelancer",
      feedback: "Affordable and reliable service. Highly impressed.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.This service is amazing! Highly recommend it.",
      rating: 4,
      image: man5, // Replace with actual image URL
    },
  ];

const Testimonial = () => {
  const navigate=useNavigate();
  const user=useSelector((state)=>state.user.user);
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the second card as the center one
  const [reviewModel,setReviewModel]=useState(false);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleTestimonials = () => {
    const prevIndex =
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    const nextIndex =
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;

    return [
      testimonials[prevIndex],
      testimonials[currentIndex],
      testimonials[nextIndex],
    ];
  };

  return (
    <div className="relative w-full bg-[#E9E9FB] py-12 px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-36 ">
    {/* Top Section */}
    {reviewModel && <Review setReviewModel={setReviewModel} />}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
      <div className="text-left mb-6 sm:mb-0">
        <h2 className="text-2xl sm:text-4xl lg:text-4xl text-gray-900 fira-sans leading-snug">
        Testimonials
        </h2>
        <p className="text-base sm:text-lg text-gray-600 font-[Montserrat] mt-2 ">
        This is What Our Clients Say about us
        </p>
      </div>
       
      <div
        className="text-center sm:ml-4 cursor-pointer mt-3 md:mt-0 "
        // onClick={() => (user !== null ? setReviewModel(true) : navigate("/login"))}
        onClick={()=>navigate("/Testimonials")}
      >
        <GiveReviewButton/>
        {/* <div className=" ">
       
          <div className="relative text-black py-2 px-6 text-base sm:text-lg font-[Montserrat] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#E6AE35] after:transition-transform after:duration-300 after:scale-x-100 group-hover:after:scale-x-0 whitespace-nowrap">
            Give Review
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-[#E6AE35] text-black py-2 px-6 text-base sm:text-lg font-[Montserrat] opacity-0 transition-opacity duration-1000 group-hover:opacity-100 whitespace-nowrap">
            Give Review
          </div>
        </div> */}
      </div>
    </div>
  
    {/* Arrows */}
    <button
      onClick={handlePrev}
      className="absolute left-3 top-1/2 transform -translate-y-1/2 p-3 rounded-full z-20 transition duration-300 bg-white shadow-lg hover:shadow-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <button
      onClick={handleNext}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-full z-20 transition duration-300 bg-white shadow-lg hover:shadow-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  
    {/* Testimonial Cards */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-9 overflow-hidden">
      {getVisibleTestimonials().map((testimonial, index) => {
        const isCenterCard = index === 1;
  
        return (
          <div
            key={testimonial.id}
            className={`transition-all duration-500 transform bg-white p-6   ${
              isCenterCard
                ? "scale-105 shadow-xl z-10 w-11/12 sm:w-4/5 lg:max-w-[36%]  rounded-lg "
                : "scale-90 opacity-75 flex flex-col items-center w-full sm:w-2/5 lg:w-1/4"
            }`}
          >
            {isCenterCard ? (
              <div className="flex rounded-lg flex-col  justify-center">
                <div className="flex flex-col sm:flex-row s sm:space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 sm:w-32 sm:h-28 object-center  mb-4 sm:mb-0"
                  />
                  <div className="flex flex-col text-left">
                    <p className="text-base sm:text-lg  text-gray-900 font-[Montserrat]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm  text-gray-500 font-[Montserrat]">
                      {testimonial.profession}
                    </p>
                    <div className="flex space-x-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-gray-300">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mt-4 italic  text-center font-[Montserrat] ">
                  {testimonial.feedback}
                </p>
              </div>
            ) : (
              <>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-16 sm:w-48 sm:h-48  object-center mb-4 "
                />
                <div className="flex space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-base sm:text-lg text-gray-900 font-[Montserrat]">
                  {testimonial.name}
                </p>
                <p className="text-sm  text-gray-500 font-[Montserrat]">
                  {testimonial.profession}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  </div>
  
  
  
  );
};

export default Testimonial;
