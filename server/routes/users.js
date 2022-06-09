var express = require("express");
var router = express.Router();
const users = require('../controllers/usersControllers')

/* GET users listing. */
router.post("/users", users.login(req, res, next));
router.post("/register", users.create(req, res, next));

module.exports = router;
