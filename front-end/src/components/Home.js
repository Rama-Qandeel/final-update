import React, { useState, useEffect } from "react";
import Store from "./Store";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getAllStores();
  }, []);

  const getAllStores = () => {
    axios
      .get("http://localhost:5000/allstore")
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const getOrders = async () => {
    const user = jwt_decode(localStorage.getItem("token"));
    let data = { user_id: user.user_id };
    axios
      .get(`http://localhost:5000/getorder/${user.user_id}`)
      .then((response) => {
        setOrderList(response.data);
        localStorage.setItem("order", JSON.stringify(response.data));
        getOrders();
      })
      .catch((error) => {
        throw error;
      });
  };

  const getSpecificStores = (e) => {
    let data = { store_category: e.target.name };
    axios
      .post("http://localhost:5000/specificstore", data)
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const renderStores = stores.map((store) => (
    <Link
      className="link"
      to={{
        pathname: `/infostore/${store.store_id}`,
        state: store,
      }}
      style={{ textDecoration: "none" }}
    >
      <Store data={store} />
    </Link>
  ));

  return (
    <div>
      <div className="store-category">
        <button
          className="category"
          style={{ marginLeft: "7px" }}
          onClick={getAllStores}
        >
          All
        </button>
        <button
          className="category"
          name="Groceries"
          onClick={getSpecificStores}
        >
          Groceries
        </button>
        <button className="category" name="Bakery" onClick={getSpecificStores}>
          Bakery
        </button>
        <button className="category" name="Coffee" onClick={getSpecificStores}>
          Coffee
        </button>
        <button className="category" name="Flowers" onClick={getSpecificStores}>
          Flowers
        </button>
      </div>
      <div className="category" className="store-container2">
        {renderStores}
      </div>
    </div>
  );
};

export default Home;
