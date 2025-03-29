import { useNavigate } from "react-router-dom";
import notfound from "../assets/404.jpg";
import Navbar from "../component/homepage/Navbar";


const NotFound=()=>{
    const navigate=useNavigate()
    return <>
    {/* <div className="w-full flex justify-center items-center h-screen inset-0    bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${notfound})` }}>
       <div>

       </div>
    </div> */}
    <Navbar/>
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="relative w-full h-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 w-full h-full flex items-center justify-center"
          style={{
            backgroundImage: `url(${notfound})`,
          }}
        ><div className="relative z-10 flex flex-col items-center text-center p-6">
          <h1 className="text-7xl font-bold text-gray-900">404</h1>
          <p className="text-lg text-gray-700 mt-4 max-w-lg">
            "Oops! Looks like you've stumbled upon uncharted territory in our digital universe. 
            Don't worry, we're navigating back to familiar pages in no time!"
          </p>

          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-3 font-bold border-b-4 border-b-yellow-600 rounded-lg shadow-lg transition duration-300" 
          >
            Go Back
          </button>
        </div></div>

    

        {/* Content */}
        
      </div>
    </div>
    </>
}

export default NotFound;