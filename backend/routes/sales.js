const express = require("express");
const router = express.Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  res.send("<h1> Sales </h1>");
});

router.route("/sell").post((req, res) => {
  const collegeId = req.body.collegeId;
  const price = Number(req.body.price);
  //console.log(collegeId);
  User.findOne({ collegeId: collegeId })
    .then((user) => {
      console.log(user.mainBalance);
      const balance = user.mainBalance - price;
      user.mainBalance = balance;
      user.save();
      console.log(balance);

      res.send(user);
    })
    .catch((err) => {
      console.log("error" + err);
    });
});

module.exports = router;
