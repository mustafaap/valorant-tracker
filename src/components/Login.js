import React, { useState } from "react";
import { login } from "../services/authService";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("User logged in successfully!");
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <button onClick={handleLogin} style={{ width: "100%" }}>Login</button>
      </div>
    </div>
  );
}


export default Login;