const express = require("express");
const app = express();
const DB = require("./db");
const userRouter = require("./controllers/usercontroller");
const gameRouter = require("./controllers/gamecontroller");


DB.sequelize.sync() // changed

app.use(express.json());   // add json
app.use("/api/auth", userRouter);
app.use(require("./middleware/validate-session"));
app.use("/api/game", gameRouter);
app.listen(4000, () => {
  console.log("App is listening on 4000");
});


