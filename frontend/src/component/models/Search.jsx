import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../../utils/API';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Search = ({ setModel }) => {
  const user=useSelector((state)=>state.user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const itemsPerPage = 10;

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
    const filtered = products.filter((item) => {
      // Convert all fields to strings for comparison
      const title = item.titile ? item.titile.toLowerCase() : '';
      const bhk = item.bhk ? String(item.bhk).toLowerCase() : '';
      const price = item.price ? String(item.price).toLowerCase() : '';
      const searchTerm = search.toLowerCase();
  
      // Check if search term matches any of the fields
      return title.includes(searchTerm) || bhk.includes(searchTerm) || price.includes(searchTerm);
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when search changes
  }, [search, products]);
  

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const incrementProjectView=async(id)=>{
    await  API.post("/projects/incrementProjectView",{
        userId:user._id,
        projectId:id
      })
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pl-4 md:pl-0">
    <div className="bg-white rounded-xl p-6 md:p-8 w-[90%] max-h-[69%] overflow-y-auto max-w-4xl custom-scrollbar relative shadow-lg transition-all duration-1000 ease-in-out opacity-100 scale-100">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        onClick={() => setModel(false)}
        aria-label="Close Modal"
      >
        ✖
      </button>
  
      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-5">
        <input
          type="text"
          placeholder="Find By Seller"
          className="w-full outline-none px-2 font-montserrat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
  
      {/* Results Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold font-fira-sans">Property Listings</h2>
        {loading ? (
          <p className="text-center mt-4 font-montserrat">Loading...</p>
        ) : currentData.length > 0 ? (
          currentData.map((item, index) => (
            <div
              key={index}
              className="flex hover:cursor-pointer flex-col md:flex-row items-start gap-4 mt-4 border-b pb-4"
              onClick={() => {
                if (user !== null) {
                  incrementProjectView(item._id);
                  navigate(`/projectDetail/${item.title}/${item._id}`, { state: item });
                } else {
                  navigate("/login");
                }
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.titile}
                className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
              />
              <div className="font-montserrat">
                <h3 className="text-lg font-bold font-fira-sans">{item.titile}</h3>
                <p>
                  <strong>BHK:</strong> {item.bhk}BHK{item.balcony? '- Balcony':null}{item.terrace? '- Terrace':null}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Area:</strong> {item.Acre}
                </p>
                <p>
                <strong>Price:</strong> ₹ {Number(item.price).toLocaleString()}


                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-gray-500 font-montserrat">
            No results found for "{search}"
          </p>
        )}
      </div>
  
      {/* Dynamic Pagination */}
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
    </div>
  </div>
  
  );
};

export default Search;
