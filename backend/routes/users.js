const express = require("express");
const router = express.Router();
let User = require("../models/user.model");
const UserSession = require("../models/userSession.model");

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

router.route("/signup").post((req, res) => {
  let email = req.body.email;
  let collegeId = req.body.collegeId;
  let password = req.body.password;

  email = email.toLowerCase();
  email = email.trim();

  User.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exist.",
        });
      }
    }
  );

  const newUser = new User();
  newUser.email = email;
  newUser.password = newUser.generateHash(password);
  newUser.collegeId = collegeId;
  newUser.mainBalance = 500;

  newUser
    .save()
    .then(() => res.json("New User Added Succesfully"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/signin").post((req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        console.log("err 2:", err);
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid",
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "error: invalid",
        });
      }

      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "error: server error",
          });
        }
        return res.send({
          user,
          success: true,
          message: "valid sign in",
          token: doc._id,
        });
      });
    }
  );
});

router.route("/logout").get((req, res, next) => {
  let token = req.query.token;

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: Server error Not Signed out",
        });
      }
      return res.send({
        sessions,
        success: true,
        message: "Good Signed out",
      });
    }
  );
});

router.route("/verify").get((req, res, next) => {
  // Get the token
  let token = req.query.token;
  // ?token=test
  // Verify the token is one of a kind and it's not deleted.
  UserSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid",
        });
      } else {
        // DO ACTION
        const session = sessions[0];
        const userId = session.userId;
        //console.log(userId);
        User.find(
          {
            _id: userId,
          },
          (err, users) => {
            if (err) {
              console.log("Error while finding the user");
            } else {
              const user = users[0];
              //console.log("User Found:", user);
              const email = user.email;
              const mainBalance = user.mainBalance;
              const retCollegeId = user.collegeId;
              return res.send({
                user: {
                  email: email,
                  mainBalance: mainBalance,
                  retCollegeId: retCollegeId,
                },
                success: true,
                message: "Good",
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
