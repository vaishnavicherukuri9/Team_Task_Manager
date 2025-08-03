import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🧩 Page Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeSplash from "./pages/HomeSplash";
import Dashboard from "./pages/dashboard";
import MessageFeed from "./pages/MessageFeed";
//import ProgressBar from "./pages/ProgressBar";
import Logout from "./pages/Logout";
import "./Styles/global.css";
// 🔐 Protected Route
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Root Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomeSplash />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MessageFeed"
          element={
            <ProtectedRoute>
              <MessageFeed />
            </ProtectedRoute>
          }
        />
  
        {/* 🌐 Catch-all Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;