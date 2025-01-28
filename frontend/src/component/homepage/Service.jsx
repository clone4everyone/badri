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
      description: "Explore the perfect piece of land tailored to your needs with ease.",
      icon: home,
    },
    {
      title: "Make the Most of Your Land",
      description: "Maximize your land's potential with strategic insights and tools.",
      icon: service2,
    },
    {
      title: "Crafting Your Vision",
      description: "Turn your ideas into reality with expert guidance and support.",
      icon: working,
    },
  ];

  return (
<section className="py-8 px-5 md:px-[65px]">
  <div className="max-w-6xl  px-4 sm:px-6 lg:px-8 z-50 bg-white">
    <h2 className="text-3xl pl-3 sm:text-4xl font-bold text-start text-gray-800 mb-8">
      Our Services
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <div
          key={index}
          className="rounded-lg text-center hover:scale-105 p-4 transition-transform duration-300"
        >
          <div className="relative w-full aspect-square mb-4">
            <img
              src={service.icon}
              alt={`${service.title} icon`}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  
  );
};

export default Service;
