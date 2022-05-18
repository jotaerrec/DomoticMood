/* const controllers = (ws) => {
  ws.on("connection", async (socket) => {
    socket.on("message", function (message) {
      console.log("Received: " + message);
      ws.clients.forEach(function (client) {
        //broadcast incoming message to all clients (s.clients)
        if (client != ws && client.readyState) {
          //except to the same client (ws) that sent this message
          client.send("broadcast: " + message);
          console.log(socket);
        }
      });
      // ws.send("From Server only to sender: "+ message); //send to client where message is from
    });
    socket.on("close", function () {
      console.log("lost one client");
    });
    //ws.send("new client connected");
    console.log("new client connected");
  });
};
module.exports = {
  controllers: controllers,
};
 */
