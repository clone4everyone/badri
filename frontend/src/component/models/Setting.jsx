import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import API from "../../utils/API";
import { useDispatch } from "react-redux";
import { updateName } from "../../redux/UserSlice";
const Setting = ({setSettingModel}) => {
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState(user?.name);
  const [email] = useState(user?.email);
  const [errors, setErrors] = useState({});

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [image, setImage] = useState();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
 const dispatch=useDispatch();
  // Validate and update name
  const validateAndUpdateName = async () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const updateProfilePromise = API.post("/auth/update-profile", {
        name,
        image,
      });

      toast.promise(updateProfilePromise, {
        loading: "Updating Profile...",
        success: "Profile updated successfully!",
        error: (err) =>
          err.response?.data?.message ||
          "Could not update profile. Please try again.",
      });

      try {
        const { data } = await updateProfilePromise;
        
        if(data.success){
          dispatch(
           updateName({
            name
           })
          )
        }

      } catch (error) {
        console.log(error);
      }
    }
  };

  // Validate and update password
  const validateAndUpdatePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword =
        "New password must be at least 6 characters long.";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      toast.error("Password do not match");
    }

    setPasswordErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const updatePasswordPromise = API.put("/auth/update-password", passwords);

      toast.promise(updatePasswordPromise, {
        loading: "Updating password...",
        success: "Password updated successfully!",
        error: (err) =>
          err.response?.data?.message ||
          "Could not update password. Please try again.",
      });

      try {
        const { data } = await updatePasswordPromise;
        setPasswordModalOpen(false);
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-gradient-to-r from-blue-100 via-orange-100 to-red-50 rounded-xl p-6 md:p-8 w-[90%] max-w-4xl custom-scrollbar shadow-xl transition-all duration-300 transform scale-100">
    {/* Close Button */}
    <button
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
      onClick={() => setSettingModel(false)}
      aria-label="Close Modal"
    >
      ✖
    </button>

    {/* Form */}
    <div className="bg-white max-w-lg mx-auto p-6 rounded-lg border shadow-md space-y-6">
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28 mb-4 border-2 border-gray-300 rounded-full">
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className="w-full h-full rounded-full overflow-hidden shadow relative hover:scale-105 transform transition-transform duration-300">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={user?.avatar || "/images/avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover bg-gray-200"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553 6.797c.667.995.194 2.203-.853 2.203H5.3c-1.047 0-1.52-1.208-.853-2.203L9 10m3-3.5v4m-3.5-.5h7m-5.5 8h4"
                  />
                </svg>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              id="profileImage"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2 font-[Fira-Sans]">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            errors.name ? "focus:ring-red-500" : "focus:ring-primary"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 font-[Montserrat]">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2 font-[Fira-Sans]">
          Email
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md font-[Montserrat]"
        />
      </div>
      <button
        onClick={validateAndUpdateName}
        className="w-full px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-black rounded-md shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        Update
      </button>
      <p className="text-sm text-center font-[Montserrat]">
        Need to update password?{" "}
        <button
          onClick={() => setPasswordModalOpen(true)}
          className="text-primary hover:underline focus:outline-none"
        >
          click here
        </button>
      </p>
    </div>

    {/* Password Modal */}
    {passwordModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="p-6 rounded-lg shadow-lg w-full max-w-md bg-gradient-to-r from-gray-50 to-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 font-[Fira-Sans]">
            Update Password
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 font-[Fira-Sans]">
                Current Password
              </label>
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: e.target.value,
                  })
                }
                className={`w-full px-4 py-2 border ${
                  passwordErrors.currentPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                  passwordErrors.currentPassword
                    ? "focus:ring-red-500"
                    : "focus:ring-primary"
                }`}
              />
            </div>
            {/* Additional Password Fields */}
             {passwordModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="grainy-light p-6 rounded-lg shadow-lg w-full max-w-md bg-white">
      <h2 className="text-xl font-bold text-gray-800 mb-4 font-fira-sans">
        Update Password
      </h2>
      {[
        { label: "Current Password", field: "currentPassword" },
        { label: "New Password", field: "newPassword" },
        { label: "Confirm New Password", field: "confirmPassword" },
      ].map(({ label, field }) => (
        <div className="mb-4" key={field}>
          <label className="block text-gray-700 text-sm font-semibold mb-2 font-montserrat">
            {label}
          </label>
          <input
            type="password"
            value={passwords[field]}
            onChange={(e) =>
              setPasswords({ ...passwords, [field]: e.target.value })
            }
            className={`w-full px-4 py-2 border ${
              passwordErrors[field] ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              passwordErrors[field] ? "focus:ring-red-500" : "focus:ring-primary"
            } font-montserrat`}
          />
          {passwordErrors[field] && (
            <p className="text-red-500 text-sm mt-1 font-montserrat">
              {passwordErrors[field]}
            </p>
          )}
        </div>
      ))}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setPasswordModalOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 font-montserrat"
        >
          Cancel
        </button>
        <button
          onClick={validateAndUpdatePassword}
          className="px-4 py-2 bg-primary bg-red-500 text-white rounded-md hover:bg-primary-dark focus:outline-none font-fira-sans"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}
          </div>
        </div>
      </div>
    )}
  </div>
</div>


    </>
  );
};

export default Setting;



 {/* Update Password */}
