import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const validate = () => {
    let errorEmail = "";
    let errorPassword = "";
    if (!email.length) {
      errorEmail = "Invalid email";
    }
    if (!password.length) {
      errorPassword = "Invalid password";
    }
    if (errorEmail || errorPassword) {
      setErrorEmail(errorEmail);
      setErrorPassword(errorPassword);

      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    const isValidate = validate();
    if (isValidate) {
      setErrorEmail("");
      setErrorPassword("");
      const data = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:5000/login", data)
        .then((response) => {
          if (response.data === "Invalid login check your email") {
            return setErrorEmail("Invalid email");
          }
          if (response.data === "Invalid login check your password") {
            return setErrorPassword("Invalid password");
          }
          if (response.data) {
            localStorage.setItem("token", response.data);
            props.history.push("/home");
          }
        })
        .catch((error) => {
          if (error) {
            throw error;
          }
        });
    }
  };

  return (
    <div className="login-container2">
      <h1>Login</h1>
      <div className="">
        <input
          class="handel_input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ fontSize: "12", color: "red" }}>{errorEmail}</div>
      <div className="login-btn">
        <input
          class="handel_input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <div style={{ fontSize: "12", color: "red" }}>{errorPassword}</div>
      </div>
      <button
        class="btn btn-primary"
        style={{ backgroundColor: "green", marginTop: "15px" }}
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
