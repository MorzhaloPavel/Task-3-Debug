const express = require("express");
const app = express();
const db = require("./db");
const userRouter = require("./controllers/usercontroller");
const gameRouter = require("./controllers/gamecontroller");


// db.sync();
app.use(require("body-parser"));
app.use("/api/auth", userRouter);
app.use(require("./middleware/validate-session"));
app.use("/api/game", gameRouter);
app.listen(function () {
  console.log("App is listening on 4000");
});


