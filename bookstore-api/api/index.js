const express = require("express");
const router = express.Router();

module.exports = (sequelize) => {
  // Import the route files
  const customersRouter = require("./routes/customers")(sequelize); // Pass sequelize to customersRouter
  const ordersRouter = require("./routes/orders")(sequelize); // Pass sequelize to ordersRouter

  // Use the routers under the '/api' path
  router.use("/customers", customersRouter);
  router.use("/orders", ordersRouter);

  return router;
};

// // Import the route files
// const customersRouter = require("./routes/customers");
// const ordersRouter = require("./routes/orders");

// // Use the routers under the '/api' path
// router.use("/customers", customersRouter);
// router.use("/orders", ordersRouter);

// module.exports = router;
