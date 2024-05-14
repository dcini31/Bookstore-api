const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "OrderDetails",
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Orders",
          key: "order_id",
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Books",
          key: "book_id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "OrderDetails",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "PK__OrderDet__42C9B38702262A85",
          unique: true,
          fields: [{ name: "order_id" }, { name: "book_id" }],
        },
      ],
    }
  );
};
