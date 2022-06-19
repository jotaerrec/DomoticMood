const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const validators = require("../util/validators");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  email: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    unique: true,
  },
  password: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    validate: {
      validator: function (v) {
        return validators.isGoodPassword(v);
      },
    },
  },
  arduinoID: {
    type: mongoose.Schema.ObjectId,
    ref: "arduinoCode",
  },
  rooms: {
    type: [String],
  },
});
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
userSchema.statics.findBydIdAndValidate = async function (id) {
  const document = await this.findById(id);
  if (!document) {
    return {
      error: true,
      message: "No existe usuarios",
    };
  }
  return document;
};

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});
module.exports = mongoose.model("users", userSchema);
