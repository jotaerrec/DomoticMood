const mongoose = require("mongoose");
try {
  mongoose.connect(
    process.env.MONGO_URL,
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
