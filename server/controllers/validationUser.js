const jwt = require("jsonwebtoken");

//Verify User using jwt
module.exports = {
  //Validar usuario

  validateUser: function validateUser(req, res, next) {
    jwt.verify(
      req.headers["x-access-token"],
      req.app.get("secretKey"),
      function (err, decoded) {
        if (err) {
          res.status(203).json({ error: "token invalido" });
        } else {
          req.body.userID = decoded.userID;
          next();
        }
      }
    );
  },
};
