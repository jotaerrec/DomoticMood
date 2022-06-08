const mongoose = require("../bin/mongodb");
const pinConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  pin: {
    type: String,
    required: [true],
    unique: [true],
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  //OUTPUT[FALSE] OR INPUT[TRUE]
  type: {
    type: Boolean,
    required: true,
  },
  // RELAY OR DIMMER OR SENSOR OR ALARM
  typeUse: {
    type: String,
  },
  // WHAT ROOM IT IS IN?
  room: {
    type: String,
    required: true,
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
module.exports = mongoose.model("outputConfig", outputConfigSchema);
