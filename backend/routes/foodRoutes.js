const express = require("express");
const { saveOrUpdateFoodSelection, getFoodSelection, getUserMealForToday, searchRecipe } = require("../controllers/foodController");
const { protect } = require("../middlewares/authMiddleware");


const router = express.Router();

// Save or Update Food Selection
router.post("/foodselection",protect, saveOrUpdateFoodSelection);

// Get Food Selection for User
router.get("/foodlist", protect, getFoodSelection);
router.get("/currentdaymeal", protect, getUserMealForToday);
router.get("/search", protect, searchRecipe);


module.exports = router;
