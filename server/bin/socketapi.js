const io = require("socket.io")();
const socketapi = {
  io: io,
};
const arduino = {
  socket: new Map(),
};
const User = require("../models/usersModel");
const Pin = require("../models/pinConfigModel");

// Add your socket.io logic here!

io.on("connection", function (socket) {
  console.log("A user connected", socket.id);
  socket.on("SwitchChange", function (value) {
    console.log(value);
    //arduino.socket.emit("", value);
  });
  socket.emit("PONG");
  socket.on("ConfigureAtmega", (data) => {
    arduino.socket.set(data.now, socket);
    console.log(data.now);
    let prueba = arduino.socket.get(data.now);
    prueba.emit("hola");
  });
  socket.on("SwitchChange", function (value) {
    console.log(value);
    let socketEmit = arduino.socket.get(process.env.CLAVEHASHEADA);
    //Pin.findOneAndUpdate({ userID: userID, pin: pin }, {value:value});
    /*let index = arduino.socket.indexOf(process.env.CLAVEHASHEADA);
    let arduinoSocket = arduino.socket;*/
    socketEmit?.emit(value);
  });
});

// end of socket.io logic

module.exports = socketapi;
