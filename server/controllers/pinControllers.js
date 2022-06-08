const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/usersModel");
const Pin = require("../models/pinConfigModel");

module.exports = {
  create: async function (req, res) {
    const { name, pin, type, typeUse, room, userID } = req.body;
    try {
      const user = await User.findById(userID);
      if (!name || !pin || !typeUse || !room) {
        return res.status(204).json('required "content" is field');
      }
      pinConfigModel;
      const pinConfig = new Pin({
        name,
        pin,
        userID: user._id,
        type,
        typeUse,
        room,
      });
      const document = await pinConfig.save();
      res.json(document);
    } catch (error) {
      res.status(400).json({ message: e.message });
    }
  },
  delete: async function (req, res) {
    const { userID, pin } = req.body;
    try {
      let document = await Pin.deleteOne({ pin, userID });
      res.status(200).json(document);
    } catch (e) {
      next(e);
    }
  },
  getAll: async function (req, res) {
    const { userID } = req.body;
    const pins = await Pin.findById(userID);
    response.json(pins);
  },
};
