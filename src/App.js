import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import Maps from "./components/Maps";
import Login from "./components/Login";
import Signup from "./components/Signup";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes with sidebar */}
        <Route
          path="/"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="content">
                <HomePage />
              </div>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="content">
                <Profile />
              </div>
            </div>
          }
        />
        <Route
          path="/maps"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="content">
                <Maps />
              </div>
            </div>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="content">
                <Leaderboard />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="tab">Home</Link>
      <Link to="/profile" className="tab">Profile</Link>
      <Link to="/maps" className="tab">Maps</Link>
      <Link to="/leaderboard" className="tab">Leaderboard</Link>
    </div>
  );
}

export default App;