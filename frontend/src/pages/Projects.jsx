import React, { useEffect, useState } from 'react';
import Navbar from '../component/homepage/Navbar';
import background from '../assets/project.jpeg';
import ProjectCard from '../component/cards/ProjectCard';
import toast from 'react-hot-toast';
import API from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Share from '../component/models/Share';
import Loading from '../component/Loading';
import { FaList } from 'react-icons/fa';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import Footer from '../component/homepage/Footer';



const Projects = () => {


const [products,setProducts]=useState(null);
const [shareModel,setShareModel]=useState(false);
const navigate=useNavigate();
const user=useSelector((state)=>state.user.user);
    const [filters, setFilters] = useState({
        searchQuery: '',
        status: '',
        bhk: '',
        minPrice: '',
        maxPrice: '',
        area: '',
        category:''
    });
   
const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

// Add this function in your component
const toggleViewMode = (mode) => {
  setViewMode(mode);
};
    useEffect(()=>{
        const call=async()=>{
            try{
                console.log("hello")
              const data=await API.get('/projects/getAll');
             setProducts(data.data.courses);
             console.log(data.data.courses)
            }catch(err){
                 console.log(err.message);
            }
          }
          call();
    },[]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
let filteredProducts=null;
let currentProducts=null;
let totalPages=0;
if(products!==null){
filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
        const matchesStatus = filters.status ? product.status === filters.status : true;
        const matchesBHK = filters.bhk ? product.bhk.includes(filters.bhk) : true;
        const matchesPrice = (filters.minPrice ? parseInt(product.price.replace(/,/g, '')) >= parseInt(filters.minPrice) : true) &&
                             (filters.maxPrice ? parseInt(product.price.replace(/,/g, '')) <= parseInt(filters.maxPrice) : true);
        const matchesArea = filters.area ? product.Acre.toLowerCase().includes(filters.area.toLowerCase()) : true;
        const matchesCategory=filters.category ? product.category === filters.category : true;
        return matchesSearch && matchesStatus && matchesBHK && matchesPrice && matchesArea &&matchesCategory;
    });
     totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
}
    // Filtering Logic
     

    // Pagination Logic
  

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle Filter Change
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setCurrentPage(1);
    };


  
  return (
        <>
          <Navbar />
          {/* Background Section */}
          <div className='w-full min-h-72 max-h-72 inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${background})` }}>
            <div className='flex flex-col justify-end gap-3 h-72 pb-8 pl-14 text-white'>
              <h1 className='text-4xl fira-sans'>Projects</h1>
              <p className='text-xl font-[Montserrat]'><span className='hover:cursor-pointer border-b-2' onClick={()=>navigate("/")}>Home</span> {`>`} <span>Projects</span></p>
            </div>
          </div>
      
          {/* Heading with View Toggle */}
          <div className="w-full flex justify-between items-center px-14 mt-10">
            <h1 className="font-bold mont text-4xl">
              Finding projects you may like 
            </h1>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded hidden md:block`}
                aria-label="List view"
              >
                <FaList className="h-6 w-6" />
              </button>
              <button 
                onClick={() => toggleViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded hidden md:block`}
                aria-label="Grid view"
              >
                <BsGrid3X3GapFill className="h-6 w-6" />
              </button>
            </div>
          </div>
      
          {/* Filters Section */}
          {
            products ? (
              <div className='container mx-auto p-6'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <input
                    type="text"
                    name="searchQuery"
                    value={filters.searchQuery}
                    onChange={handleFilterChange}
                    placeholder="Search by Project Name"
                    className="p-3 border rounded-md"
                  />
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="p-3 border rounded-md"
                  >
                    <option value="">All status</option>
                    <option value="available">Plot Available</option>
                    <option value="sold-out">Plot Sold-out</option>
                  </select>
      
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="p-3 border rounded-md"
                  >
                    <option value="">All Category of Plot</option>
                    <option value="residential">Resedential Plot</option>
                    <option value="commercial">Commercial Plot</option>
                    <option value="house">House </option>
                  </select>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min Price"
                    className="p-3 border rounded-md"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max Price"
                    className="p-3 border rounded-md"
                  />
                </div>
      
                {/* Project Cards Section with View Mode */}
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 gap-9'} mt-10`}>
                  {currentProducts && currentProducts.length > 0 ? (
                    currentProducts.map((product, index) => (
                      <ProjectCard key={index} product={product} viewMode={viewMode} />
                    ))
                  ) : (
                    <p className="text-center col-span-full text-red-500 text-lg font-semibold">
                      No Projects Found
                    </p>
                  )}
                </div>
      
                {/* Pagination Section */}
                <div className="flex justify-center items-center mt-8 space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-md border border-gray-300 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className='w-full flex justify-center items-center py-24'>
                <Loading className=""/>
              </div>
            )
          }
          <Footer/>
        </>
      );
};

export default Projects;
