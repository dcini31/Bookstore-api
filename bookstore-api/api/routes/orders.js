const express = require("express");
const router = express.Router();
const models = require("../../models/init-models")(sequelize);

router.get("/", async (req, res) => {});

module.exports = router;
