const FoodSelection = require("../models/foodModel");
const User = require("../models/userModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB_c9Aw9gxv-zyFprWOEb1s-f7yLaMWXwA"); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Save or Update Food Data
const saveOrUpdateFoodSelection = async (req, res) => {
  const { weekData } = req.body; // Destructure the food selection data

  try {
    // Find the food selection data for the user
    const foodSelection = await FoodSelection.findOne({ userId: req.user.id });

    if (foodSelection) {
      // Update the existing data for the user
      weekData.forEach((newDayData) => {
        const existingDay = foodSelection.days.find((day) => day.day === newDayData.day);

        if (existingDay) {
          // Update meal selections for the specific day
          existingDay.breakfast = newDayData.breakfast;
          existingDay.lunch = newDayData.lunch;
          existingDay.dinner = newDayData.dinner;
        } else {
          // If the day does not exist, add the new day data to the list
          foodSelection.days.push(newDayData);
        }
      });

      // Save the updated food selection
      await foodSelection.save();
    } else {
      // If no existing food selection, create a new food selection record
      const newFoodSelection = new FoodSelection({
        userId: req.user.id,
        days: weekData,
      });

      // Save the new food selection
      await newFoodSelection.save();

      // Add the food selection to the user's food selection list (if necessary)
      const user = await User.findById(req.user.id);
      user.foodSelection.push(newFoodSelection._id);
      await user.save();
    }

    res.json({ message: "Food selection saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
 
};

// Get Food Data for a User
const getFoodSelection = async (req, res) => {
  const  userId  = req.user.id;

  try {
    const foodSelection = await FoodSelection.findOne({ userId });
    if (!foodSelection) {
      return res.status(404).json({ message: "No food selection found for this user" });
    }

    res.status(200).json(foodSelection);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food selection", error: error.message });
  }
};



// Method to get the current day
const getCurrentDay = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayIndex = new Date().getDay(); // Returns a number from 0 to 6
  return daysOfWeek[currentDayIndex]; // Get the name of the day
};

// Method to fetch the user's meal and generate recipe for the current day
const getUserMealForToday = async (req, res) => {
  try {
    const currentDay = getCurrentDay(); // Get today's day
    const userId = req.user.id; // Get the user ID from the authentication middleware

    // Fetch the user's food selection for the week
    const foodSelection = await FoodSelection.findOne({ userId });

    if (!foodSelection) {
      return res.status(404).json({ message: "Food selection not found for the user." });
    }

    // Find the user's meal for the current day
    const currentDayMeal = foodSelection.days.find(day => day.day === currentDay);

    if (!currentDayMeal) {
      return res.status(404).json({ message: `No meal selection found for ${currentDay}.` });
    }

    // Extract breakfast, lunch, and dinner for the current day
    const { breakfast, lunch, dinner } = currentDayMeal;

    // Choose a meal (you can choose breakfast, lunch, or dinner here)
    let selectedMeal = breakfast || lunch || dinner;

    if (!selectedMeal) {
      return res.status(404).json({ message: "No meal selected for today." });
    }

    // Generate recipe prompts for each meal type (breakfast, lunch, dinner)
    const generateRecipe = async (meal) => {
      const prompt = `Please generate a detailed recipe for a delicious ${meal}. 
      Include ingredients and step-by-step cooking instructions. 
      Make sure the recipe is suitable for a home cook and uses commonly available ingredients.`;
      const result = await model.generateContent(prompt);
      return result.response.text(); // Assuming the result is in this format
    };

    // Generate recipes for breakfast, lunch, and dinner
    const recipes = {};
    if (breakfast) recipes.breakfast = await generateRecipe(breakfast);
    if (lunch) recipes.lunch = await generateRecipe(lunch);
    if (dinner) recipes.dinner = await generateRecipe(dinner);

    res.json({
      currentDay,
      meal: selectedMeal,
      recipes, // Returning all generated recipes for breakfast, lunch, and dinner
    });
    
  } catch (error) {
    console.error("Error fetching user meal and recipe:", error);
    res.status(500).json({ message: "Error fetching user meal and recipe" });
  }
};


const searchRecipe =async(req,res)=>{
  const { query } = req.query;
 
  // Validate input
  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // Generate recipe from Gemini API
    const prompt = `Create a recipe for ${query}.`;
    const result = await model.generateContent(prompt);
    const recipe = result.response.text(); // Get the generated recipe text
     
    res.json({ recipe}); // Send the recipe back in the response
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Error generating recipe" });
  }
}

module.exports = { saveOrUpdateFoodSelection, getFoodSelection ,getUserMealForToday,searchRecipe};
