import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import StoreProfile from "./StoreProfile";
import Popup from "reactjs-popup";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const CSTprofile = (props) => {
  const { id } = props.match.params;
  const [userId, setUserId] = useState(id);
  const [Address, setAddress] = useState("");
  const [Farstname, setFarstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [doB, doBset] = useState("");
  const [email, setEmail] = useState("");
  const [userPic, setUserPic] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Info, setInfo] = useState();
  const [orders, setOrders] = useState([]);
  const [Unassigned, setUnassigned] = useState(["Unassigned"]);
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState("storeid");
  const [userStore, setStore] = useState(["store"]);
  const [isRedirect, setRedirect] = useState(false);
  
  const getUser = async () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/users/${user.user_id}`)
      .then(async (response) => {
        if (response.data.length === 0) {
          alert("wrong user id");
        }
        setAddress(response.data[0].address);
        setFarstname(response.data[0].first_name);
        setLastname(response.data[0].last_name);
        doBset(response.data[0].birthday);
        setEmail(response.data[0].email);
        setUserPic(response.data[0].image_profile);
        setPhoneNumber(response.data[0].phone_number);
      })
      .catch((err) => {
        throw err;
      });
  };

  const getOrdersInfo = async () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/usersOrders/${user.user_id}`)
      .then(async (response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const getStores = async () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/store/${user.user_id}`)
      .then(async (response) => {
        setStores(response.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const deleteStore = async (infoArgumnt) => {
    axios
      .delete(`http://localhost:5000/store/${infoArgumnt}`)
      .then(async (response) => {
        getStores();
      })
      .catch((err) => {
        throw err;
      });
  };

  const getunassignedOrdersInfo = async () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/unassignedOrders/${user.user_id}`)
      .then(async (response) => {
        setUnassigned(response.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const cancelOrder = async (infoArgumnt) => {
    axios
      .delete(`http://localhost:5000/assigneeOrder/${infoArgumnt}`)
      .then(async (response) => {
        getunassignedOrdersInfo(userId);
        getOrdersInfo();
      })
      .catch((err) => {
        throw err;
      });
  };

  const updatePic = async () => {
    const data = { image_profile: userPic };
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .put(`http://localhost:5000/updatePic/${user.user_id}`, data)
      .then(async (response) => {
        getunassignedOrdersInfo(userId);
        getOrdersInfo();
      })
      .catch((err) => {
        throw err;
      });
  };

  const userUnassignedOrders = Unassigned.map((e, index) => (
    <li
      className="list-group-item list-group-item-action "
      num={index + 1}
      key={index}
    >
      <div>
        <div className=" col p-1 mb-2 bg-success text-white">
          orders_id : {e.orders_id}{" "}
        </div>
        <div>
          <img
            src={e.picture}
            alt="store pic"
            className="pPic rounded mx-auto d-block"
          ></img>{" "}
        </div>
        <div>product name : {e.product_name} </div>
        <div>store name : {e.store_name} </div>
        <button
          className="btn btn-primary bg-success text-white"
          onClick={() => cancelOrder(e.orders_id)}
        >
          cancel order
        </button>
      </div>
    </li>
  ));

  const userOrders = orders.map((e, index) => (
    <li
      className="list-group-item list-group-item-action store"
      num={index + 1}
      key={index}
    >
      <div>
        <div className=" col p-1 mb-2 bg-success text-white">
          orders_id : {e.orders_id}{" "}
        </div>
        <div>
          delivary name : {e.first_name} {e.last_name}
        </div>
        <div>product name : {e.product_name} </div>
        <div>store name : {e.store_name} </div>
        <div>item id : {e.item_id} </div>
        <div>
          <img
            src={e.picture}
            alt="store pic"
            className="pPic rounded mx-auto d-block"
          ></img>{" "}
        </div>
      </div>
    </li>
  ));

  const userStores = stores.map((e, index) => (
    <li
      className="list-group-item list-group-item-action"
      num={index + 1}
      key={index}
    >
      <button
        className="btn btn-primary  bg-success text-white"
        onClick={() => deleteStore(e.store_id)}
      >
        X
      </button>
      <a href={`/store/${e.store_id}`} className="storeLink">
        <div
          onClick={() => {
            setStoreId(e.store_id);
          }}
        >
          <div>store name : {e.store_name} </div>
          <div className="col p-1 mb-2 bg-success text-white">
            store id : {e.store_id}
          </div>
          <div>store category : {e.store_category} </div>
          <div>
            <img
              src={e.store_pic}
              alt="store pic"
              className="pPic rounded mx-auto d-block"
            ></img>
          </div>
        </div>
      </a>
    </li>
  ));

  useEffect(() => {
    getOrdersInfo();
    getStores();
    getUser();
    getunassignedOrdersInfo();
  }, []);

  return (
    <Router>
      <div className="container">
        {/* <img
         src={userPic}
         alt="pic"
         style={{float:"right",marginTop:"-53px" ,marginRight:"60px",borderRadius:"150px"}} className="headerpPic"
       ></img> */}
        <div className="row">
          <div className="col list-group">
            <div className="d-flex justify-content-center">
              <img src={userPic} alt="profile pic" className="mPic"></img>
              <Popup
                trigger={<button> &#x2710; </button>}
                position="right center"
              >
                {(close) => (
                  <div>
                    <div>
                      insert new picture
                      <input
                        placeholder="new URL"
                        onChange={(e) => setUserPic(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => {
                        updatePic();
                        close();
                      }}
                    >
                      done
                    </button>
                  </div>
                )}
              </Popup>
            </div>
            <div className="d-flex justify-content-center thead-dark display-3">
              {Farstname} {Lastname}
            </div>
            <p className="list-group-item list-group-item-action d-flex justify-content-center">
              Address : {Address}
            </p>
            <p className="list-group-item list-group-item-action d-flex justify-content-center">
              First name : {Farstname}
            </p>
            <p className="list-group-item list-group-item-action d-flex justify-content-center">
              Last name:{Lastname}
            </p>
            <p className="list-group-item list-group-item-action d-flex justify-content-center">
              Birthday : {doB}
            </p>
            <p className="list-group-item list-group-item-action d-flex justify-content-center">
              Email : {email}
            </p>
            <p className="list-group-item list-group-item-action d-flex justify-content-center">
              Phone Number : {PhoneNumber}
            </p>
          </div>
          <div className="row ">
            <div className="col-4 list-group">
              <ul>
                <p class="thead-dark display-3">
                  {Farstname} Unassigned Orders
                </p>
                {userUnassignedOrders}{" "}
              </ul>
            </div>
            <div className="col-4 list-group">
              <ul>
                <p class="thead-dark display-3">{Farstname} orders</p>
                {userOrders}
              </ul>
            </div>
            <div className="col-4 list-group">
              <ul>
                <p className="thead-dark display-3">{Farstname} stores</p>
                {userStores}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default CSTprofile;
