import React from "react";
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";
import s4 from "../assets/s4.jpg";
import overlay from "../assets/bage.png"
const Why = () => {
  const services = [
    {
      title: "Experience",
      imageHeight: "h-96",
      description:
        "Our vision is to be the premier destination for all your real estate needs. Whether you're looking for the perfect plot of land or the keys to your dream home, we are here to make your aspirations come true.",
      image: s1
    },
    {
      title: "Quality",
      imageHeight: "h-56",
      description:
        "Our commitment to quality is evident in every property we offer, from pristine land parcels to meticulously constructed homes.",
      image: s2
    },
    {
      title: "Trust",
      imageHeight: "h-96",
      description:
        "We have earned the trust of countless clients, making us a name you can rely on in the world of real estate.",
      image: s3
    },
    {
      title: "Customer-Centric",
      imageHeight: "h-56",
      description:
        "Your satisfaction is our priority. We work closely with you to understand your needs and provide tailored solutions.",
      image: s4
    },
  ];
{/* <div className="bg-[#fff9eb] hidden lg:flex md:flex-row justify-center w-full absolute top-0 left-0 z-0">
        <div className="bg-[#fff9eb] w-full border border-red-500 overflow-hidden  h-[930px]  max-h-[930px]">
          <div className="relative h-[549px] mt-[501px]">
            <div className="relative w-full h-[549px]">
           
              <img
                className="absolute w-full h-[485px]  left-0 object-cover"
                alt="Background Image"
                src={overlay}
              />
              
             
              <div 
                className="absolute w-full h-[506px] top-0 left-0"
                style={{
                  background: "linear-gradient(180deg, rgb(255,249,235) 0%, rgba(255,249,235,0) 100%)"
                }}
              />
            </div>
          </div>
        </div>
      </div> */}
  return (
    <div className="relative bg-[#FFF9EB]">
     
      
      
      {/* Why component content */}
      <div className="relative  bg-transparent p-6 md:pl-8 bg-[#FFF9EB] ">
        <h2 className="text-2xl md:text-4xl mt-8 text-start mb-6 md:mb-8 fira-sans">
          Why Choose Sri Sai Ram Real Estate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden transition-shadow duration-300"
            >
              <div
                className={`bg-gray-300 mb-3 bg-cover bg-center ${service.imageHeight}`}
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>
              <div className="pl-0 border-l-2 border-dotted border-[#FFC13B]">
                <h3 className="text-lg md:text-xl mb-2 border-l-8 pl-2 relative -left-1 z-10 border-[#FFC13B] fira-sans">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base pl-1 mont">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img src={overlay} className="w-full"/>
    </div>
  );
};

export default Why;