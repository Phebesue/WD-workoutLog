const jwt = require("jsonwebtoken");
const User = require("../db").import("../models/user");

const validateSession = (req, res, next) => {
  // REQUEST -> middleware -> controller -> RESPONSE
  const token = req.headers.authorization;
  // when we make a client, we can store the token in the local storage, and that token will stay there until it expires. Postman is acting as our client, so we will be passing it in our authorization header.
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("token: ", token);
    console.log("decoded: ", decoded);
    if (!err && decoded) {
      User.findOne({ where: { id: decoded.id } })
        .then((user) => {
          console.log("user: ", user);
          if (!user) throw "err";
          req.user = user;
          //  this will set a new property of req (the request) with the value of the user's information who is logged in
          return next();
          // next jumps us out of our callback function and the code below return next() will be unreachable. This prevents us from triggering the callback function a second time.
        })
        .catch((err) => next(err));
    } else {
      req.errors = err;
      return res.status(500).send("Not Authorized");
    }
  });
};
module.exports = validateSession;
