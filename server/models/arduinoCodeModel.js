const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const validators = require("../util/validators");
const bcrypt = require("bcrypt");
const arduinoCodeSchema = new mongoose.Schema({
  idArduino: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  use: {
    type: Boolean,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    default: false,
  },
  userRegisterID: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
});
module.exports = mongoose.model("arduinoCode", arduinoCodeSchema);
