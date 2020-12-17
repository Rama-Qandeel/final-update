const connection = require("../db")

const createOrder = (req, res) => {
    const { user_id, delivary_user_id, store_id, product_id, price, product_name, quantity, picture } = req.body
    const data = [user_id, delivary_user_id, store_id, product_id, price, product_name, quantity, picture]
    const query = `INSERT INTO orders (user_id,delivary_user_id,store_id,product_id,price,product_name,quantity,picture)
    VALUES (?,?,?,?,?,?,?,?)`
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err   
        }
        res.json(results)
    })
}

const getOrders = (req, res) => {
    const query = `SELECT * from orders WHERE user_id=? AND is_deleted=0`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err   
        }
        res.json(results)
    })
}

const cancelOrder = (req, res) => {
    const query = `UPDATE  orders  SET is_deleted =1 WHERE orders_id=?`
    const data = [req.params.orders_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const assigneeOrder = (req, res) => {
    const { orders_id, delivary_user_id } = req.body
    const query = `UPDATE  orders  SET  delivary_user_id =? WHERE orders_id=?`
    const data = [delivary_user_id, orders_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const ordersAndUsers = (req, res) => {
    const query =
        `SELECT  orders.price,orders.quantity,orders.picture,
         orders.user_id
        ,store.store_name , orders.orders_id,orders.store_id ,
        orders.product_name ,users.first_name,
        users.last_name ,orders.delivary_user_id FROM orders 
        INNER JOIN users ON orders.delivary_user_id=users.user_id 
        JOIN store ON orders.store_id=store.store_id
        WHERE  orders.user_id=? AND orders.is_deleted=0`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const getUnassignedOrders = (req, res) => {
    const query =
        `SELECT  orders.user_id, orders.orders_id,
        orders.store_id ,store.store_name, users.first_name,
        users.last_name ,orders.product_name,orders.picture
         FROM orders 
        INNER JOIN users ON orders.user_id=users.user_id 
        INNER JOIN store ON orders.store_id=store.store_id  
        WHERE orders.delivary_user_id =0`
    connection.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const getUnassignedOrdersUser = (req, res) => {
    const query =
        `SELECT  orders.user_id, orders.orders_id,
        orders.store_id ,store.store_name,orders.delivary_user_id,orders.product_name,orders.picture 
          FROM orders 
        INNER JOIN store ON orders.store_id=store.store_id  
        WHERE orders.delivary_user_id =0 AND orders.user_id=? AND orders.is_deleted=0`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const ordersAndStore = (req, res) => {
    const query =
        `SELECT orders.delivary_user_id, orders.user_id, orders.orders_id,orders.product_name,users.first_name,
        users.last_name,orders.store_id ,store.store_name   FROM store 
    INNER JOIN orders ON orders.store_id=store.store_id  
    INNER JOIN users ON orders.delivary_user_id=users.user_id 
    WHERE store.store_id =?`
    const data = [req.params.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
} 

const getDelevarymanOrders = (req, res) => {
    const query =
        `SELECT orders.delivary_user_id, orders.user_id, orders.orders_id,users.first_name,
        users.last_name,orders.store_id ,store.store_name , orders.product_name FROM orders 
     INNER JOIN users ON orders.delivary_user_id=users.user_id 
    INNER JOIN store ON orders.store_id=store.store_id  

    WHERE orders.delivary_user_id =?`
    const data = [req.params.delivary_user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;   
        }
        res.json(results)
    })  
}

const updateOrder = (req, res) => {
    const {quantity,price,product_id,user_id} = req.body
    const data = [quantity,price]
    const query = `UPDATE orders SET quantity=?, price=? WHERE product_id=${product_id} AND user_id=${user_id}`
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err   
        }
        res.json(results)
    })
}

const deleteOrder = (req, res) => {
    const query = `DELETE FROM orders WHERE orders_id=?`
    const data = [req.params.orders_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err   
        }
        res.json(results)
    })
} 



module.exports={
    createOrder, getOrders, updateOrder, deleteOrder,
      getDelevarymanOrders, ordersAndStore
    , ordersAndUsers, cancelOrder, assigneeOrder, getUnassignedOrders, getUnassignedOrdersUser

}