import React, { useState, useEffect } from "react";

const CurrentDayMealRecipe = () => {
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentDayMealAndRecipe = async () => {
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/user/currentdaymeal`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();
        setMealData(data);
      } catch (error) {
        console.error("Error fetching current day meal and recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentDayMealAndRecipe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-00 text-black">
        Loading...
      </div>
    );
  }

  if (!mealData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        No meal data available for today.
      </div>
    );
  }

  const { currentDay, meal, recipes } = mealData;

  const formatRecipe = (recipe) => {
    return recipe.split("\n").map((line, index) => <p key={index}>{line}</p>);
  };

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-6"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
    >
      <div className="max-w-3xl w-full bg-gray-400 bg-opacity-80 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">{currentDay}'s Meal</h1>
        <h2 className="text-xl mt-2 text-center mb-4">Selected Meal: {meal}</h2>

        <div className="mt-4">
          <h3 className="text-lg text-slate-800 underline font-semibold">Breakfast Recipe:</h3>
          {recipes.breakfast ? formatRecipe(recipes.breakfast) : <p>No breakfast recipe available.</p>}
        </div>

        <div className="mt-4">
          <h3 className="text-lg text-slate-800 underline font-semibold">Lunch Recipe:</h3>
          {recipes.lunch ? formatRecipe(recipes.lunch) : <p>No lunch recipe available.</p>}
        </div>

        <div className="mt-4">
          <h3 className="text-lg text-slate-800 underline font-semibold">Dinner Recipe:</h3>
          {recipes.dinner ? formatRecipe(recipes.dinner) : <p>No dinner recipe available.</p>}
        </div>
      </div>
    </div>
  );
};

export default CurrentDayMealRecipe;
