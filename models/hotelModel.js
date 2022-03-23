const mongoose = require("mongoose");

// Créer un schéma (fais office de validation)
const hotelSchema = new mongoose.Schema({});

// créer un modèle
const Hotel = mongoose.model("Hotel", hotelSchema);

// exporter le modèle
module.exports = Hotel;
