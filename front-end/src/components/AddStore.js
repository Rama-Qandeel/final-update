import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AddStore = ({ close, ...props }) => {
  const [nameStore, setNameStore] = useState("");
  const [pictureStore, setPictureStore] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [address, setAddress] = useState("");
  const [getStoreCategory, setGetStoreCategory] = useState([]);
  const [errorNameStore, setErrorNameStore] = useState("");
  const [errorPictureStore, setErrorPictureStore] = useState("");
  const [errorStoreCategory, setErrorStoreCategory] = useState("");
  const [errorAddress, setErrorAddress] = useState("");

  useEffect(() => {
    getstoreCategory();
  }, []);

  const getstoreCategory = () => {
    axios
      .get("http://localhost:5000/getstorecategory")
      .then((response) => {
        setGetStoreCategory(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleChange = (event) => {
    if (event.target.name === "name store") {
      setNameStore(event.target.value);
    }
    if (event.target.name === "picture store") {
      setPictureStore(event.target.value);
    }
    if (event.target.name === "address") {
      setAddress(event.target.value);
    }
    if (event.target.name === "store category") {
      setStoreCategory(event.target.value);
    }
  };

  const validate = () => {
    let errorNameStore = "";
    let errorPictureStore = "";
    let errorStoreCategory = "";
    let errorAddress = "";

    if (!nameStore.length) {
      errorNameStore = "Invalid name store";
    }
    if (!pictureStore.length) {
      errorPictureStore = "Invalid picture store";
    }
    if (!storeCategory.length) {
      errorStoreCategory = "Invalid store category";
    }
    if (!address.length) {
      errorAddress = "Invalid address";
    }
    if (
      errorNameStore ||
      errorPictureStore ||
      errorStoreCategory ||
      errorAddress
    ) {
      setErrorNameStore(errorNameStore);
      setErrorPictureStore(errorPictureStore);
      setErrorStoreCategory(errorStoreCategory);
      setErrorAddress(errorAddress);

      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    const isValidate = validate();
    if (isValidate) {
      setErrorNameStore("");
      setErrorPictureStore("");
      setErrorStoreCategory("");
      setErrorAddress("");

      const user = jwt_decode(localStorage.getItem("token"));
      const data = {
        user_id: user.user_id,
        store_name: nameStore,
        store_pic: pictureStore,
        address: address,
        store_category: storeCategory,
      };
      axios
        .post("http://localhost:5000/store", data)
        .then((response) => {
          if (response.data) {
            props.history.push("/home");
            alert("create a store");
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return (
    <div className="modal-body">
      <div class="container-fluid">
        <div class="row">
          <a className="close2" onClick={close}>
            &times;
          </a>
        </div>
        <div class="row">
          <h2 style={{ textAlign: "center", marginBottom: "5px" }}>
            Add your store
          </h2>
          <div style={{ marginTop: "10px" }}>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Name Store :
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="text"
                name="name store"
                placeholder="Enter your name store"
                value={nameStore}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p style={{ fontSize: "12", color: "red", textAlign: "center" }}>
                {errorNameStore}
              </p>
            </div>
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
                name="picture store"
                placeholder="Enter picture store"
                value={pictureStore}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p style={{ fontSize: "12", color: "red", textAlign: "center" }}>
                {errorPictureStore}
              </p>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Store Category :
                </label>
              </div>
              <select
                class="custom-select"
                name="store category"
                id="store category"
                onClick={handleChange}
              >
                <option value="none" selected="selected">
                  Choose One
                </option>
                {getStoreCategory.map((e, key) => {
                  return (
                    <option key={key} value={e.store_category}>
                      {e.store_category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <p style={{ fontSize: "12", color: "red", textAlign: "center" }}>
                {errorStoreCategory}
              </p>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Address :
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="text"
                name="address"
                placeholder="Enter store adrdress"
                value={address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p style={{ fontSize: "12", color: "red", textAlign: "center" }}>
                {errorAddress}
              </p>
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
                Add Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStore;
