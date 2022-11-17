const User = require("../models/usersModel");
const Pin = require("../models/pinConfigModel");
const Arduino = require("../models/arduinoCodeModel");
const jwt = require("jsonwebtoken");
const io = require("socket.io")();
const socketapi = {
  io: io,
};
const arduino = {
  socket: new Map(),
};
const Users = new Map();

io.on("connection", function (socket) {
  socket.emit("PONG");

  console.log("A user connected", socket.id);

  socket.emit("UserConfigure");

  socket.on("ConfigureUser", async (data) => {
    //Verifica y guarda el usuario conectado
    data = data?.substr(1, data.length - 2);

    let user = {};
    await jwt.verify(data, "DOMOTICMOOD", function (err, decoded) {
      if (err) {
        console.log("No se pudo verificar");
      } else {
        user.ID = decoded.userID;
      }
    });

    let dataTemp = await Users.get(user.ID);

    if (dataTemp) {
      if (dataTemp.indexOf(socket) == -1) dataTemp.push(socket);
      else return console.log(`Usuario ya guardado anteriormente`);
    } else {
      dataTemp = [socket];
      console.log("Guardando Socket");
    }
    Users.set(user.ID, dataTemp);
    console.log(`[ Save User SocketID=[${socket.id}] -- KeyID=${user.ID} ]`);
  });

  socket.on("ConfigureAtmega", async (data) => {
    //Guarda el socket del ATMEGA
    console.log("[CONFIGURADO]");
    arduino.socket.set(data.now, socket);
    console.log(data.now);
    const arduinoCode = await Arduino.find({ idArduino: data.now });
    console.log(arduinoCode);
    const user = await User.findById(arduinoCode.userRegisterID);
    console.log(user);
    const pins = await Pin.find({ userID: user._id });
    pins.map((e) => {
      socket.emit("[CONFIGUREPIN]", `[CONFIGUREPIN],${e.typeUse}/@/${e.pin}`);
    });
  });

  socket.on("SwitchChange", async function (data) {
    //Obtiene el cambio de valores recibidos desde el cliente
    try {
      let user = {};

      let value = data.split("token:");

      console.log(value[0]);

      jwt.verify(value[1], "DOMOTICMOOD", function (err, decoded) {
        if (err) {
          console.log(err);
        } else {
          user.id = decoded.userID;
        }
      });

      user = await User.findById(user.id);

      arduinoCode = await Arduino.findById(user.arduinoID);
      await UpdateValue(value[0], arduinoCode.idArduino, user.id);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("SensorValue", async function (data) {
    //Obtiene el valor desde el microcontrolador
    try {
      let valueSplit = data.split("Token:");

      arduinoCode = await Arduino.findById(valueSplit[1]);

      let user = await User.findOne({ arduinoID: arduinoCode.id });
      let { pin, value } = getValue(valueSplit[0], user.ID);

      // Se emiten los valores hacia el cliente
      let SocketUsers = Users.get(user.id);

      if (socketUsers.length > 0) {
        SocketUsers.map(async (e, i) => {
          if (e.connected) e.emit(`SensorValue=${pin}`, value);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

const getValue = async (value, ID) => {
  //Obtiene los valores
  let arrayValue = value.split("=");

  arrayValue[1] = arrayValue[1].replace("[", "").replace("]", "").split(",");

  try {
    let result = await Pin.findOneAndUpdate(
      { pin: arrayValue[1][0], userID: ID },
      { value: arrayValue[1][1] }
    );
  } catch (error) {
    console.log(error);
  }

  Value = {
    pin: arrayValue[1][0],
    value: arrayValue[1][1],
  };
};

//Actualizar valor
const UpdateValue = async (value, arduinoID, ID) => {
  try {
    let statePin;

    let arrayValue = value.split("=");

    //Reemplaza los strings
    arrayValue[1] = arrayValue[1].replace("[", "").replace("]", "").split(",");
    arrayValue[1][1] === "true" ? (statePin = 1) : (statePin = 0);

    console.log(statePin, arrayValue[1][0]);

    let result = await Pin.findOneAndUpdate(
      { pin: arrayValue[1][0], userID: ID },
      { value: statePin }
    );

    let socketEmit = arduino.socket.get(arduinoID);

    try {
      socketEmit?.emit(`[Command],${value}`);
    } catch (error) {
      socketEmit?.emit("disconnect");
      arduino.socket.delete(arduinoID);
    }
  } catch (error) {
    console.log(error);
  }
};

// end of socket.io logic

module.exports = socketapi;
