const io = require( "socket.io" )();
const socketapi = {
    io: io
}; 
 
// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "A user connected", socket.id);
    socket.on("error", (err) => {
        console.log(err.stack);
      });
});
io.on("error", (err) => {
    console.log(err.stack);
});
// end of socket.io logic

module.exports = socketapi; 