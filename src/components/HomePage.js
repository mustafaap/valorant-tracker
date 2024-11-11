// src/components/HomePage.js
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./Auth.css";

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const toggleModal = () => setShowModal(!showModal);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="home-container">
      <button className="login-signup-btn" onClick={toggleModal}>
        Login / Signup
      </button>
      
      <div className="about-section">
        <h1>About Valorant Tracker</h1>
        <p>This project helps Valorant players track their in-game performance, analyze match data, and improve their gameplay.</p>
        <p>Whether you're a casual player or a competitive gamer, this tool provides insights into your strengths and weaknesses.</p>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={toggleModal}>×</button>
            <div className="tab-switch">
              <button onClick={() => setIsLogin(true)} className={isLogin ? "active-tab" : ""}>Login</button>
              <button onClick={() => setIsLogin(false)} className={!isLogin ? "active-tab" : ""}>Signup</button>
            </div>
            {isLogin ? <Login /> : <Signup />}
            <button className="toggle-form-btn" onClick={toggleForm}>
              {isLogin ? "Don't have an account? Sign up here" : "Already have an account? Login here"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;