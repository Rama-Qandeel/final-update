import React, { useState, useEffect } from "react";

const ContentSold = ({ close, ...props }) => {
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
          <p>
            {unit_price} {quantity_per_unit}
          </p>
          <h3 style={{ color: "red" }}>Out of stock</h3>
        </div>
      </div>
    </div>
  );
};

export default ContentSold;
