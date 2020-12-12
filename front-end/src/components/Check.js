import React, { useEffect,useState } from 'react'
import jwt_decode from "jwt-decode";
import axios from "axios";

const Check =(props)=> {
 const[checkOut,setCheckOut] =useState([]) 
 const[payment,setPayment] =useState("") 
 const[orders,setOrders] =useState([]) 

    
    useEffect(() => {
        CheckOut();
      }, []);   
    
    
    
    const CheckOut=()=>{
        const user = jwt_decode(localStorage.getItem("token"));
        axios
            .get(`http://localhost:5000/checkout/${user.user_id}`)
            .then((response) => {
                // console.log('response check',response.data[0].orders_id);
                setCheckOut(response.data)
                getOrderstocheck()
            })
            .catch((error) => {
              throw error;
            });
      }

      const getOrderstocheck=()=>{
        const user = jwt_decode(localStorage.getItem("token"));
        axios
            .get(`http://localhost:5000/getOrderstocheck/${user.user_id}`)
            .then((response) => {
               console.log('chexxx',response.data);
              setOrders(response.data)
            })
            .catch((error) => {
              throw error;
            });
      }
    const summary= checkOut.map((ele,i)=>{
     
    return    <div>
             <p>Number of order: {ele.check_out_id}</p>
                    <p>Name delivary man:{ele.first_name} {ele.last_name}</p>
                     <p>price : </p>
       
            </div>
                    })
                   
                    let renderOrder = orders.map((product) => {
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
                          
                          </div>
                        </div>
                      );
                    });
                  
                    const handleChange = (event) => {
                      if (event.target.name === "cash") {
                        setPayment("cash");
                      }
                      if (event.target.name === "Card") {
                        setPayment("card");  }
                    }





    return (
            <div style={{ textAlign:"center" }}>
                <h2>Order Summary</h2>
             {summary}
             {renderOrder}
             <input type="checkbox" 
              name="cash"
               value={payment}
               onChange={handleChange}
              />
             <label for="cash"> Cash on delivery</label>
           <div><input type="checkbox"
           name="Card"
            value={payment}
            onChange={handleChange}
            />
            
             <label for="card"> Add Credit Card</label></div>
            <div> <button> Choose a payment method</button></div>
            <div>
              Done? Complete your order 
              <button>Confirm Order</button>
            </div>
            </div>
            
        )
    }


export default Check;
