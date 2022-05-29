const { io } = require("../bin/socketapi");
const arduino = {
  socket: "",
};
io.on("connection", (socket) => {
  socket.on("ConfigureAtmega", (data) => {
    if (data === process.env.CLAVEHASHEADA) arduino.socket = socket;
  });
  socket.on("SwitchChange", function (value) {
    console.log(value);
    arduino.socket.emit("", value);
  });
});
