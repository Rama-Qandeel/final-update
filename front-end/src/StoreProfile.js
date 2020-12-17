import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const StoreProfile = (props) => {
  const { id } = props.match.params;
  const [userStore, setStore] = useState(["store"]);
  const [storeId, setStoreId] = useState(id);
  const [storeOrders, setStoreOrder] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [productName, setproductName] = useState();
  const [productDescripition, setProductDescripition] = useState();
  const [quantityPerUnit, setQuantityPerUnit] = useState();
  const [unitPrice, setPrice] = useState();
  const [availableProduct, setAvailableProduct] = useState();
  const [Picture, setPicture] = useState();
  const [update, setUpdate] = useState(false);

  const getStorebyid = async (infoArgumnt) => {
    axios
      .get(`http://localhost:5000/mystore/${infoArgumnt}`)
      .then(async (response) => {
        setStore(response.data[0]);
      })
      .catch((err) => {
        throw err;
      });
  };

  const storesOrdersbyid = async (infoArgumnt) => {
    axios
      .get(`http://localhost:5000/storesOrders/${infoArgumnt}`)
      .then(async (response) => {
        setStoreOrder(response.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const storesProductbyid = async (infoArgumnt) => {
    axios
      .get(`http://localhost:5000/storeproducts/${infoArgumnt}`)
      .then(async (response) => {
        setStoreProducts(response.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const deleteProduct = async (infoArgumnt) => {
    axios
      .delete(`http://localhost:5000/product/${infoArgumnt}`)
      .then(async (response) => {
        storesProductbyid(storeId);
      })
      .catch((err) => {
        throw err;
      });
  };

  const updateProduct = async (infoArgumnt) => {
    const arrData = {
      product_id: infoArgumnt,
      product_name: productName,
      product_descripition: productDescripition,
      quantity_per_unit: quantityPerUnit,
      unit_price: unitPrice,
      available_product: availableProduct,
      picture: Picture,
    };
    axios
      .put(`http://localhost:5000/product`, arrData)
      .then(async (response) => {
        storesProductbyid(storeId);
      })
      .catch((err) => {
        throw err;
      });
  };

  const storeOrdersList = storeOrders.map((e, index) => (
    <li
      className="list-group-item list-group-item-action "
      num={index + 1}
      key={index}
    >
      <div>
       
        <div className="bg-success text-white">order id : {e.orders_id} </div>
        <div >
          delivary name : {e.first_name} {e.last_name}
        </div>
        <div>product name : {e.product_name} </div>
        <div>store name : {e.store_name} </div>
      </div>
    </li>
  ));

  const storeProductsList = storeProducts.map((e, index) => (
    <li
      className="list-group-item list-group-item-action "
      num={index + 1}
      key={index}
    >
      <div>
        <div className="bg-success text-white">
          product number : {index + 1}
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-light"
              onClick={() => deleteProduct(e.product_id)}
            >
              d
            </button>
            <Popup
              trigger={<button className="btn btn-outline-light"> u</button>}
              position="left center"
            >
              <div>
                <p>
                  <input
                    onChange={(e) => setproductName(e.target.value)}
                    placeholder="new Name"
                  />
                </p>
                <p>
                  <input
                    onChange={(e) => setProductDescripition(e.target.value)}
                    placeholder="new Descripition"
                  />
                </p>
                <p>
                  <input
                    onChange={(e) => setQuantityPerUnit(e.target.value)}
                    placeholder="new QuantityPerUnit"
                  />
                </p>
                <p>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="new Price"
                  />
                </p>
                <p>
                  <input
                    onChange={(e) => setAvailableProduct(e.target.value)}
                    placeholder="is available "
                  />
                </p>
                <p>
                  <input
                    onChange={(e) => setPicture(e.target.value)}
                    placeholder="new Picture"
                  />
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => updateProduct(e.product_id)}
                >
                  u
                </button>
              </div>
            </Popup>
          </div>
        </div>
        <div>product name : {e.product_name}</div>
        <div>product descripition : {e.product_descripition}</div>
        <div>price : {e.unit_price}</div>
        <div>available product : {e.available_product}</div>
        <div>quantity per unit product : {e.quantity_per_unit} </div>
        <img
          src={e.picture}
          alt="product pic"
          className="pPic rounded mx-auto d-block"
        ></img>
      </div>
    </li>
  ));

  useEffect(() => {
    getStorebyid(storeId);
    storesOrdersbyid(storeId);
    storesProductbyid(storeId);
  }, []);

  return (
    <Router>
      <div>
        <div className="list-group-item list-group-item-action">
          <h1 className="rounded-pill bg-success">store name : {userStore.store_name}</h1>
        <div>
          <img
            src={userStore.store_pic}
            alt="store pic"
            className="pPic  rounded mx-auto d-block"
          ></img>
        </div>
          <div className="list-group-item list-group-item-action d-flex justify-content-center">store id :{userStore.store_id} </div>
          <div className="list-group-item list-group-item-action d-flex justify-content-center">store category : {userStore.store_category} </div>
        </div >
        <div className="row" >
        <div  className="col p-3 mb-2 bg-success text-white" > {`    |`} store Orders List
          <ul className="text-white">{storeOrdersList}</ul>
        </div>
        <div  className="col p-3 mb-2 bg-success text-white"> {`    |`}  Products List
          <ul>{storeProductsList}</ul>
        </div>
        </div>
      </div>
    </Router>
  );
};

export default StoreProfile;
