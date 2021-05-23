const jwt = require("jsonwebtoken");
const DB = require("../db"); // require('sequelize').import('../models/user');

const User = DB.User

module.exports = function (req, res, next) {
  if (req.method == "OPTIONS") {
    next(); // allowing options as a method for request
  }

  const sessionToken = req.headers.authorization;
  console.log(sessionToken);

  if (!sessionToken) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(sessionToken, "lets_play_sum_games_man", (err, decoded) => {
    User.findOne({ where: { id: decoded.id } }).then((user) => {
      req.user = user;
      console.log(`user: ${user}`);
      next();
    }).catch(() => res.status(401).send({ error: "not authorized" }))
  });
};
