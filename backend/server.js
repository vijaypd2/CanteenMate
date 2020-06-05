const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

var uri = "mongodb://localhost:27017/canteen";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database Connection Successs");
});

app.listen(5000, () => {
  console.log("Server Started");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const salesRouter = require("./routes/sales");
app.use("/sales", salesRouter);
