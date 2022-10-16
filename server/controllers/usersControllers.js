const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const arduinoCodeModel = require("../models/arduinoCodeModel");

module.exports = {
  //Crear usuario
  create: async function (req, res, next) {
    const { username, email, password, arduinoID } = req.body;
    try {
      if (!username || !email || !password || !arduinoID)
        return res
          .status(204)
          .json({ error: "Requiere que rellene los campos" });

      const userExist = await usersModel.findOne({ email });

      if (userExist)
        return res.status(200).json({ error: "Este usuario ya existe" });

      const arduinoExist = await arduinoCodeModel.findOne({
        idArduino: arduinoID,
      });

      if (!arduinoExist)
        return res.status(200).json({
          error: "Este codigo de arduino no existe. Intentelo nuevamente",
        });

      if (arduinoExist.use)
        return res
          .status(200)
          .json({ error: "Este codigo de arduino ya está en uso" });

      const user = new usersModel({
        name: username,
        email: email,
        password: bcrypt.hashSync(password, 10),
        arduinoID: arduinoExist,
      });

      const document = await user.save();
      return res
        .status(201)
        .json({ message: "Usuario creado correctamente, ahora inicie sesión" });
    } catch (e) {
      res.json({ error: "Error al crear el usuario" });
    }
  },

  //Iniciar Sesión
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || !password)
        return res
          .status(204)
          .json({ error: "Requiere que rellene los campos" });

      const user = await usersModel.findOne({ email: email });

      const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.password);

      if (!passwordCorrect) {
        return res.status(200).json({
          error: "Usuario o contraseña incorrecta",
        });
      }

      const token = jwt.sign(
        { userID: user._id },
        req.app.get("secretKey"),
        {}
      );

      return res.status(202).json({
        message: "Se inicio sesion correctamente",
        token: token,
      });
    } catch (e) {
      console.log(e);
      res.status(200).json({ error: "Error al iniciar sesión" });
    }
  },

  //Crear codigo de arduino
  createArduinoId: async (req, res, next) => {
    const { idArduino } = req.body;
    try {
      console.log(req.body);
      const arduino = new arduinoCodeModel({
        idArduino: idArduino,
      });

      const document = await arduino.save();
      return res.status(201).json(document);
    } catch (error) {
      console.log(error);
      res.status(200).json({ error: "Error al crear ID" });
    }
  },
};
