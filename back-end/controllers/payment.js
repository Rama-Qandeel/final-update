const connection = require("../db");

const addpayment = (req, res) => {
 
  const {
    user_id,
    payment_type,
    check_out_id,
    credit_card,
    expiration,
    cvv,
  } = req.body;
  const data = [
    user_id,
    payment_type,
    check_out_id,
    credit_card,
    expiration,
    cvv,
  ];
  const query = `INSERT INTO payment (user_id,
        payment_type,
        check_out_id,
        credit_card,
        expiration,
        cvv)
  VALUES (?,?,?,?,?,?) `;
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

module.exports = {
  addpayment,
};
