const connection = require("../db");

const addProduct = (req, res) => {
  const {
    product_category_id,
    store_id,
    product_name,
    product_descripition,
    quantity_per_unit,
    unit_price,
    available_product,
    discount_available,
    picture,
  } = req.body;
  const data = [
    product_category_id,
    store_id,
    product_name,
    product_descripition,
    quantity_per_unit,
    unit_price,
    available_product,
    discount_available,
    picture,
  ];
  const query = `INSERT INTO products (product_category_id,store_id,product_name,product_descripition,quantity_per_unit,unit_price,available_product, discount_available,picture)
VALUES (?,?,?,?,?,?,?,?,?) `;
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const searchProduct = (req, res) => {
  const data = req.params.search;
  const query = `SELECT * from products WHERE (product_name LIKE "${req.query.search}%" OR product_name LIKE "%${req.query.search}%")AND store_id=${req.query.id}`;
  connection.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const getproducts = (req, res) => {
  const query = `SELECT * from products WHERE store_id=?`;
  const data = [req.params.store_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const getproductsByStore = (req, res) => {
  const query = `SELECT * from products WHERE store_id=?`;
  const data = [req.params.store_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const deleteProduct = (req, res) => {
  const query = `DELETE FROM products WHERE product_id=?`;
  const data = [req.params.product_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const updateProduct = (req, res) => {
  const {
    store_id,
    product_name,
    product_descripition,
    quantity_per_unit,
    unit_price,
    available_product,
    picture,
    product_id,
  } = req.body;
  const data = [
    product_name,
    product_descripition,
    quantity_per_unit,
    unit_price,
    available_product,
    picture,
    product_id,
  ];
  const query = `UPDATE products SET product_name=?,product_descripition=?,quantity_per_unit=?,
        unit_price=?,available_product=?,picture=? WHERE product_id=${product_id} `;
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const getQuant = (req, res) => {
  const query = `SELECT quantity from orders WHERE product_id=? AND user_id=? `;
  const data = [req.params.product_id, req.params.user_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const updatePrice = (req, res) => {
  const { unit_price, product_id, discount_available } = req.body;
  let price = unit_price - discount_available;
  const data = [price];
  const query = `UPDATE products SET unit_price=? WHERE product_id=${product_id}`;
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

module.exports = {
  addProduct,
  getproducts,
  deleteProduct,
  updateProduct,
  getproductsByStore,
  searchProduct,
  getQuant,
  updatePrice,
};
