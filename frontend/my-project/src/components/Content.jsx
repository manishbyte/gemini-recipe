import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faHistory, faBook, faUser } from "@fortawesome/free-solid-svg-icons";

function Content() {
  return (
    <>
      <div className="flex justify-center items-center bg-slate-400 w-full h-50">
      <div className="grid grid-cols-2 gap-4 w-full md:mt-5 mt-5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
  {/* First Cubicle */}
  <Link
    to="/food"
    className="bg-orange-500 md:w-48 md:h-48 ml-5 w-30 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-95"
  >
    <FontAwesomeIcon
      icon={faUtensils}
      className="mb-2 text-white text-3xl"
    />
    <p className="text-white text-center font-semibold">Food Calendar</p>
  </Link>

  {/* Second Cubicle */}
  <Link
    to="/list"
    className="bg-red-500 md:w-48 md:h-48 w-30 h-40 mr-5 flex flex-col justify-center items-center rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-95"
  >
    <FontAwesomeIcon
      icon={faHistory}
      className="mb-2 text-white text-3xl"
    />
    <p className="text-white text-center font-semibold">Food History</p>
  </Link>

  {/* Third Cubicle */}
  <Link
    to="/recipe"
    className="bg-indigo-500 md:w-48 md:h-48 ml-5 w-30 mb-5 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-95"
  >
    <FontAwesomeIcon
      icon={faBook}
      className="mb-2 text-white text-3xl"
    />
    <p className="text-white text-center font-semibold">Daily Recipe</p>
  </Link>

  {/* Fourth Cubicle */}
  <Link
    to="/profile"
    className="bg-yellow-500 md:w-48 md:h-48 w-30 h-40 mr-5 mb-5 flex flex-col justify-center items-center rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-95"
  >
    <FontAwesomeIcon
      icon={faUser}
      className="mb-2 text-white text-3xl"
    />
    <p className="text-white text-center font-semibold">Your Profile</p>
  </Link>
</div>

      </div>
    </>
  );
}

export default Content;
