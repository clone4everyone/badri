import React,{useState} from 'react';
import founder from '../../assets/founder.png'
import API from '../../utils/API';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const ContactUs = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");
  const user=useSelector((state)=>state.user.user);
  const navigate=useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const submitMsg=async()=>{
    try{
      if(!name || !email || !message){
         toast.error("Every Section Should filled")
      }
      else if(!validateEmail){
         toast.error("enter valid email");
      }else{
        const data=await API.post("/msg/putMsg",{
        name,email,message
      });
      toast.success('Response submitted')
      if(data.data.status){
      
        setName("");
        setEmail("");
        setMessage("")
      }
      }

      
    }catch(err){
      console.log(err.message);
    }
  }
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between p-5 lg:p-10 min-h-64 relative">
    {/* Left Section */}
    <div className="lg:w-1/2 w-full p-4 space-y-4">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800" style={{ fontFamily: "Fira Sans" }}>
        Contact Us
      </h2>
      <p className="text-sm lg:text-md text-gray-600" style={{ fontFamily: "Montserrat" }}>
        <strong>Better yet, See us in person!</strong>
        <br />
        We love our customers, so feel free to visit during normal business hours.
      </p>
      <div>
        <h3 className="text-base lg:text-lg font-semibold" style={{ fontFamily: "Fira Sans" }}>
          Location
        </h3>
        <p className="text-gray-700 text-sm lg:text-base" style={{ fontFamily: "Montserrat" }}>
          Ramapuram Putlur Road, Shree Ram Nagar, Kakkalur Industrial Estate, Thiruvallur, Tamil Nadu, India
        </p>
      </div>
      <div>
        <h3 className="text-base lg:text-lg font-semibold" style={{ fontFamily: "Fira Sans" }}>
          Business Hours
        </h3>
        <p className="text-gray-700 text-sm lg:text-base" style={{ fontFamily: "Montserrat" }}>
          <strong>Monday to Friday:</strong> 9:00 AM - 5:00 PM
          <br />
          <strong>Saturday:</strong> 10:00 AM - 2:00 PM
          <br />
          <strong>Sunday:</strong> Closed
        </p>
      </div>
      <button
        onClick={()=>{
          user!==null ? toggleSidebar() :navigate("/login")
        }}
        className="text-sm lg:text-md rounded-sm text-white px-4 py-2 bg-blue-600 font-medium"
        style={{ fontFamily: "Montserrat" }}
      >
        Drop us a message!
      </button>
    </div>
  
    {/* Right Section (Map) */}
    <div className="lg:w-1/2 w-full p-4">
      <iframe
        className="w-full h-[300px] lg:h-[400px] rounded-xl border border-gray-300 shadow-lg"
        src="https://www.google.com/maps?q=Ramapuram+Putlur+Road,+Shree+Ram+Nagar,+Kakkalur+Industrial+Estate,+Thiruvallur,+Tamil+Nadu,+India&output=embed"
        loading="lazy"
      ></iframe>
    </div>
  
    {/* Sidebar */}
    {isSidebarOpen && (
      <div
        className="absolute top-0 left-0 pl-10 md:pl-0 h-full w-full lg:w-1/2 bg-white shadow-lg p-5 z-10"
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 1s ease-in-out",
        }}
      >
        <h2
          className="text-2xl font-bold text-gray-800 mb-4"
          style={{ fontFamily: "Fira Sans" }}
        >
          Drop a Message
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
              style={{ fontFamily: "Montserrat" }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
              style={{ fontFamily: "Montserrat" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
              style={{ fontFamily: "Montserrat" }}
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleSidebar}
              className="text-sm text-gray-700 px-4 py-2 mr-2 border border-gray-300 rounded-sm"
              style={{ fontFamily: "Montserrat" }}
            >
              Cancel
            </button>
            <button
              className="text-sm text-white px-4 py-2 bg-blue-600 rounded-sm"
              onClick={() => submitMsg()}
              style={{ fontFamily: "Montserrat" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
  
  );
};

export default ContactUs;
