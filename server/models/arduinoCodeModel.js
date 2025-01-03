const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const validators = require("../util/validators");

const arduinoCodeSchema = new mongoose.Schema({
  idArduino: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },

  use: {
    type: Boolean,
    default: false,
  },

  userRegisterID: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("arduinoCode", arduinoCodeSchema);
