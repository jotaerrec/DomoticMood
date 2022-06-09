const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const arduinoCodeModel = require("../models/arduinoCodeModel");
module.exports = {
  create: async function (req, res, next) {
    const { name, email, password, arduinoID } = req.body;
    try {
      const userExist = await usersModel.findOne({ email })

      if (userExist)
        return res.status(200).json({ error: "This user already exist" })

      const arduinoExist = await arduinoCodeModel.findOne({ arduinoID })
      if (arduinoExist)
        return res.status(200).json({ error: "This arduinoCode already in use" })

      const user = new usersModel({
        name,
        email,
        password,
        arduinoID
      });

      const document = await user.save();
      return res.status(200).json(document);
    } catch (e) {
      res.json({ error: e.message });
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

      return res.status(204).json({
        error: false,
        message: "Login ok",
        token: token,
      });
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  },
};
