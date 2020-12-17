const connection = require("../db")

const addProduct = (req, res) => {
    const { product_category_id, store_id, product_name, product_descripition, quantity_per_unit, unit_price, available_product, discount_available, picture } = req.body
    const data = [product_category_id, store_id, product_name, product_descripition, quantity_per_unit, unit_price, available_product, discount_available, picture]
    const query = `INSERT INTO products (product_category_id,store_id,product_name,product_descripition,quantity_per_unit,unit_price,available_product, discount_available,picture)
VALUES (?,?,?,?,?,?,?,?,?) `
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}
const searchProduct = (req, res) => {
    const data = req.params.search
    const query = `SELECT * from products WHERE (product_name LIKE "${req.query.search}%" OR product_name LIKE "%${req.query.search}%")AND store_id=${req.query.id}`
    connection.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const getCategory = (req, res) => {
    const query = `SELECT * from product_category`
    connection.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const getStoreCategory = (req, res) => {
    const query = `SELECT DISTINCT store_category from store`
    connection.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const getSroreById = (req, res) => {
    const query = `SELECT store_id,store_name from store WHERE user_id=?`
    const data = [req.params.user_id]

    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}



// const updateProduct = (req, res) => {
//     const { store_id, product_name, product_descripition, quantity_per_unit, unit_price, available_product, picture, product_id } = req.body
//     const data = [product_name, product_descripition, quantity_per_unit, unit_price, available_product, picture, product_id]
//     const query = `UPDATE products SET product_name=?,product_descripition=?,quantity_per_unit=?,
//         unit_price=?,available_product=?,picture=? WHERE product_id=${product_id} `
//     connection.query(query, data, (err, results) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(results);
//         res.json(results)
//     })
// }

const getproducts = (req, res) => {
    const query = `SELECT * from products WHERE store_id=?`
    const data = [req.body.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}

// const deleteProduct = (req, res) => {
//     const query = `DELETE FROM products WHERE product_id=?`
//     const data = [req.body.product_id]
//     connection.query(query, data, (err, results) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(results);
//         res.json(results)
//     })
// }

//********************stores */
const addStore = (req, res) => {
    const { store_name, store_category, store_pic, user_id, address } = req.body
    const data = [store_name, store_category, store_pic, user_id, address]
    const query = `INSERT INTO store (store_name,store_category,store_pic,user_id,address)
    VALUES (?,?,?,?,?) `
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}

const updateStore = (req, res) => {
    const { store_name, store_category, store_pic, store_id } = req.body
    const data = [store_name, store_category, store_pic]
    const query = `UPDATE store SET store_name=?,store_category=?,store_pic=? WHERE store_id=${store_id} `
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}

const getStores = (req, res) => {
    const query = `SELECT * from store WHERE user_id=?`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}

const getAllStores = (req, res) => {
    const query = `SELECT * from store `
    connection.query(query, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}
const specificStores = (req, res) => {
    const query = `SELECT * from store WHERE store_category=? `
    const { store_category } = req.body
    const data = [store_category]
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}
// const deleteStore = (req, res) => {
//     const query = `DELETE FROM store WHERE store_id=?`
//     const data = [req.body.store_id]
//     connection.query(query, data, (err, results) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(results);
//         res.json(results)
//     })
// }
//********************orders */

const createItem = (req, res) => {
    const { orders_id, product_id, total_price } = req.body
    const data = [orders_id, product_id, total_price]
    const query = `INSERT INTO items (orders_id,product_id,total_price)
    VALUES (?,?,?) `
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}

const getItems = (req, res) => {
    const query = `SELECT * from items WHERE orders_id=?`
    const data = [req.body.orders_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}

const deleteItem = (req, res) => {
    const query = `DELETE FROM items WHERE items_id=?`
    const data = [req.body.item_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}

const createOrder = (req, res) => {
    const { user_id, delivary_user_id, store_id, product_id, price, product_name, quantity, picture } = req.body
    const data = [user_id, delivary_user_id, store_id, product_id, price, product_name, quantity, picture]
    const query = `INSERT INTO orders (user_id,delivary_user_id,store_id,product_id,price,product_name,quantity,picture)
    VALUES (?,?,?,?,?,?,?,?)`
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}
//edited
const getOrders = (req, res) => {
    const query = `SELECT * from orders WHERE user_id=?`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}

const deleteOrder = (req, res) => {
    const query = `DELETE FROM orders WHERE orders_id=?`
    const data = [req.params.orders_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}
const updateOrder = (req, res) => {
    const { quantity, orders_id } = req.body
    const data = [quantity]
    const query = `UPDATE orders SET quantity=? WHERE orders_id=${order_id} `
    connection.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.json(results)
    })
}
// /added
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
// added
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
// JOIN users ON orders.delivary_user_id=users.user_id 
// , orders.delivary_user_id
// users.first_name,
//         users.last_name,
const ordersAndUsers = (req, res) => {
    const query =
        `SELECT  orders.price,orders.quantity,orders.picture, orders.user_id
        ,store.store_name , orders.orders_id,orders.store_id ,
        orders.product_name ,orders.delivary_user_id FROM orders 
        JOIN store ON orders.store_id=store.store_id
        WHERE orders.user_id =?`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

//added 
const getUnassignedOrders = (req, res) => {
    const query =
        `SELECT  orders.user_id, orders.orders_id,
        orders.store_id ,store.store_name, users.first_name,
        users.last_name  FROM orders 
        INNER JOIN users ON orders.user_id=users.user_id 
        INNER JOIN store ON orders.store_id=store.store_id  
        WHERE orders.delivary_user_id =0`
    connection.query(query, (err, results) => {
        console.log("results", results);
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

// added
const getUnassignedOrdersUser = (req, res) => {
    const query =
        `SELECT  orders.user_id, orders.orders_id,
        orders.store_id ,store.store_name,orders.delivary_user_id 
          FROM orders 
        INNER JOIN store ON orders.store_id=store.store_id  
        WHERE orders.delivary_user_id =0 AND orders.user_id=? AND orders.is_deleted=0`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        console.log("results", results);
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const ordersAndStore = (req, res) => {
    const query =
        `SELECT orders.delivary_user_id, orders.user_id, orders.orders_id,users.first_name,
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

const deleteStore = (req, res) => {
    const query = `UPDATE store 
    SET is_deleted=1
    WHERE store_id=?`
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
        users.last_name,orders.store_id ,store.store_name   FROM orders 
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
const getStoresbyStoreId = (req, res) => {
    const query = `SELECT * from store WHERE store_id=?`
    const data = [req.params.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}
const getproductsByStore = (req, res) => {
    const query = `SELECT * from products WHERE store_id=?`
    const data = [req.params.store_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const deleteProduct = (req, res) => {
    const query = `DELETE FROM products WHERE product_id=?`
    const data = [req.params.product_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

const updateProduct = (req, res) => {
    const { store_id, product_name, product_descripition, quantity_per_unit, unit_price, available_product, picture, product_id } = req.body
    const data = [product_name, product_descripition, quantity_per_unit, unit_price, available_product, picture, product_id]
    const query = `UPDATE products SET product_name=?,product_descripition=?,quantity_per_unit=?,
        unit_price=?,available_product=?,picture=? WHERE product_id=${product_id} `
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results)
    })
}

module.exports = {
    addProduct, getproducts, deleteProduct, updateProduct, addStore, updateStore, getStores, deleteStore,
    createItem, deleteItem, createOrder, getItems, getOrders, updateOrder, deleteOrder, getAllStores, specificStores, getCategory, getSroreById, getStoreCategory, searchProduct
    , getproductsByStore, getStoresbyStoreId, getDelevarymanOrders, ordersAndStore
    , ordersAndUsers, cancelOrder, assigneeOrder, getUnassignedOrders, getUnassignedOrdersUser


}
