const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/usersModel");
const Rooms = require("../models/roomsUsersModel");

module.exports = {
  create: async function (req, res) {
    const { roomName, userId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!roomName) {
        return res.status(204).json('required "content" is field');
      }
      user.rooms = user.rooms.concat(roomName);
      const document = await user.save();
      res.json(document);
    } catch (error) {
      res.status(400).json({ message: e.message });
    }
  },
  delete: async function (req, res) {
    const { userID, roomName } = req.body;
    try {
      let document = await User.updateOne(
        { _id: userID },
        { $pull: { rooms: roomName } }
      );
      res.status(200).json(document);
    } catch (e) {
      next(e);
    }
  },
  getAll: async function (req, res) {
    const { userID } = req.body;
    const { rooms } = await User.findById(userID);
    response.json(rooms);
  },
};
