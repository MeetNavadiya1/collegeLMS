import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext"; // adjust path if needed

const Logout = () => {
  const navigate = useNavigate();
  const { backendURL, admin } = useContext(AppContext);
  const {setAdmin} = useContext(AppContext);
  
  useEffect(() => {
    if (!admin){
      navigate('/login');
    }
    const logoutUser = async () => {
      try {

        // Remove all stored session data
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        setAdmin(false);

        toast.success("Logged out successfully!");

        // Redirect to login page after short delay
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      }
    };

    logoutUser();
  }, [backendURL, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-lg font-semibold text-gray-700">
          Logging you out...
        </h1>
        <p className="text-gray-500 mt-2">Please wait a moment.</p>
      </div>
    </div>
  );
};

export default Logout;
