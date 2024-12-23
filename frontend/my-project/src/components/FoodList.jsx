import React, { useState, useEffect } from "react";

const FoodList = () => {
  const [foodList, setFoodList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/user/foodlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch food list");
        }

        const data = await response.json();
        setFoodList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodList();
  }, []);

  if (loading) {
    return <div>Loading your food list...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!foodList) {
    return <div>No food selection available.</div>;
  }

  // Define the order of days from Monday to Sunday
  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Sort the days array based on the order defined above
  const sortedDays = foodList.days.sort((a, b) => {
    return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
  });

  return (
    <div
      className="bg-cover bg-center min-h-screen text-white flex flex-col w-full items-center justify-center py-8"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // Replace with your actual image URL
      }}
    >
      <div className="max-w-4xl mx-auto mt-10 p-6  md:bg-gray-700 bg-opacity-90 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-black text-center mb-4">Your Food Selection for the Week</h1>

        <div className="space-y-6">
          {sortedDays.map((day) => (
            <div key={day.day} className="p-6 border-b border-gray-600">
              <h2 className="text-xl font-semibold text-gray-800 md:text-gray-200 mb-4">{day.day}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["breakfast", "lunch", "dinner"].map((mealType) => {
                  const meal = day[mealType];
                  return (
                    meal && (
                      <div key={mealType} className="bg-gray-700 p-2 rounded-md">
                        <h3 className="text-lg font-medium mb-2">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</h3>
                        <p className="text-gray-300">{meal}</p>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodList;
