import React, { useState } from "react";
import { signUp } from "../services/authService";
import { Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [riotUsername, setRiotUsername] = useState("");
  const [riotTagline, setRiotTagline] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password, riotUsername, riotTagline);
      alert("User registered successfully!");
    } catch (error) {
      alert("Error registering user: " + error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
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
        <input
          type="text"
          placeholder="Riot Username"
          onChange={(e) => setRiotUsername(e.target.value)}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Riot Tagline (e.g., #NA1)"
          onChange={(e) => setRiotTagline(e.target.value)}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <button onClick={handleSignUp} style={{ width: "100%" }}>Signup</button>
      </div>
    </div>
  );
}
export default Signup;