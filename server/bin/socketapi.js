const io = require("socket.io")();
const socketapi = {
  io: io,
};

// Add your socket.io logic here!
io.on("connection", function (socket) {
  console.log("A user connected", socket.id);
  socket.on("SwitchChange", function (value) {
    console.log(value);
    //arduino.socket.emit("", value);
  });
});
// end of socket.io logic

module.exports = socketapi;
