const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors =require('cors')
const foodRoutes =require('./routes/foodRoutes')
// Load environment variables
dotenv.config();

// Initialize the application
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5173',
  methods:['GET','POST','PUT'],
  credentials:true
}))
// Routes
app.use("/api/auth", userRoutes);
app.use("/api/user",foodRoutes)



// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
