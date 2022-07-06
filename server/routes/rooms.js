const express = require("express");
const app = express();
const router = express.Router();
const rooms = require("../controllers/roomsControllers");

/* GET users listing. */
router.get(
  "/",
  (req, res, next) => {
    req.app.verifyUser(req, res, next);
  },
  rooms.getAll
);
router.post(
  "/",
  (req, res, next) => {
    req.app.verifyUser(req, res, next);
  },
  rooms.create
);
router.delete(
  "/",
  (req, res, next) => {
    req.app.verifyUser(req, res, next);
  },
  rooms.delete
);

module.exports = router;
