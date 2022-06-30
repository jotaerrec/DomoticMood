const jwt = require("jsonwebtoken");

//Verify User using jwt
module.exports = {
  validateUser: function validateUser(req, res, next) {
    jwt.verify(
      req.headers["x-access-token"],
      req.app.get("secretKey"),
      function (err, decoded) {
        if (err) {
          res.json({ message: err.message });
        } else {
          console.log(decoded);
          req.body.userID = decoded;
          next();
        }
      }
    );
  },
};
