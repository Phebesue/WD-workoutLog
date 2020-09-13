
const router = require("express").Router();
const User = require("../db").import("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Endpoints
// POST:  http://localhost:3005/user/register
// POST:  http://localhost:3005/user/login


// -----  User Sign-Up  -----
router.post("/register", function (req, res) {
    User.create({
      username: req.body.user.username,
      passwordhash: bcrypt.hashSync(req.body.user.password, 13)
      // passwordhash: req.body.user.password,
    })
  
      .then(
       
        function createSuccess(user) {
  
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
  
        res.json({
          user:user,  
          message: "User successfully created!",
          sessionToken: token
        })
      }
      )
      .catch((err) => res.status(500).json({ error: "user name is required" }));
    })
  
// -----  User Login  -----
router.post("/login", function (req, res) {
  User.findOne({
    where: {
      username: req.body.user.username
      // passwordhash: req.body.user.password
    }
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.user.password,user.passwordhash, function (err,matches) {
          if(matches) {

        let token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).json({
          user: user,
          message: "Successfully authenticated  user",
          sessionToken: token
        })
      } else {
        res.status(502).send({error: "Bad Gateway"})

      }
    });
  }
  else{ res.status(500).json({error: err})

  }
})
    .catch((err) => res.status(500).json({ error: "Failed to authenticate." })
    );
}
    );
module.exports = router;
