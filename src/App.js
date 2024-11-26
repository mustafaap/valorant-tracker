import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import Maps from "./components/Maps";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Signup from "./components/Signup";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Routes>
          {/* Routes without sidebar */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Routes with sidebar */}
          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/maps" element={<Maps />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function Navigation() {
  return (
    <nav className="nav-sidebar">
      <div className="nav-logo">
        <img src="/valorant-seeklogo-2.svg" alt="Valorant Logo" className="nav-logo-img shine-effect" />
      </div>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `nav-item ${isActive ? 'nav-item-active' : ''}`
          }
          end
        >
          HOME
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `nav-item ${isActive ? 'nav-item-active' : ''}`
          }
        >
          PROFILE
        </NavLink>
        <NavLink 
          to="/maps" 
          className={({ isActive }) => 
            `nav-item ${isActive ? 'nav-item-active' : ''}`
          }
        >
          MAPS
        </NavLink>
        <NavLink 
          to="/leaderboard" 
          className={({ isActive }) => 
            `nav-item ${isActive ? 'nav-item-active' : ''}`
          }
        >
          LEADERBOARD
        </NavLink>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `nav-item ${isActive ? 'nav-item-active' : ''}`
          }
        >
          SETTINGS
        </NavLink>
      </div>
    </nav>
  );
}

export default App;