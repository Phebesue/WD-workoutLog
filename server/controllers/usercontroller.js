
const router = require("express").Router();
const User = require("../db").import("../models/user");

const validateSession = require("../middleware/validate-session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Endpoints
// POST:  http://localhost:3005/user/register
// POST:  http://localhost:3005/user/login
// GET :  http://localhost:3005/user


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
  else{ res.status(501).json({error: err})

  }
})
    .catch((err) => res.status(500).json({ error: "Failed to authenticate." })
    );
}
    );

    // -----  Get User  -----
    // ValidateSession on this prevents it from working at all.
    router.get("/",/* validateSession,*/(req, res) => {
      User.findOne({
        where: {
          id: req.user.id
        },
        include: "userInfo"
        // This doesn't work server gets caught in some loop
        // include: ["userInfo", "logs"]
      })
      .then(info => 
        res.status(200).json({
          message: "User found",
          info: info
        }))
      .catch(err => res.status(500).json("User not found", err))
    })
module.exports = router;
