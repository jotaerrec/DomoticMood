const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/usersModel");
const Pin = require("../models/pinConfigModel");

//Funciones
module.exports = {
  //Crear prin
  create: async function (req, res) {
    const { name, pin, type, typeUse, room, userID } = req.body;

    try {
      if (!name || !pin || !typeUse || !room)
        return res.status(204).json({ error: 'Required "content" is field' });

      const user = await User.findById(userID);
      if (!user) return res.status(200).json({ error: "User not found" });

      if (typeUse == "DHT11") {
        if (pin >= 5 && pin <= 9) {
          const pins = await Pin.find({ userID: userID, typeUse: typeUse });
          if (pins.length > 5) {
            return res
              .status(200)
              .json({ error: "Alcanzaste el maximo de DHT11" });
          }
        } else {
          return res
            .status(200)
            .json({ error: "Los pines validos para el DHT11 son del 5 al 9" });
        }
      }
      if (typeUse == "DHT22") {
        if (pin >= 0 && pin <= 4) {
          const pins = await Pin.find({ userID: userID, typeUse: typeUse });
          if (pins.length > 5) {
            return res
              .status(200)
              .json({ error: "Alcanzaste el maximo de DHT22" });
          }
        } else {
          return res
            .status(200)
            .json({ error: "Los pines validos para el DHT22 son del 0 al 4" });
        }
      }

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

  //Cambiar el nombre del pin
  changeName: async function (req, res) {
    const { userID, pin, name } = req.body;

    try {
      if (!pin)
        return res.status(204).json({ error: 'Required "content" is field' });

      const user = await User.findById(userID);
      if (!user) return res.status(204).json({ error: "User not found" });

      const verifyPin = await Pin.findOne({ userID: userID, pin: pin });
      if (!verifyPin)
        return res.status(200).json({ error: `Este pin no existe` });

      const document = await Pin.findOneAndUpdate(
        { pin, userID },
        { name: name }
      );

      res.status(202).json({ message: "Se actualizo correctamente" });
    } catch (error) {
      res
        .status(200)
        .json({ error: "Error al actualizar el pin. Intentelo nuevamente" });
    }
  },

  //Actualizar pin
  updatePin: async function (req, res) {
    const { userID, pin, pinNew } = req.body;

    try {
      if (!pin || !pinNew)
        return res.status(204).json({ error: 'Required "content" is field' });

      const user = await User.findById(userID);
      if (!user) return res.status(204).json({ error: "User not found" });

      const verifyPin = await Pin.findOne({ userID: userID, pin: pin });
      if (verifyPin)
        return res.status(200).json({ error: `Este pin ya esta en uso` });

      const document = await Pin.findOneAndUpdate(
        { pin, userID },
        { pin: pinNew }
      );

      res.status(201).json(document);
    } catch (error) {
      res
        .status(200)
        .json({ error: "Error al actualizar el pin. Intentelo nuevamente" });
    }
  },

  //Cambiar el estado de important
  changeImportant: async function (req, res) {
    const { userID, pin, important } = req.body;

    try {
      if (!pin)
        return res.status(204).json({ error: 'Required "content" is field' });

      const user = await User.findById(userID);
      if (!user) return res.status(204).json({ error: "User not found" });

      const verifyPin = await Pin.findOne({ userID: userID, pin: pin });
      if (!verifyPin)
        return res.status(200).json({ error: `Este pin no existe` });

      const document = await Pin.findOneAndUpdate(
        { pin, userID },
        { important: important }
      );

      res.status(202).json({ message: "Se actualizo correctamente" });
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .json({ error: "Error al actualizar el pin. Intentelo nuevamente" });
    }
  },

  //Eliminar pin
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

  //Obtener todos los pines
  getAll: async function (req, res) {
    try {
      let pins;

      const { userID } = req.body;

      const user = await User.findById(userID);
      if (!user)
        return res.status(200).json({ error: "Este usuario no existe" });

      const room = req.headers["room"] || false;
      if (room) pins = await Pin.find({ userID: userID, room });
      else pins = await Pin.find({ userID: userID, important: true });

      if ((!pins || pins.length <= 0) && user.rooms <= 0)
        return res.status(204).json({ error: "No tiene pines en uso" });

      res.status(202).json({
        rooms: user.rooms,
        pins: pins,
      });
    } catch (error) {
      return res.status(200).json({ error: "Error al obtener los pines" });
    }
  },
};
