var DataTypes = require("sequelize").DataTypes;
var _Authors = require("./Authors");
var _Books = require("./Books");
var _Customers = require("./Customers");
var _OrderDetails = require("./OrderDetails");
var _Orders = require("./Orders");

function initModels(sequelize) {
  var Authors = _Authors(sequelize, DataTypes);
  var Books = _Books(sequelize, DataTypes);
  var Customers = _Customers(sequelize, DataTypes);
  var OrderDetails = _OrderDetails(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);

  Books.belongsToMany(Orders, {
    as: "order_id_Orders",
    through: OrderDetails,
    foreignKey: "book_id",
    otherKey: "order_id",
  });
  Orders.belongsToMany(Books, {
    as: "book_id_Books",
    through: OrderDetails,
    foreignKey: "order_id",
    otherKey: "book_id",
  });
  Books.belongsTo(Authors, { as: "author", foreignKey: "author_id" });
  Authors.hasMany(Books, { as: "Books", foreignKey: "author_id" });
  OrderDetails.belongsTo(Books, { as: "book", foreignKey: "book_id" });
  Books.hasMany(OrderDetails, { as: "OrderDetails", foreignKey: "book_id" });
  Orders.belongsTo(Customers, { as: "customer", foreignKey: "customer_id" });
  Customers.hasMany(Orders, { as: "Orders", foreignKey: "customer_id" });
  OrderDetails.belongsTo(Orders, { as: "order", foreignKey: "order_id" });
  Orders.hasMany(OrderDetails, { as: "OrderDetails", foreignKey: "order_id" });

  return {
    Authors,
    Books,
    Customers,
    OrderDetails,
    Orders,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
