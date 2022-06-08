var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
mongoose.connect(
  "mongodb://localhost:27017/DomoticMood",
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
