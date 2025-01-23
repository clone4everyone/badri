import React from "react";
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";
import s4 from "../assets/s4.jpg";
const Why = () => {
  const services = [
    {
      title: "Experience",
      imageHeight: "h-80",
      description:
        "Our vision is to be the premier destination for all your real estate needs. Whether you're looking for the perfect plot of land or the keys to your dream home, we are here to make your aspirations come true.",
        image:s1
    },
    {
      title: "Quality",
      imageHeight: "h-40",
      description:
        "Our commitment to quality is evident in every property we offer, from pristine land parcels to meticulously constructed homes.",
        image:s2
    },
    {
      title: "Trust",
      imageHeight: "h-80",
      description:
        "We have earned the trust of countless clients, making us a name you can rely on in the world of real estate.",
        image:s3
    },
    {
      title: "Customer-Centric",
      imageHeight: "h-40",
      description:
        "Your satisfaction is our priority. We work closely with you to understand your needs and provide tailored solutions.",
        image:s4
    },
  ];

  return (
    <div className="bg-[#FFF9EB] p-6 md:p-8">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 font-[Fira_Sans]">
      Why Choose Shri Sai Ram Real Estate
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
            <h3 className="text-lg md:text-xl font-semibold mb-2 border-l-8 pl-2 relative -left-1 z-10 border-[#FFC13B] font-[Fira_Sans]">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base pl-1 font-[Montserrat]">
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Why;
