const express = require("express");
const router = express.Router();
const models = require("../../models/init-models")(sequelize);

/**
 * @route GET /api/customers
 * @description Retrieve information about all customers.
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const customers = await models.Customers.findAll({
      attributes: ["customer_id", "name", "email", "address"],
    });
    res.json(customers);
    res.status(200);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
