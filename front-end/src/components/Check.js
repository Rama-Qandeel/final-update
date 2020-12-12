import React, { useEffect,useState } from 'react'
import jwt_decode from "jwt-decode";
import axios from "axios";
import Payment from "./Payment"
import Popup from "reactjs-popup";

const Check =(props)=> {
 const[checkOut,setCheckOut] =useState([]) 
 const[payment,setPayment] =useState("") 
 const[orders,setOrders] =useState([]) 
const [show,setShow]=useState(false)
    
    useEffect(() => {
        CheckOut();
      }, []);   
    
    const showitems=()=>{
      setShow(true)
    }
    const closeItems=()=>{
      setShow(false)
    }



    
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
           <div><p> Items <button onClick={showitems}>show</button></p></div>
            {show?(<div>
              <button onClick={closeItems} 
              style={{ float:"right",
              marginTop:"-50px"
              }}>close</button>
              {renderOrder}
              </div>):(null)}
             
             <input type="checkbox" 
              name="cash"
               value={payment}
               onChange={handleChange}
              />
             <label for="cash"> Cash on delivery</label>
             <Popup modal trigger={
               <div  style={{ width:"30%", textAlign:"center"
               ,marginLeft:"350px"
               }}>
                 <input type="checkbox"
               name="Card"
                value={payment}
                onChange={handleChange}
                />
   <label for="card"> Add Credit Card</label>

       </div> }>
        {close => <Payment  close={close}/>}
        </Popup>
             
             
            <div> <button> Choose a payment method</button></div>
            <div>
              Done? Complete your order 
              <button>Confirm Order</button>
            </div>
            </div>
          
        )
    }


export default Check;
