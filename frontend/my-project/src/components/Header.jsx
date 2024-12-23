import React, { useContext,useEffect,useState } from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading, error, getUserProfile, logout } = useContext(AuthContext);
  const navigate =useNavigate()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  useEffect(()=>{
    if (!user) {
      getUserProfile()
    }
  },[user,getUserProfile])

  const handleLogin =async()=>{
     navigate('/login')
  }
  return (
    <>
    <header className="flex justify-between items-center w-full h-16 bg-gray-800 text-white px-4">
      {/* Hamburger Menu */}
      <button onClick={toggleSidebar} className="md:text-2xl md:focus:outline-none">
        &#9776;
      </button>

      <button className="">
         <FontAwesomeIcon icon={faUtensils} className="text-3xl md:text-3xl text-white" />
      </button>

      {/* Login Button */}
      {(user==null)?<button onClick={handleLogin} className="bg-slate-400 hover:bg-slate-700 text-black hover:text-white md:px-4 md:py-2 px-1 py-1 rounded">
        Login
      </button>:<button onClick={logout} className="bg-slate-400 hover:bg-slate-700 text-black hover:text-white md:px-4 md:py-2 px-1 py-1 rounded">
        Logout
      </button>}
      

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
    </header>
    </>
  );
};

export default Header;
