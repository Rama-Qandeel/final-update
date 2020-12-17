import React from "react";

const Store = (props) => {
  const { store_name, store_pic, store_category } = props.data;
  return (
    <div>
      <div class="store">
        <img src={store_pic} alt={store_name} className="card-img-top" />
        <div class="card-body" style={{ flexShrink: 0 }}>
          <div class="content-store">
            <h5
              style={{
                fontSize: "18px",
                fontWeight: 600,
                margin: 0,
                lineHeight: 1.2,
              }}
              class="card-title"
            >
              {store_name}
            </h5>
            <p class="card-text">
              <small
                class=""
                style={{
                  fontSize: " 14px",
                  color: "orange",
                  margin: " 4px 0 ",
                }}
              >
                {store_category} category
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
