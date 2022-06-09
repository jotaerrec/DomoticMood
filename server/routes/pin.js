var express = require("express");
var app = express()
var router = express.Router();
const pin = require('../controllers/pinControllers')

/* GET users listing. */
router.get("/", app.verifyUsers, pin.getAll(req, res, next));
router.post("/", app.verifyUsers, pin.create(req, res, next))
router.patch("/", app.verifyUsers, pin.updatePin(req, res, next));
router.delete("/", app.verifyUsers, pin.delete(req, res, next))

module.exports = router;
