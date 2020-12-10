import React, { useState, useEffect } from "react";
import Store from "./Store";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  let [stores, setStores] = useState([]);

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
        <button onClick={getAllStores}>All</button>
        <button name="Groceries" onClick={getSpecificStores}>
          Groceries
        </button>
        <button name="Bakery" onClick={getSpecificStores}>
          Bakery
        </button>
        <button name="Coffee" onClick={getSpecificStores}>
          Coffee
        </button>
        <button name="Flowers" onClick={getSpecificStores}>
          Flowers
        </button>
      </div>
      <div className="store-container2">{renderStores}</div>
    </div>
  );
};

export default Home;
