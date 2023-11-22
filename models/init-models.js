var DataTypes = require("sequelize").DataTypes;
var _country = require("./country");
var _users = require("./users");

function initModels(sequelize) {
  var country = _country(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    country,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
