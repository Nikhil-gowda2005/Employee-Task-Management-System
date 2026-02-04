import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", credentials);
      localStorage.setItem("token", res.data); // Save JWT
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={credentials.username}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={credentials.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default Login;
