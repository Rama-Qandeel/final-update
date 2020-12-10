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
  const [paymentId, setPaymentId] = useState(1);
  const [storeId, setStoreId] = useState(1);

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
      store_id: storeId,
      payment_id: paymentId,
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
  };

  return (
    <div className="register-container2">
      <h1>Register</h1>
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="address"> Select a country</label>
        <select name="address" id="address" onClick={handleChange}>
          <option value="Jordan">Jordan</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="region"
          placeholder="Region"
          value={region}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="roleId"> Select a type </label>
        <select name="roleId" id="roleId" onClick={handleChange}>
          <option value="1">Customer</option>
          <option value="2">Merchant</option>
          <option value="3">Delivery</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Register</button>
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
