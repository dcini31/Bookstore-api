const express = require("express");
const router = express.Router();
const models = require("../../models/init-models")(sequelize); // Adjust path as needed

/**
 * @route GET /api/orders
 * @description Retrieve information about all orders, including book details.
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const orders = await models.Order.findAll({
      include: [
        {
          model: models.Book,
          attributes: ["title", "author", "price"],
        },
      ],
    });

    const formattedOrders = orders.map((order) => ({
      orderId: order.id,
      bookTitle: order.Book.title,
      author: order.Book.author,
      price: order.Book.price,
      quantity: order.quantity,
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
