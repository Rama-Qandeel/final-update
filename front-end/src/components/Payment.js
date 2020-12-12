import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Payment = ({ close, ...props }) => {
  const[cardNumber,setCardNumber]=useState("")
  const[expiration,setExpiration]=useState("")
  const[cvv,setCvv]=useState("")
  const[payment,setPayment] =useState("") 
  const [show,setShow]=useState(false)

// console.log("ggggg",props.data[0].check_out_id);
// const showitems=()=>{
//   setShow(true)
// }


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
      setShow(false)
    }
    if (event.target.name === "Card") {
      setPayment("card"); 
      setShow(true)
    }
}


const handleSubmit = (event) => {
  const user = jwt_decode(localStorage.getItem("token"));
  let data={}
  if(payment=== "Card"){
   data = {
    user_id:user.user_id,
    payment_type:payment,
    check_out_id:props.data[0].check_out_id,
    credit_card:cardNumber,
    expiration:expiration,
    cvv:cvv
  }
}else{
 data = {
      user_id:user.user_id,
      payment_type:payment,
    }
  }
  axios
    .post("http://localhost:5000/payment",data)
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
    <div className="modal2">
      <a className="close2" onClick={close}>
        &times;
      </a>
      <input type="checkbox" 
              name="cash"
               value={payment}
               onChange={handleChange}
              />
             <label for="cash"> Cash on delivery</label>
                 <input type="checkbox"
               name="Card"
                value={payment}
                onChange={handleChange}
                />
    <label for="card"> Add Credit Card</label>
   
   {show?(<div><input
   type="text"
   name ="Card Number"
   placeholder="Card Number"
   value={cardNumber}
   onChange={handleChange}
   />
     <input
   type="text"
  name="Expiration"
   placeholder="Expiration"CVV
   value={expiration}
   onChange={handleChange}
   />
    <input
   type="text"
   name="CVV"
   placeholder="CVV"
   value={cvv}
   onChange={handleChange}
   /></div>):(null)}
   
   <div>
   <button  onClick={close} >Cancel</button>
   <button onClick={()=>{handleSubmit(); close()}} >Continue</button>
   </div>
</div>

  );
};

export default Payment;





