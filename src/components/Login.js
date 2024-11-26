import React, { useState } from "react";
import { login } from "../services/authService";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      onLoginSuccess();
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}


export default Login;