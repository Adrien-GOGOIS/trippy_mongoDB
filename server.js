const express = require("express");
const app = express();

app.use(express.json());

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

// Import router d'un autre fichier JS
const hotels = require("./routers/hotels.js");

// SECTIONS DANS L'API
app.use("/hotels", hotels);

app.get("*", (_req, res) => {
  res.status(404).send("Error 404, cette page n'existe pas");
});

app.listen(8000, () => {
  console.log("LISTENING...");
});
