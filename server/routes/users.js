var express = require("express");
var router = express.Router();
const users = require("../controllers/usersControllers");

/* GET users listing. */
router.post("/", users.login);
router.post("/register", users.create);
router.post("/arduino", users.createArduinoId);

module.exports = router;
