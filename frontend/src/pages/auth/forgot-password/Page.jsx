import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../utils/API";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit handler
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    setPending(true);
    const sendEmailPromise = API.post("/auth/forgot-password", { email });

    toast.promise(sendEmailPromise, {
      loading: "Sending Mail",
      success: "Mail sent, Please Check your mail!",
      error: (err) =>
        err.response?.data?.message ||
        "Could not send Email. Please try again.",
    });

    try {
      const { data } = await sendEmailPromise;

      navigate("/auth/email-sent");
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="h-screen p-4 md:p-10 flex items-center justify-center grainy-light">
    {/* Container */}
    <div className="w-full max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Enter Your Email Address
      </h1>
  
      {/* Form */}
      <form className="space-y-6" onSubmit={handlePasswordReset}>
        {/* Email Field */}
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } bg-gray-50 rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500" : "focus:ring-primary"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          disabled={pending}
          className={`w-full py-2 text-black bg-primary hover:bg-primary-dark rounded-md transition-all ${
            pending ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {pending ? "Sending..." : "Send Reset Email"}
        </button>
  
        {/* Back to Login */}
        <div className="text-sm text-center text-gray-700">
          <Link
            to="/login"
            className="text-primary hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  </div>
  
  );
}

export default ForgotPassword;
