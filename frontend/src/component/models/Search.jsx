import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../utils/API';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import {ToggleSearch} from  "../../redux/Toggle";

const Search = ({ setModel }) => {
  const user = useSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const placeholders = ["Name", "Location"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true); // Start slide-up effect
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setAnimate(false); // Reset animation
      }, 300); // Animation duration
    }, 2500); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);
  
  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await API.get('/projects/getAll');
        const data = response.data.courses || [];
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(`Error fetching products: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input
  useEffect(() => {
    if (search === '') {
      // Only show first two products when search is empty
      setFilteredProducts(products.slice(0, 2));
    } else {
      // Filter products based on title and location
      const filtered = products.filter((item) => {
        // Convert all fields to strings for comparison
        const title = item.title || item.titile || '';
        const location = item.locationTitle || '';
        const searchTerm = search.toLowerCase();
    
        // Check if search term matches title or location
        return title.toLowerCase().includes(searchTerm) || 
               location.toLowerCase().includes(searchTerm);
      });
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Reset to the first page when search changes
  }, [search, products]);

  // Calculate pagination - only used when search is not empty
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  // Get current data based on search state and pagination
  const currentData = search === '' 
    ? filteredProducts // Already limited to 2 items in the useEffect
    : filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  const incrementProjectView = async (id) => {
    await API.post("/projects/incrementProjectView", {
      userId: user._id,
      projectId: id
    });
  };
  const close=()=>{
   dispatch(ToggleSearch());
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pl-4 md:pl-0" onClick={() => close()}>
    <div
      className="bg-white rounded-xl p-6 md:p-8 w-[90%] max-w-4xl custom-scrollbar relative shadow-lg transition-all duration-1000 ease-in-out opacity-100 scale-100 "
      onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the outer div
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from propagating
          close();
        }}
        aria-label="Close Modal"
      >
        ✖
      </button>
    
        {/* Search Bar */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-2 mt-5">
          {/* Input Field */}
          <input
            type="text"
            className="w-full outline-none px-2 font-montserrat placeholder-transparent font-[Montserrat]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find By Title or Location"
          />
        
          {/* Overlay Placeholder Text with Slide Up Animation */}
          {!search && (
            <div className="absolute left-2 text-gray-400 pointer-events-none flex ">
              Find By{" "}
              <span
                className={`ml-2 inline-block transition-transform duration-500 fonr-finaSans ${
                  animate ? "-translate-y-1 opacity-2" : "translate-y-0 opacity-100"
                } `}
              >
                {placeholders[placeholderIndex]}
              </span>
            </div>
          )}
        </div>
    
        {/* Results Section */}
        <div className="mt-6 overflow-y-auto min-h-[20vh] max-h-[40vh] ">
          <h2 className="text-xl font-semibold fira-sans">Property Listings</h2>
          {loading ? (
            <p className="text-center mt-4 font-[Montserrat]"><Loading/></p>
          ) : currentData.length > 0 ? (
            currentData.map((item, index) => (
              <div
                key={index}
                className="flex hover:cursor-pointer flex-col md:flex-row items-start gap-4 mt-4 border-b pb-4"
                onClick={() => {
                  dispatch(ToggleSearch())
                  navigate(`/projectDetail/${item.title || item.titile}/${item._id}`, { state: item });
                  window.location.reload()
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title || item.titile}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
                />
                <div className="font-montserrat">
                  <h3 className="text-lg font-bold font-[finaSans]">{item.title || item.titile}</h3>
                  <p className="font-[Montserrat]">
                    <strong>BHK:</strong> {item.bhk}BHK{item.balcony? '- Balcony':null}{item.terrace? '- Terrace':null}
                  </p>
                  <p className='font-[Montserrat]'>
                    <strong>Location:</strong> {item.locationTitle}
                  </p>
                  <p className='font-[Montserrat]'>
                    <strong>Area:</strong> {item.unit === "sqft"
                      ? `${item.totalArea} Sq.ft `
                      : item.unit === "Acre"?`${item.totalArea} Acre`:`${item.totalArea} Cents`}
                  </p>
                  <p className='font-[Montserrat]'>
                    <strong>Price:</strong> ₹ {Number(item.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4 text-gray-500 font-[Montserrat]">
              No results found for "{search}"
            </p>
          )}
        </div>
    
        {/* Pagination - Only show when search is not empty */}
        {search !== '' && filteredProducts.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="p-2 bg-blue-600 text-white rounded-lg font-montserrat"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
      
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`p-2 border border-gray-300 rounded-lg font-montserrat ${
                  currentPage === index + 1 ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
      
            <button
              className="p-2 bg-blue-600 text-white rounded-lg font-montserrat"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;