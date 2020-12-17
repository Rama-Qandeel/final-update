import React, { useState, useEffect } from "react";
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
    <div className="store">
      {!available_product ? (
        <div>
          <Popup
            modal
            trigger={
              <div>
                <img
                  src={picture}
                  alt={product_name}
                  style={{
                    textAlign: " center",
                    height: "auto",
                    marginBottom: "10px",
                    width: "1000px",
                  }}
                />
                <div className="content-store">
                  <div className="store-info"></div>
                  {Number(discount_available) ? (
                    <div>
                      <h4
                        style={{
                          fontSize: "19px",
                          fontWeight: "200",
                          marginTop: "-20px",
                        }}
                      >
                        {product_name}
                      </h4>
                      <h3 style={{ color: "orange" }}>
                        -{discount_available} off
                      </h3>
                      <spam style={{ textDecoration: "line-through" }}>
                        {unit_price}
                        {quantity_per_unit}
                      </spam>
                      <h4 style={{ color: "orange" }}>
                        {unit_price - discount_available}
                        {quantity_per_unit}
                      </h4>
                    </div>
                  ) : (
                    <div>
                      <h4
                        style={{
                          fontSize: "19px",
                          fontWeight: "200",
                          marginTop: "-20px",
                        }}
                      >
                        {product_name}
                      </h4>
                      <div className="content-store">
                        <h4 style={{}}>
                          {unit_price}
                          {quantity_per_unit}
                        </h4>
                      </div>
                    </div>
                  )}
                  <div>
                    <spam>{product_descripition}</spam>
                  </div>
                </div>
              </div>
            }
          >
            {(close) => <Content close={close} data={props.data} />}
          </Popup>
        </div>
      ) : (
        <Popup
          modal
          trigger={
            <div>
              <img
                src={picture}
                alt={product_name}
                style={{
                  textAlign: "center",
                  height: "auto",
                  marginBottom: "10px",
                }}
              />
              <div className="content-store">
                <div className="store-info"></div>
                <div className="">
                  <h4
                    style={{
                      fontSize: "19px",
                      fontWeight: "200",
                      marginTop: "-20px",
                    }}
                  >
                    {product_name}
                  </h4>
                  <h3 style={{ color: "orange" }}>Out of stock</h3>
                </div>
              </div>
            </div>
          }
        >
          {(close) => <ContentSold close={close} data={props.data} />}
        </Popup>
      )}
    </div>
  );
};

export default Product;
