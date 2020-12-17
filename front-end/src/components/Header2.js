import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import AddStore from "./AddStore";
import AddProduct from "./AddProduct";

const Header = (props) => {
  const [add, setAdd] = useState(true);
  const [count, setCount] = useState(0);
  const [headerPic, setheaderPic] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("order"))) {
      setCount(JSON.parse(localStorage.getItem("order")).length);
    }
    getUser();
  }, []);

  const user = jwt_decode(localStorage.getItem("token"));

  const getUser = async () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/users/${user.user_id}`)
      .then(async (response) => {
        if (response.data.length !== 0) {
          setheaderPic(response.data[0].image_profile);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="container2" style={{ marginTop: 0 }}>
      <nav className=" navheader">
        <div className="navheader-7">
          <p
            style={{
              float: "right",
              marginTop: "10px",
              marginRight: "9px",
              fontSize: "20px",
              fontStyle: "bold",
            }}
          >
            Welcome {user.first_name.toUpperCase()}!
          </p>
          <Link to="/Account">
            <img
              src={headerPic}
              alt="pic"
              style={{
                float: "right",
                marginTop: "10px",
                marginRight: "5px",
                borderRadius: "150px",
              }}
              className="headerpPic"
            ></img>
          </Link>
          <ul className="navbar2-nav ">
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                🛒Cart
                <sup>
                  <span
                    style={{
                      fontWeight: "400",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      width: "200px",
                      height: "200px",
                      color: "white",
                      padding: "1px 5px",
                    }}
                  >
                    {count}
                  </span>
                </sup>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                home
              </Link>
            </li>
            <li id="dropdown" className="nav-item">
              <Link className="nav-link">Account</Link>
              <div id="select">
                <a href="/Account">My Account</a>
                <a href="/delevaryman">My delevaryman Account</a>
                {add ? (
                  <div>
                    <Popup modal trigger={<a>Add Store</a>}>
                      {(close) => <AddStore close={close} {...props} />}
                    </Popup>
                    <Popup modal trigger={<a>Add Product</a>}>
                      {(close) => <AddProduct close={close} {...props} />}
                    </Popup>
                    <a href="/" onClick={() => localStorage.clear()}>
                      Log Out
                    </a>
                  </div>
                ) : (
                  <a href="/" onClick={() => localStorage.clear()}>
                    Log Out
                  </a>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
