const express = require("express");
const router = express.Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  res.send("<h1> Users </h1>");
});

router.route("/view").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/viewuser").post((req, res) => {
  const collegeId = req.body.collegeId;

  User.findOne({ collegeId: collegeId })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log("error" + err);
    });
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const collegeId = req.body.collegeId;

  const newUser = new User({
    username: username,
    collegeId: collegeId,
    mainBalance: 500,
  });

  newUser
    .save()
    .then(() => res.json("New User Added Succesfully"))
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
