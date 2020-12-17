const express = require("express");
const mainRouter = express.Router();

const {
  register,
  getAllUsers,
  login,
  getUserById,
  updatePic,
} = require("../controllers/users_controller");

const {
  addProduct,
  getproducts,
  deleteProduct,
  updateProduct,
  getproductsByStore,
  searchProduct,
  getQuant,
  updatePrice,
} = require("../controllers/product");

const {
  addStore,
  updateStore,
  getStores,
  deleteStore,
  getStoresbyStoreId,
  getAllStores,
  specificStores,
  getSroreById,
  getStoreCategory,
  getCategory,
} = require("../controllers/store");

const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  getDelevarymanOrders,
  ordersAndStore,
  ordersAndUsers,
  cancelOrder,
  assigneeOrder,
  getUnassignedOrders,
  getUnassignedOrdersUser,
} = require("../controllers/order");

const { createItem, deleteItem, getItems } = require("../controllers/item");

const {
  checkOut,
  createCheckOut,
  getLastOrder,
  getOrderstocheck,
} = require("../controllers/checkOut");

const { addpayment } = require("../controllers/payment");
/***********product*********** */
mainRouter.post("/product", addProduct);
mainRouter.get("/getsearch", searchProduct);
mainRouter.get("/getproduct/:store_id", getproducts);
mainRouter.delete("/product", deleteProduct);
mainRouter.get("/storeproducts/:store_id", getproductsByStore);
mainRouter.delete("/product/:product_id", deleteProduct);
mainRouter.put("/updateprice", updatePrice);
mainRouter.get("/getquant/:product_id/:user_id", getQuant);
mainRouter.put("/product", updateProduct);

/***********store*********** */
mainRouter.get("/getstorecategory", getStoreCategory);
mainRouter.get("/getcategory", getCategory);
mainRouter.get("/getstore/:user_id", getSroreById);
mainRouter.post("/store", addStore);
mainRouter.put("/store", updateStore);
mainRouter.get("/store/:user_id", getStores);
mainRouter.get("/allstore", getAllStores);
mainRouter.post("/specificstore", specificStores);
mainRouter.delete("/store", deleteStore);
mainRouter.get("/mystore/:store_id", getStoresbyStoreId);
mainRouter.delete("/store/:store_id", deleteStore);

/***********order*********** */
mainRouter.post("/order", createOrder);
mainRouter.get("/unassignedOrders", getUnassignedOrders);
mainRouter.get("/unassignedOrders/:user_id", getUnassignedOrdersUser);
mainRouter.put("/assigneeOrder", assigneeOrder);
mainRouter.delete("/assigneeOrder/:orders_id", cancelOrder);
mainRouter.get("/usersOrders/:user_id", ordersAndUsers);
mainRouter.get("/storesOrders/:store_id", ordersAndStore);
mainRouter.get("/delvarymanOrders/:delivary_user_id", getDelevarymanOrders);
mainRouter.put("/order", updateOrder);
mainRouter.get("/getorder/:user_id", getOrders);
mainRouter.delete("/order/:orders_id", deleteOrder);

//***********checkOut***** */
mainRouter.get("/checkout/:user_id", checkOut);
mainRouter.get("/createcheckout/:user_id", createCheckOut);
mainRouter.get("/getlastorder/:user_id", getLastOrder);
mainRouter.get("/getOrderstocheck/:user_id", getOrderstocheck);

/***********user*********** */

mainRouter.post("/register", register);
mainRouter.put("/updatePic/:user_id", updatePic);
mainRouter.post("/login", login);
mainRouter.get("/users", getAllUsers);
mainRouter.get("/users/:user_id", getUserById);

/***********extra*********** */
mainRouter.post("/payment", addpayment);

/***********extra*********** */
mainRouter.post("/item", createItem);
mainRouter.get("/item", getItems);
mainRouter.delete("/item", deleteItem);

module.exports = mainRouter;
