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
      console.log('rrrrrrrrrrr',Number(discount_available));


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
        createCheckOut()
        getOrders();
      })
      .catch((error) => {
        throw error;
      });
  };

const createCheckOut=()=>{
  const user = jwt_decode(localStorage.getItem("token"));

  axios
      .get(`http://localhost:5000/createcheckout/${user.user_id}`)
      .then((response) => {
      })
      .catch((error) => {
        throw error;
      });
}


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
      price: (Number(unit_price) -Number(discount_available)) * updatequantity,
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
    <div className="modal2">
      <a className="close2" onClick={close}>
        &times;
      </a>
      <div className="header2"> {product_name} </div>
      <div className="content2">
        <img className="img-popup2" src={picture} alt={product_name} />
        <div className="info-popup2">
          <h2>{product_name}</h2>
          <p>{product_descripition}</p>
          {Number(discount_available) ? (
            <div>
              <h3 style={{ color: "red" }}>-{discount_available} off</h3>
              <spam style={{ textDecoration: "line-through" }}>
                {unit_price}
                {quantity_per_unit}
              </spam>
              <spam style={{ color: "red" }}>
                {" "}
                {unit_price - discount_available}
                {quantity_per_unit}
              </spam>
            </div>
          ) : (
            <div>
              <p>
                {unit_price}
                {quantity_per_unit}
              </p>
            </div>
          )}
          <p>Quantity:</p>
          {btnAdd ? getquant() : null}
          {btnAdd ? (
            <div>
              <input type="text" value={quantity} />
              <button onClick={IncrementItem}>+</button>
              <button onClick={DecreaseItem}>-</button>
              <button onClick={addToCart}>Add to Cart</button>
            </div>
          ) : (
            <div>
              <input type="text" value={updatequantity} />
              <button onClick={IncrementItem}>+</button>
              <button onClick={DecreaseItem}>-</button>
              <button onClick={updateQuant}>update Quant</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
