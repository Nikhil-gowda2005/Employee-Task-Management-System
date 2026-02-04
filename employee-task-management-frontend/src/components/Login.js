import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login clicked"); // 🔍 debug
    console.log(username, password);

    if (username && password) {
      onLogin(); // 🔥 THIS LINE SWITCHES TO DASHBOARD
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
