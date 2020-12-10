import React, { useState,useEffect } from "react";
import Popup from "reactjs-popup";
import Content from "./Content.js";
import ContentSold from "./ContentSold.js";
const Product = (props) => {
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
 




  return (
  <div>
    {!available_product?(<div>
      <Popup modal trigger={
    <div className="store">
     
      <img src={picture} alt={product_name} />
      <div className="store-info">
        <h3>{product_name}</h3>
      </div>
      {Number(discount_available)?(<div>
      <h3 style={{color: "red"}}>{discount_available} off</h3>
      <spam style={{textDecoration:"line-through"}}>
        {unit_price}{quantity_per_unit}</spam>
        <spam style={{color:"red"}}> {unit_price - discount_available}{quantity_per_unit}</spam>
      
    </div>):(<div>
      <p>
        {unit_price}{quantity_per_unit}
      </p>
    </div>)}
      
      <div>
        <spam>{product_descripition}</spam>
      </div>
    </div>
    }>
      {close =>  <Content  close={close} data={props.data}/>}
      </Popup>

    </div>):( <Popup modal trigger={
    <div className="store">
     <h3 style={{color: "red"}}>Out of stock</h3>
      <img src={picture} alt={product_name} />
      <div className="store-info">
        <h3>{product_name}</h3>
      </div>
      <div>
        <p>
        </p>
      </div>
      <div>
        <spam>{product_descripition}</spam>
      </div>
    </div>
    }>
      {close =>  <ContentSold  close={close} data={props.data}/>}
      </Popup>)}  
 
   
      </div>
  );
};

export default Product;
