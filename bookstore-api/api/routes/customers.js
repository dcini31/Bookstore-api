const express = require("express");
const router = express.Router();
const models = require("../../models/init-models")(sequelize); // Adjust path as needed

/**
 * @route GET /api/customers
 * @description Retrieve information about all customers.
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const customers = await models.Customers.findAll({
      attributes: ["name", "email", "address"],
    });
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
