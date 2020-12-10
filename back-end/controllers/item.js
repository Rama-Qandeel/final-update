const connection = require("../db");

const createItem = (req, res) => {
  const { orders_id, product_id, total_price } = req.body;
  const data = [orders_id, product_id, total_price];
  const query = `INSERT INTO items (orders_id,product_id,total_price)
    VALUES (?,?,?) `;
  connection.query(query, data, (err, results) => {
    if (err) {
throw err   
 }
    res.json(results);
  });
};

const getItems = (req, res) => {
  const query = `SELECT * from items WHERE orders_id=?`;
  const data = [req.body.orders_id];
  connection.query(query, data, (err, results) => {
    if (err) {
        throw err   
    }
    res.json(results);
  });
};

const deleteItem = (req, res) => {
  const query = `DELETE FROM items WHERE items_id=?`;
  const data = [req.body.item_id];
  connection.query(query, data, (err, results) => {
    if (err) {
        throw err   
    }
    res.json(results);
  });
};

module.exports = {
  createItem,
  deleteItem,
  getItems
};
