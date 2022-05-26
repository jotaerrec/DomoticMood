const io = require("socket.io")();
const socketapi = {
  io: io,
};

const arduino = {
  socket: ""
}

// Add your socket.io logic here!
io.on("connection", function (socket) {
  socket.on("event_name", (data) => {
    arduino.socket = socket
    console.log(arduino.socket)
  });
  console.log("A user connected", socket.id);
  socket.emit("PONG", "PING");
  socket.on("responsePong", data1 =>{
    arduino.socket = socket
    console.log(arduino.socket)
  })
  socket.on("SwitchChange", function(value){
    console.log(value)
    arduino.socket.emit("PING",value);
    
  })
  socket.emit("PING", "PONG");
});
// end of socket.io logic


module.exports = socketapi;