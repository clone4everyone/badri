import React,{useState,useEffect} from 'react';
import Navbar from '../component/homepage/Navbar';
import background from '../assets/project.jpeg';
import {useLocation,useParams} from 'react-router-dom';
import { FaMapMarkerAlt,FaMapMarked ,FaShareAlt} from 'react-icons/fa';
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
    const handlePrev = () => {
      setCurrentIndex((prev) => (prev === 0 ? location.state.listingPhotoPaths.length - 1 : prev - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prev) => (prev === location.state.listingPhotoPaths.length - 1 ? 0 : prev + 1));
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
       {shareModel && <Share setShareModel={setShareModel} image={project.thumbnail} title={project.title} url={`http://localhost:5173/projectDetail/${project.title}/${project._id}`}/>}
            {/* Background Section */}
            <div className='w-full min-h-72 max-h-72 inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${background})` }}>
                <div className='flex flex-col justify-end gap-3 h-72 pb-8 pl-14 text-white'>
                    <h1 className='text-4xl'>Projects</h1>
                    <p className='text-xl'><span onClick={()=>navigate('/')} className='border-b-2'>Home</span> {'>'} <span className='border-b-2 hover:cursor-pointer ' onClick={()=>navigate("/projects")}>Projects</span> {`>`} <span>Project Detail</span></p>
                </div>
            </div>
        
            {project && (
  <div className="bg-white ml-3 md:ml-0  w-full md:w-[60%] rounded-lg overflow-hidden pl-6 md:pl-24 mt-10 ">
    <h1 className="mb-2 flex justify-between pr-2 text-lg md:text-xl font-semibold">
      Land Status: <span className={`${project.status==='available' ? 'text-green-500':'text-red-500'} `}>{project.status}</span>
      <div className="flex gap-3 pr-2">
        <FaShareAlt onClick={() => setShareModel(true)} className="hover:cursor-pointer" />
        <FaHeart
          onClick={()=>{
           user!==null ? handleWishlistToggle() : navigate("/login")
          }}
          className={`cursor-pointer ${
            isInWishlist ? "text-red-500" : "text-gray-400"
          }`}
        />
      </div>
    </h1>
    <img
      src={project.thumbnail}
      alt={project.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6 pl-0">
      <h3 className="text-xl md:text-2xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-2 flex items-center text-sm md:text-base font-montserrat">
        <BiBed className="mr-2 text-blue-500" /> {project.bhk}
      </p>
      <p className="text-green-600 font-bold flex items-center text-sm md:text-base font-montserrat">
        <MdOutlineAttachMoney className="mr-2" /> {project.price}
      </p>
      <p className="text-gray-500 flex items-center mt-2 text-sm md:text-base font-montserrat">
        <FaMapMarkerAlt className="mr-2 text-red-500" /> {project.location}
      </p>
      <p className="text-gray-500 mt-2 flex gap-2 items-center text-sm md:text-base font-montserrat">
        <FaMapMarked /> {project.Acre}
      </p>
      <p className="max-w-[70%] text-sm md:text-base font-montserrat">
        Description
        <p className="text-gray-700 mb-4">{project.description}</p>
      </p>
      <button onClick={()=>openContact(!contact)} className="bg-blue-400 p-2 border-none text-white rounded mt-4">
        Inquiry to buy the property
      </button>
    </div>
  </div>
)}

           
{
  contact && (
    <div className='w-full flex justify-center px-6 md:px-24 mb-5'>
      <div className="w-full mx-auto bg-indigo-50 border rounded-md shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-indigo-100 border-b">
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-indigo-500" />
            <span className="font-medium text-indigo-700 text-lg md:text-xl font-fira-sans">Contact</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center px-4 py-6 space-x-4 flex-wrap">
          {/* Image Placeholder */}
          <div className="w-16 h-16 bg-gray-300 rounded-md mb-4 md:mb-0 overflow-hidden" style={{url:`${founder}`}} >
            <img src={founder} className='h-full'/>
</div>
          {/* Text Details */}
          <div className="flex-grow">
            <p className="text-lg md:text-xl font-semibold text-gray-800 font-fira-sans">
              SRI SAI RAM
            </p>
            <p className="text-sm text-gray-600 font-montserrat">Property Seller</p>
          </div>

          {/* Contact Info */}
          <div className="flex gap-4 md:gap-7 flex-wrap justify-between">
            <div className="flex items-center space-x-1">
              <FaPhoneAlt className="text-gray-600" />
              <span className="text-gray-900 font-medium text-sm md:text-base font-montserrat">
                <strong>Phone Number:</strong> +91 999 666 1234
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEnvelope className="text-gray-600" />
              <span className="text-gray-900 font-medium text-sm md:text-base font-montserrat">
                <strong>Email:</strong> badrirocks@gmail.com
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
        project && <div>
           <div className='w-full flex justify-center'>
 <div className="relative w-[60%] ">
        <img
          src={project.listingPhotoPaths[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full rounded-lg"
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        >
          &#x276E;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        >
          &#x276F;
        </button>
      </div>
      </div>
     

      {/* Thumbnails */}
      <div className="flex justify-center mt-6 gap-2">
        {project.listingPhotoPaths.map((src, index) => (
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
