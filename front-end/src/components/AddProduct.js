import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AddProduct = ({ close, ...props }) => {
  const [productName, setProductName] = useState("");
  const [productDescripition, setProductDescripition] = useState("");
  const [quantityPerUnit, setQuantityPerUnit] = useState("");
  const [price, setPrice] = useState("");
  const [availableProduct, setAvailableProduct] = useState("");
  const [discountAvailable, setDiscountAvailable] = useState("");
  const [pictureProduct, setPictureProduct] = useState("");
  const [getproductCategory, setGetProductCategory] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [store, setStore] = useState("");
  const [getStoreName, setGetStoreName] = useState([]);

  const getCategory = () => {
    axios
      .get("http://localhost:5000/getcategory")
      .then((response) => {
        setGetProductCategory(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };
  const getStore = () => {
    const user = jwt_decode(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/getStore/${user.user_id}`)
      .then((response) => {
        setGetStoreName(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };
  useEffect(() => {
    getCategory();
    getStore();
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "product name") {
      setProductName(event.target.value);
    }
    if (event.target.name === "product descripition") {
      setProductDescripition(event.target.value);
    }
    if (event.target.name === "quantity per unit") {
      setQuantityPerUnit(event.target.value);
    }
    if (event.target.name === "price") {
      setPrice(event.target.value);
    }
    if (event.target.name === "available product") {
      setAvailableProduct(event.target.value);
    }
    if (event.target.name === "discount available") {
      setDiscountAvailable(event.target.value);
    }
    if (event.target.name === "picture product") {
      setPictureProduct(event.target.value);
    }
    if (event.target.name === "category") {
      setProductCategory(event.target.value);
    }
    if (event.target.name === "store") {
      setStore(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    let data = (data = {
      product_category_id: productCategory,
      store_id: store,
      product_name: productName,
      product_descripition: productDescripition,
      quantity_per_unit: quantityPerUnit,
      unit_price: price,
      available_product: availableProduct,
      discount_available: discountAvailable,
      picture: pictureProduct,
    });

    axios
      .post("http://localhost:5000/product", data)
      .then((response) => {
        if (response.data) {
          alert("create a product");
        }
      })
      .catch((error) => {
        throw error;
      });
    setProductName("");
    setProductDescripition("");
    setQuantityPerUnit("");
    setPrice("");
    setAvailableProduct("");
    setDiscountAvailable("");
    setPictureProduct("");
  };

  return (
    <div className="modaladd">
      <a className="close" onClick={close}>
        &times;
      </a>
      <div className="header">
        <div>
          <label htmlFor="product name"> Product Name : </label>
          <input
            type="text"
            name="product name"
            placeholder="Enter  product name"
            value={productName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="store "> Store Name : </label>
          <select name="store" id="store" onClick={handleChange}>
            <option value="none" selected="selected">
              {" "}
              Choose One{" "}
            </option>
            {getStoreName.map((e, key) => {
              return (
                <option key={key} value={e.store_id}>
                  {e.store_name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="category"> Product Category : </label>
          <select name="category" id="category" onClick={handleChange}>
            <option value="none" selected="selected">
              {" "}
              Choose One{" "}
            </option>
            {getproductCategory.map((e, key) => {
              return (
                <option key={key} value={e.product_category_id}>
                  {e.categoryName}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="product descripition"> Product Descripition : </label>
          <input
            type="text"
            name="product descripition"
            placeholder="Enter product descripition"
            value={productDescripition}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity per unit"> Quantity Per Unit : </label>
          <input
            type="text"
            name="quantity per unit"
            placeholder="ex : JD/KG"
            value={quantityPerUnit}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price"> Price : </label>
          <input
            type="text"
            name="price"
            placeholder="Enter price"
            value={price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price"> Available Product </label>
          <select
            name="available product"
            id="available product"
            onClick={handleChange}
          >
            <option value="none" selected="selected">
              {" "}
              Select
            </option>
            <option value="0">Yes</option>
            <option value="1">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="discount available"> Discount Available </label>
          <input
            type="text"
            name="discount available"
            placeholder="if no enter 0"
            value={discountAvailable}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="picture"> Picture : </label>
          <input
            type="text"
            name="picture product"
            placeholder="Enter picture product"
            value={pictureProduct}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
