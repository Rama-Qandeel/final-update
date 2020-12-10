import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container2">
      <nav className=" navheader">
        <div className="">
          <ul className="navbar2-nav ">
            <li className="nav-item">
              <Link to="/Login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
