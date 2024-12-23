import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex">
      {/* Sidebar */}
      <div className="w-24 md:w-64 md:h-screen bg-slate-300 h-1/2 shadow-lg p-4">
        <button
          onClick={onClose}
          className="text-gray-800 text-2xl focus:outline-none"
        >
          &times;
        </button>
        <nav className="mt-4">
          <ul>
            <li className="md:p-2">
              <Link
                to="/"
                className="text-black ml-1 hover:bg-gray-600 hover:text-white hover:rounded-lg hover:cursor-pointer block md:p-2"
              >
                 Home
              </Link>
            </li>
            <li className="md:p-2">
              <Link
                to="/food"
                className="text-black hover:bg-gray-600 hover:text-white hover:rounded-lg hover:cursor-pointer p-1 block md:p-2"
              >
              Calender
              </Link>
            </li>
            <li className="md:p-2">
              <Link
                to="/list"
                className="text-black hover:bg-gray-600 hover:text-white hover:rounded-lg hover:cursor-pointer block p-1 md:p-2"
              >
            FoodList
              </Link>
            </li>
            <li className="md:p-2">
              <Link
                to="/recipe"
                className="text-black hover:bg-gray-600 hover:text-white hover:rounded-lg hover:cursor-pointer block p-1 md:p-2"
              >
            Recipe
              </Link>
            </li>
            <li className="md:p-2">
              <Link
                to="/profile"
                className="text-black hover:bg-gray-600 hover:text-white hover:rounded-lg hover:cursor-pointer block p-1 md:p-2"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Close Sidebar Overlay */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
};

export default Sidebar;
