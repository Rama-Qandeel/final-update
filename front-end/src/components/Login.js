import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5000/login", data)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("token", response.data);
          props.history.push("/home");
        }
      })
      .catch((error) => {
        if (error) {
          alert("Invalid User");
        }
      });
  };

  return (
    <div className="login-container2">
      <h1>Login</h1>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        {" "}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
