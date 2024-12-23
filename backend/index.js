const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors =require('cors')
const path =require('path')
const foodRoutes =require('./routes/foodRoutes')
// Load environment variables
dotenv.config();

// Initialize the application
const app = express();
const _dirname =path.resolve();
// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/auth", userRoutes);
app.use("/api/user",foodRoutes)
app.get("/test",(req,res)=>{
  console.log("hiii");
  
})
app.use(express.static(path.join(_dirname, "frontend", "my-project", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "my-project", "dist", "index.html"));
});
app.use(cors({
  origin:`${process.env.FRONTEND_URL}`,
  methods:['GET','POST','PUT'],
  credentials:true
}))




// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
