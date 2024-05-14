const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Authors', {
    author_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Authors',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Authors__86516BCF43F4218B",
        unique: true,
        fields: [
          { name: "author_id" },
        ]
      },
    ]
  });
};
