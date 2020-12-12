import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Payment = ({ close, ...props }) => {
  const[cardNumber,setCardNumber]=useState("")
  const[expiration,setExpiration]=useState("")
  const[cvv,setCvv]=useState("")



  return (
    <div className="modal2">
      <a className="close2" onClick={close}>
        &times;
      </a>
   <input
   type="text"
   placeholder="Card Number"
   value={cardNumber}
   />
     <input
   type="text"
   placeholder="Expiration"CVV
   value={expiration}
   />
    <input
   type="text"
   placeholder="CVV"
   value={cvv}
   />
   <div>
   <button>Cancel</button>
   <button>Continue</button>
   </div>
</div>

  );
};

export default Payment;





