var express = require("express");
var app = express();
var router = express.Router();
const pin = require("../controllers/pinControllers");

/* GET users listing. */
router.get("/", app.verifyUsers, pin.getAll);
router.post("/", app.verifyUsers, pin.create);
router.patch("/", app.verifyUsers, pin.updatePin);
router.delete("/", app.verifyUsers, pin.delete);

module.exports = router;
