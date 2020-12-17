import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import InfoStore from "./InfoStore";
import Product from "./components/Product";
import Header2 from "./components/Header2";
import Cart from "./components/Cart";
import CSTprofile from "./CSTprofile";
import StoreProfile from "./StoreProfile";
import DelivaryProfile from "./DelivaryProfile";
import Check from "./components/Check";

const App = () => {
  return (
    <Router>
      <Route
        exact
        path="/login"
        render={(props) => (
          <div>
            <Header {...props} />
            <Login {...props} />
          </div>
        )}
      />
      <Route
        exact
        path="/register"
        render={(props) => (
          <div>
            <Header {...props} /> <Register {...props} />
          </div>
        )}
      />
      <Route
        exact
        path="/"
        render={(props) => (
          <div>
            <Header {...props} />
            <Home {...props} />
          </div>
        )}
      />
      <Route
        path="/home"
        render={(props) => (
          <div>
            <Header2 {...props} />
            <Home {...props} />
          </div>
        )}
      />
      <Route
        path="/infostore/:store_id"
        render={(props) => (
          <div>
            <Header2 {...props} />
            <InfoStore {...props} />
          </div>
        )}
      />
      <Route
        exact
        path="/product"
        render={(props) => (
          <div>
            <Header2 {...props} />
            <Product {...props} />
          </div>
        )}
      />
      <Route
        exact
        path="/cart"
        render={(props) => (
          <div>
            <Header2 {...props} />
            <Cart {...props} />
          </div>
        )}
      />
      <Route
        exact
        path="/Account"
        render={(props) => (
          <div>
            <Header2 {...props} />
            <CSTprofile {...props} />
          </div>
        )}
      />
      <Route
        path="/delevaryman"
        render={(props) => (
          <div>
            <Header2 {...props} />
            <DelivaryProfile {...props} />{" "}
          </div>
        )}
      />
      <Route
        exact
        path="/store/:id"
        render={(props) => (
          <div>
            <Header2 {...props} />
            <StoreProfile {...props} />
          </div>
        )}
      />
      <Route
        path="/checkout"
        render={(props) => (
          <div>
            <Header2 {...props} />
            <Check {...props} />
          </div>
        )}
      />
    </Router>
  );
};

export default App;
