const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  create: async function (req, res, next) {
    try {
      const user = new usersModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        arduinoID: req.body.arduinoID,
      });
      const document = await user.save();
      res.json(document);
    } catch (e) {
      res.json({ message: e.message });
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await usersModel.findOne({ email: req.body.email });

      const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.password);

      if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: "invalid user or password",
        });
      }

      const token = jwt.sign(
        { userID: user._id },
        req.app.get("secretKey"),
        {}
      );

      res.json({
        error: false,
        message: "Login ok",
        token: token,
      });
      return;
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  },
};
