const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// File upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // create 'uploads' folder in backend
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 1234.jpg
  }
});

const upload = multer({ storage });

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  const { name, price, description, category, rating } = req.body;
  const image = req.file.filename;

  try {
    const product = await Product.create({ name, price, description, category, rating, image });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Error adding product", error: err });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});


module.exports = router;
