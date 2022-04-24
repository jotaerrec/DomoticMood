var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/users", function (req, res, next) {});
router.get("/register", function (req, res, next) {});
router.post("/register", function (req, res, next) {});

module.exports = router;
