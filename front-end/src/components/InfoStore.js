import React, { useState, useEffect } from "react";
import Product from "./components/Product";
import { Link } from "react-router-dom";
import axios from "axios";

const InfoStore = (props) => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = () => {
    let data = { store_id: props.location.state.store_id };
    axios
      .post("http://localhost:5000/getproduct", data)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearchProduct(e.target.value);
    if (searchProduct) {
      axios
        .get(
          `http://localhost:5000/getsearch?search=${e.target.value}&id=${props.location.state.store_id}`
        )
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          throw error;
        });
    }
    getproducts();
  };

  const chooseStore = () => {
    props.history.push("/home");
  };
  
  const renderProducts = products.map((product) => <Product data={product} />);

  return (
    <div>
      <div className="search-container">
        <input
          className="search"
          type="search"
          placeholder={`Search ${props.location.state.store_name}...`}
          onChange={handleOnChange}
          value={searchProduct}
        />
      </div>
      {products.length ? (
        <div className="store-container">{renderProducts}</div>
      ) : (
        <div>
          <h2>Product not found in this store</h2>
          <button onClick={chooseStore}>Choose another store</button>
        </div>
      )}
    </div>
  );
};

export default InfoStore;
