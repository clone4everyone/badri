import React from 'react';
import Navbar from '../component/homepage/Navbar';
import background from '../assets/project.jpeg';
import founder from '../assets/founder.png';
import about from '../assets/about.jpeg';
import cloud from '../assets/cloud.png'
import ProjectSlider from '../component/slider/ProjectSlider';
import build from "../assets/build.jpeg";
import comitment from "../assets/comitment.jpg"
import vision from "../assets/vision.jpeg"
import Why from '../component/Why';
import Footer from '../component/homepage/Footer';
import { useNavigate } from 'react-router-dom';
import estate from '../assets/estate.jpg'
import { Link } from 'react-router-dom';
const AboutUs = () => {
  const navigate=useNavigate()
let i=21;
const zero=()=>{
while(i>0){
    if(i%2===0){
        i=i/2
    }else{
        i=i-1;
    }
}
console.log(i);
}
zero();
  return (
    <>
         <Navbar />
            {/* Background Section */}
            <div className='w-full min-h-72 max-h-72 inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${background})` }}>
  <div className='flex flex-col justify-end gap-3 h-72 pb-8 pl-14 text-white'>
    <h1 className='text-[60px] font-bold leading-tight'>About Us</h1>
    <p className='text-lg md:text-xl hover:cursor-pointer'>
      <Link to="/">Home</Link> {`>`} <span>About Us</span>
    </p>
  </div>
</div>

<div className="p-8 md:p-12 min-h-72 pt-10 relative">
  <h1 className="text-[40px] md:text-[60px] font-bold text-gray-800 mb-2 uppercase tracking-wide font-[Fira_Sans] text-center md:text-left">
    K SURESH BABU
  </h1>
  <p className="text-sm md:text-base font-[Montserrat] text-center md:text-left">Founder</p>
  <div className="flex flex-col md:flex-row items-center rounded-lg overflow-hidden p-6 md:p-8 space-y-6 md:space-y-0 md:space-x-10">
    <div className="flex flex-col justify-center space-y-6 w-full md:w-2/3">
      <p className="text-gray-600 leading-relaxed text-sm md:text-base lg:text-lg font-[Montserrat]">
        Our esteemed founder, K. Suresh Babu Garu, was a visionary leader whose
        passion for service and dedication to excellence left an indelible mark
        on the Sri Sai Ram Group and Sasvat Charitable Trust. With a rich legacy
        of compassionate leadership, he spearheaded initiatives that transformed
        countless lives and uplifted communities.
      </p>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base lg:text-lg font-[Montserrat]">
        Driven by his unwavering commitment to philanthropy and social
        responsibility, Mr. Suresh Babu Garu played a pivotal role in shaping
        the Sri Sai Ram Group's success in the real estate and construction
        industry. His visionary leadership and forward-thinking approach laid
        the foundation for the organization's growth and expansion over 3
        decades.
      </p>
    </div>
    <img
      src={founder}
      alt="Founder Image"
      className="w-full md:w-1/3 h-auto rounded-lg object-cover shadow-md"
    />
  </div>
</div>

<div className="p-8 md:p-12 min-h-72 pt-10 relative bg-[#F0F1F2]">
  <div className="flex flex-col md:flex-row items-center rounded-lg overflow-hidden p-6 md:p-8 space-y-6 md:space-y-0 md:space-x-10">
    <div className="flex flex-col justify-center space-y-6 w-full md:w-2/3">
      <div className="flex-col">
        <h1 className="font-bold text-[32px] md:text-[48px] lg:text-[60px] font-[Fira_Sans] leading-snug text-gray-800">
          About <br /> SRI SAI RAM ESTATE <br /> & CONSTRUCTION
        </h1>
        <div className="text-sm md:text-base lg:text-lg font-[Montserrat] text-gray-600 leading-relaxed mt-4">
          Welcome to Sri Sai Ram Real Estate, where we have been serving the
          real estate needs of our valued customers since 1980. Our journey
          began as a land selling company, and over the years, we have grown and
          evolved to become a trusted name in the real estate industry.
        </div>
      </div>
    </div>
    <img
      src={about}
      alt="About Image"
      className="w-full md:w-1/3 h-auto rounded-lg object-cover shadow-md"
    />
  </div>
</div>

<div className="w-full relative z-0 md:z-10 -top-72 md:-top-70 flex justify-center ">
  <img
    src={cloud}
    className="w-[90%] md:w-[85%]  items-center -z-20"
  />
</div>



<div className="p-12 min-h-72 pt-10 bg-[#FFF9EB] relative -top-[62vh] mb-[-62vh]">
  <div className="flex flex-col md:flex-row items-center rounded-lg overflow-hidden p-8 space-y-8 md:space-y-0 md:space-x-10">
    <div className="flex flex-col justify-center space-y-8 w-full md:w-2/3">
      <div className="flex flex-col">
        <h1 className="text-4xl md:text-[60px] font-bold font-[Fira_Sans] leading-snug text-gray-800">
          Our History
        </h1>
        <div className="mt-4 text-sm md:text-lg font-[Montserrat] text-gray-600 leading-relaxed">
          Founded in 1980, our story is one of growth and adaptation. We started
          our journey with a singular focus: to provide our customers with the
          perfect piece of land to build their dreams upon. Our dedication and
          commitment to this vision allowed us to thrive in the competitive real
          estate market.
        </div>
      </div>
    </div>
    <img
      src={estate}
      alt="Estate Image"
      className="w-full md:w-1/3 h-auto rounded-lg object-cover shadow-md"
    />
  </div>
</div>

<ProjectSlider />

<div
  className="w-full min-h-64 max-h-80 inset-0 bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${build})`,
  }}
