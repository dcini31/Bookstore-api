const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Books', {
    book_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Authors',
        key: 'author_id'
      }
    },
    price: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Books',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Books__490D1AE19421EC7E",
        unique: true,
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  });
};
