let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
let Log = require("../db").import("../models/log");

// router.get("/", validateSession, function (req, res) {
//   res.send("Hey!! This is a log route!");
// });

// -----  Log Create  -----
router.post("/", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.define,
    result: req.body.log.result,
    owner_id: req.user.id,
  };
  Log.create(logEntry).then((log) =>
    res
      .status(200)
      .json({
        message: "Sucessfully submitted a log entry",
        logEntry: log,
      })
      .catch((err) => res.status(501).json({ error: err }))
  );
});
// -----  Get Entries for user by Id  -----
router.get("/:id", (req, res) => {
  let id = req.params.id;
  Log.findAll({
    where: { owner_id: id },
  })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----Get My entries  -----
router.get("/", validateSession, (req, res) => {
  let userid = req.user.id;
  Log.findAll({
    where: { owner_id: userid },
  })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get All Logs -----
router.get("/all", (req, res) => {
  Log.findAll()
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Update Entry  -----

router.put("/:entryId", validateSession, (req, res) => {
  const query = { where: { id: req.params.entryId, owner_id: req.user.id } };
  Log.update(req.body, query)
    .then((log) => res.status(201).json({ message: `${log} log(s) updated` }))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Delete a Journal Entry  -----
router.delete("/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner_id: req.user.id } };
  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
  //   : res.status(400).json({error: err})
});
module.exports = router;