>
  <div className="text-center w-full text-black px-6 py-12 md:py-36 rounded-lg flex flex-col justify-center">
    <h1 className="text-3xl md:text-[60px] font-bold mb-6 text-shadow font-[Fira_Sans]">
      Expanding Horizons
    </h1>
    <p className="text-base md:text-lg px-6 md:px-20 font-[Montserrat]">
      As the real estate landscape continued to change, so did we. Recognizing
      the evolving needs of our clients, we took the bold step of expanding our
      services. In response to increasing demand, we began to construct homes
      that not only met industry standards but also exceeded the expectations of
      our discerning customers. This expansion allowed us to offer a
      comprehensive range of services, from land acquisition to the construction
      of your dream home.
    </p>
  </div>
</div>

<div className="flex flex-col md:flex-row w-full">
  {/* Left Section: Full-side Image */}
  <div className="w-full md:w-1/2 h-64 md:h-full">
    <img
      src={comitment}
      alt="Real Estate"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right Section: Content */}
  <div className="w-full md:w-1/2 flex items-center justify-center bg-[#E9E9FB]">
    <div className="text-center px-6 py-8 md:px-16 md:py-12">
      <h2 className="text-3xl md:text-[60px] font-bold text-gray-800 mb-6 font-[Fira_Sans]">
        Our Commitment
      </h2>
      <p className="text-base md:text-lg text-gray-600 leading-relaxed font-[Montserrat]">
        At Sri Sai Ram Real Estate, our commitment to excellence remains unwavering. 
        We are driven by a passion for quality, a dedication to customer satisfaction, 
        and a profound understanding of the real estate market. Our team of experienced 
        professionals is here to guide you through every step of your real estate journey, 
        ensuring that your dreams become a reality.
      </p>
    </div>
  </div>
</div>

<div
  className="w-full inset-0 bg-cover bg-center flex items-center justify-center"
  style={{ backgroundImage: `url(${vision})` }}
>
  <div className="text-center w-full text-black px-6 py-12 md:py-36 rounded-lg flex flex-col justify-start">
    <h1 className="text-4xl md:text-[60px] font-bold mb-6 text-shadow font-[Fira_Sans]">
      Our Vision
    </h1>
    <p className="text-base md:text-lg px-4 md:px-24 lg:px-48 font-[Montserrat]">
      Our vision is to be the premier destination for all your real estate needs. 
      Whether you're looking for the perfect plot of land or the keys to your dream home, 
      we are here to make your aspirations come true.
    </p>
  </div>
</div>



<Why/>

<Footer/>
    </>
  );
}

export default AboutUs;
