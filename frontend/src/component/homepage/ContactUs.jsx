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
  const submitMsg=async(e)=>{
    e.preventDefault();
    try{
      if(!name || !email || !message){
         toast.error("Every Section Should filled")
         return ;
      }
      else if(!validateEmail){
         toast.error("enter valid email");
         return ;
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
<div className="flex flex-col lg:flex-row items-start justify-between p-5 md:p-8 lg:p-10 min-h-64 relative md:pl-20">
  {/* Left Section */}
  <div className="lg:w-1/2 w-full p-4 space-y-6 md:pl-20">
    <h2
      className="text-4xl md:text-4xl  font-bold text-gray-800 fira-sans"
      
    >
      Contact Us
    </h2>
    <p
      className="text-sm md:text-base lg:text-lg text-black font-[Montserrat]"
      
    >
      <strong >Better yet, See us in person!</strong>
      <br />
      We love our customers, so feel free to visit during normal business hours.
    </p>
    <div>
      <h3
        className="text-base md:text-lg lg:text-xl font-semibold"
        style={{ fontFamily: "Fira Sans" }}
      >
        Location
      </h3>
      <p
        className="text-gray-700 text-sm md:text-base lg:text-lg"
        style={{ fontFamily: "Montserrat" }}
      >
        Ramapuram Putlur Road, Shree Ram Nagar, Kakkalur Industrial Estate,
        Thiruvallur, Tamil Nadu, India
      </p>
    </div>
    <div>
      <h3
        className="text-base md:text-lg lg:text-xl font-semibold"
        style={{ fontFamily: "Fira Sans" }}
      >
        Business Hours
      </h3>
      <p
        className=" text-sm md:text-base lg:text-lg"
        style={{ fontFamily: "Montserrat" }}
      >
        Monday to Friday: 9:00 AM - 5:00 PM
        <br />
        Saturday: 10:00 AM - 2:00 PM
        <br />
        Sunday: Closed
      </p>
    </div>
    <button
      // onClick={() => {
      //   user !== null ? toggleSidebar() : navigate("/login");
      // }}
      onClick={()=>{
        toggleSidebar()
      }}
      className="text-sm md:text-base lg:text-lg rounded-sm text-white px-6 py-3 bg-[#2b2bd9] font-medium hover:bg-blue-700 transition-all"
      style={{ fontFamily: "Montserrat" }}
    >
      Drop us a message!
    </button>
  </div>

  {/* Right Section (Map) */}
  <div className="lg:w-1/2 w-full p-4">
    <iframe
      className="w-full h-[300px] md:h-[350px] lg:h-[400px] rounded-xl border border-gray-300 shadow-lg"
      src="https://www.google.com/maps?q=Ramapuram+Putlur+Road,+Shree+Ram+Nagar,+Kakkalur+Industrial+Estate,+Thiruvallur,+Tamil+Nadu,+India&output=embed"
      loading="lazy"
    ></iframe>
  </div>

  {/* Sidebar */}
  {isSidebarOpen && (
    <div
      className="absolute top-0 left-0 !pl-7   md:pl-0 h-full w-full lg:w-1/2 bg-white shadow-lg p-5 z-10"
      style={{
        transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 1s ease-in-out",
      }}
    >
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6"
        style={{ fontFamily: "Fira Sans" }}
      >
        Drop a Message
      </h2>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm md:text-base font-medium text-gray-700"
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
            className="block text-sm md:text-base font-medium text-gray-700"
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
            className="block text-sm md:text-base font-medium text-gray-700"
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
            className="text-sm md:text-base text-gray-700 px-4 py-2 mr-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-all"
            style={{ fontFamily: "Montserrat" }}
          >
            Cancel
          </button>
          <button
            className="text-sm md:text-base text-white px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
            onClick={(e) => submitMsg(e)}
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
