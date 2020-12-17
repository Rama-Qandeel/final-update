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
  const [errorProductName, setErrorProductName] = useState("");
  const [errorQuantityPerUnit, setErrorQuantityPerUnit] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const [errorAvailableProduct, setErrorAvailableProduct] = useState("");
  const [errorDiscountAvailable, setErrorDiscountAvailable] = useState("");
  const [errorPictureProduct, setErrorPictureProduct] = useState("");
  const [errorProductCategory, setErrorProductCategory] = useState("");
  const [errorStore, setErrorStore] = useState("");

  const validate = () => {
    let errorProductName = "";
    let errorQuantityPerUnit = "";
    let errorPrice = "";
    let errorAvailableProduct = "";
    let errorDiscountAvailable = "";
    let errorPictureProduct = "";
    let errorProductCategory = "";
    let errorStore = "";

    if (!productName.length) {
      errorProductName = "Invalid name product";
    }
    if (!quantityPerUnit.length) {
      errorQuantityPerUnit = "Invalid quantity";
    }
    if (!price.length) {
      errorPrice = "Invalid price";
    }
    if (!availableProduct.length) {
      errorAvailableProduct = "Invalid available product";
    }
    if (!discountAvailable.length) {
      errorDiscountAvailable = "if not available enter zero";
    }
    if (!pictureProduct.length) {
      errorPictureProduct = "Invalid picture product";
    }
    if (!productCategory.length) {
      errorProductCategory = "Invalid product category";
    }
    if (!store.length) {
      errorStore = "Invalid store name";
    }
    if (
      errorProductName ||
      errorQuantityPerUnit ||
      errorPrice ||
      errorAvailableProduct ||
      errorDiscountAvailable ||
      errorPictureProduct ||
      errorProductCategory ||
      errorStore
    ) {
      setErrorProductName(errorProductName);
      setErrorQuantityPerUnit(errorQuantityPerUnit);
      setErrorPrice(errorPrice);
      setErrorAvailableProduct(errorAvailableProduct);
      setErrorDiscountAvailable(errorDiscountAvailable);
      setErrorPictureProduct(errorPictureProduct);
      setErrorProductCategory(errorProductCategory);
      setErrorStore(errorStore);

      return false;
    }

    return true;
  };

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
    const isValidate = validate();
    if (isValidate) {
      setErrorProductName("");
      setErrorQuantityPerUnit("");
      setErrorPrice("");
      setErrorAvailableProduct("");
      setErrorDiscountAvailable("");
      setErrorPictureProduct("");
      setErrorProductCategory("");
      setErrorStore("");

      let data = {
        product_category_id: productCategory,
        store_id: store,
        product_name: productName,
        product_descripition: productDescripition,
        quantity_per_unit: quantityPerUnit,
        unit_price: price,
        available_product: availableProduct,
        discount_available: discountAvailable,
        picture: pictureProduct,
      };
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
    }
  };

  return (
    <div
      className="modal-body"
      style={{ boxShadow: "5px 10px 10px 5px #888888" }}
    >
      <div class="container-fluid">
        <div class="row">
          <a className="close2" onClick={close}>
            &times;
          </a>
        </div>
        <div class="row">
          <h2 style={{ textAlign: "center", marginBottom: "5px" }}>
            Add your product
          </h2>
          <div style={{ marginTop: "10px" }}>
            <div>
              <spam
                style={{ fontSize: "12", color: "red", textAlign: "center" }}
              >
                {errorProductName}
              </spam>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Product Name :{" "}
                </span>
              </div>
              <div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  type="text"
                  name="product name"
                  placeholder="Enter  product name"
                  value={productName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <spam style={{ fontSize: "12", color: "red", textAlign: "center" }}>
              {errorStore}
            </spam>
            <div class="input-group mb-1">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Store Name :
                </label>
              </div>
              <select name="store" id="store" onClick={handleChange}>
                <option value="none" selected="selected">
                  Choose One
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
            <spam style={{ fontSize: "12", color: "red", textAlign: "center" }}>
              {errorProductCategory}
            </spam>
            <div class="input-group mb-1">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Product Category :
                </label>
              </div>
              <select name="category" id="category" onClick={handleChange}>
                <option value="none" selected="selected">
                  Choose One
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
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Product Descripition :
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="text"
                name="product descripition"
                placeholder="Enter product descripition"
                value={productDescripition}
                onChange={handleChange}
                required
              />
            </div>
            <spam style={{ fontSize: "12", color: "red", textAlign: "center" }}>
              {errorQuantityPerUnit}
            </spam>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Quantity Per Unit :
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="text"
                name="quantity per unit"
                placeholder="ex : JD/KG"
                value={quantityPerUnit}
                onChange={handleChange}
                required
              />
            </div>
            <spam style={{ fontSize: "12", color: "red", textAlign: "center" }}>
              {errorPrice}
            </spam>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Price :
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="text"
                name="price"
                placeholder="Enter price"
                value={price}
                onChange={handleChange}
                required
              />
            </div>
            <spam style={{ fontSize: "12", color: "red", textAlign: "center" }}>
              {errorAvailableProduct}
            </spam>
            <div class="input-group mb-1">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Available Product
                </span>
              </div>
              <select
                name="available product"
                id="available product"
                onClick={handleChange}
              >
                <option value="none" selected="selected">
                  Select
                </option>
                <option value="0">Yes</option>
                <option value="1">No</option>
              </select>
            </div>
            <spam style={{ fontSize: "12", color: "red", textAlign: "center" }}>
              {errorDiscountAvailable}
            </spam>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Discount Available{" "}
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name="discount available"
                placeholder="if no enter 0"
                value={discountAvailable}
                onChange={handleChange}
                required
              />
            </div>
            <spam style={{ fontSize: "12", color: "red", textAlign: "center" }}>
              {errorPictureProduct}
            </spam>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Picture :
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="text"
                name="picture product"
                placeholder="Enter picture product"
                value={pictureProduct}
                onChange={handleChange}
                required
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => close()}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                style={{ backgroundColor: "green" }}
                onClick={handleSubmit}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
