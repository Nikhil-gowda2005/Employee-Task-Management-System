import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "USER"
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/signup", form);
      setMessage(res.data);
    } catch (error) {
      setMessage("Error during signup!");
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={form.username}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Signup;
