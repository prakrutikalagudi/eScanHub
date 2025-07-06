import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './styles/Login.css';

function Login() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:5000/login", { empId, password });
      if (response.data.success) {
        alert(response.data.message || "Login successful!");
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed! Check credentials.");
    }
  };

  return (
    <div>
      <div className="logo">
        <h1>e$canHub</h1>
      </div>
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>

  );
}

export default Login;
