import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8002/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    console.log("response", response)
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // Make alert or redirect to another page
        alert("Login successful");

        // Store the access token in local storage
        localStorage.setItem("accessToken", data.data.accessToken);

        // Reset the form
        setFormData({
          email: "",
          password: "",
        });

        // Redirect to home page
        window.location.href = "/";
      } else {
        alert ("Failed to login")
        console.error("Failed to login");
      }
    } catch (error) {
      alert ("Failed to login")
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="heading">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
