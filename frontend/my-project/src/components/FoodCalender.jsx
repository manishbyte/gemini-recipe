import React, { useState, useEffect } from "react";
import { vegetablesData } from "../data/vegetablesdata";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const FoodCalendar = () => {
  const [foodSelection, setFoodSelection] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/foodselection", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (data.weekData) setFoodSelection(data.weekData);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const saveData = async (day) => {
    setLoading(true);
    try {
      const updatedFoodSelection = foodSelection.map((item) =>
        item.day === day ? item : { ...item }
      );

      await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/user/foodselection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ weekData: updatedFoodSelection }),
      });
      alert(`Food selection for ${day} saved successfully!`);
    } catch (error) {
      console.error("Error saving food data:", error);
      alert("Failed to save food selection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelection = (day, mealType, vegetable) => {
    setFoodSelection((prev) => {
      const updatedWeekData = prev.map((item) => {
        if (item.day === day) {
          return {
            ...item,
            [mealType]: vegetable, // Update the specific meal for the selected day
          };
        }
        return item;
      });

      if (!updatedWeekData.some((item) => item.day === day)) {
        updatedWeekData.push({
          day,
          breakfast: mealType === "breakfast" ? [vegetable] : [],
          lunch: mealType === "lunch" ? [vegetable] : [],
          dinner: mealType === "dinner" ? [vegetable] : [],
        });
      }

      return updatedWeekData;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-900 text-white p-4 bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Replace with your image URL
      }}
    >
      <h1 className="text-2xl font-bold text-black text-center mb-4">Weekly Food Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-8 bg-gray-700 bg-opacity-80 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-2 text-center">{day}</h1>
            {vegetablesData.map(({ meal, vegetables }) => (
              <div key={meal} className="mb-4">
                <h3 className="text-sm p-1 font-medium capitalize">{meal}</h3>
                <select
                  className="w-full p-2 bg-gray-700 text-white rounded-lg"
                  value={foodSelection.find((item) => item.day === day)?.[meal] || ""}
                  onChange={(e) => handleSelection(day, meal, e.target.value)}
                >
                  <option value="">Select a vegetable</option>
                  {vegetables.map((veg) => (
                    <option key={veg} value={veg}>
                      {veg}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="mt-4 text-center">
              <button
                onClick={() => saveData(day)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCalendar;
