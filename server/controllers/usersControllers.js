const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const arduinoCodeModel = require("../models/arduinoCodeModel");
module.exports = {
  create: async function (req, res, next) {
    const { username, email, password, arduinoID } = req.body;
    try {
      console.log(req.body);
      const userExist = await usersModel.findOne({ email });

      if (userExist)
        return res.status(200).json({ error: "This user already exist" });

      const arduinoExist = await arduinoCodeModel.findOne({
        idArduino: arduinoID,
      });
      if (!arduinoExist)
        return res.status(200).json({ error: "This arduinoCode not exist" });
      if (arduinoExist.use)
        return res
          .status(200)
          .json({ error: "This arduinoCode already in use" });

      const user = new usersModel({
        name: username,
        email: email,
        password: password,
        arduinoID: arduinoExist,
      });

      const document = await user.save();
      return res.status(200).json(document);
    } catch (e) {
      res.json({ error: e.message });
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await usersModel.findOne({ email: email });

      const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.password);

      if (!(user && passwordCorrect)) {
        return res.json({
          error: "invalid user or password",
        });
      }

      const token = jwt.sign(
        { userID: user._id },
        req.app.get("secretKey"),
        {}
      );
      console.log(token);

      return res.json({
        error: false,
        message: "Login ok",
        token: token,
      });
    } catch (e) {
      console.log(e);
      res.json({ message: e.message });
    }
  },
  createArduinoId: async (req, res, next) => {
    const { idArduino } = req.body;
    try {
      console.log(req.body);
      const arduino = new arduinoCodeModel({
        idArduino: idArduino,
      });

      const document = await arduino.save();
      return res.status(200).json(document);
    } catch (error) {
      console.log(error);
    }
  },
};
