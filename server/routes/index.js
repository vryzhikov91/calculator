const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Calculated = mongoose.model("calculated");


router.get("/", async (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/api", async (req, res) => {
  const list = await Calculated.find().sort({date: -1}).limit(10);
  return res.json({result: list })
});



module.exports = router;

