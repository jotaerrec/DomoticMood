var express = require("express");
var app = express();
var router = express.Router();
const rooms = require("../controllers/roomsControllers");

/* GET users listing. */
router.get("/", app.verifyUsers, rooms.getAll);
router.post("/", app.verifyUsers, rooms.create);
router.patch("/", app.verifyUsers, rooms.updaterooms);
router.delete("/", app.verifyUsers, rooms.delete);

module.exports = router;
