const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const initModels = require("./models/init-models");
// const cors = require("cors");

//Setting SQL Server Configuration
const sequelize = new Sequelize("Bookstore", "Daniel", "20naD5013*", {
  host: "localhost",
  dialect: "mssql",
});

//Initializing Sequelize Models
const models = initModels(sequelize);

//Initializing Database and Test Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

//CORS Middleware error handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //Allowed requests from any origin during development

  //Allowed headers for requests
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  //Checks options for request
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Customers API Endpoint
app.get("/api/customers", async (req, res) => {
  try {
    //Gets all customers from database
    const customers = await models.Customers.findAll();

    //Data sent to JSON
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" }); // Handles errors
  }
});

//Order Details API Endpoint
app.get("/api/orders", async (req, res) => {
  try {
    //Gets all orders from the database, including associated OrderDetails, Books, and Authors
    const orders = await models.Orders.findAll({
      include: [
        {
          //Includes the OrderDetails associated with each order using Aliasis
          model: models.OrderDetails,
          as: "OrderDetails",
          include: [
            {
              //Including book model and using alias
              model: models.Books,
              as: "book",
              include: [
                {
                  //Includes author model using alias
                  model: models.Authors,
                  as: "author",
                },
              ],
            },
          ],
        },
      ],
    });

    //Formats the fetched orders into a structure
    const formattedOrders = orders.map((order) => {
      return {
        order_id: order.OrderDetails[0].order_id, //Gets order ID from the first order detail
        order_details: order.OrderDetails.map((item) => ({
          book_title: item.book.title, //Title of the book
          author: item.book.author.name, //Name of the author
          price: item.book.price, //Price of the book
          quantity: item.quantity, //Quantity ordered
        })),
      };
    });

    //Sends successful Response
    res.status(200), res.json(formattedOrders);
  } catch (error) {
    //Error Handling:
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Setting error handling middleware
app.use((req, res, next) => {
  const error = new Error("404 NOT FOUND");
  error.status = 404;
  next(error);
});

//Handles all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//Specifies the port on which the server will listen
const port = 3000;

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
