var express = require("express");
var app = express()
var router = express.Router();
const rooms = require('../controllers/roomsControllers')

/* GET users listing. */
router.get("/", app.verifyUsers, rooms.getAll(req, res, next));
router.post("/", app.verifyUsers, rooms.create(req, res, next))
router.patch("/", app.verifyUsers, rooms.updaterooms(req, res, next));
router.delete("/", app.verifyUsers, rooms.delete(req, res, next))

module.exports = router;
