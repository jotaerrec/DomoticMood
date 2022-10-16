const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/usersModel");

module.exports = {
  //Crear habitación
  create: async function (req, res) {
    const { name, userID } = req.body;

    try {
      const user = await User.findById(userID);

      if (!name) {
        return res
          .status(204)
          .json({ error: "Requiere que rellene los campos" });
      }

      user.rooms = user.rooms.concat(name);

      const document = await user.save();

      res.status(201).json({
        rooms: document.rooms,
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({ error: "Error al crear la habitación" });
    }
  },

  //Eliminar habitación
  delete: async function (req, res) {
    const { userID, name } = req.body;

    try {
      const document = await User.updateOne(
        { _id: userID },
        { $pull: { rooms: name } }
      );

      res.status(202).json({ error: "Se elimino la habitación correctamente" });
    } catch (e) {
      res.status(200).json({ error: "Error al eliminar la habitación" });
    }
  },

  //Actualizar habitaciones
  updateRooms: async function (req, res, next) {
    const { userID, name, newname } = req.body;

    try {
      const document = await User.findOneAndUpdate(
        { name, userID },
        { name: newname }
      );

      res
        .status(202)
        .json({ error: "Se actualizo la habitación correctamente" });
    } catch (error) {
      res.status(200).json({ error: "Error al actualizar la habitación" });
    }
  },

  //Obtener habitaciones
  getAll: async function (req, res) {
    const { userID } = req.body;

    try {
      const { rooms } = await User.findById(userID);

      res.status(202).json(rooms);
    } catch (error) {
      res.status(200).json({ error: "Error al obtener las habitaciones" });
    }
  },
};
