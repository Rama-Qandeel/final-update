import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageProfile, setimageProfile] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorRoleId, setErrorRoleId] = useState("");

  const validate = () => {
    let errorEmail = "";
    let errorPassword = "";
    let errorFirstName = "";
    let errorlasttName = "";
    let errorAddress = "";
    let errorPhoneNumber = "";
    let errorRoleId = "";

    if (!email.length) {
      errorEmail = "Invalid email";
    }
    if (!password.length) {
      errorPassword = "Invalid password";
    }
    if (!firstName.length) {
      errorFirstName = "Invalid first name";
    }
    if (!lastName.length) {
      errorlasttName = "Invalid last name";
    }
    if (!address.length) {
      errorAddress = "Invalid address";
    }
    if (!phoneNumber.length) {
      errorPhoneNumber = "Invalid phoneNumber";
    }
    if (!roleId.length) {
      errorRoleId = "Invalid RoleId";
    }
    if (
      errorEmail ||
      errorPassword ||
      errorFirstName ||
      errorlasttName ||
      errorAddress ||
      errorPhoneNumber ||
      errorRoleId
    ) {
      setErrorEmail(errorEmail);
      setErrorPassword(errorPassword);
      setErrorFirstName(errorFirstName);
      setErrorAddress(errorAddress);
      setErrorLastName(errorLastName);
      setErrorPhoneNumber(errorPhoneNumber);
      setErrorRoleId(errorRoleId);
      
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
    if (event.target.name === "firstName") {
      setFirstName(event.target.value);
    }
    if (event.target.name === "lastName") {
      setLastName(event.target.value);
    }
    if (event.target.name === "address") {
      setAddress(event.target.value);
    }
    if (event.target.name === "city") {
      setCity(event.target.value);
    }
    if (event.target.name === "region") {
      setRegion(event.target.value);
    }
    if (event.target.name === "phoneNumber") {
      setPhoneNumber(event.target.value);
    }
    if (event.target.name === "roleId") {
      setRoleId(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    const isValidate = validate();
    if (isValidate) {
      setErrorEmail("");
      setErrorPassword("");
      setErrorFirstName("");
      setErrorAddress("");
      setErrorLastName("");
      setErrorPhoneNumber("");
      setErrorRoleId("");
      const data = {
        last_name: lastName,
        first_name: firstName,
        address: address,
        city: city,
        region: region,
        phone_number: phoneNumber,
        imageProfile,
        email: email,
        password: password,
        role_id: roleId,
      };
      axios
        .post("http://localhost:5000/register", data)
        .then((response) => {
          if (response.data) {
            props.history.push("/login");
            alert("create an account");
          } else {
            alert("email is already exists");
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return (
    <div className="register-container2">
      <h1>Register</h1>
      <div className="handel_input">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ fontSize: "12", color: "red" }}>{errorEmail}</div>
      <div className="handel_input">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ fontSize: "12", color: "red" }}>{errorPassword}</div>
      <div className="handel_input">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ fontSize: "12", color: "red" }}>{errorFirstName}</div>
      <div className="handel_input">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ fontSize: "12", color: "red" }}>{errorLastName}</div>
      <div className="handel_input">
        <label htmlFor="address"> Select a City</label>
        <select name="address" id="address" onClick={handleChange}>
          <option value="zarqa">zarqa</option>
          <option value="Amman">Amman</option>
          <option value="al-mafraq">al-mafraq</option>
          <option value="ma'an">ma'an</option>
          <option value="irbed">irbed</option>
          <option value="madaba">madaba</option>
          <option value="aqaba">aqaba</option>
          <option value="ajloun">ajloun</option>
          <option value="jarash">jarash</option>
        </select>
      </div>
      <div className="handel_input">
        <input
          type="text"
          name="city"
          placeholder="Address"
          value={city}
          onChange={handleChange}
          required
        />
      </div>
      <div className="handel_input">
        <input
          type="text"
          name="region"
          placeholder="Region"
          value={region}
          onChange={handleChange}
          required
        />
      </div>
      <div className="handel_input">
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ fontSize: "12", color: "red" }}>{errorPhoneNumber}</div>
      <div className="handel_input">
        <label htmlFor="roleId"> Select a type </label>
        <select name="roleId" id="roleId" onClick={handleChange}>
          <option value="1">Customer</option>
          <option value="2">Merchant</option>
          <option value="3">Delivery</option>
        </select>
      </div>
      <div style={{ fontSize: "12", color: "red" }}>{errorRoleId}</div>
      <div>
        <button
          class="btn btn-primary"
          style={{ backgroundColor: "green", marginTop: "15px" }}
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
      <Link to="/login">
        <div>
          <p>Already member?</p>
        </div>
      </Link>
    </div>
  );
};

export default Register;
