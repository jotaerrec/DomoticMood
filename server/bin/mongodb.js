const mongoose = require("mongoose");
try {
  mongoose.connect(
    "mongodb+srv://jotaerrec:Camilo2015@cluster0.8ygvree.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error) {
      if (error) {
        console.log("No se pudo conectar.");
      } else {
        console.log("Conectado a MongoDB");
      }
    }
  );
} catch (error) {
  console.log("No se pudo conectar.");
}
module.exports = mongoose;
