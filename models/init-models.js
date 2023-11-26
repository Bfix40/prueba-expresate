var DataTypes = require("sequelize").DataTypes;
var _country = require("./country");
var _users = require("./users");
const Sequelize = require("sequelize");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../config/config");

const configObj = config[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(
        process.env[configObj.use_env_variable],
        configObj
    );
} else {
    sequelize = new Sequelize(
        configObj.database,
        configObj.username,
        configObj.password,
        configObj
    );
}

function initModels() {
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
