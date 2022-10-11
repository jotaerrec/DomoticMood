const mongoose = require("mongoose");
try {
  mongoose.connect(
    process.env.MONGOURL,
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
