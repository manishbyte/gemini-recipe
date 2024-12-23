import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const EditProfileForm = () => {
  const { user, updateUserProfile, loading, error } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <div className="w-full max-w-md bg-gray-600 mb-10 bg-opacity-90 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black p-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-600 text-white focus:outline-none focus:ring focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium  text-black p-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-600 text-white focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  text-black p-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-600 text-white focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded bg-gray-800 hover:bg-gray-600 focus:ring focus:ring-gray-500 text-white hover:text-black font-bold ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
