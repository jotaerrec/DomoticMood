const jwt = require("jsonwebtoken");

//Verify User using jwt
module.exports = {
  validateUser: function validateUser(req, res, next) {
    console.log(res);
    console.log(req.headers["x-access-token"]);
    jwt.verify(
      req.headers["x-access-token"],
      req.app.get("secretKey"),
      function (err, decoded) {
        if (err) {
          res.json({ error: "token invalido" });
        } else {
          console.log(decoded);
          req.body.userID = decoded.userID;
          next();
        }
      }
    );
  },
};
