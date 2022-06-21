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
      const document = await User.updateOne(
        { _id: userID },
        { $pull: { rooms: roomName } }
      );
      res.status(200).json(document);
    } catch (e) {
      next(e);
    }
  },
  updateRooms: async function (req, res, next) {
    const { userID, roomName, newRoomName } = req.body;
    try {
      const document = await Rooms.findOneAndUpdate(
        { roomName, userID },
        { roomName: newRoomName }
      );
    } catch (error) {
      next(error);
    }
  },
  getAll: async function (req, res) {
    const { userID } = req.body;
    try {
      const { rooms } = await User.findById(userID);
      response.json(rooms);
    } catch (error) {
      next(error);
    }
  },
};
