import React, { useEffect, useState } from 'react';
import Navbar from '../component/homepage/Navbar';
import background from '../assets/project.jpeg';
import ProjectCard from '../component/cards/ProjectCard';
import toast from 'react-hot-toast';
import API from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Share from '../component/models/Share';

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
        area: ''
    });
   

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
        return matchesSearch && matchesStatus && matchesBHK && matchesPrice && matchesArea;
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
                    <h1 className='text-4xl'>Projects</h1>
                    <p className='text-xl '><span className='hover:cursor-pointer border-b-2' onClick={()=>navigate("/")}>Home</span> {`>`} <span>Projects</span></p>
                </div>
            </div>

            {/* Filters Section */}
            <div className='container mx-auto p-8'>
                <h1 className="text-2xl font-bold mb-6">Finding Projects You May Like</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <input
                        type="text"
                        name="searchQuery"
                        value={filters.searchQuery}
                        onChange={handleFilterChange}
                        placeholder="Search by Title..."
                        className="p-3 border rounded-md"
                    />
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="p-3 border rounded-md"
                    >
                        <option value="">All Status</option>
                        <option value="available">available</option>
                        <option value="sold-out">sold-out</option>
                    </select>
                    <select
                        name="bhk"
                        value={filters.bhk}
                        onChange={handleFilterChange}
                        className="p-3 border rounded-md"
                    >
                        <option value="">All BHK Types</option>
                        <option value="1">1 BHK</option>
                        <option value="2">2 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="4">4 BHK</option>
                        <option value="5">5 BHK</option>
                        <option value="6">6 BHK</option>
                        <option value="7">7 BHK</option>
                        <option value="8">8 BHK</option>
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
                    <input
                        type="text"
                        name="area"
                        value={filters.area}
                        onChange={handleFilterChange}
                        placeholder="Filter by Area"
                        className="p-3 border rounded-md"
                    />
                </div>

                {/* Project Cards Section */}
                <div className="grid grid-cols-1 gap-6">
  {currentProducts && currentProducts.length > 0 ? (
    currentProducts.map((product, index) => (
      <ProjectCard key={index} product={product} />
    ))
  ) : (
    <p className="text-center col-span-1 text-red-500 text-lg font-semibold">
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
        </>
    );
};

export default Projects;
