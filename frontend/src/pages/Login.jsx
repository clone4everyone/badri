import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import  toast  from "react-hot-toast";
import Toast from "../component/Toast";
import { setLogin } from "../redux/UserSlice";
import API from "../utils/API";
import login from '../assets/login.png'
import Navbar from "../component/homepage/Navbar";
// import { tst } from "../utils/utils";
// import Navbar from "../component/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      setLoading(false);
      return;
    }

    const loginPromise = API.post("/auth/login", { email, password });

    toast.promise(loginPromise, {
      loading: "Logging In...",
      success: "Login successful!",
      error: (err) =>
        err.response?.data?.message ||
        "Failed to Login/SignIn. Please try again.",
    });

    try {
      const response = await loginPromise;

      dispatch(
        setLogin({
          user: response.data.user,
        })
      );
      console.log(response.data.user)
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div
  className="flex   items-center justify-center p-3 bg-cover bg-center grainy-dark min-h-[90vh]"
  style={{ backgroundImage: `url(${login})` }}
>
  <Toast />
  {/* Background Overlay */}
  <div className="absolute inset-0 bg-black opacity-50 h-[110vh]  border"></div>

  {/* Login Card */}
  <div className="relative z-10 w-full max-w-lg p-8 bg-opacity-10 backdrop-blur-lg rounded-md shadow-neumorphic  border border-gray-500 border-opacity-30 animate-slide-in-left">
    <h2 className="text-2xl font-bold mb-4 text-center text-white sm:text-3xl">
      Login
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="animate-slide-in-right delay-300">
        <label className="block text-gray-300 font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2.5 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } border-opacity-50 bg-white bg-opacity-30 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="animate-slide-in-right delay-400">
        <label className="block text-gray-300 font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-3 py-2.5 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } border-opacity-50 bg-white bg-opacity-30 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Forgot Password Link */}
      <div className="text-right">
        <Link
          to="/auth/forgot-password"
          className="text-primary hover:underline text-sm"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-primary text-white font-medium rounded-md shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>

    {/* Navigation to Register */}
    <div className="text-center mt-4">
      <span className="text-white">Don't have an account? </span>
      <button
        onClick={() => navigate("/register")}
        className="text-blue-500 hover:underline font-medium"
      >
        Register
      </button>
    </div>
  </div>
</div>

    </>
  );
};

export default Login;
