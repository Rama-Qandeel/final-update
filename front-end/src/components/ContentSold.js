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
    <div className="modal-body">
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
            <p style={{ marginLeft: "300px" }}>
              {unit_price}
              {quantity_per_unit}
            </p>
            <h3 style={{ color: "red", marginLeft: "300px", width: "200px" }}>
              Out of stock
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSold;
