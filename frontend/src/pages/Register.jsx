import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../component/Toast";
import API from "../utils/API";
import Navbar from "../component/homepage/Navbar";
import { useSelector } from "react-redux";
import login from '../assets/login.png'
const Register = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormVisible(true);
    }, 500); // Delay matching the form slide-in duration
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/user/profile");
    }
  }, []);

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z ]{3,}$/; // Name must be at least 3 characters and only letters/spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; // Password rules

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name =
        "Name must contain only letters and spaces, min 3 chars.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 chars, include 1 uppercase, 1 number, and 1 special char.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      toast.error("Please fix the errors and try again.");
      setLoading(false);
      return;
    }

    const registrationPromise = API.post("/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    toast.promise(registrationPromise, {
      loading: "Registering...",
      success: "Registration successful! Redirecting...",
      error: (err) =>
        err.response?.data?.message ||
        "Failed to Register/Signup. Please try again.",
    });

    try {
      const { data } = await registrationPromise;

      navigate("/auth/email-sent");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center p-3 justify-center min-h-[90vh] grainy-dark  inset-0 bg-cover bg-center" style={{backgroundImage:`url(${login})`}}>
        <Toast />
        <div className="w-full h-screen bg-black opacity-25 absolute">

</div>
        <div className="relative z-10 w-full max-w-lg p-8  bg-opacity-10 backdrop-blur-lg rounded-lg shadow-neumorphic border border-gray-500 border-opacity-30 animate-slide-in-left">
          <h2 className="text-2xl font-bold mb-4 text-center text-primary">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
  {[
    { label: "Name", name: "name", type: "text", placeholder: "Enter Name" },
    { label: "Email", name: "email", type: "email", placeholder: "user@gmail.com" },
    { label: "Password", name: "password", type: "password", placeholder: "********" },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "********" },
  ].map((field, index) => (
    <div key={field.name} className={`animate-bounce-in delay-${index * 100}`}>
      <label className="block text-gray-700">{field.label}</label>
      <input
        className={`w-full px-3 py-2 border ${
          errors[field.name] ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 ${
          errors[field.name] ? "focus:ring-red-500" : "focus:ring-primary"
        }`}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        value={formData[field.name]}
        onChange={handleChange}
      />
      {errors[field.name] && (
        <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
      )}
    </div>
  ))}

  <button
    disabled={loading}
    type="submit"
    className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-60"
  >
    Sign Up
  </button>

  <div className="text-center">
    <span className="text-gray-700">Already Have an Account? </span>
    <button
      className="text-primary hover:underline"
      onClick={() => navigate("/login")}
    >
      Log In
    </button>
  </div>
</form>

        </div>
      </div>
    </>
  );
};

export default Register;
