import React,{useState,useEffect} from 'react';
import { FaMapMarkerAlt,FaHome,FaMap,FaShareAlt ,FaHeart} from 'react-icons/fa';
import { BiBed } from 'react-icons/bi';
import {useSelector} from 'react-redux';
import API from '../../utils/API';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Share from '../models/Share';
const ProjectCard = ({ product }) => {
const [isInWishlist, setIsInWishlist] = useState(false);
const navigate=useNavigate();
const [shareModel,setShareModel]=useState(false);
const user=useSelector((state)=>state.user.user);
useEffect(()=>{
    try{
 const fetchWishlistStatus = async () => {
        try {
          const response = await API.get(`/wishlist/getWishlist`, {
            params: { userId:user._id,
              listingId: product._id, },
          });
          setIsInWishlist(response.data.isInWishlist);
        } catch (error) {
          console.error("Failed to fetch wishlist status", error);
        }
      };
  
      fetchWishlistStatus();
    }catch(err){
        console.log(err.message)
    }
   
},[]);

const incrementProjectView=async(id)=>{
    await  API.post("/projects/incrementProjectView",{
        userId:user._id,
        projectId:id
      })
  }
const handleWishlistToggle = async () => {
    try {
      const response = await API.post(`/wishlist/postWishlist`, {
        userId:user._id,
        listingId: product._id,
      });
    //  navigate('/projects')
      if (response.data.success) {
        setIsInWishlist(!isInWishlist);
        toast.success('wishlish updated');
      }
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };
    return (
      <div 
      className="border rounded-lg shadow-lg p-4 flex flex-col md:flex-row bg-white relative hover:cursor-pointer gap-2" 
     
    >
      {
        shareModel && <Share image={product.thumbnail} title={product.title} url={`badri.bharathmegaminds.com/projectDetail/${encodeURIComponent(product.title)}/${product._id}`} setShareModel={setShareModel}/>
      }
      {/* Thumbnail */}
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        className="w-full md:max-w-[30%] md:min-w-[30%] h-52 object-cover rounded-md mb-4 mt-3 md:mt-0" 
      />
    
      {/* Content */}
      <div className="flex flex-col gap-2"  onClick={() => {
        // if (user !== null) {
        //   incrementProjectView(product._id);
        //   navigate(`/projectDetail/${product.title}/${product._id}`, { state: product });
        // } else {
        //   navigate("/login");
        // }
        navigate(`/projectDetail/${product.title}/${product._id}`, { state: product });
      }}>
        <h2 className="text-xl font-bold flex items-center gap-2 font-[firaSans]">
          <FaHome /> {product.title}
        </h2>
        <p className="flex items-center gap-2 font-[Montserrat]">
          <FaMapMarkerAlt /> {product.location}
        </p>
        <p className="flex items-center gap-2 font-[Montserrat]">
          <FaMap /> {product.unit === "sqft"
            ? `${product.sqft} Sq.ft (W: ${product.width}, L: ${product.length})`
            : `${product.Acre} Acre`}
        </p>
        <p className="flex items-center gap-2 font-[Montserrat]">
          <BiBed className="font-semibold" /> {product.bhk}BHK{product.balcony? '- Balcony':null}{product.terrace? '- Terrace':null}
        </p>
        <p className="font-[Montserrat]">₹ {Number(product.price).toLocaleString()}</p>
        <p className="font-[Montserrat]">{product.description}</p>
        <p className={`text-sm font-semibold font-[Montserrat] ${product.status === 'sold-out' ? 'text-red-500' : 'text-green-500'}`}>
          {product.status === 'sold-out' ? 'Sold Out' : 'Available'}
        </p>
      </div>
    
      {/* Share Icon */}
      <FaShareAlt 
        className="absolute top-2 right-2 text-xl cursor-pointer text-gray-600 hover:text-black" 
        onClick={() => setShareModel(true)} 
      />
    
      {/* Wishlist Icon */}
      {/* <FaHeart
        onClick={handleWishlistToggle}
        className={`cursor-pointer absolute top-2 right-10 text-xl ${
          isInWishlist ? "text-red-500" : "text-gray-400"
        }`}
      /> */}
    </div>
    

    
    );
};

export default ProjectCard;
