import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { ...state, loading: false, user: action.payload, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Fetch user profile API
  const getUserProfile = async () => {
    try {
      dispatch({ type: "LOADING" });
      const res = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/auth/profile`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "SUCCESS", payload: data });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  // Signup API
  const signup = async (userData) => {
    try {
      dispatch({ type: "LOADING" });
      const res = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "SUCCESS", payload: data });
      } else {
        const { message } = await res.json();
        dispatch({ type: "ERROR", payload: message });
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  // Login API
  const login = async (userData) => {
    try {
      dispatch({ type: "LOADING" });
      const res = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "SUCCESS", payload: data });
      } else {
        const { message } = await res.json();
        dispatch({ type: "ERROR", payload: message });
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  // Logout API
  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  // Update Profile API
const updateUserProfile = async (updatedData) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/auth/editprofile`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: "SUCCESS", payload: data.user });
    } else {
      const { message } = await res.json();
      dispatch({ type: "ERROR", payload: message });
    }
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.message });
  }
};


  return (
    <AuthContext.Provider
      value={{ ...state, signup, login, logout, getUserProfile,updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
