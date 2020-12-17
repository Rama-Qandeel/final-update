const connection = require("../db");

const getSroreById = (req, res) => { 
  const query = `SELECT store_id,store_name from store WHERE user_id=?`;
  const data = [req.params.user_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const addStore = (req, res) => {
  const { store_name, store_category, store_pic, user_id, address } = req.body;
  const data = [store_name, store_category, store_pic, user_id, address];
  const query = `INSERT INTO store (store_name,store_category,store_pic,user_id,address)
    VALUES (?,?,?,?,?) `;
  connection.query(query, data, (err, results) => {
    if (err) {
        throw err   
    }
    res.json(results);
  });
};

const updateStore = (req, res) => {
  const { store_name, store_category, store_pic, store_id } = req.body;
  const data = [store_name, store_category, store_pic];
  const query = `UPDATE store SET store_name=?,store_category=?,store_pic=? WHERE store_id=${store_id} `;
  connection.query(query, data, (err, results) => {
    if (err) {
        throw err   
    }
    res.json(results);
  });
};

const getStores = (req, res) => {
  const query = `SELECT * from store WHERE user_id=?`;
  const data = [req.params.user_id];
  connection.query(query, data, (err, results) => {
    if (err) {
        throw err   
    }
    res.json(results);
  });
};

const getAllStores = (req, res) => {
  const query = `SELECT * from store `;
  connection.query(query, (err, results) => {
    if (err) {
        throw err   
    }
    res.json(results);
  });
};
const specificStores = (req, res) => {
  const query = `SELECT * from store WHERE store_category=? `;
  const { store_category } = req.body;
  const data = [store_category];
  connection.query(query, data, (err, results) => {
    if (err) {
        throw err   
    }
    res.json(results);
  });
};

const deleteStore = (req, res) => {
  const query = `UPDATE store 
    SET is_deleted=1
    WHERE store_id=?`;
  const data = [req.params.store_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const getStoresbyStoreId = (req, res) => {
  const query = `SELECT * from store WHERE store_id=?`;
  const data = [req.params.store_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const getStoreCategory = (req, res) => {
  const query = `SELECT DISTINCT store_category from store`;
  connection.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const getCategory = (req, res) => {
  const query = `SELECT * from product_category`;
  connection.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

module.exports = {
  addStore,
  updateStore,
  getStores,
  deleteStore,
  getStoresbyStoreId,
  getStoreCategory,
  getAllStores,
  specificStores,
  getSroreById,
  getCategory,
};
