const express = require("express");
const Catogories = require("../models/category");

const router = new express.Router();
router.use(express.json());

// SAVING NEW CATOGERY
router.post("/", async (req, res) => {
  try {
    const newCatgy = new Catogories(req.body);
    const saveCatgy = await newCatgy.save();
    res.status(200).send(saveCatgy);
  } catch {
    (error) => res.status(404).send(error);
  }
});

// GETTING NEW CATEGORY

router.get("/", async (req, res) => {
  //   let catgyName = req.body.name;
  try {
    // const Category = await Catogories.find({ name: catgyName });
    const Category = await Catogories.find(); //find all the catogories
    res.status(200).send(Category);
  } catch {
    (error) => res.status(404).send(error);
  }
});

module.exports = router;
