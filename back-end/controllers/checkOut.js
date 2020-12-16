const connection = require("../db")


const checkOut = (req, res) => {
    const query = `SELECT check_out.check_out_id,users.first_name,
    users.last_name,check_out.orders_id,
    users.first_name,
    users.last_name
    FROM check_out 
   INNER JOIN users ON (check_out.user_id)=users.user_id 
   WHERE check_out.user_id =? `
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err   
        }
        res.json(results)
    })
}


const checkOutUnassignedOrders = (req, res) => {
    const query = `SELECT check_out.check_out_id,users.first_name,
    users.last_name,check_out.orders_id,orders.product_name
    FROM check_out 
   INNER JOIN users ON (check_out.user_id)=users.user_id 
   INNER JOIN orders ON (check_out.orders_id)=orders.orders_id 
   WHERE check_out.is_deleted =0`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err   
        }
        res.json(results)
    })
}

const get = (req, res) => {

   const query = `SELECT orders_id
    FROM check_out 
   WHERE check_out.is_deleted =0 `


   connection.query(query, (err, results) => {
        if (err) {
            throw err   
        }
    //    res.json(results[0].orders_id.split(","))
       const r=results[0].orders_id.split(",")
       const m=r.map((ele)=>{
           return Number(ele)
       })

       const query2 = `SELECT product_name
       FROM orders 
      WHERE orders_id BETWEEN ${m[0]} AND ${m[m.length-1]}`

      connection.query(query2, (err, results2) => {
        if (err) {
            throw err   
        }

res.json(results2)
    }) 
   })

}







const createCheckOut = (req, res) => {
    const query = `SELECT user_id FROM check_out
   WHERE user_id =? AND is_deleted=0`
    const data = [req.params.user_id]
      connection.query(query, data, (err, results) => {
        if (err) {
            throw err   
        }
if(results.length){
const query2 =`SELECT orders_id
FROM orders  WHERE user_id =? AND is_deleted=0 ORDER BY orders_id DESC LIMIT 1`
const data2 = [req.params.user_id]
connection.query(query2, data2, (err, results2) => {
    if (err) {
        throw err   
    }
    // res.json(results[0].orders_id)
    const query3 =`SELECT orders_id
FROM check_out  WHERE user_id =? AND is_deleted=0 `
const data3 = [req.params.user_id]
connection.query(query3, data3, (err, results3) => {
    if (err) {
        throw err   
    }
    // res.json(results3[0].orders_id)

    const query4 =`UPDATE check_out SET orders_id=? WHERE user_id=?` 
    let orders_id=results3[0].orders_id+","+results2[0].orders_id
    // console.log('orders_id',orders_id);
    const data4 = [orders_id,req.params.user_id]
    connection.query(query4, data4, (err, results4) => {
        if (err) {
            throw err   
        }
        res.json(results4)
    })
    })  
})
   
}
else{
    const query =`SELECT orders_id
FROM orders  WHERE user_id =? AND is_deleted=0 ORDER BY orders_id DESC LIMIT 1`
const data = [req.params.user_id]
connection.query(query, data, (err, results) => {
    if (err) {
        throw err   
    }
        const query2 = `INSERT INTO check_out (user_id,orders_id)
        VALUES (?,?)`
        const data2 = [req.params.user_id,results[0].orders_id]
        connection.query(query2, data2, (err, results2) => {
            if (err) {
                throw err   
            }

            res.json(results2)
        
    })
})
      }
    })
    } 

const getLastOrder = (req, res) => {
    const query =`SELECT orders_id
    FROM orders  WHERE user_id =? AND is_deleted=0 ORDER BY orders_id DESC LIMIT 1`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err   
        }
        res.json(results)
    })
}
 
const getOrderstocheck = (req, res) => {
    const query = `SELECT * from orders WHERE user_id=? AND is_deleted=0`
    const data = [req.params.user_id]
    connection.query(query, data, (err, results) => {
        if (err) {
            throw err   
        }
        res.json(results)
    })
}




module.exports={checkOut,createCheckOut,getLastOrder,
    getOrderstocheck,checkOutUnassignedOrders,get}