const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jotaerrec:Camilo2015@cluster0.8ygvree.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      throw error;
    } else {
      console.log("Conectado a MongoDB");
    }
  }
);
module.exports = mongoose;
 