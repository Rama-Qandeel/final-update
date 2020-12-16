import React, { useState, useEffect } from "react";
import Product from "./components/Product";
import axios from "axios";

const InfoStore = (props) => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    getproducts();
  },[]);

  const getproducts = () => {
    axios
      .get(`http://localhost:5000/getproduct/${props.location.state.store_id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearchProduct(e.target.value);
    if (searchProduct) {
      axios
        .get(
          `http://localhost:5000/getsearch?search=${e.target.value}&id=${props.location.state.store_id}`
        )
        .then((response) => {
          
          setProducts(response.data);
        })
        .catch((error) => {
          throw error;
        });
    }
  };
  const chooseStore = () => {
    props.history.push("/home");
  };

  

  const renderProducts = products.map((product) => <Product data={product} />);

  return (
    <div>
      <div className="search-container2">
        <input
          className="search"
          type="search"
          placeholder={`Search ${props.location.state.store_name}...`}
          onChange={handleOnChange}
          value={searchProduct}
        />
      </div>
      {products.length ? (
        <div className="store-container2">{renderProducts}</div>
      ) : (
        <div style={{textAlign:"center"
      }}>
          <img  style={{width:"100px",marginTop:"50px"
          }}src="https://i.pinimg.com/564x/24/8c/c4/248cc4eec11b158d6eaf49c7088022a4.jpg" />
          <p style={{marginTop:"20px",fontSize:"30px"
          }} >Product not found in this store</p>
          <button class="btn btn-primary" onClick={chooseStore}>Choose another store</button>
        </div>
      )}
    </div>
  );
};

export default InfoStore;
