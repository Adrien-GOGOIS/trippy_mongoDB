const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Hotel = require("../models/hotelModel");

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

// router.get("/", async (req, res) => {
//     const queryKeys = Object.keys(req.query);
//     const dataBaseInstruction = "SELECT * FROM hotels";
//     let dataBaseInstruction2 =
//       dataBaseInstruction +
//       " WHERE " +
//       queryKeys[0] +
//       "='" +
//       req.query[queryKeys[0]].toString().toLowerCase() +
//       "'";

//     try {
//       if (Object.keys(req.query).length === 0) {
//         hotel = await Postgres.query(dataBaseInstruction);
//       } else if (Object.keys(req.query).length === 1) {
//         hotel = await Postgres.query(dataBaseInstruction2);
//       } else {
//         for (i = 1; i < queryKeys.length; i++) {
//           dataBaseInstruction2 =
//             dataBaseInstruction2 +
//             " AND " +
//             queryKeys[i] +
//             "='" +
//             req.query[queryKeys[i]].toString().toLowerCase() +
//             "'";
//         }
//         hotel = await Postgres.query(dataBaseInstruction2);
//       }

//       if (hotel.rows.length === 0) {
//         return res.send("Désolé, aucun hôtel ne correspond à cette recherche");
//       }

//       res.json(hotel.rows);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({
//         message: "An error happened",
//       });
//     }
//   });

//   router.get("/:id", async (req, res) => {
//     try {
//       hotel = await Postgres.query("SELECT * FROM hotels WHERE hotel_id=$1", [
//         req.params.id,
//       ]);
//       res.json(hotel.rows);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({
//         message: "An error happened",
//       });
//     }

//     // const copyHotel = { ...hotel };
//     // copyHotel.comments = copyHotel.comments.slice(0, 3);
//     // res.json(copyHotel);
//   });

//   router.get("/:id/comments/", (req, res) => {
//     const hotel = hotels.find((host) => {
//       return host.id.toString() === req.params.id;
//     });

//     res.json(hotel.comments);
//   });

//   router.get("/countries/:country", async (req, res) => {
//     try {
//       hotel = await Postgres.query(
//         "SELECT * FROM hotels WHERE LOWER(country)=$1",
//         [req.params.country.toLowerCase()]
//       );
//       res.json(hotel.rows);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({
//         message: "An error happened",
//       });
//     }
//   });

//   router.get("/prices/:price", async (req, res) => {
//     try {
//       hotel = await Postgres.query(
//         "SELECT * FROM hotels WHERE priceCategory=$1",
//         [req.params.price]
//       );
//       res.json(hotel.rows);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({
//         message: "An error happened",
//       });
//     }
//   });

//   router.get("/spa/pool", async (_req, res) => {
//     hotel = await Postgres.query(
//       "SELECT * FROM hotels WHERE hasPool=TRUE AND hasSpa=TRUE"
//     );
//     res.json(hotel.rows);
//   });

//   // POST
//   router.post("/", validateSchema, async (req, res) => {
//     try {
//       await Postgres.query(
//         "INSERT INTO hotels(name, address, city, country, stars, hasSpa, hasPool, priceCategory) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
//         [
//           req.body.name,
//           req.body.address,
//           req.body.city,
//           req.body.country,
//           req.body.stars,
//           req.body.hasSpa,
//           req.body.hasPool,
//           req.body.priceCategory,
//         ]
//       );
//       res.json({
//         message: "Ajout de l'hôtel " + req.body.name,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: "An error happened",
//       });
//     }

//     res.json({
//       message: "Ajout de l'hôtel " + req.body.name,
//     });
//   });

//   router.post("/:id/comments/", validateComment, (req, res) => {
//     const hotel = hotels.find((host) => {
//       return host.id.toString() === req.params.id;
//     });

//     hotel.comments.push({
//       commentId: uuidv4(),
//       username: req.body.username,
//       text: req.body.text,
//     });

//     res.json({
//       message: "Ajout du commentaire de " + req.body.username,
//       commentaire: hotel.comments,
//     });
//   });

//   // PATCH
//   router.patch("/:id", async (req, res) => {
//     try {
//       hotel = await Postgres.query(
//         "UPDATE hotels SET name=$1 WHERE hotel_id=$2",
//         [req.body.name, req.params.id]
//       );
//       res.json({
//         description: "Mise à jour de l'hôtel n°" + req.params.id,
//       });
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({
//         message: "An error happened",
//       });
//     }
//   });

//   // DELETE
//   router.delete("/:id", async (req, res) => {
//     try {
//       hotel = await Postgres.query("DELETE FROM hotels WHERE hotel_id=$1", [
//         req.params.id,
//       ]);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({
//         message: "An error happened",
//       });
//     }

//     res.json({
//       message: "L'hôtel n°" + req.params.id + " a été supprimé",
//     });
//   });

// On exporte le router
module.exports = router;
