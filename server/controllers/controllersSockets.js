const socketapi = require("../bin/socketapi");


socketapi.io.on('connection', function(socket){
// Add your socket.io logic here!
  console.log("A user connected", socket.id);
// end of socket.io logic
})

socketapi.io.on('responsePong', function(socket){
  console.log(socket)
})
socketapi.io.on("close", function(socket){
  console.log("User Disconnect ", socket.id)
})