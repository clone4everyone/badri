import React,{useState,useEffect} from 'react';
import Navbar from '../component/homepage/Navbar';
import background from '../assets/project.jpeg';
import {useLocation,useParams} from 'react-router-dom';
import { FaMapMarkerAlt,FaMapMarked ,FaShareAlt, FaHome, FaArrowRight} from 'react-icons/fa';
import { BiBed } from 'react-icons/bi';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaPhoneAlt, FaEnvelope, FaUserCircle,FaHeart} from "react-icons/fa";
import Footer from '../component/homepage/Footer';
import { useSelector } from 'react-redux';
import API from '../utils/API';
import { useNavigate } from 'react-router-dom';
import Share from '../component/models/Share';
import founder from '../assets/founder.png'
import toast from 'react-hot-toast';
import Loading from '../component/Loading';
const ProjectDetail = () => {
  const navigate=useNavigate();
  const {id,}=useParams();
    const location=useLocation();
    const user=useSelector((state)=>state.user.user);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("Images");
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [project,setProject]=useState(null);
    const [shareModel,setShareModel]=useState(false);
    const [listingPhoto,setListingPhot]=useState(null);
    const handlePrev = () => {
      setCurrentIndex((prev) => (prev === 0 ? listingPhoto.length - 1 : prev - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prev) => (prev === listingPhoto.length - 1 ? 0 : prev + 1));
    };
  
    const handleThumbnailClick = (index) => {
      setCurrentIndex(index);
    };

    useEffect(()=>{
      const call=async()=>{
        try{
       const data=await API.post('/projects/getProject',{
        _id:id
       })
     if(data.data.status){
      setProject(data.data.project);
      let photos = [...data.data.project.listingPhotoPaths]; 
      photos.push(data.data.project.thumbnail);
      if(data.data.project.floorImage.length!==0){
        photos.push(data.data.project.floorImage);
      }
      
      console.log(photos)
      setListingPhot(photos);
     }
     else{
      console.log(data.data.message);
     }
     }catch(err){
      console.log(err.message);
     } 
      }
      if(location){
        call();
      }
      
    
    },[]);
    useEffect(() => {
      const fetchWishlistStatus = async () => {
        try {
          const response = await API.get(`/wishlist/getWishlist`, {
            params: { userId:user._id,
              listingId: id },
          });
          setIsInWishlist(response.data.isInWishlist);
        } catch (error) {
          console.error("Failed to fetch wishlist status", error);
        }
      };
  
      fetchWishlistStatus();
    }, [id]);
    const handleWishlistToggle = async () => {
      try {
        const response = await API.post(`/wishlist/postWishlist`, {
          userId:user._id,
          listingId: id,
        });
       navigate('/projects')
        if (response.data.success) {
          setIsInWishlist(!isInWishlist);
          toast.success('Updated the wishlist wishlist');
        }
      } catch (error) {
        console.error("Failed to update wishlist", error);
      }
    };
    const [contact, openContact] = useState(false);

    
  return (
    <>
       <Navbar />
       {shareModel && <Share setShareModel={setShareModel} image={project.thumbnail} title={project.title} url={`badri.bharathmegaminds.com/projectDetail/${project.title}/${project._id}`}/>}
            {/* Background Section */}
            <div className='w-full min-h-72 max-h-72 inset-0  bg-center' style={{ backgroundImage: `url(${background})` }}>
                <div className='flex flex-col justify-end gap-3 h-72 pb-8 pl-14 text-white'>
                    <h1 className='text-4xl fira-sans'>Projects</h1>
                    <p className='text-xl font-[Montserrat]'><span onClick={()=>navigate('/')} className='border-b-2 cursor-pointer'>Home</span> {'>'} <span className='border-b-2 hover:cursor-pointer ' onClick={()=>navigate("/projects")}>Projects</span> {`>`} <span>Project Detail</span></p>
                </div>
            </div>
        
            {project ? (
  <div className="bg-white w-full md:w-[95%] mx-auto rounded-lg overflow-hidden  p-5 md:p-8 mt-10">
  {/* Header Section */}
  <div className="mb-4 flex justify-between items-center ">

    <h1 className="text-lg md:text-xl font-[Montserrat]">
      Land Status:{" "}
      <span
        className={`${
          project.status === "available" ? "text-green-500" : "text-red-500"
        }`}
      >
        {project.status}
      </span>
    </h1>
    <div className="flex gap-4 items-center">
      <FaShareAlt
        onClick={() => setShareModel(true)}
        className="hover:cursor-pointer text-gray-600 hover:text-blue-500 transition-colors duration-200"
      />
      {/* <FaHeart
        onClick={() => {
          user !== null ? handleWishlistToggle() : navigate("/login");
        }}
        className={`cursor-pointer text-xl ${
          isInWishlist ? "text-red-500" : "text-gray-400"
        } hover:scale-110 transition-transform duration-200`}
      /> */}
    </div>
  </div>

  {/* Main Content Section */}
  <div className="flex flex-col md:flex-row gap-6">
    {/* Left Section */}
    <div className="w-full md:w-[50%] " >
      <div className="w-full h-60 md:h-80 inset-0   rounded-lg shadow-md bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${project.thumbnail})` }}>

      </div>
      {/* <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-60 md:h-80 inset-0 object-center rounded-lg shadow-md"
      /> */}
      <div className="mt-4  text-start ">
        <h3 className="  mb-3 flex gap-2 text-2xl font-semibold items-center ">
          <FaHome/>{project.title}
        </h3>
        <p className=" flex gap-2 items-center mt-2  font-thin ">
          <FaMapMarkerAlt className="text-xl" />  <a
  href={project.locationLink}
  target="_blank"
  rel="noopener noreferrer"
  className="text-black flex gap-1"
>
 Location : <p className="underline hover:underline">{project.locationTitle}</p>
</a>
        </p>
        {/* <p className=" flex gap-2 items-center mt-2  font-thin ">
          <FaMapMarkerAlt className="text-xl" />   {project.location.includes("http") ? (
    <a
      href={project.location}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {
       project.location.length >50 ?  `${project.location.substring(0,51)}...`:project.location
      }
      
    </a>
  ) : (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {project.location}
    </a>
  )}
        </p> */}
        <p className='mt-2 flex gap-2 items-center font-thin'>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" className="mt-2 relative -left-[1px]">
<g id="gis:location-man" clip-path="url(#clip0_2521_12329)">
<path id="Vector" d="M12.45 5.89795C10.4915 5.8982 8.55103 6.73995 8.75503 8.42195L9.25503 12.0779C9.34278 12.7212 9.77753 13.7499 10.4268 13.7499H10.473L11.0048 19.8827C11.0278 20.1587 11.2278 20.3827 11.5048 20.3827H13.5048C13.7818 20.3827 13.9818 20.1587 14.0048 19.8827L14.5365 13.7499H14.583C15.2323 13.7499 15.6668 12.7212 15.7548 12.0782L16.2548 8.4217C16.3858 6.73845 14.4088 5.89745 12.45 5.89795Z" fill="black"/>
<path id="Vector_2" d="M12.5061 12.7271L12.4941 12.7586C12.4981 12.7491 12.5009 12.7393 12.5049 12.7298L12.5061 12.7271Z" fill="black"/>
<path id="Vector_3" d="M12.5 5.25C13.9497 5.25 15.125 4.07475 15.125 2.625C15.125 1.17525 13.9497 0 12.5 0C11.0503 0 9.875 1.17525 9.875 2.625C9.875 4.07475 11.0503 5.25 12.5 5.25Z" fill="black"/>
<path id="Vector_4" d="M15.2305 17.2729C15.2093 17.5159 15.1867 17.7584 15.1655 18.0014C17.4035 18.3174 19.0625 19.0344 19.25 19.9214C19.5292 21.2404 15.2145 21.8339 12.435 21.8062C9.6555 21.7784 5.42025 21.2404 5.7905 19.9212C6.0335 19.0554 7.6685 18.3527 9.848 18.0254C9.82625 17.7817 9.8015 17.5379 9.7805 17.2944C6.979 17.6034 4.645 18.3642 3.7125 19.3559H0.55725L0 20.5117H3.2915C3.54725 21.8717 6.39825 23.0457 10.475 23.3422L10.3355 24.9999H14.3705L14.33 23.3424C18.4275 23.0457 21.3592 21.8717 21.7085 20.5117H25L24.5225 19.3559H21.3673C20.4815 18.3392 18.1052 17.5659 15.2305 17.2729Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_2521_12329">
<rect width="25" height="25" fill="white"/>
</clipPath>
</defs>
</svg>
Starting Plot: {'  '}
{
  project.plot
}</p>
          {
//       project.unit === "sqft" && <p className='mt-2 flex gap-2 items-center font-thin'>
//         <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" className="mt-2 relative -left-[1px]">
// <g id="gis:location-man" clip-path="url(#clip0_2521_12329)">
// <path id="Vector" d="M12.45 5.89795C10.4915 5.8982 8.55103 6.73995 8.75503 8.42195L9.25503 12.0779C9.34278 12.7212 9.77753 13.7499 10.4268 13.7499H10.473L11.0048 19.8827C11.0278 20.1587 11.2278 20.3827 11.5048 20.3827H13.5048C13.7818 20.3827 13.9818 20.1587 14.0048 19.8827L14.5365 13.7499H14.583C15.2323 13.7499 15.6668 12.7212 15.7548 12.0782L16.2548 8.4217C16.3858 6.73845 14.4088 5.89745 12.45 5.89795Z" fill="black"/>
// <path id="Vector_2" d="M12.5061 12.7271L12.4941 12.7586C12.4981 12.7491 12.5009 12.7393 12.5049 12.7298L12.5061 12.7271Z" fill="black"/>
// <path id="Vector_3" d="M12.5 5.25C13.9497 5.25 15.125 4.07475 15.125 2.625C15.125 1.17525 13.9497 0 12.5 0C11.0503 0 9.875 1.17525 9.875 2.625C9.875 4.07475 11.0503 5.25 12.5 5.25Z" fill="black"/>
// <path id="Vector_4" d="M15.2305 17.2729C15.2093 17.5159 15.1867 17.7584 15.1655 18.0014C17.4035 18.3174 19.0625 19.0344 19.25 19.9214C19.5292 21.2404 15.2145 21.8339 12.435 21.8062C9.6555 21.7784 5.42025 21.2404 5.7905 19.9212C6.0335 19.0554 7.6685 18.3527 9.848 18.0254C9.82625 17.7817 9.8015 17.5379 9.7805 17.2944C6.979 17.6034 4.645 18.3642 3.7125 19.3559H0.55725L0 20.5117H3.2915C3.54725 21.8717 6.39825 23.0457 10.475 23.3422L10.3355 24.9999H14.3705L14.33 23.3424C18.4275 23.0457 21.3592 21.8717 21.7085 20.5117H25L24.5225 19.3559H21.3673C20.4815 18.3392 18.1052 17.5659 15.2305 17.2729Z" fill="black"/>
// </g>
// <defs>
// <clipPath id="clip0_2521_12329">
// <rect width="25" height="25" fill="white"/>
// </clipPath>
// </defs>
// </svg>
// {
//   project.plot
// }</p>
          }
        
        <p className=" mt-2 flex gap-2 items-center font-thin  pl-[0.5px] ">
          <FaMapMarked className='text-xl' />
          Project Size :{'  '} 
          {project.unit === "sqft"
            ? `${project.sqft} Sq.ft (W: ${project.width}, L: ${project.length})`
            :project.unit === "Acre"? `${project.Acre} Acre`:`${project.Cents} Cents`
          }
        </p>
        {
          project.category === "house" && <p className="mt-2 mb-2 flex gap-2 items-center font-thin relative -left-[0.9px]">
          <BiBed className="text-2xl " /> {project.bhk} BHK
        </p>
        }
        
        <p className="  flex gap-3 items-center pl-1">
        <p className='text-2xl '>₹</p> {Number(project.price).toLocaleString()}
        </p>
        
        <button className='mont mt-5 border-2 flex items-center rounded-md border-blue-500 px-5 py-3 font-semibold text-blue-600 '  onClick={() => {
    const gallerySection = document.getElementById('gallery');
    gallerySection.scrollIntoView({ behavior: 'smooth' });
  }}
>
          View Site Gallery <FaArrowRight className='ml-3'/>
        </button>
        <div className="max-w-[90%] mt-4">
          <h4 className="text-gray-800 font-medium mb-2">Description</h4>
          <p className="text-gray-700 text-sm md:text-base font-[Montserrat]">
            {project.description}
          </p>
        </div>
        <button
          onClick={() => openContact(!contact)}
          className="bg-[#2B2BD9] text-white px-5 py-2  mt-6 hover:bg-blue-600 transition-colors duration-200 w-[466px]"
        >
          Enquiry to Buy Property
        </button>
      </div>
    </div>

    {/* Right Section */}
    
    <div className="w-full md:w-[50%] flex justify-center items-top">
      {
        project.floorImage.length !== 0 &&    <img
      src={project.floorImage}
      alt="Floor Plan"
      className="w-full max-h-[400px] object-contain rounded-lg"
    />
      }
 
  </div>
  </div>
</div>

):(
  <div className="min-h-[50vh] flex items-center justify-center">
  <Loading className=""/>
  </div>

)}

           
{
  contact && (
    <div className='w-full flex justify-center px-16  mb-5 '>
      <div className="w-full mx-auto bg-[#E9E9FB] border-2 border-gray-400">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2   border-b-2 border-gray-400">
          <div className="flex items-center space-x-2">
            <FaUserCircle className=" text-lg md:text-2xl" />
            <span className="font-medium  text-lg md:text-2xl font-[finaSans]">Contact</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center px-14 py-14 space-x-4 flex-wrap ">
          {/* Image Placeholder */}
          <div className="w-24 h-24 bg-gray-300  mb-4 md:mb-0 overflow-hidden" style={{url:`${founder}`}} >
            <img src={founder} className='h-full'/>
</div>
          {/* Text Details */}
          <div className="flex-grow">
            <p className="text-lg md:text-xl font-semibold text-gray-800 font-[finaSans]">
            K SURESH BABU
            </p>
            <p className="text-sm text-gray-600 font-[Montserrat]">Property Seller</p>
          </div>

          {/* Contact Info */}
          <div className="flex gap-4 md:gap-20 flex-wrap justify-between">
            <div className="flex-col items-center space-x-1">
            <strong className='text-[#2B2BD9]'>Phone Number:</strong>
              
              <span className="text-gray-900 flex items-center gap-2 font-medium text-sm md:text-base font-[Montserrat]">
              <FaPhoneAlt className="text-gray-600" /> +91 999 666 1234
              </span>
            </div>
            <div className="flex-col items-center space-x-1">
            <strong className='text-[#2B2BD9]'>Email:</strong>
             
              <span className="text-gray-900 font-medium flex items-center gap-2 text-sm md:text-base font-[Montserrat]">
              <FaEnvelope className="text-gray-600" /> badrirocks@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




                     <div className="w-full max-w-5xl mx-auto p-6">
      {/* Tabs */}
      {/* <div className="flex justify-center mb-4">
        {["Images", "Layouts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-lg font-medium border rounded-lg ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } mx-2`}
          >
            {tab}
          </button>
        ))}
      </div> */}

      {/* Main Image Slider */}
      {
        project && <div id='gallery'>
          <div className="w-full flex justify-center">
  <div className="relative w-[60%] overflow-visible">
    <img
      src={listingPhoto[currentIndex]}
      alt={`Image ${currentIndex + 1}`}
      className="w-full rounded-lg object-center"
    />
    {/* Left Button */}
    <button
      onClick={handlePrev}
      className="absolute top-1/2 -left-9 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
    >
      &#x276E;
    </button>
    {/* Right Button */}
    <button
      onClick={handleNext}
      className="absolute top-1/2 -right-9 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
    >
      &#x276F;
    </button>
  </div>
</div>

     

      {/* Thumbnails */}
      <div className="flex justify-center mt-6 gap-2">
        {listingPhoto.map((src, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className={`h-20 w-28 object-cover rounded-lg border-2 ${
                index === currentIndex
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
            />
            {index === project.listingPhotoPaths.length - 1 && project.listingPhotoPaths.length > 6 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold rounded-lg">
                +{project.listingPhotoPaths.length - 6}
              </div>
            )}
          </div>
        ))}
      </div>
        </div>
      }
     
    </div>
                            <Footer/>
    </>
  );
}

export default ProjectDetail;
