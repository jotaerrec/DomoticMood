const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/usersModel");
const Pin = require("../models/pinConfigModel");

//Verificar si estan bien los objectos 

module.exports = {
  create: async function (req, res) {
    const { name, pin, type, typeUse, room, userID } = req.body;
    try {
      const user = await User.findById(userID);
      if (!name || !pin || !typeUse || !room)
        return res.status(204).json('Required "content" is field');

      if (!user)
        return res.status(200).json('User not found')

      pinConfigModel;
      const pinConfig = new Pin({
        'name': name,
        'pin': pin,
        'userID': user._id,
        'type': type,
        'typeUse': typeUse,
        'room': room,
      });
      const document = await pinConfig.save();
      res.json(document);
    } catch (error) {
      res.status(400).json({ message: e.message });
    }
  },
  updatePin: async function (req, res) {
    const { userID, pin, pinNew } = req.body;
    try {
      if (!pin || !pinNew)
        return res.status(204).json('Required "content" is field');
      const user = await User.findById(userID);
      const verifyPin = await Pin.findOne({ userID: userID, pin: pin })
      if (!user)
        return res.status(200).json('User not found')
      if (verifyPin)
        return res.status(200).json(`The new Pin is already in use `)
      let document = await Pin.findOneAndUpdate({ pin, userID }, { pin: pinNew })
      res.status(200).json(document);
    } catch (error) {

    }
  },
  delete: async function (req, res) {
    const { userID, pin } = req.body;
    try {
      if (!pin)
        return res.status(204).json('Required "content" is field');
      let document = await Pin.findOneDelete({ pin, userID });
      res.status(200).json(document);
    } catch (e) {
      next(e);
    }
  },
  getAll: async function (req, res) {
    const { userID } = req.body;
    const pins = await Pin.find({ userID: userID });
    if (!user || !pins)
      return res.status(200).json('User not found')
    response.json(pins);
  },
};
