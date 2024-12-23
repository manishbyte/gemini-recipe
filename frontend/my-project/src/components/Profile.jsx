import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading, error, getUserProfile } = useContext(AuthContext);
  const navigate =useNavigate()
  useEffect(() => {
    if (!user) {
      getUserProfile();
    }
  }, [user, getUserProfile]);

  const handleEdit =()=>{
    navigate('/editprofile')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        <p className="text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center p-6"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // Replace with your actual image URL
      }}
    >
      <div className="w-full max-w-sm bg-gray-600 bg-opacity-90 mt-20 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center  justify-center text-2xl font-bold text-white">
            {user?.username?.charAt(0).toUpperCase() || ''}
          </div>
          <p className="text-gray-200">@{user?.username}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Profile Details</h2>
          <div className="mt-4 text-gray-300">
            <p>
              <span className="font-semibold text-gray-800">Email: </span>
              {user?.email}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Username: </span>
              {user?.username}
            </p>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="mt-6 w-full bg-gray-800 hover:bg-gray-400 text-white hover:text-black font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
