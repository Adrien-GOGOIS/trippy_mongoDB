const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const app = express();

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to Database");
  });

router.get("/", (req, res) => {
  res.send("WELCOME !!");
});

// On exporte le router
module.exports = router;
