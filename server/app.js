const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dns = require("dns");
const validate = require("./controllers/validationUser");

// Imports Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const pinRouter = require("./routes/pin");
const roomRouter = require("./routes/rooms");
const tokenRouter = require("./routes/validateToken")

//Initialization
const app = express();
require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("secretKey", process.env.SECRETKEY);
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
dns.lookup(require("os").hostname(), function (err, add, fam) {
  console.log("addr: " + add);
});

//Initialization Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pins", pinRouter);
app.use("/rooms", roomRouter);
app.use("/validateToken", tokenRouter)

app.verifyUser = validate.validateUser;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
