import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Cart = (props) => {
  const [orderList, setOrderList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [order, setOrderId] = useState("");
  const [sum, setSum] = useState(0);

  useEffect(() => {
    getOrders();
    getOrderslocal();
  }, []);

  const getOrders = async () => {
    const user = jwt_decode(localStorage.getItem("token"));
    let data = { user_id: user.user_id };
    axios
      .get(`http://localhost:5000/getorder/${user.user_id}`)
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const deleteOrder = (e) => {
    axios
      .delete(`http://localhost:5000/order/${e}`)
      .then((response) => {
        getOrders();
        getOrderslocal();
        window.location.reload(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  const updateOrder = (e) => {
    const data = {
      quantity,
      orders_id: e.target.value,
    };
    axios
      .put(`http://localhost:5000/order`, data)
      .then((response) => {
        getOrders();
      })
      .catch((error) => {
        throw error;
      });
  };

  const sumOrderPrice = () => {
    getOrderslocal();
    const order = JSON.parse(localStorage.getItem("order"));
    let price = 0;
    if (order.length) {
      order.forEach((ele, i) => {
        price += Number(ele.price);
      });
      return setSum(price);
    } else {
      setSum(0);
    }
  };

  const getOrderslocal = () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/getorder/${user.user_id}`)
      .then((response) => {
        setOrderList(response.data);
        localStorage.setItem("order", JSON.stringify(response.data));
        sumOrderPrice();
      })
      .catch((error) => {
        throw error;
      });
  };

  let render = orderList.map((product) => {
    return (
      <li className="order">
        <img
          style={{ margin: "4px auto", marginLeft: "4px" }}
          src={product.picture}
        />
        <p>{product.product_name}</p>
        <p>
          quantity:
          <input
            type="text"
            value={product.quantity}
            style={{ width: "20px" }}
          />
        </p>
        <p>price:{product.price}JD</p>
        <button
          onClick={() => {
            deleteOrder(product.orders_id);
          }}
        >
          Remove
        </button>
      </li>
    );
  });

  return (
    <div>
      {orderList.length ? (
        <div>
          <div className="thead-dark display-3 mycart1"></div>
          <div>
            <ul>{render}</ul>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "2px ",
              marginRight: "450px",
            }}
          >
            <Link
              className="link"
              to={{
                pathname: `/checkout`,
                state: sum,
              }}
              style={{ textDecoration: "none" }}
            >
              <button
                class="btn btn-primary"
                style={{ backgroundColor: "green", width: "30%" }}
              >
                Go to checkout
                <span
                  style={{
                    border: "2px black solid",
                    backgroundColor: "white",
                    color: "black",
                    marginLeft: "10px",
                  }}
                >
                  {sum}
                </span>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: "40px", paddingBottom: " 40px" }}>
          <div
            data-v-ffe924c8=""
            style={{
              padding: "0 15px",
              display: "flex",
              justifyContent: "center",
            }}
            data-radium="true"
          >
            <svg
              data-v-ffe924c8=""
              width="70px"
              height="70px"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                data-v-ffe924c8=""
                fill="#bdbdbd"
                d="M6.316 18c1.39 0 2.526 1.125 2.526 2.5S7.705 23 6.316 23c-1.39 0-2.527-1.125-2.527-2.5S4.926 18 6.316 18zm0 1c-.84 0-1.527.68-1.527 1.5S5.476 22 6.316 22c.84 0 1.526-.68 1.526-1.5S7.155 19 6.316 19zm11.368-1c1.39 0 2.527 1.125 2.527 2.5S19.074 23 17.684 23c-1.39 0-2.526-1.125-2.526-2.5s1.137-2.5 2.526-2.5zm0 1c-.84 0-1.526.68-1.526 1.5s.687 1.5 1.526 1.5c.84 0 1.527-.68 1.527-1.5s-.687-1.5-1.527-1.5zM5.305 15.75l15.537-.5c.38 0 .632.25.632.625s-.253.625-.632.625l-16.42.5c-.38.125-.759-.375-.633-.75l.758-2.375c.253-.625.253-1.125.127-1.75L3.41 5.25c-.127-.625-.632-1-1.264-1H.632C.252 4.25 0 4 0 3.625S.253 3 .632 3h22.105C23.495 3 24 3.5 24 4.25v7.125c0 .625-.505 1.125-1.137 1.25L5.684 14.5l-.379 1.25zm17.364-4.106c.21-.042.331-.17.331-.269V4.25c0-.195-.055-.25-.263-.25H3.872c.254.288.437.65.522 1.07l1.26 6.857c.117.582.138 1.083.05 1.565l16.965-1.848z"
              ></path>
            </svg>
          </div>
          <h4
            style={{
              marginTop: " 20px",
              textAlign: "center",
              fontSize: " 20px",
              fontWeight: 600,
            }}
          >
            Your personal cart is empty
          </h4>
          <Link to="/home">
            <div style={{ textAlign: "center", marginTop: " 20px" }}>
              <button
                class="btn btn-primary"
                style={{ backgroundColor: "green", textAlign: "center" }}
              >
                Shop now
              </button>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
