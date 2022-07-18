const express = require("express");
const app = express();
const router = express.Router();
const pin = require("../controllers/pinControllers");

/* GET users listing. */
router.get(
  "/",
  (req, res, next) => {
    req.app.verifyUser(req, res, next);
  },
  pin.getAll
);
router.post(
  "/",
  (req, res, next) => {
    req.app.verifyUser(req, res, next);
  },
  pin.create
);
router.patch(
  "/",
  (req, res, next) => {
    req.app.verifyUser(req, res, next);
  },
  pin.updatePin
);
router.delete(
  "/",
  (req, res, next) => {
    req.app.verifyUser(req, res, next);
  },
  pin.delete
);

module.exports = router;