import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Content = ({ close, ...props }) => {
  const [quantity, setQuantity] = useState(1);
  const [updatequantity, setupdatequantity] = useState(quantity + 1);
  const [orderList, setOrderList] = useState([]);
  const [btnAdd, setBtnAdd] = useState(true);
  const {
    available_product,
    discount_available,
    picture,
    product_category_id,
    product_descripition,
    product_id,
    product_name,
    quantity_per_unit,
    store_id,
    unit_price,
  } = props.data;

  useEffect(() => {
    getOrders();
  }, []);

  const addToCart = () => {
    const user = jwt_decode(localStorage.getItem("token"));
    let data = {};
    if (Number(discount_available)) {
      data = {
        user_id: user.user_id,
        delivary_user_id: 0,
        store_id,
        product_id,
        product_name,
        price: (Number(unit_price) - Number(discount_available)) * quantity,
        quantity: quantity,
        picture: picture,
      };
    } else {
      data = {
        user_id: user.user_id,
        delivary_user_id: 0,
        store_id,
        product_id,
        product_name,
        price: Number(unit_price) * quantity,
        quantity: quantity,
        picture: picture,
      };
    }
    axios
      .post("http://localhost:5000/order", data)
      .then((response) => {
        createCheckOut();
        getOrders();
        window.location.reload(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  const createCheckOut = () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/createcheckout/${user.user_id}`)
      .then((response) => {})
      .catch((error) => {
        throw error;
      });
  };

  const getOrders = () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/getorder/${user.user_id}`)
      .then((response) => {
        setOrderList(response.data);
        localStorage.setItem("order", JSON.stringify(response.data));
        bntAddCart();
      })
      .catch((error) => {
        throw error;
      });
  };

  const bntAddCart = () => {
    const orders = JSON.parse(localStorage.getItem("order"));
    orders.map((order, i) => {
      if (order.product_id === product_id) {
        return setBtnAdd(false);
      }
    });
  };

  const getquant = () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/getquant/${product_id}/${user.user_id}`)
      .then((response) => {
        if (response.data.length) {
          setupdatequantity(response.data[0].quantity);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  const IncrementItem = () => {
    setQuantity(quantity + 1);
    setupdatequantity(updatequantity + 1);
  };

  const DecreaseItem = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
      setupdatequantity(updatequantity - 1);
    }
  };

  const updateQuant = (e) => {
    const user = jwt_decode(localStorage.getItem("token"));
    let data = {
      quantity: updatequantity,
      price: (Number(unit_price) - Number(discount_available)) * updatequantity,
      product_id: product_id,
      user_id: user.user_id,
    };
    axios
      .put(`http://localhost:5000/order`, data)
      .then((response) => {
        alert("done");
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div class="modal-body">
      <div class="container-fluid">
        <div class="row">
          <a className="close2" onClick={close}>
            &times;
          </a>
          <div class="col-md-4">{product_name}</div>
        </div>
        <div class="row">
          <div class="col-md-3 ml-auto">
            <img className="img-popup2" src={picture} alt={product_name} />
          </div>
          <div class="col-md-2 ml-auto">
            <h2 style={{ marginLeft: "300px", width: "200px" }}>
              {product_name}
            </h2>
            <p style={{ marginLeft: "300px", width: "200px" }}>
              {product_descripition}
            </p>
            {Number(discount_available) ? (
              <div style={{ marginLeft: "300px", width: "200px" }}>
                <h3 style={{ color: "red" }}>-{discount_available} off</h3>
                <spam style={{ textDecoration: "line-through" }}>
                  {unit_price}
                  {quantity_per_unit}
                </spam>
                <spam style={{ color: "red" }}>
                  {unit_price - discount_available}
                  {quantity_per_unit}
                </spam>
              </div>
            ) : (
              <div>
                <h2 style={{ marginLeft: "300px" }}>
                  {unit_price}
                  {quantity_per_unit}
                </h2>
              </div>
            )}
            <p style={{ marginLeft: "300px" }}>Quantity:</p>
            {btnAdd ? getquant() : null}
            {btnAdd ? (
              <div style={{ marginLeft: "300px", width: "200px" }}>
                <button className="button-popup2" onClick={IncrementItem}>
                  +
                </button>
                <input className="input-popup" type="text" value={quantity} />
                <button className="button-popup2" onClick={DecreaseItem}>
                  -
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  className="button-popup"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <div style={{ marginLeft: "300px", width: "200px" }}>
                <button className="button-popup2" onClick={IncrementItem}>
                  +
                </button>
                <input
                  className="input-popup"
                  type="text"
                  value={updatequantity}
                />
                <button className="button-popup2" onClick={DecreaseItem}>
                  -
                </button>
                <button className="button-popup" onClick={updateQuant}>
                  update Quant
                </button>
              </div>
            )}
          </div>
        </div>
        <div class="col-4 col-sm-6">online.com</div>
      </div>
    </div>
  );
};

export default Content;
