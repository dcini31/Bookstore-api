const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const initModels = require("./models/init-models");

//Setting SQL Server Connection
const sequelize = new Sequelize("Bookstore", "Daniel", "20naD5013*", {
  host: "localhost",
  dialect: "mssql",
});

//Defines Models
const models = initModels(sequelize);

// Initialize and Test Connection (optional)
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Customers API Endpoint
app.get("/api/customers", async (req, res) => {
  try {
    const customers = await models.Customers.findAll();
    res.status(200);
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" }); // Handles errors
  }
});

// Order Details API Endpoint
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await models.Orders.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" }); // Handles errors
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
