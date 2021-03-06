const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Hotel = require("../models/hotelModel");
const Comment = require("../models/commentModel");

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

router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find(req.query).select("-__v0");
    res.json(hotels);

    if (hotels.length === 0) {
      return res.send("Désolé, aucun hôtel ne correspond à cette recherche");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).select("-__v0");
    res.json(hotel);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

  router.get("/:id/comments/", async(req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const hotelComment = await Comment.findOne({ hotel_id: hotel._id}).select("content");
      res.json(hotelComment);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "An error happened",
      });
    }
  });

  router.get("/countries/:country", async (req, res) => {
    try {
      const hotel = await Hotel.findOne({country: req.params.country});
      res.json(hotel);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "An error happened",
      });
    }
  });

  router.get("/prices/:price", async (req, res) => {
    try {
      const hotel = await Hotel.findOne({priceCategory: req.params.price});
      res.json(hotel);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "An error happened",
      });
    }
  });

  router.get("/spa/pool", async (_req, res) => {
    try {
      const hotels = await Hotel.find({hasSpa: true, hasPool: true})
      res.json(hotels);
    } catch (err) {
      console.log(err);
      res.json({message: "An error happened"})
    }

  });

// POST
router.post("/", async (req, res) => {
  try {
    await Hotel.create(req.body);
    res.status(201).json({
      message: "Ajout de l'hôtel " + req.body.name,
    });
  } catch (err) {
    res.status(400).json({
      message: "An error happened",
    });
  }
});

  router.post("/:id/comments/", async (req, res) => {

    try {
      const hotel = await Hotel.findById(req.params.id).select("-__v0");
      if (hotel) {
        await Comment.create({
          content: req.body.content,
          hotel_id: req.params.id,
        });
        res.status(201).json({
          message: "Ajout du commentaire"
        });
      } else {
        res.json({
          message: "Cet hôtel n'existe pas"
        })
      }

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "An error happened",
      });
    }
  });

//   // PATCH
  router.patch("/:id", async (req, res) => {
    try {
      await Hotel.findByIdAndUpdate(req.params.id, {name: req.body.name});
      res.json({
        message: "Mise à jour de l'hôtel n°" + req.params.id
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "An error happened",
      });
    }
  });

//   // DELETE
  router.delete("/:id", async (req, res) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.json({
        message: "L'hôtel sélectionné a été supprimé",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "An error happened",
      });
    }
  });

// On exporte le router
module.exports = router;
