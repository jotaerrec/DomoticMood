const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const validators = require("../util/validators");
const pinConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  pin: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    unique: [true],
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  //OUTPUT[FALSE] OR INPUT[TRUE]
  type: {
    type: Boolean,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  // RELAY OR DIMMER OR SENSOR OR ALARM
  typeUse: {
    type: String,
  },
  // WHAT ROOM IT IS IN?
  room: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  // IF THE TYPE USE IS AN ALARM, CHECK IF IT WAS ACTIVATED.
  alert: {
    type: Boolean,
    default: 0,
  },
  // IF THE TYPE USE IS A SENSOR, SAVE TO VALUE
  value: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("pinConfig", pinConfigSchema);

/*
  ---JSON EXAMPLE---

  name: 'Alarma 1',
  pin: '20',
  type: true,
  typeUse: 'alarm',
  room: 'Living'
*/
