const Sequelize = require("sequelize");
require("dotenv").config();
const pg = require('pg');

const sequelize = new Sequelize(
  process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5433
  } 
);

const DB = {};

DB.sequelize = sequelize;
DB.Sequelize = Sequelize;

DB.User = require('./models/user')(sequelize, Sequelize)
DB.Game = require('./models/game')(sequelize, Sequelize)


sequelize.authenticate().then(
  function success() {
    console.log("Connected to DB");
  },
  function fail(err) {
    console.log(`Error: ${err}`);
  }
);

module.exports = DB
