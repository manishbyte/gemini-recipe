import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import FoodCalender from "./components/FoodCalender";
import CurrentDayMealRecipe from "./components/CurrentDayMealRecipe";
import FoodList from "./components/FoodList";
import RecipeDisplay from "./components/RecipeDisplay";
import EditProfileForm from "./components/EditProfileForm";

// Create a custom Router with the future flag enabled
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/food",
      element: <FoodCalender />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enable the future behavior for relative splat path resolution
    },
  }
);

function App() {
  return (
    <Router router={router}>
      <ConditionalHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/food" element={<FoodCalender />} />
        <Route path="/recipe" element={<CurrentDayMealRecipe/>} />
        <Route path="/list" element={<FoodList/>} />
        <Route path="/recipe-display" element={<RecipeDisplay/>} />
        <Route path="/editprofile" element={<EditProfileForm/>} />
      </Routes>
    </Router>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();

  // Do not render Header on Signup and Login pages
  const excludedPaths = ["/signup", "/login"];
  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  return <Header />;
};

export default App;
