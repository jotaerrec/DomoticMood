const io = require("socket.io")();
const socketapi = {
  io: io,
};

// Add your socket.io logic here!
io.on("connection", function (socket) {
  socket.on("event_name", (data) => {
    console.log(data);
  });
  console.log("A user connected", socket.id);
  socket.emit("PONG", "PING");
  socket.on("responsePong", data1 =>{
    console.log(data1)
  })
  socket.emit("PING", "PONG");
});
// end of socket.io logic

module.exports = socketapi;
