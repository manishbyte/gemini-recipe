import React, { useState } from 'react';
// Importing FontAwesome React components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import Content from './Content';
import { useNavigate } from 'react-router-dom'; // For navigation

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate(); // Initialize useNavigate for route navigation

  const handleSearch = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/user/search?query=${searchQuery}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();

      if (data && data.recipe) {
        setRecipe(data.recipes); // Set the fetched recipes
        // Navigate to RecipeDisplay with recipe data as state
        navigate('/recipe-display', { state: { recipes: data.recipe } });
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false); // Stop loading after the request is complete
    }
  };

  return (
    <>
      <div
        className="grid place-content-center max-w-full h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Replace with your image URL
        }}
      >
        {/* Recipe Finder Section */}
        <div className="text-center mb-6 bg-black bg-opacity-50 md:mr-10 p-6 rounded-md">
          {/* FontAwesome Utensils Icon */}
          <FontAwesomeIcon icon={faUtensils} className="text-3xl md:text-6xl text-slate-800" />
          <h1 className="md:text-3xl text-xl font-bold text-slate-100 mt-4">Recipe Finder</h1>
          <p className="text-black mt-2">Find delicious recipes quickly and easily!</p>
        </div>

        {/* Search Section */}
        <div className="flex items-center md:mr-10 justify-center gap-1">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-400 md:px-4 md:py-2 px-2 py-1 rounded-l-lg md:w-80 w-48 shadow focus:outline-none focus:ring-2 focus:ring-slate-300"
          />

          {/* Button */}
          <button
            onClick={handleSearch}
            className="bg-gray-800 text-white px-3 py-1 h-full rounded-r-lg shadow hover:bg-slate-300 hover:text-black transition flex items-center gap-2"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <span>Searching...</span> // Show "Searching..." when loading
            ) : (
              <>
                <i className="fas fa-search"></i> Search
              </>
            )}
          </button>
        </div>
      </div>
      <Content />
    </>
  );
}

export default HomePage;
