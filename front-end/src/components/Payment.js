import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Payment = ({ close, ...props }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [payment, setPayment] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === "Card Number") {
      setCardNumber(event.target.value);
    }
    if (event.target.name === "Expiration") {
      setExpiration(event.target.value);
    }
    if (event.target.name === "CVV") {
      setCvv(event.target.value);
    }
    if (event.target.name === "cash") {
      setPayment("cash");
      setShow(false);
    }
    if (event.target.name === "Card") {
      setPayment("card");
      setShow(true);
    }
  };

  const handleSubmit = (event) => {
    const user = jwt_decode(localStorage.getItem("token"));
    let data = {};
    if (payment === "Card") {
      data = {
        user_id: user.user_id,
        payment_type: payment,
        check_out_id: props.data[0].check_out_id,
        credit_card: cardNumber,
        expiration: expiration,
        cvv: cvv,
      };
    } else {
      data = {
        user_id: user.user_id,
        payment_type: payment,
      };
    }
    axios
      .post("http://localhost:5000/payment", data)
      .then((response) => {
        if (response.data) {
          alert(" a payment created successfully");
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div
      className="modal-body"
      style={{ boxShadow: "5px 10px 10px 5px #888888" }}
    >
      <div class="container-fluid">
        <div class="row">
          <a className="close2" onClick={close}>
            &times;
          </a>
        </div>
        <div>
          <input
            type="checkbox"
            name="cash"
            value={payment}
            onChange={handleChange}
          />
          <label for="cash"> Cash on delivery</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="Card"
            value={payment}
            onChange={handleChange}
          />
          <label for="card"> Add Credit Card</label>
          {show ? (
            <div style={{ marginTop: "10px" }}>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Card Number
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  type="text"
                  name="Card Number"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Expiration
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  type="text"
                  name="Expiration"
                  placeholder="Expiration"
                  CVV
                  value={expiration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    CVV
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  type="text"
                  name="CVV"
                  placeholder="CVV"
                  value={cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ) : null}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => close()}
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            style={{ backgroundColor: "green" }}
            onClick={() => {
              handleSubmit();
              close();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
