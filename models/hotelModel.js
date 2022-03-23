const mongoose = require("mongoose");

// Créer un schéma (fais office de validation)
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    maxlength: 50,
  },
  city: {
    type: String,
    required: true,
    maxlength: 50,
  },
  country: {
    type: String,
    required: true,
    maxlength: 50,
  },
  stars: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 5,
  },
  hasSpa: {
    type: Boolean,
    required: true,
  },
  hasPool: {
    type: Boolean,
    required: true,
  },
  priceCategory: {
    type: Number,
    minlength: 1,
    maxlength: 3,
    required: true,
  },
});

// créer un modèle
const Hotel = mongoose.model("Hotel", hotelSchema);

// exporter le modèle
module.exports = Hotel;
