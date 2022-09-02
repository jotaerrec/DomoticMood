const User = require("../models/usersModel");
const Pin = require("../models/pinConfigModel");
const Arduino = require("../models/arduinoCodeModel");
const jwt = require("jsonwebtoken");
const io = require("socket.io")();
const socketapi = {
  io: io,
};
const arduino = {
  socket: new Map(),
};
// Add your socket.io logic here!

io.on("connection", function (socket) {
  socket.emit("PONG");
  console.log("A user connected", socket.id);
  socket.on("ConfigureAtmega", (data) => {
    console.log("[CONFIGURANDO]");
    arduino.socket.set(data.now, socket);
    console.log(data.now);
  });
  socket.on("SwitchChange", async function (data) {
    try {
      let user = {};
      let value = data.split("token:");
      console.log(value[0]);
      jwt.verify(value[1], process.env.SECRETKEY, function (err, decoded) {
        if (err) {
          console.log(err);
        } else {
          user.ID = decoded.userID;
        }
      });
      user = await User.findById(user.ID);
      arduinoCode = await Arduino.findById(user.arduinoID);
      UpdateValue(value[0], arduinoCode.idArduino, user.id);
    } catch (error) {
      console.log(error);
    }
  });
});

const UpdateValue = async (value, arduinoID, ID) => {
  try {
    let statePin;
    console.log(ID);
    console.log(arduinoID);
    let arrayValue = value.split("=");
    arrayValue[1] = arrayValue[1].replace("[", "").replace("]", "").split(",");
    arrayValue[1][1] === "true" ? (statePin = 1) : (statePin = 0);
    console.log(statePin, arrayValue[1][0]);
    let result = await Pin.findOneAndUpdate(
      { pin: arrayValue[1][0], userID: ID },
      { value: statePin }
    );
    console.log(result);
    let socketEmit = arduino.socket.get(arduinoID);
    try {
      socketEmit?.emit(value);
    } catch (error) {
      socketEmit?.emit("disconnect");
      arduino.socket.delete(arduinoID);
    }
  } catch (error) {
    console.log(error);
  }
};

// end of socket.io logic

module.exports = socketapi;
