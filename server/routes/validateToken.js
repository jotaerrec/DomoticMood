const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/",(req, res, next) => {
    req.app.verifyUser(req, res, next);
  }, (req, res, next) => res.status(202).json("Token aceptado"));

module.exports = router;
