const socketapi = require("../bin/socketapi");
socketapi.io.on("connection", async (socket) => {
    socket.on("ready", (socketio) => {
        console.log(socketio);
    });
    socket.on("message", (client) =>{
        console.log(client)
    })
  });