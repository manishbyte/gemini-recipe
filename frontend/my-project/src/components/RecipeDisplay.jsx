import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing state

function RecipeDisplay() {
  const location = useLocation(); // Get the location object which contains the passed state
  const { recipes } = location.state || {}; // Access the recipes from the state

  // Debug: Log the recipes data to see its structure

  // If recipes is not an array but a single string (paragraph)
  const recipeLines = recipes ? recipes.split("\n") : []; // Split the string into lines based on \n

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Background image
      }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-md max-w-4xl w-full mt-10 mb-10 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Recipe Results</h2>
        {recipes ? (
          // Map over the lines created after splitting the recipe string
          <div>
            {recipeLines.map((line, index) => (
              <p key={index} className="mb-2">{line}</p> // Display each line inside a <p> tag
            ))}
          </div>
        ) : (
          <p className="text-center">No recipes found or invalid recipe data</p>
        )}
      </div>
    </div>
  );
}

export default RecipeDisplay;
