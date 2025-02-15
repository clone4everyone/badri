import React from 'react';
import service1 from "../../assets/service1.jpg"
import service2 from "../../assets/service2.jpg"
import service3 from "../../assets/service3.jpg"
import home from "../../assets/h1.webp"
import working from "../../assets/working.jpg";
const Service = () => {
  const services = [
    {
      title: "Discover Your Plot",
      description: "Find & Buy the Land available, houses for every budget",
      icon: home,
    },
    {
      title: "Make the Most of Your Land",
      description: "Land Sales Solutions Maximize Your Value with Expert Assistance",
      icon: service2,
    },
    {
      title: "Crafting Your Vision",
      description: "Construction Expertise consultancy Turning Blueprints into Reality",
      icon: working,
    },
  ];

  return (
<section className="py-8 px-5 md:pl-[65px] ">
  <div className="w-full  px-4 sm:px-6 lg:px-8 z-50 bg-white ">
    <h2 className="text-3xl pl-3 sm:text-4xl font-bold fira-sans text-start text-gray-800 mb-8">
      Our Services
    </h2>
    <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 ">
      {services.map((service, index) => (
        <div
          key={index}
          className="rounded-lg  text-center hover:scale-105 p-4 transition-transform duration-300 w-[100%]"
        >
          <div className="relativew-full aspect-square mb-4">
            <img
              src={service.icon}
              alt={`${service.title} icon`}
              className="object-cover w-full h-full  rounded-md"
            />
          </div>
          <h3 className="text-xl font-semibold font-[Montserrat] text-gray-800 mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 font-[Montserrat]">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  
  );
};

export default Service;
