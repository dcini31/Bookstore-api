const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customers', {
    customer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "UQ__Customer__AB6E61647E4176E3"
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customers',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Customer__CD65CB85F37DBA5A",
        unique: true,
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "UQ__Customer__AB6E61647E4176E3",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
