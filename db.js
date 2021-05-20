const Sequelize = require("sequelize");
require("dotenv").config();
const pg = require('pg');
const userSchema = require('./models/user')
const gameSchema = require('./models/game')

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_URL,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false, // add operatorsAliases: false
  }
);

const User = new userSchema(sequelize, Sequelize)
const Game = new gameSchema(sequelize, Sequelize)





module.exports = {User, Game}



// sequelize.authenticate().then(
//   function success() {
//     console.log("Connected to DB");
//   },

//   function fail(err) {
//     console.log(`Error: ${err}`);
//   }
// );


const client = new pg.Client(conString);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    client.end();
  });
});