const express = require("express");
const router = express.Router();
const models = require("../../models/init-models")(sequelize);

/**
 * @route GET /api/orders
 * @description Retrieve information about all orders, including book details.
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const orders = await models.Orders.findAll({
      include: [
        {
          model: models.OrderDetails,
          include: [
            {
              model: models.Books,
              attributes: ["title", "author", "price"],
            },
          ],
        },
      ],
    });

    // Format the response for each order to include the required details
    const formattedOrders = orders.map((order) => ({
      orderId: order.order_id,
      orderDate: order.order_date,
      books: order.OrderDetails.map((detail) => ({
        bookTitle: detail.Book.title,
        author: detail.Book.author,
        price: detail.Book.price,
        quantity: detail.quantity,
      })),
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
