import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Payment from "./Payment";
import Popup from "reactjs-popup";

const Check = (props) => {
  const [checkOut, setCheckOut] = useState([]);
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setid] = useState("");

  useEffect(() => {
    CheckOut();
  }, []);

  const showitems = () => {
    setShow(true);
  };

  const closeItems = () => {
    setShow(false);
  };

  const CheckOut = () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/checkout/${user.user_id}`)
      .then((response) => {
        setCheckOut(response.data);
        getOrderstocheck();
      })
      .catch((error) => {
        throw error;
      });
  };

  const getOrderstocheck = () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/getOrderstocheck/${user.user_id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const summary = checkOut.map((ele, i) => {
    return (
      <div>
        <p
          style={{
            borderBottom: "1px solid gray",
            lineHeight: "1.3",
            paddingBottom: "10px",
            paddingTop: "10px",
            fontSize: " 18px",
            fontWeight: "400",
          }}
        >
          Number of order : {ele.check_out_id}
        </p>
      </div>
    );
  });

  let renderOrder = orders.map((product) => {
    return (
      <div>
        <div className="order" style={{ boxShadow: "2px 2px  #888888" }}>
          <div style={{ textAlign: "center", display: "flex" }}>
            <div style={{ paddingTop: "10px" }}>
              <img src={product.picture} />
              <p>{product.product_name}</p>
              <p>
                quantity:
                <spam> {product.quantity}</spam>
              </p>
              <p>price:{product.price}JD</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          paddingTop: "30px",
          position: "relative",
          width: "50%",
          paddingRight: "15px",
          paddingLeft: "15px",
          margin: " 30px auto",
          boxShadow: "2px 2px 2px 2px #888888",
        }}
      >
        <h2>Order Summary</h2>
        {summary}
        {show ? (
          <div>
            <div>
              <p
                style={{
                  borderBottom: "1px solid gray",
                  lineHeight: "1.3",
                  paddingBottom: "10px",
                  fontSize: " 18px",
                  fontWeight: "400",
                }}
              >
                Items
                <img
                  style={{
                    width: "13px",
                    float: "right",
                    paddingTop: "6px",
                    cursor: "pointer",
                  }}
                  onClick={closeItems}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYoaR7UOz01U5Q77By9R4xvlhjekZzdCbb9g&usqp=CAU"
                  alt="arrow"
                ></img>
              </p>
            </div>
            {renderOrder}
          </div>
        ) : (
          <div>
            <div>
              <p
                style={{
                  borderBottom: "1px solid gray",
                  lineHeight: "1.3",
                  paddingBottom: "10px",
                  fontSize: " 18px",
                  fontWeight: "400",
                }}
              >
                Items
                <img
                  style={{
                    float: "right",
                    paddingTop: "6px",
                    cursor: "pointer",
                  }}
                  onClick={showitems}
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEyIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNiA1LjQ3NjRMMTAuMzg4IDEuMDg4NEMxMC41MjggMC45NDgzOTggMTAuNzU2IDAuOTQ4Mzk4IDEwLjg5NSAxLjA4ODRDMTEuMDM1IDEuMjI4NCAxMS4wMzUgMS40NTU0IDEwLjg5NSAxLjU5NDRMNi4yNTYgNi4yMzQ0TDYuMjU0IDYuMjM3NEM2LjE4NCA2LjMwNzQgNi4wOTIgNi4zNDI0IDYgNi4zNDI0QzUuOTA4IDYuMzQyNCA1LjgxNiA2LjMwNzQgNS43NDYgNi4yMzc0TDUuNzQ0IDYuMjM0NEwxLjEwNSAxLjU5NDRDMC45NjUgMS40NTQ0IDAuOTY1IDEuMjI3NCAxLjEwNSAxLjA4ODRDMS4yNDUgMC45NDgzOTggMS40NzMgMC45NDgzOTggMS42MTIgMS4wODg0TDYgNS40NzY0WiIgZmlsbD0iIzc1NzU3NSIgc3Ryb2tlPSIjNzU3NTc1IiBzdHJva2Utd2lkdGg9IjAuOCIvPgo8L3N2Zz4K"
                  alt="arrow"
                ></img>
              </p>
            </div>
          </div>
        )}
        <Popup
          modal
          trigger={
            <div>
              <div>
                <p
                  style={{
                    lineHeight: "1.3",
                    paddingBottom: "25px",
                    fontSize: " 18px",
                    fontWeight: "400",
                  }}
                >
                  Choose a payment method
                  <img
                    style={{
                      float: "right",
                      paddingTop: "6px",
                      cursor: "pointer",
                    }}
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEyIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNiA1LjQ3NjRMMTAuMzg4IDEuMDg4NEMxMC41MjggMC45NDgzOTggMTAuNzU2IDAuOTQ4Mzk4IDEwLjg5NSAxLjA4ODRDMTEuMDM1IDEuMjI4NCAxMS4wMzUgMS40NTU0IDEwLjg5NSAxLjU5NDRMNi4yNTYgNi4yMzQ0TDYuMjU0IDYuMjM3NEM2LjE4NCA2LjMwNzQgNi4wOTIgNi4zNDI0IDYgNi4zNDI0QzUuOTA4IDYuMzQyNCA1LjgxNiA2LjMwNzQgNS43NDYgNi4yMzc0TDUuNzQ0IDYuMjM0NEwxLjEwNSAxLjU5NDRDMC45NjUgMS40NTQ0IDAuOTY1IDEuMjI3NCAxLjEwNSAxLjA4ODRDMS4yNDUgMC45NDgzOTggMS40NzMgMC45NDgzOTggMS42MTIgMS4wODg0TDYgNS40NzY0WiIgZmlsbD0iIzc1NzU3NSIgc3Ryb2tlPSIjNzU3NTc1IiBzdHJva2Utd2lkdGg9IjAuOCIvPgo8L3N2Zz4K"
                    alt="arrow"
                  ></img>
                </p>
              </div>
            </div>
          }
        >
          {(close) => <Payment close={close} data={checkOut} />}
        </Popup>
      </div>

      <div style={{ textAlign: "center", margin: " 30px auto" }}>
        <button class="btn btn-secondary">Confirm Order</button>
      </div>
    </div>
  );
};

export default Check;
