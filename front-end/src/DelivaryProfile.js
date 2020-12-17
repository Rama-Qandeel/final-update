import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const DelivaryProfile = (props) => {
  const { id } = props.match.params;
  const [DelevaryId, setDelevaryId] = useState(id);
  const [Address, setAddress] = useState("");
  const [Farstname, setFarstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [doB, doBset] = useState("");
  const [email, setEmail] = useState("");
  const [userPic, setUserPic] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [PastOrders, setPastOrders] = useState([]);
  const [unassignedOrders, setunassignedOrders] = useState([]);

  const getDelevaryUser = async () => {
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

  const pastOrdersInfo = async () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/delvarymanOrders/${user.user_id}`)
      .then(async (response) => {
        setPastOrders(response.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const unassignedOrdersInfo = async () => {
    axios
      .get(`http://localhost:5000/unassignedOrders`)
      .then(async (response) => {
        setunassignedOrders(response.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const assigneeOrder = async (infoArgumnt) => {
    const user = jwt_decode(localStorage.getItem("token"));
    const body = { orders_id: infoArgumnt, delivary_user_id: user.user_id };
    axios
      .put(`http://localhost:5000/assigneeOrder`, body)
      .then(async (response) => {
        unassignedOrdersInfo();
        pastOrdersInfo(DelevaryId);
      })
      .catch((err) => {
        throw err;
      });
  };

  const delvaredOrders = PastOrders.map((e, index) => (
    <li
      className="list-group-item list-group-item-action"
      num={index + 1}
      key={index}
    >
      <div>
        <div className="col p-1 mb-2 bg-success text-white">orders_id : {e.orders_id} </div>
        <div>
          delivary name : {e.first_name} {e.last_name}
        </div>
        <div>product name : {e.product_name} </div>
        <div>store name : {e.store_name} </div>
      </div>
    </li>
  ));

  const myUnassignedOrders = unassignedOrders.map((e, index) => (
    <li
      className="list-group-item list-group-item-action"
      num={index + 1}
      key={index}
    >
      <div>
        <div className="col p-1 mb-2 bg-success text-white">orders_id : {e.orders_id} </div>
        <div>
          <img
            src={e.picture}
            alt="store pic"
            className="pPic rounded mx-auto d-block"
          ></img>
        </div>
        <div>
          customer name : {e.first_name} {e.last_name}
        </div>
        <div>product name : {e.product_name} </div>
        <div>store name : {e.store_name} </div>
        <button
          className="btn btn-primary bg-success text-white"
          onClick={() => assigneeOrder(e.orders_id)}
        >
          accept
        </button>
      </div>
    </li>
  ));

  useEffect(() => {
    getDelevaryUser();
    pastOrdersInfo();
    unassignedOrdersInfo();
  }, []);

  return (
    <div>
      <h1 className="p-3 mb-2 bg-success text-white">
        {Farstname}'s DelivaryProfile
      </h1>
      <div className="row">
        <div className="col list-group d-flex">
          <img
            src={userPic}
            alt="profile pic"
            className="pPic row rounded mx-auto d-block"
          ></img>
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
            birthday : {doB}
          </p>
          <p className="list-group-item list-group-item-action d-flex justify-content-center">
            email : {email}
          </p>
          <p className="list-group-item list-group-item-action d-flex justify-content-center">
            Phone Number : {PhoneNumber}
          </p>
        </div>
      </div>
      <div className="row" >
      <div  className="col">
        UnassignedOrders
        <ul>{myUnassignedOrders}</ul>
      </div>
      <div className="col">
        past orders
        <ul>{delvaredOrders}</ul>
      </div>
      </div>
    </div>
  );
};

export default DelivaryProfile;
