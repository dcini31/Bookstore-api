const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Orders",
    {
      order_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Customers",
          key: "customer_id",
        },
      },
      order_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Orders",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "PK__Orders__465962297406BA6C",
          unique: true,
          fields: [{ name: "order_id" }],
        },
      ],
    }
  );
};
