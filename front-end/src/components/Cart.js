import React, { useState, useEffect } from "react";
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
    const data = {
      orders_id: e.target.value,
    };
    axios
      .delete(`http://localhost:5000/order/${e.target.value}`)
      .then((response) => {
        // console.log('response',response.data);
        getOrders();
        getOrderslocal();
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
        // console.log('response',response.data);
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
      <div>
        <div className="order">
          <img src={product.picture} />
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
          <button onClick={deleteOrder} value={product.orders_id}>
            Remove
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      {render}
      <button>
        Go to checkout
        <input type="text" value={sum} />
      </button>
    </div>
  );
};

export default Cart;
