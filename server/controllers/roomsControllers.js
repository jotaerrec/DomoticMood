const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/usersModel");

module.exports = {
  create: async function (req, res) {
    const { name, userID } = req.body;
    try {
      console.log(userID);
      const user = await User.findById(userID);
      if (!name) {
        return res.status(204).json("Requiere que rellene los campos");
      }
      console.log(user);
      user.rooms = user.rooms.concat(name);
      const document = await user.save();
      console.log(document);
      res.status(201).json(document);
    } catch (error) {
      console.log(error);
      res.status(200).json({ error: "Error al crear la habitación" });
    }
  },
  delete: async function (req, res) {
    const { userID, name } = req.body;
    try {
      const document = await User.updateOne(
        { _id: userID },
        { $pull: { rooms: name } }
      );
      res.status(202).json("Se elimino la habitación correctamente");
    } catch (e) {
      res.status(200).json("Error al eliminar la habitación");
    }
  },
  updateRooms: async function (req, res, next) {
    const { userID, name, newname } = req.body;
    try {
      const document = await User.findOneAndUpdate(
        { name, userID },
        { name: newname }
      );
      res.status(202).json("Se actualizo la habitación correctamente");
    } catch (error) {
      res.status(200).json("Error al actualizar la habitación");
    }
  },
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
