const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/usersModel");

module.exports = {
  create: async function (req, res) {
    const { roomName, userId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!roomName) {
        return res.status(204).json('Requiere que rellene los campos');
      }
      user.rooms = user.rooms.concat(roomName);
      const document = await user.save();
      res.status(201).json(document);
    } catch (error) {
      res.status(200).json({ error: "Error al crear la habitación" });
    }
  },
  delete: async function (req, res) {
    const { userID, roomName } = req.body;
    try {
      const document = await User.updateOne(
        { _id: userID },
        { $pull: { rooms: roomName } }
      );
      res.status(202).json("Se elimino la habitación correctamente");
    } catch (e) {
      res.status(200).json("Error al eliminar la habitación")
    }
  },
  updateRooms: async function (req, res, next) {
    const { userID, roomName, newRoomName } = req.body;
    try {
      const document = await User.findOneAndUpdate(
        { roomName, userID },
        { roomName: newRoomName }
      );
      res.status(202).json("Se actualizo la habitación correctamente")
    } catch (error) {
      res.status(200).json("Error al actualizar la habitación")
    }
  },
  getAll: async function (req, res) {
    const { userID } = req.body;
    try {
      const { rooms } = await User.findById(userID);
      res.status(202).json(rooms);
    } catch (error) {
      res.status(200).json({error: "Error al obtener las habitaciones"})
    }
  },
};
