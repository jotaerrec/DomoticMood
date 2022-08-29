const { io } = require("../bin/socketapi");
const arduino = {
  socket: "",
};
io.on("connection", (socket) => {
  socket.on("SwitchChange", function (value) {
    console.log(value);
    arduino.socket.emit("", value);
  });
});
