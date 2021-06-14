const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DB = require("../db");

const User = DB.User

router.post("/signup", (req, res) => {
  User.create({
    full_name: req.body.user.full_name,
    username: req.body.user.username,
    passwordHash: bcrypt.hashSync(req.body.user.password, 10),
    email: req.body.user.email
  }).then( (user) => {
    const token = jwt.sign({ id: user.id }, "lets_play_sum_games_man", {
      expiresIn: 60 * 60 * 24,
    });
    res.status(201).json({
      user: user,
      token: token,
    })
  }).catch(err => res.status(500).send(err.message))
});

router.get("/signin", (req, res) => {
  User.findOne({ where: { username: req.body.user.username } }).then((user) => {
    if (!user) return res.sendStatus(400)
    bcrypt.compare(
      req.body.user.password,
      user.passwordHash)
      .then(() => {
        const token = jwt.sign({ id: user.id }, "lets_play_sum_games_man", {
          expiresIn: 60 * 60 * 24,
        });
          res.status(200).json({
          user: user,
          message: "Successfully authenticated.",
          sessionToken: token,
        });
      }).catch(err => res.status(502).send({ error: "Passwords do not match." }))
  }).catch(err => res.status(403).send({ error: "User not found." }))
});

module.exports = router;
