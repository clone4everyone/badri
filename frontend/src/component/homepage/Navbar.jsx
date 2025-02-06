import React, { useState } from 'react';
import { FaUser, FaSearch, FaBars } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom'
import Search from '../models/Search';
import Wishlist from '../models/Wishlist';
import Setting from '../models/Setting';
import Logo from '../Logo';
import { setLogOut } from "../../redux/UserSlice";
const Navbar = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchVisible,setSearchVisible]=useState(false);
  const [setting,setSettingModel]=useState(false)
  const [model,setModel]=useState(false);
  const [wishModel,setWishModel]=useState(false);
  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Clear any existing timeout
    setIsDropdownOpen(true);
    setMobileMenuOpen(false);
  };
 const [mobileMenuOpen,setMobileMenuOpen]=useState(false)
  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // Delay before closing
    setTimeoutId(id); // Store timeout ID for clearing
  };

const handleSearch=(e)=>{
  e.preventDefault();
  if(search.length!==0) navigate(`/properties/search/${search}`);
  
}

const logout=()=>{
  dispatch(setLogOut())
                  navigate("/login")
}
  return (
 
    <div className="flex justify-between items-center p-4 border bg-white relative z-30 md:pl-20">
    {/* Left Section */}
    <div className="flex items-center space-x-4">
      {model && <Search setModel={setModel} />}
      {wishModel && <Wishlist setWishModel={setWishModel} />}
      {setting && <Setting setSettingModel={setSettingModel} />}
  
      <Link to="/">
        <Logo />
      </Link>
    </div>

 <div className='gap-10 flex items-center'>
   <div className="hidden md:flex items-center space-x-6 ">
      <Link className="hover:cursor-pointer hover:border-b-2" to="/">Home</Link>
      <Link to="/about" className="hover:cursor-pointer hover:border-b-2">About Us</Link>
      <Link to="/service" className="hover:cursor-pointer hover:border-b-2">Services</Link>
      <Link to="/projects" className="hover:cursor-pointer hover:border-b-2">Projects</Link>
      <Link to="/#contact" className="hover:cursor-pointer hover:border-b-2">Contact Us</Link>
    </div>
  
    {/* Right Section */}
    <div className="flex items-center space-x-4">
      {/* Search */}
      <div className="relative ">
        <FaSearch className="cursor-pointer" onClick={() => setModel(true)} />
        {searchVisible && (
          <form onSubmit={(e) => handleSearch(e)} className="absolute top-full right-0 w-80 bg-white shadow-lg rounded-lg p-2">
            <input
              className="w-full px-4 py-2 text-gray-700 focus:outline-none border rounded"
              type="text"
              placeholder="Search Anything"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-red-600 text-white rounded">Search</button>
          </form>
        )}
      </div>
  
      {/* Profile Dropdown */}
      <div className="relative">
        <div
          className="w-13 py-3 px-3 rounded-md cursor-pointer flex justify-center items-center gap-3 hover:shadow-xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {user ? (
            <img src={user.avatar} alt="profile" className="w-10 h-10 rounded-full" />
          ) : (
            <FaUser className="text-gray-600" />
          )}
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ul className="py-1">
              {user ? (
                <>
                  {/* <li onClick={() => setSettingModel(true)}><li className="px-4 py-2 hover:bg-gray-100">Profile</li></li>
                  <li className="px-4 py-2 hover:bg-gray-100" onClick={() => setWishModel(true)}>Wishlist</li> */}
                  <Link to="/" onClick={() => logout()}><li className="px-4 py-2 hover:bg-gray-100">Log Out</li></Link>
                </>
              ) : (
                <>
                  <Link to="/login"><li className="px-4 py-2 hover:bg-gray-100">Login</li></Link>
                  <Link to="/register"><li className="px-4 py-2 hover:bg-gray-100">Sign Up</li></Link>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
  
      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden">
        <FaBars
          className="text-2xl cursor-pointer"
          onClick={() => {
            setMobileMenuOpen((prev) => !prev)
            setIsDropdownOpen(false)
          }}
        />
      </div>
    </div>
  </div> 
    {/* Center Section - Links */}
   
  
    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="absolute top-16 left-0 w-full z-20 bg-white shadow-lg md:hidden">
        <div className="flex flex-col items-center space-y-4 p-4 z-10">
          <Link className="hover:cursor-pointer hover:border-b-2" to="/">Home</Link>
          <Link to="/about" className="hover:cursor-pointer hover:border-b-2">About Us</Link>
          <Link to="/service" className="hover:cursor-pointer hover:border-b-2">Services</Link>
          <Link to="/projects" className="hover:cursor-pointer hover:border-b-2">Projects</Link>
          <Link to="/#contact" className="hover:cursor-pointer hover:border-b-2">Contact Us</Link>
        </div>
      </div>
    )}
  </div>
  

  );
}

  


export default Navbar;
