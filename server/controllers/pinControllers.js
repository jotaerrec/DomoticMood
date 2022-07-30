const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/usersModel");
const Pin = require("../models/pinConfigModel");

//Verificar si estan bien los objectos

module.exports = {
  create: async function (req, res) {
    const { name, pin, type, typeUse, room, userID } = req.body;
    try {
      if (!name || !pin || !typeUse || !room)
        return res.status(204).json({ error: 'Required "content" is field' });

      const user = await User.findById(userID);
      if (!user) return res.status(200).json({ error: "User not found" });
      const verifyPin = await Pin.findOne({ userID: userID, pin: pin });
      if (verifyPin)
        return res.status(200).json({ error: `Este pin ya esta en uso` });
      const verifyRoom = await User.findOne({ userID: userID, room: room });
      if (!verifyRoom)
        return res.status(200).json({ error: `Esta habitación no existe` });

      const pinConfig = new Pin({
        name: name,
        pin: pin,
        userID: user._id,
        type: type,
        typeUse: typeUse,
        room: room,
      });
      const document = await pinConfig.save();
      res.status(202).json(document);
    } catch (error) {
      res.status(200).json({ error: "Error al crear un nuevo pin" });
      console.log(error);
    }
  },
  updatePin: async function (req, res) {
    const { userID, pin, pinNew } = req.body;
    try {
      if (!pin || !pinNew)
        return res.status(204).json({ error: 'Required "content" is field' });

      const user = await User.findById(userID);
      const verifyPin = await Pin.findOne({ userID: userID, pin: pin });
      if (!user) return res.status(204).json({ error: "User not found" });

      if (verifyPin) return res.status(200).json(`Este pin ya esta en uso`);

      const document = await Pin.findOneAndUpdate(
        { pin, userID },
        { pin: pinNew }
      );
      res.status(201).json(document);
    } catch (error) {
      res
        .status(200)
        .json({ message: "Error al actualizar el pin. Intentelo nuevamente" });
    }
  },
  delete: async function (req, res) {
    const { userID, pin } = req.body;
    try {
      if (!pin)
        return res
          .status(204)
          .json({ error: "Se requiere rellenar los campos" });
      const document = await Pin.findOneDelete({ pin: pin, userID: userID });
      res.status(202).json({ message: "Se elimino con exito" });
    } catch (e) {
      return res.status(200).json({ error: "Error al eliminar" });
    }
  },
  getAll: async function (req, res) {
    try {
      const { userID } = req.body;
      const user = await User.findById(userID);
      if (!user) return res.status(200).json("Este usuario no existe");

      let pins = await Pin.find({ userID: userID });
      if ((!pins || pins.length <= 0) && user.rooms <= 0)
        return res.status(204).json("No tiene pines en uso");
      res.status(202).json({
        rooms: user.rooms,
        pins: pins,
      });
    } catch (error) {
      return res.status(200).json({ error: "Error al obtener los pines" });
    }
  },
};
