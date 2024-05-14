const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const initModels = require("./models/init-models");
const OrderDetails = require("./models/OrderDetails");

//Setting SQL Server Connection
const sequelize = new Sequelize("Bookstore", "Daniel", "20naD5013*", {
  host: "localhost",
  dialect: "mssql",
});

//Defines Models
const models = initModels(sequelize);

// Initialize and Test Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

//CORS error handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  //checks options for request
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Customers API Endpoint
app.get("/api/customers", async (req, res) => {
  try {
    const customers = await models.Customers.findAll();

    // Set Cache-Control headers
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" }); // Handles errors
  }
});

// Order Details API Endpoint
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await models.Orders.findAll({
      include: [
        {
          model: models.OrderDetails,
          as: "OrderDetails",
          include: [
            {
              model: models.Books,
              as: "book",
              include: [{ model: models.Authors, as: "author" }], // Include author info if needed
            },
          ],
        },
      ],
    });

    const formattedOrders = orders.map((order) => {
      return {
        order_id: order.OrderDetails[0].order_id,
        order_details: order.OrderDetails.map((item) => ({
          book_title: item.book.title,
          author: item.book.author.name,
          price: item.book.price,
          quantity: item.quantity,
        })),
      };
    });
    // Set Cache-Control headers
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", 0);

    res.status(200), res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//setting error handling middleware
app.use((req, res, next) => {
  const error = new Error("404 NOT FOUND");
  error.status = 404;
  next(error);
});

//handles all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
