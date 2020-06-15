const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
    },
    collegeId: {
      type: String,
      unique: true,
    },
    mainBalance: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    orders: [],
  },
  { timestamps: true }
);

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
