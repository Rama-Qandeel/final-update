import React from "react";

const Store = (props) => {
  const { store_name, store_pic, store_category } = props.data;

  return (
    <div className="store">
      <img src={store_pic} alt={store_name} />
      <div className="store-info">
        <h3>{store_name}</h3>
      </div>
      <div>
        <p>{store_category}</p>
      </div>
    </div>
  );
};

export default Store;
