const router = require("express").Router();
const UserInfo = require("../db").import("../models/userInfo");

const validateSession = require("../middleware/validate-session");

// Endpoints
// POST:  http://localhost:3005/userInfo/
// GET :  http://localhost:3005/userInfo/
// PUT :  http://localhost:3005/userInfo/
// DEL :  http://localhost:3005/userInfo/

// -----  Userinfo Create  -----
router.post("/", validateSession, (req, res) => {
  UserInfo.create({
    dateOfBirth: req.body.userInfo.dateOfBirth,
    age: req.body.userInfo.age,
    heightInInches: req.body.userInfo.heightInInches,
    weightInPounds: req.body.userInfo.weightInPounds,
    goal: req.body.userInfo.goal,
    userId: req.user.id
  }).then((userInfo) =>
    res
      .status(200)
      .json({
        message: "User Info successfully created!",
        userInfo
      })
      .catch((err) => res.status(501).json({ error: "dob  is required", err }))
  );
});
// -----  Get User Info  -----
router.get("/", (req, res) => {
  UserInfo.findOne({
    where: {
      userId:req.user.id
    },
    include: "user"
  })
  .then(function createSuccess(data){
    res.status(200).json({
      message: "User Info found",
      data: data
    })
  }).catch(err => res.status(500).json("User Info not found", err))
})

// -----  Update User Info  -----
router.put("/", (req, res) => {
  UserInfo.update(req.body.userInfo, {where: {userId: req.user.id}})
})

// -----  Delete UserInfo  -----
router.delete("/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner_id: req.user.id } };
  Log.destroy(query)
    .then(() => res.status(200).json({ message: "User Info Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
  //   : res.status(400).json({error: err})
});
module.exports = router;
